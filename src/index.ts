import component from './index.vue';
// import editorComponent from './editor.vue';

export default {
  name: 'text',
  component,
  // 如果编辑态没有什么差别的话，editorComponent 可以没有
  // editorComponent,
  config: {
    dataSource: {},
    actions: [
      {
        actionKey: 'changeMessage',
        actionName: '修改文本',
        params: [
          {
            paramName: '文本',
            paramKey: 'msg',
            valueType: 'string'
          }
        ]
      }
    ],
    events: [
      {
        eventKey: 'imgClick',
        eventName: '图片点击事件',
        params: [
          {
            paramName: '返回的消息文本',
            paramKey: 'message',
            valueType: 'string'
          }
        ]
      }
    ]
  }
};
