









 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("mileage");
            fsApp.logging.logActivity("Driver Mileage");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("userlog");
            fsApp.logging.logActivity("Add User Log");
            
            //function to render character count
            $('#txtDescription').keyup(function() {
                var _this = $(this);
                var totalChars = _this.attr('maxlength');
                var remainingChars = totalChars - _this.val().length;
                $('#remaining').text('Remaining characters:' + remainingChars );
            });

        });
    












 fsApp.page.printFooter(false); 

    $(function () {
        fsApp.page.load("welltest");
        fsApp.logging.logActivity("Well Test - " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");
    });















 fsApp.page.printFooter(false); 


        $(function () {
            fsApp.page.load("welldetail");
            fsApp.logging.logActivity("Well Details - " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");
        });
                    
    












 fsApp.page.printFooter(false); 


        $(function () {
            fsApp.page.load("treatmentdetail");
            fsApp.logging.logActivity("Detail Treatment - " + fsApp.shared.getItem('WellName') + " [" + fsApp.shared.getItem('WellId') + "]");
        });

    


















        $(function () {
            fsApp.page.load("loaddata");
            fsApp.logging.logActivity("Load Data");
        });
    













 fsApp.page.printFooter(false); 

        $(function () {

            $('#fileupload').fileupload({
                dataType: 'json',
                done: function (e, data) {
                    $.each(data.result.files, function (index, file) {
                        $('<p/>').text(file.name).appendTo(document.body);
                    });
                }
            });
            //document.addEventListener("deviceready", onDeviceReady, false);
        });


        var urlBase = 'http://qafvapi.fieldingsystems.com/';
        //var urlBase = 'http://localhost/FieldingSystems.FieldVisor.API/';
        
        
        //var pictureSource;   // picture source
        //var destinationType; // sets the format of returned value
        
        //function onDeviceReady() {
        //    $('#result').append('DeviceReady1<br/>');

        //    pictureSource = navigator.camera.PictureSourceType;
        //    destinationType = navigator.camera.DestinationType;

        //    $('#result').append('DeviceReady2<br/>');
        //}
        
        //function getPhoto(source) {

        //    $('#newid').html('');
        //    $('#result').append('In GetPhoto<<br/>');

        //    // Retrieve image file location from specified source
        //    try {
        //        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
        //            quality: 100,
        //            destinationType: 1,
        //            sourceType: source,
        //            correctOrientation: true
        //        });
        //    } catch (e) {
        //        $('#result').append('Error: ' + e.message + '<br>');
        //    } 
            
        //}
        
        //function onFail(message) {
        //    $('#result').append('OnFail: ' + message + '<br>');
        //}

        //// Called when a photo is successfully retrieved
        ////
        //function onPhotoURISuccess(imageURI) {
        //    // Uncomment to view the image file URI
        //    // console.log(imageURI);

        //    // Get image handle
        //    //
        //    var largeImage = document.getElementById('largeImage');

        //    // Unhide image elements
        //    //
        //    largeImage.style.display = 'block';

        //    // Show the captured photo
        //    // The in-line CSS rules are used to resize the image
        //    //
        //    largeImage.src = imageURI;

        //    uploadPhoto(imageURI);
        //}
        
        //function uploadPhoto(imageUri) {
        //    fsApp.debug.logMsg("Image Upload - " + imageUri);

        //    var options = new FileUploadOptions();
        //    options.fileKey = "file";
        //    options.fileName = v.substr(imageUri.lastIndexOf('/') + 1);
        //    options.mimeType = "image/jpeg";

        //    var guid = fsApp.shared.GetNewGuid();
        //    var dt = new Date();

        //    var key = fsApp.shared.getKey(77, 1, dt);

        //    var params = {};
        //    params.Guid = guid;
        //    params.ObjectBigInt = key;
        //    params.ObjectTypeId = 1;
        //    params.Title = 'Title - ' + guid;
        //    params.Description = 'Description - ' + guid;
        //    params.FilePathLocal = imageUri;

        //    params.CreatedBy = 'this dude';
        //    params.CreatedDt = dt.toISOString();

        //    options.params = params;
            
        //    var deviceKey = fsApp.shared.getItem("DeviceToken");
        //    options.headers = { 'DeviceToken': deviceKey };

        //    var ft = new FileTransfer();
        //    ft.upload(imageUri, encodeURI(urlBase + "tablet/fileupload"), win, fail, options);

        //    $('#newid').html(guid);
        //}
        
        //function win(r) {
        //    fsApp.debug.logMsg("Code = " + r.responseCode + "Response = " + r.response + "Sent = " + r.bytesSent);
        //}

        //function fail(error) {
        //    fsApp.debug.logMsg("An error has occurred: Code = " + error.code + ' ' + error.message + ' ' + error.source + ' ' + error.target);
        //}

        //$('#getPhoto').click(function () {
        //    $('#result').append('Get Photo Clicked<<br/>');
        //    getPhoto(1);
        //});

        $('#btnLibrary').click(function () {
            event.preventDefault();

            var fileMeta = { ObjectTypeID: 37, ObjectGUID: null, SecondaryObjectTypeID: 39, SecondaryObjectGUID: 3333333333333 };

            var source = fsApp.entity.fileassets.TabletImageSourceCamera();

            fsApp.entity.fileassets.GetPhotoTablet(source, $('#imageContainer'), fileMeta);

            return false;
        });

        $('#btnTestUpload').click(function () {
            fsApp.entity.fileassets.FileUploadStart();
        });

        $('#btnTestRetrieve').click(function () {
            fsApp.entity.fileassets.RetrieveFileAssetsTablet(null);
        });


        $('#btnTestSave').click(function () {
            var objGuid = fsApp.shared.GetNewGuid();
            fsApp.entity.fileassets.SaveFileAssets(objGuid, null, 37, null);
        });
        
        $('#btnTest').click(function () {
            var data;

            $('#newid').html('');

            data = new FormData();

            var guid = fsApp.shared.GetNewGuid();
            var dt = new Date();

            var key = fsApp.shared.getKey(77, 1, dt);

            data.append('Guid', guid);
            //data.append('ObjectId', dt.getSeconds());
            data.append('ObjectBigInt', key);
            data.append('ObjectTypeId', 1);
            data.append('Title', 'Title - ' + guid);
            data.append('Description', 'Description - ' + guid);
            data.append('FilePathLocal', 'LocalPath - ' + guid);

            data.append('CreatedBy', 'this dude');
            data.append('CreatedDt', dt.toISOString());

            // attach the file to the request
            data.append('file', document.getElementById('myfile').files[0]);
            
            var deviceKey = fsApp.shared.getItem("DeviceToken");
            
            $.ajax({
                url: urlBase + 'tablet/fileupload',
                data: data,
                processData: false, // Don't process the files
                contentType: false,
                type: 'POST',
                cache: false,
                dataType: 'json',
                headers: {
                    "DeviceToken": deviceKey
                },
 
                success: function (data) {
                    $('#newid').html(guid);
                    $('#result').append('File Uploaded<<br/>');
                }
            });
        });

        $('#btnReadImage').click(function() {
            GetImage(true);
        });
        //$('#btnReadImageFull').click(function () {
        //    GetImage(false);
        //});

        function GetImage(thumbOnly) {
            //$('#myImage').hide();
            //$('#myImage').attr('src', '');

            var data = new FormData();
            data.append('FileId', 'c34dfb7e-d578-2595-e23a-68bb86884111');
            data.append('ThumbOnly', thumbOnly);

            fsApp.shared.Ajax({
                url: urlBase + 'tablet/filedownload',
                type: 'POST',
                cache: false,
                processData: false, // Don't process the files
                contentType: false,
                dataType: 'json',
                loadingElementId: 'loadingOverlay',
                data: data,
                success: function (response) {
                    if (thumbOnly)
                        $('#imageContainer').append('<img src="data:image/png;base64,' + response.DownloadedFile + '" />');
                    else 
                        $('#imageContainer').append('<img style="max-height: 800px;max-width: 600px;" src="data:image/png;base64,' + response.DownloadedFile + '" />');
                },
                error: function (response) {
                    fsApp.logging.logActivity("Error Retrieving Usage Tank Data - " + response.responseText);
                    fsApp.debug.logMsg("ERROR Retrieving File Asset From API - " + +response.responseText);

                    if (callback != null) callback();
                }
            });

            //var deviceKey = fsApp.shared.getItem("DeviceToken");

            //$.ajax({
            //    url: urlBase + 'tablet/filedownload',
            //    data: data,
            //    processData: false, // Don't process the files
            //    contentType: false,
            //    type: 'POST',
            //    cache: false,
            //    dataType: 'json',
            //    headers: {
            //        "DeviceToken": deviceKey
            //    },

            //    success: function (data) {
            //        $('#result').append('File Downloaded<<br/>');

            //        if (thumbOnly)
            //            $('#imageContainer').append('<img src="data:image/png;base64,' + data.DownloadedFile + '" />');
            //        else 
            //            $('#imageContainer').append('<img style="max-height: 800px;max-width: 600px;" src="data:image/png;base64,' + data.DownloadedFile + '" />');
            //    }
            //});
        }
    



















 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.setBack("well_wellslist.html");
            fsApp.page.load("system");
            fsApp.logging.logActivity("System");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("tasklist");
            fsApp.logging.logActivity("Tasks List");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("equipmentform");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("gascompare");
            fsApp.logging.logActivity("Gas Compare");
        });
    










 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("rootsmetercalc");
        });
    












 fsApp.page.printFooter(false); 

            $(function () {
                fsApp.page.load("editlist");
            });
        










 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("mileagelist");
            fsApp.logging.logActivity("Mileage List");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("addtask");
            fsApp.logging.logActivity("Add Task");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("addwelllog");
            fsApp.logging.logActivity("Add Well Log - " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");

            //function to render character count
            $('#txtDescription').keyup(function () {
                var _this = $(this);
                var totalChars = _this.attr('maxlength');
                var remainingChars = totalChars - _this.val().length;
                $('#remaining').text('Remaining characters:' + remainingChars);
            });

        });
    


















 fsApp.page.printFooter(false, true); 

        $(function () {
            fsApp.page.load("production");
        });
    





                function showPictures() {
                    navigator.camera.getPicture(function (imageURI) {
                        $('img#picture').attr('src', imageURI);
                    }, function (error) {
                        $('img#picture').replaceWith('<p>' + error + '</p>');
                    }, { sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY, destinationType: navigator.camera.DestinationType.FILE_URI });
                }

                $(function () {
                    var compassWatchID, geoWatchID;

                    document.addEventListener("deviceready", function () {
                        // Compass
                        compassWatchID = navigator.compass.watchHeading(function (heading) {
                            $('span#heading').html(heading.magneticHeading.toFixed(2) + '&#176;');
                        }, function (error) {
                            $('span#heading').text(error.code);
                        }, { frequency: 3000 });

                        // Connection
                        var networkState = navigator.network.connection.type,
                            states = {};

                        states[Connection.UNKNOWN] = 'Unknown';
                        states[Connection.ETHERNET] = 'Ethernet';
                        states[Connection.WIFI] = 'WiFi';
                        states[Connection.CELL_2G] = 'Cell 2G';
                        states[Connection.CELL_3G] = 'Cell 3G';
                        states[Connection.CELL_4G] = 'Cell 4G';
                        states[Connection.NONE] = 'No network';

                        $('span#connection').text(states[networkState]);

                        // Contacts
                        navigator.contacts.find(['id'], function (contacts) {
                            $('span#contacts').text(contacts.length + ' found');
                        }, function (error) {
                            $('span#contacts').text(error.code);
                        }, { multiple: true });

                        // Device properties
                        $('div#deviceprops').html(
                            '<strong>Name:</strong> ' + device.name + '<br/>' +
                            '<strong>Cordova version:</strong> ' + device.cordova + '<br/>' +
                            '<strong>Platform:</strong> ' + device.platform + '<br/>' +
                            '<strong>UUID:</strong> ' + device.uuid + '<br/>' +
                            '<strong>Version:</strong> ' + device.version + '<br/>'
                        );

                        // Geolocation
                        geoWatchID = navigator.geolocation.watchPosition(function (position) {
                            $('span#geolocation').text(position.coords.latitude.toFixed(2) + 'N, ' + position.coords.longitude.toFixed(2) + 'E');
                        }, function (error) {
                            $('span#geolocationerror').text(error.code + ': ' + error.message);
                        }, { frequency: 3000 });
                    });
                } ());
            









        fsApp.page.load("login");
    




















 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("wellslist");
        });
    















 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("wellslist");
        });
    













 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("groupreport");
        });
    












 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("groupsort");
            fsApp.logging.logActivity("Group Sort");
        });
    














 fsApp.page.printFooter(false); 

    $(function () {
        fsApp.page.load("cheminventory");
        
    });

    /* Start Tabs js */

    $('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
        e.target // activated tab
        e.relatedTarget // previous tab
    });

    /* End Tabs js */














 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("treatmentcommon");
            fsApp.logging.logActivity("Common Treatment - " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");
        });
    














 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("xferticket");
        });
    
















 fsApp.page.printFooter(false, true); fsApp.page.printAdditionalWaterTicketNavigation(); 

        $(function () {
            fsApp.page.load("waterticket");
            fsApp.logging.logActivity("Oil Ticket " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");
        });
    













 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("tankhaul");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.setBack('well_groupslist.html');
            fsApp.page.setHeader(fsApp.shared.groupName() + ' - Production Graphs');
            fsApp.page.load("prodgraphs");
        });
    
















 fsApp.page.printFooter(false, true); fsApp.page.printAdditionalOilTicketNavigation(); 

        $(function () {
            fsApp.page.load("oilticket");
            fsApp.logging.logActivity("Oil Ticket " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");
        });
    












 fsApp.page.printFooter(false); 

            $(function () {
                fsApp.page.load("groupslist");
            });
        












 fsApp.page.printFooter(false); 











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("downtime");
            fsApp.logging.logActivity("Downtime - " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("issuelist");
            fsApp.logging.logActivity("Issue List");
        });
    












 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("servicecommon");
            fsApp.logging.logActivity("Common Service - " + fsApp.shared.wellName() + " [" + fsApp.shared.wellId() + "]");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("admin");
            fsApp.page.admin.FindDbSize();
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("addissue");
            fsApp.logging.logActivity("Add Issue");
        });
    











 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("userloglist");
            fsApp.logging.logActivity("User Log List");
        });
    




































 fsApp.page.printFooter(false); 

            $(function () {
                fsApp.page.load("customforms");
            });
        










 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("map");
            fsApp.logging.logActivity("Viewed Map");
        });
    














/*jslint unparam: true, regexp: true */
/*global window, $ */
$(function () {
    'use strict';
    // Change this to the location of your server-side upload handler:
    var urlBase = 'http://qafvapi.fieldingsystems.com/';

    var url = window.location.hostname === 'blueimp.github.io' ? '//jquery-file-upload.appspot.com/' : urlBase + 'tablet/fileupload',
        uploadButton = $('<button/>')
            .addClass('btn btn-primary')
            .prop('disabled', true)
            .text('Processing...')
            .on('click', function () {
                var $this = $(this),
                    data = $this.data();
                $this
                    .off('click')
                    .text('Abort')
                    .on('click', function () {
                        $this.remove();
                        data.abort();
                    });
                data.submit().always(function () {
                    $this.remove();
                });
            });

    $('#fileupload').fileupload({
        url: url,
        dataType: 'json',
        autoUpload: false,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
        maxFileSize: 5000000, // 5 MB
        // Enable image resizing, except for Android and Opera,
        // which actually support image resizing, but fail to
        // send Blob objects via XHR requests:
        disableImageResize: /Android(?!.*Chrome)|Opera/
            .test(window.navigator.userAgent),
        previewMaxWidth: 140,
        previewMaxHeight: 140,
        previewCrop: true
    }).on('fileuploadadd', function (e, data) {
        data.context = $('<div/>').appendTo('#files');
        $.each(data.files, function (index, file) {
            var node = $('<p/>')
                    .append($('<span/>').text(file.name));
            if (!index) {
                node
                    .append('<br>')
                    .append(uploadButton.clone(true).data(data));
            }
            node.appendTo(data.context);
        });
    }).on('fileuploadprocessalways', function (e, data) {
        var index = data.index,
            file = data.files[index],
            node = $(data.context.children()[index]);
        if (file.preview) {
            node
                .prepend('<br>')
                .prepend(file.preview);
        }
        if (file.error) {
            node
                .append('<br>')
                .append($('<span class="text-danger"/>').text(file.error));
        }
        if (index + 1 === data.files.length) {
            data.context.find('button')
                .text('Upload')
                .prop('disabled', !!data.files.error);
        }
    }).on('fileuploadprogressall', function (e, data) {
        var progress = parseInt(data.loaded / data.total * 100, 10);
        $('#progress .progress-bar').css(
            'width',
            progress + '%'
        );
    }).on('fileuploaddone', function (e, data) {
        $.each(data.result.files, function (index, file) {
            if (file.url) {
                var link = $('<a>')
                    .attr('target', '_blank')
                    .prop('href', file.url);
                $(data.context.children()[index])
                    .wrap(link);
            } else if (file.error) {
                var error = $('<span class="text-danger"/>').text(file.error);
                $(data.context.children()[index])
                    .append('<br>')
                    .append(error);
            }
        });
    }).on('fileuploadfail', function (e, data) {
        $.each(data.files, function (index, file) {
            var error = $('<span class="text-danger"/>').text('File upload failed.');
            $(data.context.children()[index])
                .append('<br>')
                .append(error);
        });
    }).prop('disabled', !$.support.fileInput)
        .parent().addClass($.support.fileInput ? undefined : 'disabled');
});












 fsApp.page.printFooter(false); 

        $(function () {
            fsApp.page.load("appreset");
        });
    


﻿

var tankshtml = '' + 
'<ul id="tankgauges" data-role="listview" data-inset="true" data-theme="d" data-divider-theme="a" style="margin-left: 10px;">' +
    '<li data-role="list-divider">TANK GAUGES</li>' +
    '<li style="padding: 0px !important;">' +
        '<div width="100%" style="background-color: whitesmoke;">' +
            '<table class="tankTable">' +
                '<tr>' +
                    '<td valign="top" style="min-width: 100px;width:20%;">' +
                        '<table width="100%" id="tblTanks">' +
                            '<tbody>' +
                                
                            '</tbody>' +
                        '</table>' +
                   '</td>' +
                    '<td valign="top">' +
                        '<div id="maintanks">' +
                            '<table width="100%" cellpadding=0>' +
                                '<tr>' +
                                    '<td valign="top" colspan="2">' +
                                        '<table cellpadding="4px" cellspacing="6px">' +
                                            '<tr>' +
                                                '<td class="tankInfo">Tank Type:</td>' +
                                                '<td class="tankData" align="right"><span id="tanktype"></span></td>' +
                                                '<td width="4px"></td>' +
                                                '<td class="tankInfo">BPI:</td>' +
                                                '<td class="tankData" align="right"><span id="bblin"></span></td>' +
                                                '<td class="tankInfo">Capacity:</td>' +
                                                '<td class="tankData" align="right" colspan="4"><span id="capacity"></span></td>' +
                                                '<td><span id="tnknext" style="color:yellow;text-shadow:none;font-weight:normal;"></span></td>' +
                                            '</tr>' +
                                        '</table>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td valign="top" colspan="2">' +
                                        '<table width="100%" style="border-spacing: 1px;">' +
                                            '<tr>' +
                                                '<td style="width: 20% !important;" align="center">' +
                                                    '<div class="unitOption active" targ="unitsFtIn"><div>Ft/Inches</div></div>' +
                                                '</td>' +
                                                '<td style="width: 20% !important;;" align="center">' +
                                                    '<div class="unitOption" targ="unitsIn"><div>Inches</div></div>' +
                                                '</td>' +
                                                '<td style="width: 20% !important;;" align="center">' +
                                                    '<div class="unitOption" targ="unitsBbl"><div>BBL</div></div>' +
                                                '</td>' +
                                                '<td style="width: 20% !important;;" align="center">' +
                                                    '<div class="unitOption" targ="unitsPerc"><div>% FULL</div></div>' +
                                                '</td>' +
                                                '<td style="width: 20% !important;;" align="center" style="display:none;" id="tanksBbl2">' +
                                                    '<div class="unitOption" targ="unitsBbl2"><div>BBL REM</div></div>' +
                                                '</td>' +
                                            '</tr>' +
                                        '</table>' +
                                    '</td>' +
                                '</tr>' +
                                '<tr>' +
                                    '<td width="330px" valign="top">' +
                                        '<div id="unitsFtIn" class="tankUnitCont">' +
                                            '<table>' +
                                                '<tr class="before">' +
                                                    '<td></td>' +
                                                    '<td colspan="2" class="BefAftHdr">BEFORE</td>' +
                                                    '<td></td>' +
                                                    '<td colspan="2" class="BefAftHdr">AFTER</td>' +
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td>TOP:</td>' +

                                                    '<td class="before"><input placeholder="feet" class="numeric tankval" id="BeforeFt1" style="width:45px !important;" stage="Before" unit="ft" lvl="1" /></td>' +
                                                    '<td class="before"><input placeholder="inches" class="numeric tankval fract" id="BeforeFtIn1" style="width:80px !important;" stage="Before" unit="ftin" lvl="1" /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="feet" class="numeric tankval" id="AfterFt1" style="width:45px !important;" stage="After" unit="ft" lvl="1" /></td>' +
                                                    '<td><input placeholder="inches" class="numeric tankval fract" id="AfterFtIn1" style="width:80px !important;" stage="After" unit="ftin" lvl="1" /></td>' +
                                                '</tr>' +
                                                '<tr class="lvl2">' +
                                                    '<td>H2O:</td>' +

                                                    '<td class="before"><input placeholder="feet" class="numeric tankval" id="BeforeFt2" style="width:45px !important;" stage="Before" unit="ft" lvl="2" /></td>' +
                                                    '<td class="before"><input placeholder="inches" class="numeric tankval fract" id="BeforeFtIn2" style="width:80px !important;" stage="Before" unit="ftin" lvl="2"  /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="feet" class="numeric tankval" id="AfterFt2" style="width:45px !important;" stage="After" unit="ft" lvl="2" /></td>' +
                                                    '<td><input placeholder="inches" class="numeric tankval fract" id="AfterFtIn2" style="width:80px !important;" stage="After" unit="ftin" lvl="2" /></td>' +
                                                '</tr>' +
                                            '</table>' +
                                        '</div>' +
    
                                        '<div id="unitsIn" class="tankUnitCont" style="display: none;">' +
                                            '<table>' +
                                                '<tr class="before">' +
                                                    '<td></td>' +
                                                    '<td class="BefAftHdr">BEFORE</td>' +
                                                    '<td></td>' +
                                                    '<td class="BefAftHdr">AFTER</td>' +
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td>TOP:</td>' +
                                        
                                                    '<td class="before"><input placeholder="inches" class="numeric tankval fract" id="BeforeIn1" style="width:85px !important;" stage="Before" unit="in" lvl="1" /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="inches" class="numeric tankval fract" id="AfterIn1" style="width:85px !important;" stage="After" unit="in" lvl="1"/></td>' +
                                                '</tr>' +
                                                '<tr class="lvl2">' +
                                                    '<td>H2O:</td>' +
                                        
                                                    '<td class="before"><input placeholder="inches" class="numeric tankval fract" id="BeforeIn2" style="width:85px !important;" stage="Before" unit="in" lvl="2" /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="inches" class="numeric tankval fract" id="AfterIn2" style="width:85px !important;" stage="After" unit="in" lvl="2" /></td>' +
                                                '</tr>' +
                                            '</table>' +
                                        '</div>' +
    
                                        '<div id="unitsBbl" class="tankUnitCont" style="display: none;">' +
                                            '<table>' +
                                                '<tr class="before">' +
                                                    '<td></td>' +
                                                    '<td class="BefAftHdr">BEFORE</td>' +
                                                    '<td></td>' +
                                                    '<td class="BefAftHdr">AFTER</td>' +
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td>TOP:</td>' +

                                                    '<td class="before"><input placeholder="bbl" class="numeric tankval fract" id="BeforeBbl1" style="width:85px !important;" stage="Before" unit="bbl" lvl="1" /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="bbl" class="numeric tankval fract" id="AfterBbl1" style="width:85px !important;" stage="After" unit="bbl" lvl="1" /></td>' +
                                                '</tr>' +
                                                '<tr class="lvl2">' +
                                                    '<td>H2O:</td>' +
                                        
                                                    '<td class="before"><input placeholder="bbl" class="numeric tankval fract" id="BeforeBbl2" style="width:85px !important;" stage="Before" unit="bbl" lvl="2" /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="bbl" class="numeric tankval fract" id="AfterBbl2" style="width:85px !important;" stage="After" unit="bbl" lvl="2" /></td>' +
                                                '</tr>' +
                                            '</table>' +
                                        '</div>' +
                                        
                                        '<div id="unitsPerc" class="tankUnitCont" style="display: none;">' +
                                            '<table>' +
                                                '<tr class="before">' +
                                                    '<td></td>' +
                                                    '<td class="BefAftHdr">BEFORE</td>' +
                                                    '<td></td>' +
                                                    '<td class="BefAftHdr">AFTER</td>' +
                                                '</tr>' +
                                                '<tr>' +
                                                    '<td>TOP:</td>' +

                                                    '<td class="before"><input placeholder="% FULL" class="numeric tankval fract" id="BeforePerc1" style="width:95px !important;" stage="Before" unit="perc" lvl="1" /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="% FULL" class="numeric tankval fract" id="AfterPerc1" style="width:95px !important;" stage="After" unit="perc" lvl="1" /></td>' +
                                                '</tr>' +
                                                '<tr class="lvl2">' +
                                                    '<td>H2O:</td>' +

                                                    '<td class="before"><input placeholder="% FULL" class="numeric tankval fract" id="BeforePerc2" style="width:95px !important;" stage="Before" unit="perc" lvl="2" /></td>' +
                                                    '<td class="before" width="3px" ></td>' +

                                                    '<td><input placeholder="% FULL" class="numeric tankval fract" id="AfterPerc2" style="width:95px !important;" stage="After" unit="perc" lvl="2" /></td>' +
                                                '</tr>' +
                                            '</table>' +
                                        '</div>' +
    
                                        '<div id="unitsBbl2" class="tankUnitCont" style="display:none;">' +
                                            '<table>' +
                                                '<tr>' +
                                                    '<td>Barrels Removed:</td>' +
                                                    '<td><input placeholder="bbl" class="numeric tankval fract" id="BblOnly" style="width:80px !important;" stage="After" unit="bbl2" lvl="1" /></td>' +
                                                '</tr>' +
                                            '</table>' +
                                        '</div>' +
                                    '</td>' +
                                    '<td valign="top" align="right">' +
                                        '<table>' +
                                            '<tr>' +
                                                '<td valign="bottom">' +
                                                    '<div id="tankGraph" style="min-height: 230px;height: 230px;width: 35px;">' +
                                                    '</div>' +
                                                '</td>' +
                                                '<td valign="top">' +
                                                    '<table id="tankHistory" class="histTable" style="min-width:250px;">' +
                                                        '<thead>' +
                                                            '<tr>' +
                                                                '<td>Date</td>' +
                                                                '<td>Type</td>' +
                                                                '<td>Top</td>' +
                                                                '<td>Bbl</td>' +
                                                                '<td class="lvl2">H20</td>' +
                                                                '<td class="lvl2">Bbl</td>' +
                                                            '</tr>' +
                                                        '</thead>' +
                                                        '<tbody>' +

                                                        '</tbody>' +
                                                    '</table>' +
                                                '</td>' +
                                            '</tr>' +
                                        '</table>' +
                                    '</td>' +
                                '</tr>' +
                            '</table>' +
                        '</div>' +
                        '<div style="width:100%;position:relative;top:0px;left:0px;background-color: #FFFFFF;min-height:280px;display:none;" id="reviewtanks">' +
                            '<table width="100%" id="tblReview" class="histTable">' +
                                '<thead>' +
                                    '<tr>' +
                                        '<td>Tank</td>' +
                                        '<td>Prev Top Dt</td>' +
                                        '<td>Prev Top Lvl</td>' +
                                        '<td>New Top Lvl</td>' +
                                        '<td>ChgBBL</td>' +
                                        '<td class="revlvl2">Prev H20 Dt</td>' +
                                        '<td class="revlvl2">Prev H20 Lvl</td>' +
                                        '<td class="revlvl2">New H20 Lvl</td>' +
                                        '<td class="revlvl2">ChgBBL</td>' +
                                    '</tr>' +
                                '</thead>' +
                                '<tbody>' +
                                    
                                '</tbody>' +
                            '</table>' +
                            '<div id="prodFluid">' +
                                '<table cellpadding=3 cellspacing=3><tr><td width="40%" valign=top>' +
                                    '<fieldset style=""><legend> Production Rate and Total</legend>' +
                                        '<table width="100%" cellpadding=3>' +
                                            '<tr><td>Oil Diff Total:</td><td><strong><span id="ttlDiffOil">----</span></strong></td><td rowspan=3><a href="#ntProdRate" data-role="button" data-inline="true" data-rel="popup" data-position-to="window"><strong>?</strong></a></td></tr>' +
                                            '<tr><td>Rate/Day:</td><td><strong><span id="oRate">----</span></strong></td></tr>' +
                                            '<tr><td>Oil Tickets Today:</td><td><strong><span id="otToday">----</span></strong></td></tr>' +
                                            '<tr><td colspan="3"><hr /></td></tr>' +
                                            '<tr><td>Water Diff Total:</td><td colspan="2"><strong><span id="ttlDiffWtr">----</span></strong></td></tr>' +
                                            '<tr><td>Rate/Day:</td><td><strong><span id="wRate">----</span></strong></td></tr>' +
                                            '<tr><td>Water Tickets Today:</td><td colspan="2"><strong><span id="wtToday">----</span></strong></td></tr>' +
                                        '</table>' +
                                    '</fieldset>' +
                                '</td><td width="60%" valign=top>' +
                                    '<fieldset><legend>Pumper Gauge Summary</legend>' +
                                        '<table width="100%"><tr><td width="50%" valign=top>' +
                                            '<table width="50%" cellpadding=3>' +
                                                '<tr><td>Oil Prev:</td><td><strong><span id="ttlPrevOil">----</span></strong></td></tr>' +
                                                '<tr><td>Oil Current:</td><td><strong><span id="ttlCurrOil">----</span></strong></td></tr>' +
                                                '<tr><td>Oil Tickets:</td><td><strong><span id="otSince">----</span></strong></td></tr>' +
                                                '<tr><td colspan="2"><hr /></td></tr>' +
                                                '<tr><td>Oil Total:</td><td><strong><span id="oilTotal">----</span></strong></td></tr>' +
                                            '</table>' +
                                        '</td><td width="50%" valign=top>' +
                                            '<table width="50%" cellpadding=3>' +
                                                '<tr><td>H2O Prev:</td><td><strong><span id="ttlPrevWtr">----</span></strong></td></tr>' +
                                                '<tr><td>H2O Current:</td><td><strong><span id="ttlCurrWtr">----</span></strong></td></tr>' +
                                                '<tr><td>H2O Tickets:</td><td><strong><span id="wtSince">----</span></strong></td></tr>' +
                                                '<tr><td colspan="2"><hr /></td></tr>' +
                                                '<tr><td>H2O Total:</td><td><strong><span id="waterTotal">----</span></strong></td></tr>' +
                                            '</table>' +
                                        '</td><td valign=top><a href="#ntProdGauges" data-role="button" data-inline="true" data-rel="popup" data-position-to="window"><strong>?</strong></a></td></tr></table>' +
                                    '</fieldset>' +
                                '</td></tr></table>'+
                            '</div>' +
                        '</div>' +
                    '</td>' +
                '</tr>' +
            '</table>' +
        '</div>' +
        
        '<div data-role="collapsible" data-theme="e" data-content-theme="c" data-collapsed="true" style="margin-left:4px;margin-right:4px;">' +
            '<h3>Fluid Production Report<span style="font-size:11px;color:#333333;margin-left:8px;">(press to expand)</span></h3>' +
            '<div id="divFluidProd">' +
            '</div>' +
        '</div>' +
    '</li>' +
'</ul>';



(function(a){a.widget("mobile.jqmMobiscroll",a.mobile.widget,{options:{theme:"jqm",preset:"date",animate:"pop"},_create:function(){var h=this.element,u=a.extend(this.options,h.jqmData("options"));h.mobiscroll(u)}});a(document).bind("pagebeforecreate",function(h){a('input[type="date"]:jqmData(role="mobiscroll")',h.target).prop("type","text")});a(document).bind("pagecreate create",function(h){a(document).trigger("mobiscrollbeforecreate");a(':jqmData(role="mobiscroll")',h.target).each(function(){"undefined"===
typeof a(this).data("mobiscroll")&&a(this).jqmMobiscroll()})})})(jQuery);(function(a){function h(b,l){function x(b){return a.isArray(i.readonly)?(b=a(".dwwl",o).index(b),i.readonly[b]):i.readonly}function k(b){var a='<div class="dw-bf">',l=1,c;for(c in $[b])0==l%20&&(a+='</div><div class="dw-bf">'),a+='<div class="dw-li dw-v" data-val="'+c+'" style="height:'+F+"px;line-height:"+F+'px;"><div class="dw-i">'+$[b][c]+"</div></div>",l++;return a+"</div>"}function h(b){c=a(".dw-li",b).index(a(".dw-v",b).eq(0));d=a(".dw-li",b).index(a(".dw-v",b).eq(-1));v=a(".dw-ul",o).index(b);
g=F;n=m}function B(b){var a=i.headerText;return a?"function"==typeof a?a.call(O,b):a.replace(/\{value\}/i,b):""}function q(){m.temp=V&&(null!==m.val&&m.val!=z.val()||!z.val().length)||null===m.values?i.parseValue(z.val()||"",m):m.values.slice(0);m.setValue(!0)}function aa(b,l,c,e){!1!==H("validate",[o,l])&&a(".dw-ul",o).each(function(c){var i=a(this),d=a('.dw-li[data-val="'+m.temp[c]+'"]',i),x=a(".dw-li",i),f=x.index(d),j=x.length,p=c==l||void 0===l;if(!d.hasClass("dw-v")){for(var g=d,o=0,k=0;0<=
f-o&&!g.hasClass("dw-v");)o++,g=x.eq(f-o);for(;f+k<j&&!d.hasClass("dw-v");)k++,d=x.eq(f+k);(k<o&&k&&2!==e||!o||!g.hasClass("dw-v")||1==e)&&d.hasClass("dw-v")?f+=k:(d=g,f-=o)}if(!d.hasClass("dw-sel")||p)m.temp[c]=d.attr("data-val"),a(".dw-sel",i).removeClass("dw-sel"),d.addClass("dw-sel"),m.scroll(i,c,f,b)});m.change(c)}function t(b){if(!("inline"==i.display||P===a(window).width()&&Z===a(window).height()&&b)){var l,c,d,e,f,x,m,j,p,k=0,g=0,b=a(window).scrollTop();e=a(".dwwr",o);var n=a(".dw",o),h={};
f=void 0===i.anchor?z:i.anchor;P=a(window).width();Z=a(window).height();I=(I=window.innerHeight)||Z;/modal|bubble/.test(i.display)&&(a(".dwc",o).each(function(){l=a(this).outerWidth(!0);k+=l;g=l>g?l:g}),l=k>P?g:k,e.width(l));S=n.outerWidth();J=n.outerHeight(!0);"modal"==i.display?(c=(P-S)/2,d=b+(I-J)/2):"bubble"==i.display?(p=!0,j=a(".dw-arrw-i",o),c=f.offset(),x=c.top,m=c.left,e=f.outerWidth(),f=f.outerHeight(),c=m-(n.outerWidth(!0)-e)/2,c=c>P-S?P-(S+20):c,c=0<=c?c:20,d=x-J,d<b||x>b+I?(n.removeClass("dw-bubble-top").addClass("dw-bubble-bottom"),
d=x+f):n.removeClass("dw-bubble-bottom").addClass("dw-bubble-top"),j=j.outerWidth(),e=m+e/2-(c+(S-j)/2),a(".dw-arr",o).css({left:e>j?j:e})):(h.width="100%","top"==i.display?d=b:"bottom"==i.display&&(d=b+I-J));h.top=0>d?0:d;h.left=c;n.css(h);a(".dw-persp",o).height(0).height(d+J>a(document).height()?d+J:a(document).height());p&&(d+J>b+I||x>b+I)&&a(window).scrollTop(d+J-I)}}function H(b,c){var d;c.push(m);a.each([ba,l],function(a,l){l[b]&&(d=l[b].apply(O,c))});return d}function u(b){var a=+b.data("pos")+
1;f(b,a>d?c:a,1)}function ia(b){var a=+b.data("pos")-1;f(b,a<c?d:a,2)}var fa,F,M,o,P,I,Z,S,J,Q,ga,m=this,da=a.mobiscroll,O=b,z=a(O),ea,ha,i=y({},N),ba={},$=[],W={},V=z.is("input"),X=!1;m.enable=function(){i.disabled=!1;V&&z.prop("disabled",!1)};m.disable=function(){i.disabled=!0;V&&z.prop("disabled",!0)};m.scroll=function(b,a,l,c,d,e){function i(){clearInterval(W[a]);W[a]=void 0;b.data("pos",l).closest(".dwwl").removeClass("dwa")}var f=(fa-l)*F,x,e=e||w;b.attr("style",(c?T+"-transition:all "+c.toFixed(1)+
"s ease-out;":"")+(Y?T+"-transform:translate3d(0,"+f+"px,0);":"top:"+f+"px;"));W[a]&&i();c&&void 0!==d?(x=0,b.closest(".dwwl").addClass("dwa"),W[a]=setInterval(function(){x+=0.1;b.data("pos",Math.round((l-d)*Math.sin(x/c*(Math.PI/2))+d));x>=c&&(i(),e())},100),H("onAnimStart",[a,c])):(b.data("pos",l),e())};m.setValue=function(b,a,l,c){c||(m.values=m.temp.slice(0));X&&b&&aa(l);a&&(M=i.formatResult(m.temp),m.val=M,V&&z.val(M).trigger("change"))};m.validate=function(b,a){aa(0.2,b,!0,a)};m.change=function(b){M=
i.formatResult(m.temp);"inline"==i.display?m.setValue(!1,b):a(".dwv",o).html(B(M));b&&H("onChange",[M])};m.changeWheel=function(b,l){if(o){var c=0,d,e,f=b.length;for(d in i.wheels)for(e in i.wheels[d]){if(-1<a.inArray(c,b)&&($[c]=i.wheels[d][e],a(".dw-ul",o).eq(c).html(k(c)),f--,!f)){t();aa(l);return}c++}}};m.show=function(b){if(i.disabled||X)return!1;"top"==i.display&&(Q="slidedown");"bottom"==i.display&&(Q="slideup");q();H("onBeforeShow",[o]);var l=0,c,d="";Q&&!b&&(d="dw-"+Q+" dw-in");for(var g=
'<div class="dw-trans '+i.theme+" dw-"+i.display+'">'+("inline"==i.display?'<div class="dw dwbg dwi"><div class="dwwr">':'<div class="dw-persp"><div class="dwo"></div><div class="dw dwbg '+d+'"><div class="dw-arrw"><div class="dw-arrw-i"><div class="dw-arr"></div></div></div><div class="dwwr">'+(i.headerText?'<div class="dwv"></div>':"")),b=0;b<i.wheels.length;b++){g+='<div class="dwc'+("scroller"!=i.mode?" dwpm":" dwsc")+(i.showLabel?"":" dwhl")+'"><div class="dwwc dwrc"><table cellpadding="0" cellspacing="0"><tr>';
for(c in i.wheels[b])$[l]=i.wheels[b][c],g+='<td><div class="dwwl dwrc dwwl'+l+'">'+("scroller"!=i.mode?'<div class="dwwb dwwbp" style="height:'+F+"px;line-height:"+F+'px;"><span>+</span></div><div class="dwwb dwwbm" style="height:'+F+"px;line-height:"+F+'px;"><span>&ndash;</span></div>':"")+'<div class="dwl">'+c+'</div><div class="dww" style="height:'+i.rows*F+"px;min-width:"+i.width+'px;"><div class="dw-ul">',g+=k(l),g+='</div><div class="dwwo"></div></div><div class="dwwol"></div></div></td>',
l++;g+="</tr></table></div></div>"}g+=("inline"!=i.display?'<div class="dwbc'+(i.button3?" dwbc-p":"")+'"><span class="dwbw dwb-s"><span class="dwb">'+i.setText+"</span></span>"+(i.button3?'<span class="dwbw dwb-n"><span class="dwb">'+i.button3Text+"</span></span>":"")+'<span class="dwbw dwb-c"><span class="dwb">'+i.cancelText+"</span></span></div></div>":'<div class="dwcc"></div>')+"</div></div></div>";o=a(g);aa();H("onMarkupReady",[o]);"inline"!=i.display?(o.appendTo("body"),setTimeout(function(){o.removeClass("dw-trans").find(".dw").removeClass(d)},
350)):z.is("div")?z.html(o):o.insertAfter(z);X=!0;"inline"!=i.display&&(a(".dwb-s span",o).click(function(){if(m.hide(false,"set")!==false){m.setValue(false,true);H("onSelect",[m.val])}}),a(".dwb-c span",o).click(function(){m.cancel()}),i.button3&&a(".dwb-n span",o).click(i.button3),i.scrollLock&&o.bind("touchmove",function(b){J<=I&&S<=P&&b.preventDefault()}),a("input,select,button").each(function(){a(this).prop("disabled")||a(this).addClass("dwtd").prop("disabled",true)}),t(),a(window).bind("resize.dw",
function(){clearTimeout(ga);ga=setTimeout(function(){t(true)},100)}));o.delegate(".dwwl","DOMMouseScroll mousewheel",function(b){if(!x(this)){b.preventDefault();var b=b.originalEvent,b=b.wheelDelta?b.wheelDelta/120:b.detail?-b.detail/3:0,l=a(".dw-ul",this),c=+l.data("pos"),c=Math.round(c-b);h(l);f(l,c,b<0?1:2)}}).delegate(".dwb, .dwwb",R,function(){a(this).addClass("dwb-a")}).delegate(".dwwb",R,function(b){var l=a(this).closest(".dwwl");if(!x(l)&&!l.hasClass("dwa")){b.preventDefault();b.stopPropagation();
var c=l.find(".dw-ul"),d=a(this).hasClass("dwwbp")?u:ia;e=true;h(c);clearInterval(j);j=setInterval(function(){d(c)},i.delay);d(c)}}).delegate(".dwwl",R,function(b){b.preventDefault();if(!p&&!x(this)&&!e&&i.mode!="clickpick"){p=true;a(document).bind(K,L);s=a(".dw-ul",this);s.closest(".dwwl").addClass("dwa");C=+s.data("pos");h(s);G=W[v]!==void 0;D=A(b);E=new Date;r=D;m.scroll(s,v,C)}});H("onShow",[o,M]);ea.init(o,m)};m.hide=function(b,l){if(!1===H("onClose",[M,l]))return!1;a(".dwtd").prop("disabled",
!1).removeClass("dwtd");z.blur();o&&("inline"!=i.display&&Q&&!b?(a(".dw",o).addClass("dw-"+Q+" dw-out"),setTimeout(function(){o.remove();o=null},350)):(o.remove(),o=null),X=!1,a(window).unbind(".dw"))};m.cancel=function(){!1!==m.hide(!1,"cancel")&&H("onCancel",[m.val])};m.init=function(b){ea=y({defaults:{},init:w},da.themes[b.theme||i.theme]);ha=da.i18n[b.lang||i.lang];y(l,b);y(i,ea.defaults,ha,l);m.settings=i;z.unbind(".dw");if(b=da.presets[i.preset])ba=b.call(O,m),y(i,ba,l),y(U,ba.methods);fa=Math.floor(i.rows/
2);F=i.height;Q=i.animate;void 0!==z.data("dwro")&&(O.readOnly=ca(z.data("dwro")));X&&m.hide();"inline"==i.display?m.show():(q(),V&&i.showOnFocus&&(z.data("dwro",O.readOnly),O.readOnly=!0,z.bind("focus.dw",function(){m.show()})))};m.values=null;m.val=null;m.temp=null;m.init(l)}function u(b){for(var a in b)if(void 0!==Z[b[a]])return!0;return!1}function A(b){var a=b.originalEvent,c=b.changedTouches;return c||a&&a.changedTouches?a?a.changedTouches[0].pageY:c[0].pageY:b.pageY}function ca(b){return!0===
b||"true"==b}function B(b,a,c){b=b>c?c:b;return b<a?a:b}function f(b,l,e,f,g){var l=B(l,c,d),j=a(".dw-li",b).eq(l),p=v,f=f?l==g?0.1:Math.abs(0.1*(l-g)):0;n.scroll(b,p,l,f,g,function(){n.temp[p]=j.attr("data-val");n.validate(p,e)})}function q(b,a,c){return U[a]?U[a].apply(b,Array.prototype.slice.call(c,1)):"object"===typeof a?U.init.call(b,a):b}var k={},j,w=function(){},g,c,d,n,t=(new Date).getTime(),p,e,s,v,D,r,E,C,G,Z=document.createElement("modernizr").style,Y=u(["perspectiveProperty","WebkitPerspective",
"MozPerspective","OPerspective","msPerspective"]),T=function(){var b=["Webkit","Moz","O","ms"],a;for(a in b)if(u([b[a]+"Transform"]))return"-"+b[a].toLowerCase();return""}(),y=a.extend,R="touchstart mousedown",K="touchmove mousemove",L=function(b){b.preventDefault();r=A(b);n.scroll(s,v,B(C+(D-r)/g,c-1,d+1));G=!0},N={width:70,height:40,rows:3,delay:300,disabled:!1,readonly:!1,showOnFocus:!0,showLabel:!0,wheels:[],theme:"",headerText:"{value}",display:"modal",mode:"scroller",preset:"",lang:"en-US",
setText:"Set",cancelText:"Cancel",scrollLock:!0,formatResult:function(b){return b.join(" ")},parseValue:function(b,a){var c=a.settings.wheels,d=b.split(" "),e=[],f=0,g,j,p;for(g=0;g<c.length;g++)for(j in c[g]){if(void 0!==c[g][j][d[f]])e.push(d[f]);else for(p in c[g][j]){e.push(p);break}f++}return e}},U={init:function(b){void 0===b&&(b={});return this.each(function(){this.id||(t+=1,this.id="scoller"+t);k[this.id]=new h(this,b)})},enable:function(){return this.each(function(){var b=k[this.id];b&&b.enable()})},
disable:function(){return this.each(function(){var b=k[this.id];b&&b.disable()})},isDisabled:function(){var b=k[this[0].id];if(b)return b.settings.disabled},option:function(b,a){return this.each(function(){var c=k[this.id];if(c){var d={};"object"===typeof b?d=b:d[b]=a;c.init(d)}})},setValue:function(b,a,c,d){return this.each(function(){var e=k[this.id];e&&(e.temp=b,e.setValue(!0,a,c,d))})},getInst:function(){return k[this[0].id]},getValue:function(){var b=k[this[0].id];if(b)return b.values},show:function(){var b=
k[this[0].id];if(b)return b.show()},hide:function(){return this.each(function(){var b=k[this.id];b&&b.hide()})},destroy:function(){return this.each(function(){var b=k[this.id];b&&(b.hide(),a(this).unbind(".dw"),delete k[this.id],a(this).is("input")&&(this.readOnly=ca(a(this).data("dwro"))))})}};a(document).bind("touchend mouseup",function(){if(p){var b=new Date-E,l=B(C+(D-r)/g,c-1,d+1),k;k=s.offset().top;300>b?(b=(r-D)/b,b=b*b/0.0012,0>r-D&&(b=-b)):b=r-D;if(!b&&!G){k=Math.floor((r-k)/g);var n=a(".dw-li",
s).eq(k);n.addClass("dw-hl");setTimeout(function(){n.removeClass("dw-hl")},200)}else k=Math.round(C-b/g);f(s,k,0,!0,Math.round(l));p=!1;s=null;a(document).unbind(K,L)}e&&(clearInterval(j),e=!1);a(".dwb-a").removeClass("dwb-a")});a.fn.mobiscroll=function(b){y(this,a.mobiscroll.shorts);return q(this,b,arguments)};a.mobiscroll=a.mobiscroll||{setDefaults:function(b){y(N,b)},presetShort:function(b){this.shorts[b]=function(a){return q(this,y(a,{preset:b}),arguments)}},shorts:{},presets:{},themes:{},i18n:{}};
a.scroller=a.scroller||a.mobiscroll;a.fn.scroller=a.fn.scroller||a.fn.mobiscroll})(jQuery);(function(a){var h=a.mobiscroll,u=new Date,A={dateFormat:"mm/dd/yy",dateOrder:"mmddy",timeWheels:"hhiiA",timeFormat:"hh:ii A",startYear:u.getFullYear()-100,endYear:u.getFullYear()+1,monthNames:"January,February,March,April,May,June,July,August,September,October,November,December".split(","),monthNamesShort:"Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec".split(","),dayNames:"Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday".split(","),dayNamesShort:"Sun,Mon,Tue,Wed,Thu,Fri,Sat".split(","),
shortYearCutoff:"+10",monthText:"Month",dayText:"Day",yearText:"Year",hourText:"Hours",minuteText:"Minutes",secText:"Seconds",ampmText:"&nbsp;",nowText:"Now",showNow:!1,stepHour:1,stepMinute:1,stepSecond:1,separator:" "},ca=function(B){function f(b,a,c){return void 0!==p[a]?+b[p[a]]:void 0!==c?c:Y[s[a]]?Y[s[a]]():s[a](Y)}function q(b,a){return Math.floor(b/a)*a}function k(b){var a=f(b,"h",0);return new Date(f(b,"y"),f(b,"m"),f(b,"d",1),f(b,"ap")?a+12:a,f(b,"i",0),f(b,"s",0))}var j=a(this),w={},g;
if(j.is("input")){switch(j.attr("type")){case "date":g="yy-mm-dd";break;case "datetime":g="yy-mm-ddTHH:ii:ssZ";break;case "datetime-local":g="yy-mm-ddTHH:ii:ss";break;case "month":g="yy-mm";w.dateOrder="mmyy";break;case "time":g="HH:ii:ss"}var c=j.attr("min"),j=j.attr("max");c&&(w.minDate=h.parseDate(g,c));j&&(w.maxDate=h.parseDate(g,j))}var d=a.extend({},A,w,B.settings),n=0,w=[],t=[],p={},e,s={y:"getFullYear",m:"getMonth",d:"getDate",h:function(b){b=b.getHours();b=G&&12<=b?b-12:b;return q(b,T)},
i:function(b){return q(b.getMinutes(),y)},s:function(b){return q(b.getSeconds(),R)},ap:function(b){return C&&11<b.getHours()?1:0}},v=d.preset,D=d.dateOrder,r=d.timeWheels,E=D.match(/D/),C=r.match(/a/i),G=r.match(/h/),u="datetime"==v?d.dateFormat+d.separator+d.timeFormat:"time"==v?d.timeFormat:d.dateFormat,Y=new Date,T=d.stepHour,y=d.stepMinute,R=d.stepSecond,K=d.minDate||new Date(d.startYear,0,1),L=d.maxDate||new Date(d.endYear,11,31,23,59,59);B.settings=d;g=g||u;if(v.match(/date/i)){a.each(["y",
"m","d"],function(b,a){e=D.search(RegExp(a,"i"));-1<e&&t.push({o:e,v:a})});t.sort(function(b,a){return b.o>a.o?1:-1});a.each(t,function(b,a){p[a.v]=b});c={};for(j=0;3>j;j++)if(j==p.y){n++;c[d.yearText]={};var N=K.getFullYear(),U=L.getFullYear();for(e=N;e<=U;e++)c[d.yearText][e]=D.match(/yy/i)?e:(e+"").substr(2,2)}else if(j==p.m){n++;c[d.monthText]={};for(e=0;12>e;e++)N=D.replace(/[dy]/gi,"").replace(/mm/,9>e?"0"+(e+1):e+1).replace(/m/,e),c[d.monthText][e]=N.match(/MM/)?N.replace(/MM/,'<span class="dw-mon">'+
d.monthNames[e]+"</span>"):N.replace(/M/,'<span class="dw-mon">'+d.monthNamesShort[e]+"</span>")}else if(j==p.d){n++;c[d.dayText]={};for(e=1;32>e;e++)c[d.dayText][e]=D.match(/dd/i)&&10>e?"0"+e:e}w.push(c)}if(v.match(/time/i)){t=[];a.each(["h","i","s"],function(b,a){b=r.search(RegExp(a,"i"));-1<b&&t.push({o:b,v:a})});t.sort(function(b,a){return b.o>a.o?1:-1});a.each(t,function(b,a){p[a.v]=n+b});c={};for(j=n;j<n+3;j++)if(j==p.h){n++;c[d.hourText]={};for(e=0;e<(G?12:24);e+=T)c[d.hourText][e]=G&&0==e?
12:r.match(/hh/i)&&10>e?"0"+e:e}else if(j==p.i){n++;c[d.minuteText]={};for(e=0;60>e;e+=y)c[d.minuteText][e]=r.match(/ii/)&&10>e?"0"+e:e}else if(j==p.s){n++;c[d.secText]={};for(e=0;60>e;e+=R)c[d.secText][e]=r.match(/ss/)&&10>e?"0"+e:e}C&&(p.ap=n++,j=r.match(/A/),c[d.ampmText]={"0":j?"AM":"am",1:j?"PM":"pm"});w.push(c)}B.setDate=function(b,a,c,d){for(var e in p)this.temp[p[e]]=b[s[e]]?b[s[e]]():s[e](b);this.setValue(!0,a,c,d)};B.getDate=function(b){return k(b)};return{button3Text:d.showNow?d.nowText:
void 0,button3:d.showNow?function(){B.setDate(new Date,!1,0.3,!0)}:void 0,wheels:w,headerText:function(){return h.formatDate(u,k(B.temp),d)},formatResult:function(b){return h.formatDate(g,k(b),d)},parseValue:function(b){var a=new Date,c,e=[];try{a=h.parseDate(g,b,d)}catch(f){}for(c in p)e[p[c]]=a[s[c]]?a[s[c]]():s[c](a);return e},validate:function(b){var c=B.temp,e={y:K.getFullYear(),m:0,d:1,h:0,i:0,s:0,ap:0},g={y:L.getFullYear(),m:11,d:31,h:q(G?11:23,T),i:q(59,y),s:q(59,R),ap:1},j=!0,k=!0;a.each("y,m,d,ap,h,i,s".split(","),
function(n,h){if(p[h]!==void 0){var q=e[h],C=g[h],B=31,r=f(c,h),t=a(".dw-ul",b).eq(p[h]),v,w;if(h=="d"){v=f(c,"y");w=f(c,"m");C=B=32-(new Date(v,w,32)).getDate();E&&a(".dw-li",t).each(function(){var b=a(this),c=b.data("val"),e=(new Date(v,w,c)).getDay(),c=D.replace(/[my]/gi,"").replace(/dd/,c<10?"0"+c:c).replace(/d/,c);a(".dw-i",b).html(c.match(/DD/)?c.replace(/DD/,'<span class="dw-day">'+d.dayNames[e]+"</span>"):c.replace(/D/,'<span class="dw-day">'+d.dayNamesShort[e]+"</span>"))})}j&&K&&(q=K[s[h]]?
K[s[h]]():s[h](K));k&&L&&(C=L[s[h]]?L[s[h]]():s[h](L));if(h!="y"){var o=a(".dw-li",t).index(a('.dw-li[data-val="'+q+'"]',t)),G=a(".dw-li",t).index(a('.dw-li[data-val="'+C+'"]',t));a(".dw-li",t).removeClass("dw-v").slice(o,G+1).addClass("dw-v");h=="d"&&a(".dw-li",t).removeClass("dw-h").slice(B).addClass("dw-h")}r<q&&(r=q);r>C&&(r=C);j&&(j=r==q);k&&(k=r==C);if(d.invalid&&h=="d"){var u=[];d.invalid.dates&&a.each(d.invalid.dates,function(b,a){a.getFullYear()==v&&a.getMonth()==w&&u.push(a.getDate()-1)});
if(d.invalid.daysOfWeek){var A=(new Date(v,w,1)).getDay(),y;a.each(d.invalid.daysOfWeek,function(b,a){for(y=a-A;y<B;y=y+7)y>=0&&u.push(y)})}d.invalid.daysOfMonth&&a.each(d.invalid.daysOfMonth,function(b,a){a=(a+"").split("/");a[1]?a[0]-1==w&&u.push(a[1]-1):u.push(a[0]-1)});a.each(u,function(b,c){a(".dw-li",t).eq(c).removeClass("dw-v")})}c[p[h]]=r}})},methods:{getDate:function(b){var c=a(this).mobiscroll("getInst");if(c)return c.getDate(b?c.temp:c.values)},setDate:function(b,c,d,e){void 0==c&&(c=!1);
return this.each(function(){var f=a(this).mobiscroll("getInst");f&&f.setDate(b,c,d,e)})}}}};a.each(["date","time","datetime"],function(a,f){h.presets[f]=ca;h.presetShort(f)});h.formatDate=function(h,f,q){if(!f)return null;var q=a.extend({},A,q),k=function(a){for(var c=0;g+1<h.length&&h.charAt(g+1)==a;)c++,g++;return c},j=function(a,c,d){c=""+c;if(k(a))for(;c.length<d;)c="0"+c;return c},w=function(a,c,d,f){return k(a)?f[c]:d[c]},g,c="",d=!1;for(g=0;g<h.length;g++)if(d)"'"==h.charAt(g)&&!k("'")?d=!1:
c+=h.charAt(g);else switch(h.charAt(g)){case "d":c+=j("d",f.getDate(),2);break;case "D":c+=w("D",f.getDay(),q.dayNamesShort,q.dayNames);break;case "o":c+=j("o",(f.getTime()-(new Date(f.getFullYear(),0,0)).getTime())/864E5,3);break;case "m":c+=j("m",f.getMonth()+1,2);break;case "M":c+=w("M",f.getMonth(),q.monthNamesShort,q.monthNames);break;case "y":c+=k("y")?f.getFullYear():(10>f.getYear()%100?"0":"")+f.getYear()%100;break;case "h":var n=f.getHours(),c=c+j("h",12<n?n-12:0==n?12:n,2);break;case "H":c+=
j("H",f.getHours(),2);break;case "i":c+=j("i",f.getMinutes(),2);break;case "s":c+=j("s",f.getSeconds(),2);break;case "a":c+=11<f.getHours()?"pm":"am";break;case "A":c+=11<f.getHours()?"PM":"AM";break;case "'":k("'")?c+="'":d=!0;break;default:c+=h.charAt(g)}return c};h.parseDate=function(h,f,q){var k=new Date;if(!h||!f)return k;var f="object"==typeof f?f.toString():f+"",j=a.extend({},A,q),w=j.shortYearCutoff,q=k.getFullYear(),g=k.getMonth()+1,c=k.getDate(),d=-1,n=k.getHours(),k=k.getMinutes(),t=0,
p=-1,e=!1,s=function(a){(a=E+1<h.length&&h.charAt(E+1)==a)&&E++;return a},v=function(a){s(a);a=f.substr(r).match(RegExp("^\\d{1,"+("@"==a?14:"!"==a?20:"y"==a?4:"o"==a?3:2)+"}"));if(!a)return 0;r+=a[0].length;return parseInt(a[0],10)},u=function(a,c,d){a=s(a)?d:c;for(c=0;c<a.length;c++)if(f.substr(r,a[c].length).toLowerCase()==a[c].toLowerCase())return r+=a[c].length,c+1;return 0},r=0,E;for(E=0;E<h.length;E++)if(e)"'"==h.charAt(E)&&!s("'")?e=!1:r++;else switch(h.charAt(E)){case "d":c=v("d");break;
case "D":u("D",j.dayNamesShort,j.dayNames);break;case "o":d=v("o");break;case "m":g=v("m");break;case "M":g=u("M",j.monthNamesShort,j.monthNames);break;case "y":q=v("y");break;case "H":n=v("H");break;case "h":n=v("h");break;case "i":k=v("i");break;case "s":t=v("s");break;case "a":p=u("a",["am","pm"],["am","pm"])-1;break;case "A":p=u("A",["am","pm"],["am","pm"])-1;break;case "'":s("'")?r++:e=!0;break;default:r++}100>q&&(q+=(new Date).getFullYear()-(new Date).getFullYear()%100+(q<=("string"!=typeof w?
w:(new Date).getFullYear()%100+parseInt(w,10))?0:-100));if(-1<d){g=1;c=d;do{j=32-(new Date(q,g-1,32)).getDate();if(c<=j)break;g++;c-=j}while(1)}n=new Date(q,g-1,c,-1==p?n:p&&12>n?n+12:!p&&12==n?0:n,k,t);if(n.getFullYear()!=q||n.getMonth()+1!=g||n.getDate()!=c)throw"Invalid date";return n}})(jQuery);(function(a){a.mobiscroll.themes.jqm={defaults:{jqmBorder:"a",jqmBody:"c",jqmHeader:"b",jqmWheel:"d",jqmClickPick:"c",jqmSet:"b",jqmCancel:"c"},init:function(h,u){var A=u.settings;a(".dw",h).removeClass("dwbg").addClass("ui-overlay-shadow ui-corner-all ui-body-"+A.jqmBorder);a(".dwb-s span",h).attr("data-role","button").attr("data-theme",A.jqmSet);a(".dwb-n span",h).attr("data-role","button").attr("data-theme",A.jqmCancel);a(".dwb-c span",h).attr("data-role","button").attr("data-theme",A.jqmCancel);
a(".dwwb",h).attr("data-role","button").attr("data-theme",A.jqmClickPick);a(".dwv",h).addClass("ui-header ui-bar-"+A.jqmHeader);a(".dwwr",h).addClass("ui-body-"+A.jqmBody);a(".dwpm .dww",h).addClass("ui-body-"+A.jqmWheel);h.trigger("create");a(".dwo",h).click(function(){u.cancel()})}}})(jQuery);



//======================================================== FASTCLICK
         function FastButton(element, handler) {
            this.element = element;
            this.handler = handler;
            element.addEventListener('touchstart', this, false);
         };
         FastButton.prototype.handleEvent = function(event) {
            switch (event.type) {
               case 'touchstart': this.onTouchStart(event); break;
               case 'touchmove': this.onTouchMove(event); break;
               case 'touchend': this.onClick(event); break;
               case 'click': this.onClick(event); break;
            }
         };
         FastButton.prototype.onTouchStart = function(event) {
			//event.stopPropagation();
            this.element.addEventListener('touchend', this, false);
            document.body.addEventListener('touchmove', this, false);
            this.startX = event.touches[0].clientX;
            this.startY = event.touches[0].clientY;
			//isMoving = false;
         };
         FastButton.prototype.onTouchMove = function(event) {
            if(Math.abs(event.touches[0].clientX - this.startX) > 10 || Math.abs(event.touches[0].clientY - this.startY) > 10) {
               this.reset();
            }
         };
         FastButton.prototype.onClick = function(event) {
			event.stopPropagation();
            this.reset();
            this.handler(event);
            if(event.type == 'touchend') {
               preventGhostClick(this.startX, this.startY);
            }
         };
         FastButton.prototype.reset = function() {
            this.element.removeEventListener('touchend', this, false);
            document.body.removeEventListener('touchmove', this, false);			
         };
         function preventGhostClick(x, y) {
            coordinates.push(x, y);
            window.setTimeout(gpop, 2000);
         };
         function gpop() {
            coordinates.splice(0, 2);
         };
         function gonClick(event) {
            for(var i = 0; i < coordinates.length; i += 2) {
               var x = coordinates[i];
               var y = coordinates[i + 1];
               if (Math.abs(event.clientX - x) < 100 && Math.abs(event.clientY - y) < 100) {
                  event.stopPropagation();
                  event.preventDefault();
               }
            }
         };
         document.addEventListener('click', gonClick, true);
         var coordinates = [];
         
         //function initFastButtons() {
         //   new FastButton(document.getElementById("fastclick"), goSomewhere);
         //};
         
         function goSomewhere() {
			var theTarget = document.elementFromPoint(this.startX, this.startY);
			if(theTarget.nodeType == 3) theTarget = theTarget.parentNode;
			
			var theParent = theTarget;
			
			// Set button style back to normal
			while (theParent.tagName !== "LI") {										// Keep looking for the parent element until we hit the LI. That takes care of both buttons and list items
				if (theParent.tagName === "FORM" || theParent.tagName === "BODY" ) {
					break;
				}
				theParent = theParent.parentNode;
				if (theParent.className.indexOf("ui-btn-down-a") !== -1) {				// If the button class A is a button down, then
					theParent.className = theParent.className.replace("ui-btn-down-a","ui-btn-up-a");	// Make it button up.
				}
				if (theParent.className.indexOf("ui-btn-down-d") !== -1) {				// If the button class D is a button down, then
					theParent.className = theParent.className.replace("ui-btn-down-d","ui-btn-up-d");	// Make it button up.
				}
			}
			// Slash set button style
						
			var theEvent = document.createEvent('MouseEvents');
			theEvent.initEvent('click', true, true);
			theTarget.dispatchEvent(theEvent);
         };
//========================================================


 /*!
 * Thumbnail helper for fancyBox
 * version: 1.0.7 (Mon, 01 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             thumbs: {
 *                 width  : 50,
 *                 height : 50
 *             }
 *         }
 *     });
 *
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.thumbs = {
		defaults : {
			width    : 50,       // thumbnail width
			height   : 50,       // thumbnail height
			position : 'bottom', // 'top' or 'bottom'
			source   : function ( item ) {  // function to obtain the URL of the thumbnail image
				var href;

				if (item.element) {
					href = $(item.element).find('img').attr('src');
				}

				if (!href && item.type === 'image' && item.href) {
					href = item.href;
				}

				return href;
			}
		},

		wrap  : null,
		list  : null,
		width : 0,

		init: function (opts, obj) {
			var that = this,
				list,
				thumbWidth  = opts.width,
				thumbHeight = opts.height,
				thumbSource = opts.source;

			//Build list structure
			list = '';

			for (var n = 0; n < obj.group.length; n++) {
				list += '<li><a style="width:' + thumbWidth + 'px;height:' + thumbHeight + 'px;" href="javascript:jQuery.fancybox.jumpto(' + n + ');"></a></li>';
			}

			this.wrap = $('<div id="fancybox-thumbs"></div>').addClass(opts.position).appendTo('body');
			this.list = $('<ul>' + list + '</ul>').appendTo(this.wrap);

			//Load each thumbnail
			$.each(obj.group, function (i) {
				var href = thumbSource( obj.group[ i ] );

				if (!href) {
					return;
				}

				$("<img />").load(function () {
					var width  = this.width,
						height = this.height,
						widthRatio, heightRatio, parent;

					if (!that.list || !width || !height) {
						return;
					}

					//Calculate thumbnail width/height and center it
					widthRatio  = width / thumbWidth;
					heightRatio = height / thumbHeight;

					parent = that.list.children().eq(i).find('a');

					if (widthRatio >= 1 && heightRatio >= 1) {
						if (widthRatio > heightRatio) {
							width  = Math.floor(width / heightRatio);
							height = thumbHeight;

						} else {
							width  = thumbWidth;
							height = Math.floor(height / widthRatio);
						}
					}

					$(this).css({
						width  : width,
						height : height,
						top    : Math.floor(thumbHeight / 2 - height / 2),
						left   : Math.floor(thumbWidth / 2 - width / 2)
					});

					parent.width(thumbWidth).height(thumbHeight);

					$(this).hide().appendTo(parent).fadeIn(300);

				}).attr('src', href);
			});

			//Set initial width
			this.width = this.list.children().eq(0).outerWidth(true);

			this.list.width(this.width * (obj.group.length + 1)).css('left', Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5)));
		},

		beforeLoad: function (opts, obj) {
			//Remove self if gallery do not have at least two items
			if (obj.group.length < 2) {
				obj.helpers.thumbs = false;

				return;
			}

			//Increase bottom margin to give space for thumbs
			obj.margin[ opts.position === 'top' ? 0 : 2 ] += ((opts.height) + 15);
		},

		afterShow: function (opts, obj) {
			//Check if exists and create or update list
			if (this.list) {
				this.onUpdate(opts, obj);

			} else {
				this.init(opts, obj);
			}

			//Set active element
			this.list.children().removeClass('active').eq(obj.index).addClass('active');
		},

		//Center list
		onUpdate: function (opts, obj) {
			if (this.list) {
				this.list.stop(true).animate({
					'left': Math.floor($(window).width() * 0.5 - (obj.index * this.width + this.width * 0.5))
				}, 150);
			}
		},

		beforeClose: function () {
			if (this.wrap) {
				this.wrap.remove();
			}

			this.wrap  = null;
			this.list  = null;
			this.width = 0;
		}
	}

}(jQuery));

 /*!
 * Buttons helper for fancyBox
 * version: 1.0.5 (Mon, 15 Oct 2012)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             buttons: {
 *                 position : 'top'
 *             }
 *         }
 *     });
 *
 */
(function ($) {
	//Shortcut for fancyBox object
	var F = $.fancybox;

	//Add helper object
	F.helpers.buttons = {
		defaults : {
			skipSingle : false, // disables if gallery contains single image
			position   : 'top', // 'top' or 'bottom'
			tpl        : '<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'
		},

		list : null,
		buttons: null,

		beforeLoad: function (opts, obj) {
			//Remove self if gallery do not have at least two items

			if (opts.skipSingle && obj.group.length < 2) {
				obj.helpers.buttons = false;
				obj.closeBtn = true;

				return;
			}

			//Increase top margin to give space for buttons
			obj.margin[ opts.position === 'bottom' ? 2 : 0 ] += 30;
		},

		onPlayStart: function () {
			if (this.buttons) {
				this.buttons.play.attr('title', 'Pause slideshow').addClass('btnPlayOn');
			}
		},

		onPlayEnd: function () {
			if (this.buttons) {
				this.buttons.play.attr('title', 'Start slideshow').removeClass('btnPlayOn');
			}
		},

		afterShow: function (opts, obj) {
			var buttons = this.buttons;

			if (!buttons) {
				this.list = $(opts.tpl).addClass(opts.position).appendTo('body');

				buttons = {
					prev   : this.list.find('.btnPrev').click( F.prev ),
					next   : this.list.find('.btnNext').click( F.next ),
					play   : this.list.find('.btnPlay').click( F.play ),
					toggle : this.list.find('.btnToggle').click( F.toggle ),
					close  : this.list.find('.btnClose').click( F.close )
				}
			}

			//Prev
			if (obj.index > 0 || obj.loop) {
				buttons.prev.removeClass('btnDisabled');
			} else {
				buttons.prev.addClass('btnDisabled');
			}

			//Next / Play
			if (obj.loop || obj.index < obj.group.length - 1) {
				buttons.next.removeClass('btnDisabled');
				buttons.play.removeClass('btnDisabled');

			} else {
				buttons.next.addClass('btnDisabled');
				buttons.play.addClass('btnDisabled');
			}

			this.buttons = buttons;

			this.onUpdate(opts, obj);
		},

		onUpdate: function (opts, obj) {
			var toggle;

			if (!this.buttons) {
				return;
			}

			toggle = this.buttons.toggle.removeClass('btnDisabled btnToggleOn');

			//Size toggle button
			if (obj.canShrink) {
				toggle.addClass('btnToggleOn');

			} else if (!obj.canExpand) {
				toggle.addClass('btnDisabled');
			}
		},

		beforeClose: function () {
			if (this.list) {
				this.list.remove();
			}

			this.list    = null;
			this.buttons = null;
		}
	};

}(jQuery));


/*!
 * Media helper for fancyBox
 * version: 1.0.6 (Fri, 14 Jun 2013)
 * @requires fancyBox v2.0 or later
 *
 * Usage:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: true
 *         }
 *     });
 *
 * Set custom URL parameters:
 *     $(".fancybox").fancybox({
 *         helpers : {
 *             media: {
 *                 youtube : {
 *                     params : {
 *                         autoplay : 0
 *                     }
 *                 }
 *             }
 *         }
 *     });
 *
 * Or:
 *     $(".fancybox").fancybox({,
 *         helpers : {
 *             media: true
 *         },
 *         youtube : {
 *             autoplay: 0
 *         }
 *     });
 *
 *  Supports:
 *
 *      Youtube
 *          http://www.youtube.com/watch?v=opj24KnzrWo
 *          http://www.youtube.com/embed/opj24KnzrWo
 *          http://youtu.be/opj24KnzrWo
 *			http://www.youtube-nocookie.com/embed/opj24KnzrWo
 *      Vimeo
 *          http://vimeo.com/40648169
 *          http://vimeo.com/channels/staffpicks/38843628
 *          http://vimeo.com/groups/surrealism/videos/36516384
 *          http://player.vimeo.com/video/45074303
 *      Metacafe
 *          http://www.metacafe.com/watch/7635964/dr_seuss_the_lorax_movie_trailer/
 *          http://www.metacafe.com/watch/7635964/
 *      Dailymotion
 *          http://www.dailymotion.com/video/xoytqh_dr-seuss-the-lorax-premiere_people
 *      Twitvid
 *          http://twitvid.com/QY7MD
 *      Twitpic
 *          http://twitpic.com/7p93st
 *      Instagram
 *          http://instagr.am/p/IejkuUGxQn/
 *          http://instagram.com/p/IejkuUGxQn/
 *      Google maps
 *          http://maps.google.com/maps?q=Eiffel+Tower,+Avenue+Gustave+Eiffel,+Paris,+France&t=h&z=17
 *          http://maps.google.com/?ll=48.857995,2.294297&spn=0.007666,0.021136&t=m&z=16
 *          http://maps.google.com/?ll=48.859463,2.292626&spn=0.000965,0.002642&t=m&z=19&layer=c&cbll=48.859524,2.292532&panoid=YJ0lq28OOy3VT2IqIuVY0g&cbp=12,151.58,,0,-15.56
 */
(function ($) {
	"use strict";

	//Shortcut for fancyBox object
	var F = $.fancybox,
		format = function( url, rez, params ) {
			params = params || '';

			if ( $.type( params ) === "object" ) {
				params = $.param(params, true);
			}

			$.each(rez, function(key, value) {
				url = url.replace( '$' + key, value || '' );
			});

			if (params.length) {
				url += ( url.indexOf('?') > 0 ? '&' : '?' ) + params;
			}

			return url;
		};

	//Add helper object
	F.helpers.media = {
		defaults : {
			youtube : {
				matcher : /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
				params  : {
					autoplay    : 1,
					autohide    : 1,
					fs          : 1,
					rel         : 0,
					hd          : 1,
					wmode       : 'opaque',
					enablejsapi : 1
				},
				type : 'iframe',
				url  : '//www.youtube.com/embed/$3'
			},
			vimeo : {
				matcher : /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
				params  : {
					autoplay      : 1,
					hd            : 1,
					show_title    : 1,
					show_byline   : 1,
					show_portrait : 0,
					fullscreen    : 1
				},
				type : 'iframe',
				url  : '//player.vimeo.com/video/$1'
			},
			metacafe : {
				matcher : /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
				params  : {
					autoPlay : 'yes'
				},
				type : 'swf',
				url  : function( rez, params, obj ) {
					obj.swf.flashVars = 'playerVars=' + $.param( params, true );

					return '//www.metacafe.com/fplayer/' + rez[1] + '/.swf';
				}
			},
			dailymotion : {
				matcher : /dailymotion.com\/video\/(.*)\/?(.*)/,
				params  : {
					additionalInfos : 0,
					autoStart : 1
				},
				type : 'swf',
				url  : '//www.dailymotion.com/swf/video/$1'
			},
			twitvid : {
				matcher : /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
				params  : {
					autoplay : 0
				},
				type : 'iframe',
				url  : '//www.twitvid.com/embed.php?guid=$1'
			},
			twitpic : {
				matcher : /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
				type : 'image',
				url  : '//twitpic.com/show/full/$1/'
			},
			instagram : {
				matcher : /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
				type : 'image',
				url  : '//$1/p/$2/media/?size=l'
			},
			google_maps : {
				matcher : /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
				type : 'iframe',
				url  : function( rez ) {
					return '//maps.google.' + rez[1] + '/' + rez[3] + '' + rez[4] + '&output=' + (rez[4].indexOf('layer=c') > 0 ? 'svembed' : 'embed');
				}
			}
		},

		beforeLoad : function(opts, obj) {
			var url   = obj.href || '',
				type  = false,
				what,
				item,
				rez,
				params;

			for (what in opts) {
				if (opts.hasOwnProperty(what)) {
					item = opts[ what ];
					rez  = url.match( item.matcher );

					if (rez) {
						type   = item.type;
						params = $.extend(true, {}, item.params, obj[ what ] || ($.isPlainObject(opts[ what ]) ? opts[ what ].params : null));

						url = $.type( item.url ) === "function" ? item.url.call( this, rez, params, obj ) : format( item.url, rez, params );

						break;
					}
				}
			}

			if (type) {
				obj.href = url;
				obj.type = type;

				obj.autoHeight = false;
			}
		}
	};

}(jQuery));

(function(){var q=function(){function c(a){return(""+a).replace(/&(?!\w+;)|[<>"']/g,function(a){return k[a]||a})}var e=Object.prototype.toString;Array.isArray=Array.isArray||function(a){return"[object Array]"==e.call(a)};var i=String.prototype.trim,g;if(i)g=function(a){return null==a?"":i.call(a)};else{var h,m;/\S/.test("\u00a0")?(h=/^[\s\xA0]+/,m=/[\s\xA0]+$/):(h=/^\s+/,m=/\s+$/);g=function(a){return null==a?"":a.toString().replace(h,"").replace(m,"")}}var k={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;",
"'":"&#39;"},o={},p=function(){};p.prototype={otag:"{{",ctag:"}}",pragmas:{},buffer:[],pragmas_implemented:{"IMPLICIT-ITERATOR":!0},context:{},render:function(a,d,b,f){if(!f)this.context=d,this.buffer=[];if(this.includes("",a)){var a=this.render_pragmas(a),j=this.render_section(a,d,b);!1===j&&(j=this.render_tags(a,d,b,f));if(f)return j;this.sendLines(j)}else{if(f)return a;this.send(a)}},send:function(a){""!==a&&this.buffer.push(a)},sendLines:function(a){if(a)for(var a=a.split("\n"),d=0;d<a.length;d++)this.send(a[d])},
render_pragmas:function(a){if(!this.includes("%",a))return a;var d=this,b=this.getCachedRegex("render_pragmas",function(a,d){return RegExp(a+"%([\\w-]+) ?([\\w]+=[\\w]+)?"+d,"g")});return a.replace(b,function(a,b,e){if(!d.pragmas_implemented[b])throw{message:"This implementation of mustache doesn't understand the '"+b+"' pragma"};d.pragmas[b]={};e&&(a=e.split("="),d.pragmas[b][a[0]]=a[1]);return""})},render_partial:function(a,d,b){a=g(a);if(!b||void 0===b[a])throw{message:"unknown_partial '"+a+"'"};
return!d||"object"!=typeof d[a]?this.render(b[a],d,b,!0):this.render(b[a],d[a],b,!0)},render_section:function(a,d,b){if(!this.includes("#",a)&&!this.includes("^",a))return!1;var f=this,j=this.getCachedRegex("render_section",function(a,b){return RegExp("^([\\s\\S]*?)"+a+"(\\^|\\#)\\s*(.+)\\s*"+b+"\n*([\\s\\S]*?)"+a+"\\/\\s*\\3\\s*"+b+"\\s*([\\s\\S]*)$","g")});return a.replace(j,function(a,j,e,c,g,h){var a=j?f.render_tags(j,d,b,!0):"",h=h?f.render(h,d,b,!0):"",n,c=f.find(c,d);"^"===e?n=!c||Array.isArray(c)&&
0===c.length?f.render(g,d,b,!0):"":"#"===e&&(n=Array.isArray(c)?f.map(c,function(a){return f.render(g,f.create_context(a),b,!0)}).join(""):f.is_object(c)?f.render(g,f.create_context(c),b,!0):"function"==typeof c?c.call(d,g,function(a){return f.render(a,d,b,!0)}):c?f.render(g,d,b,!0):"");return a+n+h})},render_tags:function(a,d,b,f){for(var j=this,e=function(){return j.getCachedRegex("render_tags",function(a,b){return RegExp(a+"(=|!|>|&|\\{|%)?([^#\\^]+?)\\1?"+b+"+","g")})},g=e(),h=function(a,f,h){switch(f){case "!":return"";
case "=":return j.set_delimiters(h),g=e(),"";case ">":return j.render_partial(h,d,b);case "{":case "&":return j.find(h,d);default:return c(j.find(h,d))}},a=a.split("\n"),i=0;i<a.length;i++)a[i]=a[i].replace(g,h,this),f||this.send(a[i]);if(f)return a.join("\n")},set_delimiters:function(a){a=a.split(" ");this.otag=this.escape_regex(a[0]);this.ctag=this.escape_regex(a[1])},escape_regex:function(a){if(!arguments.callee.sRE)arguments.callee.sRE=RegExp("(\\/|\\.|\\*|\\+|\\?|\\||\\(|\\)|\\[|\\]|\\{|\\}|\\\\)",
"g");return a.replace(arguments.callee.sRE,"\\$1")},find:function(a,d){function b(a){return!1===a||0===a||a}var a=g(a),f;if(a.match(/([a-z_]+)\./ig)){var c=this.walk_context(a,d);b(c)&&(f=c)}else b(d[a])?f=d[a]:b(this.context[a])&&(f=this.context[a]);return"function"==typeof f?f.apply(d):void 0!==f?f:""},walk_context:function(a,d){for(var b=a.split("."),f=void 0!=d[b[0]]?d:this.context,c=f[b.shift()];void 0!=c&&0<b.length;)f=c,c=c[b.shift()];return"function"==typeof c?c.apply(f):c},includes:function(a,
d){return-1!=d.indexOf(this.otag+a)},create_context:function(a){if(this.is_object(a))return a;var d=".";if(this.pragmas["IMPLICIT-ITERATOR"])d=this.pragmas["IMPLICIT-ITERATOR"].iterator;var b={};b[d]=a;return b},is_object:function(a){return a&&"object"==typeof a},map:function(a,d){if("function"==typeof a.map)return a.map(d);for(var b=[],c=a.length,e=0;e<c;e++)b.push(d(a[e]));return b},getCachedRegex:function(a,d){var b=o[this.otag];b||(b=o[this.otag]={});var c=b[this.ctag];c||(c=b[this.ctag]={});
(b=c[a])||(b=c[a]=d(this.otag,this.ctag));return b}};return{name:"mustache.js",version:"0.4.0",to_html:function(a,c,b,f){var e=new p;if(f)e.send=f;e.render(a,c||{},b);if(!f)return e.buffer.join("\n")}}}();(function(){var c={VERSION:"0.10",templates:{},$:"undefined"!==typeof window?window.jQuery||window.Zepto||null:null,addTemplate:function(e,i){if("object"===typeof e)for(var g in e)this.addTemplate(g,e[g]);else c[e]?console.error("Invalid name: "+e+"."):c.templates[e]?console.error('Template "'+e+
'  " exists'):(c.templates[e]=i,c[e]=function(g,i){var g=g||{},k=q.to_html(c.templates[e],g,c.templates);return c.$&&!i?c.$(k):k})},clearAll:function(){for(var e in c.templates)delete c[e];c.templates={}},refresh:function(){c.clearAll();c.grabTemplates()},grabTemplates:function(){var e,i=document.getElementsByTagName("script"),g,h=[];for(e=0,l=i.length;e<l;e++)if((g=i[e])&&g.innerHTML&&g.id&&("text/html"===g.type||"text/x-icanhaz"===g.type))c.addTemplate(g.id,"".trim?g.innerHTML.trim():g.innerHTML.replace(/^\s+/,
"").replace(/\s+$/,"")),h.unshift(g);for(e=0,l=h.length;e<l;e++)h[e].parentNode.removeChild(h[e])}};"undefined"!==typeof require?module.exports=c:window.ich=c;"undefined"!==typeof document&&(c.$?c.$(function(){c.grabTemplates()}):document.addEventListener("DOMContentLoaded",function(){c.grabTemplates()},!0))})()})();

