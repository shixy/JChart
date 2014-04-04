;(function (_) {
    function Radar(data, cfg) {
        _.Scale.apply(this);
        var pointRanges = [];//记录线的节点位置 (for click 事件)
        var _this = this;
        this.data = this.chartData = data;
        //配置项
        _.mergeObj(this.config, {
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
            //数据标签文本字体属性
            labelFontFamily:"'Arial'",
            labelFontStyle:"normal",
            labelFontSize:12,
            labelFontColor:"#666",
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
            gridLineColor:'rgb(0,0,0,.5)'
        });

        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function () {
            this.on('_tap', tapHandler);
        }

        this.init = function (noAnim) {
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
                labelHeight = cfg.scaleFontSize * 2;
            var labelLength = 0;
            _.each(_this.data.labels, function (label) {
                this.ctx.font = cfg.labelFontStyle + " " + cfg.labelFontSize + "px " + cfg.labelFontFamily;
                var w = this.ctx.measureText(label).width;
                if (w > labelLength) labelLength = w;
            }, this);
            maxSize -= Math.max(labelLength, ((cfg.labelFontSize / 2) * 1.5));
            maxSize -= cfg.labelFontSize;
            maxSize = _.capValue(maxSize, null, 0);
            this.scaleData.yHeight = maxSize;
            this.scaleData.yLabelHeight = labelHeight;
        }

        this.drawScale = function () {
            var ctx = this.ctx, cfg = this.config, scale = this.scaleData,
                dataLen = this.data.labels.length;
            //计算每条数据的角度
            var rotationDegree = (2 * Math.PI) / dataLen;
            ctx.save();
            ctx.translate(this.width / 2, this.height / 2);
            //显示角度分割线
            if (cfg.showAngleLine) {
                ctx.strokeStyle = cfg.angleLineColor;
                ctx.lineWidth = cfg.angleLineWidth;
                var w = scale.yHeight - (scale.yHeight % scale.yHop);
                //画每个角度的分割线
                for (var h = 0; h < dataLen; h++) {
                    ctx.rotate(rotationDegree);
                    ctx.beginPath();
                    ctx.moveTo(0, 0);
                    ctx.lineTo(0, -w);
                    ctx.stroke();
                }
            }
            //画刻度线
            for (var i = 0; i < scale.yScaleValue.step; i++) {
                ctx.beginPath();
                if (cfg.showGridLine) {
                    ctx.strokeStyle = cfg.gridLineColor;
                    ctx.lineWidth = cfg.gridLineWidth;
                    if (cfg.graphShape == 'diamond') {
                        ctx.moveTo(0, -scale.yHop * (i + 1));
                        for (var j = 0; j < dataLen; j++) {
                            ctx.rotate(rotationDegree);
                            ctx.lineTo(0, -scale.yHop * (i + 1));
                        }
                    } else {
                        ctx.arc(0, 0, scale.yHop * (i + 1), 0, (Math.PI * 2), true);
                    }
                    ctx.closePath();
                    ctx.stroke();

                }

                //画刻度值
                if (cfg.showScaleLabel) {
                    ctx.textAlign = 'center';
                    ctx.font = cfg.scaleFontStyle + " " + cfg.scaleFontSize + "px " + cfg.scaleFontFamily;
                    ctx.textBaseline = "middle";
                    //显示刻度值的背景
                    if (cfg.scaleShowLabelBackdrop) {
                        var textWidth = ctx.measureText(scale.yScaleValue.labels[i]).width;
                        ctx.fillStyle = cfg.scaleBackdropColor;
                        ctx.beginPath();
                        ctx.rect(
                            Math.round(-textWidth / 2 - cfg.scaleBackdropPaddingX), //X
                            Math.round((-scale.yHop * (i + 1)) - cfg.scaleFontSize * 0.5 - cfg.scaleBackdropPaddingY), //Y
                            Math.round(textWidth + (cfg.scaleBackdropPaddingX * 2)), //Width
                            Math.round(cfg.scaleFontSize + (cfg.scaleBackdropPaddingY * 2)) //Height
                        );
                        ctx.fill();
                    }
                    ctx.fillStyle = cfg.scaleFontColor;
                    ctx.fillText(scale.yScaleValue.labels[i], 0, -scale.yHop * (i + 1));
                }

            }
            //显示数据文本
            for (var k = 0; k < dataLen; k++) {
                ctx.font = cfg.labelFontStyle + " " + cfg.labelFontSize + "px " + cfg.labelFontFamily;
                ctx.fillStyle = cfg.labelFontColor;
                var opposite = Math.sin(rotationDegree * k) * (scale.yHeight + cfg.labelFontSize);
                var adjacent = Math.cos(rotationDegree * k) * (scale.yHeight + cfg.labelFontSize);
                if (rotationDegree * k == Math.PI || rotationDegree * k == 0) {
                    ctx.textAlign = "center";
                }
                else if (rotationDegree * k > Math.PI) {
                    ctx.textAlign = "right";
                }
                else {
                    ctx.textAlign = "left";
                }
                ctx.textBaseline = "middle";
                ctx.fillText(this.data.labels[k], opposite, -adjacent);

            }
            ctx.restore();
        }

        this.drawAllDataPoints = function (animPc) {
            if (animPc >= 1)pointRanges = [];
            var dataLen = data.datasets[0].data.length,
                rotationDegree = (2 * Math.PI) / dataLen,
                scale = this.scaleData,
                ctx = this.ctx, cfg = this.config;
            ctx.save();
            ctx.translate(this.width / 2, this.height / 2);
            _.each(this.data.datasets, function (set, i) {
                ctx.beginPath();
                ctx.moveTo(0, getY(set.data[0]));
                //画连接线
                _.each(set.data, function (d, j) {
                    if (j == 0)return true;
                    ctx.rotate(rotationDegree);
                    ctx.lineTo(0, getY(d));
                })
                ctx.closePath();
                ctx.fillStyle = set.fillColor;
                ctx.strokeStyle = set.strokeColor;
                ctx.lineWidth = cfg.lineWidth;
                ctx.fill();
                ctx.stroke();

                //画连接点
                if (cfg.showPoint) {
                    ctx.fillStyle = set.pointColor;
                    ctx.strokeStyle = set.pointStrokeColor;
                    ctx.lineWidth = cfg.pointBorderWidth;
                    _.each(set.data,function(d,j){
                        var y = getY(d);
                        ctx.rotate(rotationDegree);
                        ctx.beginPath();
                        ctx.arc(0, getY(d), cfg.pointRadius, 2 * Math.PI, false);
                        ctx.fill();
                        ctx.stroke();
                        if(animPc >= 1){
                            var p = getPosition(y,j);
                            pointRanges.push([p[0],p[1],j,i]);
                        }
                    });
                    ctx.rotate(rotationDegree);
                }
            }, this);
            ctx.restore();

            function getY(d){
                return animPc * (-1 * _this.calcOffset(d, scale.yScaleValue, scale.yHop))
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