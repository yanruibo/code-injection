



























































































































































































































































































































































































































































































var imageUtils = 
{
  loadAndResize : function(vsdImageElement, url, boxSize, position)
  {
    var x = 0;
    var y = 0;
    if (null != position)
    {
      x = position[0];
      y = position[1];
    }
    
    var image = vsdImageElement.view;
    
    if (window.plugins.networkActivityIndicator)
      window.plugins.networkActivityIndicator.set(true);
    
    image.onload = function()
    {
      var offsetX = 0;
      var offsetY = 0;
      var imageWidth = 0;
      var imageHeight = 0;
      
      var orientationIsLandscape = false;
      
      // orientation paysage?
      if (image.naturalWidth > image.naturalHeight)
        orientationIsLandscape = true;
      else
        orientationIsLandscape = false;
        
      var itemWidth = orientationIsLandscape ? boxSize[1] : boxSize[0];
      var itemHeight = orientationIsLandscape ? boxSize[0] : boxSize[1];
      
      var ratio = (image.naturalWidth / image.naturalHeight);
      var ratioW = (image.naturalWidth / itemWidth);
      var ratioH = (image.naturalHeight / itemHeight);
      
      window.console.log("ImageUtils.js:------------------------:");
      window.console.log("ImageUtils.js: url                    :"+url);
      window.console.log("ImageUtils.js: image.naturalWidth     :"+image.naturalWidth);
      window.console.log("ImageUtils.js: image.naturalHeight    :"+image.naturalHeight);
      window.console.log("ImageUtils.js: orientationIsLandscape :"+orientationIsLandscape);
      window.console.log("ImageUtils.js: itemWidth              :"+itemWidth);
      window.console.log("ImageUtils.js: itemHeight             :"+itemHeight);
      window.console.log("ImageUtils.js: ratio                  :"+ratio);
      window.console.log("ImageUtils.js: ratioW                 :"+ratioW);
      window.console.log("ImageUtils.js: ratioH                 :"+ratioH);
      

      if (ratioW > 1 || ratioH > 1)
      {
        if (ratioW > ratioH)
        {
          imageWidth = itemWidth;
          imageHeight = Math.floor(imageWidth / ratio);
        }
        else
        {
          imageHeight = itemHeight;
          imageWidth = Math.floor(imageHeight * ratio);
        }
        offsetX = Math.floor((itemWidth - imageWidth) / 2);
        offsetY = Math.floor((itemHeight - imageHeight) / 2);
      }
      
      // les deux cotÃ© sont plus petits, on centre l'image
      else
      {
        imageWidth = image.naturalWidth;
        imageHeight = image.naturalHeight;
        offsetX = Math.floor((itemWidth - imageWidth) / 2);
        offsetY= Math.floor((itemHeight - imageHeight) / 2);
      }
      
      // en orientation paysage, transformer les repÃ¨re 
      if (orientationIsLandscape)
      {
        vsdImageElement.addClassName("landscape");
        //vsdImageElement.rotate(-90);
        // swap offset values, because transformations have swap the axises
        var temp  = offsetX;
        offsetX = offsetY;
        if (null != position)
          offsetY = temp;
        else 
          offsetY = boxSize[1] - temp;
     // vsdImageElement.position = [-70, 80];
      }
      
      vsdImageElement.size = [imageWidth, imageHeight];
      vsdImageElement.position = [x + offsetX, y + offsetY];

      window.console.log("ImageUtils.js: imageWidth             :"+imageWidth);
      window.console.log("ImageUtils.js: imageHeight            :"+imageHeight);
      window.console.log("ImageUtils.js: x                      :"+x);
      window.console.log("ImageUtils.js: y                      :"+y);
      window.console.log("ImageUtils.js: offsetX                :"+offsetX);
      window.console.log("ImageUtils.js: offsetY                :"+offsetY);




      vsdImageElement.addClassName("loaded");
      if (window.plugins.networkActivityIndicator)
        window.plugins.networkActivityIndicator.set(false);
    };
    
    image.src = url;
  },
}

var Purchase = function(productId, date, receipt)
{
  this._productId = productId;
  this._date = date;
  this._receipt = receipt;
};

var DownloadRecord= function(magazineId, date)
{
  this._magazineId = magazineId;
  this._date = date;
};

var User = function(userDataSting)
{
  if (userDataSting == null)
  {
    this._id = null;
    this._login = null;
    this._password = null;
    
    this._purchases = {};
    this._downloadRecords = {};
  }
  else
  {
    var userData = JSON.parse(userDataSting);
    if (userData != null)
    {
      this._id = userData._id;
      this._login = userData._login;
      this._password = userData._password;
      
      this._purchases = userData._purchases;
      this._downloadRecords = userData._downloadRecords;
    }
  }
  this._facebookSessionIsOpen = false; 
  this._anonymous = false;
};


/* load user from preference if exists, or create a new one */

User.LoadUser = function(callback)
{
  window.plugins.preferences.read("user", function(value)
  {
    if (value !== null)
      user = value;
    else
      user = new User();
    
    if (callback)
      callback(user);
  });
};

User.prototype = 
{
  /*
  connect : function(callback)
  {
    NDAPI.connect(  this._login, 
                    this._password,
                    function(response)
                    {
                      if (response.success === true)
                      {
                        NDAPI.getPurchases(function(purchases)
                        {
                          if (purchases != null)
                          {
                            for(var i = 0; i < purchases.length; i++)
                            {
                              var purchase = purchases[i];
                              if (!user.hasPurchasedProductWithProductId(purchase.appstore_product_id))
                              {
                                user.addPurchase(purchase.appstore_product_id, 
                                                 new Date(purchase.datepurchase),
                                                 null);
                              }
                            }
                            if (callback)
                              callback(response);
                          }
                        });
                      }
                      else
                      {
                        window.console.log("login failed"); 
                        if (callback)
                          callback(response);
                      }
                    });
  },
  */
  logIn : function(login, password, callback)
  {
    var user = this;
    
    if ((login == null && password == null) || login == "anonymous@netdevices.fr")
    {
      if (user._login == null && user._password == null)
      {
        login = "anonymous@netdevices.fr";
        password = "anonymous";
        this._anonymous = true;
      }
      else
      {
        login = user._login;
        password = user._password;
        this._anonymous = false;
      }
    }
    else
    {
        this._anonymous = false;
    }
    
    NDAPI.connect(  login, 
                    password,
                    function(response)
                    {
                      // request success
                      if (response.success === true)
                      {
                        if (callback)
                              callback(response);
                        
                        // store id
                        if (user.anonymous === false)
                        {
                          user._login = login;
                          user._password = password;
                          user.save();
                        }
                      }
                      // request failure
                      else
                      {
                        window.console.log(response.message); 
                        if (callback)
                          callback(response);
                      }
                    });
  },
  
  logOut : function()
  {
    var user = this;
    NDAPI.disconnect( function(success)
                      {
                        if (success === true)
                        {
                          user._login = null;
                          user._password = null;
                        }
                        if (callback)
                          callback(success);
                      });
  },
  
  addPurchase : function(productId, date, receipt)
  {
    if (this._purchases[productId] != null)
      return;
    var purchase = new Purchase(productId, date, receipt);
    this._purchases[productId] = purchase;
  },
  
  hasPurchasedProductWithProductId : function(productId)
  {
    return (this._purchases[productId] != null);
  },
  
  addDownloadRecord : function(magazine, date)
  {
  var key = MD5(magazine.titre);
    var downloadRecord = new DownloadRecord(key, date);
    this._downloadRecords[key] = downloadRecord;
    this.save();
  },
  
  removeDownloadRecord : function(magazine)
  {
	var key = MD5(magazine.titre);
    if (this._downloadRecords[key])
    {
      this._downloadRecords[key] = null;
      this.save();
    }
  },
  
  hasDownloadedMagazine : function(magazine)
  {
	var key = MD5(magazine.titre);
    return (this._downloadRecords[key] != null);
  },
  
  save : function()
  {
    var userString = JSON.stringify(this);
    //window.plugins.preferences.write("user", userString);
    localStorage.setItem("user", userString);
  },

  
  /* getter - setter */
  
  get login()
  {
    return (this._login);
  },
  
  get password()
  {
    return (this._password);
  },
  
  get isLoggedIn()
  {
    return (this._login !== null && this._password !== null);
  },
  
  get purchases()
  {
    return (this._purchases);
  },
  
  set anonymous(boolean)
  {
    this._anonymous = boolean;
  },
  
  get anonymous()
  {
    return (this._anonymous);
  },
  
  set facebookSessionIsOpen(boolean)
  {
    this._facebookSessionIsOpen = boolean;
  },
  
  get facebookSessionIsOpen()
  {
    return (this._facebookSessionIsOpen);
  }
};

/*
 * corpus-pro feed access layer
 * author : jose luc voltaire
 */

var NDAPI = 
{
  _requestQueue : [],
  _isProcessingRequest: false
};

/*
 * 
 */
NDAPI._sessionId = null;

/*
 * 
 */
NDAPI._baseURL = null;

/*
 *
 */
NDAPI._user = null;

/*
 * constant identifiying api method execution success status
 */
NDAPI.SUCCESS = 0;
NDAPI.CONNECTION_NEEDED = 2;

/*
 * 
 */
NDAPI.invokeMethod = function(method, parameters, callback)
{
	this._requestQueue.push({method: method, parameters: parameters, callback: callback});
  if (this._isProcessingRequest === false)
    this.processQueue();
};

NDAPI.processQueue = function()
{
  if (this._requestQueue.length === 0)
  {
    return; 
  }
  var request = this._requestQueue.shift();
  NDAPI.sendRequest(request.method, request.parameters, request.callback);
};

/**
 * send request to corpus-pro
 * method : the method name to call
 * paramers : a key/value pairs object in json notation
 * callback : the method which will be called after response is received
 **/
NDAPI.sendRequest = function(method, parameters, callback)
{
  this._isProcessingRequest = true;
  var parameterString = "tpl=json";
  if (NDAPI._sessionId !== null)
		parameterString += "&sid=" + NDAPI._sessionId;
	for (var parameter in parameters)
	{
		if (parameters[parameter] !== null)
		{
			parameterString += "&";
			parameterString += parameter + "=" + encodeURIComponent(parameters[parameter]);
		}	
	}
	
	var url = NDAPI._baseURL + method + "?" + parameterString;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function ()
	{
		if (xhr.readyState == 4)
		{
			if (xhr.status == 200)
			{
				if (window.plugins.NetworkActivityIndicator)
					window.plugins.NetworkActivityIndicator.set(false);
				if (callback !== null)
				{
					var parsedResponse = null;
					try
					{
						parsedResponse = JSON.parse(xhr.responseText);
					}
					catch (exception)
					{
					  window.console.log("connectCallBack exception :" + exception.message);
					}
					
					if (	parsedResponse.status && 
							parsedResponse.status == NDAPI.CONNECTION_NEEDED &&
							NDAPI._user != null)
					{
						NDAPI.restoreConnection(method, parameters, callback);
					}
					else
						callback(parsedResponse);
					NDAPI._isProcessingRequest = false;
					NDAPI.processQueue();
				}
			}
			else
			{
				callback(null);
        NDAPI._isProcessingRequest = false;
        NDAPI.processQueue();
			}
		}	
	};
  
  if (window.plugins.NetworkActivityIndicator)
    window.plugins.NetworkActivityIndicator.set(true);
	xhr.open("GET", url, true);	
  xhr.send();
};

NDAPI.restoreConnection = function(method, parameters, callback)
{
	NDAPI.connect(	NDAPI._user.login, 
					NDAPI._user.password, 
					function(response)
					{
						if (response.success)
						{
							NDAPI._requestQueue.unshift({method: method, parameters: parameters, callback: callback});
						}
						else
						{
							window.console.log("restoreConnection :" + response.message);
							callback(null);
						}
					});
};


/*
 * authentified the user and store his session id that will be use into all other requests
 * username :
 * password :
 * callback :
 */
NDAPI.connect = function(username, password, callback, object)
{
  if (NDAPI._connectCallBack === undefined)
  {
	  NDAPI._connectCallBack = [];
  }
  NDAPI._connectCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"auth/connect", 
						{
              "u" : username, 
              "p" : password
            }, 
						NDAPI.connectCallBack);
};

/*
 * called when the connect request returns
 * store the session id and execute the call back method if exists
 */
NDAPI.connectCallBack = function(response)
{
  var callbackData = NDAPI._connectCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
  var result = null;
  
    if (response && response.status == NDAPI.SUCCESS)
    {
      	NDAPI._sessionId = response.message;
      	// on ne renvoie plus true mais les réponses
    	result = {success : true, message: response.content};
    }
    else
        result = {success : false, message: null};
      
	if (object && "function" === typeof callback)
  	{
    	callback.call(object, result);
  	}
  	else if (callback !== null)
		callback(result);
};

/*
 * disconnect user and delete sessionId
 * callback :
 */
NDAPI.disconnect = function(callback, object)
{
  if (NDAPI._disconnectCallBack === undefined)
  {
    NDAPI._disconnectCallBack = [];
  }
	NDAPI._disconnectCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"auth/disconnect", 
						{}, 
						NDAPI.disconnectCallBack);
};

/*
 * called when the disconnect request returns
 * delete the session id and execute the call back method if exists
 */
NDAPI.disconnectCallBack = function(response)
{		
  var callbackData = NDAPI._disconnectCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
  var result = false;
  
      if (reponse && reponse.status == NDAPI.SUCCESS)
      {
        NDAPI._sessionId = null;
        result = true;
      }
      
	if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};

/*
 * get from corpus-pro pipeline tree describing available content
 * callback : 
 */
NDAPI.getptree = function(callback, object)
{
  if (NDAPI._getptreeCallBack === undefined)
  {
    NDAPI._getptreeCallBack = [];
  }
  NDAPI._getptreeCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"meta/getnumeroptree", 
						{}, 
						NDAPI.getptreeCallBack);
};

/*
 * called when the getptree request returns
 * execute the call back method if exists passing the pipeline tree object
 */
NDAPI.getptreeCallBack = function(response)
{	
  var callbackData = NDAPI._getptreeCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;  
  var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = response.content;
      }
  
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
	else if (callback !== null)
		callback(result);
};

/*
 * get a pipeline from corpus-pro
 * id :
 * callback : 
 *    pipeline : {}
 */
NDAPI.getPipeline = function(id, success, failure, object)
{
  if (NDAPI._getPipelineSuccessCallBack === undefined)
  {
    NDAPI._getPipelineSuccessCallBack = [];
  }
  NDAPI._getPipelineSuccessCallBack.push({success: success, failure: failure, object: object});
	NDAPI.invokeMethod(	"news/get", 
						{
              "id" : id
						}, 
						NDAPI.getPipelineCallBack);
};

/*
 * called when the getPipeline request returns
 * execute the call back method if exists passing the pipeline object
 */
NDAPI.getPipelineCallBack = function(response)
{
  var callback = NDAPI._getPipelineSuccessCallBack.shift();
  var successCallback = callback.success;
  var failureCallback = callback.failure;
  var object = callback.object;
  var result = null;
  
      if (response)
      {
        if (object && "function" === typeof successCallback)
        {
          successCallback.call(object, response);
        }
        else if (successCallback !== null)
          successCallback(response);
        return;
      }
  
  if (object && "function" === typeof failureCallback)
  {
    failureCallback.call(object, result);
  }
  else if (failureCallback !== null)
    failureCallback(result);
};

/*
 * get the items link to an item
 * id : 
 * callback :
 *    items : [] 
 */
NDAPI.getChildren = function(id, success, failure, object)
{
  if (NDAPI._getChildrenSuccessCallBack === undefined)
  {
    NDAPI._getChildrenSuccessCallBack = [];
  }
  NDAPI._getChildrenSuccessCallBack.push({success: success, failure: failure, object: object});
	NDAPI.invokeMethod(	"news/get_children", 
						{
              "id" : id
						}, 
						NDAPI.getChildrenCallBack);
};

/*
 * called when the getPipeline request returns
 * execute the call back method if exists passing the pipeline object
 */
NDAPI.getChildrenCallBack = function(response)
{	
  var callback = NDAPI._getChildrenSuccessCallBack.shift();
  var successCallback = callback.success;
  var failureCallback = callback.failure;
  var object = callback.object;
	var result = null;
  
      if (response)
      {
        if (object && "function" === typeof successCallback)
        {
          successCallback.call(object, response);
        }
        else if (successCallback !== null)
          successCallback(response);
        return;
      }
  
  if (object && "function" === typeof failureCallback)
  {
    failureCallback.call(object, result);
  }
  else if (failureCallback !== null)
    failureCallback(result);
};

/*
 * get one item giving its id
 * callback : 
 *    response : {}
 */
NDAPI.getItem = function(id, success, failure,object)
{
  if (NDAPI._getItemCallBack === undefined)
  {
    NDAPI._getItemCallBack = [];
  }
  NDAPI._getItemCallBack.push({success: success, failure: failure, object: object});
  NDAPI.invokeMethod(	"news/get_item", 
						{
              "id" : id
						}, 
						NDAPI.getItemCallBack);
};

/*
 * called when the getItem request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.getItemCallBack = function(response)
{
  var callback = NDAPI._getItemCallBack.shift();
	var successCallback = callback.success;
  var failureCallback = callback.failure;
  var object = callback.object;
  
      if (response)
      {
        if (object && "function" === typeof successCallback)
        {
          successCallback.call(object, response);
        }
        else if (successCallback !== null)
          successCallback(response);
        return;
      }
  
  if (object && "function" === typeof failureCallback)
  {
    failureCallback.call(object, response);
  }
  else if (failureCallback !== null)
    failureCallback(response);
};

/*
 * add a purchase to corpus-pro user account
 * appStoreId : 
 * receipt : 
 * callback : 
 *    response : {}
 */
NDAPI.buyNumeroByAppStoreId = function(appStoreId, receipt, callback, object)
{
  if (NDAPI._buyNumeroByAppStoreIdCallBack === undefined)
  {
    NDAPI._buyNumeroByAppStoreIdCallBack = [];
  }
  NDAPI._buyNumeroByAppStoreIdCallBack.push({callback: callback, object: object});
	NDAPI.invokeMethod(	"accesscontrol/buy_numero_inapp", 
						{
              "product_id" : appStoreId,
              "receipt_data" : receipt
						}, 
						NDAPI.buyNumeroByAppStoreIdCallBack);
  
};

/*
 * called when the buyNumeroByAppStoreId request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.buyNumeroByAppStoreIdCallBack = function(response)
{		
  var callbackData = NDAPI._buyNumeroByAppStoreIdCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
	var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = parsedResponse;
      }
  
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};

/*
 * add a purchase to corpus-pro user account
 * ndId : 
 * callback : 
 *    response : {}
 */
NDAPI.buyNumeroByNDId = function(ndId, callback, object)
{
  if (NDAPI._buyNumeroByNDIdCallBack === undefined)
  {
    NDAPI._buyNumeroByNDIdCallBack = [];
  }
  NDAPI._buyNumeroByNDIdCallBack.push({callback: callback, object: object});
  NDAPI.invokeMethod(	"accesscontrol/buyNumero", 
						{
              "numero_id" : ndId
						}, 
						NDAPI.buyNumeroByNDIdCallBack);
};

/*
 * called when the buyNumeroByAppStoreId request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.buyNumeroByNDIdCallBack = function(xhr)
{		
  var callbackData = NDAPI._buyNumeroByNDIdCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
	var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = response;
      }
  
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};

/*
 * retreive all purchases done by the user stored in its corpus-pro account
 * callback : 
 *    response : {}
 */
NDAPI.getPurchases = function(callback, object)
{
  if (NDAPI._getPurchasesCallBack === undefined)
  {
    NDAPI._getPurchasesCallBack = [];
  }
  NDAPI._getPurchasesCallBack.push({callback: callback, object: object});
  NDAPI.invokeMethod(	"accesscontrol/getNumeroPurchases", 
                      {}, 
                      NDAPI.getPurchasesCallBack);
};

/*
 * called when the buyNumeroByAppStoreId request returns
 * execute the call back method if exists passing the request response
 */
NDAPI.getPurchasesCallBack = function(response)
{	
  var callbackData = NDAPI._getPurchasesCallBack.shift();
  var callback = callbackData.callback;
  var object = callbackData.object;
	var result = null;
  
      if (response && response.status == NDAPI.SUCCESS)
      {
        result = response.content;
      }
      
  if (object && "function" === typeof callback)
  {
    callback.call(object, result);
  }
  else if (callback !== null)
		callback(result);
};



/**
 * handle event for input
 * call to window.scrollTo (0, 0) removed from blur case
 */
vs.ui.InputField.prototype.handleEvent = function (event)
{
  var self = this;
  function manageBlur (event)
  {
    if (event.target === self.view || event.target === self._text_field)
    { return; }
    
    if (event.target === self._clear_button)
    {
      self.cleanData ();
      event.stopPropagation ();
      event.preventDefault ();
      return;
    }
    
    document.removeEventListener (vs.core.POINTER_START, manageBlur, true);
    self.setBlur ();
  }
  
  if (event.type === 'change')
  {
    this.changeData ();
    this.propertyChange ();
    this.propagate ('change', this._value);
  }
  else if (event.type === 'input')
  {
    this.changeData ();
    this.propertyChange ();
    this.propagate ('continuous_change', this._value);
  }
  else if (event.type === 'focus')
  {
    this.addClassName ('focus');
    this._value = this._text_field.value;
    if (this._value) { this._activateDelete (true); }
    else { this._activateDelete (false); }
    
    document.addEventListener (vs.core.POINTER_START, manageBlur, true);
  }
  else if (event.type === 'blur')
  {
    this.removeClassName ('focus');
    this._activateDelete (false);
  }
};

/**
 * define the window prevent scroll property
 * call to window.scrollTo(0, 0) removed from the case where the property is set
 * to true
 */
vs.util.defineProperty (document, 'preventScroll', 
{
  get : function ()
  {
    return document._preventScroll;
  },
   
  set : function (preventScroll)
  {
    window.console.log("set preventScroll");
    document._preventScroll = preventScroll;
    if (preventScroll)
    {
      // for android
      document.addEventListener("touchstart", preventBehavior, false);
      // for android and other
      document.addEventListener("touchmove", preventBehavior, false);
      document.addEventListener("scroll", preventBehavior, false);
    }
    else
    {
      // for android
      document.removeEventListener("touchstart", preventBehavior, false);
      // for android and other
      document.removeEventListener("touchmove", preventBehavior, false);
      document.removeEventListener("scroll", preventBehavior, false);
    }
  }
});

/**
 * prevent html default behavior except for input and text area
 * call to window.scrollTo(0, 0) from the first line of the function!
 */
function preventBehavior (e)
{  
  if (e.type == "touchstart" &&
      (e.target.tagName == "INPUT" ||
       e.target.tagName == "input" ||
       e.target.tagName == "TEXTAREA" ||
       e.target.tagName == "textarea"))
  {
    // on android do not cancel event otherwise the keyboard does not appear
    return;
  }
  
  e.preventDefault (); 
  return false;
}

var Utils = {};

Utils.IMAGE_SCRIPT_SECRET = "fb65nd42";

Utils.getResizedImageUrl = function(width, height, url)
{
  // "${secret}:${width}x${height}_${url}"
  // get_ext_photo?url=hpg&width=120&height=80&sig=a7df2500ca5cfeeb1800a5f91c535d38
  var sig = MD5(Utils.IMAGE_SCRIPT_SECRET 
            + ":" 
            + width 
            + "x" 
            + height 
            + "_" 
            + url);
  var croppedImageUrl = "http://prod.corpuspro.com/photos/crop_ext_photo.php?url=" 
                        + encodeURIComponent(url)
                        + "&width="
                        + width
                        + "&height="
                        + height
                        + "&sig="
                        + sig;
    return (croppedImageUrl);
};

Utils.getCacheImageUrl = function(url)
{
  if (URLMap !== null && URLMap[url])
    return (URLMap[url]);
  else
    return (url);
};

Utils.getContentCachedImageForElement = function(element)
{
  var imgTags = element.getElementsByTagName("img");
  for (var i = 0; i < imgTags.length; i++)
  {
    var img = imgTags[i];
    img.src = Utils.getCacheImageUrl(img.src);
  }
};

htmlDecode = function (input)
{
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

function nonClickableImage(element)
{
  var bodyImages = element.getElementsByTagName("img");
    for (var i = 0; i < bodyImages.length; i++)
    {
      var bodyImage = bodyImages[i];
      var bodyImageParent = bodyImage.parentNode;
      if (bodyImageParent.tagName == "A")
      {
         bodyImageParent.parentNode.replaceChild(bodyImage, bodyImageParent);
      }
    }
}

function clickableLink(element)
{
  var links = element.getElementsByTagName("a");
  for (var i = 0; i < links.length; i++)
  {
    var link = links[i];
    link.addEventListener(POINTER_END, function(event)
    {
      event.stopPropagation();
      event.preventDefault();
      window.open(this.href);
      window.console.log("open link to : " + link.href);
    }, false);
  }
}

function trim (aString) 
{ 
  return aString.replace(/^\s+/g,'').replace(/\s+$/g,'');
} 

function isset(object)
{
  return (object !== null && object !== undefined);
}

function isFunction(object)
{
  return ("function" === typeof object);
}

function getDate(date)
{
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  var year = date.getFullYear();
  return (day + "/" + month + "/" + year);
}

var TalentCategoryList = vs.core.createClass ({

  parent : vs.ui.View,
  
  title : "Talents",
  
/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.navigationBar
    
    // reset talent list data
    this.talentList.data = [];
    
    // load talents!
    this.loadTalentCategoryList();
  },
  
  itemSelected : function(event)
  {
    var index = event.data.index;
    var item = event.data.item;
    var talentsView = this.createAndAddComponent("TalentList", 
                                              {
                                                position: [this.size[0], 0], 
                                                pipelineId: item.pipelineId, 
                                                title: item.title
                                              });
    this.navigationController.pushView(talentsView);
    //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/TalentList/'+item.title);
  },
  
  /**
   * send a request to get the talent tree
   */
  loadTalentCategoryList : function()
  {
    NDAPI.getptree(this.talentCategoryListLoadCallback, this);
  },
  
  /**
   * talent list request succeed
   * fill the talentList
   * talent category item example : {id:1, itemCount:2, name:Comédiennes}
   */
  talentCategoryListLoadCallback : function(talentCategories)
  {
    // no pipeline
    if (talentCategories === null)
    {
      this.talentCategoryListLoadFailure();
      return;
    }
    
    var categories = [];
    for (var i = 0; i < talentCategories.length; i++)
    {
      var category = talentCategories[i];
      categories.push({title : category.name, pipelineId: category.id});
    }
    
    this.talentList.setItemTemplateName("TalentCategoryListItem");
    this.talentList.data = categories;
    this.talentList.refresh();
 //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/TalentList');
  },
  
  /**
   * talent list request failed
   * display error message ?
   */
  talentCategoryListLoadFailure : function(error)
  {
    
  },

  notify : function (event) 
  {
  }

});
TalentCategoryList.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_39",
    type: "DefaultList",
    model: [{"title":"one"},{"title":"two"},{"title":"tree","label":"two"}],
    hasArrow: true,
    scroll: 1
  };
  this.talentList = new vs.ui.List (config);
  
  this.talentList.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.talentList.init ();
  this.add (this.talentList, 'children');
  this.talentList.bind ('itemselect', this, 'itemSelected');
  var default_values;
};


document.addEventListener ("deviceready", launchApplication, true);

window.console.print = function (msg)
{
  window.console._log (msg);
}


var timeOut;

var InformationView = vs.core.createClass ({

  parent : vs.ui.View,
  
  properties : 
  {
  },

  title : "Informations",
  _informationView : null,

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/
/*
  componentDidInitialize: function () {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here
    this.loadInformation();
    _informationView = this;
//    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Contact/Informations');
  },
  
  fillView : function(content)
  {
    var htmlElement = this.pageContent.scrollViewInformation.informationContent.view;
    htmlElement.innerHTML = htmlDecode(content.content);

//suppression des éventuels liens web dans ke tetx    
    var bodyImages = htmlElement.getElementsByTagName("img");
    for(var i=0; i < bodyImages.length; i++)
      {
      var bodyImage = bodyImages[i];
      var bodyImageParent = bodyImage.parentNode;
      if(bodyImageParent.tagName == "A")
        bodyImageParent.parentNode.replaceChild(bodyImage,bodyImageParent);
      }
//    this.pageContent.actualiteTitre.text = this.titleNews;
//    this.pageContent.actualiteTitre.view.style.height="auto";


    window.setTimeout(function()
                      {
                        _informationView.pageContent.scrollViewInformation.refresh();
                      },
                      3000);
  },

  loadInformation : function()
  {
    NDAPI.getPipeline(11, 
                      this.loadNewsSuccessCallBack, 
                      this.loadNewsFailureCallBack, 
                      this);
  },
  
  loadNewsSuccessCallBack : function(pipeline)
  {
    var items = pipeline.channel.items;
    _informationView.fillView(items[0]);
  },
  
  loadNewsFailureCallBack : function(error)
  {
    timeOut--;
    if(timeOut>=0){
      Actualite.loadInformation();    
    }
    else{
      consolelog("Problèeme réseau!");
      alert("Problèeme réseau!");
    }
  },


  notify : function (event) {
  }

});

InformationView.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_90",
    layout: "absolute_layout"
  };
  this.pageContent = new vs.ui.View (config);
  
  this.pageContent.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_91",
      layout: "absolute_layout",
      pinch: 0,
      scroll: 1
    };
    this.scrollViewInformation = new vs.ui.ScrollView (config);
    
    this.scrollViewInformation.vsdInit = function () {
      var default_values;
      config = {
        node_ref: this.id + "#id_92",
        text: "\n"
      };
      this.informationContent = new vs.ui.TextLabel (config);
      this.informationContent.init ();
      this.add (this.informationContent, 'children');
    }
    this.image4 = new vs.ui.ImageView ({"node_ref":this.id + "#id_93"});
    this.scrollViewInformation.init ();
    this.add (this.scrollViewInformation, 'children');
    this.image4.init ();
    this.add (this.image4, 'children');
  }
  
  this.pageContent.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.pageContent.init ();
  this.add (this.pageContent, 'children');
  var default_values;
};


var fullScreen = false;
var contienPhoto = false;
var contienVideo = false;
var PortraitView = vs.core.createClass ({

  parent : vs.ui.View,
  
  properties : 
  {
    article : vs.core.PROPERTY_IN_OUT,
    category : vs.core.PROPERTY_IN_OUT
  },

  title : "Portrait",

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    contienPhoto = false;
    contienVideo = false;

    this.fillView();
    if(fullScreen === false ) this.close.hide();
    else this.close.show();    
  },
  
  fillView : function()
  {
    var htmlElement = this.pageContaint.scrollView.biography.view;
    htmlElement.innerHTML = htmlDecode(this.article.content);
    this.pageContaint.name.text = this.article.title;
    
    // verifie s'il y ades photo et/ou des videos pour cet artiste
    
    if(this.article.media) {
      for(var i = 0; i < this.article.media.length; i++)
        {
        if(this.article.media[i].type == "image/jpeg") {
        contienPhoto = true;
        if(this.pageContaint.image.src === null) this.pageContaint.image.src = this.article.media[i].url;
        }
        else if(this.article.media[i].type == "video/youtube") {
        contienVideo = true;
        }
      }
//    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Portrait'+this.article.title);  
    }

  // s'il n'y a pas de photos, alors pas de bouton book ni de photo
  if (contienPhoto === false){
        this.pageContaint.image.hide();
        this.pageContaint.bookButton.hide();
        }
  // si non afficahe du bouton book et de la premièère photo      
  else{
        this.pageContaint.image.show();
        this.pageContaint.bookButton.show();
        }
  
  // si pas de video alors pas de bouton video
  if (contienVideo === false){
        this.pageContaint.videoButton.hide();
        }
  // sinon bouton vidéo      
  else {
        this.pageContaint.videoButton.show();
        }
  
          
    var portraitView = this;
    window.setTimeout(function()
                      {
                        portraitView.pageContaint.scrollView.refresh();
                      },
                      1000);
  },
  
  notify : function (event) {
  var portraitView = this;

  if( event.src == this.pageContaint.videoButton)
      {
//      window.console.log("TOP VIDEO");
      var portaitVideoView = this.createAndAddComponent("PortraitVideo", 
                                          {
                                          position: [this.size[0], 0], 
                                          article: this.article,
                                          category: this.category,
                                          title: "Vidéos"
                                          });
      this.navigationController.pushView(portaitVideoView);
      //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Portrait/Video/'+this.article.title);
      }
  else if(( event.src == this.pageContaint.bookButton) || (event.src == this.pageContaint.image))
      {
//      window.console.log("TOP BOOK");
      var portaitBookView = this.createAndAddComponent("PortraitBook", 
                                          {
                                              position: [this.size[0], 0], 
                                              article: this.article,
                                              category: this.category,
                                              title: "Book"
                                          });
      this.navigationController.pushView(portaitBookView);
      
      // SI IPHONE, ON CAHCHE LA BARRE DE NAVIGATION
      if(deviceConfiguration.os !== vs.core.DeviceConfiguration.OS_ANDROID) {
        tabController.setTabBarVisibility(false, true);
        this.navigationController.setNavigationBarVisibility(false, true);
        }
      //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Portrait/Book/'+this.article.title);
      }
      
  else if((event.src == this.pageContaint.scrollView)&&(fullScreen === false)){
      fullScreen = true;
      $(".scrollView").animate({top:'0px', left:'0px', height:this.size[1]-44, width:this.size[0]}, 500, function(){portraitView.close.show();}); 
      //$(".scrollView").animate({top:'0px', left:'0px', height:'361px', width:'+=20px'}, 500, function(){portraitView.close.show();});
      //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Portrait/ShowBiography');
    }

  else if((event.src == this.close) && (fullScreen === true)){
      fullScreen = false;
      this.close.hide();
      $(".scrollView").animate({top:this.size[1]/3.53, left:'10px', height:(this.size[1] - (this.size[1]/3.53)-50), width:'-=20px'}, 500);
      //$(".scrollView").animate({top:'115px', left:'10px', height:'241px', width:'-=20px'}, 500);
      event.stopPropagation();
    }
    
  }

});

PortraitView.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_30",
    layout: "absolute_layout"
  };
  this.pageContaint = new vs.ui.View (config);
  
  this.pageContaint.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_31",
      text: "text"
    };
    this.name = new vs.ui.TextLabel (config);
    this.image = new vs.ui.ImageView ({"node_ref":this.id + "#id_32"});
    config = {
      node_ref: this.id + "#id_33",
      text: "Vidéos"
    };
    this.videoButton = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_34",
      text: "Book"
    };
    this.bookButton = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_35",
      layout: "absolute_layout",
      pinch: 0,
      scroll: 1
    };
    this.scrollView = new vs.ui.ScrollView (config);
    
    this.scrollView.vsdInit = function () {
      var default_values;
      config = {
        node_ref: this.id + "#id_36",
        text: ""
      };
      this.biography = new vs.ui.TextLabel (config);
      this.biography.init ();
      this.add (this.biography, 'children');
    }
    this.name.init ();
    this.add (this.name, 'children');
    this.image.init ();
    this.add (this.image, 'children');
    this.videoButton.init ();
    this.add (this.videoButton, 'children');
    this.bookButton.init ();
    this.add (this.bookButton, 'children');
    this.scrollView.init ();
    this.add (this.scrollView, 'children');
  }
  
  this.pageContaint.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.close = new vs.ui.ImageView ({"node_ref":this.id + "#id_37"});
  
  this.close.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.pageContaint.init ();
  this.add (this.pageContaint, 'children');
  this.close.init ();
  this.add (this.close, 'children');
  this.pageContaint.videoButton.bind ('POINTER_END', this, 'notify');
  this.pageContaint.bookButton.bind ('POINTER_END', this, 'notify');
  this.pageContaint.scrollView.bind ('POINTER_END', this, 'notify');
  this.pageContaint.image.bind ('POINTER_END', this, 'notify');
  this.close.bind ('POINTER_END', this, 'notify');
  var default_values;
};


var VideoListItem = vs.core.createClass ({

  parent : vs.ui.View,
  
  properties :
    {
      videoId : 
        {
          set : function(videoId){this._videoId = videoId;}
        },
      thumbnailURL : 
        {
          set : function(thumbnailURL){this.image.src = thumbnailURL;}
        },
      videoTitle:
        {
          set : function(videoTitle){this.container.titleLabel.text = videoTitle;}
        }
    },

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
      
    /*
      this.view.innerHTML = '<div>'+this.title+'</div><object class="ytplayer">'
                              +'<param name="movie" value="http://www.youtube.com/v/'+ this.videoId+'?version=3&amp;hl=en_US&amp;rel=0">'
                              +'</param><param name="allowFullScreen" value="true"></param>'
                              +'<param name="allowscriptaccess" value="always"></param>'
                              +'<embed class="ytplayer" src="http://www.youtube.com/v/'+ this.videoId+'?version=3&amp;hl=en_US&amp;rel=0" '
                                +'type="application/x-shockwave-flash" '
                                +'allowscriptaccess="always" '
                                +'allowfullscreen="true">'
                              +'</embed>'
                            +'</object>'
                            */
  },
  
  hasBeenTapped : function()
  {
    this.videoList.videoItemHasBeenSelected(this);
  },

  notify : function (event) 
  {
  }

});

VideoListItem.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  this.image = new vs.ui.ImageView ({"node_ref":this.id + "#id_54"});
  
  this.image.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_55",
    layout: "absolute_layout"
  };
  this.container = new vs.ui.View (config);
  
  this.container.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_56",
      text: "text"
    };
    this.titleLabel = new vs.ui.TextLabel (config);
    this.titleLabel.init ();
    this.add (this.titleLabel, 'children');
  }
  
  this.container.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.image3 = new vs.ui.ImageView ({"node_ref":this.id + "#id_57"});
  
  this.image3.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.image.init ();
  this.add (this.image, 'children');
  this.container.init ();
  this.add (this.container, 'children');
  this.image3.init ();
  this.add (this.image3, 'children');
  this.image.bind ('POINTER_END', this, 'hasBeenTapped');
  var default_values;
};


var ActualiteView = vs.core.createClass ({

  parent : vs.ui.View,
  
  properties : 
  {
    article : vs.core.PROPERTY_IN_OUT,
    category : vs.core.PROPERTY_IN_OUT
  },

  title : "Actualite",
  _actualiteView: null,

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/
/*
  componentDidInitialize: function () {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    this.fillView();
    _actualiteView=this;
  },
  
  fillView : function()
  {
    var htmlElement = this.pageContent.scrollViewNews.actualiteContent.view;
    var content = "&lt;span style='color:#D83472;font-size:27px;'&gt;" + this.titleNews + "&lt;/span&gt;&lt;br&gt;&lt;br&gt;" + this.content;
    htmlElement.innerHTML = htmlDecode(content);

//suppression des éventuels liens web dans ke tetx    
    var bodyImages = htmlElement.getElementsByTagName("img");
    for(var i=0; i < bodyImages.length; i++)
      {
      var bodyImage = bodyImages[i];
      var bodyImageParent = bodyImage.parentNode;
      if(bodyImageParent.tagName == "A")
        bodyImageParent.parentNode.replaceChild(bodyImage,bodyImageParent);
      }
    
//    this.pageContent.actualiteTitre.text = this.titleNews;
//    this.pageContent.actualiteTitre.view.style.height="auto";
        
    window.setTimeout(function()
                      {
                        _actualiteView.pageContent.scrollViewNews.refresh();
                      },
                      1000);
  },

  notify : function (event) {
  }

});

ActualiteView.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_73",
    layout: "absolute_layout"
  };
  this.pageContent = new vs.ui.View (config);
  
  this.pageContent.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_74",
      layout: "absolute_layout",
      pinch: 0,
      scroll: 1
    };
    this.scrollViewNews = new vs.ui.ScrollView (config);
    
    this.scrollViewNews.vsdInit = function () {
      var default_values;
      config = {
        node_ref: this.id + "#id_75",
        text: "text"
      };
      this.actualiteContent = new vs.ui.TextLabel (config);
      this.actualiteContent.init ();
      this.add (this.actualiteContent, 'children');
    }
    this.scrollViewNews.init ();
    this.add (this.scrollViewNews, 'children');
  }
  
  this.pageContent.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.pageContent.init ();
  this.add (this.pageContent, 'children');
  var default_values;
};


var timeOut;

var TalentList = vs.core.createClass ({

  parent : vs.ui.View,

  
  properties : 
  {
    pipelineId : vs.core.PROPERTY_IN_OUT,
    title : vs.core.PROPERTY_IN_OUT
  },
    
/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    //this.categorieList
    this.professionList.data = [];
    timeOut = 3;
    this.loadTalents();
  },
    
  itemSelected : function(event)
  {
    var index = event.data.index;
    var item = event.data.item;
    var portraitView = this.createAndAddComponent("PortraitView", 
                                              {
                                                position: [this.size[0], 0], 
                                                article: item.article,
                                                category: item.categoryTitle
                                              });
    this.navigationController.pushView(portraitView);
  //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/TalentList/' +item.categoryTitle +'/'+ item.article.title);
  },
    
  /**
   * send a request to get a talent category (pipeline)
   */
  loadTalents : function()
  {
    NDAPI.getPipeline(this.pipelineId, 
                      this.talentsLoadSuccess, 
                      this.talentsLoadFailure, 
                      this);
  },
  
  /**
   * talent category request succeed
   * fill the talentList
   */
  talentsLoadSuccess : function(pipeline)
  {
    var items = pipeline.channel.items;
    var talents = [];
    for (var i = 0; i < items.length; i++)
    {
      var item = items[i];
      var split = item.title.split(" | ");
      if (split[1] == null) split[1] = "";
      item.title = split[1] + " " + split[0];
      talents.push({article: item, categoryTitle: this.title});
    }
    
    this.professionList.setItemTemplateName("TalentListItem");
    this.professionList.data = talents;
    this.professionList.refresh();
    this.imageWait.hide();
//    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/TalentList');
  },
  
  /**
   * talent category list request failed
   * display error message ?
   */
  talentsLoadFailure : function(error)
  {
    timeOut--;
    if(timeOut >=0 ){
          this.loadTalents();
    }
    else{
      alert('Problème Reseau!');
      console.log("Probleme Réseau");
      }
  },

  notify : function (event) 
  {

  }

});

TalentList.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_27",
    type: "DefaultList",
    model: [{"title":"one"},{"title":"two"},{"title":"tree","label":"two"}],
    hasArrow: true,
    scroll: 1
  };
  this.professionList = new vs.ui.List (config);
  
  this.professionList.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.imageWait = new vs.ui.ImageView ({"node_ref":this.id + "#id_28"});
  
  this.imageWait.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.professionList.init ();
  this.add (this.professionList, 'children');
  this.imageWait.init ();
  this.add (this.imageWait, 'children');
  this.professionList.bind ('itemselect', this, 'itemSelected');
  var default_values;
};


var timeOut;
var Actualites = vs.core.createClass ({

  parent : vs.ui.View,
  
  title:  "Actualités",
  
/*
  initComponent: function () 
  {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here    
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.navigationBar
    
    this.list.data = [];
    timeOut  = 3;
    this.loadNews();
  },  
  
  
    itemSelected : function(event)
      {
      var index = event.data.index;
      var item = event.data.item;
      var actualiteView = this.createAndAddComponent("ActualiteView", 
                                              {
                                                position: [this.size[0], 0], 
                                                title: "Actualité",
                                                titleNews: item.article.title,
                                                description: item.article.description,
                                                content: item.article.content
                                              });
      this.navigationController.pushView(actualiteView);
    //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Actualites/'+item.article.title);
  },
  
  
  
  
  loadNews : function()
  {
    NDAPI.getPipeline(10, 
                      this.loadNewsSuccessCallBack, 
                      this.loadNewsFailureCallBack, 
                      this);
  },
  
  loadNewsSuccessCallBack : function(pipeline)
  {
    var items = pipeline.channel.items;
    var news = [];
    for (var i = 0; i < items.length; i++)
    {
      var item = items[i];
    //news.push({{title : item.title, description : item.description, content:item.content});
    news.push({article : item});
    }
    this.list.setItemTemplateName("ActualiteListItem");
    this.list.data = news;
    this.list.refresh();
    this.imageWait.hide();
//    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Actualites');
  },
  
  loadNewsFailureCallBack : function(error)
  {
    timeOut--;
    if(timeOut>=0){
      Actualite.loadNews();    
    }
    else{
      consolelog("Problèeme réseau!");
      alert("Problèeme réseau!");
    }
  },
  
  notify : function (event) 
  {

  }
});

htmlDecode = function (input)
{
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
};

Actualites.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_24",
    type: "DefaultList",
    model: [],
    hasArrow: true,
    scroll: true
  };
  this.list = new vs.ui.List (config);
  
  this.list.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.imageWait = new vs.ui.ImageView ({"node_ref":this.id + "#id_25"});
  
  this.imageWait.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.list.init ();
  this.add (this.list, 'children');
  this.imageWait.init ();
  this.add (this.imageWait, 'children');
  this.list.bind ('itemselect', this, 'itemSelected');
  var default_values;
};


var tabController;

window.free = vs.util.free;
appSize = null;

/*** patch email ***/
WebIntent.EXTRA_EMAIL = "android.intent.extra.EMAIL";
EmailComposer.prototype.showWithCB=function(a,b,c,d,g,h,e,f){var i={};d&&(i[WebIntent.EXTRA_EMAIL]=d);b&&(i[WebIntent.EXTRA_SUBJECT]=b);c&&(i[WebIntent.EXTRA_TEXT]=c);g&&(i[WebIntent.EXTRA_CC]=[g]);h&&(i[WebIntent.EXTRA_BCC]=[h]);b=e?"text/html":"text/plain";d=WebIntent.ACTION_SEND;if(f&&f.length){c=[];for(d=0;d<f.length;d++)c.push(f[d].url);d=WebIntent.ACTION_SEND_MULTIPLE;i[WebIntent.EXTRA_STREAM]=c}window.plugins.webintent.startActivity({action:d,type:b,extras:i},a,null)};


vs.core.DeviceConfiguration._estimateScreenSize = function (metric)
{
  var w = metric.width / metric.densityDpi;
  var h = metric.height / metric.densityDpi;
  var size = Math.sqrt (w*w + h*h);
  if (size < 5) return 3;
  if (size < 8) return 7;
  else return 10;
};



var Talentstore = vs.core.createClass ({

  parent: vs.ui.Application,
  
  accueilPanel : null,
  talentCategoryScreen : null,
  videosScreen : null,
  contactScreen : null,
  
  _tabController: null,
  talentsNavigationController: null,
  
  newsNavigationController: null,
  videosNavigationController: null,
  contactNavigationController: null,

  
  

  componentDidInitialize: function ()
  {
    this.bind('start', this, 'applicationStarted');
  },

  /** The application is initialized */
  applicationStarted : function (event)
  {
    appSize = {width: this.size[0], height: this.size[1]};
    
    this.bind("back", this, "backButtonPressed");
      
    NDAPI._user={login: "anonymous@netdevices.fr", password:"anonymous"};
    NDAPI._baseURL = "http://staging.corpuspro.com/talentstore/admin/sapi/index.php/";
    
/*   window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.startTrackerWithAccountID("");
    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackEvent('Application', 'launch', 'Talent Store ');*/
    
    
    var talentStore = this;
    NDAPI.connect("anonymous@netdevices.fr", 
                  "anonymous",
                  function(bConnect)
                  {
                    if (bConnect)
                    {
                      talentStore.talentsNavigationController = talentStore.createAndAddComponent("NavigationController");
                      
                      
                      talentStore.newsNavigationController = talentStore.createAndAddComponent("NavigationController");
                      talentStore.videosNavigationController = talentStore.createAndAddComponent("NavigationController");
                      talentStore.contactNavigationController = talentStore.createAndAddComponent("NavigationController");
                      
                      
                      tabController = talentStore.createAndAddComponent("TabController");
                      tabController.setViews([talentStore.newsNavigationController, talentStore.talentsNavigationController, talentStore.videosNavigationController, talentStore.contactNavigationController]);
                      talentStore._tabController = tabController;
                      
                      var talentCategoryList = talentStore.createAndAddComponent("TalentCategoryList");
                      talentStore.talentsNavigationController.setRootView(talentCategoryList);
                      
                      var news = talentStore.createAndAddComponent("Actualites");
                      talentStore.newsNavigationController.setRootView(news);

                      var videos = talentStore.createAndAddComponent("VideoListView");
                      talentStore.videosNavigationController.setRootView(videos);

                      var contactView = talentStore.createAndAddComponent("ContactView");
                      talentStore.contactNavigationController.setRootView(contactView);

                    }
                    else
                    {
                      console.log("Probleme de connexion avec la base...");
                    }
                  });
    
    this.mainViewVisibility (true);
    this.loadingStop ();
  },
  
    /***************** android back button event *****************/
  backButtonPressed : function()
  {
    if (isset(this.talentsNavigationController) === false)
      this.exit();
    else if (this.talentsNavigationController.back() === false)
      if (this.newsNavigationController.back() === false)
        if (this.videosNavigationController.back() === false)
          if (this.contactNavigationController.back() === false)
            this.exit();
  },

  
  notify : function (event) 
  {
  }
});
launchApplication = function ()
{
  Application_default_device = 'android_3_16_9';
  vs.ui.Application.configureDevice ();

  setTimeout (function () {
      var config;

      config = {
        id: "id_22",
        node_ref: "id_1#id_22",
        layout: "absolute_layout"
      };
      this._talentstore = new Talentstore (config);
      this._talentstore.init ();

      Application.start ();
  }, 100);
}


vs.ui.Application.VERSION = "0.0.80";
window.deviceConfiguration.registerTargetId ("iphone_3_3_2_p", {device: 'iphone_3_3_2', resolution: [[320,480]], statusBarHeight: 20});
window.deviceConfiguration.registerTargetId ("android_3_16_9_p", {device: 'android_3_16_9', resolution: [[480,854],[540,960]], statusBarHeight: 38});
window.deviceConfiguration.registerTargetId ("android_3_16_10_p", {device: 'android_3_16_10', resolution: [[480,800],[800,1280]], statusBarHeight: 38});


Application_android_screen_match = {
  "android_3_16_9" : 480,
  "android_3_16_10" : 480,
};

Application_bbos_screen_match = {
};



var TabController = vs.core.createClass ({

  parent : vs.ui.View,

  _tabs : [],
  _tabCount : 0,
  _views : [],
  _viewClasses : null,
  _tabBarIsVisible : true,
  
/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    
    // TODO : this part of initialization have to become automatic
    
    // give each tab an index
    this.tabs.newsTab.index = 0; 
    this.tabs.talentsTab.index = 1;
    this.tabs.videosTab.index = 2;
    this.tabs.contactTab.index = 3;
    
    // keep tabs references
    this._tabs = [ 
                    this.tabs.newsTab, 
                    this.tabs.talentsTab, 
                    this.tabs.videosTab, 
                    this.tabs.contactTab
                  ];
    // keep tags count
    this._tabCount = 4;
  },
  
  /**
   * tab selection handler
   */
  tabClicked : function(event)
  {
    var tab = event.src;
    // update selection
    this.selectTabAtIndex(tab.index);
  },
  
  /**
   * update the display according to the selection
   */
  selectTabAtIndex : function(index)
  {
    for (var i = 0; i < this._tabCount; i++)
    {
      var currentTab = this._tabs[i];
      var currentView = this._views[i];
      var currentViewClass = this._viewClasses[i];
      
      // is it selected tab
      if (currentTab.index == index)
      {
        // update the selected tab style
        !currentTab.hasClassName("on") && currentTab.addClassName("on");
        
        // create the view if not exists
        if (!currentView)
        {
          // no view, no view class given, we can't load the view, so do nothing
          if (currentViewClass === null)
          {
            window.console.log("tabController : no view to display");
            return;
          }
          
          // create the view, add it as child to this view, set a reference to this tab controller
          currentView = this.views.createAndAddComponent(currentViewClass);
          this._views[i] = currentView; // vérifier si c'est nécessaire
          this.views.add(currentView);
          currentView.tabController = this;
        }
        else
        {
          // add the view as child to this view, ensure that it is displayes, set a reference to this tab controller
          this.views.add(currentView);
          currentView.show();
          if (!currentView.tabController) currentView.tabController = this;

        }
      }
      // not the selected tab
      else
      {
        // update the tab style to unselect it if it was, hide the corresponding view
        currentTab.hasClassName("on") && currentTab.removeClassName("on");
        currentView && currentView.hide();
      }
    }
  },
  
  /**
   * set the view references
   */
  setViews : function(mixedViewArray)
  {
      this._viewClasses = [];
      for(var i = 0; i < mixedViewArray.length; i++)
      {
        var view = mixedViewArray[i];
        if ("string" === typeof view)
        {
          this._viewClasses[i] = view;
          this._views[i] = null;
        }
        else
        {
          this._viewClasses[i] = null;
          this._views[i] = view;
          view.tabController = this;
        }
      }
      this.selectTabAtIndex(0);
  },
  
  /**
   * add a view class to the view references
   * the view will be create from the view class given when displayed for the first time
   */
  addViewClassAtIndex : function(viewClass, index)
  {
    if (this._viewClasses === null)
      this._viewClasses = [];
    
    this._viewClasses[index] = viewClass;
    if (this._viewClasses.length == 1)
      this.selectTabAtIndex(0);
  },
  
  setTabBarVisibility : function(bShow, bAnimated)
  {
    if (bShow)
    {
      this._showTabBar(bAnimated);
    }
    else
    {
      this._hideTabBar(bAnimated);
    }
  },
  
  _showTabBar : function(bAnimated)
  {
    if (this._tabBarIsVisible === true)
      return;
  
    var tabControllerHeight = this.size[1];
    var y = tabControllerHeight - 54;

    var showAnimation = new vs.fx.TranslateAnimation(0, 0, 0);
    var sizeAnimation = new vs.fx.Animation(["height", y + "px"]);
    
    if (bAnimated)
    {
      // set a duration if needed
    }
    else
    {
      showAnimation.duration = "0s";
      sizeAnimation.duration = "0s";
    }
    
    var tabController = this;
    sizeAnimation.process(this.views);
    showAnimation.process(this.tabs);
    tabController._tabBarIsVisible = true;
  },
  
  _hideTabBar : function(bAnimated)
  {
    if (this._tabBarIsVisible === false)
      return;
    
    var tabControllerHeight = this.size[1];
    var y = tabControllerHeight;
    
    var hideAnimation = new vs.fx.TranslateAnimation(0, 54, 0);
    var sizeAnimation = new vs.fx.Animation(["height", y + "px"]);
    
    if (bAnimated)
    {
      // set a duration if needed
    }
    else
    {
      hideAnimation.duration = "0s";
      sizeAnimation.duration = "0s";
    }
    
    var tabController = this;
    sizeAnimation.process(this.views);
    hideAnimation.process(this.tabs);
    tabController._tabBarIsVisible = false;
  },

  notify : function (event) 
  {
  }

});

TabController.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_62",
    layout: "absolute_layout"
  };
  this.tabs = new vs.ui.View (config);
  
  this.tabs.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_63",
      layout: "absolute_layout"
    };
    this.newsTab = new vs.ui.View (config);
    
    this.newsTab.vsdInit = function () {
      var default_values;
      config = {
        node_ref: this.id + "#id_64",
        text: "Actualités"
      };
      this.textlabel3 = new vs.ui.TextLabel (config);
      this.textlabel3.init ();
      this.add (this.textlabel3, 'children');
    }
    config = {
      node_ref: this.id + "#id_65",
      layout: "absolute_layout"
    };
    this.talentsTab = new vs.ui.View (config);
    
    this.talentsTab.vsdInit = function () {
      var default_values;
      config = {
        node_ref: this.id + "#id_66",
        text: "Talents"
      };
      this.textlabel31 = new vs.ui.TextLabel (config);
      this.textlabel31.init ();
      this.add (this.textlabel31, 'children');
    }
    config = {
      node_ref: this.id + "#id_67",
      layout: "absolute_layout"
    };
    this.videosTab = new vs.ui.View (config);
    
    this.videosTab.vsdInit = function () {
      var default_values;
      config = {
        node_ref: this.id + "#id_68",
        text: "Cvisuels"
      };
      this.textlabel311 = new vs.ui.TextLabel (config);
      this.textlabel311.init ();
      this.add (this.textlabel311, 'children');
    }
    config = {
      node_ref: this.id + "#id_69",
      layout: "absolute_layout"
    };
    this.contactTab = new vs.ui.View (config);
    
    this.contactTab.vsdInit = function () {
      var default_values;
      config = {
        node_ref: this.id + "#id_70",
        text: "Contact"
      };
      this.textlabel312 = new vs.ui.TextLabel (config);
      this.textlabel312.init ();
      this.add (this.textlabel312, 'children');
    }
    this.newsTab.init ();
    this.add (this.newsTab, 'children');
    this.talentsTab.init ();
    this.add (this.talentsTab, 'children');
    this.videosTab.init ();
    this.add (this.videosTab, 'children');
    this.contactTab.init ();
    this.add (this.contactTab, 'children');
  }
  
  this.tabs.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_71",
    layout: "absolute_layout"
  };
  this.views = new vs.ui.View (config);
  
  this.views.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.tabs.init ();
  this.add (this.tabs, 'children');
  this.views.init ();
  this.add (this.views, 'children');
  this.tabs.newsTab.bind ('POINTER_END', this, 'tabClicked');
  this.tabs.talentsTab.bind ('POINTER_END', this, 'tabClicked');
  this.tabs.videosTab.bind ('POINTER_END', this, 'tabClicked');
  this.tabs.contactTab.bind ('POINTER_END', this, 'tabClicked');
  var default_values;
};


var VideoView = vs.core.createClass ({

  parent : vs.ui.View,
  videoId : null,
  title : "CVisuel",

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/
/*
  componentDidInitialize: function () {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
  },
*/
  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    this.fillView();
  },
  
  fillView : function()
  {
       this.titre.text = this.titleVideo;
       this.cvisuel.view.innerHTML += '<object class="ytplayer">'
                                            +'<param name="movie" value="http://www.youtube.com/v/'+ this.videoId+'?version=3&amp;hl=en_US&amp;rel=0">'
                                            +'</param><param name="allowFullScreen" value="true"></param>'
                                            +'<param name="allowscriptaccess" value="always"></param>'
                                            +'<embed class="ytplayer" src="http://www.youtube.com/v/'+ this.videoId+'?version=3&amp;hl=en_US&amp;rel=0" '
                                              +'type="application/x-shockwave-flash" '
                                              +'allowscriptaccess="always" '
                                              +'allowfullscreen="true">'
                                            +'</embed>'
                                          +'</object>'
                            
  },

notify : function (event) {
  }

});

VideoView.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_82",
    text: "text"
  };
  this.titre = new vs.ui.TextLabel (config);
  
  this.titre.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_83",
    layout: "absolute_layout"
  };
  this.cvisuel = new vs.ui.View (config);
  
  this.cvisuel.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.titre.init ();
  this.add (this.titre, 'children');
  this.cvisuel.init ();
  this.add (this.cvisuel, 'children');
  var default_values;
};


var TalentCategoryListItem = vs.core.createClass ({

  parent : vs.ui.View,
  
  properties :
  {
    title : 
      {
        set : function(title){this.titleLabel.text = title;},
        get : function(){return this.titleLabel.text;}
      }  
  },

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
  },

  notify : function (event) 
  {
  }

});

TalentCategoryListItem.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_59",
    text: "Commédienne"
  };
  this.titleLabel = new vs.ui.TextLabel (config);
  
  this.titleLabel.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.image2 = new vs.ui.ImageView ({"node_ref":this.id + "#id_60"});
  
  this.image2.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.titleLabel.init ();
  this.add (this.titleLabel, 'children');
  this.image2.init ();
  this.add (this.image2, 'children');
  var default_values;
};


var ActualiteListItem = vs.core.createClass ({

  parent : vs.ui.View,
  _article : null,
  properties :
  {
    article : 
      {
        set : function(article)
        {
          this._article = article;
          if (this._article.media.length > 0)
            imageUtils.loadAndResize(this.image, this._article.media[0].url, [92, 109], [13, 12]);
          else
            this.image.hide();
          this.container.nameLabel.text = this._article.title;
        },
        get : function(){return this._article;}
      }  
  },
  
/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
  },

  notify : function (event) 
  {
  }

});
ActualiteListItem.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  this.image = new vs.ui.ImageView ({"node_ref":this.id + "#id_85"});
  
  this.image.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_86",
    layout: "absolute_layout"
  };
  this.container = new vs.ui.View (config);
  
  this.container.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_87",
      text: "text"
    };
    this.nameLabel = new vs.ui.TextLabel (config);
    this.nameLabel.init ();
    this.add (this.nameLabel, 'children');
  }
  
  this.container.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.image11 = new vs.ui.ImageView ({"node_ref":this.id + "#id_88"});
  
  this.image11.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.image.init ();
  this.add (this.image, 'children');
  this.container.init ();
  this.add (this.container, 'children');
  this.image11.init ();
  this.add (this.image11, 'children');
  var default_values;
};


var indexImg;
var indexMax = 0;
var displayOn = false;        
var view;
var PortraitBook = vs.core.createClass ({

  parent : vs.ui.View,

  properties : 
  {
    article : vs.core.PROPERTY_IN_OUT,
    category : vs.core.PROPERTY_IN_OUT
  },

  title : "Book",
  
  postionAfterAnim : null,
  currentPage : 0,
  nbPhoto : 0,

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    this.postionAfterAnim = {x : 0};
    this.fillView();
    this.mainDiv.view.addEventListener(POINTER_START, this, false);
  },
  
  fillView : function()
  {
    // comptage de nombre de photos dans le book
    var i;
    for(i = 0; i < this.article.media.length; i++)
    {
      
      /*
      div[indexImg] = document.createElement("div");
      div[indexImg].style.width = "320px";
      div[indexImg].style.height = "406px";
      div[indexImg].style.display="inline-block";
      img[indexImg] = document.createElement("img");
      img[indexImg].src=this.article.media[indexImg].url;
      div[indexImg].appendChild(img[indexImg]);
      this.mainDiv.view.appendChild(div[indexImg]);
      */
      if(this.article.media[i].type == "image/jpeg") {
        this.nbPhoto++;
        var imageContainer = new vs.ui.View({size: [appSize.width, appSize.height]});
        imageContainer.init();
        var image = new vs.ui.ImageView();
        image.init();
        imageUtils.loadAndResize(image, this.article.media[i].url, [appSize.width, appSize.height]);
        image.addClassName("bookImage");
        imageContainer.addClassName("imageContainer");
        imageContainer.add(image);
        this.mainDiv.setStyle("width", this.nbPhoto * appSize.width + "px");
        this.mainDiv.add(imageContainer);
      }
    }
//        window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('PortraitBook/' + article.title);    
  },
  
  notify : function (event) {
  },
  
  THRESHOLDX : 10,
  THRESHOLDY : 15,
  DELTAX : 150,
  //DELTAY : 150,
  oldX : 0,
  oldY : 0,
  dx : 0,
  dy : 0,
  isDragging : false,

  handleEvent : function (event)
  {
    if (event.type === POINTER_START)
    {
      //window.console.log("template pointer start");
      
      // store the start event cursor position to compute distance later      
      this.oldX = (EVENT_SUPPORT_TOUCH ? event.touches[0].pageX : event.pageX);
      this.oldY = (EVENT_SUPPORT_TOUCH ? event.touches[0].pageY : event.pageY);
      this.dx = this.oldX;
      this.dy = this.oldY;
      // subscribe to the move and end event
      document.addEventListener (POINTER_MOVE, this, true);
      document.addEventListener (POINTER_END, this, true);
      
    }
    else if (event.type === POINTER_MOVE)
    {
      //window.console.log("pointer move");
      
      // store the actual cursor position
      this.dx = (EVENT_SUPPORT_TOUCH ? event.touches[0].pageX : event.pageX);
      this.dy = (EVENT_SUPPORT_TOUCH ? event.touches[0].pageY : event.pageY);
      
      if (Math.abs(this.dy - this.oldY) > this.THRESHOLDY &&        // moved enough on y axis 
          this.isDragging !== true)                                // and has not scrolled yet
      {
        // so disable reader dragging
        this.isDragging = false;
      }
      else if (Math.abs(this.dx - this.oldX) > this.THRESHOLDX  ||  // moved enough on x axis
              this.isDragging === true)                             // or has already start to scroll
      {
        // enable and anim the scroll
        if (!this.isDragging)
        {
          this.isDragging = true;
        }
         
        this._delta = (this.dx - this.oldX);
        this.mainDiv.translate(this.postionAfterAnim.x + this._delta, 0);
      }
      return;
    }
    else if (event.type === POINTER_END)
    {
      if (this.isDragging /*&& this.wireFrameIsOpen !== true*/ && this.isScaled !== true) // is dragging?
      {
        // event will not be pass to other elements
        event.stopPropagation ();
        event.preventDefault();
        
        //window.console.log("reader handle event delta = " + (this.dx - this.oldX));
        if ((this.dx - this.oldX) > this.DELTAX)                // moved enough t consider the user want to go to the next page
        {
            if (this.currentPage > 0)
              this.currentPage -= 1;
            var reader = this;
            
            var width = this.size[0];

            this.mainDiv.view.removeEventListener(POINTER_START, this, true);

            var pageComeBackAnim = new vs.fx.TranslateAnimation((-width) * this.currentPage, 0, 0);
            pageComeBackAnim.process(this.mainDiv, function()
            {
              reader.postionAfterAnim.x = (-width) * reader.currentPage;
              reader.mainDiv.view.addEventListener(POINTER_START, reader, true);
            });
            
        }
        else if ((this.dx - this.oldX) < -this.DELTAX)          // moved enough to consider the user want to go to the previous page
        {
            if (this.currentPage < this.nbPhoto - 1)
              this.currentPage += 1;
            var reader = this;

            var width = this.size[0];

            this.mainDiv.view.removeEventListener(POINTER_START, this, true);
            
            var pageComeBackAnim = new vs.fx.TranslateAnimation((-width) * this.currentPage, 0, 0);
            pageComeBackAnim.process(this.mainDiv, function()
            {
              reader.postionAfterAnim.x = (-width) * reader.currentPage;
              reader.mainDiv.view.addEventListener(POINTER_START, reader, true);
            });
        }
        else  // has not moved enough, the page return to its initial position with an animation
        {
          var pageComeBackAnim = new vs.fx.TranslateAnimation(this.postionAfterAnim.x, 0, 0);
          pageComeBackAnim.process(this.mainDiv);
        }
      }
      else if (Math.abs(this.dx - this.oldX) < 10)
      {
        // si iphone alors gestion de la barre de navigation
        if(deviceConfiguration.os !== vs.core.DeviceConfiguration.OS_ANDROID) {

          if (this.navigationController._navigationBarIsVisible)
            this.navigationController.setNavigationBarVisibility(false, true);
          else
            this.navigationController.setNavigationBarVisibility(true, true);
          
          if (this.tabController._tabBarIsVisible)
            this.tabController.setTabBarVisibility(false, true);
          else
            this.tabController.setTabBarVisibility(true, true);
        }
      }
      
      // reset scrolling state variable
      this.isDragging = false;

      // reset cursor position state variables
      this.dx = this.oldX = 0;
      this.dy = this.oldY = 0;
      
      // unsubscribe to the move and end event
      document.removeEventListener (POINTER_MOVE, this, true);
      document.removeEventListener (POINTER_END, this, true);
      
      //window.console.log("template pointer end : remove listener move");
    }
  }
});

PortraitBook.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_77",
    layout: "horizontal_layout"
  };
  this.mainDiv = new vs.ui.View (config);
  
  this.mainDiv.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.mainDiv.init ();
  this.add (this.mainDiv, 'children');
  this.bind ('POINTER_END', this, 'notify');
  this.bind ('POINTER_MOVE', this, 'show');
  var default_values;
};


var TalentListItem = vs.core.createClass ({

  parent : vs.ui.View,
  _article : null,
  _categoryTitle : null,
  properties :
  {
    article : 
      {
        set : function(article)
        {
          var _nbPhotos = 0;
          var _nbVideos = 0;
          this._article = article;
          if (this._article.media.length > 0){
            imageUtils.loadAndResize(this.image, this._article.media[0].url, [92, 109], [13, 12]);
           for(var i=0;i<this._article.media.length; i++) {
              if(this._article.media[i].type == "image/jpeg") _nbPhotos++;
              else _nbVideos++;
              }
            this.nbPhotos.text = _nbPhotos;
            this.nbVideos.text = _nbVideos; 
            }
          else
            this.image.hide();
          this.container.nameLabel.text = this._article.title;
        },
        get : function(){return this._article;}
      },  
    categoryTitle : 
      {
        set : function(categoryTitle)
        {
          this._categoryTitle = categoryTitle;
          //this.container.categoryLabel.text = categoryTitle;
        },
        get : function(){return this._categoryTitle;}
      }
  },
  
/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
  },

  notify : function (event) 
  {
  }

});
TalentListItem.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  this.image = new vs.ui.ImageView ({"node_ref":this.id + "#id_41"});
  
  this.image.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_42",
    layout: "absolute_layout"
  };
  this.container = new vs.ui.View (config);
  
  this.container.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_43",
      text: "text"
    };
    this.nameLabel = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_44",
      text: ""
    };
    this.categoryLabel = new vs.ui.TextLabel (config);
    this.nameLabel.init ();
    this.add (this.nameLabel, 'children');
    this.categoryLabel.init ();
    this.add (this.categoryLabel, 'children');
  }
  
  this.container.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.image1 = new vs.ui.ImageView ({"node_ref":this.id + "#id_45"});
  
  this.image1.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_46",
    pinch: 0,
    scroll: 0
  };
  this.image5 = new vs.ui.ImageView (config);
  
  this.image5.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_47",
    pinch: 0,
    scroll: 0
  };
  this.image6 = new vs.ui.ImageView (config);
  
  this.image6.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_48",
    text: "0"
  };
  this.nbPhotos = new vs.ui.TextLabel (config);
  
  this.nbPhotos.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_49",
    text: "0"
  };
  this.nbVideos = new vs.ui.TextLabel (config);
  
  this.nbVideos.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.image.init ();
  this.add (this.image, 'children');
  this.container.init ();
  this.add (this.container, 'children');
  this.image1.init ();
  this.add (this.image1, 'children');
  this.image5.init ();
  this.add (this.image5, 'children');
  this.image6.init ();
  this.add (this.image6, 'children');
  this.nbPhotos.init ();
  this.add (this.nbPhotos, 'children');
  this.nbVideos.init ();
  this.add (this.nbVideos, 'children');
  var default_values;
};


    var videosTalent = [];
    var numVideo = 1;
    var portraitVideo =null;
    var videoList = null;
    var videoView = null;


var PortraitVideo = vs.core.createClass ({

  parent : vs.ui.View,
  title : "Videos",
  nbMedia : 0,
  
/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    
    this.loadVideoFeed();
  },

  videoItemHasBeenSelected : function(event)
  {
    var videoListItem = event.data.item;
    
    
    
    
    //console.log("videoItem + " + videoListItem.title);
    // code pour IOS
    if(deviceConfiguration.os !== vs.core.DeviceConfiguration.OS_ANDROID) {

      var cvisuelView = this.createAndAddComponent("VideoView", 
                                          {
                                            position: [this.size[0], 0], 
                                            videoTitle: videoListItem.title,
                                            videoId: videoListItem.videoId,
                                            thumbnailURL: videoListItem.thumbnailURL
                                          });
      this.navigationController.pushView(cvisuelView);
      }
    else {
      // code pour Android
      var url ="http://www.youtube.com/v/"+ videoListItem.videoId+"?version=3&amp;hl=en_US&amp;rel=0";
      window.open(url);     
      }
    
 //        window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/PortraitVideo/'+videoListItem.title);   
  },
  getVideoInfo : function(i) {
    
    
    // si le media est une video
      if(this.article.media[i].type == "video/youtube") {
 
          var videoId ="";
          var videoUrl = this.article.media[i].url;
          var start = videoUrl.indexOf("v=");
          var stop = videoUrl.indexOf("&amp;");

          // recuperation de l'id de la video
          if((start != -1 ) && (stop != -1)){
            videoId = videoUrl.substring(start+2, stop);
            }
          else videoId = "";

          // preparation de la requete web pour recuperation des infos sur la video sur youtube
          feedURL = "https://gdata.youtube.com/feeds/api/videos/"+videoId+"?v=2";
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function()
            {
            if (xhr.readyState == 4)
              {
              // traitement de la reponse à la requete de demande d'info
              var feed = xhr.responseXML;
              var entry = feed.getElementsByTagName("entry")[0];
              var title = entry.getElementsByTagName("title")[0].textContent;
              var thumbnailURL = "http://i.ytimg.com/vi/"+videoId+"/default.jpg";
              videosTalent.push({videoTitle : title, videoId: videoId, thumbnailURL: thumbnailURL});
              i++;
              // s'il y a encore des element dans la liste de media alors on appel la fonction de recuperation d'info sur la video
              if (i<portraitVideo.nbMedia) 
                portraitVideo.getVideoInfo(i);
              else // si non on met à jour la liste à afficher
                portraitVideo.getVideoInfoFinish();
              }
            };
        xhr.open("GET", feedURL, true);
        xhr.send();
        numVideo++;
        }
    else { // le media n'est pas une video, on passe à l'element suivant dans la liste des medias
        i++;
        if (i<portraitVideo.nbMedia) 
          portraitVideo.getVideoInfo(i);
        else
          portraitVideo.getVideoInfoFinish();
        
    }

    
  },
 
 
 getVideoInfoFinish : function(){
    // //mise à jour de la liste
    videoList.setItemTemplateName("VideoListItem");
    videoList.data = videosTalent;
    window.setTimeout(function(){videoList.refresh();}, 2000);
    videoView.imageWait.hide();
 },

  loadVideoFeed : function()
  {
    // comptage de nombre de photos dans le book
    var i = 0;
    this.nbMedia = this.article.media.length;
    portraitVideo = this;
    videoList = this.videoList;
    videoView = this;
    videosTalent = [];

  
    if (i<this.nbMedia)
      this.getVideoInfo(i); // recherche deu titre de la vidéo sur youtube

    
  },

  notify : function (event) 
  {
  }

});

PortraitVideo.prototype.onItemselect = function (event)
{
  // your code here
  console.log ("onItemselect: " + event.src + ', ' + event.type  + ', ' + event.data);
};

PortraitVideo.prototype.onItemselect = function (event)
{
  // your code here
  console.log ("onItemselect: " + event.src + ', ' + event.type  + ', ' + event.data);
};

PortraitVideo.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_79",
    type: "DefaultList",
    model: [],
    hasArrow: true,
    scroll: true
  };
  this.videoList = new vs.ui.List (config);
  
  this.videoList.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.imageWait = new vs.ui.ImageView ({"node_ref":this.id + "#id_80"});
  
  this.imageWait.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.videoList.init ();
  this.add (this.videoList, 'children');
  this.imageWait.init ();
  this.add (this.imageWait, 'children');
  this.videoList.bind ('itemselect', this, 'videoItemHasBeenSelected');
  var default_values;
};


var NavigationController = vs.core.createClass ({

  parent : vs.ui.View,

  _views : null,
  _currentView : null,
  _navigationBarIsVisible : true,

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    
    // set navigation bar style
    this.navigationBar.style = vs.ui.NavigationBar.BLACK_STYLE;
    this.navigationBar.removeClassName ('blue_ios_style');

    this.navigationBar.navBackbutton.style = vs.ui.Button.BLACK_STYLE;
    this.navigationBar.navBackbutton.removeClassName ('blue_ios_style');
    this.navigationBar.navBackbutton.hide();
    
    this.navigationBar.navBackbutton.bind("select", this, "popView");
    
    this._views = [];
    
    this.initNavigationController();
  },
  
  initNavigationController : function()
  {
  },
  
  createView : function(componentName, config)
  {
    var containerConfig = 
    {
      position : this.position,
      size : this.size
    };
    var container = new vs.ui.View(containerConfig);
    container.init();
    var view = container.createAndAddComponent(componentName, config);
    return (view);
  },
  
  setRootView : function(view, config)
  {
    if ("string" === typeof view)
    {
      if (isset(config) === false)
        config = {};
      config.position = this.position[0];
      view = this.createView(view, config);
    }
    
    this._views[0] = view;

    view.navigationController = this;
    
    if (this.tabController)
      view.tabController = this.tabController;
    
    if (isset(view.title))
      this.navigationBar.titleLabel.text = view.title;
    
    if ("function" === typeof view.viewWillAppear)
      view.viewWillAppear();
    
    this.views.add(view);
    this._currentView = view;
    
    if ("function" === typeof view.viewDidAppear)
        view.viewDidAppear();

    return (view);
  },
  
  
  pushView : function(view, config)
  {
    if ("string" === typeof view)
    {
      if (isset(config) === false)
        config = {};
      config.position = [this.size[0], this.position[0]];
      view = this.createView(view, config);
    }
    
    var oldView = null;
    if (this._views.length > 0)
    {  
      oldView = this._views[this._views.length - 1];
    }
    
    // add the new view
    this._views.push(view);
    view.position = [this.views.size[0], this.views.position[1]];
    view.navigationController = this;
    if (this.tabController)
      view.tabController = this.tabController;
    
    if (this._views.length > 1 && deviceConfiguration.os !== vs.core.DeviceConfiguration.OS_ANDROID)
      this.navigationBar.navBackbutton.show();
    
    if (isset(view.title))
      this.navigationBar.titleLabel.text = view.title;
    
    if ("function" === typeof view.viewWillAppear)
      view.viewWillAppear();
    
    this.views.add(view);
    this._currentView = view;
    
    if (oldView && "function" === typeof oldView.viewWillDisappear)
      oldView.viewWillDisappear();
        
    var x = -this.views.size[0];
    var y = 0;
    var pushViewAnimation = new vs.fx.TranslateAnimation(x, y, 0);
    var navigationController = this;
    pushViewAnimation.process(view, function()
    {
      if ("function" === typeof view.viewDidAppear)
        view.viewDidAppear();
      if (oldView && "function" === typeof oldView.viewWillDisappear)
        oldView.viewDidDisappear();
        
      if (oldView !== null)
        navigationController._removeView(oldView);
    });
    return (view);
  },
  
  _removeView : function(oldView)
  {
    //remove the oldView
    if (oldView !== null)
    {
      oldView.navigationController = null;
      if (oldView.tabController)
        oldView.tabController = null;
      this.views.remove(oldView);
    }
  },
  
  popView : function()
  {
    // no view to pop
    if (this._views.length < 2)
      return;
      
    var oldView = this._views.pop();
    var currentView = this._views[this._views.length - 1];
    
    // ensure that the view below won't be display above the view we want to remove
    oldView.setStyle("z-index", "10");
    currentView.setStyle("z-index", "1");
    
    if (isset(currentView.title))
      this.navigationBar.titleLabel.text = currentView.title;
    
    if (this._views.length  == 1)
      this.navigationBar.navBackbutton.hide();
    
    currentView.navigationController = this;
    if (this.tabController)
      currentView.tabController = this.tabController;
    
    if ("function" === typeof currentView.viewWillAppear)
      currentView.viewWillAppear();
    
    this.views.add(currentView);
    this._currentView = currentView;

    if (oldView && "function" === typeof oldView.viewWillDisappear)
      oldView.viewWillDisappear();
    
    var x = this.views.size[0];
    var y = 0;
    var popViewAnimation = new vs.fx.TranslateAnimation(x, y, 0);
    var navigationController = this;    
    popViewAnimation.process(oldView, function()
    {
      if ("function" === typeof currentView.viewDidAppear)
        currentView.viewDidAppear();
      if (oldView && "function" === typeof oldView.viewWillDisappear)
        oldView.viewDidDisappear();
        
      currentView.setStyle("z-index", "auto");
      navigationController._removeView(oldView);
    });
    
  },
  
  popViewsToViewAtIndex : function(viewIndex)
  {
    // no view to pop
    if (this._views.length < 2)
      return;
    
    var oldView = this._currentView;    
    var currentView = this._views[viewIndex];
    
    // ensure that the view below won't be display above the view we want to remove
    oldView.setStyle("z-index", "10");
    currentView.setStyle("z-index", "1");
        
    if (isset(currentView.title))
      this.navigationBar.titleLabel.text = currentView.title;
    if (viewIndex < 1)
      this.navigationBar.navBackbutton.hide();
    
    currentView.navigationController = this;
    if (this.tabController)
      currentView.tabController = this.tabController;
    
    if ("function" === typeof currentView.viewWillAppear)
      currentView.viewWillAppear();

    this.views.add(currentView);
    this._currentView = currentView;
    
    if (oldView && "function" === typeof oldView.viewWillDisappear)
      oldView.viewWillDisappear();
    
    var x = this.views.size[0];
    var y = 0;
    var popViewAnimation = new vs.fx.TranslateAnimation(x, y, 0);
    var navigationController = this;
    popViewAnimation.process(oldView, function()
    {
      if ("function" === typeof currentView.viewDidAppear)
        currentView.viewDidAppear();
      if (oldView && "function" === typeof oldView.viewWillDisappear)
        oldView.viewDidDisappear();
        
      currentView.setStyle("z-index", "auto");
      while(navigationController._views.length > (viewIndex + 1))
      {
        navigationController._removeView(oldView);
        oldView = navigationController._views.pop();
      }
    });
  },
  
  popViewsToRootView : function()
  {
    // no view to pop
    if (this._views.length < 2)
      return;
      
    var oldView = this._views.pop();
    var currentView = this._views[0];
    
    // ensure that the view below won't be display above the view we want to remove
    oldView.setStyle("z-index", "10");
    currentView.setStyle("z-index", "1");
        
    if (isset(currentView.title))
      this.navigationBar.titleLabel.text = currentView.title;
    this.navigationBar.navBackbutton.hide();
    
    currentView.navigationController = this;
    if (this.tabController)
      currentView.tabController = this.tabController;
    
    if ("function" === typeof currentView.viewWillAppear)
      currentView.viewWillAppear();

    this.views.add(currentView);
    this._currentView = currentView;
    
    if (oldView && "function" === typeof oldView.viewWillDisappear)
      oldView.viewWillDisappear();
    
    var x = this.views.size[0];
    var y = 0;
    var popViewAnimation = new vs.fx.TranslateAnimation(x, y, 0);
    var navigationController = this;
    popViewAnimation.process(oldView, function()
    {
      if ("function" === typeof currentView.viewDidAppear)
        currentView.viewDidAppear();
      if (oldView && "function" === typeof oldView.viewWillDisappear)
        oldView.viewDidDisappear();
      
      currentView.setStyle("z-index", "auto");
      navigationController._removeView(oldView);
      while(navigationController._views.length > 1)
      {
        oldView = navigationController._views.pop();        
        navigationController._removeView(oldView);
      }
    });
  },
  
  containsView : function(view)
  {
    for (var i = 0; i < this._views.length; i++)
    {
      if (view == this._views[i])
        return (true);
    }
    return (false);
  },
  
  getViewIndex : function(view)
  {
    for (var i = 0; i < this._views.length; i++)
    {
      if (view == this._views[i])
        return (i);
    }
    return (-1);
  },
  
  notify : function (event) 
  {
  },
  
  setNavigationBarVisibility : function(bShow, bAnimated)
  {
    if (bShow)
    {
      this._showNavigationBar(bAnimated);
    }
    else
    {
      this._hideNavigationBar(bAnimated);
    }
  },
  
  _showNavigationBar : function(bAnimated)
  {
    if (this._navigationBarIsVisible === true)
      return;
  
    var navigationBarHeight = this.navigationBar.size[1];
    var y = navigationBarHeight - 54;

    var showAnimation = new vs.fx.TranslateAnimation(0, 0, 0);
    var topAnimation = new vs.fx.Animation(["top", navigationBarHeight + "px"]);
    
    /*
    var height;
    if (this.tabController && this.tabController._tabBarIsVisible)
      height = 362;
    else
      height = 416;
    var heightAnimation = new vs.fx.Animation(["height",  height + "px"]);
    */
    
    if (bAnimated)
    {
      // set a duration if needed
    }
    else
    {
      showAnimation.duration = "0s";
      topAnimation.duration = "0s";
      //heightAnimation.duration = "0s";
    }
    
    var navigationController = this;
    //topAnimation.process(this.views);
    //heightAnimation.process(this.views);
    showAnimation.process(this.navigationBar, function()
    {
      navigationController._navigationBarIsVisible = true;
    });
  },
  
  _hideNavigationBar : function(bAnimated)
  {
    if (this._navigationBarIsVisible === false)
      return;
    
    var navigationBarHeight = this.navigationBar.size[1];
    var y = navigationBarHeight;
    
    var hideAnimation = new vs.fx.TranslateAnimation(0, -navigationBarHeight, 0);
    var topAnimation = new vs.fx.Animation(["top", 0 + "px"]);
    
    /*
    var height;
    if (this.tabController && this.tabController._tabBarIsVisible)
      height = 416;
    else
      height = 460;
      
    var heightAnimation = new vs.fx.Animation(["height",  height + "px"]);
    */    
    if (bAnimated)
    {
      // set a duration if needed
    }
    else
    {
      hideAnimation.duration = "0s";
      topAnimation.duration = "0s";
      //heightAnimation.duration = "0s";
    }
    
    var navigationController = this;
    //topAnimation.process(this.views);
    //heightAnimation.process(this.views);
    hideAnimation.process(this.navigationBar, function()
    {
      navigationController._navigationBarIsVisible = false;
    });
  },
  
  viewWillAppear : function()
  {
    if (this._currentView &&
        "function" === typeof this._currentView.viewWillAppear)
      this._currentView.viewWillAppear();
  },
  
  viewWillDisappear : function()
  {
    if (this._currentView &&
        "function" === typeof this._currentView.viewWillDisappear)
      this._currentView.viewWillDisappear();
  },
  
  back : function()
  {
    if (this._views.length > 1)
    {
      this.popView();
    	return (true);
    }
  	return (false);
  },
  
  onPause : function()
  {
  	if (isFunction(this._currentView.onPause))
  		this._currentView.onPause();
  },
  
  onResume : function()
  {
  	if (isFunction(this._currentView.onResume))
  		this._currentView.onResume();
  }

});

NavigationController.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  this.navigationBar = new vs.ui.NavigationBar ({"node_ref":this.id + "#id_2"});
  
  this.navigationBar.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_3",
      type: "nav_back",
      style: "blue_ios_style",
      text: "Retour"
    };
    this.navBackbutton = new vs.ui.Button (config);
    config = {
      node_ref: this.id + "#id_4",
      text: "Title"
    };
    this.titleLabel = new vs.ui.TextLabel (config);
    this.navBackbutton.init ();
    this.add (this.navBackbutton, 'children');
    this.titleLabel.init ();
    this.add (this.titleLabel, 'children');
  }
  
  this.navigationBar.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_5",
    layout: "absolute_layout"
  };
  this.views = new vs.ui.View (config);
  
  this.views.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.navigationBar.init ();
  this.add (this.navigationBar, 'children');
  this.views.init ();
  this.add (this.views, 'children');
  var default_values;
};


var ContactView = vs.core.createClass ({

  parent : vs.ui.View,
  
  title:  "Contact",
/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/
  _contentInformation:null,

  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.messageView
    //this.loadInformation();

  },
  
  openMailer : function()
  {  
    //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/Contact');    
    // TODO : verifier que les valeurs ne soient pas vide!!!
    
    //plugins.email_composer.showWithCB (cbkMailSent, subject, body, to, cc, bcc, (boolean) html content, (object Array) attachements);
    var subject = this.messageView.subjectField.value;
    var body = this.messageView.message.value;
    body += "\n\n" + this.messageView.nameField.value + ".";
    var cbkMailSent = function()
    {
      window.console.log("Mail sent!");
//      window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackEvent('Contact', 'ShareMail', subject);
    };
    plugins.email_composer.showWithCB (cbkMailSent, subject, body, "contact@talentstore.fr", "", "", false, null);
    
  },

  notify : function (event) 
  {
  if(event.src == this.iconInfo) {
    console.log("TOP INFO");
    var informationView = this.createAndAddComponent("InformationView", 
                                              {
                                                position: [this.size[0], 0], 
                                                title: "Informations",
                                              });
    this.navigationController.pushView(informationView);
    }
  else if (event.src == this.InfoView.numTel) {
        console.log("--> TOP NUMTEL"); 
        window.open('tel:+33148045231');
        console.log("TOP NUMTEL -->"); 
    }
  }

});

ContactView.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_7",
    layout: "absolute_layout"
  };
  this.messageView = new vs.ui.View (config);
  
  this.messageView.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_8",
      type: "text",
      value: "",
      placeholder: ""
    };
    this.nameField = new vs.ui.InputField (config);
    config = {
      node_ref: this.id + "#id_9",
      type: "text",
      placeholder: ""
    };
    this.emailField = new vs.ui.InputField (config);
    config = {
      node_ref: this.id + "#id_11",
      type: "text",
      placeholder: ""
    };
    this.subjectField = new vs.ui.InputField (config);
    config = {
      node_ref: this.id + "#id_10",
      cols: "40",
      rows: "15"
    };
    this.message = new vs.ui.TextArea (config);
    config = {
      node_ref: this.id + "#id_12",
      text: "Nom :"
    };
    this.nameLabel = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_13",
      text: "Email :"
    };
    this.emailLabel = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_14",
      text: "Sujet :"
    };
    this.subjectLabel = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_15",
      type: "default",
      style: "white",
      text: "Envoyer"
    };
    this.sendbButton = new vs.ui.Button (config);
    config = {
      node_ref: this.id + "#id_16",
      text: "Message : "
    };
    this.messagelabel = new vs.ui.TextLabel (config);
    this.nameField.init ();
    this.add (this.nameField, 'children');
    this.emailField.init ();
    this.add (this.emailField, 'children');
    this.subjectField.init ();
    this.add (this.subjectField, 'children');
    this.message.init ();
    this.add (this.message, 'children');
    this.nameLabel.init ();
    this.add (this.nameLabel, 'children');
    this.emailLabel.init ();
    this.add (this.emailLabel, 'children');
    this.subjectLabel.init ();
    this.add (this.subjectLabel, 'children');
    this.sendbButton.init ();
    this.add (this.sendbButton, 'children');
    this.messagelabel.init ();
    this.add (this.messagelabel, 'children');
  }
  
  this.messageView.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  config = {
    node_ref: this.id + "#id_17",
    layout: "absolute_layout"
  };
  this.InfoView = new vs.ui.View (config);
  
  this.InfoView.vsdInit = function () {
    var default_values;
    config = {
      node_ref: this.id + "#id_18",
      text: "Tel : 01 48 04 52 31 "
    };
    this.numTel = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_19",
      text: "Talent Store"
    };
    this.textlabel = new vs.ui.TextLabel (config);
    config = {
      node_ref: this.id + "#id_20",
      text: "8-10 rue de Normandie 75 003 Paris"
    };
    this.textlabel1 = new vs.ui.TextLabel (config);
    this.numTel.init ();
    this.add (this.numTel, 'children');
    this.textlabel.init ();
    this.add (this.textlabel, 'children');
    this.textlabel1.init ();
    this.add (this.textlabel1, 'children');
  }
  
  this.InfoView.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.iconInfo = new vs.ui.ImageView ({"node_ref":this.id + "#id_21"});
  
  this.iconInfo.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.messageView.init ();
  this.add (this.messageView, 'children');
  this.InfoView.init ();
  this.add (this.InfoView, 'children');
  this.iconInfo.init ();
  this.add (this.iconInfo, 'children');
  this.messageView.sendbButton.bind ('select', this, 'openMailer');
  this.iconInfo.bind ('POINTER_END', this, 'notify');
  this.InfoView.numTel.bind ('POINTER_END', this, 'notify');
  var default_values;
};


var videos = [];


var VideoListView = vs.core.createClass ({

  parent : vs.ui.View,
  title : "Cvisuels",
  prev : "",
  next : "",

/*
  initComponent: function () {
    this._super ();
    // This code is called during the initialization process.
    // Add your initialization code here.
  },
*/
  componentDidInitialize: function () 
  {
    // This code is called when the initialization process is finished.
    // Add your additional configuration code here.
    
    this.loadVideoFeed("https://gdata.youtube.com/feeds/api/playlists/FE84F3C57AC8F94D?v=2");
  },

  videoItemHasBeenSelected : function(event)
  {
  
  
    var videoListItem = event.data.item;

    if(videoListItem.videoId !== ""){
      // code pour IOS
      if(deviceConfiguration.os !== vs.core.DeviceConfiguration.OS_ANDROID) {
        console.log("videoItem + " + videoListItem.title);
        var cvisuelView = this.createAndAddComponent("VideoView", 
                                          {
                                            position: [this.size[0], 0], 
                                            videoTitle: videoListItem.title,
                                            videoId: videoListItem.videoId,
                                            thumbnailURL: videoListItem.thumbnailURL
                                          });
        this.navigationController.pushView(cvisuelView);
        }
      else {
        // code pour Android
        var url ="http://www.youtube.com/v/"+ videoListItem.videoId+"?version=3&amp;hl=en_US&amp;rel=0";
        window.open(url);
        }
      }
      
    else{
      console.log("next + " + this.next);
      this.loadVideoFeed(this.next);
      }
  //    window.plugins.googleAnalyticsPlugin && window.plugins.googleAnalyticsPlugin.trackPageview('/VideoListView/VideoView/'+videoListItem.title );
  },

  loadVideoFeed : function(feedURL)
  {
    //var feedURL = "https://gdata.youtube.com/feeds/api/playlists/FE84F3C57AC8F94D?v=2";
    var xhr = new XMLHttpRequest();
    var videoListView = this;
    xhr.onreadystatechange = function()
    {
      if (xhr.readyState == 4)
      {
        var feed = xhr.responseXML;
        var entries = feed.getElementsByTagName("entry");
//        videoListView.videoListLoadSuccess(entries);
        videoListView.videoListLoadSuccess(feed);
        videoListView.imageWait.hide();
      }
    };
    xhr.open("GET", feedURL, true);
    xhr.send();
  },

  
  /**
   * 
   */
//  videoListLoadSuccess : function(videoEntries)
  videoListLoadSuccess : function(feed)
  {
  
    var videoEntries = feed.getElementsByTagName("entry");
    // no videos
    if (videoEntries === null)
    {
      this.videoListLoadFailure();
      return;
    }
    
    //var videos = [];
    var link = [];
    this.prev = "";
    this.next = "";
    link         = feed.getElementsByTagName("link");
    for (var j=0; j<link.length; j++) {
      if(link[j].getAttribute("rel").indexOf("next") != -1)     
        this.next = link[j].getAttribute("href");
      if(link[j].getAttribute("rel").indexOf("previous") != -1) 
        this.prev = link[j].getAttribute("href");
      }


    for (var i = 0; i < videoEntries.length; i++)
    {
      var entry = videoEntries[i];
      var title = entry.getElementsByTagName("title")[0].textContent;
      
      if(title.indexOf("Cvisuel") != -1) {
        var mediaGroup  = entry.getElementsByTagName("group")[0];
        var videoId      = mediaGroup.getElementsByTagName("videoid")[0].textContent;
        var thumbnailURL = mediaGroup.getElementsByTagName("thumbnail")[0].getAttribute("url");
        
        videos.push({videoTitle : title, videoId: videoId, thumbnailURL: thumbnailURL});        
      }
      
    }
    
    if(this.next !== "") this.loadVideoFeed(this.next);
    
    this.videoList.setItemTemplateName("VideoListItem");
    //this.videoList.data = [];
    this.videoList.data = videos;
    var videoList = this.videoList;
    // refresh after 1 second
    window.setTimeout(function(){videoList.refresh();}, 2000);
  },
  
  videoListLoadFailure : function()
  {
    
  },

  notify : function (event) 
  {
  }

});

VideoListView.prototype.vsdInit = function () {
  var config, orientation = Application.getOrientation ();

  config = {
    node_ref: this.id + "#id_51",
    type: "DefaultList",
    model: [{"title":"one"},{"title":"two"},{"title":"tree","label":"two"}],
    hasArrow: true,
    scroll: true
  };
  this.videoList = new vs.ui.List (config);
  
  this.videoList.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.imageWait = new vs.ui.ImageView ({"node_ref":this.id + "#id_52"});
  
  this.imageWait.c_propagate = function () {
    if (this.propertiesDidChange) this.propertiesDidChange ();
  }

  this.videoList.init ();
  this.add (this.videoList, 'children');
  this.imageWait.init ();
  this.add (this.imageWait, 'children');
  this.videoList.bind ('itemselect', this, 'videoItemHasBeenSelected');
  var default_values;
};

