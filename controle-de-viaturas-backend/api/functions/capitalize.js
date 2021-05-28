function capitalize(string = 'the quick brown fox jumps over the lazy dog') {
  let array = string.split('');
  let capital = array.shift().toUpperCase();
  return capital + array.join('');
}

module.exports = capitalize;