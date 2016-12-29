/*
    1 We add an albums property and set its value to an empty array. 
    2 inject the Fixtures service into CollectionCtrl
    3 Added 'Fixtures' with array 
*/

(function () {
    
    function CollectionCtrl(){
        this.albums = Fixtures.getCollection(12);
    }//2
    
    angular
        .module('blocJams')
        .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]); //3
})();