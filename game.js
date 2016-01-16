/**
 * Created by DaisyCream on 16/1/14.
 */

function $$$ID(target){
    return document.getElementById(target);
}

function $$$CLASS(target){
    return document.getElementsByClassName(target);
}


var definedStr = function(str, n){
    for(var i=0;i<n;i++){
        str[i] = new Array;
    }
};

var getElementLeft = function(target){
    var left = target.offsetLeft;
    var current = target.offsetParent;
    while(current!=null){
        left += current.offsetLeft;
        current = current.offsetParent;
    }
    return left;
};

var getElementTop = function(target){
    var top = target.offsetTop;
    var current = target.offsetParent;
    while(current!=null){
        top += current.offsetTop;
        current = current.offsetParent;
    }
    return top;
};

var getBasisCubeLong = function(){
    for(var i=0;i<4;i++) {
        var left = getElementLeft(basisCubeStr[i]);
        var top = getElementTop(basisCubeStr[i]);
        CUBEGAME.basisCubeLong[i][0] = left-CUBEGAME.long-4 + 'px';
        CUBEGAME.basisCubeLong[i][1] = top-CUBEGAME.long-4 + 'px';
        console.log(basisCubeStr[i]);
        console.log("(" + top + "," + left + ")");
    }
};

var getTargetLong = function(target){
    var direction = {};
    direction.x = getElementLeft(target);
    direction.y = getElementTop(target);
    return direction;
};

/*************************CUBEGAME****************************/

var CUBEGAME = function(){};
CUBEGAME.cube1 = 6;
CUBEGAME.cube2 = 7;
CUBEGAME.cube3 = 8;
CUBEGAME.cube4 = 9;
CUBEGAME.broad = new Array();
CUBEGAME.basisCubeLong = new Array();
CUBEGAME.imageType = '';
definedStr(CUBEGAME.basisCubeLong,4);
CUBEGAME.moveCube = $$$ID('moveCube');
var cubeSingle = new Array();



CUBEGAME.printStr = function(){
    for(var i=0;i<this.n;i++){
        for(var j=0;j<this.n;j++){
            console.log(this.broad[i][j]);
        }
    }
};


CUBEGAME.createBasisCube = function(n){
    var x,y;
    switch (n){
        case 1:
            x = this.basisCubeLong[0][0];
            y = this.basisCubeLong[0][1];
            break;
        case 2:
            x = this.basisCubeLong[1][0];
            y = this.basisCubeLong[1][1];
            break;
        case 3:
            x = this.basisCubeLong[2][0];
            y = this.basisCubeLong[2][1];
            break;
        case 4:
            x = this.basisCubeLong[3][0];
            y = this.basisCubeLong[3][1];
            break;
    }
    var node = document.createElement('img');
    node.style.left = x;
    node.style.top = y;
    node.setAttribute('src', './img/'+CUBEGAME.imageType+n+'.png');
    console.log(x,y);
    this.moveCube.appendChild(node);
    return node;
};


CUBEGAME.move = function(x,y,n){
    var target = getTargetLong(cubeSingle[x][y]);
    var node = this.createBasisCube(n);
    setTimeout(function(){
        node.style.left = target.x + "px";
        node.style.top = target.y + 'px';
    },1000);
};



CUBEGAME.putCube1 = function(x,y){
    this.broad[x][y] = 1;
    this.broad[x+1][y] = 1;
    this.broad[x][y+1] = 1;
    this.move(x,y,1);
};

CUBEGAME.putCube2 = function(x,y){
    this.broad[x][y] = 2;
    this.broad[x+1][y] = 2;
    this.broad[x+1][y+1] = 2;
    this.move(x,y,2);
};

CUBEGAME.putCube3 = function(x,y){
    this.broad[x][y] = 3;
    this.broad[x][y+1] = 3;
    this.broad[x+1][y+1] = 3;
    this.move(x,y,3);
};

CUBEGAME.putCube4 = function(x,y){
    this.broad[x+1][y] = 4;
    this.broad[x][y+1] = 4;
    this.broad[x+1][y+1] = 4;
    this.move(x,y,4);
};




CUBEGAME.putCube = function(value, x, y){
    switch(value){
        case this.cube1:
            this.putCube1(x,y);
            break;
        case this.cube2:
            this.putCube2(x,y);
            break;
        case this.cube3:
            this.putCube3(x,y);
            break;
        case this.cube4:
            this.putCube4(x,y);
            break;
    }
};

CUBEGAME.initInt = function(){
    for(var i=0;i<this.n;i++){
        for(var j=0;j<this.n;j++){
            this.broad[i][j] = 0;
        }
    }
};


CUBEGAME.checkCube = function(nowCube,m){
    var x = nowCube[0];
    var y = nowCube[1];
    for(var i=0;i<m;i++,x++){
        y = nowCube[1];
        for(var j=0;j<m;j++,y++){
            if(this.broad[x][y]!=0){
                return false;
            }
        }
    }
    return true;
};


CUBEGAME.getCubeSpace = function(cube,k){
    var sum = 0;
    for(var i=0;i<cube.length;i++){
        if(this.checkCube(cube[i],k)){
            sum+=(i+1);
        }
    }
    return sum;
};

CUBEGAME.spliceCube = function(x,y,m){
    var k = parseInt(m/2);
    if(k<=0){
        return;
    }
    var cube = [
        [x,y],
        [x+k,y],
        [x,y+k],
        [x+k,y+k]
    ];
    var cubeValue = this.getCubeSpace(cube, k);
    console.log(cubeValue + 'value');
    this.putCube(cubeValue, x+k-1, y+k-1);
    for(var i=0;i<cube.length;i++){
        this.spliceCube(cube[i][0], cube[i][1], k);
    }
};




CUBEGAME.start = function(){
    definedStr(this.broad, this.n);
    this.initInt(this.broad);
    this.broad[this.a][this.b] = -1;
    this.spliceCube(0,0,this.n);
};



/*****************************************************/
var inputCubeCount = $$$ID('inputCubeCount');
var tip = $$$ID('tip');
var inputText = $$$ID('inputText');
var inputBtn = $$$ID('inputBtn');
var showPage = $$$ID('showPage');
var basisCubeBlock = $$$ID('basisCubeBlock');
var moveCube = $$$ID("moveCube");
moveCube.style.height = document.documentElement.clientHeight + 'px';
var basisCubeStr = [
    $$$ID('basisCube1'),
    $$$ID('basisCube2'),
    $$$ID('basisCube3'),
    $$$ID('basisCube4')
];



var INPUTBLOCK = function(){};

INPUTBLOCK.showInput = function(target){
    target.style.display = 'block';
    target.style.webkitAnimation = 'showMove 1.5s';
};

var showCubePage = function(n){
    addCubePage(n);
    showPage.style.opacity = 1;
};

var chooseCubeLong = function(n){
    var long;
    switch(parseInt(n)){
        case 4:
            long = 78;
            break;
        case 8:
            long = 38;
            break;
    }
    return long;
};

var addCubePage = function(n){
    for(var i=0;i<n;i++){
        for(var j=0;j<n;j++){
            var cube = document.createElement('div');
            cube.style.width = parseInt(CUBEGAME.long)+'px';
            cube.style.height = parseInt(CUBEGAME.long)+'px';
            cube.setAttribute('class','cubeSingle');
            cubeSingle[j][i] = cube;
            cube.i = i;
            cube.j = j;
            cube.onclick = function(){
                CUBEGAME.a = this.j;
                CUBEGAME.b = this.i;
                console.log(CUBEGAME.a, CUBEGAME.b);
                this.style.backgroundColor = '#6f6362';
                setTimeout("CUBEGAME.start()", 50);
                for(var a=0;a<n;a++){
                    for(var b=0;b<n;b++){
                        cubeSingle[b][a].onclick = function(){};
                    }
                }
            };
            showPage.appendChild(cube);
        }

    }


};

var judgeInput = function(value){
    if(value!=0){
        if(value!=4&&value!=8&&value!=16){
            alert("Input wrong!please write(4 or 8 or 16)");
            location.reload();
        }else{
            return true;
        }
    }else{
        alert("Input wrong!please write(4 or 8 or 16)");
        location.reload();
    }
};


var imageChoose = function(n){
    switch(parseInt(n)){
        case 4:
            addImage("big");
            break;
        case 8:
            addImage("middle");
            break;
    }
    basisCubeBlock.style.opacity = 1;

};

var addImage = function(target){
    CUBEGAME.imageType = target;
    for(var i=0;i<basisCubeStr.length;i++){
        var node = document.createElement('img');
        node.setAttribute('src', './img/'+target+(i+1)+'.png');
        basisCubeStr[i].appendChild(node);
    }

};



INPUTBLOCK.isInputDone = function(){
    inputBtn.onclick = function(){
        if(judgeInput(inputText.value)){
            CUBEGAME.n = inputText.value;
            CUBEGAME.long = chooseCubeLong(CUBEGAME.n);
            getBasisCubeLong();
            definedStr(cubeSingle, CUBEGAME.n);
            imageChoose(CUBEGAME.n);
            showCubePage(CUBEGAME.n);
            INPUTBLOCK.showInput(tip);
            this.onclick = function(){};
        }
    };
};



window.onload = function(){
    INPUTBLOCK.showInput(inputCubeCount);
    INPUTBLOCK.isInputDone();
};

