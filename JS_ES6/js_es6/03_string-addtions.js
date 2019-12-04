/*
* ——————————————————————————————————————————
* string-addtions 확장된 문자 객체 능력 활용
* .includes()    보다 명시적이고 의미적으로 사용 가능
* .startsWith()  임의의 텍스트로 시작하는지 여부 확인 가능
* .endsWidth()   임의의 텍스트로 끝나는지 여부 확인 가능
* .repeat()      필요한 경우, 특정 텍스트를 반복 횟수만큼 처리 가능
* ——————————————————————————————————————————
*/
// ——————————————————————————————————————————
// ES6 //
// string.includes()
// includes() 메서드는 하나의 문자열이 다른 문자열에 포함되어 있는지를 결정하고,
// 그 결과를 true 또는 false로 반환
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/includes
// ——————————————————————————————————————————


const players = `messi ronaldo son honaldo`.split(' ');

function filterWordList(words, filter) {
    let word_list = [];
    for (let i = 0, l = words.length; i < l; i++) {
        let word = words[i];
        // 문자 포함 여부 검증
        console.log(word.includes('naldo')); // false true false true
        // ES5
        // if(word.indexOf('naldo') > -1){
        // ES6
        if (word.includes('naldo')) {
            word_list.push(word);

        }
    }
    return word_list;
}
let naldos = filterWordList(players, 'naldo');
console.log(naldos); // Array(2) ["ronaldo", "honaldo"]



// ——————————————————————————————————————————
// ES6 //
// string.startsWith()
// startsWith() 메소드는 어떤 문자열이 특정 문자로 시작하는지 확인 할 수 있으며,
// 그 결과는 true 혹은 false로 반환
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith
// ——————————————————————————————————————————

var kings = '청룡 백호 현무 주작';

// kings는 0번째 글자가 '백호'로 시작 하는가?
console.log(kings.substr(0, 2)); // 청룡
console.log(kings.substr(0, 2) === "백호"); // false

// 유틸리티 함수
function startsWidht1(word, find) {
    return word.substr(0, find.length) === find;
}
console.log(startsWidht1(kings, '청룡')); // true

// '현무'는 kings글자의 6 인덱스부터 시작하는가?
console.log(kings.substr(6, 2) === '현무'); // true

// 유틸리티 함수 업그레이드
function startsWidht2(word, find, start) {
    start = start || 0;
    return word.substr(start, find.length) === find;
}
console.log(startsWidht2(kings, '주작', 9)); // true

// ES6
// kings의 글자는 '백호'로 시작하는가?
console.log(kings.startsWith('백호')); // false
// kings의 글자는 6인덱스부터 '현무' 인가?
console.log(kings.startsWith('현무', 6)); // true
kings.startsWith('현무', 6);


// ——————————————————————————————————————————
// ES6 //
// string.endsWith()
// endsWith() 메서드를 사용하여 어떤 문자열에서 특정 문자열로 끝나는지를 확인 할 수 있으며,
// 그 결과를 true 혹은 false로 반환
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith
// ——————————————————————————————————————————

let season = '봄 여름 가을 겨울';

// season의 글자는 '겨울'로 끝나는가?
let index = season.length - 2;
console.log(season.substr(index, 2) === '겨울'); //true

// 유틸리티 함수
function endsWith1(word, find, end) {
    end = (end || word.length) - find.length;
    let last_index = word.indexOf(find, end);
    return last_index !== 1 && last_index === end;
}
console.log(endsWith1(season, '겨울')); // true
// season의 글자는 '가을'dl 7번째 인덱스(가을 다음 위치)에서 끝나는가?
console.log(endsWith1(season, '가을', 7)); // true

// ES6
// season 글자는 '겨울'로 끝나는가?
console.log(season.endsWith('겨울')); // true
// season의 글자는 '가을'dl 7번째 인덱스(가을 다음 위치)에서 끝나는가?
console.log(season.endsWith('가을', 7)); // true


// ——————————————————————————————————————————
// ES6 //
// string.repeat()
// repeat()메서드는 호출된 문자열을 설정된 수만큼 복사하여, 새 문자열을 생성하고 반환
// https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/repeat
// ——————————————————————————————————————————
var repet_word = '양심과 욕심 ';
function repeat1(string, count) {
    var strings = [];
    while (strings.length < count) {
        strings.push(string);
    }
    return strings.join('');
}
console.log(repeat1(repet_word)); // ''
console.log(repeat1(repet_word, 3)); // '양심과 욕심 양심과 욕심 양심과 욕심 '


// ES6
console.log(repeat_word.repeat());  // ''
console.log(repeat_word.repeat(4)); // '양심과 욕심 양심과 욕심 양심과 욕심 양심과 욕심 '