<template>
    <div class="calendar">
        <div class="header">
            <div class="cell header-cell" :class="{'weekend' : dayNumber === 0 || dayNumber === 6}"
                 v-for="(weekDay, dayNumber) in weekDays" :key="dayNumber">
                {{weekDay}}
            </div>
        </div>
        <div class="body" >
            <div class="row" v-for="rowNumber in 6" :key="rowNumber">
                <div class="cell"
                     :class="{
                        'weekend' : dayNumber === 1 || dayNumber === 7,
                        'current-month' : isCurrentMonth(rowNumber, dayNumber)
                     }"
                     v-for="dayNumber in 7">
                    {{ getDay(rowNumber, dayNumber) }}
                </div>
            </div>
        </div>
        <div class="footer">
            <button @click="prevMonth" class="calendar-button">Prev</button>
            <div class="current-date">{{ currentDate }}</div>
            <button @click="nextMonth" class="calendar-button">Next</button>
        </div>
    </div>
</template>

<script>
    import { createNextMonthDate, createPrevMonthDate, getDaysInMonth, getFirstDayInMonth } from '../lib/date';

    export default {
        name: "Calendar",
        props: {
            date: Date
        },
        data() {
            return {
                weekDays: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
                stateDate: null,
                startFrom: 0
            };
        },
        beforeUpdate() {
            this.recalculate();
        },
        beforeMount() {
            this.recalculate();
        },
        computed: {
            currentDate(){
                return this.stateDate.getMonth() + '/' + this.stateDate.getFullYear();
            }
        },
        methods: {
            recalculate() {
                this.stateDate = this.date || this.stateDate || new Date();
                this.startFrom = getFirstDayInMonth(this.stateDate);
            },
            getDayData(rowNumber, dayNumber) {
                const cday = (((rowNumber - 1) * 7) + dayNumber - this.startFrom);
                if (cday <= 0) {
                    return {
                        day: getDaysInMonth(createPrevMonthDate(this.stateDate)) + cday,
                        currentMonth: false
                    };
                } else if (cday > getDaysInMonth(this.stateDate)) {
                    return {
                        day: cday - getDaysInMonth(this.stateDate),
                        currentMonth: false
                    };
                }
                return {
                    day: cday,
                    currentMonth: true
                };
            },
            getDay(rowNumber, dayNumber) {
                return this.getDayData(rowNumber, dayNumber).day;
            },
            isCurrentMonth(rowNumber, dayNumber) {
                return this.getDayData(rowNumber, dayNumber).currentMonth;
            },
            nextMonth(){
                if (this.date){
                    this.$emit('changeDate', createNextMonthDate(this.date));
                } else {
                    this.stateDate = createNextMonthDate(this.stateDate);
                }
            },
            prevMonth(){
                if (this.date){
                    this.$emit('changeDate', createPrevMonthDate(this.date));
                } else {
                    this.stateDate = createPrevMonthDate(this.stateDate);
                }
            }
        }
    };
</script>

<style scoped>
    .calendar{
        width:400px;
    }
    .header, .footer, .row{
        display: flex;
        justify-content: space-between;
    }
    .cell{
        width:32px;
        height: 32px;
    }
</style>