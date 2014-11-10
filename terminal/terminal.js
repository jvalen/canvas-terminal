/**
 * Defines Terminal object and methods
 * @class Terminal
 * @param {object} params Terminal options
 */
var Terminal = function (params) {
	/** iface variables */
	var ctx1 = params.ctx.cText.context,
        ctx2 = params.ctx.cBg.context,
        ctx1Elem = params.ctx.cText.elem,
        ctx2Elem = params.ctx.cBg.elem,
        width = ctx1.canvas.clientWidth,
        height = ctx1.canvas.clientHeight,
        xOffset = params.xOffset,
        yOffset = params.yOffset,
        speed = params.speed,
        opacity = params.opacity,
        parameters = params,
        backgroundId = 0,
        backgroundActive = false,
        backgroundColor = params.backgroundColor,
        autoWriteId = 0,
        autoWriteActive = false,
        keyListener,        
        
        /** Text Variables */
        title = params.title,        
        fontStyle = params.fontSize + "px Lucida Console",
        fontSize = measureFontHeight(fontStyle),
        fontColor = params.fontColor,  
        cursorSymbol = params.cursorSymbol,
        p,
        text,
        crHeight = !!params.lineHeight ? params.lineHeight : 20;
    
    /**
     * Launch the terminal
     */
    this.run = function() {
        /** Init - Create cursor and current command */
        setStyle(ctx1);
        p = new cursor(ctx1, cursorSymbol, fontStyle, crHeight);
        text = new MyString(ctx1, "", p, xOffset, yOffset, width, fontSize, crHeight);
    
        /** Draw background and launch cursor */
        drawBackground();
        text.cursorLoop();

        /** Auto-write tittle if defined */
        if (!!title) {
            autoWrite(title);
        }

        /** Input Handler */
        keyListener = function () {
            document.onkeydown = function(event) {
                event.preventDefault();
                var keyCode;

                if (event === null) {
                  keyCode = window.event.keyCode; 
                }
                else {				
                    keyCode = event.keyCode;
                }

                if (!(backgroundActive || autoWriteActive)) {
                    switch (event.keyCode) {
                        case 13:
                            /** New line */
                            yOffset += crHeight;
                            p = new cursor(ctx2, cursorSymbol, fontStyle);
                            executeCommand(text.currentCommand());
                            text.cr();
                            text.crPrompt();

                            terminalHandler();
                            break;
                        case 8:
                            /** Remove last character */
                            text.removeLastChar();
                            text.draw();

                            terminalHandler();
                            break;
                        default:
                            /** New character */
                            text.add(keyCode, event);
                            text.draw();

                            terminalHandler();

                            break;
                    }
                }
            };
            
            /** Fires a focus event to show the phone keyboard */
            document.getElementById('hidden-input-' + parameters.ctx.cText.elemId).focus();
            /** Window scroll to canvas 'y' position */
            window.scroll(0, ctx1.canvas.offsetTop);
        };

        /** Terminal is active and ready to type when the user click on it */
        addEvent(ctx1Elem, 'click', keyListener);
        addEvent(ctx2Elem, 'click', keyListener);
        eventFire(ctx1Elem, 'click');
        eventFire(ctx2Elem, 'click');
    };
    
    /**
     * Stops terminal
     */
    this.stop = function() {
        if (typeof(text.returnIdCursor()) !== 'undefined') {
            /** Clean listeners and canvas */
            clearInterval(text.returnIdCursor());
            clearInterval(backgroundId);
            clearInterval(autoWriteId);

            ctx1.clearRect(0, 0, width, height);
            ctx2.clearRect(0, 0, width, height);

            text.reset();
            
            /** Reset onkeydown event */
            document.onkeydown = function () {};
        }
    };
    
    /**
     * Reset terminal
     */
    this.reset = function() {
        this.stop();
        this.run();
    };
    
    /**
     * Define terminal text related behaviours
     * @private
     */
    function terminalHandler() {
        /** Reset terminal when get the bottom */
        if (text.returnYpos() >= (height)) {
                ctx1.clearRect(0, 0, width, height);                
                text.reset();
        }
    };
    
    /**
     * Draw background terminal
     * @private
     */
    function drawBackground() {
        backgroundActive = true;
        var tempW = 0,
            bgAnimation = parameters.backgroundAnimation;

        if (!!bgAnimation) {
            switch (bgAnimation.type) {
                case 'l-r':
                    backgroundId = setInterval(function() {                        
                        fillUpBackground(tempW, height);
                        tempW += bgAnimation.speed;

                        if (tempW >= width) {
                            clearInterval(backgroundId);
                            text.crPrompt();			
                            backgroundActive = false;
                        }
                    }, bgAnimation.speed);
                    break;
                default:
                    fillUpBackground(width, height);
                    text.crPrompt();			
                    backgroundActive = false;        
                    break;
            }
        } else {
            fillUpBackground(width, height);
            text.crPrompt();			
            backgroundActive = false;        
        }
    };
    
    
    /**
     * Fill up background canvas
     * @private
     * @param {integer} currentWidth
     * @param {integer} currentHeight
     */
    function fillUpBackground(currentWidth, currentHeight) {
        ctx2.fillStyle = '#' + backgroundColor;
        ctx2.globalAlpha = opacity;
        ctx2.clearRect(0, 0, currentWidth, currentHeight);
        ctx2.fillRect(0, 0, currentWidth, currentHeight);
    }
    
    /**
     * Draw a random character
     * @private
     */
    function randomWrite() {
        if (!backgroundActive) {
            text.add(String.fromCharCode(Math.floor(Math.random() * 254)));
            text.draw();
            
            terminalHandler();
        }
    };    
    
    /**
     * Auto-write a string
     * @private
     * @param {string} str
     */
    function autoWrite(str) {
        var charIndex = 0;
        
        autoWriteActive = true;
        autoWriteId = setInterval(function () {
            /** Doesn't do anything until backgroud animation is done */
            if (!backgroundActive) {
                    /** Infinite random char writing */                
                if (str === '@random') {
                    randomWrite();
                } else {
                    /** Draw a new str character */
                    text.add(str.charAt(charIndex));
                    text.draw();

                    terminalHandler();
                    charIndex++;
                }
            }
            
            if (charIndex >= str.length) {
                /** Auto writing done (clear interval and flags) */
                clearInterval(autoWriteId);
                autoWriteActive=false;
                text.cr();
                text.crPrompt();
            }
        },10, charIndex);
    };
    
    /**
     * Update ctx font style and color
     * @private
     * @param {object} context
     */
    function setStyle(context) {
        context.fillStyle = "#" + fontColor;
        context.font = fontStyle;
    };
    
    /**
     * Launch a defined command if exist
     * @private
     * @param {string} command
     */
    function executeCommand(command) {
        var parameter = '';
        
        //Autowrite input text
        if (/^autotext\(\'[\s\S]*\'\)/.test(command)) {
            parameter = command.split("'")[1];
            autoWrite(parameter);
        } else if (/\S/.test(command)) {
            autoWrite(command + ': command not found');
        }
    }
};