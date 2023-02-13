"use strict";
const { randomInt } = require("crypto");

let arrPromise = {};

function generetePromise(n){
    for(let i = 0; i < n; i++){
        let randomNumber = randomInt(n);
        let flag = (randomNumber % 2 == 0);
        
        arrPromise[i] = new Promise((resolve, reject) => {
            setTimeout(() => {
                //flag ? resolve(randomNumber) : reject(randomNumber)
                resolve(randomNumber);                
            }, randomInt(1000, 5000));
        }).then(res => console.log(`${i}: ${res}`));
    }
}

generetePromise(100);

//console.log(arrPromise);

//  Задача №1: Конструктор Promise

// console.log('start')

// const promise1 = new Promise((resolve, reject) => {
//   console.log(1)
// })

// console.log('end');

//Итак, этот код должен последовательно выводить start, 1, end.

//  Задача №2: .then()

// console.log('start');

// const promise2 = new Promise((resolve, reject) => {
//   console.log(1)
//   //resolve(2)
//   reject(3)
// })

// promise2.then(res => {
//   console.log(res)
// }).catch(() => console.log(4))

// console.log('end');

//Итак, выводом будет start , 1 , end и 2 .

//  Задача №3: resolve()

// console.log('start');

// const promise3 = new Promise((resolve, reject) => {
//   console.log(1)
//   resolve(2)
//   console.log(3)
// })

// promise3.then(res => {
//   console.log(res)
// })

// console.log('end');

//Таким образом, выходным результатом будет start , 1 , 3 , end и 2

//  Задача №4: resolve() не вызывается

// console.log('start');

// const promise4 = new Promise((resolve, reject) => {
//   console.log(1)
// })

// promise4.then(res => {
//   console.log(2)
// })

// console.log('end');

//Выходным результатом станет start , 1 , end .

//  Задача №5: Нечто, сбивающее с толку 

// console.log('start')

// const fn = () => (new Promise((resolve, reject) => {
//   console.log(1);
//   resolve('success')
// }))

// console.log('middle')

// fn().then(res => {
//   console.log(res)
// })

// console.log('end')

//Выходным результатом будет start , middle, 1 , end и success.

//  Задача №6: с Fulfilling Promise

// console.log('start')

// Promise.resolve(1).then((res) => {
//   console.log(res)
// })

// Promise.resolve(2).then((res) => {
//   console.log(res)
// })

// console.log('end')

//Выходным результатом будет start , end , 1 и 2.

//  Задача №7: setTimeout vs Promise

// console.log('start')

// setTimeout(() => {
//   console.log('setTimeout')
// })

// Promise.resolve().then(() => {
//   console.log('resolve')
// })

// console.log('end')

//Выходным результатом будет start , end , resolve и setTimeout

//  Задача №8: Микрозадачи смешиваются с макрозадачами

// const promise = new Promise((resolve, reject) => {
//     console.log(1);
//     setTimeout(() => {
//       console.log("timerStart");
//       resolve("success");
//       console.log("timerEnd");
//     }, 0);
//     console.log(2);
//   });
  
//   promise.then((res) => {
//     console.log(res);
//   });
  
//   console.log(4);

//Выведется 1 , 2  и 4, timerStart, timerEnd, success

//  Задача №9: приоритезировать микрозадачи и макрозадачи

// const timer1 = setTimeout(() => {
//     console.log('timer1');
    
//     const promise1 = Promise.resolve().then(() => {
//       console.log('promise1')
//     })
//   }, 0)
  
//   const timer2 = setTimeout(() => {
//     console.log('timer2')
//   }, 0)

//Выведется timer1, promise1, timer2

//  Задача №10: типичный вопрос с собеседования

// console.log('start');

// const promise1 = Promise.resolve().then(() => {
//   console.log('promise1');
//   const timer2 = setTimeout(() => {
//     console.log('timer2')
//   }, 0)
// });

// const timer1 = setTimeout(() => {
//   console.log('timer1')
//   const promise2 = Promise.resolve().then(() => {
//     console.log('promise2')
//   })
// }, 0)

// console.log(`end`);

//Выведется start, end, promise1, timer1, promise2, timer2