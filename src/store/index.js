import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        level: 'top'
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        oneState: {
            state: {
                //存放的键值对就是所要管理的状态
                name: 'helloVueX'
            },
            mutations: {
                edit(state, payload, rootState) {
                    // debugger
                    state.name = 'jack';
                    // console.log(payload);
                    Vue.set(state, 'age', payload.age)
                        // debugger
                        // this.$set(state, 'sex', payload.sex)
                    Vue.set(state, 'sex', payload.sex)
                }
            },
            getters: {
                nameInfo(state) {
                    return "姓名:" + state.name
                },
                fullInfo(state, getters) {
                    return getters.nameInfo + '年龄:' + state.age + "性别:" + state.sex
                },
                useInfomation(state, getters) {
                    return `${getters.fullInfo}-->这是Vuex中的getters`
                }
            },
            actions: {
                aEdit(context, payload) {
                    setTimeout(() => {
                        context.commit('edit', payload)
                    }, 2000)
                }
            }
        }
    }
})

export default store