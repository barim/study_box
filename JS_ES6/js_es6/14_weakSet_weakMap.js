// ——————————————————————————————————————————
// WeakSet & WeakMap
// 위크 세트, 위크 맵 활용
// ——————————————————————————————————————————

// WeakSet
// WeakSet 객체는 Set 객체와 유사합니다만, 
// Set 객체와 달리 객체만 수집할 수 있고 약한 참조가 이루어져 메모리 누수를 예방할 수 있습니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// ——————————————————————————————————————————

// Set vs WeakSet

// 데이터(객체)
let arr = [1,3,5,7],
    obj = {key: 'value'};

// Set 객체 생성
let set = new Set();

// WeakSet 객체 생성
let wset = new WeakSet();

// 아이템 추가
set.add(arr).add(obj);
wset.add(arr).add(obj);

// 아이템 사이즈
console.log(set, set.size); // Set(2) {Array(4), {…}} , 2
console.log(wset, wset.size); // WeakSet {{…}, Array(4)} , undefined

// 객체가 아닌 데이터 추가
set.add(true);
wset.add(true);// Uncaught TypeError: Invalid value used in weak set

// 아이템 소유 여부 확인
set.has(obj); // true
wset.has(obj); // true

// 아이템 제거
set.delete(arr); // true
wset.delete(arr); // true

// 세트 순환
set.forEach((item) => console.log(item));// 참조된 데이터에 접근 및 사용 가능
wset.forEach((item) => console.log(item));// TypeError: wset.forEach is not a function

// 메모리 참조
let set = new Set();
let wset = new WeakSet();

( () => {
    let o1 = {a: 1};// 메모리
    let o2 = {a: 2};// 가비지 컬렉터에 의해 메모리 삭제
    
    set.add(o1);
    wset.add(o2);
} )();

console.log(set); // Set(1) {{…}}  0:Object
console.log(wset); // WeakSet {{…}}  No properties


// WeakSet 객체 생성
let ownClass = new WeakSet();

// 클래스 OffCanvasMenu 정의
class OffCanvasMenu {
    // 생성자
    constructor(){
        // 클래스 자신을 ownClass에 추가
        ownClass.add(this);
        // ...
    }
    // 인스턴스 메서드
    toggle(){
        // OffCanvasMEnu 객체가 아닌
        // 다른 객체가 toggle() 메서드를 사용하려 할 경우 오류 출력
        if (!ownClass.has(this)) {
            throw new TypeError(`toggle() 메서드는 OffCanvasMenu 객체만 사용 가능합니다.`);
        }
    }
}



// WeakMap
// WeakMap 객체는 Map 객체와 유사하지만, 
// Map 객체와 달리 객체만 수집할 수 있고 약한 참조가 이루어져 메모리 누수를 예방할 수 있습니다.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// ——————————————————————————————————————————

// Map vs WeakMap

// 데이터(객체)
let arr = [1, 3, 5, 7],
    obj = { key: 'value' };

// Map 객체 생성
let map = new Map();

// WeakMap 객체 생성
let wmap = new WeakMap();

// 아이템 추가
map.set(arr, 'Array').set(obj, 'Object');
wmap.set(arr, 'Array').set(obj, 'Object');

// 아이템 사이즈
console.log(map.size);// 2
console.log(wmap.size);// undefined

// 객체가 아닌 데이터 추가
map.set(true, 'yes');
wmap.set(true, 'yes'); // TypeError: Invalid value used as weak map key

// 아이템 소유 여부 확인
console.log(map.has(obj)); // true
console.log(wmap.has(obj)); // true

// 세트 순환
map.forEach((item) => console.log(item)); // 참조된 데이터에 접근 및 사용 가능
wmap.forEach((item) => console.log(item)); // TypeError: wmap.forEach is not a function

// 메모리 참조
let map = new Map();
let wmap = new WeakMap();

(() => {
    let o1 = {a: 1}; // 메모리
    let o2 = {a: 2}; // 가비지 컬렉터에 의해 메모리 삭제

    map.set(o1, '가비지 컬렉터에 의해 제거되지 않음');
    wmap.set(o2, '가비지 컬렉터에 의해 제거됨');
})();
console.log(map);
// Map(1) { { … } => "가비지 컬렉터에 의해 제거되지 않음" }
    // 0: { Object => "가비지 컬렉터에 의해 제거되지 않음" }
        // key: { a: 1 }
        // value: "가비지 컬렉터에 의해 제거되지 않음"
console.log(wmap);
// { { … } => "가비지 컬렉터에 의해 제거됨" }
    // No properties


// 비공개 속성을 관리하기 위한 WeakMap 객체 생성
let _ = new WeakMap();

// 클래스 OffCanvasMenu 정의
class OffCanvasMenu {
    // 생성자
    constructor(el, options){
        // WeakMap 객체를 사용해 비공개 속성 설정
        _.set(this, {el, options});
        // ...
    }
    // 인스턴스 메서드
    toggle(){
        // 비공개 속성에 접근 가능한 $ 변수 참조
        let $ = _.get(this);
        // 비공개 속성 el에 접근 하여 조작
        $.el.classList.toggle('is-active');
    }
}

/**
 * WeakSet, WeakMap
 *
 * WeakSet https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
 * WeakMap https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
 * ———————————————————————————————————————————————————————————
 *
 * Set, Map과 유사하지만, 다음과 같은 특징을 가짐
 *
 * 특징
 * - 객체 유형만 저장 가능 (원시데이터 불가능)
 * - 열거(Enumerable) 불가능
 * - 약한 참조 (메모리 누수 방지)
 */










