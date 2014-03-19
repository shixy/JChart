(function(_){
    var Chart = function(){}
    Chart.prototype = {
        events : {},
        /**
         * 初始化参数
         */
        initial : function(cfg){
            //合并设置参数
            if(typeof cfg == 'string'){
                this.config.id = cfg;
            }else{
                this.config = JChart.mergeObj(this.config,cfg);
            }
            this.ctx = document.getElementById(this.config.id).getContext('2d');
            var canvas = this.ctx.canvas;
            this.width = canvas.width;
            this.height = canvas.height;
            //High pixel density displays - multiply the size of the canvas height/width by the device pixel ratio, then scale.
            //如果设备为视网膜屏，将canvas按照设备像素比放大像素，然后再等比缩小
            if (window.devicePixelRatio) {
                canvas.style.width = this.width + "px";
                canvas.style.height = this.height + "px";
                canvas.height = this.height * window.devicePixelRatio;
                canvas.width = this.width * window.devicePixelRatio;
                this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            }
            this.init();
            this.bindEvents();
        },
        clear : function(){
            this.ctx.clearRect(0,0,this.width,this.height);
        },
        /**
         * 更新
         */
        update : function(data,config){
            this.data = data;
            if(config){
                this.config = JChart.mergeObj(this.config,config);
            }
            this.init();

        },
        /**
         * 动画函数
         * @param drawScale 缩放动画 函数
         * @param drawData  增长式动画 函数
         * @param callback  执行成功回调函数
         */
        doAnim : function(drawScale,drawData,callback){
            var config = this.config;
                // 1/动画帧数
            var animFrameAmount = (config.animation)? 1/ _.capValue(config.animationSteps,Number.MAX_VALUE,1) : 1,
                //动画效果
                easingFunction = _.animationOptions[config.animationEasing],
                //动画完成率
                percentAnimComplete =(config.animation)? 0 : 1,
                _this = this;

            if (typeof drawScale !== "function") drawScale = function(){};
            _.requestAnimFrame.call(window,animLoop);
            function animLoop(){
                //We need to check if the animation is incomplete (less than 1), or complete (1).
                percentAnimComplete += animFrameAmount;
                animateFrame();
                //Stop the loop continuing forever
                if (percentAnimComplete <= 1){
                    _.requestAnimFrame.call(window,animLoop);
                }
                else{
                    callback && callback();
                    _this.trigger('animationComplete');
                }
            }
            function animateFrame(){
                var easeAdjustedAnimationPercent =(config.animation)? _.capValue(easingFunction(percentAnimComplete),null,0) : 1;
                if(config.scaleOverlay){
                    drawData(easeAdjustedAnimationPercent);
                    drawScale();
                } else {
                    drawScale();
                    drawData(easeAdjustedAnimationPercent);
                }
            }
        },
        /**
         * 简易的事件绑定
         */
        on : function(event,callback){
            this.events[event] = callback;
        },
        /**
         * 调用事件函数
         * @param event 事件名称
         * @param data 参数(数组形式)
         */
        trigger : function(event,data){
            var callback = this.events[event];
            if(callback){
                return callback.apply(this,data);
            }else{
                return null;
            }

        },
        drawSegment : function(x,y,r,start,end,data){
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.arc(x,y,r,start,end);
            ctx.lineTo(x,y);
            ctx.closePath();
            ctx.fillStyle = data.color;
            ctx.fill();
            if(this.config.segmentShowStroke){
                ctx.lineWidth = this.config.segmentStrokeWidth;
                ctx.strokeStyle = this.config.segmentStrokeColor;
                ctx.stroke();
            }
        }
    }
    _.Chart = Chart;
})(JChart);