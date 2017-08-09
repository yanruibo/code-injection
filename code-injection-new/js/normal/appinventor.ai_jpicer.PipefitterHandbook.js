


        !window['AC'] && (AC = {});
        
        if ("Pro" !== '' && "Pro" != 'Pro') {
            function onSkipSplash() {
                AC['trialSplashSkipped'] = true;
                var el = document.getElementById("trialSplash");
                if (el) {
                    el.style.visibility = "hidden";
                }
                return false;
            }

            setTimeout(function() {
                onSkipSplash();
            } , 5000);
        } else {
            AC['trialSplashSkipped'] = true;
        }
    

            var splashs = {
                iphone : "AppResources/splashes/iphone.png",
                iphoneretina : "AppResources/splashes/iphoneretina.png",
                ipadl : "AppResources/splashes/ipadl.png" ,
                ipadp : "AppResources/splashes/ipadp.png" ,
                ldpi : "AppResources/splashes/ldpi.png",
                mdpi : "AppResources/splashes/mdpi.png",
                hdpi : "AppResources/splashes/hdpi.png"}
            var image = "AppResources/splashes/mobile.png",dW = screen.availWidth,
            isIOS = (/iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 ),
            isAndroid = (/android/gi).test(navigator.appVersion),devicePixelRatio = window.devicePixelRatio,
            orientation = "any";
            if (isIOS){
                if (dW == 320 || dW == 300 ){
                    if (devicePixelRatio >= 2){
                        image= splashs.iphoneretina;
                    }
                    else {
                        image=splashs.iphone;
                    }
                } 
                else if (orientation == "landscape") {
                    image= splashs.ipadl;
                } 
                else if (orientation == "portrait") {
                    image= splashs.ipadp;
                }
                else if (window.orientation == -90 || window.orientation == 90) {
                    image= splashs.ipadl;
                } 
                else if (window.orientation == 0 || window.orientation == 90) {
                    image= splashs.ipadp;
                }
                else {
                    image=splashs.iphone;
                }
            } else if (isAndroid) {
                if (devicePixelRatio == 0.75){
                    image=  splashs.ldpi;
                } 
                else if (devicePixelRatio == 1.5){
                    image= splashs.hdpi;
                }
                else{
                    image=splashs.mdpi ;
                }
            }

            document.write('<td id="splashScreenImage" align="center" style="background:url( ' + image + ') center center; background-size:100% 100%; padding:0px;">');
            document.write('<span style="width:100%; height:100%;background: transparent"></span>');

        
 var isIOS = (/iPhone|iPad|iPod/.test( navigator.platform ) && navigator.userAgent.indexOf( "AppleWebKit" ) > -1 );  if (isIOS){  var wl = document.getElementsByTagName("table")[0];  wl.style.height = (parseInt(document.height, 10) + 20) + "px";wl.style.position = "absolute"; wl.style.top="-20px"; } 

AC.advertisingWidget = true; AC.advertisingSplash = false;
AC.advertisingBadKeywords = false;
AC.remoteDebug = false;



        window.WiziFormId = '6822d500-62c7-4f28-9b07-7aeea7cb9c73';window.formObject = {"__className":"WiziCore_LoginFormFullResult","loginResult":{"__className":"WiziCore_LoginFullResult","sessionId":"00000000-0000-0000-0000-000000000000","user":{"__className":"WiziCore_User","username":"Guest","id":"00000000-0000-0000-0000-000000000000","role":"guest","login":"Guest"}},"formResult":"6822d500-62c7-4f28-9b07-7aeea7cb9c73"};



AC.Config.staticUrl = function(){return 'https://d3i5ozboswv05q.cloudfront.net/1.43.15/'};














AC.Config.set({
    apiAdapter : "Web",
    needFlashVersion : "9.0.0",
    clientApi : "https://jpicer.applicationcraft.com/",
    serverUrl : "https://jpicer.applicationcraft.com/service/",
    serverUploadUrl : "https://jpicer.applicationcraft.com/service/",
    uploadServerPath: "https://jpicer.applicationcraft.com/service/uploads/",
    uploadServerDirectPath: "https://jpicer.applicationcraft.com/service/uploads/direct.php",
    serverEventsUrl: 'https://notify.applicationcraft.com/events',
    formatApi : "json",
    serverThemes: "themes/",
    localAppsPath: 'Apps/',
    flashAdapterUrl : "wiziCore/api/server/adapter/WiziSendRequest.swf",
    isDebugRequest : true,
    googleApiKey: {"rows":[{"id":1,"data":["http://applicationcraft.com/","ABQIAAAACfMroKb5WzfdVTHbQi2OfRRGQFuqEDC-bwWLPZ60Ces-G56XXhTiOZYFBXlh0_EId2nXJCwq7iTNIg"],"ind":1}]}
});



/**
 * @lends       WiziCore_UI_WeatherWidget#
 */
(function($, window, document, undefined){
var WiziCore_UI_WeatherWidget = AC.Widgets.WiziCore_UI_WeatherWidget = AC.Widgets.Base.extend({
    _widgetClass : "WiziCore_UI_WeatherWidget", //widget Class name
    _dataPropName : "zipCode", //the method name, which is responsible for working with data
    _weatherDiv: null,//jQuery object
    _wBtn : null,

    _run: null,

    /**
     * Description of constructor
     * @class  Some words about label widget class
     * @author      Dmitry Souchkov, Yuri Podoplelov
     * @version     0.2
     *
     * @constructs
     */
    init: function() {
        this._super.apply(this, arguments);
    },

    draw: function() {
        this._input = $('<input type="text" class="input clear-input-border" style="width:100%; height:100%"/>');
        var div = $("<div>");
        div.css({position: "relative", width: "100%", height:"100%"});
        this._weatherDiv = div;
        this._wBtn = $("<input type='button' class='input' style='height:100%'>")
                .css({
                         "position": "absolute",
                         "right": "0px",
                         "cursor": "pointer",
                         "top": "0px",
                         "background-color": "#f7f7f7",
                         "border": "1px solid gray"
                     });

        div.append(this._input);
        div.append(this._wBtn);
        this.base().prepend(div);

        var self = this;
        $(self._input).bind("change.custom", {self : self}, self.onChangeText);
        $(self._input).bind("keydown.custom", {self : self}, self.onKeyDown);
        $(self._wBtn).bind("click.custom", {self: self}, self.onWBtnClick);
        /*
         var text = initialObject.prop(this._dataPropName);
         if (text != undefined){
         initialObject.value( text );
         }
         */
        this._super.apply(this, arguments);
    },


    initProps: function() {
        this._super();

        this.font = this.themeProperty('font', this._font);
        this.border = this.themeProperty('border', this._border);
        this.fontColor = this.themeProperty('fontColor', this._fontColor);
        this.bg = this.themeProperty('bgColor', this._bg);

        this.btnText = this.htmlProperty('btnText', this._btnText);
        this.opacity = this.htmlProperty('opacity', this._opacity);
        this.tabindex = this.htmlProperty('tabindex', this._tabindex);

        this.showBtn = this.htmlProperty('showBtn', this._showBtn);
        this.gridField = this.normalProperty('gridField');
        this.failText = this.normalProperty('failText');
        this.zipCode = this.htmlProperty('zipCode', this._zipCode);
    },

    initDomState : function () {
        this._super();
        this.initDomStatePos();
        this._bg(this.bg());
        this._font(this.font());
        this._fontColor(this.fontColor());
        this._border(this.border());

        this._updateEnable();
        this._visible(this.visible());
        this._opacity(this.opacity());
        this._tabindex(this.tabindex());

        this._btnText(this.btnText());
        this._showBtn(this.showBtn());
        this._zipCode(this.zipCode());
    },

    destroy: function() {
        $(this._input).unbind("keydown.custom");
        $(this._input).unbind("change.custom");
        $(this._wBtn).unbind("click.custom");
        this._super();
    },

    setFocus: function(){
        if (this._isDrawn && this.mode() != WiziCore_Visualizer.EDITOR_MODE){
            this._input.focus();
        }
    },

    onWBtnClick: function(ev) {
        if (ev != undefined) {
            var self = ev.data.self;
        } else {
            self = this;
        }
        var form = self.form();
        var weatherClient = form.weatherClient;

        var fail = form.find(self.failField());
        var city = form.find(self.cityField());
        var state = form.find(self.stateField());
        var grid = null;
        var zip = self.zipCode();
        var colModel = null;
        var gridField = self.gridField();
        if (typeof gridField == "object" && gridField != null) {
            if (gridField.gridUid != undefined) {
                grid = form.find(gridField.gridUid);
            }

            if (gridField.colValue != undefined) {
                colModel = gridField.colValue;
            }
        }
        weatherClient.WeatherForecast(zip, fail, function(result, error) {
            if (error === true) {
                self.onError(result);
            } else {
                if (result.Success == "false") {
                    self.onFail(result);
                } else {
                    self.onSuccess(result);
                }
            }
        }, state, city, grid, colModel);
        self.setGMapPosition();
    },

    setGMapPosition: function() {
        if (this.gMap() != null) {
            //call googleMap widget
            var form = this.object().form();
            var gMap = form.find(this.gMap());
            if (gMap != null) {
                var webClient = form.context().webClient();
                webClient.httpRequest("http://maps.google.com/maps/api/geocode/json",
                        "GET", function(data, error) {
                    if (error === false && data.results[0] !== undefined) {
                        gMap.prop("longitude", data.results[0].geometry.location.lng);
                        gMap.prop("latitude", data.results[0].geometry.location.lat);
                    }
                }, {address: this.zipCode(), sensor:"false"}, "json");
            }
        }
    },

    onSuccess: function(json) {
        var triggerEvent = new jQuery.Event(WiziCore_UI_WeatherWidget.onSuccess);
        $(this.object()).trigger(triggerEvent, [json]);
        return !triggerEvent.isPropagationStopped();
    },

    onFail: function(result) {
        WiziCore_Helper.showWarning("", result.ResponseText);
        var triggerEvent = new jQuery.Event(WiziCore_UI_WeatherWidget.onFail);
        $(this.object()).trigger(triggerEvent, [result]);
        return !triggerEvent.isPropagationStopped();
    },

    onError: function(result) {
        WiziCore_Helper.showError(AC.Core.lang().tr("widget_ext_weather_error"), this.failText(), 1332);
        var triggerEvent = new jQuery.Event(WiziCore_UI_WeatherWidget.onError);
        $(this.object()).trigger(triggerEvent, [result]);
        return !triggerEvent.isPropagationStopped();
    },

    onChangeText: function(ev) {
        var self = ev.data.self;
        self.zipCode($(self._input).val());
    },

    onKeyDown: function(ev) {
        var self = ev.data.self;
        if (ev.keyCode == 13) {
            self.zipCode($(self._input).val());
            self.onWBtnClick();
        }
    },

    _enable: function(flag){
        this._super(flag, this._input);
        this._super(flag, this._wBtn);
        (flag === false) ? this._input.addClass('ui-state-disabled') : this._input.removeClass('ui-state-disabled');
        (flag === false) ? this._wBtn.addClass('ui-state-disabled') : this._wBtn.removeClass('ui-state-disabled');
    },

    _zipCode: function(text) {
        this.base().find("input:eq(0):text").attr("value", text);
    },

    failField: function(val) {
        if (val != undefined) {
            this._project['failField'] = this.getUidWidgetFromObjectChooser(val);
            var obj = {"failField": this._project['failField']};
            this.sendExecutor(obj);
        }
        return this._project['failField'];
    },

    _showBtn: function(val) {
        if (val != undefined) {
            if (val == true) {
                $(this._wBtn).show();
            } else {
                $(this._wBtn).hide();
            }
        }
    },

    gMap: function(val) {
        if (val != undefined) {
            this._project['gMap'] = this.getUidWidgetFromObjectChooser(val);
            var obj = {"gMap": this._project['gMap']};
            this.sendExecutor(obj);
        }
        return this._project['gMap'];
    },

    cityField: function(val) {
        if (val != undefined) {
            this._project['cityField'] = this.getUidWidgetFromObjectChooser(val);
            var obj = {"cityField": this._project['cityField']};
            this.sendExecutor(obj);
        }
        return this._project['cityField'];
    },

    stateField: function(val) {
        if (val != undefined) {
            this._project['stateField'] = this.getUidWidgetFromObjectChooser(val);
            var obj = {"stateField": this._project['stateField']};
            this.sendExecutor(obj);
        }
        return this._project['stateField']
    },

    run: function(val) {
        if (val != undefined) {
            this._run = val;
            this.onWBtnClick();
        }
        return this._run;
    },

    _fontColor : function(val) {
        this._super(val);
        this._super(val, this.base().find("input:eq(0)"));
        this._super("", this.base().find("input:eq(1)"));
    },

    _font : function(val) {
        this._super(val);
        this._super(val, this.base().find("input:eq(0)"));
        this._super("", this.base().find("input:eq(1)"));
    },

    /*calculateHeight: function(height) {
        this._super(height);
        this._wBtn.css("width", this.height());
    },*/

    _updateLayout: function(){
        this._super();
        //this._weatherDiv.width(this.width())
        this._weatherDiv.height(this.height());
        this._input.width(this.width())
                   .height(this.height());
        this._wBtn.width(this.height())
                  .height(this.height());
    },

    _btnText: function(val) {
        $(this._wBtn).val(val);
    },

    /**
     * Return widget data model
     */
    getDataModel: function() {
        var values = [
            {name: "widget_ext_weather", value: "", uid: "exampleuid"}
        ];
        return values;
    }
});

var _props = [
    { name: AC.Property.group_names.general, props:[
        AC.Property.general.widgetClass,
        AC.Property.general.name,
        AC.Property.general.btnText
    ]},
    { name: AC.Property.group_names.database, props:[
        AC.Property.database.isIncludedInSchema,
        AC.Property.database.dataType,
        AC.Property.database.isUnique,
        AC.Property.database.mandatoryHighlight,
        AC.Property.database.mandatory
    ]},
    { name: AC.Property.group_names.layout, props:[
        AC.Property.layout.x,
        AC.Property.layout.y,
        AC.Property.layout.pWidthHidden,
        AC.Property.layout.widthHidden,
        AC.Property.layout.heightHidden,
        AC.Property.layout.sizes,
        AC.Property.layout.minWidth,
        AC.Property.layout.maxWidth,
        AC.Property.layout.maxHeight,
        AC.Property.layout.zindex,
        AC.Property.layout.tabindex,
        AC.Property.layout.tabStop,
        AC.Property.layout.anchors,
        AC.Property.layout.repeat,
        AC.Property.layout.alignInContainer
    ]},
    { name: AC.Property.group_names.behavior, props:[
        AC.Property.behavior.dragAndDrop,
        AC.Property.behavior.resizing,
        AC.Property.behavior.visible,
        AC.Property.behavior.enable
    ]},
    { name: AC.Property.group_names.data, props:[
        {name: "showBtn", type : "boolean", set:"showBtn", get:"showBtn", alias : "widget_ext_weather_prop_showbtn"},
        {name: "zipCode", type : "text", set:"zipCode", get:"zipCode", alias : "widget_ext_weather_prop_zipcode"},
        {name: "failField", type : "widgetlist", set:"failField", get:"failField", alias : "widget_ext_weather_prop_failfield"},
        {name: "cityField", type : "widgetlist", set:"cityField", get:"cityField", alias : "widget_ext_weather_prop_cityfield"},
        {name: "stateField", type : "widgetlist", set:"stateField", get:"stateField", alias : "widget_ext_weather_prop_statefield"},
        {name: "gridField", type : "weathergridcolumn", set:"gridField", get:"gridField", alias : "widget_ext_weather_prop_gridfield"},
        {name: "gMap", type : "gmapswidgetlist", set:"gMap", get:"gMap", alias : "widget_ext_weather_prop_gmap"},
        {name: "failText", type : "text", set:"failText", get:"failText", alias : "widget_ext_weather_prop_failtext"}
    ]},
    { name: AC.Property.group_names.style, props:[
        AC.Property.behavior.opacity,
        AC.Property.style.font,
        AC.Property.style.fontColor,
        AC.Property.style.margin,
        AC.Property.style.boxSizing,
        AC.Property.style.border,
        AC.Property.style.borderRadius,
        AC.Property.style.bgColor,
        AC.Property.style.customCssClasses,
			AC.Property.style.widgetStyle
    ]}
];
/**
 * Return available widget prop
 * @return {Object} available property
 */
WiziCore_UI_WeatherWidget.props = function() {
    return _props;
};

/**
 * Return empty widget prop
 * @return {Object} default properties
 */
WiziCore_UI_WeatherWidget.emptyProps = function() {
    var ret = {};
    return ret;
};

/**
 * Return widget inline edit prop name
 * @return {String} default properties
 */
WiziCore_UI_WeatherWidget.inlineEditPropName = function() {
    return "zipCode";
};

/**
 * Return default widget prop
 * @return {Object} default properties
 */
WiziCore_UI_WeatherWidget.defaultProps = function() {
    var ret = {valName : "currText", width: "100", height: "20", x : "100", y: "100", zindex : "auto",
        anchors : {left: true, top: true, bottom: false, right: false}, visible : true, enable : true, widgetStyle: "default",
        opacity : 1, name: "Weather1", textAlign: "Left", showBtn: true, margin: "", alignInContainer: 'left', pWidth: "", tabStop: true,
        dragAndDrop: false, customCssClasses: "", boxSizing: 'border-box',
        resizing: false
    };
    return ret;
};

WiziCore_UI_WeatherWidget.onSuccess = "E#Weather#onSuccess";
WiziCore_UI_WeatherWidget.onFail = "E#Weather#onFail";
WiziCore_UI_WeatherWidget.onError = "E#Weather#onError";
/**
 * Return available widget actions
 * @return {Object} available actions
 */
WiziCore_UI_WeatherWidget.actions = function() {
    var ret = {
        onSuccess : {alias : "widget_ext_weather_event_onsuccess", funcview : "onSuccess", action : "AC.Widgets.WiziCore_UI_WeatherWidget.onSuccess", params : "json", group : "widget_ext_weather_event_group"},
        onFail : {alias : "widget_ext_weather_event_onfail", funcview : "onFail", action : "AC.Widgets.WiziCore_UI_WeatherWidget.onFail", params : "json", group : "widget_ext_weather_event_group"},
        onError : {alias : "widget_ext_weather_event_onerror", funcview : "onError", action : "AC.Widgets.WiziCore_UI_WeatherWidget.onError", params : "json", group : "widget_ext_weather_event_group"}
    };
    // append base actions
    //ret = jQuery.extend(AC.Widgets.Base.actions(), ret);
    return ret;
};


/* Lang constants */
/**
 * Return available widget langs
 * @return {Object} available actions
 */
WiziCore_UI_WeatherWidget.langs = function() {
    var ret = {"en" : {}};
    /* Lang constants */
    ret.en.widget_ext_weather = "Weather";
    ret.en.widget_ext_name_weather = "Weather";
    ret.en.widget_ext_weather_type = "Example Type";
    ret.en.widget_ext_weather_dlg_type_title = "Example Dialog Type";
    ret.en.widget_ext_weather_prop_failfield = "Fail Field";
    ret.en.widget_ext_weather_prop_zipcode = "Zip Code";
    ret.en.widget_ext_weather_prop_cityfield = "City Field";
    ret.en.widget_ext_weather_prop_statefield = "State Field";
    ret.en.widget_ext_weather_prop_gridfield = "Grid Field";
    ret.en.widget_ext_weather_prop_call = "Call";
    ret.en.widget_ext_weather_prop_showbtn = "Show Button";
    ret.en.widget_ext_weather_prop_btntext = "Button Text";

    ret.en.widget_ext_weather_prop_date = "Date";
    ret.en.widget_ext_weather_prop_desc = "Description";
    ret.en.widget_ext_weather_prop_low = "Low";
    ret.en.widget_ext_weather_prop_high = "High";
    ret.en.widget_ext_weather_prop_icon = "Icon";
    ret.en.widget_ext_weather_prop_precip = "Precip";

    ret.en.widget_ext_weather_prop_dlg_grids_title = "Select Grids";
    ret.en.widget_ext_weather_prop_dlg_grids = "Grids";
    ret.en.widget_ext_weather_prop_dlg_columns = "Columns";
    ret.en.widget_ext_weather_prop_dlg_column_name = "Column Name";
    ret.en.widget_ext_weather_prop_dlg_column_value = "Field";
    ret.en.widget_ext_weather_prop_gmap = "Google Maps";

    ret.en.widget_ext_weather_event_group = "Weather Events";
    ret.en.widget_ext_weather_event_onsuccess = "On Success";
    ret.en.widget_ext_weather_event_onfail = "On Fail";
    ret.en.widget_ext_weather_event_onerror = "On Error";
    ret.en.widget_ext_weather_prop_failtext = "Fail Text";
    ret.en.widget_ext_weather_error = "Weather Error";
    ret.en.widget_ext_weather_fail = "Weather Warning";

    return ret;
};
AC.Core.lang().registerWidgetLang(WiziCore_UI_WeatherWidget.langs());
/* Register widget in the Designer */
AC.Core.Widgets().registerExWidget("WiziCore_UI_WeatherWidget", "sections_extensible", "widget_ext_name_weather", "example",
        "wiziCore/extWidgets/weather/weather.png");
if (AC.designerMode) {
    (function(gType){
    /**
     * resource grid type
     */
    gType.weathergridcolumn = function(cell) {
        //set cell to var
        this.cell(cell);

        this._template = '<div style=\"position: relative\">\n    <table style=\"width: 100%; height: 100%;\">\n        <tr valign=\"top\">\n            <td  style=\"width:200px; padding: 0 2px;\">\n                <span class=\"wa-ui-dialog-c-title\">\n                    <span data-lng=\"ac-widget_ext_weather_prop_dlg_grids\"><\/span>\n                <\/span>\n                <br>\n                <div class=\"wa-ui-dialog-content\">\n                    <div id=\"waWeatherGridDlgList\" ><\/div>\n                <\/div>\n            <\/td>\n            <td  style=\"padding: 0 2px;\">\n                <span class=\"wa-ui-dialog-c-title\">\n                    <span data-lng=\"ac-widget_ext_weather_prop_dlg_columns\"><\/span>\n                <\/span>\n                <br>\n                <div class=\"wa-ui-dialog-content\">\n                    <div id=\"waWeatherGridDlgColumn\" ><\/div>\n                <\/div>\n            <\/td>\n        <\/tr>\n    <\/table>\n<\/div>';
        //buffer value
        this._input = null;

        this.setValue = function(val) {
            //this method must be in code
            var viewVal = "";
            if (typeof val == "object" && val != null && val.gridName != undefined) {
                viewVal = val.gridName;
            }
            this.cell().empty().append(viewVal);
            //current value
            this.sValue = val;
        };

        this.edit = function() {
            //this method must be in code
            var self = this,
                value = this._tmpValue = this.getValue(), // this._tmpValue - > defined in dialogType
                context = this.context(),
                editor = this.getEditor();

            this._gridList = {};

            var gridDlg = this._tmpDialog = $(this._template);
            $(document.body).append(gridDlg);

            var title =  AC.Core.lang().trText("widget_ext_weather_prop_dlg_grids_title");
            var ok =  AC.Core.lang().trText("dialog_button_ok");
            var cancel =  AC.Core.lang().trText("dialog_button_cancel");

            var btn = {};

            function closeDialog(){
                self.closeDialog.apply(self, arguments);
            }

            btn[cancel] = function() {
                closeDialog();
            };

            btn[ok] = function() {
                closeDialog(self.saveValue());
            };

            var props = jQuery.extend({
                modal : true,
                height: 330,
                width: 430,
                resizable : false,
                title : title,
                buttons: btn,
                close: function(event, ui) {
                    if (self._queriesTree){
                        self._queriesTree.destroy();
                        self._queriesTree = undefined;
                    }
                    self.onClose(); //called dialogType method for destroy dialog and call cell.editStop()
                },
                dialogClass: "wa-system-dialog wa-system-style"
            }, {});

            gridDlg.dialog(props);
            gridDlg.parent().click(function(ev) {
                //set stop propagation for any click by parent of dialog
                ev.stopPropagation();
            });
            gridDlg.css("opacity", "0.9");

            var currApp = editor.form();
            var treeData = this.buildTree(currApp);
            var tree = this._queriesTree = new jqSimpleTree($("#waWeatherGridDlgList"), treeData);
            tree.base().height(200);
            tree.base().width(200);

            $(tree).bind(jqSimpleTree.onSelect, function(ev, id) {
                self.updateColModel(id);
            });

            var cmodel = [
                {title:  AC.Core.lang().trText("widget_ext_weather_prop_dlg_column_name"), width:"50%", align:"center", type:"ed"},
                {title:  AC.Core.lang().trText("widget_ext_weather_prop_dlg_column_value"), width: "50%", align:"center", type:"weathergridfield"}
            ];

            var datatable = this._datatable = new jqSimpleGrid(gridDlg.find("#waWeatherGridDlgColumn"), [], {model: cmodel});

            $(datatable).bind(jqSimpleGrid.onCellChanged, function(ev, rId, cPos, nValue) {
                var selGridUid = self._queriesTree.getSelectedNodeId();
                var gridData = self._gridList[selGridUid];
                if (gridData == undefined) {
                    self._gridList[selGridUid] = {};
                }
                self._gridList[selGridUid][rId] = nValue;
            });

            if (value && value.gridUid !== undefined) {
                if (value.colData != undefined) {
                    this._gridList[value.gridUid] = value.colData;
                }
                tree.selectNode(value.gridUid, true);
            }
        };

        this.updateColModel = function(id) {
            var editor = this.getEditor();
            var form = editor.form();
            var widget = form.find(id);
            if (widget && widget.widgetClass() == "WiziCore_UI_GridWidget") {
                var colmodel = widget.prop("colmodel");
            }
            var db = this._datatable;
            var data = this._gridList[id];
            if (data == undefined) {
                this._gridList[id] = {};
                data = this._gridList[id];
            }
            if (db != undefined) {
                var cnt = 0, subData = [], row;
                for (var i in colmodel) {
                    var col = colmodel[i];
                    var value = (data != undefined && data[col.colUid] != undefined) ? data[col.colUid] : "none";
                    row = [col.title, value];
                    row.id = col.colUid;
                    subData.push(row);
                    data[col.colUid] = value;
                }
                db.setData(subData);
            }
        };

        this.buildTree = function(object) {
            var wClass = object.widgetClass(),
                wContainerType = AC.Core.Widgets().getContainerType(wClass);
            if ((wClass == "WiziCore_UI_GridWidget") || (wContainerType != AC.Widgets.Base.CASE_TYPE_ITEM)) {
                var name = object.name(),
                    id = object.id(),
                    node = {title : name, id : id},
                    children = object.children();
                for (var i = 0, l = children.length; i < l; i++) {
                    var child = this.buildTree(children[i]);
                    if (child != undefined){
                        (node.nodes == undefined) ? node.nodes = [child] : node.nodes.push(child);
                    }
                }
                return node;
            }
        };

        this.saveValue = function() {
            var self = this,
                selGridUid = self._queriesTree.getSelectedNodeId(),
                gridData = self._gridList[selGridUid],
                editor = this.getEditor(),
                form = editor.form(),
                widget = form.find(selGridUid),
                value = null;
            if (widget && widget.widgetClass() == "WiziCore_UI_GridWidget") {
                var gridName = widget.name();
                var colModel = widget.colmodel();
                var colArr = "";
                for (var i in colModel) {
                    if (colArr != "") {
                        colArr += ",";
                    }
                    colArr += gridData[colModel[i].colUid];
                }
                value = {gridUid : selGridUid, colValue : colArr, gridName: gridName, colData: gridData};
            }

            return value;
        }
    };

    gType.weathergridcolumn.prototype = new gType.dialogType;


    /**
     * weatherGridField list
     */
    makeCellList('weathergridfield', {
        _defOpt: "none",
        langOpt: {
            "none" : "",
            "date" : "widget_ext_weather_prop_date",
            "desc" : "widget_ext_weather_prop_desc",
            "low" : "widget_ext_weather_prop_low",
            "high": "widget_ext_weather_prop_high",
            "icon" : "widget_ext_weather_prop_icon",
            "precip" : "widget_ext_weather_prop_precip"
        }
    });

    /**
     * weatherGridField list
     */
    gType.gmapswidgetlist = function(cell) {
        this.cell(cell);
        this._filter = "WiziCore_UI_GoogleMapsWidget";
    };

    gType.gmapswidgetlist.prototype = new gType.widgetlist;
    })(jqSimpleGrid.types);
}
})(jQuery,window,document);



/**
 * @lends       WiziCore_UI_GoogleMapsWidget#
 */
(function($, window, document, undefined){
var WiziCore_UI_GoogleMapsWidget = AC.Widgets.WiziCore_UI_GoogleMapsWidget = AC.Widgets.Base.extend({
    triggerObject : {},
    _widgetClass : "WiziCore_UI_GoogleMapsWidget", //widget Class name
    _dataPropName : "latlong", //the method name, which is responsible for working with data
    _gMapDiv: null,//jQuery object
    _gMap: null,
    _mapCanIniting: null,
    _marker: null,
    _onClick: null,
    _loaded: false,

    /**
     * Description of constructor
     * @class  Some words about label widget class
     * @author      Dmitry Souchkov, Yuri Podoplelov
     * @version     0.2
     *
     * @constructs
     */
    init: function() {
        this._super.apply(this, arguments);
    },

    /**
     * Building widget function
     */
    draw : function() {
        var self = this;
        if (typeof GMap2 != "function") {
            $(this.triggerObject).one(AC.Widgets.WiziCore_UI_GoogleMapsWidget.onApiLoaded, function(ev, data) {
                if (self._mapCanIniting !== null){
                    self.apiInited();
                }
                self._loaded = true;
                ev.stopPropagation();
            });
        }
        else {
            self._loaded = true;
        }
        var div = $("<div>");
        if (this.mode() != WiziCore_Visualizer.EDITOR_MODE) {
            div.resize(function(){self._resizeGmap();});
        }
        var tuid = "gmaps_" + this.htmlId();
        div.attr("id", tuid);
        div.css({width: "100%", height: "100%"});
        this.base().prepend(div);
        this._gMapDiv = div;
        this._super.apply(this, arguments);
    },

    onPageDrawn: function() {
        this._mapCanIniting = false;
        if (typeof GMap2 == "function") {
            this.apiInited();
        }
        this._super.apply(this, arguments);
    },

    _updateLayout: function(){
        this._super();
        this._gMapDiv.height(this.height() + 'px');
//        this._gMapDiv.css({'min-width': this.width() + 'px', 'min-height' :this.height() + 'px'});
        this._resizeGmap();
        this.checkResize();
    },

    relativeResize: function() {
        this._super.apply(this);
        this._resizeGmap();
    },

    _resizeGmap: function() {
        if (!this._gMap) {
            return;
        }

        var gMap = this._gMap;
        setTimeout(function(){gMap.checkResize();}, 10);
    },

    earlyLoad: function(callback) {
        if (!this._loaded) {
            var self = this;
            window.setTimeout(function(){self.earlyLoad(callback)}, 100);
            return;
        }
        if (callback) {
            callback();
        }
    },

    initProps: function() {
        this._super();
        this.shadow = this.themeProperty('shadow', this._shadow);
        this.border = this.themeProperty('border', this._border);
        this.bg = this.themeProperty('bgColor', this._bg);

        this.opacity = this.htmlProperty('opacity', this._opacity);
        //this.tabindex = this.htmlProperty('tabindex', this._tabindex);

        this.showMarker = this.normalProperty('showMarker', this.initMarker);
        this.googleBar = this.htmlProperty('googleBar', this._googleBar);
        this.googleKey = this.htmlProperty('googleKey', this._googleKey);
        this.aspectResize = this.htmlProperty('aspectResize', this._updateLayout);
    },

    initDomState : function () {
        this._super();
        this.initDomStatePos();
        this._googleKey(this.googleKey());
        this._googleBar(this.googleBar());
        this.initMarker();

        this._bg(this.bg());
        this._border(this.border());
        this._shadow(this.shadow());

        this._updateEnable();
        this._visible(this.visible());
        this._opacity(this.opacity());
        //this._tabindex(this.tabindex());

    },

    initGMaps: function(apiKey) {
        this.clearMap();
        var self = this;
        if (WiziCore_Helper.googleMapsApiVersion == 3 && this._hasAnotherGmapWidget()) {
            var dlg = WiziCore_Helper.showWarning('', AC.Core.lang().trText("widget_google_maps_conflict_api_message"), false, WiziCore_UI_MessageBoxWidget.MB_YESNO);
            $(dlg).one(WiziCore_UI_MessageBoxWidget.onDialogClose, function(ev, id, res) {
                if (id == WiziCore_UI_MessageBoxWidget.IDYES){
                    self._loadApi(apiKey);
                }
            });
        } else
            this._loadApi(apiKey)

    },

    _hasAnotherGmapWidget: function() {
        var res = false, form = this.form();
        if (form) {
            form.traverseChildren(function(child){
                if (typeof child.widgetClass == 'function' && child.widgetClass() == 'GoogleMapsAdvanced') {
                    res = true;
                    return true;
                }
            });
        }
        return res;
    },

    _loadApi: function(apiKey) {
        if (typeof GMap2 != "function") {
            WiziCore_Helper.googleMapsApiVersion = 2;
            var link = (document.location.protocol == "https:" ? "https:" : "http:") + "//maps.google.com/maps?file=api&v=2&sensor=true&async=2&key=" + apiKey + "&callback=gMapWidgetApiLoaded";
            if (WiziCore_Helper.isPhoneGapOnline()) {
                jQuery.getScript(link)
                    .fail(function(jqxhr, settings, exception){
                        throw "error loading " + link;
                    });
            }
        }
    },

    apiInited: function() {
        this._mapCanIniting = true;
        acDebugger.systemLog("apiInited for ", this.widgetId());
        this.createGMap(this.zoomLevel());
    },

    clearMap: function() {
        if (typeof GMap2 == "function" && typeof GEvent == "object") {
            if (this._onClick != null) {
                GEvent.removeListener(this._onClick);
                delete this._onClick;
                this._onClick = null;
            }
        }
        if (typeof GUnload == "function") {
            //GUnload();
        }
        delete this._gMap;
        this._gMap = null;
    },

    createGMap: function(zoomLevel) {
        if (this._mapCanIniting === true) {
            //this._gMap = null;
            var map = this._gMap;
            var self = this;
            var tuid = this._gMapDiv.attr("id");
            if (GBrowserIsCompatible()) {
                if (zoomLevel == undefined){
                    if (map && typeof map['getZoom'] == "function"){
                        zoomLevel = map.getZoom();
                    } else {
                        zoomLevel = this.zoomLevel();
                    }
                }
                var mapType = undefined;
                if (map && typeof map['getCurrentMapType'] == "function"){
                    mapType = map.getCurrentMapType();
                }
                delete this._gMap;

                this._gMapDiv.empty();
                map = new GMap2(document.getElementById(tuid));
                this._gMap = map;

                mapType = (mapType == undefined) ? map.getCurrentMapType() : mapType;
                map.setMapType(mapType);

                map.setCenter(new GLatLng(this.latitude(), this.longitude(), false), zoomLevel);
                map.setUIToDefault();
                (this.googleBar()) ? map.enableGoogleBar() : map.disableGoogleBar();
                if (this._onClick != null) {
                    GEvent.removeListener(this._onClick);
                }
                this._onClick = GEvent.bind(map, "click", this, function(overlay, latlng) {
                    self.onClick(overlay, latlng);
                });
                this._gMap = map;
                this.initMarker();
            }
            this._gMapDiv.css("z-index", "");
            this._updateEnable();
        }
    },

    onClick: function(overlay, latlng) {
        if (this._gMap != null) {
            if (latlng) {
                var myHtml = "The GPoint value is: " + this._gMap.fromLatLngToDivPixel(latlng) + " at zoom level " + this._gMap.getZoom();
            }
            //alert(myHtml);
            var triggerEvent = new jQuery.Event(AC.Widgets.Base.onClick);
            $(this.object()).trigger(triggerEvent, [overlay, latlng]);
        }
    },
    remove: function() {
        this.clearMap();
        $(this.triggerObject).unbind(AC.Widgets.WiziCore_UI_GoogleMapsWidget.onApiLoaded);
        this._super();
    },

    _enable: function(flag){
        if (this._gMap != null){
            this.showEnableDiv(flag);
        } else if (this._gMapDiv != null) {
            (flag === false) ? this._gMapDiv.addClass('ui-state-disabled') : this._gMapDiv.removeClass('ui-state-disabled');
        }
    },

    _googleBar: function(val) {
        if (this._gMap != null) {
            if (val) {
                this._gMap.enableGoogleBar();
            } else {
                this._gMap.disableGoogleBar();
            }
        }
    },

    getDomain : function(url){
        if (typeof url != "string")
            return url;

        var startPos = url.indexOf("//");
        if (startPos == -1)
            startPos = 0;

        var endPos = url.indexOf("/", startPos + 2);
        if (endPos == -1)
            endPos = url.length;

        return url.substring(startPos + 2, endPos);
    },

    _googleKey: function(val) {
        if (val != undefined) {
            var self = this;
            var apiKey = null;
            var pathname = this.getCurrentPathName().toLowerCase();
            var locDomain = this.getDomain(pathname);
            if (locDomain == '' || locDomain == 'localhost') {
                apiKey = '';
            }
            else if (val.rows != undefined) {
                //get data from prefill dialog
                for (var i =0, l= val.rows.length; i < l; i++) {
                    var loc = val.rows[i].data[0].toLowerCase();
                    var loc = this.getDomain(loc);
                    if (pathname.indexOf(loc) >= 0) {
                        apiKey = val.rows[i].data[1];
                        break;
                    }
                }
            }

//            if (apiKey === null) {
//                //try to find in config
//                try {
//                    var wfApp = WiziCore_AppContext.getInstance();
//                    if (wfApp != undefined) {
//
//                        var key = wfApp.config().googleApiKey();
//                        for (var i = 0, l = key.rows.length; i < l; i++) {
//                            var loc = key.rows[i].data[0].toLowerCase();
//                            var loc = this.getDomain(loc);
//                            if (pathname.indexOf(loc) >= 0) {
//                                apiKey = key.rows[i].data[1];
//                                break;
//                            }
//                        }
//                    }
//                } catch(e) {
//                }
//
//            }

            if (apiKey === null) {
                var key = this.form() ? this.form().gmapsApiKey() : null;
                if (key != null && key != '')
                    apiKey = key;
            }

            if (apiKey !== null) {
//                apiKey = (apiKey == 'none')? '': apiKey;
                self.initGMaps(apiKey);
            } else {
                var noApiDiv = $("<div style='font: 14px normal; text-align: center; width : 100%; height:100%; background-color: #808080; color: white; display: table-caption;' ></div>")
                        .append("<span data-lng='ac-widget_gmap_noapikey'/><span><b>'"+ pathname +"'</b></span><br>")
                        .append("<span data-lng='ac-widget_gmap_edit_gapikeyprop'/>");

                self._gMap = null;
                self._gMapDiv.empty().append(noApiDiv);
            }
        }
    },

    googleMap: function(){
        return this._gMap;
    },

    getCurrentPathName : function() {
        return window.location.hostname;
    },

    latitude: function(val) {
        if (val != undefined) {
            val = (val > 90) ? val % 90 : val;
            val = (val < -90) ? val % -90 : val;
            this._project['latitude'] = val;
            var obj = {"latitude": this._project['latitude']};
            this.sendExecutor(obj);
            if (this._isDrawn) {
                this.createGMap();
            }
        }
        return this._project['latitude'];
    },

    longitude: function(val) {
        if (val != undefined) {
            val = (val > 180) ? val % 180 : val;
            val = (val < -180) ? val % -180 : val;
            this._project['longitude'] = val;
            var obj = {"longitude": this._project['longitude']};
            this.sendExecutor(obj);
            if (this._isDrawn) {
                this.createGMap();
            }
        }
        return this._project['longitude'];
    },

    initMarker: function() {
        if (this._gMap !== null) {
            //create marker, if not init
            var latlng = new GLatLng(this.latitude(), this.longitude());
            if (this._marker !== null) {
                this._gMap.removeOverlay(this._marker);
            }
            this._marker = new GMarker(latlng);
            this._gMap.addOverlay(this._marker);
        }

        if (this._marker !== null) {
            if (this.showMarker() == true) {
                this._marker.show()
            } else {
                this._marker.hide()
            }
        }
    },

    zoomLevel: function(val) {
        if (val != undefined) {
            this._project['zoomLevel'] = Math.round(val);
            var obj = {"zoomLevel": this._project['zoomLevel']};
            this.sendExecutor(obj);
            if (this._isDrawn && this._gMap != null) {
                this._gMap.setZoom(this._project['zoomLevel']);
            }
        }
        return this._project['zoomLevel'];
    },

    latlong: function(val) {
        if (val != undefined) {
            ret = [this.latitude(val[0]), this.longitude(val[1])];
        } else {
            var ret = [this.latitude(), this.longitude()];
        }
        return ret;
    },

    getDataModel: function() {
        return [
            {name: "widget_gmap_latitude", value: "", uid: "latuid"},
            {name: "widget_gmap_longitude", value: "", uid: "longuid"}
        ];
    }
});

WiziCore_UI_GoogleMapsWidget.beforeInit = function(form) {
    form.traverseChildren(function(child){
        if (typeof child.widgetClass == 'function' && child.widgetClass() == 'GoogleMapsAdvanced') {
            WiziCore_Helper.showWarning('', AC.Core.lang().trText("widget_google_maps_conflict_message"), false, WiziCore_UI_MessageBoxWidget.MB_OK);
            throw 'google maps widgets conflict!';
        }
    });
};

    window['gMapWidgetApiLoaded'] = function() {
    $(AC.Widgets.WiziCore_UI_GoogleMapsWidget.prototype.triggerObject).trigger(AC.Widgets.WiziCore_UI_GoogleMapsWidget.onApiLoaded);
};

AC.Widgets.WiziCore_UI_GoogleMapsWidget.onApiLoaded = "E#GoogleMaps#onApiLoaded";

var _props = [
    { name: AC.Property.group_names.general, props:[
        AC.Property.general.widgetClass,
        AC.Property.general.name,
        {name: "googleKey", type : "gmapkeysdata", get: "googleKey", set: "googleKey", alias : "widget_gmap_googlekey"},
        {name: "googleBar", type : "boolean", get: "googleBar", set: "googleBar", alias : "widget_gmap_googlebar"},
        {name: "latitude", type : "gmlatitude", get: "latitude", set: "latitude", alias : "widget_gmap_latitude"},
        {name: "longitude", type : "gmlongitude", get: "longitude", set: "longitude", alias : "widget_gmap_longitude"},
        {name: "showMarker", type : "boolean", get: "showMarker", set: "showMarker", alias : "widget_gmap_showmarker"},
        {name: "zoomLevel", type : "gmzoomlevel", get: "zoomLevel", set: "zoomLevel", alias : "widget_gmap_zoomlevel"}
    ]},
    { name: AC.Property.group_names.layout, props:[
        AC.Property.layout.aspectResize,
        AC.Property.layout.x,
        AC.Property.layout.y,
        AC.Property.layout.pWidth,
        AC.Property.layout.width,
        AC.Property.layout.height,
        AC.Property.layout.repeat,
        AC.Property.layout.zindex,
        AC.Property.layout.anchors,
        AC.Property.layout.alignInContainer
    ]},
    { name: AC.Property.group_names.behavior, props:[
        AC.Property.behavior.dragAndDrop,
        AC.Property.behavior.resizing,
        AC.Property.behavior.visible,
        AC.Property.behavior.enable
    ]},
    { name: AC.Property.group_names.data, props:[
        AC.Property.data.view,
        AC.Property.data.fields,
        AC.Property.data.groupby,
        AC.Property.data.orderby,
        AC.Property.data.filter,
        AC.Property.data.onview,
        AC.Property.data.applyview,
        AC.Property.data.listenview,
        AC.Property.data.resetfilter,
        AC.Property.data.autoLoad
    ]},
    { name: AC.Property.group_names.style, props:[
        AC.Property.behavior.opacity,
        AC.Property.style.border,
        AC.Property.style.shadow,
        AC.Property.style.margin,
        AC.Property.style.bgColor,
        AC.Property.style.customCssClasses,
			AC.Property.style.widgetStyle
    ]}
];
/**
 * Return available widget prop
 * @return {Object} available property
 */
WiziCore_UI_GoogleMapsWidget.props = function() {
    return _props;
};

/**
 * Return empty widget prop
 * @return {Object} default properties
 */
WiziCore_UI_GoogleMapsWidget.emptyProps = function() {
    return {};
};
/**
 * Return default widget prop
 * @return {Object} default properties
 */
WiziCore_UI_GoogleMapsWidget.inlineEditPropName = function() {
    return "latlong";
};

/**
 * Return default widget prop
 * @return {Object} default properties
 */
WiziCore_UI_GoogleMapsWidget.defaultProps = function() {
    var ret = {width: "200", height: "200", x : "100", y: "100", zindex : "auto",
        anchors : {left: true, top: true, bottom: false, right: false}, visible : true,
        opacity : 1, name: "googleMaps1", googleBar: false, latitude: "37.4419", longitude: "-122.1419",
        zoomLevel: 12, widgetStyle: "default", showMarker:false,
        googleKey : {}, enable: true,
        margin: "", alignInContainer: 'left',
        dragAndDrop: false, customCssClasses: "",
        resizing: false,
        aspectResize: false
    };
//    var wfApp = WiziCore_AppContext.getInstance();
//    if (wfApp != undefined) {
//        try {
//            var key = wfApp.config().googleApiKey();
//            if (key != undefined && key != null) {
//                ret.googleKey = key;
//            }
//        } catch(e) {
//        }
//    }
    return ret;
};

/**
 * Return available widget actions
 * @return {Object} available actions
 */
WiziCore_UI_GoogleMapsWidget.actions = function() {
    var ret = {};
    // append base actions
    ret = $.extend(AC.Widgets.Base.actions(), ret);
    if (ret.click != undefined){
        ret.click.params = "overlay, latlng";
    }
    WiziCore_UI_GoogleMapsWidget.actions = function(){return ret};
    return ret;
};

/* Register widget in the Designer */
AC.Core.Widgets().registerExWidget("WiziCore_UI_GoogleMapsWidget", "widget_cat_deprecated", "widget_name_gmap", "gmaps",
        "wiziCore/extWidgets/googleMaps/googleMaps.png");

/* Lang constants */
/**
 * Return available widget langs
 * @return {Object} available actions
 */
WiziCore_UI_GoogleMapsWidget.langs = function() {
    var ret = {"en" : {}};
    /* Lang constants */
    ret.en.widget_gmap_googlekey = "Google Api Key";
    ret.en.widget_name_gmap = "Google Maps";
    ret.en.widget_gmap_googlebar = "Google Bar";
    ret.en.widget_gmap_latitude = "Latitude";
    ret.en.widget_gmap_longitude = "Longitude";
    ret.en.widget_gmap_showmarker = "Show Marker";
    ret.en.widget_gmap_zoomlevel = "Zoom";
    ret.en.widget_gmap_hostname = "Host Name";
    ret.en.widget_gmap_apikey = "Google Map Key";
    ret.en.widget_gmap_apikeys = "Api Keys";
    ret.en.widget_gmap_noapikey = "Haven't Google Api Keys for this domain '";
    ret.en.widget_gmap_edit_gapikeyprop = "' please edit property 'Google Api Key'";
    return ret;
};
AC.Core.lang().registerWidgetLang(WiziCore_UI_GoogleMapsWidget.langs());
/* Types */

if (window['jqSimpleGrid'] && window['jqSimpleGrid'].types && window['jqSimpleGrid'].types['basenumber']) {
    (function(gType){
    /**
     * latitude
     */
    gType.gmlatitude = function(cell){
        this.cell(cell);
        this._params = {
            min : -90,
            max: 90,
            isFloat: true
        };
    };
    gType.gmlatitude.prototype = new gType.basenumber;
    /**
     * longtitude
     */
    gType.gmlongitude = function(cell) {
        this.cell(cell);
        this._params = {
            min : -180,
            max: 180,
            isFloat: true
        };
    };
    gType.gmlongitude.prototype = new gType.basenumber;

    })(jqSimpleGrid.types);
}

if (!tick) {
    //google FIX
    var tick = function() {
    }
}

})(jQuery,window,document);




var wiziLoadScripts = [];
var content = "";

function setScripts(scripts) {
    for (var i = 0, l = scripts.length; i < l; i ++) {
        if (!isScriptExist(scripts[i].source)) {
            wiziLoadScripts.push(scripts[i]);
        }
    }
}

function isScriptExist(src) {
    var length = wiziLoadScripts.length;
    for (var i = 0; i < length; i ++) {
        if (wiziLoadScripts[i].source == src) {
            return true;
        }
    }
    return false;
}

function checkEmbeddedScripts() {
    var result = true;
    var self = this;

    var callbackGenerator = function(obj) {
        return function() {
            obj.state = "loaded";
            draw();
        }
    };

    for (var i = 0;i < wiziLoadScripts.length; i++) {
        var scriptObj = wiziLoadScripts[i];
        if (scriptObj.state == "notLoaded") {

            if (WiziCore_Helper.canGetScript(scriptObj.source)) {
                jQuery.getScript(scriptObj.source, callbackGenerator(scriptObj))
                    .fail(function(jqxhr, settings, exception){
                        throw "error loading " + scriptObj.source;
                    });
    //            loadScript(scriptObj.source);
    //            callbackGenerator(scriptObj)();
            }
            result = false;
        }
    }

    return result;
}

function loadScript(url) {
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", url);
    document.getElementsByTagName("head")[0].appendChild(script);
}

function draw() {

    if (!checkEmbeddedScripts()) {
        return;
    }

    jQuery(document.body).empty().css({padding: '0px', margin: '0px'});
    document.write(content);
    //jQuery(document.body).css({padding: '0px', margin: '0px'});
//    var _containerDiv = jQuery('<div>');
//    //_containerDiv.css({'width': '100%', 'height' : '100%'});
//    //_containerDiv.empty();
//    //var widgetContent = jQuery(content);
//    jQuery(document.body).append(_containerDiv);
//    _containerDiv.append(content);
}

function putContent(widgetContent) {
    content = widgetContent;
    draw();
}
