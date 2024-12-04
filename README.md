<p align="center">
  <img width="200" src="https://gist.githubusercontent.com/6aleatorio6/b7667f910d555388c0ef02588b38ec65/raw/183f785c99d9217605f8494ec6440c3cdc5b3b33/logo.png" alt="TechPass Logo"/>
</p>

<p align="center">
  <a href="https://www.typescriptlang.org/" target="_blank">
    <img src="https://img.shields.io/badge/TypeScript-Language-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript"/>
  </a>
   <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
    <img src="https://img.shields.io/badge/JavaScript-Language-F7DF1E?style=for-the-badge&logo=javascript" alt="JavaScript"/>
  </a>
</p>

<p align="center">
  <a href="https://reactnative.dev/" target="_blank">
    <img src="https://img.shields.io/badge/React%20Native-Mobile%20Framework-61DAFB?style=for-the-badge&logo=react" alt="React Native"/>
  </a>
  <a href="https://react-query.tanstack.com/" target="_blank">
    <img src="https://img.shields.io/badge/React%20Query-Data%20Fetching-FF4154?style=for-the-badge&logo=reactquery" alt="React Query"/>
  </a>
</p>

<p align="center">
  <a href="https://jwt.io/" target="_blank">
    <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens" alt="JWT"/>
  </a>
  <a href="https://www.postgresql.org/" target="_blank">
    <img src="https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=for-the-badge&logo=postgresql" alt="PostgreSQL"/>
  </a>
 <a href="https://expo.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Expo-Platform-000020?style=for-the-badge&logo=expo" alt="Expo"/>
  </a>
</p>

<p align="center">
  <a href="https://tamagui.dev/" target="_blank">
    <img src="https://img.shields.io/badge/Tamagui-UI%20Framework-000000?style=for-the-badge&logo=tamagui" alt="Tamagui"/>
  </a>
  <a href="https://github.com/pmndrs/zustand" target="_blank">
    <img src="https://img.shields.io/badge/Zustand-State%20Management-7A4B9B?style=for-the-badge&logo=zustand" alt="Zustand"/>
  </a>
    <a href="https://expressjs.com/" target="_blank">
    <img src="https://img.shields.io/badge/Express-Web%20Framework-000000?style=for-the-badge&logo=express" alt="Express"/>
  </a>
</p>

<p align="center">

  <a href="https://supertestjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/Supertest-HTTP%20Assertions-00D4B7?style=for-the-badge&logo=supertest" alt="Supertest"/>
  </a>
  <a href="https://jestjs.io/" target="_blank">
    <img src="https://img.shields.io/badge/Jest-Testing-00C7B7?style=for-the-badge&logo=jest" alt="Jest"/>
  </a>
    <a href="https://axios-http.com/" target="_blank">
    <img src="https://img.shields.io/badge/Axios-HTTP%20Client-5A29E4?style=for-the-badge&logo=axios" alt="Axios"/>
  </a>
   <a href="https://www.prisma.io/" target="_blank">
    <img src="https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma" alt="Prisma"/>
  </a>
</p>

<p align="center">
 <a href="https://www.npmjs.com/package/bcrypt" target="_blank">
    <img src="https://img.shields.io/badge/Bcrypt-Security-00C7B7?style=for-the-badge&logo=lock" alt="Bcrypt"/>
  </a>
 <a href="https://reactjs.org/" target="_blank">
    <img src="https://img.shields.io/badge/React-Library-61DAFB?style=for-the-badge&logo=react" alt="React"/>
  </a>

  <a href="https://socket.io/" target="_blank">
    <img src="https://img.shields.io/badge/Socket.io-Realtime-000000?style=for-the-badge&logo=socketdotio" alt="Socket.io"/>
  </a>
 <a href="https://github.com/colinhacks/zod" target="_blank">
    <img src="https://img.shields.io/badge/Zod-Schema%20Validation-2C8C99?style=for-the-badge&logo=zod" alt="Zod"/>
  </a>
</p>

# BioDex - Sistema de Registro e Aplicativo Gamificado

O **BioDex** é um sistema desenvolvido para o **Parque Natural Municipal Juqueriquerê**, com o objetivo de **automatizar o registro de visitas** e **proporcionar uma experiência interativa e educativa** para os visitantes. Criado como parte do **projeto integrado** no **[curso técnico em Informática para Internet](https://www.ifspcaraguatatuba.edu.br/cursos/tecnico/tecnico-em-informatica-para-internethttps://www.ifspcaraguatatuba.edu.br/cursos/tecnico/tecnico-em-informatica-para-internet)** do **IFSP Caraguatatuba**, sob a supervisão do professor **Anderson Deizepe**, o projeto visa unir tecnologia e preservação ambiental.

Para mais detalhes, veja a **[notícia sobre a apresentação do projeto para o parque](https://www.caraguatatuba.sp.gov.br/pmc/2024/06/prefeitura-de-caraguatatuba-recebe-alunos-do-ifsp-para-apresentacao-de-aplicativo-para-o-parque-juqueriquere/#:~:text=A%20Prefeitura%20de%20Caraguatatuba%20abriu,ter%C3%A7a%2Dfeira%20(18))**.


| Componente     | Descrição                                      | Link do Repositório                                 |
|-----------------|----------------------------------------------|----------------------------------------------------|
| **Backend**    | API e lógica de negócios do sistema.          | [Repositório Backend](https://github.com/6aleatorio6/pj3-backend) |
| **Admin/Totem**| Painel administrativo e interface do totem.   | [Repositório Admin/Totem](https://github.com/lorislolo/pi-3sem) |
| **Aplicativo** | Aplicativo móvel para usuários finais.        | [Repositório App](https://github.com/Programadorwolrd/pj3-Aplicativo-Municipal) |

## Funcionalidades

- **Registro de Visitas:** Totens digitais para registro rápido dos visitantes, coletando dados como sexo, origem e frequência. O **QR code** do totem também pode ser escaneado pelo aplicativo, registrando a visita sem a necessidade de formulário.
- **Exportação de Dados:** Painel administrativo permite exportar registros de visitas em **Excel** e **PDF**.
- **Dashboard:** Visualização de gráficos em tempo real sobre visitas, ranking e métricas de desempenho.
- **Gamificação:** QR codes no parque liberam informações sobre animais e sons. **Ranking mensal** é zerado a cada mês, incentivando novas competições.
- **Pontos de Interesse:** Registre e explore áreas do parque, com ranking que motiva a exploração.
- **Painel Administrativo:** Gerencie o conteúdo interativo, como a adição, edição e remoção de informações sobre os animais.
- **Educação Ambiental:** Oferece aprendizado sobre a biodiversidade do parque e a importância da preservação.




## Tecnologias Utilizadas

O **BioDex** foi desenvolvido utilizando um conjunto robusto de tecnologias modernas, incluindo:

### **Frontend & Mobile**

- **React:** Biblioteca para criação de interfaces de usuário.
- **React Native:** Framework para desenvolvimento do aplicativo móvel.
- **Expo:** Plataforma para desenvolvimento e construção de aplicativos React Native.
- **Expo Router:** Biblioteca para navegação no aplicativo móvel.
- **Tamagui:** Framework para criação de interfaces de usuário personalizadas e responsivas.
- **Zustand:** Biblioteca para gerenciamento de estado simplificado.
- **Bootstrap:** Framework CSS utilizado para estilização da interface.
- **Axios:** Cliente HTTP para requisições.
- **React Query:** Biblioteca para gerenciamento de dados assíncronos, incluindo cache e sincronização.

### **Backend**

- **Express:** Framework para criação de APIs RESTful no backend.
- **Socket\.io:** Implementado para comunicação em tempo real.
- **JWT (JSON Web Token):** Método utilizado para autenticação segura de usuários.
- **Bcrypt:** Biblioteca usada para criptografia de senhas.
- **Prisma:** ORM para interação com o banco de dados.
- **Zod:** Biblioteca para validação de schemas de dados.
- **PostgreSQL:** Sistema de banco de dados relacional utilizado no projeto.
- **Jest:** Framework para testes unitários.
- **Supertest:** Ferramenta para testes de endpoints HTTP.
- **Puppeteer:** Ferramenta para criação de PDFs.



## Desenvolvedores :octocat:

| [<img src="https://avatars.githubusercontent.com/u/132392161?v=4" width=115><br><sub>Leonardo L. Felix</sub>](https://github.com/6aleatorio6) | [<img src="https://avatars.githubusercontent.com/u/133153521?v=4" width=115><br><sub>Gustavo</sub>](https://github.com/Guxtavo9) | [<img src="https://avatars.githubusercontent.com/u/136916226?v=4" width=115><br><sub>Lucas</sub>](https://github.com/lucas2007c) | [<img src="https://avatars.githubusercontent.com/u/133153563?v=4" width=115><br><sub>Luis Eduardo</sub>](https://github.com/Luis-eduardo-sl) | [<img src="https://avatars.githubusercontent.com/u/128484070?v=4" width=115><br><sub>Philype Jorge</sub>](https://github.com/Programadorwolrd) |
|:-----------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|

| [<img src="https://avatars.githubusercontent.com/u/133153956?v=4" width=115><br><sub>João Gabriel</sub>](https://github.com/JGabrielBesera#jo%C3%A3o-gabriel-de-faria-beserra) | [<img src="https://avatars.githubusercontent.com/u/133153441?v=4" width=115><br><sub>Lorena</sub>](https://github.com/lorislolo) | [<img src="https://avatars.githubusercontent.com/u/133154067?v=4" width=115><br><sub>Francisco Ryan</sub>](https://github.com/ryanolv44) | [<img src="https://avatars.githubusercontent.com/u/141774746?s=400&u=5f5019b00fefc620b3a981cb1aca7219a35fd0e7&v=4" width=115><br><sub>Flavio Menezes</sub>](https://www.linkedin.com/in/fl%C3%A1vio-menezes-4b92231b2/) | [<img src="https://avatars.githubusercontent.com/u/133154457?v=4" width=115><br><sub>Matheus</sub>](https://github.com/MatheusMadin) |
|:-----------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------:|

| [<img src="https://avatars.githubusercontent.com/u/133153521?v=4" width=115><br><sub>Gustavo Pereira</sub>](https://github.com/Guxtavo9) | [<img src="https://avatars.githubusercontent.com/u/133154012?v=4" width=115><br><sub>Bryan Machado</sub>](https://github.com/Bryan-Machado) | [<img src="https://avatars.githubusercontent.com/u/159071386?v=4" width=115><br><sub>Arthur</sub>](https://github.com/ARTHURcantu) | [<img src="https://avatars.githubusercontent.com/u/133154082?v=4" width=115><br><sub>Gabriel Teixeira</sub>](https://github.com/Gabriel-Te) | [<img src="https://avatars.githubusercontent.com/u/133153603?v=4" width=115><br><sub>Clemerson Santos</sub>](https://github.com/ClemersonIFSP) |
|:--------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|

| [<img src="https://avatars.githubusercontent.com/u/127694300?v=4" width=115><br><sub>Roberto Criscuolo</sub>](https://github.com/roberto-criscuolo) | [<img src="https://avatars.githubusercontent.com/u/141782711?v=4" width=115><br><sub>Manuela Otavio</sub>](https://github.com/manuelazotavio) | [<img src="https://avatars.githubusercontent.com/u/143025062?v=4" width=115><br><sub>Barbara Santos</sub>](https://github.com/Barbarasantoos) | [<img src="https://avatars.githubusercontent.com/u/117996562?v=4" width=115><br><sub>João Tavares</sub>](https://github.com/joaotavaresmatos) |
|:-------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|
