function capitalize(str) {
    if(typeof(str) == String){
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1);
    }else{
        return str;
    }
}
module.exports = capitalize;