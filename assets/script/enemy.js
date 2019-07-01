cc.Class({
    extends: cc.Component,

    properties: {
        meteorilAudio: {
            default: null,
            type: cc.AudioClip
        },
        speed: 60,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.EnemyBulletPool = new cc.NodePool();

        this.enemysx = 0;
        this.enemysy = 0;
        this.maxX = this.node.parent.width / 2;
        this.maxY = this.node.parent.height / 2;
    },

    start() {
        this.schedule(this.setRotations, 5);
        this.schedule(this.createEnemyBullet, 0.5);
    },

    update(dt) {
        //移动
        this.node.x += this.enemysx * dt;
        this.node.y += this.enemysy * dt;

        if (this.node.x > this.maxX || this.node.x < -this.maxX || this.node.y > this.maxY || this.node.y < -this.maxY) {
            this.background.createEnemy(this.background.node);
            this.background.onEnemyKilled(this.node);
        }
    },

    init() {
        this.node.setPosition(this.getNewEnemyPosition());
        this.setRotations();
    },

    setRotations() {
        this.node.rotation = Math.random() * 360;
        var radian = this.node.rotation * Math.PI / 180;

        var vy = Math.cos(radian)
        var vx = Math.sin(radian)

        this.enemysx = vx * this.speed;
        this.enemysy = vy * this.speed;
    },

    createEnemyBullet: function () {
        let newEnemyBullet = null;
        if (this.EnemyBulletPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            newEnemyBullet = this.EnemyBulletPool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            newEnemyBullet = cc.instantiate(this.background.enemyBullet);
        }
        newEnemyBullet.parent = this.background.node; // 将生成的敌人加入节点树
        newEnemyBullet.rotation = this.node.rotation;
        newEnemyBullet.position = this.node.position;
        newEnemyBullet.getComponent('enemyBullet').enemy = this;
        newEnemyBullet.getComponent('enemyBullet').init(); //接下来就可以调用 EnemyBullet 身上的脚本进行初始化
    },

    onEnemyBulletKilled: function (enemy) {
        // EnemyBullet 应该是一个 cc.Node
        this.EnemyBulletPool.put(enemy); // 和初始化时的方法一样，将节点放进对象池，这个方法会同时调用节点的 removeFromParent
    },

    getNewEnemyPosition: function () {
        var randX = (Math.random() - 0.5) * 2 * this.maxX;
        var randY = (Math.random() - 0.5) * 2 * this.maxY;
        return cc.v2(randX, randY);
    },

    onCollisionEnter: function (other, self) {
        this.background.createEnemy(this.background.node);
        this.background.gainScore();
        this.background.onEnemyKilled(this.node);
        cc.audioEngine.playEffect(this.meteorilAudio, false);
    },
});