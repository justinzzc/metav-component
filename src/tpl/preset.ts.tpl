window.METAV_PROPS = new Proxy({},{
    get: function (obj,key) {
        const frame = window.parent.document.getElementById('{{FRAME_ID}}')
        return frame.getAttribute(key)
    }
})

window.METAV_EVENTS = {
    trigger(type,value){
         const frame = window.parent.document.getElementById('{{FRAME_ID}}')
         frame.dispatchEvent(
            new CustomEvent('frameEvent', {
            detail: {
                type: type,
                value: value
            }
            })
        )
    }
}

window.METAV_FRAME_ACTIONS = {
    //TODO 需要的操作添加到这个对象下面
}