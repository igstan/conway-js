var Game = function (board) {
    this.board = board;
};

Game.compare = function (gameA, gameB) {
    return gameA.board.every(function (row, i) {
        return row.every(function (cell, j) {
            return gameA.elementAt(i, j) === gameB.elementAt(i, j);
        });
    });
};

Game.prototype.elementAt = function (x, y) {
    return this.board[x] ? this.board[x][y] : undefined;
};

Game.prototype.eachRow = function (callback) {
    this.board.map(function (row, i, rows) {
        row.eachCell = row.map;
        callback(row, i, rows);
    });
};

var render = function (game) {
    var rows = [];

    game.eachRow(function (cells, i) {
        rows.push(cells.reduce(function (accumulator, cell) {
            return accumulator + ((cell === 1) ? "X" : "-");
        }, ""));
    });

    return rows.join("\n");
};
