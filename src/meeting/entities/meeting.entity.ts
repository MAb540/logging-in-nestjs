import { Employee } from "src/employee/entities/employee.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {

    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable:false})
    zoomUrl:string

    @ManyToMany(()=> Employee, employee => employee.meetings)
    attendees: Employee[]

}
