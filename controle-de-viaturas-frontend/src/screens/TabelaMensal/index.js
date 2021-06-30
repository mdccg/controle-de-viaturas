import { useState, useEffect, Fragment } from 'react';
import { Page, Text, View, Document, PDFViewer } from '@react-pdf/renderer';
import styles from './styles';

import { diasSemana } from './../../config/default.json';

import api from './../../services/api';

import moment from 'moment';

const Linha = ({ children }) =>  <View style={styles.linha}>{children}</View>;
const Coluna = ({ children }) => (
  <View style={styles.coluna}>
    <Text style={styles.colunaTexto}>{children}</Text>
  </View>
);

function TabelaMensal() {
  const [mes, setMes] = useState('');
  const [registros, setRegistros] = useState([]);

  const [categorias, setCategorias] = useState([]);

  function buscarCategorias() {
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error(err));
  }

  function buscarRegistro() {
    api.get('/relatorio')
      .then(res => {
        let { tipo, relatorio } = res.data;

        if(tipo === 'diario')
          window.close();

        let { mes, registros } = relatorio;
        
        setMes(mes);
        setRegistros(registros);
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    buscarCategorias();
    buscarRegistro();
  }, []);

  const Pdf = () => (
    <Document title={mes}>
      <Page size="A4" style={styles.abnt}>
        <View fixed>
          <Text style={styles.titulo}>CONTROLE DE VTR &#8213; 1º SGBM/Ind</Text>
          <Text style={styles.subtitulo}>{mes}</Text>
        </View>

        {registros.map(({ createdAt: data, signatario = {}, viaturas = [] }) => {
          const diaSemana = diasSemana[moment(data).isoWeekday() - 1];
          const dia = moment(data).format('DD[.]MM[.]YYYY');
          const nomeMilitar = `${signatario.patente} ${signatario.nome}`;
          const titulo = `${diaSemana}, ${dia} - ${nomeMilitar}`;

          return (
            <Fragment key={data}>
              <View>
                {categorias.map(({ _id, nome }) => {
                  const viaturasFiltradas = viaturas.filter(({ categoria }) => {
                    return (typeof categoria === 'object' ? categoria._id : categoria) === _id;
                  });

                  return viaturasFiltradas.length > 0 ? (
                    <Fragment key={_id}>
                      <View>
                        <Text style={styles.subtitulo}>{titulo}</Text>

                        <Text style={styles.tituloCategoria}>{nome}</Text>
        
                        <View style={styles.tabela}>
                          <Linha>
                            <Coluna>Prefixo</Coluna>
                            <Coluna>KM</Coluna>
                            <Coluna>Nível de combustível</Coluna>
                            <Coluna>Observação</Coluna>
                          </Linha>
                          {viaturasFiltradas.map(({ _id: idViatura, prefixo, km, nivelCombustivel, comentario }) => (
                            <Linha key={_id}>
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
              </View>

              <View break />
            </Fragment>
          );
        })}
      </Page>
    </Document>
  );

  return (
    <PDFViewer style={styles.pdfViewer}>
      <Pdf />
    </PDFViewer>
  );
}

export default TabelaMensal;