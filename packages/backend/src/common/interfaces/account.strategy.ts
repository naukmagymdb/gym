import { DashboardStrategy } from "./dashboard.strategy";
import { IdLookupStrategy } from "./id-lookup.strategy";
import { PhoneLookupStrategy } from "./phone-lookup.strategy";

export interface AccountStrategy extends DashboardStrategy, PhoneLookupStrategy, IdLookupStrategy {}