// ==UserScript==
// @name          BoxOfChocolates
// @namespace     abiteasier.in
// @description   Gives you a ready-to-use command to install multiple packages that you select on chocolatey.org
// @include       http://chocolatey.org/*
// @version       0.1
// @grant         none
// ==/UserScript==

var code_elems = document.getElementsByTag('code');

var add_to_box = document.createElement('span');
var atb_text = document.createTextNode('(Add to Box)');
add_to_box.appendChild(atb_text);

for (var i = 0; i < code_elems.length; i++) {
    var ce = code_elems[i];
    ce.insertBefore(add_to_box, ce.childNodes[0]);
}

