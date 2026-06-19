/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Permite importar .svg como URL (ex.: import logo from './assets/Logo1.svg').
declare module '*.svg' {
  const src: string;
  export default src;
}
