import { RoundResult } from '@/types';

export default function roundRobin(teamCount: number): RoundResult[] {
  if (teamCount < 2) {
    throw new Error('Number of teams must be greater than 2: ' + teamCount);
  }

  const result: RoundResult[] = [];

  const rotatingList: number[] = Array.from({ length: teamCount - 1 }, (_, i) => i + 2);
  if (teamCount % 2 !== 0) {
    rotatingList.push(0);
    teamCount += 1;
  }

  for (let round = 1; round < teamCount; round++) {
    const roundResult: RoundResult = { round, pairs: [] };

    const fixedList: number[] = [1, ...rotatingList];
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

function rotateArray(arr: number[], steps: number): void {
  if (steps > 0) {
    while (steps--) {
      arr.unshift(arr.pop()!);
    }
  } else if (steps < 0) {
    while (steps++) {
      arr.push(arr.shift()!);
    }
  }
}
