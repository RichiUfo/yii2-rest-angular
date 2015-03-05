function getRandomInt(intMin, intMax) {
    return Math.floor(Math.random() * (intMax - intMin + 1)) + intMin;
}

function plural_str(intCount, str1, str2, str5) {
    intCount = Math.abs(intCount);
    intCount %= 100;
    if (intCount >= 5 && intCount <= 20) {
        return str5;
    }
    intCount %= 10;
    if (intCount == 1) {
        return str1;
    }
    if (intCount >= 2 && intCount <= 4) {
        return str2;
    }
    return str5;
}