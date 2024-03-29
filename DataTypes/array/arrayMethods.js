"use strict"
/*          Добавление/удаление элементов        */
{
    // arr.push(...items) – добавляет элементы в конец,
    // arr.pop() – извлекает элемент из конца,
    // arr.shift() – извлекает элемент из начала,
    // arr.unshift(...items) – добавляет элементы в начало.

    // splice

    // Метод arr.splice(str) – это универсальный «швейцарский нож» для работы с массивами. 
    // Умеет всё: добавлять, удалять и заменять элементы.

    // arr.splice(start[, deleteCount, elem1, ..., elemN])

    let arr = ["Я", "изучаю", "JavaScript"];

    arr.splice(1, 1); // начиная с индекса 1, удалить 1 элемент

    alert( arr ); // осталось ["Я", "JavaScript"]

    // В следующем примере мы удалим 3 элемента и заменим их двумя другими.

    arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];

    // удалить 3 первых элемента и заменить их другими
    arr.splice(0, 3, "Давай", "танцевать");

    alert( arr ) // теперь ["Давай", "танцевать", "прямо", "сейчас"]

    // Здесь видно, что splice возвращает массив из удалённых элементов:

    arr = ["Я", "изучаю", "JavaScript", "прямо", "сейчас"];

    // удалить 2 первых элемента
    let removed = arr.splice(0, 2);

    alert( removed ); // "Я", "изучаю" <-- массив из удалённых элементов

    // Метод splice также может вставлять элементы без удаления, 
    // для этого достаточно установить deleteCount в 0:

    arr = ["Я", "изучаю", "JavaScript"];

    // с индекса 2
    // удалить 0 элементов
    // вставить "сложный", "язык"
    arr.splice(2, 0, "сложный", "язык");

    alert( arr ); // "Я", "изучаю", "сложный", "язык", "JavaScript"

    // Отрицательные индексы разрешены
    // В этом и в других методах массива допускается использование отрицательных индексов.
    // Они определяют позицию с конца массива, как тут:

    arr = [1, 2, 5];

    // начиная с индекса -1 (перед последним элементом)
    // удалить 0 элементов,
    // затем вставить числа 3 и 4
    arr.splice(-1, 0, 3, 4);

    alert( arr ); // 1,2,3,4,5

    // slice

    arr.slice([start], [end])

    // Это похоже на строковый метод str.slice, но вместо подстрок возвращает подмассивы.

    arr = ["t", "e", "s", "t"];

    alert( arr.slice(1, 3) ); // e,s (копирует с 1 до 3)

    alert( arr.slice(-2) ); // s,t (копирует с -2 до конца)

    // concat

    // Метод arr.concat создаёт новый массив, в который копирует данные 
    // из других массивов и дополнительные значения.

    // Синтаксис:

    arr.concat(arg1, arg2)

    arr = [1, 2];

    // создать массив из: arr и [3,4]
    alert( arr.concat([3, 4]) ); // 1,2,3,4

    // создать массив из: arr и [3,4] и [5,6]
    alert( arr.concat([3, 4], [5, 6]) ); // 1,2,3,4,5,6

    // создать массив из: arr и [3,4], потом добавить значения 5 и 6
    alert( arr.concat([3, 4], 5, 6) ); // 1,2,3,4,5,6

    // Обычно он копирует только элементы из массивов. Другие объекты, 
    // даже если они выглядят как массивы, добавляются как есть:

    arr = [1, 2];

    let arrayLike = {
        0: "что-то",
        length: 1
    };

    alert( arr.concat(arrayLike) ); // 1,2,[object Object]

    // …Но если массивоподобный объект имеет специальное свойство Symbol.isConcatSpreadable, 
    // то он обрабатывается как массив, с помощью concat: вместо него добавляются его элементы:

    arr = [1, 2];

    arrayLike = {
        0: "что-то",
        1: "ещё",
        [Symbol.isConcatSpreadable]: true,
        length: 2
    };

    alert( arr.concat(arrayLike) ); // 1,2,что-то,ещё
    
}
/*---------------------------------------*/
/*          Перебор: forEach        */
{

    // Метод arr.forEach позволяет запускать функцию для каждого элемента массива.

    // Синтаксис:

    arr.forEach(function(item, index, array) {
    // ... делать что-то с item
    });

    // Например, этот код выведет на экран каждый элемент массива:

    // Вызов alert для каждого элемента
    ["Бильбо", "Гэндальф", "Назгул"].forEach(alert);

    // А этот вдобавок расскажет и о позиции элемента в целевом массиве:

    ["Бильбо", "Гэндальф", "Назгул"].forEach((item, index, array) => {
        alert(`У ${item} индекс ${index} в ${array}`);
    });
        
}
/*---------------------------------------*/
/*          Поиск в массиве        */
{

    // indexOf/lastIndexOf и includes

    // У методов arr.indexOf и arr.includes одинаковый синтаксис и они делают по сути то же самое, 
    // что и их строковые аналоги, но работают с элементами вместо символов:

    // arr.indexOf(item, from) ищет item начиная с индекса from и возвращает номер индекса, 
    // на котором был найден искомый элемент, в противном случае -1.
    // arr.includes(item, from) ищет item начиная с индекса from и возвращает true, если поиск успешен.

    let arr = [1, 0, false];

    alert( arr.indexOf(0) ); // 1
    alert( arr.indexOf(false) ); // 2
    alert( arr.indexOf(null) ); // -1

    alert( arr.includes(1) ); // true

    // Пожалуйста, обратите внимание, что методы используют строгое сравнение ===. 
    // Таким образом, если мы ищем false, он находит именно false, а не ноль.

    // Метод arr.lastIndexOf похож на indexOf, но ищет справа налево.

    let fruits = ['Яблоко', 'Апельсин', 'Яблоко']

    alert( fruits.indexOf('Яблоко') ); // 0 (первый 'Яблоко')
    alert( fruits.lastIndexOf('Яблоко') ); // 2 (последний 'Яблоко')

    // Незначительная, но заслуживающая внимания особенность includes – 
    // он правильно обрабатывает NaN, в отличие от indexOf:

    arr = [NaN];
    alert( arr.indexOf(NaN) ); // -1 (неверно, должен быть 0)
    alert( arr.includes(NaN) );// true (верно)

    // find и findIndex/findLastIndex

    let result = arr.find(function(item, index, array) {
        // если true - возвращается текущий элемент и перебор прерывается
        // если все итерации оказались ложными, возвращается undefined
    });

    // Функция вызывается по очереди для каждого элемента массива:

    // item – очередной элемент.
    // index – его индекс.
    // array – сам массив.

    let users = [
        {id: 1, name: "Вася"},
        {id: 2, name: "Петя"},
        {id: 3, name: "Маша"}
      ];
      
    let user = users.find(item => item.id == 1);
    
    alert(user.name); // Вася

    // Метод arr.findLastIndex похож на findIndex, но ищет справа налево, наподобие lastIndexOf.
    
    users = [
        {id: 1, name: "Вася"},
        {id: 2, name: "Петя"},
        {id: 3, name: "Маша"},
        {id: 4, name: "Вася"}
      ];
      
    // Найти индекс первого Васи
    alert(users.findIndex(user => user.name == 'Вася')); // 0
    
    // Найти индекс последнего Васи
    alert(users.findLastIndex(user => user.name == 'Вася')); // 3

    // filter

    // Метод find ищет один (первый) элемент, который заставит функцию вернуть true
    // Если найденных элементов может быть много, можно использовать arr.filter(fn).

    let results = arr.filter(function(item, index, array) {
        // если `true` -- элемент добавляется к results и перебор продолжается
        // возвращается пустой массив в случае, если ничего не найдено
    });

    users = [
        {id: 1, name: "Вася"},
        {id: 2, name: "Петя"},
        {id: 3, name: "Маша"}
      ];
      
    // возвращает массив, состоящий из двух первых пользователей
    let someUsers = users.filter(item => item.id < 3);
    
    alert(someUsers.length); // 2
    
}
/*---------------------------------------*/
/*          Преобразование массива        */
{

    // map

    // Он вызывает функцию для каждого элемента массива и возвращает массив результатов выполнения этой функции.

    // Синтаксис:

    let result = arr.map(function(item, index, array) {
    // возвращается новое значение вместо элемента
    });

    // Например, здесь мы преобразуем каждый элемент в его длину:

    let lengths = ["Бильбо", "Гэндальф", "Назгул"].map(item => item.length);
    alert(lengths); // 6,8,6

    // sort(fn)
    // Вызов arr.sort() сортирует массив на месте, меняя в нём порядок элементов.

    let arr = [ 1, 2, 15 ];

    // метод сортирует содержимое arr
    arr.sort();

    alert( arr );  // 1, 15, 2

    // Буквально, элементы преобразуются в строки при сравнении. 
    // Для строк применяется лексикографический порядок, и действительно выходит, что "2" > "15".

    function compare(a, b) {
        if (a > b) return 1; // если первое значение больше второго
        if (a == b) return 0; // если равны
        if (a < b) return -1; // если первое значение меньше второго
    }

    // Например, для сортировки чисел:

    function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a == b) return 0;
    if (a < b) return -1;
    }

    arr = [ 1, 2, 15 ];

    arr.sort(compareNumeric);

    alert(arr);  // 1, 2, 15

    // Кстати, если мы когда-нибудь захотим узнать, какие элементы сравниваются – 
    // ничто не мешает нам вывести их на экран:

    [1, -2, 15, 2, 0, 8].sort(function(a, b) {
        alert( a + " <> " + b );
        return a - b;
    });

    // Функция сравнения может вернуть любое число
    // На самом деле от функции сравнения требуется любое положительное число, 
    // чтобы сказать «больше», и отрицательное число, чтобы сказать «меньше».

    // Это позволяет писать более короткие функции:

    arr = [ 1, 2, 15 ];

    arr.sort(function(a, b) { return b - a; });

    alert(arr);  // 15, 2, 1

    // Лучше использовать стрелочные функции

    arr.sort( (a, b) => a - b );

    // Используйте localeCompare для строк
    // Помните алгоритм сравнения строк? По умолчанию, он сравнивает буквы по их кодам.

    // Для многих алфавитов лучше использовать метод str.localeCompare, 
    // для правильной сортировки букв, таких как Ö.

    // Например, отсортируем несколько стран на немецком языке:

    let countries = ['Österreich', 'Andorra', 'Vietnam'];

    alert( countries.sort( (a, b) => a > b ? 1 : -1) ); // Andorra, Vietnam, Österreich (неправильно)

    alert( countries.sort( (a, b) => a.localeCompare(b) ) ); // Andorra,Österreich,Vietnam (правильно!)

    // Метод arr.reverse меняет порядок элементов в arr на обратный.
    
    arr = [1, 2, 3, 4, 5];
    arr.reverse();

    alert( arr ); // 5,4,3,2,1

    // split и join

    // Ситуация из реальной жизни. Мы пишем приложение для обмена сообщениями, 
    // и посетитель вводит имена тех, кому его отправить, через запятую: Вася, Петя, Маша. 
    // Но нам-то гораздо удобнее работать с массивом имён, чем с одной строкой. Как его получить?

    // Метод str.split(delim) именно это и делает. Он разбивает строку на массив по заданному разделителю delim.

    // В примере ниже таким разделителем является строка из запятой и пробела.

    let names = 'Вася, Петя, Маша';

    arr = names.split(', ');

    for (let name of arr) {
        alert( `Сообщение получат: ${name}.` ); // Сообщение получат: Вася (и другие имена)
    }

    arr = 'Вася, Петя, Маша, Саша'.split(', ', 2);

    alert(arr); // Вася, Петя

    // Разбивка по буквам
    // Вызов split(s) с пустым аргументом s разбил бы строку на массив букв:

    let str = "тест";

    alert( str.split('') ); // т,е,с,т

    // Вызов arr.join(glue) делает в точности противоположное split. 
    // Он создаёт строку из элементов arr, вставляя glue между ними.

    arr = ['Вася', 'Петя', 'Маша'];

    str = arr.join(';'); // объединить массив в строку через ;

    alert( str ); // Вася;Петя;Маша

    // reduce/reduceRight

    // Методы arr.reduce и arr.reduceRight похожи на методы выше, но они немного сложнее. 
    // Они используются для вычисления единого значения на основе всего массива.

    // Синтаксис:

    let value = arr.reduce(function(accumulator, item, index, array) {
    // ...
    }, [initial]);

    // Тут мы получим сумму всех элементов массива одной строкой:

    arr = [1, 2, 3, 4, 5];

    result = arr.reduce((sum, current) => sum + current, 0);

    alert(result); // 15

    // Мы также можем опустить начальное значение:

    arr = [1, 2, 3, 4, 5];

    // убрано начальное значение (нет 0 в конце)
    result = arr.reduce((sum, current) => sum + current);

    alert( result ); // 15

    // Результат – точно такой же! Это потому, что при отсутствии initial в 
    // качестве первого значения берётся первый элемент массива, а перебор стартует со второго.

    // Таблица вычислений будет такая же за вычетом первой строки.

    // Но такое использование требует крайней осторожности. 
    // Если массив пуст, то вызов reduce без начального значения выдаст ошибку.

    arr = [];

    // Error: Reduce of empty array with no initial value
    // если бы существовало начальное значение, reduce вернул бы его для пустого массива.
    arr.reduce((sum, current) => sum + current);

    // Поэтому рекомендуется всегда указывать начальное значение.

    // Метод arr.reduceRight работает аналогично, но проходит по массиву справа налево.
    
}
/*---------------------------------------*/
/*          Array.isArray        */
{

    // Массивы не образуют отдельный тип языка. Они основаны на объектах.

    // Поэтому typeof не может отличить простой объект от массива:

    alert(typeof {}); // object
    alert(typeof []); // тоже object

    // …Но массивы используются настолько часто, что для этого придумали 
    // специальный метод: Array.isArray(value). Он возвращает true, если value массив, и false, если нет.

    alert(Array.isArray({})); // false

    alert(Array.isArray([])); // true
    
}
/*---------------------------------------*/
/*          Большинство методов поддерживают «thisArg»        */
{

    // Вот полный синтаксис этих методов:

    arr.find(func, thisArg);
    arr.filter(func, thisArg);
    arr.map(func, thisArg);
    // ...
    // thisArg -- необязательный последний аргумент

    // Значение параметра thisArg становится this для func.
    // Например, тут мы используем метод объекта army как фильтр, и thisArg передаёт ему контекст:

    let army = {
        minAge: 18,
        maxAge: 27,
        canJoin(user) {
            return user.age >= this.minAge && user.age < this.maxAge;
        }
    };

    let users = [
        {age: 16},
        {age: 20},
        {age: 23},
        {age: 30}
    ];

    // найти пользователей, для которых army.canJoin возвращает true
    let soldiers = users.filter(army.canJoin, army);

    alert(soldiers.length); // 2
    alert(soldiers[0].age); // 20
    alert(soldiers[1].age); // 23

    // Если бы мы в примере выше использовали просто users.filter(army.canJoin), 
    // то вызов army.canJoin был бы в режиме отдельной функции, с this=undefined. 
    // Это тут же привело бы к ошибке.

    // Вызов users.filter(army.canJoin, army) можно заменить на 
    // users.filter(user => army.canJoin(user)), 
    // который делает то же самое. Последняя запись используется даже чаще, 
    // так как функция-стрелка более наглядна.
    
}
/*---------------------------------------*/
/*          Итого        */
{

    // Шпаргалка по методам массива:

    // Для добавления/удаления элементов:

    // push (...items) – добавляет элементы в конец,

    // pop() – извлекает элемент с конца,

    // shift() – извлекает элемент с начала,

    // unshift(...items) – добавляет элементы в начало.

    // splice(pos, deleteCount, ...items) – начиная с индекса pos удаляет deleteCount 
    // элементов и вставляет items.

    // slice(start, end) – создаёт новый массив, копируя в него элементы с 
    // индекса start до end (не включая end).

    // concat(...items) – возвращает новый массив: копирует все члены текущего массива и 
    // добавляет к нему items. Если какой-то из items является массивом, тогда берутся его элементы.
    
    // Для поиска среди элементов:
    // indexOf/lastIndexOf(item, pos) – ищет item, начиная с позиции pos, и возвращает его индекс или -1, 
    // если ничего не найдено.

    // includes(value) – возвращает true, если в массиве имеется элемент value, в противном случае false.

    // find/filter(func) – фильтрует элементы через функцию и отдаёт первое/все значения, 
    // при прохождении которых через функцию возвращается true.

    // findIndex похож на find, но возвращает индекс вместо значения.

    // Для перебора элементов:
    // forEach(func) – вызывает func для каждого элемента. Ничего не возвращает.
    
    // Для преобразования массива:
    // map(func) – создаёт новый массив из результатов вызова func для каждого элемента.

    // sort(func) – сортирует массив «на месте», а потом возвращает его.

    // reverse() – «на месте» меняет порядок следования элементов на противоположный и 
    // возвращает изменённый массив.

    // split/join – преобразует строку в массив и обратно.

    // reduce/reduceRight(func, initial) – вычисляет одно значение на основе всего массива, 
    // вызывая func для каждого элемента и передавая промежуточный результат между вызовами.

    // Дополнительно:

    // Array.isArray(arr) проверяет, является ли arr массивом.

    // Пожалуйста, обратите внимание, что методы sort, reverse и splice изменяют исходный массив.

    // Эти методы – самые используемые, их достаточно в 99% случаев. Но существуют и другие:

    // arr.some(fn)/arr.every(fn) проверяет массив.

    // Функция fn вызывается для каждого элемента массива аналогично map. Если какие-либо/все результаты вызовов являются true, то метод возвращает true, иначе false.

    // Эти методы ведут себя примерно так же, как операторы || и &&: если fn возвращает истинное значение, arr.some() немедленно возвращает true и останавливает перебор остальных элементов; если fn возвращает ложное значение, arr.every() немедленно возвращает false и также прекращает перебор остальных элементов.

    // Мы можем использовать every для сравнения массивов:

    // function arraysEqual(arr1, arr2) {
    // return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
    // }

    // alert( arraysEqual([1, 2], [1, 2])); // true
    // arr.fill(value, start, end) – заполняет массив повторяющимися value, начиная с индекса start до end.

    // arr.copyWithin(target, start, end) – копирует свои элементы, начиная с позиции start и заканчивая end, в себя, на позицию target (перезаписывая существующие).

    // arr.flat(depth)/arr.flatMap(fn) создаёт новый плоский массив из многомерного массива.
    
}
/*---------------------------------------*/
/*          Итого        */
{

    // zadacha 1
    function camelize(str) {
        return str
          .split('-') // разбивает 'my-long-word' на массив ['my', 'long', 'word']
          .map(
            // Переводит в верхний регистр первые буквы всех элементом массива за исключением первого
            // превращает ['my', 'long', 'word'] в ['my', 'Long', 'Word']
            (word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1)
          )
          .join(''); // соединяет ['my', 'Long', 'Word'] в 'myLongWord'
      }
    
    camelize("background-color") == 'backgroundColor';
    camelize("list-style-image") == 'listStyleImage';
    camelize("-webkit-transition") == 'WebkitTransition';

    //zadacha 2

    function filterRange(arr, a, b){
        return arr.filter((value) => (a <= value && value <= b))
    }

    let arr = [5, 3, 8, 1];

    let filtered = filterRange(arr, 1, 4);

    alert( filtered ); // 3,1 (совпадающие значения)

    alert( arr ); // 5,3,8,1 (без изменений)

    //zadacha 3

    function filterRangeInPlace(arr, a, b) {

        for (let i = 0; i < arr.length; i++) {
          let val = arr[i];
      
          // удалить, если за пределами интервала
          if (val < a || val > b) {
            arr.splice(i, 1);
            i--;
          }
        }
      
      }
      
      arr = [5, 3, 8, 1];
      

    filterRangeInPlace(arr, 1, 4); // удалены числа вне диапазона 1..4

    alert( arr ); // [3, 1]

    // zadacha 4

    arr = [5, 2, 1, -10, 8];

    arr.sort((a, b) => b - a);

    alert( arr );

    // zadacha 5

    function copySorted(arr){
        return arr.splice().sort();
    }

    arr = ["HTML", "JavaScript", "CSS"];

    let sorted = copySorted(arr);
    
    alert( sorted ); // CSS, HTML, JavaScript
    alert( arr ); // HTML, JavaScript, CSS (без изменений)

    // zadacha 6

    function Calculator(){
        this.methods = {
            '-': (a, b) => a - b,
            '+': (a, b) => a + b,
        };

        this.calculate = (str) => {
            let split = str.split(' ');
            a = +split[0];
            b = +split[2];
            op = split[1];

            if (!this.methods[op] || isNaN(a) || isNaN(b)) {
                return NaN;
            }

            return this.methods[op](a, b);
        };

        this.addMethod = (name, func) => {
            this.methods[name] = func;
        }
    }

    let powerCalc = new Calculator;
    powerCalc.addMethod("*", (a, b) => a * b);
    powerCalc.addMethod("/", (a, b) => a / b);
    powerCalc.addMethod("**", (a, b) => a ** b);

    let result = powerCalc.calculate("2 ** 3");
    alert( result ); // 8

    // zadacha 7

    let vasya = { name: "Вася", age: 25 };
    let petya = { name: "Петя", age: 30 };
    let masha = { name: "Маша", age: 28 };

    let users = [ vasya, petya, masha ];

    let names = users.map(item => item.name);

    alert( names ); // Вася, Петя, Маша

    // zadacha 8
    {

        let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
        let petya = { name: "Петя", surname: "Иванов", id: 2 };
        let masha = { name: "Маша", surname: "Петрова", id: 3 };

        let users = [ vasya, petya, masha ];

        let usersMapped = users.map((item) => ({
            fullName: `${item.name} ${item.surname}`, 
            id: item.id,
        }));

        /*
        usersMapped = [
        { fullName: "Вася Пупкин", id: 1 },
        { fullName: "Петя Иванов", id: 2 },
        { fullName: "Маша Петрова", id: 3 }
        ]
        */

        alert( usersMapped[0].id ) // 1
        alert( usersMapped[0].fullName ) // Вася Пупкин        
    }

    // zadacha 9

    {
        function sortByAge(arr){
            arr.sort((a, b) => a.age - b.age)
        }
        
        let vasya = { name: "Вася", age: 25 };
        let petya = { name: "Петя", age: 30 };
        let masha = { name: "Маша", age: 28 };

        let arr = [ vasya, petya, masha ];

        sortByAge(arr);

        // теперь: [vasya, masha, petya]
        alert(arr[0].name); // Вася
        alert(arr[1].name); // Маша
        alert(arr[2].name); // Петя
    }

    // zadacha 10

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      
      // подсчёт вероятности для всех возможных вариантов
      let count = {
        '123': 0,
        '132': 0,
        '213': 0,
        '231': 0,
        '321': 0,
        '312': 0
      };
      
      for (let i = 0; i < 1000000; i++) {
        let array = [1, 2, 3];
        shuffle(array);
        count[array.join('')]++;
      }
      
      // показать количество всех возможных вариантов
      for (let key in count) {
        alert(`${key}: ${count[key]}`);
      }

    // zadacha 11

    {
        function getAverageAge(arr){
            return arr.reduce((sum, current) => sum + current.age, 0) / users.length;
        }

        let vasya = { name: "Вася", age: 25 };
        let petya = { name: "Петя", age: 30 };
        let masha = { name: "Маша", age: 29 };

        let arr = [ vasya, petya, masha ];

        alert( getAverageAge(arr) ); // (25 + 30 + 29) / 3 = 28
    }

    // zadacha 12

    {
        function unique(arr) {
            let newArr = [];            
            for(let str of arr){
                if(!newArr.includes(str)){
                    newArr.push(str);
                }
            }
            return newArr;
        }
          
          let strings = ["кришна", "кришна", "харе", "харе",
            "харе", "харе", "кришна", "кришна", ":-O"
          ];
          
          alert( unique(strings) ); // кришна, харе, :-O
    }

    // zadacha 13

    {
        function groupById(users){
            return users.reduce((obj, value) => {
                obj[value.id] = value;
                return obj;
            }, {});
        }

        let users = [
            {id: 'john', name: "John Smith", age: 20},
            {id: 'ann', name: "Ann Smith", age: 24},
            {id: 'pete', name: "Pete Peterson", age: 31},
          ];
          
          let usersById = groupById(users);
          
          /*
          // после вызова у нас должно получиться:
          
          usersById = {
            john: {id: 'john', name: "John Smith", age: 20},
            ann: {id: 'ann', name: "Ann Smith", age: 24},
            pete: {id: 'pete', name: "Pete Peterson", age: 31},
          }
          */
    }
        
}
/*---------------------------------------*/

