
Ext.setup({
    onReady:function(){
        var sign = null;
        var number;
        var watchID = null;
        var opct = -0.1;
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
            document.addEventListener("backbutton", onBackKeyDown, false);
        }
        function onBackKeyDown() {
            if(opct>=1){
                navigator.app.exitApp();
            }
        }
        function startWatch() {
            var options = {frequency: 100 };
            watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
        }
        function startWatch2() {
            var options = {frequency: 100 };
            watchID = navigator.accelerometer.watchAcceleration(onSuccess2, onError, options);
        }
        function stopWatch() {
            if (watchID) {
                navigator.accelerometer.clearWatch(watchID);
                watchID = null;
            }
        }
        function onSuccess(acceleration) {
            if(acceleration.y.toFixed(0)<=-9){
                if(sign==null){
                    sign = 'spade';
                }
                stopWatch();
                main.setActiveItem(result);
                startWatch2();
            }else if(acceleration.y.toFixed(0)>=9){
                if(sign==null){
                    sign = 'hart';
                }
                stopWatch();
                main.setActiveItem(result);
                startWatch2();
            }else if(acceleration.x.toFixed(0)>=9){
                if(sign==null){
                    sign = 'diamond';
                }
                stopWatch();
                main.setActiveItem(result);
                startWatch2();
            }else if(acceleration.x.toFixed(0)<=-9){
                if(sign==null){
                    sign = 'clover';
                }
                stopWatch();
                main.setActiveItem(result);
                startWatch2();
            }
        }
        function onSuccess2(acceleration) {
            var element = document.getElementById('accelerometer');
            if((acceleration.x.toFixed(0)>=4&&acceleration.x.toFixed(0)<=5)||(acceleration.x.toFixed(0)<=-4&&acceleration.x.toFixed(0)>=-5)){                
                opct += 0.1;
                element.innerHTML = '<img style="opacity:'+ opct +'" src=sencha/resources/card/' + sign + number + '.png width=100% height=100%>';
                if(opct>=1){
                    stopWatch();
                }
            }
        }
        function onError() {
            alert('onError!');
        }
        
        var result = new Ext.Panel({
            fullscreen: true,
            style: 'background-color:#000000',
            html: '<div id=accelerometer></div>'
        });
        
        var select = new Ext.Panel({
            fullscreen: true,
            layout:{
                type: 'vbox',
                align: 'stretch',
            },
            items:[
            {
                flex: 1,
                layout:{
                    type: 'hbox',
                    align: 'stretch'
                },
                items:[
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 1;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 2;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 3;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 4;
                        startWatch();
                    }
                }]
            },
            {
                flex: 1,
                layout:{
                    type: 'hbox',
                    align: 'stretch'
                },
                items:[
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 5;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 6;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 7;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 8;
                        startWatch();
                    }
                }]
            },
            {
                flex: 1,
                layout:{
                    type: 'hbox',
                    align: 'stretch'
                },
                items:[
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 9;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 10;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 11;
                        startWatch();
                    }
                },
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 12;
                        startWatch();
                    }
                }]
            },
            {
                flex: 1,
                layout:{
                    type: 'hbox',
                    align: 'stretch'
                },
                items:[
                {
                    flex: '1',
                    xtype: 'button',
                    style: 'background:#000000;border:0px;border-radius:0px;',
                    pressedCls: 'background:#000000;border:0px;border-radius:0px;',
                    handler: function(){
                        number = 13;
                        startWatch();
                    }
                }]
            }]
        });
        
        var all = new Ext.Panel({
            fullscreen: true,
            items:[{
                width: '100%',
                height: '100%',
                xtype: 'button',
                style: 'background-color:#000000;background-image:url(sencha/resources/card/main.png);background-repeat: no-repeat;background-size: 100% 100%;border:0px;border-radius:0px;',
                handler: function(){
                	main.setActiveItem(select);
                }
            }],
            dockedItems: [{
                xtype: 'panel',
                dock: 'bottom',
                style: 'background-color:#000000',
                contentEl:'adamArea'
            }]
        });
        
        var main = new Ext.Panel({
            fullscreen: true,
            layout: 'card',
            items:[all, select, result]
        });
    }
});





		var daum_adam_vars = {
		    client : '2d18Z1HT137a299ea56',
		    position : 'MIDDLE',
		    bannerDivId : 'adamArea',
		    test : false
		};
	  

