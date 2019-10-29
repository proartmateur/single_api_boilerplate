const { UserService } = require('../services/users');
const { strings } = require('../utils/lang/es');

const usersRouter = router => {
  const userService = new UserService();
  // eslint-disable-next-line no-unused-vars
  router.get('/users', async (req, res, next) => {
    const storeUsers = await userService.getUsers();
    res.status(200).json(storeUsers);
  });

  // eslint-disable-next-line no-unused-vars
  router.get('/users/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const storeUser = await userService.getUser(userId);
    res.status(200).json(storeUser);
  });

  // eslint-disable-next-line no-unused-vars
  router.post('/users', async (req, res, next) => {
    const { body: user } = req;
    const storeUser = await userService.createUser(user);
    res.status(201).json({ userId: storeUser, message: strings.user.created });
  });

  // eslint-disable-next-line no-unused-vars
  router.put('/users/:userId', async (req, res, next) => {
    const { body: user } = req;
    const { userId } = req.params;
    const updatedUser = await userService.updateUser(userId, user);
    res
      .status(200)
      .json({ payload: updatedUser, message: strings.user.updated });
  });

  // eslint-disable-next-line no-unused-vars
  router.delete('/users/:userId', async (req, res, next) => {
    const { userId } = req.params;
    const deletedUser = await userService.deleteUser(userId);
    res.status(200).json({
      payload: deletedUser || userId,
      message: strings.user.deleted
    });
  });
};

module.exports = usersRouter;
