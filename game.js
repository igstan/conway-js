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
    return this.board[x][y];
};

Game.prototype.eachRow = function (callback) {
    this.board.map(function (row, i, rows) {
        row.eachCell = row.map;
        callback(row, i, rows);
    });
};

var render = function (game) {
    var rows = [];

    game.eachRow(function (row, i) {
        var cells = "";

        row.eachCell(function (cell, i) {
            cells += (cell === 1) ? "X" : "-";
        });

        rows.push(cells);
    });

    return rows.join("\n");
};
