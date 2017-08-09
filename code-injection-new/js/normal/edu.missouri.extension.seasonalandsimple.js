
//dc.settings.simulator = 'iphone';
dc.settings.phonegap = true;










































	
		var start = function()
		{
			new dc.EventTracker('ready', new dc.Tracker(onReady));
		}
		var onReady = function()
		{
			dc.ui.init();
			dc.start('app/Main.js','Main');
		}
	

// Copyright 2012 Dale Musser

function Main()
{
	this.settings =
	{
		version: '1.4',
		sasBarHeight: 25,
		tabBarHeight: 55,
		navBarHeight: 42,
		infoBarHeight: 28,
		db:
		{
			params: {name:'Seasonal', version:'1.0', title:'Seaonal and simple', size:1000000}
		},
		tabs:
		{
			num: 5,
			image:
			{
				path: 'app/images/ui/icons/',
				ext: '.png',
				width: 25,
				height: 25
			},
			fontSize: 10
		},
		startup:
		{
			image:
			{
				path: 'app/modules/Startup/images/'
			}
		},
		produce:
		{
			data:
			{
				src: 'app/data/produce.js'
			},
			thumb:
			{
				path: 'app/modules/Produce/images/thumbs/',
				ext: '.jpg',
				width: 55,
				height: 40
			},
			image:
			{
				path: 'app/modules/Produce/images/fulls/',
				ext: '.jpg',
				width: 167,
				height: 121	
			}
		},
		recipes:
		{
			data:
			{
				src: 'app/data/recipes.js'
			},
			thumb:
			{
				path: 'app/modules/Recipes/images/thumbs/',
				ext: '.jpg',
				width: 55,
				height: 40
			},
			image:
			{
				path: 'app/modules/Recipes/images/fulls/',
				ext: '.jpg',
				width: 228,
				height: 177
			}
		},
		markets:
		{
			data:
			{
				src: 'app/data/markets.js'
			}
		},
		inSeason:
		{
			content:
			{
				path: 'app/modules/InSeason/inseasonHtml.js'
			}
		},
		about:
		{
			content:
			{
				path: 'app/modules/About/aboutInfoHtml.js'
			}
		}
	}
	
	this.currentSection = null;
	this.dataManagers = {};

	this.startup = new Startup(this, new dc.Tracker(this.start, this));
	this.startup.begin();
}

Main.prototype.start = function()
{	
	this.currentSection = this.startup;
	
	this.sasBar = new dc.ui.InfoBar(
	{
		anchor:{top: 0, left: 0},
		widthDelta: 0,
		height: this.settings.sasBarHeight,
		backgroundColor: '#90a141',
		fontColor: '#003000',
		fontSize: 16
	});
	this.sasBar.getContent().css('letter-spacing', '1px');
	this.sasBar.setInfo('Seasonal and simple');
	dc.ui.display.append(this.sasBar);
	
	this.tabBar = new dc.ui.TabBar();
	this.tabBar.setHeight(this.settings.tabBarHeight);
	dc.ui.display.append(this.tabBar);
	this.tabBar.build(this.settings.tabs.num, new dc.Provider(this.itemProvider,this));
	this.tabBar.deselectAllItems();
}

Main.prototype.itemProvider = function(num)
{
	var image = '';
	var label = '';
	var section = null;

	switch(num)
	{
		case 0:
			image = 'Strawberry25x25';
			label = 'Produce';
			section = this.produce;
			break;
		case 1:
			image = 'RecipeBook25x25';
			label = 'Recipes';
			section = this.recipes;
			break;
		case 2:
			image = 'MagnifyingGlass25x25';
			label = 'Find It';
			section = this.markets;
			break;
		case 3:
			image = 'Flower25x25';
			label = 'In Season';
			section = this.inSeason;
			break;
		case 4:
			image = 'Info25x25';
			label = 'About';
			section = this.about;
			break;
	}

	var tabSettings = this.settings.tabs;
	var tabBarItem = new dc.ui.TabBarItem(
	{
		type: 'icon-text',
		label: label,
		image: tabSettings.image.path + image + tabSettings.image.ext,
		iconWidth: tabSettings.image.width,
		iconHeight: tabSettings.image.height,
		labelSize: tabSettings.fontSize,
		tracker: new dc.Tracker(this.handleTabItemClick, this, section)	
	});

	return(tabBarItem);
}

Main.prototype.handleTabItemClick = function(tabBarItem, section)
{
	if (!section || section == this.currentSection) return;
	
	this.currentSection.hide();
	this.currentSection = section;
	this.currentSection.show();
}


dc.registerData('markets', [{"county":"Adair","city":"Kirksville","name":"Kirksville Kiwanis Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7:00 a.m. - Noon May 4 - October 26","contact":"Ben and Brad Beard","mail":"120 East Washington Kirksville, MO 63501","email1":"","email2":"","web":"","phone1":"660-665-1928","phone1_note":"","phone2":"","phone2_note":"","directions":"At the downtown courthouse square on the north parking lot","other":""},{"county":"Atchison","city":"Tarkio","name":"Tarkio Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Fridays, 7:30 a.m. - 10:00 a.m. June 7 - October 25","contact":"Wendell L. Johnson","mail":"13321 V Avenue Westboro, MO 64498","email1":"wjohnson@hearltland.net","email2":"","web":"","phone1":"660-984-5518","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at the corner of Fourth and Main, Streets, across from the Red Door.","other":""},{"county":"Audrain","city":"Mexico","name":"Mexico Area Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:00 a.m. - 11:00 a.m., May - October, Wednesdays 4:00 p.m. - 6:00 p.m., Mid-July - August","contact":"Sue Caine","mail":"100 West Jackson, Mexico, MO 65265","email1":"scaine@mexico-chamber.org","email2":"","web":"http:\/\/www.mexico-chamber.org","phone1":"800-581-2765","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in Hardin Park. Take Business 54 South, which becomes Clark Street. Stay on Business 54\/Clark Street; go two blocks past the intersection of Clark and Boulevard.","other":""},{"county":"Barry","city":"Cassville","name":"Garden Sass Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Tuesday 7:00 a.m. - 11:00 a.m. or Friday 7:00 a.m. - 11:00 a.m. & 3:00 p.m. - 7:00 p.m., May to first frost","contact":"John Potter","mail":"P.O. Box 127, Wheaton, MO 64874","email1":"gardensass@potterfarm.com","email2":"","web":"http:\/\/www.gardensass.9f.com\/index.html","phone1":"417-489-6971","phone1_note":"","phone2":"","phone2_note":"","directions":"Mineral Springs Rd, pavillion behind old ball parks in Cassville, MO.","other":""},{"county":"Barry","city":"Purdy","name":"Monett Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7:00 a.m. - Noon, May - October","contact":"May Xee Xiong","mail":"7758 FR 2112, Purdy, MO 65734","email1":"mycwiong@gmail.com","email2":"","web":"","phone1":"417-342-0812","phone1_note":"","phone2":"","phone2_note":"","directions":"Front and Fourth Streets Downtown.","other":""},{"county":"Barton","city":"Lamar","name":"Tenth St. Community Farmers' Market","startMonth":"4","endMonth":"11","openDays":"Wednesdays 3:00 p.m. - 6:00 p.m., Saturdays 8:00 a.m. - 1:00 p.m., Mid-April - Late November","contact":"Janet Dermott","mail":"801 East 12th Street, Lamar, MO, 64759","email1":"","email2":"","web":"","phone1":"417-682-3579","phone1_note":"","phone2":"","phone2_note":"","directions":"Moore Pavillion at corner of 10th and Poplar in Downtown Lamar just off the square.","other":""},{"county":"Benton","city":"Warsaw","name":"Warsaw Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7:00 a.m. - 12:00 p.m., May 16 - October","contact":"Connie Mefford with the Benton County MU Extension Center","mail":"1551 Commercial St., Warsaw, MO 65355","email1":"MeffordC@missouri.edu","email2":"","web":"http:\/\/www.extension.missouri.edu\/benton","phone1":"660-438-5012","phone1_note":"","phone2":"","phone2_note":"","directions":"Orschlen parking lot in Warsaw Missouri","other":""},{"county":"Bollinger","city":"Marble Hill","name":"Bollinger County Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Saturdays 8:00 a.m. - Noon, April 27 - October 26","contact":"Barb Bailey","mail":"Rt 4 Box 2925, Marble Hill, MO, 63764","email1":"kntgbarb@macdialup.com","email2":"","web":"","phone1":"573-238-2143","phone1_note":"","phone2":"","phone2_note":"","directions":"In the Bollinger County behind the Co-op Feed Store in the parking lot on Highway 34, east of Marble Hill.","other":""},{"county":"Boone","city":"Ashland","name":"Coyote Market Farm & Home","startMonth":"4","endMonth":"10","openDays":"Thursdays 4:00 - 7:00 p.m., April - Mid-October","contact":"Zach Rippeto","mail":"13301 South Bob Weach Rd, Ashland, MO, 65010","email1":"zrippeto@earthlink.net","email2":"","web":"http:\/\/www.coyotefarmersmarket.com","phone1":"573-489-0928","phone1_note":"","phone2":"","phone2_note":"","directions":"Maple and Johnson Streets","other":""},{"county":"Boone","city":"Columbia","name":"Boone County Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesdays 4:00 p.m. - 6:00 p.m., Saturdays 8:00 a.m. - Noon, Saturdays April - October, Wednesdays June - September","contact":"Kevin Mertz, Treasurer","mail":" 6789 E Palmer Rd, Columbia, MO, 65202","email1":"boonecou@boonecountyfarmers.com","email2":"","web":"http:\/\/www.boonecountyfarmers.com","phone1":"573-474-0405","phone1_note":"","phone2":"","phone2_note":"","directions":"Wednesday markets are located at the Parkade Plaza on Business Loop 70.  Saturday markets are located in the Sanford-Kimpton Health Department Building parking lot at 1005 West Worley Street. From Business Loop 70, go south on West Blvd to Worley. From Stadium Blvd, go east on Worley; from Providence Road go west on Worley.","other":""},{"county":"Boone","city":"Columbia","name":"Columbia Farmers' Market","startMonth":"","endMonth":"","openDays":"See website for hours as it may vary ","contact":"Caroline Todd, Market Manager","mail":"P.O. Box 10012, Columbia, MO, 65202","email1":"columbia.farmers.market@yahoo.com","email2":"","web":"http:\/\/www.columbiafarmersmarket.org","phone1":"573-823-6889","phone1_note":"","phone2":"","phone2_note":"","directions":"See website for location as it may vary","other":"Missouri's Market of the Year - 2004, The Saturday Morning Place to Be!"},{"county":"Boone","city":"Columbia","name":"Columbia - Winter Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Saturdays 9a.m. - noon","contact":"Caroline Todd, Market Manager","mail":"P.O. Box 10012, Columbia, MO, 65205","email1":"columbia.farmers.market@yahoo.com","email2":"","web":"http:\/\/www.columbiafarmersmarket.org","phone1":"573-823-6889","phone1_note":"","phone2":"","phone2_note":"","directions":"Held indoors at Rockbridge Christian Church at 301 W Green Meadows. Access via Green Meadows west of Providence Blvd.","other":""},{"county":"Boone","city":"Columbia","name":"Columbia - South Farmers Market","startMonth":"","endMonth":"","openDays":"See website for hours as it may vary ","contact":"Caroline Todd, Market Manager","mail":"P.O. Box 10012, Columbia, MO, 65205","email1":"columbia.farmers.market@yahoo.com","email2":"","web":"http:\/\/www.columbiafarmersmarket.org","phone1":"573-823-6889","phone1_note":"","phone2":"","phone2_note":"","directions":"Held in the parking lot of Forum Chistian Church at the intersections of Forum Blvd and Nifong Blvd. Parking access from Forum north of Nifong; bicycle racks unavailable; no Columbia Transit service.","other":""},{"county":"Boone","city":"Hallsville","name":"Hallsville Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Tuesdays 4:00 p.m. - 6:00 p.m., Saturdays 2:00 p.m. - 6:00 p.m., May 2nd - October 10th","contact":"Christa Smith or Brian Rickard","mail":"P.O. Box 284, Hallsville, MO 65255","email1":"smithchrista@umsystem.edu","email2":"celtic_wyndes_farm@yahoo.com","web":"","phone1":"573-881-6205 ","phone1_note":"","phone2":"573-289-5908","phone2_note":"","directions":"At 4-way stop on Route B, turn west and less than 100 feet from the intersection look for the market on the parking lot on the north side of Hwy 124 next to Sassafras Moon World Gifts. Additional parking available at City Hall on south side of Hwy 124.","other":""},{"county":"Buchanan","city":"St. Joseph","name":"Pony Express Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesdays and Saturdays, 7:00 a.m. - 1:00 p.m. or sell out, rain or shine. Thursdays 3:00 p.m. to 8:00 p.m. or sell out at Hearland Growth Facility Parking Lot E. April - October* Contact market for winter hours.","contact":"Harold Peek","mail":"St. Joseph, MO","email1":"hdpeek@centurytel.net","email2":"","web":"http:\/\/www.ponyexpressfarmersmarket.com","phone1":"816-662-4190","phone1_note":"","phone2":"","phone2_note":"","directions":"From I-29 Exit 47 onto Frederick Ave. turn right into parking lot of East Ridge Village Shopping Center.","other":""},{"county":"Butler","city":"Poplar Bluff","name":"Butler County Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Tuesdays 1p.m. - 7p.m. Saturdays 8a.m. - 2p.m. or until sold out, May - October","contact":"Carol Childress","mail":"3257 S. Westwood Blvd., Poplar Bluff, MO 63901","email1":"","email2":"","web":"http:\/\/www.sustainablecommunitiesozarks.org","phone1":"573-712-5728","phone1_note":"","phone2":"","phone2_note":"","directions":"Marble Rd. in Poplar Bluff","other":""},{"county":"Caldwell","city":"Hamilton","name":"Caldwell County Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:00 a.m. - Noon, May - October","contact":"Betty Motsinger","mail":"3629 Northeast State Route U, Hamilton, MO, 64644","email1":"motsing@cameron.net","email2":"","web":"","phone1":"816-583-4898","phone1_note":"","phone2":"","phone2_note":"","directions":"At the intersections of Highways 13 and 36, travel north on Highway 13 to downtown Hamilton. Market is one block north of the four-way stop on east side of street, across from J.C. Penney home.","other":""},{"county":"Callaway","city":"Fulton","name":"Fulton Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesdays 3:30 p.m. - 6:00 p.m., Saturdays 9:00 a.m. - Noon, May - October","contact":"Charles Bland","mail":"1203 Bradley, Fulton, MO, 65251","email1":"charlie54@charter.net","email2":"","web":"","phone1":"573-590-1817","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on West 2nd street in the parking lot between the Memorial and Hensley baseball fields at the Stinson Creek walking trail covered bridge.","other":""},{"county":"Camden","city":"Camdenton","name":"Farmers Alliance of Rural Missouri (FARM) at Camdenton","startMonth":"5","endMonth":"9","openDays":"Saturdays 7:00 a.m. - Noon, May - September","contact":"Sandy Nelson","mail":"761 Rodeo Road, Camdenton, MO, 65020","email1":"","email2":"","web":"","phone1":"573-873-4038","phone1_note":" daytime","phone2":"573-346-3346","phone2_note":"","directions":"Located on the Camdenton Square at the intersection of Highways 5 and 54 in Camdenton, by the courthouse. Call for other locations.","other":""},{"county":"Cape Girardeau","city":"Cape Girardeau","name":"Cape Alternative Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesdays 8:00 a.m. - Noon, April 29 - October","contact":"Octavia Scharenborg","mail":"187 Bighorn Lane, Cape Griardeau, MO, 63701","email1":"showmefreshfarm@yahoo.com","email2":"showmefreshfarm@sbcglobal.net","web":"","phone1":"573-334-0287","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at Capaha Park Shelter #1.","other":""},{"county":"Cape Girardeau","city":"Cape Girardeau","name":"Cape Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursdays 2:30 p.m. - 6:30 p.m., May - October","contact":"Marilyn or Gene Peters","mail":"2707 Flora Hills, Cape Girardeau, MO, 63701","email1":"mpeters_2001@yahoo.com","email2":"","web":"","phone1":"573-334-7676 ","phone1_note":"","phone2":"573-579-0166","phone2_note":"","directions":"At the intersection of Kingshighway and Independence, go east one block to Galleria parking lot on the right side.","other":""},{"county":"Cape Girardeau","city":"Jackson","name":"Jackson Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Tuesdays 5:00 p.m. - 7:00 p.m., May 18th - September 28th","contact":"Lance Green","mail":"101 Court Street, Jackson, MO, 63755","email1":"info@jacksonfarmersmarket.org","email2":"","web":"http:\/\/www.jacksonfarmersmarket.org","phone1":"573-866-2204","phone1_note":"","phone2":"","phone2_note":"","directions":"","other":""},{"county":"Cass","city":"Belton","name":"Thursday Night Farmers' Market","startMonth":"7","endMonth":"10","openDays":"Thursdays 5:00 p.m. - 8:30 p.m., Mid-July - Late October","contact":"Marcia Cotton","mail":"411 Taylor Lane, Belton, MO, 64012","email1":"","email2":"","web":"","phone1":"","phone1_note":"","phone2":"","phone2_note":"","directions":"South from Kansas City on Hwy. 71. Turn right on Hwy. 58. Turn left on Walnut Street in historic downtown Belton. Market is on Loop Road between Walnut and Chestnut.","other":""},{"county":"Cass","city":"Harrisonville","name":"Cass County Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesdays 3:00 p.m. - 6:00 p.m., Saturdays 7:30 a.m. - Noon, May 4 - October 26","contact":"","mail":"2601 Cantrell, Harrisonville, MO, 64701","email1":"","email2":"","web":"http:\/\/www.cassfarmers.com","phone1":"816-726-5213","phone1_note":"","phone2":"","phone2_note":"","directions":"Take Highway 71 to first Harrisonville exit, turn right. Located in Mill Walk Mall parking lot in front of Cinema 6.","other":""},{"county":"Cass","city":"Peculiar","name":"Peculiar Farmers' and Artisan's Market","startMonth":"4","endMonth":"10","openDays":"Saturdays 7:30 a.m. - noon; April - October","contact":"Doris Sherrick ","mail":"10807 E. 205th St. Peculiar, MO, 64078","email1":"info@peculiarmarket.com","email2":"","web":"http:\/\/peculiarmarket.com","phone1":"816-779-6708","phone1_note":"","phone2":"","phone2_note":"","directions":"The market is located at 152 E. Broadway in Peculiar MO 64078","other":""},{"county":"Cass","city":"Raymore","name":"Raymore's Original Town Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Tuesdays 4p.m. - 8p.m. June - October","contact":"Janet Snook","mail":"1021 S. Madison (Parks & Rec office) Raymore, MO, 64083","email1":"","email2":"","web":"","phone1":"816-322-2791","phone1_note":"","phone2":"","phone2_note":"","directions":"200 Block of South Washington behind first Baptist Church","other":""},{"county":"Cedar","city":"El Dorado Springs","name":"El Dorado Springs Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7:00 a.m. - 11:00 a.m., May 16 - October 17","contact":"","mail":"El Dorado Springs, MO, 64744","email1":"","email2":"","web":"http:\/\/www.springcityrevitalization.org","phone1":"417-876-3532","phone1_note":"","phone2":"417-321-2000","phone2_note":"","directions":"Downtown in front of the Rock Wall.","other":""},{"county":"Cedar","city":"Stockton","name":"Stockton Farmers' Market and Artisan Fair","startMonth":"1","endMonth":"12","openDays":"Saturdays 9:00 a.m. - Noon, Year round.","contact":"Nikki Simmons Zitting","mail":"18150 E 752 Rd., Humansville, MO, 65674","email1":"stocktonmarket@nikkisimmons.com","email2":"","web":"http:\/\/stocktonmarket.blogspot.com","phone1":"417-276-3730","phone1_note":"","phone2":"","phone2_note":"","directions":"1521 3rd Rd. This is the Southern Trades Building across from Stockton High School (look for the big blue roof!).","other":""},{"county":"Christian","city":"Nixa","name":"Nixa Area Farmers' Market","startMonth":"4","endMonth":"11","openDays":"Tuesdays and Thursdays 3:00 p.m. - 7:00 p.m. June - November 5, Saturday 7:00 a.m. - 3:00 p.m. April - November 7","contact":"Roy King","mail":"2055 S. Stewart Ste D, Springfield, MO, 65804","email1":"nafm@rking.com","email2":"","web":"http:\/\/www.nixachamber.com","phone1":"417-881-1300","phone1_note":"","phone2":"","phone2_note":"","directions":"Nixa Assembly of God at the corner of Mt. Vernon and Main.","other":""},{"county":"Christian","city":"Ozark","name":"Ozark Square Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Thursdays 5:00 p.m. - Sellout, April 16 - October 15","contact":"Robert Snook","mail":"P.O. Box 1327, Ozark, MO, 65721","email1":"rsnook@ozarkmainstreet.org","email2":"","web":"http:\/\/www.ozarkmainstreet.org","phone1":"417-582-6246","phone1_note":"","phone2":"","phone2_note":"","directions":"Located near the Gazebo on the Ozark Square, weather permitting.","other":""},{"county":"Christian","city":"Ozark","name":"Republic Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursdays at 5:00 p.m., May - October","contact":"Mike Wilson","mail":"984 West Dade 2, Jerico Springs, MO, 64756","email1":"","email2":"","web":"","phone1":"417-682-4052","phone1_note":"","phone2":"","phone2_note":"","directions":"","other":""},{"county":"Clay","city":"Briarcliff Village, Kansas City","name":"Briarcliff Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Thursdays 3:00 p.m. - 7:00 p.m., May - September ","contact":"Kasey Rausch","mail":"4175 Mulberry Dr, Kansas City, MO, 64116","email1":"kaseyr@greenacres.com","email2":"","web":"http:\/\/www.briarcliffvillagekc.com","phone1":"816-746-0010","phone1_note":" ext. 206","phone2":"","phone2_note":"","directions":"Hwy 169 & Briarcliff Pkwy. Just 5 minutes north of downtown across the Broadway Bridge. Hwy 169 exit off of Hwy 29 coming from the North. The market is located in the center of Briarcliff Village next to GreenAcres, Trezo Mare & the Cafe.","other":""},{"county":"Clay","city":"Gladstone","name":"Gladstone Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Wednesdays 2p.m. - 6 p.m. May 18 - September 21","contact":"Becky Jarrett","mail":"7010 N. Holmes Gladstone, MO, 64118","email1":"beckyj@gladstone.mo.us","email2":"","web":"http:\/\/www.facebook.com\/pages\/gladstone-farmers-market\/107406389284555","phone1":"816-436-2200","phone1_note":"","phone2":"","phone2_note":"","directions":"525 NE 70th St. Gladstone MO ","other":""},{"county":"Clay","city":"Liberty","name":"Historic Downtown Liberty Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7:00 a.m. - Noon, May - October","contact":"Patrick McDowel","mail":"Liberty's Courthouse Square (Franklin Main Kansas & Water Streets) Liberty MO, 64068","email1":"","email2":"","web":"http:\/\/www.historicdowntownliberty.org","phone1":"816-781-3575","phone1_note":"","phone2":"","phone2_note":"","directions":"Saturday: Liberty's Courthouse Square.","other":""},{"county":"Clay","city":"Liberty","name":"Liberty Wednesday Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesdays 7:00 a.m. - Noon, May - October","contact":"Clara Hanks","mail":"4850 SW Middle Rd, Plattsburg, MO 64477","email1":"williamslhanks482@centurytel.net","email2":"","web":"","phone1":"816-930-2175","phone1_note":"","phone2":"","phone2_note":"","directions":"Market located at the corner of Highways 291 and 152.","other":""},{"county":"Clay","city":"North Kansas City","name":"North Kansas City Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Fridays 7:00 a.m. - 1:00 p.m. May 6 - October 28","contact":"Rick Groves","mail":"406 Armour Rd, North Kansas City, MO 64116","email1":"Richard@nkcbusinesscouncil.com","email2":"","web":"","phone1":"816-472-7700","phone1_note":"","phone2":"816-345-9339","phone2_note":"","directions":"Located at 7th & Armour Road, NKCMO 64116 (adjacent to Dairy Queen, NKC City Hall).","other":""},{"county":"Clinton","city":"Lathrop","name":"Lathrop Farmers' Market","startMonth":"5","endMonth":"11","openDays":"Saturdays 8:00 a.m. - 2:00 p.m., First Saturday in May - First Saturday in November","contact":"Lori Barringer","mail":"3795 Breckenridge Road, Turney, MO 64493","email1":"gene@cameron.net","email2":"","web":"","phone1":"816-664-3334","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at the junction of I-35 and Highway 116 in the Enchanted Frog Antique lot.","other":""},{"county":"Cole","city":"Jefferson City","name":"Cole County Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Tuesdays and Fridays 4:00 p.m. - 6:00 p.m., Saturdays 2:00 p.m. - 4:00 p.m., April 14 - October","contact":"James Hohman","mail":"43422 Hobby Horse Road, Russellville, MO 65074","email1":"hohman2@hotmail.com","email2":"","web":"","phone1":"573-392-3088","phone1_note":"","phone2":"","phone2_note":"","directions":"Take Highway 50 to Jefferson City, exit Highway 179. Go south one block to Missouri Boulevard. Go east on Missouri Boulevard to the K-Mart parking lot.","other":""},{"county":"Cole","city":"Russellville","name":"Russellville Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Saturdays, 9:00 a.m. - 12:00 p.m.","contact":"Jeanne Salmons","mail":"PO Box 129, Russellville, MO 65074","email1":"","email2":"","web":"","phone1":"573-782-4682","phone1_note":"","phone2":"","phone2_note":"","directions":"Located off Route C at the Lions Club.","other":""},{"county":"Cooper","city":"Booneville","name":"Boonslick Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Every day, 8 a.m. to sell out, Primary days are Friday and Saturday. April - October","contact":"Gene Walther","mail":"17524 Scenic Dr, Boonville, MO 65233","email1":"settlers@iland.net","email2":"","web":"","phone1":"660-882-3125","phone1_note":"","phone2":"","phone2_note":"","directions":"Ashley Rd - Old Sonic drive in; Take exit 101 through Boonville; Market is right past city limits, across from old golf course.","other":""},{"county":"Crawford","city":"Bourbon","name":"Bourbon Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Tuesdays, Thursdays, Friday 7:00 a.m. - 5:00 p.m., May - September","contact":"Robert Gargus","mail":"P.O. Box 76, Bourbon, MO 65441","email1":"rgargus@centurytel.net","email2":"","web":"","phone1":"573-732-5894","phone1_note":"","phone2":"","phone2_note":"","directions":"Elm St in Bourbon, MO.","other":""},{"county":"Crawford","city":"Cuba","name":"Farmers' Market in Fanning","startMonth":"","endMonth":"","openDays":"Saturdays 9a.m - noon, starting June 4 - Season as available","contact":"Faye Howard or Joe Stubblefield","mail":"405 N. Park Ave. Cuba, MO, 65453","email1":"faye2838@centurytel.net","email2":"","web":"","phone1":"573-885-2220","phone1_note":"Faye","phone2":"573-885-7343","phone2_note":"Joe","directions":"Fanning Feed Store Route 66 and F Hwy, Cuba, MO 65453","other":"Open to homegrown fruits and vegetables as well as homemade arts and crafts in Crawford County"},{"county":"Dallas","city":"Buffalo","name":"Buffalo Farmers' Market","startMonth":"4","endMonth":"11","openDays":"Tuesdays 3:00 p.m. - 7:00 p.m., Saturdays 10:00 a.m. - 3:00 p.m. (events planned each Saturday), Tuesdays April 27 - November 2, Starting June 5 - First Saturday of each month.","contact":"Faith Cannon","mail":"1011 W. McDaniel St., Buffalo, MO 65622","email1":"bachfamilies@yahoo.com","email2":"","web":"","phone1":"417-345-4487","phone1_note":"","phone2":"417-459-5014","phone2_note":"","directions":"501 Cherry St. Once in town take Hwy 32, East towards Lebanon. Its the first street on the left, past Hwy 73. Coming from Lebanon, its on the right, just before the first red light you come to in Buffalo. The Farmers Market is visible from Hwy 32.","other":""},{"county":"Dallas","city":"Buffalo","name":"Buffalo - Southwest Farmers' Market","startMonth":"1","endMonth":"12","openDays":"","contact":"Ray Hackett","mail":"25 Arrowhead Trail, Buffalo, MO 65622","email1":"kanhackitrr@aol.com","email2":"","web":"","phone1":"417-759-2483","phone1_note":"","phone2":"","phone2_note":"","directions":"","other":""},{"county":"Daviess","city":"Jamesport","name":"Jamesport Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Mondays, Wednesdays, Saturdays, 10:00 a.m. - 5:00 p.m., April 27 - October 31","contact":"Joe C. Gingerich","mail":"25573 State Highway 190, Jamesport, MO 64648","email1":"","email2":"","web":"","phone1":"660-684-6352","phone1_note":"","phone2":"","phone2_note":"","directions":"Four way stop in downtown, south 2 blocks on Highway 190.","other":""},{"county":"Dent","city":"Salem","name":"SACBA Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Tuesdays 3:00 p.m. - 6:00 p.m., Saturdays 7:30 a.m. - Noon, May - September","contact":"Chris Mathes","mail":"PO Box 732, Salem, MO 65560","email1":"sacba2@salemmo.com","email2":"","web":"","phone1":"573-247-3974","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at Hwy 19 and Main Street behind the Chamber of Commerce in Salem.","other":""},{"county":"Douglas","city":"Ava","name":"Ava Growers' Market","startMonth":"4","endMonth":"10","openDays":"Saturdays 7:00 a.m. - Noon, April - October","contact":"Arnold (Arne) Ahlstadt","mail":"Rt. 2, Box 503, Norwood, MO 65717","email1":"","email2":"","web":"","phone1":"417-746-4006","phone1_note":"","phone2":"","phone2_note":"","directions":"Held on the downtown Ava Square.","other":""},{"county":"Dunklin","city":"Kennett","name":"Kennett Community Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7a.m. - 1p.m. May - October","contact":"Sara Graves","mail":"1601 First St. Kennett, MO, 63857 ","email1":"sara@downtownkennet.org","email2":"","web":"","phone1":"573-888-7496","phone1_note":"","phone2":"","phone2_note":"","directions":"Courthouse Square","other":""},{"county":"Franklin","city":"New Haven","name":"New Haven Farmers' Market","startMonth":"4","endMonth":"9","openDays":"Thursdays 4:00 p.m. to dusk, rain or shine, April - September","contact":"Janelle Hoffmann","mail":"PO Box 149, New Haven, MO 63068","email1":"janelle@riverfrontsociety.com","email2":"","web":"http:\/\/www.riverfrontsociety.com","phone1":"573 237-5100","phone1_note":"","phone2":"","phone2_note":"","directions":"From Washington drive west on Hwy 100 to New Haven - From Hermann drive east on Hwy 100 to New Haven. Turn south on Miller St and head down to the riverfront. When you reach the \u0022T\u0022 at the levee along the riverfront, turn left (west) on Main St.","other":"If there is inclement weather, the market is held inside the Riverfront Cultural Society."},{"county":"Franklin","city":"St. Clair","name":"Route 66 Farmers' Market","startMonth":"5","endMonth":"10","openDays":"7 days a week 8:00 a.m. - Noon, May - October","contact":"Terry Triphahn","mail":"920 Plaza Dr, Suite F, St. Clair, MO 63077","email1":"chamber@stclairmo.com","email2":"","web":"","phone1":"636-629-1889","phone1_note":"","phone2":"","phone2_note":"","directions":"855 N. Commercial St. Clair, MO","other":""},{"county":"Franklin","city":"Union","name":"City of Union Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Wednesdays 3:30p.m. - 5:30p.m.; Saturdays 6a.m.-11a.m.","contact":"Joseph A. Graves","mail":"500 E. Locust St. Union, MO, 63084","email1":"","email2":"","web":"http:\/\/www.unionmissouri.org\/farmersmarket","phone1":"636-583-3600","phone1_note":"","phone2":"","phone2_note":"","directions":"500 E. Locust St. (City Hall parking lot)","other":""},{"county":"Franklin","city":"Washington","name":"Washington Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Saturdays 8:00 a.m. - 2:00 p.m., Wednesdays 3:00 p.m. - 6:00 p.m., April - October","contact":"Amanda Griesheimer","mail":"317 West Main, Washington, MO 63090","email1":"agriesheimer@washmo.org","email2":"","web":"","phone1":"636-239-2715","phone1_note":" ext. 106","phone2":"","phone2_note":"","directions":"317 W. Main Street.","other":"Contact market for winter hours and days."},{"county":"Gasconade","city":"Hermann","name":"Hermann Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesdays and Saturdays 8:00 a.m. - Varies, May - October","contact":"Janet Rodgers","mail":"208 East First Street, Hermann, MO 65041","email1":"","email2":"","web":"","phone1":"573-486-2121","phone1_note":" ext. 4000","phone2":"","phone2_note":"","directions":"Take Highway 100 to Second Street. Turn east on Second Street. Cross over Schiller. Located on the First Bank parking lot.","other":""},{"county":"Greene","city":"Battlefield","name":"Wilson's Creek Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Every Friday evening 4:30 p.m. - Sellout, May 1 - October 30","contact":"Shannon McKaig-Buffington","mail":"5434 S. Tower Drive, Battlefield, MO 65619","email1":"shannon@jabuffington.com","email2":"","web":"http:\/\/wilsonscreekfarmersmarket.blogspot.com","phone1":"417-881-4138","phone1_note":"","phone2":"","phone2_note":"","directions":"First Baptist Church of Battlefield at the corner of Hwy FF and Weaver Road.","other":""},{"county":"Greene","city":"Fair Grove","name":"Fair Grove Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesdays 3:30 p.m. - 7:00 p.m., April 21 - October 6","contact":"Debra VanBenthusen","mail":"8984 East Farm Road 10, Fair Grove, MO 65648","email1":"debsgourds@yahoo.com","email2":"","web":"http:\/\/www.fairgrovefarmersmarket.com","phone1":"417-459-9734","phone1_note":"","phone2":"","phone2_note":"","directions":"Eighteen miles north of Springfield on Highway 65, to Fair Grove. Take Highway 125 East 2 blocks to corner of Main Street and Highway 125. Held on Wommack Mill grounds.","other":"Growing Kids Club, held every market day."},{"county":"Greene","city":"Springfield","name":"Eastland Farmers' Market","startMonth":"5","endMonth":"12","openDays":"Wednesdays through Saturday, morning from 8:00 a.m. to 1:00 p.m. and afternoon 1:00 p.m. - 6:00 p.m.","contact":"Mike McCamish","mail":"8071 E Farm Road 148, Rogersville, MO 65742","email1":"m.mccamish@sbcglobal.net","email2":"","web":" ","phone1":"417-862-1034","phone1_note":"office","phone2":"417-224-5691","phone2_note":"cell","directions":"1835 E. Saint Louis Street, Springfield. Located one block east of Glenstone Ave. on the left.","other":""},{"county":"Greene","city":"Springfield","name":"C-Street Market (Commercial Street Market)","startMonth":"4","endMonth":"10","openDays":"Tuesday evenings 4:00 p.m. - 7:00 p.m., Saturday mornings 8:00 a.m. - Noon, April 25 - October","contact":"Carolyn Elder","mail":"201 E Commercial, Springfield, MO 65803","email1":"","email2":"","web":"http:\/\/www.itsalldowntown.com\/cstreet","phone1":"417-343-3073","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at the Jefferson Ave Footbridge, at the intersection Jefferson Ave and Commercial. 321 E Commercial.","other":""},{"county":"Greene","city":"Springfield","name":"Friday Night Market","startMonth":"5","endMonth":"10","openDays":"Fridays 6:00 p.m. - 9:00 p.m.,  May - October","contact":"Rusty Worley","mail":"304 W. McDaniel, Springfield, MO 65806","email1":"rusty@itsalldowntown.com","email2":"","web":"http:\/\/itsalldowntown.com\/fridaynightmarket","phone1":"417-831-6200","phone1_note":"","phone2":"","phone2_note":"","directions":"Park Central Square Downtown Springfield, MO.","other":""},{"county":"Greene","city":"Springfield","name":"Springfield - Southwest Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Wednesday evenings 3:00 p.m. - 7:00 p.m., Saturday mornings 8:30 a.m. - 12:30 p.m.","contact":"Ray Hackett","mail":"25 Arrowhead Trl., Buffalo, MO 65622","email1":"KanHackitRR@aol.com","email2":"","web":"","phone1":"417-759-2483","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on Glenstone, two blocks south of Chestnut Expressway in the Great Southern Bank Operations Center parking lot.","other":""},{"county":"Greene","city":"Springfield","name":"Greater Springfield Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Tuesdays, Thursdays, Saturdays 8:30 a.m., April 11 - October 31","contact":"Don Bauers","mail":"1173 South Maryland, Springfield, MO 65807","email1":"realmccoyfille1@yahoo.com","email2":"","web":"http:\/\/www.springfieldfarmersmarket.com","phone1":"417-267-2371","phone1_note":"","phone2":"","phone2_note":"","directions":"Parking lot of Battlefield Mall at intersection of Sunset Street and Glenstone Avenue (north of Macy's).","other":""},{"county":"Greene","city":"Strafford","name":"Strafford Route 66 Farmers' Market","startMonth":"7","endMonth":"9","openDays":"Saturdays 8:30am- noon July - September","contact":"Peggy","mail":"P.O. Box 21 Strafford MO 65757","email1":"","email2":"","web":"","phone1":"417-880-1235","phone1_note":"","phone2":"","phone2_note":"","directions":"Intersection of Hwy 125 and Washington in Strafford Missouri","other":""},{"county":"Grundy","city":"Trenton","name":"Trenton Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Friday 8:00 a.m. - 10:00 a.m., May - October","contact":"Gerry Robbins","mail":"680 West Highway 6, Trenton, MO 64683","email1":"","email2":"","web":"","phone1":"660-359-5104","phone1_note":"","phone2":"","phone2_note":"","directions":"Take Highway 65 North to Highway 6. Go west on Highway 6 to first stoplight. Turn right on Oklahoma Avenue. Go 1\/4 mile to fairgrounds.","other":""},{"county":"Harrison","city":"Bethany","name":"Bethany Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7:30-sell out, May-October; Wednesdays 4-sell out, June-September","contact":"Heather Benedict","mail":"1505 Main St., Court House Basement, Bethany MO 64424","email1":"BenedictH@missouri.edu","email2":"","web":"","phone1":"660-425-6434","phone1_note":"","phone2":"","phone2_note":"","directions":"BTC Bank parking lot, 3606 Miller St, Bethany MO; From exit 92 of I35 go west through second traffic light. Farmers market is on south side of the street.","other":""},{"county":"Henry","city":"Clinton","name":"Clinton Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Tuesdays 2:00 p.m. - Sellout, Saturdays 7:00 a.m. - Sellout, April - October","contact":"Jennifer Shadwick","mail":"100 W Jefferson, Clinton, MO 64735","email1":"fizzicians@hotmail.com","email2":"","web":"","phone1":"660-885-4700","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on the north-side of the Historic Downtown Clinton Square.","other":""},{"county":"Henry","city":"Clinton","name":"Golden Valley Produce & Craft Market","startMonth":"5","endMonth":"10","openDays":"Tuesdays 1:00 p.m. - 5:30 p.m. May - October, Saturdays 8:00 a.m. - Noon May and October only, Saturdays 7:00 a.m. - Noon June - September","contact":"Dennis Winkler","mail":"549 NE 251st Rd, Clinton, MO 64735","email1":"sue.stropes@gmail.com","email2":"","web":"","phone1":"660-351-4757","phone1_note":"","phone2":"816-405-9545","phone2_note":"","directions":"Located on the corner of 8th and Ohio streets next to Full Line Lumber Company. There is limited parking available.","other":""},{"county":"Howard","city":"Fayette","name":"Fayette Area Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:00 a.m. - 11:00 a.m. May - end of October","contact":"Paula Ives","mail":"297 CR 105, Fayette, MO 65248","email1":"ivesp@socket.net","email2":"","web":"","phone1":"660-248-2465","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on the south side of the historic courthouse square in downtown Fayette.","other":""},{"county":"Howell","city":"Mountain View","name":"Mountain View Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Saturdays 7:00 a.m. - Noon, April - October","contact":"Earline Granier","mail":"HCR 3 Box 165B, Birch Tree, MO 65438","email1":"","email2":"","web":"","phone1":"417-764-3724","phone1_note":"","phone2":"","phone2_note":"","directions":"Two blocks south of Highway 60 on Pine. Market is located in West Park.","other":""},{"county":"Howell","city":"West Plains","name":"West Plains Farmers' Market","startMonth":"4","endMonth":"11","openDays":"Wednesdays 11:30 a.m. - 4:00 p.m., Saturdays 7:00 a.m. - Noon, April - November","contact":"Laura Esterle","mail":"711 Washington Ave., West Plains, MO 65775","email1":"dragon143@centurytel.net","email2":"","web":"","phone1":"417-293-8306","phone1_note":"","phone2":"","phone2_note":"","directions":"Market is located on Washington Avenue and Second Street across from Richards Brothers Feed Store. Or, take Highway 160 east from Broadway.","other":""},{"county":"Howell","city":"Willow Springs","name":"Willow Springs Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Wednesdays and Saturdays 7:30 a.m. - 11:00 a.m., June - October","contact":"Elizabeth Boyle, Marguerite Wehmer","mail":"2484 County Road 5430, Willow Springs, MO 65793","email1":"","email2":"","web":"","phone1":"417-469-2454","phone1_note":"","phone2":"417-469-3254","phone2_note":"","directions":"Located at Booster Field, under the Pavilion in the 800 block of W. Main St. in Willow Springs.","other":""},{"county":"Iron","city":"Ironton","name":"Arcadia Valley Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Saturdays 7a.m.-noon or sellout, June - October","contact":"Tony Harbison","mail":"P.O. Box 385 Ironton, MO, 63650","email1":"","email2":"","web":"","phone1":"573-546-3877","phone1_note":"","phone2":"","phone2_note":"","directions":"Wayne St. behind county courthouse in Ironton Missouri","other":""},{"county":"Jackson","city":"Blue Springs","name":"Blue Springs Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 7:00 a.m. - Noon, May - October","contact":"Chris Williams","mail":"412 East Mason, Odessa, MO 64076","email1":"bluespringsfarmersmarket@yahoo.com","email2":"","web":"http:\/\/www.bluespringsfarmersmarket.com","phone1":"816-230-0007","phone1_note":"","phone2":"","phone2_note":"","directions":"On the east side of Kansas City, take I-70 to the Blue Springs Highway 7 Exit. Go south on Highway 7 for one mile to Main. Go right on Main. Market is at the corner of 11th and Main Streets, across from the police station.","other":""},{"county":"Jackson","city":"Grandview","name":"Grandview Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Saturdays 7a.m.- sellout, June - October","contact":"Johnna Clark","mail":"13705 Norby Rd. Grandview, MO, 64030","email1":"jona@umr@yahoo.com","email2":"","web":"","phone1":"816-405-5561","phone1_note":"","phone2":"","phone2_note":"","directions":"High Grove Rd. in White Ave., Masonic Temple in Grandview Missouri","other":""},{"county":"Jackson","city":"Independence","name":"Hartman's Heritage Community Market","startMonth":"5","endMonth":"9","openDays":"Tuesdays 3:00 p.m. - 7:00 p.m., Sundays 10:00 a.m. - 2:00 p.m., June - September","contact":"Joe Antoine, Antoine's Seed and Supplies","mail":"1000 S. Crysler Avenue, Independence, MO 64052","email1":"orders@antoineseed.com","email2":"","web":"http:\/\/www.independencefarmersmarket.com","phone1":"816-252-8860","phone1_note":"","phone2":"","phone2_note":"","directions":"Off of I-70 and Little Blue Parkway.","other":""},{"county":"Jackson","city":"Independence","name":"Independence Farmers' & Craft Market","startMonth":"5","endMonth":"10","openDays":"During May farmers are there on Saturdays 5:00 a.m. - 1:00 p.m., During June - October crafters and farmers are there Saturdays and Wednesdays 5:00 a.m. - 1:00 p.m.","contact":"Joe Antoine, Antoine's Seed and Supplies","mail":"1000 S. Crysler Avenue, Independence, MO 64052","email1":"orders@antoineseed.com","email2":"","web":"http:\/\/www.independencefarmersmarket.com","phone1":"816-252-8860","phone1_note":"phone","phone2":"816-252-5083","phone2_note":"fax","directions":"We are at the northwest corner of Truman and Main or 3 blocks west of Truman and Noland Roads at Independence Square.","other":""},{"county":"Jackson","city":"Kansas City","name":"Westport Plaza Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesday 4:30 p.m. - 7:30 p.m., May - October","contact":"David Bennett","mail":"Kansas City, MO","email1":"freelingd@yahoo.com","email2":"","web":"http:\/\/www.farmersmarketkc.org","phone1":"913-432-4101","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at Westport Rd.and Wyoming St.","other":""},{"county":"Jackson","city":"Kansas City","name":"KC Organics and Natural Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:00 a.m. - 12:30 p.m., May - Mid-October","contact":"Peter Stauffer","mail":"5725 MCGee, Kansas City, MO 64113","email1":"kcorganics@yahoo.com","email2":"","web":"http:\/\/www.kcorganics.com","phone1":"816-444-3663","phone1_note":"(816-444-FOOD)","phone2":"","phone2_note":"","directions":"Located one mile south of I-435 on Holmes Road then east on Red Bridge Road in Minor Park.","other":"Contact market for winter hours and days."},{"county":"Jackson","city":"Kansas City","name":"The Farmers' Community Market at Brookside","startMonth":"4","endMonth":"12","openDays":"Saturdays 8:00 a.m. - 1:00 p.m., Starting April 11","contact":"Tim Walters","mail":"P.O. Box 7088, Kansas City, MO 64113","email1":"information@farmerscommunitymarket.com","email2":"","web":"http:\/\/www.farmerscommunitymarket.com","phone1":"816-719-0469","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at the Border Star Montessori School at 63rd and Wornall Road in Brookside.","other":""},{"county":"Jackson","city":"Kansas City","name":"The Sunday Market, Unity Temple the Plaza","startMonth":"1","endMonth":"12","openDays":"1st and 3rd Sundays of each month 9:00 a.m. - 1:00 p.m.","contact":"Greg Clootz","mail":"707 West 47th Street, Kansas City, MO 64112","email1":"sundayMarket@edenalley.com","email2":"","web":"http:\/\/www.edenalley.com","phone1":"","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on the First floor of Unity Temple on the Plaza, 707 W 47th, Kansas City, Missouri 64112.","other":""},{"county":"Jackson","city":"Kansas City","name":"City Market","startMonth":"1","endMonth":"12","openDays":"March - October Saturdays 6:00 a.m. - 3:00 p.m., Sundays 8:00 a.m. - 3:00 p.m. , Wednesdays 10:00 a.m. - 2:00 p.m., Winter Farmers' Market Hours: November - March, Saturdays 7:00 a.m. - 3:00 p.m., Sundays 7:00 a.m. - 3:00 p.m., Wednesday 8:00 a.m. - 2:00 p.m. *City Markets Special events may require an early closing","contact":"Deb Connors","mail":"20 East Fifth Street, Suite 201, Kansas City, MO 64106","email1":"dconnors@cwbkc.com","email2":"","web":"http:\/\/www.thecitymarket.org","phone1":"816-842-1271","phone1_note":"","phone2":"","phone2_note":"","directions":"From I-35, exit at Broadway. Take 6th Street to Walnut and go north two blocks to 5th Street.","other":"Missouri's Market of the Year - 2008. Where the Locals Go"},{"county":"Jackson","city":"Kansas City","name":"Bannister Federal Complex Farmers' Market","startMonth":"6","endMonth":"9","openDays":"Tuesdays 10:30 a.m. - 1:30 p.m., June 9th - September 29th","contact":"Debbie Crow","mail":"6501 Beacon Drive, Kansas City, MO 64133","email1":"deborah.crow@kcc.usda.gov","email2":"","web":"","phone1":"816-926-3039","phone1_note":"","phone2":"","phone2_note":"","directions":"From either I-435 North or South, take the Bannister Road exit. Go west approximately 2.5 miles. Turn right (north) onto Troost Avenue. Turn right at the first stoplight. Located in the Bannister Federal Complex parking lot.","other":""},{"county":"Jackson","city":"Kansas City","name":"Troostwood Youth Garden Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:00 a.m. - 2:00 p.m., May - October","contact":"Ericka Wright","mail":"5142 Paseo, Kansas City, MO 64110","email1":"troostwood@kcfoodcircle.org","email2":"","web":"http:\/\/kcfoodcircle.org\/growers\/troostwood","phone1":"816-444-5788","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at 52nd and Paseo Boulevard in Kansas City, Missouri.","other":"Youth are providing fresh and healthy vegetables from A to Z."},{"county":"Jackson","city":"Kansas City","name":"South Kansas City Farmers' Market","startMonth":"6","endMonth":"11","openDays":"Saturday and Sunday 9:00 a.m. - 3:00 p.m., June - November","contact":"Wardell Williams","mail":"2917 E. 29th Street, Kansas City, MO 64128","email1":"skcmofm@gmail.com","email2":"","web":"","phone1":"816-507-4796","phone1_note":"","phone2":"","phone2_note":"","directions":"1 Block West of Blue Ridge Blvd. & 87th Street.","other":""},{"county":"Jackson","city":"Kansas City","name":"BADSEED Funky Friday Night Farmers' Market","startMonth":"5","endMonth":"11","openDays":"Fridays 4:30 p.m. - 9 p.m., May - November 20th","contact":"Brooke Salvaggio","mail":"1909 McGee, Kansas City, MO 64108","email1":"badseedfarm@hotmail.com","email2":"","web":"http:\/\/www.badseedfarm.com","phone1":"913-522-3458","phone1_note":"","phone2":"","phone2_note":"","directions":"In the Crossroads district of Downtown Kansas City.","other":"This market operates during the winter. Call or contact the market for winter hours and days."},{"county":"Jackson","city":"Kansas City","name":"Grand Court Four Seasons Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Saturdays all year.","contact":"Tena Bellovich","mail":"10530 Askew Ave., Kansas City, MO 64137","email1":"bellovicht@umkc.edu","email2":"","web":"","phone1":"816-966-9446","phone1_note":"","phone2":"","phone2_note":"","directions":"107th Street and Wornall Road. Just south of I-435 on Wornall.","other":""},{"county":"Jackson","city":"Kansas City","name":"Troost Community Market","startMonth":"6","endMonth":"9","openDays":"Saturday 8:00 a.m. - 2:00 p.m., June - end September","contact":"Robert Taylor","mail":"4037 Virginia, Kansas City, MO 64110","email1":"taylorrobertlee@hotmail.com","email2":"cstech314@yahoo.com","web":"","phone1":"816-808-7571","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in midtown Kansas City at the intersection of Troost Avenue and Linwood Boulevard.","other":""},{"county":"Jackson","city":"Lee's Summit","name":"Downtown Lee's Summit Farmers' Market","startMonth":"4","endMonth":"11","openDays":"Wednesdays and Saturdays 7:00 a.m. - Sellout, April 25 -  November 7th","contact":"Stacy Brandt","mail":"226 SE Douglas, Ste. #203, P.O. Box 1688, Lee's Summit, MO 64063","email1":"events@downtownls.org","email2":"","web":"http:\/\/www.downtownls.org","phone1":"816-246-6598","phone1_note":"","phone2":"","phone2_note":"","directions":"From I-70 take I-470 south to Douglas Street, south to 2nd and Douglas.","other":""},{"county":"Jackson","city":"Martin City","name":"Martin City Farm and Outdoor Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 9:00 a.m. - 1:00 p.m. May - October","contact":"Tami Bourquin","mail":"11936 W 119th St, Suite 189, Overland Park, KS 66213","email1":"tami@generationrelevant.com","email2":"","web":"","phone1":"913-317-6363","phone1_note":"","phone2":"","phone2_note":"","directions":"Sutherland parking lot at Holmes Rd and 135th St, Martin City MO.","other":""},{"county":"Jackson","city":"Raytown","name":"Raytown City Center Market","startMonth":"6","endMonth":"11","openDays":"Saturday 7:00 a.m. - Sellout,  June - November","contact":"Graham Cummings","mail":"10012 E. 63rd Street, Raytown, MO 64133","email1":"gcummings@kc.rr.com","email2":"","web":"","phone1":"816-590-6817","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on the West Side of the Old First Baptist Church at 6224 Blue Ridge Blvd.","other":""},{"county":"Jasper","city":"Carthage","name":"Carthage Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesdays and Saturdays 7:00 a.m. - Sellout, April 3 - October","contact":"Ray Mathis","mail":"119 E. 3rd, Carthage, MO 64836","email1":"","email2":"","web":"","phone1":"417-358-3579","phone1_note":"","phone2":"","phone2_note":"","directions":"On the beautiful historic Carthage Square.","other":""},{"county":"Jasper","city":"Joplin","name":"Joplin Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Wednesdays and Saturdays 9:00 a.m. - 2:00 p.m.","contact":"Beth Peacock","mail":"212 W 8th Street, Joplin, MO 64801","email1":"bpeacock@joplinmo.org","email2":"","web":"","phone1":"417-623-3254","phone1_note":"","phone2":"","phone2_note":"","directions":"Joplin Memorial Hall, 212 W 8th Street, Downtown Joplin.","other":""},{"county":"Jasper","city":"Webb City","name":"Webb City Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Tuesday and Friday 11:00 a.m. - 3:00 p.m. May - October,  Saturdays 9:00 a.m. - Noon June - September, 11:00 a.m. - 2:00 p.m. First and Third Fridays November - April","contact":"Eileen Nichols","mail":"One South Main Street, Webb City, MO 64870","email1":"eileennichols@sbcglobal.net","email2":"","web":"http:\/\/www.localharvest.org\/farmers-markets\/M3615","phone1":"417-483-8139","phone1_note":"","phone2":"","phone2_note":"","directions":"From Carthage: take 171 west, turning left at the first stoplight after entering Webb City. From Joplin: take Rangeline (Business 71) north, turning left on MacArthur (171); turn right at Main. Look for the pavilions near King Jack Park entrances.","other":""},{"county":"Jefferson","city":"Byrne's Mill","name":"Byrne's Mill Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Friday 3:00 p.m. - 7:30 p.m., Alternating Fridays starting May 15 - October 16","contact":"Susan Gibson","mail":"3751 South Lakeshore Drive, Byrne's Mill, MO 63051","email1":"moonvalleyvista@charter.net","email2":"","web":"http:\/\/www.byrnesmIll.org","phone1":"636-677-0514","phone1_note":"","phone2":"","phone2_note":"","directions":"Northwest Jefferson County at the Byrnes Mill City Park on Lower Byrnes Mill Road. Lower Byrnes Mill Road is off highway 30 between the towns of House Springs and High Ridge.","other":""},{"county":"Jefferson","city":"Crystal","name":"Crystal City Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesday 4:00 p.m. - 8:00 p.m., May - October","contact":"Ben DeClue","mail":"200 Taylor Ave., Crystal City, MO 63019","email1":"ccfarmersmarket@gmail.com","email2":"","web":"http:\/\/www.crystalcityfarmersmarket.blogspot.com","phone1":"636-937-0288","phone1_note":"","phone2":"314-630-0280","phone2_note":"","directions":"105 Bailey Rd, Grace Presbyterian Church in Crystal City, MO.","other":""},{"county":"Jefferson","city":"DeSoto","name":"DeSoto Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - Noon, May - October","contact":"Debby Campbell","mail":"DeSoto, MO","email1":"buyfreshlocal@gmail.com","email2":"","web":"http:\/\/www.buyfreshlocal.blogspot.com","phone1":"636-586-4570","phone1_note":"","phone2":"","phone2_note":"","directions":"St. Louis: South on Highway 21 approximately 45 miles. Make left turn on Highway H also known as Rock Road. Go approximately 3\/4 of a mile to left turn into St. Andrew's United Methodist Church. Market is located behind the church in back parking lot.","other":""},{"county":"Jefferson","city":"Pevely","name":"Pevely Flea Market & Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday and Sunday 7:00 a.m. for vendors, 8:00 a.m. for shoppers - 4:00 p.m. May - October","contact":"Lynne Parker","mail":"PO Box 419, Pevely, MO 63070","email1":"Lynne@pflea.com","email2":"","web":"http:\/\/www.pflea.com","phone1":"636-475-3215","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at 8773 Commercial Blvd. I-55 to Exit 180 and go East to Commercial Blvd., (Hwy 61), then turn right and we're right up over the hill.","other":""},{"county":"Johnson","city":"Chilhowee","name":"Chilhowee Main Street Farmers' Market","startMonth":"5","endMonth":"11","openDays":"Saturdays 8a.m.-noon, May - November","contact":"Melody Robinson","mail":"P.O. box 183 Chilhowee, MO, 64733","email1":"cityofchilhowee@centurylink.net","email2":"","web":"http:\/\/www.mainstreetfarmersmarket.webs.com","phone1":"660-678-3738","phone1_note":"","phone2":"","phone2_note":"","directions":"108 S. Main St. in Chilhowee MO, 64733","other":""},{"county":"Johnson","city":"Holden","name":"Holden Farmers' Market","startMonth":"6","endMonth":"9","openDays":"Saturdays 7:00 a.m. - Noon or sellout, June - September","contact":"Jo Ann Nolan","mail":"1551 SW 25th Road, Kingsville, MO 64061","email1":"info@holdenmarket.com","email2":"","web":"http:\/\/www.holdenmarket.com","phone1":"816-597-3353","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at the City Park across from the baseball fields on the south side of Highway 58. Look for the Farmers' Market banner.","other":""},{"county":"Johnson","city":"Warrensburg","name":"Warrensburg Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesday 4:30 p.m. - 6:30 p.m. May - October, Saturdays 7:00 a.m. - Sellout April - October","contact":"Jessica Rhodes","mail":"111 North Holden, Warrensburg, MO 64093","email1":"wmainst@embarqmail.com","email2":"","web":"http:\/\/www.warrensburgmainstreet.com","phone1":"660-229-0899","phone1_note":"","phone2":"","phone2_note":"","directions":"Take Highway 13 to North Street. Take North Street west to Holden Street. Located on the corner of Holden and North Streets.","other":""},{"county":"Laclede","city":"Lebanon","name":"Farmers' Market of Laclede County","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:00 a.m. - Noon, May - October","contact":"Linda Bethurem","mail":"P.O. Box 573 Lebanon, MO, 65536","email1":"anewlife06@netzero.net","email2":"","web":"","phone1":"417-531-1365","phone1_note":"","phone2":"","phone2_note":"","directions":"100 Hospital Dr. in Lebanon MO","other":""},{"county":"Lafayette","city":"Concordia","name":"Concordia - Lafayette County Farmers' Market","startMonth":"5","endMonth":"8","openDays":"Thursday 4:30 p.m. - 7:00 p.m. Mid-May - Mid-August","contact":"Dale Klussman","mail":"600 Main Street, Concordia, MO 64020","email1":"concordiaadmin@galaxycable.net","email2":"","web":"","phone1":"","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in Central Park, 600 Main Street, in a beautiful tree-filled park setting.","other":""},{"county":"Lafayette","city":"Higginsville","name":"Higginsville - Lafayette County Farmers' Market","startMonth":"4","endMonth":"9","openDays":"Tuesday 4:30 p.m. - 7:00 p.m. Mid-April - Mid-September","contact":"Ryan Cole","mail":"15 E 20th Street, P.O. Box 675, Higginsville, MO 64037","email1":"jcole@ctcis.net","email2":"","web":"http:\/\/www.higginsvillechamber.org\/market.aspx","phone1":"660-238-6651","phone1_note":"","phone2":"","phone2_note":"","directions":"Downtown Higginsville, covered location, one block east of Main Street on 20th Street behind the post office.","other":""},{"county":"Lafayette","city":"Lexington","name":"Lexington - Lafayette County Farmers' Market","startMonth":"5","endMonth":"8","openDays":"Wednesday 4:30 p.m. - 7:00 p.m., May - August","contact":"","mail":"1211 Main Street, Lexington, MO 64067","email1":"","email2":"","web":"http:\/\/www.visitlexingtonmo.com\/","phone1":"","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in Bank Midwest parking lot at 13th and Main.","other":""},{"county":"Lafayette","city":"Odessa","name":"I-70 Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Monday  4:30 p.m. - 6:30 p.m. late May - October, Saturday 9:00 a.m. - 1:00 p.m. June - September","contact":"Cathy Geary","mail":"14796 Burr Oak Road, Odessa, MO 64706","email1":"mom81549@yahoo.com","email2":"","web":"","phone1":"816-263-1914","phone1_note":"","phone2":"","phone2_note":"","directions":"301 S 2nd (across from Casey's).","other":""},{"county":"Lawrence","city":"Aurora","name":"Aurora Local Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesday 11a.m. - Sellout, Saturday 8:00 a.m. - Noon, May - October","contact":"Trish Matheney","mail":"19107 Lawrence 1202 Aurora, MO, 65605","email1":"mathenytrish@yahoo.com","email2":"","web":"","phone1":"417-236-5101","phone1_note":"","phone2":"","phone2_note":"","directions":"Oak Park, East side Wednesdays, West side Saturdays, Oak Business 60 in Aurora MO","other":""},{"county":"Lawrence","city":"Aurora","name":"Aurora Open Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Wednesday Noon - Sellout, Saturday 7:00 a.m. - Noon, May - October","contact":"Bobby Garoutte","mail":"18093 Lawrence 2175 Aurora, MO, 65605","email1":"","email2":"","web":"","phone1":"417-678-0152","phone1_note":"","phone2":"","phone2_note":"","directions":"East side of Oak Park, Oak Church St. in Aurora MO","other":""},{"county":"Lawrence","city":"Mount Vernon","name":"Mount Vernon Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Saturday 7:00 a.m. - Noon, April - Mid-October","contact":"Norma Grunwald","mail":"12885 Lawrence 2155, Mt Vernon, MO 65712","email1":"daturanorma@aol.com","email2":"","web":"","phone1":"417-466-3029","phone1_note":"","phone2":"","phone2_note":"","directions":"Take Main Street to Market, north to the Mount Vernon downtown square.","other":""},{"county":"Lawrence","city":"Pierce City","name":"Pierce City Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Saturday 8a.m. - noon, June - October","contact":"Pauly McCrillis","mail":"100 W. Commercial St. Suite. A, Pierce City, MO, 65723","email1":"mosweetP@gmail.com","email2":"","web":"","phone1":"417-669-5146","phone1_note":"","phone2":"","phone2_note":"","directions":"Intersection of Commercial St. and Locust St. in Pierce City MO","other":""},{"county":"Lincoln","city":"Silex","name":"Silex - River Hills Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Second and Fourth Saturday 7:00 a.m. - Noon","contact":"Paul Harter","mail":"1010 S. Muldrow St, Mexico, MO 65265","email1":"pbr4320@sbcglobal.net","email2":"","web":"","phone1":"573-721-6223","phone1_note":"","phone2":"573-384-5859","phone2_note":"","directions":"Located at the community park in Silex, MO.","other":""},{"county":"Lincoln","city":"Troy","name":"Troy - River Hills Farmers' Market","startMonth":"1","endMonth":"12","openDays":"First and Third Saturday 8:30 a.m. - 1:00 p.m.","contact":"Paul Harter","mail":"1010 S. Muldrow St, Mexico, MO 65265","email1":"pbr4320@sbcglobal.net","email2":"","web":"","phone1":"573-721-6223","phone1_note":"","phone2":"573-384-5859","phone2_note":"","directions":"170 Market Place Drive Troy, MO 63379 Parking lot of Tractor Supply.","other":""},{"county":"Linn","city":"Brookfield","name":"Brookfield Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 - Noon, May - October","contact":"Fran Graff, Brookfield Chamber of Commerce","mail":"300 N. Main St., Brookfield, MO 64628","email1":"chamber@brookfieldmochamber.com","email2":"","web":"http:\/\/www.brookfieldmochamber.com\/farmersmarket.htm","phone1":"660-258-7255","phone1_note":"","phone2":"","phone2_note":"","directions":"Tormey Park on the 200 block of South Main Street.","other":""},{"county":"Linn","city":"Marceline","name":"MABCC Farmers' Market","startMonth":"6","endMonth":"9","openDays":"Thursdays 3p.m.-7p.m. June 2nd- September 22","contact":"Mary Ann Schmitt","mail":"109 N. Main Street USA Marceline, MO, 64658","email1":"info@marcelinemarket.com","email2":"","web":"http:\/\/marcelinemarket.com","phone1":"660-376-3330","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in Ripley Park, on Marceline's Main Street USA. Parking is available in spaces in front of the market on Main Street and on both sides of Ripley Park.","other":""},{"county":"Livingston","city":"Chillicothe","name":"Chillicothe Farmers' Market","startMonth":"5","endMonth":"10","openDays":"First Saturday in May and Every Saturday rain or shine through the last Saturday in October","contact":"Beth Weidner","mail":"12947 CR 231, Tina, MO 64682","email1":"bweeds@greenhills.net","email2":"","web":"","phone1":"660-646-4050","phone1_note":"","phone2":"","phone2_note":"","directions":"Highway 65 to downtown Chillicothe. Farmers' market is on the east side of Hwy 65 in the parking lot of the Livingston County Courthouse. It is located on the west side of the Courthouse Square.","other":""},{"county":"Macon","city":"Macon","name":"Southside Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - Noon, May - October","contact":"Mollie Gilliland","mail":"PO Box 306, Macon, MO 63552","email1":"mollieg@centurytel.net","email2":"","web":"","phone1":"660-385-5781","phone1_note":" ext. 21","phone2":"","phone2_note":"","directions":"Located at 1404 South Missouri Street in Macon.","other":""},{"county":"Madison","city":"Fredericktown","name":"Madison County Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursday 4:00 p.m. - 6:30 p.m., May - October","contact":"Karen Yates","mail":"137 W Main, Fredericktown, MO 63645","email1":"Madisoncountyfarmersmarkets@yahoo.com","email2":"","web":"","phone1":"573-521-8691","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in the city park, one block north of the court square. Bill Whitener Memorial Pavilion, North Main Street.","other":""},{"county":"Madison","city":"Fredericktown","name":"Madison County Farmers' & Producers Saturday Market","startMonth":"5","endMonth":"10","openDays":"Saturday 7:30 a.m. - 1:30 p.m., May - October","contact":"Donna Kranjec","mail":"320 N Mine LaMotte, Fredericktown, MO 63645","email1":"madcofarmsupply@bigrivertel.net","email2":"","web":"","phone1":"573-783-5526","phone1_note":"","phone2":"","phone2_note":"","directions":"320 North Mine LaMotte.","other":""},{"county":"Marion\/Ralls","city":"Hannibal","name":"Hannibal Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Tuesday 3:00 p.m. - 7:00 p.m., Saturday 8:00 a.m. - Noon, May 4 - September 28","contact":"Nan Poage-Prater","mail":"14491 Highway H, Hannibal, MO 63401","email1":"nanapoage@onemain.com","email2":"","web":"","phone1":"573-221-2640","phone1_note":"","phone2":"","phone2_note":"","directions":"Central Park at Fifth and Broadway in downtown Hannibal.","other":""},{"county":"McDonald","city":"Anderson","name":"Tuesday B2B (Back to Basics) Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Tuesday 4:00 p.m. - 7:00 p.m.","contact":"Robin Killion","mail":"PO Box 85, Anderson, MO 64831","email1":"robin_killion@yahoo.com","email2":"","web":"","phone1":"417-845-0170","phone1_note":"","phone2":"","phone2_note":"","directions":"By Hometown Bank.","other":""},{"county":"McDonald","city":"Anderson","name":"Saturday B2B (Back to Basics) Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Saturday 8:00 a.m. - Noon","contact":"Robin Killion","mail":"PO Box 85, Anderson, MO 64831","email1":"robin_killion@yahoo.com","email2":"","web":"","phone1":"417-845-0170","phone1_note":"","phone2":"","phone2_note":"","directions":"Hwy 71","other":""},{"county":"Mercer","city":"Princeton","name":"Mercer County Farmers Market","startMonth":"5","endMonth":"10","openDays":"Saturday 7:30 a.m. - 10:30 a.m., May - October","contact":"Gwen Coppick","mail":"Sub 5 Lot 13, Atlantic Ave., Lake Marie, Mercer, MO 64661","email1":"","email2":"","web":"","phone1":"660-382-4384","phone1_note":"","phone2":"","phone2_note":"","directions":"In Princeton, corner of Highways 136 and 65, in parking lot of Crossroads Bar & Grill.","other":""},{"county":"Miller","city":"Osage Beach","name":"Farmers Alliance of Rural Missouri (FARM) at Osage Beach","startMonth":"5","endMonth":"9","openDays":"Wednesday 3:00 p.m. - 6:00 p.m., May - September","contact":"Sandy Nelson","mail":"761 Rodeo Road, Camdenton, MO 65020","email1":"","email2":"","web":"","phone1":"573-873-4038","phone1_note":"daytime","phone2":"573-346-3346","phone2_note":"","directions":"Located at the Pallisades Village Junction off of Highways 54 and KK in Osage Beach.","other":""},{"county":"Miller","city":"Osage Beach","name":"Bagnell Dam Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Contact Seller","contact":"Jocelyn White","mail":"1310 Proctor Drive, Osage Beach, MO 65065","email1":"","email2":"","web":"","phone1":"","phone1_note":"","phone2":"","phone2_note":"","directions":"","other":""},{"county":"Monroe","city":"Paris","name":"Monroe County Farmers' Market","startMonth":"1","endMonth":"10","openDays":"Saturday 9:00 a.m. - Noon, May 18 - October 12","contact":"Julie Ensor","mail":"24036 Monroe Road 217, Holliday, MO 65258","email1":"","email2":"","web":"http:\/\/www.parismo.org","phone1":"660-266-3465","phone1_note":"","phone2":"","phone2_note":"","directions":"One block east of Monroe County Courthouse in downtown Paris.","other":""},{"county":"Morgan","city":"Versailles","name":"Versailles Area Farmers' Market","startMonth":"5","endMonth":"12","openDays":"Thursday 3:00 p.m. - 7:00 p.m. Starting May 7","contact":"Jim Kykzeul","mail":"PO Box 256, Versailles, MO 65084","email1":"tulipfieldsllc@yahoo.com","email2":"","web":"","phone1":"573-378-4401","phone1_note":"","phone2":"573-378-0303","phone2_note":"","directions":"Located on the downtown square Versailles.","other":""},{"county":"Newton","city":"Neosho","name":"The Neosho Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - 1:00 p.m. or Sellout, May - October","contact":"Mary Horine or Craig Jones","mail":"203 E Main, Neosho MO 64850","email1":"tahoe_mary@hotmail.com","email2":"cjones@neoshomo.org","web":"","phone1":"417-451-8050","phone1_note":"","phone2":"","phone2_note":"","directions":"One block west of the Historic Downtown Square at the intersection of Jefferson and Spring Streets.","other":""},{"county":"Newton","city":"Neosho","name":"Newton County Farmers' Market","startMonth":"5","endMonth":"11","openDays":"Monday - Saturday 7:00 a.m. - 1:00 p.m., May - Fall","contact":"Rosalie Garner","mail":"P.O. Box 96, Stark City, MO 64866","email1":"woofy@mo-net.com","email2":"","web":"","phone1":"417-638-5453","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at the northwest corner of the Newton County Courthouse Square.","other":""},{"county":"Nodaway","city":"Maryville","name":"Nodaway County Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Wednesday and Saturday 7:00 a.m. - Noon, June - October","contact":"Connie Callow","mail":"40474 Icon Road, Barnard, MO 64423","email1":"doncon@grm.net","email2":"","web":"","phone1":"660-652-4424","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at 1416 South Main Street at the Marymart Shopping Center parking lot.","other":""},{"county":"Oregon","city":"Alton","name":"Ozark Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Monday - Saturday 9:00 a.m. - 6:00 p.m.","contact":"Patricia Donaldson","mail":"Rt.2 Box 2747, Alton, MO 65606","email1":"mes@ortrackm.missouri.org","email2":"","web":"","phone1":"417-778-7062","phone1_note":"","phone2":"","phone2_note":"","directions":"Alton Dollar General Store, Thayer - Old Dutch Oven.","other":""},{"county":"Ozark","city":"Dora","name":"Dora Farmers' Market","startMonth":"4","endMonth":"12","openDays":"Saturday 8:00 a.m. - Noon beginning Mid-April","contact":"Leslie Collins","mail":"Route 1, Box 1685, Sycamore, MO 65760","email1":"lesliecolin@gmail.com","email2":"","web":"","phone1":"417-261-2242","phone1_note":"","phone2":"","phone2_note":"","directions":"Hwy 181, Located next to Roy's Store.","other":""},{"county":"Pemiscot","city":"Caruthersville","name":"Missouri Farmers' Market","startMonth":"6","endMonth":"11","openDays":"Daily June 1 - Late November","contact":"John Hutchinson","mail":"P.O. Box 1112, Caruthersville, MO 63830","email1":"","email2":"","web":"","phone1":"573-333-0788","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on the corner of Truman and Highway 84 across from Jiffy Jim's.","other":""},{"county":"Pettis","city":"Sedalia","name":"Sedalia Area Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Tuesday 3:00 p.m. - 6:00 p.m., Saturday 9:00 a.m. - 1:00 p.m., May - October","contact":"Beverly Rollings","mail":"c\/o Sedalia Area Chamber of Commerce, 600 E. Third, Sedalia, MO 65301","email1":"info@sedaliaareafarmersmarket.com","email2":"","web":"http:\/\/www.sedaliaareafarmersmarket.com","phone1":"660-826-2222","phone1_note":"","phone2":"","phone2_note":"","directions":"Main & Ohio in downtown Sedalia (From US 65 turn east at Main St. exit, or from US 50 turn North on Ohio Ave.)","other":""},{"county":"Phelps","city":"Rolla","name":"Rolla Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Tuesday and Saturday 7:00 a.m. - Noon, May - October","contact":"Laura Weiss","mail":"Rolla, MO 65401","email1":"","email2":"","web":"","phone1":"573-364-7855","phone1_note":"","phone2":"","phone2_note":"","directions":"Tuesday: Downtown across from Meeks Lumber. Saturday: Highway 63 at the fairgrounds.","other":""},{"county":"Phelps","city":"St. James","name":"St. James Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Friday and Saturday 7:00 a.m. - Noon, May 4 - October 13","contact":"Jamie Hunt Tourism Director-City of St. James","mail":"100 State Route B, St. James, MO 65559","email1":"director.tic@centurytel.net","email2":"","web":"http:\/\/www.stjamesmissouri.org","phone1":"573-265-3899","phone1_note":"","phone2":"","phone2_note":"","directions":"Held at the St. James Tourist Information Center, across from McDonald's at Exit 195 on I-44. At exit, head north on Highway 68.","other":""},{"county":"Pike","city":"Bowling Green","name":"Bowling Green Farmers' and Artists Market","startMonth":"5","endMonth":"10","openDays":"Fridays 3p.m. - 6p.m., last Friday in May - Second week in October","contact":"Sarrah Patton","mail":"P.O. Box 5 Bowling Green, MO, 63334","email1":"bgfam@ymail.com","email2":"","web":"","phone1":"573-213-3183","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on Main St. just off the square in downtown Bowling Green","other":""},{"county":"Pike","city":"Louisiana","name":"Louisiana Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 7:00 a.m. - Noon, May 7th - End of October","contact":"Karen Stoeckley","mail":"Louisiana Chamber of Commerce, 202 S. Third Street, Louisiana, MO 63353","email1":"","email2":"","web":"","phone1":"573-754-3787","phone1_note":"","phone2":"","phone2_note":"","directions":"East end of Georgia Street - Look for the flagpole.","other":""},{"county":"Platte","city":"Kansas City","name":"Zona Rosa Farmers' Market","startMonth":"6","endMonth":"9","openDays":"Tuesday 4:00 p.m. - 8:00 p.m. or Sellout, June - September","contact":"Brenda Noorbakhsh","mail":"8640 N. Dixson Avenue, Kansas City, MO 64153","email1":"bnoorbakhsh@steiner.com","email2":"","web":"http:\/\/www.zonarosa.com","phone1":"816-587-8180","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at I-29 and Barry Road in Kansas City North in the large parking lot just south of 86th Street.","other":""},{"county":"Platte","city":"Parkville","name":"Parkville Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesday 2:00 p.m. - 5:00 p.m. June 10 - rest of the season, Saturday 7:00 a.m. - Sellout, April 25 - October","contact":"Shelley Oberdiek","mail":"24440 Oberdiek Lane, Platte City, MO 64079","email1":"soberdiek@yahoo.com","email2":"","web":"","phone1":"816-330-3279","phone1_note":"","phone2":"","phone2_note":"","directions":"Highway 9 to Parkville, market by English Landing Park.","other":""},{"county":"Platte","city":"Platte City","name":"Platte City Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Wednesday 4:00 p.m. - 7:00 p.m. Saturday 7:00 a.m. - varies, May 1 - September","contact":"Mary Anne Brooks","mail":"PO Box 2305, Platte City, MO 64079","email1":"mbrooks826@kc.rr.com","email2":"","web":"http:\/\/www.plattecitymo.com","phone1":"816-858-5306","phone1_note":"","phone2":"","phone2_note":"","directions":"2601 Running Horse Road. In the parking lot of Running Horse Farm and Home Store. Exit 18 off I-29 West to first light. South on Running Horse Road 2 blocks.","other":""},{"county":"Polk","city":"Bolivar","name":"Greater Polk County Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Tuesday 3:30 p.m. - 7:00 p.m. and Saturday 7:30 a.m. - 11:00 a.m. through Labor Day weekend, After Labor Day, Saturday 7:30 a.m. - 11:00 a.m., April 25 - October 17","contact":"Jim Gulick","mail":"P.O. Box 662, Bolivar, MO 65613","email1":"berrypatch1@windstream.net","email2":"","web":"","phone1":"417-777-4586","phone1_note":"","phone2":"","phone2_note":"","directions":"Locust and Main--from the downtown square, go 3 blocks north on Main Street.","other":""},{"county":"Pulaski","city":"Richland","name":"Better Lives Today Farmers' Market","startMonth":"5","endMonth":"8","openDays":"Saturday 8a.m.-noon, May - August","contact":"Florence Jarchow","mail":"P.O. Box 496 Richland, MO, 65556","email1":"flojarchow@gmail.com","email2":"","web":"http:\/\/betterlivestoday.org\/3.html","phone1":"573-765-2012","phone1_note":"","phone2":"","phone2_note":"","directions":"222 South Pine, Pine and McClurge in Richland MO ","other":""},{"county":"Putnam","city":"Unionville","name":"Putnam County Farmers Market","startMonth":"5","endMonth":"10","openDays":"Saturday 7:00 a.m. - 11:00 a.m., May 4 - October 26","contact":"Leta Torrey","mail":"14747 State Hwy 129, Unionville, MO 63565","email1":"","email2":"","web":"","phone1":"660-947-2067","phone1_note":"","phone2":"","phone2_note":"","directions":"North of 4-way stop on Highway 5 to city park, at the north shelter house.","other":""},{"county":"Randolph","city":"Clark","name":"Clark Produce Auction LLC","startMonth":"4","endMonth":"10","openDays":"Fridays in April, Tuesday and Friday in May - September, Fridays in October; All our auctions start at 10:30AM","contact":"Elmer Gingerich or Leo Kempf","mail":"1966 Highway Y, Clark, MO 65243","email1":"","email2":"","web":"http:\/\/agebb.missouri.edu\/hort\/auction\/clark.htm","phone1":"660-264-4555","phone1_note":"","phone2":"660-261-4553","phone2_note":"","directions":"Located on Highway Y 30 miles north of Columbia or 15 miles south of Moberly","other":""},{"county":"Randolph","city":"Moberly","name":"Moberly Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursday 3:00 p.m. - 7:00 p.m. May 7 - October 29","contact":"Dan Nelson","mail":"1210 Private Road 2717, Moberly, MO 65270","email1":"moberlyfarmersmarket@gmail.com","email2":"","web":"","phone1":"573-823-5452","phone1_note":"","phone2":"","phone2_note":"","directions":"Take Highway 62 to downtown (Route EE) exit. Turn west, which is Rollins Street. Drive past Morley Street under railroad overpass into old downtown. The market is on your right, on Strugeon Street at the Historic Depot Railroad Park.","other":""},{"county":"Ray","city":"Lawson","name":"Lawson Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursday 4:00 p.m - 7:00 p.m., 1st Thursday in May - October 31","contact":"Chrissy Craig","mail":"19502 N US 69 Hwy, Lawson, MO 64062","email1":"lawsonfarmersmarket@yahoo.com","email2":"","web":"","phone1":"816-296-1232","phone1_note":"","phone2":"","phone2_note":"","directions":"Downtown on the square, across from the Lawson Super grocery store.","other":""},{"county":"Ripley","city":"Doniphan","name":"Ripley County Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8 a.m. - noon, May - October","contact":"Tasha Miller","mail":"117 State St, Doniphan, MO 63935","email1":"tasha@freshfarmcsa.com","email2":"","web":"http:\/\/freshfarmcsa.com","phone1":"573-351-8988","phone1_note":"","phone2":"","phone2_note":"","directions":"State Street near Herritage Park, Doniphan MO","other":""},{"county":"Saline","city":"Marshall","name":"Market on the Square: A Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Saturday 8:00 a.m. - Noon, Memorial Day - Labor Day","contact":"Amy Crump and Kathy Fairchild","mail":"Marshall, MO 65340","email1":"mmotssc@gmail.com","email2":"","web":"","phone1":"660-886-3392","phone1_note":"","phone2":"660-886-2233","phone2_note":"","directions":"Northside of the downtown Marshall Square.","other":"Setup begins at 6:30 AM, vendors need to bring their own tables, canopies, etc."},{"county":"Saline","city":"Slater","name":"Slater\/Saline Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Tuesday and Friday 2:30 p.m. - 5:00 p.m.","contact":"Geary Norris","mail":"P.O. Box 12, Slater, MO 65349","email1":"gearynor@yahoo.com","email2":"","web":"","phone1":"660-529-2171","phone1_note":"","phone2":"","phone2_note":"","directions":"From Highway 240 west, cross the rail road tracks and make a right turn on to Front Street (it runs by the rail road tracks). Go 4 blocks to Main Street. Turn left on Main, go one block to the market on the NE corner of Main and Maple.","other":""},{"county":"Schuyler","city":"Lancaster","name":"Schuyler County Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - 2:00 p.m., May - Mid-October","contact":"Darla Campbell","mail":"P.O. Box 310, Lancaseter, MO 63548","email1":"CampbellD@missouri.edu","email2":"","web":"","phone1":"660-457-3469","phone1_note":"","phone2":"","phone2_note":"","directions":"Lancaster BP - from the intersection of Hwy. 136 and 63 in Lancaster, turn south for 1\/2 mile. BP is on the east side, along Hwy. 63.","other":""},{"county":"Scotland","city":"Memphis","name":"Scotland County Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Tuesday 3:00 p.m. - 6:00 p.m., May 11 - September 28","contact":"Gigi Wahba","mail":"Rt 1 Box 155, Rutledge, MO 63563","email1":"gigi@sandhillfarm.org","email2":"","web":"","phone1":"660-883-5543","phone1_note":"","phone2":"","phone2_note":"","directions":"Memphis Courthouse Square, SW corner. From Hwy 136\/ Hwy 15. Head north on 15 till you come to the Casey's. Turn right to square, 2 blocks. Right again to Market.","other":""},{"county":"Scotland","city":"Rutledge","name":"Rutledge Farmers' Market","startMonth":"6","endMonth":"9","openDays":"Saturday 9:00 a.m. - Noon, June - September","contact":"Alyson Ewald","mail":"7 Smith Rd, Rutledge, MO 63563","email1":"alyson@ic.org","email2":"","web":"","phone1":"660-883-5529","phone1_note":"","phone2":"","phone2_note":"","directions":"Town Park west of post office in downtown Rutledge.","other":""},{"county":"Scott","city":"Sikeston","name":"Downtown Sikeston Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - Sellout, May - October","contact":"Kathy Medley","mail":"105 East Center, Sikeston, MO 63801","email1":"kmedley@sikeston.org","email2":"","web":"","phone1":"573-481-9967","phone1_note":"","phone2":"","phone2_note":"","directions":"American Legion Park - Front St., Downtown Sikeston.","other":""},{"county":"St. Charles ","city":"Foristell","name":"Foristell Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 9:00 a.m. - 1:00 p.m., May 30 - October 30","contact":"Zell Setzer","mail":"1125 Dietrich Road, Foristell, MO 63348","email1":"admin@valleyfarms.info","email2":"","web":"http:\/\/www.valleyfarms.info\/home.htm","phone1":"636-463-1205","phone1_note":"","phone2":"","phone2_note":"","directions":"Take I-70 to Exit 203 (Foristell Exit). Go North on Hwy W for 1 Mile and take Left on Dietrich Rd. Follow Dietrich Road for 2 Miles. Valley Farms will be on your Left just over small bridge.","other":""},{"county":"St. Charles ","city":"O'Fallon","name":"O'Fallon Farmers' & Artists' Market","startMonth":"1","endMonth":"12","openDays":"contact seller","contact":"Wendy Glidden","mail":"PO Box 514, O'Fallon, MO 63366","email1":"ofallonfarmersmarket@gmail.com","email2":"","web":"","phone1":"636-293-1256","phone1_note":"","phone2":"","phone2_note":"","directions":"","other":""},{"county":"St. Charles ","city":"St. Charles","name":"St. Charles Lions Club Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 7:00 a.m. - Noon, May 16 - October 31","contact":"Gerry Shatro","mail":"907 Lindenwood, St. Charles, MO 63301","email1":"","email2":"","web":"","phone1":"636-723-2412","phone1_note":"","phone2":"","phone2_note":"","directions":"Take Riverside Drive 1 block north of Frontier Park in downtown St. Charles, on the riverfront.","other":""},{"county":"St. Francois City","city":"Farmington","name":"Farmington Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesday 2:00 p.m. - 5:00 p.m. May - October, Saturday 7:00 a.m. - 11:00 a.m. April 11 - October","contact":"Ginny Smith","mail":"15 Winchester Road, Farmington, MO 63640","email1":"vsmith@wildblue.net","email2":"ozora@brick.net","web":"","phone1":"573-756-2284","phone1_note":"","phone2":"","phone2_note":"","directions":"From Highway 67 take the Highway 32 East exit. Go about 1\/2 mile past the fourth stoplight to the VFW parking lot on Karsch Blvd.","other":""},{"county":"St. Louis","city":"Clayton","name":"Clayton Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:30 a.m. - Noon, May 23 - October 24","contact":"Trip Straub","mail":"15830 Fountain Plaza, Ellisville, MO 63017","email1":"trip@straubs.com","email2":"","web":"http:\/\/www.claytonfarmersmarket.com","phone1":"636-779-8500","phone1_note":"ext 246","phone2":"314-566-6011","phone2_note":"cell","directions":"From Interstate 170, take the Ladue Rd exit, heading east. Market is in the employee parking lot of Straub's Fine Grocers at 8282 Forsyth Blvd. Park in the Brown Shoe Company parking lot.","other":""},{"county":"St. Louis","city":"Ellisville","name":"Ellisville Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursday 4:00 p.m. - 7:00 p.m., May 13 - October 28","contact":"Rene Sackett","mail":"225 Kiefer Creek Rd, Ellisville, MO 63021","email1":"renewhatsup@yahoo.com","email2":"","web":"http:\/\/ellisville.mo.us\/farmersmarket","phone1":"314-435-9445","phone1_note":"","phone2":"","phone2_note":"","directions":"Bluebird Park in Ellisville.","other":""},{"county":"St. Louis","city":"Ferguson","name":"Ferguson Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - Noon, May - October","contact":"Kathleen Noelker","mail":"425 Wesley, Ferguson, MO 63135","email1":"knoelker@sbcglobal.net","email2":"","web":"http:\/\/www.fergusonfarmersmarket.com","phone1":"314-324-4298","phone1_note":"","phone2":"","phone2_note":"","directions":"20 S. Florissant Road, Ferguson, Missouri 63135. From 270, go south on Florissant Road for 2.15 miles. After passing under the train bridge, turn left on Spot Drive. From 70, go north on Florissant Road for 1.75 miles, then turn right on Spot Drive. Look for the Victorian Clock and Gazebo. Visit the website for a map.","other":""},{"county":"St. Louis","city":"Kirkwood","name":"Kirkwood Farmers' Market","startMonth":"4","endMonth":"9","openDays":"Monday - Friday 9:00 a.m. - 6:00 p.m, Saturday 8:00 a.m. - 5:00 p.m, April - September","contact":"Kori Thompson","mail":"130 E. Jefferson floor 2, Kirkwood, MO 63122","email1":"info@downtownkirkwood.com","email2":"","web":"http:\/\/www.downtownkirkwood.com","phone1":"314-822-0084","phone1_note":"","phone2":"","phone2_note":"","directions":"Conveniently located between Highway 40 and I-44 in St. Louis County at the intersection of E. Argonne Drive and Taylor Avenue at 150 East Argonne Drive. Located in the heart of Downtown Kirkwood.","other":"Contact market for winter hours and days. Saturday 8 a.m. to 5 p.m. and Sunday hours vary by vendor."},{"county":"St. Louis","city":"Maplewood","name":"Maplewood Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesday 4:00 p.m. - 7:00 p.m, April - October","contact":"Schlafly Bottleworks","mail":"7260 Southwest Blvd, Maplewood, MO 63143","email1":"farmersmarket@schlafly.com","email2":"","web":"","phone1":"314-241-2337","phone1_note":"","phone2":"","phone2_note":"","directions":"7260 Southwest Boulevard, Schlafly Bottleworks parking lot.","other":""},{"county":"St. Louis","city":"Overland","name":"Overland Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays May - October","contact":"Michael Oakes","mail":"P.O. Box 142728, Overland, MO 63114","email1":"moakes-jenahrealty@sbcglobal.net","email2":"","web":"http:\/\/overlandfarmersmarket.com","phone1":"314-769-6360","phone1_note":"","phone2":"","phone2_note":"","directions":"2500 Block of Woodson Rd.","other":""},{"county":"St. Louis","city":"St. Louis","name":"Delmar Food and Farm Market","startMonth":"1","endMonth":"12","openDays":"contact seller","contact":"Sandra Zak","mail":"4437 Laclede Ave, St. Louis, MO 63108","email1":"4100@charter.net","email2":"","web":"","phone1":"314-534-6166","phone1_note":"","phone2":"","phone2_note":"","directions":"The Delmar Loop in St. Louis MO.","other":""},{"county":"St. Louis","city":"St. Louis","name":"Sappington Farmers Market","startMonth":"1","endMonth":"12","openDays":"Monday - Saturday 7:00 a.m. - 9:00 p.m., Sunday 7:00 a.m. - 8:00 p.m.; year round","contact":"Patricia Cummings","mail":"8400 Watson Rd, St. Louis, MO 63119","email1":"anit@sappingtonfarmersmkt.com","email2":"","web":"http:\/\/www.sappingtonfarmersmarket.com","phone1":"314-843-7848","phone1_note":"","phone2":"","phone2_note":"","directions":"","other":""},{"county":"St. Louis","city":"St. Louis","name":"Carondelet Farmers Market","startMonth":"6","endMonth":"10","openDays":"Saturday 8:00 a.m. - 12:00 p.m., June - October","contact":"Sister Mary Ann Nestel","mail":"6408 Michigan Ave, St. Louis, MO 63111","email1":"nestelcsj@aol.com","email2":"","web":"","phone1":"314-752-6339","phone1_note":"","phone2":"","phone2_note":"","directions":"7701 S. Broadway, St. Louis MO.","other":""},{"county":"St. Louis","city":"University City","name":"Market in the Loop","startMonth":"1","endMonth":"12","openDays":"Thursday, Friday and Saturday, 7:00 a.m. - 6:00 p.m.; yearly","contact":"Dan Wald","mail":"8420 Delmar, Suite 406, St. Louis, MO 63124","email1":"rodanmgmt@aol.com","email2":"","web":"http:\/\/www.themarketintheloop.com","phone1":"314-991-3300","phone1_note":"","phone2":"","phone2_note":"","directions":"From Highway 40, take Hanley north to Delmar, go east to 6655 Delmar.","other":""},{"county":"St. Louis","city":"Warson Woods","name":"Warson Woods Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Tuesday 3:00 p.m. - 7:00 p.m, May - October","contact":"Sally Scott","mail":"10001 Manchester Rd, Warson Woods, MO 63122","email1":"emporium.stl@sbcglobal.net","email2":"","web":"http:\/\/www.warsonwoodsfarmersmarket.com","phone1":"314-909-0100","phone1_note":"","phone2":"","phone2_note":"","directions":"10001 Manchester Rd, front of Emporium in Warson Woods, MO.","other":""},{"county":"St. Louis","city":"Webster Groves","name":"Webster Groves Farmers' Market","startMonth":"5","endMonth":"10","openDays":"May - October","contact":"Angela Foley","mail":"4 E. Lockwood Avenue, Webster Groves, MO 63119","email1":"info@webstergrovesfarmersmarket.com","email2":"","web":"http:\/\/www.webstergrovesfarmersmarket.com","phone1":"314-963-5696","phone1_note":"ext. 888","phone2":"","phone2_note":"","directions":"The market is located on South Old Orchard Avenue near Gazebo Park at Big Ben and South Old Orchard Avenue.  From I-44E take Laclede Station Rd exit. Stay right, going back over the interstate. Turn left onto Big Bend Blvd. The market is the first left, at the light. From I-44W take Shrewsbury exit and turn right. Make another right onto Murdoch (4 blocks) going back over the interstate. Make a left onto Big Bend Blvd. The market is the first left at the light.","other":""},{"county":"St. Louis","city":"Wildwood","name":"Wildwood Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturdays 8:00 am to 1:30 pm, May - October","contact":"Glenn Gaehle","mail":"18538 Hardt Rd, Glencoe, MO 63038","email1":"wildwoodfarmersmarket@gmail.com","email2":"","web":"http:\/\/www.wildwoodfarmersmarket.com","phone1":"314-486-2562","phone1_note":"","phone2":"","phone2_note":"","directions":"Location of market - 221 Plaza Drive, Wildwood Town Center off Hwy 100 in Wildwood, MO 63040.","other":""},{"county":"St. Louis City","city":"South St. Louis","name":"Tower Grove Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:30 am to 12:30 pm, May - October","contact":"Patrick Horine","mail":"3877 Connecticut, St. Louis, MO 63116","email1":"contact@tgmarket.org","email2":"","web":"http:\/\/www.tgmarket.org","phone1":"314-772-3899","phone1_note":"","phone2":"","phone2_note":"","directions":"In the center of Tower Grove Park, just east of the Pool Pavilion.","other":""},{"county":"St. Louis City","city":"St. Louis","name":"St. Louis Community Farmers' Market","startMonth":"4","endMonth":"11","openDays":"Second Saturday of the month 9:00 a.m. - 1:00 p.m., November - April","contact":"Michael McLellan","mail":"4021 Wyoming Street, St. Louis, MO 63116","email1":"stlcfm@gmail.com","email2":"","web":"http:\/\/tinyurl.com\/stlcfm","phone1":"314-856-5557","phone1_note":"","phone2":"","phone2_note":"","directions":"St. John's Episcopal Church, 3664 Arsenal Street.","other":""},{"county":"St. Louis City","city":"St. Louis","name":"South Hampton Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - 1:30 p.m, May - October","contact":"Maria Gianino","mail":"7526 Big Bend Ave, St. Louis, MO 63119","email1":"sohafarmersmarket@yahoo.com","email2":"","web":"http:\/\/www.sohafarmersmarket.com","phone1":"314-647-4635","phone1_note":"","phone2":"","phone2_note":"","directions":"Hwy 40 or 44 to South Hampton. East on Chippewa, south on Macklind. Corner of Nottingham and Macklind in the heart of Macklind Ave Business District.","other":""},{"county":"St. Louis City","city":"St. Louis","name":"Soulard Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Wednesday through Friday 8:00 a.m. - 5:00 p.m., Saturday 6:00 a.m - 5:00 p.m.; yearly","contact":"","mail":"730 Carroll Street, St. Louis, MO 63104","email1":"market@stlouis.missouri.org","email2":"","web":"http:\/\/www.stlouis.missouri.org\/citygov\/soulardmarket","phone1":"314-622-4180","phone1_note":"","phone2":"","phone2_note":"","directions":"Located 1 mile south of downtown St. Louis on 7th Street. From Interstates 55 and 44, take the Park Avenue\/7th Street exit. From Highway 40, take the Broadway exit and follow signs to 7th Street. We are located at 7th and Lafayette.","other":""},{"county":"St. Louis City","city":"St. Louis","name":"North City Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Saturday 9:00 a.m. - Noon, First Saturday in June to last Saturday in October","contact":"Julia Weese-Young","mail":"2800 N. 14th Street, St. Louis, MO 63107","email1":"julia@northcityfarmersmarket.org","email2":"","web":"http:\/\/www.northcityfarmersmarket.org","phone1":"314-241-5031","phone1_note":"","phone2":"","phone2_note":"","directions":"Located at 14th Street Mall at the corner of N 14th Street & St Louis Ave across the street from Crown Candy Kitchen.","other":""},{"county":"Ste. Genevieve","city":"Ste. Genevieve","name":"Ste. Genevieve Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 7:00 a.m. - Noon, May - October","contact":"Jim Bruckerhoff","mail":"9951 N. Hwy 61, St. Mary, MO 63673","email1":"","email2":"","web":"","phone1":"573-543-2562","phone1_note":"","phone2":"","phone2_note":"","directions":"600 Market St. in Knights of Columbus pavillion.","other":""},{"county":"Ste. Genevieve","city":"Ste. Genevieve","name":"Crown Valley Farmers' Market","startMonth":"8","endMonth":"11","openDays":"7 days a week 8:00 a.m. - 3:30 p.m., In the fall, open Friday's until 5p.m.","contact":"Sarah Krannig","mail":"23889 State Rt, Ste. Genevieve, MO 63670","email1":"skrannig@crownvalleywinery.com","email2":"","web":"http:\/\/www.crownvalleywinery.com","phone1":"573-760-8876","phone1_note":"","phone2":"","phone2_note":"","directions":"23889 State Rt WW in Ste. Genevieve, MO.","other":""},{"county":"Stoddard ","city":"Bloomfield","name":"Bloomfield Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursday 4:00 p.m. - 6:00 p.m., May - October","contact":"Lara Thorn","mail":"16383 State Highway AC, Bloomfield, MO 63825","email1":"cotton@ldd.net","email2":"","web":"","phone1":"573-568-3507","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in the City Park, south of town on Prairie Street. From south: take Hwy 25 into Bloomfield, turn onto Hwy AA\/South Prairie Street.","other":""},{"county":"Stone ","city":"Crane","name":"Crane Creek Market 'Arts and Crops'","startMonth":"7","endMonth":"10","openDays":"Saturday 8:00 a.m. - 1:00 p.m., July - October","contact":"Margie Williams","mail":"P.O. Box 317, Crane, MO 65633","email1":"","email2":"","web":"","phone1":"417-723-5563","phone1_note":"","phone2":"","phone2_note":"","directions":"Turn west at the south end of Crane Creek bridge (City Park). Watch for signs.","other":""},{"county":"Stone ","city":"Galena","name":"Galena Farmers' and crafters' Market","startMonth":"5","endMonth":"9","openDays":"Fridays and Saturdays 8a.m.-2p.m., May - September","contact":"Paula Stewart","mail":"1074 Abesville, Galena, MO 65656","email1":"lstewartp@centurytel.net","email2":"","web":"","phone1":"417-357-6591","phone1_note":"","phone2":"","phone2_note":"","directions":"West side of square Swanson park in Galena MO 65656","other":""},{"county":"Taney ","city":"Branson","name":"Branson Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 7:00 a.m. - Noon, May 9 - October","contact":"Angela Walker","mail":"","email1":"events@downtownbranson.org","email2":"","web":"","phone1":"417-334-1548","phone1_note":"","phone2":"","phone2_note":"","directions":"114 West Pacific corner of Pacific and Business 65 on the corner of BR 65 and Atlantic Street.","other":""},{"county":"Taney ","city":"Forsyth","name":"Forsyth Farmers' Market","startMonth":"1","endMonth":"12","openDays":"Tuesdays, Thursdays, and Saturdays 7am-10am","contact":"Brian Atchley","mail":"14974 US Hwy 160 Ste. 4 Forsyth, MO, 65653","email1":"trilakeorchards@yahoo.com","email2":"","web":"","phone1":"417-230-3188","phone1_note":"","phone2":"","phone2_note":"","directions":"Across the street from Taney county Judicial Center in Forsyth MO","other":""},{"county":"Taney ","city":"Rockaway Beach","name":"Rockaway Beach Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Saturday 8:00 a.m. - 2:00 p.m., April - October","contact":"Tom Nowacki or Sue Riggs (alternate)","mail":"P.O. Box 463, Rockaway Beach, MO 65740","email1":"thomass_n@yahoo.com","email2":"beachhousecafe@centurytel.net","web":"","phone1":"417-546-2744","phone1_note":"","phone2":"","phone2_note":"","directions":"Directions from Hwy 65 to us 160 East (Forsyth) exit, to Hwy 176 East, Follow the signs to Rockaway Beach.","other":""},{"county":"Texas ","city":"Cabool","name":"Cabool Area Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Wednesday 11:00 a.m. - 4:30 p.m., April - October","contact":"Deborah French","mail":"2575 Limestone Dr., Mtn. Grove, MO 65711","email1":"gpicker@centurytel.net","email2":"","web":"http:\/\/caboolfarmersmarket.wordpress.com","phone1":"417-926-4226","phone1_note":"","phone2":"","phone2_note":"","directions":"Located corner of Main & Cedar Streets in Gateway Park in Cabool, MO.","other":""},{"county":"Vernon ","city":"Nevada","name":"Nevada\/Vernon County Market Square Days","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - Noon, May 9 - October, Wednesday 5:30 p.m. - 7:00 p.m. June - October","contact":"Janet Wray and Leslie Carroll-Bartlett","mail":"225 West Austin, Suite 200, Nevada, MO 64772","email1":"janetwray@sbcglobal.net","email2":"caroll-barlettl@missouri.edu","web":"","phone1":"417-448-1212","phone1_note":"","phone2":"","phone2_note":"","directions":"Located on the north lawn of the courthouse in Nevada.","other":""},{"county":"Warren ","city":"Warrenton","name":"Warrenton Farmers' Market","startMonth":"7","endMonth":"10","openDays":"Saturdays 8a.m.-11a.m., July - October 2012","contact":"Lyndsay Degraaf","mail":"20 W. Boonslick Warrenton, MO 63383","email1":"specialevents@warrenton-mo.org","email2":"","web":"http:\/\/www.warrenton\/mo.org","phone1":"636-456-3535","phone1_note":"","phone2":"","phone2_note":"","directions":"Located behind City Hall, 200 W. Boonslick, Warrenton, MO 63383. Take I-70 to exit 193, go South on Hwy 47, turn right o Main Street.  Main Street becomes Boonslick, turn left on West Street.  The hometown market is at the corner of West Street and Walton Street. ","other":""},{"county":"Warren ","city":"Wright City","name":"Warren County Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Thursday 4:00 p.m. - 6:30 p.m., May 20 - October 14","contact":"Irv Huser","mail":"17736 Keller Drive, Wright City, MO 63390","email1":"","email2":"","web":"","phone1":"636-456-3066","phone1_note":"","phone2":"","phone2_note":"","directions":"Market is located at Diekroeger Park.","other":""},{"county":"Washington ","city":"Potosi","name":"Health Department - Washington County Farmers' Market","startMonth":"7","endMonth":"10","openDays":"Wednesday 7:30 a.m. - 2:00 p.m., July - October","contact":"Shawnee Douglas","mail":"310 Cedar Drive, Potosi, MO 63664","email1":"","email2":"","web":"","phone1":"573-438-2164","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in Potosi at the Washington County Health Department parking lot, at Purcell Drive off Highway 21 North.","other":""},{"county":"Washington ","city":"Potosi","name":"Courthouse - Washington County Farmers' Market","startMonth":"6","endMonth":"10","openDays":"Saturday 7:30 a.m. - Noon, June - October","contact":"Shawnee Douglas","mail":"310 Cedar Drive, Potosi, MO 63664","email1":"","email2":"","web":"","phone1":"573-438-2164","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in Potosi at the intersection of North Missouri and High Street at the Washington County Courthouse parking lot.","other":""},{"county":"Webster ","city":"Fordland","name":"Fordland Farmers' Market","startMonth":"4","endMonth":"10","openDays":"Saturdays 7am-noon, April 28-October","contact":"Becky Horman or Wendy Davis","mail":"Fordland City Park, Fordland, MO 65652","email1":"becky@fordlandclinic.org","email2":"","web":"","phone1":"417-767-4411","phone1_note":" (Home Pride Bank)","phone2":"","phone2_note":"","directions":"","other":""},{"county":"Webster ","city":"Marshfield","name":"Marshfield Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Friday 3:00 p.m. - 7:00 p.m., May - October","contact":"Sue DeWitt","mail":"503 Macedonia Road, Niangua, MO 65713","email1":"jsdewitt@centurytel.net","email2":"","web":"","phone1":"417-473-6910","phone1_note":"","phone2":"","phone2_note":"","directions":"Located in the Orscheln parking lot at 1311 Spur Drive in Marshfield.","other":""},{"county":"Webster ","city":"Seymour","name":"Seymour Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Saturday 8:00 a.m. - Sellout, Mid-May - October","contact":"Dorothy King","mail":"828 W. Thoroughfare Street, Seymour, MO 65746","email1":"","email2":"","web":"","phone1":"417-935-2478","phone1_note":"","phone2":"","phone2_note":"","directions":"Across the street from Seymour McDonalds at the junction of Highway 60 and Clinton Street.","other":""},{"county":"Wright","city":"Hartville","name":"Hartville Farmers' Market","startMonth":"5","endMonth":"9","openDays":"Thursday 7:30 a.m. - 11:00 a.m., Saturday 7:00 a.m. - 12:00 p.m., May - September","contact":"Cody & Dawnnell Holmes","mail":"6156 Curtner Rd, Norwood, MO 65717","email1":"cdholmes@hughes.net","email2":"","web":"","phone1":"417-259-2456","phone1_note":"(417-259-CHKN)","phone2":"","phone2_note":"","directions":"Located on the Hartville courthouse square at the intersections of Highways 5 and 38.","other":""},{"county":"Wright","city":"Mountain Grove","name":"Mountain Grove Farmers' Market","startMonth":"5","endMonth":"10","openDays":"Tuesday and Thursday 2:00 p.m. - 6:00 p.m., Saturday 7:00a.m. - Noon, May - October","contact":"Bob Long","mail":"2299 Stone Ridge Dr., Mountain Grove, MO 65711","email1":"","email2":"","web":"","phone1":"417-926-7813","phone1_note":"","phone2":"","phone2_note":"","directions":"From Highway 60, take south Highway 95 and follow to the Mountain Grove Square.","other":""}]);

dc.registerData('produce', [{"name":"Apples","imageName":"apple","type":"Fall","inSeason":"July to November","generalInfo":"Apples are a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Apples also provide potassium and fiber. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Potassium, Fiber","choose":"Choose apples that are firm, with no soft spots or wrinkled skin.","store":"In a cool, dry place or in a plastic bag in the crisper of your refrigerator. Store apples separate from foods with strong flavors or odors, as apples may pick up odors and flavors of other foods. When stored properly, apples can keep up to 1 month.","prepare":"Rinse well and eat plain or use in your favorite recipe.","serving":"Slice and serve with cinnamon, chopped nuts, cheese slices, peanut butter, or with dips like yogurt, cheese sauce or ranch dressing. Add chopped apples to a tuna or chicken salad, oatmeal or cold cereal, pancake or quick bread batters, or vegetable salad like a carrot-raisin or green salad. Grate apples and add them to meatloaf, meatballs, peanut butter or your favorite sandwich spread. Bake apples with sweet potatoes or winter squash. Saute apple slices with pork."},{"name":"Asparagus","imageName":"asparagus","type":"Spring","inSeason":"April to May","generalInfo":"Asparagus is a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. The vitamin A in asparagus helps maintain eye health. Vitamin C protects skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Asparagus also provides potassium, vitamin K and fiber. Potassium helps maintain healthy blood pressure, vitamin K helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular. Asparagus is also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects.","vitamins":"Vitamin A, Vitamin C, Vitamin K, Potassium, Fiber, Folate","choose":"Crisp, round spears. The tips should be pointed and tightly closed. Asparagus spears should be the same thickness so looking times for all spears will be similar.","store":"In the refrigerator. Cut off 1 inch from the end and place upright in 1 inch of water or in a plastic bag with the ends wrapped in a wet cloth or paper towel. Use within 2 to 3 days.","prepare":"Clean asparagus under cool running water. If the tips have sand or dirt in them, dunk the tips in and out of water, then rinse well. Trim off any tough or white ends.","serving":"Blanch by putting asparagus spears or pieces in boiling water, then reduce heat and cook uncovered for 2 to 5 minutes. The asparagus is done when it can be easily pierced with a sharp knife point. To keep asparagus green and crisp after cooking, run it under cold water or dip in bowl of ice water to set the color. Top with butter, lemon or grated Parmesan cheese. Add asparagus to an omelet, a favorite stir-fry or pasta dish. Asparagus can also be grilled, roasted or microwaved."},{"name":"Beets","imageName":"beets","type":"Spring","inSeason":"May to June and September to November","generalInfo":"Beets are a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects. Beets also provide potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular. Beet greens are a source of vitamin K, calcium and magnesium which help build and maintain strong bones. Vitamin A in beet greens helps maintain eye health.","vitamins":"Folate, Potassium, Magnesium, Fiber, Calcium, Vitamin K, Vitamin A","choose":"Beets that are similar in size, smooth, round and are a deep red color. If available, choose beets with fresh, dark green tops.","store":"Cut leaves from roots. Wash greens in a cool water bath and swish until dirt and sand is removed. Drain leaves and wrap in a paper towel. Store wrapped greens in a perforated plastic bag in the crisper. Store roots in a plastic bag in the refrigerator 2 to 3 weeks.","prepare":"Clean beets gently to prevent tearing the thin skins. Cook before cutting or peeling to retain color and flavor.","serving":"Roasting is the best way to keep the sweet taste. To roast, rub a light coat of olive oil on the skins, wrap each beet in foil and roast for 1 hour at 400 degrees F. Add grated raw beets to a salad just before serving because beets stain other vegetables. Add thin-cut strips of beet leaves to soups. Add grated or sliced raw beets to salads or soups."},{"name":"Bell Peppers","imageName":"bell_peppers","type":"Summer","inSeason":"July to October","generalInfo":"Peppers are a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Peppers also provide potassium and fiber. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular. Peppers are also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects.","vitamins":"Vitamin C, Fiber, Potassium, Folate","choose":"Choose firm peppers with good color and smooth skin.","store":"In the refrigerator and use within 3 to 5 days. Bell peppers can be frozen whole or chopped for longer storage.","prepare":"Clean well and remove seeds and stem.","serving":"Grill or roast green peppers in the oven until tender. Remove the skin and discard. Puree peppers in a blender with mayonnaise. Serve with cold chicken. Roasting peppers makes it easy to remove the skin and gives peppers a deep, sometimes smoky flavor. Home roasted peppers have much less sodium than jarred roasted peppers."},{"name":"Blackberries","imageName":"blackberries","type":"Summer","inSeason":"July to October","generalInfo":"Blackberries are a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Blackberries also provide potassium, vitamin K, magnesium and fiber. Potassium helps maintain healthy blood pressure, vitamin K and magnesium help build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Vitamin C, Vitamin K, Potassium, Magnesium, Fiber","choose":"Choose blackberries that are dry, firm and well shaped.","store":"In the refrigerator in the original container or on a plate covered with plastic wrap for up to 1 week. To freeze, place berries in a single layer on a cookie sheet and put in the freezer until the berries are frozen. Place in freezer bags and use within 1 year.","prepare":"Rinse berries before use.","serving":"Eat plain or on top of cereal, yogurt or ice cream."},{"name":"Blueberries","imageName":"blueberries","type":"Summer","inSeason":"June to September","generalInfo":"Blueberries are a source of potassium, fiber and vitamin K. Potassium helps maintain healthy blood pressure, fiber helps control cholesterol and keeps you regular, and vitamin K contributes to bone health.","vitamins":"Vitamin K, Potassium, Fiber","choose":"Choose plump blueberries with a silver frost. Colors may range from blue, black, bluish-black or purple.","store":"In the refrigerator for 5 to 6 days. For longer storage, freeze them in a single layer on a baking sheet, then transfer them to a freezer bag. Frozen blueberries are best used within 1 year.","prepare":"Rinse blueberries just before using.","serving":"Add blueberries to cereal, oatmeal or yogurt. Layer blueberries, yogurt and granola to make a parfait. Use blueberries for pie filling, jam, jelly, syrup or juice."},{"name":"Broccoli","imageName":"broccoli","type":"Spring","inSeason":"May to August and September to November","generalInfo":"Broccoli is a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. The vitamin A in broccoli helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Broccoli is also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects. Broccoli also provides calcium, magnesium, vitamin K, potassium and fiber. Calcium, magnesium and vitamin K help build and maintain strong bones, potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Vitamin C, Vitamin K, Folate, Magnesium, Potassium, Fiber","choose":"Florets should be firm, compact and dark blue-green in color.","store":"Unwashed in an air-tight bag in the refrigerator up to 4 days.","prepare":"Clean broccoli under cool running water just before preparing. Trim leaves and end of stalk. Cut apart spears or cut off the florets and slice the stalks.","serving":"Blanch broccoli uncovered in boiling water for 3 to 5 minutes. Drain and plunge broccoli into cold water, drain. Sprinkle with lemon juice. Add to pasta, pizza or scrambled eggs. Microwave broccoli in a covered dish with 1\/4 cup water for 2 to 3 minutes. Stir-fry broccoli florets and stalks cut into 1- to 2-inch strips in 1 teaspoon of oil for each cup of broccoli. Steam broccoli in a steamer basket over 1 inch of boiling water. Cover and steam until tender."},{"name":"Cabbage","imageName":"cabbage","type":"Spring","inSeason":"May to August and September to November","generalInfo":"Cabbage is a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C protects skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Cabbage also provides potassium, vitamin K, magnesium and fiber. Potassium helps maintain healthy blood pressure, vitamin K and magnesium help build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Potassium, Vitamin K, Magnesium, Fiber","choose":"Choose red or green cabbage that has a tight, compact head and that feels heavy for its size. Leaves should look crisp with few loose leaves and the stem should be dry.","store":"Whole heads of cabbage in the crisper of the refrigerator. If uncut, cabbage heads should last a few weeks. Leafy cabbage should be used in a few days. Do not rinse until ready to use.","prepare":"Cabbage is used in dishes for its naturally spicy flavor and is widely consumed raw, cooked or preserved. Cut into quarters and rinse. If shredding, remove the core. Otherwise, leave the core intact to prevent leaves from tearing apart.","serving":"Cook cabbage in soups, stews or in cabbage rolls. Enjoy cabbage raw in coleslaw."},{"name":"Cantaloupe","imageName":"cantaloupe","type":"Summer","inSeason":"July to October","generalInfo":"Cantaloupe is a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Cantaloupe also provides potassium and fiber. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Vitamin C, Potassium, Fiber","choose":"Choose firm melons with no soft spots. Cantaloupe should have a sweet smell where the fruit separates from the stem of the vine.","store":"Ripened melons in the refrigerator and use within 3 to 5 days.","prepare":"Wash the outside of the melon, slice and remove seeds from center of melon.","serving":"Cantaloupe is good raw or mixed with other fruits."},{"name":"Carrots","imageName":"carrot","type":"Spring","inSeason":"May to June and September to November","generalInfo":"Carrots are a source of vitamin A, an antioxidant that may reduce your risk of heart disease and certain cancers. The vitamin A in carrots helps maintain eye health. Carrots also provide potassium, vitamin K and fiber. Potassium helps maintain healthy blood pressure, vitamin K helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Vitamin K, Fiber, Potassium","choose":"Choose carrots with a deep orange color that are firm and without splits","store":"Carrots in the refrigerator in a plastic bag, where they will keep up to 2 weeks. If tops are still attached, twist or cut them off.","prepare":"Scrub carrots with a vegetable brush under running water. Cut off the top end of the carrot. Peel, if desired.","serving":"Enjoy raw carrots in a variety of shapes including angle cut, coins, match sticks or shredded. Add grated carrots to a variety of things like slaw, salads, muffins, cake, soft cookies, sweet bread batters, meat loaf, meatballs or spaghetti sauce. Add carrot chunks to stews, soups or pot roasts. Stir-fry match-stick cut carrots or steam with green beans. After cooking, add a little margarine and ginger, cinnamon, curry powder, a drizzle of honey, orange juice concentrate or a splash of lemon juice. Add grated carrots to muffins, cakes, soft cookies or sweet bread batters."},{"name":"Cauliflower","imageName":"cauliflower","type":"Spring","inSeason":"May to June and September to November","generalInfo":"Cauliflower is a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. The vitamin C in cauliflower helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Cauliflower is also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects. Cauliflower also provides potassium, vitamin K and fiber. Potassium helps maintain healthy blood pressure, vitamin K helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Vitamin K, Folate, Fiber, Potassium","choose":"Choose white, firm heads, without brown spots or bruises.","store":"In a perforated plastic bag in the refrigerator and use within 3 to 5 days.","prepare":"Rinse cauliflower, trim leaves and remove center core. Cut or break into florets, if desired.","serving":"Raw or blanched with a dip. To blanch cauliflower, put florets in boiling water seasoned with 1 tablespoon of lemon juice for about 1 minute and then place in ice water to chill. Steam a whole head for 15 minutes until crisp and tender or steam florets for 7 to 10 minutes. Serve with lemon butter or cheese sauce. Microwave on high with 2 tablespoons of water for 8 to 10 minutes for a whole head or 4 to 6 minutes for florets. Season with warm olive oil, garlic and oregano. Stir-fry cauliflower in 1 to 2 tablespoons of olive oil for 3 to minutes. Enjoy with soy sauce or teriyaki sauce."},{"name":"Cherries","imageName":"cherries","type":"Summer","inSeason":"May to June","generalInfo":"Cherries are a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Cherries also contain fiber, which helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Fiber, Potassium","choose":"Choose cherries that are firm and uniformly red.","store":"Refrigerate loosely packed, unwashed cherries in a plastic bag or in a single layer on a plate covered in plastic wrap. Cherries can be refrigerated up to 1 week. To freeze: Rinse and drain cherries, then spread them on a cookie sheet in a single layer. Place them in the freezer. Once frozen, put cherries into a freezer container and keep up to 1 year.","prepare":"Rinse cherries under cold water. To pit cherries, halve the cherry with a paring knife and remove pit with the tip of knife.","serving":"Simmer with sugar, cinnamon and lemon zest until fruit is slightly soft and heated. Strain and chill to make a syrup topping for ice cream or waffles."},{"name":"Cucumbers","imageName":"cucumbers","type":"Summer","inSeason":"July to October","generalInfo":"Cucumbers provide potassium, vitamin K, magnesium and fiber. Potassium helps maintain healthy blood pressure, vitamin K and magnesium help build and maintain strong bones, and fiber helps control cholesterol and keeps you regular. Most of the nutrients in a cucumber are found in the skin.","vitamins":"Vitamin K, Potassium, Magnesium, Fiber","choose":"Choose firm, green and slender cucumbers. Avoid cucumbers that have soft spots or wrinkled skin.","store":"Unwashed cucumbers in a moisture-proof bag in the refrigerator up to 1 week.","prepare":"Rinse cucumbers in cool running water. Wipe off any visible dirt. You may wish to remove the seeds of older cucumbers by slicing lengthwise and scooping seeds out with a spoon.","serving":"Add sliced cucumbers to salads or sandwiches. Chop or grate and season with yogurt and vinegar or lemon, dill or tarragon. Keeping cucumber skins on in your recipes will boost the nutrient value of your meal. Most of the nutrients in a cucumber are found in the skin."},{"name":"Eggplant","imageName":"eggplant","type":"Summer","inSeason":"July to October","generalInfo":"Eggplant provides potassium and fiber. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular. Eggplant is also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects.","vitamins":"Potassium, Fiber, Folate","choose":"Choose deeply colored eggplants with bright green stems. The skin on the eggplant should be taut, shiny, firm and without wrinkles. Eggplant should be firm and heavy for their size.","store":"In the refrigerator up to 5 days.","prepare":"Trim off the ends. You may also want to peel the eggplant as the skin can be tough and bitter.","serving":"Prick skin and bake whole eggplant at 400 degrees F for 30 to 40 minutes. To stuff, bake eggplant for 20 minutes, then scoop out seeds. Stuff and cook again for 15 minutes. To saute, place in oil and saute until browned. Eggplant can be steamed in more than 1 inch of water for 15 to 30 minutes. To grill or broil, cut eggplant into 1\/4 inch slices, brush with olive oil and cook for 4 to 5 minutes on each side. To microwave, prick and cook for 10 minutes on high. Turn over halfway through cooking time."},{"name":"Garlic","imageName":"garlic","type":"Summer","inSeason":"June to November","generalInfo":"Garlic is very low in Saturated Fat, Cholesterol and Sodium. It is also a good source of Calcium, Phosphorus and Selenium, and a very good source of Vitamin C, Vitamin B6 and Manganese.","vitamins":"Vitamin B6, Vitamin C, Calcium, Iron, Manganese, Phosphorus, Selenium","choose":"Garlic heads that are firm to the touch, with no nicks or soft cloves. Dark, powdery patches under the skin indicate a common mold which will eventually spoil the flesh.","store":"Unpeeled heads of garlic in an open container in a cool, dry place away from other foods. Do not refrigerate or freeze unpeeled garlic. Properly stored garlic can keep up to 3 months.","prepare":"To peel a garlic clove, place it on a cutting board on its side and gently press down quickly with the flat side of a butcher knife. The skin should then easily peel off. As garlic ages, it shrivels inside the skin, making it easier to peel. To peel large amounts of garlic, try cooking whole bulbs at 300 degrees F until the cloves open, then peel.","serving":"To roast, wrap garlic in aluminum foil and roast for 30 to 45 minutes at 350 F. Spread roasted garlic like butter on bread."},{"name":"Green Beans","imageName":"green_beans","type":"Summer","inSeason":"June to October","generalInfo":"Green beans are a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Green beans also provide potassium, vitamin K, magnesium and fiber. Potassium helps maintain healthy blood pressure, vitamin K and magnesium help build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C,  Vitamin K, Potassium, Magnesium, Fiber","choose":"Choose beans with a vivid color, velvety feel and firm texture. When broken they should snap crisply. Do not buy beans that are limp, oversized, split, or have rust spots or scars. If the seeds are bulging inside the pod, they are too mature.","store":"In a plastic bag in the refrigerator crisper. They will stay fresh 3 to 5 days.","prepare":"Clean the beans, then snap or trim off the stem. Leave the beans whole for cooking or snap them into 1- to 2-inch lengths.","serving":"Lightly saute minced onion, garlic or sliced mushrooms in a little margarine or oil. Add cooked green beans and toss until coated. To blanch or boil, bring water to a boil and drop in a handful of beans. Cook 3 to 8 minutes or until desired doneness. Drain and serve while the beans are still crisp and tender. To microwave, place a pound of beans in a microwave-safe dish with 1\/4 cup water. Cover and cook on high power for 5 to 10 minutes. Stir-fry green beans in 1 teaspoon oil for every cup of beans cut in 2-inch pieces. Cook for 2 minutes until crisp and tender."},{"name":"Greens","imageName":"greens","type":"Spring","inSeason":"May to June and September to November","generalInfo":"Greens are the best food source of vitamin K. They also contain calcium, magnesium, vitamin A, folate and fiber. Vitamin K, calcium and magnesium help build and maintain strong bones. Vitamin A helps maintain eye health and folate may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects. Fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin K, Vitamin A, Fiber, Folate, Calcium, Magnesium","choose":"Choose dark green leaves that are springy, fresh looking and with no yellowed edges.","store":"Unwashed, wrapped in a damp paper towel in a perforated plastic bag in the refrigerator. Change the towel to keep it damp. Use greens within 1 week.","prepare":"Wash well to rinse off any dirt clinging to the underside of the leaves.","serving":"Blanch in boiling water for 8 to 10 minutes, then drain. Chop blanched greens and gently press to remove water. Season with red wine vinegar."},{"name":"Kohlrabi","imageName":"kohlrabi","type":"Spring","inSeason":"May to June and September to November","generalInfo":"Kohlrabi is a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C protects skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Kohlrabi also provides potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Potassium, Magnesium, Fiber","choose":"Choose small firm kohlrabi with tender skin and crisp leaves. Large kohlrabi can be tough and strong tasting.","store":"Once the leaves and stems are removed, kohlrabi can be stored for several weeks in the refrigerator in perforated plastic bags. To extend its storage life, place kohlrabi in sealed plastic containers.","prepare":"Cut off the leaves and stems, then peel the kohlrabi.","serving":"Chop kohlrabi into chunks or sticks to eat raw with dip. You can also add kohlrabi to stews, soups, casseroles or shred in and put it in coleslaw."},{"name":"Lettuce","imageName":"lettuce","type":"Spring","inSeason":"April to July and September to November","generalInfo":"Lettuce is a source of vitamin A, an antioxidant that may reduce your risk of heart disease and certain cancers. The vitamin A in lettuce helps maintain eye health. Lettuce also provides potassium, vitamin K and folate. Potassium helps maintain healthy blood pressure, vitamin K helps build and maintain strong bones, and folate may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects. Types of Lettuce include: Boston, Radicchio, Endive, Lambs, Butter, Red leaf, Green leaf, Romaine, Iceberg, Escarole.","vitamins":"Vitamin A, Vitamin K, Potassium, Folate","choose":"Choose butterhead and crisphead lettuces that are crisp with pale green outer leaves and pale yellow green inner leaves. Choose loose leaf lettuces that are dark in color with crisp, whole unbroken leaves with no wilting or spoiling.","store":"Unwashed in a plastic bag in the refrigerator. Use within 3 to 5 days. Avoid storing lettuce with apples, pears or bananas as these fruits give off ethylene gas that is a natural ripening agent and can cause lettuce to get brown spots and decay.","prepare":"Rinse lettuce in cold water and pat dry with a clean towel. Tear lettuce into pieces. Avoid cutting lettuce leaves in advance to maintain vitamin C levels and prevent early browning of leaves.","serving":"Lettuce is almost always eaten raw in salads or on sandwiches. Tossed salads can combine lettuce with chopped vegetables like tomatoes, cucumbers, carrots, onions or peppers. Salads may also include fresh or dried fruit like raspberries, blueberries, apples or pears; cheese like feta, Gorgonzola, grated cheddar or Parmesan; and nuts like walnuts, almonds or pecans. Finish with a simple vinaigrette dressing. Mix together 1 tablespoon of red wine vinegar and 3 tablespoons of extra virgin olive oil and drizzle over lettuce. Lettuce can also be steamed or added to soups at the end of cooking."},{"name":"Okra","imageName":"okra","type":"Summer","inSeason":"July to October","generalInfo":"Okra provides vitamin A, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Okra is also a source of vitamin K, calcium, magnesium and potassium. Vitamin K, calcium and magnesium help build and maintain strong bones, and potassium helps maintain healthy blood pressure. Okra is also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects.","vitamins":"Vitamin A, Vitamin K, Calcium, Magnesium, Potassium, Folate","choose":"Pods that are deep green and not woody. Slightly push tip of okra over with your finger. If it flexes and does not break this usually means the okra is not woody.","store":"In a paper bag or wrapped in a paper towel and placed inside a perforated plastic bag. Okra can be stored in the refrigerator for 2 to 3 days. For longer storage, blanch the okra whole and freeze.","prepare":"Clean okra, trim the stem and tip off.","serving":"Grill or roast by tossing okra with enough olive oil to coat the pods, then grill each side on medium heat for 7 to 8 minutes. Braise okra after trimming the caps and tips. Cut pods into thick slices and add to soups and stews. Do not use cast iron, aluminum or exposed copper pots for cooking okra because okra cooked in those containers will turn black."},{"name":"Onions, dry","imageName":"onions","type":"Summer","inSeason":"May to November","generalInfo":"Onions provide potassium and magnesium. Potassium helps maintain healthy blood pressure, and magnesium helps build and maintain strong bones. Why onions make you cry: Sulfer compounds in onions release vapors which cause your eyes to water to wash away the irritant. Yellow onions have a higher sulfer content and make you cry more than milder varieties like white and red onions.","vitamins":"Potassium, Magnesium","choose":"Choose onions that are firm and have a hard, dry skin.","store":"Onions should be stored in a cool, dry, dark place.","prepare":"Onions can be eaten raw or added to any recipe to add flavor.","serving":"To make sweet dark brown caramelized onions, cook thin slices of yellow onion with a pinch of salt in olive oil over medium heat. Stir and add a small amount of water to prevent sticking."},{"name":"Onions, green","imageName":"onions_green","type":"Spring","inSeason":"May to November","generalInfo":"Green onions are a source of vitamin K, which helps build and maintain strong bones. Scallions are immature bulb onions. True scallions have no bulb.  Green onions, or spring onions, have more of a bulb than scallions, although the terms are commonly used interchangeably. They have a 1- to 2-inch bulb with green tops.  Green onions with smaller bulbs are sweet while the larger bulbs are more pungent.","vitamins":"Vitamin K","choose":"Choose onions with healthy bright green tops that look crisp.","store":"In the refrigerator for up to 1 week.","prepare":"Wash and cut off root end.","serving":"Green onions become stronger in flavor with age and increasing size. They can be eaten raw or used in soups, stews and in combination with vegetables and meats."},{"name":"Peaches","imageName":"peach","type":"Summer","inSeason":"June to August","generalInfo":"Peaches are a source of vitamin A, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Peaches are also a source of potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Potassium, Magnesium, Fiber","choose":"Choose firm peaches that give to a little gentle pressure. Choose a peach that has a strong sweet smell.","store":"In a plastic bag in the refrigerator. Peaches will keep between 3 to 5 days. If a peach needs to ripen, place the peach in a brown bag at room temperature. To keep cut peaches from browning, drizzle with lemon or orange juice.","prepare":"Rinse peach when ready to use.","serving":"Eat whole like an apple or cut into slices."},{"name":"Peas","imageName":"peas","type":"Spring","inSeason":"May to June","generalInfo":"Peas are a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Peas also provide potassium, vitamin K, magnesium and fiber. Potassium helps maintain healthy blood pressure, vitamin K and magnesium help build and maintain strong bones, and fiber helps control cholesterol and keeps you regular. Peas are also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects. Sugar snap peas have edible pods.","vitamins":"Vitamin A, Vitamin C, Vitamin K, Potassium, Magnesium, Fiber, Folate","choose":"Choose pods that are green and not to thick.","store":"In the refrigerator and use within 3 to 5 days.","prepare":"Remove stem on snow and sugar snap pea pods.","serving":"Eat raw, steamed or boiled. Steam for 2 to 3 minutes. Shell peas can be cooked in their pod or can be shelled and then cooked. The shells of snow and sugar snap peas can be eaten raw or cooked."},{"name":"Potatoes","imageName":"potato","type":"Summer","inSeason":"June to December","generalInfo":"Potatoes are a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Potatoes are also a source of potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Potassium, Magnesium, Fiber","choose":"Choose clean, firm, smooth, potatoes that are not green in color and don't have sprouts.","store":"In a cool, dark place with good ventilation for up to 1 month. Throw away potatoes that are shriveled or sprouted.","prepare":"Wash potatoes well.","serving":"Pierce with fork and bake potatoes whole. Top with salsa, vegetables, chili, yogurt, chives or cheese. Chop potatoes and add pieces to soups and stews. Pierce with a fork and microwave on high power 4 to 6 minutes, turning once. Let stand 2 minutes. Baking time can vary, depending on size, shape, temperature and variety of potato. Peel and cut into large chunks. Boil until easily pierced with fork. Drain and mash with milk and butter. Keeping potato skins on in your recipes will boost the nutrient value of your meal. Most of the nutrients in a potato are found in the skin."},{"name":"Pumpkin","imageName":"pumpkin","type":"Fall","inSeason":"August to November","generalInfo":"Pumpkin is a source of vitamin A, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin A also helps maintain eye health. Pumpkin is also a source of potassium, vitamin K, magnesium and fiber. Potassium helps maintain healthy blood pressure, vitamin K and magnesium help build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Vitamin K, Potassium, Magnesium, Fiber","choose":"Choose well-shaped pumpkins that are firm and slightly heavy.  They should have tough skin without any wrinkles or blemishes.","store":"In a cool, dry place. Whole unblemished pumpkins can be stored for 3 to 6 months at 45 to 50 degrees F.","prepare":"Wash pumpkin, cut and remove seeds.","serving":"To bake, cut in half. For larger pumpkins, cut into quarters and place pumpkin pieces in a shallow baking dish. Bake at 350 F for 30 minutes to 1 hour or microwave on high for 15 minutes. Pumpkin is done when it is tender. Mash with brown sugar or maple syrup and a little butter. Puree and serve as the base of a savory soup or in a sweet pie. Pumpkins can also be peeled, diced and boiled for 25 to 30 minutes. Spread on toast and top with cinnamon and sugar."},{"name":"Radishes","imageName":"radishes","type":"Spring","inSeason":"April to June and September to November","generalInfo":"Radishes are a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Radishes also contain potassium and folate. Potassium helps maintain healthy blood pressure and folate may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects.","vitamins":"Vitamin C, Potassium, Folate","choose":"Choose well-formed radishes without black spots and a crisp texture. If greens are still attached, they should be fresh and a dark green color.","store":"Radishes in plastic bags in the refrigerator for 5 to 7 days. Before storing, cut the green tops off.","prepare":"Scrub under cool running water. Trim the top and bottom root off of the radish. Radishes do not need to be peeled.","serving":"Radishes can be eaten raw - toss slices on top of a salad."},{"name":"Raspberries","imageName":"raspberry","type":"Summer","inSeason":"June to October","generalInfo":"Raspberries are a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Raspberries also provide potassium, vitamin K, magnesium and fiber. Potassium helps maintain healthy blood pressure, vitamin K and magnesium help build and maintain strong bones, and fiber helps control cholesterol and keeps you regular. Raspberries are also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects. Raspberries come in several colors.","vitamins":"Vitamin C, Vitamin K, Potassium, Magnesium, Fiber, Folate","choose":"Choose berries that are dry, firm and well shaped.","store":"Up to 1 week in the refrigerator in the original container or on a plate covered with plastic wrap. Freeze in a thin layer on a cookie sheet and then place berries in freezer bags. Use within 1 year.","prepare":"Rinse berries just before use. You can use any color raspberry interchangeably in a recipe.","serving":"Sprinkle raspberries over your favorite cereal or eat them raw as a snack. Use frozen raspberries as ice cubes to chill lemonade or ice tea."},{"name":"Rhubarb","imageName":"rhubarb","type":"Spring","inSeason":"May to June","generalInfo":"Rhubarb leaves are poisonous! Rhubarb is a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C protects skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Rhubarb is also a source of calcium and magnesium, which help build and maintain strong bones. Rhubarb makes a hardy and beautiful garden plant.","vitamins":"Vitamin C, Calcium, Magnesium","choose":"Choose firm, crisp, medium-size stalks","store":"Wrap stalks in plastic and refrigerate. Best used within 1 week. Cooked and raw rhubarb freeze for up to 1 year.","prepare":"Rhubarb leaves are poisonous. Be sure to remove the leaves and wash stalks before use","serving":"Rhubarb can be used in pies, tarts and sauces."},{"name":"Spinach","imageName":"spinach","type":"Spring","inSeason":"March to June and September to December","generalInfo":"Spinach is a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Spinach also provides vitamin K, calcium, magnesium, potassium and fiber. Vitamin K, calcium and magnesium help build and maintain strong bones. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular. Spinach is also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects.","vitamins":"Vitamin A, Vitamin C, Vitamin K, Calcium, Magnesium, Potassium, Fiber, Folate","choose":"Choose dark green, fresh and tenders spinach leaves.","store":"Refrigerate spinach in an air-tight container for up to 5 days.","prepare":"Wash well to remove any sand or dirt.","serving":"Add spinach to quiches, salads or pizza."},{"name":"Strawberries","imageName":"strawberries","type":"Spring","inSeason":"May to June","generalInfo":"Strawberries provide vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Strawberries also provide potassium and fiber. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Potassium, Fiber","choose":"Choose firm, brightly colored berries with the stem attached. Avoid soft or dark colored berries as they are bruised or overripe.","store":"In the refrigerator and use within 2 to 3 days.","prepare":"Rinse berries and remove stem.","serving":"Add to a salad or combine with other fruits for a fruit salad. Drizzle balsamic vinegar over sliced strawberries for a sweet treat."},{"name":"Summer Squash","imageName":"summer_squash","type":"Summer","inSeason":"July to October","generalInfo":"Summer squash has a thin, tender skin. Examples of summer squash include patty pan, yellow squash and zucchini. Summer squash is a source of vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Summer squash also provides potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Fiber, Potassium, Magnesium","choose":"Choose summer squash that is tender, well developed and firm with glossy, brightly colored intact skin. Avoid extra-large squash, which has a dull appearance and a hard tough surface. Summer squash is best when harvested young and tender, 2 inches or less in diameter and 6 to 8 inches long.","store":"In a plastic bag in the crisper of the refrigerator.","prepare":"The whole squash can be eaten, so there is no need to peel it. Even the blossoms are edible, either raw or cooked. Wash summer squash just before use.","serving":"Grill, steam, saute or stir. Stuff summer squash with bread crumbs and seasonings like chopped onions, garlic and parsley. The whole squash can be eaten, so there's no need to peel it. Even the blossoms are edible, either raw or cooked."},{"name":"Sweet Corn","imageName":"corn","type":"Summer","inSeason":"June to September","generalInfo":"Sweet corn is a source of potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular. Sweet corn is also a source of folate, which may reduce your risk of heart disease. Eating foods with folate before pregnancy helps lower the risk of delivering a baby with neural tube defects.","vitamins":"Potassium, Magnesium, Fiber, Folate","choose":"Choose corn in fresh-looking green husks that has well developed kernels. Kernels should be large enough so that they are compact and have no space between the rows.","store":"Refrigerate cobs in husks.","prepare":"To shuck corn, pull the husks down and snap off the stem at the base. To remove silk, rub the ear in a circular direction under cold running water or use a vegetable brush.","serving":"Try brushing with olive oil and sprinkle on dried herbs. Herbs like thyme, paprika, chives, lemon balm, chervil, garlic powder and pepper bring out the flavor of corn. Grill corn in foil or straight on the grill."},{"name":"Sweet Potatoes","imageName":"sweet_potato","type":"Fall","inSeason":"September to December","generalInfo":"Sweet potatoes are a source of vitamin A, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin A also helps maintain eye health. Sweet potatoes provide potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Potassium, Magnesium, Fiber","choose":"Choose firm potatoes with smooth, unbruised skins without cracks.","store":"In a cool, dark place for 1 to 2 weeks.","prepare":"Rub while washing under cool running water. Peel before cooking or scoop out of the peel after baking.","serving":"Bake whole, unpeeled sweet potatoes and serve with butter. Boil sweet potatoes with white or red potatoes, mash and season with ginger and cinnamon."},{"name":"Tomatoes","imageName":"tomato","type":"Summer","inSeason":"July to October","generalInfo":"Tomatoes provide vitamin C, an antioxidant that may reduce your risk of heart disease and certain cancers. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Tomatoes are also a source of potassium, magnesium and fiber. Potassium helps maintain healthy blood pressure, magnesium helps build and maintain strong bones, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin C, Potassium, Magnesium, Fiber","choose":"Choose plump, heavy tomatoes with smooth skins. Avoid tomatoes with bruises, blemishes or deep cracks.","store":"At room temperature for up to 1 week or longer if still ripening. Tomatoes that are not fully ripe will continue to ripen if stored out of the sun at room temperature.","prepare":"Rinse tomatoes gently in cold water before serving them.","serving":"Add sliced tomatoes to salads and sandwiches at the last minute because they begin to release their juices as soon as they are cut."},{"name":"Turnips","imageName":"turnip","type":"Spring","inSeason":"April to June and September to November","generalInfo":"Turnips are a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Turnips are also a source of potassium and fiber. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular. Turnip greens are edible and provide vitamin K, calcium and magnesium, which help build and maintain healthy bones.","vitamins":"Vitamin A, Vitamin C, Fiber, Potassium","choose":"Turnips with a heavy, firm skin. If tops are attached, they should be fresh, green and crisp. Avoid turnips that are soft or have brown spots. Avoid greens that are yellow or wilted, as this can indicate old turnips.","store":"Turnips and turnip greens separately. Wrap greens in a damp towel and place in a plastic bag. Greens will last up to 4 days in the coldest part of the refrigerator. Store the roots (the turnip) in a plastic bag in the crisper.","prepare":"Remove the greens from the root (turnip). Peel the turnip, if necessary. Small, young turnips may only need to be scrubbed. Soak turnips in ice and enjoy raw.","serving":"Pair turnips with cream, butter, citrus, nutmeg, thyme, parsley or root vegetables like carrots, sweet potatoes and potatoes. Boil greens for 10 minutes, braise for 12 minutes or saute for 7 minutes. Use turnips in any potato recipe."},{"name":"Watermelon","imageName":"watermelon","type":"Summer","inSeason":"August to October","generalInfo":"Watermelon provides vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Watermelon also provides potassium and magnesium. Potassium helps maintain healthy blood pressure, and magnesium helps build and maintain strong bones.","vitamins":"Vitamin A, Vitamin C, Potassium, Magnesium","choose":"Choose watermelons with a smooth surface and a yellow underside.","store":"Whole watermelon at room temperature until fully ripened and then refrigerate for up to 1 week. Cut watermelon can be stored in the refrigerator for 3 to 4 days.","prepare":"Wash the outside of the watermelon, cut into wedges or cut the flesh from the rind and cube into 1-inch cubes. Place cubes in a covered container and store in the refrigerator.","serving":"Add watermelon to chicken, tuna and rice salads or mix some watermelon into salsa to take the heat off the salsa. Puree watermelon and freeze to use as ice cubes in your favorite drink. Mix watermelon with other fruit and yogurt for a smoothie."},{"name":"Winter Squash","imageName":"winter_squash","type":"Fall","inSeason":"August to December","generalInfo":"Winter squash is available in the fall. Its tough rind allows it to be stored through the winter months when kept in a relatively dry place. Examples of winter squash are acorn, butternut and spaghetti. Winter squash is a source of vitamins A and C, which are antioxidants that may reduce your risk of heart disease and certain cancers. Vitamin A helps maintain eye health. Vitamin C helps protect skin from bruising, helps heal cuts and keeps gums healthy. Eating foods with vitamin C helps the body absorb iron. Winter squash also provides potassium and fiber. Potassium helps maintain healthy blood pressure, and fiber helps control cholesterol and keeps you regular.","vitamins":"Vitamin A, Vitamin C, Potassium, Fiber","choose":"Firm squash that feels heavy for its size. The skin should have a dull sheen and be intact and hard. Avoid squash with soft spots.","store":"Most varieties will keep up to 3 months if stored in a cool, dry place. However, spaghetti squash has a storage life of about 2 months.","prepare":"There are many varieties of winter squash and most are eaten cooked. Their hard shells and seeds are not eaten. All winter squash bakes well. Steaming works for cut pieces. Most varieties have a sweet, buttery, firm flesh and can be substituted for one another in recipes, with the exception of spaghetti squash.","serving":"Bake squash by brushing the cut surface lightly with margarine or olive oil. Place in a baking pan and add a few spoonfuls of water. Bake uncovered 30 to 35 minutes at 350 degrees F."}]);

dc.registerData('recipes', [{"name":"Simple Chunky Applesauce","imageName":"chunky","produceName":"Apples","ingredients":"8 to 12 medium apples (4 pounds), unpeeled and cut into 2-inch pieces ***1\/4 cup sugar ***1 cup water","directions":"In a large pot, toss apples, sugar and water. Cover and cook apples over medium-high heat until they begin to break down, 15 to 20 minutes. Stir occasionally with wooden spoon to break up any large chunks. Cooked apples can be mashed or put in a food processor for smoother consistency. Add water to thin, if needed. Add extra sugar to adjust sweetness. Season with cinnamon or lemon juice. Can be stored in the refrigerator up to 5 days."},{"name":"Whole Baked Apples","imageName":"whole_baked","produceName":"Apples","ingredients":"4 large apples ***2 to 3 tablespoons lemon juice ***1 cup oatmeal ***1\/2 cup honey ***1\/2 cup hot water ***1 teaspoon cinnamon ***4 teaspoons butter ***1\/4 cup brown sugar ***2 teaspoons flour","directions":"Preheat oven to 350 degrees F. Remove 1\/2-inch slice from the top of each apple. Using a large spoon, remove all but 1\/2 inch of the core. Place cored apples in lemon water. Combine oats, brown sugar, flour and cinnamon. Stir in butter until mixed. Combine honey and hot water. Brush apples with honey and water. Fill apples with oat mixture. In a baking dish, arrange apples and cover with foil. Bake 40 minutes. Remove foil and top with brown sugar and honey. Continue baking for 10 to 15 minutes or until apples are tender."},{"name":"Roasted Beet Salad","imageName":"roasted_beet","produceName":"Beets","ingredients":"12 to 16 red beets (2 bunches), washed and dried without tops ***1 cup spinach, rinsed ***1\/2 cup olive oil ***2 tablespoons lemon juice","directions":"Preheat oven to 400 degrees F. Place beets on a baking sheet. Drizzle with olive oil and sprinkle with salt. Roast for 30 to 45 minutes to desired tenderness. (A knife should be able to pierce the beet with a little resistance.) Remove beets from the oven and cool for 20 to 25 minutes. Remove beet skins. They should easily come off after roasting. Cut beets to half pieces and toss with some olive oil. Add 1 tablespoon lemon juice. Combine remaining olive oil and lemon juice with spinach. Serve beets on bed of spinach."},{"name":"Pickled Beets","imageName":"pickled_beet","produceName":"Beets","ingredients":"4 to 6 beets (1 bunch), greens removed ***1\/4 cup cider vinegar ***1 tablespoon sugar ***1 tablespoon olive oil ***1\/2 teaspoon dry mustard ***Salt and pepper","directions":"Boil beets for 30 minutes or until a fork can easily pierce beets. Drain liquid from beets and rinse in cold water. Remove beet peels with fingers. Mix cider vinegar, sugar, olive oil and dry mustard. Add salt and pepper to taste. Combine beets and marinade. Let mixture set for 30 minutes at room temperature."},{"name":"Creamy Broccoli Soup","imageName":"broccoli_soup","produceName":"Broccoli","ingredients":"4 heads broccoli or about 8 cups when florets and stems are chopped ***1 1\/2 onion, chopped ***3 1\/2 cups chicken or vegetable broth ***5 tablespoons butter ***3 tablespoons flour ***2 cups skim milk ***2 to 3 garlic cloves, minced ***1\/2 cup shredded cheese","directions":"In a medium pot, melt butter and saute onions and garlic until tender. Add broth and broccoli. Cover and simmer for 25 to 30 minutes, stirring occasionally. If desired, mash broccoli with a potato masher or fork. If broccoli is not tender enough, continue to simmer until broccoli reaches desired doneness. In a small pan over medium heat, melt 3 tablespoons butter. Stir in flour and milk. Stir until mixture is thick and bubbly. Add milk mixture to soup and serve."},{"name":"Cheesy Broccoli and Pasta Bake","imageName":"cheesy_broccoli","produceName":"Broccoli","ingredients":"2 heads broccoli, chopped florets and stems ***1\/2 onion, chopped ***1 pound pasta ***1 tablespoon butter ***2 tablespoons flour ***2 cups skim milk ***3 cups shredded cheese","directions":"Heat broiler. Cook pasta according to the package directions. Heat butter in a pot over medium heat while pasta is cooking. Add flour and stir for 2 minutes. Add milk and continue stirring until the mixture thickens, about 4 to 5 minutes. Add half the cheese to the milk mixture and stir until melted. Stir in salt and pepper. Combine pasta, broccoli, onions and milk mixture. Toss and place mixture in an 8-inch square pan. Sprinkle the remaining cheese on top. Broil until golden brown, about 3 to 4 minutes."},{"name":"Cabbage and Apple Slaw","imageName":"cab_app","produceName":"Cabbage","ingredients":"2 cups green cabbage, shredded ***2 cups red cabbage, shredded ***1\/2 cup mayonnaise ***2 tablespoons cider vinegar ***1\/2 teaspoon celery seed ***1\/8 teaspoon black pepper ***1 large unpeeled Fuji apple, cored, quartered and sliced thin","directions":"In a large bowl, combine the green and red cabbage. Set aside. In a medium bowl, whisk together mayonnaise, vinegar, celery seed and pepper. Add the apple slices. Pour over the cabbage and toss gently until coated. Cover and chill 1 hour or longer. To serve, spoon into salad bowls."},{"name":"Scalloped Carrots and Potatoes","imageName":"carrots_scalloped","produceName":"Carrots","ingredients":"1 medium onion, sliced thin ***1\/4 teaspoon dried thyme ***1 tablespoon butter ***12 ounces evaporated skim milk ***1 tablespoon flour ***1\/4 teaspoon nutmeg ***3 cups potatoes, peeled and sliced thin ***1 1\/2 cups carrots, peeled and sliced thin","directions":"Preheat oven to 400 degrees F. Saute onions and thyme in butter, stirring regularly. Whisk together the milk, flour and nutmeg. In a 2-quart baking dish, combine onions, potatoes and carrots. Pour milk mixture on top. Cover with foil and bake for 40 minutes. Uncover, lower heat to 350 degrees and bake for 30 minutes until the vegetables are tender and top is browned."},{"name":"Roasted Carrots","imageName":"carrots_roasted","produceName":"Carrots","ingredients":"12 carrots, cut into 1 1\/2-inch slices ***2 tablespoons olive oil ***1 teaspoon salt ***1\/2 teaspoon pepper ***2 tablespoon parsley, minced","directions":"Preheat oven to 400 degrees F. Mix together olive oil, salt, pepper and parsley. Toss with carrot slices. Place in single layer on a baking sheet. Roast for 20 minutes or until brown and tender."},{"name":"Mashed Cauliflower and Potatoes","imageName":"mashed_caul","produceName":"Cauliflower","ingredients":"2 pounds potatoes, cubed (leave the skins on) ***1 head cauliflower, chopped ***1\/4 cup olive oil ***1\/4 cup skim milk ***1\/2 cup reduced- or fat-free sour cream ***4 cloves garlic, roasted and removed from skin","directions":"In a large pan, combine cauliflower and potatoes. Cover with water and boil. Reduce heat and simmer for 10 to 15 minutes or until vegetables are tender. Drain water. Mash cauliflower and potatoes together. Add olive oil, milk, sour cream and garlic. Continue to combine ingredients. Mix well."},{"name":"Roasted Cauliflower with Garlic","imageName":"roasted_caul","produceName":"Cauliflower","ingredients":"1 head cauliflower, chopped ***2 teaspoons olive oil ***2 to 3 cloves garlic, minced ***1\/2 teaspoon salt ***1 to 2 tablespoons lemon juice ***Pepper ***Optional seasonings: chili flakes, Parmesan cheese, onions, curry powder","directions":"Preheat oven to 400 degrees F. Toss cauliflower with olive oil, salt, garlic, lemon juice and pepper. Add other seasonings, if desired. In a single layer on a baking sheet, spread cauliflower mixture. Bake 10 minutes, then stir and toss the mixture. Continue cooking and stirring every 10 minutes. Cauliflower should be done in 25 to 30 minutes or when it is golden brown. A fork should easily pierce the cauliflower."},{"name":"Greens Sauteed with Apples","imageName":"greens_app","produceName":"Greens","ingredients":"2 teaspoons olive oil ***6 cups greens, chopped ***1\/2 teaspoon coriander ***3 apples, peeled and chopped","directions":"Heat oil, then add greens and coriander. Toss to coat. Cover and steam until limp, 5 to 10 minutes. Add chopped apples and saute for 2 minutes."},{"name":"Rainbow Swiss Chard and Feta","imageName":"greens_rain","produceName":"Greens","ingredients":"2 tablespoons olive oil ***2 cloves garlic, sliced thin ***1 bunch rainbow Swiss chard, cut in small pieces ***1\/2 cup feta cheese, crumbled (about 2 1\/2 ounces)","directions":"In a large skillet over medium heat, heat the oil. Add the garlic and cook, stirring until golden, about 2 minutes. Stir in the chard. Cook, stirring, until the chard ribs are tender, 2 to 3 minutes. Put in serving bowl and sprinkle with feta cheese."},{"name":"Leaf Lettuce with Roasted Pear and Walnuts","imageName":"lettuce_leaf","produceName":"Lettuce","ingredients":"4 pears, peeled, cored and cut into 10 lengthwise slices ***1 tablespoon butter, melted ***2 tablespoons sugar ***1 1\/2 tablespoons olive oil ***2 teaspoons white wine vinegar ***2 pounds of lettuce, washed and torn into small pieces ***4 ounces Parmesan cheese, sliced into thin strips ***1 cup walnuts, chopped","directions":"Preheat oven to 450 degrees F. Place baking sheet in oven to preheat. Toss pears with butter. Add sugar and toss again. On preheated baking sheet, spread pears in single layer, making sure each slice lies flat on surface. Roast until browned on bottom, about 10 minutes. Turn each slice and roast until tender and deep golden brown, about 5 minutes. Let pears cool while preparing salad. Whisk together oil and vinegar to make vinaigrette dressing. Combine lettuce, pears and Parmesan. Add vinaigrette dressing and toss gently to combine. Sprinkle with chopped walnuts."},{"name":"Roasted Pumpkin Seeds","imageName":"pumpkin_seeds","produceName":"Pumpkin","ingredients":"Pumpkin Seeds","directions":"Wash the seeds and spread them on a cookie sheet. Roast them at 375 F until dry, about 20 minutes. Dot the seeds with butter or margarine and heat for 5 to 10 more minutes at 400 F, stirring the seeds often. For extra flavor, sprinkle the roasted pumpkin seeds with garlic, onion or Parmesan cheese. Store in a covered container."},{"name":"Pumpkin Soup","imageName":"pumpkin_soup","produceName":"Pumpkin","ingredients":"2 tablespoons unsalted butter ***1 large onion, diced ***2 garlic cloves, roughly chopped ***2 small pumpkins (about 4 cups), peeled and chopped ***3 carrots, peeled and diced ***1\/8 teaspoon clove, ground ***1\/2 teaspoon nutmeg, ground ***2 quarts chicken or vegetable stock","directions":"Melt the butter over medium heat. Add the onion and garlic. Cook until the onion turns translucent, about 4 to 5 minutes. Add the pumpkin, carrots, nutmeg, clove and stock. Bring to a boil and then reduce to a simmer. Cook the soup 30 to 45 minutes until the pumpkin and carrots are tender. Place the soup in the bowl of food processor and blend until smooth. Return to the saucepan and bring back to a boil."},{"name":"Radish Cucumber Salad","imageName":"radishe_cuc","produceName":"Radishes","ingredients":"3\/4 cup cider vinegar ***1\/4 cup sugar ***3 tablespoons dill, chopped ***3 large cucumbers, peeled, sliced thin ***1 cup radishes, sliced thin","directions":"Combine vinegar, sugar, dill and parsley. Stir to dissolve sugar. Add cucumbers and marinate in refrigerator for several hours. Mix in radishes just before serving."},{"name":"Radish Green Pepper Salad","imageName":"radishe_green","produceName":"Radishes","ingredients":"20 radishes, sliced thin with ends trimmed off ***1 green pepper, sliced fine ***2 tablespoons vinegar ***4 teaspoons soy sauce ***1 tablespoon sugar","directions":"Combine the radishes and green pepper. Mix the dressing ingredients, stirring them well to dissolve the sugar. Add the dressing to the vegetables and mix well."},{"name":"Grilled Radishes","imageName":"radishes_grill","produceName":"Radishes","ingredients":"12 to 14 radishes (1 bunch), quartered ***1\/2 onion, chopped ***2 cloves garlic, minced ***2 tablespoons butter, divided into pieces ***1 tablespoon of water ***Salt and pepper to taste","directions":"Preheat the grill to high heat. Place radishes, onions, garlic and butter pieces on aluminum foil. Sprinkle with water and wrap vegetables into a tightly sealed packet. Place packet on the grill and cook 20 minutes or until vegetables are desired tenderness."},{"name":"Apple and Spinach Salad","imageName":"spin_app","produceName":"Spinach","ingredients":"1 large Jonathan apple, quartered, cored and sliced thin ***2 cups baby spinach ***1\/2 cup walnuts, toasted (optional) ***1\/2 cup goat or feta cheese, crumbled (optional) ***1 tablespoon of lemon juice ***2 teaspoons honey","directions":"In a small bowl, whisk lemon juice and honey to blend. In a large bowl, combine apple and spinach. Toss with enough dressing to coat. Mound salad on 4 plates. Sprinkle with walnuts and cheese (optional)."},{"name":"Roasted Sweet Potatoes","imageName":"sweet_roast","produceName":"Sweet Potatoes","ingredients":"4 small sweet potatoes (about 1 1\/2 pounds), peeled and cut into wedges or slices ***2 tablespoons olive oil ***Optional seasonings: dried basil, oregano, garlic, ginger, cinnamon","directions":"Preheat oven to 450 degrees F. On a baking sheet, arrange sweet potato wedges in single layer. Drizzle with oil and seasonings (optional). Toss to cover. Roast about 40 minutes, turning potatoes until they are cooked and crisp."},{"name":"Sweet Potato and Apple Bake","imageName":"sweet_bake","produceName":"Sweet Potatoes","ingredients":"3 medium sweet potatoes ***1\/2 cup butter or margarine ***1\/4 cup brown sugar ***2 tablespoons cinnamon ***2 large Granny Smith apples, peeled and cut into thin slices","directions":"Preheat oven to 350 degrees F. Bake sweet potatoes just until able to pierce with fork. Coat 9- by 13-inch baking dish with cooking spray. Peel sweet potatoes and slice 1\/2-inch thick. Layer sweet potato slices in baking dish. Dot with butter. Sprinkle with cinnamon and sugar. Layer with apple slices. Repeat with sweet potatoes, butter, cinnamon, sugar and apples. Bake 20 minutes."},{"name":"Smashed Turnips","imageName":"turnip_smash","produceName":"Turnips","ingredients":"4 large turnips ***1\/2 cup skim milk ***2 tablespoons butter","directions":"Wash, peel and quarter turnips. In a large pot, place turnips and cover with water. Bring to a boil and cook 30 to 40 minutes or until tender. Remove turnips from heat and drain. In a large mixing bowl, mash turnips. Add milk and butter. Continue to mash until turnips reach desired consistency."},{"name":"Roasted Winter Vegetables","imageName":"turnip_roast","produceName":"Turnips","ingredients":"2 turnips, peeled and cubed ***2 potatoes, with peel on ***1 carrot, peeled and sliced ***1 onion, chopped ***1 large beet, peeled and cut into wedges ***2 tablespoons olive oil ***1 head of garlic, peeled and chopped ***1 teaspoon salt ***1\/4 teaspoon pepper ***2 teaspoons dried sage ***1 teaspoon dried thyme","directions":"Preheat oven to 375 degrees F. Combine oil, sage, thyme, salt and pepper. In a large bowl, place vegetables and garlic, and toss well with oil mixture. Place coated vegetables in a single layer onto baking sheet. Roast for 30 minutes. Rotate baking sheet and continue to roast vegetables until they are tender, about 45 more minutes."},{"name":"Acorn Squash with Brown Sugar","imageName":"winter_acorn","produceName":"Winter Squash","ingredients":"2 acorn squash, halved pole to pole and seeded ***3 tablespoons unsalted butter ***3 tablespoons dark brown sugar","directions":"In 13- by 9-inch microwave-safe baking dish, place squash halves cut-sides down or arrange halves so that cut sides face out. Cover tightly with plastic wrap, using multiple sheets. With paring knife, poke about 4 steam vents in plastic wrap. Microwave on high power until squash is very tender, 15 to 25 minutes. While squash is cooking, heat broiler. In small saucepan over low heat, melt butter and brown, whisking occasionally, until combined. When squash is cooked, carefully pull back plastic wrap. Transfer cooked squash cut-side up to rimmed baking sheet. Spoon portion of butter\/sugar mixture onto each squash half. Broil until brown and caramelized, 5 to 8 minutes."},{"name":"Butternut Squash and Apple Bake","imageName":"winter_butternut","produceName":"Winter Squash","ingredients":"2 pounds butternut squash, peeled and cut into 1\/2-inch slices ***2 baking apples, peeled and cut into 1\/2-inch slices ***1\/2 cup brown sugar ***1\/4 cup butter or margarine, melted ***1 tablespoon flour ***1\/2 teaspoon cinnamon","directions":"Preheat oven to 350 degrees F. In a 12- by 7 1\/2-inch baking dish, layer squash slices. Layer apple slices on top of the squash. Mix brown sugar, butter, flour and cinnamon. Sprinkle over top of squash and apples. Cover and bake 50 minutes or until tender."},{"name":"Spaghetti Squash with Parmesan Cheese","imageName":"winter_spag","produceName":"Winter Squash","ingredients":"4 to 5 pounds spaghetti squash ***1\/4 cup olive oil ***2 cloves garlic, minced ***3\/4 cup Parmesan cheese, freshly grated ***1 teaspoon white pepper (optional) ***1 tablespoon fresh basil or parsley, minced","directions":"With a fork or metal skewer, pierce squash in several places. Place on baking pan and bake 1 hour and 30 minutes to 2 hours. Using pot holders, squeeze squash to test for doneness. Squash is ready when it gives slightly under pressure. Remove and cool. Heat olive oil over medium heat. Add garlic and cook until tender, about 5 minutes. When squash is cool enough to handle, cut in half, lengthwise and scoop out insides. Using a fork, pull pulp from the shell in long strands and add them to the garlic oil. Toss squash strands gently with pepper, salt and cheese. Pour mix into a serving bowl and garnish with basil and parsley. Serve with additional Parmesan cheese."},{"name":"Wonderful Winter Squash","imageName":"winter_wonder","produceName":"Winter Squash","ingredients":"1 winter squash (butternut or acorn), cut in half, peeled and cut into 1-inch cubes ***2 teaspoons soy sauce ***1 tablespoon maple syrup or honey","directions":"Place squash in large pot with 1\/2 cup water. Add soy sauce and syrup or honey. Cover and simmer over medium heat until squash is tender, about 15 to 30 minutes."},{"name":"Roasted Red and Yellow Pepper Sauce with Garlic","imageName":"bell_garlic","produceName":"Bell Peppers","ingredients":"2 yellow bell peppers, roasted, peeled, cored, seeded and chopped fine ***2 red bell peppers, roasted, peeled, cored, seeded and chopped fine ***6 tablespoons olive oil ***1 clove garlic, minced","directions":"In a large bowl, mix peppers with oil and garlic. Cover and set aside to let flavors blend, at least 30 minutes. Toss with cooked pasta. Sauce can be refrigerated up to 5 days."},{"name":"Roasted Red Pepper Cucumber Salad","imageName":"bell_cuc","produceName":"Bell Peppers","ingredients":"1 large cucumber, halved lengthwise, seedless and cut into 1\/4-inch half circles ***1\/2 teaspoon salt ***4 red bell peppers ***1 small red onion, halved and sliced thin ***2 tablespoons balsamic vinegar ***4 tablespoons olive oil","directions":"In a colander, toss cucumber slices with salt. Leave to drain about 30 minutes. Adjust oven rack to top position and preheat broiler. Broil peppers, turning until skin is charred and puffed but the flesh is still firm, 8 to 10 minutes. Remove pan from oven. Let peppers sit until cool enough to handle. Peel and discard skin from each piece or put peppers in a large heat-resistant bowl and cover with plastic wrap for 15 minutes. The heat from the pepper steam will help release the skin to make peeling easier. Peel peppers and cut into bite-size pieces. Pat cucumber slices dry and combine with pepper pieces and onion slices. Whisk oil into vinegar to make a vinaigrette dressing. Pour over peppers, cucumbers and onions."},{"name":"Three-Colored Bell Pepper Salad","imageName":"bell_three","produceName":"Bell Peppers","ingredients":"1 medium red bell pepper ***1 medium green bell pepper ***1 medium yellow bell pepper ***1\/2 cup cream garlic dressing ***Paper bag","directions":"Adjust oven rack to top position and preheat broiler. Place bell peppers under broiler turning to char on all sides. Remove from broiler and place in paper bag. Close bag and set aside until peppers cool. Peel cooled peppers. Core, seed and cut into strips. Toss dressing over peppers. Serve warm or chilled."},{"name":"Blackberries with Balsamic Vinegar Sauce","imageName":"black_vine","produceName":"Blackberries","ingredients":"1 cup blackberries ***1\/4 cup balsamic vinegar ***1\/4 cup sugar ***3 drops vanilla extract ***1\/4 cup plain, nonfat yogurt","directions":"In a small saucepan, combine vinegar and sugar and bring to a boil. Boil for 4 minutes, stirring often. Remove from heat and add vanilla. Slowly whisk in yogurt. Toss with berries and serve."},{"name":"Missouri Berry Fruit Salad","imageName":"black_miss","produceName":"Blackberries","ingredients":"1 pint blackberries ***1 pint blueberries ***1 pint raspberries ***1 tablespoon balsamic vinegar **1\/8 cup sugar","directions":"In a large bowl, combine the berries, vinegar and sugar. Stir gently. Cover securely with plastic wrap and refrigerate for 30 minutes to 1 hour."},{"name":"Blueberry Smoothie","imageName":"blue_smooth","produceName":"Blueberries","ingredients":"3\/4 cup blueberries ***1\/4 cup nonfat vanilla yogurt ***3\/4 cup skim milk ***Pinch of cinnamon (if desired)","directions":"Combine all of the ingredients in a blender and puree until smooth."},{"name":"Melon Kebabs","imageName":"canta_keb","produceName":"Cantaloupe","ingredients":"12 cantaloupe chunks ***12 honeydew chunks ***12 watermelon chunks ***1\/2 cup yogurt ***2 teaspoons mint, chopped ***Wooden skewers","directions":"Cut cantaloupe, honeydew and watermelon into chunks. Thread alternating chunks (1 cantaloupe, 1 honeydew, 1 watermelon) and repeat until skewer is nearly full (leave about 2 inches uncovered for holding skewer). Mix yogurt and mint. Dip melon kebab in yogurt and mint mix."},{"name":"Cantaloupe Coolers","imageName":"canta_cool","produceName":"Cantaloupe","ingredients":"1 small cantaloupe ***1\/2 cup water ***4 tablespoons sugar","directions":"Peel and cut cantaloupe into small pieces. Combine with water and sugar and blend or mash until smooth. Pour into two ice cube trays and freeze. Enjoy as a refreshing cool treat or add to your favorite fruit drink or smoothie."},{"name":"Cherry and Berry Buckle","imageName":"cher_ber","produceName":"Cherries","ingredients":"3\/4 cup sugar ***2 tablespoons cornstarch ***1\/4 teaspoon ground cinnamon ***1\/2 cup orange juice ***1\/2 teaspoon freshly grated lemon zest ***4 cups tart cherries, pitted ***2 cups blueberries or blackberries ***1 1\/3 cups all-purpose flour ***1 1\/2 tablespoons sugar ***1 1\/4 teaspoons baking powder ***1\/2 teaspoon salt ***1\/4 teaspoon baking soda ***2 1\/2 tablespoons very cold butter, cut into small pieces ***2 tablespoons canola oil ***3\/4 cup nonfat buttermilk, plus more as needed ***1 1\/2 teaspoons sugar mixed with 1\/4 teaspoon ground cinnamon","directions":"Stir together flour, 1 1\/2 tablespoons sugar, baking powder, salt and baking soda. Cut in the butter, using a pastry blender, 2 knives or forks, until the mixture resembles coarse meal. Add 3\/4 cup buttermilk, mixing with a fork just until incorporated. The dough should be very soft and slightly wet. If necessary, stir in a little more buttermilk. Let the dough stand for 3 to 4 minutes to firm up slightly. Use lightly oiled soup spoons to scoop up the dough, drop the dough in 8 portions onto the fruit in the pan, spacing dough evenly over the surface. Return the pan to the stove top and adjust heat so fruit simmers gently. Cover the pot tightly and continue simmering until the dumplings are very puffy and cooked through, 17 to 20 minutes. Cut into the center dumpling with a knife to check for doneness. Let cool on a wire rack, uncovered, for 15 minutes. Sprinkle the cinnamon sugar mixture over the dumplings. Serve warm. Will keep, covered, in the refrigerator for up to 2 days. Reheat in a 250 degrees F oven or microwave."},{"name":"Cucumber Dip","imageName":"cuc_dip","produceName":"Cucumbers","ingredients":"2 medium cucumbers, peeled, seeded and chopped ***2 green onions, sliced ***1\/2 cup plain yogurt ***2 tablespoons lemon juice ***1 tablespoon cider or white vinegar ***1 clove garlic, crushed","directions":"Process all ingredients in blender until smooth. Chill for at least 10 minutes before serving."},{"name":"Cucumber Salad","imageName":"cuc_salad","produceName":"Cucumbers","ingredients":"2 large cucumbers, peeled, sliced thin ***3\/4 cup white vinegar ***1\/2 cup water ***1\/2 cup sugar ***Basil","directions":"Combine all ingredients except cucumbers and heat until sugar melts. Pour warm mixture over cucumbers. Store covered in refrigerator. Season with fresh or dried leaf basil."},{"name":"Eggplant and Tomatoes","imageName":"egg_tom","produceName":"Eggplant","ingredients":"1 large eggplant, peeled and cut into 1\/2-inch slices ***1 teaspoon salt ***3 tablespoons flour ***1\/2 cup canola oil ***2 tablespoons onion, chopped fine ***4 tomatoes, chopped ***2 cloves of garlic, chopped","directions":"Sprinkle salt over eggplant slices and leave for 30 minutes. Then drain and coat slices with flour. In skillet, heat oil to medium and saute the eggplant slices until tender. Remove from pan and keep warm. Wipe out pan and heat oil to saute onions. Add tomatoes and garlic. Reduce heat and simmer 10 minutes. Top the eggplant slices with the tomatoes and onions."},{"name":"Herbed Baby Eggplant","imageName":"egg_baby","produceName":"Eggplant","ingredients":"3 pounds small Oriental-type eggplants (4 to 6 ounces each) ***3 teaspoons salt ***2 teaspoons garlic, chopped fine ***1\/2 cup olive oil ***1\/3 cup sherry or red wine vinegar ***1\/2 cup fresh basil leaves, cut into shreds ***Freshly ground black pepper","directions":"Wash eggplant, remove caps and cut into quarters or cut in half. Sprinkle with salt and let drain for 30 minutes. Rinse and pat dry with paper towels. Spread pieces in a single layer on a baking sheet, cut sides up. Mix garlic and oil, drizzle over eggplants. Bake 30 minutes until the eggplants are brown and tender. Cool slightly. Rinse basil leaves. Stack leaves and roll into a scroll, then cut across into thin shreds. Set aside. In a large bowl, place the eggplants and drizzle with vinegar, add basil shreds and toss."},{"name":"Ratatouille","imageName":"ratat","produceName":"Eggplant","ingredients":"1 large eggplant (about 1 pound), cut into 1-inch cubes ***1 teaspoon salt ***1 large zucchini (about 1\/2 pound), cut into 1-inch cubes ***3 tablespoons olive oil ***1 medium onion, chopped ***1 clove garlic, minced ***1 medium ripe tomato (about 1\/2 pound), peeled and cut into 2-inch cubes ***1 tablespoon fresh basil, chopped or 1\/2 teaspoon dried ***2 teaspoons fresh thyme or 1\/4 teaspoon dried","directions":"In colander set over large bowl, place eggplant and sprinkle with salt. Toss to distribute salt evenly and let eggplant stand at least 1 hour. Rinse eggplant under running water to remove salt. Spread between triple layers of paper towels and press firmly until eggplant is dry. Preheat oven to 500 degrees F. Cover baking sheets with foil. In large bowl, toss eggplant, zucchini and 1 tablespoon oil. Spread in single layer on foil, sprinkle with salt and roast. Stir every 10 minutes, until well-browned and tender, 30 to 40 minutes. Set aside. In heavy-bottomed Dutch oven over medium heat, heat remaining 2 tablespoons oil. Add onion and reduce heat to medium-low. Cook, stirring frequently, until softened and golden brown. Stir in garlic and cook about 30 seconds. Add tomatoes and cook until they release their juices and begin to break down, about 5 minutes. Add roasted eggplant and zucchini. Stir gently to combine and cook until just heated through, about 5 minutes. Stir in basil and thyme. Can be covered and stored in the refrigerator for up to 3 days."},{"name":"Garlic Croutons","imageName":"garlic_crut","produceName":"Garlic","ingredients":"2 slices of bread ***4 tablespoons olive oil ***1 clove garlic, crushed","directions":"Preheat oven to 400 degrees F. Remove crusts from bread. Cut bread into cubes. Put olive oil and crushed garlic into a shallow dish. Mix well. Add bread cubes to garlic oil mixture and mix by hand until bread is well coated. Place bread on a baking tray and cook for 10 minutes. Let croutons cool over night. Place in airtight container and keep for 1 to 2 days."},{"name":"Roasted Green Beans","imageName":"green_roast","produceName":"Green Beans","ingredients":"1 pound fresh green beans ***1 tablespoon olive oil ***1 clove garlic, minced","directions":"Preheat oven to 400 degrees F. Wash and drain green beans and snap off stems. Place in a bowl and toss with oil and garlic. Spread beans on a cookie sheet that has a nonstick finish or is lined with aluminum foil. Roast in oven, turning occasionally, until beans are brown on the edges and slightly shriveled."},{"name":"Green Beans with Tomatoes and Garlic","imageName":"green_tom","produceName":"Green Beans","ingredients":"1 pound fresh green beans, strings and ends removed ***1\/2 cup onions, chopped ***4 cloves fresh garlic, crushed ***4 tablespoons butter or margarine ***1 cup tomatoes, chopped ***1 teaspoon sweet basil ***1\/4 cup water","directions":"Saute onions and garlic in butter. Add tomatoes and basil. Place green beans over onions and garlic, cover until cooked, about 15 to 20 minutes."},{"name":"Dilled Green Bean Salad","imageName":"green_dill","produceName":"Green Beans","ingredients":"1 pound fresh green beans, cut into 2-inch pieces ***2 tablespoons fresh dill ***4 to 6 green onions, chopped ***2 tablespoons olive oil ***1 tablespoon red wine vinegar ***1 teaspoon Dijon mustard","directions":"Steam green beans about 5 minutes, until crisp and tender. Combine beans, dill and onions. Whisk together olive oil, red wine vinegar and Dijon mustard and pour over bean mixture. Mix well and serve at room temperature."},{"name":"Sauteed Green Beans with Red Peppers","imageName":"green_saut","produceName":"Green Beans","ingredients":"2 teaspoons olive oil ***1 pound green beans, cut into 2-inch pieces ***1\/4 cup water ***1 red pepper, cut into 1\/2-inch pieces ***1 teaspoon red wine vinegar ***Basil ","directions":"Heat oil and add beans. Cook, stirring occasionally, until spotty brown, about 4 to 6 minutes. Add water, cover and cook until beans are bright green and still crisp, about 2 minutes. Remove cover, increase heat to high and cook until water evaporates, 30 seconds to 1 minute. Add red pepper pieces and continue to cook, stirring frequently, until beans are crisp, tender, lightly browned and beginning to wrinkle, about 1 to 3 minutes longer. Transfer beans to serving bowl, toss with vinegar and basil."},{"name":"Okra and Green Beans","imageName":"okra_green","produceName":"Okra","ingredients":"3\/4 pound fresh okra, uncut ***4 tablespoons olive oil ***Vinegar (optional) ***1 medium onion, diced ***3\/4 pound fresh green beans ***2 large garlic cloves, crushed then chopped ***1 cup water, ***2 tablespoons Salt ***Freshly ground pepper ***1 can tomato paste (6 ounces) ","directions":"Wash okra pods, trim stems, do not remove caps. If desired, soak okra in vinegar for 30 minutes to remove some of the stickiness. Rinse well and drain. Wash beans and cut into 3-inch lengths. Combine water, tomato paste, olive oil, onion, garlic, salt and pepper in a sauce pan and mix well. Heat, stirring frequently, until mixture comes to a boil. Add okra, beans and additional water, if necessary, to almost cover vegetables. Reduce heat to low, cover and simmer gently until vegetables are crisp and tender, 20 to 30 minutes."},{"name":"Crusty Okra Circles","imageName":"okra_crusty","produceName":"Okra","ingredients":"2 tablespoons bread crumbs ***3 tablespoons Parmesan cheese, grated ***1 tablespoon cornmeal ***3 cups okra, sliced ***1\/4 cup olive oil ***2 garlic cloves, minced","directions":"Mix the bread crumbs, cheese and cornmeal. Add the okra and stir to coat. Heat the olive oil, then saute the okra and garlic for 5 to 10 minutes. Most of the roping should disappear and the okra should be tender."},{"name":"Onions-Bell Pepper Roasted Potatoes","imageName":"onion_bell","produceName":"Onions, dry","ingredients":"8 small potatoes (2 1\/2 pounds), unpeeled ***1 small onion, halved lengthwise and sliced thin ***1 small green pepper, cut into 2 1\/2- by 1\/4-inch strips ***2 tablespoons low-calorie margarine, melted","directions":"Cut crosswise but not through each potato to make slits every inch. Gently insert onion slices and pepper slices alternately into slits. Brush with melted butter or margarine. Bake at 425 degrees F for 45 minutes."},{"name":"Oven Baked Onion Rings","imageName":"onion_ring","produceName":"Onions, dry","ingredients":"2 tablespoons vegetable oil ***1 cup bread crumbs ***1\/4 cup flour ***1\/2 teaspoon salt ***1 egg ***1 large onion, peeled, cut into 1\/4-inch slices","directions":"Preheat oven to 425 degrees F. Line shallow baking sheet with foil. Brush foil with oil. Stir bread crumbs, flour and salt together and spread on large plate. In a bowl, beat the egg slightly. Separate the onion slices. Dip onion slice in egg and press into bread crumb mixture, turning to coat both sides. Place breaded onion rings in a single layer on the pan and bake for 15 minutes. Turn over and bake for another 15 minutes or until golden brown and crispy."},{"name":"Grilled Peaches","imageName":"peach_grill","produceName":"Peaches","ingredients":"6 ripe peaches ***3 teaspoons sugar ***1 teaspoon ground ginger ***1 lime ***1\/2 cup honey","directions":"Cut the peaches in half and remove the pits. Dust the cut side of each half with sugar and ginger. Grill until golden brown, 6 to 7 minutes. Grate zest from lime, then squeeze the juice into the zest and add honey. Serve peaches with ice cream drizzled with lime and honey sauce."},{"name":"Peach Crunch Bars","imageName":"peach_crunch","produceName":"Peaches","ingredients":"1 cup all-purpose flour ***1 cup whole-wheat flour ***1\/2 cup brown sugar, packed ***1\/2 cup honey ***1\/2 cup margarine, melted ***2 cups peaches, fresh, frozen or drained canned ***2 cups granola","directions":"Grease 9-inch square baking pan. In a large bowl, combine flours, brown sugar and granola. Stir in honey and melted margarine until mixture is crumbly. In a baking pan, press half the mixture and arrange sliced peaches on top. Sprinkle remaining mixture on the top. Bake at 350 degrees F for 30 minutes. Cool in pan before cutting into bars."},{"name":"Oven Fries","imageName":"potato_oven","produceName":"Potatoes","ingredients":"4 medium potatoes ***1 tablespoon vegetable oil (or use vegetable spray)","directions":"Cut potatoes into long strips about 1\/2-inch thick. Dry strips with paper towel. In a bowl, mix potato strips and oil (or spray). Place oil coated potatoes in a single layer on a cookie sheet. Bake at 475 degrees F for about 35 minutes. Turn strips once to brown on both sides."},{"name":"Rosemary Roasted Red Potatoes","imageName":"potato_rose","produceName":"Potatoes","ingredients":"2 pounds red potatoes, cut into wedges ***1 tablespoon olive oil ***2 cloves garlic, chopped ***2 sprigs of rosemary, chopped","directions":"Preheat oven to 400 degrees F. In a large roasting pan, combine the potatoes, oil, rosemary and garlic. Toss to evenly coat. Bake for 45 minutes, turning halfway through the cooking time or until golden and tender."},{"name":"Raspberry-Apple Crisp","imageName":"raspberry_app","produceName":"Raspberries","ingredients":"6 tablespoons all-purpose flour ***1\/4 cup brown sugar ***1\/4 cup granulated sugar ***1\/4 teaspoon cinnamon ***1\/4 ground nutmeg ***5 tablespoons unsalted butter ***1 cup fresh raspberries, rinsed ***5 cups apples, 2 to 3 apples, peeled and cut into 1-inch chunks ***1\/4 cup granulated sugar ***1 tablespoon lemon juice ***Grated lemon zest from 1 lemon","directions":"Mix flour, brown sugar, sugar, cinnamon and nutmeg. Work in chilled butter to coarse cornmeal texture. Refrigerate mixture while preparing fruit. Preheat oven to 375 degrees F. In an 8-inch square baking pan or 9-inch round deep dish pie plate, toss together raspberries, apples, sugar, lemon juice and zest. Distribute chilled topping evenly over fruit. Bake for 40 minutes until fruit is bubbling and topping is deep golden brown."},{"name":"Raspberry Sauce","imageName":"raspberry_sauce","produceName":"Raspberries","ingredients":"1 tablespoon sugar ***2 teaspoons cornstarch ***2 tablespoons orange juice ***1 1\/4 cups raspberries ***1 teaspoon orange peel, grated","directions":"In a small saucepan, mix sugar, cornstarch and orange juice. Stir in raspberries and grated orange peel. Cook over medium heat, stirring constantly until mixture boils for 1 minute. Serve over fresh peach halves, or chill and serve with yogurt or ice cream."},{"name":"Patty Pan Squash Skillet","imageName":"summer_patty","produceName":"Summer Squash","ingredients":"1\/2 cup onion ***1\/2 cup bell pepper, chopped ***2 cups patty pan squash, cubed ***2 medium tomatoes, quartered ***2 tablespoons butter ***1 tablespoon sugar ***1\/4 teaspoon black pepper ***1 teaspoon salt ***1 teaspoon flour","directions":"Saute onion and green pepper in butter. Stir in flour, salt, pepper and sugar. Add squash and tomatoes and cook until tender."},{"name":"Summer Vegetable Gratin","imageName":"summer_veg","produceName":"Summer Squash","ingredients":"6 tablespoons olive oil ***1 pound zucchini, cut into 1\/4-inch slices ***1 pound yellow summer squash, cut into 1\/4-inch slices ***1 teaspoon salt ***3 to 4 large ripe tomatoes (1 1\/2 pounds), cut into 1\/4-inch slices ***2 medium onions, sliced ***2 medium garlic cloves, minced ***1 tablespoon fresh thyme leaves, chopped fine or 1 teaspoon dried thyme ***1 cup bread crumbs 2 ounces Parmesan cheese, grated to about 1 cup","directions":"Preheat oven to 400 degrees F. Brush 13- by 9-inch baking dish with 1 tablespoon oil. In a large bowl, toss zucchini and summer squash slices with 1 teaspoon salt. Transfer to colander set over bowl. Let stand for 30 minutes. In 12-inch nonstick skillet over medium heat, heat 1 tablespoon oil until simmering. Add onions and cook, stirring occasionally, until onions are softened and dark golden brown. Press zucchini and summer squash slices between layers of paper towels to remove as much liquid as possible, then place zucchini and squash slices in large bowl. In a small bowl, combine garlic, 3 tablespoons oil and thyme. Pour half of the mixture over zucchini and summer squash, toss to cover and then arrange slices in greased baking dish. Arrange caramelized onions in even layer over squash. Layer tomato slices on top of onions. Spoon remaining garlic-oil mixture evenly over tomatoes. Bake until vegetables are tender, about 30 minutes. Combine bread crumbs, remaining tablespoon oil and cheese. Remove baking dish from oven and increase heat to 450 F. Sprinkle bread- crumb mixture evenly on top of tomatoes. Bake until bubbling and cheese is lightly browned, 5 to 10 minutes."},{"name":"Yellow Summer Squash with Basil Couscous","imageName":"summer_yell","produceName":"Summer Squash","ingredients":"2 cups chicken broth ***2 tablespoons olive oil ***1 teaspoon salt ***1 cup couscous ***1 cup zucchini, diced ***1 cup yellow summer squash, diced ***1 cup basil, slivered ***1\/4 cup almonds, toasted and sliced","directions":"In a medium saucepan, bring the chicken stock and 1 tablespoon of olive oil to a boil. Stir in salt and couscous, then remove from heat. Let stand covered for 5 minutes. Saute the zucchini and yellow summer squash in the remaining oil. Add vegetables, almonds and basil to couscous, mix well. Another option for this recipe is to carve out the centers of the zucchini or yellow summer squash and steam the shells. Fill shells with couscous and sprinkle with toasted almonds."},{"name":"Yellow Summer Squash and Corn","imageName":"summer_corn","produceName":"Summer Squash","ingredients":"1 1\/2 tablespoons light olive oil ***1 large red bell pepper, diced ***2 medium yellow summer squash, halved lengthwise and sliced 1\/4-inch ***1 cup fresh corn kernels ***2 medium tomatoes, diced","directions":"In large skillet, heat olive oil. Saute bell peppers over medium heat for 2 minutes. Add the squash and corn. Saute until all vegetables are tender and crisp. Add tomatoes and saute for 1 minute."},{"name":"Sauteed Zucchini","imageName":"summer_zuch","produceName":"Summer Squash","ingredients":"2 tablespoons olive oil ***3 medium zucchini, sliced thin ***3 cloves of garlic, chopped ***1 teaspoon dried oregano","directions":"In large skillet over medium- high heat, heat oil. Add the zucchini slices and cook, stirring occasionally until golden brown, about 10 minutes. Stir in the garlic and oregano and cook, stirring for 2 minutes."},{"name":"Ravioli with Zucchini","imageName":"summer_rav","produceName":"Summer Squash","ingredients":"1 pound cheese ravioli (fresh or frozen) ***2 tablespoons olive oil ***3 small zucchini, diced 2 cloves garlic, sliced thin ***1\/2 cup Parmesan cheese, grated","directions":"Cook the ravioli according to the package directions. Drain and return to the pot. In a large skillet over medium heat, heat the oil. Add the zucchini and cook until just tender, 4 to 5 minutes. Add the garlic and cook for 2 minutes. Add the zucchini mixture and 1\/4 cup of cheese to the ravioli and toss gently to combine. Serve with the remaining cheese."},{"name":"Corn Souffle","imageName":"corn_so","produceName":"Sweet Corn","ingredients":"2 tablespoons butter or margarine ***4 tablespoons flour ***1 cup milk ***3\/4 cup corn ***2 tablespoons green pepper, chopped ***3 egg yolks, beaten ***Egg whites, stiffly beaten","directions":"Melt margarine. Add flour, stirring until smooth. Add milk and cook, stirring until thick. Add corn and peppers and stir in egg yolks. Remove sauce from heat and fold in egg whites. Pour mixture into an ungreased 1 1\/2-quart casserole dish. Set in pan of hot water and bake at 350 degrees F until firm, about 45 to 60 minutes. Test by inserting a sharp pointed knife in the center - if it comes out clean, the souffle is done."},{"name":"Corn and Tomato Salad","imageName":"corn_tom","produceName":"Sweet Corn","ingredients":"1 1\/2 cups fresh corn kernels ***3 large tomatoes ***1\/4 cup unsweetened 100 percent apple juice ***2 tablespoons balsamic vinegar ***1\/2 teaspoon cornstarch","directions":"Preheat oven to 425 degrees F. In a small saucepan, combine the apple juice, vinegar and cornstarch. Stir over medium-high heat until clear and thickened. Set aside to cool. Spread the corn on a baking sheet in a single layer. Coat lightly with olive oil pan spray. Roast corn in oven until it begins to brown, about 5 minutes. Slice the tomatoes and arrange on salad plates. Scatter the corn over the tomatoes and drizzle the sauce around the vegetables."},{"name":"Roasted Cherry Tomatoes","imageName":"tom_roast","produceName":"Tomatoes","ingredients":"1 pint cherry tomatoes ***1 clove garlic, sliced ***1 tablespoon olive oil ***1 tablespoon balsamic vinegar ***6 basil leaves, torn into small pieces","directions":"Preheat oven to 400 degrees F. Combine all ingredients except basil in a roasting pan. Roast for 15 minutes, stir every 5 minutes. Spoon tomatoes into a bowl and toss in basil pieces. Pour the liquid into a saucepan and heat to reduce and thicken. Drizzle over tomatoes and basil."},{"name":"Gazpacho","imageName":"tom_gaz","produceName":"Tomatoes","ingredients":"2 large fresh tomatoes, peeled and cored ***1 large cucumber, halved ***1 green pepper, halved and seeded ***1 medium onion, peeled and halved ***3 cups tomato juice ***1\/3 cup red wine vinegar ***1 tablespoon vegetable oil ***1\/4 teaspoon hot pepper sauce (like Tabasco) ***1\/4 teaspoon salt ***1\/8 teaspoon ground black pepper ***3 to 4 garlic cloves, minced","directions":"In a blender or food processor, puree half the cucumber, 1 tomato, half the green pepper, half the onion and 1 cup tomato juice. In a large bowl, pour puree and add the remaining tomato juice, vinegar, oil, pepper sauce, salt, pepper and garlic. Cover and refrigerate for at least 2 hours. Chop the remaining vegetables, cover and refrigerate until serving time. Just before serving, stir chopped vegetables into the puree. Serve chilled."},{"name":"Stuffed Tomatoes","imageName":"tom_stuff","produceName":"Tomatoes","ingredients":"4 medium tomatoes ***1 tablespoon margarine ***2 cloves garlic, minced ***1 tablespoon fresh basil ***1\/2 cup green bell pepper, chopped ***1 teaspoon dried basil ***3\/4 cup croutons","directions":"Cut a 1\/2-inch slice from the top of each tomato and discard tops. Scoop out pulp and discard seeds. Coarsely chop pulp. Set aside. In a skillet, cook garlic in margarine for 30 seconds. Stir in tomato pulp, green pepper and basil. Cook for 2 minutes or until green pepper is crisp and tender. Stir in croutons. Spoon crouton mixture into tomatoes. On a 9-inch pie plate, arrange stuffed tomatoes."},{"name":"Watermelon for Breakfast","imageName":"water_break","produceName":"Watermelon","ingredients":"3\/4 cup seeded watermelon chunks, cut into small pieces ***1\/\/3 cup low-fat granola ***5 ounces low-fat yogurt","directions":"Layer watermelon and yogurt. Top with granola."},{"name":"Watermelon, Cucumber and Tomato Salad","imageName":"water_cuc","produceName":"Watermelon","ingredients":"2 cups watermelon, seeded and diced ***4 small tomatoes, each cut into 8 pieces ***1 cucumber, peeled, halved lengthwise and cut into 1\/2-inch pieces ***2 tablespoons olive oil ***1\/4 cup fresh basil leaves, slivered","directions":"In a colander, drain the watermelon, tomatoes and cucumber. Place in bowl and toss with the olive oil and basil."},{"name":"Asparagus Snackers","imageName":"asp_snack","produceName":"Asparagus","ingredients":"1 pound fresh asparagus ***1\/4 cup water ***1 to 2 tablespoons lemon juice (to taste)","directions":"Wash and trim asparagus into 2-inch pieces. Place into a microwave-safe covered dish. Add 1\/4 cup water. Cook asparagus on the highest power 4 to 8 minutes, rotating halfway through. Drain and sprinkle with lemon juice."},{"name":"Grilled Asparagus","imageName":"asp_grill","produceName":"Asparagus","ingredients":"2 tablespoons olive oil ***1 teaspoon salt ***1 teaspoon black pepper ***1 teaspoon lemon juice ***1 pound fresh asparagus","directions":"Combine first four ingredients and whisk well to make marinade. Trim the asparagus to remove tough, woody ends. Cover asparagus with marinade and let sit for 20 minutes. Remove asparagus from marinade and drain. Save marinade. Grill over medium-high heat. Turn asparagus often and baste occasionally with reserved marinade. The asparagus is done when it feels tender."},{"name":"Roasted Asparagus","imageName":"asp_roast","produceName":"Asparagus","ingredients":"2 pounds asparagus ***1\/4 cup olive oil ***4 tablespoons Parmesan cheese","directions":"Preheat oven to 450 degrees F. Trim asparagus and toss to coat with oil. Lay out in single layer on a baking pan and sprinkle with Parmesan cheese. Roast for 5 to 10 minutes."},{"name":"Asparagus, Peas and Pasta","imageName":"asp_peas","produceName":"Asparagus","ingredients":"2 cups penne pasta ***1\/2 pound asparagus, cut diagonally into 1-inch pieces ***1\/2 pound peas, removed from pods ***1 cup Parmesan cheese, grated ***1 tablespoon of olive oil ***1 teaspoon dried oregano","directions":"Prepare pasta according to package directions. Add asparagus and peas for the last minute of cooking. Drain pasta and vegetables and toss with remaining ingredients."},{"name":"Sauteed Beet Greens with Garlic","imageName":"beet_saut","produceName":"Beets","ingredients":"2 tablespoons vegetable oil ***2 cloves garlic, minced ***2 bunches beet greens, chopped","directions":"Heat oil in large skillet and saute garlic. Chop the greens roughly and add to the skillet, cooking until limp, about 5 minutes."},{"name":"Beet and Cabbage Slaw","imageName":"beet_cab","produceName":"Beets","ingredients":"2 medium beets, trimmed, peeled and grated ***4 cups cabbage, grated ***1\/2 cup walnuts, chopped ***3 tablespoons cider vinegar ***2 teaspoons Dijon mustard ***1 teaspoon honey ***5 tablespoons olive oil","directions":"Mix together vinegar, mustard and honey. Whisk in olive oil. Pour dressing over grated beets and cabbage, toss. Sprinkle walnuts on top."},{"name":"Broccoli and Red Pepper Salad","imageName":"broc_pepp","produceName":"Broccoli","ingredients":"1 large bunch broccoli, cut into florets and thin, tender stalks ***1\/2 cup pecan halves ***1\/2 cup sweet onion slices ***1 red bell pepper, cut into thin strips ***1 teaspoon sugar ***2 tablespoons white wine vinegar ***1 clove garlic ***1 tablespoon olive oil ***1\/2 teaspoon soy sauce","directions":"Combine sugar, white wine vinegar, garlic, olive oil and soy sauce in a small bowl and whisk together. Preheat oven to 350 degrees F. On a baking sheet, spread pecan halves and toast for 5 to 7 minutes. Blanch broccoli in boiling water for 1 minute. Drain and put in ice water for 30 seconds. Drain and cool. Combine broccoli, onion and red pepper slices. Just before serving, pour dressing over mixture and toss to coat. Sprinkle pecans on top."},{"name":"Couscous with Broccoli","imageName":"broc_cous","produceName":"Broccoli","ingredients":"2 cups water ***1\/2 cup raisins ***1 1\/2 cups broccoli florets ***1 to 2 green onions, sliced ***1 1\/2 cups whole-wheat couscous ***1\/2 cup almonds or other nuts (optional) ***1 can of garbanzo beans (15 ounces) (optional)","directions":"Bring water to boil, add raisins and broccoli. Once broccoli is tender (use paring knife in thick part of floret to tell tenderness), add green onions, couscous and garbanzo beans (optional) and almonds (optional). Turn off heat, cover and let sit for 5 minutes. Remove cover and fluff couscous with a fork."},{"name":"Sauteed Cabbage","imageName":"cab_saut","produceName":"Cabbage","ingredients":"1 head of cabbage, cored and shredded ***1 tablespoon olive oil","directions":"In a skillet, heat olive oil. Add shredded cabbage and pan fry only until wilted, about 10 minutes. Stir often. Season with curry or tarragon."},{"name":"Cabbage Soup","imageName":"cab_soup","produceName":"Cabbage","ingredients":"1 cabbage, shredded ***1 onion, chopped ***2 carrots, sliced ***1 potato, diced ***1 cup green beans, cut ***3 fresh basil leaves or 1\/4 teaspoon dried basil ***1 1\/2 cups boiling water ***2 tomatoes, chopped","directions":"Add all ingredients except tomatoes to boiling water. Cover and boil gently for 15 minutes. Add tomatoes to vegetable mixture. Continue cooking until vegetables are tender, about 20 minutes. Serve with grated Parmesan cheese."},{"name":"Glazed Carrots","imageName":"car_glaze","produceName":"Carrots","ingredients":"4 large carrots, peeled and cut into 2-inch sticks ***1 1\/2 tablespoons butter or margarine ***1 teaspoon sugar","directions":"Place the carrots in a large skillet. Dot with butter, then sprinkle with sugar. Add enough water to come halfway up on the carrots. Simmer until the carrots are tender and the liquid has reduced to a glaze, about 20 minutes."},{"name":"Simple Roasted Carrots","imageName":"car_simp","produceName":"Carrots","ingredients":"2 pounds carrots, peeled and cut into 3-inch strips ***2 tablespoons olive oil","directions":"Preheat oven to 475 degrees F. In bottom of broiler pan, toss carrots and oil. Spread into single layer and roast 12 minutes. Shake pan to toss carrots. Continue roasting about 8 more minutes, shaking pan twice, until carrots are browned and tender."},{"name":"Roasted Cauliflower","imageName":"caul_roast","produceName":"Cauliflower","ingredients":"1 medium head of cauliflower, cut into wedges ***4 tablespoons olive oil","directions":"Preheat oven to 400 degrees F. On foil lined baking sheet, place wedges and drizzle with 2 tablespoons of oil. Turn over and drizzle other side with 2 tablespoons of oil. Roast until tender and golden, about 20 minutes."},{"name":"Vegetables and Pasta","imageName":"caul_veg","produceName":"Cauliflower","ingredients":"1 cup cauliflower florets ***1 cup broccoli florets ***1\/2 cup carrots, sliced ***1\/4 cup green onions, sliced ***3\/4 cup pasta, cooked ***1\/2 cup Italian salad dressing","directions":"Cook pasta according to package directions. Add cauliflower and broccoli during the last minute of cooking. Drain. Rinse with cold water and drain well. In a large mixing bowl, combine pasta with broccoli, cauliflower, carrots and green onions. Add Italian dressing and toss to coat. Cover and let chill for at least 2 hours or overnight."},{"name":"Cauliflower Casserole","imageName":"caul_cass","produceName":"Cauliflower","ingredients":"5 tablespoons olive oil ***3 tablespoons flour ***1 1\/2 cups milk, warmed ***1 teaspoon nutmeg ***1\/2 cup Parmesan cheese, grated ***1 cauliflower (2 pounds), cored and broken into florets ***2 eggs, beaten","directions":"Preheat oven to 350 degrees F. Brush a baking pan with olive oil. Heat 4 tablespoons of olive oil. Add flour and stir well. Remove from heat and gently add warm milk. Return to low heat and stir with a spatula until thick. Add nutmeg and 2 tablespoons of grated cheese. Mix the cauliflower, eggs, white sauce and half the cheese. Pour the mixture into the baking pan and sprinkle the remaining cheese on top. Bake until the cauliflower is tender and the top turns golden."},{"name":"Braised Greens","imageName":"green_braise","produceName":"Greens","ingredients":"3 tablespoons olive oil ***1 medium onion, chopped fine ***5 medium garlic cloves, minced ***2 pounds kale or collard greens, ribs removed and leaves chopped into 3-inch pieces ***1 cup vegetable or chicken broth ***1 cup water ***2 teaspoons lemon juice","directions":"In Dutch oven over medium heat, heat 2 tablespoons oil. Add onion and cook, stirring occasionally, until softened and beginning to brown, about 4 to 5 minutes. Add garlic and greens and stir until greens begin to wilt, about 1 minute. Add broth and water. Cover pot and reduce heat to medium-low. Cook, stirring occasionally, until greens are tender. Kale will take about 25 to 35 minutes and collards 35 to 45 minutes. Remove lid and increase heat to medium-high. Cook, stirring occasionally, until most of liquid has evaporated (bottom of pot will be almost dry and greens will begin to sizzle), 8 to 12 minutes. Remove pot from heat. Stir in 2 teaspoons lemon juice and remaining tablespoon olive oil."},{"name":"Wilted Greens","imageName":"green_wilt","produceName":"Greens","ingredients":"2 large bunches Swiss chard, kale or mustard greens, rinsed ***1\/4 cup olive oil ***1 medium yellow onion, sliced thin","directions":"Tear the greens into pieces and discard stems. In a pot over medium heat, heat the oil. Add the onion and cook for 7 minutes. Add the greens and toss to coat. Cover and cook, stirring once, until wilted, about 2 minutes."},{"name":"Sauteed Kohlrabi","imageName":"koh_saut","produceName":"Kohlrabi","ingredients":"4 small kohlrabi, peeled and trimmed of leaves ***1 teaspoon salt ***1 medium onion, sliced ***2 tablespoons butter or margarine ***1 teaspoon dried basil leaves, crushed or 1 tablespoon fresh basil leaves, chopped","directions":"Grate the kohlrabi and place in a colander. Sprinkle with salt and let stand for 30 minutes, then squeeze the water out. In a skillet, melt butter or margarine. Brown the onions and stir in kohlrabi. Turn heat to low, cover and simmer for 10 minutes. Uncover and turn the heat to medium. Cook another 2 minutes. Sprinkle with basil."},{"name":"Kohlrabi and Red Radish Salad","imageName":"koh_red","produceName":"Kohlrabi","ingredients":"3 cups kohlrabi, grated 1 cup red radishes, sliced 1\/3 cup olive oil 1 tablespoon lemon juice 2 tablespoons white vinegar 2 teaspoons sugar","directions":"In a salad bowl, combine the kohlrabi and radishes. Whisk together the remaining ingredients and pour over the salad. Toss to coat."},{"name":"Layered Lettuce Salad","imageName":"lettuce_layer","produceName":"Lettuce","ingredients":"4 cups lettuce, washed and chopped ***1 large cucumber, washed and sliced thin ***1 cup onion, sliced thin ***1\/2 pound peas ***2\/3 cup low-fat plain yogurt ***1\/3 cup shredded cheese","directions":"In the bottom of a 9- by 13-inch pan, spread out the pieces of lettuce. Cover the lettuce with cucumbers, onions and peas. Spread with yogurt and top with cheese. Cover the pan and refrigerate overnight to allow flavors to blend."},{"name":"Braised Scallions and Peas","imageName":"onions_green_braise","produceName":"Onions, green","ingredients":"2 tablespoons unsalted butter ***1 teaspoon sugar ***12 scallions, halved lengthwise and cut crosswise into 1-inch pieces ***2 cups fresh peas ***2\/3 cup chicken stock","directions":"In a saucepan over medium heat, melt butter. Add sugar, scallions and peas. Cook 1 minute, stirring. Stir in stock and simmer, partially covered for 2 minutes or until peas are barely tender. Boil uncovered 1 to 2 minutes or until peas are tender and liquid is almost evaporated."},{"name":"Peas and Asparagus","imageName":"peas_asp","produceName":"Peas","ingredients":"2 tablespoons butter ***3\/4 cup green onions, chopped ***3\/4 pound green peas, shelled ***3\/4 pound asparagus, cut into 1\/4-inch slices ***1\/2 cup water","directions":"Melt butter over medium heat. Add onions and cook until soft. Add asparagus, peas and water. Cook until tender. Drain. Season with butter."},{"name":"Peas and Onions","imageName":"peas_onion","produceName":"Peas","ingredients":"5 tablespoons olive oil ***2 cups green peas, shelled ***3 green onions, chopped ***3 tablespoons fresh basil ***Parmesan cheese, grated","directions":"In large pan, heat olive oil. Add peas and green onions and saute for 2 to 3 minutes. Add basil and cover. Cook for 1 to 2 minutes. Sprinkle with Parmesan cheese before serving."},{"name":"Sugar Snap Peas with Lemon, Garlic and Basil","imageName":"peas_sugar","produceName":"Peas","ingredients":"1 pound sugar snap peas, with stems and strings removed ***2 tablespoons olive oil ***Lemon zest ***1 medium clove garlic, minced ***1 tablespoon lemon juice ***6 fresh basil leaves, chopped fine","directions":"Bring 6 cups of water to a boil. Add peas and cook until crisp and tender, about 2 minutes. Drain peas, shock in ice water, drain again and pat dry. In medium saute pan over medium- heat, heat oil. Add zest and garlic. Saute until garlic is soft but not browned, about 2 minutes. Add peas, lemon juice and basil. Toss to combine and cook until just heated through, about 1 to 2 minutes."},{"name":"Radish and Spinach Salad","imageName":"radishes_salad","produceName":"Radishes","ingredients":"1\/4 cup olive oil ***3 tablespoons wine vinegar ***1 teaspoon dried oregano ***1 teaspoon dried basil ***1\/2 cup scallions, sliced ***1 1\/2 cups white or red radishes, sliced ***10 cups spinach (torn into bite-size pieces) ***Pepper to taste","directions":"Combine the olive oil, vinegar, oregano, basil and pepper. Add the onion and radishes and marinate for at least 1 hour or overnight. Just before serving, pour the radish mixture and marinade over the spinach and toss to coat."},{"name":"Rhubarb Sauce","imageName":"rhubarb_suace","produceName":"Rhubarb","ingredients":"5 cups of rhubarb, cut into small pieces ***1 cup sugar ***1 teaspoon cinnamon","directions":"In a heavy saucepan, place rhubarb, sugar and cinnamon. Cover and cook slowly until rhubarb is tender, about 30 minutes. Serve hot over French toast or pancakes. Serve cold with meat and main dishes."},{"name":"Rhubarb Crisp","imageName":"rhubarb_crisp","produceName":"Rhubarb","ingredients":"2 pounds fresh rhubarb, cut into 1-inch pieces ***3\/4 cup sugar ***2 teaspoons vanilla extract ***1 1\/4 cup rolled oats ***1\/2 cup brown sugar ***1\/2 cup all-purpose flour ***1\/2 cup cold, unsalted butter","directions":"Over medium heat, cook the rhubarb and sugar until the rhubarb starts to break down, about 10 to 15 minutes. Mix in the vanilla extract and remove from heat. Put rhubarb mixture in oven-safe dish. Preheat the oven to 350 degrees F. In a large bowl, place the rolled oats, brown sugar and all purpose flour. Use 2 forks to cut the butter into the flour mixture until it resembles a coarse meal. Sprinkle the crisp topping over the fruit. Bake for 30 minutes until the top is set and golden."},{"name":"Sauteed Spinach","imageName":"spinich_saut","produceName":"Spinach","ingredients":"2 teaspoons olive oil ***4 cloves garlic, sliced ***1 pound spinach leaves","directions":"In large skillet over medium heat, heat oil. Add garlic and cook. Add spinach and cook until spinach wilts."},{"name":"Spinach Pie","imageName":"spinach_pie","produceName":"Spinach","ingredients":"1 frozen 9-inch pie shell, thawed ***4 cups spinach ***2 teaspoons olive oil ***1\/2 cup Swiss cheese, grated ***4 eggs, beaten ***1 1\/2 cups milk ***1 tablespoon flour ***1\/8 teaspoon nutmeg","directions":"Preheat oven to 400 degrees F. Bake empty pie shell for 10 minutes. Saute spinach in olive oil and spread cooked spinach on bottom of baked pie shell. Sprinkle cheese over spinach. Combine eggs, milk and flour and pour over cheese. Sprinkle with nutmeg. Bake at 375 F for 35 to 40 minutes or until a knife inserted into center comes out clean."},{"name":"Strawberry and Spinach Salad with Poppy Seed","imageName":"strawberries_poppy","produceName":"Strawberries","ingredients":"2 cups strawberries, sliced ***1 pound spinach leaves ***1\/2 cup sugar ***1\/4 teaspoon Worcestershire sauce ***1\/4 cup cider vinegar ***1\/2 cup olive oil ***1 tablespoon poppy seeds","directions":"Heat the ingredients for the dressing (sugar, Worcestershire sauce, cider vinegar and olive oil) until the sugar dissolves. Add the poppy seeds and cool. Toss dressing over strawberries and spinach."},{"name":"Strawberry Slushy","imageName":"strawberries_slush","produceName":"Strawberries","ingredients":"1 pound strawberries, stems removed ***1\/2 cup apple juice ***3 tablespoons sugar ***2 tablespoons lemon juice","directions":"Combine all ingredients into a blender. Process until smooth. Pour into glasses and chill for 1 to 2 hours in the freezer. Serve when mixture starts to turn icy."},{"name":"Mashed Turnips and Carrots","imageName":"turnip_mash","produceName":"Turnips","ingredients":"Use equal amounts of turnips and carrots ***Butter or margarine to taste","directions":"Peel turnips and carrots. Dice both into equal sizes. Boil until tender. Drain and mash. Add butter or margarine to taste."},{"name":"Turnip Soup","imageName":"turnip_soup","produceName":"Turnips","ingredients":"4 medium turnips, peeled and cut into chunks ***1 small onion, chopped ***1\/2 teaspoon fresh ginger root, grated","directions":"Peel the turnips and onion, and cut into chunks. Cover with water and boil until soft. Puree in blender. Add grated ginger root."},{"name":"Baked Turnips","imageName":"turnip_baked","produceName":"Turnips","ingredients":"12 small turnips, leaves attached ***1\/4 cup olive oil ***Salt and pepper","directions":"Preheat the oven to 350 degrees F. Wash and trim the root base from the turnips. Line a roasting pan with aluminum foil, covering its edges. Lay the turnips down, with the stem and leaves folded under the turnip bulb. Drizzle with olive oil and season with salt and pepper. Tightly cover the turnips with more aluminum foil and bake for 30 minutes."}]);

function ProducePage(app, window, produceItemSelectedTracker)
{
	this.app = app;
	this.window = window;
	this.produceItemSelectedTracker = produceItemSelectedTracker;
	
	this.visible = false;
	this.started = false;
	
	this.page = null;
	this.navBar = null;
	this.navBarTitle = null;
	this.infoBar = null;
	this.list = null;
	this.produce = [];

	this.createPage();
}

ProducePage.prototype.createPage = function()
{
	this.page = new dc.ui.Page();
	this.page.hide();
	
	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.infoBar = new dc.ui.InfoBar(
	{
		anchor:{top: this.app.settings.navBarHeight, left: 0},
		widthDelta: 0,
		height: this.app.settings.infoBarHeight,
		borders: {top:{width:1, color:'#333333'}}
	});
	
	var totalBarHeight = this.app.settings.navBarHeight + this.app.settings.infoBarHeight;
	this.list = new dc.ui.List(
	{
		anchor:{top: totalBarHeight, left: 0},
		widthDelta: 0,
		heightDelta: totalBarHeight
	});

	this.page.append(this.navBar);
	this.page.append(this.infoBar);
	this.page.append(this.list);
	this.window.append(this.page);
}

ProducePage.prototype.start = function()
{
	if (this.started) return;
	this.populateList();
}

ProducePage.prototype.setTitle = function(title)
{
	if (!this.navBarTitle)
	{
		this.navBarTitle = new dc.ui.NavBarItem({type:'title', value:title, position:'center'});
		this.navBar.append(this.navBarTitle);
	}
	else this.navBarTitle.setItem('title', title);
}

ProducePage.prototype.setMessage = function(message)
{
	if (this.infoBar) this.infoBar.setInfo(message);
}

ProducePage.prototype.populateList = function(produce)
{
	this.dataManager = this.app.dataManagers.produce;
	this.dataManager.getProduceList(new dc.Tracker(this.produceListReady, this));
}

ProducePage.prototype.produceListReady = function(status, data)
{
	if (status == 'error')
	{
		alert('Error getting produce list data.');
		return;
	}
	
	this.produce = data;
	this.list.build(this.produce.length, new dc.Provider(this.listItemProvider, this));
}

ProducePage.prototype.listItemProvider = function(num)
{
	var produceItem = this.produce[num];
	if (!produceItem) return null;
	
	var name = produceItem.name;
	
	var itemTracker = this.produceItemSelectedTracker.clone();
	itemTracker.setData(produceItem);

	var produceSettings = this.app.settings.produce;
	var listItem = new dc.ui.ListItem(
	{
		arrow: true,
		backgroundColor:'#ffffff',
		info:
		{
			image:
			{
				name: produceSettings.thumb.path + produceItem.imageName + produceSettings.thumb.ext,
				width: produceSettings.thumb.width,
				height: produceSettings.thumb.width
			},
			maxLineChars: 30,
			content: name
		},
		tracker: itemTracker	
	});
	
	return(listItem);
}

ProducePage.prototype.resetScroll = function()
{
	//if (this.list.scroll) this.list.scroll.scrollTo(0,0,0);
}

ProducePage.prototype.show = function()
{
	this.page.show();
	this.visible = true;
}

ProducePage.prototype.hide = function()
{
	this.page.hide();
	this.visible = false;
}




// Copyright 2012 Dale Musser

function Produce(app)
{
	this.app = app;
	
	this.visible = false;
	this.started = false;
	
	this.producePage = null;
	this.produceItemPage = null;
	this.errorPage = null;
	
	this.currentPage = null;
	this.currentProduce = null;

	this.window = new dc.ui.Window(
	{
		anchor: {top: this.app.settings.sasBarHeight, left:0},
		widthDelta: 0,
		heightDelta: this.app.settings.tabBarHeight + this.app.settings.sasBarHeight
	});
	this.window.hide();
	dc.ui.display.append(this.window);
	
	this.dataManager = this.app.dataManagers.produce;
	if (!this.dataManager || this.dataManager.getState() != 'ready') this.handleError();
	else this.init();
}

Produce.prototype.handleError = function()
{
	alert('Error accessing Produce data.');
}

Produce.prototype.init = function()
{
	this.producePage = new ProducePage(this.app, this.window, new dc.Tracker(this.produceItemSelected, this));
	this.producePage.setTitle("Produce");
	this.producePage.setMessage("Produce Available in Missouri");

	this.switchToPage(this.producePage);
}

Produce.prototype.produceItemSelected = function(produceItem)
{
	this.currentProduceItem = produceItem;
	
	if (!this.produceItemPage) this.produceItemPage = new ProduceItemPage(this.app, this.window, new dc.Tracker(this.produceItemBackSelected, this));
	
	this.produceItemPage.setTitle(this.currentProduceItem.name);
	this.produceItemPage.populate(this.currentProduceItem.id);
	
	this.switchToPage(this.produceItemPage);
}

Produce.prototype.produceItemBackSelected = function()
{
	this.switchToPage(this.producePage);
}

Produce.prototype.switchToPage = function(page)
{
	var previousPage = this.currentPage;
	this.currentPage = page;

	if (previousPage) previousPage.hide();
	this.currentPage.show();
}

Produce.prototype.show = function()
{
	this.window.show();
	this.visible = true;
	if (!this.started)
	{
		this.started = true;
		this.producePage.start();
	}
}

Produce.prototype.hide = function()
{
	this.window.hide();
	this.visible = false;
}






function ProduceItemPage(app, window, backSelectedTracker)
{
	this.app = app;
	this.window = window;
	this.backSelectedTracker = backSelectedTracker;
	
	this.visible = false;
	
	this.page = null;
	this.navBar = null;
	this.backButton = null;
	this.infoBox = null;
	this.produceItem = null;
	this.recipes = [];
	this.recipeList = null;
	this.recipePage = null;
	
	this.currentPage = null;
	
	this.recipeSelectedTracker = new dc.Tracker(this.recipeSelected, this);

	this.createPage();
}

ProduceItemPage.prototype.createPage = function()
{
	this.page = new dc.ui.Page();
	this.page.hide();
	
	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.backButton = new dc.ui.NavBarItem(
	{
		type : 'button',
		value : 'back',
		position :'left',
		tracker : this.backSelectedTracker
	});
	this.navBar.append(this.backButton);
	
	this.infoBox = new dc.ui.Box(
	{
		widthDelta: 40,
		heightDelta: this.app.settings.navBarHeight,
		anchor: {top: this.app.settings.navBarHeight, left: 20},
		scrollable: true,
		fontSize: 14
	});

	this.page.append(this.navBar);
	this.page.append(this.infoBox);
	this.window.append(this.page);
	
	this.switchToPage(this.page);
}

ProduceItemPage.prototype.setTitle = function(titleStr)
{
	if (!this.title)
	{
		this.title = new dc.ui.NavBarItem({type:'title', value:titleStr, position:'center'});
		this.navBar.append(this.title);
	}
	else
	{
		this.title.setTitle(titleStr);
	}
}

ProduceItemPage.prototype.populate = function(id)
{
	// clear any existing produce item info
	this.infoBox.setHtml('');

	this.dataManager = this.app.dataManagers.produce;
	this.dataManager.getProduceItem(id, new dc.Tracker(this.produceItemReady, this));
}

ProduceItemPage.prototype.produceItemReady = function(status, produceItem)
{
	if (status == 'error' || status == 'notFound')
	{
		alert('Error accessing data for a produce item.');
		return;
	}
	
	this.produceItem = produceItem;

	var imagePath = this.app.settings.produce.image.path + this.produceItem.imageName + this.app.settings.produce.image.ext;
	var produceInfo = '<div style="text-align:center;"><img style="padding: 10px;" src="' + imagePath + '" /></div><p><b>In Season:</b> ' + this.produceItem.inSeason + '</p><p><b>General Info:</b> ' + this.produceItem.generalInfo + '</p><p><b>Vitamins:</b> ' + this.produceItem.vitamins + '</p><p><b>Choosing:</b> ' + this.produceItem.choose + '</p><p><b>Storing:</b> ' + this.produceItem.store + '</p><p><b>Prepare:</b> ' + this.produceItem.prepare + '</p><p><b>Serving:</b> ' + this.produceItem.serving + '</p><br />';
	this.infoBox.setHtml(produceInfo);
	
	this.recipeDataManager = this.app.dataManagers.recipes;
	// do nothing about showing recipes if the recipe data manager doesn't exist or isn't ready
	if (!this.recipeDataManager || this.recipeDataManager.getState() != 'ready') return;
	this.recipeDataManager.getRecipeListForProduceItem(this.produceItem.name, new dc.Tracker(this.recipesReady, this));
}

ProduceItemPage.prototype.recipesReady = function(status, recipes)
{
	if (status == 'error') return; // do nothing if recipe list not available

	this.recipes = recipes;

	if (! this.recipes.length) return;  // no recipes
	
	var title;
	if (this.recipes.length == 1) title = 'Recipe';
	else title = 'Recipes';
	var listTitle = dc.$('h1',{css:{'font-size':'12pt','text-align':'center','background-color':'black','color':'white','padding':'6px','margin-bottom':'0'}, content:title});
	this.infoBox.appendHtml(listTitle);
	
	this.recipeList = new dc.ui.List(
	{
		positionType: 'relative',
		scrollable: false,
		height: 'auto',
		borders:{left:{width:1}, right:{width:1}}
	});
	this.recipeList.setMargin('bottom', 20);
	this.infoBox.append(this.recipeList);
	this.infoBox.appendHtml('<br /><br /><br />');
	this.recipeList.build(this.recipes.length, new dc.Provider(this.recipeListItemProvider, this));
}

ProduceItemPage.prototype.recipeListItemProvider = function(num)
{
	var recipe = this.recipes[num];
	if (!recipe) return null;
	
	var name = recipe.name;
	
	var itemTracker = this.recipeSelectedTracker.clone();
	itemTracker.setData(recipe);
	
	var recipesSettings = this.app.settings.recipes;
	var listItem = new dc.ui.ListItem(
	{
		arrow: true,
		backgroundColor:'#ffffff',
		info:
		{
			image:
			{
				name: recipesSettings.thumb.path + recipe.imageName + recipesSettings.thumb.ext,
				width: recipesSettings.thumb.width,
				height: recipesSettings.thumb.height
			},
			maxLineChars: 23,
			content: name
		},
		tracker: itemTracker	
	});
	
	return(listItem);
}

ProduceItemPage.prototype.recipeSelected = function(recipe)
{
	if (! this.recipePage)
	{
		this.recipePage = new RecipePage(this.app, this.window, new dc.Tracker(this.recipeBackButtonSelected, this));
		this.recipePage.setTitle('Recipe');
	}
	this.recipePage.populate(recipe.id);
	this.switchToPage(this.recipePage);
}

ProduceItemPage.prototype.recipeBackButtonSelected = function()
{
	this.switchToPage(this.page);
}

ProduceItemPage.prototype.switchToPage = function(page)
{
	var previousPage = this.currentPage;
	this.currentPage = page;

	if (previousPage) previousPage.hide();
	this.currentPage.show();
}

ProduceItemPage.prototype.show = function()
{
	this.currentPage.show();
	this.visible = true;
}

ProduceItemPage.prototype.hide = function()
{
	this.currentPage.hide();
	this.visible = false;
}



function ProduceDataManager(app, stateTracker)
{
	this.app = app;
	this.stateTracker = stateTracker;
	this.dataSource = this.app.settings.produce.data.src;
	this.dataScript = null;
	this.data = [];
	this.state = 'init';
	this.produceColumns = ['id','name','imageName','type','inSeason','generalInfo','vitamins','choose','store','prepare','serving'];
	this.produceColumnsString = 'id,name,imageName,type,inSeason,generalInfo,vitamins,choose,store,prepare,serving';
	this.produceList = null;
	this.dbParams = this.app.settings.db.params;
}

ProduceDataManager.prototype.init = function()
{
	if (window.localStorage.getItem('produce')) this.changeState('ready');
	else this.populateDB();
}

ProduceDataManager.prototype.populateDB = function()
{
	this.changeState('loading');
	this.dataScript = new dc.ScriptLoader(this.dataSource, new dc.Tracker(this.startPopulate, this));
}

ProduceDataManager.prototype.startPopulate = function(status)
{
	if (status == 'error')
	{
		this.changeState('error');
		return;
	}
	this.data = dc.getData('produce');
	this.changeState('loaded');

	var status = 'none';
	var error = null;
	var finishedTracker = new dc.Tracker(this.populateFinished, this);
	
	var pollStatus = function()
	{
		if (status == 'success')
		{
			window.localStorage.setItem('produce', '1.0');
			finishedTracker.invoke('success');
		}
		else if (status == 'error') finishedTracker.invoke('error', error);
		else setTimeout(pollStatus, 100);
	}
	setTimeout(pollStatus, 100);
	
	var onError = function(err) 
	{ 
		status = 'error'; 
		error = err; 
	}
	var onSuccess = function() 
	{ 
		status = 'success'; 
	}
	
	var context = this;
	var start = function(tx) 
	{ 
		// drop/create table
		tx.executeSql("DROP TABLE IF EXISTS produce");
				
		var sql =  "CREATE TABLE produce (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imageName TEXT, type TEXT, inSeason TEXT, generalInfo TEXT, vitamins TEXT, choose TEXT, store TEXT, prepare TEXT, serving TEXT)";
		tx.executeSql(sql);
		
		var recordCount = context.data.length;
		for (var i = 0; i < recordCount; i++)
		{
			var record = context.data[i];
			var values = "";
			var first = true;
			for (var property in record)
			{
				if (!first) values += ",";
				else first = false;
				var value = record[property].replace(/\'/g,"''");  // escape single quotes
				values += "'"+value+"'";  // put single quotes around value
			}
			
			sql = "INSERT INTO produce (name, imageName, type, inSeason, generalInfo, vitamins, choose, store, prepare, serving) VALUES (" + values + ")";
			tx.executeSql(sql);
		}
	}

	var db =  window.openDatabase(this.dbParams.name, this.dbParams.version, this.dbParams.title, this.dbParams.size);
	if (!db)
	{
		this.changeState('error');
		return;
	}
	this.changeState('populating');
	db.transaction(start, onError, onSuccess);
}

ProduceDataManager.prototype.populateFinished = function(status, error)
{
	if (status == 'error')
	{
		this.changeState('error');
		return;
	}
	
	this.changeState('ready');
}

ProduceDataManager.prototype.changeState = function(state)
{
	this.state = state;
	this.stateTracker.invoke(this.state);
}

ProduceDataManager.prototype.getState = function()
{
	return(this.state);
}

ProduceDataManager.prototype.getProduceList = function(statusTracker)
{
	if (this.produceList)
	{
		statusTracker.invoke('success', this.produceList);
		return;
	}

	var sql = "SELECT id, name, imageName FROM produce ORDER by name ASC";
	dc.queryDatabase(this.dbParams, sql, ['id','name','imageName'], new dc.Tracker(this.produceListRequestFinished, this, statusTracker));
}

ProduceDataManager.prototype.produceListRequestFinished = function(status, data, statusTracker)
{
	if (status == 'error')
	{
		statusTracker.invoke('error');
		return;
	}
	
	this.produceList = data;
	statusTracker.invoke('success', this.produceList);
}

ProduceDataManager.prototype.getProduceItem = function(id, statusTracker)
{
	var sql = "SELECT " + this.produceColumnsString + " FROM produce WHERE id = '" + id + "'";
	dc.queryDatabase(this.dbParams, sql, this.produceColumns, new dc.Tracker(this.produceItemRequestFinished, this, statusTracker));
}

ProduceDataManager.prototype.produceItemRequestFinished = function(status, data, statusTracker)
{	
	if (status == 'error')
	{
		statusTracker.invoke('error');
		return;
	}
	
	if (data.length != 1)
	{
		statusTracker.invoke('notFound');
		return;
	}

	statusTracker.invoke('success', data[0]);
}



// Copyright 2012 Dale Musser

function InSeason(app)
{
	this.app = app;
	
	this.visible = false;
	this.started = false;
	
	this.window = new dc.ui.Window(
	{
		anchor: {top: this.app.settings.sasBarHeight, left:0},
		widthDelta: 0,
		heightDelta: this.app.settings.tabBarHeight + this.app.settings.sasBarHeight
	});
	this.window.hide();
	dc.ui.display.append(this.window);
	
	this.page = new dc.ui.Page();
	this.window.append(this.page);

	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.title = new dc.ui.NavBarItem({type:'title', value:'In Season', position:'center'});
	this.navBar.append(this.title);	
	this.page.append(this.navBar);
}

InSeason.prototype.start = function()
{
	this.infoLoader = new dc.ScriptLoader(this.app.settings.inSeason.content.path, new dc.Tracker(this.infoLoaded, this));
}

InSeason.prototype.infoLoaded = function(tracker, event)
{
	if (event == 'error')
	{
		this.handleError();
	}
	else
	{
		this.infoBox = new dc.ui.Box(
		{
			widthDelta: 20,
			heightDelta: this.app.settings.navBarHeight,
			anchor: {top: this.app.settings.navBarHeight, left: 10},
			scrollable: true	
		});
		this.infoBox.setHtml(dc.getData('inSeason'));
		this.page.append(this.infoBox);
	}
}

InSeason.prototype.handleError = function()
{
	alert('Error loading In Season info.');
}

InSeason.prototype.show = function()
{
	this.window.show();
	this.visible = true;
	if (!this.started)
	{
		this.started = true;
		this.start();
	}
}

InSeason.prototype.hide = function()
{
	this.window.hide();
	this.visible = false;
}

dc.registerData('inSeason','<table class="inseason" style="margin-top:10px"><tr><th colspan="5" class="season">Spring<br /><span class="seasoninfo">March, April, May, Early June</span></th></tr><tr><th class="food">Food</th><th class="month">Mar</th><th class="month">Apr</th><th class="month">May</th><th class="month">Jun</th></tr><tr><td>Asparagus</td><td></td><td class="asparagus_color"></td><td class="asparagus_color"></td><td></td></tr><tr><td>Beets</td><td></td><td></td><td class="beets_color"></td><td class="beets_color"></td></tr><tr><td>Broccoli</td><td></td><td></td><td class="broccoli_color"></td><td class="broccoli_color"></td></tr><tr><td>Cabbage</td><td></td><td></td><td class="cabbage_color"></td><td class="cabbage_color"></td></tr><tr><td>Carrots</td><td></td><td></td><td class="carrots_color"></td><td class="carrots_color"></td></tr><tr><td>Cauliflower</td><td></td><td></td><td class="cauliflower_color"></td><td class="cauliflower_color"></td></tr><tr><td>Greens<br /><span class="foodinfo">collards, kale, Swiss chard</span></td><td></td><td></td><td class="greens_color"></td><td class="greens_color"></td></tr><tr><td>Kohlrabi</td><td></td><td></td><td class="kohlrabi_color"></td><td class="kohlrabi_color"></td></tr><tr><td>Lettuce</td><td></td><td class="lettuce_color"></td><td class="lettuce_color"></td><td class="lettuce_color"></td></tr><tr><td>Onions, green</td><td></td><td></td><td class="greenonions_color"></td><td class="greenonions_color"></td></tr><tr><td>Peas</td><td></td><td></td><td class="peas_color"></td><td class="peas_color"></td></tr><tr><td>Radishes</td><td></td><td class="radishes_color"></td><td class="radishes_color"></td><td class="radishes_color"></td></tr><tr><td>Rhubarb</td><td></td><td></td><td class="rhubarb_color"></td><td class="rhubarb_color"></td></tr><tr><td>Spinach</td><td class="spinach_color"></td><td class="spinach_color"></td><td class="spinach_color"></td><td class="spinach_color"></td></tr><tr><td>Strawberries</td><td></td><td></td><td class="strawberries_color"></td><td class="strawberries_color"></td></tr><tr><td>Turnips</td><td></td><td class="turnips_color"></td><td class="turnips_color"></td><td class="turnips_color"></td></tr></table><table class="inseason"><tr><th colspan="4" class="season">Summer<br /><span class="seasoninfo">Late June, July, August</span></th></tr><tr><th class="food">Food</th><th class="month">Jun</th><th class="month">Jul</th><th class="month">Aug</th></tr><tr><td>Bell Peppers</td><td></td><td class="bellpeppers_color"></td><td class="bellpeppers_color"></td></tr><tr><td>Blackberries</td><td></td><td class="blackberries_color"></td><td class="blackberries_color"></td></tr><tr><td>Blueberries</td><td class="blueberries_color"></td><td class="blueberries_color"></td><td class="blueberries_color"></td></tr><tr><td>Cantaloupe</td><td></td><td class="cantaloupe_color"></td><td class="cantaloupe_color"></td></tr><tr><td>Cherries, tart</td><td class="tartcherries_color"></td><td></td><td></td></tr><tr><td>Cucumbers</td><td></td><td class="cucumbers_color"></td><td class="cucumbers_color"></td></tr><tr><td>Eggplant</td><td></td><td class="eggplant_color"></td><td class="eggplant_color"></td></tr><tr><td>Garlic</td><td class="garlic_color"></td><td class="garlic_color"></td><td class="garlic_color"></td></tr><tr><td>Green Beans</td><td class="greenbeans_color"></td><td class="greenbeans_color"></td><td class="greenbeans_color"></td></tr><tr><td>Okra</td><td></td><td class="okra_color"></td><td class="okra_color"></td></tr><tr><td>Onions, dry</td><td class="dryonions_color"></td><td class="dryonions_color"></td><td class="dryonions_color"></td></tr><tr><td>Peaches</td><td class="peaches_color"></td><td class="peaches_color"></td><td class="peaches_color"></td></tr><tr><td>Potatoes</td><td class="potatoes_color"></td><td class="potatoes_color"></td><td class="potatoes_color"></td></tr><tr><td>Raspberries</td><td class="raspberries_color"></td><td class="raspberries_color"></td><td class="raspberries_color"></td></tr><tr><td>Summer Squash</td><td></td><td class="summersquash_color"></td><td class="summersquash_color"></td></tr><tr><td>Sweet Corn</td><td class="sweetcorn_color"></td><td class="sweetcorn_color"></td><td class="sweetcorn_color"></td></tr><tr><td>Tomatoes</td><td></td><td class="tomatoes_color"></td><td class="tomatoes_color"></td></tr><tr><td>Watermelon</td><td></td><td></td><td class="watermelon_color"></td></tr></table><table class="inseason"><tr><th colspan="5" class="season">Fall<br /><span class="seasoninfo">September, October, November, December</span></th></tr><tr><th class="food">Food</th><th class="month">Sep</th><th class="month">Oct</th><th class="month">Nov</th><th class="month">Dec</th></tr><tr><td>Apples</td><td class="apples_color"></td><td class="apples_color"></td><td class="apples_color"></td><td></td></tr><tr><td>Beets</td><td class="beets_color"></td><td class="beets_color"></td><td class="beets_color"></td><td></td></tr><tr><td>Broccoli</td><td class="broccoli_color"></td><td class="broccoli_color"></td><td class="broccoli_color"></td><td></td></tr><tr><td>Cabbage</td><td class="cabbage_color"></td><td class="cabbage_color"></td><td class="cabbage_color"></td><td></td></tr><tr><td>Carrots</td><td class="carrots_color"></td><td class="carrots_color"></td><td class="carrots_color"></td><td></td></tr><tr><td>Cauliflower</td><td class="cauliflower_color"></td><td class="cauliflower_color"></td><td class="cauliflower_color"></td><td></td></tr><tr><td>Greens<br /><span class="foodinfo">collards, kale, Swiss chard</span></td><td class="greens_color"></td><td class="greens_color"></td><td class="greens_color"></td><td></td></tr><tr><td>Lettuce</td><td class="lettuce_color"></td><td class="lettuce_color"></td><td class="lettuce_color"></td><td></td></tr><tr><td>Pumpkin</td><td class="pumpkin_color"></td><td class="pumpkin_color"></td><td class="pumpkin_color"></td><td></td></tr><tr><td>Radishes</td><td class="radishes_color"></td><td class="radishes_color"></td><td class="radishes_color"></td><td></td></tr><tr><td>Spinach</td><td class="spinach_color"></td><td class="spinach_color"></td><td class="spinach_color"></td><td></td></tr><tr><td>Sweet Potatoes</td><td class="sweetpotatoes_color"></td><td class="sweetpotatoes_color"></td><td class="sweetpotatoes_color"></td><td class="sweetpotatoes_color"></td></tr><tr><td>Turnips</td><td class="turnips_color"></td><td class="turnips_color"></td><td class="turnips_color"></td><td></td></tr><tr><td>Winter Squash</td><td class="wintersquash_color"></td><td class="wintersquash_color"></td><td class="wintersquash_color"></td><td class="wintersquash_color"></td></tr></table><br /><br /><br />'
);

// Copyright 2012 Dale Musser

function About(app)
{
	this.app = app;
	
	this.visible = false;
	this.started = false;
	
	this.window = new dc.ui.Window(
	{
		anchor: {top: this.app.settings.sasBarHeight, left:0},
		widthDelta: 0,
		heightDelta: this.app.settings.tabBarHeight + this.app.settings.sasBarHeight	
	});
	this.window.hide();
	dc.ui.display.append(this.window);
	
	this.page = new dc.ui.Page();
	this.window.append(this.page);

	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.title = new dc.ui.NavBarItem({type:'title', value:'About', position:'center'});
	this.navBar.append(this.title);
	this.page.append(this.navBar);
}

About.prototype.start = function()
{
	this.infoLoader = new dc.ScriptLoader(this.app.settings.about.content.path, new dc.Tracker(this.infoLoaded, this));
}

About.prototype.infoLoaded = function(tracker, event)
{
	if (event == 'error')
	{
		this.handleError();
	}
	else
	{
		// try using padding here to see if it works
		this.infoBox = new dc.ui.Box(
		{
			widthDelta: 40,
			heightDelta: this.app.settings.navBarHeight,
			anchor: {top: this.app.settings.navBarHeight, left: 20},
			scrollable: true	
		});
		this.infoBox.setHtml(dc.getData('aboutinfo'));
		this.page.append(this.infoBox);
	}
}

About.prototype.handleError = function()
{
	alert('Error loading About info.');
}

About.prototype.show = function()
{
	this.window.show();
	this.visible = true;
	if (!this.started)
	{
		this.started = true;
		this.start();
	}
}

About.prototype.hide = function()
{
	this.window.hide();
	this.visible = false;
}

dc.registerData('aboutinfo','<p>Seasonal and simple is a guide to help you find, select, store, and prepare fresh fruits and vegetables. The recipes use simple preparations and seasonings, so you can taste the goodness of a fruit or vegetable at the peak of its flavor. The great variety of colors, flavors and textures of fruits and vegetables makes eating them a sensual pleasure.</p><p>The fruits and vegetables are listed in the guide by their growing season — spring, summer and fall — with fruits and vegetables that grow best in cooler weather listed in both the spring and the fall sections. Recipes combining fruits or vegetables only contain fruits or vegetables grown in the same season.</p><p>Serving suggestions and recipes can be both a starting point and an inspiration for your seasonal eating. When you find a recipe that uses a preparation method that fits with your cooking experience or equipment — like roasting or grilling — you can try the method with other vegetables. Likewise, if you enjoy a seasoning — like basil or garlic — on one vegetable, then try the seasoning on other vegetables. You can hear Chef Brook Harlan talk about substituting vegetables in recipes and watch his demonstration of four recipes found in the guide online at <a href="http://extension.missouri.edu/healthylife" target="_blank">http://extension.missouri.edu/healthylife</a>.</p><p>Nutrients and associated health benefits are listed with each fruit or vegetable. The colors of fruits and vegetables are indicators of phytochemicals — the chemicals plants produce like lycopene, luetin and quercetin. These chemicals are studied for how they contribute to a longer, more healthful life. The message from the studies is simple — eating a variety of colors of fruits and vegetables is an easy way to enjoy all the goodness of the wide array of nutrients found in different fruits and vegetables.</p><p>You can continue to enjoy the fruits and vegetables grown during the spring, summer and fall, when you preserve them at the peak of their flavor and freshness. Most MU Extension centers provide information that will help you learn the best way to can, freeze or dry food. To locate an MU Extension center, or find additional Web-based information, visit <a href="http://extension.missouri.edu" target="_blank">http://extension.missouri.edu</a>.</p><p>Choose fruits and vegetables in season and you get all the benefits — food that tastes good, is good for you and is reasonably priced. Whether you get your fruits and vegetables at your farmer’s market, a roadside farm stand, through Community Supported Agriculture (CSA), or from your own garden or local grocery store, enjoy the goodness of fruits and vegetables. Eat a variety every day.</p><p>This application was created by the following students, faculty, and staff at the <a href="http://www.missouri.edu" target="_blank">University of Missouri</a></p><h1 style="margin-top:20px; font-size:14px; border-bottom: 1px solid black;">Human Environmental Sciences Extension</h1><p><strong>Jo Britt-Rankin</strong><br />Associate Dean and Associate Professor<br />Human Environmental Sciences Extension<br />and State Specialist</p><p><strong>Cindy Deblauw</strong><br />Extension Associate<br />Human Environmental Sciences Extension</p><h1 style="margin-top:20px; font-size:14px; border-bottom: 1px solid black;">CS &amp; IT Programs</h1><p><strong>Bret Pudenz</strong><br />Student<br />BS Computer Science</p><p><strong>Matthew Jones</strong><br />Student<br />BS Computer Science</p><p><strong>Jazmine Tezak</strong><br />Student<br />BS Computer Science<br /></p><p><strong>Dale Musser</strong><br />Director,<br />Information Technology Program<br />Associate Teaching Professor,<br />Computer Science<br /></p><h1 style="margin-top:20px; font-size:14px; border-bottom: 1px solid black;">Journalism</h1><p><strong>Corey Motley</strong><br />Student<br />Journalism</p><p><strong>Brittany Ness</strong><br />Student<br />Journalism</p><p><strong>Mike McKean</strong><br />Director<br />Futures Lab<br />Reynolds Journalism Institute</p><p><strong>Keith Politte</strong><br />Manager<br />Technology Testing Center</p><hr style="margin-left:30px; margin-right:30px;" /><p>Funding for this project was provided by <a href="http://extension.missouri.edu" target="_blank">University of Missouri Extension</a>.</p><p>&quot;Seasonal and simple&quot; Copyright &copy; 2012 <a href="http://www.umsystem.edu/" target="_blank">Curators of the University of Missouri</a>, all rights reserved.</p><p>This application was developed using <a href="http://digitalcompounds.com" target="_blank">Digital Compounds</a> for mobile and web development.  <a href="http://digitalcompounds.com" target="_blank">Digital Compounds</a> Copyright &copy; 2011-2012 Dale Musser.</p><br /><br /><br /><br />');

// Copyright 2012 Dale Musser

function Startup(app, tracker)
{
	this.app = app;
	this.tracker = tracker;
	this.managersFinished = 
	{
		produce: false,
		recipes: false,
		markets: false
	};
	this.modulesReady =
	{
		produce: false,
		recipes: false,
		markets: false,
		inSeason: false,
		about: false
	};
	
	this.visible = true;
	
	this.window = new dc.ui.Window(
	{
		anchor: {top: this.app.settings.sasBarHeight, left:0},
		widthDelta: 0,
		heightDelta: this.app.settings.sasBarHeight	
	});
	dc.ui.display.append(this.window);
	
	this.page = new dc.ui.Page();
	this.window.append(this.page);

	this.splashBox = new dc.ui.Box(
	{
		anchor: {top:10, left: 0},
		scrollable: true,
		contentAlignment: 'center'	
	});
	this.page.append(this.splashBox);

	this.splashImage = new dc.ui.Image(
	{
		src: this.app.settings.startup.image.path + 'splash.jpg',
		borders: {top:{width:1},right:{width:1},bottom:{width:1},left:{width:1}}	
	});
	this.splashBox.append(this.splashImage);

	this.splashVersion = new dc.ui.Paragraph(
	{
		html: 'Version ' + this.app.settings.version,
		fontSize: 12,
		margins: {top:5, right:5, bottom:5, left:5},
		contentAlignment: 'center'	
	});
	this.splashBox.append(this.splashVersion);

	this.splashCopyright = new dc.ui.Paragraph(
	{
		html: 'Copyright &copy; 2012<br />Curators of the University of Missouri,<br />all rights reserved.',
		fontSize: 10,
		margins: {top:4, right:4, bottom:4, left:4},
		contentAlignment: 'center'	
	});
	this.splashBox.append(this.splashCopyright);
	this.splashBox.appendHtml('<br /><br /><br /><br /><br /><br />');
}

Startup.prototype.begin = function()
{
	this.startDataManagers();
}

Startup.prototype.startDataManagers = function()
{
	this.app.dataManagers.produce = new ProduceDataManager(this.app, new dc.Tracker(this.handleDataManagerStateChange, this, 'produce'));
	this.app.dataManagers.produce.init();
	this.app.dataManagers.recipes = new RecipesDataManager(this.app, new dc.Tracker(this.handleDataManagerStateChange, this, 'recipes'));
	this.app.dataManagers.recipes.init();
	this.app.dataManagers.markets = new MarketsDataManager(this.app, new dc.Tracker(this.handleDataManagerStateChange, this, 'markets'));
	this.app.dataManagers.markets.init();
}

Startup.prototype.handleDataManagerStateChange = function(state, managerName)
{
	if (state == 'error' || state == 'ready') this.managersFinished[managerName] = true;
	else return;
	
	// check if all are finished
	var finished = true;
	for (var name in this.managersFinished)
	{
		if (!this.managersFinished[name]) 
		{
			finished = false;
			break;
		}
	}
	
	if (finished) 
	{
		this.startSections();
	}
}

Startup.prototype.startSections = function()
{
	this.app.produce = new Produce(this.app);
	this.app.recipes = new Recipes(this.app);
	this.app.markets = new Markets(this.app);
	this.app.inSeason = new InSeason(this.app);
	this.app.about = new About(this.app);
	
	this.tracker.invoke();
}

Startup.prototype.show = function()
{
	this.window.show();
	this.visible = false;
}

Startup.prototype.hide = function()
{
	this.window.hide();
	this.visible = false;
}







function MarketsPage(app, window, countyName, searchSelectedTracker, marketSelectedTracker)
{
	this.app = app;
	this.window = window;
	this.countyName = countyName;
	this.searchSelectedTracker = searchSelectedTracker;
	this.marketSelectedTracker = marketSelectedTracker;
	
	this.visible = false;
	this.started = false;
	
	this.page = null;
	this.navBar = null;
	this.navBarTitle = null;
	this.infoBar = null;
	this.searchButton = null;
	this.list = null;
	this.markets = [];

	this.createPage();
}

MarketsPage.prototype.start = function()
{
	if (this.started) return;
	
	this.started = true;
	this.populateList();
}

MarketsPage.prototype.createPage = function()
{
	this.page = new dc.ui.Page();
	this.page.hide();
	
	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.searchButton = new dc.ui.NavBarItem({type:'button', value: 'search', position: 'right', tracker: this.searchSelectedTracker});
	this.navBar.append(this.searchButton);

	this.infoBar = new dc.ui.InfoBar(
	{
		anchor:{top: this.app.settings.navBarHeight, left: 0},
		widthDelta: 0,
		height: this.app.settings.infoBarHeight,
		borders: {top:{width:1, color:'#333333'}}
	});
	
	var totalBarHeight = this.app.settings.navBarHeight + this.app.settings.infoBarHeight;
	this.list = new dc.ui.List(
	{
		anchor:{top: totalBarHeight, left: 0},
		widthDelta: 0,
		heightDelta: totalBarHeight	
	});

	this.page.append(this.navBar);
	this.page.append(this.infoBar);
	this.page.append(this.list);
	this.window.append(this.page);
}

MarketsPage.prototype.setTitle = function(title)
{
	if (!this.navBarTitle)
	{
		this.navBarTitle = new dc.ui.NavBarItem({type:'title', value:title, position:'center'});
		this.navBar.append(this.navBarTitle);
	}
	else this.navBarTitle.setItem('title', title);
}

MarketsPage.prototype.setMessage = function(message)
{
	if (this.infoBar) this.infoBar.setInfo(message);
}

MarketsPage.prototype.populateList = function()
{
	this.dataManager = this.app.dataManagers.markets;
	this.dataManager.getMarkets(this.countyName, new dc.Tracker(this.marketListReady, this));
}

MarketsPage.prototype.marketListReady = function(status, data)
{
	if (status == 'error')
	{
		alert('Error getting market list data.');
		return;
	}
	
	this.markets = data;
	this.list.build(this.markets.length, new dc.Provider(this.listItemProvider, this));
}

MarketsPage.prototype.listItemProvider = function(num)
{
	var market = this.markets[num];
	if (!market) return null;
	
	var name = market.name;
	
	var itemTracker = this.marketSelectedTracker.clone();
	itemTracker.setData(market);

	var listItem = new dc.ui.ListItem(
	{
		arrow: true,
		backgroundColor:'#ffffff',
		info:
		{
			content: name,
			maxLineChars: 35
		},
		tracker: itemTracker	
	});
	
	return(listItem);
}

MarketsPage.prototype.remove = function()
{
	this.page.remove();
}

MarketsPage.prototype.show = function()
{
	this.page.show();
	this.visible = true;
}

MarketsPage.prototype.hide = function()
{
	this.page.hide();
	this.visible = false;
}




function MarketsDataManager(app, stateTracker)
{
	this.app = app;
	this.stateTracker = stateTracker;
	this.dataSource = this.app.settings.markets.data.src;
	this.dataScript = null;
	this.data = [];
	this.state = 'init';
	this.marketsColumns = ['id','county', 'city', 'name', 'startMonth', 'endMonth', 'openDays', 'contact', 'mail', 'email1', 'email2', 'web', 'phone1', 'phone1_note', 'phone2', 'phone2_note', 'directions', 'other'];
	this.marketsColumnsString = 'id, county, city, name, startMonth, endMonth, openDays, contact, mail, email1, email2, web, phone1, phone1_note, phone2, phone2_note, directions, other';
	this.dbParams = this.app.settings.db.params;
}

MarketsDataManager.prototype.init = function()
{
	var marketsVersion = window.localStorage.getItem('markets');
	if (!marketsVersion || marketsVersion == '1.0') this.populateDB();
	else this.changeState('ready');
}

MarketsDataManager.prototype.populateDB = function()
{
	this.changeState('loading');
	this.dataScript = new dc.ScriptLoader(this.dataSource, new dc.Tracker(this.startPopulate, this));
}

MarketsDataManager.prototype.startPopulate = function(status)
{
	if (status == 'error')
	{
		this.changeState('error');
		return;
	}
	this.data = dc.getData('markets');
	this.changeState('loaded');

	var status = 'none';
	var error = null;
	var finishedTracker = new dc.Tracker(this.populateFinished, this);
	
	var pollStatus = function()
	{
		if (status == 'success')
		{
			window.localStorage.setItem('markets', '1.1');
			finishedTracker.invoke('success');
		}
		else if (status == 'error') finishedTracker.invoke('error', error);
		else setTimeout(pollStatus, 100);
	}
	setTimeout(pollStatus, 100);
	
	var onError = function(err) 
	{ 
		status = 'error'; 
		error = err; 
	}
	var onSuccess = function() 
	{ 
		status = 'success'; 
	}
	
	var context = this;
	var start = function(tx) 
	{ 
		// drop/create table
		tx.executeSql("DROP TABLE IF EXISTS markets");
				
		var sql =  "CREATE TABLE markets (id INTEGER PRIMARY KEY AUTOINCREMENT, county TEXT, city TEXT, name TEXT, startMonth TEXT, endMonth TEXT, openDays TEXT, contact TEXT, mail TEXT, email1 TEXT, email2 TEXT, web TEXT, phone1 TEXT, phone1_note TEXT, phone2 TEXT, phone2_note TEXT, directions TEXT, other TEXT)";
		tx.executeSql(sql);
		
		var recordCount = context.data.length;
		for (var i = 0; i < recordCount; i++)
		{
			var record = context.data[i];
			var values = "";
			var first = true;
			for (var property in record)
			{
				if (!first) values += ",";
				else first = false;
				var value = record[property].replace(/\'/g,"''");  // escape single quotes
				values += "'"+value+"'";  // put single quotes around value
			}
			
			sql = "INSERT INTO markets (county, city, name, startMonth, endMonth, openDays, contact, mail, email1, email2, web, phone1, phone1_note, phone2, phone2_note, directions, other) VALUES (" + values + ")";
			tx.executeSql(sql);
		}
	}

	var db =  window.openDatabase(this.dbParams.name, this.dbParams.version, this.dbParams.title, this.dbParams.size);
	if (!db)
	{
		this.changeState('error');
		return;
	}
	this.changeState('populating');
	db.transaction(start, onError, onSuccess);
}

MarketsDataManager.prototype.populateFinished = function(status, error)
{
	if (status == 'error')
	{
		this.changeState('error');
		return;
	}
	
	this.changeState('ready');
}

MarketsDataManager.prototype.changeState = function(state)
{
	this.state = state;
	this.stateTracker.invoke(this.state);
}

MarketsDataManager.prototype.getState = function()
{
	return(this.state);
}

MarketsDataManager.prototype.getMarkets = function(countyName, statusTracker)
{	
	var sql = '';
	if (countyName == 'All Missouri Counties') sql = "SELECT id, county, city, name FROM markets ORDER by name ASC";
	else
	{
		var name = countyName.replace(/\'/g,"''");
		sql = "SELECT id, county, city, name FROM markets WHERE county='" + name + "' ORDER by name ASC";
	}
	dc.queryDatabase(this.dbParams, sql, ['id','county','city','name'], new dc.Tracker(this.marketListRequestFinished, this, statusTracker));
}

MarketsDataManager.prototype.marketListRequestFinished = function(status, data, statusTracker)
{
	if (status == 'error')
	{
		statusTracker.invoke('error');
		return;
	}

	statusTracker.invoke('success', data);
}

MarketsDataManager.prototype.getMarket = function(id, statusTracker)
{
	var sql = "SELECT " + this.marketsColumnsString + " FROM markets WHERE id = '" + id + "'";
	dc.queryDatabase(this.dbParams, sql, this.marketsColumns, new dc.Tracker(this.marketRequestFinished, this, statusTracker));
}

MarketsDataManager.prototype.marketRequestFinished = function(status, data, statusTracker)
{	
	if (status == 'error')
	{
		statusTracker.invoke('error');
		return;
	}
	
	if (data.length != 1)
	{
		statusTracker.invoke('notFound');
		return;
	}

	statusTracker.invoke('success', data[0]);
}

MarketsDataManager.prototype.getCounties = function(statusTracker)
{
	var sql = "SELECT DISTINCT(county) AS name FROM markets ORDER BY county ASC";
	dc.queryDatabase(this.dbParams, sql, ['name'], new dc.Tracker(this.countiesRequestFinished, this, statusTracker));
}

MarketsDataManager.prototype.countiesRequestFinished = function(status, data, statusTracker)
{	
	if (status == 'error')
	{
		statusTracker.invoke('error');
		return;
	}
	
	if (!(data.length > 0))
	{
		statusTracker.invoke('notFound');
		return;
	}

	statusTracker.invoke('success', data);
}




function CountiesPage(app, window, backSelectedTracker, countySelectedTracker)
{
	this.app = app;
	this.window = window;
	this.backSelectedTracker = backSelectedTracker;
	this.countySelectedTracker = countySelectedTracker;
	
	this.visible = false;
	
	this.page = null;
	this.navBar = null;
	this.infoBar = null;
	this.backButton = null;
	this.list = null;
	this.counties = [];

	this.createPage();
	this.populateList();
}

CountiesPage.prototype.createPage = function()
{
	this.page = new dc.ui.Page();
	this.page.hide();
	
	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.backButton = new dc.ui.NavBarItem({type:'button', value: 'back', position: 'left', tracker: this.backSelectedTracker});
	this.navBar.append(this.backButton);
	
	this.infoBar = new dc.ui.InfoBar(
	{
		anchor:{top: this.app.settings.navBarHeight, left: 0},
		widthDelta: 0,
		height: this.app.settings.infoBarHeight,
		borders: {top:{width:1, color:'#333333'}}
	});
	
	var totalBarHeight = this.app.settings.navBarHeight + this.app.settings.infoBarHeight;
	this.list = new dc.ui.List(
	{
		anchor:{top: totalBarHeight, left: 0},
		widthDelta: 0,
		heightDelta: totalBarHeight	
	});

	this.page.append(this.navBar);
	this.page.append(this.infoBar);
	this.page.append(this.list);
	this.window.append(this.page);
}

CountiesPage.prototype.setTitle = function(title)
{
	if (!this.navBarTitle)
	{
		this.navBarTitle = new dc.ui.NavBarItem({type:'title', value:title, position:'center'});
		this.navBar.append(this.navBarTitle);
	}
	else this.navBarTitle.setItem('title', title);
}

CountiesPage.prototype.setMessage = function(message)
{
	if (this.infoBar) this.infoBar.setInfo(message);
}

CountiesPage.prototype.populateList = function()
{
	this.dataManager = this.app.dataManagers.markets;
	this.dataManager.getCounties(new dc.Tracker(this.countiesReady, this));
}

CountiesPage.prototype.countiesReady = function(status, counties)
{
	if (status == 'error' || status == 'notFound')
	{
		alert('Error getting a list of counties.');
		return;
	}
	
	this.counties = counties;
	this.list.build(this.counties.length, new dc.Provider(this.listItemProvider, this));
}

CountiesPage.prototype.listItemProvider = function(num)
{
	var countyName = '';
	
	if (num == 0) countyName = 'All Missouri Counties';
	else 
	{	var county = this.counties[num-1];
		if (!county) countyName = 'Not Found';
		else countyName = county.name;
	}
	
	var itemTracker = this.countySelectedTracker.clone();
	itemTracker.setData(countyName);
	
	var listItem = new dc.ui.ListItem(
	{
		arrow: true,
		backgroundColor:'#ffffff',
		info:
		{
			content: countyName
		},
		maxLineChars: 35,
		tracker: itemTracker	
	});

	return(listItem);
}

CountiesPage.prototype.show = function()
{
	this.page.show();
	this.visible = true;
}

CountiesPage.prototype.hide = function()
{
	this.page.hide();
	this.visible = false;
}


// Copyright 2012 Dale Musser

function Markets(app)
{
	this.app = app;
	
	this.visible = false;
	
	this.started = false;
	
	this.allMarketsPage = null;
	this.countiesPage = null;
	this.countyMarketsPage = null;
	this.marketPage = null;
	
	this.currentMarketsPage = null;
	this.currentPage = null;
	
	this.currentMarket = null;
	this.currentCounty = null;

	this.window = new dc.ui.Window(
	{
		anchor: {top: this.app.settings.sasBarHeight, left:0},
		widthDelta: 0,
		heightDelta: this.app.settings.tabBarHeight + this.app.settings.sasBarHeight
	});
	this.window.hide();
	dc.ui.display.append(this.window);
	
	this.dataManager = this.app.dataManagers.markets;
	if (!this.dataManager || this.dataManager.getState() != 'ready') this.handleError();
	else this.init();
}

Markets.prototype.handleError = function()
{
	alert('Error accessing Markets data.');
}

Markets.prototype.init = function()
{
	this.allMarketsPage = new MarketsPage(this.app, this.window, 'All Missouri Counties', new dc.Tracker(this.searchSelected, this), new dc.Tracker(this.marketSelected, this));
	this.allMarketsPage.setTitle("Find It");
	this.allMarketsPage.setMessage("All Farmer's Markets in Missouri");
	
	this.currentMarketsPage = this.allMarketsPage;
	this.switchToPage(this.allMarketsPage);
}

Markets.prototype.searchSelected = function()
{
	if (!this.countiesPage)
	{
		this.countiesPage = new CountiesPage(this.app, this.window, new dc.Tracker(this.countiesBackSelected, this), new dc.Tracker(this.countySelected, this));
		this.countiesPage.setTitle('Find It');
		this.countiesPage.setMessage("Find Farmer's Markets in a Missouri County");
	}
	
	this.switchToPage(this.countiesPage);
}

Markets.prototype.countiesBackSelected = function()
{
	this.switchToPage(this.currentMarketsPage);
}

Markets.prototype.countySelected = function(countyName)
{
	this.currentCounty = countyName;
	
	if (this.currentCounty == 'All Missouri Counties')
	{
		this.currentMarketsPage = this.allMarketsPage;
		this.switchToPage(this.allMarketsPage);
		return;
	}
	
	// rather than removing I could implement re-use of the page by updating it through methods, but this may be easier
	if (this.countyMarketsPage) this.countyMarketsPage.remove();
	
	this.countyMarketsPage = new MarketsPage(this.app, this.window, countyName, new dc.Tracker(this.searchSelected, this), new dc.Tracker(this.marketSelected, this));
	this.countyMarketsPage.setTitle("Find It");

	this.countyMarketsPage.setMessage("Markets in " + this.currentCounty + " County Missouri");	
	this.currentMarketsPage = this.countyMarketsPage;
	this.switchToPage(this.currentMarketsPage);
	this.currentMarketsPage.start();
}

Markets.prototype.marketSelected = function(market)
{
	this.currentMarket = market;
	
	if (!this.marketPage) this.marketPage = new MarketPage(this.app, this.window, new dc.Tracker(this.marketBackSelected, this));
	
	this.marketPage.setTitle('Market Info');
	this.marketPage.populate(this.currentMarket.id);
	
	this.switchToPage(this.marketPage);
}

Markets.prototype.marketBackSelected = function()
{
	this.switchToPage(this.currentMarketsPage);
}

Markets.prototype.switchToPage = function(page)
{
	var previousPage = this.currentPage;
	this.currentPage = page;
	
	if (previousPage) previousPage.hide();
	this.currentPage.show();
}

Markets.prototype.show = function()
{
	this.window.show();
	this.visible = true;
	if (!this.started)
	{
		this.started = true;
		this.allMarketsPage.start();
	}
}

Markets.prototype.hide = function()
{
	this.window.hide();
	this.visible = false;
}


function MarketPage(app, window, backSelectedTracker)
{
	this.app = app;
	this.window = window;
	this.backSelectedTracker = backSelectedTracker;
	
	this.visible = false;
	
	this.page = null;
	this.navBar = null;
	this.backButton = null;
	this.infoBox = null;
	this.market = null;

	this.createPage();
}

MarketPage.prototype.createPage = function()
{
	this.page = new dc.ui.Page();
	this.page.hide();
	
	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.backButton = new dc.ui.NavBarItem(
	{
		type : 'button',
		value : 'back',
		position :'left',
		tracker : this.backSelectedTracker
	});
	this.navBar.append(this.backButton);
	
	this.infoBox = new dc.ui.Box(
	{
		widthDelta: 40,
		heightDelta: this.app.settings.navBarHeight,
		anchor: {top: this.app.settings.navBarHeight, left: 20},
		scrollable: true,
		fontSize: 14	
	});
	
	this.page.append(this.navBar);
	this.page.append(this.infoBox);
	this.window.append(this.page);
}

MarketPage.prototype.setTitle = function(titleStr)
{
	if (!this.title)
	{
		this.title = new dc.ui.NavBarItem({type:'title', value:titleStr, position:'center'});
		this.navBar.append(this.title);
	}
	else
	{
		this.title.setTitle(titleStr);
	}
}

MarketPage.prototype.populate = function(id)
{
	// clear any existing produce item info
	this.infoBox.setHtml('');

	this.dataManager = this.app.dataManagers.markets;
	this.dataManager.getMarket(id, new dc.Tracker(this.marketReady, this));
}

MarketPage.prototype.marketReady = function(status, market)
{
	if (status == 'error' || status == 'notFound')
	{
		alert('Error accessing market data.');
		return;
	}

	this.market = market;
	
	css =
	{
		'text-align':'center',
		'font-size':'14px'
	}
	var title = dc.$('h1', {css:css,content:market.name});
	this.infoBox.setHtml(title);
	
	var county = dc.$('p', {content: '<b>County:</b> ' + market.county});
	this.infoBox.appendHtml(county);
	
	var city = dc.$('p', {content: '<b>City:</b> ' + market.city});
	this.infoBox.appendHtml(city);
	
	if (market.openDays)
	{
		var open = dc.$('p', {content: '<b>Open:</b> ' + market.openDays});
		this.infoBox.appendHtml(open);
	}
	
	if (market.contact)
	{
		var contact = dc.$('p', {content: '<b>Contact:</b> ' + market.contact});
		this.infoBox.appendHtml(contact);
	}
	
	if (market.mail)
	{
		var preparedAddress = market.mail.replace(/ /g,"+"); // convert spaces to + character
		var mapUrl = '<a href="http://maps.google.com/maps?q=' + preparedAddress + '" target="_blank">Google Map</a>';	

		var mail = dc.$('p', {content: '<b>Mail:</b> ' + market.mail + '<br />' + mapUrl});
		this.infoBox.appendHtml(mail);
	}
	
	if (market.email1)
	{
		var mailto1 = '<a href="mailto:' + market.email1 + '">' + market.email1 + '</a>';
		var email1 = dc.$('p', {content: '<b>Email:</b> ' + mailto1});
		this.infoBox.appendHtml(email1);
	}
	
	if (market.email2)
	{
		var mailto2 = '<a href="mailto:' + market.email2 + '">' + market.email2 + '</a>';
		var email2 = dc.$('p', {content: '<b>Email:</b> ' + mailto2});
		this.infoBox.appendHtml(email2);
	}
	
	if (market.web)
	{
		var url = '<a href="' + market.web + '" target="_blank">' + market.web + '</a>';
		var web = dc.$('p', {content: '<b>Web:</b> ' + url});
		this.infoBox.appendHtml(web);
	}
	
	if (market.phone1)
	{
		var phone1Url = '<a href="tel:' + market.phone1 + '">' + market.phone1 + '</a>';
	
		var phone1_note = '';
		if (market.phone1_note)
		{
			phone1_note = ' (' + market.phone1_note + ')';
		}
		
		var phone1 = dc.$('p', {content: '<b>Phone:</b> ' + phone1Url + phone1_note});
		
		this.infoBox.appendHtml(phone1);
	}
	
	if (market.phone2)
	{
		var phone2Url = '<a href="tel:' + market.phone2 + '">' + market.phone2 + '</a>';
	
		var phone2_note = '';
		if (market.phone2_note)
		{
			phone2_note = ' (' + market.phone2_note + ')';
		}
		
		var phone2 = dc.$('p', {content: '<b>Phone:</b> ' + phone2Url + phone2_note});
		
		this.infoBox.appendHtml(phone2);
	}
	
	if (market.directions)
	{
		var directions = dc.$('p', {content: '<b>Directions:</b> ' + market.directions});
		this.infoBox.appendHtml(directions);
	}
	
	if (market.other)
	{
		var other = dc.$('p', {content: '<b>Additional info:</b> ' + market.other});
		this.infoBox.appendHtml(other);
	}
	
	this.infoBox.appendHtml('<br /><br /><br /><br /><br /><br />');
}

MarketPage.prototype.show = function()
{
	this.page.show();
	this.visible = true;
}

MarketPage.prototype.hide = function()
{
	this.page.hide();
	this.visible = false;
}


function RecipePage(app, window, backSelectedTracker)
{
	this.app = app;
	this.window = window;
	this.backSelectedTracker = backSelectedTracker;
	
	this.visible = false;
	
	this.page = null;
	this.navBar = null;
	this.backButton = null;
	this.infoBox = null;
	this.recipe = null;

	this.createPage();
}

RecipePage.prototype.createPage = function()
{
	this.page = new dc.ui.Page();
	this.page.hide();
	
	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);
	this.backButton = new dc.ui.NavBarItem(
	{
		type : 'button',
		value : 'back',
		position :'left',
		tracker : this.backSelectedTracker
	});
	this.navBar.append(this.backButton);

	this.infoBox = new dc.ui.Box(
	{
		widthDelta: 40,
		heightDelta: this.app.settings.navBarHeight,
		anchor: {top: this.app.settings.navBarHeight, left: 20},
		scrollable: true,
		fontSize: 14
	});
	
	this.page.append(this.navBar);
	this.page.append(this.infoBox);
	this.window.append(this.page);
}

RecipePage.prototype.setTitle = function(titleStr)
{
	if (!this.title)
	{
		this.title = new dc.ui.NavBarItem({type:'title', value:titleStr, position:'center'});
		this.navBar.append(this.title);
	}
	else
	{
		this.title.setTitle(titleStr);
	}
}

RecipePage.prototype.populate = function(id)
{
	// clear any existing info on recipe page
	this.infoBox.setHtml('');

	this.dataManager = this.app.dataManagers.recipes;
	this.dataManager.getRecipe(id, new dc.Tracker(this.recipeReady, this));
}

RecipePage.prototype.recipeReady = function(status, recipe)
{
	if (status == 'error' || status == 'notFound')
	{
		alert("Error getting recipe data.");
		return;
	}

	this.recipe = recipe;

	var recipeTitle = dc.$('h1', {css:{'font-size':'12pt','text-align':'center'}, content:recipe.name});
	this.infoBox.setHtml(recipeTitle);
	
	var imagePath = this.app.settings.recipes.image.path + recipe.imageName + this.app.settings.recipes.image.ext;
	var recipeInfo = '<div style="text-align:center;"><img style="margin:0 0 10px 0; border:2px solid black;" src="' + imagePath + '" /></div><p><b>Ingredients:</b> ' + recipe.ingredients + '</p><p><b>Directions:</b> ' + recipe.directions + '</p><br /><br /><br /><br /><br /><br /><br /><br />';
	this.infoBox.appendHtml(recipeInfo);
}

RecipePage.prototype.show = function()
{
	this.page.show();
	this.visible = true;
}

RecipePage.prototype.hide = function()
{
	this.page.hide();
	this.visible = false;
}


function RecipesPage(app, window, recipeSelectedTracker)
{
	this.app = app;
	this.window = window;
	this.recipeSelectedTracker = recipeSelectedTracker;
	
	this.visible = false;
	
	this.started = false;
	
	this.page = null;
	this.navBar = null;
	this.navBarTitle = null;
	this.infoBar = null;
	this.list = null;
	this.recipes = [];

	this.createPage();
}

RecipesPage.prototype.start = function()
{
	if (this.started) return;
	
	this.populateList();
}

RecipesPage.prototype.createPage = function()
{
	this.page = new dc.ui.Page();
	this.page.hide();
	
	this.navBar = new dc.ui.NavBar();
	this.navBar.setHeight(this.app.settings.navBarHeight);

	this.infoBar = new dc.ui.InfoBar(
	{
		anchor:{top: this.app.settings.navBarHeight, left: 0},
		widthDelta: 0,
		height: this.app.settings.infoBarHeight,
		borders: {top:{width:1, color:'#333333'}}
	});
	
	var totalBarHeight = this.app.settings.navBarHeight + this.app.settings.infoBarHeight;
	this.list = new dc.ui.List(
	{
		anchor:{top: totalBarHeight, left: 0},
		widthDelta: 0,
		heightDelta: totalBarHeight	
	});

	this.page.append(this.navBar);
	this.page.append(this.infoBar);
	this.page.append(this.list);
	this.window.append(this.page);
}

RecipesPage.prototype.setTitle = function(title)
{
	if (!this.navBarTitle)
	{
		this.navBarTitle = new dc.ui.NavBarItem({type:'title', value:title, position:'center'});
		this.navBar.append(this.navBarTitle);
	}
	else this.navBarTitle.setItem('title', title);
}

RecipesPage.prototype.setMessage = function(message)
{
	if (this.infoBar) this.infoBar.setInfo(message);
}

RecipesPage.prototype.populateList = function()
{
	this.dataManager = this.app.dataManagers.recipes;
	this.dataManager.getRecipeList(new dc.Tracker(this.recipeListReady, this));
}

RecipesPage.prototype.recipeListReady = function(status, data)
{
	if (status == 'error')
	{
		alert('Error getting recipe list data.');
		return;
	}
	
	this.recipes = data;
	this.list.build(this.recipes.length, new dc.Provider(this.listItemProvider, this));
}

RecipesPage.prototype.listItemProvider = function(num)
{
	var recipe = this.recipes[num];
	if (!recipe) return null;
	
	var name = recipe.name;
	
	var itemTracker = this.recipeSelectedTracker.clone();
	itemTracker.setData(recipe);
	
	var recipesSettings = this.app.settings.recipes;
	var listItem = new dc.ui.ListItem(
	{
		arrow: true,
		backgroundColor:'#ffffff',
		info:
		{
			image:
			{
				name: recipesSettings.thumb.path + recipe.imageName + recipesSettings.thumb.ext,
				width: recipesSettings.thumb.width,
				height: recipesSettings.thumb.height
			},
			maxLineChars: 30,
			content: name
		},
		tracker: itemTracker	
	});
	
	return(listItem);
}

RecipesPage.prototype.show = function()
{
	this.page.show();
	this.visible = true;
}

RecipesPage.prototype.hide = function()
{
	this.page.hide();
	this.visible = false;
}




function RecipesDataManager(app, stateTracker)
{
	this.app = app;
	this.stateTracker = stateTracker;
	this.dataSource = this.app.settings.recipes.data.src;
	this.dataScript = null;
	this.data = [];
	this.state = 'init';
	this.recipesColumns = ['id','name','imageName','produceName','ingredients','directions'];
	this.recipesColumnsString = 'id,name,imageName,produceName,ingredients,directions';
	this.recipeList = null;
	this.dbParams = this.app.settings.db.params;
}

RecipesDataManager.prototype.init = function()
{
	if (window.localStorage.getItem('recipes')) this.changeState('ready');
	else this.populateDB();
}

RecipesDataManager.prototype.populateDB = function()
{
	this.changeState('loading');
	this.dataScript = new dc.ScriptLoader(this.dataSource, new dc.Tracker(this.startPopulate, this));
}

RecipesDataManager.prototype.startPopulate = function(status)
{
	if (status == 'error')
	{
		this.changeState('error');
		return;
	}
	this.data = dc.getData('recipes');
	this.changeState('loaded');

	var status = 'none';
	var error = null;
	var finishedTracker = new dc.Tracker(this.populateFinished, this);
	
	var pollStatus = function()
	{
		if (status == 'success')
		{
			window.localStorage.setItem('recipes', '1.0')
			finishedTracker.invoke('success');
		}
		else if (status == 'error') finishedTracker.invoke('error', error);
		else setTimeout(pollStatus, 100);
	}
	setTimeout(pollStatus, 100);
	
	var onError = function(err) 
	{ 
		status = 'error'; 
		error = err; 
	}
	var onSuccess = function() 
	{ 
		status = 'success'; 
	}
	
	var context = this;
	var start = function(tx) 
	{ 
		// drop/create table
		tx.executeSql("DROP TABLE IF EXISTS recipes");
				
		var sql =  "CREATE TABLE recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, imageName TEXT, produceName TEXT, ingredients TEXT, directions TEXT)";
		tx.executeSql(sql);
		
		var recordCount = context.data.length;
		for (var i = 0; i < recordCount; i++)
		{
			var record = context.data[i];
			var values = "";
			var first = true;
			for (var property in record)
			{
				if (!first) values += ",";
				else first = false;
				var value = record[property].replace(/\'/g,"''");  // escape single quotes
				values += "'"+value+"'";  // put single quotes around value
			}
			
			sql = "INSERT INTO recipes (name, imageName, produceName, ingredients, directions ) VALUES (" + values + ")";
			tx.executeSql(sql);
		}
	}

	var db =  window.openDatabase(this.dbParams.name, this.dbParams.version, this.dbParams.title, this.dbParams.size);
	if (!db)
	{
		this.changeState('error');
		return;
	}
	this.changeState('populating');
	db.transaction(start, onError, onSuccess);
}

RecipesDataManager.prototype.populateFinished = function(status, error)
{
	if (status == 'error')
	{
		this.changeState('error');
		return;
	}
	
	this.changeState('ready');
}

RecipesDataManager.prototype.changeState = function(state)
{
	this.state = state;
	this.stateTracker.invoke(this.state);
}

RecipesDataManager.prototype.getState = function()
{
	return(this.state);
}

RecipesDataManager.prototype.getRecipeList = function(statusTracker)
{
	if (this.recipeList)
	{
		statusTracker.invoke('success', this.recipeList);
		return;
	}

	var sql = "SELECT id, name, imageName, produceName FROM recipes ORDER by name ASC";
	dc.queryDatabase(this.dbParams, sql, ['id','name','imageName','produceName'], new dc.Tracker(this.recipeListRequestFinished, this, statusTracker));
}

RecipesDataManager.prototype.recipeListRequestFinished = function(status, data, statusTracker)
{
	if (status == 'error')
	{
		statusTracker.invoke('error');
		return;
	}
	
	this.recipeList = data;
	statusTracker.invoke('success', this.recipeList);
}

RecipesDataManager.prototype.getRecipeListForProduceItem = function(produceItemName, tracker)
{
	var name = produceItemName.replace(/\'/g,"''");
	var sql = "SELECT id, name, imageName, produceName FROM recipes WHERE produceName='" + name + "' ORDER by name ASC";
	dc.queryDatabase(this.dbParams, sql, ['id','name','imageName','produceName'], tracker);
}

RecipesDataManager.prototype.getRecipe = function(id, statusTracker)
{
	var sql = "SELECT " + this.recipesColumnsString + " FROM recipes WHERE id = '" + id + "'";
	dc.queryDatabase(this.dbParams, sql, this.recipesColumns, new dc.Tracker(this.recipeRequestFinished, this, statusTracker));
}

RecipesDataManager.prototype.recipeRequestFinished = function(status, data, statusTracker)
{	
	if (status == 'error')
	{
		statusTracker.invoke('error');
		return;
	}
	
	if (data.length != 1)
	{
		statusTracker.invoke('notFound');
		return;
	}

	statusTracker.invoke('success', data[0]);
}



// Copyright 2012 Dale Musser

function Recipes(app)
{
	this.app = app;
	
	this.visible = false;
	this.started = false;
	
	this.recipesPage = null;
	this.recipePage = null;
	this.errorPage = null;

	this.currentPage = null;
	this.currentRecipe = null;

	this.window = new dc.ui.Window(
	{
		anchor: {top: this.app.settings.sasBarHeight, left:0},
		widthDelta: 0,
		heightDelta: this.app.settings.tabBarHeight + this.app.settings.sasBarHeight	
	});
	this.window.hide();
	dc.ui.display.append(this.window);
	
	this.dataManager = this.app.dataManagers.recipes;
	if (!this.dataManager || this.dataManager.getState() != 'ready') this.handleError();
	else this.init();
}

Recipes.prototype.handleError = function()
{
	alert('Error accessing Recipes data.');
}

Recipes.prototype.init = function()
{
	this.recipesPage = new RecipesPage(this.app, this.window, new dc.Tracker(this.recipeSelected, this));
	this.recipesPage.setTitle("Recipes");
	this.recipesPage.setMessage("Recipes Using Produce Available in Missouri");

	this.switchToPage(this.recipesPage);
}

Recipes.prototype.recipeSelected = function(recipe)
{
	this.currentRecipe = recipe;
	
	if (!this.recipePage) this.recipePage = new RecipePage(this.app, this.window, new dc.Tracker(this.recipeBackSelected, this));
	
	this.recipePage.setTitle('Recipe');
	this.recipePage.populate(this.currentRecipe.id);
	
	this.switchToPage(this.recipePage);
}

Recipes.prototype.recipeBackSelected = function()
{
	this.switchToPage(this.recipesPage);
}

Recipes.prototype.switchToPage = function(page)
{
	var previousPage = this.currentPage;
	this.currentPage = page;

	if (previousPage) previousPage.hide();
	this.currentPage.show();
}

Recipes.prototype.show = function()
{
	this.window.show();
	this.visible = true;
	if (!this.started)
	{
		this.started = true;
		this.recipesPage.start();
	}
}

Recipes.prototype.hide = function()
{
	this.window.hide();
	this.visible = false;
}





