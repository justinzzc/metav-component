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
        actionKey: 'resetCode',
        actionType: 'comp',
        actionName: '设置代码',
        params: [
          {
            paramName: '代码',
            paramKey: 'code',
            valueType: 'string'
          }
        ]
      },
      {
        actionKey:'runFrameAction',
        actionType: 'comp',
        actionName: '组件动作',
        params: [
          {
            paramName: '名称',
            paramKey: 'name',
            valueType:'string'
          },
          {
            paramName: '参数',
            paramKey: 'value',
            valueType: 'string'
          }
        ]
      }
    ],
    events: [
      {
        eventKey: 'frameEvent',
        eventType: 'comp',
        eventName: '组件事件',
        params: [
          {
            paramName: '类型',
            paramKey: 'type',
            valueType: 'string'
          },
          {
            paramName: '参数',
            paramKey: 'value',
            valueType: 'object'
          }
        ]
      }
    ]
  }
};
