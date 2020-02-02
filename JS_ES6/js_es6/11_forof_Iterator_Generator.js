// ——————————————————————————————————————————
// for ~ of & Iterator & Generator
// 반복 가능한 객체를 순환하는 새로운 반복문 및 제너레이터 활용
// ——————————————————————————————————————————

// for / for~in / forEach
// ES5에서 자주 사용되는 반복문은 for, for ~ in, forEach() 등이 있습니다.
// ——————————————————————————————————————————

// ES5
// 배열
var sports_shoes = ['조깅화', '축구화', '농구화'];
// for문
for (var i = 0, l = sports_shoes.length; i < l; i++) {
    if (sports_shoes[i] === '축구화') { continue; }
    console.log(sports_shoes[i]); // 조깅화 농구화
}
// for~in문(주의! 느림, 배열이 아닌 객체 순환 용도)
for (const i in sports_shoes) {
    if (sports_shoes[i] === '축구화') { break; }
    console.log(sports_shoes[i]); // 조깅화
}
// forEach문 (주의! 기본적으로 배열만 활용 가능)
sports_shoes.forEach(function (shoes, index) {
    // 문법 오류: forEach문은 break, continue 사용 안됨!
    // if (shoes === '축구화') { continue; } // Illegal continue statement: no surrounding iteration statement
    console.log(sports_shoes[index]);
});


// for~of
// ES6부터 새롭게 지원하는 반복문으로 for~in, forEach() 등을 대체합니다.
// ——————————————————————————————————————————

// ES6
// 반복 가능한 객체(배열, 유사배열, 문자열, 맵, 세트 등)
let sports_shoes = ['조깅화', '축구화', '농구화'];

// 반복 가능한 객체 순환
for (let shoes of sports_shoes) {
    console.log(shoes); //조깅화 축구화 농구화
}

for (const shoes of sports_shoes) {
    if (shoes === '축구화') { continue; }
    console.log(shoes); //조깅화 농구화
}

// [].entries()  >리턴>  Array Iterator {}     [0, "조깅화"][1, "축구화"][2, "농구화"]
for (let [index, item] of sports_shoes.entries()) {
    console.log(`index: ${index} , item: ${item}`);
    // index: 0, item: 조깅화 index: 1 , item: 축구화 index: 2 , item: 농구화
}

function loopArguments() {
    let args = [...arguments].entries();
    // console.log(args);// Array Iterator {}  __proto__: Array Iterator
    for (let [i, arg] of args) {
        console.log(`${i} => ${arg}`);
    }
}
loopArguments(2,3,4,'first',[1,5]);
// 0 => 2
// 1 => 3
// 2 => 4
// 3 => first
// 4 => 1,5

// 전개 연산자(...)를 사용할 경우
function loopArguments(...args) {
    for (let [i, arg] of args.entries()) {
        console.log(`${i} => ${arg}`);
    }
}


// for~of 사용 시, 주의할 점!
let sports_shoes = ['조깅화', '축구화' ,'농구화'];

// 유사 배열 객체
let like_array_obj = {length: 3, 0: '조깅화', 1:'축구화', 2:'농구화'};

// 유사 배열 객체는 반복 가능한 객체(Iterator)가 아님.
// for~of 문을 사용할 수 없다.
for (let v of like_array_obj) { 
    // index.js:83 Uncaught TypeError: like_array_obj is not iterable
}

// 유사 배열 객체를 반복 가능한 객체(Iterator)로 변경해야 for~of 문 사용 가능.
// [...] 구문은 사용하면 오류. Array.from() 메서드 사용해야 한다.
// Array.from(like_array_obj) // ["조깅화", "축구화", "농구화"]
// Array.from(like_array_obj).entries() // Array Iterator {}
for (let v of Array.from(like_array_obj).entries()) {
    console.log(v);
}
// [0, "조깅화"]
// [1, "축구화"]
// [2, "농구화"]


// for~of문을 var, let, const와 사용할 때 주의할 점! 
// 배열 객체
let print_sports_shoesFn = [];

// const, let 동일한 결과
for (const shoes of ['조깅화', '축구화', '농구화']) {
    print_sports_shoesFn.push( () => shoes );// 함수 담기.
}

// map은 배열의 각 요소에 대해 정의 된 콜백 함수를 호출하고 결과가 포함 된 배열을 반환합니다.
console.log(print_sports_shoesFn.map(f => f())); // ["조깅화", "축구화", "농구화"]
console.log(shoes); // Uncaught ReferenceError: shoes is not defined


// var 를 사용할 경우, 문제 발생.
for (var shoes of ['조깅화', '축구화', '농구화']) {
    print_sports_shoesFn.push( () => shoes );
}
console.log(print_sports_shoesFn.map(f => f())); // ["농구화", "농구화", "농구화"]
console.log(shoes); // 농구화



// Iterator
// ES6부터 새롭게 추가된 프로토콜인 반복 가능한(Iterable) 객체와 
// 연속된 값을 만드는 표준 방법 정의(Iterator)에 관한 개념 이해가 필요합니다.
// ——————————————————————————————————————————

// ES6: Iterable 프로토콜
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#iterable

// 반복 가능한 객체
//   반복 가능한 빌트인 객체는 Array, Array-Like, String, Typed Array, Set, Map, WeakSet, WeakMap 등이 있습니다.
//   이와 같은 객체는 for ~of문을 통해 값들을 반복하여 처리하는 동작을 정의하거나 사용자 정의하는 것을 허용합니다.

// 반복 가능한 객체의 조건
//   반복 가능한 조건은 객체에 @@iterator 메소드가 구현되어 있어야 합니다.
//   즉, 객체가 [Symbol.iterator]속성(메서드)을 가져야 하며 인자 없이 호출되고 Iterator 객체를 반환해야 합니다.

// 반복 가능한 객체
const iterable_obj = {
    // 반복 가능한 객체의 조건
    [Symbol.iterator]: function() {
        // Iterator 객체 반환.
    }
};


// ES6: Iterator 프로토콜
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols#iterator

// Iterator 객체
//   객체가 next메서드를 통해 {value, done}을 반환 합니다.
//   value는 JS의 모든 데이터 유형이 가능하며 done은 Boolean값을 반환 합니다.

// next 메서드 & 반환 객체
const iterable_obj = {
    // 반복 가능한 객체의 조건
    [Symbol.iterator]: function() {
        // Iterrator 객체 반환
        return {
            // next 메서드를 가짐(value, done 속성을 가진 객체 반환)
            next: function() {
                return {value, done};
            }
        };
    }
};


// ES6: 빌트인 Iterator 객체

// 반복 가능한(iterable) 빌트인 객체: Array
const array = [99, 9, 0];

// Iterator 객체 참조
const iterator = array[Symbol.iterator]();

// Iterator 객체의 next 메서드 사용
console.log( iterator.next() ); // {value: 99, done: false}
console.log( iterator.next() ); // {value: 9, done: false}
console.log( iterator.next() ); // {value: 0, done: false}
console.log( iterator.next() ); // {value: undefined, done: true}


// ES6: 사용자 정의 Iterator 객체
// 일반 객체를 반복 가능한 객체로 변경하기 위해서는 
// 반복 가능한(iterable) 객체의 조건이 필요하다.
const o = {
    propA: 'A',
    propB: 'B',
    // 반복 가능한 객체의 조건
    [Symbol.iterator](){
        // 속성 값 참조를 위한 인덱스 변수
        let i = 0;
        // 객체의 속성(key) 집합 정렬 후 변수에 참조
        let keys = Object.keys(this).sort();
        return {
            // next() 메서드
            next() {
                return {value: keys[i], done: i++ >= keys.length};
            }
        };
        
    }
};

// / Iterator 객체 참조
const o_iterator = o[Symbol.iterator]();

// Iterator 객체의 next 메서드 사용
console.log( o_iterator.next() ); // { value: 'propA', done: false }
console.log( o_iterator.next() ); // { value: 'propB', done: false }
console.log( o_iterator.next() ); // { value: undefined, done: true }



// Generator
// Generator 객체는 제너레이터 함수로 부터 반환된 값이며 반복자와 반복자 프로토콜을 준수합니다.
// ——————————————————————————————————————————

// ES6: Generator & yield
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/yield

// 제너레이터 함수
function* idMaker(){
    let index = 0;
    while (true) {
        yield index++;
    }
}
// 제너레이터 객체 참조
var gen = idMaker(); //// "Generator { }"
// console.log(idMaker()); // idMaker {<suspended>}  __proto__: Generator
console.log(gen.next()); //{value: 0, done: false}
console.log(gen.next().value); // 1
console.log(gen.next()); //{value: 2, done: false}


// ES6: 사용자 정의 Iterator + Generator
// 반복 가능한(iterable) 객체
const o = {
    proA: 'A',
    proB: 'B',
    // 반복 가능한 객체의 조건
    // 제너레이터 함수
    [Symbol.iterator]: function* (){
        // 객체의 속성(key) 집합 정렬 후 변수에 참조
        let keys = Object.keys(this).sort();
        
        // key 반복 가능한 객체를 순환
        for (let key of keys) {
            // 제너레이터 객체의 next() 메서드를 사용할 때마다
            // 제너레이터를 멈추고 값을 반환
            yield key;
        }
    }
};
// Iterator 객체 참조
const o_iterator = o[Symbol.iterator]();
console.log(o_iterator.next());// { value: "proA", done: false }
console.log(o_iterator.next()); // { value: 'propB', done: false }
console.log(o_iterator.next()); // { value: undefined, done: true }



// ES6: 피보나치 수열 제너레이터

// 파보나치 수열을 반환하는 제너레이터 함수
function* fibonacci(n=1){
    // current, next 변수 초기화
    let current = 0;
    let next = 1;

    // 조건이 거짓일 때까지 반복
    while (n--) {
        // 제너레이터를 멈춘 후 반환하는 값
        yield current;
        // current, next 업데이트
        [current, next] = [next, current + next];
    }
}
// 피보나치 수열 제너레이터 참조
let fibo5 = fibonacci(5);
// next() 메서드의 반환 값 출력
console.log(fibo5.next());// {value: 0, done: false}
console.log(fibo5.next().value); // 1
console.log(fibo5.next().value); // 1
console.log(fibo5.next().value); // 2
console.log(fibo5.next().value); // 3
console.log(fibo5.next().value); // undefined

// 피보나치 수열을 값으로 하는 배열 참조 (제너레이터 함수, 비 구조화 할당 사용)
// [] 내부에서 전개연산자(...)를 사용하면 Iterator 객체를 순환 처리
let [...fibo14] = fibonacci(14);
console.log(fibo14);// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]



/**
 * for ~ of
 * Iterator
 * Generator
 *
 * for~of    https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/for...of
 * Iterator  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Iteration_protocols
 * Generator https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Generator
 * ———————————————————————————————————————————————————————————
 *
 * for 문은 코드 작성에 수고가 많이 들고,
 * for~in 문은 객체를 순환할 때나 사용하고,
 * forEach 문은 코드가 간결하나 break, continue 사용할 수 없는데 반해
 * for~of 문은 코드가 간결하고 break, continue 사용할 수 있는 장점을 지님.
 *
 * 반복 가능한(iterable) 객체와 반복자(iterator)를 통해 객체 속성 순환.
 *
 * 제너레이터(geterator), yield를 활용하면 강력한 반복 알고리즘 처리 가능.
 *
 */




