
export function isEmail(_email:any): boolean {
    if ( !isString(_email) ) {
        return false;
    }

    const check = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    return check.test(_email);
}

export function isString(_value:any): boolean {
    if ( (_value instanceof String || typeof _value === 'string' ) ) {
        return true;
    }
    else {
        return false;
    }
}


export function checkMinAndMaxLength(_value:any , min:number , max: number): boolean {
    let verifyValue = undefined;

    if ( isString(_value) ) {
        verifyValue = String(_value);
    }
    
    if ( verifyValue == undefined ) {
        return false;
    }

    if ( verifyValue.length >= min && verifyValue.length <= max ) {
        return true;
    }
    else {
        return false;
    }
}