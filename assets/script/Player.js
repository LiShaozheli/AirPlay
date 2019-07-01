cc.Class({
    extends: cc.Component,

    properties: {
        Rocker: {
            type: require("Rocker"),
            default: null,
        },
        lifeDisplay: {
            default: null,
            type: cc.Label
        },
        attack: {
            type: cc.Node,
            default: null,
        },
        scene: "gameover",
        speed: 100,
        life: 100,
    },

    onLoad() {
        cc.director.getCollisionManager().enabled = true;
        this.maxX = this.node.parent.width / 2;
        this.maxY = this.node.parent.height / 2;
        this.rdx = 0;
        this.rdy = 1;
    },

    start() {

    },

    update(dt) {
        if(this.Rocker.dir.mag()<0.5){
            return;
        }
        this.rdx = this.Rocker.dir.x;
        this.rdy = this.Rocker.dir.y;

        var vx = this.Rocker.dir.x * this.speed;
        var vy = this.Rocker.dir.y * this.speed;

        var sx = vx * dt;
        var sy = vy * dt;
        //移动
        this.node.x >= this.maxX ? this.node.x = this.maxX : this.node.x += sx;
        this.node.x <= -this.maxX ? this.node.x = -this.maxX : this.node.x += sx;
        this.node.y >= this.maxY ? this.node.y = this.maxY : this.node.y += sy;
        this.node.y <= -this.maxY ? this.node.y = -this.maxY : this.node.y += sy;

        //方向计算
        var r = Math.atan2(this.Rocker.dir.y, this.Rocker.dir.x);
        var degree = r * 180 / (Math.PI);
        degree = 360 - degree + 90;
        this.node.rotation = degree;
    },

    gainlife: function (life) {
        this.life -= life;
        this.lifeDisplay.string = '生命 : ' + this.life;
        if (this.life <= 0) {
            cc.director.loadScene(this.scene);
        }
    },

    bulletspeed() {
        Global.speed = 500;
        Global.time = 0.5;
    },

    Playerspeed() {
        this.speed = 100;
    },

    onCollisionEnter: function (other, self) {
        if (other.node.name === "bullet_2") {
            this.gainlife(1);
        }
        if (other.node.name === "enemy") {
            this.gainlife(10);
        }
        if (other.node.name === "buff_life") {
            this.life += 10;
            if (this.life > 200) {
                this.life = 200;
            }
            this.lifeDisplay.string = '生命 : ' + this.life;
        }
        if (other.node.name === "buff_speed") {
            this.unschedule(this.Playerspeed)
            this.speed = 200;
            this.scheduleOnce(this.Playerspeed, 10);
        }
        if (other.node.name === "buff_bullet") {
            this.unschedule(this.bulletspeed)
            Global.speed = 1000;
            Global.time = 0.2;
            this.scheduleOnce(this.bulletspeed, 10);
        }
    },

});