import BackendResource from 'src/network/BackendResource';
import GamePage from 'src/views/GamePage';
import GameEndPage from 'src/views/GameEndPage';
import Store from 'src/Store';
import onPageLoad from 'src/app';

//TODO тут дохуя рефакторинга

let MAZE = {};

let ROWS = 0;
let COLS = 0;

// const EMPTY = 0;
const WALL = 1;
const DIAMOND = 2;

const PLAYER = 20;
const EXIT = 3;
const EXIT_READY = 6;
// const DIAMOND = 2;
// let DIAMOND_COUNT = 0;


class Game {
	/**
     *
     * @param roomID - id комнаты - индикатор онлайн режима
     */

	static start(roomID) {
		const touchPad = screen.width < 600;

		if (roomID) {
			const url = [BackendResource.GAME_WSS, 'room/', roomID].join('');
			const connection = new WebSocket(url);

			const user = Store.getUser();
			const identificator = user.nickname;
			// let lastData = {};

			connection.onopen = () => {
				const change = () => {
					console.log('out game');
					// document.removeEventListener('keydown', keyHandler);
					window.removeEventListener('hashchange', change);
					connection.close()
				};

				window.addEventListener('hashchange', change);
			};

			connection.onmessage = (e) => {
				const data = JSON.parse(e.data);
				console.log(data);
				if (data.type === 'start_game') {
					console.log('game start bitch');

					const game = new GamePage();
					const element = game.getTargetRender();
					element.innerHTML = game.render();

					let direction = '';

					const DOWN = 40;
					const UP = 38;
					const LEFT = 37;
					const RIGHT = 39;

					if (touchPad) {

						const touchUp = document.querySelector('.controlls__up');
						touchUp.dataset.direction = UP;
						const touchLeft = document.querySelector('.controlls__left');
						touchLeft.dataset.direction = LEFT;
						const touchRight = document.querySelector('.controlls__right');
						touchRight.dataset.direction = RIGHT;
						const touchDown = document.querySelector('.controlls__down');
						touchDown.dataset.direction = DOWN;

						const touchMove = (event) => {
							switch (Number(event.target.dataset.direction)) {
							case RIGHT:
								console.log('right');
								direction = 'down';
								break;
							case LEFT:
								console.log('left');
								direction = 'up';
								break;
							case UP:
								console.log('up');
								direction = 'left';
								break;
							case DOWN:
								console.log('down');
								direction = 'right';
								break;
							}

							const action = {
								type: 'action',
								data: {
									time: 'Date.now()',
									player: identificator,
									move: direction
								}
							};
							console.log('send action', event.keyCode);
							connection.send(JSON.stringify(action))
						};

						touchUp.addEventListener('touchend', touchMove);
						touchLeft.addEventListener('touchend', touchMove);
						touchRight.addEventListener('touchend', touchMove);
						touchDown.addEventListener('touchend', touchMove);

					} else {

						const keyHandler = (event) => {
							switch (event.keyCode) {
							case RIGHT:
								console.log('right');
								direction = 'down';
								break;
							case LEFT:
								console.log('left');
								direction = 'up';
								break;
							case UP:
								console.log('up');
								direction = 'left';
								break;
							case DOWN:
								console.log('down');
								direction = 'right';
								break;
							}

							const action = {
								type: 'action',
								data: {
									time: 'Date.now()',
									player: identificator,
									move: direction
								}
							};
							console.log('send action', event.keyCode);
							connection.send(JSON.stringify(action))
						};

						document.addEventListener('keydown', keyHandler);
						Game.unlockKeyBoard(keyHandler);
					}

					Game.onlineInit(data);
				}

				if (data.type === 'game_snap_shot') {

					Game.onlinePushState(data, connection);

					Object.values(data.data.players_positions).forEach((item) => {
						MAZE[item.x][item.y] = EMPTY;
					});
					//
					// data.data.gems_positions.forEach((item) => {
					// 	console.log('CLEAR GEMS', item.x, item.y);
					// 	MAZE[item.x][item.y] = EMPTY;
					// 	// console.log('player on ', item.x, item.y)
					// });
					console.log(MAZE);
					// lastData = data;
				}

				if (data.type === 'finish_game') {
					console.log(data.data.winner, data.data.points);
          
					// 				console.log('connection onclose');

					// 				const playersScore = lastData.data.players_score;
					// 				const gemsMax = lastData.data.max_gems_count;

					// 				const popup = document.createElement('div');
					// 				document.getElementById('root').append(popup);
					// 				if (playersScore[identificator] === gemsMax || playersScore[identificator] === Math.max.apply(null, Object.values(playersScore))) {
					// 					onPageLoad(null, GameEndPage, popup, true, playersScore[identificator], true);
					// 					Store.updateScore(playersScore[identificator]);
					// 					return
					// 				}
					// 				onPageLoad(null, GameEndPage, popup, false, 0, true);
					// 			};

					// 			let direction = '';

					// 			const DOWN = 40;
					// 			const UP = 38;
					// 			const LEFT = 37;
					// 			const RIGHT = 39;

					// 			if (touchPad) {

					// 				const touchUp = document.querySelector('.controlls__up');
					// 				touchUp.dataset.direction = UP;
					// 				const touchLeft = document.querySelector('.controlls__left');
					// 				touchLeft.dataset.direction = LEFT;
					// 				const touchRight = document.querySelector('.controlls__right');
					// 				touchRight.dataset.direction = RIGHT;
					// 				const touchDown = document.querySelector('.controlls__down');
					// 				touchDown.dataset.direction = DOWN;

					// 				const touchMove = (event) => {
					// 					switch (Number(event.target.dataset.direction)) {
					// 					case RIGHT:
					// 						console.log('right');
					// 						direction = 'down';
					// 						break;
					// 					case LEFT:
					// 						console.log('left');
					// 						direction = 'up';
					// 						break;
					// 					case UP:
					// 						console.log('up');
					// 						direction = 'left';
					// 						break;
					// 					case DOWN:
					// 						console.log('down');
					// 						direction = 'right';
					// 						break;
					// 					}

					const popup = document.createElement('div');
					document.getElementById('root').append(popup);

					if (data.data.winner === identificator) {
						setTimeout(onPageLoad, 1000, null, GameEndPage, popup, true, data.data.points, true);
						Store.updateScore(data.data.points);
						return
					}
					setTimeout(onPageLoad, 1000, null, GameEndPage, popup, false, 0, true);
				}

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

		const createWallBlock = () => {
			const block = document.createElement('div');
			block.classList.add('frame__block', 'frame__block-wall');
			block.classList.add(ROTATE_CLASSES[Math.floor(Math.random() * ROTATE_CLASSES.length)]);

			return block;
		};

		const createBoard = () => {
			const board = document.querySelector('.frame__board');

			for (let col = -1; col < COLS + 1; col++) {
				const block = createWallBlock();
				block.id = ['id-', col, '-', -1].join('');
				board.appendChild(block);
			}

			for (let row = 0; row < ROWS; row++) {
				let block = createWallBlock();
				block.id = ['id-', -1, '-', row].join('');
				board.appendChild(block);

				for (let col = 0; col < COLS; col++) {
					const block = document.createElement('div');
					block.id = ['id-', col, '-', row].join('');

					block.classList.add('frame__block');

					switch (maze[row][col]) {
					case WALL:
						block.classList.add(ROTATE_CLASSES[Math.floor(Math.random() * ROTATE_CLASSES.length)]);
						break;
					case DIAMOND:
						block.classList.add('frame__block-diamond');
						break;
					}

					block.classList.add('frame__block-empty');

					board.appendChild(block);
				}

				block = createWallBlock();
				block.id = ['id-', COLS, '-', row].join('');
				board.appendChild(block);
			}

			for (let col = -1; col < COLS + 1; col++) {
				const block = createWallBlock();
				block.id = ['id-', col, '-', ROWS].join('');
				board.appendChild(block);
			}
		};

		const removeControllsListener = () => {
			if (touchPad) {
				document.querySelector('.controlls__up').removeEventListener('touchend', touchMove);
				document.querySelector('.controlls__left').removeEventListener('touchend', touchMove);
				document.querySelector('.controlls__right').removeEventListener('touchend', touchMove);
				document.querySelector('.controlls__down').removeEventListener('touchend', touchMove);
			} else {
				document.removeEventListener('keydown', keyHandler);
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
					//ужастный фикс, понимаю :(
					classes.pop();

					let itemClass = '';
					switch (maze[row][col]) {
					case PLAYER:
						itemClass = 'frame__block-player'; break;
					case WALL:
						itemClass = 'frame__block-wall'; break;
					case EXIT:
						itemClass = 'frame__block-exit'; break;
					case EXIT_READY:
						itemClass = 'frame__block-exit frame__block-show'; break;
					case DIAMOND:
						itemClass = 'frame__block-diamond'; break;
					default:
						itemClass = 'frame__block-empty'
					}

					classes.push(itemClass);
					// const id = ['#id-', col, '-', row].join('');

					item.className = classes.join(' ') ;  //'block ' + itemClass
				}
			}
			const id = ['#id-', player[1], '-', player[0]].join('');
			if (!(bag === DIAMOND_COUNT && player[1] === EXIT_COL && player[0] === EXIT_ROW)) {
				document.querySelector(id).className = 'frame__block frame__block-player'
			}
			else {
				document.querySelector(id).className = 'frame__block frame__block-player frame__block-bye';
				document.querySelector('.info').textContent = 'bye!';

				stopTimer();
				removeControllsListener();

				const popup = document.createElement('div');
				document.getElementById('root').append(popup);
				setTimeout(onPageLoad, 1000, null, GameEndPage, popup, true, null, false);
				return
			}

			document.querySelector('.frame__diamond-count-js').textContent = bag + '/' + DIAMOND_COUNT;
			document.querySelector('.frame__block-player').scrollIntoView({block:'nearest'});
		};

		const homeLinks = [].slice.call(document.getElementsByClassName('link-home'));
		console.log(homeLinks);
		const homeEvent = (e) => {
			stopTimer();
			removeControllsListener();

			if (!document.querySelector('.popup')) {
				e.preventDefault();
				const popup = document.createElement('div');
				document.getElementById('root').append(popup);
				onPageLoad(null, GameEndPage, popup, false, null, false);
			}
			homeLinks.forEach((link) => {link.removeEventListener('click', homeEvent)});
		};

		homeLinks.forEach((link) => {link.addEventListener('click', homeEvent)});

		generateDiamond();
		createBoard();
		renderMaze();

		let stopTime = 0;
		let startTime = 30;
		const startTimer = () => {
			const timerElement = document.querySelector('.frame__timer');
			const timer = () => {
				const minutes = parseInt(startTime / 60);
				const seconds = startTime - 60 * minutes;
				console.log(minutes + ':' + seconds);
				timerElement.innerText = minutes + ':' + seconds;
				startTime--;
			};

			stopTime = setInterval(() => {
				timer();
				if (!document.querySelector('.frame')) {
					stopTimer();
				}

				if (startTime < 0) {
					stopTimer();
					document.removeEventListener('keydown', keyHandler);
					const popup = document.createElement('div');
					document.getElementById('root').append(popup);
					onPageLoad(null, GameEndPage, popup, false, null, false);
				}
			}, 1000);
		};

		const stopTimer = () => {
			clearInterval(stopTime);
		};

		startTimer();

		let direction = 0;

		const keyHandler = (event) => {
			switch (event.keyCode) {
			case DOWN:
				direction = DOWN;
				break;
			case UP:
				direction = UP;
				break;
			case LEFT:
				direction = LEFT;
				break;
			case RIGHT:
				direction = RIGHT;
				break;
			}

			if (direction !== 0) {
				changePlayerPos(direction)
			}
		};

		const touchMove = (event) => {
			// console.log(Number(event.target.dataset.direction));
			switch (Number(event.target.dataset.direction)) {
			case RIGHT:
				direction = RIGHT;
				break;
			case LEFT:
				direction = LEFT;
				break;
			case UP:
				direction = UP;
				break;
			case DOWN:
				direction = DOWN;
				break;
			}

			if (direction !== 0) {
				changePlayerPos(direction)
			}
		};

		if (touchPad) {

			const touchUp = document.querySelector('.controlls__up');
			touchUp.dataset.direction = UP;
			const touchLeft = document.querySelector('.controlls__left');
			touchLeft.dataset.direction = LEFT;
			const touchRight = document.querySelector('.controlls__right');
			touchRight.dataset.direction = RIGHT;
			const touchDown = document.querySelector('.controlls__down');
			touchDown.dataset.direction = DOWN;

			touchUp.addEventListener('touchend', touchMove);
			touchLeft.addEventListener('touchend', touchMove);
			touchRight.addEventListener('touchend', touchMove);
			touchDown.addEventListener('touchend', touchMove);

		} else {
			document.addEventListener('keydown', keyHandler);
			Game.unlockKeyBoard(keyHandler);
		}
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

				renderMaze();
				document.querySelector('.frame__block-player').scrollIntoView({block:'nearest'});
			} else {
				const id = ['#id-', x, '-', y].join('');
				document.querySelector(id).scrollIntoView({block:'nearest'});
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

	static onlineInit(data) {

		const gameData = data.data.game_map;
		// const gemsPosition = data.data.game_map.gems_positions;

		MAZE = gameData.map;

		ROWS = gameData.height;
		COLS = gameData.width;

		// DIAMOND_COUNT = gameData.gems;

		const ROTATE_CLASSES = [
			'rotate__fast-clockwise',
			'rotate__middle-no-clockwise',
			'rotate__slow-clockwise',
		];

		const homeLinks = [].slice.call(document.getElementsByClassName('link-home'));
		console.log(homeLinks);
		const homeEvent = (e) => {
			// removeControllsListener();

			if (!document.querySelector('.popup')) {
				e.preventDefault();
				const popup = document.createElement('div');
				document.getElementById('root').append(popup);
				onPageLoad(null, GameEndPage, popup, false, 0, true);
			}
			homeLinks.forEach((link) => {link.removeEventListener('click', homeEvent)});
		};

		homeLinks.forEach((link) => {link.addEventListener('click', homeEvent)});

		const createWallBlock = () => {
			const block = document.createElement('div');
			block.classList.add('frame__block', 'frame__block-wall');
			block.classList.add(ROTATE_CLASSES[Math.floor(Math.random() * ROTATE_CLASSES.length)]);

			return block;
		};

		const createBoard = () => {
			document.querySelector('.frame__timer').remove();

			const board = document.querySelector('.frame__board');

			for (let col = -1; col < COLS + 1; col++) {
				const block = createWallBlock();
				block.id = ['id-', col, '-', -1].join('');
				board.appendChild(block);
			}

			for (let row = 0; row < ROWS; row++) {
				let block = createWallBlock();
				block.id = ['id-', -1, '-', row].join('');
				board.appendChild(block);

				for (let col = 0; col < COLS; col++) {
					const block = document.createElement('div');
					block.id = ['id-', col, '-', row].join('');

					block.classList.add('frame__block');

					switch (MAZE[row][col]) {
					case WALL:
						block.classList.add(ROTATE_CLASSES[Math.floor(Math.random() * ROTATE_CLASSES.length)]);
						break;
					case DIAMOND || undefined:
						block.classList.add('frame__block-diamond');
						break;
					}

					block.classList.add('frame__block-empty');

					board.appendChild(block);
				}

				block = createWallBlock();
				block.id = ['id-', COLS, '-', row].join('');
				board.appendChild(block);
			}

			for (let col = -1; col < COLS + 1; col++) {
				const block = createWallBlock();
				block.id = ['id-', col, '-', ROWS].join('');
				board.appendChild(block);
			}
		};

		createBoard();
	}

	static onlinePushState(data) {
		const user = Store.getUser();
		const identificator = user.nickname;

		console.log(data);

		// const gems = data.data.gems_count;
		const teleport = data.data.is_teleport;
		const gemsMax = data.data.max_gems_count;
		const playersPosition = data.data.players_positions; // nickname: x, y
		const playersScore = data.data.players_score; // nickname: score
		const gemsPositions = data.data.gems_positions;

		const teleportCOL = data.data.teleport.y;
		const teleportROW = data.data.teleport.x;

		const playerCOL = playersPosition[identificator].y;
		const playerROW = playersPosition[identificator].x;
		console.log('you here', playerROW, playerCOL);

		const renderMaze = () => {
			if (!teleport) {
				document.querySelector('.info').textContent = 'collect all the gems'
			} else {
				MAZE[teleportROW][teleportCOL] = EXIT_READY;
				document.querySelector('.info').textContent = 'go to the teleport'
			}

			Object.values(playersPosition).forEach((item) => {
				MAZE[item.x][item.y] = PLAYER;
				console.log('player on ', item.x, item.y)
			});

			console.log(gemsPositions);
			gemsPositions.forEach((item) => {
				// console.log('CLEAR GEMS');
				console.log('CREATE GEMS', item.x, item.y);
				MAZE[item.x][item.y] = DIAMOND;
				// console.log('player on ', item.x, item.y)
			});



			for (let row = 0; row < ROWS; row++) {
				for (let col = 0; col < COLS; col++) {
					const id = ['#id-', col, '-', row].join('');
					const item = document.querySelector(id);

					const classes = item.classList.value.split(' ');
					classes.pop();
					//TODO fix для удаления после сбора
					let index = classes.indexOf('frame__block-diamond');
					if (index > -1) {
						classes.splice(index, 1);
					}

					index = classes.indexOf('frame__block-player');
					if (index > -1) {
						classes.splice(index, 1);
					}
					// classes.pop();
					// classes.pop('frame__block-diamond');
					// classes.pop('frame__block-player');

					let itemClass = '';
					switch (MAZE[row][col]) {
					case PLAYER:
						itemClass = 'frame__block-player'; break;
					case WALL:
						itemClass = 'frame__block-wall'; break;
					case EXIT:
						itemClass = 'frame__block-exit'; break;
					case EXIT_READY:
						itemClass = 'frame__block-exit frame__block-show'; break;
					case DIAMOND:
						itemClass = 'frame__block-diamond'; break;
					default:
						itemClass = 'frame__block-empty'
					}

					classes.push(itemClass);
					// const id = ['#id-', col, '-', row].join('');

					item.className = classes.join(' ') ;  //'block ' + itemClass
				}
			}
			const id = ['#id-', playerCOL, '-', playerROW].join('');
			if (!(playersScore[identificator] === gemsMax && playerCOL === teleportCOL && playerROW === teleportROW)) {
				document.querySelector(id).className = 'frame__block frame__block-player'
			}
			else {
				document.querySelector(id).className = 'frame__block frame__block-player frame__block-bye';
				document.querySelector('.info').textContent = 'bye!';
			}


			document.querySelector('.frame__diamond-count-js').textContent = playersScore[identificator] + '/' + gemsMax;
			document.querySelector(id).scrollIntoView({block:'nearest'});
		};


		renderMaze();

	}

}

export default Game;