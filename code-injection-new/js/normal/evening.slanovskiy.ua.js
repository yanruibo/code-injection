








		var arr=0;
		var currentPage;
		var options;
		var instance;
		var photoSwipeInstance;
		var target;

			(function(window, $, PhotoSwipe){
				$(document).ready(function(){

					$('div.gallery-page')
					.live('pageshow', function(e){
						target = e.target;
						currentPage = $(e.target), options = {}, instance = photoSwipeInstance = $("ul.gallery a", e.target).photoSwipe(options,  currentPage.attr('id'));
						
						//instance.show(0);
						//this.toggleToolbar();
						// onShow - store a reference to our "say hi" button
						
						instance.addEventHandler(PhotoSwipe.EventTypes.onShow, function(e){
							sayHiEl = window.document.querySelectorAll('.say-hi')[0];
							sayHiEl1 = window.document.querySelectorAll('.off')[0];
							sayHiEl2 = window.document.querySelectorAll('.on_toolbar')[0];
							sayHiEl3 = window.document.querySelectorAll('.off_fulscreen')[0];
							say_favorite = window.document.querySelectorAll('.favorite')[0];
						});
						
						// onToolbarTap - listen out for when the toolbar is tapped
						instance.addEventHandler(PhotoSwipe.EventTypes.onToolbarTap, function(e){
							if (e.toolbarAction === PhotoSwipe.Toolbar.ToolbarAction.none){
								switch (e.tapTarget){
									case say_favorite: 
										arr+=1;
										alert(Util.DOM.getAttribute(1, 'src'));	
										break;		
									case sayHiEl1:
										instance.toggleToolbar();
										setTimeout("document.getElementById('off_toolbar').style.display='block';document.getElementById('off_toolbar').style.opacity='0.8';", 50);
										break;
									case sayHiEl2:
										instance.onUILayerTouch("off_tap");
										setTimeout("document.getElementById('off_toolbar').style.display='none';document.getElementById('off_toolbar').style.opacity='0';", 50);
										break;			
									case sayHiEl3:
										instance.onUILayerTouch("off_tap");
										setTimeout("document.getElementById('off_toolbar').style.display='none';document.getElementById('off_toolbar').style.opacity='0';", 50);
										break;					
									case sayHiEl:

										instance.onUILayerTouch("tap");
										break;
								}		
							}
						});			
									
					return true;
								
					})
					
					.live('pagehide', function(e){
						currentPage = $(e.target), photoSwipeInstance = PhotoSwipe.getInstance(currentPage.attr('id'));
						if (typeof photoSwipeInstance != "undefined" && photoSwipeInstance != null) {
							PhotoSwipe.detatch(photoSwipeInstance);
						}
						return true;
						 
					});
				});
			}(window, window.jQuery, window.Code.PhotoSwipe));
	

		var count_test=0;
		var types = new Array(); 
		var src = new Array(); 
		var deleted = new Array();

		jQuery(document).ready(function() {
			
			$('.ui-link').live("click",function(){     // кнопка "добавить"
				if ($('#cart').length) $('.ps-caption').append('<div style="text-align: right; display:block; width: 100%; position: absolute; top: 0;"><div id="my_delete" style="top:13px; padding: 30px; cursor: pointer; position: relative; text-align:center"><span>Удалить / Восстановить</span></div></div>');
				else if ( !($('#my_favor').length) ) $('.ps-caption').append('<div style="text-align: right; display:block; width: 100%; position: absolute; top: 0;"><div id="my_favor" style="top:8px; padding: 30px; cursor: pointer; position: relative; text-align:center"><span class="add_to_list"><img src="images/ico/plus.png" alt="Добавить в избранное"/></span></div></div>');
			});

			$('.ui-link-inherit').live("click",function(){     // кнопка "добавить"
				if ($('#cart').length) $('.ps-caption').append('<div style="text-align: right; display:block; width: 100%; position: absolute; top: 0;"><div id="my_delete" style="top:13px; padding: 30px; cursor: pointer; position: relative; text-align:center"><span>Удалить / Восстановить</span></div></div>');
				else if ( !($('#my_favor').length) ) $('.ps-caption').append('<div style="text-align: right; display:block; width: 100%; position: absolute; top: 0;"><div id="my_favor" style="top:8px; padding: 30px; cursor: pointer; position: relative; text-align:center"><span class="add_to_list"><img src="images/ico/plus.png" alt="Добавить в избранное"/></span></div></div>');
			});




			$('#my_favor').live("click", function() {         // добавление товара

				// случай когда такой товар есть в корзине
				if (count_test>0){
					var src_temp = $('.ps-carousel-content').children('div').eq(1).children("img").attr('src');
					for (var i = 1; i <= count_test; i++) {
						if (src[i]==src_temp){
							$('body').append('<div id="add" style="opacity:0.7; display:block; position:absolute; background-color:white; color:black; border-radius: 4px; text-align:center; width:25%; z-index:9999; top:'+(parseInt($('.ps-caption').css('top'))+5)+'px; left:5px;">Ето платье уже добавлено</div>');
							setTimeout(function(){
									$('#add').fadeOut(500, function(){
										$('#add').remove();	
									});
								}, 3000);
							return false;
						}
					}
				}
				//------------------------------------
				
				// добавление товара
				count_test = count_test+1;
				types[count_test] = $('.ps-caption-content').html();
				src[count_test] = $('.ps-carousel-content').children('div').eq(1).children("img").attr('src');
				$('body').append('<div id="add" style="opacity:0.7; display:block; position:absolute; background-color:white; color:black; border-radius: 4px; text-align:center; width:25%; z-index:9999; top:'+(parseInt($('.ps-caption').css('top'))+5)+'px; left:5px;">Добавлено</div>');
				setTimeout(function(){
						$('#add').fadeOut(500, function(){
							$('#add').remove();	
						});
					}, 3000);

				return false;
				//---------------------
			});




			$('#my_delete').live("click", function() {  // удаление товара
				var nom_el = window.photoSwipeInstance.currentIndex;
				for (var i = 0; i<=deleted.length; i++) {
					if (deleted[i] == window.photoSwipeInstance.cache.images[nom_el].src) {
						deleted.splice(i,1);
						if ($('#del').length) $('#del').remove();
						$('body').append('<div id="del" style="opacity:0.7; display:block; position:absolute; background-color:white; color:black; border-radius: 4px; text-align:center; width:25%; z-index:9999; top:'+(parseInt($('.ps-caption').css('top'))+5)+'px; left:5px;">Восстановлен</div>');
						setTimeout(function(){
								$('#del').fadeOut(500, function(){
									$('#del').remove();	
								});
							}, 3000);
						return false;
					}
				};
				deleted.push(window.photoSwipeInstance.cache.images[nom_el].src);

				if ($('#del').length) $('#del').remove();
				$('body').append('<div id="del" style="opacity:0.7; display:block; position:absolute; background-color:white; color:black; border-radius: 4px; text-align:center; width:25%; z-index:9999; top:'+(parseInt($('.ps-caption').css('top'))+5)+'px; left:5px;">Добавлен на удаление</div>');
				setTimeout(function(){
						$('#del').fadeOut(500, function(){
							$('#del').remove();	
						});
					}, 3000);

				
				return false;
			});


		});
	









			jQuery(document).ready(function() {
				var res='';
				if (count_test>0){
					for (var i = 1; i <= count_test; i++) {
						res += '<li><a href="'+src[i]+'" rel="external"><img src="'+src[i]+'" id="foto_'+(i-1)+'" alt="'+types[i]+'" width="20%"/></a></li>';
					}
				} 
				else {	res += '<li><a href="" rel="external"><img src="" id="" alt="" width="20%"/></a></li>';	}
				$('#my_goods').html(res);
				
				$('#clear').unbind("vclick").bind("vclick", function() {
					if(confirm("Вы хотите удалить все выбраные товары ?")){
						count_test = 0;
						$('#my_goods').html('');
					}
				});
			});
		

$('#detailsPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	$.getJSON(serviceURL + 'getemployee.php?id='+id, displayEmployee);
});

function displayEmployee(data) {
	var employee = data.item;
	console.log(employee);
	$('#employeePic').attr('src', 'pics/' + employee.picture);
	$('#fullName').text(employee.firstName + ' ' + employee.lastName);
	$('#employeeTitle').text(employee.title);
	$('#city').text(employee.city);
	console.log(employee.officePhone);
	if (employee.managerId>0) {
		$('#actionList').append('<li><a href="employeedetails.html?id=' + employee.managerId + '"><h3>View Manager</h3>' +
				'<p>' + employee.managerFirstName + ' ' + employee.managerLastName + '</p></a></li>');
	}
	if (employee.reportCount>0) {
		$('#actionList').append('<li><a href="reportlist.html?id=' + employee.id + '"><h3>View Direct Reports</h3>' +
				'<p>' + employee.reportCount + '</p></a></li>');
	}
	if (employee.email) {
		$('#actionList').append('<li><a href="mailto:' + employee.email + '"><h3>Email</h3>' +
				'<p>' + employee.email + '</p></a></li>');
	}
	if (employee.officePhone) {
		$('#actionList').append('<li><a href="tel:' + employee.officePhone + '"><h3>Call Office</h3>' +
				'<p>' + employee.officePhone + '</p></a></li>');
	}
	if (employee.cellPhone) {
		$('#actionList').append('<li><a href="tel:' + employee.cellPhone + '"><h3>Call Cell</h3>' +
				'<p>' + employee.cellPhone + '</p></a></li>');
		$('#actionList').append('<li><a href="sms:' + employee.cellPhone + '"><h3>SMS</h3>' +
				'<p>' + employee.cellPhone + '</p></a></li>');
	}
	$('#actionList').listview('refresh');
	
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


$('#reportListPage').live('pageshow', function(event) {
	var id = getUrlVars()["id"];
	console.log("reports for " + id);
	$.getJSON(serviceURL + 'getreports.php?id='+id, function (data) {
		var reports = data.items;
		$.each(reports, function(index, employee) {
			$('#reportList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
					'<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
					'<p>' + employee.title + '</p>' +
					'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
		});
		$('#reportList').listview('refresh');
	});
});


var serviceURL = "http://afishka.cv.ua/services/";

var employees;

$('#employeeListPage').bind('pageinit', function(event) {
	getEmployeeList();
});

function getEmployeeList() {
	$.getJSON(serviceURL + 'getemployees.php', function(data) {
		$('#employeeList li').remove();
		employees = data.items;
		$.each(employees, function(index, employee) {
			$('#employeeList').append('<li><a href="employeedetails.html?id=' + employee.id + '">' +
					'<img src="pics/' + employee.picture + '"/>' +
					'<h4>' + employee.firstName + ' ' + employee.lastName + '</h4>' +
					'<p>' + employee.title + '</p>' +
					'<span class="ui-li-count">' + employee.reportCount + '</span></a></li>');
		});
		$('#employeeList').listview('refresh');
	});
}

function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}
