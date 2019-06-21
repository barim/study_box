var collapseMenu, expandMenu, gnb, gnb_expand_handle, gnb_links, handle, i, l, parentEl;

expandMenu = function() {
  var _this;
  _this = this.nodeName.toLowerCase();
  if (_this === 'a') {
    radioClass(parentEle(this), 'on');
  } else {
    radioClass(this, 'on');
  }
};

collapseMenu = function() {
  removeClass($('.on', gnb), 'on');
};

gnb = $('#gnb');

gnb_links = $('a', gnb);

gnb_expand_handle = $('.expand-handle', gnb);

i = 0;

l = gnb_expand_handle.length;

handle = void 0;

parentEl = void 0;

while (i < l) {
  handle = gnb_expand_handle[i];
  parentEl = parentEle(handle);
  handle.onfocus = expandMenu;
  if (i === l - 1) {
    last(parentEl, 'a').onblur = collapseMenu;
  }
  parentEl.onmouseenter = expandMenu;
  parentEl.onmouseleave = collapseMenu;
  i++;
}

//# sourceMappingURL=maps/index.js.map
