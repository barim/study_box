var bgControl, bgControl_btn, bgGroup, html, setHeight;

setHeight = function() {
  return bgGroup.style.cssText = 'height: ' + html.clientHeight + 'px;';
};

html = $('html');

bgGroup = $('#background-group');

window.onload = window.onresize = setHeight;

bgControl = $('#background-control');

bgControl_btn = $('#background-control a');

bgControl_btn[0].onclick = function() {
  $('#background-group .bg-area-1').className += ' filter-off';
  return false;
};

bgControl_btn[1].onclick = function() {
  $('#background-group .bg-area-2').classList.add('filter-off');
  return false;
};

bgControl_btn[2].onclick = function() {
  $('#background-group .bg-area-3').classList.add('filter-off');
  return false;
};

bgControl_btn[3].onclick = function() {
  $('#background-group .bg-area-4').classList.add('filter-off');
  return false;
};

//# sourceMappingURL=maps/index.js.map
