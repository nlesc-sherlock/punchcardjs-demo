var Controls = (function () {
    function Controls(domElemId) {
        // the name of the DOM element
        this.domElemId = domElemId;
        // the DOM element by ID
        this.domElem = document.getElementById(this.domElemId);
    }
    /**
     * [drawControls description]
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    Controls.prototype.drawControls = function () {
        var controlsDiv = document.createElement('div');
        controlsDiv.className = 'controls';
        controlsDiv.innerHTML =
            '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="Minimizes the widget">' +
                '    <span class="glyphicon glyphicon-triangle-bottom"></span>' +
                '</button>' +
                '<button type="button" class="btn btn-default btn-sm hidden" data-toggle="tooltip" title="Restores the widget">' +
                '    <span class="glyphicon glyphicon-triangle-top"></span>' +
                '</button>' +
                '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="Moves the widget up">' +
                '    <span class="glyphicon glyphicon-arrow-up"></span>' +
                '</button>' +
                '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="Moves the widget down">' +
                '    <span class="glyphicon glyphicon-arrow-down"></span>' +
                '</button>' +
                '<button type="button" class="btn btn-default btn-sm" data-toggle="tooltip" title="Closes the widget">' +
                '    <span class="glyphicon glyphicon-remove"></span>' +
                '</button>';
        this.domElem.appendChild(controlsDiv);
        // beware: JavaScript magic happens here
        var that = this;
        controlsDiv.getElementsByClassName('glyphicon-triangle-bottom')[0].parentNode.addEventListener('click', function () {
            that.minimize();
        });
        controlsDiv.getElementsByClassName('glyphicon-triangle-top')[0].parentNode.addEventListener('click', function () {
            that.restore();
        });
        controlsDiv.getElementsByClassName('glyphicon-arrow-up')[0].parentNode.addEventListener('click', function () {
            that.moveUp();
        });
        controlsDiv.getElementsByClassName('glyphicon-arrow-down')[0].parentNode.addEventListener('click', function () {
            that.moveDown();
        });
        controlsDiv.getElementsByClassName('glyphicon-remove')[0].parentNode.addEventListener('click', function () {
            that.hide();
        });
    };
    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     * @return {Base} returns a reference to the instance of Base
     */
    Controls.prototype.hide = function () {
        this.domElem.classList.add('hidden');
        return this;
    };
    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    Controls.prototype.minimize = function () {
        // hide the contents of the div:
        this.domElem.getElementsByTagName('svg')[0].classList.add('hidden');
        // store the current height:
        this.height = this.domElem.clientHeight;
        // resize the div
        this.domElem.style.minHeight = '40px';
        this.domElem.style.height = '40px';
        // cast the event target to an HTMLElement so as not to confuse TypeScript
        var minimButton;
        var myTarget = event.target;
        if (myTarget.tagName === 'BUTTON') {
            // user clicked on the button part
            minimButton = event.target;
        }
        else if (myTarget.tagName === 'SPAN') {
            // user clicked glyph part of the button
            minimButton = myTarget.parentNode;
        }
        else {
        }
        // hide the minimize button
        minimButton.classList.add('hidden');
        var restoreButton = minimButton.nextSibling;
        // show the restore button
        restoreButton.classList.remove('hidden');
        // Not sure this even works
        event.stopPropagation();
    };
    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    Controls.prototype.moveDown = function () {
        var myElem = this.domElem;
        var otherElem = this.domElem.nextElementSibling;
        if (otherElem.tagName === 'DIV') {
            myElem.parentNode.insertBefore(otherElem, myElem);
        }
        else {
            console.error('You\'re already the last element.');
        }
        // Not sure this even works
        event.stopPropagation();
    };
    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    Controls.prototype.moveUp = function () {
        var myElem = this.domElem;
        var otherElem = this.domElem.previousElementSibling;
        if (otherElem.tagName === 'DIV') {
            myElem.parentNode.insertBefore(myElem, otherElem);
        }
        else {
            console.error('You\'re already the first element.');
        }
        // Not sure this even works
        event.stopPropagation();
    };
    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    Controls.prototype.restore = function () {
        // cast the event target to an HTMLElement so as not to confuse TypeScript
        var restoreButton;
        var myTarget = event.target;
        if (myTarget.tagName === 'BUTTON') {
            // user clicked on the button part
            restoreButton = event.target;
        }
        else if (myTarget.tagName === 'SPAN') {
            // user clicked glyph part of the button
            restoreButton = myTarget.parentNode;
        }
        else {
        }
        // hide the restore button
        restoreButton.classList.add('hidden');
        var minimButton = restoreButton.previousSibling;
        // show the minimize button
        minimButton.classList.remove('hidden');
        // restore the original height
        this.domElem.style.height = this.height + 'px';
        // show the contents of the div
        this.domElem.getElementsByTagName('svg')[0].classList.remove('hidden');
        // Not sure this even works
        event.stopPropagation();
    };
    Object.defineProperty(Controls.prototype, "domElem", {
        /**
         * [domElem description]
         * @return {HTMLElement} [description]
         */
        get: function () {
            return this._domElem;
        },
        /**
         * [domElem description]
         * @param  {HTMLElement} domElem [description]
         * @return {[type]}              [description]
         */
        set: function (domElem) {
            this._domElem = domElem;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controls.prototype, "domElemId", {
        /**
         * [domElemId description]
         * @return {string} [description]
         */
        get: function () {
            return this._domElemId;
        },
        /**
         * [domElemId description]
         * @param  {string} domElemId [description]
         * @return {[type]}           [description]
         */
        set: function (domElemId) {
            this._domElemId = domElemId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Controls.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            this._height = height;
        },
        enumerable: true,
        configurable: true
    });
    return Controls;
}());
