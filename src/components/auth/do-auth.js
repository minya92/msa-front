export const doAuth = (login, pass) => {
  return new Promise(function(resolve, reject) {
      var newUrl = '/auth/';
      var xhr = new XMLHttpRequest();
      xhr.open("get", newUrl, true);
      xhr.setRequestHeader("Authorization", "Basic " + btoa(login+':'+pass));
      xhr.withCredentials = true;
      xhr.onreadystatechange = function(evt) {
          if (xhr.readyState == 4) {
              if (xhr.responseText == 'ok')
                  resolve();
              else
                  reject(xhr);
          }
      };
      xhr.send();
  }).then(function() {
    window.location = '#';
  }, function(xhr) {
    console.log(xhr);
  });
}

export default doAuth;
