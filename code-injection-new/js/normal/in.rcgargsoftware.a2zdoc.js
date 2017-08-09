




Ext.application({
    name: 'DoctorAppointment',

    requires: [
        'Ext.MessageBox',
        'DoctorAppointment.util.Constant',
        'DoctorAppointment.util.picker.TimePicker',
        //'Ext.data.proxy.JsonP',
        'Ext.DateExtras'
        //'Ext.util.DelayedTask'
        //'Ext.data.proxy.LocalStorage'
    ],

    controllers: ['MainController'],
    views: [
            'Main',
            
            // Patient
            'patient.PatientHome',
            'patient.PatientTakeAppointment',
            'patient.PatientWaitingTime',
            'patient.SearchDoctorAppointment',
            'patient.PatientRegistrationForm',
            'patient.BookAppointment',
            'patient.CancelAppointment',
            
            // Doctor
            'doctor.DoctorHome',
            'doctor.DoctorForgotPassword',
            'doctor.DoctorRegistrationForm',
            'doctor.DoctorLogin',
            
            // Doctor Manage Operation
            'doctor.DoctorLocations',
            'doctor.DoctorProfiles',
            'doctor.DoctorOfficeHours',
            'doctor.DoctorOfficeHoursAddEdit',
            'doctor.DoctorBlockAvailability',
            'doctor.DoctorBlockAvailabilityAddEdit',
            'doctor.DoctorAppointmentOrToken',
            'doctor.DoctorLocationsAddEdit',
            'doctor.DoctorProfilesAddEdit',
            'doctor.DoctorAssignLocationOverlay',
            'doctor.StaffAssignLocationOverlay',
            'doctor.DoctorMoveAppointmentOverlay',
            'doctor.DoctorAppointmentOrTokenDelayOverlay',
            'doctor.DoctorAppointmentOrTokenListing',
            'doctor.BookAppointmentInstant',
            'doctor.PatientInformation'
            
            ],
    models: [
            // common
            'StateModel',
            'CityModel',
            'AreaModel',
            'SpecialtyModel',
            'AccessControlModel',
            
                    
             // Patient
             'PatientTakeAppointmentModel',
             'UpcomingAppointmentsModel',
             'PatientRegistrationModel', // used to send extra params selected by patient on Search Doctor Appointment
             'PatientBookAppointmentModel',
             'RegisteredPatientModel',
             'BookAppointmentModel',
             
             
            // Doctor
             'doctor.DoctorModel',
             'doctor.DoctorLoginModel',
             'doctor.DoctorForgotPasswordModel',
             'doctor.DoctorRegistrationModel',
             'doctor.DoctorBlockAvailabilityModel',
             'doctor.DoctorLocationsModel',
             'doctor.DoctorLocationsAddEditModel',
             'doctor.GroupsModel',
             'doctor.ProfilesModel',
             'doctor.DoctorOfficeHoursAddEditModel',
             'doctor.ProfilesModel',
             'doctor.DoctorProfileRegistrationModel',
             'doctor.StaffAssignLocationsModel',
             'doctor.DoctorAssignedLocationListModel',
             'doctor.StaffProfileAssignedLocationModel',
             'doctor.StaffLocationModel',
             'doctor.DoctorBookedAppointmentsModel'

             
            ],
    stores: [
            // common
            'StateStore',
            'StateActiveStore',
            'CityStore',
            'AreaStore',
            'SpecialtyStore',
            'SpecialtyActiveStore',
            'CityDoctorStore',
            'DoctorProfilesStore',
            'AccessControlStore',
            
            
            // Patient
             'PatientHomeListStore',
             'DoctorStore',
             'UpcomingAppointmentsStore',
             'PatientTakeAppointmentStore',
             'RegisteredPatientStore',
             'BookAppointmentStore',
             
             // Doctor
             'DoctorHomeListStore',
             'BlockAvailabilityStore',
             'DoctorLocationsStore',
             'GroupsStore',
             'ProfilesStore',
             'ProfilesUpdateStore',
             'DoctorOfficeHoursStore',
             'DoctorAssignedLocationListStore',
             'DoctorProfileAssignedLocationStore',
             'StaffProfileAssignedLocationStore',
             'StaffLocationStore',
             'DoctorBookedAppointmentsStore',
             'DoctorStoreForOfficeHours',
             'DoctorAssignedLocationStoreForOfficeHours',
             'DoctorStoreForBlockAvailability',
             'DoctorAssignedLocationStoreForBlockAvailability',
             'DoctorStoreForAppointmentOrToken',
             'DoctorAssignedLocationStoreForAppointmentOrToken',
             'DoctorAppointmentTimeSlotStore',
             'AvgDurationStore',
             'DoctorInstantBookedApptsStore'
             
            ],     

    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },

    isIconPrecomposed: true,

    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },

    launch: function() {
        
        if (!Ext.browser.is.WebKit) {
            alert("The current browser is unsupported.\n\nSupported browsers:\n" +
                "Google Chrome\n" +
                "Apple Safari\n" +
                "Mobile Safari (iOS)\n" +
                "Android Browser\n" +
                "BlackBerry Browser"
            );
        }
        //var task = Ext.create('Ext.util.DelayedTask', function() {
        //                console.log('This message took 1.5 seconds to appear');
        //            });
        //task.delay(1500);
        
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        // Initialize the main view
        Ext.Viewport.add(Ext.create('DoctorAppointment.view.Main'));
        
        Ext.Date.patterns = {
                //ISO8601Long:"Y-m-d H:i:s",
                ISO8601Short:"Y-m-d",
                //ShortDate: "n/j/Y",
                //LongDate: "l, F d, Y",
                //FullDateTime: "l, F d, Y g:i:s A",
                //MonthDay: "F d",
                //ShortTime: "g:i A",
                //LongTime: "g:i:s A",
                //SortableDateTime: "Y-m-d\\TH:i:s",
                //UniversalSortableDateTime: "Y-m-d H:i:sO",
                //YearMonth: "F, Y",
                AppointmentDate: "D, d F, Y"
        };
        
            //var dt = new Date();
            //console.log('Today Date:--> ' + dt);
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.ISO8601Long));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.ISO8601Short));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.ShortDate));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.LongDate));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.FullDateTime));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.MonthDay));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.ShortTime));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.LongTime));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.SortableDateTime));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.UniversalSortableDateTime));
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.YearMonth));
            //
            //console.log(Ext.Date.format(dt, Ext.Date.patterns.AppointmentDate));
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function(buttonId) {
                if (buttonId === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});


Ext.define('DoctorAppointment.store.DoctorProfileAssignedLocationStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('establishmentname');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Assigned_Location_List(),
            //url: 'http://127.0.0.1:8080/mobile/getestablishmentsbydoctorid.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'locations',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'DoctorProfileAssignedLocationStore'
    }
});

Ext.define('DoctorAppointment.store.BookAppointmentStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'DoctorAppointment.model.BookAppointmentModel',
        storeId : 'BookAppointmentStore'
    }
    
});

Ext.define('DoctorAppointment.store.StaffLocationStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.StaffLocationModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.StaffLocationModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        grouper: {
            groupFn: function (item) {
                return item.get('doctorname');
            } // groupFn
        }, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Staff_Location_List(),
            //url: 'http://127.0.0.1:8080/mobile/getdoctorestablishmentbystaffid.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'doctorestablishment',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'StaffLocationStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorLocationsStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorLocationsModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorLocationsModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('establishmentname');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Locations_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listdoctorlocations.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'locations',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'DoctorLocationsStore'
    }
});

Ext.define('DoctorAppointment.store.RegisteredPatientStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.RegisteredPatientModel'
    ],

    config: {
        model: 'DoctorAppointment.model.RegisteredPatientModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        //clearOnPageLoad: false,
        
        // to sort on doctor name
        grouper: {
            groupFn: function (item) {
                return item.get('name');
            } // groupFn
        }, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getRegisteredPatient_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listregisteredpatient.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'patients',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'RegisteredPatientStore'
    }
});

Ext.define('DoctorAppointment.store.StateActiveStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.StateModel'
    ],

    config: {
        model: 'DoctorAppointment.model.StateModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        //clearOnPageLoad: false,
        
        // to sort on doctor name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('name');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getState_Active_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listactivestate.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'states',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'StateActiveStore'
    }
});

Ext.define('DoctorAppointment.store.GroupsStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.GroupsModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.GroupsModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : '',
            //url: 'http://127.0.0.1:8080/mobile/listallgroupsbygrouptype.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'groups',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'GroupsStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorBookedAppointmentsStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorBookedAppointmentsModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorBookedAppointmentsModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        storeId: 'DoctorBookedAppointmentsStore',
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Appointment_List(),
            limitParam: false,
            reader: {
                type: 'json',
               // rootProperty: 'docbookings',
                successProperty: 'success'
            }
        }
    }
        
});

Ext.define('DoctorAppointment.store.AvgDurationStore', {
    extend: 'Ext.data.Store',

    config: {
        
        fields: [
            { name: 'id',type: 'string' },
            { name: 'delayValue',type: 'string' },
            { name: 'tokenNo',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.store.CityDoctorStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.CityModel'
    ],

    config: {
        model: 'DoctorAppointment.model.CityModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on doctor name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('cityName');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_city_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listcitiesdoctor.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'cities',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'CityDoctorStore'
    }
});

Ext.define('DoctorAppointment.store.PatientHomeListStore', {
    extend: 'Ext.data.Store',

    config: {
        
        fields: [
            {
                name: 'imageurl'
            },
            {
                name: 'title1'
            },
            {
                name: 'title2'
            }
        ],
        
        autoLoad: true,
        
        proxy: {
            type: 'ajax',
            url : 'resources/json/PatientHome.json',
            reader: {
                type: 'json'
            }
        } 
    }
});

Ext.define('DoctorAppointment.store.DoctorHomeListStore', {
    extend: 'Ext.data.Store',

    config: {
        
        fields: [
            {
                name: 'title'
            }
        ],
        
        autoLoad: true,
        
        proxy: {
            type: 'ajax',
            url : 'resources/json/DoctorHome.json',
            reader: {
                type: 'json'
            }
        }
    }
});

Ext.define('DoctorAppointment.store.DoctorInstantBookedApptsStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorBookedAppointmentsModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorBookedAppointmentsModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        storeId: 'DoctorInstantBookedApptsStore'
    }
        
});

Ext.define('DoctorAppointment.store.DoctorStoreForBlockAvailability', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.ProfilesModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.ProfilesModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_List_ProfileByDoctor_And_DoctorAdmin(),
            //url: 'http://127.0.0.1:8080/mobile/listprofilebydoctoranddoctoradmin.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'profiles',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        
        storeId : 'DoctorStoreForBlockAvailability'
    }
});

Ext.define('DoctorAppointment.store.StaffProfileAssignedLocationStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.StaffProfileAssignedLocationModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.StaffProfileAssignedLocationModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('establishmentname');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Staff_Assigned_Location_List(),
            //url: 'http://127.0.0.1:8080/mobile/getdoctorstaffbyestbid.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'locations',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'StaffProfileAssignedLocationStore'
    }
});

Ext.define('DoctorAppointment.store.AreaStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.AreaModel'
    ],

    config: {
        model: 'DoctorAppointment.model.AreaModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on doctor name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('areaName');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getArea_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listarea.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'areas',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'AreaStore'
    }
});

Ext.define('DoctorAppointment.store.UpcomingAppointmentsStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.UpcomingAppointmentsModel'
    ],

    config: {
        model: 'DoctorAppointment.model.UpcomingAppointmentsModel',
        autoLoad: false,

        
        // to sort on patient first name name
/*        grouper: {
            groupFn: function (item) {
                return item.get('patient_fname');
            } // groupFn
        }, */// grouper
        
        proxy: {
            type: 'ajax',
            //url : 'resources/json/UpcomingAppointments.json',
            url : DoctorAppointment.util.Constant.getUpcoming_Appointment_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/getupcomingappointmentbyUID.action',
            reader: {
                type: 'json',
                rootProperty: 'upcoming_appointments',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //    }
        //},
        storeId : 'UpcomingAppointmentsStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        pageSize: 10,
        //remoteFilter   : true,
        clearOnPageLoad: false, //True to empty the store when loading another page via loadPage, nextPage or previousPage (defaults to true). Setting to false keeps existing records, allowing large data sets to be loaded one page at a time but rendered all together.
        
        // to sort on doctor name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('drname');
        //    } // groupFn
        //}, // 
        //sorters: 'drname',
        
        proxy: {
            type: 'ajax',
            actionMethods : {
                read: 'POST'
            },
            url : DoctorAppointment.util.Constant.getDoctor_Appointment_List_Url(),
            //url : 'resources/json/Doctor.json',
            //headers: { 'Content-Type': 'application/json;charset=utf-8'},
            //limitParam: false, //The name of the 'limit' parameter to send in a request. Defaults to 'limit'. Set this to false if you don't want to send a limit parameter.
            reader: {
                type: 'json',
                rootProperty: 'docappt',
                totalProperty: 'totalCount',
                messageProperty: 'ctime',
                successProperty: 'success'
            },            
        },
        //noCache: false, // get rid of the '_dc' url parameter
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //    }
        //},
        listeners : {
            beforeload : function(store, operation, eOpts ) {
                //console.log(store.getCount());
                var proxy= store.getProxy();

                var patientTakeAppointmentStore = Ext.getStore('PatientTakeAppointmentStore').getNewRecords()[0].data;
                //console.log(patientTakeAppointmentStore); // to see what criteria selected by patient
                var search_appt_date = Ext.Date.format(new Date(patientTakeAppointmentStore.searchdate), Ext.Date.patterns.ISO8601Short);
                //console.log(search_appt_date);
                
                proxy.setExtraParams({
                        state: patientTakeAppointmentStore.state,
                        city: patientTakeAppointmentStore.city,
                        area: patientTakeAppointmentStore.area,
                        specialty: patientTakeAppointmentStore.specialty,
                        fname: patientTakeAppointmentStore.fname,
                        lname: patientTakeAppointmentStore.lname,
                        searchdate: search_appt_date
                });
                
                //console.log(proxy.getExtraParams()); // to see what extra params are going selected by patient
            }
        },        
        storeId : 'DoctorStore'
    }
});

Ext.define('DoctorAppointment.store.SpecialtyActiveStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.SpecialtyModel'
    ],

    config: {
        model: 'DoctorAppointment.model.SpecialtyModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on doctor name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('specialtyName');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getSpecialties_Active_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listactivespecialties.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'specialties',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'SpecialtyActiveStore'
    }
});

/**
 * Ext.data.PatientTakeAppointmentStore
 * This store use to send extra params values which selected by patient on Doctor Search Screen
*/

Ext.define('DoctorAppointment.store.PatientTakeAppointmentStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.PatientTakeAppointmentModel'
    ],

    config: {
        model: 'DoctorAppointment.model.PatientTakeAppointmentModel',
        autoLoad: false,
        storeId : 'PatientTakeAppointmentStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorOfficeHoursStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorOfficeHoursAddEditModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorOfficeHoursAddEditModel',
        autoLoad: false, 
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Office_Hours_Url(),
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'docorEstablishmentHours',
                successProperty: 'success'
            }
        },
        storeId : 'DoctorOfficeHoursStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorAssignedLocationStoreForOfficeHours', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('establishmentname');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Assigned_Location_List(),
            //url: 'http://127.0.0.1:8080/mobile/getestablishmentsbydoctorid.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'locations',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'DoctorAssignedLocationStoreForOfficeHours'
    }
});

Ext.define('DoctorAppointment.store.DoctorAssignedLocationListStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('establishmentname');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Assigned_Location_List(),
            //url: 'http://127.0.0.1:8080/mobile/getestablishmentsbydoctorid.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'locations',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'DoctorAssignedLocationListStore'
    }
});

Ext.define('DoctorAppointment.store.AccessControlStore', {
    extend: 'Ext.data.Store',
    config: {
        model: 'DoctorAppointment.model.AccessControlModel',
        storeId : 'AccessControlStore'
    }
    
});

Ext.define('DoctorAppointment.store.ProfilesUpdateStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorProfileRegistrationModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorProfileRegistrationModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getProfile_by_profileid(),
            //url: 'http://127.0.0.1:8080/mobile/getprofilebyuserid.action',
            limitParam: false,
            reader: {
                type: 'json',
                //rootProperty: 'profiles',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'ProfilesUpdateStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorStoreForOfficeHours', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.ProfilesModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.ProfilesModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_List_ProfileByDoctor_And_DoctorAdmin(),
            //url: 'http://127.0.0.1:8080/mobile/listprofilebydoctoranddoctoradmin.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'profiles',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        
        storeId : 'DoctorStoreForOfficeHours'
    }
});

Ext.define('DoctorAppointment.store.DoctorAppointmentTimeSlotStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorAppointmentTimeSlotModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorAppointmentTimeSlotModel',
        autoLoad: false, 
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Office_Hours_Url(),
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'docorEstablishmentHours',
                successProperty: 'success'
            }
        },
        storeId : 'DoctorAppointmentTimeSlotStore'
    }
});

Ext.define('DoctorAppointment.store.CityStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.CityModel'
    ],

    config: {
        model: 'DoctorAppointment.model.CityModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on doctor name
        grouper: {
            groupFn: function (item) {
                return item.get('cityName');
            } // groupFn
        }, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getCity_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listcities.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'cities',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'CityStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorStoreForAppointmentOrToken', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.ProfilesModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.ProfilesModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_List_ProfileByDoctor_And_DoctorAdmin(),
            //url: 'http://127.0.0.1:8080/mobile/listprofilebydoctoranddoctoradmin.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'profiles',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        
        storeId : 'DoctorStoreForAppointmentOrToken'
    }
});

Ext.define('DoctorAppointment.store.DoctorAssignedLocationStoreForBlockAvailability', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('establishmentname');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Assigned_Location_List(),
            //url: 'http://127.0.0.1:8080/mobile/getestablishmentsbydoctorid.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'locations',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'DoctorAssignedLocationStoreForBlockAvailability'
    }
});

Ext.define('DoctorAppointment.store.ProfilesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.ProfilesModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.ProfilesModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Profies_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listprofile.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'profiles',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'ProfilesStore'
    }
});

Ext.define('DoctorAppointment.store.StaffProfilesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.ProfilesModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.ProfilesModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_List_ProfileByStaff_And_StaffAdmin(),
            //url: 'http://127.0.0.1:8080/mobile/listprofilebystaffandstaffadmin.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'profiles',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},        
        
        storeId : 'StaffProfilesStore'
    }
});

Ext.define('DoctorAppointment.store.DoctorAssignedLocationStoreForAppointmentOrToken', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorAssignedLocationListModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on establishment / locations name
        //grouper: {
        //    groupFn: function (item) {
        //        return item.get('establishmentname');
        //    } // groupFn
        //}, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_Assigned_Location_List(),
            //url: 'http://127.0.0.1:8080/mobile/getestablishmentsbydoctorid.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'locations',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'DoctorAssignedLocationStoreForAppointmentOrToken'
    }
});

Ext.define('DoctorAppointment.store.DoctorProfilesStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.ProfilesModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.ProfilesModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getDoctor_List_ProfileByDoctor_And_DoctorAdmin(),
            //url: 'http://127.0.0.1:8080/mobile/listprofilebydoctoranddoctoradmin.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'profiles',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        
        storeId : 'DoctorProfilesStore'
    }
});

Ext.define('DoctorAppointment.store.BlockAvailabilityStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.doctor.DoctorBlockAvailabilityModel'
    ],

    config: {
        model: 'DoctorAppointment.model.doctor.DoctorBlockAvailabilityModel',
        proxy: {
            type: 'ajax',
            url: DoctorAppointment.util.Constant.getDoctor_BlockAvailability(),
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'EstablishmentExclusionHours',
                successProperty: 'success'
            }
        },
        storeId: 'BlockAvailabilityStore'
    }
});

Ext.define('DoctorAppointment.store.SpecialtyStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.SpecialtyModel'
    ],

    config: {
        model: 'DoctorAppointment.model.SpecialtyModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        
        // to sort on doctor name
        grouper: {
            groupFn: function (item) {
                return item.get('specialtyName');
            } // groupFn
        }, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getSpecialties_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/listspecialties.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'specialties',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'SpecialtyStore'
    }
});

Ext.define('DoctorAppointment.store.StateStore', {
    extend: 'Ext.data.Store',

    requires: [
        'DoctorAppointment.model.StateModel'
    ],

    config: {
        model: 'DoctorAppointment.model.StateModel',
        autoLoad: false, //NOTE: set to false so that we can manually call store.load()
        //clearOnPageLoad: false,
        
        // to sort on doctor name
        grouper: {
            groupFn: function (item) {
                return item.get('name');
            } // groupFn
        }, // grouper
        
        proxy: {
            type: 'ajax',
            url : DoctorAppointment.util.Constant.getState_List_Url(),
            //url: 'http://127.0.0.1:8080/mobile/liststate.action',
            limitParam: false,
            reader: {
                type: 'json',
                rootProperty: 'states',
                successProperty: 'success'
            }
        },
        //listeners : {
        //    load : function(store) {
        //        console.log(store.getCount());
        //        console.log(store.getProxy().getReader().rawData);
        //    }
        //},
        storeId : 'StateStore'
    }
});

Ext.define('DoctorAppointment.model.RegisteredPatientModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'existingPatientID',mapping: 'existingPatientID',type: 'string' },
            { name: 'name',mapping: 'name',type: 'string' },
            { name: 'fname',mapping: 'fname',type: 'string' },
            { name: 'lname',mapping: 'lname',type: 'string' },
            { name: 'age',mapping: 'age',type: 'int' },
            { name: 'sex',mapping: 'sex',type: 'string' },
            { name: 'medicaldesc',mapping: 'medicaldesc',type: 'string' },
            { name: 'parentuserid',mapping: 'parentuserid',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.PatientBookAppointmentModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'fname',mapping: 'fname',type: 'string' },
            { name: 'lname',mapping: 'lname',type: 'string' },
            { name: 'age',mapping: 'age',type: 'int' },
            { name: 'sex',mapping: 'sex',type: 'string' }
        ],
        validations: [
            
            {type:  'presence', field: 'fname', message: "First Name can't be empty"},
            {type:  'format',   field: 'fname', matcher: /^[a-zA-Z. ]*$/, message:"First Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'presence', field: 'lname', message: "Last Name can't be empty"},
            {type:  'format',   field: 'lname', matcher: /^[a-zA-Z]+$/, message:"Last Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'presence', field: 'age', message: "Age can't be empty"},
            //{type:  'format', field: 'age', matcher: /^\d$/, message: "Age numeric only"},
            
            {type:  'presence', field: 'sex', message: "Sex can't be empty"}
        ]
    }
});

Ext.define('DoctorAppointment.model.CityModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'cityId',mapping: 'cityId',type: 'int' },
            { name: 'cityName',mapping: 'cityName',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.PatientRegistrationModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'mobile',mapping: 'mobile',type: 'string' },
            { name: 'uid',mapping: 'uid',type: 'string' },
            { name: 'fname',mapping: 'fname',type: 'string' },
            { name: 'lname',mapping: 'lname',type: 'string' },
            { name: 'age',mapping: 'age',type: 'int' },
            { name: 'sex',mapping: 'sex',type: 'string' },
            { name: 'email',mapping: 'email',type: 'string' }
        ],
        validations: [
            {type:  'presence', field: 'mobile', message: "Mobile can't be empty and "},
            {type:  'format', field: 'mobile', matcher: /^\d{10,15}$/, message: "Mobile numeric only and length can't below 10 or beyond 15 charaters"},
            //{type:  'format', field: 'mobile', matcher: /^\d{10}$/, message: "Mobile numeric and 10 charaters only"},
            
            {type:  'presence', field: 'uid', message: "UID can't be empty"},
            {type:  'format',   field: 'uid', matcher: /^[a-zA-Z0-9]+$/, message:"alphanumeric only"}, // other regex /^([a-zA-Z0-9 _-]+)$/    - allows spaces in side a string and restrict special characters.It Only allows a-z, A-Z, 0-9, Space, Underscore and dash
            
            {type:  'presence', field: 'fname', message: "First Name can't be empty"},
            {type:  'format',   field: 'fname', matcher: /^[a-zA-Z. ]*$/, message:"First Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'presence', field: 'lname', message: "Last Name can't be empty"},
            {type:  'format',   field: 'lname', matcher: /^[a-zA-Z]+$/, message:"Last Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'presence', field: 'age', message: "Age can't be empty"},
            //{type:  'format', field: 'age', matcher: /^\d$/, message: "Age numeric only"},
            
            {type:  'presence', field: 'sex', message: "Sex can't be empty"}
        ]
    }
});

Ext.define('DoctorAppointment.model.StateModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'stateID',mapping: 'stateID',type: 'int' },
            { name: 'name',mapping: 'name',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.PatientTakeAppointmentModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'state',mapping: 'state',type: 'string' },
            { name: 'city',mapping: 'city',type: 'string' },
            { name: 'area',mapping: 'area',type: 'string' },
            { name: 'specialty',mapping: 'specialty',type: 'string' },
            { name: 'fname',mapping: 'fname',type: 'string' },
            { name: 'lname',mapping: 'lname',type: 'string' },
            { name: 'searchdate',mapping: 'searchdate',type: 'string' }
        ],
        validations: [
            {type:  'presence', name: 'state', message: "State can't be empty"},
            {type:  'presence', name: 'city', message: "City can't be empty"},
            {type:  'presence', name: 'searchdate', message: "Date can't be empty"} // date handled alreay on UI with in 3 months and not below today date so can leave it
        ]
    }
});

//However, Sencha Touch 2 only supports only 4 data types for Model.
//
//    String
//    Integer
//    Float
//    Boolean


Ext.define('DoctorAppointment.model.SpecialtyModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'specialtyCode',mapping: 'specialtyCode',type: 'string' },
            { name: 'specialtyName',mapping: 'specialtyName',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.AreaModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'areaId',mapping: 'areaId',type: 'string' },
            { name: 'areaName',mapping: 'areaName',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.GroupsModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'groupid',mapping: 'groupid',type: 'int' },
            { name: 'groupName',mapping: 'groupName',type: 'string' }
            //{ name: 'groupCode',mapping: 'groupCode',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.AccessControlModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'isUserCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isUserUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isUserReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isUserDeleteAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isStaffUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isStaffReadAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isPatientCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isPatientUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isPatientReadAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isAllBlockCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllBlockUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllBlockReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllBlockDeleteAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isAllEstablishmentCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllEstablishmentUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllEstablishmentReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllEstablishmentDeleteAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isAppointmentCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAppointmentUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAppointmentReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAppointmentDeleteAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isAdmin', type: 'boolean', defaultValue: false},
            
            { name: 'isDoctor', type: 'boolean', defaultValue: false},
            
            { name: 'isStaff', type: 'boolean', defaultValue: false},
            
            { name: 'isRCG', type: 'boolean', defaultValue: false},
            
            { name: 'isMyBlockCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyBlockUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyBlockReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyBlockDeleteAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isMyEstablishmentCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyEstablishmentUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyEstablishmentReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyEstablishmentDeleteAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isMyOfficeHoursCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyOfficeHoursUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyOfficeHoursReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isMyOfficeHoursDeleteAllowed', type: 'boolean', defaultValue: false},
            
            { name: 'isAllOfficeHoursCreateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllOfficeHoursUpdateAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllOfficeHoursReadAllowed', type: 'boolean', defaultValue: false},
            { name: 'isAllOfficeHoursDeleteAllowed', type: 'boolean', defaultValue: false}            
            
        ]
    }
});

Ext.define('DoctorAppointment.model.UpcomingAppointmentsModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            //{ name: 'id',mapping: 'id',type: 'string' },
            { name: 'patient_name',mapping: 'patient_name',type: 'string' },
            { name: 'patientid',mapping: 'patientid',type: 'string' },
            { name: 'doctorid',mapping: 'doctorid',type: 'string' },
            { name: 'establishmentid',mapping: 'establishmentid',type: 'int' },
            { name: 'drname',mapping: 'drname',type: 'string' },
            { name: 'token_time',mapping: 'token_time',type: 'string' },
            { name: 'appointment_time',mapping: 'appointment_time',type: 'string' },
            { name: 'tokenno',mapping: 'tokenno',type: 'int' },
            { name: 'guid',mapping: 'guid',type: 'string' },
            { name: 'parentuserid',mapping: 'parentuserid',type: 'int' },
            { name: 'appointmantdate',mapping: 'appointmantdate',type: 'string' },
            { name: 'token_expected_date_time',mapping: 'token_expected_date_time',type: 'string' },
            { name: 'blockid',mapping: 'blockid',type: 'string' },
            { name: 'current_appt_visit_time', mapping: 'current_appt_visit_time', type: 'string'}
        ]
    }
});

Ext.define('DoctorAppointment.model.BookAppointmentModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'doctorid',type: 'string' },
            { name: 'drname',type: 'string' },
            { name: 'establishmentid',type: 'string' },
            { name: 'estb',type: 'string' },
            { name: 'area',type: 'string' },
            { name: 'address',type: 'string' },
            { name: 'city',type: 'string' },
            { name: 'state',type: 'string' },
            { name: 'phone',type: 'string' },
            { name: 'latitude',type: 'string' },
            { name: 'longitude',type: 'string' },
            { name: 'speciality',type: 'string' },
            {name: 'created_at', type: 'string'},
            
            // hold value either 'Token' or 'Appointment'
            {name: 'appt_type', type: 'string'},
            
            { name: 'block_id',type: 'int' },
            
            // Token holder
            { name: 'block_time',type: 'string' },
            //{ name: 'st',mapping: 'st',type: 'string' },
            //{ name: 'et',mapping: 'et',type: 'string' },            
            { name: 'token_no',type: 'int' },
            { name: 'token_time',type: 'string' },
            // Appointment holder
            //{ name: 'appointment_id',type: 'int' },
            { name: 'appointment_time',type: 'string' }
            
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorBookedAppointmentsModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            
            
            { name: 'starttime',mapping: 'st',type: 'string' },
            { name: 'endtime',mapping: 'en',type: 'string' },
            { name: 'duration',mapping: 'dur',type: 'string' },
            { name: 'tokenlimit',mapping: 'tklmt',type: 'int' },
            { name: 'docbookings',mapping: 'docbookings',type: 'string'
                [
                    { name: 'name',mapping: 'patient_name',type: 'string' },
                    { name: 'patientid',mapping: 'patientid',type: 'string' },
                    { name: 'guid',mapping: 'guid',type: 'string' },
                    { name: 'medicaldescription',mapping: 'medicaldesc',type: 'string' },
                    { name: 'availabletime',mapping: 'bt',type: 'string' },
                    { name: 'bookedtime',mapping: 'b',type: 'string' },
                    { name: 'expectedtime',mapping: 'et',type: 'string' },
                    { name: 'age',mapping: 'age',type: 'int' },
                    { name: 'sex',mapping: 'sex',type: 'string' },
                    { name: 'tokenno',mapping: 'tkno',type: 'string' },
                    { name: 'remainingtime',mapping: 'rt',type: 'string' },
                    { name: 'currenttime',mapping: 'ct',type: 'string' },
                    { name: 'status', mapping: 'status', type: 'string'}
                ]
            },
           
            { name: 'name',type: 'string' },
            { name: 'patientid',type: 'string' },
            { name: 'guid',type: 'string' },
            { name: 'medicaldescription',type: 'string' },
            { name: 'availabletime',type: 'string' },
            { name: 'bookedtime',type: 'string' },
            { name: 'expectedtime',type: 'string' },
            { name: 'age',type: 'int' },
            { name: 'sex',type: 'string' },
            { name: 'tokenno',type: 'string' },
            { name: 'remainingtime',type: 'string' },
            { name: 'currenttime',type: 'string' },
            { name: 'status',type: 'string' },
            { name: 'isDelayToken', type: 'string'}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.StaffAssignLocationsModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'doctorid',mapping: 'doctorid',type: 'string' },
            { name: 'doctorname',mapping: 'doctorname',type: 'string' },
            { name: 'establishmentid',mapping: 'establishmentid',type: 'string' },
            { name: 'establishmentname',mapping: 'establishmentname',type: 'string' },
            { name: 'locationarray',mapping: 'locationarray',type: 'string' }
        ],
        validations: [
            {type:  'presence', name: 'doctorid', message: "Doctor can't be empty"},
            {type:  'presence', name: 'locationarray', message: "Location must be selected"}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorBlockAvailabilityModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'doctorid',type:'string'},
            { name: 'establishmentid',type:'int'},
            { name: 'exclusionid',type: 'int' },
            { name: 'startdate',type: 'string' },
            { name: 'start_time',type: 'string' },
            { name: 'enddate',type: 'string' },
            { name: 'end_time',type: 'string' },
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorForgotPasswordModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'email',mapping: 'email',type: 'string' }
        ],
        validations: [
            {type:  'presence', name: 'email', message: "Email can't be empty"},
            {type:  'format',   name: 'email', matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message:"Please enter a valid email address"}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorAppointmentTimeSlotModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'start_time',type: 'string' },
            { name: 'end_time',type: 'string' },
            { name: 'blockid',type:'int'},
            { name: 'timeSlotSelctDisplay', type:'string'}
            
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.StaffLocationModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'doctorid',mapping: 'doctorid',type: 'string' },
            { name: 'doctorname',mapping: 'doctorname',type: 'string' },
            { name: 'staffid',mapping: 'staffid',type: 'string' },
            { name: 'establishmentid',mapping: 'establishmentid',type: 'string' },
            { name: 'establishmentname',mapping: 'establishmentname',type: 'string' },
            { name: 'isexisting', type: 'boolean', defaultValue: true}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorLoginModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'email',mapping: 'email',type: 'string' },
            { name: 'password',mapping: 'password',type: 'string' }
        ],
        validations: [
            {type:  'presence', name: 'email', message: "Email can't be empty"},
            {type:  'format',   name: 'email', matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message:"Please enter a valid email address"},
            
            {type:  'presence', name: 'password', message: "Password can't be empty"},
            {type:  'length', name: 'password', message: "Password length can't less then 6 charaters",min: 6}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorLocationsModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'establishmentname',mapping: 'establishmentname',type: 'string' },
            { name: 'state',mapping: 'state',type: 'string' },
            { name: 'city',mapping: 'city',type: 'string' },
            { name: 'area',mapping: 'area',type: 'string' },
            { name: 'addressline1',mapping: 'addressline1',type: 'string' },
            { name: 'addressline2',mapping: 'addressline2',type: 'string' },
            { name: 'zip',mapping: 'zip',type: 'string' },
            { name: 'phone',mapping: 'phone',type: 'string' },
            { name: 'estisactive',mapping: 'estisactive',type: 'boolean' },
            { name: 'advancebookingdays',mapping: 'advancebookingdays',type: 'int' },
            
            { name: 'establishmentid',mapping: 'establishmentid',type: 'string' },
            { name: 'areaid',mapping: 'areaid',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorOfficeHoursAddEditModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'start_time',type: 'string' },
            { name: 'end_time',type: 'string' },
            { name: 'sun',type: 'bool' },
            { name: 'mon',type: 'bool' },
            { name: 'tue',type: 'bool' },
            { name: 'wed',type: 'bool' },
            { name: 'thu',type: 'bool' },
            { name: 'fri',type: 'bool' },
            { name: 'sat',type: 'bool' },
            { name: 'period',type:'int'},
            { name: 'tokenlimit',type:'int'},
            { name: 'type',type:'string'},
            { name: 'blockid',type:'int'},
            { name: 'doctorid',type:'string'},
            { name: 'establishmentid',type:'int'},
            { name: 'effectivedate',type:'string'},
            { name: 'expirydate',type:'string'},
            { name: 'modifySlot', type:'string'}
            
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorRegistrationModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'email',mapping: 'email',type: 'string' },
            { name: 'password',mapping: 'password',type: 'string' },
            { name: 'fname',mapping: 'fname',type: 'string' },
            { name: 'mname',mapping: 'mname',type: 'string' },
            { name: 'lname',mapping: 'lname',type: 'string' },
            { name: 'specialty',mapping: 'specialty',type: 'string' },
            { name: 'state',mapping: 'state',type: 'string' },
            { name: 'city',mapping: 'city',type: 'string' },
            { name: 'area',mapping: 'area',type: 'string' },
            { name: 'establishmentname',mapping: 'establishmentname',type: 'string' },
            { name: 'addressline1',mapping: 'addressline1',type: 'string' },
            { name: 'addressline2',mapping: 'addressline2',type: 'string' },
            { name: 'sex',mapping: 'sex',type: 'string' },
            { name: 'mobile',mapping: 'mobile',type: 'string' },
            { name: 'zip',mapping: 'zip',type: 'string' },
            { name: 'phone',mapping: 'phone',type: 'string' },
            { name: 'degree',mapping: 'degree',type: 'string' },
            { name: 'imageurl',mapping: 'imageurl',type: 'string' },
            { name: 'groupid',mapping: 'groupid',type: 'string' }
            
        ],
        validations: [
            
            {type:  'presence', name: 'email', message: "Email can't be empty"},
            {type:  'format',   name: 'email', matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message:"Please enter a valid email address"},
            
            {type:  'presence', name: 'password', message: "Password can't be empty"},
            {type:  'length', name: 'password', message: "Password length can't less then 6 charaters",min: 6},
            
            {type:  'presence', field: 'fname', message: "First Name can't be empty"},
            {type:  'format',   field: 'fname', matcher: /^[a-zA-Z.]+$/, message:"First Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'format',   field: 'mname', matcher: /^[a-zA-Z.]*$/, message:"Middle Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'presence', field: 'lname', message: "Last Name can't be empty"},
            {type:  'format',   field: 'lname', matcher: /^[a-zA-Z]+$/, message:"Last Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'presence', name: 'specialty', message: "Specialty can't be empty"},
            {type:  'presence', name: 'state', message: "State can't be empty"},
            {type:  'presence', name: 'city', message: "City can't be empty"},            
            
            {type:  'presence', name: 'establishmentname', message: "Clinic Name can't be empty"},
            {type:  'presence', name: 'addressline1', message: "Address Line1 can't be empty"},
            
            {type:  'presence', field: 'sex', message: "Sex can't be empty"},
            
            {type:  'presence', field: 'mobile', message: "Mobile can't be empty"},
            //{type:  'format', field: 'mobile', matcher: /^\d{10}$/, message: "Mobile numeric and 10 charaters only"}
            {type:  'format', field: 'mobile', matcher: /^\d{10,15}$/, message: "Mobile numeric only and length can't below 10 or beyond 15 charaters"},
            
            {type:  'presence', field: 'groupid', message: "Account Type can't be empty"}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.StaffProfileAssignedLocationModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'doctorid',mapping: 'doctorid',type: 'string' },
            { name: 'doctorname',mapping: 'doctorname',type: 'string' },
            { name: 'staffid',mapping: 'staffid',type: 'string' },
            { name: 'staffname',mapping: 'staffname',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.ProfilesModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            
            { name: 'profileid',mapping: 'profileid',type: 'string' },
            //{ name: 'fName',mapping: 'fName',type: 'string' },
            //{ name: 'lName',mapping: 'lName',type: 'string' },
            { name: 'name',mapping: 'name',type: 'string' },            
            { name: 'groupid',mapping: 'groupid',type: 'int' },
            { name: 'groupName',mapping: 'groupName',type: 'string' },
            { name: 'imageurl',mapping: 'imageurl',type: 'string' }
            //{ name: 'groupCode',mapping: 'groupCode',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorAssignedLocationListModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'establishmentid',mapping: 'establishmentid',type: 'string' },
            { name: 'establishmentname',mapping: 'establishmentname',type: 'string' },
            { name: 'blockid',mapping: 'blockid',type: 'string' },
            { name: 'currenttokenno',mapping: 'currenttokenno',type: 'string' },
            { name: 'tokenupdatetime',mapping: 'tokenupdatetime',type: 'string' },
            { name: 'advancebookingdays',mapping: 'advancebookingdays',type: 'int' },
            { name: 'isexisting', type: 'boolean', defaultValue: true}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorLocationsAddEditModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'establishmentname',mapping: 'establishmentname',type: 'string' },
            { name: 'state',mapping: 'state',type: 'string' },
            { name: 'city',mapping: 'city',type: 'string' },
            { name: 'area',mapping: 'area',type: 'string' },
            { name: 'addressline1',mapping: 'addressline1',type: 'string' },
            { name: 'addressline2',mapping: 'addressline2',type: 'string' },
            { name: 'zip',mapping: 'zip',type: 'string' },
            { name: 'phone',mapping: 'phone',type: 'string' },
            { name: 'estisactive',mapping: 'estisactive',type: 'boolean'}   //, defaultValue: true 
        ],
        validations: [
            {type:  'presence', name: 'establishmentname', message: "Clinic Name can't be empty"},
            {type:  'presence', name: 'state', message: "State can't be empty"},
            {type:  'presence', name: 'city', message: "City can't be empty"},            
            {type:  'presence', name: 'addressline1', message: "Address Line1 can't be empty"}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorProfileRegistrationModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'profileid',mapping: 'profileid',type: 'string' },
            { name: 'email',mapping: 'email',type: 'string' },
            { name: 'password',mapping: 'password',type: 'string' },
            { name: 'fname',mapping: 'fname',type: 'string' },
            { name: 'mname',mapping: 'mname',type: 'string' },
            { name: 'lname',mapping: 'lname',type: 'string' },
            { name: 'specialty',mapping: 'specialty',type: 'string' },
            { name: 'sex',mapping: 'sex',type: 'string' },
            { name: 'mobile',mapping: 'mobile',type: 'string' },
            { name: 'degree',mapping: 'degree',type: 'string' },
            { name: 'imageurl',mapping: 'imageurl',type: 'string' },
            { name: 'groupid',mapping: 'groupid',type: 'string' },
            
            { name: 'doctorid',type: 'string' },
            { name: 'addEstablishmentIdsArrayDoctor',type: 'string' },
            { name: 'editEstablishmentIdsArrayDoctor',type: 'string' },
            { name: 'deleteEstablishmentIdsArrayDoctor',type: 'string' },
            { name: 'addEstbStaff',type: 'string' },
            { name: 'deleteEstbStaff',type: 'string' },
            { name: 'isprofile',type: 'string' },
            { name: 'usergroupid',type: 'string' },
            { name: 'parentUserID',type: 'string' },

            
        ],
        validations: [
            
            {type:  'presence', name: 'email', message: "Email can't be empty"},
            {type:  'format',   name: 'email', matcher: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message:"Please enter a valid email address"},
            
            {type:  'presence', name: 'password', message: "Password can't be empty"},
            {type:  'length', name: 'password', message: "Password length can't less then 6 charaters",min: 6},
            
            {type:  'presence', field: 'fname', message: "First Name can't be empty"},
            {type:  'format',   field: 'fname', matcher: /^[a-zA-Z.]+$/, message:"First Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'format',   field: 'mname', matcher: /^[a-zA-Z.]*$/, message:"Middle Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            {type:  'presence', field: 'lname', message: "Last Name can't be empty"},
            {type:  'format',   field: 'lname', matcher: /^[a-zA-Z]+$/, message:"Last Name alphabates only"}, // Change the * to + if you don't want to allow empty matches.
            
            //{type:  'presence', name: 'specialty', message: "Specialty can't be empty"},
            
            {type:  'presence', field: 'sex', message: "Sex can't be empty"},
            
            //{type:  'presence', field: 'mobile', message: "Mobile can't be empty"},
            //{type:  'format', field: 'mobile', matcher: /^\d{10}$/, message: "Mobile numeric and 10 charaters only"}
            //{type:  'format', field: 'mobile', matcher: /^\d{10,15}$/, message: "Mobile numeric only and length can't below 10 or beyond 15 charaters"},
            
            {type:  'presence', field: 'groupid', message: "Account Type can't be empty"}
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.GroupsModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'groupid',mapping: 'groupid',type: 'int' },
            { name: 'groupName',mapping: 'groupName',type: 'string' }
            //{ name: 'groupCode',mapping: 'groupCode',type: 'string' }
        ]
    }
});

Ext.define('DoctorAppointment.model.doctor.DoctorModel', {
    extend: 'Ext.data.Model',

    config: {
        fields: [
            { name: 'drid',mapping: 'drid',type: 'string' },
            { name: 'drname',mapping: 'drname',type: 'string' },
            { name: 'estbid',mapping: 'estbid',type: 'int' },
            { name: 'estb',mapping: 'estb',type: 'string' },
            { name: 'addr',mapping: 'addr',type: 'string' },
            { name: 'area',mapping: 'area',type: 'string' },
            { name: 'city',mapping: 'city',type: 'string' },
            { name: 'state',mapping: 'state',type: 'string' },
            { name: 'ph',mapping: 'ph',type: 'string' },
            { name: 'lat',mapping: 'lat',type: 'string' },
            { name: 'longd',mapping: 'longd',type: 'string' },
            { name: 'spec',mapping: 'spec',type: 'string' },
            { name: 'dt',mapping: 'dt',type: 'string' },
            { name: 'istokenlabelshow',type: 'string' },
            { name: 'isapptlabelshow',type: 'string' },
            { name: 'tkn', mapping: 'tkn', type: 'string'
                [
                    {
                        name: 'bid', mapping: 'bid', type: 'string'
                    },
                    {
                        name: 'tslot', mapping: 'tslot', type: 'string'
                        [
                            //{ name: 'btime',mapping: 'btime',type: 'string' },
                            //{ name: 'tknno',mapping: 'tknno',type: 'int' },
                            //{ name: 'bt',mapping: 'bt',type: 'string' }
                            { name: 'st',mapping: 'st',type: 'string' },
                            { name: 'en',mapping: 'en',type: 'string' },
                            { name: 'tkno',mapping: 'tkno',type: 'int' },
                            { name: 'rt',mapping: 'rt',type: 'int' },
                            { name: 'et',type: 'string' },
                            { name: 'istokenshow',type: 'string' },
                            { name: 'dtk',type: 'string' },
                            { name: 'dst',type: 'string' },
                            { name: 'dldr',type: 'string' }
                        ]
                    }
                ]
            },
            { name: 'appt', mapping: 'appt', type: 'string'
                [
                    {
                        name: 'bid', mapping: 'bid', type: 'string'
                    },
                    {
                        name: 'aslot', mapping: 'aslot', type: 'string'
                        [
                            { name: 'bt',mapping: 'bt',type: 'string' },
                            { name: 'isapptshow',type: 'string' }
                        ]
                    }
                ]
            }
        ]
    }
});

var storage;
var existingDoctorRecord = [];
var previousTextBox='90';
var pictureSource;
var destinationType;
var IsPhotoOnRegister = false;
var accesscontrols;
var IsToken = false;
var nextAvailableTokenNo = '';
var imageData;
var recordsArray = [];
var markers = [];

Ext.define('DoctorAppointment.controller.MainController', {
    extend: 'Ext.app.Controller',
    

    config: {
        
        refs: {
            tabpanel: 'tabpanel',
            
            //************************  Patient ************************ 
            patientContainer: 'patientContainer',   // xtype
            patientContainerHomeList: '#patientHomeList',
            showPatientTakeAppointment: 'patientTakeAppointment',   // xtype
            showPatientWaitingTime: 'patientWaitingTime',   // xtype
            patientHomeButton: '#patientHomeButton',
            
            // *** PatientTakeAppointment ***
            showSearchDoctorAppointment: 'searchDoctorAppointment', // xtype
            btn_known_dr_search: '#btn_known_dr_search',
            stateByPatient : '#stateByPatient',
            cityByPatient: '#cityByPatient',
            
            // *** Patient Upcoming Appointment ***
            upcomingapptlist: '#upcomingapptlist',
            btn_check_upcoming_appt_refresh: '#btn_check_upcoming_appt_refresh',
	    uidtextfield: '#uidtextfield',
	    
	    // *** Patient Cancel Appointment ***
	    cancelAppointment: 'cancelAppointment', // xtype
	    existingPatient: '#existingPatient',
	    btn_update_patient_name: '#btn_update_patient_name',
	    btn_cancel_patient_appointment: '#btn_cancel_patient_appointment',
            
            // *** SearchDoctorAppointment ***
            doctorList: '#doctorlist',
            btnGmapClose: '#btn_gmap_close',
            appointmentToolBarList: '#appointmentToolBarList',
            
            // *** PatientRegistration ***
            patientRegistration: {
                selector: 'patientRegistration',
                xtype: 'patientRegistration',
                autoCreate: true
            },
            btn_submit_patient_registration: '#btn_submit_patient_registration',
            
            
            // *** BookAppointment Details ***
            showBookAppointmentDetail: 'bookAppointment', // xtype
            btn_patient_book_appointment: '#btn_patient_book_appointment',
	    registeredPatient: '#registeredPatient',
            
            
            
            //************************  Doctor *************************
            doctorContainer: 'doctorContainer', // xtype
            doctorContainerHomeList: '#doctorHomeList',
	    btnDoctorHome: '#btnDoctorHome',
	    
            
            // *** Doctor Login ***
            doctorLogin: { // xtype
                selector: 'doctorLogin',
                xtype: 'doctorLogin',
                autoCreate: true
            },
            btn_dr_sign_in: '#btn_dr_sign_in',
            btn_dr_registration: '#btn_dr_registration',
            dr_forgot_pwd: '#dr_forgot_pwd',
            logoutButton: '#logoutButton',
            
            // *** Doctor Registration ***
            doctorRegistration: 'doctorRegistration',   // xtype            
            stateByDoctor : '#stateByDoctor',
            btn_submit_doctor_registration: '#btn_submit_doctor_registration',
            btn_dr_image_upload: '#btn_dr_image_upload',
            
            // *** Doctor Forgot Password ***
            doctorForgotPassword: 'doctorForgotPassword',   // xtype            
            btn_dr_reset_pwd: '#btn_dr_reset_pwd',
            
            // *** Doctor Locations ***
            doctorLocations: 'doctorLocations',   // xtype
	    btnDrLocationAdd: '#btnDrLocationAdd',
	    btnDrLocationDelete: '#btnDrLocationDelete',
	    
	    // *** Doctor Locations Add / Edit***
	    doctorLocationsAddEdit: 'doctorLocationsAddEdit',
	    btn_add_doctor_location: '#btn_add_doctor_location',
	    doctorLocationsList: '#doctorLocationsList',
	    stateByDoctorLocation: '#stateByDoctorLocation',
            
            
            // *** Doctor Profiles ***
            doctorProfiles: 'doctorProfiles',   // xtype
	    doctorProfilesAddEdit: 'doctorProfilesAddEdit', // xtype
	    btnDrProfileAdd: '#btnDrProfileAdd',
	    doctorProfileAccountType: '#doctorProfileAccountType',
	    btn_submit_doctor_profile: '#btn_submit_doctor_profile',
	    doctorProfilesList: '#doctorProfilesList',
	    btn_doctor_assign_location: '#btn_doctor_assign_location',
	    doctorAssignLocationOverlay: {
                selector: 'doctorAssignLocationOverlay',
                xtype: 'doctorAssignLocationOverlay',
                autoCreate: true
            },
	    btn_staff_assign_location: '#btn_staff_assign_location',
	    staffAssignLocationOverlay: {
                selector: 'staffAssignLocationOverlay',
                xtype: 'staffAssignLocationOverlay',
                autoCreate: true
            },
	    selectfield_doctor_assign_location: '#selectfield_doctor_assign_location',
	    btn_doctor_assign_location_done: '#btn_doctor_assign_location_done',
	    doctorAssignedLocations: '#doctorAssignedLocations',
	    btn_staff_assign_location_done: '#btn_staff_assign_location_done',
	    staffAssignedLocations:'#staffAssignedLocations',
	    btn_dr_profile_image_upload: '#btn_dr_profile_image_upload',
	    btnDrProfileDelete: '#btnDrProfileDelete',
	    
            
            // *** Doctor OfficeHours ***
            doctorOfficeHours: 'doctorOfficeHours',   // xtype
	    doctorOfficeHoursList: '#doctorOfficeHoursList',
	    selectDoctorForOfficeHour: '#selectDoctorForOfficeHour',
	    selectLocationForOfficeHour: '#selectLocationForOfficeHour',
	    btnDrOfficeHoursAdd: '#btnDrOfficeHoursAdd',
	    doctorOfficeHoursAddEdit: 'doctorOfficeHoursAddEdit',
	    optionsOfficeHoursToken: '#optionsOfficeHoursToken',
	    startTimePickerOfficeHour: '#startTimePickerOfficeHour',
	    closeTimePickerOfficeHour: '#closeTimePickerOfficeHour',
	    optionsOfficeHoursAppointment: '#optionsOfficeHoursAppointment',
	    txtTokenTime: '#txtTokenTime',
	    txtAppointmentTime: '#txtAppointmentTime',
	    txtNotoken: '#txtNotoken',
	    btnSubmitDoctorOfficeHours: '#btnSubmitDoctorOfficeHours',
	    btnDrOfficeHrsDelete: '#btnDrOfficeHrsDelete',
	    
	    
            // *** Doctor BlockAvailability ***
            doctorBlockAvailability: 'doctorBlockAvailability',   // xtype
	    doctorBlockAvailabilityList: 'doctorBlockAvailability list',
	    doctorBlockAvailabilityAddEdit: 'doctorBlockAvailabilityAddEdit',
	    btnDrAvailabilityAdd: '#btnDrAvailabilityAdd',
	    selectDoctorForBlockAvailability: '#selectDoctorForBlockAvailability',
	    selectLocationForBlockAvailability: '#selectLocationForBlockAvailability',
	    btnSubmitDoctorBlockAvailability: '#btnSubmitDoctorBlockAvailability',
	    startTimePickerBlockAvailability: '#startTimePickerBlockAvailability',
	    endTimePickerBlockAvailability: '#endTimePickerBlockAvailability',
	    btnDrBlockAvailabilityDelete: '#btnDrBlockAvailabilityDelete',
	    
            // *** Doctor AppointmentOrToken ***
            doctorAppointmentOrToken: 'doctorAppointmentOrToken',   // xtype
	    selectDoctorForToken: '#selectDoctorForToken',
	    selectLocationForToken: '#selectLocationForToken',
	    selectSlotForToken: '#selectSlotForToken',
	    selectDateForToken: '#selectDateForToken',
	    btnDrAppointmentOrTokenDelayAdd: '#btnDrAppointmentOrTokenDelayAdd',
	    btnDrAppointmentOrTokenAdd: '#btnDrAppointmentOrTokenAdd',
	    doctorAppointmentOrTokenList: '#doctorAppointmentOrTokenList',
	    doctorMoveAppointmentOverlay: {
                selector: 'doctorMoveAppointmentOverlay',
                xtype: 'doctorMoveAppointmentOverlay',
                autoCreate: true
            },
	    btnDoctorMoveAppointmentDone: '#btn-doctor_move_appointment_done',
            doctorAppointmentOrTokenDelayOverlay: {
                selector: 'doctorAppointmentOrTokenDelayOverlay',
                xtype: 'doctorAppointmentOrTokenDelayOverlay',
                autoCreate: true
            },
	    btnDoctorAppointmenTokenDelayDone: '#btn-doctor_appointment-token_delay_done',
	    selectAppointmentOrTokenForDelay: '#selectAppointmentOrTokenForDelay',
	    selectAppointmentOrTokenDuration: '#selectAppointmentOrTokenDuration',
	    txtAvgDurationForDelay: '#txtAvgDurationForDelay',
	    btnDrAppointmentOrTokenListing: '#btnDrAppointmentOrTokenListing',
	    doctorAppointmentOrTokenListing: 'doctorAppointmentOrTokenListing',   //xtype
	    appointmentDelayContainer: '#appointmentDelayContainer',
	    tokenDelayContainer: '#tokenDelayContainer',
	    bookAppointmentInstant: {
		selector: 'bookAppointmentInstant',
		xtype: 'bookAppointmentInstant',
                autoCreate: true
	    },
	    selectDelayIsBefore: '#selectDelayIsBefore',
	    selectDelayTokenno: '#selectDelayTokenno',
	    txtDelayTokenTime: '#txtDelayTokenTime',
	    btn_doctor_appointment_token_done: '#btn_doctor_appointment_token_done',
	    fieldSetAppointmentOrTokenForAdd: '#fieldSetAppointmentOrTokenForAdd',
	    selectAppttime: '#selectAppttime',
	    panelNextToken: '#panelNextToken',
	    lblNextTokenNo: '#lblNextTokenNo',
	    patientInformation: {
		selector: 'patientInformation',
		xtype: 'patientInformation',
                autoCreate: true
	    },
	    btnDrAppointmentOrTokenRefresh: '#btnDrAppointmentOrTokenRefresh',
	    
	    
            // *** Doctor Approve / Pending ***
            btn_dr_approved: '#btn_dr_approved',
            btn_dr_pending: '#btn_dr_pending'
        },
        
        control: {
            
            tabpanel: {
                activeitemchange: 'onActiveItemChangeTabBar'
            },
            
            //************************  Patient ************************ 
            patientContainer: {
                pop: 'onPatientContainerPop',
                activate: 'onActivatePatient'
            },
            patientContainerHomeList: {
                itemtap: 'showViewPatient',
                disclose : 'showViewPatient'
            },
            
            // Patient Home navigation
            patientHomeButton:{
                tap: 'onPatientHome'
            },
            
            patientWaitingTime:{
                activate: 'onPatientUpcomingApp'
            },
            
            // *** Patient Upcoming Appointment ***
            btn_check_upcoming_appt_refresh: {
                tap: 'onPatientCheckStatusUpcomingAppt'
            },
	    uidtextfield: {
		clearicontap: 'onPatientUpcomingApp',
		keyup: 'onPatientUpcomingApp'
	    },
	    upcomingapptlist:{
		itemtap: 'onUpcomingApptSelect'
	    },
	    
	    // *** Patient Cancel Appointment ***
	    existingPatient: {
		change: 'OnChangeExistingPatient'
	    },
	    btn_update_patient_name: {
		tap: 'onUpdatePatientName'
	    },
	    btn_cancel_patient_appointment: {
		tap: 'onCancelPatientAppointment'
	    },
	    
            
            // *** PatientTakeAppointment ***
            btn_known_dr_search: {
                tap: 'onDoctorSearchTap'
            },
            stateByPatient:{
              change: 'onChangeStateByPatient'  
            },
            cityByPatient:{
              change: 'onChangeCityByPatient'  
            },
            showPatientTakeAppointment:{
                activate: 'onShowPatientTakeAppointment'
            },
            
            // *** SearchDoctorAppointment ***
            doctorList: {
                itemtap: 'onDoctorSelection'
            },
            btnGmapClose: {
                tap: 'onDoctorGmapClose'
            },
            appointmentToolBarList: {
                itemtap: 'onAppointmentDateSelection'
            },
            
            // *** PatientRegistration ***
            patientRegistration:{
              show: 'onShowPatientRegistration'  
            },
            btn_submit_patient_registration: {
                tap: 'onPatientRegistration'
            },
            
            // *** BookAppointment Details ***
            btn_patient_book_appointment: {
                tap: 'onPatientBookAppointment'
            },
	    registeredPatient: {
		change: 'OnChangeRegisteredPatient'
	    },
            
            
            
            
            //************************  Doctor ************************ 
            doctorContainer: {
                pop: 'onDoctorContainerPop',
                activate: 'onActivateDoctor'
            },
            doctorContainerHomeList: {
                itemtap: 'showViewDoctor',
                disclose : 'showViewDoctor',
                painted: 'onActivateDoctorContainerList'
            },
	    
	    // Doctor Home navigation
            btnDoctorHome:{
                tap: 'onDoctortHome'
            },
            
            // Doctor Logout
            logoutButton:{
                tap: 'onDoctorLogout'
            },
            
            // *** Doctor Login ***
            btn_dr_sign_in: {
                tap: 'onDoctorSignIn'
            },
            btn_dr_registration: {
                tap: 'showDoctorRegistration'
            },
            dr_forgot_pwd: {
                tap: 'onDoctorForgotPwd'
            },
            
            // *** Doctor Forgot Password ***
            btn_dr_reset_pwd: {
                tap: 'onDoctorForgotPwdSubmit'
            },
            
            // *** Doctor Registration ***
            stateByDoctor:{
              change: 'onChangeStateByDoctor'  
            },
            
            btn_submit_doctor_registration:{
                tap: 'onDoctorRegistration'
            },
            btn_dr_image_upload:{
                tap: 'onDoctorTakeImage'
            },
            
	    // *** Doctor Locations ***
	    btnDrLocationAdd: {
		tap: 'onDoctorLocationAdd'
	    },
	    btnDrLocationDelete: {
		tap: 'onDoctorLocationDelete'
	    },	    
	    doctorLocationsList:{
		itemtap: 'onDoctorLocationSelect'
	    },
	    
	    // *** Doctor Locations Add / Edit***
	    btn_add_doctor_location:{
                tap: 'onAddDoctorLocation'
            },
	    doctorLocations:{
		activate: 'onActivateDoctorLocations'
	    },
	    stateByDoctorLocation:{
		change: 'onChangeStateByDoctorLocation'  
	    },
	    
	    // *** Doctor Block Availability ***
	    doctorBlockAvailability:{
		activate: 'onActivateDoctorBlockAvailability'
	    },
	    doctorBlockAvailabilityAddEdit:{
		activate: 'onActivateDoctorBlockAvailabilityAddEdit'
	    },
	    btnDrAvailabilityAdd: {
		tap: 'onDrBlockAvailabilityAdd'
	    },
	    doctorBlockAvailabilityList: {
		itemtap: 'onDoctorBlockAvailabilitySelect'
	    },
            selectDoctorForBlockAvailability: {
		change: 'onSelectDoctorForBlockAvailability'
	    },
	    selectLocationForBlockAvailability: {
		change: 'onSelectLocationForBlockAvailability'
	    },
	    btnSubmitDoctorBlockAvailability: {
		tap: 'onClick_SubmitDrBlockAvailability'
	    },
	    btnDrBlockAvailabilityDelete: {
		tap: 'onDoctorBlockAvailabilityDelete'
	    },	    
	    
	    // *** Doctor Office Hours ***
	    doctorOfficeHours:{
		activate: 'onActivateDoctorOfficeHours'
	    },
	    doctorOfficeHoursAddEdit:{
		activate: 'onActivateDoctorOfficeHoursAddEdit'
	    },
	    selectDoctorForOfficeHour:{
		change: 'onSelectDoctorForOfficeHour'
	    },
	    selectLocationForOfficeHour:{
		change: 'onSelectLocationForOfficeHour'
	    },
	    btnDrOfficeHoursAdd: {
		tap: 'onDrOfficeHoursAdd'
	    },
	    doctorOfficeHoursList: {
		itemtap: 'onDrOfficeHoursSelect'
	    },
	    optionsOfficeHoursToken: {
		check: 'onOfficeHoursTokenChecked'
	    },
            optionsOfficeHoursAppointment: {
		check: 'onOfficeHoursAppointmentChecked'
	    },
	    btnSubmitDoctorOfficeHours: {
		tap: 'onClick_SubmitDoctorOfficeHours'
	    },
	    btnDrOfficeHrsDelete: {
		tap: 'onDoctorOfficeHrsDelete'
	    },	    
	    
	    // *** Doctor Profiles ***
	    btnDrProfileAdd: {
		tap: 'onDoctorProfileAdd'
	    },
	    doctorProfiles:{
		activate: 'onActivateDoctorProfiless'
	    },
	    doctorProfileAccountType:{
		change: 'onChangeDoctorProfileAccountType'
	    },
	    btn_submit_doctor_profile:{
		tap: 'onDoctorProfileRegistration'
	    },
	    doctorProfilesList:{
		itemtap: 'onDoctorProfileSelect'
	    },
	    btn_doctor_assign_location:{
		tap: 'onDoctorAssignLocationButtonTap'
	    },
	    btn_staff_assign_location:{
		tap: 'onStaffAssignLocationButtonTap'
	    },
	    selectfield_doctor_assign_location:{
		change: 'onChangeDoctorAssignLocation'
	    },
	    btn_doctor_assign_location_done:{
		tap: 'onDoctorAssignLocationDone'
	    },
	    doctorAssignedLocations: {
                itemtap: 'onRemoveDoctorAssignedLocation'
            },
	    btn_staff_assign_location_done:{
		tap: 'onStaffAssignLocationDone'
	    },
	    staffAssignedLocations: {
		itemtap: 'onRemoveStaffAssignedLocations'
	    },
	    btn_dr_profile_image_upload:{
		tap: 'onDoctorTakeImage'
	    },
	    btnDrProfileDelete: {
		tap: 'onDoctorProfileDelete'
	    },	    
	    
	    // *** Temporary Doctor Approve / Pending ***
            btn_dr_approved:{
                tap: 'onDoctorApprove'
            },
            btn_dr_pending:{
                tap: 'onDoctorPending'
            },
	    
	     // *** Doctor AppointmentOrToken ***
            btnDrAppointmentOrTokenDelayAdd: {
		tap: 'onAddAppointmentOrTokenDelay'
	    },
	    selectDoctorForToken:{
		change: 'onChangeDoctorForToken'
	    },
	    selectLocationForToken:{
		change: 'onChangeLocationForToken'
	    },
	    doctorAppointmentOrTokenList: {
		itemtaphold: 'appointmentListItemTapHold',
		itemtap: 'onCheckboxChecked'
	    },
	    btnDoctorMoveAppointmentDone: {
		tap: 'onMovedAppointment'
	    },
	    btnDoctorAppointmenTokenDelayDone: {
		tap: 'onAppointmentOrTokenDelayDone'
	    },
	    btnDrAppointmentOrTokenListing: {
		tap: 'onShowApptOrTokenList'
	    },
	    btnDrAppointmentOrTokenAdd: {
		tap: 'onAddAppointmentOrToken'
	    },
	    btn_doctor_appointment_token_done: {
		tap: 'onDoneDrAppointmentOrToken'
	    },
	    btnDrAppointmentOrTokenRefresh: {
		tap: 'onRefreshApptOrTokenList'
	    }
        }
        
    },
    
    launch: function() {
        //this.checkConnectionStatus();
        this.setActiveTab(); // to show doctor or patient screen at start up after registration on behalf of uid or doctorid
	
	// this will load AccessControlStore with user access controls while launch app
	var doctorid = storage.getItem("doctorid");
        var doctorstatus = parseInt(storage.getItem("doctorstatus"));
	if(!Ext.isEmpty(doctorid) && doctorstatus != 0){
	    var result_accesscontrols = Ext.JSON.decode(storage.getItem("accesscontrols"));
	    //console.log(result_accesscontrols);
	    if(!Ext.isEmpty(result_accesscontrols)){
		Ext.getStore('AccessControlStore').setData(result_accesscontrols);
		accesscontrols = '';
		accesscontrols = Ext.getStore('AccessControlStore').getData().items[0].data;
		//console.log("Launch: ",accesscontrols);
	    }
	}
	Ext.getStore('DoctorStore').addListener('load', this.onDoctorStoreLoad, this);
    },
    
    init: function(){
	document.addEventListener("deviceready", function(){
			pictureSource=navigator.camera.PictureSourceType;
			destinationType=navigator.camera.DestinationType;
		}, true);
	
	setLocalStorage();
    },    
    
    checkConnectionStatus: function() {
        isOnline = false;
	if(navigator.onLine){
	    isOnline = navigator.onLine;
	}else{
	    isOnline = navigator.onLine;
	}
        //console.log(isOnline);
	//isOnline = true;
        return isOnline;
    },
    
    /**
     *This method to set active tab either Doctor or Patient on behalf of their registration (respective id)
     */
    setActiveTab: function(){
     
    var doctorid =  storage.getItem("doctorid");
    var doctorstatus = parseInt(storage.getItem("doctorstatus"), 10);
    if(!Ext.isEmpty(doctorid) && doctorstatus != 0){
	this.getTabpanel().setActiveItem(1);
    }else{
	if(storage.getItem("uid") != ''){
	    this.getTabpanel().setActiveItem(0);
	}else if(storage.getItem("doctorid") != ''){
	    this.getTabpanel().setActiveItem(1);
	}
    }
      

    },
    
    onDoctorStoreLoad: function(drobj, records, successful, operation, eOpts){
	//if(operation.getResultSet().getTotal() == null){
	//    Ext.Viewport.setMasked({
	//	xtype: 'loadmask',
	//	message: DoctorAppointment.util.Constant.getLabel_Loading_Appointments()
	//    });
	//    setTimeout(function() {
	//	Ext.Viewport.setMasked(false); // hide the load screen
	//    }, 1500);  
	//}
	
	if(operation.getResultSet() != null){
	var ctime = operation.getResultSet().getMessage();
	
	var patientTakeAppointmentStore = Ext.getStore('PatientTakeAppointmentStore').getNewRecords()[0].data;
	//console.log(patientTakeAppointmentStore); // to see what criteria selected by patient
        var search_appt_date = Ext.Date.format(new Date(patientTakeAppointmentStore.searchdate), Ext.Date.patterns.ISO8601Short);
	// This method will show array of multiple token slots on UI with calculation
	this.showDoctorAppointmentOrToken(records, search_appt_date, ctime, operation);
    }
	
	// to show current search doctor result on navigation bar title
	//if(this.showSearchDoctorAppointment){
	//    //console.log(operation.getResultSet().getTotal());
	//    if(operation.getResultSet().getTotal() != null)
	//	this.getPatientContainer().getNavigationBar().titleComponent.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Search_Result() + ' ('+ operation.getResultSet().getTotal() + ')'  + '</font>');
	//}
    },
    
    onActiveItemChangeTabBar: function( Container, newActiveItem, oldActiveItem, eOpts) {
        //console.log(newActiveItem.getId());
        //console.log(newActiveItem);
        //console.log(oldActiveItem);
        //console.log(eOpts);
        
    },
    // to show error message over screen by passing error message
    showErrorMsg: function(err_msg){
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            indicator: false,
            message: err_msg
        });

        setTimeout(function() {
            Ext.Viewport.setMasked(false); // hide the load screen
        }, 1500);         
    },
    // to show error message as dialog box by passing error message
    showErrorMsgAlert: function(err_title, err_msg){
        Ext.Msg.alert(err_title, err_msg);         
    },    
    
    //******************************************** Patient Start********************************************
    onActivatePatient: function() {
        //console.log("onActivatePatient");       
    },
    
    onPatientContainerPop: function(list, index, element, record){
        if(element == 2){
            // to show tab bar while coming from child pages
            this.getTabpanel().getTabBar().show();
            
            // to hide logout button when doctorid empty and status not approved
            Ext.ComponentQuery.query('#patientHomeButton')[0].hide();
	    
	    // to show upcoming appointment from device save UID of patient after resetting the UID textfield value
	    if(Ext.ComponentQuery.query('#uidtextfield')[0] != undefined)
		Ext.ComponentQuery.query('#uidtextfield')[0].setValue('');
        }else{
            this.showPatientHomeButton();
        }
    },
    
    // on behalf of patient id patient home button show or hide
    showPatientHomeButton: function(){
        //show
        Ext.ComponentQuery.query('#patientHomeButton')[0].show();                   
    },
    
    showViewPatient: function(list, index, element, record){
        //console.log("showViewPatient: " + index);
        //console.log("showViewPatient Title: " + record.get('title') );
        
        // to hide tab bar while going to child pages
        this.getTabpanel().getTabBar().hide();
        this.showPatientHomeButton();
        
        if(index == 0){
            
            if (!this.showPatientTakeAppointment) {
                this.showPatientTakeAppointment = Ext.widget('patientTakeAppointment');
            }
            this.showPatientTakeAppointment.setTitle('<font size = \'3\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Form_Title() + '</font>');
            // Push the patientTakeAppointment view into the navigation view
            this.getPatientContainer().push(this.showPatientTakeAppointment);
            
        }else if(index == 1){
            
            if (!this.showPatientWaitingTime) {
                this.showPatientWaitingTime = Ext.widget('patientWaitingTime');
            }
            this.showPatientWaitingTime.setTitle('<font size = \'3\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Heading_Upcoming_Appt() + '</font>');
            // Push the patientWaitingTime view into the navigation view
            this.getPatientContainer().push(this.showPatientWaitingTime);
            
            // to clear UID text field to search again
            Ext.ComponentQuery.query('#uidtextfield')[0].setValue('');
            
        }
        
        //enable selection onItemDisclosure while select row in list
        list.select(record, true, true );
        
    },
    
    // Allow patient to jump back to home screen
    onPatientHome: function(btn, e, options) {
        this.getPatientContainer().reset(); //go to home page
    },    
    
    
    // *** PatientTakeAppointment Start ***
    /**
     * this method will work whenever PatientTakeAppointmen (search doctor page) activate or show to patient
     */
    onShowPatientTakeAppointment: function(){
        //console.log("onShowPatientTakeAppointment");
        // if N/W stopped previously and receive meanwhile application then load StateStore and SpecialtyStore
        // as well as show added new records in DB also
	//Ext.getStore('StateStore').removeAll();
        var stateStore = Ext.getStore('StateActiveStore');
        stateStore.load();

	Ext.getStore('SpecialtyActiveStore').removeAll();
        var specialtyStore = Ext.getStore('SpecialtyActiveStore');
        specialtyStore.load();
	
	// if city is not null and mean while any doctor registered into any city so reload the area store again via city.
	if(this.getCityByPatient().getValue() != null){
	    //console.log(this.getCityByPatient().getValue());
            this.loadAreaStore(this.getCityByPatient().getValue());
        }
        
        // reset the value of SearchDate datepicker field on Search Doctor Appointment
        Ext.ComponentQuery.query('#searchDate')[0].reset();
    },
    
    // when user change date to find dr. appointment
    onSearchDateValidate: function(pickerFormateDate) {
	   var isSearchDateValidate = false;
           var today = new Date();
           
           var todayFormateDate = Ext.Date.format(today, Ext.Date.patterns.ISO8601Short);
           
          // date selection should not below today date
           if(pickerFormateDate == todayFormateDate || pickerFormateDate > todayFormateDate){
		isSearchDateValidate = true;
           }else{
		Ext.ComponentQuery.query('#searchDate')[0].setValue(today);//set today
                Ext.getCmp('errordate').setHtml(DoctorAppointment.util.Constant.getLabel_Form_Search_Date_Err_Msg1());
                Ext.getCmp('errordate').show();
		isSearchDateValidate = false;
           }
           
           
           var current_year = today.getFullYear();
           var current_month = today.getMonth();
           var current_day = today.getDate();
	   
	   var selected_year =  parseInt(pickerFormateDate.split("-")[0], 10);
	   var selected_month = parseInt(pickerFormateDate.split("-")[1], 10);
	   var selected_day = parseInt(pickerFormateDate.split("-")[2], 10);
           
           var current_date = Ext.Date.format(new Date(current_year, current_month + 3, current_day), Ext.Date.patterns.ISO8601Short);
	   var selected_date = Ext.Date.format(new Date(selected_year, selected_month - 1, selected_day), Ext.Date.patterns.ISO8601Short);
           
           // Only 3 months date selection to get doctor appointment in Dr. search
           if(selected_date > current_date){
                Ext.ComponentQuery.query('#searchDate')[0].setValue(today);//set today
                Ext.getCmp('errordate').setHtml(DoctorAppointment.util.Constant.getLabel_Form_Search_Date_Err_Msg2());
                Ext.getCmp('errordate').show();
		isSearchDateValidate = false;
           }
           
          // to hide date error label after 3 seconds automatically
           setTimeout(function(){
               Ext.getCmp('errordate').hide();
           },3000);
	   
	   return isSearchDateValidate;
    },
    
    onDoctorSearchTap: function(btn, e, options) {

        // if N/W available
        if(this.checkConnectionStatus()){
            
            var patientTakeAppointmentForm = this.getShowPatientTakeAppointment();
            
            var values = patientTakeAppointmentForm.getValues();
            //console.log(values);
            
            
            var change_date_value = Ext.Date.format(values.searchdate, Ext.Date.patterns.ISO8601Short);
            //console.log(change_date_value); // yyyy-mm-dd (e.g. 2013-03-08)
            
            var appointmentModel = Ext.create('DoctorAppointment.model.PatientTakeAppointmentModel', {
                state: values.state,
                city: values.city,
                area: values.area,
                specialty: values.specialty,
                fname: values.fname,
		lname: values.lname,
                searchdate: change_date_value
                //date: values.date
            });
            
            // state, city & searchdate can not be empty in selection so validate it
            var errs = appointmentModel.validate(),
            //var errs = true,                            // comment it while need validation
            msg = '';
            
            if (!errs.isValid()) {
            //if (!errs) {                                // comment it while need validation
                errs.each(function (err) {
                    msg += err.getMessage() + '<br/>';
                }); // each()
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
            }
            else{
		
		    // validate if previous date is selected
		    if(!this.onSearchDateValidate(change_date_value)){
			return;
		    }
                
                    patientTakeAppointmentForm.updateRecord(appointmentModel, true);  
                    
                    // set appointmentModel values to PatientTakeAppointmentStore regarding to send extra params to server by DoctorStore
                    Ext.getStore('PatientTakeAppointmentStore').setData(appointmentModel);
                    
                    // Call to server to get Dr. appointment list
                    this.submitPatientTakeAppointment(appointmentModel, patientTakeAppointmentForm);
                    
                    // to show patient home buttin on behalf of UID
                    this.showPatientHomeButton();
                    
                    // to hide doctor map on doctor result list if patient forgot to close
                    var doctor_map = Ext.ComponentQuery.query('#map_doctor_id')[0];
                    //console.log(doctor_map);
                    if(doctor_map != undefined){
                        if (!doctor_map.isHidden()) {
                            this.onDoctorGmapClose();
                        }
                    }
            }
        }else{
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        }
    },
    
    submitPatientTakeAppointment: function(appointmentModel, patientTakeAppointmentForm) {

        // Mask the form
        patientTakeAppointmentForm.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Searching()
        });
        
        // this method will load CityStore with cities name by passing selected stateId
        //store.load() function cleans up prev data
        
        // by replace appointmentModel.get('drname') with search_appt_date variable while sending params to server
        var search_appt_date = Ext.Date.format(patientTakeAppointmentForm.getValues().searchdate, Ext.Date.patterns.ISO8601Short);
        //console.log(search_appt_date);
	recordsArray = [];
        Ext.getStore('DoctorStore').removeAll();
	Ext.getStore('DoctorStore').currentPage = 1; //  If we reset the currentPage config back to 1 on your store, it will just assume the start is back to 0 and the page of course is 1
        Ext.getStore('DoctorStore').load({
            // params will be set up to be the property by which we tell the server to query the data.
            params: {
                        state: appointmentModel.get('state'),
                        city: appointmentModel.get('city'),
                        area: appointmentModel.get('area'),
                        specialty: appointmentModel.get('specialty'),
                        fname: appointmentModel.get('fname'),
			lname: appointmentModel.get('lname'),
                        searchdate: search_appt_date
                    }, // actual
            scope: this,
            callback : function(records, operation, success) {
                patientTakeAppointmentForm.setMasked(false); // hide the load screen

                //console.log(records);
                //console.log(operation); 
                //console.log(success);
                //console.log(records);
                //console.log(operation.getRequest().getParams());
                
                
                if(success){
                    //console.log('JSON returned:::::::::::::');
                    //console.log(operation.getResponse().responseText);
                    
                    // push the Doctor search result page and store filled in doctorlist on doctor search result view
                    
                    // push the Doctor search result page
                    if (!this.showSearchDoctorAppointment) {
                        this.showSearchDoctorAppointment = Ext.widget('searchDoctorAppointment');
                    }
                    this.showSearchDoctorAppointment.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Search_Result() + ' ('+ operation.getResultSet().getTotal() + ')'  + '</font>');
                    // Push the patientTakeAppointment view into the navigation view
                    this.getPatientContainer().push(this.showSearchDoctorAppointment);
		    
		    //var ctime = operation.getResultSet().getMessage();
		    
		    // This method will show array of multiple token slots on UI with calculation
		    //this.showDoctorAppointmentOrToken(records, search_appt_date, ctime);	    
                }
                else{
                    var err_message = '';
                    
                    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
                    }
                    //this.showErrorMsg(err_message);
                    var err_title = ''; this.showErrorMsgAlert(err_title, err_message);
                }
            }           
        });
    },
    // This method will show array of multiple token and appointment slots on UI with calculation
    // Called from 3 different ways:
    // 1.) While search doctors from search criteria on patient screen
    // 2.) Next (Forward) date selection from doctor search result screen
    // 2.) Previous (Back) date selection from doctor search result screen
    showDoctorAppointmentOrToken: function(records, search_appt_date, ctime, operation){
	try{
	    if(records.length != 0 ){
		Ext.Array.each(records, function(itemrecord){
		    //console.log(itemrecord);
		    // to get array of multiple token slots
		    if(itemrecord.data != undefined && itemrecord.data.tkn != undefined){
			//console.log(itemrecord.data.tkn);
			var isTokenLabelShow = 'false';
			Ext.Array.each(itemrecord.data.tkn, function(item){
			    item.tslot[0].et = getExpectedTime(item.tslot[0],ctime,search_appt_date);
			    item.tslot[0].istokenshow = isTokenShow(item.tslot[0],ctime,search_appt_date);
			    if(item.tslot[0].istokenshow == 'true'){
				isTokenLabelShow = 'true';
			    }
			});
			itemrecord.data.istokenlabelshow = isTokenLabelShow;				
		    }
		    // to get array of multiple appointment slots
		    if(itemrecord.data != undefined && itemrecord.data.appt != undefined){
			//console.log(itemrecord.data.appt[0].aslot);
			var isAppointmentLabelShow = 'false';
			Ext.Array.each(itemrecord.data.appt, function(apptObj){
			    Ext.Array.each(apptObj.aslot, function(item){		    
				item.isapptshow = isAppointmentShow(item,ctime,search_appt_date);
				if(item.isapptshow == 'true'){
				    isAppointmentLabelShow = 'true';
				}
			    })
			});
			itemrecord.data.isapptlabelshow = isAppointmentLabelShow;				
		    }		    
		    //console.log(itemrecord);
		});
		Ext.Array.each(records, function(item){
		    recordsArray.push(item);
		});
		if(Ext.getCmp('doctorlist') != undefined)
		    Ext.getCmp('doctorlist').getStore().setData(recordsArray);
		//console.log(recordsArray);
	    }else{
		var resultResponse = Ext.JSON.decode(operation.getResponse().responseText);
		//Ext.getCmp('doctorlist').setEmptyText(resultResponse.message);
		if(Ext.getCmp('doctorlist') != undefined)
		    Ext.getCmp('doctorlist').setEmptyText('<center><font size="3" color="#333333">' + resultResponse.message + '</font></center>');
	    }
	}catch(e){
	    console.log(e.message);
	}	
    },
    
    onChangeStateByPatient: function(selectBox, newValue, oldValue, eOpts){
	
	Ext.getStore('CityDoctorStore').removeAll();
	Ext.getStore('AreaStore').removeAll();
        
        var stateId_Value = selectBox.getValue();
        //console.log('onChangeStateByPatient ' + stateId_Value + " " +  newValue + " " + oldValue);
        
        
        // this method will load CityStore with cities name by passing selected stateId
        //store.load() function cleans up prev data
        
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Loading_Cities()
        });        
        
        Ext.getStore('CityDoctorStore').load({
            params : { stateId : stateId_Value}, // passed selected stateId
            scope: this,
            callback : function(records, operation, success) {
                    Ext.Viewport.setMasked(false); // hide the load screen
        
                //console.log(records);
                //console.log(operation); 
                //console.log(success);
                //console.log(records);
                
                if(success){
                    //console.log('JSON returned:::::::::::::');
                    //console.log(operation.getResponse().responseText);
                    //this.getCityByPatient().setDisabled(false); // enable the city selectbox
                }
                else{
                    //console.log(success);
                    var err_message = '';
                    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        //err_message = operation.getRequest().getProxy().getReader().rawData.error;
                    }
                    //this.showErrorMsg(err_message);
		    Ext.getStore('CityDoctorStore').removeAll();
		    Ext.getStore('AreaStore').removeAll();
                }
            }           
        });
    },
    /**
     * load areas while patient change city select box
     */
    onChangeCityByPatient: function(selectBox, newValue, oldValue, eOpts){
        //console.log('onChangeCityByPatient ' + selectBox.getValue() + " " +  newValue + " " + oldValue);
        if(this.getCityByPatient().getValue() != null){
            this.loadAreaStore(selectBox.getValue());
        }
    },
    
    /**
     * This method will be called first time while patient change state name and later on by change city select box
     */
    loadAreaStore: function(cityId){
        //console.log("loadAreaStore");
	Ext.getStore('AreaStore').removeAll();
        Ext.getStore('AreaStore').getProxy().setExtraParams({
            cityId: cityId
        });
        Ext.getStore('AreaStore').load();
    },
    
    // *** PatientTakeAppointment End ***
    
    
    // *** Patient Upcoming Appointment Start ***
    
    /**
     * this method will call while user tap on refresh button with pass UID
     */       
    onPatientCheckStatusUpcomingAppt: function(btn, e, eOpts){
        //console.log("onPatientCheckStatusUpcomingAppt");
        var uid_textfield_value = Ext.ComponentQuery.query('#uidtextfield')[0].getValue();
        if(!Ext.isEmpty(uid_textfield_value)){
            this.getPatientUpcomingAppByUid(uid_textfield_value);
        }else{
	    this.onPatientUpcomingApp();
	}
    },
    
    /**
     * this method will call while upcoming page active
     */    
    onPatientUpcomingApp: function(){
	if(Ext.isEmpty(Ext.ComponentQuery.query('#uidtextfield')[0].getValue())){
	    var uid = storage.getItem('uid');
	    if(!Ext.isEmpty(uid)){
		this.getPatientUpcomingAppByUid(uid);
	    }else{
		Ext.ComponentQuery.query('#upcomingapptlist')[0].hide();
	    }
	}
    },
    
    /**
     * this method will retrieve patient upcoming appointment by passing UID
     */
    getPatientUpcomingAppByUid: function(uid){
	
	//show to hidden check status upcoming appointment list
	Ext.ComponentQuery.query('#upcomingapptlist')[0].show();
	
	if(this.checkConnectionStatus()){
    
	    // Mask the upcoming list
	    Ext.ComponentQuery.query('#upcomingapptlist')[0].setMasked({
		xtype: 'loadmask',
		message: DoctorAppointment.util.Constant.getLabel_Loading_Appointments()
	    });     
        
	    Ext.getStore('UpcomingAppointmentsStore').removeAll();
	    Ext.getStore('UpcomingAppointmentsStore').load({
		params : { uid : uid}, // passed the unique id of patient
		scope: this,
		callback : function(records, operation, success) {
		    // Unmask the upcoming list
		    Ext.ComponentQuery.query('#upcomingapptlist')[0].setMasked(false);
		    if(success){
			//console.log('JSON returned:::::::::::::');
			//console.log(operation.getResponse().responseText);
			//console.log(records);
		    }
		    else{
			//console.log(success);
			var err_message = '';
			if(operation.exception){
			    err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			    Ext.ComponentQuery.query('#upcomingapptlist')[0].setEmptyText('<center><font size="3" color="#000">' + err_message + '</font></center>');
			}else{
			    err_message = operation.getRequest().getProxy().getReader().rawData.error;
			    Ext.ComponentQuery.query('#upcomingapptlist')[0].setEmptyText('<center><font size="3" color="#000">' + err_message + '</font></center>');
			}
			//this.showErrorMsg(err_message);
			
		    }
		}           
	    });
        }
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        }  
    },
    
    onUpcomingApptSelect: function(list, index, element, record, evt){
	//console.log(record);
	// Push the CancelAppointment view into the navigation view
	if (!this.cancelAppointment) {
	    this.cancelAppointment = Ext.widget('cancelAppointment');
	}
	this.cancelAppointment.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Cancel_Appointment() + '</font>');
	this.getPatientContainer().push(this.cancelAppointment);
	
	Ext.ComponentQuery.query('#lblDoctorNameCancelAppt')[0].setHtml(DoctorAppointment.util.Constant.getLabel_DR() + DoctorAppointment.util.Constant.getEmptyString() + record.getData().drname);
	Ext.ComponentQuery.query('#lblPatientNameCancelAppt')[0].setHtml(record.getData().patient_name);
	
	// to show parent and it's childs into selectfield
	var patientid = '';
	if(Ext.isEmpty(record.data.parentuserid)){
	    patientid = record.data.patientid;
	}else{
	    patientid = record.data.parentuserid;
	}
	
	// to load patient list store on book appointment form
	Ext.getStore('RegisteredPatientStore').removeAll();
	
	Ext.getStore('RegisteredPatientStore').getProxy().setExtraParams({
	    patientid:patientid
	});
	//store.load() function cleans up prev data
	//Ext.getStore('RegisteredPatientStore').load();
	Ext.getStore('RegisteredPatientStore').load({
	    scope: this,
            callback : function(records, operation, success) {
		Ext.Viewport.setMasked(false);
		if (success) {
		    this.cancelAppointment.getFields('existingpatientid').setValue(record.data.patientid);
		    this.cancelAppointment.getFields('parentUserID').setValue(record.data.parentuserid);
		    this.cancelAppointment.getFields('guid').setValue(record.data.guid);
		    this.cancelAppointment.getFields('patientid').setValue(record.data.patientid);
		    this.cancelAppointment.getFields('doctorid').setValue(record.data.doctorid);
		    this.cancelAppointment.getFields('establishmentid').setValue(record.data.establishmentid);
		    var appt_date = Ext.Date.format(new Date(record.data.appointmantdate), Ext.Date.patterns.ISO8601Short);
		    this.cancelAppointment.getFields('appt_date').setValue(appt_date);
		    this.cancelAppointment.getFields('token_time').setValue(record.data.token_time);
		    this.cancelAppointment.getFields('appointment_time').setValue(record.data.appointment_time);
		    this.cancelAppointment.getFields('blockid').setValue(record.data.blockid);
		    this.cancelAppointment.getFields('token_no').setValue(record.data.tokenno);
		}
		else {
		    var err_message = '';
		    if (operation.exception) {
			err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
		    }
		    else {
			err_message = operation.getRequest().getProxy().getReader().rawData.error;
		    }
		    this.showErrorMsg(err_message);
		}
	    }
	});	
    },
    
    // *** Patient Upcoming Appointment  End ***
    
    // *** Patient Cancel Appointment Start ***
    
    OnChangeExistingPatient: function(selectBox, newValue, oldValue, eOpts){
	//console.log('OnChangeRegisteredPatient');
	var RegisteredPatientStoreItems = Ext.getStore('RegisteredPatientStore').getData().items;
	var RegisteredPatientId = selectBox.getValue();
	//console.log('showRegisteredPatient(): ' + RegisteredPatientId);
	var registeredPatientStoreData = '';
	 Ext.Object.each(RegisteredPatientStoreItems, function(key, valuedata, myself) {
	    if(RegisteredPatientId == valuedata.data.existingPatientID){
		registeredPatientStoreData = valuedata.data
                  Ext.getCmp('parentUserID').setValue(valuedata.data.parentuserid);
                  Ext.getCmp('patientid').setValue(valuedata.data.existingPatientID);		
	    }
	});
	 
	//console.log(registeredPatientStoreData);
	
	this.cancelAppointment.getFields('fname').setValue(registeredPatientStoreData.fname);
        this.cancelAppointment.getFields('lname').setValue(registeredPatientStoreData.lname);

        this.cancelAppointment.getFields('age').setValue(registeredPatientStoreData.age);
	if(registeredPatientStoreData.sex == 'Male'){
              Ext.getCmp('radio_sex_maleCancelAppt').setChecked(true);
	}
	else{
              Ext.getCmp('radio_sex_femaleCancelAppt').setChecked(true);
	}	
	
    },    
    
    onUpdatePatientName: function(btn, e, options) {
	if(this.checkConnectionStatus()){
	    var patientName = Ext.getCmp('lblPatientNameCancelAppt').getHtml();
	    Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_Update_Patient_Name() + patientName,
		function(buttonId) {
		   if (buttonId === 'yes') {
		 	this.submitUpdatePatientInfo();
		   }
		},
		this // scope of the controller 
	    );
	    }
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 	
    },

    onCancelPatientAppointment: function(btn, e, options) {
	if(this.checkConnectionStatus()){
	    var patientName = Ext.getCmp('lblPatientNameCancelAppt').getHtml();
	    var selectedPatientName = Ext.getCmp('existingPatient').getRecord().data.name;
	    if(patientName != selectedPatientName){
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), patientName + DoctorAppointment.util.Constant.getMsg_Wrong_Select_Patient_Name());
		return;
	    }
	    
	    Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_Delete_Patient_Name() + patientName,
		function(buttonId) {
		   if (buttonId === 'yes') {
		    this.submitCancelPatientAppointment();
		   }
		},
		this // scope of the controller 
	    );
	}
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 
    },    
    
    submitCancelPatientAppointment: function(){
        var requestUrl = DoctorAppointment.util.Constant.getCancel_Appointment_Patient_Url();
        var encodedUrl = encodeURI(requestUrl);
	
	var values = this.cancelAppointment.getValues();
	//console.log(values);
	
        // Mask the Viewport
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });	
    
        Ext.Ajax.request({
            params: {
                    parentUserID: values.parentUserID,
                    patientid: values.patientid,
                    fname: values.fname,
                    lname: values.lname,
		    guid: values.guid,
		    doctorid: values.doctorid,
		    establishmentid: values.establishmentid,
		    appt_date: values.appt_date,
		    token_time: values.token_time,
		    appointment_time: values.appointment_time,
		    blockid: values.blockid,
		    token_no: values.token_no,
		    status: DoctorAppointment.util.Constant.getDefault_Cancel_Appointment_Status()
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
		
                // unmask the view port
                Ext.Viewport.setMasked(false);
            
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);

                if(resultResponse.success){
                    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				this.getPatientContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }
            },
            failure: function (msg) {
                    //console.log("Failur:->");
                //console.log(msg.status + ', ' + msg.statusText);
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
            },
            scope: this
        });        
    },    
    
    submitUpdatePatientInfo: function(){
        var requestUrl = DoctorAppointment.util.Constant.getUpdate_Patient_Info_Url();
        var encodedUrl = encodeURI(requestUrl);
	
	var values = this.cancelAppointment.getValues();
	console.log(values);
	
	if(Ext.isEmpty(values.fname)){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Fname_Required());
	    return;
	}else if(Ext.isEmpty(values.lname)){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Lname_Required());
	    return;
	}
	
        // Mask the Viewport
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });	
    
        Ext.Ajax.request({
            params: {
                    parentUserID: values.parentUserID,
                    patientid: values.patientid,
                    fname: values.fname,
                    lname: values.lname,
		    age: values.age,
		    sex: values.sex
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
		
                // unmask the view port
                Ext.Viewport.setMasked(false);
            
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);

                if(resultResponse.success){
                    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				this.getPatientContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }
            },
            failure: function (msg) {
                    //console.log("Failur:->");
                //console.log(msg.status + ', ' + msg.statusText);
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
            },
            scope: this
        });        
    },
    
    // *** Patient Cancel Appointment End ***
    
    
    // *** SearchDoctorAppointment  Start***
    onDoctorSelection: function(list, index, element, record, evt){
	
	if(!this.checkConnectionStatus()){ // to check online connectivity
	    //disable selection while select row in list
	    list.setDisableSelection(true);
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
	    return;
	}
        
        var isDrDetailsOnly = true; // use this to show doctor details or not
    
          if(evt.getTarget('.image_popup_phone')) {
            
            var phone = record.getData().ph;
            if(phone != ''){
               window.location.href = "tel:"+phone;
            }else{
                Ext.Msg.alert(DoctorAppointment.util.Constant.getMsg_Dr_Phone_Not_Available(),
                              DoctorAppointment.util.Constant.getLabel_DR() +
                              DoctorAppointment.util.Constant.getEmptyString() +
                              record.getData().drname +
                              DoctorAppointment.util.Constant.getEmptyString() +
                              DoctorAppointment.util.Constant.getMsg_Dr_Phone_Not_Available());
            }
            
          }else if(evt.getTarget('.gmap')) {
               
          // to set title with Dr. name on map view
          Ext.getCmp('heading_map_label').setHtml("Dr. " + record.getData().drname);
            
            var latd = record.getData().lat;
            var longd = record.getData().longd;
            //console.log("Lat: " + latd + " " + "Long: " + longd);
            //window.location.href = "https://maps.google.com/?q="+ latd + "," + longd;
            
            if(latd != '' && longd != '')
            {
                Ext.getCmp('doctor_list_panel').hide();
                Ext.getCmp('doctor_gmap_panel').show();
                //Ext.getCmp('doctor_gmap_panel').down('map').setMapCenter({
                //    latitude: latd,
                //    longitude: longd
                //});
		
		// this will remove previously selected map marker in array
		for (var i = 0; i < markers.length; i++) {
		    markers[i].setMap(null);
		}

		var map = Ext.ComponentQuery.query('#map_doctor_id')[0].getMap();
	    
		var position = new google.maps.LatLng(latd, longd);
	    
		var marker = new google.maps.Marker({
		    position: position,
		    title: DoctorAppointment.util.Constant.getLabel_DR() + DoctorAppointment.util.Constant.getEmptyString() + record.getData().drname,
		    map: map
		});
		
		// pushed into markers array to remove before next new selection
		markers.push(marker);
		
		var contentString = "<b>"+record.getData().estb + "</b><br />" + record.getData().addr;
		//console.log(contentString);
    
		var infowindow = new google.maps.InfoWindow({
		    content: contentString
		});
		    
		infowindow.open(map, marker);
		
		google.maps.event.addListener(marker, 'click', function() {
		    infowindow.open(map, marker);
		});

		setTimeout(function() {
		    map.panTo(position);
		}, 1000);
 			
            }else{
                Ext.Msg.alert(DoctorAppointment.util.Constant.getMsg_Location_Not_Available(),
                              DoctorAppointment.util.Constant.getLabel_DR() +
                              DoctorAppointment.util.Constant.getEmptyString() +
                              record.getData().drname +
                              DoctorAppointment.util.Constant.getEmptyString() +
                              DoctorAppointment.util.Constant.getMsg_Location_Not_Available());
            }
            
          }else if(evt.getTarget('.tokenslot')) {
               
          // to get click on token no.
            //Ext.Msg.alert('Token No', record.getData().tokenno);
            
            //console.log(evt.target.textContent); // to get token no and time together
            
            if(evt.target.title != ''){
                // to get the selected appointment slot.
                //Ext.Msg.alert('Token', 'Block ID: ' + evt.target.title);
                
                isDrDetailsOnly = false;
                
                // if user do first time registration
                this.onPatientFirstRegistration(record, evt, isDrDetailsOnly);                
            }            

          }else if(evt.getTarget('.apptslot')) {
               
                //console.log(evt.target.id);
                //console.log(evt.target.title);
        
            if(evt.target.title != ''){
                // to get the selected appointment slot.
                //Ext.Msg.alert('Appointment', 'Block ID: ' + evt.target.title);
                
                isDrDetailsOnly = false;
                
                // if user do first time registration
                this.onPatientFirstRegistration(record, evt, isDrDetailsOnly);  
            }
            
          }else{
            //Ext.Msg.alert('Selected ',"Dr. " + record.getData().drname);
               //var doctor_name = record.getData().drname;
               
                // if user do first time registration
                this.onPatientFirstRegistration(record, evt, isDrDetailsOnly); 
          }
          
        //disable selection while select row in list
        list.setDisableSelection(true);
        
        // to show patient home buttin on behalf of UID
        this.showPatientHomeButton();
    },
    
    onDoctorGmapClose: function(btn, e, options) {
          Ext.getCmp('doctor_gmap_panel').hide();
          Ext.getCmp('doctor_list_panel').show();
    },
    
    /**
     * this method work for date pagination on doctor serach result page.
     */
    onAppointmentDateSelection: function(list, index, element, record, evt){
        
        if(evt.getTarget('.leftarrow-toolbar')) {
            //Ext.Msg.alert('Pagination','Prev.');
            if(this.checkConnectionStatus()){ // to check online connectivity
                this.onChangeAppointmentDate(false); // by passing false means decrement in date pagination
            }else{
                Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
            }                
        } 
        else if(evt.getTarget('.rightarrow-toolbar')) {
            //Ext.Msg.alert('Pagination','Next.');
            if(this.checkConnectionStatus()){ // to check online connectivity
                this.onChangeAppointmentDate(true); // by passing true means increment in date pagination
            }else{
                Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
            }  
        } 
    },
    
    /**
     * this method will increment or decrement the date and show doctore appointment list
    */
    onChangeAppointmentDate: function(increment) {
        //console.log('onChangeAppointmentDate');
        
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Loading_Appointments()
        });
        
        var patientTakeAppointmentStore = Ext.getStore('PatientTakeAppointmentStore').getNewRecords()[0].data;
        var modelsearchdate = new Date(patientTakeAppointmentStore.searchdate);
        //console.log(modelsearchdate);
        
        var utilDate = Ext.DateExtras;
        var today = new Date();
        var current_year = today.getFullYear();
        var current_month = today.getMonth();
        var current_day = today.getDate();
        
        var post_three_month = new Date(current_year, current_month + 3, current_day);
        
        var selected_year = modelsearchdate.getFullYear();
        var selected_month = modelsearchdate.getMonth();
        var selected_day = modelsearchdate.getDate();
        
        
        var appointmentModel = Ext.create('DoctorAppointment.model.PatientTakeAppointmentModel', {
            state: patientTakeAppointmentStore.state,
            city: patientTakeAppointmentStore.city,
            area: patientTakeAppointmentStore.area,
            specialty: patientTakeAppointmentStore.specialty,
            drname: patientTakeAppointmentStore.drname,
            searchdate: patientTakeAppointmentStore.searchdate
            //date: values.date
        });
	
	
        recordsArray = [];
        if(increment){
            var incremented_date = new Date(selected_year, selected_month, selected_day + 1);
            if(utilDate.between(incremented_date, today, post_three_month)){    // date, start, end
                appointmentModel.set('searchdate', incremented_date);
                Ext.getStore('PatientTakeAppointmentStore').setData(appointmentModel);
                //Ext.getStore('DoctorStore').load();
		Ext.getStore('DoctorStore').removeAll();
		Ext.getStore('DoctorStore').currentPage = 1; //  If we reset the currentPage config back to 1 on your store, it will just assume the start is back to 0 and the page of course is 1
                Ext.getStore('DoctorStore').load({
                    scope: this,
                    callback : function(records, operation, success) {
			Ext.Viewport.setMasked(false); // hide the load screen
                        if(success){
			    // to show current search doctor result on navigation bar title
			    if(operation.getResultSet().getTotal() != null)
				this.getPatientContainer().getNavigationBar().titleComponent.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Search_Result() + ' ('+ operation.getResultSet().getTotal() + ')'  + '</font>');		    

                        }
                        else{
                            var err_message = '';
                            
                            if(operation.exception){
                                err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
                            }else{
                                err_message = operation.getRequest().getProxy().getReader().rawData.error;
                            }
                            //this.showErrorMsg(err_message);
                            var err_title = ''; this.showErrorMsgAlert(err_title, err_message);
                        }
                    }
                });                
            }else{
                 Ext.Viewport.setMasked(false); // hide the load screen
                var err_title = ''; this.showErrorMsgAlert(err_title, DoctorAppointment.util.Constant.getLabel_Form_Search_Date_Err_Msg2());
                //DoctorAppointment.util.Constant.getLabel_Form_Search_Date_Err_Msg2()
            }
            
            //console.log('Search Date is increment: ' + appointmentModel.get('searchdate'));
        }else{
            var decremented_date = new Date(selected_year, selected_month, selected_day - 1);
            var current_date = Ext.Date.format(new Date(current_year, current_month, current_day), Ext.Date.patterns.ISO8601Short);
            var selected_date = Ext.Date.format(new Date(selected_year, selected_month, selected_day - 1), Ext.Date.patterns.ISO8601Short);
            
            //if(utilDate.between(decremented_date, today, post_three_month)){    //  date, start, end
            if(selected_date >= current_date){
                appointmentModel.set('searchdate', decremented_date);
                Ext.getStore('PatientTakeAppointmentStore').setData(appointmentModel);
                //Ext.getStore('DoctorStore').load();
		Ext.getStore('DoctorStore').removeAll();
		Ext.getStore('DoctorStore').currentPage = 1; //  If we reset the currentPage config back to 1 on your store, it will just assume the start is back to 0 and the page of course is 1
                Ext.getStore('DoctorStore').load({
                    scope: this,
                    callback : function(records, operation, success) {
                        Ext.Viewport.setMasked(false); // hide the load screen
			
                        if(success){
                            // to show current search doctor result on navigation bar title
			    if(operation.getResultSet().getTotal() != null)
				this.getPatientContainer().getNavigationBar().titleComponent.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Search_Result() + ' ('+ operation.getResultSet().getTotal() + ')'  + '</font>');		    

                        }
                        else{
                            var err_message = '';
                            
                            if(operation.exception){
                                err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
                            }else{
                                err_message = operation.getRequest().getProxy().getReader().rawData.error;
                            }
                            //this.showErrorMsg(err_message);
                            var err_title = ''; this.showErrorMsgAlert(err_title, err_message);
                        }
                    }
                });                
            }else{
                 Ext.Viewport.setMasked(false); // hide the load screen
                var err_title = ''; this.showErrorMsgAlert(err_title, DoctorAppointment.util.Constant.getLabel_Form_Search_Date_Err_Msg1());
            }
            
            //console.log('Search Date is decrement:  ' + appointmentModel.get('searchdate'));            
        }
    },    
    
    // *** SearchDoctorAppointment End***
    
    // *** PatientRegistration  Start ***
    
    onShowPatientRegistration: function(Component, eOpts){

        // set scroller to top position while left down scroller on patient registration form
        Ext.getCmp('patient_registration_form').getScrollable().getScroller().scrollToTop();
        
        // to make UID textfield readonly
        Ext.ComponentQuery.query('#uidInputfield')[0].setReadOnly(true);
        
        // to do uncheck the checkbox if already checked
        if(Ext.ComponentQuery.query('#uidCheckBoxfield')[0].isChecked()){
            Ext.ComponentQuery.query('#uidCheckBoxfield')[0].uncheck();
        }
        
        //if (Ext.os.is.MacOS) { 
        //    alert('MacOS');
        //}
        
        Ext.Function.defer(function(){
            Ext.ComponentQuery.query('#mobileInputfield')[0].focus();
        }, 1000);
        
        // hide keyboard while show patient registration form
        if(Ext.os.is.iOS || Ext.os.is.Android || Ext.os.is.webOS || Ext.os.is.BlackBerry || Ext.os.is.RIMTablet || Ext.os.is.Bada){
            this.hideKeyboard();
        }
    },
    
    hideKeyboard: function() {
        var activeElement = document.activeElement;
        activeElement.setAttribute('readonly', 'readonly'); 
        activeElement.setAttribute('disabled', 'true');
        Ext.defer(function() {
            activeElement.blur();
            activeElement.removeAttribute('readonly');
            activeElement.removeAttribute('disabled');
        }, 100);
    },
    
    onPatientFirstRegistration: function(record, evt, isDrDetailsOnly){
    //console.log(evt);
    //console.log(record);
    
    // Set value of selected appointment either 'Token' or 'Appointment' by Patient
    //var created_at = '';
    var appt_type = '';
    var blockid = '';
    var itemsObjTokenSlot= new Array();
    var itemsObjApptSlot= new Array();
    Ext.Object.each(record.getData(), function(key, valuedata, myself) {
        //console.log(key + ":" + valuedata);
        if(evt.getTarget('.tokenslot') != null){
            appt_type = 'Token'; // set token type if patient choose token slot for appointment
            if (key == 'tkn') {
                Ext.Object.each(valuedata, function(key, valuetoken, myself) {
                    Ext.Object.each(valuetoken, function(key, valuetokenslot, myself) {
                        //console.log(key + ":" + valuetokenslot);
                            if (key == 'tslot') {
                                Ext.Object.each(valuetokenslot, function(key, valuetokenitem, myself) {
                                    // if selected block id match with record block id
                                    if (valuetokenitem.et == evt.target.title) {
					blockid = valuetoken.bid; // set the blockid while token selection
                                        Ext.Object.each(valuetokenitem, function(key, valuetokensubitem, myself) {
                                                //console.log(key + ":" + valuetokensubitem);
                                                itemsObjTokenSlot = valuetokenitem;
                                        });
                                    }
                                });        
                            }
                    });  
                });        
            }
        }else if(evt.getTarget('.apptslot') != null){
            appt_type = 'Appointment'; // set Appointment type if patient choose Appointment slot for appointment
            if (key == 'appt') {
                Ext.Object.each(valuedata, function(key, valueappt, myself) {
                    Ext.Object.each(valueappt, function(key, valueapptslot, myself) {
                        //console.log(key + ":" + valueapptslot);
                            if (key == 'aslot') {
                                Ext.Object.each(valueapptslot, function(key, valueapptitem, myself) {
                                    // if selected block id match with record block id
                                    if (valueapptitem.bt == evt.target.title) {
					blockid = valueappt.bid; // set the blockid while appointment selection
                                        Ext.Object.each(valueapptitem, function(key, valuetokensubitem, myself) {
                                                //console.log(key + ":" + valuetokensubitem);
                                                itemsObjApptSlot = valueapptitem;
                                        });
                                    }
                                });        
                            }
                    });  
                });        
            }
        }
    });
    //console.log(itemsObjTokenSlot);
    //console.log(itemsObjApptSlot);
    
    
    var objBookAppointmentModel = new DoctorAppointment.model.BookAppointmentModel();
    objBookAppointmentModel.set('doctorid', record.getData().drid);
    objBookAppointmentModel.set('drname', record.getData().drname);
    objBookAppointmentModel.set('establishmentid', record.getData().estbid);
    objBookAppointmentModel.set('estb', record.getData().estb);
    objBookAppointmentModel.set('area', record.getData().area);
    objBookAppointmentModel.set('address', record.getData().addr);
    objBookAppointmentModel.set('city', record.getData().city);
    objBookAppointmentModel.set('state', record.getData().state);
    objBookAppointmentModel.set('phone', record.getData().ph);
    objBookAppointmentModel.set('latitude', record.getData().lat);
    objBookAppointmentModel.set('longitude', record.getData().longd);
    objBookAppointmentModel.set('speciality', record.getData().spec);
    
    objBookAppointmentModel.set('created_at', record.getData().dt);
    objBookAppointmentModel.set('appt_type', appt_type);
    
    // set value of selected appointment either 'Token' or 'Appointment' to BookAppointmentModel
    if(appt_type == 'Token'){
        objBookAppointmentModel.set('block_id', blockid);
        objBookAppointmentModel.set('block_time', itemsObjTokenSlot.st);
        objBookAppointmentModel.set('token_no', itemsObjTokenSlot.tkno);
        objBookAppointmentModel.set('token_time', itemsObjTokenSlot.et);
        
    }else if(appt_type == 'Appointment'){
        objBookAppointmentModel.set('block_id', blockid);
        //objBookAppointmentModel.set('appointment_id', itemsObjApptSlot.appointment_id);
        objBookAppointmentModel.set('appointment_time', itemsObjApptSlot.bt);
        
        //objBookAppointmentModel.set('blockappt_or_token', itemsObjApptSlot.appointment_time);
    }
    
    
    Ext.getStore('BookAppointmentStore').removeAll();
    Ext.getStore('BookAppointmentStore').setData(objBookAppointmentModel);
    //console.log(Ext.getStore('BookAppointmentStore').getData().items[0].data);
    
    
    //console.log('Block ID: ' + evt.target.title + '\nAppt ID or Token No: ' + evt.target.id + '\nDr ID: ' + record.getData().id);
                
        var uid = storage.getItem("uid");
        var patientid = storage.getItem("patientid");
        
        // show registration page only UID not available and patientid is zero
        if(!isDrDetailsOnly && (Ext.isEmpty(uid) && patientid == 0)){
                
                var registrationOverlay = this.getPatientRegistration();
                // show patient registration form
                registrationOverlay.show();
        }
        // if already have UID then push on other view to take token no or appointment slot 
        else{
            //var patientUID = storage.getItem("uid");
            //console.log('push to another view with UID, Dr. record, and evt values(Block ID & Token/Appt No.)');

            this.showBookAppointmentPage();
           
            
        }
    },
    
    /**
     * This method will show Book Appointment page through Patient one time registration page and subsequent from doctor search list
     */
    showBookAppointmentPage: function(){
            if (!this.showBookAppointmentDetail) {
                this.showBookAppointmentDetail = Ext.widget('bookAppointment');//Ext.create('DoctorAppointment.view.patient.BookAppointment');
            }
            var bookAppointmentStoreItemsData = Ext.getStore('BookAppointmentStore').getData().items[0];
            var bookAppointmentStoreData = Ext.getStore('BookAppointmentStore').getData().items[0].data;
            
            //console.log(bookAppointmentStoreItemsData);
            //console.log(bookAppointmentStoreData);
            
            // Bind the record data into the show appointment details view
            this.showBookAppointmentDetail.setData(bookAppointmentStoreItemsData);
            
            var bookApptPageTitle = '';

            if(bookAppointmentStoreData.appt_type == 'Token' || bookAppointmentStoreData.appt_type == 'Appointment'){
                
                var block_id = this.showBookAppointmentDetail.getFields('block_id');
                block_id.setValue(bookAppointmentStoreData.block_id);
                var block_time = this.showBookAppointmentDetail.getFields('block_time');
                block_time.setValue(bookAppointmentStoreData.block_time);
                var token_no = this.showBookAppointmentDetail.getFields('token_no');
                token_no.setValue(bookAppointmentStoreData.token_no);
                var token_time = this.showBookAppointmentDetail.getFields('token_time');
                token_time.setValue(bookAppointmentStoreData.token_time);              
                //var appointment_id = this.showBookAppointmentDetail.getFields('appointment_id');
                //appointment_id.setValue(bookAppointmentStoreData.appointment_id);
                var appointment_time = this.showBookAppointmentDetail.getFields('appointment_time');
                appointment_time.setValue(bookAppointmentStoreData.appointment_time);             
                var establishmentid = this.showBookAppointmentDetail.getFields('establishmentid');
                establishmentid.setValue(bookAppointmentStoreData.establishmentid);
                var doctorid = this.showBookAppointmentDetail.getFields('doctorid');
                doctorid.setValue(bookAppointmentStoreData.doctorid);
                
                var patientTakeAppointmentStore = Ext.getStore('PatientTakeAppointmentStore').getNewRecords()[0].data;
                //var apptsearchdate = Ext.Date.format(new Date(patientTakeAppointmentStore.searchdate), Ext.Date.patterns.AppointmentDate);
                var appointmentDate = Ext.Date.format(new Date(patientTakeAppointmentStore.searchdate), Ext.Date.patterns.ISO8601Short);
                //console.log(appointmentDate);
                // to set appointment date on server later on
                this.showBookAppointmentDetail.getFields('appt_date').setValue(appointmentDate);
                
                // show book appointment button only if Token or Appointment slot selected and pass appointment type (Token or Appointment)
                this.showBookAppointmentDetail.getFields('appt_type').setValue(bookAppointmentStoreData.appt_type);                
                
                var uid = storage.getItem("uid");
                var patientid = storage.getItem("patientid");
                
                // to load patient list store on book appointment form
		Ext.getStore('RegisteredPatientStore').removeAll();
		
                Ext.getStore('RegisteredPatientStore').getProxy().setExtraParams({
                    uid:uid,
                    patientid:patientid
                });
                //store.load() function cleans up prev data
                Ext.getStore('RegisteredPatientStore').load();
                
                bookApptPageTitle = DoctorAppointment.util.Constant.getLabel_Appointment();
            }else{
                bookApptPageTitle = '';
                //this.showBookAppointmentDetail.reset();
            }
            

            if(bookAppointmentStoreData.appt_type == 'Token'){
                
                this.showBookAppointmentDetail.getItems().get('appt_msg').show();
                this.showBookAppointmentDetail.getItems().get('appt_msg').setHtml(DoctorAppointment.util.Constant.getLabel_Booking_Token()
										  + DoctorAppointment.util.Constant.getLabel_List_TokenNo()
										  + ': '
                                                                                  + bookAppointmentStoreData.token_no
                                                                                  + DoctorAppointment.util.Constant.getEmptyString()
                                                                                  + DoctorAppointment.util.Constant.getLabel_token_msg()
                                                                                  + DoctorAppointment.util.Constant.getLabel_TokenExpectedTime()
                                                                                  + DoctorAppointment.util.Constant.getEmptyString()
                                                                                  + bookAppointmentStoreData.token_time
                                                                                  + DoctorAppointment.util.Constant.getEmptyString()
                                                                                  + bookAppointmentStoreData.created_at);
                this.showBookAppointmentDetail.getItems().get('btn_patient_book_appointment').show();
                this.showBookAppointmentDetail.getItems().get('fieldset_appointment_for').show();
                this.showBookAppointmentDetail.getItems().get('fieldset_me_family').show();
		this.showBookAppointmentDetail.getItems().get('fieldset_other_family').show();
		Ext.getCmp('fnameInputfield').setDisabled(true); 
                Ext.getCmp('lnameInputfield').setDisabled(true);
		Ext.getCmp('bookingApptInstructions').show();
                
            }else if(bookAppointmentStoreData.appt_type == 'Appointment'){
                
                this.showBookAppointmentDetail.getItems().get('appt_msg').show();
                this.showBookAppointmentDetail.getItems().get('appt_msg').setHtml(DoctorAppointment.util.Constant.getLabel_Booking_Appointment()
										  + DoctorAppointment.util.Constant.getLabel_Appointment()
										  + ': '
                                                                                  + bookAppointmentStoreData.appointment_time
                                                                                  + DoctorAppointment.util.Constant.getLabel_Booking_On()
                                                                                  + bookAppointmentStoreData.created_at);
                this.showBookAppointmentDetail.getItems().get('btn_patient_book_appointment').show();
                this.showBookAppointmentDetail.getItems().get('fieldset_appointment_for').show();
                this.showBookAppointmentDetail.getItems().get('fieldset_me_family').show();
		this.showBookAppointmentDetail.getItems().get('fieldset_other_family').show();
		Ext.getCmp('fnameInputfield').setDisabled(true); 
                Ext.getCmp('lnameInputfield').setDisabled(true);
                Ext.getCmp('bookingApptInstructions').show();
                
            }else{
                // if not selected any token or appointment slot
                this.showBookAppointmentDetail.getItems().get('appt_msg').setHtml('');
                this.showBookAppointmentDetail.getItems().get('appt_msg').hide();
                this.showBookAppointmentDetail.getItems().get('btn_patient_book_appointment').hide();
                this.showBookAppointmentDetail.getItems().get('fieldset_appointment_for').hide();
                this.showBookAppointmentDetail.getItems().get('fieldset_me_family').hide();
                this.showBookAppointmentDetail.getItems().get('fieldset_other_family').hide();
		Ext.getCmp('bookingApptInstructions').hide();
            }
            

            
            //this.showBookAppointmentDetail.setTitle('<font size = \'3\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_DR() + DoctorAppointment.util.Constant.getEmptyString() + record.getData().drname + '</font>');
            this.showBookAppointmentDetail.setTitle('<font size = \'3\' color="#FFFFFF">' + bookApptPageTitle + '</font>');
            // Push the bookAppointment view into the navigation view
            this.getPatientContainer().push(this.showBookAppointmentDetail);         
    },
    
    onPatientRegistration: function(btn, e, eOpts){
        
        var patientRegistrationForm = this.getPatientRegistration();
        
        var values = patientRegistrationForm.getValues();
        //console.log(values);
        
        var patientRegistrationModel = Ext.create('DoctorAppointment.model.PatientRegistrationModel', {
            mobile: values.mobile,
            uid: values.uid,
            fname: values.fname,
            lname: values.lname,
            age: values.age,
            sex: values.sex,
	    email: values.email
        });
        
        // all fields are mandatory so validated here
        var errs = patientRegistrationModel.validate(),
	//var errs = true,                            // comment it while need validation
        msg = '';
        
        if (!errs.isValid()) {
	//if (!errs) {                                // comment it while need validation
            errs.each(function (err) {
                msg += err.getMessage() + '<br/>';
            }); // each()
            Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
        }
        else if(this.checkConnectionStatus()){
            
            // Mask the Patient Registration form
            patientRegistrationForm.setMasked({
                xtype: 'loadmask',
                message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
            });
            
           this.submitRegistrationPatient(patientRegistrationModel, patientRegistrationForm);
        }
        else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        }
    },
    
    submitRegistrationPatient: function(patientRegistrationModel, patientRegistrationForm){
        var requestUrl = DoctorAppointment.util.Constant.getRegistration_insert_patient_url();
        var encodedUrl = encodeURI(requestUrl);
    
        Ext.Ajax.request({
            params: {
                    mobile:patientRegistrationModel.get('mobile'),
                    uid:patientRegistrationModel.get('uid'),
                    fname:patientRegistrationModel.get('fname'),
                    lname:patientRegistrationModel.get('lname'),
                    age:patientRegistrationModel.get('age'),
                    sex:patientRegistrationModel.get('sex'),
		    email:patientRegistrationModel.get('email')
                    }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
		
		// hide the patient registration form
		this.getPatientRegistration().hide();
                
                // unmask the patient registration form
                patientRegistrationForm.setMasked(false);
                
                var patientid = storage.getItem("patientid");
                var uid = storage.getItem("uid");
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);

                if(resultResponse.success){
		    
                    // set value of doctorid and doctorstatus from server response
                    if(Ext.isEmpty(uid) && patientid == 0){
                        storage.setItem("patientid", resultResponse.patientid);
                        storage.setItem("uid", resultResponse.uid);
                    }
                    
                    // refresh the DoctorStore load
                    Ext.getStore('DoctorStore').load();
		    
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(), resultResponse.message);
                    //isDoctorRegistrationPop = true;		    // msg successfully registered from server
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				// hide the patient registration form
				//patientRegistrationForm.hide();
				
				// Push to book appointment page
				this.showBookAppointmentPage();
			   }
			},
			this // scope of the controller 
		    );
		    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }
            },
            failure: function (msg) {
                    //console.log("Failur:->");
                //console.log(msg.status + ', ' + msg.statusText);
                patientRegistrationForm.setMasked(false);
                Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
            },
            scope: this
        });        
    },
    
    // *** PatientRegistration End ***
    
    // *** BookAppointment Start ***
    
    onPatientBookAppointment: function(btn, e, eOpts){
        // if N/W available
        if(this.checkConnectionStatus()){
        
            var values = this.showBookAppointmentDetail.getValues();
            //console.log(values);
            
            if(values.patient_type == 'family'){    // if booking for any other person or family member
                
                var patientBookAppointmentModel = Ext.create('DoctorAppointment.model.PatientBookAppointmentModel', {
                    fname: values.fname,
                    lname: values.lname,
                    age: values.age,
                    sex: values.sex
                });
                
                // all fields are mandatory so validated here
                var errs = patientBookAppointmentModel.validate(),
                //var errs = true,                            // comment it while need validation
                msg = '';
                
                if (!errs.isValid()) {
                //if (!errs) {                                // comment it while need validation
                    errs.each(function (err) {
                        msg += err.getMessage() + '<br/>';
                    }); // each()
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
                }else{
		    
		    this.showBookAppointmentDetail.updateRecord(patientBookAppointmentModel, true);
		    
                    // Submit Patient BookAppointment for self
                    this.submitPatientBookAppointment(values);
                }
                
            }else if(values.patient_type == 'self'){ // if booking by registered patient only
               
               if(values.patient_name == null || values.patient_name == ''){
                
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), "Patient Name " + DoctorAppointment.util.Constant.getSever_Error_Msg());
                    
                    // hide the patient book appointment form
                    this.getPatientContainer().pop();
               }else{
		    // to validate existing registered patient's age, sex
		    var patientBookAppointmentModel = Ext.create('DoctorAppointment.model.PatientBookAppointmentModel', {
			  fname: values.fname,
			  lname: values.lname,
			  age: values.age,
			  sex: values.sex
		      });
		      
		      // all fields are mandatory so validated here
		      var errs = patientBookAppointmentModel.validate(),
		      //var errs = true,                            // comment it while need validation
		      msg = '';
		      
		      if (!errs.isValid()) {
		      //if (!errs) {                                // comment it while need validation
			  errs.each(function (err) {
			      msg += err.getMessage() + '<br/>';
			  }); // each()
			  Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
		      }else{
			
			this.showBookAppointmentDetail.updateRecord(patientBookAppointmentModel, true);
			
			  // Submit Patient BookAppointment for self
			  this.submitPatientBookAppointment(values);
		      }
               }
            }
        }
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        }        
    },
    /**
     * This method will book appointment of self(patient) or other / family members
     */
    submitPatientBookAppointment: function(values){
        
        // Mask the Viewport
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = DoctorAppointment.util.Constant.getBook_appointment_patient_url();
        var encodedUrl = encodeURI(requestUrl);
        var patientUID = storage.getItem("uid");
        var patientid = storage.getItem("patientid"); // User ID
    
        Ext.Ajax.request({
            params: {
                        uid:patientUID,
                        patientid: patientid,
                        fname: values.fname,
                        lname: values.lname,
                        age: values.age,
                        sex: values.sex, 
                        medicaldesc: values.medicaldesc,
                        patient_name: values.patient_name,
                        patient_type: values.patient_type,
                        appt_type: values.appt_type, // appt_type hidden field value on form passing to server
                        blockid: values.block_id, // block_id hidden field value on form passing to server
                        block_time: values.block_time, // block_time hidden field value on form passing to server
                        token_no: values.token_no, // token_no hidden field value on form passing to server
                        token_time: values.token_time, // token_time hidden field value on form passing to server
                        //appointment_id: values.appointment_id, // appointment_id hidden field value on form passing to server
                        appointment_time: values.appointment_time, // appointment_time hidden field value on form passing to server
                        establishmentid: values.establishmentid, // establishmentid hidden field value on form passing to server
                        doctorid: values.doctorid, // doctorid hidden field value on form passing to server
                        appt_date: values.appt_date, // appt_date hidden field value on form passing to server
			status: ''
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
		
		// unmask the viewport
                Ext.Viewport.setMasked(false);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
		
		if(resultResponse.success){
		    
		    // refresh the DoctorStore load
		    Ext.getStore('DoctorStore').load();

		    // msg successfully registered from server
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//console.log(this.getPatientContainer().getItems().getCount());
				// hide the patient book appointment form and send to upcoming screen
				//this.getPatientContainer().reset();
				if (!this.showPatientWaitingTime) {
				    this.showPatientWaitingTime = Ext.widget('patientWaitingTime');
				}
				this.showPatientWaitingTime.setTitle('<font size = \'3\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Heading_Upcoming_Appt() + '</font>');
				// Push the patientWaitingTime view into the navigation view
				this.getPatientContainer().push(this.showPatientWaitingTime);
				
				// to clear UID text field to search again
				Ext.ComponentQuery.query('#uidtextfield')[0].setValue('');				
			   }
			},
			this // scope of the controller 
		    );			    
		    
		    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ', ' + msg.statusText);
                Ext.Viewport.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
            scope: this
        });
    },
    
    
    OnChangeRegisteredPatient: function(selectBox, newValue, oldValue, eOpts){
	//console.log('OnChangeRegisteredPatient');
	var RegisteredPatientStoreItems = Ext.getStore('RegisteredPatientStore').getData().items;
	var RegisteredPatientId = selectBox.getValue();
	//console.log('showRegisteredPatient(): ' + RegisteredPatientId);
	var registeredPatientStoreData = '';
	 Ext.Object.each(RegisteredPatientStoreItems, function(key, valuedata, myself) {
	    if(RegisteredPatientId == valuedata.data.existingPatientID){
		registeredPatientStoreData = valuedata.data
	    }
	});
	 
	//console.log(registeredPatientStoreData);
	
	this.showBookAppointmentDetail.getFields('fname').setValue(registeredPatientStoreData.fname);
        this.showBookAppointmentDetail.getFields('lname').setValue(registeredPatientStoreData.lname);
        this.showBookAppointmentDetail.getFields('age').setValue(registeredPatientStoreData.age);
	if(registeredPatientStoreData.sex == 'Male'){
              Ext.getCmp('radio_sex_male').setChecked(true);
              //Ext.getCmp('radio_sex_male').setValue(registeredPatientStoreData.sex);
	}
	else{
              Ext.getCmp('radio_sex_female').setChecked(true);
              //Ext.getCmp('radio_sex_female').setValue(registeredPatientStoreData.sex);
	}
        this.showBookAppointmentDetail.getFields('medicaldesc').setValue(registeredPatientStoreData.medicaldesc);  	
	
    },
    
    // *** BookAppointment End ***
    
    
    //******************************************** Patient End********************************************
    
    
   
    
    
    
    //******************************************** Doctor Start********************************************
    
    onDoctortHome: function(btn, e, options) {
        this.getDoctorContainer().reset(); //go to home page
    },
    
    onActivateDoctor: function() {
        //console.log("onActivateDoctor");
        
        var doctorContainerHomeList = this.getDoctorContainerHomeList();
        
        // call only while doctorContainerHomeList (doctor manage option list) is hidden
        if (doctorContainerHomeList.isHidden()) {
            showPageByDoctorStatus();
        }
    },
    
    onActivateDoctorContainerList: function(){
        //console.log("onActivateDoctorContainerList");
        
        // this method will give server call to update doctor status on UI by it's registered doctor id
        this.setDoctorStatusById();        
        
        //showPageByDoctorStatus();

    },
    
    setDoctorStatusById: function(){
        
        var doctorid = storage.getItem("doctorid");
        var doctorstatus = parseInt(storage.getItem("doctorstatus"), 10);
        //console.log(doctorid);
        //console.log(doctorstatus);
        
        // if N/W available
        if(this.checkConnectionStatus()){        
            var requestUrl = DoctorAppointment.util.Constant.getDoctor_status_by_id();
            var encodedUrl = encodeURI(requestUrl);
        
            Ext.Ajax.request({
                params: {
                        doctorid:doctorid
                },
                url: encodedUrl,
                method: 'POST',
                success: function(response) {
                    //console.log("Sucess:->");
                    //console.log(response.status + ', ' + response.responseText);
                    
                    var resultResponse = Ext.JSON.decode(response.responseText);
                    //console.log(resultResponse.success);
                    
                    if(resultResponse.success){
                        // If doctor approve by admin then update value of doctorstatus on client side from server response
                        if(!Ext.isEmpty(resultResponse.doctorstatus)){
                            storage.setItem("doctorstatus", resultResponse.doctorstatus);
                        }
                        // subsequent page on successfully login
                        showPageByDoctorStatus();   
                    }
                },
                failure: function (msg) {
                    //console.log("Failur:->");
                    //console.log(msg.status + ' , ' + msg.statusText);
                    //if(msg.status == 0){
                    //    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                    //}else{
                        //Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                    //}
                }
            });
        }
    },
    
    onDoctorContainerPop: function(list, index, element, record){
        if(element == 2){
            // to show tab bar while coming from child pages
            this.getTabpanel().getTabBar().show();
            showPageByDoctorStatus();
	    
	    Ext.ComponentQuery.query('#btnDoctorHome')[0].hide();
	    //Ext.ComponentQuery.query('#logoutButton')[0].show();
        }else{
	    Ext.ComponentQuery.query('#btnDoctorHome')[0].show();
	    Ext.ComponentQuery.query('#logoutButton')[0].hide();
	}
    },
    
    showViewDoctor: function(list, index, element, record){
        //console.log("showViewDoctor: " + index);
        //console.log("showViewDoctor Title: " + record.get('title') )
	
        var doctorid = storage.getItem("doctorid");
        var doctorstatus = parseInt(storage.getItem("doctorstatus"), 10);
        
        // Subsequent child pages will not load until doctor status is pending
        if(!Ext.isEmpty(doctorid)){
	    // to show home button to go on home page
	    Ext.ComponentQuery.query('#btnDoctorHome')[0].show();
	    // to hide logout button on subsequent screen
	    Ext.ComponentQuery.query('#logoutButton')[0].hide();
        
            // to hide tab bar while going to child pages
            this.getTabpanel().getTabBar().hide();
            
            if(index == 0){
		
		// not to show staff on selecting location tab on behalf of accesscontrols permisssion
		//if(!accesscontrols.isAllEstablishmentCreateAllowed){
		//    
		//    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),DoctorAppointment.util.Constant.getMsg_No_Permission(),
		//	function(buttonId) {
		//	   if (buttonId === 'ok') {
		//		Ext.ComponentQuery.query('#btnDoctorHome')[0].hide();
		//		Ext.ComponentQuery.query('#logoutButton')[0].show();
		//	   }
		//	},
		//	this // scope of the controller 
		//    );    
		//    return;
		//}
		
                // Locations
                if (!this.doctorLocations) {
                    this.doctorLocations = Ext.widget('doctorLocations');
                }
                this.doctorLocations.setTitle('<font size = \'4\' color="#FFFFFF">' + record.get('title') + '</font>');
                // Push the doctorLocations view into the navigation view
                this.getDoctorContainer().push(this.doctorLocations);
                
            }else if(index == 1){
                // Profiles
                if (!this.doctorProfiles) {
                    this.doctorProfiles = Ext.widget('doctorProfiles');
                }
                this.doctorProfiles.setTitle('<font size = \'4\' color="#FFFFFF">' + record.get('title') + '</font>');
                // Push the doctorProfiles view into the navigation view
                this.getDoctorContainer().push(this.doctorProfiles);
                
            }else if(index == 2){
                // Office Hours
                if (!this.doctorOfficeHours) {
                    this.doctorOfficeHours = Ext.widget('doctorOfficeHours');
                }
                this.doctorOfficeHours.setTitle('<font size = \'4\' color="#FFFFFF">' + record.get('title') + '</font>');
                // Push the doctorOfficeHours view into the navigation view
                this.getDoctorContainer().push(this.doctorOfficeHours);
                
            }else if(index == 3){
                // Block Availability
                if (!this.doctorBlockAvailability) {
                    this.doctorBlockAvailability = Ext.widget('doctorBlockAvailability');
                }
                this.doctorBlockAvailability.setTitle('<font size = \'4\' color="#FFFFFF">' + record.get('title') + '</font>');
                // Push the doctorBlockAvailability view into the navigation view
                this.getDoctorContainer().push(this.doctorBlockAvailability);
                
            }else if(index == 4){
                // Appointment / Token
                if (!this.doctorAppointmentOrToken) {
                    this.doctorAppointmentOrToken = Ext.widget('doctorAppointmentOrToken');
                }
                this.doctorAppointmentOrToken.setTitle('<font size = \'3\' color="#FFFFFF">' + record.get('title') + '</font>');
                // Push the doctorAppointmentOrToken view into the navigation view
                this.getDoctorContainer().push(this.doctorAppointmentOrToken);
		this.setDoctorAppointmentOrTokenPage();
                
	    }
            
            //enable selection onItemDisclosure while select row in list
            list.select(record, true, true );
        }else{
            //this.showErrorMsg('Checking Approval');
            
            // this method will give server call to update doctor status on UI by it's registered doctor id
            this.setDoctorStatusById();             
        }
        
    },
    
    
    onChangeStateByDoctor: function(selectBox, newValue, oldValue, eOpts){
	
	Ext.getStore('CityStore').removeAll();
        
        var stateId_Value = selectBox.getValue();
        //console.log('onChangeStateByPatient ' + stateId_Value + " " +  newValue + " " + oldValue);
        
        
        // this method will load CityStore with cities name by passing selected stateId
        //store.load() function cleans up prev data
        
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Loading_Cities()
        });        
        
        Ext.getStore('CityStore').load({
            params : { stateId : stateId_Value}, // passed selected stateId
            scope: this,
            callback : function(records, operation, success) {
                    Ext.Viewport.setMasked(false); // hide the load screen
                if(success){
                    //console.log('JSON returned:::::::::::::');
                    //console.log(operation.getResponse().responseText);
                    //this.getCityByPatient().setDisabled(false); // enable the city selectbox
                }
                else{
                    //console.log(success);
                    var err_message = '';
                    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
                    }
                    this.showErrorMsg(err_message);
		    Ext.getStore('CityStore').removeAll();
                }
            }           
        });
    },
    
    // *** Doctor Login Start ***
    
    onDoctorSignIn: function(btn, e, eOpts){
        // if N/W available
        if(this.checkConnectionStatus()){
            var doctorLoginForm = this.getDoctorLogin();
    
            var values = doctorLoginForm.getValues();
            //console.log(values);
            
            var doctorLoginModel = Ext.create('DoctorAppointment.model.doctor.DoctorLoginModel', {
                email: values.email,
                password: values.password
            });
            
            // email & password fields are mandatory so validated here
            var errs = doctorLoginModel.validate(),
            //var errs = true,                            // comment it while need validation
            msg = '';
            
            if (!errs.isValid()) {
            //if (!errs) {                                // comment it while need validation
                errs.each(function (err) {
                    msg += err.getMessage() + '<br/>';
                }); // each()
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
            }else{
                // submit the doctor login form
                this.submitDoctorSignIn(doctorLoginModel, doctorLoginForm);
            }
        }
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        }        
    },
    
    submitDoctorSignIn: function(doctorLoginModel, doctorLoginForm){
        // Mask the Doctor Login form
        doctorLoginForm.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = DoctorAppointment.util.Constant.getSubmit_dr_signin();
        var encodedUrl = encodeURI(requestUrl);
    
        Ext.Ajax.request({
            params: {
                    email:doctorLoginModel.get('email'),
                    password:doctorLoginModel.get('password')
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.accesscontrols);
                
                // unmask the doctor login form
                doctorLoginForm.setMasked(false);
                
                //var doctorid = storage.getItem("doctorid");
                //var doctorstatus = parseInt(storage.getItem("doctorstatus"), 10);
                //console.log(doctorid);
                
                if(resultResponse.success){
                    // set value of doctorid and doctorstatus from server response
                    //if(Ext.isEmpty(doctorid) && doctorstatus == 0){
                        storage.setItem("doctorid", resultResponse.doctorid);
                        storage.setItem("doctorstatus", resultResponse.doctorstatus);
			storage.setItem("usergroupid", resultResponse.usergroupid);
			storage.setItem("parentUserID", resultResponse.parentUserID);
			
			// this will set accesscontrols into localstorage then in store according to user login
			try{
			    storage.setItem("accesscontrols", resultResponse.accesscontrols);
			}
			catch (e) {
			    if (e == QUOTA_EXCEEDED_ERR) {
				console.log("Error: Local Storage limit exceeds.");
			    }
			    else {
				console.log("Error: Saving to local storage.");
			    }
			}
			
			var result_accesscontrols = Ext.JSON.decode(storage.getItem("accesscontrols"));
			//console.log(result_accesscontrols);
			
			Ext.getStore('AccessControlStore').setData(result_accesscontrols);
			accesscontrols = '';
			accesscontrols = Ext.getStore('AccessControlStore').getData().items[0].data;
			//console.log("Login: " , accesscontrols);			
                    //}
                    
                    // subsequent page on successfully login
                    showPageByDoctorStatus();
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                doctorLoginForm.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            }
        });       
    },
    
    // *** Doctor Login End ***    
    
    // *** Doctor Forgot Password Start ***
    
    onDoctorForgotPwd: function(){
        
        // hide Doctor Login form
        Ext.ComponentQuery.query('#doctorLogin_id')[0].hide();
        
        // to hide tab bar while going to child pages
        this.getTabpanel().getTabBar().hide();
        
        // Push the doctorForgotPassword view into the navigation view
        if (!this.doctorForgotPassword) {
            this.doctorForgotPassword = Ext.widget('doctorForgotPassword');
        }
        this.doctorForgotPassword.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Dr_Forgot_Pwd_Title() + '</font>');
        this.doctorForgotPassword.getFields('email').setValue(''); // to empty previous entered value in email field box
        this.getDoctorContainer().push(this.doctorForgotPassword);
    },
    
    onDoctorForgotPwdSubmit: function(btn, e, eOpts){
        // if N/W available
        if(this.checkConnectionStatus()){
            var doctorForgotPasswordForm = this.getDoctorForgotPassword();
    
            var values = doctorForgotPasswordForm.getValues();
            
            var doctorForgotPasswordModel = Ext.create('DoctorAppointment.model.doctor.DoctorForgotPasswordModel', {
                email: values.email
            });
            
            // email field is mandatory so validated here
            var errs = doctorForgotPasswordModel.validate(),
            msg = '';
            
            if (!errs.isValid()) {
                errs.each(function (err) {
                    msg += err.getMessage() + '<br/>';
                }); // each()
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
            }else{
                // submit the doctor forgot password form
                this.submitDoctorForgotPwd(doctorForgotPasswordModel, doctorForgotPasswordForm);
            }            
            
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 
    },
    
    submitDoctorForgotPwd: function(doctorForgotPasswordModel, doctorForgotPasswordForm){
        // Mask the Doctor Login form
        doctorForgotPasswordForm.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = DoctorAppointment.util.Constant.getDoctor_forgot_password();
        var encodedUrl = encodeURI(requestUrl);
    
        Ext.Ajax.request({
            params: {
                    email:doctorForgotPasswordModel.get('email')
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the doctor forgotpassword form
                doctorForgotPasswordForm.setMasked(false);
                
                if(resultResponse.success){
		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                doctorForgotPasswordForm.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });
    },
    
    // *** Doctor Forgot Password End ***
    
    // *** Doctor Registration Start ***
    
    showDoctorRegistration: function(btn, e, eOpts){
        
            // hide Doctor Login form
            Ext.ComponentQuery.query('#doctorLogin_id')[0].hide();
            
            // to hide tab bar while going to child pages
            this.getTabpanel().getTabBar().hide();            
            
            // Push the doctorRegister view into the navigation view
            if (!this.doctorRegistration) {
                this.doctorRegistration = Ext.widget('doctorRegistration');
            }
            this.doctorRegistration.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_sign_up() + '</font>');
            this.getDoctorContainer().push(this.doctorRegistration);
            
            // to fill State select box on Dr. Registration page
            var stateStore = Ext.getStore('StateStore');
            stateStore.load();
            
            // to fill Specialty select box on Dr. Registration page
            var specialtyStore = Ext.getStore('SpecialtyStore');
            specialtyStore.load();
	    
	    var groupTypeValue = 3; // groupTypeValue = 3 will show "Doctor & Admin" and "Staff & Admin"
	    this.loadGroupStoreByType(groupTypeValue);
            
            //to reset the whole doctor registration form
            this.doctorRegistration.reset();
	    var drImage = Ext.getCmp('drRegisterImage');
	    drImage.setSrc(DoctorAppointment.util.Constant.getDr_image_url());
    },
    
    loadGroupStoreByType: function(groupTypeValue){
	// This GroupStore is used while doing doctor sign up and as well as showing in Profile section by set anoterh URL
	Ext.getStore('GroupsStore').removeAll();
	Ext.getStore('GroupsStore').getProxy().setUrl(DoctorAppointment.util.Constant.getGroup_List_Url());
	Ext.getStore('GroupsStore').getProxy().setExtraParams({
	    groupType: groupTypeValue
	});
	Ext.getStore('GroupsStore').load();
    },
    
    onDoctorRegistration: function(btn, e, eOpts){
	
        // if N/W available
        if(this.checkConnectionStatus()){
            var doctorRegistrationForm = this.getDoctorRegistration();
    
            var values = doctorRegistrationForm.getValues();
            //console.log(values);
            
            var doctorRegistrationModel = Ext.create('DoctorAppointment.model.doctor.DoctorRegistrationModel', {
                email: values.email,
                password: values.password,
                fname: values.fname,
		mname: values.mname,
                lname: values.lname,
                specialty: values.specialty,
                state: values.state,
                city: values.city,
                area: values.area,
		establishmentname: values.establishmentname,
                addressline1: values.addressline1,
                addressline2: values.addressline2,
                sex: values.sex,
                mobile: values.mobile,
                zip: values.zip,
                phone: values.phone,
                degree: values.degree,
                groupid: values.groupid
            });
            
            // some field are mandatory so validated here
            var errs = doctorRegistrationModel.validate(),
            msg = '';
            
            // to give error msg by checking values of password and confirm password
            var pwd_value = Ext.ComponentQuery.query('#id_password')[0].getValue();
            var conf_pwd_value = Ext.ComponentQuery.query('#id_confpassword')[0].getValue();
            
            if(pwd_value != conf_pwd_value){
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_pwd_not_match());
            }else if (!errs.isValid()) {
                errs.each(function (err) {
                    msg += err.getMessage() + '<br/>';
                }); // each()
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
            }else{
            
                doctorRegistrationForm.updateRecord(doctorRegistrationModel, true);
                
                // submit the doctor registration form
                this.submitDoctorRegistration(doctorRegistrationModel, doctorRegistrationForm);
            }            
            
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 
    },
    
    submitDoctorRegistration: function(doctorRegistrationModel, doctorRegistrationForm){
        // Mask the Doctor Login form
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        var requestUrl = DoctorAppointment.util.Constant.getDoctor_sign_up();
	
	if (imageData != undefined && imageData != null) {
	    
	    uploadPhotoWithDoctorRegistration(doctorRegistrationModel, requestUrl);
	    
	}
	else {
	
	    var encodedUrl = encodeURI(requestUrl);
	
	    Ext.Ajax.request({
		params: {
			email:doctorRegistrationModel.get('email'),
			password:doctorRegistrationModel.get('password'),
			fname:doctorRegistrationModel.get('fname'),
			mname:doctorRegistrationModel.get('mname'),
			lname:doctorRegistrationModel.get('lname'),
			specialty:doctorRegistrationModel.get('specialty'),
			state:doctorRegistrationModel.get('state'),
			city:doctorRegistrationModel.get('city'),
			area:doctorRegistrationModel.get('area'),
			establishmentname: doctorRegistrationModel.get('establishmentname'),
			addressline1:doctorRegistrationModel.get('addressline1'),
			addressline2:doctorRegistrationModel.get('addressline2'),
			sex:doctorRegistrationModel.get('sex'),
			mobile:doctorRegistrationModel.get('mobile'),
			zip:doctorRegistrationModel.get('zip'),
			phone:doctorRegistrationModel.get('phone'),
			degree:doctorRegistrationModel.get('degree'),
			groupid:doctorRegistrationModel.get('groupid')
		}, // actual
		url: encodedUrl,
		method: 'POST',
		success: function(response) {
		    uploadSuccess(response);                
		},
		failure: function (msg) {
		    UploadFail(msg);
		},
		scope: this
	    });
	}
    },    
    
    onDoctorLogout: function(btn, e, options) {
	Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Logout(),DoctorAppointment.util.Constant.getMsg_label_Logout(),
	    function(buttonId) {
	       if (buttonId === 'yes') {
		    storage.setItem("doctorid", "");
		    storage.setItem("doctorstatus", "0");
		    storage.setItem("groupid", "");
		    storage.setItem("usergroupid", "");		    
		    this.getDoctorContainer().reset(); //Resets the view by removing all items between the first and last item.
		    showPageByDoctorStatus();
		    Ext.getStore('AccessControlStore').removeAll();
		    accesscontrols = '';
		    storage.setItem("accesscontrols", "");
		    storage.setItem("parentUserID", "");
	       }
	    },
	    this // scope of the controller 
	);
    },
    
    // *** Doctor Registration End ***
    
    // *** Doctor Locations Start ***
    
    onDoctorLocationAdd: function(btn, e, eOpts){
	// Push the DoctorLocationsAddEdit view into the navigation view
	if (!this.doctorLocationsAddEdit) {
	    this.doctorLocationsAddEdit = Ext.widget('doctorLocationsAddEdit');
	}
	this.doctorLocationsAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_add_location_title() + '</font>');
	this.getDoctorContainer().push(this.doctorLocationsAddEdit);
	
	//to reset the whole doctor registration form
	this.doctorLocationsAddEdit.reset();

	// To get last entered location / clinic's state & city
	var doctorLocationsStore = Ext.getStore('DoctorLocationsStore').getData();
	var doctorLocationLength = doctorLocationsStore.items.length;
	//console.log(doctorLocationLength);

	var doctorLocationsStoreData = null;
	if(doctorLocationLength > 0){
	    doctorLocationsStoreData = doctorLocationsStore.items[doctorLocationLength - 1].data;
	}

	Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Loading_States()
        });
		
	// to fill State select box on Dr. Registration page
	var stateStore = Ext.getStore('StateStore');
	stateStore.load({
	    scope: this,
            callback : function(records, operation, success) {
		Ext.Viewport.setMasked(false);
		if (success) {
		    if(doctorLocationsStoreData != null){
			this.doctorLocationsAddEdit.getFields('state').setValue(doctorLocationsStoreData.state);
			storage.setItem('cityId', doctorLocationsStoreData.city);
		    }
		}
		else {
		    var err_message = '';
		    if (operation.exception) {
			err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
		    }
		    else {
			err_message = operation.getRequest().getProxy().getReader().rawData.error;
		    }
		    this.showErrorMsg(err_message);
		}
	    }
	});
	Ext.ComponentQuery.query('#btnDrLocationDelete')[0].hide();
	
	// to hide label and assigned user list on location page
	Ext.ComponentQuery.query('#label_assign_to')[0].hide();
	Ext.ComponentQuery.query('#profileAssignedList')[0].hide();	
    },
    
    onDoctorLocationSelect: function(list, index, element, record, evt){
	
	//console.log(record);
	
	// Push the DoctorLocationsAddEdit view into the navigation view
	if (!this.doctorLocationsAddEdit) {
	    this.doctorLocationsAddEdit = Ext.widget('doctorLocationsAddEdit');
	}
	this.doctorLocationsAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_edit_location_title() + '</font>');
	this.getDoctorContainer().push(this.doctorLocationsAddEdit);

	Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Loading_States()
        });

	// to fill State select box on Dr. Registration page
	var stateStore = Ext.getStore('StateStore');
	stateStore.removeAll();
	stateStore.load({
	    scope: this,
            callback : function(records, operation, success) {
		Ext.Viewport.setMasked(false);
		if (success) {
		    this.doctorLocationsAddEdit.getFields('state').setValue(record.getData().state);
		    storage.setItem('cityId', record.getData().city);
		}
		else {
		    var err_message = '';
		    if (operation.exception) {
			err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
		    }
		    else {
			err_message = operation.getRequest().getProxy().getReader().rawData.error;
		    }
		    this.showErrorMsg(err_message);
		}
	    }
	});
	
	this.doctorLocationsAddEdit.getFields('establishmentname').setValue(record.getData().establishmentname);
	this.doctorLocationsAddEdit.getFields('area').setValue(record.getData().area);
	this.doctorLocationsAddEdit.getFields('addressline1').setValue(record.getData().addressline1);
	this.doctorLocationsAddEdit.getFields('addressline2').setValue(record.getData().addressline2);
	this.doctorLocationsAddEdit.getFields('zip').setValue(record.getData().zip);
	this.doctorLocationsAddEdit.getFields('phone').setValue(record.getData().phone);
	
	this.doctorLocationsAddEdit.getFields('establishmentid').setValue(record.getData().establishmentid);
	this.doctorLocationsAddEdit.getFields('areaid').setValue(record.getData().areaid);
	
	if(record.getData().estisactive)
              Ext.ComponentQuery.query('#radio_dr_location_active')[0].setChecked(true);
          else
              Ext.ComponentQuery.query('#radio_dr_location_inactive')[0].setChecked(true);
	
	Ext.ComponentQuery.query('#btnDrLocationDelete')[0].show();
	
	// this method will get doctor or staff with doctor assigned loacation list by selected location
	this.loadStaffProfileAssignedLocations(record.getData().establishmentid);
	
	// to show label and assigned user list on location page
	Ext.ComponentQuery.query('#label_assign_to')[0].show();
	Ext.ComponentQuery.query('#profileAssignedList')[0].show();
    },
    
    onChangeStateByDoctorLocation: function(selectBox, newValue, oldValue, eOpts){
	
	if (newValue != oldValue) {
	    Ext.Viewport.setMasked({
		xtype: 'loadmask',
		message: DoctorAppointment.util.Constant.getLabel_Loading_Cities()
	    });
	    Ext.getStore('CityStore').removeAll();
	    var stateId_Value = selectBox.getValue();
	    
	    Ext.getStore('CityStore').load({
		params: {stateId: stateId_Value},
		scope: this,
		callback : function(records, operation, success) {
		    Ext.Viewport.setMasked(false);
		    if (success) {
			var city =  storage.getItem('cityId');
			if(!Ext.isEmpty(city))
			    this.doctorLocationsAddEdit.getFields('city').setValue(city);
		    }
		    else {
			var err_message = '';
			if (operation.exception) {
			    err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			}
			else {
			    err_message = operation.getRequest().getProxy().getReader().rawData.error;
			}
			this.showErrorMsg(err_message);
		    }
		}
	    });    
	}
	
	
    },
    
    onActivateDoctorLocations: function(){
	// by passing doctor id doctor location list will show on DoctorLocation page
	var doctorid;
	//console.log(accesscontrols.isAdmin);
	if(accesscontrols.isAdmin){
	    //parentID
	    var parentUserID = storage.getItem("parentUserID");
	    if(parentUserID == "null" || parentUserID == ""){
		doctorid = storage.getItem("doctorid");
	    }else{
		doctorid = parentUserID;
	    }
	}else{
	    // logged in id
	    doctorid = storage.getItem("doctorid");
	}	
	
	this.loadDoctorLocationsStore(doctorid);
	
	// show or hide to add location button on behalf of accesscontrols permisssion
	if(accesscontrols.isAllEstablishmentCreateAllowed || accesscontrols.isMyEstablishmentCreateAllowed){
	    this.getBtnDrLocationAdd().show();	   
	}else{
	    this.getBtnDrLocationAdd().hide();
	}
    },
    
    onDoctorLocationDelete: function(btn, e, eOpts){
	if(this.checkConnectionStatus()){
	    Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_label_delete(),
		function(buttonId) {
		   if (buttonId === 'yes') {
		 	this.submitDoctorLocationDelete();
		   }
		},
		this // scope of the controller 
	    );
	}
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 		
    },
    
    submitDoctorLocationDelete: function(){
	var usergroupid = storage.getItem("usergroupid");
	var doctorid = storage.getItem("doctorid");
	var establishmentid = this.doctorLocationsAddEdit.getFields('establishmentid').getValue();
	//console.log("doctorid: " + doctorid + " " + "establishmentid: " + establishmentid);
	
	// Mask the Viewport
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = '';
	// on behalf of establishmentid (exist or not) submitting url changed for Doctor Add or Edit Locations
	requestUrl = DoctorAppointment.util.Constant.getDoctor_Delete_Locations_Url();
	
        var encodedUrl = encodeURI(requestUrl);
    
        Ext.Ajax.request({
            params: {
		    doctorid: doctorid,
                    establishmentid: establishmentid,
		    usergroupid: usergroupid
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the Viewport
                Ext.Viewport.setMasked(false);

                if(resultResponse.success){

		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//to hide Doctor Registration form and send on doctor home page
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }                
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                Ext.Viewport.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });
	
    },
    
    // *** Doctor Locations End ***
    
    // *** Doctor Add / Edit Locations Start ***
    
     onAddDoctorLocation: function(btn, e, eOpts){
        // if N/W available
        if(this.checkConnectionStatus()){
            var doctorLocationsAddEditForm = this.getDoctorLocationsAddEdit();
    
            var values = doctorLocationsAddEditForm.getValues();
            //console.log(values);
            
            var doctorLocationsAddEditModel = Ext.create('DoctorAppointment.model.doctor.DoctorLocationsAddEditModel', {
		establishmentname: values.establishmentname,
                state: values.state,
                city: values.city,
                area: values.area,
                addressline1: values.addressline1,
                addressline2: values.addressline2,
                zip: values.zip,
                phone: values.phone
            });
            
            // some field are mandatory so validated here
            var errs = doctorLocationsAddEditModel.validate(),
            msg = '';
            
	    if (!errs.isValid()) {
                errs.each(function (err) {
                    msg += err.getMessage() + '<br/>';
                }); // each()
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
            }else{
            
                doctorLocationsAddEditForm.updateRecord(doctorLocationsAddEditModel, true);
		
		var doctorid = storage.getItem("doctorid");
                //console.log(doctorid);
		doctorLocationsAddEditForm.getFields('doctorid').setValue(doctorid);
                
                // submit the doctor registration form
                this.submitDoctorLocation(doctorLocationsAddEditModel, doctorLocationsAddEditForm);
            }            
            
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 
    },
    
    submitDoctorLocation: function(doctorLocationsAddEditModel, doctorLocationsAddEditForm){
	var usergroupid = storage.getItem("usergroupid");
        // Mask the Doctor Login form
        doctorLocationsAddEditForm.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = '';
	// on behalf of establishmentid (exist or not) submitting url changed for Doctor Add or Edit Locations
	if(Ext.isEmpty(doctorLocationsAddEditForm.getFields('establishmentid').getValue())){
	    requestUrl = DoctorAppointment.util.Constant.getDoctor_Add_Locations_Url();
	}else{
	    requestUrl = DoctorAppointment.util.Constant.getDoctor_Edit_Locations_Url();
	}
	
        var encodedUrl = encodeURI(requestUrl);
	
	var estisactive = false;

	if(Ext.ComponentQuery.query('#radio_dr_location_active')[0].isChecked()){
	    estisactive = true;
	}else if(Ext.ComponentQuery.query('#radio_dr_location_inactive')[0].isChecked()){
	    estisactive = false;
	}
    
        Ext.Ajax.request({
            params: {
		    establishmentname: doctorLocationsAddEditModel.get('establishmentname'),
                    state:doctorLocationsAddEditModel.get('state'),
                    city:doctorLocationsAddEditModel.get('city'),
                    area:doctorLocationsAddEditModel.get('area'),
                    addressline1:doctorLocationsAddEditModel.get('addressline1'),
                    addressline2:doctorLocationsAddEditModel.get('addressline2'),
                    zip:doctorLocationsAddEditModel.get('zip'),
                    phone:doctorLocationsAddEditModel.get('phone'),
		    establishmentid: doctorLocationsAddEditForm.getFields('establishmentid').getValue(),
		    doctorid: doctorLocationsAddEditForm.getFields('doctorid').getValue(),
		    areaid: doctorLocationsAddEditForm.getFields('areaid').getValue(),
		    estisactive: estisactive,
		    usergroupid: usergroupid
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the doctor forgotpassword form
                doctorLocationsAddEditForm.setMasked(false);

                if(resultResponse.success){

		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//to hide Doctor Registration form and send on doctor home page
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }                
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                doctorLocationsAddEditForm.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });
    },  
    
    // *** Doctor Add / Edit Locations End ***
    
    // *** Doctor BlockAvailability Start ***
    onActivateDoctorBlockAvailability: function(){
	
	// Get doctor id
	var doctorid = storage.getItem("doctorid");
	
	// this method will load all DOCTOR & DOCTORADMIN added profiles
	this.loadDoctorProfiles(doctorid, 'DoctorStoreForBlockAvailability');

	// this method will show assigned location list if any
	this.loadDoctorAssignedLocations(doctorid, 'DoctorAssignedLocationStoreForBlockAvailability');
	
	// show or hide to add block availability button on behalf of accesscontrols permisssion
	if(accesscontrols.isAllBlockCreateAllowed || accesscontrols.isMyBlockCreateAllowed){
	    //btnDrAvailabilityAdd
	    this.getBtnDrAvailabilityAdd().show()
	}else{
	    this.getBtnDrAvailabilityAdd().hide()
	}
	
    },
    
    onActivateDoctorBlockAvailabilityAddEdit: function(){
	
	//Set selected doctor name and its selected location
	
	var doctorName = this.getSelectDoctorForBlockAvailability().getRecord().data.name;
	this.doctorBlockAvailabilityAddEdit.getComponent('lblDoctorName_Block').setHtml(doctorName);
	var location = this.getSelectLocationForBlockAvailability().getRecord().data.establishmentname;
	this.doctorBlockAvailabilityAddEdit.getComponent('lblDoctorLocation_Block').setHtml(location);
	
	//// Set selected doctor id
	var doctorid = this.getSelectDoctorForBlockAvailability().getRecord().data.profileid;
	this.doctorBlockAvailabilityAddEdit.getFields('doctorid').setValue(doctorid);
	
	// set establishment id or location id
	var establishmentid = this.getSelectLocationForBlockAvailability().getRecord().data.establishmentid;
	this.doctorBlockAvailabilityAddEdit.getFields('establishmentid').setValue(establishmentid);
	
    },
    onDrBlockAvailabilityAdd: function(btn, e, eOpts){
	if(this.getSelectDoctorForBlockAvailability().getRecord() != null && this.getSelectLocationForBlockAvailability().getRecord() != null) {
	    // Push the DoctorBlockAvailabilityAddEdit view into the navigation view
	    if (!this.doctorBlockAvailabilityAddEdit) {
		this.doctorBlockAvailabilityAddEdit = Ext.widget('doctorBlockAvailabilityAddEdit');
	    }
	    this.doctorBlockAvailabilityAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_add_avialability_title() + '</font>');
	    this.getDoctorContainer().push(this.doctorBlockAvailabilityAddEdit);
	    
	    // Reset page for add new record
	    var value = new Date();
	    this.doctorBlockAvailabilityAddEdit.getFields('startDateBlockAvailability').setValue(value);
	    this.getStartTimePickerBlockAvailability().setValue(value);
	    this.doctorBlockAvailabilityAddEdit.getFields('endDateBlockAvailability').setValue(value);
	    this.getEndTimePickerBlockAvailability().setValue(value);
	    this.doctorBlockAvailabilityAddEdit.getFields('exclusionid').setValue('');
	    
	    // to hide delete / trash button while add doctor block available block
	    Ext.ComponentQuery.query('#btnDrBlockAvailabilityDelete')[0].hide();
	}
    },
    
    onDoctorBlockAvailabilitySelect: function(list, index, element, record, evt) {
	
	// stop to select block availability hours while for staff on behalf of accesscontrols permisssion
	if(!(accesscontrols.isAllBlockUpdateAllowed || accesscontrols.isMyBlockUpdateAllowed)){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),DoctorAppointment.util.Constant.getMsg_No_Permission());
	    //disable selection while select row in list
	    list.setDisableSelection(true);
	    return;
	}
	
	if (!this.doctorBlockAvailabilityAddEdit) {
	    this.doctorBlockAvailabilityAddEdit = Ext.widget('doctorBlockAvailabilityAddEdit');
	}
	this.doctorBlockAvailabilityAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_edit_avialability_title() + '</font>');
	this.getDoctorContainer().push(this.doctorBlockAvailabilityAddEdit);
	
	var startDateArr = getDateArray(record.getData().startdate);
	var endDateArr = getDateArray(record.getData().enddate);
	
	var startDateObj = new Date(startDateArr[0], startDateArr[1], startDateArr[2]);
	var endDateObj = new Date(endDateArr[0], endDateArr[1], endDateArr[2]);
	
	this.doctorBlockAvailabilityAddEdit.getFields('exclusionid').setValue(record.getData().exclusionid);
	this.doctorBlockAvailabilityAddEdit.getFields('startDateBlockAvailability').setValue(startDateObj);
	this.getStartTimePickerBlockAvailability().setTime(record.getData().start_time);
	this.doctorBlockAvailabilityAddEdit.getFields('endDateBlockAvailability').setValue(endDateObj);
	this.getEndTimePickerBlockAvailability().setTime(record.getData().end_time);
	
	
	//disable selection while select row in list
	list.setDisableSelection(true);
	
	Ext.ComponentQuery.query('#btnDrBlockAvailabilityDelete')[0].show();
    },
    
    onSelectDoctorForBlockAvailability: function(obj, newValue, oldValue, eOpts) {
	
	if(this.getSelectDoctorForBlockAvailability().getRecord() != null) {
	    
	    // Get selected doctor id
	    var doctorid = this.getSelectDoctorForBlockAvailability().getRecord().data.profileid;
	    
	    // this method will show assigned location list if any
	    this.loadDoctorAssignedLocations(doctorid, 'DoctorAssignedLocationStoreForBlockAvailability');    
	}
    },
    
    onSelectLocationForBlockAvailability: function(obj, newValue, oldValue, eOpts){
	
	if(this.getSelectLocationForBlockAvailability().getRecord() != null && this.getSelectDoctorForBlockAvailability().getRecord() != null) {
	
	    // Get selected doctor id
	    var doctorid = this.getSelectDoctorForBlockAvailability().getRecord().data.profileid;
	    
	    // Get establishment id or location id
	    var establishmentid = this.getSelectLocationForBlockAvailability().getRecord().data.establishmentid;
	    
	    // Load office hour store    
	    this.loadDoctorBlockAvailabilityStore(doctorid, establishmentid);
	}
	
    },
    
    loadDoctorBlockAvailabilityStore: function(doctorid, establishmentid){
	
	var usergroupid = storage.getItem("usergroupid");
	
	Ext.getStore('BlockAvailabilityStore').removeAll();
        Ext.getStore('BlockAvailabilityStore').getProxy().setExtraParams({
            doctorid: doctorid,		
	    establishmentid: establishmentid,
	    usergroupid: usergroupid
        });
	
        Ext.getStore('BlockAvailabilityStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			Ext.ComponentQuery.query('#doctorBlockAvailabilityList')[0].setEmptyText('<center>' + err_message + '</center>');
			//this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			Ext.ComponentQuery.query('#doctorBlockAvailabilityList')[0].setEmptyText('<center>' + err_message + '</center>');
			//this.showErrorMsg(err_message);
                    }
		    
		}
	    }
	});
    },
    
    onClick_SubmitDrBlockAvailability:function(obj, e, eOpts){
	
	var drBlockAvailabilityAddEditForm = this.getDoctorBlockAvailabilityAddEdit();
	var values = drBlockAvailabilityAddEditForm.getValues();

	
	// Compare time and check that start time can not greater than end time
	var start_date = values.startDateBlockAvailability;
	var end_date = values.endDateBlockAvailability;
	var start_time = this.getStartTimePickerBlockAvailability().getTime();
	var end_time = this.getEndTimePickerBlockAvailability().getTime();
	
	// Compare date and check that start date can not greater than end date
	var startDateObj = new Date(start_date);
	var endDateObj = new Date(end_date);
	
	var comparisonVal = endDateObj - startDateObj;
	if (comparisonVal < 0) {
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Block_Availability(), DoctorAppointment.util.Constant.getMsg_Date_Comparsion_Fail());
	    return;  
	}
	
	// Compare time and check that start time can not greater than end time
	var arrTime = start_time.split(":");
	var start_hours = arrTime[0];
	var start_minute = arrTime[1];
	
	arrTime = end_time.split(":");
	var end_hours = arrTime[0];
	var end_minute = arrTime[1];
	
	// Check time if both dates are equal
	if (comparisonVal == 0) {
	    	if (start_hours <= end_hours) {
		    if (start_hours == end_hours && start_minute >= end_minute) {
			Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Block_Availability(), DoctorAppointment.util.Constant.getMsg_Time_Comparsion_Fail());
			return;
		    }
		}
		else {
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Block_Availability(), DoctorAppointment.util.Constant.getMsg_Time_Comparsion_Fail());
		    return;
		}
	}
	
	// if N/W available
	if(this.checkConnectionStatus()){

	    var blockAvailabilityHoursModel = Ext.create('DoctorAppointment.model.doctor.DoctorBlockAvailabilityModel', {
		    doctorid: values.doctorid,
		    exclusionid: values.exclusionid,
		    establishmentid: values.establishmentid,
		    startdate: Ext.Date.format(new Date(startDateObj), Ext.Date.patterns.ISO8601Short),
		    start_time: start_time,
		    enddate: Ext.Date.format(new Date(endDateObj), Ext.Date.patterns.ISO8601Short),
		    end_time: end_time
	    });
	    
	    this.submitBlockAvailabilityHours(blockAvailabilityHoursModel, drBlockAvailabilityAddEditForm);
	    
	}else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 
    },
    
    submitBlockAvailabilityHours: function(blockAvailabilityHoursModel, drBlockAvailabilityAddEditForm){
	
	// Mask the Doctor Block Availability Add Edit form
        drBlockAvailabilityAddEditForm.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
	
	var usergroupid = storage.getItem("usergroupid");
        
        var requestUrl = '';
	// on behalf of exclusionid (exist or not) submitting url changed for Doctor Add or Edit block availability
	if(Ext.isEmpty(blockAvailabilityHoursModel.get('exclusionid'))){
	    requestUrl = DoctorAppointment.util.Constant.getDoctor_Add_BlockAvailability_Url();
	}else{
	   requestUrl = DoctorAppointment.util.Constant.getDoctor_Edit_BlockAvailability_Url();
	}
	var encodedUrl = encodeURI(requestUrl);
	
	Ext.Ajax.request({
            params: {
		    doctorid:blockAvailabilityHoursModel.get('doctorid'),
		    establishmentid:blockAvailabilityHoursModel.get('establishmentid'),
		    exclusionid:blockAvailabilityHoursModel.get('exclusionid'),
		    startdate: blockAvailabilityHoursModel.get('startdate'),
		    start_time: blockAvailabilityHoursModel.get('start_time'),
		    enddate: blockAvailabilityHoursModel.get('enddate'),
		    end_time: blockAvailabilityHoursModel.get('end_time'),
		    usergroupid: usergroupid
		    
		    
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the doctor forgotpassword form
                drBlockAvailabilityAddEditForm.setMasked(false);

                if(resultResponse.success){

		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//to hide Doctor Registration form and send on doctor home page
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }                
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                drBlockAvailabilityAddEditForm.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });

    },
    
    onDoctorBlockAvailabilityDelete: function(btn, e, eOpts){
	if(this.checkConnectionStatus()){
	    Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_label_delete(),
		function(buttonId) {
		   if (buttonId === 'yes') {
		 	this.submitDoctorBlockAvailabilityDelete();
		   }
		},
		this // scope of the controller 
	    );
	}
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 		
    },
    
    submitDoctorBlockAvailabilityDelete: function(){
	var doctorid = this.doctorBlockAvailabilityAddEdit.getFields('doctorid').getValue();
	var establishmentid = this.doctorBlockAvailabilityAddEdit.getFields('establishmentid').getValue();
	var exclusionid = this.doctorBlockAvailabilityAddEdit.getFields('exclusionid').getValue();
	//console.log("doctorid: " + doctorid + " " + "establishmentid: " + establishmentid + " " + "exclusionid: " + exclusionid);
	var usergroupid = storage.getItem("usergroupid");
	
	// Mask the Viewport
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = '';
	// on behalf of establishmentid (exist or not) submitting url changed for Doctor Add or Edit Locations
	requestUrl = DoctorAppointment.util.Constant.getDoctor_Delete_BlockAvailability_Url();
	
        var encodedUrl = encodeURI(requestUrl);
    
        Ext.Ajax.request({
            params: {
		    doctorid: doctorid,
                    establishmentid: establishmentid,
		    exclusionid: exclusionid,
		    usergroupid: usergroupid
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the Viewport
                Ext.Viewport.setMasked(false);

                if(resultResponse.success){

		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//to hide Doctor Registration form and send on doctor home page
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }                
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                Ext.Viewport.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });
	
    },    
    
    // *** Doctor BlockAvailability End ***
    
    // *** Doctor OfficeHours Start ***
    onActivateDoctorOfficeHours: function(){
	
	// Get doctor id
	var doctorid = storage.getItem("doctorid");
	
	// this method will load all DOCTOR & DOCTORADMIN added profiles
	this.loadDoctorProfiles(doctorid, 'DoctorStoreForOfficeHours');

	// this method will show assigned location list if any
	this.loadDoctorAssignedLocations(doctorid, 'DoctorAssignedLocationStoreForOfficeHours');
	
	// show or hide to add office hours button on behalf of accesscontrols permisssion
	if(accesscontrols.isAllOfficeHoursCreateAllowed || accesscontrols.isMyOfficeHoursCreateAllowed){
	    this.getBtnDrOfficeHoursAdd().show();	   
	}else{
	    this.getBtnDrOfficeHoursAdd().hide();
	}
    },
    
    onActivateDoctorOfficeHoursAddEdit: function(){
	
	//Set selected doctor name and its selected location
	var doctorName = this.getSelectDoctorForOfficeHour().getRecord().data.name;
	this.doctorOfficeHoursAddEdit.getComponent('lblDoctorName_Office').setHtml(doctorName);
	var location = this.getSelectLocationForOfficeHour().getRecord().data.establishmentname;
	this.doctorOfficeHoursAddEdit.getComponent('lblDoctorLocation_Office').setHtml(location);
	
	// Set selected doctor id
	var doctorid = this.getSelectDoctorForOfficeHour().getRecord().data.profileid;
	this.doctorOfficeHoursAddEdit.getFields('doctorid').setValue(doctorid);
	
	// set establishment id or location id
	var establishmentid = this.getSelectLocationForOfficeHour().getRecord().data.establishmentid;
	this.doctorOfficeHoursAddEdit.getFields('establishmentid').setValue(establishmentid);
	
    },
    onSelectDoctorForOfficeHour: function(obj, newValue, oldValue, eOpts) {
	
	if(this.getSelectDoctorForOfficeHour().getRecord() != null) {
	    
	    // Get selected doctor id
	    var doctorid = this.getSelectDoctorForOfficeHour().getRecord().data.profileid;
	    
	    // this method will show assigned location list if any
	    this.loadDoctorAssignedLocations(doctorid, 'DoctorAssignedLocationStoreForOfficeHours');    
	}
	
    },
    onSelectLocationForOfficeHour: function(obj, newValue, oldValue, eOpts) {
	
	if(this.getSelectLocationForOfficeHour().getRecord() != null && this.getSelectDoctorForOfficeHour().getRecord() != null) {
	
	    // Get selected doctor id
	    var doctorid = this.getSelectDoctorForOfficeHour().getRecord().data.profileid;
	    
	    // Get establishment id or location id
	    var establishmentid = this.getSelectLocationForOfficeHour().getRecord().data.establishmentid;
	    
	    // Load office hour store    
	    this.loadDoctorOfficeHoursStore(doctorid, establishmentid);
	}else{
	    Ext.getStore('DoctorOfficeHoursStore').removeAll();
	}
    },
    loadDoctorOfficeHoursStore: function(doctorid, establishmentid){
        var usergroupid = storage.getItem("usergroupid");
	
	Ext.getStore('DoctorOfficeHoursStore').removeAll();
        Ext.getStore('DoctorOfficeHoursStore').getProxy().setExtraParams({
            doctorid: doctorid,		
	    establishmentid: establishmentid,
	    usergroupid: usergroupid
        });
	
        Ext.getStore('DoctorOfficeHoursStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			Ext.ComponentQuery.query('#doctorOfficeHoursList')[0].setEmptyText('<center>' + err_message + '</center>');
			//this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			Ext.ComponentQuery.query('#doctorOfficeHoursList')[0].setEmptyText('<center>' + err_message + '</center>');
			//this.showErrorMsg(err_message);
                    }
		    
		} 
	    }
	});
    },
    
    onDrOfficeHoursAdd: function(btn, e, eOpts){
	if(this.getSelectLocationForOfficeHour().getRecord() != null && this.getSelectDoctorForOfficeHour().getRecord() != null) {
	    //Push the DoctorOfficeHoursAddEdit view into the navigation view
	    if (!this.doctorOfficeHoursAddEdit) {
		this.doctorOfficeHoursAddEdit = Ext.widget('doctorOfficeHoursAddEdit');
	    }
	    this.doctorOfficeHoursAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_add_officeHours_title() + '</font>');
	    this.getDoctorContainer().push(this.doctorOfficeHoursAddEdit);
	    
	    // Reset page for add new record
	    var value = new Date();
	    this.getStartTimePickerOfficeHour().setValue(value);
	    this.getCloseTimePickerOfficeHour().setValue(value);
	    this.doctorOfficeHoursAddEdit.getFields('blockid').setValue('');
	    this.getOptionsOfficeHoursToken().setChecked(true);
	    this.getOptionsOfficeHoursAppointment().setChecked(false);
	    this.getTxtAppointmentTime().setHidden(true);
	    this.getTxtAppointmentTime().setValue('');
	    this.getTxtTokenTime().setHidden(false);
	    this.getTxtTokenTime().setValue('');
	    this.getTxtNotoken().setValue('');
	    this.getTxtNotoken().setHidden(false);
	    this.doctorOfficeHoursAddEdit.getFields('effectivedate').setValue(value);
	    this.doctorOfficeHoursAddEdit.getFields('expirydate').setValue(value);
	    this.doctorOfficeHoursAddEdit.getFields('sun').setChecked(false);
	    this.doctorOfficeHoursAddEdit.getFields('mon').setChecked(false);
	    this.doctorOfficeHoursAddEdit.getFields('tue').setChecked(false);
	    this.doctorOfficeHoursAddEdit.getFields('wed').setChecked(false);
	    this.doctorOfficeHoursAddEdit.getFields('thu').setChecked(false);
	    this.doctorOfficeHoursAddEdit.getFields('fri').setChecked(false);
	    this.doctorOfficeHoursAddEdit.getFields('sat').setChecked(false);
	    
	    // to hide delete / trash button while add doctor office hours
	    Ext.ComponentQuery.query('#btnDrOfficeHrsDelete')[0].hide();
	}
    },
    
    onDrOfficeHoursSelect: function(list, index, element, record, evt) {
	
	// stop to select office hours while for staff on behalf of accesscontrols permisssion
	if(!(accesscontrols.isAllOfficeHoursUpdateAllowed || accesscontrols.isMyOfficeHoursUpdateAllowed)){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),DoctorAppointment.util.Constant.getMsg_No_Permission());
	    //disable selection while select row in list
	    list.setDisableSelection(true);
	    return;
	}
	
	if (!this.doctorOfficeHoursAddEdit) {
	    this.doctorOfficeHoursAddEdit = Ext.widget('doctorOfficeHoursAddEdit');
	}
	this.doctorOfficeHoursAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_edit_officeHours_title() + '</font>');
	this.getDoctorContainer().push(this.doctorOfficeHoursAddEdit);
	
	// Fill values of selected record
	if (record.getData().type == 'token') {
	    this.getOptionsOfficeHoursToken().setChecked(true);
	    this.getOptionsOfficeHoursAppointment().setChecked(false);
	    this.getTxtTokenTime().setValue(record.getData().period);
	    this.getTxtNotoken().setValue(record.getData().tokenlimit);
	    this.getTxtAppointmentTime().setValue('')
	}
	else {
	    this.getOptionsOfficeHoursAppointment().setChecked(true);
	    this.getOptionsOfficeHoursToken().setChecked(false);
	    this.getTxtAppointmentTime().setValue(record.getData().period);
	    this.getTxtTokenTime().setValue('');
	    this.getTxtNotoken().setValue('');
	}
	
	// to convert date format while edit time show.
	var effectivedateArr = getDateArray(record.getData().effectivedate);
	var expirydateArr = getDateArray(record.getData().expirydate);
	
	var effectivedateObj = new Date(effectivedateArr[0], effectivedateArr[1], effectivedateArr[2]);
	var expirydateObj = new Date(expirydateArr[0], expirydateArr[1], expirydateArr[2]);	
	
	this.doctorOfficeHoursAddEdit.getFields('sun').setChecked(record.getData().sun);
	this.doctorOfficeHoursAddEdit.getFields('mon').setChecked(record.getData().mon);
	this.doctorOfficeHoursAddEdit.getFields('tue').setChecked(record.getData().tue);
	this.doctorOfficeHoursAddEdit.getFields('wed').setChecked(record.getData().wed);
	this.doctorOfficeHoursAddEdit.getFields('thu').setChecked(record.getData().thu);
	this.doctorOfficeHoursAddEdit.getFields('fri').setChecked(record.getData().fri);
	this.doctorOfficeHoursAddEdit.getFields('sat').setChecked(record.getData().sat);
	
	this.doctorOfficeHoursAddEdit.getFields('blockid').setValue(record.getData().blockid);
	this.doctorOfficeHoursAddEdit.getFields('effectivedate').setValue(effectivedateObj);
	this.doctorOfficeHoursAddEdit.getFields('expirydate').setValue(expirydateObj);
	this.getStartTimePickerOfficeHour().setTime(record.getData().start_time);
	this.getCloseTimePickerOfficeHour().setTime(record.getData().end_time);
	
	//disable selection while select row in list
	list.setDisableSelection(true);
	
	// to hide delete / trash button while add doctor office hours
	Ext.ComponentQuery.query('#btnDrOfficeHrsDelete')[0].show();
	
    },
    
    onOfficeHoursTokenChecked: function(obj, e, eOpts ) {
	
	this.getTxtAppointmentTime().setHidden(true);
	this.getTxtTokenTime().setHidden(false);
	this.getTxtNotoken().setHidden(false);
	
    },
    
    onOfficeHoursAppointmentChecked: function(obj, e, eOpts ) {
	
	this.getTxtAppointmentTime().setHidden(false);
	this.getTxtTokenTime().setHidden(true);
	this.getTxtNotoken().setHidden(true);
    },
    
    onClick_SubmitDoctorOfficeHours: function(obj, e, eOpts ) {
	
	var doctorOfficeHoursAddEditForm = this.getDoctorOfficeHoursAddEdit();
	var values = doctorOfficeHoursAddEditForm.getValues();
	
	// Compare time and check that start time can not greater than end time
	var start_time = this.getStartTimePickerOfficeHour().getTime();
        var end_time = this.getCloseTimePickerOfficeHour().getTime();
	
	var arrTime = start_time.split(":");
	var start_hours = arrTime[0];
	var start_minute = arrTime[1];
	
	arrTime = end_time.split(":");
	var end_hours = arrTime[0];
	var end_minute = arrTime[1];
	
	if (start_hours >= end_hours) {
	    if (start_minute >= end_minute) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_Time_Comparsion_Fail());
		return;
	    }
	}
	
	// Check that at least a  day of week is selected
	if ((!values.sun) && (!values.mon) && (!values.tue) && (!values.wed) && (!values.thu) && (!values.fri) && (!values.sat)) {
	    
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_Select_Week_Day());
	    return;
	}
	
	if(this.getOptionsOfficeHoursToken().getChecked()) {
	
	    // Check token time is fill
	    if (this.getTxtTokenTime().getValue().length == 0) {
		    
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(),DoctorAppointment.util.Constant.getMsg_Enter_Token_Time());
		return;
	    }
	    
	    // Check that token numberis fill
	    if (this.getTxtNotoken().getValue().length == 0) {
		    
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(),DoctorAppointment.util.Constant.getMsg_Enter_Token_Number());
		return;
	    }
	}
	else {
	    
	    // Check appiontment time is fill
	    if (this.getTxtAppointmentTime().getValue().length == 0) {
		    
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(),DoctorAppointment.util.Constant.getMsg_Enter_Appointment_Time());
		return;
	    }
	}  
	
	// Check Effective date is not less than current date
	var todayDate = new Date();
	todayDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate(), 0, 0);
	var effectiveDate = new Date(values.effectivedate);
	effectiveDate = new Date(effectiveDate.getFullYear(), effectiveDate.getMonth(), effectiveDate.getDate(), 0, 0);
	
	var comparisonVal = effectiveDate - todayDate;
	if(comparisonVal < 0) {
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_EffectiveDate_Comparsion_Fail());
	    return;      
	}
	
	// Check Effective date and expiry date
	var expiryDate = new Date(values.expirydate);
	expiryDate = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), expiryDate.getDate(), 0, 0);
	
	comparisonVal = expiryDate - effectiveDate;
	if (comparisonVal <= 0) {
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_ExpiryDate_Comparsion_Fail());
	    return;  
	}
	
	// Check selected days must come in effective to expiry days
	var dayNames = [DoctorAppointment.util.Constant.getLabel_Sunday(),
		  DoctorAppointment.util.Constant.getLabel_Monday(),
		  DoctorAppointment.util.Constant.getLabel_Tuesday(),
		  DoctorAppointment.util.Constant.getLabel_Wednesday(),
		  DoctorAppointment.util.Constant.getLabel_Thursday(),
		  DoctorAppointment.util.Constant.getLabel_Friday(),
		  DoctorAppointment.util.Constant.getLabel_Saturday()];
	var daysArray = getDays(effectiveDate, expiryDate, dayNames);
	var isdayFound = false;
	
	if (values.sun){
	    isdayFound = getIsDayFound(DoctorAppointment.util.Constant.getLabel_Sunday(), daysArray);
	    if (isdayFound == false) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_days_Comparsion_Fail());
		return;  
	    }
	}
	if (values.mon){
	    isdayFound = getIsDayFound(DoctorAppointment.util.Constant.getLabel_Monday(), daysArray);
	    if (isdayFound == false) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_days_Comparsion_Fail());
		return;  
	    }
	}
	if (values.tue){
	    isdayFound = getIsDayFound(DoctorAppointment.util.Constant.getLabel_Tuesday(), daysArray);
	    if (isdayFound == false) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_days_Comparsion_Fail());
		return;  
	    }
	}
	if (values.wed){
	    isdayFound = getIsDayFound(DoctorAppointment.util.Constant.getLabel_Wednesday(), daysArray);
	    if (isdayFound == false) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_days_Comparsion_Fail());
		return;  
	    }
	}
	if (values.thu){
	    isdayFound = getIsDayFound(DoctorAppointment.util.Constant.getLabel_Thursday(), daysArray);
	    if (isdayFound == false) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_days_Comparsion_Fail());
		return;  
	    }
	}
	if (values.fri){
	    isdayFound = getIsDayFound(DoctorAppointment.util.Constant.getLabel_Friday(), daysArray);
	    if (isdayFound == false) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_days_Comparsion_Fail());
		return;  
	    }
	}
	if (values.sat){
	    isdayFound = getIsDayFound(DoctorAppointment.util.Constant.getLabel_Saturday(), daysArray);
	    if (isdayFound == false) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getDoctor_Office_Hours(), DoctorAppointment.util.Constant.getMsg_days_Comparsion_Fail());
		return;  
	    }
	}
    
	
	// if N/W available
	if(this.checkConnectionStatus()){
	    
            var doctorOfficeHoursAddEditModel = Ext.create('DoctorAppointment.model.doctor.DoctorOfficeHoursAddEditModel', {
		start_time: this.getStartTimePickerOfficeHour().getTime(),
                end_time: this.getCloseTimePickerOfficeHour().getTime(),
                sun: values.sun ? 'true': 'false',
                mon: values.mon ? 'true': 'false',
                tue: values.tue ? 'true': 'false',
                wed: values.wed ? 'true': 'false',
                thu: values.thu ? 'true': 'false',
                fri: values.fri ? 'true': 'false',
		sat: values.sat ? 'true': 'false',
		period: this.getOptionsOfficeHoursToken().getChecked() ? this.getTxtTokenTime().getValue() : this.getTxtAppointmentTime().getValue(),
		tokenlimit: this.getOptionsOfficeHoursToken().getChecked() ? this.getTxtNotoken().getValue() : '',
		blockid: values.blockid,
		doctorid: values.doctorid,
		establishmentid: values.establishmentid,
		effectivedate: Ext.Date.format(values.effectivedate, Ext.Date.patterns.ISO8601Short),
		expirydate: Ext.Date.format(values.expirydate, Ext.Date.patterns.ISO8601Short)
            });

	    //console.log(doctorOfficeHoursAddEditModel);
	    // submit the doctor office hour form
	    this.submitDrOfficeHours(doctorOfficeHoursAddEditModel, doctorOfficeHoursAddEditForm);
                   
            
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 
	
    },
    
    
    submitDrOfficeHours: function(doctorOfficeHoursAddEditModel, doctorOfficeHoursAddEditForm) {
	
	 // Mask the Doctor office hours Add Edit form
        doctorOfficeHoursAddEditForm.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
	var usergroupid = storage.getItem("usergroupid");
	
        var requestUrl = '';
	// on behalf of establishmentid (exist or not) submitting url changed for Doctor Add or Edit office hours
	if(Ext.isEmpty(doctorOfficeHoursAddEditModel.get('blockid'))){
	    requestUrl = DoctorAppointment.util.Constant.getDoctor_Add_OfficeHours_Url();
	}else{
	   requestUrl = DoctorAppointment.util.Constant.getDoctor_Edit_OfficeHours_Url();
	}
	var encodedUrl = encodeURI(requestUrl);
	Ext.Ajax.request({
            params: {
		    sun:doctorOfficeHoursAddEditModel.get('sun'),
                    mon:doctorOfficeHoursAddEditModel.get('mon'),
                    tue:doctorOfficeHoursAddEditModel.get('tue'),
                    wed:doctorOfficeHoursAddEditModel.get('wed'),
                    thu:doctorOfficeHoursAddEditModel.get('thu'),
                    fri:doctorOfficeHoursAddEditModel.get('fri'),
                    sat:doctorOfficeHoursAddEditModel.get('sat'),
		    doctorid:doctorOfficeHoursAddEditModel.get('doctorid'),
		    establishmentid:doctorOfficeHoursAddEditModel.get('establishmentid'),
		    blockid:doctorOfficeHoursAddEditModel.get('blockid'),
		    start_time: doctorOfficeHoursAddEditModel.get('start_time'),
		    end_time: doctorOfficeHoursAddEditModel.get('end_time'),
		    period: doctorOfficeHoursAddEditModel.get('period'),
		    tokenlimit:doctorOfficeHoursAddEditModel.get('tokenlimit'),
		    effectivedate: doctorOfficeHoursAddEditModel.get('effectivedate'),
		    expirydate: doctorOfficeHoursAddEditModel.get('expirydate'),
		    usergroupid: usergroupid
		    
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the doctor forgotpassword form
                doctorOfficeHoursAddEditForm.setMasked(false);

                if(resultResponse.success){

		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//to hide Doctor Registration form and send on doctor home page
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }                
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                doctorOfficeHoursAddEditForm.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });
    },
    
    onDoctorOfficeHrsDelete: function(btn, e, eOpts){
	if(this.checkConnectionStatus()){
	    Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_label_delete(),
		function(buttonId) {
		   if (buttonId === 'yes') {
		 	this.submitDoctorOfficeHrsDelete();
		   }
		},
		this // scope of the controller 
	    );
	}
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 		
    },    
    
    submitDoctorOfficeHrsDelete: function(){
	var doctorid = this.doctorOfficeHoursAddEdit.getFields('doctorid').getValue();
	var blockid = this.doctorOfficeHoursAddEdit.getFields('blockid').getValue();
	var establishmentid = this.doctorOfficeHoursAddEdit.getFields('establishmentid').getValue();
	//console.log("doctorid: " + doctorid + " " + "establishmentid: " + establishmentid + " " + "blockid: " + blockid);
	
	// Mask the Viewport
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = '';
	requestUrl = DoctorAppointment.util.Constant.getDoctor_Delete_OfficeHrs_Url();
	var usergroupid = storage.getItem("usergroupid");
	
        var encodedUrl = encodeURI(requestUrl);
    
        Ext.Ajax.request({
            params: {
		    doctorid: doctorid,
                    establishmentid: establishmentid,
		    blockid: blockid,
		    usergroupid: usergroupid
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the Viewport
                Ext.Viewport.setMasked(false);

                if(resultResponse.success){

		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//to hide Doctor Registration form and send on doctor home page
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }                
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                Ext.Viewport.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });
	
    },    
    
    // *** Doctor OfficeHours End ***
    
    
    
    
    
    
    
    
    
    
    
    
    // *** Doctor Profiles Start ***
    
    /**
     * This method will be used to create more sub profile account through profies doctor list option
     */
    
    onDoctorProfileAdd: function(btn, e, eOpts){
	// Push the DoctorLocationsAddEdit view into the navigation view
	if (!this.doctorProfilesAddEdit) {
	    this.doctorProfilesAddEdit = Ext.widget('doctorProfilesAddEdit');
	}
	this.doctorProfilesAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_Profiles_Tab_Add_Profile() + '</font>');
	//this.getDoctorContainer().push(this.doctorProfilesAddEdit);
	
	// Mask the page
	Ext.Viewport.setMasked({
	    xtype: 'loadmask',
	    message: DoctorAppointment.util.Constant.getLabel_Loading()
	});
	
	// This GroupStore is used while doing doctor sign up and as well as showing in Profile section by set another URL
	Ext.getStore('GroupsStore').removeAll();
	Ext.getStore('GroupsStore').getProxy().setUrl(DoctorAppointment.util.Constant.getGroup_List_DoctorAndStaffGroups());
	//Ext.getStore('GroupsStore').load();
        Ext.getStore('GroupsStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			this.showErrorMsg(err_message);
                    }
		    
		}else{
		    // unmask the page
                    Ext.Viewport.setMasked(false);
		    // after loaded the avaiable account type doctorProfilesAddEdit pushed on doctor contatiner
		    this.getDoctorContainer().push(this.doctorProfilesAddEdit);
		    this.doctorProfilesAddEdit.getFields('groupid').enable();
		}
	    }
	});
	
	// to fill Specialty select box on Dr. Registration page
	var specialtyStore = Ext.getStore('SpecialtyStore');
	specialtyStore.load();

	Ext.ComponentQuery.query('#btnDrProfileDelete')[0].hide();
	//to reset the whole doctor profile form
	this.doctorProfilesAddEdit.reset();
	
	Ext.getStore('DoctorProfileAssignedLocationStore').removeAll();
	Ext.getStore('StaffLocationStore').removeAll();
	//Ext.ComponentQuery.query('#label_assign_location')[0].hide();
	
    },    

    /**
     * This method will be used to display in list of created sub profile account
     */
    onActivateDoctorProfiless: function(){
	// by passing doctor id doctor profiles list will show on DoctorProfile page
	var doctorid;
	var usergroupid = storage.getItem("usergroupid");
	
	if(accesscontrols.isAdmin){
	    //parentID
	    var parentUserID = storage.getItem("parentUserID");
	    if(parentUserID == "null" || parentUserID == ""){
		doctorid = storage.getItem("doctorid");
	    }else{
		doctorid = parentUserID;
	    }
	}else{
	    // logged in id
	    doctorid = storage.getItem("doctorid");
	}	
	
	//console.log("onActivateDoctorProfiless");
	Ext.getStore('ProfilesStore').removeAll();
        Ext.getStore('ProfilesStore').getProxy().setExtraParams({
            doctorid: doctorid,
	    usergroupid: usergroupid
        });
        Ext.getStore('ProfilesStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			Ext.ComponentQuery.query('#doctorProfilesList')[0].setEmptyText('<center>' + err_message + '</center>');
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			Ext.ComponentQuery.query('#doctorProfilesList')[0].setEmptyText('<center>' + err_message + '</center>');
                    }
		    
		}
	    }
	});
	
	//this.onActivateDoctorLocations();
	//this.loadDoctorLocationsStore(doctorid);
	
	Ext.getStore('GroupsStore').removeAll();
	Ext.getStore('GroupsStore').getProxy().setUrl(DoctorAppointment.util.Constant.getGroup_List_DoctorAndStaffGroups());
	//Ext.getStore('GroupsStore').load();
        Ext.getStore('GroupsStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			this.showErrorMsg(err_message);
                    }
		    
		}
	    }
	});
	
	
	// show or hide to add profile button on behalf of accesscontrols permisssion
	if(accesscontrols.isUserCreateAllowed){
	    this.getBtnDrProfileAdd().show();	   
	}else{
	    this.getBtnDrProfileAdd().hide();
	}	
    },
    
    onChangeDoctorProfileAccountType: function(selectBox, newValue, oldValue, eOpts){
	var accountTypeValue = selectBox.getValue();
	//console.log(accountTypeValue);
	if(!Ext.isEmpty(accountTypeValue)){
	    if(accountTypeValue == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTORADMIN() || accountTypeValue == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTOR()){
		Ext.getCmp('doctorProfileSpecialty').show();
		Ext.getCmp('doctorProfileDegree').show();
		Ext.getCmp('doctorProfileImage').show();
		// show or hide to add location button on behalf of accesscontrols permisssion
		if(accesscontrols.isAllEstablishmentCreateAllowed || accesscontrols.isMyEstablishmentCreateAllowed){
		    Ext.getCmp('btn_doctor_assign_location').show();
		}
		Ext.getCmp('btn_staff_assign_location').hide();
		// remove counter part store list according to account type selection
		Ext.getStore('StaffLocationStore').removeAll();
		Ext.getCmp('label_location_and_days').show();
		Ext.getCmp('label_location').hide();
	    }else if(accountTypeValue == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFFADMIN() || accountTypeValue == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFF()){
		Ext.getCmp('doctorProfileSpecialty').hide();
		Ext.getCmp('doctorProfileDegree').hide();
		Ext.getCmp('doctorProfileImage').hide();
		Ext.getCmp('btn_doctor_assign_location').hide();
		// show or hide to add location button on behalf of accesscontrols permisssion
		if(accesscontrols.isAllEstablishmentCreateAllowed || accesscontrols.isMyEstablishmentCreateAllowed){
		    Ext.getCmp('btn_staff_assign_location').show();
		}
		// remove counter part store list according to account type selection
		Ext.getStore('DoctorProfileAssignedLocationStore').removeAll();
		Ext.getCmp('label_location_and_days').hide();
		Ext.getCmp('label_location').show();
		
	    }
	}
	
    },
    
    onDoctorProfileRegistration: function(btn, e, eOpts){
	// if N/W available
        if(this.checkConnectionStatus()){
            var doctorProfileRegistrationForm = this.getDoctorProfilesAddEdit();
    
            var values = doctorProfileRegistrationForm.getValues();
            //console.log(values);
            
            var doctorProfileRegistrationModel = Ext.create('DoctorAppointment.model.doctor.DoctorProfileRegistrationModel', {
                email: values.email,
                password: values.password,
                fname: values.fname,
		mname: values.mname,
                lname: values.lname,
                specialty: values.specialty,
                sex: values.sex,
                mobile: values.mobile,
                degree: values.degree,
                groupid: values.groupid
            });
            
            // some field are mandatory so validated here
            var errs = doctorProfileRegistrationModel.validate(),
            msg = '';
	    
            // to give error msg by checking values of password and confirm password
            var pwd_value = Ext.ComponentQuery.query('#id_profile_password')[0].getValue();
            var conf_pwd_value = Ext.ComponentQuery.query('#id_profile_confpassword')[0].getValue();
	    
	    // to give error msg to enter mobile no for doctor or doctor admin
	    var mobileno = doctorProfileRegistrationModel.get('mobile');
	    
	    // to get selected group code
	    var selectedGroupCode = doctorProfileRegistrationModel.get('groupid');
	    
            if (!errs.isValid()) {
                errs.each(function (err) {
                    msg += err.getMessage() + '<br/>';
                }); // each()
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
            }else if(pwd_value != conf_pwd_value){
		msg = DoctorAppointment.util.Constant.getMsg_pwd_not_match();
                Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
            }else if((selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTORADMIN() || selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTOR()) && Ext.isEmpty(mobileno)){
		msg = DoctorAppointment.util.Constant.getMsg_Mobile_Required();
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
	    }	    
	    // if specialty is empty and groupcode selected is DOCTOR or DOCTORADMIN then show specialty required alert box
	    else if((selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTORADMIN() || selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTOR()) && Ext.isEmpty(doctorProfileRegistrationModel.get('specialty'))){
		msg = DoctorAppointment.util.Constant.getMsg_Specialty_Required();
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
	    }else{
		// if groupcode selected is DOCTOR or DOCTORADMIN and mobile no range does not match
		if(!Ext.isEmpty(mobileno)){
		    var match = mobileno.match(/^\d{10,15}$/);
		    if (Ext.isEmpty(match)){
			msg = DoctorAppointment.util.Constant.getMsg_Mobile_Length_Invalid();
			Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
			return;
		    }
		}
		
		if(selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFFADMIN() || selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFF()){
		    // if groupcode selected is STAFF or STAFFADMIN then send specialty, degree values blank to server
		    doctorProfileRegistrationModel.set('specialty', '');
		    doctorProfileRegistrationModel.set('degree', ''); // optional on form
		}
            
                doctorProfileRegistrationForm.updateRecord(doctorProfileRegistrationModel, true);
                
		var userid = storage.getItem("doctorid"); 
                //console.log(userid);
		doctorProfileRegistrationForm.getFields('userid').setValue(userid);
		
                // submit the doctor profile registration form
                this.submitDoctorProfileRegistration(doctorProfileRegistrationModel, doctorProfileRegistrationForm);
            }            
            
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 	
    },
    
    submitDoctorProfileRegistration: function(doctorProfileRegistrationModel, doctorProfileRegistrationForm){
         //Mask the Doctor Login form
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
	// to get selected group code
	var selectedGroupCode = doctorProfileRegistrationModel.get('groupid');
	var requestUrl = '';
	// on behalf of profileid (exist or not) submitting url changed for Doctor Add or Update Profile
	if(Ext.isEmpty(doctorProfileRegistrationForm.getFields('profileid').getValue())){
	    requestUrl = DoctorAppointment.util.Constant.getDoctor_Add_Profie();
	    var addData = [];
		
	    if(selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFFADMIN() || selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFF()){
		var recordsAssigned = Ext.getStore('StaffLocationStore').getData().items;
		var estbIds = [];
		var traverseDoctorIds = [];
		var isDoctorIdTraversed
		
		Ext.Array.each(recordsAssigned, function(item){
		    estbIds = [];
		    isDoctorIdTraversed = false;
		    Ext.Array.each(traverseDoctorIds, function(docId){
			if (item.data.doctorid == docId) {
			    isDoctorIdTraversed = true;
			    return;
			}
		    });
		    Ext.Array.each(recordsAssigned, function(matchItem){
			if (item.data.doctorid == matchItem.data.doctorid && (!isDoctorIdTraversed)) {
			    traverseDoctorIds.push(item.data.doctorid);
			    estbIds.push(matchItem.data.establishmentid);
			}
		    });
		    if (!isDoctorIdTraversed) {
			var dataObjectStr = '';
			if (addData.length == 0)
			    dataObjectStr = item.data.doctorid + "," + estbIds.join(",");
			else
			    dataObjectStr = "addEstbStaff=" + item.data.doctorid + "," + estbIds.join(",");
			addData.push(dataObjectStr);
		    }
		    
		});
		var addDataStr = addData.join("&");
		doctorProfileRegistrationForm.getFields('addEstbStaff').setValue(addDataStr);
	    }
	    else {
		var recordsAssigned = Ext.getStore('DoctorProfileAssignedLocationStore').getData().items;
		var isValid = true;
		Ext.Array.each(recordsAssigned, function (item) {
		    addData.push(item.data.establishmentid);
		    var ele_textbox = Ext.get('todo_textbox_'+item.data.establishmentid);
		    if ((!ele_textbox.dom.value.match(/^([1-9]|[1-8]\d|9[0])$/)) || parseInt(ele_textbox.dom.value, 10) < 1 || parseInt(ele_textbox.dom.value, 10) > 90) {
			isValid = false;
			return;
		    }
		    addData.push(ele_textbox.dom.value);
		});
		if (isValid == false) {
		    doctorProfileRegistrationForm.setMasked(false);
		    return;
		}
		var addDataStr = addData.join(",");
		doctorProfileRegistrationForm.getFields('addEstablishmentIdsArrayDoctor').setValue(addDataStr);
	    }
	
	}else{
	    requestUrl = DoctorAppointment.util.Constant.getDoctor_Update_Profie();
	    var editData = [];
	    var addData = [];
	    
	    if(selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFFADMIN() || selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFF()){
		var recordsAssigned = Ext.getStore('StaffLocationStore').getData().items;
		//console.log(recordsAssigned);
		var estbIds = [];
		var traverseDoctorIds = [];
		var isDoctorIdTraversed
		Ext.Array.each(recordsAssigned, function(item){
		    if (!item.data.isexisting) {
			
			estbIds = [];
			isDoctorIdTraversed = false;
			Ext.Array.each(traverseDoctorIds, function(docId){
			    if (item.data.doctorid == docId) {
				isDoctorIdTraversed = true;
				return;
			    }
			});
			Ext.Array.each(recordsAssigned, function(matchItem){
			    if (item.data.doctorid == matchItem.data.doctorid && (!isDoctorIdTraversed)) {
				traverseDoctorIds.push(item.data.doctorid);
				if (!matchItem.data.isexisting)
				    estbIds.push(matchItem.data.establishmentid);
			    }
			});
			if (!isDoctorIdTraversed) {
			    var dataObjectStr = '';
			    if (addData.length == 0)
				dataObjectStr = item.data.doctorid + "," + estbIds.join(",");
			    else
				dataObjectStr = "addEstbStaff=" + item.data.doctorid + "," + estbIds.join(",");
			    addData.push(dataObjectStr);
			}
		    }
		    
		});
		var addDataStr = addData.join("&");
		doctorProfileRegistrationForm.getFields('addEstbStaff').setValue(addDataStr);
	    }
	    else {
		var recordsAssigned = Ext.getStore('DoctorProfileAssignedLocationStore').getData().items;
		var isValid = true;
		Ext.Array.each(recordsAssigned, function (item) {
		    var ele_textbox = Ext.fly('todo_textbox_'+item.data.establishmentid);
		    if ((!ele_textbox.dom.value.match(/^([1-9]|[1-8]\d|9[0])$/)) || parseInt(ele_textbox.dom.value, 10) < 1 || parseInt(ele_textbox.dom.value, 10) > 90) {
			isValid = false;
			return;
		    }
		    if (item.data.isexisting) {
			editData.push(item.data.establishmentid);
			var ele_textbox = Ext.fly('todo_textbox_'+item.data.establishmentid);
			editData.push(ele_textbox.dom.value);   
		    }
		    else {
			addData.push(item.data.establishmentid);
			var ele_textbox = Ext.fly('todo_textbox_'+item.data.establishmentid);
			addData.push(ele_textbox.dom.value); 
		    }
		});
		if (isValid == false) {
		    doctorProfileRegistrationForm.setMasked(false);
		    return;
		}
		
		var editDataStr = editData.join(",");
		doctorProfileRegistrationForm.getFields('editEstablishmentIdsArrayDoctor').setValue(editDataStr);
		
		var addDataStr = addData.join(",");
		doctorProfileRegistrationForm.getFields('addEstablishmentIdsArrayDoctor').setValue(addDataStr);
	    }
	
	}
	
	console.log('addDoctor: '+doctorProfileRegistrationForm.getFields('addEstablishmentIdsArrayDoctor').getValue());
	console.log('editDoctor: '+doctorProfileRegistrationForm.getFields('editEstablishmentIdsArrayDoctor').getValue());
	console.log('deleteDoctor: '+doctorProfileRegistrationForm.getFields('deleteEstablishmentIdsArrayDoctor').getValue());
	
	console.log('addStaff: '+doctorProfileRegistrationForm.getFields('addEstbStaff').getValue());
	console.log('deleteStaff: '+doctorProfileRegistrationForm.getFields('deleteEstbStaff').getValue());
	
	var parentUserID = storage.getItem("parentUserID");
	if(parentUserID == "null" || parentUserID == ""){
	    parentUserID = storage.getItem("doctorid");
	}
	
	var usergroupid = storage.getItem("usergroupid");
	
	if ((imageData != undefined) || (imageData != null)) {
	    
	    doctorProfileRegistrationModel.set('doctorid', doctorProfileRegistrationForm.getFields('userid').getValue());
	    doctorProfileRegistrationModel.set('profileid', doctorProfileRegistrationForm.getFields('profileid').getValue());
	    doctorProfileRegistrationModel.set('addEstablishmentIdsArrayDoctor', doctorProfileRegistrationForm.getFields('addEstablishmentIdsArrayDoctor').getValue());
	    doctorProfileRegistrationModel.set('editEstablishmentIdsArrayDoctor', doctorProfileRegistrationForm.getFields('editEstablishmentIdsArrayDoctor').getValue());
	    doctorProfileRegistrationModel.set('deleteEstablishmentIdsArrayDoctor', doctorProfileRegistrationForm.getFields('deleteEstablishmentIdsArrayDoctor').getValue());
	    doctorProfileRegistrationModel.set('addEstbStaff', doctorProfileRegistrationForm.getFields('addEstbStaff').getValue());
	    doctorProfileRegistrationModel.set('deleteEstbStaff', doctorProfileRegistrationForm.getFields('deleteEstbStaff').getValue());
	    doctorProfileRegistrationModel.set('isprofile', 'true');
	    doctorProfileRegistrationModel.set('usergroupid', usergroupid);
	    doctorProfileRegistrationModel.set('parentUserID', parentUserID);
	    
	    uploadPhotoWithDoctorProfile(doctorProfileRegistrationModel, requestUrl);
	    
	}
	else {
	
	    var encodedUrl = encodeURI(requestUrl);
       
	    Ext.Ajax.request({
		params: 
		{
			email:doctorProfileRegistrationModel.get('email'),
			password:doctorProfileRegistrationModel.get('password'),
			fname:doctorProfileRegistrationModel.get('fname'),
			mname:doctorProfileRegistrationModel.get('mname'),
			lname:doctorProfileRegistrationModel.get('lname'),
			specialty:doctorProfileRegistrationModel.get('specialty'),
			sex:doctorProfileRegistrationModel.get('sex'),
			mobile:doctorProfileRegistrationModel.get('mobile'),
			degree:doctorProfileRegistrationModel.get('degree'),
			groupid:doctorProfileRegistrationModel.get('groupid'),
			doctorid: doctorProfileRegistrationForm.getFields('userid').getValue(),
			profileid: doctorProfileRegistrationForm.getFields('profileid').getValue(),
			addEstablishmentIdsArrayDoctor: doctorProfileRegistrationForm.getFields('addEstablishmentIdsArrayDoctor').getValue(),
			editEstablishmentIdsArrayDoctor: doctorProfileRegistrationForm.getFields('editEstablishmentIdsArrayDoctor').getValue(),
			deleteEstablishmentIdsArrayDoctor: doctorProfileRegistrationForm.getFields('deleteEstablishmentIdsArrayDoctor').getValue(),
			addEstbStaff: doctorProfileRegistrationForm.getFields('addEstbStaff').getValue(),
			deleteEstbStaff: doctorProfileRegistrationForm.getFields('deleteEstbStaff').getValue(),
			isprofile: 'true',
			usergroupid: usergroupid,
			parentUserID: parentUserID
		}, // actual
		url: encodedUrl,
		method: 'POST',
		success: function(response) {
		    //console.log("Sucess:->");
		    //console.log(response.status + ', ' + response.responseText);
		    
		    var resultResponse = Ext.JSON.decode(response.responseText);
		    //console.log(resultResponse.success);
		    
		     //unmask the doctor profile registration form
		    Ext.Viewport.setMasked(false);
    
		    //console.log(doctorid);
    
		    if(resultResponse.success){
			
			Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			    function(buttonId) {
			       if (buttonId === 'ok') {
				    //to hide Doctor Registration form and send on doctor home page
				    this.getDoctorContainer().pop();
			       }
			    },
			    this // scope of the controller 
			);
			
			
		    }else{
			Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
		    }                
		},
		failure: function (msg) {
		    console.log("Failur:->");
		    console.log(msg.status + ' , ' + msg.statusText);
		    Ext.Viewport.setMasked(false);
		    if(msg.status == 0){
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
		    }else{
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
		    }
		},
		scope: this
	    });
	}
    },    
    
    onDoctorProfileSelect: function(list, index, element, record, evt){
	//console.log(record);
	
	//disable selection while select row in list
        list.setDisableSelection(true);
	
	// Push the doctorProfilesAddEdit view into the navigation view
	if (!this.doctorProfilesAddEdit) {
	    this.doctorProfilesAddEdit = Ext.widget('doctorProfilesAddEdit');
	}
	this.doctorProfilesAddEdit.setTitle('<font size = \'4\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getDoctor_Profiles_title() + '</font>');
	//this.getDoctorContainer().push(this.doctorProfilesAddEdit);
	
	// Mask the page
	Ext.Viewport.setMasked({
	    xtype: 'loadmask',
	    message: DoctorAppointment.util.Constant.getLabel_Loading()
	});
	
	// This GroupStore is used while doing doctor sign up and as well as showing in Profile section by set another URL
	Ext.getStore('GroupsStore').removeAll();
	Ext.getStore('GroupsStore').getProxy().setUrl(DoctorAppointment.util.Constant.getGroup_List_DoctorAndStaffGroups());
	//Ext.getStore('GroupsStore').load();
        Ext.getStore('GroupsStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			this.showErrorMsg(err_message);
                    }
		    
		}else{
		    // unmask the page
                    Ext.Viewport.setMasked(false);
		    this.doctorProfilesAddEdit.getFields('groupid').setValue(record.getData().groupid);
		    this.doctorProfilesAddEdit.getFields('groupid').disable();
		}
	    }
	});	
	
	// to fill Specialty select box on Dr. Registration page
	var specialtyStore = Ext.getStore('SpecialtyStore');
	specialtyStore.load();
	
	Ext.Viewport.setMasked({
	    xtype: 'loadmask',
	    message: DoctorAppointment.util.Constant.getLabel_Loading()
	});
	Ext.getStore('ProfilesUpdateStore').removeAll();
	var doctorid = storage.getItem("doctorid");
	var profileid = record.getData().profileid;
	var usergroupid = storage.getItem("usergroupid");
	
	Ext.getStore('ProfilesUpdateStore').load({
	    params: {
		doctorid: doctorid,
		profileid: profileid,
		usergroupid: usergroupid
		},
	    scope: this,
	    callback : function(records, operation, success) {
		Ext.Viewport.setMasked(false);
		if (success) {
		    //console.log(records);
		    this.doctorProfilesAddEdit.getFields('email').setValue(records[0].getData().email);
		    this.doctorProfilesAddEdit.getFields('password').setValue(records[0].getData().password);
		    Ext.ComponentQuery.query('#id_profile_confpassword')[0].setValue(records[0].getData().password);
		    this.doctorProfilesAddEdit.getFields('fname').setValue(records[0].getData().fname);
		    this.doctorProfilesAddEdit.getFields('mname').setValue(records[0].getData().mname);
		    this.doctorProfilesAddEdit.getFields('lname').setValue(records[0].getData().lname);
		    this.doctorProfilesAddEdit.getFields('specialty').setValue(records[0].getData().specialty);
		    Ext.ComponentQuery.query('#drProfileImage')[0].setSrc(records[0].getData().imageurl);
		    
		    if(records[0].getData().sex == 'Male'){
			Ext.getCmp('radiofield_sex_male').setChecked(true);
		    }
		    else{
			Ext.getCmp('radiofield_sex_female').setChecked(true);
		    }
		    this.doctorProfilesAddEdit.getFields('mobile').setValue(records[0].getData().mobile);
		    this.doctorProfilesAddEdit.getFields('degree').setValue(records[0].getData().degree);
		    this.doctorProfilesAddEdit.getFields('userid').setValue(doctorid);
		    this.doctorProfilesAddEdit.getFields('profileid').setValue(records[0].getData().profileid);
		}
		else {
		    var err_message = '';
		    if (operation.exception) {
			err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
		    }
		    else {
			err_message = operation.getRequest().getProxy().getReader().rawData.error;
		    }
		    this.showErrorMsg(err_message);
		}
	    }
	}); 	
	
	var selectedGroupCode = record.getData().groupid;
	if(selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTORADMIN() || selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTOR()){
	    Ext.getStore('StaffLocationStore').removeAll();
	    // this will fetch doctor profile assigned location list
	    this.loadDoctorProfileAssignedLocations(profileid);
	}else if(selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFFADMIN() || selectedGroupCode == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFF()){
	    Ext.getStore('DoctorProfileAssignedLocationStore').removeAll();
	    // this will fetch staff assigned location list
	    this.loadStaffAssignedLocations(profileid);
	}

	Ext.ComponentQuery.query('#btnDrProfileDelete')[0].show();
	//Ext.ComponentQuery.query('#label_assign_location')[0].show();
	
	// Reset values by empty string
	Ext.getCmp('addEstablishmentIdsArrayDoctor').setValue('');
	Ext.getCmp('editEstablishmentIdsArrayDoctor').setValue('');
	Ext.getCmp('deleteEstablishmentIdsArrayDoctor').setValue('');
	Ext.getCmp('addEstbStaff').setValue('');
	Ext.getCmp('deleteEstbStaff').setValue('');
	
	// doctorProfilesAddEdit pushed on doctor contatiner
	this.getDoctorContainer().push(this.doctorProfilesAddEdit);
	
	// show or hide to add location button on behalf of accesscontrols permisssion
	if(accesscontrols.isAllEstablishmentCreateAllowed || accesscontrols.isMyEstablishmentCreateAllowed){
	    Ext.getCmp('btn_staff_assign_location').show();
	    Ext.getCmp('btn_doctor_assign_location').show();
	}else{
	    Ext.getCmp('btn_staff_assign_location').hide();
	    Ext.getCmp('btn_doctor_assign_location').hide();
	}
	
    // show or hide delete profile button on behalf of accesscontrols permisssion
	if(accesscontrols.isUserCreateAllowed){
	    Ext.getCmp('btnDrProfileDelete').show();
	}else{
	    Ext.getCmp('btnDrProfileDelete').hide();
	}
	
	// able to delete assigned location and disable / enable on behalf of accesscontrols permisssion
	if((accesscontrols.isAllEstablishmentDeleteAllowed || accesscontrols.isMyEstablishmentDeleteAllowed) && accesscontrols.isAdmin){
	    Ext.getCmp('doctorAssignedLocations').setDisabled(false);
	}else{
	    Ext.getCmp('doctorAssignedLocations').setDisabled(true);
	}
	if((accesscontrols.isAllEstablishmentDeleteAllowed || accesscontrols.isMyEstablishmentDeleteAllowed) && accesscontrols.isAdmin){
	    Ext.getCmp('staffAssignedLocations').setDisabled(false);
	}else{
	    Ext.getCmp('staffAssignedLocations').setDisabled(true);
	}	
	
    },
    
    onDoctorAssignLocationButtonTap: function(button, e, options) {
        var doctorAssignLocationOverlay = this.getDoctorAssignLocationOverlay();
        doctorAssignLocationOverlay.showBy(button); //, "tl-tr?"
	// to load all locations values into store to show in listing via overlay
	var doctorid = storage.getItem("doctorid");
	var usergroupid = storage.getItem("usergroupid");
	
	// before show selected deselect all record otherwise selection merged with previous selction
	Ext.getCmp('doctorAssignLocationsMultiselectList').deselectAll();
	
	//Ext.Viewport.setMasked({
	//    xtype: 'loadmask',
	//    message: DoctorAppointment.util.Constant.getLabel_Loading()
	//});	
	
	Ext.getStore('DoctorLocationsStore').removeAll();
        Ext.getStore('DoctorLocationsStore').getProxy().setExtraParams({
            doctorid: doctorid,
	    usergroupid: usergroupid
        });
        Ext.getStore('DoctorLocationsStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		//Ext.Viewport.setMasked(false);
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			this.showErrorMsg(err_message);
                    }
		    
		}else{
			var doctorLocationsStore = Ext.getStore('DoctorLocationsStore').getData();
			var doctorLocationLength = doctorLocationsStore.items.length;
			//console.log(doctorLocationsStore);
			
			var recordsAssigned = Ext.getStore('DoctorProfileAssignedLocationStore').getData().items;
			// to show previous assigned location of doctor
			Ext.Array.each(recordsAssigned, function (item) {
			    var doctorLocationsStoreData = null;
			    for(i=0; i< doctorLocationLength; i++){
				doctorLocationsStoreData = doctorLocationsStore.items[i].data;
				if(doctorLocationsStoreData.establishmentid == item.data.establishmentid)
				    Ext.getCmp('doctorAssignLocationsMultiselectList').select(i,true);
			    }			
			});		    
		}
	    }
	});
    },
    
    onStaffAssignLocationButtonTap: function(button, e, options) {
        var staffAssignLocationOverlay = this.getStaffAssignLocationOverlay();
        staffAssignLocationOverlay.showBy(button); //, "tl-tr?"
	
	// to load all Dr's and it's respective assigned locations values into store to show in listing via overlay
	var doctorid = storage.getItem("doctorid");
	// this method will load all DOCTOR & DOCTORADMIN added profiles
	this.loadDoctorProfiles(doctorid, 'DoctorProfilesStore');
	Ext.getCmp('staffAssignLocationsMultiselectList').deselectAll();
    },
    
    onChangeDoctorAssignLocation: function(selectBox, newValue, oldValue, eOpts){

	if(this.getSelectfield_doctor_assign_location().getRecord() != null) {
	    
	    // Get selected doctor id
	    var doctorid = this.getSelectfield_doctor_assign_location().getRecord().data.profileid;
	    
	    // this method will show assigned location list if any
	    this.loadDoctorAssignedLocations(doctorid, 'DoctorAssignedLocationListStore');
	    Ext.getCmp('staffAssignLocationsMultiselectList').deselectAll();
	}	
    },
    
    onDoctorAssignLocationDone: function(button, e, options) {
	
	//var recordsToAssign = Ext.getCmp('doctorAssignLocationsMultiselectList').getSelection(); // this will return the selected list item values in array
	//console.log(recordsToAssign);
	//Ext.getStore('DoctorProfileAssignedLocationStore').setData(recordsToAssign);
	
	var recordsToAssign = Ext.getCmp('doctorAssignLocationsMultiselectList').getSelection(); // this will return the selected list item values in array
	if(recordsToAssign.length == 0){
	    //Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_location_must_selected());
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_location_must_selected(),
		    function(buttonId) {
		       if (buttonId === 'ok') {
			}
		    },
		    this // scope of the controller 
		);	    
	    return;
	}
	var oldObjects = Ext.getStore('DoctorProfileAssignedLocationStore').getData().items;
	var updateObjects = [];
	
	// Create update object array with store values because store can set with model object data
	Ext.Array.each(oldObjects, function (item) {
	    var doctorLocationObject = new DoctorAppointment.model.doctor.DoctorAssignedLocationListModel();
	    doctorLocationObject.set('establishmentid', item.data.establishmentid);
	    doctorLocationObject.set('establishmentname', item.data.establishmentname);
	    doctorLocationObject.set('advancebookingdays', item.data.advancebookingdays);
	    
	    updateObjects.push(doctorLocationObject);
	});
	var newObjects = [];
	var itemExist = false;
	// Take only those selected object that are not already exist
	Ext.Array.each(recordsToAssign, function (item) {
	    itemExist = false;
	    Ext.Array.each(updateObjects, function (updateItem){
		if (item.data.establishmentid == updateItem.data.establishmentid) {
		    itemExist = true;
		}
	    });
	    if (!itemExist) {
		    var doctorLocationObject = new DoctorAppointment.model.doctor.DoctorAssignedLocationListModel();
		    doctorLocationObject.set('establishmentid', item.data.establishmentid);
		    doctorLocationObject.set('establishmentname', item.data.establishmentname);
		    doctorLocationObject.set('advancebookingdays', item.data.advancebookingdays);
		    doctorLocationObject.set('isexisting', false);
		    
		    // Check this object is a existing object then set its value for it
		    Ext.Array.each(existingDoctorRecord, function(existingItem) {
			if (item.data.establishmentid == existingItem.data.establishmentid){
			    doctorLocationObject.set('isexisting', true);
			    var deleteValues = Ext.getCmp('deleteEstablishmentIdsArrayDoctor').getValue();
			    var valueArray = deleteValues.split(",");
			    var i = 0;
			    Ext.Array.each(valueArray, function(value){
				if (item.data.establishmentid == value) {
				    valueArray.splice(i,1);
				    deleteValues = valueArray.join(",");
				    Ext.getCmp('deleteEstablishmentIdsArrayDoctor').setValue(deleteValues);
				    return;
				}
				i++;
			    });
			    return;
			}
		    });
	    
		    newObjects.push(doctorLocationObject);
		}
	});
	// Add new object with previous objects
	Ext.Array.each(newObjects, function(item) {
	    updateObjects.push(item);
	});
	//console.log(updateObjects);
	// Set store with updated list of objects
	Ext.getStore('DoctorProfileAssignedLocationStore').setData(updateObjects);	
	
	
	this.getDoctorAssignLocationOverlay().hide();
    },
    
    // to remove doctor assigned location
     onRemoveDoctorAssignedLocation: function(list, index, element, record, evt){

        var isDrDetailsOnly = true; // use this to show doctor details or not
    
          if(evt.getTarget('.drassignclose')) {
	    
	    
	// able to delete assigned location on behalf of accesscontrols permisssion
	if(!accesscontrols.isAllEstablishmentDeleteAllowed && !accesscontrols.isMyEstablishmentDeleteAllowed){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),DoctorAppointment.util.Constant.getMsg_No_Permission());
	    return;
	}
	    
	    Ext.Msg.confirm(record.data.establishmentname,DoctorAppointment.util.Constant.getMsg_label_delete(),
		function(buttonId) {
		   if (buttonId === 'yes') {
			if(record.data.isexisting){
			    var deleteValues = Ext.getCmp('deleteEstablishmentIdsArrayDoctor').getValue();
			    var valueArray = deleteValues.split(",");
			    var valueFound = false;
			    Ext.Array.each(valueArray, function(value){
				if (record.data.establishmentid == value)
				    valueFound = true;
				return;
			    });
			    if (!valueFound) {
				deleteValues = deleteValues == '' ? record.data.establishmentid : deleteValues +','+ record.data.establishmentid;
				Ext.getCmp('deleteEstablishmentIdsArrayDoctor').setValue(deleteValues);
			    }
			    
			}    
			
			// remove selected record from store
			Ext.getStore('DoctorProfileAssignedLocationStore').removeAt(index);
		   }
		},
		this // scope of the controller 
	    );
	  }
	//  else if (evt.getTarget('input#todo_textbox_' + record.data.establishmentid)){
	//     
	//     var txtBox = previousTextBox;
	//     
	//     if (textBox.getAttribute('value') > 90){
	//	alert('be right');
	//	return;
	//     }
	//     
	//     
	//     previousTextBox = Ext.get('todo_textbox_' + record.data.establishmentid);
	//     console.log('got it');
	//  }
	//  else if(evt.getTarget('input#todo_check_' + record.data.establishmentid)){
	//    var ele_checkbox = Ext.get('todo_check_'+record.data.establishmentid)
	//    var ele_textbox = Ext.get('todo_textbox_'+record.data.establishmentid)
	//    if(!ele_checkbox.getAttribute('checked')){
	//	console.log(ele_textbox);
	//	ele_textbox.dom.disabled = false;
	//    }else{
	//	ele_textbox.dom.disabled = true;
	//    }
	//    console.log(ele);
	//  }

        //disable selection while select row in list
        list.setDisableSelection(true);
        
    },
    
    onStaffAssignLocationDone: function(button, e, options) {
	
	if(this.getSelectfield_doctor_assign_location().getRecord() != null) {
	    
	    // Get selected doctor id & name
	    var doctorid = this.getSelectfield_doctor_assign_location().getRecord().data.profileid;
	    var doctorname = this.getSelectfield_doctor_assign_location().getRecord().data.name;
	    //console.log('DrName: ' + doctorname + ' ' +'DrID: ' + doctorid);
	    
	    var recordsToAssign = Ext.getCmp('staffAssignLocationsMultiselectList').getSelection(); // this will return the selected list item values in array
	    //console.log(recordsToAssign);
	    var names = [];
	    Ext.Array.each(recordsToAssign, function (item) {
	     //console.log(item.data.establishmentid);
		names.push(item.data.establishmentid);
	    });
	    
	    var staffAssignLocationsModel = Ext.create('DoctorAppointment.model.doctor.StaffAssignLocationsModel', {
                doctorid: doctorid,
		doctorname: doctorname,
                locationarray: names
            });
            
            // doctorid and location list can not be empty in selection so validate it
            var errs = staffAssignLocationsModel.validate(),
            msg = '';
            
            if (!errs.isValid()) {
                errs.each(function (err) {
                    msg += err.getMessage() + '<br/>';
                }); // each()
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg,
		    function(buttonId) {
		       if (buttonId === 'ok') {
			}
		    },
		    this // scope of the controller 
		);
            }
            else{
		
		var oldObjects = Ext.getStore('StaffLocationStore').getData().items;
		var updateObjects = [];
		// Create update object array with store values because store can set with model object data
		Ext.Array.each(oldObjects, function (item) {
		    var staffLocationObject = new DoctorAppointment.model.doctor.StaffLocationModel();
		    staffLocationObject.set('doctorid', item.data.doctorid);
		    staffLocationObject.set('doctorname', item.data.doctorname);
		    staffLocationObject.set('establishmentid', item.data.establishmentid);
		    staffLocationObject.set('establishmentname', item.data.establishmentname);
		    staffLocationObject.set('isexisting', item.data.isexisting);
		    
		    updateObjects.push(staffLocationObject);
		});
		
		var newObjects = [];
		var itemExist = false;
		
		// Take only those selected object that are not already exist
		//console.log(recordsToAssign);
		Ext.Array.each(recordsToAssign, function (item) {
		    itemExist = false;
		    Ext.Array.each(updateObjects, function (updateItem){
			if (doctorid == updateItem.data.doctorid && item.data.establishmentid == updateItem.data.establishmentid) {
			    itemExist = true;
			}
		    });
		    if (!itemExist) {
			    var staffLocationObject = new DoctorAppointment.model.doctor.StaffLocationModel();
			    staffLocationObject.set('doctorid', doctorid);
			    staffLocationObject.set('doctorname', doctorname);
			    staffLocationObject.set('establishmentid', item.data.establishmentid);
			    staffLocationObject.set('establishmentname', item.data.establishmentname);
			    staffLocationObject.set('isexisting', false);
			    
			    // Check this object is a existing object then set its value for it
			    Ext.Array.each(existingDoctorRecord, function(existingItem) {
				
				if (doctorid == existingItem.data.doctorid && item.data.establishmentid == existingItem.data.establishmentid){
				    //console.log(doctorid +'-'+ existingItem.data.doctorid +', '+ item.data.establishmentid+'-'+existingItem.data.establishmentid);
				    staffLocationObject.set('isexisting', true);
				    var deleteValues = Ext.getCmp('deleteEstbStaff').getValue();
				    var deleteValueArray = deleteValues.split("&deleteEstbStaff=");
				    
				    var indexofDeleteArray = 0;
				    Ext.Array.each(deleteValueArray, function(deleteItem){
					if (deleteItem != undefined && deleteItem != '') {
					    var valueArray = deleteItem.split(",");
					    var doctorid = valueArray.splice(0,1);
					    var parsedValues = '';
					    if (existingItem.data.doctorid == doctorid) {
						var i = 0;
						Ext.Array.each(valueArray, function(value){
						    if (existingItem.data.establishmentid == value) {
							valueArray.splice(i,1);
							if (valueArray.length > 0) {
							    parsedValues = valueArray.join(",");
							    parsedValues = doctorid + "," + parsedValues;    
							}
							else {
							    deleteValueArray.splice(indexofDeleteArray,1);
							}
							return;
						    }
						    i++;
						});
					    }
					    if (parsedValues.length > 0)
						deleteValueArray[indexofDeleteArray] = parsedValues;
					    
					    indexofDeleteArray++;
					}
				    });
				    deleteValues = deleteValueArray.join("&deleteEstbStaff=");
				    Ext.getCmp('deleteEstbStaff').setValue(deleteValues);
				}
			    });
			    
			    newObjects.push(staffLocationObject);
			}
		});
		// Add new object with previous objects
		Ext.Array.each(newObjects, function(item) {
		    updateObjects.push(item);
		});
		//console.log(updateObjects);
		// Set store with updated list of objects
		Ext.getStore('StaffLocationStore').setData(updateObjects);
		this.getStaffAssignLocationOverlay().hide();
	    }
	}	
    },    
    
    onRemoveStaffAssignedLocations: function(list, index, element, record, evt) {
	var isDrDetailsOnly = true; // use this to show doctor details or not
    
          if(evt.getTarget('.drassignclose')) {
	    
	    // able to delete assigned location on behalf of accesscontrols permisssion
	    if(!accesscontrols.isAllEstablishmentDeleteAllowed && !accesscontrols.isMyEstablishmentDeleteAllowed){
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),DoctorAppointment.util.Constant.getMsg_No_Permission());
		return;
	    }
		
	    Ext.Msg.confirm(record.data.establishmentname,DoctorAppointment.util.Constant.getMsg_label_delete(),
		function(buttonId) {
		   if (buttonId === 'yes') {
			var doctorProfileRegistrationForm = this.getDoctorProfilesAddEdit();
			if(record.data.isexisting) {
			    var deleteValues = Ext.getCmp('deleteEstbStaff').getValue();
			    var deleteValueArray = deleteValues.split("&deleteEstbStaff=");
			    var indexOfDeleteArray = 0;
			    if (deleteValues != undefined && deleteValues != '') {
				var valuFound = false;
				var valueIndex = -1;
				Ext.Array.each(deleteValueArray, function(deleteItem){
				    if (deleteItem != undefined && deleteItem != '') {
					var valueArray = deleteItem.split(",");
					var doctorid = valueArray.splice(0,1);    
					if (record.data.doctorid == doctorid) {
					    valueIndex = indexOfDeleteArray;
					    Ext.Array.each(valueArray, function(value){
						if (record.data.establishmentid == value) {
						    valuFound = true;
						    return;
						}
					    });
					}
					
					indexOfDeleteArray++;
				    }
				});
				if (valuFound == false) {
				    if (valueIndex == -1) {
					deleteValueArray.push(record.data.doctorid + ',' +record.data.establishmentid);
				    }
				    else {
					var existingValues = deleteValueArray[valueIndex];
					existingValues = existingValues +","+ record.data.establishmentid;
					deleteValueArray[valueIndex] = existingValues;
				    }
				}
				
			    }
			    else {
				var existingValues = record.data.doctorid + ',' +record.data.establishmentid;
				deleteValueArray[indexOfDeleteArray] = existingValues;
			    }
			    deleteValues = deleteValueArray.join("&deleteEstbStaff=");
			    Ext.getCmp('deleteEstbStaff').setValue(deleteValues );
				
			}
			    
			// remove selected record from store
			Ext.getStore('StaffLocationStore').removeAt(index);    
		    }
			
		},
		this // scope of the controller 
		
	    );
	}
	
	//disable selection while select row in list
        list.setDisableSelection(true);
    },
    
    onDoctorTakeImage: function(button, e, options){
	
	if(!(Ext.os.deviceType == 'Desktop')){
	//if(Ext.os.is.iOS || Ext.os.is.Android || Ext.os.is.webOS || Ext.os.is.BlackBerry || Ext.os.is.RIMTablet || Ext.os.is.Bada){
	    
	    //Set bool to set image on proper image box (either on registration time or on profile)
	   IsPhotoOnRegister = button.id == 'btn_dr_profile_image_upload' ? false : true;
	   
	   var image;
	   var actionSheet = Ext.create('Ext.ActionSheet', {
	       items: [
		   {
		       text: 'Take Photo',
		       ui  : 'action',
		       handler: function() {
			   try{
			       actionSheet.hide();
			       navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
				    destinationType: destinationType.FILE_URI,
				    encodingType: Camera.EncodingType.JPEG,
				    targetWidth: 100,
				    targetHeight: 100,
				    correctOrientation: true
				  });
			   }
			   catch(e) {
			       alert(e.message);
			   }
		       }
		   },
		//   {
		//       text: 'Photo Gallery',
		//       ui	: 'action',
		//       handler: function() {
		//	   try{
		//	       actionSheet.hide();
		//	       navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
		//		    destinationType: destinationType.FILE_URI,
		//		    sourceType: pictureSource.PHOTOLIBRARY,
		//		    encodingType: Camera.EncodingType.JPEG,
		//		    targetWidth: 100,
		//		    targetHeight: 100,
		//		    correctOrientation: true
		//		  });
		//  
		//	   }
		//	   catch(e) {
		//	       alert(e.message);
		//	   }
		//       }
		//   },
		   {
		       text: 'Cancel',
		       ui  : 'confirm',
		       handler: function() {
			   actionSheet.hide();
		       }
		   }
	       ]
	   });
	   
	   Ext.Viewport.add(actionSheet);
	   actionSheet.show();	    
	}else{
	    Ext.Msg.alert("INFO","Device only");    
	}
    },
    
    
    onDoctorProfileDelete: function(btn, e, eOpts){
	if(this.checkConnectionStatus()){
	    Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_label_delete(),
		function(buttonId) {
		   if (buttonId === 'yes') {
		 	this.submitDoctorProfileDelete();
		   }
		},
		this // scope of the controller 
	    );
	}
        else {
        	Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        } 		
    },
    
    submitDoctorProfileDelete: function(){

	var doctorid = this.doctorProfilesAddEdit.getFields('userid').getValue();    
	var profileid = this.doctorProfilesAddEdit.getFields('profileid').getValue();
	//console.log("profileid: " + profileid );
	var usergroupid = storage.getItem("usergroupid");
	
	// Mask the Viewport
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
        });
        
        var requestUrl = '';
	requestUrl = DoctorAppointment.util.Constant.getDoctor_Delete_Profiles_Url();
	
        var encodedUrl = encodeURI(requestUrl);
    
        Ext.Ajax.request({
            params: {
		    profileid: profileid,
		    doctorid: doctorid,
		    usergroupid: usergroupid
            }, // actual
            url: encodedUrl,
            method: 'POST',
            success: function(response) {
                //console.log("Sucess:->");
                //console.log(response.status + ', ' + response.responseText);
                
                var resultResponse = Ext.JSON.decode(response.responseText);
                //console.log(resultResponse.success);
                
                // unmask the Viewport
                Ext.Viewport.setMasked(false);

                if(resultResponse.success){

		    
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
			function(buttonId) {
			   if (buttonId === 'ok') {
				//to hide Doctor Registration form and send on doctor home page
				this.getDoctorContainer().pop();
			   }
			},
			this // scope of the controller 
		    );
		    
                    
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                }                
            },
            failure: function (msg) {
                //console.log("Failur:->");
                //console.log(msg.status + ' , ' + msg.statusText);
                Ext.Viewport.setMasked(false);
                if(msg.status == 0){
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                }else{
                    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                }
            },
	    scope: this
        });
	
    },    
    
    // *** Doctor Profiles End ***
    
    // *** Common Method of DoctorProfiles, Location List by doctor and StaffProfile List Start ***
    
    /*
     *  this method will load all DOCTOR & DOCTORADMIN added profiles
     *  This method used to fill store's DoctorStoreForAppointmentOrToken,DoctorStoreForBlockAvailability,DoctorStoreForOfficeHours,DoctorProfilesStore
     */
    loadDoctorProfiles: function(doctorid, doctorStore){
	var me = this;
	var usergroupid = storage.getItem("usergroupid");
	if(accesscontrols.isAdmin){
	    //parentID
	    var parentUserID = storage.getItem("parentUserID");
	    if(parentUserID == "null" || parentUserID == ""){
		doctorid = storage.getItem("doctorid");
	    }else{
		doctorid = parentUserID;
	    }
	}else{
	    // logged in id
	    doctorid = storage.getItem("doctorid");
	}	
	Ext.getStore(doctorStore).removeAll();
        Ext.getStore(doctorStore).getProxy().setExtraParams({
            doctorid: doctorid,
	    usergroupid: usergroupid
        });
        Ext.getStore(doctorStore).load({
	    scope: me,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			me.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			me.showErrorMsg(err_message);
                    }
		    
		}
		else {
		    // set previous selected value
		    var previousDoctorId = storage.getItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_DoctorId());
		    if (previousDoctorId != null && me.getSelectDoctorForToken().getRecord() != null) {
			Ext.Array.each(records, function(item){
			    if (item.data.profileid == previousDoctorId)
				me.getSelectDoctorForToken().setValue(previousDoctorId);
			});
		    }
		    
		}
	    }
	});	
    },
    
    /*
     * This method will give all created location list by doctorid
     */
    loadDoctorLocationsStore: function(doctorid){
        //console.log("loadDoctorLocationsStore");
	var usergroupid = storage.getItem("usergroupid");
	Ext.getStore('DoctorLocationsStore').removeAll();
        Ext.getStore('DoctorLocationsStore').getProxy().setExtraParams({
            doctorid: doctorid,
	    usergroupid: usergroupid
        });
        Ext.getStore('DoctorLocationsStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			if(Ext.ComponentQuery.query('#doctorLocationsList')[0] != undefined)
			    Ext.ComponentQuery.query('#doctorLocationsList')[0].setEmptyText('<center>' + err_message + '</center>');
			else
			    this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			if(Ext.ComponentQuery.query('#doctorLocationsList')[0] != undefined)
			    Ext.ComponentQuery.query('#doctorLocationsList')[0].setEmptyText('<center>' + err_message + '</center>');
			else
			    this.showErrorMsg(err_message);
                    }
		    
		}
	    }
	});
    },    
    

    /*
     *  this method will load all assigned location list to doctor
     */       
    loadDoctorAssignedLocations: function(doctorid, doctorAssignedLocationStore){
	// -- in case of staff type coming regarding 'DoctorAssignedLocationStoreForOfficeHours' then sending staffid and changing doctorid on runtime(due to show staff assigned location only) -- start
	var me = this;
	var staffid = '';
	if(accesscontrols.isStaff && !accesscontrols.isAdmin){
	    if(this.getSelectDoctorForOfficeHour() != undefined && this.getSelectDoctorForOfficeHour().getRecord() != null) {
		// Get selected doctor id
		doctorid = this.getSelectDoctorForOfficeHour().getRecord().data.profileid;
	    }
	    staffid = storage.getItem("doctorid");
	}
	// -- end
	
	Ext.Viewport.setMasked({
	    xtype: 'loadmask',
	    message: DoctorAppointment.util.Constant.getLabel_Loading()
	});
	var usergroupid = storage.getItem("usergroupid");
	Ext.getStore(doctorAssignedLocationStore).removeAll();
        Ext.getStore(doctorAssignedLocationStore).getProxy().setExtraParams({
            doctorid: doctorid,
	    usergroupid: usergroupid,
	    staffid: staffid
        });
        Ext.getStore(doctorAssignedLocationStore).load({
	    scope: me,
	    callback : function(records, operation, success) {
		//console.log(records);
		Ext.Viewport.setMasked(false);
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			me.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			me.showErrorMsg(err_message);
                    }
		    
		}else{
		    // set previous selected value
		    var previousLocationId = storage.getItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_LocationId());
		    if (previousLocationId != null && me.getSelectLocationForToken().getRecord() != null) {
			Ext.Array.each(records, function(item){
			    if (item.data.establishmentid == previousLocationId)
				me.getSelectLocationForToken().setValue(previousLocationId);
			});
		    }
		}
	    }
	});
    },
    
    /*
     *  this method will load all DoctorProfileAssignedLocation list
     */       
    loadDoctorProfileAssignedLocations: function(doctorid){
	
	//Ext.Viewport.setMasked({
	//    xtype: 'loadmask',
	//    message: DoctorAppointment.util.Constant.getLabel_Loading()
	//});
	var usergroupid = storage.getItem("usergroupid");
	Ext.getStore('DoctorProfileAssignedLocationStore').removeAll();
        Ext.getStore('DoctorProfileAssignedLocationStore').getProxy().setExtraParams({
            doctorid: doctorid,
	    usergroupid: usergroupid
        });
        Ext.getStore('DoctorProfileAssignedLocationStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		existingDoctorRecord = records;
		//console.log(records);
		//Ext.Viewport.setMasked(false);
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			console.log(err_message);
			this.showErrorMsg(err_message);
                    }
		    
		}else{
		    //console.log(records);
		}
	    }
	});
    },
    
    /*
     *  this method will load all StaffProfileAssignedLocation list
     */       
    loadStaffProfileAssignedLocations: function(establishmentid){
	
	//Ext.Viewport.setMasked({
	//    xtype: 'loadmask',
	//    message: DoctorAppointment.util.Constant.getLabel_Loading()
	//});
	var usergroupid = storage.getItem("usergroupid");
	Ext.getStore('StaffProfileAssignedLocationStore').removeAll();
        Ext.getStore('StaffProfileAssignedLocationStore').getProxy().setExtraParams({
            establishmentid: establishmentid,
	    usergroupid: usergroupid
        });
        Ext.getStore('StaffProfileAssignedLocationStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		//console.log(records);
		//Ext.Viewport.setMasked(false);
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			this.showErrorMsg(err_message);
                    }
		    
		}else{
		    //console.log(records);
		}
	    }
	});
    },
    
    /*
     *  this method will load all Staff Assigned Location list
     */       
    loadStaffAssignedLocations: function(staffid){
	
	//Ext.Viewport.setMasked({
	//    xtype: 'loadmask',
	//    message: DoctorAppointment.util.Constant.getLabel_Loading()
	//});
	var usergroupid = storage.getItem("usergroupid");
	Ext.getStore('StaffLocationStore').removeAll();
        Ext.getStore('StaffLocationStore').getProxy().setExtraParams({
            staffid: staffid,
	    usergroupid: usergroupid
        });
        Ext.getStore('StaffLocationStore').load({
	    scope: this,
	    callback : function(records, operation, success) {
		//console.log(records);
		//Ext.Viewport.setMasked(false);
		existingDoctorRecord = records;
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			this.showErrorMsg(err_message);
                    }
		    
		}else{
		    
		    //console.log(records);
		}
	    }
	});
    },    
    
    // *** Common Method of DoctorProfiles, Location List by doctor and StaffProfile List End ***
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // *** Temporary Doctor Approve / Pending Start ***
    onDoctorApprove: function(btn, e, eOpts){
        //Ext.Msg.alert('Approve', 'Action Approve here');

        // if N/W available
        if(this.checkConnectionStatus()){
            
            var doctorid = storage.getItem("doctorid");
	    var usergroupid = storage.getItem("usergroupid");
            
            if(!Ext.isEmpty(doctorid)){
            
                // Mask the page
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Approving...'
                });
                
                var requestUrl = DoctorAppointment.util.Constant.getDoctor_approve_by_admin();
                var encodedUrl = encodeURI(requestUrl);
            
                Ext.Ajax.request({
                    params: {
                            doctorid: doctorid,
                            usergroupid: usergroupid
                    }, // actual
                    url: encodedUrl,
                    method: 'POST',
                    success: function(response) {
                        //console.log("Sucess:->");
                        //console.log(response.status + ', ' + response.responseText);
                        
                        //var resultResponse = Ext.JSON.decode(response.responseText);
                        //console.log(resultResponse.success);
                        
                        // unmask the page
                        Ext.Viewport.setMasked(false);
                        
                        //if(resultResponse.success){
                        //    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(), resultResponse.message);
                        //    
                        //}else{
                        //    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                        //}
                    },
                    failure: function (msg) {
                        //console.log("Failur:->");
                        //console.log(msg.status + ' , ' + msg.statusText);
                        Ext.Viewport.setMasked(false);
                        if(msg.status == 0){
                            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                        }else{
                            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                        }
                    }
                });    
            }
            
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        }       
        
    },
    
    onDoctorPending: function(btn, e, eOpts){
        //Ext.Msg.alert('Pending', 'Action Pending here');
        
        // if N/W available
        if(this.checkConnectionStatus()){
            
            var doctorid = storage.getItem("doctorid");
	    var usergroupid = storage.getItem("usergroupid");
            
            if(!Ext.isEmpty(doctorid)){
            
                // Mask the page
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Pending...'
                });
                
                var requestUrl = DoctorAppointment.util.Constant.getDoctor_pending_by_admin();
                var encodedUrl = encodeURI(requestUrl);
            
                Ext.Ajax.request({
                    params: {
                            doctorid: doctorid,
                            usergroupid: usergroupid
                    }, // actual
                    url: encodedUrl,
                    method: 'POST',
                    success: function(response) {
                        //console.log("Sucess:->");
                        //console.log(response.status + ', ' + response.responseText);
                        
                        //var resultResponse = Ext.JSON.decode(response.responseText);
                        //console.log(resultResponse.success);
                        
                        // unmask the page
                        Ext.Viewport.setMasked(false);
                        
                        //if(resultResponse.success){
                        //    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(), resultResponse.message);
                        //    
                        //}else{
                        //    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
                        //}
                    },
                    failure: function (msg) {
                        //console.log("Failur:->");
                        //console.log(msg.status + ' , ' + msg.statusText);
                        Ext.Viewport.setMasked(false);
                        if(msg.status == 0){
                            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
                        }else{
                            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
                        }
                    }
                });    
            }
            
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getNETWORK_NOT_FOUND());
        }         
    },    
    // *** Temporary Doctor Approve / Pending End ***
    

    // ******************** Doctor Appointment/Token Start ***********************************************
    setDoctorAppointmentOrTokenPage: function(){
	
	var doctorid = '';
	if(this.getSelectDoctorForToken().getRecord() != null) {
	    // Get selected doctor id
	    doctorid = this.getSelectDoctorForToken().getRecord().data.profileid;
	    
	    // Set doctor in strage to keep and show previous selected value next time
	    storage.setItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_DoctorId(), doctorid);
	    
	}
	if(this.getSelectLocationForToken().getRecord() != null) {
	    // Get establishment id or location id
	    var establishmentid = this.getSelectLocationForToken().getRecord().data.establishmentid;
	    
	    // Set location in strage to keep and show previous selected value next time
	    storage.setItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_LocationId(), establishmentid);
	}
	if(this.getSelectSlotForToken().getRecord() != null) {
	    
	    // Get time slot
	    var timeSlot = this.getSelectSlotForToken().getRecord().data.blockid;
	    
	    // Set time slot in strage to keep and show previous selected value next time
	    storage.setItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_TimeSlot(), timeSlot);
	}
	
	// Get doctor id
	doctorid = doctorid != '' ? doctorid : storage.getItem("doctorid");
    
	// this method will load all DOCTOR & DOCTORADMIN added profiles
	this.loadDoctorProfiles(doctorid, 'DoctorStoreForAppointmentOrToken');

	// this method will show assigned location list if any
	this.loadDoctorAssignedLocations(doctorid, 'DoctorAssignedLocationStoreForAppointmentOrToken');
	
	//// Set current date
	//var value = new Date();
	//this.getSelectDateForToken().setValue(value);
	
    },
    
    onChangeDoctorForToken: function(selectBox, newValue, oldValue, eOpts){
	if(this.getSelectDoctorForToken().getRecord() != null) {
	    
	    // Get selected doctor id
	    var doctorid = this.getSelectDoctorForToken().getRecord().data.profileid;
	    
	    // this method will show assigned location list if any
	    this.loadDoctorAssignedLocations(doctorid, 'DoctorAssignedLocationStoreForAppointmentOrToken');    
	}
    },
    
    onChangeLocationForToken: function(selectBox, newValue, oldValue, eOpts){
	if(this.getSelectLocationForToken().getRecord() != null && this.getSelectDoctorForToken().getRecord() != null) {
	
	    // Get selected doctor id
	    var doctorid = this.getSelectDoctorForToken().getRecord().data.profileid;
	    
	    // Get establishment id or location id
	    var establishmentid = this.getSelectLocationForToken().getRecord().data.establishmentid;
	    
	    // Load office hour time slot store    
	    this.loadDoctorAppointmentTimeSlotStore(doctorid, establishmentid);
		
	}else{
	    Ext.getStore('DoctorOfficeHoursStore').removeAll();
	}

    },
    
    loadDoctorAppointmentTimeSlotStore: function(doctorid, establishmentid){
	var me = this;
        var usergroupid = storage.getItem("usergroupid");
	
	Ext.getStore('DoctorAppointmentTimeSlotStore').removeAll();
        Ext.getStore('DoctorAppointmentTimeSlotStore').getProxy().setExtraParams({
            doctorid: doctorid,		
	    establishmentid: establishmentid,
	    usergroupid: usergroupid
        });
	
        Ext.getStore('DoctorAppointmentTimeSlotStore').load({
	    scope: me,
	    callback : function(records, operation, success) {
		if (!success) {
		    var err_message = '';
		    if(operation.exception){
                        err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			if(Ext.ComponentQuery.query('#doctorOfficeHoursList')[0] != undefined)
			    Ext.ComponentQuery.query('#doctorOfficeHoursList')[0].setEmptyText('<center>' + err_message + '</center>');
			//this.showErrorMsg(err_message);
                    }else{
                        err_message = operation.getRequest().getProxy().getReader().rawData.error;
			if(Ext.ComponentQuery.query('#doctorOfficeHoursList')[0] != undefined)
			    Ext.ComponentQuery.query('#doctorOfficeHoursList')[0].setEmptyText('<center>' + err_message + '</center>');
			//this.showErrorMsg(err_message);
                    }
		    
		}
		else {
		    var i=1;
		    Ext.Array.each(records, function(obj){
			
			if (obj.data.start_time != '' && obj.data.start_time != null && obj.data.end_time != '' && obj.data.end_time != null) {
			
			    obj.data.timeSlotSelctDisplay = 'Slot: '+i+' ('+ getTime(obj.data.start_time) +' - ' + getTime(obj.data.end_time) +')';
			    i++;    
			}
			
		    });
		    
		    Ext.getStore('DoctorAppointmentTimeSlotStore').setData(records);
		    
		    // Set previous time slot
		    var previousTimeSlot = storage.getItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_TimeSlot());
		    if (previousTimeSlot != null && me.getSelectSlotForToken().getRecord() != null) {
			Ext.Array.each(records, function(item){
			    if (item.data.blockid == previousTimeSlot)
				me.getSelectSlotForToken().setValue(previousTimeSlot);
			});
		    }
		}
	    }
	});
    },
    
    loadDoctorAppointment: function(){
	var me = this;
	if (this.getSelectDoctorForToken().getRecord() != null && this.getSelectLocationForToken().getRecord() != null && this.getSelectSlotForToken().getRecord() != null && this.getSelectDateForToken().getValue() != null) {
	    // Get selected doctor id
	    var doctorid = me.getSelectDoctorForToken().getRecord().data.profileid;
	    
	    // Get establishment id or location id
	    var establishmentid = me.getSelectLocationForToken().getRecord().data.establishmentid;
	    
	    // Get selected time slot block id
	    var blockid = me.getSelectSlotForToken().getRecord().data.blockid;
	    
	    // Get selected date in short format
	    var date = Ext.Date.format(me.getSelectDateForToken().getValue(), Ext.Date.patterns.ISO8601Short);
    
	    var usergroupid = storage.getItem("usergroupid");
    
	    Ext.getStore('DoctorBookedAppointmentsStore').removeAll();
	    Ext.getStore('DoctorBookedAppointmentsStore').getProxy().setExtraParams({
		doctorid: doctorid,
		establishmentid: establishmentid,
		blockid: blockid,
		appt_date: date,
		usergroupid: usergroupid
	    });
	    Ext.getStore('DoctorBookedAppointmentsStore').load({
		scope: me,
		callback : function(records, operation, success) {
		    
		    // hide mask
		    Ext.Viewport.setMasked(false);
		    
		    if (!success) {
			var err_message = '';
			if(operation.exception){
			    err_message = DoctorAppointment.util.Constant.getSever_Error_Msg();//sever_Error
			    me.showErrorMsg(err_message);
			}else{
			    err_message = operation.getRequest().getProxy().getReader().rawData.error;
			    me.showErrorMsg(err_message);
			}
			
		    }else{
			
			var duration = parseInt(records[0].data.duration, 10);
			var starttime = records[0].data.starttime;
			var endtime = records[0].data.endtime;
			var tokenlimit = records[0].data.tokenlimit;
			
			var apptRecords = [];
			Ext.Array.each(records[0].data.docbookings, function(obj){
			    
			    var appointmentModel = Ext.create('DoctorAppointment.model.doctor.DoctorBookedAppointmentsModel', {
				starttime: records[0].data.starttime,
				endtime: records[0].data.endtime,
				duration: records[0].data.duration,
				tokenlimit: records[0].data.tokenlimit,
				name: obj.patient_name,
				patientid: obj.patientid,
				guid: obj.guid,
				medicaldescription: obj.medicaldesc,
				availabletime: obj.bt,
				bookedtime: obj.b,
				expectedtime: obj.et,
				age: obj.age,
				sex: obj.sex,
				tokenno: obj.tkno,
				remainingtime: obj.rt,
				currenttime: obj.ct,
				status: obj.status,
				isDelayToken: tokenlimit != null && tokenlimit != '' ? checkDelayToken(obj.tkno) : 'false'
			    });
			    
			    apptRecords.push(appointmentModel);
			    
			});
			//console.log(apptRecords);
			Ext.getStore('DoctorBookedAppointmentsStore').setData(apptRecords);
			Ext.getStore('AvgDurationStore').removeAll();
			
			if (tokenlimit != null && tokenlimit != '') {
			    IsToken = true;
			    
			    var arrtoken = [];
			    for (var i=1;i<=tokenlimit;i++){
				arrtoken.push({ 'id': i, 'tokenNo': i});
			    }
			    
			    //set delay token
			    Ext.getStore('AvgDurationStore').setData(arrtoken);
			    console.log(apptRecords);
			    //set next available token if doctor add token instantly.
			    var lastObj = apptRecords[apptRecords.length-1].data;
			    if (lastObj.patientid != null)
				nextAvailableTokenNo = null;
			    else
				nextAvailableTokenNo = lastObj.tokenno;
			}
			else {
			    IsToken = false;
			    
			    // Set available appointment in store
			    Ext.getStore('DoctorInstantBookedApptsStore').removeAll();
			    var instantApptRecords = [];
			    Ext.Array.each(apptRecords, function(item){
				if (item.data.patientid == null || item.data.patientid == ''){
				    instantApptRecords.push(item);
				}
			    });
			    Ext.getStore('DoctorInstantBookedApptsStore').setData(instantApptRecords);
			    
			    if (starttime != null && endtime != null) {
				// set duration 
				var arrStarttime = starttime.split(':');
				var starthours = parseInt(arrStarttime[0], 10);
				var startminutes = parseInt(arrStarttime[1], 10);
				var totalStartMinutes = (starthours * 60) + startminutes;
				
				var arrEndTime = endtime.split(':');
				var endhours = parseInt(arrEndTime[0], 10);
				var endminutes = parseInt(arrEndTime[1], 10);
				var totalEndMinutes = (endhours * 60) + endminutes;
				
				var totalSlots = (totalEndMinutes - totalStartMinutes)  / duration;
				
				var delay = 0;
				var arrDelayAppointments = [];
				for (var i=1;i<=totalSlots;i++){
				    delay = delay + duration;
				    arrDelayAppointments.push({ 'id': i, 'delayValue': delay });
				}
				//set delay appointments
				Ext.getStore('AvgDurationStore').setData(arrDelayAppointments);
			    }
			}
			// load data and Show list
			this.loadDataForApptOrTokenList();
		    }
		}
	    });
	}
	else {
	    // hide mask
	    Ext.Viewport.setMasked(false);
	    
	    if (this.getSelectDoctorForToken().getRecord() == null) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Select_Doctor());
	    }
	    else if(this.getSelectLocationForToken().getRecord() == null) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Select_Loction());
	    }
	    else if(this.getSelectSlotForToken().getRecord() == null) {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Select_TimeSlot());
	    }
	}
    },  
    
    appointmentListItemTapHold: function(obj, index, target, record, e, eOpts) {
	
	if (record.data.bookedtime != '' && record.data.bookedtime != null && IsToken != true) {
	    
	    var doctorMoveAppointmentOverlay = this.getDoctorMoveAppointmentOverlay();
	    doctorMoveAppointmentOverlay.showBy(obj);
	
	    Ext.ComponentQuery.query('#lblSelectedTimeSlot')[0].setHtml(record.data.expectedtime);
	}
    },
    
    onMovedAppointment: function(btn, e, eOpts) {
	
	// Get selected time slot
	var strBookedTime = Ext.ComponentQuery.query('#lblSelectedTimeSlot')[0].getHtml();
	
	// Get time slot, that will be moved in the place of selected time solt
	var arrMoveTimeSlot = Ext.getCmp('doctorMoveAppointmentList').getSelection();
	if (arrMoveTimeSlot.length > 0) {
	    
	    var strExpectedtime = arrMoveTimeSlot[0].data.expectedtime;
	    
	    var strDuration = arrMoveTimeSlot[0].data.duration;
	    
	    if (strBookedTime == strExpectedtime) {
		
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Select_Another_Slot());
		return
	    }
	    
	    //console.log(strBookedTime,strExpectedtime,duration);
	
	    // hide ovelay
	    this.getDoctorMoveAppointmentOverlay().hide();
	    
	    // update time solt
	    this.updateAppointmentTime(strBookedTime, strExpectedtime, '', strDuration, '', '');
	}
	else {
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Select_Time_Slot());
	}
	
    },
    
    updateAppointmentTime: function(strBookedTime, strExpectedtime, strDelayhours, strDuration, strTokenno, strIsbefore) {
	var me = this;
	if(me.checkConnectionStatus()){
                
	    var requestUrl = DoctorAppointment.util.Constant.getDoctor_Update_Appomintment_Time();
	    var encodedUrl = encodeURI(requestUrl);
	
	    // Get selected doctor id
	    var doctorid = this.getSelectDoctorForToken().getRecord().data.profileid;
	    
	    // Get establishment id or location id
	    var establishmentid = this.getSelectLocationForToken().getRecord().data.establishmentid;
	    
	    // Get selected time slot block id
	    var blockid = this.getSelectSlotForToken().getRecord().data.blockid;
	    
	    // Get selected date in short format
	    var date = Ext.Date.format(this.getSelectDateForToken().getValue(), Ext.Date.patterns.ISO8601Short);
	    
	    // get usergroupid from local storage
	    var usergroupid = storage.getItem("usergroupid");
	
	    // Mask the Viewport
	    Ext.Viewport.setMasked({
		xtype: 'loadmask',
		message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
	    });
	
	    Ext.Ajax.request({
		params: {
			doctorid: doctorid,
			establishmentid: establishmentid,
			blockid: blockid,
			appt_date: date,
			bookedTime: strBookedTime,
			expectedtime: strExpectedtime,
			delayhours: strDelayhours,
			duration: strDuration,
			token_no: strTokenno,
			isbefore: strIsbefore,
			usergroupid: usergroupid
			
		}, // actual
		url: encodedUrl,
		method: 'POST',
		success: function(response) {
		    // hide mask
		    Ext.Viewport.setMasked(false);
		    
		    var resultResponse = Ext.JSON.decode(response.responseText);
		    
		    if (resultResponse.success) {
			// Load Appointments
			me.loadDoctorAppointment();
		    }
		    else {
			Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),resultResponse.error,
			function(buttonId) {
			   if (buttonId === 'ok') {
				// Load Appointments
				me.loadDoctorAppointment();
			   }
			},
			me // scope of the controller 
		    );
		    }
		    
		},
		failure: function (msg) {
		    Ext.Viewport.setMasked(false);
		    if(msg.status == 0){
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
		    }else{
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
		    }
		}
	    }); 
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.get());
        }
    },
    
    onAddAppointmentOrTokenDelay: function(btn, e, eOpts) {
	
	var doctorAppointmentOrTokenDelayOverlay = this.getDoctorAppointmentOrTokenDelayOverlay();
        
	// Show appointment or delay according type
	if (IsToken) {
	    var tokenData = Ext.getStore('AvgDurationStore');
	    if (tokenData.getData() != null && tokenData.getData().items.length > 0) {
		doctorAppointmentOrTokenDelayOverlay.showBy(btn);
		this.getTokenDelayContainer().show();
		this.getAppointmentDelayContainer().hide();
	    }
	    else {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_No_Token_Delay());
	    }
	}
	else {
	    doctorAppointmentOrTokenDelayOverlay.showBy(btn);
	    this.getTokenDelayContainer().hide();
	    this.getAppointmentDelayContainer().show();
	}
    },
    
    onAppointmentOrTokenDelayDone: function(btn, e, eOpts) {
	
	if (IsToken) {
	    
	    var strIsbefore = this.getSelectDelayIsBefore().getValue();
	    var strTokenno = this.getSelectDelayTokenno().getValue();
	    var strDelayhours = this.getTxtDelayTokenTime().getValue();
	    
	    if (strDelayhours == null || strDelayhours == '') {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Enter_Token_Delay_Dur());
		return;
	    }
	    
	    // hide ovelay
	    this.getDoctorAppointmentOrTokenDelayOverlay().hide();
	    // update token
	    this.updateAppointmentTime('', '', strDelayhours, '', strTokenno, strIsbefore);
	}
	else {
	    
	    var strBookedTime = this.getSelectAppointmentOrTokenForDelay().getValue();
	    var strDelayhours = this.getSelectAppointmentOrTokenDuration().getValue();
	    
	    // hide ovelay
	    this.getDoctorAppointmentOrTokenDelayOverlay().hide();
	    // update time solt
	    this.updateAppointmentTime(strBookedTime, '', strDelayhours, '', '', '');
	}
	
    },
    
    onShowApptOrTokenList: function(btn, e, eOpts) {
	
	// Mask the Viewport
	Ext.Viewport.setMasked({
	    xtype: 'loadmask',
	    message: DoctorAppointment.util.Constant.getLabel_Loading_Appointments()
	});
	
	// Load Appointments
	this.loadDoctorAppointment();
    },
    
    loadDataForApptOrTokenList: function() {
	
	// Appointment / Token List
	if (!this.doctorAppointmentOrTokenListing) {
	    this.doctorAppointmentOrTokenListing = Ext.widget('doctorAppointmentOrTokenListing');
	}
	
	if (this.getSelectDoctorForToken().getRecord() != null && this.getSelectLocationForToken().getRecord() != null && this.getSelectSlotForToken().getRecord() != null && this.getSelectDateForToken().getValue() != null) {
	    // Get selected doctor name
	    var doctorName = this.getSelectDoctorForToken().getRecord().data.name;
	    
	    // Get selected location name
	    var locationName = this.getSelectLocationForToken().getRecord().data.establishmentname;
	    
	    // Get selected time slot
	    var timeSlot = this.getSelectSlotForToken().getRecord().data.timeSlotSelctDisplay;
	    
	    // Get selected date
	    var date = Ext.Date.format(this.getSelectDateForToken().getValue(), Ext.Date.patterns.ISO8601Short);
	    
	    // Prepare header for listing
	    this.doctorAppointmentOrTokenListing.setTitle('<font size = \'3\' color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Appt_Token_List() + '</font>');
	    //this.doctorAppointmentOrTokenListing.setTitle('<font size = \'2\' color="#FFFFFF">' + doctorName +' - '+ locationName + '</font>');
	    //this.doctorAppointmentOrTokenListing.setTitle('<font size = \'1\' color="#FFFFFF">' + timeSlot +' - '+ date +'</font>');
	    
	    
	    var list = this.doctorAppointmentOrTokenListing.getComponent('doctorAppointmentOrTokenList');
	    if (list.getStore().getData().length > 0) {
		// set buttton title
		IsToken  ? this.getBtnDrAppointmentOrTokenAdd().setText('Add Token') : this.getBtnDrAppointmentOrTokenAdd().setText('Add Appointment');
		// Push the doctorAppointmentOrToken list into the navigation view
		this.getDoctorContainer().push(this.doctorAppointmentOrTokenListing);
	    }
	    else {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_Appointment_Not_Found());
	    }
	    
	}
    },
    
    onAddAppointmentOrToken: function(btn, e, eOpts) {
	
	var bookAppointmentInstant = this.getBookAppointmentInstant();
	
	// clear fields
	bookAppointmentInstant.getFields('fname').setValue('');
	bookAppointmentInstant.getFields('lname').setValue('');
	bookAppointmentInstant.getFields('mobile').setValue('');
	bookAppointmentInstant.getFields('age').reset();
	bookAppointmentInstant.getFields('medicaldesc_InstantBook').setValue('');
    
	// Show appointment or delay according type
	if (IsToken) {
	    
	    if (nextAvailableTokenNo != null && nextAvailableTokenNo != '') {
		Ext.getCmp('bookInstantToolbar').setTitle('<center><font size="3" color="#FFFFFF">Add Token</font></center>');
		bookAppointmentInstant.showBy(btn);
		this.getFieldSetAppointmentOrTokenForAdd().hide();
		this.getLblNextTokenNo().setHtml(nextAvailableTokenNo);
		this.getPanelNextToken().show();
	    }
	    else {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_No_More_Token());
	    }
	}
	else {
	    var apptData = Ext.getStore('DoctorInstantBookedApptsStore');
	    if (apptData.getData() != null && apptData.getData().items.length > 0) {
		Ext.getCmp('bookInstantToolbar').setTitle('<center><font size="3" color="#FFFFFF">Add Appointment</font></center>');
		bookAppointmentInstant.showBy(btn);
		this.getFieldSetAppointmentOrTokenForAdd().show();
		this.getLblNextTokenNo().setHtml('');
		this.getPanelNextToken().hide();
	    }
	    else {
		Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_No_More_Appointment());
	    }
	}
    },
    
    onDoneDrAppointmentOrToken: function(btn, e, eOpts) {
	
	var values = this.getBookAppointmentInstant().getValues();
	
	// First name required check
	if (values.fname == null || values.fname == ''){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),DoctorAppointment.util.Constant.getMsg_Enter_FName());
	    return;
	}
	
	// Mobile no limit check
	if (values.mobile != null && values.mobile != ''){
	    var match = values.mobile.match(/^\d{10,15}$/);
		if (Ext.isEmpty(match)){
		    var msg = DoctorAppointment.util.Constant.getMsg_Mobile_Length_Invalid();
		    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), msg);
		    return;
		}
	}
	
	// Mask the Viewport
	var me = this;
	if(me.checkConnectionStatus()){
                
	    var requestUrl = DoctorAppointment.util.Constant.getDoctor_Book_Appointment();
	    var encodedUrl = encodeURI(requestUrl);
	
	    // Get selected doctor id
	    var doctorid = me.getSelectDoctorForToken().getRecord().data.profileid;
	    
	    // Get establishment id or location id
	    var establishmentid = me.getSelectLocationForToken().getRecord().data.establishmentid;
	    
	    // Get selected time slot block id
	    var blockid = me.getSelectSlotForToken().getRecord().data.blockid;
	    
	    // Get selected date 	in short format
	    var date = Ext.Date.format(me.getSelectDateForToken().getValue(), Ext.Date.patterns.ISO8601Short);
	    
	    // Get Form vlaues
	    var strFName = values.fname != null ? values.fname : '';
	    var strLName = values.lname != null ? values.lname : '';
	    var strMobile = values.mobile != null ? values.mobile : '';
	    var strAge = values.age != null ? values.age : '';
	    var strSex = values.sex != null ? values.sex : '';
	    var strMedicaldesc = values.medicaldesc_InstantBook != null ? values.medicaldesc_InstantBook : '';
	    var strBookedTime = me.getSelectAppttime().getRecord() != null ? me.getSelectAppttime().getRecord().data.expectedtime : '';
	    var strTokenno = me.getLblNextTokenNo().getHtml() != null ? me.getLblNextTokenNo().getHtml() : '';
	    
	    //console.log('d: '+doctorid+', e: '+establishmentid+', b: '+blockid+', d: '+date);
	    //console.log('fn: '+strFName+', ln: '+strLName+', mo: '+strMobile+', age: '+strAge+', sx: '+strSex+', md: '+strMedicaldesc+', bt: '+strBookedTime+', tn: '+strTokenno);
	
	    // Mask the Viewport
	    Ext.Viewport.setMasked({
		xtype: 'loadmask',
		message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
	    });
	    var strUsergroupid = storage.getItem("usergroupid");
	    Ext.Ajax.request({
		params: {
			doctorid: doctorid,
			establishmentid: establishmentid,
			blockid: blockid,
			appt_date: date,
			bookedTime: strBookedTime,
			token_no: strTokenno,
			fname: strFName,
			lname: strLName,
			mobile: strMobile,
			age: strAge,
			sex: strSex,
			medicaldesc: strMedicaldesc,
			usergroupid: strUsergroupid,
			status: ''
			
		}, // actual
		url: encodedUrl,
		method: 'POST',
		success: function(response) {
		    // hide mask
		    Ext.Viewport.setMasked(false);
		    
		    // hide popup
		    me.getBookAppointmentInstant().hide();
		    
		    var resultResponse = Ext.JSON.decode(response.responseText);
		    
		    if (resultResponse.success) {
			// Load Appointments
			me.loadDoctorAppointment();
		    }
		    else {
			Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),resultResponse.error,
			function(buttonId) {
			   if (buttonId === 'ok') {
				// Load Appointments
				me.loadDoctorAppointment();
			   }
			},
			me // scope of the controller 
		    );
		    }
		    
		},
		failure: function (msg) {
		    Ext.Viewport.setMasked(false);
		    // hide popup
		    me.getBookAppointmentInstant().hide();
		    if(msg.status == 0){
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
		    }else{
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
		    }
		}
	    }); 
        }else {
            Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.get());
        }
    },
    
    onCheckboxChecked: function(list, index, element, record, evt){
	var me = this;
	if (evt.getTarget('input#chkBegin')) {
	    me.updateAppointmentStatus(record, DoctorAppointment.util.Constant.getPatient_Status_Begin(), evt.target.checked);
	}
	else if (evt.getTarget('input#chkPresent')) {
	    //var chkPresent = Ext.get('chkPresent');
	    me.updateAppointmentStatus(record, DoctorAppointment.util.Constant.getPatient_Status_Present(), evt.target.checked);
	}
	else if (evt.getTarget('input#chkDone')) {
	    //var chkDone = Ext.get('chkDone');
	    me.updateAppointmentStatus(record, DoctorAppointment.util.Constant.getPatient_Status_Done(), evt.target.checked);
	}
	else if (evt.getTarget('input#chkHold')) {
	    //var chkHold = Ext.get('chkHold');
	    me.updateAppointmentStatus(record, DoctorAppointment.util.Constant.getPatient_Status_Hold(), evt.target.checked);
	}
	else if (evt.getTarget('input#chkCancel')) {
	    //var chkCancel = Ext.get('chkCancel');
	    me.updateAppointmentStatus(record, DoctorAppointment.util.Constant.getPatient_Status_Cancel(), evt.target.checked);
	//    if (!evt.target.checked) {
	//	Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_label_cancel() + record.data.name + ' ?',
	//	    function(buttonId) {
	//	       if (buttonId === 'yes') {
	//		    me.updateAppointmentStatus(record, DoctorAppointment.util.Constant.getPatient_Status_Cancel(), !evt.target.checked);
	//	       }
	//	       else {
	//		    me.loadDoctorAppointment();
	//		    //me.setDoctorBookedAppointmentsStore(record, record.data.status);
	//	       }
	//	    },
	//	    me // scope of the controller 
	//	);
	//    }
	//    else {
	//	Ext.Msg.confirm(DoctorAppointment.util.Constant.getLabel_Warning(),DoctorAppointment.util.Constant.getMsg_label_rebook() + record.data.name + ' ?',
	//	    function(buttonId) {
	//	       if (buttonId === 'yes') {
	//		    me.updateAppointmentStatus(record, DoctorAppointment.util.Constant.getPatient_Status_Cancel(), !evt.target.checked);
	//	       }
	//	       else {
	//		    me.loadDoctorAppointment();
	//		    //me.setDoctorBookedAppointmentsStore(record, record.data.status);
	//	       }
	//	    },
	//	    me // scope of the controller 
	//	);
	//    }
	}
	else if (evt.getTarget('a#lnkName')){
	    var patientInformation = this.getPatientInformation();
	    patientInformation.showBy(list);
	    
	    // set fields
	    Ext.getCmp('name_patientInfo').setHtml(record.data.name);
	    Ext.getCmp('age_patientInfo').setHtml(record.data.age);
	    Ext.getCmp('sex_patientInfo').setHtml(record.data.sex);
	    Ext.getCmp('medicalDesc_patientInfo').setHtml(record.data.medicaldescription);
	}
    },
    
    updateAppointmentStatus: function(record, status, isChecked) {
	
	// Mask the Viewport
	var me = this;
	if(me.checkConnectionStatus()){
                
	    var requestUrl = DoctorAppointment.util.Constant.getDoctor_Update_Appointment_Status();
	    var encodedUrl = encodeURI(requestUrl);
	
	    // Get selected doctor id
	    var doctorid = me.getSelectDoctorForToken().getRecord().data.profileid;
	    
	    // Get establishment id or location id
	    var establishmentid = me.getSelectLocationForToken().getRecord().data.establishmentid;
	    
	    // Get selected time slot block id
	    var blockid = me.getSelectSlotForToken().getRecord().data.blockid;
	    
	    // Get selected date 	in short format
	    var date = Ext.Date.format(me.getSelectDateForToken().getValue(), Ext.Date.patterns.ISO8601Short);
	    
	    // Mask the Viewport
	//    Ext.Viewport.setMasked({
	//	xtype: 'loadmask',
	//	message: DoctorAppointment.util.Constant.getLabel_Mask_Msg_Submitting()
	//    });
	    var strUsergroupid = storage.getItem("usergroupid");
	    Ext.Ajax.request({
		params: {
			doctorid: doctorid,
			establishmentid: establishmentid,
			blockid: blockid,
			appt_date: date,
			patientid: record.data.patientid,
			guid: record.data.guid,
			token_no: record.data.tokenno,
			usergroupid: strUsergroupid,
			expectedtime: record.data.expectedtime != null ? record.data.expectedtime : '',
			status: status
			
		}, // actual
		url: encodedUrl,
		method: 'POST',
		success: function(response) {

		    // hide popup
		    me.getBookAppointmentInstant().hide();
		    
		    var resultResponse = Ext.JSON.decode(response.responseText);
		    
		    if (!resultResponse.success) {
			Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),resultResponse.error);
			me.setDoctorBookedAppointmentsStore(record, record.data.status);
		    }
		    else {
			var currentStatus = !isChecked ? status: DoctorAppointment.util.Constant.getPatient_Status_Default();
			me.setDoctorBookedAppointmentsStore(record, currentStatus);
		    }
	    
		},
		failure: function (msg) {
		    Ext.Viewport.setMasked(false);
		    // hide popup
		    me.getBookAppointmentInstant().hide();
		    if(msg.status == 0){
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
		    }else{
			Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
		    }
		    me.setDoctorBookedAppointmentsStore(record, record.data.status);
		}
	    }); 
        }else {
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.get());
	    me.setDoctorBookedAppointmentsStore(record, record.data.status);
        }
	
    },
    
    onRefreshApptOrTokenList: function(btn, e, eOpts) {

	// Load Appointments
	this.loadDoctorAppointment();
    },
    
    setDoctorBookedAppointmentsStore: function(record, status) {
	
	var recordArr = Ext.getStore('DoctorBookedAppointmentsStore').getData();
	var apptRecords = [];
	Ext.Array.each(recordArr.items, function(item){
	    var appointmentModel = Ext.create('DoctorAppointment.model.doctor.DoctorBookedAppointmentsModel');
	    appointmentModel = item.data;
	    if (item.data.guid == record.data.guid) {
		appointmentModel.status = status;
	    }
	    apptRecords.push(appointmentModel);
	});
	Ext.getStore('DoctorBookedAppointmentsStore').setData(apptRecords);
    }
    
    
    // ******************** Doctor Appointment/Token End ***********************************************
    
    
    
    
    
    
    
    //******************************************** Doctor End********************************************    

});

function checkDelayToken(tkno) {
    var isDelayToken = 'false';
    tkno = parseFloat(tkno);
    var rtkno = Math.round(tkno);
    if (rtkno != tkno){
	isDelayToken = 'true';
    }
    else {
	isDelayToken = 'false';
    }
    return isDelayToken;
}

function getTime(start_time) {
    var arrTime = start_time.split(":");
    var hours = arrTime[0];
    var minutes = arrTime[1];
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours < 10 ? '0'+hours: hours : 12; // the hour '0' should be '12'
    var strTime = hours + ':' + minutes + ' ' + ampm;
    
    return strTime;
}

function getDateArray(strDate){
    
    var splitDate = strDate.split('-');
    var year = parseInt(splitDate[0], 10);
    var month = parseInt(splitDate[1], 10);
    var day = parseInt(splitDate[2], 10);
    
    splitDate[0] = year;
    splitDate[1] = month - 1;
    splitDate[2] = day;
	
    return splitDate;
}

function getIsDayFound(selectedDay, daysArray){
    var isDayfound = false;
    for (var i = 0; i < daysArray.length; i++) {
	if (selectedDay == daysArray[i]) {
	    isDayfound = true;
	    break;
	}
    }
    return isDayfound;
}

function getDays(earlierDate, laterDate, dayNames) {
  
  var elapsedDays = (laterDate - earlierDate) / 1000 / 60 / 60 / 24;
  if (elapsedDays < 7) {
    var dayArray = [];
    for (i = 0; i <= elapsedDays; i++) {
        dayArray.push(dayNames[(earlierDate.getDay()+i) % 7]);
    }
    return dayArray;
  }
  return dayNames;
}

function setLocalStorage(){

    // check if localStorage support!
    if(typeof(Storage)!=="undefined")
      {
            storage = window.localStorage;
            if(storage.getItem("isStorageDefined") != "Yes"){		
            
                    // To escape write again if user forcefully close/stop app
                    storage.setItem("isStorageDefined", "Yes");
                    
                    // registration
                    storage.setItem("patientid", "0");
                    storage.setItem("uid", "");
                    storage.setItem("doctorid", "");
                    storage.setItem("doctorstatus", "0");
                    storage.setItem("approvalstatus", "");
		    storage.setItem("cityId", "");
		    storage.setItem("groupid", "");
		    storage.setItem("usergroupid", "");
		    storage.setItem("accesscontrols", "");
		    storage.setItem("parentUserID", "");
		    storage.setItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_DoctorId(), "");
		    storage.setItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_LocationId(), "");
		    storage.setItem(DoctorAppointment.util.Constant.getStorage_DoctorApptOrTkn_TimeSlot(), "");
            }
            
      }
    else
      {
      // Sorry! No web storage support..
            Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), "Sorry! No local storage support");
      }
}

/** This method will show respective page to doctor according to doctor registration status
 */
function showPageByDoctorStatus(){
    //console.log('showPageByDoctorStatus');
        //console.log(storage.getItem("doctorid"));
        //console.log(storage.getItem("doctorstatus"));
        var doctorid = storage.getItem("doctorid");
        var doctorstatus = parseInt(storage.getItem("doctorstatus"), 10);
        var approvalstatus = storage.getItem("approvalstatus");

        // if Doctor not registered yet (doctorid didn't get after submission and doctorstatus is not updated from server)
        // show to doctor login page
        if(Ext.isEmpty(doctorid) && doctorstatus == 0){
            // show Doctor Login form
            Ext.ComponentQuery.query('#doctorLogin_id')[0].show();
            Ext.ComponentQuery.query('#doctorHomeList')[0].hide();
            Ext.ComponentQuery.query('#approval_status')[0].hide();
            
            // to hide logout button when doctorid empty and status not approved
            Ext.ComponentQuery.query('#logoutButton')[0].hide();
	    Ext.ComponentQuery.query('#btnDoctorHome')[0].hide();
        }
        else if(!Ext.isEmpty(doctorid) && doctorstatus == 0){
            // show with pending status to doctor when doctorid is there after dr. registration but status is pending
            Ext.ComponentQuery.query('#doctorLogin_id')[0].hide();
            Ext.ComponentQuery.query('#doctorHomeList')[0].show();
            
            // Show and set css & html of the appproval msg holder label
            Ext.ComponentQuery.query('#approval_status')[0].show();
            Ext.ComponentQuery.query('#approval_status')[0].setHtml('Pending Approval');
            Ext.ComponentQuery.query('#approval_status')[0].setCls('approval-status-yellow');
            
            // to show logout button after login while doctor status is approved
            Ext.ComponentQuery.query('#logoutButton')[0].show();
	    Ext.ComponentQuery.query('#btnDoctorHome')[0].hide();
            
        }else if(!Ext.isEmpty(doctorid) && doctorstatus == 1){
            // show approved status to doctor when docrorid and doctorstatus is approved by value 1
            Ext.ComponentQuery.query('#doctorLogin_id')[0].hide();
            Ext.ComponentQuery.query('#doctorHomeList')[0].show();
            
            // set css & html of the appproval msg holder label
            Ext.ComponentQuery.query('#approval_status')[0].setHtml('Approved');
            Ext.ComponentQuery.query('#approval_status')[0].setCls('approval-status-green');
            // after approved by admin doctor can show one time approval msg
            if(Ext.isEmpty(approvalstatus)){
                setTimeout(function() {
                    // hide the appproval msg holder label
                    Ext.ComponentQuery.query('#approval_status')[0].hide();
                }, 3000);                 
                storage.setItem("approvalstatus", "Yes");
            }else{
                Ext.ComponentQuery.query('#approval_status')[0].hide();
            }
            
            // to show logout button after login while doctor status is approved
            Ext.ComponentQuery.query('#logoutButton')[0].show();
        }
}
    
    function onPhotoURISuccess(imageURI) {
	try {
	    var btnString = IsPhotoOnRegister ? 'drRegisterImage' : 'drProfileImage';
	    var drImage = Ext.getCmp(btnString);
	    drImage.setStyle('block');
	    drImage.setSrc(imageURI);
	    imageData = imageURI;
	}
	catch(e) {
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), e.message);
	}
    }
    
    function onFail(message) {
	Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), message);
    }
    
    function uploadPhotoWithDoctorProfile(model, requestUrl) {
	
	var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageData.substr(imageData.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = {};
            params.email = model.get('email');
	    params.password = model.get('password');
	    params.fname = model.get('fname');
	    params.mname = model.get('mname');
	    params.lname = model.get('lname');
	    params.specialty = model.get('specialty');
	    params.sex = model.get('sex');
	    params.mobile = model.get('mobile');
	    params.degree = model.get('degree');
	    params.groupid = model.get('groupid');
	    params.doctorid = model.get('doctorid');
	    params.profileid = model.get('profileid');
	    params.addEstablishmentIdsArrayDoctor = model.get('addEstablishmentIdsArrayDoctor');
	    params.editEstablishmentIdsArrayDoctor = model.get('editEstablishmentIdsArrayDoctor');
	    params.deleteEstablishmentIdsArrayDoctor = model.get('deleteEstablishmentIdsArrayDoctor');
	    params.addEstbStaff = model.get('addEstbStaff');
	    params.deleteEstbStaff = model.get('deleteEstbStaff');
	    params.isprofile = model.get('isprofile');
	    params.usergroupid = model.get('usergroupid');
	    params.parentUserID = model.get('parentUserID');

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageData, encodeURI(requestUrl), uploadProfileSuccess, UploadProfileFail, options);
    }
    
    function uploadProfileSuccess(response) {
	Ext.Viewport.setMasked(false);
	imageData = null;
    
	var resultResponse= '';
	if(response.responseText != undefined){
	    resultResponse = Ext.JSON.decode(response.responseText);
	}else{
	    resultResponse = Ext.JSON.decode(response.response);
	}

	if(resultResponse.success){
			
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
		function(buttonId) {
		   if (buttonId === 'ok') {
			//to hide Doctor Registration form and send on doctor home page
			var doctorContainer = Ext.getCmp('id_doctor');
			doctorContainer.pop();
		   }
		},
		this // scope of the controller 
	    );
	    
	}else{
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
	}	
    }
    
    function UploadProfileFail(msg) {
	Ext.Viewport.setMasked(false);
	imageData = null;
	//console.log("Failur:->");
	//console.log(msg.status + ' , ' + msg.statusText);
	
	if(msg.status == 0){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
	}else{
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
	}
    }    
    
    
    function uploadPhotoWithDoctorRegistration(model, requestUrl) {
	
	var options = new FileUploadOptions();
            options.fileKey="file";
            options.fileName=imageData.substr(imageData.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";

            var params = {};
            params.email = model.get('email');
	    params.password = model.get('password');
	    params.fname = model.get('fname');
	    params.mname = model.get('mname');
	    params.lname = model.get('lname');
	    params.specialty = model.get('specialty');
	    params.state = model.get('state');
	    params.city = model.get('city');
	    params.area = model.get('area');
	    params.establishmentname = model.get('establishmentname');
	    params.addressline1 = model.get('addressline1');
	    params.addressline2 = model.get('addressline2');
	    params.sex = model.get('sex');
	    params.mobile = model.get('mobile');
	    params.zip = model.get('zip');
	    params.phone = model.get('phone');
	    params.degree = model.get('degree');
	    params.groupid = model.get('groupid');
            
            options.params = params;

            var ft = new FileTransfer();
            ft.upload(imageData, encodeURI(requestUrl), uploadSuccess, UploadFail, options);

    }
    
    function uploadSuccess(response) {
	Ext.Viewport.setMasked(false);
	imageData = null;
	//console.log("Sucess:->");
	//alert(response);
	//alert(response.status + ', ' + response.responseText);
	//alert(response.response);
	//alert(response.responseCode);
	//alert(response.response.responseText);
    
	var resultResponse= '';
	if(response.responseText != undefined){
	    resultResponse = Ext.JSON.decode(response.responseText);
	}else{
	    resultResponse = Ext.JSON.decode(response.response);
	}
    
	
	//alert(resultResponse);
	
	var doctorid = storage.getItem("doctorid");
	var doctorstatus = parseInt(storage.getItem("doctorstatus"), 10);
	//console.log(doctorid);
    
	//alert(resultResponse.success);
	if(resultResponse.success){
	    // set value of doctorid and doctorstatus from server response
	    //if(Ext.isEmpty(doctorid) && doctorstatus == 0){
		storage.setItem("doctorid", resultResponse.doctorid);
		storage.setItem("doctorstatus", resultResponse.doctorstatus);
		storage.setItem("usergroupid", resultResponse.usergroupid);
		storage.setItem("parentUserID", resultResponse.parentUserID);
		
		// this will set accesscontrols into localstorage then in store according to user login
		try{
		    storage.setItem("accesscontrols", resultResponse.accesscontrols);
		}
		catch (e) {
		    if (e == QUOTA_EXCEEDED_ERR) {
			console.log("Error: Local Storage limit exceeds.");
		    }
		    else {
			console.log("Error: Saving to local storage.");
		    }
		}
		
		var result_accesscontrols = Ext.JSON.decode(storage.getItem("accesscontrols"));
		console.log(result_accesscontrols);
		
		Ext.getStore('AccessControlStore').setData(result_accesscontrols);
		accesscontrols = '';
		accesscontrols = Ext.getStore('AccessControlStore').getData().items[0].data;
		//console.log("Signup: " , accesscontrols);			
	    //}
	    
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getSUCCESS(),resultResponse.message,
		function(buttonId) {
		   if (buttonId === 'ok') {
			//to hide Doctor Registration form and send on doctor home page
			var doctorContainer = Ext.getCmp('id_doctor');
			doctorContainer.pop();
			// subsequent page on successfully login
			showPageByDoctorStatus();
		   }
		},
		this // scope of the controller 
	    );
	    
	    
	}else{
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), resultResponse.error);
	}
    }

    function UploadFail(msg) {
	Ext.Viewport.setMasked(false);
	imageData = null;
	//console.log("Failur:->");
	//console.log(msg.status + ' , ' + msg.statusText);
	
	if(msg.status == 0){
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), DoctorAppointment.util.Constant.getSever_Error_Msg());
	}else{
	    Ext.Msg.alert(DoctorAppointment.util.Constant.getNETWORK_STATUS(), msg.statusText);
	}
    }
    
    // Get expected time for token on doctor search result screen by patient    
    function getExpectedTime(values, ctimedate,search_appt_date) {
	//console.log('search_appt_date: ',search_appt_date);
	//console.log(values);
	var expected_time = '';
	var st_time = values.st;
	var st_hours =  parseInt(st_time.split(":")[0], 10);
	var st_minutes =  parseInt(st_time.split(":")[1].split(" ")[0], 10);
	var st_ampm =  st_time.split(":")[1].split(" ")[1];
	//console.log("st_hours: ",st_hours);
	//console.log("st_minutes: ",st_minutes);
	//console.log("st_ampm: ",st_ampm);
	
	// splite current date and time 
	var cdate =  ctimedate.split(",")[0];
	var ctime =  ctimedate.split(",")[1];
	//console.log('server_current_date: ',cdate);
	//console.log('server_current_time: ',ctime);
	
	var ct_hours =  parseInt(ctime.split(":")[0], 10);
	var ct_minutes =  parseInt(ctime.split(":")[1].split(" ")[0], 10);                                                  
	var ct_ampm = ctime.split(":")[1].split(" ")[1];
	//console.log("ct_hours: ",ct_hours);
	//console.log("ct_minutes: ",ct_minutes);
	//console.log("ct_ampm: ",ct_ampm);
	
	var today = new Date();
	
	var current_year = today.getFullYear();
	var current_month = today.getMonth();
	var current_day = today.getDate();
	var server_year =  parseInt(cdate.split("-")[0], 10);
	var server_month = parseInt(cdate.split("-")[1], 10);
	var server_day = parseInt(cdate.split("-")[2], 10);
	var search_appt_year =  parseInt(search_appt_date.split("-")[0], 10);
	var search_appt_month = parseInt(search_appt_date.split("-")[1], 10);
	var search_appt_day = parseInt(search_appt_date.split("-")[2], 10);	
	
	var current_date = Ext.Date.format(new Date(current_year, current_month, current_day), Ext.Date.patterns.ISO8601Short);
	var server_date = Ext.Date.format(new Date(server_year, server_month - 1, server_day), Ext.Date.patterns.ISO8601Short);
	var search_appt_dates = Ext.Date.format(new Date(search_appt_year, search_appt_month - 1, search_appt_day), Ext.Date.patterns.ISO8601Short);	
	
//	console.log('current_date: ',current_date);
//        console.log('server_date: ',server_date);
//	console.log('search_appt_dates: ',search_appt_dates);
	
	if(st_ampm == 'PM'){
	    st_hours = st_hours + 12;
	}
	if(ct_ampm == 'PM'){
	    if(ct_hours != 12)
		ct_hours = ct_hours + 12;
	}	
	
	var total_st_minutes = (st_hours * 60) + st_minutes;
	//console.log("total_st_minutes: ",total_st_minutes);	
	
	var total_ct_minutes = (ct_hours * 60) + ct_minutes;
	//console.log("total_ct_minutes: ",total_ct_minutes);
	
	var current_tkn_elapsed_time = 0;
	// in case delay occur then calculation on it
	if(values.dtk != null){
	    
	    var delay_token = values.dtk;
	    var delay_duration = values.dldr;
	    var st_delay_token = values.dst;
	    //console.log("delay_token: ",delay_token);
	    //console.log("delay_duration: ",delay_duration);
	    //console.log("st_delay_token: ",st_delay_token);
	    
	    var delay_hours =  parseInt(st_delay_token.split(":")[0], 10);
	    var delay_minutes =  parseInt(st_delay_token.split(":")[1], 10);
	    var delay_start_time = (delay_hours * 60) + delay_minutes;
	    var elapsediff =  0;
	    //console.log("delay_hours: ",delay_hours);
	    //console.log("delay_minutes: ",delay_minutes);
	    //console.log("delay_start_time: ",delay_start_time);
	    
	    // diff = CurrentTime - DelayStartTime
	    // if(diff > TokenDuration) then TokenDuration otherwise diff
	    elapsediff = total_ct_minutes - delay_start_time;
	    //console.log("elapsediff: ",elapsediff);
	    if(elapsediff > delay_duration){
		current_tkn_elapsed_time = delay_duration;
	    }else{
		current_tkn_elapsed_time = elapsediff;
	    }
	}
	//console.log("current_tkn_elapsed_time: ",current_tkn_elapsed_time);

	//patient search date check from server date & current date(java script)
	if((search_appt_dates > server_date) && (search_appt_dates > current_date)){
	    expected_time = total_st_minutes + values.rt;
	}else{
	    // if CT >= ST - CurrentTime is greater then StartTime
	    if(total_ct_minutes >= total_st_minutes){
		expected_time = (total_ct_minutes + values.rt) - current_tkn_elapsed_time;
	    }else{
		expected_time = (total_st_minutes + values.rt) - current_tkn_elapsed_time;
	    }	    
	}
	//console.log("expected_time: ", expected_time);

	var expected_time_hrs = parseInt((expected_time / 60), 10);
	var expected_time_min = expected_time % 60;
	//console.log(expected_time_min);
	
	var ampm = expected_time_hrs >= 12 ? 'PM' : 'AM';
	expected_time_hrs = expected_time_hrs > 12 ? expected_time_hrs - 12 : expected_time_hrs;
	//console.log(expected_time_hrs);
	
	expected_time_min = expected_time_min < 10 ? '0'+expected_time_min: expected_time_min;
	//console.log(expected_time_hrs);
	
	var strTime = expected_time_hrs + ':' + expected_time_min + ' ' + ampm;
	
	return strTime;
   }
   
   // this method will check to show tokens on behalf of endtime check of token slot on doctor search screen
   function isTokenShow(values, ctimedate,search_appt_date) {
	return currentTimeEndTimeDiff(values.en, ctimedate,search_appt_date);
   }
   
    // this method will check to show appointment on doctor search screen
   function isAppointmentShow(values, ctimedate,search_appt_date) {
	
	return currentTimeEndTimeDiff(values.bt, ctimedate,search_appt_date);
   }
   
   // this method will return true if current time > end time otherwise false
   function currentTimeEndTimeDiff(timeval, ctimedate,search_appt_date) {
    	var end_time = timeval;
	var end_hours =  parseInt(end_time.split(":")[0], 10);
	var end_minutes =  parseInt(end_time.split(":")[1].split(" ")[0], 10);
	var end_ampm =  end_time.split(":")[1].split(" ")[1];
	//console.log("end_hours- ",end_hours);
	//console.log("end_minutes- ",end_minutes);
	//console.log("end_ampm- ",end_ampm);

	// splite current date and time 
	var cdate =  ctimedate.split(",")[0];
	var ctime =  ctimedate.split(",")[1];
	//console.log(cdate);
	//console.log(ctime);
	
	var ct_hours =  parseInt(ctime.split(":")[0], 10);
	var ct_minutes =  parseInt(ctime.split(":")[1].split(" ")[0], 10);                                                  
	var ct_ampm = ctime.split(":")[1].split(" ")[1];
	//console.log("ct_hours- ",ct_hours);
	//console.log("ct_minutes- ",ct_minutes);
	//console.log("ct_ampm- ",ct_ampm);
	
	var today = new Date();
	
	var current_year = today.getFullYear();
	var current_month = today.getMonth();
	var current_day = today.getDate();
	var server_year =  parseInt(cdate.split("-")[0], 10);
	var server_month = parseInt(cdate.split("-")[1], 10);
	var server_day = parseInt(cdate.split("-")[2], 10);
	var search_appt_year =  parseInt(search_appt_date.split("-")[0], 10);
	var search_appt_month = parseInt(search_appt_date.split("-")[1], 10);
	var search_appt_day = parseInt(search_appt_date.split("-")[2], 10);	
	
	var current_date = Ext.Date.format(new Date(current_year, current_month, current_day), Ext.Date.patterns.ISO8601Short);
	var server_date = Ext.Date.format(new Date(server_year, server_month - 1, server_day), Ext.Date.patterns.ISO8601Short);
	var search_appt_dates = Ext.Date.format(new Date(search_appt_year, search_appt_month - 1, search_appt_day), Ext.Date.patterns.ISO8601Short);	
	
//	console.log('current_date: ',current_date);
//        console.log('server_date ',server_date);
//	console.log('search_appt_dates ',search_appt_dates);
	
	if(end_ampm == 'PM'){
	    if(end_hours != 12)
		end_hours = end_hours + 12;
	}
	if(ct_ampm == 'PM'){
	    if(ct_hours != 12)
		ct_hours = ct_hours + 12;
	}	
	
	var total_end_minutes = (end_hours * 60) + end_minutes;
	//console.log("total_end_minutes- ",total_end_minutes);	
	
	var total_ct_minutes = (ct_hours * 60) + ct_minutes;
	//console.log("total_ct_minutes- ",total_ct_minutes);

	//patient search date check from server date & current date(java script)
	if((search_appt_dates > server_date) && (search_appt_dates > current_date)){
	    return 'true';
	}else{
	    // if CT > ET - Token slot will not show if CurrentTime is greater than EndTime
	    if(total_ct_minutes > total_end_minutes){
		return 'false';
	    }else{
		return 'true';
	    }	    
	}    
   }


Ext.define("DoctorAppointment.view.Main", {
    extend: 'Ext.tab.Panel',
    xtype: 'tabpanel',
    
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        fullscreen: true,
        tabBarPosition: 'bottom',

        items: [
            //xclass will take priority over xtype:
            { xclass: 'DoctorAppointment.view.patient.PatientHome' },
            { xclass: 'DoctorAppointment.view.doctor.DoctorHome' },
            //{xtype: 'patientContainer'},
            //{xtype: 'doctorContainer'},
            {
                title: DoctorAppointment.util.Constant.getLabel_About_Us(),
                iconCls: 'info',

                styleHtmlContent: true,
                scrollable: true,
                style: 'background-color: white',
                id: 'id_about_us',

                items:[
                    {
                        docked: 'top',
                        xtype: 'titlebar',
                        //title: DoctorAppointment.util.Constant.getLabel_About_Us()
                        title : '<img class="a2zdoc-logo" src="resources/images/logoa2zdoc.png"  ">'
                    },
                    {
                         xtype: 'button',
                         id: 'btn_dr_approved',
                         ui: 'confirm',//'confirm' 'action',
                         text: 'Approve by admin',
                         height: 40,
                         //width: '43%',
                         hidden: true,
                         margin: '10 70 0 70'
                    },
                    {
                         xtype: 'button',
                         id: 'btn_dr_pending',
                         ui: 'decline',//'confirm' 'action',
                         text: 'Pending by admin',
                         height: 40,
                         //width: '43%',
                         hidden: true,
                         margin: '10 70 0 70'
                    },
                    {
                        xtype: 'container',
                        //centered: true,
                        html: [
                            //'<center>' + DoctorAppointment.util.Constant.getLabel_About_Us_Description() + '</center>',
                            //'<br><span style="font-size:18px;color:#054575;"><b>' + DoctorAppointment.util.Constant.getLabel_About_Us_Description() + '</b></span><br>',
                            '<table width="100%">',
                                '<tr>',
                                  '<td>',
                                    //'<a href="http://www.radicleinc.com/rws/index.html" style="color:#504393" target="_block" onclick="hello();return false;"><b>Full Development Project</b></a>',
                                    '<br>A2ZDOC revolutionizes the way patients and doctors interact for appointments and tokens.  This is real time doctors token and appointment management application. Patients can easily search doctors and manage appointments and tokens for their family - all for FREE!!. Doctors can manage their practices, hospitals, attendants, appointments, tokens and schedules. A2ZDOC eliminates unnecessary wasting of patient\'s time waiting in doctor\'s clinic and at the same time enables doctors to provide comfortable and spacious environment to patients.',
                                  '</td>',
                                '</tr>',
                                //'<tr>',
                                //  '<td>',
                                //    '<a href="http://www.radicleinc.com/rws/index.html" style="color:#504393" target="_block"><b>Web Developing</b></a>',
                                //    '<br>Our specialists are skilled in creating dynamic, highly interactive and functional websites.',
                                //  '</td>',
                                //'</tr>',
                                //'<tr>',
                                //  '<td>',
                                //    '<a href="http://www.radicleinc.com/rws/index.html" style="color:#504393" target="_block"><b>Web Design</b></a>',
                                //    '<br>We design and develop excellent user interface with a great look and feel and easy to use functionalities.</td>',
                                //'</tr>',
                                '<tr>',
                                  '<td align="center">',
                                    '<a href="http://www.a2zdoc.com" style="color:#504393" target="_blank"><b>www.a2zdoc.com</b></a>',
                                    //'<br>Our SEO and website promotion services guarantees to drive potential clients from the search engines to your website.',
                                  '</td>',
                                '</tr>',
                              '</table>',
                        ].join("")
                    }
                ]

            }            
        ]
    }
});


Ext.define("DoctorAppointment.view.patient.PatientRegistrationForm", {
     extend: 'Ext.form.Panel',
     xtype: 'patientRegistration',
     
    requires: [
        'Ext.field.Text',
        'Ext.form.FieldSet',       
        'Ext.field.Select',
        'Ext.field.Radio',
        'Ext.Label',
        'Ext.field.Number'
    ],     
     

    config: {
        //title: '',
        layout: 'fit',
        fullscreen: true,
        scrollable: false,
        style: 'background:#c0c0c0',
        styleHtmlContent: true,
        centered: true,
        //modal: true,
        height: '100%',
        width: '100%',
        
        
        /**
         * @cfg
         * @inheritdoc
         */
        showAnimation: {
            type: 'slideIn',//'fadeIn',
            duration: 250,
            easing: 'ease-out'
        },

        /**
         * @cfg
         * @inheritdoc
         */
        hideAnimation: {
            type: 'slideOut',//'fadeOut',
            duration: 250,
            reverse: true,
            easing: 'ease-out'
        },

        /**
         * Override the default zIndex so it is normally always above floating components.
         */
        //zIndex: 10,        
        
        
        items: [
            {
                xtype: 'fieldset',
                id: 'patient_registration_form',
                hidden: false,
                defaults: {
                    //required: true,
                    //labelAlign: 'left',
                    //labelWidth: '30%',
                    cls: 'with_border'
                },
                hideOnMaskTap: false,
                scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
                instructions: '<font color="#000">' + DoctorAppointment.util.Constant.getLabel_Patient_Reg_Form_Instruction() + '</font>',
                title: '<center><font size="3" color="#000">' + DoctorAppointment.util.Constant.getLabel_Patient_Reg_Form_Title() + '</font></center>',
                items: [
                    {
                        xtype: 'label',
                        cls: 'commanTextSkyBlueNormal14',
                        //style: 'border: 0px !important;',
                        html: DoctorAppointment.util.Constant.getLabel_Patient_Reg_Form_Info(),
                        margin: '0 0 5 0',
                    },
                    {
                         xtype: 'textfield',
                         //cls: 'no_border_bottom',
                         //width: '90%',
                         name: 'mobile',
                         label: '',
                         itemId: 'mobileInputfield',
                         placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_Mobile()
                    },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         width: '100%',
                         //cls: 'no_border',
                         items: [
                              {
                                   xtype: 'textfield',
                                   cls: 'no_border_separate1',
                                   width: '50%',
                                   name: 'uid',
                                   label: '',
                                   readOnly: true,
                                   itemId: 'uidInputfield',
                                   placeHolder: DoctorAppointment.util.Constant.getLabel_Patient_Reg_Form_UID()
                              },
                              {
                                   xtype: 'checkboxfield',
                                   cls: 'no_border_separate2',
                                   labelCls: 'uid-edit-label',
                                   width: '50%',
                                   labelWidth: '80px',
                                   label: DoctorAppointment.util.Constant.getLabel_Patient_Reg_Form_Edit_UID(),
                                   itemId: 'uidCheckBoxfield'
                              }
                         ]
                    },
                    {
                         xtype: 'textfield',
                         //cls: 'no_border_bottom',
                         name: 'fname',
                         label: '',
                         itemId: 'fnameInputfield',
                         placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name()
                    },
                    {
                         xtype: 'textfield',
                         //cls: 'no_border_bottom',
                         name: 'lname',
                         label: '',
                         itemId: 'lnameInputfield',
                         placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name()
                    },
                    {
                         xtype: 'numberfield',
                         //cls: 'no_border_bottom',
                         //width: '90%',
                         name: 'age',
                         label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Age(),
                         labelWidth: '45px',
                         labelCls: 'sex-label-color',
                         minValue: 1,
                         maxValue: 120,
                         stepValue: 1,
                         maxLength: 3,
                         itemId: 'ageNumberfield'
                         //placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_Age(),
                    },                    
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         width: '100%',
                         //cls: 'no_border',
                         items: [
                              {
                                  xtype: 'radiofield',
                                  cls: 'no_border_separate1',
                                  //style: 'border-bottom: 0px solid #dddddd !important; border-left: 0px !important; border-top: 0px !important; border-right: 1px solid #dddddd !important;',
                                  width: '50%',
                                  name: 'sex',
                                  labelCls: 'sex-label-color',
                                  label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Male(),
                                  value: 'male',
                                  labelWidth: 75
                                  //checked: true
                              },
                              {
                                  xtype: 'radiofield',
                                  cls: 'no_border_separate2',
                                  //style: 'border-bottom: 0px solid #dddddd !important; border-left: 1px !important; border-top: 1px !important; border-right: 0px !important;',
                                  width: '50%',
                                  name: 'sex',
                                  labelCls: 'sex-label-color',
                                  label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Female(),
                                  labelWidth: 75,
                                  value: 'female'
                              }
                         ]
                    },
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: '',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_Email() + ' (' + DoctorAppointment.util.Constant.getLabel_Optional() +')'
                    },                    
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         width: '100%',
                         cls: 'no_border',
                         items: [
                                   {
                                     xtype: 'spacer',
                                     width: '5%'
                                   },
                                   {
                                        xtype: 'button',
                                        id: 'btn_submit_patient_registration',
                                        ui: 'action',//'confirm',
                                        text: DoctorAppointment.util.Constant.getLabel_Reg_Form_Submit(),
                                        height: 35,
                                        width: '43%',
                                        margin: '25 0 0 0'
                                   },
                                   {
                                     xtype: 'spacer',
                                     width: '4%'
                                   },
                                   {
                                        xtype: 'button',
                                        itemId: 'btn_submit_later_patient_registration',
                                        ui: 'decline',//'decline',action
                                        text: DoctorAppointment.util.Constant.getLabel_Assign_Later(),
                                        height: 35,
                                        width: '43%',
                                        margin: '25 0 0 0'
                                   },
                                   {
                                     xtype: 'spacer',
                                     width: '5%'
                                   }                                   
                         ]
                    },                  
                    {
                    	xtype: 'panel',
                        cls: 'no_border',
                    	height: 400
                    }
                ]
            }           
        ],
        listeners: [
            {
                fn: 'onSubmitRegisterLater',
                event: 'tap',
                delegate: '#btn_submit_later_patient_registration'
            },
            {
                fn: 'onUidCheckBoxField',
                event: 'check',
                delegate: '#uidCheckBoxfield'
            },
            {
                fn: 'onUidUncheckBoxField',
                event: 'uncheck',
                delegate: '#uidCheckBoxfield'
            },
            {
                fn: 'onEnterMobileNo',
                event: 'keyup',
                delegate: '#mobileInputfield'
            },
            {
                fn: 'onClearMobileNo',
                event: 'clearicontap',
                delegate: '#mobileInputfield'
            }             
          ]       
    },
    onSubmitRegisterLater: function(btn, evt ,eOption) {
     this.hide();
    },
    onUidCheckBoxField: function(Checkbox, evt ,eOption) {
          Ext.ComponentQuery.query('#uidInputfield')[0].setReadOnly(false);
    },
    onUidUncheckBoxField: function(Checkbox, evt ,eOption) {
          Ext.ComponentQuery.query('#uidInputfield')[0].setReadOnly(true);
    },
    onEnterMobileNo: function(TextField, evt ,eOption) {
          Ext.ComponentQuery.query('#uidInputfield')[0].setValue(TextField.getValue());
    },
    onClearMobileNo: function(TextField, evt ,eOption) {
          Ext.ComponentQuery.query('#uidInputfield')[0].setValue('');
    }      
});

Ext.define('DoctorAppointment.view.patient.PatientHome', {

    extend: 'Ext.NavigationView',
    xtype: 'patientContainer',
    id: 'id_patient',
    
    requires: [
        'Ext.dataview.List',
        'Ext.Img'
    ],

    config: {

        title: DoctorAppointment.util.Constant.getLabel_Patient(),
        iconCls: 'user',
        
        navigationBar: {
            //ui: 'sencha',
            items: [
                {
                    xtype: 'button',
                    id: 'patientHomeButton',
                    iconMask: true,
                    //text: DoctorAppointment.util.Constant.getLabel_HOME(),
                    iconCls: 'home',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },         

        autoDestroy: false,
        
          items: [{
                //title : DoctorAppointment.util.Constant.getLabel_Dr_Appointment(),
                title : '<img class="a2zdoc-logo" src="resources/images/logoa2zdoc.png"  ">',
                styleHtmlContent: true,
                padding: 0,
                 // layout: {
                 //    pack: 'start',
                 //    //align: 'stretch',
                 //    type: 'vbox'
                 //},
                 layout: 'fit',
                
                items: [
                        {
                            xtype: 'container',
                            //styleHtmlContent: true,
                            //style: 'background: -webkit-gradient(linear, left top, left bottom, from(#A3A3A3), to(#E8E8E8));',
                            padding: 0,
                            layout: {
                                pack: 'start',
                                //align: 'stretch',
                                type: 'vbox'
                            },
                            items: [
                                {
                                    xtype: 'spacer',
                                    flex: 1
                                  },
                                  {
                                      xtype: 'list',
                                      height: 220,
                                      id: 'patientHomeList',
                                      ui: 'round',
                                      //cls: 'bg-location-list',
                                      //cls: 'legislator-list',
                                      cls: 'patient-list',
                                      //scrollable: false,
                                      flex: 1,                      
                                      emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                                      //itemTpl: ['{title1} '],
                                      itemTpl: [
                                          '<div class="legislator-list-item">',
                                              '<div class="rightarrow" style="background-image: url(resources/images/list_arrow.png);"></div>',
                                              '<span class="legislator-pic" style="background-image: url({imageurl});"></span>',
                                              '<div class="name1">{title1}</div>',
                                              '<div class="name2">{title2}</div>',
                                          '</div>'
                                      ],
                                      //onItemDisclosure: true,
                                      store: 'PatientHomeListStore'
                                  },
                                  {
                                    xtype: 'spacer',
                                    flex: 1
                                  }
                            ]
                        }
                  ]
          }]        
    }
 
});


Ext.define("DoctorAppointment.view.patient.PatientTakeAppointment", {
     extend: 'Ext.form.Panel',
     xtype: 'patientTakeAppointment',
     
    requires: [
        'Ext.field.Text',
        'Ext.form.FieldSet',       
        'Ext.field.Select',
        //'Ext.field.Search',
        'Ext.Label',
        'Ext.field.DatePicker',
        'Ext.field.Hidden'
    ],     
     

    config: {
        title: '',
        layout: 'fit',
        fullscreen: true,
        scrollable: false,
        //width: 300,
        style: 'background:#c0c0c0',
        styleHtmlContent: true,
        
        items: [
            {
                xtype: 'fieldset',
                id: 'registration_form',
                hidden: false,
                defaults: {
                    //required: true,
                    //labelAlign: 'left',
                    //labelWidth: '30%',
                    cls: 'with_border'
                },
                hideOnMaskTap: false,
                scrollable: true,
                //instructions: '<font color="#000">Please select your criteria information above.</font>',
                //title: '<center><font size="3" color="#000">' + DoctorAppointment.util.Constant.getLabel_Form_Title() + '</font></center>',
                items: [
                    {
                         xtype: 'panel',
                         hidden: true,
                         style: 'border: 0px !important;',
                         items: [
                              {
                                   
                                   xtype: 'button',
                                   id: 'btn_known_dr_appointment',
                                   ui: 'forward',
                                   text: DoctorAppointment.util.Constant.getLabel_Form_Button_MyDr(),
                                   width: 180,
                                   margin: '3% 0% 3% 0%'
                              },
                              {
                                   xtype: 'label',
                                   html: '<hr>',
                                   padding: '5 0 5 0',
                               }
                         ]
                    },
                    {
                        xtype: 'label',
                        cls: 'commanTextSkyBlueNormal14',
                        style: 'font-weight:bold; ',
                        html: DoctorAppointment.util.Constant.getLabel_SEARCH(),
                        margin: '0 0 5 0',
                    },                    
                    {
                        xtype: 'selectfield',
                        id: 'stateByPatient',
                        name: 'state',
                        label: DoctorAppointment.util.Constant.getLabel_State(),
                        labelWidth: '70px',
                        required: true,
                        valueField: 'stateID',
                        displayField: 'name',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_State(),
                        //value: 'Delhi',
                        inputCls: 'selectfieldinput',
                        usePicker:true,
                        defaultPhonePickerConfig:{
                              centered:true,
                              height:'100%'
                         },                        
                        store: 'StateActiveStore'
                    },
                    {
                        xtype: 'selectfield',
                        id: 'cityByPatient',
                        name: 'city',
                        label: DoctorAppointment.util.Constant.getLabel_City(),
                        labelWidth: '70px',
                        required: true,
                        valueField: 'cityId',
                        displayField: 'cityName',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_City(),
                        //disabled: true,
                        inputCls: 'selectfieldinput',
                        usePicker:true,
                        defaultPhonePickerConfig:{
                              centered:true,
                              height:'100%'
                         },  
                        store: 'CityDoctorStore'
                    },
                    {
                        xtype: 'selectfield',
                        name: 'area',
                        label: DoctorAppointment.util.Constant.getLabel_Area(),
                        labelWidth: '70px',
                        valueField: 'areaId',
                        displayField: 'areaName',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_Area(),
                        //disabled: true,
                        inputCls: 'selectfieldinput',
                        usePicker:true,
                        defaultPhonePickerConfig:{
                              centered:true,
                              height:'100%'
                         },                          
                        store: 'AreaStore'
                        //store: {
                        //    data: [
                        //        { area: 'an', title: 'Area'},
                        //        { area: 'an', title: 'Arjun Nagar'},
                        //        { area: 'dl', title: 'DLF'},
                        //        { area: 'sr', title: 'Sohna Road'},
                        //        { area: 'ic', title: 'IFFCO Choke'},
                        //        { area: 'rc', title: 'Rajeev Choke'},
                        //        { area: 'mn', title: 'Maneser'}                                   
                        //    ]
                        //}
                    },                    
                    {
                        xtype: 'selectfield',
                        name: 'specialty',
                        label: DoctorAppointment.util.Constant.getLabel_Specialty(),
                        labelWidth: '70px',
                        valueField: 'specialtyCode',
                        displayField: 'specialtyName',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_Specialty(),
                        //disabled: true,
                        inputCls: 'selectfieldinput',
                        usePicker:true,
                        defaultPhonePickerConfig:{
                              centered:true,
                              height:'100%'
                         },                          
                        store: 'SpecialtyActiveStore'
                        //store: {
                        //    data: [
                        //        { specialtyCode: 'ANA', specialtyName: 'Anaesthetics'},
                        //        { specialtyCode: 'PATH', specialtyName: 'Pathology'},
                        //        { specialtyCode: 'CRDL', specialtyName: 'Cardiology'},
                        //        { specialtyCode: 'ENDL', specialtyName: 'Endocrinology'},
                        //        { specialtyCode: 'GSL', specialtyName: 'Gastroenterology'},
                        //        { specialtyCode: 'GYNE', specialtyName: 'Gynaecology and obstetrics'},
                        //        { specialtyCode: 'NLG', specialtyName: 'Neurology'},
                        //        { specialtyCode: 'OPTH', specialtyName: 'Ophthalmology'},
                        //        { specialtyCode: 'PDS', specialtyName: 'Paediatrics'}
                        //    ]
                        //}
                    },
                    //{
                    //     xtype: 'textfield',
                    //     //cls: 'no_border_bottom',
                    //     //width: '90%',
                    //     name: 'drname',
                    //     label: '',
                    //     itemId: 'doctorInputfield',
                    //     placeHolder: DoctorAppointment.util.Constant.getLabel_Form_Textbox_Dr_Name(),
                    //     required: true
                    //},
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         width: '100%',
                         //cls: 'no_border',
                         items: [
                              {
                                   xtype: 'textfield',
                                   cls: 'no_border_separate1',
                                   width: '50%',
                                   name: 'fname',
                                   label: DoctorAppointment.util.Constant.getLabel_DR(),
                                   labelWidth: '40px',
                                   //labelCls: 'dr-label-color',
                                   itemId: 'doctorFnameInputfield',
                                   placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name()                                        
                              },
                              {
                                   xtype: 'textfield',
                                   cls: 'no_border_separate2',
                                   width: '50%',
                                   name: 'lname',
                                   label: '',
                                   itemId: 'doctorLnameInputfield',
                                   placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name()
                              }
                         ]
                    },                    
                    {
                        xtype: 'datepickerfield',
                        name: 'searchdate',
                        label: DoctorAppointment.util.Constant.getLabel_Form_Search_Date(),
                        labelWidth: '95px',
                        required: true,
                        value: new Date(),
                        dateFormat: 'd-m-Y',
                        picker: {
                            slotOrder: ["day","month","year"],
                            yearFrom: new Date().getFullYear(),
                            yearTo: new Date().getFullYear() + 20,
                            height: '100%'
                        },
                        itemId: 'searchDate',
                        inputCls: 'selectfieldinput',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_Form_Search_Date()
                        //,
                        // listeners:{
                        //   change:function(picker, newDate ,eOption){
                        //      var today = new Date();
                        //      var pickerDate = picker.getValue();
                        //      
                        //      var todayFormateDate = Ext.Date.format(today, Ext.Date.patterns.ISO8601Short)
                        //      var pickerFormateDate = Ext.Date.format(pickerDate, Ext.Date.patterns.ISO8601Short)
                        //      
                        //      console.log(todayFormateDate);
                        //      console.log(pickerFormateDate);
                        //
                        //      if(pickerFormateDate == todayFormateDate || pickerFormateDate > todayFormateDate){
                        //           //alert('Can');
                        //      }else{
                        //           //alert('Can not');
                        //           picker.setValue(today);//set today
                        //      }
                        //   }
                        // }                        
                        //listeners: {
                        //      click:
                        //      {
                        //           element: 'element', 
                        //           fn: function()    { 
                        //                Ext.getCmp('searchDate').getPicker().setValue(new Date());//set today
                        //           }
                        //      }
                        //}
                    },
                    {
                        xtype: 'label',
                        hidden: true,
                        id: 'errordate',
                        cls: 'commanTextSkyRedNormal14',
                        style: 'border: 0px !important;',
                        html: '',
                        margin: '15 0 3 0',
                    },                   
                    {
                         xtype: 'button',
                         id: 'btn_known_dr_search',
                         ui: 'confirm', //'action-round',
                         text: DoctorAppointment.util.Constant.getLabel_SEARCH(),
                         height: 35,
                         //width: 180,
                         margin: '20 70 0 70'
                    },
                    {
                    	xtype: 'panel',
                        cls: 'no_border',
                    	height: 400
                    }
                ]
            }           
        ],
        listeners: [
            {
                fn: 'onSearchDateChange',
                event: 'change',
                delegate: '#searchDate'
            }
          ]        
    },
    // when user change date to find dr. appointment
    onSearchDateChange: function(picker, newDate ,eOption) {
           var today = new Date();
           var pickerDate = picker.getValue();
           
           var todayFormateDate = Ext.Date.format(today, Ext.Date.patterns.ISO8601Short);
           var pickerFormateDate = Ext.Date.format(pickerDate, Ext.Date.patterns.ISO8601Short);
           
           //console.log(todayFormateDate);
           //console.log(pickerFormateDate);
                   
          // date selection should not below today date
           if(pickerFormateDate == todayFormateDate || pickerFormateDate > todayFormateDate){
                //alert('Can');
           }else{
                //alert('Can not');
                picker.setValue(today);//set today
                Ext.getCmp('errordate').setHtml(DoctorAppointment.util.Constant.getLabel_Form_Search_Date_Err_Msg1());
                Ext.getCmp('errordate').show();
           }
           
           
           var current_year = today.getFullYear();
           var current_month = today.getMonth();
           var current_day = today.getDate();
           var selected_year = picker.getValue().getFullYear();
           var selected_month = picker.getValue().getMonth();
           var selected_day = picker.getValue().getDate();
           
           var current_date = Ext.Date.format(new Date(current_year, current_month + 3, current_day), Ext.Date.patterns.ISO8601Short);
           var selected_date = Ext.Date.format(new Date(selected_year, selected_month, selected_day), Ext.Date.patterns.ISO8601Short);
           
          //console.log(current_date);
          //console.log(selected_date);
           
           // Only 3 months date selection to get doctor appointment in Dr. search
           if(selected_date > current_date){
                picker.setValue(today);//set today
                Ext.getCmp('errordate').setHtml(DoctorAppointment.util.Constant.getLabel_Form_Search_Date_Err_Msg2());
                Ext.getCmp('errordate').show();
           }
           
          // to hide date error label after 3 seconds automatically
           setTimeout(function(){
               Ext.getCmp('errordate').hide();
           },3000);
    }
});

Ext.define("DoctorAppointment.view.patient.SearchDoctorAppointment", {
     extend: 'Ext.Container',
     xtype: 'searchDoctorAppointment',
     
    requires: [
        'Ext.plugin.ListPaging',
        'Ext.Img',
        'Ext.Map'
        //'Ext.dataview.List'
        //'Ext.plugin.PullRefresh'
    ],
     
    config: {
        title: '',
        layout: {
             //pack: 'start',
             type: 'vbox'
         },
        styleHtmlContent: true,
        fullscreen: true,
        style: 'background:#EEEEEE',
        //width: 300,
        padding: 0,
        items: [
            {
                xtype: 'panel',
                id: 'doctor_list_panel',
                layout: 'fit',
                styleHtmlContent: true,
                style: 'background-color: white',
                flex: 1,
                items: [
                    {
                         xtype: 'container',
                         layout: 'vbox',
                         items: [
                              {
                                   xtype: 'panel',
                                   docked: 'top',
                                   flex: 1,
                                   style: 'background:#8d95a8',
                                   title: '<center><font size="3" color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Heading_Upcoming_Appt() + '</font></center>',
                                   items: [
                                        {
                                             xtype: 'list',
                                             //flex: 1,
                                             ui: 'normal',
                                             disableSelection: true,
                                             //margin: '2% 0% 0% 0%',
                                             height: 50,
                                             //docked: 'top',
                                             scrollable: false,
                                             //padding: '0 0 0 0',
                                             id: 'appointmentToolBarList',
                                             itemTpl: [
                                                  '<div class="x-list-item appointment">',
                                                       '<div class="leftarrow-toolbar" style="background-image: url(resources/images/list_arrow_left.png);"></div>',
                                                       '<div class="rightarrow-toolbar" style="background-image: url(resources/images/list_arrow.png);"></div>',
                                                       '<h3>{searchdate:date("D, d F, Y")}</h3>',
                                                  '</div>' 
                                             ],
                                            store: 'PatientTakeAppointmentStore'//'DoctorApptPageStore'  
                                        }
                                   ]
                              },
                              {
                                  xtype: 'list',
                                  flex: 1,
                                  //indexBar: true,
                                  plugins: [
                                      //'pullrefresh',
                                      //{
                                      //    type: 'listpaging',
                                      //    autoPaging: true
                                      //},
                                      {
                                          xclass: 'Ext.plugin.ListPaging',
                                          noMoreRecordsText: DoctorAppointment.util.Constant.getList_Msg_NoMoreRecordsText(),
                                          autoPaging: true
                                      }
                                  ],
                                  id: 'doctorlist',
                                  ui: 'normal',
                                  emptyText: '<center><font size="3" color="#333333">' + DoctorAppointment.util.Constant.getLabel_Form_List_Empty_Text() + '</font></center>',
                                  //styleHtmlContent: true,
                                  //onItemDisclosure: true,
                                  itemTpl: new Ext.XTemplate(
                                      '<div class="x-list-item speaker">',
                                             '<div class="rightarrow" style="background-image: url(resources/images/list_arrow.png);"></div>',
                                              '<div class="gmap" style="background-image: url(resources/images/gmapicon.png);"></div>',
                                              '<div class="image_popup_phone" style="background-image: url(resources/images/phone.png);"></div>',
                                              '<h3>' + DoctorAppointment.util.Constant.getLabel_DR() + DoctorAppointment.util.Constant.getEmptyString() + '{drname}</h3>',
                                              '<h4>{estb} {area} {addr}, {city}, {state}</h4>',
                                              //'<tpl if="tokenno != \'\'">',
                                              //    '<div class="tokenno">',
                                              //        ''+DoctorAppointment.util.Constant.getLabel_List_TokenNo()+'<span>{tokenno}</span>',
                                              //        ''+ DoctorAppointment.util.Constant.getEmptyString() +'',
                                              //        ''+DoctorAppointment.util.Constant.getLabel_List_TokenNo_Time()+'<span>{tokentime}</span>',
                                              //        '<span>></span>',
                                              //    '</div>',
                                              //'</tpl>',
                                              '<tpl if="tkn != \'\' && tkn != null && tkn.length != 0 && istokenlabelshow != \'false\' " >',
                                                  '<h5>'+DoctorAppointment.util.Constant.getLabel_List_TokenNo()+':</h5>',
                                                  '<div class="tokenslot">',
                                                       '<tpl for="tkn">',
                                                            '<tpl for="tslot">',
                                                                 '<tpl if="tkno != null && istokenshow == \'true\'">',
                                                                      '<tlink><a href="#" style="text-decoration: none;" target="_block" onClick="return false;" title="{et}">{st}-{en}<br>No.' + DoctorAppointment.util.Constant.getEmptyString() +'{tkno},' + DoctorAppointment.util.Constant.getEmptyString() +'{et}</a></tlink>',
                                                                 '</tpl>',
                                                            '</tpl>',
                                                       '</tpl>',    
                                                  '</div>',
                                              '</tpl>',                                               
                                              '<tpl if="appt != \'\' && appt != null && appt.length != 0 && isapptlabelshow != \'false\' ">',
                                                  '<h5>'+DoctorAppointment.util.Constant.getLabel_Appointment()+':</h5>',
                                                  '<div class="apptslot">',
                                                       '<tpl for="appt">',
                                                            '<tpl for="aslot">',
                                                            //'{isapptshow}',
                                                                 '<tpl if="isapptshow == \'true\' ">',
                                                                      '<alink><a href="#" style="text-decoration: none;" target="_block" onClick="return false;" title="{bt}">{bt}</a></alink>',
                                                                 '</tpl>',
                                                            '</tpl>',
                                                       '</tpl>',    
                                                  '</div>',
                                              '</tpl>',                                              
                                      '</div>'
                                      //,
                                      //    {
                                      //       getRemainingTime:function(values) {
                                      //            //console.log(values);
                                      //            var st_time = values.st;
                                      //            var st_hours = st_time.split(":")[0];
                                      //            var st_minutes = st_time.split(":")[1].split(" ")[0];                                                  
                                      //            var st_ampm = st_time.split(":")[1].split(" ")[1];
                                      //            console.log("st_hours- ",st_hours);
                                      //            console.log("st_minutes- ",st_minutes);
                                      //            console.log("st_ampm- ",st_ampm);
                                      //            
                                      //            var ct_time = storage.getItem("ctime");
                                      //            alert(ct_time);
                                      //            //if(!Ext.isEmpty(ct_time))
                                      //                 console.log(ct_time);
                                      //            //var ct_hours = ct_time.split(":")[0];
                                      //            //var ct_minutes = ct_time.split(":")[1].split(" ")[0];                                                  
                                      //            //var ct_ampm = ct_time.split(":")[1].split(" ")[1];
                                      //            //console.log("ct_hours- ",ct_hours);
                                      //            //console.log("ct_minutes- ",ct_minutes);
                                      //            //console.log("ct_ampm- ",ct_ampm);
                                      //            
                                      //            //var ampm = hours >= 12 ? 'PM' : 'AM';
                                      //            var rmntime = st_hours + values.rt;
                                      //            //console.log(rmntime);
                                      //            //console.log(storage.getItem("ctime"));
                                      //            
                                      //            //if(CT >= ST){
                                      //            //     CT + rt
                                      //            //}else{
                                      //            //     ST + rt
                                      //            //}
                                      //            
                                      //            
                                      //            return rmntime;
                                      //       }
                                      //    }
                                  ),
                                  store: 'DoctorStore'
                              }
                         ]
                    }
                ]
            },
            {
                xtype: 'panel',
                id: 'doctor_gmap_panel',
                hidden: true,
                flex: 1,
                layout: 'fit',
                items: [
                    {
                        xtype: 'toolbar',
                        docked: 'top',
                        //style: 'background: #F7F7F7 !important;',
                        cls: 'heading-map-toolbar-bgcolor',
                        items: [
                              {
                                   xtype: 'label',
                                   id: 'heading_map_label',
                                   width: '90%',
                                   cls: 'heading-map-label',
                                   html: '',
                              },
                              {
                                xtype: 'spacer',
                              },
                              {
                                  xtype: 'button',
                                  width: '10%',
                                  id: 'btn_gmap_close',
                                  iconCls: 'delete',
                                  iconMask: true
                              }                            
                        ]
                    },
                    {
                         xtype: 'map',
                         id: 'map_doctor_id',
                         mapOptions: {
                             zoomControl: true,
                             panControl: true,
                             rotateControl: true,
                             streetViewControl: true,
                             mapTypeControl: true,
                             mapMaker: true,
                             zoom: 10
                             //mapTypeId : google.maps.MapTypeId.ROADMAP,
                             //travelMode: google.maps.DirectionsTravelMode.DRIVING,
                             //navigationControl: true
                              //navigationControlOptions: {
                              //    style: google.maps.NavigationControlStyle.DEFAULT
                              //}
                         }
                    }
                ]
            } 
        ]
    }
     
});

Ext.define("DoctorAppointment.view.patient.BookAppointment", {
     extend: 'Ext.form.Panel',//extend: 'Ext.Container',
     xtype: 'bookAppointment',
     
    config: {
            title: '',
               baseCls: 'x-show-contact',
               scrollable: {
                    direction: 'vertical',
                    directionLock: true
                },
               styleHtmlContent: true,
               //style: 'background:gray',
               
        items: [
               {
                     id: 'content_dr',
                     tpl: [
                         '<div class="top">',
                             '<div class="headshot" style="background-image:url('+ DoctorAppointment.util.Constant.getDr_image_url() + '{doctorid}' + '.jpg);"></div>',
                             '<div class="name">' + DoctorAppointment.util.Constant.getLabel_DR() + DoctorAppointment.util.Constant.getEmptyString() + '{drname}',
                                   '<span>{speciality}</span>',
                                   '<span>{estb}</span>',
                                   '<span>{area}</span>',
                                   '<span>{address}</span>',
                                   '<span>{city}, {state}</span>',
                             '</div>',
                         '</div>'
                     ].join('')
               },
               {
                    xtype: 'label',
                    cls: 'bgHomeListSkyBlueNormal14',
                    id: 'appt_msg',
                    html: ''
               },
               {
                    xtype: 'fieldset',
                    id: 'fieldset_appointment_for',
                    title: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_For_Title(),
                    //instructions: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_Instructions(),
                    defaults: {
                         xtype: 'radiofield',
                         labelWidth: '40%',
                         listeners: {  
                              check: function() {
                              //console.log(this.originalValue);  //originalValue - self or family
                                   if(this.originalValue == 'self'){
                                        Ext.getCmp('fieldset_me_family').show();
                                        Ext.getCmp('fnameInputfield').setDisabled(true);
                                        Ext.getCmp('lnameInputfield').setDisabled(true); 
                                        showRegisteredPatient();
                                        
                                   }else if(this.originalValue == 'family'){
                                        
                                        // to show input value to enter
                                        Ext.getCmp('fnameInputfield').show();
                                        Ext.getCmp('lnameInputfield').show();
                                        Ext.getCmp('ageNumberfield').show();
                                        Ext.getCmp('radio_sex_male').show();
                                        Ext.getCmp('radio_sex_female').show(); 
                                        
                                        Ext.getCmp('fieldset_me_family').hide();
                                        Ext.getCmp('fnameInputfield').setDisabled(false);
                                        Ext.getCmp('lnameInputfield').setDisabled(false);
                                        
                                        Ext.getCmp('fnameInputfield').setValue('');
                                        Ext.getCmp('lnameInputfield').setValue('');
                                        Ext.getCmp('ageNumberfield').reset();
                                        Ext.getCmp('medicaldesc').setValue('');
                                        Ext.getCmp('radio_sex_male').setChecked(false);
                                        Ext.getCmp('radio_sex_female').setChecked(false);
                                   }
                              },
                              painted: function(){
                                   // to checked always Existing radio field on page load
                                   Ext.getCmp('radio_self').setChecked(true);
                              }
                          }
                         },
                    items: [
                        { name: 'patient_type', label: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_Existing_Patients(), checked: true, value: 'self' , id: 'radio_self' }, //checked: true,
                        { name: 'patient_type', label: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_New_Patients(), value: 'family', id: 'radio_family'}
                    ]
               },
               {
                xtype: 'fieldset',
                id: 'fieldset_me_family',
                hidden: true,
                //title: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_Existing_Patients(),
                defaults: {
                    //required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                         {
                             xtype: 'selectfield',
                             id: 'registeredPatient',
                             name: 'patient_name',
                             required: true,
                             label: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_Patient_Name(),
                             valueField: 'existingPatientID',
                             displayField: 'name',
                             placeHolder: '',
                             //disabled: true,
                             store: 'RegisteredPatientStore'
                         }   
                    ]
               },
               {
                xtype: 'fieldset',
                id: 'fieldset_other_family',
                //title: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_New_Patients(),
                hidden: false,
                defaults: {
                    //required: true,
                    labelAlign: 'left',
                    labelWidth: '40%'
                },
                items: [
                         {
                              xtype: 'textfield',
                              //cls: 'no_border_bottom',
                              //width: '90%',
                              name: 'fname',
                              required: true,
                              label: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name(),
                              id: 'fnameInputfield'
                              //placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name()
                         },
                         {
                              xtype: 'textfield',
                              //cls: 'no_border_bottom',
                              //width: '90%',
                              name: 'lname',
                              required: true,
                              label: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name(),
                              id: 'lnameInputfield'
                              //placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name()
                         },
                         {
                              xtype: 'numberfield',
                              //cls: 'no_border_bottom',
                              //width: '90%',
                              name: 'age',
                              required: true,
                              label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Age(),
                              minValue: 1,
                              maxValue: 120,
                              stepValue: 1,
                              maxLength: 3,
                              id: 'ageNumberfield'
                              //placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_Age()
                         },                    
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              //cls: 'no_border',
                              items: [
				        {
                                        xtype: 'radiofield',
                                        name: 'sex',
                                        width: '50%',
                                        required: true,
                                        //labelCls: 'sex-label-color',
                                        labelWidth: 65,
                                        label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Male(),
                                        value: 'male',
                                        id: 'radio_sex_male'
                                        //checked: true
                                    },
                                    {
                                        xtype: 'radiofield',
                                        name: 'sex',
                                        width: '50%',
                                        required: true,
                                        //labelCls: 'sex-label-color',
                                        style: 'border-bottom: 1px solid #dddddd !important;',
                                        labelWidth: 65,
                                        label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Female(),
                                        id: 'radio_sex_female',
                                        value: 'female'
                                    }
                              ]
                         },
                         {
                             xtype: 'textareafield',
                             name: 'medicaldesc',
                             id: 'medicaldesc',
                             label: DoctorAppointment.util.Constant.getLabel_Patient_Reg_Form_Med_Desc(),
                             maxRows: 4,
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Optional()
                         }                   
                    ]
               },               
               {
                    xtype: 'fieldset',
                    id: 'patient_booking_form',
                    hidden: true,
                    items: [
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'block_id',
                              name: 'block_id',        // this is common holding value either 'Token' or 'Appointment'
                              value: ''
                         },
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'block_time',
                              name: 'block_time',
                              value: ''
                         },
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'token_no',
                              name: 'token_no',
                              value: ''
                         },
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'token_time',
                              name: 'token_time',
                              value: ''
                         },
                         //{
                         //     //xtype: 'textfield',
                         //     xtype: 'hiddenfield',
                         //     label: 'appointment_id',
                         //     name: 'appointment_id',
                         //     value: ''
                         //},
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'appointment_time',
                              name: 'appointment_time',
                              value: ''
                         },                          
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'doctorid',
                              name: 'doctorid',
                              value: ''
                         },
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'appt_type',
                              name: 'appt_type',
                              value: ''
                         },
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'appt_date',
                              name: 'appt_date',
                              value: ''
                         },
                         {
                              //xtype: 'textfield',
                              xtype: 'hiddenfield',
                              label: 'establishmentid',
                              name: 'establishmentid',
                              value: ''
                         }                          
                    ]
               },
               {
                   xtype: 'label',
                   cls: 'bgHomeListSkyBlueNormal14',
                   id: 'bookingApptInstructions',
                   //style: 'font-weight:bold; ',
                   html: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_Instructions(),
                   margin: '10 10 10 10',
               },               
               {
                    xtype: 'button',
                    id: 'btn_patient_book_appointment',
                    ui: 'confirm',//'confirm' 'action',
                    text: DoctorAppointment.util.Constant.getLabel_Book_Appointment_Submit(),
                    height: 35,
                    //width: '43%',
                    margin: '15 30 0 30'
               },
               {
                   xtype: 'panel',
                   //cls: 'no_border',
                   height: 200
               }               
            ],
               record: null
          },
          updateData: function(newData) {
               if (newData) {
                    //console.log(newData);
                    //console.log(newData.data);
                   this.down('#content_dr').setData(newData.data);
                   showRegisteredPatient();
               }
          },
          
          

});

     function showRegisteredPatient(){
          //console.log('showRegisteredPatient() called');
          
          // to hide input value to enter
          Ext.getCmp('fnameInputfield').hide();
          Ext.getCmp('lnameInputfield').hide();
          Ext.getCmp('ageNumberfield').hide();
          Ext.getCmp('radio_sex_male').hide();
          Ext.getCmp('radio_sex_female').hide();          
          
          var RegisteredPatientStoreItems = Ext.getStore('RegisteredPatientStore').getData().items;
          var RegisteredPatientId = Ext.getCmp('registeredPatient').getValue();
          //console.log('showRegisteredPatient(): ' + RegisteredPatientId);
          var registeredPatientStoreData = '';
           Ext.Object.each(RegisteredPatientStoreItems, function(key, valuedata, myself) {
              if(RegisteredPatientId == valuedata.data.existingPatientID){
                  registeredPatientStoreData = valuedata.data
              }
          });
           
          //console.log(registeredPatientStoreData);
          
          Ext.getCmp('fnameInputfield').setValue(registeredPatientStoreData.fname);
          Ext.getCmp('lnameInputfield').setValue(registeredPatientStoreData.lname);
          Ext.getCmp('ageNumberfield').setValue(registeredPatientStoreData.age);
     
          if(registeredPatientStoreData.sex == 'Male'){
              Ext.getCmp('radio_sex_male').setChecked(true);
              //Ext.getCmp('radio_sex_male').setValue(registeredPatientStoreData.sex);
          }
          else{
              Ext.getCmp('radio_sex_female').setChecked(true);
              //Ext.getCmp('radio_sex_female').setValue(registeredPatientStoreData.sex);
          }
           
          Ext.getCmp('medicaldesc').setValue(registeredPatientStoreData.medicaldesc);  

          
     }



Ext.define("DoctorAppointment.view.patient.PatientWaitingTime", {
     extend: 'Ext.Container',
     xtype: 'patientWaitingTime',
     
    config: {
          title: '',
          style: 'background-color: white',
          styleHtmlContent: true,
          padding: 0,
            layout: {
               pack: 'start',
               //align: 'stretch',
               type: 'vbox'
           },
          items: [
               {
                    xtype: 'toolbar',
                    //docked: 'top',
                    cls: 'commonBgColor',
                    items: [
                     {
                         xtype: 'spacer',
                         width: '3%'
                    },                         
                     {
                          xtype: 'textfield',
                          id: 'uidtextfield',
                          placeHolder: DoctorAppointment.util.Constant.getLabel_Enter_UID(),
                          width: '75%'
                     },
                     {
                         xtype: 'spacer'
                    },
                     {
                         xtype: 'button',
                         id: 'btn_check_upcoming_appt_refresh',
                         iconCls: 'refresh',
                         iconMask: true
                     }
                    ]
                },               
              {
                xtype: 'list',
                //hidden: true,
                flex: 1,
                id: 'upcomingapptlist',
                scrollable: true,
                padding: 1,
                disableSelection: true,
                ui: 'normal',
                emptyText: '',
                styleHtmlContent: true,
                margin: '1% 0% 0% 0%',
                style: 'border: 5px solid #dddddd !important;',
                //onItemDisclosure: true,
               itemTpl: [
                    '<div class="x-list-item upcoming">',
                         '<div class="rightarrow" style="background-image: url(resources/images/list_arrow.png);"></div>',
                         '<div class="dates">',
                              '{appointmantdate}',
                         '</div>',
                        '<div class="names">',
                              '<label>',
                              ''+DoctorAppointment.util.Constant.getLabel_Patient()+':<span>{patient_name}</span>,',
                              '</label>',
                              ''+ DoctorAppointment.util.Constant.getEmptyString() +'',
                              ''+DoctorAppointment.util.Constant.getLabel_DR()+'<span>{drname}</span>',
                        '</div>',
                        '<div class="gradient-upcoming">',
                              '<tpl if="tokenno != null && token_time != null">',
                                  //'<hr>',
                                  '<div class="token">',
                                      ''+DoctorAppointment.util.Constant.getLabel_List_TokenNo()+':<span>' + DoctorAppointment.util.Constant.getLabel_Booked() + ' {tokenno}</span>,',
                                      '<span> {token_time}</span>',
                                  '</div>',
                              '</tpl>',
                              '<tpl if="tokenno != null && token_expected_date_time != null">',
                                  '<div class="token-current">',
                                      ''+DoctorAppointment.util.Constant.getLabel_TokenExpectedTime()+'',
                                      ''+ DoctorAppointment.util.Constant.getEmptyString() +'',
                                      '<span>{token_expected_date_time}</span>',                                            
                                  '</div>',
                              '</tpl>',
                        '</div>',
                        '<div class="gradient-upcoming">',
                              '<tpl if="appointment_time != \'\' && tokenno == null">',
                                  //'<hr>',
                                  '<div class="appointment">',
                                      ''+DoctorAppointment.util.Constant.getLabel_Appointment()+':<span>{appointment_time}</span>',
                                      //''+ DoctorAppointment.util.Constant.getEmptyString() +'',
                                      //'<span>{appointmantdate}</span>',                                            
                                  '</div>',
                              '</tpl>',
                              '<tpl if="appointment_time != null && current_appt_visit_time != null">',
                                  '<div class="appointment-current">',
                                      ''+DoctorAppointment.util.Constant.getLabel_ExpectedAppointment()+':<span>{current_appt_visit_time}</span>',                                           
                                  '</div>',
                              '</tpl>',
                        '</div>',
                    '</div>'                                                       
               ],
                store: 'UpcomingAppointmentsStore'
              }
          ]
    }
     
});

Ext.define("DoctorAppointment.view.patient.CancelAppointment", {
     extend: 'Ext.form.Panel',//extend: 'Ext.Container',
     xtype: 'cancelAppointment',
     
    config: {
        title: '',
        scrollable: {
             direction: 'vertical',
             directionLock: true
         },
        styleHtmlContent: true,
               
        items: [
            {
                 xtype: 'label',
                 id: 'lblDoctorNameCancelAppt',
                 cls: 'bgHomeListSkyBlueNormal14',
                 html: ''
            },
            { 
                 xtype: 'label',
                 id: 'lblPatientNameCancelAppt',
                 cls: 'bgHomeListSkyBlueNormal14',
                 html: ''
            },
            {
             xtype: 'fieldset',
             //id: 'fieldset_me_family',
             title: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_Existing_Patients(),
             defaults: {
                 //required: true,
                 labelAlign: 'left',
                 labelWidth: '40%'
             },
             items: [
                      {
                          xtype: 'selectfield',
                          id: 'existingPatient',
                          name: 'existingpatientid',
                          required: true,
                          label: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_Patient_Name(),
                          valueField: 'existingPatientID',
                          displayField: 'name',
                          placeHolder: '',
                          //disabled: true,
                          store: 'RegisteredPatientStore',
                          listeners:{
                              change:{
                                fn    :this.showRegisteredPatients,
                                scope :this
                              }
                            }
                      }   
                 ]
            },
            {
             xtype: 'fieldset',
             //id: 'fieldset_other_family',
             //title: DoctorAppointment.util.Constant.getLabel_Booking_Appointment_New_Patients(),
             defaults: {
                 //required: true,
                 labelAlign: 'left',
                 labelWidth: '40%'
             },
             items: [
                      {
                           xtype: 'textfield',
                           //cls: 'no_border_bottom',
                           //width: '90%',
                           name: 'fname',
                           required: true,
                           label: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name(),
                           id: 'fnameCancelAppt'
                           //placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name()
                      },
                      {
                           xtype: 'textfield',
                           //cls: 'no_border_bottom',
                           //width: '90%',
                           name: 'lname',
                           required: true,
                           label: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name(),
                           id: 'lnameCancelAppt'
                           //placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name()
                      },
                         {
                              xtype: 'numberfield',
                              //cls: 'no_border_bottom',
                              //width: '90%',
                              name: 'age',
                              required: true,
                              label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Age(),
                              minValue: 1,
                              maxValue: 120,
                              stepValue: 1,
                              maxLength: 3,
                              id: 'ageNumberfieldCancelAppt'
                              //placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_Age()
                         },                    
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              //cls: 'no_border',
                              items: [
				        {
                                        xtype: 'radiofield',
                                        name: 'sex',
                                        width: '50%',
                                        required: true,
                                        //labelCls: 'sex-label-color',
                                        labelWidth: 65,
                                        label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Male(),
                                        value: 'male',
                                        id: 'radio_sex_maleCancelAppt'
                                        //checked: true
                                    },
                                    {
                                        xtype: 'radiofield',
                                        name: 'sex',
                                        width: '50%',
                                        required: true,
                                        //labelCls: 'sex-label-color',
                                        style: 'border-bottom: 1px solid #dddddd !important;',
                                        labelWidth: 65,
                                        label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Female(),
                                        id: 'radio_sex_femaleCancelAppt',
                                        value: 'female'
                                    }
                              ]
                         }                      
                    ]
            },
            {
                 xtype: 'fieldset',
                 hidden: true,
                 items: [
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'parentUserID',
                         id: 'parentUserID',
                         name: 'parentUserID',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'patientid',
                         name: 'patientid',
                         id: 'patientid',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'guid',
                         name: 'guid',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'doctorid',
                         name: 'doctorid',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'establishmentid',
                         name: 'establishmentid',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'appt_date',
                         name: 'appt_date',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'token_time',
                         name: 'token_time',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'appointment_time',
                         name: 'appointment_time',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'blockid',
                         name: 'blockid',
                         value: ''
                    },
                    {
                         //xtype: 'textfield',
                         xtype: 'hiddenfield',
                         label: 'token_no',
                         name: 'token_no',
                         value: ''
                    }                     
                 ]
            },            
            {
                 xtype: 'panel',
                 layout: 'vbox',
                 //width: '100%',
                 //cls: 'no_border',
                 items: [
                           {
                                xtype: 'button',
                                id: 'btn_update_patient_name',
                                ui: 'action',//'confirm',
                                text: DoctorAppointment.util.Constant.getLabel_Update_Patient_Name(),
                                height: 40,
                                //width: '43%',
                                margin: '10 70 0 70'
                           },
                           {
                             xtype: 'spacer'
                           },
                           {
                                xtype: 'button',
                                id: 'btn_cancel_patient_appointment',
                                ui: 'decline',//'decline',action
                                text: DoctorAppointment.util.Constant.getLabel_Cancel_Appointment(),
                                height: 40,
                                //width: '43%',
                                margin: '10 70 0 70'
                           }                                   
                 ]
            },                  
            {
                xtype: 'panel',
                cls: 'no_border',
                height: 400
            }            
        ]
    }
});

function showRegisteredPatients(){
          //console.log('showRegisteredPatient() called');
          //var RegisteredPatientStoreItems = Ext.getStore('RegisteredPatientStore').getData().items;
          //var RegisteredPatientId = Ext.getCmp('existingPatient').getValue();
          ////console.log('showRegisteredPatient(): ' + RegisteredPatientId);
          //var registeredPatientStoreData = '';
          // Ext.Object.each(RegisteredPatientStoreItems, function(key, valuedata, myself) {
          //    if(RegisteredPatientId == valuedata.data.existingPatientID){
          //        registeredPatientStoreData = valuedata.data
          //        console.log(valuedata.data);
          //        Ext.getCmp('parentUserID').setValue(valuedata.data.parentuserid);
          //        Ext.getCmp('patientid').setValue(valuedata.data.existingPatientID);
          //    }
          //});
          // 
          ////console.log(registeredPatientStoreData);
          //
          //Ext.getCmp('fnameCancelAppt').setValue(registeredPatientStoreData.fname);
          //Ext.getCmp('lnameCancelAppt').setValue(registeredPatientStoreData.lname);
          //Ext.getCmp('ageNumberfieldCancelAppt').setValue(registeredPatientStoreData.age);
          //
          //if(registeredPatientStoreData.sex == 'Male'){
          //    Ext.getCmp('radio_sex_maleCancelAppt').setChecked(true);
          //    //Ext.getCmp('radio_sex_male').setValue(registeredPatientStoreData.sex);
          //}
          //else{
          //    Ext.getCmp('radio_sex_femaleCancelAppt').setChecked(true);
          //    //Ext.getCmp('radio_sex_female').setValue(registeredPatientStoreData.sex);
          //} 
     }

Ext.define("DoctorAppointment.view.doctor.DoctorAssignLocationOverlay", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorAssignLocationOverlay',
     
    requires: [
        //'Ext.navigation.View',
        //'Ext.navigation.Bar',        
        //'Ext.dataview.List'
    ],
    config: {
        modal: true,
        //styleHtmlContent: true,
        hideOnMaskTap: true,
        top:'5%',
        left:'5%',
        right:'5%',
        bottom:'5%',
        //top: 0,
        //left: 0,
	height:'60%',
        width: '90%',
        //layout: 'fit',
        
            items: [
               {
                 xtype: 'toolbar',
                 docked: 'top',
                 title: '<center><font size="3" color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Assign_Location() + '</font></center>'   
               },                 
            {
                 xtype: 'container',
                 //title: DoctorAppointment.util.Constant.getDoctor_Profiles_Tab_Add_Profile(),
                 styleHtmlContent: true,
                 //style: 'background:#EEEEEE',
                 padding: 0,
                 layout: {
                     pack: 'start',
                     type: 'vbox'
                },
                 items: [                
                    {
                        xtype: 'label',
                        cls: 'commanTextSkyBlueNormal14',
                        style: 'font-weight:bold; ',
                        html: DoctorAppointment.util.Constant.getLabel_Select_Location(),
                        //margin: '0 0 0 0',
                    },                      
                     {
                              xtype: 'list',
                              id: 'doctorAssignLocationsMultiselectList',
                              scrollable: false,
                              style: 'background-color:#EEEEEE; ',
                              mode: 'MULTI',
                              ui: 'round',
                              cls: 'doctor-assign-location-list',
                              //cls: 'bg-location-list',
                              //flex: 1,
                              //height: 150,
                              emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                              itemTpl: ['{establishmentname} '], // name
                              //onItemDisclosure: true,
                              store: 'DoctorLocationsStore' //DoctorLocationsStore
                              //listeners: {
                              //      selectionchange: function (list, records) {
                              //         var names = [];
                              //         Ext.Array.each(records, function (item) {
                              //          //console.log(item.data.establishmentid);
                              //             names.push('<li>' + item.data.establishmentid + '</li>');
                              //         });
                              //         //console.log(names);
                              //         Ext.Msg.alert('You selected ' + records.length + ' item(s)', '<ul>' + names.join(',') + '</ul>');
                              //      } 
                              //  } 
                     },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         width: '100%',
                         //cls: 'no_border',
                         items: [
                                   {
                                     xtype: 'spacer',
                                     width: '5%'
                                   },
                                   {
                                        xtype: 'button',
                                        id: 'btn_doctor_assign_location_done',
                                        ui: 'action',//'confirm',
                                        text: DoctorAppointment.util.Constant.getLabel_DONE(),
                                        height: 35,
                                        width: '43%',
                                        margin: '25 0 0 0'
                                   },
                                   {
                                     xtype: 'spacer',
                                     width: '4%'
                                   },
                                   {
                                        xtype: 'button',
                                        itemId: 'btn_doctor_assign_location_later',
                                        ui: 'decline',//'decline',
                                        text: DoctorAppointment.util.Constant.getLabel_Assign_Later(),
                                        height: 35,
                                        width: '43%',
                                        margin: '25 0 0 0'
                                   },
                                   {
                                     xtype: 'spacer',
                                     width: '5%'
                                   }                                   
                         ]
                    },
                    {
                         xtype: 'panel',
                         height: 300
                     }
                ]
            }
          ],
          listeners: [
              {
                  fn: 'onDoctorAssignLocationLater',
                  event: 'tap',
                  delegate: '#btn_doctor_assign_location_later'
            }
          ] 
    },
     onDoctorAssignLocationLater: function(btn, evt ,eOption) {
          this.hide();
     }
});     

Ext.define("DoctorAppointment.view.doctor.DoctorProfiles", {
    extend: 'Ext.Container',
    xtype: 'doctorProfiles',

    config: {
          title: '',
          layout: {
             pack: 'start',
             type: 'vbox'
          },
          padding: 0,
          styleHtmlContent: true,
          fullscreen: true,
          style: 'background:#EEEEEE',
          items: [
               {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '2% 0% 0% 0%',
                    items: [
                         {
                              xtype: 'spacer'
                         },
                         {
                              xtype: 'button',
                              id: 'btnDrProfileAdd',
                              padding: '10 25 10 25',
                              //iconMask: true,
                              //iconCls: 'add',
                              text: DoctorAppointment.util.Constant.getLabel_Add(),
                              //align: 'right',
                              ui: 'confirm'
                         },
                         {
                              xtype: 'spacer'
                         }                         
                    ]
               },         
               {
                   xtype: 'list',
                   id: 'doctorProfilesList',
                   ui: 'round',
                   //cls: 'bg-location-list',
                   flex: 1,                      
                   emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                   //itemTpl: ['{fName} {lName} - {groupName}'],
                   itemTpl:[
                    '<div class="x-list-item profile-list">',
                                   //'<div class="rightarrow" style="background-image: url(resources/images/list_arrow.png);"></div>',
                                    '<div class="line-one">{name}</div>',
                                    '<div class="line-two">{groupName}</div>',
                    '</div>'
                    ],
                   onItemDisclosure: true,
                   store: 'ProfilesStore'
               }
          ]
    }    
     
});

Ext.define("DoctorAppointment.view.doctor.DoctorOfficeHours", {
     extend: 'Ext.Container',
     xtype: 'doctorOfficeHours',
     
    config: {
        title: '',
          layout: {
             pack: 'start',
             type: 'vbox'
         },
        padding: 0,
        styleHtmlContent: true,
        fullscreen: true,
        style: 'background:#EEEEEE',
        items: [
                    {
                       xtype: 'panel',
                       margin: '2% 2% 2% 2%',
                       items: [
                         {
                            xtype: 'label',
                            cls: 'commanTextSkyBlueNormal14',
                            style: 'font-weight:bold; ',
                            html: DoctorAppointment.util.Constant.getLabel_Select_Doctor(),
                            margin: '15 0 -10 10'
                         },
                         {
                              xtype: 'fieldset',
                              margin: '15 10 5 10',
                              items: [
                                      {
                                            xtype: 'selectfield',
                                            id: 'selectDoctorForOfficeHour',
                                            label: '',
                                            valueField: 'profileid',
                                            displayField: 'name',
                                            placeHolder:  DoctorAppointment.util.Constant.getLabel_Form_Textbox_Dr_Name(),
                                            inputCls: 'selectfieldinput',
                                             usePicker:true,
                                             defaultPhonePickerConfig:{
                                               centered:true,
                                               height:'100%'
                                              },                                             
                                            store: 'DoctorStoreForOfficeHours'
                                      }
                                 ]
                         },
                         {
                            xtype: 'label',
                            cls: 'commanTextSkyBlueNormal14',
                            style: 'font-weight:bold; ',
                            html: DoctorAppointment.util.Constant.getLabel_Select_Location(),
                            margin: '20 0 -10 10'
                         },
                         {
                           xtype: 'fieldset',
                           margin: '15 10 5 10',
                           items: [
                         {
                               xtype: 'selectfield',
                               id: 'selectLocationForOfficeHour',
                               label: '',
                               valueField: 'establishmentid',
                               displayField: 'establishmentname',
                               placeHolder: DoctorAppointment.util.Constant.getDoctor_Location(),
                               inputCls: 'selectfieldinput',
                                 usePicker:true,
                                 defaultPhonePickerConfig:{
                                   centered:true,
                                   height:'100%'
                                  },                                
                               store: 'DoctorAssignedLocationStoreForOfficeHours'
                          }]},
                       ]
                    },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         margin: '2% 0% 0% 0%',
                         items: [
                              {
                                   xtype: 'spacer'
                              },
                              {
                                   xtype: 'button',
                                   id: 'btnDrOfficeHoursAdd',
                                   padding: '10 25 10 25',
                                   text: DoctorAppointment.util.Constant.getLabel_Add(),
                                   //iconMask: true,
                                   //iconCls: 'add',
                                   //align: 'right',
                                   ui: 'confirm'
                              },
                              {
                                   xtype: 'spacer'
                              }                              
                         ]
                    },
                    {
                         xtype: 'list',
                         id: 'doctorOfficeHoursList',
                         ui: 'round',
                         flex: 1,
                         emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                         onItemDisclosure: true,
                         itemTpl: new Ext.XTemplate('<div class="x-list-item profile-list">',
                                                       '<div class="line-one">' + DoctorAppointment.util.Constant.getLabel_slot() + '&nbsp;{[values.xindex]}:&nbsp;{[this.getTime(values.start_time)]} &nbsp;-&nbsp;{[this.getTime(values.end_time)]}</div>',
                                                        '<div class="line-two">{[this.getApplicableDays(values)]}</div>',
                    
                                                       '</div>',
                                                       {
                                                            getApplicableDays:function(values) {
                                                                 
                                                                 var strDays = '';
                                                                 
                                                                 if (values.mon)
                                                                      strDays = DoctorAppointment.util.Constant.getLabel_Monday() + DoctorAppointment.util.Constant.getLabel_comma();
                                                                 if (values.tue)
                                                                      strDays = strDays + DoctorAppointment.util.Constant.getLabel_Tuesday() + DoctorAppointment.util.Constant.getLabel_comma();
                                                                 if (values.wed)
                                                                      strDays = strDays + DoctorAppointment.util.Constant.getLabel_Wednesday() + DoctorAppointment.util.Constant.getLabel_comma();
                                                                 if (values.thu)
                                                                      strDays = strDays + DoctorAppointment.util.Constant.getLabel_Thursday() + DoctorAppointment.util.Constant.getLabel_comma();
                                                                 if (values.fri)
                                                                      strDays = strDays + DoctorAppointment.util.Constant.getLabel_Friday() + DoctorAppointment.util.Constant.getLabel_comma();
                                                                 if (values.sat)
                                                                      strDays = strDays + DoctorAppointment.util.Constant.getLabel_Saturday() + DoctorAppointment.util.Constant.getLabel_comma();
                                                                 if (values.sun)
                                                                      strDays = strDays + DoctorAppointment.util.Constant.getLabel_Sunday() + DoctorAppointment.util.Constant.getLabel_comma();
                                                                 
                                                                 strDays = strDays.substr(0, strDays.length-2);
                                                                 return strDays;
                                                            },
                                                            
                                                            getTime: function(start_time) {
                                                                 var arrTime = start_time.split(":");
                                                                 var hours = arrTime[0];
                                                                 var minutes = arrTime[1];
                                                                 var ampm = hours >= 12 ? 'PM' : 'AM';
                                                                 hours = hours % 12;
                                                                 hours = hours ? hours < 10 ? '0'+hours: hours : 12; // the hour '0' should be '12'
                                                                 var strTime = hours + ':' + minutes + ' ' + ampm;
                                                                 
                                                                 return strTime;
                                                            }
                                                       } 
                                  ),
                         store: 'DoctorOfficeHoursStore'
                    } 
               ]
          }
     
});

Ext.define("DoctorAppointment.view.doctor.BookAppointmentInstant", {
     extend: 'Ext.form.Panel',//extend: 'Ext.Container',
     xtype: 'bookAppointmentInstant',
     
    config: {
     layout: {
             pack: 'start',
             type: 'vbox'
         },
     hideOnMaskTap: true,
     modal: true,
     top:'5%',
     left:'5%',
     right:'5%',
     height:'57%',
     width: '90%',
     
        items: [
          {
               xtype: 'toolbar',
               id: 'bookInstantToolbar',
               docked: 'top',
               height: 40,
               width: '100%',
               items: [                
               {
                    xtype: 'button',
                    id: 'btn_doctor_appointment_token_book_cancel',
                    height: 20,
                    top: 2,
                    left: 1,
                    text: 'Cancel'
                    
               },
               {
                    xtype: 'button',
                    id: 'btn_doctor_appointment_token_done',
                    height: 20,
                    top: 2,
                    right: 1,
                    text: 'Done'
               }
               ]
          },
          {
               xtype: 'spacer',
               style: 'background-color:#EEEEEE;',
               height: 15
          },
          {
               xtype: 'container',
               id: 'tokenbookContainer',
               layout: 'vbox',
               style: 'background-color:#EEEEEE;',
               items: [
                    {
                         xtype: 'fieldset',
                         id: 'fieldSetAppointmentOrTokenForAdd',
                         items: [{
                              xtype: 'selectfield',
                              id: 'selectAppttime',
                              label: 'Available Slot',
                              labelWidth: 120,
                              valueField: 'expectedtime',
                              displayField: 'expectedtime',
                              inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },                                             
                              store: 'DoctorInstantBookedApptsStore'
                         }
                    ]},
                    {
                         xtype: 'container',
                         id: 'panelNextToken',
                         margin: '0 0 20 0',
                         layout: 'hbox',
                         style: 'background-color:#EEEEEE;',
                         items: [
                              {
                                   xtype: 'label',
                                   cls: 'commanTextSkyBlueNormal14',
                                   style: 'background-color:#EEEEEE;font-weight:bold;margin-top:3px;',
                                   html: 'Next Available Token:'
                              },
                              {
                                   xtype: 'spacer',
                                   style: 'background-color:#EEEEEE;',
                                   width: 10
                              },
                              {
                                   xtype: 'label',
                                   id: 'lblNextTokenNo',
                                   style: 'background-color:#EEEEEE;font-weight:bold;',
                                   html: ''
                              },
                         ]
                    },
                    {
                         xtype: 'panel',
                         style: 'background-color:#EEEEEE;font-size:17px;',
                         items: [
                              {
                                   xtype: 'textfield',
                                   cls: 'with_border',
                                   name: 'fname',
                                   required: true,
                                   labelWidth: 100,
                                   label: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name()
                              },
                              {
                                   xtype: 'textfield',
                                   cls: 'with_border',
                                   name: 'lname',
                                   labelWidth: 100,
                                   label: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name(),
                                   placeHolder: DoctorAppointment.util.Constant.getLabel_Optional()
                              },
                              {
                                   xtype: 'textfield',
                                   cls: 'with_border',
                                   name: 'mobile',
                                   labelWidth: 100,
                                   label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Mobile(),
                                   placeHolder: DoctorAppointment.util.Constant.getLabel_Optional()
                         },
                              {
                                   xtype: 'numberfield',
                                   cls: 'with_border',
                                   name: 'age',
                                   labelWidth: 100,
                                   label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Age(),
                                   placeHolder: DoctorAppointment.util.Constant.getLabel_Optional(),
                                   minValue: 1,
                                   maxValue: 120,
                                   stepValue: 1,
                                   maxLength: 3
                              },                    
                              {
                                   xtype: 'panel',
                                   layout: 'hbox',
                                   width: '100%',
                                   cls: 'with_border',
                                   items: [
                                             {
                                             xtype: 'radiofield',
                                             name: 'sex',
                                             width: '50%',
                                             labelWidth: 65,
                                             label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Male(),
                                             value: 'male',
                                             id: 'radio_sex_male_InstantBook'
                                         },
                                         {
                                             xtype: 'radiofield',
                                             name: 'sex',
                                             width: '50%',
                                             style: 'border-bottom: 1px solid #dddddd !important;',
                                             labelWidth: 70,
                                             label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Female(),
                                             id: 'radio_sex_female_InstantBook',
                                             value: 'female'
                                         }
                                   ]
                              },
                              {
                                  xtype: 'textareafield',
                                  cls: 'with_border',
                                  name: 'medicaldesc_InstantBook',
                                  id: 'medicaldesc_InstantBook',
                                  labelWidth: 120,
                                  label: DoctorAppointment.util.Constant.getLabel_Patient_Reg_Form_Med_Desc(),
                                  maxRows: 4,
                                  placeHolder: DoctorAppointment.util.Constant.getLabel_Optional()
                              }
                         ]
                    }
               ]
          },
          {
               xtype: 'panel',
               height: 300
          }
       ],
        listeners: [{
                         fn: 'onCancel',
                         event: 'tap',
                         delegate: '#btn_doctor_appointment_token_book_cancel'
                    }]
     },
     onCancel: function(btn, evt ,eOption) {
          this.hide();
     }

});

Ext.define("DoctorAppointment.view.doctor.DoctorOfficeHoursAddEdit", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorOfficeHoursAddEdit',
     
    config: {
        title: '',
        styleHtmlContent: true,
        scrollable: {
          direction: 'vertical',
          directionLock: true
        },
        items: [          
          {
               xtype: 'label',
               id: 'lblDoctorName_Office',
               cls: 'bgHomeListSkyBlueNormal14',
               html: ''
          },
          { 
               xtype: 'label',
               id: 'lblDoctorLocation_Office',
               cls: 'bgHomeListSkyBlueNormal14',
               html: ''
          },
          {
               xtype: 'fieldset',
               layout: 'vbox',
               title: '',
               items: [
                {
                    xtype: 'timepickerfield',
                    id: 'startTimePickerOfficeHour',
                    label: DoctorAppointment.util.Constant.getLabel_Start_Time(),
                    value: new Date(),
                    picker:{
                        height:'100%'
                    }
                },
                {
                    xtype: 'timepickerfield',
                    id: 'closeTimePickerOfficeHour',
                    label: DoctorAppointment.util.Constant.getLabel_End_Time(),
                    value: new Date(),
                    picker:{
                        height:'100%'
                    }
               }
            ]
          },
          {
               xtype: 'checkboxfield',
               name : 'mon',
               cls: 'with_border',
               label: DoctorAppointment.util.Constant.getLabel_Monday()
               
          },
          {
               xtype: 'checkboxfield',
               name : 'tue',
               cls: 'with_border',
               label: DoctorAppointment.util.Constant.getLabel_Tuesday()
               
          },
          {
               xtype: 'checkboxfield',
               name : 'wed',
               cls: 'with_border',
               label: DoctorAppointment.util.Constant.getLabel_Wednesday()
               
          },
          {
               xtype: 'checkboxfield',
               name : 'thu',
               cls: 'with_border',
               label: DoctorAppointment.util.Constant.getLabel_Thursday()
               
          },
          {
               xtype: 'checkboxfield',
               name : 'fri',
               cls: 'with_border',
               label: DoctorAppointment.util.Constant.getLabel_Friday()
               
          },
          {
               xtype: 'checkboxfield',
               name : 'sat',
               cls: 'with_border',
               label: DoctorAppointment.util.Constant.getLabel_Saturday()
               
          },
          {
               xtype: 'checkboxfield',
               name : 'sun',
               cls: 'with_border',
               label: DoctorAppointment.util.Constant.getLabel_Sunday()
               
          },
          {
               xtype: 'spacer',
               height: 20
          },
          {
               xtype: 'container',
               layout: 'hbox',
               width: '100%',
               title: '',
               items: [
                    {
                         xtype: 'panel',
                         width: '50%',
                         layout: 'vbox',
                         title: '',
                         items: [
                              {
                                   xtype: 'radiofield',
                                   id: 'optionsOfficeHoursToken',
                                   name : 'optionsOfficeHours',
                                   cls: 'with_border',
                                   width: 150,
                                   labelWidth: 80,
                                   label: DoctorAppointment.util.Constant.getLabel_List_TokenNo(),
                                   checked: true
                              },
                              {
                                   xtype: 'textfield',
                                   id: 'txtTokenTime',
                                   cls: 'with_border',
                                   width: 150,
                                   labelWidth: 80,
                                   label: DoctorAppointment.util.Constant.getLabel_Avg_Duration_Min() // to show on token selection
                                   
                              },
                              {
                                   xtype: 'textfield',
                                   id: 'txtNotoken',
                                   cls: 'with_border',
                                   width: 150,
                                   labelWidth: 80,
                                   label: DoctorAppointment.util.Constant.getLabel_Total_Token()
                              },
                              
                         ]
                    },
                    {
                         xtype: 'panel',
                         width: '50%',
                         layout: 'vbox',
                         title: '',
                         items: [
                              {
                                   xtype: 'radiofield',
                                   id: 'optionsOfficeHoursAppointment',
                                   name : 'optionsOfficeHours',
                                   cls: 'with_border',
                                   width: 140,
                                   labelWidth: 90,
                                   label: DoctorAppointment.util.Constant.getLabel_Appointment()
                              },
                              {
                                   xtype: 'textfield',
                                   id: 'txtAppointmentTime',
                                   cls: 'with_border',
                                   width: 140,
                                   labelWidth: 70,
                                   label: DoctorAppointment.util.Constant.getLabel_Avg_Duration_Min() // to show on appointment selection
                                   
                              }
                         ]
                    }
               ]
          },
          {
               xtype: 'spacer',
               height: 10
          },           
          {
               xtype: 'fieldset',
               layout: 'vbox',
               items: [
                    {
                         xtype: 'datepickerfield',
                         name: 'effectivedate',
                         label: DoctorAppointment.util.Constant.getLabel_Effective_Date(),
                         labelWidth: 100,
                         value: new Date(),
                         dateFormat: 'd-m-Y',
                         picker: {
                             slotOrder: ["day","month","year"],
                             yearFrom: new Date().getFullYear(),
                             yearTo: new Date().getFullYear() + 20,
                             height: '100%'
                         },
                         inputCls: 'selectfieldinput'
                    },
                                       {
                         xtype: 'datepickerfield',
                         name: 'expirydate',
                         label: DoctorAppointment.util.Constant.getLabel_Expire_Date(),
                         labelWidth: 100,
                         value: new Date(),
                         dateFormat: 'd-m-Y',
                         picker: {
                             slotOrder: ["day","month","year"],
                             yearFrom: new Date().getFullYear(),
                             yearTo: new Date().getFullYear() + 86,
                             height: '100%'
                         },
                         inputCls: 'selectfieldinput'
                    }
               ]
          },
          {
               xtype: 'hiddenfield',
               name: 'blockid',
               value: ''
          },
          {
               xtype: 'hiddenfield',
               name: 'doctorid',
               value: ''
          },
          {
               xtype: 'hiddenfield',
               name: 'establishmentid',
               value: ''
          },          
          {
               xtype: 'button',
               id: 'btnSubmitDoctorOfficeHours',
               ui: 'action',//'confirm',
               text: DoctorAppointment.util.Constant.getLabel_Reg_Form_Submit(),
               height: 40,
               margin: '20 40 0 40'
          },
          {
               
               xtype: 'button',
               id: 'btnDrOfficeHrsDelete',
               text: DoctorAppointment.util.Constant.getLabel_Delete_Office_Hours(),
               ui: 'decline',
               height: 40,
               margin: '20 40 0 40'
          },           
          {
               xtype: 'panel',
               height: 300
          }
          ]
       
     }
     
});

Ext.define("DoctorAppointment.view.doctor.DoctorProfilesAddEdit", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorProfilesAddEdit',
     
     requires: [
        'Ext.field.Text',
        'Ext.form.FieldSet',       
        'Ext.field.Select',
        'Ext.field.Radio',
        'Ext.Label'
        //'Ext.field.Number'
    ],     
     

    config: {
        title: '',
        //layout: 'fit',
        style: 'background:#c0c0c0',
        scrollable: {
          direction: 'vertical',
          directionLock: true
        },
        styleHtmlContent: true,
        
        items: [         
               {
                    xtype: 'label',
                    id: 'label_profie_account_type',
                    cls: 'bgHomeListSkyBlueNormal14',
                    //style: 'font-weight:bold; ',
                    html: DoctorAppointment.util.Constant.getLabel_Account_Type()
                    //margin: '0 10 0 0'
                },
               {
                    xtype: 'fieldset',
                    title: '',
                    margin: '-10 0 -5 0',
                    defaults: {
                        cls: 'with_border'
                    },
                    items: [
                         {
                              xtype: 'selectfield',
                              id: 'doctorProfileAccountType',
                              name: 'groupid',
                              //label: DoctorAppointment.util.Constant.getLabel_Account_Type(),
                              valueField: 'groupid',
                              displayField: 'groupName',
                              placeHolder: DoctorAppointment.util.Constant.getLabel_Account_Type(),
                              inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },                            
                              store: 'GroupsStore'
                         }                              
                    ]
               },          
               {
                xtype: 'fieldset',
                title: '',
                margin: '0 0 -5 0',
                defaults: {
                    cls: 'with_border'
                },
                items: [
                         {
                             xtype: 'emailfield',
                             name: 'email',
                             label: '',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Email()
                         },
                         {
                             xtype: 'passwordfield',
                             itemId: 'id_profile_password',
                             name: 'password',
                             label: '',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Password()
                         },
                         {
                             xtype: 'passwordfield',
                             itemId: 'id_profile_confpassword',
                             label: '',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Conf_Password()
                         }
                       ]
               },
               {
                xtype: 'fieldset',
                title: '',
                defaults: {
                    cls: 'with_border'
                },
                items: [
                         {
                              xtype: 'textfield',
                              name: 'fname',
                              label: '',
                              itemId: 'fnameInputfield',
                              placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name()                              
                         },                      
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              items: [
                                   {
                                        xtype: 'textfield',
                                        cls: 'no_border_separate1',
                                        width: '50%',
                                        name: 'mname',
                                        label: '',
                                        //itemId: 'mname',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_M_Name()                                        
                                   },
                                   {
                                        xtype: 'textfield',
                                        cls: 'no_border_separate2',
                                        width: '50%',
                                        name: 'lname',
                                        label: '',
                                        itemId: 'lnameInputfield',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name()
                                   }
                              ]
                         },                    
                         {
                             xtype: 'selectfield',
                             id: 'doctorProfileSpecialty',
                             name: 'specialty',
                             label: '',
                             valueField: 'specialtyCode',
                             displayField: 'specialtyName',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Specialty(),
                             inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },                              
                             store: 'SpecialtyStore'
                         },
     
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              //cls: 'no_border',
                              items: [
                                   {
                                       xtype: 'radiofield',
                                       id: 'radiofield_sex_male',
                                       cls: 'no_border_separate1',
                                       width: '50%',
                                       name: 'sex',
                                       labelCls: 'sex-label-color',
                                       label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Male(),
                                       value: 'male',
                                       labelWidth: 75
                                       //checked: true
                                   },
                                   {
                                       xtype: 'radiofield',
                                       id: 'radiofield_sex_female',
                                       cls: 'no_border_separate2',
                                       width: '50%',
                                       name: 'sex',
                                       labelCls: 'sex-label-color',
                                       label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Female(),
                                       labelWidth: 75,
                                       value: 'female'
                                   }
                              ]
                         },
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              //cls: 'no_border',
                              items: [
                                   {
                                        xtype: 'textfield',
                                        cls: 'no_border_separate1',
                                        width: '50%',
                                        name: 'mobile',
                                        label: '',
                                        itemId: 'mobileInputfield',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_Mobile()
                                   },
                                   {
                                        xtype: 'textfield', 
                                        id: 'doctorProfileDegree',
                                        cls: 'no_border_separate2',
                                        width: '50%',
                                        name: 'degree',
                                        label: '',
                                        itemId: 'degreeInputfield',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Dr_Registration_Qualification()
                                   }                                   
                              ]
                         },
                         {
                              xtype: 'panel',
                              id: 'doctorProfileImage',
                              hidden: true,
                              layout: 'hbox',
                              width: '100%',
                              style: 'border-bottom: 1px solid #dddddd !important;',
                              items: [
                                   {
                                        xtype: 'image',  // only this change
                                        id: 'drProfileImage',
                                        style: 'border-right: 2px solid #dddddd !important;',
                                        width: 100,         
                                        height: 100,
                                        //border: 1,
                                        src: '',
                                        flex: 1
                                        //name: 'imageurl'
                                   },
                                   {xtype: 'spacer'},
                                   {
                                        xtype: 'button',
                                        id: 'btn_dr_profile_image_upload',
                                        ui: 'round', //'action-round',
                                        text: 'Take Image',
                                        margin: '25 0 0 0',
                                        height: 35,
                                        width: 130,
                                        //margin: 15,
                                        flex: 2
                                   },
                                   {xtype: 'spacer'}
                              ]
                         },                             
                         {
                            xtype: 'hiddenfield',
                            name: 'userid',
                            value: ''
                         },
                         {
                            xtype: 'hiddenfield',
                            name: 'profileid',
                            value: ''
                         },
                         {
                            xtype: 'hiddenfield',
                            name: 'addEstablishmentIdsArrayDoctor',
                            id: 'addEstablishmentIdsArrayDoctor',
                            value: ''
                         },
                         {
                            xtype: 'hiddenfield',
                            name: 'editEstablishmentIdsArrayDoctor',
                            id: 'editEstablishmentIdsArrayDoctor',
                            value: ''
                         },
                         {
                            xtype: 'hiddenfield',
                            name: 'deleteEstablishmentIdsArrayDoctor',
                            id: 'deleteEstablishmentIdsArrayDoctor',
                            value: ''
                         },                          
                         {
                            xtype: 'hiddenfield',
                            name: 'addEstbStaff',
                            id: 'addEstbStaff',
                            value: ''
                         },
                         {
                            xtype: 'hiddenfield',
                            name: 'deleteEstbStaff',
                            id: 'deleteEstbStaff',
                            value: ''
                         },                        
                         ]
                    },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         margin: 5,
                         items: [
                              //{
                              //    xtype: 'label',
                              //    id: 'label_assign_location',
                              //    cls: 'commanTextSkyBlueNormal14',
                              //    style: 'font-weight:bold; ',
                              //    html: DoctorAppointment.util.Constant.getLabel_Assigned_Location()
                              //},                              
                              {
                                   xtype: 'spacer'
                              },
                              //{
                              //     xtype: 'spacer',
                              //     width: 10
                              //},
                              {
                                   xtype: 'button',
                                   id: 'btn_doctor_assign_location',
                                   ui: 'confirm',//'confirm',
                                   hidden: true,
                                   //iconMask: true,
                                   //iconCls: 'locate', //compose //locate
                                   text: DoctorAppointment.util.Constant.getLabel_Add()
                                   //height: 35,
                                   //width: 150
                                   //margin: '20 0 20 0',
                              },
                             {
                                   xtype: 'button',
                                   id: 'btn_staff_assign_location',
                                   ui: 'confirm',//'confirm',
                                   hidden: true,
                                   //iconMask: true,
                                   //iconCls: 'locate', //compose //locate
                                   text: DoctorAppointment.util.Constant.getLabel_Add()
                                   //height: 35,
                                   //width: 150
                                   //margin: '20 0 20 0',
                              }                              
                         ]
                    },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         margin: '10 0 5 0',
                         id: 'label_location_and_days',
                         items: [
                              {
                                  xtype: 'label',
                                  cls: 'bgGrayLabelSkyBlueNormal12',
                                  style: 'font-weight:bold; ',
                                  html: DoctorAppointment.util.Constant.getLabel_Assigned_Location(),
                                  flex: 1
                              },                              
                              //{
                              //     xtype: 'spacer'
                              //},
                              {
                                  xtype: 'label',
                                  cls: 'bgGrayLabelSkyBlueNormal12',
                                  style: 'font-weight:bold; ',
                                  html: DoctorAppointment.util.Constant.getLabel_Adv_Booking_Days(),
                                  flex: 1
                              }
                         ]
                    },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         margin: '10 0 5 0',
                         id: 'label_location',
                         items: [
                              {
                                  xtype: 'label',
                                  id: 'label_location_name',
                                  cls: 'bgGrayLabelSkyBlueNormal12',
                                  style: 'font-weight:bold; ',
                                  html: DoctorAppointment.util.Constant.getLabel_DR() +
                                        DoctorAppointment.util.Constant.getEmptyString() +
                                        DoctorAppointment.util.Constant.getLabel_And() +
                                        DoctorAppointment.util.Constant.getEmptyString() +
                                        DoctorAppointment.util.Constant.getLabel_Assigned_Location(),
                                  flex: 1
                              }
                         ]
                    },                     
                     {
                              xtype: 'list',
                              id: 'doctorAssignedLocations',
                              scrollable: false,
                              disableSelection: true,
                              style: 'background-color:#EEEEEE; ',
                              mode: 'MULTI',
                              ui: 'round',
                              cls: 'doctor-assign-location-list',
                              //cls: 'bg-location-list',
                              //flex: 1,
                              //height: 150,
                              emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                              //itemTpl: ['{establishmentname} '],
                              itemTpl: new Ext.XTemplate(
                                   '<div class="x-list-item addigned-location">',
                                        '<div class="drassignclose" style="background-image: url(resources/images/close_red.png);"></div>',
                                        '<input type="text" class="advbookdays" id="todo_textbox_{establishmentid}" name="title" size="2" value="{advancebookingdays}" maxlength="2" />',
                                        '<h3>',
                                        //<input type="checkbox" id="todo_check_{establishmentid}" name="title1" value="{title}"/>',
                                        //'&nbsp;&nbsp;',
                                        '{establishmentname}',
                                        '&nbsp;&nbsp;',
                                        '</h3>',
                                   '</div>'
                              ),
                              listeners: {
                                   blur: {
                                       fn: function(objTextBox) {
                                        var textBox = Ext.fly(objTextBox.delegatedTarget.id);
                                        var enteredValue = textBox.dom.value;
                                        var match = enteredValue.match(/^([1-9]|[1-8]\d|9[0])$/);
                                        if (!match){
                                             Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(),DoctorAppointment.util.Constant.getDoctor_Profiles_Enter_Correct_Days(),
                                                  function(buttonId) {
                                                     if (buttonId === 'ok') {
                                                            //to reset value and focus in textbox again
                                                            var textBoxCache = Ext.get(objTextBox.delegatedTarget.id);
                                                            textBoxCache.dom.focus();
                                                            var textBoxWithoutCache = Ext.fly(objTextBox.delegatedTarget.id);
                                                            textBoxWithoutCache.dom.value = textBoxCache.dom.defaultValue;
                                                     }
                                                  },
                                                  this
                                              );
                                        }
                                       },
                                       delegate: 'input',
                                       element: 'element'
                                   }
                               },
                               scope: this,
                              //onItemDisclosure: true,
                              store: 'DoctorProfileAssignedLocationStore'
                     },
                     {
                              xtype: 'list',
                              id: 'staffAssignedLocations',
                              scrollable: false,
                              disableSelection: true,
                              style: 'background-color:#EEEEEE; ',
                              mode: 'MULTI',
                              ui: 'round',
                              cls: 'doctor-assign-location-list',
                              //cls: 'bg-location-list',
                              //flex: 1,
                              //height: 150,
                              emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                             itemTpl: [
                                   '<div class="x-list-item addigned-location">',
                                        '<div class="drassignclose" style="background-image: url(resources/images/close_red.png);"></div>',
                                        //'<h3>{doctorname}</h3>',
                                        //'<h4>{establishmentname}</h4>',
                                        '<tpl if="doctorname != \'\'">',
                                             '<h3>' + DoctorAppointment.util.Constant.getLabel_DR() + ' {doctorname}</h3>',
                                         '</tpl>',
                                         '<tpl if="establishmentname != \'\'">',
                                             '<h4>{establishmentname}</h4>',
                                         '</tpl>',                                        
                                   '</div>' 
                              ],
                              //onItemDisclosure: true,
                              store: 'StaffLocationStore'
                     },                      
                    {
                         xtype: 'button',
                         id: 'btn_submit_doctor_profile',
                         ui: 'action',//'confirm',
                         text: DoctorAppointment.util.Constant.getLabel_Reg_Form_Submit(),
                         height: 40,
                         margin: '20 30 0 30'
                    },
                    {
                         
                         xtype: 'button',
                         id: 'btnDrProfileDelete',
                         //hidden: true,
                         //iconMask: true,
                         //iconCls: 'trash',
                         text: DoctorAppointment.util.Constant.getLabel_Delete_Profile(),
                         ui: 'decline',
                         height: 40,
                         margin: '20 30 0 30'
                    },                     
                    {
                        xtype: 'panel',
                        cls: 'no_border',
                        height: 300
                    }

              
        ],
        listeners: [
            {
                fn: 'onBlurConfPassword',
                event: 'blur',
                delegate: '#id_profile_confpassword'
            }
          ]       
    },
    
    onBlurConfPassword: function(text, event ,eOption) {
     var pwd_value = Ext.ComponentQuery.query('#id_profile_password')[0].getValue();
     var conf_pwd_value = text.getValue();
     //console.log(pwd_value + ' ' + conf_pwd_value);
          if(pwd_value != conf_pwd_value){
               Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_pwd_not_match());
          }
    }
});

Ext.define("DoctorAppointment.view.doctor.DoctorRegistrationForm", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorRegistration',
     
    requires: [
        'Ext.field.Text',
        'Ext.form.FieldSet',       
        'Ext.field.Select',
        'Ext.field.Radio',
        'Ext.Label'
        //'Ext.field.Number'
    ],     
     

    config: {
        title: '',
        //layout: 'fit',
        style: 'background:#c0c0c0',
        scrollable: {
          direction: 'vertical',
          directionLock: true
        },
        styleHtmlContent: true,
        
        items: [
               {
                    xtype: 'label',
                    cls: 'bgHomeListSkyBlueNormal14',
                    //style: 'font-weight:bold; ',
                    html: DoctorAppointment.util.Constant.getLabel_Account_Type_Instruction(),
                    margin: '0 10 -10 10'
                },           
               {
                    xtype: 'fieldset',
                    title: '',
                    margin: '0 0 -5 0',
                    defaults: {
                        cls: 'with_border'
                    },
                    items: [
                         {
                              xtype: 'selectfield',
                              name: 'groupid',
                              //label: DoctorAppointment.util.Constant.getLabel_Account_Type(),
                              valueField: 'groupid',
                              displayField: 'groupName',
                              placeHolder: DoctorAppointment.util.Constant.getLabel_Account_Type(),
                              inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                              },                              
                              store: 'GroupsStore',
                              listeners:{
                                   change:function(selectFieldValue, oldValue, newVlaue, eOption){
                                        //console.log(selectFieldValue.getValue());
                                        if(selectFieldValue.getValue() == DoctorAppointment.util.Constant.getACCOUNT_TYPE_DOCTORADMIN()){
                                             //Ext.ComponentQuery.query('#fnameInputfield')[0].setLabel(DoctorAppointment.util.Constant.getLabel_DR());
                                             Ext.ComponentQuery.query('#image_panel_registration')[0].show();
                                             Ext.ComponentQuery.query('#degreeInputfield')[0].show();
                                        }else if(selectFieldValue.getValue() == DoctorAppointment.util.Constant.getACCOUNT_TYPE_STAFFADMIN()){
                                             //Ext.ComponentQuery.query('#fnameInputfield')[0].setLabel('');
                                             Ext.ComponentQuery.query('#image_panel_registration')[0].hide();
                                             Ext.ComponentQuery.query('#degreeInputfield')[0].hide();
                                        }
                                   }
                              }
                         }                              
                    ]
               },          
               {
                xtype: 'fieldset',
                title: '',
                margin: '0 0 -5 0',
                defaults: {
                    cls: 'with_border'
                },
                items: [
                         {
                             xtype: 'emailfield',
                             name: 'email',
                             label: '',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Email()
                         },
                         {
                             xtype: 'passwordfield',
                             itemId: 'id_password',
                             name: 'password',
                             label: '',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Password()
                         },
                         {
                             xtype: 'passwordfield',
                             itemId: 'id_confpassword',
                             label: '',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Conf_Password()
                         }
                       ]
               },
               {
                xtype: 'fieldset',
                title: '',
                margin: '0 0 -5 0',
                defaults: {
                    cls: 'with_border'
                },
                items: [
                         {
                              xtype: 'textfield',
                              //cls: 'no_border_separate1',
                              //width: '50%',
                              name: 'fname',
                              label: '',     //DoctorAppointment.util.Constant.getLabel_DR()
                              //labelWidth: '30px',
                              //labelCls: 'dr-label-color',
                              itemId: 'fnameInputfield',
                              placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_F_Name()                              
                         },                      
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              //cls: 'no_border',
                              items: [
                                   {
                                        xtype: 'textfield',
                                        cls: 'no_border_separate1',
                                        width: '50%',
                                        name: 'mname',
                                        label: '',
                                        //itemId: 'mname',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_M_Name()                                        
                                   },
                                   {
                                        xtype: 'textfield',
                                        cls: 'no_border_separate2',
                                        width: '50%',
                                        name: 'lname',
                                        label: '',
                                        itemId: 'lnameInputfield',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_L_Name()
                                   }
                              ]
                         },
                         {
                             xtype: 'selectfield',
                             name: 'specialty',
                             label: '',
                             valueField: 'specialtyCode',
                             displayField: 'specialtyName',
                             placeHolder: DoctorAppointment.util.Constant.getLabel_Specialty(),
                             inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },                              
                             store: 'SpecialtyStore'
                         },
     
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              //cls: 'no_border',
                              items: [
                                   {
                                       xtype: 'radiofield',
                                       cls: 'no_border_separate1',
                                       width: '50%',
                                       name: 'sex',
                                       labelCls: 'sex-label-color',
                                       label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Male(),
                                       value: 'male',
                                       labelWidth: 75
                                       //checked: true
                                   },
                                   {
                                       xtype: 'radiofield',
                                       cls: 'no_border_separate2',
                                       width: '50%',
                                       name: 'sex',
                                       labelCls: 'sex-label-color',
                                       label: DoctorAppointment.util.Constant.getLabel_Reg_Form_Female(),
                                       labelWidth: 75,
                                       value: 'female'
                                   }
                              ]
                         },
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              //cls: 'no_border',
                              items: [
                                   {
                                        xtype: 'textfield',
                                        cls: 'no_border_separate1',
                                        width: '50%',
                                        name: 'mobile',
                                        label: '',
                                        itemId: 'mobileInputfield',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Reg_Form_Mobile()
                                   },
                                   {
                                        xtype: 'textfield', //numberfield
                                        cls: 'no_border_separate2',
                                        width: '50%',
                                        name: 'degree',
                                        label: '',
                                        itemId: 'degreeInputfield',
                                        placeHolder: DoctorAppointment.util.Constant.getLabel_Dr_Registration_Qualification()
                                   }                                   
                              ]
                         },
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              width: '100%',
                              id: 'image_panel_registration',
                              hidden: true,
                              //cls: 'with_border',
                              style: 'border-bottom: 1px solid #dddddd !important;',
                              items: [
                                   {
                                        xtype: 'image',  // only this change
                                        id: 'drRegisterImage',
                                        style: 'border-right: 2px solid #dddddd !important;',
                                        width: 100,         
                                        height: 100,
                                        //border: 1,
                                        src: '',//'http://www.sencha.com/assets/images/sencha-avatar-64x64.png',
                                        flex: 1
                                        //name: 'imageurl'
                                   },
                                   {xtype: 'spacer'},
                                   {
                                        xtype: 'button',
                                        id: 'btn_dr_image_upload',
                                        ui: 'round', //'action-round',
                                        text: 'Take Image',
                                        margin: '25 0 0 0',
                                        height: 35,
                                        width: 130,
                                        //margin: 15,
                                        flex: 2
                                   },
                                   {xtype: 'spacer'}
                              ]
                         },                             
                         {
                              xtype: 'hiddenfield',
                              name: 'imageurl',
                              value: ''
                         } 
                         ]
                    },                     
                    {
                         xtype: 'fieldset',
                         title: '',
                         margin: '0 0 -5 0',
                         defaults: {
                             cls: 'with_border'
                         },
                         items: [
                             {
                                  xtype: 'textfield',
                                  //cls: 'no_border_bottom',
                                  //width: '90%',
                                  name: 'establishmentname',
                                  label: '',
                                  itemId: 'establishmentname',
                                  placeHolder: DoctorAppointment.util.Constant.getLabel_Establishment_Name()
                             },                              
                             {
                                 xtype: 'selectfield',
                                 id: 'stateByDoctor',
                                 name: 'state',
                                 label: '',
                                 valueField: 'stateID',
                                 displayField: 'name',
                                 placeHolder: DoctorAppointment.util.Constant.getLabel_State(),
                                 inputCls: 'selectfieldinput',
                                 usePicker:true,
                                 defaultPhonePickerConfig:{
                                   centered:true,
                                   height:'100%'
                                  },                                  
                                 store: 'StateStore'
                             },
                             {
                                 xtype: 'selectfield',
                                 //id: 'cityByPatient',
                                 name: 'city',
                                 label: '',
                                 valueField: 'cityId',
                                 displayField: 'cityName',
                                 placeHolder: DoctorAppointment.util.Constant.getLabel_City(),
                                 inputCls: 'selectfieldinput',
                                 usePicker:true,
                                 defaultPhonePickerConfig:{
                                   centered:true,
                                   height:'100%'
                                  }, 
                                 store: 'CityStore'
                             },
                             {
                                  xtype: 'textfield',
                                  name: 'area',
                                  label: '',
                                  itemId: 'area',
                                  placeHolder: DoctorAppointment.util.Constant.getLabel_Area_Optional()
                             },                    
                             {
                                  xtype: 'textfield',
                                  //cls: 'no_border_bottom',
                                  //width: '90%',
                                  name: 'addressline1',
                                  label: '',
                                  itemId: 'addressline1',
                                  placeHolder: DoctorAppointment.util.Constant.getLabel_Dr_Registration_Address_Line1()
                             },
                             {
                                  xtype: 'textfield',
                                  //cls: 'no_border_bottom',
                                  //width: '90%',
                                  name: 'addressline2',
                                  label: '',
                                  itemId: 'addressline2',
                                  style: 'border-bottom: 1px solid #dddddd !important;',
                                  placeHolder: DoctorAppointment.util.Constant.getLabel_Dr_Registration_Address_Line2()
                             },
                              {
                                   xtype: 'panel',
                                   layout: 'hbox',
                                   width: '100%',
                                   items: [
                                        {
                                             xtype: 'textfield',
                                             cls: 'no_border_separate1',
                                             width: '50%',
                                             name: 'phone',
                                             label: '',
                                             itemId: 'phoneInputfield',
                                             placeHolder: DoctorAppointment.util.Constant.getLabel_Phone_Work()
                                        },
                                        {
                                             xtype: 'textfield', //numberfield
                                             cls: 'no_border_separate2',
                                             width: '50%',
                                             name: 'zip',
                                             label: '',
                                             itemId: 'zipInputfield',
                                             placeHolder: DoctorAppointment.util.Constant.getLabel_zip()
                                        }
                                   ]
                              }                            
                         ]
                    },                    
                    {
                         xtype: 'button',
                         id: 'btn_submit_doctor_registration',
                         ui: 'action',//'confirm',
                         text: DoctorAppointment.util.Constant.getLabel_Reg_Form_Submit(),
                         height: 40,
                         margin: '20 30 0 30'
                    },                   
                    {
                        xtype: 'panel',
                        cls: 'no_border',
                        height: 200
                    }

              
        ],
        listeners: [
            {
                fn: 'onBlurConfPassword',
                event: 'blur',
                delegate: '#id_confpassword'
            }
          ]       
    },
    
    onBlurConfPassword: function(text, event ,eOption) {
     var pwd_value = Ext.ComponentQuery.query('#id_password')[0].getValue();
     var conf_pwd_value = text.getValue();
     //console.log(pwd_value + ' ' + conf_pwd_value);
          if(pwd_value != conf_pwd_value){
               Ext.Msg.alert(DoctorAppointment.util.Constant.getLabel_Error(), DoctorAppointment.util.Constant.getMsg_pwd_not_match());
          }
    }
});

Ext.define('DoctorAppointment.view.doctor.DoctorHome', {

    extend: 'Ext.NavigationView',
    xtype: 'doctorContainer',
    id: 'id_doctor',
    
    requires: [
        'Ext.dataview.List',
        'Ext.Label'
    ],

    config: {

        title: DoctorAppointment.util.Constant.getLabel_Doctor(),
        iconCls: 'add',

        autoDestroy: false,
        
        navigationBar: {
            //ui: 'sencha',
            items: [
                {
                    xtype: 'button',
                    id: 'btnDoctorHome',
                    //text: DoctorAppointment.util.Constant.getLabel_Logout(),
                    iconMask: true,
                    iconCls: 'home',
                    //ui: 'sencha',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                },
                {
                    xtype: 'spacer',
                    width: 20
                },
                {
                    xtype: 'button',
                    id: 'logoutButton',
                    //text: DoctorAppointment.util.Constant.getLabel_Logout(),
                    iconMask: true,
                    iconCls: 'action',
                    //ui: 'sencha',
                    align: 'right',
                    hidden: true,
                    hideAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeOut',
                        duration: 200
                    },
                    showAnimation: Ext.os.is.Android ? false : {
                        type: 'fadeIn',
                        duration: 200
                    }
                }
            ]
        },        

          items: [{
                //title : DoctorAppointment.util.Constant.getLabel_Dr_Appointment(),
                title : '<img class="a2zdoc-logo" src="resources/images/logoa2zdoc.png"  ">',
                style: 'background-color: white',
                layout: 'fit',
                
                items: [
                    {
                    xtype: 'container',
                    layout: 'fit',
                    styleHtmlContent: true,
                    
                    items: [
                        {
                              xtype: 'doctorLogin',
                              id: 'doctorLogin_id',
                              hidden: true
                        },
                        {
                              xtype: 'container',
                              layout: 'vbox',
                              //styleHtmlContent: true,
                              items: [
                                    {
                                        xtype: 'label',
                                        id: 'approval_status',
                                        hidden: true,
                                        cls: '',
                                        html: '',
                                        height: 20
                                    },                        
                                    {
                                        xtype: 'list',
                                        id: 'doctorHomeList',
                                        hidden: true,
                                        //disableSelection: true,
                                        ui: 'round',                        
                                        emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                                        itemTpl: ['{title} '],
                                        onItemDisclosure: true,
                                        store: 'DoctorHomeListStore',
                                        flex: 2
                                    }
                              ]
                        }
                    ]
                }
                ]
          }]
    }
});


Ext.define("DoctorAppointment.view.doctor.DoctorMoveAppointmentOverlay", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorMoveAppointmentOverlay',
     
    config: {
     layout: {
             pack: 'start',
             type: 'vbox'
         },
     
        scrollable: false,
        modal: true,
        hideOnMaskTap: true,
        top:'5%',
        left:'5%',
        right:'5%',
        bottom:'5%',
        height:'60%',
        width: '90%',
        
          items: [
          {
               xtype: 'toolbar',
               docked: 'top',
               title: '<center><font size="3" color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Move_TimeSlot() + '</font></center>',
               height: 40,
               width: '100%',
               items: [                
               {
                    xtype: 'button',
                    id: 'btn_doctor_move_appointment_cancel',
                    height: 20,
                    top: 2,
                    left: 1,
                    text: 'Cancel'
                    
               },
               {
                    xtype: 'button',
                    id: 'btn-doctor_move_appointment_done',
                    height: 20,
                    top: 2,
                    right: 1,
                    text: 'Done'
               }
               ]
          },
          {
               xtype: 'spacer',
               style: 'background-color:#EEEEEE;',
               height: 15
          },
          {
               xtype: 'container',
               layout: 'hbox',
               style: 'background-color:#EEEEEE',
               left: 20,
               items: [
                    {
                         xtype: 'label',
                         cls: 'commanTextSkyBlueNormal14',
                         style: 'background-color:#EEEEEE;font-weight:bold;margin-top:3px;',
                         html: 'Selected Time Slot:'
                         
                    },
                    {
                         xtype: 'spacer',
                         style: 'background-color:#EEEEEE;',
                         width: 10
                    },
                    {
                         xtype: 'label',
                         id: 'lblSelectedTimeSlot',
                         style: 'background-color:#EEEEEE;font-weight:bold;',
                         html: ''
                    }
               ]
              
          },
          {
               xtype: 'spacer',
               style: 'background-color:#EEEEEE;',
               height: 20
          },
          {
               xtype: 'list',
               id: 'doctorMoveAppointmentList',
               ui: 'round',
               cls: 'doctor-assign-location-list',
               flex: 1,
               emptyText: DoctorAppointment.util.Constant.getEmptyString(),
               itemTpl: ['{expectedtime}'],
               store: 'DoctorBookedAppointmentsStore'
          }],
          listeners: [{
                         fn: 'onCancel',
                         event: 'tap',
                         delegate: '#btn_doctor_move_appointment_cancel'
                    }]
    },
    onCancel: function(btn, evt ,eOption) {
          this.hide();
     }
});     

Ext.define("DoctorAppointment.view.doctor.StaffAssignLocationOverlay", {
     extend: 'Ext.form.Panel',
     xtype: 'staffAssignLocationOverlay',
     
    requires: [
        //'Ext.navigation.View',
        //'Ext.navigation.Bar',        
        //'Ext.dataview.List'
    ],
    config: {
        modal: true,
        //styleHtmlContent: true,
        hideOnMaskTap: true,
        top:'5%',
        left:'5%',
        right:'5%',
        bottom:'5%',
	height:'60%',
        width: '90%',
        //layout: 'fit',
        
            items: [
               {
                 xtype: 'toolbar',
                 docked: 'top',
                 title: '<center><font size="3" color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Assign_Location() + '</font></center>'   
               },               
            {
                 xtype: 'container',
                 //title: DoctorAppointment.util.Constant.getDoctor_Profiles_Tab_Add_Profile(),
                 styleHtmlContent: true,
                 //style: 'background:#EEEEEE',
                 padding: 0,
                 layout: {
                     pack: 'start',
                     type: 'vbox'
                },
                 items: [
                       {
                            xtype: 'label',
                            cls: 'commanTextSkyBlueNormal14',
                            style: 'font-weight:bold; ',
                            html: DoctorAppointment.util.Constant.getLabel_Select_Doctor(),
                            //margin: '15 0 -10 0',
                       },                     
                      {
                         xtype: 'fieldset',
                         title: '',
                         margin: '0 0 20 0',
                         items: [
                           {
                                 xtype: 'selectfield',
                                 id: 'selectfield_doctor_assign_location',
                                 name: 'doctorid',
                                 valueField: 'profileid',
                                 displayField: 'name',
                                 placeHolder:  DoctorAppointment.util.Constant.getLabel_Form_Textbox_Dr_Name(),
                                 inputCls: 'selectfieldinput',
                                 usePicker:true,
                                 defaultPhonePickerConfig:{
                                   centered:true,
                                   height:'100%'
                                  },                                  
                                 store: 'DoctorProfilesStore'
                           }                           
                         ]
                     },                    
                    {
                        xtype: 'label',
                        cls: 'commanTextSkyBlueNormal14',
                        style: 'font-weight:bold; ',
                        html: DoctorAppointment.util.Constant.getLabel_Select_Location(),
                        //margin: '0 0 0 0',
                    },                      
                    {
                        xtype: 'list',
                        id: 'staffAssignLocationsMultiselectList',
                        style: 'background-color:#EEEEEE; ',
                        mode: 'MULTI',
                        ui: 'round',
                        cls: 'doctor-assign-location-list',
                        scrollable: false,
                        //cls: 'bg-location-list',
                        //flex: 1,                      
                        emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                        itemTpl: ['{establishmentname} '], // establishmentname
                        //itemTpl:[
                        // '<div class="x-list-item profile-list">',
                        //      '<div class="line-one">{establishmentname}</div>',
                        // '</div>'
                        // ],
                        //onItemDisclosure: false,
                        store: 'DoctorAssignedLocationListStore' //DoctorLocationsStore
                    },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         width: '100%',
                         //cls: 'no_border',
                         items: [
                                   {
                                     xtype: 'spacer',
                                     width: '5%'
                                   },
                                   {
                                        xtype: 'button',
                                        id: 'btn_staff_assign_location_done',
                                        ui: 'action',//'confirm',
                                        text: DoctorAppointment.util.Constant.getLabel_DONE(),
                                        height: 35,
                                        width: '43%',
                                        margin: '25 0 0 0'
                                   },
                                   {
                                     xtype: 'spacer',
                                     width: '4%'
                                   },
                                   {
                                        xtype: 'button',
                                        itemId: 'btn_staff_assign_location_later',
                                        ui: 'decline',//'decline',
                                        text: DoctorAppointment.util.Constant.getLabel_Assign_Later(),
                                        height: 35,
                                        width: '43%',
                                        margin: '25 0 0 0'
                                   },
                                   {
                                     xtype: 'spacer',
                                     width: '5%'
                                   }                                   
                         ]
                    },
                    {
                        xtype: 'panel',
                        height: 300
                    }
                ]
            }
          ],
          listeners: [
              {
                  fn: 'onStaffAssignLocationLater',
                  event: 'tap',
                  delegate: '#btn_staff_assign_location_later'
            }
          ] 
    },
     onStaffAssignLocationLater: function(btn, evt ,eOption) {
          this.hide();
     }
});     

Ext.define("DoctorAppointment.view.doctor.DoctorLocationsAddEdit", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorLocationsAddEdit',
     
    requires: [
        'Ext.field.Text',
        'Ext.form.FieldSet',       
        'Ext.field.Select',
        //'Ext.field.Number'
    ],     
     

    config: {
        title: '',
        //layout: 'fit',
        style: 'background:#c0c0c0',
        //scrollable: {
        //  direction: 'vertical',
        //  directionLock: true
        //},
        styleHtmlContent: true,
        
        items: [
               //{
               //     xtype: 'panel',
               //     layout: 'hbox',
               //     items: [
               //          {
               //               xtype: 'spacer'
               //          },
               //          {
               //               xtype: 'button',
               //               id: 'btnDrLocationDelete',
               //               hidden: true,
               //               iconMask: true,
               //               iconCls: 'trash',
               //               //text: DoctorAppointment.util.Constant.getLabel_HOME(),
               //               align: 'right',
               //               ui: 'decline'
               //          }
               //     ]
               //},           
               {
                 xtype: 'fieldset',
                 title: '',
                 defaults: {
                     cls: 'with_border'
                 },
                 items: [                   
                     {
                          xtype: 'textfield',
                          //cls: 'no_border_bottom',
                          //width: '90%',
                          name: 'establishmentname',
                          label: '',
                          //itemId: 'establishmentname',
                          placeHolder: DoctorAppointment.util.Constant.getLabel_Establishment_Name()
                     },                              
                     {
                         xtype: 'selectfield',
                         id: 'stateByDoctorLocation',
                         name: 'state',
                         label: '',
                         valueField: 'stateID',
                         displayField: 'name',
                         placeHolder: DoctorAppointment.util.Constant.getLabel_State(),
                         inputCls: 'selectfieldinput',
                         //value: 'Bihar',
                         usePicker:true,
                         defaultPhonePickerConfig:{
                           centered:true,
                           height:'100%'
                          },                          
                         store: 'StateStore'
                     },
                     {
                         xtype: 'selectfield',
                         id: 'cityByDoctorLocation',
                         name: 'city',
                         label: '',
                         valueField: 'cityId',
                         displayField: 'cityName',
                         placeHolder: DoctorAppointment.util.Constant.getLabel_City(),
                         inputCls: 'selectfieldinput',
                         usePicker:true,
                         defaultPhonePickerConfig:{
                           centered:true,
                           height:'100%'
                          },                          
                         store: 'CityStore'
                     },
                     {
                          xtype: 'textfield',
                          name: 'area',
                          label: '',
                          //itemId: 'area',
                          placeHolder: DoctorAppointment.util.Constant.getLabel_Area_Optional()
                     },                    
                     {
                          xtype: 'textfield',
                          //cls: 'no_border_bottom',
                          //width: '90%',
                          name: 'addressline1',
                          label: '',
                          //itemId: 'addressline1',
                          placeHolder: DoctorAppointment.util.Constant.getLabel_Dr_Registration_Address_Line1()
                     },
                     {
                          xtype: 'textfield',
                          //cls: 'no_border_bottom',
                          //width: '90%',
                          name: 'addressline2',
                          label: '',
                          //itemId: 'addressline2',
                          style: 'border-bottom: 1px solid #dddddd !important;',
                          placeHolder: DoctorAppointment.util.Constant.getLabel_Dr_Registration_Address_Line2()
                     },
                      {
                           xtype: 'panel',
                           layout: 'hbox',
                           width: '100%',
                           //cls: 'no_border',
                           items: [
                                {
                                     xtype: 'textfield',
                                     cls: 'no_border_separate1',
                                     width: '50%',
                                     name: 'phone',
                                     label: '',
                                     //itemId: 'phoneInputfield',
                                     placeHolder: DoctorAppointment.util.Constant.getLabel_Phone_Work()
                                },
                                {
                                     xtype: 'textfield', //numberfield
                                     cls: 'no_border_separate2',
                                     width: '50%',
                                     name: 'zip',
                                     label: '',
                                     //itemId: 'zipInputfield',
                                     placeHolder: DoctorAppointment.util.Constant.getLabel_zip()
                                }
                           ]
                      },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         width: '100%',
                         //cls: 'no_border',
                         style: 'border-bottom: 1px solid #dddddd !important;',                         
                         items: [
                              {
                                  xtype: 'radiofield',
                                  cls: 'no_border_separate1',
                                  width: '50%',
                                  name: 'estisactive',
                                  labelCls: 'sex-label-color',
                                  label: DoctorAppointment.util.Constant.getDoctor_location_active(),
                                  //value: 'active',
                                  itemId: 'radio_dr_location_active',
                                  labelWidth: 75,
                                  checked: true
                              },
                              {
                                  xtype: 'radiofield',
                                  cls: 'no_border_separate2',
                                  width: '50%',
                                  name: 'estisactive',
                                  labelCls: 'sex-label-color',
                                  label: DoctorAppointment.util.Constant.getDoctor_location_inactive(),
                                  labelWidth: 75,
                                  itemId: 'radio_dr_location_inactive',
                                  //value: 'inactive'
                              }
                         ]
                    },
                       {
                            xtype: 'hiddenfield',
                            name: 'doctorid',
                            value: ''
                       },
                      {
                            xtype: 'hiddenfield',
                            name: 'establishmentid',
                            value: ''
                       },
                      {
                            xtype: 'hiddenfield',
                            name: 'areaid',
                            value: ''
                       }                            
                 ]
            },
          {
               xtype: 'panel',
               //layout: 'vbox',
               //width: '100%',
               cls: 'no_border',
               //style: 'border-bottom: 2px solid #dddddd !important;',
               margin: 5,
               items: [
                         {
                             xtype: 'label',
                             id: 'label_assign_to',
                             cls: 'commanTextSkyBlueNormal14',
                             style: 'font-weight:bold; ',
                             html: DoctorAppointment.util.Constant.getLabel_Assigned_To(),
                             margin: '20 0 0 0',
                         },                      
                         {
                             xtype: 'list',
                             id: 'profileAssignedList',
                             ui: 'normal',
                             scrollable: false,
                             disableSelection: true,
                             //cls: 'bg-location-list',
                             //flex: 1,                      
                             emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                             //itemTpl: ['{doctorname} - {staffname}'],
                             itemTpl:[
                              '<div class="x-list-item profile-list">',
                                             '<tpl if="doctorname != \'\'">',
                                                  '<div class="line-one">' + DoctorAppointment.util.Constant.getLabel_DR() + ' {doctorname}</div>',
                                              '</tpl>',
                                              '<tpl if="staffname != \'\'">',
                                                  '<div class="line-two">' + DoctorAppointment.util.Constant.getLabel_Staff() + ' - {staffname}</div>',
                                              '</tpl>',
                              '</div>'
                              ],
                             onItemDisclosure: false,
                             store: 'StaffProfileAssignedLocationStore'
                         }                        
                    ]
               },            
               {
                    xtype: 'button',
                    id: 'btn_add_doctor_location',
                    ui: 'action',//'confirm',
                    text: DoctorAppointment.util.Constant.getLabel_Reg_Form_Submit(),
                    height: 40,
                    margin: '20 30 0 30'
               },
               {
                    
                    xtype: 'button',
                    id: 'btnDrLocationDelete',
                    //hidden: true,
                    //iconMask: true,
                    //iconCls: 'trash',
                    text: DoctorAppointment.util.Constant.getLabel_Delete_Location(),
                    ui: 'decline',
                    height: 40,
                    margin: '20 30 0 30'
               },               
               {
                   xtype: 'panel',
                   cls: 'no_border',
                   height: 200
               }
        ]
    }
});

Ext.define("DoctorAppointment.view.doctor.DoctorAppointmentOrToken", {
     extend: 'Ext.Container',
     xtype: 'doctorAppointmentOrToken',
     
    config: {
        title: '',
        layout: {
             pack: 'start',
             type: 'vbox'
         },
        padding: 0,
        styleHtmlContent: true,
        fullscreen: true,
        style: 'background:#EEEEEE',
        items: [
          {
               xtype: 'fieldset',
               layout: 'vbox',
               margin: '15 15 5 15',
               items: [
               {
                   xtype: 'selectfield',
                   id: 'selectDoctorForToken',
                   label: DoctorAppointment.util.Constant.getLabel_DR(),
                   labelWidth: 65,
                   valueField: 'profileid',
                   displayField: 'name',
                   placeHolder:  DoctorAppointment.util.Constant.getLabel_Form_Textbox_Dr_Name(),
                   inputCls: 'selectfieldinput',
                   usePicker:true,
                   defaultPhonePickerConfig:{
                      centered:true,
                      height:'100%'
                   },                                             
                   store: 'DoctorStoreForAppointmentOrToken'
               },
               {
                    xtype: 'selectfield',
                    id: 'selectLocationForToken',
                    label: DoctorAppointment.util.Constant.getLabel_Location(),
                    labelWidth: 65,
                    valueField: 'establishmentid',
                    displayField: 'establishmentname',
                    placeHolder: DoctorAppointment.util.Constant.getDoctor_Location(),
                    inputCls: 'selectfieldinput',
                    usePicker:true,
                    defaultPhonePickerConfig:{
                      centered:true,
                      height:'100%'
                     },                                
                    store: 'DoctorAssignedLocationStoreForAppointmentOrToken'
               },
               {
                    xtype: 'selectfield',
                    id: 'selectSlotForToken',
                    label: DoctorAppointment.util.Constant.getLabel_Time(),
                    labelWidth: 65,
                    valueField: 'blockid',
                    displayField: 'timeSlotSelctDisplay',
                    placeHolder: 'Time Slot',
                    inputCls: 'selectfieldinput',
                    usePicker:true,
                    defaultPhonePickerConfig:{
                      centered:true,
                      height:'100%'
                     },
                    store: 'DoctorAppointmentTimeSlotStore'
               },
               {
                    xtype: 'datepickerfield',
                    id: 'selectDateForToken',
                    label: 'Date',
                    labelWidth: 65,
                    value: new Date(),
                    dateFormat: 'd-m-Y',
                    picker: {
                        slotOrder: ["day","month","year"],
                        yearFrom: new Date().getFullYear(),
                        yearTo: new Date().getFullYear() + 20,
                        height: '100%'
                    },
                    inputCls: 'selectfieldinput'
               }]
          },
          {
               xtype: 'panel',
               layout: 'hbox',
               width: '100%',
               margin: '5% 0% 0% 0%',
               items: [
                    {
                         xtype: 'spacer'
                    },                    
                    {
                         xtype: 'button',
                         id: 'btnDrAppointmentOrTokenListing',
                         text: DoctorAppointment.util.Constant.getLabel_Show_Appt_Token_List(),
                         height: 35,
                         ui: 'confirm'
                    },
                    {
                         xtype: 'spacer'
                    }                    
                    
               ]
          }
        ]
    }
     
});

Ext.define("DoctorAppointment.view.doctor.DoctorAppointmentOrTokenListing", {
     extend: 'Ext.Container',
     xtype: 'doctorAppointmentOrTokenListing',
     
    config: {
        title: '',
        layout: {
             pack: 'start',
             type: 'vbox'
         },
        padding: 0,
        styleHtmlContent: true,
        fullscreen: true,
        style: 'background:#EEEEEE',
        items: [
          {
               xtype: 'panel',
               margin: '10 10 5 10',
               layout: 'hbox',
               items: [
                    {
                         xtype: 'button',
                         id: 'btnDrAppointmentOrTokenAdd',
                         padding: '8 10 8 10',
                         ui: 'confirm'
                    },
                    {
                         xtype: 'spacer'
                    },
                    {
                         xtype: 'button',
                         id: 'btnDrAppointmentOrTokenDelayAdd',
                         padding: '8 10 8 10',
                         text: 'Add Delay',
                         ui: 'confirm'
                    },
                    {
                         xtype: 'spacer'
                    },
                    {
                         xtype: 'button',
                         id: 'btnDrAppointmentOrTokenRefresh',
                         padding: '8 10 8 10',
                         iconMask: true,
                         iconCls: 'refresh',
                         ui: 'action'
                    }
                    
               ]
          },
          {
               xtype: 'panel',
               margin: '10 10 -10 10',
               layout: 'hbox',
               items: [
                    {
                         xtype: 'spacer'
                    },
                    {
                         xtype: 'label',
                         cls: 'checkboxTextStyle',
                         html: 'B: Begin, P: Present, D: Done, H: Hold, C: Cancel'
                    },
                    {
                         xtype: 'spacer'
                    }
               ]
          },
          {
               xtype: 'list',
               id: 'doctorAppointmentOrTokenList',
               ui: 'round',
               margin: '10 0 0 0',
               cls: 'appointmen-token-list',
               flex: 1,
               disableSelection: true,
               emptyText: DoctorAppointment.util.Constant.getEmptyString(),
               itemTpl:
                    new Ext.XTemplate(
                    '<tpl if="status == \'' + DoctorAppointment.util.Constant.getPatient_Status_Done() + '\'">',
                         '<div class="div-table appointment" style="background-color:#BFDFE7">',
                    '<tpl else>',
                         '<div class="div-table appointment">',
                    '</tpl>',
                         '<div class="div-table-col1">',
                              '<tpl if="tokenlimit != \'\' && tokenlimit != null">',
                                   '<label class="appointmentFontStyle">{tokenno}</label>',
                              '<tpl else>',
                                   '<label class="appointmentFontStyle">{expectedtime}</label>',
                              '</tpl>',
                         '</div>',
                         '<tpl if="patientid != \'\' && bookedtime != null">',
                              '<div class="div-table-col-seprator">&nbsp;</div>',
                              '<div class="div-table-col2">',
                                   '<a id="lnkName" class="appointmentFontStyle">{name}</a><br>',
                                   '<label class="appointmentFontSubStyle">Book: {bookedtime}</label><br>',
                                   //'<label class="appointmentFontSubStyle">Expt: {expectedtime}</label><br>',
                                   
                              '</div>',
                              '<div class="div-table-col-seprator">&nbsp;</div>',
                              '<div class="div-table-col3">',
                                   '<table style="margin:0px;padding:0px;" border="0"><tr>',
                                   '<td style="width:35px;padding:0px;" align="center">',
                                        '<tpl if="isDelayToken != \'false\'">',
                                             '<label class="checkboxTextStyle" for="chkBegin">B</label><br>',
                                        '<tpl else>',
                                             '<label class="checkboxTextStyle" for="chkPresent">P</label>',
                                        '</tpl>',
                                   '</td><td style="width:35px;padding:0px;" align="center">',
                                        '<label class="checkboxTextStyle" for="chkDone">D</label>',
                                   '</td>',
                                   '<tpl if="isDelayToken != \'true\'">',
                                        '<td style="width:35px;padding:0px;" align="center">',
                                             '<label class="checkboxTextStyle" for="chkHold">H</label>',
                                        '</td>',
                                   '</tpl>',
                                   '<td style="width:35px;padding:0px;" align="center">',
                                        '<label class="checkboxTextStyle" for="chkCancel">C</label>',
                                   '</td></tr>',
                                   '<tr><td style="width:35px;height:3px;padding:0px;" colspan="4"></td></tr>',
                                   '<tr><td style="width:35px;padding:0px;" align="center">',
                                        '<tpl if="isDelayToken != \'false\'">',
                                             '<tpl if="status == \''+ DoctorAppointment.util.Constant.getPatient_Status_Begin() + '\' || status == \''+ DoctorAppointment.util.Constant.getPatient_Status_Done() +'\'">',
                                                  '<input class="checkBoxStyle" type="checkbox" id="chkBegin" checked></input>',
                                             '<tpl else>',
                                                  '<input class="checkBoxStyle" type="checkbox" id="chkBegin"></input>',
                                             '</tpl>',
                                        '<tpl else>',    
                                             '<tpl if="status == \'' + DoctorAppointment.util.Constant.getPatient_Status_Present() + '\' || status == \'' + DoctorAppointment.util.Constant.getPatient_Status_Done() + '\'">',
                                                  '<input class="checkBoxStyle" type="checkbox" id="chkPresent" checked></input>',
                                             '<tpl else>',    
                                                  '<input class="checkBoxStyle" type="checkbox" id="chkPresent"></input>',
                                             '</tpl>',
                                        '</tpl>',
                                   '</td><td style="width:35px;padding:0px;" align="center">',
                                        '<tpl if="status == \'' + DoctorAppointment.util.Constant.getPatient_Status_Done() + '\'">',
                                             '<input class="checkBoxStyle" type="checkbox" id="chkDone" checked></input>',
                                        '<tpl else>', 
                                             '<input class="checkBoxStyle" type="checkbox" id="chkDone"></input>',
                                        '</tpl>',     
                                   '</td>',
                                   '<tpl if="isDelayToken != \'true\'">',
                                        '<td style="width:35px;padding:0px;" align="center">',
                                             
                                             '<tpl if="status == \'' + DoctorAppointment.util.Constant.getPatient_Status_Hold() + '\'">',
                                                  '<input class="checkBoxStyle" type="checkbox" id="chkHold" checked></input>',
                                             '<tpl else>',
                                                  '<input class="checkBoxStyle" type="checkbox" id="chkHold"></input>',
                                             '</tpl>',
                                        '</td>',
                                   '</tpl>',
                                   '<td style="width:35px;padding:0px;" align="center">',
                                        '<tpl if="status == \'' + DoctorAppointment.util.Constant.getPatient_Status_Cancel() + '\'">',
                                             '<input class="checkBoxStyle" type="checkbox" id="chkCancel" checked></input>',
                                        '<tpl else>',
                                             '<input class="checkBoxStyle" type="checkbox" id="chkCancel"></input>',
                                        '</tpl>',
                                   '</td></tr></table>',
                              '</div>',
                         '<tpl else>',
                              '<div class="div-table-col-seprator">&nbsp;</div>',
                              '<div class="div-table-col2">',
                                   '<label class="appointmentFontStyle" width="100px">Available</label>',
                              '</div>',
                         '</tpl>',
                    '</div>'),
               scope: this,
               store: 'DoctorBookedAppointmentsStore'
               
          }
        ]
    }
     
});

Ext.define("DoctorAppointment.view.doctor.DoctorBlockAvailability", {
     extend: 'Ext.Container',
     xtype: 'doctorBlockAvailability',
     
    config: {
        title: '',
          layout: {
             pack: 'start',
             type: 'vbox'
         },
        padding: 0,
        styleHtmlContent: true,
        fullscreen: true,
        style: 'background:#EEEEEE',
        items: [
                    {
                         xtype: 'panel',
                         margin: '2% 2% 2% 2%',
                         items: [
                              {
                                 xtype: 'label',
                                 cls: 'commanTextSkyBlueNormal14',
                                 style: 'font-weight:bold; ',
                                 html: DoctorAppointment.util.Constant.getLabel_Select_Doctor(),
                                 margin: '15 0 -10 10'
                              },
                              {
                                   xtype: 'fieldset',
                                   margin: '15 10 5 10',
                                   items: [
                                           {
                                                 xtype: 'selectfield',
                                                 id: 'selectDoctorForBlockAvailability',
                                                 label: '',
                                                 valueField: 'profileid',
                                                 displayField: 'name',
                                                 placeHolder:  DoctorAppointment.util.Constant.getLabel_Form_Textbox_Dr_Name(),
                                                 inputCls: 'selectfieldinput',
                                                  usePicker:true,
                                                  defaultPhonePickerConfig:{
                                                    centered:true,
                                                    height:'100%'
                                                   },                                                  
                                                 store: 'DoctorStoreForBlockAvailability'
                                           }
                                      ]
                              },
                              {
                                 xtype: 'label',
                                 cls: 'commanTextSkyBlueNormal14',
                                 style: 'font-weight:bold; ',
                                 html: DoctorAppointment.util.Constant.getLabel_Select_Location(),
                                 margin: '20 0 -10 10'
                              },
                              {
                                xtype: 'fieldset',
                                margin: '15 10 5 10',
                                items: [
                              {
                                    xtype: 'selectfield',
                                    id: 'selectLocationForBlockAvailability',
                                    label: '',
                                    valueField: 'establishmentid',
                                    displayField: 'establishmentname',
                                    placeHolder: DoctorAppointment.util.Constant.getDoctor_Location(),
                                    inputCls: 'selectfieldinput',
                                   usePicker:true,
                                   defaultPhonePickerConfig:{
                                     centered:true,
                                     height:'100%'
                                    },                                     
                                    store: 'DoctorAssignedLocationStoreForBlockAvailability'
                               }]},
                         ]
                    },
                    {
                         xtype: 'panel',
                         layout: 'hbox',
                         margin: '2% 0% 0% 0%',
                         items: [
                              {
                                   xtype: 'spacer'
                              },
                              {
                                   xtype: 'button',
                                   id: 'btnDrAvailabilityAdd',
                                   padding: '10 25 10 25',
                                   text: DoctorAppointment.util.Constant.getLabel_Add(),
                                   //iconMask: true,
                                   //iconCls: 'add',
                                   //align: 'right',
                                   ui: 'confirm'
                              },
                              {
                                   xtype: 'spacer'
                              }                              
                         ]
                    },
                    {
                         xtype: 'list',
                         id: 'doctorBlockAvailabilityList',
                         ui: 'round',
                         flex: 1,
                         emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                         onItemDisclosure: true,
                         itemTpl: new Ext.XTemplate('<div class="x-list-item upcoming">',
                                                       '<div class="names">',
                                                             '<label>',
                                                             '' + DoctorAppointment.util.Constant.getLabel_Start_Date() + '<span>{[this.getFormattedDate(values.startdate)]}</span>',
                                                             '</label>',
                                                             ''+ DoctorAppointment.util.Constant.getEmptyString() +'',
                                                             '' + DoctorAppointment.util.Constant.getLabel_Time() + '<span>{[this.getTime(values.start_time)]}</span>',
                                                       '</div>',
                                                       '<div class="names">',
                                                             '<label>',
                                                             '' + DoctorAppointment.util.Constant.getLabel_End_Date() + '<span>{[this.getFormattedDate(values.enddate)]}</span>',
                                                             '</label>',
                                                             ''+ DoctorAppointment.util.Constant.getEmptyString() +'',
                                                             '' + DoctorAppointment.util.Constant.getLabel_Time() + '<span>{[this.getTime(values.end_time)]}</span>',
                                                       '</div>',
                                                  '</div>',
                                                       {
                                                            getTime: function(time) {
                                                                 var arrTime = time.split(":");
                                                                 var hours = arrTime[0];
                                                                 var minutes = arrTime[1];
                                                                 var ampm = hours >= 12 ? 'PM' : 'AM';
                                                                 hours = hours % 12;
                                                                 hours = hours ? hours < 10 ? '0'+hours: hours : 12; // the hour '0' should be '12'
                                                                 var strTime = hours + ':' + minutes + ' ' + ampm;
                                                                 
                                                                 return strTime;
                                                            },
                                                            
                                                            getFormattedDate: function(date){
                                                                 var arrDate = date.split("-");
                                                                 var year = arrDate[0];
                                                                 var month = arrDate[1];
                                                                 var day = arrDate[2];
                                                                 var strDate = day +"-"+ month +"-"+ year;
                                                                 
                                                                 return strDate;
                                                            }
                                                            
                                                       }),
                         store: 'BlockAvailabilityStore'
                    }   
          ]
    }
     
});

Ext.define("DoctorAppointment.view.doctor.DoctorBlockAvailabilityAddEdit", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorBlockAvailabilityAddEdit',
     
    config: {
        title: '',
        styleHtmlContent: true,
        style: 'background:white',
        scrollable: {
          direction: 'vertical',
          directionLock: true
        },
        items: [
          {
               xtype: 'label',
               id: 'lblDoctorName_Block',
               cls: 'bgHomeListSkyBlueNormal14',
               html: ''
          },
          { 
               xtype: 'label',
               id: 'lblDoctorLocation_Block',
               cls: 'bgHomeListSkyBlueNormal14',
               html: ''
          },
          {
               xtype: 'fieldset',
               layout: 'vbox',
               title: '',
               items: [
                {
                    xtype: 'datepickerfield',
                    label: DoctorAppointment.util.Constant.getLabel_Start_Date(),
                    name: 'startDateBlockAvailability',
                    dateFormat: 'd-m-Y',
                    picker: {
                        slotOrder: ["day","month","year"],
                        yearFrom: new Date().getFullYear(),
                        yearTo: new Date().getFullYear() + 20,
                        height: '100%'
                    }
                },
                {
                    xtype: 'timepickerfield',
                    label: DoctorAppointment.util.Constant.getLabel_Start_Time(),
                    value: new Date(), // object also possible {hours:12, minutes:25},
                    id: 'startTimePickerBlockAvailability',
                    picker:{
                        height:'100%'
                    }
               }
            ]
          },
          {
               xtype: 'fieldset',
               layout: 'vbox',
               title: '',
               items: [
                {
                    xtype: 'datepickerfield',
                    label: DoctorAppointment.util.Constant.getLabel_End_Date(),
                    name: 'endDateBlockAvailability',
                    dateFormat: 'd-m-Y',
                    picker: {
                        slotOrder: ["day","month","year"],
                        yearFrom: new Date().getFullYear(),
                        yearTo: new Date().getFullYear() + 20,
                        height: '100%'
                    }
                },
                {
                    xtype: 'timepickerfield',
                    label: DoctorAppointment.util.Constant.getLabel_End_Time(),
                    value: new Date(), // object also possible {hours:12, minutes:25},
                    id: 'endTimePickerBlockAvailability',
                    picker:{
                        height:'100%'
                    }
               }
            ]
          },
          {
               xtype: 'hiddenfield',
               name: 'exclusionid',
               value: ''
          },
          {
               xtype: 'hiddenfield',
               name: 'doctorid',
               value: ''
          },
          {
               xtype: 'hiddenfield',
               name: 'establishmentid',
               value: ''
          },
          {
               xtype: 'button',
               id: 'btnSubmitDoctorBlockAvailability',
               ui: 'action',//'confirm',
               text: DoctorAppointment.util.Constant.getLabel_Reg_Form_Submit(),
               height: 40,
               margin: '20 30 0 30'
          },
          {
               xtype: 'button',
               id: 'btnDrBlockAvailabilityDelete',
               ui: 'decline',
               text: DoctorAppointment.util.Constant.getLabel_Delete_Block_Availability(),
               height: 40,
               margin: '20 30 0 30'
          }          
            
            
        ]
    }
     
});

Ext.define("DoctorAppointment.view.doctor.DoctorAppointmentOrTokenDelayOverlay", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorAppointmentOrTokenDelayOverlay',
     
    config: {
     layout: {
             pack: 'start',
             type: 'vbox'
         },
     
        padding: 0,
        modal: true,
        hideOnMaskTap: true,
        top:'5%',
        left:'5%',
        right:'5%',
        height:'50%',
        width: '90%',
        
          items: [
          {
               xtype: 'toolbar',
               docked: 'top',
               title: '<center><font size="3" color="#FFFFFF">' + DoctorAppointment.util.Constant.getLabel_Add_Delay() + '</font></center>',
               height: 40,
               width: '100%',
               items: [                
               {
                    xtype: 'button',
                    id: 'btn_doctor_appointment_token_dealy_cancel',
                    height: 20,
                    top: 2,
                    left: 1,
                    text: 'Cancel'
                    
               },
               {
                    xtype: 'button',
                    id: 'btn-doctor_appointment-token_delay_done',
                    height: 20,
                    top: 2,
                    right: 1,
                    text: 'Done'
               }
               ]
          },
          {
               xtype: 'container',
               id: 'appointmentDelayContainer',
               layout: 'vbox',
               style: 'background-color:#EEEEEE;',
               items: [
                    {
                         xtype: 'fieldset',
                         margin: '15 10 5 10',
                         items: [{
                              xtype: 'selectfield',
                              id: 'selectAppointmentOrTokenForDelay',
                              label: DoctorAppointment.util.Constant.getLabel_Before_Appointment(),
                              labelWidth: 130,
                              valueField: 'expectedtime',
                              displayField: 'expectedtime',
                              inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },                                             
                              store: 'DoctorBookedAppointmentsStore'
                         }]
                    },
                    {
                         xtype: 'fieldset',
                         margin: '15 10 5 10',
                         items: [{
                              xtype: 'selectfield',
                              id: 'selectAppointmentOrTokenDuration',
                              label: DoctorAppointment.util.Constant.getLabel_Duration_Min(),
                              labelWidth: 130,
                              valueField: 'delayValue',
                              displayField: 'delayValue',
                              inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },
                              store: 'AvgDurationStore'
                         }]
                    }
               ]
          },
          {
               xtype: 'container',
               id: 'tokenDelayContainer',
               layout: 'vbox',
               style: 'background-color:#EEEEEE;',
               items: [
                    {
                         xtype: 'fieldset',
                         margin: '15 10 5 10',
                         items: [{
                              xtype: 'selectfield',
                              id: 'selectDelayIsBefore',
                              label: 'Delay',
                              labelWidth: 100,
                              inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },                                             
                              options: [{'text': 'Before', 'value': 'true'},
                                        {'text': 'After', 'value': 'false'}]
                         }]
                    },
                    {
                         xtype: 'fieldset',
                         margin: '15 10 5 10',
                         items: [{
                              xtype: 'selectfield',
                              id: 'selectDelayTokenno',
                              label: 'Token no.',
                              labelWidth: 100,
                              valueField: 'tokenNo',
                              displayField: 'tokenNo',
                              inputCls: 'selectfieldinput',
                              usePicker:true,
                              defaultPhonePickerConfig:{
                                centered:true,
                                height:'100%'
                               },
                              store: 'AvgDurationStore'
                         }]
                    },
                    {
                         xtype: 'textfield',
                         margin: '15 10 5 10',
                         id: 'txtDelayTokenTime',
                         labelWidth: 100,
                         cls: 'with_border',
                         label: DoctorAppointment.util.Constant.getLabel_Dur_Min()
                         
                    },
               ]
          },
          {
               xtype: 'panel',
               height: 300
          }
          ],
          listeners: [{
                         fn: 'onCancel',
                         event: 'tap',
                         delegate: '#btn_doctor_appointment_token_dealy_cancel'
                    }]
    },
    onCancel: function(btn, evt ,eOption) {
          this.hide();
     }
});     

Ext.define("DoctorAppointment.view.doctor.DoctorForgotPassword", {
     extend: 'Ext.form.Panel', //'Ext.Container',
     xtype: 'doctorForgotPassword',
     
    requires: [
        'Ext.form.FieldSet',       
        'Ext.field.Email',
        'Ext.Label'
    ],     
     
    config: {
        title: DoctorAppointment.util.Constant.getLabel_Dr_Forgot_Pwd_Title(),
        layout: 'fit',
        scrollable: false,
        style: 'background:#c0c0c0',
        items: [          
            {
                xtype: 'fieldset',
                id: 'dr_forgot_pwd_form',
                padding: 10,
                defaults: {
                    cls: 'with_border'
                },
                hideOnMaskTap: false,
                items: [
                    {
                        xtype: 'label',
                        cls: 'commanTextSkyBlackNormal14',
                        //style: 'border: 0px !important;',
                        html: DoctorAppointment.util.Constant.getLabel_Dr_Forgot_Pwd_Input_msg(),
                        margin: '15 0 15 0'
                    },                    
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: '',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_Email()
                    },
                    {
                         xtype: 'button',
                         id: 'btn_dr_reset_pwd',
                         ui: 'action',//'confirm' 'action' 'action-small',
                         text: DoctorAppointment.util.Constant.getBtn_Title_Dr_Forgot_Pwd(),
                         height: 40,
                         //width: '43%',
                         margin: '10 30 0 30'
                    }                  
                ]
            }
        ]
    }
     
     
});

Ext.define("DoctorAppointment.view.doctor.DoctorLocations", {
     extend: 'Ext.Container',
     xtype: 'doctorLocations',
     
    config: {
        title: '',
          layout: {
             pack: 'start',
             type: 'vbox'
         },
        padding: 0,
        styleHtmlContent: true,
        fullscreen: true,
        style: 'background:#EEEEEE',
        items: [
               //{
               //  xtype: 'spacer',
               //  height: 10,
               //}, 
               {
                    xtype: 'panel',
                    layout: 'hbox',
                    margin: '2% 0% 0% 0%',
                    items: [
                         {
                              xtype: 'spacer'
                         },
                         {
                              xtype: 'button',
                              id: 'btnDrLocationAdd',
                              padding: '10 25 10 25',
                              //iconMask: true,
                              //iconCls: 'add',
                              text: DoctorAppointment.util.Constant.getLabel_Add(),
                              //align: 'right',
                              ui: 'confirm'
                         },
                         {
                              xtype: 'spacer'
                         }                         
                    ]
               },         
               {
                   xtype: 'list',
                   id: 'doctorLocationsList',
                   ui: 'round',
                   //cls: 'bg-location-list',
                   flex: 1,                      
                   emptyText: DoctorAppointment.util.Constant.getEmptyString(),
                   itemTpl: ['{establishmentname} '], // name
                   onItemDisclosure: true,
                   store: 'DoctorLocationsStore' //DoctorLocationsStore
               }
        ]
    }
     
});

Ext.define("DoctorAppointment.view.doctor.PatientInformation", {
     extend: 'Ext.form.Panel',//extend: 'Ext.Container',
     xtype: 'patientInformation',
     
    config: {
     layout: {
             pack: 'start',
             type: 'vbox'
         },
     modal: true,
     hideOnMaskTap: true,
     top:'5%',
     left:'5%',
     right:'5%',
     height:'40%',
     width: '70%',
     styleHtmlContent: true,
               
        items: [
          {
               xtype: 'toolbar',
               docked: 'top',
               title: '<center><font size="3" color="#FFFFFF">Patient Info</font></center>',
               height: 40,
               width: '100%'
          },
          {
               xtype: 'container',
               style: 'background-color:#EEEEEE;',
               items: [
                    {
                         xtype: 'fieldset',
                         padding: 5,
                         items: [
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              items: [
                              {
                                   xtype: 'label',
                                   width: 55,
                                   style: 'font-weight:bold;font-size:13px;',
                                   html: 'Name:'
                              },
                              {
                                   xtype: 'label',
                                   width: '75%',
                                   id: 'name_patientInfo',
                                   cls: 'commanTextSkyBlueNormal14',
                                   style: 'font-weight:bold;font-size:13px;',
                                   html: ''
                              }]
                         },     
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              items: [
                              {
                                   xtype: 'label',
                                   width: 55,
                                   style: 'font-weight:bold;font-size:13px;',
                                   html: 'Age:'
                              },
                              {
                                   xtype: 'label',
                                   width: '75%',
                                   id: 'age_patientInfo',
                                   cls: 'commanTextSkyBlueNormal14',
                                   style: 'font-weight:bold; ',
                                   html: ''
                              }]
                         },
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              items: [
                              {
                                   xtype: 'label',
                                   width: 55,
                                   style: 'font-weight:bold;font-size:13px;',
                                   html: 'Sex:'
                              },
                              {
                                   xtype: 'label',
                                   width: '75%',
                                   id: 'sex_patientInfo',
                                   cls: 'commanTextSkyBlueNormal14',
                                   style: 'font-weight:bold;',
                                   html: ''
                              }]
                         },
                         {
                              xtype: 'panel',
                              layout: 'hbox',
                              items: [
                              {
                                   xtype: 'label',
                                   width: 55,
                                   style: 'font-weight:bold;font-size:13px;',
                                   html: 'Medical Desc:'
                              },
                              {
                                   xtype: 'label',
                                   cls: 'commanTextSkyBlueNormal14',
                                   width: '75%',
                                   id: 'medicalDesc_patientInfo',
                                   style: 'font-weight:bold;',
                                   html: ''
                              }]
                         }
                    ]}
               ]
          },
          {
               xtype: 'button',
               id: 'btn_patientInfo_done',
               ui: 'action',//'confirm',
               text: 'Ok',
               margin: '10 0 0 0'
          },
          {
               xtype: 'panel',
               height: 300
          }
       ],
        listeners: [{
                         fn: 'onDone',
                         event: 'tap',
                         delegate: '#btn_patientInfo_done'
                    }]
     },
     onDone: function(btn, evt ,eOption) {
          this.hide();
     }

});

Ext.define("DoctorAppointment.view.doctor.DoctorLogin", {
     extend: 'Ext.form.Panel',
     xtype: 'doctorLogin',
     
    requires: [
        'Ext.form.FieldSet',       
        'Ext.field.Email',
        'Ext.field.Password',
        'Ext.Label'
    ],     
     
    config: {
        title: DoctorAppointment.util.Constant.getLabel_Dr_Login_Title(),
        layout: 'fit',
        scrollable: {
          direction: 'vertical',
          directionLock: true
        },
        style: 'background:#c0c0c0',
        items: [           
            {
                xtype: 'fieldset',
                id: 'dr_login_form',
                padding: 15,
                hidden: false,
                defaults: {
                    cls: 'with_border'
                },
                hideOnMaskTap: false,
                items: [                    
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: '',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_Email(),
                        listeners: {  
                              painted: function(){
                                   // to clear email
                                   this.setValue('');
                                   //this.reset();
                              }
                        } 
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        label: '',
                        placeHolder: DoctorAppointment.util.Constant.getLabel_Password(),
                        listeners: {  
                              painted: function(){
                                   // to clear password
                                   this.setValue('');
                                   //this.reset();
                              }
                        }                        
                    },
                    {
                        xtype: 'button',
                        id: 'dr_forgot_pwd',
                        ui: 'plain',
                        cls: 'commanButtonTextSkyBlueNormal14',
                        //style: 'border: 0px !important;',
                        text: DoctorAppointment.util.Constant.getLabel_Dr_Login_Forgot_Pwd_link(),
                        margin: '5 0 5 0',
                    },
                    {
                         xtype: 'button',
                         id: 'btn_dr_sign_in',
                         ui: 'confirm',//'confirm' 'action',
                         text: DoctorAppointment.util.Constant.getBtn_Dr_Login_Sign_In(),
                         height: 40,
                         //width: '43%',
                         margin: '10 30 0 30'
                    },
                    {
                         xtype: 'button',
                         id: 'btn_dr_registration',
                         ui: 'action',//'confirm' 'action',
                         text: DoctorAppointment.util.Constant.getBtn_Dr_Login_Create_Dr_Account(),
                         height: 40,
                         //width: '43%',
                         margin: '10 30 0 30'
                    }                    
                ]
            }
        ]
    }
     
     
});
