<template>
    <div id="index">

        <div style="display: none;"><input type="file" id="getfilepath" name="image" class="getImgUrl_file" @change="preview($event)"></div>
        <el-tabs type="border-card" class="card">
            <el-tab-pane label="计划">
                <div class="item-content plan-item">
                    <el-form class="plan-form" ref="planForm" :model="planForm" label-width="120px">
                        <el-form-item label="计划名称">
                            <el-input v-model="planForm.name"></el-input>
                        </el-form-item>
                        <el-form-item label="服务端URL">
                            <el-input v-model="planForm.url"></el-input>
                        </el-form-item>
                        <el-form-item label="消息类型">
                            <el-input v-model="planForm.type"></el-input>
                        </el-form-item>
                        <el-form-item label="计划说明">
                            <el-input :rows='10' type="textarea" class="textarea" v-model="planForm.description"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="readyCreate(0)">立即创建</el-button>
                            <el-button type="success" @click="loadLocalFile">加载本地文件</el-button>
                            <!-- <el-button type="warning" @click="readyCreate(1)">修改</el-button> -->
                            <!-- <span>请将需加载的本地json配置文件放在本程序的resources文件夹下使用</span> -->
                        </el-form-item>
                    </el-form>
                </div>
            </el-tab-pane>
            <el-tab-pane :disabled="!isloadfileorcreate" label="发送配置">
                <div class="item-content send-item">
                    <div class="send-item-left">
                        <el-menu class="el-menu-vertical-demo" @select="handleSendNav" @open="handleOpen" @close="handleClose">
                            <el-menu-item v-for="(item, $index) in sendNavList" :index="item.id.toString()" :key="$index">
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </el-menu>
                    </div>
                    <div class="send-item-right">
                        <div class="grid-content" v-show="presentNav">
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column label="属性" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.name}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="值" align="center">
                                    <template slot-scope="scope">
                                        <div v-if="scope.row.type == 1">
                                            <el-input v-model="sendTableData.type1"></el-input>
                                        </div>
                                        <div v-if="scope.row.type == 2">
                                            <el-select style="width:100%" v-model="sendTableData.type2" placeholder="请选择">
                                                <el-option value="MDPUSH_001" label="MDPUSH_001">MDPUSH_001</el-option>
                                            </el-select>
                                        </div>
                                        <div v-if="scope.row.type == 3">
                                            <el-select style="width:100%" v-model="sendTableData.type3" placeholder="请选择">
                                                <el-option value="PUSH" label="PUSH">PUSH</el-option>
                                                <el-option value="REQUEST" label="REQUEST">REQUEST</el-option>
                                            </el-select>
                                        </div>
                                        <div v-show="sendTableData.type3 != 'PUSH'">
                                            <div v-if="scope.row.type == 4">
                                                <el-radio v-model="sendTableData.type4" label="aync">异步</el-radio>
                                                <el-radio v-model="sendTableData.type4" label="sync">同步</el-radio>
                                            </div>
                                        </div>
                                        <div v-if="scope.row.type == 5">
                                            <el-input v-model="sendTableData.type5"></el-input>
                                        </div>
                                        <div v-if="scope.row.type == 6">
                                            <el-input v-model="sendTableData.type6"></el-input>
                                        </div>
                                        <div v-if="scope.row.type == 7">
                                            <el-select style="width:100%" v-model="sendTableData.type7" placeholder="请选择">
                                                <el-option value="PUSH" label="PUSH">PUSH</el-option>
                                                <el-option value="REQUEST" label="REQUEST">REQUEST</el-option>
                                            </el-select>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="btn-content" v-show="presentNav">
                            <el-button type="danger" @click="deleteData">删除</el-button>
                            <el-button type="info" @click="changeNav">修改名称</el-button>
                            <el-button type="success" @click="createData">生成数据</el-button>
                            <el-button type="primary" @click="sendData">发送数据</el-button>
                            <el-button type="warning" @click="savePlan">保存计划</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :disabled="!isloadfileorcreate" label="消息配置">
                <div class="item-content message-item">
                    <div class="send-item-left">
                        <el-menu default-active="0" class="el-menu-vertical-demo" @select="handleMessageNav" @open="handleOpen" @close="handleClose">
                            <el-menu-item v-for="(item, $index1) in messageNavList" :index="item.id.toString()" :key="$index1">
                                <span slot="title">{{item.name}}</span>
                            </el-menu-item>
                        </el-menu>
                    </div>
                    <div class="send-item-right">
                        <div class="message-img" id="messageJsonCanvas" v-show="presentMsgNav">
                            <!-- <div id="jsoneditor"></div> -->
                            <vue-json-editor class="jsonitem" v-model="defaultJson" :showBtns="true" :mode="'code'" lang="zh" @json-change="onJsonChange" @json-save="onJsonSave" />
                        </div>
                        <div class="message-btn-content" v-show="presentMsgNav">
                            <el-button type="info" @click="changeJsonName" size="mini">修改名称</el-button>
                            <el-button type="danger" @click="deleteMessageNavList" size="mini">删除</el-button>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :disabled="!isloadfileorcreate" label="接收日志">
                <div class="item-content log-item">
                    <div class="log-item-left">
                        <div class="log-item-left-title">
                            <p>日志</p>
                            <div class="search-content">
                                <el-input size="mini" style="width:150px;margin-right:5px" v-model="searchlog" placeholder="请输入内容"></el-input>
                                <el-button type='primary' icon="el-icon-search" size="mini">搜索</el-button>
                            </div>
                        </div>
                        <div class="log-item-left-content">
                            {{$store.state.name}}
                        </div>
                        <div class="log-item-left-footer">
                            <div class="search-content">
                                <span>计数：100</span>
                                <el-button type='danger' size="mini" style="margin-left:20px">清屏</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="log-item-right">
                        <div class="show-json">

                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>

        <el-dialog title="提示" :visible.sync="createNavListDialog" width="30%" :before-close="createNavListDialoghandleClose">
            <div class="dialog-input-box">
                <span style="display:inline-block;width:120px">配置名称</span>
                <el-input v-model="navListName" placeholder="请输入配置名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createNavListDialog = false">取 消</el-button>
                <el-button type="primary" @click="createNavListDialogConfig">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="changeNavListDialog" width="30%" :before-close="changeNavListDialoghandleClose">
            <div class="dialog-input-box">
                <span style="display:inline-block;width:120px">修改配置名称</span>
                <el-input v-model="changenavListName" placeholder="请输入配置名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeNavListDialog = false">取 消</el-button>
                <el-button type="primary" @click="changeNavListDialogConfig">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="changeMessageNavListDialog" width="30%" :before-close="changeMessageNavListDialoghandleClose">
            <div class="dialog-input-box">
                <span style="display:inline-block;width:120px">修改配置名称</span>
                <el-input v-model="changeMessageNavListName" placeholder="请输入配置名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="changeMessageNavListDialog = false">取 消</el-button>
                <el-button type="primary" @click="changeMessageNavListDialogConfig">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="createMsgNavListDialog" width="30%" :before-close="createMsgNavListDialoghandleClose">
            <div class="dialog-input-box">
                <span style="display:inline-block;width:120px">配置名称</span>
                <el-input v-model="navMsgListName" placeholder="请输入配置名称"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="createMsgNavListDialog = false">取 消</el-button>
                <el-button type="primary" @click="createMsgNavListDialogConfig">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import vueJsonEditor from 'vue-json-editor'
import Datas from "../data/index.js"
import Methods from "../methods/index.js"
export default {
    name: 'index',
    data() {
        return Datas
    },
    beforeCreate() {
        localStorage.setItem('chooseFilesDone', JSON.stringify(0))
    },
    watch: {
        sendNavList(val) {
            if (val && val.length && val.length < 2) {
                this.sendTableData = {
                    type1: '',
                    type2: '',
                    type3: '',
                    type4: '',
                    type5: '',
                    type6: '',
                    type7: '',
                }
                this.presentNav = '';
            }

        }
    },
    mounted() {
        let self = this;
        this.sendNavList = JSON.parse(localStorage.getItem('sendNavList'));
        this.messageNavList = JSON.parse(localStorage.getItem('messageNavList'));

        (function () {
            //定义一个变量让setItem函数的值指向它
            let originalSetItem = localStorage.setItem;
            //重写setItem函数
            localStorage.setItem = function (key, newValue) {
                //创建setItemEvent事件
                let event = new Event("setItemEvent");
                event.key = key;
                event.newValue = newValue;
                //提交setItemEvent事件
                window.dispatchEvent(event);
                //执行原setItem函数
                originalSetItem.apply(this, arguments);
            }
        })();
        //添加setItemEvent监听事件
        window.addEventListener("setItemEvent", function (e) {
            let timeout;
            let _this = localStorage.getItem(e.key)
            if (_this != e.newValue) {
                // console.log(`Key:${e.key}的 OldValue:${_this} | NewValue:${e.newValue}`)
                if (e.key == 'messageSetData') {

                } else if (e.key == 'sendSetData') {

                } else if (e.key == 'sendNavList') {
                    timeout = window.setTimeout(() => {
                        self.sendNavList = JSON.parse(localStorage.getItem(e.key));
                        window.clearTimeout(timeout)
                    }, 200)
                } else if (e.key == 'messageNavList') {
                    timeout = window.setTimeout(() => {
                        self.messageNavList = JSON.parse(localStorage.getItem(e.key));
                        window.clearTimeout(timeout)
                    }, 200)
                } else if (e.key == 'readyCreateData') {
                    timeout = window.setTimeout(() => {
                        if (localStorage.getItem(e.key)) {
                            let getdata = JSON.parse(localStorage.getItem(e.key));
                            self.planForm = {
                                name: getdata.name,
                                url: getdata.url,
                                description: getdata.description,
                                type: getdata.type,
                            };
                        }
                        window.clearTimeout(timeout)
                    }, 200)
                }
            }
        });
    },
    components: {
        vueJsonEditor
    },
    methods: Methods
}
</script>
<style>
.upload-demo {
    margin-left: 20px;
    display: inline-block;
}
.el-divider--horizontal {
    margin: 12px 0;
}
#index {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.card {
    width: 80%;
    height: 80%;
    /* border-radius: 10px; */
}
.plan-item {
    padding: 20px 0;
}
.item-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.plan-form {
    padding-right: 20px;
}
.send-item,
.message-item {
    height: 100%;
}
.el-menu-vertical-demo {
    height: 100%;
}
.send-item-left {
    height: 100%;
    width: 150px;
    overflow: auto;
    border-right: 1px solid #eee;
}
.send-item-left::-webkit-scrollbar {
    display: none; /* Chrome Safari */
}
.send-item-right {
    width: calc(100% - 150px);
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
    position: relative;
}
.el-tabs__content {
    height: calc(100% - 39px);
    padding: 0 !important;
}
#pane-1,
#pane-2,
#pane-3 {
    height: 100%;
    padding: 0;
}
.el-menu {
    border: none !important;
}
.grid-content {
    width: 80%;
}
.btn-content {
    width: 80%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.message-img {
    width: 95%;
    height: 100%;
    border-radius: 5px;
}
.textarea {
    resize: none;
}
.log-item-left {
    width: 55%;
    height: calc(100% - 30px);
    padding: 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.log-item-right {
    width: 45%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.show-json {
    width: 95%;
    height: 95%;
    border: 1px solid #ccc;
    border-radius: 5px;
}
.log-item-left-title {
    position: relative;
    width: 100%;
    text-align: left;
}
.log-item-left-title p {
    margin: 0;
    line-height: 32px;
    font-size: 16px;
    text-indent: 10px;
}
.search-content {
    position: absolute;
    top: 2px;
    right: 0;
    width: 300px;
}
.log-item-left-footer {
    width: 100%;
    position: relative;
    height: 32px;
}
.log-item-left-content {
    width: 90%;
    height: calc(100% - 80px);
    border-radius: 5px;
    border: 1px solid #ccc;
}
.el-form-item__label {
    position: relative;
}
.el-form-item__label::before {
    content: "*";
    display: block;
    color: red;
    position: absolute;
    top: 0;
    right: 5px;
    line-height: 20px;
}
.dialog-input-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}
.jsoneditor-vue {
    width: 100%;
    height: 100%;
}
.jsonitem {
    width: 100%;
    height: calc(100% - 40px);
}
.ace-jsoneditor .ace_scroller {
    text-align: left !important;
}
.jsoneditor-poweredBy {
    display: none;
}
div.jsoneditor-menu {
    background: #409eff;
    border-bottom: 1px solid #409eff;
}
div.jsoneditor {
    border: 1px solid #409eff;
    border-radius: 5px;
}
.jsoneditor-btns {
    text-align: right !important;
}
.json-save-btn {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: #ffffff;
    -webkit-appearance: none;
    text-align: center;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    transition: 0.1s;
    font-weight: 500;
    border-radius: 3px !important;
    background-color: #f56c6c;
    border-color: #f56c6c;
    padding: 7px 15px !important;
}
.message-btn-content {
    /* width: 95%; */
    position: absolute;
    text-align: right;
    bottom: 3px;
    right: 90px;
}
</style>