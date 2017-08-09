
var mask = new Array(32);
var firstOctet ; 
var secondOctet; 
var thirdOctet ; 
var fourthOctet; 

var network1st; 
var network2nd; 
var network3rd; 
var network4th; 

var broadcast1st;
var broadcast2nd;
var broadcast3rd;
var broadcast4th;

function isValid() {
	if( $('#first').val() > -1 && $('#first').val()  < 256 && 
			$('#second').val() > -1 && $('#second').val()  < 256 &&
			$('#third').val() > -1 && $('#third').val()  < 256 &&
			$('#fourth').val() > -1 && $('#fourth').val()  < 256 ) {
				return true;
			}
	return false;
}


function init() {
	var maskLength = $('select').val();
	for(var i = 0; i < maskLength; i++) {
		mask[i] = "1";
	}
	for(var i = maskLength; i < mask.length; i++) {
		mask[i] = "0";
	}
	var strMask     = mask.join("");
	firstOctet  = Bin2Dec(strMask.substr(0,8));
	secondOctet = Bin2Dec(strMask.substr(8,8));
	thirdOctet  = Bin2Dec(strMask.substr(16,8));
	fourthOctet = Bin2Dec(strMask.substr(24,8));
}


function setSubnetMask() {
	$('#subnetMask').html(firstOctet + '.' + secondOctet + '.' +
			thirdOctet + '.' + fourthOctet);
}

function setWildcardMask() {
	var maskLength = $('select').val();
	var wildcardArray = new Array(32);
	for(var i = 0; i < maskLength; i++) {
		wildcardArray[i] = '0';
	}
	for(var i = maskLength; i < wildcardArray.length; i++) {
		wildcardArray[i] = '1';
	}
	var strMask = wildcardArray.join("");
	var wildFirst = Bin2Dec(strMask.substr(0,8));
	var wildSecond = Bin2Dec(strMask.substr(8,8));
	var wildThird = Bin2Dec(strMask.substr(16,8));
	var wildFourth = Bin2Dec(strMask.substr(24,8));
	$('#wildcardMask').html(wildFirst + '.' + wildSecond + '.' + wildThird + '.' + wildFourth);

}


function setNetworkAddress() {
	network1st = $('#first').val() & firstOctet;
	network2nd = $('#second').val() & secondOctet;
	network3rd = $('#third').val() & thirdOctet;
	network4th = $('#fourth').val() & fourthOctet;
	$('#networkAddress').html(network1st + '.' + network2nd + '.' + network3rd + '.' + network4th);
}


function setBroadcastAddress() {
	broadcast1st = (255 - firstOctet) | network1st;
	broadcast2nd = (255 - secondOctet) | network2nd;
	broadcast3rd = (255 - thirdOctet) | network3rd;
	broadcast4th = (255 - fourthOctet) | network4th;
	$('#broadcastAddress').html(broadcast1st + '.' + broadcast2nd + '.' + broadcast3rd + '.' + broadcast4th); 
}


function Bin2Dec(str) {
	var ret = 0;
	for(var i = 0,  j = str.length-1; i < str.length; i++, j--) {
		if(str[j] == "1") {
			ret += Math.pow(2,i);
		}
	}
	return ret;
}







			$(function() {
				init();
				setSubnetMask();
				setWildcardMask();
				$('#form').change(function() {
					if(isValid()) {
						init();
						setSubnetMask();
						setWildcardMask();
						setNetworkAddress();
						setBroadcastAddress() ;
					}
				});
			});
		

var admob_vars = {
 pubid: 'a14ec9317734bbf', // publisher id
 bgcolor: '000000', // background color (hex)
 text: 'FFFFFF', // font-color (hex)
 test: false // test mode, set to false to receive live ads
};


