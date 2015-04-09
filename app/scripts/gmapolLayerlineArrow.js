
/**
 * 
 * @returns {gLayerLine}
 */
var gLayerLine = function() {

    /**
     * capa que contiene que las lineas 
     */
    this.vectorLayer;

    this.vestorLayerArroy;

    /**
     * objeto geometrico que representa la linea que hay que pintas
     */
    this.route;

    /**
     * estilo de la linea
     */
    this.style_line =
            {
                strokeColor: "#00FF00",
                strokeOpacity: 0.5,
                strokeWidth: 4,
                pointRadius: 6,
                pointerEvents: "visiblePainted"
            };

    /**
     * estilo de la capa con flechas
     */
    this.style_arrow =
            {
                strokeColor: "#00FF00",
				//strokeColor: "#F26A2B",
                strokeOpacity: 0.5,
                strokeWidth: 4,
                pointRadius: 6,
                pointerEvents: "visiblePainted"
            };

    /**
     * objeto tipo stylemap para las flechas
     */
    this.styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
            {graphicName: "arrow", rotation: "${angle}"}, this.style_arrow));

    /**
     * puntos en la linea
     */
    this.puntos;

    /**
     * crea una capa con flechas
     * @param {type} map
     * @param {type} nombre
     * @returns {undefined}
     */
    this.createLayerArrow = function(map, nombre) {
        OpenLayers.Renderer.symbol.arrow = [0, 2, 1, 0, 2, 2, 1, 0, 0, 2];

        this.vectorLayer = new OpenLayers.Layer.Vector(nombre);
        this.vestorLayerArroy = new OpenLayers.Layer.Vector("Dir "+nombre, {styleMap: this.styleMap});
        map.addLayer(this.vectorLayer);
        map.addLayer(this.vestorLayerArroy);
        this.puntos = [];

    };

	this.remove = function(map){
      if(this.vectorLayer)
	  {
			map.removeLayer(this.vectorLayer);
			map.removeLayer(this.vestorLayerArroy);
	  }
	  
    };
	
    /**
     * crea una capa con linea sencilla
     * @param {Openlayer.map} map
     * @param {string} nombre
     * @returns {undefined}
     */
    this.createLayer = function(map, nombre) {


        this.vectorLayer = new OpenLayers.Layer.Vector(nombre);
        map.addLayer(this.vectorLayer);
        this.puntos = [];

    };

    /**
     * retorna el linefeature para ser pintado
     * @param {OpenLayer.LonLat} points array con los puntos en la capa
     * @returns {Array OpenLayers.Feature.Vector}
     */
    this.makeRoute = function(points) {
        
        var lineString = new OpenLayers.Geometry.LineString(points);
        var lineFeature = new OpenLayers.Feature.Vector(lineString, null, this.style_line);
        return [lineFeature];

    };

    /**
     * borra la linea del mapa
     * 
     */
    this.delRoute = function() {

        this.vectorLayer.removeFeatures(route);

    };

    /**
     * pinta la linea en el mapa
     * 
     */
    this.drawRute = function() {

        route = this.makeRoute(this.puntos);
        console.info("drawRute", route);
        this.vectorLayer.addFeatures(route);
    };

    /**
     * Dibuja una liena en el mapa con flechas en el recorrido
     * 
     */
    this.drawRuteArrow = function() {
        route = this.makeRoute(this.puntos);


        //console.info("route",route);

        points = [];
        //console.info(route[0].geometry);

        var linePoints = createDirection(route[0].geometry, "middle", true);

        for (var j = 0; j < linePoints.length; j++) {

            linePoints[j].attributes.lineFid = route.fid;

        }

        points = points.concat(linePoints);
        //console.info(points);


        //console.info("bounds ",bounds);
        this.vectorLayer.addFeatures(route);
        this.vestorLayerArroy.addFeatures(points);

    };

    /**
     * ingresa un punto en la linea
     * @param {type} lat
     * @param {type} lon
     * 
     */
    this.pushPoint = function(lat,lon){
        this.puntos.push(makePoint(lon, lat));
    };

};


