"use strict"
/*          Потеря «this»          */
{

    // Вот как это может произойти в случае с setTimeout:

    let user = {
    firstName: "Вася",
    sayHi() {
        alert(`Привет, ${this.firstName}!`);
    }
    };

    setTimeout(user.sayHi, 1000); // Привет, undefined!
    // При запуске этого кода мы видим, что вызов this.firstName возвращает не «Вася», а undefined!

    // Метод setTimeout в браузере имеет особенность: он устанавливает this=window для вызова функции 
    // (в Node.js this становится объектом таймера, но здесь это не имеет значения). 
    // Таким образом, для this.firstName он пытается получить window.firstName, которого не существует. 
    // В других подобных случаях this обычно просто становится undefined

}
/*---------------------------------------*/
/*          Решение 1: сделать функцию-обёртку          */
{

    let user = {
        firstName: "peta",
        sayHi(){
            alert(`Privet, ${this.firstName}`)
        }
    }

    setTimeout(function(){
        user.sayHi;
    }, 1000);

    setTimeout(() => user.sayHi(), 1000); // Привет, Вася!

    // Что произойдёт, если до момента срабатывания setTimeout (ведь задержка составляет целую секунду!) 
    // в переменную user будет записано другое значение? Тогда вызов неожиданно будет совсем не тот!

    user = {
    firstName: "Вася",
    sayHi() {
        alert(`Привет, ${this.firstName}!`);
    }
    };

    setTimeout(() => user.sayHi(), 1000);

    // ...в течение 1 секунды
    user = { sayHi() { alert("Другой пользователь в 'setTimeout'!"); } };

    // Другой пользователь в 'setTimeout'!

}
/*---------------------------------------*/
/*          Решение 2: привязать контекст с помощью bind          */
{

    let boundFunc = func.bind(context);

    // Например, здесь funcUser передаёт вызов в func, фиксируя this=user:

    let user = {
    firstName: "Вася"
    };

    function func() {
    alert(this.firstName);
    }

    let funcUser = func.bind(user);
    funcUser(); // Вася

    // Все аргументы передаются исходному методу func как есть, например:

    user = {
    firstName: "Вася"
    };

    function func(phrase) {
    alert(phrase + ', ' + this.firstName);
    }

    // привязка this к user
    funcUser = func.bind(user);

    funcUser("Привет"); // Привет, Вася (аргумент "Привет" передан, при этом this = user)

    // Теперь давайте попробуем с методом объекта:

    user = {
    firstName: "Вася",
    sayHi() {
        alert(`Привет, ${this.firstName}!`);
    }
    };

    let sayHi = user.sayHi.bind(user); // (*)

    sayHi(); // Привет, Вася!

    setTimeout(sayHi, 1000); // Привет, Вася!

    // Здесь мы можем увидеть, что bind исправляет только this, а аргументы передаются как есть:

    user = {
    firstName: "Вася",
    say(phrase) {
        alert(`${phrase}, ${this.firstName}!`);
    }
    };

    let say = user.say.bind(user);

    say("Привет"); // Привет, Вася (аргумент "Привет" передан в функцию "say")
    say("Пока"); // Пока, Вася (аргумент "Пока" передан в функцию "say")

    // Удобный метод: bindAll
    // Если у объекта много методов и мы планируем их активно передавать, 
    // то можно привязать контекст для них всех в цикле:

    for (let key in user) {
    if (typeof user[key] == 'function') {
        user[key] = user[key].bind(user);
    }
    }

}
/*---------------------------------------*/
/*          Частичное применение          */
{

    // Полный синтаксис bind:

    let bound = func.bind(context, [arg1], [arg2], "...");
    // Это позволяет привязать контекст this и начальные аргументы функции.

    // Например, у нас есть функция умножения mul(a, b):

    function mul(a, b) {
    return a * b;
    }
    // Давайте воспользуемся bind, чтобы создать функцию double на её основе:

    function mul(a, b) {
    return a * b;
    }

    let double = mul.bind(null, 2);

    alert( double(3) ); // = mul(2, 3) = 6
    alert( double(4) ); // = mul(2, 4) = 8
    alert( double(5) ); // = mul(2, 5) = 10

    // В следующем коде функция triple умножает значение на три:

    function mul(a, b) {
    return a * b;
    }

    let triple = mul.bind(null, 3);

    alert( triple(3) ); // = mul(3, 3) = 9
    alert( triple(4) ); // = mul(3, 4) = 12
    alert( triple(5) ); // = mul(3, 5) = 15
    // Для чего мы обычно создаём частично применённую функцию?

    // Польза от этого в том, что возможно создать независимую функцию с понятным названием (double, triple). 
    // Мы можем использовать её и не передавать каждый раз первый аргумент, т.к. он зафиксирован с помощью bind.

    // Например, у нас есть функция send(from, to, text). Потом внутри объекта user мы можем захотеть использовать
    // её частный вариант: sendTo(to, text), который отправляет текст от имени текущего пользователя.

}
/*---------------------------------------*/
/*          Частичное применение без контекста          */
{

    // К счастью, легко создать вспомогательную функцию partial, которая привязывает только аргументы.

    // Вот так:

    function partial(func, ...argsBound) {
    return function(...args) { // (*)
        return func.call(this, ...argsBound, ...args);
    }
    }

    // использование:
    let user = {
    firstName: "John",
    say(time, phrase) {
        alert(`[${time}] ${this.firstName}: ${phrase}!`);
    }
    };

    // добавляем частично применённый метод с фиксированным временем
    user.sayNow = partial(user.say, new Date().getHours() + ':' + new Date().getMinutes());

    user.sayNow("Hello");
    // Что-то вроде этого:
    // [10:00] John: Hello!

    // Результатом вызова partial(func[, arg1, arg2...]) будет обёртка (*), которая вызывает func с:

    // Тем же this, который она получает (для вызова user.sayNow – это будет user)
    // Затем передаёт ей ...argsBound – аргументы из вызова partial ("10:00")
    // Затем передаёт ей ...args – аргументы, полученные обёрткой ("Hello")

}
/*---------------------------------------*/
/*          итого          */
{

    // Метод bind возвращает «привязанный вариант» функции func, фиксируя контекст this и первые аргументы 
    // arg1, arg2…, если они заданы.

    // Обычно bind применяется для фиксации this в методе объекта, чтобы передать его в качестве колбэка. 
    // Например, для setTimeout.

    // Когда мы привязываем аргументы, такая функция называется «частично применённой» или «частичной».

    // Частичное применение удобно, когда мы не хотим повторять один и тот же аргумент много раз. Например, 
    // если у нас есть функция send(from, to) и from всё время будет одинаков для нашей задачи, то мы можем 
    // создать частично применённую функцию и дальше работать с ней.

}
/*---------------------------------------*/
/*          Задачи          */
{

    // Связанная функция как метод Что выведет функция?

    function f() {
    alert( this ); // null
    }

    let user = {
    g: f.bind(null)
    };

    user.g();

    // Повторный bind Что выведет этот код?

    function f() {
    alert(this.name);
    }

    f = f.bind( {name: "Вася"} ).bind( {name: "Петя" } );

    f(); // Вася

    // Свойство функции после bind 
    // В свойство функции записано значение. Изменится ли оно после применения bind? Обоснуйте ответ.

    function sayHi() {
    alert( this.name );
    }
    sayHi.test = 5;

    let bound = sayHi.bind({
    name: "Вася"
    });

    alert( bound.test ); // undefined

    // Исправьте функцию, теряющую "this"

    function askPassword(ok, fail) {
        let password = prompt("Password?", '');
        if (password == "rockstar") ok();
        else fail();
      }
      
    user = {
        name: 'Вася',
        
        loginOk() {
            alert(`${this.name} logged in`);
        },
        
        loginFail() {
            alert(`${this.name} failed to log in`);
        },      
    };
      
    askPassword(user.loginOk, user.loginFail);

    askPassword(user.loginOk.bind(this), user.loginFail.bind(this)); // norm resh

    askPassword(user.loginOk.bind(user), user.loginFail.bind(user)); // norm resh

    askPassword(() => user.loginOk(), () => user.loginFail()); // norm resh

    // Использование частично применённой функции для логина

    function askPassword(ok, fail) {
        let password = prompt("Password?", '');
        if (password == "rockstar") ok();
        else fail();
      }
      
      user = {
        name: 'John',
      
        login(result) {
          alert( this.name + (result ? ' logged in' : ' failed to log in') );
        }
      };
      
    //   askPassword(?, ?); // ?

    askPassword(() => user.login(true), () => user.login(false));

    askPassword(user.login.bind(user, true), user.login.bind(user, false));

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