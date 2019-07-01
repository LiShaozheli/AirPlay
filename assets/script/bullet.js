cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.bulletsx = 0;
        this.bulletsy = 0;
        this.maxX = this.node.parent.width / 2;
        this.maxY = this.node.parent.height / 2;
    },

    start() {
        this.init();
    },

    update(dt) {
        //移动
        this.node.x += this.bulletsx * dt;
        this.node.y += this.bulletsy * dt;

        if (this.node.x > this.maxX || this.node.x < -this.maxX || this.node.y > this.maxY || this.node.y < -this.maxY) {
            this.attack.onbulletKilled(this.node);
        }
    },

    init() {
        var radian = this.node.rotation * Math.PI / 180;

        var vy = Math.cos(radian)
        var vx = Math.sin(radian)

        this.bulletsx = vx * Global.speed;
        this.bulletsy = vy * Global.speed;
        // console.log(Global.speed)
    },

    onCollisionEnter: function (other, self) {
        this.attack.onbulletKilled(this.node);
    },

});