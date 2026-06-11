/* Menubar — top menus */
(function () {
    const MENUS = [
        { label: 'File', items: [
            { label: 'Nuovo...', shortcut: 'Ctrl+N', action: 'new' },
            { label: 'Apri...', shortcut: 'Ctrl+O', action: 'open' },
            { label: 'Apri recenti', submenu: [
                { label: '(nessuno)', disabled: true }
            ]},
            { sep: true },
            { label: 'Ripristina sessione locale', action: 'session-restore' },
            { label: 'Cancella sessione locale', action: 'session-clear' },
            { sep: true },
            { label: 'Chiudi', shortcut: 'Ctrl+W', action: 'close' },
            { label: 'Salva', shortcut: 'Ctrl+S', action: 'save' },
            { label: 'Salva con nome...', shortcut: 'Ctrl+Shift+S', action: 'save-as' },
            { label: 'Esporta come...', submenu: [
                { label: 'PNG', action: 'export-png' },
                { label: 'JPG', action: 'export-jpg' },
                { label: 'WebP', action: 'export-webp' },
            ]},
            { sep: true },
            { label: 'Stampa...', shortcut: 'Ctrl+P', action: 'print' },
            { sep: true },
            { label: 'Esci', action: 'exit' },
        ]},
        { label: 'Modifica', items: [
            { label: 'Annulla', shortcut: 'Ctrl+Z', action: 'undo' },
            { label: 'Ripeti', shortcut: 'Ctrl+Shift+Z', action: 'redo' },
            { sep: true },
            { label: 'Taglia', shortcut: 'Ctrl+X', action: 'cut' },
            { label: 'Copia', shortcut: 'Ctrl+C', action: 'copy' },
            { label: 'Copia con unione', shortcut: 'Ctrl+Shift+C', action: 'copy-merged' },
            { label: 'Incolla', shortcut: 'Ctrl+V', action: 'paste' },
            { sep: true },
            { label: 'Riempi...', shortcut: 'Shift+F5', action: 'fill' },
            { label: 'Traccia...', action: 'stroke' },
            { sep: true },
            { label: 'Trasformazione libera', shortcut: 'Ctrl+T', action: 'free-transform' },
            { label: 'Trasforma', submenu: [
                { label: 'Scala', action: 'tx-scale' },
                { label: 'Ruota', action: 'tx-rotate' },
                { label: 'Inclina', action: 'tx-skew' },
                { label: 'Distorci', action: 'tx-distort' },
                { sep: true },
                { label: 'Rifletti orizzontalmente', action: 'tx-flip-h' },
                { label: 'Rifletti verticalmente', action: 'tx-flip-v' },
            ]},
            { sep: true },
            { label: 'Preferenze', submenu: [
                { label: 'Generali...', action: 'pref-general' },
                { label: 'Interfaccia...', action: 'pref-ui' },
                { label: 'Strumenti...', action: 'pref-tools' },
            ]},
        ]},
        { label: 'Immagine', items: [
            { label: 'Metodo', submenu: [
                { label: 'RGB', action: 'mode-rgb', check: true },
                { label: 'CMYK', action: 'mode-cmyk' },
                { label: 'Scala di grigio', action: 'mode-gray' },
                { label: 'Bitmap', action: 'mode-bitmap' },
            ]},
            { label: 'Regolazioni', submenu: [
                { label: 'Livelli...', shortcut: 'Ctrl+L', action: 'adj-levels' },
                { label: 'Curve...', shortcut: 'Ctrl+M', action: 'adj-curves' },
                { label: 'Esposizione...', action: 'adj-exposure' },
                { sep: true },
                { label: 'Tonalità/Saturazione...', shortcut: 'Ctrl+U', action: 'adj-hsl' },
                { label: 'Bilanciamento colore...', shortcut: 'Ctrl+B', action: 'adj-balance' },
                { label: 'Bianco e nero...', action: 'adj-bw' },
                { sep: true },
                { label: 'Inverti', shortcut: 'Ctrl+I', action: 'adj-invert' },
                { label: 'Bassorilievo', action: 'adj-emboss' },
                { label: 'Soglia...', action: 'adj-threshold' },
            ]},
            { sep: true },
            { label: 'Dimensioni immagine...', shortcut: 'Ctrl+Alt+I', action: 'image-size' },
            { label: 'Dimensione tela...', shortcut: 'Ctrl+Alt+C', action: 'canvas-size' },
            { sep: true },
            { label: 'Rotazione tela', submenu: [
                { label: '180°', action: 'rotate-180' },
                { label: '90° in senso orario', action: 'rotate-cw' },
                { label: '90° in senso antiorario', action: 'rotate-ccw' },
                { sep: true },
                { label: 'Rifletti tela orizzontale', action: 'flip-canvas-h' },
                { label: 'Rifletti tela verticale', action: 'flip-canvas-v' },
            ]},
            { label: 'Ritaglia', action: 'crop-apply' },
            { label: 'Rifila...', action: 'trim' },
        ]},
        { label: 'Livello', items: [
            { label: 'Nuovo', submenu: [
                { label: 'Livello...', shortcut: 'Ctrl+Shift+N', action: 'layer-new' },
                { label: 'Livello da sfondo', action: 'layer-from-bg' },
                { label: 'Gruppo...', action: 'layer-group' },
            ]},
            { label: 'Duplica livello...', shortcut: 'Ctrl+J', action: 'layer-duplicate' },
            { label: 'Elimina', submenu: [
                { label: 'Livello', action: 'layer-delete' },
                { label: 'Livelli nascosti', action: 'layer-delete-hidden' },
            ]},
            { sep: true },
            { label: 'Stile livello', submenu: [
                { label: 'Opzioni fusione...', action: 'fx-blending' },
                { label: 'Ombra esterna...', action: 'fx-shadow' },
                { label: 'Bagliore esterno...', action: 'fx-glow' },
                { label: 'Traccia...', action: 'fx-stroke' },
            ]},
            { sep: true },
            { label: 'Maschera livello', submenu: [
                { label: 'Mostra tutto', action: 'mask-all' },
                { label: 'Nascondi tutto', action: 'mask-none' },
                { label: 'Da selezione', action: 'mask-from-sel' },
            ]},
            { sep: true },
            { label: 'Unisci sotto', shortcut: 'Ctrl+E', action: 'layer-merge-down' },
            { label: 'Unisci visibili', shortcut: 'Ctrl+Shift+E', action: 'layer-merge-visible' },
            { label: 'Unico livello', action: 'layer-flatten' },
        ]},
        { label: 'Testo', items: [
            { label: 'Famiglia', submenu: [
                { label: 'Adobe Clean' },
                { label: 'Arial' },
                { label: 'Times New Roman' },
                { label: 'Courier New' },
            ]},
            { label: 'Stile', submenu: [
                { label: 'Regolare' },
                { label: 'Grassetto' },
                { label: 'Corsivo' },
            ]},
            { sep: true },
            { label: 'Orientamento', submenu: [
                { label: 'Orizzontale' },
                { label: 'Verticale' },
            ]},
            { label: 'Rasterizza livello testo', action: 'text-rasterize' },
        ]},
        { label: 'Selezione', items: [
            { label: 'Tutto', shortcut: 'Ctrl+A', action: 'select-all' },
            { label: 'Deseleziona', shortcut: 'Ctrl+D', action: 'deselect' },
            { label: 'Riseleziona', shortcut: 'Ctrl+Shift+D', action: 'reselect' },
            { label: 'Inverti', shortcut: 'Ctrl+Shift+I', action: 'select-inverse' },
            { sep: true },
            { label: 'Tutti i livelli', action: 'select-all-layers' },
            { label: 'Deseleziona livelli', action: 'deselect-layers' },
            { sep: true },
            { label: 'Modifica', submenu: [
                { label: 'Bordo...', action: 'sel-border' },
                { label: 'Arrotonda...', action: 'sel-smooth' },
                { label: 'Espandi...', action: 'sel-expand' },
                { label: 'Contrai...', action: 'sel-contract' },
                { label: 'Sfuma...', shortcut: 'Shift+F6', action: 'sel-feather' },
            ]},
            { label: 'Trasforma selezione', action: 'sel-transform' },
        ]},
        { label: 'Filtro', items: [
            { label: 'Ultimo filtro', shortcut: 'Ctrl+F', action: 'filter-last' },
            { sep: true },
            { label: 'Sfocatura', submenu: [
                { label: 'Sfocatura gaussiana...', action: 'filter-blur-gauss' },
                { label: 'Sfocatura controllo movim...', action: 'filter-blur-motion' },
                { label: 'Sfocatura radiale...', action: 'filter-blur-radial' },
            ]},
            { label: 'Contrasta', submenu: [
                { label: 'Maschera di contrasto...', action: 'filter-unsharp' },
                { label: 'Contrasta intelligente...', action: 'filter-smart-sharpen' },
            ]},
            { label: 'Disturbo', submenu: [
                { label: 'Aggiungi disturbo...', action: 'filter-noise-add' },
                { label: 'Riduci disturbo...', action: 'filter-noise-reduce' },
            ]},
            { label: 'Stilizzazione', submenu: [
                { label: 'Bassorilievo...', action: 'filter-emboss' },
                { label: 'Trova bordi', action: 'filter-edges' },
                { label: 'Solarizza', action: 'filter-solarize' },
            ]},
            { label: 'Distorsione', submenu: [
                { label: 'Vortice...', action: 'filter-twirl' },
                { label: 'Onda...', action: 'filter-wave' },
                { label: 'Sferizza...', action: 'filter-spherize' },
            ]},
            { label: 'Pixel', submenu: [
                { label: 'Mosaico...', action: 'filter-pixelate' },
                { label: 'Cristallizza...', action: 'filter-crystallize' },
            ]},
        ]},
        { label: 'Visualizza', items: [
            { label: 'Zoom +', shortcut: 'Ctrl++', action: 'zoom-in' },
            { label: 'Zoom −', shortcut: 'Ctrl+-', action: 'zoom-out' },
            { label: 'Adatta a schermo', shortcut: 'Ctrl+0', action: 'fit' },
            { label: 'Pixel effettivi', shortcut: 'Ctrl+1', action: 'actual' },
            { sep: true },
            { label: 'Righelli', shortcut: 'Ctrl+R', action: 'toggle-rulers', check: true },
            { label: 'Mostra', submenu: [
                { label: 'Griglia', shortcut: 'Ctrl+\'', action: 'toggle-grid' },
                { label: 'Guide', shortcut: 'Ctrl+;', action: 'toggle-guides' },
                { label: 'Sezioni', action: 'toggle-slices' },
            ]},
        ]},
        { label: 'Finestra', items: [
            { label: 'Disposizione', submenu: [
                { label: 'Tutto in alto' },
                { label: 'Tutto in 2 colonne' },
            ]},
            { sep: true },
            { label: 'Spazio di lavoro', submenu: [
                { label: 'Essentials', check: true },
                { label: 'Grafica', },
                { label: 'Fotografia' },
                { label: 'Tipografia' },
            ]},
            { sep: true },
            { label: 'Strumenti', check: true, action: 'win-tools' },
            { label: 'Opzioni', check: true, action: 'win-options' },
            { label: 'Livelli', check: true, action: 'win-layers' },
            { label: 'Canali', action: 'win-channels' },
            { label: 'Tracciati', action: 'win-paths' },
            { label: 'Colore', check: true, action: 'win-color' },
            { label: 'Campioni', action: 'win-swatches' },
            { label: 'Storia', check: true, action: 'win-history' },
            { label: 'Proprietà', check: true, action: 'win-properties' },
        ]},
        { label: 'Aiuto', items: [
            { label: 'Info Photoshop Web Clone', action: 'about' },
            { sep: true },
            { label: 'Tour rapido', action: 'tour' },
            { label: 'Documentazione', action: 'docs' },
            { sep: true },
            { label: 'Scorciatoie tastiera...', shortcut: 'Ctrl+Alt+Shift+K', action: 'shortcuts' },
        ]},
    ];

    function buildMenubar(editor) {
        const root = document.getElementById('menubar');
        root.innerHTML = '';
        let openMenu = null;

        MENUS.forEach(menu => {
            const item = document.createElement('div');
            item.className = 'menu-item';
            item.textContent = menu.label;
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                if (openMenu === item) { closeAll(); return; }
                closeAll();
                showDropdown(item, menu.items);
                openMenu = item;
                item.classList.add('open');
            });
            item.addEventListener('mouseenter', () => {
                if (openMenu && openMenu !== item) {
                    closeAll();
                    showDropdown(item, menu.items);
                    openMenu = item;
                    item.classList.add('open');
                }
            });
            root.appendChild(item);
        });

        function closeAll() {
            document.querySelectorAll('.menu-dropdown').forEach(el => el.remove());
            document.querySelectorAll('.menu-item.open').forEach(el => el.classList.remove('open'));
            openMenu = null;
        }
        document.addEventListener('click', closeAll);

        function showDropdown(parent, items, sub = false) {
            const dd = document.createElement('div');
            dd.className = 'menu-dropdown' + (sub ? ' sub' : '');
            items.forEach(it => {
                if (it.sep) {
                    const s = document.createElement('div');
                    s.className = 'menu-separator';
                    dd.appendChild(s);
                    return;
                }
                const row = document.createElement('div');
                row.className = 'menu-row';
                if (it.disabled) row.classList.add('disabled');
                if (it.submenu) row.classList.add('has-submenu');
                row.innerHTML = `
                    <span class="menu-check">${it.check ? '✓' : ''}</span>
                    <span>${it.label}</span>
                    ${it.shortcut ? `<span class="menu-shortcut">${it.shortcut}</span>` : ''}
                `;
                row.addEventListener('mouseenter', () => {
                    dd.querySelectorAll('.menu-dropdown').forEach(el => el.remove());
                    if (it.submenu) showDropdown(row, it.submenu, true);
                });
                row.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (it.disabled || it.submenu) return;
                    if (it.action) window.PSBus.emit('menu:' + it.action, it);
                    closeAll();
                });
                dd.appendChild(row);
            });
            const r = parent.getBoundingClientRect();
            if (sub) {
                dd.style.position = 'absolute';
                parent.appendChild(dd);
            } else {
                dd.style.position = 'fixed';
                dd.style.top = r.bottom + 'px';
                dd.style.left = r.left + 'px';
                document.body.appendChild(dd);
            }
        }

        // Bind menu actions
        const map = {
            'new': () => document.getElementById('dialog-new-doc').classList.remove('hidden'),
            'session-restore': async () => {
                const ok = await window.PSStorage.restoreIntoEditor(editor);
                window.PSBus.emit('status:flash', ok ? 'Sessione ripristinata' : 'Nessuna sessione salvata');
            },
            'session-clear': async () => {
                const ok = await window.PSModal.confirm(
                    'Vuoi cancellare la sessione salvata localmente?\nIl documento corrente non verrà toccato fino al prossimo salvataggio automatico.',
                    'Cancella sessione locale'
                );
                if (!ok) return;
                await window.PSStorage.clearSaved();
                window.PSBus.emit('status:flash', 'Sessione locale cancellata');
            },
            'open': () => document.getElementById('hidden-file-input').click(),
            'save': () => window.PSAPI.saveActive(editor),
            'save-as': () => window.PSAPI.exportActive(editor, 'png'),
            'export-png': () => window.PSAPI.exportActive(editor, 'png'),
            'export-jpg': () => window.PSAPI.exportActive(editor, 'jpeg'),
            'export-webp': () => window.PSAPI.exportActive(editor, 'webp'),
            'undo': () => editor.undo(),
            'redo': () => editor.redo(),
            'zoom-in': () => editor.viewport.zoomIn(),
            'zoom-out': () => editor.viewport.zoomOut(),
            'fit': () => editor.viewport.fit(),
            'actual': () => editor.viewport.actual(),
            'deselect': () => { if (editor.activeDoc) { editor.activeDoc.clearSelection(); editor.requestRedraw(); } },
            'select-all': () => {
                const d = editor.activeDoc;
                if (!d) return;
                d.setSelection({ x: 0, y: 0, w: d.width, h: d.height });
                editor.requestRedraw();
            },
            'select-inverse': () => window.PSModal.alert('L\'inversione richiede una maschera di selezione: sarà disponibile in una versione successiva.', 'Funzione non disponibile', '⚠'),
            'layer-new': () => window.PSBus.emit('layers:new'),
            'layer-duplicate': () => window.PSBus.emit('layers:duplicate'),
            'layer-delete': () => window.PSBus.emit('layers:delete'),
            'layer-merge-down': () => window.PSBus.emit('layers:merge-down'),
            'layer-merge-visible': () => window.PSBus.emit('layers:merge-visible'),
            'layer-flatten': () => window.PSBus.emit('layers:flatten'),
            'image-size': async () => {
                const doc = editor.activeDoc; if (!doc) return;
                const r = await window.PSModal.promptForm({
                    title: 'Dimensione immagine', icon: '⤢',
                    fields: [
                        { name: 'w', label: 'Larghezza (px)', type: 'number', value: doc.width, min: 1, max: 30000 },
                        { name: 'h', label: 'Altezza (px)', type: 'number', value: doc.height, min: 1, max: 30000 },
                        { name: 'dpi', label: 'Risoluzione (ppi)', type: 'number', value: doc.resolution, min: 1, max: 600 },
                    ],
                });
                if (!r) return;
                const sx = r.w / doc.width, sy = r.h / doc.height;
                for (const layer of doc.layers) {
                    const c = document.createElement('canvas');
                    c.width = Math.round(layer.width * sx);
                    c.height = Math.round(layer.height * sy);
                    const ctx = c.getContext('2d', { willReadFrequently: true });
                    ctx.imageSmoothingQuality = 'high';
                    ctx.drawImage(layer.canvas, 0, 0, c.width, c.height);
                    layer.canvas = c; layer.ctx = ctx;
                    layer.width = c.width; layer.height = c.height;
                    layer.x = Math.round(layer.x * sx); layer.y = Math.round(layer.y * sy);
                }
                doc.width = r.w; doc.height = r.h; doc.resolution = r.dpi;
                editor._rebuildLayerCanvases(); editor._renderCheckerboard();
                editor.viewport.applyTransform(); editor.viewport.fit(); editor.requestRedraw();
            },
            'canvas-size': async () => {
                const doc = editor.activeDoc; if (!doc) return;
                const r = await window.PSModal.promptForm({
                    title: 'Dimensione tela', icon: '▢',
                    fields: [
                        { name: 'w', label: 'Larghezza (px)', type: 'number', value: doc.width, min: 1, max: 30000 },
                        { name: 'h', label: 'Altezza (px)', type: 'number', value: doc.height, min: 1, max: 30000 },
                        { name: 'anchor', label: 'Ancora', type: 'select', value: 'center',
                          options: [
                              { value: 'top-left', label: 'Alto-sinistra' },
                              { value: 'center', label: 'Centro' },
                          ] },
                    ],
                });
                if (!r) return;
                const dx = r.anchor === 'center' ? Math.round((r.w - doc.width) / 2) : 0;
                const dy = r.anchor === 'center' ? Math.round((r.h - doc.height) / 2) : 0;
                for (const layer of doc.layers) {
                    const c = document.createElement('canvas');
                    c.width = r.w; c.height = r.h;
                    const ctx = c.getContext('2d', { willReadFrequently: true });
                    ctx.drawImage(layer.canvas, dx + layer.x, dy + layer.y);
                    layer.canvas = c; layer.ctx = ctx;
                    layer.width = r.w; layer.height = r.h;
                    layer.x = 0; layer.y = 0;
                }
                doc.width = r.w; doc.height = r.h;
                editor._rebuildLayerCanvases(); editor._renderCheckerboard();
                editor.viewport.applyTransform(); editor.viewport.fit(); editor.requestRedraw();
            },
            'rotate-180': () => window.PSImg && window.PSImg.rotate(editor, 180),
            'rotate-cw': () => window.PSImg && window.PSImg.rotate(editor, 90),
            'rotate-ccw': () => window.PSImg && window.PSImg.rotate(editor, -90),
            'flip-canvas-h': () => window.PSImg && window.PSImg.flip(editor, 'h'),
            'flip-canvas-v': () => window.PSImg && window.PSImg.flip(editor, 'v'),
            'filter-blur-gauss': () => window.PSFilters && window.PSFilters.blur(editor, 4),
            'filter-noise-add': () => window.PSFilters && window.PSFilters.noise(editor, 20),
            'filter-edges': () => window.PSFilters && window.PSFilters.edges(editor),
            'filter-pixelate': () => window.PSFilters && window.PSFilters.pixelate(editor, 10),
            'adj-invert': () => window.PSFilters && window.PSFilters.invert(editor),
            'adj-bw': () => window.PSFilters && window.PSFilters.grayscale(editor),
            'about': () => window.PSModal.open({
                title: 'Informazioni su Photoshop Web Clone',
                icon: 'Ps', size: 'sm',
                body: `
                    <div class="ps-about">
                        <div class="ps-about-logo">Ps</div>
                        <div class="ps-about-info">
                            <b>Photoshop Web Clone v 1.0 (beta)</b>
                            <small>Editor raster web ispirato a Photoshop 2024+</small>
                            <small>HTML5 Canvas · JavaScript · PHP/SQLite</small>
                            <small style="margin-top:6px">© ${new Date().getFullYear()} — Progetto open didattico</small>
                        </div>
                    </div>
                `,
                buttons: [{ label: 'Chiudi', kind: 'primary', value: true, default: true }],
            }),
            'shortcuts': () => window.PSModal.open({
                title: 'Scorciatoie tastiera', icon: '⌨', size: 'lg',
                body: `
                    <div class="ps-shortcuts-grid">
                        <div class="grp">Strumenti</div>
                        <div><span class="key">V</span> Sposta</div><div><span class="key">M</span> Selezione rettangolare/ellittica</div>
                        <div><span class="key">L</span> Lazo</div><div><span class="key">W</span> Bacchetta magica</div>
                        <div><span class="key">C</span> Ritaglia</div><div><span class="key">I</span> Contagocce</div>
                        <div><span class="key">B</span> Pennello / Matita</div><div><span class="key">E</span> Gomma</div>
                        <div><span class="key">G</span> Secchiello</div><div><span class="key">T</span> Testo</div>
                        <div><span class="key">H</span> Mano</div><div><span class="key">Z</span> Zoom</div>

                        <div class="grp">File</div>
                        <div><span class="key">Ctrl+N</span> Nuovo documento</div><div><span class="key">Ctrl+O</span> Apri</div>
                        <div><span class="key">Ctrl+S</span> Salva</div><div><span class="key">Ctrl+Shift+S</span> Salva con nome</div>

                        <div class="grp">Modifica</div>
                        <div><span class="key">Ctrl+Z</span> Annulla</div><div><span class="key">Ctrl+Shift+Z</span> Ripeti</div>
                        <div><span class="key">Ctrl+X</span> Taglia</div><div><span class="key">Ctrl+C</span> Copia</div>
                        <div><span class="key">Ctrl+V</span> Incolla</div><div><span class="key">Ctrl+T</span> Trasforma</div>

                        <div class="grp">Visualizza & selezione</div>
                        <div><span class="key">Ctrl+0</span> Adatta a schermo</div><div><span class="key">Ctrl+1</span> Pixel effettivi</div>
                        <div><span class="key">Ctrl++ / Ctrl+-</span> Zoom in/out</div><div><span class="key">Ctrl+A</span> Seleziona tutto</div>
                        <div><span class="key">Ctrl+D</span> Deseleziona</div><div><span class="key">Ctrl+Shift+I</span> Inverti</div>

                        <div class="grp">Colore & pennello</div>
                        <div><span class="key">D</span> Reset colori (nero/bianco)</div><div><span class="key">X</span> Scambia colori</div>
                        <div><span class="key">[</span> Diminuisci dim. pennello</div><div><span class="key">]</span> Aumenta dim. pennello</div>
                    </div>
                `,
                buttons: [{ label: 'Chiudi', kind: 'primary', value: true, default: true }],
            }),
        };
        // Map free-text mode/transform/style menu items
        Object.assign(map, {
            'mode-rgb':   () => { editor.activeDoc.colorMode = 'RGB/8'; window.PSBus.emit('doc:changed', editor.activeDoc); window.PSBus.emit('status:flash', 'Metodo: RGB/8'); },
            'mode-cmyk':  () => window.PSModal.alert('Conversione CMYK non disponibile (richiede gestione colore ICC).', 'Non ancora disponibile', '⚠'),
            'mode-gray':  () => { if (window.PSFilters) window.PSFilters.grayscale(editor); },
            'mode-bitmap':() => window.PSModal.alert('Conversione bitmap (1 bit) non ancora disponibile.', 'Non ancora disponibile', '⚠'),
            'crop-apply': () => { const t = editor.tools.crop; if (t && t.commit) t.commit(editor); },
            'tx-flip-h':  () => window.PSImg && window.PSImg.flip(editor, 'h'),
            'tx-flip-v':  () => window.PSImg && window.PSImg.flip(editor, 'v'),
            'tx-rotate':  () => window.PSImg && window.PSImg.rotate(editor, 90),
            'select-all-layers':  () => window.PSBus.emit('status:flash', 'Selezione multipla livelli: prossima versione'),
            'deselect-layers':    () => window.PSBus.emit('status:flash', 'Deselezione livelli: prossima versione'),
            'cut':   () => window.PSBus.emit('status:flash', 'Taglia: prossima versione (usa copia + elimina)'),
            'copy':  () => window.PSBus.emit('status:flash', 'Copia negli appunti: prossima versione'),
            'paste': () => window.PSBus.emit('status:flash', 'Incolla: prossima versione'),
            'copy-merged': () => window.PSBus.emit('status:flash', 'Copia con unione: prossima versione'),
            'fill':   () => window.PSFilters && window.PSFilters.balance ? null : null,
            'reselect': () => window.PSBus.emit('status:flash', 'Riseleziona: prossima versione'),
        });

        Object.keys(map).forEach(k => window.PSBus.on('menu:' + k, map[k]));

        // Generic fallback for unimplemented menu actions
        const seen = new Set(Object.keys(map));
        MENUS.forEach(function recurse(menu) {
            (menu.items || []).forEach(it => {
                if (it.action && !seen.has(it.action)) {
                    seen.add(it.action);
                    window.PSBus.on('menu:' + it.action, () => {
                        window.PSModal.alert(
                            `La voce di menu "${it.label}" non è ancora implementata in questa versione.\n\nQuesta è una demo MVP del clone: alcune funzioni avanzate di Photoshop (smart objects, stili di livello, Camera Raw, PSD nativo, ecc.) sono pianificate per le fasi 2 e 3.`,
                            'Funzione non disponibile', 'ℹ'
                        );
                    });
                }
                if (it.submenu) recurse({ items: it.submenu });
            });
        });
    }

    window.PSUI = window.PSUI || {};
    window.PSUI.buildMenubar = buildMenubar;
})();
