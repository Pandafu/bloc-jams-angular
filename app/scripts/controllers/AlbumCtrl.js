/*
    1 We use angular.copy to make copies of albumPicasso.
    2 Inject the custom service into the AlbumCtrl
    3 From angular.copy(albumPicasso) to use the Fixtures service's getAlbum() method. 
*/

(function (){
    
    function AlbumCtrl(Fixtures){ //2 (added Fixtures)
        this.albumData = Fixtures.getAlbum();//3 
    }
    
    angular 
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);//2
})();