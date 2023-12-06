export const Regex = {
    mobileNumberRegex: /^[1-9]{1}[0-9]{9}$/,
    emailRegex:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    fullNameRegex:
        /^[a-zA-Z][a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-][a-zA-Z\s]+$/u,
    // pinCodeRegex: /^[1-9][0-9]{5}$/
    pinCodeRegex: /^([0-9]{4}|[0-9]{6})$/,
    linkDinURL:
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm,
    webSiteURL:
        /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/,
    videoURL: /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm,
    isLetters: /^[A-Za-z\s]*$/,
    isInteger: /[^0-9]/,
    onlySpace: "/^s*$/",
    ifscCode: "^[A-Z]{4}0[A-Z0-9]{6}$",
};

export const InvalidNumberKeys = [
    "KeyE",
    "Minus",
    "NumpadSubtract",
    "NumpadAdd",
    "NumpadDecimal",
    "Period"
];

export const InvalidNumberKeysWithoutPercentage = [
    "KeyE",
    "Minus",
    "NumpadSubtract",
    "NumpadAdd"
];