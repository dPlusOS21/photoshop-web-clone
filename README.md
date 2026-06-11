# Photoshop Web Clone

<p>
  <a href="https://dplusos21.github.io/photoshop-web-clone/" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/Demo-live-1473e6?style=for-the-badge&logo=github" alt="Demo live"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License: MIT"></a>
  <img src="https://img.shields.io/badge/Stack-HTML5%20%C2%B7%20JS%20%C2%B7%20PHP-blue?style=for-the-badge" alt="Stack">
</p>

> <b>▶ Prova subito la demo</b> (apre in una nuova scheda):
> <a href="https://dplusos21.github.io/photoshop-web-clone/" target="_blank" rel="noopener noreferrer">https://dplusos21.github.io/photoshop-web-clone/</a>
> <br>*(modalità solo-frontend: il pulsante "Salva" scarica un file `.pswc.json` invece di salvare lato server)*

Clone web di Adobe Photoshop realizzato con **HTML5 + JavaScript vanilla + PHP**.
Replica visiva fedele all'interfaccia di Photoshop 2024+ (tema scuro/chiaro) e include
un set funzionale di strumenti di editing raster con sistema multilivello,
cronologia undo/redo, filtri, regolazioni e backend di persistenza.

> Stato: **MVP fase 1 funzionante**. È un editor raster *demo-completo*, non una
> replica 1:1 di tutte le feature commerciali di Photoshop (PSD nativo,
> Camera Raw, Generative Fill, smart objects/3D non sono inclusi).

## Demo online

La demo su GitHub Pages funziona offline-style: l'editor, i livelli, gli strumenti,
i filtri e l'esportazione PNG/JPG/WebP sono tutti pienamente operativi nel
browser. L'unica funzione non disponibile è il **salvataggio lato server** (richiede
PHP) che viene sostituito automaticamente da un download del progetto in
formato `.pswc.json`.

Per la versione completa con persistenza utente, segui la sezione "Avvio rapido".

---

## Avvio rapido (offline, con PHP integrato)

```bash
cd /home/daniele/Scrivania/claude-projects/Photoshop-clone
php -S localhost:8000
```

Apri il browser su `http://localhost:8000`.

Il backend PHP crea automaticamente al primo accesso:

- `backend/data/pswc.sqlite`  database SQLite (utenti, progetti, asset)
- `backend/data/projects/`    cartella file dei progetti salvati
- `backend/data/assets/`      cartella asset caricati

Non serve nessuna configurazione: SQLite è incluso in PHP.

---

## Stack tecnico

- **Frontend**
  - HTML5 + CSS3 con variabili per i temi (dark / light)
  - JavaScript vanilla (no build, no framework)
  - Canvas 2D per ogni livello + canvas overlay per la selezione
  - Event bus interno (`PSBus`) per disaccoppiare UI e core
- **Backend**
  - PHP 8+ standalone (PDO + SQLite)
  - API JSON REST: `auth.php`, `projects.php`, `assets.php`, `health.php`

---

## Funzionalità incluse

### Interfaccia (stile Photoshop 2024+)
- Barra del titolo con icona Ps
- Menu bar completo (File, Modifica, Immagine, Livello, Testo, Selezione, Filtro, Visualizza, Finestra, Aiuto)
  con sottomenu, scorciatoie e separatori
- Options bar contestuale agli strumenti
- Document tabs
- Tools panel verticale con icone SVG e flyout per gruppi (selezione, pennelli)
- Indicatore colore primo piano / sfondo + swap (X) + default (D)
- Workspace centrale con righelli orizzontale/verticale
- Pannelli a destra:
  - Colore (HSV picker) / Campioni / Sfumature
  - Proprietà / Regolazioni / Libraries
  - Livelli / Canali / Tracciati / Storia
- Status bar con zoom, info documento e tooltip strumento
- Tema chiaro/scuro commutabile (pulsante in alto a destra, persistito in localStorage)

### Strumenti
| Tasto | Strumento |
|---|---|
| V | Sposta |
| M | Selezione rettangolare / ellittica |
| L | Lazo (poligonale a mano libera) |
| W | Bacchetta magica (flood-select) |
| C | Ritaglia |
| I | Contagocce |
| B | Pennello (con opacità, durezza, flusso, dim) |
| B | Matita (hard edge) |
| E | Gomma |
| G | Secchiello (flood-fill con tolleranza) |
| T | Testo orizzontale |
| H | Mano (pan) |
| Z | Zoom |

### Sistema di livelli
- Aggiunta, eliminazione, duplica, riordina (drag & drop)
- Visibilità, opacità (0-100%), 16 modi di fusione
- Rename (doppio click sul nome)
- Blocco trasparenza/pixel/posizione/all
- Unisci sotto, unisci visibili, riduci a un livello
- Miniature live aggiornate

### Cronologia
- Undo/redo con stack di 50 stati
- Pannello Storia cliccabile per saltare a uno stato
- Tipi tracciati: pittura per livello, selezione, aggiunta/rimozione livello

### Filtri & regolazioni
- Inverti, bianco e nero, soglia
- Tonalità/Saturazione/Luminosità (HSL)
- Esposizione, vividezza, bilanciamento RGB
- Sfocatura (filter CSS Canvas), mosaico, disturbo, trova bordi
- Rotazione tela 90°/180°, rifletti H/V

### File I/O
- **Nuovo documento**: dialog con larghezza, altezza, risoluzione, sfondo
- **Apri**: PNG / JPG / WebP / GIF
- **Esporta**: PNG / JPG / WebP (compressione 95%)
- **Salva**: invia il progetto al backend PHP (multi-layer .pswc.json). Fallback
  download locale del .pswc.json se il backend non risponde
- **Autosave persistente** (IndexedDB del browser): ogni azione viene salvata
  automaticamente in locale; alla riapertura della pagina la sessione viene
  ripristinata esattamente com'era (tutti i livelli, opacità, blend, selezione,
  livello attivo). Funziona anche offline e su GitHub Pages.
- **Preferenze utente** (localStorage): tema, strumento attivo, colori primo
  piano/sfondo, dimensione pennello, livello di zoom — vengono tutti ricordati
  tra le sessioni.

### Backend
- `GET  /backend/api/health.php` — diagnostica
- `POST /backend/api/auth.php?action=register` — registrazione
- `POST /backend/api/auth.php?action=login`    — login
- `POST /backend/api/auth.php?action=logout`   — logout
- `GET  /backend/api/auth.php?action=me`       — utente corrente
- `GET  /backend/api/projects.php?action=list` — elenco progetti
- `POST /backend/api/projects.php?action=save` — salva progetto
- `GET  /backend/api/projects.php?action=get&id=N` — apri progetto
- `POST /backend/api/projects.php?action=delete` — elimina
- `POST /backend/api/projects.php?action=rename` — rinomina
- `GET  /backend/api/assets.php?action=list`   — elenco asset
- `POST /backend/api/assets.php?action=upload` — upload (multipart)
- `GET  /backend/api/assets.php?action=get&id=N`— scarica binario
- `POST /backend/api/assets.php?action=delete` — elimina

L'autenticazione è facoltativa: in modalità offline single-user i progetti
vengono salvati come "guest" (`user_id NULL`).

---

## Scorciatoie tastiera principali

```
File                          Visualizza
Ctrl+N  Nuovo                 Ctrl++  Zoom in
Ctrl+O  Apri                  Ctrl+-  Zoom out
Ctrl+S  Salva                 Ctrl+0  Adatta a schermo
                              Ctrl+1  Pixel effettivi
Modifica                      Selezione
Ctrl+Z  Annulla               Ctrl+A  Seleziona tutto
Ctrl+Shift+Z  Ripeti           Ctrl+D  Deseleziona
Ctrl+C/V/X  Copia/Incolla/Taglia

Colori                         Pennello
D  Reset colori (nero/bianco) [ ]  Diminuisci/aumenta dimensione
X  Scambia primo piano/sfondo
```

---

## Struttura cartelle

```
Photoshop-clone/
├── index.html
├── .htaccess
├── README.md
├── assets/
│   ├── css/                  fogli di stile (per area UI + temi)
│   ├── js/
│   │   ├── core/             event-bus, history, layer, document, viewport, editor
│   │   ├── tools/            tutti gli strumenti
│   │   ├── ui/               menubar, toolbar, panels, dialogs, theme
│   │   ├── filters.js        filtri e regolazioni colore
│   │   ├── api.js            wrapper chiamate al backend
│   │   └── app.js            bootstrap
│   └── img/icons/            (riservato per asset extra)
└── backend/
    ├── config.php
    ├── db.php
    ├── router.php            (router opzionale per php -S)
    ├── api/
    │   ├── auth.php
    │   ├── projects.php
    │   ├── assets.php
    │   └── health.php
    └── data/                  creata in automatico al primo avvio
        ├── pswc.sqlite
        ├── projects/
        └── assets/
```

---

## Cosa non è ancora incluso (roadmap)

- Lettura/scrittura file **.psd** nativi (formato proprietario complesso)
- **Smart objects**, **smart filters**, **3D**
- Penna bezier + forme vettoriali editabili
- Pannello **brush settings** completo (dynamics, scattering, dual brush)
- **Camera Raw**, gestione colore **ICC**
- **Generative fill** / filtri neurali AI
- Pannello **maschere di livello** dedicate, **stili di livello** (drop shadow, glow, stroke)
- **Tipografia avanzata**: pannello carattere/paragrafo, OpenType
- **Adjustment layers** come livelli non distruttivi (sono applicati distruttivamente per ora)

Queste sono le voci della fase 2 / fase 3 nel piano originale.

---

## Note tecniche

- Il render dei livelli usa **canvas DOM impilati** con `mix-blend-mode` CSS:
  performance ottime fino a ~10-20 livelli a risoluzione FullHD; per progetti
  più pesanti conviene migrare il compositing a un singolo canvas con
  composizione manuale.
- Le operazioni di pittura usano `getImageData/putImageData` per la cronologia,
  con un cap di **50 stati** per evitare consumi RAM eccessivi.
- Il backend usa **SQLite** quindi è zero-config; per la produzione si può
  ricompilare il modulo per MySQL aggiornando `db.php`.
