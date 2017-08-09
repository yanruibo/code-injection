




var globalLink = '';

function BeApp_fn_GoToSystem(){
	
	var SystemChoice = document.getElementById('SystemChoice');
	var urlToSystem = "https://ww3.allnone.ie/" + SystemChoice.value;
		
	window.location = urlToSystem;
}



function BeAPP_fn_DisplayRandomProduct(){
	
	var ProductsImg = new Array();
	var ProductsDesc = new Array();
	var ProductsLink = new Array();
	
	ProductsImg[1] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Procedural.jpg';//BEprocedural
	ProductsImg[2] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Intouch_Inbound.jpg';//BEintouch – Inbound
	ProductsImg[3] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Intouch_Outbound.jpg';//BEOutbound
	ProductsImg[4] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Mail.jpg';//BEmail
	ProductsImg[5] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Paperless.jpg';//BEpaperless
	ProductsImg[6] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Social.jpg';//BEsocial
	ProductsImg[7] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Connected.jpg';//BEconnected
	ProductsImg[8] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Seamless.jpg';//BEseamless
	ProductsImg[9] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Educated.jpg';//BEeducated
	ProductsImg[10] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Quality_Assured.jpg';//BEqualityassured
	ProductsImg[11] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Marketing.jpg';//BEmarketing
	ProductsImg[12] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Secure.jpg';//BEsecure
	ProductsImg[13] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Briefed.jpg';//BEbriefed
	ProductsImg[14] = 'http://www.allnone.ie/wp-content/uploads/2012/06/BE_Integrated.jpg';//BEintegratedBE
	
	ProductsLink[1] = 'http://www.allnone.ie/products/beprocedural';//BEprocedural
	ProductsLink[2] = 'http://www.allnone.ie/products/beintouch-inbound';//BEintouch – Inbound
	ProductsLink[3] = 'http://www.allnone.ie/products/beintouch-outbound';//BEOutbound
	ProductsLink[4] = 'http://www.allnone.ie/products/bemail';//BEmail
	ProductsLink[5] = 'http://www.allnone.ie/products/bepaperless';//BEpaperless
	ProductsLink[6] = 'http://www.allnone.ie/products/besocial';//BEsocial
	ProductsLink[7] = 'http://www.allnone.ie/products/beconnected';//BEconnected
	ProductsLink[8] = 'http://www.allnone.ie/products/beseamless';//BEseamless
	ProductsLink[9] = 'http://www.allnone.ie/products/beeducated';//BEeducated
	ProductsLink[10] = 'http://www.allnone.ie/products/bequalityassured';//BEqualityassured
	ProductsLink[11] = 'http://www.allnone.ie/products/bemarketing';//BEmarketing
	ProductsLink[12] = 'http://www.allnone.ie/products/besecure';//BEsecure
	ProductsLink[13] = 'http://www.allnone.ie/products/bebriefed';//BEbriefed
	ProductsLink[14] = 'http://www.allnone.ie/products/beintegrated';//BEintegratedBE
	
	ProductsDesc[1] = 'BEprocedural';
	ProductsDesc[2] = 'BEintouch - Inbound';
	ProductsDesc[3] = 'BEOutbound';
	ProductsDesc[4] = 'BEmail';
	ProductsDesc[5] = 'BEpaperless';
	ProductsDesc[6] = 'BEsocial';
	ProductsDesc[7] = 'BEconnected';
	ProductsDesc[8] = 'BEseamless';
	ProductsDesc[9] = 'BEeducated';
	ProductsDesc[10] = 'BEqualityassured';
	ProductsDesc[11] = 'BEmarketing';
	ProductsDesc[12] = 'BEsecure';
	ProductsDesc[13] = 'BEbriefed';
	ProductsDesc[14] = 'BEintegrated';
	
	
	var RanProd = document.getElementById('RandomImage');
	var posArray = Math.floor(Math.random() * 14) + 1
	
RanProd.innerHTML = '<p><font size="4" color="#FFFFFF"> Learn more about. '+ ProductsDesc[posArray] +' can do. Click the image below</font></p> <br/> <a href="'+ProductsLink[posArray]+'"><img border="0" src="http://www.allnone.ie/images/rounded_left.png" alt="product"></img><img border="0" src="'+ ProductsImg[posArray] +'" alt="product"></img><img border="0" src="http://www.allnone.ie/images/rounded_right.png" alt="product"></a>';	

}

function BeApp_fn_MakeItSo(){

	var urlToSystem = "http://www.allnone.ie/engage";
	window.location = urlToSystem;
}




function BeAPP_fn_Main(){

	BeAPP_fn_DisplayRandomProduct();
}
BeAPP_fn_Main();



