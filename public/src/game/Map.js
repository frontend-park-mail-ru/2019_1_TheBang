import Cell from 'src/game/Cell';
import SimpleCell from './SimpleCell/SimpleCell';

class Map {
    constructor(ctx) {
        const cellWidth = 25;
        const cellHeight = 25;

        this.ctx = ctx;
        this.capacity = 5;
        this.cells = [];
        this.createMap(cellWidth, cellHeight);
        this.initCellsPositions();
    }

    createMap(cellWidth, cellHeight) {
        // создание карты (определение типа клеток)

        const map = [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0]
        ]

        map.forEach(row => {
            let cellRow = [];
            row.forEach(cell => {
                switch (cell) {
                    case 0:
                        cellRow.push(new SimpleCell(this.ctx, cellWidth, cellHeight));
                        break;
                }
            });

            this.cells.push(cellRow);
        })
    }

    initCellsPositions() {
        // определение позиций клеток в зависимости от ширины спрайта
        let dy = 0;
        this.cells.forEach(row => {
            let dx = 0;
            row.forEach(cell => {
                cell.pos.x += dx;
                cell.pos.y += dy;
                dx += cell.sprite.width;
            })
            dy += row[0].sprite.height;
        })
    }

    render() {
        this.cells.forEach(row => {
            row.forEach(cell => {
                cell.render();
            });
        });
    }
}

export default Map;