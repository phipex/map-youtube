
/**
 *
 * @returns {gLayerLine}
 */
var gmapolLayerLine = function(nombre) {

    /**
     * capa que contiene que las lineas
     */
    this.vectorLayer;


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
     * objeto tipo stylemap para las flechas
     */
    this.styleMap = new OpenLayers.StyleMap(OpenLayers.Util.applyDefaults(
            {graphicName: "arrow", rotation: "${angle}"}, this.style_arrow));

    /**
     * puntos en la linea
     */
    this.puntos;


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

        this.vectorLayer.addFeatures(route);
    };


    /**
     * ingresa un punto en la linea
     * @param {type} lat
     * @param {type} lon
     *
     */
    this.pushPoint = function(lat,lon){
      var point = point = new OpenLayers.Geometry.Point(lon,lat);

      this.puntos.push(point);
    };

  this.toExtend = function(map){
    map.zoomToExtent(this.vectorLayer.getDataExtent(),true);
  };

  this.createLayer(map,nombre);
};


