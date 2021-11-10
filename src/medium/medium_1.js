import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
  let out = 0;
  array.forEach((element) => out += element);
  return out;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
  const sorted = [...array].sort((a, b) => a-b);
  const length = sorted.length;
  const mid = Math.floor(length / 2);
  return length % 2 === 0 ? (sorted[mid] + sorted[mid - 1]) / 2 : sorted[mid];
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
  const length = array.length;
  const sum = array.reduce(((previousValue, currentValue) => previousValue + currentValue));
  const mean = sum / length;
  const vari = variance(array, mean);

  return {
    length: length,
    sum: sum,
    mean: mean,
    median: getMedian(array),
    min: Math.min(...array),
    max: Math.max(...array),
    variance: vari,
    standard_deviation: Math.sqrt(vari)
  }
}

