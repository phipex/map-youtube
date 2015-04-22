
/**
 * Clase encargada de crear un linea en google map
 * debe primero agregar los puntos y despues llamar
 * la funcion drawRute
 * @returns {gLayerLine}
 */
var gmapLayerLine = function() {

    /**
     * capa que contiene que las lineas
     */
    this.vectorLayer;

 /**
     * puntos en la linea
     */
    this.puntos;


    this.remove = function(map){
      if(this.vectorLayer)
	  {
          this.vectorLayer.setMap(null);
	  }

    };

    /**
     * crea una capa con linea sencilla
     * @param {Openlayer.map} map
     * @param {string} nombre
     * @returns {undefined}
     */
    this.createLayer = function(map) {



        this.puntos = [];

    };



    /**
     * pinta la linea en el mapa
     *
     */
    this.drawRute = function() {
        var puntos = this.puntos;

        //console.info(puntos);
        this.vectorLayer = new google.maps.Polyline({
            path: puntos,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2,
            map:map
        });
    };


    /**
     * ingresa un punto en la linea
     * @param {type} lat
     * @param {type} lon
     *
     */
    this.pushPoint = function(lat,lon){
      var point = new google.maps.LatLng(lat,lon);

      this.puntos.push(point);
    };

  /**
   * Centra el mapa en los limites que incluyen los puntos de la linea
    * @param map
   */
  this.toExtend = function(map){

      var bounds = new google.maps.LatLngBounds();

      var count = this.puntos.length;
      for (var i = 0; i < count; i++) {
          var latlon = this.puntos[i];
          //console.info("latlon",latlon);
          bounds.extend(latlon);

      }
      //console.info("bounds",bounds.toString());
      map.panToBounds(bounds);
  };

  this.createLayer(map);
};


