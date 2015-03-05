function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function plural_str(a, str1, str2, str3) {
    a = Math.abs(a);
    a %= 100;
    if (a >= 5 && a <= 20) {
        return str3;
    }
    a %= 10;
    if (a == 1) {
        return str1;
    }
    if (a >= 2 && a <= 4) {
        return str2;
    }
    return str3;
}