function fetch(id, page) {
    // combine url
    // page = 'https://dastrukar.codeberg.page/' + page

    // send a request to url and also get the text file (if it exists that is)
    var request = new XMLHttpRequest();
    request.open('GET', page);
    request.send();

    request.onreadyStateChange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).innerHTML = this.responseText;
        } else {
            // return an error
            document.getElementById(id).innerHTML = xmlerrorHandler(this.readyState, this.status);
        }
    }
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