# scroll-trigger

Triggers functions when the passed element is shown or hidden by scrolling the page.
A visibleClass property can be passed so the class is toggled based on the element's visiblity.
Multiple scroll triggers may be added to the same element.

```javascript
  scrollTrigger(element, {
    visibleClass: string,
    onShow: callback,
    onHide: callback,
    topOffset: number,
    bottomOffset: number
  });
```
