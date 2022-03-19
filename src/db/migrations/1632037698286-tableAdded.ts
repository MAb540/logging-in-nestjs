import {MigrationInterface, QueryRunner} from "typeorm";

export class tableAdded1632037698286 implements MigrationInterface {
    name = 'tableAdded1632037698286'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`test\`.\`meeting\` (\`id\` int NOT NULL AUTO_INCREMENT, \`zoomUrl\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`task\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`employeeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`managerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`contact_info\` (\`id\` int NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NULL, \`email\` varchar(255) NOT NULL, \`employeeId\` int NULL, UNIQUE INDEX \`REL_f188a018423a2cc75535509ff9\` (\`employeeId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`test\`.\`employee_meetings_meeting\` (\`employeeId\` int NOT NULL, \`meetingId\` int NOT NULL, INDEX \`IDX_0f0c3a58474a40670f633832aa\` (\`employeeId\`), INDEX \`IDX_10f26ded70438524748ef34cd1\` (\`meetingId\`), PRIMARY KEY (\`employeeId\`, \`meetingId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`task\` ADD CONSTRAINT \`FK_07278e1532a8daa462123fb7bc1\` FOREIGN KEY (\`employeeId\`) REFERENCES \`test\`.\`employee\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`employee\` ADD CONSTRAINT \`FK_f4a920dfa304e096fad40e8c4a0\` FOREIGN KEY (\`managerId\`) REFERENCES \`test\`.\`employee\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`contact_info\` ADD CONSTRAINT \`FK_f188a018423a2cc75535509ff97\` FOREIGN KEY (\`employeeId\`) REFERENCES \`test\`.\`employee\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`employee_meetings_meeting\` ADD CONSTRAINT \`FK_0f0c3a58474a40670f633832aa8\` FOREIGN KEY (\`employeeId\`) REFERENCES \`test\`.\`employee\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`test\`.\`employee_meetings_meeting\` ADD CONSTRAINT \`FK_10f26ded70438524748ef34cd10\` FOREIGN KEY (\`meetingId\`) REFERENCES \`test\`.\`meeting\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`test\`.\`employee_meetings_meeting\` DROP FOREIGN KEY \`FK_10f26ded70438524748ef34cd10\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`employee_meetings_meeting\` DROP FOREIGN KEY \`FK_0f0c3a58474a40670f633832aa8\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`contact_info\` DROP FOREIGN KEY \`FK_f188a018423a2cc75535509ff97\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`employee\` DROP FOREIGN KEY \`FK_f4a920dfa304e096fad40e8c4a0\``);
        await queryRunner.query(`ALTER TABLE \`test\`.\`task\` DROP FOREIGN KEY \`FK_07278e1532a8daa462123fb7bc1\``);
        await queryRunner.query(`DROP INDEX \`IDX_10f26ded70438524748ef34cd1\` ON \`test\`.\`employee_meetings_meeting\``);
        await queryRunner.query(`DROP INDEX \`IDX_0f0c3a58474a40670f633832aa\` ON \`test\`.\`employee_meetings_meeting\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`employee_meetings_meeting\``);
        await queryRunner.query(`DROP INDEX \`REL_f188a018423a2cc75535509ff9\` ON \`test\`.\`contact_info\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`contact_info\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`employee\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`task\``);
        await queryRunner.query(`DROP TABLE \`test\`.\`meeting\``);
    }

}
