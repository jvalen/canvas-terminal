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
            'opacity': 0.8,
            'title': "~ Canvas Terminal Demo ~",
            'fontSize': 15,
            'fontColor': '1EA900',
            'backgroundColor': '000000',
            'cursorSymbol': '_',
            'lineHeight': 20
        }
    );    
    
    canvasTerminal.startTerminal(mainTerminalId);
}


