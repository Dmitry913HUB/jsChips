"use strict"
/*          Литералы и свойства          */
{
    //Пустой объект («пустой ящик») можно создать, используя один из двух вариантов синтаксиса:

    let user = new Object(); // синтаксис "конструктор объекта"
    let user1 = {};  // синтаксис "литерал объекта"

    //При использовании литерального синтаксиса {...} мы сразу можем поместить в объект несколько свойств в виде пар «ключ: значение»:

    let user2 = {     // объект
        name: "John",  // под ключом "name" хранится значение "John"
        age: 30        // под ключом "age" хранится значение 30
    };

    //Для обращения к свойствам используется запись «через точку»:

    // получаем свойства объекта:
    alert( user.name ); // John
    alert( user.age ); // 30

    //Для удаления свойства мы можем использовать оператор delete:

    delete user.age;

    //Имя свойства может состоять из нескольких слов, но тогда оно должно быть заключено в кавычки:

    let user3 = {
        name: "John",
        age: 30,
        "likes birds": true  // имя свойства из нескольких слов должно быть в кавычках
    };

    //Объект, объявленный как константа, может быть изменён
    //Объект, объявленный через const, может быть изменён.

    const user4 = {
        name: "John"
    };

    user4.name = "Pete"; // (*)

    alert(user4.name); // Pete
}
/*---------------------------------------*/
/*          Квадратные скобки           */
{
    //Для свойств, имена которых состоят из нескольких слов, доступ к значению «через точку» не работает:

    // это вызовет синтаксическую ошибку
    //user.likes birds = true

    //Для таких случаев существует альтернативный способ доступа к свойствам через квадратные скобки. Такой способ сработает с любым именем свойства:

    let user = {};

    // присваивание значения свойству
    user["likes birds"] = true;

    // получение значения свойства
    alert(user["likes birds"]); // true

    // удаление свойства
    delete user["likes birds"];

    //Квадратные скобки также позволяют обратиться к свойству, имя которого может быть результатом выражения. Например, имя свойства может храниться в переменной:

    let key = "likes birds";

    // то же самое, что и user["likes birds"] = true;
    user[key] = true;

    //Здесь переменная key может быть вычислена во время выполнения кода или зависеть от пользовательского ввода. После этого мы используем её для доступа к свойству. Это даёт нам большую гибкость.

    user = {
        name: "John",
        age: 30
    };

    key = prompt("Что вы хотите узнать о пользователе?", "name");

    // доступ к свойству через переменную
    alert( user[key] ); // John (если ввели "name")

    //Запись «через точку» такого не позволяет:

    key = "name";

    alert( user.key ); // undefined

    //Мы можем использовать квадратные скобки в литеральной нотации для создания вычисляемого свойства.

    let fruit = prompt("Какой фрукт купить?", "apple");

    let bag = {
    [fruit]: 5, // имя свойства будет взято из переменной fruit
    };

    alert( bag.apple ); // 5, если fruit="apple"

    //По сути, пример выше работает так же, как и следующий пример:

    fruit = prompt("Какой фрукт купить?", "apple");
    bag = {};

    // имя свойства будет взято из переменной fruit
    bag[fruit] = 5;
    //Но первый пример выглядит лаконичнее.

    //Мы можем использовать и более сложные выражения в квадратных скобках:

    fruit = 'apple';
    bag = {
    [fruit + 'Computers']: 5 // bag.appleComputers = 5
    };

}
/*---------------------------------------*/
/*          Свойство из переменной          */
{
    //В реальном коде часто нам необходимо использовать существующие переменные как значения для свойств с тем же именем.

    function makeUser(name, age) {
        return {
            name: name,
            age: age
            // ...другие свойства
        };
    }

    let user = makeUser("John", 30);
    alert(user.name); // John

    //Вместо name:name мы можем написать просто name:

    function makeUser(name, age) {
        return {
            name, // то же самое, что и name: name
            age   // то же самое, что и age: age
            // ...
        };
    }

    //Мы можем использовать как обычные свойства, так и короткие в одном и том же объекте:

    user = {
    name,  // тоже самое, что и name:name
    age: 30
    };

}
/*---------------------------------------*/
/*          Ограничения на имена свойств          */
{
    //Как мы уже знаем, имя переменной не может совпадать с зарезервированными словами, такими как «for», «let», «return» и т.д.
    //Но для свойств объекта такого ограничения нет:

    // эти имена свойств допустимы
    let obj = {
        for: 1,
        let: 2,
        return: 3
    };

    alert( obj.for + obj.let + obj.return );  // 6

    //Например, если использовать число 0 в качестве ключа, то оно превратится в строку "0":

    obj = {
    0: "Тест" // то же самое что и "0": "Тест"
    };

    // обе функции alert выведут одно и то же свойство (число 0 преобразуется в строку "0")
    alert( obj["0"] ); // Тест
    alert( obj[0] ); // Тест (то же свойство)

    //Есть небольшой подводный камень, связанный со специальным свойством __proto__. Мы не можем установить его в необъектное значение:

    obj = {};
    obj.__proto__ = 5; // присвоим число
    alert(obj.__proto__); // [object Object], значение - это объект, т.е. не то, что мы ожидали

}
/*---------------------------------------*/
/*          Проверка существования свойства, оператор «in»          */
{
    //При обращении к свойству, которого нет, возвращается undefined. Это позволяет просто проверить существование свойства:

    let user = {};

    alert( user.noSuchProperty === undefined ); // true означает "свойства нет"

    //Также существует специальный оператор "in" для проверки существования свойства в объекте.

    //Синтаксис оператора:

    "key" in object;

    user = { name: "John", age: 30 };

    alert( "age" in user ); // true, user.age существует
    alert( "blabla" in user ); // false, user.blabla не существует

    //Если мы опускаем кавычки, это значит, что мы указываем переменную, в которой находится имя свойства. Например:

    user = { age: 30 };

    let key = "age";
    alert( key in user ); // true, имя свойства было взято из переменной key

    // В большинстве случаев прекрасно сработает сравнение с undefined. Но есть особый случай, когда оно не подходит, и нужно использовать "in".

    // Это когда свойство существует, но содержит значение undefined:

    let obj = {
        test: undefined
    };

    alert( obj.test ); //  выведет undefined, значит свойство не существует?
    alert( "test" in obj ); // true, свойство существует!

}
/*---------------------------------------*/
/*          Цикл "for..in"          */
{
    //Для перебора всех свойств объекта используется цикл for..in. Этот цикл отличается от изученного ранее цикла for(;;).

    // Синтаксис:

    for (key in object) {
    // тело цикла выполняется для каждого свойства объекта
    }

    //К примеру, давайте выведем все свойства объекта user:

    let user = {
        name: "John",
        age: 30,
        isAdmin: true
    };

    for (let key in user) {
        // ключи
        alert( key );  // name, age, isAdmin
        // значения ключей
        alert( user[key] ); // John, 30, true
    }

    // Короткий ответ: свойства упорядочены особым образом: свойства с целочисленными ключами 
    //сортируются по возрастанию, остальные располагаются в порядке создания. Разберёмся подробнее.

    // В качестве примера рассмотрим объект с телефонными кодами:

    let codes = {
        "49": "Германия",
        "41": "Швейцария",
        "44": "Великобритания",
        // ..,
        "1": "США"
    };

    for (let code in codes) {
        alert(code); // 1, 41, 44, 49
    }

    //То есть, "49" – это целочисленное имя свойства, потому что если его преобразовать в целое число, а затем обратно в строку, то оно не изменится. А вот свойства "+49" или "1.2" таковыми не являются:

    // Math.trunc - встроенная функция, которая удаляет десятичную часть
    alert( String(Math.trunc(Number("49"))) ); // "49", то же самое ⇒ свойство целочисленное
    alert( String(Math.trunc(Number("+49"))) ); // "49", не то же самое, что "+49" ⇒ свойство не целочисленное
    alert( String(Math.trunc(Number("1.2"))) ); // "1", не то же самое, что "1.2" ⇒ свойство не целочисленное

    //С другой стороны, если ключи не целочисленные, то они перебираются в порядке создания, например:

    user = {
        name: "John",
        surname: "Smith"
    };
    user.age = 25; // добавим ещё одно свойство

    // не целочисленные свойства перечислены в порядке создания
    for (let prop in user) {
        alert( prop ); // name, surname, age
    }

    //Таким образом, чтобы решить нашу проблему с телефонными кодами, мы можем схитрить, сделав коды не целочисленными свойствами. Добавления знака "+" перед каждым кодом будет достаточно.

    codes = {
        "+49": "Германия",
        "+41": "Швейцария",
        "+44": "Великобритания",
        // ..,
        "+1": "США"
    };

    for (let code in codes) {
        alert( +code ); // 49, 41, 44, 1
    }

}
/*---------------------------------------*/
/*          Задачки          */
{
    //Напишите функцию isEmpty(obj), которая возвращает true, если у объекта нет свойств, иначе false
    //Просто в цикле перебираем свойства объекта и возвращаем false, как только встречаем свойство.

    function isEmpty(obj) {
        for (let key in obj) {
                // если тело цикла начнет выполняться - значит в объекте есть свойства
                return false;
            }
        return true;
    }   
    
    //Напишите код для суммирования всех зарплат и сохраните результат в переменной sum. Должно получиться 390.

    //Если объект salaries пуст, то результат должен быть 0.

    let salaries = {
        John: 100,
        Ann: 160,
        Pete: 130
    };

    let sum = 0;
    for (let key in salaries) {
        sum += salaries[key];
    }

    alert(sum); // 390

    //Создайте функцию multiplyNumeric(obj), которая умножает все числовые свойства объекта obj на 2.

    function multiplyNumeric(obj) {
        for (let key in obj) {
        // if (typeof obj[key] == 'number') {
          if (+obj[key]) {
            obj[key] *= 2;
          }
        }
      }

}
/*---------------------------------------*/