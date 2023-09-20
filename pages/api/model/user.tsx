import { prisma } from '../../../db';

export async function createUser(
     _cpf:string, _email:string, _password:string, _name = undefined) {

    const user = prisma.user.create({
        data: {
            name: _name,
            cpf: _cpf,
            email: _email,
            password: _password
        }
    });
    
    return user;
}