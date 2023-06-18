'use strict'
/*          Методы прототипов, объекты без свойства __proto__          */
{

    // Современные же методы это:

    // Object.create(proto, [descriptors]) – создаёт пустой объект со свойством 
    // [[Prototype]], указанным как proto, и необязательными дескрипторами 
    // свойств descriptors.
    // Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
    // Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] 
    // объекта obj как proto.

    // Эти методы нужно использовать вместо __proto__.

    let animal = {
        eats: true
    };

    // создаём новый объект с прототипом animal
    let rabbit = Object.create(animal);

    alert(rabbit.eats); // true

    alert(Object.getPrototypeOf(rabbit) === animal); // получаем прототип объекта rabbit

    Object.setPrototypeOf(rabbit, {}); // заменяем прототип объекта rabbit на {}

    // У Object.create есть необязательный второй аргумент: дескрипторы свойств. 
    // Мы можем добавить дополнительное свойство новому объекту таким образом:

    animal = {
        eats: true
    };

    rabbit = Object.create(animal, {
    jumps: {
        value: true
    }
    });

    alert(rabbit.jumps); // true

    // Мы также можем использовать Object.create для «продвинутого» клонирования 
    // объекта, более мощного, чем копирование свойств в цикле for..in:

    // клон obj c тем же прототипом (с поверхностным копированием свойств)

    let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    
    // Такой вызов создаёт точную копию объекта obj, 
    // включая все свойства: перечисляемые и неперечисляемые, 
    // геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]].

}
/*---------------------------------------*/
/*          Краткая история          */
{

    // Не меняйте [[Prototype]] существующих объектов, если важна скорость
    // Технически мы можем установить/получить [[Prototype]] в любое время. 
    // Но обычно мы устанавливаем прототип только раз во время создания объекта, 
    // а после не меняем: rabbit наследует от animal, и это не изменится.

    // И JavaScript движки хорошо оптимизированы для этого. 
    // Изменение прототипа «на лету» с помощью Object.setPrototypeOf или obj.__proto__= 
    // – очень медленная операция, которая ломает внутренние оптимизации для операций 
    // доступа к свойствам объекта. Так что лучше избегайте этого кроме тех случаев, 
    // когда вы знаете, что делаете, или же когда скорость JavaScript для вас не имеет никакого значения.

}
/*---------------------------------------*/
/*          "Простейший" объект          */
{

    // Но если мы попробуем хранить созданные пользователями ключи 
    // (например, словари с пользовательским вводом), мы можем заметить интересный сбой: 
    // все ключи работают как ожидается, за исключением "__proto__".

    // Посмотрите на пример:

    let obj = {};

    let key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    alert(obj[key]); // [object Object], не "some value"!

    // Если пользователь введёт __proto__, присвоение проигнорируется!

    // Теперь, если мы хотим использовать объект как ассоциативный массив, 
    // мы можем сделать это с помощью небольшого трюка:

    obj = Object.create(null);

    key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    alert(obj[key]); // "some value"

    // Object.create(null) создаёт пустой объект без прототипа ([[Prototype]] будет null):

    // Недостаток в том, что у таких объектов не будет встроенных методов объекта, 
    // таких как toString:

    obj = Object.create(null);

    alert(obj); // Ошибка (no toString)

    // Обратите внимание, что большая часть методов, связанных с объектами, 
    // имеют вид Object.something(...). К примеру, Object.keys(obj). 
    // Подобные методы не находятся в прототипе, 
    // так что они продолжат работать для таких объектов:

    let chineseDictionary = Object.create(null);
    chineseDictionary.hello = "你好";
    chineseDictionary.bye = "再见";

    alert(Object.keys(chineseDictionary)); // hello,bye

}
/*---------------------------------------*/
/*          итого          */
{

    // Современные способы установки и прямого доступа к прототипу это:

    // Object.create(proto[, descriptors]) – создаёт пустой объект со свойством [[Prototype]], 
    // указанным как proto (может быть null), и необязательными дескрипторами свойств.
    // Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта 
    // obj (то же самое, что и геттер __proto__).
    // Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] 
    // объекта obj как proto (то же самое, что и сеттер __proto__).
    // Встроенный геттер/сеттер __proto__ не безопасен, если мы хотим использовать 
    // созданные пользователями ключи в объекте. Как минимум потому, 
    // что пользователь может ввести "__proto__" как ключ, 
    // от чего может возникнуть ошибка. Если повезёт – последствия будут лёгкими, 
    // но, вообще говоря, они непредсказуемы.

    // Так что мы можем использовать либо Object.create(null) для создания «простейшего» объекта, 
    // либо использовать коллекцию Map.

    // Кроме этого, Object.create даёт нам лёгкий способ создать поверхностную копию 
    // объекта со всеми дескрипторами:

    // let clone = Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
    // Мы также ясно увидели, что __proto__ – это геттер/сеттер для свойства [[Prototype]], 
    // и находится он в Object.prototype, как и другие методы.

    // Мы можем создавать объекты без прототипов с помощью Object.create(null). 
    // Такие объекты можно использовать как «чистые словари», у них нет проблем с 
    // использованием строки "__proto__" в качестве ключа.

    // Ещё методы:

    // Object.keys(obj) / Object.values(obj) / Object.entries(obj) – 
    // возвращают массив всех перечисляемых собственных строковых ключей/значений/пар ключ-значение.
    // Object.getOwnPropertySymbols(obj) – возвращает массив всех собственных символьных ключей.
    // Object.getOwnPropertyNames(obj) – возвращает массив всех собственных строковых ключей.
    // Reflect.ownKeys(obj) – возвращает массив всех собственных ключей.
    // obj.hasOwnProperty(key): возвращает true, если у obj есть собственное 
    // (не унаследованное) свойство с именем key.
    // Все методы, которые возвращают свойства объектов (такие как Object.keys и другие), 
    // возвращают «собственные» свойства. Если мы хотим получить и унаследованные, 
    // можно воспользоваться циклом for..in.

}
/*---------------------------------------*/
/*          Задачи          */
{

    // Добавьте toString в словарь
    
    let dictionary = Object.create(null);

    dictionary.toString = function(){
        let arrKey = Object.getOwnPropertySymbols(this);
        let str = "";
        for(let key in dictionary) {
            str += key + ",";
        }
        return str
    }

    Object.defineProperty(dictionary, "toString", {
        enumerable: false
    });

    // добавляем немного данных
    dictionary.apple = "Apple";
    dictionary.__proto__ = "test"; // здесь __proto__ -- это обычный ключ

    // только apple и __proto__ выведены в цикле
    for(let key in dictionary) {
    alert(key); // "apple", затем "__proto__"
    }

    // ваш метод toString в действии
    alert(dictionary); // "apple,__proto__"

    {
        // Чтобы сделать toString неперечисляемым, давайте определим его, 
        // используя дескриптор свойства. Синтаксис Object.create 
        // позволяет нам добавить в объект дескрипторы свойств как второй аргумент.

        let dictionary = Object.create(null, {
        toString: { // определяем свойство toString
            value() { // значение -- это функция
            return Object.keys(this).join();
            }
        }
        });

        dictionary.apple = "Apple";
        dictionary.__proto__ = "test";

        // apple и __proto__ выведены в цикле
        for(let key in dictionary) {
        alert(key); // "apple", затем "__proto__"
        }

        // список свойств, разделённых запятой, выведен с помощью toString
        alert(dictionary); // "apple,__proto__"
    }

    // Разница между вызовами

    // В первом вызове this == rabbit, во всех остальных this равен Rabbit.prototype, 
    // так как это объект перед точкой.

    // Так что только первый вызов выведет Rabbit, а остальные – undefined:

    function Rabbit(name) {
    this.name = name;
    }
    Rabbit.prototype.sayHi = function() {
    alert( this.name );
    }

    let rabbit = new Rabbit("Rabbit");

    rabbit.sayHi();                        // Rabbit
    Rabbit.prototype.sayHi();              // undefined
    Object.getPrototypeOf(rabbit).sayHi(); // undefined
    rabbit.__proto__.sayHi();              // undefined

}
/*---------------------------------------*/
/*          итого          */
{

}
/*---------------------------------------*/