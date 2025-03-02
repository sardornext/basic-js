const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
function transform(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  const modified = arr.slice(0);

  for (let i = 0; i < modified.length; i++) {
    const item = modified[i];

    if (typeof item === 'string') {
      const itemParts = item.split('-');

      if (itemParts.at(-2) === 'double') {
        const itemForDuplicate =
          itemParts.at(-1) === 'prev' ? modified[i - 1] : modified[i + 1];

        if (itemForDuplicate) {
          modified[i] = itemForDuplicate;
        } else {
          modified[i] = null;
        }

        continue;
      }

      if (itemParts.at(-2) === 'discard' && itemParts.at(-1) === 'prev') {
        const prevItem = modified[i - 1];

        if (prevItem) {
          modified[i - 1] = null;
        }

        modified[i] = null;
        continue;
      }

      if (itemParts.at(-2) === 'discard' && itemParts.at(-1) === 'next') {
        const prevItem = modified[i + 1];

        if (prevItem) {
          modified[i + 1] = null;
        }

        modified[i] = null;
        continue;
      }
    }
  }

  return modified.filter((item) => item);
}

module.exports = {
  transform,
};
