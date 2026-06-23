# PetLove Care — Web UI kit (marketing site + client scheduling)

The customer-facing surface: a single-page marketing site (hero, services,
about, contact/footer) plus the client modal flow (login → cadastro →
agendar → cadastrar pet → confirmação).

**Open:** `index.html` — interactive. The **Agende** / **AGENDE AGORA**
buttons open the Login modal; the soft links walk through the rest of the flow.

## Files
- `index.html` — page shell + modal state machine.
- `sections.jsx` — `Hero`, `Services`, `About`, `ContactFooter` (compose `NavBar`,
  `SectionHeader`, `ServiceCard`, `Button`, `Logo`).
- `modals.jsx` — `LoginModal`, `SignupModal`, `ScheduleModal`, `PetModal`,
  `DoneModal` (navy modal over a dimmed overlay; compose `Input`/`Select`/`Textarea`/`Button`).

Stack of the real product: React + Vite, axios → NestJS API. This kit is a
cosmetic recreation; forms don't post anywhere.
