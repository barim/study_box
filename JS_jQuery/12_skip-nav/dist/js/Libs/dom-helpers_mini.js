var dom = (function(global){

	var tester = createEl('div'),// innerText 확인용 요소.
		text;// 매번 호출시 확인 하는게 아니라 첨 실행시 조건 확인하고 text에 함수 할당.


	function createEl(el_name) {
		return global.document.createElement(el_name);
	}

	// 지역 변수, 함수
	function html(targetEl, htmlCode) {
		// GET
		if (!htmlCode) {
			return targetEl.innerHTML;
		}
		// SET
		else {
			targetEl.innerHTML = htmlCode;
		}
	}

	if (tester.innerText) {
		text = function(targetEl, text_content) {
			if (!text_content) {// GET
				return targetEl.innerText;// innerText 파폭 지원 안함.
			} else {// SET
				targetEl.innerText = text_content;
			}
		}
	}
	// Firefox 지원
	else {
		text = function(targetEl, text_content) {
			if (!text_content) {// GET
				return targetEl.textContent;// Firefox 지원
			} else {// SET
				targetEl.textContent = text_content;
			}
		}
	}

	// 반환 객체 (클로저)
	return {
		'html': html,
		'text': text,
	};

})(window);