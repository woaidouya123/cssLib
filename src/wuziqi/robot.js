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
function getMulSpot_all(chesses,other){
	let temp_array,temp_pot,temp_weight;
	let max_weight = 0;
	let max_weight_spot;
	let deep = 5;
	for(let )
}

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