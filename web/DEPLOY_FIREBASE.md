# Deploy do app web no Firebase Hosting

O app web é um SPA (React + Vite). Para o Firebase Hosting, a gente gera o build
estático (`dist/`) e serve com um *rewrite* para o `index.html` (necessário porque
o app usa rotas de navegador — sem o rewrite, atualizar em `/login` daria 404).

Tudo já está configurado neste projeto:
- `firebase.json` — aponta o hosting para `dist/` e tem o rewrite de SPA.
- `firebase-tools` está nas devDependencies (vem com o `npm install`).
- Script `npm run deploy` (faz o build e publica).

## Passo a passo (primeira vez)

Pré-requisito: ter uma conta Google e um projeto criado no
[console.firebase.google.com](https://console.firebase.google.com) (com **Hosting** ativado).

```bash
cd web
npm install                 # garante o firebase-tools

npx firebase login          # abre o navegador para entrar na sua conta Google
npx firebase use --add      # escolha o seu projeto Firebase (cria o .firebaserc)
```

> O `firebase use --add` cria um arquivo `.firebaserc` ligando a pasta ao seu
> projeto. Depois disso, é só repetir o passo de publicar.

## Publicar (sempre que quiser subir uma versão nova)

```bash
cd web
npm run deploy
```

Isso roda o build (`tsc -b && vite build`) e publica em
`https://SEU-PROJETO.web.app`. O Firebase mostra a URL no fim.

## Observações

- A URL da API fica embutida no build a partir do `web/.env`
  (`VITE_API_URL`). Por padrão aponta para a API de produção (Railway), que tem
  CORS liberado — então o site hospedado consegue chamar a API normalmente.
- Se mudar a `VITE_API_URL`, rode `npm run deploy` de novo para reconstruir.
- O `firebase.json` e o `.firebaserc` ficam versionados; a pasta de cache
  `.firebase/` é ignorada pelo git.
