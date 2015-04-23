var LayerReportes = function(){
    
    this.feacture = [];
    
	
    this.style_triangle = {
            strokeColor: "#215E10",
            fillColor: "#00FF00",
            strokeWidth: 2,
            pointRadius: 15,
            pointerEvents: "visiblePainted",
            label: "${label}",
            fontColor: "#FFFFFF",
            fontSize: "12px",
            fontFamily: "Courier New, monospace",
            fontWeight: "bold",
            fillOpacity: 0.3,
            strokeOpacity: 0.3,
           
            labelOutlineColor: "#000000",
            labelOutlineWidth: 3

        };
    
    this.styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
                //{graphicName: "triangle", rotation: "${angle}"}, this.style_triangle));
				{graphicName: "direcciion", rotation: "${angle}"}, this.style_triangle));
    
    this.layer;
    
    this.remove = function(map){
      if(this.layer){
		map.removeLayer(this.layer);
	  }
	    
    };
     
    this.drawReporte = function(map,name,evento){
        
	OpenLayers.Renderer.symbol.direcciion = [0, 3, 1, 0, 2, 3, 0, 3]; 

		var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
            renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;
        
        // Create a vector layer and give it your style map.
            this.layer = new OpenLayers.Layer.Vector(name, {
                styleMap: this.styleMap,
                renderers: renderer
            });
            this.layer.events.register("featureselected", this.layer, evento);

           // Create a select feature control and add it to the map.
            var select = new OpenLayers.Control.SelectFeature(this.layer);
            map.addControl(select);
            select.activate();
        
         this.layer.addFeatures(this.feacture);
            map.addLayer(this.layer);
    };
    
    this.addPoint= function(lat,lon,angule,label,divname){
        var uno = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lon, lat), {
                label: label, angle: angule
            });

            uno.attributes.divid = divname;
        this.feacture.push(uno);
        //console.info(this.feacture);
    };
    
    this.getPointAdded= function(lat,lon,angule,label,divname){
        var uno = new OpenLayers.Feature.Vector(new OpenLayers.Geometry.Point(lon, lat), {
                label: label, angle: angule
            });

            uno.attributes.divid = divname;
        this.feacture.push(uno);
        //console.info(this.feacture);
        return uno;
    };
    
    this.toExtend = function(map){
            map.zoomToExtent(this.layer.getDataExtent(),true);
        };
    
};

