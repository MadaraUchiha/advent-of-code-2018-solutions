export function generateField(serial: number) {
  const field = Array.from(Array(300)).map(() => Array.from(Array(300)).map(() => 0));

  const computedField = field.map((row, i) => row.map((cell, j) => {
    const x = j + 1;
    const y = i + 1;
    const rackID = x + 10;
    const initialPowerLevel = rackID * y;
    const withSerial = initialPowerLevel + serial;
    const withRackID = withSerial * rackID;
    const hundredthDigit = Math.floor(withRackID / 100) % 10;
    return hundredthDigit - 5;
  }));

  return computedField;
}
