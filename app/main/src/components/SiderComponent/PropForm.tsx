import { defineComponent, computed, PropType, reactive } from 'vue'
import {
  ComEditorPropsValueType,
  ComEditorPropType,
  ComEditorWidgetType
} from '@visual/components'
import {
  FormItemRule,
  FormRules,
  NColorPicker,
  NFormItem,
  NInput,
  NInputNumber,
  NSelect,
  NSwitch
} from 'naive-ui'
import { validateField } from '@/shared'

type FormDataItem = Omit<ComEditorPropsValueType, 'type'> & {
  key: string
  rule: FormRules
}

const props = {
  data: {
    type: Object as PropType<ComEditorPropType<Record<string, any>>>,
    default: () => ({})
  }
} as const

export default defineComponent({
  name: 'PropForm',
  props,
  setup(props) {
    function dispathWidgets(type: ComEditorWidgetType, item: FormDataItem) {
      const data = props.data[item.key]
      switch (type) {
        case ComEditorWidgetType.INPUT:
          return <NInput v-model={[data.defaultValue, 'value']} />
        case ComEditorWidgetType.COLOR:
          return (
            <NColorPicker
              size="large"
              modes={['hex']}
              v-model={[data.defaultValue, 'value']}
            />
          ) // 颜色 暂时写成input
        case ComEditorWidgetType.INPUTNUMBER:
          return <NInputNumber v-model={[data.defaultValue, 'value']} />
        case ComEditorWidgetType.SELECT:
          return (
            <NSelect
              options={item.options}
              v-model={[data.defaultValue, 'value']}
            />
          )
        case ComEditorWidgetType.SWITCH:
          return <NSwitch v-model={[data.defaultValue, 'value']} />
        default:
          return null
      }
    }
    const formData = computed(() => {
      const data = props.data
      return reactive(
        Object.keys(data).map(key => {
          const rule: FormRules = {
            [key]: [
              {
                trigger: ['input', 'blur'],
                validator(rule: FormItemRule, value: string) {
                  const type = data[key].type
                  if (!validateField(value, type)) {
                    if (type === Number) return new Error('该字段类型是数字')
                    if (type === String) return new Error('该字段类型是字符串')
                    if (type === Boolean)
                      return new Error('该字段类型是布尔类型')
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
      )
    })
    return () => {
      return (
        <div style={{ padding: '12px' }}>
          {formData.value.map(formItem => (
            <NFormItem
              key={formItem.key}
              label={formItem.alias}
              rule={formItem.rule}
            >
              {dispathWidgets(formItem.widgetType, formItem)}
            </NFormItem>
          ))}
        </div>
      )
    }
  }
})
