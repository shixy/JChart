window.JingleChart = JChart = {
    version : '0.1',
    animationOptions : {
        linear : function (t){
            return t;
        },
        easeInQuad: function (t) {
            return t*t;
        },
        easeOutQuad: function (t) {
            return -1 *t*(t-2);
        },
        easeInOutQuad: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t;
            return -1/2 * ((--t)*(t-2) - 1);
        },
        easeInCubic: function (t) {
            return t*t*t;
        },
        easeOutCubic: function (t) {
            return 1*((t=t/1-1)*t*t + 1);
        },
        easeInOutCubic: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t;
            return 1/2*((t-=2)*t*t + 2);
        },
        easeInQuart: function (t) {
            return t*t*t*t;
        },
        easeOutQuart: function (t) {
            return -1 * ((t=t/1-1)*t*t*t - 1);
        },
        easeInOutQuart: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t;
            return -1/2 * ((t-=2)*t*t*t - 2);
        },
        easeInQuint: function (t) {
            return 1*(t/=1)*t*t*t*t;
        },
        easeOutQuint: function (t) {
            return 1*((t=t/1-1)*t*t*t*t + 1);
        },
        easeInOutQuint: function (t) {
            if ((t/=1/2) < 1) return 1/2*t*t*t*t*t;
            return 1/2*((t-=2)*t*t*t*t + 2);
        },
        easeInSine: function (t) {
            return -1 * Math.cos(t/1 * (Math.PI/2)) + 1;
        },
        easeOutSine: function (t) {
            return 1 * Math.sin(t/1 * (Math.PI/2));
        },
        easeInOutSine: function (t) {
            return -1/2 * (Math.cos(Math.PI*t/1) - 1);
        },
        easeInExpo: function (t) {
            return (t==0) ? 1 : 1 * Math.pow(2, 10 * (t/1 - 1));
        },
        easeOutExpo: function (t) {
            return (t==1) ? 1 : 1 * (-Math.pow(2, -10 * t/1) + 1);
        },
        easeInOutExpo: function (t) {
            if (t==0) return 0;
            if (t==1) return 1;
            if ((t/=1/2) < 1) return 1/2 * Math.pow(2, 10 * (t - 1));
            return 1/2 * (-Math.pow(2, -10 * --t) + 2);
        },
        easeInCirc: function (t) {
            if (t>=1) return t;
            return -1 * (Math.sqrt(1 - (t/=1)*t) - 1);
        },
        easeOutCirc: function (t) {
            return 1 * Math.sqrt(1 - (t=t/1-1)*t);
        },
        easeInOutCirc: function (t) {
            if ((t/=1/2) < 1) return -1/2 * (Math.sqrt(1 - t*t) - 1);
            return 1/2 * (Math.sqrt(1 - (t-=2)*t) + 1);
        },
        easeInElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
        },
        easeOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1)==1) return 1;  if (!p) p=1*.3;
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*1-s)*(2*Math.PI)/p ) + 1;
        },
        easeInOutElastic: function (t) {
            var s=1.70158;var p=0;var a=1;
            if (t==0) return 0;  if ((t/=1/2)==2) return 1;  if (!p) p=1*(.3*1.5);
            if (a < Math.abs(1)) { a=1; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (1/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p ));
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*1-s)*(2*Math.PI)/p )*.5 + 1;
        },
        easeInBack: function (t) {
            var s = 1.70158;
            return 1*(t/=1)*t*((s+1)*t - s);
        },
        easeOutBack: function (t) {
            var s = 1.70158;
            return 1*((t=t/1-1)*t*((s+1)*t + s) + 1);
        },
        easeInOutBack: function (t) {
            var s = 1.70158;
            if ((t/=1/2) < 1) return 1/2*(t*t*(((s*=(1.525))+1)*t - s));
            return 1/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
        },
        easeInBounce: function (t) {
            return 1 - JChart.animationOptions.easeOutBounce (1-t);
        },
        easeOutBounce: function (t) {
            if ((t/=1) < (1/2.75)) {
                return 1*(7.5625*t*t);
            } else if (t < (2/2.75)) {
                return 1*(7.5625*(t-=(1.5/2.75))*t + .75);
            } else if (t < (2.5/2.75)) {
                return 1*(7.5625*(t-=(2.25/2.75))*t + .9375);
            } else {
                return 1*(7.5625*(t-=(2.625/2.75))*t + .984375);
            }
        },
        easeInOutBounce: function (t) {
            if (t < 1/2) return JChart.animationOptions.easeInBounce (t*2) * .5;
            return JChart.animationOptions.easeOutBounce (t*2-1) * .5 + 1*.5;
        }
    },
    /**
     * 通用的计时控制器
     */
    requestAnimFrame : (function(){
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })(),
    isNumber : function(n){
        return !isNaN(parseFloat(n)) && isFinite(n);
    },
    isEqual : function(number1, number2, digits){
        digits = digits == undefined? 10: digits; // 默认精度为10
        return number1.toFixed(digits) === number2.toFixed(digits);
    },
    /**
     * 取有效区域内的值
     * @param valueToCap
     * @param maxValue
     * @param minValue
     * @return {*}
     */
    capValue : function(valueToCap, maxValue, minValue){
        var value;
        if(this.isNumber(maxValue) && valueToCap > maxValue) {
            return maxValue;
        }
        if(this.isNumber(minValue) && valueToCap < minValue ){
            return minValue;
        }
        return valueToCap;
    },
    getDecimalPlaces : function(num){
        if (num%1!=0){
            return num.toString().split(".")[1].length
        }
        else{
            return 0;
        }
    },
    mergeObj : function(dest,source){
        for(var p in source){
            dest[p] = source[p];
        }
    },
    clone : function(obj){
        var o;
        if (typeof obj == "object") {
            if (obj === null) {
                o = null;
            } else {
                if (obj instanceof Array) {
                    o = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        o.push(this.clone(obj[i]));
                    }
                } else {
                    o = {};
                    for (var j in obj) {
                        o[j] = this.clone(obj[j]);
                    }
                }
            }
        } else {
            o = obj;
        }
        return o;
    },
    //只对array有效
    each : function(array,fn,context){
        for(var i = 0,len=array.length;i<len;i++){
            var result = fn.call(context,array[i],i,array);
            if(result === true){
                continue;
            }else if(result === false){
                break;
            }
        }
    },
    getOffset : function(el){
    	var box = el.getBoundingClientRect(), 
		doc = el.ownerDocument, 
		body = doc.body, 
		html = doc.documentElement, 
		clientTop = html.clientTop || body.clientTop || 0, 
		clientLeft = html.clientLeft || body.clientLeft || 0, 
		top = box.top + (self.pageYOffset || html.scrollTop || body.scrollTop ) - clientTop, 
		left = box.left + (self.pageXOffset || html.scrollLeft || body.scrollLeft) - clientLeft 
		return { 'top': top, 'left': left }; 
    },
    /**
     * 将颜色代码转换成RGB颜色
     * @param color
     * @return {*}
     */
    hex2Rgb : function(color,alpha){
        var r, g, b;
        // 参数为RGB模式时不做进制转换，直接截取字符串即可
        if( /rgb/.test(color) ){
            var arr = color.match( /\d+/g );
            r = parseInt( arr[0] );
            g = parseInt( arr[1] );
            b = parseInt( arr[2] );
        }else if( /#/.test(color) ){// 参数为十六进制时需要做进制转换
            var len = color.length;
            if( len === 7 ){// 非简写模式 #0066cc
                r = parseInt( color.slice(1, 3), 16 );
                g = parseInt( color.slice(3, 5), 16 );
                b = parseInt( color.slice(5), 16 );
            }else if( len === 4 ){ // 简写模式 #06c
                r = parseInt( color.charAt(1) + val.charAt(1), 16 );
                g = parseInt( color.charAt(2) + val.charAt(2), 16 );
                b = parseInt( color.charAt(3) + val.charAt(3), 16 );
            }
        }
        else{
            return color;
        }
        return 'rgb('+r+','+g+','+b+alpha?alpha:'1'+')';
    },
    tmpl : (function(){
        //Javascript micro templating by John Resig - source at http://ejohn.org/blog/javascript-micro-templating/
        var cache = {};
        function tmpl(str, data){
            // Figure out if we're getting a template, or if we need to
            // load the template - and be sure to cache the result.
            var fn = !/\W/.test(str) ?
                cache[str] = cache[str] ||
                    tmpl(document.getElementById(str).innerHTML) :

                // Generate a reusable function that will serve as a template
                // generator (and which will be cached).
                new Function("obj",
                    "var p=[],print=function(){p.push.apply(p,arguments);};" +

                        // Introduce the data as local variables using with(){}
                        "with(obj){p.push('" +

                        // Convert the template into pure JavaScript
                        str
                            .replace(/[\r\t\n]/g, " ")
                            .split("<%").join("\t")
                            .replace(/((^|%>)[^\t]*)'/g, "$1\r")
                            .replace(/\t=(.*?)%>/g, "',$1,'")
                            .split("\t").join("');")
                            .split("%>").join("p.push('")
                            .split("\r").join("\\'")
                        + "');}return p.join('');");

            // Provide some basic currying to the user
            return data ? fn( data ) : fn;
        };
        return tmpl;
    })()
};


;(function(_){
    function Bar(data,cfg){
        _.Scale.apply(this);
        var barRanges = [];//记录柱状图的占据的位置
        this._type_ = 'bar';
        var _this = this;
        this.data = data;//所有的数据
        this.chartData = null;//图表当前展示的数据
        //配置项
        _.mergeObj(this.config,{
            //是否显示bar的边框
            showBarBorder : true,
            //bar边框宽度
            barBorderWidth : 2,
            //每两个bar之间的间距
            barSpacing : 1,
            //每两组bar之间的间距
            barSetSpacing : 5,
            //是否可以对数据进行拖动
            datasetGesture : false,
            //每次显示的数据条数
            datasetShowNumber : 12
        });
        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            this.on('_tap',function(x,y){tapHandler(x,y,'tap.bar')});
            //this.on('_doubleTap',function(x,y){tapHandler(x,y,'doubleTap.bar')});
            this.on('_longTap',function(x,y){tapHandler(x,y,'longTap.bar')});
            if(this.config.datasetGesture){
                this.bindDataGestureEvent();
            }
        }
        /**
         * 初始化部分元素值
         */
        this.init = function(noAnim){
            if(this.config.datasetGesture && this.data.labels.length > _this.config.datasetShowNumber){
                this.chartData = this.sliceData(this.data,0,this.data.labels.length,this.config.datasetShowNumber);
            }else{
                this.chartData = this.data;
            }
            this.initScale(true);
            if(noAnim){
                this.drawScale();
                this.drawBars(1);
            }else{
                this.doAnim(this.drawScale,this.drawBars);
            }
        }
        this.redraw = function(data){
            this.chartData = data;
            this.clear();
            this.initScale(true);
            this.drawScale();
            this.drawBars(1);
        }

        this.drawBars = function(animPc){
            if(animPc >= 1)barRanges = [];
            var ctx = _this.ctx,config = _this.config,scale = _this.scaleData;
            ctx.lineWidth = config.barBorderWidth;
            _.each(_this.chartData.datasets,function(set,i){
                if(set.borderColor){
                    ctx.fillStyle = set.color;
                    ctx.strokeStyle = set.borderColor;
                }else{
                    ctx.fillStyle =  _.hex2Rgb(set.color,0.6);
                    ctx.strokeStyle = set.color;
                }
                _.each(set.data,function(d,j){
                    var x1 = scale.x + config.barSetSpacing + scale.xHop*j + scale.barWidth*i + config.barSpacing*i + config.barBorderWidth* i,
                        y1 = scale.y,x2 = x1 + scale.barWidth,
                        y2 = scale.y - animPc*_this.calcOffset(d,scale.yScaleValue,scale.yHop)+(config.barBorderWidth/2);
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x1, y2);
                    ctx.lineTo(x2,y2);
                    ctx.lineTo(x2, y1);
                    if(config.showBarBorder){
                        ctx.stroke();
                    }
                    ctx.closePath();
                    ctx.fill();
                    if(animPc >= 1){
                        barRanges.push([x1,x2,y1,y2,j,i]);
                    }
                    config.showLabel && _this.drawText((x1+x2)/2,y2+3,d);

                });
            })
        }

        function tapHandler(x,y,event){
            var p = isInBarRange(x,y);
            if(p){
                _this.trigger(event,[_this.chartData.datasets[p[5]].data[p[4]],p[4],p[5]]);
            }
        }

        function isInBarRange(x,y){
            var range;
            _.each(barRanges,function(r){
                if(x >= r[0] && x <= r[1] && y >= r[3] && y <= r[2]){
                    range = r;
                    return false;
                }
            });
            return range;
        }
        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Bar = Bar;
})(JChart)
;(function(_){
    var Chart = function(){
        this.config = {
            //是否开启动画
            animation : true,
            //动画帧数
            animationSteps : 60,
            //动画函数
            animationEasing : "easeOutBounce"
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
                _.mergeObj(this.config,cfg);
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
        this.refresh = function(config){
            if(config){
               _.mergeObj(this.config,config);
            }
            this.init();
        };
        /**
         * 加载数据
         * @param data
         * @param config
         */
        this.load = function(data,config){
            this.data = data;
            config && _.mergeObj(this.config,config);
            this.clear();
            this.init(true);
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
                drawData.call(_this,animPercent);
                drawScale.call(_this);
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
        //给chart添加tap longTap doubleTap事件
        this.bindTouchEvents = function(){
            var touch = {},touchTimeout,longTapDelay = 750, longTapTimeout,now, delta,
	            offset = _.getOffset(this.ctx.canvas),
	            hasTouch = 'ontouchstart' in window,
				START_EV = hasTouch ? 'touchstart' : 'mousedown',
				MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
				END_EV = hasTouch ? 'touchend' : 'mouseup',
				CANCEL_EV = hasTouch ? 'touchcancel' : 'mouseup',
	            _this = this;

            this.ctx.canvas.addEventListener(START_EV,touchstart);
            this.ctx.canvas.addEventListener(MOVE_EV,touchmove);
            this.ctx.canvas.addEventListener(END_EV,touchend);
            this.ctx.canvas.addEventListener(CANCEL_EV,cancelAll);

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
;(function(_){
    function Line(data,cfg){
      	_.Scale.apply(this);
        var pointRanges = [];//记录线的节点位置 (for click 事件)
        this._type_ = 'line';
        this.data = data;
        this.chartData = null;
        var _this = this;
        _.mergeObj(this.config,{
            //平滑曲线
            smooth : false,
            //是否显示线的连接点
            showPoint : true,
            //连接圆点半径
            pointRadius : 4,
            //连接点的边框宽度
            pointBorderWidth : 2,
            //连接点的点击范围(方便手指触摸)
            pointClickBounds : 20,
            //连接线的宽度
            lineWidth : 2,
            //是否填充为面积图
            fill : true,
            //是否可以对数据进行拖动
            datasetGesture : false,
            //每次显示的数据条数
            datasetShowNumber : 12
        });
        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            //this.ctx.canvas.addEventListener('click',tapHandler);
            this.on('_tap',tapHandler);
            if(this.config.datasetGesture){
                this.bindDataGestureEvent();
            }
        }
        /**
         * 初始化部分元素值
         */
        this.init = function(noAnim){
            if(this.config.datasetGesture && this.data.labels.length > _this.config.datasetShowNumber){
                this.chartData = this.sliceData(this.data,0,this.data.labels.length,this.config.datasetShowNumber);
            }else{
                this.chartData = this.data;
            }
            _this.initScale(true);
            if(noAnim){
                this.drawScale();
                this.drawLines(1);
            }else{
                this.doAnim(this.drawScale,this.drawLines);
            }
        }
        this.redraw = function(data){
            this.chartData = data;
            this.clear();
            this.initScale(true);
            this.drawScale();
            this.drawLines(1);
        }
        this.drawLines = function(animPc){
            if(animPc >= 1)pointRanges = [];
            var ctx = _this.ctx,config = _this.config,dataset = _this.chartData.datasets,scale = _this.scaleData;
            _.each(dataset,function(set,i){
                ctx.strokeStyle = set.color;//线条的颜色
                ctx.lineWidth = config.lineWidth;
                ctx.beginPath();
                ctx.moveTo(scale.x, scale.y - animPc*(_this.calcOffset(set.data[0],scale.yScaleValue,scale.yHop)))
                _.each(set.data,function(d,j){
                    var pointX = xPos(j),pointY = yPos(i,j);
                    if (config.smooth){//贝塞尔曲线
                        ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),yPos(i,j),pointX,pointY);
                    }else{
                        ctx.lineTo(pointX,pointY);
                    }
                    if(animPc >= 1){
                        pointRanges.push([pointX,pointY,j,i]);
                    }
                });
                ctx.stroke();
                if (config.fill){
                    ctx.lineTo(scale.x + (scale.xHop*(set.data.length-1)),scale.y);
                    ctx.lineTo(scale.x,scale.y);
                    ctx.closePath();
                    if(set.fillColor){
                        ctx.fillStyle = set.fillColor;
                    }else{
                        ctx.fillStyle =  _.hex2Rgb(set.color,0.6);
                    }
                    ctx.fill();
                } else{
                    ctx.closePath();
                }
                //画点以及点上文本
                _.each(set.data,function(d,k){
                    var x = scale.x + (scale.xHop *k),
                        y = scale.y - animPc*(_this.calcOffset(d,scale.yScaleValue,scale.yHop));
                    config.showPoint && _this.drawPoint(x,y,set);
                    config.showLabel && _this.drawText(x,y,d);
                });
            });

            function yPos(dataSet,iteration){
                return scale.y - animPc*(_this.calcOffset(dataset[dataSet].data[iteration],scale.yScaleValue,scale.yHop));
            }
            function xPos(iteration){
                return scale.x + (scale.xHop * iteration);
            }
        }
        function tapHandler(x,y){
            var p = isInPointRange(x,y);
            if(p){
                _this.trigger('tap.point',[_this.chartData.datasets[p[3]].data[p[2]],p[2],p[3]]);
            }
        }

        function isInPointRange(x,y){
            var point,pb = _this.config.pointClickBounds;
            _.each(pointRanges,function(p){
                if(x >= p[0] - pb && x <= p[0] + pb && y >= p[1]-pb && y <= p[1] + pb){
                    point = p;
                    return false;
                }
            });
            return point;
        }

        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Line = Line;
})(JChart)
;(function(_){
    function Pie(data,cfg){
        _.Chart.apply(this);
        var angleRanges;//记录每个扇形的起始角度（从0开始）
        var _this = this;
        this.data = data;
        var pieRadius,segmentTotal = 0,startAngle = 0,rotateAngle = 0,currentPullOutIndex = -1;
        _.mergeObj(this.config,{
            //border
            showSegmentBorder : true,
            //border color
            segmentBorderColor : "#fff",
            //border width
            segmentBorderWidth : 2,
            //开始角度,默认为12点钟方向
            startAngle : -Math.PI/2,
            //旋转扇形，使其中线对应的角度
            rotateAngle : Math.PI/2,
            //扇形弹出距离
            pullOutDistance : 10,
            //点击扇形默认触发的事件类型
            clickType : 'pullOut',// pullOut||rotate
            //环形图
            isDount : false,
            dountRadiusPercent :0.4,
            dountText : '',
            dountTextFont : 'bold 30px Arial',
            dountTextColor : '#e74c3c',
            dountTextBaseline : 'middle',
            dountTextAlign : 'center'
        })
        /**
         * 计算各个扇形的起始角度
         * @param data
         */
        function calcAngel(){
            var angle = 0;
            angleRanges = [];
            _.each(_this.data,function(d,i){
                var start = angle;
                angle = angle + (d.value/segmentTotal) * (Math.PI*2);
                var end = angle;
                angleRanges.push([start,end,d,i]);
            })
        }

        function animRotate(percent){
            drawPie(percent,'rotate');
        }

        /**
         *  画饼图
         * @param percent 动画比例
         */
        function drawPie (percent,type){
            _this.clear();
            var animPercent = 1;
            if (_this.config.animation) {
                animPercent = percent;
            }
            _.each(angleRanges,function(a){
                drawSegment(a,animPercent,type);
            });
            if(_this.config.isDount && _this.config.dountText){
                drawText();
            }
        }

        /**
         * 计算扇形真实的其实角度
         */
        function calcSegmentAngle(range,percent,type){
            var start = range[0],
                end = range[1];
            if(type == 'rotate'){
                //旋转
                start = start + startAngle + rotateAngle*percent;
                end = end + startAngle + rotateAngle*percent;
            }else{
                //默认动画
                start = start*percent + startAngle;
                end = end*percent + startAngle
            }
            return {
                start : start,
                end : end
            }
        }

        /**
         * 画扇形
         * @param i
         * @param animPercent
         */
        function drawSegment(range,percent,type){
            var x = _this.width/2,
                y = _this.height/ 2,
                index = range[3];
            if(index == currentPullOutIndex){
                var midAngle = (range[0] + range[1])/2+startAngle;
                x += Math.cos(midAngle) * _this.config.pullOutDistance;
                y += Math.sin(midAngle) * _this.config.pullOutDistance;
            }
            var angle = calcSegmentAngle(range,percent,type);
            drawPiePart(x,y,pieRadius,angle.start,angle.end,_this.data[index]);
        }

        function drawPiePart(x,y,r,start,end,data){
            var ctx = _this.ctx;
            ctx.beginPath();
            ctx.arc(x,y,r,start,end,false);
            if(_this.config.isDount){
                ctx.arc(x,y,r*_this.config.dountRadiusPercent,end,start,true);
            }else{
                ctx.lineTo(x,y);
            }
            ctx.closePath();
            ctx.fillStyle = data.color;
            ctx.fill();
            if(_this.config.showSegmentBorder){
                ctx.lineWidth = _this.config.segmentBorderWidth;
                ctx.strokeStyle = _this.config.segmentBorderColor;
                ctx.stroke();
            }


        }

        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            this.on('_tap',function(x,y){tapHandler(x,y,'tap.pie')});
            //暂时关闭doubleTap事件
            //this.on('_doubleTap',function(x,y){tapHandler(x,y,'doubleTap.pie')});
            this.on('_longTap',function(x,y){tapHandler(x,y,'longTap.pie')});
            //添加一个默认点击事件
            this.on('tap.pie',function(){return true;})
        }

        function tapHandler(x,y,event){
            var type = _this.config.clickType;
            var angle = isInSegment(x,y);
            if(angle){
                if(event == 'tap.pie'){//处理一些默认行为
                    if(!_this.trigger(event,[angle[2],angle[3]]))return;
                    if(type == 'rotate'){
                        _this.rotate(angle[3]);
                    }else if(type == 'pullOut'){
                        _this.toggleSegment(angle[3]);
                    }
                }else{
                    _this.trigger(type,[angle[2],angle[3]]);
                }

            }
        }

        function isInSegment(offsetX,offsetY){
            var angle;
            var x = offsetX - _this.width/2;
            var y = offsetY - _this.height/2;
            //距离圆点的距离
            var dfc = Math.sqrt( Math.pow( Math.abs(x), 2 ) + Math.pow( Math.abs(y), 2 ) );
            var isInPie = (dfc <= pieRadius);
            if(isInPie && _this.config.isDount){//排除dount图中心区
                isInPie = (dfc >= pieRadius*_this.config.dountRadiusPercent);
            }
            if(!isInPie)return;

            var clickAngle = Math.atan2(y, x)-startAngle;
            if ( clickAngle < 0 ) clickAngle = 2 * Math.PI + clickAngle;
            if(clickAngle > 2 * Math.PI) clickAngle = clickAngle - 2 * Math.PI;

            _.each(angleRanges,function(a){
                if(clickAngle >= a[0] && clickAngle < a[1]){
                    angle = a;
                    return false;
                }
            });
            return angle;
        }

        /**
         * 弹出/收起扇形块
         * @param i 扇形索引
         */
        this.toggleSegment = function(i){
            if(i == currentPullOutIndex){
                this.pushIn();
            }else{
                this.pullOut(i);
            }
        }
        /**
         * 收起所有弹出的扇形块
         */
        this.pushIn = function(){
            currentPullOutIndex = -1;
            drawPie(1);
            this.trigger('pushIn');
        }
        /**
         * 弹出指定的扇形块
         * @param i 扇形索引
         */
        this.pullOut = function(i){
            if ( currentPullOutIndex == i ) return;
            currentPullOutIndex = i;
            drawPie(1);
            this.trigger('pullOut',[i,_this.data[i]]);
        }
        /**
         * 旋转扇形块的中线指向6点钟方向
         * @param i 扇形索引
         */
        this.rotate = function(i){
            var middAngle = (angleRanges[i][0] + angleRanges[i][1]) / 2 + startAngle;
            var newRotateAngle = _this.config.rotateAngle-middAngle;
            if(_.isEqual(newRotateAngle,0))return;
            this.pushIn();
            rotateAngle = newRotateAngle;
            this.doAnim(null,animRotate,function(){
                startAngle += rotateAngle;
                _this.trigger('rotate',[i,_this.data[i]]);
            });
        }
        this.setDountText = function(text){
            _this.config.dountText = text;
            drawPie(1);
        }
        /**
         * 初始化部分元素值
         */
        this.init = function(noAnim){
            //计算半径(留10个像素)
            pieRadius = Math.min(_this.height/2,_this.width/2) - 10;
            segmentTotal = 0;
            currentPullOutIndex = -1;
            _.each(_this.data,function(d){
                segmentTotal += d.value;
            });
            calcAngel();
            if(noAnim){
                drawPie(1);
            }else{
                this.doAnim(null,drawPie);
            }
            startAngle = _this.config.startAngle;
        }

        this.load = function(data){
            this.data = data;
            this.init(true);

        }
        function drawText(){
            var ctx = _this.ctx;
            ctx.textBaseline = _this.config.dountTextBaseline;
            ctx.textAlign = _this.config.dountTextAlign;
            ctx.font = _this.config.dountTextFont;
            ctx.fillStyle = _this.config.dountTextColor;
            ctx.fillText(_this.config.dountText,_this.width/2,_this.height/2,pieRadius*_this.config.dountRadiusPercent);
        }

        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Pie = Pie;
}(JChart));

  ;(function(_){
    function Polar(data,cfg){
    	_.Scale.apply(this);
        var _this = this;
        this.data = this.chartData = data;
  		//配置项
        _.mergeObj(this.config,{
            //是否显示刻度文本背景
            showScaleLabelBackdrop : true,
            //刻度背景颜色
            scaleBackdropColor : "rgba(255,255,255,0.75)",
            //刻度padding-top bottom
            scaleBackdropPaddingY : 2,
            //刻度padding-left right
            scaleBackdropPaddingX : 2,
            //是否显示扇形边框
            showSegmentBorder : true,
            //扇形边框颜色
            segmentBorderColor : "#fff",
            //扇形边框宽度
            segmentBorderWidth : 2,
            //是否开启旋转动画
            animateRotate : true,
            //是否开启缩放动画
            animateScale : false
        });
        /**
         * 绑定canvas dom元素上的事件
         */
        this.bindEvents = function(){
            this.on('_tap',tapHandler);
        }
        
        this.init = function(noAnim){
        	this.initScale();
            if(noAnim){
                this.drawAllSegments(1);
                this.drawScale();
            }
        	this.doAnim(this.drawScale,this.drawAllSegments);
        }
        function tapHandler(x,y){
            var i = isInSegment(x,y);
            if(i>-1){
                this.trigger('tap.pie',[this.data[i],i]);
            }
        }
        this.calcDrawingSizes = function(){
            var maxSize = Math.min(this.width,this.height)/2,
                cfg = this.config,
                labelHeight = cfg.scaleFontSize*2;

            maxSize -= Math.max(cfg.scaleFontSize*0.5,cfg.scaleLineWidth*0.5);
            if (cfg.showScaleLabelBackdrop){
                labelHeight += (2 * cfg.scaleBackdropPaddingY);
                maxSize -= cfg.scaleBackdropPaddingY*1.5;
            }
            this.scaleData.yHeight = maxSize;
            this.scaleData.yLabelHeight = labelHeight;
        }
        
        this.drawScale = function(){
        	var ctx = this.ctx,cfg = this.config,scale = this.scaleData;
            for (var i=0; i<scale.yScaleValue.step; i++){
                if (cfg.showGridLine){
                    ctx.beginPath();
                    ctx.arc(this.width/2, this.height/2, scale.yHop * (i + 1), 0, (Math.PI * 2), true);
                    ctx.strokeStyle = cfg.gridLineColor;
                    ctx.lineWidth = cfg.gridLineWidth;
                    ctx.stroke();
                }

                if (cfg.showScaleLabel){
                    ctx.textAlign = "center";
                    ctx.font = cfg.scaleFontStyle + " " + cfg.scaleFontSize + "px " + cfg.scaleFontFamily;
                    var label =  scale.yScaleValue.labels[i];
                    if (cfg.showScaleLabelBackdrop){
                        var textWidth = ctx.measureText(label).width;
                        ctx.fillStyle = cfg.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(
                            Math.round(this.width/2 - textWidth/2 - cfg.scaleBackdropPaddingX),     //X
                            Math.round(this.height/2 - (scale.yHop * (i + 1)) - cfg.scaleFontSize*0.5 - cfg.scaleBackdropPaddingY),//Y
                            Math.round(textWidth + (cfg.scaleBackdropPaddingX*2)), //Width
                            Math.round(cfg.scaleFontSize + (cfg.scaleBackdropPaddingY*2)) //Height
                        );
                        ctx.fill();
                    }
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = cfg.scaleFontColor;
                    ctx.fillText(label,this.width/2,this.height/2 - (scale.yHop * (i + 1)));
                }
            }
        }

        this.drawAllSegments = function(animPc){
            var startAngle = -Math.PI/2,
                angleStep = (Math.PI*2)/this.data.length,
                scaleAnimation = 1,
                rotateAnimation = 1,
                scale = this.scaleData,
                cfg = this.config,
                ctx = this.ctx;
            if (cfg.animation) {
                if (cfg.animateScale) {
                    scaleAnimation = animPc;
                }
                if (cfg.animateRotate){
                    rotateAnimation = animPc;
                }
            }
            for (var i=0; i<this.data.length; i++){
                ctx.beginPath();
                ctx.arc(this.width/2,this.height/2,scaleAnimation * this.calcOffset(data[i].value,scale.yScaleValue,scale.yHop),startAngle, startAngle + rotateAnimation*angleStep, false);
                ctx.lineTo(this.width/2,this.height/2);
                ctx.closePath();
                ctx.fillStyle = this.data[i].color;
                ctx.fill();
                if(cfg.showSegmentBorder){
                    ctx.strokeStyle = cfg.segmentBorderColor;
                    ctx.lineWidth = cfg.segmentBorderWidth;
                    ctx.stroke();
                }
                startAngle += rotateAnimation*angleStep;
            }
        }

        this.getValueBounds = function(data){
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            for (var i=0; i<data.length; i++){
                if (data[i].value > upperValue) {upperValue = data[i].value;}
                if (data[i].value < lowerValue) {lowerValue = data[i].value;}
            };
            var yh = this.scaleData.yHeight;
            var lh = this.scaleData.yLabelHeight;
            var maxSteps = Math.floor((yh/(lh*0.66)));
            var minSteps = Math.floor((yh/lh*0.5));
            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };
        }

        function isInSegment(x,y){
            var startAngle = -Math.PI/2,
                angleStep = (Math.PI*2)/this.data.length;
            var x = x-_this.width/ 2,y = y-_this.height/2;
            //距离圆点的距离
            var dfc = Math.sqrt( Math.pow( Math.abs(x), 2 ) + Math.pow( Math.abs(y), 2 ) );
            var isInPie = (dfc <= _this.scaleData.yHeight);
            if(!isInPie)return -1;
            var clickAngle = Math.atan2(y, x)-startAngle;
            if ( clickAngle < 0 ) clickAngle = 2 * Math.PI + clickAngle;
            if(clickAngle > 2 * Math.PI) clickAngle = clickAngle - 2 * Math.PI;
            return Math.floor(clickAngle/angleStep);
        }

        //初始化参数
        if(cfg)this.initial(cfg);
  
    }
    _.Polar = Polar;
  })(JChart);
;(function (_) {
    function Radar(data, cfg) {
        _.Scale.apply(this);
        var pointRanges = [];//记录线的节点位置 (for click 事件)
        var _this = this;
        this.data = this.chartData = data;
        //配置项
        _.mergeObj(this.config, {
            //是否显示刻度文本背景
            scaleShowLabelBackdrop:true,
            //刻度背景颜色
            scaleBackdropColor:"rgba(255,255,255,0.75)",
            //刻度padding-top bottom
            scaleBackdropPaddingY:2,
            //刻度padding-left right
            scaleBackdropPaddingX:2,
            //图形形状,菱形 diamond，圆形 circle
            graphShape:'circle',
            //是否显示角度分割线
            showAngleLine:true,
            //角度分割线颜色
            angleLineColor:"rgba(0,0,0,.1)",
            //角度分割线宽度
            angleLineWidth:1,
            //数据标签文本字体属性
            labelFontFamily:"'Arial'",
            labelFontStyle:"normal",
            labelFontSize:12,
            labelFontColor:"#666",
            //是否显示线的连接点
            showPoint:true,
            //连接圆点半径
            pointRadius:3,
            //连接点的边框宽度
            pointBorderWidth:1,
            //连接点的点击范围(方便手指触摸)
            pointClickBounds:20,
            //连接线的宽度
            lineWidth:2,
            //是否填充为面积图
            fill:true,
            showScaleLabel:true,
            gridLineColor:'rgb(0,0,0,.5)'
        });

        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function () {
            this.on('_tap', tapHandler);
        }

        this.init = function (noAnim) {
            this.initScale();
            if (noAnim) {
                this.drawAllDataPoints(1);
                this.drawScale();
            } else {
                this.doAnim(this.drawScale, this.drawAllDataPoints);
            }
        }

        function tapHandler(x, y) {
            var p = isInPointRange(x,y);
            if(p){
                _this.trigger('tap.point',[_this.data.datasets[p[3]].data[p[2]],p[2],p[3]]);
            }
        }

        this.calcDrawingSizes = function () {
            var maxSize = (Math.min(this.width, this.height) / 2),
                cfg = this.config,
                labelHeight = cfg.scaleFontSize * 2;
            var labelLength = 0;
            _.each(_this.data.labels, function (label) {
                this.ctx.font = cfg.labelFontStyle + " " + cfg.labelFontSize + "px " + cfg.labelFontFamily;
                var w = this.ctx.measureText(label).width;
                if (w > labelLength) labelLength = w;
            }, this);
            maxSize -= Math.max(labelLength, ((cfg.labelFontSize / 2) * 1.5));
            maxSize -= cfg.labelFontSize;
            maxSize = _.capValue(maxSize, null, 0);
            this.scaleData.yHeight = maxSize;
            this.scaleData.yLabelHeight = labelHeight;
        }

        this.drawScale = function () {
            var ctx = this.ctx, cfg = this.config, scale = this.scaleData,
                dataLen = this.data.labels.length;
            //计算每条数据的角度
            var rotationDegree = (2 * Math.PI) / dataLen;
            ctx.save();
            ctx.translate(this.width / 2, this.height / 2);
            //显示角度分割线
            if (cfg.showAngleLine) {
                ctx.strokeStyle = cfg.angleLineColor;
                ctx.lineWidth = cfg.angleLineWidth;
                var w = scale.yHeight - (scale.yHeight % scale.yHop);
                //画每个角度的分割线
                for (var h = 0; h < dataLen; h++) {
                    ctx.rotate(rotationDegree);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, -w);
                    ctx.stroke();
                }
            }
            //画刻度线
            for (var i = 0; i < scale.yScaleValue.step; i++) {
                ctx.beginPath();
                if (cfg.showGridLine) {
                    ctx.strokeStyle = cfg.gridLineColor;
                    ctx.lineWidth = cfg.gridLineWidth;
                    if (cfg.graphShape == 'diamond') {
                        ctx.moveTo(0, -scale.yHop * (i + 1));
                        for (var j = 0; j < dataLen; j++) {
                            ctx.rotate(rotationDegree);
                            ctx.lineTo(0, -scale.yHop * (i + 1));
                        }
                    } else {
                        ctx.arc(0, 0, scale.yHop * (i + 1), 0, (Math.PI * 2), true);
                    }
                    ctx.closePath();
                    ctx.stroke();

                }

                //画刻度值
                if (cfg.showScaleLabel) {
                    ctx.textAlign = 'center';
                    ctx.font = cfg.scaleFontStyle + " " + cfg.scaleFontSize + "px " + cfg.scaleFontFamily;
                    ctx.textBaseline = "middle";
                    //显示刻度值的背景
                    if (cfg.scaleShowLabelBackdrop) {
                        var textWidth = ctx.measureText(scale.yScaleValue.labels[i]).width;
                        ctx.fillStyle = cfg.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(
                            Math.round(-textWidth / 2 - cfg.scaleBackdropPaddingX), //X
                            Math.round((-scale.yHop * (i + 1)) - cfg.scaleFontSize * 0.5 - cfg.scaleBackdropPaddingY), //Y
                            Math.round(textWidth + (cfg.scaleBackdropPaddingX * 2)), //Width
                            Math.round(cfg.scaleFontSize + (cfg.scaleBackdropPaddingY * 2)) //Height
                        );
                        ctx.fill();
                    }
                    ctx.fillStyle = cfg.scaleFontColor;
                    ctx.fillText(scale.yScaleValue.labels[i], 0, -scale.yHop * (i + 1));
                }

            }
            //显示数据文本
            for (var k = 0; k < dataLen; k++) {
                ctx.font = cfg.labelFontStyle + " " + cfg.labelFontSize + "px " + cfg.labelFontFamily;
                ctx.fillStyle = cfg.labelFontColor;
                var opposite = Math.sin(rotationDegree * k) * (scale.yHeight + cfg.labelFontSize);
                var adjacent = Math.cos(rotationDegree * k) * (scale.yHeight + cfg.labelFontSize);
                if (rotationDegree * k == Math.PI || rotationDegree * k == 0) {
                    ctx.textAlign = "center";
                }
                else if (rotationDegree * k > Math.PI) {
                    ctx.textAlign = "right";
                }
                else {
                    ctx.textAlign = "left";
                }
                ctx.textBaseline = "middle";
                ctx.fillText(this.data.labels[k], opposite, -adjacent);

            }
            ctx.restore();
        }

        this.drawAllDataPoints = function (animPc) {
            if (animPc >= 1)pointRanges = [];
            var dataLen = data.datasets[0].data.length,
                rotationDegree = (2 * Math.PI) / dataLen,
                scale = this.scaleData,
                ctx = this.ctx, cfg = this.config;
            ctx.save();
            ctx.translate(this.width / 2, this.height / 2);
            _.each(this.data.datasets, function (set, i) {
                ctx.beginPath();
                ctx.moveTo(0, getY(set.data[0]));
                //画连接线
                _.each(set.data, function (d, j) {
                    if (j == 0)return true;
                    ctx.rotate(rotationDegree);
                    ctx.lineTo(0, getY(d));
                })
                ctx.closePath();
                ctx.fillStyle = set.fillColor;
                ctx.strokeStyle = set.strokeColor;
                ctx.lineWidth = cfg.lineWidth;
                ctx.fill();
                ctx.stroke();

                //画连接点
                if (cfg.showPoint) {
                    ctx.fillStyle = set.pointColor;
                    ctx.strokeStyle = set.pointStrokeColor;
                    ctx.lineWidth = cfg.pointBorderWidth;
                    _.each(set.data,function(d,j){
                        var y = getY(d);
                        ctx.rotate(rotationDegree);
                        ctx.beginPath();
                        ctx.arc(0, getY(d), cfg.pointRadius, 2 * Math.PI, false);
                        ctx.fill();
                        ctx.stroke();
                        if(animPc >= 1){
                            var p = getPosition(y,j);
                            pointRanges.push([p[0],p[1],j,i]);
                        }
                    });
                    ctx.rotate(rotationDegree);
                }
            }, this);
            ctx.restore();

            function getY(d){
                return animPc * (-1 * _this.calcOffset(d, scale.yScaleValue, scale.yHop))
            }
            function getPosition(radius,i){
                radius = Math.abs(radius);
                var x,y;
                var angel = -Math.PI/2 + i * rotationDegree;
                x = Math.cos(angel)*radius + _this.width/2;
                y = Math.sin(angel)*radius + _this.height/2;
                return [x,y];
            }
        }

        function isInPointRange(x,y){
            var point,pb = _this.config.pointClickBounds;
            _.each(pointRanges,function(p){
                if(x >= p[0] - pb && x <= p[0] + pb && y >= p[1]-pb && y <= p[1] + pb){
                    point = p;
                    return false;
                }
            });
            return point;
        }


        //初始化参数
        if (cfg)this.initial(cfg);

    }

    _.Radar = Radar;
})(JChart);
;(function(_){
    /**
     * 抽象类-刻度值
     * 用来初始化XY轴各项数据
     * @constructor
     */
    function Scale(){
        var P_T = 5,//图表顶部空白
            P_R = 5,//图表右侧空白
            P_Y = 20,//y轴左侧空白
            P_X = 10;//x轴文本与x之间的间距
        _.Chart.apply(this);
        _.mergeObj(this.config,{
            /**
             * @Object
             * Y轴刻度值，默认为null，会自动生成，也可以自己指定
             *   {
             *      step : 10,//刻度个数，必选项
             *      stepValue : 10//每两个刻度线之间的差值，必选项
             *      start : 0//起始刻度值,默认为0
             *   }
             */
            scale : null,
            //xy轴刻度线的颜色
            scaleLineColor : "rgba(0,0,0,.3)",
            //刻度线宽度
            scaleLineWidth : 1,
            //是否显示刻度值
            showScaleLabel : true,
            //刻度值字体属性
            scaleFontFamily : "Arial",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            //刻度值字体属性
            showLabel : true,
            labelFontFamily : "Arial",
            labelFontSize : 12,
            labelFontStyle : "normal",
            labelFontColor : "#5b5b5b",
            //是否显示网格线
            showGridLine : true,
            //网格线颜色
            gridLineColor : "rgba(0,0,0,.05)",
            //网格线宽度
            gridLineWidth : 1
        })
        this.scaleData = {
            x : 0,//圆点坐标
            y : 0,
            xHop : 0,//x轴数据项宽度
            yHop : 0,//y轴每个刻度的高度
            xLength : 0,//x轴长度
            yHeight : 0,//y轴高度
            yLabelHeight : 0,//y轴刻度文本高度
            yScaleValue : null,//y轴刻度指标
            labelRotate : 0,//x轴label旋转角度
            xLabelWidth : 0,//x轴label宽度
            xLabelHeight : 0,//x轴label宽度
            barWidth : 0//柱形图柱子宽度
        }
        /**
         * 计算X轴文本宽度、旋转角度及Y轴高度
         */
        this.calcDrawingSizes = function(){
            var maxSize = this.height,widestX = 0,xLabelWidth = 0,xLabelHeight = this.config.scaleFontSize,labelRotate = 0,dataLen = this.chartData.labels.length;
            //计算X轴，如果发现数据宽度超过总宽度，需要将label进行旋转
            this.ctx.font = this.config.scaleFontStyle + " " + this.config.scaleFontSize+"px " + this.config.scaleFontFamily;
            //找出最宽的label
            _.each(this.chartData.labels,function(o){
                var w = this.ctx.measureText(o).width;
                widestX = (w > widestX)? w : widestX;
            },this);
            xLabelWidth = widestX;
            if (this.width/dataLen < widestX){
                labelRotate = 45;
                xLabelWidth = Math.cos(labelRotate*Math.PI/180) * widestX;
                xLabelHeight = Math.sin(labelRotate*Math.PI/180) * widestX ;
                if (this.width/dataLen < xLabelHeight){
                    labelRotate = 90;
                    xLabelWidth = this.config.scaleFontSize;
                    xLabelHeight = widestX;
                }

            }
            //减去x轴label的高度
            maxSize -= xLabelHeight;
            //减去x轴文本与x轴之间的间距
            maxSize -= P_X;
            //给Y轴顶部留一点空白
            P_T += this.config.showLabel?this.config.labelFontSize:0;
            maxSize -= P_T;

            //y轴高度
            this.scaleData.yHeight = maxSize;
            //y轴刻度高度
            this.scaleData.yLabelHeight = this.config.scaleFontSize;
            //x轴文本旋转角度
            this.scaleData.labelRotate = labelRotate;
            //x轴文本的宽度
            this.scaleData.xLabelWidth = xLabelWidth;
            //x轴文本的高度
            this.scaleData.xLabelHeight = xLabelHeight;
        }

        /**
         * 计算Y轴刻度的边界及刻度步数
         * @return {Object}
         */
        this.getValueBounds = function(dataset) {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            _.each(dataset,function(o){
                _.each(o.data,function(obj){
                    if(obj > upperValue){upperValue = obj};
                    if (obj < lowerValue) { lowerValue = obj};
                });
            })
            var yh = this.scaleData.yHeight;
            var lh = this.scaleData.yLabelHeight;
            var maxSteps = Math.floor((yh/(lh*0.66)));
            var minSteps = Math.floor((yh/lh*0.5));

            return {
                maxValue : upperValue,
                minValue : lowerValue,
                maxSteps : maxSteps,
                minSteps : minSteps
            };
        }

        /**
         * 计算Y轴刻度的各项数据
         */
        this.calcYAxis = function(){
            var config = this.config,scale = config.scale;
            if (scale){
                scale.start = scale.start || 0;
                scale.labels = this.populateLabels(scale.step,scale.start,scale.stepValue);
            }else {
                var bounds = this.getValueBounds(this.chartData.datasets ? this.chartData.datasets : this.chartData);
                scale = this.calcScale(this.scaleData.yHeight,bounds.maxSteps,bounds.minSteps,bounds.maxValue,bounds.minValue);
            }
            this.scaleData.yScaleValue = scale;
            this.scaleData.yHop = Math.floor(this.scaleData.yHeight/scale.step);
        }

        /**
         * 计算X轴宽度，每个数据项宽度大小及坐标原点
         */
        this.calcXAxis = function(){
            var config = this.config,scale = this.scaleData,yLabelWidth = 0,xAxisLength,valueHop, x,y;
            if (config.showScaleLabel){
                this.ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                //找出Y轴刻度的最宽值
                _.each(scale.yScaleValue.labels,function(o){
                    var w = this.ctx.measureText(o).width;
                    yLabelWidth = (w > yLabelWidth)? w : yLabelWidth;
                },this);
                yLabelWidth += P_Y;
            }
            //x轴的宽度
            P_R += this.config.showLabel?this.config.labelFontSize:0;
            xAxisLength = this.width - yLabelWidth-P_R;

            if(this._type_ == 'bar'){//计算柱形图柱子宽度，柱形图x轴文本居中显示，需要重新计算数据项宽度
                valueHop = Math.floor(xAxisLength/this.chartData.labels.length);
                var len = this.chartData.datasets.length;
                scale.barWidth = (valueHop - config.gridLineWidth*2 - (config.barSetSpacing*2) - (config.barSpacing*len-1) - ((config.barBorderWidth/2)*len-1))/len;
            }else{
                valueHop = Math.floor(xAxisLength/(this.chartData.labels.length-1));
            }
            scale.x = yLabelWidth;
            scale.y = this.height - scale.xLabelHeight - P_X;
            scale.xWidth = xAxisLength;
            scale.xHop = valueHop;
        }

        this.drawScale = function(){
            var ctx = this.ctx,config = this.config,scale = this.scaleData;
            //画X轴数据项
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(scale.x-3,scale.y);
            ctx.lineTo(scale.x+scale.xWidth,scale.y);
            ctx.stroke();

            if (scale.labelRotate > 0){
                ctx.save();
                ctx.textAlign = "right";
            }
            else{
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            _.each(this.chartData.labels,function(label,i){
                ctx.save();
                ctx.textBaseline = 'hanging';
                var labelX = scale.x + i*scale.xHop,labelY = scale.y + P_X/2;
                if(this._type_ == 'bar'){
                    labelX += scale.xHop/2;
                }
                if (scale.labelRotate > 0){
                    ctx.translate(labelX,labelY);
                    ctx.rotate(-(scale.labelRotate * (Math.PI/180)));
                    ctx.fillText(label, 0,0);
                    ctx.restore();
                }else{
                    ctx.fillText(label, labelX,labelY);
                }

                ctx.beginPath();

                if(this._type_ == 'bar'){
                    ctx.moveTo(scale.x + (i+1) * scale.xHop, scale.y);
                    drawGridLine(scale.x + (i+1) * scale.xHop, scale.y-scale.yHeight);
                }else{
                    ctx.moveTo(scale.x + i * scale.xHop, scale.y);
                    if(config.showGridLine){
                        drawGridLine(scale.x + i * scale.xHop, scale.y-scale.yHeight);
                    }
                }
                ctx.stroke();
            },this);

            //画Y轴
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(scale.x,scale.y+3);
            ctx.lineTo(scale.x,scale.y-scale.yHeight);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j=0; j<scale.yScaleValue.step; j++){
                var y = scale.y - ((j+1) * scale.yHop);
                ctx.beginPath();
                ctx.moveTo(scale.x,y);
                if (config.showGridLine){
                    drawGridLine(scale.x + scale.xWidth,y);
                }
                ctx.stroke();
                if (config.showScaleLabel){
                    ctx.fillText(scale.yScaleValue.labels[j],scale.x-P_Y/2,y);
                }
            }
            function drawGridLine(x,y){
                ctx.lineWidth = config.gridLineWidth;
                ctx.strokeStyle = config.gridLineColor;
                ctx.lineTo(x, y);
            }
        }

        this.initScale = function(showX){
            this.calcDrawingSizes();
            this.calcYAxis();
            showX && this.calcXAxis();
        }

        this.drawText = function(x,y,value){
            this.ctx.save();
            this.ctx.textBaseline = 'bottom';
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = this.config.labelFontColor;
            this.ctx.font = this.config.labelFontStyle + " " + this.config.labelFontSize+"px " + this.config.labelFontFamily;
            this.ctx.fillText(value,x,y-3);
            this.ctx.restore();
        }

        this.drawPoint = function(x,y,d){
            //默认为白色
            this.ctx.fillStyle = d.pointColor || '#fff';
            //默认与线条颜色一致
            this.ctx.strokeStyle = d.pointBorderColor || d.color;
            this.ctx.lineWidth = this.config.pointBorderWidth;
            this.ctx.beginPath();
            this.ctx.arc(x,y,this.config.pointRadius,0,Math.PI*2,true);
            this.ctx.fill();
            this.ctx.stroke();
        }

		/**
         * 计算坐标轴的刻度
         * @param drawingHeight
         * @param maxSteps
         * @param minSteps
         * @param maxValue
         * @param minValue
         */
        this.calcScale = function(drawingHeight,maxSteps,minSteps,maxValue,minValue){
            var min,max,range,stepValue,step,valueRange,rangeOrderOfMagnitude;

            valueRange = maxValue - minValue;

            rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

            //min = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);
            min = 0;//固定起始点为0

            max = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

            range = max - min;

            stepValue = Math.pow(10, rangeOrderOfMagnitude);

            step = Math.round(range / stepValue);

            //Compare number of steps to the max and min for that size graph, and add in half steps if need be.
            while(step < minSteps || step > maxSteps) {
                if (step < minSteps){
                    stepValue /= 2;
                    step = Math.round(range/stepValue);
                }
                else{
                    stepValue *=2;
                    step = Math.round(range/stepValue);
                }
            };
            var labels = this.populateLabels(step, min, stepValue);;
            return {
                step : step,
                stepValue : stepValue,
                start : min,
                labels : labels
            }
            function calculateOrderOfMagnitude(val){
                return Math.floor(Math.log(val) / Math.LN10);
            }
        }

        /**
         * 构造刻度值
         * @param labels
         * @param numberOfSteps
         * @param graphMin
         * @param stepValue
         */
        this.populateLabels = function (step, start, stepValue) {
            var labels = [];
            for (var i = 1; i < step + 1; i++) {
                if(!this.config.showScaleLabel){
                    labels.push('');
                    continue;
                }
                //小数点位数与stepValue后的小数点一致
                var value = (start + (stepValue * i)).toFixed(_.getDecimalPlaces(stepValue));
                var v = this.trigger('renderScaleLabel',[value]);
                labels.push(v ? v : value);
            }
            return labels;
        },
        this.calcOffset = function(val,scale,scaleHop){
            var outerValue = scale.step * scale.stepValue;
            var adjustedValue = val - scale.start;
            var scalingFactor = _.capValue(adjustedValue/outerValue,1,0);
            return (scaleHop*scale.step) * scalingFactor;
        },
        
        this.sliceData = function(data,offset,len,num){
            var newdata = _.clone(data);
            var min = offset,max = offset + num;
            if(max > len){
                min = len - num;
                max = len;
            }
            newdata.labels = newdata.labels.slice(min,max);
            _.each(newdata.datasets,function(d){
                d.data = d.data.slice(min,max)
            });
            return newdata;
        }
        this.bindDataGestureEvent = function(){
            var _this = this,
            	touchDistanceX,//手指滑动偏移量
                startPosition,//触摸初始位置记录
                dataOffset = 0,//数据偏移量
                currentOffset = 0,//当前一次滑动的偏移量
                dataNum = this.config.datasetShowNumber,//每屏显示的数据条数
                gestureStarted,
                hasTouch = 'ontouchstart' in window,
				START_EV = hasTouch ? 'touchstart' : 'mousedown',
				MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
				END_EV = hasTouch ? 'touchend' : 'mouseup';

            this.ctx.canvas.addEventListener(START_EV,touchstart);
            this.ctx.canvas.addEventListener(MOVE_EV,touchmove);
            this.ctx.canvas.addEventListener(END_EV,touchend);

            function touchstart(e){
            	e = e.touches ? e.touches[0] : e;
                startPosition = {
                    x : e.pageX,
                    y : e.pageY
                }
                touchDistanceX = 0;
                gestureStarted = true;
            }
            function touchmove(e){
                if(!gestureStarted || !_this.config.datasetGesture)return;
                e = e.touches ? e.touches[0] : e;
                var x = e.pageX;
                var y = e.pageY;
                touchDistanceX = x - startPosition.x;
				//允许1/10的误差范围
                //if(touchDistanceX%_this.scaleData.xHop < _this.scaleData.xHop/10){
            	if(Math.floor(touchDistanceX)%20 < 10){//每滑动20px加载下一组数据，中间偶尔可能会重复加载
                    var totalLen = _this.data.labels.length;//数据总长度
                    var offset = dataOffset - Math.floor(touchDistanceX/_this.scaleData.xHop);
                    if(offset+dataNum > totalLen)return;
                    if(offset < 0)return;
                    currentOffset = offset;
                    //将操作加入系统队列，解决android系统下touchmove的bug
                    setTimeout(function(){
                    	_this.redraw(_this.sliceData(_this.data,offset,totalLen,dataNum));
                    },0)
                }
            }
            function touchend(event){
                gestureStarted = false;
                dataOffset = currentOffset;
            }
        }

    }
    _.Scale = Scale;
})(JChart);