<template>
    <div id="app">
        <Calendar v-model="date"/>
    </div>
</template>

<script>
    import Calendar from './components/Calendar';
    export default {
        name: 'App',
        components: { Calendar },
        data(){
            return{
                date: new Date()
            }
        }
    };
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #fff;

        position: fixed;
        left:0;
        top:0;
        width: 100%;
        min-height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #2c3e50;
    }
</style>
