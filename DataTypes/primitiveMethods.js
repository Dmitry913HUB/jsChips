/*          Примитив как объект        */
{
    // Конструкторы String/Number/Boolean предназначены только для внутреннего пользования
    // Некоторые языки, такие как Java, позволяют явное создание «объектов-обёрток» для примитивов при помощи такого синтаксиса как new Number(1) или new Boolean(false).
    // В JavaScript, это тоже возможно по историческим причинам, но очень не рекомендуется. В некоторых местах последствия могут быть катастрофическими.

    alert( typeof 0 ); // "число"

    alert( typeof new Number(0) ); // "object"!
    //Объекты в if всегда дают true, так что в нижеприведённом примере будет показан alert:

    let zero = new Number(0);

    if (zero) {
        // zero возвращает "true", так как является объектом
        alert( "zero имеет «истинное» значение?!?" );
    }

    // С другой стороны, использование функций String/Number/Boolean без оператора new – вполне разумно и полезно. 
    //Они превращают значение в соответствующий примитивный тип: в строку, в число, в булевый тип.
    // К примеру, следующее вполне допустимо:

    let num = Number("123"); // превращает строку в число

    // null/undefined не имеют методов
    // Особенные примитивы null и undefined являются исключениями. У них нет соответствующих «объектов-обёрток», и они не имеют никаких методов. В некотором смысле, они «самые примитивные».

    // Попытка доступа к свойствам такого значения возвратит ошибку:

    alert(null.test); // ошибка

}
/*---------------------------------------*/
/*          Итого        */
{
    //Все примитивы, кроме null и undefined, предоставляют множество полезных методов.

    //Формально эти методы работают с помощью временных объектов, но движки JavaScript внутренне очень хорошо оптимизируют этот процесс, 
    //так что их вызов не требует много ресурсов.

}
/*---------------------------------------*/
/*          Задачи        */
{
    // Попробуйте запустить код:

    let str = "Привет";

    str.test = 5; // (*)

    alert(str.test);
    
    // В зависимости от того, используете ли вы строгий режим (use strict) или нет, результат может быть:

    // undefined (без strict)
    // Ошибка (strict mode)
    // Почему? Давайте посмотрим что происходит в строке кода, отмеченной (*):

    // В момент обращения к свойству str создаётся «объект-обёртка».
    // В строгом режиме, попытка изменения этого объекта выдаёт ошибку.
    // Без строгого режима, операция продолжается, объект получает свойство test, но после этого он удаляется, так что на последней линии str больше не имеет свойства test.
    // Данный пример наглядно показывает, что примитивы не являются объектами.

    // Они не могут хранить дополнительные данные.

}
/*---------------------------------------*/
