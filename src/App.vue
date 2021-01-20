<template>
    <div id="app">
        <Index />
    </div>
</template>

<script>
import Index from './components/index.vue'

export default {
    name: 'App',
    components: {
        Index
    },
    beforeCreate() {
        if (localStorage.getItem('loadLocalFile')) {
            localStorage.removeItem('loadLocalFile')
        };
        if (localStorage.getItem('readyCreate')) {
            localStorage.removeItem('readyCreate')
        };
        if (localStorage.getItem('deleteData')) {
            localStorage.removeItem('deleteData')
        };
        if (localStorage.getItem('createData')) {
            localStorage.removeItem('createData')
        };
        if (localStorage.getItem('sendData')) {
            localStorage.removeItem('sendData')
        };
        if (localStorage.getItem('savePlan')) {
            localStorage.removeItem('savePlan')
        };
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    width: 100%;
    height: 100%;
}
</style>
