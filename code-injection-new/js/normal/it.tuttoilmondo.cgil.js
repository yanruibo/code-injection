































	// If you want to prevent dragging, uncomment this section
	/*
	function preventBehavior(e) 
	{ 
      e.preventDefault(); 
    };
	document.addEventListener("touchmove", preventBehavior, false);
	*/
	
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/*
	function handleOpenURL(url)
	{
		// TODO: do something with the url passed in.
	}
	*/
	
	function onBodyLoad()
	{		
		document.addEventListener("deviceready", onDeviceReady, false);
	}
	
	/* When this function is called, PhoneGap has been initialized and is ready to roll */
	/* If you are supporting your own protocol, the var invokeString will contain any arguments to the app launch.
	see http://iphonedevelopertips.com/cocoa/launching-your-own-application-via-a-custom-url-scheme.html
	for more details -jm */
	/* function onDeviceReady()
	{
		// do your thing!
		navigator.notification.alert("PhoneGap is working")
	} */
    

















//manifest="app.manifest"
var app = new Ext.Application({
  
  //--- Modelli dati
  cl: Ext.regModel('cl', {
    fields: [
      {name: 'id',    type: 'string'},
      {name: 'nome', type: 'string'},
      {name: 'indirizzo',  type: 'string'},
      {name: 'tel',  type: 'string'}
    ]
  }),
  
  prod: Ext.regModel('prod', {
    fields: [
      {name: 'idProd',    type: 'string'},
      {name: 'desProdotto', type: 'string'},
      {name: 'prezzo',  type: 'string'}
    ]
  }),
    
  refreshButton: new Ext.Button({
      ui: 'decline',
      text: 'Ricarica dati'
  }),
  
      
  //--- Store di tipo ajax - onlinestore clienti
  onlineStoreClienti: new Ext.data.Store({
    model: 'cl',
    proxy: {
      type: 'ajax',
      url: 'php/getdataClienti.php',
      reader: {
        type: 'json',
        root: 'result'
      },  
      listeners: {
        //Se siamo off-line viene caricata la lista presente nel localstorage:
        exception: function(){
          console.log("Siamo off-line");
          //app.lista.bindStore(app.offlineStore);
          //app.offlineStore.load();          
        }
      } 
    },
    listeners: {
      load : function() {
        console.log("Siamo on-line");
        app.offlineStoreClienti.proxy.clear();
        app.offlineStoreClienti.removeAll();
        this.each(function (record){
          //var attpri = app.offlineStore.add(record.data)[0];
          app.offlineStoreClienti.add(record.data);
        });
        app.offlineStoreClienti.sync();
        this.removeAll();        
      }
    }
  }),
  
  //--- Store di tipo ajax - onlinestore prodotti
  onlineStoreProdotti: new Ext.data.Store({
    model: 'prod',
    proxy: {
      type: 'ajax',
      url: 'php/getdataProdotti.php',
      reader: {
        type: 'json',
        root: 'result'
      },  
      listeners: {
        //Se siamo off-line viene caricata la lista presente nel localstorage:
        exception: function(){
          console.log("Siamo off-line");
          //app.lista.bindStore(app.offlineStore);
          //app.offlineStore.load();          
        }
      } 
    },
    listeners: {
      load : function() {
        console.log("Siamo on-line");
        app.offlineStoreProdotti.proxy.clear();
        app.offlineStoreProdotti.removeAll();
        this.each(function (record){
          //var attpri = app.offlineStore.add(record.data)[0];
          app.offlineStoreProdotti.add(record.data);
        });
        app.offlineStoreProdotti.sync();
        this.removeAll();        
      }
    }
  }),
  
  
  ///--- end online store
  
  //Store di tipo localstorage - clienti
  offlineStoreClienti: new Ext.data.Store({
    model:'cl',
    proxy: {
      type: 'localstorage',
      id: 'wtccontacts'
    }
  }),
  
  //Store di tipo localstorage - prodotti
  offlineStoreProdotti: new Ext.data.Store({
    model:'prod',
    proxy: {
      type: 'localstorage',
      id: 'wtcproducts'
    }
  }),
  
  ///--- end offline store
  
  lista: new Ext.List({
    title: 'lista',
    store: null,
    cls: 'gallery',
    itemTpl: '{nome}'
  }),
  
  insertClient: new Ext.Button({
    ui: 'decline',
    text: 'Inserisci nuovo cliente'
  }),
  
  //--- Crezione form per inserimento dati
  newClientForm: new Ext.form.FormPanel({
    title:'Nuovo cliente',
    url: 'php/setdata.php',
    standardSubmit : false,
    scroll: 'vertical',
    items: [
    {
      xtype: 'textfield',
      name: 'nome',
      label: 'Nome',
      placeHolder: 'Inserisci nome cliente',
      autoCapitalize : true,
      required: true,
      useClearIcon: true
    }, {
      xtype: 'textfield',
      name: 'indirizzo',
      label: 'Indirizzo',
      placeHolder: 'Inserisci indirizzo cliente',
      autoCapitalize : true,
      required: true,
      useClearIcon: true            
    },{
      xtype: 'textfield',
      name: 'tel',
      label: 'telefono',
      placeHolder: 'Inserisci telefono cliente',
      autoCapitalize : true,
      required: true,
      useClearIcon: true            
    }],
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'bottom',
      items:[{
        text: 'Save',
        ui: 'confirm',
        handler: function() {
          app.newClientForm.submit({
              method: 'POST',
              waitMsg: {
              message:'Submitting',
              cls : 'demos-loading'
              }
          });
        }
      }] 
    }]                       
  }),
  
  
  //----    LAUCH FUNCTION
               

  launch: function(){
    //--- Caricamento dell'offlineStore (che sia vuoto o pieno)
    console.log("Creazione della lista in corso. . . ");
    //app.offlineStore.sync();
    app.offlineStoreClienti.load();
    app.offlineStoreProdotti.load();
    app.lista.bindStore(app.offlineStoreClienti);
    console.log("Lista creata!");
    
    
    var orderForm = new Ext.form.FormPanel({
      title:'Nuovo ordine',
      url: 'php/setorder.php',
      standardSubmit : false,
      scroll: 'vertical',
      items: [
      {
        xtype: 'selectfield',
        name: 'nomeCliente',
        label: 'Cliente',
        placeHolder: 'Seleziona cliente',
        store: app.offlineStoreClienti,
        displayField:'nome',
        valueField:'id',
      },{
        xtype: 'selectfield',
        name: 'nomeProdotto',
        label: 'Prodotto',
        placeHolder: 'Seleziona prodotto',
        store: app.offlineStoreProdotti,
        displayField:'desProdotto',
        valueField:'idProd',
        autoCapitalize : true,
        required: true,
        useClearIcon: true          
      },{
        xtype: 'datepickerfield',
        name: 'dataCorrente',
        label: 'data',
        placeHolder: 'Data di oggi',
        picker: {yearFrom:2010}           
      },{
        xtype: 'numberfield',
        name: 'qta',
        label: 'Quantità',
        placeHolder: 'N°pezzi'           
      }],
      dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items:[{
          text: 'Invia',
          ui: 'confirm',
          handler: function() {
            orderForm.submit({
              method: 'POST',
              waitMsg: {
                message:'Submitting',
                cls : 'demos-loading'
              }
            });
          }
        }]
      }]                       
    });
   


    //--- Interfaccia grafica
    mainPanel: new Ext.TabPanel({
      fullscreen: true,
      dockedItems: [{xtype:'toolbar', title:'Padova WebCam 1.0'}, app.refreshButton],
      tabBar: {
        ui: 'light',
        layout: {
          pack: 'center'
        }
      },
      items: [app.lista, app.newClientForm, orderForm]
    });
    //--- fine interfaccia grafica
    
    
    //--- Pannello per successo ricarica dei dati
    var overlay = new Ext.Panel({
      modal:true,
      centered:true,
      floating:true,
      width: 250,
      height:250,
      styleHtmlContent:true,
      dockedItems:[{xtype:'toolbar', title:'Attenzione'}], //displays the title bar
      dock:'top',
      html:'<div style="margin-bottom:10px;"><b>Dati ricaricati con successo</b></div>'
    });
       
    
    app.refreshButton.addListener('tap', function(){
    console.log("Ricarica dati in corso. . . ");
    app.onlineStoreClienti.load();
    app.onlineStoreProdotti.load();
    console.log("Ricarica dati effettuata!");
    overlay.show('pop');
    });
    
       
    app.lista.on("itemtap", function(dataView,index,item,e){
      var id = dataView.store.getAt(index).data.id;
      var nome = dataView.store.getAt(index).data.nome;
      var indirizzo = dataView.store.getAt(index).data.indirizzo;
      var tel = dataView.store.getAt(index).data.tel;
      this.overlay = new Ext.Panel({
        modal:true,
        centered:true,
        floating:true,
        width: 250,
        height:250,
        styleHtmlContent:true,
        dockedItems:[{xtype:'toolbar', title:'Cliente'}], //displays the title bar
          dock:'top',
          html:'<div style="margin-bottom:10px;"><b>Indirizzo: </b>' + indirizzo + "</div><div><b>Telefono: </b><br/>" + tel + "</div>"
        });
        this.overlay.show('pop');
    });
    
     
    /*
    app.insertClient.addListener('tap', function(){
      console.log(app.newClientForm.nome);
    });
    */  
          
  }
})


    
     










var iWebkit;if(!iWebkit){iWebkit=window.onload=function(){function fullscreen(){var a=document.getElementsByTagName("a");for(var i=0;i<a.length;i++){if(a[i].className.match("noeffect")){}else{a[i].onclick=function(){window.location=this.getAttribute("href");return false}}}}function hideURLbar(){window.scrollTo(0,0.9)}iWebkit.init=function(){fullscreen();hideURLbar()};iWebkit.init()}}

var iWebkit;

if (!iWebkit) {
	
	iWebkit = window.onload = function () {
			function fullscreen() {
				var a = document.getElementsByTagName("a");
				for (var i = 0; i < a.length;i++) {
					if (a[i].className.match("noeffect")) {
					}
				else {
						a[i].onclick = function () {
							window.location = this.getAttribute("href");
							return false;
						};
					}
				}
			}

			function hideURLbar() {
				window.scrollTo(0, 0.9);
			}
			iWebkit.init = function () {
				fullscreen();
				hideURLbar();
			};
			iWebkit.init();
		};
}
