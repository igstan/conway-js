var f = fireunit;

var game = new Game([
    [1, 0],
    [0, 0],
]);
f.ok(game.elementAt(0, 0) === 1, "Test elementAt();");

f.compare("X-\n--", render(game), "Test render();");

f.testDone();
