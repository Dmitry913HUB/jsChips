"use strict"
/*          F.prototype          */
{

    // Если в F.prototype содержится объект, оператор new устанавливает 
    // его в качестве [[Prototype]] для нового объекта.

    // Приведём пример:

    let animal = {
    eats: true
    };

    function Rabbit(name) {
    this.name = name;
    }

    Rabbit.prototype = animal;

    let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal

    alert( rabbit.eats ); // true

    // F.prototype используется только при вызове 
    // new F() и присваивается в качестве свойства [[Prototype]] нового объекта. 
    // После этого F.prototype и новый объект ничего не связывает. 
    // Следует понимать это как «единоразовый подарок» объекту.

    // После создания F.prototype может измениться, и новые объекты, 
    // созданные с помощью new F(), будут иметь другой объект в качестве [[Prototype]], 
    // но уже существующие объекты сохранят старый.

}
/*---------------------------------------*/
/*          F.prototype по умолчанию, свойство constructor          */
{

    // По умолчанию "prototype" – объект с единственным свойством constructor, 
    // которое ссылается на функцию-конструктор.

    // Вот такой:

    function Rabbit() {}

    /* прототип по умолчанию
    Rabbit.prototype = { constructor: Rabbit };
    */

    // Проверим это:

    function Rabbit() {}
    // по умолчанию:
    // Rabbit.prototype = { constructor: Rabbit }

    alert( Rabbit.prototype.constructor == Rabbit ); // true

    // Соответственно, если мы ничего не меняем, 
    // то свойство constructor будет доступно всем кроликам через [[Prototype]]:

    function Rabbit() {}
    // по умолчанию:
    // Rabbit.prototype = { constructor: Rabbit }

    let rabbit = new Rabbit(); // наследует от {constructor: Rabbit}

    alert(rabbit.constructor == Rabbit); // true (свойство получено из прототипа)

    // Мы можем использовать свойство constructor существующего объекта для создания нового.

    // Пример:

    function Rabbit(name) {
    this.name = name;
    alert(name);
    }

    rabbit = new Rabbit("White Rabbit");

    let rabbit2 = new rabbit.constructor("Black Rabbit");

    // …JavaScript сам по себе не гарантирует правильное значение свойства "constructor".

    // В частности, если мы заменим прототип по умолчанию на другой объект, 
    // то свойства "constructor" в нём не будет.

    // Например:

    function Rabbit() {}
    Rabbit.prototype = {
    jumps: true
    };

    rabbit = new Rabbit();
    alert(rabbit.constructor === Rabbit); // false

    // Таким образом, чтобы сохранить верное свойство "constructor", 
    // мы должны добавлять/удалять/изменять свойства у прототипа по умолчанию вместо того, 
    // чтобы перезаписывать его целиком:

    function Rabbit() {}

    // Не перезаписываем Rabbit.prototype полностью,
    // а добавляем к нему свойство
    Rabbit.prototype.jumps = true
    // Прототип по умолчанию сохраняется, и мы всё ещё имеем доступ к Rabbit.prototype.constructor

    // Или мы можем заново создать свойство constructor:

    Rabbit.prototype = {
    jumps: true,
    constructor: Rabbit
    };

    // теперь свойство constructor снова корректное, так как мы добавил

}
/*---------------------------------------*/
/*          итого          */
{

    // В этой главе мы кратко описали способ задания [[Prototype]] для объектов, 
    // создаваемых с помощью функции-конструктора. Позже мы рассмотрим, 
    // как можно использовать эту возможность.

    // Всё достаточно просто. Выделим основные моменты:

    // Свойство F.prototype (не путать с [[Prototype]]) устанавливает[[Prototype]] 
    // для новых объектов при вызове new F().
    // Значение F.prototype должно быть либо объектом, либо null. Другие значения не будут работать.
    // Свойство "prototype" является особым, только когда оно назначено функции-конструктору, 
    // которая вызывается оператором new.
    // В обычных объектах prototype не является чем-то особенным:

    let user = {
    name: "John",
    prototype: "Bla-bla" // никакой магии нет - обычное свойство
    };

    // По умолчанию все функции имеют F.prototype = { constructor: F }, 
    // поэтому мы можем получить конструктор объекта через свойство "constructor".

}
/*---------------------------------------*/
/*          Задачи          */
{

    // Изменяем "prototype"

    function Rabbit() {}
    Rabbit.prototype = {
    eats: true
    };

    let rabbit = new Rabbit();

    Rabbit.prototype = {}; // true
    Rabbit.prototype.eats = false; // false
    delete rabbit.eats; //true
    delete Rabbit.prototype.eats; //undefined

    alert( rabbit.eats ); // ?

    // Создайте новый объект с помощью уже существующего

    // Например, если мы не меняли "prototype", используемый по умолчанию, 
    // то код ниже, без сомнений, сработает:

    function User(name) {
    this.name = name;
    }

    let user = new User('John');
    let user2 = new user.constructor('Pete');

    alert( user2.name ); // Pete (сработало!)

    // Но если кто-то перезапишет User.prototype и забудет заново назначить свойство 
    // "constructor", чтобы оно указывало на User, то ничего не выйдет.

    function User(name) {
    this.name = name;
    }
    User.prototype = {}; // (*)

    user = new User('John');
    user2 = new user.constructor('Pete');

    alert( user2.name ); // undefined

    // Сначала ищется свойство constructor в объекте user. Не нашлось.
    // Потом задействуется поиск по цепочке прототипов. 
    // Прототип объекта user – это User.prototype, и там тоже нет искомого свойства.
    // Идя дальше по цепочке, значение User.prototype – это пустой объект {}, 
    // чей прототип – встроенный Object.prototype.
    // Наконец, для встроенного Object.prototype предусмотрен встроенный 
    // Object.prototype.constructor == Object. Таким образом, 
    // свойство constructor всё-таки найдено.
    // В итоге срабатывает let user2 = new Object('Pete').

}
/*---------------------------------------*/
/*          итого          */
{

}
/*---------------------------------------*/
/*          итого          */
{

}
/*---------------------------------------*/