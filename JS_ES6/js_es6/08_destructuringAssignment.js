// ——————————————————————————————————————————
// Destructuring Assignment
// 비구조화 할당
// ——————————————————————————————————————————

// 비구조화 할당 구문은 배열 값 또는 객체 속성을
// 별개의 변수로 추출할 수 있게 하는 JS 식(expression)입니다.

// 영화 정보 객체 데이터
var movie = {
    name    : '포레스트 검프',
    director: '로버트 저메키스',
    openning: '1994-10-15',
    link    : 'http://movie.naver.com/movie/bi/mi/basic.nhn?code=17159'
};

// ES5
// 객체의 속성 할당
var name     = movie.name;
var director = movie.director;
var openning = movie.openning;
var link     = movie.link;

console.log('name:', name);
console.log('director:', director);
console.log('openning:', openning);
console.log('link:', link);

// ES6
// 비구조화 할당
let { name, director, openning, link } = movie;

console.log('name:', name);// name: 포레스트 검프
console.log('director:', director);// director: 로버트 저메키스
console.log('openning:', openning);// openning: 1994-10-15
console.log('link:', link);// link: http://movie.naver.com/movie/bi/mi/basic.nhn?code=17159

// ES6
// 비구조화 할당
( ({ name, director, openning, link }) => {

    console.log('name:', name);         // name: 포레스트 검프
    console.log('director:', director); // director: 로버트 저메키스
    console.log('openning:', openning); //  openning: 1994-10-15
    console.log('link:', link);         // link: http://movie.nav...

} )(window.movie);

// 비구조화 할당 (필요한 속성만 사용 가능)
( ({ director, openning }) => {
    
    console.log('director:', director); // director: 로버트 저메키스
    console.log('openning:', openning); // openning: 1994-10-15
    
} )(window.movie);


// ES5
// title, art_director 변수에 
// movie.name, movie.director 속성 값을 복사하고자 할 경우
var title        = movie.name;
var art_director = movie.director;

console.log(title);// 포레스트 검프
console.log(art_director);// 로버트 저메키스

// ES6
// title, art_director 변수에 
// movie.name, movie.director 속성 값을 복사하고자 할 경우
let { name: title, director: art_director } = movie;

console.log(title);
console.log(art_director);

// ES6
// title, art_director 변수에 
// movie.name, movie.director 속성 값을 복사하고자 할 경우
( ({ name: title, director: art_director }) => {
    
    console.log(title);
    console.log(art_director);
    
} )(window.movie);




// 주방용품 배열 데이터
var utensils = [
    '그물국자',
    '건지개',
    '스패튤라',
    '뒤집개',
    '국자',
    '포테이토 매셔',
];

// ES5
// 각 변수에 배열 utensils 원소 할당
var skimmer        = utensils[0]; // 그물국자
var draining_spoon = utensils[1]; // 건지개
var spatula        = utensils[2]; // 스패튤라
var turner         = utensils[3]; // 뒤집개
var ladle          = utensils[4]; // 국자
var potato_masher  = utensils[5]; // 포테이토 매셔

// ES6
// 배열 utensils 비구조화 할당
let [skimmer, draining_spoon, spatula, turner, ladle, potato_masher] = utensils;
// ES6
// 배열 utensils 비구조화 할당
( ([skimmer, draining_spoon, spatula, turner, ladle, potato_masher]) => {
    
    console.log(draining_spoon); // 건지개
    
} )(window.utensils);

// 배열 utensils 비구조화 할당 (필요한 데이터만 할당)
( ([, draining_spoon, , , , potato_masher]) => {
    
    console.log(draining_spoon); // 건지개
    console.log(potato_masher); // 포테이토 매셔
    
} )(window.utensils);




// JSON 데이터
var people = [
    {
        "gender": "female",
        "name": "gina reynolds",
        "email": "gina.reynolds@example.com",
        "picture": "https://randomuser.me/api/portraits/thumb/women/35.jpg"
    }, {
        "gender": "male",
        "name": "leslie fisher",
        "email": "leslie.fisher@example.com",
        "picture": "https://randomuser.me/api/portraits/thumb/men/10.jpg"
    },
    {
        "gender": "female",
        "name": "brooke fuller",
        "email": "brooke.fuller@example.com",
        "picture": "https://randomuser.me/api/portraits/thumb/women/3.jpg"
    }
];

// ES5
// 콜백 함수 매개변수로 객체를 전달 받아 원하는 데이터 값을 지역 변수로 할당
people.forEach(function (person) {
    var name = person.name;
    var email = person.email;

    // console.log(name, email);
});

// ES6
// 비구조화 할당 방식을 사용하여 콜백 함수 매개변수로 원하는 데이터만 받을 수 있음
people.forEach( ({ name, email }) => {
    // console.log(name, email);
} );

// ES5
// JSON 객체(배열)의 순서에 해당 하는 변수 할당
var Leslie = people[1],
    Brooke = people[people.length - 1];

// 이메일 출력 함수
function logEmail(o) {
    // 전달받은 객체 중 email 속성 값 변수 할당
    var email = o.email;
    console.log(email);
}
logEmail(Leslie);
logEmail(Brooke);


// ES6
// 비구조화 할당 방식을 사용하여 JSON 객체(배열)의 순서에 해당 하는 변수 설정
let [, Leslie, Brooke] = people;

// 이메일 출력 함수
function logEmail({ email }) {
    console.log(email);
}

// 이메일 출력(변수 전달)
logEmail(Leslie); // leslie.fisher@example.com
logEmail(Brooke); // brooke.fuller@example.com

/**
 * Destructuring Assignment
 * 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * ———————————————————————————————————————————————————————————
 *
 * 객체 속성 또는 배열 값을 변수에 할당할 때, 비구조화 할당을 활용하면 매우 유용
 *
 * 객체
 *  - 속성(property or key) 이름과 비교하여 할당
 *
 * 배열
 *  - 원소의 순서(order)에 맞춰 할당
 */