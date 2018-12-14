//	0 1 2 3 4 5 6 7
//
//	0  1 O O O O O O 1	I = 4
//	1  1 O · O O · O 1	J = 2
//	2  1 O # # O O O 1
//	3  X O O # # O O 1	pos[0] = 4 -> 3
//	4  1 O X O O · O 1	pos[1] = 2 -> 0
//	5  1 O O O O O O 1
//	6  1 O O O O O O 1	fomra 4 x 4
//	7  1 O O O O O O 1

var game = { 
	board: null,	//	IMPORTANTE! ARRAY CON LETRAS E(MPTY), W(ALL) Y LAS OTRAS PARA LAS PEIZAS
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
				
				if (0 <= y && y < this.activePiece.form.length && 
						0 <= x && x < this.activePiece.form[y].length ) {
					if (this.activePiece.form[y][x]===1) {
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
	move: function() {
		
	},
	playGame: function() {
		endGame(); // Evita que pueda haber multibles setIntervals activos
		play = setInterval(this.move, 250);
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
		
		this.move = function(x) {
			if (x==-1 || x==1) {
				this.pos[1] = parseInt(this.pos[1])+x;
			}
		};
		this.godown = function() {
			this.pos[0] = parseInt(this.pos[0])+1;
		};
		this.turn = function() {
			//var tempForma = new Array(this.forma[0].length);
			var tempForm = [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				];
			
			for (var i=0; i < this.form.length ; i++) {
				//tempForma[i] = new Array(this.forma.length);
				for (var j = 0; j < this.form[i].length ; j++) {
					tempForm[j][ this.form[i].length-i-1 ] = this.form[i][j];
				}
			}
			this.form=tempForm;
		};
		this.newPiece = function() {
			var tempPiece = game.nextPiece;
			game.nextPiece = game.newRandomPiece();
			game.countP[tempPiece.name] += 1;
			return tempPiece;
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
		/*this.randomP = function() { 
			return parseInt(Math.random() * 7);
		};*/
};
game.activePiece = null;
function initGame() {
	game.init();
	game.activePiece = game.newRandomPiece();
	game.countP[game.activePiece.name] += 1;
}


function PlayGame() {
	initGame();
	log();
}
function RestartGame() {
	initGame();
	game.show();
	log();
}
function log() {
	game.show();
	game.log();
	game.activePiece.printLog();
}
function myFunctionGirarP() {
	game.activePiece.turn();
	log();
}
function myFunctionBajarP() {
	game.activePiece.godown();
	log();
}
function myFunctionMoverIP() {
	game.activePiece.move(-1);
	log();
}
function myFunctionMoverDP() {
	game.activePiece.move(1);
	log();
}
function myFunctionNewPieceP() {
	game.activePiece = game.activePiece.newPiece();
	log();
}