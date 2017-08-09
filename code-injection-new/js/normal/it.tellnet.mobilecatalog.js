




















(function($){
	// The initialization function called on the page load.
	init = function(phone) {
		// TODO: there is a better way than using the 'refreshMenu' variable to
		// avoid visualization problems updating the menus not on the selected
		// page?
		if (phone == 0) {
			// Update the 'Rail & cage' elements.
			updateRailType(1, 0);
			updateRailSize(1, 0);
			updateRailLength(1);
			updateRailQuality(1);
			updateSteelType(1);
			updateCageType(1);
			updateStrokeValue();
			updateAdjustingScrew(1, 0);
			updatePreloadP(1, 0);

			// Update the error messages.
			updateErrors();

			// Update the 'Recalculating Unit' elements.
			updateRailType(0, 1);
			updateRailSize(0, 1);
			updateAdjustingScrew(0, 1);
			updatePreloadP(0, 1);

			// Update the results.
			updateTheResults();
		}
		else {
			// Update the 'Rail' elements.
			updateRailType(1, 0);
			updateRailSize(1, 0);
			updateRailLength(1);
			updateRailQuality(1);
			updateSteelType(1);

			// Update the 'cage' elements.
			updateCageType(0);
			updateStrokeValue();
			updateAdjustingScrew(0, 0);
			updatePreloadP(0, 0);

			// Update the error messages.
			updateErrors();

			// Update the 'Recalculating Unit' elements.
			updateRailType(0, 1);
			updateRailSize(0, 1);
			updateAdjustingScrew(0, 1);
			updatePreloadP(0, 1);

			// Update the results.
			updateTheResults();
		}
	};

	sendDataForEmail = function() {
		// Difference with iPad/iPhone.
		//cordova.exec(
		PluginManager.addService("SendCalculationDataEmail", "it.tellnet.mobilecatalog.SendCalculationDataEmail");
		PhoneGap.execAsync(function() {
			/*callback('Success')*/;
		},
		function() {
			/*callback('Error')*/;
		},
		"SendCalculationDataEmail",
		"sendCalculationDataEmail",
		/*function() {
                	callback('Success');
            	},
            	function() {
                	callback('Error');
            	},
            	"SendCalculationDataEmail",
            	"sendCalculationDataEmail",*/
		// The arguments (the data to send via mail).
		[// User inserted data.
		 document.getElementById(railtype).value,
		 document.getElementById(railsize).value,
		 document.getElementById(raillength).value,
		 document.getElementById(railquality).value,
		 document.getElementById(steeltype).value,
		 document.getElementById(cagetype).value,
		 document.getElementById(strokevar).value,
		 document.getElementById(adjustingscrew).value,
		 document.getElementById(preload).value,
		 document.getElementById(recirculatingtype).value,
		 document.getElementById(recirculatingsize).value,
		 document.getElementById(reirculatingadjustingscrew).value,
		 document.getElementById(recirculatingpreload).value,
		 /*document.getElementById(customer).value,
            	document.getElementById(project).value,
            	document.getElementById(editor).value,*/
		 // Results.
		 document.getElementById(cageLengthVar).innerHTML,
		 document.getElementById(rollingElements).innerHTML,
		 document.getElementById(maxPossibleStrokeVar).innerHTML,
		 document.getElementById(railRecommendedTighteningTorquesMdsVar).innerHTML,
		 document.getElementById(railRecommendedTighteningTorquesMds2Var).innerHTML,
		 document.getElementById(railRecommendedTighteningTorquesMds3Var).innerHTML,
		 document.getElementById(mountingholeDistanceL1Var).innerHTML,
		 document.getElementById(distanceRollingElementTVar).innerHTML,
		 document.getElementById(railForcePerScrewPvsVar).innerHTML,
		 document.getElementById(minimumRailLengthVar).innerHTML,
		 document.getElementById(maxRailLengthNormalVar).innerHTML,
		 document.getElementById(maxRailLengthSQVar).innerHTML,
		 document.getElementById(maxRailLengthSSQVar).innerHTML,
		 document.getElementById(cRollingElementVar).innerHTML,
		 document.getElementById(recirculatingRecommendedTighteningTorquesMds).innerHTML,
		 document.getElementById(recirculatingRecommendedTighteningTorquesMds2).innerHTML,
		 document.getElementById(recirculatingRecommendedTighteningTorquesMds3).innerHTML,
		 document.getElementById(numberOfPreloadScrewsVar).innerHTML,
		 document.getElementById(railForcePerScrewPvsRecirculatingVar).innerHTML,
		 document.getElementById(cRecirculatingUnitVar).innerHTML,
		 document.getElementById(errors).innerHTML]);
	};

	// Rail & cage.

	// The function called when the selected value of rail type is changed by
	// the user.
	railTypeChanged = function() {
		// Update the linked values.
		updateRailSize(1, 0);
		updateRailLength(1);
		updateCageType(1);

		generalChanged();
	};

	// The function called when the selected value of rail size is changed by
	// the user.
	railSizeChanged = function() {
		// Update the linked values.
		updateRailLength(1);

		generalChanged();
	};

	generalChanged = function() {
		// Update the error messages.
		updateErrors();

		// Update the results.
		updateTheResults();
	};

	// Recalculating Unit.

	// The function called when the selected value of recirculating type is
	// changed by the user.
	recirculatingTypeChanged = function() {
		// Update the linked values.
		updateRailSize(1, 1);

		generalRecirculatingChanged();
	};

	generalRecirculatingChanged = function() {
		// Update the results.
		updateTheResults();
	};

})(jQuery);


(function($){
    // Update the adjusting screw values.
    updateAdjustingScrew = function(refreshMenu, recirculating) {
        var screwsMatrix = getScrewsMatrix();
        var adjustingScrewArray = new Array();

        var i = 0;
        while (i < screwsMatrix.length) {
            adjustingScrewArray.push(screwsMatrix[i].type);

            i++;
        }

        // Get the adjusting screw.
        var recirculatingString;
        if (recirculating == 0) {
            // (N19).
            recirculatingString = adjustingscrew;
        }
        else {
            // (N45).
            recirculatingString = reirculatingadjustingscrew;
        }

        var adjustingScrew = document.getElementById(recirculatingString);

        // Clear out existing items.
        adjustingScrew.options.length = 0;

        // Get the adjusting screw options.
        for (var j = 0; j < adjustingScrewArray.length; j++) {
            adjustingScrew.options.add(new Option(adjustingScrewArray[j], adjustingScrewArray[j]));
        }

        // Refresh the menu.
        adjustingScrew.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + recirculatingString).selectmenu(); // Initialize the menu.
            $("#" + recirculatingString).selectmenu("refresh", true);
        }
    };

    // Update the cage type values.
    updateCageType = function(refreshMenu) {
        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;

        var kafigTypenMatrix = getKafigTypenMatrix();
        var cageTypeArray = new Array();

        var i = 0;
        while (i < kafigTypenMatrix.length) {
            if (kafigTypenMatrix[i].type == railType) {
                cageTypeArray = kafigTypenMatrix[i].values;
                break;
            }

            i++;
        }

        // Get the cage type (N13).
        var cageType = document.getElementById(cagetype);

        // Clear out existing items.
        cageType.options.length = 0;

        // Get the rail size options.
        for (var j = 0; j < cageTypeArray.length; j++) {
            cageType.options.add(new Option(cageTypeArray[j], cageTypeArray[j]));
        }

        // Refresh the menu.
        cageType.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + cagetype).selectmenu(); // Initialize the menu.
            $("#" + cagetype).selectmenu("refresh", true);
        }
    };

    // Set the errors.
    updateErrors = function() {
        var div = document.getElementById(errors);
        div.innerHTML = "";

        // ERROR 1.
        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;
        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;

        var AG82 = railType + railSize;

        var standardLanghenMatrix = getStandardLanghenMatrix();
        var standardLanghenFurValues = new Array();

        var i = 0;
        while (i < standardLanghenMatrix.length) {
            if (standardLanghenMatrix[i].type == AG82) {
                standardLanghenFurValues = standardLanghenMatrix[i].values;
                break;
            }

            i++;
        }

        // Get the rail length (F15).
        var railLength = document.getElementById(raillength).value;

        var railLengthFound = 0;
        var j = 0;
        while (j < standardLanghenFurValues.length) {
            if (railLength == standardLanghenFurValues[j]) {
                railLengthFound = 1;
                break;
            }

            j++;
        }

        if (railLengthFound == 0) {
            div.innerHTML = div.innerHTML + error1;
        }

        // ERROR 2.
        // Get the rail length (F15).
        //var railLength = document.getElementById("raillength").value;
        // Get the stroke (N14).
        var stroke = document.getElementById(strokevar).value;

        // Verify the 'stroke / rail length' ratio.
        var printRatioError = 0;
        if (stroke <= 400) {
            if (stroke / railLength > 0.7) {
                printRatioError = 1;
            }
        }
        else {
            if (stroke / railLength > 1) {
                printRatioError = 1;
            }
        }

        if (printRatioError == 1) {
            div.innerHTML = div.innerHTML + error2;
        }

        // ERROR 3.
        // Get the rail force per screw pvs (Y12) value.
        var railForcePerScrewPvs = getRailForcePerScrewPvs();

        // Verify if the railForcePerScrewPvs value is not a number.
        if (isNaN(railForcePerScrewPvs)) {
            div.innerHTML = div.innerHTML + error3;
        }
    };

    // Update the preload p value.
    updatePreloadP = function(refreshMenu, recirculating) {
        // The excel table AU60:AU78.
        var preloadPArray = new Array(2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
            14, 15, 16, 17, 18, 19, 20);

        // Get the preload p (N20).
        var preloadString;
        if (recirculating == 0) {
            preloadString = preload;
        }
        else {
            preloadString = recirculatingpreload;
        }

        var preloadP = document.getElementById(preloadString);

        // Clear out existing items.
        preloadP.options.length = 0;

        // Get the preload p options.
        for (var j = 0; j < preloadPArray.length; j++) {
            preloadP.options.add(new Option(preloadPArray[j], preloadPArray[j]));
        }

        // Refresh the menu.
        preloadP.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + preloadString).selectmenu(); // Initialize the menu.
            $("#" + preloadString).selectmenu("refresh", true);
        }
    };

    // Update the rail length values.
    updateRailLength = function(refreshMenu) {
        var railLengthValues = getRailLengthValues();

        // Get the rail length (F15).
        var railLength = document.getElementById(raillength);

        // Clear out existing items.
        railLength.options.length = 0;

        // Get the rail length options.
        for (var j = 0; j < railLengthValues.length; j++) {
            railLength.options.add(new Option(railLengthValues[j], railLengthValues[j]));
        }

        // Refresh the menu.
        railLength.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + raillength).selectmenu(); // Initialize the menu.
            $("#" + raillength).selectmenu("refresh", true);
        }
    };

    // Update the rail quality values.
    updateRailQuality = function(refreshMenu) {
        var normal = "normal";
        var SQ = "SQ";
        var SSQ = "SSQ";

        // The excel table AG60:AG62.
        var railQualityArray = new Array(normal, SQ, SSQ);

        // Get the rail quality (F16).
        var railQuality = document.getElementById(railquality);

        // Clear out existing items.
        railQuality.options.length = 0;

        // Get the rail quality options.
        for (var j = 0; j < railQualityArray.length; j++) {
            railQuality.options.add(new Option(railQualityArray[j], railQualityArray[j]));
        }

        // Refresh the menu.
        railQuality.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + railquality).selectmenu(); // Initialize the menu.
            $("#" + railquality).selectmenu("refresh", true);
        }
    };

    // Update the rail size values.
    updateRailSize = function(refreshMenu, recirculating) {
        var railSizeArray;
        var railsizeString;

        // Get the rail size.
        if (recirculating == 0) {
            railSizeArray = getRailSizeValues();
            // (F14).
            railsizeString = railsize;
        }
        else {
            railSizeArray = getRecirculatingSizeValues();
            // (F43).
            railsizeString = recirculatingsize;
        }

        var railSize = document.getElementById(railsizeString);

        // Clear out existing items.
        railSize.options.length = 0;

        // Get the rail size options.
        for (var j = 0; j < railSizeArray.length; j++) {
            railSize.options.add(new Option(railSizeArray[j], railSizeArray[j]));
        }

        // Refresh the menu.
        railSize.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + railsizeString).selectmenu(); // Initialize the menu.
            $("#" + railsizeString).selectmenu("refresh", true);
        }
    };

    // Update the rail type values.
    updateRailType = function(refreshMenu, recirculating) {
        var railTypeValues = getRailTypeValues();
        var railtypeString;

        // Get the rail type.
        if (recirculating == 0) {
            railTypeValues = getRailTypeValues();
            // (F13).
            railtypeString = railtype;
        }
        else {
            railTypeValues = getRecirculatingTypeValues();
            // (F42).
            railtypeString = recirculatingtype;
        }

        var railType = document.getElementById(railtypeString);

        // Clear out existing items.
        railType.options.length = 0;

        // Get the rail type options.
        for (var i = 0; i < railTypeValues.length; i++) {
            railType.options.add(new Option(railTypeValues[i], railTypeValues[i]));
        }

        // Refresh the menu.
        railType.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + railtypeString).selectmenu(); // Initialize the menu.
            $("#" + railtypeString).selectmenu("refresh", true);
        }
    };

    // Update the steel type values.
    updateSteelType = function(refreshMenu) {
        var normal = "normal";
        var RF = "RF";

        // The excel table AI60:AI61.
        var steelTypeArray = new Array(normal, RF);

        // Get the steel type (F17).
        var steelType = document.getElementById(steeltype);

        // Clear out existing items.
        steelType.options.length = 0;

        // Get the steel type options.
        for (var j = 0; j < steelTypeArray.length; j++) {
            steelType.options.add(new Option(steelTypeArray[j], steelTypeArray[j]));
        }

        // Refresh the menu.
        steelType.selectedIndex = 0;
        if (refreshMenu == 1) {
            $("#" + steeltype).selectmenu(); // Initialize the menu.
            $("#" + steeltype).selectmenu("refresh", true);
        }
    };

    // Set the default stroke value.
    updateStrokeValue = function() {
        $("#" + strokevar).val(defaultStrokeValue);
    };

    // Update the results values.
    updateTheResults = function() {
        // Rail & cage - Result.
        setCageLength();
        setNumberOfRollingElements();
        setMaxPossibleStroke();
        setRailRecommendedTighteningTorquesMds(0);
        setRailRecommendedTighteningTorquesMds2(0);
        setRailRecommendedTighteningTorquesMds3(0);

        // Rail & cage - Calculated and stored data.
        setMountingholeDistanceL1();
        setDistanceRollingElementT();
        setRailForcePerScrewPvs();
        setMinimumRailLength();
        setMaxRailLengthNormal();
        setMaxRailLengthSQ();
        setMaxRailLengthSSQ();
        setCRollingElement();

        // Recalculating Unit - Result.
        setRailRecommendedTighteningTorquesMds(1);
        setRailRecommendedTighteningTorquesMds2(1);
        setRailRecommendedTighteningTorquesMds3(1);

        // Recalculating Unit - Result.
        setNumberOfPreloadScrews();
        setRecirculatingForcePerScrewPvs();
        setCRecirculatingUnit();
    };

})(jQuery);


(function($){
    // Return the matrix corresponding with the values corresponding with the
    // 'Auswahl' (AU4:AW24) excel table.
    getAuswahlMatrix = function() {
        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;
        // Get the cage type.
        var cageType = document.getElementById(cagetype).value;

        var wKafige1, wKafige2, wKafige3, wKafige4, wKafige5, wKafige6;
        var wKafige7, wKafige8, wKafige9, wKafige10, wKafige11, wKafigeValues, wValue = 0;
        var tKafige1, tKafige2, tKafige3, tKafige4, tKafige5, tKafige6;
        var tKafige7, tKafige8, tKafige9, tKafige10, tKafige11, tKafigeValues, tValue = 0;
        var oValue = 0;

        // The Kafige (AG32:BD50) table values.
        if (cageType == "AC") {
            // The w values of the Kafige table.
            wKafige1 = {
                type:1,
                value:1.5
            };
            wKafige2 = {
                type:2,
                value:2.0
            };
            wKafige3 = {
                type:3,
                value:2.5
            };
            wKafige4 = {
                type:6,
                value:6.0
            };
            wKafige5 = {
                type:9,
                value:9.0
            };
            wKafige6 = {
                type:12,
                value:11.0
            };
            wKafigeValues = new Array(wKafige1, wKafige2, wKafige3, wKafige4, wKafige5, wKafige6);

            // The t values of the Kafige table.
            tKafige1 = {
                type:1,
                value:3.0
            };
            tKafige2 = {
                type:2,
                value:4.0
            };
            tKafige3 = {
                type:3,
                value:5.0
            };
            tKafige4 = {
                type:6,
                value:9.0
            };
            tKafige5 = {
                type:9,
                value:14.0
            };
            tKafige6 = {
                type:12,
                value:18.0
            };
            tKafigeValues = new Array(tKafige1, tKafige2, tKafige3, tKafige4, tKafige5, tKafige6);
        }
        else if (cageType == "AK") {
            // The w values of the Kafige table.
            wKafige1 = {
                type:1,
                value:1.5
            };
            wKafige2 = {
                type:2,
                value:2.0
            };
            wKafige3 = {
                type:3,
                value:2.5
            };
            wKafige4 = {
                type:6,
                value:6.0
            };
            wKafige5 = {
                type:9,
                value:9.0
            };
            wKafige6 = {
                type:12,
                value:11.0
            };
            wKafigeValues = new Array(wKafige1, wKafige2, wKafige3, wKafige4, wKafige5, wKafige6);

            // The t values of the Kafige table.
            tKafige1 = {
                type:1,
                value:2.2
            };
            tKafige2 = {
                type:2,
                value:4.0
            };
            tKafige3 = {
                type:3,
                value:4.2
            };
            tKafige4 = {
                type:6,
                value:9.0
            };
            tKafige5 = {
                type:9,
                value:14.0
            };
            tKafige6 = {
                type:12,
                value:18.0
            };
            tKafigeValues = new Array(tKafige1, tKafige2, tKafige3, tKafige4, tKafige5, tKafige6);
        }
        else if (cageType == "EE") {
            // The w values of the Kafige table.
            wKafige1 = {
                type:6,
                value:9.0
            };
            wKafige2 = {
                type:9,
                value:13.5
            };
            wKafigeValues = new Array(wKafige1, wKafige2);

            // The t values of the Kafige table.
            tKafige1 = {
                type:6,
                value:12.0
            };
            tKafige2 = {
                type:9,
                value:18.0
            };
            tKafigeValues = new Array(tKafige1, tKafige2);
        }
        else if (cageType == "KBN") {
            // The w values of the Kafige table.
            wKafige1 = {
                type:3,
                value:3.5
            };
            wKafige2 = {
                type:4,
                value:4.0
            };
            wKafige3 = {
                type:6,
                value:5.0
            };
            wKafige4 = {
                type:9,
                value:7.5
            };
            wKafige5 = {
                type:12,
                value:9.0
            };
            wKafigeValues = new Array(wKafige1, wKafige2, wKafige3, wKafige4, wKafige5);

            // The t values of the Kafige table.
            tKafige1 = {
                type:3,
                value:5.0
            };
            tKafige2 = {
                type:4,
                value:6.5
            };
            tKafige3 = {
                type:6,
                value:8.5
            };
            tKafige4 = {
                type:9,
                value:12.0
            };
            tKafige5 = {
                type:12,
                value:15.0
            };
            tKafigeValues = new Array(tKafige1, tKafige2, tKafige3, tKafige4, tKafige5);
        }
        else if (cageType == "SHW") {
            // The w values of the Kafige table.
            wKafige1 = {
                type:92025,
                value:2.9
            };
            wKafige2 = {
                type:2025,
                value:2.9
            };
            wKafige3 = {
                type:2535,
                value:3.4
            };
            wKafige4 = {
                type:3045,
                value:3.6
            };
            wKafige5 = {
                type:3555,
                value:4.3
            };
            wKafige6 = {
                type:4020,
                value:2.9
            };
            wKafige7 = {
                type:5025,
                value:2.9
            };
            wKafige8 = {
                type:6035,
                value:3.4
            };
            wKafige9 = {
                type:7040,
                value:3.6
            };
            wKafige10 = {
                type:8050,
                value:4.3
            };
            wKafigeValues = new Array(wKafige1, wKafige2, wKafige3, wKafige4,
                wKafige5, wKafige6, wKafige7, wKafige8, wKafige9, wKafige10);

            // The t values of the Kafige table.
            tKafige1 = {
                type:92025,
                value:4.0
            };
            tKafige2 = {
                type:2025,
                value:4.0
            };
            tKafige3 = {
                type:2535,
                value:4.8
            };
            tKafige4 = {
                type:3045,
                value:5.2
            };
            tKafige5 = {
                type:3555,
                value:6.1
            };
            tKafige6 = {
                type:4020,
                value:4.0
            };
            tKafige7 = {
                type:5025,
                value:4.0
            };
            tKafige8 = {
                type:6035,
                value:4.8
            };
            tKafige9 = {
                type:7040,
                value:5.0
            };
            tKafige10 = {
                type:8050,
                value:6.1
            };
            tKafigeValues = new Array(tKafige1, tKafige2, tKafige3, tKafige4,
                tKafige5, tKafige6, tKafige7, tKafige8, tKafige9, tKafige10);
        }
        else if (cageType == "HW") {
            // The w values of the Kafige table.
            wKafige1 = {
                type:62015,
                value:3.0
            };
            wKafige2 = {
                type:92025,
                value:3.5
            };
            wKafige3 = {
                type:2535,
                value:4.0
            };
            wKafige4 = {
                type:3045,
                value:4.5
            };
            wKafige5 = {
                type:3555,
                value:5.0
            };
            wKafige6 = {
                type:3015,
                value:3.0
            };
            wKafige7 = {
                type:4020,
                value:3.5
            };
            wKafige8 = {
                type:5025,
                value:2.8
            };
            wKafige9 = {
                type:6035,
                value:4.0
            };
            wKafige10 = {
                type:7040,
                value:4.5
            };
            wKafige11 = {
                type:8050,
                value:5.0
            };
            wKafigeValues = new Array(wKafige1, wKafige2, wKafige3, wKafige4,
                wKafige5, wKafige6, wKafige7, wKafige8, wKafige9, wKafige10, wKafige11);

            // The t values of the Kafige table.
            tKafige1 = {
                type:62015,
                value:4.0
            };
            tKafige2 = {
                type:92025,
                value:4.5
            };
            tKafige3 = {
                type:2535,
                value:5.5
            };
            tKafige4 = {
                type:3045,
                value:6.0
            };
            tKafige5 = {
                type:3555,
                value:7.0
            };
            tKafige6 = {
                type:3015,
                value:4.0
            };
            tKafige7 = {
                type:4020,
                value:4.5
            };
            tKafige8 = {
                type:5025,
                value:3.8
            };
            tKafige9 = {
                type:6035,
                value:5.5
            };
            tKafige10 = {
                type:7040,
                value:6.0
            };
            tKafige11 = {
                type:8050,
                value:7.0
            };
            tKafigeValues = new Array(tKafige1, tKafige2, tKafige3, tKafige4,
                tKafige5, tKafige6, tKafige7, tKafige8, tKafige9, tKafige10, tKafige11);
        }
        else /*if (cageType == "KBS")*/ {
            // The w values of the Kafige table.
            wKafige1 = {
                type:3,
                value:3.5
            };
            wKafige2 = {
                type:4,
                value:4.0
            };
            wKafige3 = {
                type:6,
                value:5.0
            };
            wKafige4 = {
                type:9,
                value:7.5
            };
            wKafigeValues = new Array(wKafige1, wKafige2, wKafige3, wKafige4);

            // The t values of the Kafige table.
            tKafige1 = {
                type:3,
                value:5.0
            };
            tKafige2 = {
                type:4,
                value:6.5
            };
            tKafige3 = {
                type:6,
                value:8.5
            };
            tKafige4 = {
                type:9,
                value:12.0
            };
            tKafigeValues = new Array(tKafige1, tKafige2, tKafige3, tKafige4);

            // The o values of the Kafige table.
            var oKafige1 = {
                type:3,
                value:13.0
            };
            var oKafige2 = {
                type:4,
                value:16.5
            };
            var oKafige3 = {
                type:6,
                value:18.5
            };
            var oKafige4 = {
                type:9,
                value:28.0
            };
            var oKafigeValues = new Array(oKafige1, oKafige2, oKafige3, oKafige4);

            var n = 0;
            while (n < oKafigeValues.length) {
                if (oKafigeValues[n].type == railSize) {
                    oValue = oKafigeValues[n].value;
                    break;
                }

                n++
            }
        }

        // Set the w and t values.
        var l = 0;
        while (l < wKafigeValues.length) {
            if (wKafigeValues[l].type == railSize) {
                wValue = wKafigeValues[l].value;
                break;
            }

            l++
        }

        var m = 0;
        while (m < tKafigeValues.length) {
            if (tKafigeValues[m].type == railSize) {
                tValue = tKafigeValues[m].value;
                break;
            }

            m++
        }

        // The Auswahl matrix.
        var w = {
            type: cageType + "w",
            values: wValue
        };
        var t = {
            type: cageType + "t",
            values: tValue
        };
        var o = {
            type: cageType + "o",
            values: oValue
        };

        var auswahlMatrix = new Array(w, t, o);

        return auswahlMatrix;
    }

    // Return the matrix corresponding with the values corresponding with the
    // 'C / roller' (BR12:BW78) excel table.
    getCrollerMatrix = function() {
        // The C / roller table values.
        var RAC1 = {
            type:"RAC1",
            values:50
        };
        var RAC2 = {
            type:"RAC2",
            values:85
        };
        var RAC3 = {
            type:"RAC3",
            values:130
        };
        var RAC6 = {
            type:"RAC6",
            values:530
        };
        var RAC9 = {
            type:"RAC9",
            values:1300
        };
        var RAC12 = {
            type:"RAC12",
            values:2500
        };
        var RDAC1 = {
            type:"RDAC1",
            values:50
        };
        var RDAC2 = {
            type:"RDAC2",
            values:85
        };
        var RDAC3 = {
            type:"RDAC3",
            values:130
        };
        var RDAC6 = {
            type:"RDAC6",
            values:530
        };
        var RDAC9 = {
            type:"RDAC9",
            values:1300
        };
        var RDAC12 = {
            type:"RDAC12",
            values:2500
        };
        var RAK1 = {
            type:"RAK1",
            values:9
        };
        var RAK2 = {
            type:"RAK2",
            values:15
        };
        var RAK3 = {
            type:"RAK3",
            values:25
        };
        var RAK6 = {
            type:"RAK6",
            values:65
        };
        var RAK9 = {
            type:"RAK9",
            values:150
        };
        var RAK12 = {
            type:"RAK12",
            values:260
        };
        var RDAK1 = {
            type:"RDAK1",
            values:9
        };
        var RDAK2 = {
            type:"RDAK2",
            values:15
        };
        var RDAK3 = {
            type:"RDAK3",
            values:25
        };
        var RDAK6 = {
            type:"RDAK6",
            values:65
        };
        var RDAK9 = {
            type:"RDAK9",
            values:150
        };
        var RDAK12 = {
            type:"RDAK12",
            values:260
        };
        var REE6 = {
            type:"REE6",
            values:530
        };
        var REE9 = {
            type:"REE9",
            values:1300
        };
        var RDEE6 = {
            type:"RDEE6",
            values:530
        };
        var RDEE9 = {
            type:"RDEE9",
            values:1300
        };
        var RNKBN3 = {
            type:"RNKBN3",
            values:410
        };
        var RNKBN4 = {
            type:"RNKBN4",
            values:850
        };
        var RNKBN6 = {
            type:"RNKBN6",
            values:1800
        };
        var RNKBN9 = {
            type:"RNKBN9",
            values:3900
        };
        var RNKBN12 = {
            type:"RNKBN12",
            values:6500
        };
        var RNGKBN3 = {
            type:"RNGKBN3",
            values:410
        };
        var RNGKBN4 = {
            type:"RNGKBN4",
            values:850
        };
        var RNGKBN6 = {
            type:"RNGKBN6",
            values:1800
        };
        var RNGKBN9 = {
            type:"RNGKBN9",
            values:3900
        };
        var RNGKBN12 = {
            type:"RNGKBN12",
            values:6500
        };
        var RNKBS3 = {
            type:"RNKBS3",
            values:410
        };
        var RNKBS4 = {
            type:"RNKBS4",
            values:850
        };
        var RNKBS6 = {
            type:"RNKBS6",
            values:1800
        };
        var RNKBS9 = {
            type:"RNKBS9",
            values:3900
        };
        var RNGKBS3 = {
            type:"RNGKBS3",
            values:410
        };
        var RNGKBS4 = {
            type:"RNGKBS4",
            values:850
        };
        var RNGKBS6 = {
            type:"RNGKBS6",
            values:1800
        };
        var RNGKBS9 = {
            type:"RNGKBS9",
            values:3900
        };
        var NOHW62015 = {
            type:"N/OHW62015",
            values:530
        };
        var NOHW92025 = {
            type:"N/OHW92025",
            values:750
        };
        var NOHW2535 = {
            type:"N/OHW2535",
            values:1375
        };
        var NOHW3045 = {
            type:"N/OHW3045",
            values:2350
        };
        var NOHW3555 = {
            type:"N/OHW3555",
            values:3600
        };
        var MVHW3015 = {
            type:"M/VHW3015",
            values:530
        };
        var MVHW4020 = {
            type:"M/VHW4020",
            values:750
        };
        var MVHW5025 = {
            type:"M/VHW5025",
            values:970
        };
        var MVHW6035 = {
            type:"M/VHW6035",
            values:1375
        };
        var MVHW7040 = {
            type:"M/VHW7040",
            values:2350
        };
        var MVHW8050 = {
            type:"M/VHW8050",
            values:3600
        };
        var NOSHW92025 = {
            type:"N/OSHW92025",
            values:750
        };
        var NOSHW2025 = {
            type:"N/OSHW2025",
            values:750
        };
        var NOSHW2535 = {
            type:"N/OSHW2535",
            values:1675
        };
        var NOSHW3045 = {
            type:"N/OSHW3045",
            values:2350
        };
        var NOSHW3555 = {
            type:"N/OSHW3555",
            values:3600
        };
        var MVSHW4025 = {
            type:"M/VSHW4025",
            values:750
        };
        var MVSHW5025 = {
            type:"M/VSHW5025",
            values:750
        };
        var MVSHW6035 = {
            type:"M/VSHW6035",
            values:1675
        };
        var MVSHW7040 = {
            type:"M/VSHW7040",
            values:2350
        };
        var MVSHW8050 = {
            type:"M/VSHW8050",
            values:3600
        };

        // The C / roller marix.
        var crollerMatrix = new Array(RAC1, RAC2, RAC3, RAC6, RAC9, RAC12, RDAC1,
            RDAC2, RDAC3, RDAC6, RDAC9, RDAC12, RAK1, RAK2, RAK3, RAK6, RAK9,
            RAK12, RDAK1, RDAK2, RDAK3, RDAK6, RDAK9, RDAK12, REE6, REE9, RDEE6,
            RDEE9, RNKBN3, RNKBN4, RNKBN6, RNKBN9, RNKBN12, RNGKBN3, RNGKBN4,
            RNGKBN6, RNGKBN9, RNGKBN12, RNKBS3, RNKBS4, RNKBS6, RNKBS9, RNGKBS3,
            RNGKBS4, RNGKBS6, RNGKBS9, NOHW62015, NOHW92025, NOHW2535, NOHW3045,
            NOHW3555, MVHW3015, MVHW4020, MVHW5025, MVHW6035, MVHW7040, MVHW8050,
            NOSHW92025, NOSHW2025, NOSHW2535, NOSHW3045, NOSHW3555, MVSHW4025,
            MVSHW5025, MVSHW6035, MVSHW7040, MVSHW8050);

        return crollerMatrix;
    };

    // Return the matrix corresponding with the values corresponding with the
    // 'Kafig Typen' (AP04:AR09) excel table.
    getKafigTypenMatrix = function() {
        // The Kafig Typen table values.
        var R = {
            type:"R",
            values:new Array("AC", "AK", "EE")
        };
        var RD = {
            type:"RD",
            values:new Array("AC", "AK")
        };
        var RN = {
            type:"RN",
            values:new Array("KBN", "KBS")
        };
        var RNG = {
            type:"RNG",
            values:new Array("KBN", "KBS")
        };
        var NO = {
            type:"N/O",
            values:new Array("SHW", "HW")
        };
        var MV = {
            type:"M/V",
            values:new Array("SHW", "HW")
        };

        // The Kafig Typen matrix.
        var kafigTypenMatrix = new Array(R, RD, RN, RNG, NO, MV);

        return kafigTypenMatrix;
    };

    // Return the matrix corresponding with the values corresponding with the
    // 'rail' (BI12:BO77) excel table.
    getRailMatrix = function() {
        // The rail table values.
        var R1normal = {
            type:"R1normal",
            values:new Array(180, 150, 120, 10)
        };
        var R1RF = {
            type:"R1RF",
            values:new Array(150, 120, 120, 10)
        };
        var R2normal = {
            type:"R2normal",
            values:new Array(300, 300, 180, 15)
        };
        var R2RF = {
            type:"R2RF",
            values:new Array(300, 300, 180, 15)
        };
        var R3normal = {
            type:"R3normal",
            values:new Array(700, 700, 600, 25)
        };
        var R3RF = {
            type:"R3RF",
            values:new Array(600, 600, 600, 25)
        };
        var R6normal = {
            type:"R6normal",
            values:new Array(1500, 1500, 1200, 50)
        };
        var R6RF = {
            type:"R6RF",
            values:new Array(1400, 1200, 900, 50)
        };
        var R9normal = {
            type:"R9normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var R9RF = {
            type:"R9RF",
            values:new Array(1400, 1200, 900, 100)
        };
        var R12normal = {
            type:"R12normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var R12RF = {
            type:"R12RF",
            values:new Array(1400, 1200, 900, 100)
        };
        var RD1normal = {
            type:"RD1normal",
            values:new Array(300, 300, 300, 25)
        };
        var RD1RF = {
            type:"RD1RF",
            values:new Array(300, 300, 300, 25)
        };
        var RD2normal = {
            type:"RD2normal",
            values:new Array(500, 500, 500, 50)
        };
        var RD2RF = {
            type:"RD2RF",
            values:new Array(500, 500, 500, 50)
        };
        var RD3normal = {
            type:"RD3normal",
            values:new Array(1200, 1200, 1200, 50)
        };
        var RD3RF = {
            type:"RD3RF",
            values:new Array(600, 600, 600, 50)
        };
        var RD6normal = {
            type:"RD6normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var RD6RF = {
            type:"RD6RF",
            values:new Array(900, 900, 900, 100)
        };
        var RD9normal = {
            type:"RD9normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var RD9RF = {
            type:"RD9RF",
            values:new Array(900, 900, 900, 100)
        };
        var RD12normal = {
            type:"RD12normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var RD12RF = {
            type:"RD12RF",
            values:new Array(900, 900, 900, 100)
        };
        var RN3normal = {
            type:"RN3normal",
            values:new Array(700, 700, 600, 25)
        };
        var RN3RF = {
            type:"RN3RF",
            values:new Array(600, 600, 600, 25)
        };
        var RN4normal = {
            type:"RN4normal",
            values:new Array(900, 900, 600, 40)
        };
        var RN4RF = {
            type:"RN4RF",
            values:new Array(900, 900, 600, 40)
        };
        var RN6normal = {
            type:"RN6normal",
            values:new Array(1500, 1500, 1200, 50)
        };
        var RN6RF = {
            type:"RN6RF",
            values:new Array(1400, 1200, 900, 50)
        };
        var RN9normal = {
            type:"RN9normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var RN9RF = {
            type:"RN9RF",
            values:new Array(1400, 1200, 900, 100)
        };
        var RN12normal = {
            type:"RN12normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var RN12RF = {
            type:"RN12RF",
            values:new Array(1400, 1200, 900, 100)
        };
        var RNG4normal = {
            type:"RNG4normal",
            values:new Array(900, 900, 600, 25)
        };
        var RNG4RF = {
            type:"RNG4RF",
            values:new Array(900, 900, 600, 25)
        };
        var RNG6normal = {
            type:"RNG6normal",
            values:new Array(1500, 1500, 1200, 25)
        };
        /*var RNG4RF = {
            type:"RNG4RF",
            values:new Array(1400, 1200, 900, 25)
        };*/
        var RNG9normal = {
            type:"RNG9normal",
            values:new Array(1500, 1500, 1200, 25)
        };
        var RNG9RF = {
            type:"RNG9RF",
            values:new Array(1400, 1200, 900, 25)
        };
        var RNG12normal = {
            type:"RNG12normal",
            values:new Array(1500, 1500, 1200, 50)
        };
        var RNG12RF = {
            type:"RNG12RF",
            values:new Array(1400, 1200, 900, 50)
        };
        var NO62015normal = {
            type:"N/O62015normal",
            values:new Array(1500, 1200, 1200, 50)
        };
        var NO62015RF = {
            type:"N/O62015RF",
            values:new Array(900, 900, 900, 50)
        };
        var NO92025normal = {
            type:"N/O92025normal",
            values:new Array(3000, 3000, 3000, 100)
        };
        var NO92025RF = {
            type:"N/O92025RF",
            values:new Array(1300, 1300, 1300, 100)
        };
        var NO2025normal = {
            type:"N/O2025normal",
            values:new Array(3000, 3000, 3000, 100)
        };
        var NO2025RF = {
            type:"N/O2025RF",
            values:new Array(1300, 1300, 1300, 100)
        };
        var NO2535normal = {
            type:"N/O2535normal",
            values:new Array(3000, 3000, 3000, 100)
        };
        var NO2535RF = {
            type:"N/O2535RF",
            values:new Array(1300, 1300, 1300, 100)
        };
        var NO3045normal = {
            type:"N/O3045normal",
            values:new Array(3000, 3000, 3000, 100)
        };
        var NO3045RF = {
            type:"N/O3045RF",
            values:new Array(1300, 1300, 1300, 100)
        };
        var NO3555normal = {
            type:"N/O3555normal",
            values:new Array(3000, 3000, 3000, 100)
        };
        var NO3555RF = {
            type:"N/O3555RF",
            values:new Array(1300, 1300, 1300, 100)
        };
        var MV3015normal = {
            type:"M/V3015normal",
            values:new Array(1500, 1200, 1200, 40)
        };
        var MV3015RF = {
            type:"M/V3015RF",
            values:new Array(900, 900, 900, 40)
        };
        var MV4020normal = {
            type:"M/V4020normal",
            values:new Array(1500, 1200, 1200, 80)
        };
        var MV4020RF = {
            type:"M/V4020RF",
            values:new Array(900, 900, 900, 80)
        };
        var MV5025normal = {
            type:"M/V5025normal",
            values:new Array(1500, 1200, 1200, 80)
        };
        var MV5025RF = {
            type:"M/V5025RF",
            values:new Array(900, 900, 900, 80)
        };
        var MV6035normal = {
            type:"M/V6035normal",
            values:new Array(1500, 1200, 1200, 100)
        };
        var MV6035RF = {
            type:"M/V6035RF",
            values:new Array(900, 900, 900, 100)
        };
        var MV7040normal = {
            type:"M/V7040normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var MV7040RF = {
            type:"M/V7040RF",
            values:new Array(900, 900, 900, 100)
        };
        var MV8050normal = {
            type:"M/V8050normal",
            values:new Array(1500, 1500, 1200, 100)
        };
        var MV8050RF = {
            type:"M/V8050RF",
            values:new Array(900, 900, 900, 100)
        };

        // The rail matrix.
        var railMatrix = new Array(R1normal, R1RF, R2normal, R2RF, R3normal, R3RF,
            R6normal, R6RF, R9normal, R9RF, R12normal, R12RF, RD1normal, RD1RF,
            RD2normal, RD2RF, RD3normal, RD3RF, RD6normal, RD6RF, RD9normal,
            RD9RF, RD12normal, RD12RF, RN3normal, RN3RF, RN4normal, RN4RF,
            RN6normal, RN6RF, RN9normal, RN9RF, RN12normal, RN12RF, RNG4normal,
            RNG4RF, RNG6normal/*, RNG4RF*/, RNG9normal, RNG9RF, RNG12normal,
            RNG12RF, NO62015normal, NO62015RF, NO92025normal, NO92025RF, NO2025normal,
            NO2025RF, NO2535normal, NO2535RF, NO3045normal, NO3045RF, NO3555normal,
            NO3555RF, MV3015normal, MV3015RF, MV4020normal, MV4020RF, MV5025normal,
            MV5025RF, MV6035normal, MV6035RF, MV7040normal, MV7040RF, MV8050normal,
            MV8050RF);

        return railMatrix;
    };

    // Return the matrix corresponding with the values corresponding with the
    // 'Schienen Grossen' (AG04:AO09) excel table.
    getSchienenGrossenMatrix = function() {
        // The Schienen Grossen table values.
        var R = {
            type:"R",
            values:new Array(1, 2, 3, 6, 9)
        };
        var RD = {
            type:"RD",
            values:new Array(1, 2, 3, 6, 9)
        };
        var RN = {
            type:"RN",
            values:new Array(3, 4, 6, 9, 12)
        };
        var RNG = {
            type:"RNG",
            values:new Array(4, 6, 9, 12, 0/*-*/)
        };
        var NO = {
            type:"N/O",
            values:new Array(62015, 92025, 2025, 2535, 3045)
        };
        var MV = {
            type:"M/V",
            values:new Array(3015, 4020, 5025, 6035, 7040)
        };

        // The Schienen Grossen matrix.
        var schienenGrossenMatrix = new Array(R, RD, RN, RNG, NO, MV);

        return schienenGrossenMatrix;
    };

    // Return the matrix corresponding with the values corresponding with the
    // 'Schienen Grossen' (AG11:AO14) excel table.
    getSchienenGrossenRecirculatingMatrix = function() {
        // The Schienen Grossen table values.
        var SK = {
            type:"SK",
            values:new Array("1-022", "2-032", "3-075", "6-100", "6-150",
                "9-150", "9-200", "12-200")
        };
        var SKD = {
            type:"SKD",
            values:new Array("6-100", "6-150", "9-150", "9-200", "12-200")
        };
        var SKC = {
            type:"SKC",
            values:new Array("3-075", "6-100")
        };
        var SR = {
            type:"SR",
            values:new Array("2-032", "3-075", "6-100", "6-150", "9-150", "12-200")
        };

        // The Schienen Grossen matrix.
        var schienenRecirculatingGrossenMatrix = new Array(SK, SKD, SKC, SR);

        return schienenRecirculatingGrossenMatrix;
    };

    // Return the matrix corresponding with the values corresponding with the
    // 'screws' (AR60:AS70) excel table.
    getScrewsMatrix = function() {
        // The screws table values.
        var M2 = {
            type:"M2",
            values:0.0238
        };
        var M25 = {
            type:"M2.5",
            values:0.0294
        };
        var M3 = {
            type:"M3",
            values:0.0350
        };
        var M4 = {
            type:"M4",
            values:0.0469
        };
        var M5 = {
            type:"M5",
            values:0.0580
        };
        var M6 = {
            type:"M6",
            values:0.0699
        };
        var M8 = {
            type:"M8",
            values:0.0926
        };
        var M10 = {
            type:"M10",
            values:0.1152
        };
        var M12 = {
            type:"M12",
            values:0.1378
        };
        var M14 = {
            type:"M14",
            values:0.1591
        };
        var M16 = {
            type:"M16",
            values:0.1811
        };

        // The screws matrix.
        var screwsMatrix = new Array(M2, M25, M3, M4, M5, M6, M8, M10, M12, M14,
            M16);

        return screwsMatrix;
    };

    // Return the matrix corresponding with the values corresponding with the
    // 'Standard Langhen' (AG85:AU117) excel table.
    getStandardLanghenMatrix = function() {
        // The Standard Langhen table values.
        var R1 = {
            type:"R1",
            values:new Array(20, 30, 40, 50, 60, 70, 80, 100, 120)
        };
        var R2 = {
            type:"R2",
            values:new Array(30, 45, 60, 75, 90, 105, 120, 150, 180)
        };
        var R3 = {
            type:"R3",
            values:new Array(50, 75, 100, 125, 150, 175, 200, 225, 250, 275,
                300, 400, 500, 600)
        };
        var R6 = {
            type:"R6",
            values:new Array(100, 150, 200, 250, 300, 350, 400, 450, 500, 600,
                700, 800, 1000)
        };
        var R9 = {
            type:"R9",
            values:new Array(200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100,
                1200, 1400)
        };
        var R12 = {
            type:"R12",
            values:new Array(200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100,
                1200)
        };
        var RD1 = {
            type:"RD1",
            values:new Array(100, 150, 200)
        };
        var RD2 = {
            type:"RD2",
            values:new Array(200, 300, 400)
        };
        var RD3 = {
            type:"RD3",
            values:new Array(300, 400, 500, 600, 800)
        };
        var RD6 = {
            type:"RD6",
            values:new Array("-")
        };
        var RD9 = {
            type:"RD9",
            values:new Array("-")
        };
        var RD12 = {
            type:"RD12",
            values:new Array("-")
        };
        var RN3 = {
            type:"RN3",
            values:new Array(50, 75, 100, 150, 175, 200, 225, 250, 275, 300)
        };
        var RN4 = {
            type:"RN4",
            values:new Array(80, 120, 160, 200, 240, 280, 320, 360, 400)
        };
        var RN6 = {
            type:"RN6",
            values:new Array(100, 150, 200, 250, 300, 350, 400, 450, 500)
        };
        var RN9 = {
            type:"RN9",
            values:new Array(200, 300, 400, 500, 600, 700, 800)
        };
        var RN12 = {
            type:"RN12",
            values:new Array(200, 300, 400, 500, 600, 700, 800, 900, 1000)
        };
        var RNG4 = {
            type:"RNG4",
            values:new Array(50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300)
        };
        var RNG6 = {
            type:"RNG6",
            values:new Array(100, 150, 200, 250, 300, 350, 400)
        };
        var RNG9 = {
            type:"RNG9",
            values:new Array(100, 150, 200, 250, 300, 350, 400, 450, 500)
        };
        var RNG12 = {
            type:"RNG12",
            values:new Array(200, 300, 400, 500, 600, 700, 800, 900, 1000)
        };
        var NO62015 = {
            type:"N/O62015",
            values:new Array(100, 150, 200, 250, 300, 350, 400, 450, 500)
        };
        var NO92025 = {
            type:"N/O92025",
            values:new Array(200, 300, 400, 500, 600, 700, 800)
        };
        var NO2025 = {
            type:"N/O2025",
            values:new Array(200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100,
                1200, 1400, 1600)
        };
        var NO2535 = {
            type:"N/O2535",
            values:new Array(300, 400, 500, 600, 700, 800, 900, 1000, 1100,
                1200, 1400, 1600)
        };
        var NO3045 = {
            type:"N/O3045",
            values:new Array(400, 500, 600, 700, 800, 900, 1000, 1100, 1200,
                1400, 1600)
        };
        var NO3555 = {
            type:"N/O3555",
            values:new Array(500, 600, 700, 800, 900, 1000, 1100, 1200, 1400, 1600)
        };
        var MV3015 = {
            type:"M/V3015",
            values:new Array(100, 150, 200, 300, 400, 500, 600)
        };
        var MV4020 = {
            type:"M/V4020",
            values:new Array(100, 150, 200, 300, 400, 500, 600)
        };
        var MV5025 = {
            type:"M/V5025",
            values:new Array(100, 200, 300, 400, 500, 600, 700, 800, 900, 1000)
        };
        var MV6035 = {
            type:"M/V6035",
            values:new Array(200, 300, 400, 500, 600, 700, 800, 900, 1000)
        };
        var MV7040 = {
            type:"M/V7040",
            values:new Array(200, 300, 400, 500, 600, 700, 800, 900, 1000)
        };
        var MV8050 = {
            type:"M/V8050",
            values:new Array(300, 400, 500, 600, 700, 800, 900, 100)
        };

        // The Standard Langhen matrix.
        var standardLanghenMatrix = new Array(R1, R2, R3, R6, R9, R12, RD1, RD2,
            RD3, RD6, RD9, RD12, RN3, RN4, RN6, RN9, RN12, RNG4, RNG6, RNG9, RNG12, NO62015, NO92025,
            NO2025, NO2535, NO3045, NO3555, MV3015, MV4020, MV5025, MV6035, MV7040,
            MV8050);

        return standardLanghenMatrix;
    };

    // Return the matrix corresponding with the values corresponding with the
    // 'Umlaufkorper' (BI86:BK106) excel table.
    getUmlaufkorperMatrix = function() {
        // The Umlaufkorper table values.
        var SK1022 = {
            type:"SK1-022",
            values:new Array(63, 2)
        };
        var SK2032 = {
            type:"SK2-032",
            values:new Array(135, 2)
        };
        var SK3075 = {
            type:"SK3-075",
            values:new Array(425, 2)
        };
        var SK6100 = {
            type:"SK6-100",
            values:new Array(715, 2)
        };
        var SK6150 = {
            type:"SK6-150",
            values:new Array(1170, 3)
        };
        var SK9150 = {
            type:"SK-9150",
            values:new Array(1650, 2)
        };
        var SK9200 = {
            type:"SK9-200",
            values:new Array(2550, 2)
        };
        var SK12200 = {
            type:"SK12-200",
            values:new Array(2860, 2)
        };
        var SKD6100 = {
            type:"SKD6-100",
            values:new Array(650, 2)
        };
        var SKD6150 = {
            type:"SKD6-150",
            values:new Array(1100, 3)
        };
        var SKD9150 = {
            type:"SKD9-150",
            values:new Array(1500, 2)
        };
        var SKD9200 = {
            type:"SKD9-200",
            values:new Array(2400, 2)
        };
        var SKD12200 = {
            type:"SKD12-200",
            values:new Array(2600, 2)
        };
        var SKC3075 = {
            type:"SKC3-075",
            values:new Array(75, 2)
        };
        var SKC6100 = {
            type:"SKC6-100",
            values:new Array(125, 2)
        };
        var SR2032 = {
            type:"SR2-032",
            values:new Array(380, 2)
        };
        var SR3075 = {
            type:"SR3-075",
            values:new Array(850, 2)
        };
        var SR6100 = {
            type:"SR6-100",
            values:new Array(2150, 2)
        };
        var SR6150 = {
            type:"SR6-150",
            values:new Array(3750, 3)
        };
        var SR9150 = {
            type:"SR9-150",
            values:new Array(5850, 2)
        };
        var SR12200 = {
            type:"SR12-200",
            values:new Array(10000, 2)
        };

        // The Umlaufkorper matrix.
        var umlaufkorperMatrix = new Array(SK1022, SK2032, SK3075, SK6100, SK6150,
            SK9150, SK9200, SK12200, SKD6100, SKD6150, SKD9150, SKD9200, SKD12200,
            SKC3075, SKC6100, SR2032, SR3075, SR6100, SR6150, SR9150, SR12200);

        return umlaufkorperMatrix;
    };

})(jQuery);


(function($){
    // Search the 'cageType + w' in the excel table 'Auswahl' (AU4:AW24) and
    // take, for the corresponding element, the 3rd value of the table.
    getAM22 = function() {
        // Get the excel 'Auswahl' table data into a matrix.
        var auswahlMatrix = getAuswahlMatrix();

        // Get the cage type (N13).
        var cageType = document.getElementById(cagetype).value;

        var AH31 = "w";
        var AY3 = cageType + AH31;

        var AM22 = 0;
        var i = 0;
        while (i < auswahlMatrix.length) {
            if (auswahlMatrix[i].type == AY3) {
                AM22 = auswahlMatrix[i].values;
                break;
            }

            i++;
        }

        return AM22;
    };

    // Search the 'cageType + t' in the excel table 'Auswahl' (AU4:AW24) and
    // take, for the corresponding element, the 3rd value of the table.
    getAN22 = function() {
        // Get the excel 'Auswahl' table data into a matrix.
        var auswahlMatrix = getAuswahlMatrix();

        // Get the cage type (N13).
        var cageType = document.getElementById(cagetype).value;

        var AI31 = "t";
        var AZ3 = cageType + AI31;

        var AN22 = 1;
        var i = 0;
        while (i < auswahlMatrix.length) {
            if (auswahlMatrix[i].type == AZ3) {
                AN22 = auswahlMatrix[i].values;
                break;
            }

            i++;
        }

        return AN22;
    };

    // Search the 'cageType + o' in the excel table 'Auswahl' (AU4:AW24) and
    // take, for the corresponding element, the 3rd value of the table.
    getAO22 = function() {
        // Get the excel 'Auswahl' table data into a matrix.
        var auswahlMatrix = getAuswahlMatrix();

        // Get the cage type (N13).
        var cageType = document.getElementById(cagetype).value;

        var AJ31 = "o";
        var BA3 = cageType + AJ31;

        var AO22 = 0;
        var j = 0;
        while (j < auswahlMatrix.length) {
            if (auswahlMatrix[j].type == BA3) {
                AO22 = auswahlMatrix[j].values;
                break;
            }

            j++;
        }

        return AO22;
    };

    getAP19 = function() {
        // Get the rail length (F15).
        var railLength = document.getElementById(raillength).value;
        // Get the stroke (N14).
        var stroke = document.getElementById(strokevar).value;

        // Set the cage length value.
        var AM19 = railLength - (stroke / 2);

        // Search the 'cageType + w' in the excel table 'Auswahl' (AU4:AW24) and
        // take, for the corresponding element, the 3rd value of the table.
        var AM22 = getAM22();

        // Search the 'cageType + o' in the excel table 'Auswahl' (AU4:AW24) and
        // take, for the corresponding element, the 3rd value of the table.
        var AO22 = getAO22();

        var AN19 = AM19 - (2 * AM22) - AO22;

        // Search the 'cageType + t' in the excel table 'Auswahl' (AU4:AW24) and
        // take, for the corresponding element, the 3rd value of the table.
        var AN22 = getAN22();

        var AO19 = AN19 / AN22;
        var AP19 = Math.floor(AO19);

        return AP19;
    };

    getCageLength = function() {
        // Search the 'cageType + w' in the excel table 'Auswahl' (AU4:AW24) and
        // take, for the corresponding element, the 3rd value of the table.
        var AM22 = getAM22();

        // Search the 'cageType + o' in the excel table 'Auswahl' (AU4:AW24) and
        // take, for the corresponding element, the 3rd value of the table.
        var AO22 = getAO22();

        // Search the 'cageType + t' in the excel table 'Auswahl' (AU4:AW24) and
        // take, for the corresponding element, the 3rd value of the table.
        var AN22 = getAN22();

        // Get the AP19 variable content.
        var AP19 = getAP19();

        // Get the cage length value.
        var cageLength = (AP19 * AN22) + (2 * AM22) + AO22;

        return cageLength;
    };

    getCrecirculatingUnit = function() {
        // Get the recirculating type (F42).
        var type = document.getElementById(recirculatingtype).value;
        // Get the recirculating size (F43).
        var size = document.getElementById(recirculatingsize).value;

        var BI83 = type + size;

        var umlaufkorperMatrix = getUmlaufkorperMatrix();
        var cRecirculatingUnit = 0;

        var i = 0;
        while (i < umlaufkorperMatrix.length) {
            if (umlaufkorperMatrix[i].type == BI83) {
                cRecirculatingUnit = umlaufkorperMatrix[i].values[0];
                break;
            }

            i++;
        }

        return cRecirculatingUnit;
    };

    // Search the 'railType + cageType + railSize' in the excel table 'C/roller [N]'
    // (BR12:BW78) and take, for the corresponding element, the 3rd value of the table.
    getCrollingElement = function() {
        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;
        // Get the cage type (N13).
        var cageType = document.getElementById(cagetype).value;
        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;

        var BR9 = railType + cageType + railSize;

        var crollerMatrix = getCrollerMatrix();
        var cRollingElement = 0;

        var i = 0;
        while (i < crollerMatrix.length) {
            if (crollerMatrix[i].type == BR9) {
                cRollingElement = crollerMatrix[i].values;
                break;
            }

            i++;
        }

        return cRollingElement;
    };

    // Search the 'BR9' in the excel table 'Factor f' (BR12:BW78) and take, for
    // the corresponding element, the 6th value of the table.
    getFactorFvalue = function(BR9) {
        var fValue;
        if (BR9 == "RAC1" || BR9 ==  "RAC2" || BR9 ==  "RAC3" || BR9 ==  "RAC6"
            || BR9 ==  "RAC9" || BR9 ==  "RAC12" || BR9 ==  "RDAC1" || BR9 ==  "RDAC2"
            || BR9 ==  "RDAC3" || BR9 ==  "RDAC6" || BR9 ==  "RDAC9" || BR9 ==  "RDAC12"
            || BR9 ==  "REE6" || BR9 ==  "REE9" || BR9 ==  "RDEE6" || BR9 ==  "RDEE9"
            || BR9 ==  "RNKBN3" || BR9 ==  "RNKBN4" || BR9 ==  "RNKBN6" || BR9 ==  "RNKBN9"
            || BR9 ==  "RNKBN12" || BR9 ==  "RNGKBN3" || BR9 ==  "RNGKBN4"
            || BR9 ==  "RNGKBN6" || BR9 ==  "RNGKBN9" || BR9 ==  "RNGKBN12"
            || BR9 ==  "RNKBS3" || BR9 ==  "RNKBS4" || BR9 ==  "RNKBS6" || BR9 ==  "RNKBS9"
            || BR9 ==  "RNGKBS3" || BR9 ==  "RNGKBS4" || BR9 ==  "RNGKBS6"
            || BR9 ==  "RNGKBS9") {

            fValue = 1;
        }
        else /*if (BR9 == "RAK1" || BR9 ==  "RAK2" || BR9 ==  "RAK3" || BR9 ==  "RAK6"
            || BR9 ==  "RAK9" || BR9 ==  "RAK12" || BR9 ==  "RDAK1" || BR9 ==  "RDAK2"
            || BR9 ==  "RDAK3" || BR9 ==  "RDAK6" || BR9 ==  "RDAK9" || BR9 ==  "RDAK12"
            || BR9 ==  "N/OHW62015" || BR9 ==  "N/OHW92025" || BR9 ==  "N/OHW2535"
            || BR9 ==  "N/OHW3045" || BR9 ==  "N/OHW3555" || BR9 ==  "M/VHW3015"
            || BR9 ==  "M/VHW4020" || BR9 ==  "M/VHW5025" || BR9 ==  "M/VHW6035"
            || BR9 ==  "M/VHW7040" || BR9 ==  "M/VHW8050" || BR9 ==  "N/OSHW92025"
            || BR9 ==  "N/OSHW2025" || BR9 ==  "N/OSHW2535" || BR9 ==  "N/OSHW3045"
            || BR9 ==  "N/OSHW3555" || BR9 ==  "M/VSHW4025" || BR9 ==  "M/VSHW5025"
            || BR9 ==  "M/VSHW6035" || BR9 ==  "M/VSHW7040" || BR9 ==  "M/VSHW8050")*/ {

            fValue = 2;
        }

        return fValue;
    };

    getMaxRailLength = function(matrixValues) {
        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;
        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;
        // Get the steel type (F17).
        var steelType = document.getElementById(steeltype).value;

        // BI9 = BK9 = BM9.
        var BI9 = railType + railSize + steelType;

        // Return the matrix corresponding with the values corresponding with the
        // 'rail' (BI12:BO77) excel table.
        var railMatrix = getRailMatrix();

        var maxRailLength = 0;
        var i = 0;
        while (i < railMatrix.length) {
            if (railMatrix[i].type == BI9) {
                maxRailLength = railMatrix[i].values[matrixValues];
                break;
            }

            i++;
        }

        return maxRailLength;
    };

    // Y10.
    getMountingholeDistanceL1 = function() {
        // Get the l1 matrix.
        var l1Matrix = getRailMatrix();

        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;
        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;
        // Get the steel type (F17).
        var steelType = document.getElementById(steeltype).value;

        var BI9 = railType + railSize + steelType;

        // Get the mountinghole distance l1 value.
        var mountingholeDistanceL1 = 0;
        var i = 0;
        while (i < l1Matrix.length) {
            if (l1Matrix[i].type == BI9) {
                mountingholeDistanceL1 = l1Matrix[i].values[3];
                break;
            }

            i++;
        }

        // Return the mountinghole distance l1 value.
        return mountingholeDistanceL1;
    };

    getNumberOfPreloadScrews = function() {
        // Get the recirculating type (F42).
        var type = document.getElementById(recirculatingtype).value;
        // Get the recirculating size (F43).
        var size = document.getElementById(recirculatingsize).value;

        var BI83 = type + size;

        var umlaufkorperMatrix = getUmlaufkorperMatrix();
        var numberOfPreloadScrews;

        var i = 0;
        while (i < umlaufkorperMatrix.length) {
            if (umlaufkorperMatrix[i].type == BI83) {
                numberOfPreloadScrews = umlaufkorperMatrix[i].values[1];
                break;
            }

            i++;
        }

        return numberOfPreloadScrews;
    };

    getRailForcePerScrewPvs = function() {
        var Y10 = getMountingholeDistanceL1();

        var AN22 = getAN22();

        var Y17 = getCrollingElement();

        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;
        // Get the cage type (N13).
        var cageType = document.getElementById(cagetype).value;
        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;

        var BR9 = railType + cageType + railSize;

        // Search the 'railType + cageType + railSize' in the excel table
        // 'Factor f' and take, for the corresponding element, the 6th value
        // of the table.
        var AM74 = getFactorFvalue(BR9);

        // Get the cage type (N20).
        var preloadP = document.getElementById(preload).value;

        var railForcePerScrewPvs = Y10 / AN22 * Y17 * preloadP / 100 * AM74;

        return railForcePerScrewPvs;
    };

    getRailForcePerScrewPvsRecirculating = function() {
        var Z39 = getNumberOfPreloadScrews();
        var Y41 = getCrecirculatingUnit();
        // Get the recirculating preload (N46).
        var recirculatingPreload = document.getElementById(recirculatingpreload).value;

        var railForcePerScrewPvsRecirculating = 1 / Z39 * (2 * Y41) * recirculatingPreload / 100;

        return railForcePerScrewPvsRecirculating;
    };

    getRailLengthValues = function() {
        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;
        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;

        var AG82 = railType + railSize;

        var standardLanghenMatrix = getStandardLanghenMatrix();
        var railLengthValues = new Array();

        var i = 0;
        while (i < standardLanghenMatrix.length) {
            if (standardLanghenMatrix[i].type == AG82) {
                railLengthValues = standardLanghenMatrix[i].values;
                break;
            }

            i++;
        }

        return railLengthValues;
    };

    getRailRecommendedTighteningTorquesMds = function(recirculating) {
        // Get the adjusting screw (N19) value.
        var adjustingScrew;
        if (recirculating == 0) {
            adjustingScrew = document.getElementById(adjustingscrew).value;
        }
        else {
            adjustingScrew = document.getElementById(reirculatingadjustingscrew).value;
        }

        // Get the rail force per screw pvs (Y12) value.
        var railForcePerScrewPvs;
        if (recirculating == 0) {
            railForcePerScrewPvs = getRailForcePerScrewPvs();
        }
        else {
            railForcePerScrewPvs = getRailForcePerScrewPvsRecirculating();
        }

        var screwsMatrix = getScrewsMatrix();

        var railRecommendedTighteningTorquesMds = 0;

        // Search the 'adjusting screw' in the excel table 'screws' (AR60:AS70)
        // and take, for the corresponding element, the 2nd value of the table.
        var i = 0;
        while (i < screwsMatrix.length) {
            if (screwsMatrix[i].type == adjustingScrew) {
                railRecommendedTighteningTorquesMds = screwsMatrix[i].values;
                break;
            }

            i++;
        }

        railRecommendedTighteningTorquesMds = railRecommendedTighteningTorquesMds * railForcePerScrewPvs;

        return railRecommendedTighteningTorquesMds;
    };

    getRailRecommendedTighteningTorquesMds2 = function(recirculating) {
        // N30.
        var railRecommendedTighteningTorquesMds = getRailRecommendedTighteningTorquesMds(recirculating);

        var railRecommendedTighteningTorquesMds2 = railRecommendedTighteningTorquesMds * 0.0885075;

        return railRecommendedTighteningTorquesMds2;
    };

    getRailSizeValues = function() {
        // Get the rail type (F13).
        var railType = document.getElementById(railtype).value;

        var schienenGrossenMatrix = getSchienenGrossenMatrix();
        var railSizeArray = new Array();

        var i = 0;
        while (i < schienenGrossenMatrix.length) {
            if (schienenGrossenMatrix[i].type == railType) {
                railSizeArray = schienenGrossenMatrix[i].values;
                break;
            }

            i++;
        }

        return railSizeArray;
    };

    getRailTypeValues = function() {
        var schienenGrossenMatrix = getSchienenGrossenMatrix();
        var railTypeValues = new Array();

        var i = 0;
        while (i < schienenGrossenMatrix.length) {
            railTypeValues.push(schienenGrossenMatrix[i].type);

            i++;
        }

        return railTypeValues;
    };

    getRecirculatingSizeValues = function() {
        // Get the rail type (F42).
        var recirculatingType = document.getElementById(recirculatingtype).value;

        var schienenRecirculatingGrossenMatrix = getSchienenGrossenRecirculatingMatrix();
        var recirculatingSizeArray = new Array();

        var i = 0;
        while (i < schienenRecirculatingGrossenMatrix.length) {
            if (schienenRecirculatingGrossenMatrix[i].type == recirculatingType) {
                recirculatingSizeArray = schienenRecirculatingGrossenMatrix[i].values;
                break;
            }

            i++;
        }

        return recirculatingSizeArray;
    };

    getRecirculatingTypeValues = function() {
        var schienenRecirculatingGrossenMatrix = getSchienenGrossenRecirculatingMatrix();
        var recirculatingTypeValues = new Array();

        var i = 0;
        while (i < schienenRecirculatingGrossenMatrix.length) {
            recirculatingTypeValues.push(schienenRecirculatingGrossenMatrix[i].type);

            i++;
        }

        return recirculatingTypeValues;
    };

})(jQuery);


// Default values.
var defaultStrokeValue = 10;

// Elements.
var adjustingscrew = "adjustingscrew";
var cageLengthVar = "cageLength";
var cagetype = "cagetype";
var cRecirculatingUnitVar = "cRecirculatingUnit";
var cRollingElementVar = "cRollingElement";
var customer = "customer";
var distanceRollingElementTVar = "distanceRollingElementT";
var editor = "editor";
var errors = "errors";
var maxPossibleStrokeVar = "maxPossibleStroke";
var maxRailLengthNormalVar = "maxRailLengthNormal";
var maxRailLengthSQVar = "maxRailLengthSQ";
var maxRailLengthSSQVar = "maxRailLengthSSQ";
var minimumRailLengthVar = "minimumRailLength";
var mountingholeDistanceL1Var = "mountingholeDistanceL1";
var numberOfPreloadScrewsVar = "numberOfPreloadScrews";
var preload = "preload";
var project = "project";
var railForcePerScrewPvsVar = "railForcePerScrewPvs";
var railForcePerScrewPvsRecirculatingVar = "railForcePerScrewPvsRecirculating";
var raillength = "raillength";
var railquality = "railquality";
var railRecommendedTighteningTorquesMdsVar = "railRecommendedTighteningTorquesMds";
var railRecommendedTighteningTorquesMds2Var = "railRecommendedTighteningTorquesMds2";
var railRecommendedTighteningTorquesMds3Var = "railRecommendedTighteningTorquesMds3";
var railsize = "railsize";
var railtype = "railtype";
var reirculatingadjustingscrew = "reirculatingadjustingscrew";
var recirculatingpreload = "recirculatingpreload";
var recirculatingRecommendedTighteningTorquesMds = "recirculatingRecommendedTighteningTorquesMds";
var recirculatingRecommendedTighteningTorquesMds2 = "recirculatingRecommendedTighteningTorquesMds2";
var recirculatingRecommendedTighteningTorquesMds3 = "recirculatingRecommendedTighteningTorquesMds3";
var recirculatingsize = "recirculatingsize";
var recirculatingtype = "recirculatingtype";
var rollingElements = "rollingElements";
var steeltype = "steeltype";
var strokevar = "stroke";

// Strings.
var error1 = "<p style='color:red'>Rail length is not standard for this rail size!</p>";
var error2 = "<p style='color:red'>Check relationship stroke to rail length!</p>";
var error3 = "<p style='color:red'>This rail / cage combination does not exist!</p>";
var millimeters = " mm";
var newtons = " N";
var newtonPerCentimeter = " Ncm";
var ounceInch = " ounce-inch (oz-in)";
var poundInch = " pound-inch (lbf-in)";


(function($){
    // Rail & cage - Result.
    setCageLength = function() {
        // Get the cage length value.
        var cageLength = getCageLength();

        // Set the cage length value.
        document.getElementById(cageLengthVar).innerHTML = cageLength + millimeters;
    };

    setNumberOfRollingElements = function() {
        // Get the AP19 variable content.
        var AP19 = getAP19();

        // Get the rail size (F14).
        var railSize = document.getElementById(railsize).value;

        // Search the 'rail size' in the excel table 'Kafige' (AG32:BD50) and
        // take, for the corresponding element, the 24th value of the table.
        var AX4;
        // The values are the following (railSize:value):
        // 1:1, 2:1, 3:1, 4:1, 6:1, 9:1, 12:1, 62015:2, 92025:2, 2025:2, 2535:2,
        // 3045:2, 3555:2, 3015:2, 4020:2, 5025:2, 6035:2, 7040:2, 8050:2 .
        if (railSize <= 12) {
            AX4 = 1;
        }
        else {
            AX4 = 2;
        }

        var numberOfRollingElements = (AP19 + 1) * AX4;

        // Set the number of rolling elements value.
        document.getElementById(rollingElements).innerHTML = numberOfRollingElements;
    };

    setMaxPossibleStroke = function() {
        // Get the rail length (F15).
        var railLength = document.getElementById(raillength).value;
        // Get the cagee length (N25).
        var cageLength = getCageLength();

        var maxPossibleStroke = (railLength - cageLength) * 2;
        // Note: the round is not present in the excel formula, but is used to
        // obtain the same result.
        // Round the number to one decimal.
        maxPossibleStroke = maxPossibleStroke.toFixed(1);

        // Set the max possible stroke value.
        document.getElementById(maxPossibleStrokeVar).innerHTML = maxPossibleStroke + millimeters;
    };

    setRailRecommendedTighteningTorquesMds = function(recirculating) {
        var railRecommendedTighteningTorquesMds;
        if (recirculating == 0) {
            railRecommendedTighteningTorquesMds = getRailRecommendedTighteningTorquesMds(0);
        }
        else {
            railRecommendedTighteningTorquesMds = getRailRecommendedTighteningTorquesMds(1);
        }

        // Note: the round is not present in the excel formula, but is used to
        // obtain the same result.
        // Round the number to two decimals.
        railRecommendedTighteningTorquesMds = railRecommendedTighteningTorquesMds.toFixed(2);

        // Set the rail recommended tightening torques mds value.
        if (recirculating == 0) {
            document.getElementById(railRecommendedTighteningTorquesMdsVar).innerHTML = railRecommendedTighteningTorquesMds + newtonPerCentimeter;
        }
        else {
            document.getElementById(recirculatingRecommendedTighteningTorquesMds).innerHTML = railRecommendedTighteningTorquesMds + newtonPerCentimeter;
        }
    };

    setRailRecommendedTighteningTorquesMds2 = function(recirculating) {
        var railRecommendedTighteningTorquesMds2;
        if (recirculating == 0) {
            railRecommendedTighteningTorquesMds2 = getRailRecommendedTighteningTorquesMds2(0);
        }
        else {
            railRecommendedTighteningTorquesMds2 = getRailRecommendedTighteningTorquesMds2(1);
        }

        // Note: the round is not present in the excel formula, but is used to
        // obtain the same result.
        // Round the number to two decimals.
        railRecommendedTighteningTorquesMds2 = railRecommendedTighteningTorquesMds2.toFixed(2);

        // Set the rail recommended tightening torques mds second value.
        if (recirculating == 0) {
            document.getElementById(railRecommendedTighteningTorquesMds2Var).innerHTML = railRecommendedTighteningTorquesMds2 + poundInch;
        }
        else {
            document.getElementById(recirculatingRecommendedTighteningTorquesMds2).innerHTML = railRecommendedTighteningTorquesMds2 + poundInch;
        }
    };

    setRailRecommendedTighteningTorquesMds3 = function(recirculating) {
        var railRecommendedTighteningTorquesMds2;
        if (recirculating == 0) {
            // N31.
            railRecommendedTighteningTorquesMds2 = getRailRecommendedTighteningTorquesMds2(0);
        }
        else {
            // N53.
            railRecommendedTighteningTorquesMds2 = getRailRecommendedTighteningTorquesMds2(1);
        }

        var railRecommendedTighteningTorquesMds3 = railRecommendedTighteningTorquesMds2 * 16;

        // Note: the round is not present in the excel formula, but is used to
        // obtain the same result.
        // Round the number to two decimals.
        railRecommendedTighteningTorquesMds3 = railRecommendedTighteningTorquesMds3.toFixed(2);

        // Set the rail recommended tightening torques mds third value.
        if (recirculating == 0) {
            document.getElementById(railRecommendedTighteningTorquesMds3Var).innerHTML = railRecommendedTighteningTorquesMds3 + ounceInch;
        }
        else {
            document.getElementById(recirculatingRecommendedTighteningTorquesMds3).innerHTML = railRecommendedTighteningTorquesMds3 + ounceInch;
        }
    };

    // Rail & cage - Calculated and stored data.
    setMountingholeDistanceL1 = function() {
        // Get the mountinghole distance l1 value.
        var mountingholeDistanceL1 = getMountingholeDistanceL1();

        // Set the mountinghole distance l1 value.
        document.getElementById(mountingholeDistanceL1Var).innerHTML = mountingholeDistanceL1 + millimeters;
    };

    setDistanceRollingElementT = function() {
        // Get the cage type (N13).
        var cageType = document.getElementById(cagetype).value;

        var AI31 = "t";
        var AZ3 = cageType + AI31;

        // Get the excel 'Auswahl' table data into a matrix.
        var auswahlMatrix = getAuswahlMatrix();

        var distanceRollingElementT = 0;
        var i = 0;
        while (i < auswahlMatrix.length) {
            if (auswahlMatrix[i].type == AZ3) {
                distanceRollingElementT = auswahlMatrix[i].values;
                break;
            }

            i++;
        }

        // Set the distance rolling element t value.
        document.getElementById(distanceRollingElementTVar).innerHTML = distanceRollingElementT + millimeters;
    };

    setRailForcePerScrewPvs = function() {
        // Note: the round is not present in the excel formula, but is used to
        // obtain the same result at screen.
        var railForcePerScrewPvs = Math.round(getRailForcePerScrewPvs());

        // Set the rail force per screw pvs value.
        document.getElementById(railForcePerScrewPvsVar).innerHTML = railForcePerScrewPvs + newtons;
    };

    setMinimumRailLength = function() {
        // Get the cagee length (N25).
        var cageLength = getCageLength();

        // Get the stroke (N14).
        var stroke = document.getElementById(strokevar).value;

        var minimumRailLength = cageLength + (stroke / 2);

        // Set the minimum rail length value.
        document.getElementById(minimumRailLengthVar).innerHTML = minimumRailLength + millimeters;
    };

    setMaxRailLengthNormal = function() {
        var maxRailLengthNormal = getMaxRailLength(0);

        // Set the max rail length normal value.
        document.getElementById(maxRailLengthNormalVar).innerHTML = maxRailLengthNormal + millimeters;
    };

    setMaxRailLengthSQ = function() {
        var maxRailLengthSQ = getMaxRailLength(1);

        // Set the max rail length normal value.
        document.getElementById(maxRailLengthSQVar).innerHTML = maxRailLengthSQ + millimeters;
    };

    setMaxRailLengthSSQ = function() {
        var maxRailLengthSSQ = getMaxRailLength(2);

        // Set the max rail length normal value.
        document.getElementById(maxRailLengthSSQVar).innerHTML = maxRailLengthSSQ + millimeters;
    };

    setCRollingElement = function() {
        var cRollingElement = getCrollingElement();

        // Set the C / rolling element value.
        document.getElementById(cRollingElementVar).innerHTML = cRollingElement + newtons;
    };

    // Recalculating Unit - Calculated and stored data.
    setNumberOfPreloadScrews = function() {
        var numberOfPreloadScrews = getNumberOfPreloadScrews();

        // Set the number of preload screws value.
        document.getElementById(numberOfPreloadScrewsVar).innerHTML = numberOfPreloadScrews;
    };

    setRecirculatingForcePerScrewPvs = function() {
        //var railForcePerScrewPvsRecirculating = getRailForcePerScrewPvsRecirculating();

        // Note: the round is not present in the excel formula, but is used to
        // obtain the same result at screen.
        var railForcePerScrewPvsRecirculating = Math.round(getRailForcePerScrewPvsRecirculating());

        // Set the rail force per screw pvs recirculating value.
        document.getElementById(railForcePerScrewPvsRecirculatingVar).innerHTML = railForcePerScrewPvsRecirculating + newtons;
    };

    setCRecirculatingUnit = function() {
        var cRecirculatingUnit = getCrecirculatingUnit();

        // Set the c recirculating unit value.
        document.getElementById(cRecirculatingUnitVar).innerHTML = cRecirculatingUnit + newtons;
    };

})(jQuery);

