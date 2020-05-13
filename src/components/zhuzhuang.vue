<template>
  <div :class="className" :style="{height:remHeight,width:remWidth}" />
</template>

<script>
import echarts from 'echarts' // echarts theme
// import {
//     debounce
// } from '../utils/chart.js'
require('echarts/theme/macarons')

export default {
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100'
        },
        height: {
            type: String,
            default: '100'
        },
        showLegend: {
            type: Boolean,
            default: false
        },
        nameList: {
            default: () => {
                return ['进入', '离开']
            },
            type: Array
        },
        isSmooth: {
            type: Boolean,
            default: true
        },
        isAxis: {
            type: Boolean,
            default: false
        },
        dataList: {
            default: () => {
                return [
                    ['1点', '2点', '3点', '4点', '5点', '6点', '7点',
                        '8点', '9点', '10点', '11点', '12点',
                        '13点', '14点', '15点', '16点', '17点',
                        '18点', '19点', '20点', '21点', '22点', '23点', '24点'
                    ],
                    [0, 0, 0, 0, 0, 24, 40, 87, 139, 103, 46, 35, 34, 34, 25, 23, 23, 12, 7, 2, 3, 2, 0, 0],
                    [0, 0, 0, 0, 0, 1, 2, 1, 8, 16, 10, 56, 34, 12, 15, 24, 99, 120, 89, 36, 20, 6, 2, 1]
                ]
            },
            type: Array
        }
    },
    data () {
        return {
            chart: null,
            subject: [],
            value: [],
            colors: ['#1890FF', '#A1D4FF'],
            remWidth: '',
            remHeight: '',
            scale: 1
        }
    },
    created () {
        this.scale = 1
        this.remWidth = '100%'
        this.remHeight = this.height + 'px'
    },
    mounted () {
        this.initChart()
        this.__resizeHandler = () => {
            setTimeout(() => {
                if (this.chart) {
                    this.chart.resize()
                }
            }, 100)
        }
        window.addEventListener('resize', this.__resizeHandler)
    },
    beforeDestroy () {
        if (!this.chart) {
            return
        }
        window.removeEventListener('resize', this.__resizeHandler)
        this.chart.dispose()
        this.chart = null
    },
    methods: {
        initChart () {
            this.chart = echarts.init(this.$el, 'macarons')
            const data = this.dataList
            console.log(888, data)
            // const name = this.nameList
            this.chart.setOption({
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: data[0],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '60%',
                        data: data[1]
                    }
                ]
            })
        }
    }
}
</script>
