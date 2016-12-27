/*
    1 We use angular.copy to make copies of albumPicasso.
*/

(function (){
    
    function AlbumCtrl(){
        this.albumData = angular.copy(albumPicasso);
    }
    
    angular 
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();