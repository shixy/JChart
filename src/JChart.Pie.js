;(function(_){
    function Pie(data,cfg){
        _.Chart.apply(this);
        var angleRanges;//记录每个扇形的起始角度（从0开始）
        var _this = this;
        this.data = data;
        var radius,segmentTotal = 0,startAngle = 0,rotateAngle = 0,currentPullOutIndex = -1,origin = {};
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
            totalAngle : Math.PI*2,
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
                var percent = d.value/segmentTotal
                angle = angle + percent * _this.config.totalAngle;
                var end = angle;
                angleRanges.push([start,end,d,i,percent]);
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
         * 计算扇形真实的角度
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
            var x = origin.x,y = origin.y,cfg = _this.config,
                index = range[3],angle = calcSegmentAngle(range,percent,type);

            if(index == currentPullOutIndex){
                var midAngle = (range[0] + range[1])/2+startAngle;
                x += Math.cos(midAngle) * cfg.pullOutDistance;
                y += Math.sin(midAngle) * cfg.pullOutDistance;
            }
            if(cfg.isDount){
                _this.ctx.dountSector(x,y,radius*cfg.dountRadiusPercent,radius,angle.start,angle.end,_this.data[index].color);
            }else{
                _this.ctx.sector(x,y,radius,angle.start,angle.end,_this.data[index].color);
            }
            cfg.showSegmentBorder && _this.ctx.stroke(cfg.segmentBorderColor,cfg.segmentBorderWidth);
            //if(percent>=1){
                drawText(x,y,radius,angle.start,angle.end,range);
            //}
        }

        function drawText(x,y,r,start,end,data){
            //计算文本位置
            var text,middAngle = (start+end)/ 2, dis = r/ 2,
                percent = data[4],d = data[2];
            if(_this.config.isDount){
                dis = r/2 + r*_this.config.dountRadiusPercent/2;
            }
            percent = (percent * 100).toFixed(1)+'%';
            var xaxis = Math.cos(middAngle) * dis + x;
            var yaxis = Math.sin(middAngle) * dis + y;
            _this.ctx.set({
                textBaseline : 'middle',
                textAlign : 'center',
                font : _this.config.labelFontStyle + " " + _this.config.labelFontSize+"px " + _this.config.labelFontFamily,
                fillStyle : _this.config.dountTextColor
            });
            text = _this.trigger('renderText',[percent,d,data[3]]);
            text = text?text:percent;
            _this.ctx.fillText(text,xaxis,yaxis);
        }
        function drawDountText(){
            _this.ctx.fillText(_this.config.dountText,origin.x,origin.y,{
                textBaseline : _this.config.dountTextBaseline,
                textAlign : _this.config.dountTextAlign,
                font : _this.config.dountTextFont,
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
            var x = offsetX - origin.x;
            var y = offsetY - origin.y;
            //距离圆点的距离
            var dfc = Math.sqrt( Math.pow( Math.abs(x), 2 ) + Math.pow( Math.abs(y), 2 ) );
            var isInPie = (dfc <= radius);
            if(isInPie && _this.config.isDount){//排除dount图中心区
                isInPie = (dfc >= radius*_this.config.dountRadiusPercent);
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
         * 画图
         */
        this.draw = function(noAnim){
            calcOrigin();
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
        //计算原点位置及半径
        function calcOrigin(){
            if(_this.config.totalAngle == Math.PI){
                origin = {
                    x : _this.width/2,
                    y : _this.height - 20
                }
                radius = Math.min(origin.x,origin.y) - 10;
            }else{
                origin = {x:_this.width/2,y:_this.height/2};
                radius = Math.min(origin.x,origin.y) - 10;
            }
        }
        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Pie = Pie;
}(JChart));
