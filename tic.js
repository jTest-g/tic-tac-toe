let board = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];


let currentPlayer;
let players = ['X', 'O'];
let avail = [];
let totalMoves = 9;

function setup (){
	createCanvas(600,500);
	currentPlayer = floor(random(players.length));
	for(let i = 0; i < 3; ++i){
		for(let j = 0; j<3; ++j){
			avail.push([i,j]);
		}
	}
	print(avail);
}



function draw() {
	background(220);
	frameRate(2);
	let w = width/3;
	let h = height/3;

	//------------------------------------------- Ceating the board
	createBoard(w,h);

	for(let i = 0; i < 3; ++i){
		for(let j = 0; j<3; ++j){
			let x = w*i + w/2;
			let y = h*j + h/2;
			let spot = board[i][j]
			//------------------------------------ using text for Xs and Os
			// textSize(45);
			// text(spot,x,y);

			//------------------------------------- drawing Xs and Os
			strokeWeight(8)
			if (spot==players[0]){
				let xr = w/4;
				line(x-xr, y-xr, x+xr, y+xr);
				line(x+xr, y-xr, x-xr, y+xr);
			}	else if (spot == players[1]) {
				noFill();
				ellipse(x,y,w/2);
			}
		}
	}

	let result = checkWinner();
	if (result != null) {
		createP(result + ' wins').style('color', '#000');
		noLoop();
	} else {
		nexTurn();
	}
}




function nexTurn() {
	let index = floor(random(avail.length));
	let spot = avail.splice(index,1)[0];

	let i = spot[0];
	let j = spot[1];

	board[i][j] = players[currentPlayer];
	currentPlayer = (currentPlayer + 1)%players.length;
}


// function isValid(i,j) {
// 	let ind = i + j*3;
// 	if(avail[ind] == 1 && totalMoves > 0){
// 		avail[ind] = 0;
// 		totalMoves = totalMoves - 1;
// 		return true
// 	}
// 	return false
// }


// function mouseClicked() {
// 	i = floor((3*mouseX)/width)
// 	j = floor((3*mouseY)/height)
// 	let val = isValid(i,j);
// 	if (val == true){
// 		board[i][j] = players[currentPlayer];
// 		currentPlayer = (currentPlayer+1)%players.length;
// 	}
// 	else{
// 		createP('invalid').style('color', '#000');
// 	}
// }




function createBoard(w,h) {
	strokeWeight(4);
	line(w, 0, w, height);
	line(w*2, 0, w*2, height);
	line(0, h, width, h);
	line(0, h*2, width, h*2);
}



function checkWinner() {
	let winner = null;

	for(let i = 0; i<3; ++i) {
		if (checkGame(board[i][0], board[i][1], board[i][2])){
			winner = board[i][0];
		}
	}
	for(let i = 0; i<3; ++i) {
		if (checkGame(board[0][i], board[1][i], board[2][i])){
			winner = board[0][i];
		}
	}

	if (checkGame(board[0][0], board[1][1], board[2][2])) {
		winner = board[0][0];
	}
	if (checkGame(board[0][2], board[1][1], board[2][0])) {
		winner = board[0][2];
	}

	if (avail.length == 0 && winner == null){
		return 'tie! no one';
	} else if (winner != null){
		return winner;
	}

}

function checkGame(a,b,c) {
	if (a==b && b==c && a!= ''){
		return true;
	}
	return false;
}