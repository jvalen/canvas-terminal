/*
 * Check canvas support and return context if exist, false in other case
 * @param {string} canvasId
 */
function checkCanvasSupport(canvasId) {
    "use strict";
    var canvas = document.querySelector('#' + canvasId),
        ctx;

    ctx = !!canvas.getContext ? canvas.getContext('2d') : false;
    if (!ctx) {
        alert("I'm sorry, but your browser does not support HTML5 'Canvas' element.");
    }
    return ctx;
}

/**
 * Return a character from a keycode and keyboard event related
 * @param {String} keycode
 * @param {Object} keyboardEvent
 * @returns {String}
 */
function giveMeChar(keycode, keyboardEvent) {
    var resultChar = '',
        charRelated = String.fromCharCode(keycode);
        
    //Letters, numbers and some special chars
    if ((keycode>=48) && (keycode<=57) 
         || (keycode>=65) && (keycode<=90) 
         || (keycode>=97) && (keycode<=122)) {

        resultChar = charRelated;
         
        if (keyboardEvent.shiftKey) {
            switch (keycode) {
                case 56:
                    resultChar = '(';
                    break;
                case 57:
                    resultChar = ')';
                    break;
            }            
        } else {
            resultChar = resultChar.toLowerCase();
        }
    } else {
        //Other char
        switch (keycode) {
            case 32:
                resultChar = " ";                
                break;
            case 47:
                resultChar = "/";                
                break;
            case 126:
                resultChar = "~";                
                break;
            case 190:
                resultChar = ".";                
                break;
            case 222:
                resultChar = "'";                
                break;                
            default:
                resultChar = "";
                break;
        }
    }
    
    return resultChar;
}

/**
 * Not a very accurate way to measure text height
 * @param {String} fontStyle
 * @returns {Integer}
 */
function measureFontHeight(fontStyle) {
   var result = 0,
       body = document.getElementsByTagName('body')[0],       
       dummy = document.createElement('div'),
       dummyText = document.createTextNode('M');
       
    dummy.appendChild(dummyText);
    dummy.setAttribute('style', fontStyle + ';position:absolute;top:0;left:0');
    body.appendChild(dummy);
    result = dummy.offsetHeight;
    body.removeChild(dummy);
 
   return result;
}

/**
 * Not a very accurate way to measure text width within a canvas
 * @param {object} context Canvans ctx
 * @param {String} character
 * @returns {Integer}
 */
function measureCharWidth(context, character) {
   return context.measureText(character).width + 2; //FIXME: 2px error offset 
}

/**
 * Add an event to a DOM element
 * @param {object} element
 * @param {string} myEvent
 * @param {function} fnc
 */
function addEvent(element, myEvent, fnc) {
    return ((element.attachEvent) ? element.attachEvent('on' + myEvent, fnc) : element.addEventListener(myEvent, fnc, false));
}

/**
 * Launch an event
 * @param {object} el
 * @param {string} etype
 */
function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}