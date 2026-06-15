# Descrição das Telas — App Desktop (Admin) · PetLoveCare

Documento para guiar a execução no **Claude Code**.
App: `desktop/` — Electron + React + Vite (TypeScript). Fluxo do **administrador**.
API: `https://petlovecare-api-production.up.railway.app`

> Escopo deste documento: **fluxo de abertura** do app — Splash → Login.
> O Login é a **tela inicial** real (primeira tela com a qual o admin interage).
> As telas internas do admin (agendamentos, serviços, feedbacks, relatórios) estão
> listadas no fim apenas como mapa; serão detalhadas depois.

---

## 1. Identidade visual (extraída de `identidadeVisual/`)

### Cores (design tokens)

| Token | Hex | Uso |
|---|---|---|
| `--navy` | `#1E293B` | Fundo escuro, textos sobre claro, rodapé |
| `--coral` | `#FF7F50` | Cor de ação principal (botões primários) |
| `--teal` | `#2C6E8F` | Cor secundária — ícone, palavra "CARE", links |
| `--input` | `#D9D9D9` | Fundo dos campos de formulário |
| `--surface` | `#F5F5F5` | Fundo claro de superfícies/cards |
| `--bg-light` | `#F8FAFC` | Fundo claro geral |
| `--white` | `#FFFFFF` | Texto sobre fundo escuro |

> O `#2C6E8F` é aproximado (amostrado dos mockups). Se o time tiver o valor
> oficial do azul-petróleo, substituir.

### Tipografia
- **Títulos / display:** sans-serif **pesado e arredondado** (estilo do "MELHOR AMIGO"
  e dos títulos dos popups). Boa aproximação: **Poppins** ou **Nunito** (700/800).
- **Corpo / inputs:** sans-serif neutra (Inter / system-ui).
- Confirmar a fonte oficial com o time antes de fechar — caso não exista, usar Poppins.

### Assets
| Arquivo | O que é | Usar em |
|---|---|---|
| `identidadeVisual/Logos/Logo1.svg` | Lockup completo (ícone pata-coração + "PETLOVE CARE") | Cabeçalhos / sobre |
| `identidadeVisual/Logos/Logo2.svg` | Variação só do ícone | Favicon / ícone do app |
| `identidadeVisual/Logos/Logo3.svg` | Marca sobre fundo escuro | **Splash screen** |
| `identidadeVisual/Mockup/PopUp1.png` | Referência visual do **Login** | Tela de Login |

> Sugestão: copiar os SVGs para `desktop/src/assets/` no scaffold para importá-los
> direto no React (`import logo3 from '../assets/Logo3.svg'`).
> `Logo3.svg` tem 1920×1080 e raster embutido — serve bem como arte centralizada.

---

## 2. Fluxo de abertura

```
Abrir o app desktop
        │
        ▼
[ Splash Screen ]  ── Logo3.svg sobre fundo navy, ~2–2,5s (fade)
        │
        ▼
[ Login ]  ── tela inicial (CPF + Senha)  ── PopUp1
        │  (login válido)
        ▼
[ Dashboard do Admin ]  (próxima etapa)
```

Implementação recomendada: **rota React** como tela inicial (sem janela Electron
separada). A `BrowserWindow` abre direto na rota `/` (Splash), que após o tempo
navega para `/login`. Mais simples que criar uma janela de splash dedicada.

Rotas sugeridas (react-router-dom): `/` → Splash · `/login` → Login · `/app/*` → área do admin.

---

## 3. Tela 1 — Splash Screen

**Objetivo:** marca de abertura enquanto o app inicializa. Sem interação.

**Layout**
- Fundo: `--navy` (`#1E293B`) ocupando 100% da janela.
- `Logo3.svg` centralizado (vertical e horizontalmente). Largura ~45% da janela,
  com **máximo de ~480px**, para não estourar em telas grandes.
- (Opcional) indicador de carregamento discreto abaixo do logo (spinner fino em
  `--white` com baixa opacidade, ou apenas um fade-in do logo).

**Comportamento**
- Exibir por **2–2,5s** com fade-out e então navegar para `/login`.
- Alternativa (opcional): em vez de tempo fixo, manter a splash enquanto faz um
  *health check* da API (`GET /administradores`) e navegar quando responder.
  Para a 1ª versão, **tempo fixo** já basta.
- Sem botões, sem barra de menu do Electron (`autoHideMenuBar` ou janela frameless,
  a definir no scaffold).

**Aceite**
- Ao abrir o app, a primeira coisa visível é o `Logo3` sobre navy, e em ~2s o
  app vai sozinho para o Login.

---

## 4. Tela 2 — Login (tela inicial)

Referência visual: **`PopUp1.png`**. É a primeira tela interativa do admin.

**Layout** (segue o mockup)
- Fundo: `--navy` (`#1E293B`), ocupando a janela (no mock o formulário é centralizado
  sobre o próprio fundo escuro, sem card destacado).
- Título **"LOGIN"** em `--white`, bold, centralizado, no topo do bloco.
- Campo **CPF**
  - Input com fundo `--input` (`#D9D9D9`), cantos levemente arredondados.
  - Placeholder: `CPF`.
  - Máscara/validação: 11 dígitos (`000.000.000-00`). Aceitar com ou sem pontuação,
    mas enviar **só os 11 dígitos** para a API (a PK `cpf` é `VarChar(11)`).
- Campo **Senha**
  - Mesmo estilo de input. `type="password"`. Placeholder: `Senha`.
- Botão **"Entrar"**
  - No mockup o botão é claro; **recomendação:** usar `--coral` (`#FF7F50`) com texto
    branco para alinhar com a cor de ação da marca. *(Decisão do time — ver abaixo.)*
  - Largura menor que os inputs, centralizado, como no mock.
  - Estado de carregando (`Entrando...`) enquanto chama a API; desabilitar durante.
- Links abaixo (texto em `--teal`):
  - **"Esqueceu a senha?"** — manter (pode abrir um aviso simples por enquanto:
    "Contate o administrador do sistema").
  - **"Não tem uma conta? Cadastre-se"** — ⚠️ **DECISÃO:** este é o desktop do **ADMIN**.
    Admin normalmente **não se auto-cadastra**. Recomendação: **remover** este link no
    desktop (ou deixá-lo só no app web do cliente). Confirmar com o time.

**Autenticação (importante)**
- ⚠️ **Ainda não existe `POST /auth/login`** (ver `GUIA_INTEGRACAO.md`, seção 6).
- Solução temporária para o login do admin:
  1. `GET /administradores/:cpf` (CPF só com dígitos).
  2. Se `404` → mostrar erro "CPF não encontrado".
  3. Se encontrado → comparar a senha digitada com a do registro retornado.
     *(Provisório e inseguro — senha trafega/comparada no cliente. Documentar como
     TODO e pedir ao Gabriel a rota real `POST /auth/login`.)*
  4. Senha incorreta → erro "Senha inválida".
- Em `desktop/src/services/api.ts`, adicionar:
  ```ts
  export const authService = {
    // provisório até existir POST /auth/login
    loginAdmin: (cpf: string) => api.get(`/administradores/${cpf}`),
  };
  ```

**Erros / validação**
- CPF vazio ou com menos de 11 dígitos → não enviar, destacar o campo.
- Senha vazia → destacar o campo.
- Mensagens de erro da API vêm como `{ message }` (HTTP 400/404) — exibir o `message`.

**Sucesso**
- Guardar o admin logado (`cpf`, `nome`) num **contexto React** (`AuthContext`) e,
  para persistir entre aberturas do app, usar `electron-store` (não `localStorage`).
- Navegar para a área do admin (`/app` → dashboard).

**Aceite**
- Com CPF + senha de um administrador existente, o login entra e leva ao dashboard.
- Com CPF inexistente ou senha errada, aparece mensagem de erro clara e o usuário
  permanece no Login.

---

## 5. Próximas telas (mapa do admin — detalhar depois)

Do `GUIA_INTEGRACAO.md`, o desktop do admin cobre:

- **Agendamentos** — listar (`GET /agendamentos`) e aprovar/recusar/finalizar
  (`PUT /agendamentos/:id/status`).
- **Serviços** — CRUD (`/servicos`).
- **Feedbacks** — listar e responder (`PUT /feedback/:id/responder`).
- **Relatórios** — a partir de `GET /agendamentos` e `GET /feedback`.

Sugestão de shell pós-login: layout com **sidebar** (navy) + área de conteúdo (claro),
logo (`Logo1` ou `Logo2`) no topo da sidebar, e os 4 itens acima como navegação.

---

## 6. Alterações aprovadas

1. Botão "Entrar": seguir o mock (claro)
2. Remover "Cadastre-se" no login do admin
3. Fonte oficial da marca (Poppins/Nunito como fallback).
