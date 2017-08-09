






		var serviceURL = "http://www.hackmans.com/api_search?jsoncallback=?&keywords=";
		var productDetailURL = 'http://www.hackmans.com/api_search?jsoncallback=?&productid=';
		var products;
		var price;
		var sale;
		var priceline;
		var regPrice;
		var discount_percent;
		var productid;
		var ebookTransfer = false;
		
		$(document).bind('pageinit',function(){
			$('#btnBluefire').click(function(){
				var req;
				if(window.XMLHttpRequest)
				{
					req = new XMLHttpRequest;
				} else {
					req = new ActiveXObject("Microsoft.XMLHTTP");
				}
				req.onreadystatechange=function(){
					alert(req.status + " " + req.statusText);
				}
				req.open("GET","http://127.0.0.1",true);
				req.send();
			});
			$('#btnSearch').click(function(){
				$('#productList li').remove();
				$.getJSON(serviceURL + $('#inputSearch').val(),function(data){
					$('#productList li').remove();
					products = data.products;
					if(products.length>0){
						$.each(products,function(index,product){
							
							sale = parseFloat(product.SalePrice);
							price = parseFloat(product.ProductPrice);
							regPrice = false;
							
							if(sale > 0 && sale < price){
								discount_percent = (1-(sale/price))*100;
								discount_percent = discount_percent.toFixed(2);
								priceline = '$' + sale.toFixed(2) + ' | ' + discount_percent + '% Off';
								regPrice = ' (Reg. $' + price.toFixed(2) + ')';
							} else {
								priceline = '$' + price.toFixed(2);	
							}
							
							$('#productList').append('<li><a href="javascript:getID(' + product.productid + ')"><h5 class="name">' + product.ProductName + '</h5><br/>' + (product.ProductName1 != null?product.ProductName1:'') + (product.ProductName2 != null?" | " + product.ProductName2:'') + '<br/><br/><span class="priceline">' + priceline + '</span>' + (regPrice != null && regPrice != false?" " + regPrice:'') + '</a></li>');
						});
					} else {
						$('#productList').append('<li><h5 class="name">No results found</h5></li>');	
					}
					$('#productList').listview('refresh');
				});
				$.mobile.changePage('#results',{transition: "slideup"});
			});
			
			
			$('#home').bind('pageshow',function(){
				products = false;
				price = false;
				sale = false;
				priceline = false;
				regPrice = false;
				discount_percent = false;
				$('#btnPMU').hide();
				if(ebookTransfer){
					ebookTransfer = false;
					$.mobile.changePage('#ebooks',{transition:"slideup"});	
				}
			});
			$('#detail').bind('pageshow',function(){
				
			});
			$('#btnDirections').click(function(){
				navigator.geolocation.getCurrentPosition(function(pos){
					var lat = pos.coords.latitude;
					var long = pos.coords.longitude;
				});
				var dirApi = new google.maps.DirectionsService();
				dirReq = {};
				dirReq.destination = new google.maps.LatLng('34.924408','-81.977888');
				dirReq.origin = new google.maps.LatLng(lat,long);
				dirReq.travelMode = google.maps.DirectionsTravelMode.DRIVING;
				dirApi.route(dirReq,function(dirResult,dirStatus){
					if(dirStatus != google.maps.DirectionsStatus.OK){
						alert("Driving API error: " + dirStatus);	
					}
					var steps = dirResult.routes[0].legs[0].steps;
					var copy = dirResult.routes[0].copyrights;
					console.dir(steps);
					var niceSteps = [];
					for(var i = 0; i < steps.length; i++){
						step = {};
						step.text = steps[i].instructions;
						step.distance = steps[i].distance.text;
						step.duration = steps[i].duration.text;
						step.endlat = steps[i].end_location.lat();
						step.endlong = steps[i].end_location.lng();
						niceSteps[niceSteps.length] = step;	
					}
					$.each(niceSteps,function(index,step)
					{
						alert(step.text);	
					});
				});
			});
			$('#btnSubmitPMU').click(function(){
				var formData = $('#pmuForm').serialize();
				formData = formData.replace("product_id=what","product_id="+productid);
				var url = "http://www.hackmans.com/product/" + productid + "/pickmeup/1";
				$.ajax({
					 type: "POST",
					 url:   url,
					 cache: false,
					 data: formData,
					 success: false
				});
				//$('.ui-dialog').dialog('close');
				
				$('#pmuInitial').hide();
				$('#pmuResponse').show();
			});
			$('#btnScan').click(function(){
				window.plugins.barcodeScanner.scan( function(result) {
						$('#productList li').remove();
						$.getJSON(serviceURL + result.text,function(data){
							$('#productList li').remove();
							products = data.products;
							if(products.length>0){
								$.each(products,function(index,product){
									
									sale = parseFloat(product.SalePrice);
									price = parseFloat(product.ProductPrice);
									regPrice = false;
									
									if(sale > 0 && sale < price){
										discount_percent = (1-(sale/price))*100;
										discount_percent = discount_percent.toFixed(2);
										priceline = '$' + sale.toFixed(2) + ' | ' + discount_percent + '% Off';
										regPrice = ' (Reg. $' + price.toFixed(2) + ')';
									} else {
										priceline = '$' + price.toFixed(2);	
									}
									
									$('#productList').append('<li><a href="javascript:getID(' + product.productid + ')"><h5 class="name">' + product.ProductName + '</h5><br/>' + (product.ProductName1 != null?product.ProductName1:'') + (product.ProductName2 != null?" | " + product.ProductName2:'') + '<br/><br/><span class="priceline">' + priceline + '</span>' + (regPrice != null && regPrice != false?" " + regPrice:'') + '</a></li>');
								});
							} else {
								$('#productList').append('<li><h5 class="name">No results found</h5></li>');	
							}
							$('#productList').listview('refresh');
						});
						$.mobile.changePage('#results',{transition: "slideup"});
				    }, function(error) {
				        alert("Scanning failed: " + error);
				    }
				);
			});
			$('#btnLogin').click(function(){
				var formData = $('#loginForm').serialize();
				var url = "http://www.hackmans.com/api_search/login?jsoncallback=?&";
				$.getJSON(url + formData,function(data){
					if(data.ebooks){
						$('#ebookList li').remove();
						ebooks = data.ebooks;
						$.each(ebooks,function(key,ebook){
							var downloadLink = ebook.downloadLink;
							var acsmLink = ebook.acsmLink;
							var ProductName = ebook.ProductName;
							var ProductName1 = ebook.ProductName1;
							$('#ebookList').append('<li><a href="' + (acsmLink != null?'bluefirereader://fulfill/' + acsmLink:downloadLink) + '"><h5 class="name">' + ProductName + '</h5><br/>' + (ProductName1 != null?ProductName1:'') + '</a></li>');
						});		
					} else {
						$('#ebookList li').remove();
						$('#ebookList').append('<li><h5 class="name">' + data.error + '</h5><br/></li>');
					}
					$('#ebookList').listview('refresh');
				});
				$('.ui-dialog').dialog('close');
				ebookTransfer = true;
			});
		});
		
		function getID(id){
			productid = id;
			$.getJSON(productDetailURL + id,function(data){
				products = data.products;
				$.each(products,function(index,item){
					name = item.ProductName;
					$('#productName').text(name);
					
					name1 = item.ProductName1;
					$('#productname1').text(name1);
					
					name2 = item.ProductName2;
					if(name2 != null){
						$('#productname2').text(name2);
					} else {
						$('#productname2').text('');	
					}
					
					/*sku = item.ProductSKU;
					$('#sku').text(sku);
					
					manufacturersnumber = item.ProductVendorID;
					$('#manufacturersnumber').text(manufacturersnumber);*/
					
					ean = item.ProductEAN;
					if(ean != null){
						$('#ean').text("EAN: " + ean);
					} else {
						$('#ean').text('');	
					}
					
					upc = item.ProductUPCCode;
					if(upc != null){
						$('#upc').text("UPC: " + upc);
					} else {
						$('#upc').text('');	
					}
					
					isbn = item.ProductISBN;
					if(isbn != null){
						$('#isbn').text("ISBN: " + isbn);
					} else {
						$('#isbn').text('');	
					}
					
					retailprice = parseFloat(item.ProductPrice);
					$('#retailprice').text("$" + retailprice);
					
					saleprice = parseFloat(item.SalePrice);
					savings = parseInt(item.Savings);
					if(saleprice > 0){
						$('#saleprice').text("Sale Price: $" + saleprice);
						$('#savings').text("Savings of " + savings +"%");
					} else {
						$('#saleprice').text('');
						$('#savings').text('');
					}
					
					onhandqty = parseInt(item.ProductStock);
					$('#onhand').text(onhandqty);
					
					remoteqty = parseInt(item.ProductWHStock);
					$('#remote').text(remoteqty);
					
					description = item.ProductLongDesc;
					$('#productDescription').text(description);
					
					image = item.ProductWidgetImage;
					if(image == null){
						image = 'ina.jpg';
					}
					$('#productImg').attr("src","http://www.hackmans.com/imagesupload/widget/" + image);
					$('#btnLink').attr("href","http://www.hackmans.com/product/" + id);
					$('#btnPMUbtn').attr("href","file:///android_asset/www/pmu.html");
					
					if(onhandqty > 0){
						$('#btnPMU').show();
					} else {
						$('#btnPMU').hide();	
					}
				});
			});
			$.mobile.changePage('#detail',{transition: "slideup"});
			return false;
		}
	

