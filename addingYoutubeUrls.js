function searchUrl(title,info){
 	if(info.youtubeVideos){
 		var flag =0;
 		var videosData = info.youtubeVideos;
 		for (var i=0;i<videosData.length;i++){
 			if(videosData[i].title == title){
 				flag = -1;
 			}
 		}
 		if(flag == 0){
 			return 1
 		}
 		else{
 			return 0;
 		}
 	}
 	else{
 		return 1;
 }

}

function fetchUrl(url){
	var fetchVideoInfoUrl = "http://www.youtube.com/oembed?url="+url+"&format=json";
	return fetchVideoInfoUrl;
}

function videoInfo(url,infoArray,youtubeUrl,info){
var data = null;
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var objectResponse = JSON.parse(this.response);
    objectResponse.url = youtubeUrl;
    if( searchUrl(objectResponse.title,info) == 1 ){
	    infoArray.push(objectResponse);
	    chrome.storage.local.set({'youtubeVideos':infoArray});
	}
  }
});
xhr.open("GET", url);
xhr.setRequestHeader("cache-control", "no-cache");
xhr.send(data);

}


chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
  	if(tab.url !== undefined ){
  		if(tab.url.indexOf("youtube") == -1){
  			return;
  		}
   		chrome.storage.local.get('youtubeVideos',function(info){

   			if(info.youtubeVideos){

   				var infoArray = info.youtubeVideos;
   				var newUrl = fetchUrl(tab.url);
   				videoInfo(newUrl,infoArray,tab.url,info);
   				
   			}
   			else
   			{
   				var infoArray = [];
   				var newUrl = fetchUrl(tab.url);
				videoInfo(newUrl,infoArray,tab.url,info);   				
   			}
   		});
   		
	}
  }
);