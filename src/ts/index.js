function getStr(age, stature) {
    if (age === void 0) { age = 18; }
    if (stature === void 0) { stature = '大胸'; }
    return "\u627E\u5230\u4E86" + age + "\u5C81\u7684" + stature + "\u7684\u5C0F\u59D0\u59D0";
}
var result = getStr(18);
console.log(result);
