import { createUserModel, findUserModelByCPF, findUserModelByEmail } from '../model/User';

export async function createUser(_email:string , _cpf:string , _password:string , _name?:string) {
    const userByCPF = await findUserModelByCPF(_cpf);

    if (userByCPF != undefined) {
        return { message: "CPF already registered." };
    }
    
    const userByEmail = await findUserModelByEmail(_email);

    if (userByEmail != undefined) {
        return { message: "Email already registered." };
    }

    const response = await createUserModel(_cpf , _email , _password , _name);
    return response;
}