( function(global, undefined){
	'use strict';
	// Ajax를 수행하기 위한 XMLHttpRequest 객체 생성 (생성자 함수로부터)
	var xhr = new XMLHttpRequest,
		jsonXhr = new XMLHttpRequest;
	// xhr 객체 콘솔 로그
	// console.log(xhr);
	// console.log('통신준비');
	// console.log(xhr.readyState); // 0

	// 첫번째 전달인자: 어떤방식(method)으로 서버와 통신할 것인가? get/post
	// 두번째 전달인자: 어떤 데이터를 가져올 것인가?
	// 세번쨰 전달인자: 비동기적으로 통신할 것인가? 디폴트값 true: 비동기 통신
	// xhr.open('GET', 'data/data.txt');
	jsonXhr.open('GET', 'data/data.json');
	// console.log('통신을 위한 오픈');
	// console.log(xhr.readyState); // 1

	// 서버통신
	// xhr.send(); // 보낼때
	jsonXhr.send(); // 보낼때


	jsonXhr.onreadystatechange = function() {
		if (this.status === 200 && this.readyState === 4) {
			// 모델데이터를 ajax로 호출
			var recieveData = this.responseText;
			// JSON 객체의 parse 메소드를 사용하여 문자를 객체화
			var convertObject = JSON.parse(recieveData);
			console.log(convertObject);// 객체 출력
		}
	};

	// 상태 변경을 감지하여 이벤트 핸드러 실행. 이벤트 감지.
	xhr.onreadystatechange = function() {
		if (this.status === 200 && this.readyState === 4) {
			// console.log(this.responseText);// 파일내용 출력
			var html = ['<div id="ajax-data">','<p>'+this.responseText+'</p>','</div>'].join('');
			document.body.innerHTML = html+ document.body.innerHTML;
			// console.log(xhr.readyState); // 2,3,4
		}
	};
} )(window);