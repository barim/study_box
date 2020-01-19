
// 데이터 유형 검증 유틸리티 함수.
// ES5
// 함수 선언(Declaration)
function isType(o) {
    return Object.prototype.toString.call(o).toLowerCase().slice(8, -1);
}

// 함수 식(Expression)
var isType = function (o) {
    return Object.prototype.toString.call(o).toLowerCase().slice(8, -1);
};

// ES6
// 화살표 함수 문법: 문(Statement)
let isType = (o) => {
    return Object.prototype.toString.call(o).toLowerCase().slice(8, -1);
};
// ----------------------------------------------------


// 유사배열 데이터 -> 배열 유틸리티 함수
// ES5
var makeArray = function (o) {
    return Array.prototype.slice.call(o);
};

// ES6
// 화살표 함수 문법: 식(Expression)
let makeArray = (o) => Array.prototype.slice.call(o);
// 앞서 살펴본 isType 함수 또한 식(Expression)으로 변경해보면 다음과 같습니다.
let isType = (o) => Object.prototype.toString.call(o).toLowerCase().slice(8, -1);
// ----------------------------------------------------



// ES5
// 객체 합성 유틸리티 함수
var extend = function () {
    var mixin = {};
    makeArray(arguments).forEach(function (o) {
        for (var prop in o) {
            if (o.hasOwnProperty(prop)) {
                var v = o[prop];
                if (isType(v) !== 'object') {
                    mixin[prop] = v;
                } else {
                    mixin[prop] = extend(mixin[prop] || {}, v);
                }
            }
        }
    });
    return mixin;
};

// ES6
// 객체 합성 유틸리티 함수
var extend = () => { // 매개변수가 0 또는 2개 이상일 경우, 괄호 () 사용 필수
    var mixin = {};
    makeArray(arguments).forEach(o => { // 매개변수가 1개일 경우, 괄호 () 생략 가능
        for (var prop in o) {
            if (o.hasOwnProperty(prop)) {
                var v = o[prop];
                if (isType(v) !== 'object') {
                    mixin[prop] = v;
                } else {
                    mixin[prop] = extend(mixin[prop] || {}, v);
                }
            }
        }
    });
    return mixin;
};
// ----------------------------------------------------


// ES5
// 사용자 데이터
var users = [
    { name: '신인기', age: 21, job: '영화배우', email: 'inki@uri.io' },
    { name: '고민준', age: 36, job: '강사', email: 'mj.k@naver.com' },
    { name: '이지아', age: 28, job: '아나운서', email: 'jialee@daum.net' },
];

// 사용자 데이터 업데이트
// users 데이터를 순환 user 각 데이터 age 값 변경 후, users 덮어쓰기
users = users.map(function (user) {
    user.age++;
    return user;
});

// 사용자 데이터 중 age 데이터만 뽑아 새로운 배열 데이터 ages 생성
var ages = users.map(function (user) {
    return user.age;
});// [22, 37, 29]

// ES6
// 사용자 데이터 업데이트
// users 데이터를 순환 user 각 데이터 age 값 변경 후, users 덮어쓰기 → 문(Statement)
users = users.map(user => {
    user.age++;
    return user;
});

// 사용자 데이터 중 age 데이터만 뽑아 새로운 배열 데이터 ages 생성 → 식(Expression)
let ages = users.map(user => user.age);
// ----------------------------------------------------


// ES5
// 객체 정의
var y9 = {
    _name: 'yamoo9',
    _students: [],
    printStudents: function () {
        // 객체 내부에서 사용된 함수 영역에서 객체에 접근할 수 있도록 _this에 참조.
        var _this = this; 
        // 여기서 this 는{_name: "yamoo9", _students: Array(0), printStudents: ƒ}
        this._students.forEach(function (student) {
            // 객체 내부 함수에서의 this 참조는 객체를 가리키지 않음.
            // console.log(this); // 데이터 없으면undefined 배열데이터있으면 window.
            console.log(_this._name + '은 ' + student + '학생을 알고 있습니다.');
        });
    }
};
// ES5
// 객체 정의
var y9 = {
    _name: 'yamoo9',
    _students: [],
    printStudents: function () {
        // forEach(fn[, thisArg]) 문법에서는 2번째 인자로 this를 대신할 인자를 전달 가능
        this._students.forEach(function (student) {
            console.log(this._name + '은 ' + student + '학생을 알고 있습니다.');
        }, this);
    }
};
// ES6
// 객체 정의
let y9 = {
    _name: 'yamoo9',
    _students: [],
    // == 객체 속성(메서드)에 화살표 함수를 사용하면 안된다.#####!!!
    // == this 참조가 객체가 아닌, 상위 영역을 참조하기 때문이다.
    printStudents: () => {
        // console.log(this); // Window{}
        // 객체의 속성으로 화살표 함수를 사용하면 
        // this는 y9 객체를 참조하지 않는다.
        // 고로 아래 코드는 제대로 작동하지 않는다.
        // TypeError: Cannot read property 'forEach' of undefined
        this._students.forEach(function (student) {
            console.log(`${_this._name}은 ${student} 학생을 알고 있습니다.`);
        });
    }
};
// ----------------------------------------------------


// ES5
// 제곱(square) 함수
function square() {
    // arguments 객체 참조
    var args = Array.prototype.slice.call(arguments);
    var _square = function () {
        var numbers = [];
        // 참조된 args 객체 순환
        args.forEach(function (arg) {
            numbers.push(arg * arg);
        });
        return numbers;
    };
    return _square();
}
// ES6
// 제곱(square) 함수
function square() {
    let _square = () => {
        let numbers = [];
        // 화살표 함수 내부 arguments 참조는 상위 영역 arguments
        for (let arg of arguments) {
            numbers.push(arg * arg);
        }
        return numbers;
    };
    return _square();
}


/**
 * arrow function
 * 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/%EC%95%A0%EB%A1%9C%EC%9A%B0_%ED%8E%91%EC%85%98
 * ———————————————————————————————————————————————————————————
 *
 * 함수 표현식에서는 적극 활용
 * 객체의 속성으로는 사용하지 말아야
 * 객체 속성 내부에서는 적극 활용해야
 *  - this, arguments 상위 영역 활용
 *
 */