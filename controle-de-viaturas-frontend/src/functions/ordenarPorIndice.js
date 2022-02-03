/* https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value */
function ordenarPorIndice(a, b, atributo = 'indiceCategoria') {
  if (a[atributo] < b[atributo]) {
    return -1;
  }
  
  if (a[atributo] > b[atributo]) {
    return 1;
  }
  
  return 0;
}

export default ordenarPorIndice;