// src/infrastructure/database/knex/migrations/202501010001_create_users_table.ts
import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('fname').notNullable();
    table.string('lname').notNullable();
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.json('roles').defaultTo('[]');
    table.boolean('isActive').defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
