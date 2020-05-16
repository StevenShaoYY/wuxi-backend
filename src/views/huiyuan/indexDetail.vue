<template>
  <div class="main-container" >
    <div ref="print">
      222222222222
    </div>
    <a-descriptions title="会员信息" bordered >
      <a-descriptions-item label="姓名" >
        {{ data.authInfo.name }}
      </a-descriptions-item>
      <a-descriptions-item label="身份证号码" :span="2">
        {{ data.authInfo.certificateNumber }}
      </a-descriptions-item>
    </a-descriptions>
    <div >
      <a-button key="back" @click="handlePrint">打印</a-button>
    </div>
  </div>

</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'

const statusMap = {
  0: {
    status: 'default',
    text: '禁用中'
  },
  1: {
    status: 'processing',
    text: '启用中'
  }
}

export default {
  components: {
    STable,
    Ellipsis
  },
  data () {
    return {
      data: {}
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    levelFilter (type) {
      let star = ''
      for (let i = 0; i <= type; i++) {
        star = star + '★'
      }
      return star
    }
  },
  created () {
    this.data = JSON.parse(this.$route.query.val)
  },
  methods: {
    handlePrint () {
      console.log(this.$refs.print)
      setTimeout(() => {
        this.$print(this.$refs.print)
      }, 1000)
      // this.$nextTick(() => {
      //     this.$print(this.$refs.print)
      //   }
      // )
    }
  }
}
</script>
<style lang="less" scoped>
  .main-container{
    background-color: #fff;
  }
</style>
