cc.Class({
    extends: cc.Component,



    onBeginContact: function (contact, selfCollider, otherCollider) {
        if(otherCollider.node.groupIndex == 1) {
            selfCollider.node.parent = otherCollider.node;
            selfCollider.node.x = 0;
            selfCollider.node.y = 0;
            var body = selfCollider.node.getComponent(cc.RigidBody);
            body.active = false;
        }

        if(otherCollider.node.groupIndex == 7 ) {
            cc.log('7777');
        }
    }

    
})