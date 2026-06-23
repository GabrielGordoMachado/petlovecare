# PetLove Care — Admin UI kit (Electron desktop)

The administrator surface, recreating the Electron + React desktop app:
**Splash → Login → shell** (navy sidebar + light content) with three views.

**Open:** `index.html` — the splash auto-advances (~2.2s) to Login; any CPF/senha
enters the app. Use the sidebar to switch between Agendamentos, Serviços and
Feedbacks; the power icon returns to Login.

## Files
- `index.html` — stage machine (`splash` / `login` / `app`) + sidebar routing.
- `screens.jsx` — `Splash`, `AdminLogin`, `Agendamentos` (status table),
  `Servicos` (inline-form CRUD table), `Feedbacks` (reply cards). Composes
  `Sidebar`, `Button`, `Input`, `Badge`, `FeedbackCard`, `RatingStars`.

Mirrors `desktop/src/` from the codebase (App.css, pages/*, AppLayout). The
real app talks to the NestJS API via axios; this kit uses mock data.
