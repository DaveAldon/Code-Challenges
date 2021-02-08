/*
Fizzbuzz helper functions
*/

/*
Run-of-the-mill fizzbuzz. Simple, but not extensible.
*/

function fizzBuzz() {
  let output: string = "";
  let fizz = "fizz";
  let buzz = "buzz";

  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      output += `${fizz + buzz}\n`;
      continue;
    }
    if (i % 5 === 0) {
      output += `${buzz}\n`;
      continue;
    }
    if (i % 3 === 0) {
      output += `${fizz}\n`;
      continue;
    }
    output += `${i}\n`;
  }
  return output;
}

console.log(fizzBuzz());

/*
Advanced fizzbuzz. This one is very extensible. It allows us to have more than
2 values to check by passing in an object that has the name we want displayed,
and the number to check.
*/

interface IExtensibleInput {
  [name: string]: number;
}

interface ISingle {
  name: string;
  value: number;
  index?: number;
}

const input: IExtensibleInput = {
  fizz: 3,
  buzz: 5,
  even: 7,
  better: 10
};

function advancedFizzBuzz(input: IExtensibleInput) {
  let output: string[] = [...Array(100).fill(null)];

  function applyOutput(fizzBuzzValue: ISingle) {
    const { name, value, index } = fizzBuzzValue;

    if (index % value === 0) {
      return `${name}`;
    }
    return null;
  }

  for (const key in input) {
    const single: ISingle = {
      name: key,
      value: input[key]
    };
    for (let i = 0; i < output.length; i++) {
      single.index = i;
      const result = applyOutput(single);
      if (result !== null) output[i] = `${output[i] || ""}${result}`;
    }
  }

  for (let i = 0; i < output.length; i++) {
    output[i] = output[i] === null ? `${i}` : output[i];
  }

  return output;
}

console.log(advancedFizzBuzz(input));
