/* App entry point */
(function () {
    function showDemoBannerIfNeeded() {
        if (!/github\.io$/i.test(location.hostname)) return;
        const bar = document.createElement('div');
        bar.id = 'demo-banner';
        bar.innerHTML = `
            <span class="demo-dot"></span>
            <b>Modalità demo</b>
            <span>— Backend PHP non disponibile su GitHub Pages. "Salva" scarica il progetto come file .pswc.json. Per la versione completa, clona il repo e lancia <code>php -S localhost:8000</code>.</span>
            <button id="demo-banner-close" title="Chiudi">×</button>
        `;
        document.body.appendChild(bar);
        document.body.classList.add('has-demo-banner');
        document.getElementById('demo-banner-close').addEventListener('click', () => {
            bar.remove();
            document.body.classList.remove('has-demo-banner');
        });
    }

    async function boot() {
        const editor = new window.PSEditor();
        window.editor = editor; // for debug
        editor.init();
        showDemoBannerIfNeeded();

        // Register tools
        [
            'MoveTool','SelectRectTool','SelectEllipseTool','LassoTool','MagicWandTool',
            'CropTool','EyedropperTool','BrushTool','PencilTool','EraserTool',
            'BucketTool','TextTool','HandTool','ZoomTool'
        ].forEach(name => {
            const cls = window.PSTools[name];
            if (!cls) return;
            const t = new cls();
            editor.registerTool(t.id, t);
        });

        // Build UI
        window.PSUI.buildMenubar(editor);
        window.PSUI.buildToolbar(editor);
        window.PSUI.buildOptionsBar(editor);
        window.PSUI.buildColorPanel(editor);
        window.PSUI.buildSwatchesPanel(editor);
        window.PSUI.buildLayersPanel(editor);
        window.PSUI.buildHistoryPanel(editor);
        window.PSUI.buildPropertiesPanel(editor);
        window.PSUI.initDialogs(editor);
        window.PSUI.initWindowControls(editor);
        window.PSUI.initTheme();
        window.PSAPI.bindOpen(editor);

        // Apply saved preferences (colors, brush size) BEFORE creating doc
        const prefs = window.PSStorage.loadPrefs();
        if (prefs.fgColor) editor.fgColor = prefs.fgColor;
        if (prefs.bgColor) editor.bgColor = prefs.bgColor;
        if (typeof prefs.brushSize === 'number') editor.brushSize = prefs.brushSize;

        // Try to restore previous session from IndexedDB; if absent, create default doc
        const restored = await window.PSStorage.restoreIntoEditor(editor);
        if (!restored) {
            editor.createDocument({ name: 'Senza titolo-1', width: 1920, height: 1080, bg: 'white' });
        } else {
            window.PSBus.emit('status:flash', 'Sessione ripristinata dall\'archivio locale');
        }

        // Activate saved tool (or brush by default)
        editor.setActiveTool(prefs.tool && editor.tools[prefs.tool] ? prefs.tool : 'brush');

        // Emit color events so UI panels refresh
        window.PSBus.emit('color:fg', editor.fgColor);
        window.PSBus.emit('color:bg', editor.bgColor);
        window.PSBus.emit('brush:size', editor.brushSize);

        // Start autosave binding (must run AFTER initial doc is in place)
        window.PSStorage.bind(editor);

        // Resize observer for rulers
        window.addEventListener('resize', () => editor.viewport.drawRulers());
        setTimeout(() => editor.viewport.fit(), 100);

        // Theme change re-applies viewport/rulers
        window.PSBus.on('theme:changed', () => {
            editor.viewport.applyTransform();
            editor.requestRedraw();
        });

        // Status flash
        window.PSBus.on('status:flash', (msg) => {
            const tt = document.getElementById('sb-tooltip');
            if (!tt) return;
            const prev = tt.textContent;
            tt.textContent = msg;
            setTimeout(() => { tt.textContent = prev || 'Pronto'; }, 2500);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
    else boot();
})();
