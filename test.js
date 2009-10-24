var f = fireunit;


f.compare([1, 2].sum(), 3, "Test Array.prototype.sum();");
f.compare([undefined, 2].sum(), 2, "Test Array.prototype.sum(); with undefined elements");

var game = new Game([
    [1, 0],
    [0, 0],
]);
f.ok(game.elementAt(0, 0) === 1, "Test elementAt();");
f.ok(game.elementAt(-1, -1) === undefined, "Test elementAt(); returns undefined for negative values");

f.compare("X-\n--", render(game), "Test render();");

f.ok(Game.compare(game, game), "Test Game.compare();");

var nextGeneration     = game.nextGeneration();
var expectedGeneration = new Game([[0, 0], [0, 0]]);
f.ok(Game.compare(nextGeneration, expectedGeneration), "Test nextGeneration(); first rule");

nextGeneration     = new Game([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1],
]).nextGeneration();
expectedGeneration = new Game([
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1],
]);
f.ok(Game.compare(nextGeneration, expectedGeneration), "Test nextGeneration(); second rule");


nextGeneration     = new Game([
    [1, 1, 0],
    [1, 0, 1],
    [1, 0, 1],
]).nextGeneration();
expectedGeneration = new Game([
    [1, 1, 0],
    [1, 0, 1],
    [0, 0, 0],
]);
f.ok(Game.compare(nextGeneration, expectedGeneration), "Test nextGeneration(); third rule");


nextGeneration     = new Game([
    [0, 1, 0],
    [1, 0, 1],
    [0, 0, 0],
]).nextGeneration();
expectedGeneration = new Game([
    [0, 1, 0],
    [0, 1, 0],
    [0, 0, 0],
]);
f.ok(Game.compare(nextGeneration, expectedGeneration), "Test nextGeneration(); fourth rule");


f.ok(game.neighboursNumber(1, 0) === 1, "Test neighboursNumber();");

f.testDone();

window.addEventListener("DOMContentLoaded", function () {
    var game = new Game([
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
        [0,0,1,1,1,0],
        [0,1,1,1,0,0],
        [0,0,0,0,0,0],
        [0,0,0,0,0,0],
    ]);

    document.getElementById("panel").innerHTML = render(game);

    document.getElementById("next").addEventListener("click", function () {
        game = game.nextGeneration();
        document.getElementById("panel").innerHTML = render(game);
    }, false);

}, false);
