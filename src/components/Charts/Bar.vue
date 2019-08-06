<template>
  <div :style="{ padding: '0 0 32px 32px' }">
    <h3 class="chart-title" :style="{ marginBottom: '20px' }">{{ title }}</h3>
    <v-chart :height="height" :data="data" :forceFit="true" :padding="padding">
      <v-coord type="rect" :direction="direction" />
      <v-tooltip />
      <v-axis />
      <v-bar position="x*y" />
    </v-chart>
  </div>
</template>

<script>
export default {
  name: 'Bar',
  props: {
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 254
    },
    direction: {
      type: String,
      default: 'BL'
    },
    padding: {
      type: Array,
      default: () => {
        return ['auto', 'auto', '40', '50']
      }
    },
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    scale: {
      type: Array,
      default: () => {
        return [
          {
            dataKey: 'x',
            min: 2
          },
          {
            dataKey: 'y',
            title: '时间',
            min: 1,
            max: 22
          }
        ]
      }
    },
    tooltip: {
      type: Array,
      default: () => {
        return [
          'x*y',
          (x, y) => ({
            name: x,
            value: y
          })
        ]
      }
    }
  },
  data () {
    return {}
  }
}
</script>
