(function(_){
    function Pie(data,cfg){
        _.Chart.apply(this);
        var _this = this;
        this.data = data;
        var pieRadius,segmentTotal = 0,startAngle = 0,rotateAngle = 0,currentPullOutIndex = -1;
        this.config = {
            id:'',
            //border
            segmentShowStroke : true,
            //border color
            segmentStrokeColor : "#fff",
            //border width
            segmentStrokeWidth : 2,
            //开始角度,默认为12点钟方向
            startAngle : -Math.PI/2,
            //旋转扇形，使其中线对应的角度
            rotateAngle : Math.PI/2,
            //扇形弹出距离
            pullOutDistance : 10,
            //点击扇形默认触发的事件类型
            clickType : 'pullOut',// pullOut||rotate
            //是否开启动画
            animation : true,
            //动画执行步数
            animationSteps : 20,
            //动画效果
            animationEasing : "linear",
            //环形图
            isDount : false,
            dountRadiusPercent :0.4,
            dountText : '',
            dountTextFont : 'bold 30px Arial',
            dountTextColor : '#e74c3c',
            dountTextBaseline : 'middle',
            dountTextAlign : 'center'
        }
        /**
         * 计算各个扇形的起始角度
         * @param data
         */
        function calcAngel(){
            var angle = 0;
            _.each(_this.data,function(d){
                d['startAngle'] = angle;
                angle = angle + (d.value/segmentTotal) * (Math.PI*2);
                d['endAngle'] = angle;
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
            _.each(_this.data,function(d,i){
                drawSegment(i,animPercent,type);
            });
            if(_this.config.isDount && _this.config.dountText){
                drawText();
            }
        }

        /**
         * 计算扇形真实的其实角度
         */
        function calcSegmentAngle(d,percent,type){
            var start =d.startAngle,
                end = d.endAngle;
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
        function drawSegment(i,percent,type){
            var x = _this.width/2,
                y = _this.height/ 2,
                d = _this.data[i];
            if(i == currentPullOutIndex){
                var midAngle = (d.startAngle + d.endAngle)/2+startAngle;
                x += Math.cos(midAngle) * _this.config.pullOutDistance;
                y += Math.sin(midAngle) * _this.config.pullOutDistance;
            }
            var angle = calcSegmentAngle(d,percent,type);
            drawPiePart(x,y,pieRadius,angle.start,angle.end,d);
        }

        function drawPiePart(x,y,r,start,end,data){
            var ctx = _this.ctx;
            ctx.beginPath();
            ctx.arc(x,y,r,start,end,false);
            if(_this.config.isDount){
                ctx.arc(x,y,r*_this.config.dountRadiusPercent,end,start,true);
            }else{
                ctx.lineTo(x,y);
            }
            ctx.closePath();
            ctx.fillStyle = data.color;
            ctx.fill();
            if(_this.config.segmentShowStroke){
                ctx.lineWidth = _this.config.segmentStrokeWidth;
                ctx.strokeStyle = _this.config.segmentStrokeColor;
                ctx.stroke();
            }
        }

        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            this.ctx.canvas.addEventListener('click',clickHandler);
            //添加一个默认点击事件
            this.on('click',function(){return true;})
        }
        /**
         * click handler
         * 计算点击位置在图形中的所属
         * @param event
         */
        function clickHandler(event){
            var type = _this.config.clickType;
            var x = event.pageX - this.offsetLeft - _this.width/2;
            var y = event.pageY - this.offsetTop - _this.height/2;
            var distanceFromCentre = Math.sqrt( Math.pow( Math.abs(x), 2 ) + Math.pow( Math.abs(y), 2 ) );
            var isInPie = (distanceFromCentre <= pieRadius);
            if(isInPie && _this.config.isDount){
                isInPie = (distanceFromCentre >= pieRadius*_this.config.dountRadiusPercent);
            }
            if (isInPie) {//点击在圆形内
                var clickAngle = Math.atan2(y, x)-startAngle;
                if ( clickAngle < 0 ) clickAngle = 2 * Math.PI + clickAngle;
                if(clickAngle > 2 * Math.PI) clickAngle = clickAngle - 2 * Math.PI;
                _.each(_this.data,function(d,i){//判断属于哪个扇形
                    if ( clickAngle >= d['startAngle'] && clickAngle <= d['endAngle'] ) {
                        if(!_this.trigger('click',[i,d]))return;
                        if(type == 'rotate'){
                            _this.rotate(i);
                        }else if(type == 'pullOut'){
                            _this.toggleSegment(i);
                        }
                        return;
                    }
                })
            }
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
            this.trigger('pullOut',[i,_this.data[i]]);
        }
        /**
         * 旋转扇形块的中线指向6点钟方向
         * @param i 扇形索引
         */
        this.rotate = function(i){
            var middAngle = (_this.data[i].startAngle + _this.data[i].endAngle) / 2 + startAngle;
            var newRotateAngle = _this.config.rotateAngle-middAngle;
            if(_.isEqual(newRotateAngle,0))return;
            this.pushIn();
            rotateAngle = newRotateAngle;
            this.doAnim(null,animRotate,function(){
                startAngle += rotateAngle;
                _this.trigger('rotate',[i,_this.data[i]]);
            });
        }
        this.setDountText = function(text){
            _this.config.dountText = text;
            drawPie(1);
        }
        /**
         * 初始化部分元素值
         */
        this.init = function(){
            //计算半径(留10个像素)
            pieRadius = Math.min(_this.height/2,_this.width/2) - 10;
            _.each(_this.data,function(d){
                segmentTotal += d.value;
            });
            calcAngel();
            this.doAnim(null,drawPie);
            startAngle = _this.config.startAngle;
        }

        function drawText(){
            var ctx = _this.ctx;
            ctx.textBaseline = _this.config.dountTextBaseline;
            ctx.textAlign = _this.config.dountTextAlign;
            ctx.font = _this.config.dountTextFont;
            ctx.fillStyle = _this.config.dountTextColor;
            ctx.fillText(_this.config.dountText,_this.width/2,_this.height/2,pieRadius*2);
        }

        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Pie = Pie;
}(JChart));
