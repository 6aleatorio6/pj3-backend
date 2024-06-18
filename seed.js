import prisma from './src/prisma.js';
import { gerarHash } from './src/services/auth/helpersAuth.js';

function FiltrarDatCat(datCat) {
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
        uuid: 'c9229a1e-1ad6-41dd-b27e-3b45707e6ed1',
        funcionarioId: 1,
        descricao: "A Aranha Pernuda é um aracnídeo encontrado em áreas tropicais, conhecido por suas longas pernas e habilidades de tecer teias complexas e resistentes.",
        nomePopular: 'Aranha Pernuda',
        nomeCientifico: 'Opiliones sp.',
        som: 'public/?uri=audio/ARANHA.mp3',
        medalha: 'public/?uri=images/medalha/medalhaPassaro.png',
        especie: 'Aracnídeos',
        ftModel: 'public/?uri=images/ftModel/aranhaPaia.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Aranha-Pernuda/Aranhapernuda(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Aranha-Pernuda/Aranhapernuda(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Aranha-Pernuda/Aranhapernuda(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Aranha-Pernuda/Aranhapernuda(4).jpg'
        ]
      },
      {
        uuid: 'ff3eb595-49f7-44c6-b368-32d9cfe6d844',
        funcionarioId: 2,
        descricao: "O Calango é um lagarto pequeno e ágil encontrado em diversas regiões do Brasil, principalmente em áreas quentes e secas, conhecido por sua capacidade de se camuflar.",
        nomePopular: 'Calango',
        nomeCientifico: 'Tropidurus sp.',
        som: 'public/?uri=audio/CALANGO.mp3',
        medalha: 'public/?uri=images/medalha/medalhaBorboleta.png',
        especie: 'Répteis',
        ftModel: 'public/?uri=images/ftModel/dinossauro.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Calango/calango(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Calango/calango(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Calango/calango(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Calango/calango(4).jpg'
        ]
      },
      {
        uuid: 'b705ec15-f909-474a-be9c-0704e6ad8a60',
        funcionarioId: 1,
        descricao: "A Capivara (Hydrochoerus hydrochaeris) é o maior roedor do mundo, encontrado em grande parte da América do Sul, vivendo próximo a corpos d'água e conhecida por seu comportamento sociável.",
        nomePopular: 'Capivara',
        nomeCientifico: 'Hydrochoerus hydrochaeris',
        som: 'public/?uri=audio/CAPIVARA.mp3',
        medalha: 'public/?uri=images/medalha/medalhaArvore.png',
        especie: 'Mamíferos',
        ftModel: 'public/?uri=images/ftModel/coisa.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Capivara/Capivara(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Capivara/Capivara(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Capivara/Capivara(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Capivara/Capivara(4).jpg'
        ]
      },
      {
        uuid: '134b0f51-46a7-44b8-9ec1-65114273cf40',
        funcionarioId: 2,
        descricao: "O Caraguatá é uma planta da família Bromeliaceae, nativa de regiões tropicais da América do Sul, conhecida por suas folhas espinhosas e flores coloridas.",
        nomePopular: 'Caraguatá',
        nomeCientifico: 'Bromelia balansae',
        som: 'public/?uri=audio/PLANTA.mp3',
        medalha: 'public/?uri=images/medalha/medalhaArvore2.png',
        especie: 'Plantas',
        ftModel: 'public/?uri=images/ftModel/planta.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Caraguata/Caraguatá(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Caraguata/Caraguatá(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Caraguata/Caraguatá(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Caraguata/Caraguatá(4).jpg'
        ]
      },
      {
        uuid: 'e7ce4c8c-f4c6-4663-adb4-203fa0992d3d',
        funcionarioId: 1,
        descricao: "O Esquilo (Sciurus vulgaris) é um roedor encontrado em florestas da Europa e da Ásia, conhecido por sua cauda espessa e peluda e por armazenar alimentos para o inverno.",
        nomePopular: 'Esquilo',
        nomeCientifico: 'Sciurus vulgaris',
        som: 'public/?uri=audio/ESQUILO.mp3',
        medalha: 'public/?uri=images/medalha/medalhaArvore.png',
        especie: 'Mamíferos',
        ftModel: 'public/?uri=images/ftModel/coisa2.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Esquilo/CaxingueleVertical(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Esquilo/CaxingueleVertical(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Esquilo/CaxingueleVertical(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Esquilo/CaxingueleVertical(4).jpg'
        ]
      },
      {
        uuid: 'c4b5a67a-d835-4d75-bc3e-4e7d2d7a676a',
        funcionarioId: 2,
        descricao: "O Juqueriquere-tupi-guarani é uma planta rara, nativa de regiões específicas do Brasil, conhecida por suas propriedades medicinais e por seu nome de origem indígena.",
        nomePopular: 'Juqueriquere-tupi-guarani',
        nomeCientifico: 'Plantae rarus',
        som: 'public/?uri=audio/JUQUERI.mp3',
        medalha: 'public/?uri=images/medalha/medalhaArvore2.png',
        especie: 'Plantas',
        ftModel: 'public/?uri=images/ftModel/arvorePaia.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Juqueriquere-tupi-guarani/Dormideira(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Juqueriquere-tupi-guarani/Dormideira(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Juqueriquere-tupi-guarani/Dormideira(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Juqueriquere-tupi-guarani/Dormideira(4).jpg'
        ]
      },
      {
        uuid: 'b705ec15-f909-474a-be9c-0704e6ad8a61',
        funcionarioId: 1,
        descricao: "O Passarinho-vermelho-sangue é uma ave conhecida por sua plumagem vibrante e canto melodioso, comum em diversas regiões do Brasil, especialmente em áreas de floresta.",
        nomePopular: 'Passarinho-vermelho-sangue',
        nomeCientifico: 'Passerina ciris',
        som: 'public/?uri=audio/PASSARINHO.mp3',
        medalha: 'public/?uri=images/medalha/medalhaPassaro.png',
        especie: 'Aves',
        ftModel: 'public/?uri=images/ftModel/passaroVerm.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Passarinho-vermelho-sangue/TieSangue(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Passarinho-vermelho-sangue/TieSangue(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Passarinho-vermelho-sangue/TieSangue(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Passarinho-vermelho-sangue/TieSangue(4).jpg'
        ]
      },
      {
        uuid: '134b0f51-46a7-44b8-9ec1-65114273cf41',
        funcionarioId: 2,
        descricao: "A Quaresmeira é uma árvore nativa do Brasil, conhecida por suas flores roxas que florescem durante a quaresma, sendo comum em jardins e parques urbanos.",
        nomePopular: 'Quaresmeira',
        nomeCientifico: 'Tibouchina granulosa',
        som: 'public/?uri=audio/PLANTA.mp3',
        medalha: 'public/?uri=images/medalha/medalhaArvore.png',
        especie: 'Plantas',
        ftModel: 'public/?uri=images/ftModel/arvorePaiada.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Quaresmeira/quaresmeira(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Quaresmeira/quaresmeira(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Quaresmeira/quaresmeira(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Quaresmeira/quaresmeira(4).jpg'
        ]
      },
      {
        uuid: 'c9229a1e-1ad6-41dd-b27e-3b45707e6ed2',
        funcionarioId: 1,
        descricao: "A Saíra-sete-cores é uma pequena ave de plumagem multicolorida, encontrada em florestas tropicais e conhecida por sua beleza e pelo canto melodioso.",
        nomePopular: 'Saíra-sete-cores',
        nomeCientifico: 'Tangara seledon',
        som: 'public/?uri=audio/SAIRA.mp3',
        medalha: 'public/?uri=images/medalha/medalhaPassaro.png',
        especie: 'Aves',
        ftModel: 'public/?uri=images/ftModel/passaroPsicopata.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Saira-sete-cores/saira(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Saira-sete-cores/saira(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Saira-sete-cores/saira(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Saira-sete-cores/saira(4).jpg'
        ]
      },
      {
        uuid: 'ff3eb595-49f7-44c6-b368-32d9cfe6d845',
        funcionarioId: 2,
        descricao: "O Tatu é um mamífero noturno encontrado em várias partes da América do Sul, conhecido por sua carapaça dura que o protege de predadores.",
        nomePopular: 'Tatu',
        nomeCientifico: 'Dasypus novemcinctus',
        som: 'public/?uri=audio/TATU.mp3',
        medalha: 'public/?uri=images/medalha/medalhaArvore.png',
        especie: 'Mamíferos',
        ftModel: 'public/?uri=images/ftModel/tatuPaia.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/tatu/Tatu-Galinha(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/tatu/Tatu-Galinha(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/tatu/Tatu-Galinha(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/tatu/Tatu-Galinha(4).jpg'
        ]
      },
      {
        uuid: 'b4424545-99dd-40bb-9e0e-f684ac1c41e7',
        funcionarioId: 1,
        descricao: "O Teiú é um lagarto grande encontrado em florestas tropicais da América do Sul, conhecido por sua pele escamosa e comportamento agressivo quando ameaçado.",
        nomePopular: 'Teiú',
        nomeCientifico: 'Salvator merianae',
        som: 'public/?uri=audio/TEIU.mp3',
        medalha: 'public/?uri=images/medalha/medalhaPassaro.png',
        especie: 'Répteis',
        ftModel: 'public/?uri=images/ftModel/dinoEstranho.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Teiu/Teiu(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Teiu/Teiu(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Teiu/Teiu(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Teiu/Teiu(4).jpg'
        ]
      },
      {
        uuid: 'e7ce4c8c-f4c6-4663-adb4-203fa0992d4e',
        funcionarioId: 2,
        descricao: "O Tucano-bico-verde (Ramphastos dicolorus) é uma ave tropical da América do Sul, reconhecida pelo bico verde e corpo colorido, habitando florestas e matas densas.",
        nomePopular: 'Tucano-bico-verde',
        nomeCientifico: 'Ramphastos dicolorus',
        som: 'public/?uri=audio/TUCANO.mp3',
        medalha: 'public/?uri=images/medalha/medalhaPassaro.png',
        especie: 'Aves',
        ftModel: 'public/?uri=images/ftModel/tucanoPaiado.png',
        fotosGaleria: [
          'public/?uri=images/pastaDasImagensDosAnimais/Tucano-bico-verde/TucanoBicoVerde(1).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Tucano-bico-verde/TucanoBicoVerde(2).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Tucano-bico-verde/TucanoBicoVerde(3).jpg',
          'public/?uri=images/pastaDasImagensDosAnimais/Tucano-bico-verde/TucanoBicoVerde(4).jpg'
        ]
      }
    ];


    const datCat2 = [...datCat]

    const datCatgaleria = cadastrarImagensGaleria(datCat2)
    const datCatFiltrado = FiltrarDatCat(datCat)


    await prisma.catalogo.createMany({ data: datCatFiltrado }); // CATALOGO
    await prisma.catalogoGaleria.createMany({ data: datCatgaleria });

    const usuarios = [
      {
        email: 'jubileu@gmail.com',
        senha: 'senha123',
        foto: 'foto1.png',
        apelido: 'jubileu',
        cidade: 'Caraguatatuba',
        nome: "Jubileu dos Santos",
        sexo: 'M'
      },
      {
        email: 'Silvana@gmail.com',
        senha: 'senha123',
        foto: 'foto2.png',
        apelido: 'Silvana',
        cidade: 'Outro',
        nome: "Silvana dos Santos",
        sexo: 'F'
      },
      {
        apelido: 'Santos',
        cidade: 'Outro',
        nome: "Santos dos Santos",
        sexo: 'O'
      }
    ]

    await prisma.usuario.createMany({
      data: usuarios
    })


    const visitas = [
      {
        usuario_id: 1,
        dataDaVisita: new Date('2024-05-20T10:30:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 1,
        dataDaVisita: new Date('2024-05-25T11:00:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 1,
        dataDaVisita: new Date('2024-05-30T12:00:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 2,
        dataDaVisita: new Date('2024-05-22T09:30:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 2,
        dataDaVisita: new Date('2024-05-27T10:00:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 2,
        dataDaVisita: new Date('2024-06-01T11:30:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 3,
        dataDaVisita: new Date('2024-05-24T08:30:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 3,
        dataDaVisita: new Date('2024-05-29T09:00:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 3,
        dataDaVisita: new Date('2024-06-05T10:30:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 1,
        dataDaVisita: new Date('2024-06-10T11:30:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 2,
        dataDaVisita: new Date('2024-06-12T12:00:00Z'),
        deleted_at: null
      },
      {
        usuario_id: 3,
        dataDaVisita: new Date('2024-06-15T10:00:00Z'),
        deleted_at: null
      }
    ];    
    

    await prisma.visitas.createMany({
      data: visitas
    })



  } catch (error) {
    console.log('O banco já contém dados');
    console.log(error);
  }
})();
