const setButtonName = (dataName) => {
    if (localStorage.getItem(dataName)) {
        let sum = Number(localStorage.getItem(dataName))
        localStorage.setItem(dataName, sum += 1)
    } else {
        localStorage.setItem(dataName, 1)
    }
    window.name = dataName;
}
const setFormData = (name, value) => {
    if (localStorage.getItem(name)) {
        localStorage.removeItem(name)
    }
    localStorage.setItem(name, JSON.stringify(value));
}
const unique = (arr) => {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].nav.timestamp == arr[j].nav.timestamp) { //第一个等同于第二个，splice方法删除第二个
                arr.splice(i, 1);
                j--;
            }
        }
    }
    return arr;
};
export default {
    setButtonName,
    setFormData,
    unique
}