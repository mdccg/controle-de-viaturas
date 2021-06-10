import { useState, useEffect } from 'react';
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
        let titulo = `${diaSemana}, ${dia} - ${nomeMilitar}`;

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

  return (
    <PDFViewer style={{ height: document.body.offsetHeight }}>
      <Document title={titulo}>
        <Page size="A4" style={styles.abnt}>
          <Text style={styles.titulo}>CONTROLE DE VTR &#8213; 1º SGBM/Ind</Text>
          <Text style={styles.subtitulo}>{titulo}</Text>
          {categorias.map(({ _id, nome }) => {
            const viaturasFiltradas = viaturas.filter(({ categoria }) => categoria._id === _id);

            return viaturasFiltradas.length > 0 ? (
              <View key={_id}>
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
            ) : <></>;
          })}
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default TabelaDiaria;