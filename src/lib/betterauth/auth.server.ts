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

	// URLs confiáveis (útil em produção)
	// trustedOrigins: [env.AUTH_URL ?? 'http://localhost:5173'],

	// Outras opções (email/password, passkeys...) — habilite conforme desejar
	// emailAndPassword: {
	//   enabled: true
	// },

	plugins: [sveltekitCookies(getRequestEvent)], // MAKE SURE THIS IS THE LAST PLUGIN IN THE ARRAY
});
