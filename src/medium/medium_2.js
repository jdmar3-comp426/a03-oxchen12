import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
  avgMpg: {
    city: mpg_data.reduce(((previousValue, currentValue) => previousValue + currentValue.city_mpg)) / mpg_data.length,
    highway: mpg_data.reduce(((previousValue, currentValue) => previousValue + currentValue.highway_mpg)) / mpg_data.length,
  },
  allYearStats: getStatistics(mpg_data.map(e => e.year)),
  ratioHybrids: mpg_data.filter(e => e.hybrid === true).length / mpg_data.length,
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
const hybrids = mpg_data.filter(e => e.hybrid === true);
const makers = [...new Set(hybrids.map(e => e.make))];
const makerHybrids = []
makers.forEach(e => makerHybrids.push({ make: e, hybrids: []}));
hybrids.forEach(e => {
  makerHybrids.forEach(m => {
    if (e.make === m.make) m.hybrids.push(e.id);
  });
});

const avgMpgDiv = {}
const notHybrids = mpg_data.filter(e => e.hybrid === false);
const cityCallback = (previousValue, currentValue) => previousValue + currentValue.city_mpg;
const highwayCallback = (previousValue, currentValue) => previousValue + currentValue.highway_mpg;
mpg_data.map(e => e.year).forEach(e => {
  let yearHybrids = hybrids.filter(f => f.year === e);
  let yearNotHybrids = notHybrids.filter(f => f.year === e);
  avgMpgDiv[e] = {
    hybrid: {
      city: yearHybrids.reduce(cityCallback, 0) / yearHybrids.length,
      highway: yearHybrids.filter(f => f.year === e).reduce(highwayCallback, 0) / yearHybrids.length
    },
    notHybrid: {
      city: yearNotHybrids.reduce(cityCallback, 0) / yearNotHybrids.length,
      highway: yearNotHybrids.filter(f => f.year === e).reduce(highwayCallback, 0) / yearNotHybrids.length
    }
  }
});

export const moreStats = {
  makerHybrids: makerHybrids,
  avgMpgByYearAndHybrid: avgMpgDiv
};

// console.log(moreStats.makerHybrids);
// console.log(moreStats.avgMpgByYearAndHybrid);