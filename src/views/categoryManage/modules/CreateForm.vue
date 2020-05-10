<template>
  <a-modal
    :title="title"
    :width="840"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="类目名称"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入类目名称"
              v-decorator="['name', {rules: [{required: true, message: '请输入类目名称！'}]}]" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="简介"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          >
            <a-input
              placeholder="请输入简介"
              v-decorator="['brief']" />
          </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="图标"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <!--
                :file-list="fileList" -->
              <a-upload
                v-decorator="[
                  'iconUrl',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile
                  },
                ]"
                action="http://101.132.194.14/traffic/ops/mall/photo/upload"
                list-type="picture-card"
                name="photo"
                @change="handleChange"
              >
                <div v-if="fileListLength < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传图标
                  </div>
                </div>
              </a-upload>
            </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item
              label="图片"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <!--
                :file-list="fileList" -->
              <a-upload
                v-decorator="[
                  'picUrl',
                  {
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile
                  },
                ]"
                action="http://101.132.194.14/traffic/ops/mall/photo/upload"
                list-type="picture-card"
                name="photo"
                @change="handleChange2"
              >
                <div v-if="fileListLength2 < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">
                    上传图片
                  </div>
                </div>
              </a-upload>
            </a-form-item></a-col>
        </a-row>
        <a-row :gutter="24">
          <a-col :span="24"><a-form-item
            label="父类目"
            :labelCol="labelCol2"
            :wrapperCol="wrapperCol2"
          > <a-select
            v-decorator="[
              'pid']"
            placeholder="请选择父类目"
          >
            <a-select-option v-for="(item, index) of pIdList" :key="index" :value="item.id">
              {{ item.name }}
            </a-select-option>
          </a-select>
          </a-form-item></a-col>
        </a-row>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import { getList, add, update } from '@/api/category'
import moment from 'moment'

export default {
  data () {
    return {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
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
      form: this.$form.createForm(this),
      title: '添加商家',
      rid: '',
      fileListLength: 0,
      fileListLength2: 0,
      pIdList: []
    }
  },
  created () {
    getList({
      currentPage: 1,
      endTime: '',
      pageSize: 1000,
      queryKey: '',
      startTime: ''
    }).then(res => {
      this.pIdList = res.result.content
    })
  },
  methods: {
    moment,
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handleChange (file) {
      this.fileListLength = file.fileList.length
    },
    handleChange2 (file) {
      this.fileListLength2 = file.fileList.length
    },
    add () {
      this.visible = true
      this.title = '添加类目'
    },
    update (val) {
      this.visible = true
      this.title = '编辑类目'
      this.rid = val.id
      setTimeout(() => {
        this.form.setFieldsValue({
          name: val.name,
          brief: val.brief,
          pid: val.pid,
          iconUrl: [{
              uid: '-1',
              name: '图标',
              status: 'done',
              url: val.iconUrl
            }],
          picUrl: [{
              uid: '-2',
              name: '图片',
              status: 'done',
              url: val.picUrl
            }]
        })
        this.fileListLength = 1
        this.fileListLength2 = 1
      }, 100)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
          if (this.title === '添加类目') {
            const uploadData = JSON.parse(JSON.stringify(values))
            uploadData.iconUrl = uploadData.iconUrl[0].response.result
            uploadData.picUrl = uploadData.picUrl[0].response.result
            add(uploadData).then(res => {
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
            const uploadData = JSON.parse(JSON.stringify(values))
            uploadData.picUrl = uploadData.picUrl[0].url || uploadData.picUrl[0].response.result
            uploadData.iconUrl = uploadData.iconUrl[0].url || uploadData.iconUrl[0].response.result
            update(Object.assign(uploadData, {
              id: this.rid
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
          console.log(8888, errors)
          this.confirmLoading = false
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.fileListLength = 0
      this.fileListLength2 = 0
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
