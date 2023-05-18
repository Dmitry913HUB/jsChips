"use strict"
/*          Пара вопросов          */
{

    // Функция sayHi использует внешнюю переменную name. Какое значение будет использовать функция при выполнении?

    let name = "John";

    function sayHi() {
    alert("Hi, " + name);
    }

    name = "Pete";

    sayHi(); // что будет показано: "John" или "Pete"?
    // Такие ситуации распространены и в браузерной и в серверной разработке. 
    // Выполнение функции может быть запланировано позже, чем она была создана, например, 
    // после какого-нибудь пользовательского действия или сетевого запроса.

    // Итак, вопрос в том, получит ли она доступ к последним изменениям?

    // Функция makeWorker создаёт другую функцию и возвращает её. 
    // Новая функция может быть вызвана откуда-то ещё. 
    // Получит ли она доступ к внешним переменным из места своего создания или места выполнения или из обоих?

    function makeWorker() {
    let name = "Pete";

    return function() {
        alert(name);
    };
    }

    name = "John";

    // create a function
    let work = makeWorker();

    // call it
    work(); // что будет показано? "Pete" (из места создания) или "John" (из места выполнения)

    // в обоих случаях Pete

}
/*---------------------------------------*/
/*          Лексическое Окружение          */
{

    // Функция получает текущее значение внешних переменных, то есть их последнее значение

    // Старые значения переменных нигде не сохраняются. Когда функция хочет получить доступ к переменной, 
    // она берёт её текущее значение из своего или внешнего лексического окружения.

    // Так что ответ на первый вопрос: Pete:

    let name = "John";

    function sayHi() {
    alert("Hi, " + name);
    }

    name = "Pete"; // (*)

    sayHi(); // Pete
    // Порядок выполнения кода, приведённого выше:

    // В глобальном лексическом окружении есть name: "John".
    // На строке (*) глобальная переменная изменяется, теперь name: "Pete".
    // Момент, когда выполняется функция sayHi() и берёт переменную name извне. 
    // Теперь из глобального лексического окружения, где переменная уже равна "Pete".
    // Один вызов – одно лексическое окружение
    // Пожалуйста, обратите внимание, что новое лексическое окружение функции создаётся каждый раз, 
    // когда функция выполняется.

    // И, если функция вызывается несколько раз, то для каждого вызова будет своё лексическое окружение, 
    // со своими, специфичными для этого вызова, локальными переменными и параметрами.

    // Лексическое окружение – это специальный внутренний объект
    // «Лексическое окружение» – это специальный внутренний объект. 
    // Мы не можем получить его в нашем коде и изменять напрямую. 
    // Сам движок JavaScript может оптимизировать его, уничтожать неиспользуемые переменные для освобождения 
    // памяти и выполнять другие внутренние уловки, 
    // но видимое поведение объекта должно оставаться таким, как было описано.

}
/*---------------------------------------*/
/*          Вложенные функции          */
{

    // Мы можем использовать это для упорядочивания нашего кода, например, как здесь:

    function sayHiBye(firstName, lastName) {

    // функция-помощник, которую мы используем ниже
    function getFullName() {
        return firstName + " " + lastName;
    }

    alert( "Hello, " + getFullName() );
    alert( "Bye, " + getFullName() );

    }
    // Такой возможности нет: count – локальная переменная функции, мы не можем получить к ней доступ извне.
    // Для каждого вызова makeCounter() создаётся новое лексическое окружение функции, 
    // со своим собственным count. Так что получившиеся функции counter – независимы.
    // Вот демо:

    function makeCounter() {
    let count = 0;
    return function() {
        return count++;
    };
    }

    let counter1 = makeCounter();
    let counter2 = makeCounter();

    alert( counter1() ); // 0
    alert( counter1() ); // 1

    alert( counter2() ); // 0 (независимо)

}
/*---------------------------------------*/
/*          Окружение в деталях          */
{

    

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
/*          итого          */
{

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
/*          итого          */
{

}
/*---------------------------------------*/