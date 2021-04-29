import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateResearchesUsers1619558195620 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'researches_users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },

          {
            name: 'user_id',
            type: 'uuid'
          },

          {
            name: 'research_id',
            type: 'uuid'
          },

          {
            name: 'value',
            type: 'integer',
            isNullable: true
          },

          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ],
        foreignKeys: [
          {
            name: 'FKUser',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['user_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },

          {
            name: 'FKResearch',
            referencedTableName: 'researches',
            referencedColumnNames: ['id'],
            columnNames: ['research_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('researches_users')
  }
}
