"use strict";
let url = 'http://178.216.77.25/yyy';

async function getRequest(url = ''){
 
    let response = await fetch(url);

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await response.json();

        console.log(json);
        console.log(response.headers);
      } else {
        console.log("Ошибка HTTP: " + response.status);
      }

    // let commits = await response.json(); // читаем ответ в формате JSON

    // console.log(commits);
}

// getRequest(url);

async function postData( url = '', data = {}){

    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        return response.json(); // parses JSON response into native JavaScript objects
      }
    return JSON.stringify("Ошибка HTTP: " + response.status);     
}

postData(url, { n: 1 })
    .then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
});
