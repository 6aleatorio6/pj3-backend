import prisma from './src/prisma.js';
import { gerarHash } from './src/services/auth/helpersAuth.js';

const desc =
  'Mussum Ipsum, cacilds vidis litro abertis.  Mais vale um bebadis conhecidiss, que um alcoolatra anonimis. Nec orci ornare consequat. Praesent lacinia ultrices consectetur. Sed non ipsum felis. Praesent malesuada urna nisi, quis volutpat erat hendrerit non. Nam vulputate dapibus.Suco de cevadiss, é um leite divinis!';

(async function seed() {
  try {
    await prisma.funcionario.createMany({
      data: [
        {
          id: 1,
          nome: 'paia vegetal',
          roles: 'ADM',
          email: 'paiaTriste@gmail.com',
          cpf: 'vcsSãoTristes',
          senha: gerarHash('paiosinha'),
        },
        {
          id: 2,
          nome: 'paia guardinha',
          roles: 'TOTEM',
          email: 'paiaFeliz@gmail.com',
          cpf: 'vcsSãoFelizes',
          senha: gerarHash('paiosinha'),
        },
      ],
    }); // FUNCIONARIO

    const datCat = [
      {
        uuid: 'c9229a1e-1ad6-41dd-b27e-3b45707e6ed0',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'tucano paia',
        nomeCientifico: 'tucanus paianus',
        som: `/public/audio/beijavi.mp3`,
        medalha: `/public/images/medalha/medalhaPassaro.png`,
        estrela: 0,
        ftModel: `/public/images/ftModel/passaroPsicopata.png`,
      },
      {
        uuid: 'ff3eb595-49f7-44c6-b368-32d9cfe6d843',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Sabiá-laranjeira',
        nomeCientifico: 'Turdus rufiventris',
        som: `/public/audio/beijavi.mp3`,
        medalha: `/public/images/medalha/medalhaPassaro.png`,
        estrela: 0,
        ftModel: `/public/images/ftModel/passaroVerm.png`,
      },
      {
        uuid: '134b0f51-46a7-44b8-9ec1-65114273cf39',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Esquilo-vermelho',
        nomeCientifico: 'Sciurus vulgaris',
        som: `/public/audio/macaco.mp3.mp3`,
        medalha: `/public/images/medalha/medalhaArvore.png`,
        estrela: 0,
        ftModel: `/public/images/ftModel/esquilo.png`,
      },
      {
        uuid: 'e7ce4c8c-f4c6-4663-adb4-203fa0992d2c',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Arara-azul-grande',
        nomeCientifico: 'Anodorhynchus hyacinthinus',
        som: `public/audio/TIÊSANGUE.mp3`,
        medalha: `public/images/medalha/medalhaPassaro.png`,
        estrela: 0,
        ftModel: `public/images/ftModel/coisa2.png`,
      },
      {
        uuid: 'b4424545-99dd-40bb-9e0e-f684ac1c41e6',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Tucano-toco',
        nomeCientifico: 'Ramphastos toco',
        som: `public/audio/TIÊSANGUE.mp3`,
        medalha: `public/images/medalha/medalhaPassaro`,
        estrela: 0,
        ftModel: `public/images/ftModel/passaroVerm.png`,
      },
      {
        uuid: 'b705ec15-f909-474a-be9c-0704e6ad8a59',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Capivara',
        nomeCientifico: 'Hydrochoerus hydrochaeris',
        som: `public/audio/macaco.mp3`,
        medalha: `public/images/medalha/medalhaArvore.png`,
        estrela: 0,
        ftModel: `public/images/ftModel/esquilo.png`,
      },
      {
        uuid: '413f0a74-2aa7-4c7e-ad3d-bc70f64aadd7',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Quati',
        nomeCientifico: 'Nasua nasua',
        som: `public/audio/beijavi.mp3`,
        medalha: `public/images/medalha/medalhaPassaro.png`,
        estrela: 0,
        ftModel: `public/images/ftModel/coisa2.png`,
      },
      {
        uuid: '8bc2b088-1e95-4d19-8e6e-39a6f248595c',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Sagui',
        nomeCientifico: 'Callithrix jacchus',
        som: `public/audio/macaco.mp3`,
        medalha: `public/images/medalha/medalhaArvore2.png`,
        estrela: 0,
        ftModel: `public/images/ftModel/dinossauro.png`,
      },
      {
        uuid: 'b7340988-2243-4401-b11d-18c6aacb056f',
        funcionarioId: 1,
        descricao: desc,
        nomePopular: 'Gavião-real',
        nomeCientifico: 'Harpia harpyja',
        som: `public/audio/TIÊSANGUE.mp3`,
        medalha: `public/images/medalha/medalhaPassaro.png`,
        estrela: 0,
        ftModel: `public/images/ftModel/passaroPsicopata.png`,
      },
    ];
    await prisma.catalogo.createMany({ data: datCat }); // CATALOGO

    await prisma.catalogoGaleria.createMany({
      data: [
        `public/images/ftModel/passaroPsicopata.png`,
        `public/images/ftModel/passaroPsicopata.png`,
      ].flatMap((url) =>
        datCat.map((cat) => ({ catalogo_uuid: cat.uuid, url })),
      ),
    }); // GALERIA
  } catch (error) {
    console.log('O banco ja contém dados');
    console.log(error);
  }
})();
