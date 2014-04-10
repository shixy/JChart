;(function(_){
    function Bar(data,cfg){
        _.Scale.apply(this);
        var barRanges = [];//记录柱状图的占据的位置
        this._type_ = 'bar';
        var _this = this;
        this.data = data;//所有的数据
        this.chartData = null;//图表当前展示的数据
        //配置项
        _.extend(this.config,{
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
        this.draw = function(noAnim){
            if(this.config.datasetGesture && this.data.labels.length > _this.config.datasetShowNumber){
                this.chartData = this.sliceData(this.data,0,this.data.labels.length,this.config.datasetShowNumber);
            }else{
                this.chartData = this.data;
            }
            this.mergeFont(['scaleFont','textFont']);
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
            var ctx = _this.ctx,cfg = _this.config,scale = _this.scaleData;
            _.each(_this.chartData.datasets,function(set,i){
                if(!cfg.showBarBorder)borderColor = null;
                _.each(set.data,function(d,j){
                    var x = scale.x + cfg.barSetSpacing + scale.xHop*j + scale.barWidth*i + cfg.barSpacing*i + cfg.barBorderWidth* i,
                        y = scale.y,width = scale.barWidth,height = animPc*_this.calcOffset(d,scale.yScaleValue,scale.yHop)+(cfg.barBorderWidth/2),
                        color = set.color,borderColor;
                    if(cfg.showBarBorder){
                        borderColor = set.borderColor
                        //如果在数据源中没有配置borderColor，依据color自动生成一组背景色与边框色
                        if(!borderColor){
                            borderColor = color;
                            color = _.hex2Rgb(color,0.6);
                        }
                    }
                    ctx.rect(x,y,width,-height,color,borderColor,cfg.barBorderWidth);
                    if(animPc >= 1){
                        barRanges.push([x,x+width,y,y-height,j,i]);
                    }
                    cfg.showText && _this.drawText(d,x+width/2,y-height-3,[j,i]);

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