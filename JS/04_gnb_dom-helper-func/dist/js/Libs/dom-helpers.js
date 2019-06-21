
/* 생성 (Creating) */
var $, addClass, append, attr, before, checkCSS3Feature, checkUserAgent, children, createEl, createText, find, first, getStyle, hasClass, insertBefore, isArray, isBoolean, isElement, isFunction, isNodeList, isNumber, isObject, isString, isType, last, next, override, parentEle, prev, radioClass, removeClass, toggleClass, validate;

createEl = function(elName) {
  validate(isString(elName), '문자열을 넣어주셔야 합니다.');
  return document.createElement(elName);
};

createText = function(content) {
  validate(isString(content), '문자열을 넣어주셔야 합니다.');
  return document.createTextNode(content);
};


/* 삽입(Inserting) 또는 이동(Moving) */

append = function(parent, child) {
  validate(isElement(parent) && isElement(child), '전달인자는 모두 DOM 요소노드여야 합니다.');
  parent.appendChild(child);
};

before = function(target, insert) {
  parentEle(target).insertBefore(insert, target);
  return insert;
};

insertBefore = function(insert, target) {
  return before(target, insert);
};


/* 선택(Selecting) | 탐색(Traversing) */

$ = function(selector, context) {
  var nodeList, nodeList_length;
  context = context || document;
  validate(isString(selector), '첫번째 전달인자는 문자열이어야 합니다.');
  validate(context && (isElement(context) || context === document), '두번째 전달인자는 DOM 객체(요소노드)이어야 합니다.');
  nodeList = context.querySelectorAll(selector);
  nodeList_length = nodeList.length;
  if (nodeList_length === 1) {
    return nodeList[0];
  } else {
    return nodeList;
  }
};

find = function(parentEl, childSelector) {
  var children, children_len;
  children = parentEl.querySelectorAll(childSelector);
  children_len = children.length;
  switch (children_len) {
    case 0:
      return null;
    case 1:
      return children[0];
    default:
      return children;
  }
};

children = function(parentEl, childrenSelector) {
  var childEl, childEl_len, el, els;
  childEl = find(parentEl, childrenSelector);
  childEl_len = childEl ? childEl.length : null;
  els = [];
  if (!childEl_len) {
    return childEl;
  }
  while (childEl_len--) {
    el = childEl[childEl_len];
    if (parentEl === el.parentNode) {
      els.push(el);
    }
  }
  switch (els.length) {
    case 0:
      return null;
    case 1:
      return els[0];
    default:
      return els;
  }
};

first = function(parent, selector) {
  return $(selector, parent)[0];
};

last = function(parent, selector) {
  var childs, childs_len;
  childs = $(selector, parent);
  childs_len = childs.length;
  return childs[childs_len - 1];
};

prev = function(el) {
  validate(isElement(el), 'DOM요소노드를 전달해야 합니다.');
  if (el.previousElementSibling) {
    return el.previousElementSibling;
  }
  while (true) {
    el = el.previousSibling;
    if (!(el && el.nodeType !== 1)) {
      break;
    }
  }
  return el;
};

next = function(el) {
  validate(isElement(el), 'DOM 요소노드를 전달해야 합니다.');
  if (el.nextElementSibling) {
    return el.nextElementSibling;
  }
  while (true) {
    el = el.nextSibling;
    if (!(el && el.nodeType !== 1)) {
      break;
    }
  }
  return el;
};

parentEle = function(el, upper) {
  upper = upper || 1;
  validate(isElement(el), '첫번째 전달인자는 DOM 요소노드를 전달해야 합니다.');
  validate(isNumber(upper), '두번째 전달인자는 숫자를 전달해야 합니다.');
  while (true) {
    if (el === null) {
      return null;
    }
    el = el.parentNode;
    if (!--upper) {
      break;
    }
  }
  if (el.nodeType === 1) {
    return el;
  } else {
    return null;
  }
};


/*
	do{
			if el == null
				return null
			el = el.parentNode
		}while(--upper)
 */


/* 조 작(manipulation) */

hasClass = function(el, className) {
  var classList, i;
  validate(isElement(el), '첫번째 전달인자는 DOM 요소노드여야 만 합니다.');
  validate(isString(className), '두번째 전달인자 값은 문자여야만 합니다.');
  classList = attr(el, 'class');
  classList = (classList || '').split(' ');
  i = classList.length - 1;
  while (i > -1) {
    if (classList[i] === className) {
      return true;
    }
    i--;
  }
  return false;
};

addClass = function(el, className) {
  var oldClasses;
  validate(isElement(el), '첫번째 전달인자는 DOM요소노드 여야만 합니다.');
  validate(isString(className), '두번쨰 전달인자 값은 문자여야 합니다.');
  if (!hasClass(el, className)) {
    oldClasses = attr(el, 'class') || '';
    el.setAttribute('class', (oldClasses + ' ' + className).trim());
  }
};

removeClass = function(el, className) {
  var changeValue;
  validate(isElement(el), '첫번째 전달인자는 DOM 요소노드여야만 합니다.');
  validate(isString(className), '두번째 전달인자 값은 문자여야만 합니다.');
  if (hasClass(el, className)) {
    changeValue = attr(el, 'class').replace(className, '').trim();
    attr(el, 'class', changeValue);
  }
};

toggleClass = function(el, className) {
  if (hasClass(el, className)) {
    removeClass(el, className);
  } else {
    addClass(el, className);
  }
};

radioClass = function(el, className) {
  var parent, target;
  parent = el.parentNode;
  target = children(parent, '.' + className);
  if (target) {
    removeClass(target, className);
  }
  addClass(el, className);
};

attr = function(el, prop, value) {
  validate(isElement(el), '첫번째 인자는 요소노드여야 함.');
  validate(isString(prop), '두번째 인자는 문자여야 함.');
  if (!value && value !== '') {
    return el.getAttribute(prop);
  } else {
    el.setAttribute(prop, value);
  }
};

getStyle = function(el, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el)[prop];
  } else {
    return el.currentStyle[prop];
  }
};


/*
유틸리티 (utility)
 */

checkCSS3Feature = function(feature) {
  var body, html, html_old_class;
  html = $('html');
  body = $('body');
  html_old_class = attr(html, 'class');
  if (feature in body.style) {
    addClass(html, feature);
  } else {
    addClass(html, 'no-' + feature);
  }
};

checkUserAgent = function(device_name, class_name) {
  var html, userAgent;
  userAgent = navigator.userAgent.toLowerCase();
  html = $('html');
  if (userAgent.indexOf(device_name) > -1) {
    return addClass(html, class_name || device_name);
  }
};

isNumber = function(num) {
  return typeof num === 'number';
};

isString = function(str) {
  return typeof str === 'string';
};

isBoolean = function(boo) {
  return typeof boo === 'boolean';
};

isFunction = function(fnc) {
  return typeof fnc === 'function';
};

isArray = function(arr) {
  return !isObject(arr);
};

isObject = function(obj) {
  return typeof obj === 'object' && !obj.push;
};

isType = function(data, type) {
  validate(isString(type), '두번째 인자 값은 문자열을 사용해야 합니다.');
  switch (data.constructor) {
    case Number:
      return type === 'number' || type === 'num';
    case String:
      return type === 'string' || type === 'str';
    case Boolean:
      return type === 'boolean' || type === 'boo';
    case Function:
      return type === 'function' || type === 'fnc';
    case Array:
      return type === 'array' || type === 'arr';
    case Object:
      return type === 'object' || type === 'obj';
  }
};

isElement = function(el) {
  if (el) {
    return el.nodeType === 1;
  } else {
    return false;
  }
};

isNodeList = function(list) {
  return !!(list && list.length > 0 && list.item);
};

validate = function(condition, error_msg) {
  if (condition === void 0 || condition === null) {
    condition = false;
  } else if (!condition && condition !== 0 && condition !== '') {
    throw new TypeError(error_msg);
  }
};

override = function(obj1, obj2) {
  var key;
  for (key in obj2) {
    obj1[key] = obj2[key];
  }
  return obj1;
};

//# sourceMappingURL=../maps/Libs/dom-helpers.js.map
