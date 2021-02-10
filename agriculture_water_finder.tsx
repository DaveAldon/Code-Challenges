/*
This code receives a 2 dimensional array representing a field. The 0s are dry fields, and the 1s mean there's water underneath.
We then produce a report that lists each of the bodies of water, and which areas of the field belong to each body.
For example, this array as input:
[0, 1, 0, 1, 1],
[0, 1, 0, 0, 0],
[0, 1, 1, 1, 0],
[0, 1, 0, 0, 0],
[0, 1, 1, 1, 0]
  
Will produce the following report:
Body 0 has 9 members:
[0,1]
[2,3]
[2,2]
[4,3]
[4,2]
[4,1]
[3,1]
[2,1]
[1,1]
Body 1 has 2 members:
[0,3]
[0,4]
*/

interface ISquare {
  row: number;
  column: number;
  containsWater: boolean;
  neighbors?: ISquare[];
  bodyIndex?: number;
  searched: boolean;
}

interface IBody {
  squares: ISquare[];
}

const field: number[][] = [
  [0, 1, 0, 1, 1],
  [0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0],
  [0, 1, 0, 0, 1],
  [0, 1, 1, 1, 0]
];

agricultureWaterFinder(field);

function agricultureWaterFinder(field: number[][]) {
  const parsedField = initField(field);
  const parsedBodies = calcBodies(parsedField);
  const output = presentReport(parsedBodies);

  console.log(output);

  // Builds out the structure of the array as objects
  function initField(field: number[][]) {
    let parsedField: ISquare[][] = [];

    for (let column = 0; column < field.length; column++) {
      parsedField.push([]);
      for (let row = 0; row < field[column].length; row++) {
        const localSquare: ISquare = {
          row: row,
          column: column,
          containsWater: field[column][row] === 1,
          searched: false
        };
        parsedField[column][row] = localSquare;
      }
    }

    // Now that the initial structure is complete, we can calculate the neighbors
    for (let column = 0; column < field.length; column++) {
      for (let row = 0; row < field[column].length; row++) {
        const localSquare = parsedField[column][row];
        localSquare.neighbors = getNeighbors(localSquare);
      }
    }

    // Simple calculation of neighbor elements in x/y directions
    function getNeighbors(square: ISquare) {
      const { row, column } = square;

      const up = parsedField[column][row - 1] || null;
      const down = parsedField[column][row + 1] || null;
      const left = parsedField[column - 1]
        ? parsedField[column - 1][row]
        : null;
      const right = parsedField[column + 1]
        ? parsedField[column + 1][row]
        : null;

      return [up, down, left, right];
    }
    return parsedField;
  }

  // With a well structured field, we can now calculate the bodies of water
  function calcBodies(field: ISquare[][]) {
    let bodies: IBody[] = [];

    for (let column = 0; column < field.length; column++) {
      for (let row = 0; row < field[column].length; row++) {
        const localSquare: ISquare = field[column][row];

        // We only care about points that have water, and haven't been searched yet
        if (localSquare.containsWater && !localSquare.searched) {
          // Make a new body of water
          const localBody: IBody = {
            squares: [localSquare]
          };
          bodies.push(localBody);

          // Mark as searched, so that our recursion doesn't repeat itself
          localSquare.searched = true;

          // Set the parent body index equal to the deepest connected child
          localSquare.bodyIndex = resursiveChildSearch(localSquare);
        }
      }
    }

    // Recursion that searches for deepest connected child, and creates a body index
    function resursiveChildSearch(localSquare: ISquare) {
      // Set the initial index to the end of the bodies
      let bodyIndex: number = bodies.length - 1;

      for (let i = 0; i < localSquare.neighbors.length; i++) {
        const localNeighbor = localSquare.neighbors[i];

        if (localNeighbor) {
          // We only care about water filled, unsearched points
          if (
            localNeighbor &&
            localNeighbor.containsWater &&
            !localNeighbor.searched
          ) {
            // Marked as searched so that the next recursion skips it
            localNeighbor.searched = true;

            // Go deeper
            localNeighbor.bodyIndex = resursiveChildSearch(localNeighbor);
            bodyIndex = localNeighbor.bodyIndex;
            bodies[bodyIndex].squares.push(localNeighbor);
          }
        }
      }

      return bodyIndex;
    }

    return bodies;
  }

  // Run-of-the-mill output, goes over the bodies of water and shows children/count
  function presentReport(bodies: IBody[]) {
    let output = ``;
    for (let i = 0; i < bodies.length; i++) {
      let memberOutput = `\n`;
      for (let ii = 0; ii < bodies[i].squares.length; ii++) {
        const localSquare = bodies[i].squares[ii];
        memberOutput += `[${localSquare.column},${localSquare.row}]\n`;
      }
      const length = bodies[i].squares.length;
      output += `\nBody ${i} has ${length} member${
        length > 1 ? "s" : ""
      }: ${memberOutput}`;
    }
    return output;
  }
}
