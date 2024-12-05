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

## Funcionalidades Gerais

- **Registro de Visitas:** Totens digitais para registro rápido de visitantes, coletando informações como sexo, origem e frequência. Alternativamente, o **QR code** do totem pode ser escaneado pelo aplicativo para registrar a visita sem a necessidade de formulário.
- **Exportação de Dados:** O painel administrativo permite a exportação de registros de visitas para **Excel** e **PDF**.
- **Dashboard:** Visualização de gráficos em tempo real, com dados sobre visitas, ranking e métricas de desempenho.
- **Gamificação:** QR codes interativos no parque liberam informações sobre animais e sons. **Ranking mensal** é reiniciado todo mês, incentivando novos desafios.
- **Pontos de Interesse:** Registre e explore áreas do parque com ranking que incentiva a exploração.
- **Painel Administrativo:** Gerencie conteúdo interativo, como a adição, edição e remoção de informações sobre animais.
- **Educação Ambiental:** Oferece aprendizado sobre a biodiversidade do parque e a importância da preservação.

## Funcionalidades Técnicas

- **Autenticação com JWT e OAuth2:** Utiliza **OAuth2** para login social (Google e Facebook) e **JSON Web Tokens (JWT)** para gerenciamento seguro das sessões de usuários.
  
- **Persistência de Sessão:** Tokens de autenticação são armazenados no dispositivo com **AsyncStorage** e gerenciados por **Zustand**, mantendo a sessão ativa durante as interações do usuário no aplicativo.

- **Comunicação em tempo real via WebSocket:** O totem se conecta via **Socket.io** ao backend para ser notificado quando uma visita é registrada pelo **QR code**, ativando uma resposta visual em tempo real.

- **Upload de Mídia (Imagens e Áudios):** Processamento de uploads de **imagens** e **áudios** com **Busboy**, para enriquecer os pontos de interesse e informações sobre os animais.

- **Gestão de Tipos de Usuários (Roles):** O sistema possui três tipos de contas (**cliente**, **administrador**, **totem**), com permissões diferenciadas. O controle de acesso é feito por **JWT**.

- **Exportação de Dados:** O painel administrativo oferece exportação de registros de visita para **Excel** e **PDF** usando **ExcelJS** e **Puppeteer**.

- **Ranking e Gamificação:** Implementação de **ranking mensal** para estimular a interação contínua dos visitantes com o parque, com reinício automático a cada mês.
  
- **Gerenciamento de Estado com React Query:** **React Query** é utilizado para gerenciar o estado das requisições no aplicativo, garantindo a sincronização eficiente dos dados entre o cliente e o servidor, além de facilitar o gerenciamento de estados como carregamento, erro e sucesso das requisições.

## Demonstrações

### Fluxo de Login do App

O aplicativo oferece diferentes formas de autenticação para facilitar o acesso dos usuários. Veja abaixo um exemplo das opções de login disponíveis:

- **Login via Google**
- **Login via Facebook**
- **Login com e-mail e senha**

![Demonstração de login com Google, Facebook e e-mail/senha](https://gist.githubusercontent.com/6aleatorio6/b7667f910d555388c0ef02588b38ec65/raw/afd0ab35f83c7e0a663dd3aade57989eebd14957/formas_de_login.gif)

## Desenvolvedores :octocat:

| [<img src="https://avatars.githubusercontent.com/u/132392161?v=4" width=115><br><sub>Leonardo L. Felix</sub>](https://github.com/6aleatorio6) | [<img src="https://avatars.githubusercontent.com/u/133153521?v=4" width=115><br><sub>Gustavo</sub>](https://github.com/Guxtavo9) | [<img src="https://avatars.githubusercontent.com/u/136916226?v=4" width=115><br><sub>Lucas</sub>](https://github.com/lucas2007c) | [<img src="https://avatars.githubusercontent.com/u/133153563?v=4" width=115><br><sub>Luis Eduardo</sub>](https://github.com/Luis-eduardo-sl) | [<img src="https://avatars.githubusercontent.com/u/128484070?v=4" width=115><br><sub>Philype Jorge</sub>](https://github.com/Programadorwolrd) |
|:-----------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|

| [<img src="https://avatars.githubusercontent.com/u/133153956?v=4" width=115><br><sub>João Gabriel</sub>](https://github.com/JGabrielBesera#jo%C3%A3o-gabriel-de-faria-beserra) | [<img src="https://avatars.githubusercontent.com/u/133153441?v=4" width=115><br><sub>Lorena</sub>](https://github.com/lorislolo) | [<img src="https://avatars.githubusercontent.com/u/133154067?v=4" width=115><br><sub>Francisco Ryan</sub>](https://github.com/ryanolv44) | [<img src="https://avatars.githubusercontent.com/u/141774746?s=400&u=5f5019b00fefc620b3a981cb1aca7219a35fd0e7&v=4" width=115><br><sub>Flavio Menezes</sub>](https://www.linkedin.com/in/fl%C3%A1vio-menezes-4b92231b2/) |  [<img src="https://avatars.githubusercontent.com/u/128415070?v=4" width=115><br><sub>Thiago</sub>](https://github.com/Thzinnn) |
|:-----------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------:|

| [<img src="https://avatars.githubusercontent.com/u/133153521?v=4" width=115><br><sub>Gustavo Pereira</sub>](https://github.com/Guxtavo9) | [<img src="https://avatars.githubusercontent.com/u/133154012?v=4" width=115><br><sub>Bryan Machado</sub>](https://github.com/Bryan-Machado) | [<img src="https://avatars.githubusercontent.com/u/159071386?v=4" width=115><br><sub>Arthur</sub>](https://github.com/ARTHURcantu) | [<img src="https://avatars.githubusercontent.com/u/133154082?v=4" width=115><br><sub>Gabriel Teixeira</sub>](https://github.com/Gabriel-Te) | [<img src="https://avatars.githubusercontent.com/u/133153603?v=4" width=115><br><sub>Clemerson Santos</sub>](https://github.com/ClemersonIFSP) |
|:--------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|

| [<img src="https://avatars.githubusercontent.com/u/127694300?v=4" width=115><br><sub>Roberto Criscuolo</sub>](https://github.com/roberto-criscuolo) | [<img src="https://avatars.githubusercontent.com/u/141782711?v=4" width=115><br><sub>Manuela Otavio</sub>](https://github.com/manuelazotavio) | [<img src="https://avatars.githubusercontent.com/u/143025062?v=4" width=115><br><sub>Barbara Santos</sub>](https://github.com/Barbarasantoos) | [<img src="https://avatars.githubusercontent.com/u/117996562?v=4" width=115><br><sub>João Tavares</sub>](https://github.com/joaotavaresmatos) |  [<img src="https://avatars.githubusercontent.com/u/133154457?v=4" width=115><br><sub>Matheus</sub>](https://github.com/MatheusMadin) |
|:-------------------------------------------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------:|:------------------------------------------------------------------------------------------------------------:|
