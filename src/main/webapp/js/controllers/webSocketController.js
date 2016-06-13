define(['jquery',
        '../common/constants',
        './gameController'],
    function ($,
              constants,
              gameController) {

        const WS_URL = constants.WS_URL;
        const GREETING = 'The connection is open';
        var ws;

        var playersNames = [];

        function greetServer() {
            sendMessage(GREETING);
            console.log(GREETING);
        }

        function handleMessage(message) {
            const JSON_MESSAGE = JSON.parse(message.data);
            if (JSON_MESSAGE.type) {
                const type = JSON_MESSAGE.type;
                switch (type) {
                    case 'MOVE':
                        handleMoveMessage(JSON_MESSAGE);
                        break;
                    case 'EVENT':
                        handleEventMessage(JSON_MESSAGE);
                        break;
                }
            } else if (JSON_MESSAGE.elements !== undefined) {
                handleFieldMessage(JSON_MESSAGE);
            } else if (JSON_MESSAGE.start !== undefined) {
                handleStartMessage(JSON_MESSAGE);
            }
        }

        function handleFieldMessage(gameField) {
            gameController.drawField(gameField);
        }

        function handleStartMessage(startNodes) {
            gameController.setStartNodes(startNodes);
        }

        function handleEventMessage(evtMsg) {
            gameController.showTip(evtMsg.player, evtMsg.event)
        }

        function handleMoveMessage(mvMsg) {
            const playerName = mvMsg.player;
            if ($.inArray(playerName, playersNames) < 0) {
                playersNames.push(playerName);
                gameController.addPlayerFigure(playerName, mvMsg.element);
            } else {
                gameController.movePlayerFigure(playerName, mvMsg.element);
            }
        }

        function handleServerError(error) {
            console.log('An error occurred on the server')
        }

        function handleClose() {
            console.log('The connection was closed')
        }

        function sendMessage(message) {
            if (ws) {
                ws.send(message);
            } else {
                console.log('Failed to send message to the server');
            }
        }

        function connectWs() {

            if (!ws) {

                ws = new WebSocket(WS_URL);

                ws.onopen = greetServer;

                ws.onclose = handleClose;

                ws.onerror = handleServerError;

                ws.onmessage = handleMessage;
            }
        }

        return {
            connectWs: connectWs,
            sendMessage: sendMessage
        }

    });