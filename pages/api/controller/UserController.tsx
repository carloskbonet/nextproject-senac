import { generateToken } from '@/services/tokenConfig';
import { createUserModel, findUserModelByCPF, findUserModelByEmail, findUserModelLogin } from '../model/user';

export async function createUser(_email: string, _cpf: string, _password: string, _name?: string) {
    try {
        const userByCPF = await findUserModelByCPF(_cpf);

        if (userByCPF != undefined) {
            return { message: "CPF already registered." };
        }

        const userByEmail = await findUserModelByEmail(_email);

        if (userByEmail != undefined) {
            return { message: "Email already registered." };
        }

        const response = await createUserModel(_cpf, _email, _password, _name);
        return response;
    }
    catch (err) {
        return { message: "Something went wrong" };
    }
}

export async function login(_email: string, _password: string) {
    try {
        const userLogin = await findUserModelLogin(_email, _password);

        if (userLogin == undefined) {
            return { message: "Incorrect email or password" }
        }

        const _token = generateToken(userLogin.email);

        return { token: _token }
    }
    catch (err) {
        return { message: "Something went wrong" };
    }
}