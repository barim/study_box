var $, checkCSS3Feature, checkUserAgent, getStyle;

$ = function(selector) {
  var nodeList, nodeList_length;
  nodeList = document.querySelectorAll(selector);
  nodeList_length = nodeList.length;
  if (nodeList_length === 1) {
    return nodeList[0];
  }
  return nodeList;
};

getStyle = function(el, prop) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(el)[prop];
  } else {
    return el.currentStyle[prop];
  }
};

checkCSS3Feature = function(feature) {
  var body, html, html_old_class;
  html = $('html');
  body = $('body');
  if (feature in body.style) {
    html_old_class = html.getAttribute('class');
    return html.setAttribute('class', html_old_class + ' ' + feature);
  } else {
    html_old_class = html.getAttribute('class');
    return html.setAttribute('class', html_old_class + ' no-' + feature);
  }
};

checkUserAgent = function(device_name) {
  var html, html_old_class, userAgent;
  userAgent = navigator.userAgent.toLowerCase();
  html = $('html');
  if (userAgent.indexOf(device_name) > -1) {
    html_old_class = html.getAttribute('class');
    return html.setAttribute('class', html_old_class + ' ' + device_name);
  }
};

//# sourceMappingURL=maps/dom-helpers.js.map
