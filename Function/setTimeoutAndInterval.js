"use stric"
/*          setTimeout          */
{

    Синтаксис:

    // let timerId = setTimeout(func|code, [delay], [arg1], [arg2], ...);

    // апример, данный код вызывает sayHi() спустя одну секунду:

    function sayHi() {
    alert('Привет');
    }

    setTimeout(sayHi, 1000);
    // С аргументами:

    function sayHi(phrase, who) {
    alert( phrase + ', ' + who );
    }

    setTimeout(sayHi, 1000, "Привет", "Джон"); // Привет, Джон
    // Если первый аргумент является строкой, то JavaScript создаст из неё функцию.

    // Это также будет работать:

    setTimeout("alert('Привет')", 1000);
    // Но использование строк не рекомендуется. Вместо этого используйте функции. 
    // Например, так:

    setTimeout(() => alert('Привет'), 1000);

    // не правильно!
    setTimeout(sayHi(), 1000);

    // Отмена через clearTimeout
    // Вызов setTimeout возвращает «идентификатор таймера» timerId, 
    // который можно использовать для отмены дальнейшего выполнения.

    // Синтаксис для отмены:

    let timerId = setTimeout("...");
    clearTimeout(timerId);
    // В коде ниже планируем вызов функции и затем отменяем его 
    // (просто передумали). В результате ничего не происходит:

    timerId = setTimeout(() => alert("ничего не происходит"), 1000);
    alert(timerId); // идентификатор таймера

    clearTimeout(timerId);
    alert(timerId); // тот же идентификатор (не принимает значение null после отмены)

}
/*---------------------------------------*/
/*          setInterval          */
{

    // Метод setInterval имеет такой же синтаксис как setTimeout:

    let timerId = setInterval(func|code, [delay], [arg1], [arg2], "...");

    // Следующий пример выводит сообщение каждые 2 секунды. 
    // Через 5 секунд вывод прекращается:

    // повторить с интервалом 2 секунды
    timerId = setInterval(() => alert('tick'), 2000);

    // остановить вывод через 5 секунд
    setTimeout(() => { clearInterval(timerId); alert('stop'); }, 5000)

    // Во время показа alert время тоже идёт
    // В большинстве браузеров, включая Chrome и Firefox, внутренний счётчик продолжает тикать во время показа alert/confirm/prompt.

    // Так что если вы запустите код выше и подождёте с закрытием alert 
    // несколько секунд, то следующий alert будет показан сразу, 
    // как только вы закроете предыдущий. Интервал времени между 
    // сообщениями alert будет короче, чем 2 секунды.

}
/*---------------------------------------*/
/*          Вложенный setTimeout          */
{

    // Есть два способа запускать что-то регулярно.
    // Один из них setInterval. Другим является вложенный setTimeout. Например:

    /** вместо:
    let timerId = setInterval(() => alert('tick'), 2000);
    */

    let timerId = setTimeout(function tick() {
    alert('tick');
    timerId = setTimeout(tick, 2000); // (*)
    }, 2000);

    // Например, необходимо написать сервис, который отправляет запрос для получения
    //  данных на сервер каждые 5 секунд, но если сервер перегружен, 
    //  то необходимо увеличить интервал запросов до 10, 20, 40 секунд… 
    //  Вот псевдокод:

    let delay = 5000;

    timerId = setTimeout(function request() {
    // ...отправить запрос...

    if ("ошибка запроса из-за перегрузки сервера") {
        // увеличить интервал для следующего запроса
        delay *= 2;
    }

    timerId = setTimeout(request, delay);

    }, delay);

    // Вложенный setTimeout позволяет задать задержку между выполнениями более точно,
    // чем setInterval.

    // Сравним два фрагмента кода. 

    // Первый использует setInterval: ПЕРИОДЫ ЗАДЕРЖКИ СПЛИНИРОВАНЫ И В ЭТОТ ПЕРИОД ПОМЕЩАЕТСЯ ФУНКЦИЯ

    let i = 1;
    setInterval(function() {
    func(i);
    }, 100);

    // Второй использует вложенный setTimeout: ЗАДЕРЖКА МЕЖДУ ВЫЗОВАМИ СТРОГО РАВНА ИНТРЕВАЛУ

    i = 1;
    setTimeout(function run() {
    func(i);
    setTimeout(run, 100);
    }, 100);

    // Сборка мусора и колбэк setTimeout/setInterval
    // Когда функция передаётся в setInterval/setTimeout, 
    // на неё создаётся внутренняя ссылка и сохраняется в планировщике. 
    // Это предотвращает попадание функции в сборщик мусора, 
    // даже если на неё нет других ссылок.

    // функция остаётся в памяти до тех пор, пока планировщик обращается к ней
    setTimeout(function() {"..."}, 100);
    // Для setInterval функция остаётся в памяти до тех пор, 
    // пока не будет вызван clearInterval.

}
/*---------------------------------------*/
/*          setTimeout с нулевой задержкой          */
{

    // Например, этот код выводит «Привет» и затем сразу «Мир»:

    setTimeout(() => alert("Мир"));

    alert("Привет");

    // Минимальная задержка вложенных таймеров в браузере
    // В браузере есть ограничение на то, 
    // как часто внутренние счётчики могут выполняться. 
    // В стандарте HTML5 говорится: «после пяти вложенных таймеров интервал должен 
    // составлять не менее четырёх миллисекунд.».

    // Продемонстрируем в примере ниже, что это означает. 
    // Вызов setTimeout повторно вызывает себя через 0 мс. 
    // Каждый вызов запоминает реальное время от предыдущего вызова в массиве times. 
    // Какова реальная задержка? Посмотрим:

    let start = Date.now();
    let times = [];

    setTimeout(function run() {
    times.push(Date.now() - start); // запоминаем задержку от предыдущего вызова

    if (start + 100 < Date.now()) alert(times); // показываем задержку через 100 мс
    else setTimeout(run); // если нужно ещё запланировать
    });

    // пример вывода:
    // 1,1,1,1,9,15,20,24,30,35,40,45,50,55,59,64,70,75,80,85,90,95,100

    // Первый таймер запускается сразу (как и указано в спецификации), 
    // а затем задержка вступает в игру, и мы видим 9, 15, 20, 24....

    // Аналогичное происходит при использовании setInterval вместо 
    // setTimeout: setInterval(f) запускает f несколько раз с нулевой задержкой, 
    // а затем с задержкой 4+ мс.

    // Это ограничение существует давно, многие скрипты полагаются на него, 
    // поэтому оно сохраняется по историческим причинам.

    // Этого ограничения нет в серверном JavaScript. 
    // Там есть и другие способы планирования асинхронных задач. 
    // Например, setImmediate для Node.js. 
    // Так что это ограничение относится только к браузерам.

}
/*---------------------------------------*/
/*          итого          */
{

    // Методы setInterval(func, delay, ...args) и setTimeout(func, delay, ...args) 
    // позволяют выполнять func регулярно или только один раз после задержки delay, 
    // заданной в мс.

    // Для отмены выполнения необходимо вызвать clearInterval/clearTimeout со 
    // значением, которое возвращают методы setInterval/setTimeout.

    // Вложенный вызов setTimeout является более гибкой альтернативой setInterval. 
    // Также он позволяет более точно задать интервал между выполнениями.

    // Планирование с нулевой задержкой setTimeout(func,0) или, что то же самое, 
    // setTimeout(func) используется для вызовов, которые должны быть исполнены как 
    // можно скорее, после завершения исполнения текущего кода.

    // Браузер ограничивает 4-мя мс минимальную задержку между пятью и более 
    // вложенными вызовами setTimeout, а также для setInterval, начиная 
    // с 5-го вызова.
    // Обратим внимание, что все методы планирования не гарантируют точную задержку.

    // Например, таймер в браузере может замедляться по многим причинам:

    // Перегружен процессор.
    // Вкладка браузера в фоновом режиме.
    // Работа ноутбука от аккумулятора.
    // Всё это может увеличивать минимальный интервал срабатывания таймера 
    // (и минимальную задержку) до 300 или даже 1000 мс в зависимости от 
    // браузера и настроек производительности ОС.

}
/*---------------------------------------*/
/*          Задачи          */
{

    // Вывод каждую секунду

    function printNumbers(from, to){
        let curent = from;

        let intervalId = setInterval(() => {
            if(curent <= to){
                alert(curent++);
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
    }

    function printNumbers(from, to){
        let timeoutId = setTimeout(function tick() {
            if(from <= to){
                alert(from++);
                timeoutId = setTimeout(tick, 1000);
            } else {
                clearTimeout(timeoutId);
            }
        }, 1000);
    }

    // Заметим, что в обоих решениях есть начальная задержка перед первым выводом. 
    // Она составляет одну секунду (1000мс). 
    // Если мы хотим, чтобы функция запускалась сразу же, 
    // то надо добавить такой запуск вручную на отдельной строке, вот так:

    function printNumbers(from, to) {
    let current = from;

    function go() {
        alert(current);
        if (current == to) {
        clearInterval(timerId);
        }
        current++;
    }

    go();
    let timerId = setInterval(go, 1000);
    }

    printNumbers(5, 10);

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