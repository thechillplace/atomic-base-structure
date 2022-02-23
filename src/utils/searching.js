export const findClosestIndex = (arr, element) => {
  'worklet';
  let from = 0,
    until = arr.length - 1;
  while (true) {
    const cursor = Math.floor((from + until) / 2);
    if (cursor === from) {
      const diff1 = element - arr[from];
      const diff2 = arr[until] - element;
      return diff1 <= diff2 ? from : until;
    }

    const found = arr[cursor];
    if (found === element) {
      return cursor;
    }

    if (found > element) {
      until = cursor;
    } else if (found < element) {
      from = cursor;
    }
  }
};
