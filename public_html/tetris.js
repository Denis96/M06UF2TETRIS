/*
	I = cyan
	J = blue
	L = orange
	O = yellow
	S = green
	T = purple
	Z = red
*/
var game = { 
	board: null,
	nextPiece: null,
	points: null,
	countPieces: {"i" : null,"j" : null,"l" : null,"o" : null}, // I, J, L, O, S, T, Z
	//countPieces: [null, null, null, null, null, null, null], // I, J, L, O, S, T, Z
	dades: function() // metodes : funció,
	{ return(this.nom + "-" + this.ocupacio + "-" + this.edat);
	}
}; 
 
// 0 1 y
// 1 
// x
var pieza = function(color, forma, posX, posY)
	{	this.color = color;
		this.forma = forma;
		this.posicion = [posX, posY];
		this.moverX = function(x) {
			if (x==-1 || x==1) {
				this.posicion[0] = parseInt(this.posicion[0])+x;
			}
		}
		this.bajar = function() {
			this.posicion[1] = parseInt(this.posicion[1])+1;
		}
		this.girar = function() {
			//var tempForma = new Array(this.forma[0].length);
			var tempForma = [
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0],
					[0, 0, 0, 0]
				];
			
			for (var i=0; i < this.forma.length ; i++) {
				//tempForma[i] = new Array(this.forma.length);
				for (var j = 0; j < this.forma[i].length ; j++) {
					tempForma[j][ this.forma[i].length-i-1 ] = this.forma[i][j];
				}
			}
			this.forma=tempForma;
		}
		this.mostrar = function() {
			var out="";
			out = out+"Color: "+this.color;
			out = out+"<br>Forma: ";
			for (var i=0; i < this.forma.length ; i++) {
				out = out+"<br>";
				for (var j = 0; j < this.forma[i].length; j++) {
					if (this.forma[i][j]==1) {
						out = out+"<span style=\"color:"+this.color+"\">&#9724;</span>";

					} else {
						out = out+"&#9724;";
					}
				}
			}
			out = out+"<br>PosisciónX: "+this.posicion[0];
			out = out+"<br>PosisciónY: "+this.posicion[1];
			document.getElementById("resultado").innerHTML = out;
		}
};
var  forma = [
	[0, 1, 0, 0],
	[0, 1, 0, 0],
	[0, 1, 1, 0],
	[0, 0, 0, 0],
];
var piezaej = new pieza('blue', forma, '5', '5'); 

function myFunctionMostar() {
	piezaej.mostrar();
}
function myFunctionGirar() {
	piezaej.girar();
	piezaej.mostrar();
}
function myFunctionBajar() {
	piezaej.bajar();
	piezaej.mostrar();
}
function myFunctionMoverI() {
	piezaej.moverX(-1);
	piezaej.mostrar();
}
function myFunctionMoverD() {
	piezaej.moverX(1);
	piezaej.mostrar();
}