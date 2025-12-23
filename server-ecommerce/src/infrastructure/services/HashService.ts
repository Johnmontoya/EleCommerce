import bcrypt from "bcrypt";

export class HashService {
    private readonly SALT_ROUNDS = 10;

    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, this.SALT_ROUNDS);
    }

    async compare(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}