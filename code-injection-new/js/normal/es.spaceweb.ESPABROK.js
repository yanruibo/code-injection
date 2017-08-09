







            
			document.addEventListener("deviceready", onDeviceReady, false);
            function onDeviceReady() {
            alert('asd')
                navigator.geolocation.getCurrentPosition(onSuccess, onError);
            }
            function onSuccess(position) {
                document.getElementById('miposicion').value = position.coords.latitude +'+'+ position.coords.longitude;
                
                var element = document.getElementById('geolocation');
                element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
                'Longitude: '          + position.coords.longitude             + '<br />' +
                'Altitude: '           + position.coords.altitude              + '<br />' +
                'Accuracy: '           + position.coords.accuracy              + '<br />' +
                'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
                'Heading: '            + position.coords.heading               + '<br />' +
                'Speed: '              + position.coords.speed                 + '<br />' +
                'Timestamp: '          +                                   position.timestamp          + '<br />';
            }
            function onError(error) {
                //var miposicion = position.coords.latitude +','+ position.coords.longitude;
            }
        


                    function comollegar() {
                        var rutaempresa = $("#rutaempresa").val();
                        var miposicion = $("#miposicion").val();

                        var ref = window.open('http://apis.spaceweb.es/crear-ruta.php?formato=latlng&desde='+miposicion+'&hasta='+rutaempresa, '_blank', 'location=no');
                        //var ref = window.open('http://apis.spaceweb.es/crear-ruta.php?formato=latlng&desde=37.7699298+-122.4469157&hasta=37.7683909618184+-122.51089453697205', '_blank', 'location=no');
                    }
                    
			 	    var map;
                    var zoomLimit = 5;
                    var dealer_markers = [{
                                          sales: '1',
                                          aftersales: '0',
                                          name: 'ESPABROK - SAN ROQUIÑO',
                                          cnto: 'José Manuel Durán Rodríguez',
                                          lat: '43.449313615043145',
                                          lng: '-7.854450799999995',
                                          mail: 'asesoresdeseguros@sanroquino.es',
                                          tel: '881939154',
                                          adr: 'Av. Coruña 39, 15320',
                                          ruta: 'avenida-de-a-coruna-39-15320-a-coruna',
                                          ciudad: 'As Pontes',
                                          provincia: 'A Coruña',
                                          position: '1'
                                          },
                                          {
                                          sales: '0',
                                          aftersales: '1',
                                          name: 'ESPABROK - ENRIQUE AMOR',
                                          cnto: 'Enrique Amor Regueiro',
                                          lat: '43.317260914973886',
                                          lng: '-8.383669800000007',
                                          mail: 'enrique@enriqueamor.com',
                                          tel: '981663855',
                                          adr: 'Avda. Vilaboa nº 132 Bajo, 15174',
                                          ruta: 'avenida-villaboa-132-15174-a-coruna',
                                          ciudad: 'Culleredo',
                                          provincia: 'A Coruña',
                                          position: '2'
                                          },
                                          {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - SANCHEZ BOIRO S.L',
                                          cnto: 'Mª Dolores García Sánchez',
                                          lat: '42.648005',
                                          lng: '-8.879037',
                                          mail: 'lolagarcia@espabrok.es',
                                          tel: '981848093',
                                          adr: 'Av. constitucion 45,<br />Bajo Local 4 Ed. Milenium.',
                                          ruta: 'avenida-de-la-constitucion-45-borio-a-coruna',
                                          ciudad: 'Boiro',
                                          provincia: 'A Coruña',
                                          position: '3'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - GONZALEZ NOVO',
                                          cnto: 'Manuel María González Novo',
                                          lat: '43.27697861495278',
                                          lng: '-8.212842499999965',
                                          mail: 'betanzos@espabrok.es',
                                          tel: '981771051',
                                          adr: 'Avda. Jesús García Naveira,<br />Bajo nº35, bajo, 15300',
                                          ruta: 'avenida-jesus-garcia-naveira-34-15300-a-coruna',
                                          ciudad: 'Betanzos',
                                          provincia: 'A Coruña',
                                          position: '4'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - NORTE',
                                          cnto: 'Victoriano Merelas Cernadas',
                                          lat: '43.35345336499286',
                                          lng: '-8.391288550000013',										
                                          mail: 'norteseguros@espabrok.es',
                                          tel: '981137010',
                                          adr: 'Avda. del Ejercito,25 Bajo, 15306',
                                          ciudad: 'A Coruña',
                                          provincia: 'A Coruña',
                                          position: '5'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - BISQUERT MOLINES',
                                          cnto: 'Francisco Bisquert Ortega',
                                          lat: '38.83846196278565',
                                          lng: '0.10819570000001022',
                                          mail: 'denia@espabrok.es',
                                          tel: '965789671',
                                          adr: 'C/ Patricio Ferrandiz 48 bajo, 03700',
                                          ruta: 'calle-patricio-ferrendiz-48-03700-alicante',
                                          ciudad: 'Denia',
                                          provincia: 'Alicante',
                                          position: '6'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - CAYETANO LOPEZ',
                                          cnto: 'Cayetano López Soler',
                                          lat: '38.11035996245639',
                                          lng: '-0.9300859500000342',
                                          mail: 'cayetano.lopez@espabrok.es',
                                          tel: '966743602',
                                          adr: 'Plaza Europa Esc. 2ª-1ªF, 3300',
                                          ruta: 'plaza-europa-03300-alicante',
										  ciudad: 'Orihuela',
                                          provincia: 'Alicante',
                                          position: '7'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PONSODA',
                                          cnto: 'Rafael Ponsoda Martí',
                                          lat: '38.707671',
                                          lng: '-0.468438',
                                          mail: 'produccion-zn@espabrok.es',
                                          tel: '965333800',
                                          adr: 'Carrer Lluis Vives 21, 3804',
                                          ruta: 'calle-luis-vives-21-03804-alicante',
										  ciudad: 'Alcoy',
                                          provincia: 'Alicante',
                                          position: '8'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PONSODA',
                                          cnto: 'Luis Javier Garcia Martínez',
                                          lat: '38.362732',
                                          lng: '-0.43072',
                                          mail: 'alicante@espabrok.es',
                                          tel: '629147211',
                                          adr: 'Calle Dep Kiko Sanchez, 13, 3540',
                                          ruta: 'calle-deportista-kiko-sanchez-23-03540-alicante',
                                          ciudad: 'Alicante',
                                          provincia: 'Alicante',
                                          position: '9'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PONSODA',
                                          cnto: 'Jordi Alal Frances',
                                          lat: '38.72065641273191',
                                          lng: '-0.6542399999999589',
                                          mail: 'banyeres@espabrok.es',
                                          tel: '629147211',
                                          adr: 'C/ Alacant, 25, 3450',
                                          ruta: 'calle-alacant-25-03450-alicante',
                                          ciudad: 'Banyeres de Mariola',
                                          provincia: 'Alicante',
                                          position: '10'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PONSODA',
                                          cnto: 'Rafael Ponsoda Martí',
                                          lat: '38.78206461275989',
                                          lng: '-0.4444280999999819',
                                          mail: 'alcoy-ponsoda@espabrok.es',
                                          tel: '965531715',
                                          adr: 'Avenida Valencia, 62, 3830',
                                          ruta: 'avenida-valencia-62-03830',
                                          ciudad: 'Muro de alco',
                                          provincia: 'Alicante',
                                          position: '11'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PONSODA',
                                          cnto: 'Rafael Ponsoda Martí',
                                          lat: '38.696403312720875',
                                          lng: '-0.47566540000002533',
                                          mail: 'alcoy-ponsoda@espabrok.es',
                                          tel: '965531715',
                                          adr: 'C/ Goya, 5, 03801',
                                          ruta: 'calle-goya-5-03801-alicante',
                                          ciudad: 'Alcoy',
                                          provincia: 'Alicante',
                                          position: '12'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - VIDAL Y VERDU',
                                          cnto: 'José Ramón Vidal Catalá',
                                          lat: '38.59244231267364',
                                          lng: '-0.6734920000000102',
                                          mail: 'vidaliverdu@espabrok.es',
                                          tel: '965560838',
                                          adr: 'C/ Joan Beneyto nº 22, 03420',
                                          ruta: 'calle-joan-beneyto-22-03420',
                                          ciudad: 'Castalla',
                                          provincia: 'Alicante',
                                          position: '13'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - ANTONIO VALDES',
                                          cnto: 'Antonio Valdés Jimenez',
                                          lat: '37.387271912135816',
                                          lng: '-2.1394535000000587',
                                          mail: 'antoniovaldes@espabrok.es',
                                          tel: '950431620',
                                          adr: 'C/ Rulador 20 Bajo, 4800',
                                          ruta: 'calle-rulador-20-04800-almeria',
                                          ciudad: 'Albox',
                                          provincia: 'Almería',
                                          position: '14'
                                          },								  
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - CRISTOBAL MARTINEZ',
                                          cnto: 'José Caparroz Segura',
                                          lat: '37.41010391214584',
                                          lng: '-1.746268500000042',
                                          mail: 'pulpi@espabrok.es',
                                          tel: '950464009',
                                          adr: 'Avda. Andalucía, 39, 04640',
                                          ruta: 'avenida-andalucia-39-04640',
                                          ciudad: 'Pulpí',
                                          provincia: 'Almería',
                                          position: '15'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - AZ SERVICIOS DOS',
                                          cnto: 'Roberto Pereyra Gotarredona / Toni Torres',
                                          lat: '38.91114861281888',
                                          lng: '1.434120699999994',
                                          mail: 'tonitorres@espabrok.es',
                                          tel: '971311913',
                                          adr: 'C/ Antoni Jaume 6-8 1º dcha, 07800',
                                          ruta: 'calle-antoni-jaume-6-8-07800-baleares',
                                          ciudad: 'Ibiza',
                                          provincia: 'Baleares',
                                          position: '16'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - GLOBAL SEGUROS',
                                          cnto: 'Manuel Martín Montalbán',
                                          lat: '41.40184091400128',
                                          lng: '2.1241778999999497',
                                          mail: 'global.barcelona@espabrok.es',
                                          tel: '902181658',
                                          adr: 'C/ Anglí, 45 bis, 08017',
                                          ruta: 'calle-angli-45-08017-barcelona',
                                          ciudad: 'Barcelona',
                                          provincia: 'Barcelona',
                                          position: '17'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - OMNIBROKERS',
                                          cnto: 'Ricardo López Mateo',
                                          lat: '41.53820931406861',
                                          lng: '2.4324170999999524',
                                          mail: 'ricardo.coloma@espabrok.es',
                                          tel: '937549696',
                                          adr: 'C/ Ronda de O´Donnell 39, 08301',
                                          ruta: 'calle-ronda-odonnell-39-08301-barcelona',
                                          ciudad: 'Mataró',
                                          provincia: 'Barcelona',
                                          position: '18'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - JOMAREL BROKER´S',
                                          cnto: 'Jose Pedro Bermejo',
                                          lat: '40.02028101333474',
                                          lng: '-6.098971000000006',
                                          mail: 'plasencia@espabrok.es',
                                          tel: '927425186',
                                          adr: 'Av de España 39, 10600',
                                          ruta: 'avenida-de-espana-39-10600-plasencia',
                                          ciudad: 'Plasencia',
                                          provincia: 'Caceres',
                                          position: '19'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - VIDAL RODR, E HIJOS',
                                          cnto: 'Vidal Rodríguez Elvira',
                                          lat: '39.474',
                                          lng: '-6.378565',
                                          mail: 'caceres@espabrok.es',
                                          tel: '927222920',
                                          adr: 'Av Hernán Cortés, 8 Bajo, 10004',
                                          ruta: 'avenida-hernan-cortes-8-10004-caceres',
                                          ciudad: 'Cáceres',
                                          provincia: 'Caceres',
                                          position: '20'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - RE&AL BROKER',
                                          cnto: 'Jesús Redón Catalán',
                                          lat: '39.992209613321485',
                                          lng: '-0.03848644999993667',
                                          mail: 'jredon.castellon@espabrok.es',
                                          tel: '964342650',
                                          adr: 'C/ Cerdan de Tallada, 1 entlo. A, 12004',
                                          ciudad: 'Castellón',
                                          provincia: 'Castellón',
                                          position: '21'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - ALDEN GESTORA',
                                          cnto: 'José Jimenes Delgado',
                                          lat: '37.883139',
                                          lng: '-4.794655',
                                          mail: 'infoalden@espabrok.es',
                                          tel: '957410705',
                                          adr: 'AV. GRAN VÍA PARQUE 12 LOCAL, 14005',
                                          ruta: 'avenida-gran-via-parque-12-14005-cordoba',
                                          ciudad: 'Cordoba',
                                          provincia: 'Cordoba',
                                          position: '22'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - NUEVA VIVIENDA',
                                          cnto: 'Ricardo Palenciano',
                                          lat: '40.06028471335364',
                                          lng: '-2.132016300000032',
                                          mail: 'ricardo.cuenca@espabrok.es',
                                          tel: '969226312',
                                          adr: 'C/ Lorenzo Goñi 3, 16004',
                                          ruta: 'calle-lorenzo-goni-3-16004-cuenca',
                                          ciudad: 'Cuenca',
                                          provincia: 'Cuenca',
                                          position: '23'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - ANTONIO L. MARIN',
                                          cnto: 'Antonio L. Marín Moreno',
                                          lat: '37.20937631205791',
                                          lng: '-3.6324339000000236',
                                          mail: 'maracena@espabrok.es',
                                          tel: '958410763',
                                          adr: 'AV. Blas de Otero, 2 Bajo, 18200',
                                          ruta: 'avenida-blas-otero-2-18200-granda',
                                          ciudad: 'Maracena',
                                          provincia: 'Granada',
                                          position: '24'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - MARTINEZ CASARES',
                                          cnto: 'Fco. José Martínez González',
                                          lat: '37.173167',
                                          lng: '-3.599621',
                                          mail: 'granada@espabrok.es',
                                          tel: '958224337',
                                          adr: 'C/ Puerta Real de España, 1 - 4º C, 18009',
                                          ruta: 'calle-puerta-real-1-18009-granada',
                                          ciudad: 'Granada',
                                          provincia: 'Granada',
                                          position: '25'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - JOSE M.PEÑAS BRONCHALO',
                                          cnto: 'Adoracion De Pablo González',
                                          lat: '40.6335564136272',
                                          lng: '-3.1641468999999915',
                                          mail: 'guadalajara@espabrok.es',
                                          tel: '949219830',
                                          adr: 'C/ San Esteban, 2, 19001',
                                          ruta: 'calle-san-esteban-2-19001',
                                          ciudad: 'Guadalajara',
                                          provincia: 'Guadalajara',
                                          position: '26'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - VILLALBA GARCIA',
                                          cnto: 'César Villalba García',
                                          lat: '40.63232301362663',
                                          lng: '-3.1641799999999876',
                                          mail: 'villalba.cesar@espabrok.es',
                                          tel: '949247960',
                                          adr: 'C/ Exposición, 3, 19001',
                                          ruta: 'calle-exposicion-3-19001',
                                          ciudad: 'Guadalajara',
                                          provincia: 'Guadalajara',
                                          position: '27'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - CARTON C',
                                          cnto: 'Javier Carton Estrada',
                                          lat: '43.323837414977305',
                                          lng: '-1.968336700000009',
                                          mail: 'javier.cartonconsultores@espabrok.es',
                                          tel: '943472195',
                                          adr: 'AV. de Navarra nº 34 Bajo, 20013',
                                          ruta: 'avenida-de-navarra-34-20013',
                                          ciudad: 'San Sebastián',
                                          provincia: 'Guipúzcoa',
                                          position: '28'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PEREZ FERRIN',
                                          cnto: 'Fernando Pérez-Ferrín Gende',
                                          lat: '43.485819',
                                          lng: '-8.230716',
                                          mail: 'fernando.perezferrin@espabrok.es',
                                          tel: '981333232',
                                          adr: 'Rua María, 17 Bajo, 15402',
                                          ruta: 'calle-maria-17-15402',
                                          ciudad: 'Ferrol',
                                          provincia: 'La Coruña',
                                          position: '29'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - SUEIRO',
                                          cnto: 'Alberto Sueiro',
                                          lat: '43.213670914919724',
                                          lng: '-8.690905000000043',
                                          mail: 'asueiro@sueiro.es',
                                          tel: '981704726',
                                          adr: 'Rua Vázquez de Parga, 3 - 1º, 15100',
                                          ruta: 'calle-vazquez-de-parga-3-15100',
                                          ciudad: 'Carballo',
                                          provincia: 'La Coruña',
                                          position: '30'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - TÉCNICOS ABELLA',
                                          cnto: 'Silvino Abella Abella',
                                          lat: '42.54716511457568',
                                          lng: '-6.597057550000045',
                                          mail: 'silvino@espabrok.es',
                                          tel: '987427272',
                                          adr: 'C/ El Cristo, 11, 24400',
                                          ruta: 'calle-cristo-11-24400',
                                          ciudad: 'Ponferrada',
                                          provincia: 'León',
                                          position: '31'
                                          },
										  {
										  sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PRECOR 2000',
                                          cnto: 'Plácido Regueiro Díaz',
                                          lat: '43.01266431481519',
                                          lng: '-7.56290690000003',
                                          mail: 'placido.precor@espabrok.es',
                                          tel: '982203300',
                                          adr: 'Rua Anduriñas, 5-15, 27004',
                                          ruta: 'rua-andurinas-5-15-27004-lugo',
                                          ciudad: 'Lugo',
                                          provincia: 'Lugo',
                                          position: '32'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - CENTRAL MADRID',
                                          cnto: 'Diego Fernandez Nuel',
                                          lat: '40.4196548135246',
                                          lng: '-3.6787285999999995',
                                          mail: 'informacion@espabrok.es',
                                          tel: '913147230',
                                          adr: 'C/ Menorca Nº3 3º, 28009',
                                          ruta: 'calle-menorca-3-28009-madrid',
                                          ciudad: 'Madrid',
                                          provincia: 'Madrid',
                                          position: '33'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PASCUAL BURRUEZO',
                                          cnto: 'Pascual Burruezo Mateo',
                                          lat: '38.47193506261905',
                                          lng: '-1.3267741500000056',
                                          mail: 'pascualburruezo@espabrok.es',
                                          tel: '968781370',
                                          adr: 'C/ Fueros nº 16 Bajo Apartado correos nº 5, 30520',
                                          ruta: 'calle-fueros-16-30520-murcia',
                                          ciudad: 'Jumilla',
                                          provincia: 'Murcia',
                                          position: '34'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - THM SEGURO',
                                          cnto: 'Ines Hernandez',
                                          lat: '37.665818212258564',
                                          lng: '-1.7020050500000252',
                                          mail: 'lorca@espabrok.es',
                                          tel: '968112762',
                                          adr: 'C/ La seda nº10 Bajo, 30800',
                                          ruta: 'calle-la-seda-10-30800-murcia',
                                          ciudad: 'Lorca',
                                          provincia: 'Murcia',
                                          position: '35'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - NASABI',
                                          cnto: 'Vicente Santesteban Ruiz / Blanca Ibáñez Santesteban',
                                          lat: '42.80492111470785',
                                          lng: '-1.6505322000000433',
                                          mail: 'vicente.pamplona@espabrok.es',
                                          tel: '948170900',
                                          adr: 'C/ Esquiroz, 29 - 1º Izq., 31007',
                                          ruta: 'calle-esquiroz-29-31007-navarra',
                                          ciudad: 'Pamplona',
                                          provincia: 'Navarra',
                                          position: '36'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - CACHAFEIRO ASOC',
                                          cnto: 'Enrique Cachafeiro Balseiros',
                                          lat: '41.940257814268726',
                                          lng: '-7.439379400000007',
                                          mail: 'cachafeiro.verin@espabrok.es',
                                          tel: '988411972',
                                          adr: 'AV. Luis Espada, nº 21- 1º, 32600',
                                          ruta: 'avenida-luis-espada-21-32600',
                                          ciudad: 'Verin',
                                          provincia: 'Ourense',
                                          position: '37'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - SOLVEIRA Y PEÑA',
                                          cnto: 'Manuel Solveira Rivero / Antonio Peña Pérez',
                                          lat: '42.06391661433079',
                                          lng: '-7.726265699999999',
                                          mail: 'antonio.solpe@espabrok.es',
                                          tel: '988460760',
                                          adr: 'AV. de Orense, 16, Local 4, 32630',
                                          ruta: 'avenida-de-orense-16-32630',
                                          ciudad: 'Xinzo de Limia',
                                          provincia: 'Ourense',
                                          position: '38'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - FIDEL VILLAMUZA RODR',
                                          cnto: 'Fidel Villamuza Rodríguez',
                                          lat: '42.008816',
                                          lng: '-4.526954',
                                          mail: 'palencia@espabrok.es',
                                          tel: '979740077',
                                          adr: 'Plaza Felipe Prieto, Oficina 10, 34001',
                                          ruta: 'plaza-felipe-prieto-10-34001-palencia',
                                          ciudad: 'Palencia',
                                          provincia: 'Palencia',
                                          position: '39'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - ENRIQUE VIC, MORILLAS',
                                          cnto: 'Enrique Vicente Morillas',
                                          lat: '41.902557',
                                          lng: '-8.871906',
                                          mail: 'enrique@vicentemorillas.com',
                                          tel: '986610821',
                                          adr: 'Rua Galicia 11 Bajo, 36780',
                                          ruta: 'rua-galicia-11-36780-pontevedra',
                                          ciudad: 'A Guarda',
                                          provincia: 'Pontevedra',
                                          position: '40'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - JAP NOVAL SEGUROS',
                                          cnto: 'Francisco Javier Alvarez Portas',
                                          lat: '42.60496563238497',
                                          lng: '-8.642982800000027',
                                          mail: 'japnoval.javier@espabrok.es',
                                          tel: '986541219',
                                          adr: 'C/ José Salgado 61 Bajo, 36650',
                                          ruta: 'calle-jose-salgado-61-36650-pontevedra',
                                          ciudad: 'Caldas de reis',
                                          provincia: 'Pontevedra',
                                          position: '41'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - JOMAREL BROKER´S',
                                          cnto: 'Mario Martin',
                                          lat: '40.38667421350881',
                                          lng: '-5.767510600000037',
                                          mail: 'bejar@espabrok.es',
                                          tel: '923404444',
                                          adr: 'C/ M Sanchez Ocaña 44-1º, 37700',
                                          ruta: 'calle-maria-sanchez-ocana-44-37700-salamanca',
                                          ciudad: 'Bejar',
                                          provincia: 'Salamanca',
                                          position: '42'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - JOMAREL BROKER´S',
                                          cnto: 'Domingo Elena Izquierdo',
                                          lat: '40.96443991378722',
                                          lng: '-5.665666600000009',
                                          mail: 'salamanca@espabrok.es',
                                          tel: '923212904',
                                          adr: 'C/ Prado, 13, 37002',
                                          ruta: 'calle-prado-13-37002-salamanca',
                                          ciudad: 'Salamanca',
                                          provincia: 'Salamanca',
                                          position: '43'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PESVAGAR',
                                          cnto: 'Pablo Valiño Rodríguez',
                                          lat: '43.46024841504891',
                                          lng: '-3.820725100000004',
                                          mail: 'pablo.valino@pesvagar.es',
                                          tel: '942370611',
                                          adr: 'C/ S. Fernando 26 1º Dch, 39010',
                                          ruta: 'calle-san-fernando-26-39010',
                                          ciudad: 'Santander',
                                          provincia: 'Santander',
                                          position: '44'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - BOIX BROKERS',
                                          cnto: 'Juan José Boix Forteza',
                                          lat: '39.19193071294795',
                                          lng: '-0.4367462999999816',
                                          mail: 'ger.boixbc@espabrok.es',
                                          tel: '962422424',
                                          adr: 'C/ Cervantes nº 23, 46680',
                                          ruta: 'calle-cervantes-23-46680-valencia',
                                          ciudad: 'Algemesi',
                                          provincia: 'Valencia',
                                          position: '45'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - V.FRANCES ALBERO',
                                          cnto: 'Vicente Francés Albero',
                                          lat: '38.91278731281964',
                                          lng: '-0.547735399999965',
                                          mail: 'ontiyent@espabrok.es',
                                          tel: '962200752',
                                          adr: 'Plaza de la Vila 2, 46850',
                                          ruta: 'plaza-de-la-villa-2-46850',
                                          ciudad: 'olleria',
                                          provincia: 'Valencia',
                                          position: '46'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - V.FRANCES ALBERO',
                                          cnto: 'Vicente Francés Albero',
                                          lat: '38.825232',
                                          lng: '-0.599495',
                                          mail: 'vfrances@espabrok.es',
                                          tel: '962916111',
                                          adr: 'Avenida D´Albaida 2 - Entlo, 46870',
                                          ruta: 'avenida-albaida-2-46870-valencia',
                                          ciudad: 'Onteniente',
                                          provincia: 'Valencia',
                                          position: '47'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - COSTAS Y RAMILO',
                                          cnto: 'Manuel Costas Pérez',
                                          lat: '42.22781561441342',
                                          lng: '-8.707759399999986',
                                          mail: 'costasyramilo@espabrok.es',
                                          tel: '986261453',
                                          adr: 'C/ Gregorio Espino 55, 36205',
                                          ruta: 'calle-gregorio-espino-55-36205-vigo',
                                          ciudad: 'Pontevedra',
                                          provincia: 'Vigo',
                                          position: '48'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - JOMAREL BROKER´S',
                                          cnto: 'Leticia Fernandez',
                                          lat: '41.509721214054515',
                                          lng: '-5.738711100000046',
                                          mail: 'zamora@espabrok.es',
                                          tel: '980520504',
                                          adr: 'AV. Principe de Asturias 10-ent, 49012',
                                          ruta: 'avenida-principe-asturias-10-49012-zamora',
                                          ciudad: 'Zamora',
                                          provincia: 'Zamora',
                                          position: '49'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - BAYCOMI',
                                          cnto: 'Ruth Barrado',
                                          lat: '41.65035601412417',
                                          lng: '-0.8807779999999639',
                                          mail: 'ruth.baycomi@espabrok.es',
                                          tel: '976211275',
                                          adr: 'C/ Isaac Peral 3, Entlo. Drcha, 50001',
                                          ruta: 'calle-isaac-peral-3-50001-zaragoza',
                                          ciudad: 'Zaragoza',
                                          provincia: 'Zaragoza',
                                          position: '50'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'ESPABROK - PUNTO´90',
                                          cnto: 'Carmelo Alonso Fernández',
                                          lat: '41.649698',
                                          lng: '-0.882043',
                                          mail: 'zaragoza@espabrok.es',
                                          tel: '976238411',
                                          adr: 'C/ San Clemente, 6-1º, 50001',
                                          ruta: 'calle-san-clemente-6-50001-zaragoza',
                                          ciudad: 'Zaragoza',
                                          provincia: 'Zaragoza',
                                          position: '51'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'Palma de Mallorca',
                                          cnto: 'Sr Antonio Torres',
                                          lat: '39.571676',
                                          lng: '2.6462940',
                                          mail: 'tonitorres@espabrok.es',
                                          tel: '971719494',
                                          adr: 'AV. Jauime III 1 Entl B, 07012',
                                          ruta: 'avenida-jauime-3-07012-palma-de-mallorca',
                                          ciudad: 'Palma de Mallorca',
                                          provincia: 'Palma de Mallorca',
                                          position: '52'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA EN FROET',
                                          cnto: '',
                                          lat: '37.989678',
                                          lng: '-1.506747',
                                          mail: 'gesa@gesamedia.es',
                                          tel: '968340100 Extensión 110',
                                          adr: 'AV. Alhama, s/n (Pol. CITMUSA), 30169',
                                          ruta: 'avenida-alhama-3-30169-murcia',
                                          ciudad: 'San Ginés',
                                          provincia: 'Murcia',
                                          position: '54'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA EN FETRAMA',
                                          cnto: '',
                                          lat: '38.345825',
                                          lng: '-0.491801',
                                          mail: 'gesa@gesamedia.es',
                                          tel: '965929755',
                                          adr: 'C/ Tucuman, 2 Bajo, 30005',
                                          ruta: 'calle-tucuman-2-30005-alicante',
                                          ciudad: 'Alicante',
                                          provincia: 'Alicante',
                                          position: '56'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA PALMA DE MALLORCA',
                                          cnto: 'Sr Antonio Torres',
                                          lat: '39.64837991315992',
                                          lng: '-0.491801',
                                          mail: 'tonitorres@espabrok.es',
                                          tel: '971719494',
                                          adr: 'Avenida Jauime III 1 Entl B07012',
                                          ruta: 'avenida-jauime-3-B07012-palma-de-mallorca',
                                          ciudad: 'Palma de mallorca',
                                          provincia: 'Palma de mallorca',
                                          position: '57'
                                          },
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA MURCIA',
                                          cnto: 'Sr Mariano Luis Albaladejo Ortiz',
                                          lat: '37.956905312387825',
                                          lng: '-1.1994194999999763',
                                          mail: 'gesa@gesamedia.es',
                                          tel: '971719494',
                                          adr: 'Avda. Descubrimiento, 15, ed. Gran Vía Bajo 5,30820',
                                          ruta: 'avenida-Descubrimiento-15-30820-murcia',
                                          ciudad: 'Murcia',
                                          provincia: 'Murcia',
                                          position: '58'
                                          }
										  ,
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA BANYERES',
                                          cnto: '',
                                          lat: '41.22012301867177',
                                          lng: '1.6675086999999849',
                                          mail: 'gesa@gesamedia.es',
                                          tel: '628836631',
                                          adr: '',
                                          ruta: '',
                                          ciudad: 'Comunidad Valenciana',
                                          provincia: 'Comunidad Valenciana',
                                          position: '58'
                                          }
										  ,
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA ALCOY ',
                                          cnto: '',
                                          lat: '38.696464662720906',
                                          lng: '-0.47542780000003404',
                                          mail: 'gesa@gesamedia.es',
                                          tel: '965544399',
                                          adr: 'Calle Goya',
                                          ruta: 'calle-goya',
                                          ciudad: 'Alcoy, Alicante',
                                          provincia: 'Comunidad Valenciana',
                                          position: '58'
                                          }
										  ,
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA ALCOY ',
                                          cnto: 'Esther Ponsoda Nadal',
                                          lat: '38.73996936274072',
                                          lng: '-0.4361324000000195',
                                          mail: 'alcoy-empresas@espabrok.es',
                                          tel: '',
                                          adr: 'Calle Luis Vives',
                                          ruta: 'calle-luis-vives',
                                          ciudad: 'Alcoy, Alicante',
                                          provincia: 'Comunidad Valenciana',
                                          position: '58'
                                          }
										   ,
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA MURO',
                                          cnto: 'Aida Blasco',
                                          lat: '42.77736129106096',
                                          lng: '-9.058283249999931',
                                          mail: 'muro@espabrok.es',
                                          tel: '',
                                          adr: '',
                                          ruta: '',
                                          ciudad: 'Muros',
                                          provincia: 'A Coruña',
                                          position: '58'
                                          }
										   ,
										  {
                                          sales: '1',
                                          aftersales: '1',
                                          name: 'OFICINA BENIDORM NUEVO',
                                          cnto: 'Antonio Costa Zaragoza',
                                          lat: '38.539232336084694',
                                          lng: '-0.12622899999996662',
                                          mail: 'mfs.benidorm@espabrok.es',
                                          tel: '626 542 752 | 679 740 169',
                                          adr: 'Calle Via Emilio Ortuño, 12 apto. 24 Edif. Tejas Puente 03501',
                                          ruta: 'via-emiliano-ortuño',
                                          ciudad: 'Benidorm',
                                          provincia: 'Benidorm',
                                          position: '58'
                                          }
										  ];
                    
                    function _newGoogleMapsMarker(param) {
                        var r = new google.maps.Marker({
                                                       map: param._map,
                                                       position: new google.maps.LatLng(param._lat, param._lng),
                                                       title: param._head,
													   icon: 'img/icons/icon-map.png'
                                                       });
                        if (param._data) {
                            google.maps.event.addListener(r, 'click', function() {
                                                          // this -> the marker on which the onclick event is being attached
                                                          if (!this.getMap()._infoWindow) {
                                                          this.getMap()._infoWindow = new google.maps.InfoWindow();
                                                          }
                                                          this.getMap()._infoWindow.close();
                                                          this.getMap()._infoWindow.setContent(param._data);
                                                          this.getMap()._infoWindow.open(this.getMap(), this);
                                                          });
                        }
                        return r;
                    }
                    function initialize() {
                        var mO = {
                            center: new google.maps.LatLng(40.463666, -3.735352),
                            zoom: zoomLimit,
                            streetViewControl: false,
                            mapTypeControl: false,
                            navigationControlOptions: {
                                style: google.maps.NavigationControlStyle.SMALL
                            },
                            mapTypeId: google.maps.MapTypeId.ROADMAP
                        };
                        map = new google.maps.Map(document.getElementById("map"), mO);
                        for (var a = 0; a < dealer_markers.length; a++) {
                            
							var tmpLat = dealer_markers[a].lat;
                            var tmpLng = dealer_markers[a].lng;
							
                            var tmpName = dealer_markers[a].name;
                            var tmpCnto = dealer_markers[a].cnto;
                            var tmpMail = dealer_markers[a].mail;
                            var tmpTel = dealer_markers[a].tel;
                            var tmpAdr = dealer_markers[a].adr;
                            var tmpCiu = dealer_markers[a].ciudad;
                            var tmpProv = dealer_markers[a].provincia;
                            var tmpRuta = dealer_markers[a].ruta;
							
                            var marker = _newGoogleMapsMarker({
                                                              _map: map,
                                                              _lat: tmpLat,
                                                              _lng: tmpLng,
                                                              _head: '|' + new google.maps.LatLng(tmpLat, tmpLng),
                                                              _data: '<div id="bg">\
                                                              <p class="tone">Nombre</p><p class="ttwo">' + tmpName + '</p>\
                                                              <p class="tone">Contacto</p><p class="tthree">' + tmpCnto + '</p>\
                                                              <p class="tone">Email</p><p class="tthree"><a href="mailto:' + tmpMail + '">' + tmpMail + '</a></p>\
                                                              <p class="tone">Tel</p><p class="tthree"><a href="tel:' + tmpTel + '">' + tmpTel + '</a></p>\
                                                              <p class="tone">Dirección</p><p class="tthree">' + tmpAdr + '</p>\
                                                              <p class="tone">Ciudad</p><p class="tthree">' + tmpCiu + '</p>\
                                                              <p class="tone">Provincia</p><p class="tthree">' + tmpProv + '</p>\
															  <input type="hidden" id="rutaempresa" value="' + tmpLat + '+' + tmpLng + '">\
                                                              <div class="tfour"><a href="javascript:comollegar();">¿Cómo Llegar?</a></div>\
                                                              </div>'
                                                              });
                        }
                    }
					
                    google.maps.event.addDomListener(window, 'load', initialize);
                    












	app.initialize();
         var ua = navigator.userAgent;
			if( ua.indexOf("Android") >= 0 ){
			  var androidversion = parseFloat(ua.slice(ua.indexOf("Android")+8)); 
			  if (androidversion < 2.4){
			  		$(document).bind('mobileinit', function () {
                             $("[data-role=header]").fixedtoolbar({ tapToggle: true });
                             $("[data-role=footer]").fixedtoolbar({ tapToggle: true });
                             $.mobile.transitionFallbacks='none';
                             $.support.cors = true;
							 $.mobile.touchOverflowEnabled = true;
							 $.mobile.allowCrossDomainPages = true;
							 $.mobile.loadingMessage = "Loading...";
							 $.mobile.pageLoadErrorMessage = "Error Loading Data";
							 $.mobile.page.prototype.options.backBtnTheme = "b";
							 $.mobile.page.prototype.options.backBtnText = "Back";
							 $.mobile.defaultPageTransition = 'none';
							 $.mobile.loadingMessageTextVisible = true;
							 $.mobile.pushStateEnabled = false;
							 $.mobile.phonegapNavigationEnabled = true;
							 $.extend($.mobile, {
								defaultPageTransition: 'none'
							 });
            			});
			  }else{
			  		$(document).one('mobileinit', function () {
                             $("[data-role=header]").fixedtoolbar({ tapToggle: true });
                             $("[data-role=footer]").fixedtoolbar({ tapToggle: true });
                             $.mobile.transitionFallbacks='none';
                             $.support.touchOverflow = true;
            				 $.mobile.touchOverflowEnabled = true;
                             $.mobile.transitionFallbacks='none';
                             $.mobile.defaultPageTransition = 'slide';
                             $.mobile.phonegapNavigationEnabled = true;
                             $.mobile.allowCrossDomainPages = true;
            			});
            	}
			}
			

	function onSuccess(position) {
		document.getElementById('miposicion').value = position.coords.latitude +'+'+ position.coords.longitude;
		
		var element = document.getElementById('geolocation');
		element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
		'Longitude: '          + position.coords.longitude             + '<br />' +
		'Altitude: '           + position.coords.altitude              + '<br />' +
		'Accuracy: '           + position.coords.accuracy              + '<br />' +
		'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
		'Heading: '            + position.coords.heading               + '<br />' +
		'Speed: '              + position.coords.speed                 + '<br />' +
		'Timestamp: '          +                                   position.timestamp          + '<br />';
	}
	function onError(error) {
		//var miposicion = position.coords.latitude +','+ position.coords.longitude;
	}

	function onOffline() {
		$.mobile.changePage('#asistencia', '', true, true);
    }

	function llamar(tel){
        window.location = 'tel:'+tel;
	}
	
	function facebook() {
		var ref = window.open('https://www.facebook.com/pages/Espabrok/412836205447666?fref=ts', '_blank', 'location=no');
	}
	function twitter() {
		var ref = window.open('https://twitter.com/evaespabrok', '_blank', 'location=no');
	}
	function youtube() {
		var ref = window.open('http://www.youtube.com/user/TOTE2311', '_blank', 'location=no');
	}
	function locales() {
        var miposicion = $("#miposicion").val();
		var ref = window.open('http://apis.spaceweb.es/maps-empresas.php?formato=latlng&tipo=pharmacy&miposicion='+miposicion+'', '_blank', 'location=no');
	}
	function parking() {
        var miposicion = $("#miposicion").val();
		var ref = window.open('http://apis.spaceweb.es/maps-empresas.php?formato=latlng&tipo=parking&miposicion='+miposicion+'', '_blank', 'location=no');
	}
	function ofertas() {
        var miposicion = $("#miposicion").val();
		var ref = window.open('http://aplications.spaceweb.es/datos/ofertasext?app=Espabrok&miposicion='+miposicion+'', '_blank', 'location=no');
	}
	
	function openweb() {
		window.open("http://www.espabrok.es", "_system");
	}
	
	function alertDismissed() {
		$.mobile.silentScroll(0);
	}
	function alerts(mensaje,titulo){
		navigator.notification.alert(
			mensaje,  // message
			alertDismissed,         // callback
			titulo,            // title
			'OK'                  // buttonName
		);
	}


	function vaciapedirinfo(){
		$("#pedirinfoficina").val('');
		$("#pedirinfoname").val('');	
		$("#pedirinfotel").val('');
		$("#pedirinfoemail").val('');
		$("#pedirinfotxt").val('');
	}

	function pedirinfo() {
		var oficina = $("#pedirinfoficina").val();
			nombre = $("#pedirinfoname").val();			
			telefono = $("#pedirinfotel").val();
			email = $("#pedirinfoemail").val();
			mensaje = $("#pedirinfotxt").val();
			
			valida_email = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
			valida_nombre = /[a-zA-Z]{3}/;
			valida_mensaje = /[a-zA-Z]{5}/;
			valida_telefono = /[0-9]{9}/;
		
		if(oficina == ""){
		    $("#pedirinfoficina").focus();
			alerts('Por favor, seleccione Oficina','Aviso');
		    return false;
		}else if(nombre == "" || !valida_nombre.test(nombre)){
		    $("#pedirinfoname").focus();
			$('#pedirinfoname').css("background", "#ee5f5b").css("color", "#fff").css("text-shadow", "none");	
			$('#pedirinfoficina').css("background", "").css("color", "").css("text-shadow", "");	
		    return false;
		}else if(telefono == "" || !valida_telefono.test(telefono)){
		    $("#pedirinfotel").focus();
			$('#pedirinfotel').css("background", "#ee5f5b").css("color", "#fff").css("text-shadow", "none");	
			$('#pedirinfoficina').css("background", "").css("color", "").css("text-shadow", "");	
			$('#pedirinfoname').css("background", "").css("color", "").css("text-shadow", "");	
		    return false;
		}else if(email == "" || !valida_email.test(email)){
		    $("#pedirinfoemail").focus();
			$('#pedirinfoemail').css("background", "#ee5f5b").css("color", "#fff").css("text-shadow", "none");	
			$('#pedirinfoficina').css("background", "").css("color", "").css("text-shadow", "");	
			$('#pedirinfoname').css("background", "").css("color", "").css("text-shadow", "");	
			$('#pedirinfotel').css("background", "").css("color", "").css("text-shadow", "");	
		    return false;
		}else if(mensaje == "" || !valida_mensaje.test(mensaje)){
		    $("#pedirinfotxt").focus();
			$('#pedirinfotxt').css("background", "#ee5f5b").css("color", "#fff").css("text-shadow", "none");	
			$('#pedirinfoficina').css("background", "").css("color", "").css("text-shadow", "");	
			$('#pedirinfoname').css("background", "").css("color", "").css("text-shadow", "");	
			$('#pedirinfotel').css("background", "").css("color", "").css("text-shadow", "");	
			$('#pedirinfoemail').css("background", "").css("color", "").css("text-shadow", "");	
		    return false;
		}else{
			$('#pedirinfoficina').css("background", "").css("color", "").css("text-shadow", "none");	
			$('#pedirinfoname').css("background", "").css("color", "").css("text-shadow", "none");		
			$('#pedirinfotel').css("background", "").css("color", "").css("text-shadow", "none");		
			$('#pedirinfoemail').css("background", "").css("color", "").css("text-shadow", "none");		
			$('#pedirinfotxt').css("background", "").css("color", "").css("text-shadow", "none");		
			//$("#loading").css("display", "block");
			
			
			eventoJSON = {
				"oficina" : oficina,
				"nombre" : nombre,
				"telefono" : telefono,
				"email" : email,
				"mensaje" : mensaje,
			};
			$.ajax({
                 type: "POST",
                 dataType: "json",
	    		 url: "http://panel.spaceweb.es/clientes/espabrok/espabrokapp/forms/pedir-informacion.php",
                 data: eventoJSON})
                 win2();
			}
	};
	
	
	function vaciasiniestro(){
		$("#siniestroficina").val('');
		$("#siniestrofecha").val('');
		$("#siniestrolugar").val('');
		$("#siniestroculpa").val('');
		$("#siniestroautorid").val('');
		$("#siniestromatricula").val('');
		$("#siniestrotitular").val('');
		$("#siniestrotlf").val('');
		$("#siniestrodanos").val('');
		$("#siniestromatricula2").val('');
		$("#siniestrotitular2").val('');
		$("#siniestrotlf2").val('');
		$("#siniestrosegcont").val('');
		$("#siniestromodvehi").val('');
		$("#siniestrodanos2").val('');
		$("#siniestrovaccidente").val('');
	}
	
	function enviarsiniestro(){
	//siniestrovaccidente siniestrodanos2 siniestromodvehi siniestrosegcont siniestrotlf2 siniestrotitular2 siniestromatricula2 siniestrodanos /siniestrotlf siniestrotitular siniestromatricula siniestroautorid siniestroculpa siniestrolugar siniestrofech
		var oficina = $("#siniestroficina").val();
			fecha = $("#siniestrofecha").val();
			lugar = $("#siniestrolugar").val();
			culpable = $("#siniestroculpa").val();
			autoridad = $("#siniestroautorid").val();
			matricula1 = $("#siniestromatricula").val();
			titular1 = $("#siniestrotitular").val();
			telefono1 = $("#siniestrotlf").val();
			danos = $("#siniestrodanos").val();
			matricula2 = $("#siniestromatricula2").val();
			titular2 = $("#siniestrotitular2").val();
			telefono2 = $("#siniestrotlf2").val();
			titular2 = $("#siniestrosegcont").val();
			vehiculo = $("#siniestromodvehi").val();
			danos2 = $("#siniestrodanos2").val();
			accidente = $("#siniestrovaccidente").val();

			
			valida_email = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
			valida_nombre = /[a-zA-Z]{3}/;
			valida_mensaje = /[a-zA-Z]{5}/;
			valida_telefono = /[0-9]{9}/;
		
		if(oficina == ""){
		    $("#siniestroficina").focus();
			alerts('Por favor, seleccione Oficina','Aviso');
		    return false;
		}else if(matricula1 == ""){
		    $("#siniestromatricula").focus();
			$('#siniestromatricula').css("background", "#ee5f5b").css("color", "#fff").css("text-shadow", "none");
			$('#siniestroficina').css("background", "").css("color", "").css("text-shadow", "none");		
		    return false;
		}else if(telefono1 == ""){
		    $("#siniestrotlf").focus();
			$('#siniestrotlf').css("background", "#ee5f5b").css("color", "#fff").css("text-shadow", "none");	
			$('#siniestroficina').css("background", "").css("color", "").css("text-shadow", "none");		
			$('#siniestromatricula').css("background", "").css("color", "").css("text-shadow", "none");		
		    return false;
		}else{
			$('#siniestroficina').css("background", "").css("color", "").css("text-shadow", "none");		
			$('#siniestromatricula').css("background", "").css("color", "").css("text-shadow", "none");		
			$('#siniestrotlf').css("background", "").css("color", "").css("text-shadow", "none");		
			
			
                // Retrieve image file location from specified source
                navigator.camera.getPicture(uploadPhoto, function(message) {
                                            alert('Saca una foto y adjuntala');
                                            },{
                                            quality: 50,
                                            destinationType: navigator.camera.DestinationType.FILE_URI,
                                            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
                                            }
                                            );
                
            
            function uploadPhoto(imageURI) {
                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
                options.mimeType="image/jpeg";
                
                var params = new Object();
                params.oficina = oficina;
                params.fecha = fecha;
                params.lugar = lugar;
                params.culpable = culpable;
                params.autoridad = autoridad;
                params.matricula1 = matricula1;
                params.titular1 = titular1;
                params.telefono1 = telefono1;
                params.danos = danos;
                params.matricula2 = matricula2;
                params.titular2 = titular2;
                params.telefono2 = telefono2;
                params.titular2 = titular2;
                params.vehiculo = vehiculo;
                params.danos2 = danos2;
                params.accidente = accidente;

                
                options.params = params;
                options.chunkedMode = false;
                
                var ft = new FileTransfer();
                //ft.upload(imageURI, "http://panel.spaceweb.es/clientes/guredot/guredot/upload.php", win, fail, options);
                ft.upload(imageURI, "http://panel.spaceweb.es/clientes/espabrok/espabrokapp/forms/tramitar-siniestro.php", win, fail, options);
            }
		}
        
	}
	
	
			function win(r) {
				vaciasiniestro();
                alerts('TramitacionEnviada','Tramitar');
            }
            function win2(r) {
				vaciapedirinfo();
                alerts('Solicitud Enviada','Solicitud');
            }
            
            function fail(error) {
            	vaciapedirinfo();
				vaciasiniestro();
                alerts('TramitacionEnviada','Tramitar');
            }


/*jslint browser: true, sloppy: true, white: true, nomen: true, plusplus:true, maxerr: 50, indent: 2 */
/*global jQuery:false, iScroll:false */

/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true,
         undef:true, curly:true, browser:true, jquery:true, indent:2, maxerr:50,
         white:false, nomen:false */

//-------------------------------------------------------
// Pull-Up and Pull-Down callbacks for "Pull" page
//-------------------------------------------------------
(function pullPagePullImplementation($) {
  "use strict";
  var pullDownGeneratedCount = 0,
      pullUpGeneratedCount = 0,
      listSelector = "div.pull-demo-page ul.ui-listview",
      lastItemSelector = listSelector + " > li:last-child";
    
  /* For this example, I prepend three rows to the list with the pull-down, and append
   * 3 rows to the list with the pull-up. This is only to make a clear illustration that the
   * action has been performed. A pull-down or pull-up might prepend, append, replace or modify
   * the list in some other way, modify some other page content, or may not change the page 
   * at all. It just performs whatever action you'd like to perform when the gesture has been 
   * completed by the user.
   */
  function gotPullDownData(event, data) {
    var i,
        newContent = "";        
    for (i=0; i<3; i+=1) {  // Generate some fake new content
      newContent = "<li>Pulldown-generated row " + (++pullDownGeneratedCount) + "</li>" + newContent;
      }
    $(listSelector).prepend(newContent).listview("refresh");  // Prepend new content and refresh listview
    data.iscrollview.refresh();    // Refresh the iscrollview
    }
  
  function gotPullUpData(event, data) {
    var i,
        iscrollview = data.iscrollview,
        newContent = "";
    for (i=0; i<3; i+=1) { 
      newContent += "<li>Pullup-generated row " + (++pullUpGeneratedCount) + "</li>";
      }
    $(listSelector).append(newContent).listview("refresh");
  
    // The refresh is a bit different for the pull-up, because I want to demonstrate the use
    // of refresh() callbacks. The refresh() function has optional pre and post-refresh callbacks.
    // Here, I use a post-refresh callback to do a timed scroll to the bottom of the list
    // after the new elements are added. The scroller will smoothly scroll to the bottom over
    // a 400mSec period. It's important to use the refresh() callback to insure that the scroll
    // isn't started until the scroller has first been refreshed.
    iscrollview.refresh(null, null,
      $.proxy(function afterRefreshCallback(iscrollview) { 
        this.scrollToElement(lastItemSelector, 400); 
        }, iscrollview) ); 
    }
  
  // This is the callback that is called when the user has completed the pull-down gesture.
  // Your code should initiate retrieving data from a server, local database, etc.
  // Typically, you will call some function like jQuery.ajax() that will make a callback
  // once data has been retrieved.
  //
  // For demo, we just use timeout to simulate the time required to complete the operation.
  function onPullDown (event, data) { 
    setTimeout(function fakeRetrieveDataTimeout() {
      gotPullDownData(event, data);
      }, 
      1500); 
    }    

  // Called when the user completes the pull-up gesture.
  function onPullUp (event, data) { 
    setTimeout(function fakeRetrieveDataTimeout() {
      gotPullUpData(event, data);
      }, 
      1500); 
    }    
  
  // Set-up jQuery event callbacks
  $(document).delegate("div.pull-demo-page", "pageinit", 
    function bindPullPagePullCallbacks(event) {
      $(".iscroll-wrapper", this).bind( {
      iscroll_onpulldown : onPullDown,
      iscroll_onpullup   : onPullUp
      } );
    } );  

  }(jQuery));

//-------------------------------------------------------
// Pull-down and Pull-up callbacks for "Short Pull" page
//-------------------------------------------------------

(function shortPullPagePullImplementation($) { 
  "use strict";
  var pullDownGeneratedCount = 0,
    pullUpGeneratedCount = 0,
    listSelector = "div.short-pull-demo-page ul.ui-listview",
    lastItemSelector = listSelector + " > li:last-child";
      
  function gotPullDownData(event, data) {
    var i,
        newContent = "";
    for (i=0; i<3; i+=1) {
      newContent = "<li>Pulldown-generated row " + (++pullDownGeneratedCount) + "</li>" + newContent;
      }
    $(listSelector).prepend(newContent).listview("refresh");
    data.iscrollview.refresh();
    }

  function gotPullUpData(event, data) {
    var i,
        iscrollview = data.iscrollview,
        newContent = "";
    for (i=0; i<3; i+=1) {
      newContent += "<li>Pullup-generated row " + (++pullUpGeneratedCount) + "</li>";
      }
    $(listSelector).append(newContent).listview("refresh");  
    iscrollview.refresh(null, null,
      $.proxy(function afterRefreshCallback() { 
        this.scrollToElement(lastItemSelector, 400);
        }, iscrollview) );
    }
  
  function onPullDown (event, data) { 
    setTimeout(function fakeRetrieveDataTimeout() { 
      gotPullDownData(event, data); }, 
      1500); }  
  
  function onPullUp (event, data) { 
    setTimeout(function fakeRetrieveDataTimeout() { 
      gotPullUpData(event, data);   
      }, 1500); }   
  
  $(document).delegate("div.short-pull-demo-page", "pageinit", 
    function bindShortPullPagePullCallbacks(event) {
      $(".iscroll-wrapper", this).bind( {
      iscroll_onpulldown : onPullDown,
      iscroll_onpullup   : onPullUp
      } );
    }); 
 
  }(jQuery));




var deviceInfo = function() {
    document.getElementById("platform").innerHTML = device.platform;
    document.getElementById("version").innerHTML = device.version;
    document.getElementById("uuid").innerHTML = device.uuid;
    document.getElementById("name").innerHTML = device.name;
    document.getElementById("width").innerHTML = screen.width;
    document.getElementById("height").innerHTML = screen.height;
    document.getElementById("colorDepth").innerHTML = screen.colorDepth;

	var pushNotification = window.plugins.pushNotification;
	pushNotification.registerDevice({ email: "arello.analytics@gmail.com", appid : "4fc89b6d14a655.46488481" },
									function(status) {
										console.warn('registerDevice:%o', status);
										navigator.notification.alert(JSON.stringify(['registerDevice', status]));
									},
									function(status) {
									console.warn('failed to register :%o', status);
									navigator.notification.alert(JSON.stringify(['failed to register ', status]));
									});
									
	document.addEventListener('push-notification', function(event) {
								console.warn('push-notification!: ' + event.notification);
								navigator.notification.alert(JSON.stringify(['push-notification!', event.notification]));
							  });
									
};

var getLocation = function() {
    var suc = function(p) {
        alert(p.coords.latitude + " " + p.coords.longitude);
    };
    var locFail = function() {
    };
    navigator.geolocation.getCurrentPosition(suc, locFail);
};

var beep = function() {
    navigator.notification.beep(2);
};

var vibrate = function() {
    navigator.notification.vibrate(0);
};

function roundNumber(num) {
    var dec = 3;
    var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
    return result;
}

var accelerationWatch = null;

function updateAcceleration(a) {
    document.getElementById('x').innerHTML = roundNumber(a.x);
    document.getElementById('y').innerHTML = roundNumber(a.y);
    document.getElementById('z').innerHTML = roundNumber(a.z);
}

var toggleAccel = function() {
    if (accelerationWatch !== null) {
        navigator.accelerometer.clearWatch(accelerationWatch);
        updateAcceleration({
            x : "",
            y : "",
            z : ""
        });
        accelerationWatch = null;
    } else {
        var options = {};
        options.frequency = 1000;
        accelerationWatch = navigator.accelerometer.watchAcceleration(
                updateAcceleration, function(ex) {
                    alert("accel fail (" + ex.name + ": " + ex.message + ")");
                }, options);
    }
};

var preventBehavior = function(e) {
    e.preventDefault();
};

function dump_pic(data) {
    var viewport = document.getElementById('viewport');
    console.log(data);
    viewport.style.display = "";
    viewport.style.position = "absolute";
    viewport.style.top = "10px";
    viewport.style.left = "10px";
    document.getElementById("test_img").src = "data:image/jpeg;base64," + data;
}

function fail(msg) {
    alert(msg);
}

function show_pic() {
    navigator.camera.getPicture(dump_pic, fail, {
        quality : 50
    });
}

function close() {
    var viewport = document.getElementById('viewport');
    viewport.style.position = "relative";
    viewport.style.display = "none";
}

function contacts_success(contacts) {
    alert(contacts.length
            + ' contacts returned.'
            + (contacts[2] && contacts[2].name ? (' Third contact is ' + contacts[2].name.formatted)
                    : ''));
}

function get_contacts() {
    var obj = new ContactFindOptions();
    obj.filter = "";
    obj.multiple = true;
    navigator.contacts.find(
            [ "displayName", "name" ], contacts_success,
            fail, obj);
}

function check_network() {
    var networkState = navigator.network.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';

    confirm('Connection type:\n ' + states[networkState]);
}

var watchID = null;

function updateHeading(h) {
    document.getElementById('h').innerHTML = h.magneticHeading;
}

function toggleCompass() {
    if (watchID !== null) {
        navigator.compass.clearWatch(watchID);
        watchID = null;
        updateHeading({ magneticHeading : "Off"});
    } else {        
        var options = { frequency: 1000 };
        watchID = navigator.compass.watchHeading(updateHeading, function(e) {
            alert('Compass Error: ' + e.code);
        }, options);
    }
}

function init() {
    // the next line makes it impossible to see Contacts on the HTC Evo since it
    // doesn't have a scroll button
    // document.addEventListener("touchmove", preventBehavior, false);
    document.addEventListener("deviceready", deviceInfo, true);
}

function javascriptFunc() {
	alert("hello");
}

function showAlert(msg) {
	alert(msg);
}

function onPushReceive(msg) {
	alert(msg);
}

function onRegister(msg) {
	alert(msg);
}

function onUnregister(msg) {
	alert(msg);
}

function onRegisterError(msg) {
	alert(msg);
}

function onUnregisterError(msg) {
	alert(msg);
}


function Reachability(){
    this.IsNotConnected = function(){
        if(navigator.network.connection.type == Connection.NONE || navigator.network.connection.type == Connection.UNKNOWN)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}

function registrar(msg){
    var token       = msg;
    var uuid        = device.uuid;
    var cordova     = device.cordova;
    var platform    = device.platform;
    var version     = device.version;
    var name        = device.name;
    var model       = device.model;
   
   $.ajax({
        data: 'app=Espabrok&token='+token+'&uuid='+uuid+'&cordova='+cordova+'&platform='+platform+'&version='+version+'&name='+name+'&model='+model,
        type: "POST",
        dataType: "json",
        url: "http://aplications.spaceweb.es/autentificacion.php",
        success: function(json){
          //navigator.notification.alert(json);
        }
    });
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		
		navigator.splashscreen.hide();
		document.addEventListener("offline", onOffline, false);
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        app.receivedEvent('deviceready');	
    },
    tokenHandler:function(msg) {
        console.log("Token Handler " + msg);
        registrar(msg)
    },
    errorHandler:function(error) {
        console.log("Error Handler  " + error);
    },
    // result contains any message sent from the plugin call
    successHandler: function(result) {
        console.log('Success! Result = '+result)
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var pushNotification = window.plugins.pushNotification;
        // TODO: Enter your own GCM Sender ID in the register call for Android
        if (device.platform == 'android' || device.platform == 'Android') {
            pushNotification.register(this.successHandler, this.errorHandler,{"senderID":"666721783212","ecb":"app.onNotificationGCM"});
        }
        else {
            pushNotification.register(this.tokenHandler,this.errorHandler,{"badge":"true","sound":"true","alert":"true","ecb":"app.onNotificationAPN"});
        }
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    // iOS
    onNotificationAPN: function(event) {
        var pushNotification = window.plugins.pushNotification;
        console.log("Received a notification! " + event.alert);
        console.log("event sound " + event.sound);
        console.log("event badge " + event.badge);
        console.log("event " + event);
        if (event.alert) {
            navigator.notification.alert(event.alert);
        }
        if (event.badge) {
            console.log("Set badge on  " + pushNotification);
            pushNotification.setApplicationIconBadgeNumber(this.successHandler, event.badge);
        }
        if (event.sound) {
            var snd = new Media(event.sound);
            snd.play();
        }
    },
    // Android
    onNotificationGCM: function(e) {
        switch( e.event )
        {
            case 'registered':
                if ( e.regid.length > 0 )
                {
                    // Your GCM push server needs to know the regID before it can push to this device
                    // here is where you might want to send it the regID for later use.
                    registrar(e.regid)
                }
            break;

            case 'message':
              if (e.foreground)
                    {	// if the notification contains a soundname, play it.
                        var my_media = new Media("/android_asset/www/"+e.soundname);
                        my_media.play();
                    }
                    else
                    {   // otherwise we were launched because the user touched a notification in the notification tray.
                        if (e.coldstart)
                            $(".app-status-ul").append('<li>--COLDSTART NOTIFICATION--' + '</li>');
                        else
                        $(".app-status-ul").append('<li>--BACKGROUND NOTIFICATION--' + '</li>');
                    }
              alert(e.payload.message);
              alert(e.payload.msgcnt);
              
            break;

            case 'error':
              alert('GCM error = '+e.msg);
            break;

            default:
              alert('An unknown GCM event has occurred');
              break;
        }
    }

};


var PhoneDialer = function() {} 

PhoneDialer.prototype.dial = function(phnum) {cordova.exec("PhoneDialer.dialPhone", {"number" : phnum });};if(!window.plugins) {window.plugins = {};}if(!window.plugins.phoneDialer) {window.plugins.phoneDialer = new PhoneDialer();}


(function(cordova) {
    var cordovaRef = window.PhoneGap || window.Cordova || window.cordova;

	function PushNotification() {}

	// Call this to register for push notifications. Content of [options] depends on whether we are working with APNS (iOS) or GCM (Android)
	PushNotification.prototype.register = function(successCallback, errorCallback, options) {
        console.log("About to register");
		cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "register", [options]);
	};

    // Call this to unregister for push notifications
    PushNotification.prototype.unregister = function(successCallback, errorCallback) {
        cordovaRef.exec(successCallback, errorCallback, "PushPlugin", "unregister", []);
    };
 
 
    // Call this to set the application icon badge
    PushNotification.prototype.setApplicationIconBadgeNumber = function(successCallback, badge) {
        cordovaRef.exec(successCallback, successCallback, "PushPlugin", "setApplicationIconBadgeNumber", [{badge: badge}]);
    };

 cordova.addConstructor(function() {
		if(!window.plugins)
            window.plugins = {};
		window.plugins.pushNotification = new PushNotification();
	});

 })(window.cordova || window.Cordova || window.PhoneGap);


function GoogleMap(){
    
    this.initialize = function(){
        var map = showMap();
        addMarkersToMap(map);
    }    
    
    var addMarkersToMap = function(map){
        var mapBounds = new google.maps.LatLngBounds();
    
        var latitudeAndLongitudeOne = new google.maps.LatLng('-33.890542','151.274856');

        var markerOne = new google.maps.Marker({
					position: latitudeAndLongitudeOne,
					map: map
				});
				
        var latitudeAndLongitudeTwo = new google.maps.LatLng('57.77828', '14.17200');

        var markerOne = new google.maps.Marker({
					position: latitudeAndLongitudeTwo,
					map: map
				});
				
        mapBounds.extend(latitudeAndLongitudeOne);
        mapBounds.extend(latitudeAndLongitudeTwo);
        
        map.fitBounds(mapBounds);
    }
    
    
    
    var showMap = function(){
        var mapOptions = {
			     zoom: 4,
			     center: new google.maps.LatLng(-33, 151),
			     mapTypeId: google.maps.MapTypeId.ROADMAP
			 }
			 
        var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        
        return map;
    }
}
