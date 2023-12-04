export const getLSItem = (fieldName) => {
    return localStorage.getItem(fieldName);
}

export const setLSItem = (fieldName, value) => {
    return localStorage.setItem(fieldName, value);
}

export const removeLSItem = (fieldName) => {
    return localStorage.removeItem(fieldName);
}