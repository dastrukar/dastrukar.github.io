document.addEventListener('DOMContentLoaded', function(event) {

var collapse = document.getElementsByClassName('collapsible');
var links    = document.getElementsByClassName('links');
var i;


for (i = 0; i < collapse.length; i++) {
    collapse[i].addEventListener('click', function() {
        this.classList.toggle('active');

        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            this.children[0].innerHTML = '+++';
            this.children[2].innerHTML = '+++';
            content.style.maxHeight = null;
        } else {
            this.children[0].innerHTML = '---';
            this.children[2].innerHTML = '---';
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    });
}


for (c = 0; c < links.length; c++) {
    var currentlinks = links[c]

    for (i = 0; i < currentlinks.children.length; i++) {
        var a = currentlinks.children[i];

        a.addEventListener('mouseover', function() {
            this.children[0].style.filter = 'invert(45%) sepia(64%) saturate(313%) hue-rotate(134deg) brightness(90%) contrast(83%)';
        });

        a.addEventListener('mouseout', function() {
            this.children[0].style.filter = 'invert(88%) sepia(32%) saturate(257%) hue-rotate(355deg) brightness(96%) contrast(92%)';
        });
    }
}

});


//==========================================
// great-ideas functions
//-----------------------

function fetch(id, page) {
    // check if the input is empty
    if (page.substring(page.length-4, page.length) != '.txt') {
        document.getElementById(id).innerHTML = 'Invalid input.';
        return null;
    }

    // combine url
    page = 'https://cdn.jsdelivr.net/gh/zarlib01/gid@main/' + page;
    console.log(page);

    // send a request to url and also get the text file (if it exists that is)
    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

        console.log(this.readyState);
        console.log(this.status);

        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            document.getElementById(id).innerHTML = this.responseText;
        } else {
            // return an error
            document.getElementById(id).innerHTML = xmlerrorHandler(this.readyState, this.status);
        }
    }

    request.open('GET', page);
    request.send();
}

function xmlerrorHandler(readyState, status) {
    var state = '';
    var stat = '';
    // get readyState
    switch(readyState) {
        case 0:
            state = '0: request not initialized';
            break;
        case 1:
            state = '1: server connection established';
            break;
        case 2:
            state = '2: request received';
            break;
        case 3:
            state = '3: processing request';
            break;
        case 4:
            state = '4: request finished and response is ready';
            break;
        default:
            state = 'unknown error';
            break;
    }

    // get status
    switch(status) {
        case 200:
            stat = '200: "OK"';
            break;
        case 403:
            stat = '403: "Forbidden"';
            break;
        case 404:
            stat = '404: "Page not found"';
            break;
        default:
            stat = String(status) + ': unknown error';
            break;
    }

    return state + ', ' + stat;
}
