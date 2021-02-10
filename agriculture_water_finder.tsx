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

    for (let column = 0; column < field.length; column++) {
      for (let row = 0; row < field[column].length; row++) {
        const localSquare = parsedField[column][row];
        localSquare.neighbors = getNeighbors(localSquare);
      }
    }

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

  function calcBodies(field: ISquare[][]) {
    let bodies: IBody[] = [];
    for (let column = 0; column < field.length; column++) {
      for (let row = 0; row < field[column].length; row++) {
        const localSquare: ISquare = field[column][row];

        if (localSquare.containsWater && !localSquare.searched) {
          const localBody: IBody = {
            squares: [localSquare]
          };
          bodies.push(localBody);
          localSquare.searched = true;
          localSquare.bodyIndex = resursiveChildSearch(localSquare);
        }
      }
    }

    function resursiveChildSearch(localSquare: ISquare) {
      let bodyIndex: number = -1;
      for (let i = 0; i < localSquare.neighbors.length; i++) {
        const localNeighbor = localSquare.neighbors[i];
        if (localNeighbor) {
          if (
            localNeighbor &&
            localNeighbor.containsWater &&
            !localNeighbor.searched
          ) {
            localNeighbor.searched = true;
            localNeighbor.bodyIndex = resursiveChildSearch(localNeighbor);
            bodyIndex = localNeighbor.bodyIndex;
            bodies[bodyIndex].squares.push(localNeighbor);
          }

          localNeighbor.searched = true;
        }
      }
      if (bodyIndex < 0) {
        bodyIndex = bodies.length - 1;
      }

      return bodyIndex;
    }

    return bodies;
  }

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
