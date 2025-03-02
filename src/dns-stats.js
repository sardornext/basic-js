const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given an array of domains, return the object with the appearances of the DNS.
 *
 * @param {Array} domains
 * @return {Object}
 *
 * @example
 * domains = [
 *  'code.yandex.ru',
 *  'music.yandex.ru',
 *  'yandex.ru'
 * ]
 *
 * The result should be the following:
 * {
 *   '.ru': 3,
 *   '.ru.yandex': 3,
 *   '.ru.yandex.code': 1,
 *   '.ru.yandex.music': 1,
 * }
 *
 */
function getDNSStats(domains) {
  const stats = {};

  for (let domain of domains) {
    // Split domain into parts and reverse
    const parts = domain.split('.').reverse();

    let dnsPath = '';
    // Build up DNS paths and count occurrences
    for (let i = 0; i < parts.length; i++) {
      dnsPath = dnsPath + '.' + parts[i];
      stats[dnsPath] = (stats[dnsPath] || 0) + 1;
    }
  }

  return stats;
}

module.exports = {
  getDNSStats,
};
