;(function(_){
    function Pie(data,cfg){
        _.Chart.apply(this);
        var angleRanges;//记录每个扇形的起始角度（从0开始）
        var _this = this;
        this.data = data;
        var pieRadius,segmentTotal = 0,startAngle = 0,rotateAngle = 0,currentPullOutIndex = -1;
        _.mergeObj(this.config,{
            //border
            showSegmentBorder : true,
            //border color
            segmentBorderColor : "#fff",
            //border width
            segmentBorderWidth : 2,
            //开始角度,默认为12点钟方向
            startAngle : -Math.PI/2,
            //旋转扇形，使其中线对应的角度
            rotateAngle : Math.PI/2,
            //扇形弹出距离
            pullOutDistance : 10,
            //点击扇形默认触发的事件类型
            clickType : 'pullOut',// pullOut||rotate
            //环形图
            isDount : false,
            dountRadiusPercent :0.4,
            dountText : '',
            dountTextFont : 'bold 30px Arial',
            dountTextColor : '#e74c3c',
            dountTextBaseline : 'middle',
            dountTextAlign : 'center'
        })
        /**
         * 计算各个扇形的起始角度
         * @param data
         */
        function calcAngel(){
            var angle = 0;
            angleRanges = [];
            _.each(_this.data,function(d,i){
                var start = angle;
                angle = angle + (d.value/segmentTotal) * (Math.PI*2);
                var end = angle;
                angleRanges.push([start,end,d,i]);
            })
        }

        function animRotate(percent){
            drawPie(percent,'rotate');
        }

        /**
         *  画饼图
         * @param percent 动画比例
         */
        function drawPie (percent,type){
            _this.clear();
            var animPercent = 1;
            if (_this.config.animation) {
                animPercent = percent;
            }
            _.each(angleRanges,function(a){
                drawSegment(a,animPercent,type);
            });
            if(_this.config.isDount && _this.config.dountText){
                drawDountText();
            }
        }

        /**
         * 计算扇形真实的其实角度
         */
        function calcSegmentAngle(range,percent,type){
            var start = range[0],
                end = range[1];
            if(type == 'rotate'){
                //旋转
                start = start + startAngle + rotateAngle*percent;
                end = end + startAngle + rotateAngle*percent;
            }else{
                //默认动画
                start = start*percent + startAngle;
                end = end*percent + startAngle
            }
            return {
                start : start,
                end : end
            }
        }

        /**
         * 画扇形
         * @param i
         * @param animPercent
         */
        function drawSegment(range,percent,type){
            var x = _this.width/2,
                y = _this.height/ 2,
                index = range[3];
            if(index == currentPullOutIndex){
                var midAngle = (range[0] + range[1])/2+startAngle;
                x += Math.cos(midAngle) * _this.config.pullOutDistance;
                y += Math.sin(midAngle) * _this.config.pullOutDistance;
            }
            var angle = calcSegmentAngle(range,percent,type);
            drawPiePart(x,y,pieRadius,angle.start,angle.end,_this.data[index]);
            if(percent>=1){
                drawText(x,y,pieRadius,angle.start,angle.end,_this.data[index]);
            }
        }

        function drawPiePart(x,y,r,start,end,data){
            var color = data.color,borderColor,borderWidth;
            if(_this.config.showSegmentBorder){
                borderColor = _this.config.segmentBorderColor;
                borderWidth = _this.config.segmentBorderWidth;
            }
            if(_this.config.isDount){
                _this.ctx.dountSector(x,y,r*_this.config.dountRadiusPercent,r,start,end,color,borderColor,borderWidth);
            }else{
                _this.ctx.sector(x,y,r,start,end,color,borderColor,borderWidth);
            }
        }
        function drawText(x,y,r,start,end,data){
            //计算文本位置
            var middAngle = (start+end)/2;
            var d = r/2;
            if(_this.config.isDount){
                d = r/2 + r*_this.config.dountRadiusPercent/2;
            }
            var xaxis = Math.cos(middAngle) * d + x;
            var yaxis = Math.sin(middAngle) * d + y;
            _this.ctx.fillText('30%',xaxis,yaxis,{
                textBaseline : _this.config.dountTextBaseline,
                textAlign : _this.config.dountTextAlign,
                font : 'normal 20px Arial',
                fillStyle : _this.config.dountTextColor
            });
        }
        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            this.on('_tap',function(x,y){tapHandler(x,y,'tap.pie')});
            //暂时关闭doubleTap事件
            //this.on('_doubleTap',function(x,y){tapHandler(x,y,'doubleTap.pie')});
            this.on('_longTap',function(x,y){tapHandler(x,y,'longTap.pie')});
            //添加一个默认点击事件
            this.on('tap.pie',function(){return true;})
        }

        function tapHandler(x,y,event){
            var type = _this.config.clickType;
            var angle = isInSegment(x,y);
            if(angle){
                if(event == 'tap.pie'){//处理一些默认行为
                    if(!_this.trigger(event,[angle[2],angle[3]]))return;
                    if(type == 'rotate'){
                        _this.rotate(angle[3]);
                    }else if(type == 'pullOut'){
                        _this.toggleSegment(angle[3]);
                    }
                }else{
                    _this.trigger(type,[angle[2],angle[3]]);
                }

            }
        }

        function isInSegment(offsetX,offsetY){
            var angle;
            var x = offsetX - _this.width/2;
            var y = offsetY - _this.height/2;
            //距离圆点的距离
            var dfc = Math.sqrt( Math.pow( Math.abs(x), 2 ) + Math.pow( Math.abs(y), 2 ) );
            var isInPie = (dfc <= pieRadius);
            if(isInPie && _this.config.isDount){//排除dount图中心区
                isInPie = (dfc >= pieRadius*_this.config.dountRadiusPercent);
            }
            if(!isInPie)return;

            var clickAngle = Math.atan2(y, x)-startAngle;
            if ( clickAngle < 0 ) clickAngle = 2 * Math.PI + clickAngle;
            if(clickAngle > 2 * Math.PI) clickAngle = clickAngle - 2 * Math.PI;

            _.each(angleRanges,function(a){
                if(clickAngle >= a[0] && clickAngle < a[1]){
                    angle = a;
                    return false;
                }
            });
            return angle;
        }

        /**
         * 弹出/收起扇形块
         * @param i 扇形索引
         */
        this.toggleSegment = function(i){
            if(i == currentPullOutIndex){
                this.pushIn();
            }else{
                this.pullOut(i);
            }
        }
        /**
         * 收起所有弹出的扇形块
         */
        this.pushIn = function(){
            currentPullOutIndex = -1;
            drawPie(1);
            this.trigger('pushIn');
        }
        /**
         * 弹出指定的扇形块
         * @param i 扇形索引
         */
        this.pullOut = function(i){
            if ( currentPullOutIndex == i ) return;
            currentPullOutIndex = i;
            drawPie(1);
            this.trigger('pullOut',[_this.data[i],i]);
        }
        /**
         * 旋转扇形块的中线指向6点钟方向
         * @param i 扇形索引
         */
        this.rotate = function(i){
            var middAngle = (angleRanges[i][0] + angleRanges[i][1]) / 2 + startAngle;
            var newRotateAngle = _this.config.rotateAngle-middAngle;
            if(_.isEqual(newRotateAngle,0))return;
            this.pushIn();
            rotateAngle = newRotateAngle;
            this.doAnim(null,animRotate,function(){
                startAngle += rotateAngle;
                _this.trigger('rotate',[_this.data[i],i]);
            });
        }
        this.setDountText = function(text){
            _this.config.dountText = text;
            drawPie(1);
        }
        /**
         * 初始化部分元素值
         */
        this.init = function(noAnim){
            //计算半径(留10个像素)
            pieRadius = Math.min(_this.height/2,_this.width/2) - 10;
            segmentTotal = 0;
            currentPullOutIndex = -1;
            _.each(_this.data,function(d){
                segmentTotal += d.value;
            });
            calcAngel();
            if(noAnim){
                drawPie(1);
            }else{
                this.doAnim(null,drawPie);
            }
            startAngle = _this.config.startAngle;
        }

        function drawDountText(){
            _this.ctx.fillText(_this.config.dountText,_this.width/2,_this.height/2,{
                textBaseline : _this.config.dountTextBaseline,
                textAlign : _this.config.dountTextAlign,
                font : _this.config.dountTextFont,
                fillStyle : _this.config.dountTextColor
            });
        }

        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Pie = Pie;
}(JChart));
