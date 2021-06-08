# controle-de-viaturas

## _To-do list_

### Front-end
- [ ] Adicionar a dependência [`@react-pdf/renderer`](https://react-pdf.org/) ao projeto;
- [X] Alinhar todos os rodapés;
- [ ] Descobrir por que o mesmo _toast_ está sendo exibido mais de uma vez para a mesma requisição.

## Motivação

Este app foi desenvolvido para o 1º Subgrupamento de Bombeiros Militar Independente (1º SGBM/Ind) do município de Aquidauana - MS. Seu objetivo é inspecionar e gerar relatórios diários e mensais sobre as viaturas de combate ao incêndio, armazenando informações como prefixo, tipo de viatura (trem de S.O.S ou pátio), distância marcada pelo odômetro, nível de combustível e observações facultativas.

Para o desenvolvimento do app, foi utilizada a página [Flat UI Colors](https://flatuicolors.com/) para composição da [paleta de cores](https://github.com/mdccg/controle-de-viaturas/blob/master/controle-de-viaturas-frontend/src/App.css), o editor gráfico [Figma](https://figma.com/) para prototipagem, a biblioteca [React.js](https://pt-br.reactjs.org/) para criação das interfaces visuais, o framework [Express.js](https://expressjs.com/pt-br/) para criação da API e o serviço de banco de dados em nuvem global [MongoDB Atlas](https://cloud.mongodb.com/) para gestão e hospedagem do banco de dados. O protótipo visual do app está disponível no endereço https://figma.fun/L1OsQL. O acesso ao app é protegido por meio de autenticação com login e senha. Assim, o acesso é restrito aos bombeiros militares do 1º SGBM/Ind, por meio da supervisão do _stakeholder_.

Este app foi desenvolvido como um PWA. Em suma, uma Aplicação Web Progressiva (do inglês _Progressive Web App_ – PWA) é um app web que, quando utilizado em dispositivo móvel como um _smartphone_, por exemplo, se comporta como um app nativo da plataforma do dispositivo - Android ou iOS, por exemplo. Por sua vez, quando visualizado em um dispositivo _desktop_, como um computador pessoal, por exemplo, se comporta como um web site. As vantagens de se implementar o app com esta abordagem é o baixo custo de implementação, associado a todos os benefícios que um app para dispositivos móveis oferece ao usuário. (PONTES, 2018)

<!-- ESCREVER AQUI SOBRE react-pdf https://react-pdf.org/ -->

## Galeria

<div style="flex-direction: row; display: flex;">
  <img width="216px" src="https://i.imgur.com/QWWvAyv.png" alt="Boas-vindas" />
  <img width="216px" src="https://i.imgur.com/93sSK2j.png" alt="Login" />
  <img width="216px" src="https://i.imgur.com/2xrKPNp.png" alt="Cadastro" />
  <img width="216px" src="https://i.imgur.com/8Y84SmU.png" alt="Pendente" />
  <img width="216px" src="https://i.imgur.com/cW0DzTq.png" alt="Formulário das viaturas"  />
  <img width="216px" src="https://i.imgur.com/dJImAxA.png" alt="Histórico de edição do formulário"  />
  <img width="216px" src="https://i.imgur.com/qUFSd0n.png" alt="Menu lateral" />
  <img width="216px" src="https://i.imgur.com/JThhmCX.png" alt="Modal de adicionar viatura" />
  <img width="216px" src="https://i.imgur.com/ulsqc1K.png" alt="Modal de editar nível de combustível" />
  <img width="216px" src="https://i.imgur.com/HJ1Pigt.png" alt="Modal de editar tipo de viatura" />
  
</div>

---

## Créditos

- [Free vector icons - SVG, PSD, PNG, EPS & Icon Font - Thousands of free icons](https://www.flaticon.com/)
- [Playground - SVGR](https://react-svgr.com/playground/)
- [Componente React Modal - Material-UI](https://material-ui.com/pt/components/modal/)
- [Timestamp Converter](https://www.timestamp-converter.com/)
- [Firebase](https://firebase.google.com/?hl=pt-br)
- [MongoDB Cloud | MongoDB](https://www.mongodb.com/cloud)
- [Cloud Application Platform | Heroku](https://www.heroku.com/)
- [Símbolos – CBMMS](https://www.bombeiros.ms.gov.br/simbolos/)
- [PWA Manifest Generator | SimiCart](https://www.simicart.com/manifest-generator.html/)
- [Convertio — Conversor de Ficheiros](https://convertio.co/pt/)
- [CloudConvert](https://cloudconvert.com/)
- [dbdiagram.io - Database Relationship Diagrams Design Tool](https://dbdiagram.io/home)
- [react-toastify - npm](https://www.npmjs.com/package/react-toastify)

Outros créditos disponívels em [`controle-de-viaturas-frontend/src/assets/README.md`](https://github.com/mdccg/controle-de-viaturas/tree/master/controle-de-viaturas-frontend/src/assets).
