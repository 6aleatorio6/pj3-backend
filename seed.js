import prisma from './src/prisma.js';
import { gerarHash } from './src/services/auth/helpersAuth.js';

function FiltrarDatCat(datCat){
    const sla = datCat.map(animal => {
        delete animal.fotosGaleria
        return animal
    })
    return sla
}

function cadastrarImagensGaleria(datCat) {
  const catalogoGaleria = [];

  datCat.forEach(item => {
      item.fotosGaleria.forEach(url => {
          catalogoGaleria.push({
            catalogo_uuid: item.uuid, 
            url
          });
      });
  });

  return catalogoGaleria;
}

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
        descricao: "O Tucano-de-bico-preto (Ramphastos vitellinus) é uma espécie de ave que habita florestas tropicais e é conhecido por seu bico grande e colorido, usado tanto para alimentação quanto para atração de parceiros.",
        nomePopular: 'Tucano-de-bico-preto',
        nomeCientifico: 'Ramphastos vitellinus',
        som: `public/?uri=audio/TUCANOBICOVERDE.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/passaroPsicopata.png`,
        fotosGaleria: [`teste`, `teste2`]
      },
      {
        uuid: 'ff3eb595-49f7-44c6-b368-32d9cfe6d843',
        funcionarioId: 2,
        descricao: "O Sabiá-laranjeira (Turdus rufiventris) é uma ave comum no Brasil, famosa pelo seu canto melodioso e por ser um dos símbolos nacionais, com plumagem marrom e barriga alaranjada.",
        nomePopular: 'Sabiá-laranjeira',
        nomeCientifico: 'Turdus rufiventris',
        som: `public/?uri=audio/beijavi.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/passaroVerm.png`,
        fotosGaleria: [`teste`, '3teste']
      },
      {
        uuid: '134b0f51-46a7-44b8-9ec1-65114273cf39',
        funcionarioId: 1,
        descricao: "O Esquilo-vermelho (Sciurus vulgaris) é um roedor encontrado em florestas da Europa e da Ásia, conhecido por sua cauda espessa e peluda e por armazenar alimentos para o inverno.",
        nomePopular: 'Esquilo-vermelho',
        nomeCientifico: 'Sciurus vulgaris',
        som: `public/?uri=audio/macaco.mp3`,
        medalha: `public/?uri=images/medalha/medalhaArvore.png`,
        especie: 'Mamíferos',
        ftModel: `public/?uri=images/ftModel/esquilo.png`,
        fotosGaleria: [`teste`]
      },
      {
        uuid: 'e7ce4c8c-f4c6-4663-adb4-203fa0992d2c',
        funcionarioId: 2,
        descricao: "A Arara-azul-grande (Anodorhynchus hyacinthinus) é uma ave nativa do Brasil, conhecida por sua plumagem azul vibrante e grande porte, sendo a maior arara do mundo.",
        nomePopular: 'Arara-azul-grande',
        nomeCientifico: 'Anodorhynchus hyacinthinus',
        som: `public/?uri=audio/TIÊSANGUE.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/coisa2.png`,
        fotosGaleria: [`teste`]
      },
      {
        uuid: 'b4424545-99dd-40bb-9e0e-f684ac1c41e6',
        funcionarioId: 1,
        descricao: "O Tucano-toco (Ramphastos toco) é uma espécie de tucano reconhecível por seu bico enorme e laranja, que vive em áreas de floresta tropical e savanas na América do Sul.",
        nomePopular: 'Tucano-toco',
        nomeCientifico: 'Ramphastos toco',
        som: `public/?uri=audio/TUCANOBICOVerde.mp3`,
        medalha: `public/?uri=images/medalha/medalhaPassaro.png`,
        especie: 'Aves',
        ftModel: `public/?uri=images/ftModel/passaroVerm.png`,
        fotosGaleria: [`teste`]
      },
      {
        uuid: 'b705ec15-f909-474a-be9c-0704e6ad8a59',
        funcionarioId: 2,
        descricao: "A Capivara (Hydrochoerus hydrochaeris) é o maior roedor do mundo, encontrado em grande parte da América do Sul, vivendo próximo a corpos d'água e conhecida por seu comportamento sociável.",
        nomePopular: 'Capivara',
        nomeCientifico: 'Hydrochoerus hydrochaeris',
        som: `public/?uri=audio/CAPIVARA.mp3`,
        medalha: `public/?uri=images/medalha/medalhaArvore.png`,
        especie: 'Mamíferos',
        ftModel: `public/?uri=images/ftModel/esquilo.png`,
        fotosGaleria: [`teste`]
      },
    ];

    const datCat2 = [...datCat]

    const datCatgaleria = cadastrarImagensGaleria(datCat2)    
    const datCatFiltrado = FiltrarDatCat(datCat)


    await prisma.catalogo.createMany({ data: datCatFiltrado }); // CATALOGO
    await prisma.catalogoGaleria.createMany({ data: datCatgaleria });
    
    
   
  } catch (error) {
    console.log('O banco já contém dados');
    console.log(error);
  }
})();
