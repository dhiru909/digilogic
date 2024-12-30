function maxSquareRecur(i, j, mat, ans, memo) {

    // Return 0 for invalid cells
    if (i < 0 || i === mat.length || j < 0
        || j === mat[0].length)
        return 0;

    // If value is memoized, return value.
    if (memo[i][j] !== -1)
        return memo[i][j];

    // Find the side of square for right, bottom,
    // and diagonal cells.
    let right = maxSquareRecur(i, j + 1, mat, ans, memo);
    let down = maxSquareRecur(i + 1, j, mat, ans, memo);
    let diagonal
        = maxSquareRecur(i + 1, j + 1, mat, ans, memo);

    // If mat[i][j]==0, then square cannot
    // be formed.
    if (mat[i][j] === 0)
        return memo[i][j] = 0;

    // Side of square will be
    let val = 1 + Math.min(right, down, diagonal);
    ans[0] = Math.max(ans[0], val);

    // Memoize the value and return it.
    memo[i][j] = val;
    return val;
}

function maxSquare(mat) {
    let n = mat.length, m = mat[0].length;
    let ans = [ 0 ];

    // Create 2d array for memoization
    let memo
        = Array.from({length : n}, () => {return Array(m).fill(-1)});
    maxSquareRecur(0, 0, mat, ans, memo);
    return ans[0];
}

let mat = [
    [ 0, 1, 1, 0, 1 ], [ 1, 1, 0, 1, 0 ], [ 0, 1, 1, 1, 0 ],
    [ 1, 1, 1, 1, 0 ], [ 1, 1, 1, 1, 1 ], [ 0, 0, 0, 0, 0 ]
];
console.log(maxSquare(mat));