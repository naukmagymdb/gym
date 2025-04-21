export interface IdLookupStrategy {
    getById(id: number): Promise<any>;
}