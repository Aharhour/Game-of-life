//table function
(function () {
    var FakePoller = function(options, callback) {
        var defaults = {
            frequency: 60,
            limit: 10
        };
        this.callback = callback;
        this.config = extend(defaults, options);
        this.list = [
            'Game of Thrones',
            'The Walking Dead',
            'Survivor',
            'Dead Like Me',
            'Being Human',
            'American Idol',
            'X Factor',
            'Firefly',
            'SGU',
            'Battlestar Galactica',
            'Farscape',
            'The Mentalist',
            'True Blood',
            'Dexter',
            'Rick Astley'
        ];
    };

    FakePoller.prototype.getData = function() {
        var results = [];
        for (var i = 0, len = this.list.length; i < len; i++) {
            results.push({
                name: this.list[i],
                count: rnd(0, 2000)
            });
        }
        return results;
    };

    FakePoller.prototype.processData = function() {
        return this.sortData(this.getData()).slice(0, this.config.limit);
    };

    FakePoller.prototype.sortData = function(data) {
        return data.sort(function(a, b) {
            return b.count - a.count;
        });
    };

    FakePoller.prototype.start = function() {
        var _this = this;
        this.interval = setInterval(function() {
            _this.callback(_this.processData());
        }, this.config.frequency * 1000);
        this.callback(this.processData());
        return this;
    };

    FakePoller.prototype.stop = function() {
        clearInterval(this.interval);
        return this;
    };

    window.FakePoller = FakePoller;

    var Leaderboard = function (elemId, options) {
        var _this = this;
        var defaults = {
            limit: 10,
            frequency: 15
        };
        this.currentItem = 0;
        this.currentCount = 0;
        this.config = extend(defaults, options);

        this.$elem = document.querySelector(elemId);
        if (!this.$elem) {
            this.$elem = document.createElement('div');
            document.body.appendChild(this.$elem);
        }

        this.list = [];
        this.$content = document.createElement('ul');
        this.$elem.appendChild(this.$content);

        this.poller = new FakePoller({frequency: this.config.frequency, limit: this.config.limit}, function (data) {
            if (data) {
                if (_this.currentCount !== data.length) {
                    _this.buildElements(_this.$content, data.length);
                }
                _this.currentCount = data.length;
                _this.data = data;
                _this.list[0].$item.classList.add('animate');
            }
        });

        this.poller.start();
    };

    Leaderboard.prototype.buildElements = function($ul, elemSize) {
        var _this = this;
        $ul.innerHTML = '';
        this.list = [];

        for (var i = 0; i < elemSize; i++) {
            var item = document.createElement('li');
            item.addEventListener("animationend", eventAnimationEnd.bind(this));
            item.addEventListener("webkitAnimationEnd", eventAnimationEnd.bind(this));
            item.addEventListener("oAnimationEnd", eventAnimationEnd.bind(this));
            $ul.appendChild(item);
            this.list.push({
                $item: item,
                $name: createAndAppend('span', 'name', 'Loading...', item),
                $count: createAndAppend('span', 'count', 'Loading...', item)
            });
        }

        function eventAnimationEnd(evt) {
            this.list[this.currentItem].$name.textContent = _this.data[this.currentItem].name;
            this.list[this.currentItem].$count.textContent = _this.data[this.currentItem].count;
            this.list[this.currentItem].$item.classList.remove('animate');
            this.currentItem = this.currentItem >= this.currentCount - 1 ? 0 : this.currentItem + 1;
            if (this.currentItem !== 0) {
                this.list[this.currentItem].$item.classList.add('animate');
            }
        }
    };

    window.Leaderboard = Leaderboard;

    function extend(defaults, options) {
        var extended = {};
        for (var prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (var prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    }

    function rnd(min, max) {
        min = min || 100;
        if (!max) {
            max = min;
            min = 1;
        }
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function numberFormat(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function createAndAppend(tag, className, text, parent) {
        var element = document.createElement(tag);
        element.className = className;
        element.textContent = text;
        parent.appendChild(element);
        return element;
    }

    
    document.addEventListener("DOMContentLoaded", function () {
        var myLeaderboard = new Leaderboard(".content", { limit: 8, frequency: 8 });
    });
})();
