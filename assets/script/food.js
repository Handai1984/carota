cc.Class({
    extends: cc.Component,


    broken() {
        cc.log('broken');
        this.node.destroy();
    },
    
   

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.node.groupIndex == 1) {
            cc.log('haha');
            var anim = selfCollider.node.getComponent(cc.Animation);
            var body = selfCollider.node.getComponent(cc.RigidBody);
            var gm = cc.director.getScene().getChildByName('Canvas').getComponent('GM');

            body.active = false;
           otherCollider.node.parent = selfCollider.node;
           otherCollider.node.position = cc.p(selfCollider.node.x,selfCollider.node.y);

           anim.play();
           gm.GameisLose();//游戏结束
        }
        if(otherCollider.node.groupIndex == 4) {
            cc.log('haha');
            var anim = selfCollider.node.getComponent(cc.Animation);
            var body = selfCollider.node.getComponent(cc.RigidBody);
            body.active = false;
           otherCollider.node.parent = selfCollider.node;
           otherCollider.node.position = cc.p(selfCollider.node.x,selfCollider.node.y);

           anim.play();
        }

       
    },

})