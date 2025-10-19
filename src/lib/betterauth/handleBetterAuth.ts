import { building } from '$app/environment';
import { auth } from '$lib/betterauth/auth.server';
import { funcaoSecao } from '$lib/betterauth/funcaoSecao';
import type { Handle } from '@sveltejs/kit';
import { svelteKitHandler } from 'better-auth/svelte-kit';

export const handleBetterAuth: Handle = async function ({ event, resolve }) {
	const session = await funcaoSecao(event.request.headers);

	if (session) {
		event.locals.secao = session.session;
		event.locals.usuario = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};
