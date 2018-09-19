var propertyToText = {

	getPropertyPath : function(property, path, depth){
        
		path = '("'+property.name+'")';

        while(depth > 1){
        	
        	path = '("'+property.parentProperty.name+'")' + path;
        	
        	depth--;

        	property = property.parentProperty;
        	
        }
      
        return "thisComp.layer('"+property.parentProperty.name+"')" + path;
        
	},

	activeComp : function(){
	
		return app.project.activeItem instanceof CompItem ? app.project.activeItem : 0;
	
	},

	run : function(){
	
		var comp = this.activeComp();

		if(comp != 0){
			
			var currentProperty = comp.selectedProperties;
			var currentLayer = comp.selectedLayers[0];

			for( var p = 0; p < currentProperty.length; p++)

				if(currentProperty[p] instanceof Property){
				
					currentProperty = currentProperty[p];
					
					break;
				
				}
		
			if(currentProperty == undefined){

				return 0;
			
			}else{
        	
        		var	propertyPath = "";
        	
        		var propertyDepth = currentProperty.propertyDepth;
			
				app.beginUndoGroup('Properties To Text');
			
				var infoTextLayer = comp.layers.addText(currentProperty.name);
					infoTextLayer.property('ADBE Text Properties').property("ADBE Text Document").expression = 'try{\n"'+currentProperty.name+': " + ' + this.getPropertyPath(currentProperty, propertyPath, propertyDepth) + ".value.toString();\n}catch(err){\n''\n}";
					infoTextLayer.guideLayer = true;
					infoTextLayer.name = currentLayer.name + " | " + infoTextLayer.name;
			
				app.endUndoGroup();
			
			}
		
		}else{
		
			alert('Select Composition');
		
		}
	
	}

}

propertyToText.run();