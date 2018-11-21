cc.Class({
    extends: cc.Component,

    properties: {
        //按钮节点
        button_node: cc.Node,
        levelLabel: cc.Label,
        win_node: cc.Node,
        lose_node: cc.Node,
        buttonwinorlose_node: cc.Node,
    },


    onLoad() {
        // this.playerInit();
        this.currentlevel = null; //关卡存放点
        this.gameover = true; //游戏结束
        this.num = 0; //当前关卡数字
        this.food_count = 0; //关卡中的food总数
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            if (this.gameover) return;
            if (this.food_count == this.player.returnfood_count()) {
                this.GameisWin();
                return;
            }
            this.player.move(event);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (this.gameover) return;
            if (this.food_count == this.player.returnfood_count()) {

                this.GameisWin();
                return;
            }
            this.player.move(event);
        }, this);
    },
    //游戏结束
    GameisWin() {
        this.buttonwinorlose_node.active = true;
        this.lose_node.active = false;
        this.win_node.active = true;
        this.gameover = true;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
    },
    //游戏结束--失败
    GameisLose() {
        this.buttonwinorlose_node.active = true;
        this.lose_node.active = true;
        this.win_node.active = false;
        this.gameover = true;
    },

    //从新开始关卡
    restartlevel() {
        this.buttonwinorlose_node.active = false;
        this.clearlevel();
        this.creatLevel(this.num);
        this.gameover = false;
        this.food_count = 0;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
    },

    //返回选择关卡画面
    chooselevel() {
        this.buttonwinorlose_node.active = false;
        this.food_count = 0;
        this.button_node.active = false;
        this.clearlevel();
        var leveNode = this.node.getChildByName('level');
        leveNode.active = true;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
    },
    //下一关
    nextlevel() {
        this.num++;
        this.clearlevel();
        this.creatLevel(this.num);
        this.gameover = false;
        this.food_count = 0;
        this.buttonwinorlose_node.active = false;
        jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity","showInter","()V");
    },

    //2寻找player节点，并且统计food个数
    playerInit(level) {
        this.currentlevel = level;
        this.playerNode = level.getChildByName('player');
        cc.log('player68:' + this.playerNode.name);
        this.player = this.playerNode.getComponent('player');
        //遍历level节点下所有子节点，如果是food那就统计个数
        var nodes = level.children;
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].groupIndex == 3) {
                this.food_count++;
            }
        }
        cc.log('foodcount:' + this.food_count);
    },

    //清空当前关卡
    clearlevel() {
        if (this.currentlevel == null) return;
        this.currentlevel.destroy();
    },

    //1.创建关卡
    creatLevel(num) {
        var that = this; //必须注意，使用否则会出错
        that.num = num;
        cc.loader.loadRes('levels/level_' + num, function (err, prefab) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            var newlevel = cc.instantiate(prefab);
            var node = cc.director.getScene().getChildByName('Canvas');
            node.addChild(newlevel);
            //寻找player
            that.playerInit(newlevel);
            cc.log('父亲' + newlevel.name);
            cc.log('Result should be a prefab: ' + (prefab instanceof cc.Prefab));


        });
        this.button_node.active = true;
        this.levelLabel.string = 'Level:' + num;
        this.gameover = false;

    },

    callback(event, customEventData) {
        var leveNode = this.node.getChildByName('level');
        leveNode.active = false;
        cc.log('hello,everyone');
        var num = customEventData;
        cc.log(num);
        //创建关卡
        this.creatLevel(num);
        //隐藏选择关卡界面

    }

})