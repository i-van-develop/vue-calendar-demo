<template>
    <div class="calendar">
        <div class="header">
            <div class="cell header-cell" :class="{'weekend' : dayNumber === 0 || dayNumber === 6}"
                 v-for="(weekDay, dayNumber) in weekDays" :key="dayNumber">
                {{weekDay}}
            </div>
        </div>
        <div class="body">
            <div class="row" v-for="rowNumber in 6" :key="rowNumber">
                <div class="cell body-cell"
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
            value: Date
        },
        data() {
            return {
                weekDays: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
                date: null,
                startFrom: 0
            };
        },
        watch: {
            value(){
                this.recalculate();
            }
        },
        beforeMount() {
            this.recalculate();
        },
        computed: {
            currentDate() {
                return (this.date.getMonth() + 1) + '/' + this.date.getFullYear();
            }
        },
        methods: {
            recalculate() {
                this.date = this.value || this.date || new Date();
                this.startFrom = getFirstDayInMonth(this.date);
            },
            getDayData(rowNumber, dayNumber) {
                const cday = (((rowNumber - 1) * 7) + dayNumber - this.startFrom);
                if (cday <= 0) {
                    return {
                        day: getDaysInMonth(createPrevMonthDate(this.date)) + cday,
                        currentMonth: false
                    };
                } else if (cday > getDaysInMonth(this.date)) {
                    return {
                        day: cday - getDaysInMonth(this.date),
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
            nextMonth() {
                const nextMonthDate = createNextMonthDate(this.date);
                if (this.value) {
                    this.$emit('input', nextMonthDate);
                } else {
                    this.date = nextMonthDate;
                }
            },
            prevMonth() {
                const prevMonthDate = createPrevMonthDate(this.date);
                if (this.value) {
                    this.$emit('input', prevMonthDate);
                } else {
                    this.date = prevMonthDate;
                }
            }
        }
    };
</script>

<style scoped>
    .calendar {
        min-width: 300px;
        box-sizing: border-box;
        background-color: #1d2e3e;
        padding: 20px;
    }

    .header, .footer, .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header {
        margin-bottom: 10px;
    }

    .footer {
        border-top: 1px solid rgba(255, 255, 255, 0.5);
        padding-top: 20px;
        margin-top: 10px;
    }

    .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width:calc(100% / 7);
        height: 32px;
    }

    .header-cell.weekend{
        color: #faa;
    }

    .body-cell {
        color: rgba(255, 255, 255, 0.5);
    }

    .body-cell.weekend{
        color: rgba(255,170,170,0.5);
    }

    .body-cell.current-month {
        color: #fff;
    }

    .body-cell.current-month.weekend{
        color: #faa;
    }

    .calendar-button {
        background-color: transparent;
        padding: 6px 0;
        border: 1px solid #fff;
        width: 70px;
        color: #fff;
        cursor: pointer;
        outline: none;
        transition: background-color 200ms, color 200ms;
    }

    .calendar-button:hover {
        background-color: #fff;
        color: #1d2e3e;
    }
</style>