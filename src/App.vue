<template>
    <div id="app">
        <div class="centered">
            <Calendar class="calendar" v-model="date"/>
            <div class="date-input-container">
                <button @click="reset" class="button">reset</button>
                <input v-model="jumpToDateValue" placeholder="Type date to jump" class="input" type="text">
                <button @click="jump" class="button">set</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Calendar from './components/Calendar';
    export default {
        name: 'App',
        components: { Calendar },
        data(){
            return{
                date: new Date(),
                jumpToDateValue: ''
            }
        },
        computed: {
            isValidJump(){
                return /^\d?\d\/\d\d\d\d$/.test(this.jumpToDateValue);
            }
        },
        methods:{
            jump(){
                if (this.isValidJump){
                    const jumpData = this.jumpToDateValue.split('/');
                    this.date = new Date(parseInt(jumpData[1]), parseInt(jumpData[0]) - 1);
                } else {
                    alert('invalid date format, please use MM/YYYY or M/YYYY, ex. 2/2020');
                }
            },
            reset(){
                this.jumpToDateValue = '';
                this.date = new Date();
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
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: #2c3e50;
    }

    .centered{
        width:400px;
    }

    .calendar{
        width:100%;
    }

    .date-input-container{
        margin-top: 20px;
        display: flex;
        width:100%;

        .input{
            background-color: transparent;
            border: none;
            border-bottom: 2px solid #1d2e3e;
            color:white;
            padding: 10px;
            flex-grow: 1;
            outline: none;
            text-align: center;
            font-size: 12px;
            margin: 0 10px;
        }
        .button{
            width:100px;
            background-color: #1d2e3e;
            border: none;
            color:white;
            flex-shrink: 0;
            cursor: pointer;
            outline: none;
            transition: background-color 200ms, color 200ms;
        }
        .button:hover{
            background-color: #fff;
            color: #1d2e3e;
        }
    }
</style>
