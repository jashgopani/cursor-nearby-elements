# cursor-nearby-elements
## This package helps you find elements near cursor position


[![GitHub issues](https://img.shields.io/github/issues/jashgopani/cursor-nearby-elements)](https://github.com/jashgopani/cursor-nearby-elements/issues) [![GitHub forks](https://img.shields.io/github/forks/jashgopani/cursor-nearby-elements)](https://github.com/jashgopani/cursor-nearby-elements/network) [![GitHub stars](https://img.shields.io/github/stars/jashgopani/cursor-nearby-elements)](https://github.com/jashgopani/cursor-nearby-elements/stargazers) [![GitHub license](https://img.shields.io/github/license/jashgopani/cursor-nearby-elements)](https://github.com/jashgopani/cursor-nearby-elements/blob/main/LICENSE)


### Features
* Find all elements near the cursor.
* Filter the nearby elements based on some conditions.
* Modify the nearby elements i.e change styles / innerHTML without iterating over them seperately
* Fine tune the searching process by changing the number of directions, number of points in each direction and radius of the region around cursor.

### Installation
```
npm i cursor-nearby-elements
```
### Getting Started
Import the method using `require` method and save the `nearbyElements` method in some variable.
```javascript
const nearby = require('cursor-nearby-elements').nearbyElements();
```

#### Visual representation of the parameters
![Multiple points on radius](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/dumqs1k2xh1uuh1z9y5i.png)


> ***Note:*** Arguments inside *[ ]* are optional
#### *nearbyElements ([directions,offset])*
 This method helps you to set the parameters for calculations that are carried out for finding nearby elements
 
 * ##### Arguments 
   - **directions:** The number of directions around the cursor to look for elements. ( *Default value is **8*** )(_no. of green radius lines in the fig above_)
   - **offset:**  The radius of the region around the cursor. Elements falling within this radius will be captured ( *Default value is **69*** )(_the value of radius itself in the fig above_)
 * ##### Returns
   - **nearby Method:** This function is responsible for returning the elements nearby. Read below for detailed explanation.

####  *nearby (event, [ predicate, modifier, offsetPoints, shouldSkipAngle ])* 
This method takes an `event` object as a mandatory argument and returns an `Array of DOM Elements`

 * ##### Arguments 
   - **event:** Event object which is received in event handler
   - **predicate:**  This is a **function** that checks the DOM elements for specific condition and based on the return value, the elements is either added to the final array or discarded. *This method should strictly return boolean value*. `true` denotes that element will be selected else discarded.
   - **modifier** This is a **function** that modifies the original DOM Element and returns the modified DOM elements. Modifications can be anything; you can think of this as a `map function` for DOM Element
   - **offsetPoints** This is an **array of fractions** where each fraction is a position on the radius line (The green dots in the figure below). These are the points where the code will check for elements. By default, the fraction is **1** i.e the points on circumference of the red region. When passing the array, make sure to include all the positions you want to check for between 0 - the cursor position up to 1 - The point at offset distance inclusive.(_green dots on each radius/direction line; 0.25 and 1 in the fig above_)
   - **shouldSkipAngle:** This is also a function that gets 2 arguments ; `angle (in radians) , index`. The index is the index of the array containing angle values. You can skip some angles (directions indirectly) based on some conditions based on angle value or index value ; while checking for elements. Return true if you want to skip the angle else false.
 * ##### Returns
   - **Array:** Array of nearby DOM Elements

### Example
nearby function

```javascript
function handleMouseMove(e) {
    //filtering nearby elements since I don't want my container element to be returned as nearby element
    //I only want elements with class targets
    const predicate = (el) => {
        return (
            !el.classList.contains('App') && el.classList.contains('targets')
        );
    };

    //null checks are already present so you won't get null or undefined elements
    const modifier = (el) => {
        if (el.style) el.style.backgroundColor = 'red';
        return el;
    };

    //you can scale your region by providing a larger fraction for offset also
    const offsetPoints = [0, 0.25, 0.5, 0.75, 1, 1.215];

    //skip points on X and Y axis
    const shouldSkipAngle = (rad, index) => {
        return index % 2 === 0;
    };

    //all the args except event object are optional
    const myelements = nearby(e,predicate,modifier,offsetPoints,shouldSkipAngle);
}
```

### Extras

**1. If you are using framework like react:**
You should not modify DOM elements directly, you have to get the element's `ref` somehow. I have a simple solution lined up for that too...please keep watching this project  :)

**2. I have a codesandbox setup for testing and demo of the package, you can playaround with the code there to get a better understanding of the package**

[![cursor-nearby-elements DEMO](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/cursor-nearby-elements-demo-36tvn?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview)

<iframe src="https://codesandbox.io/embed/cursor-nearby-elements-demo-36tvn?autoresize=1&fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="cursor-nearby-elements DEMO"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>






