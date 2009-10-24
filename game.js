
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
        zip: function(otherGame) {
            var results = [];
            for (var i=0; i<this.size(); i++) {
                for (var j=0; j<this.size(); j++) {
                    results.push([this.elementAt(i,j), otherGame.elementAt(i,j)]);
                }
            }
            return results;
        },
        foreachCell:function(fn) {
            var rows = [];
            for (var i=0; i<this.size(); i++) {
                var cells = [];
                for (var j=0; j<this.size(); j++) {
                    cells.push(fn(this.elementAt(i,j), this.neighbours(i,j)));
                }
                rows.push(cells);
            }
            return rows;
        },
        compare: function(otherGame) {
            if (this.size() !== otherGame.size()) {
                return false;
            }

            return this.zip(otherGame)
                       .every(function(gamePair) {
                            return gamePair[0] === gamePair[1];
                        });
        },
        neighbours: function(line, column) {
            var deltaLine = [-1, -1, -1, 0, 1, 1, 1, 0];
            var deltaColumn = [-1, 0, 1, 1, 1, 0, -1, -1];
            var count = 0;
            
            for(var i=0; i<deltaLine.length; i++) {
                currentLine = line + deltaLine[i];
                currentColumn = column + deltaColumn[i];
                if(this.elementAt(currentLine, currentColumn) == 1) {
                    count += 1;
                }
            }
            return count;
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
