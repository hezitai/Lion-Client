import data from "../data/index.js";
import setToListen from "../utils/setAndListen.js"
export default {
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
        console.log(key, keyPath);
    },
    preview(event) {
        this.$addStorageEvent("readFileName", JSON.stringify(document.getElementById("getfilepath").files[0].path));
        this.$addStorageEvent("chooseFilesDone", JSON.stringify(1));
        window.name = "chooseFilesDone";
    },
    /**
     * @description: 计划  加载本地文件 按钮
     * @param {*}
     * @return {*}
     */
    loadLocalFile() {
        setToListen.setButtonName('loadLocalFile');
        document.getElementById('getfilepath').click();
        this.isloadfileorcreate = true;
    },
    /**
     * @description: 计划 立即创建/修改 按钮
     * @param {*}
     * @return {*}
     */
    readyCreate(type) {
        if (this.planForm.name == '') {
            this.$message.error('请填写计划名称');
            return;
        }
        if (this.planForm.url == '') {
            this.$message.error('请填写服务端URL');
            return;
        }
        if (this.planForm.type == '') {
            this.$message.error('请填写消息类型');
            return;
        }
        if (this.planForm.description == '') {
            this.$message.error('请填写计划说明');
            return;
        }
        setToListen.setFormData('readyCreateData', this.planForm);
        if (type == 0) {
            setToListen.setButtonName('readyCreate');
            this.$message({
                message: '创建成功',
                type: 'success'
            });
        } else if (type == 1) {
            setToListen.setButtonName('saveReadyCreate');
            this.$message({
                message: '修改成功',
                type: 'success'
            });
        }
        this.isloadfileorcreate = true
    },
    /**
     * @description: 发送配置 目录 点击事件 添加、选择
     * @param {*} e
     * @return {*}
     */
    handleSendNav(e) {
        console.log(e)
        if (e == 99999) {
            this.createNavListDialog = true;
        } else {
            for (let i in this.sendNavList) {
                if (this.sendNavList[i].id == e) {
                    this.presentNav = this.sendNavList[i].id;
                    if (localStorage.getItem('sendSetData')) {
                        this.sendOptionForm = JSON.parse(localStorage.getItem('sendSetData'));
                        for (let j in this.sendOptionForm) {
                            if (this.sendOptionForm[j].nav.id == e) {
                                this.sendTableData = {
                                    type1: this.sendOptionForm[j].data.type1,
                                    type2: this.sendOptionForm[j].data.type2,
                                    type3: this.sendOptionForm[j].data.type3,
                                    type4: this.sendOptionForm[j].data.type4,
                                    type5: this.sendOptionForm[j].data.type5,
                                    type6: this.sendOptionForm[j].data.type6,
                                    type7: this.sendOptionForm[j].data.type7,
                                }
                                return
                            } else {
                                this.sendTableData = {
                                    type1: '',
                                    type2: '',
                                    type3: '',
                                    type4: '',
                                    type5: '',
                                    type6: '',
                                    type7: '',
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    /**
     * @description: 发送配置 添加目录 弹窗
     * @param {*}
     * @return {*}
     */
    createNavListDialogConfig() {
        if (!this.navListName) {
            this.$message.error('请输入配置名称')
            return
        }
        this.sendNavList.pop();
        console.log(this.sendNavList.length);
        let arr = [];
        for (let i in this.sendNavList) {
            if (this.sendNavList[i].id != 99999) {
                arr.push(this.sendNavList[i].id)
            }
        }
        this.sendNavList.push({
            id: new Date().getTime(),
            name: this.navListName,
            timestamp: new Date().getTime()
        });
        console.log(this.sendNavList.length)
        this.sendNavList.push({
            id: 99999,
            name: '+'
        });
        this.createNavListDialog = false;
        this.$message({
            message: '添加成功',
            type: 'success'
        });
        this.navListName = '';
        console.log(this.sendNavList);
        // localStorage.setItem('sendNavList', JSON.stringify(this.sendNavList));
        this.$addStorageEvent("sendNavList", JSON.stringify(this.sendNavList));
    },
    /**
     * @description: 发送配置 修改名称弹窗 关闭事件
     * @param {*}
     * @return {*}
     */
    changeNavListDialoghandleClose() {
        this.changenavListName = '';
        this.changeNavListDialog = false;
    },
    /**
     * @description:发送配置 修改名称弹窗 确认事件 
     * @param {*}
     * @return {*}
     */
    changeNavListDialogConfig() {
        if (this.changenavListName == '') {
            this.$message({
                message: '请填写配置名称',
                type: 'error'
            });
            return
        }
        for (let i in this.sendNavList) {
            if (this.presentNav == this.sendNavList[i].id) {
                this.sendNavList[i].name = this.changenavListName;
            }
        };
        for (let i in this.sendOptionForm) {
            if (this.presentNav == this.sendOptionForm[i].nav.id) {
                this.sendOptionForm[i].nav.name = this.changenavListName;
            }
        };
        this.changeNavListDialog = false;
        this.$message({
            message: '修改成功',
            type: 'success'
        });
        this.changenavListName = '';
        setToListen.setButtonName('changeNavListBtn');
        this.$addStorageEvent("sendNavList", JSON.stringify(this.sendNavList));
        this.$addStorageEvent("sendSetData", JSON.stringify(this.sendOptionForm));
    },
    /**
     * @description:发送配置 添加目录弹窗 关闭事件 
     * @param {*}
     * @return {*}
     */
    createNavListDialoghandleClose() {
        this.navListName = '';
        this.createNavListDialog = false;
    },
    /**
     * @description: 发送配置 修改 按钮
     * @param {*}
     * @return {*}
     */
    changeNav() {
        setToListen.setButtonName('changeNav');
        this.changeNavListDialog = true;
    },
    /**
     * @description: 发送配置 删除 按钮
     * @param {*}
     * @return {*}
     */
    deleteData() {
        let _this = this
        this.$confirm('是否确认删除此条配置?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if (!_this.presentNav) {
                return
            }
            if (_this.sendNavList.length == 1) {
                if (_this.sendNavList[i].id == 99999) {
                    return
                }
            } else {
                for (let i in _this.sendOptionForm) {
                    if (_this.sendOptionForm[i].nav.id == this.presentNav) {
                        this.sendOptionForm.splice(i, 1)
                        this.$addStorageEvent("sendSetData", JSON.stringify(this.sendOptionForm));
                    }
                }
                for (let j in this.sendNavList) {
                    if (this.sendNavList[j].id == this.presentNav) {
                        this.sendNavList.splice(j, 1)
                        this.$addStorageEvent("sendNavList", JSON.stringify(this.sendNavList));
                    }
                }
                this.presentNav = '';

            }
            this.$addStorageEvent("sendSetData", JSON.stringify(this.sendOptionForm));
            this.$addStorageEvent("sendNavList", JSON.stringify(this.sendNavList));
            this.$message({
                message: '已删除',
                type: 'success'
            });
            setToListen.setButtonName('deleteData');
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });

    },
    /**
     * @description: 发送配置 生成数据 按钮
     * @param {*}
     * @return {*}
     */
    createData() {
        setToListen.setButtonName('createData');
        console.log(this.sendTableData)
    },
    /**
     * @description:发送配置 发送数据 按钮 
     * @param {*}
     * @return {*}
     */
    sendData() {
        setToListen.setButtonName('sendData')
    },
    /**
     * @description:发送配置 保存计划 按钮 
     * @param {*}
     * @return {*}
     */
    savePlan() {
        setToListen.setButtonName('savePlan');
        if (this.presentNav != 99999) {
            console.log(this.presentNav)
            for (let i in this.sendNavList) {

                if (this.presentNav == this.sendNavList[i].id) {
                    let aa = {
                        nav: this.sendNavList[i],
                        data: this.sendTableData
                    };
                    aa.data.timestamp = new Date().getTime();
                    this.sendOptionForm.push(aa);
                }
            }
            this.$addStorageEvent("sendSetData", JSON.stringify(setToListen.unique(this.sendOptionForm)));
            this.$message({
                message: '保存成功',
                type: 'success'
            })
        }
    },

    /**
     * @description: 消息配置 目录 点击事件
     * @param {*} 
     * @return {*}
     */
    handleMessageNav(e) {
        if (e == 99999) {
            this.createMsgNavListDialog = true
        } else {
            this.presentMsgNav = e
            let thisData = '';
            if (localStorage.getItem('messageSetData')) {
                thisData = JSON.parse(localStorage.getItem('messageSetData'));
                for (let i in thisData) {
                    if (e == thisData[i].nav.id) {
                        this.defaultJson = thisData[i].data
                    }
                }
            }
        }
    },
    /**
     * @description: 消息配置 目录添加 弹窗确认事件
     * @param {*}
     * @return {*}
     */
    createMsgNavListDialogConfig() {
        if (!this.navMsgListName) {
            this.$message.error('请输入配置名称')
            return
        }
        this.messageNavList.pop();
        this.messageNavList.push({
            id: new Date().getTime(),
            name: this.navMsgListName,
            timestamp: new Date().getTime()
        });
        this.messageNavList.push({
            id: 99999,
            name: '+'
        });
        this.createMsgNavListDialog = false;
        this.$message({
            message: '添加成功',
            type: 'success'
        });
        this.navMsgListName = '';
        // localStorage.setItem('messageNavList', JSON.stringify(this.messageNavList));
        this.$addStorageEvent("messageNavList", JSON.stringify(this.messageNavList));
    },
    /**
     * @description: 消息配置 目录添加 弹窗关闭事件
     * @param {*}
     * @return {*}
     */
    createMsgNavListDialoghandleClose() {
        this.navMsgListName = '';
        this.createMsgNavListDialog = false;
    },
    /**
     * @description: 消息配置 目录修改弹窗 关闭事件
     * @param {*}
     * @return {*}
     */
    changeMessageNavListDialoghandleClose() {
        this.changeMessageNavListName = '';
        this.changeMessageNavListDialog = false;
    },
    /**
     * @description: 消息配置 目录修改弹窗 确认事件
     * @param {*}
     * @return {*}
     */
    changeMessageNavListDialogConfig() {

        this.messageNavList = JSON.parse(localStorage.getItem('messageNavList'));
        this.messageOptionForm = JSON.parse(localStorage.getItem('messageSetData'));
        for (let i = 0; i < this.messageNavList.length; i++) {
            if (this.presentMsgNav == this.messageNavList[i].id) {
                this.messageNavList[i].name = this.changeMessageNavListName
            }
        }
        for (let j = 0; j < this.messageOptionForm.length; j++) {
            if (this.presentMsgNav == this.messageOptionForm[j].nav.id) {
                this.messageOptionForm[j].nav.name = this.changeMessageNavListName
            }
        };
        this.$addStorageEvent("messageNavList", JSON.stringify(this.messageNavList));
        this.$addStorageEvent("messageSetData", JSON.stringify(this.messageOptionForm));
        this.$message({
            type: 'success',
            message: '修改成功'
        });
        this.changeMessageNavListName = '';
        setToListen.setButtonName('changeJsonNameBtn');
        this.changeMessageNavListDialog = false;
    },
    /**
     * @description:消息配置 修改目录名称 按钮 
     * @param {*}
     * @return {*}
     */
    changeJsonName() {
        this.changeMessageNavListDialog = true;
        setToListen.setButtonName('changeJsonName');
    },
    /**
     * @description:消息配置 删除 按钮 
     * @param {*}
     * @return {*}
     */
    deleteMessageNavList() {
        this.$confirm('是否确认删除此条配置?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if (!this.presentMsgNav) {
                return
            }
            if (this.messageNavList.length == 1) {
                if (this.messageNavList[i].id == 99999) {
                    return
                }
            } else {
                this.messageNavList = JSON.parse(localStorage.getItem('messageNavList'));
                this.messageOptionForm = JSON.parse(localStorage.getItem('messageSetData'));
                for (let i = 0; i < this.messageNavList.length; i++) {
                    if (this.presentMsgNav == this.messageNavList[i].id) {
                        this.messageNavList.splice(i, 1);
                    }
                }
                for (let j = 0; j < this.messageOptionForm.length; j++) {
                    if (this.presentMsgNav == this.messageOptionForm[j].nav.id) {
                        this.messageOptionForm.splice(j, 1);
                    }
                }
                this.$addStorageEvent("messageNavList", JSON.stringify(this.messageNavList));
                this.$addStorageEvent("messageSetData", JSON.stringify(this.messageOptionForm));
                this.defaultJson = {}
                setToListen.setButtonName('deleteJson');
                this.$message({
                    type: 'success',
                    message: '删除成功'
                })
            }
        }).catch(() => {
            this.$message({
                type: 'info',
                message: '已取消删除'
            });
        });

    },
    /**
     * @description:JSON空间 change事件 
     * @param {*} value
     * @return {*}
     */
    onJsonChange(value) {
        console.log('value:', value);
    },
    /**
     * @description: JOSN空间 保存 事件
     * @param {*}
     * @return {*}
     */
    onJsonSave(value) {
        let _this = this;
        if (this.presentMsgNav != 99999) {
            if (this.presentMsgNav == '') {
                return
            }
            if (localStorage.getItem('messageSetData')) {
                this.messageOptionForm = JSON.parse(localStorage.getItem('messageSetData'));
            }
            console.log('value:', value);
            this.defaultJson = value;
            setToListen.setButtonName('saveMessage');
            console.log(this.presentMsgNav);
            console.log(this.messageNavList)
            let eqNav = '';
            for (let i = 0; i < this.messageNavList.length; i++) {
                if (this.presentMsgNav == this.messageNavList[i].id) {
                    eqNav = this.messageNavList[i]
                }
            }
            console.log(eqNav);
            let aa = {
                nav: eqNav,
                data: value
            }
            this.messageOptionForm.push(aa);
            this.$addStorageEvent("messageSetData", JSON.stringify(setToListen.unique(_this.messageOptionForm)));
            setToListen.setButtonName('setJson');
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        }
    },

}