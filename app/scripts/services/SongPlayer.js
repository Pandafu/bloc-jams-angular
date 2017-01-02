/*
    1 Like the Fixtures service, within the SongPlayer service we create a variable and set it to an empty object. The service returns this object, making its properties and methods public to the rest of the application.
    2 View a play button when we hover over a song row. Add a play method to the SongPlayer service so that we can play a song
    Note: the play method takes an argument, song, which we'll get from the Album view when a user clicks the play button; the ngRepeat directive used in the Album view template will dictate which song to pass into the function. The play method creates a new Buzz object using the song's audioUrl property and then calls Buzz's own play method on the object. To trigger the play method, we need to add an ngClick directive to the play button ancho tag in album.html
    3 removed the currentBuzzObject variable declaration from the local scope of the play method because we anticipate needing to access this variable elsewhere in the service.
    4 Add a 2nd conditional statement that checks if currentSong is equal to song. If the user can trigger the play method on a song that is already set as the currentSong, then the assumption is that the song ust be paused. The conditional statement if(currentBuzzObject.isPaused()) is a check to make sure our assumption is correct.
    5 updates the boolean everytime we play,pause,or stop a song. 
    6 Private functions: setSong, playSong. Private attributes: currentSong & currentBuzzObject. public methods: SongPlayer.play & SongPlayer.pause
    7 Moved here so we can use it within the player bar/maintain organization of private and public attributes/functions.
    8 We use || to tell the function: 1 assign the value of song or 2 the value of SongPlayer.currentSong to the song variable. The first condition occurs when we call the methods from the Album view's song rows, and the second occurs when we call the methods from the player bar.
    9 Inject the Fixtures service into the SongPlayer service. Then use the getAlbum method to store the album information. 
    10 Now that we can access the album (#9), we can write a function to get the index of a song. 
    11 Write a method to go to the previous song, used the getSongIndex function to get the index of the currently playing song and then decrease that index by one.
    12 Added logic for what should happen if the previous song index is less than zero: stop the currently playing song and set the value of the currently playing song to the first song.  
    13 if the currentSongIndex is not less than zero, then it must be greater than zero. Added an else conditional that moves to the previous song and automatically plays it. 
*/

(function() {
    function SongPlayer(Fixtures){
        /* 9 */
        var SongPlayer = {};
        
/* Private Attributes */ /* Private Attributes */ /* Private Attributes */ /* Private Attributes */ /* Private Attributes */ /* Private Attributes */
        
        /* 
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var currentAlbum = Fixtures.getAlbum(); /* 9 */
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

            SongPlayer.currentSong = song; 
           
        };
        
        
        var playSong = function(song){
            currentBuzzObject.play();
            song.playing = true;
        };
        
        var getSongIndex = function(song){
            return currentAlbum.songs.indexOf(song);
        }; /* 10 */
        
/* Public Attributes */ /* Public Attributes */ /* Public Attributes */ /* Public Attributes */ /* Public Attributes */ /* Public Attributes */

        SongPlayer.currentSong = null;//7
        
        
        
/* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ /* Public Methods*/ 
        
        SongPlayer.play = function(song){
            song = song || SongPlayer.currentSong; /* 8 */
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
            song = song || SongPlayer.currentSong; /* 8 */
            currentBuzzObject.pause();
            song.playing = false;
            
        };
        
        SongPlayer.previous = function(){
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if(currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } /* 12 */ else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            } /* 13 */
        }; /* 11 */
        
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
        
        return SongPlayer;
    };
 
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
