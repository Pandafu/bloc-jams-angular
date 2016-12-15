/* 1 The second argument, array, is the list of external modules that blocJams depends on: dependency injection */
/* 2 To make sure the providers are accessible throughout the application, inject them using the config block on the application's root module */
/* 3 By setting the html5Mode method's enabled property true, the hashbang's URLs are disabled: users will see clean URLs w/out the hashbang. */
/* 4 Setting the requireBase property to false is unrelated to 3, but is one way to avoid a common $location error */
/* 5 $stateProvider, a component of UI-Router, will determine a number of properties for a state.  */
/* 6 UI-Router triggers state change (display a different view) by attaching a ui-sref directive in place of the href*/
(function() {
    
    function config($stateProvider, $locationProvider){
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
        });
        
        $stateProvider
            .state('landing', {
                url: '/',
                templateUrl: '/templates/landing.html'
        })
            .state('album', {
                url: '/album',
                templateUrl: '/templates/album.html'
        });
        
    }

    angular
        .module('blocJams', ['ui.router']); //1
        .config(config); //2 config function to pass into the config function
})();
