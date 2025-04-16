export interface DashboardStrategy {
    getDashboard(phone: string): Promise<any>;
}