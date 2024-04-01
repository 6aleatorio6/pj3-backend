export default (req, res) => {
  const { cadastrar, profile, token } = req.user;

  res.json({
    message: cadastrar
      ? 'essa conta não está cadastrada, se cadastre primeiro'
      : 'sucesso no login',
    token,
    profile,
  });
};
