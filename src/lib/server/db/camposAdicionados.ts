import { boolean, text } from 'drizzle-orm/pg-core';

export const camposAdicionados = {
	campoWhatsapp: text(),
	campoAdministrador: boolean().default(false).notNull(),
};
