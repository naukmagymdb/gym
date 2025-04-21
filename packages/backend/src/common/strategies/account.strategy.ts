import { DashboardStrategy } from "./dashboard.strategy";
import { IdLookupStrategy } from "./id-lookup.strategy";
import { PhoneLookupStrategy } from "./phone-lookup.strategy";
import { UpdateInfoStrategy } from "./update-info.strategy";

export interface AccountStrategy extends DashboardStrategy, UpdateInfoStrategy, PhoneLookupStrategy, IdLookupStrategy {}