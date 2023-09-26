import { prisma } from '../../../db';

export async function createUserModel(
     _cpf:string, _email:string, _password:string, _name?:string) {

    const user = await prisma.user.create({
        data: {
            name: _name,
            cpf: _cpf,
            email: _email,
            password: _password
        }
    });
    
    return user;
}

export async function findUserModelByCPF(_cpf:string) {
    const user = await prisma.user.findUnique({
        where: {
            cpf: _cpf
        }
    });

    return user;
}

export async function findUserModelByEmail(_email:string) {
    const user = await prisma.user.findUnique({
        where: {
            email: _email
        }
    });

    return user;
}

export async function findUserModelLogin(_email:string, _password:string) {
    const user = await prisma.user.findUnique({
        where: {
            email: _email,
            password: _password
        }
    });

    return user;
}