# controle-de-viaturas

## _To-do list_

- [ ] `BUG` Descobrir por que senhas complexas não são gravadas com JWT

---

## Tecnologias

| Artefato                                     | Tecnologia                                      |
|----------------------------------------------|-------------------------------------------------|
| [Protótipo visual](https://figma.fun/RYygjH) | Figma                                           |
| Front-end                                    | React                                           |
| Back-end                                     | Express                                         |
| Banco de dados                               | MongoDB                                         |
| PDFs                                         | [`@react-pdf/renderer`](https://react-pdf.org/) |

---

## Motivação

Este app foi desenvolvido para o 1º Subgrupamento de Bombeiros Militar Independente (1º SGBM/Ind) do município de Aquidauana - MS. Seu objetivo é inspecionar e gerar relatórios diários e mensais sobre as viaturas de combate ao incêndio, armazenando informações como prefixo, tipo de viatura (trem de S.O.S ou pátio), distância marcada pelo odômetro, nível de combustível e observações facultativas.

Para geração dos arquivos PDF e disponibilização dos mesmos, foi utilizada a dependência [`@react-pdf/renderer`](https://react-pdf.org/), a qual os gera utilizando a mesma sintaxe de código da biblioteca React Native e os disponibiliza para _download_. Os arquivos baixados são enviados para a pasta selecionada como padrão pelo navegador do usuário.

Este app foi desenvolvido como um PWA. Em suma, uma Aplicação Web Progressiva (do inglês _Progressive Web App_ – PWA) é um app web que, quando utilizado em dispositivo móvel como um _smartphone_, por exemplo, se comporta como um app nativo da plataforma do dispositivo - Android ou iOS, por exemplo. Por sua vez, quando visualizado em um dispositivo _desktop_, como um computador pessoal, por exemplo, se comporta como um web site. As vantagens de se implementar o app com esta abordagem é o baixo custo de implementação, associado a todos os benefícios que um app para dispositivos móveis oferece ao usuário (PONTES, 2018). Além disso, o acesso ao app é protegido por meio de autenticação com login e senha. Assim, o acesso é restrito aos bombeiros militares do 1º SGBM/Ind, por meio da supervisão dos stakeholders.

---

## Galeria

<div style="flex-direction: row; display: flex;">
  <img width="216px" src="https://i.imgur.com/npKhaQ6.png" alt="Boas-vindas" />
  <img width="216px" src="https://i.imgur.com/orYU7Hh.png" alt="Login" />
  <img width="216px" src="https://i.imgur.com/8mxy6GP.png" alt="Cadastro" />
  <img width="216px" src="https://i.imgur.com/VZ9lIH4.png" alt="Pendente" />
  <img width="216px" src="https://i.imgur.com/T9qEGpe.png" alt="Tipos de viatura" />
  <img width="216px" src="https://i.imgur.com/OqwkzYb.png" alt="Formulário das viaturas" />
  <img width="216px" src="https://i.imgur.com/EmLKdFv.png" alt="Filtro do nível de combustível" />
  <img width="216px" src="https://i.imgur.com/zBc22Lw.png" alt="Modal de adicionar uma viatura" />
  <img width="216px" src="https://i.imgur.com/PGip8c1.png" alt="Edição de uma viatura" />
  <img width="216px" src="https://i.imgur.com/JmbHgOc.png" alt="Modal de editar o nível de combustível" />
  <img width="216px" src="https://i.imgur.com/E8xoGsX.png" alt="Modal de editar o tipo de viatura" />
  <img width="216px" src="https://i.imgur.com/SVzovZJ.png" alt="Modal de deletar uma viatura" />
  <img width="216px" src="https://i.imgur.com/ClqmSa9.png" alt="Edição das credenciais" />
  <img width="216px" src="https://i.imgur.com/5m89yO1.png" alt="Histórico sem registros" />
  <img width="216px" src="https://i.imgur.com/rLwwMCQ.png" alt="Registro listado minimizado" />
  <img width="216px" src="https://i.imgur.com/TAYbxS0.png" alt="Registro listado maximizado" />
  <img width="216px" src="https://i.imgur.com/TvgGWly.png" alt="Sem solicitações" />
  <img width="216px" src="https://i.imgur.com/ycvKoY9.png" alt="Solicitação listada" />
  <img width="216px" src="https://i.imgur.com/PFrRC0T.png" alt="Modal de aprovar um usuário" />
  <img width="216px" src="https://i.imgur.com/ytTabWr.png" alt="Sem militares" />
  <img width="216px" src="https://i.imgur.com/eTWKzKl.png" alt="Usuário listado" />
  <img width="216px" src="https://i.imgur.com/UyaxxUs.png" alt="Administrador listado" />
  <img width="216px" src="https://i.imgur.com/cLP1WEO.png" alt="Modal de editar as permissões de um usuário" />
  <img width="216px" src="https://i.imgur.com/UkFAWew.png" alt="Modal de editar as permissões de um administrador" />
  <img width="216px" src="https://i.imgur.com/Qn94Dmy.png" alt="Menu lateral com solicitações pendentes" />
</div>

---

## Créditos

- [Free vector icons - SVG, PSD, PNG, EPS & Icon Font - Thousands of free icons](https://www.flaticon.com/)
- [Playground - SVGR](https://react-svgr.com/playground/)
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
- [Imgur: The magic of the Internet](https://imgur.com/)

[Mais créditos disponívels aqui →](./controle-de-viaturas-frontend/src/assets/README.md)
