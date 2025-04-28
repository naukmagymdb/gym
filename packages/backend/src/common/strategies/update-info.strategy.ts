import { UpdateStaffDto } from 'src/repositories/staff/dtos/update-staff.dto';
import { UpdateVisitorDto } from 'src/repositories/visitors/dtos/update-visitor.dto';

export interface UpdateInfoStrategy {
  updateInfo(
    id: number,
    accountDto: UpdateStaffDto | UpdateVisitorDto,
  ): Promise<any>;
}
