"use strict"

// подсчет слов в строке без сплит
function wordsPerLine(str){
    
    let arrWords = [];
    let k = 0;

    for(let i = 0; i < str.length; i++){
        if (str[i] == ' ')
        {
            arrWords.push(str.slice(k, i));
            k = i + 1;
        }
    }
    arrWords.push(str.slice(k, str.length));
    
    let quantityWords = {};
    arrWords.forEach(word => quantityWords[word] = arrWords.filter(wordInArr => wordInArr == word).length);
    console.log(quantityWords);
    
}

let str = 'Lorem ipsum dolor Lorem lorem sit amet';
wordsPerLine(str);