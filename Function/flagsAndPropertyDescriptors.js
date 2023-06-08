"use strict"
/*          Флаги свойств          */
{

    // Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).

    // writable – если true, свойство можно изменить, иначе оно только для чтения.
    // enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
    // configurable – если true, свойство можно удалить, а эти атрибуты можно изменять, иначе этого делать нельзя.

    // Метод Object.getOwnPropertyDescriptor позволяет получить полную информацию о свойстве.

    // Его синтаксис:

    let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName)

    // Возвращаемое значение – это объект, так называемый «дескриптор свойства»: 
    // он содержит значение свойства и все его флаги.

    let user = {
    name: "John"
    };

    descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    alert( JSON.stringify(descriptor, null, 2 ) );
    /* дескриптор свойства:
    {
    "value": "John",
    "writable": true,
    "enumerable": true,
    "configurable": true
    }
    */

    // Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.

    // Его синтаксис:

    Object.defineProperty(obj, propertyName, descriptor)

    // Например, здесь создаётся свойство name, все флаги которого имеют значение false:

    user = {};

    Object.defineProperty(user, "name", {
    value: "John"
    });

    descriptor = Object.getOwnPropertyDescriptor(user, 'name');

    alert( JSON.stringify(descriptor, null, 2 ) );
    /*
    {
    "value": "John",
    "writable": false,
    "enumerable": false,
    "configurable": false
    }
    */

}
/*---------------------------------------*/
/*          Только для чтения          */
{

    // Сделаем свойство user.name доступным только для чтения. Для этого изменим флаг writable:

    let user = {
    name: "John"
    };

    Object.defineProperty(user, "name", {
    writable: false
    });

    user.name = "Pete"; // Ошибка: Невозможно изменить доступное только для чтения свойство 'name'
    // Теперь никто не сможет изменить имя пользователя, 
    // если только не обновит соответствующий флаг новым вызовом defineProperty.

    // Вот тот же пример, но свойство создано «с нуля»:

    user = { };

    Object.defineProperty(user, "name", {
    value: "John",
    // для нового свойства необходимо явно указывать все флаги, для которых значение true
    enumerable: true,
    configurable: true
    });

    alert(user.name); // John
    user.name = "Pete"; // Ошибка

}
/*---------------------------------------*/
/*          Неперечислимое свойство          */
{

    // Встроенный метод toString в объектах – неперечислимый, его не видно в цикле for..in. 
    // Но если мы напишем свой собственный метод toString, цикл for..in будет выводить его по умолчанию:

    let user = {
    name: "John",
    toString() {
        return this.name;
    }
    };

    // По умолчанию оба свойства выведутся:
    for (let key in user) alert(key); // name, toString
    
    // Если мы этого не хотим, можно установить для свойства enumerable:false. 
    // оно перестанет появляться в цикле for..in аналогично встроенному toString:

    user = {
    name: "John",
    toString() {
        return this.name;
    }
    };

    Object.defineProperty(user, "toString", {
    enumerable: false
    });

    // Теперь наше свойство toString пропало из цикла:
    for (let key in user) alert(key); // name
    // Неперечислимые свойства также не возвращаются Object.keys:

    alert(Object.keys(user)); // name

}
/*---------------------------------------*/
/*          Неконфигурируемое свойство          */
{

    // Например, свойство Math.PI – только для чтения, неперечислимое и неконфигурируемое:

    let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');

    alert( JSON.stringify(descriptor, null, 2 ) );
    /*
    {
    "value": 3.141592653589793,
    "writable": false,
    "enumerable": false,
    "configurable": false
    }
    */
    // То есть программист не сможет изменить значение Math.PI или перезаписать его.

    Math.PI = 3; // Ошибка, потому что writable: false

    // delete Math.PI тоже не сработает
    // Мы также не можем изменить writable:

    // Ошибка, из-за configurable: false
    Object.defineProperty(Math, "PI", { writable: true });
    // Мы абсолютно ничего не можем сделать с Math.PI.

    // Определение свойства как неконфигурируемого – это дорога в один конец. 
    // Мы не можем изменить его обратно с помощью defineProperty.

    // Обратите внимание: configurable: false не даст изменить флаги свойства, 
    // а также не даст его удалить. При этом можно изменить значение свойства.

    // В коде ниже свойство user.name является неконфигурируемым, 
    // но мы все ещё можем изменить его значение (т.к. writable: true).

    let user = {
    name: "John"
    };

    Object.defineProperty(user, "name", {
    configurable: false
    });

    user.name = "Pete"; // работает
    delete user.name; // Ошибка
    // А здесь мы делаем user.name «навечно запечатанной» константой, как и встроенный Math.PI:

    user = {
    name: "John"
    };

    Object.defineProperty(user, "name", {
    writable: false,
    configurable: false
    });

    // теперь невозможно изменить user.name или его флаги
    // всё это не будет работать:
    user.name = "Pete";
    delete user.name;
    Object.defineProperty(user, "name", { value: "Pete" });

}
/*---------------------------------------*/
/*          Метод Object.defineProperties          */
{

    // Существует метод Object.defineProperties(obj, descriptors), 
    // который позволяет определять множество свойств сразу.

    // Его синтаксис:

    Object.defineProperties(obj, {
    prop1: descriptor1,
    prop2: descriptor2
    // ...
    });
    Например:

    Object.defineProperties(user, {
    name: { value: "John", writable: false },
    surname: { value: "Smith", writable: false },
    // ...
    });
    // Таким образом, мы можем определить множество свойств одной операцией.

}
/*---------------------------------------*/
/*          Object.getOwnPropertyDescriptors          */
{

    // Чтобы получить все дескрипторы свойств сразу, можно воспользоваться методом 
    // Object.getOwnPropertyDescriptors(obj).

    // Вместе с Object.defineProperties этот метод можно использовать для 
    // клонирования объекта вместе с его флагами:

    let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
    // Обычно при клонировании объекта мы используем присваивание, чтобы скопировать его свойства:

    for (let key in user) {
    clone[key] = user[key]
    }
    // …Но это не копирует флаги. Так что если нам нужен клон «получше», 
    // предпочтительнее использовать Object.defineProperties.

    // Другое отличие в том, что for..in игнорирует символьные и неперечислимые свойства, 
    // а Object.getOwnPropertyDescriptors возвращает дескрипторы всех свойств.

}
/*---------------------------------------*/
/*          Глобальное запечатывание объекта          */
{

    // Дескрипторы свойств работают на уровне конкретных свойств.

    // Но ещё есть методы, которые ограничивают доступ ко всему объекту:

    // Object.preventExtensions(obj)
    // Запрещает добавлять новые свойства в объект.
    // Object.seal(obj)
    // Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.
    // Object.freeze(obj)
    // Запрещает добавлять/удалять/изменять свойства. 
    // Устанавливает configurable: false, writable: false для всех существующих свойств.
    // А также есть методы для их проверки:

    // Object.isExtensible(obj)
    // Возвращает false, если добавление свойств запрещено, иначе true.
    // Object.isSealed(obj)
    // Возвращает true, если добавление/удаление свойств запрещено и 
    // для всех существующих свойств установлено configurable: false.
    // Object.isFrozen(obj)
    // Возвращает true, если добавление/удаление/изменение свойств запрещено, 
    // и для всех текущих свойств установлено configurable: false, writable: false.

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
