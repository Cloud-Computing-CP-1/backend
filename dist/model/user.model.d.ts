import type { User } from "../types/User.js";
export declare const findByEmail: (ClientEmail: string) => Promise<User | null>;
export declare const Create: (userdata: Omit<User, "id">) => Promise<User>;
//# sourceMappingURL=user.model.d.ts.map