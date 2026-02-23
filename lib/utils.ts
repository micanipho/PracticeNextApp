import nodeCrypto from 'node:crypto';

const generateSalt = () => {
    return nodeCrypto.randomBytes(16).toString('hex');
}

export const hashPassword = (password: string) => {
    const salt = generateSalt();
    return {
        hashedPassword: nodeCrypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex'),
        salt
    };
}

export const comparePassword = (password: string, hash: string, salt: string) => {
    return nodeCrypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex') === hash;
}

