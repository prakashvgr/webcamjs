// The Api module is designed to handle all interactions with the server

var Api = (function () {
  var requestPayload;
  var responsePayload;
  var messageEndpoint = '/api/classify';

  // Publicly accessible methods defined
  return {
    classifyImage: classifyImage,

    // The request/response getters/setters are defined here to prevent internal methods
    // from calling the methods without any of the callbacks that are added elsewhere.
    getRequestPayload: function () {
      return requestPayload;
    },
    setRequestPayload: function (newPayloadStr) {
      requestPayload = JSON.parse(newPayloadStr);
    },
    getResponsePayload: function () {
      return responsePayload;
    },
    setResponsePayload: function (newPayloadStr) {
      responsePayload = JSON.parse(newPayloadStr);
    }
  };

  // Send image to classifyImage function
  function classifyImage(data) {
    // Built http request
    var http = new XMLHttpRequest();
    http.open('POST', messageEndpoint, true);
    http.setRequestHeader('Content-type', 'application/json');
    http.onreadystatechange = function () {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        //Insert JSON Data Logic here
        //document.getElementById('results').innerHTML = http.responseText;
        document.getElementById('results').innerHTML = JSON.parse(http.responseText);
      }
    };

    var payload = {
      image_data: data
    };

    var params = JSON.stringify(payload);
    // Send request
    http.send(params);
  }
}());