






	










		window.CordovaPlatform = "None";
		if (navigator.userAgent.toLowerCase().match(/android/)) {
			document.write('<script charset="utf-8" src="js\/cordova-2.1.0-android.js"><\/script>');
			document.write('<script charset="utf-8" src="js\/android-todataurl.js"><\/script>');
			window.CordovaPlatform = "Android";
		} else if (navigator.userAgent.toLowerCase().match(/iphone/) || navigator.userAgent.toLowerCase().match(/ipad/)) {
			document.write('<script charset="utf-8" src="js\/cordova-2.2.0rc1-ios.js"><\/script>');
			window.CordovaPlatform = "iOS";
		}
	




	

$(document).on("pageinit", "#dialog-delete-confirm", function() {

	$("#dialog-delete-delete").on("tap", function(event) {
		event.preventDefault();

		Spending.state.deleteCallback(Spending.state.deleteUUID);
	});

});

$(document).on("pagebeforeshow", "#dialog-delete-confirm", function () {
	Spending.getExpense( Spending.state.deleteUUID, function (expense) {
		$("#dialog-delete-note").html(expense.note !== "" ? '"' + expense.note + '"' : "");
		$("#dialog-delete-type").html(Spending.state.deleteType);
	});
});



Spending = window.Spending || {};
Spending.rawCategories = [{"children": [{"name": "Coffee & tea", "id": "5517120E7EB1F205EFCC57D458E81168"}, {"name": "Lunches - bought", "id": "9139209FC9AAC1ADC44CC4D33D6081E4"}, {"name": "Take-away & snacks", "id": "83BAD81A25B8DC88B4B18D5DEF13297A"}, {"name": "Cigarettes", "id": "3AE0A176B5D57088313562DE2EFC0314"}, {"name": "Drinks & alcohol", "id": "55391153F14DD7C980141F0410FBFAD5"}, {"name": "Bars & clubs", "id": "20396C8963FCC67831B9951E379680BB"}, {"name": "Restaurants", "id": "8E713EC195E88FB378ECAD914E0A14E6"}, {"name": "Books", "id": "D439504FE451316301B25E0F2255DE51"}, {"name": "Newspaper & magazines", "id": "6E18F53C4194D555FD74796B146909D6"}, {"name": "Movies & music", "id": "E34384960A8CA10DD143440FE490E80E"}, {"name": "Holidays", "id": "73650B73D553B87EC6FFBAA3E76DC0C1"}, {"name": "Celebrations & gifts", "id": "334A20224F24B4BFC1359C9A78143A52"}], "name": "Entertainment & Eat-out", "id": "7EE06A37DFC13D331A646E936EF1AE8E"}, {"children": [{"name": "Supermarket", "id": "E2831D9AB4DC3CE126E7C91872DFC4E5"}, {"name": "Butcher", "id": "B74BECF4AD1955B4D3E761896161DD22"}, {"name": "Fruit & veg market", "id": "A73DA0BD4C5EA41E4A9371C6D9A28E2F"}, {"name": "Fish shop", "id": "85CD9F62B9461F942B8FC68BF54BE22C"}, {"name": "Deli & baker", "id": "7B3F3195B7CFCF83FC469F575CB0B8D2"}, {"name": "Pet food", "id": "DBE5CCE19126AA7C1CD3F2C5C84E1465"}], "name": "Groceries", "id": "7C3765BF72361083D820071FB21308A9"}, {"children": [{"name": "Cosmetics & toiletries", "id": "850766C1C2DC1E5556075D8E501FDC98"}, {"name": "Hair & beauty", "id": "D81F3BC1F2884BCA4E874B9EB8CDE615"}, {"name": "Medicines & pharmacy", "id": "1BF0DA8755CCE602DD3FFC39F89087E1"}, {"name": "Glasses & eye care", "id": "7D802BB2C429FD6A387F95DA0C942492"}, {"name": "Dental", "id": "B4AB2F5CDF7BF421E6F52B818C25870E"}, {"name": "Doctors & medical", "id": "D5F03C922FEFA21BBD1F4E0D07A58AA0"}, {"name": "Hobbies", "id": "8445F0D7F28201458CA6D60DF75BBF8F"}, {"name": "Clothing & shoes", "id": "42B9ED7979712F67CE93D5DB83F28ED1"}, {"name": "Jewellery & accessories", "id": "3DE2B960CDAB5AEBB0F5C93197C1D62A"}, {"name": "Computers & gadgets", "id": "62A3889F981147475C04F098C3CFDA72"}, {"name": "Sports & gym", "id": "03017CD1D7EED25525F446145BB09B8A"}, {"name": "Education", "id": "6C86329C13B44AF12604325B8269604C"}, {"name": "Pet care & vet", "id": "2490B35258A9F4CB1F0C7395387A6CC7"}], "name": "Personal & Medical", "id": "E87657C435350B409F16B79344E2BD3F"}, {"children": [{"name": "Bus & train & ferry", "id": "E0190126A2762A39400D65E3C2C9D3CB"}, {"name": "Petrol", "id": "6D0009D8DBE7AE325EADB8B1E4F10B44"}, {"name": "Road tolls & parking", "id": "FC2FBD0E58CFCD32D058F2E65B0F23F5"}, {"name": "Rego & licence", "id": "E22110E23865FFAB0222F452CFEE016D"}, {"name": "Repairs & maintenance", "id": "B6458570BCC00BD726026A7421DA04EE"}, {"name": "Fines", "id": "4E37D928A2A7947D5FE535DC1614576B"}, {"name": "Airfares", "id": "F6F1B2A827FF63EF89AC825EFF95C059"}], "name": "Transport & Auto", "id": "3E44584685B12E525A740BEEB5AD1EA1"}, {"children": [{"name": "Mortgage & rent", "id": "6C671E9447C727F68A597E8C9E4EEDE0"}, {"name": "Body corporate fees", "id": "19943ABE22A7A8465496D855B4CE8C46"}, {"name": "Council rates", "id": "C8E6BDA694CE427B55A7FB96E0C5EE7A"}, {"name": "Furniture & appliances", "id": "0550F567698F1F7AFD578EFA22AC1BD2"}, {"name": "Renovations & maintenance", "id": "AAD7B6EF76287CE3A13FD65510452115"}, {"name": "Electricity", "id": "8FA144A4EA4ADF73587670BF7BC370EB"}, {"name": "Gas", "id": "F73DAAEA019026172674608661E6B1FA"}, {"name": "Water", "id": "FC4965009DECFC868FE079303D228AF4"}, {"name": "Internet", "id": "33F0D1516060DE6EE77CE920BF43A0E2"}, {"name": "Pay TV", "id": "CBA96ACB720631FCB50CF0DD725E7EFB"}, {"name": "Home phone", "id": "BE336801F3D572DFAFC5AFD3975FA3F3"}, {"name": "Mobile", "id": "790697B2AD18DC392666D4597F075F52"}], "name": "Home & Utilities", "id": "9EF2745D3E516EEC50304912B9566FB0"}, {"children": [{"name": "Car insurance", "id": "393B8BC47A8AA206E288E9B4A4BA7F3A"}, {"name": "Home & content insurance", "id": "8DB4B531505A13FFE8CD15542859DBB0"}, {"name": "Personal & life insurance", "id": "C4A12610815A3EE99D342FF394C12432"}, {"name": "Health insurance", "id": "5106447DDD16C09DEA933BEA97A5AB92"}, {"name": "Car loan", "id": "0535F7BE1B04A723FCC8932FD7FC7B5C"}, {"name": "Credit card interest", "id": "B8BD1408DD39B4A6D3D9A6B8838D8C23"}, {"name": "Other loans", "id": "D5E8EC7743AF10FAA8AB4F276DE548F4"}, {"name": "Paying off debt", "id": "AFAFFBB6CD69E5A995583EE28E2AA5E1"}, {"name": "Savings", "id": "F1D404897C07957F54A2B584EC99173E"}, {"name": "Investments & super contributions", "id": "78228FAD64A0CC1A91D68D9DE0EF9FB9"}, {"name": "Charity donations", "id": "5EC37ACA609774F0DEBB1AF01F932C21"}], "name": "Insurance & Financial", "id": "443EC4BB1F7D78E30BE7D2C69FF7D34E"}, {"children": [{"name": "Baby products", "id": "9B3BABE873350A403D5AE5B53AA30F98"}, {"name": "Toys", "id": "FBB51E65F0FDBE44C7340507FE8DF7EF"}, {"name": "Babysitting", "id": "9A2DAC16EBD2EA099AA073C0D3AE634D"}, {"name": "Childcare", "id": "46C151FC61C80836180BAC96E2660D71"}, {"name": "Sports & activities", "id": "6F9076DE5C002F627379DB1764D192A8"}, {"name": "School fees", "id": "C16F8CC871EAFCAE07153A001AF39706"}, {"name": "Excursions", "id": "13AABC3E9DB0CDB3DE62F6E5901F51FA"}, {"name": "School uniforms", "id": "4E91306BA0AA1B380959421DA6060780"}, {"name": "Other school needs", "id": "25302D4346E94F7799878745C12D7BB4"}, {"name": "Pocket money", "id": "BA1388F2796E203D61F8BC2D187C87D4"}, {"name": "Child support payment", "id": "14CF1F71AA3EDAF75531AC157AC2DB3E"}], "name": "Children", "id": "64E4ACA4297806247F62A7B5F8CBD3DF"}];


/*global Spending:true, persistence:true, _:true, Backbone:true, console:true */

Spending.UI.ApplyEditingToHistoryList = function ($history, $editButton)
{
	var toggler = function __toggler() {
		$history.toggleClass("filtered", $(this).val() !== "");
	};

	Spending.state.historyEditMode = false;

	$editButton.off("tap");
	$editButton.on("tap", function (event) {
		event.preventDefault();
		console.log("HISTORY: Edit Button Tapped", Spending.state.historyEditMode);
		Spending.UI.setHistoryEditMode($history, $editButton, !Spending.state.historyEditMode);
	});

	$history.on("tap", "a.add", function (event) {
		event.preventDefault();

		Spending.ga.trackEvent("Interaction: History", "Select for Edit", "", 1);

		var uuid = $(this).data("uuid");
		console.log("Starting edit for " + uuid);
		if (Spending.isTablet)
		{
			$("#home-add-expense").hide();
			Spending.UI.Home.showExpenseForm(uuid, null);
		}
		else
		{
			Spending.state.editExpenseUUID = uuid;
			$.mobile.changePage("expense.html");
		}
	});

	$(".ui-listview-filter input").on("keyup", toggler);
	$(".ui-input-clear").click(toggler);

	var $deleteRow, deleteUUID;

	$history.on("tap", "a.delete", function (event) {
		Spending.ga.trackEvent("Interaction: History", "Delete Button", "", 1);
		$deleteRow = $(this).closest("li");
		deleteUUID = $deleteRow.find(".add").data("uuid");

		console.log("Starting delete for " + deleteUUID);

		Spending.state.deleteUUID = deleteUUID;
		Spending.state.deleteType = "expense";
		Spending.state.deleteCallback = function() {
			event.preventDefault();
			Spending.deleteExpense( deleteUUID, function () {
				$(document).trigger("expenseDeleted");
				$deleteRow.remove();
				$history.listview("refresh");
				$('.ui-dialog').dialog('close');
			}, true);
		};

	});

	$("#expense-delete-delete").on("tap", function (event) {
		event.preventDefault();
		Spending.ga.trackEvent("Interaction: History", "Delete Confirmed", "", 1);
		Spending.deleteExpense( deleteUUID, function () {
			$deleteRow.remove();
			$history.listview("refresh");
			$('.ui-dialog').dialog('close');
		}, true);
	});
};

Spending.UI.setHistoryEditMode = function ($history, $editButton, editMode )
{
	console.log("setHistoryEditMode to " + editMode);
	Spending.ga.trackEvent("Interaction: History", "Edit Button", "", 1);
	if ( editMode === false )
	{
		$(".ui-btn-text", $editButton).html("Edit");
		editMode = false;
		$history.removeClass("editing");
	}
	else
	{
		$(".ui-btn-text", $editButton).html("Done");
		editMode = true;
		$history.addClass("editing");
	}
	Spending.state.historyEditMode = editMode;
};

Spending.UI.initialiseHistory = function ($history, scrollContainer)
{
	$.when(Spending.dbInitPromise).then(function() {
		Spending.getExpensesHistory(function(expenses) {
			Spending.state.historyCount = expenses.length;
			if (Spending.state.historyStartFrom === null || Spending.state.historyStartFrom === 0)
			{
				Spending.state.historyStartFrom = 0;
				Spending.state.historyNumShown = 20;
				$.mobile.loading( 'show', {text: "Loading...", textVisible: true, textonly: true} );
				Spending.UI.populateHistory($history, expenses, true, Spending.state.historyStartFrom, Spending.state.historyNumShown);
			}

			Spending.state.historyScrollFunction = function () {
				var scrollContext = (scrollContainer === document ? window : scrollContainer);
				var pos = $(scrollContext).scrollTop();
				if (Spending.state.historyUpdateMutex === false && pos > $history.height() - $(scrollContext).height())
				{
					Spending.state.historyUpdateMutex = true;
					$.mobile.loading( 'show', {text: "Loading...", textVisible: true, textonly: true} );
					Spending.state.historyStartFrom = Math.min(Spending.state.historyStartFrom + Spending.state.historyNumShown, Spending.state.historyCount);
					Spending.UI.populateHistory($history, expenses, true, Spending.state.historyStartFrom, Spending.state.historyNumShown);
					Spending.state.historyUpdateMutex = false;
				}
			};

			$(".ui-listview-filter input").on("focus", function () {
				if (Spending.state.historyStartFrom < Spending.state.historyCount)
				{
					$.mobile.loading( 'show', {text: "Loading...", textVisible: true, textonly: true} );
					setTimeout(function () {
						Spending.UI.populateHistory($history, expenses, true, 0, expenses.length);
						Spending.state.historyStartFrom = Spending.state.historyCount;
					}, 20);
				}
			});

			Spending.state.historyUpdateMutex = false;
			$(scrollContainer).on("scroll", Spending.state.historyScrollFunction);
		});
	});
};

$(document).on("pageinit", "#history", function() {
	var $history = $("#history-expenses");

	Spending.UI.ApplyEditingToHistoryList($history,$("#history-edit"));

	Spending.state.historyStartFrom = 0;
	Spending.state.historyNumShown = 20;
});

$(document).on("pagebeforeshow", "#history", function() {
	Spending.ga.trackPageview("/history");
	var $history = $("#history-expenses");
	$history.removeClass("filtered");
	$(".ui-listview-filter input").val("");

	if (Spending.state.historyStartFrom === null)
	{
		$history.find("li").remove();
		Spending.state.historyStartFrom = 0;
	}

	Spending.UI.setHistoryEditMode($history, $("#history-edit"), false);
});

$(document).on("pageshow", "#history", function () {
	var $history = $("#history-expenses");
	Spending.UI.initialiseHistory($history, document);
});

$(document).on("pagehide", "#history", function () {
	$(document).off("scroll", Spending.state.historyScrollFunction);
});

Spending.UI.populateHistory = function ($history, expenses, showProgress, startFrom, numShown) {
	var start = (new Date()).getTime();
	console.log("HISTORY: " + startFrom + " of " + expenses.length);
	if (startFrom >= expenses.length)
	{
		$.mobile.loading( 'hide' );
		return;
	}

	if (startFrom === 0)
	{
		$("li", $history).remove();
		Spending.state.historyLastDate = null;
	}

	var now = (new Date()).getTime();
	console.log("Remove: " + (now - start));
	start = now;
	$("#history-no-expenses").toggle(expenses.length === 0);
	$("#history-edit").toggle(expenses.length !== 0);

	var historyTemplate = $("#template-history").html();
	var historyDividerTemplate = $("#template-history-divider").html();
	var expenseHtml = "";

	var compiledHistoryTemplate = _.template(historyTemplate);
	var compiledDividerTemplate = _.template(historyDividerTemplate);

	//console.log("Slice:", startFrom, numShown - startFrom);
	var displayedExpenses = expenses.slice(startFrom, startFrom + numShown);

	_.each(displayedExpenses, function(expense) {
		var m = moment(expense.date);
		var referenceDate = m.format("YYYYMMDD");
		if (Spending.state.historyLastDate === null || referenceDate !== Spending.state.historyLastDate)
		{
			data = {date: m};
			expenseHtml += compiledDividerTemplate(data);
			Spending.state.historyLastDate = referenceDate;
		}
		expenseHtml += compiledHistoryTemplate(expense);
	});

	$history.append(expenseHtml);

	now = (new Date()).getTime();
	console.log("Add: " + (now - start));
	start = now;
	$history.listview("refresh");
	now = (new Date()).getTime();
	console.log("Refresh: " + (now - start));
	if (showProgress)
	{
		$.mobile.loading( 'hide' );
	}
};

$(document).on("pageinit", "#selector", function() {
	$("#select-list").on("tap", "a", function(event) {
		Spending.state.selectCallback($(this).text());
		event.preventDefault();
	});
});

$(document).on("pagebeforeshow", "#selector", function() {
	$("#select-list li").remove();
	_.each(Spending.state.selectList, function(item) {
		$("#select-list").append("<li><a href=''>" + item + "</a></li>");
	});
	$("#select-list").listview("refresh");
});

/*global Spending:true, $:true, document:true, moment:true, _:true */

Spending.UI = Spending.UI || {};
Spending.UI.Expense = Spending.UI.Expense || {};

Spending.UI.Expense.initExpenseForm = function UIInitExpenseForm(prefix, initialState)
{
    console.log("EXPENSE: initExpenseForm");
    if ( prefix === undefined )
    {
        prefix = "";
    }
    else
    {
        prefix = prefix + "-";
    }

    Spending.UI.Expense.$cost = $("#" + prefix + "expense-cost");
    Spending.UI.Expense.$category = $("#" + prefix + "expense-category");
    Spending.UI.Expense.$subcategory = $("#" + prefix + "expense-subcategory");
    Spending.UI.Expense.$customSubcategory = $("#" + prefix + "expense-custom-subcategory");
    Spending.UI.Expense.$note = $("#" + prefix + "expense-note");
    Spending.UI.Expense.$date = $("#" + prefix + "expense-date");
    Spending.UI.Expense.$needwant = $("#" + prefix + "expense-needwant");
    Spending.UI.Expense.$fav = $("#" + prefix + "expense-isfav");
    Spending.UI.Expense.$isfav = $("#" + prefix + "isFavourite");
    Spending.UI.Expense.$next = $("#" + prefix + "expense-next");

    Spending.UI.Expense.$cost.on("keypress", function (event) {
        if (event.keyCode === 13)
        {
            Spending.UI.Expense.$cost.blur();
        }
    });

    Spending.UI.Expense.$note.on("keypress", function (event) {
        if (event.keyCode === 13)
        {
            Spending.UI.Expense.$note.blur();
        }
    });

    Spending.UI.$expenseTitle = $("#expense h2");

    Spending.UI.Expense.categoryTemplate = $("#template-category").html();

    Spending.UI.Expense.$cost.on("tap focus", function (event) {
        console.log("EXPENSE: Cost Focus");
        $.mobile.silentScroll(0);
        if (window.CordovaPlatform === "Android" && Spending.platformVersion >= 3.0 && Spending.platformVersion < 4.0)
        {
            console.log("ANDROID 3.2: Using text field");
            $(this).get(0).setAttribute("type", "text");
        }
        else
        {
            $(this).get(0).setAttribute("type", "number");
        }
        $(this).removeClass("error").closest(".field").find(".error-message").remove();
    });

    Spending.UI.Expense.$cost.on("blur", function (event) {
        console.log("EXPENSE: Cost Blur");
        Spending.ga.trackEvent("Interaction: Expense", "Cost un-focus", "", 1);
        if (Spending.UI.Expense.validateCost())
        {
            $(this).get(0).setAttribute("type", "text");
            Spending.UI.Expense.$cost.val(Spending.prettyFormat(Spending.UI.Expense.$cost.val().replace(/,/g,""), 2));
        }
    });

    Spending.UI.Expense.$note.on("focus", function (event) {
        Spending.UI.Expense.$note.removeClass("error").closest("div").find(".error-message").remove();
    });

    Spending.UI.Expense.$next.on("click", Spending.UI.Expense.onNext);

    // Populate the category list
    //Spending.UI.Expense.$category.on("tap", "a", Spending.UI.Expense.onCategoryTap);
    //Spending.UI.Expense.$subcategory.on("tap", "a", Spending.UI.Expense.onSubCategoryTap);

    Spending.UI.Expense.$date.find("a").on("tap", function () {
        Spending.ga.trackEvent("Interaction: Expense", "Date tap", "", 1);
        var currentDate = +Spending.UI.Expense.$date.data("date");
        Spending.UI.datePicker(Spending.UI.Expense.$date, currentDate, function (newDate) {
            Spending.ga.trackEvent("Interaction: Expense", "Date set", "", 1);
            Spending.UI.Expense.$date.data("date", newDate.getTime())
                .find("a").html( moment(newDate).format("DD/MM/YYYY"));
        });
    });

    Spending.UI.Expense.$customSubcategory.on("blur", Spending.UI.Expense.onCustomSubCategoyrBlur);

    Spending.UI.Expense.baseClass = $("#expense div[data-role='content']").attr("class");

    Spending.UI.Expense.resetExpenseForm(initialState);

};

Spending.UI.Expense.resetExpenseForm = function UIResetExpenseForm(initialState)
{
    console.log("EXPENSE: resetExpenseForm");
    $("#expense").addClass("mode-add")
                 .removeClass("mode-edit")
                 .removeClass("mode-favourite")
                 .addClass("mode-expense");

    if ( initialState )
    {
        Spending.state.expenseState = initialState;
    }
    else
    {
        Spending.state.expenseState = "cost";
    }

    Spending.state.expenseInitialState = Spending.state.expenseState;

    Spending.state.editExpense = null;

    Spending.state.expenseSubCategory = null;
    Spending.state.expenseCategory = null;

    Spending.UI.Expense.$cost.val("");
    Spending.UI.Expense.$note.val("");

    Spending.UI.Expense.$customSubcategory.hide();

    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    $(".error-message").remove();
    $(".error").removeClass("error");

    Spending.UI.Expense.$date.data("date", date.getTime());
    Spending.UI.Expense.$date.find("a").html(moment(date).format("DD/MM/YYYY"));

    Spending.state.editExpenseLoaded = false;

    Spending.UI.Expense.$isfav.prop("checked", false).checkboxradio('refresh');
    Spending.UI.Expense.updateForState();

    Spending.state.nextDisabled = false;

};

Spending.UI.Expense.updateFormForAdd = function UIUpdateFormForAdd()
{
    console.log("EXPENSE: updateFormForAdd");
    Spending.state.nextDisabled = false;
    $("#home-add-expense-form input:focus").blur();
    if ( Spending.state.expenseState === "single" )
    {
        Spending.UI.$expenseTitle = $("#home-add-expense-form h2").html("Add Expense");
    }

    Spending.state.editExpenseUUID = null;

    if ( Spending.state.favouriteExpenseUUID )
    {
        Spending.getExpense(Spending.state.favouriteExpenseUUID, function (expense) {
            Spending.UI.Expense.populateFormWithExpense(expense, true);
            Spending.state.expenseState = "confirm";
            Spending.UI.Expense.updateForState();
        });
    }

};

Spending.UI.Expense.populateFormWithExpense = function UIPopulateFormFromExpense (expense, updateDateToToday)
{
    console.log("EXPENSE: populateFormWithExpense");
    Spending.ga.trackEvent("Interaction: Expense", "Popuplate for edit", "", 1);
    Spending.UI.Expense.$cost.val(expense.cost);
    Spending.UI.Expense.$cost.blur();

    Spending.state.expenseCategory = expense.category.parent;
    Spending.state.expenseSubCategory = expense.category;

    Spending.UI.Expense.setCategoryList(Spending.UI.Expense.$category, [Spending.state.expenseCategory], false, Spending.UI.Expense.onCategoryTap);
    Spending.UI.Expense.setCategoryList(Spending.UI.Expense.$subcategory, [Spending.state.expenseSubCategory], false, Spending.UI.Expense.onSubCategoryTap);

    var date;
    if ( updateDateToToday )
    {
        date = new Date();
    }
    else
    {
        date = new Date(expense.date) || new Date();
    }

    date = moment(date).sod().toDate();

    Spending.UI.Expense.$date.data("date", date.getTime());
    Spending.UI.Expense.$date.find("a").html(moment(date).format("DD/MM/YYYY"));
    Spending.UI.Expense.$note.val(expense.note);

    $("input[value='" + (expense.isNeed ? "need" : "want") + "']", Spending.UI.Expense.$needwant).attr('checked', true);
    Spending.UI.Expense.$needwant.find("input").checkboxradio('refresh');


    $("#edit-expense .fields").fadeIn(50);
    if ( Spending.state.expenseState !== "single" )
    {
        Spending.state.expenseState = "confirm";
    }
};

Spending.UI.Expense.updateFormForEdit = function UIUpdateFormForEdit()
{
    console.log("EXPENSE: updateFormForEdit");
    $.when(Spending.dbInitPromise).then(function() {

        if ( Spending.state.editExpenseUUID && ! Spending.state.editExpenseLoaded )
        {
            var uuid = Spending.state.editExpenseUUID;
            var editing = false;
            Spending.getExpense(uuid, function(expense) {
                var $title;
                if ( Spending.state.expenseState === "single" )
                {
                    $title = $("#home-add-expense-form h2");
                }
                else
                {
                    $title = $("#expense h2");
                }

                Spending.UI.$expenseTitle = $title;

                $title.html("Edit " + (expense.isFavourite ? "Favourite" : "Expense"));

                $("#expense").removeClass("mode-add")
                             .removeClass("mode-favourite")
                             .removeClass("mode-expense")
                             .addClass("mode-edit")
                             .addClass("mode-" + (expense.isFavourite ? "favourite" : "expense"));

                Spending.state.editExpense = expense;
                if ( Spending.state.editExpenseUUID )
                {
                    editing = true;
                    Spending.state.editExpenseLoaded = true;
                }
                else
                {
                    Spending.state.favouriteExpenseUUID = null;
                }

                Spending.UI.Expense.populateFormWithExpense(expense);

                Spending.UI.Expense.updateForState();
            });
        }
        else
        {
            Spending.UI.Expense.updateFormForAdd();
            Spending.UI.Expense.updateForState();
        }
    });
};

$(document).on("pageinit", "#expense", function () {
    "use strict";

    Spending.UI.Expense.initExpenseForm();
});

$(document).on("pagebeforeshow", "#expense", function () {
    Spending.ga.trackPageview("/expense");
    Spending.state.expensePersist = false;
    if (Spending.state.editExpenseUUID === null && Spending.state.favouriteExpenseUUID === null)
    {
        Spending.UI.Expense.resetExpenseForm("cost");
    }
    Spending.UI.Expense.updateFormForEdit();
});

$(document).on("pagehide", "#expense", function() {
    if ( ! Spending.state.expensePersist )
    {
        Spending.state.editExpenseLoaded = null;
        Spending.state.editExpense = null;
        Spending.state.editExpenseUUID = null;

        $("#expense").remove();
    }
});

Spending.UI.Expense.setCategoryList = function($category, categories, addCustomOption, tapHandler) {
    $category.find("li").remove();
    _.each(categories, function(category) {
        var $item = $(_.template(Spending.UI.Expense.categoryTemplate, category));
        $category.append($item);
        $item.find("a").on("tap", tapHandler);
    });

    var item = null;

    if ( addCustomOption )
    {
        item = $(_.template(Spending.UI.Expense.categoryTemplate, {uuid: 0, name: "Create Custom Expense"}));
        $category.append(item);
        item.find("a").on("tap", tapHandler);
    }

    $category.listview('refresh');

    if (item)
    {
        $("a[data-uuid='0']").closest("li").addClass("custom");
    }

    if (categories.length === 1)
    {
        $category.find("li").addClass("custom");
    }

};

Spending.UI.Expense.updateForState = function()
{
    var nextLabel = $(".ui-btn-text", Spending.UI.Expense.$next).html("Next");
    var categories;

    $("#expense div[data-role='content']").attr("class", Spending.UI.Expense.baseClass + " expense-state-" + Spending.state.expenseState);

    switch ( Spending.state.expenseState )
    {
        case "single":
        /* Options:
        - neither cat nor sub-cat set
        - cat set but sub-cat not set
        - cat set & sub-cat set
        */

        if ( Spending.state.expenseCategory === null )
        {
            categories = Spending.getCategoriesFromCache(null);
            if (Spending.state.expenseCategory === null)
            {
                Spending.UI.Expense.setCategoryList(Spending.UI.Expense.$category, categories, false, Spending.UI.Expense.onCategoryTap);
                $(document).trigger("addExpenseCategoryListLoaded");
            }
        }
        else
        {
            Spending.UI.Expense.collapseCategory(Spending.UI.Expense.onCategoryTap);
        }

        if ( Spending.state.expenseCategory !== null && Spending.state.expenseSubCategory === null )
        {
            categories = Spending.getCategoriesFromCache(Spending.state.expenseCategory);
            Spending.UI.Expense.setCategoryList(Spending.UI.Expense.$subcategory, categories, true, Spending.UI.Expense.onSubCategoryTap);
        }
        else
        {
            Spending.UI.Expense.collapseSubCategory();
        }
        // intentiionally fall through to following case statement
        case "confirm":

            if ( Spending.state.expenseState === "confirm" && ! Spending.state.editExpenseUUID && ! Spending.state.favouriteExpenseUUID )
            {
                Spending.UI.$expenseTitle.html("Confirm");
            }

            Spending.UI.Expense.$note.show();
            Spending.UI.Expense.$date.show();
            Spending.UI.Expense.$needwant.toggle(Spending.Config.Settings.useNeedWant === "true" );
            Spending.UI.Expense.$fav.toggle( ! ( Spending.state.editExpense && Spending.state.editExpense.isFavourite ) );
            Spending.UI.Expense.$cost.show();

            if ( Spending.UI.Expense.$customSubcategory.filter(":visible").length === 0 )
            {
                Spending.UI.Expense.$subcategory.show();
            }

            Spending.UI.Expense.$category.show();

            nextLabel.html("Done");
            Spending.UI.Expense.$next.show();
            break;
        case "subcategory":
            Spending.UI.$expenseTitle.html("Sub-Category");
            Spending.UI.Expense.$cost.show();
            Spending.UI.Expense.$note.show();
            Spending.UI.Expense.$category.show();
            Spending.UI.Expense.$subcategory.show();

            categories = Spending.getCategoriesFromCache(Spending.state.expenseCategory);
            Spending.UI.Expense.setCategoryList(Spending.UI.Expense.$subcategory, categories, true, Spending.UI.Expense.onSubCategoryTap);

            Spending.UI.Expense.$next.hide();

            Spending.UI.Expense.$date.hide();
            Spending.UI.Expense.$needwant.hide();
            Spending.UI.Expense.$fav.hide();


            break;

        case "category":
            Spending.UI.$expenseTitle.html("Category");
            Spending.UI.Expense.$cost.show();
            Spending.UI.Expense.$note.show();
            Spending.UI.Expense.$category.show();

            Spending.UI.Expense.$subcategory.hide();
            Spending.UI.Expense.$customSubcategory.hide();

            Spending.UI.Expense.$date.hide();
            Spending.UI.Expense.$needwant.hide();
            Spending.UI.Expense.$fav.hide();

            categories = Spending.getCategoriesFromCache(null);
            Spending.UI.Expense.setCategoryList(Spending.UI.Expense.$category, categories, false, Spending.UI.Expense.onCategoryTap);

            Spending.UI.Expense.$next.hide();

            break;
        case "cost":
            Spending.UI.Expense.$cost.show();
            Spending.UI.Expense.$note.show();
            Spending.UI.Expense.$next.show();

            Spending.UI.$expenseTitle.html("Add Expense");
            Spending.UI.Expense.$cost.show();

            Spending.UI.Expense.$category.hide();
            Spending.UI.Expense.$subcategory.hide();
            Spending.UI.Expense.$customSubcategory.hide();

            Spending.UI.Expense.$date.hide();
            Spending.UI.Expense.$needwant.hide();
            Spending.UI.Expense.$fav.hide();

            Spending.UI.Expense.$next.show();
            break;
    }
};

Spending.UI.Expense.validateCost = function()
{
    var cost = Spending.UI.Expense.$cost.val();
    if ( ! cost.match(/^[0-9,.]+$/) )
    {
        Spending.UI.Expense.$cost.addClass("error");
        Spending.UI.Expense.$cost.closest("div").append("<span class='error-message'>Amount is required</span>");
        return false;
    }
    else
    {
        Spending.UI.Expense.$cost.removeClass("error");
        return true;
    }
};

Spending.UI.Expense.validateNote = function ()
{
    if ( Spending.UI.Expense.$note.val() === "" )
    {
        Spending.UI.Expense.$note.addClass("error");
        Spending.UI.Expense.$note.closest("div").append("<span class='error-message'>Expense name is required</span>");
        return false;
    }
    else
    {
        return true;
    }
};

Spending.UI.Expense.onNext = function(event)
{
    event.stopImmediatePropagation();
    event.preventDefault();

    if (Spending.state.nextDisabled)
    {
        Spending.ga.trackEvent("Interaction: Expense", "Next pressed while disabled", "", 1);
        console.log("Next not allowed right now");
        return;
    }

    switch ( Spending.state.expenseState )
    {
        case "cost":

        Spending.UI.Expense.validateCost();
        Spending.UI.Expense.validateNote();

        if ( Spending.UI.Expense.validateCost() && Spending.UI.Expense.validateNote() )
        {
            Spending.ga.trackEvent("Interaction: Expense", "Next pressed after cost", "Valid", 1);
            Spending.UI.Expense.$cost.blur();
            Spending.state.expenseState = "category";
            Spending.TestFlight.passCheckpointSimple( "ExpenseSetCost" );
        }
        else
        {
            Spending.ga.trackEvent("Interaction: Expense", "Next pressed after cost", "Invalid", 1);
        }
        break;

        case "single":
        case "confirm":
        var valid = true;

        Spending.UI.Expense.validateCost();
        Spending.UI.Expense.validateNote();

        if ( ! Spending.UI.Expense.validateCost() || ! Spending.UI.Expense.validateNote() || Spending.state.expenseSubCategory === null )
        {
            Spending.UI.Expense.$category.closest(".field").find(".error-message").remove();
            Spending.UI.Expense.$subcategory.closest(".field").find(".error-message").remove();

            if (Spending.state.expenseCategory === null)
            {
                Spending.UI.Expense.$category.closest(".field").append("<span class='error-message'>Category is required</span>");
            }

            if (Spending.state.expenseSubCategory === null)
            {
                Spending.UI.Expense.$subcategory.closest(".field").append("<span class='error-message'>Sub-category is required</span>");
            }
            valid = false;
            return;
        }

        var isNeed = (Spending.Config.Settings.useNeedWant === "false" || Spending.UI.Expense.$needwant.find("input:checked").val() === "need");
        var data = {
            cost: Number(Spending.UI.Expense.$cost.val().replace(/,/g, "")),
            category: Spending.state.expenseSubCategory.uuid,
            date: +Spending.UI.Expense.$date.data("date"),
            note: Spending.UI.Expense.$note.val(),
            isNeed: isNeed,
            isFavourite: false
        };

        if ( ! valid )
        {
            Spending.ga.trackEvent("Interaction: Expense", "Done", "Invalid", 1);
            return;
        }

        Spending.ga.trackEvent("Interaction: Expense", "Done", "Valid", 1);

        var isFavourite = Spending.UI.Expense.$isfav.prop("checked");

        Spending.state.nextDisabled = true;
        Spending.ga.trackEvent("Debug", "Disable Next - Saving", "", 1);

        if ( Spending.state.editExpense )
        {
            data.category = Spending.state.expenseSubCategory;
            if ( Spending.state.editExpense.isFavourite )
            {
                data.isFavourite = true;
            }

            Spending.updateExpense(Spending.state.editExpense.uuid, data, isFavourite, function( updatedExpense ) {
                Spending.ga.trackEvent("Interaction: Expense", "Expense Saved", "Update", 1);
                $("#home-add-expense-form input:focus").blur();
                $(document).trigger("expenseUpdated", [updatedExpense, isFavourite]);
                if ( Spending.state.expenseState !== "single" && !Spending.isTablet )
                {
                    if ( updatedExpense.isFavourite )
                    {
                        Spending.TestFlight.passCheckpointSimple( "ExpenseUpdateFavourite" );
                        $.mobile.changePage("favourites.html");
                    }
                    else
                    {
                        Spending.TestFlight.passCheckpointSimple( "ExpenseUpdateExpense" );
                        $.mobile.changePage("history.html");
                    }
                }
            }, true);
        }
        else
        {
            Spending.TestFlight.passCheckpointSimple( "ExpenseAddExpense" );
            Spending.addExpense(data, isFavourite, function(success, uuid, expense, favourite, favouriteUUID) {
                if ( success )
                {
                    Spending.ga.trackEvent("Interaction: Expense", "Expense Saved", "Add Success", 1);
                    $("#home-add-expense-form input:focus").blur();
                    $(document).trigger("expenseAdded", [expense, isFavourite, favouriteUUID]);

                    if ( Spending.state.expenseState !== "single" )
                    {
                        $.mobile.changePage("index.html");
                    }
                }
                else
                {
                    $.mobile.changePage("index.html");
                    Spending.ga.trackEvent("Interaction: Expense", "Expense Saved", "Add Failed", 1);
                }
            }, true);
        }
        break;
    }

    Spending.UI.Expense.updateForState();
};

Spending.UI.Expense.collapseCategory = function UICollapseCategory ()
{
    Spending.UI.Expense.$category.find("li").remove();
    if ( Spending.state.expenseCateogry !== null )
    {
        var $item = $(_.template(Spending.UI.Expense.categoryTemplate, Spending.state.expenseCategory));
        Spending.UI.Expense.$category.append($item).listview("refresh");
        $item.find("a").on("tap", Spending.UI.Expense.onCategoryTap);
    }
};

Spending.UI.Expense.collapseSubCategory = function UICollapseSubCategory ()
{
    Spending.UI.Expense.$subcategory.find("li").remove();
    if ( Spending.state.expenseSubCategory !== null )
    {
        var $item = $(_.template(Spending.UI.Expense.categoryTemplate, Spending.state.expenseSubCategory));
        Spending.UI.Expense.$subcategory.append($item).listview("refresh");
        Spending.UI.Expense.$subcategory.find("li").addClass("custom");
        $item.find("a").on("tap", Spending.UI.Expense.onSubCategoryTap);
    }
};

Spending.UI.Expense.onCategoryTap = function(event)
{
    console.log("EXPENSE: Cat tap");
    event.preventDefault();
    event.stopImmediatePropagation();

    $("#home-add-expense-form input").blur();

    if ( Spending.state.expenseState === "subcategory" || Spending.state.expenseState === "confirm" || (Spending.state.expenseState === "single" && Spending.state.expenseCategory !== null) )
    {
        Spending.state.expenseState = "category";
        Spending.state.expenseCategory = null;
        Spending.state.expenseSubCategory = null;
        Spending.UI.Expense.updateForState();
        return;
    }

    Spending.state.expenseCategory = Spending.categoryCache[$(this).attr("data-uuid")];

    Spending.UI.Expense.$category.closest(".field").find(".error-message").remove();
    Spending.UI.Expense.$subcategory.closest(".field").find(".error-message").remove();

    Spending.ga.trackEvent("Interaction: Expense", "Category Select", Spending.state.expenseCategory.name, 1);

    setTimeout(function() {
        Spending.UI.Expense.collapseCategory(Spending.UI.Expense.onCategoryTap);

        if ( Spending.state.expenseState !== "single" )
        {
            Spending.state.expenseState = "subcategory";
        }

        Spending.UI.Expense.updateForState();

    }, 100);
};

Spending.UI.Expense.setSubCategory = function UISetSubCategory (subCategoryUUID) {
    Spending.state.expenseSubCategory = Spending.categoryCache[subCategoryUUID];

    Spending.ga.trackEvent("Interaction: Expense", "Sub-Category Select", Spending.state.expenseSubCategory.name, 1);

    setTimeout(function () {
        Spending.UI.Expense.collapseSubCategory(Spending.UI.Expense.onCategoryTap);

        if ( Spending.state.expenseState !== "single" )
        {
            Spending.state.expenseState = "confirm";
        }

        Spending.UI.Expense.updateForState();
    }, 100);
};

Spending.UI.Expense.onSubCategoryTap = function(event)
{
    console.log("EXPENSE: Sub-Cat tap");
    event.preventDefault();
    $("#home-add-expense-form input:focus").blur();

    Spending.UI.Expense.$subcategory.closest(".field").find(".error-message").remove();

    if ( Spending.state.expenseState === "confirm" || ( Spending.state.expenseState === "single" && Spending.state.expenseSubCategory !== null) )
    {
        if ( Spending.state.expenseState === "confirm" )
        {
            Spending.state.expenseState = "subcategory";
        }
        Spending.state.expenseSubCategory = null;
        Spending.UI.Expense.updateForState();
        return;
    }

    var subCategoryUUID = $(this).attr("data-uuid");
    if ( subCategoryUUID === "0" )
    {
        Spending.ga.trackEvent("Interaction: Expense", "Sub-Category Select", "Custom", 1);

        Spending.state.expensePersist = true;

        Spending.TestFlight.passCheckpointSimple( "ExpenseCustomSubCategory" );
        Spending.UI.Expense.$customSubcategory.show();
        Spending.UI.Expense.$subcategory.hide();

        if ( Spending.state.expenseState !== "single" )
        {
            Spending.state.expenseState = "confirm";
            Spending.UI.Expense.updateForState();
        }
        Spending.UI.Expense.$customSubcategory.focus();
    }
    else
    {
        Spending.UI.Expense.setSubCategory(subCategoryUUID);
    }
};

Spending.UI.Expense.onCustomSubCategoyrBlur = function (event) {
    Spending.UI.Expense.$subcategory.closest(".field").find(".error-message").remove();
    var newSubCategory = Spending.UI.Expense.$customSubcategory.val();
    if ( newSubCategory === "" ) return;

    setTimeout(function() {
        Spending.addSubCategory(Spending.state.expenseCategory.uuid, newSubCategory, function(subCategoryUUID) {
            Spending.ga.trackEvent("Interaction: Expense", "Custom Sub-Category", newSubCategory, 1);
            Spending.UI.Expense.setSubCategory(subCategoryUUID);
            Spending.UI.Expense.$customSubcategory.val("").hide();
        }, true);
    }, 100);
};



//= require jquery.validate
/*global Spending:true, persistence:true, _:true, Backbone:true, console:true, $:true, moment:true */

Spending.UI = Spending.UI || {};
Spending.UI.Home = Spending.UI.Home || {};

$(document).on("mobileinit", function() {
	"use strict";

	console.log("Home: mobileinit");

	$.mobile.defaultPageTransition = 'none';
	$.mobile.buttonMarkup.hoverDelay = 50;

	$.mobile.allowCrossDomainPages = true;
	$.support.cors = true;

	$(document).on("msStatus", function (event, status, message) {
		var $panel = $("#error-panel");
		$panel.css({display: "block"}).hide().slideDown(100);
		$panel.find("#error-message").html(message);
		if (Spending.messageTimer)
		{
			clearInterval(Spending.messageTimer);
		}
		Spending.messageTimer = setTimeout(function() {
			$panel.slideUp(100);
		}, 2000);
	});
});

Spending.UI.checkForRate = function CheckForRate()
{
	Spending.Config.incrementLaunchCount( function() {
		// do the rate popup thing here?
		var launches = +Spending.Config.Settings.numLaunches;

		Spending.ga.trackEvent("General", "Launch", "", launches);

		var rateAfter = +Spending.Config.Settings.rateAfter;

		// ASICST-382 Reset the launch counter if it's gone past the rateAfter counter
		// due to a bug that wasn't showing the rate dialog
		if (launches > rateAfter && rateAfter !== -1)
		{
			console.log("HOTFIX: Resetting launches and rateAfter");
			rateAfter = Spending.BASE_RATE_AFTER;
			launches = 0;
			Spending.Config.setSetting("numLaunches", 0, function () {});
			Spending.Config.setSetting("rateAfter", Spending.BASE_RATE_AFTER, function () {});
		}

		var _checkInner = function () {
			try {
				console.log("Rate checkInner - Launches: " + launches + " Rate After: " + rateAfter);
				if (launches !== -1 && rateAfter !== -1 && launches > 0 && launches >= rateAfter)
				{
					Spending.state.rateShown = true;
					console.log("About to show Rate dialog...");
					$.mobile.changePage("dialog-rate.html", {role: "dialog"});
				}
			} catch (e) {
				console.log("Exception in checkForRate");
			}
		};

		if (isNaN(rateAfter))
		{
			Spending.Config.setSetting("rateAfter", Spending.BASE_RATE_AFTER, function () {
				_checkInner();
			});
		}
		else
		{
			_checkInner();
		}
	});
};

Spending.UI.Home.hideTabletAddExpense = function() {
	$("#button-home-back").hide();
	$("#home-expense-content").removeClass("adding-expense");
	$("#quick-vis").show();
	$("#home-add-expense-form").hide();
	$("#home-add-expense").show();
	Spending.UI.Home.updateExpenseSummary();
};

$(document).on("pageinit", "#home", function() {
	console.log("Home: PageInit");

	Spending.state.currentTab = "favourites";

	try {
		Spending.state.homeExpenseFormInit = false;

		/* Add spinner to MoneySmart progress box */
		var opts = {
			lines: 13, // The number of lines to draw
			length: 7, // The length of each line
			width: 4, // The line thickness
			radius: 10, // The radius of the inner circle
			rotate: 0, // The rotation offset
			color: '#000', // #rgb or #rrggbb
			speed: 1, // Rounds per second
			trail: 60, // Afterglow percentage
			shadow: false, // Whether to render a shadow
			hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner', // The CSS class to assign to the spinner
			zIndex: 2e9, // The z-index (defaults to 2000000000)
			top: 5, // Top position relative to parent in px
			left: 5 // Left position relative to parent in px
		};
		var spinner = new Spinner(opts).spin(document.getElementById("sync-progress"));


		/* For testing */
		var params = Spending.getUrlParams();
		if ( params.hasOwnProperty("seed") && params.seed )
		{

			var NUM = 50;
			var MIN_VALUE = 1;
			var MAX_VALUE = 15;

			var dateFrom = new Date();
			dateFrom.setMonth(dateFrom.getMonth() - 1);
			var dateTo = new Date();

			var emptyCallback = function() {};

			for ( var i = 0; i < NUM; i++ )
			{
				// pick a random category
				var parentCategory = Spending.rawCategories[Math.floor(Math.random() * Spending.rawCategories.length)];
				var childCategory = parentCategory.children[Math.floor(Math.random() * parentCategory.children.length)];

				var date = (Math.random() * (dateTo.getTime() - dateFrom.getTime())) + dateFrom.getTime();
				var expense = {
					date: date,
					cost: (Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE,
					note: "Expense " + i,
					category: childCategory.id,
					isFavourite: false,
					isNeed: (Math.random() < 0.5)
				};
				var thisIndex = i;
				Spending.addExpense(expense, (Math.random() < 0.5), emptyCallback, true);
			}
		}
		/* end testing */

		$("#no-limits").on("tap", function(event) {
			event.preventDefault();
			Spending.ga.trackEvent("Interaction", "Home", "Set Limits", 1);
			$.mobile.changePage("settings.html");
		});

		/*var $favlist = $("#home-favourites-list");
		var $favedit = $("#home-favourites-edit");
		var $histlist = $("#home-history-list");
		var $histedit = $("#home-history-edit");*/

		$(".tabs li a.tab").on("tap", function(event) {
			event.preventDefault();
			var $tab = $(this).closest("li");
			Spending.UI.Home.setTab($tab.data("function"));
		});


		$.when(Spending.dbInitPromise, Spending.deviceInitPromise).then(function() {
			console.log("Home Init: Delaying sync...");
			// wait x seconds for initial sync
			setTimeout(function () {
				Spending.MoneySmart.performSync(false, function () {});
			}, 2000);

			setTimeout(function () {
				Spending.UI.checkForRate();
			}, 1000);

			document.addEventListener("resume", function (event) {
				console.log("RESUMING APPLICATION");
				setTimeout(Spending.UI.checkForRate, 1000);

				Spending.state.today = new Date();
				Spending.state.today.setHours(0);
				Spending.state.today.setMinutes(0);
				Spending.state.today.setSeconds(0);
				Spending.state.today.setMilliseconds(0);

				if ($.mobile.activePage.attr("id") === "home")
				{
					Spending.UI.Home.refreshHomeView();
				}

			}, false);
		});


		$(document).on("expenseUpdated", function(event, expense, favourite) {
			if ( Spending.isTablet )
			{
				var $row = $('a[data-uuid="' + expense.uuid + '"]');
				$(".cost", $row).html(Spending.prettyFormat(expense.cost, 2));
				$(".note", $row).html(expense.note === "" ? "Expense" : expense.note);

				if ( favourite )
				{
					var template = $("#template-favourite").html();
					var $favourites = $("#home-favourites-list");
					$favourites.prepend(_.template(template, expense));
					$favourites.listview("refresh");
				}
			}
		});

		$(document).on("expenseAdded expenseUpdated", function() {
			if ( Spending.isTablet )
			{
				Spending.UI.Home.hideTabletAddExpense();
			}
			$(".first-expense").hide();

			//Spending.MoneySmart.performSync( function () {});
		});

		$(document).on("expenseDeleted favouriteDeleted", function() {
		});

		$(document).on("expenseDeleted favouriteDeleted", function() {
		});

		$(document).on("expenseAdded", function(event, expense, favourite, favouriteUUID) {
			if ( Spending.isTablet )
			{
				Spending.UI.Home.refreshHistory();

				if ( favourite )
				{
					Spending.UI.Home.refreshFavourites();
				}
			}
		});

		$(document).on("syncComplete", function (event, numTransactions) {
			console.log("HOME: Sync Complete with " + numTransactions + " transactions");
			if (numTransactions > 0)
			{
				Spending.state.homeHistoryLoaded = false;
				Spending.state.historyStartFrom = 0;
				Spending.UI.Home.refreshHomeView();
			}
		});

		var toggler = function __toggler() {
			$("ul.history").toggleClass("filtered", $(this).val() !== "");
		};

		$("#home-history-content .ui-listview-filter input").on("keyup", toggler);
		$("#home-history-content .ui-input-clear").click(toggler);

		$("#home-add-expense, .first-expense, #footer-add").on("tap", function(event) {
			event.preventDefault();

			Spending.ga.trackEvent("Interaction", "Home", "Add Expense", 1);

			$(".first-expense").hide();

			if (!Spending.isTablet)
			{
				Spending.state.editExpenseUUID = null;
				Spending.state.favouriteExpenseUUID = null;
				$.mobile.changePage("expense.html");
				return;
			}

			$("#home-add-expense").hide();

			$("#quick-vis").hide();
			$("#home-expense-content").addClass("adding-expense");
			$("#button-home-back").show();

			$(document).one("addExpenseCategoryListLoaded", function() {
				//Spending.UI.Expense.$cost.focus();
			});

			Spending.UI.Home.showExpenseForm(null, null);
			Spending.UI.Expense.updateFormForAdd();
		});

		$("#home-favourites").on("tap", "a", function(event) {
			event.preventDefault();

			Spending.ga.trackEvent("Interaction", "Home", "Favourite", 1);

			Spending.state.favouriteExpenseUUID = $(this).data("uuid");
			if ( Spending.isTablet )
			{
				$("#home-add-expense").hide();
				Spending.UI.Home.showExpenseForm(null, $(this).data("uuid"));
			}
			else
			{
				Spending.state.favouriteExpenseUUID = $(this).data("uuid");
				$.mobile.changePage("expense.html");
			}
			return false;
		});

		$("#button-home-back").on("tap", function (event) {
			event.preventDefault();

			Spending.ga.trackEvent("Interaction", "Home", "Back", 1);

			Spending.UI.Home.hideTabletAddExpense();
		});

		if ($(window).width() >= 801)
		{
			Spending.state.historyStartFrom = 0;
			Spending.state.historyNumShown = 20;

			Spending.UI.ApplyEditingToHistoryList($("#home-history-list"), $("#home-history-edit"));
			Spending.UI.ApplyEditingToFavouritesList($("#home-favourites-list"), $("#home-favourites-edit"));

			$("#home-history-content").height($(window).height() - 44);

		}

	} catch (e) {
		console.log("Exception in pageinit: " + JSON.stringify(e));
	}
});

Spending.UI.Home.setTab = function (tabName)
{
	var $favlist = $("#home-favourites-list");
	var $favedit = $("#home-favourites-edit");
	var $histlist = $("#home-history-list");
	var $histedit = $("#home-history-edit");

	var context = document.getElementById("home-history-content");

	$("li", context).removeClass("active");
	$tab = $("li[data-function='" + tabName + "']", context).addClass("active");

	if (tabName === "favourites")
	{
		$(".tab-fav-content").scrollTop(0);
		$histedit.hide();
		Spending.UI.setFavouritesEditMode($favlist, $favedit, false);
		if ($favlist.find("li").length > 0)
		{
			$favedit.show();
		}
	}
	else if(tabName === "history")
	{
		$(".tab-his-content").scrollTop(0);
		if (Spending.state.homeHistoryLoaded !== true)
		{
			Spending.UI.Home.refreshHistory();
		}

		$favedit.hide();
		Spending.UI.setHistoryEditMode($histlist, $histedit, false);
		if ($histlist.find("li").length > 0)
		{
			$histedit.show();
		}
	}

	Spending.state.currentTab = tabName;

	Spending.ga.trackEvent("Interaction", "Home", "Tablet: Hist/Fav Tabs", 1);
};

Spending.UI.Home.showExpenseForm = function(editUuid, favouriteUuid)
{
	$("#home-add-expense-form").show();

	if (!Spending.state.homeExpenseFormInit)
	{
		Spending.UI.Expense.initExpenseForm("home", "single");
		Spending.state.homeExpenseFormInit = true;
	}
	else
	{
		Spending.UI.Expense.resetExpenseForm("single");
	}

	Spending.state.favouriteExpenseUUID = null;
	Spending.state.editExpenseUUID = null;

	$("#quick-vis").hide();
	$("#home-expense-content").addClass("adding-expense");
	$("#button-home-back").show();


	if ( editUuid || favouriteUuid )
	{
		if ( favouriteUuid )
		{
			Spending.state.favouriteExpenseUUID = favouriteUuid;
		}
		else
		{
			Spending.state.editExpenseUUID = editUuid;
		}
		Spending.UI.Expense.updateFormForEdit();
	}
};

Spending.UI.Home.updateExpenseSummary = function UIUpdateExpenseSummary ()
{
	console.log("updateExpenseSummary");
	if($("#home-add-expense-form").is(":visible"))
	{
		console.log("Not updating expense summary because form is showing");
		return;
	}

	$("#home-expense-content, #quick-vis, #home-footer").hide();
	var cycleEnd = 0;
	var cycleStart = 0;
	var period = +Spending.Config.Settings.cyclePeriod;

	if (period === Spending.Cycle.NONE)
	{
		cycleEnd = 0;
	}
	else
	{
		cycleStart = +Spending.Config.Settings.cycleStartDate;
		cycleStart = Spending.fixDateTime(cycleStart);

		if ( cycleStart > 0 && period !== Spending.Cycle.NONE)
		{
			cycleEnd = Spending.getCycleEnd(cycleStart, period).getTime();
		}
	}

	Spending.getExpenseTotalForPeriod(cycleStart, cycleEnd, function(total) {

		$(".current-total").text("$" + Spending.prettyFormat(total, 2));

		var budget = +Spending.Config.Settings.spendingLimit;
		var spendingClass = "underbudget";

		if ( budget === 0 )
		{
			$("#budget").hide();
		}
		else
		{
			if ( total > budget )
			{
				spendingClass = "overlimit";
			}

			$("#budget").show().text("$" + Spending.prettyFormat(budget, 0));
			$("#spent-bar").show().css({width: ((total / budget) * 100) + "%"});
		}

		var cycleStartDate = +Spending.Config.Settings.cycleStartDate;
		var cyclePeriod = +Spending.Config.Settings.cyclePeriod;

		if ( budget === 0 )
		{
			$("#no-limits").show();
			$("#chart").hide();
		}
		else if ( budget > 0 && (cyclePeriod === undefined || cyclePeriod === Spending.Cycle.NONE) )
		{
			$("#chart").show();
			$("#time-bar").hide();
			$("#cycle-dates").hide();
			$("#no-limits").hide();
		}
		else if ( budget > 0 && cycleStartDate !== 0 && cyclePeriod !== Spending.Cycle.NONE )
		{
			$("#chart").show();
			$("#time-bar").show();
			$("#spent-bar").show();
			$("#cycle-dates").show();
			$("#no-limits").hide();

			var startDate = moment(new Date(cycleStartDate));
			var endDate = moment(Spending.getCycleEnd(startDate, cyclePeriod));

			$("#start-date").text(startDate.format("DD-MMM"));
			$("#end-date").text(endDate.format("DD-MMM"));
			var daysTotal = endDate.diff(startDate, "days");

			var today = Spending.state.today;
			today.setHours(0);
			today.setMinutes(0);
			today.setSeconds(0);
			today.setMilliseconds(0);

			var daysLeft = endDate.diff(moment(today), "days");
			$("#remaining-days").text(daysLeft);

			var remainingBudget = budget - total;
			$("#remaining-budget").text((remainingBudget < 0 ? "-" : "") + "$" + Spending.prettyFormat(Math.abs(remainingBudget), 0));
			var daysPercentage = 1 - (daysLeft / daysTotal);
			$("#time-bar").show().css({width: (daysPercentage * 100) + "%"});

			var targetSpent = budget * daysPercentage;

			if ( total > targetSpent && total <= budget )
			{
				spendingClass = "overbudget";
			}
		}

		$("#quick-vis").attr("class", spendingClass);
		$("#home-expense-content, #quick-vis").fadeIn(100);
		if (!Spending.isTablet)
		{
			$("#home-footer").fadeIn(100);
		}
	});
};

$(document).on("pagebeforeshow", "#intro", function() {
	$.when(Spending.dbInitPromise).then(function() {
		Spending.Config.setSetting( "firstLoad", "false", function() {} );
	});
});

$(document).on("pagebeforehide", "#home", function() {
	$(".first-expense").hide();
	if ($("#home-add-expense-form").is(":visible"))
	{
		Spending.UI.Home.hideTabletAddExpense();
	}
});

Spending.UI.Home.refreshHistory = function ()
{
	console.log("HOME: Refresh history: ", Spending.state.historyStartFrom);
	Spending.state.homeHistoryLoaded = true;
	Spending.UI.initialiseHistory($("#home-history-list"), $(".tab-his-content"));
};

Spending.UI.Home.refreshFavourites = function ()
{
	Spending.getFavouritesSummary((Spending.isTablet ? -1 : 5), function (favourites) {
		var $favourites = $( Spending.isTablet ? "#home-favourites-list" : "#home-favourites");
		$("li", $favourites).remove();

		var template = $(( Spending.isTablet ? "#template-favourite" : "#template-favourite-phone")).html();
		var compiledTemplate = _.template(template);
		var favouritesHtml = "";
		_.each(favourites, function(favourite) {
			favouritesHtml += compiledTemplate(favourite);
		});
		$favourites.append(favouritesHtml);

		$("#home-favourites-edit").toggle(favourites.length !== 0);

		$favourites.listview("refresh");

		Spending.UI.Home.resizeFavourites();
	});
};

Spending.UI.Home.resizeFavourites = function ()
{
	if ( ! Spending.isTablet )
	{
		// resize favourites list
		var $homeFavs = $("#home-favourites");
		var offset = $homeFavs.offset();
		console.log("OFF:", offset);
		var newHeight = $(window).height() - offset.top - 85; // 85px to compensate for footer height
		$homeFavs.css("height", newHeight);
	}
};

Spending.UI.Home.refreshHomeView = function()
{
	console.log("HOME: Refreshing home view");
	var tablet = false;
	Spending.isTablet = false;

	// for tablet mode we need to load history as well
	if ( $(window).width() >= 801 )
	{
		tablet = true;
		Spending.isTablet = true;
		$("body").addClass("tablet");

		if (Spending.state.historyStartFrom === null)
		{
			$("#home-history-list").find("li").remove();
			Spending.state.historyStartFrom = 0;
		}

	}
	else
	{

	}

	Spending.getExpenseCount(function (count) {
		if ( count === 0 )
		{
			$(".first-expense").fadeIn(50);
		}
	});

	Spending.checkCycle(function(cycleStart, cycleEnd) {
		Spending.UI.Home.updateExpenseSummary();

		console.log("HOME: Current Tab: ", Spending.state.currentTab, " Tablet: ", tablet);


		if (Spending.state.currentTab === undefined)
		{
			Spending.UI.Home.setTab("favourites");
		}

		if (tablet === false || Spending.state.currentTab === "favourites")
		{
			console.log("HOME: Refreshing favourites");
			Spending.UI.Home.refreshFavourites();
		}
		else if(tablet && Spending.state.currentTab === "history")
		{
			console.log("HOME: Refreshing history");
			Spending.UI.Home.refreshHistory();
		}

	});
};

$(document).on("pagebeforeshow", "#home", function() {
	"use strict";

	Spending.state.editExpenseUUID = null;
	Spending.state.favouriteExpenseUUID = null;

	$.mobile.silentScroll(0);

	$.when(Spending.dbInitPromise, Spending.deviceInitPromise).then(function() {

		console.log("HOME: PAGE BEFORE SHOW");

		Spending.TestFlight.passCheckpointSimple( "ShowHome" );
		Spending.ga.trackPageview("/home");
		/* INTRO / SPLASH SCREEN - NOW DISABLED
		if ( ! Spending.Config.Settings.firstLoad || Spending.Config.Settings.firstLoad === "true" )
		{
			$.mobile.changePage("intro.html");
			return;
		}
		*/

		Spending.UI.Home.refreshHomeView();

		if (Spending.state.hasOwnProperty("goToRateUrl") && Spending.state.goToRateUrl)
		{
			window.location = Spending.state.goToRateUrl;
			Spending.state.goToRateUrl = null;
		}

	});
});

// RATING DIALOG

Spending.UI.datePicker = function SpendingUIdatePicker (context, initialDate, callback)
{
	if ( window.CordovaPlatform !== "None" )
	{
        var $elem = $(context);
        var offset = $elem.offset();
        var rect = {
            x: offset.left,
            y: offset.top,
            width: $elem.width(),
            height: $elem.height()
        };

        var options = {
            date: initialDate,
            mode: "date",
            allowOldDates: true,
            sentinel: "HI!",
            rect: rect
        };

        window.plugins.datePicker.show( options, function (newDate) {
            if (newDate === null)
            {
                $(context).closest("li").removeClass("ui-btn-active");
                return;
            }

            if (typeof(newDate) !== "object")
            {
                newDate = new Date(newDate);
            }
            callback(newDate);
        });
    } else {
		var newValue = prompt("Date", moment(new Date(initialDate)).format("YYYY-MM-DD"));
        var date = new Date(Number(newValue.substr(0,4)), Number(newValue.substr(5, 2)) - 1, Number(newValue.substr(8,2)));
        callback(date);
    }
};

$(document).on("pageinit", "#dialog-rate", function (event) {
	$("#dialog-rate-rate").on("tap", function (event) {
		event.preventDefault();
		console.log("RATE: Bounce to rate - save the fact");

		Spending.ga.trackEvent("Interaction", "Rate", "Rate", 1);

		Spending.Config.setSetting("rateAfter", -1, function () {
			if (window.CordovaPlatform === "iOS")
			{
				Spending.state.goToRateUrl = "https://itunes.apple.com/us/app/trackmyspend/id542589077?ls=1&mt=8";
			}
			else
			{
				Spending.state.goToRateUrl = "https://play.google.com/store/apps/details?id=au.gov.asic.trackmyspend";
			}

			$(".ui-dialog").dialog('close');
		});
	});

	var __rateLater = function (callback) {
		var rateAfter = +Spending.Config.Settings.rateAfter;
		rateAfter *= 2;

		console.log("RATE: Next rate popup at " + rateAfter + " launches");

		Spending.Config.setSetting("rateAfter", rateAfter, callback);
	};

	$("#dialog-rate-later").on("tap", function (event) {
		event.preventDefault();
		Spending.ga.trackEvent("Interaction", "Rate", "Later", 1);
		__rateLater(function () {
			$(".ui-dialog").dialog('close');
		});
	});

	$("#dialog-rate-never").on("tap", function (event) {
		console.log("RATE: Never show rate popup");
		event.preventDefault();
		Spending.ga.trackEvent("Interaction", "Rate", "Never", 1);

		Spending.Config.setSetting("rateAfter", -1, function () {
			$(".ui-dialog").dialog('close');
		});
	});

	$("#dialog-rate-contact").on("tap", function (event) {
		console.log("RATE: Contact Us");
		event.preventDefault();
		Spending.Config.setSetting("rateAfter", -1, function () {
			$.mobile.changePage("feedback.html");
		});
	});
});

$(document).on("pageshow", "#dialog-rate", function () {
	Spending.ga.trackPageview("/dialog-rate");
});


Spending.UI.ApplyEditingToFavouritesList = function($favlist, $editButton)
{
	var dragging = false,
		$dragged = null,
		$proxy = null,
		grabX, grabY,
		favTop, favCount,
		itemHeight, currentIndex;

	Spending.state.favouritesEditMode = false;

	$editButton.on("tap", function (event) {
		event.preventDefault();

		Spending.UI.setFavouritesEditMode($favlist, $editButton, !Spending.state.favouritesEditMode);
	});

	var getEventY = function __getEventY (event)
	{
		if (event.originalEvent.touches)
		{
			y = event.originalEvent.touches[0].pageY;
		}
		else
		{
			y = event.pageY;
		}
		return y;
	};

	var dropIndex = function __dropIndex (event)
	{
		var y = getEventY(event) -  favTop;
		var index = Math.min(Math.max(0, Math.floor(y / itemHeight)), favCount - 1);
		return index;
	};

	$favlist.on("tap", "a.add", function(event) {
		event.preventDefault();

		Spending.ga.trackEvent("Interaction: Favourites", "Add from Favourite", "", 1);

		var uuid = $(this).data("uuid");
		var favouriteUuid = null;
		var expenseUuid = null;

		if ( Spending.state.favouritesEditMode )
		{
			expenseUuid = $(this).data("uuid");
		}
		else
		{
			favouriteUuid = $(this).data("uuid");
		}

		if (Spending.isTablet)
		{
			$("#home-add-expense").hide();
			Spending.UI.Home.showExpenseForm(expenseUuid, favouriteUuid);
		}
		else
		{
			Spending.state.favouriteExpenseUUID = favouriteUuid;
			Spending.state.editExpenseUUID = expenseUuid;
			$.mobile.changePage("expense.html");
		}

	});

	var $deleteRow, deleteUUID;

	$favlist.on("tap", "a.delete", function (event) {
		Spending.ga.trackEvent("Interaction: Favourites", "Delete Button", "", 1);

		$deleteRow = $(this).closest("li");
		deleteUUID = $deleteRow.find(".add").data("uuid");

		Spending.state.deleteUUID = deleteUUID;
		Spending.state.deleteType = "favourite";
		Spending.state.deleteCallback = function() {
			event.preventDefault();
			Spending.deleteExpense( deleteUUID, function () {

				Spending.ga.trackEvent("Interaction: Favourites", "Deleted", "", 1);

				$(document).trigger("favouriteDeleted");
				$deleteRow.remove();
				$favlist.listview("refresh");
				$('.ui-dialog').dialog('close');
			}, true);
		};

	});


	$("#favourite-delete-delete").on("tap", function (event) {
		Spending.ga.trackEvent("Interaction: Favourites", "Delete Confirmed", "", 1);
		event.preventDefault();
		Spending.deleteExpense( deleteUUID, function () {
			$deleteRow.remove();
			$favlist.listview("refresh");
			$('.ui-dialog').dialog('close');
		}, true);
	});

	$favlist.on("touchstart mousedown", "a.reorder", function (event) {
		event.preventDefault();
		var $first = $($favlist.find("li").get(0));

		itemHeight = $first.height();
		$dragged = $(this).closest("li");
		var item = $dragged.find("a").html();
		$proxy = $("<ul class='dragproxy' data-role='listview' data-inset='true'><li>" + item + "</li></ul>").appendTo("#favourites .ui-content");
		$proxy.listview();

		favTop = $favlist.offset().top;//$favlist.position().top;//$first.position().top;
		favCount = $favlist.find("li").length;

		currentIndex = dropIndex(event);

		if (!event.originalEvent.touches)
		{
			grabX = event.pageX;
			grabY = event.pageY;
		}
		else
		{
			grabX = event.originalEvent.touches[0].pageX;
			grabY = event.originalEvent.touches[0].pageY;
		}

		$proxy.css({top: grabY - favTop - 20 });

		$dragged.fadeTo(100, 0.0);

		dragging = true;

		$(window).one("touchend mouseup", function (event) {
			var uuid = $dragged.find("a").data("uuid");

			Spending.ga.trackEvent("Interaction: Favourites", "Re-ordered", "", 1);

			dragging = false;
			$dragged.fadeTo(100, 1);
			$dragged = null;
			$(window).off("touchmove.listdrag mousemove.listdrag");
			$proxy.remove();

			Spending.changeFavouriteOrderByUUID(uuid, currentIndex);

		});
		$(window).on("touchmove.listdrag mousemove.listdrag", function (event) {
			if ( dragging )
			{
				var y = getEventY(event) - favTop - 20;

				$proxy.css({top: y});
				var index = dropIndex(event);

				if ( currentIndex !== index )
				{
				}

				var $elem = $($favlist.find("li")[index]);

				if ( currentIndex < index )
				{
					$dragged.detach().insertAfter($elem);
					currentIndex = index;
					$favlist.listview("refresh");
				}
				else if ( currentIndex > index )
				{
					$dragged.detach().insertBefore($elem);
					currentIndex = index;
					$favlist.listview("refresh");
				}

			}
		});
	});
};

Spending.UI.setFavouritesEditMode = function setFavouritesEditMode ($favlist, $editButton, editMode)
{
	if ( editMode === false  )
	{
		Spending.ga.trackEvent("Interaction: Favourites", "Edit Button", "Off", 1);
		$(".ui-btn-text", $editButton).html("Edit");
		Spending.state.favouritesEditMode = false;
		$favlist.removeClass("editing");
	}
	else
	{
		Spending.ga.trackEvent("Interaction: Favourites", "Edit Button", "On", 1);
		$(".ui-btn-text", $editButton).html("Done");
		Spending.state.favouritesEditMode = true;
		$favlist.addClass("editing");
	}
	Spending.state.favouritesEditMode = editMode;
};

$(document).on("pageinit", "#favourites", function() {
	Spending.UI.ApplyEditingToFavouritesList($("#favourites-list"), $("#favourites-edit"));
});

$(document).on("pagebeforeshow", "#favourites", function() {
	Spending.ga.trackPageview("/favourites");
	var $favourites = $("#favourites-list");
	$favourites.find("li").remove();
	var template = $("#favourite-list-template").html();

	var $editButton = $("#favourites-edit");
	Spending.getFavourites(-1, function(favourites) {
		_.each(favourites, function(favourite) {
			$favourites.append(_.template(template, favourite));
		});
		$editButton.toggle(favourites.length !== 0);
		$favourites.listview("refresh");
	});

	// disable edit mode
	Spending.UI.setFavouritesEditMode($favourites, $editButton, false);
});

try {
  if(!window) {
    window = {};
    //exports.console = console;
  }
} catch(e) {
  window = {};
  exports.console = console;
}

var persistence = (window && window.persistence) ? window.persistence : {}; 

if(!persistence.store) {
  persistence.store = {};
}

persistence.store.websql = {};


persistence.store.websql.config = function(persistence, dbname, description, size) {
  var conn = null;

  /**
   * Create a transaction
   * 
   * @param callback,
   *            the callback function to be invoked when the transaction
   *            starts, taking the transaction object as argument
   */
  persistence.transaction = function (callback) {
    if(!conn) {
      throw new Error("No ongoing database connection, please connect first.");
    } else {
      conn.transaction(callback);
    }
  };

  ////////// Low-level database interface, abstracting from HTML5 and Gears databases \\\\
  persistence.db = persistence.db || {};

  persistence.db.implementation = "unsupported";
  persistence.db.conn = null;

  // window object does not exist on Qt Declarative UI (http://doc.trolltech.org/4.7-snapshot/declarativeui.html)
  if (window && window.openDatabase) {
    persistence.db.implementation = "html5";
  } else if (window && window.google && google.gears) {
    persistence.db.implementation = "gears";
  } else {
    try {
      if (openDatabaseSync) {
        // TODO: find a browser that implements openDatabaseSync and check out if
        //       it is attached to the window or some other object
        persistence.db.implementation = "html5-sync";
      }
    } catch(e) {
    }
  }

  persistence.db.html5 = {};

  persistence.db.html5.connect = function (dbname, description, size) {
    var that = {};
    var conn = openDatabase(dbname, '1.0', description, size);

    that.transaction = function (fn) {
      return conn.transaction(function (sqlt) {
          return fn(persistence.db.html5.transaction(sqlt));
        });
    };
    return that;
  };

  persistence.db.html5.transaction = function (t) {
    var that = {};
    that.executeSql = function (query, args, successFn, errorFn) {
      if(persistence.debug) {
        console.log(query, args);
      }
      t.executeSql(query, args, function (_, result) {
          if (successFn) {
            var results = [];
            for ( var i = 0; i < result.rows.length; i++) {
              results.push(result.rows.item(i));
            }
            successFn(results);
          }
        }, errorFn);
    };
    return that;
  };

  persistence.db.html5Sync = {};

  persistence.db.html5Sync.connect = function (dbname, description, size) {
    var that = {};
    var conn = openDatabaseSync(dbname, '1.0', description, size);

    that.transaction = function (fn) {
      return conn.transaction(function (sqlt) {
          return fn(persistence.db.html5Sync.transaction(sqlt));
        });
    };
    return that;
  };

  persistence.db.html5Sync.transaction = function (t) {
    var that = {};
    that.executeSql = function (query, args, successFn, errorFn) {
      if (args == null) args = [];

      if(persistence.debug) {
        console.log(query, args);
      }

      var result = t.executeSql(query, args);
      if (result) {
        if (successFn) {
          var results = [];
          for ( var i = 0; i < result.rows.length; i++) {
            results.push(result.rows.item(i));
          }
          successFn(results);
        }
      }
    };
    return that;
  };

  persistence.db.gears = {};

  persistence.db.gears.connect = function (dbname) {
    var that = {};
    var conn = google.gears.factory.create('beta.database');
    conn.open(dbname);

    that.transaction = function (fn) {
      fn(persistence.db.gears.transaction(conn));
    };
    return that;
  };

  persistence.db.gears.transaction = function (conn) {
    var that = {};
    that.executeSql = function (query, args, successFn, errorFn) {
      if(persistence.debug) {
        console.log(query, args);
      }
      var rs = conn.execute(query, args);
      if (successFn) {
        var results = [];
        while (rs.isValidRow()) {
          var result = {};
          for ( var i = 0; i < rs.fieldCount(); i++) {
            result[rs.fieldName(i)] = rs.field(i);
          }
          results.push(result);
          rs.next();
        }
        successFn(results);
      }
    };
    return that;
  };

  persistence.db.connect = function (dbname, description, size) {
    if (persistence.db.implementation == "html5") {
      return persistence.db.html5.connect(dbname, description, size);
    } else if (persistence.db.implementation == "html5-sync") {
      return persistence.db.html5Sync.connect(dbname, description, size);
    } else if (persistence.db.implementation == "gears") {
      return persistence.db.gears.connect(dbname);
    }
  };

  ///////////////////////// SQLite dialect

  persistence.store.websql.sqliteDialect = {
    // columns is an array of arrays, e.g.
    // [["id", "VARCHAR(32)", "PRIMARY KEY"], ["name", "TEXT"]]
    createTable: function(tableName, columns) {
      var tm = persistence.typeMapper;
      var sql = "CREATE TABLE IF NOT EXISTS `" + tableName + "` (";
      var defs = [];
      for(var i = 0; i < columns.length; i++) {
        var column = columns[i];
        defs.push("`" + column[0] + "` " + tm.columnType(column[1]) + (column[2] ? " " + column[2] : ""));
      }
      sql += defs.join(", ");
      sql += ')';
      return sql;
    },

    // columns is array of column names, e.g.
    // ["id"]
    createIndex: function(tableName, columns, options) {
      options = options || {};
      return "CREATE "+(options.unique?"UNIQUE ":"")+"INDEX IF NOT EXISTS `" + tableName + "__" + columns.join("_") + 
             "` ON `" + tableName + "` (" + 
             columns.map(function(col) { return "`" + col + "`"; }).join(", ") + ")";
    }
  };

  // Configure persistence for generic sql persistence, using sqliteDialect
  persistence.store.sql.config(persistence, persistence.store.websql.sqliteDialect);

  // Make the connection
  conn = persistence.db.connect(dbname, description, size);
  if(!conn) {
    throw new Error("No supported database found in this browser.");
  }
};

try {
  exports.persistence = persistence;
} catch(e) {}


Spending.UI.updateSettingsDisplay = function() {
    Spending.checkCycle(function(cycleStartTime, cycleEndTime, didGetAdjusted) {

        var hasDates = false;
        var startDate = 0;
        var endDate = 0;
        if ( cycleStartTime !== 0 )
        {
            startDate = moment(new Date(cycleStartTime));
            $("#setting-cycle-start-date .value").text(startDate.format("DD/MM/YYYY"));
        }
        else
        {
            $("#setting-cycle-start-date .value").text("Not set");
        }

        var cycle = "";
        var cyclePeriod = +Spending.Config.Settings["cyclePeriod"];

        Spending.state.visualisationStartDate = null;

        switch ( cyclePeriod )
        {
            case Spending.Cycle.NONE:
            cycle = "Not set";
            break;

            case Spending.Cycle.WEEKLY:
            cycle = "Weekly";
            break;

            case Spending.Cycle.FORTNIGHTLY:
            cycle = "Fortnightly";
            break;

            case Spending.Cycle.MONTHLY:
            cycle = "Monthly";
            break;

            case Spending.Cycle.YEARLY:
            cycle = "Yearly";
            break;
        }

        $("#setting-cycle-period").text(cycle);

        if ( cyclePeriod !== undefined && cyclePeriod !== Spending.Cycle.NONE && cycleStartTime !== 0 )
        {
            hasDates = true;
            endDate = moment(new Date(cycleEndTime));
            $("#setting-cycle-end-date").text(endDate.format("DD/MM/YYYY"));
        }
        else
        {
            $("#setting-cycle-end-date").text("Not set");
        }

        var mbx = window.plugins.messageBox;
        if ((didGetAdjusted === "past" || didGetAdjusted === "future") && hasDates)
        {
            var dateRange = startDate.format("DD/MM/YYYY") + " to " + endDate.format("DD/MM/YYYY");
            if (didGetAdjusted === "future")
            {
                mbx.alert("Cycle Changed", "The spending cycle cannot start in the future - it has been adjusted to " + dateRange + ". You can add expenses for future periods, but the tracking bar has to always display the current spending period");
            }
            else
            {
                mbx.alert("Cycle Changed", "The spending cycle cannot end in the past - it has been adjusted to " + dateRange + ". You can add expenses for past periods, but the tracking bar has to always display the current spending period and limit");
            }
        }

        var spendingLimit = +Spending.Config.Settings["spendingLimit"];
        if ( isNaN(spendingLimit) )
        {
            $("#setting-spending-limit .value").text("Not set");
        }
        else
        {
            $("#setting-spending-limit .value").text("$" + Spending.prettyFormat(spendingLimit, 2));
        }

        var useNeedWant = Spending.Config.Settings.useNeedWant;
        $("#select-needwant").val(useNeedWant === "true" ? 1 : 0).slider("refresh");
    });
};

$(document).on("pagebeforeshow", "#settings", function() {
    Spending.ga.trackPageview("/settings");
    Spending.TestFlight.passCheckpointSimple( "ShowSettings" );
    Spending.ga.trackEvent("Interaction: Settings", "Show Settings", "", 1);
    $.when(Spending.dbInitPromise).then(Spending.UI.updateSettingsDisplay);
});

$(document).on("pageinit", "#settings", function() {


    $("#setting-cycle-start-date").on("tap", function(event) {
        Spending.ga.trackEvent("Interaction: Settings", "Set Start Date", "", 1);
        event.preventDefault();

        var context = this;

        var cycleStartDate = +Spending.Config.Settings["cycleStartDate"];
        if ( cycleStartDate === 0 )
        {
            cycleStartDate = Spending.state.today.getTime();
        }

        if ( window.CordovaPlatform !== "None" )
        {
            var $elem = $(context);
            var offset = $elem.offset();
            var rect = {
                x: offset.left,
                y: offset.top,
                width: $elem.width(),
                height: $elem.height()
            };

            var options = {
                date: cycleStartDate,
                mode: "date",
                allowOldDates: true,
                sentinel: "HI!",
                rect: rect
            };

            window.plugins.datePicker.show( options, function (newDate) {
                if (newDate === null)
                {
                    $(context).closest("li").removeClass("ui-btn-active");
                    return;
                }

                if (typeof(newDate) !== "object")
                {
                    newDate = new Date(newDate);
                }

                Spending.Config.setSetting("cycleStartDate", newDate.getTime(), function() {
                    Spending.ga.trackEvent("Interaction: Settings", "Set Start Date", "Success", 1);
                    $(context).closest("li").removeClass("ui-btn-active");
                    Spending.TestFlight.passCheckpointSimple( "SettingsSetStart" );
                    Spending.UI.updateSettingsDisplay();
                });
            });
        } else {
            // non native fallback for local testing
            Spending.state.simpleFieldTitle = "Start Date";
            Spending.state.simpleFieldType = "date";
            Spending.state.simpleFieldValue = moment(new Date(cycleStartDate)).format("YYYY-MM-DD");
            Spending.state.simpleFieldCallback = function(newValue) {
                var date = new Date(Number(newValue.substr(0,4)), Number(newValue.substr(5, 2)) - 1, Number(newValue.substr(8,2)));
                Spending.Config.setSetting("cycleStartDate", date.getTime(), function() {
                    $(context).find(".value").text(newValue);
                    $.mobile.changePage("settings.html");
                });
            };

          $.mobile.changePage("simple-field.html");
        }
    });

    $("#setting-spending-limit").on("tap", function(event) {
        var context = this;

        event.preventDefault();

        Spending.ga.trackEvent("Interaction: Settings", "Set Spending Limit", "", 1);

        Spending.state.simpleFieldTitle = "Spending limit";

        // HACK workaround for Honeycomb which is severly broken when it comes to number fields
        if (window.CordovaPlatform === "Android" && Spending.platformVersion >= 3.0 && Spending.platformVersion < 4.0)
        {
            Spending.state.simpleFieldType = "text";
        }
        else
        {
            Spending.state.simpleFieldType = "number";
        }

        Spending.state.simpleFieldPrefix = "$";
        Spending.state.simpleFieldValue = $(this).find(".value").text().replace(/[^0-9\.]/g, "");
        Spending.state.simpleFieldCallback = function(newValue) {
            newValue = newValue.replace(/[^0-9\.]/g, "");
            Spending.Config.setSetting("spendingLimit", Number(newValue), function() {
                Spending.ga.trackEvent("Interaction: Settings", "Set Spending Limit", "Success", 1);
                Spending.TestFlight.passCheckpointSimple( "SettingsSetLimit" );
                $(context).find(".value").text(Spending.Config.Settings["spendingLimit"]);
                $.mobile.changePage("settings.html");
            });
        };
        $.mobile.changePage("simple-field.html");
    });

    $("#select-needwant").on("change", function (event) {
        var newValue = ($(this).val() === "1" ? "true" : "false");
        Spending.ga.trackEvent("Interaction: Settings", "Set Need/Want", newValue, 1);
        Spending.Config.setSetting("useNeedWant", newValue, function() {
            Spending.TestFlight.passCheckpointSimple( "SettingsChangeNeedWant" );
        } );
    });

    $("#settings-export").on("tap", function (event) {
        event.preventDefault();

        Spending.convertExpensesToCSV(function(csv) {

            if ( window.cordova === undefined )
            {
                console.log("No Cordova", csv);
                alert("If this was Cordova we would export now");
                return;
            }

            Spending.EmailPlugin.canSendEmail(function (result) {
                if (result)
                {
                    var datestamp = moment().format("YYYY-MM-DD");
                    var options = {
                        subject: "TrackMySPEND Export",
                        body: "Attached is your data export as at " + moment().format("DD/MM/YYYY"),
                        attachment: {
                            filename: "export-" + datestamp + ".csv",
                            type: "text/csv",
                            content: csv
                        }
                    };

                    if ( window.CordovaPlatform !== "None" )
                    {
                        Spending.TestFlight.passCheckpointSimple( "SettingsExport" );
                        Spending.EmailPlugin.nativeFunction(options, function(result) {
                            Spending.ga.trackEvent("Interaction: Settings", "Exported", "", 1);
                        },
                        function(error) {
                            alert("Error:" + error);
                        });
                    }
                }
                else
                {
                    window.plugins.messageBox.alert("Cannot send email", "Your device is not setup to send email");
                }
            });
        });
    });

    $("#setting-sync-redownload").on("tap", function (event) {
        event.preventDefault();
        Spending.Config.setSetting("smLastUpdate", "1970-01-01", function () {
            Spending.MoneySmart.performSync(true, function() {
            });
        });
    });
});

$(document).on("pageinit", "#simple-field", function() {
    $("#simple-field-done").on("tap", function(event) {
        event.preventDefault();
        Spending.state.simpleFieldCallback($("#simple-field-value").val());
        return false;
    });
});

$(document).on("pagebeforeshow", "#simple-field", function() {
    $("#simple-field-title").text(Spending.state.simpleFieldTitle);
    $("#simple-field-value").val(Spending.state.simpleFieldValue);
    $("#simple-field-prefix").html(Spending.state.simpleFieldPrefix || "");

    document.getElementById("simple-field-value").type = Spending.state.simpleFieldType;

    if ( Spending.state.simpleFieldType === "date" )
    {
        $("#simple-field-value").addClass("nativedatepicker");
    }
    else
    {
        $("#simple-field-value").removeClass("nativedatepicker");
    }
});

$(document).on("pageshow", "#simple-field", function() {
    $("#simple-field-value").focus();
});

$(document).on("pageinit", "#settings-purge", function() {
    $("#settings-purge-confirm").on("tap", function(event) {
        event.preventDefault();
        Spending.ga.trackEvent("Interaction: Settings", "Reset App", "Start", 1);
        Spending.resetAll(function() {
            Spending.ga.trackEvent("Interaction: Settings", "Reset App", "Success", 1);
            $.mobile.changePage("index.html");
        });
    });
});

$(document).on("pageinit", "#settings-cycle", function () {
    $("#setting-cycle-period-list").on("tap", "a", function(event) {
        var newValue = +$(this).attr("data-value");
        var newLabel = $(this).text();

        Spending.Config.setSetting("cyclePeriod", newValue, function() {
            Spending.ga.trackEvent("Interaction: Settings", "Set Cycle Period", newLabel, 1);
            Spending.TestFlight.passCheckpointSimple( "SettingsSetPeriod" );
            $("#setting-cycle-period").text(newLabel);
            $.mobile.changePage("settings.html");
        });
        event.preventDefault();
    });
});

$(document).on("pageinit", "#share", function () {

    var shareValidator = $("#share-form").validate({
        errorPlacement: function(error, element) {
            error.prependTo(element.parent());
        },
        errorElement: "span"
    });

    $("#share-form").submit( function (event) {
        event.preventDefault();

        if (!shareValidator.valid())
        {
            return;
        }

        var options = {
            to: $("#share-friend-email").val(),
            subject: "Check TrackMySPEND app from MoneySmart",
            body: "Hi " + $("#share-friend").val() + ",\n\nI thought you might be interested in TrackMySPEND app.\n\n" +
            "Track your personal expenses on the go against a spending limit.\n\n" +
            "Separate the 'needs' and 'wants', and track spending by categories.\n\n\n" +
            "Get the MoneySmart TrackMySPEND iPhone and iPad:\nhttp://itunes.apple.com/au/app/trackmyspend/id542589077?mt=8\n\n" +
            "Get the MoneySmart TrackMySPEND Android app:\nhttps://play.google.com/store/apps/details?id=au.gov.asic.trackmyspend"
        };

        if ( window.CordovaPlatform !== "None" )
        {
            Spending.ga.trackEvent("Interaction: Settings", "Share", "email", 1);
            Spending.TestFlight.passCheckpointSimple( "ShareEmail" );
            Spending.EmailPlugin.nativeFunction(options, function(result) {
                if ( result > 0 )
                {
                    $.mobile.changePage("settings.html");
                }
            },
            function(error) {
                alert("Error:" + error);
            });
        }
        else
        {
            console.log("No Cordova. Email body: " + options.body);
        }

        return false;
    });
});

$(document).on("pageinit", "#feedback", function () {

    var rateHref = "";
    if (window.CordovaPlatform === "Android")
    {
        rateHref = "https://play.google.com/store/apps/details?id=au.gov.asic.SpendingTracker";
    }
    else if(window.CordovaPlatform === "iOS")
    {
        rateHref = "http://itunes.apple.com/us/app/trackmyspend/id542589077?ls=1&mt=8";
    }

    $("#feedback-rate").attr("href", rateHref);

    $("#feedback-form input,#feedback-form textarea").focus( function (event) {
        $(this).removeClass("error");
    });

    $("#feedback-form").submit(function (event) {
        event.preventDefault();

        isValid = true;

        var name = $("#feedback-name").val();
        if (name === "")
        {
            Spending.ga.trackEvent("Errors", "Settings: Feedback", "Invalid Name", 1);
            $("#feedback-name").addClass("error");
            isValid = false;
        }

        var comments = $("#feedback-comments").val();
        if (comments === "")
        {
            Spending.ga.trackEvent("Errors", "Settings: Feedback", "Invalid Comment", 1);
            $("#feedback-comments").addClass("error");
            isValid = false;
        }

        if (!isValid)
        {
            return false;
        }

        var deviceString = "";
        if (window.CordovaPlatform !== "None")
        {
            deviceString = device.platform + " " + device.version + " (" + Spending.appVersion + ")";
            Spending.ga.trackEvent("General", "Device String", deviceString, 1);
        }
        else
        {
            deviceString = navigator.userAgent;
        }
        console.log("Device String is: " + deviceString);
        var options = {
            to: "feedback@moneysmart.gov.au",
            subject: "TrackMySPEND Feedback",
            body: "Name:\n" + name + "\n\nWould like reply?\n" + $("#feedback-reply").val() + "\n\nComments:\n" + comments + "\n\nDevice: " + deviceString
        };

        if ( window.CordovaPlatform !== "None" )
        {
            Spending.ga.trackEvent("Interaction: Settings", "Feedback Sent", "", 1);
            Spending.TestFlight.passCheckpointSimple( "FeedbackEmail" );
            Spending.EmailPlugin.nativeFunction(options, function(result) {
                //if ( result === 0 )
            },
            function(error) {
                alert("Error:" + error);
            });
        }
        else
        {
        }
        return false;
    });
});

$(document).on("pagebeforeshow", "#debug", function () {
    var $settings = $("#debug-settings");
    $.when(Spending.dbInitPromise).then(function() {
        $settings.find("tr").not(":first-child").remove();
        _.each(Spending.Config.Settings, function (value, key) {
            console.log(key + ": " + value);
            if(Spending.Config.Settings.hasOwnProperty(key))
            {
                $settings.append($("<tr><td>" + key + "</td><td>" + value + "</td></tr>"));
            }
        });
    });
});




Spending.xml = {};

Spending.xml.xmlElement = function(name, value, isCDATA)
{
	if ( isCDATA )
	{
		value = "<![CDATA[" + value + "]]>";
	}

	var xml = "<" + name + ">" + value + "</" + name + ">";
	return xml;
};

Spending.xml.transactionToXML = function(transaction, now)
{
	var value = "";

	now = now || new Date();

	value += Spending.xml.xmlElement("updatedDate", moment(now).format());
	value += Spending.xml.xmlElement("id", transaction.id);
	value += Spending.xml.xmlElement("uuid", transaction.uuid);
	value += Spending.xml.xmlElement("type", transaction.type);

	var actionName = "";
	switch ( transaction.action )
	{
		case Spending.Data.TransactionAction.CREATE:
			actionName = "create";
			break;
		case Spending.Data.TransactionAction.UPDATE:
			actionName = "update";
			break;
		case Spending.Data.TransactionAction.DELETE:
			actionName = "delete";
			break;
	}

	value += Spending.xml.xmlElement("action", actionName);
	value += Spending.xml.xmlElement("targetId", transaction.target_id);

	transaction.data.txnTimestamp = transaction.timestamp;

	value += Spending.xml.xmlElement("data", JSON.stringify(transaction.data), true);

	return Spending.xml.xmlElement("transaction", value);
};

Spending.xml.XMLToTransactions = function(xmldoc)
{
	var transactions = [];
	var xmlTransactions = xmldoc.getElementsByTagName("UpdatedNodes");
	if ( ! xmlTransactions[0] )
	{
		return transactions;
	}

	var nodes = xmlTransactions[0].childNodes;

	_.each(nodes, function ( node ) {
		var transaction = {};
		transaction.id = node.getElementsByTagName("id")[0].childNodes[0].nodeValue;
		transaction.type = node.getElementsByTagName("type")[0].childNodes[0].nodeValue;
		transaction.uuid = node.getElementsByTagName("uuid")[0].childNodes[0].nodeValue;

		var actionName = node.getElementsByTagName("action")[0].childNodes[0].nodeValue;
		var actionValue;
		switch(actionName) {
			case "create":
			actionValue = Spending.Data.TransactionAction.CREATE;
			break;
			case "update":
			actionValue = Spending.Data.TransactionAction.UPDATE;
			break;
			case "delete":
			actionValue = Spending.Data.TransactionAction.DELETE;
			break;
		}
		transaction.action = actionValue;

		transaction.target_id = node.getElementsByTagName("targetId")[0].childNodes[0].nodeValue;
		transaction.data = JSON.parse(node.getElementsByTagName("data")[0].childNodes[0].nodeValue);
		if (transaction.data.hasOwnProperty("txnTimestamp"))
		{
			transaction.timestamp = transaction.data.txnTimestamp;
			delete transaction.data.txnTimestamp;
		}
		else
		{
			transaction.timestamp = new Date(node.getElementsByTagName("updatedDate")[0].childNodes[0].nodeValue).getTime();
		}

		transactions.push(transaction);
	});

	return transactions;
};

Spending.xml.XMLStringToTransactions = function(xmlString)
{
	var parser = new DOMParser();
	var xmldoc = parser.parseFromString(xmlString, "text/xml");
	var transactions = Spending.xml.XMLToTransactions(xmldoc);

	return transactions;
};

Spending.xml.getNodeContent = function(xml, nodeName)
{
	var node = xml.getElementsByTagName(nodeName);
	return node[0].childNodes[0].nodeValue;
};

$(document).on("pageinit", "#visualise-detail", function (event) {
	$("#vis-detail-prev").on("tap", function (event) {
		event.preventDefault();

		var period = +Spending.Config.Settings.cyclePeriod;
		var cycle = Spending.getPreviousCycleForCycle(Spending.state.visualisationStartDate, Spending.state.visualisationEndDate, period);
		Spending.UI.visualiseDetailUpdateWithCycle(cycle);
	});


	$("#vis-detail-next").on("tap", function (event) {
		event.preventDefault();

		var period = +Spending.Config.Settings.cyclePeriod;
		var cycle = Spending.getNextCycleForCycle(Spending.state.visualisationStartDate, Spending.state.visualisationEndDate, period);
		Spending.UI.visualiseDetailUpdateWithCycle(cycle);
	});

});

Spending.UI.visualiseDetailUpdateWithCycle = function (cycle)
{
	Spending.state.visualisationStartDate = moment(cycle[0]);
	Spending.state.visualisationEndDate = moment(cycle[1]);

	Spending.UI.visualiseDetailForDateRange(Spending.state.visualisationDetailCategory, Spending.state.visualisationStartDate, Spending.state.visualisationEndDate);
};


$(document).on("pagebeforeshow", "#visualise-detail", function() {
	Spending.ga.trackPageview("/visualise");
	$.when(Spending.dbInitPromise).then(function() {
		var params = Spending.getUrlParams();

		Spending.UI.visualiseDetailForDateRange(Spending.state.visualisationDetailCategory, Spending.state.visualisationStartDate, Spending.state.visualisationEndDate);
	});
});

Spending.UI.visualiseDetailForDateRange = function (category, startDate, endDate)
{
	$(".category-name").text(category.name);

	var $details = $("#vis-details");
	$("tr:not(:first-child)", $details).remove();
	var startTime = 0;
	var endTime = 0;
	if (startDate)
	{
		$("#vis-from").html(startDate.format("DD/MM/YY"));
		$("#vis-to").html(endDate.format("DD/MM/YY"));
		$("#vis-period").show();
		startTime = startDate.toDate().getTime();
		endTime = endDate.toDate().getTime();
		$(".vis-detail-nav").show();
	}
	else
	{
		startTime = 0;
		endTime = Number.MAX_VALUE;
		$("#vis-period").hide();
		$(".vis-detail-nav").hide();
	}

	Spending.getExpensesForDateRange(startTime, endTime, function(expenses) {
		var template = $("#visualise-detail-template").html();
		var rowNum = 1;
		_.each(expenses, function(expense) {
			if ( expense.category.uuid === category.uuid )
			{
				expense.rowNum = rowNum++;
				var $row = $(_.template(template, expense)).appendTo($details);
			}
		});
		$(".needwant", $details).toggle( Spending.Config.Settings.useNeedWant !== "false" );

		$("#vis-detail-none").toggle(expenses.length === 0);

	});
};

Spending.UI.visualiseCanvasTap = function (event)
{
	var y = event.offsetY;
	if (event.pageY)
	{
		var $canvas = $(document.getElementById("vis-chart"));
		var offset = $canvas.offset();
		y = event.pageY - offset.top;
	}

	var region = _.find(Spending.UI.VisClickMap, function (region) {
		if ( region.yFrom <= y &&  y < region.yTo )
		{
			return region;
		}
	});

	if ( region )
	{
		if ( ! Spending.state.visInSubCategory )
		{
			Spending.state.visInSubCategory = true;
			Spending.state.lastCategory = null;
			Spending.UI.buildVisualisation(Spending.state.visExpenses, region.uuid, Spending.state.visualisationStartDate, Spending.state.visualisationEndDate);
		}
		else
		{
			Spending.state.visualisationDetailCategory = Spending.categoryCache[region.uuid];
			/*
			var detailData = {
				category: region.uuid,
			};

			if (Spending.state.visualisationStartDate)
			{
				detailData.from = Spending.state.visualisationStartDate.valueOf()
			}

			if (Spending.state.visualisationEndDate)
			{
				detailData.to = Spending.state.visualisationEndDate.valueOf();
			}
			*/
			$.mobile.changePage("visualise-detail.html");//, {data: detailData});
		}
	}
};

Spending.UI.buildVisualisation = function __buildVisualisation(expenses, filterCategory, startDate, endDate, inlineTotal)
{
	var BAR_HEIGHT = 28;
	var CELL_HEIGHT = 50;
	var SUMMARY_HEIGHT_TOTAL_ONLY = 36;
	var SUMMARY_HEIGHT_FULL = 80;
	var CHART_PADDING = 10;

	Spending.state.visInSubCategory = ( filterCategory && filterCategory !== "");

	var categoryTotals = {};
	var count = 0;
	var total = 0;

	_.each(expenses, function(expense) {
		if ( filterCategory && expense.category.parent.uuid === filterCategory )
		{
			// FIXME DRY!
			if ( ! categoryTotals.hasOwnProperty(expense.category.name) )
			{
				categoryTotals[expense.category.name] = {name: expense.category.name, id: expense.category.uuid, need: 0, want: 0, total: 0};
				count++;
			}
			categoryTotals[expense.category.name][(expense.isNeed ? "need" : "want")] += expense.cost;
			categoryTotals[expense.category.name].total += expense.cost;
			total += expense.cost;
		}
		else if ( ! filterCategory )
		{
			if ( ! categoryTotals.hasOwnProperty(expense.category.parent.name) )
			{
				categoryTotals[expense.category.parent.name] = {name: expense.category.parent.name, id: expense.category.parent.uuid, need: 0, want: 0, total: 0};
				count++;
			}

			categoryTotals[expense.category.parent.name][(expense.isNeed ? "need" : "want")] += expense.cost;
			categoryTotals[expense.category.parent.name].total += expense.cost;
			total += expense.cost;
		}
	});

	Spending.state.currentCategory = filterCategory;

	if (filterCategory)
	{
		Spending.state.lastCategory = filterCategory; //Spending.categoryCache[filterCategory].parent.uuid;
	}

	Spending.state.visExpenses = expenses;

	// find the biggest category
	var maxTotal = _.max(categoryTotals, function(item) {
		return item.total;
	});

	var template = $("#vis-row-template").html();
	var $chart = $("#vis-chart");

	$(".row", $chart).remove();

	var canvasElem = document.getElementById("vis-chart");
	var ctx = canvasElem.getContext("2d");
	ctx.fillStyle = "black";

	var w = $("body div").width();
	var h = (50 * (count + 1)) + (CHART_PADDING * 2);
	var limit = +Spending.Config.Settings.spendingLimit;

	var showTotals = true;

	var footerHeight = (isNaN(limit) || limit === 0 || filterCategory ? 36 : 80);
	h += footerHeight + (inlineTotal ? 20 : 0);
	h = Math.max(h, $(window).height() - 40);

	canvasElem.width = w;
	canvasElem.height = h;

	var retiniseCanvas = function (canvasElem)
	{
		var ctx = canvasElem.getContext("2d");
		var $canvas = $(canvasElem);

		var width = $canvas.attr('width');
		var height = $canvas.attr('height');
        var cssWidth = width;
        var cssHeight = height;

		$canvas.attr('width', width * window.devicePixelRatio);
		$canvas.attr('height', height * window.devicePixelRatio);
		$canvas.css('width', cssWidth);
		$canvas.css('height', cssHeight);
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
	};

	var footerCanvasElem = document.getElementById("vis-footer");
	var $footer = $(footerCanvasElem);

	footerCanvasElem.width = w;
	$footer.hide();

    if (window.devicePixelRatio) {
		retiniseCanvas(canvasElem);
	}

	//ctx.fillStyle = "#c7c7c7";
	ctx.fillStyle = "#e9e9e9";
	ctx.fillRect(0, 0, w, h);
	var y = 0;

	ctx.textBaseline = "top";

	var topGradient = ctx.createLinearGradient(0, 0, 0, BAR_HEIGHT);
	topGradient.addColorStop(0, "#b9b9b9");
	topGradient.addColorStop(1, "#9f9f9f");
	ctx.fillStyle = topGradient;
	ctx.fillRect(0, 0, w, BAR_HEIGHT);

	ctx.strokeStyle = "#dcdcdc";
	ctx.beginPath();
	ctx.moveTo(0, 0);
	ctx.lineTo(w, 0);

	ctx.stroke();

	ctx.strokeStyle = "#818181";
	ctx.beginPath();
	ctx.moveTo(0, BAR_HEIGHT);
	ctx.lineTo(w, BAR_HEIGHT);

	ctx.stroke();

	ctx.fillStyle = "#fff";
	ctx.textAlign = "center";
	ctx.shadowColor = "#999";
	ctx.shadowOffsetX = 0;
	ctx.shadowOffsetY = 1;
	ctx.font = "17px Helvetica, Arial, sans-serif";
	ctx.fillText("Summary", w/2, 3);

	ctx.shadowColor = "#fff";

	y += BAR_HEIGHT;

	topGradient = ctx.createLinearGradient(0, y, 0, y + BAR_HEIGHT);
	topGradient.addColorStop(0, "#a2a2a2");
	topGradient.addColorStop(1, "#b8b8b8");
	ctx.fillStyle = topGradient;
	ctx.fillRect(0, y, w, BAR_HEIGHT);

	ctx.fillStyle = "#fff";

	ctx.strokeStyle = "#818181";
	ctx.beginPath();
	ctx.moveTo(0, y + BAR_HEIGHT);
	ctx.lineTo(w, y + BAR_HEIGHT);
	ctx.stroke();

	if ( endDate !== null )
	{
		ctx.fillStyle = "#333";
		ctx.textAlign = "left";
		ctx.font = "12px Helvetica, Arial, sans-serif";
		ctx.shadowColor = "none";
		ctx.fillText( startDate.format("DD/MM/YY") + " - " + endDate.format("DD/MM/YY"), 8, y + 8);
	}

	if (Spending.Config.Settings.useNeedWant === "true")
	{
		var OFFSET = 8;

		ctx.font = "10px Helvetica, Arial, sans-serif";
		ctx.textAlign = "right";
		ctx.fillText( "NEED       WANT", w - OFFSET, y + 9);

		ctx.shadowColor = "none";

		var miniWantGradient = ctx.createLinearGradient(0, 8, 0, y + 18);
		miniWantGradient.addColorStop(0, '#fe8d03');
		miniWantGradient.addColorStop(1, '#d57601');
		ctx.fillStyle = miniWantGradient;
		ctx.fillRect(w - OFFSET - 45, y + 10, 11, 11);

		var miniNeedGradient = ctx.createLinearGradient(0, 8, 0, y + 18);
		miniNeedGradient.addColorStop(0, '#555555');
		miniNeedGradient.addColorStop(1, '#3c3c3c');
		ctx.fillStyle = miniNeedGradient;
		ctx.fillRect(w - OFFSET - 92, y + 10, 11, 11);
	}

	y += 28;

	Spending.UI.VisClickMap = [];

	if (!maxTotal)
	{
		ctx.font = "bold 14px Helvetica, Arial, sans-serif";
		ctx.textAlign = "center";
		ctx.fillStyle = "#333";
		ctx.fillText("You don't have any expenses for this period.", w / 2, y + 10);

		ctx.font = "14px Helvetica, Arial, sans-serif";

		return;
	}

	var index = 0;
	_.each(categoryTotals, function ( category ) {
		ctx.fillStyle = "#e9e9e9";
		if (index === 0)
		{
			ctx.fillRect(0, y, w, CELL_HEIGHT + CHART_PADDING);
			y += CHART_PADDING;
		}
		else
		{
			ctx.fillRect(0, y, w, CELL_HEIGHT);
		}

		var initialY = y;

		y += 4;

		if ( Spending.Config.Settings.useNeedWant !== "false" )
		{
			category.innerPercent = (category.need / maxTotal.total);
		}
		else
		{
			category.innerPercent = 0;
		}

		category.percent = (category.total / maxTotal.total);

		category.isSubCategory = (filterCategory && filterCategory !== "");

		ctx.fillStyle = "#000";
		ctx.textAlign = "start";
		ctx.font = "13px Helvetica, Arial, sans-serif";
		ctx.fillText(category.name, 15, y);

		ctx.textAlign = "end";
		ctx.fillStyle = "#666";
		ctx.font = "12px Helvetica, Arial, sans-serif";
		ctx.fillText("Total $" + Spending.prettyFormat(category.total, 0), w - 15, y);

		var needWidth = Math.floor((w - 30) * category.innerPercent);
		var wantWidth = Math.floor((w - 30) * (category.percent - category.innerPercent));
		var startY = y;
		y += 20;

		// need #555555 to #3c3c3c
		var needGradient = ctx.createLinearGradient(0, y, 0, y + 20);
		needGradient.addColorStop(0, '#555555');
		needGradient.addColorStop(1, '#3c3c3c');

		ctx.fillStyle = needGradient;
		ctx.fillRect(15, y, needWidth, 20);

		// want #fe8d03 to #d57601
		var wantGradient = ctx.createLinearGradient(0, y, 0, y + 20);
		wantGradient.addColorStop(0, '#fe8d03');
		wantGradient.addColorStop(1, '#d57601');
		ctx.fillStyle = wantGradient;
		ctx.fillRect(needWidth + 16, y, wantWidth, 20);

		ctx.strokeStyle = "#c5c5c5";
		ctx.beginPath();
		ctx.moveTo(0, initialY + CELL_HEIGHT);
		ctx.lineTo(w, initialY + CELL_HEIGHT);
		ctx.stroke();

		y = initialY + CELL_HEIGHT;

		var region = {
			yFrom: startY,
			yTo: y,
			uuid: category.id
		};

		Spending.UI.VisClickMap.push(region);
		index++;
	});

	ctx.fillStyle = "#e9e9e9";
	ctx.fillRect(0, y - 1, w, CHART_PADDING);

	y += CHART_PADDING;

	var drawFooterInContext = function (ctx, y, offset) {
		var topOfSummary = y;// - 7;

		ctx.shadowColor = "none";

		ctx.fillStyle = "#c7c7c7";
		ctx.fillRect(0, y, w, y + footerHeight);

		var summaryGradient = ctx.createLinearGradient(0, topOfSummary, 0, y + 13);
		summaryGradient.addColorStop(0, '#969696');
		summaryGradient.addColorStop(1.0, '#c7c7c7');
		ctx.fillStyle = summaryGradient;
		ctx.fillRect(0, topOfSummary, w, 13);

		y += 14 + (offset || 0);

		ctx.fillStyle = "#000";
		ctx.textAlign = "start";
		ctx.font = "14px Helvetica, Arial, sans-serif";
		ctx.fillText("Total spend", 15, y + 2);

		ctx.textAlign = "right";
		ctx.font = "17px Helvetica, Arial, sans-serif";
		ctx.fillText("$" + Spending.prettyFormat(total, 0), w - 15, y + 2);

		y += 22;

		if (! isNaN(limit) && limit > 0 && !filterCategory)
		{
			ctx.fillStyle = "#8f8f8f";
			ctx.textAlign = "start";
			ctx.font = "14px Helvetica, Arial, sans-serif";
			ctx.fillText("Spending limit", 15, y + 2);

			ctx.textAlign = "right";
			ctx.font = "17px Helvetica, Arial, sans-serif";
			ctx.fillText("$" + Spending.prettyFormat(limit, 0), w - 15, y);
			y += 22;

			ctx.fillStyle = "#000";
			ctx.textAlign = "start";
			ctx.font = "14px Helvetica, Arial, sans-serif";
			ctx.fillText("Remaining", 15, y + 2);

			ctx.textAlign = "right";
			var remaining = limit - total;
			ctx.font = "17px Helvetica, Arial, sans-serif";
			ctx.fillText((remaining >= 0 ? "" : "-") + "$" + Spending.prettyFormat(Math.abs(remaining), 0), w - 15, y);
			y += 22;
		}
	};

	if (showTotals)
	{
		footerCanvasElem.height = footerHeight;
		retiniseCanvas(footerCanvasElem);
		$footer.data("height", footerHeight);

		Spending.UI.visualiseUpdateFooterPosition();

		var footerCtx = footerCanvasElem.getContext("2d");
		footerCtx.fillStyle = "#c7c7c7";
		footerCtx.fillRect(0, 0, w, h);

		if (inlineTotal)
		{
			drawFooterInContext(ctx, y);
			$footer.hide();
		}
		else
		{
			drawFooterInContext(footerCtx, 0, 8);
			$footer.show();
		}
	}
};

Spending.UI.visualiseUpdateFooterPosition = function ()
{
	var footerCanvasElem = document.getElementById("vis-footer");
	var $footer = $("#vis-footer");
	var top = $(window).height() + $(window).scrollTop() - $footer.data("height");
	$footer.css({"top": top});
};

$(document).on("scrollstop", Spending.UI.visualiseUpdateFooterPosition);

$(document).on("pageinit", "#visualise", function () {

	$("#vis-prev").on("tap", function (event) {
		event.preventDefault();

		var period = +Spending.Config.Settings.cyclePeriod;
		var cycle = Spending.getPreviousCycleForCycle(Spending.state.visualisationStartDate, Spending.state.visualisationEndDate, period);
		Spending.UI.visualiseUpdateWithCycle(cycle);
	});


	$("#vis-next").on("tap", function (event) {
		event.preventDefault();

		var period = +Spending.Config.Settings.cyclePeriod;
		var cycle = Spending.getNextCycleForCycle(Spending.state.visualisationStartDate, Spending.state.visualisationEndDate, period);
		Spending.UI.visualiseUpdateWithCycle(cycle);
	});


	$("#vis-next").on("tap", function (event) {
		event.preventDefault();
	});

	$("#vis-send").on("tap", function (event) {
		event.preventDefault();

		Spending.UI.buildVisualisation(Spending.state.visualisationExpenses, null, Spending.state.visualisationStartDate, Spending.state.visualisationEndDate, true);

		var canvasElem = document.getElementById("vis-chart");
		var ctx = canvasElem.getContext("2d");

		var imageData = canvasElem.toDataURL("png");

		var datestamp = moment().format("YYYY-MM-DD");
		var options = {
			subject: "TrackMySPEND Export",
			body: "Attached is your summary",
			attachment: {
				filename: "summary-" + datestamp + ".png",
				type: "image/png",
				content: imageData
			}
		};
		Spending.UI.buildVisualisation(Spending.state.visualisationExpenses, null, Spending.state.visualisationStartDate, Spending.state.visualisationEndDate, false);
		if ( window.CordovaPlatform !== "None" )
		{
			Spending.EmailPlugin.canSendEmail(function (result) {
                if (result)
                {
                    Spending.EmailPlugin.nativeFunction(options, function(result) {
						//if ( result === 0 )
					},
					function(error) {
						window.plugins.messageBox.alert("Cannot send email", error);
					});
                }
                else
                {
                    window.plugins.messageBox.alert("Cannot send email", "Your device is not setup to send email");
                }
            });
		}
	});

	$("#vis-back").on("tap", function (event) {
		event.preventDefault();
		if (Spending.state.visInSubCategory)
		{
			Spending.UI.buildVisualisation(Spending.state.visualisationExpenses, null, Spending.state.visualisationStartDate, Spending.state.visualisationEndDate);
		}
		else
		{
			Spending.state.lastCategory = null;
			$.mobile.changePage("index.html");
		}
	});

	$("#vis-chart").on("tap", Spending.UI.visualiseCanvasTap);

});

$(document).on("pagebeforehide", "#visualise", function() {
//	$("#vis-back").off("tap");
});

Spending.UI.visualiseUpdateWithCycle = function (cycle)
{
	Spending.state.visualisationStartDate = moment(cycle[0]);
	Spending.state.visualisationEndDate = moment(cycle[1]);

	Spending.UI.visualiseForDateRange(Spending.state.visualisationStartDate, Spending.state.visualisationEndDate);
};


Spending.UI.visualiseForDateRange = function __visPresentForDateRange (startDate, endDate)
{
	var startTime = 0;
	var endTime = 0;
	if (startDate) {
		startTime = startDate.toDate().getTime();
		endTime = endDate.toDate().getTime();
	}
	else
	{
		startTime = 0;
		endTime = Number.MAX_VALUE;
	}
	Spending.getExpensesForDateRange(startTime, endTime, function(expenses) {
		Spending.state.visualisationExpenses = expenses;
		var filterCategory = null;

        if ( Spending.state.lastCategory && Spending.state.lastCategory !== "" )
		{
			filterCategory = Spending.state.lastCategory;
			Spending.state.lastCategory = null;
		}

		Spending.UI.buildVisualisation(expenses, filterCategory, startDate, endDate);

	});
};

$(document).on("pagebeforeshow", "#visualise", function() {
	$.when(Spending.dbInitPromise).then(function() {

		if (!Spending.state.hasOwnProperty("visualisationStartDate") || Spending.state.visualisationStartDate === null)
		{
			var cycleStartDate = +Spending.Config.Settings.cycleStartDate;
			var cyclePeriod = +Spending.Config.Settings.cyclePeriod;
			var cycleEndDate = 0;
			var startDate = moment(new Date(Spending.fixDateTime(cycleStartDate)));
			var endDate = null;

			if ( cycleStartDate !== 0 && cyclePeriod !== Spending.Cycle.NONE)
			{
				cycleEndDate = Spending.getCycleEnd(startDate, cyclePeriod).getTime();
				endDate = moment(new Date(cycleEndDate));
				$(".vis-nav").show();
			}
			else
			{
				$(".vis-nav").hide();
				startDate = null;
				endDate = null;
			}

			Spending.state.visualisationStartDate = startDate;
			Spending.state.visualisationEndDate = endDate;
		}
		Spending.UI.visualiseForDateRange(Spending.state.visualisationStartDate, Spending.state.visualisationEndDate);
	});
});

$(document).on("pageinit", "#sm-register", function(event) {
	Spending.ga.trackEvent("Interaction: Login", "Register Form", "", 1);
	var registerSubmitHandler = function __registerSubmitHandler(event) {

		var username = $("#register-username").val();
		var password = $("#register-password").val();

		Spending.ga.trackEvent("Interaction: Login", "Register", "Start", 1);
		Spending.UI.MoneySmart.showSyncProgress("Registering..", "Register with MoneySmart");
		Spending.MoneySmart.register( username, password, $("#register-email").val(), function(success, message) {
			Spending.UI.MoneySmart.hideSyncProgress();
			if ( success )
			{
				Spending.ga.trackEvent("Interaction: Login", "Register", "Success", 1);
				Spending.UI.MoneySmart.updateLoginDetails(username, password, function() {
					$.mobile.changePage("sm-login.html");
				});
			}
			else
			{
				Spending.ga.trackEvent("Interaction: Login", "Register", "Error: " + message, 1);
				$("#register-error").html(message);
			}
		});

		return false;
	};

	$("#register-form").validate({
		submitHandler: registerSubmitHandler
	});
});

Spending.UI = Spending.UI || {};
Spending.UI.MoneySmart = Spending.UI.MoneySmart || {};

Spending.UI.MoneySmart.updateLoginDetails = function __MSUpdateLoginDetails(username, password, callback)
{
	if (Spending.Config.Settings.hasOwnProperty("smFirstUserName") && Spending.Config.Settings.smFirstUserName !== username)
	{
		Spending.state.tempSavedUsername = username;
		Spending.state.tempSavedPassword = password;
		$.mobile.changePage("sm-login-userissue.html", {role: 'dialog'});
	}
	else
	{
		Spending.Config.setSetting("smUserName", username, function() {
			Spending.Config.setSetting("smPassword", password, function() {
				Spending.MoneySmart.checkAndLogin(true, function(result, message) {
					callback(result, message);
				});
			});
		});
	}

};

$(document).on("pageinit", "#sm-login-userissue", function (event) {
	$(".username").html(Spending.Config.Settings.smFirstUserName);

	var tempUsername = "";
	var tempPassword = "";
	if (Spending.state.hasOwnProperty("tempSavedUsername") && Spending.state.hasOwnProperty("tempSavedPassword"))
	{
		tempUsername = Spending.state.tempSavedUsername;
		tempPassword = Spending.state.tempSavedPassword;
	}

	$("#sm-login-userissue-yes").on("tap", function (event) {
		event.preventDefault();

		Spending.resetAll(function() {
			Spending.state.tempSavedUsername = tempUsername;
			Spending.state.tempSavedPassword = tempPassword;
			$.mobile.changePage("sm-login.html");
		});
	});
});

$(document).on("pageinit", "#sm-login", function(event) {

	Spending.ga.trackEvent("Interaction: Login", "Show Login", "", 1);

	var loginSubmitHandler = function __loginSubmitHandler(event) {
		Spending.ga.trackEvent("Interaction: Login", "Login", "Submitted", 1);

		var username = $("#login-username").val();
		var password = $("#login-password").val();

		Spending.UI.MoneySmart.updateLoginDetails(username, password, function(result, message) {

			Spending.UI.MoneySmart.hideSyncProgress();

			if ( result )
			{
				Spending.ga.trackEvent("Interaction: Login", "Login", "Success", 1);
				$("#not-logged-in").hide();
				$("#logged-in").show().find(".login-name").html(Spending.state.userInfo.UserName);
				Spending.state.historyStartFrom = null;
				Spending.MoneySmart.performSync(true, function() {

				});
			}
			else
			{
				Spending.ga.trackEvent("Interaction: Login", "Login", "Error: " + message, 1);
				$("#not-logged-in").show();
				$("#logged-in").hide();
				$("#login-error").addClass("error").removeClass("success").html("Login error: " + message);
			}
		});
		return false;
	};

	$("#sm-logout").on("tap", function(event) {
		event.preventDefault();
		Spending.ga.trackEvent("Interaction: Login", "Logout", "Start", 1);
		Spending.MoneySmart.logout(function(result) {
			Spending.Config.setSetting("smUserName", "", function () {
				Spending.Config.setSetting("smPassword", "", function () {
					Spending.ga.trackEvent("Interaction: Login", "Logout", "Success", 1);
					$("#login-username").val("");
					$("#login-password").val("");
					$("#not-logged-in").show();
					$("#logged-in").hide();
				});
			});
		});
	});

	$("#sm-sync-now").on("tap", function (event) {
		Spending.ga.trackEvent("Interaction: Login", "Sync Now", "Start", 1);
		event.preventDefault();
		Spending.MoneySmart.performSync(true, function () {
			Spending.ga.trackEvent("Interaction: Login", "Sync Now", "Success", 1);
		});
	});

	$("#sm-delete").on("tap", function (event) {
		Spending.ga.trackEvent("Interaction: Login", "Delete Data", "", 1);
		//event.preventDefault();

		/*
		Spending.MoneySmart.deleteAllRemoteData("SpendingTrackerTransactions", function () {
			$.mobile.changePage("index.html");
		});
		*/
	});


	$("#login-form").validate({
		submitHandler: loginSubmitHandler
	});
});

$(document).on("pageinit", "#sm-login-delete", function (event) {
	$("#sm-login-delete-yes").on("tap", function (event) {
		event.preventDefault();
		Spending.MoneySmart.deleteAllRemoteData("SpendingTrackerTransactions", function () {
			console.log("Removed remote data, removing local data..");
			Spending.resetAll(function() {
				console.log("Removed local data, going home..");
				$.mobile.changePage("index.html");
			});
		});
	});
});

$(document).on("pagebeforeshow", "#sm-login", function __loginPageBeforeShow(event) {
	Spending.ga.trackPageview("/login");
	$.when(Spending.dbInitPromise).then(function() {
		$("#login-error").html("");
		if ( Spending.state.isLoggedIn )
		{
			$("#not-logged-in").hide();
			$("#logged-in").show().find(".login-name").html(Spending.state.userInfo.UserName);
		}
		else
		{
			$("#not-logged-in").show();
			$("#logged-in").hide();

			if ( Spending.state.loginError && Spending.state.loginError !== "" )
			{
				$("#login-error").addClass("error").removeClass("success").html(Spending.state.loginError);
				Spending.state.loginError = null;
			}

		}

		if ( Spending.Config.Settings.hasOwnProperty("smUserName") && Spending.Config.Settings.smUserName !== "" )
		{
			$("#login-username").val(Spending.Config.Settings.smUserName);
			$("#login-password").val(Spending.Config.Settings.smPassword);
		}
		else if (Spending.state.tempSavedUsername && Spending.state.tempSavedPassword)
		{
			$("#login-username").val(Spending.state.tempSavedUsername);
			$("#login-password").val(Spending.state.tempSavedPassword);
			Spending.state.tempSavedUsername = null;
			Spending.state.tempSavedPassword = null;
		}

		if (Spending.state.smForgotMessage && Spending.state.smForgotMessage !== "")
		{
			$("#login-error").removeClass("error").addClass("success").html(Spending.state.smForgotMessage);
			Spending.state.smForgotMessage = null;
		}

	});
});

$(document).on("pageinit", "#sm-login-forgot", function(event) {
	var forgotSubmitHandler = function __forgotSubmitHandler ()
	{
		Spending.UI.MoneySmart.showSyncProgress("", "Sending request");
		Spending.ga.trackEvent("Interaction: Login", "Forgot Password", "Start", 1);
		var email = $("#forgot-email").val();
		Spending.MoneySmart.forgotPassword(email, function (result, message) {
			Spending.UI.MoneySmart.hideSyncProgress();
			if (result)
			{
				Spending.ga.trackEvent("Interaction: Login", "Forgot Password", "sent", 1);
				Spending.state.smForgotMessage = "Forgot password email has been sent";
			}
			else
			{
				Spending.ga.trackEvent("Interaction: Login", "Forgot Password", "Error: " + message, 1);
				Spending.state.loginError = message;
			}

			$.mobile.changePage("sm-login.html");
		});
		return false;
	};

	$("#forgot-form").validate({
		submitHandler: forgotSubmitHandler
	});

});

Spending.UI.MoneySmart.syncStatus = function (message)
{
	$("#sync-progress p.detail").html(message);
	console.log("SYNC: " + message);
};

Spending.UI.MoneySmart.showSyncProgress = function (initialMessage, title)
{
	$("#sync-progress-modal, #sync-progress").css('display', 'block').show();
	var $sp = $("#sync-progress");
	var top = $(window).height() / 2 - $sp.height() / 2 - $(".header").height();
	var left = $(window).width() / 2 - $sp.width() / 2;
	$sp.css({top: top + "px", left: left + "px"});

	$("#sync-progress p.title").html(title || "Syncing with MoneySmart");
	var $detail = $("#sync-progress p.detail").html(initialMessage || "");
};

Spending.UI.MoneySmart.hideSyncProgress = function ()
{
	$("#sync-progress-modal, #sync-progress").hide();
};

/**
 * Default type mapper. Override to support more types or type options.
 */
var defaultTypeMapper = {
  /**
   * SQL type for ids
   */
  idType: "VARCHAR(32)",

  /**
   * SQL type for class names (used by mixins)
   */
  classNameType: "TEXT",

  /**
   * Returns SQL type for column definition
   */
  columnType: function(type){
    switch(type) {
    case 'JSON': return 'TEXT';
    case 'BOOL': return 'INT';
    case 'DATE': return 'INT';
    default: return type;
    }
  },

  inVar: function(str, type){
    return str;
  },
  outVar: function(str, type){
    return str;
  },
  outId: function(str){
    return "'" + str + "'";
  },
  /**
   * Converts a value from the database to a value suitable for the entity
   * (also does type conversions, if necessary)
   */
  dbValToEntityVal: function(val, type){
    if (val === null || val === undefined) {
      return val;
    }
    switch (type) {
      case 'DATE':
        // SQL is in seconds and JS in miliseconds
        if (val > 1000000000000) {
          // usually in seconds, but sometimes it's milliseconds
          return new Date(parseInt(val, 10));
        } else {
          return new Date(parseInt(val, 10) * 1000);
        }
      case 'BOOL':
        return val === 1 || val === '1';
        break;
      case 'INT':
        return +val;
        break;
      case 'BIGINT':
        return +val;
        break;
      case 'JSON':
        if (val) {
          return JSON.parse(val);
        }
        else {
          return val;
        }
        break;
      default:
        return val;
    }
  },

  /**
   * Converts an entity value to a database value, inverse of
   *   dbValToEntityVal
   */
  entityValToDbVal: function(val, type){
    if (val === undefined || val === null) {
      return null;
    }
    else if (type === 'JSON' && val) {
      return JSON.stringify(val);
    }
    else if (val.id) {
      return val.id;
    }
    else if (type === 'BOOL') {
      return (val === 'false') ? 0 : (val ? 1 : 0);
    }
    else if (type === 'DATE' || val.getTime) {
      // In order to make SQLite Date/Time functions work we should store
      // values in seconds and not as miliseconds as JS Date.getTime()
      val = new Date(val);
      return Math.round(val.getTime() / 1000);
    }
    else {
      return val;
    }
  },
  /**
   * Shortcut for inVar when type is id -- no need to override
   */
  inIdVar: function(str){
    return this.inVar(str, this.idType);
  },
  /**
   * Shortcut for outVar when type is id -- no need to override
   */
  outIdVar: function(str){
    return this.outVar(str, this.idType);
  },
  /**
   * Shortcut for entityValToDbVal when type is id -- no need to override
   */
  entityIdToDbId: function(id){
    return this.entityValToDbVal(id, this.idType);
  }
}

function config(persistence, dialect) {
  var argspec = persistence.argspec;

  persistence.typeMapper = dialect.typeMapper || defaultTypeMapper;

  persistence.generatedTables = {}; // set

  /**
   * Synchronize the data model with the database, creates table that had not
   * been defined before
   *
   * @param tx
   *            transaction object to use (optional)
   * @param callback
   *            function to be called when synchronization has completed,
   *            takes started transaction as argument
   */
  persistence.schemaSync = function (tx, callback, emulate) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: function(){} },
        { name: "emulate", optional: true, check: argspec.hasType('boolean') }
      ]);
    tx = args.tx;
    callback = args.callback;
    emulate = args.emulate;

    if(!tx) {
      var session = this;
      this.transaction(function(tx) { session.schemaSync(tx, callback, emulate); });
      return;
    }
    var queries = [], meta, colDefs, otherMeta, tableName;

	var tm = persistence.typeMapper;
    var entityMeta = persistence.getEntityMeta();
    for (var entityName in entityMeta) {
      if (entityMeta.hasOwnProperty(entityName)) {
        meta = entityMeta[entityName];
        if (!meta.isMixin) {
          colDefs = [];
          for (var prop in meta.fields) {
            if (meta.fields.hasOwnProperty(prop)) {
              colDefs.push([prop, meta.fields[prop]]);
            }
          }
          for (var rel in meta.hasOne) {
            if (meta.hasOne.hasOwnProperty(rel)) {
              otherMeta = meta.hasOne[rel].type.meta;
              colDefs.push([rel, tm.idType]);
              queries.push([dialect.createIndex(meta.name, [rel]), null]);
            }
          }
          for (var i = 0; i < meta.indexes.length; i++) {
            queries.push([dialect.createIndex(meta.name, meta.indexes[i].columns, meta.indexes[i]), null]);
          }
        }
        for (var rel in meta.hasMany) {
          if (meta.hasMany.hasOwnProperty(rel) && meta.hasMany[rel].manyToMany) {
            tableName = meta.hasMany[rel].tableName;
            if (!persistence.generatedTables[tableName]) {
              var otherMeta = meta.hasMany[rel].type.meta;
              var inv = meta.hasMany[rel].inverseProperty;
              // following test ensures that mixin mtm tables get created with the mixin itself
              // it seems superfluous because mixin will be processed before entitites that use it
              // but better be safe than sorry.
              if (otherMeta.hasMany[inv].type.meta != meta)
                continue;
              var p1 = meta.name + "_" + rel;
              var p2 = otherMeta.name + "_" + inv;
              queries.push([dialect.createIndex(tableName, [p1]), null]);
              queries.push([dialect.createIndex(tableName, [p2]), null]);
              var columns = [[p1, tm.idType], [p2, tm.idType]];
              if (meta.isMixin)
                columns.push([p1 + "_class", tm.classNameType])
              if (otherMeta.isMixin)
                columns.push([p2 + "_class", tm.classNameType])
              queries.push([dialect.createTable(tableName, columns), null]);
              persistence.generatedTables[tableName] = true;
            }
          }
        }
        if (!meta.isMixin) {
          colDefs.push(["id", tm.idType, "PRIMARY KEY"]);
          persistence.generatedTables[meta.name] = true;
          queries.push([dialect.createTable(meta.name, colDefs), null]);
        }
      }
    }
    var fns = persistence.schemaSyncHooks;
    for(var i = 0; i < fns.length; i++) {
      fns[i](tx);
    }
    if(emulate) {
      // Done
      callback(tx);
    } else {
      executeQueriesSeq(tx, queries, function(_, err) {
          callback(tx, err);
        });
    }
  };

  /**
   * Persists all changes to the database transaction
   *
   * @param tx
   *            transaction to use
   * @param callback
   *            function to be called when done
   */
  persistence.flush = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: null }
      ]);
    tx = args.tx;
    callback = args.callback;

    var session = this;
    if(!tx) {
      this.transaction(function(tx) { session.flush(tx, callback); });
      return;
    }
    var fns = persistence.flushHooks;
    persistence.asyncForEach(fns, function(fn, callback) {
        fn(session, tx, callback);
      }, function() {
        // After applying the hooks
        var persistObjArray = [];
        for (var id in session.trackedObjects) {
          if (session.trackedObjects.hasOwnProperty(id)) {
            persistObjArray.push(session.trackedObjects[id]);
          }
        }
        var removeObjArray = [];
        for (var id in session.objectsToRemove) {
          if (session.objectsToRemove.hasOwnProperty(id)) {
            removeObjArray.push(session.objectsToRemove[id]);
            delete session.trackedObjects[id]; // Stop tracking
          }
        }
        session.objectsToRemove = {};
        if(callback) {
          persistence.asyncParForEach(removeObjArray, function(obj, callback) {
              remove(obj, tx, callback);
            }, function(result, err) {
              if (err) return callback(result, err);
              persistence.asyncParForEach(persistObjArray, function(obj, callback) {
                  save(obj, tx, callback);
                }, callback);
            });
        } else { // More efficient
          for(var i = 0; i < persistObjArray.length; i++) {
            save(persistObjArray[i], tx);
          }
          for(var i = 0; i < removeObjArray.length; i++) {
            remove(removeObjArray[i], tx);
          }
        }
      });
  };

  /**
   * Remove all tables in the database (as defined by the model)
   */
  persistence.reset = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: "tx", optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: "callback", optional: true, check: argspec.isCallback(), defaultValue: function(){} }
      ]);
    tx = args.tx;
    callback = args.callback;

    var session = this;
    if(!tx) {
      session.transaction(function(tx) { session.reset(tx, callback); });
      return;
    }
    // First emulate syncing the schema (to know which tables were created)
    this.schemaSync(tx, function() {
        var tableArray = [];
        for (var p in persistence.generatedTables) {
          if (persistence.generatedTables.hasOwnProperty(p)) {
            tableArray.push(p);
          }
        }
        function dropOneTable () {
          var tableName = tableArray.pop();
          tx.executeSql("DROP TABLE IF EXISTS `" + tableName + "`", null, function () {
              if (tableArray.length > 0) {
                dropOneTable();
              } else {
                cb();
              }
            }, cb);
        }
        if(tableArray.length > 0) {
          dropOneTable();
        } else {
          cb();
        }

        function cb(result, err) {
          session.clean();
          persistence.generatedTables = {};
          if (callback) callback(result, err);
        }
      }, true);
  };

  /**
   * Converts a database row into an entity object
   */
  function rowToEntity(session, entityName, row, prefix) {
    prefix = prefix || '';
    if (session.trackedObjects[row[prefix + "id"]]) { // Cached version
      return session.trackedObjects[row[prefix + "id"]];
    }
    var tm = persistence.typeMapper;
    var rowMeta = persistence.getMeta(entityName);
    var ent = persistence.define(entityName); // Get entity
    if(!row[prefix+'id']) { // null value, no entity found
      return null;
    }
    var o = new ent(session, undefined, true);
    o.id = tm.dbValToEntityVal(row[prefix + 'id'], tm.idType);
    o._new = false;
    for ( var p in row) {
      if (row.hasOwnProperty(p)) {
        if (p.substring(0, prefix.length) === prefix) {
          var prop = p.substring(prefix.length);
          if (prop != 'id') {
            o._data[prop] = tm.dbValToEntityVal(row[p], rowMeta.fields[prop] || tm.idType);
          }
        }
      }
    }
    return o;
  }

  /**
   * Internal function to persist an object to the database
   * this function is invoked by persistence.flush()
   */
  function save(obj, tx, callback) {
    var meta = persistence.getMeta(obj._type);
    var tm = persistence.typeMapper;
    var properties = [];
    var values = [];
    var qs = [];
    var propertyPairs = [];
    if(obj._new) { // Mark all properties dirty
      for (var p in meta.fields) {
        if(meta.fields.hasOwnProperty(p)) {
          obj._dirtyProperties[p] = true;
        }
      }
    }
    for ( var p in obj._dirtyProperties) {
      if (obj._dirtyProperties.hasOwnProperty(p)) {
        properties.push("`" + p + "`");
        var type = meta.fields[p] || tm.idType;
        values.push(tm.entityValToDbVal(obj._data[p], type));
        qs.push(tm.outVar("?", type));
        propertyPairs.push("`" + p + "` = " + tm.outVar("?", type));
      }
    }
    var additionalQueries = [];
    for(var p in meta.hasMany) {
      if(meta.hasMany.hasOwnProperty(p)) {
        additionalQueries = additionalQueries.concat(persistence.get(obj, p).persistQueries());
      }
    }
    executeQueriesSeq(tx, additionalQueries, function() {
        if (!obj._new && properties.length === 0) { // Nothing changed and not new
          if(callback) callback();
          return;
        }
        obj._dirtyProperties = {};
        if (obj._new) {
          properties.push('id');
          values.push(tm.entityIdToDbId(obj.id));
          qs.push(tm.outIdVar('?'));
          var sql = "INSERT INTO `" + obj._type + "` (" + properties.join(", ") + ") VALUES (" + qs.join(', ') + ")";
          obj._new = false;
          tx.executeSql(sql, values, callback, callback);
        } else {
          var sql = "UPDATE `" + obj._type + "` SET " + propertyPairs.join(',') + " WHERE id = " + tm.outId(obj.id);
          tx.executeSql(sql, values, callback, callback);
        }
      });
  }

  persistence.save = save;

  function remove (obj, tx, callback) {
    var meta = persistence.getMeta(obj._type);
	var tm = persistence.typeMapper;
    var queries = [["DELETE FROM `" + obj._type + "` WHERE id = " + tm.outId(obj.id), null]];
    for (var rel in meta.hasMany) {
      if (meta.hasMany.hasOwnProperty(rel) && meta.hasMany[rel].manyToMany) {
        var tableName = meta.hasMany[rel].tableName;
        //var inverseProperty = meta.hasMany[rel].inverseProperty;
        queries.push(["DELETE FROM `" + tableName + "` WHERE `" + meta.name + '_' + rel + "` = " + tm.outId(obj.id), null]);
      }
    }
    executeQueriesSeq(tx, queries, callback);
  }

  /**
   * Utility function to execute a series of queries in an asynchronous way
   * @param tx the transaction to execute the queries on
   * @param queries an array of [query, args] tuples
   * @param callback the function to call when all queries have been executed
   */
  function executeQueriesSeq (tx, queries, callback) {
    // queries.reverse();
    var callbackArgs = [];
    for ( var i = 3; i < arguments.length; i++) {
      callbackArgs.push(arguments[i]);
    }
    persistence.asyncForEach(queries, function(queryTuple, callback) {
        tx.executeSql(queryTuple[0], queryTuple[1], callback, function(_, err) {
            console.log(err.message);
            callback(_, err);
          });
      }, function(result, err) {
        if (err && callback) {
          callback(result, err);
          return;
        }
        if(callback) callback.apply(null, callbackArgs);
      });
  }

  persistence.executeQueriesSeq = executeQueriesSeq;

  /////////////////////////// QueryCollection patches to work in SQL environment

  /**
   * Function called when session is flushed, returns list of SQL queries to execute
   * (as [query, arg] tuples)
   */
  persistence.QueryCollection.prototype.persistQueries = function() { return []; };

  var oldQCClone = persistence.QueryCollection.prototype.clone;

  persistence.QueryCollection.prototype.clone = function (cloneSubscribers) {
    var c = oldQCClone.call(this, cloneSubscribers);
    c._additionalJoinSqls = this._additionalJoinSqls.slice(0);
    c._additionalWhereSqls = this._additionalWhereSqls.slice(0);
    c._additionalGroupSqls = this._additionalGroupSqls.slice(0);
    c._manyToManyFetch = this._manyToManyFetch;
    return c;
  };

  var oldQCInit = persistence.QueryCollection.prototype.init;

  persistence.QueryCollection.prototype.init = function(session, entityName, constructor) {
    oldQCInit.call(this, session, entityName, constructor);
    this._manyToManyFetch = null;
    this._additionalJoinSqls = [];
    this._additionalWhereSqls = [];
    this._additionalGroupSqls = [];
  };

  var oldQCToUniqueString = persistence.QueryCollection.prototype.toUniqueString;

  persistence.QueryCollection.prototype.toUniqueString = function() {
    var s = oldQCToUniqueString.call(this);
    s += '|JoinSQLs:';
    for(var i = 0; i < this._additionalJoinSqls.length; i++) {
      s += this._additionalJoinSqls[i];
    }
    s += '|WhereSQLs:';
    for(var i = 0; i < this._additionalWhereSqls.length; i++) {
      s += this._additionalWhereSqls[i];
    }
    s += '|GroupSQLs:';
    for(var i = 0; i < this._additionalGroupSqls.length; i++) {
      s += this._additionalGroupSqls[i];
    }
    if(this._manyToManyFetch) {
      s += '|ManyToManyFetch:';
      s += JSON.stringify(this._manyToManyFetch); // TODO: Do something more efficient
    }
    return s;
  };

  persistence.NullFilter.prototype.sql = function (meta, alias, values) {
    return "1=1";
  };

  persistence.AndFilter.prototype.sql = function (meta, alias, values) {
    return "(" + this.left.sql(meta, alias, values) + " AND "
    + this.right.sql(meta, alias, values) + ")";
  };

  persistence.OrFilter.prototype.sql = function (meta, alias, values) {
    return "(" + this.left.sql(meta, alias, values) + " OR "
    + this.right.sql(meta, alias, values) + ")";
  };

  persistence.PropertyFilter.prototype.sql = function (meta, alias, values) {
    var tm = persistence.typeMapper;
    var aliasPrefix = alias ? "`" + alias + "`." : "";
  	var sqlType = meta.fields[this.property] || tm.idType;
    if (this.operator === '=' && this.value === null) {
      return aliasPrefix + '`' + this.property + "` IS NULL";
    } else if (this.operator === '!=' && this.value === null) {
      return aliasPrefix + '`' + this.property + "` IS NOT NULL";
    } else if (this.operator === 'in') {
      var vals = this.value;
      var qs = [];
      for(var i = 0; i < vals.length; i++) {
        qs.push('?');
        values.push(tm.entityValToDbVal(vals[i], sqlType));
      }
      if(vals.length === 0) {
        // Optimize this a little
        return "1 = 0";
      } else {
        return aliasPrefix + '`' + this.property + "` IN (" + qs.join(', ') + ")";
      }
    } else if (this.operator === 'not in') {
      var vals = this.value;
      var qs = [];
      for(var i = 0; i < vals.length; i++) {
        qs.push('?');
        values.push(tm.entityValToDbVal(vals[i], sqlType));
      }

      if(vals.length === 0) {
        // Optimize this a little
        return "1 = 1";
      } else {
        return aliasPrefix + '`' + this.property + "` NOT IN (" + qs.join(', ') + ")";
      }
    } else {
      var value = this.value;
      if(value === true || value === false) {
        value = value ? 1 : 0;
      }
      values.push(tm.entityValToDbVal(value, sqlType));
 	  return aliasPrefix + '`' + this.property + "` " + this.operator + " " + tm.outVar("?", sqlType);
   }
  };

  // QueryColleciton's list

  /**
   * Asynchronous call to actually fetch the items in the collection
   * @param tx transaction to use
   * @param callback function to be called taking an array with
   *   result objects as argument
   */
  persistence.DbQueryCollection.prototype.list = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: false, check: argspec.isCallback() }
      ]);
    tx = args.tx;
    callback = args.callback;

    var that = this;
    var session = this._session;
    if(!tx) { // no transaction supplied
      session.transaction(function(tx) {
          that.list(tx, callback);
        });
      return;
    }
    var entityName = this._entityName;
    var meta = persistence.getMeta(entityName);
    var tm = persistence.typeMapper;

    // handles mixin case -- this logic is generic and could be in persistence.
    if (meta.isMixin) {
      var result = [];
      persistence.asyncForEach(meta.mixedIns, function(realMeta, next) {
        var query = that.clone();
        query._entityName = realMeta.name;
        query.list(tx, function(array) {
          result = result.concat(array);
          next();
        });
      }, function() {
        var query = new persistence.LocalQueryCollection(result);
        query._orderColumns = that._orderColumns;
        query._reverse = that._reverse;
        // TODO: handle skip and limit -- do we really want to do it?
        query.list(null, callback);
      });
      return;
    }

    function selectAll (meta, tableAlias, prefix) {
      var selectFields = [ tm.inIdVar("`" + tableAlias + "`.id") + " AS " + prefix + "id" ];
      for ( var p in meta.fields) {
        if (meta.fields.hasOwnProperty(p)) {
          selectFields.push(tm.inVar("`" + tableAlias + "`.`" + p + "`", meta.fields[p]) + " AS `"
            + prefix + p + "`");
        }
      }
      for ( var p in meta.hasOne) {
        if (meta.hasOne.hasOwnProperty(p)) {
          selectFields.push(tm.inIdVar("`" + tableAlias + "`.`" + p + "`") + " AS `"
            + prefix + p + "`");
        }
      }
      return selectFields;
    }
    var args = [];
    var mainPrefix = entityName + "_";

    var mainAlias = 'root';
    var selectFields = selectAll(meta, mainAlias, mainPrefix);

    var joinSql = '';
    var additionalWhereSqls = this._additionalWhereSqls.slice(0);
    var mtm = this._manyToManyFetch;
    if(mtm) {
      joinSql += "LEFT JOIN `" + mtm.table + "` AS mtm ON mtm.`" + mtm.inverseProp + "` = `root`.`id` ";
      additionalWhereSqls.push("mtm.`" + mtm.prop + "` = " + tm.outId(mtm.id));
    }

    joinSql += this._additionalJoinSqls.join(' ');

    for ( var i = 0; i < this._prefetchFields.length; i++) {
      var prefetchField = this._prefetchFields[i];
      var thisMeta = meta.hasOne[prefetchField].type.meta;
      if (thisMeta.isMixin)
        throw new Error("cannot prefetch a mixin");
      var tableAlias = thisMeta.name + '_' + prefetchField + "_tbl";
      selectFields = selectFields.concat(selectAll(thisMeta, tableAlias,
          prefetchField + "_"));
      joinSql += "LEFT JOIN `" + thisMeta.name + "` AS `" + tableAlias
      + "` ON `" + tableAlias + "`.`id` = `" + mainAlias + '`.`' + prefetchField + "` ";

    }

    var whereSql = "WHERE "
    + [ this._filter.sql(meta, mainAlias, args) ].concat(additionalWhereSqls).join(' AND ');

    var sql = "SELECT " + selectFields.join(", ") + " FROM `" + entityName
    + "` AS `" + mainAlias + "` " + joinSql + " " + whereSql;

    if(this._additionalGroupSqls.length > 0) {
      sql += this._additionalGroupSqls.join(' ');
    }

    if(this._orderColumns.length > 0) {
      sql += " ORDER BY "
      + this._orderColumns.map(
        function (c) {
          return "`" + mainPrefix + c[0] + "` "
          + (c[1] ? "ASC" : "DESC");
        }).join(", ");
    }
    if(this._limit >= 0) {
      sql += " LIMIT " + this._limit;
    }
    if(this._skip > 0) {
      sql += " OFFSET " + this._skip;
    }
    session.flush(tx, function () {
        tx.executeSql(sql, args, function (rows) {
            var results = [];
            if(that._reverse) {
              rows.reverse();
            }
            for ( var i = 0; i < rows.length; i++) {
              var r = rows[i];
              var e = rowToEntity(session, entityName, r, mainPrefix);
              for ( var j = 0; j < that._prefetchFields.length; j++) {
                var prefetchField = that._prefetchFields[j];
                var thisMeta = meta.hasOne[prefetchField].type.meta;
                e._data_obj[prefetchField] = rowToEntity(session, thisMeta.name, r, prefetchField + '_');
                session.add(e._data_obj[prefetchField]);
              }
              results.push(e);
              session.add(e);
            }
            callback(results);
            that.triggerEvent('list', that, results);
          });
      });
  };

  /**
   * Asynchronous call to remove all the items in the collection.
   * Note: does not only remove the items from the collection, but
   * the items themselves.
   * @param tx transaction to use
   * @param callback function to be called when clearing has completed
   */
  persistence.DbQueryCollection.prototype.destroyAll = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: true, check: argspec.isCallback(), defaultValue: function(){} }
      ]);
    tx = args.tx;
    callback = args.callback;

    var that = this;
    var session = this._session;
    if(!tx) { // no transaction supplied
      session.transaction(function(tx) {
          that.destroyAll(tx, callback);
        });
      return;
    }
    var entityName = this._entityName;
    var meta = persistence.getMeta(entityName);
    var tm = persistence.typeMapper;

    // handles mixin case -- this logic is generic and could be in persistence.
    if (meta.isMixin) {
      persistence.asyncForEach(meta.mixedIns, function(realMeta, next) {
        var query = that.clone();
        query._entityName = realMeta.name;
        query.destroyAll(tx, callback);
      }, callback);
      return;
    }

    var joinSql = '';
    var additionalWhereSqls = this._additionalWhereSqls.slice(0);
    var mtm = this._manyToManyFetch;
    if(mtm) {
      joinSql += "LEFT JOIN `" + mtm.table + "` AS mtm ON mtm.`" + mtm.inverseProp + "` = `root`.`id` ";
      additionalWhereSqls.push("mtm.`" + mtm.prop + "` = " + tm.outId(mtm.id));
    }

    joinSql += this._additionalJoinSqls.join(' ');

    var args = [];
    var whereSql = "WHERE "
    + [ this._filter.sql(meta, null, args) ].concat(additionalWhereSqls).join(' AND ');

    var selectSql = "SELECT id FROM `" + entityName + "` " + joinSql + ' ' + whereSql;
    var deleteSql = "DELETE FROM `" + entityName + "` " + joinSql + ' ' + whereSql;
    var args2 = args.slice(0);

    session.flush(tx, function () {
        tx.executeSql(selectSql, args, function(results) {
            for(var i = 0; i < results.length; i++) {
              delete session.trackedObjects[results[i].id];
              session.objectsRemoved.push({id: results[i].id, entity: entityName});
            }
            that.triggerEvent('change', that);
            tx.executeSql(deleteSql, args2, callback, callback);
          }, callback);
      });
  };

  /**
   * Asynchronous call to count the number of items in the collection.
   * @param tx transaction to use
   * @param callback function to be called when clearing has completed
   */
  persistence.DbQueryCollection.prototype.count = function (tx, callback) {
    var args = argspec.getArgs(arguments, [
        { name: 'tx', optional: true, check: persistence.isTransaction, defaultValue: null },
        { name: 'callback', optional: false, check: argspec.isCallback() }
      ]);
    tx = args.tx;
    callback = args.callback;

    var that = this;
    var session = this._session;
    if(tx && !tx.executeSql) { // provided callback as first argument
      callback = tx;
      tx = null;
    }
    if(!tx) { // no transaction supplied
      session.transaction(function(tx) {
          that.count(tx, callback);
        });
      return;
    }
    var entityName = this._entityName;
    var meta = persistence.getMeta(entityName);
    var tm = persistence.typeMapper;

    // handles mixin case -- this logic is generic and could be in persistence.
    if (meta.isMixin) {
      var result = 0;
      persistence.asyncForEach(meta.mixedIns, function(realMeta, next) {
        var query = that.clone();
        query._entityName = realMeta.name;
        query.count(tx, function(count) {
          result += count;
          next();
        });
      }, function() {
        callback(result);
      });
      return;
    }

    var joinSql = '';
    var additionalWhereSqls = this._additionalWhereSqls.slice(0);
    var mtm = this._manyToManyFetch;
    if(mtm) {
      joinSql += "LEFT JOIN `" + mtm.table + "` AS mtm ON mtm.`" + mtm.inverseProp + "` = `root`.`id` ";
      additionalWhereSqls.push("mtm.`" + mtm.prop + "` = " + tm.outId(mtm.id));
    }

    joinSql += this._additionalJoinSqls.join(' ');
    var args = [];
    var whereSql = "WHERE " + [ this._filter.sql(meta, "root", args) ].concat(additionalWhereSqls).join(' AND ');

    var sql = "SELECT COUNT(*) AS cnt FROM `" + entityName + "` AS `root` " + joinSql + " " + whereSql;

    session.flush(tx, function () {
        tx.executeSql(sql, args, function(results) {
            callback(parseInt(results[0].cnt, 10));
          });
      });
  };

  persistence.ManyToManyDbQueryCollection.prototype.persistQueries = function() {
    var queries = [];
    var meta = persistence.getMeta(this._obj._type);
    var inverseMeta = meta.hasMany[this._coll].type.meta;
    var tm = persistence.typeMapper;
    var rel = meta.hasMany[this._coll];
    var inv = inverseMeta.hasMany[rel.inverseProperty];
    var direct = rel.mixin ? rel.mixin.meta.name : meta.name;
    var inverse = inv.mixin ? inv.mixin.meta.name : inverseMeta.name;

    // Added
    for(var i = 0; i < this._localAdded.length; i++) {
      var columns = [direct + "_" + this._coll, inverse + '_' + rel.inverseProperty];
      var vars = [tm.outIdVar("?"), tm.outIdVar("?")];
      var args = [tm.entityIdToDbId(this._obj.id), tm.entityIdToDbId(this._localAdded[i].id)];
      if (rel.mixin) {
        columns.push(direct + "_" + this._coll + "_class");
        vars.push("?");
        args.push(meta.name);
      }
      if (inv.mixin) {
        columns.push(inverse + "_" + rel.inverseProperty + "_class");
        vars.push("?");
        args.push(inverseMeta.name);
      }
      queries.push(["INSERT INTO " + rel.tableName +
            " (`" + columns.join("`, `") + "`) VALUES (" + vars.join(",") + ")", args]);
    }
    this._localAdded = [];
    // Removed
    for(var i = 0; i < this._localRemoved.length; i++) {
    queries.push(["DELETE FROM  " + rel.tableName +
          " WHERE `" + direct + "_" + this._coll + "` = " + tm.outIdVar("?") + " AND `" +
          inverse + '_' + rel.inverseProperty +
          "` = " + tm.outIdVar("?"), [tm.entityIdToDbId(this._obj.id), tm.entityIdToDbId(this._localRemoved[i].id)]]);
    }
    this._localRemoved = [];
    return queries;
  };
};

if (typeof exports !== 'undefined') {
	exports.defaultTypeMapper = defaultTypeMapper;
	exports.config = config;
}
else {
	window = window || {};
	window.persistence = window.persistence || {};
	window.persistence.store = window.persistence.store || {};
	window.persistence.store.sql = {
		defaultTypeMapper: defaultTypeMapper,
		config: config
	};
}


//= require md5-min
//= require persistence
//= require persistence.store.sql
//= require persistence.store.websql
//= require spending.categories

/*global Spending:true, persistence:true, _:true, Backbone:true, console:true */
Spending = window.Spending || {};
Spending.Data = {};

Spending.databaseReady = false;

Spending.initDatabase = function(databaseName, deleteContent, debug, callback)
{
	databaseName = databaseName || "ASICSpendingTracker";

	persistence.store.websql.config(persistence, databaseName, 'ASIC Spending Tracker database', 5 * 1024 * 1024);

	persistence.debug = debug;
	var startupToken = false;

	var initInner = function initInner()
	{
		Spending.Data.Category = persistence.define( "Category", {
			uuid: "TEXT",
			name: "TEXT",
			isCustom: "BOOL"
		});

		Spending.Data.Category.hasMany("subCategories", Spending.Data.Category, "parent");
		Spending.Data.Category.index("name");

		Spending.Data.Expense = persistence.define( "Expense", {
			uuid: "TEXT",
			cost: "INT",
			date: "INT",
			note: "TEXT",
			isNeed: "BOOL",
			isFavourite: "BOOL",
			isSystemFavourite: "BOOL",
			useCount: "INT",
			favOrder: "INT",
			createDate: "INT",
			updateDate: "INT"
		});

		Spending.Data.Expense.index("uuid", {unique:true});
		Spending.Data.Expense.index(["date", "isFavourite"]);
		Spending.Data.Expense.index(["isFavourite","favOrder"]);

		Spending.Data.Category.hasMany("expenses", Spending.Data.Expense, "category");

		Spending.Data.TransactionAction = {
			"CREATE": 1,
			"UPDATE": 2,
			"DELETE": 3
		};

		Spending.Data.TransactionEvent = persistence.define( "TransactionEvent" , {
			uuid: "TEXT",
			timestamp: "INTEGER",
			type: "TEXT",
			action: "INT",
			isSynced: "BOOL",
			isApplied: "BOOL",
			target_id: "TEXT",
			data: "JSON"
		});

		Spending.Data.Setting = persistence.define( "Setting", {
			name: "TEXT",
			value: "TEXT"
		});

		var SCHEMA_VERSION = 3;

		var initInnerInner = function () {

			console.log("STARTUP: Post-database setup init");

			Spending.getCategories(null, function(categories) {
				if ( categories.length === 0 )
				{
					console.log("STARTUP: Importing categories");
					Spending.importCategories(Spending.rawCategories, function() {});
				}
			});

			if ( deleteContent )
			{
				//persistence.reset(function() {
					Spending.Data.TransactionEvent.all().destroyAll(function() {
						Spending.Data.Expense.all().destroyAll(function() {
							Spending.Data.Category.all().destroyAll(function() {
								Spending.databaseReady = true;
								console.log("STARTUP: Database ready");
								callback(true);
							});
						});
					});
					//});
			}
			else
			{
				console.log("STARTUP: Database ready");
				Spending.primeCategoryCache();
				Spending.databaseReady = true;
				callback(true);
			}
		};

		persistence.schemaSync(function() {
			console.log("STARTUP: Schema synchronised (Token: " + startupToken +")");
			Spending.Data.Setting.findBy( "name", "SchemaVersion", function (setting) {
				if ( setting === null || Number(setting.value) !== SCHEMA_VERSION )
				{
					if ( setting === null )
					{
						setting = new Spending.Data.Setting();
						setting.name = "SchemaVersion";
						persistence.add(setting);
						currentSchemaVersion = 0;
					}
					else
					{
						currentSchemaVersion = Number(setting.value);
					}

					console.log("STARTUP: Wrong schema version - expected " + SCHEMA_VERSION + " got " + Number(setting.value) + " (Token: " + startupToken +")");
					if ( ! startupToken )
					{
						console.log("STARTUP: Migrating from " + currentSchemaVersion + " to " + SCHEMA_VERSION );

						if ( currentSchemaVersion === 0 )
						{
							// we need to flush the schema
							persistence.reset( function() {
								startupToken = true;
								initInner();
							});
						} else if ( currentSchemaVersion === 1 && SCHEMA_VERSION === 2 ) { // migrate 1 => 2
							persistence.transaction( function (txn) {
								txn.executeSql("ALTER TABLE TransactionEvent ADD COLUMN uuid TEXT", null, function (result) {
									txn.executeSql("UPDATE Setting SET value = 2 WHERE name = 'SchemaVersion'", null, function (result) {
										startupToken = true;
										initInner();
									});
								});
							});
						}

						if (currentSchemaVersion < 3 && SCHEMA_VERSION === 3)
						{
							persistence.transaction( function (txn) {
								txn.executeSql("UPDATE Setting SET value = '1970-01-01T00:00:00' WHERE name = 'smLastUpdate'", null, function (result) {
									startupToken = true;
									initInner();
								});
							});
						}

					}
					else
					{
						console.log("STARTUP: Updating schema version");
						setting.value = SCHEMA_VERSION;
						persistence.flush( function() {
							initInnerInner();
						});
					}

				}
				else
				{
					initInnerInner();
				}
			} );
		});


	};

	initInner();
};

Spending.getExpenseTotalForPeriod = function(startTime, endTime, callback)
{
	console.log("Get Expense Total for period: " + startTime + " to " + endTime);
	var query = "SELECT SUM(cost) AS total FROM Expense WHERE  date BETWEEN ? AND ? AND isFavourite = 0";
	if ( endTime === 0 )
	{
		endTime = Number.MAX_VALUE;
	}

	persistence.transaction(function(tx) {
		tx.executeSql( query, [startTime, endTime], function(results) {
			var total = results[0].total;
			if ( total === null )
			{
				total = 0;
			}
			callback(total);
		}, function() {
			callback(0);
		});
	});
};

Spending.addSubCategory = function(parentCategoryUUID, categoryName, callback, createTransaction)
{
	// get parent
	Spending.Data.Category.findBy("uuid", parentCategoryUUID, function(parentCategory) {
		if ( parentCategory === null )
		{
			callback(null);
		}

		// see if a child with this name already exists
		parentCategory.subCategories.filter("name", "=", categoryName).one(function(existingCategory) {
			if ( existingCategory !== null )
			{
				callback(existingCategory.uuid);
			}
			else
			{
				var subCategory = new Spending.Data.Category();
				subCategory.uuid = hex_md5(parentCategory.name + "-" + categoryName).toUpperCase();
				subCategory.name = categoryName;
				subCategory.parent = parentCategory;
				subCategory.isCustom = true;

				persistence.add(subCategory);

				// add the transaction
				if ( createTransaction )
				{
					var txn = new Spending.Data.TransactionEvent();
					txn.uuid = persistence.createUUID();
					txn.timestamp = new Date().getTime();
					txn.type = "Category";
					txn.action = Spending.Data.TransactionAction.CREATE;
					txn.target_id = subCategory.uuid;
					txn.data = {
						name: categoryName,
						parentUUID: parentCategory.uuid,
						isCustom: true
					};
					txn.isApplied = true;
					persistence.add(txn);
				}

				persistence.flush(function(result) {
					Spending.categoryCache[subCategory.uuid] = subCategory;
					Spending.categoryCacheById[subCategory.id] = subCategory;
					callback(subCategory.uuid);
				});
			}
		});
	});
};

Spending.addExpense = function(data, addAsFavourite, callback, createTransaction)
{
	var touchedFavourites = false;
	var favouriteUUID;

	if ( createTransaction === undefined )
	{
		createTransaction = true;
	}

	Spending.Data.Category.findBy("uuid", data.category, function(category) {
		if ( ! category ) {
			callback(false);
		}

		persistence.transaction(function(tx) {
			data.category = category;
			data.uuid = data.uuid || persistence.createUUID();
			data.createDate = new Date().getTime();
			data.updateDate = data.createDate;

			var expense = new Spending.Data.Expense(data);
			persistence.add(expense);

			var favQuery = Spending.Data.Expense.all().filter("isFavourite", "=", true)
														.filter("cost", "=", data.cost)
														.filter("category", "=", data.category);

			var favourite = null;
			favQuery.one(tx, function(fav) {
				if ( fav )
				{
					fav.useCount++;
				}
				else if ( addAsFavourite )
				{
					touchedFavourites = true;
					favouriteUUID = persistence.createUUID();
					tx.executeSql( "SELECT MAX(favOrder) AS maxFavOrder FROM Expense WHERE isFavourite = 1 AND isSystemFavourite = 0", null, function (result) {
						var maxFavOrder = result.maxFavOrder || 0;
						Spending.createFavouriteFromExpense(expense, createTransaction, false, maxFavOrder + 1, favouriteUUID);
					});
				}
				else
				{

					/*

					Disable System Favourites functionality

					// this isn't an explicit favourite, but check if we need more system favourites
					var favQuery = Spending.Data.Expense.all().filter("isFavourite", "=", true);
					favQuery.count( function (numFavourites) {
						if ( numFavourites < Spending.MIN_FAVS )
						{
							console.log("Inserting new system favourite at", numFavourites + 1);
							Spending.createFavouriteFromExpense(expense, createTransaction, true, numFavourites + 1);
						}
					});
					*/
				}

				if ( createTransaction )
				{
					var txn = new Spending.Data.TransactionEvent();
					txn.uuid = persistence.createUUID();
					txn.timestamp = new Date().getTime();
					txn.type = "Expense";
					txn.action = Spending.Data.TransactionAction.CREATE;
					txn.target_id = expense.uuid;
					txn.data = data;
					txn.data.category = category.uuid;
					txn.isApplied = true;

					persistence.add(txn);
				}

				var commit = function ()
				{
					persistence.flush(tx, function( result, error ) {
						callback(true, expense.uuid, expense, favourite, favouriteUUID);
					});
				};

				if ( touchedFavourites )
				{
					persistence.flush(tx, function( result, error ) {
						Spending.cleanupFavourites(tx, commit);
					});

				}
				else
				{
					commit();
				}

			});
		});
	});
};

Spending.cleanupFavourites = function (tx, callback)
{
	var favQuery = Spending.Data.Expense.all().filter("isFavourite", "=", true).order("isSystemFavourite").order("favOrder").order("createDate", true);
	favQuery.list( tx, function (favourites) {
		var index = 0;
		_.each(favourites, function (favourite) {
			if ( favourite.isSystemFavourite && index >= Spending.MIN_FAVS )
			{
				persistence.remove(favourite);

				// create delete transaction
				Spending.createTransactionForExpense( favourite, null, Spending.Data.TransactionAction.DELETE );
			}
			else if ( favourite.favOrder !== index )
			{
				var changedData = {
					favOrder: index,
					updateDate: new Date().getTime()
				};

				_.extend(favourite, changedData);
				index++;

				Spending.createTransactionForExpense( favourite, changedData, Spending.Data.TransactionAction.UPDATE );
			}
			else
			{
				index++;
			}
		});
		callback();
	});
};

Spending.changeFavouriteOrderByUUID = function (uuid, newIndex)
{
	persistence.transaction( function(tx) {
		Spending.Data.Expense.findBy(tx, "uuid", uuid, function (favourite) {
			if ( ! favourite.isFavourite ) return;

			var changedData = {
				favOrder: newIndex,
				updateDate: new Date().getTime()
			};

			_.extend(favourite, changedData);
			Spending.createTransactionForExpense( favourite, changedData, Spending.Data.TransactionAction.UPDATE );

			persistence.flush(tx, function() {
				Spending.cleanupFavourites(tx, function() {
					persistence.flush(tx, function() {
					});
				});
			});
		});
	});
}

Spending.createFavouriteFromExpense = function CreateFavouriteFromExpense (expense, createTransaction, systemFavourite, order, uuid)
{
	var data = {
		note: expense.note,
		category: expense.category,
		cost: expense.cost,
		createDate: new Date().getTime(),
		updateDate: new Date().getTime(),
		isNeed: expense.isNeed,
		isFavourite: true,
		isSystemFavourite: systemFavourite,
		useCount: 1,
		uuid: uuid,
		favOrder: order
	}

	var favourite = new Spending.Data.Expense(data);
	persistence.add(favourite);

	if ( createTransaction )
	{
		var favTxn = new Spending.Data.TransactionEvent();
		favTxn.uuid = persistence.createUUID();
		favTxn.timestamp = new Date().getTime();
		favTxn.type = "Expense";
		favTxn.action = Spending.Data.TransactionAction.CREATE;
		favTxn.target_id = favourite.uuid;
		favTxn.data = data;
		favTxn.data.category = expense.category.uuid;
		favTxn.isApplied = true;

		persistence.add(favTxn);
	}

	return favourite;
};

Spending.createTransactionForExpense = function (expense, changedData, type)
{
	var favTxn = new Spending.Data.TransactionEvent();
	favTxn.uuid = persistence.createUUID();
	favTxn.timestamp = new Date().getTime();
	favTxn.type = "Expense";
	favTxn.action = type;
	favTxn.target_id = expense.uuid;
	favTxn.data = changedData;
	favTxn.isApplied = true;
}

Spending.updateExpense = function(expenseUUID, newData, createFavourite, callback, createTransaction)
{
	if ( createTransaction === undefined )
	{
		createTransaction = true;
	}

	persistence.transaction(function(tx) {
		Spending.Data.Expense.findBy(tx, "uuid", expenseUUID, function(expense) {
			if( ! expense )
			{
				callback(null);
			}

			newData.updateDate = new Date().getTime();
			_.extend(expense, newData);

			var _commitUpdate = function ()
			{
				if ( createTransaction )
				{
					var txn = new Spending.Data.TransactionEvent();
					txn.uuid = persistence.createUUID();
					txn.timestamp = new Date().getTime();
					txn.type = "Expense";
					txn.action = Spending.Data.TransactionAction.UPDATE;
					txn.target_id = expense.uuid;

					txn.data = newData;

					if (typeof(newData.category) === "object")
					{
						txn.data.category = newData.category.uuid;
					}

					txn.isApplied = true;

					persistence.add(txn);
				}

				persistence.flush(tx, function() {
					callback(expense);
				});
			}

			// FAV
			if (createFavourite)
			{
				tx.executeSql( "SELECT MAX(favOrder) AS maxFavOrder FROM Expense WHERE isFavourite = 1 AND isSystemFavourite = 0", null, function (result) {
					var maxFavOrder = result.maxFavOrder || 0;
					var favouriteUUID = persistence.createUUID();
					Spending.createFavouriteFromExpense(expense, createTransaction, false, maxFavOrder + 1, favouriteUUID);
					_commitUpdate();
				});
			}
			else
			{
				_commitUpdate();
			}
			// END
		});
	});
};

Spending.deleteExpense = function(expenseId, callback, createTransaction)
{
	if ( createTransaction === undefined )
	{
		createTransaction = true;
	}

	persistence.transaction(function(tx) {
		var expense = Spending.Data.Expense.findBy(tx, "uuid", expenseId, function(expense) {
			if (expense === null)
			{
				callback();
				return;
			}

			persistence.remove(expense);

			if ( createTransaction )
			{
				var txn = new Spending.Data.TransactionEvent();
				txn.uuid = persistence.createUUID();
				txn.timestamp = new Date().getTime();
				txn.type = "Expense";
				txn.action = Spending.Data.TransactionAction.DELETE;
				txn.target_id = expense.uuid;
				txn.data = {};
				txn.isApplied = true;

				persistence.add(txn);
			}

			persistence.flush(tx, function() {
				callback();
			});
		});
	});
};

Spending._applyTransaction = function(txn, entityCache, callback)
{
	switch(txn.action) {

		case Spending.Data.TransactionAction.CREATE:
		if ( txn.type === "Expense" )
		{
			txn.data.uuid = txn.target_id;
			if (typeof(txn.data.category) === "object")
			{
				txn.data.category = Spending.categoryCache[txn.data.category.uuid];
			}
			else
			{
				txn.data.category = Spending.categoryCache[txn.data.category];
			}
			var expense = new Spending.Data.Expense(txn.data);
			persistence.add(expense);
			txn.isApplied = true;
			callback();
		}
		else if ( txn.type === "Category" )
		{
			var parentCategory = Spending.categoryCache[txn.data.parentUUID];
			txn.data.parent = parentCategory;
			txn.data.uuid = txn.target_id;
			var category = new Spending.Data.Category(txn.data);
			persistence.add(category);
			Spending.categoryCache[txn.data.uuid] = category;
			Spending.categoryCacheById[category.id] = category;
			txn.isApplied = true;
			callback();
		}

		break;

		case Spending.Data.TransactionAction.UPDATE:
		if ( txn.type === "Expense" )
		{
			var updateExpense = function __updateExpense(expense)
			{
				var category = null;
			    if (txn.data.hasOwnProperty("category"))
			    {
					if (typeof(txn.data.category) === "object")
					{
						category = Spending.categoryCache[txn.data.category.uuid];
					}
					else
					{
						category = Spending.categoryCache[txn.data.category];
					}
    				delete txn.data.category;
				}

				_.extend(expense, txn.data);

				if (category)
				{
					expense.category = category;
				}

				txn.isApplied = true;
				callback();
			};

			if ( entityCache[txn.target_id] )
			{
				updateExpense(entityCache[txn.target_id]);
			}
			else
			{
				Spending.Data.Expense.findBy("uuid", txn.target_id, function(expense) {
					if ( expense )
					{
						entityCache[txn.target_id] = expense;
						updateExpense(expense);
					}
					else
					{
						console.log("WARNING: Inconsistency - expense " + txn.target_id + " not found to update");
						txn.isApplied = true;
						callback();
					}
				});
			}
		}

		break;
		case Spending.Data.TransactionAction.DELETE:
		if (txn.type === "Expense")
		{
			console.log("Deleting: " + txn.target_id);
			Spending.deleteExpense( txn.target_id, function () {
				txn.isApplied = true;
				callback();
			}, false);
		}
		break;
		default:
			throw("Unknown transaction action: " + txn.action);
	}
};

Spending.applyPendingTransactions = function(callback)
{
	var queue = [];
	var entityCache = {};

	var txnQuery = Spending.Data.TransactionEvent.all()
						.filter("isApplied", "=", false)
						.order("timestamp", true);

	txnQuery.list(function(result) {
		if ( result.length === 0 )
		{
			callback(0);
			return;
		}

		var queueInProgress = false;

		var $body = $("body");
		var counter = 0;
		result.forEach(function(txn) {
			queue.push(function() {
				Spending._applyTransaction(txn, entityCache, function() {
					queueInProgress = false;
				});
				counter++;
			});
		});

		// kick off the queue
		var queueTimer = setInterval(function() {
			if ( queue.length === 0 )
			{
				clearInterval(queueTimer);
				persistence.flush(function(tx) {
					callback(counter);
				});
				return;
			}

			if ( ! queueInProgress )
			{
				queueInProgress = true;
				var queueFunction = queue.shift();
				queueFunction();
			}
		}, 1);

	});
};

Spending.importTransactions = function(txns, applyPending, callback)
{
	var count = 0;
	var checks = [];
	var seen = [];

	var addTxnPromises = [];

	persistence.transaction(function(tx) {
		var importOneTransaction = function __importOneTransaction (txn) {
			var dfd = $.Deferred();
			Spending.Data.TransactionEvent.findBy(tx, "uuid", txn.uuid, function (existing) {
				if (existing)
				{
					console.log("Transaction with UUID " + txn.uuid + " already exists");
				}
				else
				{
					var txnEntity = new Spending.Data.TransactionEvent(txn);
					txnEntity.isApplied = false;
					txnEntity.isSynced = true;
					persistence.add(txnEntity);
					if ( ! _.contains(seen, txn.target_id) )
					{
						checks.push(txn);
						seen.push(txn.target_id);
					}
				}
				dfd.resolve();
			});
			return dfd.promise();
		};

		_.each(txns, function(rawTxn) {
			addTxnPromises.push(importOneTransaction(rawTxn));
		});

		$.when.apply(null, addTxnPromises).then(function() {
			persistence.flush(tx, function() {
				var conflictCheck = function __conflictCheck(txn) {
					var dfd = $.Deferred();

					var futureTxnsQuery = Spending.Data.TransactionEvent.all().filter("target_id", "=", txn.target_id).filter("isApplied", "=", true).filter("timestamp", ">=", txn.timestamp);
					futureTxnsQuery.count(function(countTxns) {
						if ( countTxns > 0)
						{
							var allTxnsQuery = Spending.Data.TransactionEvent.all().filter("target_id", "=", txn.target_id);
							allTxnsQuery.list(function(allTxns) {
								_.each(allTxns, function(txn) {
									txn.isApplied = 0;
								});
								persistence.flush(function() {
									dfd.resolve();
								});
							});
						}
						else
						{
							dfd.resolve();
						}
					});
					return dfd.promise();
				};

				var promises = [];
				_.each(checks, function(txn) {
					promises.push(conflictCheck(txn));
				});

				$.when.apply(null, promises).then(function() {
					if ( applyPending )
					{
						Spending.applyPendingTransactions(callback);
					}
					else
					{
						callback(entities.length);
					}

				});
			});
		});
	});
};

Spending.getExpense = function(expenseUUID, callback)
{
	Spending.Data.Expense.findBy("uuid", expenseUUID, callback);
};

Spending.getTransactionsSince = function(since, callback)
{
	var transactionQuery = Spending.Data.TransactionEvent.all().filter("timestamp", ">=", since);
	transactionQuery.list(null, function(results) {
		callback(results);
	});
};

Spending.categoryCache = {};
Spending.categoryCacheById = {};

Spending.importCategories = function(rawCategories, callback) {
	Spending.Data.Category.all().destroyAll();

	persistence.transaction(function(tx) {
		_.each(rawCategories, function(rawCategory) {
			var category = new Spending.Data.Category();
			category.name = rawCategory.name;
			category.uuid = hex_md5(rawCategory.name).toUpperCase();
			category.isCustom = false;
			persistence.add(category);

			if ( rawCategory.children )
			{
				_.each(rawCategory.children, function(rawChild)
				{
					var childCategory = new Spending.Data.Category();
					childCategory.name = rawChild.name;
					childCategory.uuid = hex_md5(rawCategory.name + "-" + rawChild.name).toUpperCase();
					childCategory.parent = category;
					childCategory.isCustom = false;

					persistence.add(childCategory);
				});
			}
		});
		persistence.flush(tx, function() {
			Spending.primeCategoryCache();
			callback(true);
		});
	});
};

Spending.MIN_FAVS = 20;

Spending.getFavouritesSummary = function getFavouritesSummary (limit, callback)
{
	persistence.transaction(function(tx) {
		var query = "SELECT note, uuid, cost FROM Expense WHERE isFavourite = 1 ORDER BY createDate DESC";
		tx.executeSql( query, null, function(results) {
			var favourites = [];
			var count = 0;
			_.each(results, function (result) {
				if (limit === -1 || count < limit ) {
					favourites.push({
						uuid: result.uuid,
						note: result.note,
						cost: result.cost
					});
				}
				count++;
			});
			callback(favourites);
		}, function() {
			callback([]);
		});
	});
};

Spending.getFavourites = function getFavourites (count, callback)
{
	var favouritesQuery = Spending.Data.Expense.all().filter("isFavourite", "=", true).order("createDate", false);
	if ( count !== -1)
	{
		favouritesQuery = favouritesQuery.limit(count);
	}
	favouritesQuery.list(function(favourites) {
		callback(favourites);
	});
};

Spending.getExpensesHistory = function(callback)
{
	var start = new Date().getTime();
	var query = "SELECT uuid, cost, date, note, category FROM Expense WHERE isFavourite = 0 ORDER BY date DESC, createDate DESC";
	persistence.transaction( function (tx) {
		tx.executeSql(query, null, function (results) {
			var end = new Date().getTime();
			console.log("Fetch time: " + (end - start));
			var expenses = [];
			_.each(results, function (result) {
				var expense = {
					uuid: result.uuid,
					cost: result.cost,
					note: result.note,
					category: Spending.categoryCacheById[result.category],
					date: result.date
				};
				expenses.push(expense);
			});
			callback(expenses);
		});
	});
}

Spending.getExpenseCount = function (callback)
{
	var expensesQuery = Spending.Data.Expense.all().filter("isFavourite", "=", false);
	expensesQuery.count(callback);
}

Spending.getExpenses = function(filter, callback)
{
	var expensesQuery = Spending.Data.Expense.all().filter("isFavourite", "=", false);
	expensesQuery.list(function(expenses) {
		callback(expenses);
	});
}

Spending.getExpensesForDateRange = function(fromDate, toDate, callback)
{
	var expensesQuery = Spending.Data.Expense.all().prefetch("category").filter("isFavourite", "=", false).order("date").filter("date", ">=", fromDate).filter("date", "<=", toDate);
	expensesQuery.list(function(expenses) {
		callback(expenses);
	});
};

Spending.convertExpensesToCSV = function(callback)
{
	var expensesQuery = Spending.Data.Expense.all().prefetch("category").filter("isFavourite", "=", false).order("date");
	expensesQuery.list(function(expenses) {
		var csv = '"Date","Cost","Note","Category","Sub-Category"';
		if (Spending.Config.Settings.useNeedWant === "true") {
			csv + ',"Need/Want"';
		}

		csv += "\n";

		_.forEach(expenses, function(expense) {
			var csvElems = [];

			var category = Spending.categoryCache[expense.category.uuid];

			var _addElem = function (elem)
			{
				csvElems.push('"' + elem.replace(/"/g, '""') + '"');
			}

			_addElem(moment(expense.date).format("YYYY-MM-DD"));
			_addElem(Spending.prettyFormat(expense.cost, 2));
			_addElem(expense.note);
			_addElem(category.parent.name);
			_addElem(category.name);
			if (Spending.Config.Settings.useNeedWant === "true")
			{
				_addElem(expense.isNeed ? "Need" : "Want");
			}


			csv += csvElems.join(",") + "\n";
 		});
		callback(csv);
	});
}

Spending.getCategoriesFromCache = function (parent)
{
	var categories = _.filter(Spending.categoryCache, function (category) {
		if (parent === null && category.parent === null)
		{
			return true;
		}
		else if (parent !== null && category.parent === parent && category.isCustom === false)
		{
			return true;
		}
		return false;
	});
	return categories;
}

Spending.getCategories = function(parent, callback)
{
	var result = [];

	if ( parent !== null &&  Spending.categoryCache[parent])
	{
		parent = Spending.categoryCache[parent].id;
	}

	var categoryQuery = Spending.Data.Category.all().filter("parent", "=", parent).filter("isCustom", "=", "false");
	categoryQuery.list(function(categories) {
		_.each(categories, function(category) {
			result.push({"name": category.name, "uuid": category.uuid });
		});
		callback(result);
	});
};

Spending.syncTransactions = function (callback)
{
	var transactionQuery = Spending.Data.TransactionEvent.all().filter("isSynced", "=", false).order("timestamp");
	transactionQuery.list( function(transactions) {
		console.log("Need to sync " + transactions.length + " transactions");
		if (transactions.length === 0)
		{
			callback(true);
			return;
		}

		Spending.MoneySmart.putTransactions( "SpendingTrackerTransactions", transactions, function (result) {
			if ( result )
			{
				persistence.transaction( function(tx) {
					_.each( transactions, function (transaction) {
						transaction.isSynced = true;
					});
					persistence.flush( tx, function() {
						callback(true);
					});
				});
			}
		});
	});
};


Spending.primeCategoryCache = function()
{
	console.log("Priming Category Cache");
	var allCategories = Spending.Data.Category.all();
	Spending.categoryCache = {};
	Spending.categoryCacheById = {};
	allCategories.each(function(category) {
		Spending.categoryCacheById[category.id] = category;
		Spending.categoryCache[category.uuid] = category;
	});
};





Spending = window.Spending || {};
Spending.Config = {};
Spending.Config.Settings = {};

Spending.Config.resetSettings = function(preserve, callback)
{
	var numSet = 0;

	var today = new Date().getTime();

	var setCallback = function __setCallback() {
		numSet++;
		if ( numSet === expectedSet )
		{
			Spending.Config.loadSettings(callback);
		}
	};

	var defaults = {
		"cycleStartDate": 0,
		"cyclePeriod": Spending.Cycle.NONE,
		"spendingLimit": 0,
		"initialised": true,
		"useNeedWant": "true",
		"firstLoad": "true",
		"smLastUpdate": "1970-01-01",
		"numLaunches": 0,
		"rateAfter": Spending.BASE_RATE_AFTER,
		"SchemaVersion": 0
	};

	var expectedSet = Object.keys(defaults).length;

	_.each(preserve, function (keyToPreserve) {
		defaults[keyToPreserve] = Spending.Config.Settings[keyToPreserve];
	});

	_.each(defaults, function (value, key) {
		Spending.Config.setSetting(key, value, setCallback);
	});
};

Spending.Config.incrementLaunchCount = function (callback)
{
	var launches = +Spending.Config.Settings.numLaunches;
	if (launches === -1)
	{
		callback(-1);
	}

	if (launches === undefined || isNaN(launches))
	{
		launches = 0;
	}
	else
	{
		launches++;
	}

	Spending.Config.setSetting("numLaunches", Math.floor(launches), function() {
		console.log("Num Launches now " + Spending.Config.Settings.numLaunches);
		callback(Spending.Config.Settings.numLaunches);
	});
};

Spending.Config.loadSettings = function(callback)
{
	var settingQuery = Spending.Data.Setting.all();

	Spending.Config.Settings = {};

	settingQuery.list(function(settings) {
		_.each(settings, function(setting) {

			Spending.Config.Settings[setting.name] = setting.value;
		});

		callback(Spending.Config.Settings);
	});
};

Spending.Config.setSetting = function(name, value, callback)
{
	persistence.transaction(function(tx) {
		Spending.Data.Setting.findBy(tx, "name", name, function(setting) {
			if ( ! setting )
			{
				console.log("SETTINGS: New Setting " + name);
				setting = new Spending.Data.Setting();
				setting.name = name;
			}
			console.log("SETTINGS: Setting " + name + " to " + value);
			setting.value = value;
			persistence.add(setting);
			persistence.flush(tx, function() {
				Spending.Config.Settings[name] = value;
				callback();
			});
		});
	});
};

Spending.resetAll = function(callback)
{
	var rateAfter = +Spending.Config.Settings.rateAfter;
	var wasHomeFormInited = Spending.state.homeExpenseFormInit;
	var today = Spending.state.today;

	Spending.Data.TransactionEvent.all().destroyAll(function() {
		Spending.Data.Expense.all().destroyAll(function() {
			Spending.Data.Category.all().destroyAll(function() {
				Spending.Data.Setting.all().destroyAll(function() {
					Spending.state = {};
					Spending.importCategories(Spending.rawCategories, function() {
						Spending.Config.resetSettings(["rateAfter", "SchemaVersion"], function() {
								Spending.state.historyStartFrom = null;
								Spending.state.homeExpenseFormInit = wasHomeFormInited;
								Spending.state.today = today;
								Spending.databaseReady = true;
								console.log("Reset complete");
								callback(true);
						});
					});
				});
			});
		});
	});
};


//= require spending.config
//= require spending.data
//= require spending.xml.js

Spending.MoneySmart = {};

Spending.MoneySmart.base = "https://www.moneysmart.gov.au/ws/MoneySmart";
Spending.MoneySmart.appId = 18;
Spending.MoneySmart.appVer = 1;

Spending.MoneySmart.login = function(username, password, callback)
{
	Spending.state.loginError = "";
	var loginData = {
		UserName: username,
		Password: password
	};

	var timestamp = new Date().getTime();

	$.ajax({
		data: JSON.stringify(loginData),
		contentType: "application/json",
		type: "POST",
		url: Spending.MoneySmart.base + "/Login?t=" + timestamp,
		timeout: 15000
	}).done(function(data) {
		try {
			var loginResult = (data.getElementsByTagName("LoginSuccess")[0].childNodes[0].nodeValue === "true");
			var message;
			if ( ! loginResult )
			{
				message = data.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue;
			}
			callback(loginResult, message);
		}
		catch(e)
		{
			callback(false, "Unknown error");
		}
	}).fail(function(jqXHR, status) {
		$(document).trigger("msStatus", ["loginFailed", "Unable to login to MoneySmart"]);
		callback(false, status);
	});
};

Spending.MoneySmart.register = function(username, password, email, callback)
{
	var registerData = {
		UserName: username,
		Password: password,
		Email: email
	};

	var timestamp = new Date().getTime();

	$.ajax({
		type: "POST",
		contentType: "application/json",
		data: JSON.stringify(registerData),
		url: Spending.MoneySmart.base + "/Register?t=" + timestamp
	}).done(function(data) {
		try {
			var registerResult = (data.getElementsByTagName("RegistrationSuccess")[0].childNodes[0].nodeValue === "true");
			if ( ! registerResult )
			{
				var message = data.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue;
				callback(false, message);
			}
			else
			{
				callback(true);
			}
		}
		catch(e)
		{
			callback(false, "Unknown error");
		}
	}).fail(function(jqXHR, status) {
		callback(false, status);
		$(document).trigger("msStatus", ["registerFailed", "Unable to register with MoneySmart"]);
	});
};

Spending.MoneySmart.logout = function(callback)
{
	Spending.MoneySmart.clearScheduledSync();
	$.ajax({
		type: "GET",
		url: Spending.MoneySmart.base + "/Logout"
	}).done(function(data) {
		Spending.state.isLoggedIn = false;
		callback(true);
	});
};

Spending.MoneySmart.forgotPassword = function (email, callback)
{
	var forgotData = {
		UserName: email,
		SecondaryEmail: false
	};

	var timestamp = new Date().getTime();

	$.ajax({
		data: JSON.stringify(forgotData),
		contentType: "application/json",
		type: "POST",
		url: Spending.MoneySmart.base + "/PasswordReset?t=" + timestamp
	}).done(function (data) {
		try {
			var message = "";
			var forgotResult = (data.getElementsByTagName("ResetSuccess")[0].childNodes[0].nodeValue === "true");
			if ( ! forgotResult )
			{
				message = data.getElementsByTagName("ErrorMessage")[0].childNodes[0].nodeValue;
			}
			callback(forgotResult, message);
		}
		catch(e)
		{
			callback(false, "Unknown error");
		}
	}).fail(function (jqXHR, status) {
		callback(false, status);
	});
};


Spending.MoneySmart.getUserInfo = function __MSgetUserInfo(callback)
{
	$.ajax({
		type: "GET",
		url: Spending.MoneySmart.base + "/UserInfo/" + Spending.MoneySmart.appId,
		timeout: 15000
	}).done(function(data) {
		var userInfo = {};
		try {
			userInfo.UserID = Spending.xml.getNodeContent(data, "UserID");
			userInfo.UserName = Spending.xml.getNodeContent(data, "UserName");
			userInfo.UserEmail = Spending.xml.getNodeContent(data, "UserEmail");
			userInfo.AppID = Spending.xml.getNodeContent(data, "AppID");

			userInfo.ProfileNames = [];
			var profileNames = data.getElementsByTagName("ProfileName");

			_.each(profileNames, function(profileNode) {
				userInfo.ProfileNames.push(profileNode.childNodes[0].nodeValue);
			});
			callback(userInfo);
		}
		catch (e)
		{
			$(document).trigger("msStatus", ["userInfoFailed", "Could not read your user profile from MoneySmart"]);
			Spending.ga.trackEvent("Errors", "MS getUserInfo", e, 1);
			console.log("getUserInfo failed:" + e);
			callback(null);
		}
	}).fail(function(jqXHR, status) {
		$(document).trigger("msStatus", ["userInfoFailed", "Unable to get your data from MoneySmart"]);
		Spending.ga.trackEvent("Errors", "MS getUserInfo", status, 1);
		console.log("getUserInfo failed: " + status);
		callback(null);
	});
};

Spending.MoneySmart.putUserInput = function __MSputUserInput(profileName, transactions, callback)
{
	var transactionXml = "";

	_.each(transactions, function(transaction) {
		transactionXml += Spending.xml.transactionToXML(transaction);
	});

	var xml = '<AppUserInputRequest xmlns="http://moneysmart.gov.au/AppUserInputRequest"><xmlUserInput><transactions>' + transactionXml + '</transactions></xmlUserInput></AppUserInputRequest>';

	var timestamp = new Date().getTime();

	$.ajax({
		type: "POST",
		url: Spending.MoneySmart.base + "/UserInput/" + Spending.MoneySmart.appId + "?appVer=" + Spending.MoneySmart.appVer + "&profile=" + profileName + "&t=" + timestamp,
		contentType: "text/xml",
		data: xml,
		timeout: 15000
	}).done( function(result) {
	}).fail( function(result) {
		$(document).trigger("msStatus", ["putFailed", "Unable to synchronise with MoneySmart - will try again later"]);
	});
};

Spending.MoneySmart.getUserInput = function __MSgetUserInput(since, profileName, callback)
{
	var url = Spending.MoneySmart.base + "/UserInput/" + Spending.MoneySmart.appId + "?profile=" + escape(profileName);
	if ( since !== 0 )
	{
		url = Spending.MoneySmart.base + "/UpdatedUserInput/" + Spending.MoneySmart.appId + "?appVersion=" + Spending.MoneySmart.appVer + "&profile=" + escape(profileName) + "&dateToCompare=" + since;
	}

	$.ajax({
		type: "GET",
		url: url,
		contentType: "text/xml",
		timeout: 15000
	}).done( function(result) {
		var transactions = Spending.xml.XMLToTransactions(result);
		callback(transactions);
	}).fail( function(result) {
		$(document).trigger("msStatus", ["getFailed", "Unable to synchronise with MoneySmart - will try again later"]);
		callback([]);
	});
};

Spending.MoneySmart.deleteAllRemoteData = function __MSdelete ( profileName, callback )
{
	var timestamp = new Date().getTime();
	var url = Spending.MoneySmart.base + "/DeleteUserInput/" + Spending.MoneySmart.appId + "?appVer=" + Spending.MoneySmart.appVer + "&profile=" + escape(profileName) + "&t=" + timestamp;
	$.ajax({
		type: "POST",
		url: url
	}).done( function(result) {
		callback();
	});
};

Spending.MoneySmart.putTransactions = function __MSputTransactions( profileName, transactions, callback )
{
	var transactionXml = "";

	_.each(transactions, function(transaction) {
		transactionXml += Spending.xml.transactionToXML(transaction);
	});

	//<AppUserInputRequest xmlns="http://moneysmart.gov.au/AppUserInputRequest"><xmlUserInput></xmlUserInput></AppUserInputRequest>
	var xml = '<transactions path="/transactions/transaction">' + transactionXml + '</transactions>';

	var timestamp = new Date().getTime();

	$.ajax({
		type: "POST",
		url: Spending.MoneySmart.base + "/AddUserInput/" + Spending.MoneySmart.appId + "?appVersion=" + Spending.MoneySmart.appVer + "&profile=" + profileName + "&t=" + timestamp,
		contentType: "text/xml",
		data: xml
	}).done( function(result) {
		callback(true);
	}).fail( function(result) {
		callback(false);
	});

};

Spending.MoneySmart.initialiseProfile = function(profileName, callback)
{
	var xml = '<AppUserInputRequest xmlns="http://moneysmart.gov.au/AppUserInputRequest"><xmlUserInput><transactions /></xmlUserInput></AppUserInputRequest>';

	var timestamp = new Date().getTime();

	$.ajax({
		type: "POST",
		url: Spending.MoneySmart.base + "/UserInput/" + Spending.MoneySmart.appId + "?appVer=" + Spending.MoneySmart.appVer + "&profile=" + profileName + "&t=" + timestamp,
		contentType: "text/xml",
		data: xml
	}).done( function(result) {
		callback(result);
	});
};


Spending.MoneySmart.switchMode = function(newMode, callback)
{
	var baseUrl = "https://www.moneysmart.gov.au/admin/Testing/Switch";
	var mode = "";
	var expected = "";
	switch ( newMode )
	{
		case "dev":
		mode = "DevMode";
		expected = "Development";
		break;
		case "test":
		mode = "TestMode";
		expected = "Test";
		break;
		case "live":
		mode = "LiveMode";
		expected = "Live";
		break;
	}

	console.log("Switching Mode to " + newMode + " ...");

	$.ajax({
		method: "GET",
		url: baseUrl + mode
	}).done(function(result) {
		var regex = /<b>(.*?) Mode<\/b>/;
		var matches = result.match(regex);
		if ( matches && matches.length === 2 && matches[1] === expected )
		{
			console.log("... success!");
			callback(true, matches[1]);
			return;
		}
		console.log("... fail!", matches, result);
		callback(false);
	}).fail(function(result) {
		console.log("Couldn't switch mode.. callback as false");
		callback(false);
	});
};

Spending.MoneySmart.checkAndLogin = function (showStatus, callback)
{
	if ( ! Spending.Config.Settings.hasOwnProperty("smUserName") || Spending.Config.Settings.smUserName === "" )
	{
		callback(false);
		return;
	}


	var username = Spending.Config.Settings.smUserName;
	var password = Spending.Config.Settings.smPassword;

	if (showStatus)
	{
		Spending.UI.MoneySmart.showSyncProgress("Logging in as " + username + "...");
	}

	Spending.MoneySmart.login( username, password, function(result, message) {
		if ( result )
		{

			Spending.UI.MoneySmart.syncStatus("Logged in as " + username);
			Spending.MoneySmart.getUserInfo( function ( userInfo ) {
				if (userInfo === null)
				{
					callback(false, "Could not get user info");
				}
				Spending.state.userInfo = userInfo;
				Spending.state.isLoggedIn = true;
				console.log("SYNC: got user info");
				Spending.UI.MoneySmart.hideSyncProgress();
				Spending.Config.setSetting("smFirstUserName", username, function () {
					callback(true);
				});
				/* FOR TESTING
				Spending.MoneySmart.switchMode("dev", function(result) {
					if ( result )
					{
						Spending.UI.MoneySmart.syncStatus("TEST: Switched to dev mode");
						Spending.state.isLoggedIn = true;
						callback(true);
					}
					else
					{
						callback(false);
					}
				});
				*/
			});
		}
		else
		{
			Spending.UI.MoneySmart.syncStatus("Login failed: " + message);
			Spending.UI.MoneySmart.hideSyncProgress();
			callback(false, message);
		}
	});
};

Spending.MoneySmart.clearScheduledSync = function ()
{
	if (Spending.state.smSyncTimer)
	{
		clearInterval(Spending.state.smSyncTimer);
	}
};

Spending.MoneySmart.scheduleNextSync = function (after)
{
	Spending.MoneySmart.clearScheduledSync();
	Spending.state.smSyncTimer = setTimeout(function () {
		Spending.MoneySmart.performSync(false, function () {});
	}, after);
};

Spending.MoneySmart.performSync = function (showStatus, callback, syncCaller)
{
	console.log("SYNC: Starting with showStatus " + showStatus + " Caller: " + syncCaller);
	var _performSyncInner = function()
	{
		Spending.MoneySmart.getUserInfo( function ( userInfo ) {
			if (userInfo === null)
			{
				Spending.UI.MoneySmart.hideSyncProgress();
				return;
			}

			Spending.state.userInfo = userInfo;

			var since = 0;
			if ( Spending.Config.Settings.hasOwnProperty("smLastUpdate") )
			{
				since = Spending.Config.Settings.smLastUpdate;
			}

			var _syncTransactions = function _syncTransactions ()
			{
				console.log("SYNC: Syncing outstanding transactions");
				Spending.UI.MoneySmart.syncStatus("Uploading changes");
				Spending.syncTransactions( function (result) {
					console.log("SYNC: result:" + result);
					Spending.UI.MoneySmart.syncStatus("Sent changes");
					console.log("SYNC: Getting transactions since: " + since);
					Spending.MoneySmart.getUserInput( since, "SpendingTrackerTransactions", function(transactions) {
						console.log("SYNC: ... got " + transactions.length + " transactions");
						Spending.UI.MoneySmart.syncStatus("Received " + transactions.length + " changes");
						if (transactions.length > 0)
						{
							Spending.UI.MoneySmart.showSyncProgress("Applying " + transactions.length + " changes");
							Spending.Config.setSetting("smLastUpdate", moment().format(), function () {});
							Spending.importTransactions(transactions, true, function(result) {
								$(document).trigger("syncComplete", [transactions.length]);
								Spending.UI.MoneySmart.hideSyncProgress();
								if (callback) callback();
							});
						}
						else
						{
							Spending.UI.MoneySmart.hideSyncProgress();
							$(document).trigger("syncComplete", [transactions.length]);
							if (callback) callback();
						}

						// schedule next sync..
						Spending.MoneySmart.scheduleNextSync(900000); // 15 minutes

					});
				} );
			};

			if (! _.contains(userInfo.ProfileNames, "SpendingTrackerTransactions") )
			{
				console.log("SYNC: Profile NOT found");
				Spending.UI.MoneySmart.syncStatus("Creating new MoneySmart Profile");
				Spending.MoneySmart.initialiseProfile("SpendingTrackerTransactions", function () {
					_syncTransactions();
				});
			}
			else
			{
				console.log("SYNC:Profile found");
				_syncTransactions();
			}
		});
	};

	if ( ! Spending.state.hasOwnProperty("isLoggedIn") || ! Spending.state.isLoggedIn )
	{
		Spending.MoneySmart.checkAndLogin(showStatus, function (result) {
			if (result) {
				_performSyncInner();
			}
		});
	}
	else
	{
		if (showStatus)
		{
			Spending.UI.MoneySmart.showSyncProgress();
		}
		_performSyncInner();
	}

};



