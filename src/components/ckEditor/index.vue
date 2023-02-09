<template>
  <div :class="hasBorder? 'ckedit-container-border' : 'ckedit-container'" >
    <div :id="id" ref="ck_ + id" class="ckedit-textarea" :contenteditable="true"></div>
  </div>
  <!-- <div :id="id" :ref="'ck_' + id" class="ckedit-textarea breakAll" contenteditable="true"></div> -->
</template>

<script setup lang="ts">
const { VITE_GLOB_CKEDITOR_URL } = process.env
const { VITE_GLOB_API_URL } = process.env
import { useUserStoreWithOut } from '@/store/modules/user'
const userStore = useUserStoreWithOut()
 const props = defineProps({
  id: {
    required: true,
    type: String
  },

  disabled: {
    type: Boolean,
    default: false
  },
   hasBorder: {
      type: Boolean,
      default: true
    },
})


const ckEdit = ref<any>(null)
const editConfig = {
  customConfig: VITE_GLOB_CKEDITOR_URL + '/libs/ckeditor4/config-queslist-new.js',
  filebrowserUploadUrl: VITE_GLOB_API_URL + '/uploadFile/uploadEditorQuesImages'
}
function initCKEditor(item: any) {

  const id = 'ck_' + props.id
  const html = 'item.blockTitle'
  console.log(window)
  console.log(window.CKEDITOR)
  const editorList = Object.keys(window.CKEDITOR.instances)
  // 最多实例化1个编辑器 多余的去除了
  if (editorList && editorList.length > 0) {
    window.CKEDITOR.instances[editorList[0]].destroy()
   ckEdit.value = null
  }
  if (ckEdit) {
    return
  }

  nextTick(() => {
    //禁用自动模式
    if (!window.CKEDITOR.disableAutoInline) { window.CKEDITOR.disableAutoInline = true }
    ckEdit = window.CKEDITOR.inline(id, editConfig)
    ckEdit.config.title = false
    //设置初始值
    ckEdit.setData(html)
    // 值变化
    ckEdit.on('change', (e: any) => {
      //增加防抖 快速输入时，300就不行了，可能输入不上，
      // if (changeEvent) clearTimeout(changeEvent)
      let changeEvent = setTimeout(() => {
        const str = ckEdit.getData()
        console.log(str)
        //检测并转化公式
        var $selection = ckEdit.getSelection()//当前选中区域
        var $bookmarks = $selection.createBookmarks2()//当前光标
        nextTick(() => {
          setTimeout(() => {
            // 将光标位置还原
            $selection.selectBookmarks($bookmarks)
          })
        })
      }, 30)
    })

    ckEdit.config.filebrowserUploadUrl = editConfig.filebrowserUploadUrl
    ckEdit.on('fileUploadRequest', function (evt: any) {
      const xhr = evt.data.fileLoader.xhr
      const accessToken = userStore.getToken
      if (accessToken) {
        xhr.setRequestHeader('Authorization', accessToken)
      }
    })

    window.CKEDITOR.on('instanceReady', function (ev: any) {
      const pgcon = {
        // Indicates that this tag causes indentation on line breaks inside of it.
        indent: false,
        // Inserts a line break before the <p> opening tag.
        breakBeforeOpen: false,
        // Inserts a line break after the <p> opening tag.
        breakAfterOpen: false,
        // Inserts a line break before the </p> closing tag.
        breakBeforeClose: false,
        // Inserts a line break after the </p> closing tag.
        breakAfterClose: false
      }
      ev.editor.dataProcessor.writer.setRules('p', pgcon)
      ev.editor.dataProcessor.writer.setRules('div', pgcon)
      ev.editor.dataProcessor.writer.setRules('choice', pgcon)
      ev.editor.dataProcessor.writer.setRules('table', pgcon)
      ev.editor.dataProcessor.writer.setRules('tbody', pgcon)
      ev.editor.dataProcessor.writer.setRules('tr', pgcon)
      ev.editor.dataProcessor.writer.setRules('td', pgcon)
      ev.editor.dataProcessor.writer.setRules('span', pgcon)
    })
    //粘贴监听事件
    ckEdit.on('paste', (evt: any) => {
      //如果是粘贴的图片的话
      // if (evt.data.dataTransfer.getFilesCount() > 0 && evt.data.dataTransfer._.files[0].type.indexOf('image/') !== -1) {
      //   const param = new FormData()
      //   param.append('upload', evt.data.dataTransfer._.files[0])
      //   imgUpload(param).then((res:any) => {
      //     const image = new Image()
      //     image.src = res.url
      //     image.onload = () => {
      //       const img = `<img width="${image.width}" height="${image.height}" alt="" src="${res.url}" title="${res.title}">`
      //       ckEdit.insertHtml(img)
      //       ckEdit.setData(ckEdit.getData().replace(evt.data.dataValue, ''))
      //     }
      //   }).catch((res:any) => {
      //     this.$message({
      //       message: res.message,
      //       type: 'error'
      //     })
      //     ckEdit.setData(ckEdit.getData().replace(evt.data.dataValue, ''))
      //   })
      // }
    })
  })
}
onMounted(() => {
  initCKEditor('1')
})
watch(props,()=>[
  initCKEditor('1')
],{deep:true})
</script>

<style scoped lang="scss">
  .ckedit-container-border {
    height: 100%;
    border: 1px solid #D5DAE5;
    border-radius: 4px;
    width: 100%;
    .ckedit-textarea {
      overflow: auto;
      min-height: 80px;
      padding: 15px 10px;
    }
  }
  .ckedit-container {
    overflow-x: hidden;
    height: 100%;
    width: 100%;
    .ckedit-textarea {
      overflow: auto;
      min-height: 80px;
      padding: 15px 10px;
    }
  }
</style>