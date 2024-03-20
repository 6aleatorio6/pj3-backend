import prisma from '../../prisma.js';

export default async function postPaia(req, res) {
  try {
    const user = await prisma.userTeste.create({
      data: {
        nome: "req.body.nome",
      },
    });

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
