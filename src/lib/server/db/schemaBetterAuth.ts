import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { camposAdicionados } from './camposAdicionados';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name').notNull(),
	email: text('email').notNull().unique(),
	emailVerified: boolean('emailVerified').default(false).notNull(),
	image: text('image'),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	...camposAdicionados,
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
	token: text('token').notNull().unique(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt')
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
	ipAddress: text('ipAddress'),
	userAgent: text('userAgent'),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
});

export const account = pgTable('account', {
	id: text('id').primaryKey(),
	accountId: text('accountId').notNull(),
	providerId: text('providerId').notNull(),
	userId: text('userId')
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('accessToken'),
	refreshToken: text('refreshToken'),
	idToken: text('idToken'),
	accessTokenExpiresAt: timestamp('accessTokenExpiresAt'),
	refreshTokenExpiresAt: timestamp('refreshTokenExpiresAt'),
	scope: text('scope'),
	password: text('password'),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt')
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});

export const verification = pgTable('verification', {
	id: text('id').primaryKey(),
	identifier: text('identifier').notNull(),
	value: text('value').notNull(),
	expiresAt: timestamp('expiresAt').notNull(),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt')
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
});
