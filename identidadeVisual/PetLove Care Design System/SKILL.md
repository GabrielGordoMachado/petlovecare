---
name: petlovecare-design
description: Use this skill to generate well-branded interfaces and assets for PetLove Care (a Brazilian pet-care scheduling product), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Quick orientation:
- All copy is **Portuguese (pt-BR)**, warm and caring ("atendimento humanizado", "seu melhor amigo"). Display headings/CTAs are often ALL CAPS in Poppins; body is Nunito.
- Brand colors: navy `#1E293B`, coral `#FF7F50` (primary action), teal `#2C6E8F` (+ bright `#2EC4B6` accent rule). Tokens live in `tokens/` and load via `styles.css`.
- Components are exposed on `window.PetLoveCareDesignSystem_7829c3` after loading `_ds_bundle.js`. See `components/*/*.prompt.md` for usage.
- Two products: `ui_kits/web/` (client marketing + scheduling) and `ui_kits/admin/` (Electron admin). Copy these as starting points.
- Logo lockups (PNG) and the hero photo are in `assets/`; the `Logo` component wraps them.
