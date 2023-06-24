/*       Синтаксис «class»       */
{

// Базовый синтаксис выглядит так:

// class MyClass {
//   // методы класса
//   constructor() { ... }
//   method1() { ... }
//   method2() { ... }
//   method3() { ... }
//   ...
// }
// Затем используйте вызов new MyClass() для создания 
// нового объекта со всеми перечисленными методами.

// При этом автоматически вызывается метод constructor(), 
// в нём мы можем инициализировать объект.

// Например:

class User {

  constructor(name) {
    this.name = name;
  }

  sayHi() {
    alert(this.name);
  }

}

// Использование:
let user = new User("Иван");
user.sayHi();
// Когда вызывается 
new User("Иван");

// Создаётся новый объект.
// constructor запускается с заданным аргументом и сохраняет его в this.name.
// …Затем можно вызывать на объекте методы, такие как user.sayHi().

// Методы в классе не разделяются запятой
// Частая ошибка начинающих разработчиков – ставить запятую между методами класса, 
// что приводит к синтаксической ошибке.

// Синтаксис классов отличается от литералов объектов, не путайте их. 
// Внутри классов запятые не требуются.

}
/*------------------------------*/
/*       Что такое класс?       */
{

// В JavaScript класс – это разновидность функции.

Взгляните:

class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// доказательство: User - это функция
alert(typeof User); // function
// Вот что на самом деле делает конструкция class User {...}:

// Создаёт функцию с именем User, которая становится результатом объявления класса. 
// Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
// Сохраняет все методы, такие как sayHi, в User.prototype.

// На картинке показан результат объявления class User:

// Можно проверить вышесказанное и при помощи кода:

class User {
  constructor(name) { this.name = name; }
  sayHi() { alert(this.name); }
}

// класс - это функция
alert(typeof User); // function

// ...или, если точнее, это метод constructor
alert(User === User.prototype.constructor); // true

// Методы находятся в User.prototype, например:
alert(User.prototype.sayHi); // sayHi() { alert(this.name); }

// в прототипе ровно 2 метода
alert(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi

}
/*------------------------------*/
/*       Не просто синтаксический сахар       */
{

// Иногда говорят, что class – это просто «синтаксический сахар» в 
// JavaScript (синтаксис для улучшения читаемости кода, 
// но не делающий ничего принципиально нового), 
// потому что мы можем сделать всё то же самое без конструкции class:

// перепишем класс User на чистых функциях

// 1. Создаём функцию constructor
function User(name) {
  this.name = name;
}
// каждый прототип функции имеет свойство constructor по умолчанию,
// поэтому нам нет необходимости его создавать

// 2. Добавляем метод в прототип
User.prototype.sayHi = function() {
  alert(this.name);
};

// Использование:
let user = new User("Иван");
user.sayHi();
// Результат этого кода очень похож. Поэтому, действительно, есть причины, 
// по которым class можно считать синтаксическим сахаром для определения 
// конструктора вместе с методами прототипа.

// Однако есть важные отличия:

// Во-первых, функция, созданная с помощью class, помечена специальным внутренним 
// cвойством [[IsClassConstructor]]: true. Поэтому это не совсем то же самое, 
// что создавать её вручную.

// В отличие от обычных функций, конструктор класса не может быть вызван без new:

class User {
  constructor() {}
}

alert(typeof User); // function
User(); // Error: Class constructor User cannot be invoked without 'new'
// Кроме того, строковое представление конструктора класса в большинстве 
// движков JavaScript начинается с «class …»

class User {
  constructor() {}
}

alert(User); // class User { ... }
// Методы класса являются неперечислимыми. Определение класса устанавливает флаг enumerable 
// в false для всех методов в "prototype".

// И это хорошо, так как если мы проходимся циклом for..in по объекту, 
// то обычно мы не хотим при этом получать методы класса.

// Классы всегда используют use strict. Весь код внутри класса автоматически находится 
// в строгом режиме.

// Также в дополнение к основной, описанной выше, функциональности, 
// синтаксис class даёт ряд других интересных возможностей, 
// с которыми мы познакомимся чуть позже.

}
/*------------------------------*/
/*       Class Expression       */
{

// Как и функции, классы можно определять внутри другого выражения, 
// передавать, возвращать, присваивать и т.д.

// Пример Class Expression (по аналогии с Function Expression):

let User = class {
  sayHi() {
    alert("Привет");
  }
};
// Аналогично Named Function Expression, Class Expression может иметь имя.

// Если у Class Expression есть имя, то оно видно только внутри класса:

// "Named Class Expression"
// (в спецификации нет такого термина, но происходящее похоже на Named Function Expression)
User = class MyClass {
  sayHi() {
    alert(MyClass); // имя MyClass видно только внутри класса
  }
};

new User().sayHi(); // работает, выводит определение MyClass

alert(MyClass); // ошибка, имя MyClass не видно за пределами класса
// Мы даже можем динамически создавать классы «по запросу»:

function makeClass(phrase) {
  // объявляем класс и возвращаем его
  return class {
    sayHi() {
      alert(phrase);
    };
  };
}

// Создаём новый класс
User = makeClass("Привет");

new User().sayHi(); // Привет

}
/*------------------------------*/
/*       Геттеры/сеттеры, другие сокращения       */
{

// Как и в литеральных объектах, в классах можно объявлять вычисляемые свойства, 
// геттеры/сеттеры и т.д.

// Вот пример user.name, реализованного с использованием get/set:

class User {

  constructor(name) {
    // вызывает сеттер
    this.name = name;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Имя слишком короткое.");
      return;
    }
    this._name = value;
  }

}

let user = new User("Иван");
alert(user.name); // Иван

user = new User(""); // Имя слишком короткое.
// При объявлении класса геттеры/сеттеры создаются на User.prototype, вот так:

Object.defineProperties(User.prototype, {
  name: {
    get() {
      return this._name
    },
    set(name) {
      // ...
    }
  }
});
// Пример с вычисляемым свойством в скобках [...]:

class User {

  ['say' + 'Hi']() {
    alert("Привет");
  }

}

new User().sayHi();

}
/*------------------------------*/
/*       Свойства классов       */
{

// В приведённом выше примере у класса User были только методы. Давайте добавим свойство:

class User {
  name = "Аноним";

  sayHi() {
    alert(`Привет, ${this.name}!`);
  }
}

new User().sayHi();
// Свойство name не устанавливается в User.prototype. 
// Вместо этого оно создаётся оператором new перед запуском конструктора, 
// это именно свойство объекта.

}
/*------------------------------*/
/*       Итого       */
{

// Базовый синтаксис для классов выглядит так:

// class MyClass {
//   prop = value; // свойство
//   constructor(...) { // конструктор
//     // ...
//   }
//   method(...) {} // метод
//   get something(...) {} // геттер
//   set something(...) {} // сеттер
//   [Symbol.iterator]() {} // метод с вычисляемым именем (здесь - символом)
//   // ...
// }
// MyClass технически является функцией (той, которую мы определяем как constructor), 
// в то время как методы, геттеры и сеттеры записываются в MyClass.prototype.

// В следующих главах мы узнаем больше о классах, включая наследование и другие возможности.

}
/*------------------------------*/
/*       Задачи       */
{

//Перепишите класс
class Clock {
  constructor({ template }) {
    this.template = template;
  }

  render() {
    let date = new Date();

    let hours = date.getHours();
    if (hours < 10) hours = '0' + hours;

    let mins = date.getMinutes();
    if (mins < 10) mins = '0' + mins;

    let secs = date.getSeconds();
    if (secs < 10) secs = '0' + secs;

    let output = this.template
      .replace('h', hours)
      .replace('m', mins)
      .replace('s', secs);

    console.log(output);
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), 1000);
  }
}


let clock = new Clock({template: 'h:m:s'});
clock.start();

}
/*------------------------------*/
/*       Синтаксис       */
{

}
/*------------------------------*/
/*       Синтаксис       */
{

}
/*------------------------------*/