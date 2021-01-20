const path = require('path');
const fs = require('fs');
/**
 * 事件监听对应Storage名称:
 * 
 * 按钮系列:
 * 
 * Page-1 立即创建:readyCreate 
 * Page-1 加载本地文件:loadLocalFile
 * Page-1 加载本地文件结束:chooseFilesDone
 * 
 * Page-2 删除:deleteData
 * Page-2 修改名称:changeNav
 * Page-2 修改名称弹窗确认:changeNavListBtn
 * Page-2 生成数据:createData
 * Page-2 发送数据:sendData
 * Page-2 保存计划:savePlan
 * 
 * Page-3 保存:setJson
 * Page-3 修改名称:changeJsonName
 * Page-3 修改名称弹窗确认:changeJsonNameBtn
 * Page-3 删除:deleteJson
 * 
 * 数据系列:
 * 
 * Page-1 readyCreateData
 * 
 * Page-2 目录:sendNavList
 * Page-2 内容:sendSetData
 * 
 * Page-3 目录:messageNavList
 * Page-3 内容:messageSetData
 * 
 * */

/**
 * @description: 加载本地文件
 * @param {*}
 * @return {*}
 */
function readFile() {
    let timeOut = window.setTimeout(() => {
        let url = JSON.parse(localStorage.getItem('readFileName'));
        const newFile_path1 = path.resolve(__filename, url).replace(/\\/g, "\/");
        fs.readFile(newFile_path1, 'utf8', function(err, data) {
            let configFile = JSON.parse(data);
            console.log(configFile)
            if (!configFile.sendSetData) {
                configFile.sendSetData = []
            }
            if (!configFile.sendNavList) {
                configFile.sendNavList = [{
                    "id": 99999,
                    "name": "+"
                }]
            }
            if (!configFile.messageSetData) {
                configFile.messageSetData = []
            }
            if (!configFile.messageNavList) {
                configFile.messageNavList = [{
                    "id": 99999,
                    "name": "+"
                }]
            }
            if (!configFile.readyCreateData) {
                configFile.readyCreateData = {}
            }
            if (configFile == {}) {
                configFile = {
                    "sendNavList": [{
                        "id": 99999,
                        "name": "+"
                    }],
                    "messageNavList": [{
                        "id": 99999,
                        "name": "+"
                    }],
                    "sendSetData": [],
                    "messageSetData": [],
                    "readyCreateData": {}
                }
            }
            for (let i in configFile) {
                // console.log(i);
                localStorage.setItem(i, JSON.stringify(configFile[i]))
            }
        });
        window.clearTimeout(timeOut);
        alert(`${newFile_path1} file has been loaded`)
    }, 200)
}

/**
 * @description: 保存计划
 * @param {*}
 * @return {*}
 */
function setFile() {
    let timeOut = window.setTimeout(() => {
        if (localStorage.getItem('readFileName')) {
            // let filePath = path.resolve(__filename, `${JSON.parse(localStorage.getItem('readFileName'))}`).replace(/\\/g, "\/");
            fs.unlink(JSON.parse(localStorage.getItem('readFileName')), function(error) {
                if (error) {
                    alert(error);
                    return false;
                }
                let saveData = JSON.parse(JSON.stringify(localStorage));
                for (let i in saveData) {
                    if (typeof saveData[i] == 'string') {
                        saveData[i] = JSON.parse(saveData[i]);
                    }
                }
                fs.writeFile(`${JSON.parse(localStorage.getItem('readFileName'))}`, JSON.stringify(saveData), 'utf8', function(error) {
                    if (error) {
                        alert(error)
                    }
                })
            })
        }
        window.clearTimeout(timeOut);
    }, 200)

}
/**
 * @description: 立即创建JSON文件
 * @param {*} key localStorage名称
 * @param {*} oldVal localStorage旧值
 * @param {*} newVal localStorage新值
 * @return {*}
 */
function createFile(key) {
    let date = new Date().getFullYear() + (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate()) + (new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()) + (new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()) + (new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds());
    let fileName = `../${date}.json`
    let timeOut = window.setTimeout(() => {
        let option = JSON.parse(localStorage.getItem(key));
        let saveOption = {}
        saveOption.sendNavList = [{
            "id": 99999,
            "name": "+"
        }];
        saveOption.messageNavList = [{
            "id": 99999,
            "name": "+"
        }];
        saveOption.sendSetData = [];
        saveOption.messageSetData = [];
        saveOption.readyCreateData = option;
        fs.writeFile(fileName, JSON.stringify(saveOption), 'utf8', function(error) {
            if (error) {
                alert(error);
                return;
            } else {
                console.log('写入成功');
                localStorage.setItem('readFileName', JSON.stringify(`${fileName}`));
                localStorage.setItem('sendNavList', JSON.stringify(saveOption.sendNavList))
                localStorage.setItem('messageNavList', JSON.stringify(saveOption.messageNavList))
                localStorage.setItem('saveReadyCreate', JSON.stringify(0))
            }
            window.clearTimeout(timeOut);
        })
    }, 100)
}
Object.defineProperty(window, 'name', {
    set(val) {
        let timeOut = window.setTimeout(() => {
            console.log(val);
            if (val == "chooseFilesDone") {
                readFile()
            }
            if (val == "readyCreate") {
                createFile("readyCreateData");
            }
            if (val == "savePlan" || val == 'deleteData' || val == "changeNavListBtn" || val == "setJson" || val == "changeJsonNameBtn" || val == "deleteJson") {
                setFile()
            }
            window.clearTimeout(timeOut)
            return ''
        }, 300)
    },
    get() {

    }
});