/*
Input an array that has unique peaks -> [0,1,2,2,3,5]
Receive an array with unique peaks removed -> Down: [0,1,2,2,2,2] Up: [2,2,2,2,3,5]
This function is extensible, and can flatten up or down
*/

interface IFlattenInput {
  data: number[];
  flattenDown: boolean;
}

interface IUnique {
  value: number;
  index: number;
}

const input: IFlattenInput = {
  data: [0, 1, 2, 2, 3, 5],
  flattenDown: true
};

function flatten(input: IFlattenInput) {
  const { data, flattenDown } = input;

  // Filter out all unique values
  const filter = data.filter(x => {
    return data.indexOf(x) != data.lastIndexOf(x);
  });

  // If there's only uniques, return the array as-is. This accounts for [1,2,3] cases
  if (filter.length === 0) return data;

  // Find the min/max of the pairs
  const maxPair = flattenDown ? Math.max(...filter) : Math.min(...filter);

  // Set anything lower/higher equal to the min/max pair, thus flattening the array
  for (let i = 0; i < data.length; i++) {
    if (flattenDown) {
      if (data[i] > maxPair) data[i] = maxPair;
    } else {
      if (data[i] < maxPair) data[i] = maxPair;
    }
  }

  return data;
}

console.log(flatten(input));
