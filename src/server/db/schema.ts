import { pgTable, text, jsonb, timestamp, uuid } from 'drizzle-orm/pg-core';

export const corsairIntegrations = pgTable('corsair_integrations', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  name: text('name').notNull(),
  config: jsonb('config').notNull().default({}),
  dek: text('dek'),
});

export const corsairAccounts = pgTable('corsair_accounts', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  tenantId: text('tenant_id').notNull(),
  integrationId: text('integration_id')
    .notNull()
    .references(() => corsairIntegrations.id),
  config: jsonb('config').notNull().default({}),
  dek: text('dek'),
});

export const corsairEntities = pgTable('corsair_entities', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  accountId: text('account_id')
    .notNull()
    .references(() => corsairAccounts.id, { onDelete: 'cascade' }),
  entityId: text('entity_id').notNull(),
  entityType: text('entity_type').notNull(),
  version: text('version').notNull(),
  data: jsonb('data').notNull().default({}),
});

export const corsairEvents = pgTable('corsair_events', {
  id: text('id').primaryKey(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  accountId: text('account_id')
    .notNull()
    .references(() => corsairAccounts.id, { onDelete: 'cascade' }),
  eventType: text('event_type').notNull(),
  payload: jsonb('payload').notNull().default({}),
  status: text('status'),
});

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name'),
  image: text('image'),
  tenantId: text('tenant_id').notNull().unique(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export const conversationsTable = pgTable('conversations', {
  id: uuid('id').primaryKey().defaultRandom(),
  tenantId: uuid('tenant_id').notNull(),
  title: text('title').notNull().default('New Chat'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const messagesTable = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id')
    .references(() => conversationsTable.id, { onDelete: 'cascade' })
    .notNull(),
  role: text('role', { enum: ['user', 'assistant', 'tool'] }).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const emailSummaries = pgTable('email_summaries', {
  id: uuid('id').defaultRandom().primaryKey(),

  tenantId: text('tenant_id').notNull(),

  messageId: text('message_id').notNull(),

  summary: text('summary').notNull(),

  actionItems: jsonb('action_items').$type<string[]>().notNull(),

  priority: text('priority').notNull(),

  suggestedReplies: jsonb('suggested_replies')
    .$type<string[]>()
    .notNull()
    .default([]),

  createdAt: timestamp('created_at').defaultNow().notNull(),

  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const emailReplies = pgTable(
  'email_replies',
  {
    id: uuid('id').defaultRandom().primaryKey(),

    tenantId: text('tenant_id').notNull(),

    messageId: text('message_id').notNull(),

    reply: text('reply').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),

    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },

  (table) => ({
    uniqueReply: {
      columns: [table.tenantId, table.messageId],
    },
  })
);
