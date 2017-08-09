
PciApp.Project = {
  strDir: 'projects',
  iNewId: -9999, 
  iFile: 0,
  ProjectId: 0,
  arProjects: new Array(),
  bChange: false,
  iAttachmentSize : 0,

  
  onSuccess: function (imageData) 
  {
    window.resolveLocalFileSystemURI(imageData, 
    function (fileEntry)
    {
      var arName = fileEntry.name.split('.');
      var strFreeName = PciApp.Project.getFreeName() + "_temp."+ arName[1];
      var def = PciApp.File.copy(fileEntry, PciApp.Project.strDir, strFreeName)
      def.done(function(newFileEntry)
      {
        newFileEntry.file(function(file){PciApp.Project.calcAttachmentSize(file.size,true);}, null);
        PciApp.Project.addImage(newFileEntry.fullPath);
        PciApp.Project.bChange = true;        
      });
    }
  , function (message) 
    {
      alert('Failed because: ' + message);
    });
  },
  
  hint: function()
  {
    if (PciApp.Setup.getValue('Hint_Project') != "true")
      PciApp.Hint.show(12);
    else PciApp.Project.overview();      
  },
  
  calcAttachmentSize: function(par_iSize, par_bAdd)
  {
    if (par_bAdd)
      PciApp.Project.iAttachmentSize = PciApp.Project.iAttachmentSize + par_iSize;
    else
      PciApp.Project.iAttachmentSize = PciApp.Project.iAttachmentSize - par_iSize;
   $('#project_size_input').html(Math.round(PciApp.Project.iAttachmentSize/1024)+ ' kB');
  },
  
  
  overview: function (par_bRefresh)
  {
    if (par_bRefresh != true) par_bRefresh = false;
    var defView = $.Deferred();
    var list = $('#list_project'); list.html("");
    var defSearch = PciApp.Db.searchProject();
    defSearch.done(function()
    {
      if (par_bRefresh) history.back();
      else PciApp.showPage('#project');          
      
      for (var index = 0; index < PciApp.Project.arProjects.length; index++) 
      {
        var strHtml = $('#entrycheck').html();
        strHtml = strHtml.replace('name', PciApp.Project.arProjects.item(index).Name);
        strHtml = strHtml.replace('0000', 'PciApp.Project.show('+PciApp.Project.arProjects.item(index).Id.toString()+')');
        if (PciApp.Project.arProjects.item(index).bSend == '1')
          strHtml = strHtml.replace('bchecked', 'checked="checked"');
        else strHtml = strHtml.replace('bchecked', '');  
        list.append(strHtml);
      }
      defView.resolve();
    }); 
    
    return defView;
  },

  print: function()
  {
    var arData = PciApp.Project.getData(); 
    var strText = $.t('project_name')+' : '+arData[0]+'<br><br>'+
        $.t('adress')+' :<br>'+arData[1]+'<br><br>'+$.t('description')+' :<br>'+arData[2];
    PciApp.print(strText);
  },
  
  
  sendEmail: function ()
  {
    var defFiles = PciApp.File.getDirEntries(PciApp.Project.strDir, PciApp.Project.ProjectId+'_', true);
    defFiles.done(function(arEntries)
    {
      var arFiles = new Array();
      for (var i=0;i<arEntries.length; i++)
        arFiles.push(arEntries[i].fullPath);
      var arData = PciApp.Project.getData(); 
      
      var strText = $.t('project_name')+' : '+arData[0]+'<br><br>'+
        $.t('adress')+' :<br>'+arData[1]+'<br><br>'+$.t('description')+' :<br>'+arData[2];
      PciApp.sendEmail(PciApp.Setup.getValue('strProjectEmail'), $.t('project_detector').replace('&shy;', ''), strText, arFiles);
    })
  },  
  
  set: function(par_iId)
  {
    if (par_iId === undefined)
      PciApp.Project.ProjectId = PciApp.Project.iNewId;
    else PciApp.Project.ProjectId = par_iId;
  },
  
  getFreeName: function()
  {
    PciApp.Project.iFile++;
    return PciApp.Project.ProjectId+"_"+PciApp.Project.iFile;
  },
  
  addImage: function(par_strImage)
  {
    var arFile = par_strImage.split('/');
    var strFileName = arFile.pop();
    var arFileName = strFileName.split('.');
    var arId = arFileName[0].split('_');
    PciApp.Project.iFile = Math.max(PciApp.Project.iFile, arId[1]);
    if (par_strImage.indexOf('_del') >= 0) return;
    par_strImage = PciApp.File.getDeviceName(par_strImage);
    if (!PciApp.bIsBlack)
      par_strImage = par_strImage +'?' +new Date().getTime();
    var strHtml = $('#image_entry').html();
    // muss so da nicht Ÿber attr 
    strHtml = strHtml.replace('image_cnt_', 'image_cnt_' + arId[1]);
    strHtml = $(strHtml);
    strHtml.find('#image').attr('src', par_strImage);
    strHtml.find('#image').attr('onclick', 'PciApp.Image.show(\''+ par_strImage +'\')');
    strHtml.find('#image_del').attr('onclick', 'PciApp.Project.delImage(\''+ strFileName +'\', \''+ arId[1] +'\')');
    $('#project_images').append(strHtml);
  },
  
       
  loadImages: function()
  {
    PciApp.Project.iFile = 0;
    var defFiles = PciApp.File.getDirEntries(PciApp.Project.strDir, PciApp.Project.ProjectId+'_', true);
    var list = $('#project_images'); list.html("");
    defFiles.done(function(arEntries)
    {
      var arImages = new Array();
      for (var i=0;i<arEntries.length; i++)
      {  
        arEntries[i].file(function(file){PciApp.Project.calcAttachmentSize(file.size,true);}, null);
        arImages.push(arEntries[i].fullPath);
      }
      arImages.sort();
      for (var i=0;i<arImages.length;i++)
        PciApp.Project.addImage(arImages[i]);
      
      list.trigger("create");
    });
  },
  
  delImage: function(par_strFile, par_iId)
  {
    PciApp.File.exists(PciApp.Project.strDir +'/'+ par_strFile, function () {
      var defFile = PciApp.File.getFile(PciApp.Project.strDir +'/'+par_strFile, false);  
      defFile.done(function (fileentry) {
        fileentry.file(function(file){PciApp.Project.calcAttachmentSize(file.size,false);}, null);
        var rename = PciApp.File.rename(fileentry, fileentry.name.replace('.', '_del.'));
        rename.done(function()
        {
          $('div#project_details').find('#image_cnt_'+par_iId).remove();
          PciApp.Project.bChange = true          
        }); 
      });
    }, null);
  },
  
  getData: function()
  {
    for (var index = 0; index < PciApp.Project.arProjects.length; index++) 
      if (PciApp.Project.arProjects.item(index).Id == PciApp.Project.ProjectId)
       return new Array(PciApp.Project.arProjects.item(index).Name, 
        PciApp.Project.arProjects.item(index).Adress, 
        PciApp.Project.arProjects.item(index).Description, 
        PciApp.Project.arProjects.item(index).bSend);
    return new Array("", "", "", "");  
    
  },
     
  show: function(par_iId)
  {
    PciApp.Project.bChange = false;
    PciApp.Project.iAttachmentSize = 0;       
    $('div#project_details').find('#project_size_input').html('0 kB');

    PciApp.Project.set(par_iId);
    var defFiles = PciApp.File.getDirEntries(PciApp.Project.strDir, '_', false);
    defFiles.done(function(arEntries)
    {
      var defSaveFiles = $.Deferred();
      PciApp.Project.save_files(arEntries, false, null, defSaveFiles);      
      defSaveFiles.done(function()
      {
        PciApp.showPage('#project_details');
        var arData = PciApp.Project.getData();
        $('#project_name_input').val(arData[0]).change(function(){PciApp.Project.bChange = true});
        $('#project_adress_input').val(arData[1]).change(function(){PciApp.Project.bChange = true});
        $('#project_description_input').val(arData[2]).change(function(){PciApp.Project.bChange = true});
        if (arData[3] == '1')
          $('#project_bsend_input').attr("checked", true);
        else 
          $('#project_bsend_input').attr("checked", false);
        PciApp.Project.loadImages();
        $('#project_bsend_input').checkboxradio("refresh").change(function(){PciApp.Project.bChange = true});
      });
    });          
  },

  save_files: function(arEntries, par_bSave, par_iId, par_defFilesSave)
  {
    if (arEntries.length == 0) 
    {
      par_defFilesSave.resolve();
      return;
    }
    var strFile = arEntries.shift();
    var defFile = $.Deferred();
    // wenn durch ruft sich neu auf
    defFile.done(function () {PciApp.Project.save_files(arEntries, par_bSave, par_iId,par_defFilesSave);});   
    // wenn gespeichert wird
    if (par_bSave) 
    {
      if (strFile.name.indexOf('_del') >= 0)
      {
        strFile.remove();
        defFile.resolve(); 
  
      }
      else if (strFile.name.indexOf('_temp') >= 0)
      {
        // wenn gespeichert wird die id noch umbennen
        var strNewName = strFile.name.replace('_temp', '');
        var defRename = PciApp.File.rename(strFile, strNewName.replace(PciApp.Project.iNewId, par_iId));
        defRename.done(defFile.resolve());
      }
      else defFile.resolve();
    } else
    {
      // temps bzw neue Projektebilder werden gelšscht
      if (strFile.name.indexOf('_temp') >= 0 || strFile.name.indexOf('-') == 0)
      {
        strFile.remove();
        defFile.resolve(); 
      } else 
      // als del markierte wieder hergestellt
      if (strFile.name.indexOf('_del') >= 0)
      {
        var defRename = PciApp.File.rename(strFile, strFile.name.replace('_del', '')); 
        defRename.done(defFile.resolve());
      }    
      else defFile.resolve();      
    }
  },    
  
  save: function(par_bEmail)
  { 
    if ($('#project_name_input').val() == '')
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
      .fadeIn(200).html('').append($.t('hint_error_name')).fadeOut(4000);      
      return ;    
    }
    PciApp.Project.bChange = false;
    var bSend = 0;
    if (par_bEmail || $('#project_bsend_input').is(':checked')) bSend = 1;
    var def = PciApp.Db.saveProject(PciApp.Project.ProjectId, 
      $('#project_name_input').val(), 
      $('#project_adress_input').val(),
      $('#project_description_input').val(), bSend);  
    def.done(function(par_iId)
    {
      var defFiles = PciApp.File.getDirEntries(PciApp.Project.strDir, PciApp.Project.ProjectId+'_', false);
      defFiles.done(function(arEntries)
      {
        var defFilesSave = $.Deferred();
        PciApp.Project.save_files(arEntries, true, par_iId, defFilesSave);
        PciApp.Project.set(par_iId); 
        defFilesSave.done(function()
        {
          var defView = PciApp.Project.overview(true);
          defView.done(function()
          {
            if (par_bEmail)
              PciApp.Project.sendEmail();
            else
              $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
                .fadeIn(200).html('').append($.t('hint_project_save')).fadeOut(4000);      
          });
        });
      });

    });
  },
  
  cancel : function()
  {
    if (PciApp.Project.bChange)
      PciApp.Hint.show(13, '', function() {PciApp.Project.overview(true);});
    else PciApp.Project.overview(true);
  },

  init : function()
  {
    $('div#project').remove();
    $('div#project_details').remove();
    
    var DefLoadProject = PciApp.loadPage("pages/project_details.html");
    DefLoadProject.done(function(data) {
      $('body').append(data); 
      $('div#project_details').find('h1').html($.t('project'));
      $('div#project_details').find("#project_name").html($.t('project_name')+':');
      $('div#project_details').find("#project_adress").html($.t('adress')+':');
      $('div#project_details').find("#project_description").html($.t('description')+':');
      $('div#project_details').find("#project_bsend").html($.t('project_bsend')+':');
      $('div#project_details').find("#make_photo").html($.t('photo'));
      $('div#project_details').find("#load_photo").html($.t('gallery'));
      $('div#project_details').find("#send").html($.t('send'));
      $('div#project_details').find("#del").html($.t('del'));
      $('div#project_details').find("#save").html($.t('save'));
      $('div#project_details').find("#cancel").html($.t('cancel'));
      $('div#project_details').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#project_details').find("#project_size").html($.t('size_attachment')+ ':');      
               
      $('div#project_details').find("#print").html($.t('print'));
      if (PciApp.bIsAndroid)
        $('div#project_details').find("#print_ios").css('display', 'none');        
      else $('div#project_details').find("#print_android").css('display', 'none');        
      
    });

    var DefLoadProject2 = PciApp.loadPage("pages/project.html");
    DefLoadProject2.done(function(data) {
      $('body').append(data); 
      $('div#project').find("#new").html($.t('project_new'));
      $('div#project').find('h1').html($.t('project_detector'));
      $('div#project').find("#menu_list_pointer").html($('#menu_list').html());
    });
  },
  
  del: function()
  {
    var def = PciApp.Db.delProject(PciApp.Project.ProjectId);  
    def.done(function()
    {
      var defFiles = PciApp.File.getDirEntries(PciApp.Project.strDir, PciApp.Project.ProjectId+'_', false);
      defFiles.done(function(arEntries)
      {
        for (var i=0; i< arEntries.length; i++)
          arEntries[i].remove(); 
        $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('hint_project_del')).fadeOut(4000);      
        PciApp.Project.overview(true);          
      });
    });
  }  
}


PciApp.Settings = {
  iDefaultCamera : 100,
 
  overview: function()
  {
  
    if (PciApp.bAllDownload)
      $('div#settings').find('#offline').addClass('ui-disabled');
    else   
      $('div#settings').find('#offline').removeClass('ui-disabled');
    PciApp.showPage('#settings');
    var Camera_qual = PciApp.Setup.getValue('Camera_qual');
    if (Camera_qual < 50)
      $('div#settings').find("#camera_qual").val(PciApp.Settings.iDefaultCamera).slider("refresh"); 
    else
      $('div#settings').find("#camera_qual").val(Camera_qual).slider("refresh"); 
  }, 
  
  save: function()
  {
    PciApp.Db.setSetting('Camera_qual', $('div#settings').find("#camera_qual").val());
    PciApp.Setup.load();
  },
  
  init: function()
  {
    $('div#settings').remove();
    
    var DefLoadSettings = PciApp.loadPage("pages/settings.html");
    DefLoadSettings.done(function(data) {
      $('body').append(data); 
      $('div#settings').find('h1').html($.t('settings'));
      $('div#settings').find('#camera_qual_label').html($.t('camera_qual')+ ':');
      $('div#settings').find('#back').html($.t('reset'));
      $('div#settings').find('#export').html($.t('export'));
      $('div#settings').find('#offline').html($.t('offline_files'));
      $('div#settings').find("#menu_list_pointer").html($('#menu_list').html());
    });
  },
  
  hint: function()
  {
    ;
  },
  
  dorelocate: function(par_bOwnData)
  {
    
    var defDelAll = $.Deferred();
    PciApp.Db.delAll(defDelAll, par_bOwnData);
    // alles platt machen
    PciApp.showHint($.t('hint_cleanup_files'));
    defDelAll.done(function()
    {
      var defDb = $.Deferred();
      PciApp.Db.updateDb(defDb, par_bOwnData);
      defDb.done(function()
      {
        var def = PciApp.Setup.load();
        def.done(function() {
          if (!PciApp.bPhonegap)
          {
              PciApp.showHint('', false, true);
              PciApp.Setup.overview();
          }
          else
          {
            //alles loeschen
            if (!par_bOwnData)
            {
              var defDir = PciApp.File.getDir('');
              defDir.done(function(dirEntry)
              {
                dirEntry.removeRecursively(function()
                {
                  PciApp.showHint('', false, true);
                  PciApp.File.checkOldFolder(); 
                  PciApp.Setup.overview();
                }); 
              });
            }
            else
            {
              // loeschen der Ordner
              var defFolder1 = $.Deferred();
              var defDir1 = PciApp.File.getDir('cert');
              defDir1.done(function(dirEntry) {dirEntry.removeRecursively(function() {defFolder1.resolve();});});  
              
              var defFolder2 = $.Deferred();
              defFolder1.done(function()
              {
                var defDir2 = PciApp.File.getDir('images');
                defDir2.done(function(dirEntry) {dirEntry.removeRecursively(function() {defFolder2.resolve();});});  
              });
              var defFolder3 = $.Deferred();
              defFolder2.done(function()
              {
                var defDir3 = PciApp.File.getDir('safety');
                defDir3.done(function(dirEntry) {dirEntry.removeRecursively(function() {defFolder3.resolve();});});  
              });
              var defFolder4 = $.Deferred();
              defFolder3.done(function()
              {
                var defDir4 = PciApp.File.getDir('technic');
                defDir4.done(function(dirEntry) {dirEntry.removeRecursively(function() {defFolder4.resolve();});});  
              });
              defFolder4.done(function()
              {
                var defDir5 = PciApp.File.getDir('technical');
                defDir5.done(function(dirEntry) {dirEntry.removeRecursively(function() {                 
                  PciApp.showHint('', false, true);
                  PciApp.File.checkOldFolder(); 
                  PciApp.Setup.overview();
                  });});  
              });
            }
          } 
        });   
      });
    });    
  }
  

}

PciApp.Measurement = {
  strDir: 'measure',
  iNewId: -9999, 
  MeasurementId: 0,
  arMeasurements: new Array(),
  arMeasure: new Array(),
  iMeasure:0,
  bChange: false,
  arTriangle:{},
  arRectangle:{},      
  arCircle:{},
  arVolume:{},
  arReach:{},
  arSegment:{},
  arParallelogramm:{},  
  arTrapez:{},  
  iAttachmentSize : 0,
  iFile: 0,
  arForms : {},
  
  onSuccess: function (imageData) 
  {
    window.resolveLocalFileSystemURI(imageData, 
    function (fileEntry)
    {
      var arName = fileEntry.name.split('.');
      var strFreeName = PciApp.Measurement.getFreeName() + "_temp."+ arName[1];
      var def = PciApp.File.copy(fileEntry, PciApp.Measurement.strDir, strFreeName)
      def.done(function(newFileEntry)
      {
        newFileEntry.file(function(file){PciApp.Measurement.calcAttachmentSize(file.size,true);}, null);
        PciApp.Measurement.addImage(newFileEntry.fullPath);
        PciApp.Measurement.bChange = true;        
      });
    }
  , function (message) 
    {
      alert('Failed because: ' + message);
    });
  },
  
  hint: function()
  {
    if (PciApp.Setup.getValue('Hint_Measurement') != "true")
      PciApp.Hint.show(15);
    else PciApp.Measurement.overview();      
  },

    
  getFreeName: function()
  {
    PciApp.Measurement.iFile++;
    return PciApp.Measurement.MeasurementId+"_"+PciApp.Measurement.iFile;
  },
    
  delImage: function(par_strFile, par_iId)
  {
    PciApp.File.exists(PciApp.Measurement.strDir +'/'+ par_strFile, function () {
      var defFile = PciApp.File.getFile(PciApp.Measurement.strDir +'/'+par_strFile, false);  
      defFile.done(function (fileentry) {
        fileentry.file(function(file){PciApp.Measurement.calcAttachmentSize(file.size,false);}, null);
        var rename = PciApp.File.rename(fileentry, fileentry.name.replace('.', '_del.'));
        rename.done(function()
        {
          $('div#measurement_details').find('#image_cnt_'+par_iId).remove();
          PciApp.Measurement.bChange = true          
        }); 
      });
    }, null);
  },
    
  addImage: function(par_strImage)
  {
    var arFile = par_strImage.split('/');
    var strFileName = arFile.pop();
    var arFileName = strFileName.split('.');
    var arId = arFileName[0].split('_');
    PciApp.Measurement.iFile = Math.max(PciApp.Measurement.iFile, arId[1]);
    if (par_strImage.indexOf('_del') >= 0) return;
    par_strImage = PciApp.File.getDeviceName(par_strImage);
    if (!PciApp.bIsBlack)
      par_strImage = par_strImage +'?' +new Date().getTime();
    var strHtml = $('#image_entry').html();
    // muss so da nicht Ÿber attr 
    strHtml = strHtml.replace('image_cnt_', 'image_cnt_' + arId[1]);
    strHtml = $(strHtml);
    strHtml.find('#image').attr('src', par_strImage);
    strHtml.find('#image').attr('onclick', 'PciApp.Image.show(\''+ par_strImage +'\')');
    strHtml.find('#image_del').attr('onclick', 'PciApp.Measurement.delImage(\''+ strFileName +'\', \''+ arId[1] +'\')');
    $('#measurement_images').append(strHtml);
  },
  
       
  loadImages: function()
  {
    PciApp.Measurement.iFile = 0;
    var defFiles = PciApp.File.getDirEntries(PciApp.Measurement.strDir, PciApp.Measurement.MeasurementId+'_', true);
    var list = $('#measurement_images'); list.html("");
    defFiles.done(function(arEntries)
    {
      var arImages = new Array();
      for (var i=0;i<arEntries.length; i++)
      {  
        arEntries[i].file(function(file){PciApp.Measurement.calcAttachmentSize(file.size,true);}, null);
        var strPath = arEntries[i].fullPath;
        arImages.push(strPath);
      }
      arImages.sort();
      for (var i=0;i<arImages.length;i++)
        PciApp.Measurement.addImage(arImages[i]);
      
      list.trigger("create");
    });
  },      
  
  save_files: function(arEntries, par_bSave, par_iId, par_defFilesSave)
  {
    if (arEntries.length == 0) 
    {
      par_defFilesSave.resolve();
      return;
    }
    var strFile = arEntries.shift();
    var defFile = $.Deferred();
    // wenn durch ruft sich neu auf
    defFile.done(function () {PciApp.Measurement.save_files(arEntries, par_bSave, par_iId,par_defFilesSave);});   
    // wenn gespeichert wird
    if (par_bSave) 
    {
      if (strFile.name.indexOf('_del') >= 0)
      {
        strFile.remove();
        defFile.resolve(); 
  
      }
      else if (strFile.name.indexOf('_temp') >= 0)
      {
        // wenn gespeichert wird die id noch umbennen
        var strNewName = strFile.name.replace('_temp', '');
        var defRename = PciApp.File.rename(strFile, strNewName.replace(PciApp.Measurement.iNewId, par_iId));
        defRename.done(defFile.resolve());
      }
      else defFile.resolve();
    } else
    {
      // temps bzw neue Projektebilder werden gelšscht
      if (strFile.name.indexOf('_temp') >= 0 || strFile.name.indexOf('-') == 0)
      {
        strFile.remove();
        defFile.resolve(); 
      } else 
      // als del markierte wieder hergestellt
      if (strFile.name.indexOf('_del') >= 0)
      {
        var defRename = PciApp.File.rename(strFile, strFile.name.replace('_del', '')); 
        defRename.done(defFile.resolve());
      }    
      else defFile.resolve();      
    }
  },    
      
  calculateMeasure : function(par_iTyp, par_arData)  
  {
    var strText = '';
    var a = parseFloat(par_arData[0]);
    var b = parseFloat(par_arData[1]);
    var c = parseFloat(par_arData[2]);
    var d = parseFloat(par_arData[3]);
    var e = parseFloat(par_arData[4]);
    iArea = null;
    iRange = null;
    iVolume = null;
    switch(par_iTyp)
    {
      case '1':
       iHelp = (a+b+c)/2;
       iHelp = iHelp*(iHelp-a)*(iHelp-b)*(iHelp-c);
       if (iHelp <= 0) iArea = 0;
       else iArea = Math.sqrt(iHelp);
       iRange = a+b+c;
      break;
      case '2':
       iArea = a*b
       iRange = 2*a+2*b;
      break;
      case '3':
        iArea = Math.PI*a*a/4;
        iRange = Math.PI*a;
      break;
      case '4':
        iVolume = a*b*c;
      break;
      case '6':
        iArea = a*c;
        iRange = 2*a+2*b;
      break;
      case '7':
        // winkel alpha berechnen
        var alpha = Math.atan(a/2/b)*180/Math.PI;
        var alpha = alpha*4;
        // nach dreiecHöhensatz
        var h = Math.pow(a/2,2)/b;
        var radius = (h+b)/2;
        // bogenlänge und fläche berechnen 
        // wird dann vom rest abgezogen
        var bogen = radius * alpha * Math.PI / 180;
        var iAreaNot = (radius*bogen/2) - ((radius - h)*a)/2;
        
        var iArea = (Math.PI*Math.pow(radius*2,2)/4) - iAreaNot;
        var iRange = Math.PI*radius*2- bogen; 
      break;
      case '8':
        iHelp = (a+b+e)/2;
        iHelp = iHelp*(iHelp-a)*(iHelp-b)*(iHelp-e);
        iHelp2 = (c+d+e)/2;
        iHelp2 = iHelp2*(iHelp2-c)*(iHelp2-d)*(iHelp2-e);

        if (iHelp <= 0 || iHelp2 <=0) iArea = 0;
        else iArea = Math.sqrt(iHelp)+ Math.sqrt(iHelp2);
        
        iRange = a+b+c+d;
      break;
              
    } 
    if (iArea != null)
      strText += $.t('area')+': '+Math.round(iArea*100)/100+ ' '+ $.t('area_unit')+', ';
    if (iRange != null)  
      strText += $.t('range')+': '+Math.round(iRange*100)/100+ ' '+ $.t('length_unit')+', ';
    if (iVolume != null)  
      strText += $.t('volume')+': '+Math.round(iVolume*100)/100+ ' '+ $.t('volume_unit')+', ';
    return strText;
  },
    
  load: function ()
  {
    var defLoad = $.Deferred();
    var defSearch = PciApp.Db.searchMeasurement();
    defSearch.done(function(){defLoad.resolve()});
    return defLoad;
  },

  loadMeasure: function ()
  {
    var defLoad = $.Deferred();
    var defSearch = PciApp.Db.searchMeasure(PciApp.Measurement.MeasurementId);
    defSearch.done(function(){defLoad.resolve()});
    return defLoad;
  },
  
  // fügt ein aufmasse hilfe hinzu
  addMeasure: function(par_iType, par_strName, par_strParam1, par_strParam2, par_strParam3, par_strParam4, par_strParam5, par_bEdit)
  {
    if (par_bEdit == '0')
    {
      PciApp.Measurement.iMeasure++;        
      var strHtml = $('#measurement_entry_cnt').html();
      var data = $(strHtml);
      data.find('#measure_entry_typ').parent().attr('id', 'measurement_entry_'+PciApp.Measurement.iMeasure);
      data.find('#img_del').attr('onclick', 'PciApp.Measurement.delMeasure(\''+PciApp.Measurement.iMeasure+'\');');
    }
    else
    {
      var data = $('div#measurement_details').find("#measurement_entry_"+par_bEdit);
      data.find('a').remove();
    }  
    
    var arData = PciApp.Measurement.getTypData(par_iType);
    data.find('#img_type').attr('src', arData['strImgSrc']); 
    data.find('#measure_entry_name').css('display', 'none').val(par_strName);
    data.find('#measure_entry_param1').css('display', 'none').val(par_strParam1);
    data.find('#measure_entry_param2').css('display', 'none').val(par_strParam2);
    data.find('#measure_entry_param3').css('display', 'none').val(par_strParam3);
    data.find('#measure_entry_param4').css('display', 'none').val(par_strParam4);
    data.find('#measure_entry_param5').css('display', 'none').val(par_strParam5);
    
    data.find('#measure_entry_typ').val(par_iType);
    
    strText = '';
          
    var arParam = [];          
    strText += '<div class="measure_name">' + data.find('#measure_entry_name').val()+'</div><div class="measure_values">';
    for (var j=0; j < arData['arFields'].length;j++)
    {
      arParam.push(data.find('#measure_entry_param'+(j+1)).val());
      if (data.find('#measure_entry_param'+(j+1)).val() == '') continue;
      var strUnit = $.t('length_unit');
      if (arData['arFields'][j] == $.t('angle')) strUnit = $.t('angle_unit');
      
      strText += arData['arFields'][j]+': '+ data.find('#measure_entry_param'+(j+1)).val()+ strUnit+'<br>';
    }
    strText = strText.substring(0,strText.length-4);
    strText += '</div><div class="measure_calc">'
    var strCalc = PciApp.Measurement.calculateMeasure(par_iType, arParam);
    strCalc = strCalc.substring(0,strCalc.length-2);
    strText = strText + strCalc.replace(', ', '<br>');
    strText += '</div>' 

    if (par_bEdit == '0')
    {
      data.find('#measure_entry_all').append('<a onclick="PciApp.Measurement.showMeasurement(\''+par_iType+'\', \''+par_strName+'\',\''+par_strParam1+'\',\''+par_strParam2+'\',\''+par_strParam3+'\',\''+par_strParam4+'\',\''+par_strParam5+'\', \''+PciApp.Measurement.iMeasure+'\')">'+ strText+ '</a>');
      $('div#measurement_details').find("#measure").append(data).trigger("create"); 
    
    }
    else  
      data.find('#measure_entry_all').append('<a onclick="PciApp.Measurement.showMeasurement(\''+par_iType+'\', \''+par_strName+'\',\''+par_strParam1+'\',\''+par_strParam2+'\',\''+par_strParam3+'\',\''+par_strParam4+'\',\''+par_strParam5+'\', \''+par_bEdit+'\')">'+ strText+ '</a>').trigger("create");

      
  },
  
  calcAttachmentSize: function(par_iSize, par_bAdd)
  {
    if (par_bAdd)
      PciApp.Measurement.iAttachmentSize = PciApp.Measurement.iAttachmentSize + par_iSize;
    else
      PciApp.Measurement.iAttachmentSize = PciApp.Measurement.iAttachmentSize - par_iSize;
   $('div#measurement_details').find('#measurement_size_input').html(Math.round(PciApp.Measurement.iAttachmentSize/1024)+ ' kB');
  },
  
  // löscht eine Aufmaßhilen eintrag
  delMeasure: function(par_iId)
  {
    $('#measurement_entry_'+par_iId).remove();
    PciApp.Measurement.bChange = true;
  },
  
  // zeogt übersicht zu allen Hilfen an
  overview: function (par_bRefresh)
  {
    if (par_bRefresh != true) par_bRefresh = false;
    var defView = $.Deferred();
    var list = $('#list_measurement'); list.html("");
    var defSearch = PciApp.Measurement.load();
    defSearch.done(function()
    {
      if (!par_bRefresh) PciApp.showPage('#measurement');          
      else history.back();
      for (var index = 0; index < PciApp.Measurement.arMeasurements.length; index++) 
      {
        var strHtml = $('#entrycheck').html();
        var arText = PciApp.Measurement.arMeasurements.item(index).Description.split("\n");  
        strHtml = strHtml.replace('name', arText[0]);
        strHtml = strHtml.replace('0000', 'PciApp.Measurement.show('+PciApp.Measurement.arMeasurements.item(index).Id.toString()+')');
        if (PciApp.Measurement.arMeasurements.item(index).bSend == '1')
          strHtml = strHtml.replace('bchecked', 'checked="checked"');
        else strHtml = strHtml.replace('bchecked', '');  
        list.append(strHtml);
      }
      defView.resolve();
    }); 
    return defView;
  },
  
  print: function()
  {
    var strText = PciApp.Measurement.getTableData();
    PciApp.print(strText); 
  },
  
  // liefert zur Form id die daten
  getTypData : function(par_iTyp)
  {
    switch(par_iTyp)
    {
      case '1':  return PciApp.Measurement.arTriangle;
        break;
      case '2':  return PciApp.Measurement.arRectangle;
      break;
      case '3':  return PciApp.Measurement.arCircle;
        break;
      case '4':  return PciApp.Measurement.arVolume;
        break;
      case '5':  return PciApp.Measurement.arReach;
        break;
      case '6':  return PciApp.Measurement.arParallelogramm;
        break;
      case '7':  return PciApp.Measurement.arSegment;
        break;
      case '8':  return PciApp.Measurement.arTrapez;
        break;
    }
  },
  
  getTableData: function()
  {
    var arAllData = PciApp.Measurement.getData(); 
    var strText = $.t('description')+':<br>'+ arAllData[0].replace('\n', '<br>')+'<br><br>';

    strText = strText +'<table style="border-spacing:0px;font-size:0.7em"><tr style="text-align:left">'+
      '<th>'+ $.t('typ')+ '</th>'+
      '<th>'+ $.t('name')+ '</th>'+
      '<th>'+ $.t('dimension')+'</th>'+
      '<th>'+ $.t('calculation')+'</th>'+
      '<th></th>'+
      '</tr>';
    for (var i=0; i < PciApp.Measurement.arMeasure.length; i++)
    {
      if (i % 2 == 0)
        var strColor = "lightgrey";
      else var strColor = "white";
        
      var arData = PciApp.Measurement.getTypData(PciApp.Measurement.arMeasure.item(i).Type);
      var arParam = [];
      var arDimension = ''
      for (var j=0; j < arData['arFields'].length;j++)
      {
        var arMeasure = PciApp.Measurement.arMeasure.item(i);

        arParam.push(arMeasure['Param'+(j+1)]);
        if (arMeasure['Param'+(j+1)] == '') continue;
        arDimension += arData['arFields'][j]+': '+ arMeasure['Param'+(j+1)]+ $.t('length_unit')+'<br>';
      }
        
      strText = strText + '<tr style="background-color:'+ strColor+';vertical-align:top">';
      strText = strText+'<td style="width:130px;">' + arData['strName']+'</td>';
      strText = strText+'<td style="width:200px;">' + PciApp.Measurement.arMeasure.item(i).Name+'</td>';
      strText = strText+'<td style="width:180px;">' + arDimension+'</td>';
      var arCalcu = PciApp.Measurement.calculateMeasure(PciApp.Measurement.arMeasure.item(i).Type, arParam);
      arCalcu = arCalcu.split(', ');
      strText = strText+'<td style="width:130px;">'+ arCalcu[0]+'</td>';
      strText = strText+'<td style="width:130px;">'+ arCalcu[1]+'</td></tr>';
    }
    strText = strText +'</table><br><br>';
    return strText;
  },
  
  
  sendEmail: function ()
  {
    var defFiles = PciApp.File.getDirEntries(PciApp.Measurement.strDir, PciApp.Measurement.MeasurementId+'_', true);
    defFiles.done(function(arEntries)
    {
      var arFiles = new Array();
      for (var i=0;i<arEntries.length; i++)
        arFiles.push(arEntries[i].fullPath);
      // email Adresse holen
      var defLoad = PciApp.Setup.load();
      defLoad.done(function()
      {
        var strText = PciApp.Measurement.getTableData();
        PciApp.sendEmail(PciApp.Setup.getValue('EmailAdress'), $.t('measurement'), strText, arFiles);
      });
    })
    
  },  
           
  set: function(par_iId)
  {
    if (par_iId === undefined)
      PciApp.Measurement.MeasurementId = PciApp.Measurement.iNewId;
    else PciApp.Measurement.MeasurementId = par_iId;
  },                 
  
  getData: function()
  {
    for (var index = 0; index < PciApp.Measurement.arMeasurements.length; index++) 
      if (PciApp.Measurement.arMeasurements.item(index).Id == PciApp.Measurement.MeasurementId)
       return new Array(PciApp.Measurement.arMeasurements.item(index).Description, 
        PciApp.Measurement.arMeasurements.item(index).bSend);
    return new Array("", "");  
    
  },
  
  // zeigt Aufmass hilfe an   
  show: function(par_iId)
  {
    PciApp.Measurement.bChange = false;
    PciApp.Measurement.iAttachmentSize = 0;       
    PciApp.Measurement.iMeasure = 0;
    $('div#measurement_details').find('#measurement_size_input').html('0 kB');
    
    
    PciApp.Measurement.set(par_iId);
    var defFiles = PciApp.File.getDirEntries(PciApp.Measurement.strDir, '_', false);
    defFiles.done(function(arEntries)
    {
      var defSaveFiles = $.Deferred();
      PciApp.Measurement.save_files(arEntries, false, null, defSaveFiles);      
      defSaveFiles.done(function()
      {
        var defLoad = PciApp.Measurement.loadMeasure();
        defLoad.done(function(){
          PciApp.showPage('#measurement_details');
          var arData = PciApp.Measurement.getData();
          $('#measurement_description_input').val(arData[0]).change(function(){PciApp.Measurement.bChange = true});
          if (arData[1] == '1')
            $('#measurement_bsend_input').attr("checked", true);
          else 
            $('#measurement_bsend_input').attr("checked", false);
          $('#measurement_bsend_input').checkboxradio("refresh").change(function(){PciApp.Measurement.bChange = true});
          $('div#measurement_details').find('div[id^="measurement_entry_"]').remove();
          PciApp.Measurement.loadImages();

          for (var i=0; i< PciApp.Measurement.arMeasure.length; i++)
            PciApp.Measurement.addMeasure(PciApp.Measurement.arMeasure.item(i).Type,
              PciApp.Measurement.arMeasure.item(i).Name, PciApp.Measurement.arMeasure.item(i).Param1, 
              PciApp.Measurement.arMeasure.item(i).Param2, PciApp.Measurement.arMeasure.item(i).Param3, 
              PciApp.Measurement.arMeasure.item(i).Param4, PciApp.Measurement.arMeasure.item(i).Param5, '0');
        });
      });
    });    
  },  
  
  // zeigt hinzufüge Dialog an
  showMeasurement: function(par_iType, par_strName, par_strParam1, par_strParam2, par_strParam3, par_strParam4,par_strParam5, par_strEditField)
  {
    $('div#measurement_add').find('#list_measure').css('display', '');
    $('div#measurement_add').find('#measure_cnt').css('display', 'none');
    $('div#measurement_add').find('div[id^="measure_entry"]').remove();
    if (par_iType != undefined)
      PciApp.Measurement.showMeasure(par_iType, par_strName, par_strParam1, par_strParam2, par_strParam3, par_strParam4, par_strParam5, par_strEditField);
    
    PciApp.showPage('#measurement_add');    
    
  },                

  // speichert daten ab
  save: function(par_bEmail)
  { 
    PciApp.Measurement.bChange = false;
    var bSend = 0;
    if (par_bEmail || $('#measurement_bsend_input').is(':checked')) bSend = 1;
    
    var arMeasure = [];
    var dom = $('div#measurement_details').find('div[id^="measurement_entry_"]').each(function(index)
    {
        arMeasure.push({name: $(this).find('#measure_entry_name').val(), 
          param1: $(this).find('#measure_entry_param1').val(), 
          param2: $(this).find('#measure_entry_param2').val(), 
          param3: $(this).find('#measure_entry_param3').val(), 
          param4: $(this).find('#measure_entry_param4').val(), 
          param5: $(this).find('#measure_entry_param5').val(), 
          type: $(this).find('#measure_entry_typ').val()}); 
    });
    
    var def = PciApp.Db.saveMeasurement(PciApp.Measurement.MeasurementId, 
      $('#measurement_description_input').val(), bSend, arMeasure);  
    def.done(function(par_iId)
    {
      var defFiles = PciApp.File.getDirEntries(PciApp.Measurement.strDir, PciApp.Measurement.MeasurementId+'_', false);
      defFiles.done(function(arEntries)
      {
        var defFilesSave = $.Deferred();
        PciApp.Measurement.save_files(arEntries, true, par_iId, defFilesSave);
        PciApp.Measurement.set(par_iId); 
        defFilesSave.done(function()
        {
          if (par_bEmail)
          {
            PciApp.Measurement.loadMeasure();
            PciApp.EmailAdress.strCaller = "measurement";
            PciApp.EmailAdress.overview();
          }
          else
          {  
            var defView = PciApp.Measurement.overview(true);
            defView.done(function()
            {
              $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
                .fadeIn(200).html('').append($.t('hint_project_save')).fadeOut(4000);      
              history.back();            
            });
          }
        });
      });    
    });
  },        

  cancel : function()
  {
    if (PciApp.Measurement.bChange)
      PciApp.Hint.show(13, '', function() {PciApp.Measurement.overview(true);});
    else PciApp.Measurement.overview(true);
    
  },
  
  // fügt Daten aus hinzufüge Dialog zur Materialliste details
  addMeasureToDetails : function()
  {
    var arData = PciApp.Measurement.getTypData($('div#measurement_add').find('#measure_type').val());
    var strError = '';
    for (var i=0; i<arData['arCheckInput'].length; i++)
    {
      if ($('div#measurement_add').find('#'+arData['arCheckInput'][i]).val() == '' )
      {
        if (arData['arCheckInput'][i] == 'measure_name_input') 
        {
          strError = $.t('hint_error_name');
        }  
        else 
        {
          strError = $.t('hint_error_measure'); 
        }
        break;
      }
      if (isNaN($('div#measurement_add').find('#'+arData['arCheckInput'][i]).val()) && arData['arCheckInput'][i] != 'measure_name_input')
      {
        strError = $.t('hint_error_measure');
        break;
      }
    }
    if (strError != '')
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append(strError).fadeOut(4000);      
      return;  
    }     
    // allg Auffüllen
    // Rechteck -> Quadrat
    if ($('div#measurement_add').find('#measure_type').val() == 2)
      if ($('div#measurement_add').find('#measure_entry_input_2').val() == '')
        $('div#measurement_add').find('#measure_entry_input_2').val($('div#measurement_add').find('#measure_entry_input_1').val());
      
    if ($('div#measurement_add').find('#measure_type').val() == 1)
      if ($('div#measurement_add').find('#measure_entry_input_2').val() == '')
      {
        $('div#measurement_add').find('#measure_entry_input_2').val($('div#measurement_add').find('#measure_entry_input_1').val());
        $('div#measurement_add').find('#measure_entry_input_3').val($('div#measurement_add').find('#measure_entry_input_1').val());
      } else if ($('div#measurement_add').find('#measure_entry_input_3').val() == '')
      {
        var a = parseInt($('div#measurement_add').find('#measure_entry_input_1').val());
        var b = parseInt($('div#measurement_add').find('#measure_entry_input_2').val());
        $('div#measurement_add').find('#measure_entry_input_3').val(Math.round(Math.sqrt(a*a+b*b)));
      }
    PciApp.Measurement.addMeasure(
      $('div#measurement_add').find('#measure_type').val(),
      $('div#measurement_add').find('#measure_name_input').val(),
      $('div#measurement_add').find('#measure_entry_input_1').val(), 
      $('div#measurement_add').find('#measure_entry_input_2').val(), 
      $('div#measurement_add').find('#measure_entry_input_3').val(),
      $('div#measurement_add').find('#measure_entry_input_4').val(),
      $('div#measurement_add').find('#measure_entry_input_5').val(),
      $('div#measurement_add').find('#measure_edit').val()
      );
      
    setTimeout(function(){history.back();},300);  
  },
  
  
  // zeigt bim hinzufügen Dialog Eingabefelder an
  showMeasure : function(par_iType, par_strName, par_strParam1, par_strParam2, par_strParam3, par_strParam4, par_strParam5, par_strEditField)
  {
    $('div#measurement_add').find('#list_measure').css('display', 'none');
    $('div#measurement_add').find('#measure_cnt').css('display', 'block');
    var arData = PciApp.Measurement.getTypData(par_iType);
    $('div#measurement_add').find('#measure_name_input').val(par_strName);
    $('div#measurement_add').find('h1').html(arData['strName']);
    $('div#measurement_add').find('#measure_label').html(arData['strDesc']);
    if (par_strEditField == undefined)
      $('div#measurement_add').find('#measure_edit').val('0');
    else 
      $('div#measurement_add').find('#measure_edit').val(par_strEditField);
    $('div#measurement_add').find('#measure_type').val(par_iType);
    $('div#measurement_add').find('#measure_img').attr('src', arData['strImgSrcBig']);
    
    var arFieldsDesc = ['I. ', 'II. ', 'III. ', 'IV. ', 'V. ']
    var arFieldsValues = [par_strParam1, par_strParam2, par_strParam3, par_strParam4, par_strParam5]
    for (var i=0; i<arData['arFields'].length; i++)
    {
      var strHtml = $('#measure_entry_cnt').html();
      strHtml = $(strHtml.replace(/measure_entry_input/g, 'measure_entry_input_'+(i+1)));
      strHtml.find('#measure_entry_label').html(arFieldsDesc[i]+ arData['arFields'][i]);
      strHtml.find('#measure_entry_input_'+(i+1)).val(arFieldsValues[i]);
      strHtml.find('#measure_entry_unit').html(' '+ $.t('length_unit'));
      $('div#measurement_add').find('#entry_cnt').append(strHtml).trigger('create');
    };
    
  },
    
  init : function()
  {
    PciApp.Measurement.arTriangle={
          strImgSrc: 'images/icon/dreieck.png',
          strImgSrcBig: 'images/icon/dreieck_big.png',
          strDesc: $.t('desc_measure_triangle'),
          strName: $.t('triangle'),
          arFields: [$.t('length')+' 1', $.t('length')+' 2', $.t('length')+' 3'],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1'],
    };
    PciApp.Measurement.arRectangle={
          strImgSrc: 'images/icon/rechteck.png',
          strImgSrcBig: 'images/icon/rechteck_big.png',
          strDesc: $.t('desc_measure_rectangle'),
          strName: $.t('rectangle'),
          arFields: [$.t('width'), $.t('height')],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1'],
    },      
    PciApp.Measurement.arCircle={
          strImgSrc: 'images/icon/kreis.png',
          strImgSrcBig: 'images/icon/kreis_big.png',
          strDesc: $.t('desc_measure_circle'),
          strName: $.t('circle'),
          arFields: [$.t('diameter')],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1']          
    },
    PciApp.Measurement.arVolume={
          strImgSrc: 'images/icon/volumen.png',
          strImgSrcBig: 'images/icon/volumen_big.png',
          strDesc: $.t('desc_measure_volume'),
          strName: $.t('volume'),
          arFields: [$.t('width'), $.t('height'), $.t('deep')],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1', 'measure_entry_input_2', 'measure_entry_input_3']          
    };    
    PciApp.Measurement.arReach={
          strImgSrc: 'images/icon/strecke.png',
          strImgSrcBig: 'images/icon/strecke_big.png',
          strDesc: $.t('desc_measure_reach'),
          strName: $.t('reach'),
          arFields: [$.t('length')],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1']          
    };    
    PciApp.Measurement.arParallelogramm={
          strImgSrc: 'images/icon/parallelogramm.png',
          strImgSrcBig: 'images/icon/parallelogramm_big.png',
          strDesc: $.t('desc_measure_parallelogramm'),
          strName: $.t('parallelogramm'),
          arFields: [$.t('length')+' 1', $.t('length')+' 2', $.t('height')],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1', 'measure_entry_input_2', 'measure_entry_input_3']          
    };    

    PciApp.Measurement.arSegment={
          strImgSrc: 'images/icon/segment.png',
          strImgSrcBig: 'images/icon/segment_big.png',
          strDesc: $.t('desc_measure_segment'),
          strName: $.t('segment'),
          arFields: [$.t('width'), $.t('height')],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1', 'measure_entry_input_2']          
    };    

    PciApp.Measurement.arTrapez={
          strImgSrc: 'images/icon/schiefeck.png',
          strImgSrcBig: 'images/icon/schiefeck_big.png',
          strDesc: $.t('desc_measure_square'),
          strName: $.t('square'),
          arFields: [$.t('length')+' 1', $.t('length')+' 2', $.t('length')+' 3',$.t('length')+' 4',$.t('diagonal')],
          arCheckInput: ['measure_name_input', 'measure_entry_input_1', 'measure_entry_input_2', 'measure_entry_input_3', 'measure_entry_input_4', 'measure_entry_input_5']          
    };    
    
    
    $('div#measurement_details').remove();
    $('div#measurement_add').remove();
    $('div#measurement').remove();
    
    var DefLoadMeas = PciApp.loadPage("pages/measurement.html");
    DefLoadMeas.done(function(data) {
      $('body').append(data); 
      $('div#measurement').find("#new").html($.t('measurement_new'));
      $('div#measurement').find('h1').html($.t('measurement'));
      $('div#measurement').find("#menu_list_pointer").html($('#menu_list').html());
    });

    var DefLoadMeas = PciApp.loadPage("pages/measurement_add.html");
    DefLoadMeas.done(function(data) {
      data = data.replace('!TRIANGLE!', $.t('triangle')).replace('!CIRCLE!', $.t('circle'))
        .replace('!RECTANGLE!', $.t('rectangle')).replace('!VOLUME!', $.t('volume'))
        .replace('!REACH!', $.t('reach')).replace('!PARALLELOGRAMM!', $.t('parallelogramm'))
        .replace('!SEGMENT!', $.t('segment')).replace('!TRAPEZ!', $.t('square'));
        
      $('body').append(data); 
      $('div#measurement_add').find('h1').html($.t('typ'));
      $('div#measurement_add').find("#save").html($.t('ready'));
      $('div#measurement_add').find("#cancel").html($.t('cancel'));
      $('div#measurement_add').find('#measure_name_label').html($.t('name'));
      
      
    });

    
    var DefLoadMeas2 = PciApp.loadPage("pages/measurement_details.html");
    DefLoadMeas2.done(function(data) {
      $('body').append(data); 
      $('div#measurement_details').find('h1').html($.t('measurement'));
      $('div#measurement_details').find("#measurement_description").html($.t('description')+ ':');
      $('div#measurement_details').find("#measurement_bsend").html($.t('project_bsend')+ ':');
      $('div#measurement_details').find("#send").html($.t('send'));
      $('div#measurement_details').find("#del").html($.t('del'));
      $('div#measurement_details').find("#save").html($.t('save'));
      $('div#measurement_details').find("#cancel").html($.t('cancel'));
      $('div#measurement_details').find('#measurement_entry_name').html($.t('name'));
      $('div#measurement_details').find('#measurement_entry_length').html($.t('length'));
      $('div#measurement_details').find('#measurement_entry_width').html($.t('width'));
      $('div#measurement_details').find('#measurement_entry_height').html($.t('height'));
      $('div#measurement_details').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#measurement_details').find("#measurement_size").html($.t('size_attachment')+ ':');      
      $('div#measurement_details').find("#make_photo").html($.t('photo'));
      $('div#measurement_details').find("#load_photo").html($.t('gallery'));
      
      
      $('div#measurement_details').find("#print").html($.t('print'));
      if (PciApp.bIsAndroid)
        $('div#measurement_details').find("#print_ios").css('display', 'none');        
      else $('div#measurement_details').find("#print_android").css('display', 'none');        
    });
    
  },
  
  del: function()
  {
    var def = PciApp.Db.delMeasurement(PciApp.Measurement.MeasurementId);  
    def.done(function()
    {
      var defFiles = PciApp.File.getDirEntries(PciApp.Measurement.strDir, PciApp.Measurement.MeasurementId+'_', false);
      defFiles.done(function(arEntries)
      {
        for (var i=0; i< arEntries.length; i++)
          arEntries[i].remove(); 
      
        $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
          .fadeIn(200).html('').append($.t('hint_project_del')).fadeOut(4000);      
        PciApp.Measurement.overview(true);          
      });  
    });
  }  
}      

PciApp.Merchant = {
  func_input: null,
  arShowMap: {},
  arRegionZip: [],
  strSelectedRegion: null,
  
  doInput : function()
  {
    clearTimeout(PciApp.Merchant.func_input);
    PciApp.Merchant.func_input = setTimeout(function(){PciApp.Merchant.findCity($('#searchBox_merchant').val());}, 800);
  },

  findCity: function(par_City)
  {
    $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
      .fadeIn(20).html('').append($.t('search_running'));     
  
    $('div#merchant').find('#city_list').empty();
    $('div#merchant').find('#merchant_result').html("");    
    var arZip = PciApp.Merchant.strSelectedRegion.split(',');
    
    var DefLoad = PciApp.Db.getGeoDb(par_City, arZip[1]);
    DefLoad.done(function(result)
    {
      for (var i = 0; i< result.length; i++)
      {
        if (i > 50) break;
        var strText = result.item(i).Plz + ' ' +result.item(i).Name;  
        if (result.item(i).Lon == '' || result.item(i).Lat == '' ) continue;
        var strValue = 'flLong='+ result.item(i).Lon+'&flLat='+result.item(i).Lat;
        var strAdd = '<option value="'+strValue+'">'+ strText+'</option>';
        if (i == 0)
          strAdd = '<option selected value="'+strValue+'">'+ strText+'</option>'; 
                 
        $('div#merchant').find('#city_list').append(strAdd);
      }  
      $('div#merchant').find('#city_list').selectmenu('refresh');
      $("#hint").fadeOut(1);
    });
  },
  
  search : function()
  {
    var cnt = $('div#merchant').find('#merchant_result').html("");
    var strCity = $('div#merchant').find('#city_list').val();
    var iDistance = $('div#merchant').find('#distance_list').val();
    if (strCity == '' || strCity === null) return;
    $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
      .fadeIn(20).html('').append($.t('hint_update_db'));     
    jQuery.getJSON(PciApp.strIndexUrl+'api_json=merchant&file='+PciApp.Setup.getValue('SearchIndex')+'&'+strCity+'&iDistance='+iDistance, function(result) 
    {
      var arData = eval(result);
      for (var i = 0; i < arData.length; i++)
      {
        var strText = '';
        var ImgSrc = '';
        if (arData[i].firma != '') strText += arData[i].firma+'<br>';
        if (arData[i].zusatz != '') strText += arData[i].zusatz+'<br>';
        if (arData[i].strasse != '') strText += arData[i].strasse+'<br>';
        if (arData[i].plz != '') strText += arData[i].plz+' '+arData[i].ort+'<br>';
        if (arData[i].tel != '') strText += $.t('phone')+': '+ PciApp.getCallLink(arData[i].tel)+'<br>';
        if (arData[i].fax != '') strText += $.t('fax')+': '+ arData[i].fax+'<br>';
        if (arData[i].url != '') strText += '<a href onclick="PciApp.openUrl(\''+arData[i].url+'\');">'+ arData[i].url+'</a><br>';
        if (arData[i].email != '') strText += '<a href onclick="PciApp.sendEmail(\''+arData[i].email+'\',\'\',\'\',[]);">'+ arData[i].email+'</a><br>';
        if (strText == '') continue;
        if (arData[i].logo != '')
          ImgSrc = '<img class="merchant_image" src="'+ PciApp.Setup.getValue('Domain')+ '/fileadmin/database/logo/'+arData[i].logo+'">';

        var strHtml = $('#merchant_list_entry').html();
        strHtml = strHtml.replace('!TEXT!', strText).replace('!IMG!', ImgSrc).replace('!MAPVIEW!', $.t('mapview'));
        var strName = '';
        if (arData[i].firma != '') strName += arData[i].firma+'<br>';
        if (arData[i].zusatz != '') strName += arData[i].zusatz;
        var strLink = 'PciApp.Merchant.showMap(\''+strCity+'\', \'' + arData[i].breitengrad+'\', \'' + arData[i].laengengrad+'\', \''+ strName +'\');';
        strHtml = strHtml.replace('!LINK!', strLink);
        strHtml = strHtml.replace('!CONTACT!', $.t('contact_add'));
        var strLink = 'PciApp.addContact(\''+arData[i].firma+' '+arData[i].zusatz+'\', \''+arData[i].tel+'\',\''+ arData[i].email+'\',\''+arData[i].url+'\', \''+arData[i].strasse+':'+arData[i].ort+':'+arData[i].plz+ '\');';
        strHtml = strHtml.replace('!LINK_CONTACT!', strLink);
        cnt.append(strHtml); 
        cnt.trigger("create");  
      }
      cnt.trigger("refresh");
      $("#hint").fadeOut(100);
    }).error(function(jqXHR, textStatus, errorThrown) {
     $("#hint").html("").fadeOut(100);
     PciApp.showHint($.t('hint_install_error')+ "Error " + errorThrown, false, true);});


  },
  
  showMap: function(par_strStartLoc, par_TargetLat, par_TargetLong, par_strName)
  {
    var arCoords = par_strStartLoc.split('&');
    var arCoordsLong = arCoords[0].split('=');
    var arCoordsLat = arCoords[1].split('=');
    $('div#maps').remove();
    var DefLoadCons = PciApp.loadPage("pages/maps.html");
    DefLoadCons.done(function(data) {
      $('body').append(data); 
      if (PciApp.bIsIOS)
      {
        $('div#maps').find('#google_map_cnt').append('<iframe src="pages/map.html" seamless id="iframeid" name="iframeid"></iframe>');
        var startTime = new Date().getTime();
        
         
        var inter = window.setInterval(function(){
          if (new Date().getTime() > startTime+5000) 
          {
            PciApp.showHint($.t('hint_install_error'), false, true);
            window.clearInterval(inter);
          } 
          if (iframeid.initialize != undefined)
          {
           iframeid.initialize({StartLong:arCoordsLong[1],StartLat:arCoordsLat[1], TargetLat:par_TargetLat,TargetLong:par_TargetLong,Name:par_strName, Name2:$.t('place')});
            window.clearInterval(inter);
          } 
        },100);
      }
      else
      {
        $('div#maps').find('#google_map_cnt').append('<div id="map_canvas"></div>');
        PciApp.Merchant.arShowMap = {StartLong:arCoordsLong[1],StartLat:arCoordsLat[1], TargetLat:par_TargetLat,TargetLong:par_TargetLong,Name:par_strName};
        if (window.google == undefined)
          $.getScript("http://maps.google.com/maps/api/js?sensor=true&async=2&callback=PciApp.Merchant.MapApiLoaded").done(function(script, textStatus)
            {});
        else 
          PciApp.Merchant.showGoogleMaps();
      } 
      PciApp.showPage('#maps');
   
    });
  },
  
  MapApiLoaded: function () 
  {
    PciApp.Merchant.showGoogleMaps();
  },  
  
  
  showGoogleMaps: function()
  {
    var arEntrys = [];
 
    arEntrys.push({pos:new google.maps.LatLng(PciApp.Merchant.arShowMap['StartLat'],PciApp.Merchant.arShowMap['StartLong']),name:$.t('place')});
    arEntrys.push({pos:new google.maps.LatLng(PciApp.Merchant.arShowMap['TargetLat'],PciApp.Merchant.arShowMap['TargetLong']),name:PciApp.Merchant.arShowMap['Name']});
    if (arEntrys.length == 0)
    {
      $('div#maps').find('#map_canvas').css('display','none');
      return;
    }
    $('div#maps').find('#map_canvas').css('display','inline-block');
    var myOptions = {
      disableDefaultUI: true,
      center: arEntrys[0]['pos'],
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map($('div#maps').find("#map_canvas")[0],
      myOptions);
      
    var bounds = new google.maps.LatLngBounds ();
    for (var i=0;i<arEntrys.length;i++)
    {
      var infowindow = new google.maps.InfoWindow();
      var marker = new google.maps.Marker({
        map: map,
        position: arEntrys[i]['pos']});
      bounds.extend (arEntrys[i]['pos']);
      
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent('<h2 style="color:black">'+ arEntrys[i]['name'] +'</h2>');
        infowindow.open(map, marker);
      }
      })(marker, i));
    } 
    if (arEntrys.length > 1)
      map.fitBounds (bounds);        
  }, 
    
  
  findZip : function()
  {
    var strZip = '';
    var strName = '';
    var strCountry = '';
    var onSuccess = function(par_fllat, par_fllong)
    {
      var DefSearch = PciApp.Db.searchLoc(par_fllat, par_fllong);
      DefSearch.done(function(result) {
        if (result.length == 1) 
        {
          var strZip = result.item(0).Plz;
          var strName = result.item(0).Name;
          strCountry = result.item(0).Land;
          var strValue = 'flLong='+ par_fllong+'&flLat='+par_fllat;
          strAdd = '<option selected value="'+strValue+'">'+ strZip + ' '+ strName+'</option>'; 
        }
        else strAdd = '<option selected value="">'+ $.t('hint_no_found')+'</option>';
        $('div#merchant').find('#city_list').append(strAdd);
        $('div#merchant').find('#city_list').selectmenu('refresh');
        $('#searchBox_merchant').val(strZip);
        for (var i = 0; i < PciApp.Merchant.arRegionZip.length; i++)
        {
          var arEntry = PciApp.Merchant.arRegionZip[i].split(',');
          if (arEntry[1] == strCountry)      
          {
            $('div#merchant').find('#region_list').val(PciApp.Merchant.arRegionZip[i]);
            break;
          }
        }
        $('div#merchant').find('#region_list').selectmenu('refresh');
        PciApp.Merchant.changeRegion();
        $("#hint").fadeOut(100);  
      });
    };
  
    if (PciApp.bPhonegap)
    {
      var options = {};
      options.enableHighAccuracy = true;
      options.timeout = 3000;
      options.maximumAge = 100000;
      navigator.geolocation.getCurrentPosition(function(position)
      {onSuccess(position.coords.latitude,position.coords.longitude);}, function(error){
        $("#hint").html($.t('hint_error_position')).fadeOut(4000);
        $('div#merchant').find('#region_list').selectmenu('refresh');
        PciApp.Merchant.changeRegion();
      }, options);

    }  
    else 
    {
      $("#hint").html($.t('hint_error_position')).fadeOut(4000);
      $('div#merchant').find('#region_list').selectmenu('refresh');
      PciApp.Merchant.changeRegion();

    }
    },
  
  changeRegion: function()
  {
    PciApp.Merchant.strSelectedRegion = $('div#merchant').find('#region_list').val();
    if ($('#searchBox_merchant').val() != '')  
      PciApp.Merchant.findCity($('#searchBox_merchant').val());
  },  
  
  
  overview: function ()
  {
    $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(20).html('').append($.t('locate'));     
    $('#searchBox_merchant').val('');
    $('div#merchant').find('#city_list').empty();
    $('div#merchant').find('#merchant_result').html("");    
    PciApp.Merchant.arRegionZip = PciApp.Setup.getValue('Zip').split('|');
    var arRegionNames = PciApp.Setup.getValue('RegionNames').split('|');
    if (PciApp.Merchant.arRegionZip.length <= 1)
      $('div#merchant').find('#region').css("display", "none");
    else $('div#merchant').find('#region').css("display", "block"); 
    
    $('div#merchant').find('#region_list').html("");
    for (var i = 0; i < PciApp.Merchant.arRegionZip.length; i++)
    {
      var arEntry = PciApp.Merchant.arRegionZip[i].split(',');
      var strAdd = '<option value="' + PciApp.Merchant.arRegionZip[i]+'">'+ arRegionNames[i]+'</option>';
      $('div#merchant').find('#region_list').append(strAdd);
    }
    
    PciApp.showPage('#merchant');
    $('div#merchant').find('#city_list').selectmenu("refresh");
    PciApp.Merchant.findZip();
  },  

  init : function()
  {
    $('div#merchant').remove();

    var DefLoadCons2 = PciApp.loadPage("pages/merchant.html");
    DefLoadCons2.done(function(data) {
      $('body').append(data); 
      $('div#merchant').find("#list_label").html($.t('region'));
      $('div#merchant').find("#searchBox_merchant").attr('placeholder', $.t('consultant_search_placeholder'));
      $('div#merchant').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#merchant').find('h1').html($.t('merchant_search'));
      $('div#merchant').find('#go').html($.t('search'));
      $('div#merchant').find('#distance_label').html($.t('distance')+':');
      $('div#merchant').find('#city_label').html($.t('location')+':');
      $('div#merchant').find('#distance_list').append('<option selected value="10">10 '+ $.t('km')+'</option>');
      $('div#merchant').find('#distance_list').append('<option value="20">20 '+ $.t('km')+'</option>');
      $('div#merchant').find('#distance_list').append('<option value="50">50 '+ $.t('km')+'</option>');
      $('div#merchant').find('#distance_list').append('<option value="100">100 '+ $.t('km')+'</option>');
    });
  },
}      

PciApp.Color = {
  strSearchParam : "color:",
  arSelectColor : [],
  arColor : [],
      
  getColorCode: function(par_strName)
  {
    if (par_strName == '') return false;
    var strName = par_strName;
    // Suchen läuft über '05 Name' oder 'RAL 7032 Name' kann sein das was davor steht das muss weg
    var arName = par_strName.split(' ');
    
    if (arName.length > 1)
      if (!isNaN(arName[0]) || arName[0].toLowerCase() == "ral")
        strName = arName.join(' ');
      else if (!isNaN(arName[1]) || arName[1].toLowerCase() == "ral")  
      {
        arName.shift();
        strName = arName.join(' ');
      }
  
    for (var i = 0; i< PciApp.Color.arColor.length; i++)
      if (PciApp.Color.arColor[i].search == strName)
        return new Array(PciApp.Color.arColor[i].hex, strName);
    
    return false;
  },    
  
  show: function(par_strTyp)
  {
    $('#color_images').html("");
    if (jQuery.inArray(par_strTyp, PciApp.Color.arSelectColor) >= 0)
      PciApp.Color.arSelectColor.splice( jQuery.inArray(par_strTyp, PciApp.Color.arSelectColor), 1 );
    else PciApp.Color.arSelectColor.push(par_strTyp);  
    for (var i = 0; i< PciApp.Color.arColor.length; i++)
    {
      var bFound = false
      for (var j= 0; j< PciApp.Color.arColor[i].typ.length; j++)
        if (jQuery.inArray(PciApp.Color.arColor[i].typ[j], PciApp.Color.arSelectColor) >= 0)
          bFound = true;
      if (bFound)    
        $('#color_images').append(
          '<a href="" onClick="PciApp.Color.showSearch(\''+PciApp.Color.arColor[i].search+'\')"><div class="color_entry">'+
          '<div id= "color_'+i+'" class="color_image" style="background-color:#'+ PciApp.Color.arColor[i].hex+'"></div>'+
          PciApp.Color.arColor[i].name+ '</div></a>');
    }
  },
      
  overview: function()
  {
    PciApp.Color.arSelectColor = [];
    PciApp.Color.show(1);  
    PciApp.showPage('#color');
    $('div#color').find('#searchColorBox').val('');
    $('div#color').find('#color_bsan').attr("checked", true).checkboxradio("refresh");
    $('div#color').find('#color_bcoating').attr("checked", false).checkboxradio("refresh");
    $('div#color').find('#color_images').trigger("refresh");
  },
 
  doSearch: function()
  {
    var strText = $('div#color').find('#searchColorBox').val();
    PciApp.Color.showSearch('%'+ strText + '%');
  },
  
  
  showSearch: function(par_strText, par_bHistoryBack)
  {
    $('div#search').find('#searchBox').val(PciApp.Color.strSearchParam + par_strText);
    var defLoad = PciApp.Product.doSearch();
    defLoad.done(function()
    {
      if (par_bHistoryBack) 
        history.go(PciApp.Product.history);
      else 
        PciApp.showPage('#search');
      $('body').scrollTop(0);
      $('div#search').find('#searchBox').val(PciApp.Color.strSearchParam + par_strText);
        
    });
  },
  
  init : function()
  {
    PciApp.Color.arColor = jQuery.parseJSON(PciApp.Setup.getValue('Color'));
    if (PciApp.Color.arColor === null) PciApp.Color.arColor = [];
    $('div#color').remove();       
    
    var DefLoadColor = PciApp.loadPage("pages/color.html");
    DefLoadColor.done(function(data) {
      $('body').append(data); 
      $('div#color').find("#searchColorBox").attr('placeholder', $.t('product_search_placeholder'));
      $('div#color').find('h1').html($.t('colorshade_search'));
      $('div#color').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#color').find("#color_bcoating_label").html($.t('coating'));
      $('div#color').find("#color_bsan_label").html($.t('sanitary'));
    });
  },
  
  
  
}      

PciApp.Product = {
  arEntrys : new Array(),
  arThumbs : new Array(),
  bDownloadThumb : false,
  arCat : new Array(),
  strSearchEanParam : 'EAN:',
  func_input : null,
  history: -1,
  
  showDocuments : function()
  {
    $('#prod_documents').trigger("create");
    PciApp.showPage('#prod_documents');          
  },
  
  getDocuments :function (par_arData, par_strPage)
  {
    var arTypes = [
      {strElm: 'tm', arDocs: par_arData.TechnicalDocs.split('|'), strTitle: 'TM ', strFolder: "technical"},
      {strElm: 'sdb', arDocs: par_arData.SafetyDocs.split('|'), strTitle: 'SDB ', strFolder: "safety"},
      {strElm: 'le', arDocs: par_arData.PerformDocs.split('|'), strTitle: 'LE ', strFolder: "perform"},
      {strElm: 'other', arDocs: par_arData.CertDocs.split('|'), strTitle: '', strFolder: "cert"}];
      
    for (var iI in arTypes)
    {    
      var strPage = par_strPage;
      var arType = arTypes[iI];
      if (arType.arDocs == '') arType.arDocs = [];      
      if (arType.strElm == 'other')
      {
        strPage = 'prod_documents';
        $('div#'+strPage).find('#download_' + arType.strElm).find('.link').remove();
        
      }  
      
      $('div#'+par_strPage).find('#download_' + arType.strElm).find('.link').remove();
      $('div#'+par_strPage).find('#download_' + arType.strElm).css('display', '');
      $('div#'+par_strPage).find('#details_' + arType.strElm).attr('onclick', '');      
      var dummy = $('div#'+strPage).find('#download_' + arType.strElm).find('.dummy_prod');
      
      if (arType.arDocs.length == 0) 
        $('div#'+par_strPage).find('#details_' + arType.strElm).css('display', 'none');
      else $('div#'+par_strPage).find('#details_' + arType.strElm).css('display', 'inline-block');
      
      if (arType.arDocs.length == 1) {
        var strDoc = arType.arDocs[0].split(':')[1];
        $('div#'+par_strPage).find('#details_' + arType.strElm).attr('onclick', 'loadFile("' + strDoc + '","' + arType.strFolder + '")');
      }
      else 
      {
        if (arType.strElm == 'other')
          $('div#'+par_strPage).find('#details_' + arType.strElm).attr('onclick', 'PciApp.Product.showDocuments();');
        else         
          $('div#'+par_strPage).find('#details_' + arType.strElm).attr('onclick', '$("div#'+par_strPage+'").find("#download_' + arType.strElm + '").toggle("display")');
      }
                  
      for (var j = 0; j < arType.arDocs.length; j++)
      {
        if (arType.arDocs[j] == '') continue;  
        var arDoc = arType.arDocs[j].split(':');
        var link = dummy.clone();
        link.removeClass().addClass('link');
        link.html(arType.strTitle + arDoc[0]);
        link.attr('onclick', 'loadFile("' + arDoc[1] + '","' + arType.strFolder + '")');
        $('div#'+strPage).find('#download_' + arType.strElm).append(link);
      }
    }
    
    var arVideos= [];
    if (par_arData.VideoDocs != '')
      arVideos = par_arData.VideoDocs.split('|');
    $('div#'+par_strPage).find('#details_video').empty();
    for (var j = 0; j < arVideos.length; j++)
    {
      var Url = PciApp.Setup.getValue('Doc');
      var strSrc = Url.substring(0,Url.length-4)+ 'm4v?' + arVideos[j].split(':')[1];
      if (PciApp.bIsAndroid)
      {
        var strCall = "PciApp.playVideo('"+ strSrc+"')";
        $('div#'+par_strPage).find('#details_video').append('<a href="#" onclick="'+ strCall+'">'+$.t('video')+ ': '+ arVideos[j].split(':')[0]+'</a><br><br>');
      }
      if (PciApp.bIsIOS)
      {
        var strCall = "PciApp.playVideo('video_"+j+"')";
        $('div#'+par_strPage).find('#details_video').append('<a href="#" onclick="'+ strCall+'">'+$.t('video')+ ': '+ arVideos[j].split(':')[0]+'</a><br>');
        $('div#'+par_strPage).find('#details_video').append('<video id="video_'+j+'" style="display:none" width="320" height="240" controls autobuffer><source src='+ strSrc +' type="video/mp4" /></video><br>');
      }
    }
    
  },
  
  overview: function()
  {
    $('#searchBox').val("");
    var defLoad = PciApp.Product.doSearch();
    defLoad.done(function()
    {
      PciApp.showPage('#search');  
    });
  },
  
  show : function (par_iId)
  {
    var defSearch = PciApp.Db.getProduct(par_iId);
    defSearch.done(function(par_arProduct)
    {
      var DefArt = PciApp.Db.getArticleToProduct(par_iId);
      DefArt.done(function(result)
      {
        var bSystem = par_arProduct.System;
        var strPage = 'prod_details';
        if (bSystem == "1")
          strPage = 'prod_system_details';

        $('div#'+strPage).find('#details_title').html(par_arProduct.Name.replace('\u00ae', '<sup>\u00ae</sup>'));
        $('div#'+strPage).find('#details_pre').html(par_arProduct.PreTitle);
        $('div#'+strPage).find('#details_name').html(par_arProduct.Name.replace('\u00ae', '<sup>\u00ae</sup>'));
        $('div#'+strPage).find('#details_post').html(par_arProduct.PostTitle);          
        if (par_arProduct.Hint != '')
        {
          $('div#'+strPage).find('#text_hint').html('<ul><li>'+par_arProduct.Hint+'</li></ul>');          
          $('div#'+strPage).find('#details_hint').css('display', 'block');
        }
        else
          $('div#'+strPage).find('#details_hint').css('display', 'none');
          
        if (par_arProduct.Characteristics == '')
          $('div#'+strPage).find('#details_characteristics').css('display', 'none');          
        else
        {
          $('div#'+strPage).find('#text_characteristics').html(par_arProduct.Characteristics);          
          $('div#'+strPage).find('#details_characteristics').css('display', 'block');
        }  
        
        if (par_arProduct.Appliance == '')
          $('div#'+strPage).find('#details_appliance').css('display', 'none');          
        else
        {
          $('div#'+strPage).find('#text_appliance').html(par_arProduct.Appliance);          
          $('div#'+strPage).find('#details_appliance').css('display', 'block');
        }  
        
        $('div#'+strPage).find('#details_information').html(par_arProduct.ProductInfo);
        $('div#'+strPage).find('#text_shippingform').html('');    

        if (bSystem == "1")
        {
          $('div#'+strPage).find('#details_shippingform').css('display', 'none');
          $('div#'+strPage).find('#details_system').css('display', 'block');
          $('div#'+strPage).find('#details_information').css('display', 'none');
          $('div#'+strPage).find('#text_system').html("");

          var arProducts = new Array();
          var arIds = new Array();
          var strLastNumber = '';
          if (par_arProduct.Systems != "")
          {
            var Obj = JSON.parse(par_arProduct.Systems);
            for (var key in Obj) {
              var i = 0;
              for (var key2 in Obj[key])
              {
                var strText = '';
                var strNumber = Obj[key][key2]['strNr'];
                if (Obj[key][key2]['strNr'] == "") continue;
                if (i == 0) strText = key;
                i++;
                if (strNumber == strLastNumber) strNumber = '';
                strLastNumber = Obj[key][key2]['strNr'];
                arProducts.push({iId:Obj[key][key2]['iId'], strText1:strText, strText2:strNumber});
                arIds.push(Obj[key][key2]['iId']); 
              }
            }
            var defSearch = PciApp.Db.getSystemsToProduct(arIds.join('|'));
            defSearch.done(function(par_arProducts)
            {
              var strText = '';
              for (var i=0;i < arProducts.length; i++)
              {
                var found = null;
                for(var j=0; j<par_arProducts.length; j++)
                  if (par_arProducts.item(j).Id == arProducts[i]['iId'])
                    found = par_arProducts.item(j);
                if (found == null) continue;
                strText+= '<tr><td>'+ arProducts[i]['strText1']+'</td>';
                if (arProducts[i]['strText2'] == '')
                  strText+= '<td></td>';
                else strText+= '<td class="number">'+ arProducts[i]['strText2']+'</td>';
                strText+= '<td><a href="" class="details_system_entry" onClick="PciApp.Product.history = -2; PciApp.Product.show('+found.Id+');">'+  found.Name.replace('\u00ae', '<sup>\u00ae</sup>')+'</a></td></tr>';
                                 
              }
              $('div#'+strPage).find('#text_system').append('<table>'+ strText +'</table>');
              
            });   
          }
        }
        else
        {
          $('div#'+strPage).find('#details_shippingform').css('display', 'block');
          $('div#'+strPage).find('#details_system').css('display', 'none');
          for (var i = 0; i < result.length; i++)
          {
            var strHtml = $('#article_entry').html();
            strHtml = strHtml.replace('call', 'PciApp.MaterialList.showAdd(\''+ par_iId +'\', \'' + par_arProduct.Name +
            '\', \''+result.item(i).Name+'\', \''+ result.item(i).EanNr +'\', 1, \''+ result.item(i).Color +'\')');
            var dom = $(strHtml);
            dom.find('#article_name').html(result.item(i).Name);
            dom.find('#article_number').html(
              $.t('articlenumber') + ': '+result.item(i).ArtNr+'<br>'+
              $.t('eannumber') + ': '+result.item(i).EanNr);
            var arColors = result.item(i).Color.split(", ");
            var arNewColor = new Array();
            for (var j = 0;j < arColors.length; j++)
            {
              var mixColor = PciApp.Color.getColorCode(arColors[j]);
              if (mixColor == false)
                arNewColor.push("<span class\"color\">"+arColors[j]+ "</span>");
              else
                arNewColor.push("<span class=\"color\"><a href=\"\" onClick=\"PciApp.Color.showSearch(\'" +
                  mixColor[1] + "\', true)\"><span class=\"color_sample\" style=\"background-color:#" +
                  mixColor[0] + "\">&nbsp;</span>"+arColors[j]+ "</a></span>");
            }
            if (arNewColor.length > 0)
              dom.find('#article_number').html(dom.find('#article_number').html()+'<br>'+$.t('colors') + ': '+
              arNewColor.join(', '));
            $('div#'+strPage).find('#text_shippingform').append(dom);
          }
        }
        $('div#'+strPage).find('#details_calc').css('display', 'none')
        
        if (bSystem == "0")
        {
          var defSearch = PciApp.Db.searchCalc(String(par_iId));
          defSearch.done(function(data)
          {
            if (data !== false) 
            {
              $('div#'+strPage).find('#details_calculater').attr('onClick', 'PciApp.UsageCalculater.overview(\''+ String(par_iId) + '\', \'' + par_arProduct.Name +'\')');
              $('div#'+strPage).find('#details_calc').css('display', '');
              $('div#'+strPage).find('#details_calc').trigger('create');
            }
          });
        }
        $('div#'+strPage).find('#details_img').attr('src', '');
        
        loadFile(par_arProduct.ImageUrl, 'images', true, 0, strPage)
        PciApp.Product.getDocuments(par_arProduct,strPage);

        $('#'+strPage+' .base').trigger("create");
        $('#'+strPage+' .details').trigger("create");    
        PciApp.showPage('#'+strPage);
      });
    });
  },

  doInput : function()
  {
    clearTimeout(PciApp.Product.func_input);
    PciApp.Product.func_input = setTimeout(function(){PciApp.Product.doSearch();}, 800);
    
  },
  

  doSearch : function (par_iOffset, par_iCatId)
  { 
    var defShow = $.Deferred();
    if (par_iOffset == null) par_iOffset = 0;
    var iCount = 50;
    PciApp.Product.bDownloadThumb = false;
    PciApp.Product.arThumbs = [];
    var strText = $('#searchBox').val();
    if (strText == '')
      if (par_iCatId == null)
        strText = 0;
      else strText = par_iCatId;  
    var list = $('#list');
    list.html("");
    
    var defFolder = $.Deferred();
    var dirImages = '';
    if (PciApp.bPhonegap)
    {
      var defFolder2 = PciApp.File.getDir('images');
      defFolder2.done(function(dir)
      {
        dirImages = dir.fullPath;
        defFolder.resolve();
      });
    } else defFolder.resolve();

    var defSearch = $.Deferred();  
    defFolder.done(function()
    {
      defSearch2 = PciApp.Db.searchProduct(strText.toString());
      defSearch2.done(function()
      {
        defSearch.resolve();
        
      });
    }) 
    
    defSearch.done(function()
    {
      defShow.resolve();

      for (var i = 0; i < PciApp.Product.arCat.length; i++)
      {
        var strHtml = $('#entry_cat').html();
        strHtml = strHtml.replace('name', PciApp.Product.arCat[i].Name);
        var iId;
        // oberste Eintrag ist immer übergeordnete Kategorie 
        if (i == 0 && strText != 0)
        {
          iId = PciApp.Product.arCat[i].ParentId;
          strHtml = strHtml.replace('catimage', 'src="images/up.png"');
        }
        else 
        {
          iId = PciApp.Product.arCat[i].Id; 
          strHtml = strHtml.replace('catimage', 'src="images/down.png"');
        }
        strHtml = strHtml.replace('0000', 'PciApp.Product.doSearch('+par_iOffset+', '+ iId+ ')');
        list.append(strHtml);
      }
      
      for (var index = par_iOffset; index < PciApp.Product.arEntrys.length; index++) 
      {  
        var strHtml = $('#entry_product').html();
        strHtml = strHtml.replace('name', PciApp.Product.arEntrys.item(index).Name);
        strHtml = strHtml.replace(/0000/g, 'PciApp.Product.show('+PciApp.Product.arEntrys.item(index).Id.toString()+')');
        strHtml = strHtml.replace('!ID!', PciApp.Product.arEntrys.item(index).Id);
        strHtml = strHtml.replace('!SOURCE!', PciApp.File.getDeviceName(dirImages)+'/'+getFileId(PciApp.Product.arEntrys.item(index).ImageUrl+'?'+Math.random(), 'images'));
        
        strHtml = strHtml.replace('!ERROR!', "jQuery(this).css('visibility', 'hidden'); downloadThumbNails("+index+");");
        
//        loadFile('"+PciApp.Product.arEntrys.item(index).ImageUrl+"', 'images', true, 0, 'search', '"+PciApp.Product.arEntrys.item(index).Id+"');");
        list.append(strHtml);
        
        
        if ((index + 1) == (par_iOffset + iCount)) break;
      };
      
      var strHtml = '<div data-role="controlgroup" data-type="horizontal" style="text-align:center;padding-top:1em">';
      
      var strMargin = "";
      if (par_iOffset > 0)
      {
        if ((par_iOffset + iCount - 1) < PciApp.Product.arEntrys.length) strMargin = ";margin-left:5%;";        
        else strMargin = ";margin-left:25%;";
        strHtml += '<a style="width:45%'+ strMargin + '" data-role="button" onClick="PciApp.Product.doSearch(' +
          (par_iOffset - iCount) + ', '+ par_iCatId+')">&lt; '+ $.t('back') +'</a>';
      }    
      if ((par_iOffset + iCount - 1) < PciApp.Product.arEntrys.length)
      {
        if (par_iOffset > 0) strMargin = "";
        else strMargin = ";margin-left:25%;";
        strHtml += '<a style="width:45%'+ strMargin + '" data-role="button" onClick="PciApp.Product.doSearch(' +
          (par_iOffset + iCount) + ', '+ par_iCatId+')">'+ $.t('next') +' &gt;</a>';
      }    
      strHtml += '</div>';
      list.append(strHtml);
      $('body').scrollTop(0);
      list.trigger('create');
    });
    return defShow;
  },                                                
  
  init: function()
  {
    $('div#search').remove();
    var DefLoadProduct = PciApp.loadPage("pages/product.html");
    DefLoadProduct.done(function(data) {
      $('body').append(data); 
      $('div#search').find("#searchBox").attr('placeholder', $.t('product_search_placeholder'));
      $('div#search').find('h1').html($.t('product search'));
      $('div#search').find("#menu_list_pointer").html($('#menu_list').html());
    });
    
    $('div#prod_documents').remove();
    $('div#prod_details').remove();
    $('div#prod_system_details').remove();
    var DefLoadProduct = PciApp.loadPage("pages/product_documents.html");
    DefLoadProduct.done(function(data) {
      $('body').append(data); 
      $('div#prod_documents').find("#cancel").html($.t('close'));
    });
    
    var DefLoadProduct2 = PciApp.loadPage("pages/product_details.html");
    DefLoadProduct2.done(function(data) {
      $('body').append(data); 
      data = data.replace('prod_details', 'prod_system_details');
      $('body').append(data); 

      $('div#prod_details').find("#label_characteristics").html($.t('product_properties'));
      $('div#prod_details').find("#label_appliance").html($.t('product_practicearea'));
      $('div#prod_details').find("#label_shippingform").html($.t('bundle'));
      $('div#prod_details').find("#label_download").html($.t('download') + ': ');
      $('div#prod_details').find("#label_system").html($.t('system_require'));
      $('div#prod_details').find("#label_hint").html($.t('hint'));
      $('div#prod_details').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#prod_details').find("#details_calculater").html($.t('calculater'));
      $('div#prod_details').find("#details_tm_label").html($.t('technical'));
      $('div#prod_details').find("#details_sdb_label").html($.t('safety'));
      $('div#prod_details').find("#details_le_label").html($.t('perform'));

      $('div#prod_system_details').find("#label_characteristics").html($.t('system_pros'));
      $('div#prod_system_details').find("#label_appliance").html($.t('product_practicearea'));
      $('div#prod_system_details').find("#label_shippingform").html($.t('bundle'));
      $('div#prod_system_details').find("#label_download").html($.t('download') + ': ');
      $('div#prod_system_details').find("#label_system").html($.t('system_require'));
      $('div#prod_system_details').find("#label_hint").html($.t('shortdesc'));
      $('div#prod_system_details').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#prod_system_details').find("#details_calculater").html($.t('calculater'));
      $('div#prod_system_details').find("#details_tm_label").html($.t('technical'));
      $('div#prod_system_details').find("#details_sdb_label").html($.t('safety'));
      $('div#prod_system_details').find("#details_le_label").html($.t('perform'));
    });
  },  
}

PciApp.Setup = {
  arSettings : new Array(),
  arCountrys : new Array(),
  iCountry : 0,
  iLang : 0,
  arSearchIndex : new Array(),
  
  load: function ()
  {
    var defLoad = $.Deferred();
    var defSearch = PciApp.Db.getSettings();
    defSearch.done(function(){
      defLoad.resolve()
    });
    return defLoad;
  },

  getValue: function (par_strKey)
  {
    for (var i=0; i<PciApp.Setup.arSettings.length; i++)
    {
      if (PciApp.Setup.arSettings.item(i).Key == par_strKey)
        return PciApp.Setup.arSettings.item(i).Value;
    }
    return '';
  },
  
  
  overview: function()
  {
    var strHtml = '<div class="title">Country / Land</div>';
    if (PciApp.Setup.checkConnection() != '') 
    {
      alert(PciApp.Setup.checkConnection());
      return; 
    }
    var defSetup = $.Deferred();
    PciApp.Db.getAppConfigData(defSetup);
    defSetup.done(function(par_arData)
    {
      PciApp.Setup.arCountrys = par_arData;      
      var iVisible = 0;
      for (var i = 0; i < PciApp.Setup.arCountrys.length; i++)
      {
         strHtml = strHtml + '<div id="setup_country_'+ i+'" style="vertical-align:middle" onClick="PciApp.Setup.selectLanguage('+ i +
         ')"><img src="'+PciApp.strIndexUrl+'api_json=getLangImage&flagname='+ PciApp.Setup.arCountrys[i]['strImage']+'">&nbsp;'+ PciApp.Setup.arCountrys[i]['strName'] +'</div>';     
         iVisible++;
      }
      
      if (iVisible > 1)
      {
        $('#setup_country').html("").append(strHtml);    
        $('#setup_language').css('display', 'none');
        $('#setup_country').height(iVisible*40+40);
      }
      else 
      {
        $('#setup_country').css('display', 'none');
        PciApp.Setup.selectLanguage(0); 
      }
        
      $('#setup_next').css('display', 'none');    
      var defSet = PciApp.Db.setSetting('LastUpdateTime', '0000-00-00');
      defSet.done(function()
      {
        PciApp.Setup.load();
      });
    });  
    
    PciApp.showPage('#setup');          
  },
  
  selectLanguage: function(par_iCountry)
  {
    PciApp.Setup.iCountry = par_iCountry;
    var defCountry = $.Deferred();
    PciApp.Setup.arSearchIndex = PciApp.Setup.arCountrys[par_iCountry];
      
    $('#setup_language').css('display', '');
    $('#setup_language').height(PciApp.Setup.arSearchIndex['arLang'].length*40+40);
    if ($('#setup_language').height() > $('#setup_country').height())
      $('#setup_country').height($('#setup_language').height());              
    else $('#setup_language').height($('#setup_country').height());                
      
    $('#setup_next').height($('#setup_country').height());

    $('#setup_next').css('display', 'none'); 
    $('#next').css('display', 'none');
    for (var i = 0; i < PciApp.Setup.arCountrys.length; i++)
      $('#setup_country_'+ i).removeClass('selected');
    
    $('#setup_country_'+ par_iCountry).addClass('selected');
        
    var strHtml = '<div class="title">Language / Sprache</div>';
    for (var i = 0; i < PciApp.Setup.arSearchIndex['arLang'].length; i++)
    {
      strHtml = strHtml + '<div id="setup_language_'+ i+
        '" style="vertical-align:middle" onClick="PciApp.Setup.selectNext('+ parseInt(i) +
        ')"><img src="'+PciApp.strIndexUrl+'api_json=getLangImage&flagname='+ PciApp.Setup.arSearchIndex['arLang'][i]['strImage']+
         '">&nbsp;'+ PciApp.Setup.arSearchIndex['arLang'][i]['strName'] +'</div>';     
    }
    $('#setup_language').html("").append(strHtml);    
    var position = $('#setup').find('#setup_language').position();
    $('body').scrollTop(position.top);
  },
  
  selectNext: function(par_iLang)
  {
    $('#setup_next').css('display', '');
    
    PciApp.Setup.iLang = par_iLang;
    for (var i = 0; i < PciApp.Setup.arSearchIndex['arLang'].length; i++)
      $('#setup_language_'+ i).removeClass('selected');
    $('#setup_language_'+ par_iLang).addClass('selected');
    $('#next').css('display', 'block');
    $.jsperanto.init(function () {$('div#setup').find('#next').html($.t('next'));}, 
      {dictionary: false, dicoPath: 'locales', lang: 'language_'+PciApp.Setup.arSearchIndex['arLang'][par_iLang]['strIsoCode'] , fallbackLang:"language_en"})    
    var position = $('#setup').find('#next').position();
    $('body').scrollTop(position.top);
  },
  
  save: function()
  {
    if (PciApp.Setup.checkConnection() != '') 
    {
      PciApp.showHint(PciApp.Setup.checkConnection(), false, true);
      return; 
    }
    PciApp.Db.setSetting('Size', '');
    PciApp.Db.setSetting('ConsultantVersion', '');
    PciApp.Db.setSetting('LastUpdateTime', '');
    PciApp.Db.setSetting('GeoDbVersion', '');
    PciApp.Db.setSetting('TechnicVersion', '');
    PciApp.Db.setSetting('LanguageVersion', '');
    PciApp.Db.setSetting('LogoVersion', '');
    PciApp.Db.setSetting('Color', '');
    PciApp.Db.setSetting('ColorVersion', '');
    PciApp.Db.setSetting('ImpressumVersion', '');
    PciApp.Db.setSetting('NewsVersion', '');
    PciApp.showHint($.t('hint_update_db'), false);
    var DefClean = $.Deferred();
    PciApp.Db.cleanSetupTables(DefClean);
    DefClean.done(function()
    {
      // Suchindex und Sprache setzen
      PciApp.Db.setSetting('Domain', PciApp.Setup.arSearchIndex['strDomain']);
      PciApp.Db.setSetting('Zip', PciApp.Setup.arSearchIndex['arZip']);
      var defSet1 = PciApp.Db.setSetting('SearchIndex', PciApp.Setup.arCountrys[PciApp.Setup.iCountry]['strSearchIndex']);
      defSet1.done(function()
      {
        PciApp.Db.setSetting('LangIsoCode', PciApp.Setup.arSearchIndex['arLang'][PciApp.Setup.iLang]['strIsoCode']);
        var defSet2 = PciApp.Db.setSetting('LangId', parseInt(PciApp.Setup.arSearchIndex['arLang'][PciApp.Setup.iLang]['id']));
        defSet2.done(function()
        {
          // daten laden
          var defLoadSet = PciApp.Setup.load();
          defLoadSet.done(function(){
            // update check
            // Ordner anlegen
            var defCreateFolder = $.Deferred();
            if (PciApp.bPhonegap)
            {
              defCreateNote = PciApp.File.getDir(PciApp.Note.strDir);
              defCreateNote.done(function()
              {
                defCreateProject = PciApp.File.getDir(PciApp.Project.strDir);
                defCreateProject.done(function()
                {
                  defCreateFolder.resolve();
                });
              });
            } else defCreateFolder.resolve();
            defCreateFolder.done(function()
            {
              var defCheckUpdate = $.Deferred();
              PciApp.Db.checkForUpdate(defCheckUpdate);
              defCheckUpdate.done(function(){
                // update durchfÃ¼hren
                var DefUpdate = $.Deferred();
                PciApp.Db.update(DefUpdate);
                DefUpdate.done(function()
                {                    
                  // update durchgefÃ¼hrt und neustart
                  var defSet3 = PciApp.Db.setSetting('SetupDone', '1');
                  defSet3.done(function()
                  {
                    var defLoadSet2 = PciApp.Setup.load();
                    defLoadSet2.done(function(){
                      PciApp.init();
                      }); 
                  });
                });
              });
            });
          })
        });
      });
    });
  },
  
  checkConnection: function() 
  {
    if (!PciApp.bPhonegap) return '';
    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) return $.t('hint_error_connection')+ '\n';
    return '';
  },

  getLangInfo: function(par_iId)
  {
    if (PciApp.Setup.getValue('LangIsoCode') != '') return {strIsoCode:PciApp.Setup.getValue('LangIsoCode')};
    switch(par_iId)
    {
      case 1: return {strIsoCode:'de'};
      case 2: return {strIsoCode:'en'};
      case 3: return {strIsoCode:'fr'};
      case 4: return {strIsoCode:'it'};
      case 9: return {strIsoCode:'nl'};
      case 22: return {strIsoCode:'fr'};
      default : return {strIsoCode:''};
    }
  },
  
  init: function()
  {
    var def = $.Deferred();
    $('div#setup').remove();
    
    $.ajax({
      url: "pages/setup.html",
      success: function (data) {
        if (PciApp.iTyp == 1)
          data = data.replace('PLACEHOLDER', '<img id="logo_background" src="images/background.png">');
        else data = data.replace('PLACEHOLDER', '');  
        $('body').append(data);
        def.resolve();
        $(window).resize();
      }, dataType: 'html'});
/*    if (PciApp.iTyp == 0)
      PciApp.Setup.arCountrys = [
      {strName : "Deutschland",  strSearchIndex : "Internet-Suchindex_PCI_D", strImage:'flag_de.png'},
      {strName : "Schweiz", strSearchIndex : "Internet-Suchindex_PCI_CH", strImage:'flag_ch.png'},
      {strName : "Österreich", strSearchIndex : "Internet-Suchindex_PCI_A", strImage:'flag_at.png'},
      {strName : "Niederlande", strSearchIndex : "Internet-Suchindex_PCI_NL", strImage:'flag_nl.png'},
      {strName : "France", strSearchIndex : "Internet-Searchindex_BASF_CC_France", strImage:'flag_fr.png'},
      ];
    if (PciApp.iTyp == 1)
      PciApp.Setup.arCountrys = [
      {strName : "FBT",  strSearchIndex : "Internet-Suchindex_PCI_FBT", strImage:'flag_de.png'}];
    if (PciApp.iTyp == 2)
      PciApp.Setup.arCountrys = [
      {strName : "", strSearchIndex : "", strImage:''},
      {strName : "Danmark", strSearchIndex : "Internet-Suchindex_PCI_DK", strImage:'flag_dk.jpg'},
      {strName : "Norge", strSearchIndex : "Internet-Suchindex_PCI_NO", strImage:'flag_no.jpg'},
      {strName : "Sverige", strSearchIndex : "Internet-Suchindex_PCI_SE", strImage:'flag_se.jpg'},
      {strName : "Ceská republika", strSearchIndex : "Internet-Suchindex_PCI_DK2", strImage:'flag_cz.jpg'},
      {strName : "Polska", strSearchIndex : "Suchindex_PCI_DK2", strImage:'flag_pl.jpg'},
      {strName : "Slovensko", strSearchIndex : "Suchindex_PCI_DK2", strImage:'flag_si.jpg'},
      ];*/
    return def;
  },
  
}


PciApp.Consultant = {
  arEntrys: new Array(),
  arZip: new Array(),
  arConsultant: [],
  func_input: null,
  arRegionZip: [],
  strSelectedRegion: null,
  
  doInput : function()
  {
    clearTimeout(PciApp.Consultant.func_input);
    PciApp.Consultant.func_input = setTimeout(function(){PciApp.Consultant.doSearch();}, 800);
    
  },

  
  doSearch: function ()
  {
    if (isNaN($('#searchBox_consultant').val().replace(' ', ''))) PciApp.Consultant.findCity($('#searchBox_consultant').val());
    else PciApp.Consultant.findConsultant($('#searchBox_consultant').val());
    
  },
  
  findCity: function(par_City)
  {
    var iFound = 0;
    var list = $('#list_consultant'); list.html("");
    var arZip = PciApp.Consultant.strSelectedRegion.split(',');
        
    var DefLoad = PciApp.Db.getGeoDb(par_City,arZip[1]);
    DefLoad.done(function(result)
    {
      for (var i = 0; i< result.length; i++)
      {
        iFound++;
        if (iFound > 50) break;
        var strHtml = $('#entry').html();
        var strText = result.item(i).Plz + ' ' +result.item(i).Name;  
        strHtml = strHtml.replace('name', strText);
        strHtml = strHtml.replace('0000', '$(\'#searchBox_consultant\').val(\''+result.item(i).Plz+'\');PciApp.Consultant.findConsultant(\''+ result.item(i).Plz+'\')');
        list.append(strHtml);
      }  
    });
  },

  findConsultant: function(par_Zip)
  {
    var arFound = [];

    var arZip = PciApp.Consultant.strSelectedRegion.split(',');
    if (par_Zip != '')
      for (var i = 0; i<PciApp.Consultant.arZip.length; i++)
      {
        if (PciApp.Consultant.arZip.item(i).FromZip.substring(0, par_Zip.length) <= par_Zip &&
          PciApp.Consultant.arZip.item(i).TillZip.substring(0, par_Zip.length) >= par_Zip && 
          arZip[0] == PciApp.Consultant.arZip.item(i).IsoCode.toLowerCase())  
          arFound.push(PciApp.Consultant.arZip.item(i).Id);
      }
    
    $('body').scrollTop(0);
  
    var defSearch = PciApp.Db.searchConsultant(PciApp.Db.unique(arFound).join(','));
    var list = $('#list_consultant'); list.html("");
    defSearch.done(function()
    {
      for (var index = 0; index < PciApp.Consultant.arEntrys.length; index++) 
      {
        var strHtml = $('#entry').html();
        var strText = PciApp.Consultant.arEntrys.item(index).LastName + ', '+ PciApp.Consultant.arEntrys.item(index).FirstName;  
        strHtml = strHtml.replace('name', strText);
        strHtml = strHtml.replace('0000', 'PciApp.Consultant.show('+PciApp.Consultant.arEntrys.item(index).Id.toString()+')');
        list.append(strHtml);
      }
    }); 
  },

  showGoogleMaps: function(par_strAdress, par_strName)
  {
    var arEntrys = [];
 
    var DefPos = $.Deferred();
    if (PciApp.bPhonegap)
      navigator.geolocation.getCurrentPosition(function(position)
      { 
        arEntrys.push({pos:new google.maps.LatLng(position.coords.latitude,position.coords.longitude),name:$.t('place')});
        DefPos.resolve();          
      }, function(error){DefPos.resolve();});
    else DefPos.resolve();
    
    var DefCons = $.Deferred(); 
    DefPos.done(function()
    {
      geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': par_strAdress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          arEntrys.push({pos:results[0].geometry.location,name:par_strName});
          DefCons.resolve();
        }
        else {
          DefCons.resolve();
        }
      }); 
    });
    
    DefCons.done(function()
    { 
      if (arEntrys.length == 0)
      {
        $('#map_canvas').css('display','none');
        return;
      }
      $('#map_canvas').css('display','inline-block');
      var myOptions = {
        zoom: 10,
        disableDefaultUI: true,
        center: arEntrys[0]['pos'],
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map($("div#map_canvas")[0],
        myOptions);
        
   
      var bounds = new google.maps.LatLngBounds ();
      for (var i=0;i<arEntrys.length;i++)
      {
        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
          map: map,
          position: arEntrys[i]['pos']});
        bounds.extend (arEntrys[i]['pos']);
        
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent('<h2 style="color:black">'+ arEntrys[i]['name'] +'</h2>');
          infowindow.open(map, marker);
        }
        })(marker, i));
      } 
      if (arEntrys.length > 1)
        map.fitBounds (bounds);        
    });           
  }, 
  
  findZip : function()
  {
    var strZip = '';
    var strCountry = '';
    var onSuccess = function(par_fllat, par_fllong)
    {
      var DefSearch = PciApp.Db.searchLoc(par_fllat, par_fllong);
      DefSearch.done(function(result) {
        if (result.length == 1) 
        {
          strZip = result.item(0).Plz;
          strCountry = result.item(0).Land;
        }  
      $('#searchBox_consultant').val(strZip);
      for (var i = 0; i < PciApp.Consultant.arRegionZip.length; i++)
      {
        var arEntry = PciApp.Consultant.arRegionZip[i].split(',');
        if (arEntry[1] == strCountry)      
        {
          $('div#consultant').find('#region_list').val(PciApp.Consultant.arRegionZip[i]);
          break;
        }
      }
      $('div#consultant').find('#region_list').selectmenu('refresh');
      PciApp.Consultant.changeRegion();
      $("#hint").fadeOut(100);
      });
    };
  
    if (PciApp.bPhonegap)
    {
      var options = {};
      options.enableHighAccuracy = true;
      options.timeout = 3000;
      options.maximumAge = 100000;
      navigator.geolocation.getCurrentPosition(function(position)
      {onSuccess(position.coords.latitude,position.coords.longitude);}, function(error){
        $("#hint").html($.t('hint_error_position')).fadeOut(4000);
        $('div#consultant').find('#region_list').selectmenu('refresh');
        PciApp.Consultant.changeRegion();
      }, options);
    }
    else 
    {
      $("#hint").html($.t('hint_error_position')).fadeOut(4000);  
      $('div#consultant').find('#region_list').selectmenu('refresh');
      PciApp.Consultant.changeRegion();
    }
  },
    
  changeRegion: function()
  {
    PciApp.Consultant.strSelectedRegion = $('div#consultant').find('#region_list').val();
    PciApp.Consultant.doSearch();
  },  
    
  overview: function ()
  {
    $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(20).html('').append($.t('locate'));     
    $('#searchBox_consultant').val('');
    $('#list_consultant').html("");
    PciApp.Consultant.arRegionZip = PciApp.Setup.getValue('Zip').split('|');
    var arRegionNames = PciApp.Setup.getValue('RegionNames').split('|');
    if (PciApp.Consultant.arRegionZip.length <= 1)
      $('div#consultant').find('#region').css("display", "none");
    else $('div#consultant').find('#region').css("display", "block");
    $('div#consultant').find('#region_list').html("");
    for (var i = 0; i < PciApp.Consultant.arRegionZip.length; i++)
    {
      var arEntry = PciApp.Consultant.arRegionZip[i].split(',');
      var strAdd = '<option value="' + PciApp.Consultant.arRegionZip[i]+'">'+ arRegionNames[i]+'</option>';
      $('div#consultant').find('#region_list').append(strAdd);
    }
    
    PciApp.showPage('#consultant');
    var defSearchZip = PciApp.Db.searchZip();
    defSearchZip.done(function()
    {
      PciApp.Consultant.findZip();
    });
  },  

  getTyp: function(par_strTyp)
  {
    var arConsTyp = par_strTyp.split(',');
    var arConsNames = PciApp.Setup.getValue('arConsultantNames').split('|');
    var arGeneralConsTpys = PciApp.Setup.getValue('arConsultantIds').split('|');

    for (var i=0; i< arConsTyp.length; i++)
    {
      var iIndex = jQuery.inArray(arConsTyp[i], arGeneralConsTpys);
      if (iIndex >= 0)
        return arConsNames[iIndex];
    }
    return '';
  },

  
  show: function(par_iId)
  {
    PciApp.Consultant.arConsultant = [];
    for (var index = 0; index < PciApp.Consultant.arEntrys.length; index++) 
    {
      if (PciApp.Consultant.arEntrys.item(index).Id == par_iId)
      {
        PciApp.Consultant.arConsultant = PciApp.Consultant.arEntrys.item(index);
        $('div#consultant_details').find('#consultant_infos').html('<b>'+PciApp.Consultant.getTyp(PciApp.Consultant.arEntrys.item(index).Typs)+'</b><br>'+
          PciApp.Consultant.arEntrys.item(index).FirstName+ ' '+ PciApp.Consultant.arEntrys.item(index).LastName+ '<br>'+
          $.t('fax')+': '+ PciApp.Consultant.arEntrys.item(index).Fax+ '<br>'+
          $.t('mobil')+': '+ PciApp.getCallLink(PciApp.Consultant.arEntrys.item(index).Mobil)+ '<br>'+
          $.t('email')+': <a href="" onclick="PciApp.sendEmail(\''+ PciApp.Consultant.arEntrys.item(index).Email+'\',\'\',\'\',[]);">'+ PciApp.Consultant.arEntrys.item(index).Email+ '</a>').trigger("create");
        if (PciApp.Consultant.arEntrys.item(index).Image == "")  
          $('div#consultant_details').find('#consultant_image').css('display', 'none');
        else
        {
          $('div#consultant_details').find('#consultant_image').css('display', 'block');
          $('div#consultant_details').find('#consultant_image').attr('src', PciApp.Consultant.arEntrys.item(index).Image).trigger("create");
        }
        var arContact = {
          strName:PciApp.Consultant.arEntrys.item(index).LastName+';'+PciApp.Consultant.arEntrys.item(index).FirstName, 
          strPhone:PciApp.Consultant.arEntrys.item(index).Mobil, 
          strEmail:PciApp.Consultant.arEntrys.item(index).Email};
        
        $('div#consultant_details').find('#addContact').unbind('click');
        $('div#consultant_details').find('#addContact').click(function(){PciApp.addContact(PciApp.Consultant.arEntrys.item(index).LastName+';'+PciApp.Consultant.arEntrys.item(index).FirstName, PciApp.Consultant.arEntrys.item(index).Mobil, PciApp.Consultant.arEntrys.item(index).Email)});
        break;  
      } 
    }
 
    PciApp.showPage('#consultant_details');
    
  },                  

  sendEmail : function(par_strReceiver)
  {
    PciApp.sendEmail(par_strReceiver, "", "", []);
  },
  
  init : function()
  {
    $('div#consultant').remove();
    $('div#consultant_details').remove();
    
    var DefLoadCons = PciApp.loadPage("pages/consultant_details.html");
    DefLoadCons.done(function(data) {
      $('body').append(data); 
      $('div#consultant_details').find('h1').html($.t('consultant'));
      $('div#consultant_details').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#consultant_details').find("#addContact").html($.t('contact_add'));
    });

    var DefLoadCons2 = PciApp.loadPage("pages/consultant.html");
    DefLoadCons2.done(function(data) {
      $('body').append(data); 
      $('div#consultant').find("#list_label").html($.t('region'));
      $('div#consultant').find("#searchBox_consultant").attr('placeholder', $.t('consultant_search_placeholder'));
      $('div#consultant').find('h1').html($.t('consultant_search'));
      $('div#consultant').find("#menu_list_pointer").html($('#menu_list').html());
    });
  },
}      

PciApp.MaterialList = {
  iLastList: 0,
  bChange: false,
       
  showAdd: function(par_strProductId, par_strProduct, par_strArticle, par_strArticleEAN, par_iCount, par_strColor)
  {
    var DefLoadColor = PciApp.Db.searchArticleColorByName(par_strProductId, par_strArticle);
    DefLoadColor.done(function(resultColor)
    {
      var DefLoadList = PciApp.Db.getAllMaterialList();
      DefLoadList.done(function(resultList)
      {
        if (par_iCount < 1) par_iCount = 1;
        $('div#materiallist_add').find('#color_list').empty();
        $('div#materiallist_add').find('#mat_list').empty();
        $('div#materiallist_add').find('#product').html(par_strProduct.replace('\u00ae', '<sup>\u00ae</sup>'));
        $('div#materiallist_add').find('#article').html(par_strArticle);
        $('div#materiallist_add').find('#count').val(par_iCount);
        $('div#materiallist_add').find('#materiallist_name').val('');
        var strAdd = '';
        if (resultColor.length > 1)
          $('div#materiallist_add').find('#color').css('display', 'block');
        else $('div#materiallist_add').find('#color').css('display', 'none');
        
        for (var i = 0; i < resultColor.length; i++)
        {
          var strValue = 
          strAdd = '<option value="' + resultColor.item(i).EanNr+'">'+ resultColor.item(i).Color+'</option>';
          if (resultColor.item(i).Color.indexOf(par_strColor) >= 0) strAdd = '<option selected value="' + resultColor.item(i).EanNr+'">'+ resultColor.item(i).Color+'</option>'; 
          $('div#materiallist_add').find('#color_list').append(strAdd);
        }
        
        var bFoundList = false;
        for (var i = 0; i < resultList.length; i++)
        {
          if ($.t('new_list') == resultList.item(i).Name) bFoundList = true;
          strAdd = '<option value="' + resultList.item(i).Id+'">'+ resultList.item(i).Name+'</option>';
          if (resultList.item(i).Id == PciApp.MaterialList.iLastList) 
            strAdd = '<option selected value="' + resultList.item(i).Id+'">'+ resultList.item(i).Name+'</option>'; 
          $('div#materiallist_add').find('#mat_list').append(strAdd);
        }
        
        // hinzufügen der neuen Liste
        if (!bFoundList)
        {
          if (PciApp.MaterialList.iLastList > 0)
            $('div#materiallist_add').find('#mat_list').append('<option value="new">'+ $.t('new_list')+'</option>');
          else $('div#materiallist_add').find('#mat_list').append('<option selected value="new">'+ $.t('new_list')+'</option>');
        }
        $('div#materiallist_add').find('#mat_name').css('display', 'none');
        $('div#materiallist_add').find('#add_article').css('display', 'block');
        PciApp.showPage('#materiallist_add'); 
        $('div#materiallist_add').find('#color_list').selectmenu('refresh');
        $('div#materiallist_add').find('#mat_list').selectmenu('refresh');
      });
    });
  },
  
  saveName: function()
  {
    if ($('div#materiallist_add').find('#materiallist_name').val() != '' &&  $('div#materiallist_add').find('#materiallist_name').val() != $.t('new_list'))
    {
      PciApp.MaterialList.add($('div#materiallist_add').find('#materiallist_name').val());
    }
    else $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
     .fadeIn(200).html('').append($.t('hint_error_name')).fadeOut(1000);      
  },
  
  cancelName:function()
  {
    $('div#materiallist_add').find('#mat_name').css('display', 'none');
    $('div#materiallist_add').find('#add_article').css('display', 'block');
  },
  
  add: function(par_strName)
  {
    var iCount = $('div#materiallist_add').find('#count').val();
    // wenn eingabe ungültig
    if (isNaN(iCount) || iCount == 0)
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(20).html('').append($.t('hint_error_numer')).fadeOut(4000);      
      return;      
    } 
    else iCount = parseInt(iCount);
    
    var strName = par_strName;
    if (strName == '') strName = $('div#materiallist_add').find('#mat_list option:selected').html();
    if (strName == $.t('new_list'))
    {
      $('div#materiallist_add').find('#mat_name').css('display', 'block');
      $('div#materiallist_add').find('#add_article').css('display', 'none');
      return;
    }
    
    PciApp.MaterialList.iLastList = $('div#materiallist_add').find('#mat_list').val();
    var iEanNr = $('div#materiallist_add').find('#color_list').val();
    var DefLoad = $.Deferred();
    
    PciApp.Db.getMaterialList(PciApp.MaterialList.iLastList, DefLoad);
    DefLoad.done(function(result)
    {
      bFound = false;
      var arArticle = [];
      if (result.length > 0)
        if (result.item(0).Article != '') arArticle = result.item(0).Article.split('|');
        
      for (var i = 0; i < arArticle.length; i++)
      {
        var arInfo = arArticle[i].split(';');
        if (arInfo[0] != iEanNr) continue;
        if (arInfo[3] == 1) continue;
        arInfo[2] = parseInt(arInfo[2]) + iCount;
        arArticle[i] = arInfo.join(';');
        bFound = true;
        break;
      }
      if (!bFound) 
      {
        var strDesc = $('div#materiallist_add').find('#product').html()+
          ' ' + $('div#materiallist_add').find('#color_list option:selected').html() +
          ' ' + $('div#materiallist_add').find('#article').html();
        arArticle.push([iEanNr+';'+ strDesc +';'+ iCount +';0']);          
      }
      
      var DefSave = PciApp.Db.saveMaterialList(PciApp.MaterialList.iLastList, arArticle.join('|'), strName, '');
      DefSave.done(function(par_iLast)
      {
        PciApp.MaterialList.iLastList = par_iLast;
        $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
          .fadeIn(20).html('').append($.t('articel_added')).fadeOut(4000);      
        PciApp.MaterialList.overview(true);  
        history.back();
      });
    });
  },
  
  decreaseCount: function()
  {
    if ($('div#materiallist_add').find('#count').val() == "") $('div#materiallist_add').find('#count').val(1);
    else if (parseInt($('div#materiallist_add').find('#count').val()) > 1)
      $('div#materiallist_add').find('#count').val(parseInt($('div#materiallist_add').find('#count').val())-1);    
  }, 

  increaseCount: function()
  {
    if ($('div#materiallist_add').find('#count').val() == "") $('div#materiallist_add').find('#count').val(1);
    else $('div#materiallist_add').find('#count').val(parseInt($('div#materiallist_add').find('#count').val())+1);    
  }, 
  
  print: function()
  {
    var DefLoad = $.Deferred();
    PciApp.MaterialList.getTableData(DefLoad);
    DefLoad.done(function(result)
    {
      PciApp.print(result);
    });
  },
  
  getTableData: function(par_Def)
  {
    var strText = '';
    var DefLoadData = $.Deferred();
    PciApp.Db.getMaterialList($('div#materiallist').find('#mat_list').val(), DefLoadData);
    DefLoadData.done(function(result)
    {
      for (var j=0; j < result.length; j++)
      {
        strText = strText+$.t('materiallist')+' : '+ result.item(j).Name+'<br>';
        strText = strText+$.t('note')+' : '+ result.item(j).Note+'<br><br>';
        if (result.item(j).Article == '') continue;
        strText = strText +'<table style="border-spacing:0px;font-size:0.7em"><tr><th>'+ $.t('count')+ '</th><th>'+ $.t('name')+ '</th><th>'+ $.t('eannumber')+'</th><th>'+ $.t('bought')+'</th></tr>';
        var arArticle = result.item(j).Article.split('|');
        for (var i = 0; i < arArticle.length; i++)
        {
          if (i % 2 == 0)
            var strColor = "lightgrey";
          else var strColor = "white";
          
          var arInfo = arArticle[i].split(';');
          strText = strText + '<tr style="background-color:'+ strColor+'">';
          strText = strText+'<td style="text-align:center;width:100px;">' + arInfo[2]+'</td>';
          strText = strText+'<td style="width:300px">' + arInfo[1]+'</td>';
          strText = strText+'<td style="width:150px;text-align:center;">' + arInfo[0]+'</td>';
          if (arInfo[3] == "1")
            strText = strText+'<td style="width:100px;text-align:center;">X</td></tr>';
          else  
            strText = strText+'<td style="width:100px;text-align:center;"></td></tr>';
          
        }
        strText = strText +'</table><br><br>';
      }
      par_Def.resolve(strText);
    });
  },
  
  sendEmail: function ()
  {
    var DefLoad = $.Deferred();
    PciApp.MaterialList.getTableData(DefLoad);
    DefLoad.done(function(result)
    {
      var defLoadSetup = PciApp.Setup.load();
      defLoadSetup.done(function()
      {
        PciApp.sendEmail(PciApp.Setup.getValue('EmailAdress'), $.t('materiallist'), result, []);
      });
    });
  },  
  
  save:function(par_iCall)
  {   
    if ($('div#materiallist').find('#list_name_input').val() == $.t('new_list'))
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('hint_error_list')).fadeOut(4000);      
      return;
    }

    
    var iLastList = null;
    var arArticle = [];
    var iList = null;
    var bCorrect = true;
    var dom = $('div#materiallist').find('div[id^="mat_list_entry"]').each(function(index)
    { 
      if (!bCorrect) return;
      var entry = $(this);
      iList = entry.attr('id').split('_').pop();
      if (iLastList == null) iLastList = iList;
      // wenn liste sich ändert die letzte speichern
      if (iList != iLastList) 
      {
        PciApp.Db.saveMaterialList(iLastList, arArticle.join('|'));
        arArticle = [];
        iLastList = iList;
      }  
      var bSend = 0;
      // wenn ungültiger Eintrag
      if (isNaN(entry.find('.list_entry_count').val()))
        bCorrect = false;
      
      if (entry.find('.list_entry_bought').is(':checked')) bSend = 1;      
      if (entry.find('.list_entry_count').val() > 0) 
        arArticle.push([entry.find('.list_entry_ean').html().replace($.t('eannumber')+' : ', '')+';'+ 
          entry.find('.list_entry_name').html() +';'+ 
          entry.find('.list_entry_count').val() +';'+ bSend]);
    });     
    if (!bCorrect)
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('hint_error_numer')).fadeOut(4000);      
      PciApp.MaterialList.overview();
      return;
    }
    
    if (PciApp.MaterialList.iLastList == null || PciApp.MaterialList.iLastList == 'all')
      var DefSave = PciApp.Db.saveMaterialList(iLastList, arArticle.join('|'));
    else  
      var DefSave = PciApp.Db.saveMaterialList(PciApp.MaterialList.iLastList, arArticle.join('|'), $('div#materiallist').find('#list_name_input').val(), $('div#materiallist').find('#list_notiz').val());

    DefSave.done(function(par_iList)
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('hint_project_save')).fadeOut(4000);      
      PciApp.MaterialList.bChange = false;
      PciApp.MaterialList.iLastList = par_iList;
      switch(par_iCall)
      {
        case 2:
          PciApp.Product.overview();
          break;
        case 1:
          PciApp.EmailAdress.strCaller = "list";
          PciApp.EmailAdress.overview();
          break;
        case 0:  
          PciApp.MaterialList.overview();
          break;
      }
    });      
  },
  
  del: function()
  {
    var def = PciApp.Db.delMaterialList(PciApp.MaterialList.iLastList);  
    def.done(function()
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('hint_project_del')).fadeOut(4000);      
      PciApp.MaterialList.overview();          
    });
  },  
  
  showList: function()
  {
    var bShowAll  = $('div#materiallist').find('#list_bought').is(':checked');
    PciApp.MaterialList.iLastList = $('div#materiallist').find('#mat_list').val();
    
    $('div#materiallist').find('#list_name_input').val($('div#materiallist').find('#mat_list option:selected').html()).change(function(){PciApp.MaterialList.bChange = true});
    $('div#materiallist').find('#buttons').css("display", "block");
    $('div#materiallist').find('#list_notiz_field').css("display", "block");
    $('div#materiallist').find('#product_add').css("display", "block");
    $('div#materiallist').find('#list_name_input').removeAttr('disabled');
    if (PciApp.MaterialList.iLastList == null || PciApp.MaterialList.iLastList == 'all')
    {
      $('div#materiallist').find('#buttons').css("display", "none");
      $('div#materiallist').find('#list_name_input').attr("disabled", "disabled");
      $('div#materiallist').find('#list_notiz_field').css("display", "none");
      if (PciApp.MaterialList.iLastList == null) return;
    }              

    var DefLoadList = $.Deferred();
    $('div#materiallist').find('#article_table').html("");
    $('div#materiallist').find('#list_notiz').val("");
    // gibts nochma im resize en aufruf
    var iWidth = ($(window).width()-190)/$(window).width()*100;
    $('div#materiallist').find('#article_entry_name').parent().css('width', iWidth+'%');
    
    PciApp.Db.getMaterialList(PciApp.MaterialList.iLastList, DefLoadList);
    DefLoadList.done(function(result)
    {
      for (var j=0; j < result.length; j++)
      {
        $('div#materiallist').find('#list_notiz').val(result.item(j).Note).change(function(){PciApp.MaterialList.bChange = true});        
        if (result.item(j).Article == '') continue;
        var arArticle = result.item(j).Article.split('|');
        for (var i = 0; i < arArticle.length; i++)
        {
          var arInfo = arArticle[i].split(';');
          var strHtml = $('#mat_list_entrys').html().replace("mat_list_entry", "mat_list_entry_" +result.item(j).Id);
          var dom = $(strHtml);
          dom.find('.list_entry_count').val(arInfo[2]).change(function(){PciApp.MaterialList.bChange = true}); 
          dom.find('.list_entry_name').html(arInfo[1]);
          dom.find('.list_entry_name').parent().css('width', iWidth+'%');
          dom.find('.list_entry_ean').html($.t('eannumber')+' : '+ arInfo[0]);
          dom.find('.list_entry_bought').change(function(){PciApp.MaterialList.bChange = true});
          if (arInfo[3] == 1)
          {
            dom.find('.list_entry_bought').attr("checked", true).attr('disabled','disabled');
            dom.find('.list_entry_count').attr('disabled', 'disabled');
          }
          if (!bShowAll && arInfo[3] == 1)
            dom.css("display", "none");
          $('div#materiallist').find("#article_table").append(dom); 
        }
      }
      $('div#materiallist').find("#article_table").trigger("create"); 
      $('div#materiallist').find('.list_entry_bought').parent().find('label').removeClass('ui-btn-corner-all').trigger("create");
    });
  },
  
  cancel: function()
  {
    if (PciApp.MaterialList.bChange)
      PciApp.Hint.show(13, '', function(){setTimeout(function(){history.back();}, 100);});
    else history.back();
  },
  
  overview: function (par_bBack)
  {
    PciApp.MaterialList.bChange = false;
    $('div#materiallist').find('#mat_list').html("");
    var DefLoadList = PciApp.Db.getAllMaterialList();
    DefLoadList.done(function(resultList)
    {
      $('div#materiallist').find('#mat_list').append('<option value="all">'+ $.t('all_lists')+'</option>');
      $('div#materiallist').find('#mat_list').append('<option value="new">'+ $.t('new_list')+'</option>');
      for (var i = 0; i < resultList.length; i++)
      {
        strAdd = '<option value="' + resultList.item(i).Id+'">'+ resultList.item(i).Name+'</option>';
        if (resultList.item(i).Id == PciApp.MaterialList.iLastList) 
          strAdd = '<option selected value="' + resultList.item(i).Id+'">'+ resultList.item(i).Name+'</option>'; 
        $('div#materiallist').find('#mat_list').append(strAdd);
      }  
      if (!par_bBack) PciApp.showPage('#materiallist');
      $('div#materiallist').find('#mat_list').selectmenu('refresh');
      PciApp.MaterialList.showList();
      $('div#materiallist').find('#list_bought').parent().find('label').removeClass('ui-corner-bottom').removeClass('ui-corner-top').trigger("create");
    });  
  },
  
  init : function()
  {
    $('div#materiallist_add').remove();
    $('div#materiallist').remove();
    
    var DefLoadMat = PciApp.loadPage("pages/materiallist.html");
    DefLoadMat.done(function(data) {
      $('body').append(data); 
      $('div#materiallist').find('h1').html($.t('materiallists'));
      $('div#materiallist').find('#list_name').html($.t('name')+ ':');
      $('div#materiallist').find("#save").html($.t('save'));
      $('div#materiallist').find("#send").html($.t('send'));
      $('div#materiallist').find("#cancel").html($.t('cancel'));
      $('div#materiallist').find("#article_entry_name").html($.t('name'));
      $('div#materiallist').find("#article_entry_count").html($.t('count'));
      $('div#materiallist').find("#article_entry_buy").html($.t('bought'));
      $('div#materiallist').find("#list_notiz_label").html($.t('note')+ ':');
      $('div#materiallist').find("#del").html($.t('del'));
      $('div#materiallist').find("#list_bought_label").html($.t('hint_bought')+ ':');
      $('div#materiallist').find("#menu_list_pointer").html($('#menu_list').html());
      $('div#materiallist').find("#product_add").html($.t('product_add'));

      
      $('div#materiallist').find("#print").html($.t('print'));
      if (PciApp.bIsAndroid)
        $('div#materiallist').find("#print_ios").css('display', 'none');        
      else $('div#materiallist').find("#print_android").css('display', 'none');        
      
    });

    var DefLoadMat2 = PciApp.loadPage("pages/materiallist_add.html");
    DefLoadMat2.done(function(data) {
      $('body').append(data); 
      $('div#materiallist_add').find('h1').html($.t('materiallist_add'));
      $('div#materiallist_add').find('#product_label').html($.t('product')+ ': ');
      $('div#materiallist_add').find('#article_label').html($.t('bundle')+ ': ');
      $('div#materiallist_add').find('#list_label').html($.t('materiallist')+ ': ');
      $('div#materiallist_add').find('#color_label').html($.t('color')+ ': ');
      $('div#materiallist_add').find('#count_label').html($.t('count')+ ': ');
      $('div#materiallist_add').find("#add").html($.t('add'));
      $('div#materiallist_add').find("#cancel_add").html($.t('cancel'));
      $('div#materiallist_add').find("#ok").html($.t('save'));
      $('div#materiallist_add').find("#materiallist_name_label").html($.t('materiallist')+ ' '+ $.t('name')+ ' :'); 
    });
    
  },
}      

PciApp.TechnicCorner = {
  strDir: 'technic',
  
  convertImageUrl: function(par_strString)
  {
    var strDomain = PciApp.Setup.getValue('Domain')+ '/';
    var iBegin = par_strString.lastIndexOf("bmi/");
    if (iBegin > 0)
    {
      var strUrl = par_strString.substring(iBegin+4);
      var arDomain = strDomain.split('//');
      strUrl = strUrl.replace(arDomain[1], '');
      return strUrl;
    }
    else return par_strString;
  },
  
  loadImages: function(par_arDef)
  {
    var strDomain = PciApp.Setup.getValue('Domain')+ '/';
    var dom = $(PciApp.Setup.getValue('TechnicHtml'));
    // einzelne Abschnitte
    var arImages = [];
    dom.find(".csc-textpic").each(function(index) 
    {
      $(this).find("img").each(function(index2) 
      {
        arImages.push(strDomain + PciApp.TechnicCorner.convertImageUrl($(this).attr('src')));
      });

    });
    PciApp.TechnicCorner.downloadImages(arImages,par_arDef);  
  },
  
  downloadImages: function(par_arImages,par_arDef)
  {
    if (par_arImages.length == 0) 
    {
      par_arDef.resolve();
      return; 
    }
    var strImage = par_arImages.pop();
 
    var strImageName = strImage.split('/').pop();
    PciApp.downloadFile(strImage, PciApp.File.strDir+'/'+PciApp.TechnicCorner.strDir, strImageName, true, 
      function(){PciApp.TechnicCorner.downloadImages(par_arImages,par_arDef)}, 
      function(){PciApp.TechnicCorner.downloadImages(par_arImages,par_arDef)});
  },
  
  overview: function()
  {
    $('div#techniccorner').find('#entrys').html("");
    var strDomain = PciApp.Setup.getValue('Domain')+ '/';
    var dom = $(PciApp.Setup.getValue('TechnicHtml'));
    
    var arImages = [];
    // einzelne Abschnitte
    dom.find(".csc-textpic").each(function(index) 
    {
      var strImg = "";
      var strLink = "";
      var strLinkText = "";
      var strText = "";
      
      $(this).find("img").each(function(index2) 
      {
        var strUrl = $(this).attr('src');
        var arUrl = strUrl.split('/');
        var strImg = arUrl.pop();
        arImages.push({iImage:index, url:strImg});
      });
      
      $(this).find(".csc-textpic-text").find("a").each(function(index2) 
      {
        strLink = strDomain + $(this).attr('href');
      });
      $(this).find(".csc-textpic-text").find("p").each(function(index2) 
      {
        if (index2 > 0)
          strText = strText + $(this).text();
        else strLinkText = $(this).text();  
      });
      
      
      $('div#techniccorner').find('#entrys').append('<div style="clear:left">'+ 
        '<div style="float:left;margin-right:5px"><a onclick=\'loadFile("'+ strLink +'", "'+ PciApp.TechnicCorner.strDir+'", false, 0, false)\'"><img id="image_'+index+'" src="" style="display:none"></a></div>'+
        '<div style="margin-top:5px"><a onclick=\'loadFile("'+ strLink +'", "'+ PciApp.TechnicCorner.strDir+'", false, 0, false)\'>'+ strLinkText +' </a><p style="font-size:0.8em">'+ strText+
        '</p></div></div>');
      
    });
    PciApp.TechnicCorner.showImages(arImages);
    
    $('div#techniccorner').find('#entrys').trigger('create');
    PciApp.showPage('#techniccorner');          
  },
  
  showImages: function(par_arImages)
  {
    if (par_arImages.length == 0) return; 
    var arImage = par_arImages.shift();
    PciApp.File.exists(PciApp.TechnicCorner.strDir+'/'+ arImage['url'], function () {
    var defFile = PciApp.File.getFile(PciApp.TechnicCorner.strDir+'/'+ arImage['url'], false);  
    defFile.done( function (fileentry) {
      PciApp.TechnicCorner.showImages(par_arImages);
      $('div#techniccorner').find('#entrys').find('#image_'+arImage['iImage']).attr('src', PciApp.File.getDeviceName(fileentry.fullPath));
      $('div#techniccorner').find('#entrys').find('#image_'+arImage['iImage']).css('display', 'inline-block');
    });
    }, function() {PciApp.TechnicCorner.showImages(par_arImages)});
  },
  
  init : function()
  {
    $('div#techniccorner').remove();
    
    var DefLoadCorner = PciApp.loadPage("pages/techniccorner.html");
    DefLoadCorner.done(function(data) {
      $('body').append(data); 
      $('div#techniccorner').find('h1').html($.t('our advice')); 
      $('div#techniccorner').find("#menu_list_pointer").html($('#menu_list').html());
    });
  },
}      

PciApp.strIndexUrl = 'http://www.pci-mmdb.com/papi/index.php?';
PciApp.strLocalIp = '192.168.1.47';
PciApp.iTyp = 1;  // Typ zur Unterscheidung welche App Version genutzt wird 0 is PCI HD, 1 ist PCI FBP
PciApp.strName = 'fbt.customer_app';   // App Name für Files
if (PciApp.bIsAndroid)
  PciApp.File.strDir = 'Android/data/'+PciApp.strName;
else PciApp.File.strDir = PciApp.strName; 

PrintPlugin = {
  callbackMap: {},
  callbackIdx: 0,

  isPrintingAvailable : function(callback) {
    var key = 'isPrintingAvailable' + this.callbackIdx++;
      PrintPlugin.callbackMap[key] = function(result) {
      delete PrintPlugin.callbackMap[key];
        callback(result);
    };

    var callbackName = 'PrintPlugin.callbackMap.' + key;
  // Cordova.exec("printPlugin.isPrintingAvailable", callbackName);
    PhoneGap.exec(null, null, "printPlugin", "isPrintingAvailable", 
      [callbackName]); 
  },
  
  /*
print - html string or DOM node (if latter, innerHTML is used to get the contents). REQUIRED.
success - callback function called if print successful. {success: true}
fail - callback function called if print unsuccessful. If print fails, {error: reason}. If printing not available: {available: false}
options - {dialogOffset:{left: 0, right: 0}}. Position of popup dialog (iPad only).
*/

  print: function(printHTML, success, fail, options) {
    if (typeof printHTML != 'string'){
        console.log("Print function requires an HTML string. Not an object");
        return;
    }

    //var printHTML = "";

    var dialogLeftPos = 0;
    var dialogTopPos = 0;


    if (options){
        if (options.dialogOffset){
            if (options.dialogOffset.left){
                dialogLeftPos = options.dialogOffset.left;
                if (isNaN(dialogLeftPos)){
                    dialogLeftPos = 0;
                }
            }
            if (options.dialogOffset.top){
                dialogTopPos = options.dialogOffset.top;
                if (isNaN(dialogTopPos)){
                    dialogTopPos = 0;
                }
            }
        }
    }

    var key = 'print' + this.callbackIdx++;
    PrintPlugin.callbackMap[key] = {
        success: function(result) {
            delete PrintPlugin.callbackMap[key];
            success(result);
        },
        fail: function(result) {
            delete PrintPlugin.callbackMap[key];
            fail(result);
        },
    };

    var callbackPrefix = 'PrintPlugin.callbackMap.' + key;
 /*   return Cordova.exec("PrintPlugin.print", printHTML, callbackPrefix + '.success', callbackPrefix + '.fail', dialogLeftPos, dialogTopPos);*/
    return PhoneGap.exec(null, null, "printPlugin", "print", 
      [printHTML, callbackPrefix + '.success', callbackPrefix + '.fail', dialogLeftPos, dialogTopPos]); 
 
  }
}



PciApp.Note = {
  strDir: 'notes',
  iNewId: -9999, 
  NoteId: 0,
  iFile: 0,
  MediaSrc: null,
  strMediaFile: '',
  func_abort : null,
  bChange: false,
  iAttachmentSize : 0,
  mediaObject : null,
    
 
  arNotes: new Array(),
  
  load: function ()
  {
    var defLoad = $.Deferred();
    var defSearch = PciApp.Db.searchNote();
    defSearch.done(function(){defLoad.resolve()});
    return defLoad;
  },

  hint: function()
  {
    if (PciApp.Setup.getValue('Hint_Note') != "true")
      PciApp.Hint.show(14);
    else PciApp.Note.overview();      
  },

  
  overview: function (par_bRefresh)
  {
    if (par_bRefresh != true) par_bRefresh = false;
    
    var defView = $.Deferred();
    var list = $('#list_note'); list.html("");
    var defSearch = PciApp.Note.load();
    defSearch.done(function()
    {
      if (!par_bRefresh) PciApp.showPage('#note');                
      else history.back();
      
      for (var index = 0; index < PciApp.Note.arNotes.length; index++) 
      {
        var strHtml = $('#entrycheckdate').html();
        var arDate = new Date(PciApp.Note.arNotes.item(index).TimeStamp*1000);
        var strText = arDate.getDate() + '.' + (arDate.getMonth()+1) + '.'+ arDate.getFullYear()+ ' ';
        var arText = PciApp.Note.arNotes.item(index).Notice.split("\n");  
        strHtml = strHtml.replace('name', arText[0]);
        strHtml = strHtml.replace('date', strText);
        strHtml = strHtml.replace('0000', 'PciApp.Note.show('+PciApp.Note.arNotes.item(index).Id.toString()+')');
        if (PciApp.Note.arNotes.item(index).bSend == '1')
          strHtml = strHtml.replace('bchecked', 'checked="checked"');
        else strHtml = strHtml.replace('bchecked', '');  
        list.append(strHtml);
      }
      $('body').scrollTop(0);      
      defView.resolve();
    }); 
    return defView;
  },
  
  addImage: function(par_strImage)
  {
    var arFile = par_strImage.split('/');
    var strFileName = arFile.pop();
    var arFileName = strFileName.split('.');
    var arId = arFileName[0].split('_');
    PciApp.Note.iFile = Math.max(PciApp.Note.iFile, arId[1]);
    if (par_strImage.indexOf('_del') >= 0) return;
    if (arFileName[1] == "mp3" || arFileName[1] == "m4a" || arFileName[1] == "wav" || arFileName[1] == "amr")
      var strImage = 'images/mp3.png';
    else 
    {
      var strImage = PciApp.File.getDeviceName(par_strImage);
      if (!PciApp.bIsBlack)
        strImage = strImage +'?' +new Date().getTime();
    }
    var strHtml = $('#image_entry').html();
    // muss so da nicht Ã¼ber attr 
    strHtml = strHtml.replace('image_cnt_', 'image_cnt_' + arId[1]);
    strHtml = $(strHtml);
    strHtml.find('#image').attr('src', strImage);
    if (arFileName[1] == "mp3" || arFileName[1] == "m4a" || arFileName[1] == "wav" || arFileName[1] == "amr")
      strHtml.find('#image').attr('onclick', 'PciApp.Note.playAudio(\''+ strFileName +'\')');
    else
      strHtml.find('#image').attr('onclick', 'PciApp.Image.show(\''+ strImage +'\')');
    strHtml.find('#image_del').attr('onclick', 'PciApp.Note.delImage(\''+ strFileName +'\', \''+ arId[1] +'\')');
    $('#note_images').append(strHtml);
  },
  
  onSuccess: function (imageData) 
  {
    window.resolveLocalFileSystemURI(imageData, 
    function (fileEntry)
    {
      var arName = fileEntry.name.split('.');
      var strFreeName = PciApp.Note.getFreeName() + "_temp."+ arName[1];
      var def = PciApp.File.copy(fileEntry, PciApp.Note.strDir, strFreeName)
      def.done(function(newFileEntry)
      {
        newFileEntry.file(function(file){PciApp.Note.calcAttachmentSize(file.size,true);}, null);
        PciApp.Note.addImage(newFileEntry.fullPath);
        PciApp.Note.bChange = true;        
      });
    }
  , function (message) 
    {
      alert('Failed because: ' + message);
    });
  },
  
  calcAttachmentSize: function(par_iSize, par_bAdd)
  {
    if (par_bAdd)
      PciApp.Note.iAttachmentSize = PciApp.Note.iAttachmentSize + par_iSize;
    else
      PciApp.Note.iAttachmentSize = PciApp.Note.iAttachmentSize - par_iSize;
   $('div#note_details').find('#note_size_input').html(Math.round(PciApp.Note.iAttachmentSize/1024)+ ' kB');
  },
  
       
  loadImages: function()
  {
    PciApp.Note.iFile = 0;
    var defFiles = PciApp.File.getDirEntries(PciApp.Note.strDir, PciApp.Note.NoteId+'_', true);
    var list = $('#note_images'); list.html("");
    defFiles.done(function(arEntries)
    {
      var arImages = new Array();
      for (var i=0;i<arEntries.length; i++)
      {  
        arEntries[i].file(function(file){PciApp.Note.calcAttachmentSize(file.size,true);}, null);
        var strPath = arEntries[i].fullPath;
        arImages.push(strPath);
      }
      arImages.sort();
      for (var i=0;i<arImages.length;i++)
        PciApp.Note.addImage(arImages[i]);
      
      list.trigger("create");
    });
  },
  
  delImage: function(par_strFile, par_iId)
  {
    PciApp.File.exists(PciApp.Note.strDir +'/'+ par_strFile, function () {
      var defFile = PciApp.File.getFile(PciApp.Note.strDir +'/'+par_strFile, false);  
      defFile.done(function (fileentry) {
        fileentry.file(function(file){PciApp.Note.calcAttachmentSize(file.size,false);}, null);
        var rename = PciApp.File.rename(fileentry, fileentry.name.replace('.', '_del.'));
        rename.done(function()
        {
          $('div#note_details').find('#image_cnt_'+par_iId).remove();
          PciApp.Note.bChange = true;        
        }); 
      });
    }, null);
  },
  
  print: function()
  {
    var arData = PciApp.Note.getData();
    PciApp.print(arData[0]); 
  },

  sendEmail: function ()
  {
    var defFiles = PciApp.File.getDirEntries(PciApp.Note.strDir, PciApp.Note.NoteId+'_', true);
    defFiles.done(function(arEntries)
    {
      var arFiles = new Array();
      for (var i=0;i<arEntries.length; i++)
        arFiles.push(arEntries[i].fullPath);
      var arData = PciApp.Project.getData(); 

      // email Adresse holen
      var defLoad = PciApp.Setup.load();
      defLoad.done(function()
      {
        var arData = PciApp.Note.getData(); 
        var strText = arData[0];
        PciApp.sendEmail(PciApp.Setup.getValue('EmailAdress'), $.t('note'), strText, arFiles);
      });
    });  
  },  
           
  set: function(par_iId)
  {
    if (par_iId === undefined)
      PciApp.Note.NoteId = PciApp.Note.iNewId;
    else PciApp.Note.NoteId = par_iId;
  },                 
  
  getData: function()
  {
    for (var index = 0; index < PciApp.Note.arNotes.length; index++) 
      if (PciApp.Note.arNotes.item(index).Id == PciApp.Note.NoteId)
       return new Array(PciApp.Note.arNotes.item(index).Notice, 
        PciApp.Note.arNotes.item(index).TimeStamp, 
        PciApp.Note.arNotes.item(index).bSend);
    return new Array("", "", "");  
    
  },
     
  show: function(par_iId)
  {
    PciApp.Note.bChange = false; 
    PciApp.Note.iAttachmentSize = 0;       
    $('div#note_details').find('#note_size_input').html('0 kB');
    $('div#note_details').find('#note_pause').find('.ui-btn-text').text($.t('pause'));

    $('div#note_details').find('#note_record').find('.ui-btn-text').text($.t('record'));
    PciApp.Note.set(par_iId);
    var defFiles = PciApp.File.getDirEntries(PciApp.Note.strDir, '_', false);
    defFiles.done(function(arEntries)
    {
      var defSaveFiles = $.Deferred();
      PciApp.Note.save_files(arEntries, false, null, defSaveFiles);      
      defSaveFiles.done(function()
      {
        PciApp.showPage('#note_details');
        var arData = PciApp.Note.getData();
        $('#note_description_input').val(arData[0]).change(function(){PciApp.Note.bChange = true});
        if (arData[1] == "")
          var arDate = new Date();
        else 
          var arDate = new Date(arData[1]*1000);
        var strText = arDate.getDate() + '.' + (arDate.getMonth()+1) + '.'+ arDate.getFullYear()+ ' ';
        $('#note_date_input').html(strText).change(function(){PciApp.Note.bChange = true});
        if (arData[2] == '1')
          $('#note_bsend_input').attr("checked", true);
        else 
          $('#note_bsend_input').attr("checked", false);
        $('#note_bsend_input').checkboxradio("refresh").change(function(){PciApp.Note.bChange = true});
        PciApp.Note.loadImages();
      });
    });    
  },     
  
  save_files: function(arEntries, par_bSave, par_iId, par_defFilesSave)
  {
    if (arEntries.length == 0) 
    {
      par_defFilesSave.resolve();
      return;
    }
    var strFile = arEntries.shift();
    var defFile = $.Deferred();
    // wenn durch ruft sich neu auf
    defFile.done(function () {PciApp.Note.save_files(arEntries, par_bSave, par_iId,par_defFilesSave);});   
    // wenn gespeichert wird
    if (par_bSave) 
    {
      if (strFile.name.indexOf('_del') >= 0)
      {
        strFile.remove();
        defFile.resolve(); 
  
      }
      else if (strFile.name.indexOf('_temp') >= 0)
      {
        // wenn gespeichert wird die id noch umbennen
        var strNewName = strFile.name.replace('_temp', '');
        var defRename = PciApp.File.rename(strFile, strNewName.replace(PciApp.Note.iNewId, par_iId));
        defRename.done(defFile.resolve());
      }
      else defFile.resolve();
    } else
    {
      // temps bzw neue bilder werden gelÃ¶scht
      if (strFile.name.indexOf('_temp') >= 0 || strFile.name.indexOf('-') == 0)
      {
        strFile.remove();
        defFile.resolve(); 
      } else 
      // als del markierte wieder hergestellt
      if (strFile.name.indexOf('_del') >= 0)
      {
        var defRename = PciApp.File.rename(strFile, strFile.name.replace('_del', '')); 
        defRename.done(defFile.resolve());
      }    
      else defFile.resolve();      
    }
  },    
                            

  save: function(par_bEmail)
  { 
    // wenn aufnahme dann nicht mgl
    if (PciApp.Note.MediaSrc !== null)
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('record_hint')).fadeOut(4000);      
      return;
    }
    var bSend = 0;
    PciApp.Note.bChange = false;
    if (par_bEmail || $('#note_bsend_input').is(':checked')) bSend = 1;
    
    var time = Math.round(+new Date()/1000);
    var def = PciApp.Db.saveNote(PciApp.Note.NoteId, 
      $('#note_description_input').val(), bSend, time);  
    def.done(function(par_iId)
    {
      var defFiles = PciApp.File.getDirEntries(PciApp.Note.strDir, PciApp.Note.NoteId+'_', false);
      defFiles.done(function(arEntries)
      {
        var defFilesSave = $.Deferred();
        PciApp.Note.save_files(arEntries, true, par_iId, defFilesSave);
        PciApp.Note.set(par_iId); 
        defFilesSave.done(function()
        {
          if (par_bEmail)
          {
            PciApp.Note.load();
            PciApp.EmailAdress.strCaller = "note";
            PciApp.EmailAdress.overview();
          }
          else
          {  
            var defView = PciApp.Note.overview(true);
            defView.done(function()
            {
              $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
                .fadeIn(200).html('').append($.t('hint_project_save')).fadeOut(4000);      
//              history.back();
            });
          }
        });
      });

    });
  },        

  cancel: function()
  {
    if (PciApp.Note.bChange)
      PciApp.Hint.show(13, '', function() {PciApp.Note.overview(true);});
    else PciApp.Note.overview(true);
  },

  getFreeName: function()
  {
    PciApp.Note.iFile++;
    return PciApp.Note.NoteId+"_"+PciApp.Note.iFile;
  },
  

  init : function()
  {
    $('div#note').remove();
    $('div#note_details').remove();
    
    var DefLoadNote = PciApp.loadPage("pages/note.html");
    DefLoadNote.done(function(data) {
      $('body').append(data); 
      $('div#note').find("#new").html($.t('note_new'));
      $('div#note').find('h1').html($.t('notes'));
      $('div#note').find("#menu_list_pointer").html($('#menu_list').html());
    });

    var DefLoadNote2 = PciApp.loadPage("pages/note_details.html");
    DefLoadNote2.done(function(data) {
      $('body').append(data); 
      $('div#note_details').find('h1').html($.t('note'));
      $('div#note_details').find("#note_description").html($.t('note_text')+ ':');
      $('div#note_details').find("#note_bsend").html($.t('project_bsend')+ ':');
      $('div#note_details').find("#note_date").html($.t('date')+ ':');
      $('div#note_details').find("#note_size").html($.t('size_attachment')+ ':');
      $('div#note_details').find("#send").html($.t('send'));
      $('div#note_details').find("#del").html($.t('del'));
      $('div#note_details').find("#save").html($.t('save'));
      $('div#note_details').find("#print").html($.t('print'));
      $('div#note_details').find("#cancel").html($.t('cancel'));
      $('div#note_details').find("#note_makephoto").html($.t('photo'));
      $('div#note_details').find("#note_loadphoto").html($.t('gallery'));
      $('div#note_details').find("#note_record").html($.t('record'));
      $('div#note_details').find("#note_pause").html($.t('pause'));
      $('div#note_details').find("#note_stop").html($.t('record_stop'));
      $('div#note_details').find("#menu_list_pointer").html($('#menu_list').html());
 
      if (PciApp.bIsAndroid)
        $('div#note_details').find("#print_ios").css('display', 'none');        
      else $('div#note_details').find("#print_android").css('display', 'none');        
    });
    
  },
  
  del: function()
  {
     // wenn aufnahme dann nicht mgl
    if (PciApp.Note.MediaSrc !== null)
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('record_hint')).fadeOut(4000);      
      return;
    }
 
    var def = PciApp.Db.delNote(PciApp.Note.NoteId);  
    def.done(function()
    {
      var defFiles = PciApp.File.getDirEntries(PciApp.Note.strDir, PciApp.Note.NoteId+'_', false);
      defFiles.done(function(arEntries)
      {
        for (var i=0; i< arEntries.length; i++)
          arEntries[i].remove(); 
        $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t('hint_project_del')).fadeOut(4000);      
        PciApp.Note.overview();          
        history.back();
      });
    });
  },
  
  recordAudioStop : function()
  {
       if (PciApp.Note.MediaSrc == null) return;
       PciApp.Note.bChange = true;        
       
       clearTimeout(PciApp.Note.func_abort);
       $('div#note_details').find('#note_record').find('.ui-btn-text').text($.t('record'));
       // Record audio
       if (PciApp.bIsIOS)
       {
         PhoneGap.exec(null, null, "AudioRecord","stopAudioRecord", [PciApp.Note.MediaSrc.id, PciApp.Note.MediaSrc.src]);
         PciApp.Note.addImage(PciApp.Note.strMediaFile);
       }
       else 
       {
         PciApp.Note.MediaSrc.stopRecord();
         PciApp.Note.addImage(PciApp.Note.strMediaFile);
       }
       
       var arFile = PciApp.Note.strMediaFile.split('/');
       var strFile = arFile.pop();

       var Def = PciApp.File.getFile(PciApp.Note.strDir + '/'+strFile, false);
       Def.done(function(fileentry)
       {
         fileentry.file(function(file){PciApp.Note.calcAttachmentSize(file.size,true);}, null);
       })
       
       PciApp.Note.MediaSrc = null;
  },
  
  checkMemory: function()
  {
    var Def = $.Deferred();
    PhoneGap.exec(function (result) {
      Def.resolve(result);
     }, function (result) {
      Def.resolve("1");
     }, "Downloader","checkMemory", []);
   return Def;
  },
  
  recordAudio: function() {
    // start Aufnahmne
    if ($('div#note_details').find('#note_record').find('.ui-btn-text').text() == $.t('record'))
    {
      $('div#note_details').find('#note_record').find('.ui-btn-text').text($.t('record_stop'));
      if (PciApp.bIsIOS)
      {
        var DefMem = PciApp.Note.checkMemory();
        DefMem.done(function(result)
        {
          if (result=="1")
          {
            alert($.t('memory_error'));
            $('div#note_details').find('#note_record').find('.ui-btn-text').text($.t('record'));
          }else
          {
            PciApp.Note.strMediaFile = PciApp.Note.strDir + "/"+ PciApp.Note.getFreeName() + "_temp.wav";
            var DefCreate = PciApp.File.getFile(PciApp.Note.strMediaFile, true);
            DefCreate.done(function(fileEntry)
            {
              PciApp.Note.MediaSrc = new Media(fileEntry.fullPath,
                null, function (error) {
                alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');});
              var recordSettings = {
                "FormatID": "kAudioFormatMPEGLayer3",
                "SampleRate": 4000,
                "NumberOfChannels": 1,
                "LinearPCMBitDepth": 8};
              PhoneGap.exec(null, null, "AudioRecord","startAudioRecord", [PciApp.Note.MediaSrc.id, PciApp.Note.MediaSrc.src, recordSettings]);
            });
          }
        });
  
     //     PciApp.Note.MediaSrc.startRecord();
      }
      else if (PciApp.bIsBlack)
      {
//        PciApp.Note.strMediaFile = PciApp.File.strDir + '/'+ PciApp.Note.strDir + '/'+ PciApp.Note.getFreeName() + "_temp.amr";
        var DefLoad = PciApp.File.getDir(PciApp.Note.strDir);
        DefLoad.done(function(fileentry)
        {
          PciApp.Note.strMediaFile = fileentry.fullPath+ '/'+ PciApp.Note.getFreeName() + "_temp.amr";
          PciApp.Note.MediaSrc = new Media(PciApp.Note.strMediaFile, 
            function () {console.log("recordAudio():Audio Success");}
            , function (error) {
              alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');});
          PciApp.Note.MediaSrc.startRecord();
        });
      }
      else 
      {
        PciApp.Note.strMediaFile = PciApp.File.strDir + '/'+ PciApp.Note.strDir + '/'+ PciApp.Note.getFreeName() + "_temp.mp3";
        PciApp.Note.MediaSrc = new Media(PciApp.Note.strMediaFile, 
          function () {console.log("recordAudio():Audio Success");}
          , function (error) {
            alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');});
        PciApp.Note.MediaSrc.startRecord();
      }
      // abrruch bedingung nach 10 min
      PciApp.Note.func_abort = setTimeout(function() 
            {
              PciApp.Note.recordAudioStop();
            }
      , 600000);
     
    }
    // stop Aufnahme
    else
      PciApp.Note.recordAudioStop();
  },
  
  pauseAudio: function()
  {
    if (PciApp.Note.mediaObject)
      if ($('div#note_details').find('#note_pause').find('.ui-btn-text').text() == $.t('pause'))
      {
        $('div#note_details').find('#note_pause').find('.ui-btn-text').text($.t('next'));
        PciApp.Note.mediaObject.pause();
      }      
      else
      {
        $('div#note_details').find('#note_pause').find('.ui-btn-text').text($.t('pause'));
        PciApp.Note.mediaObject.play();
      }      
  },
  
  stopAudio: function()
  {
    if (PciApp.Note.mediaObject)
      PciApp.Note.mediaObject.stop();
  },
  
  successPlay: function()
  {
    PciApp.Note.mediaObject = null;
    $("div#note_details").find("#audio_cnt").css("display", "none");
    $("div#note_details").find("#file_cnt").css("display", "block");
  },
  
  playAudio: function(src) {
    // wenn aufnahme dann nicht mgl oder schon eins abgespielt wird
    if (PciApp.Note.MediaSrc !== null || $('div#note_details').find('#note_record').css("visibility") == "hidden")
      return;
  
    if (PciApp.Note.mediaObject) return;
    // wenn abgespielt wird aufnahme unterdrÃ¼cken
    
    $("div#note_details").find("#file_cnt").css("display", "none");
    $("div#note_details").find("#audio_cnt").css("display", "block");
     
    var defFile = PciApp.File.getFile(PciApp.Note.strDir +'/'+src, false);  
    defFile.done( function (fileentry) {
      if (PciApp.bIsIOS)
      {
        var DefMem = PciApp.Note.checkMemory();
        DefMem.done(function(result)
        {
          if (result=="1")
          {
            alert($.t('memory_error'));
            PciApp.Note.successPlay();
          }else
          {
            PciApp.Note.mediaObject = new Media(fileentry.fullPath, PciApp.Note.successPlay, PciApp.Note.successPlay);
            PciApp.Note.mediaObject.play();
          }
        });
      }
      else 
      {
        PciApp.Note.mediaObject = new Media(PciApp.File.getDeviceName(fileentry.fullPath), PciApp.Note.successPlay, PciApp.Note.successPlay);
        PciApp.Note.mediaObject.play();
      };
    });  
  }
}      


PciApp.News = {
  iTimeStamp: 0,
  arEntrys: [],

  overview: function()
  {
    // wenn keine neuen vorhanden
    strNewVersion = PciApp.Setup.getValue('newNewsVersion');
    if (strNewVersion == 'false' || strNewVersion == '') return;
    
    PciApp.Db.setSetting('NewsVersion', strNewVersion);
    PciApp.Db.setSetting('newNewsVersion', 'false');
    
    PciApp.Setup.load();
    $('div#news_dialog').find('#news_entrys').html("");
    
    var strUrl = PciApp.Setup.getValue('Domain');
    var arInfo = PciApp.Setup.getLangInfo(PciApp.Setup.getValue('LangId'));
    if (arInfo.strIsoCode != 'de')
      strUrl = strUrl + '/'+arInfo.strIsoCode;
    strUrl = strUrl +'/app/news/'; 
    
    var iTimeStmap = PciApp.Setup.getValue('NewsVersion');
    var DefLoadNews = PciApp.loadPage(strUrl);
    DefLoadNews.done(function(data) {
      if (data == '') return;
      var dom = $(data);
      var test = dom.find(".news-single-item");
      test.find("img").each(function(index) 
      {
        $(this).attr('src', PciApp.Setup.getValue('Domain') + '/' +PciApp.TechnicCorner.convertImageUrl($(this).attr('src')));
      });
      test.find("a").each(function(index) 
      {
        var test = $(this).attr('href');
        if (test.indexOf("http") != 0) 
          if (test.indexOf("javascript:linkTo_UnCryptMailto") == 0)
          {
            // Mail to :
            var dummy = $(this).clone();
            dummy = dummy.html(dummy.html().replace('<img', '@<img'));
            dummy.find('img').remove();
            $(this).attr('href', 'javascript:PciApp.sendEmail(\''+ dummy.html() +'\', \'\', \'\');');
          }
          else
          {
            var strFunction = PciApp.Setup.getValue('Domain') + '/' +$(this).attr('href');
            $(this).attr('href', 'javascript:PciApp.openUrl(\''+ strFunction +'\');');
          }
                      
      });
      $('div#news_dialog').find('#news_entrys').append(test);
      PciApp.showPage('#news_dialog');          
    })
  },    
  
  init : function()
  {
    $('div#news_dialog').remove();       
    
    var DefLoadMail = PciApp.loadPage("pages/news.html");
    DefLoadMail.done(function(data) {
      $('body').append(data); 
      $('div#news_dialog').find('h1').html($.t('news'));
      setTimeout(function(){PciApp.News.overview()}, 2000);      
    });
    
  },
}      

//jquery 1.3.2 dependencies  : $.each, $.extend, $.ajax

(function($) {
	//defaults
	var o = {};
    o.interpolationPrefix = '__';
    o.interpolationSuffix = '__';
    o.pluralSuffix = "_plural";
    o.maxRecursion = 50; //used while applying reuse of strings to avoid infinite loop
    o.reusePrefix = "$t(";
    o.reuseSuffix = ")";
    o.fallbackLang = 'en-US'; // see Language fallback section
    o.dicoPath = 'locales'; // see Dictionary section
    o.keyseparator = "."; // keys passed to $.jsperanto.translate use this separator
    o.setDollarT = true; // $.t aliases $.jsperanto.translate, nice shortcut
    o.dictionary = false; // to supply the dictionary instead of loading it using $.ajax. A (big) javascript object containing your namespaced translations
	o.lang = false; //specify a language to use
	o.pluralNotFound = ["plural_not_found_", Math.random()].join(''); // used internally by translate
	
	var dictionary = false; //not yet loaded
	var currentLang = false;
	var count_of_replacement = 0;
	
	function init(callback,options){
		$.extend(o,options);
		if(!o.lang){o.lang = detectLanguage();}
		loadDictionary(o.lang,function(loadedLang){
			currentLang = loadedLang;
			if(o.setDollarT){$.t = $.t || translate;} //shortcut
			callback(translate);
		});
	}
	
	function applyReplacement(string,replacementHash){
		$.each(replacementHash,function(key,value){
			string = string.replace([o.interpolationPrefix,key,o.interpolationSuffix].join(''),value);
		});
		return string;
	}
	
	function applyReuse(translated,options){
		while (translated.indexOf(o.reusePrefix) != -1){
			count_of_replacement++;
			if(count_of_replacement > o.maxRecursion){break;} // safety net for too much recursion
			var index_of_opening = translated.indexOf(o.reusePrefix);
			var index_of_end_of_closing = translated.indexOf(o.reuseSuffix,index_of_opening) + o.reuseSuffix.length;
			var token = translated.substring(index_of_opening,index_of_end_of_closing);
			var token_sans_symbols = token.replace(o.reusePrefix,"").replace(o.reuseSuffix,"");
			var translated_token = _translate(token_sans_symbols,options);
			translated = translated.replace(token,translated_token);
		}
		return translated;
	}
	
	function detectLanguage(){
		if(navigator){
			return (navigator.language) ? navigator.language : navigator.userLanguage;
		}else{
			return o.fallbackLang;
		}
	}
	
	function needsPlural(options){
		return (options.count && typeof options.count != 'string' && options.count > 1);
	}
	

	function translate(dottedkey,options){
		count_of_replacement = 0;
		return _translate(dottedkey,options);
	}
	
	/*
	options.defaultValue
	options.count
	*/
	function _translate(dottedkey,options){
		options = options || {};
		var notfound = options.defaultValue || dottedkey;
		if(!dictionary){return notfound;} // No dictionary to translate from
		
		if(needsPlural(options)){
			var optionsSansCount = $.extend({},options);
			delete optionsSansCount.count;
			optionsSansCount.defaultValue = o.pluralNotFound;
			var pluralKey = dottedkey + o.pluralSuffix;
			var translated = translate(pluralKey,optionsSansCount);
			if(translated != o.pluralNotFound){
				return applyReplacement(translated,{count:options.count});//apply replacement for count only
			}// else continue translation with original/singular key
		}
		
		var keys = dottedkey.split(o.keyseparator);
		var i = 0;
		var value = dictionary;
        while(keys[i]) {
            value = value && value[keys[i]];
            i++;
        }
		if(value){
			value = applyReplacement(value,options);
			value = applyReuse(value,options);
			return value;
		}else{
			return notfound;
		}
	}
	
	function loadDictionary(lang,doneCallback){
		if(o.dictionary){
			dictionary = o.dictionary;
			doneCallback(lang);
			return;
		}
    
		$.ajax({
			url: [o.dicoPath,"/", lang, '.json'].join(''),
			success: function(data,status,xhr){
				dictionary = data;
				doneCallback(lang);
			},
			error : function(xhr,status,error){
				if(lang != o.fallbackLang){
					loadDictionary(o.fallbackLang,doneCallback);
				}else{
					doneCallback(false);
				}
			},
			dataType: "json"
		});
	}
	
	function lang(){
		return currentLang;
	}
	
	$.jsperanto = $.jsperanto || {
		init:init,
		t:translate,
		translate:translate,
		detectLanguage : detectLanguage,
		lang : lang
	};
})(jQuery);

PciApp.Image = {
  show: function (par_strImage)
  {
    $('div#image_preview').find('#preview').attr('src', par_strImage);
    PciApp.showPage('#image_preview');          
  },
  

  init : function()
  {
    $('div#image_preview').remove();       
    
    var DefLoadMail = PciApp.loadPage("pages/image_preview.html");
    DefLoadMail.done(function(data) {
      $('body').append(data); 
      $('div#image_preview').find('h1').html($.t('preview'));
    });
  },
}      

PciApp.BarCode = 
{
  strScanResult : "",
  
  resultean13 : function()
  {
    var result = PciApp.BarCode.strScanResult;
    $('div#search').find('#searchBox').val(PciApp.Product.strSearchEanParam + result.text);
    var defLoad = PciApp.Product.doSearch();
    defLoad.done(function()
    {
      if (PciApp.Product.arEntrys.length == 0) PciApp.Hint.show(5);
      else
      {
        PciApp.showPage('#search');  
        $('div#search').find('#searchBox').val(PciApp.Product.strSearchEanParam + result.text);
      }
    });
      
  },
  
  getTypes: function(strTypes)
  {
    var arTypes = [];
    var arProps = strTypes.split(";");
    for (var i = 0; i < arProps.length;i++)
    {
      if (i == 0) continue;
      if (arProps[i].toLowerCase().indexOf("type=") == 0)
      {
        var arSubTypes = arProps[i].split("=");
        if (arSubTypes[1] != undefined)
        {
          var arSubTypes2 = arSubTypes[1].split(",");
          for (var j = 0; j < arSubTypes2.length;j++)
            arTypes.push(arSubTypes2[j]); 
        }
      }
      else arTypes.push(arProps[i]);
    }
    if (arTypes.length == 0) return [""];
    return arTypes;
  },
  
  resultmail : function(par_bName)
  {  
    var strResult = PciApp.BarCode.strScanResult;
    var arResult = strResult.text.replace(/mailto:/i,"").split("?");
    var strReceiver = arResult[0];
    if (par_bName == true) return strReceiver;
    var arText = arResult[1].split("&");
    var strSubject = "";
    var strBody = "";
    for (var i = 0; i < arText.length; i++)
    {
      if (arText[i].toLowerCase().indexOf("subject=") == 0)
        strSubject = arText[i].replace(/subject=/i, "");
      if (arText[i].toLowerCase().indexOf("body=") == 0)
        strBody = arText[i].replace(/body=/i, "");
    }
    PciApp.sendEmail(strReceiver, strSubject, strBody, new Array());
  },
  
  resultimport : function()
  {
    var result = PciApp.BarCode.strScanResult;
    var arResult = result.text.split('=');
    PciApp.Db.importDb(arResult[1]);
  },
  
  resultvcard : function(par_bName)
  {
    var result = PciApp.BarCode.strScanResult;
    var contact = navigator.contacts.create();
    var arText = result.text.split("\n");
    var arPhoneNumbers = [];
    var arEmails = [];
    var arUrls = [];
    var arAdress = [];
    var organisation = new ContactOrganization();
    for (var i = 0; i< arText.length;i++)
    {
      if (arText[i].toLowerCase().indexOf("n:") == 0)
      {
        var arName = arText[i].replace(/n:/i,"").split(";");
        var name = new ContactName();
        if (arName[1] != undefined) 
          name.givenName = arName[1];
        name.familyName = arName[0];
        contact.name = name;
      }
      if (arText[i].toLowerCase().indexOf("tel") == 0 )
      {
        var arProps = arText[i].replace(/tel/i,"").split(":");
        // Eigenschaften ermitteln
        var arTypes = PciApp.BarCode.getTypes(arProps[0]); 
        for (var j = 0; j < arTypes.length; j++)
        {
          if (arTypes[j] == "pref")
            arPhoneNumbers.push(new ContactField(arTypes[j], arProps[1], true));
          else arPhoneNumbers.push(new ContactField(arTypes[j], arProps[1], false));
        }
      }
      if (arText[i].toLowerCase().indexOf("email") == 0 )
      {
        var arProps = arText[i].replace(/EMAIL/i,"").split(":");
        // Eigenschaften ermitteln
        var arTypes = PciApp.BarCode.getTypes(arProps[0]); 
        for (var j = 0; j < arTypes.length; j++)
        {
          if (arTypes[j] == "pref")
            arEmails.push(new ContactField(arTypes[j], arProps[1], true));
          else arEmails.push(new ContactField(arTypes[j], arProps[1], false));
        }
      }
      if (arText[i].toLowerCase().indexOf("url") == 0 )
      {
        var arProps = arText[i].replace(/url/i,"").split(":");
        // Eigenschaften ermitteln
        var arTypes = PciApp.BarCode.getTypes(arProps[0]); 
        for (var j = 0; j < arTypes.length; j++)
        {
          if (arTypes[j] == "pref")
            arUrls.push(new ContactField(arTypes[j], arProps[1], true));
          else arUrls.push(new ContactField(arTypes[j], arProps[1], false));
        }
      }
      if (arText[i].toLowerCase().indexOf("adr") == 0 )
      {
        var arProps = arText[i].replace(/adr/i,"").split(":");
        // Eigenschaften ermitteln
        var arTypes = PciApp.BarCode.getTypes(arProps[0]); 
        var arAdr = arProps[1].split(";");   
        for (var j = 0; j < arTypes.length; j++)
          arAdress.push(new ContactAddress(false, arTypes[j], arAdr[1], arAdr[2], arAdr[3], arAdr[4], arAdr[5], arAdr[6]));
      }
      if (arText[i].toLowerCase().indexOf("title:") == 0 )
        organisation.title = arText[i].replace(/title:/i,"");
      if (arText[i].toLowerCase().indexOf("org:") == 0 )
      {
        var arOrg = arText[i].replace(/org:/i,"").split(";");
        for (var j = 0;j < arOrg.length; j++)
          if (j == 0) organisation.name = arOrg[j];
          else organisation.department = organisation.department + arOrg[j]+ " ";
      }
    }  
    
    if (par_bName == true)
      if (contact.name.givenName == null) return contact.name.familyName;
      else return contact.name.familyName+ ', '+ contact.name.givenName;
    
    // save to device
    contact.phoneNumbers = arPhoneNumbers;
    contact.emails = arEmails;
    contact.urls = arUrls;
    contact.addresses = arAdress;
    if (organisation.name != "" && organisation.title != "")
      contact.organizations = [organisation];
    contact.save(function(){
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t("hint_contact_success")).fadeOut(3000);      
      },function(){
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
        .fadeIn(200).html('').append($.t("hint_contact_error")).fadeOut(3000);      
    
    });
  },
  
  getText : function()
  {
    return PciApp.BarCode.strScanResult.text;
  },

  resulturl : function()
  {
    var strText = PciApp.BarCode.strScanResult.text;
    if (strText.toLowerCase().indexOf("url:") == 0) 
      strText = strText.replace(/url:/i,"");
    PciApp.openUrl(strText);
  },

  success: function(result)
  {
    if (result.cancelled == 1) return; 
    PciApp.BarCode.strScanResult = result;
    switch (PciApp.BarCode.strScanResult.format)
    {
      case "EAN_13": PciApp.BarCode.resultean13();
        break;
      case "QR_CODE":
        if (result.text.toLowerCase().indexOf("begin:vcard") == 0)
          PciApp.Hint.show(6, PciApp.BarCode.resultvcard(true));
        else if (result.text.toLowerCase().indexOf("http:") == 0 || result.text.toLowerCase().indexOf("www.") == 0 || result.text.toLowerCase().indexOf("url:") == 0)
          PciApp.Hint.show(8, result.text);
        else if (result.text.toLowerCase().indexOf("mailto") == 0)
          PciApp.Hint.show(7, PciApp.BarCode.resultmail(true));
        else if (result.text.toLowerCase().indexOf("pciapp_export=") == 0)
          PciApp.Hint.show(18, PciApp.BarCode.resultmail(true));
        else PciApp.Hint.show(9);  
        break;
      default : PciApp.Hint.show(5);  
    }
  },


  fail: function(result)
  {
    
  },
  
  showHintbeforeScan: function()
  {
    if (PciApp.Setup.getValue('Hint_Scanner') != "true")
      PciApp.Hint.show(10);
    else 
      PciApp.BarCode.scan();
  },  
  
  scan: function()
  {
    if (PciApp.bIsAndroid)
      PhoneGap.exec(PciApp.BarCode.success, PciApp.BarCode.fail, 
        "BarcodeScanner", "scan", []);
    else if (PciApp.bIsIOS)
      PhoneGap.exec(PciApp.BarCode.success, PciApp.BarCode.fail, 
        "org.apache.cordova.barcodeScanner", "scan", []);
    else if (PciApp.bIsBlack)
    	window.plugins.barcodeScanner.scan(PciApp.BarCode.success, PciApp.BarCode.fail);        
  }
  
}



//    document.write('<script charset="utf-8" src="ios-cordova-1.6.1.js"><\/script>');
  if (navigator.userAgent.toLowerCase().match(/iphone/) || navigator.userAgent.toLowerCase().match(/ipad/))
      document.write('<script charset="utf-8" src="ios-cordova-2.1.0.js"><\/script>');
  else if (navigator.userAgent.toLowerCase().match(/blackberry/))
  {  
    document.write('<script charset="utf-8" src="black-cordova-2.1.0.js"><\/script>');
    document.write('<script charset="utf-8" src="childbrowser.js"><\/script>');
    document.write('<script charset="utf-8" src="barcodescanner.js"><\/script>');
  }
  else document.write('<script charset="utf-8" src="cordova-1.6.1.js"><\/script>');




PciApp.Hint = {
  iTyp : 0,
  func_abort: null,
  strAddionalText: '',
  
  show : function(par_iTyp, par_strAdditionalText, par_func)
  {
    PciApp.Hint.iTyp = par_iTyp;
    PciApp.Hint.func_abort = par_func;
    PciApp.Hint.strAddionalText = par_strAdditionalText;
    $('div#hint_dialog').find("#group").css('display','block');
    $('div#hint_dialog').find("#ok").css('display','none');
    $('div#hint_dialog').find("#group_send").css('display','none');
    
    $('div#hint_dialog').find("#hint_settings").css('display','none');
    $('div#hint_dialog').find("#hint_export").css('display','none');
    $('div#hint_dialog').find("#hint_response").css('display','none');
    $('div#hint_dialog').find("#hint_checkbox").css('display','none');
    $('div#hint_dialog').find('#notshow').attr("checked", false);
    $('div#hint_dialog').find('h1').html($.t('hint'));
    if ($('div#hint_dialog').find("#label_notshow").find(".ui-btn-text").length == 0)
      $('div#hint_dialog').find("#label_notshow").text($.t('hint_notshow'));
    else $('div#hint_dialog').find("#label_notshow").find(".ui-btn-text").text($.t('hint_notshow'));
    
    switch (PciApp.Hint.iTyp)
    {
      case 1:
        $('div#hint_dialog').find("#details_hint").html($.t('hint_relocate'));
        $('div#hint_dialog').find("#hint_checkbox").css('display','');
        
        if ($('div#hint_dialog').find("#label_notshow").find(".ui-btn-text").length == 0)
          $('div#hint_dialog').find("#label_notshow").text($.t('own_data'));
        else $('div#hint_dialog').find("#label_notshow").find(".ui-btn-text").text($.t('own_data'));
        
      break;
      case 2:
        $('div#hint_dialog').find("#details_hint").html($.t('hint_update'));
      break;
      case 3:
        $('div#hint_dialog').find("#hint_settings").css('display','');
        $('div#hint_dialog').find("#details_hint").html($.t('hint_offline'));
      break;
      case 4:
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#ok").css('display','block');
        $('div#hint_dialog').find("#details_hint").html($.t('hint_space'));
      break;
      case 5:
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#ok").css('display','block');
        $('div#hint_dialog').find("#details_hint").html($.t('hint_ean'));
      break;
      case 6:
        $('div#hint_dialog').find("#details_hint").html($.t('hint_scanner_contact').replace("%s", par_strAdditionalText));
      break;
      case 7:
        $('div#hint_dialog').find("#details_hint").html($.t('hint_scanner_email').replace("%s", par_strAdditionalText));
      break;
      case 8:
        $('div#hint_dialog').find("#details_hint").html($.t('hint_scanner_url').replace("%s", par_strAdditionalText));
      break;
      case 9:
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#ok").css('display','block');
        $('div#hint_dialog').find("#details_hint").html($.t('hint_scanner_default')+ "<br><br>"+ PciApp.BarCode.getText());
      break;
      case 10:
        $('div#hint_dialog').find("h1").html($.t('code scanner'));
        $('div#hint_dialog').find("#details_hint").html($.t('hint_decoder'));
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#ok").css('display','block');
        $('div#hint_dialog').find("#hint_checkbox").css('display','');
      break;
      case 12:
        $('div#hint_dialog').find("h1").html($.t('project_detector'));
        $('div#hint_dialog').find("#details_hint").html($.t('hint_project'));
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#ok").css('display','block');
        $('div#hint_dialog').find("#hint_checkbox").css('display','');
      break;
      case 13:
        $('div#hint_dialog').find("h1").html('');
        $('div#hint_dialog').find("#details_hint").html($.t('hint_cancel'));
      break;
      case 14:
        $('div#hint_dialog').find("h1").html($.t('note'));
        $('div#hint_dialog').find("#details_hint").html($.t('hint_note'));
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#ok").css('display','block');
        $('div#hint_dialog').find("#hint_checkbox").css('display','');
      break;
      case 15:
        $('div#hint_dialog').find("h1").html($.t('measurement'));
        $('div#hint_dialog').find("#details_hint").html($.t('hint_measurement'));
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#ok").css('display','block');
        $('div#hint_dialog').find("#hint_checkbox").css('display','');
      break;
      case 16:
        $('div#hint_dialog').find("#hint_export").css('display','');
        $('div#hint_dialog').find("#details_hint").html($.t('export_hint'));
      break;
      case 17:
        $('div#hint_dialog').find("#hint_response").css('display','');
        $('div#hint_dialog').find("#img_hint_response").removeAttr("src").attr("src", "data:image/png;base64,"+par_strAdditionalText);
        $('div#hint_dialog').find("#group").css('display','none');
        $('div#hint_dialog').find("#group_send").css('display','block');
      break;
      case 18:
        $('div#hint_dialog').find("#details_hint").html($.t('import_hint'));
      break;
      
      
    }
    PciApp.showPage('#hint_dialog');
    $('div#hint_dialog').find('#notshow').checkboxradio("refresh");
  },
  
  sendEmailExport : function()
  {
    var $test = "data:image/png;base64,"+PciApp.Hint.strAddionalText;
    PciApp.sendEmail(PciApp.Setup.getValue('EmailAdress'), $.t('export'), "<table><tr><td><img width=\"200px\" src="+$test+"></td></tr></table>", new Array());
  },
  
  save : function()
  {
    switch (PciApp.Hint.iTyp)
    {
      case 1:
        history.back();
        PciApp.Settings.dorelocate($('div#hint_dialog').find('#notshow').is(':checked'));
      break;
      case 2:
        PciApp.Db.update($.Deferred());
        history.back();
      break;
      case 3:
        downloadAllFiles($('#settings_image').is(':checked'), $('#settings_technical').is(':checked'), $('#settings_safety').is(':checked'));
        history.back();
      break;
      case 4: case 5: case 9: case 11:
        history.back();
      break;
      case 6:
        PciApp.BarCode.resultvcard();
        history.back();
      break;
      case 7:
        PciApp.BarCode.resultmail();
        history.back();
      break;
      case 8:
        PciApp.BarCode.resulturl();
        history.back();
      break;
      case 10:
        PciApp.Db.setSetting('Hint_Scanner', $('div#hint_dialog').find('#notshow').is(':checked'));
        PciApp.Setup.load();
        history.back();
        PciApp.BarCode.scan();
      break;
      case 12:
        PciApp.Db.setSetting('Hint_Project', $('div#hint_dialog').find('#notshow').is(':checked'));
        PciApp.Project.overview();
        PciApp.Setup.load();
      break;
      case 13:
        PciApp.Hint.func_abort();
        history.back();
      break;
      case 14:
        PciApp.Db.setSetting('Hint_Note', $('div#hint_dialog').find('#notshow').is(':checked'));
        PciApp.Note.overview();
        PciApp.Setup.load();
      break;
      case 15:
        PciApp.Db.setSetting('Hint_Measurement', $('div#hint_dialog').find('#notshow').is(':checked'));
        PciApp.Measurement.overview();
        PciApp.Setup.load();
      break;
      case 16:
        PciApp.Db.exportDb($('#settings_note').is(':checked'), $('#settings_project').is(':checked'), $('#settings_measure').is(':checked'),$('#settings_material').is(':checked'));
        history.back();
      break;
      case 17:
        history.back();
        setTimeout(function()
        {
          PciApp.EmailAdress.strCaller = "export";
          PciApp.EmailAdress.overview();
        }, 300);
      break;
      case 18:
        PciApp.BarCode.resultimport();
        history.back();
      break;
      
    }
  },
  
  cancel : function()
  {
    history.back();
  },
  
  
  init: function()
  {
    $('div#hint_dialog').remove();
    
    var DefLoadHint = PciApp.loadPage("pages/hint.html");
    DefLoadHint.done(function(data) {
      data = data.replace('!IMAGE!', $.t('productimage')).replace('!TECHNIC!', $.t('technicaldatasheet')).replace('!SAFETY!', $.t('safetysdatasheet'))
        .replace('!HINT_TEXT!', $.t('hint_notshow'));
      data = data.replace('!NOTE!', $.t('notes')).replace('!PROJECT!', $.t('projects')).replace('!AUFMASS!', $.t('measurement')).replace('!MATERIAL!', $.t('materiallists'));
      $('body').append(data); 
      $('div#hint_dialog').find('h1').html($.t('hint'));
      $('div#hint_dialog').find("#save").html($.t('ok'));
      $('div#hint_dialog').find("#cancel").html($.t('cancel'));
      $('div#hint_dialog').find("#ok").html($.t('ok'));
      $('div#hint_dialog').find("#send").html($.t('send'));
      $('div#hint_dialog').find("#notsend").html($.t('ok'));      
    });

  },
}

PciApp.Setup = {
  arSettings : new Array(),
  arCountrys : new Array(),
  iCountry : 0,
  iLang : 0,
  arSearchIndex : new Array(),
  position_country : 0,
  position_language : 0,
        
  next:function(par_strTyp){
    if (par_strTyp == 'country')
    {
      if (PciApp.Setup.position_country >= PciApp.Setup.arCountrys.length-1) return;
      PciApp.Setup.position_country++
    }
    else
    {
      if (PciApp.Setup.position_language >= PciApp.Setup.arSearchIndex['arLang'].length-1) return;
      PciApp.Setup.position_language++
    }           
    PciApp.Setup.update(par_strTyp);
  },

  prev:function(par_strTyp){
    if (par_strTyp == 'country')
    {
      if (PciApp.Setup.position_country == 0) return;
      PciApp.Setup.position_country --;
    }
    else
    {
      if (PciApp.Setup.position_language == 0) return;
      PciApp.Setup.position_language --;
    }
    PciApp.Setup.update(par_strTyp);
  },

  update:function(par_strTyp){
    var pos = (par_strTyp == 'country') ? PciApp.Setup.position_country : PciApp.Setup.position_language;
    if (!(PciApp.Setup.arCountrys.length <= 1 && par_strTyp == 'country'))
    {
      jQuery("#setup_"+par_strTyp+"_"+(pos)).css("transform", "scaleY(1)").addClass("select");
      jQuery("#setup_"+par_strTyp+"_"+(pos-1)).css("visibility", "visible").css("transform", "scale(1,.5)").removeClass("select");
      jQuery("#setup_"+par_strTyp+"_"+(pos+1)).css("visibility", "visible").css("transform", "scale(1,.5)").removeClass("select");
      jQuery("#setup_"+par_strTyp+"_"+(pos+2)).css("visibility", "hidden");
      jQuery("#setup_"+par_strTyp+"_"+(pos-2)).css("visibility", "hidden");
      
      
      var pan = document.getElementById("pan_"+par_strTyp);
      pan.style.OTransform = "translateY(" + (pos)*40*-1 + "px)";
      pan.style.MozTransform = "translateY(" + (pos)*40*-1 + "px)";
      pan.style.WebkitTransform = "translateY(" + (pos)*40*-1 + "px)";
    }
    if (par_strTyp == 'country') PciApp.Setup.selectLanguage(pos);
    else PciApp.Setup.selectNext(pos);
    
  },

  
  load: function ()
  {
    var defLoad = $.Deferred();
    var defSearch = PciApp.Db.getSettings();
    defSearch.done(function(){
      defLoad.resolve()
    });
    return defLoad;
  },

  getValue: function (par_strKey)
  {
    for (var i=0; i<PciApp.Setup.arSettings.length; i++)
    {
      if (PciApp.Setup.arSettings.item(i).Key == par_strKey)
        return PciApp.Setup.arSettings.item(i).Value;
    }
    return '';
  },
  
  overview: function()
  {
    var strHtml = '<div class="title">Country / Land</div>';
    strHtml += '<div id="setup_country_swipe" class="clip"><div id="pan_country" class="pan">';
    
    if (PciApp.Setup.checkConnection() != '') 
    {
      alert(PciApp.Setup.checkConnection());
      return; 
    }
    var defSetup = $.Deferred();
    PciApp.Db.getAppConfigData(defSetup);
    defSetup.done(function(par_arData)
    {
      PciApp.Setup.arCountrys = par_arData;      
      strHtml +='<div class="scroll_cnt" id="setup_country_-1"></div>';
      for (var i = 0; i < PciApp.Setup.arCountrys.length; i++)
//         strHtml = strHtml + '<div class="scroll_cnt" id="setup_country_'+ (i)+'" style="vertical-align:middle"><img src="images/'+ PciApp.Setup.arCountrys[i]['strImage']+'"><div class="pan_text">&nbsp;'+ PciApp.Setup.arCountrys[i]['strName'] +'</div></div>';     
         strHtml = strHtml + '<div class="scroll_cnt" id="setup_country_'+ (i)+'" style="vertical-align:middle">'+
         '<img src="'+PciApp.strIndexUrl+'api_json=getLangImage&flagname='+ PciApp.Setup.arCountrys[i]['strImage']+'"><div class="pan_text">&nbsp;'+ PciApp.Setup.arCountrys[i]['strName'] +'</div></div>';     
      
      strHtml += '</div></div>';
      if (PciApp.Setup.arCountrys.length > 1)
      {
        $('#setup_country').html("").append(strHtml);
        $('#setup_language').css('display', 'none');
      }
      else 
        $('#setup_country').css('display', 'none');
        
      $('#setup_next').css('display', 'none');    
//      $("#setup_country_swipe").bind("swipeup", function() {PciApp.Setup.next("country");});
//      $("#setup_country_swipe").bind("swipedown", function() {PciApp.Setup.prev("country");});
      $("#setup_country").bind("swipeup", function() {PciApp.Setup.next("country");});
      $("#setup_country").bind("swipedown", function() {PciApp.Setup.prev("country");});
      $("#setup_country").find("div").bind("dragstart", function(ev) {ev.preventDefault(); });
      PciApp.Setup.update("country");
      
      var defSet = PciApp.Db.setSetting('LastUpdateTime', '0000-00-00');
      defSet.done(function()
      {
        PciApp.Setup.load();
      });
    });  
    PciApp.showPage('#setup');    
  },
  
  selectLanguage: function(par_iCountry)
  {
    PciApp.Setup.position_language = 0;
    PciApp.Setup.iCountry = par_iCountry;

    PciApp.Setup.arSearchIndex = PciApp.Setup.arCountrys[par_iCountry];
    $('#setup_language').css('display', '');
        
    var strHtml = '<div class="title">Language / Sprache</div>';
    strHtml += '<div id="setup_language_swipe" class="clip"><div id="pan_language" class="pan">';
    strHtml += '<div class="scroll_cnt" id="setup_language_-1"></div>';

    for (var i = 0; i < PciApp.Setup.arSearchIndex['arLang'].length; i++)
    {
       strHtml = strHtml + '<div id="setup_language_'+ (i)+
         '" class="scroll_cnt" style="vertical-align:middle"><img src="'+PciApp.strIndexUrl+'api_json=getLangImage&flagname='+ PciApp.Setup.arSearchIndex['arLang'][i]['strImage']+
         '"><div class="pan_text">&nbsp;'+ PciApp.Setup.arSearchIndex['arLang'][i]['strName'] +'</div></div>';     
    }
    strHtml += '</div></div>';
    $('#setup_language').html("").append(strHtml);    
    var position = $('#setup').find('#setup_language').position();
    $('body').scrollTop(position.top);
    
    $("#setup_language").unbind().bind("swipeup", function() {PciApp.Setup.next("language");});
    $("#setup_language").bind("swipedown", function() {PciApp.Setup.prev("language");});
    $("#setup_language").find("div").bind("dragstart", function(ev) {ev.preventDefault(); });
    PciApp.Setup.update("language");
  },

  
  selectNext: function(par_iLang)
  {
    $('#setup_next').css('display', '');
    
    PciApp.Setup.iLang = PciApp.Setup.arSearchIndex['arLang'][par_iLang]['id'];
    $('#next').css('display', 'block');
    $.jsperanto.init(function () {$('div#setup').find('#next').html($.t('next'));}, 
      {dictionary: false, dicoPath: 'locales', lang: 'language_'+PciApp.Setup.arSearchIndex['arLang'][PciApp.Setup.position_language]['strIsoCode'] , fallbackLang:"language_en"})    
    var position = $('#setup').find('#next').position();
    $('body').scrollTop(position.top);
  },
  
  save: function()
  {
    if (PciApp.Setup.checkConnection() != '') 
    {
      PciApp.showHint(PciApp.Setup.checkConnection(), false, true);
      return; 
    }
    PciApp.Db.setSetting('Size', '');
    PciApp.Db.setSetting('ConsultantVersion', '');
    PciApp.Db.setSetting('LastUpdateTime', '');
    PciApp.Db.setSetting('GeoDbVersion', '');
    PciApp.Db.setSetting('TechnicVersion', '');
    PciApp.Db.setSetting('LanguageVersion', '');
    PciApp.Db.setSetting('LogoVersion', '');
    PciApp.Db.setSetting('Color', '');
    PciApp.Db.setSetting('ColorVersion', '');
    PciApp.Db.setSetting('ImpressumVersion', '');
    PciApp.Db.setSetting('NewsVersion', '');
    PciApp.showHint($.t('hint_update_db'), false);
    var DefClean = $.Deferred();
    PciApp.Db.cleanSetupTables(DefClean);
    DefClean.done(function()
    {
      // Suchindex und Sprache setzen
      PciApp.Db.setSetting('Domain', PciApp.Setup.arSearchIndex['strDomain']);
      PciApp.Db.setSetting('Zip', PciApp.Setup.arSearchIndex['arZip']);
      var defSet1 = PciApp.Db.setSetting('SearchIndex', PciApp.Setup.arCountrys[PciApp.Setup.iCountry]['strSearchIndex']);
      defSet1.done(function()
      {
        PciApp.Db.setSetting('LangIsoCode', PciApp.Setup.arSearchIndex['arLang'][PciApp.Setup.position_language]['strIsoCode']);
        var defSet2 = PciApp.Db.setSetting('LangId', parseInt(PciApp.Setup.arSearchIndex['arLang'][PciApp.Setup.position_language]['id']));
        defSet2.done(function()
        {
          // daten laden
          var defLoadSet = PciApp.Setup.load();
          defLoadSet.done(function(){
            // update check
            // Ordner anlegen
            if (PciApp.bPhonegap)
            {
              PciApp.File.getDir(PciApp.Note.strDir);
              PciApp.File.getDir(PciApp.Project.strDir);
            }
            var defCheckUpdate = $.Deferred();
            PciApp.Db.checkForUpdate(defCheckUpdate);
            defCheckUpdate.done(function(){
              // update durchfÃ¼hren
              var DefUpdate = $.Deferred();
              PciApp.Db.update(DefUpdate);
              DefUpdate.done(function()
              {                    
                // update durchgefÃ¼hrt und neustart
                var defSet3 = PciApp.Db.setSetting('SetupDone', '1');
                defSet3.done(function()
                {
                  var defLoadSet2 = PciApp.Setup.load();
                  defLoadSet2.done(function(){
                    PciApp.init();
                    }); 
                });
              });
            });
          })
        });
      });
    });
  },
  
  checkConnection: function() 
  {
    if (!PciApp.bPhonegap) return '';
    var networkState = navigator.network.connection.type;
    if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) return $.t('hint_error_connection')+ '\n';
    return '';
  },

  getLangInfo: function(par_iId)
  {
    if (PciApp.Setup.getValue('LangIsoCode') != '') return {strIsoCode:PciApp.Setup.getValue('LangIsoCode')};
    switch(par_iId)
    {
      case 1: return {strIsoCode:'de'};
      case 2: return {strIsoCode:'en'};
      case 3: return {strIsoCode:'fr'};
      case 4: return {strIsoCode:'it'};
      case 9: return {strIsoCode:'nl'};
      case 22: return {strIsoCode:'fr'};
      default : return {strIsoCode:''};
    }
  },
  
  init: function()
  {
    var def = $.Deferred();
    $('div#setup').remove();
    
    $.ajax({
      url: "pages/setup.html",
      success: function (data) {
        if (PciApp.iTyp == 1)
          data = data.replace('PLACEHOLDER', '<img id="logo_background" src="images/background.png">');
        else data = data.replace('PLACEHOLDER', '');  
        $('body').append(data);
        def.resolve();
        $(window).resize();
      }, dataType: 'html'});
/*    if (PciApp.iTyp == 0)
      PciApp.Setup.arCountrys = [
      {strName : "Deutschland",  strSearchIndex : "Internet-Suchindex_PCI_D", strImage:'flag_de.png'},
      {strName : "Schweiz", strSearchIndex : "Internet-Suchindex_PCI_CH", strImage:'flag_ch.png'},
      {strName : "Österreich", strSearchIndex : "Internet-Suchindex_PCI_A", strImage:'flag_at.png'},
      {strName : "Niederlande", strSearchIndex : "Internet-Suchindex_PCI_NL", strImage:'flag_nl.png'},
      {strName : "France", strSearchIndex : "Internet-Searchindex_BASF_CC_France", strImage:'flag_fr.png'},
      ];
    if (PciApp.iTyp == 1)
      PciApp.Setup.arCountrys = [
      {strName : "FBT",  strSearchIndex : "Internet-Suchindex_PCI_FBT", strImage:'flag_de.png'}];
    if (PciApp.iTyp == 2)
      PciApp.Setup.arCountrys = [
      {strName : "", strSearchIndex : "", strImage:''},
      {strName : "Danmark", strSearchIndex : "Internet-Suchindex_PCI_DK", strImage:'flag_dk.jpg'},
      {strName : "Norge", strSearchIndex : "Internet-Suchindex_PCI_NO", strImage:'flag_no.jpg'},
      {strName : "Sverige", strSearchIndex : "Internet-Suchindex_PCI_SE", strImage:'flag_se.jpg'},
      {strName : "Ceská republika", strSearchIndex : "Internet-Suchindex_PCI_DK2", strImage:'flag_cz.jpg'},
      {strName : "Polska", strSearchIndex : "Suchindex_PCI_DK2", strImage:'flag_pl.jpg'},
      {strName : "Slovensko", strSearchIndex : "Suchindex_PCI_DK2", strImage:'flag_si.jpg'},
      ];*/
    return def;
  },
  
}


PciApp.UsageCalculater = {
  overview: function(par_iId, par_strName)
  { 
    var DefArt = PciApp.Db.getArticleToProduct(par_iId);
    DefArt.done(function(resultArt)
    {
      var defSearch = PciApp.Db.searchCalc(par_iId);
      defSearch.done(function(result)
      {
        var strText = result['Code']+'<form action="" name="verbrauchsberechnung">'+result['Html']+'</form>';
        var data = strText.replace(/font-size/g, '');
        var dom = $(data);
        var strLink = '';
        dom.find(".verbrauchsberechnung-grau").each(function(index) 
        {
          // sin immer 2 mal pro zeile mitte das input 
          // erste is der Name nach dem wird gesucht und link zusammen gestellt
          // beim 2.ten wird das Image incl link angehängt
          if (strLink == '')
          {
            var strInput = $(this).parent().find("input").attr('name');
            for (var i=0; i<resultArt.length;i++)
            {
              if ($(this).html().indexOf(resultArt.item(i).Name) >= 0)
              {
                strLink = '<a onclick="PciApp.MaterialList.showAdd(\''+ par_iId +'\', \'' + par_strName +
                '\', \''+resultArt.item(i).Name+'\', \''+ resultArt.item(i).EanNr +'\', window.document.verbrauchsberechnung.'+ strInput +'.value, \''+ resultArt.item(i).Color +'\')"><img style="vertical-align:middle" src="images/list.png"></a>'
                break;
              }  
            }
          }  
          else 
          {
             $(this).html($(this).html()+ strLink);
             strLink = '';
          }
        });
        $('div#usagecalculater').find('#calculater').html("").append(dom).trigger("create");
        PciApp.showPage('#usagecalculater');
      });
    });
  },
  
  init: function()
  {
    $('div#usagecalculater').remove();
    
    var DefLoadCalc = PciApp.loadPage("pages/usagecalculater.html");
    DefLoadCalc.done(function(data) {
      $('body').append(data); 
      $('div#usagecalculater').find('h1').html($.t('calculater'));
      $('div#usagecalculater').find("#menu_list_pointer").html($('#menu_list').html());
      $(window).resize();
  });
  }
}

(function() {
    var supportTouch = PciApp.bPhonegap;
    var scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
            touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
            
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
        swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

})(); 


PciApp = {
  strIndexUrl: '',
  bPhonegap: false,
  bAllDownload: false, 
  bUrgentDownload: false,
  
  loadLogo: function()
  {
    if (!PciApp.bPhonegap)
      $('div#home').find("#menu_logo").attr("src","images/icon/logo.png");
    else
    {
      PciApp.File.exists("logo.png", function()
      {
        var defFile = PciApp.File.getFile("logo.png", false);  
        defFile.done( function (fileentry) {
          var strFilePath = PciApp.File.getDeviceName(fileentry.fullPath);
          $('div#home').find('#menu_logo').attr("src", strFilePath+"?timestamp=" + new Date().getTime());
        });
      }, function () 
      {
        $('div#home').find("#menu_logo").attr("src","images/icon/logo.png"+"?timestamp=" + new Date().getTime());
      });
    }  
  },
  
  init: function(par_bReload)
  {
    var DefLoadLang = PciApp.loadLang();
    DefLoadLang.done(function()
    {
      if (par_bReload != true)
        $('div#home').remove();       
      
      var DefLoadMenu = PciApp.loadPage("pages/menu.html");
      DefLoadMenu.done(function(data) {
        data = data.replace("!IMPRESSUM!", $.t('impressum'));
        if (PciApp.iTyp == 1)
          data = data.replace('PLACEHOLDER', '<div><img id="logo_background" src="images/background.png"><img id="menu_logo" class="menu_logo_fbt" src=""></div>');      
        else data = data.replace('PLACEHOLDER', '<img id="menu_logo" class="menu_logo_pci" src="">');      
          
        
        if (par_bReload != true)
          $('body').append(data); 
        $('div#home').find("#head").html($.t('menu_head'));
        $('div#home').find("#menu_product span").html($.t('products'));
        $('div#home').find("#menu_contact span").html($.t('contact'));
        $('div#home').find("#menu_qrcode span").html($.t('qr-code scanner'));
        $('div#home').find("#menu_service span").html($.t('service'));
        $('div#home').find("#menu_update span").html($.t('update'));      
        $('div#home').find("#menu_news span").html($.t('news'));
        $('div#home').find("#menu_internet span").html($.t('pci on internet'));
        $('div#home').find("#menu_materiallist span").html($.t('materiallist'));
        $('div#home').find("#menu_settings span").html($.t('settings'))
        $('div#home').find("#menu_list_pointer").html($('#menu_list').html());
        if (par_bReload != true)
          PciApp.showPage('#home');
        if ($('div#home').find('.ui-header').find('a').length > 1)
          $('div#home').find('.ui-header').find('a').each(function(index) 
          {
            if (index == 0) $(this).remove();
          });


        // logo              
        PciApp.loadLogo();
        
        if (PciApp.Setup.getValue("strNewsUrl") == '')    
          $('div#home').find("#menu_news").css("display", "none");
        else $('div#home').find("#menu_news").css("display", "inline-block");
        
        
        
        
        

        $.mobile.page.prototype.options.backBtnText = $.t('back');
        PciApp.Product.init();
        PciApp.Project.init();
        PciApp.Note.init();
        PciApp.Measurement.init();
        PciApp.TechnicCorner.init();
        PciApp.Color.init();
        PciApp.Hotline.init();
        PciApp.Settings.init();
        PciApp.Consultant.init();
        PciApp.EmailAdress.init();
        PciApp.Hint.init();
        PciApp.Impressum.init();
        PciApp.Merchant.init();
        PciApp.MaterialList.init();
        PciApp.Image.init();
        PciApp.UsageCalculater.init();
        PciApp.News.init();
      });
    });
  },
};



steal.loading('cordova ready');
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() 
{
  steal.loaded('cordova ready');
  PciApp.bPhonegap = true;
}

PciApp.bIsIOS = (navigator.userAgent.toLowerCase().match(/iphone/) || navigator.userAgent.toLowerCase().match(/ipad/));
PciApp.bIsAndroid = navigator.userAgent.toLowerCase().match(/android/);
PciApp.bIsBlack = navigator.userAgent.toLowerCase().match(/blackberry/);


//if (PciApp.bIsIOS || PciApp.bIsAndroid) PciApp.bPhonegap = true;
if (PciApp.bIsIOS || PciApp.bIsAndroid || PciApp.bIsBlack) PciApp.bPhonegap = true;


//if ((!PciApp.bIsIOS && !PciApp.bIsAndroid) || cordova != undefined ) 
if ((!PciApp.bIsIOS && !PciApp.bIsAndroid && !PciApp.bIsBlack) || cordova != undefined ) 
{
  steal.loaded('cordova ready');
}



steal(
  'jquery-1.6.4.js',
  'jqm/jquery.mobile-1.1.1.css',
  'jqm/pci.min.css',
  'pciapp.css',
  'setup.js',    
  'db/db.js',
  'md5.js',
  'filesystem/filesystem.js',
  function ()
  {
    if (Math.max($(window).height(),$(window).width()) < 800)
      steal('pciapp_small.css');
      
    steal.loading('db ready');
    var defDb = $.Deferred();
    PciApp.Db.updateDb(defDb, false);
    defDb.done(function()
    {
      var def = PciApp.Setup.load();
      def.done(function() {
        steal.loaded('db ready'); });
    });
  }).then(
  'db ready',
  function () {
    // jQueryMobile Konfigurieren
    $(document).bind("mobileinit", function(){
      $.mobile.defaultPageTransition = 'none';    
      $.mobile.defaultDialogTransition = 'none';    
      $.mobile.page.prototype.options.addBackBtn = true;
      $.mobile.page.prototype.options.domCache = false;
      $.mobile.ajaxFormsEnabled = false;
      $.mobile.ajaxLinksEnabled = false;
    });
      
    $(window).resize( function(){
    var height = $(window).height();
    var width = $(window).width(); 
    var ob = $('html');
    if (PciApp.bIsBlack) 
    {
      ob.find('#background-img').remove();
      ob.find('.background_image').css('background-color', '#cdbeb4');
    }
    else
    {
      ob.find('#background-img').remove();
      if (PciApp.iTyp != 1 )
        ob.find('.background_image').css('background-color', '#cfc1b4');
      if (PciApp.iTyp == 1)
        ob.find('.background_image').css('background-color', '#d8d8d8');  
      if( width > height ) {
          ob.find('#background-img_menu').attr('src','images/background.jpg');
      }else{
          ob.find('#background-img_menu').attr('src','images/background_portrait.jpg');
      }
    }  
    // gibts auch nochma im Matierallist den aufruf    
    var iWidth = (width-190)/width*100;
    $('div#materiallist').find('#article_entry_name').parent().css('width', iWidth+'%');
    $('div#materiallist').find('.list_entry_name').parent().css('width', iWidth+'%');
    
    });
  })
.then(
  'jqm/jquery.mobile-1.1.1.js',
  'config.js')
.then('cordova ready')
.then(
  'jquery.jsperanto.js',
  'project.js',    
  'product.js',    
  'color.js',    
  'note.js',
  'image.js',
  'materiallist.js',
  'barcode.js',    
  'measurement.js',
  'techniccorner.js',
  'emailadress.js',    
  'consultant.js',
  'hotline.js',
  'printplugin.js',  
  'news.js',  
  'impressum.js',  
  'settings.js',    
  'merchant.js',    
  'usagecalculater.js',
  'hint.js',
//  'jquery_swipe_updown.js',
  'jquery_transform.js',
  function ()
  { 
    steal.loading('jsperanto_init_done.js');  
    var arInfo = PciApp.Setup.getLangInfo(PciApp.Setup.getValue('LangId'))
    $.jsperanto.init(function () { steal.loaded('jsperanto_init_done.js'); }, 
      {dicoPath: 'locales', lang: 'language_'+arInfo['strIsoCode'] , fallbackLang:"language_en"}); 
  }, 
  function() {
    if (!PciApp.bPhonegap) PciApp.strIndexUrl = PciApp.strIndexUrl.replace('localhost', PciApp.strLocalIp);    
     
  }).then(
  'jsperanto_init_done.js', {src: "jsperanto_init_done.js",ignore: true},
  function () {
    PciApp.File.checkOldFolder(); 
    $('body').css('display', 'block');
    if (PciApp.bIsBlack)
      $.ajaxSetup({timeout: 500000});
    else    
      $.ajaxSetup({timeout: 120000});
 
    var defInit = PciApp.Setup.init();
    defInit.done(function()
    {
      $.mobile.initializePage();
      if (PciApp.Setup.getValue('SetupDone') == "")
        PciApp.Setup.overview();  
      else
        PciApp.init();
      $('body').css('display', 'block');
          
    });    
    $('body').css('display', 'none');

  $(function() {
    $('div#home').live('pageshow', function(e, ui) {
    PciApp.Db.checkForUpdate();
    if (PciApp.Setup.getValue("strNewsUrl") == '')    
      $('div#home').find("#menu_news").css("display", "none");
    else $('div#home').find("#menu_news").css("display", "inline-block");
    
  });
  
  $('div#menu_list').live('pagebeforeshow', function(e, ui) {
    if (PciApp.leave()) navigator.app.exitApp();
    else
    {
      if (PciApp.Setup.getValue('SetupDone') == '')
        PciApp.showPage('#setup');
      else PciApp.showPage('#home');
    }
    
  }); 
  
  $('div#setup').live('pagebeforeshow', function(e, ui) {
    if (PciApp.Setup.getValue('SetupDone') == '1')
    {
      if (PciApp.leave()) navigator.app.exitApp();
      else PciApp.showPage('#home');
    }  
  });  

  $('div#settings').live('pagebeforeshow', function(e, ui) {
    if (PciApp.Setup.getValue('SetupDone') == '')
    {
      if (PciApp.leave()) navigator.app.exitApp();
      else PciApp.showPage('#setup');
    }  
  });  
  
  
  $('div#note_details').live('pagehide', function(e, ui) {
    PciApp.Note.recordAudioStop();
    PciApp.Note.stopAudio();
  });

  $('div#search').live('pagehide', function(e, ui) {
    PciApp.Product.bDownloadThumb = false;
  });
  
  
  $('div#prod_details').live('pagehide', function(e, ui) {
    PciApp.Product.history = -1;
    if (PciApp.bIsIOS)
    {
      $('div#prod_details').find('#details_video').find('video').each(function(){
        jQuery(this).get(0).pause();
      });
    ;
    }
  });

  $('div#prod_system_details').live('pagehide', function(e, ui) {
    $('div#prod_system_details').find('#details_video').empty();
  });
  
  
  $('div#maps').live('pagehide', function(e, ui) {
    $('div#maps').remove();
    delete window.google; 
  });

  
  // hintergrund fÃ¼r Dialoge setzen
  $('div[data-role="dialog"]').live('pagebeforeshow', function(e, ui) {
    ui.prevPage.addClass("ui-dialog-background ");
  });
  // flackern ios unterbinden
  $('div[data-role="dialog"]').live('pageshow',function(event, ui){
    $('body').scrollTop(1);
  });
  
  $('div[data-role="dialog"]').live('pagehide', function(e, ui) {
    $(".ui-dialog-background ").removeClass("ui-dialog-background ");
  });
  });
  
PciApp.leave = function()
{
  var strHint = $.t('hint_leave');
  if (strHint == 'hint_leave') strHint = 'Wollen Sie die App verlassen ?';
  return confirm(strHint);
}  
  
PciApp.print = function (par_strText)
{  
  var strText = '<!DOCTYPE HTML><html><head><meta name="format-detection" content="telephone=no"></head><body>' + par_strText+
    '</body></html>';
    PrintPlugin.print(strText,
       function(result) {
         //   alert("Printing successful");
       },
       function(result) {
         if (!result.available){
           alert("Printing is not available");
         }
         else{
          //Localised error description
          //       alert(result.error);
        }
      });
};
  
PciApp.loadLang = function()
{
  var arInfo = PciApp.Setup.getLangInfo(PciApp.Setup.getValue('LangId'));
  var DefLoad = $.Deferred();
  data = PciApp.Setup.getValue('Language');
  if (data != '')
    $.jsperanto.init(function () {DefLoad.resolve();}, 
      {dictionary: jQuery.parseJSON(data), lang: '' , fallbackLang:""}); 
  else
    $.jsperanto.init(function () { DefLoad.resolve(); }, 
      {dicoPath: 'locales', lang: 'language_'+arInfo['strIsoCode'] , fallbackLang:"language_en"}); 

  return DefLoad;  
}  
  
PciApp.addContact = function(par_strName, par_strPhone, par_strEmail, par_strUrl, par_strAdress)
{
  var contact = navigator.contacts.create();
  var arPhoneNumbers = [];
  var arEmails = [];
  var arUrls = [];
  var arAdress = [];
  // name 
  if (par_strName != undefined)
  {
    var arName = par_strName.split(";");
    var name = new ContactName();
    if (arName[1] != undefined) 
      name.givenName = arName[1];
    name.familyName = arName[0];
    contact.name = name;
  }  
  if (par_strPhone != undefined)
    arPhoneNumbers[0] = new ContactField('work', par_strPhone, true);
  if (par_strUrl != undefined)
    arUrls[0] = new ContactField('work', par_strUrl, true);
  if (par_strEmail != undefined)
    arEmails[0] = new ContactField('work', par_strEmail, true);

  if (par_strAdress != undefined)
  {  
    var arDummy = par_strAdress.split(':');
    arAdress[0] = new ContactAddress(true, 'work', '', arDummy[0], arDummy[1], '', arDummy[2], '');
  }

  // save to device
  contact.phoneNumbers = arPhoneNumbers;
  contact.emails = arEmails;
  contact.urls = arUrls;
  contact.addresses = arAdress;
  contact.save(function(){
    $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
      .fadeIn(200).html('').append($.t("hint_contact_success")).fadeOut(3000);      
    },function(){
    $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
      .fadeIn(200).html('').append($.t("hint_contact_error")).fadeOut(3000);      
  });
},
  
  
PciApp.showPdf = function (par_strFile)
{  
  if (PciApp.bIsAndroid)  PhoneGap.exec(null, null, "PdfViewer", "showPdf", [par_strFile]);
  else if (PciApp.bIsIOS) PhoneGap.exec(null, null, "ChildBrowser", "showWebPage", [par_strFile, "", ""]);
  else if (PciApp.bIsBlack)
  {    
  var url = "http://docs.google.com/gview?embedded=true&url="+ escape(par_strFile);
  window.plugins.childBrowser.openExternal(url, { showLocationBar: false });
  }
  else $('body').append('<iframe src="' + par_strFile + '"></iframe>');
};

PciApp.CancelAllDownload = function()
{
  PciApp.File.arAllFiles = [];
  PciApp.bAllDownload = false;
  PciApp.showHint('', true, false, false);
  $('div#settings').find('#offline').removeClass('ui-disabled');
};

PciApp.downloadFile = function(fileUrl, dirName, fileName, overwrite, win, fail) {
//  navigator.notification.alert('url: '+fileUrl+' to dir: '+dirName + ' to file: '+fileName);
  if (overwrite == false)
    overwrite = "false";
  else
    overwrite = "true";
  if (PciApp.bIsBlack)
  {
    var ft = new FileTransfer();
    var Def = PciApp.File.getDir(dirName.replace(PciApp.File.strDir+'/', ''));
    Def.done(function(dirEntry)
    {
      ft.download(encodeURI(fileUrl),dirEntry.fullPath+'/'+fileName, win, fail);
    });
  }  
  else PhoneGap.exec(win, fail, "Downloader", "downloadFile", [ fileUrl, dirName, fileName, overwrite ]);
}

PciApp.sendEmail = function(par_strReceiver, par_Subject, par_Body, par_arFiles)
{
  if (par_arFiles == undefined) par_arFiles = [];
  if (PciApp.bIsAndroid)  
    PhoneGap.exec(null, null, "email", "send", 
      [par_strReceiver, par_Subject, par_Body, par_arFiles]); 
  if (PciApp.bIsIOS)
    PhoneGap.exec(null, null, "ChildBrowser", "sendEmail",
   [par_strReceiver, par_Subject, par_Body, par_arFiles]);
//    PhoneGap.exec(null, null, "EmailComposer", "showEmailComposer",
},

PciApp.playVideo = function(par_mixValue)
{
  if (PciApp.bIsAndroid)  
    PhoneGap.exec(null, null,"VideoPlayer", "playVideo", [par_mixValue]);
  if (PciApp.bIsIOS)
  {
    if (jQuery("#"+par_mixValue).css("display") == "none")
      jQuery("#"+par_mixValue).get(0).play();
    else
      jQuery("#"+par_mixValue).get(0).pause();
   jQuery("#"+par_mixValue).toggle();
        
  }
},

PciApp.showPage = function(par_strPage)
{
  $.mobile.changePage(par_strPage);
}

PciApp.loadPage = function(par_strHtmlFile)
{
  var DefLoadSite = $.Deferred();
  $.ajax({
    url: par_strHtmlFile,
    success: function (data) {
     DefLoadSite.resolve(data); 
    },
    dataType: 'html'}).fail(function(jqXHR, textStatus) { DefLoadSite.resolve(''); });
  return DefLoadSite;
}

PciApp.showTip = function()
{
  PciApp.openLink(PciApp.Setup.getValue("strTipsUrl"));
};

PciApp.showNews = function()
{
  PciApp.openLink(PciApp.Setup.getValue("strNewsUrl"));
};                          

PciApp.showVideo = function()
{
  PciApp.openLink(PciApp.Setup.getValue("strVideoUrl"));
};

PciApp.showFaq = function()
{
  PciApp.openLink(PciApp.Setup.getValue("strFaqUrl"));
};

PciApp.showSeminar = function()
{
  PciApp.openLink(PciApp.Setup.getValue("strSeminarUrl"));
};

PciApp.showPci = function()
{
  PciApp.openLink(PciApp.Setup.getValue("strPciUrl"));
};

PciApp.showSystem = function()
{
  PciApp.openLink(PciApp.Setup.getValue("strSystemUrl"));
};


PciApp.openLink = function(par_strSite)
{
  var strUrl = PciApp.Setup.getValue('Domain');
  if (strUrl != '') strUrl += '/'+par_strSite;
  PciApp.openUrl(strUrl);  
}

PciApp.openUrl = function(par_strUrl)
{
  if (PciApp.bIsIOS) PhoneGap.exec(null, null, "ChildBrowser", "showWebPage", [par_strUrl]);
  else if (PciApp.bIsBlack) 
    {
    function error(msg) {
        alert("An error occurred while browsing: " + msg);
    }
    window.plugins.childBrowser.onError = error;    
    window.plugins.childBrowser.showWebPage(par_strUrl, { showLocationBar: false });
    }
  
  else window.open(par_strUrl); 
}

function reachableCallback(reachability) 
{
  // There is no consistency on the format of reachability
  var networkState = reachability.code || reachability;
  var states = {};
  states[NetworkStatus.NOT_REACHABLE]                      = 'No network connection';
  states[NetworkStatus.REACHABLE_VIA_CARRIER_DATA_NETWORK] = 'Carrier data connection';
  states[NetworkStatus.REACHABLE_VIA_WIFI_NETWORK]         = 'WiFi connection';
  alert('Connection type: ' + states[networkState]);
}

PciApp.getCallLink = function(par_strNumber)
{
  if (navigator.userAgent.toLowerCase().match(/ipad/) || !PciApp.bPhonegap) return par_strNumber;
  return '<a href="tel:' +par_strNumber+'">'+par_strNumber+'</a>';
}

PciApp.makePhoto = function(success)
{    
  var Camera_qual = PciApp.Setup.getValue('Camera_qual');
  if (Camera_qual < 50) Camera_qual = PciApp.Settings.iDefaultCamera;  
  navigator.camera.getPicture(success, null, { quality: Camera_qual,
  destinationType: Camera.DestinationType.FILE_URI,
  correctOrientation: true,
  sourceType: Camera.PictureSourceType.CAMERA,}); 
}

PciApp.showGroup = function(par_link, par_bMenuCall)
{
  PciApp.showPage("#home");
    
  var strHotLineHref = 'tel:' + PciApp.Setup.getValue('strHotlineTel');
  var strHotLineClick = null;
  
  var bTablet = false;
    if (Math.max($(window).height(), $(window).width()) > 800) bTablet = true;    

  if (navigator.userAgent.toLowerCase().match(/ipad/) || !PciApp.bPhonegap || bTablet || strHotLineHref == 'tel:')  
  {
    strHotLineHref = '';
    strHotLineClick = PciApp.Hotline.overview;
  }
    
    
  var arGroups = {
    menu_product: {
      strImage: 'images/group/product.png', strTitle: $.t('products'), 
      iWidth: 38, iHeight:52, strDesc: $.t('product_desc'),
      arButtons: [
        {strName: $.t('product search'), click: PciApp.Product.overview },
        {strName: $.t('colorshade'), click: PciApp.Color.overview },
        {strName: $.t('system'), click: PciApp.showSystem },
        {strName: $.t('video'), click: PciApp.showVideo },
        {strName: $.t('faq'), click: PciApp.showFaq },
        {strName: $.t('tip'), click: PciApp.showTip },
                     
        ] },
    menu_contact: {
      strImage: 'images/group/contact.png', strTitle: $.t('contact'),
      iWidth: 53, iHeight:41, strDesc: $.t('contact_desc'),
      arButtons: [
        {strName: $.t('technic hotline'), href: strHotLineHref, click: strHotLineClick},
        {strName: $.t('project_detector'), click: PciApp.Project.hint },
        {strName: $.t('consultant_search'), click: PciApp.Consultant.overview },
        {strName: $.t('merchant_search'), click: PciApp.Merchant.overview },
          ] },
    menu_service: {
      strImage: 'images/group/service.png', strTitle: $.t('service'),
      iWidth: 50, iHeight:42, strDesc: $.t('service_desc'),
      arButtons: [
        {strName: $.t('note pad'), click: PciApp.Note.hint },
        {strName: $.t('measurement help'), click: PciApp.Measurement.hint },
        {strName: $.t('our advice'), click: PciApp.TechnicCorner.overview },
        {strName: $.t('video'), click: PciApp.showVideo },
        {strName: $.t('seminar'), click: PciApp.showSeminar },] },
    menu_qrcode: { click: PciApp.BarCode.showHintbeforeScan},
    menu_news: {click: PciApp.showNews},
    menu_internet: {click: PciApp.showPci},
    menu_settings: { click: PciApp.Settings.overview },
    menu_update: { click: PciApp.Db.update },
    menu_materiallist: { click: PciApp.MaterialList.overview }
  };
  // Links entfernen die keine Verlinkung auf Typo3 seite haben
  if (PciApp.Setup.getValue('strSeminarUrl') == '')
    arGroups['menu_service']['arButtons'].splice(4,1);
  if (PciApp.Setup.getValue('strVideoUrl') == '')
    arGroups['menu_service']['arButtons'].splice(3,1);
  if (PciApp.Setup.getValue('strTipsUrl') == '')
    arGroups['menu_product']['arButtons'].splice(5,1);
  if (PciApp.Setup.getValue('strFaqUrl') == '')
    arGroups['menu_product']['arButtons'].splice(4,1);
  if (PciApp.Setup.getValue('strVideoUrl') == '')
    arGroups['menu_product']['arButtons'].splice(3,1);
  if (PciApp.Setup.getValue('strSystemUrl') == '')
    arGroups['menu_product']['arButtons'].splice(2,1);
  
  // Händlersuche
  if (PciApp.Setup.getValue('bMerchant') == 'false')
    arGroups['menu_contact']['arButtons'].splice(3,1);
  
  
  // falls keine Zur Sache vorhanden ist diese ausblenden
  if (PciApp.Setup.getValue('TechnicHtml') == '')
    arGroups['menu_service']['arButtons'].splice(2,1);
  // falls keine hotline infos vorliegen  
  if (PciApp.Setup.getValue('strHotlineTel') == '' && PciApp.Setup.getValue('strHotlineEmail') == '')  
    arGroups['menu_contact']['arButtons'].splice(0,1);
  
  // FBT Ist anere Link anstatt Farbtonsuche
  if (PciApp.iTyp == 1)
    arGroups['menu_product']['arButtons'].splice(1,1);
  
  $('#home .actions img').removeClass('selected');
  if (par_link == null) 
  {
    $('#home .group').css('display', 'none');  
    $('body').scrollTop(0);
    return;  
  }

  
  var menu = $(par_link).parent();
  $('#home .actions').find('#'+menu.attr('id')).find('img').addClass('selected');  
  
  var arGroup = arGroups[menu.attr('id')];
  if (typeof(arGroup.click) != 'undefined') 
  {
    $('#home .group').css('display', 'none');
    $('body').scrollTop(0);
    arGroup.click();
    return;
  }  
  
  var group = $('#home .group');
  group.find('.head img').attr('src', arGroup['strImage']).attr('width', arGroup['iWidth']).attr('height', arGroup['iHeight']);
  group.find('.title').html(arGroup['strTitle']);  
  group.find('.desc').html(arGroup['strDesc']);
  
  var oldButtons = group.find('li');  
  for (var i in arGroup['arButtons']) {
    var button = $(oldButtons[0]).clone();
    var link = button.find('a');
    link.html(arGroup['arButtons'][i]['strName']);
    
    link.attr('href', ''); link.unbind('click');
    
    if (arGroup['arButtons'][i]['href'])
      link.attr('href', arGroup['arButtons'][i]['href']);
    else button.click(arGroup['arButtons'][i]['click']);
    
    group.find('ul').append(button);
  }
  oldButtons.remove();  
  
  group.css('display', 'inline-block');
  var position = $('#home .group').position();
  $('body').scrollTop(position.top);
  // probleme bei Andoird Tabelts wegen darstellung
  setTimeout(function(){;$('body').scrollTop(position.top+1);}, 20);
  
}

PciApp.showHint = function(par_strText, par_bMenu, par_bFadeOut, par_bCancel)
{
  if (par_bMenu)
  {
    $('span[id^="menu_hint"]').html(par_strText).fadeIn(20);
    if (par_bFadeOut)
      window.setTimeout(function(){$('span[id^="menu_hint"]').html('');}, 4000);
      
    if (par_bCancel)
      $('a[id^="menu_hint_cancel"]').css('display', 'inline-block');
    else
      $('a[id^="menu_hint_cancel"]').css('display', 'none');
  }
  else
  {
    if (par_strText == '')
    {
      $("div#hint_cnt").removeClass('ui-page ui-dialog ui-page-active').css('position', '').css('z-index', -1);
      $("div#hint").fadeOut(5000);
    }
    else 
    {
      $("div#hint_cnt").addClass('ui-page ui-dialog ui-page-active').css('position', 'fixed').css('z-index', 9999);                                           
      $("div#hint").css({"opacity": 0.96, "top": 150}).fadeIn(200).html('').append(par_strText);
      if (par_bFadeOut) 
      {
        $("div#hint_cnt").removeClass('ui-page ui-dialog ui-page-active').css('position', '').css('z-index', -1);
        $("#hint").fadeOut(5000);
      } 
    }
  }
}
  
PciApp.callFileSystem = function(success)
{
  navigator.camera.getPicture(success, null, 
    { quality: 100,
      destinationType: navigator.camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: navigator.camera.MediaType.PICTURE  });
}

});

PciApp.Impressum = {
  show: function (par_strImage)
  {
    $('div#impressum').find('#impressum_hint').html(PciApp.Setup.getValue('strImpressum'));
    PciApp.showPage('#impressum');          
  },
  

  init : function()
  {
    $('div#impressum').remove();       
    
    var DefLoadMail = PciApp.loadPage("pages/impressum.html");
    DefLoadMail.done(function(data) {
      $('body').append(data); 
      $('div#impressum').find('h1').html($.t('impressum'));
      
    });
  },
}      

PciApp.EmailAdress = {
  arSettings : new Array(),
  strCaller : "",
  
  overview: function ()
  {
    var defView = $.Deferred();
    var defLoad = PciApp.Setup.load();
    defLoad.done(function()
    {
      $('#emailadress').find('#emailadress_email_input').val(PciApp.Setup.getValue("EmailAdress"));
      defView.resolve();
    }); 
    $('div#emailadress').find('#contact_cnt').css('display', 'none');
    PciApp.showPage('#emailadress', 'none');          
    return defView;
  },
  
  save: function()
  { 
    PciApp.Db.setSetting('EmailAdress', $('#emailadress_email_input').val());  
    var defView = PciApp.EmailAdress.overview();
    defView.done(function()
    {
      switch (PciApp.EmailAdress.strCaller)
      {
        case 'note':
          PciApp.Note.sendEmail();
          var def = PciApp.Note.overview(true);
          def.done(function(){
            $('div#emailadress').dialog('close');
//            history.back(); 
            PciApp.Note.show(PciApp.Note.NoteId)});
        break;
        case 'measurement':
          PciApp.Measurement.sendEmail();
          var def = PciApp.Measurement.overview(true);
          def.done(function(){
            $('div#emailadress').dialog('close');
//            history.back(); 
            PciApp.Measurement.show(PciApp.Measurement.MeasurementId)});
        break;  
        case 'list':
          PciApp.MaterialList.sendEmail();
          PciApp.MaterialList.overview(true);
//          history.back();
          $('div#emailadress').dialog('close');
        break;  
        case 'export':
          PciApp.Hint.sendEmailExport();
          $('div#emailadress').dialog('close');
        break;  
      }
    });                    
  },      
  
  onSetContactEmail: function(par_strEmail)
  {
    $('div#emailadress').find('#emailadress_email_input').val(par_strEmail);
    $('div#emailadress').find('#contact_cnt').css('display', 'none');
  },
  
  onSearchContact: function() {
    $('div#emailadress').find('#contact_found').html("");
    $('div#emailadress').find('#contact_cnt').css('display', 'block');
    
    var options = new ContactFindOptions();
    options.filter="";          // empty search string returns all contacts
    options.multiple=true;      // return multiple results
    var fields = ["*"];
    navigator.contacts.find(fields, function(contacts){
      for (var i=0; i<contacts.length; i++) 
      {
        if (contacts[i].emails == null) continue;
        var strHtml = $('#contact_entry').html();
        for (var j=0; j<contacts[i].emails.length; j++)
        {
          
           if (contacts[i].emails[j].value == undefined) continue;
           strHtml = strHtml.replace('!NAME!', contacts[i].name.formatted).replace('!EMAIL!', contacts[i].emails[j].value);
           strHtml = strHtml.replace('0000', 'PciApp.EmailAdress.onSetContactEmail(\''+contacts[i].emails[j].value+'\')');
           $('div#emailadress').find('#contact_found').append(strHtml);
        }
      }
    }, null, options);
  },
    
  
  cancel: function()
  {
    switch (PciApp.EmailAdress.strCaller)
    {
      case 'note':
        var def = PciApp.Note.overview(true);
        def.done(function(){
          $('div#emailadress').dialog('close');
//          history.back(); 
          PciApp.Note.show(PciApp.Note.NoteId)});
      break;
      case 'measurement':
        var def = PciApp.Measurement.overview(true);
        def.done(function(){
          $('div#emailadress').dialog('close');
//          history.back(); 
          PciApp.Measurement.show(PciApp.Measurement.MeasurementId)});
      break;
      case 'list':
        PciApp.MaterialList.overview(true);
//        history.back();
        $('div#emailadress').dialog('close');
      break;
             
    }
  },   

  init : function()
  {
    $('div#emailadress').remove();       
    
    var DefLoadMail = PciApp.loadPage("pages/emailadress.html");
    DefLoadMail.done(function(data) {
      $('body').append(data); 
      $('div#emailadress').find('h1').html($.t('own_emailadress'));
      $('div#emailadress').find("#save").html($.t('save'));
      $('div#emailadress').find("#cancel").html($.t('cancel'));
    });
    
  },
}      

PciApp.Hotline = {
  overview: function()
  { 
    var strTel = PciApp.Setup.getValue('strHotlineTel');
    var strEmail = PciApp.Setup.getValue('strHotlineEmail');
    $('div#hotline_dialog').find("#hotline_hint").html("");
    if (strEmail != '')
      $('div#hotline_dialog').find("#hotline_hint").append($.t('email')+ " : <a onclick='PciApp.Hotline.showemail()'>"+ strEmail+'</a><br>');
    if (strTel != '')
      $('div#hotline_dialog').find("#hotline_hint").append($.t('phone')+ " : "+ strTel);
    
    $('div#hotline_dialog').find("#hotline_hint").css('display', 'block');
    $('div#hotline_dialog').find("#hotline_email").css('display', 'none');
    $('div#hotline_dialog').find("#ok").css('display', 'block');
    $('div#hotline_dialog').find("#group").css('display', 'none');
    $('div#hotline_dialog').find("#hotline_description_input").val("");
    $('div#hotline_dialog').trigger("create");
    PciApp.showPage('#hotline_dialog');
  },
  
  showemail: function()
  {
    $('div#hotline_dialog').find("#hotline_hint").css('display', 'none');
    $('div#hotline_dialog').find("#hotline_email").css('display', 'block');
    $('div#hotline_dialog').find("#ok").css('display', 'none');
    $('div#hotline_dialog').find("#group").css('display', 'block');
  },
  
  sendemail: function()
  {
    if ($('div#hotline_dialog').find("#hotline_name_input").val() == '' || $('div#hotline_dialog').find("#hotline_adress_input").val()== '' ||
      $('div#hotline_dialog').find("#hotline_description_input").val()== '')
    {
      $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
      .fadeIn(200).html('').append($.t('hint_error_hotline')).fadeOut(4000);      
      return ;    
    }  
    var strText = '';
    strText += $.t('name')+': '+ $('div#hotline_dialog').find("#hotline_name_input").val()+'<br>'+ 
      $.t('adress')+ ': '+ $('div#hotline_dialog').find("#hotline_adress_input").val() + '<br>';
    if ($('div#hotline_dialog').find("#hotline_tel_input").val() != '')
      strText += $.t('phone optional') + ': '+ $('div#hotline_dialog').find("#hotline_tel_input").val()+ '<br>';
    strText += $.t('request')+ ': '+  $('div#hotline_dialog').find("#hotline_description_input").val();

    PciApp.sendEmail(PciApp.Setup.getValue('strHotlineEmail'), $.t('hotline subject'), strText, []);
    history.back();
  },
  
  cancel: function()
  {
    history.back();
  },
  
  init: function()
  {
    $('div#hotline_dialog').remove();
    
    var DefLoadCalc = PciApp.loadPage("pages/hotline.html");
    DefLoadCalc.done(function(data) {
      $('body').append(data); 
      $('div#hotline_dialog').find('h1').html($.t('technic hotline'));
      $('div#hotline_dialog').find("#ok").html($.t('ok'));
      $('div#hotline_dialog').find("#cancel").html($.t('cancel'));
      $('div#hotline_dialog').find("#save").html($.t('send'));
      $('div#hotline_dialog').find("#hotline_name").html($.t('name'));
      $('div#hotline_dialog').find("#hotline_adress").html($.t('adress'));
      $('div#hotline_dialog').find("#hotline_tel").html($.t('phone optional'));
      $('div#hotline_dialog').find("#hotline_description").html($.t('request'));
  });
  }
}

function clearFolder(par_strPath, par_arFiles)
{
  var defDir = PciApp.File.getDir(par_strPath);
  var defDirDel = $.Deferred();
  defDir.done( function (dir) {
    var directoryReader = dir.createReader();
    // Get a list of all the entries in the directory
    directoryReader.readEntries(function (entries) 
    {
      for (var i=0; i<entries.length; i++)
        if (jQuery.inArray(entries[i].name, par_arFiles) >= 0 || par_arFiles.length == 0)
          entries[i].remove();

      defDirDel.resolve();  
    },
    function fail(error) 
    {
      defDirDel.resolve();  
      alert("Failed to list directory contents: " + error.code);
    });
  });
  return defDirDel;
}
        
function loadAllFiles()
{
  if (!PciApp.bAllDownload) return;
  if (PciApp.bUrgentDownload) return;   
  
  var strCall = '';
  for (var strTyp in PciApp.File.arAllFiles)
    if (PciApp.File.arAllFiles[strTyp].length > 0)
    {      
      strCall = PciApp.File.arAllFiles[strTyp].pop();  
      break;
    }  
  
  if (strCall == '')
  {
    PciApp.showHint('', true, false, false);
    PciApp.File.arAllFiles = [];
    PciApp.bAllDownload = false;
    $('div#settings').find('#offline').removeClass('ui-disabled');
    return;
  }

  var strUrl = getUrl(strTyp);
  var strFile = getFileId(strCall, strTyp);
  if (strFile == '') 
  {
    loadAllFiles();
    return;
  }
  PciApp.showHint($.t('hint_load_allfiles', {i: PciApp.File.iDone, j: PciApp.File.iCount}), true, false, true);
  PciApp.File.exists(strTyp +'/'+ strFile, function () 
  {
    PciApp.File.iDone++;
    window.setTimeout("loadAllFiles()", 30);
    return;
  }, function () 
  { 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, PciApp.File.iFreeMemory, 
    function ()
    {
      PciApp.downloadFile(strUrl + strCall, PciApp.File.strDir+'/'+strTyp, strFile, true, 
      function(data) 
      {
        PciApp.File.iDone++;
        loadAllFiles();
        return;
      }, function (data) 
      {
        PciApp.File.iDone++;
        console.log("fehler beim aufruf");
        loadAllFiles();
        return;
      });  
    }
    , function()
    { 
      PciApp.showHint('', true, false, false);
      PciApp.Hint.show(4); return;}); 
  });     
  return;
}


function downloadAllFiles(par_bImage, par_bTechnical, par_bSafety)
{
  if (PciApp.Setup.checkConnection() != '') 
  {
    $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
      .fadeIn(200).html('').append(PciApp.Setup.checkConnection()).fadeOut(4000);      
    return; 
  }
  $('div#settings').find('#offline').addClass('ui-disabled');
  PciApp.showHint($.t('hint_update_db'), true, false, true);
  PciApp.bAllDownload = true;       
  if (!PciApp.bPhonegap) return;     
  var createDir = $.Deferred();
  var defDir = PciApp.File.getDir('');      
  defDir.done(function()
  {
    createDir.resolve();
  })  
  var createDir2 = $.Deferred();
  createDir.done(function()
  {
    var DefDir2 = PciApp.File.getDir('images');      
    DefDir2.done(function(){createDir2.resolve();});
  }); 
  var createDir3 = $.Deferred();
  createDir2.done(function()
  {
    var DefDir3 = PciApp.File.getDir('technical');      
    DefDir3.done(function(){createDir3.resolve();});
  }); 
  var createDir4 = $.Deferred();
  createDir3.done(function()
  {
    var DefDir4 = PciApp.File.getDir('safety');      
    DefDir4.done(function(){createDir4.resolve();});
  }); 
    
  createDir4.done(function()
  {
    var defUrls = PciApp.Db.getAllFiles();
    defUrls.done(function(arData)
    {
      var iCount = 0;
      if (par_bImage)
        iCount = iCount+arData['images'].length;
      else arData['images'] = [];
      if (par_bTechnical)
        iCount = iCount+arData['technical'].length;
      else arData['technical'] = [];
      if (par_bSafety)
        iCount = iCount+arData['safety'].length;
      else arData['safety'] = [];
      PciApp.File.arAllFiles = arData; 
      PciApp.File.iCount = iCount;
      PciApp.File.iDone = 0;
      loadAllFiles();
    });   
  }
  );      
}

function downloadThumbNails(par_iIndex)
{
  if (par_iIndex !== undefined)
  {
    PciApp.Product.arThumbs.push(par_iIndex);
    $('div#search').find('#'+PciApp.Product.arEntrys.item(par_iIndex).Id)[0].onerror = null;
    
    if (!PciApp.Product.bDownloadThumb) 
    {
      PciApp.Product.bDownloadThumb = true;
      downloadThumbNails(); 
    }
    return;
  }  
  if (!PciApp.Product.bDownloadThumb) return;
  
  if (PciApp.Product.arThumbs.length > 0)
  { 
    iIndex = PciApp.Product.arThumbs.shift();
    defLoad = $.Deferred();
    loadFile(PciApp.Product.arEntrys.item(iIndex).ImageUrl, 'images', true, 0, 'search', PciApp.Product.arEntrys.item(iIndex).Id, defLoad); 
    defLoad.done(function(par_strUrl, par_elm)
    {
      if (par_strUrl !== false)
        $('div#search').find('#'+par_elm).attr('src', par_strUrl).css('visibility', 'visible');      
      downloadThumbNails();
    })
  }
  else PciApp.Product.bDownloadThumb = false;
}

function getUrl(par_strPath)
{
  if (par_strPath == 'images')
    return PciApp.Setup.getValue('Papi');
  if (par_strPath == PciApp.TechnicCorner.strDir)  
    return '';
  return PciApp.Setup.getValue('Doc');  
}

function getFileId(par_strCall, par_strPath)
{
  if (par_strPath == PciApp.TechnicCorner.strDir)
  {
    var arUrl = par_strCall.split('/');
    return arUrl.pop();
  }

  if (par_strPath == 'images')
  {
    var strSearch = '0=';
    var strExt = '.jpg';
  }
  else
  {
    var strSearch = 'file=';
    var strExt = '.pdf';
  }
  
  // id extrahieren als filename
  var strFile = '';
  var arUrl = par_strCall.split('&');
  for (var i=0; i<arUrl.length;i++)
  {
    if (arUrl[i].indexOf(strSearch) != -1)
    {
      var arFile = arUrl[i].split('=');
      strFile = arFile[1]+ strExt;
    }
  }
  return strFile;
}

function loadFile (par_strCall, par_strPath, par_bSilent, par_iCount, par_strPage, par_elm, par_Def)
{
  if (par_bSilent === undefined) par_bSilent = false;
  if (par_elm === undefined) par_elm = false;
  if (par_Def === undefined) par_Def = false;
  if (par_iCount === undefined) par_iCount = 1;
  else par_iCount++; 
  var strUrl = getUrl(par_strPath);
  if (!PciApp.bPhonegap)
  {
    if (par_strPath == 'images')
    {
      if (par_elm !== false) par_Def.resolve(strUrl + par_strCall, par_elm);
      // $('div#'+par_strPage).find('#'+par_elm).attr('src', strUrl + par_strCall).css('visibility', 'visible');
      else $('div#'+par_strPage).find('#details_img').attr('src', strUrl + par_strCall);
    }
    else PciApp.showPdf(strUrl + par_strCall);
  }
  else
  {
    var strFile = getFileId(par_strCall, par_strPath);
    if (strFile == '') 
    {
      if (par_elm !== false) par_Def.resolve(false, par_elm);
      return;
    }
    else
    {
      if (PciApp.bIsBlack && par_strPath != 'images')
        PciApp.showPdf(strUrl + par_strCall);  
      else
      PciApp.File.exists(par_strPath +'/'+ strFile, function () {
        var defFile = PciApp.File.getFile(par_strPath +'/'+strFile, false);  
        defFile.done( function (fileentry) {
          var strFilePath = PciApp.File.getDeviceName(fileentry.fullPath);
          if (par_strPath == 'images') 
          {                                     
            if (par_elm !== false) par_Def.resolve(strFilePath+'?'+Math.random(), par_elm);
            else $('div#'+par_strPage).find('#details_img').attr('src', strFilePath); 
          }
          else PciApp.showPdf(strFilePath);
        });
      }, function () 
      {
        if (!par_bSilent)
          $("#hint").css({"opacity": 0.96, "top": $('#searchBox').scrollTop() + 150 })
            .fadeIn(200).html('').append($.t('hint_update_db'));
        
        // prüfzeugnisse vorher löschen        
        var def = clearFolder('cert', new Array()); 
        def.done(function()
        {
          PciApp.bUrgentDownload = true;
          PciApp.downloadFile(strUrl + par_strCall, PciApp.File.strDir+'/'+par_strPath, strFile, true, 
          function(data) 
          {
            PciApp.bUrgentDownload = false;
            loadAllFiles()
            $('#hint').fadeOut(400);            
            if (par_iCount < 4)
              loadFile(par_strCall, par_strPath, par_bSilent, par_iCount, par_strPage, par_elm, par_Def) 
            else   
              $('#hint').html('').append($.t('hint_error_load_data')+ '<br>'+PciApp.Setup.checkConnection()).fadeOut(4000);            
          }, function (data) 
          {
            PciApp.bUrgentDownload = false;
            loadAllFiles()
            if (par_iCount < 4)
              loadFile(par_strCall, par_strPath, par_bSilent, par_iCount, par_strPage, par_elm, par_Def); 
            else   
              $('#hint').html('').append($.t('hint_error_load_data')+ '<br>'+PciApp.Setup.checkConnection()).fadeOut(4000);            
          });
        });
      });
    }  
  }
}

PciApp.File = {
  iFreeMemory : 100000000,
  arAllFiles:[], 
  iCount:0,
  iDone:0,
  
  checkOldFolder: function()
  {
    if (PciApp.iTyp == 0 && PciApp.bPhonegap)
    {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
          fileSystem.root.getDirectory('pciapp_cache', { create: false }, function(){PciApp.File.strDir = 'pciapp_cache';}, 
          function(){if (PciApp.bIsAndroid) PciApp.File.strDir = 'Android/data/'+PciApp.strName; else PciApp.File.strDir = PciApp.strName;});
      }, function(){if (PciApp.bIsAndroid) PciApp.File.strDir = 'Android/data/'+PciApp.strName; else PciApp.File.strDir = PciApp.strName;}); //
    }  
  } ,
  
  check: function(par_Def, par_mixReturn)
  {
    if (PciApp.bPhonegap) return true;
    
    par_Def.resolve(par_mixReturn);
    return false;  
  },
  
  read: function(par_strFile)
  {
    var defFile = this.getFile(par_strFile, false);  
    var defReader = $.Deferred();
    defFile.done( function (file) {
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        defReader.resolve(evt.target.result);
      };
      reader.readAsText(file);
    });  
    return defReader;
  },
  
  readAsData: function(par_strFile)
  {
    var defFile = this.getFile(par_strFile, false);  
    var defReader = $.Deferred();
    defFile.done( function (file) {
      var reader = new FileReader();
      reader.onloadend = function(evt) {
        defReader.resolve(evt.target.result);
      };
      reader.readAsDataURL(file);
    });  
    return defReader;
  },
  
  write: function (par_strFile, par_strBytes)
  {
    var fileentry;
    var defFile = this.getFile(par_strFile, true);  
    var defWriter = $.Deferred();
    defFile.done( function (file) {
      fileentry = file;
      file.createWriter(defWriter.resolve, null) });
      
    var defSuccess = $.Deferred();
    defWriter.done( function (writer) {
      writer.onwrite = defSuccess.resolve(fileentry);
      writer.write(par_strBytes);
      });
    
    return defSuccess;        
    
  },

  exists: function (par_strFile, par_callBackYes, par_callBackNo)
  {
    var defFile = this.getFile(par_strFile, false);
    defFile.done(function(){par_callBackYes()});
    defFile.fail(function(){par_callBackNo()});
  },
  
  
  getFile: function (par_strFile, par_bCreate)
  {
    var arFile = par_strFile.split('/');
    var strFile = arFile.pop();
    var DefSearch = PciApp.File.getDirEntries(arFile.join('/'), strFile, true);
    var defFile = $.Deferred();
    DefSearch.done( function (arEntries) {
      if (arEntries.length == 0 && !par_bCreate)
        defFile.reject();
      else
      {
        var defDir = PciApp.File.getDir(arFile.join('/'));
        defDir.done( function (dir) {
          dir.getFile(strFile, {create: par_bCreate, exclusive: false},
            function (fileentry) {defFile.resolve(fileentry);}, null);
        });
      }
    });
    return defFile;         
    
/*    var strFile = arFile.pop(); 
    var defDir = PciApp.File.getDir(arFile.join('/'));
    var defFile = $.Deferred();
    defDir.done( function (dir) {
      dir.getFile(strFile, {create: par_bCreate, exclusive: false},function (fileentry) {defFile.resolve(fileentry);}, defFile.reject); });
    return defFile;         */
                            
  },
  
  getSubDir: function (par_strPath, defDir, par_dir)
  {
    var arPath = par_strPath.split('/');
    var dirName = arPath.shift();
    if (dirName == '') defDir.resolve(par_dir);
    else
    {
      par_dir.getDirectory(dirName, {create: true, exclusive: false}, 
        function (dir) { PciApp.File.getSubDir(arPath.join('/') ,defDir, dir)}, null);
    }
  },

  getDir: function(par_strPath)
  {
    var defDir = $.Deferred();
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, 
    function (par_dir)
    {
      PciApp.File.getSubDir(PciApp.File.strDir+'/'+ par_strPath, defDir, par_dir.root)
    }
    , null);
    return defDir;
  },  
  
  getDirEntries: function(par_strFolder, par_strText, par_bStart)  
  {
    var defRes = $.Deferred();
    if (!PciApp.File.check(defRes, new Array())) return defRes;
    var defDir = PciApp.File.getDir(par_strFolder);
    defDir.done(function(dir)
    {
      var arFound = new Array();
      var directoryReader = dir.createReader();
      // Get a list of all the entries in the directory
      directoryReader.readEntries(function (entries) 
      {
        for (var i=0; i<entries.length; i++)
        {
          if ((par_bStart && entries[i].name.indexOf(par_strText) == 0) || (!par_bStart && entries[i].name.indexOf(par_strText) >= 0))
          {
            entries[i].fullPath = dir.fullPath+'/'+ entries[i].name;
            arFound.push(entries[i]);
          }    
        }      
        defRes.resolve(arFound);  
      },
      function fail(error) 
      {
        defDirDel.resolve(arFound);  
        alert("Failed to list directory contents: " + error.code);
      });
    });
    return defRes;
  },
  
  copy: function(fileentry, par_strPath, par_strFile)
  {
    var defCopy = $.Deferred();
    var def = PciApp.File.getDir(par_strPath);
    def.done(function(dir)
    {
      fileentry.copyTo(dir , par_strFile , function(newFileEntry)
      {
        defCopy.resolve(newFileEntry);  
      }, null); 
    });
    return defCopy;
  },
  
  getDeviceName: function(par_strPath)
  {
    if (PciApp.bIsBlack) return par_strPath;
    return par_strPath.replace('file://', '');
  },
  
  rename: function(fileEntry, par_strName)
  {
    var defRename = $.Deferred();
    var defFolder = $.Deferred();
    var folder1;
    var folder2;
    fileEntry.getParent(function (dir)
    {
      folder1 = dir;
      dir.getParent(function (dir2)
      {
        folder2 = dir2;
        defFolder.resolve();
      }, null);      
    }, null)
    
    defFolder.done(function()
    {
      fileEntry.moveTo(folder2, par_strName, function (newfileEntry)
      {
        newfileEntry.moveTo(folder1, par_strName, defRename.resolve());
      }, null);
    });
    return defRename;
  }
}




























    
        function initialize(Data) {
            var arEntrys = [];
            arEntrys.push({pos:new google.maps.LatLng(Data['StartLat'],Data['StartLong']),name:Data['Name2']});
            arEntrys.push({pos:new google.maps.LatLng(Data['TargetLat'],Data['TargetLong']),name:Data['Name']});
          
            var myOptions = {
              disableDefaultUI: true,
              center: arEntrys[0]['pos'],
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            
            var map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
            var bounds = new google.maps.LatLngBounds ();
            for (var i=0;i<arEntrys.length;i++)
            {
              var infowindow = new google.maps.InfoWindow();
              var marker = new google.maps.Marker({
                map: map,
                position: arEntrys[i]['pos']});
              bounds.extend (arEntrys[i]['pos']);
              
              google.maps.event.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infowindow.setContent('<h2 style="color:black">'+ arEntrys[i]['name'] +'</h2>');
                infowindow.open(map, marker);
              }
              })(marker, i));
            } 
            if (arEntrys.length > 1)
              map.fitBounds (bounds);        
        }
    





