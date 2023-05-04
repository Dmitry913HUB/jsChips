"use strict"
/*          Деструктуризация массива        */
{

    // Вот пример деструктуризации массива на переменные:

    // у нас есть массив с именем и фамилией
    let arr = ["Ilya", "Kantor"];

    // деструктурирующее присваивание
    // записывает firstName = arr[0]
    // и surname = arr[1]
    let [firstName, surname] = arr;

    alert(firstName); // Ilya
    alert(surname);  // Kantor
    // Теперь мы можем использовать переменные вместо элементов массива.

    // Отлично смотрится в сочетании со split или другими методами, возвращающими массив:

    [firstName, surname] = "Ilya Kantor".split(' ');
    alert(firstName); // Ilya
    alert(surname);  // Kantor

    let [a, b, c] = "abc";
    let [one, two, three] = new Set([1, 2, 3]);

    let user = {};
    [user.name, user.surname] = "Ilya Kantor".split(' ');

    alert(user.name); // Ilya
    alert(user.surname); // Kantor

    // Мы можем использовать его с деструктуризацией для цикличного перебора ключей и значений объекта:

    user = {
    name: "John",
    age: 30
    };

    // цикл по ключам и значениям
    for (let [key, value] of Object.entries(user)) {
    alert(`${key}:${value}`); // name:John, затем age:30
    }
    // …то же самое для map:

    user = new Map();
    user.set("name", "John");
    user.set("age", "30");

    // Map перебирает как пары [ключ, значение], что очень удобно для деструктурирования
    for (let [key, value] of user) {
    alert(`${key}:${value}`); // name:John, затем age:30
    }

    // Трюк обмена переменных

    let guest = "Jane";
    let admin = "Pete";

    // Давайте поменяем местами значения: сделаем guest = "Pete", а admin = "Jane"
    [guest, admin] = [admin, guest];

    alert(`${guest} ${admin}`); // Pete Jane (успешно заменено!)

    // «остаточные параметры» – троеточие ("..."):

    let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

    // rest это массив элементов, начиная с 3-го
    alert(rest[0]); // Consul
    alert(rest[1]); // of the Roman Republic
    alert(rest.length); // 2

    // Значения по умолчанию

    [firstName, surname] = [];

    alert(firstName); // undefined
    alert(surname); // undefined
    // Если мы хотим, чтобы значение «по умолчанию» заменило отсутствующее, мы можем указать его с помощью =:

    // значения по умолчанию
    let [name = "Guest", surrname = "Anonymous"] = ["Julius"];

    alert(name);    // Julius (из массива)
    alert(surrname); // Anonymous (значение по умолчанию)

    // Например, здесь мы используем функцию prompt для указания двух значений по умолчанию.

    // prompt запустится только для surname
    [name = prompt('name?'), surname = prompt('surname?')] = ["Julius"];

    alert(name);    // Julius (из массива)
    alert(surname); // результат prompt

}
/*---------------------------------------*/
/*          Деструктуризация объекта        */
{

    // Деструктурирующее присваивание также работает с объектами.

    // Синтаксис:

    // let {var1, var2} = {var1:…, var2:…}

    // У нас есть существующий объект с правой стороны, 
    // который мы хотим разделить на переменные. 
    // Левая сторона содержит «шаблон» для соответствующих свойств. 
    // В простом случае это список названий переменных в {...}.

    let options = {
    title: "Menu",
    width: 100,
    height: 200
    };

    let {title, width, height} = options;

    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200

    // Свойства options.title, options.width и options.height присваиваются соответствующим переменным.

    // Порядок не имеет значения. Вот так – тоже работает:

    // изменён порядок в let {...}
    ({height, width, title} = { title: "Menu", height: 200, width: 100 })

    // Шаблон с левой стороны может быть более сложным и определять соответствие между свойствами и переменными.

    // Если мы хотим присвоить свойство объекта переменной с другим названием, 
    // например, свойство options.width присвоить переменной w, то мы можем использовать двоеточие:

    options = {
    title: "Menu",

    width: 100,
    height: 200
    };

    // { sourceProperty: targetVariable }
    {let {width: w, height: h, title} = options;}

    // width -> w
    // height -> h
    // title -> title

    alert(title);  // Menu
    alert(w);      // 100
    alert(h);      // 200

    // Двоеточие показывает «что : куда идёт». В примере выше свойство width сохраняется в переменную w, 
    // свойство height сохраняется в h, а title присваивается одноимённой переменной.

    // Для потенциально отсутствующих свойств мы можем установить значения по умолчанию, 
    // используя "=", как здесь:

    options = {
    title: "Menu"
    };

    ({width = 100, height = 200, title} = options);

    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200

    // Как и в случае с массивами, значениями по умолчанию могут быть любые выражения или даже функции. 
    // Они выполнятся, если значения отсутствуют.

    // В коде ниже prompt запросит width, но не title:

    options = {
    title: "Menu"
    };

    ({width = prompt("width?"), title = prompt("title?")} = options);

    alert(title);  // Menu
    alert(width);  // (результат prompt)
    // Мы также можем совмещать : и =:

    options = {
    title: "Menu"
    };

    ({width: w = 100, height: h = 200, title} = options);

    alert(title);  // Menu
    alert(w);      // 100
    alert(h);      // 200
    // Если у нас есть большой объект с множеством свойств, можно взять только то, что нужно:

    options = {
    title: "Menu",
    width: 100,
    height: 200
    };

    // взять только title, игнорировать остальное
    ({ title } = options);

    alert(title); // Menu

    // Остаток объекта «…»

    // Что если в объекте больше свойств, чем у нас переменных? Можем ли мы взять необходимые нам, 
    // а остальные присвоить куда-нибудь?

    // Можно использовать троеточие, как и для массивов. В некоторых старых браузерах (IE) 
    // это не поддерживается, используйте Babel для полифила.

    // Выглядит так:

    options = {
    title: "Menu",
    height: 200,
    width: 100
    };

    // title = свойство с именем title
    // rest = объект с остальными свойствами
    ({title, ...rest} = options);

    // сейчас title="Menu", rest={height: 200, width: 100}
    alert(rest.height);  // 200
    alert(rest.width);   // 100
    // Обратите внимание на let
    // В примерах выше переменные были объявлены в присваивании: let {…} = {…}. Конечно, мы могли бы использовать существующие переменные и не указывать let, но тут есть подвох.

    // Вот так не будет работать:

    // let title, width, height;

    // ошибка будет в этой строке
    ({title, width, height} = {title: "Menu", width: 200, height: 100});

    // Проблема в том, что JavaScript обрабатывает {...} в основном потоке кода 
    // (не внутри другого выражения) как блок кода. Такие блоки кода могут быть 
    // использованы для группировки операторов, например:

    {
    // блок кода
    let message = "Hello";
    // ...
    alert( message );
    }
    // Так что здесь JavaScript считает, что видит блок кода, отсюда и ошибка. 
    // На самом-то деле у нас деструктуризация.

    // Чтобы показать JavaScript, что это не блок кода, мы можем заключить выражение в скобки (...):

    // let title, width, height;

    // сейчас всё работает
    ({title, width, height} = {title: "Menu", width: 200, height: 100});

    alert( title ); // Menu

}
/*---------------------------------------*/
/*          Вложенная деструктуризация        */
{

    // В приведённом ниже коде options хранит другой объект в свойстве size и массив в свойстве items. 
    // Шаблон в левой части присваивания имеет такую же структуру, чтобы извлечь данные из них:

    let options = {
    size: {
        width: 100,
        height: 200
    },
    items: ["Cake", "Donut"],
    extra: true
    };

    // деструктуризация разбита на несколько строк для ясности
    let {
    size: { // положим size сюда
        width,
        height
    },
    items: [item1, item2], // добавим элементы к items
    title = "Menu" // отсутствует в объекте (используется значение по умолчанию)
    } = options;

    alert(title);  // Menu
    alert(width);  // 100
    alert(height); // 200
    alert(item1);  // Cake
    alert(item2);  // Donut

}
/*---------------------------------------*/
/*          Умные параметры функций        */
{

    // мы передаём объект в функцию
    let options = {
    title: "My menu",
    items: ["Item1", "Item2"]
    };

    // ...и она немедленно извлекает свойства в переменные
    function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items – взято из options,
    // width, height – используются значения по умолчанию
    alert( `${title} ${width} ${height}` ); // My Menu 200 100
    alert( items ); // Item1, Item2
    }

    showMenu(options);

    // Мы также можем использовать более сложное деструктурирование с вложенными объектами и двоеточием:

    options = {
    title: "My menu",
    items: ["Item1", "Item2"]
    };

    function showMenu({
    title = "Untitled",
    width: w = 100,  // width присваиваем в w
    height: h = 200, // height присваиваем в h
    items: [item1, item2] // первый элемент items присваивается в item1, второй в item2
    }) {
    alert( `${title} ${w} ${h}` ); // My Menu 100 200
    alert( item1 ); // Item1
    alert( item2 ); // Item2
    }

    showMenu(options);

    // Пожалуйста, обратите внимание, что такое деструктурирование подразумевает, 
    // что в showMenu() будет обязательно передан аргумент. 
    // Если нам нужны все значения по умолчанию, то нам следует передать пустой объект:

    showMenu({}); // ок, все значения - по умолчанию

    showMenu(); // так была бы ошибка
    // Мы можем исправить это, сделав {} значением по умолчанию для всего объекта параметров:

    function showMenu({ title = "Menu", width = 100, height = 200 } = {}) {
    alert( `${title} ${width} ${height}` );
    }

    showMenu(); // Menu 100 200

}
/*---------------------------------------*/
/*          Итого        */
{

    // Деструктуризация позволяет разбивать объект или массив на переменные при присвоении.

    // Полный синтаксис для объекта:

    // let {prop : varName = default, ...rest} = object
    // Cвойство prop объекта object здесь должно быть присвоено переменной varName. 
    // Если в объекте отсутствует такое свойство, переменной varName присваивается значение по умолчанию.

    // Свойства, которые не были упомянуты, копируются в объект rest.

    // Полный синтаксис для массива:

    // let [item1 = default, item2, ...rest] = array
    // Первый элемент отправляется в item1; второй отправляется в item2, 
    // все остальные элементы попадают в массив rest.

    // Можно извлекать данные из вложенных объектов и массивов, 
    // для этого левая сторона должна иметь ту же структуру, что и правая.

}
/*---------------------------------------*/
/*          Задачи        */
{

    // Деструктурирующее присваивание
    let user = { name: "John", years: 30 };

    // ваш код должен быть с левой стороны:
    let {
        name,
        years: age,
        isAdmin = "false"
    } = user

    alert( name ); // John
    alert( age ); // 30
    alert( isAdmin ); // false

    // Максимальная зарплата

    function topSalary(sal){
        if(sal == {} || sal == undefined)
        return null;

        // let maxNub = Math.max(Object.values(sal))

        for(let [key, value] of Object.entries(sal)){
            if(value === Math.max(Object.values(sal)))
            return key
        }
    }

    function topSalary(salaries) {

        let max = 0;
        let maxName = null;
      
        for(const [name, salary] of Object.entries(salaries)) {
          if (max < salary) {
            max = salary;
            maxName = name;
          }
        }
      
        return maxName;
      }

    let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
    };

    console.log(topSalary(salaries))

}
/*---------------------------------------*/
/*          Итого        */
{

}
/*---------------------------------------*/
