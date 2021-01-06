const transpose = (matrix) => {
  const rows = matrix.length,
    cols = matrix[0].length;
  const grid = [];
  for (let j = 0; j < cols; j++) {
    grid[j] = Array(rows);
  }
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[j][i] = matrix[i][j];
    }
  }
  return grid;
};
const reverse = (matrix) => matrix.map((row) => row.reverse());
const rotate = (matrix) => reverse(transpose(matrix));

module.exports = { transpose, reverse, rotate };
