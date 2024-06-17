import prisma from './src/prisma.js';
import { gerarHash } from './src/services/auth/helpersAuth.js';

const desc =
  'Mussum Ipsum, cacilds vidis litro abertis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus. Suco de cevadiss, é um leite divinis!';

(async function seed() {
  try {
    await prisma.funcionario.createMany({
      data: [
        {
          id: 1,
          nome: 'Paia Cabral',
          roles: 'ADM',
          email: 'paiaTriste@gmail.com',
          cpf: '123.123.132-05',
          senha: gerarHash('paia123'),
        },
        {
          id: 2,
          nome: 'Paio Silva',
          roles: 'TOTEM',
          email: 'paiaFeliz@gmail.com',
          cpf: '123.123.132-05',
          senha: gerarHash('paia123'),
        },
      ],
    }); // FUNCIONARIO

    const datCat = [
      {
        uuid: 'c9229a1e-1ad6-41dd-b27e-3b45707e6ed0',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Tucano-de-bico-preto',
        nomeCientifico: 'Ramphastos vitellinus',
        som: `public/?uri=audio/beijavi.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/passaroPsicopata.png`,
      },
      {
        uuid: 'ff3eb595-49f7-44c6-b368-32d9cfe6d843',
        funcionarioId: 2,
        descricao: desc,
        nomePopular: 'Sabiá-laranjeira',
        nomeCientifico: 'Turdus rufiventris',
        som: `public/?uri=audio/beijavi.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/passaroVerm.png`,
      },
      {
        uuid: '134b0f51-46a7-44b8-9ec1-65114273cf39',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Esquilo-vermelho',
        nomeCientifico: 'Sciurus vulgaris',
        som: `public/?uri=audio/macaco.mp3`,
        medalha: `public/?uri=images/medalha/medalhaArvore.png`,
        especie: 'Mamíferos',
        ftModel: `public/?uri=images/ftModel/esquilo.png`,
      },
      {
        uuid: 'e7ce4c8c-f4c6-4663-adb4-203fa0992d2c',
        funcionarioId: 2,
        descricao: desc,
        nomePopular: 'Arara-azul-grande',
        nomeCientifico: 'Anodorhynchus hyacinthinus',
        som: `public/?uri=audio/TIÊSANGUE.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/coisa2.png`,
      },
      {
        uuid: 'b4424545-99dd-40bb-9e0e-f684ac1c41e6',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Tucano-toco',
        nomeCientifico: 'Ramphastos toco',
        som: `public/?uri=audio/TIÊSANGUE.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/passaroVerm.png`,
      },
      {
        uuid: 'b705ec15-f909-474a-be9c-0704e6ad8a59',
        funcionarioId: 2,
        descricao: desc,
        nomePopular: 'Capivara',
        nomeCientifico: 'Hydrochoerus hydrochaeris',
        som: `public/?uri=audio/macaco.mp3`,
        medalha: `public/?uri=images/medalha/medalhaArvore.png`,
        especie: 'Mamíferos',
        ftModel: `public/?uri=images/ftModel/esquilo.png`,
      },
    ];
    await prisma.catalogo.createMany({ data: datCat }); // CATALOGO

    await prisma.catalogoGaleria.createMany({
      data: [
        `public/?uri=images/ftModel/passaroPsicopata.png`,
        `public/?uri=images/ftModel/passaroPsicopata.png`,
      ].flatMap((url) =>
        datCat.map((cat) => ({ catalogo_uuid: cat.uuid, url })),
      ),
    }); // GALERIA
  } catch (error) {
    console.log('O banco já contém dados');
    console.log(error);
  }
})();
