function roundRobin(teamCount) {
  if (teamCount < 2) {
    throw new Error('Number of teams must be greater than 2: ' + teamCount);
  }

  const result = [];

  const rotatingList = Array.from({ length: teamCount - 1 }, (_, i) => i + 2);
  if (teamCount % 2 !== 0) {
    rotatingList.push(0);
    teamCount += 1;
  }

  for (let round = 1; round < teamCount; round++) {
    const roundResult = { round, pairs: [] };

    const fixedList = [1, ...rotatingList];
    for (let i = 0; i < teamCount / 2; i++) {
      const first = fixedList[i];
      const second = fixedList[teamCount - 1 - i];
      if (first !== 0 && second !== 0) {
        // only if plays
        roundResult.pairs.push([first, second]);
      }
    }

    result.push(roundResult); // one round
    rotateArray(rotatingList, +1);
  }

  return result;
}

function rotateArray(arr, steps) {
  if (steps > 0) {
    while (steps--) {
      arr.unshift(arr.pop());
    }
  } else if (steps < 0) {
    while (steps++) {
      arr.push(arr.shift());
    }
  }
}

console.log('Round robin for 12 players:');
const results12 = roundRobin(12);
results12.forEach((result) =>
  console.log(
    `Round: ${result.round} Pairs: ${result.pairs.map((pair) => `(${pair[0]}, ${pair[1]})`)}`
  )
);

console.log('Round robin for 5 players, 0 denotes a bye:');
const results5 = roundRobin(5);
results5.forEach((result) =>
  console.log(
    `Round: ${result.round} Pairs: ${result.pairs.map((pair) => `(${pair[0]}, ${pair[1]})`)}`
  )
);
