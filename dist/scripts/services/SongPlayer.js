/*
    14 setCurrentTime method checks if there is a current Buzz object, and, if so, uses the Buzz library's setTime method to set the playback position in seconds. Like it says on the comment above it.
    15 To update the song's playback progress from anywhere, we added a $rootScope.$apply event in the SongPlayer service. This creates a custom event that other parts of the Angular application can 'listen' to. The bind method adds an event listener to the Buzz sound object. 
    
*/

(function() {
    function SongPlayer($rootScope, Fixtures){
     
        var SongPlayer = {};
        
/* Private Attributes */ /* Private Attributes */ /* Private Attributes */ /* Private Attributes */ /* Private Attributes */ /* Private Attributes */
        
        /* 
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var currentAlbum = Fixtures.getAlbum(); 
        /*
        * @desc Buzz object audio file
        *@type {Object}
        */
        
        var currentBuzzObject = null;
        
/* Private Functions */ /* Private Functions */ /* Private Functions */ /* Private Functions */ /* Private Functions */ /* Private Functions */

        
        var setSong = function(song){
            if(currentBuzzObject){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function(){
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            }); //15

            SongPlayer.currentSong = song; 
           
        };
        
        
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        }; 
        
/* Public Attributes */ /* Public Attributes */ /* Public Attributes */ /* Public Attributes */ /* Public Attributes */ /* Public Attributes */

        SongPlayer.currentSong = null;
        
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        
        SongPlayer.volume = null;
        
/* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ 
        
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong; 
            if(SongPlayer.currentSong !== song){
                setSong(song); 
                playSong(song);
            }else if(SongPlayer.currentSong === song){
                    if(currentBuzzObject.isPaused()){
                       playSong(song); 
                       }
                 }
            
        };
        
        SongPlayer.pause = function(song){
            song = song || SongPlayer.currentSong; 
            currentBuzzObject.pause();
            song.playing = false;
            
        };
        
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            } 
        };
        
        SongPlayer.next = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if(currentSongIndex < 1){
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time
        */
        //14
        SongPlayer.setCurrentTime = function(time){
          if(currentBuzzObject){
              currentBuzzObject.setTime(time);
          }  
        };
<<<<<<< HEAD
=======
        
        /**
        *@function setVolume
        *@desc Set volume 
        *@param {Number}
        */
        SongPlayer.setVolume = function(volume){
            if(currentBuzzObject){
                currentBuzzObject.setVolume(volume);
            }
        };
>>>>>>> assignment-10Directives2
        return SongPlayer;
    };
 
    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
