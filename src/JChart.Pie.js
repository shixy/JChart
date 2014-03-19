(function(_){
    function Pie(cfg,data){
        var _this = this;
        this.data = data;
        var pieRadius,segmentTotal = 0,rotateAngle = 0,startAngle,
            currentPullOutIndex = -1;
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
            clickType : 'rotate',// pullOut||rotate
            //是否开启动画
            animation : true,
            //动画执行步数
            animationSteps : 20,
            //动画效果
            animationEasing : "linear"

            //dount
        }
        /**
         * 计算各个扇形的起始角度
         * @param data
         */
        function calcAngel(){
            var angle = 0;
            for(var i in _this.data){
                var d = _this.data[i];
                d['startAngle'] = angle;
                angle = angle + (d.value/segmentTotal) * (Math.PI*2);
                d['endAngle'] = angle;
            }
        }

        function animRotate(percent){
            draw(percent,'rotate');
        }

        /**
         *  画饼图
         * @param percent 动画比例
         */
        function draw (percent,type){
            var initAngle = startAngle;
            _this.clear();
            var animPercent = 1;
            if (_this.config.animation) {
                animPercent = percent;
            }
            for (var i in _this.data){
                drawSegment(i,animPercent,initAngle,type);
            }
        }

        /**
         * 计算扇形真实的其实角度
         */
        function calcSegmentAngle(d,percent,initAngle,type){
            var start =d.startAngle,
                end = d.endAngle;
            if(type == 'rotate'){
                //旋转
                start = start + initAngle+rotateAngle*percent;
                end = end + initAngle+rotateAngle*percent;
            }else{
                //默认动画
                start = start*percent + initAngle;
                end = end*percent + initAngle
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
        function drawSegment(i,percent,initAngle,type){
            var x = _this.width/2,
                y = _this.height/ 2,
                d = _this.data[i];
            if(i == currentPullOutIndex){
                var midAngle = (d.startAngle + d.endAngle)/2+initAngle;
                x += Math.cos(midAngle) * _this.config.pullOutDistance;
                y += Math.sin(midAngle) * _this.config.pullOutDistance;
            }
            var angle = calcSegmentAngle(d,percent,initAngle,type);
            _this.drawSegment(x,y,pieRadius,angle.start,angle.end,d);
        }

        /**
         * 绑定canvas dom元素上的事件 如：click、touch
         */
        this.bindEvents = function(){
            this.ctx.canvas.addEventListener('click',clickHandler);
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
            if ( distanceFromCentre <= pieRadius ) {//点击在圆形内
                var clickAngle = Math.atan2(y, x)-startAngle;
                if ( clickAngle < 0 ) clickAngle = 2 * Math.PI + clickAngle;
                if(clickAngle > 2 * Math.PI) clickAngle = clickAngle - 2 * Math.PI;
                        for ( var i in _this.data ) {//判断属于哪个扇形
                            var d = _this.data[i];
                            if ( clickAngle >= d['startAngle'] && clickAngle <= d['endAngle'] ) {
                                if(!_this.trigger('click',[i,d[i]]))return;
                                if(type == 'rotate'){
                                    _this.rotate(i);
                                }else if(type == 'pullOut'){
                                    _this.toggleSegment(i);
                                }
                                return;
                    }
                }
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
            draw(1);
            this.trigger('pushIn');
        }
        /**
         * 弹出指定的扇形块
         * @param i 扇形索引
         */
        this.pullOut = function(i){
            if ( currentPullOutIndex == i ) return;
            currentPullOutIndex = i;
            draw(1);
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
        /**
         * 初始化部分元素值
         */
        this.init = function(){
            //计算半径(留10个像素)
            pieRadius = Math.min(_this.height/2,_this.width/2) - 10;
            for (var i in _this.data){
                segmentTotal += _this.data[i].value;
            }
            calcAngel();
            this.doAnim(null,draw);
            startAngle = _this.config.startAngle;
        }

        //初始化参数
        if(cfg)this.initial(cfg);
    }
    _.Pie = _.extend(_.Chart,Pie);
}(JChart));
