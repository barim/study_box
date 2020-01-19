// ——————————————————————————————————————————
// Shorthand Properties
// 속기형 속성 작성법을 사용하면 객체의 속성 정의가 편리해집니다.
// ——————————————————————————————————————————

// 데이터
var animations = ['원령 공주', '센과 치히로의 대모험', '코난'];
var movies = ['기생충', '범죄 도시', '전우치'];
var music = [
    { song: '선물', singer: '멜로망스' },
    { song: '피카부', singer: '레드벨벳' }
];

// ES5
var favorites = {
    animations: animations,
    movies: movies,
    music: music
};

// ES6
var favorites = { animations, movies, music };
// 또는
var favorites = {
    animations,
    movies,
    music
};


// ES5
function isRequired(name) {
    throw new Error(name + '전달인자는 필수!');
}
function Mouse(name, weight, type) {
    if (!name) { isRequired('name'); }
    weight = weight || '100g';
    type = type || 'bluetooth';
    return {
        name: name,
        weight: weight,
        type: type
    };
}
var magic_mouse2 = new Mouse('Magic Mouse 2', '99g');
var mx_ergo = new Mouse('MX ERGO', '2g');
// console.log(mx_ergo);

// ES6
function isRequired(name) {
    throw new Error(`${name} 전달인자는 필수!`);
}
function Mouse(name = isRequired('name'), weight = '100g', type = 'bluetooth') {
    return { name, weight, type };
}
const magic_mouse_2 = new Mouse('Magic Mouse 2', '99g');
const mx_ergo = new Mouse('MX ERGO', '2g');
// console.log(magic_mouse_2);


/**
 * Shorthand Properties
 * ———————————————————————————————————————————————————————————
 *
 * 객체의 속성, 값 이름이 동일할 경우 속기형 속성을 적극 활용하자.
 */

