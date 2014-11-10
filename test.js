function init() {
    var mainTerminalId = canvasTerminal.create(
        { 
            'canvasId': {
                'cText': 'terminal-text-canvas', 
                'cBg': 'terminal-bg-canvas'
            },
            'xOffset': 10,
            'yOffset': 10,
            'textSpeed': 10,
            'backgroundAnimation': {
                type: 'l-r',
                speed: 10
            },
            'opacity': 0.9,
            'title': "# Canvas Terminal Demo #",
            'fontSize': 15,
            'fontColor': '18F018',
            'backgroundColor': '000000',
            'cursorSymbol': '_',
            'lineHeight': 20
        }
    );    
    
    var secondTerminalId = canvasTerminal.create(
        { 
            'canvasId': {
                'cText': 'second-text-canvas', 
                'cBg': 'second-bg-canvas'
            },
            'xOffset': 10,
            'yOffset': 10,
            'textSpeed': 10,
            'backgroundAnimation': {
                type: 'l-r',
                speed: 10
            },
            'opacity': 0.5,
            'title': "# Shell No 2 #",
            'fontSize': 15,
            'fontColor': '2B3132',
            'backgroundColor': '002B36',
            'cursorSymbol': '_',
            'lineHeight': 20
        }
    );        
    
    var thirdTerminalId = canvasTerminal.create(
        { 
            'canvasId': {
                'cText': 'third-text-canvas', 
                'cBg': 'third-bg-canvas'
            },
            'xOffset': 10,
            'yOffset': 10,
            'textSpeed': 10,
            'backgroundAnimation': {
                type: 'l-r',
                speed: 10
            },
            'opacity': 0.8,
            'title': "@random",
            'fontSize': 15,
            'fontColor': 'FFFFFF',
            'backgroundColor': 'AA2D2F',
            'cursorSymbol': '_',
            'lineHeight': 20
        }
    );        
    
    canvasTerminal.startTerminal(mainTerminalId);
    canvasTerminal.startTerminal(secondTerminalId);
    canvasTerminal.startTerminal(thirdTerminalId);
}


