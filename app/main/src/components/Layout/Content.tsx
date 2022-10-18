import { defineComponent, ref } from 'vue'

import VisualEditor from '@/components/visualEditor'
import styles from './css/Content.module.scss'

export default defineComponent({
  name: 'ContentBase',
  setup() {
    const show = ref(true)
    return () => {
      return (
        <div class={styles.contentContainer}>
          <button onClick={() => (show.value = !show.value)}>点击</button>
          {show.value && <VisualEditor class={styles.visualEditorWrapper} />}
        </div>
      )
    }
  }
})
