import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const funcaoUsuario = async function ({ id }: { id: string }) {
	const usuarios = await db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
			emailVerified: user.emailVerified,
			campoWhatsapp: user.campoWhatsapp,
			campoAdministrador: user.campoAdministrador,
			createdAt: user.createdAt,
			image: user.image,
		})
		.from(user)
		.where(eq(user.id, id));

	if (usuarios.length === 0) {
		throw new Error('USUÁRIO NÃO ENCONTRADO NO BANCO DE DADOS.');
	}

	if (usuarios.length > 1) {
		throw new Error('MAIS DE UM USUÁRIO ENCONTRADO COM MESMO ID.');
	}

	return usuarios[0];
};

export type typeUsuario = Awaited<ReturnType<typeof funcaoUsuario>>;
