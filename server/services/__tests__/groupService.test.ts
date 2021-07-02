export{}
const GroupService = require("../groupService");

const groupModel = {
  create: (group) => {
    return {
      toJSON: () => ({
        ...group
      })
    }
  },
  update: (group) => ([
    null,
    { 
      id: group.id,
      name: group.name,
      permissions: group.permissions
  }]),
  findByPk: (id: string) => {
    return {
      toJSON: () => ({
        id,
        name: 'Test name',
        permissions: ["READ", "WRITE"]
      })
    }
  },
  findAll: () => ([
    {
      id: 1,
      name: 'First group name',
      permissions: ["WRITE"]
    },
    {
      id: 2,
      name: 'Second group name',
      permissions: ["DELETE"]
    }
  ]),
  destroy: () => {}
};

const userGroupModel = {
  destroy: jest.fn()
};

const groupService = new GroupService(groupModel, userGroupModel);

describe('Group service tests', () => {
  it('getGroupById test', async () => {
    const group = await groupService.getGroupById(3)

    expect(group).toEqual({name: "Test name", permissions: ["READ", "WRITE"], id: 3});
  });

  it('getAllGroups test', async () => {
    const groups = await groupService.getAllGroups()

    expect(groups).toEqual([
      {
        id: 1,
        name: 'First group name',
        permissions: ["WRITE"]
      },
      {
        id: 2,
        name: 'Second group name',
        permissions: ["DELETE"]
      }
    ]);
  });

  it('removeGroup test', async () => {
    await groupService.removeGroup(3)

    expect(userGroupModel.destroy).toHaveBeenCalled();
  });

  it('updateGroup test', async () => {
    const group = await groupService.updateGroup({ id: 4, name: 'Test name', permissions: ['READ']})

    expect(group).toEqual({ id: 4, name: 'Test name', permissions: ['READ']});
  });

  it('createGroup test', async () => {
    const group = await groupService.createGroup({ name: 'Test name', permissions: ['READ']})

    expect(group).toEqual({ name: "Test name", permissions: ["READ"], id: expect.any(String) });
  });
});
