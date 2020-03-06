function Agol(canvas) {
    this.canvas = canvas;
    this.cellWidth = 60;
    this.cellHeight = 60;
    this.cellColor = 'black';
    this.cellSymbol = null;
    this.cells = [];

    this.calculateColumns = function() {
        const info = this.canvas.getBoundingClientRect();
        return Math.floor(info.width / this.cellWidth);
    };

    this.calculateRows = function() {
        const info = this.canvas.getBoundingClientRect();
        return Math.floor(info.width / this.cellHeight);
    };

    this.calculateCellCount = function() {
        const info = this.canvas.getBoundingClientRect();

    };
}

Agol.prototype.Reset = function() {
    this.cells.length = 0;
    paper.project.activeLayer.removeChildren();

    const rect = new paper.Rectangle({ x: 0, y: 0, width: this.cellWidth, height: this.cellHeight });
    let path = new paper.Path.Rectangle(rect);
    path.fillColor = this.cellColor;

    this.cellSymbol = new paper.Symbol(path, true);

    const rows = this.calculateRows();
    const columns = this.calculateColumns();
    for (let i = 0; i < rows; ++i) {
        this.cells.push([]);
        for (let j = 0; j < columns; ++j) {
            let symbol = this.cellSymbol.place(new paper.Point((j * this.cellWidth) + 1,
                (i * this.cellHeight) + 1));
            symbol.visible = Math.round(Math.random()) === 1;
            this.cells[i].push(symbol);
        }
    }
};

Agol.prototype.Step = function(e) {

    if (this.cells.length === 0) {
        return;
    }

    for (let i = 0; i < this.cells.length; ++i) {

        if (this.cells[i].length === 0) {
            continue;
        }

        for (let j = 0; j < this.cells[i].length; ++j) {

            let cell = this.cells[i][j];

            let neighborsAlive = 0;
            // if i or j === 0 ??
            if (i !== 0) {
                const neighborTop = this.cells[i - 1][j];
                if (neighborTop.visible) {
                    ++neighborsAlive;
                }
            }

            if ((i + 1) !== this.cells.length) {
                const neighborBottom = this.cells[i + 1][j];
                if (neighborBottom.visible) {
                    ++neighborsAlive;
                }
            }

            if (j !== 0) {
                const neighborLeft = this.cells[i][j - 1];
                if (neighborLeft.visible) {
                    ++neighborsAlive;
                }
            }

            if ((j + 1) !== this.cells[i].length) {
                const neighborRight = this.cells[i][j + 1];
                if (neighborRight.visible) {
                    ++neighborsAlive;
                }
            }

            //

            if (i !== 0 && j !== 0) {
                const neighborTopLeft = this.cells[i - 1][j - 1];
                if (neighborTopLeft.visible) {
                    ++neighborsAlive;
                }
            }

            if ((i + 1) !== this.cells.length && (j + 1) !== this.cells[i].length) {
                const neighborBottomRight = this.cells[i + 1][j + 1];
                if (neighborBottomRight.visible) {
                    ++neighborsAlive;
                }
            }

            if (i !== 0 && (j + 1) !== this.cells[i].length) {
                const neighborTopRight = this.cells[i - 1][j + 1];
                if (neighborTopRight.visible) {
                    ++neighborsAlive;
                }
            }

            if ((i + 1) !== this.cells.length && j !== 0) {
                const neighborBottomLeft = this.cells[i + 1][j - 1];
                if (neighborBottomLeft.visible) {
                    ++neighborsAlive;
                }
            }

            if (cell.visible === true) {
                if (neighborsAlive === 2 || neighborsAlive === 3) {
                    continue;
                }

                cell.visible = false;
            } else if (neighborsAlive === 3) {
                cell.visible = true;
            }
        }
    }
};

window.onload = function() {
    const canvas = document.getElementById('container');
    const game = new Agol(canvas);
    paper.setup(canvas);

    game.Reset();
    paper.view.onFrame = function(e) {
        //if (e.count % 30 === 0) {
            game.Step(e);
        //}
    };

    paper.view.draw();
};