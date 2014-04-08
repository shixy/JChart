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
                    ctx.set('fillStyle',set.color).set('strokeStyle',set.borderColor);
//                    ctx.fillStyle = set.color;
//                    ctx.strokeStyle = set.borderColor;
                }else{
                    ctx.set('fillStyle',_.hex2Rgb(set.color,0.6)).set('strokeStyle',set.color);
//                    ctx.fillStyle =  _.hex2Rgb(set.color,0.6);
//                    ctx.strokeStyle = set.color;
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