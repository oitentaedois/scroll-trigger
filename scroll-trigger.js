(function () {
  'use strict';

  /**
   * Triggers functions when the passed element is shown or hidden by scrolling the page.
   * Multiple scroll triggers may be added to the same element.
   *
   * ```
   *   scrollTrigger(element, {
   *     onShow: callback,
   *     onHide: callback,
   *     topOffset: number,
   *     bottomOffset: number
   *   });
   * ```
   */
  function ScrollTrigger(element, options) {

    if (!element || !options || (!options.onShow && !options.onHide)) {
      return false;
    }

    this.isShowing = false;

    this.element = element;
    this.onShow = options.onShow;
    this.onHide = options.onHide;
    this.topOffset = options.topOffset || 0;
    this.bottomOffset = options.bottomOffset || 0;

    this._getElementOffsets();
    this._checkPosition();
    this._listener = window.addEventListener('scroll', this._onScroll.bind(this));

    return this;

  };
  // get element offsets.
  ScrollTrigger.prototype._getElementOffsets = function () {
    var box = this.element.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    this.elementOffsetTop = Math.round(top);
    this.elementOffsetLeft = Math.round(left);
  };
  // check if element is visible.
  ScrollTrigger.prototype._checkPosition = function () {

    var elementHeight = this.element.offsetHeight;

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;

    var windowBottomIsAboveTop = scrollTop + windowHeight > this.elementOffsetTop - this.topOffset;
    var windowTopIsBelowBottom = scrollTop < this.elementOffsetTop + elementHeight + this.bottomOffset;

    console.log(scrollTop);
    this.visible = (windowBottomIsAboveTop && windowTopIsBelowBottom);
    return this.visible;

  };
  // check if element is visible and trigger callbacks if provided.
  ScrollTrigger.prototype._onScroll = function () {
    
    var wasVisible = this.visible;
    var isVisible = this._checkPosition();

    if (!wasVisible && this.visible) {
      this.onShow && this.onShow();
    } else if (wasVisible && !this.visible) {
      this.onHide && this.onHide();
    }
  };
  // remove listeners.
  ScrollTrigger.prototype.destroy = function () {
    window.removeEventListener('scroll', this._onScroll.bind(this));
  };

  /**
   * API
   */
  window.scrollTrigger = function (element, options) {
    return new ScrollTrigger(element, options);
  };
  
})();
