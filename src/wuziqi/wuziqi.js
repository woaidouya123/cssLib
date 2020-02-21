var white = new Array();
var black = new Array();
var isBlackTurn = true;
var isGameOver = false;
const dist = 50;
const posts = [
    [3, 3],
    [11, 3],
    [3, 11],
    [11, 11],
    [7, 7]
];
var c = document.getElementById("panel");
//获取canvas对象
var ctx = c.getContext("2d");
//绘制棋盘
for (let i = 1; i <= 13; i++) {
    ctx.moveTo(i * 50, 50);
    ctx.lineTo(i * 50, 650);
    ctx.stroke();
}
for (let i = 1; i <= 13; i++) {
    ctx.moveTo(50, i * 50);
    ctx.lineTo(650, i * 50);
    ctx.stroke();
}
//绘制方位标志点
for (let i = 0; i < posts.length; i++) {
    ctx.beginPath();
    // console.log(posts[i][0] * dist, posts[i][1] * dist);
    ctx.arc(posts[i][0] * dist, posts[i][1] * dist, 5, 0, 2 * Math.PI);
    ctx.fill();
}
//检查棋子是否重复
function checkChess(x, y, chesses) {
    for (let i = 0; i < chesses.length; i++) {
        if (chesses[i][0] == x && chesses[i][1] == y) {
            return true;
        }
    }
    return false;
}

// 绘制棋子
function putChess(event) {
    var e = event || window.event;
    var x_pos = e.clientX - c.clientLeft;
    var y_pos = e.clientY - c.clientTop;
    // console.log(x_pos,y_pos);
    var x = Math.round(x_pos / 50);
    var y = Math.round(y_pos / 50);
    // console.log(x,y);
    if (isGameOver) {
        console.log("game over...");
        return;
    }
    if (checkChess(x, y, black) || checkChess(x, y, white)) {
        console.log("repeat...");
        return;
    }
    if (x < 1 || x > 13 || y < 1 || y > 13) {
        console.log("out of border...");
        return;
    }
    
    {
        //test white ai
        // let bpot = getMax(white,black);
        // x = bpot[0];
        // y = bpot[1];

        ctx.beginPath();
        ctx.arc(x * dist, y * dist, 20, 0, 2 * Math.PI);
        black.push([x, y]);
        ctx.fillStyle = "#000000";
        ctx.fill();
        // 测试权值
        // console.log(getWeight(x,y,black,white));
        // console.log(getMax(black,white));
        // console.log(getMaxArray(black,white));

        if (judgeWin(x, y)) {
            console.log("black win!");
            console.log(black);
            isGameOver = true;
            win("black");
        }
    }
    {
        //test white ai
        let pot = getMulSpot(black,white);
        x = pot[0][0];
        y = pot[0][1];
        console.log(pot[0],pot[1]);
        
        ctx.beginPath();
        ctx.arc(x * dist, y * dist, 20, 0, 2 * Math.PI);
        white.push([x, y]);
        ctx.fillStyle = "#ffffff";
        ctx.fill();

        // 测试权值
        // console.log(getWeight(x,y,white,black));
        // console.log(getMax(white,black));
        // console.log(getMaxArray(white,black));

        if (judgeWin(x, y)) {
            console.log("white win!");
            console.log(white);
            isGameOver = true;
            win("white");
        }
    }

    // isBlackTurn = isBlackTurn ^ true;
    // console.log(isBlackTurn);

}

//判断胜负
function judgeWin(x, y) {
    let chesses;
    if (isBlackTurn) {
        chesses = black;
    } else {
        chesses = white;
    }
    if (checkRow(x, y, chesses) || checkCol(x, y, chesses) || checkRTL(x, y, chesses) || checkLTR(x, y, chesses)) {
        return true;
        console.log(chesses);
    }
    return false;


}

function checkRow(x, y, chesses) {
    //row
    let index = 0;
    let startX = x - 4 > 0 ? x - 4 : 1;
    let endX = x + 4 < 14 ? x + 4 : 13;
    for (let i = startX; i <= endX; i++) {
        if (checkChess(i, y, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

function checkCol(x, y, chesses) {
    //col
    let index = 0;
    let startY = y - 4 > 0 ? y - 4 : 1;
    let endY = y + 4 < 14 ? y + 4 : 13;
    for (let i = startY; i <= endY; i++) {
        if (checkChess(x, i, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

function checkLTR(x, y, chesses) {
    let index = 0;
    let startX = x - 5,
        endX = x + 5,
        startY = y - 5;
    for (let i = startX, j = startY; i < endX; i++, j++) {
        if (checkChess(i, j, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

function checkRTL(x, y, chesses) {
    let startX = x - 5;
    let endX = x + 5;
    for (let i = startX; i < endX; i++) {
        if (checkChess(i, x + y - i, chesses)) {
            index++;
        } else {
            index = 0;
        }
        if (index >= 5) {
            return true;
        }
    }
    return false;
}

function win(chessType){
    ctx.fillStyle="#7c757555";
    ctx.fillRect(0,0,700,700);
    ctx.font="30px Arial red";
    ctx.fillStyle="#ff0000";
    ctx.fillText(chessType+"Win!",7*dist-70,7*dist);
}

function catInfo(len,isStartLive,isEndLive){
    console.log(
        len,isStartLive,isEndLive
        )
}

function calWeight(index,isStartLive,isEndLive){
    if(isStartLive^isEndLive && index < 5){
        index --;
    }
    if(!(isStartLive|isEndLive) && index < 5){
        index = 0;
    }
    // catInfo(index, isStartLive, isEndLive);
    return 10**index;
}

function getWeight(x,y,chesses,other){
    let count = 0;
    count += getRowWeight(x, y, chesses, other);
    count += getColWeight(x, y, chesses, other);
    count += getLTRWeight(x, y, chesses, other);
    count += getRTLWeight(x, y, chesses, other);
    return count;

}

function getRowWeight(x,y,chesses,other){
    let index = 0;
    let startX,endX;
    let isStartLive=true,isEndLive=true;
    //获取前面评估情况
    for(startX=x-1;startX>0;startX--){
        if (!checkChess(startX,y,chesses)) {
            break;
        }
    }
    if (startX == 0 || checkChess(startX,y,other)) {
        isStartLive = false;
    }

    //获取后面评估情况
    for(endX=x+1;endX<14;endX++){
        if (!checkChess(endX,y,chesses)) {
            break;
        }
    }
    if (endX == 14 || checkChess(endX,y,other)) {
        isEndLive = false;
    }

    // 计算row评估
    index += (endX-startX-1);
    return calWeight(index, isStartLive, isEndLive);



}

function getColWeight(x,y,chesses,other){
    let index = 0;
    let startY,endY;
    let isStartLive=true,isEndLive=true;
    //获取上面评估情况
    for(startY=y-1;startY>0;startY--){
        if (!checkChess(x,startY,chesses)) {
            break;
        }
    }
    if (startY == 0 || checkChess(x,startY,other)) {
        isStartLive = false;
    }

    //获取下面评估情况
    for(endY=y+1;endY<14;endY++){
        if (!checkChess(x,endY,chesses)) {
            break;
        }
    }
    if (endY == 14 || checkChess(x,endY,other)) {
        isEndLive = false;
    }

    // 计算row评估
    index += (endY-startY-1);
    return calWeight(index, isStartLive, isEndLive);
}

// '\'
function getLTRWeight(x,y,chesses,other){
    let index = 0;
    let startX,endX,startY,endY;
    let isStartLive=true,isEndLive=true;

    // 获取左上评估情况
    for(startX=x-1,startY=y-1;startX>0&&startY>0;startX--,startY--){
        if (!checkChess(startX,startY,chesses)) {
            break;
        }
    }
    if (startY == 0 || startX == 0 || checkChess(startX,startY,other)) {
        isStartLive = false;
    }

    //获取右下评估情况
    for(endX=x+1,endY=y+1;endX<14&&endY<14;endX++,endY++){
        if (!checkChess(endX,endY,chesses)) {
            break;
        }
    }
    if (endX == 14 || endY == 14 || checkChess(endX,endY,other)) {
        isEndLive = false;
    }
    // 计算'\'评估
    index += (endX-startX-1);
    return calWeight(index, isStartLive, isEndLive);

}

//获取'/'权值
function getRTLWeight(x,y,chesses,other){
    let index = 0;
    let startX,endX,startY,endY;
    let isStartLive=true,isEndLive=true;

    // 获取左下评估情况
    for(startX=x-1,startY=y+1;startX>0&&startY<14;startX--,startY++){
        if (!checkChess(startX,startY,chesses)) {
            break;
        }
    }
    if (startY == 14 || startX == 0 || checkChess(startX,startY,other)) {
        isStartLive = false;
    }

    //获取右上评估情况
    for(endX=x+1,endY=y-1;endX<14&&endY>0;endX++,endY--){
        if (!checkChess(endX,endY,chesses)) {
            break;
        }
    }
    if (endX == 14 || endY == 0 || checkChess(endX,endY,other)) {
        isEndLive = false;
    }
    // 计算'/'评估
    index += (endX-startX-1);
    return calWeight(index, isStartLive, isEndLive);
}

//极大极小值搜索，思考一步，返回一个坐标
function getMax(person,robot){
    let person_max = 0;
    let robot_max = 0;
    let temp = new Array();
    let temp_per_x,temp_per_y;
    let temp_rob_x,temp_rob_y;
    //person
    for(let i=1;i<14;i++){
        for(let j=1;j<14;j++){
            if(!checkChess(i,j,person)&&!checkChess(i,j,robot)&&!checkChess(i,j,temp)){
                let temp_weight = getWeight(i, j, person, robot);
                if (temp_weight > person_max) {
                    temp_per_x = i;
                    temp_per_y = j;
                    person_max =   temp_weight;
                }
            }
        }
    }
    //robot
    for(let i=1;i<14;i++){
        for(let j=1;j<14;j++){
            if(!checkChess(i,j,person)&&!checkChess(i,j,robot)&&!checkChess(i,j,temp)){
                let temp_weight = getWeight(i, j, robot, person);
                if (temp_weight > robot_max) {
                    temp_rob_x = i;
                    temp_rob_y = j;
                    robot_max = temp_weight;
                }
            }
        }
    }

    if (robot_max > person_max) {
        return [temp_rob_x,temp_rob_y];
    }else {
        return [temp_per_x,temp_per_y];
    }

}

//获取最后一步的最大权值
function getMaxWeight(chesses,other){
    let robot_max = 0;
    let temp = new Array();
    let temp_rob_x,temp_rob_y;
    
    //chesses
    for(let i=1;i<14;i++){
        for(let j=1;j<14;j++){
            if(!checkChess(i,j,other)&&!checkChess(i,j,chesses)&&!checkChess(i,j,temp)){
                let temp_weight = getWeight(i, j, chesses, other);
                if (temp_weight > robot_max) {
                    temp_rob_x = i;
                    temp_rob_y = j;
                    robot_max = temp_weight;
                }
            }
        }
    }
    return robot_max;
    
}

// 获取最大权值的所有点
function getMaxArray(person,robot){
    let person_max = 0;
    let robot_max = 0;
    let temp_per = new Array();
    let temp_rob = new Array();
    let temp_per_x,temp_per_y;
    let temp_rob_x,temp_rob_y;
    //person
    for(let i=1;i<14;i++){
        for(let j=1;j<14;j++){
            if(!checkChess(i,j,person)&&!checkChess(i,j,robot)&&
                !checkChess(i,j,temp_per)&&!checkChess(i,j,temp_rob)){
                let temp_weight = getWeight(i, j, person, robot);
                if (temp_weight > person_max) {
                    temp_per = new Array();
                    temp_per_x = i;
                    temp_per_y = j;
                    person_max =   temp_weight;
                }
                if(temp_weight == person_max){
                    temp_per.push([i,j]);
                }
            }
        }
    }
    //robot
    for(let i=1;i<14;i++){
        for(let j=1;j<14;j++){
            if(!checkChess(i,j,person)&&!checkChess(i,j,robot)&&
                !checkChess(i,j,temp_per)&&!checkChess(i,j,temp_rob)){
                let temp_weight = getWeight(i, j, robot, person);
                if (temp_weight > robot_max) {
                    temp_rob = new Array();
                    temp_rob_x = i;
                    temp_rob_y = j;
                    robot_max =   temp_weight;
                }
                if(temp_weight == robot_max){
                    temp_rob.push([i,j]);
                }
            }
        }
    }

    if (robot_max > person_max) {
        return temp_rob;
    }else {
        return temp_per;
    }

}

// 多层计算核心
function getMulMax(chesses,other,deep){
    let temp_array,temp_pot,temp_weight;
    let max_weight = 0;
    if (deep == 1) {
        return getMaxWeight(chesses, other);
    }else {
        temp_array = getMaxArray(chesses, other);

        while (temp_array.length > 0) {
            temp_pot = temp_array.pop();
            chesses.push(temp_pot);
            temp_weight = getMulMax(other, chesses, deep-1);
            if (temp_weight > max_weight) {
                max_weight = temp_weight;
            }
            chesses.pop();
            
        }
        return max_weight;

    }
}

// 计算极大值
// function getMulSpot_all(chesses,other){
//     let temp_array,temp_pot,temp_weight;
//     let max_weight = 0;
//     let max_weight_spot;
//     let deep = 5;
//     for(let )
// }

// 多层计算应用,返回坐标
function getMulSpot(chesses,other){
    let temp_array,temp_pot,temp_weight;
    let max_weight = 0;
    let max_weight_spot;
    let deep = 5;   
    temp_array = getMaxArray(chesses, other);
    while (temp_array.length > 0) {
        temp_pot = temp_array.pop();
        chesses.push(temp_pot);
        temp_weight = getMulMax(other, chesses, deep-1);
        if (temp_weight > max_weight) {
            max_weight = temp_weight;
            max_weight_spot = temp_pot;
        }
        chesses.pop();
        
    }
    return [max_weight_spot,max_weight];

    
}