// ——————————————————————————————————————————
// Default Parameters 
// 함수 매개변수 기본 값을 설정할 수 있습니다.
// ——————————————————————————————————————————

// ES5
// 필수 인자 체크 함수
function isRequired(name) {
    throw new Error(name + '매개변수는 전달인자 값을 필수로 요구합니다.');
}
// 사용자 전달 값 혹은 기본 매개변수 값 설정 함수
function defaultParam(param, defaults) {
    return typeof param !== ('undefined') ? param : defaults;
}

// 지불 내역 계산 함수 (가격, 세금, 할인)
function calcuratePayment(price, tax, discount) {
    if (!price) { isRequired('price') }
    tax = defaultParam(tax, 0.1);
    discount = defaultParam(discount, 0);
    return Math.floor(price * (1 + tax) * (1 - discount));
}

// ES6
function isRequired(name) {
    throw new Error(`${name} 매개변수는 전달인자 값을 필수로 요구 합니다.`);
}
function calcuratePayment(price = isRequired('price'), tax = 0.1, discount = 0) {
    return Math.floor(price * (1 + tax) * (1 - discount));
}

// calcuratePayment(); //Uncaught Error: price 매개변수는 전달인자 값을 필수로 요구 합니다.
// console.log( calcuratePayment(10000, 0.1, 0.165) ); // 9185

// 객체를 기본값으로 사용할 경우.
// 비구조 할당(Object Destructuring, ES6)활용
function calcuratePayment({ price = isRequired('price'), tax = 0.1, discount = 0 } = {}) {
    console.log(price);
    console.log(tax);
    console.log(discount);
    return Math.floor(price * (1 + tax) * (1 - discount));
}
// calcuratePayment();//Uncaught Error: price 매개변수는 전달인자 값을 필수로 요구 합니다.
// console.log(calcuratePayment({ price: 10000, discount: 0.165 }));// 9185  tax=0.1

// ----------------------------------------------------

// ——————————————————————————————————————————
// Rest Parameters
// 함수의 나머지 매개변수를 한데 모아 배열 값으로 사용 가능합니다.
// ——————————————————————————————————————————

// ES5
// 전달된 인자의 합을 구하는 함수
function sum() {
    // arguments는 배열 객체가 아니라, 유사 배열 객체이다.
    for (var i = arguments.length, r = 0, n; (n = arguments[--i]);) {
        r += n;
    }
    return r;
}

// ES6
// ES6 나머지 매개변수 & 화살표함수(식) 활용
function sum(...nums) {
    // 나머지 매개변수(Rest Parameter)는 배열 객체이다.
    let r = 0;
    nums.forEach(n => r += n);
    return r;
}

// 전달된 인자의 개수에 상관없이 사용 가능
// console.log( sum(2, 3, 10) );// 15
// console.log( sum(50, 100, 20, 30, 100) );// 300

// 응용편
// 임의의 수에 나머지 값을 순차적으로 곱한 결과를 반환하는 함수
function n_multiply(r, ...nums) {
    nums.forEach(n => r *= n);
    return r;
}
// 첫번쨰 인자 값에 나머지 인자 값을 순차적으로 곱함.
// console.log( n_multiply(100,1,2,3) ); // 600
// 전개 연산자를 사용하면 첫번째 인자를 뺀 나머지 값을 배열로 전달 가능.
// console.log( n_multiply(100,...[3,2,-1]) ); // -600

// ----------------------------------------------------

// ——————————————————————————————————————————
// Spread Operator
// 전개 연산자(...)는 함수 또는 배열 등에서 유용하게 활용됩니다.
// ——————————————————————————————————————————

// 정수 배열
var integer = [0, -10, 10];

// ES5: 배열 복제
var copy_integer = integer.map(function (int) {
    return int;
});
// console.log(copy_integer); // [0, -10, 10]

// Array.prototype.slice() 메서드 활용 
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
// 간단함! (직관적이진 않음)
var slice = Array.prototype.slice;
var copy_integer = integer.slice();
// console.log(copy_integer); // [0, -10, 10]

// ES6: 배열 복제
var copy_integer = [...integer];
// console.log(copy_integer); // [0, -10, 10]



// ES5: 배열(역)순차 결합
// 정수 배열
var integer = [0, -10, 10];

// 소수 배열
var decimal = [0.8, 0.43, 0.7823];

// 순차 결합
var numbers = integer.slice().concat(decimal);
// console.log(numbers);// [0, -10, 10, 0.8, 0.43, 0.7823]

// 유틸리티 함수
function combineArray() {
    for (var r = [], i = 0, a; (a = arguments[i++]);) {
        r = r.concat(a);
    }
    return r;
}
function reverseCombineArray() {
    return combineArray.apply(undefined, arguments).reverse();
}
// console.log(combineArray(integer, decimal)); //[0, -10, 10, 0.8, 0.43, 0.7823]
// console.log(reverseCombineArray(integer, decimal)); //[0.7823, 0.43, 0.8, 10, -10, 0]


// ES6: 배열(역)순차 결합
// 전개 연산자(...)를 배열 앞에 붙여 사용하면 배열 원소를 전개함(열어 펼침)
var numbers = [...integer, ...decimal];
console.log(numbers); //[0, -10, 10, 0.8, 0.43, 0.7823]
var r_numbers = numbers.reverse();
console.log(r_numbers); //[0.7823, 0.43, 0.8, 10, -10, 0]




// ES5: 배열 중간 삽입 결합
// 정수
var integer = [3, 6, 9];
// 소수
var decimal = [0.9, 0.66];
var numbers = integer.slice(), // 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 수정되지 않습니다.
    idx = 2;
decimal.forEach(function (int) {
    // 중간 삽입 결합 (index 2위치에 삽입)
    numbers.splice(idx++, 0, int);
});
// console.log(numbers); //[3, 6, 0.9, 0.66, 9]

// 유틸리티 함수
function insertCombineArray(o1, n, o2) {
    var copy = o1.slice();
    o2.forEach(function (i) {
        copy.splice(n++, 0, i);
    });
    return copy;
}
// o1배열 index 2 위치에 o2배열 삽입
var numbers = insertCombineArray(integer, 2, decimal);
// console.log(numbers);// [3, 6, 0.9, 0.66, 9]


// ES6: 배열 중간 삽입 결합
// 중간 삽입 결합 (index 2 위치에 삽입)
var numbers = [3, 6, ...decimal, 9];
// console.log(numbers); // [3, 6, 0.9, 0.66, 9]

// ----------------------------------------------------



// ——————————————————————————————————————————
// Practical Example
// 함수, 배열에 전개 연산자를 사용한 예제
// ——————————————————————————————————————————

// 멤버 객체
// 멤버 데이터
var members = [
    {
        "gender": "male",
        "name": "hudson lewis",
        "email": "hudson.lewis@example.com",
        "picture": "https://randomuser.me/api/portraits/thumb/men/65.jpg"
    }, {}
];
// 새롭게 추가될 멤버 데이터
var new_members = [
    {
        "gender": "female",
        "name": "gina reynolds",
        "email": "gina.reynolds@example.com",
        "picture": "https://randomuser.me/api/portraits/thumb/women/35.jpg"
    }, {}
];

// 커뮤니티 매니저
// 커뮤니티 매니저 객체
var communityManager = {
    _members: members,
    // ES5: addMembers 메서드 정의.
    addMembers: function () {
        var new_members = [].slice.call(arguments); // 복사
        new_members.forEach(function (member) {
            this._members.push(member);
        }, this);
    }
};
// ES5: 새로운 멤버들 추가.
communityManager.addMembers.apply(communityManager, new_members);
// console.log(members); // (4) [{…}, {…}, {…}, {…}]

var communityManager = {
    _members: members,
    // ES6: addMembers 메서드 정의.
    addMembers: function (...mems) {
        this._members = [...this._members, ...mems];
        // console.log(this._members); //(4) [{…}, {…}, {…}, {…}]
        // console.log(members); //(2) [{…}, {…}]
        members = this._members;
    }

};
// ES5: 새로운 멤버들 추가.
communityManager.addMembers(...new_members);

// console.log(communityManager._members);// (4) [{…}, {…}, {…}, {…}]
// console.log(members);// (4) [{…}, {…}, {…}, {…}]

// ----------------------------------------------------

/**
 * default, rest parameters / spread operator
 * default https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/Default_parameters
 * rest    https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/rest_parameters
 * spread  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * ———————————————————————————————————————————————————————————
 *
 * 함수의 매개변수 기본 값 설정은 기존의 번거로움을 대폭 줄여준다.
 * 전개 연산자(...)를 배열 또는 함수와 함께 사용하면 매우 유용하다.
 * - 배열에 사용할 경우, 배열을 전개한다.
 * - 함수의 매개변수에 전개 연산자를 사용할 경우, 나머지 매개변수는 배열으로 사용할 수 있다.
 */











