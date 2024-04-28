import createController from '../../helpers/createController.js';
import prisma from '../../prisma.js';

export default createController(async (req, res) => {
  const data = await prisma.$queryRaw`
        select u.id as userId, u.nome as userNome, count(*) as scanQntd
        from usuario u left join lidoPeloUser l on l.usuario_id = u.id
        where month(now()) = month(l.dataDaDescoberta) and 
                (day(now()) < 15 and day(l.dataDaDescoberta) < 15) or 
                (day(now()) > 15 and day(l.dataDaDescoberta) > 15) 
        group by u.nome;
    `;

  res.json(data);
});
