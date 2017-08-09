




Ext.setup({
	icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
  });

LegalTerms = new Ext.Application({
    name: "LegalTerms",

    launch: function() {

       LegalTerms.mainToolbar = new Ext.Toolbar({

			title:'Legal Terms',
            items: [
							
						
							{ text: '', iconMask: true, iconCls: 'home', 
					    		handler: function(){
									
									LegalTerms.Viewport.setActiveItem('listwrapper', {type: 'slide', direction: 'right'});
									LegalTerms.mainToolbar.setTitle('Legal Terms');
								}
							},
								
							{ xtype: 'spacer' },
							
							
							{ text: '', iconMask: true, iconCls: 'star',
								handler: function(){
				
									LegalTerms.Viewport.setActiveItem('favouritespanel', {type: 'slide', direction: 'left'});
									LegalTerms.mainToolbar.setTitle('My Favourites');
								}
				
							},							
			            ]
        });
		
		
		LegalTerms.detailToolbar = new Ext.Toolbar({
            items: [{
                text: 'back',
                ui: 'back',
                handler: function() {
                    LegalTerms.Viewport.setActiveItem('listwrapper', {type: 'slide', direction: 'right'});
                }
            }]
        });
		

		LegalTerms.backToolbar = new Ext.Toolbar({
			dock: 'bottom',												   
            items: [{
                text: 'BACK',
                ui: 'back',
					handler: function() {
						LegalTerms.Viewport.setActiveItem('listwrapper', {type: 'slide', direction: 'right'});
					}
				},
				
				{ xtype: 'spacer' },

				{
				text: 'Favourite',
                ui: 'confirm-round',
				iconCls: 'add',
				iconMask: true,

                handler: 
				
				function() {
					addFavourites(rec.data.lTerm, rec.data.lDefinition);
					//LegalTerms.favouriteStore.reload();
  
                }
            }]
        });
		
		LegalTerms.favouritesbackToolbar = new Ext.Toolbar({
			dock: 'bottom',												   
            items: [{
                text: 'BACK',
                ui: 'back',
					handler: function() {
						LegalTerms.Viewport.setActiveItem('favouritespanel', {type: 'slide', direction: 'right'});
					}
				},
				
				{ xtype: 'spacer' },

				{
				text: 'Remove Favourite',
				ui: 'decline-round',

                handler: 
				
				function() {	
					deleteFavourites(rec.data.lTerm);
					//LegalTerms.favouriteStore.reload();
  
                }
            }]
        });	
		

		LegalTerms.infobackToolbar = new Ext.Toolbar({
			dock: 'bottom',												   
            items: [{
                text: 'BACK',
                ui: 'back',
					handler: function() {
						LegalTerms.Viewport.setActiveItem('listwrapper', {type: 'slide', direction: 'right'});
					}
				}
				]
        });		

        LegalTerms.detailPanel = new Ext.Panel({
            id: 'detailpanel',
            tpl: '<div class="details"><strong>{lTerm}</strong><br/>{lDefinition}',
            dockedItems: [LegalTerms.backToolbar],

        });

        LegalTerms.favouritesdetailPanel = new Ext.Panel({
            id: 'favouritesdetailpanel',
           tpl: '<div class="details"><strong>{lTerm}</strong><br/>{lDefinition}',
            dockedItems: [LegalTerms.favouritesbackToolbar],

        });
		
		
        LegalTerms.infoPanel = new Ext.Panel({
            id: 'infopanel',
            layout: 'card',
            scroll: true,
			html: '<div class="aboutus"><h2>Version 1.11</h2><p>The Paul W. Tracey Solicitors Legal Terms Android App was developed by 2bscene Limited in partnership with Paul W. Tracey Solicitors. <br /><br />Do you need an answer to a legal question? <br /><br />Call Us on <br /><br /><a href="tel:1890940140">1890940140</a><br /><br /> or visit <br /><a href="http://www.traceysolicitors.ie">www.traceysolicitors.ie</a><br /><br /><br /><br />If you would like information on iPhone & Android App Development, please visit <a href="http://www.2bscene.ie">www.2bscene.ie</a><br /><br /><br /><br /><div id="disclaimer"><h2>Disclaimer</h2>The information contained in this application is for general information purposes only. The information is provided by Paul W. Tracey Solicitors and while we endeavour to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the application or the information, products, services, or related graphics contained on the application for any purpose. Any reliance you place on such information is therefore strictly at your own risk.<br /><br />In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this application.<br /><br />Through this applicationyou are able to link to other websites which are not under the control of Paul W. Tracey Solicitors. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.<br /><br />Every effort is made to keep the application up and running smoothly. However, Paul W. Tracey takes no responsibility for, and will not be liable for, the application being temporarily unavailable due to technical issues beyond our control.</p>',
            dockedItems: [LegalTerms.infobackToolbar],

        });



        LegalTerms.favouritesPanel = new Ext.List({
            id: 'favouritespanel',
            store: LegalTerms.favouriteStore,
            itemTpl: '<div class="contact">{lTerm}</div>',
			singleSelect: true,

			listeners:{
					itemtap: function(list, index){
						rec = LegalTerms.favouriteStore.getAt(index);
						
						
						var lTerm = rec.data.lTerm;
						var lID = rec.data.lid;
						
						//alert(lTerm + " " + lID);
						
						//alert(IndexItem);
						LegalTerms.favouritesdetailPanel.update(rec.data);
						LegalTerms.Viewport.setActiveItem('favouritesdetailpanel', {type: 'slide', direction: 'left'});
						LegalTerms.mainToolbar.setTitle('My Favourites');
				}
			},

        });
		
        LegalTerms.listPanel = new Ext.List({
            id: 'indexlist',
            store: LegalTerms.ListStore,
            itemTpl: '<div class="contact">{lTerm}</div>',
			grouped: true,
			indexBar: true,
			singleSelect: true,
			listeners:{
					itemtap: function(list, index){
						rec = LegalTerms.ListStore.getAt(index);
						var lTerm = rec.data.lTerm;
						LegalTerms.detailPanel.update(rec.data);
						LegalTerms.Viewport.setActiveItem('detailpanel', {type: 'slide', direction: 'left'});
				}
			},
        });
		
		

        LegalTerms.listWrapper = new Ext.Panel({
            id: 'listwrapper',
            layout: 'fit',
            items: [LegalTerms.listPanel],
            dockedItems: [{
						  
						  xtype: 'toolbar',
						  dock: 'bottom',
						  items: [
						  
				
				{
					xtype: 'searchfield',
					dock: 'bottom',
					width: 240,
					name: 'searchfield',
					placeHolder: 'Search...',
					listeners  : {
						scope: this,
						
						keyup: function(field) {
							LegalTerms.listPanel.scroller.scrollTo({
								x: 0,
								y: 0
							});
							
							var value = field.getValue();
							
							if (!value) {
								LegalTerms.ListStore.filterBy(function() {
									return true;
								});
							} else {
								var searches = value.split(' '),
									regexps  = [],
									i;
								
								for (i = 0; i < searches.length; i++) {
									if (!searches[i]) return;
									regexps.push(new RegExp(searches[i], 'i'));
								};
								
								LegalTerms.ListStore.filterBy(function(record) {
									var matched = [];
									
									for (i = 0; i < regexps.length; i++) {
										var search = regexps[i];
										
										if (record.get('lTerm').match(search) || record.get('lTerm').match(search)) matched.push(true);
										else matched.push(false);
									};
									
									if (regexps.length > 1 && matched.indexOf(false) != -1) {
										return false;
									} else {
										return matched[0];
									}
								});
							}
						}
					}
				},	
							{ xtype: 'spacer'},
							{  ui: 'action-round', text: '', iconMask: true, iconCls: 'info', 
								handler: function() {
									LegalTerms.Viewport.setActiveItem('infopanel', {type: 'slide', direction: 'left'});
								}
							},
			],
					
			},
			]
        });

        LegalTerms.Viewport = new Ext.Panel ({
            fullscreen: true,
            layout: 'card',
			dockedItems: [LegalTerms.mainToolbar],
            items: [LegalTerms.listWrapper, LegalTerms.detailPanel, LegalTerms.favouritesPanel, LegalTerms.favouritesdetailPanel, LegalTerms.infoPanel]
        });

    }
});

function initDatabase() {
  try {
      if (!window.openDatabase) {
    	  Ext.Msg.alert('ERROR','Could not create local storage!! Please upgrade your browser.');
      } else {
          var shortName = 'FAVOURITESDB';
          var version = '1.0';
          var displayName = 'Favourites Database';
          var maxSize = 100000; //  bytes
          FAVOURITESDB = openDatabase(shortName, version, displayName, maxSize);
      	  createTables();
      //selectAll();
      }
  } catch(e) {
      return;
  }
}

function createTables(){
  FAVOURITESDB.transaction(
        function (transaction) {
          transaction.executeSql('CREATE TABLE IF NOT EXISTS favourites(id INTEGER NOT NULL PRIMARY KEY, lTerm TEXT NOT NULL, lDefinition TEXT NOT NULL);', []);
  		  //transaction.executeSql("INSERT INTO favourites(lterm, lID) VALUES ('TEST4w3', 3);", []); 
        }
    );
}

function getFavorites(){
  FAVOURITESDB.transaction(
      function (transaction) {
          transaction.executeSql('SELECT * FROM favourites;', [],  allDataSelectHandler);
      }
  );
}

function addFavourites(lTerm, lDefinition){
	var lTermText = lTerm;
	var lDefinition = lDefinition;
  
	//alert(lDefinition);
  
  	FAVOURITESDB.transaction(
    	function (transaction) {
			transaction.executeSql('SELECT * FROM favourites WHERE lTerm = ?;', [lTerm],  insertFavourite);
					
			//transaction.executeSql("INSERT INTO favourites(lTerm, lDefinition) VALUES (?, ?);", [lTermText,lDefinition]); 
			//transaction.executeSql('SELECT * FROM favourites;', [],  allDataSelectHandler);
			//transaction.executeSql("DELETE FROM favourites", [], allDataSelectHandler); 		  
			//transaction.executeSql("DROP TABLE favourites", [], allDataSelectHandler);
			//LegalTerms.favouritesPanel.doLayout();
		}
	);
	
	function insertFavourite(transaction, results){
		if (results.rows.length == 0){
			transaction.executeSql("INSERT INTO favourites(lTerm, lDefinition) VALUES (?, ?);", [lTermText,lDefinition]); 
			LegalTerms.favouriteStore.add({'lTerm':lTermText,'lDefinition':lDefinition});

			Ext.Msg.alert(lTermText, 'was added to your favourites!');
			LegalTerms.Viewport.setActiveItem('favouritespanel', {type: 'slide', direction: 'right'});
			LegalTerms.mainToolbar.setTitle('My Favourites');
			
		} else {
			Ext.Msg.alert(lTermText, 'is already in your favourites!');
			LegalTerms.Viewport.setActiveItem('favouritespanel', {type: 'slide', direction: 'right'});
			LegalTerms.mainToolbar.setTitle('My Favourites');
		}
	}

}


function deleteFavourites(lTerm){
	var lTermText = lTerm;
  
	//alert(lDefinition);
  
  	FAVOURITESDB.transaction(
    	function (transaction) {
			transaction.executeSql('DELETE FROM favourites WHERE lTerm = ?;', [lTerm]);
		}
	);

			var findItem = LegalTerms.favouriteStore.findRecord('lTerm',lTerm); 					
			LegalTerms.favouriteStore.remove(findItem);
			
			Ext.Msg.alert(lTermText, 'has been removed your favourites!');
			LegalTerms.Viewport.setActiveItem('favouritespanel', {type: 'slide', direction: 'right'});
			
}



function allDataSelectHandler(transaction, results){
 if (results.rows.length == 0){
	
	//alert('rows length = 0');
	
} else {
// Loop through the records and add them to the store
    for (var i=0; i < results.rows.length; i++){
          row = results.rows.item(i);
	        LegalTerms.favouriteStore.add({'lTerm':row['lTerm'],'lDefinition':row['lDefinition']});
	
			//alert(row['lTerm']);		
     }
  }
  

}



initDatabase();
getFavorites();


Ext.regModel('Contact', {
    fields: ['id', 'lTerm', 'lDefinition']
});

LegalTerms.ListStore = new Ext.data.Store({
    model: 'Contact',
    sorters: 'lTerm',
    getGroupString : function(record) {
        return record.get('lTerm')[0];
    },
    data: [
        { lTerm: "Ab initio",      lDefinition: '"From the start" - In Latin ' },
        { lTerm: "Acceptance",     lDefinition: "One of three requirements for a valid contract under common law (the other two being offer and consideration). A contract does not become legally binding until one party has made an offer and the other party accepts the terms of the offer." },
        { lTerm: "Accord and Satisfaction",       lDefinition: "A contract may be discharged if one party, who has complied with his part of the contract, accepts compensation from the other party instead of enforcing the contract. The accord is the agreement by which the obligation is discharged. The satisfaction is the consideration (usually money and of a lesser value) which makes the agreement operative." },
        { lTerm: "Act of God",       lDefinition: "An event arising from natural causes, without human intervention (e.g.  floods or earthquakes). Insurance policies often exclude acts of God." },
        { lTerm: "Action",       lDefinition: 'Proceedings in a civil court, another description of a "case" or "claim", a person involved in a car crash might be said to have brought an action for personal injuries.' },
        { lTerm: "Adjournment",        lDefinition: "Postponement of a hearing." },
        { lTerm: "Administrator",       lDefinition: "A person appointed to manage the property of another, where a person has died without a will. " },
        { lTerm: "Adverse possession",        lDefinition: "Possession of land, without legal title- obtained by occupant, normally after a period of 12 years" },
        { lTerm: "Affidavit",     lDefinition: "A Sworn written statement signed by a person (deponent), who swears its contents to be true to the best of their knowledge and belief. It must be witnessed by a practicing solicitor or commissioner for oaths. Affidavits of Verification are now required in cases for compensation for personal injuries. The injured person swears in the Affidavit the truthfulness of the particulars of their injuries, losses and expenses. " },
        { lTerm: "Agent",       lDefinition: "A Person with the power to contract on behalf of others, binding them as if they were signing the contract themselves. The person represented by the agent is called the principal." },
        { lTerm: "Aggravated damages",       lDefinition: "Punitive or Exceptional damages awarded by a court where a defendant's behavior towards the plaintiff or victim has been particularly humiliating, malicious or vindictive. Aggravated damages might be  awarded in addition to damages for personal injuries of a defendant alleges untruthfulness on the part of the injured person where these allegations are unfounded." },
        { lTerm: "Alternative dispute resolution (ADR)",    lDefinition: "Method by which disputes and conflicts are resolved, other than through litigation, usually by mediation or arbitration. ADR involves the appointment of a third-party, e.g. a Solicitor, to act as mediator between the two sides.  ADR is normally conducted privately." },
        { lTerm: "Appeal",      lDefinition: "Review of a court decision in a higher court." },
        { lTerm: "Appearance",  lDefinition: "An answer to a court document or a court attendance." },
        { lTerm: "Appellant",  lDefinition: "A Person who makes or files an appeal." },
        { lTerm: "Arrears",      lDefinition: "Accumulated debt which has not been paid on its due date." },
        { lTerm: "Assault",     lDefinition: "Touching - or threatened touching - of another person, without that person's consent. An action for personal injuries suffered as a result of an assault is normally brought in the Circuit or High Court." },
        { lTerm: "Assign",       lDefinition: "To give or transfer to another person. The assignor is the person giving and the person who receives is the Assignee." },
        { lTerm: "Attachment and committal",      lDefinition: "Bringing a person before a court, with a threat of imprisonment for failure to obey a court order." },
        { lTerm: "Attachment of earnings",       lDefinition: "Court order for deduction from a person’s salary at source in order to pay a debt or monies due, e.g. maintenance or a debt. " },
        { lTerm: "Attorney General",       lDefinition: "Legal adviser to the Government, appointed by the President on the advice of the governing party." },
        { lTerm: "Barrister",       lDefinition: "A Specialist in litigation and advocacy who very often presents a case in court and who receives instructions from a solicitor. A barristers may not normally deal directly with members of the public. In Ireland, we have both Junior and Senior Counsel. Junior Counsel normally presents cases in the District Court and Circuit Court and Senior Counsel normally presents cases in the High  Court. " },
        { lTerm: "Beneficiary",    lDefinition: "Person who receives a gift under a will or transfers by way of gift. " },
        { lTerm: "Breach of contract",      lDefinition: "Failure or refusal to fulfill a term of a contract.  A case can be brought for The damages, for enforcement or for cancellation of the agreement." },
        { lTerm: "Burden of proof",       lDefinition: "The standard evidence required by a court to prove something. In criminal trials, the prosecution has the burden of proving the accused guilty beyond a reasonable doubt. In civil trials it is normally on the balance of probabilities. " },
        { lTerm: "Case law",  lDefinition: "Court decisions which establish legal precedents, binding lower courts." },
        { lTerm: "Caveat",      lDefinition: "The Latin of \"Beware\". <br><br>Caveat emptor (Let the buyer beware) is a warning to buyers to check for themselves things which they intend to buy, so they cannot later hold the vendor responsible for the faulty condition of the item." },
        { lTerm: "Central Criminal Court",     lDefinition: "The High Court dedicated to dealing with serious criminal offences, such as rape and murder." },
        { lTerm: "Chambers",       lDefinition: "Judge's private rooms, where he may hear matters in private." },
        { lTerm: "Charge",      lDefinition: "Another name for a mortgage." },		
        { lTerm: "Chattels",       lDefinition: "Moveable items of property, not Land.  " },
        { lTerm: "Circuit Court",       lDefinition: "The Court between the District Court and below the High Court, with power to award damages from €6,380.00 to €38,096 including costs." },
        { lTerm: "Circuit Judge",    lDefinition: "A Judge of the Circuit Court, addressed as \"My Lord\"" },
        { lTerm: "Claim",      lDefinition: "Another name for a case, normally a claim for compensation of personal injuries. " },
        { lTerm: "Class action",       lDefinition: "Legal action is taken by a number of persons where the facts and the defendants are similar.  Examples would be “hip replacement” cases." },
        { lTerm: "Codicil",  lDefinition: "A Written amendment or addition to an existing will." },
        { lTerm: "Collateral",      lDefinition: "Property pledged to guarantee a loan." },
        { lTerm: "Company",     lDefinition: "A Legal entity which allows a number of shareholders to create an organization to pursue set objectives. It gives shareholders a right to conduct business without any personal liability." },
        { lTerm: "Consideration",       lDefinition: "Consideration has been defined as \"some right, interest, profit or benefit accruing to the one party, or some forbearance, detriment, loss or responsibility given, suffered or undertaken by the other\". Under common law, any binding contract must have some consideration, no matter how small." },
        { lTerm: "Contract",      lDefinition: "Agreement between two or more persons which obliges each party to do (or refrain from doing) a certain thing. A valid contract requires three things, an offer, acceptance of that offer and consideration." },
        { lTerm: "Contract law",       lDefinition: "Contract law is the basis of all commercial dealings. The terms of a contract may be express or implied. Some illegal or unfair contract terms are now excluded by legislation, and, in areas such as employment and the sale of goods, the law imports a wide range of implied terms into new and existing contracts." },
        { lTerm: "Contributory negligence",       lDefinition: "Negligence which contributes to an accident. In the case of a car crash, for example, a passenger not wearing a seat belt may be found guilty of contributory negligence. A person seeking compensation in a personal injury might be found particularly irresponsible if they were part to blame and a court might reduce their compensation as a result of their contributory negligence. " },
        { lTerm: "Conveyance",    lDefinition: "The phrase which covers the sale or a purchase of a property.  Written documents transferring property from one person to another are usually drafted by solicitors." },
        { lTerm: "Costs",      lDefinition: "The legal expenses of an action, such as solicitor’s fees, witness expenses and other fees paid out in bringing the matter to court. Primary responsibility for costs rests with the solicitor’s client." },
        { lTerm: "Counsel",       lDefinition: "Another name for a barrister." },
        { lTerm: "Counterclaim",  lDefinition: "A Defendant's claim against a plaintiff dealt with within the same case." },
        { lTerm: "Covenant",      lDefinition: "Written document in which persons either commit themselves to do (or not to do) something, or in which they agree on a certain set of facts." },
        { lTerm: "Creditor",     lDefinition: "Person to whom money is owed by a debtor." },
        { lTerm: "Crime",       lDefinition: "Commission of an Act forbidden by criminal law. " },
        { lTerm: "Cross-examination",      lDefinition: "In a trial, each side calls its own witnesses and may also question the other side's witnesses under oath. Cross-examination involves questioning the other side's witnesses. " },
        { lTerm: "Damages",       lDefinition: "Financial compensation ordered by a court to compensate for losses or suffering to a person. Damages are typically awarded in claims for personal injuries and may include a claim for pain and suffering into the future, loss of earnings and medical bills. " },
        { lTerm: "Deed",       lDefinition: "Written and signed document which sets out the agreement of the parties in relation to its contents. " },
        { lTerm: "Defence",    lDefinition: "A Response to a claim by plaintiff normally filed in Court in a claim for personal injuries setting out the ground of defence. " },
        { lTerm: "Defendant",      lDefinition: "Person, company or organization which is being sued in an action taken by a plaintiff." },
        { lTerm: "Deponent",       lDefinition: "A Person who swears an affidavit or deposition." },
        { lTerm: "Director of Public Prosecutions (The DPP) ",  lDefinition: "A Legal official who decides whether to prosecute in criminal cases and in whose name all criminal prosecutions in Ireland are taken." },
        { lTerm: "Discovery",      lDefinition: "Sworn disclosure of documents and records. Certain types of document which are \"privileged\" need not be discovered, but they must be identified to the other side." },
        { lTerm: "District Court",     lDefinition: "A court in the Irish judicial system, with power to award damages up to €6,350 in civil cases. The court does not deal with criminal and family matters." },
        { lTerm: "District Judge",       lDefinition: "Judge of the District Court, addressed simply as \"Judge\"" },
        { lTerm: "Dividend",      lDefinition: "A distribution of profits of a company in the form of a money payment to shareholders." },
        { lTerm: "Domicile",       lDefinition: "A person's fixed and permanent residence." },
        { lTerm: "Donor",       lDefinition: "A person who gives or gifts property." },
        { lTerm: "Duces tecum",    lDefinition: "A Type of subpoena which requires a person to appear before a court with specified documents or other evidence, Duces Tecum is the Latin for \"bring with you\"" },
        { lTerm: "Duress",      lDefinition: "Threats or force preventing - or forcing - a person to act other than in accordance with free will. Duress can invalidate a marriage." },
        { lTerm: "Easement",       lDefinition: "A right over land or waterway." },
        { lTerm: "Endorsement",  lDefinition: "Writing on a document, normally a signature." },
        { lTerm: "Estoppel",      lDefinition: "Rule of evidence which prevents a person from relying on facts he has led another person to act to his detriment on those facts. " },
        { lTerm: "Evidence",     lDefinition: "Sworn Testimony of witnesses at a trial. Evidence in Irish Courts is given under Oath, swearing in the box or making a solemn declaration." },
        { lTerm: "Executor",       lDefinition: "Person appointed by a testator (a person making a Will) to administer will. The executor is a personal representative chosen to the put the terms of a will into effect. " },
        { lTerm: "Exhibit",      lDefinition: "Document or object presented as evidence in a trial." },
        { lTerm: "Foreclosure",       lDefinition: "Forfeiture of a right of redemption on a property (generally when someone fails to pay a mortgage). Even if there has been no payment, the borrower normally retains an equitable right of redemption if he can raise the money to exercise the right. To clear the title of this potential right, a lender can apply to court for a date to be set, by which the entire amount becomes payable. If payment is not made, the property belongs entirely to the lender, who is then free to go into possession or to sell it." },
        { lTerm: "Fraud ",       lDefinition: "Dishonest conduct. " },
        { lTerm: "Freehold",    lDefinition: "Right to the full use of real property for ever (as opposed to leaseholds or tenancies, which allow possession only for a limited time). Examples of freehold include fee simple, fee tail and life estate. " },
        { lTerm: "Garnishee",      lDefinition: "A debt which is attached by court order for the benefit of a judgment creditor." },
        { lTerm: "Gross negligence",       lDefinition: "Act or omission in reckless disregard of the consequences for the safety or property of another; more than simple carelessness or neglect. " },
        { lTerm: "Guarantor",  lDefinition: "Person who promises security for another person’s contract." },
        { lTerm: "High Court",      lDefinition: "The Court above the Circuit Court with full jurisdiction to decide all matters of law and fact. High Court judges sit throughout the country and in Dublin at regular intervals." },
        { lTerm: "Injunction",     lDefinition: "An emergency Court order that forbids a party to do something or compels him to do something." },
        { lTerm: "Insolvent",       lDefinition: "A Person who is unable to pay his debts as they become due. " },
        { lTerm: "Interlocutory injunction",      lDefinition: "An injunction which lasts only until the end of a court hearing during which the order was sought, when it may be replaced by a permanent injunction." },		
        { lTerm: "Intestate",       lDefinition: "Person who dies without having made a will. " },
        { lTerm: "Joint and several liabilities",    lDefinition: "Liability of more than one person, under which each may be sued for in a case of damages due by all. The liability to pay may arise by agreement or may be imposed by law. It can also occur where a number of people are sued for causing a personal injury, e.g., three car collision. " },
        { lTerm: "Joint tenancy",      lDefinition: "Ownership of property by two or more people with a right of survivorship. If one owner dies, his share passes to the surviving owners so that, eventually, the entire property is held by one person. Married couples and trustees are frequently joint tenants. (Contrast with tenancy-in-common.)" },
        { lTerm: "Judicial review",       lDefinition: "Proceedings in which a court is asked to rule on a decision of an administrative body. Judicial review is not usually limited to errors in law but may be based on alleged errors on findings of fact or unfair procedures. " },
        { lTerm: "Junior counsel",  lDefinition: "A junior Barrister is one who has not \"taken silk\" or been called to the Inner Bar. Barristers in Ireland are called Junior and Senior Counsel. " },
        { lTerm: "Jurisdiction",      lDefinition: "Power of a judge or court to act, limited by a defined territory (the jurisdiction of the District Court is restricted to offences committed in that district), by the type of case (the jurisdiction of a criminal court is limited to criminal cases) or to certain persons (a court martial only has jurisdiction over military personnel)." },
        { lTerm: "Landlord",     lDefinition: "Owner of a building or land who leases the land, building or part thereof, to another person, who is called the tenant or lessee." },
        { lTerm: "Lease",       lDefinition: "Contract between a property owner and another person for temporary use of property, in exchange for rent." },
        { lTerm: "Legal Aid",      lDefinition: "Government scheme providing legal advice or assistance. In Ireland, normally limited to family law and criminal defence cases. " },		
        { lTerm: "Legal professional privilege",       lDefinition: "Confidential communications between a lawyer and client may not be revealed in court unless the client, expressly or impliedly, waives the privilege. The communications must relate to court proceedings or intended litigation." },
        { lTerm: "Liability",    lDefinition: "Any legal obligation or duty, now or in the future. Liability is often used to determine who is to “blame” in an accident case. A person found responsible for an accident or personal injury is described as being “found liable” or responsible for causing the personal injury. " },
        { lTerm: "Licence",       lDefinition: "Permission to do something which might otherwise be illegal or infringe someone else’s rights. " },
        { lTerm: "Lien",  lDefinition: "Right over property. It may involve the right to obtain or hold the object until the debt is paid.  " },
        { lTerm: "Life estate",      lDefinition: "Right of a tenant to use land during his lifetime." },
        { lTerm: "Life tenant",     lDefinition: "Beneficiary of a life estate." },
        { lTerm: "Limitation of actions",       lDefinition: "The Statute of Limitations sets down times within which proceedings must be brought. If no action is taken within the prescribed time limits, any future action is said to be statute-barred. In personal injury cases, the limit is two years minus a day from the date of incident. Special exemptions exist in a variety of cases. In a fatal injury case, the two years from the date of the death. In a claim involving breach of a simple contract (not under seal), the limit is six years. With personal injury arising from breach of contract, its three years (or three years from the date of death). With personal injury arising from breach of contract, its three years (or three years from the date of death). With a specialty contract (under seal), the period is 12 years as it is for actions involving land. The maximum period for recovery of arrears of tax or rent is six years. " },
        { lTerm: "Liquidation",      lDefinition: "Sale of all the assets of a company or partnership by a liquidator and use of the proceeds to pay off creditors. Any money left over is distributed among shareholders or partners according to their interests or rights." },		
        { lTerm: "Lis pendens",       lDefinition: "(Latin - pending action) Registration of a pending action against the owner of land. " },
        { lTerm: "Locus standi",    lDefinition: "(Latin - place of standing) Person's right to take an action or be heard by a court." },
        { lTerm: "Mediation",       lDefinition: "Form of alternative dispute resolution involving an agreed mediator acting as a facilitator to help the parties negotiate an agreement. The mediator does not adjudicate on the issues or force a compromise; only the parties involved can resolve the dispute." },
        { lTerm: "Mortgage",  lDefinition: "An interest given on land, in writing, to guarantee the payment of a debt, most commonly seen in house purchases on foot of bank loans.  The person lending the money and receiving the mortgage is called the mortgagee; the person who concedes a mortgage as security upon his property is called a mortgagor." },
        { lTerm: "Negligence",      lDefinition: "Negligence can also be described as carelessness or lack of attention. A person who owes a duty of care to someone else and breaches it by lack of reasonable care may be liable in damages for negligence. The negligence may involve an act or a failure to act. If no damage results, there can be no action. " },
        { lTerm: "Next of kin",     lDefinition: "Person's nearest blood relation. The persons most closely related to a dead person and therefore due to inherit his property if there is no will." },
        { lTerm: "Next Friend ",       lDefinition: "A person who acts for a person where the injured person or plaintiff is under 18 or is unable to act on their own behalf." },
        { lTerm: "No win No fee ",      lDefinition: "An arrangement where a solicitor undertakes s case on the basis that no fee will be charged unless the case is successful." },		
        { lTerm: "Nuisance",       lDefinition: "Substantial unlawful use of one's property or interference with another's property to the extent of unreasonable annoyance or inconvenience to a neighbour or to the public. Nuisances may involve smells, noise, smoke, dust, fumes, obstruction or a wide range of other activities or inactivity." },
        { lTerm: "Order",    lDefinition: "A written direction by a judge or a written record of a court decision. " },
        { lTerm: "Out-of-court settlement",       lDefinition: "Agreement to settle a case before a court has heard the matter or given its decision. Many personal injuries cases settle before reaching court." },
        { lTerm: "Partition",  lDefinition: "Division of jointly-owned land or property between the owners." },
        { lTerm: "Partnership",      lDefinition: "Two or more persons carrying on a business together. Partners are each fully liable for the profits and debt of the partnership. " },
        { lTerm: "Perjury",     lDefinition: "Deliberate lie under oath or in a sworn affidavit." },
        { lTerm: "Personal Injury ",       lDefinition: "The words used to describe a physical injury a person might sustain as a result an accident at work, a car accident or an accident in a public place. " },
        { lTerm: "Personal representative",      lDefinition: "Person who administers the estate of a deceased person. Where a person dies without a will, the court appoints an administrator. A personal representative named in a will is called an executor." },		
        { lTerm: "Plaintiff",       lDefinition: "Person who brings a case to court. The person being sued is generally called the defendant." },
        { lTerm: "Pleadings",    lDefinition: "The paperwork in a case setting out the case, the defence and legal arguments supporting the position.  Pleadings set out the grounds of a claim or case, e.g. the type of injuries or less. " },		
        { lTerm: "PIAB",       lDefinition: "The abbreviation for the Personal Injuries Assessment Board. The board was set up in 2003. Most applications to PIAB are made by Solicitors. A PIAB authorisation is necessary to bring court proceedings. PIAB is also known as the Injuries Board. " },
        { lTerm: "Power of attorney",  lDefinition: "Document under seal which gives a person the right to make binding decisions for another, as an agent. A power of attorney may be specific to a certain kind of decision or signed documentation." },
        { lTerm: "Precedent",      lDefinition: "Court judgment which is referred to as an authority in a later case involving similar facts. " },
        { lTerm: "Privilege",     lDefinition: "Special legal right such as a benefit, exemption, power or immunity." },
        { lTerm: "Pro Bono ",       lDefinition: "The phrase used to describe cases “taken” on by solicitors and barristers without guarantee on payment. “Pro Bono” (Latin) in the good of. " },
        { lTerm: "Probate ",      lDefinition: "That part of the law which regulates wills and other subjects related to the distribution of a deceased person's estate." },		
        { lTerm: "Property",       lDefinition: "The most common classifications of property are between real or immovable property." },
        { lTerm: "Punitive damages",    lDefinition: "Special, exceptional damages ordered by a court where an act or omission was of a particularly serious, extensive or malicious nature. " },	
        { lTerm: "Quantum",       lDefinition: "Latin - amount or extent. Often used to describe the level or amount of compensation awarded in a personal injury action. " },
        { lTerm: "Real property",  lDefinition: "Immovable property such as land and buildings." },
        { lTerm: "Redemption",      lDefinition: "Repayment of a mortgage. " },
        { lTerm: "Redress",     lDefinition: "Another word for compensation. Most commonly known as in the Residential Institutions Redress Board scheme. The scheme was changed to compensate victims of institutional abuse in Ireland. For further information see <a href=\"http://www.irish-survivors.com\">www.irish-survivors.com</a>" },
        { lTerm: "Rent",       lDefinition: "Money or other consideration paid by a tenant to a landlord in exchange for the occupation of land.  possession and use of land, buildings or part of a building. Under normal circumstances, rent is paid at regular agreed intervals." },
        { lTerm: "Rescission",      lDefinition: "Cancellation of a contract. " },		
        { lTerm: "Senior counsel",       lDefinition: "Barrister who has \"taken silk\" or been called to the Inner Bar." },
        { lTerm: "Settlement",    lDefinition: "Agreed compromise of proceedings. " },	
        { lTerm: "Subpoena ",       lDefinition: "An order to attend court and give evidence. " },
        { lTerm: "Strict liability",  lDefinition: "Liability in tort without need to prove wrongful intent, negligence or fault." },
        { lTerm: "Successor",      lDefinition: "Person who takes over the rights or property of another." },
        { lTerm: "Summons",     lDefinition: "Written command to a person to appear in court." },
        { lTerm: "Supreme Court",       lDefinition: "Final court of appeal in Ireland, headed by the Chief Justice. Most appeals are on matters of law or procedure. The Supreme Court will not normally reverse a finding of fact by a lower court, unless the decision was so perverse that no ordinary person could have come to such a finding on the facts presented." },
        { lTerm: "Surety",      lDefinition: "Person who has pledged himself to ensure that another person fulfills an obligation - such as appearing in court or paying back a loan. " },		
        { lTerm: "Tenant",       lDefinition: "Person to whom a landlord grants use of land or a building, usually in exchange for rent. " },
        { lTerm: "Tenancy in common",    lDefinition: "Tenants-in-common share property rights, but may hold different parts of a piece of land, or unequal shares. On the death of either of them, that person's share does not pass automatically to the surviving tenant but becomes part of the deceased's estate." },	
        { lTerm: "Testator",      lDefinition: "Person who dies after making a valid will. " },		
        { lTerm: "Tort",       lDefinition: "A breach of duty which allows the injured person to claim compensation (or damages) from the tort feasor. Torts include wrongs such as negligence, nuisance, defamation, false imprisonment and trespass." },
        { lTerm: "Trespass",    lDefinition: "Unlawful interference with another person or his property or rights. " },	
        { lTerm: "Trust",       lDefinition: "Property given by a donor or settlor to a trustee, for the benefit of another person (the beneficiary or donee). A trustee manages and administers the property." },
        { lTerm: "Trustee",      lDefinition: "Person who holds property rights for the benefit of another through the legal mechanism of the trust." },		
        { lTerm: "Waiver",       lDefinition: "The giving up or renunciation of a right or benefit. Waivers are not always in writing. Sometimes actions can be interpreted as a waiver." },
        { lTerm: "Will",    lDefinition: "A document which sets out how a person wishes their assets (possessions) to be dealt with after their death. " },	
	
    ]
});



var favourites = [];


Ext.regModel('FAVOURITES', {
    fields: [
        {name: 'lTerm',      type: 'string'},
        {name: 'lDefinition', type: 'string'}
    ]
});

LegalTerms.favouriteStore = new Ext.data.Store({
	model  : 'FAVOURITES',
    sorters: 'lTerm',
	storeId: 'favouriteStore',
	data: favourites
});



