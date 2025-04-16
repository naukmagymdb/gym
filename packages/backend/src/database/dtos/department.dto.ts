import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class DepartmentDto {
    constructor(partial: Partial<DepartmentDto>) {
        Object.assign(this, partial);
    }

    // id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    address: string;
}