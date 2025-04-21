import { BadRequestException, Injectable } from "@nestjs/common";
import { UpdateStaffDto } from "src/database/dtos/update-staff.dto";
import { UpdateVisitorDto } from "src/database/dtos/update-visitor.dto";

@Injectable()
export class UtilsService {
    constructor() { }

    prepareUpdateData(updateDto: UpdateStaffDto | UpdateVisitorDto) {
        const entries = Object
            .entries(updateDto)
            .filter(([_, value]) => value);

        if (entries.length === 0) throw new BadRequestException("No valid fields provided");

        const setClause = entries.map(([key, _], index) => `"${key}" = $${index + 1}`).join(', ');
        const values = entries.map(([_, value]) => value);
        const rawQuery = `
            UPDATE $1
            SET ${setClause}
            WHERE id = $${values.length + 1}
            RETURNING *
        `;

        return {
            values: values,
            rawQuery: rawQuery
        };
    }
}