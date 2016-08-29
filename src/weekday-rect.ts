
import 'crossfilter';
import 'd3';
import 'moment';

import {IDataRow} from './idatarow';
import {Base} from './base';
import {ColorMap} from './colormap';


export class WeekdayRect extends Base {

    private _dayOfWeekScale: d3.scale.Ordinal<any, any>;
    private _xFrom         : number;
    private _xTo           : number;

    /**
     * Constructor method for making a punchcard visualization with the day of
     * week on the horizontal axis, and hour of day on the vertical axis, using
     * rectangular symbols to represent how many rows from the input data fall
     * within the area covered by each rectangle.
     * @param  {CrossFilter.CrossFilter<IDataRow>} cf Crossfilter object
     * containing the data.
     * @param  {string} domElemId Name of the DOM element in which to draw.
     * @return {[type]} A reference to the instance of WeekdayRect.
     */
    constructor (cf: CrossFilter.CrossFilter<IDataRow>, domElemId: string) {

        super(cf, domElemId);

        this.marginBottom = 50;
        this.xlabel = 'Day of week';
        this.title = 'WeekdayRect title';
        this.colormap = new ColorMap('summer');

    }




    /**
     * define the crossfilter dimensions as used by this class
     * @return {WeekdayRect} A reference to the instance of WeekdayRect
     */
    public defineDimensions():WeekdayRect {

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter

        this.dim.weekdayAndHourOfDay = this.cf.dimension(function (d:any) {
            //stringify() and later, parse() to get keyed objects
            let m:moment.Moment = moment(d.datestr);
            return JSON.stringify({
                weekday: m.format('ddd'),
                hourOfDay: m.hour()
            });
        });
        this.canDraw = true;

        return this;
    }




    /**
     * This method defines which other methods to call in order to create
     * a punchcard graph with the day of week on the horizontal axis and the
     * time of day on the vertical axis. Mostly calls methods of the parent
     * class, Base, but for example the symbols for this class are SVG rects,
     * so it calls its own method .drawSymbols() for that.
     *
     * Successful drawing depends on whether the container is currently visible,
     * and whether there is enough information in the instance to draw anything
     * at all.
     *
     * This method overrides stub method in parent class.
     *
     * @return {WeekdayRect} A reference to an instance of WeekdayRect.
     */
    public draw():WeekdayRect {

        if (this.domElem.classList.contains('hidden')) {
            // div is hidden
            return this;
        } else {
            // div is visible
            if (this.canDraw) {
                // dimensions have been defined
                super.drawSvg();
                super.drawChartBody();
                this.drawHorizontalAxis();
                super.drawHorizontalAxisLabel();
                super.drawVerticalAxis();
                super.drawVerticalAxisLabel();
                super.drawTitle();
                this.drawSymbols();
                super.drawBox();
                super.drawControls();
                super.drawLegend();
            }

            return this;
        }
    }




    /**
     * Adds an SVG g element containing a d3.scale.ordinal for plotting
     * the day of the week on the horizontal axis of the punchcard graph.
     * @return {WeekdayRect} A reference to the instance of WeekdayRect.
     */
    private drawHorizontalAxis():WeekdayRect {

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let dx:number = this.marginLeft;
        let dy:number = this.domElem.clientHeight - this.marginBottom;

        let range:Array<number> = [];
        let ndays:number = 7.0;
        for (let r of [0, 0.5, 1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.0]) {
            range.push(w * r / ndays);
        }

        this.dayOfWeekScale = d3.scale.ordinal()
            .range(range)
            .domain(['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', '']);

        let xAxis = d3.svg.axis()
            .orient('bottom')
            .scale(this.dayOfWeekScale)
            .tickValues(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
            .innerTickSize(5)
            .outerTickSize(0);

        this.svg.append('g')
            .attr('class', 'horizontal-axis')
            .attr('transform', 'translate(' + dx + ',' + dy + ')' )
            .call(xAxis);

        return this;

    }



    /**
     * This method adds an SVG g element with many SVG rects in it. Each rect
     * represents the count of how many data rows fall within the area covered
     * by the rect, where the horizontal boundaries dictate the day-of-week and
     * the vertical boundaries dictate the time of day range.
     * @return {WeekdayRect} A reference to the instance of WeekdayRect.
     */
    protected drawSymbols():WeekdayRect {

        // capture the this object
        let that:WeekdayRect = this;

        let w :number = this.domElem.clientWidth - this.marginLeft - this.marginRight - this.legendWidth;
        let h :number = this.domElem.clientHeight - this.marginTop - this.marginBottom;
        let dx:number = this.marginLeft;
        let dy:number = this.marginTop + h;
        let symbolMargin = {left:0, right: 0, top: 0, bottom: 0}; // pixels
        let symbolWidth :number = w / 7 - symbolMargin.left - symbolMargin.right;
        let symbolHeight:number = h / 24 - symbolMargin.top - symbolMargin.bottom;

        // based on example from
        // http://stackoverflow.com/questions/16766986/is-it-possible-to-group-by-multiple-dimensions-in-crossfilter
        // forEach method could be very expensive on write.
        let group = this.dim.weekdayAndHourOfDay.group();
        group.all().forEach(function(d:any) {
            //parse the json string created above
            d.key = JSON.parse(d.key);
        });
        let data:any = group.all();


        // determine the min and max in the count in order to set the color
        // limits on the colormap later
        let lowest = Number.POSITIVE_INFINITY;
        let highest = Number.NEGATIVE_INFINITY;
        for (let elem of data) {
            if (elem.value < lowest) {
                lowest = elem.value;
            }
            if (elem.value > highest) {
                highest = elem.value;
            }
        }
        this.colormap.cLimLow = lowest;
        this.colormap.cLimHigh = highest;


        // draw the rects
        this.svg
            .append('g')
            .attr('class', 'symbol')
            .attr('transform', 'translate(' + dx + ',' + dy + ')')
            .selectAll('rect.symbol')
                .data(data)
                .enter()
                .append('rect')
                    .attr('class', 'symbol')
                    .attr('x', function(d:any){
                        return that.dayOfWeekScale(d.key['weekday']) - symbolWidth / 2;
                    })
                    .attr('y', function(d:any){
                        return that.todScale(d.key['hourOfDay']);
                    })
                    .attr('width', symbolWidth)
                    .attr('height', symbolHeight)
                    .attr('fill', function(d:any){
                        return that.colormap.getColorRGB(d.value);
                    });

        return this;
    }




    protected set dayOfWeekScale(dayOfWeekScale:d3.scale.Ordinal<any, any>) {
        this._dayOfWeekScale = dayOfWeekScale;
    }

    protected get dayOfWeekScale():d3.scale.Ordinal<any, any> {
        return this._dayOfWeekScale;
    }

    protected set xFrom(xFrom:number) {
        this._xFrom = xFrom;
    }

    protected get xFrom():number {
        return this._xFrom;
    }

    protected set xTo(xTo:number) {
        this._xTo = xTo;
    }

    protected get xTo():number {
        return this._xTo;
    }



}


