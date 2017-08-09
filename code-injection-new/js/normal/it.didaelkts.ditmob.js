
var APP_TYPE = null;
window.profile.init('ditmob');
page.init(function() {

buildPhrasedict();


function buildPDCat(pid, k, cid) {

	if($('div[data-ref="' + cid + '"]').size() > 0) {
		return;
	}

	var j, b=$('body'), did, dida, didc, ttl;
	
	ttl = $('#' + pid).find('.tool_title');
	
	$('.phrasedict-phrase').remove();
	for(j in language.dizfras[k]) {
		did = pid + j;
		if($('#' + did).size() > 0) { continue; }
		dida = did + '-audio';
		didc = did + '-controls';
			+ language.dizfras[k][j].phrase + '</li>';
		b.append(
			'<div id="' + did + '" data-ref="' + cid + '" class="phrasedict phrasedict-phrase">' +
			 '<div class="toolbar"><h1>DIT</h1><a href="#" class="cancel"><img src="img/prev-36-white.png" class="icon" alt="prev" /></a></div>' +
			 '<ul class="edgetoedge">' +
			  '<li class="dizfras-phrase">' + language.dizfras[k][j].phrase + '</li>' +
			  '<li class="dizfras-desc">' + language.dizfras[k][j].desc + '</li>' +
			 '</ul>' +
			 '<div style="visibility:hidden">' +
			  '<audio id="' + dida + '" data-controls="#' + didc + '">' +
			   '<source src="audio/dizfras/' + j + '.m4a" type="audio/mp4" />' +
			   '<source src="audio/dizfras/' + j + '.ogg" type="audio/ogg" />' +
			  '</audio>' +
			  '<div id="' + didc + '" class="controls">' +
			   '<div class="play"> </div>' +
			  '</div>' +
			 '</div>' +
			'</div>'
		);
		$('#' + did)
		 .on('pageAnimationStart',
		 	{player:new SimplePlayer($('#' + dida)).bindDefaultEvents()},
			function(e, info) {
				if(info.direction == 'out') {
					e.data.player.stop(); 
				} else {
					e.data.player.play();
				}
			}
		 )
		 .find('.toolbar').after(ttl.clone());
	}
}
function buildPhrasedict() {
	var
		pid = 'phrasedict', cid, did, pd = $('#' + pid + ' .edgetoedge'),
		ttl, dida, didc, k, j, s = '', b = $('body'), i = 0, a;
	$('.phrasedict-context').remove();
	ttl = $('#' + pid).find('.tool_title').text(language.common.diz_frase[0]);
	for(k in language.dizfras) {
		i++;
		cid = pid + i;
		pd.append('<li class="arrow"><a href="#' + cid + '">' + k + '</a></li>');
		s = '';
		for(j in language.dizfras[k]) {
			did = pid + j;
			s += '<li class="arrow"><a href="#' + did + '">'
				+ language.dizfras[k][j].phrase + '</li>';
		}
		b.append(
			'<div id="' + cid + '" class="phrasedict phrasedict-context">' +
			 '<div class="toolbar"><h1>DIT</h1><a href="#" class="cancel"><img src="img/prev-36-white.png" class="icon" alt="prev" /></a></div>' +
			 '<ul class="edgetoedge">' +
			  '<li>' + k + '</li>' +
			  s +
			 '</ul>' +
			'</div>'
		);
		$('#' + cid)
		 .on('pageAnimationStart', {pid:pid, k:k, cid:cid}, function(e, info) {
			if(info.direction == 'out') { return; }
			buildPDCat(e.data.pid, e.data.k, e.data.cid);
		 })
		 .find('.toolbar').after(ttl.clone());
	}
}

}, APP_TYPE);













page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var audio1 = new SimplePlayer('#audio_2223_1').bindDefaultEvents(),
		audio2 = new SimplePlayer('#audio_2223_2').bindDefaultEvents(),
		audio3 = new SimplePlayer('#audio_2223_3').bindDefaultEvents(),
		audio4 = new SimplePlayer('#audio_2223_4').bindDefaultEvents(),
		audio5 = new SimplePlayer('#audio_2223_5').bindDefaultEvents(),
		audio6 = new SimplePlayer('#audio_2223_6').bindDefaultEvents(),
		audio7 = new SimplePlayer('#audio_2223_7').bindDefaultEvents(),
		audio8 = new SimplePlayer('#audio_2223_8').bindDefaultEvents(),
		audio9 = new SimplePlayer('#audio_2223_9').bindDefaultEvents(),
		audio10 = new SimplePlayer('#audio_2223_10').bindDefaultEvents(),
		audio11 = new SimplePlayer('#audio_2223_11').bindDefaultEvents(),
		audio12 = new SimplePlayer('#audio_2223_12').bindDefaultEvents(),
		qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'<span class="character">Commessa</span> Perché non prova {} gonna bianca?',
			'<span class="character">Cliente</span> Prima vorrei provare {} camicetta azzurr{} . Che taglia è?',
			'<span class="character">Commessa</span> Questa azzurr{} è una quarantotto.',
			'<span class="character">Cliente</span> Ma vorrei provare anche {} calzoni bian{}. Quanto costano?',
			'<span class="character">Commessa</span> 55€',
			'<span class="character">Cliente</span> Prendo i calzoni bianchi e la camicetta azzurr{}',
			'<span class="character">Commessa</span> Desidera altro?',
			'<span class="character">Cliente</span> Posso vedere {} sandali?'
		],
		options: [
			'quella',
			'chi',
			'a',
			'quei'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	



page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid),
		is = new ScrollableElement(ex.find('.exercise > div > img').eq(0));
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var
		audio = new SimplePlayer(ex.find('audio')).bindDefaultEvents(),
		qaf = new QAForm(ex.find('form'), exid, {
			labels: [
				'Eurocity per Ginevra',
				'Locale da Vigevano',
				'Diretto per Mantova',
				'Espresso da Piacenza',
				'Rapido da Ventimiglia',
				'Intercity per Venezia'
			],
			options: [
				'in partenza dal binario 11 e non 7',
				'in ritardo di 30 minuti',
				'in ritardo di 15 minuti',
				'in arrivo al binario 5 e non 7',
				'in partenza dal binario 15',
				'in arrivo al binario 1'
			]
		});
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		labels: [
			'A che ora parte il rapido per Catania?',
			'Andata o andata e ritorno?',
			'Da che binario parte il regionale per Magenta?',
			'Devo cambiare?',
			'È in arrivo il treno?',
			'Prima o seconda classe?',
			'Devo pagare il supplemento?',
			'A che binario arriva l\'Intercity da Firenze?'
		],
		options: [
			'Solo andata, per favore',
			'No, è un treno diretto',
			'Sì, è un treno Intercity',
			'No, è in ritardo di 20 minuti',
			'Seconda',
			'Alle 17.25',
			'Al binario 3',
			'Dal binario 6'
		]
	});
});
	


page.loadExercise(function(ex, exid) {
var
	directions = ex.find('p.directions'),
	audio = new SimplePlayer(ex.find('audio')).bindDefaultEvents(),
	qaf = new QAForm(ex.find('form'), exid, true, [
		{tag: 'textarea'}
	]);

directions.eq(0).text(language.currentExercises[exid][0].val);
directions.eq(1).text(language.currentExercises[exid][2].val);
});




page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		labels: [
			'Abbronzarsi al sole / Cominciare a piovere',
			'Camminare in campagna / Ferirsi ad un piede',
			'Parlare con mia moglie / Suonare il telefono',
			'Riposarsi / Chiamare Guido',
			'Andare a Greve / Fermarsi in un bar'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'GENTILE SIGNORA,',
			'{}  alla sua lettera di {} dove mi ha domandato {} sul campeggio {} sono stata l\'anno {}. L\'ho {} molto bello.',
			'A noi Ă¨ {} molto e ci {} divertiti. Il campeggio non era sul {}. CosĂŹ ogni giorno {} per un chilometro.',
			'Ma {} le sedie a sdraio, gli ombrelloni e l\'altra roba in un {} sul lago.',
			'Per mangiare c\'erano numerose pizzerie e bar {} al campeggio.',
			'Nel campeggio c\'era uno {}. Si pagavano dieci euro al {} per la {} e cinque per persona.',
			'Tre euro per i {}. Il campeggio era pulito e silenzioso.',
			'A {} il bar e il dancing chiudevano.',
			'I proprietari, sui {}, erano molto simpatici. {} di avere risposto a tutte le sue domande.',
			'Distinti saluti...'
		],
		options: [
			'dove',
			'acqua',
			'piaciuto',
			"trent'anni",
			'vicini',
			'siamo',
			'rispondo',
			'camminavamo',
			'lago',
			'lasciavamo',
			'magazzino',
			'volo',
			'informazioni',
			'spero',
			'spaccio',
			'trovato',
			'bambini',
			'mezzanotte',
			'giorno',
			'tenda',
			'aprile',
			'nonno',
			'scorso'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var
		audio1 = new SimplePlayer('#audio_3223_1').bindDefaultEvents(),
		audio2 = new SimplePlayer('#audio_3223_2').bindDefaultEvents(),
		audio3 = new SimplePlayer('#audio_3223_3').bindDefaultEvents(),
		audio4 = new SimplePlayer('#audio_3223_4').bindDefaultEvents(),
		qaf = new QAForm(ex.find('form'), exid);
});
	



page.loadExercise(function(ex, exid){
ex.find('p.directions').text(language.currentExercises[exid][0].val);
var
	qaf = new QAForm(ex.find('form'), exid, true),
	is = new ScrollableElement(ex.find('.exercise > div > img').eq(0));
});



page.loadExercise(function(ex, exid) {
ex.find('p.directions').text(language.currentExercises[exid][0].val);
var qaf = new QAForm(ex.find('form'), exid);
});



page.loadExercise(function(ex, exid){
ex.find('p.directions').text(language.currentExercises[exid][0].val);
var
	audio = new SimplePlayer(ex.find('audio')).bindDefaultEvents(),
	qaf = new QAForm(ex.find('form'), exid),
	is = new ScrollableElement(ex.find('.exercise > div > img').eq(0));
});



page.loadExercise(function(ex, exid) {
var
	directions = ex.find('p.directions'),
	audio = new SimplePlayer(ex.find('audio')).bindDefaultEvents(),
	qaf = new QAForm(ex.find('form'), exid, true, [
		{tag: 'textarea'}
	]);

directions.eq(0).text(language.currentExercises[exid][0].val);
directions.eq(1).text(language.currentExercises[exid][2].val);
});




page.loadExercise(function(ex, exid){
	var
		directions = ex.find('p.directions'),
		audio = new SimplePlayer(ex.find('audio')).bindDefaultEvents(),
		qaf = new QAForm(ex.find('form'), exid, true, [
			{tag: 'textarea'}
		]);
	
	directions.eq(0).text(language.currentExercises[exid][0].val);
	directions.eq(1).text(language.currentExercises[exid][2].val);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var
		audio = new SimplePlayer('#audio_2231').bindDefaultEvents(),
		qaf = new QAForm(ex.find('form'), exid, {
			inline: true,
			labels: [
				'In Italia, per i malati, c\'è un {} di Assistenza Sanitaria Nazionale {}.',
				'Oppure ci sono le {} private.',
				'Se uno straniero deve andare {} medico, {} primo deve andare {} un istituto che si chiama ASL (e che c\'è in ogni cittadina) con un {} che si porta dall\'estero.',
				'La ASL dà un {} che lo straniero porta dal dottore o all\'ospedale.',
				'Nei casi {} si deve andare {} Pronto Soccorso.'
			],
			options: [
				'urgenti',
				'cliniche',
				'documento',
				'dal',
				'presso',
				'sistema',
				'al',
				'per',
				'gratuito',
				'modulo',
				'vicino',
				'clinica',
				'questionario'
			]
		});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	



page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'Vorrei avere {} informazioni {} alberghi di Milano.',
			'Vorrei prenotare due camere doppie con bagno in un albergo {} il mese di ottobre.',
			'Sto cercando un albergo abbastanza silenzioso, piccolo, possibilmente vicino {} parco {} centro {} città.',
			'Ma non vicino {} stazione.',
			'Vorrei sapere quanto costa un albergo così {} notte e quando devo prenotare.',
			'Vorrei anche sapere se {} città c\'è una scuola per stranieri perché vorrei imparare l\'italiano.'
		],
		options: [
			'alla', 'per', 'al', 'della', 'delle', 'nel', 'a', 'in', 'sugli'
		]
		
	});
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var
		audio1 = new SimplePlayer('#audio_1354_1').bindDefaultEvents(),
		audio2 = new SimplePlayer('#audio_1354_2').bindDefaultEvents(),
		audio3 = new SimplePlayer('#audio_1354_3').bindDefaultEvents(),
		audio4 = new SimplePlayer('#audio_1354_4').bindDefaultEvents(),
		audio5 = new SimplePlayer('#audio_1354_5').bindDefaultEvents(),
		audio6 = new SimplePlayer('#audio_1354_6').bindDefaultEvents(),
		qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	



page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'{}',
			'{}',
			'{}',
			'{}',
			'{}'
		],
		options: [
			'Far bollire',
			'Scolare',
			'Condire',
			'Riempire d\'acqua',
			'Gettare'
		],
		images: [
			'cards/321/exercises/3215_1.png',
			'cards/321/exercises/3215_2.png',
			'cards/321/exercises/3215_3.png',
			'cards/321/exercises/3215_4.png',
			'cards/321/exercises/3215_5.png'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var
		audio1 = new SimplePlayer('#audio_3213_1').bindDefaultEvents(),
		audio2 = new SimplePlayer('#audio_3213_2').bindDefaultEvents(),
		audio3 = new SimplePlayer('#audio_3213_3').bindDefaultEvents(),
		audio4 = new SimplePlayer('#audio_3213_4').bindDefaultEvents(),
		audio5 = new SimplePlayer('#audio_3213_5').bindDefaultEvents(),
		qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		labels: [
			'Se preferite, usate della stoffa bagnata di vino bianco.',
			'CosĂŹ date un gusto originale al formaggio.',
			'Oppure, ed Ă¨ la cosa migliore, mettetelo tra le foglie di insalata.',
			'Soprattutto non lasciatelo mai in un posto umido.'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid);
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		inputs: true,
		labels: [
			'Se vuoi restare, {}',
			'Se vuoi leggere, {}',
			'Se vuoi scrivere, {}',
			'Se vuoi dormire, {}',
			'Se vuoi partire, {}'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'Il pomodoro, {}',
			'Il prezzemolo, {}',
			'L\'acqua, {}',
			'La pasta, {}'
		],
		inputs: true,
		images: [
			'cards/321/exercises/3216_2.png',
			'cards/321/exercises/3216_3.png',
			'cards/321/exercises/3216_4.png',
			'cards/321/exercises/3216_5.png'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'Potresti {} questo pomodoro?',
			'Sto {} l\'aglio per la pasta.',
			'Puoi {} i pomodori?',
			'{} pomodori, insalata e finocchio.',
			'Puoi {} i cetrioli?',
			'{} il sugo sul fuoco.',
			'Devo {} il prezzemolo per la cena.',
			'{} quello che Ă¨ sul tavolo.'
		],
		options: [
			'sbucciando',
			'tritare',
			'affettare',
			'Unire',
			'Mescoli',
			'tagliuzzare',
			'lavare',
			'Metti in frigo'
		],
		images: [
			'cards/321/exercises/3214_1.png',
			'cards/321/exercises/3214_2.png',
			'cards/321/exercises/3214_3.png',
			'cards/321/exercises/3214_4.png',
			'cards/321/exercises/3214_5.png',
			'cards/321/exercises/3214_6.png',
			'cards/321/exercises/3214_7.png',
			'cards/321/exercises/3214_8.png'
		]
	});
});
	


page.loadExercise(function(ex, exid){
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		inputs: true,
		labels: [
			'Devi comprare una casa nuova? {}',
			'Devi parlare a Carla? {}',
			'Devi parlare con me? {}',
			'Devi telefonare ai tuoi? {}',
			'Devi cambiare il tuo appartamento? {}'
		]
	});
});
	



page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'Quanto costa un cestino di {}?',
			'Vorrei due {} per l\'Inghilterra.',
			'Quanto costa questa {}?',
			'Queste due {}, per favore.',
			'Mi dĂ  una bottiglia di {}?',
			'Due chili di {}, per favore.',
			'Vorrei un {} da 45 centesimi.',
			'Quanto costa il {} d\'ingresso?'
		],
		options: [
			'francobolli',
			'borsa',
			'cartoline',
			'pomodori',
			'vino rosso',
			'fragole',
			'francobollo',
			'biglietto'
		]
	});
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		labels: [
			'ombrello',
			'mele',
			'borsa',
			'cestini di fragole',
			'piantina',
			'pomodori',
			'cartoline',
			'limone'
		]
	});
});
	


page.loadExercise(function(ex, exid) {
	ex.find('p.directions').text(language.currentExercises[exid][0].val);
	
	var qaf = new QAForm(ex.find('form'), exid, {
		inline: true,
		labels: [
			'{} Questa Ă¨ gratuita',
			'{} Queste costano 2 euro al chilo',
			'{} Quaranta',
			'{} Questi costano tre euro al chilo',
			'{} Questo costa 10 euro',
			'{} Questo? 60 centesimi',
			'{} Costano 80 centesimi l\'una',
			'{} 6 euro al cestino'
		],
		options: [
			'Quanto costano questi cestini di fragole?',
			'Quanto costa quest\'ombrello?',
			'Quanto costano queste mele?',
			'Quanto costa questo limone?',
			'Quanto costano questi pomodori?',
			'Quanto costa questa piantina?',
			'Quanto costa questa borsa?',
			'Quanto costano queste cartoline?'
		]
	});
});
	


page.loadExercise(function(ex, exid) {
var
	directions = ex.find('p.directions'),
	audio = new SimplePlayer(ex.find('audio')).bindDefaultEvents(),
	qaf = new QAForm(ex.find('form'), exid, true, [
		{tag: 'textarea'}
	]);

directions.eq(0).text(language.currentExercises[exid][0].val);
directions.eq(1).text(language.currentExercises[exid][2].val);
});

