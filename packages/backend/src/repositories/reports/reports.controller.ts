import { Controller, Get, Query } from '@nestjs/common';
import { DefaultEnumPipe } from 'src/common/pipes/default-enum.pipe';
import { OptionalParseIntPipe } from 'src/common/pipes/optional-parse-int.pipe';
import { ReportsRepository } from './reports.repository';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsRepository: ReportsRepository) {}

  @Get('subscriptions/count')
  getSubscriptionCount() {
    return this.reportsRepository.getSubscriptionCount();
  }

  @Get('contracts/summary')
  getContractSummary(
    @Query('groupBy', new DefaultEnumPipe(['supplier_id', 'branch_id'], 'supplier_id'))
    groupBy?: string,
  ) {
    return this.reportsRepository.getContractSummary(groupBy);
  }

  @Get('inventory/low-stock')
  getLowStockInventory(
    @Query('threshold', OptionalParseIntPipe) threshold: number,
  ) {
    return this.reportsRepository.getLowStockInventory(threshold);
  }
}
