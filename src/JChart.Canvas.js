/**
 * 简单的Canvas帮助类，使canvas支持类似于jquery的链式操作，支持CanvasRenderingContext2D所有的方法，并提供一些常用的工具方法
 */
;(function(_){
    function Chain(el){
        //需要返回结果的方法，这些方法将不能进行后续的链式调用
        var needReturnValueFn = ['isPointInPath','measureText','getImageData','createLinearGradient','createPattern','createRadialGradient','isPointInPath'];
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
                        this.ctx[p] && (this.ctx[p] = name[p]);
                    }
                }else{
                    this.ctx[name] && (this.ctx[name] = value);
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
                color && this.set('fillStyle', color);
                this.ctx.fill();
                return this;
            },
            /**
             * context描边
             * @param color 描边颜色
             * @return this
             */
            stroke : function (color,width) {
                if (color) {
                    this.set('strokeStyle', color);
                    width && this.set('lineWidth',width);
                }
                this.ctx.stroke();
                return this;
            },
            /**
             * 填充文本，在文本中加入\n可实现换行
             * @param text
             * @param x
             * @param y
             * @param style
             * @return {*}
             */
            fillText : function(text,x,y,style){
                this.ctx.save();
                if(style && typeof style == 'object'){
                    for(var p in style){
                        this.set(p,style[p]);
                    }
                }
                var texts = (text+'').split('\n');
                if(texts.length > 1){
                    var fontsize = this.getFontSize();
                    for(var i=0;i<texts.length;i++){
                        this.ctx.fillText(texts[i],x,y+i*fontsize);
                    }
                }else{
                    this.ctx.fillText(text,x,y);
                }
                this.ctx.restore();
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
                w = w || this.el.width;
                h = h || this.el.height;
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
            },
            /**
             * 获取canvas当前的字体大小
             * @return {Boolean}
             */
            getFontSize : function(){
                var size = this.ctx.font.match(/\d+(?=px)/i);
                if(size){
                    size = parseInt(size[0]);
                }
                return size;
            }
        }
        return new Canvas();
    }

    _.Canvas = Chain;
})(JChart || window);