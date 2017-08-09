






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
        



            $(document).bind("mobileinit", function() {
                 $.mobile.defaultPageTransition = "none";
                 $.mobile.defaultDialogTransition = "none";
             });
        


			var moa = {
				moas:[
					{
						name:'Acetylcholine esterase inhibitors',
						number:1,
						subgroups: [
							{
								name:'A',
								c_class:'Carbamates',
								actives: [
									'Aldicarb',
									'Alanycarb',
									'Bendiocarb',
									'Benufuracarb',
									'Butocarboxim',
									'Carbaryl',
									'Carbofuran',
									'Carbosulfan',
									'Ethiofencarb',
									'Fenobucarb',
									'Formetanate',
									'Furathiocarb',
									'Isoprocarb',
									'Methiocarb',
									'Methomyl',
									'Metolcarb',
									'Oxamyl',
									'Pirimicarb',
									'Propoxur',
									'Thiodicarb',
									'Thiofanox',
									'Triazamate',
									'Trimethacarb',
									'XMC',
									'Xylylcarb'
								]
							},
							{
								name:'B',
								c_class:'Organophosphates',
								actives: [
									'Acephate',
									'Azamethiphos',
									'Azinphos-ethyl',
									'Azinphos-methyl',
									'Cadusafos',
									'Chlorethoxyfos',
									'Chlorfenvinphos',
									'Chlormephos',
									'Chlorpyrifos',
									'Chlorpyrifos-methyl',
									'Coumaphos',
									'Cyanophos',
									'Demeton-S-methyl',
									'Diazinon',
									'Dichlorvos/ DDVP',
									'Dicrotophos',
									'Dimethoate',
									'Dimethylvinphos',
									'Disulfoton',
									'EPN',
									'Ethion',
									'Ethoprophos',
									'Famphur',
									'Fenamiphos',
									'Fenitrothion',
									'Fenthion',
									'Fosthiazate',
									'Heptenophos',
									'Imicyafos',
									'Isofenphos',
									'Isopropyl O-(methoxyaminothio-phosphoryl)salicylate',
									'Isoxathion',
									'Malathion',
									'Mecarbam',
									'Methamidophos',
									'Methidathion',
									'Mevinphos',
									'Monocrotophos',
									'Naled',
									'Omethoate',
									'Oxydemeton-methyl',
									'Parathion',
									'Parathion-methyl',
									'Phenthoate',
									'Phorate',
									'Phosalone',
									'Phosmet',
									'Phosphamidon',
									'Phoxim',
									'Pirimiphos-methyl',
									'Profenofos',
									'Propetamphos',
									'Prothiofos',
									'Pyraclofos',
									'Pyridaphenthion',
									'Quinalphos',
									'Sulfotep',
									'Tebupirimfos',
									'Temephos',
									'Terbufos',
									'Tetrachlorvinphos',
									'Thiometon',
									'Triazophos',
									'Trichlorfon',
									'Vamidothion'
								]
							}
						]
					},
					{
						name:'GABA-gated chloride channel antagonists',
						number:2,
						subgroups: [
							{
								name: 'A',
								c_class:'Cyclodiene organiochlorides',
								actives:[
									'Chlordane',
									'Endosulfan'
								]
							},
							{
								name: 'B',
								c_class:'Phenylpyrazoles (Fiproles)',
								actives:[
									'Ethiprole',
									'Fipronil'
								]
							}
						]
					},
					{
						name:'Sodium channel modulators',
						number:3,
						subgroups:[
							{
								name:'A',
								c_class:'Pyrethroids, Pyrethrins',
								actives:[
									'Acrinathrin',
									'Allethrin',
									'd-cis-trans Allethrin',
									'd-trans Allethrin',
									'Bifenthrin',
									'Bioallethrin',
									'Bioallethrin S-cyclopentenyl',
									'Bioresmethrin',
									'Cycloprothrin',
									'Cyfluthrin',
									'beta-Cyfluthrin',
									'Cyhalothrin',
									'lambda-Cyhalothrin',
									'gamma-Cyhalothrin',
									'Cypermethrin',
									'alpha-Cypermethrin',
									'beta-Cypermethrin',
									'theta-Cypermethrin',
									'zeta-Cypermethrin',
									'Cyphenothrin [(1R)-trans- isomers]',
									'Deltamethrin',
									'Empenthrin [(EZ)- (1R)- isomers]',
									'Esfenvalerate',
									'Etofenprox',
									'Fenpropathrin',
									'Fenvalerate',
									'Flucythrinate',
									'Flumethrin',
									'tau-Fluvalinate',
									'Halfenprox',
									'Imiprothrin',
									'Permethrin',
									'Phenothrin [(1R)-trans- isomer]',
									'Prallethrin',
									'Pyrethrins (pyrethrum)',
									'Resmethrin',
									'Silafluofen',
									'Tefluthrin',
									'Tetramethrin',
									'Tetramethrin [(1R)- isomers]',
									'Tralomethrin',
									'Transfluthrin'
								]
							},
							{
								name:'B',
								c_class:'DDT, Methoxychlor',
								actives:[
									'DDT',
									'Methoxychlor'
								]
							}
						]
					},
					{
						name:'Nicotinic Acetylcholine receptor agonists',
						number:4,
						subgroups: [
							{
								name: 'A',
								c_class:'Neonicotinoids',
								actives:[
									'Acetamiprid',
									'Clothianidin',
									'Dinotefuran',
									'Imidacloprid',
									'Nitenpyram',
									'Thiacloprid',
									'Thiamethoxam'
								]
							},
							{
								name: 'B',
								c_class:'Nicotine',
								actives:[
									'Nicotine'
								]
							},
							{
								name: 'C',
								c_class:'Sulfoxaflor',
								actives:[
									'Sulfoxaflor'
								]
							}
						]
					},
					{
						name:'Nicotinic Acetylcholine receptor allosteric activators',
						number:5,
						subgroups: [
							{
								name: '',
								c_class:'Spinosyns',
								actives:[
									'Spinetoram',
									'Spinosad'
								]
							}
						]
					},
					{
						name:'Chloride channel activators',
						number:6,
						subgroups: [
							{
								name: '',
								c_class:'Avermectins, Milbemycins',
								actives:[
									'Abamectin',
									'Emamectin benzoate',
									'Lepimectin',
									'Milbemectin'
								]
							}
						]
					},
					{
						name:'Juvenile hormone mimics',
						number:7,
						subgroups: [
							{
								name: 'A',
								c_class:'Juvenile hormone analogues',
								actives:[
									'Hydroprene',
									'Kinoprene',
									'Methoprene'
								]
							},
							{
								name: 'B',
								c_class:'',
								actives:[
									'Fenoxycarb'
								]
							},
							{
								name: 'C',
								c_class:'',
								actives:[
									'Pyriproxyfen'
								]
							}
						]
					},
					{
						name:'Miscellaneous nonspecific (multi-site) inhibitors',
						number:8,
						subgroups: [
							{
								name: 'A',
								c_class:'Alky halides',
								actives:[
									'Methyl bromide and other alkyl halides'
								]
							},
							{
								name: 'B',
								c_class:'',
								actives:[
									'Chloropicrin'
								]
							},
							{
								name: 'C',
								c_class:'',
								actives:[
									'Sulfuryl fluoride'
								]
							},
							{
								name: 'D',
								c_class:'',
								actives:[
									'Borax'
								]
							},
							{
								name: 'E',
								c_class:'',
								actives:[
									'Tarter emetic'
								]
							}
						]
					},
					{
						name:'Selective homopteran feeding blockers',
						number:9,
						subgroups: [
							{
								name: 'B',
								c_class:'',
								actives:[
									'Pymetrozine'
								]
							},
							{
								name: 'C',
								c_class:'',
								actives:[
									'Flonicamid'
								]
							}
						]
					},
					{
						name:'Mite growth inhibitors',
						number:10,
						subgroups: [
							{
								name: 'A',
								c_class:'',
								actives:[
									'Clofentezine',
									'Diflovidazin',
									'Hexythiazox'
								]
							},
							{
								name: 'B',
								c_class:'',
								actives:[
									'Etoxazole'
								]
							}
						]
					},
					{
						name:'Microbial disruptor of insect midgut membranes',
						number:11,
						subgroups: [
							{
								name: 'A',
								c_class:'Bacillus thuringiensis and the insecticidal proteins they produce',
								actives:[
									'B.t. var. israelensis',
									'B.t. var. aizawai',
									'B.t. var. kurstaki',
									'B.t. var. tenebrionensis',
									'Bt crop proteins: Cry1Ab, Cry1Ac, Cry1Fa, Cry1A.105, Cry2Ab, Vip3A, mCry3A, Cry3Ab, Cry3Bb, Cry34Ab1/Cry35Ab1'
								]
							},
							{
								name: 'B',
								c_class:'Bacillus sphaericus',
								actives:[
									'Bacillus sphaericus'
								]
							}
						]
					},
					{
						name:'Inhibitors of mitochondrial ATP synthase',
						number:12,
						subgroups: [
							{
								name: 'A',
								c_class:'',
								actives:[
									'Diafenthiuron'
								]
							},
							{
								name: 'B',
								c_class:'Organotin miticides',
								actives:[
									'Azocyclotin',
									'Cyhexatin',
									'Fenbutatin oxide'
								]
							},
							{
								name: 'C',
								c_class:'',
								actives:[
									'Propargite'
								]
							},
							{
								name: 'D',
								c_class:'',
								actives:[
									'Tetradifon'
								]
							}
						]
					},
					{
						name:'Uncouplers of oxidative phosphorylation via disruption of proton gradient',
						number:13,
						subgroups: [
							{
								name: '',
								c_class:'',
								actives:[
									'Chlorfenapyr'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'DNOC'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Sulfuramid'
								]
							}
						]
					},
					{
						name:'Nicotinic acetylcholine receptor channel blockers',
						number:14,
						subgroups: [
							{
								name: '',
								c_class:'Nereistoxin analogues',
								actives:[
									'Bensultap',
									'Cartap hydrochloride',
									'Thiocyclam',
									'Thiosultap-sodium'
								]
							}
						]
					},
					{
						name:'Inhibitors of chitin biosynthesis, type 0',
						number:15,
						subgroups: [
							{
								name: '',
								c_class:'Benzoylureas',
								actives:[
									'Bistrifluron',
									'Chlorfluazuron',
									'Diflubenzuron',
									'Flucycloxuron',
									'Flufenoxuron',
									'Hexaflumuron',
									'Lufenuron',
									'Novaluron',
									'Noviflumuron',
									'Teflubenzuron',
									'Triflumuron'
								]
							}
						]
					},
					{
						name:'Inhibitors of chitin biosynthesis, type 1',
						number:16,
						subgroups: [
							{
								name: '',
								c_class:'',
								actives:[
									'Buprofezin'
								]
							}
						]
					},
					{
						name:'Moulting disruptor, Dipteran',
						number:17,
						subgroups: [
							{
								name: '',
								c_class:'',
								actives:[
									'Cyromazine'
								]
							}
						]
					},
					{
						name:'Ecdysone receptor agonists',
						number:18,
						subgroups: [
							{
								name: '',
								c_class:'Diacylhydrazines',
								actives:[
									'Chromafenozide',
									'Halofenozide',
									'Methoxyfenozide',
									'Tebufenozide'
								]
							}
						]
					},
					{
						name:'Octopamin receptor agonists',
						number:19,
						subgroups: [
							{
								name:'',
								actives: [
									'Amitraz'
								]
							}
						]
					},
					{
						name:'Mitochondrial complex III electron transport inhibitors',
						number:20,
						subgroups: [
							{
								name: 'A',
								c_class:'',
								actives:[
									'Hydramethylnon'
								]
							},
							{
								name: 'B',
								c_class:'',
								actives:[
									'Acequinocyl'
								]
							},
							{
								name: 'C',
								c_class:'',
								actives:[
									'Fluacrypyrim'
								]
							}
						]
					},
					{
						name:'Mitochondrial complex I electron transport inhibitors',
						number:21,
						subgroups: [
							{
								name: '',
								c_class:'METI acaricides and insecticides',
								actives:[
									'Fenazaquin',
									'Fenpyroximate',
									'Pyrimidifen',
									'Pyridaben',
									'Tebufenpyrad',
									'Tolfenpyrad'
								]
							},
							{
								name: 'B',
								c_class:'',
								actives:[
									'Rotenone (Derris)'
								]
							}
						]
					},
					{
						name:'Voltage-dependent sodium channel blockers',
						number:22,
						subgroups: [
							{
								name: 'A',
								c_class:'',
								actives:[
									'Indoxacarb'
								]
							},
							{
								name: 'B',
								c_class:'',
								actives:[
									'Metaflumizone'
								]
							}
						]
					},
					{
						name:'Inhibitors of acetyl CoA carboxylase',
						number:23,
						subgroups: [
							{
								name: 'Tetronic and Tetramic acid derivatives',
								c_class:'Tetronic and Tetramic acid derivatives',
								actives:[
									'Spirodiclofen',
									'Spiromesifen',
									'Spirotetramat'
								]
							}
						]
					},
					{
						name:'Mitochondrial complex IV electron transport inhibitors',
						number:24,
						subgroups: [
							{
								name: 'A',
								c_class:'Phosphine',
								actives:[
									'Aluminium phosphide',
									'Calcium phosphide',
									'Phosphine',
									'Zinc phosphide'
								]
							},
							{
								name: 'B',
								c_class:'',
								actives:[
									'Cyanide'
								]
							}
						]
					},
					{
						name:'Mitochondrial complex II electron transport inhibitors',
						number:25,
						subgroups: [
							{
								name: 'Beta-ketonitrile derivatives',
								c_class:'',
								actives:[
									'Cyenopyrafen',
									'Cyflumetofen'
								]
							}
						]
					},
					{
						name:'Vacant',
						number:26
					},
					{
						name:'Vacant',
						number:27
					},
					{
						name:'Ryanodine receptor modulators',
						number:28,
						subgroups: [
							{
								name: '',
								c_class:'Diamides',
								actives:[
									'Chlorantraniliprole',
									'Flubendiamide',
									'Cyantraniliprole'
								]
							}
						]
					},
					{
						name:'Compounds of unknown or uncertain mode of action',
						number:'UN',
						subgroups: [
							{
								name: '',
								c_class:'',
								actives:[
									'Azadirachtin'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Benzoximate'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Bifenazate'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Bromopropylate'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Chinomethionat'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Cryolite'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Dicofol'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Pyridalyl'
								]
							},
							{
								name: '',
								c_class:'',
								actives:[
									'Pyrifluquinazon'
								]
							}
						]
					}
				]
			};
		




			var template2 = '{{#moas}}<div data-role="collapsible" data-collapsed="true" class="outer"><h3><em>{{number}}</em>{{name}}</h3><div>{{#subgroups}}<div data-role="collapsible" data-collapsed="true" class="inner"><div class="yellowbar"></div><h3>{{#name}}<em>{{name}}</em>{{/name}}{{c_class}}</h3><div><ul>{{#actives}}<li>{{.}}</li>{{/actives}}</ul></div></div>{{/subgroups}}</div></div>{{/moas}}';
			
			var subgroups = '<div data-role="collapsible" data-collapsed="true" class="inner"><div class="yellowbar both"></div><h3><em>{{name}}</em>{{c_class}}</h3><ul>{{#actives}}<li>{{.}}</li>{{/actives}}</ul></div>';
			var noSubgroups = '<div class="yellowbar activeOnly"></div><ul>{{#actives}}<li>{{.}}</li>{{/actives}}</ul>';		
			var template3 = '{{#moas}}<div data-role="collapsible" data-collapsed="true" class="outer moa{{number}}"><h3><em>{{number}}</em>{{name}}</h3>{{#subgroups}}{{#name}}{{#c_class}}' + subgroups + '{{/c_class}}{{^c_class}}' + subgroups + '{{/c_class}}{{/name}}{{^name}}' + noSubgroups + '{{/name}}{{/subgroups}}</div>{{/moas}}';
			
			var html = Mustache.to_html(template3, moa);
			document.getElementById('moa').innerHTML = html;

			var modesTemplate   = '<option>Groups</option>{{#moas}}<option>{{number}}. {{name}}</option>{{/moas}}';
			var classesTemplate = '<option>Classes</option>{{#moas}}{{#subgroups}}{{#c_class}}<option>{{c_class}}</option>{{/c_class}}{{/subgroups}}{{/moas}}';
			var activesTemplate = '<option>Actives</option>{{#moas}}{{#subgroups}}{{#actives}}<option>{{.}}</option>{{/actives}}{{/subgroups}}{{/moas}}';

			document.getElementById('modes').innerHTML   = Mustache.to_html(modesTemplate, moa);
			document.getElementById('classes').innerHTML  = Mustache.to_html(classesTemplate, moa);
			document.getElementById('actives').innerHTML = Mustache.to_html(activesTemplate, moa);

			$('#classes, #actives').each(function (i, select) {
				var options = $(select).find('option');
				options.sort(function (a,b) {
					if (a.text == 'Classes' || a.text == 'Actives' || b.text == 'Classes' || b.text == 'Actives') return;
					if (a.text.toUpperCase() > b.text.toUpperCase()) return 1;
					else if (a.text.toUpperCase() < b.text.toUpperCase()) return -1;
					return 0;
				})
				$(select).empty().append(options);
			});
		


     window.location='./index.html';
   

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


 (document).bind( "mobileinit", function(event) {
                 $.mobile.transitionHandlers = { "default" : $.mobile.defaultTransitionHandler };
                 });
  
  $(document).bind("mobileinit", function(){
                   $.mobile.defaultTransitionHandler = function( name, reverse, $to, $from ) {
                   
                   var deferred = new $.Deferred(),
                   sequential = false,
                   reverseClass = reverse ? " reverse" : "",
                   active  = $.mobile.urlHistory.getActive(),
                   toScroll = active.lastScroll || $.mobile.defaultHomeScroll,
                   screenHeight = $.mobile.getScreenHeight(),
                   maxTransitionOverride = $.mobile.maxTransitionWidth !== false && $( window ).width() > $.mobile.maxTransitionWidth,
                   none = !$.support.cssTransitions || maxTransitionOverride || !name || name === "none",
                   toggleViewportClass = function(){
                   $.mobile.pageContainer.toggleClass( "ui-mobile-viewport-transitioning viewport-" + name );
                   },
                   scrollPage = function(){
                   // By using scrollTo instead of silentScroll, we can keep things better in order
                   // Just to be precautios, disable scrollstart listening like silentScroll would
                   $.event.special.scrollstart.enabled = false;
                   
                   window.scrollTo( 0, toScroll );
                   
                   // reenable scrollstart listening like silentScroll would
                   setTimeout(function() {
                              $.event.special.scrollstart.enabled = true;
                              }, 150 );
                   },
                   cleanFrom = function(){
                   $from
                   .removeClass( $.mobile.activePageClass + " out in reverse " + name )
                   .height( "" );
                   },
                   startOut = function(){
                   // if it's not sequential, call the doneOut transition to start the TO page animating in simultaneously
                   if( !sequential ){
                   doneOut();
                   }
                   else {
                   $from.animationComplete( doneOut );
                   }
                   
                   // Set the from page's height and start it transitioning out
                   // Note: setting an explicit height helps eliminate tiling in the transitions
                   $from
                   .height( screenHeight + $(window ).scrollTop() )
                   .addClass( name + " out" + reverseClass );
                   },
                   
                   doneOut = function() {
                   
                   if ( $from && sequential ) {
                   cleanFrom();
                   }
                   
                   startIn();
                   },
                   
                   startIn = function(){
                   $to.css("z-index", -10);
                   $to.addClass( $.mobile.activePageClass );
                   
                   // Send focus to page as it is now display: block
                   $.mobile.focusPage( $to );
                   
                   // Set to page height
                   $to.height( screenHeight + toScroll );
                   
                   scrollPage();
                   $to.css("z-index", "");
                   if( !none ){
                   $to.animationComplete( doneIn );
                   }
                   
                   $to.addClass( name + " in" + reverseClass );
                   
                   if( none ){
                   doneIn();
                   }
                   
                   },
                   
                   doneIn = function() {
                   
                   if ( !sequential ) {
                   
                   if( $from ){
                   cleanFrom();
                   }
                   }
                   
                   $to
                   .removeClass( "out in reverse " + name )
                   .height( "" );
                   
                   toggleViewportClass();
                   
                   // In some browsers (iOS5), 3D transitions block the ability to scroll to the desired location during transition
                   // This ensures we jump to that spot after the fact, if we aren't there already.
                   if( $( window ).scrollTop() !== toScroll ){
                   scrollPage();
                   }
                   
                   deferred.resolve( name, reverse, $to, $from, true );
                   };
                   
                   toggleViewportClass();
                   
                   if ( $from && !none ) {
                   startOut();
                   }
                   else {
                   doneOut();
                   }
                   
                   return deferred.promise();
                   };
                   $.extend($.mobile, {
                            defaultPageTransition: "slide",
                            loadingMessage: "Loading, Please Wait..."
                            });
                   });

jQuery(window).ready(function ($) {

	$('#toolbar').slideUp();
	$('#filtersBtn').bind('click tap', function () {$('#toolbar').slideToggle().parent().toggleClass('open');});
	$('select').change(function (e) {
		$('#toolbar').slideToggle(0).parent().toggleClass('open');
		var value = $(this).val().replace(/^(\d+\.\s)|(UN\.\s)/g, '');
		$('#moa').children().trigger('collapse');
		$('#moa>div').each(function (i, row) {
			var content = $(row).text();
			if (content.indexOf(value) != -1) {
				var internalRows = $('.inner', this);
				if (internalRows.text().indexOf(value) != -1) {
					internalRows.each(function (i, internalRow) {
						var content = $(internalRow).text()
						if (content.indexOf(value) != -1) {
							$(internalRow).trigger('expand');
						}
					});
				}
				$(row).trigger('expand');
				return false;
			}
		});
		
		$('option:selected', this).prop('selected', false);
		$(this).selectmenu('refresh');

	});
	
	$('.inner, .outer').bind('expand', function (e) {
		var height = $(e.target).find('.ui-collapsible-content').height();
		$(e.target).find('.yellowbar').height(height - 30);
	});
	
	var previouslyExpanded;
	$('.outer').bind('expand', function (e) {
		if ($($(e.target)[0]).hasClass('inner')) return;	// ignore the inner accordions
		var $expanded		= $(this);						// isolate the expanded
		var intervalId = setInterval(function() {			// after 100ms (after previously open elements have collapsed), update the scroll position if required
			if (!previouslyExpanded)	return previouslyExpanded = $expanded;

			var expandedTop		= $expanded.offset().top -82,
				$window 		= $(window)
				scrollTop		= $window.scrollTop(),
				scrollBottom 	= $window.scrollTop() + $window.height();
			if (expandedTop < scrollTop || expandedTop > scrollBottom)	$.scrollTo(expandedTop, {duration:250});
			clearInterval(intervalId);
			previouslyExpanded = $expanded;

		}, 100);
	});
	
});




var app = {

	initialize: function() {
		this.bindEvents();
	},

	// Bind Event Listeners
	// Bind any events that are required on startup. Common events are: `load`, `deviceready`, `offline`, and `online`.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},

	// deviceready Event Handler
	// The scope of `this` is the event. In order to call the `receivedEvent` function, we must explicity call `app.receivedEvent(...);`
	onDeviceReady: function() {
		app.receivedEvent('deviceready');
	},

	// Update DOM on a Received Event
	receivedEvent: function(id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');

		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');

		console.log('Received Event: ' + id);
	}
};
app.initialize();


/**
 * scrollTo Plugin
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    module.exports = factory; // CommonJS
  } else if (typeof define === "function" && define.amd) {
    define(factory); // AMD
  } else {
    root.Mustache = factory; // <script>
  }
}(this, (function () {

  var exports = {};

  exports.name = "mustache.js";
  exports.version = "0.7.2";
  exports.tags = ["{{", "}}"];

  exports.Scanner = Scanner;
  exports.Context = Context;
  exports.Writer = Writer;

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  var _test = RegExp.prototype.test;
  var _toString = Object.prototype.toString;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  function testRe(re, string) {
    return _test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRe(nonSpaceRe, string);
  }

  var isArray = Array.isArray || function (obj) {
    return _toString.call(obj) === '[object Array]';
  };

  function escapeRe(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  exports.escape = escapeHtml;

  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      this.tail = this.tail.substring(match[0].length);
      this.pos += match[0].length;
      return match[0];
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var match, pos = this.tail.search(re);

    switch (pos) {
    case -1:
      match = this.tail;
      this.pos += this.tail.length;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, pos);
      this.tail = this.tail.substring(pos);
      this.pos += pos;
    }

    return match;
  };

  function Context(view, parent) {
    this.view = view;
    this.parent = parent;
    this._cache = {};
  }

  Context.make = function (view) {
    return (view instanceof Context) ? view : new Context(view);
  };

  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  Context.prototype.lookup = function (name) {
    var value = this._cache[name];

    if (!value) {
      if (name == '.') {
        value = this.view;
      } else {
        var context = this;

        while (context) {
          if (name.indexOf('.') > 0) {
            value = context.view;
            var names = name.split('.'), i = 0;
            while (value && i < names.length) {
              value = value[names[i++]];
            }
          } else {
            value = context.view[name];
          }

          if (value != null) break;

          context = context.parent;
        }
      }

      this._cache[name] = value;
    }

    if (typeof value === 'function') value = value.call(this.view);

    return value;
  };

  function Writer() {
    this.clearCache();
  }

  Writer.prototype.clearCache = function () {
    this._cache = {};
    this._partialCache = {};
  };

  Writer.prototype.compile = function (template, tags) {
    var fn = this._cache[template];

    if (!fn) {
      var tokens = exports.parse(template, tags);
      fn = this._cache[template] = this.compileTokens(tokens, template);
    }

    return fn;
  };

  Writer.prototype.compilePartial = function (name, template, tags) {
    var fn = this.compile(template, tags);
    this._partialCache[name] = fn;
    return fn;
  };

  Writer.prototype.getPartial = function (name) {
    if (!(name in this._partialCache) && this._loadPartial) {
      this.compilePartial(name, this._loadPartial(name));
    }

    return this._partialCache[name];
  };

  Writer.prototype.compileTokens = function (tokens, template) {
    var self = this;
    return function (view, partials) {
      if (partials) {
        if (typeof partials === 'function') {
          self._loadPartial = partials;
        } else {
          for (var name in partials) {
            self.compilePartial(name, partials[name]);
          }
        }
      }

      return renderTokens(tokens, self, Context.make(view), template);
    };
  };

  Writer.prototype.render = function (template, view, partials) {
    return this.compile(template)(view, partials);
  };

  /**
   * Low-level function that renders the given `tokens` using the given `writer`
   * and `context`. The `template` string is only needed for templates that use
   * higher-order sections to extract the portion of the original template that
   * was contained in that section.
   */
  function renderTokens(tokens, writer, context, template) {
    var buffer = '';

    var token, tokenValue, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      tokenValue = token[1];

      switch (token[0]) {
      case '#':
        value = context.lookup(tokenValue);

        if (typeof value === 'object') {
          if (isArray(value)) {
            for (var j = 0, jlen = value.length; j < jlen; ++j) {
              buffer += renderTokens(token[4], writer, context.push(value[j]), template);
            }
          } else if (value) {
            buffer += renderTokens(token[4], writer, context.push(value), template);
          }
        } else if (typeof value === 'function') {
          var text = template == null ? null : template.slice(token[3], token[5]);
          value = value.call(context.view, text, function (template) {
            return writer.render(template, context);
          });
          if (value != null) buffer += value;
        } else if (value) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '^':
        value = context.lookup(tokenValue);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += renderTokens(token[4], writer, context, template);
        }

        break;
      case '>':
        value = writer.getPartial(tokenValue);
        if (typeof value === 'function') buffer += value(context);
        break;
      case '&':
        value = context.lookup(tokenValue);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(tokenValue);
        if (value != null) buffer += exports.escape(value);
        break;
      case 'text':
        buffer += tokenValue;
        break;
      }
    }

    return buffer;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var tree = [];
    var collector = tree;
    var sections = [];

    var token;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      switch (token[0]) {
      case '#':
      case '^':
        sections.push(token);
        collector.push(token);
        collector = token[4] = [];
        break;
      case '/':
        var section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : tree;
        break;
      default:
        collector.push(token);
      }
    }

    return tree;
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          lastToken = token;
          squashedTokens.push(token);
        }
      }
    }

    return squashedTokens;
  }

  function escapeTags(tags) {
    return [
      new RegExp(escapeRe(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRe(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of token objects. If
   * `tags` is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. ["<%", "%>"]). Of
   * course, the default is to use mustaches (i.e. Mustache.tags).
   */
  exports.parse = function (template, tags) {
    template = template || '';
    tags = tags || exports.tags;

    if (typeof tags === 'string') tags = tags.split(spaceRe);
    if (tags.length !== 2) throw new Error('Invalid tags: ' + tags.join(', '));

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr == '\n') stripSpace();
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRe('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) throw new Error('Unclosed tag at ' + scanner.pos);

      token = [type, value, start, scanner.pos];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        if (sections.length === 0) throw new Error('Unopened section "' + value + '" at ' + start);
        var openSection = sections.pop();
        if (openSection[1] !== value) throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tags = value.split(spaceRe);
        if (tags.length !== 2) throw new Error('Invalid tags at ' + start + ': ' + tags.join(', '));
        tagRes = escapeTags(tags);
      }
    }

    // Make sure there are no open sections when we're done.
    var openSection = sections.pop();
    if (openSection) throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

    tokens = squashTokens(tokens);

    return nestTokens(tokens);
  };

  // All Mustache.* functions use this writer.
  var _writer = new Writer();

  /**
   * Clears all cached templates and partials in the default writer.
   */
  exports.clearCache = function () {
    return _writer.clearCache();
  };

  /**
   * Compiles the given `template` to a reusable function using the default
   * writer.
   */
  exports.compile = function (template, tags) {
    return _writer.compile(template, tags);
  };

  /**
   * Compiles the partial with the given `name` and `template` to a reusable
   * function using the default writer.
   */
  exports.compilePartial = function (name, template, tags) {
    return _writer.compilePartial(name, template, tags);
  };

  /**
   * Compiles the given array of tokens (the output of a parse) to a reusable
   * function using the default writer.
   */
  exports.compileTokens = function (tokens, template) {
    return _writer.compileTokens(tokens, template);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  exports.render = function (template, view, partials) {
    return _writer.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  exports.to_html = function (template, view, partials, send) {
    var result = exports.render(template, view, partials);

    if (typeof send === "function") {
      send(result);
    } else {
      return result;
    }
  };

  return exports;

}())));

