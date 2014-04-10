  ;(function(_){
    function Polar(data,cfg){
    	_.Scale.apply(this);
        var _this = this;
        this.data = this.chartData = data;
  		//配置项
        _.extend(this.config,{
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
        
        this.draw = function(noAnim){
            this.mergeFont(['scaleFont','textFont']);
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
                cfg = this.config,size = cfg.scaleFont.size,lh = size*2;

            maxSize -= Math.max(size*0.5,cfg.scaleLineWidth*0.5);
            if (cfg.showScaleLabelBackdrop){
                lh += (2 * cfg.scaleBackdropPaddingY);
                maxSize -= cfg.scaleBackdropPaddingY*1.5;
            }
            this.scaleData.yHeight = maxSize;
            this.scaleData.yLabelHeight = lh;
        }
        
        this.drawScale = function(){
        	var cfg = this.config,scale = this.scaleData,x = this.width/2, y = this.height/2
                size = cfg.scaleFont.size,px = cfg.scaleBackdropPaddingX,py = cfg.scaleBackdropPaddingY;
            for (var i=0; i<scale.yScaleValue.step; i++){
                var hop = scale.yHop * (i + 1);
                cfg.showGridLine && this.ctx.circle(x, y, hop,false,cfg.gridLineColor,cfg.gridLineWidth);
                if (cfg.showScaleLabel){
                    var label =  scale.yScaleValue.labels[i];
                    if (cfg.showScaleLabelBackdrop){
                        var textWidth = this.ctx.measureText(label).width;
                        this.ctx.rect(
                            Math.round(x - textWidth/2 - px),     //X
                            Math.round(y - hop - size/2 - py),//Y
                            Math.round(textWidth + px*2), //Width
                            Math.round(size + py*2), //Height
                            cfg.scaleBackdropColor
                        );
                    }
                    this.ctx.fillText(label,x,y - hop,cfg.scaleFont);
                }
            }
        }

        this.drawAllSegments = function(animPc){
            var startAngle = -Math.PI/2,angleStep = (Math.PI*2)/this.data.length,
               scaleAnim = 1,rotateAnim = 1,
                scale = this.scaleData,cfg = this.config,
                borderColor,borderWidth;
            if (cfg.animation) {
                cfg.animateScale && (scaleAnim = animPc);
                cfg.animateRotate && (rotateAnim = animPc);
            }
            if(cfg.showSegmentBorder){
                borderColor = cfg.segmentBorderColor;
                borderWidth = cfg.segmentBorderWidth;
            }
            _.each(this.data,function(d){
                var r = scaleAnim * this.calcOffset(d.value,scale.yScaleValue,scale.yHop);
                this.ctx.sector(this.width/2,this.height/2,r,startAngle, startAngle + rotateAnim*angleStep,d.color,borderColor,borderWidth);
                startAngle += rotateAnim*angleStep;
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