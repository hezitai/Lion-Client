import Vue from 'vue'
// import jsoneditor from 'jsoneditor'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import store from './store'
// import vueJsonEditor from 'vue-json-editor';
// import jsoneditor from 'jsoneditor'
// Vue.prototype.$jsoneditor = jsoneditor
Vue.use(ElementUI);

Vue.config.productionTip = false;
// Vue.prototype.$vuejsoneditor = vueJsonEditor;
// Vue.prototype.$jsoneditor = jsoneditor;
/**
 * @description
 * @author (Set the text for this tag by adding docthis.authorName to your settings file.)
 * @date 2019-05-29
 * @param { number } type 1 localStorage 2 sessionStorage
 * @param { string } key 键
 * @param { string } data 要存储的数据
 * @returns 
 */
Vue.prototype.$addStorageEvent = function(key, data) {
    // 创建一个StorageEvent事件
    var newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
        setItem: function(k, val) {
            localStorage.setItem(k, val);
            // 初始化创建的事件
            newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
            // 派发对象
            window.dispatchEvent(newStorageEvent);
        }
    }
    return storage.setItem(key, data);

}

new Vue({
    render: h => h(App),
    store,
}).$mount('#app')