function parseKehabCase(string = 'The quick brown fox jumps over the lazy dog.') {
  return string.toLowerCase().replace(/\s|,/g, '-');
}

export default parseKehabCase;