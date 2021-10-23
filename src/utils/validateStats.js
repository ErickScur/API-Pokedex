function validateStats(hp, attack, defense, special_attack, special_defense, speed, generation){
    let result = {
        isValid:true,
        errors:[

        ]
    }
    if( hp<1 || hp>255){
        result.isValid = false;
        result.errors.push(" Hp");
    }
    if(attack<5 || attack>190){
        result.isValid = false;
        result.errors.push(" Attack");
    }
    if(defense<5 || defense>230){
        result.isValid = false;
        result.errors.push(" Defense");
    }
    if(special_attack<10 || special_attack>194){
        result.isValid = false;
        result.errors.push(" Special Attack");
    }
    if(special_defense<20 || special_defense>230){
        result.isValid = false;
        result.errors.push(" Special Defense");
    }
    if(speed<5 || speed>180){
        result.isValid = false;
        result.errors.push(" Speed");
    }
    if(generation<1 || generation>6){
        result.isValid = false;
        result.errors.push(" Generation");
    }
    return result;
}

module.exports = validateStats;