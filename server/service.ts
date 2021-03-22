import { usersCollection } from "./db";

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

export const getUserById = (id: string):User => {
    return usersCollection.find(item => item.id === id && item.isDeleted === false)
}

export const updateUser = (updatedUser: User): void => {
    const existingUser = getUserById(updatedUser.id)
    Object.assign(existingUser, updatedUser)
}

export const createUser = (user: User): void => {
    usersCollection.push(user);
}

export const removeUser = (id: string): void => {
    const user = getUserById(id)
    user.isDeleted = true
}