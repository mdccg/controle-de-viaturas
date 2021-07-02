import { Font, StyleSheet } from '@react-pdf/renderer';

import TimesNewRomanRegular from './../../assets/fonts/TimesNewRoman/Times-New-Roman-Regular.ttf';

Font.register({
  family: 'Times New Roman',
  src: TimesNewRomanRegular,
  fontStyle: 'normal',
  fontWeight: 'normal',
});

const ESCALA = 8;

const styles = StyleSheet.create({
  pdfViewer: { minHeight: document.body.offsetHeight },

  pdfDownloadLink: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 1,

    fontSize: 32,
    
    textAlign: 'center',
  },
  
  abnt: {
    backgroundColor: 'white',

    flexDirection: 'column',

    paddingTop:    3 * ESCALA,
    paddingRight:  2 * ESCALA,
    paddingBottom: 2 * ESCALA,
    paddingLeft:   3 * ESCALA,
  },

  titulo: {
    fontFamily: 'Times New Roman',
    textAlign: 'center',

    fontSize: 3 * ESCALA
  },

  subtitulo: {
    marginTop: 8,

    fontFamily: 'Times New Roman',
    textTransform: 'uppercase',
    textAlign: 'center',

    fontSize: 2 * ESCALA,
  
    marginBottom: 32,
  },

  tituloCategoria: {
    fontFamily: 'Times New Roman',
    textTransform: 'uppercase',
    textAlign: 'center',

    fontSize: 2.5 * ESCALA,

    marginBottom: 8,
  },

  tabela: {
    flexDirection: 'column',

    borderColor: 'black',
    borderWidth: 1,

    marginBottom: 16,
  },

  divisor: {
    marginTop:    16,
    marginBottom: 64,

    backgroundColor: 'black',

    height: 1,
    flex: 1,
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  coluna: {
    borderColor: 'black',
    borderWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

    minHeight: 32,
  },

  colunaTexto: {
    fontFamily: 'Times New Roman',

    fontSize: 1.5 * ESCALA,
  },
});

export default styles;