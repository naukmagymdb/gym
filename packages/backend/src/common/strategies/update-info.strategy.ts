import { UpdateStaffDto } from "src/database/dtos/update-staff.dto";
import { UpdateVisitorDto } from "src/database/dtos/update-visitor.dto";

export interface UpdateInfoStrategy {
    updateInfo(id: number, accountDto: UpdateStaffDto | UpdateVisitorDto): Promise<any>;
}