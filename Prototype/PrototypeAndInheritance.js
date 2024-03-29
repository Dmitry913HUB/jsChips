"use strict"
/*          [[Prototype]]          */
{

    // В JavaScript объекты имеют специальное скрытое свойство [[Prototype]] 
    // (так оно названо в спецификации), которое либо равно null, 
    // либо ссылается на другой объект. Этот объект называется «прототип»:

    // Одним из них является использование __proto__, например так:

    let animal = {
    eats: true
    };
    let rabbit = {
    jumps: true
    };

    rabbit.__proto__ = animal;
    // Если мы ищем свойство в rabbit, а оно отсутствует, 
    // JavaScript автоматически берёт его из animal.

    // Например:

    animal = {
    eats: true
    };
    rabbit = {
    jumps: true
    };

    rabbit.__proto__ = animal; // (*)

    // теперь мы можем найти оба свойства в rabbit:
    alert( rabbit.eats ); // true (**)
    alert( rabbit.jumps ); // true

    // Если у нас есть метод в animal, он может быть вызван на rabbit:

    animal = {
    eats: true,
    walk() {
        alert("Animal walk");
    }
    };

    rabbit = {
    jumps: true,
    __proto__: animal
    };

    // walk взят из прототипа
    rabbit.walk(); // Animal walk

    // Метод автоматически берётся из прототипа:

    // Цепочка прототипов может быть длиннее:

    animal = {
    eats: true,
    walk() {
        alert("Animal walk");
    }
    };

    rabbit = {
    jumps: true,
    __proto__: animal
    };

    let longEar = {
    earLength: 10,
    __proto__: rabbit
    };

    // walk взят из цепочки прототипов
    longEar.walk(); // Animal walk
    alert(longEar.jumps); // true (из rabbit)

    // Свойство __proto__ — исторически обусловленный геттер/сеттер для [[Prototype]]

    // Свойство __proto__ немного устарело, 
    // оно существует по историческим причинам. 
    // Современный JavaScript предполагает, 
    // что мы должны использовать функции 
    // Object.getPrototypeOf/Object.setPrototypeOf вместо того, 
    // чтобы получать/устанавливать прототип. Мы также рассмотрим эти функции позже.

}
/*---------------------------------------*/
/*          Операция записи не использует прототип          */
{

    // В приведённом ниже примере мы присваиваем rabbit собственный метод walk:

    let animal = {
    eats: true,
    walk() {
        /* этот метод не будет использоваться в rabbit */
    }
    };

    let rabbit = {
    __proto__: animal
    };

    rabbit.walk = function() {
    alert("Rabbit! Bounce-bounce!");
    };

    rabbit.walk(); // Rabbit! Bounce-bounce!

    // По этой причине admin.fullName работает корректно в приведённом ниже коде:

    let user = {
    name: "John",
    surname: "Smith",

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    },

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
    };

    let admin = {
    __proto__: user,
    isAdmin: true
    };

    alert(admin.fullName); // John Smith (*)

    // срабатывает сеттер!
    admin.fullName = "Alice Cooper"; // (**)
    alert(admin.name); // Alice
    alert(admin.surname); // Cooper
    
    // Здесь в строке (*) свойство admin.fullName имеет геттер в прототипе user, 
    // поэтому вызывается он. В строке (**) свойство также имеет сеттер в прототипе, 
    // который и будет вызван.

}
/*---------------------------------------*/
/*          Значение «this»          */
{

    // Вызов rabbit.sleep() устанавливает this.isSleeping для объекта rabbit:

    // методы animal
    let animal = {
    walk() {
        if (!this.isSleeping) {
        alert(`I walk`);
        }
    },
    sleep() {
        this.isSleeping = true;
    }
    };

    let rabbit = {
    name: "White Rabbit",
    __proto__: animal
    };

    // модифицирует rabbit.isSleeping
    rabbit.sleep();

    alert(rabbit.isSleeping); // true
    alert(animal.isSleeping); // undefined (нет такого свойства в протот

    // Если бы у нас были другие объекты, такие как bird, snake и т.д., 
    // унаследованные от animal, они также получили бы доступ к методам animal. 
    // Но this при вызове каждого метода будет соответствовать объекту (перед точкой), 
    // на котором происходит вызов, а не animal. Поэтому, когда мы записываем данные в this, 
    // они сохраняются в этих объектах.

    // В результате методы являются общими, а состояние объекта — нет.

}
/*---------------------------------------*/
/*          Цикл for…in          */
{

    // Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта.

    let animal = {
    eats: true
    };

    let rabbit = {
    jumps: true,
    __proto__: animal
    };

    // Object.keys возвращает только собственные ключи
    alert(Object.keys(rabbit)); // jumps

    // for..in проходит и по своим, и по унаследованным ключам
    for(let prop in rabbit) alert(prop); // jumps, затем eats

    // Если унаследованные свойства нам не нужны, 
    // то мы можем отфильтровать их при помощи встроенного метода 
    // obj.hasOwnProperty(key): он возвращает true, если у obj есть собственное, 
    // не унаследованное, свойство с именем key.

    // Пример такой фильтрации:

    animal = {
    eats: true
    };

    rabbit = {
    jumps: true,
    __proto__: animal
    };

    for(let prop in rabbit) {
    let isOwn = rabbit.hasOwnProperty(prop);

    if (isOwn) {
        alert(`Our: ${prop}`); // Our: jumps
    } else {
        alert(`Inherited: ${prop}`); // Inherited: eats
    }
    }

    // В этом примере цепочка наследования выглядит так: rabbit наследует от animal, 
    // который наследует от Object.prototype (так как animal – литеральный объект {...}, 
    //     то это по умолчанию), а затем null на самом верху:

    // Почти все остальные методы получения ключей/значений игнорируют унаследованные свойства
    // Почти все остальные методы, получающие ключи/значения, такие как Object.keys, 
    // Object.values и другие – игнорируют унаследованные свойства.

    // Они учитывают только свойства самого объекта, не его прототипа.

}
/*---------------------------------------*/
/*          итого          */
{

    // В JavaScript все объекты имеют скрытое свойство [[Prototype]], 
    // которое является либо другим объектом, либо null.

    // Мы можем использовать obj.__proto__ для доступа к нему 
    // (исторически обусловленный геттер/сеттер, есть другие способы, 
    // которые скоро будут рассмотрены).

    // Объект, на который ссылается [[Prototype]], называется «прототипом».

    // Если мы хотим прочитать свойство obj или вызвать метод, 
    // которого не существует у obj, тогда JavaScript попытается найти его в прототипе.

    // Операции записи/удаления работают непосредственно с объектом, 
    // они не используют прототип (если это обычное свойство, а не сеттер).

    // Если мы вызываем obj.method(), а метод при этом взят из прототипа, 
    // то this всё равно ссылается на obj. Таким образом, методы всегда работают с текущим объектом, 
    // даже если они наследуются.

    // Цикл for..in перебирает как свои, так и унаследованные свойства. 
    // Остальные методы получения ключей/значений работают только с собственными свойствами объекта.

}
/*---------------------------------------*/
/*          Задачи          */
{

    // Работа с прототипами

    let animal = {
        jumps: null
      };
      let rabbit = {
        __proto__: animal,
        jumps: true
      };
      
      alert( rabbit.jumps ); // true (1)
      
      delete rabbit.jumps;
      
      alert( rabbit.jumps ); // null (2)
      
      delete animal.jumps;
      
      alert( rabbit.jumps ); // undefined (3)

    // Алгоритм поиска

    let head = {
        glasses: 1
      };
      
      let table = {
        pen: 3,
        __proto__: head,
      };
      
      let bed = {
        sheet: 1,
        pillow: 2,
        __proto__: table,
      };
      
      let pockets = {
        money: 2000,
        __proto__: bed,
      };

    // Куда будет произведена запись?

    animal = {
        eat() {
          this.full = true;
        }
      };
      
    rabbit = {
        __proto__: animal
      };
      
    rabbit.eat(); // rabbit full

    // Почему наедаются оба хомяка?

    // Давайте внимательно посмотрим, что происходит при вызове speedy.eat("apple").

    // Сначала в прототипе (=hamster) находится метод speedy.eat, 
    // а затем он выполняется с this=speedy (объект перед точкой).

    // Затем в this.stomach.push() нужно найти свойство stomach и вызвать для него push. 
    // Движок ищет stomach в this (=speedy), но ничего не находит.

    // Он идёт по цепочке прототипов и находит stomach в hamster.

    // И вызывает для него push, добавляя еду в живот прототипа.

    // Получается, что у хомяков один живот на двоих!

    // И при lazy.stomach.push(...) и при speedy.stomach.push(), 
    // свойство stomach берётся из прототипа (так как его нет в самом объекте), 
    // затем в него добавляются данные.

    // Обратите внимание, что этого не происходит при простом присваивании this.stomach=:

    let hamster = {
    stomach: [],

    eat(food) {
        // присвоение значения this.stomach вместо вызова this.stomach.push
        this.stomach = [food];
    }
    };

    let speedy = {
    __proto__: hamster
    };

    let lazy = {
    __proto__: hamster
    };

    // Шустрый хомяк нашёл еду
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Живот ленивого хомяка пуст
    alert( lazy.stomach ); // <ничего>

    // Теперь всё работает правильно, потому что this.stomach= не ищет свойство stomach. 
    // Значение записывается непосредственно в объект this.

    // Также мы можем полностью избежать проблемы, если у каждого хомяка будет собственный живот:

    hamster = {
    stomach: [],

    eat(food) {
        this.stomach.push(food);
    }
    };

    speedy = {
    __proto__: hamster,
    stomach: []
    };

    lazy = {
    __proto__: hamster,
    stomach: []
    };

    // Шустрый хомяк нашёл еду
    speedy.eat("apple");
    alert( speedy.stomach ); // apple

    // Живот ленивого хомяка пуст
    alert( lazy.stomach ); // <ничего>

    // Все свойства, описывающие состояние объекта (как свойство stomach в примере выше), 
    // рекомендуется записывать в сам этот объект. Это позволяет избежать подобных проблем.

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