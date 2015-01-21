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
		require: '?^form',
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
				'</div>																	',
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
			angular.forEach( attrs.class.split(' '), function(value){
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

			var inputName = element.attr('name');
			if ( attrs.jswMessages ){
				var messageIncElem = angular.element('<ng-messages></ng-messages');
				messageIncElem.attr('for', '$$__' + inputName + '__getError()' );
				messageIncElem.attr('jsw-messages-include', attrs.jswMessages);
				element.after( messageIncElem );
			}

			element.removeClass('jsw-input');

			return function(scope, tElem, tAttrs, ctrl) {
				transclude(scope, function(clone, innerScope) {

					if ( attrs.jswMessages ){
						scope['$$__' + inputName + '__getError'] = function(){
							if ( ctrl ) {
								return ctrl[clone.attr('name')].$error;
							}
							else{
								return {};
							}
						};
					}

					clone.addClass('form-control');
					clone.removeClass( tAttrs.class );
					if (attrs.validationErrors){
						clone.attr( 'jsw-validate-tooltip', tAttrs.validationErrors );
					}
					tElem.children('div').append($compile(clone)(innerScope));
				});
			}; 
		}
	};
});