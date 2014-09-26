'use strict';

/**
*  BootstrapInput Directive
*
* Description
*/

angular.module('jsWidgets.input', [
])

.directive('jswInput', function( $compile ){
	return {
		require: 'ngModel',
		restrict: 'C', 
		template: '' +
				'<div >					'+//ng-class="!(icon || addon) && \'form-group\'"
				'									'+//<label ng-if="label">{{label}}</label>
				'	<div>								'+// ng-class="getInputGroupClasses()"
				'		<span class="input-group-addon">			'+// ng-if="icon || addon"
				'			<i class="icon-fixed-width"></i>	'+// {{icon}}" ng-show="icon
				'			 													'+//{{addon}}
				'		</span>															'+
				'	</div>																'+
				'</div>																	'
		,
		replace: true,
		transclude: 'element',
		compile: function( element, attrs, transclude ) {

			if ( !( attrs.icon || attrs.addon ) ){
				element.addClass('form-group');
			}
			element.children().addClass('input-group');

			if ( attrs.label ){
				element.prepend('<label>'+attrs.label+'</label>');
			}

			var el = element.children();		// second div
			angular.forEach( attrs.class.split(' '), function(value, key){
				if ( value.indexOf('input-group') >= 0 ){
					el.addClass( value );
				}
			});

			var e = el.children();				// span
			if ( !( attrs.icon || attrs.addon ) ){
				e.remove();
			}
			else {
				if ( attrs.icon ){
					e.children().addClass( attrs.icon );
				}
				e.innerText = '{{'+attrs.addon+'}}';
			}

			element.removeClass('jsw-input');

			return function(scope, tElem, tAttrs) {
				transclude(scope, function(clone, innerScope) {
					clone.addClass('form-control');
					clone.removeClass( tAttrs.class );
					tElem.children('div').append($compile(clone)(innerScope));
				});
			} 
		}
	};
});