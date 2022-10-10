const getNextWaitTime = (currentTerm: number): number => {
  let first = 3;
  let second = 5;
  let temp: number;
  for (let i = 0; i <= currentTerm; i++) {
    temp = second;
    second = first + second;
    first = temp;
  }
  return second * 1000;
};

export const getFromUrlIdentifier = (fromUrl: string): string => {
  return fromUrl.split("/").pop() || "";
};

export default getNextWaitTime;
