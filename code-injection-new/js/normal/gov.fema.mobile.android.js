

      DiamondMapWidget = {};
      DiamondMapWidget.fullScreenControl = false;
      DiamondMapWidget.showListView = false;
      





      $.mobile.fixedtoolbar.prototype.options.hideDuringFocus = true;
    


document.write(prop.app.version);
document.write(prop.app.releaseDate);













      app.initialize();
      dr.initialize();
      drc.initialize();
      ekInitDB();
    


      DiamondMapWidget = {};
      DiamondMapWidget.fullScreenControl = false;
      DiamondMapWidget.showListView = false;
      


/*
 * @file
 *
 */

var dr_pictureSource;    // picture source
var dr_destinationType;  // sets the format of returned value
var dr_positionObject;   // holds the position object
var dr_imageData;
var dr_camera = false;
var dr_isSubmitting = false ;

var dr_requiredFields = [prop.dr.fieldTitleSelector, prop.dr.fieldTypeSelector, prop.dr.fieldDescriptionSelector];
var dr_optionalFields = [prop.dr.fieldNameSelector];
var DiamondMapWidget  = {} ;

var dr = {
   // Disaster Reporter Constructor
   //
initialize: function() {
   var disclaimerChecked = this.isDisclaimerChecked();
   $(prop.dr.disclaimer.className).prop('checked', disclaimerChecked);
   
   this.bindEvents();
},
   
   // Bind Event Listeners
   //
   // Bind any events that are required on startup. Common events are:
   // 'load', 'deviceready', 'offline', and 'online'.
bindEvents: function() {
  document.addEventListener('deviceready', this.onDeviceReady, false);
  
  $("#submitreport_submit").click(function() {
    if ( !dr_isSubmitting ) {
      dr_reportFormSubmit();
    }
  });
  
  $("#submitreport_reset").click(function() {
    if ( !dr_isSubmitting ) {
      dr_resetFormFields();
    }
  });
  
  //populate select-field options
  dr_populateSelectOptions(prop.dr.fieldTypeSelector, prop.dr.disasterTypes);
  //dr_populateSelectOptions(prop.dr.fieldNameSelector, prop.dr.disasterNames);
  
  // populate EXIF data after image is captured/loaded
  // once images load
  $(prop.dr.imageHolderSelector).load(function() {
    if(dr_camera) {
      dr_prepCameraImage();
    }
    else {
      dr_extractEXIFData(prop.dr.imageHolderId);
    }
  });
  
  $(".fema-global-header a.ui-btn-back").click(function(e) {
    e.preventDefault();
    if ( !dr_isSubmitting ) {
      dr.backButton();
    }
  });
  
  $("#footer-home-btn").click(function(e) {
    if ( dr_isSubmitting ) {
      e.preventDefault();
    }
  });
  
  $("#logo").click(function(e) {
    if ( dr_isSubmitting ) {
      e.preventDefault();
    }
  });

  $(prop.dr.disclaimer.className).click(function(e) {
    var checked = $(this).is(':checked');
    $(prop.dr.disclaimer.className).each(function(i){
      $(this).prop('checked', checked);
    });
    if (!checked) {
      Cache.set(prop.dr.disclaimer.cacheKey, false, false);
    }
  });
  
  
  $('#dashboard').on('pageshow', function(event, ui){
    var checked = false;
    $(prop.dr.disclaimer.className).each(function(i){
      if ($(this).is(':checked')) {
        checked = true;
      }
    });
    if (checked) {
      Cache.set(prop.dr.disclaimer.cacheKey, true, false);
    }
    else {
      Cache.set(prop.dr.disclaimer.cacheKey, false, false);
    }
  });
  
  $("#submitreport_form .focusable").focus(function() {
    $(".fema-global-footer").hide();
    $(".fema-global-header").css("top", "-1px");
  });
  $("#submitreport_form .focusable").blur(function() {
    $(".fema-global-footer").show();
  });
},
  
   // deviceready Event Handler
   //
onDeviceReady: function() {
   document.addEventListener("backbutton", dr.backButton, false);
   dr_pictureSource = navigator.camera.PictureSourceType;
   dr_destinationType = navigator.camera.DestinationType;
   dr_positionObject = null;
},
   
   // back button event handler
   //
   backButton : function() {
      var activePageId = $.mobile.activePage.attr("id");
      if ( activePageId == "submitreport-success") {
         window.history.go(-2);
      } else {
         window.history.go(-1);
      }
   },
   
   isDisclaimerChecked : function() {
      var cacheDisclaimer = Cache.get(prop.dr.disclaimer.cacheKey);
      return ( (cacheDisclaimer) ? cacheDisclaimer : prop.dr.disclaimer.defaultVal );
   }
   
};




///////////////////////////////////////////////////////////////////////////////
// Callbacks triggered on button click events
///////////////////////////////////////////////////////////////////////////////

// Take picture using device camera and retrieve image location
//
function loadImageFromDevice(useCamera, buttonClick) {
   if(typeof(useCamera)==='undefined') useCamera = false;
   if(typeof(buttonClick)==='undefined') buttonClick = false;
   
   // if responsing to a button click event
   // load check for geolocation if we don't have one
   if (buttonClick && !dr_positionObject && useCamera) {
      common_showLoadingAnimation("acquiring location...");
      navigator.geolocation.getCurrentPosition(drSuccess.geolocation, drFail.geolocation, prop.app.geoLocationHighAccuracyOptions);
      return;
   }
   
   // resume normal
   common_hideLoadingAnimation();
   dr_camera = useCamera;
   
   // populate options to pass to getPicture method
   // sourceType is set to camera if useCamera is true;
   // otherwise it is set to album
   var options = {
      targetWidth     : 1024,
      targetHeight    : 768,
      mediaType       : Camera.MediaType.PICTURE,
      encodingType    : Camera.EncodingType.JPEG,
      destinationType : dr_destinationType.FILE_URI,
      sourceType      : dr_pictureSource.PHOTOLIBRARY
   };
   if (useCamera) {
      options.sourceType = dr_pictureSource.CAMERA;
   }
   if (prop.app.platform != "ios" && useCamera) {
      options.saveToPhotoAlbum = true;
   }
   if(prop.app.platform == "ios" && !useCamera) {
      options.destinationType = dr_destinationType.NATIVE_URI;
   }
   
   // invoke phonegap's getPicture method
   navigator.camera.getPicture(drSuccess.image, drFail.image, options);
}

// display a map of the dr submissions
//
function loadDRSubmissionsMap() {
  if ( prop.app.testMode ) {
    console.log( "loading DR Submissions Map" ) ;
  }

  window.open( encodeURI( prop.dr.mapURL ), '_blank', 'toolbar=1,location=0,scrollbars=1' ) ;
}

///////////////////////////////////////////////////////////////////////////////
// Success callbacks
///////////////////////////////////////////////////////////////////////////////

var drSuccess = {
   
  // Called when location data is available for use
  geolocation : function (position) {
    dr_positionObject = position;
    //resume function call to loadImageFromDevice
    loadImageFromDevice(true);
  },

  // Called when an image is successfully captured/loaded
  image : function (imageURI) {
    if ( prop.app.testMode ) {
      console.log( "Got imageURI : " + imageURI ) ;
    }
    
//    if ( prop.app.platform == "android") {
//      imageURI = imageURI.replace("%3A", ":") ;
//    }
    
    // reset form data
    dr_resetFormFields() ;
    // load image into the thumbnail
    $( prop.dr.imagePopupHolderSelector ).attr( "src", imageURI ) ;
    // load image into the popup/zoom container
    $( prop.dr.imageHolderSelector ).attr( "src", imageURI ) ;
  },
  
  diamondUploadImage: function () {
    dr_resetFormFields() ;
    dr_resetImageData() ;

    //go to success page
    $.mobile.changePage( prop.dr.successPageSelector, prop.app.pageTransition, true, false ) ;
    common_hideLoadingAnimation() ;
    dr_setFormDisabled( false ) ;
    
    if ( dr_camera ) {
      camera.navigator.cleanup( drSuccess.cleanup, drFail.cleanup ) ;
    }
  },
  
  cleanup : function( error ) {
  }
};

///////////////////////////////////////////////////////////////////////////////
// Failure callbacks
///////////////////////////////////////////////////////////////////////////////

var drFail = {
   
  // Called when location data is NOT available.
  geolocation : function( error, lowAccuracy ) {
    // if getting location with higher accuracy (e.g. gps based) fails/timesout
    // try to get one with lower accuracy (e.g. connection based)
    if ( typeof( lowAccuracy ) === 'undefined' || !lowAccuracy ) {
      navigator.geolocation.getCurrentPosition( drSuccess.geolocation, function ( e ) {
        drFail.geolocation( e, true ) ;
      }, prop.app.geoLocationLowAccuracyOptions ) ;
      return ;
    }
    
    // resumes normally - we have no location due to location
    // services being disabled
    common_hideLoadingAnimation() ;
    navigator.notification.alert( prop.app.noGeoLocationAlert ) ;
    console.log ( "geolocation failed: " + error ) ;
    dr_setFormDisabled( false ) ;
    return;
  },
  
  // Called if something bad happens while capturing/loading image.
  image : function ( error ) {
    // if user cancels image selection, don't display alert
    // ios returns "no image selected, android returns "Selection cancelled."
    if ( error != "no image selected" && error != "Selection cancelled." ) {
      navigator.notification.alert( prop.dr.uploadError ) ;
      console.log( "loadImageFromDevice failed: " + error ) ;
      dr_setFormDisabled( false ) ;
    }
  },
  
  getFile : function ( error ) {
    navigator.notification.alert( prop.dr.getFileError ) ;
    console.log( "getFile failed: " + error ) ;
    common_hideLoadingAnimation() ;
    dr_setFormDisabled( false ) ;
  },
  
  // called when image upload fails
  diamondUploadImage : function(error) {
    navigator.notification.alert( prop.dr.uploadError ) ;
    console.log( "diamondUploadImage failed: " + error ) ;
    common_hideLoadingAnimation() ;
    dr_setFormDisabled( false ) ;
  },
  
  // called when image submit fails
  diamondSubmitImage : function(error) {
    //    navigator.notification.alert( prop.dr.submitError ) ;
    console.log( "diamondSubmitImage failed: " + error ) ;
    common_hideLoadingAnimation() ;
    dr_setFormDisabled( false ) ;

    if ( dr_camera ) {
      camera.navigator.cleanup( drSuccess.cleanup, drFail.cleanup ) ;
    }
  },
  
  cleanup : function( error ) {
    console.log( "Error doing camera cleanup: " + error ) ;
  }
};

///////////////////////////////////////////////////////////////////////////////
// Helper functions
///////////////////////////////////////////////////////////////////////////////


function dr_reportFormSubmit() {
   if ( !dr_validateForm()) {
      return false ;
   }
  
  // disable submit, cancel, and back buttons, and input fields
  dr_setFormDisabled( true ) ;
  
  common_showLoadingAnimation( prop.dr.uploadStatus ) ;
  
  // upload files directly to diamond
  dr_diamondUploadImage() ;
}

//
//
function dr_prepCameraImage () {
  if ( prop.app.testMode ) {
    console.log( "Preparing Camera Image" ) ;
  }

  var now = new Date();
  dr_imageData = {
    latitude:   dr_positionObject.coords.latitude,
    longitude:  dr_positionObject.coords.longitude,
    altitude:   dr_positionObject.coords.altitude,
    heading:    dr_positionObject.coords.heading,
    photodate:  now.toISOString(),
    reportdate: now.toISOString(),
  };
  
  // uncomment this to include image position data in image upload
  // dr_reverseGeocodeImage() ;
  
  $.mobile.changePage(prop.dr.reportPageSelector, prop.app.pageTransition, true, false);
}

//
//
function dr_extractEXIFData(imageID) {
  if ( prop.app.testMode ) {
    console.log( "Extracting EXIF Data" ) ;
  }

  var now = new Date();
  var oImg = document.getElementById(imageID);
  oImg.exifdata = null;

  EXIF.getData(oImg, function() {
    if ( prop.app.testMode ) {
      console.log( "EXIF data : " + JSON.stringify( EXIF.getAllTags( oImg ), null, 4 )) ;
    }
    
    var latitude  = EXIF.getTag(oImg, "GPSLatitude");
    var longitude = EXIF.getTag(oImg, "GPSLongitude");
    var photodate = EXIF.getTag(oImg, "DateTimeOriginal"); // local date/time
    var phototime = EXIF.getTag(oImg, "GPSTimeStamp");     // utc time

    if (null == latitude || null == longitude) {
      dr_resetImageData();
      navigator.notification.alert(prop.app.noEXIFLocationAlert);
      return;
    }
               
    if ( photodate == null ) {
      photodate = EXIF.getTag( oImg, "DateTimeDigitized" ) ;
      if ( photodate == null ) {
        photodate = EXIF.getTag( oImg, "DateTime" ) ;
      }
    }
               
    if (null == photodate || null == phototime) {
        dr_resetImageData();
        navigator.notification.alert(prop.app.noEXIFDateTimeAlert);
        return;
    }
    
    if ( prop.app.testMode ) {
     console.log( "Found lat, lon, date, and time" ) ;
    }
    
    // get local date
    photodate = photodate.match(/^(\d\d\d\d):(\d\d):(\d\d)\s{1}(\d\d)/) ;
               
    // adjust date if UTC in next day
    if ( phototime[0] < photodate[4] ) {
      photodate[3] = ( Number(photodate[3]) + 1 ).toString() ;
    }
               
    var utcPhotoDateTime = photodate[1] + '-'           // year
                  + photodate[2] + '-'                  // month
                  + photodate[3] + 'T'                  // day
                  + phototime[0].padLeft(10,0) + ':'    // hours
                  + phototime[1].padLeft(10,0) + ':'    // minutes
                  + phototime[2].padLeft(10,0) + 'Z' ;  //seconds

    dr_imageData = {
       // latitude: dr_convertDMSToDecimal(latitude, EXIF.getTag(oImg, "GPSLatitudeRef")),
       // longitude: dr_convertDMSToDecimal(longitude, EXIF.getTag(oImg, "GPSLongitudeRef")),
       // altitude: EXIF.getTag(oImg, "GPSAltitude"),
       // heading: EXIF.getTag(oImg, "GPSImgDirection"),
       photodate: utcPhotoDateTime,
       reportdate: now.toISOString(),
    };

    if ( prop.app.testMode ) {
      console.log( "dr_imageData = " + JSON.stringify( dr_imageData, null, 4 )) ;
    }
    
    // uncomment this to include image position data in image upload
    // dr_reverseGeocodeImage() ;
             
    $.mobile.changePage(prop.dr.reportPageSelector, prop.app.pageTransition, true, false);
  });
}


//
//
function dr_convertDMSToDecimal (dms, gpsRef) {
   var decimalValue = dms[0] + ( ( dms[1] + ( dms[2] / 60 ) ) / 60 );
   if (gpsRef == "W" || gpsRef == "S") {
      decimalValue = decimalValue * -1;
   }
   
   return decimalValue;
}


//
//
function dr_validateForm() {
   var formValid = true;
   $(".form-error-message").remove();
   
   for (var i = 0; i < dr_requiredFields.length; i++) {
      var input = $(dr_requiredFields[i]);
      if (input.val().trim() == "") {
         input.parent().addClass("form-error");
         $(prop.dr.fieldErrorMsgHTML).insertBefore(input.parent());
         formValid = false;
      }
      else {
         input.parent().removeClass("form-error");
      }
   }
   
   return formValid;
}


//
//
function dr_resetFormFields() {
   var fields = dr_requiredFields.concat(dr_optionalFields);
   
   for (var i = 0; i < fields.length; i++) {
      $field = $(fields[i]);
      if ($field.is("select")) {
         $field[0].selectedIndex = 0;
         $field.trigger("change");
      } else {
         $field.val("");
      }
   }
}


//
//
function dr_resetImageData() {
   $(prop.dr.imageHolderSelector).attr("src", "");
   $(prop.dr.imagePopupHolderSelector).attr("src", "");
   dr_imageData = null;
   dr_positionObject = null;
}

//
//
function dr_setFormDisabled( value ) {
  if ( prop.app.testMode ) {
    console.log( "Setting form inputs to disabled = " + value ) ;
  }
  
  // set inputs
  $("#submitreport_title").prop( 'disabled', value ) ;
  $("#submitreport_type").prop( 'disabled', value ) ;
  //$("#submitreport_name").prop( 'disabled', value ) ;
  $("#submitreport_description").prop( 'disabled', value ) ;
  
  dr_isSubmitting = value ; // affects button callbacks
}

//
//
function dr_populateSelectOptions (selector, options) {
   $(selector).append($("<option></option>").attr("value", "").text("--- please select ---"));
   for (var i = 0; i < options.length; i++) {
      $(selector).append($("<option></option>").attr("value", options[i]).text(options[i]));
   }
   $(selector).append($("<option></option>").attr("value", "Other").text("Other"));
}

function dr_reverseGeocodeImage() {
  // reverse geocode the image coords
  if ( prop.app.testMode ) {
    console.log( "Reverse Geocoding..." ) ;
  }
  
  var geocoder      = new google.maps.Geocoder() ;
  
  if ( prop.app.testMode ) {
    console.log( "have geocoder..." ) ;
    console.log( "dr_imageData.latitude, longitude = " + dr_imageData.latitude + ", " + dr_imageData.longitude ) ;
  }

  // check format of lat and long vs. what google LatLng wants!
  var imageLocation = new google.maps.LatLng(dr_imageData.latitude, dr_imageData.longitude);
  
  if ( prop.app.testMode ) {
    console.log( "location = " + JSON.stringify( imageLocation, null, 4 )) ;
  }
  
  geocoder.geocode({'latLng': imageLocation}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //Check result 0
      var result = results[0];
      //look for locality tag and administrative_area_level_1
      var street_number = "";
      var route         = "";
      for(var i=0, len=result.address_components.length; i<len; i++) {
        var ac = result.address_components[i];
        if(ac.types.indexOf("street_number") >= 0) street_number = ac.long_name;
        if(ac.types.indexOf("route") >= 0) route = ac.long_name;
        if(ac.types.indexOf("locality") >= 0) dr_imageData.city = ac.long_name;
        if(ac.types.indexOf("administrative_area_level_1") >= 0) dr_imageData.state = ac.long_name;
        if(ac.types.indexOf("administrative_area_level_2") >= 0) dr_imageData.county = ac.long_name;
        if(ac.types.indexOf("postal_code") >= 0) dr_imageData.zipcode = ac.long_name;
      }
      
      dr_imageData.street_address = ( street_number + " " + route ).trim() ;
      
      if ( prop.app.testMode ) {
        console.log( "Address = " + JSON.stringify( dr_imageData, null, 4 )) ;
      }
    }
    else {
      if ( prop.app.testMode ) {
        console.log( "Address Lookup Failed" ) ;
      }
    }
  });
}

Number.prototype.padLeft = function(base,chr){
  var  len = (String(base || 10).length - String(this).length)+1;
  return len > 0? new Array(len).join(chr || '0')+this : this;
}


/////////////////////////////
// Diamond Interface
/////////////////////////////

function dr_diamondUploadImage() {
  var imageURI = $(prop.dr.imageHolderSelector).attr("src");

  if ( prop.app.testMode ) {
    console.log( "imageURI = " + imageURI ) ;
  }
  window.resolveLocalFileSystemURI(imageURI, dr_gotFileEntry, drFail.diamondUploadImage);
}

function dr_gotFileEntry( imageFileEntry ) {
  imageFileEntry.file( dr_readImageDataForDiamondUpload, drFail.diamondUploadImage ) ;
}

function dr_readImageDataForDiamondUpload( imageFile ) {
  var reader = new FileReader() ;
  
  reader.onload = function ( evt ) {
     dr_diamondUploadImageData( evt.target.result ) ;
  } ;
  reader.onerror = function ( error ) {
    drFail.diamondUploadImage( error ) ;
  } ;
  reader.readAsDataURL( imageFile ) ;
}

function dr_diamondUploadImageData( imageData ) {
  var url     = prop.dr.diamondURL + ".json" ;
  var now     = new Date();

  if ( prop.app.testMode ) {
    console.log( "imageData = " + imageData.substring( 0, 30 ) + " ..." ) ;
  }
  
  var imageMimeRegex = /^data:image\/(png|jpg|jpeg);base64,/ ;
  var imageType      = imageData.match( imageMimeRegex ) ;
  
  imageData = imageData.replace( imageMimeRegex, "" ) ;
  
  if ( imageType.length > 0 ) {
    imageType = imageType[ 1 ] ;
  }
  else {
    drFail.diamondUploadImage( "Illegal image type " ) ;
    return ;
  }
  
  var params                               = {};
  params.auth_token                        = prop.dr.diamondApiKey ;
  params.digital_asset                     = {} ;
  params.digital_asset.filename            = ['disaster_reporter_',
                                               now.getFullYear(),
                                               ( now.getMonth() + 1 ).padLeft(),
                                               now.getDate().padLeft(),
                                               now.getHours().padLeft(),
                                               now.getMinutes().padLeft(),
                                               now.getSeconds().padLeft(),
                                               ".jpg"].join('') ;
  params.digital_asset.asset_content_type  = "image/" + imageType ;
  params.digital_asset.headline            = $(prop.dr.fieldTitleSelector)[0].value ;
  params.digital_asset.type                = "ImageAsset" ;
  params.digital_asset.description         = $(prop.dr.fieldDescriptionSelector)[0].value ;
  // by not setting taken_at, Diamond will use the exif datetime and location to calculate UTC.
  // We don't really trust EXIF times from Android, too many variations, so don't use
  // the photodate derived from Android EXIF data
  if (( prop.app.platform == "ios" ) || ( dr_camera == true )) {
    params.digital_asset.taken_at = dr_imageData.photodate ;
  }
  params.digital_asset.source              = "Disaster Reporter" ;
  params.digital_asset.disaster_types      = [ $(prop.dr.fieldTypeSelector)[0].value ] ;
  params.digital_asset.alt_text            = params.digital_asset.description ;

  if ( null != dr_imageData.latitude && null != dr_imageData.longitude ) {
    console.log ("Adding location params" ) ;
    var location                              = {}
    location.latitude                         = dr_imageData.latitude ;
    location.longitude                        = dr_imageData.longitude ;
    /* uncomment this block to include position data with image upload
    location.address1  = dr_imageData.address ;
    location.city      = dr_imageData.city ;
    location.state     = dr_imageData.state ;
    location.zipcode   = dr_imageData.zipcode ;
    */
    params.digital_asset.locations_attributes = [ location ] ;
  }
  
  if ( prop.app.testMode ) {
     console.log( "params = " + JSON.stringify( params, null, 4 )) ;
  }
  
  params.digital_asset.encoded_asset      = imageData ;

  // call diamond to upload image
  // using jQuery ajax
  $.ajax({
    type: "POST",
    data: JSON.stringify(params),
    url: url,
    contentType: "application/json",
    dataType: "json",
    scriptCharset: "utf-8",
    success: function (json) {
      if ( prop.app.testMode ) {
        console.log( "upload done" ) ;
      }
      dr_diamondSubmitImage( json.id ) ;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if ( prop.app.testMode ) {
         console.log( "jqXHR = " + JSON.stringify( jqXHR, null, 4 )) ;
      }

      drFail.diamondUploadImage(textStatus) ;
    }
  });
}

function dr_diamondSubmitImage( imageID ) {
  if ( prop.app.testMode ) {
    console.log( "dr_diamondSubmitImage" ) ;
  }
  
  var url = prop.dr.diamondURL + "/" + imageID + "/submit.json?auth_token=" + prop.dr.diamondApiKey ;

  // call diamond to change state of uploaded image to submitted
  // using jQuery ajax
  $.ajax({
    type: "PUT",
    url: url,
    contentType: "application/json",
    dataType: "json",
    success: function (json) {
      if ( prop.app.testMode ) {
        console.log( "Submit done." ) ;
      }
      drSuccess.diamondUploadImage(json) ;
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if ( prop.app.testMode ) {
        console.log( "jqXHR = " + JSON.stringify( jqXHR, null, 4 )) ;
      }
      drSuccess.diamondUploadImage(jqXHR) ;
    }
    });
}



/*
 * @file
 *
 */

var femaDB = null;
var currentSchema = null;
var currentDialog = null;

function ml_onBodyLoad () {
  // deviceready callback executes after PhoneGap library is initialized
  document.addEventListener("deviceready", ml_onDeviceReady, false);
  //ML_DB.create();
};

function ml_onDeviceReady () {
  // all initializations depended on PhoneGap should go here
  ML_DB.create();

  $("#mlview").on("pagebeforeshow", function (event) {
    ML_DB.refresh();
  });
};



var ML_DB_Schema_V1 = {
  check: function(tx) {
    tx.executeSql('SELECT id FROM locations');
  },
  checkFail: function (err) {
    ML_DB.refresh();
  },
  checkSuccess: function () {
    femaDB.transaction(function(tx) {
      tx.executeSql('SELECT name1, notes1, name2, notes2, name3, notes3, lastupdated, lastupdated FROM locations', [], function(tx, rs){
        if (rs.rows.length > 0) {
          var r = rs.rows.item(0);
          tx.executeSql(
            'UPDATE locations2 SET name = ?, notes = ?, lastupdated = ? WHERE id = ?',
            [r['name1'], r['notes1'], r['lastupdated'], 'primary']
          );
          tx.executeSql(
            'UPDATE locations2 SET name = ?, notes = ?, lastupdated = ? WHERE id = ?',
            [r['name2'], r['notes2'], r['lastupdated'], 'secondary']
          );
          tx.executeSql(
            'UPDATE locations2 SET name = ?, notes = ?, lastupdated = ? WHERE id = ?',
            [r['name3'], r['notes3'], r['lastupdated'], 'outoftown']
          );
        }
      });
    },
    ML_DB.fail,
    ML_DB.refresh);
  },
};


var ML_DB_Schema_V2 = {
  create: function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS locations2 (id VARCHAR(15) PRIMARY KEY, name VARCHAR(50), notes TEXT, lastupdated DATETIME);');
    tx.executeSql('SELECT id FROM locations2', [], function(tx, rs) {
      if (rs.rows.length == 0) {
        tx.executeSql('INSERT INTO locations2(id, name, notes) VALUES("primary",   "", "");');
        tx.executeSql('INSERT INTO locations2(id, name, notes) VALUES("secondary", "", "");');
        tx.executeSql('INSERT INTO locations2(id, name, notes) VALUES("outoftown", "", "");');
      }
    });
  },
  createSuccess: function () {
    femaDB.transaction(ML_DB_Schema_V1.check, ML_DB_Schema_V1.checkFail, ML_DB_Schema_V1.checkSuccess);
  },
  createFail: function (err) {
    femaDB.transaction('DROP TABLE IF EXISTS locations2;', ML_DB.fail, ML_DB.success);
  }
};


function renderLocations(tx, rs) {
  if (rs.rows.length > 0) {
    for (var i = 0; i < rs.rows.length; i++) {
      var r = rs.rows.item(i);

      var idBoxEdit = "#" + r['id'];
      $(idBoxEdit + "-name").val(r['name']);
      $(idBoxEdit + "-notes").val(r['notes']);

      var idBoxView = "#" + r['id'] + "-location";
      $(idBoxView + " .address-body").parent().find(".timestamp").remove();

      if (r['name'] == "" && r['notes'] == "") {
        $(idBoxView + " .address-title").html( "Location Not Set" );
        $(idBoxView + " .address-body").html( "" );
      }
      else {
        var notes = (r['notes'] + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2');
        $(idBoxView + " .address-title").html( r['name'] );
        $(idBoxView + " .address-body").html( notes );
        if (r['timestamp'] != null) {
          var timestamp = Date.parse(r['timestamp']);
          var timestamp2 = '<p class="timestamp">Last Updated: ' + timeSince(timestamp) + ' ago</p>';
          $(timestamp2).insertAfter(idBoxView + " .address-body");
        }
      }
    }
  }
}

function updateSuccess(tx, rs) {
  ML_DB.refresh();
  $(currentDialog).dialog("close");
}


var ML_DB = {

  refresh: function () {
    femaDB.transaction(function(tx) {
      tx.executeSql('SELECT *, datetime(lastupdated) as timestamp FROM locations2', [], renderLocations);
    });
  },

  update: function (id) {
    if (id == "reset") {
      this.refresh();
      return;
    }
    var selector = "#" + id;
    currentDialog = "#edit-" + id + "-location";
    var name = $(selector + "-name").val().trim();
    var notes = $(selector + "-notes").val().trim();

    femaDB.transaction(function(tx) {
      tx.executeSql(
        'UPDATE locations2 SET name = ?, notes = ?, lastupdated = datetime("now", "localtime") WHERE id = ?',
        [ name, notes, id],
        updateSuccess
      );
    });
  },


  migrate: function() {
    currentSchema = ML_DB_Schema_V2;
    femaDB.transaction(currentSchema.create, currentSchema.createFail, currentSchema.createSuccess);
  },


  create: function () {
    femaDB = window.openDatabase("femaDB", "", "FEMA DB", 1048576);
    this.migrate();
  },


  fail: function (err) {
    //console.log('Fatal Error when rollback ' + currentSchema.version + ' database: ' + err.message);
  },

  success: function () {
    //console.log('ml db rollback from version: ' + currentSchema.version);
  }
};


/*@file
 *
 */

var shArr = [];
var drcL = {};
var shL = {};
var curLoc;

var map = null;
var MM = Microsoft.Maps;
var infobox = null;
var collectionInfoBox = null;

var drc_positionObject = null;


var drc = {
  // DRC Page Constructor
  //
  initialize : function() {
    this.bindEvents();
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);

    $(document).on('pageshow', '#drclist', function(event, ui) {
      if (!drc_positionObject) {
        common_showLoadingAnimation("acquiring location...");
        navigator.geolocation.getCurrentPosition(drc_onSuccessGeoLocation, drc_onFailGeoLocation, prop.app.geoLocationHighAccuracyOptions);
      }

      $("#map h2").text('Disaster Recovery Centers');
      checkMapOptions('drc');
      if ($('#drcs').is(':empty')) {
        drc_fetchFeed(prop.drc.drcTypeName, "#drcs", fetchFeedDRCDone);
      }
    });

    $(document).on('pageshow', '#nsslist', function(event, ui) {
      if (!drc_positionObject) {
        common_showLoadingAnimation("acquiring location...");
        navigator.geolocation.getCurrentPosition(drc_onSuccessGeoLocation, drc_onFailGeoLocation, prop.app.geoLocationHighAccuracyOptions);
      }

      $("#map h2").text('Shelters');
      checkMapOptions('nss');
      if ($('#shs').is(':empty')) {
        drc_fetchFeed(prop.drc.shelterTypeName, "#shs", fetchFeedShelterDone);
      }
    });

    $(document).on('pageshow', '#map', function(event, ui) {
      if (!drc_positionObject) {
        common_showLoadingAnimation("acquiring location...");
        navigator.geolocation.getCurrentPosition(drc_onSuccessGeoLocation, drc_onFailGeoLocation, prop.app.geoLocationHighAccuracyOptions);
        return;
      }

      LoadModule();
    });
  },

  // deviceready Event Handler
  //
  onDeviceReady: function() {
    //no code
  }
};



// Called when location data is available for use
//
function drc_onSuccessGeoLocation(position) {
  common_hideLoadingAnimation();
  drc_positionObject = position;
  LoadModule();
}


// Called when location data is NOT available.
//
function drc_onFailGeoLocation(error, lowAccuracy) {
  // if getting location with higher accuracy (e.g. gps based) fails/timesout
  // try to get one with lower accuracy (e.g. connection based)
  if (typeof(lowAccuracy) === 'undefined' || !lowAccuracy) {
    navigator.geolocation.getCurrentPosition(drc_onSuccessGeoLocation, function (e) {
      drc_onFailGeoLocation(e, true);
    }, prop.app.geoLocationLowAccuracyOptions);
    return;
  }

  // resumes normally - we have no location due to location
  // services being disabled
  common_hideLoadingAnimation();
  drc_positionObject = -1;
  LoadModule();
}




function fetchFeedDRCDone(data) {
  var drcTxt = [];
  drcL = {};

  if (data.features == null || data.features.length == 0) {
    drcTxt.push("<li>No Disaster Recovery Centers Found</li>");
  }
  else {
    drcL = data;
    drcL.features.sort(drcComp);
    rehashArray(drcL.features);
    var curState = "";
    $.each(drcL.features, function(key, value) {
      var p = value.properties;
      if (curState != p.STATE) {
        drcTxt.push('<li data-role="list-divider">' + st[p.STATE] + '</li>');
        curState = p.STATE;
      }
      drcTxt.push('<li><a href="javascript:showDRC(\'' + p.DRC_ID + '\');"<p class="title">' + p.CITY + '</p><p>' + p.DRC_NAME + '</p></a></li>');
    });
  }

  $('#drcs').append(drcTxt.join(""));
  $('#drcs').listview("refresh");
}


function fetchFeedShelterDone(data) {
  var shTxt = [];
  shL = {};

  if (data.features == null || data.features.length == 0) {
    shTxt.push("<li>No Shelters Found</li>");
  }
  else {
    shL = data;
    shL.features.sort(shComp);
    rehashShelters(shL.features);
    var curState = "";
    $.each(shL.features, function(key, value) {
      var p = value.properties;
      if (curState != p.STATE) {
        shTxt.push('<li data-role="list-divider">' + st[p.STATE] + '</li>');
        curState = p.STATE;
      }
      shTxt.push('<li><a href="javascript:showShelter(\'' + p.SHELTER_ID + '\');"<p class="title">' + p.CITY + '</p><p>' + p.SHELTER_NAME + '</p></a></li>');
    });
  }

  $('#shs').append(shTxt.join(""));
  $('#shs').listview("refresh");
}


//
//
function drc_onFetchFeedFail(element) {
  $(element).empty();
  $(element).append("<li>Unable to fetch information.</li>");
  $(element).listview("refresh");
}


// AJAX Feed Loader
//
function drc_fetchFeed(typeName, element, doneCallback) {
  if(typeof(typeName) === 'undefined') return;
  if(typeof(doneCallback) === 'undefined') return;

  // load json feed using jQuery ajax
  $.ajax({
    type: "GET",
    url: prop.drc.feedURL,
    data: {
      service : prop.drc.service,
      version : prop.drc.version,
      request : prop.drc.request,
      typeName : typeName,
      maxFeatures : prop.drc.maxFeatures,
      outputFormat : prop.drc.outputFormat,    
    },
    dataType: "json",
    crossDomain: true
  })
  .done(doneCallback)
  .fail(function (jqXHR, textStatus, errorThrown){
    drc_onFetchFeedFail(element);
  });
}


function rehashArray(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr['I' + arr[i].properties.DRC_ID] = arr[i];
  }
}


function rehashShelters(arr) {
  for (var i = 0; i < arr.length; i++) {
    arr['S' + arr[i].properties.SHELTER_ID] = arr[i];
  }
}


function drcComp(d1, d2) {
  var p1 = d1.properties;
  var p2 = d2.properties;
  if (p1.STATE < p2.STATE) {
    return -1;
  } else if (p1.STATE > p2.STATE) {
    return 1;
  } else {// same state, check the city
    if (p1.CITY < p2.CITY) {
      return -1;
    } else if (p1.CITY > p2.CITY) {
      return 1;
    } else {// same city, check name
      if (p1.DRC_NAME < p2.DRC_NAME) {
        return -1;
      } else if (p1.DRC_NAME > p2.DRC_NAME) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return 0;
}


function shComp(d1, d2) {
  var p1 = d1.properties;
  var p2 = d2.properties;
  if (p1.STATE < p2.STATE) {
    return -1;
  } else if (p1.STATE > p2.STATE) {
    return 1;
  } else {// same state, check the city
    if (p1.CITY < p2.CITY) {
      return -1;
    } else if (p1.CITY > p2.CITY) {
      return 1;
    } else {// same city, check name
      if (p1.SHELTER_NAME < p2.SHELTER_NAME) {
        return -1;
      } else if (p1.SHELTER_NAME > p2.SHELTER_NAME) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return 0;
}


$.ajaxSetup({
  cache : false
});


function showDRC(id) {
  var p = drcL.features['I' + id].properties;
  var pLat = drcL.features['I' + id].geometry.coordinates[1];
  var pLong = drcL.features['I' + id].geometry.coordinates[0];
  var dp = "";
  var drcAddr = p.STREET_1;
  var drcLink = p.STREET_1;

  if (p.STREET_2 != null) {
    drcAddr += "<br/>" + p.STREET_2;
    drcLink += " " + p.STREET_2;
  }

  drcAddr += "<br/>" + p.CITY + ", " + p.STATE + " " + p.ZIP;
  drcLink += " " + p.CITY + ", " + p.STATE + " " + p.ZIP;

  dp += '<p><strong>Name:</strong> ' + p.DRC_NAME + '</p>';
  dp += '<p><strong>Address:</strong><br/> ' + drcAddr + '</p>';

  if (p.COUNTY_PARISH != null) {
    dp += '<strong>County/Parish:</strong> ' + p.COUNTY_PARISH + '<br/><br/>';
  }

  dp += '<p><strong>Hours of Operation:</strong><br/>';
  dp += processHours('Sunday', p.SUNDAY_OPEN_TM, p.SUNDAY_CLOSE_TM);
  dp += processHours('Monday', p.MONDAY_OPEN_TM, p.MONDAY_CLOSE_TM);
  dp += processHours('Tuesday', p.TUESDAY_OPEN_TM, p.TUESDAY_CLOSE_TM);
  dp += processHours('Wednesday', p.WEDNESDAY_OPEN_TM, p.WEDNESDAY_CLOSE_TM);
  dp += processHours('Thursday', p.THURSDAY_OPEN_TM, p.THURSDAY_CLOSE_TM);
  dp += processHours('Friday', p.FRIDAY_OPEN_TM, p.FRIDAY_CLOSE_TM);
  dp += processHours('Saturday', p.SATURDAY_OPEN_TM, p.SATURDAY_CLOSE_TM);
  dp += "</p>";

  if (p.NOTES != null) {
    dp += ("<p><strong>Notes: </strong><br/>" + p.NOTES + "</p>");
  }

  dp += '<p><span class="txt12">Last updated: ' + p.CURRENT_AS + '</span></p>';


  drcLink = $.trim(drcLink);
  var mapHref = (iosNum < 6) ? "http://maps.google.com/maps?" : "http://maps.apple.com/?" ;
  if (drc_positionObject && drc_positionObject != -1) {
    mapHref += "saddr=" + escape(drc_positionObject.coords.latitude + "," + drc_positionObject.coords.longitude);
    mapHref += "&daddr=" + escape(pLat + "," + pLong);
  }
  else {
    mapHref += "q=" + escape(pLat + "," + pLong);
  }

  $("#drc-shelter-title").html( ((p.MOBILE == 'Y') ? 'Mobile ' : '') + 'Disaster Recovery Center');
  $("#drc-shelter-direction").attr( "href", mapHref );
  $("#drc-shelter-content").html( dp );

  $.mobile.changePage( "#drc-shelter-info", { role: "dialog", transition: prop.app.pageTransition } );
}


function showShelter(id) {
  var p = shL.features['S' + id].properties;
  var pLat = shL.features['S' + id].geometry.coordinates[1];
  var pLong = shL.features['S' + id].geometry.coordinates[0];
  var dp = "";
  var shAddr = p.ADDRESS;
  var shLink = p.ADDRESS;

  shAddr += "<br/>" + p.CITY + ", " + p.STATE + " " + p.ZIP;
  shLink += " " + p.CITY + ", " + p.STATE + " " + p.ZIP;

  dp += '<p><strong>Name:</strong> ' + p.SHELTER_NAME + '</p>';
  dp += '<p><strong>Address:</strong><br/> ' + shAddr + '</p>';

  shLink = $.trim(shLink);
  var mapHref = (iosNum < 6) ? "http://maps.google.com/maps?" : "http://maps.apple.com/?" ;
  if (drc_positionObject && drc_positionObject != -1) {
    mapHref += "saddr=" + escape(drc_positionObject.coords.latitude + "," + drc_positionObject.coords.longitude);
    mapHref += "&daddr=" + escape(pLat + "," + pLong);
  }
  else {
    mapHref += "q=" + escape(pLat + "," + pLong);
  }

  $("#drc-shelter-title").html( 'Shelter' );
  $("#drc-shelter-direction").attr( "href", mapHref);
  $("#drc-shelter-content").html( dp );

  $.mobile.changePage( "#drc-shelter-info", { role: "dialog", transition: prop.app.pageTransition } );
}


function GetMap() {
  var options = {
    credentials : "Ana6PjuP4trZ6D-ptcUoRgBV3JTRFiAFEc6DIIN8MxEAzuQm2Zb7TQpCv_D0gNPH",
    enableClickableLogo : false,
    enableSearchLogo : false,
    mapTypeId : Microsoft.Maps.MapTypeId.road,
    center : new Microsoft.Maps.Location(38.4623, -92.3020),
    zoom : 2
  };

  map = new MM.Map(document.getElementById('divMap'), options);
}


function LoadModule() {
  if (map == null) {
    GetMap();
  }
  // Register and load a new module
  MM.registerModule("GeoJSONModule", "js/libraries/GeoJSONModule.js");
  MM.loadModule("GeoJSONModule", {
    callback : ModuleLoaded
  });
}

function ModuleLoaded() {
  var myModule = new GeoJSONModule(map);
  var nss = $('#nssradiochoice').is(':checked');
  var drc = $('#drcradiochoice').is(':checked');
  var latitude = 38.4623;
  var longitude = -92.3020;
  var userLocation = false;
  if (drc_positionObject && drc_positionObject != -1) {
    latitude = drc_positionObject.coords.latitude;
    longitude = drc_positionObject.coords.longitude;
    userLocation = true;
  }

  myModule.displayFeeds(drc, nss, latitude, longitude, userLocation);
  collectionInfoBox = new MM.EntityCollection;
  map.entities.push(collectionInfoBox);
  $("#map h2").text(mapTitle());
}


function updateMapOptions() {
  ModuleLoaded();

  //setVisibility('chkboxpopup', 'none');
  $("#location-manage").popup ("close");
}


//Display InfoBox
function showInfoBox(e) {
  if (e.targetType == "pushpin") {
    collectionInfoBox.clear();
    infobox = new MM.Infobox(e.target.getLocation(), {
      title : e.target.title,
      description : e.target.description,
      offset : new MM.Point(0, 30),
      visible : true,
      //width: 200,
      //height: 130
    });
    collectionInfoBox.push(infobox);
  }
}

function hideInfobox(e) {
  try {
    infobox.setOptions({
      visible : false
    });
  } catch (err) {
    // no code
  }
}

function checkMapOptions(type) {
  $('#nssradiochoice').prop('checked', false);
  $('#drcradiochoice').prop('checked', false);

  switch(type) {
    case 'drc':
      $('#drcradiochoice').prop('checked', true);
      break;
    default:
      $('#nssradiochoice').prop('checked', true);
      break;
  }

  if ($("#location-manage label:first").hasClass('ui-btn')) {
    $('#nssradiochoice').checkboxradio("refresh");
    $('#drcradiochoice').checkboxradio("refresh");
  }

}

function mapTitle() {
  var nss = $('#nssradiochoice').is(':checked');
  var drc = $('#drcradiochoice').is(':checked');

  if (nss && drc) {
    return "Multiple Locations";
  } else if (drc) {
    return "Disaster Recovery Centers";
  } else {
    return "Shelters";
  }
}



/*
 * @file
 *
 */

function ekit_onBodyLoad() {
  document.addEventListener("deviceready", ekit_onDeviceReady, false);
}

/* When this function is called, PhoneGap is ready to roll */
function ekit_onDeviceReady() {
  ekInitDB();
}



/* Emergency Kit functions */
var fDB;

function ekUpdatePresentStatus(id) {
  var val = ($('#chk' + id).is(':checked')) ? 1 : 0;
  fDB.transaction(function(tx) {
    tx.executeSql('UPDATE Items SET isPresent = ? WHERE Id = ?', [val, id]);
  });
}

function ekEditComplete(id, value) {
  //ekShowList();
  $("#chk" + id).attr("value", value);
  $("#lblchk" + id + " .ui-btn-text").text(value);
  $( "#edit-kit" ).dialog ("close");
}

function ekItemEdit() {
  var value = $('#editItem').val();
  var id = $('#editId').val();
  if (value == "") {
    navigator.notification.alert("Need to enter a value.", function() {
      return true;
    }, "Alert");
  } else {
    fDB.transaction(function(tx) {
      tx.executeSql('UPDATE Items SET name = ? WHERE id = ?', [value, id], function (tx, rs){ekEditComplete(id, value);});
    });
  }
}

function ekDelComplete(id) {
  //ekShowList();
  $("#lichk" + id).remove();
  $('#ekItems').listview("refresh");
  $( "#edit-kit" ).dialog ("close");
}

function ekItemDel() {
  var id = $('#editId').val();
  navigator.notification.confirm("Are you sure you want to delete this item?", function(sb) {
    if (sb == 1) {
      fDB.transaction(function(tx) {
        tx.executeSql('DELETE FROM Items WHERE Id = ?', [id], function (tx, rs) {ekDelComplete(id);});
      });
    }
  }, "Alert", "Yes,No");
}

function ekViewItem(id) {
  $('#editId').val(id);
  $('#editItem').val($('#chk' + id).attr("value"));
  $.mobile.changePage( "#edit-kit", { role: "dialog", transition: "pop" } );
}

function ekRenderList(tx, rs) {
  var $e = $('#ekItems');
  var output = "";
  for (var i = 0; i < rs.rows.length; i++) {
    var r = rs.rows.item(i);
    output += ekit_populateEkCheckbox (r['id'], r['name'], r['isPresent']);
  }

  $e.empty().html(output);
  $("#ekItems input[type='checkbox']").checkboxradio();

  ////e.trigger("create");
  //$("#view-kit").page("destroy").page();
}

function ekRenderFEMAList(tx, rs) {
  var $e = $('#femaItems');
  $e.empty();
  var output = "";
  for (var i = 0; i < rs.rows.length; i++) {
    var r = rs.rows.item(i);
    var ch = "chk" + r['id'];

    var chText = "";
    chText += "<li data-icon='false'>";
    chText += "<label>";
    chText += "<input type='checkbox' id='" + ch + "' name='" + ch + "' onchange='ekUpdatePresentStatus(" + r['id'] + ")' ";
    chText += ((r['isPresent'] == 1) ? "checked='checked'" : "") + "/>";
    chText += r['name'] + "</label></li>";
    output += chText;
  }

  $e.html(output);
  $("#femaItems input[type='checkbox']").checkboxradio();

  //$("#view-kit").page("destroy").page();

  //$("#view-kit").trigger("create");
}

function ekShowList() {
  fDB.transaction(function(tx) {
    tx.executeSql('SELECT * FROM Items WHERE isFEMA <> 1', [], ekRenderList);
  });
}

function ekShowFEMAList() {
  fDB.transaction(function(tx) {
    tx.executeSql('SELECT * FROM Items WHERE isFEMA = 1', [], ekRenderFEMAList);
  });
}

function ekInitDB() {
  fDB = window.openDatabase("femaDB", "", "FEMA DB", 1048576);

  fDB.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS items(id INTEGER PRIMARY KEY, name TEXT, isPresent INTEGER, isFEMA INTEGER)', []);
    tx.executeSql('SELECT count(*) AS c FROM Items', [], ekInitData);
  });
  delete ekInitDB;
}

function ekInitData(tx, rs) {
  var r = rs.rows.item(0);
  if (r['c'] == 0) {
    fDB.transaction(function(tx) {
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (1, "Water, one gallon of water per person per day for at least three days, for drinking and sanitation", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (2, "Food, at least a three-day supply of non-perishable food ", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (3, "Battery-powered or hand crank radio and a NOAA Weather Radio with tone alert and extra batteries for both", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (4, "Flashlight and extra batteries", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (5, "First aid kit", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (6, "Whistle to signal for help", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (7, "Dust mask, to help filter contaminated air and plastic sheeting and duct tape to shelter-in-place", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (8, "Moist towelettes, garbage bags and plastic ties for personal sanitation", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (9, "Wrench or pliers to turn off utilities", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (10, "Can opener for food (if kit contains canned food)", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (11, "Local maps", 0, 1)', []);
      tx.executeSql('INSERT INTO Items(id, name, isPresent, isFEMA) VALUES (12, "Cell phone with chargers, inverter or solar charger", 0, 1)', []);
      ekShowList();
      ekShowFEMAList();
    });
  } else {
    ekShowList();
    ekShowFEMAList();
  }
  delete ekInitData;
}

function ekItemAdd() {
  var value = $('#newItem').val();
  if (value == "") {
    navigator.notification.alert("Need to enter a value.", function() {
      return true;
    }, "Alert");
  } else {
    fDB.transaction(function(tx) {
      tx.executeSql(
        'INSERT INTO Items(Name, IsPresent, isFEMA) VALUES (?, 0, 0)',
        [value],
        function (tx, rs) {
          ekInsertComplete(tx, rs, value);
        });
    });
  }
}

function ekInsertComplete(tx, rs, value) {
  if (!rs.rowsAffected) {
    // Previous insert failed. Bail.
    navigator.notification.alert("Adding new kit entry failed. Please try again.", function() {
      return true;
    }, "Alert");
  }
  var output = ekit_populateEkCheckbox (rs.insertId, value, 0);

  var $e = $('#ekItems');
  $e.append(output);
  $("#chk" + rs.insertId).checkboxradio();
  $e.listview("refresh");

  //ekShowList();
  $('#newItem').val("");
  $( "#add-kit" ).dialog( "close" );
}


function ekit_populateEkCheckbox(id, value, isChecked) {
  var ch = "chk" + id;
  var output = "<li id='li" + ch + "'>";
  output += "<a href='#'><label id='lbl" + ch + "'>";
  output += "<input type='checkbox' id='" + ch + "' name='" + ch + "' value='" + value + "' onchange='ekUpdatePresentStatus(" + id + ")' " + ((isChecked == 1) ? "checked='checked'" : "") + "/>";
  output += value + "</label></a>";
  output += '<a href="javascript:ekViewItem(' + id + ');" data-rel="dialog" data-transition="pop">Edit</a>';
  output += "</li>";
  return output;
}


/*
 * @file
 *
 */

var iosNum = 0;

var app = {
  // Application Constructor
  //
  initialize: function() {
    this.bindEvents();
  },

  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);

    $("#home").on('pageshow', function(event, ui) {
      $(".fema-global-header .ui-btn-back").hide();
      $(".fema-global-footer").hide();
    });

    $("#home").on('pagehide', function(event, ui) {
      $(".fema-global-header .ui-btn-back").show();
      $(".fema-global-footer").show();
    });

    document.addEventListener("showkeyboard", function() {
      $(".fema-global-footer").hide();
      //$(".fema-global-header").hide();
    }, false);

    document.addEventListener("hidekeyboard", function() {
      $(".fema-global-footer").show();
      //$(".fema-global-header").show();
    }, false);

  },

  // deviceready Event Handler
  //
  onDeviceReady: function() {
    prop.app.platform = device.platform.toLowerCase();
    prop.dr.capKey = prop.dr.capKeyAndroid;
    if ("ios" == prop.app.platform) {
      prop.dr.capKey = prop.dr.capKeyiOS;
    }
    navigator.splashscreen.hide();
    document.addEventListener("online", this.onOnline, false);
    document.addEventListener("offline", this.onOffline, false);

    if ("ios" == prop.app.platform) {
      iosNum = parseInt((device.version).charAt(0));
    }

    // check connection listener
    $(".check-connection").click(function ( event ) {
      if (!common_hasConnection()) {
        event.preventDefault();
        event.stopImmediatePropagation();
        navigator.notification.alert(prop.app.noConnectionAlert);
      }
    });

    // check dr-disclaimer checkbox
    $("#dr-button").click(function ( event ) {
      event.preventDefault();
      var disclaimerChecked = dr.isDisclaimerChecked();
      var changeTo = (disclaimerChecked) ? "#dashboard" : "#disaster-reporter";
      $.mobile.changePage(changeTo, prop.app.pageTransition, true, false);
    });

    // workaround to fix bug in jQueryMobile where header and footer move
    // around on screen after keyboard is dismissed
    // https://www.pivotaltracker.com/s/projects/275679
    // Should probably remove this after upgrade to jQM v1.4.x, if bug is fixed
    
    // way 1
    /*
    $(document).on('blur', 'select, input, textarea', function() {
      setTimeout(function() {
        window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
      }, 0);
    });
     */
    // way 2: shortcoming is Editing text is a bit slow for 'position', 'absolute'.
    /*
    $(document).on('focus', 'select,input,textArea', function () {
                   $("#main-header").css('position', 'absolute');
                   $("#main-footer").css('position', 'absolute');
                   $(document).scrollTop(document.body.scrollHeight);
                   $(document).trigger("refresh");
                   }) ;
    $(document).on('blur', 'select,input,textArea', function () {
        $("#main-header").css('position', 'fixed');
        $("#main-footer").css('position', 'fixed');
        });
    */
    // way 3: shortcoming is page margins top and bottom.
    /*
    $(document).on('focus', 'select,input,textArea', function () {
                   $("#main-header").css('position', 'relative');
                   $("#main-footer").css('position', 'relative');
                   $(document).scrollTop(document.body.scrollHeight);
                   $(document).trigger("refresh");
                   }) ;
    $(document).on('blur', 'select,input,textArea', function () {
        $("#main-header").css('position', 'fixed');
        $("#main-footer").css('position', 'fixed');
        });
    */
    // way 4
    /*
    $(document).on('blur', 'select, input, textarea', function() {
      $.mobile.silentScroll($("#main-header").offset().top);
    });
    */
    // way 5
    $('select, input, textarea')
    .on('focus', function (e) {
        $("#main-header").css('position', 'absolute');
        })
    .on('blur', function (e) {
        $("#main-header").css('position', 'fixed');
        //force page redraw to fix incorrectly positioned fixed elements
        setTimeout( function() {
                   window.scrollTo( $.mobile.window.scrollLeft(), $.mobile.window.scrollTop() );
                   }, 20 );
        });
    
    ekit_onDeviceReady();
    ml_onDeviceReady();
    blog_prepare();
    blog_indexPageFetch();
  },

  onOnline: function (online) {
    blog_indexPageFetch(true);
  },

  onOffline: function (online) {
    blog_indexPageFetch(false);
  }

};


/*@file
 *
 */

var BlogVars = {
  fetchedPage : -1,
  currentPage : 0,
  loadedPages : new Array()
};


// prepare blog (initialize variables and prepare pager)
//
function blog_prepare() {
  // prepare page cache
  BlogVars.loadedPages = new Array();

  // prepare pager
  $(prop.blog.pagerLinkSelector).click (function () {
    var page;
    var pagerId = $(this).attr("id");

    switch(pagerId) {
      case "pager0": page = prop.blog.minPage; break;
      case "pager4": page = prop.blog.maxPage; break;
      default:       page = parseInt($(this).text()) - 1; break;
    }

    blog_blogPageFetch(page);
  });

  $("#blog").on("pagebeforeshow", function (event) {
    if (!common_hasConnection()) {
      event.preventDefault();
      navigator.notification.alert(prop.app.noConnectionAlert);
      return;
    }
    blog_blogPageFetch(  BlogVars.currentPage );
  });
}


///////////////////////////////////////////////////////////////////////////////
// Callback functions
///////////////////////////////////////////////////////////////////////////////


// called from online/offline callbacks
// also called by deviceready callback in index.html/index.js
function blog_indexPageFetch(online) {
  if(typeof(online)==='undefined') online = common_hasConnection();


  var cacheKey = "blog_fetchBlogs_" + prop.blog.minPage;
  var cacheExpired = Cache.hasExpired(cacheKey);
  var cacheValue = Cache.get(cacheKey);

  if (!cacheExpired && cacheValue) {
    BlogVars.fetchedPage = prop.blog.minPage;
    blog_onIndexPageFetchDone(cacheValue, false);
  }

  if (online) { // active connection
    if (cacheExpired || cacheValue == null) {
      blog_fetchBlogs(prop.blog.minPage, blog_onIndexPageFetchDone);
    }
    common_clearNoConnectionWarning(prop.blog.indexButtonSelector);
  }
  else { // no connection
    common_setNoConnectionWarning(prop.blog.indexButtonSelector);
  }
}


// checks for connection and fetch given page of blogs
function blog_blogPageFetch(page, online) {
  if(typeof(page)==='undefined' || page < prop.blog.minPage || page > prop.blog.maxPage) page = prop.blog.minPage;
  if(typeof(online)==='undefined') online = common_hasConnection();

  var cacheKey = "blog_fetchBlogs_" + page;
  var cacheExpired = Cache.hasExpired(cacheKey);
  var cacheValue = Cache.get(cacheKey);

  if (!cacheExpired && cacheValue) {
    BlogVars.fetchedPage = page;
    common_showLoadingAnimation("loading");
    blog_onPageFetchDone(cacheValue, false);
  }


  if (online) { // active connection
    if (cacheExpired || cacheValue == null) {
      common_showLoadingAnimation("loading");
      blog_fetchBlogs(page, blog_onPageFetchDone);
    }
    common_clearNoConnectionWarning(prop.blog.blogListSelector);
  }
  else { // no connection
    common_setNoConnectionWarning(prop.blog.blogListSelector);
  }
}


// checks for connection and fetch given node
//
function blog_entryFetch(nid, online) {
  if(typeof(nid)==='undefined' || isNaN(parseInt(nid))) return;
  if(typeof(online)==='undefined') online = common_hasConnection();

  if (online) { // active connection
    common_showLoadingAnimation("loading");
    blog_fetchBlogs(nid, blog_onEntryFetchDone, false);
  }
  else { // no connection
    navigator.notification.alert("No active connection.");
  }
}



///////////////////////////////////////////////////////////////////////////////
// Callback functions
///////////////////////////////////////////////////////////////////////////////

// jsonp callback = FEMA Blog JSON feed has hardcoded callback
// it's called everytime json feed is returned
function showrecentposts(json) {
  //node code
}


//
//
function blog_onIndexPageFetchDone(json, cache) {
  if(typeof(cache)==='undefined') cache = true;

  BlogVars.currentPage = BlogVars.fetchedPage;

  // set json data as cache for fetched page
  if (cache) {
    Cache.set("blog_fetchBlogs_" + BlogVars.currentPage, json);
  }

  var firstBlog = json.Items[0].node;
  var createdDate = blog_parseDate(firstBlog.created);

  //reset
  $(prop.blog.indexButtonSelector).parent().find(".date-stamp").remove();
  $(prop.blog.indexButtonSelector).parent().find(".ui-btn-text2").remove();
  $(prop.blog.indexButtonSelector).parent().find("p").remove();
  //$(prop.blog.indexButtonSelector).text("Blog");

  var output = "";
  output += "<span class=\"date-stamp\">" + timeSince(createdDate) + " ago</span>";
  output += "<span class='ui-btn-text2'>" + firstBlog.title + "</span>";
  output += "<p>" + firstBlog.summary + "</p>";


  // modify the button title
  //$(prop.blog.indexButtonSelector).append(" - " + firstBlog.title);

  // insert the body after title
  $(output).insertAfter(prop.blog.indexButtonSelector);
  //$(prop.blog.indexButtonSelector).parent().has(".no-connection").find("date-stamp").addClass("shift-down");
}


//
//
function blog_onPageFetchDone(json, cache) {
  if(typeof(cache)==='undefined') cache = true;

  BlogVars.currentPage = BlogVars.fetchedPage;

  // set json data as cache for fetched page
  if (cache) {
    Cache.set("blog_fetchBlogs_" + BlogVars.currentPage, json);
  }

  blog_setPager(BlogVars.currentPage);

  // populate new list, clear old list and insert new list
  var output = blog_htmlBlogList(json);

  $("#blog-page-title").html("Blog: Page " + (BlogVars.currentPage + 1));
  $(prop.blog.blogListSelector).empty().append(output);
  $(prop.blog.blogListSelector).trigger("create");


  //scroll to top
  $('body').animate({scrollTop: '0px'}, 500, function(){ $('body').clearQueue(); });

  common_hideLoadingAnimation();
}


//
//
function blog_onEntryFetchDone(json) {
  // populate new content, clear old content and insert new content
  var output = blog_htmlBlogEntry(json.nodes[0].node);
  $("#blog-entry-content").empty().append(output);
  $("#blog-entry-content").trigger("create");

  $("#blog-entry-title").text(json.nodes[0].node.title);

  $("#blog-entry-content a").click( function( e )  {
    e.preventDefault();
    var ref = window.open( $(this).attr("href"), "_system" );
    return false;
  });

  common_hideLoadingAnimation();

  $.mobile.changePage("#blog-entry", prop.app.pageTransition, true, false);
}



//
//
function blog_onfetchBlogsFail(jqXHR, textStatus, errorThrown) {
  common_hideLoadingAnimation();
  //alert("Unable to download blogs.");
}



///////////////////////////////////////////////////////////////////////////////
// helper functions
///////////////////////////////////////////////////////////////////////////////


// AJAX Feed Loader
//
function blog_fetchBlogs(page, doneCallback, list) {
  if(typeof(list)==='undefined') list = true;

  var data;
  var url;

  if (list) {
    BlogVars.fetchedPage = page;
    url  = prop.blog.url;
    //data = {page: Math.floor(page / 2)};
    data = {page: page};
  }
  else {
    url  = prop.blog.urlNode + page;
    data = {};
  }

  // load json feed using jQuery ajax
  $.ajax({
    type: "GET",
    url: url,
    data: data,
    dataType: "jsonp",
    crossDomain: true,
    jsonp: false,
    jsonpCallback: prop.blog.jsonpCallback
  })
  .done(doneCallback)
  .fail(blog_onfetchBlogsFail);
}


//
//
function blog_setPager(currentPage) {
  // reset disabled pager items
  $(prop.blog.pagerLinkSelector).each (function(){
    $(this).removeClass("ui-disabled");
  });

  //refresh pager with new pagination
  switch(currentPage) {
    case prop.blog.minPage:
    case (prop.blog.minPage+1):
      $(prop.blog.pagerLinkSelector + "#pager" + BlogVars.currentPage).addClass("ui-disabled");

      $(prop.blog.pagerLinkSelector + "#pager1 .ui-btn-text").html(prop.blog.minPage + 2);
      $(prop.blog.pagerLinkSelector + "#pager2 .ui-btn-text").html(prop.blog.minPage + 3);
      $(prop.blog.pagerLinkSelector + "#pager3 .ui-btn-text").html(prop.blog.minPage + 4);
      break;
    case (prop.blog.maxPage-1):
    case prop.blog.maxPage:
      $(prop.blog.pagerLinkSelector + "#pager" + (BlogVars.currentPage-15)).addClass("ui-disabled");

      $(prop.blog.pagerLinkSelector + "#pager3 .ui-btn-text").html(prop.blog.maxPage);
      $(prop.blog.pagerLinkSelector + "#pager2 .ui-btn-text").html(prop.blog.maxPage-1);
      $(prop.blog.pagerLinkSelector + "#pager1 .ui-btn-text").html(prop.blog.maxPage-2);
      break;
    default:
      $(prop.blog.pagerLinkSelector + "#pager2").addClass("ui-disabled");

      $(prop.blog.pagerLinkSelector + "#pager1 .ui-btn-text").html(BlogVars.currentPage);
      $(prop.blog.pagerLinkSelector + "#pager2 .ui-btn-text").html(BlogVars.currentPage+1);
      $(prop.blog.pagerLinkSelector + "#pager3 .ui-btn-text").html(BlogVars.currentPage+2);
      break;
  }
}


//
//
function blog_htmlBlogList(blogs) {
  //var j;
  var output = "";
  output += "<ul class='app-list' data-role='listview'>";
  for (var i in blogs.Items) {
    //j = ((BlogVars.currentPage % 2) == 1) ? (i + 10) : i;
    output += blog_htmlBlog(blogs.Items[i].node);
    if (i == 9) break;
  }
  output += "</ul>";
  return output;
}


//
//
function blog_htmlBlogEntry(blog) {
  var output = "";
  var createdDate = blog_parseDate(blog.created);
  output += "<p class='blog-entry-info'><strong>Date:</strong> " + createdDate.toDateString() + "<br/>";
  output += "<strong>Author:</strong> " + blog.author + ", " + blog.author_title + "</p>";
  output += "<p class='blog-entry-body'>" + blog.body + "</p>";
  return output;
}


//
//
function blog_htmlBlog(blog) {
  var output  = "";
  var createdDate = blog_parseDate(blog.created);
  output += "<li><a href=\"javascript:blog_entryFetch(" + blog.nid + ");\">";
  output += "  <h3>" + blog.title + "</h3>";
  output += "  <p>" + createdDate.toDateString() + "</p>";
  output += "  <p>" + blog.summary + "</p></a></li>";
  return output;
}


//
//
function blog_parseDate(date) {
  var dateShort = date.substring(0, date.length - 15);
  var arr = dateShort.split(/[- :]/);
  return new Date(arr[0], (arr[1] - 1), arr[2]);
}


/*
 * @file
 *
 */

var Cache = {
  set : function (key, data, setExpiry) {
    //@todo handle this condition better by throwing an exception
    if (typeof( key ) !== 'string' || typeof( data ) === 'undefined') {
      return;
    }

    if (typeof( setExpiry ) === 'undefined') setExpiry = true;

    var value = JSON.stringify(data);
    window.localStorage.setItem(key, value);

    if (setExpiry) {
      var timestamp = new Date();
      timestamp = timestamp.valueOf();
      window.localStorage.setItem(key + "_timestamp", timestamp);
    }
  },

  get : function (key) {
    //@todo handle this condition better by throwing an exception
    if (typeof( key ) !== 'string') {
      return null;
    }

    var value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },

  hasExpired: function (key) {
    //@todo handle this condition better by throwing an exception
    if (typeof( key ) !== 'string') {
      return true;
    }

    var value = window.localStorage.getItem(key);
    var timestamp = window.localStorage.getItem(key + "_timestamp");


    if (value != null && timestamp == null) {
      return false;
    }

    //@todo handle this condition better by throwing an exception
    if (value == null && timestamp == null) {
      return true;
    }

    var keyDate = new Date(parseInt(timestamp));
    var delta = Math.floor(new Date() - keyDate);

    return (prop.cache.maxDuration <= delta);
  }
};


/* @file
 *
 */

(function( $, undefined ) {
  $( document ).ready( function(){
    $("a[target='_blank'],a[href|='http://'],a[href|='https://']").click( function( e )  {
      e.preventDefault();
      var ref = window.open( $(this).attr("href"), "_system" );
      return false;
    });
  });
})( jQuery );


// returns TRUE if app has active connection
// returns FALSE otherwise
function common_hasConnection() {
  //if (typeof(Connection) === "undefined") return true;  //@todo remove after testing
  return !(Connection.NONE == navigator.connection.type);
}

// reset connection warning in given div container
function common_clearNoConnectionWarning(selector) {
  $(selector).parent().find("." + prop.app.noConnectionDivClass).remove();
}

// set no connection warning in given div container
function common_setNoConnectionWarning(selector) {
  common_clearNoConnectionWarning(selector);
  $(selector).parent().find(".date-stamp").remove();
  $(prop.app.noConnectionDivHTML).insertAfter(selector);
}

function common_showLoadingAnimation(status) {
  $.mobile.loading( 'show', {
    text: status,
    textVisible: true,
    theme: "a",
    textonly: false
  });
}

function common_hideLoadingAnimation() {
  $.mobile.loading( 'hide' );
}


function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);
  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years";
  }
  interval = Math.floor(seconds / 2592000);

  if (interval > 1) {
    return interval + " months";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes";
  }
  //return Math.floor(seconds) + " seconds";
  return "1 minute";
}


function processHours(day, open, close) {
  var txt = day + ": ";
  if (open != null) {
    txt += open.replace(":00:00", ":00") + ' to ' + close.replace(":00:00", ":00");
  } else {
    txt += 'Closed';
  }
  return txt + '<br/>';
}


var st = new Array();
st['AK'] = 'Alaska';
st['AL'] = 'Alabama';
st['AR'] = 'Arkansas';
st['AS'] = 'American Samoa';
st['AZ'] = 'Arizona';
st['CA'] = 'California';
st['CO'] = 'Colorado';
st['CT'] = 'Connecticut';
st['DC'] = 'District of Columbia';
st['DE'] = 'Delaware';
st['FL'] = 'Florida';
st['FM'] = 'Federated States of Micronesia';
st['GA'] = 'Georgia';
st['GU'] = 'Guam';
st['HI'] = 'Hawaii';
st['IA'] = 'Iowa';
st['ID'] = 'Idaho';
st['IL'] = 'Illinois';
st['IN'] = 'Indiana';
st['KS'] = 'Kansas';
st['KY'] = 'Kentucky';
st['LA'] = 'Louisiana';
st['MA'] = 'Massachusetts';
st['MD'] = 'Maryland';
st['ME'] = 'Maine';
st['MH'] = 'Marshall Islands';
st['MI'] = 'Michigan';
st['MN'] = 'Minnesota';
st['MO'] = 'Missouri';
st['MP'] = 'Northern Mariana Islands';
st['MS'] = 'Mississippi';
st['MT'] = 'Montana';
st['NC'] = 'North Carolina';
st['ND'] = 'North Dakota';
st['NE'] = 'Nebraska';
st['NH'] = 'New Hampshire';
st['NJ'] = 'New Jersey';
st['NM'] = 'New Mexico';
st['NV'] = 'Nevada';
st['NY'] = 'New York';
st['OH'] = 'Ohio';
st['OK'] = 'Oklahoma';
st['OR'] = 'Oregon';
st['PA'] = 'Pennsylvania';
st['PR'] = 'Puerto Rico';
st['PW'] = 'Palau';
st['RI'] = 'Rhode Island';
st['SC'] = 'South Carolina';
st['SD'] = 'South Dakota';
st['TN'] = 'Tennessee';
st['TX'] = 'Texas';
st['UM'] = 'US Minor Outlying Islands';
st['UT'] = 'Utah';
st['VA'] = 'Virginia';
st['VI'] = 'US Virgin Islands';
st['VT'] = 'Vermont';
st['WA'] = 'Washington';
st['WI'] = 'Wisconsin';
st['WV'] = 'West Virginia';
st['WY'] = 'Wyoming';


var prop = {
  app : {
    testMode             : false,
    platform             : "<not_set>",
    version              : "2.4.0",
    releaseDate          : "May 05, 2014",
    geoLocationHighAccuracyOptions : {
      enableHighAccuracy : true,
      timeout            : 5000,
      maximumAge         : 3000
    },
    geoLocationLowAccuracyOptions : {
      timeout            : 5000,
      maximumAge         : 3000
    },
    noConnectionDivClass : "no-connection",
    noConnectionDivHTML  : "<span class=\"no-connection\">No internet connection</span>",
    noConnectionAlert    : "You need an active data connection to use this feature of the application.",
    noGeoLocationAlert   : "To submit a photo, please turn on your location (GPS) settings in your device and your camera. Your device needs a reliable signal to capture GPS coordinates.",
    noEXIFLocationAlert  : "Your image does not have GPS coordinates associated with it, so it can't be submitted.",
    noEXIFDateTimeAlert  : "Your image does not have GPS provided date and time associated with it, so it can't be submitted.",
    pageTransition       : "fade"
  },
  blog : {
    indexButtonSelector : "#blog-button .ui-btn-text",
    blogListSelector    : "#blog-list",
    pagerLinkSelector   : "#blog-list-pager a",
    url                 : "http://www.fema.gov/blog/json-feed/en",
    urlNode             : "http://www.fema.gov/blog/json-feed/node/",
    jsonpCallback       : "showrecentposts",
    minPage             : 0,
    maxPage             : 19,
  },
  cache : {
    maxDuration : (2*60*60*1000)  //(2 hr * 60 m/hr * 60 s/m * 1000 ms/s)
  },
  dr : {
    diamondApiKey            : "9eMstzJWs2ByVzr4cxro",
    diamondURL               : "https://diamondgov.eyestreet.com/api/v1/digital_assets",
    tokenRequestKey          : "gettoken",
    mapURL                   : "diamond_map.html",
    uploadStatus             : "uploading image",    
    getFileError             : "Unable to load your image. Please try again, or select another image.",
    uploadError              : "Unable to upload your image. Please check that you have the latest version of the app.",
    submitError              : "Unable to submit your image. Please try again later.",
    disclaimer               : {
      defaultVal : false,
      cacheKey   : "dr_disclaimer231",
      className  : ".disclaimer-cb-dr"
    },
    imageHolderId            : "submitreport-photo-holder",
    imageHolderSelector      : "#submitreport-photo-holder",
    imagePopupHolderSelector : "#popup-submitreport-photo img",
    reportPageSelector       : "#submitreport",
    successPageSelector      : "#submitreport-success",
    fieldTitleSelector       : "#submitreport_title",
    fieldTypeSelector        : "#submitreport_type",
    fieldNameSelector        : "#submitreport_name",
    fieldDescriptionSelector : "#submitreport_description",
    fieldErrorMsgHTML        : "<span class=\"form-error-message\">This field is required.</span>",

    disasterTypes            : ["Drought", "Earthquakes", "Extreme Heat", "Floods", "Home Fires", "Hurricanes",
                                "Landslides and Debris Flow", "Severe Weather", "Space Weather", "Terrorism",
                                "Thunderstorms & Lightning", "Tornadoes", "Tsunamis", "Volcanoes", "Wildfires",
                                "Winter Storms & Extreme Cold"],
    
    //disasterNames         : ["Test Name 1", "Test Name 2", "Test Name 3"]
  },
  drc : {
    drcTypeName     : "FEMA:DISASTER_RECOVERY_CENTERS",
    shelterTypeName : "FEMA:FEMANSSOpenShelters",
    feedURL         : "http://gis.fema.gov/geoserver/ows",
    service         : "WFS",
    version         : "1.0.0",
    request         : "GetFeature",
    maxFeatures     : "250",
    outputFormat    : "json",
  },
};

if (prop.app.testMode) {
  prop.dr.diamondApiKey = "CRzMMU5T7qwiPBWq3rSN",
  prop.dr.diamondURL    = "https://diamondgov-staging.eyestreet.com/api/v1/digital_assets",
  prop.dr.mapURL        = "diamond_staging_map.html";
}


(function(){function i(){var r=document.getElementsByTagName("head")[0],u=navigator,f=!r||!n.onloadcallback&&document.readyState!=="complete"||(u.userAgent.indexOf("MSIE")!==-1||u.vendor==="Apple Computer, Inc.")&&document.readyState!=="complete"&&document.body===null,i;f?document.write('<script src="'+t+'" type="text/javascript" ><\/script>'):(i=document.createElement("script"),i.type="text/javascript",i.language="javascript",i.src=t,r.appendChild(i))}var n,t;window.$MapsNamespace=window.$MapsNamespace||"Microsoft",window[$MapsNamespace]=window[$MapsNamespace]||{},window[$MapsNamespace].Maps=window[$MapsNamespace].Maps||{},n={domain:"http://ecn.dev.virtualearth.net/mapcontrol/v7.0",version:"7.0.20130809144648.94",locale:"en-us",tilelocale:"en-us",ishttpsenabled:false,onloadcallback:"__onscriptload__",tilegeneration:1515,odmtilegeneration:23,zoomOriginWidth:256,defaultTileSize:256,minMercatorZoom:1,maxMercatorZoom:20,maxFPS:60,maxConcurrentTileDownloads:12,disableVenueMaps:false,disableMicroPOI:false,disableDirections:false,disableAnalytics:false,disableSearch:false,disableTasks:false,disableMyPlaces:false,myPlacesUriFormat:"http://www.bing.com/maps/GeoCommunity.aspx",localScoutSupported:true,localScoutServiceUrlFormat:"nearby.ashx?action={action}&location={latitude},{longitude}&filters={filters}&sortby={sortby}",disableStreetside:false,streetsideGlobalMetadataUriFormat:"http://ecn.dev.virtualearth.net/REST/V1/Imagery/BlockView/StreetMetadata/ECN/{0}/{1}/{2}/{3}.js?jsonp={4}&key=AvlNiRQgHx0x9v3UNufLEfme5-g467LK_fbxxteQANuhtNoL6E9Gjhb_-Nl_FCRL",streetsideChunkMetadataUriFormat:"http://ecn.dev.virtualearth.net/REST/V1/Imagery/BlockView/ChunkMetadata/ECN/{0}/{1}/{2}/{3}.js?jsonp={4}&key=AvlNiRQgHx0x9v3UNufLEfme5-g467LK_fbxxteQANuhtNoL6E9Gjhb_-Nl_FCRL",streetsideImageryUriFormat:"http://ecn.t{1}.tiles.virtualearth.net/tiles/bvi{2}?g={0}&ir=ir0&mkt=en-us&n=f",streetsideSingleBlockLookupWithDataUriFormat:"http://dev.virtualearth.net/REST/V1/Imagery/BlockView/BlockLookupWithData/{0}/{1}/{2},{3}/{4}?jsonp={5}&key=AvlNiRQgHx0x9v3UNufLEfme5-g467LK_fbxxteQANuhtNoL6E9Gjhb_-Nl_FCRL",streetsideSingleBlockTokenLookupWithDataUriFormat:"http://dev.virtualearth.net/REST/V1/Imagery/BlockView/BlockLookupWithData/{0}/{1}/{2}?jsonp={3}&key=AvlNiRQgHx0x9v3UNufLEfme5-g467LK_fbxxteQANuhtNoL6E9Gjhb_-Nl_FCRL",streetsideCubeImageryUriFormat:"http://ecn.t{0}.tiles.virtualearth.net/tiles/hs{1}.jpg?g={2}&n=z",streetsideCubeDataLookupUriFormat:"http://dev.virtualearth.net/mapcontrol/HumanScaleServices/GetBubbles.ashx?c={0}&n={1}&s={2}&e={3}&w={4}&jsCallback={5}&key={6}",streetsideTileGeneration:"864",streetsideImageReportingUriFormat:"https://support.discoverbing.com/default.aspx?mkt={0}&productkey=bingmapprivacy&ct=eformts&(!)_SessionID=12345678&(!)_PermalinkURL={1}&(!)_Timestamp={2}&(!)_BubbleID={3}&(!)_CoordinatesofPro={4}",streetsidePermalinkUriFormat:"http://www.bing.com/maps/?v=2&cp={0}~{1}&lvl=22&sty=t~pixelOffset~{2}~streetSide~{3}~isPrivacyFocusEnabled~{4}~blockID~{5}",streetside360PrivacyReportUriFormat:"http://www.bing.com/maps/?mkt={0}&sty=x~lat~{1}~lon~{2}~alt~{3}~z~{4}~h~{5}~p~{6}~b~{7}~pid~5082&app=5082",transitTrainLineComBuyTicketsUriFormat:"http://www.thetrainline.com/buytickets/?utm_source=Microsoft&utm_medium=Maps&WT.mc_id={0}",preloadBingTheme:0,venueMapsLandingPageEnabled:true,displayMapAppsPanel:true,isLocalEntityReportAProblemSupported:true,distanceUnitMiles:true,radixPointDecimal:true,searchBoxContainerID:"sb_form",searchBoxID:"sb_form_q",searchBoxSubmitButtonID:"sb_form_go",autoSuggestContainerID:"sw_as",autoSuggestMaxResults:"5",autoSuggestServiceUrlFormat:"http://platform.bing.com/geo/autosuggest/v1?umv={user_map_view}&ul={user_location}&q={query}&reqid={jsonso}&mr={max_results}&cb={callback}",init:function(){var r,u,n,f,t,i;for(this.protocol=this.ishttpsenabled?"https://":"http://",r="onscriptload",this.onloadcallback==="__"+r+"__"&&(this.onloadcallback=null),this.ishttpsenabled?(this.onDemandDomain="t{subdomain}.ssl.ak.dynamic.tiles.virtualearth.net",this.staticDomain="t{subdomain}.ssl.ak.tiles.virtualearth.net"):(this.onDemandDomain="ak.dynamic.t{subdomain}.tiles.virtualearth.net",this.staticDomain="ak.t{subdomain}.tiles.virtualearth.net"),u=this.domain+"/"+this.version+"/css/en/",this.cssPath=u,n=this.domain+"/"+this.version+"/i/",f=this.domain+"/"+this.version+"/js/en-us/",this.jsPath=f,this.directionsImagePath=n+"Directions/",this.venueMapsEroServiceAppId="BF17C84531C2B15EBE4BACA0F545AF4040188EFA",t=[["logServiceUriFormat","{urischeme}dev.virtualearth.net/webservices/v1/LoggingService/LoggingService.svc/Log?entry=0&fmt=1&type=3&group=MapControl&name=AJAX&version={version}&mkt={culture}&auth={credentials}&jsonp=microsoftMapsNetworkCallback"],["roadUriFormat","{urischeme}{ondemanddomain}/comp/ch/{quadkey}?mkt={tilemarket}&it=G,L&shading=hill&og={odmgeneration}&n=z"],["roadUnlabeledUriFormat","{urischeme}{staticdomain}/tiles/r{quadkey}?g={generation}&mkt={culture}&lbl=l0&stl=h&shading=hill&n=z"],["aerialUriFormat","{urischeme}{staticdomain}/tiles/a{quadkey}.jpeg?g={generation}&n=z"],["aerialWithLabelsUriFormat","{urischeme}{ondemanddomain}/comp/ch/{quadkey}?mkt={tilemarket}&it=A,G,L&shading=hill&og={odmgeneration}&n=z"],["enhancedBirdseyeUriFormat","{urischeme}{staticdomain}/tiles/svi{quadkey}?g={generation}&dir={dir}&n=z"],["enhancedBirdseyeWithLabelsUriFormat","{urischeme}{staticdomain}/tiles/cmd/svhybrid?a={quadkey}&g={generation}&dir={dir}&n=z"],["nativeBirdseyeUriFormat","{urischeme}{staticdomain}/tiles/o{quadkey}-{runtimeindex}-{level}-{index}?g={generation}"],["nativeBirdseyeWithLabelsUriFormat","{urischeme}{staticdomain}/tiles/cmd/ObliqueHybrid?a={quadkey}-{runtimeindex}-{level}-{index}&g={generation}"],["fbUriFormat","{urischeme}{staticdomain}/tiles/r{quadkey}?g={generation}&mkt={culture}&lbl=l1&stl=fb&shading=hill&n=z&key=AkF0mEyG789RQA6CcLimWZMzrDNF6MNSwRJOmNWb9gK_JGiwOBeMoQUoY1MFqksg"],["fbUnlabeledUriFormat","{urischeme}{staticdomain}/tiles/r{quadkey}?g={generation}&mkt={culture}&lbl=l0&stl=fb&shading=hill&n=z&key=AkF0mEyG789RQA6CcLimWZMzrDNF6MNSwRJOmNWb9gK_JGiwOBeMoQUoY1MFqksg"],["weatherLightUriFormat","{urischeme}ecn.dynamic.t{subdomain}.tiles.virtualearth.net/comp/ch/{quadkey}?mkt={culture}&it=GB&cstl=WL&og={odmgeneration}&n=z"],["weatherDarkUriFormat","{urischeme}ecn.dynamic.t{subdomain}.tiles.virtualearth.net/comp/ch/{quadkey}?mkt={culture}&it=GB&cstl=WD&og={odmgeneration}&n=z"],["weatherLightLabelUriFormat","{urischeme}ecn.dynamic.t{subdomain}.tiles.virtualearth.net/comp/ch/{quadkey}?mkt={culture}&it=Z,GF,L&cstl=WL&og={odmgeneration}&n=z"],["weatherDarkLabelUriFormat","{urischeme}ecn.dynamic.t{subdomain}.tiles.virtualearth.net/comp/ch/{quadkey}?mkt={culture}&it=Z,GF,L&cstl=WD&og={odmgeneration}&n=z"],["bingMapsRESTServicesUrl","{urischeme}dev.virtualearth.net/REST/v1/Locations"],["imageryMetadataUrl","{urischeme}dev.virtualearth.net/REST/V1/Imagery/Metadata/{imagerySet}?jsonp=microsoftMapsNetworkCallback&jsonso={jsono}&key={credentials}&centerPoint=47.6,-122.2&zoomLevel=1&include=ImageryProviders&culture={culture}"],["elevationServiceUrl","{urischeme}dev.virtualearth.net/REST/v1/Elevation/BoundingRect/{south},{west},{north},{east}/{rows}/{cols}?jsonp=microsoftMapsNetworkCallback&jsonso={jsono}&key={credentials}"],["nativeBirdseyeMetadataUrl","{urischeme}dev.virtualearth.net/REST/V1/Imagery/Metadata/Birdseye/{centerpoint}?jsonp=microsoftMapsNetworkCallback&jsonso={jsono}&key={credentials}&zl={zoom}&dir={heading}&dl=2"],["venueMapsMetadataJsonpUrl","default={urischeme}dev.virtualearth.net/REST/v1/JsonFilter/VenueMaps/data/{0}?culture={culture}&key={credentials};prod={urischeme}dev.virtualearth.net/REST/v1/JsonFilter/VenueMaps/data/{0}?culture={culture}&key={credentials};dev={urischeme}dev.virtualearth.net/REST/v1/JsonFilter/VenueMapsDev/data/{0}?culture={culture}&key={credentials};staging={urischeme}dev.virtualearth.net/REST/v1/JsonFilter/VenueMapsStaging/data/{0}?culture={culture}&key={credentials};venuemaps1={urischeme}dev.virtualearth.net/REST/v1/JsonFilter/VenueMaps1/data/{0}?culture={culture}&key={credentials};venuemaps2={urischeme}dev.virtualearth.net/REST/v1/JsonFilter/VenueMaps1/data/{0}?culture={culture}&key={credentials}"],["venueMapsTileUrl","default={urischeme}venuemaps.virtualearth.net/{0}/{1}/{{quadkey}}.png;prod={urischeme}venuemaps.virtualearth.net/{0}/{1}/{{quadkey}}.png;dev={urischeme}venuemapsdev.blob.core.windows.net/{0}/{1}/{{quadkey}}.png;staging={urischeme}venuemapsstaging.blob.core.windows.net/{0}/{1}/{{quadkey}}.png;venuemaps1={urischeme}venuemaps1.blob.core.windows.net/{0}/{1}/{{quadkey}}.png;venuemaps2={urischeme}venuemaps2.blob.core.windows.net/{0}/{1}/{{quadkey}}.png"],["venueMapsNearbyUrl","{urischeme}dev.virtualearth.net/REST/v1/VenueMaps/PointRadius/{location}/{radius}?jsonp=microsoftMapsNetworkCallback&jsonso={jsono}&output=json&key={credentials}"],["venueMapsEroServiceUrl","http://api.bing.net/json.aspx?AppId={appid}&Query={query}&Sources=Phonebook&Version=2.0&Market=en-us&UILanguage=en&Latitude={latitude}&Longitude={longitude}&Radius=10.0&Options=EnableHighlighting&Phonebook.Count=1&Phonebook.Offset=0&Phonebook.FileType=YP&Phonebook.SortBy=Distance&JsonType=callback&JsonCallback={jsonp}&Phonebook.LocId={ypid}"],["hotRegionsRoadUrl","{urischeme}{ondemanddomain}/comp/ch/{quadkey}.json?mkt={culture}&it=G,VE,BX,L,LA&shading=hill&jsonp={jsonp}&jsonso={jsonso}&og={odmgeneration}"],["hotRegionsAerialWithLabelsUrl","{urischeme}{ondemanddomain}/comp/ch/{quadkey}.json?mkt={culture}&it=A,G,L&shading=hill&jsonp={jsonp}&jsonso={jsonso}&og={odmgeneration}"],["onDemandRoadUriFormat","{urischeme}{ondemanddomain}/comp/ch/{quadkey}?mkt={culture}&it=G,VE,BX,L,LA&shading=hill&og={odmgeneration}&n=z"],["onDemandAerialWithLabelsUriFormat","{urischeme}{ondemanddomain}/comp/ch/{quadkey}?mkt={culture}&it=A,G,L&shading=hill&og={odmgeneration}&n=z"],["microPOIHotRegionsUrl","{urischeme}{ondemanddomain}/mpoi/MicroPoi/{quadkey}.json?q={query}&filter={filter}&jsonp={jsonp}&jsonso={jsonso}&output=json"],["microPOITilesUrl","{urischeme}{ondemanddomain}/mpoi/MicroPoi/{quadkey}?q={query}&filter={filter}"],["streetsideCoverageMercatorUriFormat","{urischeme}ecn.t{subdomain}.tiles.virtualearth.net/tiles/hcn{quadkey}?g={generation}&n=z"],["streetsideCoverageBirdseyeUriFormat","{urischeme}ecn.t{subdomain}.tiles.virtualearth.net/tiles/hcs{quadkey}?g={generation}&dir={dir}&n=z"],["trafficUriFormat","{urischeme}t{subdomain}.tiles.virtualearth.net/tiles/dp/content?p=tf&a={quadkey}&n=z"],["imageryCopyrightUrl","{urischeme}dev.virtualearth.net/REST/V1/Imagery/Copyright/{culture}/{imagerySet}/{zoom}/{minLat}/{minLon}/{maxLat}/{maxLon}?output=json&dir={heading}&jsonp=microsoftMapsNetworkCallback&jsonso={jsono}&key={credentials}"],["directionsService","{urischeme}dev.virtualearth.net/mapcontrol/directions.ashx?"],["directionsMaxWaypoints","25"],["searchService","{urischeme}dev.virtualearth.net/services/v1/SearchService/SearchService.asmx/Search2"],["geocodingService","{urischeme}dev.virtualearth.net/services/v1/geocodeservice/geocodeservice.asmx"],["bingThemeIconUrlFormat",n+"BingTheme/pins/pin_{iconStyle}{imageryStyle}{state}.png"],["biciLoggingService","{urischeme}dev.virtualearth.net/mapcontrol/logging.ashx"],["localDetailsUrl","http://www.bing.com/local/details.aspx?lid={0}&q={1}&mkt={culture}&FORM={2}"],["trafficIncidentsJs","{urischeme}ecn.dev.virtualearth.net/REST/v1/Traffic/Incidents/{bounds}/?jsonp=microsoftMapsNetworkCallback&jsonso={jsono}&severity={sev}&key={credentials}"],["restAdvancedSearchService","{urischeme}dev.virtualearth.net/mapcontrol/search.ashx"],["wikiDataUrl","http://upload.maps.bing.com/WikipediaContentProviderService/WikipediaInfo.ashx?eid={0}"],["privacyStatementLink","http://www.microsoft.com/privacystatement/{culture}/bing/default.aspx"]],i=t.length;i--;)this[t[i][0]]=t[i][1].replace(/{ondemanddomain}/g,this.onDemandDomain).replace(/{staticdomain}/g,this.staticDomain).replace(/{urischeme}/g,this.protocol).replace(/{version}/g,this.version).replace(/{culture}/g,this.locale).replace(/{generation}/g,this.tilegeneration).replace(/{odmgeneration}/g,this.odmtilegeneration).replace(/{tilemarket}/g,this.tilelocale.indexOf("__")==-1?this.tilelocale:this.locale);this.defaultAerialTiltOn=!0,this.notileImageUrl=n+"notile.png",this.pushpinImageUrl=n+"poi_search.png",this.spacerImageUrl=n+"spacer.gif",this.microPOIImageUrl=n+"/MicroPOI/",this.venueMapsNumberOfMapTileServers=4,this.venueMapsTileServerSubdomainsX="0,2,4,6",this.venueMapsTileServerSubdomainsY="1,3,5,7",this.logoBingMapsLink="http://www.bing.com/maps/?v=2&cp={0}~{1}&lvl={2}&FORM=BMLOGO",this.logoBingSearchUrl="http://www.bing.com/search?q={0}&FORM=BMSDK1",this.biciPID="5901",this.cursorPath=this.domain+"/"+this.version+"/cursors/",this.imagePath=n,this.trafficMinZoom=5,this.trafficMinIncidentsZoom=8,this.trafficRefresh=180000,this.trafficExpiry=1800000,this.venueMapAction1Context="Mall",this.venueMapAction2Context="Airport",this.mapAppApp1ActionContext="10330",this.mapAppApp2ActionContext="10310"}},n.init(),window[$MapsNamespace].Maps.Globals=n,t=n.jsPath+(typeof VEAPI_perflog=="undefined"?"veapicore.js":"veapicorePerf.js"),0?n.coreJs=t:i()})()


// JavaScript Document
function GeoJSONModule(map) {

  Microsoft.Maps.Pushpin.prototype.title = null;
  Microsoft.Maps.Pushpin.prototype.description = null;

  $.ajaxSetup({
    cache : false
  });

  var allLocs = new Array();

  this.ImportDRCFeed = function() {
    var feed = 'http://gis.fema.gov/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=FEMA:DISASTER_RECOVERY_CENTERS&maxFeatures=250&outputFormat=json';
    var props = {
      icon : 'images/pin-drc.png'
    };
    $.getJSON(feed, function(data) {
      $.each(data.features, function(key, value) {
        var p = value.properties;
        if (p.LONGITUDE && p.LATITUDE) {
          var drcName = "";
          if (p.MOBILE == 'Y') {
            drcName += 'Mobile ';
          }
          drcName += 'Disaster Recovery Center: ' + p.DRC_NAME;
          var drcAddr = p.STREET_1;
          if (p.STREET_2 != null) {
            drcAddr += " " + p.STREET_2;
          }
          drcAddr += " " + p.CITY + ", " + p.STATE + " " + p.ZIP;
          var thisLoc = new Microsoft.Maps.Location(p.LATITUDE, p.LONGITUDE);
          allLocs.push(thisLoc);

          var shape = new Microsoft.Maps.Pushpin(thisLoc, props);
          shape.title = drcName;
          shape.description = drcAddr;
          pushpinClick = Microsoft.Maps.Events.addHandler(shape, 'click', showInfoBox);
          map.entities.push(shape);
        }
      });
    });
  };

  this.ImportNSSFeed = function() {
    var feed = 'http://gis.fema.gov/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=FEMA:FEMANSSOpenShelters&maxFeatures=250&outputFormat=json';
    var props = {
      icon : 'images/pin-shelters.png'
    };
    $.getJSON(feed, function(data) {
      $.each(data.features, function(key, value) {
        var p = value.properties, g = value.geometry, lat, lon;

        if (g && g.coordinates && g.coordinates[1] != 0 && g.coordinates[0] != 0) {
          var shName = "Shelter: " + p.SHELTER_NAME;
          var shAddr = p.ADDRESS + " " + p.CITY + ", " + p.STATE + " " + p.ZIP;

          lat = g.coordinates[1];
          lon = g.coordinates[0];

          var thisLoc = new Microsoft.Maps.Location(lat, lon);
          allLocs.push(thisLoc);

          var shape = new Microsoft.Maps.Pushpin(thisLoc, props);
          shape.title = shName;
          shape.description = shAddr;
          pushpinClick = Microsoft.Maps.Events.addHandler(shape, 'click', showInfoBox);
          map.entities.push(shape);
        }
      });
    });
  };

  this.displayFeeds = function(isDRC, isNSS, latitude, longitude, userLocation) {
    if (typeof(userLocation) === undefined) userLocation = false;

    map.entities.clear();
    allLocs = new Array();

    $(document).ajaxStop(function() {
      $(this).unbind("ajaxStop");

      if (allLocs.length > 0) {
        map.setView({
          bounds : Microsoft.Maps.LocationRect.fromLocations(allLocs)
        });
      } else {
        map.setView({
          center : new Microsoft.Maps.Location(latitude, longitude),
          zoom : 3
        });
      }

      if (userLocation) {
        var props = {
          icon : 'images/pin-user.png'
        };
        var userLoc = new Microsoft.Maps.Location(latitude, longitude);
        allLocs.push(userLoc);
        var shape = new Microsoft.Maps.Pushpin(userLoc, props);
        shape.title = 'My Location';
        shape.description = '';
        pushpinClick = Microsoft.Maps.Events.addHandler(shape, 'click', showInfoBox);
        map.entities.push(shape);

        map.setView({
          center : new Microsoft.Maps.Location(latitude, longitude),
          zoom : 7
        });

      }

    });

    if (isDRC) {
      this.ImportDRCFeed();
    }

    if (isNSS) {
      this.ImportNSSFeed();
    }
  };

}

Microsoft.Maps.moduleLoaded('GeoJSONModule');

