/*          Глобальный объект        */
{

    // Ко всем свойствам глобального объекта можно обращаться напрямую:

    alert("Привет");
    // это то же самое, что и
    window.alert("Привет");
    // В браузере глобальные функции и переменные, объявленные с помощью 
    // var (не let/const!), становятся свойствами глобального объекта:

    var gVar = 5;

    alert(window.gVar); // 5 (становится свойством глобального объекта)

    // Если бы мы объявили переменную при помощи let, то такого бы не произошло:

    let gLet = 5;

    alert(window.gLet); // undefined (не становится свойством глобального объекта)

    // сделать информацию о текущем пользователе глобальной, 
    // для предоставления доступа всем скриптам
    window.currentUser = {
        name: "John"
    };
    
    // где угодно в коде
    alert(currentUser.name); // John
    
    // или, если у нас есть локальная переменная с именем "currentUser",
    // получим её из window явно (безопасно!)
    alert(window.currentUser.name); // John

}
/*---------------------------------------*/
/*          Использование для полифилов        */
{

    // Например, проверить наличие встроенного объекта Promise 
    // (такая поддержка отсутствует в очень старых браузерах):

    if (!window.Promise) {
    alert("Ваш браузер очень старый!");
    }
    // Если нет (скажем, используется старый браузер), мы можем создать полифил: 
    // добавить функции, которые не поддерживаются окружением, 
    // но существуют в современном стандарте.

    if (!window.Promise) {
    window.Promise = "..." // собственная реализация современной возможности языка
    }

}
/*---------------------------------------*/
/*          Итого        */
{

    // Глобальный объект хранит переменные, которые должны быть доступны в 
    // любом месте программы.

    // Это включает в себя как встроенные объекты, например, Array, 
    // так и характерные для окружения свойства, например, 
    // window.innerHeight – высота окна браузера.

    // Глобальный объект имеет универсальное имя – globalThis.

    // …Но чаще на него ссылаются по-старому, используя имя, 
    // характерное для данного окружения, такое как 
    // window (браузер) и global (Node.js).

    // Следует хранить значения в глобальном объекте, 
    // только если они действительно глобальны для нашего проекта. 
    // И стараться свести их количество к минимуму.

    // В браузерах, если только мы не используем модули, 
    // глобальные функции и переменные, объявленные с помощью var, 
    // становятся свойствами глобального объекта.

    // Для того, чтобы код был проще и в будущем его легче было поддерживать, 
    // следует обращаться к свойствам глобального объекта напрямую, как window.x.

}
/*---------------------------------------*/
/*          Итого        */
{

}
/*---------------------------------------*/