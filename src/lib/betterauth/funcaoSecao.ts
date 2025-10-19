import { auth } from '$lib/betterauth/auth.server';
import { funcaoUsuario } from './funcaoUsuario';

export async function funcaoSecao(headers: Headers) {
	const raw = await auth.api.getSession({ headers });

	if (!raw) return null;

	const { session, user } = raw;

	const usuario = await funcaoUsuario({
		id: user.id,
	});

	return {
		session,
		user: usuario,
	};
}
