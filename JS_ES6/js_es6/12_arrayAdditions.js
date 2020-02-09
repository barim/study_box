// ——————————————————————————————————————————
// Array Additions
// 확장된 배열 객체 능력 활용
// ——————————————————————————————————————————

// Array Static Methods
// 배열 생성자 메서드(Static Methods)를 사용해 배열 또는 배열과 유사한 객체를 손쉽게 활용할 수 있습니다.
// ——————————————————————————————————————————

// ES5
// DOM 객체 수집(Collection) = NodeList
// lis 변수에 참조된 값은 length 속성을 가진 유사 배열 객체
var lis = document.querySelectorAll('ul.demo li');
console.log(typeof lis); // object
console.log(lis.toString()); // [object NodeList]
console.log(lis.constructor); // NodeList() { [native code] }

// 유틸리티 함수
function makeArray(o) {
    return Array.prototype.slice.call(o);
}

// 유틸리티 함수 makeArray()를 사용하여 lis 유사 배열을 배열로 변경
makeArray(lis).forEach(function(li) {
    console.log(li);// li 순환
});


// ES6: Array.from
//https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from

// DOM 객체 수집(Collection) = NodeList
// lis 변수에 참조된 값은 length 속성을 가진 유사 배열 객체
var lis = document.querySelectorAll('ul.demo li');

// Array.from() 네이티브 Array 메서드를 사용하여 lis 유사 배열을 배열로 변경
Array.from(lis).forEach(li => console.log(li)); // <li>순환

// 전개 연산자(...)를 사용할 수도 있다.
[...lis].forEach(li => console.log(li));



// ES5
// DOM 객체 수집(Collection) = NodeList
// links 변수에 참조된 값은 length 속성을 가진 유사 배열 객체
var links = document.querySelectorAll('ul.demo a');

// Array 객체의 .map() 메서드를 빌려 links에 사용
var links_content = Array.prototype.map.call(links, function(link) {
    return link.textContent;
});
console.log(links_content);// ["1", "2", "3"]

// ES6: Array.from
var links = document.querySelectorAll('ul.demo a');
// Array.from() 메서드를 사용하여 links 객체를 배열로 변경 후, .map() 메서드 사용
var links_content = Array.from(links).map(link => link.textContent);
console.log(links_content);// ["1", "2", "3"]



// ES5
// 0부터 100까지 채운 배열을 필요할 경우
var arry_101 = [];
for(var i=0, l=100; i<=l; ++i){
    arry_101[i] = i;
}
console.log(arry_101);

// ES6: Array.from
const array_101 = Array.from(new Array(101), (x,i) => {
    // console.log(`x >> ${x}`);// x >> undefined
    // console.log(`i >> ${i}`);// i >> 0 ~ 100
    return i;
});
console.log(array_101); // [0, 1, ... , 100]



// ES5
// new Array() 구문에 첫번째 인자로 숫자를 사용할 경우 기대와 다른 결과를 확인할 수 있다.
var dataList = new Array(3); // [undefined, undefined, undefined]
console.log(dataList.length); // 3
// 첫번째 인자로 소숫점을 포함하는 숫자를 전달할 경우 오류가 발생한다.
// new Array() 에 첫번째로 전달된 숫자를 포함하는 아이템 개수를 설정하기 때문
var dataList = new Array(2.1); // Uncaught RangeError: Invalid array length


// Array 리터럴을 사용할 경우 기대와 같은 결과를 확인 할 수 있어 대부분의 경우 리터럴 사용을 권장한다.
var dataList = [3]; // [3]
console.log(dataList.length);// 1


// ES6: Array.of
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/of

// Array.of(...item) 메서드를 사용할 경우
// new Array() 구문에서 살펴본 기대 밖의 결과를 비켜갈 수 있다.
const data = Array.of(3); // [3]
console.log(data.length); // 1

// Array.of(item1, item2, ... , itemN)
// HTML 자식 요소(Children) 수집(배열)
let html_children = Array.of(document.body, document.head);
console.log(html_children); // [body, head]
for (let child of html_children) {
    console.log(child);
}



// Array.prototype Methods
// 유용한 Array 객체 인스턴스 메서드가 새롭게 추가되었습니다.
// ——————————————————————————————————————————

// ES5
var numbers = [100,105, 103, 109];
// for문
for (var i = 0, l = numbers.length; i < l; i++) {
    console.log(i, numbers[i]);
}
// 0 100
// 1 105
// 2 103
// 3 109

// forEach문
numbers.forEach(function(n,i) {
   console.log(i, n);
});
// 0 100
// 1 105
// 2 103
// 3 109


// ES6: keys & values & entries
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/values
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/entries

let numbers = [100,103,108,105];

// for~of문 + Array.prototype.keys
for (let index of numbers.keys()) {
    console.log(index);
}
// 0 
// 1
// 2
// 3

// for~of문 + Array.prototype.values
for (let value of numbers.values()) {
    console.log(value);
}
// 100
// 103
// 108
// 105

// for~of문 + Array.prototype.entries
for (let [index , value] of numbers.entries()) {
    console.log(index, value);
}
// 0, 100
// 1, 103
// 2, 108
// 3, 105


let nums = [100, 105, 103, 109];

// Array.prototype.keys
console.log(Array.from(nums.keys())); // [0, 1, 2, 3]

// Array.prototype.values
console.log(Array.from(nums.values())); // [100, 105, 103, 109]

// Array.prototype.entries
console.log(Array.from(nums.entries())); // [Array(2), Array(2), Array(2), Array(2)]
// Array.from() 대신 전개 연산자(...)를 사용해도 된다.
console.log( [...nums.entries()] ); // [Array(2), Array(2), Array(2), Array(2)]
// [ [0, 100],[1, 105],[2, 103],[3, 109] ]


// ES5
var numbers = [100, 105, 103, 109];

// 배열 아이템을 찾는 유틸리티 함수
function findItemArray(array, cb) {
    for (var i = 0, l = array.length; i < l; i++) {
        if ( cb(array[i], i, array) ) {
            return array[i];
        }
    }
}
// 유틸리티 함수를 사용해 조건에 부합하는 첫번째 아이템 반환
var item = findItemArray(numbers, function(item, index, array) {
    return item > 100 && item < 105;
});
console.log(item); // 103


// ES6: find
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find

var nums = [100, 105, 103, 109];
// Array.prototype.find 메서드 활용
var item = nums.find((item) => item>100 && item<105);
console.log(item); // 103


// ES5
var numbers = [100, 105, 103, 109];
// 배열 아이템 인덱스를 찾는 유틸리티 함수
function findItemIndexArray(array, cb) {
    for (var i = 0, l =array.length; i < l; i++) {
        if ( cb(array[i], i, array) ) {
            return i;
        }
    }
    return -1;
}
// 유틸리티 함수를 사용해 조건에 부합하는 첫번째 아이템 인덱스를 반환.
var item = findItemIndexArray(numbers, function(item) {
    return item > 105;
});
console.log(item); // 3  즉 109


// ES6: findIndex
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex

var nums = [100, 105, 103, 109];
// Array.prototype.findIndex 메서드 사용
var item = nums.findIndex((item) => item > 105);
console.log(item); // 3

// indexOf vs findIndex
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

// Array.prototype.indexOf
var temp = [false, 10, NaN, {}].indexOf(10);
console.log(temp); // 1

// Array.prototype.findIndex
var temp = [false, 10, NaN, {}].findIndex((x) => x === 10);
console.log(temp); // 1

// Array.prototype.indexOf
// === 비교
// NaN === NaN // false
var temp = [false, 10, NaN, {}].indexOf(NaN);
console.log(temp);// -1

// Array.prototype.findIndex
// Object.is() 비교
// Object.is(NaN,NaN) // true
var temp = [false, 10, NaN, {}].findIndex((x) => Object.is(x, NaN));
console.log(temp);// 2


// ES5
var numbers = [100, 105, 103, 109];
// 배열 아이템이 포함 되었는지 확인하는 유틸리티 함수
function isIncludeItemArray(array, item) {
    return array.indexOf(item) > -1;
}
// 유틸리티 함수를 사용해 아이템이 포함 되어있는지 유무 확인
if (!isIncludeItemArray(numbers, 107)) {
    numbers.push(107);
}
console.log(numbers);// (5) [100, 105, 103, 109, 107]


// ES6: includes
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

var numbers = [100, 105, 103, 109];
// Array.prototype.includes 메서드를 사용해 아이템이 포함 되었는지 유무 확인
if (!numbers.includes(107)) {
    numbers.push(107);
}
console.log(numbers);// [100, 105, 103, 109, 107]



// ES5
var numbers = [100, 105, 103, 109];
// 배열 아이템을 모두 동일하게 채우는 유틸리티 함수
function fillItemArray(array, item, start, end) {
    start = start || 0;
    end   = end || array.length;
    return array.map(function(t, i) {
        if (i >= start && i< end) {
            return item;
        } else {
            return t;
        }
    });
}
console.log(fillItemArray(numbers, {})); // [{}, {}, {}, {}]
console.log(fillItemArray(numbers, {}, 1, 3)); // [100, {}, {}, 109]


// ES6: fill
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill

var numbers = [100, 105, 103, 109];
// Array.prototype.fill 메서드를 사용해 배열 아이템을 모두 교체
console.log(numbers.fill({})); // [{}, {}, {}, {}]
// Array.prototype.fill 메서드를 사용해 배열 아이템을 부분 교체
console.log(numbers.fill({}, 1, 3)); // [{}, {}, {}, {}]
console.log(numbers.fill({ test: 't' }, 1, 3)); // [{}, {test: "t"}, {test: "t"}, {}]


// Array.from() 메서드 활용
// 모두 교체.
numbers = Array.from(numbers, x => ({})); // [{}, {}, {}, {}]

// 부분 교체
let start = 1, end = 3;
numbers = Array.from(numbers, (x, i) => {
    if (i > start && i < end) {
        return {};
    } else {
        return x;
    }
});
console.log(numbers); // [100, 105, {}, 109]


// ES6: copyWithin
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin

// Array.prototype.copyWithin(target, start=0, end=this.length)

var numbers = [100, 105, 103, 109];
// 0부터 (4-1)까지 아이템을 복사한 후, 1위치부터 붙여넣음
console.log(numbers.copyWithin(1)); // target: 1, start: 0, end: 4
// [100, 105, 103, 109]  ->  [100, 100, 105, 103]

// 0부터 (4-1)까지 아이템을 복사한 후, -2(끝에서 2번째) 위치부터 붙여넣음
console.log(numbers.copyWithin(-2)); // target: -2, start: 0, end: 4
// [100, 105, 103, 109]  ->  [100, 105, 100, 105]

// 0부터 (4-1)까지 아이템을 복사한 후, 1 위치부터 붙여넣음
console.log(numbers.copyWithin(1, 2)); // target: 1, start: 2, end: 4
// [100, 105, 103, 109]  ->  [100, 103, 109, 109]

// 0부터 (2-1)까지 아이템을 복사한 후, 1 위치부터 붙여넣음
console.log(numbers.copyWithin(2, 1, 2)); // target: 2, start: 1, end: 2
// [100, 105, 103, 109]  ->  [100, 105, 105, 109]

// -2부터 -3까지 아이템을 복사한 후, -3(끝에서 3번째) 위치부터 붙여넣음
console.log(numbers.copyWithin(-3, -2)); // target: -3, start: -2, end: 4
// [100, 105, 103, 109]  ->  [100, 103, 109, 109]



/**
 * Array Additions
 *
 * Array.from                 https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from
 * Array.of                   https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/of
 * Array.prototype.keys       https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
 * Array.prototype.values     https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/values
 * Array.prototype.entries    https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/entries
 * Array.prototype.find       https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * Array.prototype.findIndex  https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 * Array.prototype.includes   https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/includes
 * Array.prototype.fill       https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
 * Array.prototype.copyWithin https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin
 * ———————————————————————————————————————————————————————————
 *
 * 배열은 데이터 관리에 자주 사용되는 객체로 새롭게 추가된
 * 스태틱 메서드, 프로토타입 인스턴스 메서드를 적극 활용
 *
 */