(function () {
    "use strict";
    var fullScroll = function (params) {
        var main = document.getElementById("main");
        var sections = main.getElementsByTagName("section");
        var defaults = {
            container: main,
            sections: sections,
            animateTime: params.animateTime || 0.7,
            animateFunction: params.animateFunction || "ease",
            maxPosition: sections.length - 1,
            currentPosition: 0,
            displayDots: typeof params.displayDots != "undefined" ? params.displayDots : true,
            dotsPosition: params.dotsPosition || "left",
            move:1,
            change:0
        };
        this.defaults = defaults;
        this.init();
    };
    fullScroll.prototype.init = function () {
        this.buildSections().buildDots().buildPublicFunctions().addEvents();
        var anchor = location.hash.replace("#", "").split("/")[0];
        location.hash = 0;
        this.changeCurrentPosition(anchor);
    };
    fullScroll.prototype.buildSections = function () {
        var sections = this.defaults.sections;
        for (var i = 0; i < sections.length; i++) {
            sections[i].setAttribute("data-index", i);
        }
        return this;
    };
    fullScroll.prototype.buildDots = function () {
        this.ul = document.createElement("ul");
        this.ul.classList.add("dots");
        this.ul.classList.add(this.defaults.dotsPosition == "right" ? "dots-right" : "dots-left");
        var _self = this;
        var sections = this.defaults.sections;
        for (var i = 0; i < sections.length; i++) {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.setAttribute("href", "#" + i);
            li.appendChild(a);
            _self.ul.appendChild(li);
        }
        this.ul.childNodes[0].firstChild.classList.add("active");
        if (this.defaults.displayDots) {
            document.body.appendChild(this.ul);
        }
        return this;
    };
    fullScroll.prototype.addEvents = function () {
        if (document.addEventListener) {
            document.addEventListener("mousewheel", this.mouseWheelAndKey, false);
            document.addEventListener("wheel", this.mouseWheelAndKey, false);
            document.addEventListener("keyup", this.mouseWheelAndKey, false);
            document.addEventListener("touchstart", this.touchStart, false);
            document.addEventListener("touchend", this.touchEnd, false);
            window.addEventListener("hashchange", this.hashChange, false);
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                if (!("ontouchstart" in window)) {
                    document.body.style = "overflow: scroll;";
                    document.documentElement.style = "overflow: scroll;";
                }
            }
        } else {
            document.attachEvent("onmousewheel", this.mouseWheelAndKey, false);
            document.attachEvent("onkeyup", this.mouseWheelAndKey, false);
        }
        return this;
    };
    fullScroll.prototype.buildPublicFunctions = function () {
        var mTouchStart = 0;
        var mTouchEnd = 0;
        var _self = this;
        this.mouseWheelAndKey = function (event) {
            if (event.deltaY > 0 || event.keyCode == 40) {
       
                if(_self.defaults.currentPosition == 1 && _self.defaults.change  == 0 ) {
                    $('.user-growth').addClass('hide-text-by-animate').removeClass('display-text-by-animate');
                    $('.team-content').addClass('display-text-by-animate').removeClass('hide-text-by-animate');
                    _self.defaults.change = 1;
                } else {
                    _self.defaults.change = 0;
                    _self.defaults.currentPosition++;
                }



                _self.defaults.move = 1;
                _self.changeCurrentPosition(_self.defaults.currentPosition);
            } else if (event.deltaY < 0 || event.keyCode == 38) {

                if(_self.defaults.currentPosition == 1 && _self.defaults.change  == 0 ) {
                    $('.team-content').addClass('hide-text-by-animate').removeClass('display-text-by-animate');
                    $('.user-growth').addClass('display-text-by-animate').removeClass('hide-text-by-animate');
                    _self.defaults.change = 1;
                } else {
                    _self.defaults.change = 0;
                    _self.defaults.currentPosition--;

                }
                _self.defaults.move = 0;
                _self.changeCurrentPosition(_self.defaults.currentPosition);
            }
            _self.removeEvents();
        };
        this.touchStart = function (event) {
            mTouchStart = parseInt(event.changedTouches[0].clientY);
            mTouchEnd = 0;
        };
      this.touchEnd = function (event) {
            mTouchEnd = parseInt(event.changedTouches[0].clientY);
            if (mTouchEnd - mTouchStart > 100 || mTouchStart - mTouchEnd > 100) {
                alert('touch event start');
                if (mTouchEnd > mTouchStart) {
                    _self.defaults.currentPosition--;
                } else {
                    _self.defaults.currentPosition++;
                }
                _self.changeCurrentPosition(_self.defaults.currentPosition);
            }
        };
        this.hashChange = function (event) {
            if (location) {
                var anchor = location.hash.replace("#", "").split("/")[0];


                if (anchor !== "") {
                    if (anchor < 0) {
                        _self.changeCurrentPosition(0);
                    } else if (anchor > _self.defaults.maxPosition) {
                        _self.changeCurrentPosition(_self.defaults.maxPosition);
                    } else {

                        let previsousPos = _self.defaults.currentPosition;
                        _self.defaults.currentPosition = anchor;

                        console.log(previsousPos,_self.defaults.change, _self.defaults.move )

                        ///// New Code //////////////
                      /*  if(previsousPos == 2 && _self.defaults.change  == 0 && _self.defaults.move == 1) {
                            $('.user-growth').addClass('hide-text-by-animate').removeClass('display-text-by-animate');
                            $('.team-content').addClass('display-text-by-animate').removeClass('hide-text-by-animate');
                            _self.changeCurrentPosition(previsousPos);
                            _self.defaults.change = 1;
                        } else if(previsousPos == 2 && _self.defaults.change  == 0 && _self.defaults.move == 0) {
                            $('.team-content').addClass('hide-text-by-animate').removeClass('display-text-by-animate');
                            $('.user-growth').addClass('display-text-by-animate').removeClass('hide-text-by-animate');
                            _self.defaults.change = 1;
                        } else {

                            if(previsousPos == 3 && previsousPos == 1) {
                                $('.team-content').removeClass('hide-text-by-animate').removeClass('display-text-by-animate');
                                $('.user-growth').removeClass('display-text-by-animate').removeClass('hide-text-by-animate');
                                _self.defaults.change = 0;
                            }
                            _self.animateScroll();

                        }*/
                        _self.animateScroll();
                    }
                }
            }
        };
        this.removeEvents = function () {
            if (document.addEventListener) {
                document.removeEventListener("mousewheel", this.mouseWheelAndKey, false);
                document.removeEventListener("wheel", this.mouseWheelAndKey, false);
                document.removeEventListener("keyup", this.mouseWheelAndKey, false);
                document.removeEventListener("touchstart", this.touchStart, false);
                document.removeEventListener("touchend", this.touchEnd, false);
            } else {
                document.detachEvent("onmousewheel", this.mouseWheelAndKey, false);
                document.detachEvent("onkeyup", this.mouseWheelAndKey, false);
            }
            setTimeout(function () {
                _self.addEvents();
            }, 600);
        };
        this.animateScroll = function () {
            var animateTime = this.defaults.animateTime;
            var animateFunction = this.defaults.animateFunction;
            var position = this.defaults.currentPosition * 100;
            this.defaults.container.style.webkitTransform = "translateY(-" + position + "%)";
            this.defaults.container.style.mozTransform = "translateY(-" + position + "%)";
            this.defaults.container.style.msTransform = "translateY(-" + position + "%)";
            this.defaults.container.style.transform = "translateY(-" + position + "%)";
            this.defaults.container.style.webkitTransition = "all " + animateTime + "s " + animateFunction;
            this.defaults.container.style.mozTransition = "all " + animateTime + "s " + animateFunction;
            this.defaults.container.style.msTransition = "all " + animateTime + "s " + animateFunction;
            this.defaults.container.style.transition = "all " + animateTime + "s " + animateFunction;
            for (var i = 0; i < this.ul.childNodes.length; i++) {
                this.ul.childNodes[i].firstChild.classList.remove("active");
                if (i == this.defaults.currentPosition) {
                    this.ul.childNodes[i].firstChild.classList.add("active");
                }
            }
        };
        this.changeCurrentPosition = function (position) {
            if (position !== "") {
                _self.defaults.currentPosition = position;
                location.hash = _self.defaults.currentPosition;
            }
        };
        return this;
    };
    window.fullScroll = fullScroll;
})();
