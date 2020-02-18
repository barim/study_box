// ——————————————————————————————————————————
// Promise 프로미스 활용
// ——————————————————————————————————————————

// Promise
// Promise 객체는 비동기 처리를 위한 목적으로 사용되며, 당장은 아니더라도
// 나중에 처리될 것으로 기대되는 연산을 수행할 때 사용합니다.
// ——————————————————————————————————————————


// ES5: 콜백(Callback)

// CASE 1. VanillaJS + VelocityJS
window.addEventListener('DOMContentLoaded', function () {
    var insert_btn = document.querySelector('.insert-button');
    insert_btn.onclick = function (e) {
        window.Velocity(this, { 'padding': '+=0.45em' }, {
            complete: function () {
                console.log('애니메이션 종료');
            }
        })
    };
});

// CASE 2. jQuery
$(document).ready(function () {
    $('.insert_btn').on('click', function (e) {
        $(this).animate({ 'padding': '+=0.45em' }, function () {
            console.log('애니메이션 종료');
        });
    });
});

// CASE 3. jQuery Ajax
$.ajax({
    url: 'https://randomuser.me/api/',
    method: 'GET',
    dataType: 'json',
    // 통신이 성공하면 실행 하는 콜백 함수.
    success: function(data) {
        console.log(data);
    },
    // 통신이 실패하면 실행 하는 콜백 함수.
    error: function() {
        console.error('통신 실패');
    }
});


// ES5: 동기 vs 비동기

// 동기(Sync) 프로그래밍: 거듭 제곱 함수
// 어떤 작업을 요청한 후 그 작업이 완료되기까지 기다렸다가 응답을 받아 처리하는 것을 말합니다.
function exponentiation(x, n) {
    n = n || 2;
    var o = [];
    while (n--) {
        o.push(x);
    }
    // console.log(o);
    return o.reduce(function(a,b) {
        // console.log(a,b);
        return a*b;
    });
}
// 동기 처리 중
var expo_six = exponentiation(6, 4);
// 동기 처리가 끝나면 실행
console.log(expo_six); // 1296


// 비동기(Async) 프로그래밍: 거듭 제곱 함수
// A 작업을 요청한 후 다른 작업을 수행하다가 이벤트가 발생하면 
// A 에 대한 응답을 받아 처리하는 것을 말합니다.
function exponentiationAsync(x, n, cb) {
    n = n || 2;
    var o = [];
    while (n--) {o.push(x)}
    x = o.reduce(function(a,b) {
        return a*b;
    });
    window.setTimeout(cb, 1000, x);
}
var expo_six = 0;

// 비동기 처리중
exponentiationAsync(6, 4, function(x) {
    console.log(x);// 1296 // 출력된 순서 2
    expo_six = x; // 1초 뒤에 계산된 값이 할당됨.
});
// 기다리지 않고 바로 수행.
console.log(expo_six); // 0  출력된 순서 1



// ES5: 콜백지옥

// 비동기(Async) 프로그래밍: 거듭 제곱 함수
function exponentiationAsync(x, n, cb) {
    n = n || 2;
    var o = [];
    while (n--) { o.push(x); }
    x = o.reduce(function(a,b) {
        return a*b;
    });
    window.setTimeout((cb||function(){}), 1000, x);
}
// 2의 3승(거듭제곱) 값을 시작으로 1초 마다 
// 전달 받은 값을 3승(거듭제곱)하여 비동기 처리
// 비동기 프로그래밍 코드 결과: 콜백 지옥!!!!
exponentiationAsync(2, 3, function(x) {
    exponentiationAsync(x, 3, function(x2) {
        exponentiationAsync(x2, 3, function(x3) {
            exponentiationAsync(x3, 3, function(x4) {
                console.log(x4);
            });// 4초 뒤에 출력되는 결과 값 : 2.4178516392292583e+24
        });
    });
});



// ES6: Promise

// Promise를 사용하여 exponentiationPromise 유틸리티 함수 개선
function exponentiationPromise(x, n=2, time=1000) {
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            try {
                let o = Array.from(new Array(n), () => x);
                resolve(o.reduce((a,b) => a*b));
            } catch (e) {
                reject(e)
            }
        }, time);
    });
}
// Promise를 사용한 비동기(Async) 프로그래밍
exponentiationPromise(2,3)
    .then(x => exponentiationPromise(x, 3))
    .then(x2 => exponentiationPromise(x2, 3))
    .then(x3 => exponentiationPromise(x3, 3))
    .then((x4) => console.log(x4));
// 4초 뒤에 출력되는 결과 값: 2.4178516392292583e+24


// Promise 상태
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
// 팬딩(pending)   : 초기 상태.실행(fulfilled) 또는 거절(rejected) 되기 이전 상태를 말합니다.
// 실행(fulfilled) : 동작이 성공한 상태를 말합니다.
// 거절(rejected)  : 동작이 실패한 상태를 말합니다.


// ES6
// Ajax 유틸리티 함수
const AJAX = (url, method='GET') => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.addEventListener('readystatechange', function() {
            if (this.readyState === 4 && this.status === 200) {
                resolve(this.response);
            }
        });
        xhr.addEventListener('error', function(e) {
            reject(e);
        });
        xhr.send(null);
    });
};

AJAX('https://jsonplaceholder.typicode.com/albums')
    .then(response => JSON.parse(response))
    .then((data) => console.log(data.filter((item, index) => index < 10)));



// ES6: fetch
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// window.fetch()
fetch('https://jsonplaceholder.typicode.com/albums')
    .then(response => response.json())
    .then(data => console.log(data.filter((item, index) => index < 10)))
    .catch(error => console.error(error));



// Promise.all()
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

// Promise 객체 참조
let a = new Promise((rs, rj) => {
    // 실행
    window.setTimeout(rs, 1000, 'A');
});

let b = new Promise((rs, rj) => {
    // 실행
    window.setTimeout(rs, 2000, 'B')
});
// Promise.all() 메서드 활용
// 모든 promise의 상태가 실행(fulfilled) 되거나 첫 거절(rejection)이 발생할 경우 동작
// 병렬 비동기 프로그래밍
Promise.all([a,b])
    .then((values) => console.log(values));
    // 2초가 지난 후... ['A', 'B']


// Promise 객체 참조
let c = new Promise((res, rej) => {
    // 실행
    window.setTimeout(res, 1000, 'C');
});
let d = new Promise((res, rej) => {
    // 실패
    window.setTimeout(rej, 2000, 'D');
});

// Promise.all() 메서드 활용
Promise.all([c,d])
    .then((values) => console.log(values))
    .catch(e => console.error(`${e} 오류발생`));
    // 2초가 지난 후... D 오류발생



// Promise.race()
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
// Promise 객체 참조
let e = new Promise((rs, rj) => {
    // 실행( 먼저 종료 )
    window.setTimeout(rs, 1000, 'E');
});

let f = new Promise((rs, rj) => {
    // 거절
    window.setTimeout(rj, 2000, 'F')
});
// Promise.race() 메서드 활용
// 결과가 실행이든, 거절이든 먼저 종료된 쪽의 결과 반환
Promise.race([e,f])
    .then((values) => console.log(values)) // E 출력
    .catch((e) => console.error(`${e} 오류 발생`));

 
// Promise 객체 참조
let g = new Promise((rs, rj) => {
    // 실행
    window.setTimeout(rs, 1000, 'G');
});

let h = new Promise((rs, rj) => {
    // 거절 (먼저 종료)
    window.setTimeout(rj, 300, 'H');
});
// Promise.race() 메서드 활용
// 결과가 실행이든, 거절이든 먼저 종료된 쪽의 결과 반환
Promise.race([g, h])
    .then((values) => console.log(values))
    .catch((e) => console.error(`${e} 오류발생`));
    // H 오류발생   출력



// Promise.resolve() / Promise.reject()
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject

// 실행(fulfilled)된 Promise 객체를 반환하는 메소드
let i = Promise.resolve('fulfilled');

// 거절(rejected)된 Promise를 객체를 반환하는 메소드
let j = Promise.reject('rejected');

// 전달된 Promise 객체 중, 먼저 처리된 결과를 실행
Promise.race([i,j])
    .then((values) => console.log(values)) // fulfilled   출력
    .catch((e) => console.error(`${e} 오류 발생`));


/**
 * Promise, Fetch API
 *
 * Promise https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise
 * Fetch   https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * ———————————————————————————————————————————————————————————
 *
 * Callback 함수 패턴이 아닌, Promise 패턴을 사용하여 비동기 프로그래밍
 *
 */