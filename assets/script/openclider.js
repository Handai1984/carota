cc.Class({
    extends: cc.Component,

    onLoad() {
        // var manager = cc.director.getCollisionManager();
        // manager.enabled = true;
        // manager.enabledDebugDraw = true;
        cc.director.getPhysicsManager().enabled = true;
    }
})