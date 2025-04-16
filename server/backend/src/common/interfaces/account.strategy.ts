import { DashboardStrategy } from "./dashboard.strategy";
import { PhoneLookupStrategy } from "./phone-lookup.strategy";

export interface AccountStrategy extends DashboardStrategy, PhoneLookupStrategy {}