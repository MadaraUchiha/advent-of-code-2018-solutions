import { readFileSync } from 'fs';

// I opted for a txt file this time around because of all the backslashes in the input.
export const day13Input = readFileSync(`${__dirname}/input.txt`, { encoding: 'utf8' });
