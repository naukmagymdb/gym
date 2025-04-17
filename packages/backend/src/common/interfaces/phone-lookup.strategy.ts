export interface PhoneLookupStrategy {
    getByPhone(phone: string): Promise<any>;
}