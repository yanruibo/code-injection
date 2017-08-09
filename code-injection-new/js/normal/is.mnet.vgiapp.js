


      
        var onDeviceReady = function() {
            document.getElementById("devready").innerHTML = "OnDeviceReady fired.";
        };

        function init() {
            document.addEventListener("deviceready", onDeviceReady, true);
        }   

