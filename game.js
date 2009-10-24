Array.prototype.sum = function () {
    return this.reduce(function (a,b) (a||0) + (b||0));
};

var Game = function (board) {
    this.board = board;
};

Game.DIED_CELL = 0;
Game.LIVE_CELL = 1;

(function () {
    var WITH_TWO_NEIGHBOURS   = 2,
        WITH_THREE_NEIGHBOURS = 3,
        ALL_OTHER_CELLS       = '*',
        A_DEAD_CELL           = Game.DIED_CELL,
        A_LIVE_CELL           = Game.LIVE_CELL,
        BECOMES_ALIVE         = Game.LIVE_CELL,
        SURVIVES              = Game.LIVE_CELL,
        DIE                   = Game.DIED_CELL;

    Game.rules = {0:{}, 1:{}};

    Game.rules[A_DEAD_CELL][WITH_THREE_NEIGHBOURS] = BECOMES_ALIVE;
    Game.rules[A_LIVE_CELL][WITH_TWO_NEIGHBOURS]   = SURVIVES;
    Game.rules[A_LIVE_CELL][WITH_THREE_NEIGHBOURS] = SURVIVES;
    Game.rules[ALL_OTHER_CELLS]                    = DIE;
})();

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
    var board = this.mapCells(function (cell, i, j) self.applySurvivalRules(cell, i, j));

    return new Game(board);
};

Game.prototype.applySurvivalRules = function (currentCell, x, y) {
    var totalNeighbours = this.neighboursNumber(x, y);
    return Game.rules[currentCell][totalNeighbours] || Game.DIED_CELL;
};

Game.prototype.neighboursNumber = function (x, y) {
    return this.neighboursOf(x, y).sum();
};

Game.prototype.neighboursOf = function (x, y) {
    var neighbours = "upperLeft,upper,upperRight,middleLeft,middleRight,lowerLeft,lower,lowerRight";
    var self = this;

    return neighbours.split(",").map(function (neighbourPosition) {
        return self[neighbourPosition](x, y);
    });
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


var render = function (game) {
    return game.mapCells(function (cell, i, j) cell === 1 ? "<span>&diams;</span>" : "-")
               .map(function (row) row.join(""))
               .join("\n");
};
