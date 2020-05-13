<template>
  <a-modal
    :title="title"
    width="100%"
    height="100"
    style="top: 0px;"
    :bodyStyle="bdStyle"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <a-card title="商品介绍" :bordered="false">
          <a-row :gutter="24">
            <a-col :span="12"><a-form-item
              label="商家编号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                placeholder="请输入商家编号"
                :disabled="isShowDetail"
                v-decorator="['merchantSerialNumber', {rules: [{required: true, message: '请输入商家编号！'}]}]" />
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item
              label="商品编号"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                placeholder="请输入商品编号"
                :disabled="isShowDetail"
                v-decorator="['serialNumber', {rules: [{required: true, message: '请输入商品编号！'}]}]" />
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12"><a-form-item
              label="商品名称"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                placeholder="请输入商品名称"
                :disabled="isShowDetail"
                v-decorator="['name', {rules: [{required: true, message: '请输入商品名称！'}]}]" />
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item
              label="是否推荐"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-radio-group
                :disabled="isShowDetail"
                v-decorator="['isHot',{initialValue:'1'}]">
                <a-radio :value="1">推荐</a-radio>
                <a-radio :value="0">非推荐</a-radio>
              </a-radio-group>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12"><a-form-item
              label="是否在售"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-radio-group
                :disabled="isShowDetail"
                v-decorator="['isOnSale',{initialValue:'1'}]">
                <a-radio :value="1">在售</a-radio>
                <a-radio :value="0">未售</a-radio>
              </a-radio-group>
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item
              label="商品单位"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                :disabled="isShowDetail"
                placeholder="请输入商品单位"
                v-decorator="['unit', {rules: [{required: true, message: '请输入商品单位！'}]}]" />
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                label="商品图片"
                :labelCol="labelCol2"
                :wrapperCol="wrapperCol2"
              >
                <!--
                :file-list="fileList" -->
                <a-upload
                  :disabled="isShowDetail"
                  v-decorator="[
                    'picUrl',
                    {
                      valuePropName: 'fileList',
                      getValueFromEvent: normFile,
                      rules: [{required: true, message: '请上传商品图片！'}]
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
                      上传图片
                    </div>
                  </div>
                </a-upload>
              </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24">
              <a-form-item
                label="轮播图"
                :labelCol="labelCol2"
                :wrapperCol="wrapperCol2"
              >
                <!--
                :file-list="fileList" -->
                <a-upload
                  :disabled="isShowDetail"
                  v-decorator="[
                    'gallery',
                    {
                      valuePropName: 'fileList',
                      getValueFromEvent: normFile,
                      rules: [{required: true, message: '请上传轮播图！'}]
                    },
                  ]"
                  action="http://101.132.194.14/traffic/ops/mall/photo/upload"
                  list-type="picture-card"
                  name="photo"
                  @change="handleChange2"
                >
                  <div v-if="fileListLength2 < 15">
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
              label="商品分类"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            > <a-select
              :disabled="isShowDetail"
              v-decorator="[
                'categoryId',
                {rules: [{required: true, message: '请选择商品分类！'}]}]"
              placeholder="请选择商品分类"
            >
              <a-select-option v-for="(item, index) of categoryList" :key="index" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24"><a-form-item
              label="关键字"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <div class="keyword">
                <template v-for="(tag, index) in keywords">
                  <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                    <a-tag
                      :disabled="isShowDetail"
                      :key="tag"
                      :closable="index !== 0"
                      @close="() => handleClose(tag)">
                      {{ `${tag.slice(0, 20)}...` }}
                    </a-tag>
                  </a-tooltip>
                  <a-tag
                    v-else
                    :disabled="isShowDetail"
                    :key="tag"
                    :closable="index !== 0"
                    @close="() => handleClose(tag)">
                    {{ tag }}
                  </a-tag>
                </template>
                <a-input
                  v-if="inputVisible"
                  :disabled="isShowDetail"
                  ref="input"
                  type="text"
                  size="small"
                  :style="{ width: '78px' }"
                  :value="keyWordInput"
                  @change="handleInputChange"
                  @blur="handleInputConfirm"
                  @keyup.enter="handleInputConfirm"
                />
                <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="showInput">
                  <a-icon type="plus" /> New Tag
                </a-tag>
              </div>
              </div>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24"><a-form-item
              label="商品简介"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <a-input
                type="textarea"
                :disabled="isShowDetail"
                placeholder="请输入商品简介"
                :rows="3"
                v-decorator="['brief']" />
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24"><a-form-item
              label="商品备注"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <a-input
                type="textarea"
                :disabled="isShowDetail"
                placeholder="请输入商品备注"
                :rows="3"
                v-decorator="['remark']" />
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="24"><a-form-item
              label="详细介绍"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <edit
                ref="editor"
                v-model="Editortext"
                :disabled="allDisabled || isShowDetail">
              </edit>
            </a-form-item></a-col>
          </a-row>
        </a-card>
        <a-card title="商品库存" :bordered="false">
          <a-row :gutter="24">
            <a-col :span="12"><a-form-item
              label="库存数量"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                placeholder="请输入库存数量"
                :disabled="isShowDetail"
                v-decorator="['number', {rules: [{required: true, message: '请输入库存数量！'}]}]" />
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item
              label="积分结算"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-radio-group
                @change="intergralChange"
                :disabled="isShowDetail"
                v-decorator="['isUseIntegral',{initialValue:'1'}]">
                <a-radio :value="1">是</a-radio>
                <a-radio :value="0">否</a-radio>
              </a-radio-group>
            </a-form-item></a-col>
          </a-row>
          <a-row :gutter="24">
            <a-col :span="12"><a-form-item
              label="商品售价"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                :disabled="isShowDetail"
                placeholder="请输入商品售价"
                v-decorator="['salePrice', {rules: [{required: true, message: '请输入商品售价！'}]}]" />
            </a-form-item></a-col>
            <a-col :span="12"><a-form-item
              label="积分售价"
              v-if="isIntegral==1"
              :labelCol="labelCol"
              :wrapperCol="wrapperCol"
            >
              <a-input
                :disabled="isShowDetail"
                placeholder="请输入积分售价"
                v-decorator="['integralPrice', {rules: [{required: true, message: '请输入积分售价！'}]}]" />
            </a-form-item></a-col>
          </a-row>

        </a-card>
        <a-card title="商品标签" :bordered="false">
          <a-row :gutter="24">
            <a-col :span="24"><a-form-item
              label="商品标签"
              :labelCol="labelCol2"
              :wrapperCol="wrapperCol2"
            >
              <a-select
                :disabled="isShowDetail"
                v-decorator="[
                  'tag']"
                mode="multiple"
                placeholder="请选择商品标签"
                style="width:80%;"
                @change="changeTag($event)"
              >
                <a-select-option v-for="(item, index) of tagList" :key="index" :value="item.id">
                  {{ item.tagName }}
                </a-select-option>
              </a-select>
              <a-button
                :disabled="isShowDetail"
                style="float:right"
                type="primary"
                icon="plus"
                @click="addTag">
                添加
              </a-button>
            </a-form-item>

            </a-col>
          </a-row>
        </a-card>
        <a-card title="商品参数" :bordered="false">
          <a-button
            :disabled="isShowDetail"
            style="float:right"
            type="primary"
            icon="plus"
            @click="addAttribute">
            添加
          </a-button>
          <div class="valueTable">
            <div class="line">
              <div class="item">商品参数名称</div>
              <div class="item">商品参数值</div>
              <div class="item2">
              </div>
            </div>
            <div class="line" v-for="(item, index) of AttributeList" :key="index">
              <div class="item">{{ item.attributeName }}</div>
              <div class="item">{{ item.attributeValue }}</div>
              <div class="item2">
                <a-button
                  :disabled="isShowDetail"
                  style="float:right"
                  type="primary"
                  icon="plus"
                  @click="deleteAttribute(index)">
                  删除
                </a-button>
              </div>
            </div>
          </div>
        </a-card>
      </a-form>
    </a-spin>
    <template slot="footer" >
      <a-button key="back" v-if="isShowDetail==false" @click="handleCancel">取消</a-button>
      <a-button key="submit" v-if="isShowDetail==false" type="primary" :loading="confirmLoading" @click="handleSubmit">
        确定
      </a-button>
      <div v-if="isShowDetail==true"></div>
    </template>
    <create-form3 ref="createModal" @ok="handleOk" />
    <create-form4 ref="createModal2" @ok="handleAttribute" />
  </a-modal>
</template>

<script>
import { add, update } from '@/api/shop'
// import { uploadPic } from '@/api/upload'
import { getList } from '@/api/tag'
import { getCategoryList } from '@/api/category'
import CreateForm3 from './CreateForm3'
import CreateForm4 from './CreateForm4'
import edit from './edit'
import moment from 'moment'

export default {
  components: {
    CreateForm3,
    CreateForm4,
    edit
  },
  data () {
    return {
      bdStyle: {
        overflow: 'auto',
        height: 'calc(100vh - 120px)'
      },
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
      title: '添加商品',
      rid: '',
      fileListLength: 0,
      fileListLength2: 0,
      categoryList: [],
      tagList: [],
      keywords: [],
      AttributeList: [],
      keyWordInput: '',
      inputVisible: false,
      isIntegral: 1,
      Editortext: '',
      allDisabled: false,
      isShowDetail: false
    }
  },
  created () {
    this.getTagList()
    this.getCateList()
  },
  methods: {
    moment,
    changeTag (val) {
      console.log(val)
    },
    getTagList () {
      getList({
          currentPage: 1,
          pageSize: 1000
      }).then(res => {
        this.tagList = res.result.content
      })
    },
    getCateList () {
      getCategoryList({
          currentPage: 1,
          pageSize: 1000
      }).then(res => {
        this.categoryList = res.result.content
      })
    },
    addTag () {
      this.$refs.createModal.add()
    },
    addAttribute () {
      this.$refs.createModal2.add()
    },
    deleteAttribute (index) {
      this.AttributeList.splice(index, 1)
    },
    handleAttribute (val) {
      console.log(val)
      this.AttributeList.push(val)
    },
    handleOk (val) {
      this.getTagList()
    },
    intergralChange (val) {
      this.isIntegral = val.target.value
    },
    handleClose (removedTag) {
      const tags = this.keywords.filter(tag => tag !== removedTag)
      this.keywords = tags
    },

    showInput () {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleInputChange (e) {
      this.keyWordInput = e.target.value
    },

    handleInputConfirm () {
      const keyWordInput = this.keyWordInput
      let keywords = this.keywords
      if (keyWordInput && keywords.indexOf(keyWordInput) === -1) {
        keywords = [...keywords, keyWordInput]
      }
      console.log(keywords)
      Object.assign(this, {
        keywords,
        inputVisible: false,
        keyWordInput: ''
      })
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    },
    handleChange (file) {
      console.log('Upload file:', file)
      this.fileListLength = file.fileList.length
    },
    handleChange2 (file) {
      console.log('Upload file:', file)
      this.fileListLength2 = file.fileList.length
    },
    phoneCheck (rule, value, callbackFn) {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (value && !reg.test(value)) {
        callbackFn('请输入正确的手机号码！')
        } else {
          callbackFn()
      }
    },
    add () {
      this.visible = true
      this.title = '添加商品'
    },
    showDetail (val) {
      this.visible = true
      this.isShowDetail = true
      this.title = '编辑商品'
      this.rid = val.id
      const galleryList = []
      for (let i = 0; i < val.gallery.length; i++) {
        galleryList.push({
              uid: i * 100 + 1,
              name: '商品轮播图片',
              status: 'done',
              url: val.gallery[i]
        })
      }
      this.keywords = val.keywords
      this.AttributeList = val.attribute
      setTimeout(() => {
        const TagStrList = []
        for (const item of val.tag) {
          TagStrList.push(item.id)
        }
        this.form.setFieldsValue({
          merchantSerialNumber: val.merchantSerialNumber,
          serialNumber: val.serialNumber,
          name: val.name,
          isHot: val.isHot,
          isOnSale: val.isOnSale,
          unit: val.unit,
          categoryId: val.categoryId,
          brief: val.brief,
          remark: val.remark,
          picUrl: [{
              uid: '-1',
              name: '商品图片',
              status: 'done',
              url: val.picUrl
            }],
          gallery: galleryList,
          isUseIntegral: val.isUseIntegral,
          number: val.number,
          salePrice: val.salePrice,
          integralPrice: val.integralPrice,
          tag: TagStrList,
          attribute: val.attribute
        })
        this.fileListLength = 1
      }, 100)
    },
    update (val) {
      this.visible = true
      this.title = '编辑商品'
      this.rid = val.id
      const galleryList = []
      for (let i = 0; i < val.gallery.length; i++) {
        galleryList.push({
              uid: i * 100 + 1,
              name: '商品轮播图片',
              status: 'done',
              url: val.gallery[i]
        })
      }
      this.keywords = val.keywords
      this.AttributeList = val.attribute
      setTimeout(() => {
        const TagStrList = []
        for (const item of val.tag) {
          TagStrList.push(item.id)
        }
        this.form.setFieldsValue({
          merchantSerialNumber: val.merchantSerialNumber,
          serialNumber: val.serialNumber,
          name: val.name,
          isHot: val.isHot,
          isOnSale: val.isOnSale,
          unit: val.unit,
          categoryId: val.categoryId,
          brief: val.brief,
          remark: val.remark,
          picUrl: [{
              uid: '-1',
              name: '商品图片',
              status: 'done',
              url: val.picUrl
            }],
          gallery: galleryList,
          isUseIntegral: val.isUseIntegral,
          number: val.number,
          salePrice: val.salePrice,
          integralPrice: val.integralPrice,
          tag: TagStrList,
          attribute: val.attribute
        })
        this.fileListLength = 1
      }, 200)
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      this.confirmLoading = true
      validateFields((errors, values) => {
        console.log(values)
        if (!errors) {
          if (this.title === '添加商品') {
            const uploadData = JSON.parse(JSON.stringify(values))
            uploadData.tag = []
            for (const item of values.tag) {
              uploadData.tag.push({
                id: item
              })
            }
            uploadData.picUrl = uploadData.picUrl[0].response.result
            uploadData.gallery = []
            for (const item of values.gallery) {
              uploadData.gallery.push(item.response.result)
            }
            uploadData.gallery = JSON.stringify(uploadData.gallery)
            uploadData.keywords = this.keywords
            uploadData.keywords = JSON.stringify(uploadData.keywords)
            uploadData.attribute = this.AttributeList
            // uploadData.attribute = JSON.stringify(uploadData.attribute)
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
            uploadData.gallery = []
            for (const item of values.gallery) {
              uploadData.gallery.push(item.url || item.response.result)
            }
            uploadData.tag = []
            for (const item of values.tag) {
              uploadData.tag.push({
                id: item
              })
            }
            uploadData.gallery = JSON.stringify(uploadData.gallery)
            uploadData.keywords = this.keywords
            uploadData.keywords = JSON.stringify(uploadData.keywords)
            uploadData.attribute = this.AttributeList
            // uploadData.attribute = JSON.stringify(uploadData.attribute)
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
      this.keywords = []
      this.fileListLength = 0
      this.fileListLength2 = 0
      this.categoryList = []
      this.tagList = []
      this.keyWordInput = ''
      this.inputVisible = false
      this.isIntegral = 1
      this.AttributeList = []
      this.isShowDetail = false
      this.form.resetFields()
    }
  }
}
</script>
<style lang="less" scoped>
  .line{
    border-top: 1px solid #E8E8E8;
  }
  .valueTable{
    margin-top: 40px;
    .line{
      display: flex;
      height: 45px;
      line-height: 45px;
      .item{
        flex: 1;
      }
      .item2{
        flex: 0 0 100px;
        display:flex;
        align-items: center;
      }
    }
  }
</style>
