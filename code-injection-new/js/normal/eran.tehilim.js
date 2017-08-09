
	/************************************************************************************************************/	
	var dhtmlgoodies_tooltip = false;
	var dhtmlgoodies_tooltipShadow = false;
	var dhtmlgoodies_shadowSize = 4;
	var dhtmlgoodies_tooltipMaxWidth = 400;
	var dhtmlgoodies_tooltipMinWidth = 100;
	var dhtmlgoodies_iframe = false;
	var tooltip_is_msie = (navigator.userAgent.indexOf('MSIE')>=0 && navigator.userAgent.indexOf('opera')==-1 && document.all)?true:false;
	function showTooltip(e,tooltipTxt)
	{
		
		var bodyWidth = Math.max(document.body.clientWidth,document.documentElement.clientWidth) - 20;
	
		if(!dhtmlgoodies_tooltip){
			dhtmlgoodies_tooltip = document.createElement('DIV');
			dhtmlgoodies_tooltip.id = 'dhtmlgoodies_tooltip';
			dhtmlgoodies_tooltipShadow = document.createElement('DIV');
			dhtmlgoodies_tooltipShadow.id = 'dhtmlgoodies_tooltipShadow';
			
			document.body.appendChild(dhtmlgoodies_tooltip);
			document.body.appendChild(dhtmlgoodies_tooltipShadow);	
			
			if(tooltip_is_msie){
				dhtmlgoodies_iframe = document.createElement('IFRAME');
				dhtmlgoodies_iframe.frameborder='5';
				dhtmlgoodies_iframe.style.backgroundColor='#FFFFFF';
				dhtmlgoodies_iframe.src = '#'; 	
				dhtmlgoodies_iframe.style.zIndex = 100;
				dhtmlgoodies_iframe.style.position = 'absolute';
				document.body.appendChild(dhtmlgoodies_iframe);
			}
			
		}
		
		dhtmlgoodies_tooltip.style.display='block';
		dhtmlgoodies_tooltipShadow.style.display='block';
		if(tooltip_is_msie)dhtmlgoodies_iframe.style.display='block';
		
		var st = Math.max(document.body.scrollTop,document.documentElement.scrollTop);
		if(navigator.userAgent.toLowerCase().indexOf('safari')>=0)st=0; 
		var leftPos = e.clientX + 10;
		
		dhtmlgoodies_tooltip.style.width = null;	// Reset style width if it's set 
		


		dhtmlgoodies_tooltip.innerHTML = tooltipTxt;
		
		
		dhtmlgoodies_tooltip.style.left = leftPos + 'px';
		dhtmlgoodies_tooltip.style.top = e.clientY + 10 + st + 'px';

		
		dhtmlgoodies_tooltipShadow.style.left =  leftPos + dhtmlgoodies_shadowSize + 'px';
		dhtmlgoodies_tooltipShadow.style.top = e.clientY + 10 + st + dhtmlgoodies_shadowSize + 'px';
		
		if(dhtmlgoodies_tooltip.offsetWidth>dhtmlgoodies_tooltipMaxWidth){	/* Exceeding max width of tooltip ? */
			dhtmlgoodies_tooltip.style.width = dhtmlgoodies_tooltipMaxWidth + 'px';
		}
		
		var tooltipWidth = dhtmlgoodies_tooltip.offsetWidth;		
		if(tooltipWidth<dhtmlgoodies_tooltipMinWidth)tooltipWidth = dhtmlgoodies_tooltipMinWidth;
		
		
		dhtmlgoodies_tooltip.style.width = tooltipWidth + 'px';
		dhtmlgoodies_tooltipShadow.style.width = dhtmlgoodies_tooltip.offsetWidth + 'px';
		dhtmlgoodies_tooltipShadow.style.height = dhtmlgoodies_tooltip.offsetHeight + 'px';		
		
		if((leftPos + tooltipWidth)>bodyWidth){
			dhtmlgoodies_tooltip.style.left = (dhtmlgoodies_tooltipShadow.style.left.replace('px','') - ((leftPos + tooltipWidth)-bodyWidth)) + 'px';
			dhtmlgoodies_tooltipShadow.style.left = (dhtmlgoodies_tooltipShadow.style.left.replace('px','') - ((leftPos + tooltipWidth)-bodyWidth) + dhtmlgoodies_shadowSize) + 'px';
		}
		
		if(tooltip_is_msie){
			dhtmlgoodies_iframe.style.left = dhtmlgoodies_tooltip.style.left;
			dhtmlgoodies_iframe.style.top = dhtmlgoodies_tooltip.style.top;
			dhtmlgoodies_iframe.style.width = dhtmlgoodies_tooltip.offsetWidth + 'px';
			dhtmlgoodies_iframe.style.height = dhtmlgoodies_tooltip.offsetHeight + 'px';
		
		}
				
	}
	
	function hideTooltip()
	{
		dhtmlgoodies_tooltip.style.display='none';
		dhtmlgoodies_tooltipShadow.style.display='none';		
		if(tooltip_is_msie)dhtmlgoodies_iframe.style.display='none';		
	}

/** 
 * A plugin to enable iOS In-App Purchases.
 *
 * Copyright (c) Matt Kane 2011
 */

var InAppPurchaseManager = function() { 
	PhoneGap.exec('InAppPurchaseManager.setup');
}

/**
 * Makes an in-app purchase. 
 * 
 * @param {String} productId The product identifier. e.g. "com.example.MyApp.myproduct"
 * @param {int} quantity 
 */

InAppPurchaseManager.prototype.makePurchase = function(productId, quantity) {
	var q = parseInt(quantity);
	if(!q) {
		q = 1;
	}
    return PhoneGap.exec('InAppPurchaseManager.makePurchase', productId, q);		
}

/**
 * Asks the payment queue to restore previously completed purchases.
 * The restored transactions are passed to the onRestored callback, so make sure you define a handler for that first.
 * 
 */

InAppPurchaseManager.prototype.restoreCompletedTransactions = function() {
    return PhoneGap.exec('InAppPurchaseManager.restoreCompletedTransactions');		
}


/**
 * Retrieves the localised product data, including price (as a localised string), name, description.
 * You must call this before attempting to make a purchase.
 *
 * @param {String} productId The product identifier. e.g. "com.example.MyApp.myproduct"
 * @param {Function} successCallback Called once for each returned product id. Signature is function(productId, title, description, price)
 * @param {Function} failCallback Called once for each invalid product id. Signature is function(productId)
 */

InAppPurchaseManager.prototype.requestProductData = function(productId, successCallback, failCallback) {
	var key = 'f' + this.callbackIdx++;
	window.plugins.inAppPurchaseManager.callbackMap[key] = {
		success: function(productId, title, description, price ) {
			if (productId == '__DONE') {
				delete window.plugins.inAppPurchaseManager.callbackMap[key]
				return;
			}
			successCallback(productId, title, description, price);
		},
		fail: failCallback
	}
	var callback = 'window.plugins.inAppPurchaseManager.callbackMap.' + key;
    PhoneGap.exec('InAppPurchaseManager.requestProductData', productId, callback + '.success', callback + '.fail');	
}

/**
 * Retrieves localised product data, including price (as localised
 * string), name, description of multiple products.
 *
 * @param {Array} productIds
 *   An array of product identifier strings.
 *
 * @param {Function} callback
 *   Called once with the result of the products request. Signature:
 *
 *     function(validProducts, invalidProductIds)
 *
 *   where validProducts receives an array of objects of the form
 *
 *     {
 *      id: "<productId>",
 *      title: "<localised title>",
 *      description: "<localised escription>",
 *      price: "<localised price>"
 *     }
 *
 *  and invalidProductIds receives an array of product identifier
 *  strings which were rejected by the app store.
 */
InAppPurchaseManager.prototype.requestProductsData = function(productIds, callback) {
	var key = 'b' + this.callbackIdx++;
	window.plugins.inAppPurchaseManager.callbackMap[key] = function(validProducts, invalidProductIds) {
		delete window.plugins.inAppPurchaseManager.callbackMap[key];
		callback(validProducts, invalidProductIds);
	};
	var callbackName = 'window.plugins.inAppPurchaseManager.callbackMap.' + key;
	PhoneGap.exec('InAppPurchaseManager.requestProductsData', callbackName, {productIds: productIds});
};

/* function(transactionIdentifier, productId, transactionReceipt) */
InAppPurchaseManager.prototype.onPurchased = null;

/* function(originalTransactionIdentifier, productId, originalTransactionReceipt) */
InAppPurchaseManager.prototype.onRestored = null;

/* function(errorCode, errorText) */
InAppPurchaseManager.prototype.onFailed = null;

/* function() */
InAppPurchaseManager.prototype.onRestoreCompletedTransactionsFinished = null;

/* function(errorCode) */
InAppPurchaseManager.prototype.onRestoreCompletedTransactionsFailed = null;

/* This is called from native.*/

InAppPurchaseManager.prototype.updatedTransactionCallback = function(state, errorCode, errorText, transactionIdentifier, productId, transactionReceipt) {
	switch(state) {
		case "PaymentTransactionStatePurchased":
			if(this.onPurchased) {
				this.onPurchased(transactionIdentifier, productId, transactionReceipt);
			} else {
				this.eventQueue.push(arguments);
				this.watchQueue();
			}
			return; 
			
		case "PaymentTransactionStateFailed":
			if(this.onFailed) {
				this.onFailed(errorCode, errorText);
			} else {
				this.eventQueue.push(arguments);
				this.watchQueue();
			}
			return;
		
		case "PaymentTransactionStateRestored":
			if(this.onRestored) {
				this.onRestored(transactionIdentifier, productId, transactionReceipt);
			} else {
				this.eventQueue.push(arguments);
				this.watchQueue();
			}
			return;
	}
};

InAppPurchaseManager.prototype.restoreCompletedTransactionsFinished = function() {
  if (this.onRestoreCompletedTransactionsFinished) {
    this.onRestoreCompletedTransactionsFinished();
  }
};

InAppPurchaseManager.prototype.restoreCompletedTransactionsFailed = function(errorCode) {
  if (this.onRestoreCompletedTransactionsFailed) {
    this.onRestoreCompletedTransactionsFailed(errorCode);
  }
};

/*
 * This queue stuff is here because we may be sent events before listeners have been registered. This is because if we have 
 * incomplete transactions when we quit, the app will try to run these when we resume. If we don't register to receive these
 * right away then they may be missed. As soon as a callback has been registered then it will be sent any events waiting
 * in the queue.
 */

InAppPurchaseManager.prototype.runQueue = function() {
	if(!this.eventQueue.length || (!this.onPurchased && !this.onFailed && !this.onRestored)) {
		return;
	}
	var args;
	/* We can't work directly on the queue, because we're pushing new elements onto it */
	var queue = this.eventQueue.slice();
	this.eventQueue = [];
	while(args = queue.shift()) {
		this.updatedTransactionCallback.apply(this, args);
	}
	if(!this.eventQueue.length) {	
		this.unWatchQueue();
	}
}

InAppPurchaseManager.prototype.watchQueue = function() {
	if(this.timer) {
		return;
	}
	this.timer = setInterval("window.plugins.inAppPurchaseManager.runQueue()", 10000);
}

InAppPurchaseManager.prototype.unWatchQueue = function() {
	if(this.timer) {
		clearInterval(this.timer);
		this.timer = null;
	}
}


InAppPurchaseManager.prototype.callbackMap = {};
InAppPurchaseManager.prototype.callbackIdx = 0;
InAppPurchaseManager.prototype.eventQueue = [];
InAppPurchaseManager.prototype.timer = null;

PhoneGap.addConstructor(function()  {
	if(!window.plugins) {
		window.plugins = {};
	}
	window.plugins.inAppPurchaseManager = InAppPurchaseManager.manager = new InAppPurchaseManager();
});





