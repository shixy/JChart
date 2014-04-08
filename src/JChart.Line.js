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
                ctx.set('lineWidth',config.lineWidth).set('strokeStyle',set.color).beginPath()
                    .moveTo(scale.x, scale.y - animPc*(_this.calcOffset(set.data[0],scale.yScaleValue,scale.yHop)));
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
                    ctx.lineTo(scale.x + (scale.xHop*(set.data.length-1)),scale.y)
                        .lineTo(scale.x,scale.y).closePath();
                    if(set.fillColor){
                        ctx.set('fillStyle',set.fillColor);
                    }else{
                        ctx.set('fillStyle',_.hex2Rgb(set.color,0.6));
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