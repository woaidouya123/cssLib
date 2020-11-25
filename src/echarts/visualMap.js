(function(global, factory) {
    'use strict';
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = factory(global);
    } else {
        global._visualMap = factory(global);
    }
})(typeof window !== "undefined" ? window : this, function(global, undefined) {
    'use strict';
    var visualMap = function (context) {
        return new visualMap.prototype.init(context);
    };

    // 初始化visualMap
    visualMap.prototype.init = function (context) {
        this.context = context = context || document;
        this.s_color = [0,0,0];
        this.e_color = [255,255,255];
        return this;
    };
    visualMap.prototype.init.prototype = visualMap.prototype;

    // 设置最小最大值
    visualMap.prototype.setLimits = function(min, max) {
        if(min == null || max == null){
            throw Error("setLimits method require two arguments.");
        }else if(min >= max){
            throw Error("the second argument should be bigger than the first argument.");
        }
        this.min = min;
        this.max = max;
        return this;
    }

    // 设置颜色
    visualMap.prototype.setColors = function(s_color, e_color) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(s_color == null || e_color == null){
            throw Error("setColors method require two arguments.");
        }
        if (!reg.test(s_color) || !reg.test(e_color)) {
            throw new Error("please use hsx color.")
        }
        this.s_color = colorToRgb(s_color);
        this.e_color = colorToRgb(e_color);
        return this;
    }

    // 根据数据获取颜色值
    visualMap.prototype.getColor = function(data) {
        var res, i;
        if(this.min == null || this.max == null){
            throw Error("please use setLimits method to set data limits before getColor.");
        }
        if(data instanceof Array){
            res = [];
            for(i=0;i<data.length;i++){
                res.push('RGB('+calcColor(this.min, this.max, this.s_color, this.e_color, data[i]).join(",")+")");
            }
        }else{
            res = 'RGB('+calcColor(this.min, this.max, this.s_color, this.e_color, data).join(",")+")";
        }
        return res;

    }

    // 颜色计算
    const calcColor = function(min, max, s_color, e_color, num){
        var percent = (num - min)/(max - min), res_color = [];
        for(let i=0;i<s_color.length;i++){
            res_color.push(s_color[i]+(e_color[i]-s_color[i])*percent);
        }
        return res_color;
    }

    // 颜色转换
    const colorToRgb = function(s) {
        // 把颜色值变成小写
        var color = s.toLowerCase();
        // 如果只有三位的值，需变成六位，如：#fff => #ffffff
        if (color.length === 4) {
            var colorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                colorNew += color.slice(i, i + 1).concat(color.slice(i, i + 1));
            }
            color = colorNew;
        }
        // 处理六位的颜色值，转为RGB
        var colorChange = [];
        for (let i = 1; i < 7; i += 2) {
            colorChange.push(parseInt("0x" + color.slice(i, i + 2)));
        }
        return colorChange;
    }

    return visualMap;

});