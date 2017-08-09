



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}









var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_medea1.png',
	mp4: 'video/n/01_medea.mp4',
	webm: 'video/s/01_medea.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}











var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_giorda.png',
	mp4: 'video/n/07_giorda.mp4',
	webm: 'video/s/07_giorda.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}











var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_medea2.png',
	mp4: 'video/n/02_medea.mp4',
	webm: 'video/s/02_medea.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}


















var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}









var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_corsini.png',
	mp4: 'video/n/04_corsini.mp4',
	webm: 'video/s/04_corsini.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}

































var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}














var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_giaccari.png',
	mp4: 'video/n/06_giaccari.mp4',
	webm: 'video/s/06_giaccari.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}













var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}













var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}











var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_medea3.png',
	mp4: 'video/n/011_medea_conclusioni.mp4',
	webm: 'video/s/011_medea_conclusioni.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}









var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}









var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_degliesposti.png',
	mp4: 'video/n/010_degliesposti.mp4',
	webm: 'video/s/010_degliesposti.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}

















/*
 Copyright (C) 2011-2012 Galaera - Sharkwave and and its licensors.
 All Rights Reserved. The following is Source Code and is subject to all
 restrictions on such code as contained in the End User License Agreement
 accompanying this product.
*/

var inc_requireds = {loaded: 0, total: 2, timer: null};


var uagent = {
	name : '',
	version : 0,
	real : navigator.userAgent.toString (),
	init : function () {
		this.name = (/webkit/i).test(navigator.appVersion) ? 'webkit' : (/firefox/i).test(navigator.userAgent) ? 'moz' : (/trident/i).test(navigator.userAgent) ? 'msie' : (/msie/i).test(navigator.userAgent) ? 'msie' : 'opera' in window ? 'O' : '';
	}
}
uagent.init ();
//alert (uagent.name);
//alert (uagent.real);
if (uagent.name != 'msie')
	{document.addEventListener ('touchmove', function (e) { e.preventDefault(); }, false);}


var lms = {
	version : 'mobile',
	initialized : false,
	suspend_mod: true,
	opener: null,
	opened: null
}
try {
	lms.opened.close ();
	lms.opened = null;
}
catch (e)
	{;}

/*
if (getAPI ())
{
	lms.version = 'lmstracked';
	if (window.opener)
		{lms.opener = window.opener;}
}
*/

var sdata = null;

var nav_index = {
	statuss : ['n', 'i', 'f', 'c'],
	statusn : {
		n : 0,
		i : 1,
		f : 2,
		c : 3
	},
	current_n : -1,
	total_n : 0,
	plain : {
		units: []
	},
	mode : 'normal',
	data: 'ddata'
};

var wapp = null;

var gui_lay = {
	start: ['lay_start'],
	index: ['btn_back_alt', 'lay_splash'],
	main: ['lay_container', 'lay_menu', 'lay_menu_btn', 'lay_hed_btn']
};

var scrolpane = {
	panel : null,
	api : null,
	scroll : {left: 0, top: 0}
};

var downl = {
	lay: null,
	bar: null,
	file: null,
	status: 0,
	progress: 0,
	total: 0,
	readed: 0,
	label: '',
	finished : 0,
	alertshow : true
}

var app_unload = [];


var ssuper = this;

var ddata = null;

var nav = {
	statuss : ['n', 'i', 'f', 'c'],
	statusn : {
		n: 0,
		i: 1,
		f: 2,
		c: 3
	},
	loading_n : -1,
	loading_l : -1,
	current_n : -1,
	total_n : 0,
	map: [],
	level: 0,
	plain : {
		topics: [],
		assets: []
	},
	iframe : false,
	loaded_raw : '',
	mode : ssuper.nav_index.mode,
	access: {
		
		user: {
			local: {id: 0},
			web: {id: 0},
			on: false,
			joined: true
		},
		
		unjoin: function () {},
		
		join: function () {}
	}
};

var lay = {
	wpsize: {width: 1024, height: 768},
	cplayer : {},
	cnavigon : {},
	cinteract : {},
	btn : {},
	inner : {},
	mon: {},
	list: {},
	shared: {}
};

var mplayer = {
	type : '',
	audio : 1,
	play : 0,
	resume : 0,
	player : null,
	updater: null
};

var filesystem_needs = [];

var resPathUri = '';
var sdcard_uri = '';

var tdata = null;

var console = {
	show : ''
};

var mvars = {
	inn: 0,
	ilike: [],
	afo_timer: null
}

var discla_view = false;

discla_view = true;


var horiz_on = null;


var foot_no = false;
	

var nChipVid = false;

$(document).ready (function () {
	
	if (lms.version == 'lmstracked')
	{
		if (lms.opener)
			{initialize_index ();}
		else
			{initialize_splash ();}
	}
	else
		{initialize_index ();}
	
});





















var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}































var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}













var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_scalpone.png',
	mp4: 'video/n/03_scalpone.mp4',
	webm: 'video/s/03_scalpone.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}







var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_sesti.png',
	mp4: 'video/n/08_sesti.mp4',
	webm: 'video/s/08_sesti.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}

















var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_manzato.png',
	mp4: 'video/n/05_manzato.mp4',
	webm: 'video/s/05_manzato.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}






var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}





var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}



















var nChipVid = false;


var nChipVid = true;

var videos = {
	poster: 'video/l/poster_pontremoli.png',
	mp4: 'video/n/09_pontremoli.mp4',
	webm: 'video/s/09_pontremoli.webm',
	sdvid: ''
};

var src = document.createElement ('video');
//src.setAttribute ('autoplay', 'autoplay');
src.setAttribute ('autobuffer', 'autobuffer');
src.setAttribute ('controls', 'controls');
src.setAttribute ('style', 'width:100%;');
var w = lay.tbody.width ();
var h = lay.tbody.height ();
var hz = lay.tcontent.height ();
//alert (w + ', ' + h);
if (Math.max (w, h) == w)
	{src.setAttribute ('style', 'height:' + hz + 'px;max-width:100%;');}
if (mobile.os_info.platform == 'ipad' || mobile.os_info.platform == 'iphone' || mobile.os_info.platform == 'ios')
{
	src.setAttribute ('width', '100%');
	src.setAttribute ('height', '100%');
}

if (videos.poster)
{
	if (!mobile.run)
		{src.setAttribute ('poster', videos.poster);}
}

if (videos.mp4)
{
	var sourc = document.createElement ('source');
	//sourc.setAttribute('type', 'video/mp4');
	sourc.setAttribute('src', videos.mp4);
	
	if (mobile.run)
	{
		var uri = videos.mp4.split ('/');
		videos.sdvid = mobile.sdcard + uri[uri.length - 1];
		sourc.setAttribute('src', 'file://' + videos.sdvid);
	}
	
	src.appendChild (sourc);
}

if (videos.webm)
{
	if (!mobile.run)
	{
		var sourc = document.createElement ('source');
		//sourc.setAttribute('type', 'video/webm');
		sourc.setAttribute('src', videos.webm);
		
		src.appendChild (sourc);
	}
}

$src = $(src);

$src.attr ('id', 'player_mp4');



if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}

















var nChipVid = false;


if (nChipVid)
{
	if (!mobile.run)
	{
		$("#iarticle").empty ();
		
		$("#iarticle").append ($src);
	}
	else
	{
		if (videos.mp4)
		{
			var uri = videos.mp4.split ('/');
			$("#iarticle").find ('p').html (uri[uri.length - 1]);
		}
		
		chipvid.check (videos.sdvid, $src, videos.poster);
	}
}




// jQuery WipeTouch 1.1.0
//
// Developed and maintained by Devv: http://devv.com
// This plugin is based on TouchWipe by Andreas Waltl: http://www.netcu.de
//
// USAGE
// $(selector).wipetouch(config);
//
// The wipe events should expect the result object with the following properties:
// speed - the wipe speed from 1 to 5
// x - how many pixels moved on the horizontal axis
// y - how many pixels moved on the vertical axis
//
// EXAMPLE
//		$(document).wipetouch({
//			allowDiagonal: true,
//			wipeLeft: function(result) { alert("Left on speed " + result.speed) },
//			wipeTopLeft: function(result) { alert("Top left on speed " + result.speed) },
//			wipeBottomLeft: function(result) { alert("Bottom left on speed " + result.speed) }
//		});
//
//
// More details at http://wipetouch.codeplex.com/
//
// LATEST CHANGES
// 1.1.0
// - New: tapToClick, if true will identify taps and and trigger a click on the touched element. Default is false.
// - Changed: events wipeBottom*** and wipeTop*** renamed to wipeDown*** and wipeUp***.
// - Changed: better touch speed calculation (was always too fast before).
// - Changed: speed will be an integer now (instead of float).
// - Changed: better wipe detection (if Y movement is more than X, do a vertical wipe instead of horizontal).
// - Bug fix: added preventDefault to touchStart and touchEnd internal events (this was missing).
// - Other general tweaks to the code.
//
//
// If you want to compress this code, we recommend Jasc: http://jasc.codeplex.com

(function($)
{
	$.fn.wipetouch = function(settings)
	{
		// ------------------------------------------------------------------------
		// PLUGIN SETTINGS
		// ------------------------------------------------------------------------

		var config = {
			// Variables and options
			moveX:				40,		// minimum amount of horizontal pixels to trigger a wipe event
			moveY:				40,		// minimum amount of vertical pixels to trigger a wipe event
			preventDefault:		true,	// if true, prevents default events (click for example)
			allowDiagonal:		false,	// if false, will trigger horizontal and vertical movements so
										// wipeTopLeft, wipeDownLeft, wipeTopRight, wipeDownRight are ignored
			tapToClick:			false,	// if user taps the screen it will fire a click event on the touched element

			// Wipe events
			wipeLeft:			false,	// called on wipe left gesture
			wipeRight:			false,	// called on wipe right gesture
			wipeUp:				false,	// called on wipe up gesture
			wipeDown:			false,	// called on wipe down gesture
			wipeUpLeft:			false,	// called on wipe top and left gesture
			wipeDownLeft:		false,	// called on wipe bottom and left gesture
			wipeUpRight:		false,	// called on wipe top and right gesture
			wipeDownRight:		false,	// called on wipe bottom and right gesture

			wipeTopLeft:		false,	// DEPRECATED, USE WIPEUPLEFT
			wipeBottomLeft:		false,	// DEPRECATED, USE WIPEDOWNLEFT
			wipeTopRight:		false,	// DEPRECATED, USE WIPEUPRIGHT
			wipeBottomRight:	false	// DEPRECATED, USE WIPEDOWNRIGHT
		};

		if (settings)
		{
			$.extend(config, settings);
		}

		this.each(function()
		{
			// ------------------------------------------------------------------------
			// INTERNAL VARIABLES
			// ------------------------------------------------------------------------
			var startX; // where touch has started, left
			var startY; // where touch has started, top
			var startDate = false; // used to calculate timing and aprox. acceleration
			var curX; // keeps touch X position while moving on the screen
			var curY; // keeps touch Y position while moving on the screen
			var isMoving = false; // is user touching and moving?
			var touchedElement = false; // element which user has touched

			// ------------------------------------------------------------------------
			// TOUCH EVENTS
			// ------------------------------------------------------------------------

			// Called when user touches the screen
			function onTouchStart(e)
			{
				if (!isMoving && e.touches.length > 0)
				{
					if (config.preventDefault)
					{
						e.preventDefault();
					}

					// temporary fix for deprecated events, will be removed soon!!!
					if (config.allowDiagonal)
					{
						if (!config.wipeDownLeft) config.wipeDownLeft = config.wipeBottomLeft;
						if (!config.wipeDownRight) config.wipeDownRight = config.wipeBottomRight;
						if (!config.wipeUpLeft) config.wipeUpLeft = config.wipeTopLeft;
						if (!config.wipeUpRight) config.wipeUpRight = config.wipeTopRight;
					}

					startDate = new Date().getTime();

					startX = e.touches[0].pageX;
					startY = e.touches[0].pageY;
					curX = startX;
					curY = startY;
					isMoving = true;

					touchedElement = $(e.target);

					this.addEventListener('touchmove', onTouchMove, false);
				}
			}

			// Called when user untouches the screen
			function onTouchEnd(e)
			{
				this.removeEventListener('touchmove', onTouchMove, false);

				touchCalculate(e);
			}

			// Called when user is touching and moving on the screen
			function onTouchMove(e)
			{
				if (config.preventDefault)
				{
					e.preventDefault();
				}

				if (isMoving)
				{
					curX = e.touches[0].pageX;
					curY = e.touches[0].pageY;
				}
			}

			// ------------------------------------------------------------------------
			// CALCULATE TOUCH AND TRIGGER
			// ------------------------------------------------------------------------

			function touchCalculate(e)
			{
				var endDate = new Date().getTime();	// current date to calculate timing
				var ms = startDate - endDate; // duration of touch in milliseconds

				var x = curX;			// current left position
				var y = curY;			// current top position
				var dx = x - startX;	// diff of current left to starting left
				var dy = y - startY;	// diff of current top to starting top
				var ax = Math.abs(dx);	// amount of horizontal movement
				var ay = Math.abs(dy);	// amount of vertical movement

				// moved less than 15 pixels and touch duration less than 100ms,
				// if tapToClick is true then triggers a click and stop processing
				if (ax < 15 && ay < 15 && ms < 100)
				{
					resetTouch();

					touchedElement.trigger("click");
					return;
				}

				var toright = dx > 0;	// if true X movement is to the right, if false is to the left
				var tobottom = dy > 0;	// if true Y movement is to the bottom, if false is to the top

				// calculate speed from 1 to 5, being 1 slower and 5 faster
				var s = ((ax + ay) * 60) / ((ms) / 6 * (ms));

				if (s < 1) s = 1;
				if (s > 5) s = 5;

				var result = {speed: parseInt(s), x: ax, y: ay};

				if (ax >= config.moveX)
				{
					// check if it's allowed and call diagonal wipe events
					if (config.allowDiagonal && ay >= config.moveY)
					{
						if (toright && tobottom)
						{
							triggerEvent(config.wipeDownRight, result);
						}
						else if (toright && !tobottom)
						{
							triggerEvent(config.wipeUpRight, result);
						}
						else if (!toright && tobottom)
						{
							triggerEvent(config.wipeDownLeft, result);
						}
						else
						{
							triggerEvent(config.wipeUpLeft, result);
						}
					}
					else if (ax >= ay)
					{
						if (toright)
						{
							triggerEvent(config.wipeRight, result);
						}
						else
						{
							triggerEvent(config.wipeLeft, result);
						}
					}
				}

				if (ay >= config.moveY && ay > ax)
				{
					if (tobottom)
					{
						triggerEvent(config.wipeDown, result);
					}
					else
					{
						triggerEvent(config.wipeUp, result);
					}
				}

				if (config.preventDefault)
				{
					e.preventDefault();
				}

				resetTouch();
			}

			// Resets the cached variables
			function resetTouch()
			{
				startX = false;
				startY = false;
				startDate = false;
				isMoving = false;
			}

			// Triggers a wipe event passing a result object with
			// speed from 1 to 5, and x / y movement amount in pixels
			function triggerEvent(wipeEvent, result)
			{
				if (wipeEvent) wipeEvent(result);
			}

			// ------------------------------------------------------------------------
			// ADD TOUCHSTART AND TOUCHEND EVENT LISTENERS
			// ------------------------------------------------------------------------

			if ('ontouchstart' in document.documentElement)
			{
				this.addEventListener('touchstart', onTouchStart, false);
				this.addEventListener('touchend', onTouchEnd, false);
			}
		});

		return this;
	};
})(jQuery);

/*
 Copyright (C) 2011-2012 Galaera - Sharkwave and and its licensors.
 All Rights Reserved. The following is Source Code and is subject to all
 restrictions on such code as contained in the End User License Agreement
 accompanying this product.
*/

var access = {
	
	user: {
		local: {id: ''},
		web: {id: ''},
		on: false,
		joined: false
	},
	
	pend: {
		exn: -1,
		exl: -1
	},
	
	unjoin: function () {
		
		nav.access.user.joined = false;
		nav.access.user.local.id= '';
		nav.access.user.local.password = '';
		nav.access.user.web.id = '';
	},
	
	join: function (ar) {
		
		nav.access.pend.exn = ar.exn;
		nav.access.pend.exl = ar.exl;
		
		
		nav.access.user.local.id = '';
		nav.access.user.local.password = '';
		
		nav.access.user.on = true;
		
		var postd = {
			jo: nav.access.user.local.id,
			jp: nav.access.user.local.password
		};
		
		var uri = sdata.info.urintra + sdata.info.argeid + '/' + sdata.info.uniref + '/wsdj.php?callback=?';
		//alert (uri);
		
		$.ajax({
			cache: false,
			//type: "POST",
			dataType: "jsonp",
			data: postd,
			beforeSend: function (x)
			{
				if(x && x.overrideMimeType)
				{
					x.overrideMimeType ("application/json;charset=UTF-8");
				}
			},
			url: uri,
			success: function (data) {
				
				nav.access.user.on = false;
				
				
				if (data.error > 0)
				{
					alert ('NO WAY');
				}
				else
				{
					nav.access.user.web.id = data.wbd;
					nav.access.user.joined = true;
					
					sectionLoad (nav.access.pend.exn, nav.access.pend.exl);
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				
				nav.access.user.on = false;
				
				
				alert (textStatus + ', ' + errorThrown + ':\n' + jqXHR.responseText);
			}
		});
	}
}

function getQSParam (nam)
{
	nam = nam.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+nam+"=([^&#]*)";
	var regex = new RegExp(regexS);
	var results = regex.exec(window.location.href);
	if(results == null)
		{return '';}
	else
		{return results[1];}
}

function checkRequireds ()
{
	//alert (inc_requireds.loaded + ' >= ' + inc_requireds.total);
	
	if (inc_requireds.loaded >= inc_requireds.total)
	{
		if (inc_requireds.timer)
		{
			clearInterval (inc_requireds.timer);
			inc_requireds.timer = null;
		}
		
		mobile.initialize ();
	}
}

function layAdjust (rl)
{
	try {
		//$.modal.close ();
	}
	catch (e)
		{;}
	
	
	lay.warea.width = Math.round ($(window).width ());
	lay.warea.height = Math.round ($(window).height ());

	var hw = Math.round ($(window).height ());

	var s = lay.head.css ('height');
	var hh = parseInt (s.substr (0, s.length - 2));
	if (lay.head.hasClass ('lay_head_expan'))
		{hh = lay.head.height ();}
	s = lay.foot.css ('height');
	var hf = parseInt (s.substr (0, s.length - 2));

	//lay.head.css ('height', lay.head.css ('height'));
	//lay.foot.css ('height', lay.foot.css ('height'));
	lay.tbody.css ('height', hw - hf - hh);
	
	//alert (rl + ' ' + nav.current_n);
	if (rl)
	{
		if (nav.level == 0 && nav.map[nav.level].current_n  < 0)
		{
			introLoad (false);
		}
		else
		{
			if (!horiz_on)
			{
				nav.map[nav.level].current_n = -1;
				
				nav.level--;
				
				if (nav.level >= 0)
					{sectionLoad (nav.map[nav.level].current_n, nav.level);}
				else
					{introLoad (true);}
			}
			else
			{
				sectionLoad (horiz_on.current_n, nav.level - 1);
			}
		}
	}
}

function lessonStatusSet ()
{
	var ret = false;

	if (lms.initialized)
	{
		var st = 'completed';
		for (var i = 0; i < nav_index.plain.units.length; i++)
		{
			if (nav_index.plain.units[i].status != nav_index.statuss[nav_index.statuss.length - 1])
			{
				st = 'incomplete';
				break;
			}
		}
		/*if (lms.status != 'completed' && lms.status != 'passed')
		{*/
			var dum = lms.do_set ('cmi.core.lesson_status', st);
			if (dum)
			{
				lms.status = st;

				ret = dum;
			}
		/*}*/
	}

	return ret;
}

function suspendSet ()
{
	var ret = false;
	
	if (lms.initialized)
	{
		//var dum = lessonStatusSet ()
		
		var dum = lms.do_set ('cmi.suspend_data', 'st=' + lms.tstatus_tolms ());
		if (dum)
		{
			ret = dum;
		}
	}

	return ret;
}

function scoreSet (n)
{
	var ret = false;
	
	if (lms.initialized)
	{
		var dum = lms.do_set ('cmi.core.score.raw', '' + n);
		if (dum)
		{
			ret = dum;
		}
		
		var dum = lms.do_commit ();
	}
	
	return ret;
}

function bookmarkGo (t, a)
{
	if (lms.initialized)
	{
		if (lms.bookmark.length == 3)
		{
			lms.bookmark_on = true;

			appStart (lms.bookmark[0]);
		}
	}

	return false;
}

function bookmarkSet (t, a)
{
	var ret = false;

	if (lms.initialized)
	{
		var dum = lms.do_set ('cmi.core.lesson_location', nav_index.current_n + '_' + t + '_' + a);

		if (dum)
			{ret = true;}
	}

	return ret;
}

function bookmarkGet ()
{
	var ret = [];

	if (lms.initialized)
	{
		if (lms.bookmark_on && lms.bookmark.length == 3)
		{
			lms.bookmark_on = false;

			ret = [lms.bookmark[1], lms.bookmark[2]];
		}
	}

	return ret;
}

function apacyToggle (sh)
{
	if (sh)
	{
		if (!$("#lay_twrapper").hasClass ('apacy'))
		{
			$("#lay_twrapper").addClass ('apacy');

			$("#btn_prev").css ('display', 'none');
			$("#btn_next").css ('display', 'none');
		}
	}
	else
	{
		if ($("#lay_twrapper").hasClass ('apacy'))
		{
			$("#lay_twrapper").removeClass ('apacy');

			$("#btn_prev").css ('display', 'block');
			$("#btn_next").css ('display', 'block');
		}
	}
}

function unitEnable (n)
{
	unitCompleted (n);
	
	
	if (n < sdata.units.length - 1)
	{
		if (!lay.btn_next.hasClass ('active'))
			{lay.btn_next.addClass ('active')}
	}
	else
	{
		if (lay.btn_next.hasClass ('active'))
			{lay.btn_next.removeClass ('active')}
	}
}

function monPMKUpdate ()
{
	//lay.mon_pmk.css ('display', 'block');

	$(".mon_pmk").removeClass ('current');
	$(".mon_pmk").each (function (i, o) {

		$o = $(o);
		if (i == nav.current_n)
			{$o.addClass ('current');}
	});
}

function unitRestart ()
{
	unitLoad (0);
}

function unitGo (n)
{
	if (mvars.afo_timer)
	{
		clearTimeout (mvars.afo_timer);
		mvars.afo_timer = null;
	}
	/*********/


	var nt = nav.current_n;

	if (n > 0)
	{
		if (nav.current_n + n <= sdata.units.length - 1)
			{nt++;}
	}
	else
	{
		if (nav.current_n + n >= 0)
			{nt--;}
	}

	if (nt != nav.current_n)
	{
		unitLoad (nt);
	}
}

function afoILike (n)
{
	mvars.ilike[mvars.inn] += n;

	$("#console_afo_ilike").find ('span').each (function (i, o) {

		if (i == 0)
		{
			if (mvars.ilike[mvars.inn] > 0)
				{$(o).html (sdata.locale.ilikn);}
			else
				{$(o).html ('');}
		}
		else if (i == 1)
		{
			var s = mvars.ilike[mvars.inn] == 1 ? sdata.locale.likeo : sdata.locale.liken ;
			if (mvars.ilike[mvars.inn] > 0)
				{$(o).html (mvars.ilike[mvars.inn] + ' ' + s);}
			else
				{$(o).html (sdata.locale.ilike);}
		}
	});
}
function afoClock ()
{
	if (mvars.afo_timer)
	{
		clearTimeout (mvars.afo_timer);
		mvars.afo_timer = null;
	}

	var n = mvars.inn + 1;
	if (n < sdata.units[nav.current_n].topics.length)
	{
		afoGo (1);
	}
	else
	{
		afoGo (0);

		unitEnable (nav.current_n);
	}
}
function afoGo (n)
{
	$(".cont_afo").css ('display', 'none');

	if (mvars.afo_timer)
	{
		clearTimeout (mvars.afo_timer);
		mvars.afo_timer = null;
	}

	if (n > 0)
	{
		if (mvars.inn + n <= sdata.units[nav.current_n].topics.length - 1)
			{mvars.inn++;}
	}
	else if (n < 0)
	{
		if (mvars.inn + n >= 0)
			{mvars.inn--;}
	}
	else
	{
		mvars.inn = 0;
	}

	if (mvars.inn > 0)
		{$("#btn_previn").removeClass ('disabled');}
	else
		{$("#btn_previn").addClass ('disabled');}
	if (mvars.inn < sdata.units[nav.current_n].topics.length - 1)
	{
		mvars.afo_timer = setTimeout (afoClock, 5000);

		$("#btn_nextin").removeClass ('disabled');
	}
	else
	{
		mvars.afo_timer = setTimeout (afoClock, 5000);

		$("#btn_nextin").addClass ('disabled');
		unitEnable (nav.current_n);
	}

	$("#afo_pagin").html ((mvars.inn + 1) + '|' + sdata.units[nav.current_n].topics.length);
	$("#afo_img").attr ('src', sdata.units[nav.current_n].topics[mvars.inn].img);
	$("#afo_content").html (sdata.units[nav.current_n].topics[mvars.inn].content);
	$("#afo_author").html (sdata.units[nav.current_n].topics[mvars.inn].author);

	$("#console_afo_ilike").find ('span').each (function (i, o) {

		if (i == 0)
		{
			if (mvars.ilike[mvars.inn] > 0)
				{$(o).html (sdata.locale.ilikn);}
			else
				{$(o).html ('');}
		}
		else if (i == 1)
		{
			var s = mvars.ilike[mvars.inn] == 1 ? sdata.locale.likeo : sdata.locale.liken ;
			if (mvars.ilike[mvars.inn] > 0)
				{$(o).html (mvars.ilike[mvars.inn] + ' ' + s);}
			else
				{$(o).html (sdata.locale.ilike);}
		}
	});

	$(".cont_afo").css ('display', 'block');
}

function qizControl ()
{
	switch (sdata.units[nav.current_n].type)
	{
		case 'qiza':
			
			var tot = sdata.units[nav.current_n].length;
			var chs = 0;
			var score = 0;
			
			$("#qiz_choose").find ("input:radio").each (function (i, o) {
			
				if ($(o).get (0).checked)
				{
					chs++;
					score += parseInt ($(o).val ());
				}
			});
			
			//alert (chs + ', ' + score);
			if (chs == tot)
			{
				sdata.units[nav.current_n].score = score;
				
				if ($("#btn_feed").hasClass ('disabled'))
					{$("#btn_feed").removeClass ('disabled');}
				
				//$(".styledRadio").unbind ('click');
			}
		break;
		case 'qizb':

			var tot = sdata.units[nav.current_n].length;
			var chs = 0;
			var score = 0;

			$("#qiz_fill").find ("input:text").each (function (i, o) {

				var n = $(o).val ();
				if (!isNaN (n) && n != '')
				{
					chs++;
					score += parseInt (n);
					sdata.units[nav.current_n].topics[i].uss_hours = n;
				}
			});

			$("table tr:last-child td:nth-child(2)").html (score);

			if (chs == tot)
			{
				sdata.units[nav.current_n].uss_hours = score;

				if ($("#btn_cof").hasClass ('disabled'))
					{$("#btn_cof").removeClass ('disabled');}

				var mtf = lay.tcontent.find ('article').width ();
				lay.tcontent.scrollTop (Math.round (mtf));
			}
		break;
		case 'testa':
			
			var tot = sdata.units[nav.current_n].length;
			var chs = 0;
			var choiced = -1;
			var correct = false;
			
			$("#qes_choose").find ("input:radio").each (function (i, o) {
				
				if ($(o).get (0).checked)
				{
					chs++;
					choiced = i;
					correct = sdata.units[nav.current_n].topics[i].correct == 'true' ? true : false;
				}
			});
			
			//alert (chs + ', ' + score);
			if (chs == tot)
			{
				sdata.units[nav.current_n].choiced = choiced;
				sdata.units[nav.current_n].correct = correct;
				
				if ($("#btn_confirm").hasClass ('disabled'))
					{$("#btn_confirm").removeClass ('disabled');}
			}
		break;
	}
}

function qizCheck (s)
{
	//alert (s);

	setTimeout (qizControl, 250);
}

function qesCheck (s)
{
	//alert (s);

	setTimeout (qizControl, 250);
}

/******************************************/
var javascript_countdown = function () {
	var time_left = 10; //number of seconds for countdown
	var output_element_id = 'javascript_countdown_time';
	var keep_counting = 1;
	var no_time_left_message = 'No time left for JavaScript countdown!';
 
	function countdown() {
		if(time_left < 2) {
			keep_counting = 0;
		}
 
		time_left = time_left - 1;
	}
 
	function add_leading_zero(n) {
		if(n.toString().length < 2) {
			return '0' + n;
		} else {
			return n;
		}
	}
 
	function format_output() {
		var hours, minutes, seconds;
		seconds = time_left % 60;
		minutes = Math.floor(time_left / 60) % 60;
		hours = Math.floor(time_left / 3600);
 
		seconds = add_leading_zero( seconds );
		//minutes = add_leading_zero( minutes );
		minutes = minutes;
		hours = add_leading_zero( hours );
 
		//return hours + ':' + minutes + ':' + seconds;
		return minutes + ':' + seconds;
	}
 
	function show_time_left() {
		document.getElementById(output_element_id).innerHTML = format_output();//time_left;
	}
 
	function no_time_left() {
		//document.getElementById(output_element_id).innerHTML = no_time_left_message;
		document.getElementById(output_element_id).innerHTML = '0:00';
		
		$("#qiz_cont").css ('display', 'none');
		$("#btn_feed").css ('display', 'block');
	}
 
	return {
		count: function () {
			countdown();
			show_time_left();
		},
		timer: function () {
			javascript_countdown.count();
 
			if(keep_counting) {
				setTimeout("javascript_countdown.timer();", 1000);
			} else {
				no_time_left();
			}
		},
		//Kristian Messer requested recalculation of time that is left
		setTimeLeft: function (t) {
			time_left = t;
			if(keep_counting == 0) {
				javascript_countdown.timer();
			}
		},
		init: function (t, element_id) {
			keep_counting = 1;
			time_left = t;
			output_element_id = element_id;
			javascript_countdown.timer();
		}
	};
}();
/****************************************/

function unitCompleted (n)
{
	sdata.units[n].status = 'c';
	
	unitStatusSet ('c', n);
	
	var dum = suspendSet ();
	
	var dum = lessonStatusSet ();
	
	if (lms.initialized)
		{var dum = lms.do_commit ();}
}

function unitLoaded (s)
{
	nav.current_n = nav.loading_n;
	
	mvars.inn = 0;
	
	
	if (scrolpane.panel)
	{
		scrolpane.panel.standby ();
		scrolpane.panel = null;
	}
	
	
	monPMKUpdate ();
	
	
	lay.tcontent.html (s);
	
	lay.tcontent.css ('display', 'block');
	
	lay.tcontent.scrollTop (0);
	
	
	$("#mon_pag").html ((nav.current_n + 1) + '|' + sdata.units.length);
	
	if (sdata.units[nav.current_n].type != 'testa')
	{
		//lay.btn_prev.css ('display', 'block');
		lay.btn_next.css ('display', 'block');
	}
	
	
	switch (sdata.units[nav.current_n].type)
	{
		case 'afo':
			
			$("#afo_pagin").html ('1' + '|' + sdata.units[nav.current_n].topics.length);
			
			if (mvars.ilike.length == 0)
			{
				mvars.ilike = new Array (sdata.units[nav.current_n].topics.length);
				for (var i = 0; i < sdata.units[nav.current_n].topics.length; i++)
					{mvars.ilike[i] = 0;}
			}
			afoILike (0);
			
			
			$("#afo_img").attr ('src', sdata.units[nav.current_n].topics[mvars.inn].img);
			$("#afo_content").html (sdata.units[nav.current_n].topics[mvars.inn].content);
			$("#afo_author").html (sdata.units[nav.current_n].topics[mvars.inn].author);
			
			$("#btn_ilike").bind ('click', function () {

				afoILike (1);
			});
			
			
			$("#btn_previn").bind ('click', function () {
			
				if (!$(this).hasClass ('disabled'))
					{afoGo (-1);}
			});
			$("#btn_nextin").bind ('click', function (event) {
			
				if (!$(this).hasClass ('disabled'))
					{afoGo (1);}
			});
			
			
			mvars.afo_timer = setTimeout (afoClock, 5000);
		break;
		case 'quest-one':
			
			$(".qitem").bind ('click', function () {
				
				fxBlur ($(this));
				
				unitEnable (nav.current_n);
				
				var n = $(this).attr ('data-qvalue');
				//alert (n);
				if (!isNaN (n))
					{sdata.units[nav.current_n].score = parseInt (n);}
				
				if (sdata.units[nav.current_n].onpassed == 'go-next')
					{unitGo (1);}
			});
		break;
		case 'quest-n':
			
			unitEnable (nav.current_n);
			
			if (isNaN (sdata.units[nav.current_n].score))
				{sdata.units[nav.current_n].score = 0;}
			
			
			$(".qitem").bind ('click', function () {
				
				fxBlur ($(this));
				
				if ($(this).hasClass ('selected'))
				{
					$(this).removeClass ('selected');
				}
				else
				{
					$(this).addClass ('selected');
				}
				
				sdata.units[nav.current_n].score = 0;
				$('.qitem').each (function (i, o) {
					
					var n = $(o).attr ('data-qvalue');
					if ($(o).hasClass ('selected'))
					{
						//alert (n);
						if (!isNaN (n))
							{sdata.units[nav.current_n].score = parseInt (n);}
					}
				});
				
				if (sdata.units[nav.current_n].score == 0)
					{$('.qitem').removeClass ('selected');}
				
			});
		break;
		case 'vida':

			$("#btn_feed").bind ('click', function () {

				$("#mon_feed").show (200, function () {

					unitEnable (nav.current_n);
				});
			});
		break;
		case 'vidb':

			$("#btn_feed").bind ('click', function () {

				apacyToggle (true);

				$("#vidb_art").css ('display', 'none');

				$("#mon_feed").css ('display', 'block');
			});

			$("#btn_closein").bind ('click', function () {

				apacyToggle (false);

				$("#mon_feed").css ('display', 'none');

				$("#vidb_art").css ('display', 'block');

				unitEnable (nav.current_n);
			});
		break;
		case 'vidc':

			$("#btn_feed").bind ('click', function () {

				$("#mon_feed").show (200, function () {

					//$("#objin").html (objin);

					unitEnable (nav.current_n);
				});
			});
		break;
		case 'qiza':

			$("#qiz_choose").find ("input:radio").screwDefaultButtons ({
				checked: "url(core/css/mch_or_ck.png)",
				unchecked: "url(core/css/mch_or_un.png)",
				width: 42,
				height: 38
			});

			$("#btn_qiz").bind ('click', function () {

				$("#qiz_cont").show (200);
			});

			$("#btn_feed").bind ('click', function (event) {

				if (!$(this).hasClass ('disabled'))
				{
					$(".styledRadio").unbind ('click');
					
					
					///TEST
					//sdata.units[nav.current_n].score = 40;
					var sc = sdata.units[nav.current_n].score;
					var st = 48 - sc;
					var nt = Math.round ((st*480)/48);
					$("#qiza_balon").css ('left', nt + 'px');
					$("#qiza_balon").find ('span').html (sdata.units[nav.current_n].score);

					for (var i = 0; i < sdata.units[nav.current_n].topics.length; i++)
					{
						var ab = sdata.units[nav.current_n].topics[i].score.split (',');
						var a = parseInt (ab[0]);
						var b = parseInt (ab[1]);
						if (a <= sdata.units[nav.current_n].score && sdata.units[nav.current_n].score <= b)
						{
							$("#qiz_feed").find ('p').html (sdata.units[nav.current_n].topics[i].content);

							break;
						}
					}

					$("#qiz_feed").show (200, function () {

						var mtf = lay.tcontent.find ('article').width ();
						lay.tcontent.scrollTop (Math.round (mtf));

						unitEnable (nav.current_n);
					});
				}
			});
		break;
		case 'qizb':
			
			sdata.units[nav.current_n].man_hours = 0;
			sdata.units[nav.current_n].uss_hours = 0;
			
			$("tr td:nth-child(4)").each (function (i, o) {
			
				$(o).html (sdata.units[nav.current_n].topics[i].hours);
			
				sdata.units[nav.current_n].man_hours += parseInt (sdata.units[nav.current_n].topics[i].hours);
			});
			
			$("table tr:last-child td:nth-child(2)").html (sdata.units[nav.current_n].man_hours);
			
			$("tr td:nth-child(5)").each (function (i, o) {
			
				$(o).find ('.qiz_cof_a').html (sdata.units[nav.current_n].topics[i].percen + '%');
			});
			
			$("#btn_qiz").bind ('click', function () {
			
				$("#qiz_cont").show (200);
			});
			
			$("#btn_feed").bind ('click', function (event) {

				$(this).css ('display', 'none');
				$("#btn_cof").css ('display', 'inline-block');
				
				$("table tr:last-child td:nth-child(2)").html ('<br />');
				
				$("tr td:nth-child(4)").each (function (i, o) {
				
					$o = $('<input type="text" maxlength="2" class="inp_text"></input>');
					$o.attr ('id', 'qiz_fill_' + i);
					$o.bind ('keyup', function (event) {
						
						qizCheck (this);
					});
					
					$(o).html ('').append ($o);
				});
				
				$("tr td:nth-child(5)").find ('.qiz_cof_a').html ('<br />');
			});
			
			$("#btn_cof").bind ('click', function (event) {
				
				if (!$(this).hasClass ('disabled'))
				{
					//$("#btn_cof").css ('display', 'none');
					
					$("tr td:last-child").each (function (i, o) {
						
						if (i < sdata.units[nav.current_n].topics.length)
						{
							var n = Math.round ((sdata.units[nav.current_n].topics[i].uss_hours/sdata.units[nav.current_n].uss_hours)*100);
							$(o).find ('.qiz_cof_a').html (n + '%');
							
							$(o).addClass ('cof')
							$(o).find ('.qiz_cof_b').html ('<p>' + sdata.units[nav.current_n].topics[i].percen + '%' + '</p>');
						}
					});
					
					lay.tcontent.scrollTop (0);
					
					
					unitEnable (nav.current_n);
				}
			});
		break;
		case 'todo':
			
			$("#btn_qiz").bind ('click', function () {
				
				if (!$(this).hasClass ('disabled'))
				{
					$(this).addClass ('disabled');
					$(this).css ('display', 'none');
					
					$("#qiz_cont").show (200, function () {
						
						javascript_countdown.init (180, 'qiz_todo_clock');
					});
				}
			});
			
			$("#btn_sed").bind ('click', function () {
				
				$(this).css ('display', 'none');
				
				javascript_countdown.setTimeLeft (0);
			});
			
			$("#btn_feed").bind ('click', function () {
				
				$(this).css ('display', 'none');
				
				$("#qiz_todo_clock").css ('display', 'none');
				//$("#qiz_feed_p").css ('display', 'block');
				$("#qiz_feed").css ('display', 'block');
				
				$("#qiz_cont").show (200, function () {
					
					unitEnable (nav.current_n);
				});
			});
		break;
		case 'testa':
			
			if (sdata.units[nav.current_n].status == 'c')
			{
				//lay.btn_prev.css ('display', 'block');
				lay.btn_next.css ('display', 'block');
				
				
				$("#qes_choose").find ("input:radio").each (function (i, o) {
					
					if (sdata.units[nav.current_n].choiced == i)
						{$(o).attr ('checked', 'true');}
				});
			}
			else
				{$("#btn_confirm").css ('display', 'block');}
			
			
			$("#qes_choose").find ("input:radio").screwDefaultButtons ({
				checked: "url(core/css/mch_or_ck.png)",
				unchecked: "url(core/css/mch_or_un.png)",
				width: 42,
				height: 38
			});
			
			
			if (sdata.units[nav.current_n].status == 'c')
			{
				$(".styledRadio").unbind ('click');
				
				$(".testa_vfeed").each (function (i, o) {
					
					if (sdata.units[nav.current_n].topics[i].correct != 'true')
						{$(o).addClass ('testa_vfeed_wrong');}
					
					$(o).css ('display', 'block');
				});
				
				
				$("#qes_feed").css ('display', 'block')
			}
			
			
			$("#btn_confirm").bind ('click', function (event) {

				if (!$(this).hasClass ('disabled'))
				{
					$(this).css ('display', 'none');
					
					$(".styledRadio").unbind ('click');
					
					unitEnable (nav.current_n);
					
					unitGo (1);
				}
			});
		break;
		case 'test_end':
			
			var tot = sdata.units.length - 1;
			var crr = 0;
			for (var i = 0; i < sdata.units.length - 1; i++)
			{
				if (sdata.units[i].correct)
					{crr++;}
			}
			$("#test_correct_enum").html (crr + '/' + tot);
			
			$("#btn_review").bind ('click', function (event) {
				
				unitRestart ();
			});
			
			unitEnable (nav.current_n);
			
			var sc = Math.round ((((crr/tot)*100)*100)/100);
			
			var dum = scoreSet (sc);
		break;
		case 'report-qm':
			
			var sc = 0;
			for (var i = 0; i < 3; i++)
			{
				sc += sdata.units[i].score;
			}
			
			$(".qfeed_a").each (function (i, o) {
				
				if ($(o).attr ('data-qvalue') == ('' + sc))
					{$(this).show (600);}
			});
			
			
			var sc = 0;
			for (var i = 3; i < sdata.units.length - 1; i++)
			{
				if (sdata.units[i].score > 0)
					{sc = 1;}
			}
			
			$(".qfeed_b").each (function (i, o) {
				
				if ($(o).attr ('data-qvalue') == ('' + sc))
					{$(this).show (600);}
			});
			
			
			lay.btn_next.css ('display', 'none');
			
			
			unitEnable (nav.current_n);
		break;
		case 'end':
			
			unitEnable (nav.current_n);
		break;
		default:
			
			unitEnable (nav.current_n);
		break;
	}
	
	
	if (nav.current_n > 0)
	{
		if (!$("#btn_prev").hasClass ('active'))
			{$("#btn_prev").addClass ('active');}
	}
	else
	{
		if ($("#btn_prev").hasClass ('active'))
			{$("#btn_prev").removeClass ('active');}
	}
	if (nav.current_n < sdata.units.length - 1)
	{
		if (sdata.units[nav.current_n].status == 'c')
		{
			if (!$("#btn_next").hasClass ('active'))
				{$("#btn_next").addClass ('active');}
		}
		else
		{
			if ($("#btn_next").hasClass ('active'))
				{$("#btn_next").removeClass ('active');}
		}
	}
	else
	{
		if ($("#btn_next").hasClass ('active'))
			{$("#btn_next").removeClass ('active');}
	}
	
	
	unitStatusSet ('i', nav.current_n);
	
	var dum = suspendSet ();
	
	if (lms.initialized)
		{var dum = lms.do_commit ();}
	
	
	if (uagent.name != 'msie')
		{setTimeout ('scrolpane.init (0,0,2000)', 200);}
	
	//document.addEventListener ('DOMContentLoaded', function () {setTimeout ('scrolpane.init (0,0,0)', 200);}, false);
}

function unitLoad (n)
{
	nav.loading_n = n;
	
	
	var fx = {'marginLeft': '-' + (lay.warea.width) + 'px', 'opacity': '0'};
	if (nav.loading_n < nav.current_n)
		{fx = {'marginLeft': (lay.warea.width/2) + 'px', 'opacity': '0'};}
	else if (nav.loading_n == nav.current_n)
		{fx = {'opacity': '0'};}
	
	lay.tcontent.animate (fx, 600, function () {
		
		lay.tcontent.css ('display', 'none');
		lay.tcontent.css ('marginLeft', '-' + Math.round (lay.tcontent.width ()/2) + 'px');
		lay.tcontent.css ('opacity', '1');
		
		$.ajax ({
			url: sdata.units[nav.loading_n].uri,
			async: false,
			dataType: 'html',
			success: unitLoaded,
			error: function (jqXHR, textStatus, errorThrown) {
				alert (textStatus + ', ' + errorThrown + ':\n' + jqXHR.responseText);
				
				//assetLoaded (jqXHR.responseText);
				
				lay.tcontent.css ('display', 'block');
			}
		});
	});
}

function nidGet (n, l)
{
	//alert ('nidGet (' + n + ', ' + l + ')' + ' - nav.map.length_'+ nav.map.length);
	
	cu = sdata.mains;
	for (var i = 0; i < nav.map.length; i++)
	{
		//alert ('i_' + i + ': ' + nav.map[i].current_n);
		
		if (i < l)
			{cu = cu.sections[nav.map[i].current_n];}
		else
		{
			try {
				cu = cu.sections[n];
			}
			catch (e)
				{;}
			
			break;
		}
	}
	//alert (cu.title + ': ' + cu.uri);
	
	return cu;
}

function sectionBack ()
{
	nav.level--;
	nav.map.pop ();
	
	nav.map[nav.level].current_n = -1;
	
	nav.level--;
	
	horiz_on = null;
	
	sectionLoad (nav.map[nav.level].current_n, nav.level);
}

function horizonGo (n)
{
	sectionLoad (horiz_on.current_n + n, nav.level);
}

function horizonCheck ()
{
	if (horiz_on)
	{
		//alert (horiz_on.current_n + ' ì' + horiz_on.sections[0].title);
		
		if (horiz_on.current_n < horiz_on.sections.length - 1)
		{
			if (!lay.btn_next.hasClass ('active'))
				{lay.btn_next.addClass ('active');}
		}
		else
			{lay.btn_next.removeClass ('active');}
		
		if (horiz_on.current_n > 0)
		{
			if (!lay.btn_prev.hasClass ('active'))
				{lay.btn_prev.addClass ('active');}
		}
		else
			{lay.btn_prev.removeClass ('active');}
	}
}

function chipVid (event)
{
	var o = event.target;
	
	$(o).unbind ('click');
	$(o).unbind ('ended');
	$(o).unbind ('pause');
	
	$(o).bind ('ended', function (event) {
		
		var o = event.target;
		
		$(o).bind ('click', chipVid);
	});
	
	$(o).bind ('pause', function (event) {
		
		var o = event.target;
		
		$(o).bind ('click', chipVid);
	});
	
	
	event.target.play ();
}


var chipvid = {
	dir: null,
	vid: null,
	poster: null,
	check: function (s, obj, p) {
		
		chipvid.dir = s;
		chipvid.vid = obj;
		chipvid.poster = p;
		
		fileSystemCheck (s);
	},
	unset: function () {
		
		if (chipvid.dir)
			{fileSystemUndate (chipvid.dir);}
		
		$("#iarticle").empty ();
	},
	set: function () {
		
		if (mobile.os_info.platform == 'android')
		{
			var vn = parseInt (mobile.os_info.version[0]);
			if (vn <= 4)
			{
				$("#iarticle").find ('h2').remove ();
				$("#iarticle").find ('p').remove ();
				
				var w = lay.tbody.width ();
				var h = lay.tbody.height ();
				//alert (w + ', ' + h);
				var s = 'width:100%;max-width:100%;max-height:100%;border:0;display:none;';
				if (h < w)
					{s = 'height:100%;max-height:100%;max-width:100%;border:0;display:none;';}
				
				$("#iarticle").find ('img').attr ('style', s).css ('display', 'block').bind ('click', function (event) {
					
					cordova.require ('cordova/plugin/videoplayer').play ('file://' + chipvid.dir);
				});
			}
			else
			{
				$("#iarticle").empty ();
				
				$("#iarticle").append (chipvid.vid);
			}
		}
		else
		{
			$("#iarticle").empty ();
			
			$("#iarticle").append (chipvid.vid);
		}
		
		lay.btn_reset.css ('display', 'block');
	},
	update: function () {
		//alert (chipvid.dir);
		
		$(".modalCloseImg").css ('display', 'none');
		$("#sb_remove").css ('display', 'none');
		$(".sb_cancel").css ('display', 'none');
		
		$("#simplemodal-container").find ('p').html ('Risorsa in download:');
		
		var uri = chipvid.dir.split ('/');
		fileSystemUpdate (mobile.down_location + uri[uri.length - 1] + '.zip', chipvid.dir + '.zip');
	},
	down: function () {
		
		var w = lay.warea.width*0.84;
		var h = lay.warea.height*0.74;
		
		$("#gui_modal_down").modal ({
			minWidth: (296),
			minHeight: (276),
			maxWidth: (w),
			maxHeight: (h),
			opacity: 56,
			onOpen: function (dialog) {
				dialog.data.css ("overflow", "none");
				
				downl.lay = $("#simplemodal-container").find ("#lay_download");
				downl.bar = $("#simplemodal-container").find ("#mon_download_bar");
				
				downl.lay.css ('display', 'none');
				
				$(".modalCloseImg").css ('display', 'block');
				$("#sb_remove").css ('display', 'block');
				$(".sb_cancel").css ('display', 'block');
				
				$("#sb_remove").unbind ('click');
				$("#sb_remove").bind ('click', function () {
					
					chipvid.update ();
				});
				
				dialog.overlay.show (0, function () {
					//dialog.container.fadeIn ('fast', function () {
					dialog.container.show (0, function () {
						dialog.data.css ("height", "100%");
						dialog.data.fadeIn (600);
					});
				});
			},
			overlayClose: false
		});
	},
	hide: function () {
		
		$.modal.close ();
	}
}


function sectionLoaded (s)
{
	nChipVid = false;
	
	
	mobile.input_status = 0;
	
	nav.iframe = false;
	
	
	var cu = null;
	
	if (!horiz_on)
	{
		nav.level++;
		if (!nav.map[nav.level])
			{nav.map[nav.level] = {current_n: -1, top: 0, left: 0};}
		else
			{nav.map[nav.level].current_n = -1;}
		
		cu = nidGet (nav.loading_n, nav.level - 1);
		if (!cu)
		{
			introLoad (true);
			
			return;
		}
		
		if (cu.type == 'list')
		{
			if (!lay.wrapper.hasClass ('subdir'))
				{lay.wrapper.addClass ('subdir');}
		}
		else
		{
			if (lay.wrapper.hasClass ('subdir'))
				{lay.wrapper.removeClass ('subdir');}
		}
	}
	else
	{
		horiz_on.current_n = nav.loading_n;
	}
	
	
	mvars.inn = 0;
	
	
	if (scrolpane.panel)
	{
		scrolpane.panel.standby ();
		scrolpane.panel = null;
	}
	
	
	//monPMKUpdate ();
	
	//alert (cu.hlink + ': ' + cu.hlinkmode);
	if (cu)
	{
		if (cu.ins)
		{
			cu.hlink = cu.ins;
			cu.hlinkmode = 'in';
		}
		
		if (!cu.hlink)
			{lay.tcontent.html (s);}
		else
		{
			if (cu.hlinkmode && cu.hlinkmode == 'out')
			{
				lay.tcontent.html (s);
				
				
				lay.btn_www.attr ('href', cu.hlink);
				lay.btn_www.attr ('target', '_blank');
				lay.btn_www.attr ('data-href', cu.hlink);
				lay.btn_www.unbind ('click');
				lay.btn_www.bind ('click', function () {
					
					mobile.input_status = 1;
					
					fxBlur ($(this));
					
					if (mobile.os_info.platform == 'android')
					{
						//window.open ($(this).attr ('data-href'), 'WHLINKBLANK', '');
						urlDefaultLoader ($(this).attr ('data-href'));
						
						return false;
					}
				});
				lay.btn_www.css ('display', 'block');
				
			}
			else
			{
				/*
				nav.iframe = true;
				
				
				mobile.onframeout (true);
				
				
				lay.tcontent.html (s);
				*/
				
				/**/
				lay.tcontent.html ('');
				
				nav.iframe = true;
				
				$o = $('<iframe></iframe>');
				$o.css ('margin', '0');
				$o.css ('padding', '0');
				$o.css ('border', '0');
				$o.css ('width', '100%');
				$o.css ('height', '100%');
				lay.tcontent.append ($o);
				$o.attr ('src', cu.hlink);
			}
		}
		
		$(".nav_sub").each (function (i, o) {
			
			$(o).bind ('click', function (event) {
				
				fxBlur ($(this).parent ());
				
				var n = parseInt ($(this).attr ('href')) - 1;
				
				
				sectionLoad (n, nav.level);
				
				return false;
			});
		});
	}
	else
		{lay.tcontent.html (s);}
	
	
	/*
	if (nChipVid)
	{
		if (uagent.name == 'android')
		{
			var ua = navigator.userAgent.toLowerCase ();
			if(ua.indexOf ('android') >= 0)
			{
				var androidversion = parseFloat (ua.slice (ua.indexOf ('android') + 8)); 
				if (androidversion > 2.3)
					{$("video").bind ('click', chipVid);}
			}
		}
	}
	*/
	
	
	if (nav.level > 0)
	{
		lay.btn_home.css ('display', 'block');
		lay.btn_logout.css ('display', 'none');
	}
	else
	{
		lay.btn_home.css ('display', 'none');
		if (nav.access.user.joined)
			{lay.btn_logout.css ('display', 'block');}
	}
	
	if (nav.level > 1)
		{lay.btn_back.css ('display', 'block');}
	else
		{lay.btn_back.css ('display', 'none');}
	
	
	if (horiz_on)
	{
		lay.btn_prev.css ('display', 'block');
		lay.btn_next.css ('display', 'block');
		
		horizonCheck ();
	}
	else
	{
		lay.btn_prev.removeClass ('active');
		lay.btn_next.removeClass ('active');
		
		lay.btn_prev.css ('display', 'none');
		lay.btn_next.css ('display', 'none');
	}
	
	
	if (mobile.os_info.platform == 'android')
	{
		$("#iarticle").find ('a').each (function (i, o) {
			
			$o = $(o);
			if (
				$o.attr ('href').indexOf ('http://') == 0 ||
				$o.attr ('href').indexOf ('https://') == 0 ||
				$o.attr ('href').indexOf ('ftp://') == 0
			)
			{
				$o.unbind ('click');
				$o.bind ('click', function () {
					//window.open ($(this).attr ('data-href'), 'WHLINKBLANK', '');
					urlDefaultLoader ($(this).attr ('href'));
					
					return false;
				});
			}
		});
	}
	
	
	lay.tcontent.css ('display', 'block');
	lay.tcontent.css ('opacity', '1');
	
	//$("#mon_pag").html ((nav.current_n + 1) + '|' + sdata.units.length);
	
	
	var t = 0;
	var l = 0;
	if (!horiz_on)
	{
		t = nav.map[nav.level].top;
		l = nav.map[nav.level].left;
	}
	if (uagent.name != 'msie' && !nav.iframe && !nChipVid)
		{setTimeout ('scrolpane.init (' + t + ',' + l + ',2000)', 200);}
	
	//document.addEventListener ('DOMContentLoaded', function () {setTimeout ('scrolpane.init (0,0,0)', 200);}, false);
}

function sectionLoad (n, l)
{
	//alert ('sectionLoad');
	
	var uc = nidGet (n, l);
	var locked = false;
	if (cu.locked == '1' && !nav.access.user.joined)
	{
		locked = true;
		
		//nav.access.join ({exn: n, exl: l});
		nav.access.pend.exn = n;
		nav.access.pend.exl = l;
		
		var w = lay.warea.width*0.84;
		var h = lay.warea.height*0.86;
		
		$("#gui_modal_login").modal ({
			minWidth: (296),
			//minHeight: (276),
			minHeight: (h),
			maxWidth: (w),
			maxHeight: (h),
			opacity: 56,
			onOpen: function (dialog) {
				dialog.data.css ("overflow", "none");
				
				$("#jo").val ('');
				$("#jp").val ('');
				
				$(".modalCloseImg").css ('display', 'block');
				$("#sb_login").css ('display', 'block');
				$(".sb_cancel").css ('display', 'block');
				
				$("#sb_login").unbind ('click');
				$("#sb_login").bind ('click', function () {
					
					var jo = $("#jo").val ();
					var jp = $("#jp").val ();
					if (jo && jp)
					{
						// apple t3st1ng
						nav.access.user.local.id = jo;
						nav.access.user.local.password = jp;
						
						$.modal.close ();
						
						nav.access.join ({exn: nav.access.pend.exn, exl: nav.access.pend.exl});
					}
				});
				
				if (mobile.os_info.platform == 'android')
				{
					$("#gui_modal_login").find ('a').each (function (i, o) {
						
						$o = $(o);
						if (
							$o.attr ('href').indexOf ('http://') == 0 ||
							$o.attr ('href').indexOf ('https://') == 0 ||
							$o.attr ('href').indexOf ('ftp://') == 0
						)
						{
							$o.unbind ('click');
							$o.bind ('click', function () {
								//window.open ($(this).attr ('data-href'), 'WHLINKBLANK', '');
								urlDefaultLoader ($(this).attr ('href'));
								
								return false;
							});
						}
					});
				}
				
				dialog.overlay.show (0, function () {
					//dialog.container.fadeIn ('fast', function () {
					dialog.container.show (0, function () {
						dialog.data.css ("height", "100%");
						dialog.data.fadeIn (600, function () {
							
							$("#sb_login").focus ();
						});
					});
				});
			},
			overlayClose: false
		});
	}
	
	if (!locked)
	{
		lay.btn_home.css ('display', 'none');
		lay.btn_logout.css ('display', 'none');
		lay.btn_back.css ('display', 'none');
		lay.btn_prev.css ('display', 'none');
		lay.btn_next.css ('display', 'none');
		lay.btn_pdf.css ('display', 'none');
		lay.btn_www.css ('display', 'none');
		lay.btn_cal.css ('display', 'none');
		lay.btn_reset.css ('display', 'none');
		
		
		if (!horiz_on)
		{
			nav.map[nav.level].current_n = n;
			try {
				nav.map[nav.level].top = scrolpane.panel.y;
				nav.map[nav.level].left = scrolpane.panel.x;
			}
			catch (e)
			{
				nav.map[nav.level].top = 0;
				nav.map[nav.level].left = 0;
			}
		}
		
		
		nav.loading_n = n;
		nav.loading_l = l;
		
		
		fx = {'opacity': '0'};
		
		lay.tcontent.animate (fx, 600, function () {
			
			lay.tcontent.css ('display', 'none');
			lay.tcontent.css ('marginLeft', '-' + Math.round (lay.tcontent.width ()/2) + 'px');
			//lay.tcontent.css ('opacity', '1');
			
			
			var cu = nidGet (n, l);
			try {
				var uri = cu.uri;
			}
			catch (e)
			{
				introLoad (true);
				
				return;
			}
			
			if (cu.view == 'horizontal')
			{
				if (!horiz_on)
				{
					horiz_on = {sections: cu.sections, current_n: 0};
					uri = cu.sections[0].uri;
					nav.loading_n = 0;
					//alert (uri);
					
					
					nav.map[nav.level].current_n = n;
					nav.level++;
					if (!nav.map[nav.level])
						{nav.map[nav.level] = {current_n: -1, top: 0, left: 0};}
					else
						{nav.map[nav.level].current_n = -1;}
				}
				else
				{
					uri = horiz_on.sections[n].uri;
				}
			}
			else
			{
				if (horiz_on)
				{
					uri = horiz_on.sections[n].uri;
				}
			}
			
			$.ajax ({
				url: uri,
				async: false,
				dataType: 'html',
				success: sectionLoaded,
				error: function (jqXHR, textStatus, errorThrown) {
					alert (textStatus + ', ' + errorThrown + ':\n' + jqXHR.responseText);
					
					//assetLoaded (jqXHR.responseText);
					
					nav.map[nav.level].current_n = -1;
					
					lay.tcontent.css ('display', 'block');
					lay.tcontent.css ('opacity', '1');
				}
			});
		});
	}
}

function unitStatusSet (s, n)
{
	var xs = 0;
	for (var i = 0; i < nav_index.statuss.length; i++)
	{
		if (nav_index.plain.units[n].status == nav_index.statuss[i])
		{
			xs = i;
			break;
		}
	}
	var ns = 0;
	for (var i = 0; i < nav_index.statuss.length; i++)
	{
		if (s == nav_index.statuss[i])
		{
			ns = i;
			break;
		}
	}
	
	//alert (n + ', ' + s + ': ' + xs + ' < ' + ns);
	if (xs < ns)
	{
		nav_index.plain.units[n].status = s;
		sdata.units[n].status = s;
		nav_index.plain.units[n].progress = n;
		
		$ob = $('#ustatus_' + (n + 1));
		for (var i = 0; i < nav_index.statuss.length; i++)
		{
			if ($ob.hasClass ('status_' + nav_index.statuss[i]))
			{
				$ob.removeClass ('status_' + nav_index.statuss[i]);
				
				break;
			}
		}
		$ob.addClass ('status_' + nav_index.plain.units[n].status);
	}
}

function appClose ()
{
	try {
		lms.opened.close ();
	}
	catch (e)
		{;}
	lms.opened = null;

	if (lms.initialized)
	{
		var dum = lms.do_finish ();
		if (dum)
		{
			lms.initialized = false;
		}
	}
}

function fxBlur (obj)
{
	obj.css ('opacity', '0.1');
	obj.animate ({opacity: '1'}, 400);
}

function guiUpdateFx (s, n)
{
	if (n < gui_lay[s].length)
	{
		if (s == 'index' && n == gui_lay[s].length - 1)
		{
			$("#" + gui_lay[s][n]).show (100, appResIndexs);

			//powerManager ('acquire');
		}
		else if (s == 'start' && n == gui_lay[s].length - 1)
		{
			$("#" + gui_lay[s][n]).show (100);

			//powerManager ('release');
		}
		else
		{
			$("#" + gui_lay[s][n]).show (100, function () {
				n += 1;
				guiUpdateFx (s, n);
			});
		}
	}
}

function guiUpdate (s)
{
	gui_update_continue = [];

	$(".btn_unload").each (function (i, o) {
		$(o).css ('display', 'none');
	});
	$(".btn_start").each (function (i, o) {
		$(o).css ('display', 'none');
	});

	for (var i in gui_lay)
	{
		if (i != s)
		{
			for (var j = 0; j < gui_lay[i].length; j++)
			{
				//alert (gui_lay[i][j]);
				//$("#" + gui_lay[i][j]).hide (0);
				$("#" + gui_lay[i][j]).css ('display', 'none');
			}
		}
	}

	guiUpdateFx (s, 0);
}

function appResIndexs ()
{
	//alert ('62');

	if (filesystem_needs.length > 0)
	{
		/**/
		for (var i = 0; i < filesystem_needs.length; i++)
		{
			if (filesystem_needs[i][1])
			{
				$("#unit_" + filesystem_needs[i][0]).show (0);
				$("#uniu_" + filesystem_needs[i][0]).show (0);
				$("#unid_" + filesystem_needs[i][0]).hide (0);
			}
			else
			{
				$("#unit_" + filesystem_needs[i][0]).hide (0);
				$("#uniu_" + filesystem_needs[i][0]).hide (0);
				$("#unid_" + filesystem_needs[i][0]).show (0);
			}
		}
	}
	else
	{
		$(".btn_start").show (0);
	}
}


function downloadDeflate ()
{
	downl.bar.html ('INSTALLAZIONE');
}

function downloadContinue ()
{
	fileSystemUpdate (sdata.units[downl.file].id + '.zip');
}

function appDownload (n)
{
	downl.bar.html ('');

	downl.file = n;

	showAlert ('L\'operazione potrebbe richiedere diversi minuti.\nIl tempo può variare in base alla velocità della connessione.', downloadContinue, 'Download unità', 'Continua');
}

function onAppUnload (btn)
{
	if (btn == 1)
		{fileSystemUndate (app_unload[0], app_unload[1]);}
	else
		{app_unload = [];}
}
function appUnload (n)
{
	app_unload = [sdata.units[n].id, n];
	showConfirm ('Sicuri di voler rimuove l\'unità ?', onAppUnload, 'Conferma rimozione', 'Ok,Annulla');
}

function appStart (n)
{
	/*
	try {
		wapp.close ();
	}
	catch (e)
		{;}
	wapp = null;
	*/

	nav_index.current_n = n;
	unitStatusSet ('i', n);


	ssuper.resPathUri = sdcard_uri + sdata.units[nav_index.current_n].id + '/';


	//wapp = window.open ('main.html', 'WAPP', 'resizable=yes,scrollbars=no');
	initialize ();


	//$(".btn_start").hide (0);
}

function startUnload ()
{
	$("#btn_back").hide (0);

	$o = $("#lay_start_content");
	$o.hide (200, function () {
		$("#lay_start_index").show (0);
	});
}

function startLoaded (s)
{
	$("#lay_start_index").css ('display', 'none');

	$("#btn_back").show (100);

	$o = $("#lay_start_content");
	$o.html (s);
	$o.show (200, function () {

		if (os_info.platform == 'android')
		{
			var vn = parseInt (os_info.version[0]);

			if (vn < 4)
			{
				var scontent = new iScroll ('lay_start_content', {hScrollbar: false});
			}
		}

	});
}

function introLoad (rl)
{
	lay.wrapper.css ('opacity', '0');
	
	
	mobile.input_status = 0;
	
	nav.iframe = false;
	
	horiz_on = null;
	
	
	nav.current_n = -1;
	nav.loading_n = -1;
	
	
	nav.level = 0;
	var ar = nav.map[nav.level]
	nav.map = [];
	nav.map[0] = {current_n: -1, top: 0, left: 0};
	
	
	if (lay.wrapper.hasClass ('subdir'))
		{lay.wrapper.removeClass ('subdir');}
	
	
	if (scrolpane.panel)
	{
		scrolpane.panel.standby ();
		scrolpane.panel = null;
	}
	
	
	if (lay.head.hasClass ('lay_head_expan'))
		{lay.head.removeClass ('lay_head_expan');}
	
	lay.btn_index.css ('display', 'none');
	lay.hed_extra.css ('display', 'none');
	
	lay.btn_home.css ('display', 'none');
	if (nav.access.user.joined)
		{lay.btn_logout.css ('display', 'block');}
	lay.btn_back.css ('display', 'none');
	
	lay.btn_prev.css ('display', 'none');
	lay.btn_next.css ('display', 'none');
	if (lay.btn_prev.hasClass ('active'))
		{lay.btn_prev.removeClass ('active')}
	if (lay.btn_next.hasClass ('active'))
		{lay.btn_next.removeClass ('active')}
	
	lay.btn_pdf.css ('display', 'none');
	lay.btn_www.css ('display', 'none');
	lay.btn_cal.css ('display', 'none');
	lay.btn_reset.css ('display', 'none');
	
	
	//lay.tcontent.css ('display', 'none');
	lay.tcontent.css ('marginLeft', '-' + Math.round (lay.tcontent.width ()/2) + 'px');
	lay.tcontent.css ('opacity', '1');
	
	
	var uri = nav_index.data + '_intro.html';
	$sdata = $.ajax ({
		url: uri,
		async: false,
		dataType: 'html',
		success: function (data) {
			
			lay.wrapper.css ('opacity', '1');
			
			
			lay.tcontent.html (data);
			
			
			lay.tcontent.css ('display', 'block');
			
			
			if (rl)
			{
				layAdjust (false);
			}
			
			
			var t = nav.map[nav.level].top;
			var l = nav.map[nav.level].left;
			if (uagent.name != 'msie')
				{setTimeout ('scrolpane.init (' + t + ',' + l + ',2000)', 200);}
			
			$("#btn_start").bind ('click', function (event) {
				
				unitLoad (0);
				
				return false;
			});
			
			
			$(".nav_hin").each (function (i, o) {
				
				$(o).bind ('click', function (event) {
					
					//fxBlur ($(this).parent ());
					$(this).parent ().css ('display', 'none');
					
					var n = parseInt ($(this).attr ('href')) - 1;
					
					if (!lay.head.hasClass ('lay_head_expan'))
						{lay.head.addClass ('lay_head_expan');}
					
					
					lay.btn_index.find ('div').removeAttr ('class').addClass ('btn_index_' + sdata.mains.sections[n]['class']).html (sdata.mains.sections[n].title);
					
					lay.btn_index.css ('display', 'block');
					
					if (sdata.mains.sections[n]['extra'] == 'true')
					{
						lay.hed_extra.removeAttr ('class').addClass (sdata.mains.sections[n]['class']);
						
						lay.hed_extra.css ('display', 'block');
					}
					
					
					lay.btn_home.css ('display', 'block');
					lay.btn_logout.css ('display', 'none');
					
					layAdjust (false);
					
					sectionLoad (n, 0);
					
					return false;
				});
			});
			
			if (!discla_view)
			{
				discla_view = true;
				
				var w = lay.warea.width*0.80;
				var h = lay.warea.height*0.86;
				
				$.ajax ({
					url: 'disclaimer.html',
					//cache: false,
					dataType: 'html',
					success: function (data) {
						overlayShow ('disclaimer', {width: w, height: h}, data);
					},
					error: function (jqXHR, textStatus, errorThrown) {
						alert (textStatus + ', ' + errorThrown + ':\n' + jqXHR.responseText);
					}
				});
			}
		},
		error: function (jqXHR, textStatus, errorThrown) {
			alert (textStatus + ', ' + errorThrown + ':\n' + jqXHR.responseText);
		}
	});
}

function initialize_splash ()
{
	lay.warea = {width: 0, height: 0};

	lay.container = $("#lay_container");
	lay.head = $("#lay_head");
	lay.tbody = $("#lay_tbody");
	lay.tcontent = $("#lay_tcontent");
	lay.foot = $("#lay_foot");
	
	lay.mon_pmk = $("#mon_pmk");
	
	lay.btn_prev = $("#btn_prev");
	lay.btn_next = $("#btn_next");
	
	$(window).resize (function () {
		//layAdjust (true);
	});
	
	
	layAdjust (false);
	
	
	var uri = nav_index.data + '.json';
	$sdata = $.ajax ({
		url: uri,
		async: false,
		dataType: 'json',
		success: sDataSet,
		error: function (jqXHR, textStatus, errorThrown) {
			alert (textStatus + ', ' + errorThrown + ':\n' + jqXHR.responseText);
			
			/*
			try {
				sDataSet (JSON.parse (jqXHR.responseText));
			}
			catch (e)
			{
				//alert (e);
				sDataSet (JSON.parse ('{"void" : "1"}'));
			}
			*/
		}
	});
	if (sdata)
	{
		
		introLoad (false);
	}
}

function initialize_index ()
{
	//alert ('initialize_index');
	
	
	nav.access = access;
	
	
	document.addEventListener ('deviceready', function () {inc_requireds.loaded += 1;}, false);
	
	inc_requireds.timer = setInterval (checkRequireds, 100);
	
	
	if (foot_no)
	{
		$("#btn_home").detach ().addClass ('hed_inside').prependTo ("#lay_head");
		$("#btn_logout").detach ().addClass ('hed_inside').prependTo ("#lay_head");
		$("#btn_prev").detach ().addClass ('hed_inside').appendTo ("#lay_head");
		$("#btn_next").detach ().addClass ('hed_inside').appendTo ("#lay_head");
		$("#btn_pdf").detach ().addClass ('hed_inside').appendTo ("#lay_head");
		$("#btn_www").detach ().addClass ('hed_inside').appendTo ("#lay_head");
		$("#btn_cal").detach ().addClass ('hed_inside').appendTo ("#lay_head");
	}
	
	
	scrolpane.init = function (y, x, fr) {
		//scrolpane.panel = new iScroll ('lay_tcontent', {scrollbarClass: 'iscroll-'});
		//alert (scrolpane.init);
		scrolpane.panel = new iScroll ('lay_tcontent', {
			/*onBeforeScrollStart: function (e) {
				
				var target = e.target;
				
				while (target.nodeType != 1)
					{target = target.parentNode};
				
				if (target.tagName != 'SELECT' && target.tagName != 'INPUT' && target.tagName != 'TEXTAREA' && target.tagName != 'P')
					{e.preventDefault();}
			},*/
			//useTransform: false,
			x: x,
			y: y,
			backgroundClass: 'iscroll-ap-'
		});
		//scrolpane.panel = new iScroll ('lay_tcontent');
		scrolpane.api = {
			reinitialise : function () {
				//alert ('scrolpane.api.reinitialise');
				if (scrolpane.panel)
					{scrolpane.panel.refresh ();}
			}
		} 
		
		if (fr > 0)
			{setTimeout ('scrolpane.api.reinitialise ()', fr);}
		/*
		scrolpane.panel = $('#lay_tcontent').jScrollPane ({autoReinitialise: false, autoReinitialiseDelay: 750});
		scrolpane.api = scrolpane.panel.data ('jsp');
		*/
		
	};
	
	
	nav.map = [];
	nav.map[0] = {current_n: -1, top: 0, left: 0};
	
	
	if (lms.opener)
	{
		var w = 1024;
		var h = 768;
		
		window.resizeTo (w, h);
		
		var xx = (screen.availWidth - w)/2;
		var yy = (screen.availHeight - h)/2;
		
		window.moveTo (xx,yy);
	}
	
	
	lay.warea = {width: 0, height: 0};
	
	lay.wrapper = $("#lay_wrapper");
	lay.container = $("#lay_container");
	lay.head = $("#lay_head");
	lay.btn_index = $("#btn_index");
	lay.hed_extra = $("#hed_extra");
	lay.tbody = $("#lay_tbody");
	lay.tcontent = $("#lay_tcontent");
	lay.foot = $("#lay_foot");
	
	lay.mon_pmk = $("#mon_pmk");
	
	lay.mon_pmk.wipetouch({
		tapToClick: false,
		wipeLeft: function (result) {
			
			lay.mon_pmk.animate ({marginLeft: '-250px'}, 250, function () {
				//lay.mon_pmk.css ('marginLeft', '-200px');
				lay.mon_pmk.animate ({marginLeft: '-200px'}, 100);
			});
			
			if (lay.btn_next.hasClass ('active'))
			{
				if (nav.current_n < sdata.units.length - 1)
					{unitGo (1);}
			}
		},
		wipeRight: function (result) {
			
			lay.mon_pmk.animate ({marginLeft: '-150px'}, 250, function () {
				//lay.mon_pmk.css ('marginLeft', '-200px');
				lay.mon_pmk.animate ({marginLeft: '-200px'}, 100);
			});
			
			if (lay.btn_prev.hasClass ('active'))
			{
				if (nav.current_n > 0)
					{unitGo (-1);}
			}
		}
	});
	
	lay.btn_back = $("#btn_back");
	lay.btn_home = $("#btn_home");
	lay.btn_logout = $("#btn_logout");
	lay.btn_pdf = $("#btn_pdf");
	lay.btn_www = $("#btn_www");
	lay.btn_cal = $("#btn_cal");
	lay.btn_reset = $("#btn_reset");
	
	lay.btn_prev = $("#btn_prev");
	lay.btn_next = $("#btn_next");
	
	$(window).resize (function () {
		layAdjust (true);
	});
	
	lms.time = {
		startime : new Date ().getTime (),
		elapsed : function () {
			var r = "0000:00:00";
			
			var i = new Date ().getTime ();
			
			var ms = i - lms.time.startime;
			
			var now = new Date();
			now.setTime (ms);
			
			var ss = Math.floor (ms/1000);
			e_ss = ss%1000;
			var ts = Math.floor (ss/60);
			e_ts = ss%60;
			var tm = Math.floor (ts/60);
			e_tm = ts%60;
			var th = Math.floor (tm/60);
			
			if (e_ss > 0)
				{ss = e_ss;}
			if (e_ts > 0)
				{ts = e_ts;}
			if (e_tm > 0)
				{tm = e_tm;}
			//alert (th + ':' + tm + ':' + ts);
			
			if (th >= 10000)
			{
				r = "9999:59:59";
			}
			else
			{
				r = "";
				
				r += strlead ("" + th, "0", 4);
				r += ":";
				r += strlead ("" + tm, "0", 2);
				r += ":";
				r += strlead ("" + ts, "0", 2);
			}
			
			return r;
		}
	};
	lms.bookmark = [];
	lms.bookmark_on = false;
	lms.suspend = {};
	lms.initialized = false;
	lms.status = 'incomplete';
	lms.finished = false;
	lms.last = {
		command : '',
		name : '',
		value : '',
		error_n : '0',
		error_s : '',
		set : function (a, b, c, d, e) {
				lms.last.command = a;
				lms.last.name = b;
				lms.last.value = c;
				lms.last.error_n = d;
				lms.last.error_s = e;
		}
	};
	lms.error_show = function ()
	{
		alert ('LMS#ERROR: ' + lms.last.error_n + '\n' + lms.last.error_s);
	};
	lms.tstatus_fromlms = function (s)
	{
		var sl = 4;
		if (s.length%sl == 0 && lms.suspend_mod)
		{
			var cc = 0;
			
			//alert (s);
			for (var i = 0; i < sdata.units.length; i++)
			{
				var cs = s.substr (cc, 4);
				var ci = cs.charAt (0);
				//alert ('ci = ' + ci);
				if (!nav_index.statusn[ci])
					{ci = nav_index.statuss[0];}
				//alert ('ci = ' + ci);
				sdata.units[i].status = ci;
				if (!isNaN (cs.substr (1)))
					{sdata.units[i].score = parseInt (trim (cs.substr (1)));}
				
				unitStatusSet (ci, i);
				
				cc+=4;
			}
		}
	};
	lms.tstatus_tolms = function ()
	{
		var s = '';

		for (var i = 0; i < sdata.units.length; i++)
		{
			s += sdata.units[i].status;
			
			if (!isNaN (sdata.units[i].score))
			{
				s += strlead ('' + sdata.units[i].score, ' ', 3);
			}
			else
				{s += '###';}
		}
		
		//alert (s);
		return s;
	};
	lms.do_initialize = function () {
		var ret = false;
		
		lms.last.set ('initialize', '', '', '0', '');
		
		var dum = doLMSInitialize ('');
		lms.last.error_n = doLMSGetLastError ();
		
		if (lms.last.error_n == '0')
		{
			lms.initialized = true;
			
			lms.status = lms.do_get ('cmi.core.lesson_status');
			
			var dum = lms.do_set ('cmi.core.exit', 'suspend');
			
			ret = true;
		}
		else
		{
			lms.last.error_s = doLMSGetErrorString (lms.last.error_n);

			lms.error_show ();
		}

		return ret;
	};
	lms.do_get = function (sn) {
		var dum = lms.do_set ('cmi.core.session_time', lms.time.elapsed ());
		
		var ret = '';
		
		lms.last.set ('get', sn, '', '0', '');
		
		var ret = doLMSGetValue (sn);
		lms.last.error_n = doLMSGetLastError ();
		
		if (lms.last.error_n == '0')
		{
			;
		}
		else
		{
			lms.last.error_s = doLMSGetErrorString (lms.last.error_n);
			
			lms.error_show ();
		}
		
		return ret;
	};
	lms.do_set = function (sn, sv) {
		
		var ret = false;
		
		lms.last.set ('set', sn, sv, '0', '');
		
		var dum = doLMSSetValue (sn, sv);
		lms.last.error_n = doLMSGetLastError ();
		
		if (lms.last.error_n == '0')
		{
			//var dum = lms.do_commit ();
			
			ret = true;
		}
		else
		{
			lms.last.error_s = doLMSGetErrorString (lms.last.error_n);
			
			lms.error_show ();
		}
		
		return ret;
	};
	lms.do_commit = function () {
		
		var dum = lms.do_set ('cmi.core.session_time', lms.time.elapsed ());
		
		
		var ret = false;
		
		lms.last.set ('commit', '', '', '0', '');
		
		var dum = doLMSCommit ('')
		lms.last.error_n = doLMSGetLastError ();
		
		if (lms.last.error_n == '0')
		{
			ret = true;
		}
		else
		{
			lms.last.error_s = doLMSGetErrorString (lms.last.error_n);
			
			lms.error_show ();
		}
		
		return ret;
	};
	lms.do_finish = function () {
		var dum = lms.do_set ('cmi.core.session_time', lms.time.elapsed ());
		
		var dum = lessonStatusSet ();
		
		var ret = false;
		
		lms.last.set ('finish', '', '', '0', '');
		
		var dum = doLMSFinish ('');
		lms.last.error_n = doLMSGetLastError ();
		
		if (lms.last.error_n == '0')
		{
			lms.initialized = false;
			
			ret = true;
		}
		else
		{
			lms.last.error_s = doLMSGetErrorString (lms.last.error_n);
			
			lms.error_show ();
		}
		
		return ret;
	};
	lms.parse_from = function (f, sn, sv) {
		var ret = '';

		switch (f)
		{
			case 'gt':
				
				switch (sn)
				{
					case 'lesson_location':
					
					
					
					break;
				}
				
			break;
			case 'lms':
				
				switch (sn)
				{
					case 'lesson_location':
					
					
					
					break;
				}
				
			break;
		}
		
	};
	
	
	if (lms.version == 'lmstracked')
	{
		var dum = lms.do_initialize ();
	}
	
	
	lay.btn_back.bind ('click', function (event) {
		
		fxBlur ($(this));
		
		$(this).css ('display', 'none');
		
		lay.btn_prev.css ('display', 'none');
		lay.btn_next.css ('display', 'none');
		
		horiz_on = null;
		
		
		sectionBack ();
	});
	lay.btn_home.bind ('click', function (event) {
		
		fxBlur ($(this));
		
		$(this).css ('display', 'none');
		
		lay.btn_prev.css ('display', 'none');
		lay.btn_next.css ('display', 'none');
		
		horiz_on = null;
		
		
		introLoad (true);
	});
	lay.btn_logout.bind ('click', function (event) {
		
		if (nav.access.user.joined)
			{nav.access.unjoin ();}
		
		lay.btn_logout.css ('display', 'none');
	});
	lay.btn_pdf.bind ('click', function (event) {
		
		fxBlur ($(this));
	});
	lay.btn_www.bind ('click', function (event) {
		
		fxBlur ($(this));
	});
	lay.btn_cal.bind ('click', function (event) {
		
		fxBlur ($(this));
	});
	lay.btn_reset.bind ('click', function (event) {
		
		//fxBlur ($(this));
		
		
		var w = lay.warea.width*0.84;
		var h = lay.warea.height*0.74;
		
		$("#gui_modal_reset").modal ({
			minWidth: (296),
			minHeight: (276),
			maxWidth: (w),
			maxHeight: (h),
			opacity: 56,
			onOpen: function (dialog) {
				dialog.data.css ("overflow", "none");
				
				$(".modalCloseImg").css ('display', 'block');
				$("#sb_reset").css ('display', 'block');
				$(".sb_cancel").css ('display', 'block');
				
				$("#sb_reset").unbind ('click');
				$("#sb_reset").bind ('click', function () {
					
					chipvid.unset ();
				});
				
				dialog.overlay.show (0, function () {
					//dialog.container.fadeIn ('fast', function () {
					dialog.container.show (0, function () {
						dialog.data.css ("height", "100%");
						dialog.data.fadeIn (600);
					});
				});
			},
			overlayClose: false
		});
	});
	
	
	lay.btn_prev.bind ('click', function (event) {
		
		if ($(this).hasClass ('active'))
		{
			horizonGo (-1);
		}
	});
	lay.btn_next.bind ('click', function (event) {
		
		if ($(this).hasClass ('active'))
		{
			horizonGo (1);
		}
	});
	
	
	layAdjust (false);
	
	
	var uri = nav_index.data + '.json';
	$sdata = $.ajax ({
		url: uri,
		async: false,
		dataType: 'json',
		success: sDataSet,
		error: function (jqXHR, textStatus, errorThrown) {
			alert (textStatus + ', ' + errorThrown + ':\n' + jqXHR.responseText);

			/*
			try {
				sDataSet (JSON.parse (jqXHR.responseText));
			}
			catch (e)
			{
				//alert (e);
				sDataSet (JSON.parse ('{"void" : "1"}'));
			}
			*/
		}
	});
	if (sdata)
	{
		nav_index.total_n = nav_index.plain.units.length;
		
		if (lms.version == 'lmstracked')
		{
			var dum = lms.do_get ('cmi.core.lesson_location');
			if (dum)
			{
				lms.bookmark = dum.split ('_');
			}
			
			var llocations = [0, -1];
			var llocation = lms.do_get ('cmi.core.lesson_location');
			if (llocation)
				{llocations = llocation.split (',');}
			if (llocations.length < 2)
				{llocations = [0, -1];}
			
			var suspend = lms.do_get ('cmi.suspend_data');
			if (suspend.indexOf ('=') < 0)
				{suspend = '';}
			if (suspend)
			{
				var ar = suspend.split ('&');
				for (var i = 0; i < ar.length; i++)
				{
					var a = ar[i].split ('=');
					lms.suspend[a[0]] = a[1];
					
					switch (a[0])
					{
						case 'st':
							lms.tstatus_fromlms (a[1]);
						break;
					}
				}
				
				var dum = lessonStatusSet ();
			}
			else
			{
				var dum = suspendSet ();
			}
			
			if (lms.bookmark.length == 3 && 1 == 2)
			{
				for (var i = 0; i < lms.bookmark.length; i++)
					{lms.bookmark[i] = parseInt (lms.bookmark[i]);}
				
				$o = $('<div></div>');
				
				$p = $('<p></p>');
				$p.html ('Tornare all\'ultima attività visitata ?');
				
				$o.append ($p);
				
				$o.append ('<p><br /></p>');
				
				$b = $('<a></a>');
				$b.attr ('href', '#');
				$b.addClass ('btn_text_small');
				$b.addClass ('btn_yes');
				$b.addClass ('simplemodal-close');
				$b.attr ('onclick', 'return bookmarkGo()');
				$b.html ('OK');
				
				$o.append ($b);
				
				$b = $('<a></a>');
				$b.attr ('href', '#');
				$b.addClass ('btn_text_small');
				$b.addClass ('btn_no');
				$b.addClass ('simplemodal-close');
				$b.html ('ANNULLA');
				
				$o.append ($b);
				
				$o.append ('<div class="float_clear"></div>');
				
				var s = $o.html ();
				
				overlayShow ('confirm', {width: 400, height: 100}, s);
			}
			else
				{lms.bookmark = [];}
		}
		
		
		inc_requireds.loaded += 1;
		
		
		if (lms.opener)
			{unitLoad (0);}
		else
			{introLoad (false);}
	}
	
	/*
	onerror = function (event) {
		
		alert ('ERROR');
		
		introLoad (true);
	};
	*/
}

function dDataUpdate (n, jo)
{
	sdata.units[nav_index.current_n].topics[n] = jo;
}

function sDataSet (_json)
{
	if (_json.data)
	{
		sdata = _json.data;

		var cc = 0;

		for (var i = 0; i < sdata.units.length; i++)
		{
			nav_index.plain.units[i] = {id: sdata.units[i].id, status: sdata.units[i].status};
		}
	}
}

function overlayShow (last, size, s)
{
	$("#lay_modal_simple").modal ({
		minWidth: (size.width),
		minHeight: (size.height),
		closeHTML: $("#modalCloseImg").html (),
		onOpen: function (dialog) {
			
			$(".modalCloseImg").css ('display', 'block');
			
			dialog.data.css ('overflow', 'none');
			dialog.overlay.show (0, function () {
				dialog.container.show (0, function () {
					dialog.data.css ('height', '100%');
					dialog.data.html (s);
					dialog.data.find ('body').css ('height', '100%');

					dialog.data.show (0);
				});
			});
		},
		onClose: function () {
			$.modal.close ();
		},
		overlayClose: true
	});
}

function strlead (s, c, n)
{
	var r = s;

	while (r.length < n)
		{r = c + r}

	return r;
}

function trim (str)
{
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}



// html5shiv MIT @rem remysharp.com/html5-enabling-script
// iepp v1.6.2 MIT @jon_neal iecss.com/print-protector
/*@cc_on(function(a,b){function r(a){var b=-1;while(++b<f)a.createElement(e[b])}if(!(!window.attachEvent||!b.createStyleSheet||!function(){var a=document.createElement("div");a.innerHTML="<elem></elem>";return a.childNodes.length!==1}())){a.iepp=a.iepp||{};var c=a.iepp,d=c.html5elements||"abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",e=d.split("|"),f=e.length,g=new RegExp("(^|\\s)("+d+")","gi"),h=new RegExp("<(/*)("+d+")","gi"),i=/^\s*[\{\}]\s*$/,j=new RegExp("(^|[^\\n]*?\\s)("+d+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),k=b.createDocumentFragment(),l=b.documentElement,m=l.firstChild,n=b.createElement("body"),o=b.createElement("style"),p=/print|all/,q;c.getCSS=function(a,b){if(a+""===undefined)return"";var d=-1,e=a.length,f,g=[];while(++d<e){f=a[d];if(f.disabled)continue;b=f.media||b,p.test(b)&&g.push(c.getCSS(f.imports,b),f.cssText),b="all"}return g.join("")},c.parseCSS=function(a){var b=[],c;while((c=j.exec(a))!=null)b.push(((i.exec(c[1])?"\n":c[1])+c[2]+c[3]).replace(g,"$1.iepp_$2")+c[4]);return b.join("\n")},c.writeHTML=function(){var a=-1;q=q||b.body;while(++a<f){var c=b.getElementsByTagName(e[a]),d=c.length,g=-1;while(++g<d)c[g].className.indexOf("iepp_")<0&&(c[g].className+=" iepp_"+e[a])}k.appendChild(q),l.appendChild(n),n.className=q.className,n.id=q.id,n.innerHTML=q.innerHTML.replace(h,"<$1font")},c._beforePrint=function(){o.styleSheet.cssText=c.parseCSS(c.getCSS(b.styleSheets,"all")),c.writeHTML()},c.restoreHTML=function(){n.innerHTML="",l.removeChild(n),l.appendChild(q)},c._afterPrint=function(){c.restoreHTML(),o.styleSheet.cssText=""},r(b),r(k);if(c.disablePP)return;m.insertBefore(o,m.firstChild),o.media="print",o.className="iepp-printshim",a.attachEvent("onbeforeprint",c._beforePrint),a.attachEvent("onafterprint",c._afterPrint)}})(this,document)@*/
