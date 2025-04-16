import * as bcrypt from 'bcrypt';


export function encodePassword(rawPassword: string) {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(rawPassword, salt);
    return hash;
}

export function comparePasswords(rawPassword: string, hash: string) {
    return bcrypt.compareSync(rawPassword, hash);
}