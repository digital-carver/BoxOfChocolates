// ==UserScript==
// @name          BoxOfChocolates
// @namespace     abiteasier.in
// @description   Gives you a ready-to-use command to install multiple packages that you select on chocolatey.org
// @include       http://chocolatey.org/*
// @version       0.1
// @grant         none
// ==/UserScript==

var pkg_names_store = 'GMx_abiteasier_chocolates';
var get_em_all_store = 'GMx_abiteasier_cmd';
insert_add_to_box();
write_box(localStorage[get_em_all_store]);

function storage_callback(storage_event) {
    if (storage_event.key === get_em_all_store) {
        update_box(localStorage[get_em_all_store]);
    }
}
window.addEventListener('storage', storage_callback, false);

function update_box(new_cmd) {
    var box_o_choc = document.getElementById('GMx_box_o_choc');
    if (box_o_choc) {
        box_o_choc.firstChild.nodeValue = new_cmd;
    }
    else {
        write_box(new_cmd);
    }
}

function write_box(get_em_all_cmd) {
    var text_elem = document.createTextNode(get_em_all_cmd);

    var box_o_choc = document.createElement('code');
    box_o_choc.appendChild(text_elem);
    box_o_choc.id = 'GMx_box_o_choc';

    var box_container = document.createElement('div');
    box_container.appendChild(box_o_choc);
    box_container.id = 'GMx_box_container';
    box_container.classList.add('nuget-badge');

    document.getElementById('content-wrapper').insertBefore(box_container, document.getElementById('body'));
}


function make_get_em_all_cmd(box_obj)
{
    //Currently uses PowerShell Workaround syntax from https://github.com/chocolatey/chocolatey/wiki/CommandsInstall
    //TODO: Add an option to choose cinst 0.9.8.21+ syntax or cmd shell syntax
    var cmd = '';
    for (var key in box_obj) {
        if (box_obj.hasOwnProperty(key)) {
            cmd += "'" + key + "', ";
        }
    }
    cmd = cmd.replace(/,\s*$/, ''); //Remove extra comma at end
    cmd += ' | %{ cinst $_ } ';
    return cmd;
}

function get_atb_elem(pkg_name) {
    var add_to_box = document.createElement('span');
    var atb_text = document.createTextNode('(Add to Box)');
    add_to_box.appendChild(atb_text);
    add_to_box.style.fontSize = '50%';
    add_to_box.style.cssFloat = 'right';
    add_to_box.style.cursor = 'pointer';
    add_to_box.style.borderBottom = 'thin dotted';
    add_to_box.style.lineHeight = '0.9';
    add_to_box.id = 'GMx_addtobox'; 

    add_to_box.onclick = function() {
        var box_contents = JSON.parse(localStorage[pkg_names_store] || '{}');
        box_contents[pkg_name] = 'add_this';
        localStorage[pkg_names_store] = JSON.stringify(box_contents);
        var get_em_all_cmd = make_get_em_all_cmd(box_contents);
        localStorage[get_em_all_store] = get_em_all_cmd;
        update_box(get_em_all_cmd);
    }

    return add_to_box;
}

function insert_add_to_box() {
    var code_elems = document.getElementsByTagName('code');

    var cinst_regex = /cinst\s+(\S+)/;
    for (var i = 0; i < code_elems.length; i++) {
        var ce = code_elems[i];
        var cmd = ce.textContent;
        var cinst_match = cmd.match(cinst_regex);

        if (cinst_match) {
            var add_to_box = get_atb_elem(cinst_match[1]);
            ce.insertBefore(add_to_box, ce.childNodes[0]);
        }
    }
}
