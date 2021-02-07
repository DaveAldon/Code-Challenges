/*
Input an array that has unique peaks -> [1,2,0,1]
Receive an array with unique peaks removed -> [1,1,0,1]
*/

const heights: number[] = [0,1,0,2,1,0,1,3,2,1,2,1];

interface IUnique {
  value: number;
  index: number;
}

function flatten(data: number[]) {
  // Find the max peak
  let max = Math.max(...data);
  // Check if it is unique using a reducer function
  let occurance = data.reduce((acc, value) => {
    return value === max ? acc + 1 : acc;
  }, 0);

  // If it's unqique, subtract 1 from the value and use recursion to continue the process
  if(occurance === 1) {
    const index = data.indexOf(max)
    data[index]--;
    return flatten(data)
  } else {
    return data
  }
}

console.log(flatten(heights));
