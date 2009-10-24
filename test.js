var f = fireunit;

var game = new Game([
    [1, 0],
    [0, 0],
]);
f.ok(game.elementAt(0, 0) === 1, "Test elementAt();");

f.compare("X-\n--", render(game), "Test render();");

f.ok(Game.compare(game, game), "Test Game.compare();");

f.testDone();

window.addEventListener("DOMContentLoaded", function () {
    var game = new Game([
        [1, 0, 1],
        [0, 0, 1],
        [1, 0, 1],
    ]);
    document.getElementById("panel").innerHTML = render(game);
}, false);
