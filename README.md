# 组件 {{COMPONENT_NAME}}
{{COMPONENT_DESC}}

## 功能说明

这是一个基于 XXX 组件，支持以下功能：

- 加载并展示 GLTF/GLB 格式的 3D 模型

## 属性说明

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|---------|-------|
| code | string | demo.ts.tpl 模板内容 | Three.js 场景代码 |
| frameData | object | {} | 传递给 iframe 的数据 |
| readUrlCode | boolean | false | 是否从 URL 中读取代码 |

## 事件

| 事件名 | 参数 | 说明 |
|--------|------|-------|
| imgClick | { message: string } | 图片点击事件 |

## 方法

| 方法名 | 参数 | 说明 |
|--------|------|-------|
| resetCode | code: string | 重置场景代码 |

## 使用建议

1. 模型文件建议：
   - 使用 GLTF/GLB 格式的模型文件
   - 模型大小建议控制在 10MB 以内
   - 模型动画应包含 idle、walk、run 等基础动作

2. 代码编写建议：
   - 参考 demo.ts.tpl 模板进行场景搭建
   - 使用 Three.js 0.174 版本的 API
   - 注意内存管理，在适当时机释放资源

3. URL 参数说明：
   - three-code: Base64 编码的场景代码
   - show-button: 是否显示编辑按钮（true/false）

## 运行

```bash
pnpm install
pnpm run dev
```
