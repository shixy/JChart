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
        _.extend(this.config,{
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
            scaleLineWidth:1,
            //是否显示Y轴刻度值
            showScaleLabel : true,
            //是否显示X轴刻度值
            showLabel : true,
            //刻度值字体属性
            scaleFont : {
                size:12,
                color : '#666'
            },
            textFont : {
                size : 14,
                textBaseline : 'bottom'
            },
            //是否显示网格线
            showGridLine : true,
            //网格线颜色
            gridLineColor : "rgba(0,0,0,.1)",
            //网格线宽度
            gridLineWidth : 1,
            //水平线{value : 50,color : #fff,width : 1}
            horizonLine : null

        });
        //数据偏移量-已经偏移
        this.dataOffset = 0;
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
            var maxSize = this.height,widestX = 0,scaleFontSize = this.config.scaleFont.size, xLabelWidth = 0,xLabelHeight = scaleFontSize,
                labelRotate = 0,dataLen = this.chartData.labels.length;
            //计算X轴，如果发现数据宽度超过总宽度，需要将label进行旋转
            this.ctx.set(this.config.scaleFont);
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
                    xLabelWidth = scaleFontSize;
                    xLabelHeight = widestX;
                }
            }
            //减去x轴label的高度
            maxSize -= xLabelHeight;
            //减去x轴文本与x轴之间的间距
            maxSize -= P_X;
            //给Y轴顶部留一点空白
            maxSize -= P_T;
            maxSize -= this.config.showText?scaleFontSize:0;
            //y轴高度
            this.scaleData.yHeight = maxSize;
            //y轴刻度高度
            this.scaleData.yLabelHeight = scaleFontSize;
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
            var scale = this.config.scale;
            if (scale){
                scale.start = scale.start || 0;
                scale.labels = this.populateLabels(scale.step,scale.start,scale.stepValue);
            }else {
                var bounds = this.getValueBounds(this.chartData.datasets);
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
            xAxisLength = this.width - yLabelWidth-P_R-(this.config.showText?this.config.textFont.size:0);

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
            var ctx = this.ctx,cfg = this.config,scale = this.scaleData,align;
            ctx.set({
                strokeStyle :  cfg.scaleLineColor,
                lineWidth : cfg.scaleLineWidth
            })
            //画X轴
            ctx.line(scale.x-3, scale.y, scale.x+scale.xWidth, scale.y, true);
            //画Y轴
            ctx.line(scale.x,scale.y+3, scale.x,scale.y-scale.yHeight, true);

            //todo  设置主体部分背景颜色  渐变？？？

            //画X轴刻度文本
            if (scale.labelRotate > 0){
                ctx.save();
                align = 'right';
            }else{
                align = 'center';
            }
            ctx.set({
                fillStyle : cfg.scaleFont.color,
                textAlign : align,
                textBaseline : 'hanging',
                strokeStyle : cfg.gridLineColor,
                lineWidth : cfg.gridLineWidth
            });
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
                if(cfg.showGridLine){
                    var x = (this._type_ == 'bar')?cx + scale.xHop : cx;
                    ctx.line(x, scale.y, x, scale.y-scale.yHeight,true);
                }
            },this);

            //画横向网格线
            ctx.set({textAlign:'right',textBaseline:'middle'});
            for (var j=0; j<scale.yScaleValue.step; j++){
                var y = scale.y - ((j+1) * scale.yHop);
                cfg.showGridLine && ctx.line(scale.x,y,scale.x + scale.xWidth,y, true);
                cfg.showScaleLabel && ctx.fillText(scale.yScaleValue.labels[j],scale.x-P_Y/2,y);
            }
            //绘制水平线
            if(cfg.horizonLine){
                var y = scale.y - this.calcOffset(cfg.horizonLine.value,scale.yScaleValue,scale.yHop);
                ctx.line(scale.x,y,scale.x + scale.xWidth,y, cfg.horizonLine.color || '#E74C3C',cfg.horizonLine.width||1);
            }

        }

        this.initScale = function(showX){
            this.calcDrawingSizes();
            this.calcYAxis();
            showX && this.calcXAxis();
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
                var text = this.trigger('renderYLabel',[value]);
                text = text ? text : value;
                labels.push(text);
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
                currentOffset = 0,//当前一次滑动的偏移量
                dataNum = this.config.datasetShowNumber,//每屏显示的数据条数
                gestureStarted,
                hasTouch = 'ontouchstart' in window,
				START_EV = hasTouch ? 'touchstart' : 'mousedown',
				MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
				END_EV = hasTouch ? 'touchend' : 'mouseup';

            this.ctx.el.addEventListener(START_EV,touchstart);
            this.ctx.el.addEventListener(MOVE_EV,touchmove);
            this.ctx.el.addEventListener(END_EV,touchend);

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
            	//每滑动xHop加载下一组数据
                var totalLen = _this.data.labels.length;//数据总长度
                var offset = _this.dataOffset - Math.floor(touchDistanceX/_this.scaleData.xHop);
                if(offset < 0 || offset == currentOffset||(offset+dataNum > totalLen))return;
                currentOffset = offset;
                console.log(offset);
                //将操作加入系统队列，解决android系统下touchmove的bug
                setTimeout(function(){
                    _this.redraw(_this.sliceData(_this.data,offset,totalLen,dataNum));
                },0)
            }
            function touchend(event){
                gestureStarted = false;
                _this.dataOffset = currentOffset;
            }
        }
    }
    _.Scale = Scale;
})(JChart);