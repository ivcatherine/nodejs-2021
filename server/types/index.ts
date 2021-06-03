export enum GroupPermissions {
    read = 'READ', 
    write = 'WRITE', 
    delete = 'DELETE', 
    share = 'SHARE', 
    uploadFiles = 'UPLOAD_FILES'
}

export type Group = {
    id?: string;
    name: string;
    permissions: [GroupPermissions]
}

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};
