import prisma from '../../prisma.js';
import { gerarHash } from '../auth/helpersAuth.js';
import { uploadFile } from '../uploadFiles/pontasFiles.js';
import fs from 'fs';

const foto1 = fs.readFileSync('src/assets/images/calango.jpg');
const foto2 = fs.readFileSync('src/assets/images/tucano.jpg');
const ftMedalha = fs.readFileSync('src/assets/images/medalha.jpg');
const audio = fs.readFileSync('src/assets/audio/TIÊSANGUE.mp3');

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

    await prisma.catalogo.createMany({
      data: [
        {
          uuid: '1',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'tucano paia',
          nomeCientifico: 'tucanus paianus',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '2',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Sabiá-laranjeira',
          nomeCientifico: 'Turdus rufiventris',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '3',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Esquilo-vermelho',
          nomeCientifico: 'Sciurus vulgaris',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '4',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Arara-azul-grande',
          nomeCientifico: 'Anodorhynchus hyacinthinus',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '5',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Tucano-toco',
          nomeCientifico: 'Ramphastos toco',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '6',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Capivara',
          nomeCientifico: 'Hydrochoerus hydrochaeris',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '7',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Quati',
          nomeCientifico: 'Nasua nasua',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '8',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Sagui',
          nomeCientifico: 'Callithrix jacchus',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '9',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Gavião-real',
          nomeCientifico: 'Harpia harpyja',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '10',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Coruja-buraqueira',
          nomeCientifico: 'Athene cunicularia',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '11',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Lontra',
          nomeCientifico: 'Lontra longicaudis',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
        {
          uuid: '12',
          funcionarioId: 1,
          descricao: desc,
          nomePopular: 'Papagaio-verdadeiro',
          nomeCientifico: 'Amazona aestiva',
          som: await uploadFile(audio, { mimeType: 'audio/mp3' }),
          medalha: await uploadFile(ftMedalha, { mimeType: 'image/jpg' }),
          estrela: 0,
          nascimento: '2022-12-31T00:00:00.000Z',
        },
      ],
    }); // CATALOGO

    await prisma.catalogoGaleria.createMany({
      data: [
        {
          id: 1,
          catalogo_uuid: '1',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 2,
          catalogo_uuid: '1',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 3,
          catalogo_uuid: '1',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 4,
          catalogo_uuid: '1',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 5,
          catalogo_uuid: '2',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 6,
          catalogo_uuid: '2',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 7,
          catalogo_uuid: '2',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 8,
          catalogo_uuid: '2',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 9,
          catalogo_uuid: '3',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 10,
          catalogo_uuid: '3',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 11,
          catalogo_uuid: '3',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 12,
          catalogo_uuid: '3',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 13,
          catalogo_uuid: '4',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 14,
          catalogo_uuid: '4',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 15,
          catalogo_uuid: '4',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 16,
          catalogo_uuid: '4',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 17,
          catalogo_uuid: '5',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 18,
          catalogo_uuid: '5',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 19,
          catalogo_uuid: '5',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 20,
          catalogo_uuid: '5',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 21,
          catalogo_uuid: '6',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 22,
          catalogo_uuid: '6',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 23,
          catalogo_uuid: '6',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 24,
          catalogo_uuid: '6',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 25,
          catalogo_uuid: '7',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 26,
          catalogo_uuid: '7',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 27,
          catalogo_uuid: '7',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 28,
          catalogo_uuid: '7',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 29,
          catalogo_uuid: '8',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 30,
          catalogo_uuid: '8',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 31,
          catalogo_uuid: '8',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 32,
          catalogo_uuid: '8',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 33,
          catalogo_uuid: '9',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 34,
          catalogo_uuid: '9',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 35,
          catalogo_uuid: '9',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 36,
          catalogo_uuid: '9',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 37,
          catalogo_uuid: '10',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 38,
          catalogo_uuid: '10',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 39,
          catalogo_uuid: '10',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 40,
          catalogo_uuid: '10',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 41,
          catalogo_uuid: '11',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 42,
          catalogo_uuid: '11',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 43,
          catalogo_uuid: '11',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 44,
          catalogo_uuid: '11',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 45,
          catalogo_uuid: '12',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 46,
          catalogo_uuid: '12',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
        {
          id: 47,
          catalogo_uuid: '12',
          url: await uploadFile(foto1, { mimeType: 'image/jpg' }),
        },
        {
          id: 48,
          catalogo_uuid: '12',
          url: await uploadFile(foto2, { mimeType: 'image/jpg' }),
        },
      ],
    }); // GALERIA
  } catch (error) {
    console.log('O banco ja contém dados');
    console.log(error);
  }
})();
