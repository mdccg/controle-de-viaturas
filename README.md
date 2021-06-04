# controle-de-viaturas

## _To-do list_

- [ ] Reescrever trechos de código substituindo "Trem de S.O.S" e "No pátio" por uma listagem de todos os tipos de viaturas;
  - [X] Formulário das viaturas;
  - [ ] Testes;
  - [X] Histórico;
  - [ ] Tabela diária;
  - [ ] Tabela mensal.
- [ ] Trocar ponto por vírgula na atualização do odômetro das viaturas;
- [ ] Detectar mudança no localStorage;
- [ ] Interceptar exceções das requisições com mensagem de erro no formato _string_;
- [ ] Retornar o militar em vez do identificador na rota de verificar token;
- [ ] Criar expressão regular na rota `/viaturas` [GET] para filtrar viaturas pelo prefixo; 
- [ ] Criar expressão regular na rota `/militares` [GET] para filtrar militares pela patente ou pelo nome;
- [ ] Criar expressão regular na rota `/historico` [GET] para filtrar militares pela patente ou pelo nome;
- [ ] Descobrir por que algumas viaturas não vêm com categoria.

## Motivação

Este app foi desenvolvido para o 1º Subgrupamento de Bombeiros Militar Independente (1º SGBM/Ind) do município de Aquidauana - MS. Seu objetivo é inspecionar e gerar relatórios diários e mensais sobre as viaturas de combate ao incêndio, armazenando informações como prefixo, tipo de viatura (trem de S.O.S ou pátio), distância marcada pelo odômetro, nível de combustível e observações facultativas.

Para o desenvolvimento do app, foi utilizada a página [Flat UI Colors](https://flatuicolors.com/) para composição da [paleta de cores](https://github.com/mdccg/controle-de-viaturas/blob/master/controle-de-viaturas-frontend/src/App.css), o editor gráfico [Figma](https://figma.com/) para prototipagem, a biblioteca [React.js](https://pt-br.reactjs.org/) para criação das interfaces visuais, o framework [Express.js](https://expressjs.com/pt-br/) para criação da API e o serviço de banco de dados em nuvem global [MongoDB Atlas](https://cloud.mongodb.com/) para gestão e hospedagem do banco de dados. O protótipo visual do app está disponível no endereço https://figma.fun/L1OsQL. O acesso ao app é protegido por meio de autenticação com login e senha. Assim, o acesso é restrito aos bombeiros smilitares do 1º SGBM/Ind, por meio da supervisão do _stakeholder_. Por conseguinte, o app oferece também a consulta aos formulários previamente preenchidos.

Este app foi desenvolvido como um PWA. Em suma, uma Aplicação Web Progressiva (do inglês _Progressive Web App_ – PWA) é um app web que, quando utilizado em dispositivo móvel como um _smartphone_, por exemplo, se comporta como um app nativo da plataforma do dispositivo - Android ou iOS, por exemplo. Por sua vez, quando visualizado em um dispositivo _desktop_, como um computador pessoal, por exemplo, se comporta como um web site. As vantagens de se implementar o app com esta abordagem é o baixo custo de implementação, associado a todos os benefícios que um app para dispositivos móveis oferece ao usuário. (PONTES, 2018)

Para organização das datas de cada relatório, foi utilizada a [ISO 8601](https://pt.wikipedia.org/wiki/ISO_8601), uma norma internacional para representação de data e hora e a biblioteca [Moment.js](https://momentjs.com/), tanto no front-end como no back-end. Para disposição e conversão em PDF dos relatórios diários e mensais, foram utilizados os seguintes retalhos de código:

```
api.put('/relatorio', relatorio)
  .then(() => window.open('/tabela-diaria', '_blank'))
  .catch(err => console.error(err));
```

O código acima utiliza uma instância da dependência [axios](https://github.com/axios/axios) para enviar os dados contidos na variável `relatorio` ao servidor. Após a requisição bem-sucedida, a função ```window.open``` abre o relatório em uma nova guia. Após o relatório ser salvo ou a operação ser cancelada, o evento [`onafterprint`](https://www.w3schools.com/jsref/event_onafterprint.asp) é captado e a página se fecha, como instrui o retalho de código abaixo:

```
window.print();

window.addEventListener('afterprint', function() {
  this.close();
});
```

## Galeria

<div style="flex-direction: row; display: flex;">
  <img width="216px" src="https://i.imgur.com/6snIDkw.png" alt="Boas-vindas" />
  <img width="216px" src="https://i.imgur.com/LUw004a.png" alt="Cadastro" />
  <img width="216px" src="https://i.imgur.com/lqHO5xF.png" alt="Home" />
  <img width="216px" src="https://i.imgur.com/Uq279Qo.png" alt="Editando odômetro da viatura"  />
  <img width="216px" src="https://i.imgur.com/hUQoKbg.png" alt="Editando nível de combustível da viatura"  />
  <img width="216px" src="https://i.imgur.com/C2OMM7L.png" alt="Editando observação sobre a viatura" />
  <img width="216px" src="https://i.imgur.com/UT9BvOw.png" alt="Editando tipo de viatura" />
  <img width="216px" src="https://i.imgur.com/Ejik6pe.png" alt="Modal de excluir viatura" />
  <img width="216px" src="https://i.imgur.com/PDhgrSU.png" alt="Modal de adicionar viatura" />
  <img width="216px" src="https://i.imgur.com/4GHg756.png" alt="Histórico de relatórios" />
  <img width="216px" src="https://i.imgur.com/uXN9eVP.png" alt="Relatório do dia 29 de março de 2021, preenchido pelo Grande Almirante Thrawn" />
  <img width="216px" src="https://i.imgur.com/exeWUZd.png" alt="Relatório convertido para PDF" />
</div>

<div style="flex-direction: row; display: flex;">
  <img src="https://i.imgur.com/g5FKrBI.png" alt="Histórico de relatórios" />
  <img src="https://i.imgur.com/RcYl9g9.png" alt="Relatório do dia 29 de março de 2021, preenchido pelo Grande Almirante Thrawn" />
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
