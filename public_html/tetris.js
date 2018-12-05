var game = { 
	board: null,
	lengthB: [22, 12],
	nextPiece: null,
	points: null,
	countP: null,
			//// I, J, L, O, S, T, Z
	init: function() { // metodes : funció,
		this.board = new Array (this.lengthB[0]);
		for (var i=0 ; i < this.lengthB[0] ; i++) {
			this.board[i] = new Array (this.lengthB[1]);
			this.board[i][0]=1;
			for (var j=1 ; j < this.lengthB[1] ; j++) {
				this.board[i][j]=0;
			}
			this.board[i][this.lengthB[1]-1]=1;
		}
		for (var j=1 ; j < this.lengthB[1] ; j++) {
			this.board[this.lengthB[0]-1][j]=1;
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
		this.nextPiece = piece.new();
	}
}; 

var piece = function(name, form, posX, posY)
	{	this.name = name;
		this.form = form;
		this.pos = [posX, posY];
		
		this.move = function(x) {
			if (x==-1 || x==1) {
				this.pos[0] = parseInt(this.pos[0])+x;
			}
		};
		this.godown = function() {
			this.pos[1] = parseInt(this.pos[1])+1;
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
		this.show = function() {
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
			document.getElementById("resultado").innerHTML = out;
		};
		/*this.randomP = function() { 
			return parseInt(Math.random() * 7);
		};*/
		this.newP = function() {
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
				default: alert("error genera nombre de pessa");
			}	
			return new piece(name, forma, 0, 6);
		};
};
var  forma = [
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 1, 0],
	[0, 0, 0, 0],
];
var piezaej = new piece('i', forma, '5', '5'); 
piezaej = piezaej.newP();

game.init();

function myFunctionMostrar() {
	piezaej.show();
}
function myFunctionGirar() {
	piezaej.turn();
	piezaej.show();
}
function myFunctionBajar() {
	piezaej.godown();
	piezaej.show();
}
function myFunctionMoverI() {
	piezaej.move(-1);
	piezaej.show();
}
function myFunctionMoverD() {
	piezaej.move(1);
	piezaej.show();
}
function myFunctionNewPiece() {
	piezaej = piezaej.newP();
	piezaej.show();
}