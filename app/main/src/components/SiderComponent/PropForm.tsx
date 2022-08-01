import { defineComponent, computed, PropType } from 'vue'
import { ComEditorPropType, ComEditorWidgetType } from '@visual/components'
import {
  FormItemRule,
  FormRules,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSwitch
} from 'naive-ui'

const props = {
  data: {
    type: Object as PropType<ComEditorPropType<Record<string, any>>>,
    default: () => ({})
  }
} as const

function dispathWidgets(type: ComEditorWidgetType) {
  switch (type) {
    case ComEditorWidgetType.INPUT:
      return NInput
    case ComEditorWidgetType.COLOR:
      return NInput // 颜色 暂时写成input
    case ComEditorWidgetType.INPUTNUMBER:
      return NInputNumber
    case ComEditorWidgetType.SELECT:
      return NSelect
    case ComEditorWidgetType.SWITCH:
      return NSwitch
    default:
      return null
  }
}

function showWidgetsBytype(type: ComEditorWidgetType) {
  const Component = dispathWidgets(type)
  return Component ? <Component /> : null
}

export default defineComponent({
  name: 'PropForm',
  props,
  setup(props) {
    const formData = computed(() => {
      const data = props.data
      return Object.keys(data).map(key => {
        const rule: FormRules = {
          [key]: [
            {
              trigger: ['input', 'blur'],
              validator(rule: FormItemRule, value: string) {
                const type = data[key].type
                if (type === Number) {
                  if (isNaN(Number(value))) {
                    return new Error('该字段类型是数字')
                  }
                } else if (type === String) {
                  if (String(value) !== value) {
                    return new Error('该字段类型是字符串')
                  }
                } else if (type === Boolean) {
                  if (isNaN(Number(value))) {
                    return new Error('该字段类型是布尔类型')
                  }
                }
                return true
              }
            }
          ]
        }

        return {
          defaultValue: data[key].defaultValue,
          widgetType: data[key].widgetType,
          options: data[key].options,
          alias: data[key].alias,
          key,
          rule
        }
      })
    })
    return () => {
      return formData.value.map(formItem => (
        <NFormItem label={formItem.alias} rule={formItem.rule}>
          {showWidgetsBytype(formItem.widgetType)}
        </NFormItem>
      ))
    }
  }
})
