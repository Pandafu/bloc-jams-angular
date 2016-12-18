/* 1 controller is LandingCtrl-first argument. 
   2 second argument is the callback function that executes when the controller is initialized.
   3 .module() call does not have the second argument(aray of dependencies) because we've set 
   the dependencies in app.js, we only need to retrieve the already defined module.
   4 To initialize the $scope object, a controller attaches properties to it. Adding a heroTitle property to the LandingCtrl's scope object. 
*/

(function(){
    
    function LandingCtrl(){
        this.heroTitle = "Turn the Music Up!"; //4
    }
    
    angular
        .module('blocJams')//3
        .controller('LandingCtrl', LandingCtrl);
})();