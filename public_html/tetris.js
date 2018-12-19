//	0 1 2 3 4 5 6 7    12
//
//	0  1 O O O O O O 1	I = 4
//	1  1 O · O O · O 1	J = 2
//	2  1 O # # O O O 1
//	3  * O O # # O O 1	pos[0] = 4 -> 3
//	4  1 O X O O · O 1	pos[1] = 2 -> 0
//	5  1 O O O O O O 1
//	6  1 O O O O O O 1	forma 4 x 4
//	7  1 O O O O O O 1
// 22

var game = { 
	board: null, //	IMPORTANTE! ARRAY CON LETRAS: E(MPTY), W(ALL) Y LAS OTRAS PARA LAS PIEZAS
	lengthB: [22, 12],
	nextPiece: null,
	activePiece: null,
	points: null,
	countP: null,
			//// I, J, L, O, S, T, Z
	init: function() {
		this.board = new Array (this.lengthB[0]);
		for (var i=0 ; i < this.lengthB[0] ; i++) {
			this.board[i] = new Array (this.lengthB[1]);
			this.board[i][0]="w";
			for (var j=1 ; j < this.lengthB[1] ; j++) {
				this.board[i][j]="e";
			}
			this.board[i][this.lengthB[1]-1]="w";
		}
		for (var j=1 ; j < this.lengthB[1] ; j++) {
			this.board[this.lengthB[0]-1][j]="w";
		}
		this.points = 0;
		this.countP = new Array ();
			this.countP["i"] = 0;
			this.countP["j"] = 0;
			this.countP["l"] = 0;
			this.countP["o"] = 0;
			this.countP["s"] = 0;
			this.countP["t"] = 0;
			this.countP["z"] = 0;
		this.nextPiece = this.newRandomPiece();
	},
	show: function() {
		var out = "";
		var copiaBoard = this.board;
		
//		for (var i=0 ; i < this.activePiece.form.length ; i++) {
//			for (var j=0 ; j < this.activePiece.form[i].length ; j++) {
//				if (this.activePiece.form[i][j]==1) {
//					var y = this.activePiece.pos[0]-i;
//					var x = this.activePiece.pos[1]+j;
//					copiaBoard[y][x] = this.activePiece.name;
//				}
//			}
//		}
		
		for (var i=0 ; i < copiaBoard.length ; i++) {
			for (var j=0 ; j < copiaBoard[i].length ; j++) {
				var y = -i+this.activePiece.pos[0];
				var x = +j-this.activePiece.pos[1];
				
				if ( ( 0 <= y && y < this.activePiece.form.length ) && 
						( 0 <= x && x < this.activePiece.form[y].length ) ) {
					var n = [3,2,1,0]; // 
					if (this.activePiece.form[n[y]][x]===1) {
						out+="<span class=\""+ this.activePiece.name +"\">&#9724</span>";
					} else {
						out+="<span class=\""+ copiaBoard[i][j] +"\">&#9724</span>";
					}
				} else {
					out+="<span class=\""+ copiaBoard[i][j] +"\">&#9724</span>";
				}
			}
			out+="<br>";
		}
		document.getElementById("game").innerHTML = out;
	},
	clearLines: function() {
		var endClear = false;
		for (var i = this.board.length-2  ; ( i >= 0 ) && !endClear ; i--) {
			if ( this.board[i] === ["w", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "w"] ) {
				endClear=true;
			} else {
				
				var empty=false;
				
				for (var j = 0 ; (j < this.board[i].length) && !empty ; j++) {
					if ( this.board[i][j] === "e" ) {
						var empty=true;
					}
				}
				
				if (!empty) {
					this.clearLine(i);
					i++;
				}
			}
		}
	},
	clearLine: function(i) {
		for ( i ; i > 0 ; i--) {
			this.board[i]=this.board[i-1];
		}
		this.board[0] === ["w", "e", "e", "e", "e", "e", "e", "e", "e", "e", "e", "w"];
	},
	newPiece: function() {
			var tempPiece = this.nextPiece;
			this.nextPiece = this.newRandomPiece();
			this.countP[tempPiece.name] += 1;
			return tempPiece;
	},
	newRandomPiece: function() {
		var i = parseInt(Math.random() * 7);
		var name = null;
		var forma = null;
		switch (i) {
			case 0:
				name = "i";
				forma = [[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0]];
				break;
			case 1:
				name = "j";
				forma = [[0, 0, 1, 0],[0, 0, 1, 0],[0, 1, 1, 0],[0, 0, 0, 0]];
				break;
			case 2:
				name = "l";
				forma = [[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 1, 0],[0, 0, 0, 0]];
				break;
			case 3:
				name = "o";
				forma = [[0, 0, 0, 0],[0, 1, 1, 0],[0, 1, 1, 0],[0, 0, 0, 0]];
				break;
			case 4:
				name = "z";
				forma = [[0, 0, 0, 0],[1, 1, 0, 0],[0, 1, 1, 0],[0, 0, 0, 0]];
				break;
			case 5:
				name = "t";
				forma = [[0, 0, 0, 0],[1, 1, 1, 0],[0, 1, 0, 0],[0, 0, 0, 0]];
				break;
			case 6:
				name = "s";
				forma = [[0, 0, 0, 0],[0, 1, 1, 0],[1, 1, 0, 0],[0, 0, 0, 0]];
				break;
			default: alert("Error in new piece");
		}
		return new piece(name, forma, 3, 4);
	},
	movePiece: function(x, y) {
		game.activePiece.move(x, y);
		if (game.collision()) {
			game.activePiece.move(-x, -y);
			if (y > 0) { // si la colisión se hizo cunado la pieza bajaba
				game.stamp();
				game.activePiece=game.newPiece();
			}
		}
	},
	turnPiece: function() {
		game.activePiece.turn();
		if (game.collision()) {
			game.activePiece.turn();
			game.activePiece.turn();
			game.activePiece.turn();
		}
	},
	collision: function() {
		var shock = false;
		for (var i=0 ; ( i < this.activePiece.form.length ) && shock===false ; i++) {
			for (var j=0 ; j < this.activePiece.form[i].length ; j++) {
				if (this.activePiece.form[i][j]===1) {
					var n = [3,2,1,0]; // 
					var y = this.activePiece.pos[0]-n[i];
					var x = this.activePiece.pos[1]+j;
					if (game.board[y][x]!=="e") {
						shock=true;
					}
				}
			}
		}
		return shock;
	},
	stamp: function() {
		for (var i=0 ; i < this.activePiece.form.length  ; i++) {
			for (var j=0 ; j < this.activePiece.form[i].length ; j++) {
				if (this.activePiece.form[i][j]===1) {
					var n = [3,2,1,0]; // 
					
					var y = this.activePiece.pos[0]-n[i];
					var x = this.activePiece.pos[1]+j;
					game.board[y][x]=game.activePiece.name;
				}
			}
		}
	},
	motion: function() { // game
		document.onkeydown = keyPressed;
		game.movePiece(0, +1);
		game.clearLines();
		game.show();
		game.log();
	},
	playGame: function() {
		this.endGame(); // Evita que pueda haber multibles setIntervals activos
		play = setInterval(this.motion, 200);
	},
	playGameS: function() {
		this.endGame(); // Evita que pueda haber multibles setIntervals activos
		play = setInterval(this.motion, 750);
	},
	endGame: function() {
		clearInterval(play);
	},
	log: function() {
		var out = "";
		out+="<br>Poins: "+this.points;
		
		out+="<br><br>";
		out+=this.nextPiece.log();	
		
		for (var key in this.countP) {
			out+="<br>Count pieces: "+ key + " - " +this.countP[key];
		}
		
		document.getElementById("logGame").innerHTML = out;
	}
};

var piece = function(name, form, posX, posY)
	{	this.name = name;
		this.form = form;
		this.pos = [posX, posY];
		
		this.move = function(x, y) { //solo pueden ser -1 o 
				this.pos[1] = parseInt(this.pos[1])+x;
				this.pos[0] = parseInt(this.pos[0])+y;
		};
		this.turn = function() {
			var tempForm = [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				];
			
			for (var i=0; i < this.form.length ; i++) {
				for (var j = 0; j < this.form[i].length ; j++) {
					tempForm[j][ this.form[i].length-i-1 ] = this.form[i][j];
				}
			}
			this.form=tempForm;
		};
		this.log = function() {
			var out="";
			out = out+"Name: "+this.name;
			out = out+"<br>Form: ";
			for (var i=0; i < this.form.length ; i++) {
				out = out+"<br>";
				for (var j = 0; j < this.form[i].length; j++) {
					if (this.form[i][j]==1) {
						out = out+"<span class="+ this.name +">&#9724;</span>";

					} else {
						out = out+"&#9724;";
					}
				}
			}
			out = out+"<br>PosisciónX: "+this.pos[0];
			out = out+"<br>PosisciónY: "+this.pos[1];
			
			return out;
		};
		this.printLog = function() {
			var out = this.log();
			document.getElementById("logPiece").innerHTML = out;
		};
};

var gameController = {
	up: function() {
		game.turnPiece();
		game.show();
		game.log();
	},
	down: function() {
		game.movePiece(0, 1);
		game.show();
		game.log();
	},
	right: function() {
		game.movePiece(1, 0);
		game.show();
		game.log();
	},
	left: function() {
		game.movePiece(-1, 0);
		game.show();
		game.log();
	}
};

function keyPressed(e) {
	if (e.key == "ArrowUp") {
		gameController.up();	// arriba
	} else if (e.key == "ArrowRight") {
		gameController.right();	// derecha
	} else if (e.key == "ArrowDown") {
		gameController.down();	// izquierda
	} else if (e.key == "ArrowLeft") {
		gameController.left();	// abajo
	}
}


play = null;
game.activePiece = null;
function initGame() {
	game.init();
	game.activePiece = game.newRandomPiece();
	game.countP[game.activePiece.name] += 1;
}


function ShowGame() {
	initGame();
	log();
}
function PlayGame() {
	game.playGame();
}
function RestartGame() {
	game.playGameS();
}
function log() {
	game.show();
	game.log();
//	game.activePiece.printLog();
}
function myFunctionGirarP() {
	game.turnPiece();
	log();
}
function myFunctionSubirP() {
	game.movePiece(0, -1);
	log();
}
function myFunctionBajarP() {
	game.movePiece(0, 1);
	log();
}
function myFunctionMoverIP() {
	game.movePiece(-1, 0);
	log();
}
function myFunctionMoverDP() {
	game.movePiece(1, 0);
	log();
}
function myFunctionNewPieceP() {
	game.activePiece = game.newPiece();
	log();
}