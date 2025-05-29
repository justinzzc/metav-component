<template>
  <div class="demo">
    <iframe :srcdoc="srcSoc" :id="frameId" frameborder="0" :modelPath="modelPath" :frameData="frameData" @frameEvent="onFrameEvent"></iframe>
    <button class="tool-btn" v-show="showEditor" @click="showConverter = true" title="文本转换工具">
      <span>编辑</span>
    </button>
    <div class="modal-overlay" v-if="showConverter" @click.self="showConverter = false">
      <TextConverter @close="showConverter = false" :codeName="getRealParamName()" @apply="handleApplyCode" :code="currentCode" />
    </div>
  </div>
</template>

<script setup lang="ts">
import FrameTemplate from './tpl/frame.html.tpl';
import PresetCodeTemplate from './tpl/preset.ts.tpl';
import CodeTemplate from './tpl/demo.ts.tpl';

import { getCurrentInstance, onMounted, ref, watch } from 'vue';

import TextConverter from './TextConverter.vue';
import * as Utils from './utils';
import PkgJson from '../../package.json';

const frameId = `${PkgJson.name}-playground-${getCurrentInstance()?.uid}`;

const srcSoc = ref('');
const showConverter = ref(false);
const currentCode = ref('');

const emits = defineEmits({
  frameEvent: (type: string, value: any) => true
});

function onFrameEvent(event: CustomEvent) {
  const { type, value } = event.detail;
  emits('frameEvent', type, value);
}

const props = defineProps({
  code: {
    type: String,
    default: CodeTemplate,
    //用于显示的标题名称
    title: '代码',
    //设置器类型
    setter: 'jsCode',
    //设置器配置
    setterConfig: {
      language: 'typescript'
    }
  },
  modelPath: {
    type: String,
    default: '',
    //用于显示的标题名称
    title: '模型',
    //设置器类型
    setter: 'assetsUploader',
    //设置器配置
    setterConfig: {
      fileType: 'model'
    }
  },
  frameData: {
    type: Object,
    default: () => {
      return {};
    },
    title: '传入数据',
    setter: 'text'
  },
  readUrlCode: {
    type: Boolean,
    default: false,
    title: '是否从url中读取代码',
    setter: 'switch'
  },
  urlQueryName: {
    type: String,
    default: 'code',
    title: '路径参数名称',
    setter: 'text'
  }
});

if (!props.readUrlCode) resetCode(props.code);

watch([() => props.code, () => props.modelPath], ([code, modelPath], [oldCode, oldModelPath]) => {
  if (props.readUrlCode && modelPath == oldModelPath) return;
  resetCode(code);
});

function handleApplyCode(code: string) {
  // currentCode.value = code;
  resetCode(code);
  // showConverter.value = false;
}

function resetCode(code: string | undefined) {
  console.log('resetCode', code);
  currentCode.value = code || '';
  if (!code || !code.trim()) {
    srcSoc.value = '';
    return;
  }
  let presetText = PresetCodeTemplate.replace(/\{\{METAV_PUBLIC_PATH\}\}/g, __metav_public_path__);
  presetText = presetText.replace(/\{\{PLAYGROUND_SRC_PATH\}\}/g, `${__metav_public_path__}PlaygroundSource/`);
  presetText = presetText.replace(/\{\{FRAME_ID\}\}/g, frameId);

  let srcText = FrameTemplate.replace(/\{\{METAV_PUBLIC_PATH\}\}/g, __metav_public_path__);
  srcText = srcText.replace(/\{\{PLAYGROUND_SRC_PATH\}\}/g, `${__metav_public_path__}PlaygroundSource/`);
  srcText = srcText.replace(/\{\{PRESET_SCRIPT_CODE\}\}/g, presetText);
  srcText = srcText.replace(/\{\{SCRIPT_CODE\}\}/g, code);

  srcSoc.value = srcText;
}

const showEditor = ref(false);

function getRealParamName() {
  return props.urlQueryName?.trim() || 'code';
}

onMounted(() => {
  if (props.readUrlCode) {
    const codeRegex = new RegExp(`[?&]${getRealParamName()}=([^&]*)(&|$)`, 'i');

    // 使用正则表达式从URL中提取code参数
    const codeMatch = window.location.href.match(codeRegex);
    const code = codeMatch ? decodeURIComponent(codeMatch[1]) : null;
    if (code) {
      resetCode(Utils.atou(code));
    }

    const showButtonMatch = window.location.href.match(/[?&]show-button=([^&]*)/);
    if (showButtonMatch && showButtonMatch[1] == 'true') {
      showEditor.value = true;
    }
  } else {
    showEditor.value = true;
  }
});

defineExpose({
  resetCode,
  runFrameAction(name: string, params: any[] | string) {
    const iframe = document.getElementById(frameId) as HTMLIFrameElement;
    const action = iframe.contentWindow?.['METAV_FRAME_ACTIONS']?.[name];
    if (!action) {
      throw new Error(`Frame action ${name} not found`);
    }
    if (typeof params === 'string') {
      try {
        params = JSON.parse(params);
      } catch (error) {
        throw new Error(`Frame action ${name} params is not a valid JSON string`);
      }

      if (!Array.isArray(params)) {
        params = [params];
      }
    }
    return action(...params);
  }
});
</script>

<style lang="less" scoped>
.demo {
  width: 100%;
  height: 100%;
  color: white;
  position: relative;

  > iframe {
    width: 100%;
    height: 100%;
  }

  .tool-btn {
    position: absolute;
    left: 16px;
    bottom: 16px;
    background-color: rgba(0, 123, 255, 0.8);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    z-index: 10;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba(0, 105, 217, 0.9);
    }
  }

  .modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
}
</style>
