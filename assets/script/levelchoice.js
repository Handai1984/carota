cc.Class({
    extends: cc.Component,

    properties: {
        level_pre: cc.Prefab,
        level_num : 0,
    },

    onLoad() {
        this.creatlevels(this.level_num);
    },


    creatlevels(num) {
        for(var i = 0; i < num; i++) {
            var node = cc.instantiate(this.level_pre);
            node.name = i+1 + '';
            this.node.addChild(node);
            var label = node.getComponent('displaylevel');
            label.disnum(i+1);

        }

    }
})