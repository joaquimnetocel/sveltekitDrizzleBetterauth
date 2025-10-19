import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ locals }) {
	console.log(locals.usuario?.campoWhatsapp);

	return {
		usuario: locals.usuario,
	};
};
