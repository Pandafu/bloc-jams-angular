/*
    1 Like the Fixtures service, within the SongPlayer service we create a variable and set it to an empty object. The service returns this object, making its properties and methods public to the rest of the application.
    2 View a play button when we hover over a song row. Add a play method to the SongPlayer service so that we can play a song
    Note: the play method takes an argument, song, which we'll get from the Album view when a user clicks the play button; the ngRepeat directive used in the Album view template will dictate which song to pass into the function. The play method creates a new Buzz object using the song's audioUrl property and then calls Buzz's own play method on the object. To trigger the play method, we need to add an ngClick directive to the play button ancho tag in album.html
    3 removed the currentBuzzObject variable declaration from the local scope of the play method because we anticipate needing to access this variable elsewhere in the service.
    4 Add a 2nd conditional statement that checks if currentSong is equal to song. If the user can trigger the play method on a song that is already set as the currentSong, then the assumption is that the song ust be paused. The conditional statement if(currentBuzzObject.isPaused()) is a check to make sure our assumption is correct.
    5 updates the boolean everytime we play,pause,or stop a song. 
*/

(function() {
    function SongPlayer(){
        var SongPlayer = {};
        
        /* 
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var currentSong = null;
        
        /*
        * @desc Buzz object audio file
        *@type {Object}
        */
        
        var currentBuzzObject = null;
        
        var setSong = function(song){
            if(currentBuzzObject){
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
        SongPlayer.play = function(song){
            if(currentSong !== song){
                setSong(song); 
                currentBuzzObject.play();
                song.playing = true;
            }else if(currentSong === song){
                    if(currentBuzzObject.isPaused()){
                       currentBuzzObject.play();
                       }//4 
                 }
            
        };
        
        SongPlayer.pause = function(song){
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        return SongPlayer;
    }
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
