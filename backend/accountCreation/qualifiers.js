module.export = {
    alphanumeric: alphanumeric,
    brandName: brandName,
    offensiveWord: offensiveWord,
    offensiveSlang: offensiveSlang,
};

const alphanumeric = /^[a-zA-Z0-9_]*$/;
const brandName = /([Pp][Oo][Ss][Tt][Mm][Aa][Ss]{2}[Ii][Vv])/;
const offensiveWord = /([Nn][Ii][Gg]{2}[Ee][Rr])/;
const offensiveSlang = /([Nn][Ii][Gg]{2}[Aa])/;
