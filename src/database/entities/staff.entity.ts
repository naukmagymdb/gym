import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Department } from "./department.entity";

@Entity()
export class Staff {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    contract_num: string;

    @Column({ nullable: false })
    first_name: string;

    @Column({ nullable: false })
    last_name: string;

    @Column({ nullable: true })
    patronymic: string;

    @Column({ nullable: false })
    salary: number;

    @Column({ nullable: false })
    phone_num: string;

    @Column({ nullable: true })
    certificate_couch_number: string;

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: false })
    @OneToOne(() => Department, department => department.id)
    @JoinColumn({ name: 'dep_id' })
    dep_id: Department;

    @Column({ nullable: true })
    login_password: string;
}