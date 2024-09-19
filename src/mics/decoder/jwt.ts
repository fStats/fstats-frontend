import {User} from "../../services/types.ts";

export const getUserFromJWT = (token: string | undefined) => {
    if (token === undefined || token.length <= 0) return {
        id: 0,
        username: ""
    } as User
    return JSON.parse(base64UrlDecode(token.split('.')[1]));
}

function base64UrlDecode(str: string) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');
    while (str.length % 4) {
        str += '=';
    }
    let binaryString = atob(str);
    let bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
}