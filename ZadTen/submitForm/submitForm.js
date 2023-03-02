"use strict";

let url = 'http://178.216.77.25/fileToServer';

// function pushFromServer(formParam){
//     console.log(formParam);
// }

// async function postData( url = ''){

//     let form = new FormData(document.getElementById('formSubmit'));
//     //form.append('uname', 'Nikita');
//     //form.append('surname', 'Ten');
    
//     let response = await fetch(url, {
//         method: 'POST',
//         mode: 'no-cors',
//         // headers: {
//         //     'Content-Type': 'multipart/form-data'
//         //     // 'Content-Type': 'application/json'
//         //     // 'Content-Type': 'application/x-www-form-urlencoded',
//         // },
//         body: form // body data type must match "Content-Type" header
//     });

//     let awaitResponse = await response.json();

//     if (response.ok) { // если HTTP-статус в диапазоне 200-299
//         // получаем тело ответа (см. про этот метод ниже)
//         //onOk(response.json()); // parses JSON response into native JavaScript objects
//         return awaitResponse;
//       }

//     return JSON.stringify("Ошибка HTTP: " + response.status);     
// }

async function postData( url = ''){

    let form = new FormData(document.getElementById('formSubmit'));

    fetch(url,{
            method: 'POST',
            // mode:'cors',   
            headers: {
                'Access-Control-Allow-Origin' : '*',
                'Access-Control-Allow-Methods' : '*',
                'Access-Control-Allow-Headers' : '*',
            },
            body: form,       
        })
    .then(response => response.json())
    .then(res => console.log(res.res));
   
}

function pushToServer(){
    // let form = document.getElementById('formSubmit');

    // form.action = url;
    // form.method = 'POST';
    // form.enctype = 'multipart/form-data';

    // form.submit();
    
    postData(url);
}