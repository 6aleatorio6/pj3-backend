import prisma from '../../prisma.js';

export default async function getAllPaia(req, res) {
  try {
    const users = await prisma.userTeste.findMany();

    res.json(users);
  } catch (error) {
    res.status(500).json(error);
  }
}
