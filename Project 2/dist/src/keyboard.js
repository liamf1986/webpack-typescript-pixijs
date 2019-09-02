var keyboardEvents = /** @class */ (function () {
    function keyboardEvents() {
        var actions = [
            //['arrow-up', {fn: jump}],
            ['arrow-left', { fn: this.moveLeft }],
            //['arrow-down', {fn: down}],
            ['arrow-right', { fn: this.moveRight }]
        ];
    }
    keyboardEvents.prototype.moveLeft = function () {
    };
    keyboardEvents.prototype.moveRight = function () {
    };
    return keyboardEvents;
}());
export { keyboardEvents };
//# sourceMappingURL=keyboard.js.map