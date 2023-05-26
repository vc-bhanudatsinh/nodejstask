/*
 * Task is about union and intersection task
 *
 * Consider Two team A and B contains player with the numbers like,
 *
 * A = [15,9,23,0]  ||  B = [43,1,8,6]
 *
 * Q-1: Get the player values except the values which are in both teams.
 *
 * Q-2: Get the player values which should only be there in A team not B. Also, Vic Versa.
 *
 * Q-3: Get the player values which are in both team.
 */

const a = [1, 7, 2, 9, 4, 15, 6];
const b = [3, 9, 6, 4, 2, 34, 10];

const getTheDifference = (a, b) => {
  const teamA = [...a];
  const teamB = [...b];
  const result = teamA.filter((value) => {
    if (teamB.indexOf(value) !== -1) teamB.splice(teamB.indexOf(value), 1);
    else return value;
  });
  return result.concat(teamB);
};

const getTheCommonValues = (a, b) => {
  return a.filter((value) => b.includes(value));
};

const getTheUniqueValuesOfTeam = (a, b) => {
  return a.filter((value) => !b.includes(value));
};

console.log("getTheDifference(a,b)", getTheDifference(a, b));
console.log("getTheUniqueValuesOfTeam(a,b)", getTheUniqueValuesOfTeam(b, a));
console.log("getTheCommonValues(a,b)", getTheCommonValues(a, b));
