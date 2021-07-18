import { useState, useEffect, Fragment } from 'react';
import { Page, Text, View, Document, PDFDownloadLink } from '@react-pdf/renderer';
import styles from './styles';

import { diasSemana } from './../../config/default.json';

import parseKehabCase from './../../functions/parseKehabCase';
import toCapitalizeCase from './../../functions/toCapitalizeCase';

import api from './../../services/api';

import moment from 'moment';

const Linha  = ({ children }) =>  <View style={styles.linha}>{children}</View>;
const Coluna = ({ children }) => (
  <View style={styles.coluna}>
    <Text style={styles.colunaTexto}>{children}</Text>
  </View>
);

function TabelaDiaria() {
  const [titulo, setTitulo] = useState('');

  const [categorias, setCategorias] = useState([]);
  const [viaturas, setViaturas] = useState([]);

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function buscarRegistro() {
    api.get('/relatorio')
      .then(res => {
        let { tipo, relatorio } = res.data;

        if(tipo === 'mensal')
          window.close();

        let { data, signatario, viaturas } = relatorio;
        
        let diaSemana = diasSemana[moment(data).isoWeekday() - 1];
        let dia = moment(data).format('DD[.]MM[.]YYYY');
        let nomeMilitar = `${signatario.patente} ${signatario.nome}`;
        let titulo = `${toCapitalizeCase(diaSemana)}, ${dia} - ${nomeMilitar}`;

        document.title = titulo;

        setTitulo(titulo);

        setViaturas(viaturas);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    buscarCategorias();
    buscarRegistro();
  }, []);

  const Pdf = () => (
    <Document title={titulo}>
      <Page size="A4" style={styles.abnt}>
        <View fixed>
          <Text style={styles.titulo}>CONTROLE DE VTR &#8213; 1º SGBM/Ind</Text>
          <Text style={styles.subtitulo}>{titulo}</Text>
        </View>

        {categorias.map(({ _id, nome }) => {
          var viaturasFiltradas = [];
          
          viaturasFiltradas = viaturas.filter(viatura => {
            var idCategoria;

            if(!viatura.categoria) return ({});
            if(typeof viatura.categoria === 'object') idCategoria = viatura.categoria._id;
            if(typeof viatura.categoria === 'string') idCategoria = viatura.categoria;

            return idCategoria === _id;
          });

          return viaturasFiltradas.length > 0 ? (
            <Fragment key={_id}>
              <View>
                <Text style={styles.tituloCategoria}>{nome}</Text>

                <View style={styles.tabela}>
                  <Linha>
                    <Coluna>Prefixo</Coluna>
                    <Coluna>KM</Coluna>
                    <Coluna>Nível de combustível</Coluna>
                    <Coluna>Observação</Coluna>
                  </Linha>
                  {viaturasFiltradas.map(({ _id: idViatura, prefixo, km, nivelCombustivel, comentario }) => (
                    <Linha key={idViatura}>
                      <Coluna>{prefixo}</Coluna>
                      <Coluna>{km}</Coluna>
                      <Coluna>{nivelCombustivel}</Coluna>
                      <Coluna>{comentario}</Coluna>
                    </Linha>
                  ))}
                </View>
              </View>

              <View break />
            </Fragment>
          ) : null;
        })}
      </Page>
    </Document>
  );

  return (
    <div className="link">
      <PDFDownloadLink document={<Pdf />} fileName={parseKehabCase(titulo) + '.pdf'}>
        {({ blob, url, loading, error }) =>
          loading ? 'Carregando relatório...' : 'Clique aqui para baixar o relatório'
        }
      </PDFDownloadLink>
    </div>
  );
}

export default TabelaDiaria;