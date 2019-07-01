cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // onLoad () {},

    start () {

    },

    // update (dt) {},
    toScene: function(){
       cc.director.loadScene("game")
    }
});
