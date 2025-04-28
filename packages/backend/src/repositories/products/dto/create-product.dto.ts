import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    constructor(partial: Partial<CreateProductDto>) {
        Object.assign(this, partial);
    }

    @IsString()
    @IsNotEmpty()
    goods_name: string;
}
