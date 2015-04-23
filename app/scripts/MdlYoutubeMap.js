/**
 * Modulo que genera un mapa y un video de youtube, debe tener
 * en la pagina que es llamado un div con id 'mapa' y otro con id 'player'
 * @type {{interval: null, dataTrack: null, droneMarker: null, videodelay: null, compare_fn: Function, load: Function, registraInterval: Function, ini: Function, getReportByTime: Function, drawTrack: Function, goToTrackTime: Function, goToVideoTime: Function, goToVideoTimeByTrack: Function, getTrackLen: Function, getVideoLen: Function}}
 */
var MdlYoutubeMap = {
    interval:null,
    dataTrack:null,
    droneMarker:null,
    videodelay:null,
    compare_fn:function(value, item){

      var time = item.tim;

      return value - time;
    },
  /**
   * funcion que inicializa el video y el mapa
   * @param data track que debe ser mostrado
   * @param vidid id del video
   * @param delay tiempo en milisegundos que demora antes
   * de sincronizarse con el mapa
   * @param optvideo
   * @param icon
   */
    load:function(data,vidid,delay,optvideo,icon){
      var ini = MdlYoutube.isIni();
      if(!ini)
      {

        MdlYoutube.onPlayerReady= function () {
          MdlYoutubeMap.registraInterval();
          MdlYoutube.playVideo();
        };

        this.ini(vidid,optvideo);


        MdlGmap.ini();
      }else {//TODO si ya tiene el player
        //TODO borra los datos del mapa

      }
      this.videodelay = (delay)?delay:null;

      //TODO agrega los datos del mapa
      this.drawTrack(data,icon);



    },

    registraInterval: function () {
      if(this.interval)
      {
          clearInterval(this.interval);
      }
      this.interval=setInterval(
              function(){

                var current = MdlYoutube.getCurrentTime();

                var delay = (MdlYoutubeMap.videodelay)?MdlYoutubeMap.videodelay:0;

                MdlYoutubeMap.goToTrackTime((current * 1000)-delay);

              },
              800
      );
    },
    ini:function(divid,option){

      //console.info(divid);
      //TODO crea el player
      MdlYoutube.ini(divid,option);

    },
  /**
   * retorna el reporte segun el tiempo que se le solicite
   * @param current
   * @returns {*}
   */
    getReportByTime:function(current){
      //TODO reporta tiempo
      //console.info(current, converLabel(current));
      if (current) {
        var index = binarySearch(this.dataTrack, current, this.compare_fn);
        //console.info(index);
        //console.info("preguntar", current, index);
        current = Math.round(current);
        //$divt.html(current);
        //console.info("preguntar round",current);

        var item = this.dataTrack[index];

        return item;
      }
    },
    drawTrack:function(RECORDS,icon){
      //TODO pinta el track
      var layerrepo = new gmapLayerLine();

      var latlonIni;
      var hea;
      $(RECORDS).each(function(index,item){
        //console.info(item);
        var lat = convert(item.lat);
        var lon = convert(item.lon);
        var latlon = new google.maps.LatLng(lat,lon);
        //console.info(lat,lon,latlon);
        hea = (!hea)?item.hea:null;
        latlonIni = (!latlonIni)?latlon:null;
        layerrepo.pushPoint(lat,lon);
        item.latlon = latlon;
      });
      layerrepo.drawRute();
      layerrepo.toExtend(map);
      this.dataTrack = RECORDS;

      this.droneMarker = new MarkerMoveRotateUni(latlonIni.lat(),latlonIni.lng(),hea,icon);
      /*//borrar
markerInicio = new google.maps.Marker({
    position: latlonIni,
      map: map
  });*/

    },
  /**
   * llama el video al determinado tiempo
   * @param current
   */
    goToTrackTime:function(current){

      var item = this.getReportByTime(current);
      if (item) {
        //console.info("item", item.latlon);

        map.panTo(item.latlon);
        var lat = item.latlon.lat();
        var lon = item.latlon.lng();
        var angle = item.hea;
        //markerInicio.setPosition(item.latlon);
        this.droneMarker.moveMarker(lat,lon,angle);
      }
    },
  /**
   * Reproduce el video desde el tiempo indicado
   * @param current
   */
    goToVideoTime: function (current) {
      MdlYoutube.setTime(current);
    },
  /**
   * Envia a un determinado punto en el track
   * @param indexTrack indice del track
   **/
    goToVideoTimeByTrack: function (indexTrack) {
      var item = this.dataTrack[indexTrack];
      if (item) {
        //console.info("item", item);
        var current = item.tim;

        var delay = (MdlYoutubeMap.videodelay)?MdlYoutubeMap.videodelay:0;

        current = current + delay;

        //console.info("time",current,converLabel(current));

        current = current/1000;
        //console.info(current);
        this.goToVideoTime(current);

      }
    },
  /**
   * retorna el numero de hitos en el track
   * @returns {*}
   */
    getTrackLen: function () {
      if (this.dataTrack) {
        var len = this.dataTrack.length;
        return len;
      }

    },
  /**
   * retorna el tiempo completo del video
   * @returns {*}
   */
    getVideoLen: function () {
      return MdlYoutube.getVideoLen();
    }
  };
