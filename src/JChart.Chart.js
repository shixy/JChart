;(function(_){
    var Chart = function(){
        this.config = {
            bgColor : '#fff',
            //优先画刻度
            drawScaleFirst : true,
            //文本字体属性
            showText : true,
            textFont : {},
            //是否开启动画
            animation : true,
            //动画帧数
            animationSteps : 60,
            //动画函数
            animationEasing : "easeOutBounce"
        }
        this.defaultFont = {
            family : 'Arial',
            size : 16,
            style : 'normal',
            color : '#5b5b5b',
            textAlign : 'center',
            textBaseline : 'middle'
        }
        this.events = {};
        /**
         * 初始化参数
         */
        this.initial = function(cfg){
            //合并设置参数
            if(typeof cfg == 'string'){
                this.config.id = cfg;
            }else{
                _.extend(this.config,cfg);
            }
            this.ctx = _.Canvas(this.config.id);
            var canvas = this.ctx.el;
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
            this.bindTouchEvents();
            this.bindEvents();
            this.setBg();
        };
        this.setBg = function(){
            this.ctx.set('fillStyle',this.config.bgColor);
            this.ctx.fillRect(0,0,this.width,this.height);
        }
        /**
         * 清空画布后重新设置画布的背景
         */
        this.clear = function(){
            this.ctx.clear();
            this.setBg();
        };
        /**
         * 更新
         */
        this.refresh = function(config){
            if(config){
               _.extend(this.config,config);
            }
            this.draw();
        };
        /**
         * 加载数据
         * @param data
         * @param config
         */
        this.load = function(data,config){
            this.data = data;
            config && _.extend(this.config,config);
            this.clear();
            this.draw(true);
        }
        this.mergeFont = function(key){
            if(key instanceof Array){
                _.each(key,function(v){
                    this.mergeFont(v);
                },this);
            }else{
                var of = this.config[key];
                var f = _.extend({},this.defaultFont,of);
                f.font = f.style + " " + f.size+"px " + f.family;
                f.fillStyle = f.color;
                this.config[key] = f;
            }
        }
        /**
         * 动画函数
         * @param drawScale 缩放动画 函数
         * @param drawData  增长式动画 函数
         * @param callback  执行成功回调函数
         */
        this.doAnim = function(drawScale,drawData,callback){
            var config = this.config,_this = this;
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
                }else{
                    callback && callback.call(_this);
                    _this.trigger('animationComplete');
                }
            };
            function animateFrame(){
                _this.clear();
                var animPercent =(config.animation)? _.capValue(easingFunction(percentAnimComplete),null,0) : 1;
                if(_this.config.drawScaleFirst){
                    drawScale.call(_this);
                    drawData.call(_this,animPercent);
                }else{
                    drawData.call(_this,animPercent);
                    drawScale.call(_this);
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
        this.drawText = function(text,x,y,args,style){
            this.ctx.set(this.config.textFont);
            style && this.ctx.set(style);
            args = args ? [text].concat(args) : [text];
            var t = this.trigger('renderText',args);
            t = t?t:text;
            this.ctx.fillText(t,x,y);
        };
        //给chart添加tap longTap doubleTap事件
        this.bindTouchEvents = function(){
            var touch = {},touchTimeout,longTapDelay = 750, longTapTimeout,now, delta,
	            offset = _.getOffset(this.ctx.el),
	            hasTouch = 'ontouchstart' in window,
				START_EV = hasTouch ? 'touchstart' : 'mousedown',
				MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
				END_EV = hasTouch ? 'touchend' : 'mouseup',
				CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	            _this = this;

            this.ctx.el.addEventListener(START_EV,touchstart);
            this.ctx.el.addEventListener(MOVE_EV,touchmove);
            this.ctx.el.addEventListener(END_EV,touchend);
            this.ctx.el.addEventListener(CANCEL_EV,cancelAll);

            function touchstart(e){
                now = Date.now();
                e = e.touches ? e.touches[0] : e;
                delta = now - (touch.last || now);
                touchTimeout && clearTimeout(touchTimeout);
                touch.x1 = e.pageX - offset.left;
                touch.y1 = e.pageY - offset.top;
                if (delta > 0 && delta <= 250) touch.isDoubleTap = true;
                touch.last = now;
                longTapTimeout = setTimeout(longTap, longTapDelay);
            }
            function touchmove(e){
                var ev = e.touches ? e.touches[0] : e;
                touch.x2 = ev.pageX - offset.left;
                touch.y2 = ev.pageY - offset.top;
                if (Math.abs(touch.x1 - touch.x2) > 15){
                    e.preventDefault();
                    cancelAll();
                }
            }
            function touchend(e){
                cancelLongTap();
                if ('last' in touch){
                    //tap事件，单击/双击都会触发，0延迟，建议在不使用doubleTap的环境中使用，如果要同时使用tap和doubleTap，请使用singleTap
                    _this.trigger('_tap',[touch.x1,touch.y1]);
                    _this.trigger('tap',[touch.x1,touch.y1]);
                    if (touch.isDoubleTap) {
                        cancelAll();
                        _this.trigger('_doubleTap',[touch.x1,touch.y1]);
                        _this.trigger('doubleTap',[touch.x1,touch.y1]);
                    }else {
                        touchTimeout = setTimeout(function(){
                            touchTimeout = null;
                            _this.trigger('_singleTap',[touch.x1,touch.y1]);
                            _this.trigger('singleTap',[touch.x1,touch.y1]);
                            touch = {};
                        }, 250)

                    }
                };
            }

            function longTap() {
                longTapTimeout = null;
                if (touch.last) {
                    _this.trigger('_longTap',[touch.x1,touch.y1]);
                    _this.trigger('longTap',[touch.x1,touch.y1]);
                    touch = {};
                }
            }

            function cancelLongTap() {
                if (longTapTimeout) clearTimeout(longTapTimeout);
                longTapTimeout = null;
            }

            function cancelAll() {
                if (touchTimeout) clearTimeout(touchTimeout);
                if (longTapTimeout) clearTimeout(longTapTimeout);
                touchTimeout = longTapTimeout = null;
                touch = {};
            }
        }
    }
    _.Chart = Chart;
})(JChart);