import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCards1604492103379 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'cards',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'card_number',
                type: 'varchar',
              },
              {
                name: 'cvc_number',
                type: 'varchar',
              },
              {
                name: 'expiry_date',
                type: 'varchar',
              },
              {
                name: 'name_card',
                type: 'varchar',
              },
              {
                name: 'driver_id',
                type: 'uuid',
              },
              {
                name: 'name',
                type: 'varchar',
              },
              {
                name: 'default_card',
                type: 'boolean',
              },
              {
                name: 'created_at',
                type: 'timestamp',
                default: 'now()',
              },
              {
                name: 'updated_at',
                type: 'timestamp',
                default: 'now()',
              },
            ],
          }),
        );

        await queryRunner.createForeignKey(
          'cards',
          new TableForeignKey({
            name: 'CardsUser',
            columnNames: ['driver_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          }),
        );
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('cards', 'CardsUser');

        await queryRunner.dropTable('cards');
      }

}
