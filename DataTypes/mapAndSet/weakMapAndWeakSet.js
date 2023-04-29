/*          WeakMap        */
{

    // Первое его отличие от Map в том, что ключи в WeakMap должны быть объектами, 
    // а не примитивными значениями:

    let weakMap = new WeakMap();

    let obj = {};

    weakMap.set(obj, "ok"); // работает (объект в качестве ключа)

    // нельзя использовать строку в качестве ключа
    weakMap.set("test", "Whoops"); // Ошибка, потому что "test" не объект
    // Теперь, если мы используем объект в качестве ключа и если больше нет ссылок на этот объект, 
    // то он будет удалён из памяти (и из объекта WeakMap) автоматически.

    let john = { name: "John" };

    weakMap = new WeakMap();
    weakMap.set(john, "...");

    john = null; // перезаписываем ссылку на объект

    // объект john удалён из памяти!
    // Сравните это поведение с поведением обычного Map, пример которого был приведён ранее. 
    // Теперь john существует только как ключ в WeakMap и может быть удалён оттуда автоматически.

    // WeakMap не поддерживает перебор и методы keys(), values(), entries(), 
    // так что нет способа взять все ключи или значения из неё.

    // В WeakMap присутствуют только следующие методы:

    // weakMap.get(key)
    // weakMap.set(key, value)
    // weakMap.delete(key)
    // weakMap.has(key)

}
/*---------------------------------------*/
/*          дополнительные данные        */
{

    // Вот пример реализации счётчика посещений с использованием Map:

    // 📁 visitsCount.js
    let visitsCountMap = new Map(); // map: пользователь => число визитов

    // увеличиваем счётчик
    function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
    }
    // А вот другая часть кода, возможно, в другом файле, которая использует countUser:

    // 📁 main.js
    let john = { name: "John" };

    countUser(john); //ведём подсчёт посещений

    // пользователь покинул нас
    john = null;
    // Теперь объект john должен быть удалён сборщиком мусора, но он продолжает оставаться в памяти, 
    // так как является ключом в visitsCountMap.

    // Нам нужно очищать visitsCountMap при удалении объекта пользователя, 
    // иначе коллекция будет бесконечно расти. 
    // Подобная очистка может быть неудобна в реализации при сложной архитектуре приложения.

    // Проблемы можно избежать, если использовать WeakMap:

    // 📁 visitsCount.js
    visitsCountMap = new WeakMap(); // map: пользователь => число визитов

    // увеличиваем счётчик
    function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
    }

}
/*---------------------------------------*/
/*          Применение для кеширования        */
{

    // Другая частая сфера применения – это кеширование, 
    // когда результат вызова функции должен где-то запоминаться («кешироваться») для того, 
    // чтобы дальнейшие её вызовы на том же объекте могли просто брать уже готовый результат, 
    // повторно используя его.

    // Для хранения результатов мы можем использовать Map, вот так:

    // 📁 cache.js
    let cache = new Map();

    // вычисляем и запоминаем результат
    function process(obj) {
    if (!cache.has(obj)) {
        let result = /* тут какие-то вычисления результата для объекта */ obj;

        cache.set(obj, result);
    }

    return cache.get(obj);
    }

    // Теперь используем process() в другом файле:

    // 📁 main.js
    let obj = {/* допустим, у нас есть какой-то объект */};

    let result1 = process(obj); // вычислен результат

    // ...позже, из другого места в коде...
    let result2 = process(obj); // ранее вычисленный результат взят из кеша

    // ...позже, когда объект больше не нужен:
    obj = null;

    alert(cache.size); // 1 (Упс! Объект всё ещё в кеше, занимает память!)
    // Многократные вызовы process(obj) с тем же самым объектом в качестве аргумента ведут к тому, 
    // что результат вычисляется только в первый раз, а затем последующие вызовы берут его из кеша. 
    // Недостатком является то, что необходимо вручную очищать cache от ставших ненужными объектов.

    // Но если мы будем использовать WeakMap вместо Map, то эта проблема исчезнет: 
    // закешированные результаты будут автоматически удалены из памяти сборщиком мусора.

    // 📁 cache.js
    cache = new WeakMap();

    // вычисляем и запоминаем результат
    function process(obj) {
    if (!cache.has(obj)) {
        let result = /* вычисляем результат для объекта */ obj;

        cache.set(obj, result);
    }

    return cache.get(obj);
    }

    // 📁 main.js
    obj = {/* какой-то объект */};

    result1 = process(obj);
    result2 = process(obj);

    // ...позже, когда объект больше не нужен:
    obj = null;

    // Нет возможности получить cache.size, так как это WeakMap,
    // но он равен 0 или скоро будет равен 0
    // Когда сборщик мусора удаляет obj, связанные с ним данные из кеша тоже удаляются

}
/*---------------------------------------*/
/*          WeakSet        */
{

    // Коллекция WeakSet ведёт себя похоже:

    // Она аналогична Set, но мы можем добавлять в WeakSet только объекты (не примитивные значения).
    // Объект присутствует в множестве только до тех пор, пока доступен где-то ещё.
    // Как и Set, она поддерживает add, has и delete, но не size, keys() и не является перебираемой.
    // Будучи «слабой» версией оригинальной структуры данных, 
    // она тоже служит в качестве дополнительного хранилища. 
    // Но не для произвольных данных, а скорее для значений типа «да/нет». 
    // Присутствие во множестве WeakSet может что-то сказать нам об объекте.

    // Например, мы можем добавлять пользователей в WeakSet для учёта тех, кто посещал наш сайт:

    let visitedSet = new WeakSet();

    let john = { name: "John" };
    let pete = { name: "Pete" };
    let mary = { name: "Mary" };

    visitedSet.add(john); // John заходил к нам
    visitedSet.add(pete); // потом Pete
    visitedSet.add(john); // John снова

    // visitedSet сейчас содержит двух пользователей

    // проверим, заходил ли John?
    alert(visitedSet.has(john)); // true

    // проверим, заходила ли Mary?
    alert(visitedSet.has(mary)); // false

    john = null;

    // структура данных visitedSet будет очищена автоматически (объект john будет удалён из visitedSet)

}
/*---------------------------------------*/
/*          Итого        */
{

    // WeakMap – это Map-подобная коллекция, позволяющая использовать в качестве ключей только объекты, 
    // и автоматически удаляющая их вместе с соответствующими значениями, 
    // как только они становятся недостижимыми иными путями.

    // WeakSet – это Set-подобная коллекция, которая хранит только объекты и удаляет их, 
    // как только они становятся недостижимыми иными путями.

    // Обе этих структуры данных не поддерживают методы и свойства, 
    // работающие со всем содержимым сразу или возвращающие информацию о размере коллекции. 
    // Возможны только операции на отдельном элементе коллекции.

    // WeakMap и WeakSet используются как вспомогательные структуры данных в дополнение
    // к «основному» месту хранения объекта. Если объект удаляется из основного хранилища и 
    // нигде не используется, кроме как в качестве ключа в WeakMap или в WeakSet, 
    // то он будет удалён автоматически.

}
/*---------------------------------------*/
/*          Задачи        */
{

    // Хранение отметок "не прочитано"

    let messages = [
        {text: "Hello", from: "John"},
        {text: "How goes?", from: "John"},
        {text: "See you soon", from: "Alice"}
    ];
    
    let readMessages = new WeakSet();
    
    // Два сообщения были прочитаны
    readMessages.add(messages[0]);
    readMessages.add(messages[1]);
    // readMessages содержит 2 элемента
    
    // ...давайте снова прочитаем первое сообщение!
    readMessages.add(messages[0]);
    // readMessages до сих пор содержит 2 элемента
    
    // Вопрос: было ли сообщение message[0] прочитано?
    alert("Read message 0: " + readMessages.has(messages[0])); // true
    
    messages.shift();
    // теперь readMessages содержит 1 элемент (хотя технически память может быть очищена позже)

    // Хранение времени прочтения

    messages = [
        { text: "Hello", from: "John" },
        { text: "How goes?", from: "John" },
        { text: "See you soon", from: "Alice" }
    ];
    
    let readMap = new WeakMap();

    readMap.set(messages[0], new Date(2017, 1, 1));

}
/*---------------------------------------*/
/*          Итого        */
{

}
/*---------------------------------------*/