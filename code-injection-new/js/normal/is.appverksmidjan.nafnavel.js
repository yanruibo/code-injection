









window.addEventListener('load', function() {
   new FastClick(document.body);
}

//  ---------------------------------------

, false);

var kenni, bMillinafn, bFyrstanafn, bAnnadnafn, bStrakar, bStelpur;
var sMillinafn, sFyrstanafn, sAnnadnafn;
var uid = 0;
	
var selectedItem;
	
var myScroll;
	
var fs;

var bClear = false;
	
var toggleSort = 0;
	
var bSettingsOn = 1;
	
var bDoShowpage = 1;
	
var devicePlatform;

		

var stelpu = ["Aagot","Abela","Abigael","Ada","Adda","Addý","Adela","Adelía","Adríana","Aðalbjörg","Aðalbjört","Aðalborg","Aðaldís","Aðalfríður","Aðalheiður","Aðalrós","Aðalsteina","Aðalsteinunn","Aðalveig","Agata","Agatha","Agða","Agla","Agnea","Agnes","Agneta","Alanta","Alba","Alberta","Albína","Alda","Aldís","Aldný","Aleta","Aletta","Alexa","Alexandra","Alexandría","Alexis","Alexía","Alfa","Alfífa","Alice","Alida","Alída","Alína","Alís","Alísa","Alla","Allý","Alma","Alrún","Alva","Alvilda","Amadea","Amal","Amalía","Amanda","Amelía","Amilía","Amíra","Amy","Amý","Analía","Anastasía","Andra","Andrá","Andrea","Anetta","Angela","Angelíka","Anika","Anita","Aníka","Anína","Aníta","Anja","Ann","Anna","Annabella","Annalísa","Anne","Annelí","Annetta","Anney","Annika","Annía","Anný","Antonía","Apríl","Ardís","Arey","Arinbjörg","Aris","Arisa","Aría","Aríanna","Aríella","Arín","Arína","Arís","Armenía","Arna","Arnbjörg","Arnborg","Arndís","Arney","Arnfinna","Arnfríður","Arngerður","Arngunnur","Arnheiður","Arnhildur","Arnika","Arnkatla","Arnlaug","Arnleif","Arnlín","Arnljót","Arnóra","Arnrós","Arnrún","Arnþóra","Arnþrúður","Asírí","Askja","Assa","Astrid","Atalía","Atena","Athena","Atla","Atlanta","Auðbjörg","Auðbjört","Auðdís","Auðlín","Auðna","Auðný","Auðrún","Auður","Aurora","Axelía","Axelma","Aþena","Ágústa","Ágústína","Álfdís","Álfey","Álfgerður","Álfheiður","Álfhildur","Álfrós","Álfrún","Álfsól","Árbjörg","Árbjört","Árdís","Árelía","Árlaug","Ármey","Árna","Árndís","Árney","Árnheiður","Árnína","Árný","Áróra","Ársól","Ársæl","Árún","Árveig","Árvök","Árþóra","Ása","Ásbjörg","Ásborg","Ásdís","Ásfríður","Ásgerður","Áshildur","Áskatla","Ásla","Áslaug","Ásleif","Ásný","Ásrós","Ásrún","Ást","Ásta","Ástbjörg","Ástbjört","Ástdís","Ástfríður","Ástgerður","Ástheiður","Ásthildur","Ástríður","Ástrós","Ástrún","Ástveig","Ástþóra","Ástþrúður","Ásvör","Baldey","Baldrún","Baldvina","Barbara","Barbára","Bassí","Bára","Bebba","Begga","Belinda","Bella","Benedikta","Bengta","Benidikta","Benía","Beníta","Benna","Benney","Benný","Benta","Bentey","Bentína","Bera","Bergdís","Bergey","Bergfríður","Bergheiður","Berghildur","Berglaug","Berglind","Berglín","Bergljót","Bergmannía","Bergný","Bergrán","Bergrín","Bergrós","Bergrún","Bergþóra","Berit","Bernódía","Berta","Bertha","Bessí","Bestla","Beta","Betanía","Betsý","Bettý","Bil","Birgit","Birgitta","Birna","Birta","Birtna","Bíbí","Bína","Bjargdís","Bjargey","Bjargheiður","Bjarghildur","Bjarglind","Bjarkey","Bjarklind","Bjarma","Bjarndís","Bjarney","Bjarnfríður","Bjarngerður","Bjarnheiður","Bjarnhildur","Bjarnlaug","Bjarnrún","Bjarnveig","Bjarný","Bjarnþóra","Bjarnþrúður","Bjartey","Bjartmey","Björg","Björgey","Björgheiður","Björghildur","Björk","Björney","Björnfríður","Björt","Bláey","Blíða","Blín","Blómey","Blædís","Bobba","Boga","Bogdís","Bogey","Bogga","Boghildur","Borg","Borgdís","Borghildur","Borgný","Borgrún","Borgþóra","Botnía","Bóel","Bót","Bóthildur","Braga","Braghildur","Branddís","Brá","Brák","Brigitta","Brimdís","Brimhildur","Brimrún","Brit","Britt","Britta","Bríana","Bríanna","Bríet","Bryndís","Brynfríður","Bryngerður","Brynheiður","Brynhildur","Brynja","Brynný","Burkney","Bylgja","Camilla","Carla","Carmen","Cecilia","Cecilía","Charlotta","Charlotte","Christina","Christine","Clara","Daðey","Daðína","Dagbjörg","Dagbjört","Dagfríður","Daggrós","Dagheiður","Dagmar","Dagmey","Dagný","Dagrún","Daldís","Daley","Dalía","Dalla","Dallilja","Dalrós","Dana","Daney","Danfríður","Danheiður","Danhildur","Danía","Daníela","Daníella","Dara","Debora","Debóra","Dendý","Didda","Dilja","Diljá","Dimmblá","Dimmey","Día","Díana","Díanna","Díma","Dís","Dísa","Dísella","Donna","Doris","Dorothea","Dóa","Dómhildur","Dóra","Dórey","Dóris","Dórothea","Dórótea","Dóróthea","Drauma","Draumey","Drífa","Droplaug","Drótt","Dröfn","Dúa","Dúfa","Dúna","Dýrborg","Dýrfinna","Dýrleif","Dýrley","Dýrunn","Dæja","Dögg","Dögun","Ebba","Ebonney","Edda","Edel","Edil","Edit","Edith","Eðna","Efemía","Egedía","Eggrún","Egla","Eiðný","Eiðunn","Eik","Einbjörg","Eindís","Einey","Einfríður","Einhildur","Einína","Einrún","Eir","Eirdís","Eirfinna","Eiríka","Eirný","Eirún","Elba","Eldbjörg","Eldey","Eldlilja","Eldrún","Eleina","Elektra","Elena","Elenborg","Elfa","Elfur","Elina","Elinborg","Elisabeth","Elía","Elíana","Elín","Elína","Elíná","Elínbet","Elínbjörg","Elínbjört","Elínborg","Elíndís","Elíngunnur","Elínheiður","Elínrós","Elírós","Elísa","Elísabet","Elísabeth","Elka","Ella","Ellen","Elley","Ellisif","Ellín","Elly","Ellý","Elma","Elna","Elsa","Elsabet","Elsie","Elsí","Elsý","Elva","Elvi","Elvíra","Elvý","Embla","Emelía","Emelíana","Emelína","Emeralda","Emilía","Emilíana","Emilíanna","Emilý","Emma","Emmý","Emý","Enea","Eneka","Engilbjört","Engilráð","Engilrós","Engla","Enika","Enja","Enóla","Eres","Erika","Erin","Erla","Erlen","Erlín","Erna","Esja","Esmeralda","Ester","Esther","Estiva","Ethel","Etna","Eufemía","Eva","Evelyn","Evey","Evfemía","Evgenía","Evíta","Evlalía","Ey","Eybjörg","Eybjört","Eydís","Eyfríður","Eygerður","Eygló","Eyhildur","Eyja","Eyjalín","Eyleif","Eylín","Eyrós","Eyrún","Eyveig","Eyvör","Eyþóra","Eyþrúður","Fanndís","Fanney","Fannlaug","Fanny","Fanný","Febrún","Fema","Filipía","Filippa","Filippía","Finna","Finnbjörg","Finnbjörk","Finnboga","Finnborg","Finndís","Finney","Finnfríður","Finnlaug","Finnrós","Fía","Fídes","Fífa","Fjalldís","Fjóla","Flóra","Folda","Fransiska","Franziska","Frán","Fregn","Freydís","Freygerður","Freyja","Freylaug","Freyleif","Friðbjörg","Friðbjört","Friðborg","Friðdís","Friðdóra","Friðey","Friðfinna","Friðgerður","Friðjóna","Friðlaug","Friðleif","Friðlín","Friðmey","Friðný","Friðrika","Friðrikka","Friðrós","Friðrún","Friðsemd","Friðveig","Friðþóra","Frigg","Fríða","Fríður","Frostrós","Fróðný","Fura","Fönn","Gabríela","Gabríella","Gauja","Gauthildur","Gefjun","Gefn","Geira","Geirbjörg","Geirdís","Geirfinna","Geirfríður","Geirhildur","Geirlaug","Geirlöð","Geirný","Geirríður","Geirrún","Geirþrúður","Georgía","Gerða","Gerður","Gestheiður","Gestný","Gestrún","Gillý","Gilslaug","Gissunn","Gía","Gígja","Gísela","Gísla","Gísley","Gíslína","Gíslný","Gíslrún","Gíslunn","Gíta","Gjaflaug","Gloría","Gló","Glóa","Glóbjört","Glódís","Glóð","Glóey","Gná","Góa","Gógó","Grein","Gret","Greta","Grélöð","Grét","Gréta","Gríma","Grímey","Grímheiður","Grímhildur","Gróa","Guðbjörg","Guðbjört","Guðborg","Guðdís","Guðfinna","Guðfríður","Guðjóna","Guðlaug","Guðleif","Guðlín","Guðmey","Guðmunda","Guðmundína","Guðný","Guðríður","Guðrún","Guðsteina","Guðveig","Gullbrá","Gullveig","Gullý","Gumma","Gunnbjörg","Gunnbjört","Gunnborg","Gunndís","Gunndóra","Gunnella","Gunnfinna","Gunnfríður","Gunnharða","Gunnheiður","Gunnhildur","Gunnjóna","Gunnlaug","Gunnleif","Gunnlöð","Gunnrún","Gunnur","Gunnveig","Gunnvör","Gunný","Gunnþóra","Gunnþórunn","Gurrý","Gúa","Gyða","Gyðja","Gyðríður","Gytta","Gæfa","Gæflaug","Hadda","Haddý","Hafbjörg","Hafborg","Hafdís","Hafey","Hafliða","Haflína","Hafný","Hafrós","Hafrún","Hafsteina","Hafþóra","Halla","Hallbera","Hallbjörg","Hallborg","Halldís","Halldóra","Halley","Hallfríður","Hallgerður","Hallgunnur","Hallkatla","Hallný","Hallrún","Hallveig","Hallvör","Hanna","Hanney","Hansa","Hansína","Harpa","Hauður","Hákonía","Heba","Hedda","Hedí","Heiða","Heiðbjörg","Heiðbjörk","Heiðbjört","Heiðbrá","Heiðdís","Heiðlaug","Heiðlóa","Heiðný","Heiðrós","Heiðrún","Heiður","Heiðveig","Hekla","Helen","Helena","Helga","Hella","Helma","Hendrikka","Henný","Henrietta","Henrika","Henríetta","Hera","Herbjörg","Herbjört","Herborg","Herdís","Herfríður","Hergerður","Herlaug","Hermína","Hersilía","Herta","Hertha","Hervör","Herþrúður","Hilda","Hildegard","Hildibjörg","Hildigerður","Hildigunnur","Hildiríður","Hildisif","Hildur","Hilma","Himinbjörg","Hind","Hinrika","Hinrikka","Hjalta","Hjaltey","Hjálmdís","Hjálmey","Hjálmfríður","Hjálmgerður","Hjálmrós","Hjálmrún","Hjálmveig","Hjördís","Hjörfríður","Hjörleif","Hjörný","Hjörtfríður","Hlaðgerður","Hlédís","Hlíf","Hlín","Hlökk","Hólmbjörg","Hólmdís","Hólmfríður","Hrafna","Hrafnborg","Hrafndís","Hrafney","Hrafngerður","Hrafnheiður","Hrafnhildur","Hrafnkatla","Hrafnlaug","Hrafntinna","Hraundís","Hrefna","Hreindís","Hróðný","Hrólfdís","Hrund","Hrönn","Hugbjörg","Hugbjört","Hugborg","Hugdís","Hugljúf","Hugrún","Huld","Hulda","Huldís","Huldrún","Húnbjörg","Húndís","Húngerður","Hvönn","Hödd","Högna","Hörn","Ida","Idda","Iða","Iðunn","Ilmur","Immý","Ina","Inda","India","Indiana","Indía","Indíana","Indíra","Indra","Inga","Ingdís","Ingeborg","Inger","Ingey","Ingheiður","Inghildur","Ingibjörg","Ingibjört","Ingiborg","Ingifinna","Ingifríður","Ingigerður","Ingilaug","Ingileif","Ingilín","Ingimaría","Ingimunda","Ingiríður","Ingirós","Ingisól","Ingiveig","Ingrid","Ingrún","Ingunn","Ingveldur","Inna","Irena","Irene","Irja","Irma","Irmý","Irpa","Isabel","Isabella","Ída","Íma","Ína","Ír","Íren","Írena","Íris","Írunn","Ísabel","Ísabella","Ísadóra","Ísafold","Ísalind","Ísbjörg","Ísdís","Ísey","Ísfold","Ísgerður","Íshildur","Ísis","Íslaug","Ísleif","Ísmey","Ísold","Ísól","Ísrún","Íssól","Ísveig","Íunn","Íva","Jakobína","Jana","Jane","Janetta","Jannika","Jara","Jarún","Jarþrúður","Jasmín","Járnbrá","Járngerður","Jenetta","Jenna","Jenný","Jensína","Jessý","Jovina","Jóa","Jóanna","Jódís","Jófríður","Jóhanna","Jólín","Jóna","Jónanna","Jónasína","Jónbjörg","Jónbjört","Jóndís","Jóndóra","Jóney","Jónfríður","Jóngerð","Jónheiður","Jónhildur","Jóninna","Jónída","Jónína","Jónný","Jóný","Jóra","Jóríður","Jórlaug","Jórunn","Jósebína","Jósefín","Jósefína","Judith","Júdea","Júdit","Júlía","Júlíana","Júlíanna","Júlíetta","Júlírós","Júnía","Júníana","Jökla","Jökulrós","Jörgína","Kaðlín","Kaja","Kalla","Kamilla","Kamí","Kamma","Kapitola","Kapítóla","Kara","Karen","Karin","Karitas","Karí","Karín","Karína","Karítas","Karla","Karlinna","Karlína","Karlotta","Karolína","Karó","Karólín","Karólína","Kassandra","Kata","Katarína","Katerína","Katharina","Kathinka","Katinka","Katla","Katrín","Katrína","Katý","Kára","Kellý","Kendra","Ketilbjörg","Ketilfríður","Ketilríður","Kiddý","Kira","Kirsten","Kirstín","Kittý","Kjalvör","Klara","Kládía","Klementína","Kleópatra","Kolbjörg","Kolbrá","Kolbrún","Koldís","Kolfinna","Kolfreyja","Kolgríma","Kolka","Konkordía","Konný","Korka","Kormlöð","Kornelía","Kókó","Krista","Kristbjörg","Kristborg","Kristel","Kristensa","Kristey","Kristfríður","Kristgerður","Kristin","Kristine","Kristíana","Kristíanna","Kristín","Kristína","Kristjana","Kristjóna","Kristlaug","Kristlind","Kristlín","Kristný","Kristólína","Kristrós","Kristrún","Kristveig","Kristvina","Kristþóra","Kría","Kæja","Laila","Laíla","Lana","Lara","Laufey","Laufheiður","Laufhildur","Lauga","Laugey","Laugheiður","Lára","Lárensína","Láretta","Lárey","Lea","Leikný","Leila","Lena","Leonóra","Leóna","Leónóra","Lilja","Liljá","Liljurós","Lill","Lilla","Lillian","Lillý","Lily","Lilý","Lind","Linda","Linddís","Lingný","Lisbeth","Listalín","Liv","Líba","Líf","Lífdís","Lín","Lína","Línbjörg","Líndís","Líneik","Líney","Línhildur","Lísa","Lísabet","Lísandra","Lísbet","Lísebet","Lív","Ljósbjörg","Ljósbrá","Ljótunn","Lofn","Loftveig","Logey","Lokbrá","Lotta","Louisa","Lousie","Lovísa","Lóa","Lóreley","Lukka","Lúcía","Lúðvíka","Lúísa","Lúna","Lúsinda","Lúsía","Lúvísa","Lydia","Lydía","Lyngheiður","Lýdía","Læla","Maddý","Magda","Magdalena","Magðalena","Magga","Maggey","Maggý","Magna","Magndís","Magnea","Magnes","Magney","Magnfríður","Magnheiður","Magnhildur","Magnúsína","Magný","Magnþóra","Maía","Maídís","Maísól","Maj","Maja","Malen","Malena","Malía","Malín","Malla","Manda","Manúela","Mara","Mardís","Marela","Marella","Maren","Marey","Marfríður","Margit","Margot","Margret","Margrét","Margrjet","Margunnur","Marheiður","Maria","Marie","Marikó","Marinella","Marit","Marí","María","Maríam","Marían","Maríana","Maríanna","Marín","Marína","Marínella","Maríon","Marísa","Marísól","Marít","Maríuerla","Marja","Markrún","Marlaug","Marlena","Marlín","Marlís","Marólína","Marsa","Marselía","Marselína","Marsibil","Marsilía","Marsý","Marta","Martha","Martína","Mary","Marý","Matta","Mattea","Matthea","Matthilda","Matthildur","Matthía","Mattíana","Mattína","Mattý","Maxima","Mábil","Málfríður","Málhildur","Málmfríður","Mánadís","Máney","Mára","Meda","Mekkin","Mekkín","Melinda","Melissa","Melkorka","Melrós","Messíana","Metta","Mey","Mikaela","Mikaelína","Mikkalína","Milda","Mildríður","Milla","Millý","Minerva","Minna","Minney","Minný","Miriam","Mirja","Mirjam","Mirra","Mist","Mía","Mínerva","Míra","Míranda","Mítra","Mjaðveig","Mjalldís","Mjallhvít","Mjöll","Mona","Monika","Módís","Móeiður","Móey","Móheiður","Móna","Mónika","Móníka","Munda","Mundheiður","Mundhildur","Mundína","Myrra","Mýr","Mýra","Mýrún","Mörk","Nadia","Nadía","Nadja","Nana","Nanna","Nanný","Nansý","Naomí","Naómí","Natalie","Natalía","Náttsól","Nella","Nellý","Nenna","Nicole","Niðbjörg","Nikíta","Nikoletta","Nikólína","Ninja","Ninna","Nína","Níní","Njála","Njóla","Norma","Nóa","Nóra","Nótt","Nýbjörg","Odda","Oddbjörg","Oddfreyja","Oddfríður","Oddgerður","Oddhildur","Oddlaug","Oddleif","Oddný","Oddrún","Oddveig","Oddvör","Oktavía","Októvía","Olga","Ollý","Ora","Orka","Ormheiður","Ormhildur","Otkatla","Otta","Óda","Ófelía","Óla","Ólafía","Ólafína","Ólavía","Ólivía","Ólína","Ólöf","Ósa","Ósk","Ótta","Pamela","París","Patricia","Patrisía","Pála","Páldís","Páley","Pálfríður","Pálhanna","Pálheiður","Pálhildur","Pálín","Pálína","Pálmey","Pálmfríður","Pálrún","Perla","Peta","Petra","Petrea","Petrína","Petronella","Petrónella","Petrós","Petrún","Petrúnella","Pétrína","Pétrún","Pía","Polly","Pollý","Pría","Rafney","Rafnhildur","Ragna","Ragnbjörg","Ragney","Ragnfríður","Ragnheiður","Ragnhildur","Rakel","Ramóna","Randalín","Randíður","Randý","Ranka","Rannva","Rannveig","Ráðhildur","Rán","Rebekka","Reginbjörg","Regína","Rein","Renata","Reyn","Reyndís","Reynheiður","Reynhildur","Rikka","Ripley","Rita","Ríkey","Rín","Ríta","Ronja","Rorí","Roxanna","Róberta","Róbjörg","Rós","Rósa","Rósalind","Rósanna","Rósbjörg","Rósborg","Róselía","Rósey","Rósfríður","Róshildur","Rósinkara","Rósinkransa","Róska","Róslaug","Róslind","Róslinda","Róslín","Rósmary","Rósmarý","Rósmunda","Rósný","Runný","Rut","Ruth","Rúbý","Rún","Rúna","Rúndís","Rúnhildur","Rúrí","Röfn","Rögn","Röskva","Sabína","Sabrína","Saga","Salbjörg","Saldís","Salgerður","Salín","Salína","Salka","Salma","Salný","Salome","Salóme","Salvör","Sandra","Sanna","Santía","Sara","Sarína","Sefanía","Selja","Selka","Selma","Senía","Septíma","Sera","Serena","Seselía","Sesilía","Sesselía","Sesselja","Sessilía","Sif","Sigdís","Sigdóra","Sigfríð","Sigfríður","Sigga","Siggerður","Sigmunda","Signa","Signhildur","Signý","Sigríður","Sigrún","Sigurást","Sigurásta","Sigurbára","Sigurbirna","Sigurbjörg","Sigurbjört","Sigurborg","Sigurdís","Sigurdóra","Sigurdríf","Sigurdrífa","Sigurða","Sigurey","Sigurfinna","Sigurfljóð","Sigurgeira","Sigurhanna","Sigurhelga","Sigurhildur","Sigurjóna","Sigurlaug","Sigurleif","Sigurlilja","Sigurlinn","Sigurlín","Sigurlína","Sigurmunda","Sigurnanna","Sigurósk","Sigurrós","Sigursteina","Sigurunn","Sigurveig","Sigurvina","Sigurþóra","Sigyn","Sigþóra","Sigþrúður","Silfa","Silfá","Silfrún","Silja","Silka","Silla","Silva","Silvana","Silvía","Sirra","Sirrý","Siv","Sía","Símonía","Sísí","Síta","Sjöfn","Skarpheiður","Skugga","Skuld","Skúla","Skúlína","Snjáfríður","Snjáka","Snjófríður","Snjólaug","Snorra","Snót","Snæbjörg","Snæbjört","Snæborg","Snæbrá","Snædís","Snæfríður","Snælaug","Snærós","Snærún","Soffía","Sofie","Sofía","Solveig","Sonja","Sonný","Sophia","Sophie","Sól","Sóla","Sólbjörg","Sólbjört","Sólborg","Sólbrá","Sólbrún","Sóldís","Sóldögg","Sóley","Sólfríður","Sólgerður","Sólhildur","Sólín","Sólkatla","Sóllilja","Sólný","Sólrós","Sólrún","Sólveig","Sólvör","Sónata","Stefana","Stefanía","Stefánný","Steina","Steinbjörg","Steinborg","Steindís","Steindóra","Steiney","Steinfríður","Steingerður","Steinhildur","Steinlaug","Steinrós","Steinrún","Steinunn","Steinvör","Steinþóra","Stella","Stígheiður","Stígrún","Stína","Stjarna","Styrgerður","Sumarlína","Sumarrós","Sunna","Sunnefa","Sunneva","Sunniva","Sunníva","Susan","Súla","Súsan","Súsanna","Svafa","Svala","Svalrún","Svana","Svanbjörg","Svanbjört","Svanborg","Svandís","Svaney","Svanfríður","Svanheiður","Svanhildur","Svanhvít","Svanlaug","Svanrós","Svanþrúður","Svava","Svea","Sveina","Sveinbjörg","Sveinborg","Sveindís","Sveiney","Sveinfríður","Sveingerður","Sveinhildur","Sveinlaug","Sveinrós","Sveinrún","Sveinsína","Sveinveig","Sylgja","Sylva","Sylvía","Sæbjörg","Sæbjört","Sæborg","Sædís","Sæfinna","Sæfríður","Sæhildur","Sælaug","Sæmunda","Sæný","Særós","Særún","Sæsól","Sæunn","Sævör","Sölva","Sölvey","Sölvína","Tala","Talía","Tamar","Tamara","Tanía","Tanja","Tanya","Tanya","Tara","Tea","Teitný","Tekla","Telma","Tera","Teresa","Teresía","Thea","Thelma","Theodóra","Theódóra","Theresa","Tindra","Tinna","Tirsa","Tía","Tíbrá","Tína","Todda","Torbjörg","Torfey","Torfheiður","Torfhildur","Tóbý","Tóka","Tóta","Tristana","Trú","Tryggva","Tryggvína","Týra","Ugla","Una","Undína","Unna","Unnbjörg","Unndís","Unnur","Urður","Úa","Úlfa","Úlfdís","Úlfey","Úlfheiður","Úlfhildur","Úlfrún","Úlla","Úna","Úndína","Úranía","Úrsúla","Vagna","Vagnbjörg","Vagnfríður","Vaka","Vala","Valbjörg","Valbjörk","Valbjört","Valborg","Valdheiður","Valdís","Valentína","Valería","Valey","Valfríður","Valgerður","Valhildur","Valka","Vallý","Valný","Valrós","Valrún","Valva","Valý","Valþrúður","Vanda","Vár","Veig","Veiga","Venus","Vera","Veronika","Verónika","Veróníka","Vetrarrós","Vébjörg","Védís","Végerður","Vélaug","Véný","Vibeka","Victoría","Viðja","Vigdís","Vigný","Viktoria","Viktoría","Vilborg","Vildís","Vilfríður","Vilgerður","Vilhelmína","Villa","Villimey","Vilma","Vilný","Vinbjörg","Vinný","Vinsý","Virginía","Víbekka","Víf","Vígdögg","Víggunnur","Víóla","Víóletta","Vísa","Von","Von","Voney","Vordís","Ylfa","Ylfur","Ylja","Ylva","Ynja","Yrja","Yrsa","Ýja","Ýma","Ýr","Ýrr","Þalía","Þeba","Þeódís","Þeódóra","Þjóðbjörg","Þjóðhildur","Þoka","Þorbjörg","Þorfinna","Þorgerður","Þorgríma","Þorkatla","Þorlaug","Þorleif","Þorsteina","Þorstína","Þóra","Þóranna","Þórarna","Þórbjörg","Þórdís","Þórða","Þórelfa","Þórelfur","Þórey","Þórfríður","Þórgunna","Þórgunnur","Þórhalla","Þórhanna","Þórheiður","Þórhildur","Þórkatla","Þórlaug","Þórleif","Þórný","Þórodda","Þórsteina","Þórsteinunn","Þórstína","Þórunn","Þórveig","Þórvör","Þrá","Þrúða","Þrúður","Þula","Þura","Þurí","Þuríður","Þurý","Þúfa","Þyri","Þyrí","Þöll","Ægileif","Æsa","Æsgerður","Ögmunda","Ögn","Ölrún","Ölveig","Örbrún","Örk","Ösp"];
var straka = ["Aage","Abel","Abraham","Adam","Addi","Adel","Adíel","Adólf","Adrían","Adríel","Aðalberg","Aðalbergur","Aðalbert","Aðalbjörn","Aðalborgar","Aðalgeir","Aðalmundur","Aðalráður","Aðalsteinn","Aðólf","Agnar","Agni","Albert","Aldar","Alex","Alexander","Alexíus","Alfons","Alfred","Alfreð","Ali","Allan","Alli","Almar","Alrekur","Alvar","Alvin","Amír","Amos","Anders","Andreas","André","Andrés","Andri","Anes","Anfinn","Angantýr","Angi","Annar","Annarr","Annas","Annel","Annes","Anthony","Anton","Antoníus","Aran","Arent","Ares","Ari","Arilíus","Arinbjörn","Aríel","Aríus","Arnald","Arnaldur","Arnar","Arnberg","Arnbergur","Arnbjörn","Arndór","Arnes","Arnfinnur","Arnfreyr","Arngeir","Arngils","Arngrímur","Arnkell","Arnlaugur","Arnleifur","Arnljótur","Arnmóður","Arnmundur","Arnoddur","Arnold","Arnór","Arnsteinn","Arnúlfur","Arnviður","Arnþór","Aron","Arthúr","Artúr","Asael","Askur","Aspar","Atlas","Atli","Auðbergur","Auðbert","Auðbjörn","Auðgeir","Auðkell","Auðmundur","Auðólfur","Auðun","Auðunn","Austar","Austmann","Austmar","Austri","Axel","Ágúst","Áki","Álfar","Álfgeir","Álfgrímur","Álfur","Álfþór","Ámundi","Árbjartur","Árbjörn","Árelíus","Árgeir","Árgils","Ármann","Árni","Ársæll","Ás","Ásberg","Ásbergur","Ásbjörn","Ásgautur","Ásgeir","Ásgils","Ásgrímur","Ási","Áskell","Áslaugur","Áslákur","Ásmar","Ásmundur","Ásólfur","Ásröður","Ástbjörn","Ástgeir","Ástmar","Ástmundur","Ástráður","Ástríkur","Ástvaldur","Ástvar","Ástvin","Ástþór","Ásvaldur","Ásvarður","Ásþór","Baldur","Baldvin","Baltasar","Bambi","Barði","Barri","Bassi","Bastían","Baugur","Bárður","Beinir","Beinteinn","Beitir","Bekan","Benedikt","Benidikt","Benjamín","Benóní","Bent","Berent","Berg","Bergfinnur","Berghreinn","Bergjón","Bergmann","Bergmar","Bergmundur","Bergsteinn","Bergsveinn","Bergur","Bergvin","Bergþór","Bernhard","Bernharð","Bernharður","Berni","Bernódus","Bersi","Bertel","Bertram","Bessi","Betúel","Bill","Birgir","Birkir","Birnir","Birtingur","Birtir","Bjargar","Bjargmundur","Bjargþór","Bjarkan","Bjarkar","Bjarki","Bjarmar","Bjarmi","Bjarnar","Bjarnfinnur","Bjarnfreður","Bjarnharður","Bjarnhéðinn","Bjarni","Bjarnlaugur","Bjarnleifur","Bjarnólfur","Bjarnsteinn","Bjarnþór","Bjartmann","Bjartmar","Bjartur","Bjartþór","Bjólan","Bjólfur","Björgmundur","Björgólfur","Björgúlfur","Björgvin","Björn","Björnólfur","Blængur","Blær","Blævar","Boði","Bogi","Bolli","Borgar","Borgúlfur","Borgþór","Bóas","Bói","Bótólfur","Bragi","Brandur","Breki","Bresi","Brestir","Brimar","Brimi","Brimir","Brími","Brjánn","Broddi","Bruno","Bryngeir","Brynjar","Brynjólfur","Brynjúlfur","Brynleifur","Brynsteinn","Bryntýr","Brynþór","Burkni","Búi","Búri","Bæring","Bæringur","Bæron","Böðvar","Börkur","Christopher","Cýrus","Daði","Dagbjartur","Dagfari","Dagfinnur","Daggeir","Dagmann","Dagnýr","Dagur","Dagþór","Dalbert","Dalli","Dalmann","Dalmar","Dalvin","Damjan","Dan","Danelíus","Daniel","Daníel","Daníval","Dante","Daríus","Darri","Davíð","Demus","Deníel","Dennis","Diðrik","Díómedes","Dofri","Dolli","Dominik","Dómald","Dómaldi","Dómaldur","Dónald","Dónaldur","Dór","Dóri","Dósóþeus","Draupnir","Dreki","Drengur","Dufgus","Dufþakur","Dugfús","Dúi","Dúnn","Dvalinn","Dýri","Dýrmundur","Ebbi","Ebeneser","Ebenezer","Eberg","Edgar","Edilon","Edílon","Edvard","Edvin","Eðvald","Eðvar","Eðvarð","Efraím","Eggert","Eggþór","Egill","Eiðar","Eiður","Eikar","Eilífur","Einar","Einir","Einvarður","Einþór","Eiríkur","Eivin","Elberg","Elbert","Eldar","Eldgrímur","Eldjárn","Eldmar","Eldon","Eldór","Eldur","Elentínus","Elfráður","Elimar","Elinór","Elis","Elí","Elías","Elíeser","Elímar","Elínbergur","Elínmundur","Elínór","Elís","Ellert","Elli","Elliði","Ellís","Elmar","Elvar","Elvin","Elvis","Emanúel","Embrek","Emerald","Emil","Emmanúel","Engilbert","Engilbjartur","Engiljón","Engill","Enok","Erik","Erlar","Erlendur","Erling","Erlingur","Ernestó","Ernir","Ernst","Eron","Erpur","Esekíel","Esjar","Esra","Estefan","Evald","Evan","Evert","Eyberg","Eyjólfur","Eylaugur","Eyleifur","Eymar","Eymundur","Eyríkur","Eysteinn","Eyvar","Eyvindur","Eyþór","Fabrisíus","Falgeir","Falur","Fannar","Fannberg","Fanngeir","Fáfnir","Fálki","Felix","Fengur","Fenrir","Ferdínand","Fertram","Feykir","Filip","Filippus","Finn","Finnbjörn","Finnbogi","Finngeir","Finnjón","Finnlaugur","Finnur","Finnvarður","Fífill","Fjalar","Fjarki","Fjólar","Fjólmundur","Fjölnir","Fjölvar","Fjörnir","Flemming","Flosi","Flóki","Flórent","Flóvent","Forni","Fossmar","Fólki","Francis","Frank","Franklín","Frans","Fránn","Frár","Freybjörn","Freygarður","Freymar","Freymóður","Freymundur","Freyr","Freysteinn","Freyviður","Freyþór","Friðberg","Friðbergur","Friðbert","Friðbjörn","Friðfinnur","Friðgeir","Friðjón","Friðlaugur","Friðleifur","Friðmann","Friðmar","Friðmundur","Friðrik","Friðsteinn","Friður","Friðvin","Friðþjófur","Friðþór","Friedrich","Fritz","Frímann","Frosti","Fróði","Fróðmar","Funi","Fúsi","Fylkir","Gabríel","Gael","Galdur","Gamalíel","Garðar","Garibaldi","Garpur","Garri","Gaui","Gaukur","Gauti","Gautrekur","Gautur","Gautviður","Geir","Geirarður","Geirfinnur","Geirharður","Geirhjörtur","Geirhvatur","Geiri","Geirlaugur","Geirleifur","Geirmundur","Geirólfur","Geirröður","Geirtryggur","Geirvaldur","Geirþjófur","Geisli","Gellir","Georg","Gerald","Gerðar","Geri","Gestur","Gilbert","Gilmar","Gils","Gissur","Gizur","Gídeon","Gígjar","Gísli","Gjúki","Glói","Glúmur","Gneisti","Gnúpur","Gnýr","Goði","Goðmundur","Gottskálk","Gottsveinn","Gói","Grani","Grankell","Gregor","Greipur","Greppur","Grettir","Grétar","Grímar","Grímkell","Grímlaugur","Grímnir","Grímólfur","Grímur","Grímúlfur","Guðberg","Guðbergur","Guðbjarni","Guðbjartur","Guðbjörn","Guðbrandur","Guðfinnur","Guðfreður","Guðgeir","Guðjón","Guðlaugur","Guðleifur","Guðleikur","Guðmann","Guðmar","Guðmon","Guðmundur","Guðni","Guðráður","Guðröður","Guðsteinn","Guðvarður","Guðveigur","Guðvin","Guðþór","Gumi","Gunnar","Gunnberg","Gunnbjörn","Gunndór","Gunngeir","Gunnhallur","Gunnlaugur","Gunnleifur","Gunnólfur","Gunnóli","Gunnröður","Gunnsteinn","Gunnvaldur","Gunnþór","Gustav","Gutti","Guttormur","Gústaf","Gylfi","Gyrðir","Gýgjar","Gýmir","Haddi","Haddur","Hafberg","Hafgrímur","Hafliði","Hafnar","Hafni","Hafsteinn","Hafþór","Hagalín","Hagbarður","Hagbert","Haki","Hallberg","Hallbjörn","Halldór","Hallfreður","Hallgarður","Hallgeir","Hallgils","Hallgrímur","Hallkell","Hallmann","Hallmar","Hallmundur","Hallsteinn","Hallur","Hallvarður","Hallþór","Hamar","Hannes","Hannibal","Hans","Harald","Haraldur","Harri","Harrý","Hartmann","Hartvig","Hauksteinn","Haukur","Haukvaldur","Hákon","Háleygur","Hálfdan","Hálfdán","Hámundur","Hárekur","Hárlaugur","Hásteinn","Hávar","Hávarður","Hávarr","Heiðar","Heiðberg","Heiðbert","Heiðlindur","Heiðmann","Heiðmar","Heiðmundur","Heiðrekur","Heikir","Heilmóður","Heimir","Heinrekur","Heisi","Hektor","Helgi","Helmút","Hemmert","Hendrik","Henning","Henrik","Henrý","Herbert","Herbjörn","Herfinnur","Hergeir","Hergill","Hergils","Herjólfur","Herlaugur","Herleifur","Herluf","Hermann","Hermóður","Hermundur","Hersir","Hersteinn","Hersveinn","Hervar","Hervarður","Hervin","Héðinn","Hilaríus","Hilbert","Hildar","Hildibergur","Hildibrandur","Hildigeir","Hildiglúmur","Hildimar","Hildimundur","Hildingur","Hildir","Hildiþór","Hilmar","Hilmir","Himri","Hinrik","Híram","Hjallkár","Hjalti","Hjarnar","Hjálmar","Hjálmgeir","Hjálmtýr","Hjálmur","Hjálmþór","Hjörleifur","Hjörtur","Hjörtþór","Hjörvar","Hleiðar","Hlégestur","Hlér","Hlini","Hlíðar","Hlíðberg","Hlífar","Hljómur","Hlynur","Hlöðmundur","Hlöður","Hlöðvarður","Hlöðver","Hnefill","Hnikar","Hnikarr","Holgeir","Holger","Holti","Hólm","Hólmar","Hólmbert","Hólmfastur","Hólmgeir","Hólmgrímur","Hólmkell","Hólmsteinn","Hólmþór","Hóseas","Hrafn","Hrafnar","Hrafnbergur","Hrafnkell","Hrafntýr","Hrannar","Hrappur","Hraunar","Hreggviður","Hreiðar","Hreiðmar","Hreimur","Hreinn","Hringur","Hrímnir","Hrollaugur","Hrolleifur","Hróaldur","Hróar","Hróbjartur","Hróðgeir","Hróðmar","Hróðólfur","Hróðvar","Hrói","Hrólfur","Hrómundur","Hrútur","Hrærekur","Hugberg","Hugi","Huginn","Hugleikur","Hugo","Huldar","Huxley","Húbert","Húmi","Húnbogi","Húni","Húnn","Húnröður","Hvannar","Hyltir","Hylur","Hængur","Hænir","Höður","Högni","Hörður","Höskuldur","Illugi","Immanúel","Indriði","Ingberg","Ingi","Ingiberg","Ingibergur","Ingibert","Ingibjartur","Ingibjörn","Ingileifur","Ingimagn","Ingimar","Ingimundur","Ingivaldur","Ingiþór","Ingjaldur","Ingmar","Ingólfur","Ingvaldur","Ingvar","Ingvi","Ingþór","Issi","Ían","Ígor","Ími","Ísak","Ísar","Ísbjörn","Íseldur","Ísgeir","Ísidór","Ísleifur","Ísmael","Ísmar","Ísólfur","Ísrael","Ívan","Ívar","Jack","Jafet","Jaki","Jakob","Jamil","Jan","Janus","Jarl","Jason","Járngrímur","Játgeir","Játmundur","Játvarður","Jenni","Jens","Jeremías","Jes","Jesper","Jochum","Johan","John","Joshua","Jóakim","Jóann","Jóel","Jóhann","Jóhannes","Jói","Jómar","Jómundur","Jón","Jónar","Jónas","Jónatan","Jónbjörn","Jóndór","Jóngeir","Jónmundur","Jónsteinn","Jónþór","Jósafat","Jósavin","Jósef","Jósep","Jósteinn","Jósúa","Jóvin","Julian","Júlí","Júlían","Júlíus","Júní","Júníus","Júrek","Jökull","Jörfi","Jörgen","Jörmundur","Jörri","Jörundur","Jörvar","Jörvi","Kaj","Kakali","Kaktus","Kaldi","Kaleb","Kali","Kalman","Kalmann","Kalmar","Kaprasíus","Karel","Karim","Karkur","Karl","Karles","Karli","Karvel","Kaspar","Kasper","Kastíel","Katarínus","Kató","Kár","Kári","Keran","Ketilbjörn","Ketill","Kiljan","Kjalar","Kjallakur","Kjaran","Kjartan","Kjarval","Kjói","Klemens","Klængur","Knútur","Knörr","Koðrán","Koggi","Kolbeinn","Kolbjörn","Kolfinnur","Kolgrímur","Kolmar","Kolskeggur","Kolur","Kolviður","Konráð","Konstantínus","Kormákur","Kornelíus","Kort","Kópur","Kraki","Kris","Kristall","Kristberg","Kristbergur","Kristbjörn","Kristdór","Kristens","Krister","Kristfinnur","Kristgeir","Kristinn","Kristján","Kristjón","Kristlaugur","Kristleifur","Kristmann","Kristmar","Kristmundur","Kristofer","Kristófer","Kristvaldur","Kristvarður","Kristvin","Kristþór","Krummi","Kveldúlfur","Lambert","Lars","Laufar","Laugi","Lauritz","Lár","Lárent","Lárentíus","Lárus","Leiðólfur","Leif","Leifur","Leiknir","Leo","Leon","Leonard","Leonhard","Leó","Leópold","Leví","Lér","Liljar","Lindar","Lindberg","Línberg","Líni","Ljósálfur","Ljótur","Ljúfur","Loðmundur","Loftur","Logi","Loki","Lórens","Ludvig","Lundi","Lúðvíg","Lúðvík","Lúkas","Lúter","Lyngar","Lýður","Lýtingur","Maggi","Magngeir","Magni","Magnús","Magnþór","Makan","Manfreð","Manúel","Mar","Marbjörn","Marel","Margeir","Margrímur","Mari","Marijón","Marinó","Marías","Marínó","Marís","Maríus","Marjón","Markó","Markús","Markþór","Maron","Marri","Mars","Marsellíus","Marteinn","Martin","Marvin","Matthías","Matti","Max","Maximus","Máni","Már","Márus","Mekkinó","Melkíor","Melkólmur","Melrakki","Mensalder","Merkúr","Metúsalem","Meyvant","Michael","Mikael","Mikjáll","Mildinberg","Mías","Mímir","Míó","Mír","Mjöllnir","Mjölnir","Moli","Morgan","Mosi","Móði","Móri","Mórits","Móses","Muggur","Muni","Muninn","Múli","Myrkvi","Mýrkjartan","Mörður","Narfi","Natan","Natanael","Nataníel","Náttmörður","Náttúlfur","Neisti","Nenni","Neptúnus","Nicolas","Nikanor","Nikolai","Nikulás","Nils","Níels","Njáll","Njörður","Nonni","Norbert","Norðmann","Normann","Nóam","Nóel","Nói","Nóni","Nóri","Nóvember","Númi","Nývarð","Nökkvi","Oddbergur","Oddbjörn","Oddfreyr","Oddgeir","Oddi","Oddkell","Oddleifur","Oddmar","Oddsteinn","Oddur","Oddvar","Oddþór","Oktavíus","Októ","Októvíus","Olaf","Olgeir","Oliver","Olivert","Orfeus","Ormar","Ormur","Orri","Orvar","Otkell","Otri","Otti","Ottó","Otur","Óðinn","Ófeigur","Ólafur","Óli","Ólíver","Ómar","Ómi","Óskar","Ósvald","Ósvaldur","Ósvífur","Óttar","Parmes","Patrekur","Patrick","Patrik","Páll","Pálmar","Pálmi","Pedró","Per","Peter","Pétur","Príor","Rafael","Rafn","Rafnar","Rafnkell","Ragnar","Ragúel","Randver","Rannver","Rasmus","Ráðgeir","Ráðvarður","Refur","Reginbaldur","Reginn","Reidar","Reifnir","Reimar","Reinar","Reinhart","Reinhold","Reynald","Reynar","Reynir","Reyr","Richard","Rikharð","Ríkarður","Ríkharð","Ríkharður","Ríó","Rolf","Ronald","Róbert","Rólant","Róman","Rómeó","Rósant","Rósar","Rósberg","Rósenberg","Rósi","Rósinberg","Rósinkar","Rósinkrans","Rósmann","Rósmundur","Runi","Runólfur","Rúbar","Rúben","Rúdólf","Rúnar","Rúrik","Rútur","Röðull","Rögnvald","Rögnvaldur","Rögnvar","Rökkvi","Safír","Sakarías","Salmann","Salmar","Salómon","Salvar","Samson","Samúel","Sandel","Sandri","Sandur","Saxi","Sebastían","Seifur","Seimur","Sesar","Sesil","Sigbergur","Sigbert","Sigbjartur","Sigbjörn","Sigdór","Sigfastur","Sigfinnur","Sigfreður","Sigfús","Siggeir","Sighvatur","Sigjón","Siglaugur","Sigmann","Sigmar","Sigmundur","Signar","Sigri","Sigríkur","Sigsteinn","Sigtryggur","Sigtýr","Sigur","Sigurbaldur","Sigurberg","Sigurbergur","Sigurbjarni","Sigurbjartur","Sigurbjörn","Sigurbrandur","Sigurdór","Sigurður","Sigurfinnur","Sigurgeir","Sigurgestur","Sigurgísli","Sigurgrímur","Sigurhans","Sigurhjörtur","Sigurjón","Sigurkarl","Sigurlaugur","Sigurlás","Sigurleifur","Sigurliði","Sigurlinni","Sigurmann","Sigurmar","Sigurmon","Sigurmundur","Sigurnýas","Siguroddur","Siguróli","Sigurpáll","Sigursteinn","Sigursveinn","Sigurvaldi","Sigurvin","Sigurþór","Sigvaldi","Sigvarður","Sigþór","Silli","Sindri","Símon","Sírnir","Sírus","Sívar","Sjafnar","Skafti","Skarphéðinn","Skefill","Skeggi","Skíði","Skírnir","Skjöldur","Skorri","Skuggi","Skúli","Skúta","Skær","Skæringur","Smári","Smiður","Smyrill","Snjóki","Snjólaugur","Snjólfur","Snorri","Snæbjartur","Snæbjörn","Snæhólm","Snælaugur","Snær","Snæringur","Snævar","Snævarr","Snæþór","Soffanías","Sophus","Sófónías","Sófus","Sókrates","Sólberg","Sólbergur","Sólbjartur","Sólbjörn","Sólimann","Sólmar","Sólmundur","Sólon","Sólver","Sólvin","Spartakus","Sporði","Spói","Stanley","Stapi","Starkaður","Starri","Stefán","Stefnir","Steinar","Steinarr","Steinberg","Steinbergur","Steinbjörn","Steindór","Steinfinnur","Steingrímur","Steini","Steinkell","Steinmann","Steinmar","Steinmóður","Steinn","Steinólfur","Steinröður","Steinvarður","Steinþór","Stirnir","Stígur","Stormur","Stórólfur","Sturla","Sturlaugur","Sturri","Styr","Styrbjörn","Styrkár","Styrmir","Sumarliði","Svali","Svan","Svanberg","Svanbergur","Svanbjörn","Svangeir","Svanhólm","Svani","Svanlaugur","Svanmundur","Svanur","Svanþór","Svavar","Sváfnir","Sveinar","Sveinberg","Sveinbjartur","Sveinbjörn","Sveinjón","Sveinlaugur","Sveinmar","Sveinn","Sveinungi","Sveinþór","Sverre","Sverrir","Svölnir","Svörfuður","Sýrus","Sæberg","Sæbergur","Sæbjörn","Sæi","Sælaugur","Sæmann","Sæmundur","Sær","Sævald","Sævaldur","Sævar","Sævin","Sæþór","Sölmundur","Sölvar","Sölvi","Sören","Sörli","Tandri","Tarfur","Teitur","Theódór","Thomas","Thorberg","Tindar","Tindri","Tindur","Tinni","Tími","Tímon        ","Tímóteus","Tístran","Tjaldur","Tjörfi","Tobías","Tolli","Tonni","Torfi","Tóbías","Tói","Tóki","Tómas","Tór","Trausti","Tristan","Trostan","Trúmann","Tryggvi","Tumas","Tumi","Tyrfingur","Týr","Ubbi","Uggi","Ulrich","Uni","Unnar","Unnbjörn","Unndór","Unnsteinn","Unnþór","Urðar","Uxi","Úddi","Úlfar","Úlfgeir","Úlfhéðinn","Úlfkell","Úlfljótur","Úlftýr","Úlfur","Úlrik","Úranus","Vagn","Vakur","Valberg","Valbergur","Valbjörn","Valbrandur","Valdi","Valdimar","Valdór","Valentín","Valentínus","Valgarð","Valgarður","Valgeir","Valíant","Vallaður","Valmar","Valmundur","Valsteinn","Valter","Valtýr","Valur","Valves","Valþór","Varmar","Vatnar","Váli","Vápni","Veigar","Veigur","Ver","Vermundur","Vernharð","Vernharður","Vestar","Vestmar","Veturliði","Vébjörn","Végeir","Vékell","Vélaugur","Vémundur","Vésteinn","Viðar","Vigfús","Viggó","Vignir","Vigri","Vigtýr","Vigur","Vikar","Viktor","Vilberg","Vilbergur","Vilbert","Vilbjörn","Vilbogi","Vilbrandur","Vilgeir","Vilhelm","Vilhjálmur","Vili","Viljar","Vilji","Villi","Vilmar","Vilmundur","Vincent","Vinjar","Virgill","Víðar","Víðir","Vífill","Víglundur","Vígmar","Vígmundur","Vígsteinn","Vígþór","Víkingur","Vopni","Vorm","Vöggur","Völundur","Vörður","Vöttur","Walter","Werner   ","Willard","William","Willum","Ylur","Ymir","Yngvar","Yngvi","Yrkill","Ýmir","Ýrar","Zakaría","Zophonías","Zóphanías","Þangbrandur","Þengill","Þeyr","Þiðrandi","Þiðrik","Þinur","Þjálfi","Þjóðann","Þjóðbjörn","Þjóðgeir","Þjóðleifur","Þjóðmar","Þjóðólfur","Þjóðrekur","Þjóðvarður","Þjóstar","Þjóstólfur","Þorberg","Þorbergur","Þorbjörn","Þorbrandur","Þorfinnur","Þorgarður","Þorgautur","Þorgeir","Þorgestur","Þorgils","Þorgísl","Þorgnýr","Þorgrímur","Þorkell","Þorlaugur","Þorlákur","Þorleifur","Þorleikur","Þormar","Þormóður","Þormundur","Þorri","Þorsteinn","Þorvaldur","Þorvar","Þorvarður","Þór","Þórar","Þórarinn","Þórbergur","Þórbjörn","Þórður","Þórgnýr","Þórgrímur","Þórhaddur","Þórhalli","Þórhallur","Þórir","Þórlaugur","Þórleifur","Þórlindur","Þórmar","Þórmundur","Þóroddur","Þórormur","Þórólfur","Þórsteinn","Þórörn","Þrastar","Þráinn","Þrándur","Þróttur","Þrúðmar","Þrymur","Þröstur","Þyrnir","Ægir","Æsir","Ævar","Ævarr","Ögmundur","Ögri","Ölnir","Ölver","Ölvir","Öndólfur","Önundur","Örlaugur","Örlygur","Örn","Örnólfur","Örvar","Össur","Öxar"];
var milli = ["Aðaldal","Aldan","Arnberg","Arnfjörð","Austan","Austdal","Austfjörð","Áss","Bakkdal","Bakkmann","Bald","Ben","Bergholt","Bergland","Bíldsfells","Bjarg","Bjarndal","Bjarnfjörð","Bláfeld","Blómkvist","Borgdal","Brekkmann","Brim","Brúnsteð","Dalhoff","Dan","Diljan","Ektavon","Eldberg","Elísberg","Elvan","Espólín","Eyhlíð","Eyvík","Falk","Finndal","Fossberg","Freydal","Friðhólm","Giljan","Gilsfjörð","Gnarr","Gnurr","Grendal","Grindvík","Gull","Haffjörð","Hafnes","Hafnfjörð","Har","Heimdal","Heimsberg","Helgfell","Herberg","Hildiberg","Hjaltdal","Hlíðkvist","Hnappdal","Hnífsdal","Hofland","Hofteig","Hornfjörð","Hólmberg","Hrafnan","Hrafndal","Hraunberg","Hreinberg","Hreindal","Hrútfjörð","Hvammdal","Hvítfeld","Höfðdal","Hörðdal","Íshólm","Júl","Kjarrval","Knaran","Knarran","Krossdal","Laufkvist","Laufland","Laugdal","Laxfoss","Liljan","Linddal","Línberg","Ljós","Loðmfjörð","Lyngberg","Magdal","Magg","Matt","Miðdal","Miðvík","Mjófjörð","Móberg","Mýrmann","Nesmann","Norðland","Núpdal","Ólfjörð","Ósland","Ósmann","Reginbald","Reykfell","Reykfjörð","Reynholt","Salberg","Sandhólm","Seljan","Sigurhólm","Skagalín","Skíðdal","Snæberg","Snædahl","Sólan","Stardal","Stein","Steinbekk","Steinberg","Storm","Straumberg","Svanhild","Svarfdal","Sædal","Val","Valagils","Vald","Varmdal","Vatnsfjörð","Vattar","Vattnes","Viðfjörð","Vídalín","Víking","Vopnfjörð","Yngling","Þor","Önfjörð","Örbekk","Öxdal","Öxndal"];
 
function writeConfig()
{
   // -- console.log("setTimer write config");

   setTimeout(function(){
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSWConfig, fail);
   }
   ,100);

 
}

//  ---------------------------------------

function home()
{
   bSettingsOn = 1;
   $.mobile.changePage( "#home", {
      transition: "none"
   }
   );

}

//  ---------------------------------------

$(".validateonchange0").live("change", function() {
   sKenninafn = $(this).val();
   writeConfig();
}

//  ---------------------------------------

);
	
	
$(".validateonchange1").live("change", function() {
   bFyrstanafn = $(this).prop('checked');
   writeConfig();
}

//  ---------------------------------------

);


$(".validateonchange2").live("change", function() {
   bAnnadnafn = $(this).prop('checked');
   writeConfig();

}

//  ---------------------------------------

);

$(".validateonchange3").live("change", function() {
   bMillinafn = $(this).prop('checked');
   writeConfig();

}

//  ---------------------------------------

);

$(".validateonchange4").live("change", function() {
   bStrakar = $(this).prop('checked');
   writeConfig();

}

//  ---------------------------------------

);

$(".validateonchange5").live("change", function() {
   bStelpur = $(this).prop('checked');
   writeConfig();

}

//  ---------------------------------------

);

$(".validateonchange6").live("change", function() {
   sFyrstanafn = $(this).val();
   writeConfig();

}

//  ---------------------------------------

);

$(".validateonchange7").live("change", function() {
   sAnnadnafn = $(this).val();
   writeConfig();

}

//  ---------------------------------------

);

$(".validateonchange8").live("change", function() {
   sMillinafn = $(this).val();
   writeConfig();

}

//  ---------------------------------------

);

function info()
{
   $.mobile.changePage( "#info", {
      transition: "none"
   }
   );
		
}

//  ---------------------------------------

function work()
{
	
   bSettingsOn = 0;
		
   sAnnadnafn = $('#annadnafn').val();
   kenni = $('#kenninafn').val();
   sFyrstanafn = $('#eiginnafn1').val();
	
   sMillinafn = $('#millinafn').val();

   bStrakar = ($('#kyn1').is(":checked"));
   bStelpur = ($('#kyn2').is(":checked"));
		
   $.mobile.changePage( "#work", {
      transition: "none"
   }
   );

   // first , if list is empty start with 5 names in list.
   if (uid == 0)
   {
      for (i=0; i<5; i++)
      {
         addName(0);
      }
   }
		
}

//  ---------------------------------------

	
function closedlg()
{
   bDoShowpage = 0;
   $.mobile.changePage( "#work", {
      transition: "none"
   }
   );
   //myScroll.refresh();
   window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSW, fail);
   bDoShowpage = 1;
		
}

//  ---------------------------------------

	
function closeinfo()
{
   $.mobile.changePage( "#home", {
      transition: "none"
   }
   );
			
}

//  ---------------------------------------

/*
function hreinsa()
{
	
var r=confirm("Hreinsa listann?\nÖll gögn hverfa.");
if (r==true)
{
$('#names').html('');
bClear = true;
window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSW, fail);
}

}
*/
	
function hreinsaallt()
{
                        
   $('#names').html('');
                         
   closedlg();

                        
                        
}

//  ---------------------------------------

                        
function hreinsanull()
{
                        
   //$('#names').html('');
                        
   $( "li" ).each(function( index ) {
      // -- console.log( index + ": " + $(this).text() );
      text = $(this).text();
      atext = text.split(' ');
      number = atext[atext.length-1];
      if (number == '0') $(this).remove();
                         
   }
   );
   
	myScroll.refresh();
    myScroll.scrollTo(0, myScroll.maxScrollY, 0);0   
   //setTimeout(gotFileWriter(0),200);
   closedlg();

                        
                        
}

//  ---------------------------------------

                        
function cleanconfirm()
{
                        
                        
   $.mobile.changePage( "#clearconfirm", {
      transition: "none"
   }
   );

                        
                        
}

//  ---------------------------------------

	
function addName(doScroll)
{
		
		
   var r1=Math.floor(Math.random()*straka.length);
   var r2=Math.floor(Math.random()*straka.length);
		
   var r3=Math.floor(Math.random()*milli.length);

		
   if (r1 == r2) r2++;
		
		
		
   var nafn = "";
		
   if (sFyrstanafn != '')
   {
      nafn = nafn + sFyrstanafn + ' ';
   }
   else
   if (bFyrstanafn)
   {
      if (bStrakar)
      {
         nafn = nafn + straka[r1] + ' ';
      }
      else nafn = nafn + stelpu[r1] + ' ';
   }
		
   if (sAnnadnafn != '')
   {
      nafn = nafn + sAnnadnafn + ' ';
   }
   else
   if (bAnnadnafn)
   {
      if (bStrakar)
      {
         nafn = nafn + straka[r2] + ' ';
      }
      else nafn = nafn + stelpu[r2] + ' ';
   }
		
   if (sMillinafn != '')
   {
      nafn = nafn + sMillinafn + ' ';
   }
   else
   if (bMillinafn)
   {
      nafn = nafn + milli[r3] + ' ';
   }
		
   nafn = nafn + kenni + ' ';
		
   //var rc=Math.floor(Math.random()*99);
   uid = uid + 1;

   var count = "<span data-mini='true' class='mycount ui-li-count' >0</span>";
   $('#names').append("<li id='item"+uid+"' data-name='"+nafn+"' data-icon='false'><a>" + nafn + count+"</a></li>").listview('refresh');

   if (typeof LocalFileSystem != "undefined")
   {
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSW, fail);
   }

   if (doScroll == 1)
   {
      myScroll.refresh();
      myScroll.scrollTo(0, myScroll.maxScrollY, 0);
   }


}

//  ---------------------------------------
 
function gotFS(fileSystem) {
   if (devicePlatform == 'Android')
   fileSystem.root.getFile("Android/data/is.appverksmidjan.nafnavel/nafnavelin.txt", null, gotFileEntry, fail);
   else // ios ?
   fileSystem.root.getFile("/data/data/is.appverksmidjan.nafnavel/nafnavelin.txt", null, gotFileEntry, fail);
   // -- console.log("GOT FS");

}

//  ---------------------------------------
	
function gotFSConfig(fileSystem) {
   if (devicePlatform == 'Android')
   fileSystem.root.getFile("Android/data/is.appverksmidjan.nafnavel/cnafnavelin.txt", null, gotFileEntryConfig, fail);
   else
   fileSystem.root.getFile("/data/data/is.appverksmidjan.nafnavel/cnafnavelin.txt", null, gotFileEntryConfig, fail);
   // -- console.log("GOT FS");

}

//  ---------------------------------------

function gotFSW(fileSystem) {
   if (devicePlatform == 'Android')
   fileSystem.root.getFile("Android/data/is.appverksmidjan.nafnavel/nafnavelin.txt", {
      create: true, exclusive: false
   }
   , gotFileWriteEntry, fail);
   else
   fileSystem.root.getFile("/data/data/is.appverksmidjan.nafnavel/nafnavelin.txt", {
      create: true, exclusive: false
   }
   , gotFileWriteEntry, fail);

}

//  ---------------------------------------
	
function gotFSWConfig(fileSystem) {
   if (devicePlatform == 'Android')
   fileSystem.root.getFile("Android/data/is.appverksmidjan.nafnavel/cnafnavelin.txt", {
      create: true, exclusive: false
   }
   , gotFileWriteEntryConfig, fail);
   else
   fileSystem.root.getFile("/data/data/is.appverksmidjan.nafnavel/cnafnavelin.txt", {
      create: true, exclusive: false
   }
   , gotFileWriteEntryConfig, fail);

}

//  ---------------------------------------

function gotFileEntry(fileEntry) {
   fileEntry.file(gotFile, fail);
}

//  ---------------------------------------
	
function gotFileEntryConfig(fileEntry) {
   fileEntry.file(gotFileConfig, fail);
}

//  ---------------------------------------

function gotFile(file){
   //readDataUrl(file);
   readAsText(file);
}

//  ---------------------------------------
	
function gotFileConfig(file){
   //readDataUrl(file);
   readAsTextConfig(file);
}

//  ---------------------------------------
	
function gotFileWriteEntry(fileEntry) {
   fileEntry.createWriter(gotFileWriter, fail);
}

//  ---------------------------------------
	
// write all settings
function gotFileWriteEntryConfig(fileEntry) {
   fileEntry.createWriter(gotFileWriterConfig, fail);
}

//  ---------------------------------------

function gotFileWriter(writer) {
       
   //alert(larray);
   if (bClear == true)
   {
      writer.write("");
      bClear = false;
      return;

   }
   var larray = new Array;

   $( "li" ).each(function( index ) {
      // -- console.log( index + ": " + $(this).text() );
      larray[index] = $(this).text();
   }
   );
		
   writer.write(larray);
		
}

//  ---------------------------------------
	
function gotFileWriterConfig(writer) {
       
   // -- console.log("WRITING CONFIG" );
		
   bFyrstanafn = $("#nafn1").prop('checked');
   bAnnadnafn = $("#nafn2").prop('checked');
   bMillinafn = $("#milli").prop('checked');

   writer.write($('#kenninafn').val()+','+$('#eiginnafn1').val()+','+$('#annadnafn').val()+',');
   writer.write($('#millinafn').val()+','+($('#kyn1').is(":checked"))+','+($('#kyn2').is(":checked"))+',');
   writer.write(bFyrstanafn+','+bAnnadnafn+','+bMillinafn);

}

//  ---------------------------------------

function readDataUrl(file) {
   var reader = new FileReader();
   reader.onloadend = function(evt) {
      // -- console.log("Read as data URL");
      // -- console.log(evt.target.result);
   }
   ;
   reader.readAsDataURL(file);
}

//  ---------------------------------------

function readAsText(file) {
   var reader = new FileReader();
   reader.onloadend = function(evt) {
      // -- console.log("Read as text");
      // -- console.log(evt.target.result);
      var htm = "";
      var str=evt.target.result;
			
      if (str.length < 3) return;
			
      var n=str.replace(/\"/gi, "");
      str=n;
      n=str.replace(/\[/gi, "");
      str=n;
      n=str.replace(/\]/gi, "");
 
 
 
      var sstr=n.split(",");
 
      for (i=0; i<sstr.length; i++)
      {
         var nafn = sstr[i];
         var fnafn = "";
         var nafnSplitt=nafn.split(" ");
         for (t=0; t<nafnSplitt.length-1; t++)
         {
            fnafn = fnafn + nafnSplitt[t] + " ";
         }
				
         uid++;
         //var count = "<span data-mini='true' data-sort-score="+rc+" class='mycount ui-li-count' >"+nafnSplitt[nafnSplitt.length-1]+"</span>";
         var count = "<span data-mini='true' class='mycount ui-li-count' >"+nafnSplitt[nafnSplitt.length-1]+"</span>";
		 
         //$('#names').append("<li id='item"+uid+"' data-name='"+fnafn+"' data-icon='false'><a>" + fnafn + count+"</a></li>").listview('refresh'); ;
         //$('#names').append("<li id='item"+uid+"' data-name='"+fnafn+"' data-icon='false'><a>" + fnafn + count+"</a></li>");
				 
         htm = htm + "<li id='item"+uid+"' data-name='"+fnafn+"' data-icon='false'><a>" + fnafn + count+"</a></li>";

				
				
      }
			
      $('#names').html(htm);
 
   }
   ;
   // -- console.log("READING TEXT" + file);
   reader.readAsText(file);
		
		
		
}


//  ---------------------------------------
	
function readAsTextConfig(file) {
   var reader = new FileReader();
   reader.onloadend = function(evt) {
            
      // -- console.log("TEXT READ " + evt.target.result);

      var str=evt.target.result;
      var items=str.split(",");

      kenni = items[0];
      $('#kenninafn').val(items[0]);
      sFyrstanafn = items[1];
      $('#eiginnafn1').val(items[1]);
      sAnnadnafn = items[2];
      $('#annadnafn').val(items[2]);
      sMillinafn = items[3];
      $('#millinafn').val(items[3]);
				
      bStrakar = items[4];
      bStelpur = items[5];
				
      if (bStrakar == 'true')
      {
         $('#kyn1').attr('checked', true).checkboxradio('refresh');
         $('#kyn2').removeAttr('checked');
      }
      else
      {
         $('#kyn2').attr('checked', true).checkboxradio('refresh');
         $('#kyn1').removeAttr('checked');
      }
 
      if (items[6] == 'true')
      {
         $('#nafn1').attr('checked', true).checkboxradio('refresh');
         bFyrstanafn = true;
      }
      else bFyrstanafn = false

      if (items[7] == 'true')
      {
         $('#nafn2').attr('checked', true).checkboxradio('refresh');
         bAnnadnafn = true;
      }
      else bAnnadnafn = false

      if (items[8] == 'true')
      {
         $('#milli').attr('checked', true).checkboxradio('refresh');
         bMillinafn = true;
      }
      else bMillinafn = false
				
 	 
   }
   ;
   // -- console.log("READING TEXT" + file);
   reader.readAsText(file);
}

//  ---------------------------------------

function fail(evt) {
   console.log(evt.target.error.code);
   //alert(evt.target.error.code);
}

//  ---------------------------------------

	
function rada() {
   
   switch(toggleSort)
   {
      case 0:
         $('li').tsort('span.mycount',{
            order:'desc'
         }
         );
         break;
      case 1:
         $('li').tsort('span.mycount',{
            order:'asc'
         }
         );
         break;
      case 2:
         $('li').tsort('span.mycount',{
            order:'desc'
         }
         );
   
         //$('li').tsort({order:'desc'},{charOrder:'A[Á]DÐE[É]I[Í]O[Ó]U[Ú]Y[Ý]ZÞÆÖ'});
         break;
      case 3:
         $('li').tsort('span.mycount',{
            order:'asc'
         }
         );
         //$('li').tsort({order:'asc'},{charOrder:'A[Á]DÐE[É]I[Í]O[Ó]U[Ú]Y[Ý]ZÞÆÖ'});
         break;
   }

   //$('li').tsort({charOrder:'a[á]dðe[é]i[í]o[ó]u[ú]y[ý]zþæö'});
   //$('li').tsort('span.mycount',{order:'desc'});

   toggleSort++
   if (toggleSort > 3) toggleSort = 0;

}

//  ---------------------------------------

	
// not used for now
function doPause()
{

   // store things here
	
   //navigator.app.exitApp();
   //alert("listarray "+larray);
   // -- console.log("DOING PAUSE");


}

//  ---------------------------------------

// not used?
function doResume()
{

   // -- console.log("DOING RESUME");

   $('#nafn1').prop('checked', true);
   $('#nafn1').checkboxradio("refresh");
   bFyrstanafn = true;

   $('#nafn2').prop('checked', true);
   $('#nafn2').checkboxradio("refresh");
   bAnnadnafn = true;
   //alert('resume');
 
   if (typeof LocalFileSystem != "undefined")
   {
      // -- console.log("DOING RESUME AND FILE READ");
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
   }
 
}

//  ---------------------------------------

$('#work').bind('pageshow', function() {

   // now initialize scroll here, right after page is shown and visible.
   // lockDirection is the fix for jumping up bug.
   if (bDoShowpage)
   {
      //console.log("NEW ISCROLL!");

      myScroll = new iScroll('wrapper', {
         bounce: true,
         momentum: true,
         lockDirection: true
      }
      );
   }
  
}

//  ---------------------------------------

);

function onDeviceReady() {
 
 
   navigator.splashscreen.hide();
		
   var devicePlatform = device.platform;
		
   console.log("Device READY "+devicePlatform );

             
   // -- console.log("Device READY");

   //document.addEventListener('pause', doPause() , false);
   //document.addEventListener('resume', doResume() , false);
		
   //if (myScroll == null)
   //{	myScroll = new iScroll('wrapper');  }

   //if (typeof LocalFileSystem != "undefined")
   {
      // -- console.log("GOING FOR FS");
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
      window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFSConfig, fail);
      //setTimeout(addName(1),5000);

   }
		
}

//  ---------------------------------------

 
function loaded() {

				
   document.addEventListener("deviceready", onDeviceReady, false);

 
   $('#listof li').live('click', function() {
      //alert('Selected Name=' + $(this).attr('data-name') + ' ' + $(this).attr('id'));
 
      $.mobile.changePage( "#popup", {
         transition: "none"
      }
      );
      $('#popupcontent').html("<h2>"+$(this).attr('data-name')+"</h2>");
      selectedItem = $(this);
      // .remove();
      var sliderValue = $(this).find('span.mycount').text();

	

      $('#slider').val( sliderValue );
      $('#slider').slider('refresh');

	
   }
   );



  
}

//  ---------------------------------------

document.addEventListener('touchmove', function (e) {
   if (bSettingsOn == 0)
   {
      e.preventDefault();
   }
}

, false);

/* * * * * * * *
*
* Use this for high compatibility (iDevice + Android)
*
*/
document.addEventListener('DOMContentLoaded', function () {
   setTimeout(loaded, 200);
   
}

, false);
/*
* * * * * * * */


/* * * * * * * *
*
* Use this for iDevice only
*
*/
//document.addEventListener('DOMContentLoaded', loaded, false);
/*
* * * * * * * */


/* * * * * * * *
*
* Use this if nothing else works
*
*/
//window.addEventListener('load', setTimeout(function () { loaded(); }, 200), false);
/*
* * * * * * * */


