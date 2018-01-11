

export const getStars = () => {
let row, col;
let mapTileColumnCount = 12;
let mapTileRowCount = 12;
let sectorsWide = 4;
let sectorsTall = 4;
let sectorWidth = (mapTileColumnCount / sectorsWide);
let sectorHeight = (mapTileRowCount / sectorsTall);
let startPerSectorCount = 2;
let obj = {};
let q, r;
let i;
let max;
let min;

let starColor = ['red', 'blue', 'yellow'];

for (q = 0; q < sectorsWide; q++) {
  for (r = 0; r < sectorsTall; r++) {
      for (i = 0; i < startPerSectorCount; i++)
      {
        min = q * sectorWidth;
        max = (q + 1) * sectorWidth;
        col = Math.floor((Math.random() * (max - min)) + min);
        min = r * sectorHeight;
        max = (r + 1) * sectorHeight;
        row = Math.floor((Math.random() * (max - min)) + min);

        obj[`${row}-${col}`] = `${starColor[(((row + 1) * (col + 1)) % 3)]}Giant`;
      }
  }
}
return obj;
}
