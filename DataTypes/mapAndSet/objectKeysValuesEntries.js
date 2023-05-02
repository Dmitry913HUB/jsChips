"use strict"
/*          Object.keys, values, entries        */
{

    // Для простых объектов доступны следующие методы:

    // Object.keys(obj) – возвращает массив ключей.
    // Object.values(obj) – возвращает массив значений.
    // Object.entries(obj) – возвращает массив пар [ключ, значение].
    // Обратите внимание на различия (по сравнению с map, например):

    // Map	Object
    // Синтаксис вызова	map.keys()	            Object.keys(obj), не obj.keys()
    // Возвращает	        перебираемый объект	    «реальный» массив

    let user = {
        name: "John",
        age: 30
    };
    Object.keys(user) = ["name", "age"]
    Object.values(user) = ["John", 30]
    Object.entries(user) = [ ["name","John"], ["age",30] ]

    user = {
        name: "John",
        age: 30
      };
      
      // перебор значений
      for (let value of Object.values(user)) {
        alert(value); // John, затем 30
      }

}
/*---------------------------------------*/
/*          Трансформации объекта        */
{

    // У объектов нет множества методов, которые есть в массивах, например map, filter и других.

    // Если мы хотели бы их применить, то можно использовать Object.entries 
    // с последующим вызовом Object.fromEntries:

    // Вызов Object.entries(obj) возвращает массив пар ключ/значение для obj.
    // На нём вызываем методы массива, например, map.
    // Используем Object.fromEntries(array) на результате, чтобы преобразовать его обратно в объект.
    // Например, у нас есть объект с ценами, и мы хотели бы их удвоить:

    let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
    };

    let doublePrices = Object.fromEntries(
    // преобразовать в массив, затем map, затем fromEntries обратно объект
    Object.entries(prices).map(([key, value]) => [key, value * 2])
    );

    alert(doublePrices.meat); // 8

}
/*---------------------------------------*/
/*          Задачи        */
{

    // Сумма свойств объекта

    function sumSalaries(sal){
        let sum = 0;
        for(let value of Object.values(sal)) sum += value;
        return sum;
    }

    function sumSalaries(sal){
        return Object.values(sal).reduce((a, b) => a + b, 0)
    }

    // Подсчёт количества свойств объекта

    function count(user){
        return Object.keys(user).length;
    }

    let user = {
        name: 'John',
        age: 30
      };
      
      alert( count(user) ); // 2

}
/*---------------------------------------*/
/*          Итого        */
{

}
/*---------------------------------------*/
