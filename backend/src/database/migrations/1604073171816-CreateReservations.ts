import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateReservations1604073171816 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: 'reservations',
            columns: [
              {
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
              },
              {
                name: 'start_reservation',
                type: 'timestamp',
              },
              {
                name: 'end_reservation',
                type: 'timestamp',
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
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('reservations');
      }

}
