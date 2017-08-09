








/* PICTURE GALLERY */
$(document).ready(function() {
    $('#modalpicture').on("click", function() {
        $('#modalpicture').hide();

    });

    $("#gallery").on("vclick", "a", function(event) {
        //Load correspondant picture in modal view
        event.preventDefault();
        event.stopPropagation();      
        var modal = $('#modalpicture');
        modal.empty();
        modal.append($(this).html() + "<br/>" + $(this).children("img").attr("alt"));
        modal.fadeIn();

    });

});

//Init : loading pictures
$(document).ready(function() {
    function onFail(error) {
        console.log("failed with error code: " + error.code);
    }
    ;

    var gotFileSystem = function(fileSystem) {
        function successDIR(folder) {
            console.log("accessing to " + folder.fullPath);
            listgalleryfolder(folder);
        }
        function failDIR(error) {
            console.log("failed accessing folder with error code: " + error.code);
            listgalleryfolder(fileSystem.root);
        }
        fileSystem.root.getDirectory("BeerPassport", {create: true, exclusive: false}, successDIR, failDIR);
    };

    try {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, onFail);
    } catch (e) {
        console.log(e);
    }

    function listgalleryfolder(folder) {
        var directoryReader = folder.createReader();
        directoryReader.readEntries(function(entries) {
            var i;
            var $gallery = $("#gallery");
            for (i = 0; i < entries.length; i++) {
                var picname = entries[i].name;
                console.log(picname);
                if (picname.substr(picname.length - 4) == ".jpg") {
                    $gallery.append('<a href="#modalpicture"><img src="' + folder.fullPath + "/" + picname + '" alt="' + picname.substr(0, picname.length - 4) + '"/></a>');
                }
            }
        }, onFail);
    }
});

/* GLOBAL */
$(document).ready(function() {
    window.$select =
            {
                picture: $('#picture'),
                beercontainer: $('#beer-container'),
                pagebeers: $('#page-beers')
            };
    window.$score = 0;
    window.$maxscore = 0;
    /*window.$beersDOM = "";*/
});

/* FUNCTIONS */
var toast = function(msg) {
    $("<div class='ui-loader ui-corner-all'>" + msg + "</div>")
            .css({display: "block",
        opacity: 0.90,
        position: "fixed",
        padding: "2px",
        "background": "#777",
        "text-shadow": "none",
        color: "white",
        "text-align": "center",
        width: "270px",
        left: ($(window).width() - 284) / 2,
        top: $(window).height() - 40})
            .appendTo($.mobile.pageContainer).delay(1500)
            .fadeOut(800, function() {
        $(this).remove();
    });
}

var updateScore = function(add) {
    //Initialize score
    $score += add;
    var percent = ($score * 100) / $maxscore;
    //Update text
    $("#score").text("Score: " + $score + " / " + $maxscore + " - " + parseInt(percent) + "%");
    //Update background
    $("#page-home").css("background-position-y", parseInt(($(window).height() - 45) * (100 - percent) / 100 + 45));
}

/* INIT */
$(document).ready(function() {
    $.getJSON("data/beers.json", function(data) {
        var items = [];
        var n = data.items.length;
        var n0 = 0;
        var n1 = Math.floor(25 / 100 * n);
        var n2 = Math.floor(50 / 100 * n);
        var n3 = Math.floor(75 / 100 * n);
        var score = 0;

        $.each(data.items, function(index, beer) {
            var id = "beer" + beer.id;
            var name = beer.name;
            var img = "images/beers/" + beer.img;
            //var imgtag = (index > 10) ? '<img class="lazy beer-picture" src="images/lazy.png" data-original="' + img + '">' : '<img class="beer-picture" src="' + img + '">';
            var imgtag = '<img class="beer-picture" src="' + img + '">';
            var localitem = localStorage.getItem(id);
            var imgdone = localitem ? '<img src="images/done.png" class="done-stamp">' : '';
            score += localitem ? 1 : 0;
            items.push('<div class="beer-picture-container" id="' + id + '">' + imgtag + name + imgdone + '</div>');

            //Bind shortcut buttons to 0, 25, 50 and 75%
            switch (index) {
                case n0 :
                    $("#button-shortcut-1").on("click", function() {
                        $.mobile.silentScroll($("#" + id).offset().top - 45);
                    }).text(name.substring(0, 2));
                case n1 :
                    $("#button-shortcut-2").on("click", function() {
                        $.mobile.silentScroll($("#" + id).offset().top - 45);
                    }).text(name.substring(0, 2));
                case n2 :
                    $("#button-shortcut-3").on("click", function() {
                        $.mobile.silentScroll($("#" + id).offset().top - 45);
                    }).text(name.substring(0, 2));
                case n3 :
                    $("#button-shortcut-4").on("click", function() {
                        $.mobile.silentScroll($("#" + id).offset().top - 45);
                    }).text(name.substring(0, 2));
            }
        });

        $maxscore = n;
        updateScore(score);

        $('#beer-container').append(items.join("")); //$beersDOM = items.join(""); //
        //$("img.lazy").lazyload({threshold: 350});
    });

});

/* PICTURE */
$(document).ready(function() {
    /*
     $select.pagebeers.on("pagebeforeshow", function( event ) {
     $select.beercontainer.html($beersDOM);
     });
     $select.pagebeers.on("pagehide", function( event ) {
     $beersDOM = $select.beercontainer.html();
     $select.beercontainer.empty();
     });  */
    $select.beercontainer.on("vclick", ".beer-picture-container", function(event) {
        event.preventDefault();
        event.stopPropagation();

        var imgdonestamp = $(this).find(".done-stamp");
        if (imgdonestamp.length) {
            //already img done
            localStorage.removeItem($(this).attr("id"));
            imgdonestamp.remove();
            updateScore(-1);
        } else {
            localStorage.setItem($(this).attr("id"), 1);
            $(this).append('<img src="images/done.png" class="done-stamp">');
            updateScore(1);
        }

        $(this).append($select.picture.show(0).attr("picture-label", $(this).text()));
    });

    $select.picture.on("vclick", function(event) {
        event.preventDefault();
        event.stopPropagation();
        console.log("open camera");

        var d = new Date();
        function addzero(val) {
            return val < 10 ? "0" + val : val;
        }

        var picturename = d.getFullYear() + "_" + addzero(d.getMonth() + 1) + "_" + addzero(d.getDate()) + "-" + addzero(d.getHours()) + "h" + addzero(d.getMinutes()) + "-" + $select.picture.attr("picture-label");

        /* PHONEGAP TAKE PICTURE */
        function onFail(error) {
            console.log("failed with error code: " + error.code);
        }
        ;

        function onPhotoDataSuccess(imageURI) {
            console.log("photosuccess");
            //MOVE PICTURE
            /*function fsFail(error) { 
             console.log("failed with error code: " + error.code); 
             };*/
            var gotFileEntry = function(fileEntry) {
                console.log("got image file entry: " + fileEntry.fullPath);
                var gotFileSystem = function(fileSystem) {
                    function successDIR(folder) {
                        console.log("moving to " + folder);
                        fileEntry.moveTo(folder, picturename + ".jpg", null, null);
                    }
                    function failDIR(error) {
                        console.log("failed accessing folder with error code: " + error.code);
                        fileEntry.moveTo(fileSystem.root, picturename + ".jpg", null, null);
                    }
                    fileSystem.root.getDirectory("BeerPassport", {create: true, exclusive: false}, successDIR, failDIR);
                    // copy the file 

                };
                // get file system to copy or move image file to 
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, onFail);
            };
            //resolve file system for image  
            window.resolveLocalFileSystemURI(imageURI, gotFileEntry, onFail);

            //hide camera picture and TOAST SUCCESS
            $select.picture.hide(0);
            toast("Picture saved");

        }

        navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
            //allowEdit : true,
            quality: 50,
            encodingType: Camera.EncodingType.JPEG,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            saveToPhotoAlbum: true,
            correctOrientation: true
        });


    });
});

/* NAVIGATION */
$(document).ready(function() {
    $("body").on("vclick", "#backhome", function(event) {
        //console.log("backhome");
        event.preventDefault();
        event.stopPropagation();
        window.history.back();
        /*
         $.mobile.changePage("#page-home", {
         transition: "slide",
         reverse: true
         });*/
    });

    $("#goto-page-beers").on("vclick", function(event) {
        event.preventDefault();
        event.stopPropagation();
        $.mobile.changePage($("#page-beers"), {
            transition: "slide",
        });
    });
    $("#goto-gallery").on("vclick", function(event) {
        event.preventDefault();
        event.stopPropagation();
        $.mobile.changePage("gallery.html", {
            transition: "slide",
        });
    });
});
