// ——————————————————————————————————————————
// Object Enhancements & Symbol
// 향상된 객체 표기법 & 심볼 활용
// ——————————————————————————————————————————

// ——————————————————————————————————————————
// Object Ehancements
// 객체 표기법이 보다 향상되어 사용하기 유용해 졌습니다.
// ——————————————————————————————————————————

// ES5
var name = 'SM7';
var maker = 'Samsung';
var boost = function(){};
// car객체 정의
var car = {
    go: function(){},
    stop: function(){},
    boost: boost
};

// 객체 합성 함수
function mixin() {
    var objs = Array.prototype.slice.call(arguments);
    var mixin_o = {};
    objs.forEach(function(o) {
        for (const p in o) {
            var v = o[p];
            if (o.hasOwnProperty(p)) {
                mixin_o[p] = v;
            }
        }
    });
    return mixin_o;
}

// car객체의 능력을 복사한 후, 자신만의 속성을 가진 객체 정의.
var newbee = mixin(car, {name: name, maker: maker});
// console.log(newbee);// {name: "SM7", maker: "Samsung", go: ƒ, stop: ƒ, boost: ƒ}


// ES6
let name = 'SM7', maker = 'Samsung', boost = 'powerUP';

// car객체 정의(향상된 객체 표기법 활용)
const car = {
    // 메서드
    go(){},
    // 계산된 속성(Computed Property)
    ['stop'](){},
    [boost](){}
};

// car 객체의 상속 받은 후, 자신만의 속성을 가진 객체 정의
const newbee = {
    // 프로토타입 객체 상속
    __proto__: car,
    // 속기형 객체 속성 추가 방법
    name, maker,
    // 동적 계산된 속성(Dynamic Computed Property)
    [`${name.replace('7', '8')}${maker}${boost.slice(0, 1).toUpperCase() + boost.slice(1)}`](){}
    // SM8SamsungPowerUp
};


// ES6: 게터 / 세터
let name='SM7', maker='Samsung', boost='powerUP';
// car 객체 정의(향상된 객체 표기법 활용)
const car = {
    // 감춰진(private) 속성
    // JS언어에서는 private를 지원하지 않아 이름 작성시, _ 기호를 붙여 암시.
    _wheel: 4,
    // getter
    get wheel(){
        return this._wheel
    },
    // seeter
    set wheel(new_wheel){
        this._wheel = new_wheel;
    },
    go() {},
    ['stop'](){},
    [boost](){}
};
// console.log(car); // {_wheel: 4, go: ƒ, stop: ƒ, powerUP: ƒ}
// console.log(car.wheel); // 4
// console.log(car.wheel = 10); // 10
// console.log(car.wheel); // 10



((global = window) => {
    // 심볼(Symbol) 등록
    // 고유하고 수정 불가능한 데이터 타입이며 주로 객체 속성(object property)들의 식별자로 사용된다.
    let _wheel = Symbol('wheel');

    global.car = {
        // 등록된 심볼을 속성으로 사용
        [_wheel]: 4,
        get wheel() {
            return this[_wheel]; // 심볼 반환
        },
        set wheel(new_wheel) {
            if (typeof new_wheel !== 'number') {
                throw new Error('전달 인자 유형은 숫자여야 합니다.');
            }
            // 계산된 값을 심볼에 할당
            this[_wheel] = (new_wheel > 4) ? new_wheel : 4;
        }
    };
})();
// console.log(car); // { Symbol(wheel): 4 }
// console.log(car.wheel); // 4
// console.log(car.wheel = 9);
// console.log(car.wheel); // 9
// console.log(car._wheel); // undefined
// console.log(car[Symbol('wheel')]); // undefined


/**
 * Object Ehancements
 * getter https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get
 * setter https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set
 * Symbol https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 * ———————————————————————————————————————————————————————————
 *
 * 객체 속성 및 메서드 표기법이 향상
 * 계산된 (동적) 속성 표기법 활용 가능
 * 객체 상속 및 활용 방법 향상
 *
 * getter, setter를 사용하여 계산된 속성 할당
 * Symbol을 사용하여 접근 불가능한 식별자 활용
 */