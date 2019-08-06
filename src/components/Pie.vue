<template>
<div>
<h3 class="chart-title">{{ title }}</h3>
<v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
    <v-tooltip :showTitle="false" dataKey="item*percent" />
    <v-axis />
    <v-legend dataKey="item" />
    <v-pie position="percent" color="item" :v-style="pieStyle" :label="labelConfig" />
    <v-coord type="theta" />
</v-chart>
</div>
</template>

<script>
const DataSet = require('@antv/data-set')

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 254
        },
        dataSource: {
            type: Array
        }
    },
    data() {
        return {
            scale: [{
                dataKey: 'percent',
                min: 0,
                formatter: '.0%'
            }],
            pieStyle: {
                stroke: '#fff',
                lineWidth: 1
            },
            labelConfig: ['percent', {
                formatter: (val, item) => {
                    return item.point.item + ': ' + val
                }
            }]
        }
    },
    computed: {
        data() {
            let dv = new DataSet.View().source(this.dataSource)
            // 计算数据百分比
            dv.transform({
                type: 'percent',
                field: 'count',
                dimension: 'item',
                as: 'percent'
            })
            return dv.rows
        }
    }
}
</script>
