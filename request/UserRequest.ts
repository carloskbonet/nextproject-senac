import { isEmail , checkMinAndMaxLength } from "./Check";

export function userRequest(_email:any , _cpf:any , _password:any , _name:any) {
    if ( !checkMinAndMaxLength(_cpf , 11 , 14) ) {
        return { status: false, message: "Invalid CPF" }
    }
    
    if ( !checkMinAndMaxLength(_password , 6 , 32) ) {
        return { status: false, message: "Invalid Password" }
    }

    if ( !checkMinAndMaxLength(_name, 3, 32) && _name != undefined) {
        return { status: false, message: "Invalid Name" }
    }

    if ( !isEmail(_email) ) {
        return { status: false, message: "Invalid Email" }
    }

    return { status: true }
}