import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const requests = sqliteTable('consultation_requests', {
  id: text('id').primaryKey(), createdAt: text('created_at').notNull(),
  date: text('date').notNull(), time: text('time').notNull(),
  name: text('name').notNull(), email: text('email').notNull(), phone: text('phone').notNull(), business: text('business').notNull(),
  answers: text('answers').notNull(), status: text('status').notNull().default('pending'),
});
