/*
Helper functions for palidrome management
*/

const input = 583534

/* 
Lazy, cheap way of checking for a number based palindrome.
Pros: Simple logic. Works with strings and numbers
Cons: Output has to be a string. Can't continue computation of number input without conversion
*/
function lazyIsPalindrome(data: number) {
  return `${data}`.split('').reverse().join('')
}

console.log(lazyIsPalindrome(input) === `${input}`)

/* 
Efficient, mathematical palidrome checker for numbers.
Pros: Fast, outputs a number, pure math
Cons: Doesn't work with strings/chars
*/
function efficientIsPalindrome(data: number) {
  let reverse = 0
  let value = data

  while(reverse < data) {
    reverse *= 10
    reverse += value % 10

    value -= value % 10
    value /= 10
  }

  return reverse
}

console.log(efficientIsPalindrome(input) === input)

/*
All numbers can be coerced into a palindrome by adding their reverse value
to themselves repeatedly until you get a palindrome. This function demonstrates how to do this, and outputs how many recursive calls were needed.
*/
interface IRecursion {
  data: number;
  recursion?: number;
}

function createPalindrome(input: IRecursion) {
  const { data, recursion } = input
  let howManyRecursions = recursion || 0

  let reverse = efficientIsPalindrome(data)

  if(reverse !== data) {
    const newData: IRecursion = {
      data: data + reverse,
      recursion: howManyRecursions + 1
    }
    return createPalindrome(newData)
  } else {
    return howManyRecursions
  }
}

console.log(createPalindrome({data: input}))
