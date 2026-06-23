# PetLove Care — Design System

Design system for **PetLove Care** (*PetLoveCare*), a Brazilian pet-care
scheduling product: clients book grooming services (banho/tosa) for their pets,
and an administrator approves appointments, manages services, and answers
feedback. Tagline: **"Cuidado em cada momento para seu MELHOR AMIGO."**

It is an academic project (disciplina APSOO) built as a single NestJS + Prisma +
PostgreSQL backend consumed by **two clients**:

| Surface | Audience | Stack | UI kit |
|---|---|---|---|
| **Web** | Cliente (pet owner) | React + Vite | `ui_kits/web/` |
| **Desktop** | Administrador | Electron + React + Vite | `ui_kits/admin/` |

Everything in Portuguese (pt-BR). The brand mark is a **paw-print drawn as a
heart, with a cat silhouette nested in the lower pad** — warm, friendly, a
little playful.

## Sources (for whoever picks this up)
- **Figma:** "PetLoveCare.fig" — marketing site frames (hero, serviços, sobre
  nós, contato) and the four client modals (Login, Cadastre-se, Agende Agora,
  Cadastre seu pet). Mounted read-only during authoring.
- **GitHub:** https://github.com/GabrielGordoMachado/petlovecare — monorepo
  (`api/` NestJS, `desktop/` Electron admin, `identidadeVisual/` brand assets).
  The admin UI kit is a faithful recreation of `desktop/src/` (App.css, pages/*,
  AppLayout, index.css). The token values come straight from
  `desktop/src/index.css`. Explore the repo to build higher-fidelity work.
- **API (Railway):** `https://petlovecare-api-production.up.railway.app` — CRUD
  for `/clientes`, `/administradores`, `/pets`, `/servicos`, `/agendamentos`,
  `/feedback`. Appointment status ∈ `agendado · em_andamento · finalizado · cancelado`.

---

## CONTENT FUNDAMENTALS
**Language:** Portuguese (Brazil), always. Even token/code comments are pt-BR.
**Voice:** warm, caring, reassuring — "atendimento humanizado", "acolhedora",
"bem-estar do seu pet". Speaks *to* the owner about *their* pet ("seu melhor
amigo", "seu pet"), first-person plural for the brand ("Unimos…", "Criamos…",
"Nossa equipe…").
**Casing:** Display headlines and CTAs are often **ALL CAPS** ("MELHOR AMIGO",
"AGENDE AGORA", "LOGIN", "TOSA", "BANHO", "CADASTRE-SE"). Section titles are
sentence case ("Sobre nós", "Nossos principais serviços", "Contato"). Body copy
is sentence case.
**Tone examples (verbatim from the product):**
- "Cuidado em cada momento para seu **MELHOR AMIGO**."
- "Unimos organização e atendimento humanizado para oferecer experiências
  seguras e acolhedoras para seu pet."
- "A PetLoveCare nasceu com o propósito de unir tecnologia e cuidado em um só
  lugar."
- Form labels are single words: *CPF, Senha, Nome, Email, Telefone, Raça, Idade,
  Observações*. Soft links phrase as questions: *"Não tem uma conta?
  Cadastre-se"*, *"Esqueceu a senha?"*, *"Não tem um pet cadastrado? Cadastre-o"*.
**Emoji:** used sparingly and only in the admin app, as functional nav icons
(📅 ✂️ 💬 ⏻) and the occasional 🐾 accent. Not in marketing copy.

## VISUAL FOUNDATIONS
**Colors.** Three brand colors do the heavy lifting:
- **Navy `#1E293B`** — primary dark: body text, footers, the admin sidebar, the
  section-header bands, and all dark surfaces. Deepens to `#162032` at gradient
  bottoms (splash/login).
- **Coral `#FF7F50`** — *the* action color: primary buttons, the service cards,
  the stats band, the active sidebar item. Hover/press → `#ED6A3A`.
- **Teal `#2C6E8F`** — secondary brand: the "CARE" half of the wordmark, links,
  the admin secondary buttons. A **brighter teal `#2EC4B6`** appears only as the
  thin accent rule beside section-header titles.
Neutrals are a cool slate: page `#F8FAFC`, card surface `#F5F5F5`/white, form
fields `#D9D9D9`, hairlines `#E2E8F0`, muted text `#64748B`.
Status pills use GitHub-style soft pairs (blue/amber/green/red).

**Type.** Two families. **Poppins** (display) — heavy and rounded — for every
heading, CTA and the hero; weights 600–800, slight negative tracking, ALL-CAPS
for impact, line-height ≈ 1.0 on the big display. **Nunito** (body/UI) — friendly
humanist sans — for paragraphs, labels, inputs, tables; 400–800, line-height 1.5.
Hero display runs huge (up to ~128px in Figma); section titles ~44px; modal
titles ~32px with wide letter-spacing.

**Layout & backgrounds.** Marketing is a vertical stack of full-bleed sections;
each opens with a **navy band**: a 5px bright-teal rule, a big white title on the
left, a right-aligned muted subtitle. Content bands alternate light (`#F8FAFC`)
and navy, with the occasional **coral band** (services cards / stats). One real
photograph is used (a calm cat, square, square-ish 6px corners) in the hero —
otherwise imagery is the logo and flat color. No gradients in marketing; gradients
appear only in the admin (navy radial/linear on splash, login, sidebar).

**Shape & elevation.** Gentle, not pill-shaped: buttons & inputs `8px`, cards &
panels `12px`, the elevated login/modal card `18px`, badges fully round. Cards =
white surface + `1px #E2E8F0` border + soft drop shadow `0 10px 30px
rgba(15,23,42,.12)`. The active coral nav item gets a coral-tinted shadow. The
login/modal card over navy uses a heavier `0 20px 50px rgba(0,0,0,.35)` and a
subtle backdrop blur.

**Inputs.** Two treatments. *Filled* (`#D9D9D9` solid, transparent border) over
navy modals — the Figma popup style. *Light* (white, `#cbd5e1` border) on admin
forms. Both focus with a **coral** ring (`2px coral` border + `0 0 0 4px
rgba(255,127,80,.18)`); textareas focus teal.

**Motion & states.** Restrained. Buttons darken on hover and nudge down 1px on
press (`translateY(1px)`); nav links/items shift background on hover. The only
real animations live in the admin: splash logo fade-in + scale, a thin coral
spinner, login card slide-up. Transitions are short (`0.15s ease`). No bounces,
no parallax.

## ICONOGRAPHY
PetLove Care has **no custom icon set or icon font.** The brand's own
iconography is the **logo mark** (paw-heart + cat) — supplied as PNG lockups in
`assets/` and exposed via the `Logo` component (variants: lockup / mark /
wordmark; themes: color for light backgrounds, white for navy).
The **admin app uses emoji as functional icons** — this is the codebase's actual
convention, so the `Sidebar` follows it: 📅 Agendamentos · ✂️ Serviços · 💬
Feedbacks · ⏻ (sair). Feedback ratings use the unicode stars ★/☆ (gold
`#E0A72C`). Marketing social links in the Figma use simple monochrome glyphs.
If a richer icon set is ever needed, add **Lucide** (CDN) at a medium stroke — it
sits well next to Nunito — and flag it as an addition, since the source product
doesn't ship one.

> ⚠️ The logo source SVGs in the repo were raster-in-SVG and lost their bitmap on
> import; the PNG lockups in `assets/` were instead extracted from the Figma
> render and cropped/keyed (color version on transparent; white version derived
> for dark backgrounds). They're clean but not vector — ask for vector logos if
> you need print scale. The "Sobre nós" cat/dog/ribbon silhouette illustrations
> weren't cleanly extractable, so the About stats band uses bold numbers instead.

---

## Index / manifest
**Root**
- `styles.css` — the one file consumers link; `@import`s the token layers + fonts.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `fonts.css`.
- `assets/` — logo PNGs (`logo-lockup`, `logo-mark`, `logo-wordmark-text`, and
  `…-white` variants), `hero-cat.jpg`.
- `SKILL.md` — Agent-Skills wrapper.

**Components** (`window.PetLoveCareDesignSystem_7829c3.<Name>`)
- `core/` — **Button**, **Input**, **Select**, **Textarea**, **Badge**
- `brand/` — **Logo**, **SectionHeader**
- `layout/` — **Card**, **ServiceCard**
- `navigation/` — **NavBar**, **Sidebar**
- `feedback/` — **RatingStars**, **FeedbackCard**

**UI kits**
- `ui_kits/web/` — marketing site + client scheduling modal flow.
- `ui_kits/admin/` — Electron admin: splash → login → shell (agendamentos /
  serviços / feedbacks).

**Foundations** — specimen cards in `guidelines/foundations/` (Colors, Type,
Spacing, Brand) feed the Design System tab.
