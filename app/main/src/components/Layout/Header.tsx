import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'

import styles from './css/Header.module.scss'

export default defineComponent({
  name: 'HeaderBase',
  setup() {
    function handleSave() {
      console.log('save')
    }

    function handleImportJson() {
      console.log('import json')
    }

    function handleRedo() {
      console.log('redo')
    }
    return () => {
      return (
        <div>
          <div class={styles.optionsBtns}>
            <NButton strong secondary type="primary" onClick={handleSave}>
              保存
            </NButton>
            <NButton strong secondary type="primary" onClick={handleImportJson}>
              导入JSON
            </NButton>
            <NButton strong secondary type="primary" onClick={handleRedo}>
              重做
            </NButton>
          </div>
        </div>
      )
    }
  }
})
