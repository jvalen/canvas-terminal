//--------------- Class "canvasTerminal" ---------------

var Terminal = function (params) {

	//Background Variables
	var ctx1 = params.ctx.cText,
        ctx2 = params.ctx.cBg,
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
        
        //Text Variables
        title = params.title,        
        fontStyle = params.fontSize + "px Lucida Console",
        fontSize = measureFontHeight(fontStyle),
        fontColor = params.fontColor,  
        cursorSymbol = params.cursorSymbol,
        p,
        text,
        crHeight = !!params.lineHeight ? params.lineHeight : 20,
        autoWriteId = 0,
        autoWriteActive = false;
    
    /* Public Methods */
    this.run = function() {

        //Init
        setStyle(ctx1);
        p = new cursor(ctx1, cursorSymbol, fontStyle, crHeight);
        text = new myString(ctx1, "", p, xOffset, yOffset, width, fontSize, crHeight);
    
        drawBackground();

        text.cursorLoop();

        if (!!title) {
            autoWrite(title);
        }

        //Input Handler
        document.onkeydown = function(event){
            event.preventDefault();
            var keyCode;

            if(event === null) {
              keyCode = window.event.keyCode; 
            }
            else {				
                keyCode = event.keyCode;
            }

            if (!(backgroundActive || autoWriteActive)) {
                switch (event.keyCode) {
                    case 13:
                        //New line
                        yOffset += crHeight;
                        p = new cursor(ctx2, cursorSymbol, fontStyle);
                        executeCommand(text.currentCommand());
                        text.cr();
                        text.crPrompt();

                        terminalHandler();
                        break;
                    case 8:
                        //Remove last character
                        text.removeLastChar();
                        text.draw();
                        
                        terminalHandler();
                        break;
                    default:
                        //New character
                        text.add(keyCode, event);
                        text.draw();

                        terminalHandler();
                        
                        break;
                }
            }
        };
    };
    
    this.stop = function() {

        if(typeof(text.returnIdCursor()) !== 'undefined'){

            //Check if the interval has been defined
            clearInterval(text.returnIdCursor());
            clearInterval(backgroundId);
            clearInterval(autoWriteId);

            ctx1.clearRect(0, 0, width, height);
            ctx2.clearRect(0, 0, width, height);

            text.reset();

            //Don't allow to continue typing
            document.onkeydown = function(event){			
                var keyCode;

                if(event === null) {				
                    keyCode = window.event.keyCode; 
                }
                else {				
                    keyCode = event.keyCode;
                }						
            };		
        }
    };
    
    this.reset = function() {
        this.stop();
        this.run();
    };    
    
    /* Private Methods */
    function terminalHandler() {
        //Reset terminal						
        if (text.returnYpos() >= (height)) {
                ctx1.clearRect(0, 0, width, height);                
                text.reset();
        }
    };
    
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
    
    function randomWrite() {

        if (!backgroundActive){
            text.add(String.fromCharCode(Math.floor(Math.random()*254)));
            text.draw();

            terminalHandler();
        }	
    };
    
    function fillUpBackground(currentWidth, currentHeight) {
        ctx2.fillStyle = '#' + backgroundColor;
        ctx2.globalAlpha = opacity;
        ctx2.clearRect(0, 0, currentWidth, currentHeight);
        ctx2.fillRect(0, 0, currentWidth, currentHeight);
    }
    
    function autoWrite(str) {

        autoWriteActive=true;
        var charIndex=0;

        autoWriteId=setInterval(function(){					

            //Don't do anything until backgroud animation is done
            if (!backgroundActive){			

                //Draw text process
                text.add(str.charAt(charIndex));
                text.draw();

                //Terminal Handler (Check eol, reset terminal, ...)
                terminalHandler();

                charIndex++;
            }								

            //Auto writing done (clear interval and flags)
            if (charIndex>=str.length){
                clearInterval(autoWriteId);
                autoWriteActive=false;
                text.cr();
                text.crPrompt();
            }			

        },10, charIndex);
    };
    
    function setStyle(context) {
        context.fillStyle = "#" + fontColor;
        context.font = fontStyle;
    };
    
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