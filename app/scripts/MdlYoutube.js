/**
 * Created by fmontoya(phipex) on 11/04/2015.
 */
/**
 * (Overwrited) funcion que es llamada por el api de youtube
 * cuando esta cargado el frame y el api
 */
function onYouTubeIframeAPIReady() {
  MdlYoutube.onReady()
}

/**
 *
 * @type {{player: null, opt: {id: string, playOpt: {events: {}}}, ini: Function, isIni: Function, playVideo: Function, stopVideo: Function, onReady: Function, setTime: Function, getCurrentTime: Function, getVideoLen: Function, onIni: null, onPlayerReady: null, onStateChange: null, onPlayVideo: null, onStopVideo: null}}
 */
var MdlYoutube = {
  player:null,

  opt:{
    id:'player',
    playOpt:{
      events:{}
    }
  },
  /**
   * funcion inicial a la cual se le dan los parametros
   * @param videoId id del video
   * @param opt obciones del video
   * @param idplayer id del player
   */
  ini: function (videoId,opt,idplayer) {

    if(idplayer)
    {
        this.opt.id = idplayer;
    }
    var contedor = document.getElementById(this.opt.id);
    if(!contedor)
    {
      throw new Error("No hay un contenedor con el id solicitado");
      return;
    }

    if (!this.player) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.opt.playOpt.videoId = videoId;
      if (this.onIni) {
        this.onIni();
      }
      if (window['$'] && $) {
        //console.info("tiene jquery");
        if (opt) {
          //console.info("tiene opciones");
          $.extend(this.opt.playOpt, opt);
          //console.info("option",this.opt.playOpt);
        }
      }else{
        throw new Error("No ha cargado Jquery por tanto no puede cambiar las opciones predefinidas");
      }
    }

  },
  isIni: function () {
    return (this.player !== null);
  },
  /**
   * corre el video
   */
  playVideo: function () {

    if(this.onPlayVideo)
    {
        this.onPlayVideo();
    }
    if (this.player && this.player.playVideo) {

      this.player.playVideo();
    }
  },
  /**
   * detiene el video
   */
  stopVideo: function () {
    if(this.onStopVideo)
    {
      this.onStopVideo();
    }
    if (this.player && this.player.stopVideo) {
      this.player.stopVideo();
    }
  },

  onReady: function () {

    MdlYoutube.opt.playOpt.events.onError=function (data) {
      console.error("MdlYoutube",data);
    };
    if(MdlYoutube.onPlayerReady){
      MdlYoutube.opt.playOpt.events.onReady=MdlYoutube.onPlayerReady;
    }
    if(MdlYoutube.onStateChange)
    {
      MdlYoutube.opt.playOpt.events.onStateChange = MdlYoutube.onStateChange;
    }
    this.player = new YT.Player(MdlYoutube.opt.id, MdlYoutube.opt.playOpt);
  },
  /**
   * reproduce el video en el tiempo ingresado al parametro
   * @param sec (segundos)
   */
  setTime: function (sec) {
    this.player.seekTo(sec,true);
  },
  /**
   * retorna el segundo que esta reproduciendo
   * @returns {*}
   */
  getCurrentTime: function () {
    if(this.player && this.player.getCurrentTime)
    {
        return this.player.getCurrentTime();
    }
  },

  /**
   * retorna la duracion del videl video
   * @returns {*}
   */
  getVideoLen: function () {
    if (this.player) {
      return this.player.getDuration();
    }
  },
  //eventos para sobreescribir
  /**
   * Si se sobrescribe esta funcion se lanzara al inicio del proceso de carga
   */
  onIni:null,
  /**
   * Si se sobrescribe esta funcion se lanzara cuando este listo el reproducto
   */
  onPlayerReady:null,
  /**
   * Si se sobrescribe esta funcion se lanzara cuando cambie el estado  del reproducto
   */
  onStateChange:null,
  /**
   * Si se sobrescribe esta funcion se lanzara cuando se reproduzca el video
   */
  onPlayVideo:null,
  /**
   * Si se sobrescribe esta funcion se lanzara cuando se reproduzca el video
   */
  onStopVideo:null

};
