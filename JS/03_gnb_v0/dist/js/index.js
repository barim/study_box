var collapseMenu, count, gnb, gnbD1Focus, gnb_d1_links, gnb_d1_lis, gnb_d1_lis_len, k, l;

gnbD1Focus = function() {
  collapseMenu();
  return this.parentNode.classList.add('on');
};

collapseMenu = function() {
  var target;
  target = $('#gnb .on');
  if (target.nodeName) {
    return target.classList.remove('on');
  }
};

gnb = $('#gnb');

gnb_d1_links = $('#gnb .lv-1 > li > a');

count = 0;

k = 0;

l = gnb_d1_links.length;

while (k < l) {
  gnb_d1_links[k].onfocus = gnbD1Focus;
  k++;
}

gnb_d1_lis = $('#gnb .lv-1 > li');

gnb_d1_lis_len = gnb_d1_lis.length;

while (gnb_d1_lis_len--) {
  gnb_d1_lis[gnb_d1_lis_len].onmouseleave = collapseMenu;
}

document.onclick = collapseMenu;

//# sourceMappingURL=maps/index.js.map
