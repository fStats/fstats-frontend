import {t} from "i18next";

export const serverMessageKeyMap: Record<string, string> = {
    "Incorrect username or password": "page.login.server.incorrect",
    "Username or password not match requirements": "page.register.server.notmatchrequirements",
    "User created": "page.register.server.created",
    "Username already exist": "page.register.server.exist",
    "Project ID must be number": "page.profile.server.incorrectid",
    "User not found": "page.profile.server.usernotfound",
    "Project name can't be empty": "page.profile.dialog.create.server.empty",
    "Project name doesn't match requirements": "page.profile.dialog.create.server.notmatch",
    "Something went wrong": "page.server.something",
    "Incorrect project ID": "page.profile.dialog.delete.server.incorrect",
    "Project not found": "page.profile.dialog.delete.server.notfound",
    "No data provided for update": "page.profile.dialog.edit.server.nodata",
    "Project name not match requirements": "page.profile.dialog.edit.server.requirements",
    "Username not match requirements": "page.profile.dialog.user.edit.server.userrequirements",
    "Password not match requirements": "page.profile.dialog.user.edit.server.passrequirements",
};

export const getTranslateKey = (message: string): string => {
    const key = serverMessageKeyMap[message];
    return key ? t(key) : message;
};