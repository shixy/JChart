(function(_){
    function Bar(data,cfg){
        _.Scale.apply(this);
        var barRanges = [];//记录柱状图的占据的位置
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
            this.on('_tap',function(x,y){tapHandler(x,y,'tap.bar')});
            this.on('_doubleTap',function(x,y){tapHandler(x,y,'doubleTap.bar')});
            this.on('_longTap',function(x,y){tapHandler(x,y,'longTap.bar')});
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
            if(animPc == 1)barRanges = [];
            var ctx = _this.ctx,config = _this.config,scale = _this.scaleData;
            ctx.lineWidth = config.barStrokeWidth;
            _.each(_this.data.datasets,function(set,i){
                ctx.fillStyle = set.fillColor;
                ctx.strokeStyle = set.strokeColor;
                _.each(set.data,function(d,j){
                    var x1 = scale.x + config.barValueSpacing + scale.xHop*j + scale.barWidth*i + config.barDatasetSpacing*i + config.barStrokeWidth* i,
                        y1 = scale.y,x2 = x1 + scale.barWidth,
                        y2 = scale.y - animPc*_this.calculateOffset(d,scale.yScaleValue,scale.yHop)+(config.barStrokeWidth/2);
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x1, y2);
                    ctx.lineTo(x2,y2);
                    ctx.lineTo(x2, y1);
                    if(config.barShowStroke){
                        ctx.stroke();
                    }
                    ctx.closePath();
                    ctx.fill();
                    if(animPc == 1){
                        barRanges.push([x1,x2,y1,y2,j,i]);
                    }

                });
            })
        }

        function tapHandler(pageX,pageY,event){
            //计算手指在canvas中的位置
            var x = pageX - _this.ctx.canvas.offsetLeft;
            var y = pageY - _this.ctx.canvas.offsetTop;
            var p = isInBarRange(x,y);
            if(p){
                _this.trigger(event,[_this.data.datasets[p[3]].data[p[2]],p[2],p[3]]);
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