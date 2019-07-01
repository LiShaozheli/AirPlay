window.Global = {
    score: 0,
};

cc.Class({
    extends: cc.Component,

    properties: {
        Player: {
            default: null,
            type: cc.Node
        },
        enemy: {
            default: null,
            type: cc.Prefab
        },
        enemyBullet: {
            default: null,
            type: cc.Prefab
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        buffLife: {
            default: null,
            type: cc.Prefab
        },
        buffSpeed: {
            default: null,
            type: cc.Prefab
        },
        buffBullet: {
            default: null,
            type: cc.Prefab
        },
    },

    onLoad() {
        Global.score = 0;
        this.enemyPool = new cc.NodePool();
        this.buffLifePool = new cc.NodePool();
        this.buffSpeedPool = new cc.NodePool();
        this.buffBulletPool = new cc.NodePool();
        for (let i = 0; i < 10; ++i) {
            this.createEnemy(this.node);
        }
    },

    start() {
        for (var i = 0; i < 3; i++) {
            this.createBuff(this.buffLifePool, this.buffLife);
            this.createBuff(this.buffSpeedPool, this.buffSpeed);
            this.createBuff(this.buffBulletPool, this.buffBullet);
        }
    },

    update(dt) {
        this.node.x = -this.Player.x;
        this.node.y = -this.Player.y;
    },

    createEnemy: function (parentNode) {
        let newenemy = null;
        if (this.enemyPool.size() > 0) { 
            newenemy = this.enemyPool.get();
        } else { 
            newenemy = cc.instantiate(this.enemy);
        }
        newenemy.parent = parentNode; 
        newenemy.getComponent('enemy').background = this;
        newenemy.getComponent('enemy').init(); 
    },

    onEnemyKilled: function (enemy) {
        this.enemyPool.put(enemy); 
    },

    createBuff: function (pools, nodes) {
        let newBuff = null;
        if (pools.size() > 0) { 
            newBuff = pools.get();
        } else { 
            newBuff = cc.instantiate(nodes);
        }
        newBuff.parent = this.node; 
        newBuff.getComponent('buff').background = this;
        newBuff.getComponent('buff').pools = pools;
        newBuff.getComponent('buff').init();
    },

    onBuffKilled: function (pools, nodes) {
        pools.put(nodes); 
    },

    gainScore: function () {
        Global.score += 10;
        this.scoreDisplay.string = '得分 : ' + Global.score;
    },
});