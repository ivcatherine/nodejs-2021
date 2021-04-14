export {};
const { UserModel } = require('../models/user.model');
const { usersCollection } = require('../db');

type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};

const getUserById = async (id) => {
    const user = await UserModel.findByPk(id)
    if(user){
        return user.toJSON();
    }
    return null
};

//rewrite to use DB
const getUserListByLogin = (substring, limits):User[] => {
    const userList = usersCollection.filter(user => user.login.startsWith(substring) && user.isDeleted === false);
    return userList.slice(0, limits);
};

const updateUser = async (user: User) => {
    const updatedUser = await UserModel.update({...user}, { where: { id: user.id }})
    return updatedUser;
    
};

const createUser = async (user: User) => {
    const createdUser = await UserModel.create({
        login: user.login,
        age: user.age,
        password: user.password,
        id: user.id,
        isDeleted: false
    });
    return createdUser.toJSON();
};

const removeUser = async (id: string) => {
    const deletedUser = await UserModel.update({isDeleted: true}, { where: { id }});
    return deletedUser;
};

module.exports = {
    getUserById,
    createUser,
    removeUser,
    updateUser,
    getUserListByLogin,
}
