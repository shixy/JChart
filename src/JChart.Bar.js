(function(_){
    function Bar(data,cfg){
        _.Scale.apply(this);
        this._type_ = 'bar';
        var _this = this;
        this.data = data;
        //配置项
        this.config = {
            scaleOverlay : false,
            scaleOverride : false,
            scaleSteps : null,
            scaleStepWidth : null,
            scaleStartValue : null,
            scaleLineColor : "rgba(0,0,0,.1)",
            scaleLineWidth : 1,
            scaleShowLabels : true,
            scaleLabel : "<%=value%>",
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            scaleShowGridLines : true,
            scaleGridLineColor : "rgba(0,0,0,.05)",
            scaleGridLineWidth : 1,
            barShowStroke : true,
            barStrokeWidth : 2,
            barValueSpacing : 5,
            barDatasetSpacing : 1,
            animation : true,
            animationSteps : 60,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null,
            //是否可以对数据进行拖动
            datasetGesture : true,
            //每次显示的数据条数
            datasetOffsetNumber : 12
        }
        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            //this.ctx.canvas.addEventListener('click',clickHandler);
            if(this.config.datasetGesture){
                this.bindDataGestureEvent(data);
            }
        }
        /**
         * 初始化部分元素值
         */
        this.init = function(){
            var _data = data;
            if(_this.config.datasetGesture){
                _data = _this.sliceData(data,0,data.labels.length,_this.config.datasetOffsetNumber);
            }
            this.data = _data;
            _this.initScale();
            _this.doAnim(_this.drawScale,_this.drawBars);
        }

        this.load = function(data){
            this.data = data;
            this.clear();
            this.initScale();
            this.drawScale();
            this.drawBars(1);
        }

        this.drawBars = function(animPc){
            var ctx = _this.ctx,config = _this.config,scale = _this.scaleData;
            ctx.lineWidth = config.barStrokeWidth;
            _.each(_this.data.datasets,function(set,i){
                ctx.fillStyle = set.fillColor;
                ctx.strokeStyle = set.strokeColor;
                _.each(set.data,function(d,j){
                    var barOffset = scale.x + config.barValueSpacing + scale.xHop*j + scale.barWidth*i + config.barDatasetSpacing*i + config.barStrokeWidth*i;
                    ctx.beginPath();
                    ctx.moveTo(barOffset, scale.y);
                    ctx.lineTo(barOffset, scale.y - animPc*_this.calculateOffset(d,scale.yScaleValue,scale.yHop)+(config.barStrokeWidth/2));
                    ctx.lineTo(barOffset + scale.barWidth, scale.y - animPc*_this.calculateOffset(d,scale.yScaleValue,scale.yHop)+(config.barStrokeWidth/2));
                    ctx.lineTo(barOffset + scale.barWidth, scale.y);
                    if(config.barShowStroke){
                        ctx.stroke();
                    }
                    ctx.closePath();
                    ctx.fill();
                });
            })
        }
        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Bar = Bar;
})(JChart)