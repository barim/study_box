// ——————————————————————————————————————————
// Classes & Private Data
// 클래스/상속 활용 및 데이터 보호 관리
// ——————————————————————————————————————————


// ——————————————————————————————————————————
// Classes
// 프로토타입 기반의 객체 지향 프로그래밍 방법 대신,
// 클래스 기반의 객체 지향 프로그래밍 방법을 사용할 수 있습니다.
// ——————————————————————————————————————————

// ES5: 프로토타입
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Inheritance_and_the_prototype_chain
( function(global){
    'use strict';
    // 비공개(Private) 멤버
    var _origin = '에티오피아';
    // 생성자(Constructor) 함수
    function Coffee(bean) {
        // 공개(Public)멤버
        this.bean = bean;
    }
    // 스태틱(Static) 메서드
    Coffee.origin = function() {return _origin};

    // Prototype Object
    // Instance 메서드
    Coffee.prototype.parch = function(time) {};

    // var def = new Coffee('def');
    // console.log(def);
    // console.log(Coffee.origin());
    // console.log(def.parch);
} )(window);

// ES6: 클래스
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/class
( () => {
    // 비공개 멤버
    let _origin = '에티오피아';
    // 클래스
    class Coffee {
        // 생성자
        constructor(bean){
            // 공개 멤버
            this.bean = bean;
        }
        // 스태틱 메서드
        static origin() {
            return _origin
        }
        // 인스턴스 메서드
        parch(time){ }
    }
    
} )();



// ——————————————————————————————————————————
// ES6 사용자라면 알아두어야 할 클래스 특성
// ——————————————————————————————————————————

// ES6: 호이스트 되지 않음.
// https://developer.mozilla.org/ko/docs/Glossary/Hoisting
// class 선언 이전에 사용하면 참조 오류 발생
new Bread();// Uncaught ReferenceError: Cannot access 'Bread' before initialization

class Bread {}


// ES6: 클래스 식(expression) 사용가능.
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/class
// 빵(Bread) 클래스 선언
const Bread = class {};
// 잼(Jam) 클래스 선언
const Jam = class {};



// ——————————————————————————————————————————
// Private Data
// ES6에서는 다양한 비공개 데이터 관리 방법이 존재합니다.
// https://2ality.com/2016/01/private-data-classes.html
// ——————————————————————————————————————————

// ES6: 관례적인 이름 규칙 활용
( () => {
    class Coffee {
        // 생성자
        constructor(bean, type){
            // 공개 데이터
            this.bean = bean;
            // 비공개 데이터
            // -관례적 이름 규칙일 뿐, 데이터가 안전하게 보호되지 않는다.
            this._type = type;
        }
    }
} )();

// ES6: Object.assign() 활용
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
(() => {
    class Coffee {
        // 생성자
        constructor(bean, type){
            // 비공개 데이터 관리
            // -완전한 데이터 비공개 관리가 가능하나, 메모리 누수가 발생한다.
            Object.assign(this, {
                getBean(){
                    return bean;
                },
                getType() {
                    return type
                }
            });
        }
    }
} ) ();


// ES6: 심볼 + 게터 / 세터 활용
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/get
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Functions/set
( () => {
    // 심볼
    let _bean = Symbol('bean');
    class Coffee {
        // 생성자
        constructor(bean){
            // 비공개 데이터 관리
            // -기본적으로 데이터 안전이 보장되나, 완전히 보호 되지는 않음.
            // -Reflect.ownKeys() 로 확인이 가능하기 떄문.
            this[_bean] = bean;
        }
        get pea() {
            return this[_bean];
        }
        set pea(new_bean) {
            this[_bean] = new_bean;
        }
    }
} )();


// ES6: 위크맵 활용
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
( () => {
    // 위크맵
    let _bean = new WeakMap();

    class Coffee {
        constructor(bean) {
            // 완벽한 보호가 가능함. 다만, 코드가 우아하지 않음.
            _bean.set(this, bean);
        }
        get pea() {
            return _bean.get(this);
        }
        set pea(new_pea) {
            _bean.set(this, new_pea);
        }
    }
} )();



// ——————————————————————————————————————————
// Sub Classing
// 복잡한 프로토타입 기반 상속과 달리 ES6 클래스 기반 상속은 이해하기 쉽고 사용하기 편리합니다.
// ——————————————————————————————————————————

// ES5: 프로토타입 기반 상속
// Coffee 생성자 함수
function Coffee(bean) {
    this.bean = bean;
}
// Coffee 프로토타입 객체 메서드
Coffee.prototype.parch = function(hour) {
    console.log(hour + '시간 만큼' + this.bean + '을 볶다.');
};

// Latte 생성자 함수 (Coffee 생성자 능력 상속)
function Latte(bean, milk) {
    // super() 호출
    Coffee.call(this, bean);
    this.milk = milk;
}

// Latte 프로토타입 객체 << Coffee 프로토타입 객체 상속
Latte.prototype = Object.create(Coffee.prototype);
// Latte 생성자 참조 재정의
Latte.prototype.constructor = Latte;

// 메서드 오버라이드
Latte.prototype.parch = function(hour) {
    Coffee.prototype.parch.call(this, hour/2);
    console.log( (hour/4)+'시간만큼 '+this.milk+'를 넣고 끓인다.' );
};


// ES6: 클래스 기반 상속
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes#ES5_%ED%94%84%EB%A1%9C%ED%86%A0%ED%83%80%EC%9E%85_%EC%83%81%EC%86%8D_%EB%AC%B8%EB%B2%95%EA%B3%BC_ES6_%ED%81%B4%EB%9E%98%EC%8A%A4_%EC%83%81%EC%86%8D_%EB%AC%B8%EB%B2%95%EC%9D%98_%EB%B9%84%EA%B5%90

// Coffee 클래스
class Coffee {
    // 생성자
    constructor(bean){
        // 공개 멤버
        this.bean = bean;
    }
    parch(time){
        console.log(`${time} 만큼 ${this.bean}을 볶다.`);
    }
}
// Latte 클래스(Coffee 클래스 상속)
class Latte extends Coffee {
    // 생성자
    constructor(bean, milk){
// constructor는 부모 클래스의 constructor 를 호출하기 위해 super 키워드를 사용할 수 있습니다.
        super(bean);
        this.milk = milk;
    }
    // 메서드 오버라이드
    parch(hour){
        super.parch(hour/2);
        console.log(`${hour/4} 시간 만큼 ${this.milk}를 넣고 끓인다.`);
    }
}
// console.log( Object.getPrototypeOf(Latte) === Coffee ); // true
// console.log( Latte.__proto__ === Coffee ); // true

// ——————————————————————————————————————————
// Inheritance Object
// ES6에서는 클래스가 아닌 객체를 상속할 수 있습니다.
// ——————————————————————————————————————————
// ES6: Object.setPrototypeOf() 활용 
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf

// Espresso 객체(클래스 아님)
const Espresso = {
    mix() { console.log('믹스(Mix)'); }
};
// CafeMocha 클래스
class CafeMocha {
    // 생성자
    constructor(bean, milk, chocolate) {}
}

// Object.setPrototypeOf()를 사용한 객체 상속
Object.setPrototypeOf(CafeMocha.prototype, Espresso);

// CafeMocha 객체 생성후
let cafemocha = new CafeMocha();
// Espresso 객체로부터 상속받은 mix() 메서드 사용 가능.
cafemocha.mix();// 믹스(Mix)


/**
 * Classes
 * 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/class
 * ———————————————————————————————————————————————————————————
 *
 * 객체 지향 프로그래밍이 요구되는 경우, 클래스 문법 활용
 * 비공개 데이터 관리 패턴을 숙지한 후, 적합한 방식 활용
 * 클래스 상속 및 객체 상속 활용
 */




