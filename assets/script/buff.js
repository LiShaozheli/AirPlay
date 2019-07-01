cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getCollisionManager().enabled = true;

        this.maxX = this.node.parent.width / 2;
        this.maxY = this.node.parent.height / 2;
        this.time = 0;
    },

    start () {
        this.schedule(this.updatenode, this.time);
    },

    // update (dt) {},

    init() {
        var randX = (Math.random() - 0.5) * 2 * this.maxX;
        var randY = (Math.random() - 0.5) * 2 * this.maxY;
        this.node.setPosition(cc.v2(randX, randY));
        this.time = Math.random() * 5 + 5;
    },

    updatenode(){
        this.background.createBuff(this.pools,this.node);
        this.background.onBuffKilled(this.pools,this.node);
    },

    onCollisionEnter: function (other, self) {
        this.background.createBuff(this.pools,this.node);
        this.background.onBuffKilled(this.pools,this.node);
    },

});
