var loadList = function(list){
  list.removeAll();
  for(n = 1; n <= app.project.numItems; n++)
    if(app.project.item(n) instanceof FootageItem)
      list.add('item', app.project.item(n).name);
}

var volume = function(name, gain){
  app.beginUndoGroup(scriptName);
try{
    for(i = 0; i < name.length; i++)
      
      for(n = 1; n <= app.project.numItems; n++)
    
        if(app.project.item(n) instanceof FootageItem && app.project.item(n).name == name[i].text){
    
          var currentItem = app.project.item(n);
          var usedIn = currentItem.usedIn;
    
        for(t = 0; t < usedIn.length; t++){
    
          var currentComp = usedIn[t];
    
          for(m = 1; m <= currentComp.numLayers; m++)
    
            if(currentComp.layer(m).source.name == name[i].text)
                try{
                currentComp.layer(m).property('ADBE Audio Group').property('ADBE Audio Levels').setValue([gain, gain]);
                }catch(err){
                        null;
                }
      }
    }
    app.endUndoGroup();
}catch(err){
        null;
}

}

var scriptName = 'Sound';
var buildGUI = function(thisObj){ 

  thisObj.w = (thisObj instanceof Panel) ? thisObj : new Window('palette', scriptName, undefined, {resizeable:true}); 
  
  var myWindow = thisObj.w; 
      myWindow.spacing = 2;
      myWindow.alignChildren = "fill";

  var infoPanel = myWindow.add('panel', undefined, 'Audio Level: 0 dB');
      infoPanel.spacing = 2;
      infoPanel.alignChildren = "fill";
      
  var soundList = infoPanel.add('listbox', undefined, [], {'multiselect' : true});
      soundList.preferredSize = [150, 150];

  var changeVolume = infoPanel.add('slider', undefined, 0, -96, 96);
      changeVolume.helpTip = changeVolume.value;
  
  changeVolume.onChanging = function(){
        infoPanel.text = 'Audio Level: ' + Math.floor(this.value) + ' dB';
      }
  changeVolume.onChange = function(){
        volume(soundList.selection, Math.floor(this.value));
      }
  myWindow.onActivate = function(){
  
    loadList(soundList);
  
  }
  
  if (thisObj.w instanceof Window){ 
  
    thisObj.w.center(); 
    thisObj.w.show(); 
  
  } 
  
  else thisObj.w.layout.layout(true);
  
  }

buildGUI(this);
