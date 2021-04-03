class Canvas {

    constructor(canvasID) {
        this.element = document.getElementById(canvasID);
        if (!this.element) {
            throw new Error(`Could not get HTML canvas element with id ${canvasID}`);
        }
        this.context = this.element.getContext("2d");
        this.width = this.element.width;
        this.height = this.element.height;
        this.size = 10;
        this.paintmode = Grid.tileTypes.OBSTACLE;
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.element.addEventListener("click", e => {
            const x = e.offsetX;
            const y = e.offsetY;
            const { row, col } = this.convertXYToRowCol(x, y);
            console.log(`(${x},${y}) -> (${row},${col})`);
            if (this.paintmode === Grid.tileTypes.OBSTACLE) {
                Grid.setObstacle(row, col);
            } else if (this.paintmode === "START") {
                Grid.setStart(row, col);
            } else if (this.paintmode === "END") {
                Grid.setEnd(row, col);
            }
            this.drawGrid(Grid.getTiles());
        });
        
        this.element.addEventListener("contextmenu", e => {
            e.preventDefault();
            const x = e.offsetX;
            const y = e.offsetY;
            const { row, col } = this.convertXYToRowCol(x, y);
            Grid.removeObstacle(row, col);
            this.drawGrid(Grid.getTiles());
        });
    }

    convertXYToRowCol(x, y) {
        const row = Math.floor(y / this.tileSize);
        const col = Math.floor(x / this.tileSize);
        return { row, col };
    }

    setDimensions(width, height) {
        this.width = this.element.width = width;
        this.height = this.element.height = height;
    }

    setTileSize(size) {
        this.tileSize = size;
    }

    getDimensions() {
        return {
            width: this.width,
            height: this.height
        };
    }

    getMaxDimension() {
        return Math.max(this.height, this.width);
    }

    drawGrid(grid) {
        for (let tile of grid) {
            const tileColour = this.getTileColour(tile);
            this.context.fillStyle = tileColour;
            this.context.fillRect(
                tile.col * this.tileSize,
                tile.row * this.tileSize,
                this.tileSize,
                this.tileSize
            );
        }
    }

    getTileColour(tile) {
        if (tile.isEnd) return "red";
        if (tile.isStart) return "blue";

        if (tile.type === "EMPTY") {
            return "grey";
        } else if (tile.type === "OBSTACLE") {
            return "black"
        } else if (tile.type === "QUEUED") {
            return "lightblue";
        } else if (tile.type === "ROUTED") {
            return "green";
        } else if (tile.type === "HEAD") {
            return "yellow";
        } else if (tile.type === "PATH") {
            return "white";
        }
    }

    clear() {
        this.context.fillStyle = "grey";
        this.context.fillRect(-this.width, -this.height, 2 * this.width, 2 * this.height);
    }
}