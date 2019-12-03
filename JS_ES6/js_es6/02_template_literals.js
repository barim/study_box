// Template literal
/**
 * template literals
 * 참고: https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals
 *
 *
 * 백틱 기호(`, backtick 또는 backquote)
 *  - 템플릿 구문을 읽기 쉽고, 작성이 용이하도록 만들어 줌.
 *  - 공백, 줄바꿈 허용.
 *  - 홑/쌍 따옴표를 자유롭게 사용 가능.
 *
 * 보간법( ${}, string interpolation )
 *  - 포함된 JavaScript 식(Expression)을 처리하여 문자 데이터로 접합.
 */

// ES5
function welcomeTemplate(name, organization, email) {
    return '<div><p>'+organization+'에서 오신 '+name+'님 방문을 환영합니다. 경품신청은 \'<strong>'+email+'</strong>\'로 접수 되었습니다. 즐거운 시간 되시길.</p></div>';
}
console.log(welcomeTemplate('은아', '(주)퍼시픽', 'eun@pacific.com') );
// ES6
function welcomeTemplate(name, organization, email) {
    return `<div><p>${organization}에서 오신 ${name}님 방문을 환영합니다. 경품신청은 '<strong>${email}</strong>'로 접수 되었습니다. 즐거운 시간 되시길.</p></div>`;
}
console.log(welcomeTemplate('은아', '(주)퍼시픽', 'eun@pacific.com') );
// ES6
function welcomeTemplate(name, organization, email) {
    return `
        <div>
            <p>
                ${organization}에서 오신 ${name}님 방문을 환영합니다. 
                경품신청은 '<strong>${email}</strong>'로 접수 되었습니다. 
                즐거운 시간 되시길.
            </p>
        </div>
    `;
}
console.log(welcomeTemplate('은아', '(주)퍼시픽', 'eun@pacific.com') );

