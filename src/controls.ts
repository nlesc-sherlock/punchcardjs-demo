
class Controls {

    private _domElem: HTMLElement;
    private _domElemId: string;
    private _height: number;


    constructor (domElemId: string) {

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
    protected drawControls(): void {

        let controlsDiv = document.createElement("div");
        controlsDiv.className = "controls";

        controlsDiv.innerHTML =
            "<button type=\"button\" class=\"btn btn-default btn-sm\" data-toggle=\"tooltip\" title=\"Minimizes the widget\">" +
            "    <span class=\"glyphicon glyphicon-triangle-bottom\"></span>" +
            "</button>" +
            "<button type=\"button\" class=\"btn btn-default btn-sm hidden\" data-toggle=\"tooltip\" title=\"Restores the widget\">" +
            "    <span class=\"glyphicon glyphicon-triangle-top\"></span>" +
            "</button>" +
            "<button type=\"button\" class=\"btn btn-default btn-sm\" data-toggle=\"tooltip\" title=\"Moves the widget up\">" +
            "    <span class=\"glyphicon glyphicon-arrow-up\"></span>" +
            "</button>" +
            "<button type=\"button\" class=\"btn btn-default btn-sm\" data-toggle=\"tooltip\" title=\"Moves the widget down\">" +
            "    <span class=\"glyphicon glyphicon-arrow-down\"></span>" +
            "</button>" +
            "<button type=\"button\" class=\"btn btn-default btn-sm\" data-toggle=\"tooltip\" title=\"Closes the widget\">" +
            "    <span class=\"glyphicon glyphicon-remove\"></span>" +
            "</button>";

        this.domElem.appendChild(controlsDiv);

        // beware: JavaScript magic happens here
        let that: Controls = this;

        controlsDiv.getElementsByClassName("glyphicon-triangle-bottom")[0].parentNode.addEventListener("click", function() {
            that.minimize();
        });

        controlsDiv.getElementsByClassName("glyphicon-triangle-top")[0].parentNode.addEventListener("click", function() {
            that.restore();
        });

        controlsDiv.getElementsByClassName("glyphicon-arrow-up")[0].parentNode.addEventListener("click", function() {
            that.moveUp();
        });

        controlsDiv.getElementsByClassName("glyphicon-arrow-down")[0].parentNode.addEventListener("click", function() {
            that.moveDown();
        });

        controlsDiv.getElementsByClassName("glyphicon-remove")[0].parentNode.addEventListener("click", function() {
            that.hide();
        });


    }



    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     * @return {Base} returns a reference to the instance of Base
     */
    protected hide(): Controls {

        this.domElem.classList.add("hidden");
        return this;
    }



    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    protected minimize(): void {

        // hide the contents of the div:
        this.domElem.getElementsByTagName("svg")[0].classList.add("hidden");

        // store the current height:
        this.height = this.domElem.clientHeight;

        // resize the div
        this.domElem.style.minHeight = "40px";
        this.domElem.style.height = "40px";

        // cast the event target to an HTMLElement so as not to confuse TypeScript
        let minimButton: HTMLElement;
        let myTarget: HTMLElement = <HTMLElement>event.target;
        if (myTarget.tagName === "BUTTON") {
            // user clicked on the button part
            minimButton = <HTMLElement>event.target;
        } else if (myTarget.tagName === "SPAN") {
            // user clicked glyph part of the button
            minimButton = <HTMLElement>myTarget.parentNode;
        } else {
            // pass
        }

        // hide the minimize button
        minimButton.classList.add("hidden");

        let restoreButton: HTMLElement = <HTMLElement>minimButton.nextSibling;

        // show the restore button
        restoreButton.classList.remove("hidden");

        // Not sure this even works
        event.stopPropagation();

    }



    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    protected moveDown(): void {

        let myElem = this.domElem;
        let otherElem = this.domElem.nextElementSibling;

        if (otherElem.tagName === "DIV") {
            myElem.parentNode.insertBefore(otherElem, myElem);
        } else {
            console.error("You\'re already the last element.");
        }

        // Not sure this even works
        event.stopPropagation();

    };



    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    protected moveUp(): void {

        let myElem = this.domElem;
        let otherElem = this.domElem.previousElementSibling;

        if (otherElem.tagName === "DIV") {
            myElem.parentNode.insertBefore(myElem, otherElem);
        } else {
            console.error("You\'re already the first element.");
        }

        // Not sure this even works
        event.stopPropagation();

    }



    /**
     * This method is going to be removed from the library in a future release
     * (https://github.com/nlesc-sherlock/punchcardjs/issues/32)
     */
    protected restore(): void {

        // cast the event target to an HTMLElement so as not to confuse TypeScript
        let restoreButton: HTMLElement;
        let myTarget: HTMLElement = <HTMLElement>event.target;
        if (myTarget.tagName === "BUTTON") {
            // user clicked on the button part
            restoreButton = <HTMLElement>event.target;
        } else if (myTarget.tagName === "SPAN") {
            // user clicked glyph part of the button
            restoreButton = <HTMLElement>myTarget.parentNode;
        } else {
            // pass
        }

        // hide the restore button
        restoreButton.classList.add("hidden");

        let minimButton: HTMLElement = <HTMLElement>restoreButton.previousSibling;

        // show the minimize button
        minimButton.classList.remove("hidden");

        // restore the original height
        this.domElem.style.height = this.height + "px";

        // show the contents of the div
        this.domElem.getElementsByTagName("svg")[0].classList.remove("hidden");

        // Not sure this even works
        event.stopPropagation();

    }
    /**
     * [domElem description]
     * @param  {HTMLElement} domElem [description]
     * @return {[type]}              [description]
     */
    public set domElem(domElem: HTMLElement) {
        this._domElem = domElem;
    }

    /**
     * [domElem description]
     * @return {HTMLElement} [description]
     */
    public get domElem(): HTMLElement {
        return this._domElem;
    }

    /**
     * [domElemId description]
     * @param  {string} domElemId [description]
     * @return {[type]}           [description]
     */
    protected set domElemId(domElemId: string) {
        this._domElemId = domElemId;
    }

    /**
     * [domElemId description]
     * @return {string} [description]
     */
    protected get domElemId(): string {
        return this._domElemId;
    }


    protected set height(height: number) {
        this._height = height;
    }

    protected get height(): number {
        return this._height;
    }


}


