export const doAuth = (login, pass) => {
  return new Promise(function(resolve, reject) {
      var newUrl = '/auth?rand=' + +(new Date());
      var xhr = new XMLHttpRequest();
      xhr.open("get", newUrl, true);
      xhr.setRequestHeader("Authorization", "Basic " + btoa(login+':'+pass));
      xhr.withCredentials = true;
      xhr.onreadystatechange = function(evt) {
          if(xhr.readyState == xhr.HEADERS_RECEIVED && xhr.status == 401) {
              console.log('Неверное имя пользователя или пароль!');
              reject(xhr);
          }
          if (xhr.readyState == 4 && xhr.status == 200) {
              if (xhr.responseText.indexOf('ok') != -1)
                  resolve(xhr);
              else
                  reject(xhr);
          }
      };
      xhr.send();
  })
}

export default doAuth;
