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

```dotenv
# DRIZZLE:
DATABASE_URL="postgres://postgres:password@localhost:5432/bancoDrizzleBetterauth"
```

- APLICAR O SCHEMA NO BANCO DE DADOS:

```bash
npx drizzle-kit push # OU npm run db:push
```

## BETTER AUTH

- INSTALAR PACOTES:

```bash
npm install better-auth
```

- CONFIGURAR GOOGLE DEVELOPER CONSOLE:
  - ACESSE O [GOOGLE DEVELOPER CONSOLE](https://console.cloud.google.com/apis/dashboard).
  - CLIQUE NA OPÇÃO "CREDENCIAIS".
  - CLIQUE EM "CRIAR CREDENCIAIS".
  - CLIQUE EM "ID DO CLIENTE OAUTH".
  - ESCOLHA "APLICATIVO DA WEB" COMO "TIPO DE APLICATIVO".
  - PREENCHA OS CAMPOS COM:
    - NOME: credencialBetterAuth
    - ORIGENS JAVASCRIPT AUTORIZADAS:
      - http://localhost:5173
      - http://localhost:4173
      - https://meuendereco.com
    - URIS DE REDIRECIONAMENTO AUTORIZADOS:
      - http://localhost:5173/api/auth/callback/google
      - http://localhost:4173/api/auth/callback/google
      - https://meuendereco.com/api/auth/callback/google
- ARQUIVO _.env_:

```dotenv
# DRIZZLE:
DATABASE_URL="postgres://postgres:password@localhost:5432/bancoDrizzleBetterauth"

# BETTER AUTH:
BETTER_AUTH_SECRET=... # GERE ESTA CHAVE EM https://www.better-auth.com/docs/installation
BETTER_AUTH_URL=http://localhost:5173

# GOOGLE (USAR AS CHAVES OBTIDAS NO GOOGLE DEVELOPER CONSOLE):
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
```

- ARQUIVO _src/lib/betterauth/auth.server.ts_:

```typescript
import { getRequestEvent } from '$app/server';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';
import { db } from '$lib/server/db'; // DRIZZLE
import * as schema from '$lib/server/db/schema';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';

export const auth = betterAuth({
    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ['google'],
        },
    },

    database: drizzleAdapter(db, {
        provider: 'pg', // OR "MYSQL", "SQLITE"
        camelCase: true,
        schema: {
            ...schema,
            user: schema.user,
        },
    }),

    socialProviders: {
        google: {
            prompt: 'select_account',
            clientId: GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_CLIENT_SECRET as string,
        },
    },

    plugins: [sveltekitCookies(getRequestEvent)], // MAKE SURE THIS IS THE LAST PLUGIN IN THE ARRAY
});
```

- GERE O SCHEMA DO BETTER AUTH NO ARQUIVO _src/lib/server/db/schemaBetterAuth_:

```bash
npx @better-auth/cli generate --config src/lib/betterauth/auth.server.ts --output src/lib/server/db/schemaBetterAuth.ts
```

- ARQUIVO _src/lib/server/db/schema.ts_:

```typescript
export * from './schemaBetterAuth';
```

- APLICAR O NOVO SCHEMA DO BETTER AUTH NO BANCO DE DADOS:

```bash
npx drizzle-kit push # OU npm run db:push
```

- CRIAR ARQUIVO _src/lib/server/db/camposAdicionados.ts_.

- INSERIR MANUALMENTE O ARQUIVO _camposAdicionados.ts_ NO _schemaBetterAuth.ts_.

- CRIAR ARQUIVO _src/lib/betterauth/funcaoUsuario.ts_.

- CRIAR ARQUIVO _src/lib/betterauth/funcaoSecao.ts_.

- PREENCHER _app.d.ts_

- CRIAR ARQUIVO _src/lib/betterauth/handleBetterAuth.ts_.

- CRIAR _src/hooks.server.ts_.

- CRIAR ARQUIVO _src/lib/betterauth/client.ts_.
