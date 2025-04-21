export interface DashboardStrategy {
    getDashboard(id: number): Promise<any>;
}