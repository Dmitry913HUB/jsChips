"use strict"
/*          JSON.stringify        */
{

    // Например, здесь мы преобразуем через JSON.stringify данные студента:

    let student = {
    name: 'John',
    age: 30,
    isAdmin: false,
    courses: ['html', 'css', 'js'],
    wife: null
    };

    let json = JSON.stringify(student);

    alert(typeof json); // мы получили строку!

    alert(json);
    /* выведет объект в формате JSON:
    {
    "name": "John",
    "age": 30,
    "isAdmin": false,
    "courses": ["html", "css", "js"],
    "wife": null
    }
    */

    // Метод JSON.stringify(student) берёт объект и преобразует его в строку.

    // Полученная строка json называется JSON-форматированным или сериализованным объектом. 
    // Мы можем отправить его по сети или поместить в обычное хранилище данных.

    // Обратите внимание, что объект в формате JSON имеет несколько важных отличий от объектного литерала:

    // Строки используют двойные кавычки. Никаких одинарных кавычек или обратных кавычек в JSON. 
    // Так 'John' становится "John".
    // Имена свойств объекта также заключаются в двойные кавычки. Это обязательно. 
    // Так age:30 становится "age":30.
    // JSON.stringify может быть применён и к примитивам.

    // JSON поддерживает следующие типы данных:

    // Объекты { ... }
    // Массивы [ ... ]
    // Примитивы:
    // строки,
    // числа,
    // логические значения true/false,
    // null.
    // Например:

    // число в JSON остаётся числом
    alert( JSON.stringify(1) ) // 1

    // строка в JSON по-прежнему остаётся строкой, но в двойных кавычках
    alert( JSON.stringify('test') ) // "test"

    alert( JSON.stringify(true) ); // true

    alert( JSON.stringify([1, 2, 3]) ); // [1,2,3]
    // JSON является независимой от языка спецификацией для данных, поэтому JSON.stringify 
    // пропускает некоторые специфические свойства объектов JavaScript.

    // А именно:

    // Свойства-функции (методы).
    // Символьные ключи и значения.
    // Свойства, содержащие undefined.

    let user = {
    sayHi() { // будет пропущено
        alert("Hello");
    },
    [Symbol("id")]: 123, // также будет пропущено
    something: undefined // как и это - пропущено
    };

    alert( JSON.stringify(user) ); // {} (пустой объект)
    // Обычно это нормально. Если это не то, чего мы хотим, то скоро мы увидим, 
    // как можно настроить этот процесс.

    // Самое замечательное, что вложенные объекты поддерживаются и конвертируются автоматически.

    let meetup = {
    title: "Conference",
    room: {
        number: 23,
        participants: ["john", "ann"]
    }
    };

    alert( JSON.stringify(meetup) );
    /* вся структура преобразована в строку:
    {
    "title":"Conference",
    "room":{"number":23,"participants":["john","ann"]},
    }
    */
    // Важное ограничение: не должно быть циклических ссылок.

    let room = {
    number: 23
    };

    meetup = {
    title: "Conference",
    participants: ["john", "ann"]
    };

    meetup.place = room;       // meetup ссылается на room
    room.occupiedBy = meetup; // room ссылается на meetup

    JSON.stringify(meetup); // Ошибка: Преобразование цикличной структуры в JSON

}
/*---------------------------------------*/
/*          Исключаем и преобразуем: replacer        */
{

    // Полный синтаксис JSON.stringify:

    let json = JSON.stringify(value, [replacer, space])

    // value
    // Значение для кодирования.
    // replacer
    // Массив свойств для кодирования или функция соответствия function(key, value).
    // space
    // Дополнительное пространство (отступы), используемое для форматирования.

    // В большинстве случаев JSON.stringify используется только с первым аргументом. Но если нам нужно настроить процесс замены, например, отфильтровать циклические ссылки, то можно использовать второй аргумент JSON.stringify.

    // Если мы передадим ему массив свойств, будут закодированы только эти свойства.

    let room = {
    number: 23
    };

    let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup ссылается на room
    };

    room.occupiedBy = meetup; // room ссылается на meetup

    alert( JSON.stringify(meetup, ['title', 'participants']) );
    // {"title":"Conference","participants":[{},{}]}
    // Здесь мы, наверное, слишком строги. Список свойств применяется ко всей структуре объекта. 
    // Так что внутри participants – пустые объекты, потому что name нет в списке.

    // Давайте включим в список все свойства, кроме room.occupiedBy, из-за которого появляется цикличная ссылка:

    room = {
    number: 23
    };

    meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup ссылается на room
    };

    room.occupiedBy = meetup; // room ссылается на meetup

    alert( JSON.stringify(meetup, ['title', 'participants', 'place', 'name', 'number']) );
    /*
    {
    "title":"Conference",
    "participants":[{"name":"John"},{"name":"Alice"}],
    "place":{"number":23}
    }
    */
    // Теперь всё, кроме occupiedBy, сериализовано. Но список свойств довольно длинный.

    // К счастью, в качестве replacer мы можем использовать функцию, а не массив.

    // Функция будет вызываться для каждой пары (key, value), и она должна возвращать заменённое значение, 
    // которое будет использоваться вместо исходного. Или undefined, чтобы пропустить значение.

    // В нашем случае мы можем вернуть value «как есть» для всего, кроме occupiedBy.
    // Чтобы игнорировать occupiedBy, код ниже возвращает undefined:

    room = {
    number: 23
    };

    meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room // meetup ссылается на room
    };

    room.occupiedBy = meetup; // room ссылается на meetup

    alert( JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == 'occupiedBy') ? undefined : value;
    }));

    /* пары ключ:значение, которые приходят в replacer:
    :             [object Object]
    title:        Conference
    participants: [object Object],[object Object]
    0:            [object Object]
    name:         John
    1:            [object Object]
    name:         Alice
    place:        [object Object]
    number:       23
    occupiedBy: [object Object]
    */

}
/*---------------------------------------*/
/*          Форматирование: space        */
{

    // Ниже space = 2 указывает JavaScript отображать вложенные объекты в 
    // несколько строк с отступом в 2 пробела внутри объекта:

    let user = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
    };

    alert(JSON.stringify(user, null, 2));
    /* отступ в 2 пробела:
    {
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
    }
    */

    /* для JSON.stringify(user, null, 4) результат содержит больше отступов:
    {
        "name": "John",
        "age": 25,
        "roles": {
            "isAdmin": false,
            "isEditor": true
        }
    }
    */

    // Третьим аргументом также может быть строка. 
    // В этом случае строка будет использоваться для отступа вместо ряда пробелов.

}
/*---------------------------------------*/
/*          Пользовательский «toJSON»        */
{

    // Как и toString для преобразования строк, 
    // объект может предоставлять метод toJSON для преобразования в JSON. 
    // JSON.stringify автоматически вызывает его, если он есть.

    let room = {
    number: 23
    };

    let meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
    };

    alert( JSON.stringify(meetup) );
    /*
    {
        "title":"Conference",
        "date":"2017-01-01T00:00:00.000Z",  // (1)
        "room": {"number":23}               // (2)
    }
    */
    // Как видим, date (1) стал строкой. Это потому, 
    // что все объекты типа Date имеют встроенный метод toJSON, который возвращает такую строку.

    // Теперь давайте добавим собственную реализацию метода toJSON в наш объект room (2):

    room = {
    number: 23,
    toJSON() {
        return this.number;
    }
    };

    meetup = {
    title: "Conference",
    room
    };

    alert( JSON.stringify(room) ); // 23

    alert( JSON.stringify(meetup) );
    /*
    {
        "title":"Conference",
        "room": 23
    }
    */
    // Как видите, toJSON используется как при прямом вызове JSON.stringify(room), 
    // так и когда room вложен в другой сериализуемый объект.

}
/*---------------------------------------*/
/*          JSON.parse        */
{

    // Чтобы декодировать JSON-строку, нам нужен другой метод с именем JSON.parse.

    let value = JSON.parse(str, [reviver]);

    // str
    // JSON для преобразования в объект.
    // reviver
    // Необязательная функция, которая будет вызываться для каждой пары (ключ, значение) и 
    // может преобразовывать значение.

    // строковый массив
    let numbers = "[0, 1, 2, 3]";

    numbers = JSON.parse(numbers);

    alert( numbers[1] ); // 1
    // Или для вложенных объектов:

    let user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';

    user = JSON.parse(user);

    alert( user.friends[1] ); // 1
    // JSON может быть настолько сложным, насколько это необходимо, 
    // объекты и массивы могут включать другие объекты и массивы. 
    // Но они должны быть в том же JSON-формате.

    // Вот типичные ошибки в написанном от руки JSON (иногда приходится писать его для отладки):

    let json = `{
    name: "John",                     // Ошибка: имя свойства без кавычек
    "surname": 'Smith',               // Ошибка: одинарные кавычки в значении (должны быть двойными)
    'isAdmin': false                  // Ошибка: одинарные кавычки в ключе (должны быть двойными)
    "birthday": new Date(2000, 2, 3), // Ошибка: не допускается конструктор "new", только значения.
    "friends": [0,1,2,3]                     // Здесь всё в порядке
    }`;

}
/*---------------------------------------*/
/*          Использование reviver        */
{

    // Представьте, что мы получили объект meetup с сервера в виде строки данных.

    // Вот такой:

    // title: (meetup title), date: (meetup date)
    let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
    // …А теперь нам нужно десериализовать её, т.е. снова превратить в объект JavaScript.

    // Давайте сделаем это, вызвав JSON.parse:

    str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    let meetup = JSON.parse(str);

    alert( meetup.date.getDate() ); // Ошибка!
    // Ой, ошибка!

    // Значением meetup.date является строка, а не Date объект. 
    // Как JSON.parse мог знать, что он должен был преобразовать эту строку в Date?

    // Давайте передадим JSON.parse функцию восстановления вторым аргументом, 
    // которая возвращает все значения «как есть», но date станет Date:

    str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

    meetup = JSON.parse(str, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
    });

    alert( meetup.date.getDate() ); // 30 - теперь работает!
    // Кстати, это работает и для вложенных объектов:

    let schedule = `{
    "meetups": [
        {"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
        {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
    ]
    }`;

    schedule = JSON.parse(schedule, function(key, value) {
    if (key == 'date') return new Date(value);
    return value;
    });

    alert( schedule.meetups[1].date.getDate() ); // 18 - отлично!

}
/*---------------------------------------*/
/*          Итого        */
{

    // JSON – это формат данных, который имеет собственный независимый стандарт и 
    // библиотеки для большинства языков программирования.

    // JSON поддерживает простые объекты, массивы, строки, числа, логические значения и null.

    // JavaScript предоставляет методы JSON.stringify для сериализации в JSON и JSON.parse для чтения из JSON.

    // Оба метода поддерживают функции преобразования для интеллектуального чтения/записи.

    // Если объект имеет метод toJSON, то он вызывается через JSON.stringify.

}
/*---------------------------------------*/
/*          Задачи        */
{

    // zadacha 1

    let user = {
        name: "Василий Иванович",
        age: 35
    };

    let json = JSON.stringify(user);

    let newUser = JSON.parse(json);

    // zadacha 2 Исключить обратные ссылки

    let room = {
        number: 23
      };
      
      let meetup = {
        title: "Совещание",
        occupiedBy: [{name: "Иванов"}, {name: "Петров"}],
        place: room
      };
      
      // цикличные ссылки
      room.occupiedBy = meetup;
      meetup.self = meetup;
      
      alert( JSON.stringify(meetup, function replacer(key, value) {
        return (key != "" && value == meetap ) ? undefined : value;
      }));
      
      /* в результате должно быть:
      {
        "title":"Совещание",
        "occupiedBy":[{"name":"Иванов"},{"name":"Петров"}],
        "place":{"number":23}
      }
      */

}
/*---------------------------------------*/
/*          Итого        */
{

}
/*---------------------------------------*/