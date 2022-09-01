import { defineComponent, ref } from 'vue'

import VisualEditor from '@/components/visualEditor'
import styles from './css/Content.module.scss'

export default defineComponent({
  name: 'ContentBase',
  setup() {
    const flag = ref(true)
    function handleClick() {
      flag.value = false
    }
    return () => {
      return (
        <div class={styles.contentContainer}>
          <button onClick={handleClick}>点击</button>

          {flag.value && <VisualEditor class={styles.visualEditorWrapper} />}
        </div>
      )
    }
  }
})
