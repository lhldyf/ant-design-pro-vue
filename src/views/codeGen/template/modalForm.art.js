export const formTemplate =
'<template>' + '\n' +
'  <a-modal' + " :title='title'" + " :width='600'" + " :visible='visible'" + " :confirmLoading='confirmLoading'" + '\n' +
"           @ok='handleOk'" + " @cancel='handleCancel'" + " cancelText='关闭'" + '>' + '\n' +
"    <a-spin :spinning='confirmLoading'>" + '\n' +
"      <a-form :form='form'>" + '\n' +
"        <a-row :gutter='48'>" + '\n' +
'        {{each formItems formItem}}' + '\n' +
"          <a-form-item label='{{formItem.tagName}}' :labelCol='labelCol' :wrapperCol='wrapperCol'>" + '\n' +
"           {{if formItem.componentTpye == 'select'}}" + '\n' +
"            <a-select placeholder='请选择{{formItem.tagName}}' v-decorator='['{{formItem.columnName}}', validatorRules.{{formItem.columnName}}]' :triggerChange='true' dictCode='{{formItem.componentSetting}}'>" + '\n' +
'            </a-select>' + '\n' +
"            {{else if formItem.componentTpye == 'textarea'}}" + '\n' +
"            <a-textarea placeholder ='请输入{{formItem.tagName}}' :autosize='{minRows: 2, maxRows: 4}' v-decorator='['{{formItem.columnName}}', validatorRules.{{formItem.columnName}}]'/>" + '\n' +
"            {{else if formItem.componentTpye == 'input'}}" + '\n' +
"            <a-input placeholder ='请选择{{formItem.tagName}}' v-decorator='['{{formItem.columnName}}', validatorRules.{{formItem.columnName}}]'/>" + '\n' +
'            {{/if}}' + '\n' +
'          </a-form-item>' + '\n' +
'         {{/each}}' + '\n' +
'        </a-row>' + '\n' +
'      </a-form>' + '\n' +
'    </a-spin>' + '\n' +
'  </a-modal>' + '\n' +
'</template>' + '\n' +
'' + '\n' +
'<script>' + '\n' +
"import { ModalMixins } from '@/mixins/ModalMixins'" + '\n' +
'' + '\n' +
'export default {' + '\n' +
"  name: '{{frontendEntityName}}Modal'," + '\n' +
'  mixins: [ModalMixins],' + '\n' +
'  data() {' + '\n' +
'    return {' + '\n' +
'      validatorRules: {' + '\n' +
'        {{each formItems formItem}}' +
"        {{formItem.columnName}}: { rules: [{ required: true, message: '请输入{{formItem.tagName}}' }] }," + '\n' +
'        {{/each}}' +
'      },' + '\n' +
"      initFields: [{{each formItems formItem}} '{{formItem.columnName}}', {{/each}}]" + '\n' +
'    }' + '\n' +
'  }' + '\n' +
'}' + '\n' +
'</script>' + '\n'
