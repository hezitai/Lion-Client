export default {
    isloadfileorcreate: false,
    planForm: {
        name: '',
        url: 'http://',
        description: '',
        type: '',
    },
    fileList: [],
    navListName: '',
    navMsgListName: '',
    createNavListDialog: false,
    createMsgNavListDialog: false,
    presentNav: '',
    sendNavList: [],
    messageNavList: [],
    tableData: [{
        name: '发送频率(多少毫秒发送一次):',
        type: 1
    }, {
        name: '发送通道:',
        type: 2
    }, {
        name: '发送方式:(push/request)',
        type: 3
    }, {
        name: '是否异步:',
        type: 4
    }, {
        name: '发送消息总数:',
        type: 5
    }, {
        name: '发送倍率:(默认为1)',
        type: 6
    }, {
        name: '使用消息配置(下拉框选择不同消息的配置):',
        type: 7
    }],
    sendTableData: {
        type1: '',
        type2: '',
        type3: '',
        type4: '',
        type5: '',
        type6: '',
        type7: '',
    },
    sendOptionForm: [],
    messageOptionForm: [],
    searchlog: '',
    messageJsonCanvas: null,
    editor: null,
    defaultJson: {
        name: '123',
        class: [1, 2, 3, 4, 5, 6],
        date: [{
            year: 2020,
            month: 8,
            day: 9
        }, {
            year: 2020,
            month: 1,
            day: 9
        }, {
            year: 2020,
            month: 2,
            day: 9
        }]
    },
    default: {
        name: '123',
        class: [1, 2, 3, 4, 5, 6],
        date: [{
            year: 2020,
            month: 8,
            day: 9
        }, {
            year: 2020,
            month: 1,
            day: 9
        }, {
            year: 2020,
            month: 2,
            day: 9
        }]
    },
    presentMsgNav: '',
    changenavListName: '',
    changeMessageNavListName: '',
    changeMessageNavListDialog: false,
    changeNavListDialog: false,
}