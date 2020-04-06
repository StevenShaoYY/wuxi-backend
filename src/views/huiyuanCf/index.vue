<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="24" :sm="24">
            <a-input-search placeholder="搜索编号、姓名、手机号码" style="float:left;width:250px;margin-left: 16px;" @search="onSearch"/>
            <span style="float:left;margin-top:5px;margin-left: 16px;">认证状态</span>
            <a-select defaultValue="2" style="float:left;width:120px;margin-left:15px;" @change="handleChange">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="2">已支付</a-select-option>
              <a-select-option value="6">已审核</a-select-option>
              <a-select-option value="7">已退款</a-select-option>
            </a-select>
            <span style="float:left;margin-top:5px;margin-left: 16px;">提交日期</span>
            <a-range-picker
              format="YYYY-MM-DD"
              style="float:left;width:200px;margin-left:15px;"
              @change="onChangeStart"
            />
          </a-col>
        </a-row>
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
          <a v-if="record.authStatus==2" @click="handleEdit(record)">认证</a>
          <a-divider v-if="record.authStatus==2 || record.authStatus==6" type="vertical" />
          <a v-if="record.authStatus==2 || record.authStatus==6" @click="handleReturn(record)">退款</a>
          <a-divider v-if="record.authStatus==7" type="vertical" v-action:DELETE />
          <a v-if="record.authStatus==7" v-action:DELETE @click="deleteUser(record)">删除</a>
        </template>
      </span>
    </s-table>
    <create-form1 ref="createModal1" @ok="handleOk" />
    <create-form2 ref="createModal2" @ok="handleOk" />
  </a-card>
</template>

<script>
// import moment from 'moment'
import { STable, Ellipsis } from '@/components'
import CreateForm1 from './modules/CreateForm1'
import CreateForm2 from './modules/CreateForm2'
import { getAuthList, deleteAuth, returnFund } from '@/api/huiyuan'

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
    CreateForm1,
    CreateForm2
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {
        authStatus: 2
      },
      // 表头
      columns: [
        {
          title: '认证编号',
          dataIndex: 'serialNumber',
          scopedSlots: { customRender: 'id' }
        },
        {
          title: '姓名',
          dataIndex: 'authInfo.name'
        },
        {
          title: '手机号码',
          dataIndex: 'authInfo.phoneNumber'
        },
        {
          title: '身份证号码',
          dataIndex: 'authInfo.certificateNumber'
        },
        {
          title: '认证类型',
          dataIndex: 'authType',
          scopedSlots: { customRender: 'huiyuanType' }
        },
        {
          title: '认证状态',
          dataIndex: 'authStatus',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '提交日期',
          dataIndex: 'createTime',
          sorter: true
        },
        {
          title: '认证日期',
          dataIndex: 'authTime',
          sorter: true
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
        return getAuthList(Object.assign(page, this.queryParam)).then(res => {
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
  },
  methods: {
    showDetail (val) {
      if (val.authType === 1) {
        this.$refs.createModal1.showDetail(val)
      } else {
        this.$refs.createModal2.showDetail(val)
      }
    },
    handleChange (val) {
      this.queryParam.authStatus = val
      this.$refs.table.refresh(true)
    },
    onChangeStart (val, dateString) {
      this.queryParam.commitTimeStart = dateString[0]
      this.queryParam.commitTimeEnd = dateString[1]
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
    handleReturn (record) {
       this.$confirm({
        title: '确定退款吗?',
        content: '退回该会员认证费用吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            returnFund({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('退款成功！')
                  this.$refs.table.refresh()
                  resolve()
                } else {
                  this.$message.error(res.message)
                  this.$refs.table.refresh()
                  resolve()
                }
              }
            )
          }).catch(() => console.log('Oops errors!'))
        },
        onCancel () {}
      })
    },
    deleteUser (record) {
       this.$confirm({
        title: '确定删除该认证数据吗?',
        content: '删除后将不保存该认证数据，确认删除吗？',
        onOk: () => {
          return new Promise((resolve, reject) => {
            deleteAuth({
              id: record.id
            }).then(
              res => {
                if (res.code === '200') {
                  this.$message.success('删除认证数据成功！')
                  this.$refs.table.refresh()
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
