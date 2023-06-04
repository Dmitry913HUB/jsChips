"use strict"
/*          Прозрачное кеширование          */
{

    // Вот код с объяснениями:

    function slow(x) {
    // здесь могут быть ресурсоёмкие вычисления
    alert(`Called with ${x}`);
    return x;
    }

    function cachingDecorator(func) {
    let cache = new Map();

    return function(x) {
        if (cache.has(x)) {    // если кеш содержит такой x,
        return cache.get(x); // читаем из него результат
        }

        let result = func(x); // иначе, вызываем функцию

        cache.set(x, result); // и кешируем (запоминаем) результат
        return result;
    };
    }

    slow = cachingDecorator(slow);

    alert( slow(1) ); // slow(1) кешируем
    alert( "Again: " + slow(1) ); // возвращаем из кеша

    alert( slow(2) ); // slow(2) кешируем
    alert( "Again: " + slow(2) ); // возвращаем из кеша

    // В коде выше cachingDecorator – это декоратор, специальная функция, 
    // которая принимает другую функцию и изменяет её поведение.

    // Идея состоит в том, что мы можем вызвать cachingDecorator с любой функцией, 
    // в результате чего мы получим кеширующую обёртку. Это здорово, т.к. 
    // у нас может быть множество функций, использующих такую функциональность, и всё, 
    // что нам нужно сделать – это применить к ним cachingDecorator.

    // Функцию cachingDecorator можно использовать повторно. Мы можем применить её к другой функции.
    // Логика кеширования является отдельной, она не увеличивает сложность самой slow (если таковая была).
    // При необходимости мы можем объединить несколько декораторов (речь об этом пойдёт позже).

}
/*---------------------------------------*/
/*          Применение «func.call» для передачи контекста.          */
{

    // Например, в приведённом ниже коде мы вызываем sayHi в контексте различных объектов: 
    // sayHi.call(user) запускает sayHi, передавая this=user, 
    // а следующая строка устанавливает this=admin:

    function sayHi() {
    alert(this.name);
    }

    let user = { name: "John" };
    let admin = { name: "Admin" };

    // используем 'call' для передачи различных объектов в качестве 'this'
    sayHi.call( user ); // John
    sayHi.call( admin ); // Admin

    // Здесь мы используем call для вызова say с заданным контекстом и фразой:

    function say(phrase) {
    alert(this.name + ': ' + phrase);
    }

    user = { name: "John" };

    // 'user' становится 'this', и "Hello" становится первым аргументом
    say.call( user, "Hello" ); // John: Hello
    // В нашем случае мы можем использовать call в обёртке для передачи контекста в исходную функцию:

    let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        alert("Called with " + x);
        return x * this.someMethod(); // (*)
    }
    };

    function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if (cache.has(x)) {
        return cache.get(x);
        }
        let result = func.call(this, x); // теперь 'this' передаётся правильно
        cache.set(x, result);
        return result;
    };
    }

    worker.slow = cachingDecorator(worker.slow); // теперь сделаем её кеширующей

    alert( worker.slow(2) ); // работает
    alert( worker.slow(2) ); // работает, не вызывая первоначальную функцию (кешируется)
    // Теперь всё в порядке.

    // Чтобы всё было понятно, давайте посмотрим глубже, как передаётся this:

    // После декорации worker.slow становится обёрткой function (x) { ... }.
    // Так что при выполнении worker.slow(2) обёртка получает 2 в качестве аргумента и 
    // this=worker (так как это объект перед точкой).
    // Внутри обёртки, если результат ещё не кеширован, func.call(this, x) 
    // передаёт текущий this (=worker) и текущий аргумент (=2) в оригинальную функцию.

}
/*---------------------------------------*/
/*          Переходим к нескольким аргументам с «func.apply»          */
{

    // Есть много возможных решений:

    // Реализовать новую (или использовать стороннюю) структуру данных для коллекции, 
    // которая более универсальна, чем встроенный Map, и поддерживает множественные ключи.

    // Использовать вложенные коллекции: cache.set(min) будет Map, которая хранит пару (max, result). 
    // Тогда получить result мы сможем, вызвав cache.get(min).get(max).

    // Соединить два значения в одно. В нашем конкретном случае мы можем просто использовать 
    // строку "min,max" как ключ к Map. Для гибкости, мы можем позволить передавать хеширующую функцию 
    // в декоратор, которая знает, как сделать одно значение из многих.

    // Для многих практических применений третий вариант достаточно хорош, 
    // поэтому мы будем придерживаться его.

    // Также нам понадобится заменить func.call(this, x) на func.call(this, ...arguments), 
    // чтобы передавать все аргументы обёрнутой функции, а не только первый.

    // Вот более мощный cachingDecorator:

    let worker = {
    slow(min, max) {
        alert(`Called with ${min},${max}`);
        return min + max;
    }
    };

    function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
        let key = hash(arguments); // (*)
        if (cache.has(key)) {
        return cache.get(key);
        }

        let result = func.call(this, ...arguments); // (**)

        cache.set(key, result);
        return result;
    };
    }

    function hash(args) {
    return args[0] + ',' + args[1];
    }

    worker.slow = cachingDecorator(worker.slow, hash);

    alert( worker.slow(3, 5) ); // работает
    alert( "Again " + worker.slow(3, 5) ); // аналогично (из кеша)

    // Теперь он работает с любым количеством аргументов.

    // Синтаксис встроенного метода func.apply:

    func.apply(context, args)

    // Он выполняет func, устанавливая this=context и принимая в 
    // качестве списка аргументов псевдомассив args.

    // Единственная разница в синтаксисе между call и apply состоит в том, 
    // что call ожидает список аргументов, в то время как apply принимает псевдомассив.

    // Эти два вызова почти эквивалентны:

    func.call(context, ...args); // передаёт массив как список с оператором расширения
    func.apply(context, args);   // тот же эффект

    // Есть только одна небольшая разница:

    // Оператор расширения ... позволяет передавать перебираемый объект args в виде списка в call.
    // А apply принимает только псевдомассив args.

}
/*---------------------------------------*/
/*          Заимствование метода          */
{

    // Таким образом, вызов join для него потерпит неудачу, что мы и можем видеть ниже:

    function hash() {
    alert( arguments.join() ); // Ошибка: arguments.join не является функцией
    }

    hash(1, 2);
    // Тем не менее, есть простой способ использовать соединение массива:

    function hash() {
    alert( [].join.call(arguments) ); // 1,2
    }

    hash(1, 2);
    // Этот трюк называется заимствование метода.

    // Мы берём (заимствуем) метод join из обычного массива [].join. 
    // И используем [].join.call, чтобы выполнить его в контексте arguments.

}
/*---------------------------------------*/
/*          итого          */
{
    
    // Декоратор – это обёртка вокруг функции, которая изменяет поведение последней. 
    // Основная работа по-прежнему выполняется функцией.

    // Обычно безопасно заменить функцию или метод декорированным, 
    // за исключением одной мелочи. Если исходная функция предоставляет свойства, 
    // такие как func.calledCount или типа того, то декорированная функция их не предоставит. 
    // Потому что это обёртка. Так что нужно быть осторожным в их использовании. 
    // Некоторые декораторы предоставляют свои собственные свойства.

    // Декораторы можно рассматривать как «дополнительные возможности» или «аспекты», 
    // которые можно добавить в функцию. Мы можем добавить один или несколько декораторов. 
    // И всё это без изменения кода оригинальной функции!

    // Для реализации cachingDecorator мы изучили методы:

    // func.call(context, arg1, arg2…) – вызывает func с данным контекстом и аргументами.
    // func.apply(context, args) – вызывает func, передавая context как this и псевдомассив 
    // args как список аргументов.
    // В основном переадресация вызова выполняется с помощью apply:

    // let wrapper = function(original, arguments) {
    // return original.apply(this, arguments);
    // };
    // Мы также рассмотрели пример заимствования метода, когда мы вызываем метод у объекта в 
    // контексте другого объекта. Весьма распространено заимствовать методы массива и применять 
    // их к arguments. В качестве альтернативы можно использовать объект с остаточными параметрами 
    // ...args, который является реальным массивом.

    // На практике декораторы используются для самых разных задач. Проверьте, 
    // насколько хорошо вы их освоили, решая задачи этой главы.

}
/*---------------------------------------*/
/*          задачи          */
{

    // Декоратор-шпион

    function spy(func) {

        function wrapper(...args) {
          // мы используем ...args вместо arguments для хранения "реального" массива в wrapper.calls
          wrapper.calls.push(args);
          return func.apply(this, args);
        }
      
        wrapper.calls = [];
      
        return wrapper;
    }

    // Задерживающий декоратор

    function delay(func, time){
        return function(){
            setTimeout(() => f.apply(this, arguments), time);
        }
    }

    function delay(f, ms) {

        return function(...args) {
          let savedThis = this; // сохраняем this в промежуточную переменную
          setTimeout(function() {
            f.apply(savedThis, args); // используем её
          }, ms);
        };
      
      }   
    
    function f(x) {
        alert(x);
    }

    // создаём обёртки
    let f1000 = delay(f, 1000);
    let f1500 = delay(f, 1500);

    f1000("test"); // показывает "test" после 1000 мс
    f1500("test"); // показывает "test" после 1500 мс

    // Декоратор debounce

    function debounce(f, ms){

        let isColdown = false

        return function(){
            if (isColdown) return;

            f.apply(this, arguments);

            isCooldown = true;

            setTimeout(() => isCooldown = false, ms);
        }
    }

    let f = debounce(alert, 1000);

    f(1); // выполняется немедленно
    f(2); // проигнорирован

    setTimeout( () => f(3), 100); // проигнорирован (прошло только 100 мс)
    setTimeout( () => f(4), 1100); // выполняется
    setTimeout( () => f(5), 1500); // проигнорирован (прошло только 400 мс от последнего вызова)

    // Вызов debounce возвращает обёртку. Возможны два состояния:

    // isCooldown = false – готова к выполнению.
    // isCooldown = true – ожидание окончания тайм-аута.
    // В первом вызове isCoolDown = false, поэтому вызов продолжается, и состояние изменяется на true.

    // Пока isCoolDown имеет значение true, все остальные вызовы игнорируются.

    // Затем setTimeout устанавливает его в false после заданной задержки.

    // Тормозящий (throttling) декоратор

    function throttle(func, ms) {

        let isThrottled = false,
          savedArgs,
          savedThis;
      
        function wrapper() {
      
          if (isThrottled) { // (2)
            savedArgs = arguments;
            savedThis = this;
            return;
          }
      
          func.apply(this, arguments); // (1)
      
          isThrottled = true;
      
          setTimeout(function() {
            isThrottled = false; // (3)
            if (savedArgs) {
              wrapper.apply(savedThis, savedArgs);
              savedArgs = savedThis = null;
            }
          }, ms);
        }
      
        return wrapper;
      }
      

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