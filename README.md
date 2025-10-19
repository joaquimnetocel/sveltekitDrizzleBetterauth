# PROJETO

## SVELTEKIT

- CRIAR PROJETO SVELTEKIT

- CONFIGURAR PASTA _.vscode_.

- MUDAR TRAILING COMMA PARA "all" NO _.prettierrc_.

  ```bash
  npm run format
  npm run lint
  ```

## TAILWIND

- ADICIONAR TAILWIND:

```bash
npx sv add tailwindcss
```

## DRIZZLE

- ADICIONAR DRIZZLE:

```bash
npx sv add drizzle
```

- CRIAR O BANCO DE DADOS _bancoDrizzleBetterauth_ MANUALMENTE.

- ARQUIVO _.env_:

```env
DATABASE_URL="postgres://postgres:password@localhost:5432/bancoDrizzleBetterauth"
```

- APLICAR O SCHEMA NO BANCO DE DADOS:

```bash
npx drizzle-kit push # OU npm run db:push
```
