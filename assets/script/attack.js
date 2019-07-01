window.Global = {
    speed: 500,
    time: 0.5,
};

cc.Class({
    extends: cc.Component,

    properties: {
        bullet: {
            default: null,
            type: cc.Prefab
        },
        background: {
            default: null,
            type: cc.Node
        },
        Player: {
            default: null,
            type: cc.Node
        },
        shotAudio: {
            default: null,
            type: cc.AudioClip
        },      
    },

    onLoad() {
        this.bulletPool = new cc.NodePool();
        Global.speed = 500;
        Global.time = 0.5;
    },

    start() {
        

        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.createbullet();
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.unschedule(this.createbullet)
        }, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.unschedule(this.createbullet)
        }, this);

    },
    // update (dt) {},

    createbullet: function () {
        
        let newbullet = null;
        if (this.bulletPool.size() > 0) { 
            newbullet = this.bulletPool.get();
        } else { 
            newbullet = cc.instantiate(this.bullet);
        }
        newbullet.parent = this.background; 
        newbullet.rotation = this.Player.rotation;
        newbullet.position = this.Player.position;

        newbullet.getComponent('bullet').attack = this;
        newbullet.getComponent('bullet').init();
        cc.audioEngine.playEffect(this.shotAudio, false);

        this.schedule(this.createbullet,  Global.time);
    },

    onbulletKilled: function (enemy) {
        this.bulletPool.put(enemy); 
    }
});