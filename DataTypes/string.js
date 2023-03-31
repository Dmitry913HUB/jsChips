/*          Доступ к символам        */
{
    // Получить символ, который занимает позицию pos, 
    // можно с помощью квадратных скобок: [pos]. 
    // Также можно использовать метод str.at(pos). 
    // Первый символ занимает нулевую позицию:

    let str = `Hello`;

    // получаем первый символ
    alert( str[0] ); // H
    alert( str.at(0) ); // H

    // получаем последний символ
    alert( str[str.length - 1] ); // o
    alert( str.at(-1) );

    //Квадратные скобки всегда возвращают undefined 
    //для отрицательных индексов. Например:

    str = `Hello`;

    alert( str[-2] ); // undefined
    alert( str.at(-2) ); // l

    //Также можно перебрать строку посимвольно, используя for..of:

    for (let char of "Hello") {
        alert(char); // H,e,l,l,o (char — сначала "H", потом "e", потом "l" и т.д.)
    }
    
}
/*---------------------------------------*/
/*          Строки неизменяемы        */
{
    let str = 'Hi';

    str[0] = 'h'; // ошибка
    alert( str[0] ); // не работает

    //Можно создать новую строку и записать её в ту же самую переменную вместо старой.

    str = 'Hi';

    str = 'h' + str[1]; // заменяем строку

    alert( str ); // hi
    
}
/*---------------------------------------*/
/*          Изменение регистра        */
{
    //Методы toLowerCase() и toUpperCase() меняют регистр символов:

    alert( 'Interface'.toUpperCase() ); // INTERFACE
    alert( 'Interface'.toLowerCase() ); // interface

    //Если мы захотим перевести в нижний регистр какой-то конкретный символ:

    alert( 'Interface'[0].toLowerCase() ); // 'i'
    
}
/*---------------------------------------*/
/*          Поиск подстроки        */
{
    // str.indexOf
    // Первый метод — str.indexOf(substr, pos).
    // Он ищет подстроку substr в строке str, начиная с позиции pos, 
    // и возвращает позицию, на которой располагается совпадение, либо -1 при отсутствии совпадений.

    let str = 'Widget with id';

    alert( str.indexOf('Widget') ); // 0, потому что подстрока 'Widget' найдена в начале
    alert( str.indexOf('widget') ); // -1, совпадений нет, поиск чувствителен к регистру

    alert( str.indexOf("id") ); // 1, подстрока "id" найдена на позиции 1 (..idget with id)

    //Например, первое вхождение "id" — на позиции 1. 
    //Для того, чтобы найти следующее, начнём поиск с позиции 2:

    str = 'Widget with id';

    alert( str.indexOf('id', 2) ) // 12

    //алгоритм поиска всех подстрок в строке
    str = "Ослик Иа-Иа посмотрел на виадук";
    let target = "Иа";

    let pos = -1;
    while ((pos = str.indexOf(target, pos + 1)) != -1) {
        alert( pos );
    }

    str.lastIndexOf(substr, position)
    // Также есть похожий метод str.lastIndexOf(substr, position), 
    // который ищет с конца строки к её началу.

    // Он используется тогда, когда нужно получить самое последнее вхождение: 
    // перед концом строки или начинающееся до (включительно) определённой позиции.

    // Мы ищем подстроку "Widget", и она здесь есть, прямо на позиции 0. 
    // Но alert не показывается, т. к. str.indexOf("Widget") возвращает 0, 
    // и if решает, что тест не пройден.
    // Поэтому надо делать проверку на -1:

    str = "Widget with id";

    if (str.indexOf("Widget") != -1) {
        alert("Совпадение есть"); // теперь работает
    }
    
    // Трюк с побитовым НЕ
    // Существует старый трюк с использованием побитового оператора НЕ — ~.
    // Он преобразует число в 32-разрядное целое со знаком (signed 32-bit integer).
    // Дробная часть, в случае, если она присутствует, отбрасывается. Затем все биты числа инвертируются.
    // На практике это означает простую вещь: для 32-разрядных целых чисел значение ~n равно -(n+1).
    // В частности:

    alert( ~2 ); // -3, то же, что -(2+1)
    alert( ~1 ); // -2, то же, что -(1+1)
    alert( ~0 ); // -1, то же, что -(0+1)
    alert( ~-1 ); // 0, то же, что -(-1+1)

    // Это иногда применяют, чтобы сделать проверку indexOf компактнее:

    str = "Widget";

    if (~str.indexOf("Widget")) {
        alert( 'Совпадение есть' ); // работает
    }

    // includes, startsWith, endsWith
    // Более современный метод str.includes(substr, pos) возвращает true, 
    // если в строке str есть подстрока substr, либо false, если нет.
    // Это — правильный выбор, если нам необходимо проверить, есть ли совпадение, но позиция не нужна:

    alert( "Widget with id".includes("Widget") ); // true

    alert( "Hello".includes("Bye") ); // false

    //Необязательный второй аргумент str.includes позволяет начать поиск с определённой позиции:

    alert( "Midget".includes("id") ); // true
    alert( "Midget".includes("id", 3) ); // false, поиск начат с пози

    //Методы str.startsWith и str.endsWith проверяют, соответственно, 
    //начинается ли и заканчивается ли строка определённой строкой:

    alert( "Widget".startsWith("Wid") ); // true, "Wid" — начало "Widget"
    alert( "Widget".endsWith("get") ); // true, "get" — окончание "Widget"
}
/*---------------------------------------*/
/*          Получение подстроки        */
{
    // В JavaScript есть 3 метода для получения подстроки: substring, substr и slice.

    // str.slice(start [, end])
    // Возвращает часть строки от start до (не включая) end.

    // Например:

    let str = "stringify";
    // 'strin', символы от 0 до 5 (не включая 5)
    alert( str.slice(0, 5) );
    // 's', от 0 до 1, не включая 1, т. е. только один символ на позиции 0
    alert( str.slice(0, 1) );

    //Если аргумент end отсутствует, slice возвращает символы до конца строки:

    str = "stringify";
    alert( str.slice(2) ); // ringify, с позиции 2 и до конца

    //Также для start/end можно задавать отрицательные значения. 
    //Это означает, что позиция определена как заданное количество символов с конца строки:

    str = "stringify";

    // начинаем с позиции 4 справа, а заканчиваем на позиции 1 справа
    alert( str.slice(-4, -1) ); // gif

    // str.substring(start [, end])
    // Возвращает часть строки между start и end (не включая) end.

    // Это — почти то же, что и slice, но можно задавать start больше end.
    // Если start больше end, то метод substring сработает так,
    // как если бы аргументы были поменяны местами.

    str = "stringify";

    // для substring эти два примера — одинаковы
    alert( str.substring(2, 6) ); // "ring"
    alert( str.substring(6, 2) ); // "ring"

    // …но не для slice:
    alert( str.slice(2, 6) ); // "ring" (то же самое)
    alert( str.slice(6, 2) ); // "" (пустая строка)

    // Отрицательные значения substring, в отличие от slice, 
    // не поддерживает, они интерпретируются как 0.

    // str.substr(start [, length])
    // Возвращает часть строки от start длины length.
    // В противоположность предыдущим методам, 
    // этот позволяет указать длину вместо конечной позиции:

    str = "stringify";
    // ring, получаем 4 символа, начиная с позиции 2
    alert( str.substr(2, 4) );

    //Значение первого аргумента может быть отрицательным, тогда позиция определяется с конца:

    str = "stringify";
    // gi, получаем 2 символа, начиная с позиции 4 с конца строки
    alert( str.substr(-4, 2) );

    slice(start, end) //	    от start до end (не включая end)	можно передавать отрицательные значения
    substring(start, end) //	между start и end	                отрицательные значения равнозначны 0
    substr(start, length) //	length символов, начиная от start	значение start может быть отрицательным

}
/*---------------------------------------*/
/*          Сравнение строк        */
{
    //Строчные буквы больше заглавных:

    alert( 'a' > 'Z' ); // true
    // Буквы, имеющие диакритические знаки, идут «не по порядку»:

    alert( 'Österreich' > 'Zealand' ); // true
    // Это может привести к своеобразным результатам при сортировке названий стран: 
    // нормально было бы ожидать, что Zealand будет после Österreich в списке.

    // Строки кодируются в UTF-16. Таким образом, 
    // у любого символа есть соответствующий код. 
    // Есть специальные методы, позволяющие получить символ по его коду и наоборот.

    str.codePointAt(pos)
    //Возвращает код для символа, находящегося на позиции pos:

    // одна и та же буква в нижнем и верхнем регистре
    // будет иметь разные коды
    alert( "z".codePointAt(0) ); // 122
    alert( "Z".codePointAt(0) ); // 90
    
    String.fromCodePoint(code)
    //Создаёт символ по его коду code

    alert( String.fromCodePoint(90) ); // Z

    // Давайте сделаем строку, содержащую символы с кодами от 65 до 220
    // — это латиница и ещё некоторые распространённые символы:

    let str = '';

    for (let i = 65; i <= 220; i++) {
    str += String.fromCodePoint(i);
    }
    alert( str );
    // ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
    // ¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ

    // Как видите, сначала идут заглавные буквы, затем несколько спецсимволов, 
    // затем строчные и Ö ближе к концу вывода.

    // Символы сравниваются по их кодам. Больший код — больший символ. Код a (97) больше кода Z (90).

    // Все строчные буквы идут после заглавных, так как их коды больше.
    // Некоторые буквы, такие как Ö, вообще находятся вне основного алфавита. 
    // У этой буквы код больше, чем у любой буквы от a до z.

    // Правильное сравнение

    // «Правильный» алгоритм сравнения строк сложнее, чем может показаться, 
    // так как разные языки используют разные алфавиты.
    // Поэтому браузеру нужно знать, какой язык использовать для сравнения.

    // К счастью, все современные браузеры (для IE10− нужна дополнительная библиотека Intl.JS) 
    // поддерживают стандарт ECMA 402, обеспечивающий правильное 
    // сравнение строк на разных языках с учётом их правил.

    // Для этого есть соответствующий метод.
    // Вызов str.localeCompare(str2) возвращает число, которое показывает, 

    // какая строка больше в соответствии с правилами языка:
    // Отрицательное число, если str меньше str2.
    // Положительное число, если str больше str2.
    // 0, если строки равны.

    // Например:
    alert( 'Österreich'.localeCompare('Zealand') ); // -1

    // У этого метода есть два дополнительных аргумента, которые указаны в документации. 
    // Первый позволяет указать язык (по умолчанию берётся из окружения) — от него зависит порядок букв. 
    // Второй — определить дополнительные правила, такие как чувствительность к регистру, 
    // а также следует ли учитывать различия между "a" и "á".
    
}
/*---------------------------------------*/
/*          Итого        */
{

    // Есть три типа кавычек. Строки, использующие обратные кавычки, 
    // могут занимать более одной строки в коде и включать выражения ${…}.

    // Строки в JavaScript кодируются в UTF-16.

    // Есть специальные символы, такие как разрыв строки \n.

    // Для получения символа используйте [] или метод at.

    // Для получения подстроки используйте slice или substring.

    // Для того, чтобы перевести строку в нижний или верхний регистр, используйте toLowerCase/toUpperCase.
    
    // Для поиска подстроки используйте indexOf или includes/startsWith/endsWith, 
    // когда надо только проверить, есть ли вхождение.

    // Чтобы сравнить строки с учётом правил языка, используйте localeCompare.

    // Строки также имеют ещё кое-какие полезные методы:
    // str.trim() — убирает пробелы в начале и конце строки.
    // str.repeat(n) — повторяет строку n раз.
    // …и другие, которые вы можете найти в справочнике.
    
}
/*---------------------------------------*/
/*          Задачи        */
{
    //zadacha 1
    function ucFirst(str){
        if (!str) return str;

        return str[0].toUpperCase() + str.slice(1);
    }

    alert( ucFirst("вася") ); // Вася

    //zadacha 2
    function checkSpam(str){
        str = str.toLowerCase();

        return (str.includes('xxx') || str.includes('viagra'));
    }

    alert( checkSpam('buy ViAgRA now') );
    alert( checkSpam('free xxxxx') );
    alert( checkSpam("innocent rabbit") );

    //zadacha 3

    function truncate(str, maxlength){
        if(str.length < maxlength) return str;
        
        return str = str.slice(0,maxlength - 1) + "…";
    }

    //zadscha 4

    function extractCurrencyValue(str){
        return Number(str.slice(1));
    }
}
/*---------------------------------------*/
/*          Итого        */
{
    
}
/*---------------------------------------*/
