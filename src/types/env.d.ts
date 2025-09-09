/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORM_HANDLE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
