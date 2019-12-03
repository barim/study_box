// ---------------------------
// let, const //

// let 선언은 블록 유효범위를 갖는 지역변수를 선언하는 점에서 var 선언과 차이점이 있다.

// const 선언은 값에 읽기 전용 참조를 생성한다.
// 담긴 값이 불변임을 뜻하는게 아닌 단지 그 변수 식별자는 다른 데이터로 재 할당 될수 없다.

// let 키워드 도입 [ES6]
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let

// 블록 영역 & let, const
// ECMAScript2015(ES6)부터는 블록(Block)영역을 선택적으로 지원 한다.
// let, const 키워드를 사용해서 변수를 선언할 경우 블록 영역을 가지게 된다.


var message = 'ECMAScript v5';
console.log('전역(1) message: ', message);
// 전역(1) message: ECMAScript v5

{ // let, const 사용.
    let message = 'JavaScript';
    console.log('블록{} 영역 message: ', message);
    // 블록{} 영역 message: JavaScript
    const msg_list = [];
    console.log('블록{}  영역 message: ', msg_list);
    // 블록{} 영역 message: []
}

function scope() {
    var message = 'Function Scope';
    console.log('함수 영역 message: ', message);
}
scope();

console.log('전역(2) message: ', message);
// 전역(2) message: ECMAScript v5
console.log('전역(2) msg_list: ', msg_list);
// Uncaught ReferenceError: msg_list is not defined at index.js





// ------------------------------------
// 클로저 & 블록영역 & 함수 실행시점 //
// 반복문에 let 키워드를 사용해 블록 영역을 만들어 사용하면 
// 난해한 JS 클로저를 사용하지 않고도 문제를 쉽게 해결 할 수 있다.

var fn_list = [];

for (let i = 0, l=10; i < l; i++) {
    fn_list.push(function() {
        // 함수 영역
        console.log(i);
    });
    console.log('반복문 내부 i: ',i);
}

// 배열 데이터 순환 처리(콜백)
fn_list.forEach(function(f) {
    f();
}); 



// ------------------------------------
// var , let , const 키워드를 비교 정리.

var varV = 'var변수';
let letV = 'let변수';
const constV = {type: '상수'};

// 중복선언을 하더라도 문제가 발생하지 않는다.
var varV = function(){};

// 동일한 이름이 중복 선언되면 오류 발생.
// Uncaught SyntaxError: Identifier 'letVar' has already been declared 
let letV = false;

// 상수에 초기 설정된 값을 다른 유형으로 변경하면 오류 발생.
// TypeError: Assignment to constant variable.
constV = [];


var varV;
console.log(varV); // 초기 값: undefined 할당.
varV = 'var 변수'; // 값 교체 할당.

let letV;
console.log(letV);
letV = 'let변수';

// [오류 발생] 선언 후, 값을 할당할 수 없음.
const constV; // Uncaught SyntaxError: Missing initializer in const declaration
constV = {type: '상수'};


// -----------------------------------------------------------------------
// var 키워드를 사용해 전역에 선언할 경우, window객체의 속성으로 접근 가능하다.
// 반면 let, const 키워드를 사용할 경우는 window객체의 속성으로 접근할 수 없다.
var d_name = '델루나';
window.d_name; // "델루나"
let d_type = '드라마';
window.d_type; // undefined



// ----------------------------------------------------------------------
// const
// 상수의 경우 값 자체를 다른 값으로 바꿀 수는 없지만,
// 객체 / 배열의 경우 값의 아이템을 추가,변경 할 수 있다.

const o = {};
o.name = 'const variable';

console.log(o); // Object {name: "const variable"}

o.shoot = 'Goal';

console.log(o); // Object {name: "const variable", shoot: "Goal"}

delete o.name; // true

console.log(o); // Object {shoot: "Goal"}

delete o; // false

console.log(o); // Object {shoot: "Goal"}



// ----------------------------------------------------

 /* * var vs let vs const
 * let     https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let
 * const   https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const
 * ——————————————————————
 *
 * var
 * - 함수영역(function scope)
 * - 초기 값 할당이 없으면: undefined
 * - 가급적 사용하지 않는 것이 좋지만, 사용해야 한다면 Top Level에서만 사용.
 * - 전역에서 선언 시, window 객체의 속성으로 접근 가능.
 *
 * let, const
 * - 블록영역(block scope)
 * - 초기 값 할당이 없으면: ReferenceError
 * - 데이터 값 변경이 필요한 경우라면 let 사용 권장.
 * - 전역에서 선언 해도, window 객체의 속성으로 접근 가능하지 않음.
 *
 * const
 * - 초기 값 할당이 필수!
 * - 값 유형 변경은 허용하지 않지만,
 * - 배열 / 객체 유형의 경우 새로운 아이템 추가, 변경 가능.
 * - 데이터 값 유형이 배열 / 객체일 경우 사용 권장.
 */





