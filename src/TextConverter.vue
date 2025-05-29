<template>
  <div class="text-converter">
    <div class="converter-header">
      <h3>生成分享链接</h3>
      <button class="close-btn" @click="$emit('close')">×</button>
    </div>
    <div class="converter-body">
      <div class="input-group full">
        <div ref="editorRef" class="code-editor"></div>
      </div>
      <div class="actions">
        <button @click="applyCode" class="apply-btn">应用代码</button>
        <button @click="generateLink">生成链接</button>
      </div>
      <div class="input-group">
        <label>分享链接：</label>
        <div class="link-output">
          <input type="text" v-model="outputText" readonly />
          <button class="copy-btn" @click="copyLink" :class="{ copied: isCopied }">{{ isCopied ? '已复制' : '复制' }}</button>
          <button class="open-btn" @click="openLink" :disabled="!outputText">打开</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import * as Utils from './utils';
import { EditorView, basicSetup } from 'codemirror';
import { keymap } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { indentWithTab } from '@codemirror/commands';

const emit = defineEmits(['close', 'apply']);
const props = defineProps<{
  code: string;
  codeName: string;
}>();

const editorRef = ref<HTMLElement | null>(null);
const editorView = ref<EditorView | null>(null);
const inputText = ref('');
const outputText = ref('');
const isCopied = ref(false);

onMounted(() => {
  if (editorRef.value) {
    editorView.value = new EditorView({
      doc: inputText.value,
      extensions: [
        basicSetup,
        javascript({ typescript: true }),
        oneDark,
        keymap.of([indentWithTab]),
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            inputText.value = update.state.doc.toString();
          }
        })
      ],
      parent: editorRef.value
    });
  }
});

function generateLink() {
  if (!inputText.value.trim()) {
    return;
  }
  try {
    const encodedCode = Utils.utoa(inputText.value);
    const currentUrl = new URL(window.location.href);

    // 使用正则替换或追加参数
    const urlStr = currentUrl.toString();
    const regex = new RegExp(`([?&])${props.codeName}=[^&]*(&|$)`);
    if (regex.test(urlStr)) {
      outputText.value = urlStr.replace(regex, `$1${props.codeName}=${encodedCode}$2`);
    } else {
      const separator = currentUrl.search ? '&' : '?';
      outputText.value = `${urlStr}${separator}${props.codeName}=${encodedCode}`;
    }
  } catch (error) {
    console.error('生成链接失败:', error);
    outputText.value = '生成链接失败: ' + (error instanceof Error ? error.message : String(error));
  }
}

function copyLink() {
  if (!outputText.value) return;

  navigator.clipboard.writeText(outputText.value).then(() => {
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  });
}

function openLink() {
  if (!outputText.value) return;
  window.open(outputText.value, '_blank');
}

// 初始化输入文本
inputText.value = props.code;

function applyCode() {
  if (!inputText.value.trim()) return;
  emit('apply', inputText.value);
}
</script>

<style lang="less" scoped>
.text-converter {
  background-color: #2a2a2a;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  width: 95vw;
  height: 95vh;
  color: #e0e0e0;
  display: flex;
  flex-direction: column;

  opacity: 0.5;
  &:hover {
    opacity: 1;
  }

  .converter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid #444;

    h3 {
      margin: 0;
      font-size: 18px;
    }

    .close-btn {
      background: none;
      border: none;
      color: #aaa;
      font-size: 24px;
      cursor: pointer;
      padding: 0;
      line-height: 1;

      &:hover {
        color: #fff;
      }
    }
  }

  .converter-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    flex: 1;

    .input-group {
      margin-bottom: 16px;
      position: relative;

      &.full {
        flex: 1;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
      }

      .code-editor {
        width: 100%;
        height: 100%;
        overflow: auto;
        border: 1px solid #555;
        border-radius: 4px;
        position: absolute;

        .cm-editor {
          height: 100%;
          font-size: 14px;
        }

        .cm-scroller {
          overflow: auto;
        }
      }

      .link-output {
        display: flex;
        gap: 8px;

        .open-btn {
          background-color: #17a2b8;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;

          &:hover {
            background-color: #138496;
          }

          &:disabled {
            background-color: #6c757d;
            cursor: not-allowed;
          }
        }

        input[type='text'] {
          flex: 1;
          background-color: #333;
          border: 1px solid #555;
          border-radius: 4px;
          color: #e0e0e0;
          padding: 8px;
          font-family: monospace;

          &:focus {
            outline: none;
            border-color: #007bff;
          }

          &[readonly] {
            background-color: #2a2a2a;
            cursor: default;
          }
        }

        .copy-btn {
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 8px 16px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
          white-space: nowrap;

          &:hover {
            background-color: #218838;
          }

          &.copied {
            background-color: #666;
            cursor: default;
          }
        }
      }
    }

    .actions {
      display: flex;
      justify-content: center;
      gap: 16px;
      margin-bottom: 16px;
      height: 40px;

      button {
        color: white;
        border: none;
        border-radius: 4px;

        &.apply-btn {
          background-color: #28a745;

          &:hover {
            background-color: #218838;
          }
        }

        &:not(.apply-btn) {
          background-color: #007bff;

          &:hover {
            background-color: #0056b3;
          }
        }
        padding: 8px 16px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;

        &:hover {
          background-color: #0069d9;
        }
      }
    }
  }
}
</style>
