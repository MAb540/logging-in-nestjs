import { Employee } from "src/employee/entities/employee.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ContactInfo {

    @PrimaryGeneratedColumn()
    id:number;

    @Column({nullable:true})
    phone:string;

    @Column({nullable:false})
    email:string;

    @OneToOne(() => Employee,employee => employee.contactInfo,{onDelete:'CASCADE'})
    @JoinColumn()
    employee: Employee;


}
