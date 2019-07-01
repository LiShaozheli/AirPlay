cc.Class({
    extends: cc.Component,

    properties: {
        enemyShotAudio: {
            default: null,
            type: cc.AudioClip
        },
        speed: 0,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.bulletsx = 0;
        this.bulletsy = 0;
        this.maxX = this.node.parent.width / 2;
        this.maxY = this.node.parent.height / 2;
    },

    start() {

    },

    update(dt) {
        //移动
        this.node.x += this.bulletsx * dt;
        this.node.y += this.bulletsy * dt;

        if (this.node.x > this.maxX || this.node.x < -this.maxX || this.node.y > this.maxY || this.node.y < -this.maxY) {
            this.enemy.onEnemyBulletKilled(this.node);
        }
    },

    init() {
        var radian = this.node.rotation * Math.PI / 180;

        var vy = Math.cos(radian)
        var vx = Math.sin(radian)

        this.bulletsx = vx * this.speed;
        this.bulletsy = vy * this.speed;
    },

    onCollisionEnter: function (other, self) {
        this.enemy.onEnemyBulletKilled(this.node);
        cc.audioEngine.playEffect(this.enemyShotAudio, false);
    },
});
