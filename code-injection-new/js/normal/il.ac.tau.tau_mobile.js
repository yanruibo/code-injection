



            $(document).one("mobileinit", function () { 
            $.mobile.defaultPageTransition = 'slide';
            $.support.cors                 = true;
            $.mobile.allowCrossDomainPages = true;
            $.mobile.pushStateEnabled      = false;
            $.mobile.defaultHomeScroll = 0;
            });
        

            
            var next_url="https://www.ims.tau.ac.il/Tal/Mobile/Login.aspx";
            $(function () 
            {                
                if(!chg_page())
                {
                    setInterval(function () {chg_page();}, 1000);
                }            
            });
            //
            function chk_conn()
            {//check connection
                if (navigator.onLine){return true;}
                if (navigator.network.connection.type == Connection.NONE){return false;} else{return true;}
            }
            //
            function chg_page()
            {
                if(chk_conn()){$.mobile.changePage(next_url, { transition: "slide", changeHash: false }); return true;} 
                else{$("#errnetwork").show();return false;}               
            }
        
