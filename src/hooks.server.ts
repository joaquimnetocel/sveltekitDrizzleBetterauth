import { handleBetterAuth } from '$lib/betterauth/handleBetterAuth';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(handleBetterAuth);
