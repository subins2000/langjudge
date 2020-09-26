let UnicodeTable = require("./unicodeTable");

let langAllContain = function (str, firstMatch = false) {
    let result = [];
    for (let key of Object.keys(UnicodeTable)) {
        for (let item of UnicodeTable[key]) {
            if (item.test(str)) {
                result.push(key);
                if(firstMatch) {
                    return result[0];
                } else {
                    break;
                }
            }
        }
    }
    result=result.concat(LatinCheck(str, result))
    return result;
};

let LatinCheck=function(str, result){
    if(result.indexOf("Latin")>-1||!result.length){
        return LatinJudge(str);
    }
    return [];
}

let LatinJudge=function(str){
    let arr=[];
    if(str.match(/[œôîïëêèéçæâàùûüÿÙÛÜŸÀÂÆÇÉÈÊËÏÎÔŒ]+/)){
        arr.push("French");
    }
    if(str.match(/[äåöÖÅÄ]+/)){
        arr.push("Finnish");
    }
    if(str.match(/[äöüßÄÖÜẞ]+/)){
        arr.push("German");
    }
    if(str.match(/[ąćęłńóśźżĄĆĘŁŃÓŚŹŻ]+/)){
        arr.push("Polish");
    }
    if(str.match(/[áéíñóúüÁÉÍÑÓÚÜ]+/)){
        arr.push("Spanish");
    }
    if(str.match(/[âçğıİîöşüûÂÇĞIİÎÖŞÜÛ]+/)){
        arr.push("Turkish");
    }
    return arr;
};

module.exports = {
    langAllContain: langAllContain,
    
    // Returns the first match in string. Faster checking than langAllContain
    langFirstContain: function (str) {
        return langAllContain(str, true);
    }
};
