
// // 사용자 정의 객체 (다른언어의 클래스)

// //잠자는 아이(객체)

// // sleepingBaby사용자 정의 객체를 정의
// var sleepingBaby = {};//new Object();

// // 시작 - 객체마다 개별적으로 수행되는 초기 실행 과정
// // sleepingBaby.type = 'Baby';
// // sleepingBaby.self = sleepingBaby; // 엡뎃 대비 초기화?
// // 끝 - 객체마다 개별적으로 수행되는 초기 실행 과정


// // 시작 - 객체가 공통적으로 가지게 되는 공통 멤버(속성) 정의
// // sleepingBaby.current_state = 'sleep';

// sleepingBaby.init = function(initialization) {
// 	if (typeof initialization === 'function') {
// 		initialization.call(this);
// 	}
// 	this.name = this.name || null;
// 	this.current_state = this.state || 'sleep';
// 	this.self = this;

// 	return this;
// };

// // 공통적으로 가지게 되는 공통 멤버
// sleepingBaby.isSleep = function() {
// 	return this.current_state === 'sleep';
// };
// sleepingBaby.awake = function() {
// 	this.current_state = 'awake';
// };
// sleepingBaby.sleep = function() {
// 	this.current_state = 'sleep';
// };
// sleepingBaby.cry = function() {
// 	this.current_state = 'Ooops!' + this.name + 'is crying!';
// };

// sleepingBaby.currentStatus = function() {
// 	return 'My' + this.name + 'is' + this.current_state +'.'+ (this.isSleep() ? 'I\'m Happy. :)' : 'I\'m Sad :(')
// };

// sleepingBaby.update = function(copy_obj) {
// 	this.self = copyObjectProperties(this, copy_obj, false);
// };
// // 끝 - 객체가 공통적으로 가지게 되는 공통 멤버(속성) 정의

// // 객체내에서 수행하는 멤버. 즉 함수가 실행될때 context 는 객체. 그래서 this는 객체를 가리키게된다. 객체내부에서 멤버인 메서드를 사용할 때 this는 객체 자신을 가리킨다.

// /**--------------------------------
//  * 능력 복제
//  * 복사/ 붙여넣기
//  * 복사/ 붙여넣기 모듈화 (재사용)
//  * --------------------------------*/

// function copyObjectProperties(assign_obj, target_obj, is_copy_all) {
	
// 	var prop;
// 	is_copy_all = (typeof is_copy_all === 'undefined' || is_copy_all === true) ? true : false;

// 	if (is_copy_all) {
// 		for( prop in target_obj ){
// 			assign_obj[prop] = target_obj[prop]; 
// 		}
// 	} else {
// 		for( prop in target_obj ){
// 			if (!assign_obj[prop]) {
// 				assign_obj[prop] = target_obj[prop];
// 			}
// 		}
// 	}

// 	return assign_obj;
// }

// /**
//  * --------------------------------
//  * 잠자는 강아지(객체)
//  * --------------------------------
//  */


// var aki = copyObjectProperties({}, sleepingBaby).init( function() {
// 	this.name = '아키';
// 	this.age = 4;
// 	this.lived = true;
// });

function BioCreature( init_settings ) {
	this.self = this;
	this.type = null;
	this.current_state = 'sleep';
	this.init(init_settings);
	console.log(this);
}


BioCreature.prototype.init = function(initializationFn) {// 콜백함수 전달.
	// 함수 실행시, 사용자가 전달한 인자들의 집합
	// arguments 유사배열.
	// console.log(initializationFn);
	initializationFn.call(this); // this === window
	return this;
};
BioCreature.prototype.getType = function() {
	return this.type;
};
BioCreature.prototype.setType = function(type) {
	this.type = type;
};
BioCreature.prototype.getState = function() {
	return this.current_state;
};
BioCreature.prototype.setState = function(state) {
	this.current_state = state;
};
BioCreature.prototype.isSleep = function() {
	return this.getState() === 'sleep';
};
BioCreature.prototype.isCry = function() {
	return this.getState() === 'cry';
};
BioCreature.prototype.isAwake = function() {
	return this.getState() === 'awake';
};
BioCreature.prototype.awake = function() {
	this.setState('awake');
};
BioCreature.prototype.sleep = function() {
	this.setState('sleep');
};
BioCreature.prototype.cry = function() {
	this.setState('Oops! '+ this.type +' is crying');
};
BioCreature.prototype.displayStatus = function() {
	return 'My '+ this.type +' is ' + this.getState() + '. ' + 
			(this.isSleep() ? 'I\'m Happy. :-)' : 'I\'m Sad. :-(');
}



var sleepingDog = new BioCreature(function() {
	// this // 생성된 객체 인스턴스를 참조
	this.type = 'Dog';
	this.current_state = 'sleep';
});

var sleepingBaby = new BioCreature(function() {
	this.type = 'Baby';
	this.current_state = 'cry';
});

var sleepingCat  = new BioCreature(function() {
	this.type = 'Cat';
	this.current_state = 'awake';
});