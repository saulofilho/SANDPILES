'use strict';

var obFor = 3;

var cor1 = '#000';
var cor2 = '#66ccff';
var cor3 = '#ff99ff';
var cor4 = '#66ff66';
var cor5 = '#ffff66';

document.getElementById('colorWell1').addEventListener('change', function() {
    cor1 = (document.getElementById('colorWell1').value);
    draw();
});
document.getElementById('colorWell2').addEventListener('change', function() {
    cor2 = (document.getElementById('colorWell2').value);
    draw();
});
document.getElementById('colorWell3').addEventListener('change', function() {
    cor3 = (document.getElementById('colorWell3').value);
    draw();
});
document.getElementById('colorWell4').addEventListener('change', function() {
    cor4 = (document.getElementById('colorWell4').value);
    draw();
});
document.getElementById('colorWell5').addEventListener('change', function() {
    cor5 = (document.getElementById('colorWell5').value);
    draw();
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
    var PALETTE = [cor1 , cor2, cor3, cor4, cor5]; 

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