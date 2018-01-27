
function showNoti(){
   var opt = {
          type : 'basic',
          title : 'Total Reset',
          message : 'Total Reset to 0.',
          iconUrl : 'logo.png' 
        }
        chrome.notifications.create('reset',opt,function(){
          
       });

}

function removeChilds(name){
  
  // why slower in deleting
  // var myNode = document.getElementById("foo");
  // myNode.innerHTML = '';

  
  var node = document.getElementById(name);
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}


function loadMedia(){
    chrome.storage.local.get('youtubeVideos',function(items){
     removeChilds('content')
     var node = document.getElementById('content');
     var parent = document.createElement('UL');
     node.appendChild(parent);
     for (var i =items.youtubeVideos.length-1;i>=0;i--){
        var child = document.createElement('DIV');
        child.setAttribute("class","songItem");
        var childText = document.createElement('LI');
        if(items.youtubeVideos[i].title){
        var thumbnail = document.createElement('IMG');
        thumbnail.setAttribute("src",items.youtubeVideos[i].thumbnail_url);
        thumbnail.setAttribute("width","100px");
        childText.innerText=items.youtubeVideos[i].title;
        var play = document.createElement('IMG');
        play.setAttribute("src","play.svg");
        play.setAttribute("width","30px");
        var playBtn = document.createElement('BUTTON');
        playBtn.addEventListener("click", function(){
            var player = document.getElementById('player');
            player.innerHTML =items.youtubeVideos.html;
        });
        playBtn.appendChild(play);
        child.appendChild(thumbnail);
        child.appendChild(playBtn);
        child.appendChild(childText);
        parent.appendChild(child);
      }
     }

  });
}

window.onload = function(){
  loadMedia();
	//document.getElementById('add').onclick = loadMedia;
  chrome.storage.onChanged.addListener(function(changes){
    loadMedia();
  })
};
