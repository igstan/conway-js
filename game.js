var Game = function (board) {
    this.board = board;
};

Game.prototype.elementAt = function (x, y) {
    return this.board[x][y];
};
