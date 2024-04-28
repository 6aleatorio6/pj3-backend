import createController from '../../helpers/createController.js';

export default createController((req, res) => {
  res.json({
    message: 'sucesso no login',
    token: req.user.token,
  });
});
