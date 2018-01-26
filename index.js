
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
    chrome.storage.sync.get('youtubeVideos',function(items){
     removeChilds('content')
     var node = document.getElementById('content');
     var parent = document.createElement('UL');
     node.appendChild(parent);
     for (var i =0;i<items.youtubeVideos.length;i++){
        var child = document.createElement('LI');
        if(items.youtubeVideos[i].title){
        child.innerText=items.youtubeVideos[i].title;
        parent.appendChild(child);
      }
     }

  });
}

window.onload = function(){
  loadMedia();
	document.getElementById('add').onclick = loadMedia;
  chrome.storage.onChanged.addListener(function(changes){
    loadMedia();
  })
};
