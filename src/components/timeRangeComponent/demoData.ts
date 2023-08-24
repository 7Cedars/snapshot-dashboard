const nCol = 40;
const nRow = 20;

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9"
];

type HeatmapData = { x: string; y: string; value: number }[];
const data: HeatmapData = [];

for (let x = 0; x < nCol; x++) {
  for (let y = 0; y < nRow; y++) {
    data.push({
      x: alphabet[x],
      y: alphabet[y],
      value: Math.random() * 40,
    });
  }
}



export { data };
