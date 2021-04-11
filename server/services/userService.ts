import { User } from '..';
import { usersCollection } from '../db';

export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

export const getUserById = async (id) => {
    const user = await User.findByPk(id)
    if(user){
        return user.toJSON();
    }
    return null
};

//rewrite to use DB
export const getUserListByLogin = (substring, limits):User[] => {
    const userList = usersCollection.filter(user => user.login.startsWith(substring) && user.isDeleted === false);
    return userList.slice(0, limits);
};

export const updateUser = async (user: User) => {
    const updatedUser = await User.update({...user}, { where: { id: user.id }})
    return updatedUser;
    
};

export const createUser = async (user: User) => {
    const createdUser = await User.create({
        login: user.login,
        age: user.age,
        password: user.password,
        id: user.id,
        isDeleted: false
    });
    return createdUser.toJSON();
};

export const removeUser = async (id: string) => {
    const deletedUser = await User.update({isDeleted: true}, { where: { id }});
    return deletedUser;
};
