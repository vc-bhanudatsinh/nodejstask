/*
 * Array Sum
 * Given an unsorted array of size N that contains only positive integers.
 * Find a continuous sub-array that adds to a given number S and return the left and
 * right index(1-based indexing) of that subarray.
 * In case of multiple subarrays, return the subarray indexes which come first on moving from left to right.
 *
 * Example
 * s = 12
 * arr = {1,2,3,7,5}
 *
 * Output: 2 4
 *
 * Explanation: The sum of elements
 * from 2nd position to 4th position
 * is 12.
 */

const array = [3, 7, 1, 9, 3];

const getIndexArray = (sum, array, minIndex = 0) => {
  let count = 0;
  for (let i = minIndex; i < array.length; i++) {
    count += array[i];
    if (count > sum) return getIndexArray(sum, array, minIndex + 1);
    if (count === sum) return [minIndex + 1, i + 1];
  }
  return "Not found";
};

console.log(getIndexArray(120, array));
