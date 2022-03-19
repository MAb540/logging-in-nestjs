import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Book{

    @PrimaryGeneratedColumn()
    id: number;


    @Column()
    name: string;

    
   
    @ManyToOne(() => User, user => user.books,{nullable:false})
    Author: User;
}