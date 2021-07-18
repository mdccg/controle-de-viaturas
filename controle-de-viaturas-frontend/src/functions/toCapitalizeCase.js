function toCapitalizeCase(string = 'quarta-feira') {
  return string
    .split('')
    .splice(0, 1)
    .pop()
    .toUpperCase() + string
    .split('')
    .splice(1, string.length)
    .join('');
}

export default toCapitalizeCase;