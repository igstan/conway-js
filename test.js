var f = fireunit;

var game = Game([
    [1, 0],
    [0, 0],
]);

var nextGame = Game([
    [0, 0],
    [0, 0]
]);

f.ok(game.elementAt(0, 0) === 1, "elementAt(0, 0)");
f.ok(game.size() === 2,  "size()");

f.ok(game.compare(game), "compare() ok");
f.ok(game.compare(Game([[0, 1], [0, 0]])) === false, "compare() not ok");
f.ok(game.neighbours(0,1) === 1, "neighbours()");

f.ok(game.nextGeneration().compare(nextGame), "nextGeneration() first rule")

f.ok(Game([
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
]).nextGeneration().compare(Game([
    [1, 0, 1],
    [0, 0, 0],
    [1, 0, 1]
])), "nextGeneration() second rule");

f.ok(Game([
    [0, 1],
    [1, 1]
]).nextGeneration().compare(Game([
    [1, 1],
    [1, 1]
])), "nextGeneration() 3 & 4 rule");

var render = GameRender(game);
f.compare(render(), "O_\n__", "render()");

fireunit.testDone();
