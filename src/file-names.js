const { NotImplementedError } = require('../extensions/index.js');

/**
 * There's a list of file, since two files cannot have equal names,
 * the one which comes later will have a suffix (k),
 * where k is the smallest integer such that the found name is not used yet.
 *
 * Return an array of names that will be given to the files.
 *
 * @param {Array} names
 * @return {Array}
 *
 * @example
 * For input ["file", "file", "image", "file(1)", "file"],
 * the output should be ["file", "file(1)", "image", "file(1)(1)", "file(2)"]
 *
 */
function renameFiles(names) {
  const map = new Map();
  const n = [];

  names.forEach((name) => {
    map.set(name, map.get(name) + 1 || 0);
    let newName = `${name}(${map.get(name)})`;
    map.set(newName, map.get(newName) + 1 || 0);
    if (map.get(name) === 0) {
      n.push(name);
      map.set(newName, 1);
      return;
    }
    n.push(`${name}(${map.get(name)})`);
  });
  return n;
}

module.exports = {
  renameFiles,
};
