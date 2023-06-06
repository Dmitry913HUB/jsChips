"use strict"
/*          У стрелочных функций нет «this»          */
{

    // Например, мы можем использовать это для итерации внутри метода объекта:

    let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(
        student => alert(this.title + ': ' + student)
        );
    }
    };

    group.showList();

    // Если бы мы использовали «обычную» функцию, была бы ошибка:

    group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(function(student) {
        // Error: Cannot read property 'title' of undefined
        alert(this.title + ': ' + student)
        });
    }
    };

    group.showList();

}
/*---------------------------------------*/
/*          Стрелочные функции не имеют «arguments»          */
{

    // Например, defer(f, ms) принимает функцию и возвращает обёртку над ней, 
    // которая откладывает вызов на ms миллисекунд:

    function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms)
    };
    }

    function sayHi(who) {
    alert('Hello, ' + who);
    }

    let sayHiDeferred = defer(sayHi, 2000);
    sayHiDeferred("John"); // выводит "Hello, John" через 2 секунды
    // То же самое без стрелочной функции выглядело бы так:

    function defer(f, ms) {
    return function(...args) {
        let ctx = this;
        setTimeout(function() {
        return f.apply(ctx, args);
        }, ms);
    };
    }
    // Здесь мы были вынуждены создать дополнительные переменные args и ctx, 
    // чтобы функция внутри setTimeout могла получить их.

}
/*---------------------------------------*/
/*          итого          */
{

    // Стрелочные функции:

    // Не имеют this.
    // Не имеют arguments.
    // Не могут быть вызваны с new.
    // (У них также нет super, но мы про это не говорили. Про это будет в главе Наследование классов).
    
    // Всё это потому, что они предназначены для небольшого кода, который не имеет своего «контекста», 
    // выполняясь в текущем. И они отлично справляются с этой задачей!

}
/*---------------------------------------*/
/*          итого          */
{

}
/*---------------------------------------*/
