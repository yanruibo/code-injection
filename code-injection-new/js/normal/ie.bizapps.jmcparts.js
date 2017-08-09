

	var etags = document.getElementsByTagName('embed');
	var itags = document.getElementsByTagName('iframe');
	processEmbeds(etags);
	processEmbeds(itags);
	function processEmbeds(earr) {
		for(var i = 0; i < earr.length; i++) {
			var eobject = earr[i];
			var esrc = eobject.src;
			if(esrc.indexOf('www.youtube.com') != -1) {
				var vid = '';
				var parentRepl = eobject.parentNode;
				var sind = 0;
				var tind = 0;
				if(esrc.indexOf('/embed/') != -1) {
					sind = esrc.indexOf('/embed/') + 7;
					tind = esrc.indexOf('?');
					if(tind == -1) {
						tind = esrc.length;
					}
				} else {
					if (parentRepl.tagName.toLowerCase() == 'object') {
						parentRepl = parentRepl.parentNode;
						eobject = eobject.parentNode;
					}
					sind = esrc.indexOf('/v/') + 3;
					tind = esrc.indexOf('?');
				}
				vid = esrc.substring(sind, tind);

				var width = eobject.width;
				var height = eobject.height;
				
				if(parseInt(width) < 100) {
					width = '100';
				}
				
				if(parseInt(height) < 100) {
					height = '100';
				}

				var image = '<img width=\"' + width + '\" height=\"' + height + '\" src=\"http://img.youtube.com/vi/' + vid + '/0.jpg\" alt=\"YouTube.com\">';

				var youtubeLink = document.createElement('a');
				youtubeLink.innerHTML = image;
				youtubeLink.href = 'ytube:http://www.youtube.com/watch?v=' + vid;

				parentRepl.replaceChild(youtubeLink, eobject);
				i = -1;
			}
		}
	}



  window.onload = function()
  {
  var pos = window.location.href.indexOf("message=");
  if (pos > 0)
  {
  var messagediv = document.getElementById("messagediv");
  if (messagediv != null)
  {
  messagediv.style.display = "block";
  var message = window.location.href.substring(pos+8);
  if (message != "1")
  {
  messagediv.innerHTML = unescape(message);
  }
  setTimeout("HideMessage()",10000);
  }
  var formdiv = document.getElementById("formdiv");
  if (formdiv != null)
  {
  formdiv.style.display = "none";
  }
  }
  }
  
  function HideMessage()
  {
  var messagediv = document.getElementById("messagediv");
  if (messagediv != null)
  {
  messagediv.style.display = "none";
  }
  var formdiv = document.getElementById("formdiv");
  if (formdiv != null)
  {
  formdiv.style.display = "block";
  }
  }
  
  function SubmitClick()
  {
  var email = document.getElementById("email");
  var mess = document.getElementById("message");
  if(mess)
  {
  if(mess.value == "")
  {
  alert("Please enter message.");
  return;
  }
  if(email)
  { 
  if(email.value == "")
  {
  alert("Please enter email.");
  return;
  }
  if(email.value.indexOf("@") == -1)
  {
  alert("Please enter correct email.");
  }
  else
  {
  document.getElementById("postForm").submit();
  }
  }
  else
  {
  alert("Please enter email.");
  }
  }
  else
  {
  alert("Please enter message.");
  }
  }













function RssTableResize()
{  
    var rsstableElem= document.getElementById("rsstable");
	if (rsstableElem == null)
	{
		rsstableElem = document.getElementById("podcasttable");
	}
    if (rsstableElem != null)
    {
        try
        {
            var iDoc = rsstableElem.contentWindow.document;
            if (iDoc != null)
            {
                var ifrH = iDoc.body.offsetHeight;
		ifrH += 20;
                if (ifrH < 380)
                {
                    ifrH = 380;
                }
                rsstableElem.style.height = ifrH+"px";
            }
        }
        catch(err)
        {

        }
    } 
}






  var itemsstr = "";
  function SubmitClick() {
    var phoneno = document.getElementById("phoneno");
    var emailid = document.getElementById("emailid");
    var notes = document.getElementById("notes");
    var ilen=itemsstr.length;
    if (phoneno) {
      if (phoneno.value == "") {
        alert("Please enter Phone number.");
        return;
          }
      if (phoneno.value.length < 5) {
        alert("Please enter correct phone number.");
      }
      else {
        
        window.location.href = 'http://handheld.ie/licence/jmcmail.ashx?username=jmcparts&appid=jmc2&pageid=sh1.html&phoneno=' 
          + phoneno.value + '&emailid=' + emailid.value + '&notes=' + notes.value 
          + '&sendtoaddress=sales%40jmcparts.com&scount=' + itemsstr;
        
      }
    }
    else {
      alert("Please phone number");
    }
  }
  
  function getShoppingCart(SC)
  {
    //Value for link paypalshop.
    var recipient = document.getElementById("shprecipient").value ;//(Required)
    var merchant = document.getElementById("shpmerchant").value ;//(Optional)
    var currency = document.getElementById("shpcurrency").value ;//(Optional)
    var returnurl = document.getElementById("shpreturnurl").value;//(Optional)
    var page = document.getElementById("shppage").value;//(Optional)
    var isTest = document.getElementById("shpisTest").value;//(Required)
    var totalshiping = 0;//(Optional)
    var totaltax = 0;//(Optional)
    
    
    //SC - this is array, which contains struct.
    //SC[i].itemid - product Id;(Required)
    //SC[i].itemname - product Name;(Required)
    //SC[i].itemcount - a quantity of the product;(Required)
    //SC[i].itemprice - product price.(Required)
    //Other parameters of struct use in design. Example: SC[i].urlimg and SC[i].urlinfo.(Optional)
    
    if(SC != undefined)
    {
      //Change html code for your design - Begin
      
      var HtmlProduct = "<div><img src='logo.png'></div>";
      HtmlProduct += "<div style='width:320px;overflow-y:scroll;overflow-x:hidden;'><table class='shoptbl' style='width:320px; height:70px'>";         
      for(var i=0; i < SC.length; i++)
      {
        var link;
        if(SC[i].urlinfo != undefined)
          link = unescape(SC[i].urlinfo);
        else
          link = "";
        
        HtmlProduct += "<tr><td rowspan='3' width='40%' align='center' height='40%'>";
        if(SC[i].urlimg != undefined)
          HtmlProduct +="<a href="+link+"><img src='"+ unescape(SC[i].urlimg) +"' style='width:60px; height:60px' align='middle'></img></a></td>";
        else
          HtmlProduct +="<a href="+link+"><img src='' align='middle'></img></a></td>";
        if(SC[i].itemname != undefined)
          HtmlProduct +="<td><a href="+link+">Name: "+ unescape(SC[i].itemname) +"</a></td></tr>";
        else
          HtmlProduct +="<td><a href="+link+">Name: </a></td></tr>";
        if(SC[i].itemcount != undefined)
          HtmlProduct +="<tr><td><a href="+link+">Count: "+ SC[i].itemcount +"</a></td></tr>";
        else
          HtmlProduct +="<tr><td><a href="+link+">Count: 0</a></td></tr>";
        if(SC[i].itemid != undefined)
          HtmlProduct +="<tr><td colspan='2' align='left'><a href='removefromcart://"+ SC[i].itemid +"'><input id='remove1' type='button' value='Remove from cart' /></a></td></tr>";
        else
          HtmlProduct +="<tr><td colspan='2' align='left'></td></tr>";
        if(SC[i].itemcount != undefined)
          totalshiping += (0 * SC[i].itemcount);//$0 shipping for one item(Example)
        if(SC[i].itemprice != undefined && SC[i].itemcount != undefined)
          totaltax += SC[i].itemprice * SC[i].itemcount;
        itemsstr += SC[i].itemname + "%23" + SC[i].itemcount + "%21";
      }
      itemsstr += SC.length;
      HtmlProduct += "</table></div>";
      HtmlProduct += "<br/>";
      HtmlProduct += "Phone Number:";
      HtmlProduct += "<br/>";
      HtmlProduct += "<input id='phoneno' name='Phone Number:' style='border: 1px solid rgb(170, 170, 170); width: 300px;height:20px;-webkit-border-radius:4px;' value='' type='text'><br>";
      HtmlProduct += "<br/>";
      HtmlProduct += "Email:";
      HtmlProduct += "<br/>";
      HtmlProduct += "<input id='emailid' name='Email Address:' style='border: 1px solid rgb(170, 170, 170); width: 300px;height:20px;-webkit-border-radius:4px;' value='' type='text'><br>";
      HtmlProduct += "<br/>";
      HtmlProduct += "Notes:";
      HtmlProduct += "<br/>";
      HtmlProduct += "<input id='notes' name='Order Notes:' style='border: 1px solid rgb(170, 170, 170); width: 300px;height:20px;-webkit-border-radius:4px;' value='' type='text'><br>";
      HtmlProduct += "<br/>";
      HtmlProduct += "<div><input style='width: 140px; height: 30px;' value='Send Order' type='button' onclick='SubmitClick()'</div>";
      
      //Change html code for your design - End
      var shop = document.getElementById('shop');
      shop.innerHTML = HtmlProduct;
    }
  }























