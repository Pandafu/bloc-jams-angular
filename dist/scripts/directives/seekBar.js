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
5 Observes the values of the attributes we declare in the HTML by specifying the attribute name in the first argument. When the observed attribute is set or changed, we execute a callback(the 2nd arument) that sets a new scope value (newValue) for the scope.value and scope.max attributes. We use the directive's scope to determine the location of the seek bar thumb, and correspondingly, the playback position of the song.
6 We want the directive to evaluate the on-change expression to execute it, to make sure, we'll attach it to the directive's scope, rather than the attributes object. Scoping the attribute allows us the flexibilit to specify how we want to handle the value passed to the on-change attribute. The & in the isolate scope object is a type of directive scope binding-provides a way to execute an expression in the context of the parent scope.
7 pass the updated value to the onChange attribute: write a function to call in the onClickSeekBar and trackThumb methods that will send the updated scope.value to the function evaluated by onChange. We named the function notifyOnChange because its purpose is to notify onChange that scope.value has changed.
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
            scope: {
                onChange: '&'
            }, //6
            link: function(scope, element, attributes){
                //1
                scope.value = 0;//default value 0
                scope.max = 100;//defaulte value 100
                
                //2
                var seekBar = $(element);
                
                //5
                attributes.$observe('value', function(newValue) {
                    scope.value = newValue;
                });
                //5
                attributes.$observe('max', function(newValue){
                    scope.max = newValue;
                });
                
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
                    notifyOnChange(scope.value);//7
                };
                //3
                scope.trackThumb = function(){
                    $document.bind('mousemove.thumb', function(event){
                        var percent = calculatePercent(seekBar, event);
                        scope.$apply(function(){
                            scope.value = percent * scope.max; 
                            notifyOnChange(scope.value);//7
                        }); 
                    });
                    
                    $document.bind('mouseup.thumb', function(){
                        $document.unbind('mousemove.thumb');
                        $document.unbind('mouseup.thumb');
                    });
                };
            
            var notifyOnChange = function(newValue) {
                if(typeof scope.onChange === 'function'){
                    scope.onChange({value: newValue});
                    } 
                };
            }
        };
    }
    
    angular
        .module('blocJams')
        .directive('seekBar', ['$document', seekBar]);
})();