import { jest } from '@jest/globals';

global.jest = jest;

for (const key in jest) {
  if (Object.hasOwnProperty.call(jest, key)) {
    global[key] = jest[key];
  }
}
