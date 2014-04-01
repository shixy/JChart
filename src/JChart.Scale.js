;(function(_){
    /**
     * 抽象类-刻度值
     * 用来初始化XY轴各项数据
     * @constructor
     */
    function Scale(){
        _.Chart.apply(this);
        var _this = this;
        this.scaleData = {
            x : 0,//圆点坐标
            y : 0,
            xHop : 0,//x轴数据项宽度
            yHop : 0,//y轴每个刻度的高度
            xLength : 0,//x轴长度
            yHeight : 0,//y轴高度
            yScaleValue : null,//y轴刻度指标
            labelRotate : 0,//x轴label旋转角度
            widestXLabel : 0,//x轴label占用的最宽宽度
            barWidth : 0//柱形图柱子宽度
        }
        /**
         * 计算X轴文本宽度、旋转角度及Y轴高度
         */
        this.calculateDrawingSizes = function(){
            var maxSize = _this.height,widestXLabel = 1,labelRotate = 0;
            //计算X轴，如果发现数据宽度超过总宽度，需要将label进行旋转
            _this.ctx.font = _this.config.scaleFontStyle + " " + _this.config.scaleFontSize+"px " + _this.config.scaleFontFamily;
            //找出最宽的label
            _.each(_this.chartData.labels,function(o){
                var textLength = _this.ctx.measureText(o).width;
                widestXLabel = (textLength > widestXLabel)? textLength : widestXLabel;
            })
            if (_this.width/_this.chartData.labels.length < widestXLabel){
                labelRotate = 45;
                if (_this.width/_this.chartData.labels.length < Math.cos(labelRotate) * widestXLabel){
                    labelRotate = 90;
                    maxSize -= widestXLabel;
                }
                else{
                    maxSize -= Math.sin(labelRotate) * widestXLabel;
                }
            }
            else{
                maxSize -= _this.config.scaleFontSize;
            }
            //给Y轴顶部留一点空白
            maxSize -= 5;
            maxSize -= _this.config.scaleFontSize;

            this.scaleData.yHeight = maxSize;
            this.scaleData.labelRotate = labelRotate;
            this.scaleData.widestXLabel = widestXLabel;
        }

        /**
         * 计算Y轴刻度的边界及刻度步数
         * @return {Object}
         */
        this.getValueBounds =function() {
            var upperValue = Number.MIN_VALUE;
            var lowerValue = Number.MAX_VALUE;
            _.each(_this.chartData.datasets,function(o){
                _.each(o.data,function(obj){
                    if(obj > upperValue){upperValue = obj};
                    if (obj < lowerValue) { lowerValue = obj};
                })
            })
            var yh = this.scaleData.yHeight;
            var lh = _this.config.scaleFontSize;
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
         * 初始化刻度的各项数据
         */
        this.initScaleData = function(){
            var config = _this.config,calculatedScale;
            //Check and set the scale
            var labelTemplateString = (config.scaleShowLabels)? config.scaleLabel : "";
            if (!config.scaleOverride){
                var bounds = _this.getValueBounds();
                calculatedScale = _this.calcScale(_this.scaleData.yHeight,bounds.maxSteps,bounds.minSteps,bounds.maxValue,bounds.minValue,labelTemplateString);
            }else {
                calculatedScale = {
                    steps : config.scaleSteps,
                    stepValue : config.scaleStepWidth,
                    graphMin : config.scaleStartValue,
                    labels : []
                }
                _this.populateLabels(labelTemplateString, calculatedScale.labels,calculatedScale.steps,config.scaleStartValue,config.scaleStepWidth);
            }
            this.scaleData.yScaleValue = calculatedScale;
            this.scaleData.yHop = Math.floor(_this.scaleData.yHeight/calculatedScale.steps);
        }
        /**
         * 计算坐标轴的刻度
         */
        this.calcScale = function(drawingHeight,maxSteps,minSteps,maxValue,minValue,labelTemplateString){
            var graphMin,graphMax,graphRange,stepValue,numberOfSteps,valueRange,rangeOrderOfMagnitude,decimalNum;

            valueRange = maxValue - minValue;

            rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

            graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

            graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

            graphRange = graphMax - graphMin;

            stepValue = Math.pow(10, rangeOrderOfMagnitude);

            numberOfSteps = Math.round(graphRange / stepValue);

            //Compare number of steps to the max and min for that size graph, and add in half steps if need be.
            while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
                if (numberOfSteps < minSteps){
                    stepValue /= 2;
                    numberOfSteps = Math.round(graphRange/stepValue);
                }
                else{
                    stepValue *=2;
                    numberOfSteps = Math.round(graphRange/stepValue);
                }
            };

            var labels = [];
            _this.populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);

            return {
                steps : numberOfSteps,
                stepValue : stepValue,
                graphMin : graphMin,
                labels : labels
            }
            function calculateOrderOfMagnitude(val){
                return Math.floor(Math.log(val) / Math.LN10);
            }
        }

        /**
         * 计算X轴宽度，每个数据项宽度大小及坐标原点
         */
        this.calculateXAxisSize = function(){
            var config = _this.config,scale = _this.scaleData,longestText = 1,xAxisLength,valueHop, x,y;
            //if we are showing the labels
            if (config.scaleShowLabels){
                _this.ctx.font = config.scaleFontStyle + " " + config.scaleFontSize+"px " + config.scaleFontFamily;
                //找出Y轴刻度的最宽值
                _.each(scale.yScaleValue.labels,function(o){
                    var measuredText = _this.ctx.measureText(o).width;
                    longestText = (measuredText > longestText)? measuredText : longestText;
                })
                //Add a little extra padding from the y axis
                longestText +=10;
            }
            xAxisLength = _this.width - longestText - scale.widestXLabel;

            if(_this._type_ == 'bar'){//计算柱形图柱子宽度，柱形图x轴文本居中显示，需要重新计算数据项宽度
                valueHop = Math.floor(xAxisLength/_this.chartData.labels.length);
                var len = _this.chartData.datasets.length;
                scale.barWidth = (valueHop - config.scaleGridLineWidth*2 - (config.barValueSpacing*2) - (config.barDatasetSpacing*len-1) - ((config.barStrokeWidth/2)*len-1))/len;
            }else{
                valueHop = Math.floor(xAxisLength/(_this.chartData.labels.length-1));
            }
            x = _this.width-scale.widestXLabel/2-xAxisLength;
            y = scale.yHeight + config.scaleFontSize/2;
            scale.x = x;
            scale.y = y;
            scale.xWidth = xAxisLength;
            scale.xHop = valueHop;
        }

        this.drawScale = function(){
            var ctx = _this.ctx,config = _this.config,scale = _this.scaleData;
            //画X轴数据项
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(_this.width-scale.widestXLabel/2+5,scale.y);
            ctx.lineTo(_this.width-(scale.widestXLabel/2)-scale.xWidth-5,scale.y);
            ctx.stroke();


            if (scale.labelRotate > 0){
                ctx.save();
                ctx.textAlign = "right";
            }
            else{
                ctx.textAlign = "center";
            }
            ctx.fillStyle = config.scaleFontColor;
            _.each(_this.chartData.labels,function(label,i){
                ctx.save();
                var labelX = scale.x + i*scale.xHop,labelY = scale.y + config.scaleFontSize;
                if(_this._type_ == 'bar'){
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
                    if(config.scaleShowGridLines && i>0){
                        drawGridLine(scale.x + i * scale.xHop, 5);
                    }
                    else{
                        ctx.lineTo(scale.x + i * scale.xHop, scale.y+3);
                    }
                }
                ctx.stroke();
            })

            //画Y轴
            ctx.lineWidth = config.scaleLineWidth;
            ctx.strokeStyle = config.scaleLineColor;
            ctx.beginPath();
            ctx.moveTo(scale.x,scale.y+5);
            ctx.lineTo(scale.x,5);
            ctx.stroke();

            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            for (var j=0; j<scale.yScaleValue.steps; j++){
                ctx.beginPath();
                ctx.moveTo(scale.x-3,scale.y - ((j+1) * scale.yHop));
                if (config.scaleShowGridLines){
                    drawGridLine(scale.x + scale.xWidth + 5,scale.y - ((j+1) * scale.yHop));
                }
                else{
                    ctx.lineTo(scale.x-0.5,scale.y - ((j+1) * scale.yHop));
                }

                ctx.stroke();

                if (config.scaleShowLabels){
                    ctx.fillText(scale.yScaleValue.labels[j],scale.x-8,scale.y - ((j+1) * scale.yHop));
                }
            }
            function drawGridLine(x,y){
                ctx.lineWidth = config.scaleGridLineWidth;
                ctx.strokeStyle = config.scaleGridLineColor;
                ctx.lineTo(x, y);
            }
        }

        /**
         * 计算坐标轴的刻度
         * @param drawingHeight
         * @param maxSteps
         * @param minSteps
         * @param maxValue
         * @param minValue
         * @param labelTemplateString
         */
        this.calcScale = function(drawingHeight,maxSteps,minSteps,maxValue,minValue,labelTemplateString){
            var graphMin,graphMax,graphRange,stepValue,numberOfSteps,valueRange,rangeOrderOfMagnitude,decimalNum;

            valueRange = maxValue - minValue;

            rangeOrderOfMagnitude = calculateOrderOfMagnitude(valueRange);

            graphMin = Math.floor(minValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

            graphMax = Math.ceil(maxValue / (1 * Math.pow(10, rangeOrderOfMagnitude))) * Math.pow(10, rangeOrderOfMagnitude);

            graphRange = graphMax - graphMin;

            stepValue = Math.pow(10, rangeOrderOfMagnitude);

            numberOfSteps = Math.round(graphRange / stepValue);

            //Compare number of steps to the max and min for that size graph, and add in half steps if need be.
            while(numberOfSteps < minSteps || numberOfSteps > maxSteps) {
                if (numberOfSteps < minSteps){
                    stepValue /= 2;
                    numberOfSteps = Math.round(graphRange/stepValue);
                }
                else{
                    stepValue *=2;
                    numberOfSteps = Math.round(graphRange/stepValue);
                }
            };

            var labels = [];
            this.populateLabels(labelTemplateString, labels, numberOfSteps, graphMin, stepValue);

            return {
                steps : numberOfSteps,
                stepValue : stepValue,
                graphMin : graphMin,
                labels : labels
            }
            function calculateOrderOfMagnitude(val){
                return Math.floor(Math.log(val) / Math.LN10);
            }
        }

        /**
         * Populate an array of all the labels by interpolating the string.
         * @param labelTemplateString
         * @param labels
         * @param numberOfSteps
         * @param graphMin
         * @param stepValue
         */
        this.populateLabels = function (labelTemplateString, labels, numberOfSteps, graphMin, stepValue) {
            if (labelTemplateString) {
                //Fix floating point errors by setting to fixed the on the same decimal as the stepValue.
                for (var i = 1; i < numberOfSteps + 1; i++) {
                    labels.push(_.tmpl(labelTemplateString, {value: (graphMin + (stepValue * i)).toFixed(_.getDecimalPlaces(stepValue))}));
                }
            }
        }

        this.calculateOffset = function(val,calculatedScale,scaleHop){
            var outerValue = calculatedScale.steps * calculatedScale.stepValue;
            var adjustedValue = val - calculatedScale.graphMin;
            var scalingFactor = _.capValue(adjustedValue/outerValue,1,0);
            return (scaleHop*calculatedScale.steps) * scalingFactor;
        }

        this.initScale = function(){
            _this.calculateDrawingSizes();
            _this.initScaleData();
            _this.calculateXAxisSize();
        }

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
            var touchDistanceX,//手指滑动偏移量
                startPosition,//触摸初始位置记录
                dataOffset = 0,//数据偏移量
                currentOffset = 0,//当前一次滑动的偏移量
                dataNum = this.config.datasetOffsetNumber,//每屏显示的数据条数
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