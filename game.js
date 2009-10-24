
function zip(array1, array2) {
    return array1.map(function(el, i) {
        return [el, array2[i]];
    });
}

var Game = function (boardMatrix) {

    function applyGameRules(element, neighbours) {
        if (element === 1) {
            if (neighbours < 2 || neighbours > 3) {
                return 0;
            }
        } else if(neighbours ==3) {
            return 1;
        }
        return element;
    }

    return {
        elementAt: function(line, column) {
            if(boardMatrix[line] == undefined) {
                return undefined;
            }
            return boardMatrix[line][column];
        },
        nextGeneration: function() {
            return Game(this.foreachCell(applyGameRules));
        },
        size: function() {
            return boardMatrix.length;
        },
        zipGame: function(otherGame) {
            var results = [];
            for (var i=0; i<this.size(); i++) {
                for (var j=0; j<this.size(); j++) {
                    results.push([this.elementAt(i,j), otherGame.elementAt(i,j)]);
                }
            }
            return results;
        },
        foreachRow: function(fn) {
            return boardMatrix.map(fn);
        },
        foreachCell: function(fn) {
            var self = this;
            return this.foreachRow(function (row, i) {
                return row.map(function (cell, j) {
                    return fn(cell, self.neighbours(i,j));
                });
            });
        },
        compare: function(otherGame) {
            if (this.size() !== otherGame.size()) {
                return false;
            }

            return this.zipGame(otherGame)
                       .every(function(gamePair) {
                            return gamePair[0] === gamePair[1];
                        });
        },
        neighbours: function(line, column) {
            var lines = [-1, -1, -1, 0, 1, 1, 1, 0].map(function(d){return line+d;});
            var columns = [-1, 0, 1, 1, 1, 0, -1, -1].map(function(d){return column+d});
            var self = this;
            
            return zip(lines, columns).reduce(function(count, pair) {
                if(self.elementAt(pair[0], pair[1]) == 1) {
                    return count + 1;
                }
                return count;
            }, 0);
        }
    };
};

var GameRender = function (game) {

    function renderCell(rowIndex, cellIndex) {
        if (game.elementAt(rowIndex, cellIndex) === 1) {
            return "O";
        } else {
            return "_";
        }
    }

    function renderRow(rowIndex) {
        var rowString = "";
        for (var cellIndex=0; cellIndex < game.size(); cellIndex++) {
            rowString += renderCell(rowIndex, cellIndex);
        }
        return rowString;
    }

    return function() {
        var str = [];

        for (var rowIndex=0; rowIndex < game.size(); rowIndex++) {
            str.push(renderRow(rowIndex));
        }
        
        return str.join("\n");
    };
};


(function () {
    var game = Game([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ]);
    var render = GameRender(game);
    document.getElementById('panel').innerHTML = render();

    document.getElementById('next').onclick = function() {
        game = game.nextGeneration();
        render = GameRender(game);
        document.getElementById('panel').innerHTML = render();
    }
})();
