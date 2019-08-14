/**
 * ---------------------------------------------------
 * 사용자 정의 객체 (다른 언어에서는 클래스(Class))
 * 생성자 함수 (일급 함수)
 * ex) new 생성자 함수 -> 객체 인스턴스 생성
 * ---------------------------------------------------
 */

// 생성자 함수 (Constructor Function)
function BioCreature(init_settings) {

	// 감춰진 멤버
	var _age = 1,
		_birth__place = 'Earth',
		_leg__count = 4;

	// 공개된 멤버
	this.self = this;
	this.type = null;
	this.current_state = 'sleep';
	this.init(init_settings);

	
	this.getAge = function() {
		return _age;
	};
	this.setAge = function(value) {
		_age = value;
	};

	Object.defineProperty(this,'birth_place',{
		// ['get', 'set', 'value' ] 중 하나를 설정
		'value': _birth__place,
		'configurable':true,
		// 'enumerable': true,
		// 'writable':true,
	});
	Object.defineProperty(this,'leg_count',{
		'get': function() {
			return _leg__count;
		},
		'set': function(value) {
			_leg__count = value;
		},
	});
}

// 생성자 함수의 프로토타입 (Prototype)
BioCreature.prototype.init = function(initializationFn) {
	initializationFn.call(this);
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
