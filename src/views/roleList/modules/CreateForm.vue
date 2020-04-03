<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="角色名"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入用户名"
              v-decorator="['name', {rules: [{required: true, message: '请输入用户名！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="角色功能权限"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-tree
              checkable
              :checkStrictly="true"
              @check="onSelect"
              :treeData="resourceData"
              :defaultExpandAll="true"
              v-model="value"
            >
              <a-icon slot="switcherIcon" type="down" />
              <span slot="custom" slot-scope="item">
                {{ item.title }}
              </span>
            </a-tree>
          </a-form-item>

          </a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="备注"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-textarea
              placeholder="请输入备注"
              :rows="3"
              v-decorator="['remark', {initialValue:''}]" />
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getModule, addRole, updateRole } from '@/api/role'
export default {
  data () {
    return {
      labelCol2: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol2: {
        xs: { span: 24 },
        sm: { span: 20 }
      },
      visible: false,
      confirmLoading: false,
      roleList: [],
      form: this.$form.createForm(this),
      title: '新增会员',
      rid: '',
      resourceData: [],
      value: [],
      selectIdList: []
    }
  },
  created () {
    getModule({}).then(res => {
      this.resourceData = res.result
      this.filterData(this.resourceData)
      console.log(this.resourceData)
    })
  },
  methods: {
    addParent (item, key) {
      console.log('爹的', item.parent)
      if (item.parent && item.parent.length !== 0) {
        console.log('是否选中', key.checked)
        if (key.checked === false) {
          if (this.value['checked'].indexOf(item.parent.key) < 0) {
            this.value['checked'].push(item.parent.key)
          }
        }
        if (item.parent) { this.addParent(item.parent, key) }
      }
    },
    addChildren (item, key) {
      if (key.checked === true) {
        for (const chi of item) {
          console.log('子节点', chi)
          console.log('子节点', this.value['checked'])
          if (this.value['checked'].indexOf(chi.key) >= 0) {
            const sp = this.value['checked'].indexOf(chi.key)
            console.log('子节点删除', sp)
            this.value['checked'].splice(sp, 1)
          }
          if (chi.children && chi.children.length > 0) { this.addChildren(chi.children, key) }
        }
      }
    },
    findPath (pathObj, key) {
      for (const item of pathObj) {
        if (item.value === key.value) {
          console.log('item', item)
          this.addParent(item, key)
          if (item.children && item.children.length > 0) { this.addChildren(item.children, key) }
        }
        if (item.children && item.children.length !== 0) {
          this.findPath(item.children, key)
        }
      }
    },
    onSelect (selectedKeys, info) {
      this.selectIdList = []
      this.findPath(this.resourceData, info.node)
      console.log('最终选中', this.value)
    },
    filterData (tree, parent) {
      for (const item of tree) {
        item.scopedSlots = { title: 'custom' }
        if (parent) {
          item.parent = parent
        } else {
          item.parent = []
        }
        if (item.children && item.children.length !== 0) {
          this.filterData(item.children, item)
        }
      }
    },
    compareToFirstPassword (rule, value, callbackFn) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callbackFn('两次输入密码不相同！')
      } else {
        callbackFn()
      }
    },
    validateToNextPassword (rule, value, callback) {
      const form = this.form
      if (value && this.confirmDirty) {
        form.validateFields(['password2'], { force: true })
      }
      callback()
    },
    add () {
      this.visible = true
      this.title = '新增管理员'
    },
    update (val) {
      this.visible = true
      this.title = '编辑管理员'
      this.rid = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.name,
          remark: val.remark
        })
        this.value = val.modules
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        if (!errors) {
          if (this.value.checked.length === 0) {
            this.$message.error('请先选择角色功能权限！')
            this.confirmLoading = false
            return
          }
          if (this.title === '新增管理员') {
            addRole(Object.assign(values, { modules: this.value.checked })).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('新增成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('新增失败！' + res.message)
              }
            })
          } else {
            updateRole(Object.assign(values, {
              id: this.rid,
              modules: this.value.checked
            })).then(res => {
              if (res.code === '200') {
                this.visible = false
                this.confirmLoading = false
                this.$message.success('编辑成功')
                this.form.resetFields()
                this.$emit('ok', values)
              } else {
                this.confirmLoading = false
                this.$message.error('编辑失败！' + res.message)
              }
            })
          }
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.value = []
      this.form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
  .line{
    border-top: 1px solid #E8E8E8;
  }
</style>
