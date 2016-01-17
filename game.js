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
    console.log(top,current);
    while(current!=null){
        top += current.offsetTop;
        current = current.offsetParent;
        console.log(top,current);
    }
    return top;
};

var getBasisCubeLong = function(){
    for(var i=0;i<4;i++) {
        var left = getElementLeft(CUBEGAME.basisCubeStr[i]);
        var top = getElementTop(CUBEGAME.basisCubeStr[i]);
        CUBEGAME.basisCubeLong[i][0] = left + 'px';
        CUBEGAME.basisCubeLong[i][1] = top + 'px';
        console.log(CUBEGAME.basisCubeStr[i]);
        console.log("(" + top + "," + left + ")");
    }
};

var getTargetLong = function(target){
    var direction = {};
    direction.x = getElementLeft(target);
    direction.y = getElementTop(target);
    return direction;
};

var chooseCubeStyle = function(n){
    switch(parseInt(n)){
        case 4:
            CUBEGAME.basisCubeStyle = 'basisCubeFour';
            break;
        case 8:
            CUBEGAME.basisCubeStyle = 'basisCubeEight';
            break;
        case 16:
            CUBEGAME.basisCubeStyle = 'basisCubeSixteen';
            break;
    }
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
        case 16:
            long = 18;
            break;
    }
    return long;
};

var chooseCubeDeg = function(index){
    var deg = '';
    switch(index){
        case 1:
            deg = '90deg';
            break;
        case 2:
            deg = '180deg';
            break;
        case 3:
            deg = '0deg';
            break;
        case 4:
            deg = '270deg';
            break;
    }
    return deg;
};



var chooseCubeColor = function(index){
    var color = '';
    switch(index){
        case 1:
            color = '#e6efc2';
            break;
        case 2:
            color = '#a2d5ac';
            break;
        case 3:
            color = '#39aea8';
            break;
        case 4:
            color = '#557c83';
            break;
    }
    return color;
};

/*************************CUBEGAME****************************/

var CUBEGAME = function(){};
CUBEGAME.cube1 = 6;
CUBEGAME.cube2 = 7;
CUBEGAME.cube3 = 8;
CUBEGAME.cube4 = 9;
CUBEGAME.broad = new Array();
CUBEGAME.basisCubeLong = new Array();
CUBEGAME.basisCubeStyle = '';
CUBEGAME.imageType = '';
definedStr(CUBEGAME.basisCubeLong,4);
CUBEGAME.moveCube = $$$ID('moveCube');
CUBEGAME.basisCubeStr = new Array();
var cubeSingle = new Array();



CUBEGAME.printStr = function(){
    for(var i=0;i<this.n;i++){
        for(var j=0;j<this.n;j++){
            console.log(this.broad[i][j]);
        }
    }
};


CUBEGAME.createMoveCube = function(n){
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
    var node = addCubeBorder(moveCube,n);
    node.style.left = x;
    node.style.top = y;
    console.log(x,y);
    return node;
};


CUBEGAME.move = function(x,y,n){
    var target = getTargetLong(cubeSingle[x][y]);
    var node = this.createMoveCube(n);
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



var INPUTBLOCK = function(){};

INPUTBLOCK.showInput = function(target){
    target.style.display = 'block';
    target.style.webkitAnimation = 'showMove 1.5s';
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


var showCubePage = function(n){
    addCubePage(n);
    showPage.style.opacity = 1;
};

var judgeInput = function(value){
    if(value!=null){
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


/***
 * 添加basisCube
 * @param obj：在哪里添加；
 * @param index：添加第一个（一共有4个）；
 */



var addCubeInside = function(target,index){
    var node = document.createElement('div');
    node.setAttribute('class',CUBEGAME.basisCubeStyle);
    node.style.transform = 'rotate('+ chooseCubeDeg(index) +')';
    node.style.borderColor = chooseCubeColor(index);
    target.appendChild(node);
};



var addCubeBorder = function(target,index){
    var nodeBorder = document.createElement('div');
    nodeBorder.setAttribute('class','basisCubeBorder');
    addCubeInside(nodeBorder,index);
    target.appendChild(nodeBorder);
    return nodeBorder;
};



function createBasisCube(obj,index){
    var node = addCubeBorder(obj,index);
    return node;
}





/**
 * 在basisCubeBlock这个模块添加需要的4个模块
 * 并且让basisCubeBlock显示
 */

function addBasisCubeInBlock(){
    for(var i=1;i<=4;i++){
        var node = createBasisCube(basisCubeBlock,i);
        CUBEGAME.basisCubeStr[i-1] = node;
    }
    basisCubeBlock.style.opacity = 1;
}
function reStart(){
    inputBtn.onclick = function(){
        location.reload();
    };
}



/***
 * 当输入完成时，记录输入的n
 */
INPUTBLOCK.isInputDone = function(){
    inputBtn.onclick = function(){
        if(judgeInput(inputText.value)){
            this.value = 'fresh';//改变start=>fresh
            CUBEGAME.n = inputText.value;//存储k
            CUBEGAME.long = chooseCubeLong(CUBEGAME.n);//存储长度
            chooseCubeStyle(CUBEGAME.n);//选择basisCube模块的样式
            definedStr(cubeSingle, CUBEGAME.n);//定义二维数组
            INPUTBLOCK.showInput(tip);//
            addBasisCubeInBlock();//加入模块到basisBlock中
            getBasisCubeLong();//得到basisBlock模块中每个模块的left，top
            showCubePage(CUBEGAME.n);//生成并显示展示表格
            reStart();
        }
    };
};



window.onload = function(){
    INPUTBLOCK.showInput(inputCubeCount);
    INPUTBLOCK.isInputDone();
};

