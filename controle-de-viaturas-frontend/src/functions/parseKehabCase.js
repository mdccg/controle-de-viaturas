import unnacent from './unnacent';

function parseKehabCase(string = 'The quick brown fox jumps over the lazy dog.') {
  return unnacent(string)
    .toLowerCase()
    .replace(/,|\s-/g, '')
    .split(' ')
    .join('-');
}

export default parseKehabCase;