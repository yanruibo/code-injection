





            /**
             * Initialisation de jQueryMobile
             * Surcharge des paramËtres de base de jquery
             **/
            $( document ).bind("mobileinit", function(){
                               //fix crossdomain
							   $.mobile.allowCrossDomainPages = true;
                               $.mobile.fixedToolbars.show(false);
                               $.mobile.fixedToolbars.setTouchToggleEnabled(true);
                               $.mobile.loadingMessage =  "Chargement en cours";
                               $.mobile.defaultPageTransition = 'none';
                               //$.mobile.defaultHomeScroll = 0;
                               $("[data-role=header]").fixedtoolbar({ transition: "none" });
                               /*var android_version = navigator.userAgent.match(/Android [\d+\.]{3,5}/)[0].replace('Android ','');
                               eugena.log('android version '+android_version);
                               if(android_version === '2.3.3'){
                            	   eugena.log('android version 2.3.3 '+android_version);
                            	   //$.mobile.selectmenu.prototype.options.nativeMenu = false;
                            	}*/
                               });
        


















            /**
             * Initialisation des variables qui seront utilisÈes dans l'application
             * @reset : passer ‡ true pour vider la base de donnÈes
             * @debug : pour afficher les requetes dans la console de log
             * @wisipad : pour definir si le device est un iPad
             * @wisandroid : pour definir si le device utilise Android
             * @wischrome : pour definir si le navigateur utilisÈ est chrome
             * @windowHeight : pour rÈcupÈrer la hauteur de la fenetre window
             * @userAgent : pour rÈcupÈrer le userAgent du device
             * @clickEvent : pour definir le type d'ÈvËnement ‡ effectuer sur les actions en fonction du device (tap ou click)
             * @deviceUUID : pour rÈcupÈrer l'id du device
             **/
            var reset = false;
            var debug = true;
            var debugLog = true;
            var wisipad = false;
            var wismobile = false;
            var wisandroid = false;
            var wischrome = false;
			var sqllite = false;
            var windowHeight;
            var userAgent = navigator.userAgent.toLowerCase();
            var clickEvent;
            var deviceUUID;
            var pathFileDemande = "";
            
            
            /**
             * Test si le device utilisÈ est un mobile ou un iPad
             **/
            if( navigator.platform == "iPhone" || navigator.platform == "iPhone Simulator" || navigator.platform == "iPad" || (userAgent.indexOf("android") != -1))
            wismobile = true;
            
            if (userAgent.indexOf("ipad")!=-1) wisipad=true;
            var isMobile = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1 || userAgent.indexOf('mobile')!= -1 || userAgent.indexOf('ipad')!= -1 || userAgent.indexOf('android')!= -1) ? true : false;
            
            clickEvent = isMobile ? 'tap' : 'click';
            if(userAgent.indexOf('chrome') !=-1){clickEvent = 'click'; wischrome = true;}
            if(userAgent.indexOf('android') !=-1) wisandroid = true;
            eugena.log(userAgent);
            
            /**
             * Function appelee lorsque la page est chargÈ
             * 
             **/
            $(document).ready(function(){
				//pageinit
				$('#pageAccueil').bind( 'pageinit',function(event){
					eugena.log('pageinit');
				}); 
				//pageshow
				$('#pageAccueil').bind( 'pageshow',function(event){
					eugena.log('pageshow');
                    $('form.ui-listview-filter').remove();
				});
                $('input[id="name"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="name" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit name');
                                                                   //copris.login();
                                                                 }
                                                                 });
                $('input[id="pass"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="pass" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit pass');
                                                                   //copris.login();
                                                                 }
                                                                 });
                $('#pageListDemande').bind('pageshow', function(event) {
                    eugena.log("form.ui-listview-filter");
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche demandes...');
                });
              
                $('#pageCreateDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageCreateDemande');
                });
                
                $('#pageDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageDemande');
                });
                $('#pageDemande').bind( 'pagebeforeshow',function(event){
                    eugena.log('pagebeforeshow pageDemande');
                });
                
                $('#pageListCopros').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche copropriétés...');
                    eugena.log('pageshow pageListCopros');
                });
					
                $('#pageListImmeubles').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche immeubles...');
                    eugena.log('pageshow pageListImmeubles');
                    $('#listImmeubles').listview('refresh');
                });
					
                $('#pageListBatiments').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche batiments...');
                    $('#listBatiments').listview('refresh');
                    eugena.log('pageshow pageListBatiments');
                });
				
                $('#pageAPropos').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageAPropos');
                });				 
				$('#submitLogin').bind(clickEvent, function(e){
                                       eugena.log('click submit');
                                         copris.login();
                                            $('#listCopros').html('');
				});
				$('.btnLogout').bind(clickEvent, function(e){
                                     eugena.log('Click on logout button');
                                     if(!eugena.clickEnCours(400)){
                                     eugena.log('Call copris.logout');
                                        copris.logout();
                                        eugena.deleteDataLocalStorage('uid');
                                        eugena.deleteDataLocalStorage('pass');
                                        eugena.deleteDataLocalStorage('name');
                                     }
				});
				$('.btnInfo').bind(clickEvent, function(e){
                                     eugena.log('Click on info button');
                                     if(!eugena.clickEnCours(400)){
                                        eugena.changePage($('#pageApropos'));
                                        copris.aPropos.monCompte();
                                     }
				});                
			  $('li[rel="linkDemande"]').bind(clickEvent, function(e){
									 copris.demande.showDemande(this.attr('id'));
																});
			  $('#btnBackCopros').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                copris.copro.listerCopros();
                                                eugena.log('#btnBackCopros');
										}
										});
			  $('#btnBackImmeubles').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listImmeubles').html("");
                                                $('#listCopros').html("");         
                                                var idcopro=$('#pageListImmeubles').attr('idcopro');
                                                copris.immeuble.listerImmeubles($('#pageListImmeubles').attr('idcopro'));
                                                eugena.log('#btnBackImmeubles '+idcopro);
										}
										});
              // de la liste des demandes du batiment ibat à la liste des batiments de l'immeuble idimm                
			  $('#btnBackBatiments').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                $('#listImmeubles').html("");
                                                var idimm=$('#pageListBatiments').attr('idimm');
                                                copris.batiment.listerBatiments($('#pageListBatiments').attr('idimm'));
                                                eugena.log('#btnBackBatiments '+idimm);
										}
										});
              // page d'une demande à la liste des demandes du batiment ibat
			  $('#btnBackDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                var idbat=$('#pageListDemande').attr('idbat');
                                                copris.demande.showListDemande($('#pageListDemande').attr('idbat'));
                                                eugena.log('#btnBackDemande '+idbat);
										}
										});
			  $('#btnBackDemandeCreate').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
											  if($('#pageCreateDemande').attr('operation') == 'create'){
													copris.demande.showListDemande($('#pageListDemande').attr('idbat')); //eugena.changePage($('#pageListDemande'));
                                                }
											  else
													copris.demande.showDemande($('#pageCreateDemande').attr('currentDemande'));
										}
                                        smallImage.style.display = 'none';
                                        smallImage.src = "";
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #images').html("");
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #pasDImage').html("");
										});
			  $('#btnCreateDemande').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(950)){
										  $('#pageCreateDemande').attr('operation', 'create');
                                          copris.demande.showPageCreateDemande();
										  }
										  });
			  $('#btnCreateDemandeBatiment').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                                var idbat=$('#pageListDemande').attr('idbat');
                                            $('#pageCreateDemande').attr('operation', 'create');
                                            copris.demande.showPageCreateDemande($('#pageListDemande').attr('idbat'));
										  }
										  });
			  $('.btnHome').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                            $('#listCopros').html('');
                                            copris.copro.listerCopros();
                                            eugena.log("copris.copro.listerCopros() index");
										  }
										  });
			  $('#btnEditDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(1000)){
												$('#pageCreateDemande').attr('operation', 'edit');
												$('#pageCreateDemande').attr('currentDemande', $('#idDemande').attr('nid'));
												copris.demande.showPageEditDemande($('#idDemande').attr('nid'));
										}
									});
			  $("#demandeDescription h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#lieuDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#pieceJointe h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#motifRefusDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#intervenantDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $('#listCopro').change(function(e){
									 $("#listCopro option[value='0']").remove();
									 copris.immeuble.buildList($('#listCopro').val(), true, 0);
									 $('#blockListBat').hide();
									 eugena.log("#listCopro");
									 });
			  $('#listIm').change(function(e){
									$("#listIm option[value='0']").remove();
									 copris.batiment.buildList($('#listIm').val(), true, 0);
									 });
			  $('#listBat').change(function(e){
								  $("#listBat option[value='0']").remove();
								  });
			  $('.btnValidateCreateDemande').click(function(e){
								if(!eugena.clickEnCours(1000)){
										if($('#pageCreateDemande').attr('operation') == 'create')
												   copris.demande.create(); //eugena.changePage($('#pageListDemande'));
										else
												   copris.demande.edit($('#pageCreateDemande').attr('currentDemande'));
								}  
                                 smallImage.style.display = 'none';
                                 smallImage.src = "";
							});
			  $('#containerListDemande #inputFilter').bind('blur', function(e){

														   });
              $('#file').bind(clickEvent, function(e){
                                     eugena.log("getImage()");
                                     getImage();
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
              $('#fileCapture').bind(clickEvent, function(e){
                                     eugena.log("captureImage()");
                                     captureImage();          
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
                              });
                        

            document.addEventListener("touchmove",function (e) {
                                                                    $("#listCopros a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#containerListDemande").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    e.preventDefault();                                                               
                                                                }, false);
            

            // A button will call this function
            //
            function captureImage() {
                // Launch device camera application, 
                // allowing user to capture up to 2 images
                eugena.log("captureImage1");
                navigator.device.capture.captureImage(captureSuccess, captureError);
                eugena.log("captureImage2");
                eugena.log("captureImage3 "+eugena.fileSystem.root.fullPath);
            }
            // Called when capture operation is finished
            //
            function captureSuccess(mediaFiles) {
                eugena.log("captureSuccess");
                var files = mediaFiles;
                eugena.log("captureSuccess2 "+JSON.stringify(files) + " pathFileDemande " + pathFileDemande);
                media = $('#fileCapture').attr('media',JSON.stringify(files));
                fileName = $('#fileCapture').attr('fileName',files[0].name);
                path = $('#fileCapture').attr('path',files[0].fullPath);
                choix = $('#fileCapture').attr('choix', "oui");
                eugena.log("media "+ media + " fileName " + files[0].name +" path " + files[0].fullPath + " choix " + choix);
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = files[0].fullPath;
                eugena.log("smallImage.src "+smallImage.src);
            }

            // Called if something bad happens.
            // 
            function captureError(error) {
                eugena.log("captureError");
                var msg = 'An error occurred during capture: ' + error.code;
                //navigator.notification.alert(msg, null, 'Uh oh!');
            }


            // Upload files to server
            function uploadFile(mediaFile, idCopro, idIm, idBat, nid, uid) {//captureImage
                    eugena.log("uploadFile captureImage " + pathFileDemande);
                    var ft = new FileTransfer();
                    var path = $('#fileCapture').attr('path');
                    var name = $('#fileCapture').attr('fileName');
                    eugena.log("mediaFile.fullPath " + path + " mediaFile.name " + name);
                    var options = new FileUploadOptions();
                    options.fileKey="file";
                    eugena.log("uploadFile cap2");
                    options.fileName=name;//imageURI.substr(imageURI.lastIndexOf('/')+1);
                    options.headers = { "Connection":"close" };
                    options.chunkedMode = false;
                    options.mimeType="image/jpeg";
                    var params = {};
                    params.uid = uid;
                    params.nid = nid;
                    params.path = pathFileDemande;
                    eugena.log("options");

                    options.params = params;
            
                var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
                ft.upload(path,
                    encodeURI(uriServeur),
                    function(result) {
                        console.log('Upload success: ' + result.responseCode);
                        console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                        eugena.log("fileTransfer.download");
                        eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                                function(entry){
                                  console.log('Demandes success');//Demandes
                                  entry.getDirectory("copro"+idCopro, {create: true},
                                  function(entry){
                                           console.log('copro '+idCopro+' success');//Demandes/copro229
									entry.getDirectory("immeuble"+idIm, {create: true},
                                      function(entry){
                                               console.log('immeuble '+idIm+' success');//Demandes/copro229/immeuble231
										  entry.getDirectory("batiment"+idBat, {create: true},
                                          function(entry){
                                                   console.log('batiment '+idBat+' success');//Demandes/copro229/immeuble231/batiment234
												entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                                    console.log('demande '+nid+' success');//Demandes/copro229/immeuble231/batiment234/demande568
                                                    iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    var pathTemp = $('#fileCapture').attr('path');
                                                    eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                                    console.log("iOSFilePath "+iOSFilePath);
                                                    copris.demande.showDemande(nid);
                                                    /*$.mobile.loading( 'hide');*/
                                            },getDirfail);
                                        },getDirfail);
                                    },getDirfail);
                                 }, getDirfail);
                    },
                    function(error) {
                        console.log('Error uploading file ' + path + ': ' + error.code);
                        /*copris.demande.showDemande(nid);
                        $.mobile.loading( 'hide');*/
                        alert("Echec du transfert de la photo");
                    },
                    options);
            }
    function getDirSuccess(dirEntry){
        eugena.log("repertoires crees "+name);
        var pathTemp = $('#fileCapture').attr('path');
        eugena.log("pathTemp "+JSON.stringify(pathTemp));
        eugena.log("directory reader cree "+JSON.stringify(dirEntry));
    }
    
    function onSuccessresolve(fileEntry) {
    console.log("fileEntry success : "+fileEntry.name);
    }
    function onErrorresolve(fileEntry) {
    console.log("fileEntry error : "+fileEntry.name);
    }
    function readerSuccess(entry){
        eugena.log("readerSuccess "+iOSFilePath);
        eugena.log("Fichier a uploader dans iOS"+JSON.stringify(entry));
    // copy the file to a new directory and rename it
        entry.copyTo(iOSFilePath, entry.name, successcopyTo, failcopyTo);
                         // Request a file system
                         var name = $('#fileCapture').attr('fileName');
                         var path = $('#fileCapture').attr('path');
        eugena.log("name : "+name);
        eugena.log("path : "+path+ " newFilePath "+newFilePath);
        }
                // Called upon successful File System request
                function requestFileSystemSuccess(fileSys){
                    // Get the source directory
                    eugena.log("requestFileSystemSuccess");
                    fileSys.root.getDirectory(iOSFilePath, {create: false, exclusive:false}, getDestDirSuccess, getDestDirError);
                    eugena.log("fileSys "+JSON.stringify(fileSys));
                    }
                    // Called upon successful Get Of Destination Directory
                    function getDestDirSuccess(directory){
                    eugena.log("getDestDirSuccess");
                    eugena.log("getDestDirSuccess "+JSON.stringify(directory));
                        name = $('#fileCapture').attr('fileName');
                        fullDestPath = directory.fullPath + '/' + name;
                        eugena.log("fullDestPath "+fullDestPath);
                        // Make the move
                        entry.copyTo(directory, name, moveSuccess, moveError);
                        eugena.log("copyTo");
                        }
                        function moveSuccess(){
                            console.log("Successful copy of " + pathTemp + " to " + newFilePath);
                        }
                        function moveError(error){
                            console.log("copyError code: " + JSON.stringify(error));
                        }
                    
                    // Get Destination Dir Failure
                    function getDestDirError(error){
                        console.log("getDestDirError code: " + JSON.stringify(error));
                    }
                
                // File System Request Failure
                function requestFileSystemError(error){
                    console.log("requestFileSystemError code: " + JSON.stringify(error));
                }
    

     function copiedFile(fileEntry) { 
            console.log("copied file: " + fileEntry.fullPath); 
            // !!! assumes you have an img element on page with id=largeImage 
            var largeImage = document.getElementById('largeImage'); 
            largeImage.style.display = 'block'; 
            largeImage.src = fileEntry.toURI() + "?" + (new Date()).getTime(); 
        } 

        // file system fail 
        function fsFail(error) { 
            console.log("failed with error code: " + error.code); 
        }; 
    function successcopyTo(entry) {
    console.log("New Path: " + entry.fullPath);
    }

    function failcopyTo(error) {
        eugena.log("failcopyTo : "+JSON.stringify(error));//1 --> FILE_NOT_FOUND_ERR
    }
    function getDirfail(){
        eugena.log("repertoire n'a pas pu etre cree");
    }
           
            function getImage() {
                  // Retrieve image file location from specified source
                  eugena.log("getImage");
                  navigator.camera.getPicture(recupAttributImage, function(message) {
                              //alert('get picture failed');
                          },{
                              quality: 50,
                              destinationType: navigator.camera.DestinationType.FILE_URI,
                              sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                          }
                  );

              }
            function recupAttributImage(imageURI) {
              filePath = imageURI;
              fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
                $('#file').attr('fileName',fileName);
                $('#file').attr('path',filePath);
                $('#file').attr('choix', "oui");
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = imageURI;
            }
         function uploadPhoto(imageURI, idCopro, idIm, idBat, nid, uid) {
            var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
            eugena.log("uploadPhoto1"+imageURI);
            var options = new FileUploadOptions();
            options.fileKey="file";
            eugena.log("uploadPhoto2 "+pathFileDemande);
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+".jpg";
            options.chunkedMode = false;
            options.mimeType="image/jpeg";
            
            var params = {};
            
            params.uid = uid;
            params.nid = nid;
            params.path = pathFileDemande;
            eugena.log("options");

            options.params = params;
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(uriServeur),
                    function(result) {
                console.log('Upload success uploadPhoto: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                eugena.log("fileTransfer.download");
                eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                        function(entry){
                          console.log('Demandes success');//Demandes
                          entry.getDirectory("copro"+idCopro, {create: true},
                          function(entry){
                                   console.log('copro '+idCopro+' success');//Demandes/copro229
							entry.getDirectory("immeuble"+idIm, {create: true},
                              function(entry){
                                       console.log('immeuble '+idIm+' success');//Demandes/copro229/immeuble231
								  entry.getDirectory("batiment"+idBat, {create: true},
                                  function(entry){
                                           console.log('batiment '+idBat+' success');//Demandes/copro229/immeuble231/batiment234
										entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                            console.log('demande '+nid+' success');//Demandes/copro229/immeuble231/batiment234/demande568
                                            iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            var pathTemp = $('#fileCapture').attr('path');
                                            eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                            console.log("iOSFilePath "+iOSFilePath);
                                            copris.demande.showDemande(nid);
                                            /*$.mobile.loading( 'hide');*/
                                    },getDirfail);
                                },getDirfail);
                            },getDirfail);
                         }, getDirfail);
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
                /*copris.demande.showDemande(nid);
                $.mobile.loading( 'hide');*/
                alert("Echec du transfert de la photo");
            }, options);
            //ft.upload(imageURI, encodeURI(uriServeur), win, fail, options,true);
        }
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent+ " " + pathFileDemande);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        



            if(wismobile){
					app.initialize();
                    console.log("wismobile");
				}else{
					app.receivedEvent('deviceready');
                    console.log("wischrome");
				}
        






            /**
             * Initialisation de jQueryMobile
             * Surcharge des paramËtres de base de jquery
             **/
            $( document ).bind("mobileinit", function(){
                               //fix crossdomain
							   $.mobile.allowCrossDomainPages = true;
                               $.mobile.fixedToolbars.show(false);
                               $.mobile.fixedToolbars.setTouchToggleEnabled(true);
                               $.mobile.loadingMessage =  "Chargement en cours";
                               $.mobile.defaultPageTransition = 'none';
                               //$.mobile.defaultHomeScroll = 0;
                               $("[data-role=header]").fixedtoolbar({ transition: "none" });
                               /*var android_version = navigator.userAgent.match(/Android [\d+\.]{3,5}/)[0].replace('Android ','');
                               eugena.log('android version '+android_version);
                               if(android_version === '2.3.3'){
                            	   eugena.log('android version 2.3.3 '+android_version);
                            	   //$.mobile.selectmenu.prototype.options.nativeMenu = false;
                            	}*/
                               });
        


















            /**
             * Initialisation des variables qui seront utilisÈes dans l'application
             * @reset : passer ‡ true pour vider la base de donnÈes
             * @debug : pour afficher les requetes dans la console de log
             * @wisipad : pour definir si le device est un iPad
             * @wisandroid : pour definir si le device utilise Android
             * @wischrome : pour definir si le navigateur utilisÈ est chrome
             * @windowHeight : pour rÈcupÈrer la hauteur de la fenetre window
             * @userAgent : pour rÈcupÈrer le userAgent du device
             * @clickEvent : pour definir le type d'ÈvËnement ‡ effectuer sur les actions en fonction du device (tap ou click)
             * @deviceUUID : pour rÈcupÈrer l'id du device
             **/
            var reset = false;
            var debug = true;
            var debugLog = true;
            var wisipad = false;
            var wismobile = false;
            var wisandroid = false;
            var wischrome = false;
			var sqllite = false;
            var windowHeight;
            var userAgent = navigator.userAgent.toLowerCase();
            var clickEvent;
            var deviceUUID;
            var pathFileDemande = "";
            
            
            /**
             * Test si le device utilisÈ est un mobile ou un iPad
             **/
            if( navigator.platform == "iPhone" || navigator.platform == "iPhone Simulator" || navigator.platform == "iPad" || (userAgent.indexOf("android") != -1))
            wismobile = true;
            
            if (userAgent.indexOf("ipad")!=-1) wisipad=true;
            var isMobile = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1 || userAgent.indexOf('mobile')!= -1 || userAgent.indexOf('ipad')!= -1 || userAgent.indexOf('android')!= -1) ? true : false;
            
            clickEvent = isMobile ? 'tap' : 'click';
            if(userAgent.indexOf('chrome') !=-1){clickEvent = 'click'; wischrome = true;}
            if(userAgent.indexOf('android') !=-1) wisandroid = true;
            eugena.log(userAgent);
            
            /**
             * Function appelee lorsque la page est chargÈ
             * 
             **/
            $(document).ready(function(){
				//pageinit
				$('#pageAccueil').bind( 'pageinit',function(event){
					eugena.log('pageinit');
				}); 
				//pageshow
				$('#pageAccueil').bind( 'pageshow',function(event){
					eugena.log('pageshow');
                    $('form.ui-listview-filter').remove();
				});
                $('input[id="name"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="name" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit name');
                                                                   //copris.login();
                                                                 }
                                                                 });
                $('input[id="pass"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="pass" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit pass');
                                                                   //copris.login();
                                                                 }
                                                                 });
                $('#pageListDemande').bind('pageshow', function(event) {
                    eugena.log("form.ui-listview-filter");
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche demandes...');
                });
              
                $('#pageCreateDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageCreateDemande');
                });
                
                $('#pageDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageDemande');
                });
                $('#pageDemande').bind( 'pagebeforeshow',function(event){
                    eugena.log('pagebeforeshow pageDemande');
                });
                
                $('#pageListCopros').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche copropriétés...');
                    eugena.log('pageshow pageListCopros');
                });
					
                $('#pageListImmeubles').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche immeubles...');
                    eugena.log('pageshow pageListImmeubles');
                    $('#listImmeubles').listview('refresh');
                });
					
                $('#pageListBatiments').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche batiments...');
                    $('#listBatiments').listview('refresh');
                    eugena.log('pageshow pageListBatiments');
                });
				
                $('#pageAPropos').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageAPropos');
                });				 
				$('#submitLogin').bind(clickEvent, function(e){
                                       eugena.log('click submit');
                                         copris.login();
                                            $('#listCopros').html('');
				});
				$('.btnLogout').bind(clickEvent, function(e){
                                     eugena.log('Click on logout button');
                                     if(!eugena.clickEnCours(400)){
                                     eugena.log('Call copris.logout');
                                        copris.logout();
                                        eugena.deleteDataLocalStorage('uid');
                                        eugena.deleteDataLocalStorage('pass');
                                        eugena.deleteDataLocalStorage('name');
                                     }
				});
				$('.btnInfo').bind(clickEvent, function(e){
                                     eugena.log('Click on info button');
                                     if(!eugena.clickEnCours(400)){
                                        eugena.changePage($('#pageApropos'));
                                        copris.aPropos.monCompte();
                                     }
				});                
			  $('li[rel="linkDemande"]').bind(clickEvent, function(e){
									 copris.demande.showDemande(this.attr('id'));
																});
			  $('#btnBackCopros').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                copris.copro.listerCopros();
                                                eugena.log('#btnBackCopros');
										}
										});
			  $('#btnBackImmeubles').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listImmeubles').html("");
                                                $('#listCopros').html("");         
                                                var idcopro=$('#pageListImmeubles').attr('idcopro');
                                                copris.immeuble.listerImmeubles($('#pageListImmeubles').attr('idcopro'));
                                                eugena.log('#btnBackImmeubles '+idcopro);
										}
										});
              // de la liste des demandes du batiment ibat à la liste des batiments de l'immeuble idimm                
			  $('#btnBackBatiments').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                $('#listImmeubles').html("");
                                                var idimm=$('#pageListBatiments').attr('idimm');
                                                copris.batiment.listerBatiments($('#pageListBatiments').attr('idimm'));
                                                eugena.log('#btnBackBatiments '+idimm);
										}
										});
              // page d'une demande à la liste des demandes du batiment ibat
			  $('#btnBackDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                var idbat=$('#pageListDemande').attr('idbat');
                                                copris.demande.showListDemande($('#pageListDemande').attr('idbat'));
                                                eugena.log('#btnBackDemande '+idbat);
										}
										});
			  $('#btnBackDemandeCreate').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
											  if($('#pageCreateDemande').attr('operation') == 'create'){
													copris.demande.showListDemande($('#pageListDemande').attr('idbat')); //eugena.changePage($('#pageListDemande'));
                                                }
											  else
													copris.demande.showDemande($('#pageCreateDemande').attr('currentDemande'));
										}
                                        smallImage.style.display = 'none';
                                        smallImage.src = "";
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #images').html("");
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #pasDImage').html("");
										});
			  $('#btnCreateDemande').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(950)){
										  $('#pageCreateDemande').attr('operation', 'create');
                                          copris.demande.showPageCreateDemande();
										  }
										  });
			  $('#btnCreateDemandeBatiment').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                                var idbat=$('#pageListDemande').attr('idbat');
                                            $('#pageCreateDemande').attr('operation', 'create');
                                            copris.demande.showPageCreateDemande($('#pageListDemande').attr('idbat'));
										  }
										  });
			  $('.btnHome').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                            $('#listCopros').html('');
                                            copris.copro.listerCopros();
                                            eugena.log("copris.copro.listerCopros() index");
										  }
										  });
			  $('#btnEditDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(1000)){
												$('#pageCreateDemande').attr('operation', 'edit');
												$('#pageCreateDemande').attr('currentDemande', $('#idDemande').attr('nid'));
												copris.demande.showPageEditDemande($('#idDemande').attr('nid'));
										}
									});
			  $("#demandeDescription h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#lieuDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#pieceJointe h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#motifRefusDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#intervenantDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $('#listCopro').change(function(e){
									 $("#listCopro option[value='0']").remove();
									 copris.immeuble.buildList($('#listCopro').val(), true, 0);
									 $('#blockListBat').hide();
									 eugena.log("#listCopro");
									 });
			  $('#listIm').change(function(e){
									$("#listIm option[value='0']").remove();
									 copris.batiment.buildList($('#listIm').val(), true, 0);
									 });
			  $('#listBat').change(function(e){
								  $("#listBat option[value='0']").remove();
								  });
			  $('.btnValidateCreateDemande').click(function(e){
								if(!eugena.clickEnCours(1000)){
										if($('#pageCreateDemande').attr('operation') == 'create')
												   copris.demande.create(); //eugena.changePage($('#pageListDemande'));
										else
												   copris.demande.edit($('#pageCreateDemande').attr('currentDemande'));
								}  
                                 smallImage.style.display = 'none';
                                 smallImage.src = "";
							});
			  $('#containerListDemande #inputFilter').bind('blur', function(e){

														   });
              $('#file').bind(clickEvent, function(e){
                                     eugena.log("getImage()");
                                     getImage();
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
              $('#fileCapture').bind(clickEvent, function(e){
                                     eugena.log("captureImage()");
                                     captureImage();          
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
                              });
                        

            document.addEventListener("touchmove",function (e) {
                                                                    $("#listCopros a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#containerListDemande").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    e.preventDefault();                                                               
                                                                }, false);
            

            // A button will call this function
            //
            function captureImage() {
                // Launch device camera application, 
                // allowing user to capture up to 2 images
                eugena.log("captureImage1");
                navigator.device.capture.captureImage(captureSuccess, captureError);
                eugena.log("captureImage2");
                eugena.log("captureImage3 "+eugena.fileSystem.root.fullPath);
            }
            // Called when capture operation is finished
            //
            function captureSuccess(mediaFiles) {
                eugena.log("captureSuccess");
                var files = mediaFiles;
                eugena.log("captureSuccess2 "+JSON.stringify(files) + " pathFileDemande " + pathFileDemande);
                media = $('#fileCapture').attr('media',JSON.stringify(files));
                fileName = $('#fileCapture').attr('fileName',files[0].name);
                path = $('#fileCapture').attr('path',files[0].fullPath);
                choix = $('#fileCapture').attr('choix', "oui");
                eugena.log("media "+ media + " fileName " + files[0].name +" path " + files[0].fullPath + " choix " + choix);
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = files[0].fullPath;
                eugena.log("smallImage.src "+smallImage.src);
                uploadFile(mediaFiles, 675, 677, 678, 690, 431);
            }

            // Called if something bad happens.
            // 
            function captureError(error) {
                eugena.log("captureError");
                var msg = 'An error occurred during capture: ' + error.code;
                //navigator.notification.alert(msg, null, 'Uh oh!');
            }


            // Upload files to server
            function uploadFile(mediaFile, idCopro, idIm, idBat, nid, uid) {//captureImage
                    eugena.log("uploadFile captureImage " + pathFileDemande);
                    var ft = new FileTransfer();
                    var path = $('#fileCapture').attr('path');
                    var name = $('#fileCapture').attr('fileName');
                    eugena.log("mediaFile.fullPath " + path + " mediaFile.name " + name);
                    var options = new FileUploadOptions();
                    options.fileKey="file";
                    eugena.log("uploadFile cap2");
                    options.fileName=name;//imageURI.substr(imageURI.lastIndexOf('/')+1);
                    options.headers = { "Connection":"close" };
                    options.chunkedMode = false;
                    options.mimeType="image/jpeg";
                    var params = {};
                    params.uid = uid;
                    params.nid = nid;
                    params.path = pathFileDemande;
                    eugena.log("options");

                    options.params = params;
            
                var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
                ft.upload(path,
                    encodeURI(uriServeur),
                    function(result) {
                        console.log('Upload success: ' + result.responseCode);
                        console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                        eugena.log("fileTransfer.download");
                        eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                                function(entry){
                                  console.log('Demandes success');//Demandes
                                  entry.getDirectory("copro"+idCopro, {create: true},
                                  function(entry){
                                           console.log('copro '+idCopro+' success');//Demandes/copro229
									entry.getDirectory("immeuble"+idIm, {create: true},
                                      function(entry){
                                               console.log('immeuble '+idIm+' success');//Demandes/copro229/immeuble231
										  entry.getDirectory("batiment"+idBat, {create: true},
                                          function(entry){
                                                   console.log('batiment '+idBat+' success');//Demandes/copro229/immeuble231/batiment234
												entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                                    console.log('demande '+nid+' success');//Demandes/copro229/immeuble231/batiment234/demande568
                                                    iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    var pathTemp = $('#fileCapture').attr('path');
                                                    eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                                    console.log("iOSFilePath "+iOSFilePath);
                                                    //copris.demande.showDemande(nid);
                                                    /*$.mobile.loading( 'hide');*/
                                            },getDirfail);
                                        },getDirfail);
                                    },getDirfail);
                                 }, getDirfail);
                    },
                    function(error) {
                        console.log('Error uploading file ' + path + ': ' + error.code);
                        /*copris.demande.showDemande(nid);
                        $.mobile.loading( 'hide');*/
                        alert("Echec du transfert de la photo");
                    },
                    options);
            }
    function getDirSuccess(dirEntry){
        eugena.log("repertoires crees "+name);
        var pathTemp = $('#fileCapture').attr('path');
        eugena.log("pathTemp "+JSON.stringify(pathTemp));
        eugena.log("directory reader cree "+JSON.stringify(dirEntry));
    }
    
    function onSuccessresolve(fileEntry) {
    console.log("fileEntry success : "+fileEntry.name);
    }
    function onErrorresolve(fileEntry) {
    console.log("fileEntry error : "+fileEntry.name);
    }
    function readerSuccess(entry){
        eugena.log("readerSuccess "+iOSFilePath);
        eugena.log("Fichier a uploader dans iOS"+JSON.stringify(entry));
    // copy the file to a new directory and rename it
        entry.copyTo(iOSFilePath, entry.name, successcopyTo, failcopyTo);
                         // Request a file system
                         var name = $('#fileCapture').attr('fileName');
                         var path = $('#fileCapture').attr('path');
        eugena.log("name : "+name);
        eugena.log("path : "+path+ " newFilePath "+newFilePath);
        }
                // Called upon successful File System request
                function requestFileSystemSuccess(fileSys){
                    // Get the source directory
                    eugena.log("requestFileSystemSuccess");
                    fileSys.root.getDirectory(iOSFilePath, {create: false, exclusive:false}, getDestDirSuccess, getDestDirError);
                    eugena.log("fileSys "+JSON.stringify(fileSys));
                    }
                    // Called upon successful Get Of Destination Directory
                    function getDestDirSuccess(directory){
                    eugena.log("getDestDirSuccess");
                    eugena.log("getDestDirSuccess "+JSON.stringify(directory));
                        name = $('#fileCapture').attr('fileName');
                        fullDestPath = directory.fullPath + '/' + name;
                        eugena.log("fullDestPath "+fullDestPath);
                        // Make the move
                        entry.copyTo(directory, name, moveSuccess, moveError);
                        eugena.log("copyTo");
                        }
                        function moveSuccess(){
                            console.log("Successful copy of " + pathTemp + " to " + newFilePath);
                        }
                        function moveError(error){
                            console.log("copyError code: " + JSON.stringify(error));
                        }
                    
                    // Get Destination Dir Failure
                    function getDestDirError(error){
                        console.log("getDestDirError code: " + JSON.stringify(error));
                    }
                
                // File System Request Failure
                function requestFileSystemError(error){
                    console.log("requestFileSystemError code: " + JSON.stringify(error));
                }
    

     function copiedFile(fileEntry) { 
            console.log("copied file: " + fileEntry.fullPath); 
            // !!! assumes you have an img element on page with id=largeImage 
            var largeImage = document.getElementById('largeImage'); 
            largeImage.style.display = 'block'; 
            largeImage.src = fileEntry.toURI() + "?" + (new Date()).getTime(); 
        } 

        // file system fail 
        function fsFail(error) { 
            console.log("failed with error code: " + error.code); 
        }; 
    function successcopyTo(entry) {
    console.log("New Path: " + entry.fullPath);
    }

    function failcopyTo(error) {
        eugena.log("failcopyTo : "+JSON.stringify(error));//1 --> FILE_NOT_FOUND_ERR
    }
    function getDirfail(){
        eugena.log("repertoire n'a pas pu etre cree");
    }
           
            function getImage() {
                  // Retrieve image file location from specified source
                  eugena.log("getImage");
                  navigator.camera.getPicture(recupAttributImage, function(message) {
                              //alert('get picture failed');
                          },{
                              quality: 50,
                              destinationType: navigator.camera.DestinationType.FILE_URI,
                              sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                          }
                  );

              }
            function recupAttributImage(imageURI) {
              filePath = imageURI;
              fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
                $('#file').attr('fileName',fileName);
                $('#file').attr('path',filePath);
                $('#file').attr('choix', "oui");
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = imageURI;
                uploadPhoto(imageURI, 675, 677, 678, 690, 431);
            }
         function uploadPhoto(imageURI, idCopro, idIm, idBat, nid, uid) {
            var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
            eugena.log("uploadPhoto1"+imageURI);
            var options = new FileUploadOptions();
            options.fileKey="file";
            eugena.log("uploadPhoto2 "+pathFileDemande);
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+".jpg";
            //options.chunkedMode = false;            
            options.headers = { "Connection":"close" };
            options.chunkedMode = false;
            options.mimeType="image/jpeg";
            
            var params = {};
            
            params.uid = uid;
            params.nid = nid;
            params.path = pathFileDemande;
            eugena.log("options");

            options.params = params;
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(uriServeur),
                    function(result) {
                console.log('Upload success uploadPhoto: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                eugena.log("fileTransfer.download");
                eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                        function(entry){
                          console.log('Demandes success');//Demandes
                          entry.getDirectory("copro"+idCopro, {create: true},
                          function(entry){
                                   console.log('copro '+idCopro+' success');//Demandes/copro229
							entry.getDirectory("immeuble"+idIm, {create: true},
                              function(entry){
                                       console.log('immeuble '+idIm+' success');//Demandes/copro229/immeuble231
								  entry.getDirectory("batiment"+idBat, {create: true},
                                  function(entry){
                                           console.log('batiment '+idBat+' success');//Demandes/copro229/immeuble231/batiment234
										entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                            console.log('demande '+nid+' success');//Demandes/copro229/immeuble231/batiment234/demande568
                                            iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            var pathTemp = $('#fileCapture').attr('path');
                                            eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                            console.log("iOSFilePath "+iOSFilePath);
                                            //copris.demande.showDemande(nid);
                                            /*$.mobile.loading( 'hide');*/
                                    },getDirfail);
                                },getDirfail);
                            },getDirfail);
                         }, getDirfail);
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
                /*copris.demande.showDemande(nid);
                $.mobile.loading( 'hide');*/
                alert("Echec du transfert de la photo");
            }, options);
            //ft.upload(imageURI, encodeURI(uriServeur), win, fail, options,true);
        }
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent+ " " + pathFileDemande);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        



            if(wismobile){
					app.initialize();
                    console.log("wismobile");
				}else{
					app.receivedEvent('deviceready');
                    console.log("wischrome");
				}
        







            (function() {
                var jasmineEnv = jasmine.getEnv();
                jasmineEnv.updateInterval = 1000;

                var htmlReporter = new jasmine.HtmlReporter();

                jasmineEnv.addReporter(htmlReporter);

                jasmineEnv.specFilter = function(spec) {
                    return htmlReporter.specFilter(spec);
                };

                var currentWindowOnload = window.onload;

                window.onload = function() {
                    if (currentWindowOnload) {
                        currentWindowOnload();
                    }
                    execJasmine();
                };

                function execJasmine() {
                    jasmineEnv.execute();
                }
            })();
        






            /**
             * Initialisation de jQueryMobile
             * Surcharge des paramËtres de base de jquery
             **/
            $( document ).bind("mobileinit", function(){
                               //fix crossdomain
							   $.mobile.allowCrossDomainPages = true;
                               $.mobile.fixedToolbars.show(false);
                               $.mobile.fixedToolbars.setTouchToggleEnabled(true);
                               $.mobile.loadingMessage =  "Chargement en cours";
                               $.mobile.defaultPageTransition = 'none';
                               //$.mobile.defaultHomeScroll = 0;
                               $("[data-role=header]").fixedtoolbar({ transition: "none" });
                               /*var android_version = navigator.userAgent.match(/Android [\d+\.]{3,5}/)[0].replace('Android ','');
                               eugena.log('android version '+android_version);
                               if(android_version === '2.3.3'){
                            	   eugena.log('android version 2.3.3 '+android_version);
                            	   //$.mobile.selectmenu.prototype.options.nativeMenu = false;
                            	}*/
                               });
        


















            /**
             * Initialisation des variables qui seront utilisÈes dans l'application
             * @reset : passer ‡ true pour vider la base de donnÈes
             * @debug : pour afficher les requetes dans la console de log
             * @wisipad : pour definir si le device est un iPad
             * @wisandroid : pour definir si le device utilise Android
             * @wischrome : pour definir si le navigateur utilisÈ est chrome
             * @windowHeight : pour rÈcupÈrer la hauteur de la fenetre window
             * @userAgent : pour rÈcupÈrer le userAgent du device
             * @clickEvent : pour definir le type d'ÈvËnement ‡ effectuer sur les actions en fonction du device (tap ou click)
             * @deviceUUID : pour rÈcupÈrer l'id du device
             **/
            var reset = false;
            var debug = true;
            var debugLog = true;
            var wisipad = false;
            var wismobile = false;
            var wisandroid = false;
            var wischrome = false;
			var sqllite = false;
            var windowHeight;
            var userAgent = navigator.userAgent.toLowerCase();
            var clickEvent;
            var deviceUUID;
            var pathFileDemande = "";
            
            
            /**
             * Test si le device utilisÈ est un mobile ou un iPad
             **/
            if( navigator.platform == "iPhone" || navigator.platform == "iPhone Simulator" || navigator.platform == "iPad" || (userAgent.indexOf("android") != -1))
            wismobile = true;
            
            if (userAgent.indexOf("ipad")!=-1) wisipad=true;
            var isMobile = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1 || userAgent.indexOf('mobile')!= -1 || userAgent.indexOf('ipad')!= -1 || userAgent.indexOf('android')!= -1) ? true : false;
            
            clickEvent = isMobile ? 'tap' : 'click';
            if(userAgent.indexOf('chrome') !=-1){clickEvent = 'click'; wischrome = true;}
            if(userAgent.indexOf('android') !=-1) wisandroid = true;
            eugena.log(userAgent);
            
            /**
             * Function appelee lorsque la page est chargÈ
             * 
             **/
            $(document).ready(function(){
				//pageinit
				$('#pageAccueil').bind( 'pageinit',function(event){
					eugena.log('pageinit');
				}); 
				//pageshow
				$('#pageAccueil').bind( 'pageshow',function(event){
					eugena.log('pageshow');
                    $('form.ui-listview-filter').remove();
				});
                $('input[id="name"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="name" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit name');
                                                                   //copris.login();
                                                                 }
                                                                 });
                $('input[id="pass"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="pass" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit pass');
                                                                   //copris.login();
                                                                 }
                                                                 });
                $('#pageListDemande').bind('pageshow', function(event) {
                    eugena.log("form.ui-listview-filter");
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche demandes...');
                });
              
                $('#pageCreateDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageCreateDemande');
                });
                
                $('#pageDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageDemande');
                });
                $('#pageDemande').bind( 'pagebeforeshow',function(event){
                    eugena.log('pagebeforeshow pageDemande');
                });
                
                $('#pageListCopros').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche copropriétés...');
                    eugena.log('pageshow pageListCopros');
                });
					
                $('#pageListImmeubles').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche immeubles...');
                    eugena.log('pageshow pageListImmeubles');
                    $('#listImmeubles').listview('refresh');
                });
					
                $('#pageListBatiments').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche batiments...');
                    $('#listBatiments').listview('refresh');
                    eugena.log('pageshow pageListBatiments');
                });
				
                $('#pageAPropos').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageAPropos');
                });				 
				$('#submitLogin').bind(clickEvent, function(e){
                                       eugena.log('click submit');
                                         copris.login();
                                            $('#listCopros').html('');
				});
				$('.btnLogout').bind(clickEvent, function(e){
                                     eugena.log('Click on logout button');
                                     if(!eugena.clickEnCours(400)){
                                     eugena.log('Call copris.logout');
                                        copris.logout();
                                        eugena.deleteDataLocalStorage('uid');
                                        eugena.deleteDataLocalStorage('pass');
                                        eugena.deleteDataLocalStorage('name');
                                     }
				});
				$('.btnInfo').bind(clickEvent, function(e){
                                     eugena.log('Click on info button');
                                     if(!eugena.clickEnCours(400)){
                                        eugena.changePage($('#pageApropos'));
                                        copris.aPropos.monCompte();
                                     }
				});                
			  $('li[rel="linkDemande"]').bind(clickEvent, function(e){
									 copris.demande.showDemande(this.attr('id'));
																});
			  $('#btnBackCopros').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                copris.copro.listerCopros();
                                                eugena.log('#btnBackCopros');
										}
										});
			  $('#btnBackImmeubles').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listImmeubles').html("");
                                                $('#listCopros').html("");         
                                                var idcopro=$('#pageListImmeubles').attr('idcopro');
                                                copris.immeuble.listerImmeubles($('#pageListImmeubles').attr('idcopro'));
                                                eugena.log('#btnBackImmeubles '+idcopro);
										}
										});
              // de la liste des demandes du batiment ibat à la liste des batiments de l'immeuble idimm                
			  $('#btnBackBatiments').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                $('#listImmeubles').html("");
                                                var idimm=$('#pageListBatiments').attr('idimm');
                                                copris.batiment.listerBatiments($('#pageListBatiments').attr('idimm'));
                                                eugena.log('#btnBackBatiments '+idimm);
										}
										});
              // page d'une demande à la liste des demandes du batiment ibat
			  $('#btnBackDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                var idbat=$('#pageListDemande').attr('idbat');
                                                copris.demande.showListDemande($('#pageListDemande').attr('idbat'));
                                                eugena.log('#btnBackDemande '+idbat);
										}
										});
			  $('#btnBackDemandeCreate').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
											  if($('#pageCreateDemande').attr('operation') == 'create'){
													copris.demande.showListDemande($('#pageListDemande').attr('idbat')); //eugena.changePage($('#pageListDemande'));
                                                }
											  else
													copris.demande.showDemande($('#pageCreateDemande').attr('currentDemande'));
										}
                                        smallImage.style.display = 'none';
                                        smallImage.src = "";
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #images').html("");
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #pasDImage').html("");
										});
			  $('#btnCreateDemande').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(950)){
										  $('#pageCreateDemande').attr('operation', 'create');
                                          copris.demande.showPageCreateDemande();
										  }
										  });
			  $('#btnCreateDemandeBatiment').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                                var idbat=$('#pageListDemande').attr('idbat');
                                            $('#pageCreateDemande').attr('operation', 'create');
                                            copris.demande.showPageCreateDemande($('#pageListDemande').attr('idbat'));
										  }
										  });
			  $('.btnHome').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                            $('#listCopros').html('');
                                            copris.copro.listerCopros();
                                            eugena.log("copris.copro.listerCopros() index");
										  }
										  });
			  $('#btnEditDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(1000)){
												$('#pageCreateDemande').attr('operation', 'edit');
												$('#pageCreateDemande').attr('currentDemande', $('#idDemande').attr('nid'));
												copris.demande.showPageEditDemande($('#idDemande').attr('nid'));
										}
									});
			  $("#demandeDescription h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#lieuDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#pieceJointe h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#motifRefusDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#intervenantDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $('#listCopro').change(function(e){
									 $("#listCopro option[value='0']").remove();
									 copris.immeuble.buildList($('#listCopro').val(), true, 0);
									 $('#blockListBat').hide();
									 eugena.log("#listCopro");
									 });
			  $('#listIm').change(function(e){
									$("#listIm option[value='0']").remove();
									 copris.batiment.buildList($('#listIm').val(), true, 0);
									 });
			  $('#listBat').change(function(e){
								  $("#listBat option[value='0']").remove();
								  });
			  $('.btnValidateCreateDemande').click(function(e){
								if(!eugena.clickEnCours(1000)){
										if($('#pageCreateDemande').attr('operation') == 'create')
												   copris.demande.create(); //eugena.changePage($('#pageListDemande'));
										else
												   copris.demande.edit($('#pageCreateDemande').attr('currentDemande'));
								}  
                                 smallImage.style.display = 'none';
                                 smallImage.src = "";
							});
			  $('#containerListDemande #inputFilter').bind('blur', function(e){

														   });
              $('#file').bind(clickEvent, function(e){
                                     eugena.log("getImage()");
                                     getImage();
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
              $('#fileCapture').bind(clickEvent, function(e){
                                     eugena.log("captureImage()");
                                     captureImage();          
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
                              });
                        

            document.addEventListener("touchmove",function (e) {
                                                                    $("#listCopros a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#containerListDemande").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    e.preventDefault();                                                               
                                                                }, false);
            

            // A button will call this function
            //
            function captureImage() {
                // Launch device camera application, 
                // allowing user to capture up to 2 images
                eugena.log("captureImage1");
                navigator.device.capture.captureImage(captureSuccess, captureError);
                eugena.log("captureImage2");
                eugena.log("captureImage3 "+eugena.fileSystem.root.fullPath);
            }
            // Called when capture operation is finished
            //
            function captureSuccess(mediaFiles) {
                eugena.log("captureSuccess");
                var files = mediaFiles;
                eugena.log("captureSuccess2 "+JSON.stringify(files) + " pathFileDemande " + pathFileDemande);
                media = $('#fileCapture').attr('media',JSON.stringify(files));
                fileName = $('#fileCapture').attr('fileName',files[0].name);
                path = $('#fileCapture').attr('path',files[0].fullPath);
                choix = $('#fileCapture').attr('choix', "oui");
                eugena.log("media "+ media + " fileName " + files[0].name +" path " + files[0].fullPath + " choix " + choix);
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = files[0].fullPath;
                eugena.log("smallImage.src "+smallImage.src);
            }

            // Called if something bad happens.
            // 
            function captureError(error) {
                eugena.log("captureError");
                var msg = 'An error occurred during capture: ' + error.code;
                //navigator.notification.alert(msg, null, 'Uh oh!');
            }


            // Upload files to server
            function uploadFile(mediaFile, idCopro, idIm, idBat, nid, uid) {//captureImage
                    eugena.log("uploadFile captureImage " + pathFileDemande);
                    var ft = new FileTransfer();
                    var path = $('#fileCapture').attr('path');
                    var name = $('#fileCapture').attr('fileName');
                    eugena.log("mediaFile.fullPath " + path + " mediaFile.name " + name);
                    var options = new FileUploadOptions();
                    options.fileKey="file";
                    eugena.log("uploadFile cap2");
                    options.fileName=name;//imageURI.substr(imageURI.lastIndexOf('/')+1);
                    options.headers = { "Connection":"close" };
                    options.chunkedMode = false;
                    options.mimeType="image/jpeg";
                    var params = {};
                    params.uid = uid;
                    params.nid = nid;
                    params.path = pathFileDemande;
                    eugena.log("options");

                    options.params = params;
            
                var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
                ft.upload(path,
                    encodeURI(uriServeur),
                    function(result) {
                        console.log('Upload success: ' + result.responseCode);
                        console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                        eugena.log("fileTransfer.download");
                        eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                                function(entry){
                                  console.log('Demandes success');//Demandes
                                  entry.getDirectory("copro"+idCopro, {create: true},
                                  function(entry){
                                           console.log('copro '+idCopro+' success');//Demandes/copro229
									entry.getDirectory("immeuble"+idIm, {create: true},
                                      function(entry){
                                               console.log('immeuble '+idIm+' success');//Demandes/copro229/immeuble231
										  entry.getDirectory("batiment"+idBat, {create: true},
                                          function(entry){
                                                   console.log('batiment '+idBat+' success');//Demandes/copro229/immeuble231/batiment234
												entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                                    console.log('demande '+nid+' success');//Demandes/copro229/immeuble231/batiment234/demande568
                                                    iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    var pathTemp = $('#fileCapture').attr('path');
                                                    eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                                    console.log("iOSFilePath "+iOSFilePath);
                                                    copris.demande.showDemande(nid);
                                                    /*$.mobile.loading( 'hide');*/
                                            },getDirfail);
                                        },getDirfail);
                                    },getDirfail);
                                 }, getDirfail);
                    },
                    function(error) {
                        console.log('Error uploading file ' + path + ': ' + error.code);
                        /*copris.demande.showDemande(nid);
                        $.mobile.loading( 'hide');*/
                        alert("Echec du transfert de la photo");
                    },
                    options);
            }
    function getDirSuccess(dirEntry){
        eugena.log("repertoires crees "+name);
        var pathTemp = $('#fileCapture').attr('path');
        eugena.log("pathTemp "+JSON.stringify(pathTemp));
        eugena.log("directory reader cree "+JSON.stringify(dirEntry));
    }
    
    function onSuccessresolve(fileEntry) {
    console.log("fileEntry success : "+fileEntry.name);
    }
    function onErrorresolve(fileEntry) {
    console.log("fileEntry error : "+fileEntry.name);
    }
    function readerSuccess(entry){
        eugena.log("readerSuccess "+iOSFilePath);
        eugena.log("Fichier a uploader dans iOS"+JSON.stringify(entry));
    // copy the file to a new directory and rename it
        entry.copyTo(iOSFilePath, entry.name, successcopyTo, failcopyTo);
                         // Request a file system
                         var name = $('#fileCapture').attr('fileName');
                         var path = $('#fileCapture').attr('path');
        eugena.log("name : "+name);
        eugena.log("path : "+path+ " newFilePath "+newFilePath);
        }
                // Called upon successful File System request
                function requestFileSystemSuccess(fileSys){
                    // Get the source directory
                    eugena.log("requestFileSystemSuccess");
                    fileSys.root.getDirectory(iOSFilePath, {create: false, exclusive:false}, getDestDirSuccess, getDestDirError);
                    eugena.log("fileSys "+JSON.stringify(fileSys));
                    }
                    // Called upon successful Get Of Destination Directory
                    function getDestDirSuccess(directory){
                    eugena.log("getDestDirSuccess");
                    eugena.log("getDestDirSuccess "+JSON.stringify(directory));
                        name = $('#fileCapture').attr('fileName');
                        fullDestPath = directory.fullPath + '/' + name;
                        eugena.log("fullDestPath "+fullDestPath);
                        // Make the move
                        entry.copyTo(directory, name, moveSuccess, moveError);
                        eugena.log("copyTo");
                        }
                        function moveSuccess(){
                            console.log("Successful copy of " + pathTemp + " to " + newFilePath);
                        }
                        function moveError(error){
                            console.log("copyError code: " + JSON.stringify(error));
                        }
                    
                    // Get Destination Dir Failure
                    function getDestDirError(error){
                        console.log("getDestDirError code: " + JSON.stringify(error));
                    }
                
                // File System Request Failure
                function requestFileSystemError(error){
                    console.log("requestFileSystemError code: " + JSON.stringify(error));
                }
    

     function copiedFile(fileEntry) { 
            console.log("copied file: " + fileEntry.fullPath); 
            // !!! assumes you have an img element on page with id=largeImage 
            var largeImage = document.getElementById('largeImage'); 
            largeImage.style.display = 'block'; 
            largeImage.src = fileEntry.toURI() + "?" + (new Date()).getTime(); 
        } 

        // file system fail 
        function fsFail(error) { 
            console.log("failed with error code: " + error.code); 
        }; 
    function successcopyTo(entry) {
    console.log("New Path: " + entry.fullPath);
    }

    function failcopyTo(error) {
        eugena.log("failcopyTo : "+JSON.stringify(error));//1 --> FILE_NOT_FOUND_ERR
    }
    function getDirfail(){
        eugena.log("repertoire n'a pas pu etre cree");
    }
           
            function getImage() {
                  // Retrieve image file location from specified source
                  eugena.log("getImage");
                  navigator.camera.getPicture(recupAttributImage, function(message) {
                              //alert('get picture failed');
                          },{
                              quality: 50,
                              destinationType: navigator.camera.DestinationType.FILE_URI,
                              sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                          }
                  );

              }
            function recupAttributImage(imageURI) {
              filePath = imageURI;
              fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
                $('#file').attr('fileName',fileName);
                $('#file').attr('path',filePath);
                $('#file').attr('choix', "oui");
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = imageURI;
            }
         function uploadPhoto(imageURI, idCopro, idIm, idBat, nid, uid) {
            var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
            eugena.log("uploadPhoto1"+imageURI);
            var options = new FileUploadOptions();
            options.fileKey="file";
            eugena.log("uploadPhoto2 "+pathFileDemande);
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+".jpg";
            options.headers = { "Connection":"close" };
            options.chunkedMode = false;
            options.mimeType="image/jpeg";
            
            var params = {};
            
            params.uid = uid;
            params.nid = nid;
            params.path = pathFileDemande;
            eugena.log("options");

            options.params = params;
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(uriServeur),
                    function(result) {
                console.log('Upload success uploadPhoto: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                eugena.log("fileTransfer.download");
                eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                        function(entry){
                          console.log('Demandes success');//Demandes
                          entry.getDirectory("copro"+idCopro, {create: true},
                          function(entry){
                                   console.log('copro '+idCopro+' success');//Demandes/copro229
							entry.getDirectory("immeuble"+idIm, {create: true},
                              function(entry){
                                       console.log('immeuble '+idIm+' success');//Demandes/copro229/immeuble231
								  entry.getDirectory("batiment"+idBat, {create: true},
                                  function(entry){
                                           console.log('batiment '+idBat+' success');//Demandes/copro229/immeuble231/batiment234
										entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                            console.log('demande '+nid+' success');//Demandes/copro229/immeuble231/batiment234/demande568
                                            iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            var pathTemp = $('#fileCapture').attr('path');
                                            eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                            console.log("iOSFilePath "+iOSFilePath);
                                            copris.demande.showDemande(nid);
                                            /*$.mobile.loading( 'hide');*/
                                    },getDirfail);
                                },getDirfail);
                            },getDirfail);
                         }, getDirfail);
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code);
                /*copris.demande.showDemande(nid);
                $.mobile.loading( 'hide');*/
                alert("Echec du transfert de la photo");
            }, options);
            //ft.upload(imageURI, encodeURI(uriServeur), win, fail, options,true);
        }
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent+ " " + pathFileDemande);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        



            if(wismobile){
					app.initialize();
                    console.log("wismobile");
				}else{
					app.receivedEvent('deviceready');
                    console.log("wischrome");
				}
        






            /**
             * Initialisation de jQueryMobile
             * Surcharge des paramËtres de base de jquery
             **/
            $( document ).bind("mobileinit", function(){
                               //fix crossdomain
							   $.mobile.allowCrossDomainPages = true;
                               $.mobile.fixedToolbars.show(false);
                               $.mobile.fixedToolbars.setTouchToggleEnabled(true);
                               $.mobile.loadingMessage =  "Chargement en cours";
                               $.mobile.defaultPageTransition = 'none';
                               $("[data-role=header]").fixedtoolbar({ transition: "none" });
                               });
        


















            /**
             * Initialisation des variables qui seront utilisÈes dans l'application
             * @reset : passer ‡ true pour vider la base de donnÈes
             * @debug : pour afficher les requetes dans la console de log
             * @wisipad : pour definir si le device est un iPad
             * @wisandroid : pour definir si le device utilise Android
             * @wischrome : pour definir si le navigateur utilisÈ est chrome
             * @windowHeight : pour rÈcupÈrer la hauteur de la fenetre window
             * @userAgent : pour rÈcupÈrer le userAgent du device
             * @clickEvent : pour definir le type d'ÈvËnement ‡ effectuer sur les actions en fonction du device (tap ou click)
             * @deviceUUID : pour rÈcupÈrer l'id du device
             **/
            var reset = false;
            var debug = false;
            var debugLog = false;
            var wisipad = false;
            var wismobile = false;
            var wisandroid = false;
            var wischrome = false;
			var sqllite = false;
            var windowHeight;
            var userAgent = navigator.userAgent.toLowerCase();
            var clickEvent;
            var deviceUUID;
            var pathFileDemande = "";
            
            
            /**
             * Test si le device utilisÈ est un mobile ou un iPad
             **/
            if( navigator.platform == "iPhone" || navigator.platform == "iPhone Simulator" || navigator.platform == "iPad" || (userAgent.indexOf("android") != -1))
            wismobile = true;
            
            if (userAgent.indexOf("ipad")!=-1) wisipad=true;
            var isMobile = (userAgent.indexOf('iphone') != -1 || userAgent.indexOf('ipod') != -1 || userAgent.indexOf('mobile')!= -1 || userAgent.indexOf('ipad')!= -1 || userAgent.indexOf('android')!= -1) ? true : false;
            
            clickEvent = isMobile ? 'tap' : 'click';
            if(userAgent.indexOf('chrome') !=-1){clickEvent = 'click'; wischrome = true;}
            if(userAgent.indexOf('android') !=-1) wisandroid = true;
            eugena.log(userAgent);
            
            /**
             * Function appelee lorsque la page est chargÈ
             * 
             **/
            $(document).ready(function(){
				//pageinit
				$('#pageAccueil').bind( 'pageinit',function(event){
					eugena.log('pageinit');
				}); 
				//pageshow
				$('#pageAccueil').bind( 'pageshow',function(event){
					eugena.log('pageshow');
                    $('form.ui-listview-filter').remove();
				});
                $('input[id="name"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="name" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit name');
                                                                 }
                                                                 });
                $('input[id="pass"]').bind('blur', function(e) {
                                                                 if($(this).attr('id')=="pass" && $(this).val()!='' && wismobile){                                                                    
                                                                   eugena.log('click submit pass');
                                                                 }
                                                                 });
                $('#pageListDemande').bind('pageshow', function(event) {
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche demandes...');
                });
              
                $('#pageCreateDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageCreateDemande');
                });
                
                $('#pageDemande').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageDemande');
                });
                $('#pageDemande').bind( 'pagebeforeshow',function(event){
                    eugena.log('pagebeforeshow pageDemande');
                });
                
                $('#pageListCopros').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche copropriétés...');
                    eugena.log('pageshow pageListCopros');
                });
					
                $('#pageListImmeubles').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche immeubles...');
                    eugena.log('pageshow pageListImmeubles');
                    $('#listImmeubles').listview('refresh');
                });
					
                $('#pageListBatiments').bind( 'pageshow',function(event){
                    $('.ui-listview-filter input').attr('placeholder', 'Recherche batiments...');
                    $('#listBatiments').listview('refresh');
                    eugena.log('pageshow pageListBatiments');
                });
				
                $('#pageAPropos').bind( 'pageshow',function(event){
                    eugena.log('pageshow pageAPropos');
                });				 
				$('#submitLogin').bind(clickEvent, function(e){
                                       eugena.log('click submit');
                                         copris.login();
                                            $('#listCopros').html('');
				});
				$('.btnLogout').bind(clickEvent, function(e){
                                     eugena.log('Click on logout button');
                                     if(!eugena.clickEnCours(400)){
                                        copris.logout();
                                        eugena.deleteDataLocalStorage('uid');
                                        eugena.deleteDataLocalStorage('pass');
                                        eugena.deleteDataLocalStorage('name');
                                     }
				});
				$('.btnInfo').bind(clickEvent, function(e){
                                     eugena.log('Click on info button');
                                     if(!eugena.clickEnCours(400)){
                                        eugena.changePage($('#pageApropos'));
                                        copris.aPropos.monCompte();
                                     }
				});                
			  $('li[rel="linkDemande"]').bind(clickEvent, function(e){
									 copris.demande.showDemande(this.attr('id'));
																});
			  $('#btnBackCopros').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                copris.copro.listerCopros();
                                                eugena.log('#btnBackCopros');
										}
										});
			  $('#btnBackImmeubles').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listImmeubles').html("");
                                                $('#listCopros').html("");         
                                                var idcopro=$('#pageListImmeubles').attr('idcopro');
                                                copris.immeuble.listerImmeubles($('#pageListImmeubles').attr('idcopro'));
                                                eugena.log('#btnBackImmeubles '+idcopro);
										}
										});
              // de la liste des demandes du batiment ibat à la liste des batiments de l'immeuble idimm                
			  $('#btnBackBatiments').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                $('#listImmeubles').html("");
                                                var idimm=$('#pageListBatiments').attr('idimm');
                                                copris.batiment.listerBatiments($('#pageListBatiments').attr('idimm'));
                                                eugena.log('#btnBackBatiments '+idimm);
										}
										});
              // page d'une demande à la liste des demandes du batiment ibat
			  $('#btnBackDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
                                                $('#listBatiments').html("");
                                                var idbat=$('#pageListDemande').attr('idbat');
                                                copris.demande.showListDemande($('#pageListDemande').attr('idbat'));
                                                eugena.log('#btnBackDemande '+idbat);
										}
										});
			  $('#btnBackDemandeCreate').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(950)){
											  if($('#pageCreateDemande').attr('operation') == 'create'){
													copris.demande.showListDemande($('#pageListDemande').attr('idbat'));
                                                }
											  else
													copris.demande.showDemande($('#pageCreateDemande').attr('currentDemande'));
										}
                                        smallImage.style.display = 'none';
                                        smallImage.src = "";
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #images').html("");
                                        $('#containerDemande #pieceJointe .ui-collapsible-content #pasDImage').html("");
										});
			  $('#btnCreateDemande').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(950)){
										  $('#pageCreateDemande').attr('operation', 'create');
                                          copris.demande.showPageCreateDemande();
										  }
										  });
			  $('#btnCreateDemandeBatiment').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                                var idbat=$('#pageListDemande').attr('idbat');
                                            $('#pageCreateDemande').attr('operation', 'create');
                                            copris.demande.showPageCreateDemande($('#pageListDemande').attr('idbat'));
										  }
										  });
			  $('.btnHome').bind(clickEvent, function(e){
										  if(!eugena.clickEnCours(400)){
                                            $('#listCopros').html('');
                                            copris.copro.listerCopros();
                                            eugena.log("copris.copro.listerCopros() index");
										  }
										  });
			  $('#btnEditDemande').bind(clickEvent, function(e){
										if(!eugena.clickEnCours(1000)){
												$('#pageCreateDemande').attr('operation', 'edit');
												$('#pageCreateDemande').attr('currentDemande', $('#idDemande').attr('nid'));
												copris.demande.showPageEditDemande($('#idDemande').attr('nid'));
										}
									});
			  $("#demandeDescription h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#lieuDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#pieceJointe h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#motifRefusDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $("#intervenantDemande h3").on("tap", function (event, ui) {
				    return false;
				});
			  $('#listCopro').change(function(e){
									 $("#listCopro option[value='0']").remove();
									 copris.immeuble.buildList($('#listCopro').val(), true, 0);
									 $('#blockListBat').hide();
									 eugena.log("#listCopro");
									 });
			  $('#listIm').change(function(e){
									$("#listIm option[value='0']").remove();
									 copris.batiment.buildList($('#listIm').val(), true, 0);
									 });
			  $('#listBat').change(function(e){
								  $("#listBat option[value='0']").remove();
								  });
			  $('.btnValidateCreateDemande').click(function(e){
								if(!eugena.clickEnCours(1000)){
										if($('#pageCreateDemande').attr('operation') == 'create')
												   copris.demande.create();
										else
												   copris.demande.edit($('#pageCreateDemande').attr('currentDemande'));
								}  
                                 smallImage.style.display = 'none';
                                 smallImage.src = "";
							});
			  $('#containerListDemande #inputFilter').bind('blur', function(e){

														   });
              $('#file').bind(clickEvent, function(e){
                                     eugena.log("getImage()");
                                     getImage();
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
              $('#fileCapture').bind(clickEvent, function(e){
                                     eugena.log("captureImage()");
                                     captureImage();          
                                     smallImage.style.display = 'none';
                                     smallImage.src = "";
																});
                              });
                        

            document.addEventListener("touchmove",function (e) {
                                                                    $("#listCopros a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#listImmeubles a").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    $("#containerListDemande").unbind(clickEvent, function(e){e.preventDefault();eugena.log("touchmove preventDefault");});
                                                                    e.preventDefault();                                                               
                                                                }, false);
            

            // A button will call this function
            //
            function captureImage() {
                // Launch device camera application, 
                // allowing user to capture up to 2 images
                navigator.device.capture.captureImage(captureSuccess, captureError);
                eugena.log("captureImage "+eugena.fileSystem.root.fullPath);
            }
            // Called when capture operation is finished
            //
            function captureSuccess(mediaFiles) {
                var files = mediaFiles;
                eugena.log("captureSuccess "+JSON.stringify(files) + " pathFileDemande " + pathFileDemande);
                media = $('#fileCapture').attr('media',JSON.stringify(files));
                fileName = $('#fileCapture').attr('fileName',files[0].name);
                path = $('#fileCapture').attr('path',files[0].fullPath);
                choix = $('#fileCapture').attr('choix', "oui");
                eugena.log("media "+ media + " fileName " + files[0].name +" path " + files[0].fullPath + " choix " + choix);
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = files[0].fullPath;
                eugena.log("smallImage.src "+smallImage.src);
            }

            // Called if something bad happens.
            // 
            function captureError(error) {
                eugena.log("captureError");
                var msg = 'An error occurred during capture: ' + error.code;
            }


            // Upload files to server
            function uploadFile(mediaFile, idCopro, idIm, idBat, nid, uid,nbUpload) {//captureImage
            		$.mobile.loading( 'show', { theme: "c", textVisible: true,text: "Sauvegarde de la photo", html: "" });
                    eugena.log("uploadFile captureImage " + pathFileDemande);
                    var ft = new FileTransfer();
                    var path = $('#fileCapture').attr('path');
                    var name = $('#fileCapture').attr('fileName');
                    eugena.log("mediaFile.fullPath " + path + " mediaFile.name " + name);
                    var options = new FileUploadOptions();
                    options.fileKey="file";
                    options.fileName=name;
                    options.headers = { "Connection":"close" };
                    options.chunkedMode = false;
                    options.mimeType="image/jpeg";
                    var params = {};
                    params.uid = uid;
                    params.nid = nid;
                    params.path = pathFileDemande;
                    eugena.log("options");

                    options.params = params;
                    nbUpload++;
                var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
                ft.upload(path,
                    encodeURI(uriServeur),
                    function(result) {
                        console.log('Upload success: ' + result.responseCode);
                        console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                        eugena.log("fileTransfer.download");
                        eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                                function(entry){
                                  console.log('Demandes success');
                                  entry.getDirectory("copro"+idCopro, {create: true},
                                  function(entry){
                                           console.log('copro '+idCopro+' success');
									entry.getDirectory("immeuble"+idIm, {create: true},
                                      function(entry){
                                               console.log('immeuble '+idIm+' success');
										  entry.getDirectory("batiment"+idBat, {create: true},
                                          function(entry){
                                                   console.log('batiment '+idBat+' success');
												entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                                    console.log('demande '+nid+' success');
                                                    iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                                    var pathTemp = $('#fileCapture').attr('path');
                                                    eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                                    console.log("iOSFilePath "+iOSFilePath);
                                                    copris.demande.showDemande(nid);
                                                    $.mobile.loading( 'hide');
                                            },getDirfail);
                                        },getDirfail);
                                    },getDirfail);
                                 }, getDirfail);
                    },
                    function(error) {
                    	console.log('Error uploading file ' + path + ': ' + error.code+" nbUpload "+nbUpload);
                        $.mobile.loading( 'hide');
                        if(nbUpload<=2){
                        	uploadFile(media, idCopro, idIm, idBat, nid, uid);
                        	nbUpload++;
                        }                        
                        else{
                        	alert("Echec du transfert de la photo");                        	
                        }
                    },
                    options);
            }
    function getDirSuccess(dirEntry){
        eugena.log("repertoires crees "+name);
        var pathTemp = $('#fileCapture').attr('path');
        eugena.log("pathTemp "+JSON.stringify(pathTemp));
        eugena.log("directory reader cree "+JSON.stringify(dirEntry));
    }
    
    function onSuccessresolve(fileEntry) {
    console.log("fileEntry success : "+fileEntry.name);
    }
    function onErrorresolve(fileEntry) {
    console.log("fileEntry error : "+fileEntry.name);
    }
    function readerSuccess(entry){
        eugena.log("readerSuccess "+iOSFilePath);
        eugena.log("Fichier a uploader dans iOS"+JSON.stringify(entry));
    // copy the file to a new directory and rename it
        entry.copyTo(iOSFilePath, entry.name, successcopyTo, failcopyTo);
                         // Request a file system
                         var name = $('#fileCapture').attr('fileName');
                         var path = $('#fileCapture').attr('path');
        eugena.log("name : "+name);
        eugena.log("path : "+path+ " newFilePath "+newFilePath);
        }
                // Called upon successful File System request
                function requestFileSystemSuccess(fileSys){
                    // Get the source directory
                    eugena.log("requestFileSystemSuccess");
                    fileSys.root.getDirectory(iOSFilePath, {create: false, exclusive:false}, getDestDirSuccess, getDestDirError);
                    eugena.log("fileSys "+JSON.stringify(fileSys));
                    }
                    // Called upon successful Get Of Destination Directory
                    function getDestDirSuccess(directory){
                    eugena.log("getDestDirSuccess "+JSON.stringify(directory));
                        name = $('#fileCapture').attr('fileName');
                        fullDestPath = directory.fullPath + '/' + name;
                        eugena.log("fullDestPath "+fullDestPath);
                        // Make the move
                        entry.copyTo(directory, name, moveSuccess, moveError);
                        eugena.log("copyTo");
                        }
                        function moveSuccess(){
                            console.log("Successful copy of " + pathTemp + " to " + newFilePath);
                        }
                        function moveError(error){
                            console.log("copyError code: " + JSON.stringify(error));
                        }
                    
                    // Get Destination Dir Failure
                    function getDestDirError(error){
                        console.log("getDestDirError code: " + JSON.stringify(error));
                    }
                
                // File System Request Failure
                function requestFileSystemError(error){
                    console.log("requestFileSystemError code: " + JSON.stringify(error));
                }
    

     function copiedFile(fileEntry) { 
            console.log("copied file: " + fileEntry.fullPath); 
            // !!! assumes you have an img element on page with id=largeImage 
            var largeImage = document.getElementById('largeImage'); 
            largeImage.style.display = 'block'; 
            largeImage.src = fileEntry.toURI() + "?" + (new Date()).getTime(); 
        } 

        // file system fail 
        function fsFail(error) { 
            console.log("failed with error code: " + error.code); 
        }; 
    function successcopyTo(entry) {
    console.log("New Path: " + entry.fullPath);
    }

    function failcopyTo(error) {
        eugena.log("failcopyTo : "+JSON.stringify(error));//1 --> FILE_NOT_FOUND_ERR
    }
    function getDirfail(){
        eugena.log("repertoire n'a pas pu etre cree");
    }
           
            function getImage() {
                  // Retrieve image file location from specified source
                  eugena.log("getImage");
                  navigator.camera.getPicture(recupAttributImage, function(message) {
                          },{
                              quality: 50,
                              destinationType: navigator.camera.DestinationType.FILE_URI,
                              sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                          }
                  );

              }
            function recupAttributImage(imageURI) {
              filePath = imageURI;
              fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
                $('#file').attr('fileName',fileName);
                $('#file').attr('path',filePath);
                $('#file').attr('choix', "oui");
                var smallImage = document.getElementById('smallImage');
                smallImage.style.display = 'block';
                smallImage.src = imageURI;
            }
         function uploadPhoto(imageURI, idCopro, idIm, idBat, nid, uid,nbUpload) {
        	$.mobile.loading( 'show', { theme: "c", textVisible: true,text: "Sauvegarde de la photo", html: "" });
            var uriServeur = copris.path+"/?q=copris/demande/get/image/service";
            eugena.log("uploadPhoto "+imageURI);
            var options = new FileUploadOptions();
            options.fileKey="file";
            eugena.log("uploadPhoto "+pathFileDemande);
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+".jpg";
            options.headers = { "Connection":"close" };
            options.chunkedMode = false;
            options.mimeType="image/jpeg";
            
            var params = {};
            
            params.uid = uid;
            params.nid = nid;
            params.path = pathFileDemande;
            eugena.log("options");
			
            options.params = params;
            nbUpload++;
            var ft = new FileTransfer();
            ft.upload(imageURI, encodeURI(uriServeur),
                    function(result) {
                console.log('Upload success uploadPhoto: ' + result.responseCode);
                console.log(result.bytesSent + ' bytes sent '+path+ " pathFileDemandess " + pathFileDemande);
                eugena.log("fileTransfer.download");
                eugena.fileSystem.root.getDirectory("Demandes", {create: true, exclusive: false},
                        function(entry){
                          console.log('Demandes success');
                          entry.getDirectory("copro"+idCopro, {create: true},
                          function(entry){
                                   console.log('copro '+idCopro+' success');
							entry.getDirectory("immeuble"+idIm, {create: true},
                              function(entry){
                                       console.log('immeuble '+idIm+' success');
								  entry.getDirectory("batiment"+idBat, {create: true},
                                  function(entry){
                                           console.log('batiment '+idBat+' success');
										entry.getDirectory("demande"+nid, {create: true},getDirSuccess,getDirfail);
                                            console.log('demande '+nid+' success');
                                            iOSFilePath = eugena.fileSystem.root.fullPath+"/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            newFilePath = "/Demandes/copro"+idCopro+"/immeuble"+idIm+"/batiment"+idBat+"/demande"+nid;
                                            var pathTemp = $('#fileCapture').attr('path');
                                            eugena.log("pathTemp "+JSON.stringify(pathTemp));
                                            console.log("iOSFilePath "+iOSFilePath);
                                            $.mobile.loading( 'hide');
                                            copris.demande.showDemande(nid);                                            
                                    },getDirfail);
                                },getDirfail);
                            },getDirfail);
                         }, getDirfail);
            },
            function(error) {
                console.log('Error uploading file ' + path + ': ' + error.code+" nbUpload "+nbUpload);
                $.mobile.loading( 'hide');
                if(nbUpload==1){
                	eugena.log("gallerie error back "+nbUpload);
                	uploadPhoto(path, idCopro, idIm, idBat, nid, uid);
                	nbUpload=5;
                }                        
                else{
                	alert("Echec du transfert de la photo");                        	
                }
            }, options);
        }
        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent+ " " + pathFileDemande);
        }

        function fail(error) {
            alert("An error has occurred: Code = " + error.code);
            console.log("upload error source " + error.source);
            console.log("upload error target " + error.target);
        }

        



            if(wismobile){
					app.initialize();
                    console.log("wismobile");
				}else{
					app.receivedEvent('deviceready');
                    console.log("wischrome");
				}
        

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
describe('app', function() {
    describe('initialize', function() {
        it('should bind deviceready', function() {
            runs(function() {
                spyOn(app, 'onDeviceReady');
                app.initialize();
                helper.trigger(window.document, 'deviceready');
            });

            waitsFor(function() {
                return (app.onDeviceReady.calls.length > 0);
            }, 'onDeviceReady should be called once', 500);

            runs(function() {
                expect(app.onDeviceReady).toHaveBeenCalled();
            });
        });
    });

    describe('onDeviceReady', function() {
        it('should report that it fired', function() {
            spyOn(app, 'receivedEvent');
            app.onDeviceReady();
            expect(app.receivedEvent).toHaveBeenCalledWith('deviceready');
        });
    });

    describe('receivedEvent', function() {
        beforeEach(function() {
            var el = document.getElementById('stage');
            el.innerHTML = ['<div id="deviceready">',
                            '    <p class="event listening">Listening</p>',
                            '    <p class="event received">Received</p>',
                            '</div>'].join('\n');
        });

        it('should hide the listening element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .listening', 'display');
            expect(displayStyle).toEqual('none');
        });

        it('should show the received element', function() {
            app.receivedEvent('deviceready');
            var displayStyle = helper.getComputedStyle('#deviceready .received', 'display');
            expect(displayStyle).toEqual('block');
        });
    });
});


/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    windowHeight : document.documentElement.clientHeight,
    windowWidth : document.documentElement.clientWidth,
    pictureSource : "",
    destinationType :"",
    // Application Constructor
    initialize: function() {
        console.log("initialize");
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        eugena.log("bindEvents");
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("offline", app.onOffline, false);
        document.addEventListener("online", app.onLine, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        eugena.log("onDeviceReady");
            app.checkConnection();
                app.pictureSource=navigator.camera.PictureSourceType;
                app.destinationType=navigator.camera.DestinationType;// Retrieve image file location from specified source
            app.receivedEvent('deviceready');
            $('#listCopros').html('');
            $('#listImmeubles').html("");
            $('#listBatiments').html("");
            $('#listDemande').html("");
    },
    errorCallback: function(){
        
        eugena.log("Probleme de chargement de l'application.");
    },
    donecallback:function(){
                        copris.identification();
                        eugena.log("je suis dans le donecallback");
    },
    checkConnection: function() {
        eugena.log("checkConnection");
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        if(states[networkState] == "Unknown connection" || states[networkState] == "No network connection"){
            eugena.isOffLine = true;
            eugena.isOnLine = false;
            eugena.log("isOffLine");
        }else{
            eugena.isOffLine = false;
            eugena.isOnLine = true;
            eugena.log("isOnLine");
        }
    },
    /**
     * Function onOffline()
     * Appelee lorsque le device passe en mode offline
     **/
    onOffline: function(){
        eugena.isOffLine = true;
        eugena.isOnLine = false;
        app.checkConnection();
        $('#btnCreateDemande').css('display', 'none');
    },
    /**
     * Function onLine()
     * Appelee lorsque le device passe en mode online
     **/
    onLine: function(){
        eugena.isOffLine = false;
        eugena.isOnLine = true;
        app.checkConnection();
        $('#btnCreateDemande').css('display', 'inline-block');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        copris.database.init(debug, reset, sqllite,app.donecallback, app.errorCallback);
        if(!wischrome){
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, app.onFileSystemSuccess, app.failFileSystem);
        }
    },
    onCloseBrowser : function() {
        console.log("onCloseBrowser!");
    },
    locChanged : function(loc) {
        console.log("locChanged!");
    },
    onOpenExternal : function() {
        alert("onOpenExternal!");
    },
    onFileSystemSuccess : function(fileSystem) {
        eugena.log("onFileSystemSuccess");
		eugena.fileSystem = fileSystem;
		eugena.log("fileSystem eugena.fileSystem "+JSON.stringify(eugena.fileSystem));
        eugena.log("fileSystem fileSystem.name "+eugena.fileSystem.name);
        eugena.log("fileSystem fileSystem.root.name "+eugena.fileSystem.root.name);
    },
    failFileSystem : function(evt) {
        eugena.log("fileSystem "+evt.target.error.code);
    },
    getPhoneGapPath : function() {
        
        var path = window.location.pathname;
        path = path.substr( path, path.length - 10 );
        return 'file://' + path;
        
    },
    fail : function(evt) {
        eugena.log("fail : "+evt.target.error.code);
    },
    gotFileEntry : function(fileEntry) {
        eugena.log("success");
        fileEntry.file(app.gotFile, function(evt){eugena.log('fail')});
    },
    failGetFile : function(evt) {
        eugena.log("file not exist "+evt.target.error.code);
    },
    gotFile : function(file){
        //readDataUrl(file);
        app.readAsText(file);
    },
    readDataUrl : function(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            eugena.log("Read as data URL");
            var data = evt.target.result;
            data= JSON.stringify(data);
        };
        reader.readAsDataURL(file);
    },
    readAsText : function(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            var data = evt.target.result;
            eugena.log("Read as text ");
            actudouleurs.database.traitementJson(data,"listData");
        };
        reader.readAsText(file);
    },
    isFileExist : function(type,fileName){
        eugena.log("isFileExist "+type+" "+fileName);
        if(fileName && fileName!=""){
            eugena.fileName = fileName+".txt";
            eugena.fileSystem.root.getDirectory("actudouleurs/"+type, {create: true},function(entry){
                                                eugena.log("directory exist");
                                                entry.getFile("actudouleurs/"+type+eugena.fileName, {create: true}, function(entry){eugena.log("file exist");
                                                              app.removefileExist})},
                                                app.createFile);
        }
    },
    removefileExist : function(entry){
         eugena.log("removefileExist");
         entry.remove(createFile, fail);   
    },
    createFile : function(fileName){
        eugena.log("createFile");
        if(eugena.fileName && eugena.fileName!=""){
           eugena.log(":: createFile "+eugena.fileSystem);
           eugena.log(":: fileName "+eugena.fileName);
           fileSystem=  eugena.fileSystem ;
           fileSystem.root.getFile(eugena.fileName, {create: true, exclusive: false}, app.gotFileEntryToWrite, app.fail);
            
        }
    },
    gotFileEntryToWrite : function(fileEntry){
        eugena.log("gotFileEntryToWrite");
        fileEntry.createWriter(app.gotFileWriter, app.fail);
    },
    gotFileWriter : function(writer) {
        writer.onwriteend = function(evt) {
            eugena.log("contents of file now 'some sample text'");
            writer.onwriteend = function(evt) {
                eugena.log("contents of file now 'some sample'");
                writer.seek(4);
                writer.write(" different text");
                writer.onwriteend = function(evt){
                    eugena.log("contents of file now 'some different text'");
                }
            };
        };
        writer.write("some sample text");
    },
};

