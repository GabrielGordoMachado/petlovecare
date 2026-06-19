# PetLoveCare — App Web (cliente)

App web do **tutor**. React + Vite + TypeScript, consumindo a API NestJS via axios.
Faz parte do monorepo PetLoveCare (ver README e `docs/` na raiz).

## Rodar

```bash
npm install
cp .env.example .env     # já aponta para a API de produção (Railway)
npm run dev              # http://localhost:5173
```

Para apontar para uma API local, edite o `.env`:
```env
VITE_API_URL=http://localhost:3000
```

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (HMR) |
| `npm run build` | Typecheck (`tsc -b`) + build de produção |
| `npm run preview` | Servir o build localmente |
| `npm test` | Testes (Vitest) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |
| `npm run deploy` | Build + publica no Firebase Hosting |

## Deploy (Firebase Hosting)

O projeto já vem configurado (`firebase.json` com rewrite de SPA + `firebase-tools`).
Passo a passo completo em [DEPLOY_FIREBASE.md](DEPLOY_FIREBASE.md). Resumo:

```bash
npx firebase login        # entra na conta Google
npx firebase use --add    # escolhe o seu projeto Firebase
npm run deploy            # build + publica
```

## Estrutura

```
src/
├── assets/        # logos (SVG)
├── components/    # Layout (cabeçalho/rodapé) e RotaProtegida
├── pages/         # uma tela por arquivo (Home, Login, Cadastro, MeusPets, ...)
├── services/      # api.ts — cliente axios e funções por recurso
├── styles/        # tokens.css, reset.css, app.css (classes globais)
├── utils/         # cpf, email, data (com testes .test.ts)
├── auth.tsx       # AuthContext (sessão do cliente, por CPF)
├── ui.tsx         # toast + diálogo de confirmação
└── App.tsx        # rotas
```

## Telas (seguem os mockups em `identidadeVisual/`)

- **Site público:** Início (herói), Serviços, Sobre nós, Contato.
- **Conta:** Login, Cadastro, Minha conta.
- **Área do tutor:** Meus pets (CRUD), Agendar serviço, Meus agendamentos
  (acompanhar, cancelar, avaliar).

## Autenticação

Login por **CPF + senha** contra a API. Enquanto a rota `POST /auth/login` não está
publicada, o login cai num modo provisório que valida o CPF (ver `services/api.ts`).
O código já chama `/auth/login` primeiro — quando a rota for ao ar, a verificação de
senha passa a valer sem mudar as telas.
