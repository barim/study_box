
( function(global){

	/**
	 * --------------------------------
	 * 생성 create
	 * --------------------------------
	 */
	
	function createEl(elName) {
		validate(isString(elName), '문자열을 넣어주셔야 합니다.');
		return document.createElement(elName);
	}

	function createText(content) {
		validate(isString(content), '문자열을 넣어주셔야 합니다.');
		return document.createTextNode(content);
	}

	/**
	 * --------------------------------
	 * 삽입(Inserting) 또는 이동(Moving)
	 * --------------------------------
	 */
	
	// 부모 요소의 마지막에 넣는다.
	function append(parent, child) {
		validate(isElement(parent) && ( isElement(child) || isTextNode(child) ), '전달인자는 모두 DOM 요소노드여야 합니다.');
		parent.appendChild(child);
	}

	// 부모의 첫번째 자식을 찾아서 그 앞에 넣는다.
	function prepend(parent, child) {
		validate(isElement(parent) && ( isElement(child) || isTextNode(child) ), '전달 인자는 모두 DOM요소노드여야 합니다.' );
		var firstEl = first(parent, '*');
		if (firstEl.length === 0) {
			append(parent, child);
		} else {
			before(firstEl, child);
		}
	}

	function before(target, insert) {
		parent(target).insertBefore(insert, target);
		return insert;
	}

	function insertBefore(insert, target) {
		return before(target, insert);
	}

	/**
	 * ====================================
	 * 선택(Selecting) | 탐색(Traversing)
	 * ====================================
	 */

	/**
	 * --------------------------------
	 * $() 함수
	 * 대상을 손쉽게 선택할 수 있는 선택자 헬퍼 함수.
	 * --------------------------------
	 */
	function $(selector, context) {
		// 초기화
		context = context || document;

		//유효성 검사.
		validate(isString(selector), '첫번째 전달인자는 문자열이어야 합니다.');
		validate(context && (isElement(context) || context === document), '두번째 전달인자는 DOM 객체(요소노드)이어야 합니다.');

		//요소노드 찾기
		var nodeList = context.querySelectorAll(selector),
			nodeList_length = nodeList.length;
		return (nodeList_length === 1) ? nodeList[0] : nodeList;
	}

	/**
	 * 전달된 첫번째 인자(부모 요소노드) 에서 자손(css선택자)요소노드를 찾는 함수
	 * @param  {element} parentEl      [부모요소노드]
	 * @param  {string} childSelecotr [css선택자]
	 * @return {element}               [선택된 자식요소]
	 */
	function find(parentEl, childSelector) {
		validate(isElement(parentEl), '첫번째 전달인자는 DOM객체(요소노드)여야 합니다.');
		validate(isString(childSelector), '두번쨰 전달인자는 문자열이어야 합니다.');

		var children     = parentEl.querySelectorAll(childSelector),
			children_len = children.length;

		if (children_len === 0) {
			return null;
		} else if ( children_len === 1 ) {
			return children[0];
		} else {
			return children;
		}
	}

	/** --------------------------------
	 * children() 함수 - 직접적인 자식만 선택 ">"
	 * children(parentEl, childrenSelector)
	 * --------------------------------*/
	function children(parentEl, childrenSelector) {
		var childEl     = find(parentEl, childrenSelector),
			childEl_len = childEl ? childEl.length : null,
			els         = []; // 배열

		if (!childEl_len) { return childEl; }

		while(childEl_len--) {
			var el = childEl[childEl_len];
			if (parentEl === el.parentNode) {
				els.push(el);
			}
		}
		return els.length === 0 ? null : els.length === 1 ? els[0] : els;
	}


	/** ------------------------------------------------
	 * first() - 전달된 요소노드의 첫번째 자손 요소 반환.
	 * last()  - 전달된 요소노드의 마지막 자손 요소 반환.
	 * -------------------------------------------------*/
	function first(parent, selector) {
		var firstEl = $(selector, parent);
		return firstEl.length > 0 ? firstEl[0] : firstEl;
	}
	//부모 노드를 던지고 선택자 표현식
	function last(parent, selector) {
		var childs     = $(selector, parent),
			childs_len = childs.length;
		return childs_len > 0 ? childs[ childs_len - 1 ] : childs;
	}

	/**--------------------------------
	* prev()
	* 이전 형제 요소노드 반환
	* next()
	* 다음 형제 요소노드 반환
	* --------------------------------*/
	function prev(el) {
		validate(isElement(el), 'DOM요소 노드를 전달해야 합니다.');

		if (el.previousElementSibling) {return el.previousElementSibling;}

		do {
			el = el.previousSibling;
		}
		while (el && el.nodeType !== 1);

		return el;
	}
	function next(el) {
		validate(isElement(el), 'DOM요소 노드를 전달해야 합니다.');

		if (el.nextElementSibling) {return el.nextElementSibling;}

		do {
			el = el.nextSibling;
		}
		while (el && el.nodeType !== 1);

		return el;
	}

	/**--------------------------------
	* parent(el, upper)   upper - 몇번째 부모인지 숫자
	* 전달된 요소노드 인자의 부모요소노드 를 반환
	* --------------------------------*/
	function parent(el, upper) {
		// upper 초기화 및 덮어쓰기.
		upper = upper || 1;
		// 유효성 검사.
		validate(isElement(el), '첫번째 전달 인자는 DOM 요소노드를 전달해야 합니다.');
		validate(isNumber(upper), '두번쨰 전달인자는 숫자를 전달해야 합니다.');

		// 반복적으로 부모 요소노드를 찾음.
		do {
			if (el === null) {return null;}
			el = el.parentNode;
		}
		while (--upper);

		return el.nodeType === 1 ? el : null;
	}


	/**
	 * ======================================================================
	 * 조작(Manipulation)
	 * ======================================================================
	 */

	/**----------------------------------------------------------------------
	 * hasClass() 함수 // true, false
	 * hasClass(el, 'on');	이 요소el 의 class 에 on 이 있나?
	 * --------------------------------------------------------------------*/
	function hasClass(el, className) {
		validate(isElement(el), '첫번째 전달인자는 DOM요소노드여야만 합니다.');
		validate(isString(className), '두번째 전달인자 갑슨 문자여야만 합니다.');

		var classList = attr(el, 'class');
		classList = (classList || '').split(' ');

		for (var i = classList.length - 1; i > -1; i--) {
			if(classList[i] === className ){
				return true;
			}
		}
		return false;
	}


	/**
	 * addClass() class 추가.
	 * @param {element} el       [class 추가될 요소]
	 * @param {string} className [추가할 class명]
	 */
	function addClass(el, className) {
		validate( isElement(el), '첫번째 전달인자는 DOM 요소노드여야만 합니다.' );
		validate( isString(className), '두번째 전달인자 값은 문자여야만 합니다.' );

		if ( !hasClass(el, className) ) {
			var oldClasses = attr(el, 'class') || '';
			el.setAttribute( 'class', (oldClasses + ' ' + className).trim() );
		}
	}

	/**----------------------------------------------------------------------
	 * removeClass() 함수
	 * removeClass(el, className)
	 * ----------------------------------------------------------------------*/
	 function removeClass(el, className) {
	 	validate( isElement(el), '첫번째 전달인자는 DOM 요소노드여야만 합니다.' );
	 	validate( isString(className), '두번째 전달인자 값은 문자여야만 합니다.' );
	 
	 	if ( hasClass(el, className) ) {
	 		//클래스명 문자열 받아와서 문자열중 className을 '' 로 바꾸고 앞뒤빈칸 삭제.
	 		var changeValue = attr(el, 'class').replace(className, '').trim();
	 		attr(el, 'class', changeValue);
	 	}
	 }

	/**
	 * ----------------------------------------------------------------------
	 * toggleClass() 함수
	 * toggleClass(el, className)
	 * ----------------------------------------------------------------------
	 */
	function toggleClass(el, className) {
		hasClass(el, className) ?
			removeClass(el, className) :
			addClass(el, className);
	}


	/**
	 * ----------------------------------------------------------------------
	 * radioClass() 함수
	 * radioClass(el, className)
	 * ----------------------------------------------------------------------
	 */
	 function radioClass(el, className) {
	 	var parent = el.parentNode,
	 		target = children(parent, '.'+className);
	 	if (target) {
	 		removeClass(target, className);
	 	}
	 	addClass(el, className);
	 }


	/** ----------------------------------------------------------------------
	 * attr() - getAttribute|setAttribute
	 * attr(el, key)        // GET
	 * attr(el, key, value) // SET
	 * ------------------------------------------------------------------- */
	function attr(el, prop, value) {
		validate(isElement(el), '첫번째 인자는 요소노드여야 함.');
		// validate(isString(prop), '두번째 인자는 문자여야 함.');

		if( isObject(prop) ) {
			each( prop, function(key, value) {
				el.setAttribute(key, value);
			} );
		} else if( !value && value !== '' ) {
			return el.getAttribute(prop);
		} else {
			el.setAttribute(prop, value);
		}
	}

	/** ----------------------------------------------------------------------
	 * getStyle(설정된 스타일 속성) 함수
	 * ----------------------------------------------------------------------*/
	var getStyle;// 불러온 다움에 나중에 호출 하는거라 호이스팅 문제 없음.
	if ( window.getComputedStyle ) {// js 로딩시 한번 검사.
		// W3C 표준 방식, IE 9+ 
		getStyle = function(el, prop) {// getStyle에 함수할당.
			// (문서객체 , 문서객체의 속성)
			return window.getComputedStyle(el)[prop];//. = []
		};				//계산된 스타일 값 가져오기
	} else {
		// MS전용 비표준 속성, IE 8-
		getStyle = function(el, prop) {// getStyle에 함수할당.
			return el.currentStyle[prop];//. = []
		};
	}

	/** --------------------------------
	 * setStyle(스타일 속성 설정) 함수
	 * ---------------------------------
	 */
	function setStyle(el, prop, value) {//value 설정할 값
		if ( prop.match(':') ) {
			el.style.cssText = prop;//직접 값을 입력하는 방식.
		} else {
			el.style[prop] = value;
		}
	}


	/**--------------------------------
	 * 하나의 이름으로 getStyle()/setStyle() 모두 사용.
	 * --------------------------------
	 */
	function css(el, prop, value) {
		// 유효성 검사
		validate( isElement(el), '첫번째 인자는 요소노드여야 함.' );
		validate( isString(prop), '두번째 인자는 문자여야 함.' );
		// SET
		if( value || prop.match(':') ) { setStyle(el, prop, value); }
		// GET
		else { return getStyle(el, prop); }
	}

	/**--------------------------------
	 * text() 함수. parent요소에 content 삽입.
	 * --------------------------------*/
	function text(parent, content) {
		var method = parent.textContent ? 'textContent' : 'innerText';
		parent[method] = content;
	}

	/**
	 * --------------------------------
	 * 유틸리티(Utility)
	 * --------------------------------
	 */

	/**--------------------------------
	 * CSS3 신기능을 검수하는 헬퍼함수
	 * --------------------------------*/
	function checkCSS3Feature(feature) {
		var html = $('html'),
			body = $('body'),
			html_old_class = attr(html, 'class');

		if (feature in body.style) {
			addClass(html, feature);
		} else {
			addClass(html, 'no-'+feature);
		}
	}


	/** ---------------------------------------------------------
	 * 브라우저 식별자로 대상을 구분하는 헬퍼함수.
	 * 넘기는 문자열을 비교해서 있으면 html 요소에 클래스 붙이는.
	 * ----------------------------------------------------------*/
	function checkUserAgent(device_name, class_name) {
		var userAgent = navigator.userAgent.toLowerCase(),
			html = $('html');

		if (userAgent.indexOf(device_name) > -1) {
			addClass(html, class_name || device_name);
		}
	}


	/**--------------------------------
	 * 유효성 검사 헬퍼 함수 - true/false 리턴
	 * isNumber()
	 * isString()
	 * isBoolean()
	 * isFunction()
	 * isArray()
	 * isObject()
	 * --------------------------------*/
	// data 데이터형, type 문자열로 타입을 확인
	// ex)어떤 데이터를 받는데 object 냐 물어보면 true/false 가 나오는.
	/**
	 * [is() 유효성 검사]	
	 * @param  {all}  data [검사할 데이터]
	 * @param  {string}  type [데이터의 문자열 타입명]
	 * @return {Boolean}      [description]
	 */
	function is(data, type) {
		validate(isString(type), '두번째 인자 값은 문자열을 사용해야 합니다.');

		switch( data.constructor ) {
			case Number:
				return type === 'number' || type === 'num';
			break;
			case String:
				return type === 'string' || type === 'str';
			break;
			case Boolean:
				return type === 'boolean' || type === 'boo';
			break;
			case Function:
				return type === 'function' || type === 'fnc';
			break;
			case Array:
				return type === 'array' || type === 'arr';
			break;
			case Object:
				return type === 'object' || type === 'obj';
		}
	}


	function isNumber(num) {
		return typeof num === 'number';
	}
	// function isNumber(num) { return is(num,'number'); }

	function isString(str) {
		return typeof str === 'string';
	}
	function isBoolean(boo) {
		return typeof boo === 'boolean';
	}
	function isFunction(fnc) {
		return typeof fnc === 'function';
	}
	function isArray(arr) {
		return !isObject(arr);
	}
	function isObject(obj) {
		return typeof obj === 'object' && !obj.push;
	}								//배열 속성으로 확인.


	// 요소 노드 , 텍스트 노드 , 노드 리스트 인지 확인하는 함수.
	function isElement(el) {
		return el ? el.nodeType === 1 : false;
	// 노드의 유형(Node Type)
	// ElementNode - 1  , AttributeNode - 2  , TextNode - 3
	}
	function isTextNode(txt) {
		return txt ? txt.nodeType === 3 : false;
	}
	function isNodeList(list) {
		return !!(list && list.length > 0 && list.item);
	}// 조건 a , b , c 가 묶어서 형변환. !! 는 boolean 으로 형태를 바꿈.
	//ex) !!(9) 는 0이 아니면 true 반환. 0이면 false.
	//원래값이 참/거짓 인지 알아보는 용도. Boolean 함수 대용으로 사용.


	/**
	 * validate() 입증, 확인.
	 * @param  {boolean} condition 조건
	 * @param  {string} error_msg 오류메시지
	 * 조건값이 true면 넘어가고 false 면 Error 출력하고 함수를 멈추게 된다.
	 */
	function validate(condition, error_msg) {
		if ( condition === undefined || condition === null ) {
			condition = false;
		} else if( !condition && condition !== 0 && condition !== '' ) {
			throw new TypeError(error_msg);
			// console.error(error_msg)
			// return; // 함수 종료
		}
	}

	/**
	 * [override() 동일한 멤버가 있을 경우 덮어씀]
	 * @param  {object} obj1 [복사되는 곳]
	 * @param  {object} obj2 [복사될 객체]
	 * @return {object}      [복사된 객체를 넘김]
	 */
	function override(obj1, obj2) {
		for( var key in obj2 ) {
			obj1[key] = obj2[key];
		}
		return obj1;
	}

	/**
	 * [makeArray 유사배열을 배열로 변경하여 반환하는 함수]
	 * @param  {arguments | nodeList} like_arr_obj [유사배열]
	 * @return {Array}              [배열로 위임]
	 */
	function makeArray(like_arr_obj) {
		validate(like_arr_obj.length , '유사배열 또는 문자열을 인자로 설정해 주세요.');
		// return Array.prototype.slice.call(like_arr_obj);
		return [].slice.call(like_arr_obj);
	}

	/**
	 * --------------------------------
	 * each()
	 * --------------------------------
	 */
	var each;

	if ( Array.prototype.forEach ) {
		each = function(data, fn) {
			validate(isFunction(fn), '두번째 전달인자는 함수여야 합니다.');
			if (isArray(data)) {
				data.forEach(fn);
			} else if(isObject(data)){
				for( var key in data ){
					var value = data[key]; 
					fn.call(global.yamoo9, key, value);
				}
			}
		};
	} else {
		each = function(data, fn) {
			// validate( isArray(data), '첫번째 전달인자는 배열이어야 합니다.' );
			validate( isFunction(fn), '두번째 전달인자는 함수여야 합니다.' );
			if (isArray(data)) {
				for( var i=0, l=data.length; i<l; i++ ) {
					var item  = data[i],
						index = i;
					fn.call(null, item, index, data);
				}
			} else if(isObject(data)){
				for( var key in data ){
						var value = data[key]; 
						fn.call(global.yamoo9, key, value);
				}
			}
		};
	}

	// 외부에서 접근가능한 객체 설정
	global.y9 = global.yamoo9 = {
		// 생성(Creating)
		createEl         : createEl,
		createText       : createText,

		// 삽입(Inserting) 또는 이동(Moving)
		append           : append,
		prepend          : prepend,
		before           : before,
		insertBefore     : insertBefore,

		// 선택(Selecting) | 탐색(Traversing)
		$                : $,
		find             : find,
		children         : children,
		first            : first,
		last             : last,
		prev             : prev,
		next             : next,
		parent           : parent,

		// 조작(Manipulation)
		css              : css,
		attr             : attr,
		text             : text,
		hasClass         : hasClass,
		addClass         : addClass,
		removeClass      : removeClass,
		toggleClass      : toggleClass,
		radioClass       : radioClass,

		// 감지(Detection)
		checkCSS3Feature : checkCSS3Feature,
		checkUserAgent   : checkUserAgent,

		// 유틸리티(Utility)
		validate         : validate,
		isNumber         : isNumber,
		isString         : isString,
		isBoolean        : isBoolean,
		isFunction       : isFunction,
		isArray          : isArray,
		isObject         : isObject,
		isElement        : isElement,
		isTextNode       : isTextNode,
		isNodeList       : isNodeList,
		each             : each,
		makeArray        : makeArray,
		override         : override,
	}

} )(window);


