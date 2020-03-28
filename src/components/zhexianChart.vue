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
            const name = this.nameList
            const serData = [{
                name: name[0],
                type: 'line',
                smooth: this.isSmooth,
                lineStyle: {
                    normal: {
                        width: 1 * this.scale
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(24, 144, 255, 0.9)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(24, 144, 255, 0.9)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: 'rgba(24, 144, 255, 0.9)'
                    }
                },
                data: data[1]
            }]
            if (name.length >= 2 && data.length >= 3) {
                serData.push({
                    name: name[1],
                    type: 'line',
                    smooth: this.isSmooth,
                    lineStyle: {
                        normal: {
                            width: 1 * this.scale
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 136, 212, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 136, 212, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: 'rgb(0,136,212)'
                        }
                    },
                    data: data[2]
                })
            }
            if (name.length >= 3 && data.length >= 4) {
                serData.push({
                    name: name[2],
                    type: 'line',
                    smooth: this.isSmooth,
                    lineStyle: {
                        normal: {
                            width: 1 * this.scale
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(245,172,60, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(245,172,60, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#F5AC3C'
                        }
                    },
                    data: data[3]
                })
            }
            if (name.length >= 4 && data.length >= 5) {
                serData.push({
                    name: name[3],
                    type: 'line',
                    smooth: this.isSmooth,
                    lineStyle: {
                        normal: {
                            width: 1 * this.scale
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(228,0,127, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(228,0,127, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#E4007F'
                        }
                    },
                    data: data[4]
                })
            }
            if (name.length >= 5 && data.length >= 6) {
                serData.push({
                    name: name[4],
                    type: 'line',
                    smooth: this.isSmooth,
                    lineStyle: {
                        normal: {
                            width: 1 * this.scale
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(143,195,31, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(143,195,31, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#8FC31F'
                        }
                    },
                    data: data[5]
                })
            }
            let topF = ''
            if (this.showLegend) {
                topF = '25%'
            } else {
                topF = '10%'
            }
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                },
                legend: {
                    show: this.showLegend,
                    itemWidth: 14 * this.scale,
                    itemHeight: 5 * this.scale,
                    itemGap: 13 * this.scale,
                    data: name,
                    right: '4%',
                    textStyle: {
                        fontSize: 12 * this.scale,
                        color: '#000'
                    }
                },
                grid: {
                    top: topF,
                    left: '3%',
                    right: '4%',
                    bottom: '1%',
                    containLabel: true
                },
                xAxis: [{
                    show: true,
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    data: data[0]
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisLabel: {
                        margin: 10 * this.scale,
                        textStyle: {
                            fontSize: 14 * this.scale
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    }
                }],
                series: serData,
                backgroundColor: 'rgba(0,0,0,0)'
            })
        }
    }
}
</script>
