# Calculadora de Débito de Gás — PWA

Versão Progressive Web App (PWA) da calculadora. Instala-se como app nativa em **Android, iOS e Windows** e funciona **100% offline**.

## Conteúdo da pasta

```
calculadora-pwa/
├── index.html              ← a aplicação
├── manifest.json           ← metadata da app (nome, ícones, cores)
├── service-worker.js       ← cache offline
├── icon-192.png            ← ícone Android
├── icon-512.png            ← ícone Android (alta resolução)
├── icon-192-maskable.png   ← ícone Android adaptativo
├── icon-512-maskable.png   ← ícone Android adaptativo (alta resolução)
├── apple-touch-icon.png    ← ícone iOS
├── favicon.png             ← ícone do separador do browser
└── README.md               ← este ficheiro
```

**Mantém todos os ficheiros na mesma pasta.** O `index.html` referencia os outros pelos nomes — se renomeares ou separares, deixa de funcionar.

---

## Como publicar (GitHub Pages, gratuito)

GitHub Pages serve a pasta sobre HTTPS (requisito obrigatório para PWA, exceto em `localhost`).

### Passo a passo

1. **Cria conta** em [github.com](https://github.com) (se ainda não tiveres).
2. **Cria um repositório novo**:
   - Nome: `calculadora-debito-gas` (ou outro à tua escolha)
   - Marca como **Public**
   - **Não** adiciones README/`.gitignore`/license
3. **Faz upload dos ficheiros**:
   - Na página do repositório, clica **Add file → Upload files**
   - Arrasta **todos** os ficheiros desta pasta
   - Clica **Commit changes**
4. **Ativa o GitHub Pages**:
   - Vai a **Settings → Pages**
   - Em **Source**, escolhe **Deploy from a branch**
   - Branch: `main` · Folder: `/ (root)` → **Save**
5. **Espera 1–2 minutos**. O endereço aparece no topo dessa página:
   ```
   https://<o-teu-utilizador>.github.io/calculadora-debito-gas/
   ```

A partir daqui, qualquer telemóvel ou PC pode abrir esse endereço e instalar a app.

### Alternativas a GitHub Pages

| Plataforma | Custo | Vantagem |
|---|---|---|
| **Cloudflare Pages** | Grátis | Mais rápido a nível mundial |
| **Netlify** | Grátis | Drag-and-drop direto no browser |
| **Vercel** | Grátis | Simples para repos GitHub |
| **Servidor próprio** | Pago | Controlo total |

Em qualquer uma delas, basta fazer upload da pasta inteira.

---

## Como instalar no telemóvel/PC

### Android (Chrome, Edge, Brave, Samsung Internet)

1. Abre o endereço no browser
2. Aparece automaticamente um banner **"Adicionar à página inicial"** ou **"Instalar app"** (no menu ⋮ se não aparecer)
3. Confirma → ícone fica no ambiente de trabalho como qualquer outra app
4. Abre como app — sem barras do browser, em ecrã cheio

### iOS (Safari)

> iOS exige Safari para instalação PWA. Chrome no iPhone não consegue instalar.

1. Abre o endereço no Safari
2. Toca no ícone de partilha (□↑) na barra inferior
3. **"Adicionar ao Ecrã Principal"**
4. Confirma → ícone fica no ecrã principal

### Windows (Edge, Chrome)

1. Abre o endereço no Edge ou Chrome
2. Na barra de endereço, à direita, aparece ícone **⊞ Instalar**
3. Clica → app fica acessível no menu Iniciar e na barra de tarefas
4. Funciona como app nativa, com janela própria

### macOS (Safari 17+, Chrome, Edge)

- Safari 17+: menu **Ficheiro → Adicionar à Dock**
- Chrome/Edge: ícone **⊞ Instalar** na barra de endereço

---

## Atualizações

Quando publicares uma nova versão:

1. Substitui `index.html` (e outros ficheiros se aplicável) no GitHub
2. **Edita `service-worker.js`** e muda a versão na linha:
   ```js
   const CACHE_NAME = 'loja-industria-debito-gas-v2026.05.05.c';
   ```
   Para algo como `v2026.06.10` (nova data). Esta mudança **força a app instalada a apanhar a nova versão**.
3. Quando os utilizadores abrirem a app, o service worker novo é descarregado em segundo plano. Na visita seguinte, a versão fresca aparece.

> **Analogia:** o `CACHE_NAME` é como o número do edital de obras — só quando muda é que os trabalhadores (browsers) sabem que há instruções novas para seguir.

---

## Testar localmente

Não podes abrir `index.html` por duplo-clique — `file://` não suporta service workers. Tens duas opções:

### Opção 1 — servidor Python (já vem instalado em macOS/Linux, ou no Windows com Python)

```bash
cd pasta-da-pwa
python3 -m http.server 8000
```
Abre `http://localhost:8000` no browser.

### Opção 2 — extensão "Live Server" no VS Code

Botão direito no `index.html` → **Open with Live Server**.

---

## Resolução de problemas

**"Não aparece o botão de instalar"**
- Confirma que estás em HTTPS (ou localhost) — `file://` não conta
- Confirma que o `manifest.json` é acessível (abre `https://teu-site/manifest.json` no browser)
- Confirma que há ícone 192x192 e 512x512 listados no manifest
- Em Chrome, abre DevTools → **Application → Manifest** → vê erros

**"Já instalei mas não atualiza"**
- Mudaste a versão no `CACHE_NAME` do service worker?
- Em Chrome: DevTools → **Application → Service Workers → Unregister** e recarrega
- No telemóvel: desinstala a app e reinstala

**"Funciona online mas offline dá erro"**
- Visita o site uma vez online primeiro — o SW só pré-cacheia depois da primeira visita
- DevTools → **Application → Cache Storage** mostra o que está em cache

---

## Contactos

**Vasco Silva**
vasco.silva@lojaindustria.com
+351 935 910 086
