var run = function(selection, prj, cmp){
  var activeComp = app.project.activeItem instanceof CompItem ? app.project.activeItem : null;
  if(activeComp != null)
  prj == true ? project(selection) : composition(activeComp, selection);
  else
  null;
}

var project = function(type){

  var root = app.project;

  for(n = 1; n<=root.numItems; n++)
    
    if(root.item(n) instanceof CompItem)

        composition (root.item(n), type);

}

var composition = function(comp, type){

  var lightType = {
    'Point' : 4414, 
    'Parallel' : 4412, 
    'Spot' : 4413, 
    'Ambient' : 4415
  };

  for(i = 1; i<=comp.numLayers; i++)
   
   if(comp.layer(i) instanceof LightLayer){
      
      comp.layer(i).lightType = lightType[type];
      comp.layer(i).name = type.text + ' ' +'Light ' + comp.layer(i).name.replace(/\
      D+/, "");
      }

}
var scriptName = 'Light';
var buildGUI = function(thisObj){ 

  thisObj.w = (thisObj instanceof Panel) ? thisObj : new Window('palette', scriptName, undefined, {resizeable:true}); 
  
  var myWindow = thisObj.w; 
      myWindow.spacing = 2;
      myWindow.alignChildren = "fill";
  
  var lightTypeText = myWindow.add('statictext', undefined, 'Light Type:');
  
  var lightType = myWindow.add('dropdownlist', undefined, ['Point', 'Parallel', 'Spot', 'Ambient']);
      lightType.selection = 0;
  
  var options = myWindow.add('group');
      options.alignChildren = 'fill';
      options.spacing = 2;
  
  var inProject = options.add('radiobutton', undefined, 'All Project');
  
  var thisComp = options.add('radiobutton', undefined, 'This composition');
      thisComp.value = true;
  
  var apply = myWindow.add('button', undefined, 'Apply');
      apply.onClick = function(){
  
        run(lightType.selection, inProject, thisComp);
  
      }
  
  if (thisObj.w instanceof Window){ 
  
    thisObj.w.center(); 
    thisObj.w.show(); 
  
  } 
  
  else thisObj.w.layout.layout(true);
  
  }

buildGUI(this);