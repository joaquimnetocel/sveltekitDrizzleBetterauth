import type { typeUsuario } from '$lib/betterauth/funcaoUsuario';
import type { Session } from 'better-auth';

// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			secao?: Session;
			usuario?: typeUsuario;
		}
		interface PageData {
			// (opcional) TIPAR O PAGEDATA SE VOCÊ REPASSAR USER PARA O LAYOUT/PAGES
			secao?: Session;
			usuario?: typeUsuario;
		}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
