import { defineComponent } from 'vue'

import VisualEditor from '@/components/visualEditor'
import styles from './css/Content.module.scss'

export default defineComponent({
  name: 'ContentBase',
  setup() {
    return () => {
      return (
        <div class={styles.contentContainer}>
          <VisualEditor class={styles.visualEditorWrapper} />
        </div>
      )
    }
  }
})
