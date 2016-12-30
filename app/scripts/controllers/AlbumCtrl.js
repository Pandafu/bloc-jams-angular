/*
    1 We use angular.copy to make copies of albumPicasso.
    2 Inject the custom service into the AlbumCtrl
    3 From angular.copy(albumPicasso) to use the Fixtures service's getAlbum() method. 
    4 To use the SongPlayer service, we need to decide where to inject it as a dependency. We'll play music from the Album view, so inject the service in this file.
*/

(function (){
    
    function AlbumCtrl(Fixtures, SongPlayer){ //2 (added Fixtures) 4 (added SongPlayer)
        this.albumData = Fixtures.getAlbum();//3 
        this.songPlayer = SongPlayer; //4
    }
    
    angular 
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);//2 , 4
})();