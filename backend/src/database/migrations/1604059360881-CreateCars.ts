import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateCars1604059360881 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cars',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'model',
            type: 'varchar',
          },
          {
            name: 'vehicle_registration',
            type: 'varchar',
          },
          {
            name: 'color',
            type: 'varchar',
          },
          {
            name: 'year',
            type: 'integer',
          },
          {
            name: 'driver_id',
            type: 'uuid',
          },
          {
            name: 'default_car',
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
      'cars',
      new TableForeignKey({
        name: 'CarsUser',
        columnNames: ['driver_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cars', 'CarsUser');

    await queryRunner.dropTable('cars');
  }
}
