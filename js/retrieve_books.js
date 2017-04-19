//from http://stackoverflow.com/a/22076667/6433745
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() {
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );
        anHttpRequest.send( null );
    }
}

//https://www.html5rocks.com/en/tutorials/cors/
// Create the XHR object.
function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // XHR for Chrome/Firefox/Opera/Safari.
    xhr.open(method, url, true);
  } else if (typeof XDomainRequest != "undefined") {
    // XDomainRequest for IE.
    xhr = new XDomainRequest();
    xhr.open(method, url);
  } else {
    // CORS not supported.
    xhr = null;
  }
  return xhr;
}

// Helper method to parse the title tag from the response.
function getTitle(text) {
  return text.match('<title>(.*)?</title>')[1];
}

function buildTable(text) {
    // var data=[]

    var data = text.split(/\r\n|\n/);

    var books = document.getElementById('books');
    var build = "<thead>\
                    <tr> \
                        <th>" + data[0].split(/,/)[0] + "</th> \
                        <th>" + data[0].split(/,/)[1] + "</th> \
                    </tr> \
                </thead>";
    build+= "<tbody>";
    for (var i = 1; i < data.length; i++) {
        name_author = data[i].split(/,/);
        build += "<tr>";
        build += ("<td> " + name_author[0] + "</td><td> " + name_author[1] + "</td>");
        build += "</tr>";
    }
    build+="</tbody>";
    return build;
}
