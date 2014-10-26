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