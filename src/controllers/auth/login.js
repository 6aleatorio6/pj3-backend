export default (req, res) => {
  res.json({
    message: 'sucesso no login',
    token: req.user.token,
  });
};
