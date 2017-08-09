



            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/educationProgram',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#educationProgram-placeholder").html(template(model.layout));
                        $("#educationProgram-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/education',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#education-placeholder").html(template(model.layout));
                        $("#education-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/warOrphansScholarship',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#warOrphansScholarship-placeholder").html(template(model.layout));
                        $("#warOrphansScholarship-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/locationDetails',
                        'hbs!template/simple',
                        'appModel!model/geo/veteransLocations',
                        'query-helpers',
                        'geo-helpers'
                    ],
                    function ($, model, template, veteransLocations, queryHelper, geoHelper) {
                        var id = queryHelper.getPageOption("id");
                        var type;
                        var location;
                        var controls = [];

                        if (id) {
                            var index = null;
                            for (var i = 0; i < veteransLocations.length; i++) {
                                if (veteransLocations[i].id === id) {
                                    index = i;
                                    break;
                                }
                            }

                            if (index === null) {
                                window.location = "index.html";
                                return;
                            }
                            
                            location = veteransLocations[index];
                            type = location.type;
                        }
                        type = type || "1";

                        if (location) {
                            model.title = model.layout.title = location.name;

                            controls.push(
                                {
                                    "name": "locationCard",
                                    "location": location
                                }
                            );
                        }
                        if (type != 8) {
                            controls.push(
                                {
                                    "name": "actionArea",
                                    "type": "return",
                                    "title": null,
                                    "links": [
                                        {
                                            "type": "return",
                                            "text": type !== "1" ? "Return to VA Facilities" : "Return to Find Your CVSO",
                                            "href": type !== "1" ? "vaFacilities.html" : "countyVeteransServiceOffices.html",
                                            "title": type !== "1" ? "Go to VA Facilities" : "Go to County Veterans Service Offices"
                                        }
                                    ]
                                }
                            );
                        }
                        else {
                            controls.push(
                                    {
                                        "name": "actionArea",
                                        "type": "return",
                                        "title": null,
                                        "links": [
                                            {
                                                "type": "return",
                                                "text": "Return to Veterans Homes",
                                                "href": "ohioVeteransHomes.html",
                                                "title": "Go to Ohio Veterans Homes"
                                            }
                                        ]
                                    }
                            );
                        }

                        model.layout.body.controls = controls;

                        $("#locationDetails-placeholder").html(template(model.layout));
                        $("#locationDetails-placeholder").trigger("ready");

                        var directionsBtn = $(".deets .button");
                        var _href = directionsBtn.attr('href');
                        try {
                            geoHelper.getCurrentLatLng(
                                function (latLngResult) {
                                    if (latLngResult) {
                                        directionsBtn.attr('href', _href + '&saddr=' + latLngResult.lat + ',' + latLngResult.lng);
                                        geoHelper.getCurrentLatLng(
                                            function (latLngResultHighAccuracy) {
                                                if (latLngResultHighAccuracy) {
                                                    directionsBtn.attr('href', _href + '&saddr=' + latLngResultHighAccuracy.lat + ',' + latLngResultHighAccuracy.lng);
                                                }
                                            },
                                            function (errorResultHighAccuracy) {
                                                console.log('high accuracy error: ' + errorResultHighAccuracy);
                                            },
                                            {
                                                enableHighAccuracy: true,
                                            }
                                        );
                                    }
                                },
                                function (errorResult) {
                                    console.log('regular accuracy error: ' + errorResult);
                                }
                            );
                        } catch (err) {
                            if (err) {
                                console.log(err.message);
                            }
                        }

                        directionsBtn.click(function () {
                            directionsBtn.removeClass("ui-btn-active");
                        });
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/disabilityCompensation',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#disabilityCompensation-placeholder").html(template(model.layout));
                        $("#disabilityCompensation-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;

                require(
                    [
                        'jquery',
                        'underscore',
                        'appModel!model/vaFacilities',
                        'hbs!template/simple',
                        'appModel!model/geo/vaFacilities',
                        'appModel!model/geo/locationSubTypes'
                    ],
                    function ($, _, model, template, vaFacilities, locationSubTypes) {

                        var vaFacilityGroups = _.countBy(vaFacilities, function (vaFacility) {
                            return vaFacility.subType;
                        });

                        var controls = [];
                        var jumpList = {
                            "name": "jumpList",
                            "type": "singleLine",
                            "title": null,
                            "links": []
                        };

                        for (var i = 0; i < locationSubTypes.length; i++) {
                            var locationSubType = locationSubTypes[i];

                            var count = vaFacilityGroups[locationSubType.id];
                            jumpList.links.push(
                                {
                                    "text": locationSubType.name + " (" + count + ")",
                                    "href": "locationsListing.html?showAll=true&subType=" + locationSubType.id,
                                    "title": "Go To " + locationSubType.name
                                }
                            );
                        }
                        controls.push(jumpList);

                        model.layout.body.controls = controls;

                        $("#vaFacilities-placeholder").html(template(model.layout));
                        $("#vaFacilities-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/jobResources',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#jobResources-placeholder").html(template(model.layout));
                        $("#jobResources-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/troopsToTeachers',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#troopsToTeachers-placeholder").html(template(model.layout));
                        $("#troopsToTeachers-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




        var initPage = function () {
            firstPageLoaded = true;
            require(
                    [
                        'jquery',
                        'appModel!model/about',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#about-placeholder").html(template(model.layout));
                        $("#about-placeholder").trigger("ready");
                    });
        };
        if (window.firstPageLoaded) {
            initPage();
        }
    




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/countyVeteransServiceOffices',
                        'hbs!template/simple',
                        'appModel!model/geo/serviceOffices',
                        'search-helpers'
                    ],
                    function ($, model, template, serviceOffices, searchHelper) {
                        var items = [];
                        for (var i = 0; i < serviceOffices.length; i++) {
                            var serviceOffice = serviceOffices[i];
                            items.push({
                                "value": serviceOffice.id,
                                "text": serviceOffice.county
                            });
                        }

                        var controls = model.layout.body.controls;
                        controls[3].select.items = items;

                        $("#cvsoSearch-placeholder").html(template(model.layout));
                        $("#cvsoSearch-placeholder").trigger("ready");

                        searchHelper.hideValidators();

                        var searchForms = $(".searchForm");
                        for (var j = 0; j < searchForms.length; j++) {
                            var searchForm = $("#" + searchForms[j].id);
                            var searchButton = searchForm.find(".button");
                            searchHelper.initializeSearchForm(searchButton);
                        }
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        





            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/home',
                        'hbs!template/home'
                    ],
                    function ($, model, template) {
                        $("#content-placeholder").html(template(model.layout));
                        $("#content-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }


        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/ohioVeteransHomes',
                        'hbs!template/simple',
                        'appModel!model/geo/ohioVeteransHomes'
                    ],
                    function ($, model, template, ohioVeteransHomes) {
                        var controls = model.layout.body.controls;
                        var jumpList = {
                            "name": "jumpList",
                            "type": "singleLine",
                            "title": null,
                            "links": []
                        };

                        for (var i = 0; i < ohioVeteransHomes.length; i++) {
                            var ohioVeteransHome = ohioVeteransHomes[i];

                            jumpList.links.push(
                                {
                                    "text": ohioVeteransHome.name,
                                    "href": "locationDetails.html?id=" + ohioVeteransHome.id + "&type=" + ohioVeteransHome.type + "&subType=" + ohioVeteransHome.subType,
                                    "title": "View the contact details for " + ohioVeteransHome.name
                                }
                            );
                        }
                        controls.push(jumpList);
                        
                        $("#ohioVeteransHomes-placeholder").html(template(model.layout));
                        $("#ohioVeteransHomes-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/GIBill',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#GIBill-placeholder").html(template(model.layout));
                        $("#GIBill-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/vetSpecificPrograms',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#vetSpecificPrograms-placeholder").html(template(model.layout));
                        $("#vetSpecificPrograms-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/healthCare',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#healthCare-placeholder").html(template(model.layout));
                        $("#healthCare-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/inCrisis',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#crisis-placeholder").html(template(model.layout));
                        $("#crisis-placeholder").trigger("ready");
                        var crisisBtn = $(".crisis");
                        crisisBtn.click(function () {
                            crisisBtn.removeClass("ui-btn-active");
                        });
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/ohioEducationResources',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#ohioEducationResources-placeholder").html(template(model.layout));
                        $("#ohioEducationResources-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/ohioVeteransBonusProgram',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#ohioVeteransBonusProgram-placeholder").html(template(model.layout));
                        $("#ohioVeteransBonusProgram-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/vocationalRehabilitation',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#vocationalRehabilitation-placeholder").html(template(model.layout));
                        $("#vocationalRehabilitation-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/otherBenefits',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#otherBenefits-placeholder").html(template(model.layout));
                        $("#otherBenefits-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/disabilityPension',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#disabilityPension-placeholder").html(template(model.layout));
                        $("#disabilityPension-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'appModel!model/financialAssistance',
                        'hbs!template/simple'
                    ],
                    function ($, model, template) {
                        $("#financialAssistance-placeholder").html(template(model.layout));
                        $("#financialAssistance-placeholder").trigger("ready");
                    });
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        




            var initPage = function () {
                firstPageLoaded = true;
                require(
                    [
                        'jquery',
                        'underscore',
                        'handlebars',
                        'appModel!model/locationsListing',
                        'hbs!template/simple',
                        'appModel!model/geo/veteransLocations',
                        'appModel!model/geo/locationTypes',
                        'appModel!model/geo/locationSubTypes',
                        'query-helpers',
                        'geo-helpers'
                    ],
                    function ($, _, Handlebars, model, template, veteransLocations, locationTypes, locationSubTypes, queryHelper, geoHelper) {
                        var showAll = queryHelper.getPageOption('showAll');
                        var locationTypeId = queryHelper.getPageOption('type');
                        var locationSubTypeId = queryHelper.getPageOption('subType');
                        var lat = queryHelper.getPageOption('lat');
                        var lng = queryHelper.getPageOption('lng');
                        var jumpList = {
                            "name": "jumpList",
                            "type": "multiLine",
                            "title": null,
                            "links": []
                        };

                        var controls = [];
                        var locations = [];

                        if (showAll) {
                            if (locationSubTypeId) {
                                var subName;
                                for(var i = 0;i<locationSubTypes.length;i++){
                                      if(locationSubTypes[i].id === locationSubTypeId){
                                          subName = locationSubTypes[i].name;
                                      }
                                }
                                model.title = model.layout.title = subName;

                                var vaLocationTypes = [];
                                for (var i = 0; i < veteransLocations.length; i++) {
                                    var veteransLocation = veteransLocations[i];
                                    if (veteransLocation.subType === locationSubTypeId) {
                                        locations.push(veteransLocation);
                                        vaLocationTypes.push(veteransLocation.type);
                                    }
                                }
                                vaLocationTypes = _.uniq(vaLocationTypes);
                                locations = _.where(veteransLocations, { "subType": locationSubTypeId });
                                for (var j = 0; j < vaLocationTypes.length; j++) {
                                    jumpList = {
                                        "name": "jumpList",
                                        "type": "multiLine",
                                        "title": null,
                                        "links": []
                                    };
                                    var vaLocationType = vaLocationTypes[j];
                                    var locationType = locationTypes[vaLocationType-1];
                                    var specificLocations = _.where(locations, { "type": vaLocationType });
                                    jumpList.title = locationType.name;
                                    jumpList.links = [];
                                    for (var k = 0; k < specificLocations.length; k++) {
                                        var specificLocation = specificLocations[k];
                                        jumpList.links.push(Handlebars.helpers.getLink(null, specificLocation));
                                    }

                                    controls.push(
                                        jumpList
                                    );
                                }
                            }
                        } else {
                            model.title = model.layout.header.title = "County Veterans Service Offices";

                            var serviceOffices = _.where(veteransLocations, { "type": "1" });

                            var closestLocations = geoHelper.findClosestLocations(lat, lng, serviceOffices);
                            if (closestLocations && closestLocations.length > 0) {

                                jumpList.title = "Your Closest Locations";
                                jumpList.links = [];

                                for (var x = 0; x < closestLocations.length; x++) {
                                    var closestLocation = closestLocations[x];
                                    var serviceOffice = serviceOffices[closestLocation.id - 1];

                                    jumpList.links.push(Handlebars.helpers.getLink(closestLocation.distance, serviceOffice));
                                }
                            } else {
                                jumpList.title = "No Locations Found";
                                jumpList.links = [];
                            }

                            controls.push(
                                jumpList
                            );
                        }

                        controls.push(
                            {
                                "name": "actionArea",
                                "type": "return",
                                "title": null,
                                "links": [
                                    {
                                        "type": "return",
                                        "text": showAll ? "Return to VA Facilities" : "Return to Find Your CVSO",
                                        "href": showAll ? "vaFacilities.html" : "countyVeteransServiceOffices.html",
                                        "title": showAll ? "Go to VA Facilities" : "Go to County Veterans Service Offices"
                                    }
                                ]
                            }
                        );

                        model.layout.body.controls = controls;

                        $("#locationsListing-placeholder").html(template(model.layout));
                        $("#locationsListing-placeholder").trigger("ready");
                    }
                );
            };
            if (window.firstPageLoaded) {
                initPage();
            }
        

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Ohio Veterans Bonus Program",id:"ohioVeteransBonusProgram",header:b,body:{controls:[{name:"article",type:"simple",sections:[{title:"Description",paragraphs:["This program provides a monetary bonus for those that served during/in the Persian Gulf, Iraq, and/or Afghanistan conflicts.  It was approved by Ohio voters in November, 2009.  The Ohio Veterans Bonus is exempt from federal and state tax."]},
{title:"Eligibility",paragraphs:["Veterans (including currently serving service members) can determine if they are eligible by visiting the web site and using the eligibility tools."]},{title:"Contact",paragraphs:["An online application form and answers to questions can be found at \x3capp-link href\x3d'http://www.veteransbonus.ohio.gov' title\x3d'Veterans Bonus Ohio' type\x3d'inline'\x3eVeterans Bonus Ohio\x3c/app-link\x3e"]},{title:"",paragraphs:["For more information about the Ohio Veterans Bonus, contact your \x3capp-link href\x3d'countyVeteransServiceOffices.html' title\x3d'County Veterans Service Office' type\x3d'inline'\x3eCounty Veterans Service Office\x3c/app-link\x3e."]}]}]},
footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"VA Facilities in Ohio",id:"vaFacilities",header:b,body:{controls:[]},footer:c}}});

define(["module","model/partial/header","model/partial/footer","model/geo/odvsHeadquarters"],function(a,b,c,d){a.config&&a.config();a=d[0];return{layout:{title:"About",id:"about",header:b,body:{controls:[{name:"article",type:"simple",sections:[{title:"Our Mission",paragraphs:['"To actively identify, connect with, and advocate for veterans and their families."']},{title:"Our Vision",paragraphs:['"Make Ohio a place where our past and present military want to call home."']},{title:"Our Values",paragraphs:["\x3cul\x3e\x3cli\x3eCustomer Focus\x3c/li\x3e\x3cli\x3eIntegrity\x3c/li\x3e\x3cli\x3eExcellence\x3c/li\x3e\x3cli\x3eUncommon Commitment\x3c/li\x3e\x3cli\x3eDiversity\x3c/li\x3e\x3cli\x3eLoyalty\x3c/li\x3e\x3cli\x3eTeamwork\x3c/li\x3e\x3c/ul\x3e"]},
{title:"Contact",paragraphs:[a.name+"\x3cbr\x3e"+a.address1+", "+a.address2+"\x3cbr\x3e"+a.city+", "+a.state+" "+a.postalCode,"\x3cphone href\x3d'tel:"+a.phone+"' title\x3d'Call the Ohio Department of Veterans Services'\x3e"+a.phoneText+"\x3c/phone\x3e","\x3cemail-link href\x3d'"+a.email+"' title\x3d'E-Mail the Ohio Department of Veterans Services'\x3e"+a.email+"\x3c/email-link\x3e","\x3capp-link href\x3d'"+a.url+"' title\x3d'Go To the Ohio Department of Veterans Services Website' type\x3d'inline'\x3e"+
a.urlText+"\x3c/app-link\x3e","Apply for benefits, contact your: \x3capp-link href\x3d'countyVeteransServiceOffices.html' title\x3d'Go to County Veterans Service Office listing' type\x3d'inline'\x3eCounty Veterans Service Office\x3c/app-link\x3e","\x3capp-link href\x3d'http://dvs.ohio.gov/home/privacy_statement.aspx' title\x3d'Go To the Ohio Department of Veterans Services Privacy Policy' type\x3d'inline'\x3ePrivacy Policy\x3c/app-link\x3e"]}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"GI Bill",id:"GIBill",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Education",href:"education.html",title:"Return To Education"}]},{name:"article",type:"simple",sections:[{title:"GI Bill",paragraphs:["The GI Bill is the federal government\u2019s primary educational program for Veterans. ","Two versions are available:"]},
{title:"Post-9/11 GI Bill",paragraphs:["The Post-9/11 GI Bill is for individuals with at least 90 days of aggregate service on or after September 11, 2001, or individuals discharged with a service-connected disability after 30 days. You must have received an honorable discharge to be eligible for the Post-9/11 GI Bill.","In addition to degree-granting programs, the Post-9/11 GI Bill includes on-the-job training, non-college degrees, flight training, apprenticeships and correspondence."]},{title:"MGIB program",
paragraphs:["The MGIB program, also known as Ch.30 or Ch.1606, provides up to 36 months of education benefits. You must have received an honorable discharge to be eligible. This benefit may be used for degree and certificate programs, flight training, apprenticeship/on-the-job training and correspondence courses."]}]},{name:"actionArea",type:"contact",title:"Contact",links:[{type:"phone",text:"1 (888) 442-4551",href:"tel:18884424551",title:"Call the Veterans Crisis Line"},{type:"link",text:"GI Bill Website",
href:"http://www.gibill.va.gov",title:"GI Bill Website"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Crisis Counseling",id:"inCrisis",header:b,body:{controls:[{name:"actionArea",type:"crisis",title:"Veterans Crisis Line",links:[{type:"phone",text:"1 (800) 273-8255",href:"tel:18002738255",title:"Call the Veterans Crisis Line"},{type:"link",text:"Crisis Counseling Website",href:"http://www.veteranscrisisline.net",title:"Go to www.veteranscrisisline.net"}]},{name:"article",type:"simple",
sections:[{title:null,paragraphs:["The Department of Veterans Affairs (VA) Veterans Health Administration (VHA) has established a national Veterans Crisis Line to ensure that Veterans in emotional crisis have free, 24/7 access to trained counselors.","To operate the Hotline, the VA partnered with the Substance Abuse and Mental Health Services Administration (SAMHSA) and the National Suicide Prevention Lifeline.","Veterans, family members and friends can call the Lifeline number, \x3cphone href\x3d'tel:18002738255' title\x3d'Call the Veterans Crisis Line'\x3e1 (800) 273-TALK (273-8255)\x3c/phone\x3e, and press \x26quot;1\x26quot; to be routed to the Hotline and speak to a counselor about any issue that is creating a crisis situation in his or her life."]}]}]},
footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Other Benefits",id:"otherBenefits",header:b,body:{controls:[{name:"jumpList",type:"singleLine",links:[{type:"link",text:"Compensation",href:"disabilityCompensation.html",title:"A monthly payment paid to veterans with a service-connected injury."},{type:"link",text:"Pension",href:"disabilityPension.html",title:"A monthly payment paid to low-income, disabled veterans age 65+."},
{type:"link",text:"Health Care",href:"healthCare.html",title:"Provided to eligible veterans and those with a service-connected injury."},{type:"link",text:"Financial Assistance",href:"financialAssistance.html",title:"Short-term aid available from your County Veterans Service Office."}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Vet-Specific Programs",id:"vetSpecificPrograms",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return to Job Resources",href:"jobResources.html",title:"Go to Job Resources"}]},{name:"article",type:"simple",sections:[{title:"Description",paragraphs:["Ohio has veteran-centered programs within specific industries, to connect veterans with training and employment."]}]},
{name:"jumpList",type:"singleLine",links:[{type:"external",text:"Insuring Ohio Futures",href:"http://insuringohiofutures.com",title:"Insuring Ohio Futures"},{type:"external",text:"Get Skills to Work",href:"http://www.getskillstowork.org",title:"Get Skills to Work"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Financial Assistance",id:"financialAssistance",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Other Benefits",href:"otherBenefits.html",title:"Go to other benefits listing"}]},{name:"article",type:"simple",title:"Financial Assistance",sections:[{title:null,paragraphs:["Each County Veterans Service Office provides short-term financial assistance to Veterans and their families.  The amount of assistance varies according to the individual abilities of each county.",
"\x3cB\x3eYou must apply for this benefit in your county of residence.\x3c/B\x3e","For more information or to apply, contact your \x3capp-link href\x3d'countyVeteransServiceOffices.html' title\x3d'Go to County Veterans Service Office listing' type\x3d'inline'\x3eCounty Veterans Service Office\x3c/app-link\x3e"]}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"County Veterans Service Offices",id:"cvsoSearch",header:b,body:{controls:[{name:"article",type:"simple",sections:[{title:"Find your CVSO",paragraphs:["Use any of these methods to find an office close to you"]}]},{name:"searchForm",id:"geocodeSearchForm",type:"geocodeLookup",labelInput:{id:"geocode",prompt:"Use My Current Location"},submit:{id:"geocodeSearchFormSubmit",text:"Go",
controlToValidate:null,validatorPattern:null,validatorPopupId:"geocodeSearchValidatorPopup"},validator:{id:"geocodeSearchValidatorPopup",message:"We are unable to look up your location at this time. Please make a selection from the county select list or try again."}},{name:"searchForm",id:"postalCodeSearchForm",type:"postalCodeLookup",label:{"for":"postalCode",text:"Search by Zip Code"},input:{id:"postalCode",pattern:"[0-9]{5}",maxLength:"5",prompt:"Zip Code"},submit:{id:"postalCodeSearchFormSubmit",
text:"Search",controlToValidate:"postalCode",validatorPattern:"/\bd{5}\b/g",validatorPopupId:"postalCodeSearchValidatorPopup"},validator:{id:"postalCodeSearchValidatorPopup",message:"Please enter a valid zip code."}},{name:"searchForm",id:"countyListSearchForm",type:"selectList",label:{"for":"countyList",text:"Select by County Office"},select:{id:"countyList",prompt:"Select from List",items:null,prefix:null,suffix:" County"},submit:{id:"countyListSearchFormSubmit",text:"Select",controlToValidate:"countyList",
validatorPattern:null,validatorPopupId:"countyListSearchValidatorPopup"},validator:{id:"countyListSearchValidatorPopup",message:"Please select a county."}}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:null,id:"locationDetails",header:b,body:{controls:[]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Ohio Education Resources",id:"ohioEducationResources",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Education",href:"education.html",title:"Return To Education"}]},{name:"article",type:"simple",sections:[{title:"Ohio Board of Regents",paragraphs:["Ohio has state education benefits available for Veterans and eligible families. These include in-state tuition for both resident and non-resident Veterans, as well as in-state tuition for both resident and non-resident families of those killed in action."]}]},
{name:"actionArea",type:"contact",title:"Contact",links:[{type:"phone",text:"1 (877) VETS-OH-1 (838-7641)",href:"tel:18778387641",title:"Call the Veterans Crisis Line"},{type:"link",text:"Ohio Board of Regents Website",href:"http://www.ohiohighered.org",title:"Go to the Ohio Board of Regents Website"}]},{name:"article",type:"simple",sections:[{title:"Veterans Educational Programs",paragraphs:["Veterans Educational Programs is the link between the Veteran, the school and the VA. The office reviews, audits, evaluates, approves and oversees schools and training facilities to ensure quality educational program standards are met under both federal and state criteria."]}]},
{name:"actionArea",type:"contact",title:"Contact",links:[{type:"phone",text:"1 (614) 466-9287",href:"tel:16144669287",title:"Call the Ohio Veterans Educational Program"},{type:"link",text:"Veterans Education Website",href:"http://www.saa.ohio.gov",title:"Go to the Ohio Veterans Educational Website"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Job Resources",id:"jobResources",header:b,body:{controls:[{name:"article",sections:[{title:null,paragraphs:["Finding a job is often the number one mission of returning veterans."]}]},{name:"jumpList",type:"singleLine",links:[{type:"external",text:"Ohio Means Veterans Jobs",href:"http://www.ohiomeansveteransjobs.com",title:"Ohio Means Veterans Jobs"},{type:"link",text:"Vet-Specific Programs",
href:"vetSpecificPrograms.html",title:"Vet-Specific Programs"},{type:"external",text:"Ohio One-Stop Centers",href:"http://jfs.ohio.gov/owd/wia/wiamap.stm",title:"Ohio One-Stop Centers"},{type:"external",text:"State of Ohio Jobs",href:"http://careers.ohio.gov/",title:"State of Ohio Jobs"},{type:"external",text:"Feds Hire Vets",href:"http://www.fedshirevets.gov/",title:"Feds Hire Vets"},{type:"link",text:"Troops to Teachers",href:"troopsToTeachers.html",title:"Troops to Teachers"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Ohio Veterans Educational Programs",id:"educationProgram",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Education",href:"education.html",title:"Return To Education"}]},{name:"article",type:"simple",sections:[{title:"Description",paragraphs:["Veterans Educational Programs is the link between the Veteran, the school and the VA. The office\u2019s role is to review, audit, evaluate, approve and oversee schools and training facilities to ensure quality standards of educational programs are met under both federal and state criteria."]}]},
{name:"actionArea",type:"contact",title:"Contact",links:[{type:"phone",text:"1 (614) 466-9287",href:"tel:16144669287",title:"Call the Ohio Veterans Educational Program"},{type:"link",text:"Veterans Education Website",href:"http://www.saa.ohio.gov",title:"Go To the Ohio Veterans Educational Website"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"County Veterans Service Offices",id:"locationsListing",header:b,body:{controls:[]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Disability Pension",id:"disabilityPension",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Other Benefits",href:"otherBenefits.html",title:"Go to other benefits listing"}]},{name:"article",type:"simple",title:"Disability Pension",sections:[{title:"Description",paragraphs:["Veterans with low incomes who are permanently and totally disabled, or are age 65 or older, may be eligible for support.  Payments are made to bring the total income, including other retirement or Social Security, to a level set by Congress.  Unreimbursed medical expenses may reduce VA countable income."]},
{title:"Eligibility",paragraphs:["A Veteran must have 90 days or more of active military service, at least one day of which was during a wartime period.  The Veteran's discharge must have been under conditions other than dishonorable and their disability must be for reasons other than their own willful misconduct.","Veterans who entered active duty on or after September 8, 1980, or officers who entered active duty on or after October 16, 1981, may have to meet a longer minimum period.","For more information or to apply, contact your \x3capp-link href\x3d'countyVeteransServiceOffices.html' title\x3d'Go to County Veterans Service Office listing' type\x3d'inline'\x3eCounty Veterans Service Office\x3c/app-link\x3e"]}]}]},
footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Health Care",id:"healthCare",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Other Benefits",href:"otherBenefits.html",title:"Go to other benefits listing"}]},{name:"article",type:"simple",title:"Health Care",sections:[{title:null,paragraphs:["Many Veterans may be eligible for free health care from the VA.  Veterans who have a service-connected injury may also be eligible.",
"For more information or to apply, contact your \x3capp-link href\x3d'countyVeteransServiceOffices.html' title\x3d'Go to County Veterans Service Office listing' type\x3d'inline'\x3eCounty Veterans Service Office\x3c/app-link\x3e"]}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Education",id:"education",header:b,body:{controls:[{name:"jumpList",type:"singleLine",links:[{type:"link",text:"GI Bill",href:"GIBill.html",title:"GI Bill"},{type:"link",text:"War Orphans Scholarship",href:"warOrphansScholarship.html",title:"Ohio War Orphans Scholarship Program"},{type:"link",text:"Vocational Rehabilitation",href:"vocationalRehabilitation.html",title:"Ohio Veterans Vocational Rehabilitation"},
{type:"link",text:"Ohio Education Resources",href:"ohioEducationResources.html",title:"Ohio Education Resources"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Vocational Rehabilitation",id:"vocationalRehabilitation",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Education",href:"education.html",title:"Return To Education"}]},{name:"article",type:"simple",sections:[{title:"Description",paragraphs:["Federal vocational rehabilitation programs assist veterans with service-connected disabilities prepare for, find, and keep suitable jobs. Severely disabled veterans are offered services to improve their ability to live independently."]},
{title:"Contact",paragraphs:"For more information about vocational rehabilitation programs, contact your \x3capp-link href\x3d'countyVeteransServiceOffices.html' title\x3d'County Veterans Service Offices' type\x3d'inline'\x3eCounty Veterans Service Office\x3c/app-link\x3e."}]}]},footer:c}}});

var modelNames="model/about model/countyVeteransServiceOffices model/disabilityCompensation model/disabilityPension model/education model/warOrphansScholarship model/vocationalRehabilitation model/financialAssistance model/geo/locationSubTypes model/geo/locationTypes model/geo/odvsHeadquarters model/geo/ohioPostalCodes model/geo/ohioVeteransHomes model/geo/serviceOffices model/geo/vaFacilities model/geo/veteransLocations model/GIBill model/healthCare model/home model/inCrisis model/jobResources model/locationDetails model/locationsListing model/menu model/ohioEducationResources model/ohioVeteransBonusProgram model/ohioVeteransHomes model/otherBenefits model/partial/footer model/partial/header model/partial/springboard model/troopsToTeachers model/vetSpecificPrograms model/vaClinics model/vaFacilities".split(" ");
define(modelNames,function(){for(var b={},a=0;a<arguments.length;a++)b[modelNames[a]]=arguments[a];b.lastModified=1382531956138;return b});define("model/allModels",function(){});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Service-Connected Injury/Disability Compensation",id:"disabilityCompensation",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Other Benefits",href:"otherBenefits.html",title:"Go to other benefits listing"}]},{name:"article",type:"simple",title:"Service-Connected Injury / Disability Compensation",sections:[{title:null,
paragraphs:["Injury or disability compensation is a monetary benefit paid to Veterans who are disabled by an injury or disease that was incurred or aggravated during active military service.  These disabilities are considered to be service-connected.","Disability compensation varies with the degree of disability and the number of dependents, and is paid monthly.  Veterans with certain severe disabilities may be eligible for additional special monthly compensation.  The benefits are not subject to federal or state income tax.",
"The payment of military retirement pay, disability severance pay and separation incentive payments known as Special Separation Benefits (SSB) and Voluntary Separation Incentives (VSI) affects the amount of VA compensation paid.","The Veteran's service must have been under conditions other than dishonorable.","For more information or to apply, contact your \x3capp-link href\x3d'countyVeteransServiceOffices.html' title\x3d'Go to County Veterans Service Office listing' type\x3d'inline'\x3eCounty Veterans Service Office\x3c/app-link\x3e"]}]}]},
footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"VA Healthcare Clinic Facilities",id:"vaClinics",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Healthcare Facilities",href:"vaHealthcare.html",title:"Return To VA Healthcare Facilities"}]},{name:"jumpList",type:"singleLine",links:[{type:"link",text:"Outpatient",href:"index.html",title:"VA Outpatient Clinics"},{type:"link",
text:"Outpatient Community-Based",href:"index.html",title:"VA Outpatient Community-Based Clinics"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Ohio Veterans Homes",id:"ohioVeteransHomes",header:b,body:{controls:[{name:"article",type:"simple",sections:[{title:null,paragraphs:["Georgetown and Sandusky offer long-term care at a reasonable cost to disabled Veterans of war-time eras who've lived in Ohio for at least one year. Domiciliary living for those at an independent or nearly independent level of care is also available at the Ohio Veterans Home - Sandusky."]}]},
{name:"actionArea",type:"contact",title:"Contact",links:[{type:"phone",text:"1 (419) 625-2454",href:"tel:14196252454",title:"Call Ohio Veterans Homes"},{type:"link",text:"Ohio Veterans Homes Website",href:"http://www.ohioveteranshome.gov",title:"Ohio Veterans Homes Website"},{type:"link",text:"Admissions Information for all Homes",href:"http://dvs.ohio.gov/veterans_homes/admission.aspx",title:"Admissions Information for all Homes"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Ohio War Orphans Scholarship",id:"warOrphansScholarship",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return To Education",href:"education.html",title:"Return To Education"}]},{name:"article",type:"simple",sections:[{title:"Description",paragraphs:["The Ohio War Orphans Scholarship is open to the children of deceased or severely disabled Ohio wartime veterans and applies to the cost of tuition at either a public or private institution."]}]},
{name:"actionArea",type:"contact",title:"Contact",links:[{type:"phone",text:"1 (614) 752-9528",href:"tel:16147529528",title:"Call the Ohio War Orphans Scholarship Program"},{type:"link",text:"War Orphans Scholarship Website",href:"http://www.ohiohighered.org/ohio-war-orphans",title:"Go To the Ohio War Orphans Scholarship Website"}]}]},footer:c}}});

define(["module","model/partial/header","model/partial/footer"],function(a,b,c){a.config&&a.config();return{layout:{title:"Troops to Teachers",id:"troopsToTeachers",header:b,body:{controls:[{name:"actionArea",type:"return",title:null,links:[{type:"return",text:"Return to Job Resources",href:"jobResources.html",title:"Go to Job Resources"}]},{name:"article",type:"simple",sections:[{title:"Description",paragraphs:["Troops to Teachers is a U.S. Department of Education and Department of Defense program that helps eligible transitioning military personnel become teachers in K through 12 public and public charter schools and use their skills, knowledge, and experience to educate future generations."]}]},
{name:"actionArea",type:"contact",title:"Contact",links:[{type:"phone",text:"1 (800) 852-6064",href:"tel:18008526064",title:"Contact Troops to Teachers"},{type:"link",text:"Troops To Teachers Website",href:"http://www.troopstoteachers.ohio.gov",title:"Troops To Teachers"}]}]},footer:c}}});

define(["module"],function(a){a.config&&a.config();return[{id:"1",type:"1",subType:null,county:"Adams",name:"Adams County Veterans Services",address1:"215 N. Cross Street Rm 108",address2:null,city:"West Union",state:"OH",postalCode:"45693",lat:"38.795164",lng:"-83.546778",phone:"9375445005",ext:null,url:"http://www.adamscountyoh.com/veterans.asp",urlText:"Adams County Office Website"},{id:"2",type:"1",subType:null,county:"Allen",name:"Allen County Veterans Services",address1:"301 N. Main St.",address2:"Room 113",
city:"Lima",state:"OH",postalCode:"45801",lat:"40.743048",lng:"-84.105507",phone:"4192238522",ext:null,url:"http://www.co.allen.oh.us/vet/default.php",urlText:"Allen County Office Website"},{id:"3",type:"1",subType:null,county:"Ashland",name:"Ashland County Veterans Services",address1:"110 Cottage St.",address2:null,city:"Ashland",state:"OH",postalCode:"44805",lat:"40.869071",lng:"-82.318098",phone:"4192824225",ext:"4200",url:"http://www.ashlandcounty.org/veterans/",urlText:"Ashland County Office Website"},
{id:"4",type:"1",subType:null,county:"Ashtabula",name:"Ashtabula County Veterans Services",address1:"1212 Lake Ave.",address2:null,city:"Ashtabula",state:"OH",postalCode:"44004",lat:"41.88853",lng:"-80.804893",phone:"4409648324",ext:null,url:"http://www.co.ashtabula.oh.us/PDF/VSC/ACVSO_Contact.pdf",urlText:"Ashtabula County Office Website"},{id:"5",type:"1",subType:null,county:"Athens",name:"Athens County Veterans Services",address1:"70 N. Plains Rd.",address2:"Suite A",city:"The Plains",state:"OH",
postalCode:"45780",lat:"39.374469",lng:"-82.135995",phone:"7405923216",ext:null,url:"http://www.co.athensoh.org/Veterans.html",urlText:"Athens County Office Website"},{id:"6",type:"1",subType:null,county:"Auglaize",name:"Auglaize County Veterans Services",address1:"209 S. Blackhoof St",address2:"Room 202",city:"Wapakoneta",state:"OH",postalCode:"45895",lat:"40.568254",lng:"-84.196685",phone:"4197396750",ext:null,url:"http://www2.auglaizecounty.org/resources/vet-service",urlText:"Auglaize County Office Website"},
{id:"7",type:"1",subType:null,county:"Belmont",name:"Belmont County Veterans Services",address1:"3326 Belmont St.",address2:null,city:"Bellaire",state:"OH",postalCode:"43906",lat:"40.01538",lng:"-80.742658",phone:"7403251042",ext:null,url:"http://www.belmontcountyveterans.org/",urlText:"Belmont County Office Website"},{id:"8",type:"1",subType:null,county:"Brown",name:"Brown County Veterans Services",address1:"303 E. Cherry St",address2:"Ste. 104",city:"Georgetown",state:"OH",postalCode:"45121",lat:"38.865381",
lng:"-83.902361",phone:"9373783155",ext:null,url:"http://www.browncountyohio.gov/index.php/veterans-services",urlText:"Brown County Office Website"},{id:"9",type:"1",subType:null,county:"Butler",name:"Butler County Veterans Services",address1:"315 High St.",address2:"Butler County Gov. Service Ctr., 1st Flr",city:"Hamilton",state:"OH",postalCode:"45011",lat:"39.39951",lng:"-84.561349",phone:"5138873600",ext:null,url:"http://www.butlercountyohio.org/VeteranServices/",urlText:"Butler County Office Website"},
{id:"10",type:"1",subType:null,county:"Carroll",name:"Carroll County Veterans Services",address1:"160 Second St. SW",address2:null,city:"Carrollton",state:"OH",postalCode:"44615",lat:"40.57294",lng:"-81.08789",phone:"3306272590",ext:null,url:"http://carrolltonveterans.com/",urlText:"Carroll County Office Website"},{id:"11",type:"1",subType:null,county:"Champaign",name:"Champaign County Veterans Services",address1:"955 N. Main St.",address2:null,city:"Urbana",state:"OH",postalCode:"43078",lat:"40.120897",
lng:"-83.749896",phone:"9376534554",ext:null,url:"http://www.co.champaign.oh.us/ChampaignCountyVeteransServiceOffice.pdf",urlText:"Champaign County Office Website"},{id:"12",type:"1",subType:null,county:"Clark",name:"Clark County Veterans Services",address1:"120 S. Center St",address2:"3rd Floor",city:"Springfield",state:"OH",postalCode:"45502",lat:"39.922814",lng:"-83.812396",phone:"9375212030",ext:null,url:"http://www.clarkcountyohio.gov/index.aspx?nid\x3d174",urlText:"Clark County Office Website"},
{id:"13",type:"1",subType:null,county:"Clermont",name:"Clermont County Veterans Services",address1:"76 S. Riverside Dr.",address2:"Heritage Building, 3rd Floor",city:"Batavia",state:"OH",postalCode:"45103",lat:"39.077149",lng:"-84.179225",phone:"5137327363",ext:null,url:"http://www.clermontcountyveterans.com/",urlText:"Clermont County Office Website"},{id:"14",type:"1",subType:null,county:"Clinton",name:"Clinton County Veterans Services",address1:"43 S. Walnut St",address2:"Box 2",city:"Wilmington",
state:"OH",postalCode:"45177",lat:"39.444778",lng:"-83.827166",phone:"9373823233",ext:null,url:"http://co.clinton.oh.us/government/veterans-service-commission",urlText:"Clinton County Office Website"},{id:"15",type:"1",subType:null,county:"Columbiana",name:"Columbiana County Veterans Services",address1:"7989 Dickey Dr., Suite 1",address2:null,city:"Lisbon",state:"OH",postalCode:"44432",lat:"40.781526",lng:"-80.771231",phone:"3304247214",ext:null,url:"http://www.columbianacounty.org/Vets/VeteransServiceOffice.pdf",
urlText:"Columbiana County Office Website"},{id:"16",type:"1",subType:null,county:"Coshocton",name:"Coshocton County Veterans Services",address1:"318 Main Street",address2:null,city:"Coshocton",state:"OH",postalCode:"43812",lat:"40.273795",lng:"-81.866136",phone:"7406222313",ext:null,url:"http://www.coshoctoncounty.net/agency/vet/",urlText:"Coshocton County Office Website"},{id:"17",type:"1",subType:null,county:"Crawford",name:"Crawford County Veterans Services",address1:"112 E. Mansfield St.",address2:"Ste. 95 CH Lower Level, Admin. Bldg.",
city:"Bucyrus",state:"OH",postalCode:"44820",lat:"40.80922",lng:"-82.974569",phone:"4195627761",ext:null,url:"http://bill-bessinger.tripod.com/crawfordcountyveteransservicecommission/",urlText:"Crawford County Office Website"},{id:"18",type:"1",subType:null,county:"Cuyahoga",name:"Cuyahoga County Veterans Services",address1:"1849 Prospect Ave",address2:"Ste. 150",city:"Cleveland",state:"OH",postalCode:"44115",lat:"41.499987",lng:"-81.678083",phone:"2166982600",ext:null,url:"http://vsc.cuyahogacounty.us/",
urlText:"Cuyahoga County Office Website"},{id:"19",type:"1",subType:null,county:"Darke",name:"Darke County Veterans Services",address1:"611 Wagner Ave.",address2:null,city:"Greenville",state:"OH",postalCode:"45331",lat:"40.117017",lng:"-84.621108",phone:"9375485305",ext:null,url:"http://co.darke.oh.us/veterans/",urlText:"Darke County Office Website"},{id:"20",type:"1",subType:null,county:"Defiance",name:"Defiance County Veterans Services",address1:"1300 E. Second St",address2:"Suite 102",city:"Defiance",
state:"OH",postalCode:"43512",lat:"41.283784",lng:"-84.341383",phone:"4197826861",ext:null,url:"http://www.defiance-county.com/veterans/index.php",urlText:"Defiance County Office Website"},{id:"21",type:"1",subType:null,county:"Delaware",name:"Delaware County Veterans Services",address1:"149 N. Sandusky St",address2:"R.B. Hayes County Services Bldg",city:"Delaware",state:"OH",postalCode:"43015",lat:"40.303484",lng:"-83.067897",phone:"7408332010",ext:null,url:"http://www.delawarecountyvsc.org/",urlText:"Delaware County Office Website"},
{id:"22",type:"1",subType:null,county:"Erie",name:"Erie County Veterans Services",address1:"247 Columbus Ave.",address2:null,city:"Sandusky",state:"OH",postalCode:"44870",lat:"41.455331",lng:"-82.711665",phone:"4196277650",ext:null,url:"http://www.eriecounty.oh.gov/resources/veterans-services/",urlText:"Erie County Office Website"},{id:"23",type:"1",subType:null,county:"Fairfield",name:"Fairfield County Veterans Services",address1:"277 E. Main St.",address2:null,city:"Lancaster",state:"OH",postalCode:"43130",
lat:"39.713639",lng:"-82.598239",phone:"7406527920",ext:null,url:"http://www.fairfieldcountyvets.org/",urlText:"Fairfield County Office Website"},{id:"24",type:"1",subType:null,county:"Fayette",name:"Fayette County Veterans Services",address1:"133 S. Main St",address2:"Ste. L11",city:"Washington Courthouse",state:"OH",postalCode:"43160",lat:"39.535129",lng:"-83.439441",phone:"7403351610",ext:null,url:"http://www.fayette-co-oh.com/veterans/index.html",urlText:"Fayette County Office Website"},{id:"25",
type:"1",subType:null,county:"Franklin",name:"Franklin County Veterans Services",address1:"250 W. Broad St",address2:null,city:"Columbus",state:"OH",postalCode:"43215",lat:"39.962195",lng:"-83.009151",phone:"6145252500",ext:null,url:"http://www.franklincountyohio.gov/vets/",urlText:"Franklin County Office Website"},{id:"26",type:"1",subType:null,county:"Fulton",name:"Fulton County Veterans Services",address1:"604 S. Shoop Ave",address2:"Suite 270",city:"Wauseon",state:"OH",postalCode:"43567",lat:"41.540486",
lng:"-84.134309",phone:"4193379266",ext:null,url:"http://www.fultoncountyoh.com/veterans_web_site",urlText:"Fulton County Office Website"},{id:"27",type:"1",subType:null,county:"Gallia",name:"Gallia County Veterans Services",address1:"323 Upper River Road",address2:"Suite A",city:"Gallipolis",state:"OH",postalCode:"45631",lat:"38.836807",lng:"-82.152003",phone:"7404462005",ext:null,url:"http://www.gallianet.net/index.php/gallia-county/veteran-s-service-center",urlText:"Gallia County Office Website"},
{id:"28",type:"1",subType:null,county:"Geauga",name:"Geauga County Veterans Services",address1:"470 Center St",address2:"Bldg 8-a",city:"Chardon",state:"OH",postalCode:"44024",lat:"41.591516",lng:"-81.224496",phone:"4402791860",ext:null,url:"http://www.co.geauga.oh.us/Departments/VeteransService.aspx",urlText:"Geauga County Office Website"},{id:"29",type:"1",subType:null,county:"Greene",name:"Greene County Veterans Services",address1:"571 Ledbetter Rd.",address2:null,city:"Xenia",state:"OH",postalCode:"45385",
lat:"39.66768",lng:"-83.944471",phone:"9375626020",ext:null,url:"http://www.co.greene.oh.us/index.aspx?nid\x3d340",urlText:"Greene County Office Website"},{id:"30",type:"1",subType:null,county:"Guernsey",name:"Guernsey County Veterans Services",address1:"627 Wheeling Ave",address2:"Suite 102",city:"Cambridge",state:"OH",postalCode:"43725",lat:"40.024857",lng:"-81.592553",phone:"7404329295",ext:null,url:"http://www.guernseycounty.org/cms/?q\x3dveterans",urlText:"Guernsey County Office Website"},{id:"31",
type:"1",subType:null,county:"Hamilton",name:"Hamilton County Veterans Services",address1:"230 E. Ninth St",address2:"1st Floor, Room 1100",city:"Cincinnati",state:"OH",postalCode:"45202",lat:"39.106223",lng:"-84.50993",phone:"5139463300",ext:null,url:"http://www.hamiltoncountyohio.gov/veterans/",urlText:"Hamilton County Office Website"},{id:"32",type:"1",subType:null,county:"Hancock",name:"Hancock County Veterans Services",address1:"1100 E. Main Cross St.",address2:"Ste. 201",city:"Findlay",state:"OH",
postalCode:"45840",lat:"41.041669",lng:"-83.628251",phone:"4194247036",ext:null,url:"http://co.hancock.oh.us/veterans/veterans.jpg",urlText:"Hancock County Office Website"},{id:"33",type:"1",subType:null,county:"Hardin",name:"Hardin County Veterans Services",address1:"1 Court House Square",address2:"Ste. 120",city:"Kenton",state:"OH",postalCode:"43326",lat:"40.64765",lng:"-83.608145",phone:"4196742219",ext:null,url:"http://www.co.hardin.oh.us/vets.php",urlText:"Hardin County Office Website"},{id:"34",
type:"1",subType:null,county:"Harrison",name:"Harrison County Veterans Services",address1:"100 W. Market St.",address2:"Harrison County Courthouse",city:"Cadiz",state:"OH",postalCode:"43907",lat:"40.272861",lng:"-80.997073",phone:"7409428441",ext:null,url:"http://www.harrisoncountyohio.org/community/government/HarrisonCountyVeteransServiceOffice.pdf",urlText:"Harrison County Office Website"},{id:"35",type:"1",subType:null,county:"Henry",name:"Henry County Veterans Services",address1:"1855 Oakwood Ave.",
address2:null,city:"Napoleon",state:"OH",postalCode:"43545",lat:"41.412312",lng:"-84.11895",phone:"4195920956",ext:null,url:"http://www.henrycountyohio.com/veterans.htm",urlText:"Henry County Office Website"},{id:"36",type:"1",subType:null,county:"Highland",name:"Highland County Veterans Services",address1:"1575 N. High Street",address2:"Suite 400",city:"Hillsboro",state:"OH",postalCode:"45133",lat:"39.238348",lng:"-83.609559",phone:"9373938686",ext:null,url:"http://www.co.highland.oh.us/pdf/Highland%20County%20Vets%20WebLink.pdf",
urlText:"Highland County Office Website"},{id:"37",type:"1",subType:null,county:"Hocking",name:"Hocking County Veterans Services",address1:"93 W. Hunter St.",address2:"Courthouse, 1st Floor",city:"Logan",state:"OH",postalCode:"43138",lat:"39.541215",lng:"-82.410387",phone:"7403857507",ext:null,url:"http://www.co.hocking.oh.us/veterans",urlText:"Hocking County Office Website"},{id:"38",type:"1",subType:null,county:"Holmes",name:"Holmes County Veterans Services",address1:"10 S. Clay St",address2:"Ste. 104",
city:"Millersburg",state:"OH",postalCode:"44654",lat:"40.553508",lng:"-81.9174",phone:"3306744806",ext:null,url:"http://www.co.holmes.oh.us/veterans_services/",urlText:"Holmes County Office Website"},{id:"39",type:"1",subType:null,county:"Huron",name:"Huron County Veterans Services",address1:"130 Shady Lane Dr",address2:null,city:"Norwalk",state:"OH",postalCode:"44857",lat:"41.224692",lng:"-82.609136",phone:"4196684150",ext:null,url:"http://www.huroncountyvets.com/",urlText:"Huron County Office Website"},
{id:"40",type:"1",subType:null,county:"Jackson",name:"Jackson County Veterans Services",address1:"157 Broadway St",address2:null,city:"Jackson",state:"OH",postalCode:"45640",lat:"39.050854",lng:"-82.6384",phone:"7402863004",ext:null,url:"http://www.jacksoncountygovernment.org/veterans%20services.htm",urlText:"Jackson County Office Website"},{id:"41",type:"1",subType:null,county:"Jefferson",name:"Jefferson County Veterans Services",address1:"423 North St.",address2:null,city:"Steubenville",state:"OH",
postalCode:"43952",lat:"40.36362",lng:"-80.614081",phone:"7402838571",ext:null,url:"http://www.jeffersoncountyoh.com/CountyOffices/VeteransServiceCommission.aspx",urlText:"Jefferson County Office Website"},{id:"42",type:"1",subType:null,county:"Knox",name:"Knox County Veterans Services",address1:"411 Pittsburgh Ave.",address2:null,city:"Mt. Vernon",state:"OH",postalCode:"43050",lat:"40.382737",lng:"-82.504615",phone:"7403936742",ext:null,url:"http://kcvso.com/",urlText:"Knox County Office Website"},
{id:"43",type:"1",subType:null,county:"Lake",name:"Lake County Veterans Services",address1:"105 Main St",address2:"Lake County Admin. Bldg. Box 490",city:"Painesville",state:"OH",postalCode:"44077",lat:"41.725532",lng:"-81.242609",phone:"800899LAKE",ext:null,url:"http://www.lakecountyohio.gov/veterans",urlText:"Lake County Office Website"},{id:"44",type:"1",subType:null,county:"Lawrence",name:"Lawrence County Veterans Services",address1:"111 S. Fourth St.",address2:"Courthouse",city:"Ironton",state:"OH",
postalCode:"45638",lat:"38.535755",lng:"-82.684027",phone:"7405334327",ext:null,url:"http://www.lawrencecountyohio.org/pdf/veteran.pdf",urlText:"Lawrence County Office Website"},{id:"45",type:"1",subType:null,county:"Licking",name:"Licking County Veterans Services",address1:"935 Buckeye Ave",address2:null,city:"Newark",state:"OH",postalCode:"43055",lat:"40.047492",lng:"-82.437332",phone:"7406705430",ext:null,url:"http://www.lcounty.com/vsc/",urlText:"Licking County Office Website"},{id:"46",type:"1",
subType:null,county:"Logan",name:"Logan County Veterans Services",address1:"121 S. Opera St.",address2:"Memorial Hall",city:"Bellefontaine",state:"OH",postalCode:"43311",lat:"40.36098",lng:"-83.758804",phone:"9375994221",ext:null,url:"http://www.co.logan.oh.us/VeteransService/index.html",urlText:"Logan County Office Website"},{id:"47",type:"1",subType:null,county:"Lorain",name:"Lorain County Veterans Services",address1:"42495 N. Ridge Rd.",address2:null,city:"Elyria",state:"OH",postalCode:"44035",
lat:"41.418138",lng:"-82.141782",phone:"4402844624",ext:null,url:"http://www.loraincountyveterans.com/",urlText:"Lorain County Office Website"},{id:"48",type:"1",subType:null,county:"Lucas",name:"Lucas County Veterans Services",address1:"1301 Monroe St",address2:"Suite 180",city:"Toledo",state:"OH",postalCode:"43604",lat:"41.652465",lng:"-83.545552",phone:"4192136090",ext:null,url:"http://co.lucas.oh.us/index.aspx?nid\x3d958",urlText:"Lucas County Office Website"},{id:"49",type:"1",subType:null,county:"Madison",
name:"Madison County Veterans Services",address1:"1 N. Main St",address2:"Room 011",city:"London",state:"OH",postalCode:"43140",lat:"39.886389",lng:"-83.449546",phone:"7408520676",ext:null,url:"http://co.madison.oh.us/veteranservices/",urlText:"Madison County Office Website"},{id:"50",type:"1",subType:null,county:"Mahoning",name:"Mahoning County Veterans Services",address1:"345 Oakhill Ave",address2:"Suite 100",city:"Youngstown",state:"OH",postalCode:"44502",lat:"41.097478",lng:"-80.659334",phone:"3307402451",
ext:null,url:"http://www.mahoningcountyoh.gov/tabid/805/default.aspx",urlText:"Mahoning County Office Website"},{id:"51",type:"1",subType:null,county:"Marion",name:"Marion County Veterans Services",address1:"220 E. Fairground St",address2:"Suite 101",city:"Marion",state:"OH",postalCode:"43302",lat:"40.600306",lng:"-83.125701",phone:"7403870100",ext:null,url:"http://home.roadrunner.com/~marionveteransservice",urlText:"Marion County Office Website"},{id:"52",type:"1",subType:null,county:"Medina",name:"Medina County Veterans Services",
address1:"210 Northland Dr",address2:null,city:"Medina",state:"OH",postalCode:"44256",lat:"41.152742",lng:"-81.867805",phone:"3307229368",ext:null,url:"http://www.medinacountyveteransserviceoffice.org",urlText:"Medina County Office Website"},{id:"53",type:"1",subType:null,county:"Meigs",name:"Meigs County Veterans Services",address1:"117 E. Memorial Dr",address2:"Suite 3",city:"Pomeroy",state:"OH",postalCode:"45769",lat:"39.03744",lng:"-82.045642",phone:"7409922820",ext:null,url:"Coming soon!",urlText:"Meigs County Office Website"},
{id:"54",type:"1",subType:null,county:"Mercer",name:"Mercer County Veterans Services",address1:"220 West Livingston",address2:"B270",city:"Celina",state:"OH",postalCode:"45822",lat:"40.549731",lng:"-84.573427",phone:"4195863542",ext:null,url:"http://www.mercercountyohio.org/veterans/MercerCountyVeteransServiceOffice.pdf",urlText:"Mercer County Office Website"},{id:"55",type:"1",subType:null,county:"Miami",name:"Miami County Veterans Services",address1:"510 W. Water St.",address2:"Ste. 140",city:"Troy",
state:"OH",postalCode:"45373",lat:"40.042719",lng:"-84.20743",phone:"9374408126",ext:null,url:"http://www.mcvets.org",urlText:"Miami County Office Website"},{id:"56",type:"1",subType:null,county:"Monroe",name:"Monroe County Veterans Services",address1:"118 Home Ave",address2:"Box 542",city:"Woodsfield",state:"OH",postalCode:"43793",lat:"39.759982",lng:"-81.10906",phone:"7404720743",ext:null,url:"http://www.monroecountyohio.net/countyoffices/veteransoffice.html ",urlText:"Monroe County Office Website"},
{id:"57",type:"1",subType:null,county:"Montgomery",name:"Montgomery County Veterans Services",address1:"627 Edwin C. Moses Blvd.",address2:"4th Floor, E. Medical Plaza",city:"Dayton",state:"OH",postalCode:"45417",lat:"39.747375",lng:"-84.197454",phone:"9372254801",ext:null,url:"http://www.mcvsc.org/",urlText:"Montgomery County Office Website"},{id:"58",type:"1",subType:null,county:"Morgan",name:"Morgan County Veterans Services",address1:"55 S. Kennebec Ave",address2:null,city:"McConnelsville",state:"OH",
postalCode:"43756",lat:"39.648218",lng:"-81.853194",phone:"7409624181",ext:null,url:"http://www.morgancounty-oh.gov/images/MorganCountyVeteransServiceOffice_img_0.gif",urlText:"Morgan County Office Website"},{id:"59",type:"1",subType:null,county:"Morrow",name:"Morrow County Veterans Services",address1:"143 South Main St.",address2:null,city:"Mt. Gilead",state:"OH",postalCode:"43338",lat:"40.545474",lng:"-82.82949",phone:"4199461914",ext:null,url:"http://www.morrowcountyveterans.com/",urlText:"Morrow County Office Website"},
{id:"60",type:"1",subType:null,county:"Muskingum",name:"Muskingum County Veterans Services",address1:"225 Underwood St",address2:"Ste. 500",city:"Zanesville",state:"OH",postalCode:"43701",lat:"39.943369",lng:"-82.00134",phone:"7404557149",ext:null,url:"http://vets.muskingumcounty.org",urlText:"Muskingum County Office Website"},{id:"61",type:"1",subType:null,county:"Noble",name:"Noble County Veterans Services",address1:"190 Courthouse Square",address2:"Room 1a",city:"Caldwell",state:"OH",postalCode:"43724",
lat:"39.750159",lng:"-81.636758",phone:"7407325567",ext:null,url:"http://www.noblecountyveteransservice.com",urlText:"Noble County Office Website"},{id:"62",type:"1",subType:null,county:"Ottawa",name:"Ottawa County Veterans Services",address1:"8444 W. State Rt. 163",address2:"Ste. 102",city:"Oak Harbor",state:"OH",postalCode:"43449",lat:"41.508095",lng:"-83.096534",phone:"8006108872",ext:null,url:"http://www.co.ottawa.oh.us/veterans/index.htm",urlText:"Ottawa County Office Website"},{id:"63",type:"1",
subType:null,county:"Paulding",name:"Paulding County Veterans Services",address1:"810 E. Perry St",address2:"P.O. Box 215",city:"Paulding",state:"OH",postalCode:"45879",lat:"41.131634",lng:"-84.573326",phone:"4193998285",ext:null,url:"http://www.pauldingchamber.com/#/community-links/4558021592",urlText:"Paulding County Office Website"},{id:"64",type:"1",subType:null,county:"Perry",name:"Perry County Veterans Services",address1:"121 W. Brown Street",address2:null,city:"New Lexington",state:"OH",postalCode:"43764",
lat:"39.713957",lng:"-82.207946",phone:"7403422536",ext:null,url:"http://www.visitperrycountyohio.com/government/county-services/veteran-s-services.html",urlText:"Perry County Office Website"},{id:"65",type:"1",subType:null,county:"Pickaway",name:"Pickaway County Veterans Services",address1:"141 W. Main St.",address2:"Ste. 300",city:"Circleville",state:"OH",postalCode:"43113",lat:"39.60234",lng:"-82.946891",phone:"8883303522",ext:null,url:"http://www.pickawayvets.org/",urlText:"Pickaway County Office Website"},
{id:"66",type:"1",subType:null,county:"Pike",name:"Pike County Veterans Services",address1:"120 S. Market Street",address2:null,city:"Waverly",state:"OH",postalCode:"45690",lat:"39.126707",lng:"-82.984813",phone:"7409472766",ext:null,url:"http://www.waverlyinfo.com/business/listing/webpage/20843695/4718/Pike-Co-Veterans-Service-Commission",urlText:"Pike County Office Website"},{id:"67",type:"1",subType:null,county:"Portage",name:"Portage County Veterans Services",address1:"449 S. Meridian St.",address2:"Portage County Admin. Bldg.",
city:"Ravenna",state:"OH",postalCode:"44266",lat:"41.152747",lng:"-81.244298",phone:"3302973545",ext:null,url:"http://www.co.portage.oh.us/veterans.htm",urlText:"Portage County Office Website"},{id:"68",type:"1",subType:null,county:"Preble",name:"Preble County Veterans Services",address1:"108 N. Barron St.",address2:null,city:"Eaton",state:"OH",postalCode:"45320",lat:"39.744272",lng:"-84.636453",phone:"9374566111",ext:null,url:"http://www.preblecounty.com/com_PDF/PrebleCountyVeteransServiceOffice.pdf",
urlText:"Preble County Office Website"},{id:"69",type:"1",subType:null,county:"Putnam",name:"Putnam County Veterans Services",address1:"245 E. Main St",address2:"Ste. 105",city:"Ottawa",state:"OH",postalCode:"45875",lat:"41.019267",lng:"-84.046151",phone:"4195234478",ext:null,url:"http://www.putnamcountyohio.gov/Veteran%20Services/veterans_service_commission.htm",urlText:"Putnam County Office Website"},{id:"70",type:"1",subType:null,county:"Richland",name:"Richland County Veterans Services",address1:"597 Park Ave. E.",
address2:null,city:"Mansfield",state:"OH",postalCode:"44905",lat:"40.758619",lng:"-82.49063",phone:"4197745822",ext:null,url:"http://www.richlandcountyvets.org/",urlText:"Richland County Office Website"},{id:"71",type:"1",subType:null,county:"Ross",name:"Ross County Veterans Services",address1:"475 Western Ave",address2:"Ste #C",city:"Chillicothe",state:"OH",postalCode:"45601",lat:"39.335143",lng:"-83.003221",phone:"7407721600",ext:null,url:"http://www.co.ross.oh.us/RossCountyVeteransServiceOffice.pdf",
urlText:"Ross County Office Website"},{id:"72",type:"1",subType:null,county:"Sandusky",name:"Sandusky County Veterans Services",address1:"2511 Countryside Dr",address2:"Ste. B",city:"Fremont",state:"OH",postalCode:"43420",lat:"41.358038",lng:"-83.082241",phone:"4193344421",ext:null,url:"http://www.sandusky-county.com/index.php?page\x3dveterans-office",urlText:"Sandusky County Office Website"},{id:"73",type:"1",subType:null,county:"Scioto",name:"Scioto County Veterans Services",address1:"612 6th St",
address2:"Ste. E",city:"Portsmouth",state:"OH",postalCode:"45662",lat:"38.734868",lng:"-83.000034",phone:"7403531477",ext:null,url:"http://www.sciotoveteranscommission.com",urlText:"Scioto County Office Website"},{id:"74",type:"1",subType:null,county:"Seneca",name:"Seneca County Veterans Services",address1:"920 E. County Road 20",address2:null,city:"Tiffin",state:"OH",postalCode:"44883",lat:"41.072975",lng:"-83.154448",phone:"8008200189",ext:null,url:"http://www.senecacountyveterans.org",urlText:"Seneca County Office Website"},
{id:"75",type:"1",subType:null,county:"Shelby",name:"Shelby County Veterans Services",address1:"133 S. Ohio Ave",address2:null,city:"Sidney",state:"OH",postalCode:"45365",lat:"40.284669",lng:"-84.156669",phone:"9374987282",ext:null,url:"http://www.shelbysites.com/pages/veteransservices.asp",urlText:"Shelby County Office Website"},{id:"76",type:"1",subType:null,county:"Stark",name:"Stark County Veterans Services",address1:"110 Central Plaza S",address2:"Ste. 424",city:"Canton",state:"OH",postalCode:"44702",
lat:"40.797956",lng:"-81.374288",phone:"3304517457",ext:null,url:"http://www.co.stark.oh.us/internet/HOME.DisplayPage?v_page\x3dVeterans_aboutUs",urlText:"Stark County Office Website"},{id:"77",type:"1",subType:null,county:"Summit",name:"Summit County Veterans Services",address1:"1060 E. Waterloo Rd.",address2:null,city:"Akron",state:"OH",postalCode:"44306",lat:"41.029485",lng:"-81.489987",phone:"3306432830",ext:null,url:"http://www.vscsummitoh.us/",urlText:"Summit County Office Website"},{id:"78",
type:"1",subType:null,county:"Trumbull",name:"Trumbull County Veterans Services",address1:"280 N. Park Ave. NE",address2:"Ste. 201",city:"Warren",state:"OH",postalCode:"44481",lat:"41.238644",lng:"-80.817763",phone:"3306752585",ext:null,url:"http://veterans.co.trumbull.oh.us/",urlText:"Trumbull County Office Website"},{id:"79",type:"1",subType:null,county:"Tuscarawas",name:"Tuscarawas County Veterans Services",address1:"393 16th St. SW",address2:"P.O. Box 807",city:"New Philadelphia",state:"OH",postalCode:"44663",
lat:"40.486036",lng:"-81.486053",phone:"3303391163",ext:null,url:"http://www.co.tuscarawas.oh.us/Veterans/index.htm",urlText:"Tuscarawas County Office Website"},{id:"80",type:"1",subType:null,county:"Union",name:"Union County Veterans Services",address1:"238 W. 6th St",address2:null,city:"Marysville",state:"OH",postalCode:"43040",lat:"40.235811",lng:"-83.369754",phone:"8006862308",ext:null,url:"http://www.co.union.oh.us/veterans-services",urlText:"Union County Office Website"},{id:"81",type:"1",subType:null,
county:"Van Wert",name:"Van Wert County Veterans Services",address1:"121 E. Main St",address2:"Room 101",city:"Van Wert",state:"OH",postalCode:"45891",lat:"40.869642",lng:"-84.581968",phone:"4192389592",ext:null,url:"http://vanwertcounty.org/vets/",urlText:"Van Wert County Office Website"},{id:"82",type:"1",subType:null,county:"Vinton",name:"Vinton County Veterans Services",address1:"100 East Main Street",address2:"Courthouse, P.O. Box 63",city:"McArthur",state:"OH",postalCode:"45651",lat:"39.246623",
lng:"-82.478967",phone:"7405964571",ext:"224",url:"http://www.vintoncounty.com/government-a-to-z.html",urlText:"Vinton County Office Website"},{id:"83",type:"1",subType:null,county:"Warren",name:"Warren County Veterans Services",address1:"320 E. Silver St.",address2:null,city:"Lebanon",state:"OH",postalCode:"45036",lat:"39.435902",lng:"-84.203242",phone:"5136952717",ext:null,url:"http://www.warrencountyveterans.com/",urlText:"Warren County Office Website"},{id:"84",type:"1",subType:null,county:"Washington",
name:"Washington County Veterans Services",address1:"706 Pike St.",address2:"Ste. 1",city:"Marietta",state:"OH",postalCode:"45750",lat:"39.407188",lng:"-81.419859",phone:"7405689009",ext:null,url:"http://www.washingtongov.org/index.aspx?nid\x3d162",urlText:"Washington County Office Website"},{id:"85",type:"1",subType:null,county:"Wayne",name:"Wayne County Veterans Services",address1:"356 W. North St",address2:"Lower Level",city:"Wooster",state:"OH",postalCode:"44691",lat:"40.798713",lng:"-81.944921",
phone:"8003356638",ext:null,url:"http://www.waynecountyveterans.org/",urlText:"Wayne County Office Website"},{id:"86",type:"1",subType:null,county:"Williams",name:"Williams County Veterans Services",address1:"129 S. Beech St",address2:null,city:"Bryan",state:"OH",postalCode:"43506",lat:"41.473623",lng:"-84.553645",phone:"4196368812",ext:null,url:"http://co.williams.oh.us/VA/index.html",urlText:"Williams County Office Website"},{id:"87",type:"1",subType:null,county:"Wood",name:"Wood County Veterans Services",
address1:"1616 E. Wooster St.",address2:"Unit 22",city:"Bowling Green",state:"OH",postalCode:"43402",lat:"41.374542",lng:"-83.622897",phone:"4193549147",ext:null,url:"http://www.co.wood.oh.us/veteranshome.asp",urlText:"Wood County Office Website"},{id:"88",type:"1",subType:null,county:"Wyandot",name:"Wyandot County Veterans Services",address1:"129 S. Sandusky Ave.",address2:null,city:"Upper Sandusky",state:"OH",postalCode:"43351",lat:"40.826045",lng:"-83.281324",phone:"4192942045",ext:null,url:"http://www.co.wyandot.oh.us/docs/vets.pdf",
urlText:"Wyandot County Office Website"}]});

define(["module"],function(a){a.config&&a.config();return[{id:"1089",type:"2",subType:"4",county:null,name:"Ashtabula County VA Clinic",shortName:"Ashtabula County VA Clinic",address1:"1230 Lake Avenue",address2:null,city:"Ashtabula",state:"OH",postalCode:"44004",lat:"41.8883878",lng:"-80.8048578",phone:"8664630912",ext:null,url:null,urlText:null},{id:"1090",type:"2",subType:"4",county:null,name:"Belmont County Community-Based Outpatient Clinic",shortName:"Belmont County Outpatient Clinic",address1:"103 Plaza Drive",
address2:"Suite A",city:"St. Clairsville",state:"OH",postalCode:"43950",lat:"40.076567",lng:"-80.916928",phone:"7406959321",ext:null,url:null,urlText:null},{id:"1091",type:"3",subType:"1",county:null,name:"VA Healthcare System of Ohio",shortName:"VA Healthcare System of Ohio",address1:"11500 Northlake Drive",address2:"Suite 200",city:"Cincinnati",state:"OH",postalCode:"45249",lat:"39.274744",lng:"-84.349637",phone:"5132474621",ext:null,url:null,urlText:null},{id:"1092",type:"3",subType:"2",county:null,
name:"Chalmers P. Wylie Ambulatory Care Center",shortName:"Chalmers P. Wylie Ambulatory Care Center",address1:"420 N. James Road",address2:null,city:"Columbus",state:"OH",postalCode:"43219",lat:"39.9816916",lng:"-82.9107411",phone:"6142575200",ext:null,url:null,urlText:null},{id:"1093",type:"3",subType:"2",county:null,name:"Chillicothe VA Medical Center",shortName:"Chillicothe VA Medical Center",address1:"17273 State Route 104",address2:null,city:"Chillicothe",state:"OH",postalCode:"45601",lat:"39.3888543",
lng:"-83.0183709",phone:"7407731141",ext:null,url:null,urlText:null},{id:"1094",type:"3",subType:"2",county:null,name:"Cincinnati VA Medical Center",shortName:"Cincinnati VA Medical Center",address1:"3200 Vine Street",address2:null,city:"Cincinnati",state:"OH",postalCode:"45220",lat:"39.1392531",lng:"-84.5080927",phone:"5138613100",ext:null,url:null,urlText:null},{id:"1095",type:"3",subType:"2",county:null,name:"Dayton VA Medical Center",shortName:"Dayton VA Medical Center",address1:"4100 W. 3rd Street",
address2:null,city:"Dayton",state:"OH",postalCode:"45428",lat:"39.739714",lng:"-84.26758",phone:"9372686511",ext:null,url:null,urlText:null},{id:"1096",type:"3",subType:"2",county:null,name:"Louis Stokes VA Medical Center",shortName:"Louis Stokes VA Medical Center",address1:"10701 East Boulevard",address2:null,city:"Cleveland",state:"OH",postalCode:"44106",lat:"41.5137191",lng:"-81.6138268",phone:"2167913800",ext:null,url:null,urlText:null},{id:"1097",type:"3",subType:"3",county:null,name:"Canton Outpatient Clinic",
shortName:"Canton Outpatient Clinic",address1:"733 Market Avenue South",address2:null,city:"Canton",state:"OH",postalCode:"44702",lat:"40.793191",lng:"-81.377152",phone:"3304894600",ext:null,url:null,urlText:null},{id:"1098",type:"3",subType:"3",county:null,name:"Youngstown Outpatient Clinic",shortName:"Youngstown Outpatient Clinic",address1:"2031 Belmont Avenue",address2:null,city:"Youngstown",state:"OH",postalCode:"44505",lat:"41.127125",lng:"-80.662981",phone:"3307409200",ext:null,url:null,urlText:null},
{id:"1099",type:"3",subType:"4",county:null,name:"Akron Community-Based Outpatient Clinic",shortName:"Akron Outpatient Clinic",address1:"55 W. Waterloo",address2:null,city:"Akron",state:"OH",postalCode:"44319",lat:"41.029142",lng:"-81.528897",phone:"3307247715",ext:null,url:null,urlText:null},{id:"1100",type:"3",subType:"4",county:null,name:"Athens Community-Based Outpatient Clinic",shortName:"Athens Outpatient Clinic",address1:"510 W. Union Street",address2:null,city:"Athens",state:"OH",postalCode:"45701",
lat:"39.331306",lng:"-82.123106",phone:"7405937314",ext:null,url:null,urlText:null},{id:"1101",type:"3",subType:"4",county:null,name:"Cambridge Community-Based Outpatient Clinic",shortName:"Cambridge Outpatient Clinic",address1:"2146 Southgate Parkway",address2:null,city:"Cambridge",state:"OH",postalCode:"43725",lat:"40.004943",lng:"-81.57984",phone:"7404321963",ext:null,url:null,urlText:null},{id:"1102",type:"3",subType:"4",county:null,name:"Clermont County Community-Based Outpatient Clinic",shortName:"Clermont County Outpatient Clinic",
address1:"4600 Beechwood Road",address2:null,city:"Cincinnati",state:"OH",postalCode:"45244",lat:"39.1118465",lng:"-84.3046096",phone:"5139433680",ext:null,url:null,urlText:null},{id:"1103",type:"3",subType:"4",county:null,name:"East Liverpool/Calcutta Community-Based Outpatient Clinic",shortName:"East Liverpool/Calcutta Outpatient Clinic",address1:"15655 State Rt. 170",address2:"Suite A",city:"Calcutta",state:"OH",postalCode:"43920",lat:"40.6732763",lng:"-80.5768579",phone:"3303864303",ext:null,
url:null,urlText:null},{id:"1104",type:"3",subType:"4",county:null,name:"Grove City Community-Based Outpatient Clinic",shortName:"Grove City Outpatient Clinic",address1:"1955 Ohio Drive",address2:null,city:"Grove City",state:"OH",postalCode:"43123",lat:"39.8806864",lng:"-83.0548779",phone:"6142575800",ext:null,url:null,urlText:null},{id:"1105",type:"3",subType:"4",county:null,name:"Hamilton VA Healthcare Associates - Butler County",shortName:"Hamilton VA Healthcare Associates - Butler County",address1:"1750 South Erie Highway",
address2:null,city:"Hamilton",state:"OH",postalCode:"45011",lat:"39.3788495",lng:"-84.5497339",phone:"5138709444",ext:null,url:null,urlText:null},{id:"1106",type:"3",subType:"4",county:null,name:"Lancaster Community-Based Outpatient Clinic",shortName:"Lancaster Outpatient Clinic",address1:"Colonnade Medical Bldg.",address2:"1550 Sheridan Dr., Suite 100",city:"Lancaster",state:"OH",postalCode:"43130",lat:"39.739216",lng:"-82.567659",phone:"7406536145",ext:null,url:null,urlText:null},{id:"1107",type:"3",
subType:"4",county:null,name:"Lima Community-Based Outpatient Clinic",shortName:"Lima Outpatient Clinic",address1:"1303 Bellefontaine Avenue",address2:null,city:"Lima",state:"OH",postalCode:"45804",lat:"40.7319251",lng:"-84.081573",phone:"4192225788",ext:null,url:null,urlText:null},{id:"1108",type:"3",subType:"4",county:null,name:"Lorain Community-Based Outpatient Clinic",shortName:"Lorain Outpatient Clinic",address1:"205 West 20th Street",address2:null,city:"Lorain",state:"OH",postalCode:"44052",
lat:"41.4519019",lng:"-82.167328",phone:"4402443833",ext:null,url:null,urlText:null},{id:"1109",type:"3",subType:"4",county:null,name:"Mansfield Community-Based Outpatient Clinic",shortName:"Mansfield Outpatient Clinic",address1:"1456 Park Avenue West",address2:null,city:"Mansfield",state:"OH",postalCode:"44906",lat:"40.760651",lng:"-82.568555",phone:"4195294602",ext:null,url:null,urlText:null},{id:"1110",type:"3",subType:"4",county:null,name:"Marietta Community-Based Outpatient Clinic",shortName:"Marietta Outpatient Clinic",
address1:"418 Colegate Drive",address2:null,city:"Marietta",state:"OH",postalCode:"45750",lat:"39.426214",lng:"-81.43563",phone:"7405680412",ext:null,url:null,urlText:null},{id:"1111",type:"3",subType:"4",county:null,name:"Marion Community-Based Outpatient Clinic",shortName:"Marion Outpatient Clinic",address1:"1203 Delaware Avenue",address2:"Corporate Center #2",city:"Marion",state:"OH",postalCode:"43302",lat:"40.5676606",lng:"-83.1214419",phone:"7402238089",ext:null,url:null,urlText:null},{id:"1112",
type:"3",subType:"4",county:null,name:"McCafferty Community-Based Outpatient Clinic",shortName:"McCafferty Outpatient Clinic",address1:"4242 Lorain Avenue",address2:null,city:"Cleveland",state:"OH",postalCode:"44113",lat:"41.479819",lng:"-81.715934",phone:"2169390699",ext:null,url:null,urlText:null},{id:"1113",type:"3",subType:"4",county:null,name:"Middletown Community-Based Outpatient Clinic",shortName:"Middletown Outpatient Clinic",address1:"4337 N. Union Road",address2:null,city:"Middletown",state:"OH",
postalCode:"45005",lat:"39.5073487",lng:"-84.3163604",phone:"5134238387",ext:null,url:null,urlText:null},{id:"1114",type:"3",subType:"4",county:null,name:"New Philadelphia Clinic",shortName:"New Philadelphia Clinic",address1:"1260 Monroe Avenue",address2:"Suite 1A",city:"New Philadelphia",state:"OH",postalCode:"44663",lat:"40.50642",lng:"-81.457662",phone:"3306025339",ext:null,url:null,urlText:null},{id:"1115",type:"3",subType:"4",county:null,name:"Newark Community-Based Outpatient Clinic",shortName:"Newark Outpatient Clinic",
address1:"1855 W. Main Street",address2:null,city:"Newark",state:"OH",postalCode:"43055",lat:"40.0414069",lng:"-82.4682447",phone:"7407888329",ext:null,url:null,urlText:null},{id:"1116",type:"3",subType:"4",county:null,name:"Painesville Community-Based Outpatient Clinic",shortName:"Painesville Outpatient Clinic",address1:"7 West Jackson Street",address2:null,city:"Painesville",state:"OH",postalCode:"44077",lat:"41.7250612",lng:"-81.2484569",phone:"4403576740",ext:null,url:null,urlText:null},{id:"1117",
type:"3",subType:"4",county:null,name:"Parma Community-Based Outpatient Clinic",shortName:"Parma Outpatient Clinic",address1:"8787 Brookpark Road",address2:null,city:"Parma",state:"OH",postalCode:"44129",lat:"41.4179032",lng:"-81.7453625",phone:"2167397000",ext:null,url:null,urlText:null},{id:"1118",type:"3",subType:"4",county:null,name:"Portsmouth Community-Based Outpatient Clinic",shortName:"Portsmouth Outpatient Clinic",address1:"840 Gallia Street",address2:null,city:"Portsmouth",state:"OH",postalCode:"45662",
lat:"38.7339",lng:"-82.9949",phone:"7403533236",ext:null,url:null,urlText:null},{id:"1119",type:"3",subType:"4",county:null,name:"Ravenna Clinic",shortName:"Ravenna Clinic",address1:"6751 N. Chestnut Street",address2:null,city:"Ravenna",state:"OH",postalCode:"44266",lat:"41.1745353",lng:"-81.2452422",phone:"3302963641",ext:null,url:null,urlText:null},{id:"1120",type:"3",subType:"4",county:null,name:"Sandusky Community-Based Outpatient Clinic",shortName:"Sandusky Outpatient Clinic",address1:"3416 Columbus Avenue",
address2:null,city:"Sandusky",state:"OH",postalCode:"44870",lat:"41.4192691",lng:"-82.6899342",phone:"4196257350",ext:null,url:null,urlText:null},{id:"1121",type:"3",subType:"4",county:null,name:"Springfield Community-Based Outpatient Clinic",shortName:"Springfield Outpatient Clinic",address1:"512 South Burnett Road",address2:null,city:"Springfield",state:"OH",postalCode:"45505",lat:"39.9149324",lng:"-83.7704152",phone:"9373283385",ext:null,url:null,urlText:null},{id:"1122",type:"3",subType:"4",county:null,
name:"Warren Community-Based Outpatient Clinic",shortName:"Warren Outpatient Clinic",address1:"1460 Tod Avenue (NW)",address2:null,city:"Warren",state:"OH",postalCode:"44485",lat:"41.246447",lng:"-80.8347641",phone:"3303920311",ext:null,url:null,urlText:null},{id:"1123",type:"3",subType:"4",county:null,name:"Zanesville Community-Based Outpatient Clinic",shortName:"Zanesville Outpatient Clinic",address1:"2800 Maple Avenue",address2:null,city:"Zanesville",state:"OH",postalCode:"43701",lat:"39.97465",
lng:"-82.012107",phone:"7404537725",ext:null,url:null,urlText:null},{id:"1124",type:"3",subType:"5",county:null,name:"Cincinnati Vet Center",shortName:"Cincinnati Vet Center",address1:"801B W. 8th Street",address2:"Suite 126",city:"Cincinnati",state:"OH",postalCode:"45203",lat:"39.1029435",lng:"-84.5274808",phone:"5137633500",ext:null,url:null,urlText:null},{id:"1125",type:"3",subType:"5",county:null,name:"Cleveland Maple Heights Vet Center",shortName:"Cleveland Maple Heights Vet Center",address1:"5310 1/2 Warrensville Ctr Road",
address2:null,city:"Maple Heights",state:"OH",postalCode:"44137",lat:"41.4160356",lng:"-81.5375821",phone:"2167077901",ext:null,url:null,urlText:null},{id:"1126",type:"3",subType:"5",county:null,name:"Columbus Vet Center",shortName:"Columbus Vet Center",address1:"30 Spruce Street",address2:null,city:"Columbus",state:"OH",postalCode:"43215",lat:"39.9723112",lng:"-83.0035875",phone:"6142575550",ext:null,url:null,urlText:null},{id:"1127",type:"3",subType:"5",county:null,name:"Dayton Vet Center",shortName:"Dayton Vet Center",
address1:"627 Edwin C. Moses Blvd.",address2:"6th Flr., East Medical Plaza",city:"Dayton",state:"OH",postalCode:"45408",lat:"39.747376",lng:"-84.197454",phone:"9374619150",ext:null,url:null,urlText:null},{id:"1128",type:"3",subType:"5",county:null,name:"McCafferty Vet Center Outstation",shortName:"McCafferty Vet Center Outstation",address1:"4242 Lorain Avenue",address2:"Suite 203",city:"Cleveland",state:"OH",postalCode:"44113",lat:"41.479819",lng:"-81.715934",phone:"2169390784",ext:null,url:null,
urlText:null},{id:"1129",type:"3",subType:"5",county:null,name:"Parma Vet Center",shortName:"Parma Vet Center",address1:"5700 Pearl Road",address2:"Suite 102",city:"Parma",state:"OH",postalCode:"44129",lat:"41.4071381",lng:"-81.7418761",phone:"4408455023",ext:null,url:null,urlText:null},{id:"1130",type:"3",subType:"5",county:null,name:"Stark County Vet Center",shortName:"Stark County Vet Center",address1:"220 Market Avenue S.",address2:"Suite 1160",city:"Canton",state:"OH",postalCode:"44702",lat:"40.7973653",
lng:"-81.3753064",phone:"3304543120",ext:null,url:null,urlText:null},{id:"1131",type:"4",subType:"3",county:null,name:"Toledo VA Outpatient Clinic",shortName:"Toledo VA Outpatient Clinic",address1:"1200 S. Detroit Avenue",address2:null,city:"Toledo",state:"OH",postalCode:"43614",lat:"41.6172608",lng:"-83.600642",phone:"4192592000",ext:null,url:null,urlText:null},{id:"1132",type:"4",subType:"5",county:null,name:"Toledo Vet Center",shortName:"Toledo Vet Center",address1:"1565 S. Byrne Road",address2:"Suite 104",
city:"Toledo",state:"OH",postalCode:"43614",lat:"41.610102",lng:"-83.624925",phone:"4192137533",ext:null,url:null,urlText:null},{id:"1133",type:"5",subType:"1",county:null,name:"Cleveland Regional Office",shortName:"Cleveland Regional Office",address1:"A.J. Celebrezze Fed. Building",address2:"1240 East 9th Street",city:"Cleveland",state:"OH",postalCode:"44199",lat:"41.5048309",lng:"-81.6918194",phone:"8008271000",ext:null,url:null,urlText:null},{id:"1134",type:"6",subType:"6",county:null,name:"Dayton National Cemetery",
shortName:"Dayton National Cemetery",address1:"VA Medical Center",address2:"4100 West Third Street",city:"Dayton",state:"OH",postalCode:"45428",lat:"39.748882",lng:"-84.253888",phone:"9372622115",ext:null,url:null,urlText:null},{id:"1135",type:"6",subType:"6",county:null,name:"Ohio Western Reserve National Cemetery",shortName:"Ohio Western Reserve National Cemetery",address1:"P.O. Box 8",address2:"10175 Rawiga Road",city:"Rittman",state:"OH",postalCode:"44270",lat:"40.9992377",lng:"-81.8153452",phone:"3303353069",
ext:null,url:null,urlText:null}]});

define(["module"],function(a){a.config&&a.config();return[{id:"2136",type:"7",subType:null,county:"Franklin",name:"Ohio Department of Veterans Services",address1:"77 South High Street",address2:"7th Floor",city:"Columbus",state:"OH",postalCode:"43215",lat:"39.960598",lng:"-83.000738",phone:"18883876446",phoneText:"1 (888) DVS-OHIO (387-6446)",ext:null,url:"http://www.ohiovet.gov",urlText:"ODVS Website",email:"ohiovet@dvs.ohio.gov"}]});

define(["module","model/geo/vaFacilities","model/geo/serviceOffices","model/geo/odvsHeadquarters","model/geo/ohioVeteransHomes"],function(a,b,c,d,e){a.config&&a.config();a=[];a.push.apply(a,c);a.push.apply(a,b);a.push.apply(a,d);a.push.apply(a,e);return a});

define(["module"],function(a){a.config&&a.config();return[{id:"1",name:"Administration"},{id:"2",name:"VA Medical Centers"},{id:"5",name:"VA Vet Centers"},{id:"3",name:"VA Outpatient Clinics"},{id:"4",name:"VA Community-Based Outpatient Clinics"},{id:"6",name:"VA Memorials"}]});

define(["module"],function(a){a.config&&a.config();return[{postalCode:"43001",county:"Licking",lat:"40.09",lng:"-82.61"},{postalCode:"43002",county:"Franklin",lat:"40.06",lng:"-83.17"},{postalCode:"43003",county:"Delaware",lat:"40.41",lng:"-82.97"},{postalCode:"43004",county:"Franklin",lat:"40",lng:"-82.8"},{postalCode:"43005",county:"Knox",lat:"40.28",lng:"-82.28"},{postalCode:"43006",county:"Holmes",lat:"40.47",lng:"-82.16"},{postalCode:"43007",county:"Union",lat:"40.34",lng:"-83.41"},{postalCode:"43008",
county:"Licking",lat:"39.93",lng:"-82.48"},{postalCode:"43009",county:"Champaign",lat:"40.17",lng:"-83.64"},{postalCode:"43010",county:"Clark",lat:"40",lng:"-83.62"},{postalCode:"43011",county:"Knox",lat:"40.3",lng:"-82.68"},{postalCode:"43013",county:"Licking",lat:"40.24",lng:"-82.69"},{postalCode:"43014",county:"Knox",lat:"40.47",lng:"-82.26"},{postalCode:"43015",county:"Delaware",lat:"40.29",lng:"-83.07"},{postalCode:"43016",county:"Franklin",lat:"40.1",lng:"-83.15"},{postalCode:"43017",county:"Franklin",
lat:"40.11",lng:"-83.13"},{postalCode:"43018",county:"Licking",lat:"39.96",lng:"-82.68"},{postalCode:"43019",county:"Knox",lat:"40.49",lng:"-82.56"},{postalCode:"43021",county:"Delaware",lat:"40.21",lng:"-82.9"},{postalCode:"43022",county:"Knox",lat:"40.35",lng:"-82.35"},{postalCode:"43023",county:"Licking",lat:"40.07",lng:"-82.52"},{postalCode:"43025",county:"Licking",lat:"39.96",lng:"-82.51"},{postalCode:"43026",county:"Franklin",lat:"40.02",lng:"-83.16"},{postalCode:"43027",county:"Licking",lat:"40.24",
lng:"-82.52"},{postalCode:"43028",county:"Knox",lat:"40.41",lng:"-82.31"},{postalCode:"43029",county:"Madison",lat:"40.11",lng:"-83.48"},{postalCode:"43030",county:"Licking",lat:"39.96",lng:"-82.42"},{postalCode:"43031",county:"Licking",lat:"40.15",lng:"-82.67"},{postalCode:"43032",county:"Delaware",lat:"40.33",lng:"-82.96"},{postalCode:"43033",county:"Licking",lat:"39.96",lng:"-82.6"},{postalCode:"43035",county:"Delaware",lat:"40.17",lng:"-83"},{postalCode:"43036",county:"Union",lat:"40.35",lng:"-83.26"},
{postalCode:"43037",county:"Knox",lat:"40.28",lng:"-82.34"},{postalCode:"43040",county:"Union",lat:"40.25",lng:"-83.37"},{postalCode:"43041",county:"Union",lat:"40.24",lng:"-83.37"},{postalCode:"43044",county:"Champaign",lat:"40.06",lng:"-83.57"},{postalCode:"43045",county:"Union",lat:"40.18",lng:"-83.44"},{postalCode:"43046",county:"Fairfield",lat:"39.9",lng:"-82.54"},{postalCode:"43047",county:"Champaign",lat:"40.21",lng:"-83.64"},{postalCode:"43048",county:"Knox",lat:"40.35",lng:"-82.63"},{postalCode:"43050",
county:"Knox",lat:"40.39",lng:"-82.49"},{postalCode:"43054",county:"Franklin",lat:"40.08",lng:"-82.82"},{postalCode:"43055",county:"Licking",lat:"40.08",lng:"-82.4"},{postalCode:"43056",county:"Licking",lat:"40.02",lng:"-82.37"},{postalCode:"43058",county:"Licking",lat:"40.06",lng:"-82.4"},{postalCode:"43060",county:"Champaign",lat:"40.22",lng:"-83.56"},{postalCode:"43061",county:"Delaware",lat:"40.28",lng:"-83.2"},{postalCode:"43062",county:"Licking",lat:"39.99",lng:"-82.68"},{postalCode:"43064",
county:"Madison",lat:"40.11",lng:"-83.26"},{postalCode:"43065",county:"Delaware",lat:"40.16",lng:"-83.09"},{postalCode:"43066",county:"Delaware",lat:"40.4",lng:"-83.17"},{postalCode:"43067",county:"Union",lat:"40.35",lng:"-83.46"},{postalCode:"43068",county:"Franklin",lat:"39.96",lng:"-82.79"},{postalCode:"43069",county:"Franklin",lat:"39.95",lng:"-82.81"},{postalCode:"43070",county:"Champaign",lat:"40.22",lng:"-83.96"},{postalCode:"43071",county:"Licking",lat:"40.18",lng:"-82.37"},{postalCode:"43072",
county:"Champaign",lat:"40.12",lng:"-83.96"},{postalCode:"43073",county:"Licking",lat:"40",lng:"-82.75"},{postalCode:"43074",county:"Delaware",lat:"40.27",lng:"-82.85"},{postalCode:"43076",county:"Perry",lat:"39.91",lng:"-82.41"},{postalCode:"43077",county:"Union",lat:"40.14",lng:"-83.34"},{postalCode:"43078",county:"Champaign",lat:"40.11",lng:"-83.76"},{postalCode:"43080",county:"Licking",lat:"40.24",lng:"-82.43"},{postalCode:"43081",county:"Franklin",lat:"40.11",lng:"-82.9"},{postalCode:"43082",
county:"Delaware",lat:"40.15",lng:"-82.91"},{postalCode:"43083",county:"Champaign",lat:"40.11",lng:"-83.82"},{postalCode:"43084",county:"Champaign",lat:"40.17",lng:"-83.54"},{postalCode:"43085",county:"Franklin",lat:"40.1",lng:"-83.02"},{postalCode:"43086",county:"Franklin",lat:"40.12",lng:"-82.92"},{postalCode:"43093",county:"Licking",lat:"40.06",lng:"-82.46"},{postalCode:"43101",county:"Ross",lat:"39.47",lng:"-82.75"},{postalCode:"43102",county:"Fairfield",lat:"39.65",lng:"-82.76"},{postalCode:"43103",
county:"Pickaway",lat:"39.72",lng:"-82.95"},{postalCode:"43105",county:"Fairfield",lat:"39.86",lng:"-82.61"},{postalCode:"43106",county:"Fayette",lat:"39.62",lng:"-83.4"},{postalCode:"43107",county:"Fairfield",lat:"39.7",lng:"-82.42"},{postalCode:"43109",county:"Franklin",lat:"39.92",lng:"-82.83"},{postalCode:"43110",county:"Franklin",lat:"39.86",lng:"-82.81"},{postalCode:"43111",county:"Hocking",lat:"39.5",lng:"-82.24"},{postalCode:"43112",county:"Fairfield",lat:"39.8",lng:"-82.71"},{postalCode:"43113",
county:"Pickaway",lat:"39.6",lng:"-82.95"},{postalCode:"43115",county:"Ross",lat:"39.5",lng:"-83.16"},{postalCode:"43116",county:"Pickaway",lat:"39.77",lng:"-83.06"},{postalCode:"43117",county:"Pickaway",lat:"39.77",lng:"-83.21"},{postalCode:"43119",county:"Franklin",lat:"39.94",lng:"-83.18"},{postalCode:"43123",county:"Franklin",lat:"39.88",lng:"-83.07"},{postalCode:"43125",county:"Franklin",lat:"39.86",lng:"-82.89"},{postalCode:"43126",county:"Franklin",lat:"39.81",lng:"-83.17"},{postalCode:"43127",
county:"Hocking",lat:"39.48",lng:"-82.33"},{postalCode:"43128",county:"Fayette",lat:"39.64",lng:"-83.58"},{postalCode:"43130",county:"Fairfield",lat:"39.71",lng:"-82.61"},{postalCode:"43135",county:"Hocking",lat:"39.46",lng:"-82.7"},{postalCode:"43136",county:"Fairfield",lat:"39.8",lng:"-82.81"},{postalCode:"43137",county:"Pickaway",lat:"39.82",lng:"-82.98"},{postalCode:"43138",county:"Hocking",lat:"39.53",lng:"-82.41"},{postalCode:"43140",county:"Madison",lat:"39.9",lng:"-83.44"},{postalCode:"43142",
county:"Fayette",lat:"39.59",lng:"-83.59"},{postalCode:"43143",county:"Madison",lat:"39.72",lng:"-83.28"},{postalCode:"43144",county:"Hocking",lat:"39.51",lng:"-82.17"},{postalCode:"43145",county:"Pickaway",lat:"39.56",lng:"-83.26"},{postalCode:"43146",county:"Pickaway",lat:"39.78",lng:"-83.15"},{postalCode:"43147",county:"Fairfield",lat:"39.9",lng:"-82.76"},{postalCode:"43148",county:"Fairfield",lat:"39.81",lng:"-82.51"},{postalCode:"43149",county:"Hocking",lat:"39.55",lng:"-82.56"},{postalCode:"43150",
county:"Fairfield",lat:"39.78",lng:"-82.41"},{postalCode:"43151",county:"Madison",lat:"39.73",lng:"-83.48"},{postalCode:"43152",county:"Hocking",lat:"39.39",lng:"-82.62"},{postalCode:"43153",county:"Madison",lat:"39.72",lng:"-83.56"},{postalCode:"43154",county:"Fairfield",lat:"39.61",lng:"-82.83"},{postalCode:"43155",county:"Fairfield",lat:"39.63",lng:"-82.51"},{postalCode:"43156",county:"Pickaway",lat:"39.56",lng:"-82.78"},{postalCode:"43157",county:"Fairfield",lat:"39.84",lng:"-82.55"},{postalCode:"43158",
county:"Hocking",lat:"39.46",lng:"-82.36"},{postalCode:"43160",county:"Fayette",lat:"39.54",lng:"-83.44"},{postalCode:"43162",county:"Madison",lat:"39.94",lng:"-83.29"},{postalCode:"43164",county:"Pickaway",lat:"39.6",lng:"-83.12"},{postalCode:"43194",county:"Franklin",lat:"39.81",lng:"-82.97"},{postalCode:"43195",county:"Franklin",lat:"39.85",lng:"-82.89"},{postalCode:"43199",county:"Franklin",lat:"39.86",lng:"-82.9"},{postalCode:"43201",county:"Franklin",lat:"39.99",lng:"-83"},{postalCode:"43202",
county:"Franklin",lat:"40.02",lng:"-83.01"},{postalCode:"43203",county:"Franklin",lat:"39.97",lng:"-82.97"},{postalCode:"43204",county:"Franklin",lat:"39.96",lng:"-83.08"},{postalCode:"43205",county:"Franklin",lat:"39.96",lng:"-82.97"},{postalCode:"43206",county:"Franklin",lat:"39.94",lng:"-82.98"},{postalCode:"43207",county:"Franklin",lat:"39.9",lng:"-82.97"},{postalCode:"43209",county:"Franklin",lat:"39.96",lng:"-82.93"},{postalCode:"43210",county:"Franklin",lat:"40.01",lng:"-83.02"},{postalCode:"43211",
county:"Franklin",lat:"40.01",lng:"-82.97"},{postalCode:"43212",county:"Franklin",lat:"39.99",lng:"-83.04"},{postalCode:"43213",county:"Franklin",lat:"39.97",lng:"-82.87"},{postalCode:"43214",county:"Franklin",lat:"40.05",lng:"-83.02"},{postalCode:"43215",county:"Franklin",lat:"39.97",lng:"-83.01"},{postalCode:"43216",county:"Franklin",lat:"39.97",lng:"-82.9"},{postalCode:"43217",county:"Franklin",lat:"39.82",lng:"-82.94"},{postalCode:"43218",county:"Franklin",lat:"39.97",lng:"-83.01"},{postalCode:"43219",
county:"Franklin",lat:"40.01",lng:"-82.93"},{postalCode:"43220",county:"Franklin",lat:"40.05",lng:"-83.07"},{postalCode:"43221",county:"Franklin",lat:"40.03",lng:"-83.08"},{postalCode:"43222",county:"Franklin",lat:"39.96",lng:"-83.03"},{postalCode:"43223",county:"Franklin",lat:"39.93",lng:"-83.04"},{postalCode:"43224",county:"Franklin",lat:"40.04",lng:"-82.97"},{postalCode:"43226",county:"Franklin",lat:"40.1",lng:"-82.99"},{postalCode:"43227",county:"Franklin",lat:"39.95",lng:"-82.89"},{postalCode:"43228",
county:"Franklin",lat:"39.96",lng:"-83.13"},{postalCode:"43229",county:"Franklin",lat:"40.08",lng:"-82.97"},{postalCode:"43230",county:"Franklin",lat:"40.04",lng:"-82.87"},{postalCode:"43231",county:"Franklin",lat:"40.08",lng:"-82.94"},{postalCode:"43232",county:"Franklin",lat:"39.92",lng:"-82.87"},{postalCode:"43234",county:"Franklin",lat:"40.1",lng:"-83.06"},{postalCode:"43235",county:"Franklin",lat:"40.1",lng:"-83.05"},{postalCode:"43236",county:"Franklin",lat:"40",lng:"-82.89"},{postalCode:"43240",
county:"Delaware",lat:"40.15",lng:"-82.98"},{postalCode:"43251",county:"Franklin",lat:"39.96",lng:"-83.02"},{postalCode:"43260",county:"Franklin",lat:"39.96",lng:"-83"},{postalCode:"43266",county:"Franklin",lat:"40.06",lng:"-82.97"},{postalCode:"43268",county:"Franklin",lat:"39.96",lng:"-82.99"},{postalCode:"43270",county:"Franklin",lat:"39.96",lng:"-83"},{postalCode:"43271",county:"Franklin",lat:"39.97",lng:"-83.03"},{postalCode:"43272",county:"Franklin",lat:"39.96",lng:"-83"},{postalCode:"43279",
county:"Franklin",lat:"39.97",lng:"-83.03"},{postalCode:"43287",county:"Franklin",lat:"39.96",lng:"-83"},{postalCode:"43291",county:"Franklin",lat:"39.97",lng:"-83.12"},{postalCode:"43301",county:"Marion",lat:"40.56",lng:"-83.12"},{postalCode:"43302",county:"Marion",lat:"40.59",lng:"-83.12"},{postalCode:"43306",county:"Marion",lat:"40.61",lng:"-83.16"},{postalCode:"43310",county:"Logan",lat:"40.52",lng:"-83.78"},{postalCode:"43311",county:"Logan",lat:"40.37",lng:"-83.75"},{postalCode:"43314",county:"Marion",
lat:"40.65",lng:"-82.96"},{postalCode:"43315",county:"Morrow",lat:"40.49",lng:"-82.87"},{postalCode:"43316",county:"Wyandot",lat:"40.95",lng:"-83.38"},{postalCode:"43317",county:"Morrow",lat:"40.48",lng:"-82.68"},{postalCode:"43318",county:"Logan",lat:"40.31",lng:"-83.91"},{postalCode:"43319",county:"Logan",lat:"40.3",lng:"-83.57"},{postalCode:"43320",county:"Morrow",lat:"40.58",lng:"-82.89"},{postalCode:"43321",county:"Morrow",lat:"40.46",lng:"-82.83"},{postalCode:"43322",county:"Marion",lat:"40.53",
lng:"-83.21"},{postalCode:"43323",county:"Wyandot",lat:"40.73",lng:"-83.23"},{postalCode:"43324",county:"Logan",lat:"40.46",lng:"-83.83"},{postalCode:"43325",county:"Morrow",lat:"40.66",lng:"-82.84"},{postalCode:"43326",county:"Hardin",lat:"40.64",lng:"-83.61"},{postalCode:"43330",county:"Wyandot",lat:"40.81",lng:"-83.42"},{postalCode:"43331",county:"Logan",lat:"40.51",lng:"-83.91"},{postalCode:"43332",county:"Marion",lat:"40.59",lng:"-83.38"},{postalCode:"43333",county:"Logan",lat:"40.43",lng:"-83.91"},
{postalCode:"43334",county:"Morrow",lat:"40.4",lng:"-82.81"},{postalCode:"43335",county:"Marion",lat:"40.67",lng:"-82.91"},{postalCode:"43336",county:"Logan",lat:"40.29",lng:"-83.58"},{postalCode:"43337",county:"Marion",lat:"40.69",lng:"-83.22"},{postalCode:"43338",county:"Morrow",lat:"40.56",lng:"-82.77"},{postalCode:"43340",county:"Hardin",lat:"40.54",lng:"-83.49"},{postalCode:"43341",county:"Marion",lat:"40.59",lng:"-83.32"},{postalCode:"43342",county:"Marion",lat:"40.47",lng:"-83.18"},{postalCode:"43343",
county:"Logan",lat:"40.31",lng:"-83.97"},{postalCode:"43344",county:"Union",lat:"40.43",lng:"-83.34"},{postalCode:"43345",county:"Hardin",lat:"40.51",lng:"-83.58"},{postalCode:"43346",county:"Hardin",lat:"40.57",lng:"-83.84"},{postalCode:"43347",county:"Logan",lat:"40.47",lng:"-83.66"},{postalCode:"43348",county:"Logan",lat:"40.47",lng:"-83.89"},{postalCode:"43349",county:"Morrow",lat:"40.62",lng:"-82.66"},{postalCode:"43350",county:"Morrow",lat:"40.35",lng:"-82.71"},{postalCode:"43351",county:"Wyandot",
lat:"40.83",lng:"-83.29"},{postalCode:"43356",county:"Marion",lat:"40.45",lng:"-83.05"},{postalCode:"43357",county:"Logan",lat:"40.25",lng:"-83.76"},{postalCode:"43358",county:"Logan",lat:"40.42",lng:"-83.51"},{postalCode:"43359",county:"Wyandot",lat:"40.87",lng:"-83.46"},{postalCode:"43360",county:"Logan",lat:"40.33",lng:"-83.65"},{postalCode:"43402",county:"Wood",lat:"41.39",lng:"-83.66"},{postalCode:"43403",county:"Wood",lat:"41.38",lng:"-83.64"},{postalCode:"43406",county:"Wood",lat:"41.33",lng:"-83.44"},
{postalCode:"43407",county:"Sandusky",lat:"41.28",lng:"-83.24"},{postalCode:"43408",county:"Ottawa",lat:"41.57",lng:"-83.36"},{postalCode:"43410",county:"Sandusky",lat:"41.3",lng:"-82.97"},{postalCode:"43412",county:"Lucas",lat:"41.63",lng:"-83.32"},{postalCode:"43413",county:"Wood",lat:"41.24",lng:"-83.65"},{postalCode:"43414",county:"Wood",lat:"41.46",lng:"-83.61"},{postalCode:"43416",county:"Ottawa",lat:"41.47",lng:"-83.29"},{postalCode:"43420",county:"Sandusky",lat:"41.36",lng:"-83.11"},{postalCode:"43430",
county:"Ottawa",lat:"41.52",lng:"-83.37"},{postalCode:"43431",county:"Sandusky",lat:"41.39",lng:"-83.32"},{postalCode:"43432",county:"Ottawa",lat:"41.55",lng:"-83.26"},{postalCode:"43433",county:"Ottawa",lat:"41.5",lng:"-82.87"},{postalCode:"43434",county:"Lucas",lat:"41.69",lng:"-83.44"},{postalCode:"43435",county:"Sandusky",lat:"41.33",lng:"-83.3"},{postalCode:"43436",county:"Ottawa",lat:"41.71",lng:"-82.82"},{postalCode:"43437",county:"Wood",lat:"41.25",lng:"-83.61"},{postalCode:"43438",county:"Erie",
lat:"41.6",lng:"-82.7"},{postalCode:"43439",county:"Ottawa",lat:"41.52",lng:"-83.04"},{postalCode:"43440",county:"Ottawa",lat:"41.53",lng:"-82.77"},{postalCode:"43441",county:"Wood",lat:"41.5",lng:"-83.47"},{postalCode:"43442",county:"Sandusky",lat:"41.42",lng:"-83.22"},{postalCode:"43443",county:"Wood",lat:"41.46",lng:"-83.48"},{postalCode:"43445",county:"Ottawa",lat:"41.58",lng:"-83.3"},{postalCode:"43446",county:"Ottawa",lat:"41.68",lng:"-82.81"},{postalCode:"43447",county:"Wood",lat:"41.56",lng:"-83.44"},
{postalCode:"43449",county:"Ottawa",lat:"41.53",lng:"-83.13"},{postalCode:"43450",county:"Wood",lat:"41.41",lng:"-83.47"},{postalCode:"43451",county:"Wood",lat:"41.32",lng:"-83.63"},{postalCode:"43452",county:"Ottawa",lat:"41.52",lng:"-82.94"},{postalCode:"43456",county:"Ottawa",lat:"41.66",lng:"-82.83"},{postalCode:"43457",county:"Wood",lat:"41.27",lng:"-83.43"},{postalCode:"43458",county:"Ottawa",lat:"41.53",lng:"-83.21"},{postalCode:"43460",county:"Wood",lat:"41.6",lng:"-83.56"},{postalCode:"43462",
county:"Wood",lat:"41.29",lng:"-83.69"},{postalCode:"43463",county:"Wood",lat:"41.51",lng:"-83.51"},{postalCode:"43464",county:"Sandusky",lat:"41.4",lng:"-82.92"},{postalCode:"43465",county:"Wood",lat:"41.58",lng:"-83.5"},{postalCode:"43466",county:"Wood",lat:"41.29",lng:"-83.5"},{postalCode:"43467",county:"Wood",lat:"41.24",lng:"-83.49"},{postalCode:"43468",county:"Ottawa",lat:"41.6",lng:"-83.34"},{postalCode:"43469",county:"Sandusky",lat:"41.45",lng:"-83.36"},{postalCode:"43501",county:"Williams",
lat:"41.67",lng:"-84.45"},{postalCode:"43502",county:"Fulton",lat:"41.53",lng:"-84.31"},{postalCode:"43504",county:"Lucas",lat:"41.7",lng:"-83.82"},{postalCode:"43505",county:"Williams",lat:"41.52",lng:"-84.73"},{postalCode:"43506",county:"Williams",lat:"41.47",lng:"-84.56"},{postalCode:"43510",county:"Henry",lat:"41.45",lng:"-83.97"},{postalCode:"43511",county:"Wood",lat:"41.26",lng:"-83.83"},{postalCode:"43512",county:"Defiance",lat:"41.29",lng:"-84.36"},{postalCode:"43515",county:"Fulton",lat:"41.59",
lng:"-84.01"},{postalCode:"43516",county:"Henry",lat:"41.21",lng:"-83.91"},{postalCode:"43517",county:"Williams",lat:"41.44",lng:"-84.73"},{postalCode:"43518",county:"Williams",lat:"41.58",lng:"-84.76"},{postalCode:"43519",county:"Defiance",lat:"41.43",lng:"-84.4"},{postalCode:"43520",county:"Defiance",lat:"41.38",lng:"-84.63"},{postalCode:"43521",county:"Fulton",lat:"41.66",lng:"-84.31"},{postalCode:"43522",county:"Wood",lat:"41.43",lng:"-83.85"},{postalCode:"43523",county:"Henry",lat:"41.34",lng:"-83.99"},
{postalCode:"43524",county:"Henry",lat:"41.23",lng:"-84.04"},{postalCode:"43525",county:"Wood",lat:"41.47",lng:"-83.7"},{postalCode:"43526",county:"Defiance",lat:"41.31",lng:"-84.75"},{postalCode:"43527",county:"Henry",lat:"41.25",lng:"-84.15"},{postalCode:"43528",county:"Lucas",lat:"41.62",lng:"-83.73"},{postalCode:"43529",county:"Wood",lat:"41.19",lng:"-83.78"},{postalCode:"43530",county:"Defiance",lat:"41.33",lng:"-84.29"},{postalCode:"43531",county:"Williams",lat:"41.64",lng:"-84.49"},{postalCode:"43532",
county:"Henry",lat:"41.45",lng:"-83.98"},{postalCode:"43533",county:"Fulton",lat:"41.69",lng:"-84.08"},{postalCode:"43534",county:"Henry",lat:"41.37",lng:"-83.93"},{postalCode:"43535",county:"Henry",lat:"41.32",lng:"-84.03"},{postalCode:"43536",county:"Defiance",lat:"41.31",lng:"-84.63"},{postalCode:"43537",county:"Lucas",lat:"41.58",lng:"-83.67"},{postalCode:"43540",county:"Fulton",lat:"41.7",lng:"-83.93"},{postalCode:"43541",county:"Wood",lat:"41.3",lng:"-83.83"},{postalCode:"43542",county:"Lucas",
lat:"41.57",lng:"-83.76"},{postalCode:"43543",county:"Williams",lat:"41.6",lng:"-84.63"},{postalCode:"43545",county:"Henry",lat:"41.39",lng:"-84.12"},{postalCode:"43547",county:"Lucas",lat:"41.49",lng:"-83.87"},{postalCode:"43548",county:"Henry",lat:"41.19",lng:"-84.18"},{postalCode:"43549",county:"Defiance",lat:"41.38",lng:"-84.52"},{postalCode:"43550",county:"Henry",lat:"41.39",lng:"-84.13"},{postalCode:"43551",county:"Wood",lat:"41.54",lng:"-83.6"},{postalCode:"43552",county:"Wood",lat:"41.55",
lng:"-83.62"},{postalCode:"43553",county:"Fulton",lat:"41.53",lng:"-84.23"},{postalCode:"43554",county:"Williams",lat:"41.67",lng:"-84.56"},{postalCode:"43555",county:"Henry",lat:"41.44",lng:"-84.26"},{postalCode:"43556",county:"Defiance",lat:"41.3",lng:"-84.56"},{postalCode:"43557",county:"Williams",lat:"41.49",lng:"-84.4"},{postalCode:"43558",county:"Fulton",lat:"41.58",lng:"-83.89"},{postalCode:"43560",county:"Lucas",lat:"41.71",lng:"-83.71"},{postalCode:"43565",county:"Wood",lat:"41.42",lng:"-83.74"},
{postalCode:"43566",county:"Lucas",lat:"41.5",lng:"-83.74"},{postalCode:"43567",county:"Fulton",lat:"41.57",lng:"-84.15"},{postalCode:"43569",county:"Wood",lat:"41.35",lng:"-83.79"},{postalCode:"43570",county:"Williams",lat:"41.59",lng:"-84.44"},{postalCode:"43571",county:"Lucas",lat:"41.52",lng:"-83.81"},{postalCode:"43601",county:"Lucas",lat:"41.65",lng:"-83.55"},{postalCode:"43603",county:"Lucas",lat:"41.66",lng:"-83.53"},{postalCode:"43604",county:"Lucas",lat:"41.65",lng:"-83.54"},{postalCode:"43605",
county:"Lucas",lat:"41.64",lng:"-83.51"},{postalCode:"43606",county:"Lucas",lat:"41.67",lng:"-83.61"},{postalCode:"43607",county:"Lucas",lat:"41.65",lng:"-83.6"},{postalCode:"43608",county:"Lucas",lat:"41.68",lng:"-83.53"},{postalCode:"43609",county:"Lucas",lat:"41.63",lng:"-83.57"},{postalCode:"43610",county:"Lucas",lat:"41.68",lng:"-83.56"},{postalCode:"43611",county:"Lucas",lat:"41.7",lng:"-83.49"},{postalCode:"43612",county:"Lucas",lat:"41.71",lng:"-83.56"},{postalCode:"43613",county:"Lucas",
lat:"41.7",lng:"-83.61"},{postalCode:"43614",county:"Lucas",lat:"41.6",lng:"-83.62"},{postalCode:"43615",county:"Lucas",lat:"41.66",lng:"-83.67"},{postalCode:"43616",county:"Lucas",lat:"41.65",lng:"-83.45"},{postalCode:"43617",county:"Lucas",lat:"41.67",lng:"-83.72"},{postalCode:"43619",county:"Wood",lat:"41.61",lng:"-83.49"},{postalCode:"43620",county:"Lucas",lat:"41.67",lng:"-83.55"},{postalCode:"43623",county:"Lucas",lat:"41.71",lng:"-83.65"},{postalCode:"43635",county:"Lucas",lat:"41.65",lng:"-83.67"},
{postalCode:"43652",county:"Lucas",lat:"41.65",lng:"-83.53"},{postalCode:"43654",county:"Wood",lat:"41.61",lng:"-83.54"},{postalCode:"43656",county:"Lucas",lat:"41.7",lng:"-83.65"},{postalCode:"43657",county:"Lucas",lat:"41.68",lng:"-83.56"},{postalCode:"43659",county:"Lucas",lat:"41.65",lng:"-83.54"},{postalCode:"43660",county:"Lucas",lat:"41.64",lng:"-83.54"},{postalCode:"43661",county:"Lucas",lat:"41.65",lng:"-83.61"},{postalCode:"43666",county:"Lucas",lat:"41.65",lng:"-83.53"},{postalCode:"43667",
county:"Lucas",lat:"41.65",lng:"-83.53"},{postalCode:"43681",county:"Lucas",lat:"41.64",lng:"-83.54"},{postalCode:"43682",county:"Lucas",lat:"41.64",lng:"-83.54"},{postalCode:"43697",county:"Lucas",lat:"41.65",lng:"-83.55"},{postalCode:"43699",county:"Lucas",lat:"41.63",lng:"-83.62"},{postalCode:"43701",county:"Muskingum",lat:"39.95",lng:"-82.01"},{postalCode:"43702",county:"Muskingum",lat:"39.94",lng:"-82.01"},{postalCode:"43711",county:"Noble",lat:"39.84",lng:"-81.58"},{postalCode:"43713",county:"Belmont",
lat:"39.99",lng:"-81.17"},{postalCode:"43716",county:"Monroe",lat:"39.86",lng:"-81.02"},{postalCode:"43717",county:"Noble",lat:"39.79",lng:"-81.55"},{postalCode:"43718",county:"Belmont",lat:"40.02",lng:"-81"},{postalCode:"43719",county:"Belmont",lat:"40.01",lng:"-81.08"},{postalCode:"43720",county:"Muskingum",lat:"39.81",lng:"-81.87"},{postalCode:"43721",county:"Licking",lat:"39.95",lng:"-82.26"},{postalCode:"43722",county:"Guernsey",lat:"39.92",lng:"-81.52"},{postalCode:"43723",county:"Guernsey",
lat:"39.97",lng:"-81.55"},{postalCode:"43724",county:"Noble",lat:"39.74",lng:"-81.52"},{postalCode:"43725",county:"Guernsey",lat:"40.03",lng:"-81.59"},{postalCode:"43727",county:"Muskingum",lat:"39.88",lng:"-81.82"},{postalCode:"43728",county:"Morgan",lat:"39.5",lng:"-81.89"},{postalCode:"43730",county:"Perry",lat:"39.62",lng:"-82.1"},{postalCode:"43731",county:"Perry",lat:"39.74",lng:"-82.09"},{postalCode:"43732",county:"Guernsey",lat:"39.85",lng:"-81.65"},{postalCode:"43733",county:"Guernsey",lat:"39.92",
lng:"-81.54"},{postalCode:"43734",county:"Muskingum",lat:"39.88",lng:"-81.91"},{postalCode:"43735",county:"Muskingum",lat:"39.85",lng:"-82.12"},{postalCode:"43736",county:"Guernsey",lat:"40.06",lng:"-81.23"},{postalCode:"43738",county:"Muskingum",lat:"39.86",lng:"-82.14"},{postalCode:"43739",county:"Perry",lat:"39.92",lng:"-82.29"},{postalCode:"43740",county:"Licking",lat:"39.95",lng:"-82.21"},{postalCode:"43746",county:"Muskingum",lat:"39.97",lng:"-82.18"},{postalCode:"43747",county:"Monroe",lat:"39.88",
lng:"-81.12"},{postalCode:"43748",county:"Perry",lat:"39.71",lng:"-82.3"},{postalCode:"43749",county:"Guernsey",lat:"40.17",lng:"-81.56"},{postalCode:"43750",county:"Guernsey",lat:"40",lng:"-81.51"},{postalCode:"43752",county:"Monroe",lat:"39.72",lng:"-81.01"},{postalCode:"43754",county:"Monroe",lat:"39.75",lng:"-81.24"},{postalCode:"43755",county:"Guernsey",lat:"40.03",lng:"-81.44"},{postalCode:"43756",county:"Morgan",lat:"39.68",lng:"-81.79"},{postalCode:"43757",county:"Monroe",lat:"39.86",lng:"-81.14"},
{postalCode:"43758",county:"Morgan",lat:"39.62",lng:"-81.92"},{postalCode:"43759",county:"Belmont",lat:"40.07",lng:"-81.07"},{postalCode:"43760",county:"Perry",lat:"39.89",lng:"-82.19"},{postalCode:"43761",county:"Perry",lat:"39.66",lng:"-82.14"},{postalCode:"43762",county:"Muskingum",lat:"40.02",lng:"-81.73"},{postalCode:"43764",county:"Perry",lat:"39.71",lng:"-82.19"},{postalCode:"43766",county:"Perry",lat:"39.59",lng:"-82.25"},{postalCode:"43767",county:"Muskingum",lat:"39.99",lng:"-81.81"},{postalCode:"43768",
county:"Guernsey",lat:"40.04",lng:"-81.44"},{postalCode:"43771",county:"Muskingum",lat:"39.85",lng:"-81.92"},{postalCode:"43772",county:"Guernsey",lat:"39.89",lng:"-81.53"},{postalCode:"43773",county:"Guernsey",lat:"39.98",lng:"-81.3"},{postalCode:"43777",county:"Muskingum",lat:"39.81",lng:"-82.08"},{postalCode:"43778",county:"Guernsey",lat:"40.01",lng:"-81.37"},{postalCode:"43779",county:"Noble",lat:"39.8",lng:"-81.43"},{postalCode:"43780",county:"Guernsey",lat:"39.93",lng:"-81.44"},{postalCode:"43782",
county:"Perry",lat:"39.61",lng:"-82.21"},{postalCode:"43783",county:"Perry",lat:"39.8",lng:"-82.29"},{postalCode:"43786",county:"Monroe",lat:"39.71",lng:"-81.28"},{postalCode:"43787",county:"Morgan",lat:"39.54",lng:"-81.8"},{postalCode:"43788",county:"Noble",lat:"39.81",lng:"-81.33"},{postalCode:"43791",county:"Muskingum",lat:"39.87",lng:"-82.11"},{postalCode:"43793",county:"Monroe",lat:"39.75",lng:"-81.1"},{postalCode:"43802",county:"Muskingum",lat:"40.09",lng:"-81.86"},{postalCode:"43803",county:"Coshocton",
lat:"40.35",lng:"-81.64"},{postalCode:"43804",county:"Holmes",lat:"40.45",lng:"-81.73"},{postalCode:"43805",county:"Coshocton",lat:"40.4",lng:"-81.97"},{postalCode:"43811",county:"Coshocton",lat:"40.18",lng:"-81.92"},{postalCode:"43812",county:"Coshocton",lat:"40.27",lng:"-81.87"},{postalCode:"43821",county:"Muskingum",lat:"40.13",lng:"-82.01"},{postalCode:"43822",county:"Muskingum",lat:"40.16",lng:"-82.17"},{postalCode:"43824",county:"Coshocton",lat:"40.36",lng:"-81.75"},{postalCode:"43828",county:"Coshocton",
lat:"40.35",lng:"-81.87"},{postalCode:"43830",county:"Muskingum",lat:"40.07",lng:"-82.16"},{postalCode:"43832",county:"Tuscarawas",lat:"40.28",lng:"-81.59"},{postalCode:"43836",county:"Coshocton",lat:"40.21",lng:"-81.72"},{postalCode:"43837",county:"Tuscarawas",lat:"40.32",lng:"-81.5"},{postalCode:"43840",county:"Tuscarawas",lat:"40.41",lng:"-81.59"},{postalCode:"43842",county:"Muskingum",lat:"40.14",lng:"-82.01"},{postalCode:"43843",county:"Coshocton",lat:"40.34",lng:"-82.19"},{postalCode:"43844",
county:"Coshocton",lat:"40.33",lng:"-82.05"},{postalCode:"43845",county:"Coshocton",lat:"40.27",lng:"-81.74"},{postalCode:"43901",county:"Jefferson",lat:"40.22",lng:"-80.87"},{postalCode:"43902",county:"Belmont",lat:"39.9",lng:"-80.97"},{postalCode:"43903",county:"Jefferson",lat:"40.47",lng:"-80.93"},{postalCode:"43905",county:"Belmont",lat:"40.11",lng:"-80.84"},{postalCode:"43906",county:"Belmont",lat:"40.01",lng:"-80.76"},{postalCode:"43907",county:"Harrison",lat:"40.26",lng:"-81"},{postalCode:"43908",
county:"Jefferson",lat:"40.52",lng:"-80.89"},{postalCode:"43909",county:"Belmont",lat:"40.07",lng:"-80.82"},{postalCode:"43910",county:"Jefferson",lat:"40.37",lng:"-80.82"},{postalCode:"43912",county:"Belmont",lat:"40.07",lng:"-80.78"},{postalCode:"43913",county:"Jefferson",lat:"40.27",lng:"-80.63"},{postalCode:"43914",county:"Monroe",lat:"39.77",lng:"-80.94"},{postalCode:"43915",county:"Monroe",lat:"39.77",lng:"-80.88"},{postalCode:"43916",county:"Belmont",lat:"40.07",lng:"-80.74"},{postalCode:"43917",
county:"Jefferson",lat:"40.21",lng:"-80.78"},{postalCode:"43920",county:"Columbiana",lat:"40.64",lng:"-80.58"},{postalCode:"43925",county:"Jefferson",lat:"40.45",lng:"-80.86"},{postalCode:"43926",county:"Jefferson",lat:"40.51",lng:"-80.62"},{postalCode:"43927",county:"Belmont",lat:"40.12",lng:"-80.94"},{postalCode:"43928",county:"Belmont",lat:"40.01",lng:"-80.89"},{postalCode:"43930",county:"Jefferson",lat:"40.57",lng:"-80.74"},{postalCode:"43931",county:"Monroe",lat:"39.67",lng:"-80.87"},{postalCode:"43932",
county:"Jefferson",lat:"40.53",lng:"-80.75"},{postalCode:"43933",county:"Belmont",lat:"39.94",lng:"-80.89"},{postalCode:"43934",county:"Belmont",lat:"40.08",lng:"-80.79"},{postalCode:"43935",county:"Belmont",lat:"40.11",lng:"-80.73"},{postalCode:"43937",county:"Belmont",lat:"40.13",lng:"-80.88"},{postalCode:"43938",county:"Jefferson",lat:"40.32",lng:"-80.64"},{postalCode:"43939",county:"Jefferson",lat:"40.18",lng:"-80.8"},{postalCode:"43940",county:"Belmont",lat:"40.03",lng:"-80.82"},{postalCode:"43941",
county:"Jefferson",lat:"40.25",lng:"-80.81"},{postalCode:"43942",county:"Belmont",lat:"39.87",lng:"-80.82"},{postalCode:"43943",county:"Jefferson",lat:"40.22",lng:"-80.72"},{postalCode:"43944",county:"Jefferson",lat:"40.42",lng:"-80.76"},{postalCode:"43945",county:"Columbiana",lat:"40.63",lng:"-80.84"},{postalCode:"43946",county:"Monroe",lat:"39.64",lng:"-80.95"},{postalCode:"43947",county:"Belmont",lat:"39.96",lng:"-80.76"},{postalCode:"43948",county:"Jefferson",lat:"40.27",lng:"-80.78"},{postalCode:"43950",
county:"Belmont",lat:"40.09",lng:"-80.91"},{postalCode:"43951",county:"Belmont",lat:"40.11",lng:"-81.01"},{postalCode:"43952",county:"Jefferson",lat:"40.37",lng:"-80.64"},{postalCode:"43953",county:"Jefferson",lat:"40.37",lng:"-80.7"},{postalCode:"43961",county:"Jefferson",lat:"40.52",lng:"-80.63"},{postalCode:"43962",county:"Columbiana",lat:"40.68",lng:"-80.89"},{postalCode:"43963",county:"Jefferson",lat:"40.17",lng:"-80.7"},{postalCode:"43964",county:"Jefferson",lat:"40.47",lng:"-80.62"},{postalCode:"43967",
county:"Belmont",lat:"40.02",lng:"-80.94"},{postalCode:"43968",county:"Columbiana",lat:"40.62",lng:"-80.66"},{postalCode:"43970",county:"Jefferson",lat:"40.47",lng:"-80.89"},{postalCode:"43971",county:"Jefferson",lat:"40.16",lng:"-80.71"},{postalCode:"43972",county:"Belmont",lat:"40.1",lng:"-80.98"},{postalCode:"43973",county:"Harrison",lat:"40.19",lng:"-81.27"},{postalCode:"43974",county:"Harrison",lat:"40.18",lng:"-80.89"},{postalCode:"43976",county:"Harrison",lat:"40.35",lng:"-80.9"},{postalCode:"43977",
county:"Belmont",lat:"40.14",lng:"-81.09"},{postalCode:"43981",county:"Harrison",lat:"40.18",lng:"-81"},{postalCode:"43983",county:"Belmont",lat:"40.15",lng:"-81.2"},{postalCode:"43984",county:"Harrison",lat:"40.4",lng:"-81.03"},{postalCode:"43985",county:"Belmont",lat:"40.16",lng:"-81.14"},{postalCode:"43986",county:"Harrison",lat:"40.37",lng:"-80.99"},{postalCode:"43988",county:"Harrison",lat:"40.41",lng:"-81.11"},{postalCode:"44001",county:"Lorain",lat:"41.38",lng:"-82.24"},{postalCode:"44003",
county:"Ashtabula",lat:"41.61",lng:"-80.56"},{postalCode:"44004",county:"Ashtabula",lat:"41.87",lng:"-80.79"},{postalCode:"44005",county:"Ashtabula",lat:"41.88",lng:"-80.8"},{postalCode:"44010",county:"Ashtabula",lat:"41.77",lng:"-80.87"},{postalCode:"44011",county:"Lorain",lat:"41.45",lng:"-82.02"},{postalCode:"44012",county:"Lorain",lat:"41.5",lng:"-82.01"},{postalCode:"44017",county:"Cuyahoga",lat:"41.37",lng:"-81.86"},{postalCode:"44021",county:"Geauga",lat:"41.45",lng:"-81.16"},{postalCode:"44022",
county:"Cuyahoga",lat:"41.44",lng:"-81.4"},{postalCode:"44023",county:"Geauga",lat:"41.39",lng:"-81.31"},{postalCode:"44024",county:"Geauga",lat:"41.58",lng:"-81.19"},{postalCode:"44026",county:"Geauga",lat:"41.54",lng:"-81.33"},{postalCode:"44028",county:"Lorain",lat:"41.32",lng:"-81.93"},{postalCode:"44030",county:"Ashtabula",lat:"41.93",lng:"-80.58"},{postalCode:"44032",county:"Ashtabula",lat:"41.66",lng:"-80.66"},{postalCode:"44033",county:"Geauga",lat:"41.55",lng:"-81.1"},{postalCode:"44035",
county:"Lorain",lat:"41.37",lng:"-82.11"},{postalCode:"44036",county:"Lorain",lat:"41.37",lng:"-82.1"},{postalCode:"44039",county:"Lorain",lat:"41.39",lng:"-82.01"},{postalCode:"44040",county:"Cuyahoga",lat:"41.53",lng:"-81.41"},{postalCode:"44041",county:"Ashtabula",lat:"41.8",lng:"-80.94"},{postalCode:"44044",county:"Lorain",lat:"41.28",lng:"-82.05"},{postalCode:"44045",county:"Lake",lat:"41.74",lng:"-81.28"},{postalCode:"44046",county:"Geauga",lat:"41.53",lng:"-81.08"},{postalCode:"44047",county:"Ashtabula",
lat:"41.73",lng:"-80.75"},{postalCode:"44048",county:"Ashtabula",lat:"41.87",lng:"-80.65"},{postalCode:"44049",county:"Lorain",lat:"41.27",lng:"-82.3"},{postalCode:"44050",county:"Lorain",lat:"41.24",lng:"-82.14"},{postalCode:"44052",county:"Lorain",lat:"41.46",lng:"-82.17"},{postalCode:"44053",county:"Lorain",lat:"41.43",lng:"-82.21"},{postalCode:"44054",county:"Lorain",lat:"41.48",lng:"-82.1"},{postalCode:"44055",county:"Lorain",lat:"41.43",lng:"-82.14"},{postalCode:"44056",county:"Summit",lat:"41.32",
lng:"-81.5"},{postalCode:"44057",county:"Lake",lat:"41.8",lng:"-81.06"},{postalCode:"44060",county:"Lake",lat:"41.68",lng:"-81.33"},{postalCode:"44061",county:"Lake",lat:"41.69",lng:"-81.33"},{postalCode:"44062",county:"Geauga",lat:"41.46",lng:"-81.05"},{postalCode:"44064",county:"Geauga",lat:"41.61",lng:"-81.05"},{postalCode:"44065",county:"Geauga",lat:"41.47",lng:"-81.25"},{postalCode:"44067",county:"Summit",lat:"41.31",lng:"-81.54"},{postalCode:"44068",county:"Ashtabula",lat:"41.91",lng:"-80.68"},
{postalCode:"44070",county:"Cuyahoga",lat:"41.42",lng:"-81.92"},{postalCode:"44072",county:"Geauga",lat:"41.47",lng:"-81.34"},{postalCode:"44073",county:"Geauga",lat:"41.46",lng:"-81.34"},{postalCode:"44074",county:"Lorain",lat:"41.28",lng:"-82.22"},{postalCode:"44076",county:"Ashtabula",lat:"41.53",lng:"-80.84"},{postalCode:"44077",county:"Lake",lat:"41.71",lng:"-81.24"},{postalCode:"44080",county:"Geauga",lat:"41.37",lng:"-81.06"},{postalCode:"44081",county:"Lake",lat:"41.77",lng:"-81.14"},{postalCode:"44082",
county:"Ashtabula",lat:"41.76",lng:"-80.57"},{postalCode:"44084",county:"Ashtabula",lat:"41.66",lng:"-80.87"},{postalCode:"44085",county:"Ashtabula",lat:"41.61",lng:"-80.86"},{postalCode:"44086",county:"Geauga",lat:"41.68",lng:"-81.06"},{postalCode:"44087",county:"Summit",lat:"41.32",lng:"-81.45"},{postalCode:"44088",county:"Ashtabula",lat:"41.78",lng:"-81.01"},{postalCode:"44089",county:"Erie",lat:"41.4",lng:"-82.36"},{postalCode:"44090",county:"Lorain",lat:"41.16",lng:"-82.23"},{postalCode:"44092",
county:"Lake",lat:"41.6",lng:"-81.47"},{postalCode:"44093",county:"Ashtabula",lat:"41.54",lng:"-80.59"},{postalCode:"44094",county:"Lake",lat:"41.63",lng:"-81.4"},{postalCode:"44095",county:"Lake",lat:"41.65",lng:"-81.45"},{postalCode:"44096",county:"Lake",lat:"41.65",lng:"-81.41"},{postalCode:"44097",county:"Lake",lat:"41.66",lng:"-81.43"},{postalCode:"44099",county:"Ashtabula",lat:"41.54",lng:"-80.97"},{postalCode:"44101",county:"Cuyahoga",lat:"41.49",lng:"-81.67"},{postalCode:"44102",county:"Cuyahoga",
lat:"41.47",lng:"-81.74"},{postalCode:"44103",county:"Cuyahoga",lat:"41.51",lng:"-81.64"},{postalCode:"44104",county:"Cuyahoga",lat:"41.48",lng:"-81.63"},{postalCode:"44105",county:"Cuyahoga",lat:"41.45",lng:"-81.62"},{postalCode:"44106",county:"Cuyahoga",lat:"41.51",lng:"-81.61"},{postalCode:"44107",county:"Cuyahoga",lat:"41.48",lng:"-81.8"},{postalCode:"44108",county:"Cuyahoga",lat:"41.54",lng:"-81.61"},{postalCode:"44109",county:"Cuyahoga",lat:"41.45",lng:"-81.7"},{postalCode:"44110",county:"Cuyahoga",
lat:"41.56",lng:"-81.57"},{postalCode:"44111",county:"Cuyahoga",lat:"41.46",lng:"-81.78"},{postalCode:"44112",county:"Cuyahoga",lat:"41.53",lng:"-81.57"},{postalCode:"44113",county:"Cuyahoga",lat:"41.49",lng:"-81.7"},{postalCode:"44114",county:"Cuyahoga",lat:"41.51",lng:"-81.67"},{postalCode:"44115",county:"Cuyahoga",lat:"41.49",lng:"-81.67"},{postalCode:"44116",county:"Cuyahoga",lat:"41.47",lng:"-81.85"},{postalCode:"44117",county:"Cuyahoga",lat:"41.57",lng:"-81.53"},{postalCode:"44118",county:"Cuyahoga",
lat:"41.5",lng:"-81.56"},{postalCode:"44119",county:"Cuyahoga",lat:"41.59",lng:"-81.55"},{postalCode:"44120",county:"Cuyahoga",lat:"41.47",lng:"-81.58"},{postalCode:"44121",county:"Cuyahoga",lat:"41.53",lng:"-81.53"},{postalCode:"44122",county:"Cuyahoga",lat:"41.47",lng:"-81.52"},{postalCode:"44123",county:"Cuyahoga",lat:"41.6",lng:"-81.52"},{postalCode:"44124",county:"Cuyahoga",lat:"41.51",lng:"-81.47"},{postalCode:"44125",county:"Cuyahoga",lat:"41.41",lng:"-81.61"},{postalCode:"44126",county:"Cuyahoga",
lat:"41.44",lng:"-81.86"},{postalCode:"44127",county:"Cuyahoga",lat:"41.47",lng:"-81.65"},{postalCode:"44128",county:"Cuyahoga",lat:"41.44",lng:"-81.55"},{postalCode:"44129",county:"Cuyahoga",lat:"41.4",lng:"-81.74"},{postalCode:"44130",county:"Cuyahoga",lat:"41.38",lng:"-81.78"},{postalCode:"44131",county:"Cuyahoga",lat:"41.39",lng:"-81.66"},{postalCode:"44132",county:"Cuyahoga",lat:"41.61",lng:"-81.5"},{postalCode:"44133",county:"Cuyahoga",lat:"41.32",lng:"-81.75"},{postalCode:"44134",county:"Cuyahoga",
lat:"41.39",lng:"-81.7"},{postalCode:"44135",county:"Cuyahoga",lat:"41.43",lng:"-81.8"},{postalCode:"44136",county:"Cuyahoga",lat:"41.31",lng:"-81.81"},{postalCode:"44137",county:"Cuyahoga",lat:"41.41",lng:"-81.56"},{postalCode:"44138",county:"Cuyahoga",lat:"41.37",lng:"-81.91"},{postalCode:"44139",county:"Cuyahoga",lat:"41.38",lng:"-81.44"},{postalCode:"44140",county:"Cuyahoga",lat:"41.48",lng:"-81.93"},{postalCode:"44141",county:"Cuyahoga",lat:"41.3",lng:"-81.62"},{postalCode:"44142",county:"Cuyahoga",
lat:"41.4",lng:"-81.82"},{postalCode:"44143",county:"Cuyahoga",lat:"41.55",lng:"-81.48"},{postalCode:"44144",county:"Cuyahoga",lat:"41.44",lng:"-81.73"},{postalCode:"44145",county:"Cuyahoga",lat:"41.46",lng:"-81.93"},{postalCode:"44146",county:"Cuyahoga",lat:"41.39",lng:"-81.53"},{postalCode:"44147",county:"Cuyahoga",lat:"41.32",lng:"-81.68"},{postalCode:"44149",county:"Cuyahoga",lat:"41.32",lng:"-81.85"},{postalCode:"44181",county:"Cuyahoga",lat:"41.46",lng:"-81.79"},{postalCode:"44188",county:"Cuyahoga",
lat:"41.49",lng:"-81.67"},{postalCode:"44190",county:"Cuyahoga",lat:"41.5",lng:"-81.62"},{postalCode:"44191",county:"Cuyahoga",lat:"41.48",lng:"-81.7"},{postalCode:"44192",county:"Cuyahoga",lat:"41.5",lng:"-81.69"},{postalCode:"44193",county:"Cuyahoga",lat:"41.5",lng:"-81.7"},{postalCode:"44194",county:"Cuyahoga",lat:"41.52",lng:"-81.67"},{postalCode:"44195",county:"Cuyahoga",lat:"41.5",lng:"-81.62"},{postalCode:"44197",county:"Cuyahoga",lat:"41.48",lng:"-81.68"},{postalCode:"44198",county:"Cuyahoga",
lat:"41.49",lng:"-81.67"},{postalCode:"44199",county:"Cuyahoga",lat:"41.5",lng:"-81.69"},{postalCode:"44201",county:"Portage",lat:"41.02",lng:"-81.2"},{postalCode:"44202",county:"Portage",lat:"41.32",lng:"-81.35"},{postalCode:"44203",county:"Summit",lat:"41.02",lng:"-81.62"},{postalCode:"44210",county:"Summit",lat:"41.19",lng:"-81.63"},{postalCode:"44211",county:"Portage",lat:"41.17",lng:"-81.31"},{postalCode:"44212",county:"Medina",lat:"41.24",lng:"-81.83"},{postalCode:"44214",county:"Wayne",lat:"40.95",
lng:"-82"},{postalCode:"44215",county:"Medina",lat:"41.07",lng:"-81.9"},{postalCode:"44216",county:"Summit",lat:"40.94",lng:"-81.59"},{postalCode:"44217",county:"Wayne",lat:"40.97",lng:"-81.91"},{postalCode:"44221",county:"Summit",lat:"41.14",lng:"-81.48"},{postalCode:"44222",county:"Summit",lat:"41.14",lng:"-81.48"},{postalCode:"44223",county:"Summit",lat:"41.15",lng:"-81.51"},{postalCode:"44224",county:"Summit",lat:"41.17",lng:"-81.44"},{postalCode:"44230",county:"Wayne",lat:"40.97",lng:"-81.69"},
{postalCode:"44231",county:"Portage",lat:"41.3",lng:"-81.08"},{postalCode:"44232",county:"Summit",lat:"40.94",lng:"-81.47"},{postalCode:"44233",county:"Medina",lat:"41.25",lng:"-81.74"},{postalCode:"44234",county:"Portage",lat:"41.33",lng:"-81.15"},{postalCode:"44235",county:"Medina",lat:"41.03",lng:"-82.12"},{postalCode:"44236",county:"Summit",lat:"41.25",lng:"-81.45"},{postalCode:"44237",county:"Summit",lat:"41.25",lng:"-81.48"},{postalCode:"44240",county:"Portage",lat:"41.15",lng:"-81.35"},{postalCode:"44241",
county:"Portage",lat:"41.24",lng:"-81.35"},{postalCode:"44242",county:"Portage",lat:"41.15",lng:"-81.36"},{postalCode:"44243",county:"Portage",lat:"41.15",lng:"-81.34"},{postalCode:"44250",county:"Summit",lat:"41.02",lng:"-81.43"},{postalCode:"44251",county:"Medina",lat:"41.03",lng:"-81.93"},{postalCode:"44253",county:"Medina",lat:"41.16",lng:"-82.03"},{postalCode:"44254",county:"Medina",lat:"41.04",lng:"-82.01"},{postalCode:"44255",county:"Portage",lat:"41.28",lng:"-81.24"},{postalCode:"44256",county:"Medina",
lat:"41.14",lng:"-81.86"},{postalCode:"44258",county:"Medina",lat:"41.14",lng:"-81.86"},{postalCode:"44260",county:"Portage",lat:"41.03",lng:"-81.35"},{postalCode:"44262",county:"Summit",lat:"41.14",lng:"-81.44"},{postalCode:"44264",county:"Summit",lat:"41.23",lng:"-81.55"},{postalCode:"44265",county:"Portage",lat:"41.03",lng:"-81.25"},{postalCode:"44266",county:"Portage",lat:"41.16",lng:"-81.23"},{postalCode:"44270",county:"Wayne",lat:"40.97",lng:"-81.78"},{postalCode:"44272",county:"Portage",lat:"41.09",
lng:"-81.2"},{postalCode:"44273",county:"Medina",lat:"41.03",lng:"-81.88"},{postalCode:"44274",county:"Medina",lat:"41.1",lng:"-81.74"},{postalCode:"44275",county:"Medina",lat:"41.1",lng:"-82.1"},{postalCode:"44276",county:"Wayne",lat:"40.95",lng:"-81.83"},{postalCode:"44278",county:"Summit",lat:"41.09",lng:"-81.42"},{postalCode:"44280",county:"Medina",lat:"41.23",lng:"-81.92"},{postalCode:"44281",county:"Medina",lat:"41.04",lng:"-81.73"},{postalCode:"44282",county:"Medina",lat:"41.03",lng:"-81.73"},
{postalCode:"44285",county:"Portage",lat:"41.16",lng:"-81.07"},{postalCode:"44286",county:"Summit",lat:"41.23",lng:"-81.63"},{postalCode:"44287",county:"Wayne",lat:"40.95",lng:"-82.12"},{postalCode:"44288",county:"Portage",lat:"41.24",lng:"-81.08"},{postalCode:"44301",county:"Summit",lat:"41.04",lng:"-81.52"},{postalCode:"44302",county:"Summit",lat:"41.09",lng:"-81.54"},{postalCode:"44303",county:"Summit",lat:"41.1",lng:"-81.54"},{postalCode:"44304",county:"Summit",lat:"41.08",lng:"-81.51"},{postalCode:"44305",
county:"Summit",lat:"41.08",lng:"-81.46"},{postalCode:"44306",county:"Summit",lat:"41.05",lng:"-81.49"},{postalCode:"44307",county:"Summit",lat:"41.07",lng:"-81.54"},{postalCode:"44308",county:"Summit",lat:"41.08",lng:"-81.52"},{postalCode:"44309",county:"Summit",lat:"41.1",lng:"-81.51"},{postalCode:"44310",county:"Summit",lat:"41.11",lng:"-81.5"},{postalCode:"44311",county:"Summit",lat:"41.06",lng:"-81.52"},{postalCode:"44312",county:"Summit",lat:"41.03",lng:"-81.44"},{postalCode:"44313",county:"Summit",
lat:"41.12",lng:"-81.57"},{postalCode:"44314",county:"Summit",lat:"41.04",lng:"-81.56"},{postalCode:"44315",county:"Summit",lat:"41.04",lng:"-81.48"},{postalCode:"44316",county:"Summit",lat:"41.08",lng:"-81.47"},{postalCode:"44317",county:"Summit",lat:"41.04",lng:"-81.52"},{postalCode:"44319",county:"Summit",lat:"40.99",lng:"-81.53"},{postalCode:"44320",county:"Summit",lat:"41.08",lng:"-81.57"},{postalCode:"44321",county:"Summit",lat:"41.11",lng:"-81.65"},{postalCode:"44325",county:"Summit",lat:"41.08",
lng:"-81.51"},{postalCode:"44326",county:"Summit",lat:"41.08",lng:"-81.52"},{postalCode:"44328",county:"Summit",lat:"41.09",lng:"-81.51"},{postalCode:"44333",county:"Summit",lat:"41.15",lng:"-81.62"},{postalCode:"44334",county:"Summit",lat:"41.08",lng:"-81.52"},{postalCode:"44372",county:"Summit",lat:"41.15",lng:"-81.61"},{postalCode:"44396",county:"Summit",lat:"41.07",lng:"-81.52"},{postalCode:"44398",county:"Summit",lat:"41.08",lng:"-81.51"},{postalCode:"44401",county:"Mahoning",lat:"41.03",lng:"-80.95"},
{postalCode:"44402",county:"Trumbull",lat:"41.38",lng:"-80.86"},{postalCode:"44403",county:"Trumbull",lat:"41.24",lng:"-80.58"},{postalCode:"44404",county:"Trumbull",lat:"41.32",lng:"-80.53"},{postalCode:"44405",county:"Mahoning",lat:"41.08",lng:"-80.59"},{postalCode:"44406",county:"Mahoning",lat:"41.02",lng:"-80.76"},{postalCode:"44408",county:"Columbiana",lat:"40.89",lng:"-80.69"},{postalCode:"44410",county:"Trumbull",lat:"41.33",lng:"-80.73"},{postalCode:"44411",county:"Portage",lat:"41.03",lng:"-81.05"},
{postalCode:"44412",county:"Portage",lat:"41.1",lng:"-81.02"},{postalCode:"44413",county:"Columbiana",lat:"40.84",lng:"-80.55"},{postalCode:"44415",county:"Columbiana",lat:"40.77",lng:"-80.69"},{postalCode:"44416",county:"Mahoning",lat:"41.03",lng:"-80.86"},{postalCode:"44417",county:"Trumbull",lat:"41.43",lng:"-80.66"},{postalCode:"44418",county:"Trumbull",lat:"41.3",lng:"-80.61"},{postalCode:"44420",county:"Trumbull",lat:"41.16",lng:"-80.69"},{postalCode:"44422",county:"Mahoning",lat:"40.94",lng:"-80.79"},
{postalCode:"44423",county:"Columbiana",lat:"40.75",lng:"-80.9"},{postalCode:"44424",county:"Trumbull",lat:"41.31",lng:"-80.57"},{postalCode:"44425",county:"Trumbull",lat:"41.16",lng:"-80.58"},{postalCode:"44427",county:"Columbiana",lat:"40.72",lng:"-80.95"},{postalCode:"44428",county:"Trumbull",lat:"41.44",lng:"-80.59"},{postalCode:"44429",county:"Mahoning",lat:"41.1",lng:"-80.99"},{postalCode:"44430",county:"Trumbull",lat:"41.24",lng:"-80.89"},{postalCode:"44431",county:"Columbiana",lat:"40.87",
lng:"-80.75"},{postalCode:"44432",county:"Columbiana",lat:"40.76",lng:"-80.76"},{postalCode:"44436",county:"Mahoning",lat:"41.04",lng:"-80.55"},{postalCode:"44437",county:"Trumbull",lat:"41.16",lng:"-80.73"},{postalCode:"44438",county:"Trumbull",lat:"41.22",lng:"-80.53"},{postalCode:"44439",county:"Trumbull",lat:"41.46",lng:"-80.95"},{postalCode:"44440",county:"Trumbull",lat:"41.14",lng:"-80.77"},{postalCode:"44441",county:"Columbiana",lat:"40.77",lng:"-80.55"},{postalCode:"44442",county:"Mahoning",
lat:"40.97",lng:"-80.56"},{postalCode:"44443",county:"Mahoning",lat:"40.92",lng:"-80.59"},{postalCode:"44444",county:"Trumbull",lat:"41.19",lng:"-80.97"},{postalCode:"44445",county:"Columbiana",lat:"40.85",lng:"-80.62"},{postalCode:"44446",county:"Trumbull",lat:"41.19",lng:"-80.75"},{postalCode:"44449",county:"Mahoning",lat:"40.99",lng:"-81.04"},{postalCode:"44450",county:"Trumbull",lat:"41.45",lng:"-80.82"},{postalCode:"44451",county:"Mahoning",lat:"41.09",lng:"-80.85"},{postalCode:"44452",county:"Mahoning",
lat:"40.96",lng:"-80.66"},{postalCode:"44453",county:"Trumbull",lat:"41.34",lng:"-80.52"},{postalCode:"44454",county:"Mahoning",lat:"40.92",lng:"-80.53"},{postalCode:"44455",county:"Columbiana",lat:"40.79",lng:"-80.61"},{postalCode:"44460",county:"Columbiana",lat:"40.9",lng:"-80.86"},{postalCode:"44470",county:"Trumbull",lat:"41.3",lng:"-80.96"},{postalCode:"44471",county:"Mahoning",lat:"41.05",lng:"-80.59"},{postalCode:"44473",county:"Trumbull",lat:"41.23",lng:"-80.67"},{postalCode:"44481",county:"Trumbull",
lat:"41.2",lng:"-80.86"},{postalCode:"44482",county:"Trumbull",lat:"41.19",lng:"-80.83"},{postalCode:"44483",county:"Trumbull",lat:"41.25",lng:"-80.81"},{postalCode:"44484",county:"Trumbull",lat:"41.23",lng:"-80.76"},{postalCode:"44485",county:"Trumbull",lat:"41.24",lng:"-80.84"},{postalCode:"44486",county:"Trumbull",lat:"41.3",lng:"-80.84"},{postalCode:"44488",county:"Trumbull",lat:"41.24",lng:"-80.82"},{postalCode:"44490",county:"Columbiana",lat:"40.9",lng:"-80.76"},{postalCode:"44491",county:"Trumbull",
lat:"41.37",lng:"-80.96"},{postalCode:"44492",county:"Columbiana",lat:"40.71",lng:"-80.71"},{postalCode:"44493",county:"Columbiana",lat:"40.83",lng:"-80.89"},{postalCode:"44501",county:"Mahoning",lat:"41.1",lng:"-80.66"},{postalCode:"44502",county:"Mahoning",lat:"41.09",lng:"-80.65"},{postalCode:"44503",county:"Mahoning",lat:"41.1",lng:"-80.65"},{postalCode:"44504",county:"Mahoning",lat:"41.12",lng:"-80.65"},{postalCode:"44505",county:"Mahoning",lat:"41.12",lng:"-80.62"},{postalCode:"44506",county:"Mahoning",
lat:"41.1",lng:"-80.63"},{postalCode:"44507",county:"Mahoning",lat:"41.07",lng:"-80.66"},{postalCode:"44509",county:"Mahoning",lat:"41.11",lng:"-80.69"},{postalCode:"44510",county:"Mahoning",lat:"41.12",lng:"-80.67"},{postalCode:"44511",county:"Mahoning",lat:"41.07",lng:"-80.69"},{postalCode:"44512",county:"Mahoning",lat:"41.03",lng:"-80.66"},{postalCode:"44513",county:"Mahoning",lat:"41.02",lng:"-80.68"},{postalCode:"44514",county:"Mahoning",lat:"41.02",lng:"-80.62"},{postalCode:"44515",county:"Mahoning",
lat:"41.1",lng:"-80.75"},{postalCode:"44555",county:"Mahoning",lat:"41.1",lng:"-80.64"},{postalCode:"44601",county:"Stark",lat:"40.92",lng:"-81.12"},{postalCode:"44606",county:"Wayne",lat:"40.74",lng:"-81.8"},{postalCode:"44607",county:"Carroll",lat:"40.7",lng:"-81.03"},{postalCode:"44608",county:"Stark",lat:"40.65",lng:"-81.58"},{postalCode:"44609",county:"Mahoning",lat:"40.91",lng:"-80.99"},{postalCode:"44610",county:"Holmes",lat:"40.56",lng:"-81.8"},{postalCode:"44611",county:"Holmes",lat:"40.62",
lng:"-82.09"},{postalCode:"44612",county:"Tuscarawas",lat:"40.64",lng:"-81.45"},{postalCode:"44613",county:"Stark",lat:"40.71",lng:"-81.6"},{postalCode:"44614",county:"Stark",lat:"40.89",lng:"-81.59"},{postalCode:"44615",county:"Carroll",lat:"40.57",lng:"-81.08"},{postalCode:"44617",county:"Holmes",lat:"40.51",lng:"-81.78"},{postalCode:"44618",county:"Wayne",lat:"40.78",lng:"-81.7"},{postalCode:"44619",county:"Mahoning",lat:"40.9",lng:"-80.96"},{postalCode:"44620",county:"Carroll",lat:"40.57",lng:"-81.21"},
{postalCode:"44621",county:"Tuscarawas",lat:"40.41",lng:"-81.32"},{postalCode:"44622",county:"Tuscarawas",lat:"40.53",lng:"-81.48"},{postalCode:"44624",county:"Holmes",lat:"40.61",lng:"-81.66"},{postalCode:"44625",county:"Columbiana",lat:"40.76",lng:"-81.01"},{postalCode:"44626",county:"Stark",lat:"40.69",lng:"-81.38"},{postalCode:"44627",county:"Wayne",lat:"40.67",lng:"-81.84"},{postalCode:"44628",county:"Holmes",lat:"40.53",lng:"-82.16"},{postalCode:"44629",county:"Tuscarawas",lat:"40.36",lng:"-81.44"},
{postalCode:"44630",county:"Stark",lat:"40.93",lng:"-81.4"},{postalCode:"44632",county:"Stark",lat:"40.97",lng:"-81.33"},{postalCode:"44633",county:"Holmes",lat:"40.63",lng:"-81.93"},{postalCode:"44634",county:"Columbiana",lat:"40.84",lng:"-81.06"},{postalCode:"44636",county:"Wayne",lat:"40.74",lng:"-81.74"},{postalCode:"44637",county:"Holmes",lat:"40.49",lng:"-82.01"},{postalCode:"44638",county:"Holmes",lat:"40.66",lng:"-82.13"},{postalCode:"44639",county:"Carroll",lat:"40.45",lng:"-81.22"},{postalCode:"44640",
county:"Stark",lat:"40.98",lng:"-81.15"},{postalCode:"44641",county:"Stark",lat:"40.85",lng:"-81.26"},{postalCode:"44643",county:"Stark",lat:"40.65",lng:"-81.31"},{postalCode:"44644",county:"Carroll",lat:"40.69",lng:"-81.18"},{postalCode:"44645",county:"Wayne",lat:"40.92",lng:"-81.71"},{postalCode:"44646",county:"Stark",lat:"40.81",lng:"-81.5"},{postalCode:"44647",county:"Stark",lat:"40.8",lng:"-81.55"},{postalCode:"44648",county:"Stark",lat:"40.75",lng:"-81.52"},{postalCode:"44650",county:"Stark",
lat:"40.88",lng:"-81.17"},{postalCode:"44651",county:"Carroll",lat:"40.63",lng:"-80.96"},{postalCode:"44652",county:"Stark",lat:"40.9",lng:"-81.33"},{postalCode:"44653",county:"Tuscarawas",lat:"40.44",lng:"-81.37"},{postalCode:"44654",county:"Holmes",lat:"40.54",lng:"-81.87"},{postalCode:"44656",county:"Tuscarawas",lat:"40.57",lng:"-81.33"},{postalCode:"44657",county:"Stark",lat:"40.74",lng:"-81.09"},{postalCode:"44659",county:"Wayne",lat:"40.69",lng:"-81.7"},{postalCode:"44660",county:"Holmes",lat:"40.62",
lng:"-81.79"},{postalCode:"44661",county:"Holmes",lat:"40.6",lng:"-82.11"},{postalCode:"44662",county:"Stark",lat:"40.72",lng:"-81.53"},{postalCode:"44663",county:"Tuscarawas",lat:"40.48",lng:"-81.44"},{postalCode:"44665",county:"Columbiana",lat:"40.84",lng:"-80.99"},{postalCode:"44666",county:"Stark",lat:"40.84",lng:"-81.63"},{postalCode:"44667",county:"Wayne",lat:"40.83",lng:"-81.77"},{postalCode:"44669",county:"Stark",lat:"40.8",lng:"-81.16"},{postalCode:"44670",county:"Stark",lat:"40.76",lng:"-81.19"},
{postalCode:"44671",county:"Tuscarawas",lat:"40.64",lng:"-81.37"},{postalCode:"44672",county:"Mahoning",lat:"40.92",lng:"-81.02"},{postalCode:"44675",county:"Carroll",lat:"40.5",lng:"-81.25"},{postalCode:"44676",county:"Wayne",lat:"40.68",lng:"-82.03"},{postalCode:"44677",county:"Wayne",lat:"40.87",lng:"-81.86"},{postalCode:"44678",county:"Tuscarawas",lat:"40.57",lng:"-81.36"},{postalCode:"44679",county:"Tuscarawas",lat:"40.32",lng:"-81.31"},{postalCode:"44680",county:"Tuscarawas",lat:"40.6",lng:"-81.53"},
{postalCode:"44681",county:"Tuscarawas",lat:"40.51",lng:"-81.66"},{postalCode:"44682",county:"Tuscarawas",lat:"40.4",lng:"-81.41"},{postalCode:"44683",county:"Tuscarawas",lat:"40.38",lng:"-81.34"},{postalCode:"44685",county:"Summit",lat:"40.96",lng:"-81.43"},{postalCode:"44687",county:"Holmes",lat:"40.54",lng:"-81.72"},{postalCode:"44688",county:"Stark",lat:"40.68",lng:"-81.26"},{postalCode:"44689",county:"Stark",lat:"40.66",lng:"-81.65"},{postalCode:"44690",county:"Holmes",lat:"40.62",lng:"-81.7"},
{postalCode:"44691",county:"Wayne",lat:"40.8",lng:"-81.96"},{postalCode:"44693",county:"Harrison",lat:"40.31",lng:"-81.19"},{postalCode:"44695",county:"Carroll",lat:"40.44",lng:"-81.18"},{postalCode:"44697",county:"Tuscarawas",lat:"40.61",lng:"-81.42"},{postalCode:"44699",county:"Harrison",lat:"40.28",lng:"-81.28"},{postalCode:"44701",county:"Stark",lat:"40.73",lng:"-81.45"},{postalCode:"44702",county:"Stark",lat:"40.8",lng:"-81.37"},{postalCode:"44703",county:"Stark",lat:"40.81",lng:"-81.38"},{postalCode:"44704",
county:"Stark",lat:"40.8",lng:"-81.36"},{postalCode:"44705",county:"Stark",lat:"40.82",lng:"-81.34"},{postalCode:"44706",county:"Stark",lat:"40.77",lng:"-81.41"},{postalCode:"44707",county:"Stark",lat:"40.78",lng:"-81.37"},{postalCode:"44708",county:"Stark",lat:"40.81",lng:"-81.42"},{postalCode:"44709",county:"Stark",lat:"40.84",lng:"-81.39"},{postalCode:"44710",county:"Stark",lat:"40.79",lng:"-81.42"},{postalCode:"44711",county:"Stark",lat:"40.83",lng:"-81.39"},{postalCode:"44714",county:"Stark",
lat:"40.83",lng:"-81.36"},{postalCode:"44718",county:"Stark",lat:"40.85",lng:"-81.44"},{postalCode:"44720",county:"Stark",lat:"40.89",lng:"-81.42"},{postalCode:"44721",county:"Stark",lat:"40.89",lng:"-81.33"},{postalCode:"44730",county:"Stark",lat:"40.78",lng:"-81.27"},{postalCode:"44735",county:"Stark",lat:"40.85",lng:"-81.44"},{postalCode:"44750",county:"Stark",lat:"40.79",lng:"-81.42"},{postalCode:"44767",county:"Stark",lat:"40.89",lng:"-81.42"},{postalCode:"44799",county:"Stark",lat:"40.81",lng:"-81.37"},
{postalCode:"44802",county:"Seneca",lat:"41.05",lng:"-83.41"},{postalCode:"44804",county:"Hancock",lat:"41.12",lng:"-83.53"},{postalCode:"44805",county:"Ashland",lat:"40.87",lng:"-82.32"},{postalCode:"44807",county:"Seneca",lat:"41.06",lng:"-82.88"},{postalCode:"44809",county:"Seneca",lat:"41.13",lng:"-83.28"},{postalCode:"44811",county:"Sandusky",lat:"41.26",lng:"-82.83"},{postalCode:"44813",county:"Richland",lat:"40.61",lng:"-82.53"},{postalCode:"44814",county:"Erie",lat:"41.32",lng:"-82.47"},{postalCode:"44815",
county:"Seneca",lat:"41.24",lng:"-83.23"},{postalCode:"44816",county:"Erie",lat:"41.33",lng:"-82.35"},{postalCode:"44817",county:"Wood",lat:"41.18",lng:"-83.54"},{postalCode:"44818",county:"Seneca",lat:"41",lng:"-82.99"},{postalCode:"44820",county:"Crawford",lat:"40.82",lng:"-82.97"},{postalCode:"44822",county:"Richland",lat:"40.56",lng:"-82.41"},{postalCode:"44824",county:"Erie",lat:"41.39",lng:"-82.8"},{postalCode:"44825",county:"Crawford",lat:"40.95",lng:"-82.94"},{postalCode:"44826",county:"Huron",
lat:"41.24",lng:"-82.49"},{postalCode:"44827",county:"Crawford",lat:"40.8",lng:"-82.74"},{postalCode:"44828",county:"Seneca",lat:"41.23",lng:"-82.86"},{postalCode:"44830",county:"Seneca",lat:"41.16",lng:"-83.41"},{postalCode:"44833",county:"Crawford",lat:"40.73",lng:"-82.79"},{postalCode:"44836",county:"Seneca",lat:"41.25",lng:"-83.06"},{postalCode:"44837",county:"Huron",lat:"41.02",lng:"-82.48"},{postalCode:"44838",county:"Ashland",lat:"40.77",lng:"-82.26"},{postalCode:"44839",county:"Erie",lat:"41.39",
lng:"-82.55"},{postalCode:"44840",county:"Ashland",lat:"40.79",lng:"-82.19"},{postalCode:"44841",county:"Seneca",lat:"41.25",lng:"-83.29"},{postalCode:"44842",county:"Ashland",lat:"40.64",lng:"-82.23"},{postalCode:"44843",county:"Richland",lat:"40.7",lng:"-82.41"},{postalCode:"44844",county:"Wyandot",lat:"40.99",lng:"-83.26"},{postalCode:"44845",county:"Seneca",lat:"41.03",lng:"-83.13"},{postalCode:"44846",county:"Erie",lat:"41.31",lng:"-82.61"},{postalCode:"44847",county:"Huron",lat:"41.24",lng:"-82.7"},
{postalCode:"44848",county:"Ashland",lat:"40.92",lng:"-82.28"},{postalCode:"44849",county:"Wyandot",lat:"40.82",lng:"-83.13"},{postalCode:"44850",county:"Huron",lat:"41.03",lng:"-82.68"},{postalCode:"44851",county:"Huron",lat:"41.09",lng:"-82.4"},{postalCode:"44853",county:"Seneca",lat:"41.06",lng:"-83.29"},{postalCode:"44854",county:"Crawford",lat:"40.95",lng:"-82.85"},{postalCode:"44855",county:"Huron",lat:"41.1",lng:"-82.6"},{postalCode:"44856",county:"Crawford",lat:"40.79",lng:"-82.86"},{postalCode:"44857",
county:"Huron",lat:"41.24",lng:"-82.6"},{postalCode:"44859",county:"Ashland",lat:"41.02",lng:"-82.33"},{postalCode:"44860",county:"Crawford",lat:"40.85",lng:"-83.09"},{postalCode:"44861",county:"Seneca",lat:"41.24",lng:"-83.15"},{postalCode:"44862",county:"Richland",lat:"40.76",lng:"-82.65"},{postalCode:"44864",county:"Ashland",lat:"40.66",lng:"-82.32"},{postalCode:"44865",county:"Huron",lat:"40.99",lng:"-82.67"},{postalCode:"44866",county:"Ashland",lat:"40.91",lng:"-82.18"},{postalCode:"44867",county:"Seneca",
lat:"41.14",lng:"-83"},{postalCode:"44870",county:"Erie",lat:"41.43",lng:"-82.72"},{postalCode:"44871",county:"Erie",lat:"41.45",lng:"-82.71"},{postalCode:"44874",county:"Ashland",lat:"40.97",lng:"-82.36"},{postalCode:"44875",county:"Richland",lat:"40.89",lng:"-82.65"},{postalCode:"44878",county:"Richland",lat:"40.94",lng:"-82.53"},{postalCode:"44880",county:"Ashland",lat:"41.03",lng:"-82.22"},{postalCode:"44881",county:"Crawford",lat:"40.87",lng:"-82.88"},{postalCode:"44882",county:"Wyandot",lat:"40.95",
lng:"-83.14"},{postalCode:"44883",county:"Seneca",lat:"41.12",lng:"-83.18"},{postalCode:"44887",county:"Crawford",lat:"40.92",lng:"-82.79"},{postalCode:"44888",county:"Huron",lat:"41.06",lng:"-82.73"},{postalCode:"44889",county:"Huron",lat:"41.24",lng:"-82.39"},{postalCode:"44890",county:"Huron",lat:"41.07",lng:"-82.72"},{postalCode:"44901",county:"Richland",lat:"40.79",lng:"-82.51"},{postalCode:"44902",county:"Richland",lat:"40.76",lng:"-82.51"},{postalCode:"44903",county:"Richland",lat:"40.77",
lng:"-82.52"},{postalCode:"44904",county:"Richland",lat:"40.68",lng:"-82.58"},{postalCode:"44905",county:"Richland",lat:"40.78",lng:"-82.48"},{postalCode:"44906",county:"Richland",lat:"40.77",lng:"-82.57"},{postalCode:"44907",county:"Richland",lat:"40.73",lng:"-82.52"},{postalCode:"45001",county:"Hamilton",lat:"39.14",lng:"-84.71"},{postalCode:"45002",county:"Hamilton",lat:"39.19",lng:"-84.74"},{postalCode:"45003",county:"Preble",lat:"39.58",lng:"-84.78"},{postalCode:"45004",county:"Butler",lat:"39.51",
lng:"-84.61"},{postalCode:"45005",county:"Warren",lat:"39.55",lng:"-84.31"},{postalCode:"45011",county:"Butler",lat:"39.4",lng:"-84.52"},{postalCode:"45012",county:"Butler",lat:"39.47",lng:"-84.68"},{postalCode:"45013",county:"Butler",lat:"39.41",lng:"-84.6"},{postalCode:"45014",county:"Butler",lat:"39.33",lng:"-84.55"},{postalCode:"45015",county:"Butler",lat:"39.37",lng:"-84.55"},{postalCode:"45018",county:"Butler",lat:"39.43",lng:"-84.5"},{postalCode:"45030",county:"Hamilton",lat:"39.26",lng:"-84.77"},
{postalCode:"45032",county:"Warren",lat:"39.5",lng:"-84.01"},{postalCode:"45033",county:"Hamilton",lat:"39.18",lng:"-84.76"},{postalCode:"45034",county:"Warren",lat:"39.36",lng:"-84.25"},{postalCode:"45036",county:"Warren",lat:"39.43",lng:"-84.22"},{postalCode:"45039",county:"Warren",lat:"39.32",lng:"-84.24"},{postalCode:"45040",county:"Warren",lat:"39.35",lng:"-84.31"},{postalCode:"45041",county:"Hamilton",lat:"39.21",lng:"-84.7"},{postalCode:"45042",county:"Butler",lat:"39.53",lng:"-84.39"},{postalCode:"45044",
county:"Butler",lat:"39.48",lng:"-84.38"},{postalCode:"45050",county:"Butler",lat:"39.44",lng:"-84.36"},{postalCode:"45051",county:"Hamilton",lat:"39.1",lng:"-84.65"},{postalCode:"45052",county:"Hamilton",lat:"39.15",lng:"-84.78"},{postalCode:"45053",county:"Butler",lat:"39.35",lng:"-84.79"},{postalCode:"45054",county:"Warren",lat:"39.44",lng:"-84.09"},{postalCode:"45055",county:"Butler",lat:"39.45",lng:"-84.52"},{postalCode:"45056",county:"Butler",lat:"39.5",lng:"-84.74"},{postalCode:"45061",county:"Butler",
lat:"39.31",lng:"-84.65"},{postalCode:"45062",county:"Butler",lat:"39.48",lng:"-84.55"},{postalCode:"45063",county:"Butler",lat:"39.33",lng:"-84.72"},{postalCode:"45064",county:"Butler",lat:"39.57",lng:"-84.59"},{postalCode:"45065",county:"Warren",lat:"39.37",lng:"-84.21"},{postalCode:"45066",county:"Warren",lat:"39.56",lng:"-84.22"},{postalCode:"45067",county:"Butler",lat:"39.48",lng:"-84.47"},{postalCode:"45068",county:"Warren",lat:"39.53",lng:"-84.06"},{postalCode:"45069",county:"Butler",lat:"39.35",
lng:"-84.41"},{postalCode:"45070",county:"Preble",lat:"39.59",lng:"-84.55"},{postalCode:"45071",county:"Butler",lat:"39.33",lng:"-84.4"},{postalCode:"45101",county:"Brown",lat:"38.67",lng:"-83.76"},{postalCode:"45102",county:"Clermont",lat:"39.02",lng:"-84.21"},{postalCode:"45103",county:"Clermont",lat:"39.09",lng:"-84.16"},{postalCode:"45105",county:"Adams",lat:"38.75",lng:"-83.61"},{postalCode:"45106",county:"Clermont",lat:"38.95",lng:"-84.08"},{postalCode:"45107",county:"Clinton",lat:"39.3",lng:"-83.97"},
{postalCode:"45111",county:"Hamilton",lat:"39.2",lng:"-84.29"},{postalCode:"45112",county:"Clermont",lat:"38.79",lng:"-84.14"},{postalCode:"45113",county:"Clinton",lat:"39.4",lng:"-83.99"},{postalCode:"45114",county:"Clinton",lat:"39.36",lng:"-83.86"},{postalCode:"45115",county:"Brown",lat:"38.81",lng:"-83.7"},{postalCode:"45118",county:"Brown",lat:"39.18",lng:"-83.95"},{postalCode:"45119",county:"Brown",lat:"38.88",lng:"-84"},{postalCode:"45120",county:"Clermont",lat:"38.83",lng:"-84.09"},{postalCode:"45121",
county:"Brown",lat:"38.87",lng:"-83.9"},{postalCode:"45122",county:"Clermont",lat:"39.22",lng:"-84.12"},{postalCode:"45123",county:"Highland",lat:"39.35",lng:"-83.39"},{postalCode:"45130",county:"Brown",lat:"38.91",lng:"-83.99"},{postalCode:"45131",county:"Brown",lat:"38.79",lng:"-83.97"},{postalCode:"45132",county:"Highland",lat:"39.34",lng:"-83.6"},{postalCode:"45133",county:"Highland",lat:"39.16",lng:"-83.58"},{postalCode:"45135",county:"Highland",lat:"39.34",lng:"-83.55"},{postalCode:"45138",
county:"Clinton",lat:"39.42",lng:"-83.66"},{postalCode:"45140",county:"Clermont",lat:"39.26",lng:"-84.26"},{postalCode:"45142",county:"Highland",lat:"39.21",lng:"-83.81"},{postalCode:"45144",county:"Adams",lat:"38.69",lng:"-83.62"},{postalCode:"45146",county:"Clinton",lat:"39.32",lng:"-83.8"},{postalCode:"45147",county:"Clermont",lat:"39.21",lng:"-84.3"},{postalCode:"45148",county:"Clinton",lat:"39.29",lng:"-83.89"},{postalCode:"45150",county:"Clermont",lat:"39.17",lng:"-84.25"},{postalCode:"45152",
county:"Warren",lat:"39.35",lng:"-84.13"},{postalCode:"45153",county:"Clermont",lat:"38.87",lng:"-84.22"},{postalCode:"45154",county:"Brown",lat:"39.05",lng:"-83.92"},{postalCode:"45155",county:"Highland",lat:"39.04",lng:"-83.75"},{postalCode:"45156",county:"Clermont",lat:"38.81",lng:"-84.21"},{postalCode:"45157",county:"Clermont",lat:"38.96",lng:"-84.25"},{postalCode:"45158",county:"Clermont",lat:"39.18",lng:"-84.09"},{postalCode:"45159",county:"Clinton",lat:"39.32",lng:"-83.69"},{postalCode:"45160",
county:"Clermont",lat:"39.12",lng:"-84.14"},{postalCode:"45162",county:"Warren",lat:"39.27",lng:"-84.09"},{postalCode:"45164",county:"Clinton",lat:"39.55",lng:"-83.79"},{postalCode:"45166",county:"Clinton",lat:"39.48",lng:"-83.68"},{postalCode:"45167",county:"Brown",lat:"38.75",lng:"-83.81"},{postalCode:"45168",county:"Brown",lat:"38.86",lng:"-83.76"},{postalCode:"45169",county:"Clinton",lat:"39.51",lng:"-83.66"},{postalCode:"45171",county:"Brown",lat:"38.98",lng:"-83.78"},{postalCode:"45172",county:"Highland",
lat:"39.07",lng:"-83.39"},{postalCode:"45174",county:"Hamilton",lat:"39.16",lng:"-84.31"},{postalCode:"45176",county:"Clermont",lat:"39.07",lng:"-84.02"},{postalCode:"45177",county:"Clinton",lat:"39.46",lng:"-83.85"},{postalCode:"45201",county:"Hamilton",lat:"39.11",lng:"-84.5"},{postalCode:"45202",county:"Hamilton",lat:"39.11",lng:"-84.51"},{postalCode:"45203",county:"Hamilton",lat:"39.1",lng:"-84.53"},{postalCode:"45204",county:"Hamilton",lat:"39.1",lng:"-84.57"},{postalCode:"45205",county:"Hamilton",
lat:"39.11",lng:"-84.58"},{postalCode:"45206",county:"Hamilton",lat:"39.13",lng:"-84.49"},{postalCode:"45207",county:"Hamilton",lat:"39.14",lng:"-84.47"},{postalCode:"45208",county:"Hamilton",lat:"39.14",lng:"-84.43"},{postalCode:"45209",county:"Hamilton",lat:"39.15",lng:"-84.43"},{postalCode:"45211",county:"Hamilton",lat:"39.15",lng:"-84.6"},{postalCode:"45212",county:"Hamilton",lat:"39.16",lng:"-84.45"},{postalCode:"45213",county:"Hamilton",lat:"39.18",lng:"-84.42"},{postalCode:"45214",county:"Hamilton",
lat:"39.12",lng:"-84.54"},{postalCode:"45215",county:"Hamilton",lat:"39.23",lng:"-84.46"},{postalCode:"45216",county:"Hamilton",lat:"39.2",lng:"-84.48"},{postalCode:"45217",county:"Hamilton",lat:"39.17",lng:"-84.5"},{postalCode:"45218",county:"Hamilton",lat:"39.27",lng:"-84.52"},{postalCode:"45219",county:"Hamilton",lat:"39.13",lng:"-84.51"},{postalCode:"45220",county:"Hamilton",lat:"39.15",lng:"-84.52"},{postalCode:"45221",county:"Hamilton",lat:"39.13",lng:"-84.52"},{postalCode:"45222",county:"Hamilton",
lat:"39.19",lng:"-84.45"},{postalCode:"45223",county:"Hamilton",lat:"39.16",lng:"-84.54"},{postalCode:"45224",county:"Hamilton",lat:"39.21",lng:"-84.54"},{postalCode:"45225",county:"Hamilton",lat:"39.14",lng:"-84.55"},{postalCode:"45226",county:"Hamilton",lat:"39.12",lng:"-84.43"},{postalCode:"45227",county:"Hamilton",lat:"39.15",lng:"-84.39"},{postalCode:"45229",county:"Hamilton",lat:"39.15",lng:"-84.49"},{postalCode:"45230",county:"Hamilton",lat:"39.08",lng:"-84.39"},{postalCode:"45231",county:"Hamilton",
lat:"39.24",lng:"-84.55"},{postalCode:"45232",county:"Hamilton",lat:"39.18",lng:"-84.51"},{postalCode:"45233",county:"Hamilton",lat:"39.12",lng:"-84.68"},{postalCode:"45234",county:"Hamilton",lat:"39.11",lng:"-84.54"},{postalCode:"45235",county:"Hamilton",lat:"39.28",lng:"-84.4"},{postalCode:"45236",county:"Hamilton",lat:"39.21",lng:"-84.4"},{postalCode:"45237",county:"Hamilton",lat:"39.19",lng:"-84.46"},{postalCode:"45238",county:"Hamilton",lat:"39.11",lng:"-84.61"},{postalCode:"45239",county:"Hamilton",
lat:"39.21",lng:"-84.57"},{postalCode:"45240",county:"Hamilton",lat:"39.28",lng:"-84.53"},{postalCode:"45241",county:"Hamilton",lat:"39.28",lng:"-84.4"},{postalCode:"45242",county:"Hamilton",lat:"39.24",lng:"-84.36"},{postalCode:"45243",county:"Hamilton",lat:"39.19",lng:"-84.35"},{postalCode:"45244",county:"Hamilton",lat:"39.12",lng:"-84.33"},{postalCode:"45245",county:"Clermont",lat:"39.07",lng:"-84.27"},{postalCode:"45246",county:"Hamilton",lat:"39.29",lng:"-84.47"},{postalCode:"45247",county:"Hamilton",
lat:"39.21",lng:"-84.64"},{postalCode:"45248",county:"Hamilton",lat:"39.16",lng:"-84.65"},{postalCode:"45249",county:"Hamilton",lat:"39.28",lng:"-84.33"},{postalCode:"45250",county:"Hamilton",lat:"39.12",lng:"-84.55"},{postalCode:"45251",county:"Hamilton",lat:"39.26",lng:"-84.59"},{postalCode:"45252",county:"Hamilton",lat:"39.27",lng:"-84.63"},{postalCode:"45253",county:"Hamilton",lat:"39.27",lng:"-84.6"},{postalCode:"45254",county:"Hamilton",lat:"39.11",lng:"-84.5"},{postalCode:"45255",county:"Hamilton",
lat:"39.06",lng:"-84.33"},{postalCode:"45258",county:"Hamilton",lat:"39.14",lng:"-84.62"},{postalCode:"45262",county:"Hamilton",lat:"39.27",lng:"-84.41"},{postalCode:"45263",county:"Hamilton",lat:"39.11",lng:"-84.54"},{postalCode:"45264",county:"Hamilton",lat:"39.1",lng:"-84.54"},{postalCode:"45267",county:"Hamilton",lat:"39.13",lng:"-84.51"},{postalCode:"45268",county:"Hamilton",lat:"39.15",lng:"-84.52"},{postalCode:"45269",county:"Hamilton",lat:"39.1",lng:"-84.54"},{postalCode:"45270",county:"Hamilton",
lat:"39.1",lng:"-84.54"},{postalCode:"45271",county:"Hamilton",lat:"39.14",lng:"-84.54"},{postalCode:"45273",county:"Hamilton",lat:"39.1",lng:"-84.51"},{postalCode:"45274",county:"Hamilton",lat:"39.14",lng:"-84.54"},{postalCode:"45275",county:"Hamilton",lat:"39.05",lng:"-84.67"},{postalCode:"45277",county:"Hamilton",lat:"39.03",lng:"-84.52"},{postalCode:"45280",county:"Hamilton",lat:"39.16",lng:"-84.46"},{postalCode:"45296",county:"Hamilton",lat:"39.1",lng:"-84.54"},{postalCode:"45298",county:"Hamilton",
lat:"39.09",lng:"-84.51"},{postalCode:"45299",county:"Hamilton",lat:"39.1",lng:"-84.51"},{postalCode:"45301",county:"Greene",lat:"39.71",lng:"-84.02"},{postalCode:"45302",county:"Shelby",lat:"40.4",lng:"-84.19"},{postalCode:"45303",county:"Darke",lat:"40.21",lng:"-84.65"},{postalCode:"45304",county:"Darke",lat:"39.99",lng:"-84.54"},{postalCode:"45305",county:"Greene",lat:"39.64",lng:"-84.09"},{postalCode:"45306",county:"Shelby",lat:"40.46",lng:"-84.18"},{postalCode:"45307",county:"Greene",lat:"39.58",
lng:"-83.72"},{postalCode:"45308",county:"Darke",lat:"40.12",lng:"-84.45"},{postalCode:"45309",county:"Montgomery",lat:"39.84",lng:"-84.42"},{postalCode:"45310",county:"Mercer",lat:"40.35",lng:"-84.64"},{postalCode:"45311",county:"Preble",lat:"39.63",lng:"-84.66"},{postalCode:"45312",county:"Miami",lat:"40.06",lng:"-84.1"},{postalCode:"45314",county:"Greene",lat:"39.75",lng:"-83.79"},{postalCode:"45315",county:"Montgomery",lat:"39.85",lng:"-84.34"},{postalCode:"45316",county:"Greene",lat:"39.8",lng:"-83.83"},
{postalCode:"45317",county:"Champaign",lat:"40.17",lng:"-84.02"},{postalCode:"45318",county:"Miami",lat:"40.12",lng:"-84.36"},{postalCode:"45319",county:"Clark",lat:"39.92",lng:"-83.95"},{postalCode:"45320",county:"Preble",lat:"39.75",lng:"-84.65"},{postalCode:"45321",county:"Preble",lat:"39.89",lng:"-84.68"},{postalCode:"45322",county:"Montgomery",lat:"39.88",lng:"-84.31"},{postalCode:"45323",county:"Clark",lat:"39.87",lng:"-83.94"},{postalCode:"45324",county:"Greene",lat:"39.81",lng:"-84.02"},{postalCode:"45325",
county:"Montgomery",lat:"39.68",lng:"-84.42"},{postalCode:"45326",county:"Miami",lat:"40.14",lng:"-84.11"},{postalCode:"45327",county:"Montgomery",lat:"39.63",lng:"-84.39"},{postalCode:"45328",county:"Darke",lat:"40.11",lng:"-84.49"},{postalCode:"45330",county:"Preble",lat:"39.65",lng:"-84.53"},{postalCode:"45331",county:"Darke",lat:"40.1",lng:"-84.63"},{postalCode:"45332",county:"Darke",lat:"40",lng:"-84.79"},{postalCode:"45333",county:"Shelby",lat:"40.25",lng:"-84.33"},{postalCode:"45334",county:"Shelby",
lat:"40.44",lng:"-84.04"},{postalCode:"45335",county:"Greene",lat:"39.64",lng:"-83.74"},{postalCode:"45336",county:"Shelby",lat:"40.44",lng:"-84.26"},{postalCode:"45337",county:"Miami",lat:"39.99",lng:"-84.41"},{postalCode:"45338",county:"Preble",lat:"39.85",lng:"-84.54"},{postalCode:"45339",county:"Miami",lat:"40",lng:"-84.34"},{postalCode:"45340",county:"Shelby",lat:"40.38",lng:"-84.04"},{postalCode:"45341",county:"Clark",lat:"39.88",lng:"-84.03"},{postalCode:"45342",county:"Montgomery",lat:"39.63",
lng:"-84.27"},{postalCode:"45343",county:"Montgomery",lat:"39.64",lng:"-84.27"},{postalCode:"45344",county:"Clark",lat:"39.94",lng:"-84.02"},{postalCode:"45345",county:"Montgomery",lat:"39.74",lng:"-84.39"},{postalCode:"45346",county:"Darke",lat:"39.97",lng:"-84.71"},{postalCode:"45347",county:"Preble",lat:"39.87",lng:"-84.77"},{postalCode:"45348",county:"Darke",lat:"40.33",lng:"-84.65"},{postalCode:"45349",county:"Clark",lat:"39.99",lng:"-83.94"},{postalCode:"45350",county:"Darke",lat:"40.33",lng:"-84.57"},
{postalCode:"45351",county:"Darke",lat:"40.34",lng:"-84.49"},{postalCode:"45352",county:"Darke",lat:"40.05",lng:"-84.74"},{postalCode:"45353",county:"Shelby",lat:"40.29",lng:"-84.03"},{postalCode:"45354",county:"Montgomery",lat:"39.91",lng:"-84.4"},{postalCode:"45356",county:"Miami",lat:"40.16",lng:"-84.24"},{postalCode:"45358",county:"Darke",lat:"39.99",lng:"-84.49"},{postalCode:"45359",county:"Miami",lat:"40.05",lng:"-84.35"},{postalCode:"45360",county:"Shelby",lat:"40.33",lng:"-84.09"},{postalCode:"45361",
county:"Miami",lat:"39.96",lng:"-84.42"},{postalCode:"45362",county:"Darke",lat:"40.29",lng:"-84.64"},{postalCode:"45363",county:"Shelby",lat:"40.24",lng:"-84.4"},{postalCode:"45365",county:"Shelby",lat:"40.28",lng:"-84.16"},{postalCode:"45367",county:"Shelby",lat:"40.29",lng:"-84.16"},{postalCode:"45368",county:"Clark",lat:"39.86",lng:"-83.66"},{postalCode:"45369",county:"Clark",lat:"39.94",lng:"-83.6"},{postalCode:"45370",county:"Greene",lat:"39.61",lng:"-84.03"},{postalCode:"45371",county:"Miami",
lat:"39.95",lng:"-84.17"},{postalCode:"45372",county:"Clark",lat:"40.01",lng:"-83.84"},{postalCode:"45373",county:"Miami",lat:"40.04",lng:"-84.21"},{postalCode:"45374",county:"Miami",lat:"40.04",lng:"-84.22"},{postalCode:"45377",county:"Montgomery",lat:"39.89",lng:"-84.21"},{postalCode:"45378",county:"Preble",lat:"39.9",lng:"-84.49"},{postalCode:"45380",county:"Darke",lat:"40.23",lng:"-84.5"},{postalCode:"45381",county:"Preble",lat:"39.74",lng:"-84.53"},{postalCode:"45382",county:"Preble",lat:"39.9",
lng:"-84.62"},{postalCode:"45383",county:"Miami",lat:"39.96",lng:"-84.33"},{postalCode:"45384",county:"Greene",lat:"39.72",lng:"-83.88"},{postalCode:"45385",county:"Greene",lat:"39.68",lng:"-83.93"},{postalCode:"45387",county:"Greene",lat:"39.8",lng:"-83.88"},{postalCode:"45388",county:"Darke",lat:"40.33",lng:"-84.48"},{postalCode:"45389",county:"Champaign",lat:"40.06",lng:"-84.03"},{postalCode:"45390",county:"Darke",lat:"40.21",lng:"-84.78"},{postalCode:"45401",county:"Montgomery",lat:"39.77",lng:"-84.2"},
{postalCode:"45402",county:"Montgomery",lat:"39.76",lng:"-84.21"},{postalCode:"45403",county:"Montgomery",lat:"39.76",lng:"-84.15"},{postalCode:"45404",county:"Montgomery",lat:"39.78",lng:"-84.17"},{postalCode:"45405",county:"Montgomery",lat:"39.79",lng:"-84.21"},{postalCode:"45406",county:"Montgomery",lat:"39.78",lng:"-84.24"},{postalCode:"45409",county:"Montgomery",lat:"39.73",lng:"-84.19"},{postalCode:"45410",county:"Montgomery",lat:"39.75",lng:"-84.16"},{postalCode:"45412",county:"Montgomery",
lat:"39.76",lng:"-84.2"},{postalCode:"45413",county:"Montgomery",lat:"39.82",lng:"-84.19"},{postalCode:"45414",county:"Montgomery",lat:"39.82",lng:"-84.19"},{postalCode:"45415",county:"Montgomery",lat:"39.84",lng:"-84.26"},{postalCode:"45416",county:"Montgomery",lat:"39.8",lng:"-84.26"},{postalCode:"45417",county:"Montgomery",lat:"39.74",lng:"-84.25"},{postalCode:"45419",county:"Montgomery",lat:"39.71",lng:"-84.17"},{postalCode:"45420",county:"Montgomery",lat:"39.72",lng:"-84.14"},{postalCode:"45422",
county:"Montgomery",lat:"39.76",lng:"-84.19"},{postalCode:"45423",county:"Montgomery",lat:"39.76",lng:"-84.19"},{postalCode:"45424",county:"Montgomery",lat:"39.84",lng:"-84.12"},{postalCode:"45426",county:"Montgomery",lat:"39.81",lng:"-84.3"},{postalCode:"45428",county:"Montgomery",lat:"39.74",lng:"-84.26"},{postalCode:"45429",county:"Montgomery",lat:"39.69",lng:"-84.16"},{postalCode:"45430",county:"Greene",lat:"39.72",lng:"-84.08"},{postalCode:"45431",county:"Montgomery",lat:"39.77",lng:"-84.09"},
{postalCode:"45432",county:"Greene",lat:"39.74",lng:"-84.09"},{postalCode:"45433",county:"Greene",lat:"39.8",lng:"-84.06"},{postalCode:"45434",county:"Greene",lat:"39.72",lng:"-84.04"},{postalCode:"45435",county:"Greene",lat:"39.77",lng:"-84.08"},{postalCode:"45437",county:"Montgomery",lat:"39.77",lng:"-84.12"},{postalCode:"45439",county:"Montgomery",lat:"39.7",lng:"-84.22"},{postalCode:"45440",county:"Montgomery",lat:"39.67",lng:"-84.11"},{postalCode:"45441",county:"Montgomery",lat:"39.65",lng:"-84.17"},
{postalCode:"45448",county:"Montgomery",lat:"39.65",lng:"-84.17"},{postalCode:"45449",county:"Montgomery",lat:"39.66",lng:"-84.24"},{postalCode:"45458",county:"Montgomery",lat:"39.61",lng:"-84.17"},{postalCode:"45459",county:"Montgomery",lat:"39.65",lng:"-84.17"},{postalCode:"45469",county:"Montgomery",lat:"39.72",lng:"-84.19"},{postalCode:"45470",county:"Montgomery",lat:"39.63",lng:"-84.27"},{postalCode:"45475",county:"Montgomery",lat:"39.65",lng:"-84.17"},{postalCode:"45479",county:"Montgomery",
lat:"39.72",lng:"-84.19"},{postalCode:"45481",county:"Montgomery",lat:"39.76",lng:"-84.18"},{postalCode:"45482",county:"Montgomery",lat:"39.72",lng:"-84.1"},{postalCode:"45490",county:"Montgomery",lat:"39.9",lng:"-84.22"},{postalCode:"45501",county:"Clark",lat:"39.93",lng:"-83.86"},{postalCode:"45502",county:"Clark",lat:"39.92",lng:"-83.82"},{postalCode:"45503",county:"Clark",lat:"39.95",lng:"-83.78"},{postalCode:"45504",county:"Clark",lat:"39.94",lng:"-83.84"},{postalCode:"45505",county:"Clark",
lat:"39.91",lng:"-83.78"},{postalCode:"45506",county:"Clark",lat:"39.91",lng:"-83.83"},{postalCode:"45601",county:"Ross",lat:"39.33",lng:"-82.97"},{postalCode:"45612",county:"Ross",lat:"39.23",lng:"-83.28"},{postalCode:"45613",county:"Pike",lat:"39.01",lng:"-82.85"},{postalCode:"45614",county:"Gallia",lat:"38.92",lng:"-82.3"},{postalCode:"45616",county:"Adams",lat:"38.78",lng:"-83.32"},{postalCode:"45617",county:"Ross",lat:"39.28",lng:"-83.16"},{postalCode:"45618",county:"Adams",lat:"38.89",lng:"-83.62"},
{postalCode:"45619",county:"Lawrence",lat:"38.45",lng:"-82.46"},{postalCode:"45620",county:"Gallia",lat:"38.95",lng:"-82.13"},{postalCode:"45621",county:"Jackson",lat:"39.11",lng:"-82.61"},{postalCode:"45622",county:"Vinton",lat:"39.38",lng:"-82.49"},{postalCode:"45623",county:"Gallia",lat:"38.63",lng:"-82.27"},{postalCode:"45624",county:"Pike",lat:"39.17",lng:"-83.35"},{postalCode:"45628",county:"Ross",lat:"39.39",lng:"-83.19"},{postalCode:"45629",county:"Scioto",lat:"38.66",lng:"-82.83"},{postalCode:"45630",
county:"Scioto",lat:"38.7",lng:"-83.09"},{postalCode:"45631",county:"Gallia",lat:"38.82",lng:"-82.23"},{postalCode:"45633",county:"Ross",lat:"39.45",lng:"-82.79"},{postalCode:"45634",county:"Vinton",lat:"39.17",lng:"-82.5"},{postalCode:"45636",county:"Scioto",lat:"38.59",lng:"-82.82"},{postalCode:"45638",county:"Lawrence",lat:"38.54",lng:"-82.68"},{postalCode:"45640",county:"Jackson",lat:"39.03",lng:"-82.64"},{postalCode:"45642",county:"Pike",lat:"39.05",lng:"-83.05"},{postalCode:"45643",county:"Gallia",
lat:"38.87",lng:"-82.26"},{postalCode:"45644",county:"Ross",lat:"39.46",lng:"-82.88"},{postalCode:"45645",county:"Lawrence",lat:"38.56",lng:"-82.54"},{postalCode:"45646",county:"Pike",lat:"39.08",lng:"-83.31"},{postalCode:"45647",county:"Ross",lat:"39.29",lng:"-82.75"},{postalCode:"45648",county:"Scioto",lat:"38.91",lng:"-83"},{postalCode:"45650",county:"Adams",lat:"38.74",lng:"-83.42"},{postalCode:"45651",county:"Vinton",lat:"39.27",lng:"-82.47"},{postalCode:"45652",county:"Scioto",lat:"38.83",lng:"-83.08"},
{postalCode:"45653",county:"Scioto",lat:"38.88",lng:"-82.84"},{postalCode:"45654",county:"Vinton",lat:"39.37",lng:"-82.39"},{postalCode:"45656",county:"Jackson",lat:"38.89",lng:"-82.58"},{postalCode:"45657",county:"Scioto",lat:"38.86",lng:"-83.22"},{postalCode:"45658",county:"Gallia",lat:"38.78",lng:"-82.41"},{postalCode:"45659",county:"Lawrence",lat:"38.67",lng:"-82.63"},{postalCode:"45660",county:"Adams",lat:"38.98",lng:"-83.37"},{postalCode:"45661",county:"Pike",lat:"39.04",lng:"-83.06"},{postalCode:"45662",
county:"Scioto",lat:"38.76",lng:"-82.94"},{postalCode:"45663",county:"Scioto",lat:"38.75",lng:"-83.06"},{postalCode:"45669",county:"Lawrence",lat:"38.47",lng:"-82.36"},{postalCode:"45671",county:"Scioto",lat:"38.94",lng:"-83.24"},{postalCode:"45672",county:"Jackson",lat:"39.21",lng:"-82.69"},{postalCode:"45673",county:"Ross",lat:"39.2",lng:"-82.81"},{postalCode:"45674",county:"Gallia",lat:"38.88",lng:"-82.37"},{postalCode:"45675",county:"Lawrence",lat:"38.52",lng:"-82.56"},{postalCode:"45677",county:"Scioto",
lat:"38.8",lng:"-82.76"},{postalCode:"45678",county:"Lawrence",lat:"38.6",lng:"-82.37"},{postalCode:"45679",county:"Adams",lat:"38.95",lng:"-83.56"},{postalCode:"45680",county:"Lawrence",lat:"38.43",lng:"-82.56"},{postalCode:"45681",county:"Ross",lat:"39.31",lng:"-83.26"},{postalCode:"45682",county:"Scioto",lat:"38.81",lng:"-82.71"},{postalCode:"45683",county:"Pike",lat:"38.95",lng:"-82.86"},{postalCode:"45684",county:"Scioto",lat:"38.65",lng:"-83.27"},{postalCode:"45685",county:"Gallia",lat:"38.92",
lng:"-82.45"},{postalCode:"45686",county:"Gallia",lat:"39",lng:"-82.36"},{postalCode:"45687",county:"Pike",lat:"38.97",lng:"-83.02"},{postalCode:"45688",county:"Lawrence",lat:"38.73",lng:"-82.51"},{postalCode:"45690",county:"Pike",lat:"39.12",lng:"-83"},{postalCode:"45692",county:"Jackson",lat:"39.12",lng:"-82.55"},{postalCode:"45693",county:"Adams",lat:"38.79",lng:"-83.54"},{postalCode:"45694",county:"Scioto",lat:"38.73",lng:"-82.82"},{postalCode:"45695",county:"Vinton",lat:"39.15",lng:"-82.36"},
{postalCode:"45696",county:"Lawrence",lat:"38.59",lng:"-82.46"},{postalCode:"45697",county:"Adams",lat:"38.94",lng:"-83.67"},{postalCode:"45698",county:"Vinton",lat:"39.28",lng:"-82.39"},{postalCode:"45699",county:"Scioto",lat:"38.88",lng:"-83"},{postalCode:"45701",county:"Athens",lat:"39.32",lng:"-82.1"},{postalCode:"45710",county:"Athens",lat:"39.21",lng:"-82.23"},{postalCode:"45711",county:"Athens",lat:"39.43",lng:"-81.93"},{postalCode:"45712",county:"Washington",lat:"39.4",lng:"-81.66"},{postalCode:"45713",
county:"Washington",lat:"39.42",lng:"-81.82"},{postalCode:"45714",county:"Washington",lat:"39.3",lng:"-81.61"},{postalCode:"45715",county:"Washington",lat:"39.58",lng:"-81.63"},{postalCode:"45716",county:"Athens",lat:"39.46",lng:"-82.18"},{postalCode:"45717",county:"Athens",lat:"39.38",lng:"-82.27"},{postalCode:"45719",county:"Athens",lat:"39.4",lng:"-82.13"},{postalCode:"45720",county:"Meigs",lat:"39.09",lng:"-81.92"},{postalCode:"45721",county:"Washington",lat:"39.57",lng:"-81.58"},{postalCode:"45723",
county:"Athens",lat:"39.22",lng:"-81.81"},{postalCode:"45724",county:"Washington",lat:"39.38",lng:"-81.79"},{postalCode:"45727",county:"Noble",lat:"39.66",lng:"-81.47"},{postalCode:"45729",county:"Washington",lat:"39.41",lng:"-81.6"},{postalCode:"45732",county:"Athens",lat:"39.51",lng:"-82.07"},{postalCode:"45734",county:"Monroe",lat:"39.66",lng:"-81.19"},{postalCode:"45735",county:"Athens",lat:"39.26",lng:"-81.93"},{postalCode:"45739",county:"Athens",lat:"39.19",lng:"-81.75"},{postalCode:"45740",
county:"Athens",lat:"39.48",lng:"-82.08"},{postalCode:"45741",county:"Meigs",lat:"39.08",lng:"-82.25"},{postalCode:"45742",county:"Washington",lat:"39.27",lng:"-81.71"},{postalCode:"45743",county:"Meigs",lat:"39.07",lng:"-81.85"},{postalCode:"45744",county:"Washington",lat:"39.53",lng:"-81.5"},{postalCode:"45745",county:"Washington",lat:"39.6",lng:"-81.35"},{postalCode:"45746",county:"Washington",lat:"39.61",lng:"-81.46"},{postalCode:"45750",county:"Washington",lat:"39.42",lng:"-81.43"},{postalCode:"45760",
county:"Meigs",lat:"39.01",lng:"-82.08"},{postalCode:"45761",county:"Athens",lat:"39.43",lng:"-82.09"},{postalCode:"45764",county:"Athens",lat:"39.45",lng:"-82.23"},{postalCode:"45766",county:"Athens",lat:"39.33",lng:"-82.26"},{postalCode:"45767",county:"Washington",lat:"39.54",lng:"-81.13"},{postalCode:"45768",county:"Washington",lat:"39.4",lng:"-81.25"},{postalCode:"45769",county:"Meigs",lat:"39.09",lng:"-82.03"},{postalCode:"45770",county:"Meigs",lat:"38.99",lng:"-81.8"},{postalCode:"45771",county:"Meigs",
lat:"38.99",lng:"-81.9"},{postalCode:"45772",county:"Meigs",lat:"39.14",lng:"-81.83"},{postalCode:"45773",county:"Washington",lat:"39.46",lng:"-81.26"},{postalCode:"45775",county:"Meigs",lat:"39.08",lng:"-82.16"},{postalCode:"45776",county:"Meigs",lat:"39.19",lng:"-82.03"},{postalCode:"45777",county:"Athens",lat:"39.44",lng:"-81.92"},{postalCode:"45778",county:"Athens",lat:"39.34",lng:"-81.89"},{postalCode:"45779",county:"Meigs",lat:"39",lng:"-81.97"},{postalCode:"45780",county:"Athens",lat:"39.37",
lng:"-82.13"},{postalCode:"45782",county:"Athens",lat:"39.49",lng:"-82.08"},{postalCode:"45783",county:"Meigs",lat:"39.17",lng:"-81.83"},{postalCode:"45784",county:"Washington",lat:"39.39",lng:"-81.68"},{postalCode:"45786",county:"Washington",lat:"39.52",lng:"-81.66"},{postalCode:"45787",county:"Washington",lat:"39.47",lng:"-81.63"},{postalCode:"45788",county:"Washington",lat:"39.51",lng:"-81.38"},{postalCode:"45789",county:"Washington",lat:"39.55",lng:"-81.25"},{postalCode:"45801",county:"Allen",
lat:"40.76",lng:"-84.08"},{postalCode:"45802",county:"Allen",lat:"40.74",lng:"-84.17"},{postalCode:"45804",county:"Allen",lat:"40.72",lng:"-84.09"},{postalCode:"45805",county:"Allen",lat:"40.74",lng:"-84.15"},{postalCode:"45806",county:"Allen",lat:"40.67",lng:"-84.13"},{postalCode:"45807",county:"Allen",lat:"40.8",lng:"-84.17"},{postalCode:"45808",county:"Allen",lat:"40.83",lng:"-83.97"},{postalCode:"45809",county:"Allen",lat:"40.84",lng:"-84.19"},{postalCode:"45810",county:"Hardin",lat:"40.77",lng:"-83.82"},
{postalCode:"45812",county:"Hardin",lat:"40.69",lng:"-83.82"},{postalCode:"45813",county:"Paulding",lat:"41.19",lng:"-84.74"},{postalCode:"45814",county:"Hancock",lat:"40.9",lng:"-83.63"},{postalCode:"45815",county:"Putnam",lat:"41.03",lng:"-83.99"},{postalCode:"45816",county:"Hancock",lat:"41",lng:"-83.79"},{postalCode:"45817",county:"Allen",lat:"40.88",lng:"-83.9"},{postalCode:"45819",county:"Auglaize",lat:"40.62",lng:"-84.26"},{postalCode:"45820",county:"Allen",lat:"40.83",lng:"-84.08"},{postalCode:"45821",
county:"Paulding",lat:"41.23",lng:"-84.59"},{postalCode:"45822",county:"Mercer",lat:"40.54",lng:"-84.58"},{postalCode:"45826",county:"Mercer",lat:"40.44",lng:"-84.49"},{postalCode:"45827",county:"Putnam",lat:"41.01",lng:"-84.3"},{postalCode:"45828",county:"Mercer",lat:"40.48",lng:"-84.65"},{postalCode:"45830",county:"Putnam",lat:"40.91",lng:"-84.08"},{postalCode:"45831",county:"Putnam",lat:"41.11",lng:"-84.26"},{postalCode:"45832",county:"Van Wert",lat:"40.93",lng:"-84.72"},{postalCode:"45833",county:"Allen",
lat:"40.84",lng:"-84.34"},{postalCode:"45835",county:"Hardin",lat:"40.77",lng:"-83.7"},{postalCode:"45836",county:"Hardin",lat:"40.79",lng:"-83.64"},{postalCode:"45837",county:"Putnam",lat:"41.06",lng:"-84.3"},{postalCode:"45838",county:"Van Wert",lat:"40.74",lng:"-84.48"},{postalCode:"45839",county:"Hancock",lat:"41.04",lng:"-83.65"},{postalCode:"45840",county:"Hancock",lat:"41.04",lng:"-83.64"},{postalCode:"45841",county:"Hancock",lat:"40.89",lng:"-83.73"},{postalCode:"45843",county:"Hardin",lat:"40.78",
lng:"-83.53"},{postalCode:"45844",county:"Putnam",lat:"40.91",lng:"-84.28"},{postalCode:"45845",county:"Shelby",lat:"40.33",lng:"-84.37"},{postalCode:"45846",county:"Mercer",lat:"40.4",lng:"-84.76"},{postalCode:"45848",county:"Putnam",lat:"41.03",lng:"-84.07"},{postalCode:"45849",county:"Paulding",lat:"41",lng:"-84.45"},{postalCode:"45850",county:"Allen",lat:"40.71",lng:"-83.93"},{postalCode:"45851",county:"Paulding",lat:"41.03",lng:"-84.6"},{postalCode:"45853",county:"Putnam",lat:"40.98",lng:"-84.2"},
{postalCode:"45854",county:"Allen",lat:"40.76",lng:"-83.95"},{postalCode:"45855",county:"Paulding",lat:"41.09",lng:"-84.59"},{postalCode:"45856",county:"Putnam",lat:"41.11",lng:"-83.99"},{postalCode:"45858",county:"Hancock",lat:"41.11",lng:"-83.8"},{postalCode:"45859",county:"Hardin",lat:"40.69",lng:"-83.78"},{postalCode:"45860",county:"Mercer",lat:"40.4",lng:"-84.5"},{postalCode:"45861",county:"Paulding",lat:"41.09",lng:"-84.42"},{postalCode:"45862",county:"Mercer",lat:"40.67",lng:"-84.52"},{postalCode:"45863",
county:"Van Wert",lat:"40.9",lng:"-84.45"},{postalCode:"45864",county:"Putnam",lat:"41.1",lng:"-84.13"},{postalCode:"45865",county:"Auglaize",lat:"40.39",lng:"-84.37"},{postalCode:"45866",county:"Mercer",lat:"40.49",lng:"-84.55"},{postalCode:"45867",county:"Hancock",lat:"40.9",lng:"-83.54"},{postalCode:"45868",county:"Hancock",lat:"40.96",lng:"-83.84"},{postalCode:"45869",county:"Auglaize",lat:"40.45",lng:"-84.39"},{postalCode:"45870",county:"Auglaize",lat:"40.56",lng:"-83.95"},{postalCode:"45871",
county:"Auglaize",lat:"40.49",lng:"-84.31"},{postalCode:"45872",county:"Wood",lat:"41.18",lng:"-83.67"},{postalCode:"45873",county:"Paulding",lat:"41.11",lng:"-84.39"},{postalCode:"45874",county:"Van Wert",lat:"40.78",lng:"-84.66"},{postalCode:"45875",county:"Putnam",lat:"41.02",lng:"-84.05"},{postalCode:"45876",county:"Putnam",lat:"40.93",lng:"-84.34"},{postalCode:"45877",county:"Putnam",lat:"40.95",lng:"-83.95"},{postalCode:"45879",county:"Paulding",lat:"41.13",lng:"-84.56"},{postalCode:"45880",
county:"Paulding",lat:"41.07",lng:"-84.73"},{postalCode:"45881",county:"Hancock",lat:"40.95",lng:"-83.78"},{postalCode:"45882",county:"Mercer",lat:"40.68",lng:"-84.66"},{postalCode:"45883",county:"Mercer",lat:"40.41",lng:"-84.63"},{postalCode:"45884",county:"Auglaize",lat:"40.56",lng:"-84.08"},{postalCode:"45885",county:"Auglaize",lat:"40.56",lng:"-84.39"},{postalCode:"45886",county:"Van Wert",lat:"40.99",lng:"-84.61"},{postalCode:"45887",county:"Allen",lat:"40.71",lng:"-84.35"},{postalCode:"45888",
county:"Auglaize",lat:"40.6",lng:"-84.09"},{postalCode:"45889",county:"Hancock",lat:"41.14",lng:"-83.64"},{postalCode:"45890",county:"Hancock",lat:"40.97",lng:"-83.49"},{postalCode:"45891",county:"Van Wert",lat:"40.87",lng:"-84.58"},{postalCode:"45893",county:"Putnam",lat:"40.88",lng:"-84.15"},{postalCode:"45894",county:"Van Wert",lat:"40.77",lng:"-84.46"},{postalCode:"45895",county:"Auglaize",lat:"40.57",lng:"-84.17"},{postalCode:"45896",county:"Auglaize",lat:"40.6",lng:"-83.96"},{postalCode:"45897",
county:"Hancock",lat:"40.83",lng:"-83.66"},{postalCode:"45898",county:"Van Wert",lat:"40.74",lng:"-84.77"},{postalCode:"45899",county:"Van Wert",lat:"40.8",lng:"-84.77"},{postalCode:"45999",county:"Hamilton",lat:"39.09",lng:"-84.51"}]});

define(["module"],function(a){a.config&&a.config();return[{id:"1",name:"County Veterans Service Office"},{id:"2",name:"VISN 4: Healthcare"},{id:"3",name:"VISN 10: VA Healthcare System of Ohio"},{id:"4",name:"VISN 11: Veterans in Partnership"},{id:"5",name:"Veterans Benefits Administration"},{id:"6",name:"National Cemetery Administration"},{id:"7",name:"Ohio Department of Veterans Services"},{id:"8",name:"Veterans Homes"}]});

define(["module"],function(a){a.config&&a.config();return[{id:"3137",type:"8",subType:null,county:"Brown",name:"Georgetown Home",address1:"2003 Veterans Blvd.",address2:null,city:"Georgetown",state:"OH",postalCode:"45121",lat:"38.87893",lng:"-83.89034",phone:"9373782900",ext:"2702",url:"http://dvs.ohio.gov/veterans_homes/georgetown_home.aspx",urlText:"Georgetown Home Website",email:"debora.simpson@dvs.ohio.gov"},{id:"3138",type:"8",subType:null,county:"Erie",name:"Sandusky Home",address1:"3416 Columbus Avenue ",
address2:null,city:"Sandusky",state:"OH",postalCode:"44870",lat:"41.423035",lng:"-82.697182",phone:"4196252454",ext:"1231",url:"http://dvs.ohio.gov/veterans_homes/sandusky_home.aspx",urlText:"Sandusky Home Website",email:"jane.toll@dvs.ohio.gov"},{id:"3139",type:"8",subType:null,county:"Erie",name:"Sandusky Domiciliary",address1:"3416 Columbus Avenue ",address2:null,city:"Sandusky",state:"OH",postalCode:"44870",lat:"41.423035",lng:"-82.697182",phone:"4196252454",ext:"1231",url:"http://dvs.ohio.gov/veterans_homes/sandusky_domiciliary.aspx",
urlText:"Sandusky Domiciliary Website",email:"jane.toll@dvs.ohio.gov"}]});

define(["module"],function(a){a.config&&a.config();return{link:{text:null,href:"index.html",title:"Ohio Department of Veterans Services"},image:{name:"logo.png",src:"img/normal/logo.png",alt:null}}});

define(["module","ga-helpers"],function(a,c){a.config&&a.config();var b={initialize:function(a){c.init();a&&a()},bind:function(){},deviceready:function(){b.report("deviceready")},report:function(a){console.log("Report: "+a)},trackPage:function(a){c.trackPage(a)},trackEvent:function(a,b,d){c.trackEvent(a,b,d)},isInstalledApp:function(){return!1}};return b},function(a){a=a.requireModules&&a.requireModules[0];"jquery"===a&&(requirejs.undef(a),requirejs.config({paths:{jquery:"local/jquery"}}),require(["jquery"],
function(){}))});
