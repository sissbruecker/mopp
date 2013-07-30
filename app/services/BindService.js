/**
 * Created with IntelliJ IDEA.
 * User: sasch_000
 * Date: 22.07.13
 * Time: 17:24
 * To change this template use File | Settings | File Templates.
 */
angular.module('app').factory('bind', function ($parse, $timeout) {

    var Binding = function (sourceScope, sourceProperty) {

        this.sourceScope = sourceScope;
        this.sourceProperty = sourceProperty;

        return this;
    };

    Binding.prototype.to = function (targetScope, targetProperty) {

        targetProperty = targetProperty || this.sourceProperty;

        this.targetScope = targetScope;
        this.targetSetter = $parse(targetProperty).assign;

        // Create watch that updates the target on change
        this.targetWatcher = this.sourceScope.$watch(this.sourceProperty, $.proxy(function (newValue, oldValue) {
            $timeout($.proxy(function () {

                this.targetSetter(this.targetScope, newValue);

                if (this.callback) this.callback.apply(null, [newValue, oldValue]);

            }, this));
        }, this));

        // Remove watch on scope destruction
        this.sourceScope.$on('$destroy', $.proxy(function () {
            this.targetWatcher();
        }, this));

        this.targetScope.$on('$destroy', $.proxy(function () {
            this.targetWatcher();
        }, this));

        return this;
    };

    Binding.prototype.notify = function (callback) {

        this.callback = callback;

        return this;
    };

    return function (sourceScope, sourceProperty) {
        return new Binding(sourceScope, sourceProperty);
    };
});