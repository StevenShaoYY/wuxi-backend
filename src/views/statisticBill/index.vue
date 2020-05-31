<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="24" :sm="24">
            <a-input-search placeholder="搜索编号、名称" style="float:left;width:250px;margin-left: 16px;" @search="onSearch"/>
            <span style="float:left;margin-top:5px;margin-left: 16px;">会员分类</span>
            <a-select defaultValue="0" style="float:left;width:120px;margin-left:15px;" @change="handleChange">
              <a-select-option value="0">全部</a-select-option>
              <a-select-option value="1">普通会员</a-select-option>
              <a-select-option value="2">单位会员</a-select-option>
              <a-select-option value="3">理事会员</a-select-option>
              <a-select-option value="4">会长、副会长会员</a-select-option>
            </a-select>
            <span style="float:left;margin-top:5px;margin-left: 16px;">账单日期</span>
            <a-range-picker
              format="YYYY-MM-DD"
              style="float:left;width:200px;margin-left:15px;"
              @change="onChangeStart"
            />
          </a-col>
        </a-row>
        <div class="sta">
          <div class="sta-item">
            会员数：{{ sta.memberCount }}
          </div>
          <div class="sta-item">
            总计金额：{{ sta.billAmount }}
          </div>
        </div>
      </a-form>
    </div>

    <s-table
      ref="table"
      style="margin-top:20px;"
      size="default"
      rowKey="serialNumber"
      :columns="columns"
      :data="loadData"
      showPagination="auto"
    >
      <span slot="status" slot-scope="text">
        <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
      </span>
      <span slot="id" slot-scope="text, record">
        <span style="cursor: pointer;color:blue" @click="showDetail(record)">{{ text }}</span>
      </span>
      <span slot="huiyuanType" slot-scope="text">
        {{ text | huiyuanTypeFilter }}
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <a v-action:DELETE @click="deleteUser(record)">删除</a>
        </template>
      </span>
    </s-table>
    <create-form-watch ref="createModal" @ok="handleOk" />
  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import { getList, statisticBill, DeleteData } from '@/api/statisticBill'
import CreateFormWatch from './modules/CreateFormWatch'

const statusMap = {
  1: {
    status: 'warning',
    text: '未支付'
  },
  2: {
    status: 'processing',
    text: '已支付'
  },
  3: {
    status: 'error',
    text: '支付异常'
  },
  4: {
    status: 'warning',
    text: '已退款'
  },
  5: {
    status: 'default',
    text: '已清除'
  },
  6: {
    status: 'success',
    text: '已审核'
  },
  7: {
    status: 'success',
    text: '已退款'
  }
}
const huiyuanMap = {
  1: {
    status: 'default',
    text: '个人会员'
  },
  2: {
    status: 'processing',
    text: '单位会员'
  },
  3: {
    status: 'processing',
    text: '单位成员'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateFormWatch
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        vipType: 0
      },
      sta: {},
      // 表头
      columns: [
        {
          title: '账单编号',
          dataIndex: 'serialNumber',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '账单名称',
          dataIndex: 'name'
        },
        {
          title: '账单金额',
          dataIndex: 'amount'
        },
        {
          title: '账单日期',
          dataIndex: 'createTime'
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '180px',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: (parameter, filters, sorter) => {
        const page = {
          currentPage: parameter.pageNo,
          pageSize: parameter.pageSize,
          sortField: parameter.sortField,
          sortOrder: parameter.sortOrder
        }
        return getList(Object.assign(page, this.queryParam)).then(res => {
            for (const item of res.result.content) {
              if (item.authType === 2) {
                item.authInfo.name = item.authInfo.companyLegalPerson
                item.authInfo.phoneNumber = item.authInfo.companyLegalPersonPhone
                item.authInfo.certificateNumber = item.authInfo.companyLegalPersonCertificateNumber
              }
            }
            return res.result
          })
      },
      selectedRowKeys: [],
      selectedRows: []
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    },
    huiyuanTypeFilter (type) {
      return huiyuanMap[type].text
    }
  },
  created () {
    this.getSta()
  },
  methods: {
    getSta () {
      statisticBill(this.queryParam).then(res => {
        this.sta = res.result
      })
    },
    showDetail (val) {
        this.$refs.createModal.showDetail(val)
    },
    handleChange (val) {
      this.queryParam.vipType = val
      this.getSta()
      this.$refs.table.refresh(true)
    },
    onChangeStart (val, dateString) {
      this.queryParam.startTime = dateString[0]
      this.queryParam.endTime = dateString[1]
      this.getSta()
      this.$refs.table.refresh(true)
    },
    onSearch (val) {
      this.queryParam.queryKey = val
      this.$refs.table.refresh(true)
    },
    handleEdit (record) {
      if (record.authType === 1) {
        this.$refs.createModal1.update(record)
      } else {
        this.$refs.createModal2.update(record)
      }
    },
    deleteUser (record) {
       this.$confirm({
        title: '确定删除该账单数据吗?',
        content: '删除后将不保存该账单数据，确认删除吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            DeleteData({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除账单数据成功！')
                  this.$refs.table.refresh()
                  this.getSta()
                  resolve()
                }
              }
            )
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    handleOk () {
      this.$refs.table.refresh()
    }
  }
}
</script>
<style lang="less">
  .sta{
    display: flex;
    margin-top: 15px;
    margin-left: 16px;
    .sta-item{
      border: 1px solid #ccc;
      padding: 5px 20px;
    }
  }
</style>
