  ;(function(_){
    function Polar(data,cfg){
    	_.Scale.apply(this);
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
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            this.on('_tap',tapHandler);
        }
        
        this.init = function(noAnim){
        	this.initScale();
        	this.doAnim(this.drawScale,this.drawAllSegments);
        }
        
        
        function tapHandler(x,y){
        }
        
        /**
         * 
         */
        this.calcDrawingSizes = function(){
            var maxSize = Math.min(this.width,this.height)/2,
                cfg = this.config,
                labelHeight = cfg.scaleFontSize*2;

            maxSize -= Math.max(cfg.scaleFontSize*0.5,cfg.scaleLineWidth*0.5);
            var labelLength = 0;
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
                //If the line object is there
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
                    //If the backdrop object is within the font object
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
                ctx.arc(this.width/2,this.height/2,scaleAnimation * this.calculateOffset(data[i].value,scale.yScaleValue,scale.yHop),startAngle, startAngle + rotateAnimation*angleStep, false);
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
        
  
  
        //初始化参数
        if(cfg)this.initial(cfg);
  
    }
    _.Polar = Polar;
  })(JChart);