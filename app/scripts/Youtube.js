/**
 * Created by fmontoya on 09/04/2015.
 */

var MdlYoutube = {
  player:null,
  ini:function(){
    if (!this.player) {
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  },
  playVideo:function(){
    this.player.playVideo();

  },
  onPlayerReady:function (event) {
    MdlYoutube.playVideo();

  },
  getCurrentTime: function () {
    if (MdlYoutube.player && MdlYoutube.player.getCurrentTime) {
      return MdlYoutube.player.getCurrentTime();
    }
  }
};


function onYouTubeIframeAPIReady() {
  MdlYoutube.player = new YT.Player('player', {
    events: {
      'onReady': MdlYoutube.onPlayerReady
    }
  });

}


