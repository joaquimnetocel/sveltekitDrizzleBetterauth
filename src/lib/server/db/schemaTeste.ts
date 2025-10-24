import { pgTable, text, integer, varchar } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const tabelaRuas = pgTable('tabelaRuas', {
	idRuas: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
	campoNome: varchar()
});

export const conexoesRuas = relations(tabelaRuas, ({ many }) => ({
	conexaoCasas: many(tabelaCasas),
}));

export const tabelaCasas = pgTable('tabelaCasas', {
	idCasas: text().primaryKey().$defaultFn(() => crypto.randomUUID()),
	campoNumero: integer(),
	keyRuas: text().references(() => tabelaRuas.idRuas, {onDelete: 'cascade', onUpdate:'cascade'}).notNull(),
});

export const conexoesCasas = relations(tabelaCasas, ({ one }) => ({
	conexaoRuas: one(tabelaRuas, {
		fields: [tabelaCasas.keyRuas],
		references: [tabelaRuas.idRuas],
	}),
}));