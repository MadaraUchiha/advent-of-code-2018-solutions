export function processInput(input: string) {
  const lines = input.split('\n').sort();
  const result = new Map<number, Array<{ date: Date, action: 'sleep' | 'wake' }>>();
  let currentGuardId = 0;

  for (const line of lines) {
    const match = line.match(/\[(.+)\] (.+)/);
    if (!match) {
      throw new Error(`Regex does not match for ${line}`);
    }
    const [, timestamp, description] = match;

    const date = new Date(timestamp + 'Z');

    if (description.startsWith('Guard')) {
      const [, id] = description.split(' ');
      currentGuardId = parseInt(id.replace('#', ''), 10);
      continue;
    }

    if (!result.has(currentGuardId)) {
      result.set(currentGuardId, []);
    }

    if (description === 'falls asleep') {
      result.get(currentGuardId)!.push({ action: 'sleep', date });
      continue;
    }

    if (description === 'wakes up') {
      result.get(currentGuardId)!.push({ action: 'wake', date });
      continue;
    }
  }

  return result;
}

export function sumHours(log: Array<{ date: Date, action: 'sleep' | 'wake' }>) {
  let result = 0;
  for (let i = 0; i < log.length; i += 2) {
    const sleepEntry = log[i];
    const wakeEntry = log[i + 1];

    result += wakeEntry.date.getMinutes() - sleepEntry.date.getMinutes();
  }
  return result;
}

export function findMostSleptMinute(log: Array<{ date: Date, action: 'sleep' | 'wake' }>) {
  const countDict: { [minute: number]: number } = {};

  for (let i = 0; i < log.length; i += 2) {
    const sleepEntry = log[i];
    const wakeEntry = log[i + 1];

    for (let m = sleepEntry.date.getMinutes(); m < wakeEntry.date.getMinutes(); m++) {
      countDict[m] = countDict[m] || 0;
      countDict[m]++;
    }
  }

  const [mostCommonMinute, mostCommonCount] = Object.entries(countDict)
    .sort(([_, countA], [__, countB]) => countB - countA)[0];

  return { mostCommonMinute: Number(mostCommonMinute), mostCommonCount }; // Object keys get stringified :(
}
