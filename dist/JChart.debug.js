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
            _.each(_this.chartData.datasets,function(set,i){
                if(!config.showBarBorder)borderColor = null;
                _.each(set.data,function(d,j){
                    var x = scale.x + config.barSetSpacing + scale.xHop*j + scale.barWidth*i + config.barSpacing*i + config.barBorderWidth* i,
                        y = scale.y,width = scale.barWidth,height = animPc*_this.calcOffset(d,scale.yScaleValue,scale.yHop)+(config.barBorderWidth/2),
                        color = set.color,borderColor;
                    if(config.showBarBorder){
                        borderColor = set.borderColor
                        //如果在数据源中没有配置borderColor，依据color自动生成一组背景色与边框色
                        if(!borderColor){
                            borderColor = color;
                            color = _.hex2Rgb(color,0.6);
                        }
                    }
                    ctx.rect(x,y,width,-height,color,borderColor,config.barBorderWidth);
                    if(animPc >= 1){
                        barRanges.push([x,x+width,y,y-height,j,i]);
                    }
                    config.showLabel && _this.drawText(x+width/2,y-height,d);

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
/**
 * 简单的Canvas帮助类，使canvas支持类似于jquery的链式操作，支持CanvasRenderingContext2D所有的方法，并提供一些常用的工具方法
 */
;(function(_){
    function Helper(el){
        //需要返回结果的方法，这些方法将不能进行后续的链式调用
        var needReturnValueFn = ['isPointInPath','measureText','getImageData'];
        function Canvas(){
            this.el = el = (typeof el === 'string') ? document.getElementById(el) : el;
            this.ctx = el.getContext('2d');
            this.width = el.width;
            this.height = el.height;
            addProtoFunc(this.ctx);
        }

        //添加canvas原生方法到prototype中
        function addProtoFunc(ctx){
            for(var fn in CanvasRenderingContext2D.prototype){
                if(Canvas.prototype[fn])continue;
                Canvas.prototype[fn] = function(fn){
                    return function(){
                        var args = Array.prototype.slice.call(arguments);
                        var result = ctx[fn].apply(ctx,args);
                        if(needReturnValueFn.indexOf(fn)>-1){
                            return result;
                        }
                        return this;
                    }
                }(fn);
            }
        }

        Canvas.prototype = {
            /**
             *  设置context的属性值
             * @param name 属性名
             * @param value 属性值
             * @return this
             */
            set : function(name,value){
                if(typeof name == 'object'){
                    for(var p in name){
                        this.ctx[p] = name[p];
                    }
                }else{
                    this.ctx[name] = value;
                }
                return this;
            },
            /**
             * 获取context的属性值
             * @param name 属性名
             * @return value 属性值
             */
            get : function(name){
                return this.ctx[name];
            },
            /**
             * context填充
             * @param color 填充颜色
             * @return this
             */
            fill : function (color) {
                if (typeof color === 'string') {
                    this.set('fillStyle', color);
                }
                this.ctx.fill();
                return this;
            },
            /**
             * context描边
             * @param color 描边颜色
             * @return this
             */
            stroke : function (color,width) {
                if (typeof color === 'string') {
                    this.set('strokeStyle', color);
                    width && this.set('lineWidth',width);
                }
                this.ctx.stroke();
                return this;
            },
            fillText : function(text,x,y,style){
                if(style && typeof style == 'object'){
                    for(var p in style){
                        this.set(p,style[p]);
                    }
                }
                this.ctx.fillText(text,x,y);
                return this;
            },
            /**
             * 清除矩形
             * @param x
             * @param y
             * @param w
             * @param h
             * @return this
             */
            clear : function (x, y, w, h) {
                x = x || 0;
                y = y || 0;
                w = w || this.width;
                h = h || this.height;
                this.ctx.clearRect(x, y, w, h);
                return this;
            },
            /**
             * 重新设置大小
             * @param width 宽
             * @param height 高
             * @return this
             */
            resize : function (width, height) {
                this.el.width = width;
                this.el.height = height;
                this.width = width;
                this.height = height;
                return this;
            },
            /**
             * 画线
             */
            line : function(x,y,x1,y1,stroke,strokeWidth){
                this.beginPath().moveTo(x,y).lineTo(x1,y1);
                stroke && this.stroke(stroke,strokeWidth);
                return this;
            },
            /**
             * 画矩形
             * @param x
             * @param y
             * @param w
             * @param h
             * @param fill 填充颜色
             * @param stroke 描边颜色
             * @param strokeWidth 描边宽度
             * @return this
             */
            rect : function (x, y, w, h, fill, stroke,strokeWidth) {
                this.ctx.beginPath();
                this.ctx.rect(x, y, w, h);
                this.ctx.closePath();
                fill && this.fill(fill);
                stroke && this.stroke(stroke,strokeWidth);
                return this;
            },
            /**
             * 画圆形
             * @param x
             * @param y
             * @param r 半径
             * @param fill 填充颜色
             * @param stroke 描边颜色
             * @param strokeWidth 描边宽度
             * @return this
             */
            circle : function (x, y, r, fill, stroke,strokeWidth) {
                this.beginPath();
                this.ctx.arc(x, y, r, 0, 2 * Math.PI, false);
                this.closePath();
                fill && this.fill(fill);
                stroke && this.stroke(stroke,strokeWidth);
                return this;
            },
            /**
             * 画扇形
             * @param x
             * @param y
             * @param r 半径
             * @param start 开始角度
             * @param end 结束角度
             * @param fill 填充颜色
             * @param stroke 描边颜色
             * @param strokeWidth 描边宽度
             * @reutrn this
             */
            sector : function(x,y,r,start,end,fill,stroke,strokeWidth){
                this.beginPath()
                    .arc(x,y,r,start, end, false)
                    .lineTo(x,y)
                    .closePath();
                fill && this.fill(fill);
                stroke && this.stroke(stroke,strokeWidth);
                return this;
            },
            /**
             * 环形扇形
             * @param x
             * @param y
             * @param ir 内半径
             * @param or 外半径
             * @param start 开始角度
             * @param end 结束角度
             * @param fill 填充颜色
             * @param stroke 描边颜色
             * @param strokeWidth 描边宽度
             * @reutrn this
             */
            dountSector : function(x,y,ir,or,start,end,fill,stroke,strokeWidth){
                this.beginPath()
                    .arc(x,y,or,start, end, false)
                    .arc(x,y,ir,end,start,true)
                    .closePath();
                fill && this.fill(fill);
                stroke && this.stroke(stroke,strokeWidth);
                return this;
            },
            /**
             * 加载一张图片
             * @param img
             * @return this
             */
            image : function (img) {
                var _self = this;
                var args = Array.prototype.slice.call(arguments);
                var cb = function () {
                    _self.ctx.drawImage.apply(_self.ctx, args);
                };

                if (typeof img === 'string') {
                    args[0] = new Image();
                    args[0].onload = cb;
                    args[0].src = img;
                } else {
                    cb();
                }
                return this;
            }
        }
        return new Canvas();
    }

    _.Canvas = Helper;
})(JChart);
;(function(_){
    var Chart = function(){
        this.config = {
            //优先画刻度
            drawScaleFirst : true,
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
            this.init();
            this.bindTouchEvents();
            this.bindEvents();
        };
        this.clear = function(){
            this.ctx.clear();
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
            smooth : true,
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
                //画连接线
                ctx.beginPath().moveTo(scale.x, yPos(i,0));
                _.each(set.data,function(d,j){
                    var pointX = xPos(j),pointY = yPos(i,j);
                    if (config.smooth){//贝塞尔曲线
                        ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),pointY,pointX,pointY);
                    }else{
                        ctx.lineTo(pointX,pointY);
                    }
                    if(animPc >= 1){
                        pointRanges.push([pointX,pointY,j,i]);
                    }
                });
                ctx.stroke(set.color,config.lineWidth);

                //填充区域
                config.fill ? ctx.lineTo(scale.x + (scale.xHop*(set.data.length-1)),scale.y).lineTo(scale.x,scale.y).closePath()
                    .fill(set.fillColor?set.fillColor : _.hex2Rgb(set.color,0.6)) : ctx.closePath();

                //画点以及点上文本
                _.each(set.data,function(d,k){
                    var x = xPos(k),y = yPos(i,k);
                    config.showPoint && _this.drawPoint(x,y,set);
                    config.showLabel && _this.drawText(x,y,d);
                });
            });

            function yPos(i,j){
                return scale.y - animPc*(_this.calcOffset(dataset[i].data[j],scale.yScaleValue,scale.yHop));
            }
            function xPos(i){
                return scale.x + (scale.xHop * i);
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
                drawDountText();
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
            drawSector(x,y,pieRadius,angle.start,angle.end,_this.data[index]);
            if(percent>=1){
                drawText(x,y,pieRadius,angle.start,angle.end,_this.data[index]);
            }
        }

        function drawSector(x,y,r,start,end,data){
            var color = data.color,borderColor,borderWidth;
            if(_this.config.showSegmentBorder){
                borderColor = _this.config.segmentBorderColor;
                borderWidth = _this.config.segmentBorderWidth;
            }
            if(_this.config.isDount){
                _this.ctx.dountSector(x,y,r*_this.config.dountRadiusPercent,r,start,end,color,borderColor,borderWidth);
            }else{
                _this.ctx.sector(x,y,r,start,end,color,borderColor,borderWidth);
            }
        }
        function drawText(x,y,r,start,end,data){
            //计算文本位置
            var middAngle = (start+end)/2;
            var d = r/2;
            if(_this.config.isDount){
                d = r/2 + r*_this.config.dountRadiusPercent/2;
            }
            var xaxis = Math.cos(middAngle) * d + x;
            var yaxis = Math.sin(middAngle) * d + y;
            _this.ctx.fillText('30%',xaxis,yaxis,{
                textBaseline : _this.config.dountTextBaseline,
                textAlign : _this.config.dountTextAlign,
                font : 'normal 20px Arial',
                fillStyle : _this.config.dountTextColor
            });
        }
        function drawDountText(){
            _this.ctx.fillText(_this.config.dountText,_this.width/2,_this.height/2,{
                textBaseline : _this.config.dountTextBaseline,
                textAlign : _this.config.dountTextAlign,
                font : _this.config.dountTextFont,
                fillStyle : _this.config.dountTextColor
            });
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
            this.trigger('pullOut',[_this.data[i],i]);
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
                _this.trigger('rotate',[_this.data[i],i]);
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
            drawScaleFirst : false,
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
        	var cfg = this.config,scale = this.scaleData,x = this.width/2, y = this.height/2
                px = cfg.scaleBackdropPaddingX,py = cfg.scaleBackdropPaddingY;
            for (var i=0; i<scale.yScaleValue.step; i++){
                var hop = scale.yHop * (i + 1);
                if (cfg.showGridLine){
                    this.ctx.circle(x, y, hop,false,cfg.gridLineColor,cfg.gridLineWidth)
                }
                if (cfg.showScaleLabel){
                    var label =  scale.yScaleValue.labels[i];
                    if (cfg.showScaleLabelBackdrop){
                        var textWidth = this.ctx.measureText(label).width;
                        this.ctx.rect(
                            Math.round(x - textWidth/2 - px),     //X
                            Math.round(y - hop - cfg.scaleFontSize*0.5 - py),//Y
                            Math.round(textWidth + px*2), //Width
                            Math.round(cfg.scaleFontSize + py*2), //Height
                            cfg.scaleBackdropColor
                        );
                    }
                    this.ctx.fillText(label,x,y - hop,{
                        textBaseline : 'middle',
                        fillStyle : cfg.scaleFontColor,
                        font : cfg.scaleFontStyle + " " + cfg.scaleFontSize + "px " + cfg.scaleFontFamily,
                        textAlign : 'center'
                    });
                }
            }
        }

        this.drawAllSegments = function(animPc){
            var startAngle = -Math.PI/2,angleStep = (Math.PI*2)/this.data.length,
                scaleAnimation = 1,rotateAnimation = 1,
                scale = this.scaleData,cfg = this.config,
                borderColor,borderWidth;
            if (cfg.animation) {
                if (cfg.animateScale) {
                    scaleAnimation = animPc;
                }
                if (cfg.animateRotate){
                    rotateAnimation = animPc;
                }
            }
            if(cfg.showSegmentBorder){
                borderColor = cfg.segmentBorderColor;
                borderWidth = cfg.segmentBorderWidth;
            }
            _.each(this.data,function(d){
                var r = scaleAnimation * this.calcOffset(d.value,scale.yScaleValue,scale.yHop);
                this.ctx.sector(this.width/2,this.height/2,r,startAngle, startAngle + rotateAnimation*angleStep,d.color,borderColor,borderWidth);
                startAngle += rotateAnimation*angleStep;
            },this);
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
            drawScaleFirst : false,
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
                this.ctx.set('font',cfg.labelFontStyle + " " + cfg.labelFontSize + "px " + cfg.labelFontFamily);
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
                dataLen = this.data.labels.length,px = cfg.scaleBackdropPaddingX,py = cfg.scaleBackdropPaddingY;
            //计算每条数据的角度
            var rotationDegree = (2 * Math.PI) / dataLen;
            ctx.save().translate(this.width / 2, this.height / 2);
            //显示角度分割线
            if (cfg.showAngleLine) {
                var w = scale.yHeight - (scale.yHeight % scale.yHop);
                //画每个角度的分割线
                for (var h = 0; h < dataLen; h++) {
                    ctx.rotate(rotationDegree).line(0,0,0,-w,cfg.angleLineColor,cfg.angleLineWidth);
                }
            }
            //画刻度线
            for (var i = 0; i < scale.yScaleValue.step; i++) {
                var hop = scale.yHop * (i + 1);
                ctx.beginPath();
                if (cfg.showGridLine) {
                    ctx.set({strokeStyle : cfg.gridLineColor,lineWidth : cfg.gridLineWidth})
                    if (cfg.graphShape == 'diamond') {
                        ctx.moveTo(0, -hop);
                        for (var j = 0; j < dataLen; j++) {
                            ctx.rotate(rotationDegree).lineTo(0, -hop);
                        }
                    } else {
                        ctx.circle(0, 0, hop);
                    }
                    ctx.closePath().stroke();
                }
                //画刻度值
                if (cfg.showScaleLabel) {
                    var label =  scale.yScaleValue.labels[i];
                    //显示刻度值的背景
                    if (cfg.showScaleLabelBackdrop){
                        var textWidth = this.ctx.measureText(label).width;
                        this.ctx.rect(
                            Math.round(-textWidth/2 - px),     //X
                            Math.round(-hop - cfg.scaleFontSize*0.5 - py),//Y
                            Math.round(textWidth + px*2), //Width
                            Math.round(cfg.scaleFontSize + py*2), //Height
                            cfg.scaleBackdropColor
                        );
                    }
                    this.ctx.fillText(label,0,-hop,{
                        fillStyle : cfg.scaleFontColor,
                        textAlign : 'center',
                        textBaseline : 'middle',
                        font : cfg.scaleFontStyle + " " + cfg.scaleFontSize + "px " + cfg.scaleFontFamily
                    });
                }

            }

            //设置文本样式
            this.ctx.set({
                fillStyle : cfg.labelFontColor,
                font : cfg.labelFontStyle + " " + cfg.labelFontSize + "px " + cfg.labelFontFamily
            });
            //显示数据文本
            for (var k = 0; k < dataLen; k++) {
                var opposite = Math.sin(rotationDegree * k) * (scale.yHeight + cfg.labelFontSize);
                var adjacent = Math.cos(rotationDegree * k) * (scale.yHeight + cfg.labelFontSize);
                var align;
                if (rotationDegree * k == Math.PI || rotationDegree * k == 0) {
                    align = 'center';
                } else if (rotationDegree * k > Math.PI) {
                    align = 'right';
                }else {
                    align = 'left';
                }
                ctx.fillText(this.data.labels[k], opposite, -adjacent,{textAlign:align});
            }
            ctx.restore();
        }

        this.drawAllDataPoints = function (animPc) {
            if (animPc >= 1)pointRanges = [];
            var dataLen = data.datasets[0].data.length,
                rotationDegree = (2 * Math.PI) / dataLen,
                scale = this.scaleData,
                ctx = this.ctx, cfg = this.config;
            ctx.save().translate(this.width / 2, this.height / 2);
            _.each(this.data.datasets, function (set, i) {
                ctx.beginPath().moveTo(0, getY(set.data[0]));
                //画连接线
                _.each(set.data, function (d, j) {
                    if (j == 0)return true;
                    ctx.rotate(rotationDegree).lineTo(0, getY(d));
                });
                ctx.closePath();
                cfg.fill && ctx.fill(set.fillColor);
                ctx.stroke(set.strokeColor,cfg.lineWidth);

                //画连接点
                if (cfg.showPoint) {
                    _.each(set.data,function(d,j){
                        var y = getY(d);
                        ctx.rotate(rotationDegree)
                            .circle(0, getY(d), cfg.pointRadius,set.pointColor,set.pointStrokeColor,cfg.pointBorderWidth);
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
                return -animPc * _this.calcOffset(d, scale.yScaleValue, scale.yHop);
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
            scaleLineWidth :1,
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
            this.ctx.set('font',this.config.scaleFontStyle + " " + this.config.scaleFontSize+"px " + this.config.scaleFontFamily);
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
            var ctx = this.ctx,config = this.config,scale = this.scaleData,align;
            //画X轴
            ctx.line(scale.x-3, scale.y, scale.x+scale.xWidth, scale.y, config.scaleLineColor, config.scaleLineWidth);
            //画X轴刻度文本
            if (scale.labelRotate > 0){
                ctx.save();
                align = 'right';
            }else{
                align = 'center';
            }
            ctx.set({
                fillStyle : config.scaleFontColor,
                textBaseline : 'hanging',
                textAlign : align
            })
            _.each(this.chartData.labels,function(label,i){
                ctx.save();
                var cx = scale.x + i*scale.xHop,labelY = scale.y + P_X/ 2,
                    labelX = this._type_ == 'bar'?cx + scale.xHop/2 : cx;
                if (scale.labelRotate > 0){
                    ctx.translate(labelX,labelY).rotate(-(scale.labelRotate * (Math.PI/180))).fillText(label,0,0).restore();
                }else{
                    ctx.fillText(label, labelX,labelY);
                }

                //画纵向的网格线
                if(config.showGridLine){
                    var x = (this._type_ == 'bar')?cx + scale.xHop : cx;
                    ctx.line(x, scale.y, x, scale.y-scale.yHeight, config.gridLineColor, config.gridLineWidth);
                }
            },this);

            //画Y轴
            ctx.line(scale.x,scale.y+3, scale.x,scale.y-scale.yHeight, config.scaleLineColor, config.scaleLineWidth);

            //画横向网格线
            ctx.set('textAlign','right').set('textBaseline','middle');
            for (var j=0; j<scale.yScaleValue.step; j++){
                var y = scale.y - ((j+1) * scale.yHop);
                config.showGridLine && ctx.line(scale.x,y,scale.x + scale.xWidth,y, config.gridLineColor, config.gridLineWidth);
                config.showScaleLabel && ctx.fillText(scale.yScaleValue.labels[j],scale.x-P_Y/2,y);
            }
        }

        this.initScale = function(showX){
            this.calcDrawingSizes();
            this.calcYAxis();
            showX && this.calcXAxis();
        }

        this.drawText = function(x,y,value){
            this.ctx.save().fillText(value,x,y-3,{
                textBaseline : 'bottom',
                textAlign : 'center',
                fillStyle : this.config.labelFontColor,
                font : this.config.labelFontStyle + " " + this.config.labelFontSize+"px " + this.config.labelFontFamily
            }).restore();
        }

        this.drawPoint = function(x,y,d){
            //填充色默认为白色，边框颜色默认与线条颜色一致
            this.ctx.beginPath().circle(x,y,this.config.pointRadius,d.pointColor || '#fff',d.pointBorderColor || d.color,this.config.pointBorderWidth);
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