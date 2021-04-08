const UI = (function () {

    const tileSelectors = [...document.querySelectorAll('.options__option')];
    tileSelectors.forEach(tile => {
        tile.onclick = function() {
            tileSelectors.forEach(t => t.removeAttribute("selected"));
            tile.setAttribute("selected", "yes");
            canvas.setPaintMode(tile.getAttribute("tile-type"));
        }
    });

    const pathLengthDiv = document.getElementById("path-length");
    const turnCountDiv = document.getElementById("turns-count");

    const resetMetrics = () => {
        pathLengthDiv.innerText = 0;
        turnCountDiv.innerText = 0;
    }

    const setPathLength = (pathLength) => {
        pathLengthDiv.innerText = pathLength
    }

    const setTurnCount = (turnCount) => {
        turnCountDiv.innerText = turnCount;
    }

    const runButton = document.getElementById("run");
    runButton.onclick = function () {
        PathFinding.resetMetrics();
        resetMetrics();
        pathfindingAlgorithm.bind(PathFinding)(
            Grid.getTiles(),
            gridWidth,
            Grid.getStart(),
            Grid.getEnd()
        );
    }

    const resetButton = document.getElementById("reset");
    resetButton.onclick = function() {
        Grid.reset();
        canvas.drawGrid(Grid.getTiles());
    }

    const randomiseButton = document.getElementById("randomise");
    randomiseButton.onclick = function () {
        Grid.reset();
        Grid.randomiseGrid(0.2);
        canvas.drawGrid(Grid.getTiles());
    }

    let pathfindingAlgorithm = PathFinding.BFS;
    const selectElement = document.getElementById("algorithm-select");
    selectElement.onchange = function () {
        switch (this.value) {
            case "1":
                pathfindingAlgorithm = PathFinding.BFS;
                break;
            case "2":
                pathfindingAlgorithm = PathFinding.DFS;
                break;
            case "3":
                pathfindingAlgorithm = PathFinding.leastTurns;
                break;
            case "4":
                pathfindingAlgorithm = PathFinding.AStar;
                break;
            default:
                pathfindingAlgorithm = PathFinding.BFS;
                break;
        }
    }

    return {
        resetMetrics,
        setPathLength,
        setTurnCount
    }
})();