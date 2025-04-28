import { Role } from "src/auth/utils/role.enum";

declare global {
    namespace Express {
      interface User {
        role: Role;
        id: number;
        phone_num: string;
      }
    }
  }