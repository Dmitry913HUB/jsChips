"use strict";

document.addEventListener("DOMContentLoaded", function(event) { 
    window.iframe.onload = function(){
        pushFromServer();
      }
  });

let url = 'http://178.216.77.25/fileToServer';

function pushToServer(){
    // let form = document.getElementById('formSubmit');

    // form.action = url;
    // form.method = 'POST';
    // form.enctype = 'multipart/form-data';

    // form.submit();
    postData(url, pushFromServer)
}

function pushFromServer(formParam){
    console.log(formParam);
}

async function postData( url = '', onOk){

    let response = await fetch(url, {
        method: 'POST',
        // headers: {
        //     'Content-Type': 'multipart/form-data'
        //     // 'Content-Type': 'application/json'
        //     // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        body: new FormData() // body data type must match "Content-Type" header
    });

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        onOk(response.json()); // parses JSON response into native JavaScript objects
      }
    //return JSON.stringify("Ошибка HTTP: " + response.status);     
}