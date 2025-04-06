import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Visitor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    birth_date: Date;

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column({ nullable: false })
    patronymic: string;

    @Column({ nullable: false })
    phone_num: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: false })
    age: number;

    @Column({ nullable: false })
    login_password: string;
}