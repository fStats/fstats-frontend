import {t} from "i18next";

export const serverMessageKeyMap: Record<string, string> = {
    "Incorrect username or password": "server.incorrect",
    "Username or password not match requirements": "server.notmatchrequirements",
    "User created": "server.created",
    "Username already exist": "server.exist",
    "Project ID must be number": "server.incorrectid",
    "User not found": "server.usernotfound",
    "Project name can't be empty": "server.empty",
    "Project name doesn't match requirements": "server.notmatch",
    "Something went wrong": "server.something",
    "Incorrect project ID": "server.incorrectprojectid",
    "Project not found": "server.notfound",
    "No data provided for update": "server.nodata",
    "Project name not match requirements": "server.requirements",
    "Username not match requirements": "server.userrequirements",
    "Password not match requirements": "server.passrequirements",
};

export const getTranslateKey = (message: string): string => {
    const key = serverMessageKeyMap[message];
    return key ? t(key) : message;
};