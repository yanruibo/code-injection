







var ERROR_MSG = 'We are unable to load the content you are looking for. Please check your internet connection and try again.';

var region_id = 0;
var group_id = 0;
var category_id = 0;
var deal_id = 0;
var site_id = 1;

$.ajaxSetup({
    url: 'http://m.skicoupons.com/app/proxy.cfc',
    dataType: 'json'
});

$(document).ajaxError(function (a, b, c) {
//    console.dir(a);
//    console.dir(b);
//    console.dir(c);
    if (b.status != 404 && b.status != 302) {
        alert(ERROR_MSG);
    }
});

$(document).ajaxStart(function () {
    $('.ui-loader').show();
});

$(document).ajaxStop(function () {
    $('.ui-loader').hide();
});

$(document).ready(function() {
    if (!localStorage.saved) {
        localStorage.saved = JSON.stringify({});
    }
});

function init() {
    new FastClick(document.body);
    document.addEventListener("deviceready", function() {
        console.log('device ready');
    }, false);
}

$(document).delegate("a", "click", function (e) {
    var href = $(this).attr('href');
    if (!href) {
        return;
    }
    if (href.substring(0, 4) == 'http') {
        e.preventDefault();
        if ($(this).hasClass('inapp')) {
            window.open(href, '_blank');
        } else {
            window.open(href, '_system');
        }
    }
});

function setRegion(value) {
    region_id = value;
}

function setGroup(value) {
    group_id = value;
}

function setCategory(value) {
    category_id = value;
}
function setDeal(value) {
    deal_id = value;
}

function minusDay() {
    return new Date().getTime() - 24 * 60 * 60 * 1000;
}

function now() {
    return new Date().getTime();
}

function paintRegions(resp) {
    var regions = $('<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">');
    regions.append('<li data-role="list-divider">Choose a State or Province</li>');

    for (var i = 0; i < resp.DATA.length; i++) {
        var li = $('<li class="ui-link-inherit">');
        li.append('<a href="#viewGroup" onClick="setRegion(' + resp.DATA[i][0] + ');">' + resp.DATA[i][1] + '</a>');
        regions.append(li);
    }

    $('#RegionList').html(regions).trigger('create');
}

function getRegions() {
    $("#RegionList").html('');

    var key = 'regions';

    if (localStorage[key]) {
        var cache = JSON.parse(localStorage[key]);
        if (cache.lastUpdated > minusDay()) {
            paintRegions(cache.resp);
            return;
        }
    }

    $.ajax({
        data: {method: 'getRegions', site_id: site_id},
        success: function (resp) {
            paintRegions(resp);
            localStorage[key] = JSON.stringify({resp:resp, lastUpdated: now()});
        }
    });
}

function paintGroups(resp) {
    var groups = $('<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">');
    groups.append('<li data-role="list-divider">Choose a Resort Area</li>');

    for (var i = 0; i < resp.DATA.length; i++) {
        var li = $('<li class="ui-link-inherit">');
        li.append('<a href="#viewCouponCategory" onClick="setGroup(' + resp.DATA[i][0] + ');">' + resp.DATA[i][1] + '</a>');
        groups.append(li);
    }

    $('#groupList').html(groups).trigger('create');
}

function getGroups() {
    $("#groupList").html('');

    var key = 'groups' + region_id;

    if (localStorage[key]) {
        var cache = JSON.parse(localStorage[key]);
        if (cache.lastUpdated > minusDay()) {
            paintGroups(cache.resp);
            return;
        }
    }

    $.ajax({
        data: {method: 'getGroups', region_id: region_id},
        success: function (resp) {
            paintGroups(resp);
            localStorage[key] = JSON.stringify({resp:resp, lastUpdated: now()});
        }
    });
}

function paintCategories(resp) {
    var categories = $('<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">');
    categories.append('<li data-role="list-divider">Choose a Category</li>');

    for (var i = 0; i < resp.DATA.length; i++) {
        var li = $('<li class="ui-link-inherit">');
        li.append('<a href="#viewCoupon" onClick="setCategory(' + resp.DATA[i][0] + ');">' + resp.DATA[i][1] + '</a>');
        categories.append(li);
    }

    $('#categoryList').append(categories).trigger('create');
}


function getCategories() {
    $("#categoryList").html('');

    $.ajax({
        data: {method: 'getSnowReport', region_id: region_id, group_id: group_id},
        success: function (resp) {
            if (!resp.DATA.length) {
                return;
            }
            var report = $('<ul style="margin-bottom:1em" data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">');
            report.append('<li data-role="list-divider">Snow Report - ' + resp.DATA[0][0] + '</li>');

            var li = $('<li class="ui-link-inherit">');
            li.append($('<p>' + resp.DATA[0][1] + ' Provided By OnTheSnow.com</p>'));

            report.append(li);

            $('#categoryList').prepend(report).trigger('create');
        }
    });

    var key = 'categories' + group_id;

    if (localStorage[key]) {
        var cache = JSON.parse(localStorage[key]);
        if (cache.lastUpdated > minusDay()) {
            paintCategories(cache.resp);
            return;
        }
    }

    $.ajax({
        data: {method: 'getCategories', region_id: region_id, group_id: group_id},
        success: function (resp) {
            paintCategories(resp);
            localStorage[key] = JSON.stringify({resp:resp, lastUpdated: now()});
        }
    });
}


function getDeals() {
    $("#couponList").html('');
    $.ajax({
        data: {method: 'getDeals', region_id: region_id, group_id: group_id, category_id: category_id, site_id: site_id, saved_deals: localStorage.saved},
        dataType: "html",
        success: function (resp) {
            var deals = $('<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">');
            deals.append('<li data-role="list-divider">Choose a Coupon</li>');
            deals.append(resp);

            $('#couponList').html(deals).trigger('create');
        }
    });
}

function getSavedDeals() {
    $("#savedCouponList").html('');
    $.ajax({
        data: {method: 'getDeals', site_id: site_id, deal_ids: localStorage.saved, saved_deals: localStorage.saved},
        dataType: "html",
        success: function (resp) {
            var deal = $('<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="b">');
            deal.append('<li data-role="list-divider">Choose a Coupon</li>');
            deal.append(resp);

            $('#savedCouponList').html(deal).trigger('create');
        }
    });
}

function getDealDetails() {
    $("#couponListdet").html('');
    $.ajax({
        data: {method: 'getDealDetails', saved_deals: localStorage.saved, region_id: region_id, group_id: group_id, category_id: category_id, deal_id: deal_id, site_id: site_id},
        dataType: "html",
        success: function (resp) {
            var deal = $('<ul data-role="listview" data-theme="d" data-dividertheme="b">');
            deal.append(resp);
            $('#couponListdet').html(deal).trigger('create');
            if ($("#viewCoupondet [name='formProtected']").size() > 0) {
                $.mobile.changePage('#viewFormprotect', {changeHash: false});
            } else {
                $.ajax({
                    data: {method: 'viewDeal', deal_id: deal_id}
                });
            }
        }
    });
}

function getMaps() {

    $("#mapListdet").html('');
    $.ajax({
        data: {method: 'getMap', region_id: region_id, group_id: group_id, category_id: category_id, deal_id: deal_id, site_id: site_id},
        dataType: "html",
        success: function (resp) {
            $('#mapListdet').html(resp).trigger('create');
        }
    });
}

$(document).delegate('#viewHome', 'pagebeforeshow', function () {
    getRegions();
});

$(document).delegate('#viewGroup', 'pagebeforeshow', function () {
    if (region_id != 0) {
        getGroups();
    } else {
        $.mobile.changePage("#viewHome");
    }
});

$(document).delegate('#viewCouponCategory', 'pagebeforeshow', function () {
    if (group_id != 0) {
        getCategories();
    } else {
        $.mobile.changePage("#viewHome");
    }
});

$(document).delegate('#viewCoupon', 'pagebeforeshow', function () {
    if (category_id != 0) {
        getDeals();
    } else {
        $.mobile.changePage("#viewHome");
    }
});

$(document).delegate('#viewSaved', 'pagebeforeshow', function () {
    getSavedDeals();
});

$(document).delegate('#viewCoupondet', 'pagebeforeshow', function () {
    if (deal_id != 0) {
        getDealDetails();
    } else {
        $.mobile.changePage("#viewHome");
    }
});

$(document).delegate('#viewFormprotect', 'pageinit', function () {
    var page = $(this);
    var form = page.find('form');
    form.validate({
        rules:{
            lead_firstName : {required:true},
            lead_lastName : {required:true},
            lead_email : {required:true, email: true}
        },
        submitHandler: function(form) {
            $.ajax({
                data: $(form).serialize(),
                type: 'POST',
                success: function () {
                    $.mobile.changePage('#viewCoupondet');
                }
            });
            return false;
        }
    });
});

$(document).delegate('#viewFormprotect', 'pagebeforeshow', function () {
    var page = $(this);
    page.find('[name=formprotecteddeal_ids]').val(deal_id);
});

$(document).delegate('#viewMap', 'pagebeforeshow', function () {
    if (deal_id != 0) {
        getMaps();
    } else {
        $.mobile.changePage("#viewHome");
    }
});

$(document).delegate('.trackurl', 'click', function () {
//    console.log('tracking url');
    var dealId = $(this).attr('id').split("-")[1];
    $.ajax({
        data: {method: 'clickDeal', deal_id: dealId}
    });
});

$(document).delegate('.saveDeal', 'click', function() {
    var a = $(this);
    var deal_id = a.parents('li').attr('id');
    var saved = JSON.parse(localStorage.saved);
    if (saved[deal_id] != 1) {
        saved[deal_id] = 1;
        a.find('.ui-btn-text').html('Unsave');
        a.find('.ui-icon').removeClass('ui-icon-star').addClass('ui-icon-delete');
    } else {
        delete saved[deal_id];
        a.find('.ui-btn-text').html('Save');
        a.find('.ui-icon').removeClass('ui-icon-delete').addClass('ui-icon-star')
    }
    localStorage.saved = JSON.stringify(saved);
});

