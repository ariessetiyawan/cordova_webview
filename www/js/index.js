var inAppBrowserRef
document.addEventListener('deviceready', onDeviceReady, false);
document.addEventListener("backbutton", onBackKeyDown, false);
//bismill4h
function onDeviceReady() {
    
	var onSuccess = function(position) {
		localStorage.setItem('pusaka_position',JSON.stringify(position))
    };

    // onError Callback receives a PositionError object
    //
    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
	
	Promise.all([
		setTimeout(function(){openInAppBrowser()},1000),
	]).then()
	/*
	var latitude = -26.902038;
    var longitude = -48.671337;
    var accuracy = 1;
    var altitude = 0;
    
    mockGeolocation.setMock([latitude, longitude, accuracy, altitude], function(suc){
          console.log(suc);
		  
        }, function(err){
          alert(err);
        });*/
}

function onBackKeyDown(){		
		navigator.notification.confirm(
			'Apakah anda akan keluar dari aplikasi ?!',  // message
			onConfirm,         // callback
			'Pesan',            // title
			["YES","NO"],               // buttonName
		);
		
}
function onConfirm(buttonIndex) {		
			//alert(buttonIndex)
			if (buttonIndex==1){
				MOForceAppClose.forceAppClose()
			} else {
				setTimeout(function(){openInAppBrowser()},1000)
			}
		}
function openInAppBrowser() {
    // Open URL
    var open_url = 'https://pusaka-v3.kemenag.go.id/';
    inAppBrowserRef = cordova.InAppBrowser.open(open_url, '_self', 'clearcache=no,clearsessioncache=no,location=no,hideurlbar=yes,hardwareback=yes,zoom=no');
    // Add event listener to close the InAppBrowser
    inAppBrowserRef.addEventListener('message', messageCallBack);
	inAppBrowserRef.addEventListener("exit", function () {
		onBackKeyDown()	
	});
};

function messageCallBack(params) {
    // Close the InAppBrowser if we received the proper message
	alert('close')
    if(params.data.action == 'close') {
        inAppBrowserRef.close();
		MOForceAppClose.forceAppClose()
    }
};
