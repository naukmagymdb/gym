import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Department } from "./department.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Staff {
    constructor(partial: Partial<Staff>) {
        Object.assign(this, partial);
    }


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

    @OneToOne(() => Department)
    @JoinColumn({ name: 'dep_id' })
    dep_id: Department;

    @Column({ nullable: true })
    @Exclude()
    login_password: string;
}