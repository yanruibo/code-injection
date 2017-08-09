





      
    function toFixed(value, precision) {
            var power = Math.pow(10, precision || 0);
            return String(Math.round(value * power) / power);
    }        
     
    function calculate() {
        
            var regions = {"all":[
                                {"name":"Calabria", "values":["3.30","3.19","3.08","2.97","2.84","2.84","2.84"]},
                                {"name":"Basilicata","values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Abruzzo", "values":["3.63","3.51","3.39","3.27","3.12","3.12","3.12"]},
                                {"name":"Campania", "values":["3.30","3.19","3.08","2.97","2.84","2.84","2.84"]},
                                {"name":"Emilia Romagna", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Friuli Venezia Giulia", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Lazio", "values":["3.30","3.19","3.08","2.97","2.84","2.84","2.84"]},
                                {"name":"Liguria", "values":["3.30","3.19","3.08","2.97","2.84","2.84","2.84"]},
                                {"name":"Lombardia", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Marche", "values":["3.24","3.13","3.02","2.92","2.79","2.79","2.79"]},
                                {"name":"Molise", "values":["3.21","3.10","3.00","2.89","2.76","2.76","2.76"]},
                                {"name":"Piemonte", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Puglia", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Sardegna", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Sicilia", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Toscana", "values":["3.30","3.19","3.08","2.97","2.58","2.58","2.58"]},
                                {"name":"Umbria", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Valle D'Aosta", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]},
                                {"name":"Veneto", "values":["3.30","3.19","3.08","2.97","2.84","2.84","2.84"]},
                                {"name":"Prov. autonoma di Bolzano", "values":["2.70","2.61","2.52","2.43","2.32","2.32","2.32"]},
                                {"name":"Prov. autonoma di Trento", "values":["3.00","2.90","2.80","2.70","2.58","2.58","2.58"]}
            ]};
            
            
  
            
            
            var potenza =parseFloat(power.value);
            var potenza_cv = '';
            
            if(isNaN(potenza)){
                
                navigator.notification.alert(
                                             'Il valore inserito non è valido',  // message
                                              null,         // callback
                                             'Attenzione',            // title
                                             'ok'                  // buttonName
                                            );

            }else{
            
            //valore valido
                
                
            if(powerType.value==0){
                potenza_cv = potenza;
                potenza = potenza*0.7354; 
            }
            potenza_cv = potenza/0.7354; 
            var euro_class= euro.value;
                
            var price =parseFloat(regions.all[region.value].values[euro_class]);
            
            var total = price*parseInt(potenza);
       
            var result = toFixed(total,2);
            navigator.notification.alert(
                                         'Classe Euro : '+euro_class+'\n Regione : '+regions.all[region.value].name+'\n Importo per un anno : '+result,  // message
                                         null,         // callback
                                         'Totale per  '+ parseInt(potenza) +' KW | '+parseInt(potenza_cv)+' CV',            // title
                                         'Grazie'                  // buttonName
                                         );
                
            }
        }   
        
  
