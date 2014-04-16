;(function(_){
    function Pie(data,cfg){
        _.Chart.apply(this);
        var angleRanges;//记录每个扇形的起始角度（从0开始）
        var _this = this;
        this.data = data;
        var radius,totalData = 0,startAngle = 0,rotateAngle = 0,currentOutIndex = -1,origin = {};
        //覆盖配置项
        _.extend(this.config,{
            //border
            showBorder : true,
            //border color
            borderColor : "#fff",
            //border width
            borderWidth : 2,
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
            dountFont : {
                size : 20,
                style : 600,
                color : '#3498DB'
            }
        });
        /**
         * 计算各个扇形的起始角度
         * @param data
         */
        function calcAngel(){
            var angle = 0;
            angleRanges = [];
            _.each(_this.data,function(d,i){
                var start = angle;
                var percent = d.value/totalData;
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
            percent = _this.config.animation ? percent : 1;
            _.each(angleRanges,function(a){
                drawSector(a,percent,type);
            });
            _this.config.isDount && _this.config.dountText && drawDountText();
        }

        /**
         * 计算扇形真实的角度
         */
        function calcSectorAngle(r,p,t){
            var start = r[0],end = r[1];
            if(t == 'rotate'){
                //旋转
                start = start + startAngle + rotateAngle*p;
                end = end + startAngle + rotateAngle*p;
            }else{
                //默认动画
                start = start*p + startAngle;
                end = end*p + startAngle
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
        function drawSector(r,p,t){
            var x = origin.x,y = origin.y,cfg = _this.config,
                index = r[3],angle = calcSectorAngle(r,p,t);

            if(index == currentOutIndex){
                var midAngle = (r[0] + r[1])/2+startAngle;
                x += Math.cos(midAngle) * cfg.pullOutDistance;
                y += Math.sin(midAngle) * cfg.pullOutDistance;
            }
            if(cfg.isDount){
                _this.ctx.dountSector(x,y,radius*cfg.dountRadiusPercent,radius,angle.start,angle.end,_this.data[index].color);
            }else{
                _this.ctx.sector(x,y,radius,angle.start,angle.end,_this.data[index].color);
            }
            cfg.showBorder && _this.ctx.stroke(cfg.borderColor,cfg.borderWidth);
            cfg.showText && drawText(x,y,radius,angle.start,angle.end,r);
        }

        function drawText(x,y,r,start,end,data){
            //计算文本位置
            var middAngle = (start+end)/ 2, dis = r/ 2,
                percent = data[4],d = data[2];
            if(_this.config.isDount){
                dis = r/2 + r*_this.config.dountRadiusPercent/2;
            }
            percent = (percent * 100).toFixed(1)+'%';
            var xaxis = Math.cos(middAngle) * dis + x, yaxis = Math.sin(middAngle) * dis + y;
            _this.drawText(percent,xaxis,yaxis,[d,data[3],data[4]]);
        }
        function drawDountText(){
            _this.ctx.fillText(_this.config.dountText,origin.x,origin.y,_this.config.dountFont);
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
            if ( clickAngle < 0 ) clickAngle += 2 * Math.PI;
            if(clickAngle > 2 * Math.PI) clickAngle -= 2 * Math.PI;

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
            if(i == currentOutIndex){
                this.pushIn();
            }else{
                this.pullOut(i);
            }
        }
        /**
         * 收起所有弹出的扇形块
         */
        this.pushIn = function(){
            currentOutIndex = -1;
            drawPie(1);
            this.trigger('pushIn');
        }
        /**
         * 弹出指定的扇形块
         * @param i 扇形索引
         */
        this.pullOut = function(i){
            if ( currentOutIndex == i ) return;
            currentOutIndex = i;
            drawPie(1);
            this.trigger('pullOut',[_this.data[i],i,angleRanges[i][4]]);
        }
        /**
         * 旋转扇形块的中线指向6点钟方向
         * @param i 扇形索引
         */
        this.rotate = function(i){
            if(_this.isAnimating)return;
            var middAngle = (angleRanges[i][0] + angleRanges[i][1]) / 2 + startAngle;
            var newRotateAngle = _this.config.rotateAngle-middAngle;
            if(_.isEqual(newRotateAngle,0))return;
            this.pushIn();
            rotateAngle = newRotateAngle;
            this.doAnim(null,animRotate,function(){
                startAngle += rotateAngle;
                _this.trigger('rotate',[_this.data[i],i,angleRanges[i][4]]);
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
            this.mergeFont(['textFont','dountFont']);
            calcOrigin();
            totalData = 0;
            currentOutIndex = -1;
            _.each(_this.data,function(d){
                totalData += d.value;
            });
            calcAngel();
            startAngle = _this.config.startAngle;
            if(noAnim){
                drawPie(1);
            }else{
                this.doAnim(null,drawPie);
            }
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
