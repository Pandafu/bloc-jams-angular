/*
    1 We add an albums property and set its value to an empty array. 
    2 Within the for loop, 
    we use angular.copy to make copies of albumPicasso and push them to the array.
*/

(function () {
    
    function CollectionCtrl(){
        this.albums = []; //1
        for (var i = 0; i < 12; i++){
            this.albums.push(angular.copy(albumPicasso));
        }//2
    }
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', CollectionCtrl);
})();