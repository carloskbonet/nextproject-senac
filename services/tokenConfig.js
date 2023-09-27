import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;

export function generateToken(_email) {
    return jwt.sign( { email: _email } , SECRET );
}

function readToken(token) {
    try {
        return jwt.verify(token , SECRET);
    }
    catch (err) {
        throw new ('Invalid Token');
    }
}

export function checkToken(token) {
    return readToken(token);
}