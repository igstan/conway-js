var f = fireunit;

var createTester = function (setUp) {
    return function (testFn) {
        var context = setUp();
        testFn(context);
    };
};

var runTest = createTester(function () {
    return {
        game: Game([
            [1, 0],
            [0, 0],
        ])
    };
});

runTest(function (context) {
    f.compare(zip([1,2], [3,4]).toString(), [[1,3], [2,4]].toString(), "zip()");
});

runTest(function (context) {
    f.ok(context.game.elementAt(0, 0) === 1, "elementAt(0, 0)");
});

runTest(function (context) {
    f.ok(context.game.size() === 2,  "size()");
});

runTest(function (context) {
    f.ok(context.game.compare(context.game), "compare() ok");
});

runTest(function (context) {
    f.ok(context.game.compare(Game([[0, 1], [0, 0]])) === false, "compare() not ok");
});

runTest(function (context) {
    f.ok(context.game.neighbours(0,1) === 1, "neighbours()");
});

runTest(function (context) {
    new_game = Game(context.game.foreachCell(function(x){return x;}));
    f.ok(context.game.compare(new_game), "foreachCell()");
});

runTest(function (context) {
    var nextGame = Game([
        [0, 0],
        [0, 0]
    ]);
    f.ok(context.game.nextGeneration().compare(nextGame), "nextGeneration() first rule");
});

runTest(function (context) {
    var render = GameRender(context.game);
    f.compare(render(), "O_\n__", "render()");
});

runTest(function (context) {
    f.ok(Game([
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1]
        ]).nextGeneration().compare(Game([
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1]
    ])), "nextGeneration() second rule");
});

runTest(function (context) {
    f.ok(Game([
            [0, 1],
            [1, 1]
        ]).nextGeneration().compare(Game([
            [1, 1],
            [1, 1]
    ])), "nextGeneration() 3 & 4 rule");
});

fireunit.testDone();
