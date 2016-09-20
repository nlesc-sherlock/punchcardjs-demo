var DataLoader = (function () {
    function DataLoader() {
        // the location of the API
        this._baseurl = "https://data.cityofchicago.org/resource/ijzp-q8t2.json";
        // the maximum number of results
        this._limit = 10;
        // where to start when returning records (0 = most recent)
        this._offset = 0;
        // which column to include, and how each should be called
        this._select = "case_number AS casenumber, date AS datestr, description, primary_type AS primary, latitude, longitude";
        // set the default "where" condition string
        this._where = "";
        // build the query with the default options:
        this.buildQuery();
    }
    DataLoader.prototype.loadData = function (callback) {
        // capture the 'this' object from the current context
        var that = this;
        var xmlHttp = new XMLHttpRequest();
        // define what to do after the data has been downloaded successfully
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.status === 429) {
                console.log("Throttle limit exceeded. See 'https://dev.socrata.com/docs/" +
                    "app-tokens.html#throttling-limits' for more information.");
            }
            if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
                that._data = JSON.parse(xmlHttp.responseText);
                // execute the callback
                callback(that._data);
            }
        };
        // make the actual request
        xmlHttp.open("GET", this._query, true); // true for asynchronous
        // not sure what this is...end the connection?
        xmlHttp.send(null);
    };
    DataLoader.prototype.buildQuery = function () {
        // see also:
        // https://dev.socrata.com/docs/functions/#,
        // for more on SoQL functions
        this._query = this._baseurl + "?" +
            "&" + "$order=date" +
            "&" + "$limit=" + (this._limit) +
            "&" + "$offset=" + (this._offset) +
            "&" + "$select=" + (this._select) +
            "&" + "$where=" + (this._where);
    };
    Object.defineProperty(DataLoader.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "limit", {
        get: function () {
            return this._limit;
        },
        set: function (limit) {
            this._limit = limit;
            this.buildQuery();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataLoader.prototype, "offset", {
        get: function () {
            return this._offset;
        },
        set: function (offset) {
            this._offset = offset;
            this.buildQuery();
        },
        enumerable: true,
        configurable: true
    });
    return DataLoader;
}());
