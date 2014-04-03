;(function(_){
    /**
     * 抽象类-刻度值
     * 用来初始化XY轴各项数据
     * @constructor
     */
    function Scale(){
        _.Chart.apply(this);
        _.mergeObj(this.config,{
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
            scaleLineColor : "rgba(0,0,0,.1)",
            //刻度线宽度
            scaleLineWidth : 1,
            //是否显示刻度值
            showScaleLabel : true,
            //刻度值字体属性
            scaleFontFamily : "'Arial'",
            scaleFontSize : 12,
            scaleFontStyle : "normal",
            scaleFontColor : "#666",
            //是否显示网格线
            showGridLine : true,
            //网格线颜色
            gridLineColor : "rgba(0,0,0,.05)",
            //网格线宽度
            gridLineWidth : 1
        })
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
            widestXLabel : 0,//x轴label占用的最宽宽度
            barWidth : 0//柱形图柱子宽度
        }
        /**
         * 计算X轴文本宽度、旋转角度及Y轴高度
         */
        this.calcDrawingSizes = function(){
            var maxSize = this.height,widestXLabel = 1,labelRotate = 0;
            //计算X轴，如果发现数据宽度超过总宽度，需要将label进行旋转
            this.ctx.font = this.config.scaleFontStyle + " " + this.config.scaleFontSize+"px " + this.config.scaleFontFamily;
            //找出最宽的label
            _.each(this.chartData.labels,function(o){
                var textLength = this.ctx.measureText(o).width;
                widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
            },this);
            if (this.width/this.chartData.labels.length < widestXLabel){
                labelRotate = 45;
                if (this.width/this.chartData.labels.length < Math.cos(labelRotate) * widestXLabel){
                    labelRotate = 90;
                    maxSize -= widestXLabel;
                }
                else{
                    maxSize -= Math.sin(labelRotate) * widestXLabel;
                }
            }
            else{
                maxSize -= this.config.scaleFontSize;
            }
            //给Y轴顶部留一点空白
            maxSize -= 5;
            maxSize -= this.config.scaleFontSize;

            this.scaleData.yHeight = maxSize;
            this.scaleData.yLabelHeight = this.config.scaleFontSize;
            this.scaleData.labelRotate = labelRotate;
            this.scaleData.widestXLabel = widestXLabel;
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
            var config = this.config,scale = config.scale;
            //Check and set the scale
            if (scale){
                scale.start = scale.start || 0;
                scale.labels = this.populateLabels(scale.step,scale.start,scale.stepValue);
            }else {
                var bounds = this.getValueBounds(this.chartData.datasets ? this.chartData.datasets : this.chartData);
                scale = this.calcScale(this.scaleData.yHeight,bounds.maxSteps,bounds.minSteps,bounds.maxValue,bounds.minValue);
            }
            this.scaleData.yScaleValue = scale;
            this.scaleData.yHop = Math.floor(this.scaleData.yHeight/scale.step);
        }

        /**
         * 计算X轴宽度，每个数据项宽度大小及坐标原点
         */
        this.calcXAxis = function(){
            var config = this.config,scale = this.scaleData,longestText = 1,xAxisLength,valueHop, x,y;
            //if we are showing the labels
            if (config.showScaleLabel){
                this.ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                //找出Y轴刻度的最宽值
                _.each(scale.yScaleValue.labels,function(o){
                    var measuredText = this.ctx.measureText(o).width;
                    longestText = (measuredText > longestText)? measuredText : longestText;
                },this);
                //Add a little extra padding from the y axis
                longestText +=10;
            }
            xAxisLength = this.width - longestText - scale.widestXLabel;

            if(this._type_ == 'bar'){//计算柱形图柱子宽度，柱形图x轴文本居中显示，需要重新计算数据项宽度
                valueHop = Math.floor(xAxisLength/this.chartData.labels.length);
                var len = this.chartData.datasets.length;
                scale.barWidth = (valueHop - config.gridLineWidth*2 - (config.barSetSpacing*2) - (config.barSpacing*len-1) - ((config.barBorderWidth/2)*len-1))/len;
            }else{
                valueHop = Math.floor(xAxisLength/(this.chartData.labels.length-1));
            }
            x = this.width-scale.widestXLabel/2-xAxisLength;
            y = scale.yHeight + config.scaleFontSize/2;
            scale.x = x;
            scale.y = y;
            scale.xWidth = xAxisLength;
            scale.xHop = valueHop;
        }

        this.drawScale = function(){
            var ctx = this.ctx,config = this.config,scale = this.scaleData;
            //画X轴数据项
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(this.width-scale.widestXLabel/2+5,scale.y);
            ctx.lineTo(this.width-(scale.widestXLabel/2)-scale.xWidth-5,scale.y);
            ctx.stroke();


            if (scale.labelRotate > 0){
                ctx.save();
                ctx.textAlign = "right";
            }
            else{
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            _.each(this.chartData.labels,function(label,i){
                ctx.save();
                var labelX = scale.x + i*scale.xHop,labelY = scale.y + config.scaleFontSize;
                if(this._type_ == 'bar'){
                    labelX += scale.xHop/2;
                }
                if (scale.labelRotate > 0){
                    ctx.translate(labelX,labelY);
                    ctx.rotate(-(scale.labelRotate * (Math.PI/180)));
                    ctx.fillText(label, 0,0);
                    ctx.restore();
                }else{
                    ctx.fillText(label, labelX,labelY+3);
                }

                ctx.beginPath();

                //Check i isnt 0, so we dont go over the Y axis twice.
                if(this._type_ == 'bar'){
                    ctx.moveTo(scale.x + (i+1) * scale.xHop, scale.y+3);
                    drawGridLine(scale.x + (i+1) * scale.xHop, 5);
                }else{
                    ctx.moveTo(scale.x + i * scale.xHop, scale.y+3);
                    if(config.showGridLine && i>0){
                        drawGridLine(scale.x + i * scale.xHop, 5);
                    }
                    else{
                        ctx.lineTo(scale.x + i * scale.xHop, scale.y+3);
                    }
                }
                ctx.stroke();
            },this);

            //画Y轴
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(scale.x,scale.y+5);
            ctx.lineTo(scale.x,5);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j=0; j<scale.yScaleValue.step; j++){
                ctx.beginPath();
                ctx.moveTo(scale.x-3,scale.y - ((j+1) * scale.yHop));
                if (config.showGridLine){
                    drawGridLine(scale.x + scale.xWidth + 5,scale.y - ((j+1) * scale.yHop));
                }
                else{
                    ctx.lineTo(scale.x-0.5,scale.y - ((j+1) * scale.yHop));
                }

                ctx.stroke();

                if (config.showScaleLabel){
                    ctx.fillText(scale.yScaleValue.labels[j],scale.x-8,scale.y - ((j+1) * scale.yHop));
                }
            }
            function drawGridLine(x,y){
                ctx.lineWidth = config.gridLineWidth;
                ctx.strokeStyle = config.gridLineColor;
                ctx.lineTo(x, y);
            }
        }

        this.initScale = function(showX){
            this.calcDrawingSizes();
            this.calcYAxis();
            showX && this.calcXAxis();
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

            min = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

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
                var v = this.trigger('renderScaleLabel',[value]);
                labels.push(v ? v : value);
            }
            return labels;
        },
        this.calculateOffset = function(val,scale,scaleHop){
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
                dataOffset = 0,//数据偏移量
                currentOffset = 0,//当前一次滑动的偏移量
                dataNum = this.config.datasetShowNumber,//每屏显示的数据条数
                gestureStarted,
                hasTouch = 'ontouchstart' in window,
				START_EV = hasTouch ? 'touchstart' : 'mousedown',
				MOVE_EV = hasTouch ? 'touchmove' : 'mousemove',
				END_EV = hasTouch ? 'touchend' : 'mouseup';

            this.ctx.canvas.addEventListener(START_EV,touchstart);
            this.ctx.canvas.addEventListener(MOVE_EV,touchmove);
            this.ctx.canvas.addEventListener(END_EV,touchend);

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
				//允许1/10的误差范围
                //if(touchDistanceX%_this.scaleData.xHop < _this.scaleData.xHop/10){
            	if(Math.floor(touchDistanceX)%20 < 10){//每滑动20px加载下一组数据，中间偶尔可能会重复加载
                    var totalLen = _this.data.labels.length;//数据总长度
                    var offset = dataOffset - Math.floor(touchDistanceX/_this.scaleData.xHop);
                    if(offset+dataNum > totalLen)return;
                    if(offset < 0)return;
                    currentOffset = offset;
                    //将操作加入系统队列，解决android系统下touchmove的bug
                    setTimeout(function(){
                    	_this.redraw(_this.sliceData(_this.data,offset,totalLen,dataNum));
                    },0)
                }
            }
            function touchend(event){
                gestureStarted = false;
                dataOffset = currentOffset;
            }
        }

    }
    _.Scale = Scale;
})(JChart);