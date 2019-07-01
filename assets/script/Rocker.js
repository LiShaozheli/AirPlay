cc.Class({
    extends: cc.Component,

    properties: {
        Rocker: {
            type: cc.Node,
            default: null,
        },
        Max_r: 100,
    },

    onLoad () {
        this.Rocker.x = 0;
        this.Rocker.y = 0;
        this.dir = cc.v2(0, 0);
    },
    start() {
        this.Rocker.on(cc.Node.EventType.TOUCH_START, function (e) {

        }, this);

        this.Rocker.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            var w_pos = e.getLocation();
            var pos = this.node.convertToNodeSpaceAR(w_pos); //将世界坐标转化为父节点的相对坐标

            var len = pos.mag();
            this.dir.x = pos.x / len;
            this.dir.y = pos.y / len;
            if (len > this.Max_r) {
                pos.x = this.Max_r * pos.x / len;
                pos.y = this.Max_r * pos.y / len;
            }
            this.Rocker.setPosition(pos);
        }, this);

        this.Rocker.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.Rocker.setPosition(cc.v2(0, 0));
            this.dir = cc.v2(0, 0);
        }, this);

        this.Rocker.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.Rocker.setPosition(cc.v2(0, 0));
            this.dir = cc.v2(0, 0);
        }, this);
    },

    // update (dt) {},
});