




			
        
        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value 
        
        var _c_step=1;
        var _c_img_index = -1;
        var _a_img_uris = new Array();
        _a_img_uris[0] = '';
        _a_img_uris[1] = '';
        _a_img_uris[2] = '';
        
		var _nb_pics2upload = 0;
        
//        var _a_img_datas = new Array();
//        _a_img_datas[0] = '';
//        _a_img_datas[1] = '';
//        _a_img_datas[2] = '';
        
        var _c_main_cat_label = '';
        var _c_sub_cat_label = '';
        
        // Wait for PhoneGap to connect with the device
        document.addEventListener("deviceready",onDeviceReady,false);
        
        // PhoneGap is ready to be used!
        function onDeviceReady() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
            navigator.geolocation.getCurrentPosition(onGeoLocSuccess, onGeoLocError);
            initInfos();
        }
        
        function saveForLater(key, value) {
        	localStorage.setItem("favoritesAds", a_favoritesAdsVal.toString());
        }
        
        function initInfos() {
        	//chargement des photos
        	for(var i=0;i<_a_img_uris.length;i++) {
        		var localStorage_index = 'sell_image'+i;
				var sell_image = localStorage.getItem(localStorage_index);
            	if(sell_image!=null && sell_image!='') {
            		_a_img_uris[i] = sell_image;
					document.getElementById('preview_img'+i).src = sell_image;
            	}
            }
        }
        
        // Called when a photo is successfully choosen from lib or taken with camera
        function onPhotoURISuccess(imageURI) {
            var largeImage = document.getElementById('preview_img'+_c_img_index);
            largeImage.src = imageURI;
            _a_img_uris[_c_img_index] = imageURI;
            var localStorage_index = 'sell_image'+_c_img_index;
            localStorage.setItem(localStorage_index, imageURI);
            hidePictureOptions();
        }
        
        // A button will call this function
        function capturePhoto() {
            // Take picture using device camera and retrieve image as base64-encoded string
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, targetWidth: 300, targetHeight: 450, destinationType: destinationType.FILE_URI});
        }
                
        // A button will call this function
        function getPhoto(source) {
            // Retrieve image file location from specified source
            navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, targetWidth: 300, targetHeight: 450, destinationType: destinationType.FILE_URI, sourceType: source });
        }
        
        // Called if something bad happens.
        function onFail(message) {
        	alert('Une erreur est survenue : '+message);
            hidePictureOptions();
        }

        
        function showPictureOptions(img_index) {
            _c_img_index = img_index;
            $('#picture_options').css('display', 'block');
        }

        function hidePictureOptions() {
            _c_img_index = -1;
            $('#picture_options').css('display', 'none');
        }
        
        function nextStep() {
            switch(_c_step) {
                case 1:
                    //any picture set
                    if(_a_img_uris[0]=='' && _a_img_uris[1]=='' && _a_img_uris[2]=='') {
                        if(!confirm('Aucune image spécifiée. Une annonce avec photo a 4 fois plus de chance de déboucher sur une vente. Souhaitez-vous continuer sans photo ?')) {
                            return false;
                        }
                    }
                    _c_step++;
                    $('#step1').css('display', 'none');
                    displayStep();
                break;
            }
        }
        
        function displayStep() {
            switch(_c_step) {
                case 2:
                    $('#step2').css('display', 'block');
                    if(_c_main_cat_label=='') {
                        $('#step21').css('display', 'block');
                        $('#step22').css('display', 'none');
                        $('#step23').css('display', 'none');
                        //get main cat list from ajax
                        $.ajax({
							type : 'GET',
							url : _website_url,
							data : 'todo=folder&subtodo=maincat',
							beforeSend: function( xhr ) {
								showhideLoading(1);
							},
							success : function(data) {
                                eval(data);
                                var list = $('#maincatlist');
                                if(a_result.length==0) {
                                    _c_main_cat_label = '-';
                                    _c_sub_cat_label = '-';
                                    setSubCat('-');
                                } else {
                                    list.html("");
                                    $.each(a_result, function(key, val) {
                                          var list_elem = document.createElement('li');
                                          list_elem.innerHTML = val;
                                          list_elem.onclick = function() { getSubCat(this.innerHTML); };
                                          list.append(list_elem);
                                    });
                                   //list.listview("destroy").listview()
								}
								showhideLoading(0);
							},
							error : function() {
								alert('Une erreur est survenue');
								showhideLoading(0);
							},
                        });
                    } else {
                        if(_c_sub_cat_label=='') {
                            getSubCat(_c_main_cat_label);
                        } else {
                            setSubCat(_c_sub_cat_label);
                        }
                    }
                break;
            }
        }
        
        function unsetCat() {
            _c_main_cat_label = '';
            _c_sub_cat_label = '';
            displayStep();
        }
        
        function unsetSubCat() {
            _c_sub_cat_label = '';
            displayStep();
        }        
        
        function getSubCat(main_cat_label) {
            $('#step21').css('display', 'none');
            $('#step22').css('display', 'block');
            $('#step23').css('display', 'none');
            _c_main_cat_label = main_cat_label;
            $('#current_select_main_cat_label').html(main_cat_label);
           //get sub cat list from ajax
           $.ajax({
				type : 'GET',
				url : _website_url,
				data : 'todo=folder&subtodo=subcat&maincat_label='+main_cat_label,
				cache : false,
				beforeSend: function( xhr ) { showhideLoading(1); },
				success : function(data) {
					eval(data);
					if(a_result.length==0) {
						setSubCat('-');
					} else {
						var list = $('#subcatlist');
						list.html("");
						$.each(a_result, function(key, val) {
							var list_elem = document.createElement('li');
							list_elem.innerHTML = val;
							list_elem.onclick = function() { setSubCat(this.innerHTML); };
							list.append(list_elem);
						});
                    //list.listview("destroy").listview()
					}
					showhideLoading(0);
                },
                error : function() {
					alert('Une erreur est survenue');
					showhideLoading(0);
				},
            });  
        }
                           
       function setSubCat(sub_cat_label) {
           $('#step21').css('display', 'none');
           $('#step22').css('display', 'none');
           $('#step23').css('display', 'block');
           _c_sub_cat_label = sub_cat_label;           
           $('#select_main_cat_label').html(_c_main_cat_label);
           $('#select_sub_cat_label').html(_c_sub_cat_label);

           $('#main_cat_label').val(_c_main_cat_label);
           $('#sub_cat_label').val(_c_sub_cat_label);
       }
        
        var _a_default_field_vals = {"label":"Titre de l'annonce", "description":"Texte de l'annonce", "price":"Prix", "pseudo":"Votre nom", "password":"Votre mot de passe", "phone":"Votre tel", "login":"Votre email", "zipcode":"Votre code postal"};
        
        function empty_field(fieldNode) {
            if(fieldNode.value==_a_default_field_vals[fieldNode.id]) {
                fieldNode.value = '';
                fieldNode.style.color = '#000';
            }
        }
        
        function fill_empty_field(fieldNode) {
            if(fieldNode.value=='') {
                fieldNode.value = _a_default_field_vals[fieldNode.id];
                fieldNode.style.color = '#ccc';
            }            
        }
        
        var _chk_field_res = true;
        function submitAll() {
            //check field
            _chk_field_res = true;
            var chk_field_res = $.each(_a_default_field_vals, function(key, val) {
                if($('#'+key).val()=='' || $('#'+key).val()==val) {
                   alert(val+' : champ vide ou données incorrect');
                   $('#'+key).focus();
                   _chk_field_res = false;
                   return false;
               } else {
                    switch(key) {
                        case "price" :
                        case "zipcode" :
                        case "phone" :
                        //must be number ?

                        break;
                        case "login" :
                            var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
                            if (!filter.test($('#'+key).val())) {
                               alert(val+' : champ vide ou données incorrect');
                               $('#'+key).focus();
                               _chk_field_res = false;
                               return false;
                            }
                        break;
                        default :
                        break;
                    }
               }
            });
            if(_chk_field_res) {
                $.post(_website_url+"?todo=classified&subtodo=add", $("#AdFrm").serialize(),
                    function(data) {
                    
                       var int_data = parseInt(data);
                       if(isNaN(int_data)) {
						alert('Une erreur est survenue lors de l\'enregistrement de votre annonce.');
                       } else {
						if(int_data>0) {
							var wait4pics = false;
							for(var i=0;i<_a_img_uris.length;i++) {
								if(_a_img_uris[i]!='') {
                            		uploadPic(int_data, i, _a_img_uris[i]);
                            		wait4pics = true;
                            		_nb_pics2upload++;
                         		}
                         		localStorage.removeItem("sell_image"+i);
                        	}
                        	if(!wait4pics) {
                        		$('#step2').css('display', 'none');
                       			$('#step4').css('display', 'block');
                       		} else {
                       			$('#step2').css('display', 'none');
                       			$('#step3').css('display', 'block');
                       		}
                       		//localStorage.removeItem("sell_maincat_id");
                       		//localStorage.removeItem("sell_subcat_id");
                       	} else {
                        	alert('Une erreur est survenue lors de l\'enregistrement de votre annonce.');
                       	}
                       }
                    }
                 );
                
            } else {
                return false;
            }
        }
        
        function checkImageUpload() {
        	if(_nb_pics2upload<=0) {
        		$('#step3').css('display', 'none');
				$('#step4').css('display', 'block');
				showhideLoading(0);
        	}
        }
        
        var uploadPicOK = function(r) {
        	_nb_pics2upload--;
        	checkImageUpload();
            //console.log("Code = " + r.responseCode);
            //console.log("Response = " + r.response);
            //console.log("Sent = " + r.bytesSent);
        }
        
        var uploadPicsFail = function(error) {
            //alert("An error has occurred: Code = " = error.code);
            alert('Une des images n\'a pas été chargée correctement');
			_nb_pics2upload--;
        	checkImageUpload(); 
        }
        
        function uploadPic(classified_id, img_index, fileURI) {
            var options = new FileUploadOptions();
            options.fileKey="picture"+img_index;
            options.fileName=fileURI.substr(fileURI.lastIndexOf('/')+1);
            options.mimeType="text/plain";
            
            var params = new Object();
            params.todo = "classified";
            params.subtodo = "addimg";
            params.classified_id = classified_id;
            options.params = params;
            
            var ft = new FileTransfer();
            ft.upload(fileURI, _website_url, uploadPicOK, uploadPicsFail, options);
        }
        
		var onGeoLocSuccess = function(position) {
			var maps_googleapis_url = 'http://maps.googleapis.com/maps/api/geocode/json';
			var reverse_geocode_param = 'latlng='+position.coords.latitude+','+position.coords.longitude+'&sensor=true';
			$.ajax({
				type : 'GET',
				url : maps_googleapis_url,
				data : reverse_geocode_param,
				cache : false,
				success : function(data) {
                   if(data.status=="OK") {
					var results = data.results;
                   	var address = results[0].address_components;
					var zipcode = address[address.length - 1].long_name;
					document.getElementById('zipcode').value = zipcode;
					document.getElementById('zipcode').style.color = '#000';
                   }
	        	},
				error : function(jqXHR, textStatus, errorThrown) {
					//alert('Cannot connect to google API');
				}
			});
		};

		function onGeoLocError(error) {
		}

    





	$( function() {
		document.addEventListener("deviceready", onDeviceReady, false);
	} );
	
    // PhoneGap is loaded and it is now safe to make calls PhoneGap methods
	function onDeviceReady() {
        checkConnection();
	}
        
        


        
        
    function checkConnection() {
        var networkState = navigator.network.connection.type;
        if(networkState==Connection.UNKNOWN || networkState==Connection.NONE) {
            document.getElementById('bt_zone').innerHTML = 'Aucune connexion à internet détectée. Geeknchips nécessite une connection internet pour fonctionner.';
            $('#footer').css('display', 'none');
        } else {
			// on envoie la valeur recherché en GET au fichier de traitement
			$.ajax({
				type : 'GET',
				url : _website_url,
				data : 'todo=index&subtodo=nb_valid_annonces',
				success : function(data) {
                   $('#nb_ad').html(data);
	        	},
				error : function(jqXHR, textStatus, errorThrown) {
					$('#bt_zone').html('Connexion au serveur impossible. Geeknchips nécessite une connection internet pour fonctionner.');
					$('#footer').css('display', 'none');
				}
			});
        }
    }






        
        $( function() {
          document.addEventListener("deviceready", onDeviceReady, false);
        });

		function onDeviceReady() {
            displayHistory(1);
			$("#searchBox").keypress(function() {
                $('#history_search_toggle_bt').attr("src", 'img/search_toggle_bt.png');
                $('#clear_history_bt').css('display', 'none');
                $.ajax({
                    type : 'GET',
                    url : _website_url,
                    data : 'todo=search&subtodo=autocomplete&searchval='+$('#searchBox').val(),
                    cache : false,
					beforeSend: function( xhr ) {
				    	showhideLoading(1);
				  	},
                    success : function(data) {
                    	eval(data);
                    	var list = $('#list');
                    	list.html("");
                    	$.each(a_result, function(key, val) {
                       		var list_elem = document.createElement('li');
                       		list_elem.innerHTML = val;
                       		list_elem.onclick = function() { getFolderAd(this.innerHTML); };
                       		list.append(list_elem);
                    	});
						showhideLoading(0);
                    },
					error : function() {
						alert('Une erreur est survenue');
						showhideLoading(0);
					},
                });
             });
		}
        
		function getFolderAd(folder_clean_label) {
            _last_screen = 'clickfolder';
            window.scrollTo(0,56);
			addtoHistory(folder_clean_label);
            $('#searchcontent').css('display', 'none');
            $('#adzone').css('display', 'none');
			$.ajax({
				type : 'GET',
				url : _website_url,
				data : 'todo=search&subtodo=adlist_folder&searchval='+folder_clean_label,
				cache : false,
				beforeSend: function( xhr ) {
					showhideLoading(1);
				},
				success : function(data) {
					$('#adlistzone').html(data);
					$('#adlist').css('display', 'block');
					showhideLoading(0);
				},
				error : function() {
					alert('Une erreur est survenue');
					showhideLoading(0);
				},
			});
		}
        
        function addtoHistory(folder_clean_label) {
            var a_historysearchVal = new Array();
			var historysearchVal = localStorage.getItem("historysearchVal");
            if(historysearchVal==null || historysearchVal=='') {
                a_historysearchVal.push(folder_clean_label);
            } else {
                a_historysearchVal = historysearchVal.split(',');
                var val_in_array = false;
                for(var j=0; j<a_historysearchVal.length; j++) {
                    if(a_historysearchVal[j]==folder_clean_label)
                        val_in_array = true;
                }
                if(!val_in_array) {
                    if(a_historysearchVal.length<20) {
                       a_historysearchVal.push(folder_clean_label);
                    } else {
                        a_historysearchVal.push(folder_clean_label);
//                        var a_new_historysearchVal = new Array();
                    }
                }
            }
            localStorage.setItem("historysearchVal", a_historysearchVal.toString());
		}
        
        function showAdDetail(classified_id) {
            _last_screen = 'clickad';
            $('#searchcontent').css('display', 'none');
            $('#adlist').css('display', 'none');
            $.ajax({
				type : 'GET',
				url : _website_url,
				data : 'todo=classified&subtodo=detail&id='+classified_id,
				cache : false,
				beforeSend: function( xhr ) {
					showhideLoading(1);
				},
				success : function(data) {
					$('#adzone').html(data);
					$('#adzone').css('display', 'block');
					showhideLoading(0);
				},
				error : function() {
					alert('Une erreur est survenue');
					showhideLoading(0);
				},
            });
        }
        
        var _last_screen = '';
        function go_back() {
            switch(_last_screen) {
                case 'clickfolder' :
                    _last_screen = '';
                    $('#searchcontent').css('display', 'block');
                    $('#adlist').css('display', 'none');
                    $('#adzone').css('display', 'none');
                break;
                case 'clickad' :
                    _last_screen = 'clickfolder';
                    $('#searchcontent').css('display', 'none');
                    $('#adlist').css('display', 'block');
                    $('#adzone').css('display', 'none');                
                break;
                default : 
                    document.location.href = 'index.html';
                break;
            }
        }
        
        function clearHistory() {
            localStorage.removeItem("historysearchVal");
			displayHistory(1);
        }
                
        function switch_history_search() {
            if($('#history_search_toggle_bt').attr("src")=='img/search_toggle_bt.png') {
                //on affiche actuellement les recherches, on passe en mode historique
                displayHistory(0);
            } else {
                //on affiche actuellement l'historique, on passe en mode recherche
                $('#history_search_toggle_bt').attr("src", 'img/search_toggle_bt.png');
				$('#clear_history_bt').css('display', 'none');
				showDefaultCat();
            }
        }
        
        function displayHistory(init) {
            var historysearchVal = localStorage.getItem("historysearchVal");
            if(historysearchVal==null || historysearchVal=='null' || historysearchVal=='') {
                //history empty => show default cat
                //hide history button
				$('#history_search_toggle_bt').attr("src", 'img/search_toggle_bt.png');
                $('#clear_history_bt').css('display', 'none');
				if(init==0) {
					alert('Votre historique est vide');
				}
				showDefaultCat();
            } else {
                //show history buttons
                $('#history_search_toggle_bt').attr("src", 'img/search_toggle_bt2.png');
                $('#history_search_toggle').css('display', 'block');
                var a_historysearchVal = historysearchVal.split(',');
                var list = $('#list');
                list.html("");
                for(var i=(a_historysearchVal.length-1);i>=0; i--) {
                    if(a_historysearchVal[i]!='') {
                        var list_elem = document.createElement('li');
                        list_elem.innerHTML = a_historysearchVal[i];
                        list_elem.onclick = function() { getFolderAd(this.innerHTML); };
                        list.append(list_elem);
                    }
                }
                //list.listview("destroy").listview()
                $('#clear_history_bt').css('display', 'block');
            }
        }
        
        function add2favorites(classified_id) {
            var a_favoritesAdsVal = new Array();
            var favoritesAdsVal = localStorage.getItem("favoritesAds");
            if(favoritesAdsVal==null || favoritesAdsVal=='') {
                a_favoritesAdsVal.push(classified_id);
            } else {
                a_favoritesAdsVal = favoritesAdsVal.split(',');
                var val_in_array = false;
                for(var j=0; j<a_favoritesAdsVal.length; j++) {
                    if(a_favoritesAdsVal[j]==classified_id)
                    val_in_array = true;
                }
                if(!val_in_array) {
                    a_favoritesAdsVal.push(classified_id);
                }
            }
            localStorage.setItem("favoritesAds", a_favoritesAdsVal.toString());
            alert('Annonce ajoutée aux favoris');
        }
        
        function getNextAd(divNode, folder_clean_label, page) {
			$.ajax({
				type : 'GET',
				url : _website_url,
				data : 'todo=search&subtodo=adlist_folder&searchval='+folder_clean_label+'&page='+page,
				cache : false,
				beforeSend: function( xhr ) {
					showhideLoading(1);
				},
				success : function(data) {
					divNode.parentNode.innerHTML = data;
					showhideLoading(0);
				},
				error : function() {
					alert('Une erreur est survenue');
					showhideLoading(0);
				},
			});
        }
        
        function freeSearch() {
			if($('#searchBox').val()!="") {
				addtoHistory($('#searchBox').val());
				$('#searchcontent').css('display', 'none');
				$('#adzone').css('display', 'none');
				$.ajax({
					type : 'GET',
					url : _website_url,
					data : 'todo=search&subtodo=adlist_freesearch&searchval='+$('#searchBox').val(),
					cache : false,
					beforeSend: function( xhr ) {
						showhideLoading(1);
					},
					success : function(data) {
						$('#adlistzone').html(data);
						$('#adlist').css('display', 'block');
						showhideLoading(0);
					},
					error : function() {
						alert('Une erreur est survenue');
						showhideLoading(0);
					},
				});
			}
        }
         
         function showDefaultCat() {
			$.ajax({
                type : 'GET',
                url : _website_url,
                data : 'todo=folder&subtodo=homecat',
                cache : false,
				beforeSend: function( xhr ) {
			    	showhideLoading(1);
			  	},
                success : function(data) {
	                eval(data);
	                var list = $('#list');
	                list.html("");
	                $.each(a_result, function(key, val) {
	                   var list_elem = document.createElement('li');
	                   list_elem.innerHTML = val;
	                   list_elem.onclick = function() { getFolderAd(this.innerHTML); };
	                   list.append(list_elem);
						showhideLoading(0);
	                });
					showhideLoading(0);
                },
				error : function() {
					alert('Une erreur est survenue');
					showhideLoading(0);
				},
            });
		}
    






	        
        $( function() {
          document.addEventListener("deviceready", onDeviceReady, false);
        });

		function onDeviceReady() {
			showhideLoading(1);
            displayFavorites();
        }
        
        function displayFavorites() {
            var favoritesAdsVal = localStorage.getItem("favoritesAds");
            if(favoritesAdsVal==null || favoritesAdsVal=='') {
                $("#adlist").html('<br/><div align="center">Votre liste d\'annonce favorites est vide.</div>');
                
                showhideLoading(0);
                return false;
            } else {
                $.ajax({
                   type : 'GET',
                   url : _website_url,
                   data : 'todo=search&subtodo=adlist_favorites&s_classified_ids='+favoritesAdsVal,
                   success : function(data) {
                       $('#adlist').html(data);
                       $('#clear_favorites_bt').css('display', 'block');
                       showhideLoading(0);
                   },
					error : function(jqXHR, textStatus, errorThrown) {
						$('#adlist').html('Connexion au serveur impossible. Geeknchips nécessite une connection internet pour fonctionner.');
						$('#footer').css('display', 'none');
				   }
                });
            }
        }
        
        function showAdDetail(classified_id) {
            _last_screen = 'clickad';
            $('#adlist').css('display', 'none');
            $('#clear_favorites_bt').css('display', 'none');
            $.ajax(
                {
                   type : 'GET',
                   url : _website_url,
                   data : 'todo=classified&subtodo=detail&id='+classified_id,
                   success : function(data) {
                   $('#adzone').html(data);
                   $('#adzone').css('display', 'block');
                },
            });
        }
        
        var _last_screen = '';
        function go_back() {
            switch(_last_screen) {
                case 'clickad' :
                    _last_screen = '';
                    $('#adlist').css('display', 'block');
                    $('#clear_favorites_bt').css('display', 'block');
                    $('#adzone').css('display', 'none');                
                break;
                default : 
                    document.location.href = 'index.html';
                break;
            }
        }
        
        function clearFavorites() {
            if(confirm('Effacer tous les favoris ?'))
            {
               localStorage.removeItem("favoritesAds");
               $('#clear_favorites_bt').css('display', 'none');
               $("#adlist").html('<br/><div align="center">Votre liste d\'annonce favorites est vide.</div>');
            }
        }
        
    

var _website_url = 'http://www.geeknchips.fr/mobileapp.php';

function showhideLoading(show) {
	if(show==1)
		$('#loading_status').css('display', 'block');
	else
		$('#loading_status').css('display', 'none');
}

PG = ( typeof PG == 'undefined' ? {} : PG );
PG.FB = {
    init: function(apiKey) {
        // create the fb-root element if it doesn't exist
        if (!document.getElementById('fb-root')) {
            var elem = document.createElement('div');
            elem.id = 'fb-root';
            document.body.appendChild(elem);
        }
        PhoneGap.exec(function() {
        	var session = JSON.parse(localStorage.getItem('pg_fb_session') || '{"expires":0}');
        	if (session && session.expires > new Date().valueOf()) {
        		FB.Auth.setSession(session, 'connected');
            }
        }, null, 'com.phonegap.facebook.Connect', 'init', [apiKey]);
    },
    login: function(a, b) {
        b = b || { perms: '' };
        PhoneGap.exec(function(e) { // login
            localStorage.setItem('pg_fb_session', JSON.stringify(e.session));
            FB.Auth.setSession(e.session, 'connected');
            if (a) a(e);
        }, null, 'com.phonegap.facebook.Connect', 'login', b.perms.split(',') );
    },
    logout: function(cb) {
        PhoneGap.exec(function(e) {
            FB.Auth.setSession(null, 'notConnected');
            if (cb) cb(e);
        }, null, 'com.phonegap.facebook.Connect', 'logout', []);
    },
    getLoginStatus: function(cb) {
        PhoneGap.exec(function(e) {
            if (cb) cb(e);
        }, null, 'com.phonegap.facebook.Connect', 'getLoginStatus', []);
    }
};
