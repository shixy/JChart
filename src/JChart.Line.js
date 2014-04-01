;(function(_){
    function Line(data,cfg){
        _.Scale.apply(this);
        var pointRanges = [];//记录线的节点位置 (for click 事件)
        this._type_ = 'line';
        this.data = data;
        this.chartData = null;
        var _this = this;
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
            bezierCurve : true,
            pointDot : true,
            pointDotRadius : 4,
            pointDotStrokeWidth : 2,
            pointClickBounds : 20,
            datasetStroke : true,
            datasetStrokeWidth : 2,
            datasetFill : true,
            animation : true,
            animationSteps : 30,
            animationEasing : "easeOutQuart",
            onAnimationComplete : null,
            //是否可以对数据进行拖动
            datasetGesture : false,
            //每次显示的数据条数
            datasetOffsetNumber : 12
        }
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
            if(this.config.datasetGesture && this.data.labels.length > _this.config.datasetOffsetNumber){
                this.chartData = this.sliceData(this.data,0,this.data.labels.length,this.config.datasetOffsetNumber);
            }else{
                this.chartData = this.data;
            }
            _this.initScale();
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
            this.initScale();
            this.drawScale();
            this.drawLines(1);
        }
        this.drawLines = function(animPc){
            if(animPc == 1)pointRanges = [];
            var ctx = _this.ctx,config = _this.config,dataset = _this.chartData.datasets,scale = _this.scaleData;
            _.each(dataset,function(set,i){
                ctx.strokeStyle = set.strokeColor;
                ctx.lineWidth = config.datasetStrokeWidth;
                ctx.beginPath();
                ctx.moveTo(scale.x, scale.y - animPc*(_this.calculateOffset(set.data[0],scale.yScaleValue,scale.yHop)))
                _.each(set.data,function(d,j){
                    var pointX = xPos(j),pointY = yPos(i,j);
                    if (config.bezierCurve){
                        ctx.bezierCurveTo(xPos(j-0.5),yPos(i,j-1),xPos(j-0.5),yPos(i,j),pointX,pointY);
                    }else{
                        ctx.lineTo(pointX,pointY);
                    }
                    if(animPc == 1){
                        pointRanges.push([pointX,pointY,j,i]);
                    }
                });
                ctx.stroke();
                if (config.datasetFill){
                    ctx.lineTo(scale.x + (scale.xHop*(set.data.length-1)),scale.y);
                    ctx.lineTo(scale.x,scale.y);
                    ctx.closePath();
                    ctx.fillStyle = set.fillColor;
                    ctx.fill();
                }
                else{
                    ctx.closePath();
                }
                if(config.pointDot){
                    ctx.fillStyle = set.pointColor;
                    ctx.strokeStyle = set.pointStrokeColor;
                    ctx.lineWidth = config.pointDotStrokeWidth;
                    _.each(set.data,function(d,k){
                        ctx.beginPath();
                        ctx.arc(scale.x + (scale.xHop *k),scale.y - animPc*(_this.calculateOffset(d,scale.yScaleValue,scale.yHop)),config.pointDotRadius,0,Math.PI*2,true);
                        ctx.fill();
                        ctx.stroke();
                    })
                }
            });

            function yPos(dataSet,iteration){
                return scale.y - animPc*(_this.calculateOffset(dataset[dataSet].data[iteration],scale.yScaleValue,scale.yHop));
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