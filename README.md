# 组件 {{COMPONENT_NAME}}
{{COMPONENT_DESC}}

## 功能说明

这是一个基于 代码游乐场 组件，支持以下功能：

- 编辑 场景代码
- 实时预览场景效果
- 支持 URL 参数传递场景代码

单独一个组件作为首页即可实现一个远程代码游乐场应用


## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|---------|-------|
| code | string | demo.ts.tpl 模板内容 | Three.js 场景代码 |
| frameData | object | {} | 传递给 iframe 的数据 |
| readUrlCode | boolean | false | 是否从 URL 中读取代码 |
| urlQueryName | string | 'code' | URL 中路径参数名称 |

## 动作

| 动作名 | 参数 | 说明 |
|--------|------|-------|
| resetCode | code: string | 重置场景代码 |
| runFrameAction | name: string, value: string | 执行场景中的动作 |


## 使用建议

1. 模板文件说明
    - **demo.ts.tpl**: 样例代码模板
        - 预设代码模板
    - **frame.html.tpl**: iframe 页面模板
        - 设置基础样式和容器
        - 注入预设脚本和用户代码
    - **preset.ts.tpl**: 场景预设代码模板，提供组件间通信能力
        - `METAV_PROPS`: 属性代理对象，用于获取父组件传递的属性
        - `METAV_EVENTS`: 事件触发器，用于向父组件发送事件
        - `METAV_FRAME_ACTIONS`: 动作注册对象，用于注册可被外部调用的方法

2. 模板变量说明
    - `{{METAV_PUBLIC_PATH}}`: MetaV 静态资源路径
    - `{{PLAYGROUND_SRC_PATH}}`: 游乐场源码路径，用于加载 Three.js 库
    - `{{FRAME_ID}}`: iframe 元素的唯一标识符
    - `{{PRESET_SCRIPT_CODE}}`: 预设脚本代码，提供组件通信能力
    - `{{SCRIPT_CODE}}`: 用户编写的 Three.js 场景代码
    - `PROPS.modelPath`: 通过属性传递的模型文件路径
    

## 运行

```bash
pnpm install
pnpm run dev
```
