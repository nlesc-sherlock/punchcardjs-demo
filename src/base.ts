import 'crossfilter';
import 'd3';


import {IDataRow} from './idatarow';
import {ColorMap} from './colormap';
import {Legend} from './legend';


/**
 * This is the base class for all punchcards. It provides the methods that are
 * shared between all punchcards, such as drawing of the vertical axis (which is
 * always hour of day), drawing of the background box, generation of the SVG DOM
 * element, and so on.
 */
export class Base {

    /**
     * The crossfilter that contains the data which needs to be visualized.
     * @type {CrossFilter.CrossFilter<IDataRow>}
     */
    private _cf          : CrossFilter.CrossFilter<IDataRow>;
    /**
     * The colormap: i.e. the element that determines what color is used to
     * display a certain value.
     * @type {ColorMap}
     */
    private _colormap    : ColorMap;
    /**
     * The user-defined dimensions that are used to manipulate the crossfilter
     * data.
     * @type {any}
     */
    private _dim         : any;
    /**
     * The element of the DOM where the punchcard should be visualized.
     * @type {HTMLElement}
     */
    private _domElem     : HTMLElement;
    /**
     * The element ID of the this._domElem object.
     * @type {string}
     */
    private _domElemId   : string;
    /**
     * The SVG DOM element that is used to draw a punchcard in.
     * @type {any}
     */
    private _svg         : any;
    /**
     * The space in pixels between the left side of axis background and edge of
     * the SVG element.
     * @type {number}
     */
    private _marginLeft  : number;
    /**
     * [_marginRight description]
     * @type {number}
     */
    private _marginRight : number;
    /**
     * [_marginTop description]
     * @type {number}
     */
    private _marginTop   : number;
    /**
     * [_marginBottom description]
     * @type {number}
     */
    private _marginBottom: number;
    /**
     * [_title description]
     * @type {string}
     */
    private _title       : string;
    /**
     * [_xlabel description]
     * @type {string}
     */
    private _xlabel      : string;
    /**
     * [_ylabel description]
     * @type {string}
     */
    private _ylabel      : string;
    /**
     * [_todScale description]
     * @type {any}
     */
    private _todScale    : any;
    /**
     * [_height description]
     * @type {number}
     */
    private _height      : number;
    /**
     * [_legendWidth description]
     * @type {number}
     */
    private _legendWidth : number;
    /**
     * [_canDraw description]
     * @type {boolean}
     */
    private _canDraw : boolean;


    /**
     * [constructor description]
     * @param  {any}    cf        [description]
     * @param  {string} domElemId [description]
     * @return {[type]}           [description]
     */
    constructor (cf: any, domElemId: string) {

        // the crossfilter object
        this.cf = cf;

        // the name of the DOM element
        this.domElemId = domElemId;

        // the DOM element by ID
        this.domElem = document.getElementById(this.domElemId);

        // all the dimensions are collected into one object, dim, which is
        // initialized here:
        this.dim = {};

        // can only draw stuff after user has defined some dimensions
        this.canDraw = false;

        // the margins around the graph body
        this.marginLeft = 70;
        this.marginRight = 30;
        this.marginTop = 50;
        this.marginBottom = 110;
        this.legendWidth = 80;

        this.ylabel = 'Time of day';
        this.title = '';

        this.colormap = new ColorMap();

        // beware: JavaScript magic happens here
        let that:Base = this;
        window.addEventListener('resize', function() {
            that.onResize();
        });
    }




    /**
     * [draw description]
     * @return {Base} [description]
     */
    public draw():Base {

        // placeholder method to be overridden in classes that inherit from this class
        return this;
    }



    /**
     * [drawBox description]
     * @return {Base} [description]
     */
    protected drawBox():Base {
        //
        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop;


        this.svg.append('g')
            .attr('class', 'chartbody-box')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .append('rect')
                .attr('width', w)
                .attr('height', h)
                .attr('class', 'chartbody-box');

        return this;
    }



    /**
     * [drawControls description]
     */
    protected drawControls():void {

        let controlsDiv = document.createElement('div');
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
        let that:Base = this;

        controlsDiv.getElementsByClassName('glyphicon-triangle-bottom')[0].parentNode.addEventListener('click', function() {
            that.minimize();
        });

        controlsDiv.getElementsByClassName('glyphicon-triangle-top')[0].parentNode.addEventListener('click', function() {
            that.restore();
        });

        controlsDiv.getElementsByClassName('glyphicon-arrow-up')[0].parentNode.addEventListener('click', function() {
            that.moveUp();
        });

        controlsDiv.getElementsByClassName('glyphicon-arrow-down')[0].parentNode.addEventListener('click', function() {
            that.moveDown();
        });

        controlsDiv.getElementsByClassName('glyphicon-remove')[0].parentNode.addEventListener('click', function() {
            that.hide();
        });


    }



    /**
     * [drawChartBody description]
     * @return {Base} [description]
     */
    protected drawChartBody():Base {
        //
        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop;


        this.svg.append('g')
            .attr('class', 'chartbody')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .append('rect')
                .attr('width', w)
                .attr('height', h)
                .attr('class', 'chartbody');

        return this;
    }



    /**
     * [drawHorizontalAxisLabel description]
     * @return {Base} [description]
     */
    protected drawHorizontalAxisLabel():Base {

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft + 0.5 * w;
        let dy:number = this.marginTop + h + 0.8 * this.marginBottom;

        this.svg.append('g')
            .attr('class', 'horizontal-axis-label')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .append('text')
            .text(this.xlabel)
            .attr('class', 'horizontal-axis-label');

        return this;
    }



    /**
     * [drawLegend description]
     * @return {Base} [description]
     */
    protected drawLegend():Base {
        // draw the legend

        let legend:Legend = new Legend(this);
        legend.draw();


        return this;
    }



    /**
     * [drawSvg description]
     * @return {Base} [description]
     */
    protected drawSvg():Base {

        this.svg = d3.select(this.domElem).append('svg')
            .attr('width', this.domElem.clientWidth)
            .attr('height', this.domElem.clientHeight);

        return this;
    }



    /**
     * [drawTitle description]
     * @return {Base} [description]
     */
    protected drawTitle():Base {

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let dx:number = this.marginLeft + 0.5 * w;
        let dy:number = 0.5 * this.marginTop;

        this.svg.append('g')
            .attr('class', 'title')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .append('text')
            .text(this.title)
            .attr('class', 'title');

        return this;
    }



    /**
     * [drawVerticalAxis description]
     * @return {Base} [description]
     */
    protected drawVerticalAxis():Base {
        //
        let dx:number = this.marginLeft;
        let dy:number = this.domElem.clientHeight - this.marginBottom;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;


        this.todScale = d3.scale.linear()
            .range([-h, 0])
            .domain([0.0, 24.0]);

        let todAxis = d3.svg.axis()
            .orient('left')
            .scale(this.todScale)
            .tickValues([0, 3, 6, 9, 12, 15, 18, 21, 24])
            .innerTickSize(5)
            .outerTickSize(0);

        this.svg.append('g')
            .attr('class', 'vertical-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .call(todAxis);

        return this;

    }



    /**
     * [drawVerticalAxisLabel description]
     * @return {Base} [description]
     */
    protected drawVerticalAxisLabel():Base {
        //
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = 0.3 * this.marginLeft;
        let dy:number = this.marginTop + 0.5 * h;

        this.svg.append('g')
            .attr('class', 'vertical-axis-label')
            .attr('transform', 'translate(' + dx + ',' + dy + ') rotate(-90)')
            .append('text')
            .text(this.ylabel)
            .attr('class', 'vertical-axis-label');

        return this;

    }



    /**
     * [hide description]
     * @return {Base} [description]
     */
    protected hide():Base {

        this.domElem.classList.add('hidden');
        return this;
    }



    /**
     * [minimize description]
     */
    protected minimize():void {

        // hide the contents of the div:
        this.domElem.getElementsByTagName('svg')[0].classList.add('hidden');

        // store the current height:
        this.height = this.domElem.clientHeight;

        // resize the div
        this.domElem.style.minHeight = '40px';
        this.domElem.style.height = '40px';

        // cast the event target to an HTMLElement so as not to confuse TypeScript
        let minimButton: HTMLElement;
        let myTarget: HTMLElement = <HTMLElement>event.target;
        if (myTarget.tagName === 'BUTTON') {
            // user clicked on the button part
            minimButton = <HTMLElement>event.target;
        } else if (myTarget.tagName === 'SPAN') {
            // user clicked glyph part of the button
            minimButton = <HTMLElement>myTarget.parentNode;
        } else {
            // pass
        }

        // hide the minimize button
        minimButton.classList.add('hidden');

        let restoreButton: HTMLElement = <HTMLElement>minimButton.nextSibling;

        // show the restore button
        restoreButton.classList.remove('hidden');

        // Not sure this even works
        event.stopPropagation();

    }



    /**
     * [moveDown description]
     */
    protected moveDown():void {

        let myElem = this.domElem;
        let otherElem = this.domElem.nextElementSibling;

        if (otherElem.tagName === 'DIV') {
            myElem.parentNode.insertBefore(otherElem, myElem);
        } else {
            console.error('You\'re already the last element.');
        }

        // Not sure this even works
        event.stopPropagation();

    }



    /**
     * [moveUp description]
     */
    protected moveUp():void {

        let myElem = this.domElem;
        let otherElem = this.domElem.previousElementSibling;

        if (otherElem.tagName === 'DIV') {
            myElem.parentNode.insertBefore(myElem, otherElem);
        } else {
            console.error('You\'re already the first element.');
        }

        // Not sure this even works
        event.stopPropagation();

    }



    /**
     * [onResize description]
     * @return {[type]} [description]
     */
    protected onResize() {

        // get the div element that we want to redraw
        let div = this.domElem;

        // delete the contents of the div
        while (div.firstChild) {
            div.removeChild(div.firstChild);
        }

        this.draw();

    }



    /**
     * [restore description]
     */
    protected restore():void {

        // cast the event target to an HTMLElement so as not to confuse TypeScript
        let restoreButton: HTMLElement;
        let myTarget: HTMLElement = <HTMLElement>event.target;
        if (myTarget.tagName === 'BUTTON') {
            // user clicked on the button part
            restoreButton = <HTMLElement>event.target;
        } else if (myTarget.tagName === 'SPAN') {
            // user clicked glyph part of the button
            restoreButton = <HTMLElement>myTarget.parentNode;
        } else {
            // pass
        }

        // hide the restore button
        restoreButton.classList.add('hidden');

        let minimButton: HTMLElement = <HTMLElement>restoreButton.previousSibling;

        // show the minimize button
        minimButton.classList.remove('hidden');

        // restore the original height
        this.domElem.style.height = this.height + 'px';

        // show the contents of the div
        this.domElem.getElementsByTagName('svg')[0].classList.remove('hidden');

        // Not sure this even works
        event.stopPropagation();

    }



    /**
     * [updateMinHeight description]
     * @return {Base} [description]
     */
    private updateMinHeight():Base {

        let top:number = this.marginTop;
        let bottom:number = this.marginBottom;

        if (typeof top === 'undefined' || top < 0) {
            top = 0;
        }

        if (typeof bottom === 'undefined' || bottom < 0) {
            bottom = 0;
        }

        this.domElem.style.minHeight = (top + bottom + 100).toString() + 'px';

        return this;
    }



    /**
     * [updateMinWidth description]
     * @return {Base} [description]
     */
    private updateMinWidth():Base {

        let left:number = this.marginLeft;
        let right:number = this.marginRight;

        if (typeof left === 'undefined' || left < 0) {
            left = 0;
        }

        if (typeof right === 'undefined' || right < 0) {
            right = 0;
        }

        this.domElem.style.minWidth = (left + right + 100).toString() + 'px';

        return this;
    }



    /**
     * [cf description]
     * @param  {any}    cf [description]
     * @return {[type]}    [description]
     */
    protected set cf(cf:any) {
        this._cf = cf;
    }

    /**
     * [cf description]
     * @return {any} [description]
     */
    protected get cf():any {
        return this._cf;
    }

    /**
     * [colormap description]
     * @param  {ColorMap} colormap [description]
     * @return {[type]}            [description]
     */
    public set colormap(colormap:ColorMap) {
        this._colormap = colormap;
    }

    /**
     * [colormap description]
     * @return {ColorMap} [description]
     */
    public get colormap():ColorMap {
        return this._colormap;
    }

    /**
     * [dim description]
     * @param  {any}    dim [description]
     * @return {[type]}     [description]
     */
    protected set dim(dim:any) {
        this._dim = dim;
    }

    /**
     * [dim description]
     * @return {any} [description]
     */
    protected get dim():any {
        return this._dim;
    }

    /**
     * [domElem description]
     * @param  {HTMLElement} domElem [description]
     * @return {[type]}              [description]
     */
    public set domElem(domElem:HTMLElement) {
        this._domElem = domElem;
    }

    /**
     * [domElem description]
     * @return {HTMLElement} [description]
     */
    public get domElem():HTMLElement {
        return this._domElem;
    }

    /**
     * [domElemId description]
     * @param  {string} domElemId [description]
     * @return {[type]}           [description]
     */
    protected set domElemId(domElemId:string) {
        this._domElemId = domElemId;
    }

    /**
     * [domElemId description]
     * @return {string} [description]
     */
    protected get domElemId():string {
        return this._domElemId;
    }

    /**
     * [svg description]
     * @param  {any}    svg [description]
     * @return {[type]}     [description]
     */
    public set svg(svg:any) {
        this._svg = svg;
    }

    /**
     * [svg description]
     * @return {any} [description]
     */
    public get svg():any {
        return this._svg;
    }

    /**
     * [marginLeft description]
     * @param  {number} marginLeft [description]
     * @return {[type]}            [description]
     */
    public set marginLeft(marginLeft:number) {
        this._marginLeft = marginLeft;
        this.updateMinWidth();
    }

    /**
     * [marginLeft description]
     * @return {number} [description]
     */
    public get marginLeft():number {
        return this._marginLeft;
    }

    /**
     * [marginRight description]
     * @param  {number} marginRight [description]
     * @return {[type]}             [description]
     */
    public set marginRight(marginRight:number) {
        this._marginRight = marginRight;
        this.updateMinWidth();
    }

    /**
     * [marginRight description]
     * @return {number} [description]
     */
    public get marginRight():number {
        return this._marginRight;
    }

    /**
     * [marginTop description]
     * @param  {number} marginTop [description]
     * @return {[type]}           [description]
     */
    public set marginTop(marginTop:number) {
        this._marginTop = marginTop;
        this.updateMinHeight();
    }

    /**
     * [marginTop description]
     * @return {number} [description]
     */
    public get marginTop():number {
        return this._marginTop;
    }

    /**
     * [marginBottom description]
     * @param  {number} marginBottom [description]
     * @return {[type]}              [description]
     */
    public set marginBottom(marginBottom:number) {
        this._marginBottom = marginBottom;
        this.updateMinHeight();
    }

    /**
     * [marginBottom description]
     * @return {number} [description]
     */
    public get marginBottom():number {
        return this._marginBottom;
    }

    /**
     * [title description]
     * @param  {string} title [description]
     * @return {[type]}       [description]
     */
    protected set title(title:string) {
        this._title = title;
    }

    /**
     * [title description]
     * @return {string} [description]
     */
    protected get title():string {
        return this._title;
    }

    /**
     * [xlabel description]
     * @param  {string} xlabel [description]
     * @return {[type]}        [description]
     */
    protected set xlabel(xlabel:string) {
        this._xlabel = xlabel;
    }

    /**
     * [xlabel description]
     * @return {string} [description]
     */
    protected get xlabel():string {
        return this._xlabel;
    }

    /**
     * [ylabel description]
     * @param  {string} ylabel [description]
     * @return {[type]}        [description]
     */
    protected set ylabel(ylabel:string) {
        this._ylabel = ylabel;
    }

    /**
     * [ylabel description]
     * @return {string} [description]
     */
    protected get ylabel():string {
        return this._ylabel;
    }

    /**
     * [todScale description]
     * @param  {any}    todScale [description]
     * @return {[type]}          [description]
     */
    protected set todScale(todScale:any) {
        this._todScale = todScale;
    }

    /**
     * [todScale description]
     * @return {any} [description]
     */
    protected get todScale():any {
        return this._todScale;
    }

    /**
     * [height description]
     * @param  {number} height [description]
     * @return {[type]}        [description]
     */
    protected set height(height:number) {
        this._height = height;
    }

    /**
     * [height description]
     * @return {number} [description]
     */
    protected get height():number {
        return this._height;
    }

    /**
     * [legendWidth description]
     * @param  {number} legendWidth [description]
     * @return {[type]}             [description]
     */
    public set legendWidth(legendWidth:number) {
        let minimumWidth:number = 50;
        this._legendWidth = Math.max(legendWidth, 50);
    }

    /**
     * [legendWidth description]
     * @return {number} [description]
     */
    public get legendWidth():number {
        return this._legendWidth;
    }

    /**
     * [canDraw description]
     * @param  {boolean} canDraw [description]
     * @return {[type]}             [description]
     */
    public set canDraw(canDraw:boolean) {
        this._canDraw = canDraw;
    }

    /**
     * [canDraw description]
     * @return {boolean} [description]
     */
    public get canDraw():boolean {
        return this._canDraw;
    }

}


