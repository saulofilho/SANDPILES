'use strict';

var obFor = 3;

var cor1 = '#66ccff';

document.getElementById('colorWell1').addEventListener('change', function() {
    cor1 = parseInt(document.getElementById('colorWell1').value);
    update(cor1);
});


// change the form
document.getElementById('objForm').addEventListener("keyup", function() {
    obFor = parseInt(document.getElementById('objForm').value);
    update(obFor);
});

// change the draw
document.getElementById('coefLoucura').addEventListener("keyup", function() {
    var coeficienteDeLoucura = parseInt(document.getElementsByClassName('input')[0].value);
    init(coeficienteDeLoucura);
  });

var WIDTH = 101,
    HEIGHT = 101;

var PALETTE = ['#000', cor1, '#ff99ff', '#66ff66', '#ffff66']; 

var NEXTFRAME = void 0;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var grid = [];
var tempgrid = [];

function init(coeficienteDeLoucura = 0) {
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

// Init the grid
    grid = new Array(HEIGHT).fill(0).map(function (x) {
        return new Array(WIDTH).fill(coeficienteDeLoucura); //0 to 6: efeito do desenho
    });
    
// Put a lot of sand grains in the middle
    grid[Math.floor(WIDTH / 2)][Math.floor(HEIGHT / 2)] = Infinity;

    tempgrid = new Array(HEIGHT).fill(0).map(function (x) {
        return new Array(WIDTH).fill(0);
    });
}

function update(obFor) {
// Copy the grid on the tempgrid
    for (var y = 0; y < HEIGHT; y++) {
        for (var x = 0; x < WIDTH; x++) {
            tempgrid[y][x] = grid[y][x];
        }
    }

    var n = void 0;

// Topple the grid
    for (var _y = 1; _y < HEIGHT - 1; _y++) {
        for (var _x = 1; _x < WIDTH - 1; _x++) {
            n = tempgrid[_y][_x];
            if (n > obFor) { //-3 to 6: formato do objeto
                grid[_y][_x] -= 4; //crescimento
                grid[_y - 1][_x] += 1; //top
                grid[_y + 1][_x] += 1; //bottom
                grid[_y][_x - 1] += 1; //left
                grid[_y][_x + 1] += 1; //right
            }
        }
    }
}

function draw() {
    var n = void 0;

    for (var y = 1; y < HEIGHT - 1; y++) {
        for (var x = 1; x < WIDTH - 1; x++) {
            n = grid[y][x];
            ctx.fillStyle = PALETTE[n > 4 ? 4 : n];
            ctx.fillRect(x, y, 1, 1);
        }
    }

    NEXTFRAME = requestAnimationFrame(nextframe);
}

function nextframe() {
    update(obFor);
    draw();
}

init();
nextframe();

// button modal
$(document).ready(function() {
    $("button").click(function() {
      $("span").toggle();
    })
  })


// + cores
// const PALETTE = ['#f7f1e3', '#706fd3', '#474787', '#40407a', '#2c2c54'] // branco, roxo
// const PALETTE = ['#f7f1e3', '#33d9b2', '#34ace0', '#706fd3', '#ff5252'] // branco, verde, roxo, vermelho
// const PALETTE = ['#f7f1e3', '#34e7e4', '#4bcffa', '#575fcf', '#0be881'] // branco, azul, roxo
// const PALETTE = ['#f7f1e3', '#f6e58d', '#ffbe76', '#ff7979', '#eb4d4b'] // branco, laranja, rosa, amarelo
// const PALETTE = ['#95afc0', '#7ed6df', '#e056fd', '#686de0', '#30336b'] // cinza, azul, roxo, azul escuro 
// const PALETTE = ['#dfe6e9', '#55efc4', '#81ecec', '#74b9ff', '#a29bfe'] // branco, verde, azul
// const PALETTE = ['#f7f1e3', '#686de0', '#f0932b', '#ffbe76', '#e056fd'] // branco, laranja, roxo
// const PALETTE = ['#f7f1e3', '#ffda79', '#ffb142', '#ff793f', '#ff5252'] // branco, laranja, amarelo
// const PALETTE = ['#fff', '#ccc', '#999', '#666', '#333'] // pb