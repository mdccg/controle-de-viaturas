import { useState, useEffect } from 'react';
import { Page, Text, View, Document, PDFDownloadLink } from '@react-pdf/renderer';
import styles from './styles';

import { diasSemana } from './../../config/default.json';

import parseKehabCase from './../../functions/parseKehabCase';

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
        // {  }
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    buscarCategorias();
    buscarRegistro();
  }, []);

  const Pdf = () => (
    <Document title={mes}>
      <Page wrap={false} size="A4" style={styles.abnt}>
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
            <View break>
              <Text style={styles.subtitulo}>{titulo}</Text>

              {categorias.map(({ _id, nome }) => {
                const viaturasFiltradas = viaturas.filter(({ categoria }) => categoria._id === _id);
    
                return viaturasFiltradas.length > 0 ? (
                  <View key={_id}>
                    <Text style={styles.tituloCategoria}>{nome}</Text>
    
                    <View wrap={false} style={styles.tabela}>
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

                    <View style={{ height: 32 }} />
                  </View>
                ) : <></>;
              })}
            </View>
          );
        })}
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={<Pdf />}
      style={styles.pdfDownloadLink}
      fileName={`${parseKehabCase(mes)}.pdf`}>
      {({ blob, url, loading, error }) =>
        loading
          ? 'Gerando arquivo PDF do relatório...'
          : 'Clique aqui para baixar o relatório.'
      }
    </PDFDownloadLink>
  );
}

export default TabelaMensal;