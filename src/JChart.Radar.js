;(function (_) {
    function Radar(data, cfg) {
        _.Scale.apply(this);
        var pointRanges = [];//记录线的节点位置 (for click 事件)
        var _this = this;
        this.data = this.chartData = data;
        //配置项
        _.extend(this.config, {
            drawScaleFirst : false,
            //是否显示刻度文本背景
            scaleShowLabelBackdrop:true,
            //刻度背景颜色
            scaleBackdropColor:"rgba(255,255,255,0.75)",
            //刻度padding-top bottom
            scaleBackdropPaddingY:2,
            //刻度padding-left right
            scaleBackdropPaddingX:2,
            //图形形状,菱形 diamond，圆形 circle
            graphShape:'circle',
            //是否显示角度分割线
            showAngleLine:true,
            //角度分割线颜色
            angleLineColor:"rgba(0,0,0,.1)",
            //角度分割线宽度
            angleLineWidth:1,
            //是否显示线的连接点
            showPoint:true,
            //连接圆点半径
            pointRadius:3,
            //连接点的边框宽度
            pointBorderWidth:1,
            //连接点的点击范围(方便手指触摸)
            pointClickBounds:20,
            //连接线的宽度
            lineWidth:2,
            //是否填充为面积图
            fill:true,
            showScaleLabel:true,
            showText : false,
            gridLineColor:'rgb(0,0,0,.5)'
        });

        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function () {
            this.on('_tap', tapHandler);
        }

        this.draw = function (noAnim) {
            this.mergeFont(['scaleFont','textFont']);
            this.initScale();
            if (noAnim) {
                this.drawAllDataPoints(1);
                this.drawScale();
            } else {
                this.doAnim(this.drawScale, this.drawAllDataPoints);
            }
        }

        function tapHandler(x, y) {
            var p = isInPointRange(x,y);
            if(p){
                _this.trigger('tap.point',[_this.data.datasets[p[3]].data[p[2]],p[2],p[3]]);
            }
        }

        this.calcDrawingSizes = function () {
            var maxSize = (Math.min(this.width, this.height) / 2),
                cfg = this.config,
                labelHeight = cfg.scaleFont.size * 2;
            var labelLength = 0;
            _.each(_this.data.labels, function (label) {
                this.ctx.set(cfg.textFont);
                var w = this.ctx.measureText(label).width;
                if (w > labelLength) labelLength = w;
            }, this);
            maxSize -= Math.max(labelLength, ((cfg.textFont.size/2) * 1.5));
            maxSize -= cfg.textFont.size;
            maxSize = _.capValue(maxSize, null, 0);
            this.scaleData.yHeight = maxSize;
            this.scaleData.yLabelHeight = labelHeight;
        }

        this.drawScale = function () {
            var ctx = this.ctx, cfg = this.config, scale = this.scaleData,scaleSize = cfg.scaleFont.size,textSize = cfg.textFont.size,
                dataLen = this.data.labels.length,px = cfg.scaleBackdropPaddingX,py = cfg.scaleBackdropPaddingY;
            //计算每条数据的角度
            var rotationDegree = (2 * Math.PI) / dataLen;
            ctx.save().translate(this.width / 2, this.height / 2);
            //显示角度分割线
            if (cfg.showAngleLine) {
                var w = scale.yHeight - (scale.yHeight % scale.yHop);
                //画每个角度的分割线
                for (var h = 0; h < dataLen; h++) {
                    ctx.rotate(rotationDegree).line(0,0,0,-w,cfg.angleLineColor,cfg.angleLineWidth);
                }
            }
            //画刻度线
            for (var i = 0; i < scale.yScaleValue.step; i++) {
                var hop = scale.yHop * (i + 1);
                ctx.beginPath();
                if (cfg.showGridLine) {
                    ctx.set({strokeStyle : cfg.gridLineColor,lineWidth : cfg.gridLineWidth})
                    if (cfg.graphShape == 'diamond') {
                        ctx.moveTo(0, -hop);
                        for (var j = 0; j < dataLen; j++) {
                            ctx.rotate(rotationDegree).lineTo(0, -hop);
                        }
                    } else {
                        ctx.circle(0, 0, hop);
                    }
                    ctx.closePath().stroke();
                }
                //画刻度值
                if (cfg.showScaleLabel) {
                    var label =  scale.yScaleValue.labels[i];
                    //显示刻度值的背景
                    if (cfg.showScaleLabelBackdrop){
                        var textWidth = this.ctx.measureText(label).width;
                        this.ctx.rect(
                            Math.round(-textWidth/2 - px),     //X
                            Math.round(-hop - scaleSize/2 - py),//Y
                            Math.round(textWidth + px*2), //Width
                            Math.round(scaleSize + py*2), //Height
                            cfg.scaleBackdropColor
                        );
                    }
                    this.ctx.fillText(label,0,-hop,cfg.scaleFont);
                }

            }

            //设置文本样式
            this.ctx.set(cfg.textFont);
            //显示数据标签文本
            for (var k = 0; k < dataLen; k++) {
                var opposite = Math.sin(rotationDegree * k) * (scale.yHeight + textSize);
                var adjacent = Math.cos(rotationDegree * k) * (scale.yHeight + textSize);
                var align;
                if (rotationDegree * k == Math.PI || rotationDegree * k == 0) {
                    align = 'center';
                } else if (rotationDegree * k > Math.PI) {
                    align = 'right';
                }else {
                    align = 'left';
                }
                this.ctx.fillText(this.data.labels[k], opposite, -adjacent,{textAlign:align});
            }
            ctx.restore();
        }

        this.drawAllDataPoints = function (animPc) {
            if (animPc >= 1)pointRanges = [];
            var dataLen = data.datasets[0].data.length,
                rotationDegree = (2 * Math.PI) / dataLen,
                scale = this.scaleData,
                ctx = this.ctx, cfg = this.config;
            ctx.save().translate(this.width / 2, this.height / 2);
            _.each(this.data.datasets, function (set, i) {
                ctx.beginPath().moveTo(0, getY(set.data[0]));
                //画连接线
                _.each(set.data, function (d, j) {
                    if (j == 0)return true;
                    ctx.rotate(rotationDegree).lineTo(0, getY(d));
                });
                ctx.closePath();

                cfg.fill && ctx.fill(set.fillColor||_.hex2Rgb(set.color,0.6));
                ctx.stroke(set.color,cfg.lineWidth);

                //画连接点
                _.each(set.data,function(d,j){
                    var y = getY(d);
                    if (cfg.showPoint) {
                        ctx.rotate(rotationDegree).circle(0, y, cfg.pointRadius,set.pointColor,set.pointBorderColor,cfg.pointBorderWidth);
                    }
                    if(animPc >= 1){
                        var p = getPosition(y,j);
                        pointRanges.push([p[0],p[1],j,i]);
                    }
                });
                ctx.rotate(rotationDegree);

            }, this);
            ctx.restore();
            if(cfg.showText){
                drawText();
            }
            function getY(d){
                return -animPc * _this.calcOffset(d, scale.yScaleValue, scale.yHop);
            }
            function getPosition(radius,i){
                radius = Math.abs(radius);
                var x,y;
                var angel = -Math.PI/2 + i * rotationDegree;
                x = Math.cos(angel)*radius + _this.width/2;
                y = Math.sin(angel)*radius + _this.height/2;
                return [x,y];
            }
        }

        function drawText(){
            _.each(pointRanges,function(p){
                var y = p[1];
                if(y > _this.height/2){
                    y += 6;
                }
                _this.drawText(_this.data.datasets[p[3]].data[p[2]],p[0],y,[p[2],p[3]]);
            });

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
        if (cfg)this.initial(cfg);
    }
    _.Radar = Radar;
})(JChart);