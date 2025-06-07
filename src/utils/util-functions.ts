export const getAvailableYears = (lastYear: number): number[] => {
  const availableYears = [];
  for (let i = 0; i < 50; ++i) {
    availableYears.push(lastYear - i);
  }

  return availableYears;
}