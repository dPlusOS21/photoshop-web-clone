/* Persistence layer
 * - IndexedDB: heavy state (active document with all layer bitmaps) — auto-saved
 * - localStorage: light user preferences (tool, brush size, theme, fg/bg color)
 */
(function () {
    const DB_NAME = 'pswc-db';
    const DB_VERSION = 1;
    const STORE_DOC = 'documents';
    const ACTIVE_KEY = 'active';
    const PREF_KEY = 'pswc-prefs';

    function openDB() {
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = () => {
                const db = req.result;
                if (!db.objectStoreNames.contains(STORE_DOC)) {
                    db.createObjectStore(STORE_DOC);
                }
            };
            req.onsuccess = () => resolve(req.result);
            req.onerror = () => reject(req.error);
        });
    }

    async function idbPut(key, value) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_DOC, 'readwrite');
            tx.objectStore(STORE_DOC).put(value, key);
            tx.oncomplete = () => { db.close(); resolve(); };
            tx.onerror = () => { db.close(); reject(tx.error); };
        });
    }
    async function idbGet(key) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_DOC, 'readonly');
            const r = tx.objectStore(STORE_DOC).get(key);
            r.onsuccess = () => { db.close(); resolve(r.result); };
            r.onerror = () => { db.close(); reject(r.error); };
        });
    }
    async function idbDelete(key) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx = db.transaction(STORE_DOC, 'readwrite');
            tx.objectStore(STORE_DOC).delete(key);
            tx.oncomplete = () => { db.close(); resolve(); };
            tx.onerror = () => { db.close(); reject(tx.error); };
        });
    }

    function canvasToBlob(canvas) {
        return new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    }

    async function serializeDoc(doc) {
        const layers = [];
        for (const l of doc.layers) {
            const blob = await canvasToBlob(l.canvas);
            layers.push({
                id: l.id, name: l.name,
                width: l.width, height: l.height,
                x: l.x, y: l.y,
                visible: l.visible, opacity: l.opacity,
                blendMode: l.blendMode,
                locked: l.locked, lockTransparency: l.lockTransparency, lockPosition: l.lockPosition,
                blob,
            });
        }
        return {
            v: 1,
            name: doc.name,
            width: doc.width, height: doc.height,
            resolution: doc.resolution,
            colorMode: doc.colorMode,
            activeLayerIndex: doc.activeLayerIndex,
            selection: doc.selection,
            layers,
            saved_at: Date.now(),
        };
    }

    function blobToImage(blob) {
        return new Promise((resolve, reject) => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
            img.onerror = (e) => { URL.revokeObjectURL(url); reject(e); };
            img.src = url;
        });
    }

    async function deserializeDoc(data) {
        const doc = new window.PSDocument({
            name: data.name,
            width: data.width,
            height: data.height,
            resolution: data.resolution,
            skipDefault: true,
        });
        doc.colorMode = data.colorMode || 'RGB/8';
        for (const ldata of data.layers) {
            const layer = new window.PSLayer({
                id: ldata.id, name: ldata.name,
                width: ldata.width, height: ldata.height,
                visible: ldata.visible, opacity: ldata.opacity,
                blendMode: ldata.blendMode,
                x: ldata.x, y: ldata.y,
            });
            layer.locked = !!ldata.locked;
            layer.lockTransparency = !!ldata.lockTransparency;
            layer.lockPosition = !!ldata.lockPosition;
            try {
                const img = await blobToImage(ldata.blob);
                layer.ctx.drawImage(img, 0, 0);
            } catch (e) { /* skip broken layer */ }
            doc.layers.push(layer);
        }
        doc.activeLayerIndex = Math.min(data.activeLayerIndex ?? 0, doc.layers.length - 1);
        doc.selection = data.selection || null;
        return doc;
    }

    let saveTimer = null;
    let saving = false;

    async function autosaveNow(editor) {
        if (!editor.activeDoc || saving) return;
        saving = true;
        try {
            const payload = await serializeDoc(editor.activeDoc);
            await idbPut(ACTIVE_KEY, payload);
            window.PSBus.emit('storage:saved', payload.saved_at);
        } catch (e) {
            console.warn('[storage] autosave failed', e);
        } finally {
            saving = false;
        }
    }

    function scheduleAutosave(editor, delay = 1200) {
        if (saveTimer) clearTimeout(saveTimer);
        saveTimer = setTimeout(() => {
            saveTimer = null;
            autosaveNow(editor);
        }, delay);
    }

    async function restoreIntoEditor(editor) {
        try {
            const data = await idbGet(ACTIVE_KEY);
            if (!data || !data.layers) return false;
            const doc = await deserializeDoc(data);
            editor.documents.push(doc);
            editor.setActiveDocument(doc);
            return true;
        } catch (e) {
            console.warn('[storage] restore failed', e);
            return false;
        }
    }

    async function clearSaved() {
        try { await idbDelete(ACTIVE_KEY); } catch (e) {}
    }

    // Preferences (localStorage)
    function loadPrefs() {
        try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); }
        catch { return {}; }
    }
    function savePrefs(prefs) {
        try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch {}
    }
    function setPref(key, value) {
        const p = loadPrefs();
        p[key] = value;
        savePrefs(p);
    }
    function getPref(key, fallback) {
        const p = loadPrefs();
        return p[key] !== undefined ? p[key] : fallback;
    }

    // Bind autosave to editor lifecycle
    function bind(editor) {
        const evts = [
            'history:changed', 'doc:layers-changed', 'doc:active-layer',
            'doc:selection-changed', 'doc:changed',
        ];
        evts.forEach(e => window.PSBus.on(e, () => scheduleAutosave(editor)));

        // Save prefs
        window.PSBus.on('tool:changed', id => setPref('tool', id));
        window.PSBus.on('color:fg', c => setPref('fgColor', c));
        window.PSBus.on('color:bg', c => setPref('bgColor', c));
        window.PSBus.on('brush:size', s => setPref('brushSize', s));
        window.PSBus.on('viewport:zoom', z => setPref('zoom', z));

        // Save on tab close
        window.addEventListener('beforeunload', () => {
            if (editor.activeDoc) {
                // best-effort sync (not awaited): the IDB write may not complete,
                // but the debounced scheduled save usually has already fired
                try { autosaveNow(editor); } catch {}
            }
        });

        // Saved indicator in status bar
        window.PSBus.on('storage:saved', (ts) => {
            const tt = document.getElementById('sb-tooltip');
            if (!tt) return;
            const t = new Date(ts);
            const hh = String(t.getHours()).padStart(2, '0');
            const mm = String(t.getMinutes()).padStart(2, '0');
            const ss = String(t.getSeconds()).padStart(2, '0');
            tt.textContent = `Salvato automaticamente alle ${hh}:${mm}:${ss}`;
        });
    }

    window.PSStorage = {
        bind,
        autosaveNow,
        scheduleAutosave,
        restoreIntoEditor,
        clearSaved,
        loadPrefs, savePrefs, setPref, getPref,
    };
})();
