export{}
const UserService = require("../userService");
const commitFn = jest.fn();
jest.mock('../../sequelize', () => {
  return {
    transaction: () => ({
      commit: commitFn
    })
  };
});


const userModel = {
  create: (user) => {
    return {
      toJSON: () => ({
        ...user
      })
    }
  },
  update: (user) => ([
    null,
    { 
      id: user.id,
      login: user.login,
      password: user.password
  }]),
  findByPk: (id: string) => {
    return {
      toJSON: () => ({
        login: "Test login", 
        password: "Test password", 
        id: 3
      })
    }
  },
  findOne: () => ({
    id: 1,
    login: 'login',
    password: 'password'
  }),
  findAll: () => ([
    {
      id: 1,
      login: 'First user login',
      password: "Password"
    },
    {
      id: 2,
      login: 'Second user login',
      password: "Password"
    }
  ])
};

const userGroupModel = {
    create: jest.fn()
};

const userService = new UserService(userModel, userGroupModel);

describe('User service tests', () => {
  it('loginUser test', async () => {
    const user = await userService.loginUser('login', 'password')

    expect(user).toEqual({login: "login", password: 'password', id: 1});
  });
  it('getGroupById test', async () => {
    const user = await userService.getUserById(3)

    expect(user).toEqual({login: "Test login", password: 'Test password', id: 3});
  });
  it('getUserListByLogin test', async () => {
    const users = await userService.getUserListByLogin()

    expect(users).toEqual([
      {
        id: 1,
        login: 'First user login',
        password: "Password"
      },
      {
        id: 2,
        login: 'Second user login',
        password: "Password"
      }
    ]);
  });
  it('updateUser test', async () => {
    const user = await userService.updateUser({ id: 4, login: "Login", password: "Password"})

    expect(user).toEqual({ id: 4, login: "Login", password: "Password"});
  });
  it('createUser test', async () => {
    const user = await userService.createUser({ login: "Login", password: "Password", age: 5})

    expect(user).toEqual({ id: expect.any(String), login: "Login", password: "Password",  age: 5, isDeleted: false});
  });
  it('removeUser test', async () => {
    const result = await userService.removeUser(3)

    expect(result).toBeNull();
  });
  it('addUsersToGroup test', async () => {
    await userService.addUsersToGroup(3, [1, 2])

    expect(commitFn).toHaveBeenCalled();
  });
});
