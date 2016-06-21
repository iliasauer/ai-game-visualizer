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

        const VERTICES = {"elements":{"nodes":[{"data":{"id":"v0","name":"Vice city"},"position":{"x":37,"y":-33}},{"data":{"id":"v1","name":"Liberty city"},"position":{"x":935,"y":-63}},{"data":{"id":"v2","name":"New ark"},"position":{"x":1023,"y":-26}},{"data":{"id":"v3","name":"Mordor"},"position":{"x":1351,"y":-4}},{"data":{"id":"v4","name":"City 17"},"position":{"x":1678,"y":-136}},{"data":{"id":"v5","name":"Rapture"},"position":{"x":58,"y":-308}},{"data":{"id":"v6","name":"Dunwall"},"position":{"x":187,"y":-221}},{"data":{"id":"v7","name":"Midgar"},"position":{"x":512,"y":-296}},{"data":{"id":"v8","name":"Los Santos"},"position":{"x":708,"y":-265}},{"data":{"id":"v9","name":"Gotham"},"position":{"x":1107,"y":-231}},{"data":{"id":"v10","name":"Metropolis"},"position":{"x":1480,"y":-282}},{"data":{"id":"v11","name":"Basin"},"position":{"x":264,"y":-458}},{"data":{"id":"v12","name":"Zion"},"position":{"x":520,"y":-458}},{"data":{"id":"v13","name":"Springfield"},"position":{"x":1061,"y":-440}},{"data":{"id":"v14","name":"Chernobruysk"},"position":{"x":1762,"y":-354}},{"data":{"id":"v15","name":"Kolomuksha"},"position":{"x":1016,"y":-631}},{"data":{"id":"v16","name":"Citadel"},"position":{"x":1130,"y":-518}},{"data":{"id":"v17","name":"Plesureville"},"position":{"x":1245,"y":-638}},{"data":{"id":"v18","name":"Los Vegans"},"position":{"x":1649,"y":-546}},{"data":{"id":"v19","name":"North Park"},"position":{"x":1841,"y":-657}},{"data":{"id":"v20","name":"Sunnaruim"},"position":{"x":75,"y":-732}},{"data":{"id":"v21","name":"SimCity"},"position":{"x":376,"y":-783}},{"data":{"id":"v22","name":"Plumbumium"},"position":{"x":543,"y":-840}},{"data":{"id":"v23","name":"Sakharezhsk"},"position":{"x":812,"y":-755}},{"data":{"id":"v24","name":"Loudfield"},"position":{"x":950,"y":-722}},{"data":{"id":"v25","name":"SinCity"},"position":{"x":1116,"y":-718}},{"data":{"id":"v26","name":"Atlass"},"position":{"x":1555,"y":-762}},{"data":{"id":"v27","name":"Pocketown"},"position":{"x":170,"y":-984}},{"data":{"id":"v28","name":"Subuddton"},"position":{"x":404,"y":-985}},{"data":{"id":"v29","name":"Gorgorod"},"position":{"x":554,"y":-850}},{"data":{"id":"v30","name":"Kitezh"},"position":{"x":1101,"y":-868}},{"data":{"id":"v31","name":"Barabara"},"position":{"x":1240,"y":-1009}},{"data":{"id":"v32","name":"L-valley"},"position":{"x":1618,"y":-923}},{"data":{"id":"v33","name":"Tominadzo"},"position":{"x":1756,"y":-1003}},{"data":{"id":"v34","name":"Faulburg"},"position":{"x":27,"y":-1032}},{"data":{"id":"v35","name":"Kalou"},"position":{"x":262,"y":-1045}},{"data":{"id":"v36","name":"Shestimorsk"},"position":{"x":500,"y":-1075}}]}};

        const ALL = {"elements":{"nodes":[{"data":{"id":"v0","name":"Vice city"},"position":{"x":37,"y":-33}},{"data":{"id":"v1","name":"Liberty city"},"position":{"x":935,"y":-63}},{"data":{"id":"v2","name":"New ark"},"position":{"x":1023,"y":-26}},{"data":{"id":"v3","name":"Mordor"},"position":{"x":1351,"y":-4}},{"data":{"id":"v4","name":"City 17"},"position":{"x":1678,"y":-136}},{"data":{"id":"v5","name":"Rapture"},"position":{"x":58,"y":-308}},{"data":{"id":"v6","name":"Dunwall"},"position":{"x":187,"y":-221}},{"data":{"id":"v7","name":"Midgar"},"position":{"x":512,"y":-296}},{"data":{"id":"v8","name":"Los Santos"},"position":{"x":708,"y":-265}},{"data":{"id":"v9","name":"Gotham"},"position":{"x":1107,"y":-231}},{"data":{"id":"v10","name":"Metropolis"},"position":{"x":1480,"y":-282}},{"data":{"id":"v11","name":"Basin"},"position":{"x":264,"y":-458}},{"data":{"id":"v12","name":"Zion"},"position":{"x":520,"y":-458}},{"data":{"id":"v13","name":"Springfield"},"position":{"x":1061,"y":-440}},{"data":{"id":"v14","name":"Chernobruysk"},"position":{"x":1762,"y":-354}},{"data":{"id":"v15","name":"Kolomuksha"},"position":{"x":1016,"y":-631}},{"data":{"id":"v16","name":"Citadel"},"position":{"x":1130,"y":-518}},{"data":{"id":"v17","name":"Plesureville"},"position":{"x":1245,"y":-638}},{"data":{"id":"v18","name":"Los Vegans"},"position":{"x":1649,"y":-546}},{"data":{"id":"v19","name":"North Park"},"position":{"x":1841,"y":-657}},{"data":{"id":"v20","name":"Sunnaruim"},"position":{"x":75,"y":-732}},{"data":{"id":"v21","name":"SimCity"},"position":{"x":376,"y":-783}},{"data":{"id":"v22","name":"Plumbumium"},"position":{"x":543,"y":-840}},{"data":{"id":"v23","name":"Sakharezhsk"},"position":{"x":812,"y":-755}},{"data":{"id":"v24","name":"Loudfield"},"position":{"x":950,"y":-722}},{"data":{"id":"v25","name":"SinCity"},"position":{"x":1116,"y":-718}},{"data":{"id":"v26","name":"Atlass"},"position":{"x":1555,"y":-762}},{"data":{"id":"v27","name":"Pocketown"},"position":{"x":170,"y":-984}},{"data":{"id":"v28","name":"Subuddton"},"position":{"x":404,"y":-985}},{"data":{"id":"v29","name":"Gorgorod"},"position":{"x":554,"y":-850}},{"data":{"id":"v30","name":"Kitezh"},"position":{"x":1101,"y":-868}},{"data":{"id":"v31","name":"Barabara"},"position":{"x":1240,"y":-1009}},{"data":{"id":"v32","name":"L-valley"},"position":{"x":1618,"y":-923}},{"data":{"id":"v33","name":"Tominadzo"},"position":{"x":1756,"y":-1003}},{"data":{"id":"v34","name":"Faulburg"},"position":{"x":27,"y":-1032}},{"data":{"id":"v35","name":"Kalou"},"position":{"x":262,"y":-1045}},{"data":{"id":"v36","name":"Shestimorsk"},"position":{"x":500,"y":-1075}}],"edges":[{"data":{"id":"v0-v7","name":"Vice city+Midgar","source":"v0","target":"v7","type":2,"weight":542}},{"data":{"id":"v0-v11","name":"Vice city+Basin","source":"v0","target":"v11","type":2,"weight":481}},{"data":{"id":"v0-v12","name":"Vice city+Zion","source":"v0","target":"v12","type":2,"weight":643}},{"data":{"id":"v1-v3","name":"Liberty city+Mordor","source":"v1","target":"v3","type":2,"weight":420}},{"data":{"id":"v1-v8","name":"Liberty city+Los Santos","source":"v1","target":"v8","type":2,"weight":303}},{"data":{"id":"v1-v9","name":"Liberty city+Gotham","source":"v1","target":"v9","type":2,"weight":240}},{"data":{"id":"v2-v8","name":"New ark+Los Santos","source":"v2","target":"v8","type":2,"weight":395}},{"data":{"id":"v2-v13","name":"New ark+Springfield","source":"v2","target":"v13","type":2,"weight":415}},{"data":{"id":"v3-v4","name":"Mordor+City 17","source":"v3","target":"v4","type":2,"weight":352}},{"data":{"id":"v3-v9","name":"Mordor+Gotham","source":"v3","target":"v9","type":2,"weight":333}},{"data":{"id":"v3-v10","name":"Mordor+Metropolis","source":"v3","target":"v10","type":2,"weight":306}},{"data":{"id":"v4-v19","name":"City 17+North Park","source":"v4","target":"v19","type":2,"weight":545}},{"data":{"id":"v5-v7","name":"Rapture+Midgar","source":"v5","target":"v7","type":2,"weight":454}},{"data":{"id":"v5-v12","name":"Rapture+Zion","source":"v5","target":"v12","type":2,"weight":485}},{"data":{"id":"v6-v7","name":"Dunwall+Midgar","source":"v6","target":"v7","type":2,"weight":333}},{"data":{"id":"v6-v8","name":"Dunwall+Los Santos","source":"v6","target":"v8","type":2,"weight":522}},{"data":{"id":"v7-v11","name":"Midgar+Basin","source":"v7","target":"v11","type":2,"weight":296}},{"data":{"id":"v9-v10","name":"Gotham+Metropolis","source":"v9","target":"v10","type":2,"weight":376}},{"data":{"id":"v9-v13","name":"Gotham+Springfield","source":"v9","target":"v13","type":2,"weight":214}},{"data":{"id":"v10-v18","name":"Metropolis+Los Vegans","source":"v10","target":"v18","type":2,"weight":313}},{"data":{"id":"v10-v14","name":"Metropolis+Chernobruysk","source":"v10","target":"v14","type":2,"weight":291}},{"data":{"id":"v11-v20","name":"Basin+Sunnaruim","source":"v11","target":"v20","type":2,"weight":332}},{"data":{"id":"v12-v22","name":"Zion+Plumbumium","source":"v12","target":"v22","type":2,"weight":382}},{"data":{"id":"v13-v25","name":"Springfield+SinCity","source":"v13","target":"v25","type":2,"weight":283}},{"data":{"id":"v13-v15","name":"Springfield+Kolomuksha","source":"v13","target":"v15","type":2,"weight":196}},{"data":{"id":"v14-v19","name":"Chernobruysk+North Park","source":"v14","target":"v19","type":2,"weight":313}},{"data":{"id":"v14-v26","name":"Chernobruysk+Atlass","source":"v14","target":"v26","type":2,"weight":457}},{"data":{"id":"v15-v17","name":"Kolomuksha+Plesureville","source":"v15","target":"v17","type":2,"weight":229}},{"data":{"id":"v15-v30","name":"Kolomuksha+Kitezh","source":"v15","target":"v30","type":2,"weight":251}},{"data":{"id":"v16-v17","name":"Citadel+Plesureville","source":"v16","target":"v17","type":2,"weight":166}},{"data":{"id":"v16-v24","name":"Citadel+Loudfield","source":"v16","target":"v24","type":2,"weight":272}},{"data":{"id":"v16-v25","name":"Citadel+SinCity","source":"v16","target":"v25","type":2,"weight":200}},{"data":{"id":"v17-v26","name":"Plesureville+Atlass","source":"v17","target":"v26","type":2,"weight":333}},{"data":{"id":"v17-v30","name":"Plesureville+Kitezh","source":"v17","target":"v30","type":2,"weight":271}},{"data":{"id":"v17-v31","name":"Plesureville+Barabara","source":"v17","target":"v31","type":2,"weight":371}},{"data":{"id":"v18-v32","name":"Los Vegans+L-valley","source":"v18","target":"v32","type":2,"weight":378}},{"data":{"id":"v18-v33","name":"Los Vegans+Tominadzo","source":"v18","target":"v33","type":2,"weight":469}},{"data":{"id":"v19-v33","name":"North Park+Tominadzo","source":"v19","target":"v33","type":2,"weight":356}},{"data":{"id":"v20-v34","name":"Sunnaruim+Faulburg","source":"v20","target":"v34","type":2,"weight":303}},{"data":{"id":"v20-v35","name":"Sunnaruim+Kalou","source":"v20","target":"v35","type":2,"weight":364}},{"data":{"id":"v20-v27","name":"Sunnaruim+Pocketown","source":"v20","target":"v27","type":2,"weight":269}},{"data":{"id":"v21-v34","name":"SimCity+Faulburg","source":"v21","target":"v34","type":2,"weight":428}},{"data":{"id":"v21-v35","name":"SimCity+Kalou","source":"v21","target":"v35","type":2,"weight":285}},{"data":{"id":"v21-v36","name":"SimCity+Shestimorsk","source":"v21","target":"v36","type":2,"weight":317}},{"data":{"id":"v21-v27","name":"SimCity+Pocketown","source":"v21","target":"v27","type":2,"weight":287}},{"data":{"id":"v21-v28","name":"SimCity+Subuddton","source":"v21","target":"v28","type":2,"weight":203}},{"data":{"id":"v22-v36","name":"Plumbumium+Shestimorsk","source":"v22","target":"v36","type":2,"weight":238}},{"data":{"id":"v22-v23","name":"Plumbumium+Sakharezhsk","source":"v22","target":"v23","type":2,"weight":282}},{"data":{"id":"v23-v25","name":"Sakharezhsk+SinCity","source":"v23","target":"v25","type":2,"weight":306}},{"data":{"id":"v23-v29","name":"Sakharezhsk+Gorgorod","source":"v23","target":"v29","type":2,"weight":274}},{"data":{"id":"v24-v25","name":"Loudfield+SinCity","source":"v24","target":"v25","type":2,"weight":166}},{"data":{"id":"v26-v31","name":"Atlass+Barabara","source":"v26","target":"v31","type":2,"weight":400}},{"data":{"id":"v28-v34","name":"Subuddton+Faulburg","source":"v28","target":"v34","type":2,"weight":379}},{"data":{"id":"v28-v29","name":"Subuddton+Gorgorod","source":"v28","target":"v29","type":2,"weight":201}},{"data":{"id":"v31-v32","name":"Barabara+L-valley","source":"v31","target":"v32","type":2,"weight":387}},{"data":{"id":"v31-v33","name":"Barabara+Tominadzo","source":"v31","target":"v33","type":2,"weight":516}}]}};

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
                // handleFieldMessage(JSON_MESSAGE);
                // handleFieldMessage(VERTICES);
                handleFieldMessage(ALL);
            } else if (JSON_MESSAGE.start !== undefined) {
                // handleStartMessage(JSON_MESSAGE);
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