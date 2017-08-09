


/**
 * @author ABertacco
 */
var _DEBUG_MODE = !('ontouchstart' in window);
var _CURRENT_ARTICLE = null;

function onBodyLoad(){

    mostraTopbar();
    
    if (_DB == null) {
        inizializzaDatabase();
        preferitiDBinit();
    }
    
    if (_DEBUG_MODE) {
        //loadArticoloFromDB({"id":"1317664837","issue_descr":"20111008","edizione_descr":"SOLE","testata_descr":"Il Sole 24 ORE","sezione":"1530","edizione":"SOLE","sezione_descr":"ECONOMIA E IMPRESE","photos":[["/S24/20111008/SOLE//IMMAGINI/photo/25/26_ratti_omaggio.jpg",""]],"pagina":"25","issue":"20111008","titolo":"Sfilate. Milano non cede a New York\nconfermate le date per il 2012 Pag. 28","testata":"S24"});
		loadArticolo({artid:'1317664464', testata:'S24', edizione:'SOLE', issue:'20111008', testata_descr:'Il Sole 24 ORE', edizione_descr:'SOLE', issue_descr:'20111008', pagina:1, sezione:'PRIMA', occhiello: ["I GIORNI DELLA SVOLTA"], titolo: ["<firma> Walter Riolfi</firma>Primi segnali di cauto ottimismo"], sottotitolo: [], firme: [], testo: ["<br /><br /><br /> \nNelle ultime tre sedute, le Borse europee sono rimbalzate del 6,5% e le banche dell'area euro del 10%. Parallelamente, il rendimento del Treasury decennale Usa è volato di 31 centesimi al 2,11% e quello del Bund di 27 centesimi al 2%. Nelle ultime quattro sedute Wall Street ha guadagnato il 5,1%, così come le banche. Pure le materie prime hanno recuperato un buon 4%. Qualche grossa novità dev'essere nell'aria.\nMa quale? Se si dovessero valutare le notizie attraverso le parole spese dalle autorità politiche, monetarie e dei vari organismi internazionali, si direbbe che siamo al punto di svolta nella crisi dei debiti sovrani. Il guaio è che s'è trattato quasi solo di parole e di fatti concreti non se n'è visto alcuno: a parte la decisione della Bce di comprare bond bancari.\nContinua u pagina 7"], photos: [], grafici: []}, [{"items":[{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/01_590-490.jpg","descrizione":"Il World Trade Center riflesso su una lapide di fronte a Ground Zero sulla quale sono riportati i nomi delle persone rimaste uccise nel crollo delle Torri Gemelle (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/02_590-490.jpg","descrizione":"Uno degli aerei dirottati si avvicina al World Trade Center poco prima di schiantarsi contro il grattacielo simbolo di New York (AFP PHOTO)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/03_590-490.jpg","descrizione":"Le torri gemelle del World Trade Center bruciano dopo lo schianto degli aerei dirottati (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/04_590-490.jpg","descrizione":"Una donna guarda attraverso una finestra panoramica del sito del World Trade Center di New York, dieci anni dopo la tragedia (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/05_590-490.jpg","descrizione":"Alcune persone osservano il sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/06_590-490.jpg","descrizione":"Un uomo seduto davanti al World Trade Center; riflesso alle sue spalle, il World Financial Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/07_590-490.jpg","descrizione":"Il sito del World Trade Center visto attraverso una recinzione che delimita l'area dei lavori di ricostruzione (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/08_590-490.jpg","descrizione":"Un operaio si prende una pausa durante i lavori di ricostruzione del sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/09_590-490.jpg","descrizione":"Una coppia osserva il sito del World Trade Center da un marciapiede di New York (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/10_590-490.jpg","descrizione":"Alcune persone osservano attraverso una vetrata panoramica il sito del World Trade Center di New York, dieci anni dopo la tragedia (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/11_590-490.jpg","descrizione":"Le fotografie dei Vigili del Fuoco di New York (FDNY) vittime della attacchi dell'11 settembre al World Trade Center, in una caserma dei pompieri di New York (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/12_590-490.jpg","descrizione":"Una veduta del sito del World Trade Center a New York, com'è oggi (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/13_590-490.jpg","descrizione":"Un'immagine del World Trade Center prima degli attacchi dell'11 settembre 2001, incollata su un palo all'esterno di una caserma dei pompieri (REUTERS))"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/14_590-490.jpg","descrizione":"Il sito del World Trade Center visto attraverso una recinzione che delimita l'area dei lavori di ricostruzione (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/15_590-490.jpg","descrizione":"Un operaio prega davanti al sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/16_590-490.jpg","descrizione":"Un pezzo di acciaio ritorto dagli attacchi dell'11 settembre 2001 con appese alcune bandiere degli Stati Uniti è esposto in un sito memoriale di fronte a Ground Zero (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/17_590-490.jpg","descrizione":"Piastrelle appese davanti al World Trade Center in memoria delle vittime dell'11 settembre 2001 (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/18_590-490.jpg","descrizione":"Operai al lavoro nell'opera di ricostruzione del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/19_590-490.jpg","descrizione":"In quest'immagine dell'11 settembre 2011, la torre sud del World Trade Center comincia a crollare dopo l'attacco terroristico (AP Photo/Amy Sancetta)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/20_590-490.jpg","descrizione":"Una persona si lancia a testa in giù dalla torre nord del World Trade Center l'11 settembre 2001. (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/21_590-490.jpg","descrizione":"La Freedom Tower, ormai quasi completata, presso il sito del World Trade Center (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/22_590-490.jpg","descrizione":"Un camion dei pompieri di New York City parcheggiato vicino alla Freedom Tower (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/23_590-490.jpg","descrizione":"Nel sito del World Trade Center continuano i lavori di ricostruzione (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/24_590-490.jpg","descrizione":"La grande fontana collocata a nord del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/25_590-490.jpg","descrizione":"L'acqua scorre nella vasca sud del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/26_590-490.jpg","descrizione":"Un operaio lucida la lapide con i nomi delle vittime degli attacchi al World Trade Center sopra la fontana sud del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/27_590-490.jpg","descrizione":"Il National September 11 Memorial e il Museum si vedono sullo sfondo della fontana sud del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/28_590-490.jpg","descrizione":"Le torri gemelle del World Trade Center bruciano dietro l'Empire State Building l'11 settembre 2001 (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/29_590-490.jpg","descrizione":"Nell'area del World Trade Center la ricostruzione continua (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/30_590-490.jpg?uuid=d14ab384-ca45-11e0-ade3-845e3fa0f271","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/31_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/32_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/33_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/34_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/35_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/36_590-490.jpg","descrizione":"(AFP Photo)"}],"id":"31","package":"1317664464","descrizione":"Photogallery Sole Copertina","preview":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/36_590-490.jpg","tipo":"PHOTOS"},{"items":[{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/01_590-490.jpg","descrizione":"Il World Trade Center riflesso su una lapide di fronte a Ground Zero sulla quale sono riportati i nomi delle persone rimaste uccise nel crollo delle Torri Gemelle (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/02_590-490.jpg","descrizione":"Uno degli aerei dirottati si avvicina al World Trade Center poco prima di schiantarsi contro il grattacielo simbolo di New York (AFP PHOTO)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/03_590-490.jpg","descrizione":"Le torri gemelle del World Trade Center bruciano dopo lo schianto degli aerei dirottati (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/04_590-490.jpg","descrizione":"Una donna guarda attraverso una finestra panoramica del sito del World Trade Center di New York, dieci anni dopo la tragedia (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/05_590-490.jpg","descrizione":"Alcune persone osservano il sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/06_590-490.jpg","descrizione":"Un uomo seduto davanti al World Trade Center; riflesso alle sue spalle, il World Financial Center (REUTERS)"}],"id":"41","package":"1317664464","descrizione":"New York 11/9 10 immagini","preview":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/01_590-490.jpg","tipo":"PHOTOS"}]);
    }
	
	$('#container_adv').writeCapture().load('http://adv.ilsole24ore.it/RealMedia/ads/adstream_sx.ads/www.ilsole24ore.it/11/ipad_app_v2/' + new Date().getTime() + '@Ticker_04', function() { }).endCapture();
}

function loadArticoloFromDB(articolo, arrPhotos, arrVideos){
	try {
		_CURRENT_ARTICLE = {};
		
		_CURRENT_ARTICLE.artid = typeof articolo.id != "undefined" ? articolo.id : 'x_' + new Date().getTime();
		_CURRENT_ARTICLE.testata = typeof articolo.testata != "undefined" ? articolo.testata : '';
		_CURRENT_ARTICLE.testata_descr = typeof articolo.testata_descr != "undefined" ? articolo.testata_descr : '';
		_CURRENT_ARTICLE.issue = typeof articolo.issue != "undefined" ? articolo.issue : '';
		_CURRENT_ARTICLE.issue_descr = typeof articolo.issue_descr != "undefined" ? articolo.issue_descr : '';
		_CURRENT_ARTICLE.edizione = typeof articolo.edizione != "undefined" ? articolo.edizione : '';
		_CURRENT_ARTICLE.edizione_descr = typeof articolo.edizione_descr != "undefined" ? articolo.edizione_descr : '';
		_CURRENT_ARTICLE.sezione = typeof articolo.sezione_descr != "undefined" ? articolo.sezione_descr : '';
		_CURRENT_ARTICLE.pagina = typeof articolo.pagina != "undefined" ? articolo.pagina : 1;
		_CURRENT_ARTICLE.titolo = (typeof articolo.titolo != "undefined" && articolo.titolo != null && articolo.titolo.length > 0) ? articolo.titolo : '';
		_CURRENT_ARTICLE.sottotitolo = (typeof articolo.sottotitolo != "undefined" && articolo.sottotitolo != null && articolo.sottotitolo.length > 0) ? articolo.sottotitolo : '';
		_CURRENT_ARTICLE.occhiello = (typeof articolo.occhiello != "undefined" && articolo.occhiello != null && articolo.occhiello.length > 0) ? articolo.occhiello : '';
		_CURRENT_ARTICLE.firma = (typeof articolo.firma != "undefined" && articolo.firma != null && articolo.firma.length > 0) ? articolo.firma : '';
		_CURRENT_ARTICLE.testo = (typeof articolo.testo != "undefined" && articolo.testo != null && articolo.testo.length > 0) ? articolo.testo : '';
		_CURRENT_ARTICLE.tags = ""; // usato per agganciare in automatico gli stessi metodi del modifica tags
		_CURRENT_ARTICLE.photos = (typeof articolo.photos == "undefined" || articolo.photos == null || articolo.photos.length == 0) ? [] : articolo.photos;
		_CURRENT_ARTICLE.grafici = (typeof articolo.grafici == "undefined" || articolo.grafici == null || articolo.grafici.length == 0) ? [] : articolo.grafici;
		_CURRENT_ARTICLE.arr_photos = (typeof arrPhotos == "undefined" || arrPhotos == null || arrPhotos.length == 0) ? [] : arrPhotos;
		_CURRENT_ARTICLE.arr_videos = (typeof arrVideos == "undefined" || arrVideos == null || arrVideos.length == 0) ? [] : arrVideos;
		
		return renderArticolo();
	} catch (exc) {
		return exc.message;
	}
}

function loadArticolo(articolo, arrPhotos, arrVideos){
	try {
		_CURRENT_ARTICLE = {};
		
		_CURRENT_ARTICLE.artid = typeof articolo.artid != "undefined" ? articolo.artid : 'x_' + new Date().getTime();
		_CURRENT_ARTICLE.testata = typeof articolo.testata != "undefined" ? articolo.testata : '';
		_CURRENT_ARTICLE.testata_descr = typeof articolo.testata_descr != "undefined" ? articolo.testata_descr : '';
		_CURRENT_ARTICLE.issue = typeof articolo.issue != "undefined" ? articolo.issue : '';
		_CURRENT_ARTICLE.issue_descr = typeof articolo.issue_descr != "undefined" ? articolo.issue_descr : '';
		_CURRENT_ARTICLE.edizione = typeof articolo.edizione != "undefined" ? articolo.edizione : '';
		_CURRENT_ARTICLE.edizione_descr = typeof articolo.edizione_descr != "undefined" ? articolo.edizione_descr : '';
		_CURRENT_ARTICLE.sezione = typeof articolo.sezione != "undefined" ? articolo.sezione : '';
		_CURRENT_ARTICLE.pagina = typeof articolo.pagina != "undefined" ? articolo.pagina : 1;
		_CURRENT_ARTICLE.titolo = (typeof articolo.titolo != "undefined" && articolo.titolo != null && articolo.titolo.length > 0) ? articolo.titolo.join('<br />') : '';
		_CURRENT_ARTICLE.sottotitolo = (typeof articolo.sottotitolo != "undefined" && articolo.sottotitolo != null && articolo.sottotitolo.length > 0) ? articolo.sottotitolo.join('<br />') : '';
		_CURRENT_ARTICLE.occhiello = (typeof articolo.occhiello != "undefined" && articolo.occhiello != null && articolo.occhiello.length > 0) ? articolo.occhiello.join('<br />') : '';
		_CURRENT_ARTICLE.firma = (typeof articolo.firma != "undefined" && articolo.firma != null && articolo.firma.length > 0) ? articolo.firma.join('<br />') : '';
		_CURRENT_ARTICLE.testo = (typeof articolo.testo != "undefined" && articolo.testo != null && articolo.testo.length > 0) ? articolo.testo.join('<br />') : '';
		_CURRENT_ARTICLE.tags = ""; // usato per agganciare in automatico gli stessi metodi del modifica tags
		_CURRENT_ARTICLE.photos = (typeof articolo.photos == "undefined" || articolo.photos == null || articolo.photos.length == 0) ? [] : articolo.photos;
		_CURRENT_ARTICLE.grafici = (typeof articolo.grafici == "undefined" || articolo.grafici == null || articolo.grafici.length == 0) ? [] : articolo.grafici;
		_CURRENT_ARTICLE.arr_photos = (typeof arrPhotos == "undefined" || arrPhotos == null || arrPhotos.length == 0) ? [] : arrPhotos;
		_CURRENT_ARTICLE.arr_videos = (typeof arrVideos == "undefined" || arrVideos == null || arrVideos.length == 0) ? [] : arrVideos;
		
		if (!_DEBUG_MODE) {
	        setTimeout(function(){
	            window.location = 'dsh://loading.done';
	        }, 500);
	    }
	} 
	catch (exc) {
		return exc.message;
	}
	return renderArticolo();
}

function renderArticolo() {
	try {
        checkDBalreadyPresent();
        
		$('.box_articolo_selected').removeClass('box_articolo_selected');
		if (document.getElementById('box_articolo_' + _CURRENT_ARTICLE.artid) != null) {
			$('#box_articolo_' + _CURRENT_ARTICLE.artid).addClass('box_articolo_selected');
		}
		
        $('#articolo_header_sezione').html(_CURRENT_ARTICLE.sezione);
        $('#articolo_header_edizione').html(_CURRENT_ARTICLE.edizione_descr);
        $('#articolo_header_issue').html(_CURRENT_ARTICLE.issue_descr);
        
        if (_CURRENT_ARTICLE.titolo.length > 0) {
            $('#articolo_titolazione_titolo').html(_CURRENT_ARTICLE.titolo);
			document.getElementById('articolo_titolazione_titolo').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_titolo').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.sottotitolo.length > 0) {
            $('#articolo_titolazione_sottotitolo').html(_CURRENT_ARTICLE.sottotitolo);
			document.getElementById('articolo_titolazione_sottotitolo').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_sottotitolo').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.occhiello.length > 0) {
            $('#articolo_titolazione_occhiello').html(_CURRENT_ARTICLE.occhiello);
			document.getElementById('articolo_titolazione_occhiello').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_occhiello').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.firma.length > 0) {
            $('#articolo_titolazione_firma').html(_CURRENT_ARTICLE.firma);
			document.getElementById('articolo_titolazione_firma').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_firma').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.testo.length > 0) {
            $('#articolo_body_text').html(_CURRENT_ARTICLE.testo);
        }
        else {
            $('#articolo_body_text').html('&nbsp;');
        }
        
        if (_CURRENT_ARTICLE.photos.length == 0) {
            document.getElementById('articolo_body_media_photos').style.display = 'none';
        }
        else {
			document.getElementById('articolo_body_media_photos').style.display = 'block';
			document.getElementById('articolo_body_media_photos').innerHTML = '';
            for (var i = 0; i < _CURRENT_ARTICLE.photos.length; i++) {
                var box = document.createElement('div');
                box.className = "articolo_body_media_photo";
                document.getElementById('articolo_body_media_photos').appendChild(box);
                
                var con = document.createElement('div');
                con.className = "articolo_body_media_photo_container";
                box.appendChild(con);
                
                var crop = document.createElement('div');
                crop.className = "articolo_body_media_photo_container_crop";
                con.appendChild(crop);
                
                var cropbox = document.createElement('div');
                cropbox.className = 'articolo_body_media_photo_container_crop_box';
                crop.appendChild(cropbox);
                
                var img = document.createElement('img');
                cropbox.appendChild(img);
                img.src = 'http://10.190.11.28/_deploy/' + _CURRENT_ARTICLE.photos[i][0] + '.thumb.jpg';
                
                if (_CURRENT_ARTICLE.photos[i][1] != null && _CURRENT_ARTICLE.photos[i][1].length > 0) {
                    var dida = document.createElement('div');
                    con.appendChild(dida);
                    dida.innerHTML = _CURRENT_ARTICLE.photos[i][1];
                    dida = null;
                }
                
                var open = document.createElement('img');
                open.className = 'articolo_body_media_photo_container_open';
                crop.appendChild(open);
                open.src = 'imgs/articolo_body_media_photo_container_open.png';
                
				box.onclick = (function(url) {
					return function() {
						window.location = 'dsh://photo.open' + url + '.jpg';
					}
				})(_CURRENT_ARTICLE.photos[i][0]);
				
				
                open = null;
                img = null;
                cropbox = null;
                crop = null;
                con = null;
                box = null;
            }
        }
		
		if (_CURRENT_ARTICLE.grafici.length == 0) {
			document.getElementById('articolo_body_media_grafici').style.display = 'none';
		} else {
			document.getElementById('articolo_body_media_grafici').style.display = 'block';
			document.getElementById('articolo_body_media_grafici_content').innerHTML = '';
			for (var i = 0; i < _CURRENT_ARTICLE.grafici.length; i++) {
				var box = document.createElement('div');
				document.getElementById('articolo_body_media_grafici_content').appendChild(box);
				box.className = 'articolo_body_media_arricchimento_item';
				box.innerHTML = _CURRENT_ARTICLE.grafici[i][1].length > 0 ? _CURRENT_ARTICLE.grafici[i][1] : 'Grafico';
				
				box.onclick = (function (url) {
					return function() {
						window.location = 'dsh://photo.open' + url + '.jpg';
					}
				})(_CURRENT_ARTICLE.grafici[i][0]);
				
				box = null;
			}
		}
		
		if (_CURRENT_ARTICLE.arr_photos.length == 0) {
	        document.getElementById('articolo_body_media_gallery').style.display = 'none';
	    }
	    else {
	        document.getElementById('articolo_body_media_gallery').style.display = 'block';
	        document.getElementById('articolo_body_media_gallery_content').innerHTML = '';
	        for (var i = 0; i < _CURRENT_ARTICLE.arr_photos.length; i++) {
				var box = document.createElement('div');
				box.className = 'articolo_body_media_arricchimento_item';
				document.getElementById('articolo_body_media_gallery_content').appendChild(box);
				box.innerHTML = _CURRENT_ARTICLE.arr_photos[i]['descrizione'] != null && _CURRENT_ARTICLE.arr_photos[i]['descrizione'].length > 0 ? _CURRENT_ARTICLE.arr_photos[i]['descrizione'] : 'Gallery';
				
				box.onclick = (function(id) {
					return function(event) {
						event.preventDefault();
						event.stopPropagation();
						window.location = 'dsh://gallery.open/' + id;
					}
				})(_CURRENT_ARTICLE.arr_photos[i]['id']);
				
				box = null;
			}
	    }
		
		if (_CURRENT_ARTICLE.arr_videos.length == 0) {
	        document.getElementById('articolo_body_media_video').style.display = 'none';
	    }
	    else {
	        document.getElementById('articolo_body_media_video').style.display = 'block';
	        document.getElementById('articolo_body_media_video_content').innerHTML = '';
	        for (var i = 0; i < _CURRENT_ARTICLE.arr_videos.length; i++) {
				var box = document.createElement('div');
				box.className = 'articolo_body_media_arricchimento_item';
				document.getElementById('articolo_body_media_video_content').appendChild(box);
				box.innerHTML = _CURRENT_ARTICLE.arr_videos[i]['descrizione'] != null && _CURRENT_ARTICLE.arr_videos[i]['descrizione'].length > 0 ? _CURRENT_ARTICLE.arr_videos[i]['descrizione'] : 'Video';
				
				box.onclick = (function(id) {
					return function(event) {
						event.preventDefault();
						event.stopPropagation();
						window.location = 'dsh://video.open/' + id;
					}
				})(_CURRENT_ARTICLE.arr_videos[i]['id']);
				
				box = null;
			}
	    }
		
		
		if (_MMEDIA_ISCROLL != null) {
			_MMEDIA_ISCROLL.destroy();
			_MMEDIA_ISCROLL = null;
		}
		
		var fullArr = _CURRENT_ARTICLE.arr_photos.concat(_CURRENT_ARTICLE.arr_videos);
		if (fullArr.length == 0)  {
			document.getElementById('articolo_mainmedia').style.display = 'none';
		}
		else {
			document.getElementById('articolo_mainmedia').style.display = 'block';
			document.getElementById('articolo_mainmedia_container').innerHTML = '';
			document.getElementById('articolo_mainmedia_progress').innerHTML = '';
			$('#articolo_mainmedia_container').width($('#articolo_mainmedia_wrapper').width() * fullArr.length);
			for (var i = 0; i < fullArr.length; i++) {
				var box = document.createElement('div');
				box.className = 'articolo_mainmedia_container_box';
				document.getElementById('articolo_mainmedia_container').appendChild(box);
				
				var container = document.createElement('div');
				container.className = 'articolo_mainmedia_container_box_container';
				box.appendChild(container);
				
				var img = document.createElement('img');
				img.className = 'articolo_mainmedia_container_box_img';
				container.appendChild(img);
				img.src = fullArr[i]['preview'];
				
				var desc
				
				var icon = document.createElement('img');
				icon.className = 'articolo_mainmedia_container_icon';
				box.appendChild(icon);
				icon.src = 'imgs/ps' + fullArr[i]['tipo'] + '.png';
				
				if (fullArr[i]['tipo'] == "VIDEO") {
					box.onclick = (function(id) {
						return function(event) {
							event.preventDefault();
							event.stopPropagation();
							window.location = 'dsh://video.open/' + id;
						}
					})(fullArr[i]['id']);
				} else if (fullArr[i]['tipo'] == "PHOTOS") {
					box.onclick = (function(id) {
						return function(event) {
							event.preventDefault();
							event.stopPropagation();
							window.location = 'dsh://gallery.open/' + id;
						}
					})(fullArr[i]['id']);
				}
				
				icon = null;
				img = null;
				container = null;
				box = null;
				
				var progress = document.createElement('div');
				progress.className = 'articolo_mainmedia_progress_box' + (i == 0 ? ' articolo_mainmedia_progress_box_active' : '');
				document.getElementById('articolo_mainmedia_progress').appendChild(progress);
				progress = null;
			}
			
			_MMEDIA_ISCROLL = new iScroll('articolo_mainmedia_wrapper', {
				snap: true,
				momentum: false,
				hScrollbar: false,
				vScroll: false,
				onScrollEnd: function () {
					document.querySelector('.articolo_mainmedia_progress_box_active').className = 'articolo_mainmedia_progress_box';
					document.querySelector('#articolo_mainmedia_progress > div:nth-child(' + (this.currPageX+1) + ')').className = 'articolo_mainmedia_progress_box articolo_mainmedia_progress_box_active';
				}
			});
		}
        
    } 
    catch (exc) {
        return exc.message;
    }
    
    updateOrientation();
	
	return "OK";
}

var _MMEDIA_ISCROLL = null;
var _ARTICOLO_ISCROLL = null;
function updateOrientation(){
    setTimeout(function(){
        if (_ARTICOLO_ISCROLL == null) {
            _ARTICOLO_ISCROLL = new iScroll('wrapper_articolo');
        }
        else {
			_ARTICOLO_ISCROLL.scrollTo(0,0,0);
            _ARTICOLO_ISCROLL.refresh();
        }
    }, 200);
}


var _TIMEOUT_MENU = null;
function mostraTopbar(){
    document.getElementById('wrapper_topbar').style['-webkit-transform'] = 'translate3d(0px, 0px, 0)';
    if (_TIMEOUT_MENU != null) {
        clearTimeout(_TIMEOUT_MENU);
        _TIMEOUT_MENU = null;
    }
    _TIMEOUT_MENU = setTimeout(nascondiTopbar, 2000);
}

function nascondiTopbar(){
    document.getElementById('wrapper_topbar').style['-webkit-transform'] = 'translate3d(0px, -50px, 0)';
}

function checkDBalreadyPresent(){
    if (_DB) {
        var querySuccess = function(tx, rs){
            checkDBalreadyPresent_aux(rs.rows.length > 0);
        }
        var queryError = function(tx, p_error){
            checkDBalreadyPresent_aux(false);
        }
        var executeQuery = function(tx){
            tx.executeSql('SELECT * FROM ' + _PREFERITI_ARTICLE_DB_NAME + ' WHERE artid=?;', [_CURRENT_ARTICLE.artid], querySuccess, queryError);
        }
        _DB.transaction(executeQuery);
    }
    else {
    
        checkDBalreadyPresent_aux(false);
    }
}

function checkDBalreadyPresent_aux(isPresent){
    document.getElementById('btn_preferiti_off').style.display = isPresent ? 'none' : 'inline-block';
    document.getElementById('btn_preferiti_on').style.display = isPresent ? 'inline-block' : 'none';
}


function openSavePreferiti(){
    if (_CURRENT_ARTICLE == null) 
        return;
    
    popupPreferitiUpdateArticle(_CURRENT_ARTICLE);
}

function doSavePreferiti(){
    preferitiDBsave(_CURRENT_ARTICLE.artid, _CURRENT_ARTICLE.testata, _CURRENT_ARTICLE.testata_descr, _CURRENT_ARTICLE.issue, _CURRENT_ARTICLE.issue_descr, _CURRENT_ARTICLE.edizione, _CURRENT_ARTICLE.edizione_descr, _CURRENT_ARTICLE.sezione, _CURRENT_ARTICLE.pagina, _CURRENT_ARTICLE.occhiello, _CURRENT_ARTICLE.titolo, _CURRENT_ARTICLE.sottotitolo, _CURRENT_ARTICLE.firma, _CURRENT_ARTICLE.testo, $('#modifica_articolo_preferito #id_tags').val());
    
    document.getElementById('btn_preferiti_off').style.display = 'none';
    document.getElementById('btn_preferiti_on').style.display = 'inline-block';
    
    popupPreferitiUpdateArticleChiudi();
}

function preferitiDBinit(){
    if (_DB) {
        var querySuccess = function(){
            console.log('OK preferitiDBinit');
        }
        var queryError = function(tx, p_error){
            console.log('KO preferitiDBinit ' + p_error.message);
        }
        var executeQuery = function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + _PREFERITI_ARTICLE_DB_NAME + ' (' + _PREFERITI_ARTICLE_DB_COLUMNS + ')', [], querySuccess, queryError);
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + _PREFERITI_TAG_DB_NAME + ' (' + _PREFERITI_TAG_DB_COLUMNS + ')', [], querySuccess, queryError);
        }
        _DB.transaction(executeQuery);
    }
}

function preferitiDBsave(artid, testata, testata_descr, issue, issue_descr, edizione, edizione_descr, sezione, pagina, occhiello, titolo, sottotitolo, firma, testo, tags){
    if (_DB) {
        var querySuccess = function(tx){
            console.log('OK SAVE LOCAL DB PREFERITO: ' + artid);
            var tags_arr = tags.split(',');
            for (var t = 0; t < tags_arr.length; t++) {
                var l_tag = tags_arr[t].replace(/^\s+|\s+$/g, ""); //TRIM
                if (l_tag.length <= 0) 
                    continue;
                tx.executeSql('INSERT INTO ' + _PREFERITI_TAG_DB_NAME + ' VALUES(?, ?);', [l_tag, artid], function(){
                    console.log('OK SAVE LOCAL DB TAG');
                }, function(tx, p_error){
                    console.log('KO SAVE LOCAL DB TAG ' + p_error.message);
                });
            }
        }
        var queryError = function(tx, p_error){
            console.log('KO SAVE LOCAL DB PREFERITO: ' + p_error.message);
        }
        var executeQuery = function(tx){
            tx.executeSql('INSERT INTO ' + _PREFERITI_ARTICLE_DB_NAME + ' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATETIME(\'NOW\'), ?);', [artid, testata, testata_descr, issue, issue_descr, edizione, edizione_descr, sezione, pagina, occhiello, titolo, sottotitolo, firma, testo, tags], querySuccess, queryError);
        }
        _DB.transaction(executeQuery);
    }
}

/******************************************************
 Gestione indice visibile in landscape
 ******************************************************/
var _ISCROLL_SEZIONI = null;
var _ISCROLL_ARTICOLI = null;

function loadSezioni(sezioniJson){
    if (_ISCROLL_SEZIONI != null) {
        _ISCROLL_SEZIONI.destroy();
        _ISCROLL_SEZIONI = null;
    }
    
    document.getElementById('sezioni_container').innerHTML = '';
    
    document.getElementById('sezioni_container').style.width = 160 * sezioniJson.length + 'px';
    
    for (var i = 0; i < sezioniJson.length; i++) {
    
        var box = document.createElement('div');
        box.id = 'box_section_' + sezioniJson[i].section;
        box.className = 'box_sezione';
        document.getElementById('sezioni_container').appendChild(box);
        
        var inner = document.createElement('div');
        box.appendChild(inner);
        
        inner.innerHTML = sezioniJson[i].description;
        
        box.onclick = (function(sid){
            return function(){
                sezioneSelected(sid);
            }
        })(sezioniJson[i].section);
        
        inner = null;
        box = null;
        
    }
    
    
    setTimeout(function(){
        _ISCROLL_SEZIONI = new iScroll('sezioni_wrapper', {
            hScroll: true,
            vScroll: false
        });
		_ISCROLL_ARTICOLI.scrollTo(0,0,100);
    }, 200);
    
    
    return "OK";
    
}

function sezioneSelected(sid){
    $('.box_sezione_selected').removeClass('box_sezione_selected');
	window.location = 'dsh://indice.load/' + sid;
}

function loadListaArticoliSezione(sid, articoliJson){
	try {
		$('#box_section_' + sid).addClass('box_sezione_selected');
		
		if (_ISCROLL_ARTICOLI != null) {
			_ISCROLL_ARTICOLI.destroy();
			_ISCROLL_ARTICOLI = null;
		}
		
		document.getElementById('articoli_container').innerHTML = '';
		
		if (articoliJson.length == 0) 
			return "VUOTO";
		
		for (var i = 0; i < articoliJson.length; i++) {
		
			var box = document.createElement('div');
			box.className = 'box_articolo' + (_CURRENT_ARTICLE != null && articoliJson[i].id == _CURRENT_ARTICLE.artid ? ' box_articolo_selected' : '');
			box.id = 'box_articolo_' + articoliJson[i].id;
			document.getElementById('articoli_container').appendChild(box);
			
			var titolo = document.createElement('h1');
			box.appendChild(titolo);
			titolo.innerHTML = articoliJson[i].titolo;
			
			box.onclick = (function(aid){
				return function(){
					window.location = 'dsh://indice.open/' + aid;
				}
			})(articoliJson[i].id);
			
			titolo = null;
			box = null;
			
		}
		
		setTimeout(function(){
			_ISCROLL_ARTICOLI = new iScroll('articoli_wrapper', {
				hScroll: false,
				vScroll: true
			});
			_ISCROLL_ARTICOLI.scrollTo(0,0,100);
			//setTimeout(function() { _ISCROLL_ARTICOLI.refresh() }, 500);
			
			
			if (_ISCROLL_SEZIONI != null) {
				_ISCROLL_SEZIONI.scrollToElement('#box_section_' + sid, 200);
			}
			
		}, 300);
		
		return "OK";
	} catch (exc) {
		return exc.message;
	}
}


/******************************************************
 Gestione database
 ******************************************************/
var _DB_NAME = 'Sole24DB';
var _DB_SIZE = 100000;
var _DB = null;
function inizializzaDatabase(){
    console.log("Inizializzazione database");
    _DB = window.openDatabase(_DB_NAME, "1.0", _DB_NAME, _DB_SIZE);
}

var _PREFERITI_ARTICLE_DB_NAME = 'PREFERITI_ARTICLE';
var _PREFERITI_ARTICLE_DB_COLUMNS = 'artid text unique, testata text, testata_descr text, issue text, issue_descr text, edizione text, edizione_descr text, sezione text, pagina text, occhiello text, titolo text, sottotitolo text, firma text, testo text, dttm, tags text';
var _PREFERITI_TAG_DB_NAME = 'PREFERITI_TAG';
var _PREFERITI_TAG_DB_COLUMNS = 'nome text, artid text';
var _NUM_PREFERITE_TAGS = 5;


/******************************************************
 Gestione popup modifica preferiti
 ******************************************************/
/**
 * Apre il popup per la modifica di un articolo preferito
 * @params p_article Oggetto articolo così come definito nel database in locale
 */
function popupPreferitiUpdateArticle(p_article){

    //$('#modifica_articolo_preferito').fadeIn();
    if (p_article) {
    
        $('#modifica_articolo_preferito').css('display', 'inline');
        $('#modifica_articolo_preferito_title').text(p_article.titolo);
        $('#modifica_articolo_preferito_text').html('<strong>' + p_article.testata_descr + '</strong> ' + p_article.issue_descr + ' - pag. ' + parseInt(p_article.pagina));
        $('#modifica_articolo_preferito #id_tags').val(p_article.tags);
        $('#modifica_articolo_preferito #id').val(p_article.artid);
        
        
        // Inizializza i tag preferiti
        if (_DB) {
        
            var querySuccess = function(tx, p_results){
                var l_tags_help = $('#modifica_articolo_preferito_tags_help');
                // I tag preferiti vengono inseriti come possibili scelte
                l_tags_help.empty();
                for (var i = 0; i < p_results.rows.length; i++) {
                    var tag = p_results.rows.item(i);
                    l_tags_help.append('<input type="button" class="button medium gray" stye="margin-right:10px;" onclick="popupPreferitiUpdateAddTag(\'' + tag.nome + '\')" value="' + tag.nome + '" />');
                }
            }
            
            var queryError = function(p_error){
                console.log("popupPreferitiUpdateArticle: Error processing SQL: " + p_error.message);
            }
            
            var executeQuery = function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + _PREFERITI_TAG_DB_NAME + ' (' + _PREFERITI_TAG_DB_COLUMNS + ')');
                var l_query = 'SELECT nome, COUNT(*) AS num_articles FROM ' + _PREFERITI_TAG_DB_NAME + ' GROUP BY nome ORDER BY num_articles DESC LIMIT 0,' + _NUM_PREFERITE_TAGS;
                tx.executeSql(l_query, [], querySuccess, queryError);
            }
            
            
            _DB.transaction(executeQuery, queryError);
        }
    }
}

/**
 * Aggiunge un tag all'elemento input contentente tutti i tag di un articolo preferito
 */
function popupPreferitiUpdateAddTag(p_tag){
    var l_tags_el = $('#modifica_articolo_preferito #id_tags');
    var l_tags_string = l_tags_el.val();
    
    if (l_tags_string != '') {
        l_tags_string += ', ' + p_tag;
    }
    else {
        l_tags_string = p_tag;
    }
    
    l_tags_el.val(l_tags_string);
}

/**
 * Esegue il salvataggio del preferito
 */
function popupPreferitiUpdateArticleAvanti(){
    var l_artid = $('#modifica_articolo_preferito #id').val();
    var l_tags = $('#modifica_articolo_preferito #id_tags').val();
    // Salva le modifiche
    if (_DB) {
        var querySuccess = function(tx, p_results){
            console.log("popupPreferitiUpdateArticleAvanti: Data saved, rows affected: " + p_results.rowsAffected);
        }
        var updateQuerySuccess = function(tx, p_results){
            console.log("popupPreferitiUpdateArticleAvanti: Update article success");
            if (p_results.rowsAffected > 0) {
                document.getElementById('preferiti_body_vista_container_box_tags_' + l_artid).innerHTML = 'Tags: ' + l_tags;
            }
        }
        var queryError = function(p_error){
            console.log("popupPreferitiUpdateArticleAvanti: Error processing SQL: " + p_error.message);
        }
        var executeQuery = function(tx){
            tx.executeSql('UPDATE ' + _PREFERITI_ARTICLE_DB_NAME + ' SET tags=? WHERE artid=?', [l_tags, l_artid], updateQuerySuccess, queryError);
            
            // Elimina i tag attualmente presenti per quel prodotto
            tx.executeSql('DELETE FROM ' + _PREFERITI_TAG_DB_NAME + ' WHERE artid=? OR artid=""', [l_artid], querySuccess, queryError);
            var l_tags_array = l_tags.toLowerCase().split(',');
            for (var i = 0; i < l_tags_array.length; i++) {
                var l_tag = l_tags_array[i].replace(/^\s+|\s+$/g, ""); //TRIM
                tx.executeSql('INSERT INTO ' + _PREFERITI_TAG_DB_NAME + ' (nome, artid) VALUES(?,?)', [l_tag, l_artid], querySuccess, queryError);
            }
        }
        //Caricamento INBOX da locale
        _DB.transaction(executeQuery, queryError);
    }
    popupPreferitiUpdateArticleChiudi();
}
 
/**
 * Chiude il popup per la modifica di un articolo preferito
 */
function popupPreferitiUpdateArticleChiudi(){
    //$('#modifica_articolo_preferito').fadeOut();
    $('#modifica_articolo_preferito').css('display', 'none');
}





			var iscroll = null, indexTextZoom = 0;
			var isSmartphone = null;

			function onBodyLoad() {
				//alert('isSmartphone ' + isSmartphone);
					
				setTimeout(function() {
					// FONT SIZE CALCULATION
					var isPortrait = window.innerWidth < window.innerHeight;
					var fontSizeRatio = 0;
					if (isSmartphone) {
						fontSizeRatio = (isPortrait) ? Math.round(window.innerHeight * 0.023) : Math.round(window.innerWidth * 0.020);
					} else {
						fontSizeRatio = (isPortrait) ? Math.round(window.innerHeight * 0.018) : Math.round(window.innerWidth * 0.015);
					}
					$('body').css('font-size', fontSizeRatio + 'px');
					fontSizeRatio = null;
					
					// SET TITOLI INTERNI AL TESTO
               var text = $("#contenuto_testo").html();
               text = text.replace(/<(br|BR)>([^>a-z]+)<(br|BR)><(br|BR)>/g, '<BR><div class="titoletto2" style="margin-top: 18px;">$2</div>');
               text = text.replace(/<(br|BR)>([^>a-z]+)<(br|BR)>/g, '<BR><div class="titoletto2" style="margin-top: 18px;">$2</div>');
               text = text.replace(/^<div>([^>a-z]+)<(BR|br)>/g, '<div><div class="titoletto1">$1</div>');
               text = text.replace(/^([^>a-z]+)<(BR|br)>/g, '<div class="titoletto1">$1</div>');
        			$("#contenuto_testo").html(text);
					
					// LAYOUT
					if (isSmartphone) {
						initArticleSmartphone(0);
					} else {
						$('#wrapper_testo').height($('#big_wrapper').height() - $('#wrapper_titoli').outerHeight() - $('#wrapper_pos').height());
					}
					
					setArticle();
					if (!isSmartphone) $('#indicator li').eq(0).addClass('active');
					$('#shadow').fadeOut('normal');
					
					
					// FONT-SIZE BUTTONS
					$('#font_size_increment').unbind('click').bind('click', function() {
						if ($(this).hasClass('disabled')) return;
						if (indexTextZoom < 5) {
							var value = parseInt($('#contenuto_testo').css('font-size')) + 2 ;
							$('#contenuto_testo').css('font-size', value + 'px');
							saveFont(value);
							indexTextZoom++;
							saveIndexTextZoom(''+indexTextZoom);
						}
						if (!isSmartphone) iscroll.scrollTo(0, 0, 0);
						setArticle();
						if (!isSmartphone) {
							$('#indicator li').removeClass('active');
							$('#indicator li').eq(0).addClass('active');
						}
					});
					
					$('#font_size_decrement').unbind('click').bind('click', function() {
						if ($(this).hasClass('disabled')) return;
						if (indexTextZoom > 0) {
							var value = parseInt($('#contenuto_testo').css('font-size')) - 2 ;
							$('#contenuto_testo').css('font-size', value + 'px');
							saveFont(value);
							indexTextZoom--;
							saveIndexTextZoom(''+indexTextZoom);
						}
						if (!isSmartphone) iscroll.scrollTo(0, 0, 0);
						setArticle();
						if (!isSmartphone) {
							$('#indicator li').removeClass('active');
							$('#indicator li').eq(0).addClass('active');
						}
					});
				}, 1000);
			}
			
			
			function saveFont(value){
				$('#contenuto_testo').css('font-size',value + 'px');
				window.accessDroid.saveFont(value);
			}
			
			function getFont(){
				return window.accessDroid.getFont();
			}
			
			function setFont(value){
				try{
					$('#contenuto_testo').css('font-size',value + 'px');
					setArticle();
				}catch(exc){
					alert('error '+exc.message);
				}
			}
			
			function retFont(){
				return parseInt($('#contenuto_testo').css('font-size'));
			}
			
			function saveIndexTextZoom(value){
				window.accessDroid.saveZoom(value);
			}
			
			function setIndexTextZoom(value){
				indexTextZoom = parseInt(value);
			}
			
			
			function initArticleSmartphone(value) {
				$('#big_wrapper').css({
					'top': '0px',
					'height': '100%'
				});
				$('#wrapper_testo').css('height', 'auto');
				$('#wrapper_pos').css('height', '50px');
				$('#contenuto_testo').css({
					'padding': '0px 0px 50px 0px',
					'font-size': (value>0?value:15)+'px',
					'height': 'auto'
				});
				$('.art_occhiello').css('font-size', '15px');
				$('.art_titolo').css('font-size', '20px');
				$('.art_sottotitolo').css('font-size', '15px');
				$('.art_firma').css('font-size', '13px');
				$('#wrapper_pos .font_button').css({
					'background': 'rgba(0, 0, 0, 0.6)',
					'padding': '10px',
					'color': '#FFF'
				});
			}
			
			
			function setArticle() {
				if (isSmartphone) {
					setArticleSmartphone();
				} else {
					setArticleTablet();
				}
			}
			
			
			function setArticleTablet() {
				var colWidth = ($('#wrapper_testo').width() / 2) - 20 - 1;
				var colGap = 20;
				$('#contenuto_testo').css('-webkit-column-width', colWidth + 'px');
				$('#contenuto_testo').css('-webkit-column-gap', colGap + 'px');
				
				var closerOffsetX = $('#art_testo_closer').position().left;
				
				var totCols = Math.round((closerOffsetX + colWidth) / (colWidth + colGap));
				var textContentWidth = closerOffsetX + colWidth - 10 + (totCols - 1); // + Borders
				$('#contenuto_testo').width(textContentWidth);
				
				$('#indicator').empty();
				var _col = 0;
				for (var i = 0; i < Math.ceil(totCols / parseInt($('#wrapper_testo').width() / colWidth)); i++) {
					$('#indicator').append('<li></li>');
					_col++;
				}
				
 				if(_col <= 1) {
                    $('#indicator').hide();
                }else{
                	 $('#indicator').show();
                }
				
					if (!iscroll) {
						iscroll = new iScroll('wrapper_testo', {
							snap: true,
							momentum: false,
							hScrollbar: false,
							vScrollbar: false,
							vScroll: false,
							hScroll: true,
							onScrollEnd: function () {
								$('#indicator li').removeClass('active');
								$('#indicator li').eq(this.currPageX).addClass('active');
							}
						});
					} else {
						if(iscroll)
							iscroll.refresh();
					}
				
				
				/*
				if(indicator_count < 2){
					$('#indicator').hide();
				}else{
					$('#indicator').show();
				}*/
			}
			
			
			function setArticleSmartphone() {
				if (!iscroll) {
					iscroll = new iScroll('big_wrapper', {
						hScrollbar: false,
						vScrollbar: false
					});
				} else {
					iscroll.refresh();
				}
			}
			
			
			document.addEventListener("DOMContentLoaded", onBodyLoad, false);
		






/**
 * @author ABertacco
 */
var _DEBUG_MODE = !('ontouchstart' in window);
var _CURRENT_ARTICLE = null;

function onBodyLoad(){

    mostraTopbar();
    
    if (_DB == null) {
        inizializzaDatabase();
        preferitiDBinit();
    }
    
    if (_DEBUG_MODE) {
        //loadArticoloFromDB({"id":"1317664837","issue_descr":"20111008","edizione_descr":"SOLE","testata_descr":"Il Sole 24 ORE","sezione":"1530","edizione":"SOLE","sezione_descr":"ECONOMIA E IMPRESE","photos":[["/S24/20111008/SOLE//IMMAGINI/photo/25/26_ratti_omaggio.jpg",""]],"pagina":"25","issue":"20111008","titolo":"Sfilate. Milano non cede a New York\nconfermate le date per il 2012 Pag. 28","testata":"S24"});
		loadArticolo({artid:'1317664464', testata:'S24', edizione:'SOLE', issue:'20111008', testata_descr:'Il Sole 24 ORE', edizione_descr:'SOLE', issue_descr:'20111008', pagina:1, sezione:'PRIMA', occhiello: ["I GIORNI DELLA SVOLTA"], titolo: ["<firma> Walter Riolfi</firma>Primi segnali di cauto ottimismo"], sottotitolo: [], firme: [], testo: ["<br /><br /><br /> \nNelle ultime tre sedute, le Borse europee sono rimbalzate del 6,5% e le banche dell'area euro del 10%. Parallelamente, il rendimento del Treasury decennale Usa è volato di 31 centesimi al 2,11% e quello del Bund di 27 centesimi al 2%. Nelle ultime quattro sedute Wall Street ha guadagnato il 5,1%, così come le banche. Pure le materie prime hanno recuperato un buon 4%. Qualche grossa novità dev'essere nell'aria.\nMa quale? Se si dovessero valutare le notizie attraverso le parole spese dalle autorità politiche, monetarie e dei vari organismi internazionali, si direbbe che siamo al punto di svolta nella crisi dei debiti sovrani. Il guaio è che s'è trattato quasi solo di parole e di fatti concreti non se n'è visto alcuno: a parte la decisione della Bce di comprare bond bancari.\nContinua u pagina 7"], photos: [], grafici: []}, [{"items":[{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/01_590-490.jpg","descrizione":"Il World Trade Center riflesso su una lapide di fronte a Ground Zero sulla quale sono riportati i nomi delle persone rimaste uccise nel crollo delle Torri Gemelle (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/02_590-490.jpg","descrizione":"Uno degli aerei dirottati si avvicina al World Trade Center poco prima di schiantarsi contro il grattacielo simbolo di New York (AFP PHOTO)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/03_590-490.jpg","descrizione":"Le torri gemelle del World Trade Center bruciano dopo lo schianto degli aerei dirottati (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/04_590-490.jpg","descrizione":"Una donna guarda attraverso una finestra panoramica del sito del World Trade Center di New York, dieci anni dopo la tragedia (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/05_590-490.jpg","descrizione":"Alcune persone osservano il sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/06_590-490.jpg","descrizione":"Un uomo seduto davanti al World Trade Center; riflesso alle sue spalle, il World Financial Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/07_590-490.jpg","descrizione":"Il sito del World Trade Center visto attraverso una recinzione che delimita l'area dei lavori di ricostruzione (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/08_590-490.jpg","descrizione":"Un operaio si prende una pausa durante i lavori di ricostruzione del sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/09_590-490.jpg","descrizione":"Una coppia osserva il sito del World Trade Center da un marciapiede di New York (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/10_590-490.jpg","descrizione":"Alcune persone osservano attraverso una vetrata panoramica il sito del World Trade Center di New York, dieci anni dopo la tragedia (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/11_590-490.jpg","descrizione":"Le fotografie dei Vigili del Fuoco di New York (FDNY) vittime della attacchi dell'11 settembre al World Trade Center, in una caserma dei pompieri di New York (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/12_590-490.jpg","descrizione":"Una veduta del sito del World Trade Center a New York, com'è oggi (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/13_590-490.jpg","descrizione":"Un'immagine del World Trade Center prima degli attacchi dell'11 settembre 2001, incollata su un palo all'esterno di una caserma dei pompieri (REUTERS))"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/14_590-490.jpg","descrizione":"Il sito del World Trade Center visto attraverso una recinzione che delimita l'area dei lavori di ricostruzione (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/15_590-490.jpg","descrizione":"Un operaio prega davanti al sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/16_590-490.jpg","descrizione":"Un pezzo di acciaio ritorto dagli attacchi dell'11 settembre 2001 con appese alcune bandiere degli Stati Uniti è esposto in un sito memoriale di fronte a Ground Zero (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/17_590-490.jpg","descrizione":"Piastrelle appese davanti al World Trade Center in memoria delle vittime dell'11 settembre 2001 (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/18_590-490.jpg","descrizione":"Operai al lavoro nell'opera di ricostruzione del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/19_590-490.jpg","descrizione":"In quest'immagine dell'11 settembre 2011, la torre sud del World Trade Center comincia a crollare dopo l'attacco terroristico (AP Photo/Amy Sancetta)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/20_590-490.jpg","descrizione":"Una persona si lancia a testa in giù dalla torre nord del World Trade Center l'11 settembre 2001. (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/21_590-490.jpg","descrizione":"La Freedom Tower, ormai quasi completata, presso il sito del World Trade Center (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/22_590-490.jpg","descrizione":"Un camion dei pompieri di New York City parcheggiato vicino alla Freedom Tower (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/23_590-490.jpg","descrizione":"Nel sito del World Trade Center continuano i lavori di ricostruzione (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/24_590-490.jpg","descrizione":"La grande fontana collocata a nord del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/25_590-490.jpg","descrizione":"L'acqua scorre nella vasca sud del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/26_590-490.jpg","descrizione":"Un operaio lucida la lapide con i nomi delle vittime degli attacchi al World Trade Center sopra la fontana sud del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/27_590-490.jpg","descrizione":"Il National September 11 Memorial e il Museum si vedono sullo sfondo della fontana sud del World Trade Center Memorial (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/28_590-490.jpg","descrizione":"Le torri gemelle del World Trade Center bruciano dietro l'Empire State Building l'11 settembre 2001 (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/29_590-490.jpg","descrizione":"Nell'area del World Trade Center la ricostruzione continua (AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/30_590-490.jpg?uuid=d14ab384-ca45-11e0-ade3-845e3fa0f271","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/31_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/32_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/33_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/34_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/35_590-490.jpg","descrizione":"(AFP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/36_590-490.jpg","descrizione":"(AFP Photo)"}],"id":"31","package":"1317664464","descrizione":"Photogallery Sole Copertina","preview":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/36_590-490.jpg","tipo":"PHOTOS"},{"items":[{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/01_590-490.jpg","descrizione":"Il World Trade Center riflesso su una lapide di fronte a Ground Zero sulla quale sono riportati i nomi delle persone rimaste uccise nel crollo delle Torri Gemelle (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/02_590-490.jpg","descrizione":"Uno degli aerei dirottati si avvicina al World Trade Center poco prima di schiantarsi contro il grattacielo simbolo di New York (AFP PHOTO)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/03_590-490.jpg","descrizione":"Le torri gemelle del World Trade Center bruciano dopo lo schianto degli aerei dirottati (AP Photo)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/04_590-490.jpg","descrizione":"Una donna guarda attraverso una finestra panoramica del sito del World Trade Center di New York, dieci anni dopo la tragedia (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/05_590-490.jpg","descrizione":"Alcune persone osservano il sito del World Trade Center (REUTERS)"},{"url":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/06_590-490.jpg","descrizione":"Un uomo seduto davanti al World Trade Center; riflesso alle sue spalle, il World Financial Center (REUTERS)"}],"id":"41","package":"1317664464","descrizione":"New York 11/9 10 immagini","preview":"http://foto.ilsole24ore.com/SoleOnLine5/Notizie/USA/2011/11-settembre-2001-2011/img_11-settembre-2001-2011/01_590-490.jpg","tipo":"PHOTOS"}]);
    }
	
	$('#container_adv').writeCapture().load('http://adv.ilsole24ore.it/RealMedia/ads/adstream_sx.ads/www.ilsole24ore.it/11/ipad_app_v2/' + new Date().getTime() + '@Ticker_04', function() { }).endCapture();
}

function loadArticoloFromDB(articolo, arrPhotos, arrVideos){
	try {
		_CURRENT_ARTICLE = {};
		
		_CURRENT_ARTICLE.artid = typeof articolo.id != "undefined" ? articolo.id : 'x_' + new Date().getTime();
		_CURRENT_ARTICLE.testata = typeof articolo.testata != "undefined" ? articolo.testata : '';
		_CURRENT_ARTICLE.testata_descr = typeof articolo.testata_descr != "undefined" ? articolo.testata_descr : '';
		_CURRENT_ARTICLE.issue = typeof articolo.issue != "undefined" ? articolo.issue : '';
		_CURRENT_ARTICLE.issue_descr = typeof articolo.issue_descr != "undefined" ? articolo.issue_descr : '';
		_CURRENT_ARTICLE.edizione = typeof articolo.edizione != "undefined" ? articolo.edizione : '';
		_CURRENT_ARTICLE.edizione_descr = typeof articolo.edizione_descr != "undefined" ? articolo.edizione_descr : '';
		_CURRENT_ARTICLE.sezione = typeof articolo.sezione_descr != "undefined" ? articolo.sezione_descr : '';
		_CURRENT_ARTICLE.pagina = typeof articolo.pagina != "undefined" ? articolo.pagina : 1;
		_CURRENT_ARTICLE.titolo = (typeof articolo.titolo != "undefined" && articolo.titolo != null && articolo.titolo.length > 0) ? articolo.titolo : '';
		_CURRENT_ARTICLE.sottotitolo = (typeof articolo.sottotitolo != "undefined" && articolo.sottotitolo != null && articolo.sottotitolo.length > 0) ? articolo.sottotitolo : '';
		_CURRENT_ARTICLE.occhiello = (typeof articolo.occhiello != "undefined" && articolo.occhiello != null && articolo.occhiello.length > 0) ? articolo.occhiello : '';
		_CURRENT_ARTICLE.firma = (typeof articolo.firma != "undefined" && articolo.firma != null && articolo.firma.length > 0) ? articolo.firma : '';
		_CURRENT_ARTICLE.testo = (typeof articolo.testo != "undefined" && articolo.testo != null && articolo.testo.length > 0) ? articolo.testo : '';
		_CURRENT_ARTICLE.tags = ""; // usato per agganciare in automatico gli stessi metodi del modifica tags
		_CURRENT_ARTICLE.photos = (typeof articolo.photos == "undefined" || articolo.photos == null || articolo.photos.length == 0) ? [] : articolo.photos;
		_CURRENT_ARTICLE.grafici = (typeof articolo.grafici == "undefined" || articolo.grafici == null || articolo.grafici.length == 0) ? [] : articolo.grafici;
		_CURRENT_ARTICLE.arr_photos = (typeof arrPhotos == "undefined" || arrPhotos == null || arrPhotos.length == 0) ? [] : arrPhotos;
		_CURRENT_ARTICLE.arr_videos = (typeof arrVideos == "undefined" || arrVideos == null || arrVideos.length == 0) ? [] : arrVideos;
		
		return renderArticolo();
	} catch (exc) {
		return exc.message;
	}
}

function loadArticolo(articolo, arrPhotos, arrVideos){
	try {
		_CURRENT_ARTICLE = {};
		
		_CURRENT_ARTICLE.artid = typeof articolo.artid != "undefined" ? articolo.artid : 'x_' + new Date().getTime();
		_CURRENT_ARTICLE.testata = typeof articolo.testata != "undefined" ? articolo.testata : '';
		_CURRENT_ARTICLE.testata_descr = typeof articolo.testata_descr != "undefined" ? articolo.testata_descr : '';
		_CURRENT_ARTICLE.issue = typeof articolo.issue != "undefined" ? articolo.issue : '';
		_CURRENT_ARTICLE.issue_descr = typeof articolo.issue_descr != "undefined" ? articolo.issue_descr : '';
		_CURRENT_ARTICLE.edizione = typeof articolo.edizione != "undefined" ? articolo.edizione : '';
		_CURRENT_ARTICLE.edizione_descr = typeof articolo.edizione_descr != "undefined" ? articolo.edizione_descr : '';
		_CURRENT_ARTICLE.sezione = typeof articolo.sezione != "undefined" ? articolo.sezione : '';
		_CURRENT_ARTICLE.pagina = typeof articolo.pagina != "undefined" ? articolo.pagina : 1;
		_CURRENT_ARTICLE.titolo = (typeof articolo.titolo != "undefined" && articolo.titolo != null && articolo.titolo.length > 0) ? articolo.titolo.join('<br />') : '';
		_CURRENT_ARTICLE.sottotitolo = (typeof articolo.sottotitolo != "undefined" && articolo.sottotitolo != null && articolo.sottotitolo.length > 0) ? articolo.sottotitolo.join('<br />') : '';
		_CURRENT_ARTICLE.occhiello = (typeof articolo.occhiello != "undefined" && articolo.occhiello != null && articolo.occhiello.length > 0) ? articolo.occhiello.join('<br />') : '';
		_CURRENT_ARTICLE.firma = (typeof articolo.firma != "undefined" && articolo.firma != null && articolo.firma.length > 0) ? articolo.firma.join('<br />') : '';
		_CURRENT_ARTICLE.testo = (typeof articolo.testo != "undefined" && articolo.testo != null && articolo.testo.length > 0) ? articolo.testo.join('<br />') : '';
		_CURRENT_ARTICLE.tags = ""; // usato per agganciare in automatico gli stessi metodi del modifica tags
		_CURRENT_ARTICLE.photos = (typeof articolo.photos == "undefined" || articolo.photos == null || articolo.photos.length == 0) ? [] : articolo.photos;
		_CURRENT_ARTICLE.grafici = (typeof articolo.grafici == "undefined" || articolo.grafici == null || articolo.grafici.length == 0) ? [] : articolo.grafici;
		_CURRENT_ARTICLE.arr_photos = (typeof arrPhotos == "undefined" || arrPhotos == null || arrPhotos.length == 0) ? [] : arrPhotos;
		_CURRENT_ARTICLE.arr_videos = (typeof arrVideos == "undefined" || arrVideos == null || arrVideos.length == 0) ? [] : arrVideos;
		
		if (!_DEBUG_MODE) {
	        setTimeout(function(){
	            window.location = 'dsh://loading.done';
	        }, 500);
	    }
	} 
	catch (exc) {
		return exc.message;
	}
	return renderArticolo();
}

function renderArticolo() {
	try {
        checkDBalreadyPresent();
        
		$('.box_articolo_selected').removeClass('box_articolo_selected');
		if (document.getElementById('box_articolo_' + _CURRENT_ARTICLE.artid) != null) {
			$('#box_articolo_' + _CURRENT_ARTICLE.artid).addClass('box_articolo_selected');
		}
		
        $('#articolo_header_sezione').html(_CURRENT_ARTICLE.sezione);
        $('#articolo_header_edizione').html(_CURRENT_ARTICLE.edizione_descr);
        $('#articolo_header_issue').html(_CURRENT_ARTICLE.issue_descr);
        
        if (_CURRENT_ARTICLE.titolo.length > 0) {
            $('#articolo_titolazione_titolo').html(_CURRENT_ARTICLE.titolo);
			document.getElementById('articolo_titolazione_titolo').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_titolo').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.sottotitolo.length > 0) {
            $('#articolo_titolazione_sottotitolo').html(_CURRENT_ARTICLE.sottotitolo);
			document.getElementById('articolo_titolazione_sottotitolo').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_sottotitolo').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.occhiello.length > 0) {
            $('#articolo_titolazione_occhiello').html(_CURRENT_ARTICLE.occhiello);
			document.getElementById('articolo_titolazione_occhiello').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_occhiello').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.firma.length > 0) {
            $('#articolo_titolazione_firma').html(_CURRENT_ARTICLE.firma);
			document.getElementById('articolo_titolazione_firma').style.display = 'block';
        }
        else {
            document.getElementById('articolo_titolazione_firma').style.display = 'none';
        }
        
        if (_CURRENT_ARTICLE.testo.length > 0) {
            $('#articolo_body_text').html(_CURRENT_ARTICLE.testo);
        }
        else {
            $('#articolo_body_text').html('&nbsp;');
        }
        
        if (_CURRENT_ARTICLE.photos.length == 0) {
            document.getElementById('articolo_body_media_photos').style.display = 'none';
        }
        else {
			document.getElementById('articolo_body_media_photos').style.display = 'block';
			document.getElementById('articolo_body_media_photos').innerHTML = '';
            for (var i = 0; i < _CURRENT_ARTICLE.photos.length; i++) {
                var box = document.createElement('div');
                box.className = "articolo_body_media_photo";
                document.getElementById('articolo_body_media_photos').appendChild(box);
                
                var con = document.createElement('div');
                con.className = "articolo_body_media_photo_container";
                box.appendChild(con);
                
                var crop = document.createElement('div');
                crop.className = "articolo_body_media_photo_container_crop";
                con.appendChild(crop);
                
                var cropbox = document.createElement('div');
                cropbox.className = 'articolo_body_media_photo_container_crop_box';
                crop.appendChild(cropbox);
                
                var img = document.createElement('img');
                cropbox.appendChild(img);
                img.src = 'http://10.190.11.28/_deploy/' + _CURRENT_ARTICLE.photos[i][0] + '.thumb.jpg';
                
                if (_CURRENT_ARTICLE.photos[i][1] != null && _CURRENT_ARTICLE.photos[i][1].length > 0) {
                    var dida = document.createElement('div');
                    con.appendChild(dida);
                    dida.innerHTML = _CURRENT_ARTICLE.photos[i][1];
                    dida = null;
                }
                
                var open = document.createElement('img');
                open.className = 'articolo_body_media_photo_container_open';
                crop.appendChild(open);
                open.src = 'imgs/articolo_body_media_photo_container_open.png';
                
				box.onclick = (function(url) {
					return function() {
						window.location = 'dsh://photo.open' + url + '.jpg';
					}
				})(_CURRENT_ARTICLE.photos[i][0]);
				
				
                open = null;
                img = null;
                cropbox = null;
                crop = null;
                con = null;
                box = null;
            }
        }
		
		if (_CURRENT_ARTICLE.grafici.length == 0) {
			document.getElementById('articolo_body_media_grafici').style.display = 'none';
		} else {
			document.getElementById('articolo_body_media_grafici').style.display = 'block';
			document.getElementById('articolo_body_media_grafici_content').innerHTML = '';
			for (var i = 0; i < _CURRENT_ARTICLE.grafici.length; i++) {
				var box = document.createElement('div');
				document.getElementById('articolo_body_media_grafici_content').appendChild(box);
				box.className = 'articolo_body_media_arricchimento_item';
				box.innerHTML = _CURRENT_ARTICLE.grafici[i][1].length > 0 ? _CURRENT_ARTICLE.grafici[i][1] : 'Grafico';
				
				box.onclick = (function (url) {
					return function() {
						window.location = 'dsh://photo.open' + url + '.jpg';
					}
				})(_CURRENT_ARTICLE.grafici[i][0]);
				
				box = null;
			}
		}
		
		if (_CURRENT_ARTICLE.arr_photos.length == 0) {
	        document.getElementById('articolo_body_media_gallery').style.display = 'none';
	    }
	    else {
	        document.getElementById('articolo_body_media_gallery').style.display = 'block';
	        document.getElementById('articolo_body_media_gallery_content').innerHTML = '';
	        for (var i = 0; i < _CURRENT_ARTICLE.arr_photos.length; i++) {
				var box = document.createElement('div');
				box.className = 'articolo_body_media_arricchimento_item';
				document.getElementById('articolo_body_media_gallery_content').appendChild(box);
				box.innerHTML = _CURRENT_ARTICLE.arr_photos[i]['descrizione'] != null && _CURRENT_ARTICLE.arr_photos[i]['descrizione'].length > 0 ? _CURRENT_ARTICLE.arr_photos[i]['descrizione'] : 'Gallery';
				
				box.onclick = (function(id) {
					return function(event) {
						event.preventDefault();
						event.stopPropagation();
						window.location = 'dsh://gallery.open/' + id;
					}
				})(_CURRENT_ARTICLE.arr_photos[i]['id']);
				
				box = null;
			}
	    }
		
		if (_CURRENT_ARTICLE.arr_videos.length == 0) {
	        document.getElementById('articolo_body_media_video').style.display = 'none';
	    }
	    else {
	        document.getElementById('articolo_body_media_video').style.display = 'block';
	        document.getElementById('articolo_body_media_video_content').innerHTML = '';
	        for (var i = 0; i < _CURRENT_ARTICLE.arr_videos.length; i++) {
				var box = document.createElement('div');
				box.className = 'articolo_body_media_arricchimento_item';
				document.getElementById('articolo_body_media_video_content').appendChild(box);
				box.innerHTML = _CURRENT_ARTICLE.arr_videos[i]['descrizione'] != null && _CURRENT_ARTICLE.arr_videos[i]['descrizione'].length > 0 ? _CURRENT_ARTICLE.arr_videos[i]['descrizione'] : 'Video';
				
				box.onclick = (function(id) {
					return function(event) {
						event.preventDefault();
						event.stopPropagation();
						window.location = 'dsh://video.open/' + id;
					}
				})(_CURRENT_ARTICLE.arr_videos[i]['id']);
				
				box = null;
			}
	    }
		
		
		if (_MMEDIA_ISCROLL != null) {
			_MMEDIA_ISCROLL.destroy();
			_MMEDIA_ISCROLL = null;
		}
		
		var fullArr = _CURRENT_ARTICLE.arr_photos.concat(_CURRENT_ARTICLE.arr_videos);
		if (fullArr.length == 0)  {
			document.getElementById('articolo_mainmedia').style.display = 'none';
		}
		else {
			document.getElementById('articolo_mainmedia').style.display = 'block';
			document.getElementById('articolo_mainmedia_container').innerHTML = '';
			document.getElementById('articolo_mainmedia_progress').innerHTML = '';
			$('#articolo_mainmedia_container').width($('#articolo_mainmedia_wrapper').width() * fullArr.length);
			for (var i = 0; i < fullArr.length; i++) {
				var box = document.createElement('div');
				box.className = 'articolo_mainmedia_container_box';
				document.getElementById('articolo_mainmedia_container').appendChild(box);
				
				var container = document.createElement('div');
				container.className = 'articolo_mainmedia_container_box_container';
				box.appendChild(container);
				
				var img = document.createElement('img');
				img.className = 'articolo_mainmedia_container_box_img';
				container.appendChild(img);
				img.src = fullArr[i]['preview'];
				
				var desc
				
				var icon = document.createElement('img');
				icon.className = 'articolo_mainmedia_container_icon';
				box.appendChild(icon);
				icon.src = 'imgs/ps' + fullArr[i]['tipo'] + '.png';
				
				if (fullArr[i]['tipo'] == "VIDEO") {
					box.onclick = (function(id) {
						return function(event) {
							event.preventDefault();
							event.stopPropagation();
							window.location = 'dsh://video.open/' + id;
						}
					})(fullArr[i]['id']);
				} else if (fullArr[i]['tipo'] == "PHOTOS") {
					box.onclick = (function(id) {
						return function(event) {
							event.preventDefault();
							event.stopPropagation();
							window.location = 'dsh://gallery.open/' + id;
						}
					})(fullArr[i]['id']);
				}
				
				icon = null;
				img = null;
				container = null;
				box = null;
				
				var progress = document.createElement('div');
				progress.className = 'articolo_mainmedia_progress_box' + (i == 0 ? ' articolo_mainmedia_progress_box_active' : '');
				document.getElementById('articolo_mainmedia_progress').appendChild(progress);
				progress = null;
			}
			
			_MMEDIA_ISCROLL = new iScroll('articolo_mainmedia_wrapper', {
				snap: true,
				momentum: false,
				hScrollbar: false,
				vScroll: false,
				onScrollEnd: function () {
					document.querySelector('.articolo_mainmedia_progress_box_active').className = 'articolo_mainmedia_progress_box';
					document.querySelector('#articolo_mainmedia_progress > div:nth-child(' + (this.currPageX+1) + ')').className = 'articolo_mainmedia_progress_box articolo_mainmedia_progress_box_active';
				}
			});
		}
        
    } 
    catch (exc) {
        return exc.message;
    }
    
    updateOrientation();
	
	return "OK";
}

var _MMEDIA_ISCROLL = null;
var _ARTICOLO_ISCROLL = null;
function updateOrientation(){
    setTimeout(function(){
        if (_ARTICOLO_ISCROLL == null) {
            _ARTICOLO_ISCROLL = new iScroll('wrapper_articolo');
        }
        else {
			_ARTICOLO_ISCROLL.scrollTo(0,0,0);
            _ARTICOLO_ISCROLL.refresh();
        }
    }, 200);
}


var _TIMEOUT_MENU = null;
function mostraTopbar(){
    document.getElementById('wrapper_topbar').style['-webkit-transform'] = 'translate3d(0px, 0px, 0)';
    if (_TIMEOUT_MENU != null) {
        clearTimeout(_TIMEOUT_MENU);
        _TIMEOUT_MENU = null;
    }
    _TIMEOUT_MENU = setTimeout(nascondiTopbar, 2000);
}

function nascondiTopbar(){
    document.getElementById('wrapper_topbar').style['-webkit-transform'] = 'translate3d(0px, -50px, 0)';
}

function checkDBalreadyPresent(){
    if (_DB) {
        var querySuccess = function(tx, rs){
            checkDBalreadyPresent_aux(rs.rows.length > 0);
        }
        var queryError = function(tx, p_error){
            checkDBalreadyPresent_aux(false);
        }
        var executeQuery = function(tx){
            tx.executeSql('SELECT * FROM ' + _PREFERITI_ARTICLE_DB_NAME + ' WHERE artid=?;', [_CURRENT_ARTICLE.artid], querySuccess, queryError);
        }
        _DB.transaction(executeQuery);
    }
    else {
    
        checkDBalreadyPresent_aux(false);
    }
}

function checkDBalreadyPresent_aux(isPresent){
    document.getElementById('btn_preferiti_off').style.display = isPresent ? 'none' : 'inline-block';
    document.getElementById('btn_preferiti_on').style.display = isPresent ? 'inline-block' : 'none';
}


function openSavePreferiti(){
    if (_CURRENT_ARTICLE == null) 
        return;
    
    popupPreferitiUpdateArticle(_CURRENT_ARTICLE);
}

function doSavePreferiti(){
    preferitiDBsave(_CURRENT_ARTICLE.artid, _CURRENT_ARTICLE.testata, _CURRENT_ARTICLE.testata_descr, _CURRENT_ARTICLE.issue, _CURRENT_ARTICLE.issue_descr, _CURRENT_ARTICLE.edizione, _CURRENT_ARTICLE.edizione_descr, _CURRENT_ARTICLE.sezione, _CURRENT_ARTICLE.pagina, _CURRENT_ARTICLE.occhiello, _CURRENT_ARTICLE.titolo, _CURRENT_ARTICLE.sottotitolo, _CURRENT_ARTICLE.firma, _CURRENT_ARTICLE.testo, $('#modifica_articolo_preferito #id_tags').val());
    
    document.getElementById('btn_preferiti_off').style.display = 'none';
    document.getElementById('btn_preferiti_on').style.display = 'inline-block';
    
    popupPreferitiUpdateArticleChiudi();
}

function preferitiDBinit(){
    if (_DB) {
        var querySuccess = function(){
            console.log('OK preferitiDBinit');
        }
        var queryError = function(tx, p_error){
            console.log('KO preferitiDBinit ' + p_error.message);
        }
        var executeQuery = function(tx){
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + _PREFERITI_ARTICLE_DB_NAME + ' (' + _PREFERITI_ARTICLE_DB_COLUMNS + ')', [], querySuccess, queryError);
            tx.executeSql('CREATE TABLE IF NOT EXISTS ' + _PREFERITI_TAG_DB_NAME + ' (' + _PREFERITI_TAG_DB_COLUMNS + ')', [], querySuccess, queryError);
        }
        _DB.transaction(executeQuery);
    }
}

function preferitiDBsave(artid, testata, testata_descr, issue, issue_descr, edizione, edizione_descr, sezione, pagina, occhiello, titolo, sottotitolo, firma, testo, tags){
    if (_DB) {
        var querySuccess = function(tx){
            console.log('OK SAVE LOCAL DB PREFERITO: ' + artid);
            var tags_arr = tags.split(',');
            for (var t = 0; t < tags_arr.length; t++) {
                var l_tag = tags_arr[t].replace(/^\s+|\s+$/g, ""); //TRIM
                if (l_tag.length <= 0) 
                    continue;
                tx.executeSql('INSERT INTO ' + _PREFERITI_TAG_DB_NAME + ' VALUES(?, ?);', [l_tag, artid], function(){
                    console.log('OK SAVE LOCAL DB TAG');
                }, function(tx, p_error){
                    console.log('KO SAVE LOCAL DB TAG ' + p_error.message);
                });
            }
        }
        var queryError = function(tx, p_error){
            console.log('KO SAVE LOCAL DB PREFERITO: ' + p_error.message);
        }
        var executeQuery = function(tx){
            tx.executeSql('INSERT INTO ' + _PREFERITI_ARTICLE_DB_NAME + ' VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATETIME(\'NOW\'), ?);', [artid, testata, testata_descr, issue, issue_descr, edizione, edizione_descr, sezione, pagina, occhiello, titolo, sottotitolo, firma, testo, tags], querySuccess, queryError);
        }
        _DB.transaction(executeQuery);
    }
}

/******************************************************
 Gestione indice visibile in landscape
 ******************************************************/
var _ISCROLL_SEZIONI = null;
var _ISCROLL_ARTICOLI = null;

function loadSezioni(sezioniJson){
    if (_ISCROLL_SEZIONI != null) {
        _ISCROLL_SEZIONI.destroy();
        _ISCROLL_SEZIONI = null;
    }
    
    document.getElementById('sezioni_container').innerHTML = '';
    
    document.getElementById('sezioni_container').style.width = 160 * sezioniJson.length + 'px';
    
    for (var i = 0; i < sezioniJson.length; i++) {
    
        var box = document.createElement('div');
        box.id = 'box_section_' + sezioniJson[i].section;
        box.className = 'box_sezione';
        document.getElementById('sezioni_container').appendChild(box);
        
        var inner = document.createElement('div');
        box.appendChild(inner);
        
        inner.innerHTML = sezioniJson[i].description;
        
        box.onclick = (function(sid){
            return function(){
                sezioneSelected(sid);
            }
        })(sezioniJson[i].section);
        
        inner = null;
        box = null;
        
    }
    
    
    setTimeout(function(){
        _ISCROLL_SEZIONI = new iScroll('sezioni_wrapper', {
            hScroll: true,
            vScroll: false
        });
		_ISCROLL_ARTICOLI.scrollTo(0,0,100);
    }, 200);
    
    
    return "OK";
    
}

function sezioneSelected(sid){
    $('.box_sezione_selected').removeClass('box_sezione_selected');
	window.location = 'dsh://indice.load/' + sid;
}

function loadListaArticoliSezione(sid, articoliJson){
	try {
		$('#box_section_' + sid).addClass('box_sezione_selected');
		
		if (_ISCROLL_ARTICOLI != null) {
			_ISCROLL_ARTICOLI.destroy();
			_ISCROLL_ARTICOLI = null;
		}
		
		document.getElementById('articoli_container').innerHTML = '';
		
		if (articoliJson.length == 0) 
			return "VUOTO";
		
		for (var i = 0; i < articoliJson.length; i++) {
		
			var box = document.createElement('div');
			box.className = 'box_articolo' + (_CURRENT_ARTICLE != null && articoliJson[i].id == _CURRENT_ARTICLE.artid ? ' box_articolo_selected' : '');
			box.id = 'box_articolo_' + articoliJson[i].id;
			document.getElementById('articoli_container').appendChild(box);
			
			var titolo = document.createElement('h1');
			box.appendChild(titolo);
			titolo.innerHTML = articoliJson[i].titolo;
			
			box.onclick = (function(aid){
				return function(){
					window.location = 'dsh://indice.open/' + aid;
				}
			})(articoliJson[i].id);
			
			titolo = null;
			box = null;
			
		}
		
		setTimeout(function(){
			_ISCROLL_ARTICOLI = new iScroll('articoli_wrapper', {
				hScroll: false,
				vScroll: true
			});
			_ISCROLL_ARTICOLI.scrollTo(0,0,100);
			//setTimeout(function() { _ISCROLL_ARTICOLI.refresh() }, 500);
			
			
			if (_ISCROLL_SEZIONI != null) {
				_ISCROLL_SEZIONI.scrollToElement('#box_section_' + sid, 200);
			}
			
		}, 300);
		
		return "OK";
	} catch (exc) {
		return exc.message;
	}
}


/******************************************************
 Gestione database
 ******************************************************/
var _DB_NAME = 'Sole24DB';
var _DB_SIZE = 100000;
var _DB = null;
function inizializzaDatabase(){
    console.log("Inizializzazione database");
    _DB = window.openDatabase(_DB_NAME, "1.0", _DB_NAME, _DB_SIZE);
}

var _PREFERITI_ARTICLE_DB_NAME = 'PREFERITI_ARTICLE';
var _PREFERITI_ARTICLE_DB_COLUMNS = 'artid text unique, testata text, testata_descr text, issue text, issue_descr text, edizione text, edizione_descr text, sezione text, pagina text, occhiello text, titolo text, sottotitolo text, firma text, testo text, dttm, tags text';
var _PREFERITI_TAG_DB_NAME = 'PREFERITI_TAG';
var _PREFERITI_TAG_DB_COLUMNS = 'nome text, artid text';
var _NUM_PREFERITE_TAGS = 5;


/******************************************************
 Gestione popup modifica preferiti
 ******************************************************/
/**
 * Apre il popup per la modifica di un articolo preferito
 * @params p_article Oggetto articolo così come definito nel database in locale
 */
function popupPreferitiUpdateArticle(p_article){

    //$('#modifica_articolo_preferito').fadeIn();
    if (p_article) {
    
        $('#modifica_articolo_preferito').css('display', 'inline');
        $('#modifica_articolo_preferito_title').text(p_article.titolo);
        $('#modifica_articolo_preferito_text').html('<strong>' + p_article.testata_descr + '</strong> ' + p_article.issue_descr + ' - pag. ' + parseInt(p_article.pagina));
        $('#modifica_articolo_preferito #id_tags').val(p_article.tags);
        $('#modifica_articolo_preferito #id').val(p_article.artid);
        
        
        // Inizializza i tag preferiti
        if (_DB) {
        
            var querySuccess = function(tx, p_results){
                var l_tags_help = $('#modifica_articolo_preferito_tags_help');
                // I tag preferiti vengono inseriti come possibili scelte
                l_tags_help.empty();
                for (var i = 0; i < p_results.rows.length; i++) {
                    var tag = p_results.rows.item(i);
                    l_tags_help.append('<input type="button" class="button medium gray" stye="margin-right:10px;" onclick="popupPreferitiUpdateAddTag(\'' + tag.nome + '\')" value="' + tag.nome + '" />');
                }
            }
            
            var queryError = function(p_error){
                console.log("popupPreferitiUpdateArticle: Error processing SQL: " + p_error.message);
            }
            
            var executeQuery = function(tx){
                tx.executeSql('CREATE TABLE IF NOT EXISTS ' + _PREFERITI_TAG_DB_NAME + ' (' + _PREFERITI_TAG_DB_COLUMNS + ')');
                var l_query = 'SELECT nome, COUNT(*) AS num_articles FROM ' + _PREFERITI_TAG_DB_NAME + ' GROUP BY nome ORDER BY num_articles DESC LIMIT 0,' + _NUM_PREFERITE_TAGS;
                tx.executeSql(l_query, [], querySuccess, queryError);
            }
            
            
            _DB.transaction(executeQuery, queryError);
        }
    }
}

/**
 * Aggiunge un tag all'elemento input contentente tutti i tag di un articolo preferito
 */
function popupPreferitiUpdateAddTag(p_tag){
    var l_tags_el = $('#modifica_articolo_preferito #id_tags');
    var l_tags_string = l_tags_el.val();
    
    if (l_tags_string != '') {
        l_tags_string += ', ' + p_tag;
    }
    else {
        l_tags_string = p_tag;
    }
    
    l_tags_el.val(l_tags_string);
}

/**
 * Esegue il salvataggio del preferito
 */
function popupPreferitiUpdateArticleAvanti(){
    var l_artid = $('#modifica_articolo_preferito #id').val();
    var l_tags = $('#modifica_articolo_preferito #id_tags').val();
    // Salva le modifiche
    if (_DB) {
        var querySuccess = function(tx, p_results){
            console.log("popupPreferitiUpdateArticleAvanti: Data saved, rows affected: " + p_results.rowsAffected);
        }
        var updateQuerySuccess = function(tx, p_results){
            console.log("popupPreferitiUpdateArticleAvanti: Update article success");
            if (p_results.rowsAffected > 0) {
                document.getElementById('preferiti_body_vista_container_box_tags_' + l_artid).innerHTML = 'Tags: ' + l_tags;
            }
        }
        var queryError = function(p_error){
            console.log("popupPreferitiUpdateArticleAvanti: Error processing SQL: " + p_error.message);
        }
        var executeQuery = function(tx){
            tx.executeSql('UPDATE ' + _PREFERITI_ARTICLE_DB_NAME + ' SET tags=? WHERE artid=?', [l_tags, l_artid], updateQuerySuccess, queryError);
            
            // Elimina i tag attualmente presenti per quel prodotto
            tx.executeSql('DELETE FROM ' + _PREFERITI_TAG_DB_NAME + ' WHERE artid=? OR artid=""', [l_artid], querySuccess, queryError);
            var l_tags_array = l_tags.toLowerCase().split(',');
            for (var i = 0; i < l_tags_array.length; i++) {
                var l_tag = l_tags_array[i].replace(/^\s+|\s+$/g, ""); //TRIM
                tx.executeSql('INSERT INTO ' + _PREFERITI_TAG_DB_NAME + ' (nome, artid) VALUES(?,?)', [l_tag, l_artid], querySuccess, queryError);
            }
        }
        //Caricamento INBOX da locale
        _DB.transaction(executeQuery, queryError);
    }
    popupPreferitiUpdateArticleChiudi();
}
 
/**
 * Chiude il popup per la modifica di un articolo preferito
 */
function popupPreferitiUpdateArticleChiudi(){
    //$('#modifica_articolo_preferito').fadeOut();
    $('#modifica_articolo_preferito').css('display', 'none');
}







