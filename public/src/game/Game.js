import BackendResource from 'src/network/BackendResource';

class Game {
	/**
     *
     * @param roomID - id комнаты - индикатор онлайн режима
     */
	static start(roomID) {

		if (roomID) {
			const url = [BackendResource.GAME_WSS, 'room/', roomID].join('');
			const connection = new WebSocket(url);

			connection.onmessage = (e) => {
				console.log(JSON.parse(e.data))
			};

			return
		}

		const maze = [
			[0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
			[0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0],
			[0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0],
			[0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
			[1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
			[0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0],
			[0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
			[0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1],
			[0, 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 3],
		];

		let player = [0, 0];
		let bag = 0;

		const ROWS = 12;
		const COLS = 12;

		const EXIT_COL = 11;
		const EXIT_ROW = 11;

		const EMPTY = 0;
		const WALL = 1;
		const PLAYER = 2;
		const EXIT = 3;
		const EXIT_READY = 6;
		const DIAMOND = 4;
		const DIAMOND_COUNT = 12;

		const DOWN = 40;
		const UP = 38;
		const LEFT = 37;
		const RIGHT = 39;

		const ROTATE_CLASSES = [
			'rotate__fast-clockwise',
			'rotate__middle-no-clockwise',
			'rotate__slow-clockwise',
		];

		const DIAMOND_CLASSES = [
			'diamond__craft',
			'diamond__sun',
			'diamond__blackhole',
		];

		const generateDiamond = () => {
			let count = 0;

			do {
				const row = Math.floor(Math.random() * ROWS);
				const col = Math.floor(Math.random() * COLS);
				if (maze[row][col] === EMPTY &&
                    row !== 0 && col !== 0 &&
                    row !== ROWS - 1 && col !== COLS - 1) {

					maze[row][col] = DIAMOND;
					count++

				}

			} while (count !== DIAMOND_COUNT)
		};

		const createBoard = () => {
			for (let row = 0; row < ROWS; row++) {
				for (let col = 0; col < COLS; col++) {
					const block = document.createElement('div');
					block.id = ['id-', col, '-', row].join('');

					block.classList.add('block');

					switch (maze[row][col]) {
					case WALL:
						block.classList.add(ROTATE_CLASSES[Math.floor(Math.random() * ROTATE_CLASSES.length)]);
						break;
					case DIAMOND:
						block.classList.add(DIAMOND_CLASSES[Math.floor(Math.random() * DIAMOND_CLASSES.length)]);
						break;
					}

					block.classList.add('empty');

					document.querySelector('.board').appendChild(block);
				}
			}
		};

		const renderMaze = () => {
			if (bag < DIAMOND_COUNT) {
				document.querySelector('.info').textContent = 'collect all the gems'
			} else {
				maze[ROWS - 1][COLS - 1] = EXIT_READY;
				document.querySelector('.info').textContent = 'go to the teleport'
			}

			for (let row = 0; row < ROWS; row++) {
				for (let col = 0; col < COLS; col++) {
					const id = ['#id-', col, '-', row].join('');
					const item = document.querySelector(id);

					const classes = item.classList.value.split(' ');
					classes.pop();

					let itemClass = '';
					switch (maze[row][col]) {
					case PLAYER:
						itemClass = 'player'; break;
					case WALL:
						itemClass = 'wall'; break;
					case EXIT:
						itemClass = 'exit'; break;
					case EXIT_READY:
						itemClass = 'exit show'; break;
					case DIAMOND:
						itemClass = 'diamond'; break;
					default:
						itemClass = 'empty'
					}

					classes.push(itemClass);
					// const id = ['#id-', col, '-', row].join('');

					item.className = classes.join(' ') ;  //'block ' + itemClass
				}
			}
			const id = ['#id-', player[1], '-', player[0]].join('');
			if (!(bag === DIAMOND_COUNT && player[1] === EXIT_COL && player[0] === EXIT_ROW)) {
				document.querySelector(id).className = 'block player'
			}
			else {
				document.querySelector(id).className = 'block player bye';
				document.querySelector('.info').textContent = 'bye!';
			}


			document.querySelector('.diamond-count').textContent = bag + '/' + DIAMOND_COUNT
		};

		generateDiamond();
		createBoard();
		renderMaze();
		let direction = 0;

		const keyHandler = (event) => {
			switch (event.keyCode) {
			case DOWN:
				direction = DOWN;  break;
			case UP:
				direction = UP; break;
			case LEFT:
				direction = LEFT; break;
			case RIGHT:
				direction = RIGHT; break;
			}

			if (direction !== 0) {
				changePlayerPos(direction)
			}
		};

		document.addEventListener('keydown', keyHandler);
		Game.unlockKeyBoard(keyHandler);

		const changePlayerPos = (direction) => {
			let [dy, dx] = [0, 0];
			switch (direction) {
			case UP:
				dy = -1; break;
			case RIGHT:
				dx = 1; break;
			case LEFT:
				dx = -1; break;
			case DOWN:
				dy = 1; break;
			default:
				return [dy, dx]
			}

			const x = player[1] + dx;
			const y = player[0] + dy;

			if (x >= 0 && x < COLS && y >= 0 && y < ROWS &&
                maze[y][x] !== WALL) {
				player = [y, x];

				if (maze[y][x] === DIAMOND) {
					maze[y][x] = EMPTY;
					bag++
				}

				renderMaze()
			}

		}
	}

	static unlockKeyBoard(keyLock) {
		const change = () => {
			window.removeEventListener('hashchange', change);
			document.removeEventListener('keydown', keyLock);
		};

		window.addEventListener('hashchange', change)
	}
}

export default Game;