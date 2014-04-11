$(function(){
    var data = {
        labels : ["2012","二月","三月","四月","五月","六月","七月",'八月','九月','十月','十一月','十二月','2013',"二月","三月","四月","五月","六月","七月",'八月','九月','十月','十一月','十二月','2014','一月','二月'],
        datasets : [
            {
                name : 'A产品',
                color : "#72caed",
                pointColor : "#95A5A6",
                pointBorderColor : "#fff",
                data : [65,59,90,81,56,55,40,20,13,20,11,60,65,59,90,81,56,55,40,20,11,20,10,60,11,60,65]
            },
            {
                name : 'B产品',
                color : "#a6d854",
                pointColor : "#95A5A6",
                pointBorderColor : "#fff",
                data : [28,48,40,19,96,27,100,40,40,70,11,89,28,48,40,19,96,27,100,40,40,70,10,89,28,48,40]
            }
        ]
    }
    new JChart.Line(data,{
        id : 'line_canvas',
        datasetGesture : true
    }).draw();
    new JChart.Bar(data,{
        id : 'bar_canvas',
        datasetGesture : true
    }).draw();

    var pie_data = [
        {
            name : '直接访问',
            value: 335,
            color:"#F38630"
        },{
            name : '联盟广告',
            value : 234,
            color : "#E0E4CC"
        },{
            name : '视频广告',
            value : 135,
            color : "#72caed"
        },{
            name : '搜索引擎',
            value : 1400,
            color : "#a6d854"
        }
    ];
    new JChart.Pie(pie_data,{
        id : 'pie_canvas'
    }).draw();
    var dount_pie = new JChart.Pie(pie_data,{
        id : 'dount_canvas',
        clickType : 'rotate',
        isDount : true,
        dountText : '访问来源'
    })
    dount_pie.on('rotate',function(d){
        var $pop = $(this.ctx.el).next();
        $pop.html(d.name + '<br>' + d.value).show();
    })
    dount_pie.draw();

    new JChart.Pie(pie_data,{
        id : 'sector_canvas_1',
        clickType : null,
        startAngle : -Math.PI,
        totalAngle : Math.PI
    }).draw();
    new JChart.Pie(pie_data,{
        id : 'sector_canvas_2',
        clickType : null,
        isDount : true,
        dountText : '访问来源',
        startAngle : Math.PI*3/4,
        totalAngle : Math.PI*3/4*2
    }).draw();


    var radar_data = {
        labels : ['外观','功能','系统','屏幕','性能'],
        datasets : [
            {
                color : "#72caed",
                pointColor : "#95A5A6",
                pointStrokeColor : "#fff",
                data : [90,50,60,71,54]
            },
            {
                color : "#a6d854",
                pointColor : "#95A5A6",
                pointStrokeColor : "#fff",
                data : [70,64,83,54,93]
            }
        ]
    }
    new JChart.Radar(radar_data,'radar_canvas').draw();

    var polar_data = {
        labels : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
        datasets : [
            {value: 3.14,color:"#F38630"},
            {value: 1.98,color:"#F38630"},
            {value: 1.32,color:"#F38630"},
            {value: 0.98,color:"#F38630"},
            {value: 0.81,color:"#F38630"},
            {value: 0.79,color:"#F38630"},
            {value: 1.07,color:"#E0E4CC"},
            {value: 1.84,color:"#E0E4CC"},
            {value: 3.35,color:"#E0E4CC"},
            {value: 4.61,color:"#E0E4CC"},
            {value: 5.27,color:"#E0E4CC"},
            {value: 5.39,color:"#E0E4CC"},
            {value: 5.39,color:"#72caed"},
            {value: 5.56,color:"#72caed"},
            {value: 5.60,color:"#72caed"},
            {value: 5.76,color:"#72caed"},
            {value: 5.86,color:"#72caed"},
            {value: 5.59,color:"#72caed"},
            {value: 5.56,color:"#a6d854"},
            {value: 6.19,color:"#a6d854"},
            {value: 6.60,color:"#a6d854"},
            {value: 6.60,color:"#a6d854"},
            {value: 6.05,color:"#a6d854"},
            {value: 4.70,color:"#a6d854"}
        ]
    };

    new JChart.Polar(polar_data,{
        id : 'polar_canvas',
        borderWidth : 1,
        showScaleLabel : false
    }).draw();
});