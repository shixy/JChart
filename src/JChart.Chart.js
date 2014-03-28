(function(_){
    var Chart = function(){
        this.events = {};
        /**
         * 初始化参数
         */
        this.initial = function(cfg){
            //合并设置参数
            if(typeof cfg == 'string'){
                this.config.id = cfg;
            }else{
                JChart.mergeObj(this.config,cfg);
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
            this.bindTouchEvents();
            this.bindEvents();
        };
        this.clear = function(){
            this.ctx.clearRect(0,0,this.width,this.height);
        };
        /**
         * 更新
         */
        this.update = function(data,config){
            this.data = data;
            if(config){
                this.config = JChart.mergeObj(this.config,config);
            }
            this.init();

        };
        /**
         * 动画函数
         * @param drawScale 缩放动画 函数
         * @param drawData  增长式动画 函数
         * @param callback  执行成功回调函数
         */
        this.doAnim = function(drawScale,drawData,callback){
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
            };
            function animateFrame(){
                _this.clear();
                var easeAdjustedAnimationPercent =(config.animation)? _.capValue(easingFunction(percentAnimComplete),null,0) : 1;
                if(config.scaleOverlay){
                    drawData(easeAdjustedAnimationPercent);
                    drawScale();
                } else {
                    drawScale();
                    drawData(easeAdjustedAnimationPercent);
                }
            };
        }
        /**
         * 简易的事件绑定
         */
        this.on = function(event,callback){
            this.events[event] = callback;
        };
        /**
         * 调用事件函数
         * @param event 事件名称
         * @param data 参数(数组形式)
         */
        this.trigger = function(event,data){
            var callback = this.events[event];
            if(callback){
                return callback.apply(this,data);
            }else{
                return null;
            }
        };
        //sprite from zepto touch.js
        //给chart添加tap longTap doubleTap事件
        this.bindTouchEvents = function(){
            var touch = {},touchTimeout, tapTimeout,longTapDelay = 750, longTapTimeout,now, delta,
                _this = this;

            this.ctx.canvas.addEventListener('mousedown',touchstart);
            this.ctx.canvas.addEventListener('mousemove',touchmove);
            this.ctx.canvas.addEventListener('mouseup',touchend);
            this.ctx.canvas.addEventListener('touchcancel',cancelAll);

            function touchstart(e){
                now = Date.now();
                e = e.touches ? e.touches[0] : e;
                delta = now - (touch.last || now);
                touchTimeout && clearTimeout(touchTimeout);
                touch.x1 = e.pageX;
                touch.y1 = e.pageY;
                if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
                touch.last = now;
                longTapTimeout = setTimeout(longTap, longTapDelay);
            }
            function touchmove(e){
                e = e.touches ? e.touches[0] : e;
                touch.x2 = e.pageX;
                touch.y2 = e.pageY;
                cancelLongTap()
                if (Math.abs(touch.x1 - touch.x2) > 15){
                    //e.preventDefault();
                    cancelAll();
                }
            }
            function touchend(e){
                cancelLongTap();
                if ('last' in touch){
                    tapTimeout = setTimeout(function() {
                        if (touch.isDoubleTap) {
                            _this.trigger('_doubleTap');
                            touch = {};
                        }else {
                            touchTimeout = setTimeout(function(){
                                touchTimeout = null;
                                _this.trigger('_tap');
                                touch = {};
                            }, 250);
                        }
                    }, 0);
                };
            }

            function longTap() {
                longTapTimeout = null;
                if (touch.last) {
                    _this.trigger('_longTap');
                    touch = {};
                }
            }

            function cancelLongTap() {
                if (longTapTimeout) clearTimeout(longTapTimeout);
                longTapTimeout = null;
            }

            function cancelAll() {
                if (touchTimeout) clearTimeout(touchTimeout);
                if (tapTimeout) clearTimeout(tapTimeout);
                if (longTapTimeout) clearTimeout(longTapTimeout);
                touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
                touch = {};
            }
        }
    }
    _.Chart = Chart;
})(JChart);