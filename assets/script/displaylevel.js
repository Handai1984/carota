cc.Class({
    extends: cc.Component,

    properties: {
        dis_num : cc.Label,
    
    },



    onLoad() {
      
    },
    disnum(num) {
        this.dis_num.string = num + '';
        this.addButtonEvent(num);
    },
    
    addButtonEvent(num) {
        var clickEventHandler = new cc.Component.EventHandler();
        var gm = cc.director.getScene().getChildByName('Canvas');
        clickEventHandler.target =gm; //这个 node 节点是你的事件处理代码组件所属的节点
        clickEventHandler.component = "GM";//这个是代码文件名
        clickEventHandler.handler = "callback";
        clickEventHandler.customEventData = num;
    
        var button = this.node.getComponent(cc.Button);
        button.clickEvents.push(clickEventHandler);

    }
})