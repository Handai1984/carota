cc.Class({
    extends: cc.Component,

    properties: {
        speed: 0,
        keynode: cc.Node,
    },

    start() {
        this.isxmove = false;
        this.isymove = true;
       
        this.locked = true;
        this.food_count = 0;
    },
    move(event) {
        
        this.moveto(event);
        
        
    },
    moveto(event) {
       // cc.log('playerparent:' + this.node.parent.name);
        var pos = event.getLocation();
        pos = this.node.parent.convertToNodeSpaceAR(pos);
        var dis = cc.v2(pos).sub(this.node.position);
        dis = dis.normalize();
        if (dis.x < 0) {
            this.node.scale = cc.p(-1, 1);
        } else {
            this.node.scale = cc.p(1, 1);
        }
        //  cc.log('dis:' + cc.p(dis.x,dis.y));
        var body = this.node.getComponent(cc.RigidBody);
        //    if(body.linearVelocity.x <= 0.1 || body.linearVelocity.y <= 0.1){
        //        this.ismove = false;
        //    }
        body.linearVelocity = cc.p(100 * dis.x, 100 * dis.y);

    },
    //返回food个数
    returnfood_count() {
        return this.food_count;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.node.groupIndex == 2) {
            this.node.getComponent(cc.RigidBody).linearVelocity = cc.p();
        }
        if (otherCollider.node.groupIndex == 3) {
            var anim = otherCollider.node.getComponent(cc.Animation);
            var body = otherCollider.node.getComponent(cc.RigidBody);
            body.active = false;
            anim.play();
            this.food_count ++;
        }
        if (otherCollider.node.groupIndex == 6) {
            otherCollider.node.destroy();
            this.keynode.active = true;
            this.locked = false;
        }

        if(otherCollider.node.groupIndex == 7) {
            if(this.locked) return;
            this.locked = true;
            this.keynode.active = false;
            var anim = otherCollider.node.getComponent(cc.Animation);
            var body = otherCollider.node.getComponent(cc.RigidBody);
            body.active = false;
            anim.play();
            
        }
        
    },

    onEndContact: function (contact, selfCollider, otherCollider) {
        cc.log('end');
        var collider = otherCollider.node.getComponent(cc.PhysicsBoxCollider);
        if(otherCollider.node.groupIndex == 8 && collider.sensor == true ) {
            var anim = otherCollider.node.getComponent(cc.Animation);
            anim.play();
            collider.sensor = false;
        }
    },



    update(dt) {}



})