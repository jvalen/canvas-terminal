/**
 * Canvas Terminal
 * 
 * Customizable Web command line
 * Canvas + Javascrpit
 * 	
 * 	The MIT License (MIT)
 * 	Copyright (c) 2014 sprawlwalk
 */

(function(canvasTerminal, undefined) {
    "use strict";
    
    var terminalArray = [],
        terminalCounter = 0;
    
    /**
     * Creates a Terminal
     * @constructor
     * @param {object} params
     * @returns {currentTerminal.id|integer}
     */
    canvasTerminal.create = function(params) {
        var ctx1 = checkCanvasSupport(params.canvasId.cText),
            ctx2 = checkCanvasSupport(params.canvasId.cBg),
            currentTerminal;

        if ((ctx1) && (ctx2)){
            /** Create a hidden input to trigger phone keyboard */
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('name', 'hidden-input');
            input.setAttribute('id', 'hidden-input-' + params.canvasId.cText);
            input.style.cssText = 'position:absolute;top:' + ctx1.canvas.offsetTop + 'px;opacity: 0;';
            document.querySelectorAll("body")[0].appendChild(input);            
            
            /** Setup params */
            params.ctx = {
                'cText': {
                    context: ctx1,
                    elemId: params.canvasId.cText,
                    elem: document.getElementById(params.canvasId.cText)
                },
                'cBg': {
                    context: ctx2,
                    elemId: params.canvasId.cBg,
                    elem: document.getElementById(params.canvasId.cBg)
                }
            };
            
            /** Add the new created terminal to the array */
            currentTerminal = {
                id: terminalCounter++,
                terminal: new Terminal(params)
            };
            
            terminalArray.push(currentTerminal);
            return (currentTerminal.id);
        }
    };
    
    /**
     * Start selected terminal
     * @param {integer} terminalId
     */
    canvasTerminal.startTerminal = function (terminalId) {
        launchAction('run', terminalId);        
    };
    
    /**
     * Stop selected terminal
     * @param {integer} terminalId
     */    
    canvasTerminal.stopTerminal = function (terminalId) {
        launchAction('stop', terminalId);
    };
    
    /**
     * Reset selected terminal
     * @param {integer} terminalId
     */    
    canvasTerminal.resetTerminal = function (terminalId) {
        launchAction('reset', terminalId);
    };
    
    /**
     * Return terminal array position
     * @private
     * @param {integer} terminalId
     * @returns {integer}
     */
    function giveMeTerminalPosition(terminalId) {
        for (var i = 0; i < terminalArray.length; i++) {
            if (terminalId === terminalArray[i].id) {
                return i;
            }
        }        
        return -1;
    }
    
    /**
     * Fires selected action
     * @private
     * @param {string} action
     * @param {integer} id
     */
    function launchAction(action, id) {
        var position = giveMeTerminalPosition(id),
            currentTerminal;
    
        if (position >= 0) {
            currentTerminal = terminalArray[position];
            if(typeof(currentTerminal) !== 'undefined'){
                currentTerminal.terminal[action]();
            }
        }        
    }
    
}( window.canvasTerminal = window.canvasTerminal || {} ));