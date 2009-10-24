Array.prototype.sum = function () {
    return this.reduce(function (a,b) (a||0) + (b||0));
};


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

Game.prototype.mapCells = function (fn) {
    return this.board.map(function (cells, i) {
        return cells.map(function (cell, j) {
            return fn(cell, i, j);
        });
    });
};

Game.prototype.nextGeneration = function () {
    var self  = this;
    var board = this.mapCells(function (cell, i, j) self.newCellValue(i, j));

    return new Game(board);
};

Game.prototype.upperLeft = function (x, y) {
    return this.elementAt(x - 1, y - 1);
};

Game.prototype.upper = function (x, y) {
    return this.elementAt(x, y - 1);
};

Game.prototype.upperRight = function (x, y) {
    return this.elementAt(x + 1, y - 1);
};

Game.prototype.middleLeft = function (x, y) {
    return this.elementAt(x - 1, y);
};

Game.prototype.middleRight = function (x, y) {
    return this.elementAt(x + 1, y);
};

Game.prototype.lowerLeft = function (x, y) {
    return this.elementAt(x - 1, y + 1);
};

Game.prototype.lower = function (x, y) {
    return this.elementAt(x, y + 1);
};

Game.prototype.lowerRight = function (x, y) {
    return this.elementAt(x + 1, y + 1);
};

Game.prototype.neighboursOf = function (x, y) {
    var neighbours = "upperLeft,upper,upperRight,middleLeft,middleRight,lowerLeft,lower,lowerRight";
    var self = this;

    return neighbours.split(",").map(function (fn) self[fn](x, y));
};

Game.prototype.neighboursNumber = function (x, y) {
    return this.neighboursOf(x, y).sum();
};

Game.prototype.newCellValue = function (x, y) {
    var neighboursNumber = this.neighboursNumber(x, y);
    var isAlive          = this.elementAt(x, y);

    if (isAlive) {
        if (neighboursNumber < 2 || neighboursNumber > 3) {
            return 0;
        } else {
            return 1;
        }
    } else {
        if (neighboursNumber === 3) {
            return 1;
        }
    }

    return 0;
};

var render = function (game) {
    return game.mapCells(function (cell, i, j) cell === 1 ? "X" : "-")
               .map(function (row) row.join(""))
               .join("\n");
};
