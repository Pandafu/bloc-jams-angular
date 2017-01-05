/* Note: seekBar is a factory function, it returns an object that describes the directive's behavior to Angular's HTML compiler. This object communicates the behavior through options: templateUrl, replace, and restrict.
1 seekBar's HTML template can access the attributes and methods of the directive's scope object: scope.value, scope.max, and scope.fillStyle. 
scope.value holds the value of the seek bar, such as the currently playing song time or the current volume. 
scope.max holds the max value of the song and volume seek bars. 
percentString() a function that calculates a percent based on the value and maximum value of a seek bar.
scope.fillStyle() returns the width of the seek bar fill element based on the calculated percent.
2 calculatePercent() calculates the horizontal percent along the seek bar where the event (passed in from the view as $event) occured. 
  seekBar holds the element that matches the directive<seek-bar> as a jQuery object so we can call jQuery methods on it.
  scope.onClickSeekBar() updates the seek bar value based on the seek bar's width and the location of the user's click on the seek bar. 
3 when the user drags the seek bar thumb: scope.trackThumb() similar to scope.onClickSeekBar, but uses $apply to constantly apply the change in value of       scope.value as the user drags the seek bar thumb. 
4 $document must be injected as a dependency for us to use it. 
*/

/*
Comments for templates/directives/seek_bar.html since it causes error when placed anywhere in it:  
    1 allows us to set CSS styles on an HTML element conditionally 
    2 Despite using jQuery, Angular still dictates the style of our code-we declare in the HTML which element should execute scope.OnClickSeekBar()
*/


(function() {
    function seekBar($document){
        //2
    var calculatePercent = function(seekBar, event){
        var offsetX = event.pageX - seekBar.offset().left;
        var seekBarWidth = seekBar.width();
        var offsetXPercent = offsetX / seekBarWidth;
        offsetXPercent = Math.max(0, offsetXPercent);
        offsetXPercent = Math.min(1, offsetXPercent);
        return offsetXPercent;
    };
        
        return {
            templateUrl: '/templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
            scope: {},
            link: function(scope, element, attributes){
                //1
                scope.value = 0;//default value 0
                scope.max = 100;//defaulte value 100
                
                //2
                var seekBar = $(element);
                
                var percentString = function(){
                    var value = scope.value;
                    var max = scope.max;
                    var percent = value / max * 100;
                    return percent + "%";
                };
                
                scope.fillStyle = function() {
                    return {width: percentString()};
                };
                
                scope.thumbStyle = function(){
                    return {left: percentString()};
                };
                
                //2
                scope.onClickSeekBar = function(event){
                    var percent = calculatePercent(seekBar, event);
                    scope.value = percent * scope.max;
                };
                //3
                scope.trackThumb = function(){
                    $document.bind('mousemove.thumb', function(event){
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function(){
                            scope.value = percent * scope.max; 
                        });
                    });
                    
                    $document.bind('mouseup.thumb', function(){
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();