define([
        '../common/content',
        'cytoscape',
        'jquery',
        'jqueryQtip',
        'cytoscapeQtip'],
    function (content,
              cytoscape,
              $,
              jqQtip,
              cyQtip) {

        var cy;

        function drawField(field) {

            // also get style
            var styleP = content.FIELD_STYLE;

            initCy(field, styleP);

            function initCy(expJson, styleArr) {
                var loading = document.getElementById('loading');
                var elements = expJson.elements;

                loading.classList.add('loaded');

                cy = window.cy = cytoscape({
                    // common
                    container: document.getElementById('cy'),
                    elements: elements,
                    style: styleArr,
                    layout: {name: 'preset'}, // preset because node positions are already specified in elements JSON
                    // viewport
                    boxSelectionEnabled: false,
                    selectionType: 'single', // for 'single' a previously selected element becomes unselected otherwise - 'additive'
                    // render
                    motionBlur: true // this is beautiful but can decrease the performance
                });
            }
        }

        function setTips() {
            cy.elements.qtip({
                text: '',
                show: {
                    ready: true,
                    solo: false // hides all others qtips when shown
                },
                hide: {
                    event: false
                },
                // we want to position my qtip {my} corner at the {at} of my target
                position: {
                    my: 'top center',
                    at: 'bottom center'
                },
                style: {
                    classes: 'qtip-bootstrap',
                    tip: {
                        width: 16,
                        height: 8
                    }
                }
            });
            cy.elements.qtip('api')
        }


        function setStartNodes(startVertices) {
            const start = cy.$("#" + 'v' + startVertices.start);
            start.select();
            start.unselectify();
            start.qtip({
                content: {
                    text: function () {
                         // start button in the var
                        return $('<button id="start" disabled>START</button>');
                    }
                },
                show: {
                    ready: true,
                    solo: false // hides all others qtips when shown
                },
                hide: {
                    event: false,
                    cyViewport: false
                },
                // we want to position my qtip {my} corner at the {at} of my target
                position: {
                    my: 'top center',
                    at: 'bottom center',
                    adjust: {
                        cyViewport: true
                    }
                },
                style: {
                    classes: 'qtip-bootstrap',
                    tip: {
                        width: 16,
                        height: 8
                    }
                }
            });
            const finish = cy.$("#" + 'v' + startVertices.finish);
            finish.select();
            finish.unselectify();
            finish.qtip({
                content: {
                    text: function () {
                        // start button in the var
                        return $('<button id="end" disabled>FINISH</button>');
                    }
                },
                show: {
                    ready: true,
                    solo: false // hides all others qtips when shown
                },
                hide: {
                    event: false,
                    cyViewport: false
                },
                // we want to position my qtip {my} corner at the {at} of my target
                position: {
                    my: 'top center',
                    at: 'bottom center',
                    adjust: {
                        cyViewport: true
                    }
                },
                style: {
                    classes: 'qtip-bootstrap',
                    tip: {
                        width: 16,
                        height: 8
                    }
                }
            });
        }

        function nameSelector(name) {
            return "[name='" + name + "']";
        }

        const figureColors = ['green', 'yellow', 'blue', 'red'];

        // function getColor() {
        //     const index = Math.floor(Math.random() * figureColors.length);
        //     const color = figureColors[index];
        //     figureColors.splice(index, 1);
        //     return color;
        // }

        function getColor() {
            return figureColors.pop();
        }

        function getPosition(elementName) {
            var element = cy.elements(nameSelector(elementName))[0];
            if (element === undefined) {
                elementName = elementName.split('+').reverse().join('+');
                element = cy.elements(nameSelector(elementName))[0];
            }
            var x, y;
            if (element.isEdge()) {
                const nodes = element.connectedNodes();
                const node1 = nodes[0];
                const node2 = nodes[1];
                x = (node1.position('x') + node2.position('x')) / 2;
                y = (node1.position('y') + node2.position('y')) / 2;
            } else {
                x = element.position('x');
                y = element.position('y');
            }
            return {
                x: x,
                y: y
            }
        }

        function addPlayerFigure(playerName, startNodeName) {
            const position = getPosition(startNodeName);
            const playerFigure = cy.add({
                group: "nodes",
                data: { id: playerName },
                position: { x: position.x, y: position.y },
                classes: 'upperElement'
            });
            const figureColor = getColor();
            playerFigure.style('background-color', figureColor);
            console.log("Figure of " + playerName + " is " + figureColor);
        }

        function movePlayerFigure(playerName, aimElementName) {
            const position = getPosition(aimElementName);
            cy.$('#' + playerName).animate({
                position: { x: position.x, y: position.y }
            }, {
                duration: 100
            });
        }

        function showTip(playerName, event) {
            var message;
            var endFlag;
            switch (event) {
                case 'OBSTACLE':
                    message = 'Stumbled upon bandits!';
                    endFlag = false;
                    break;
                case 'BONUS':
                    message = 'Got an acceleration!';
                    endFlag = false;
                    break;
                case 'LOSE':
                    message = 'I lost!';
                    endFlag = true;
                    break;
                case 'WIN':
                    message = 'I won!';
                    endFlag = true;
                    break;
            }
            const playerFigure = cy.$('#' + playerName);
            if (!endFlag) {
                const tip = addTip(playerFigure, playerName + ': ' + message, 2000);
                tip.qtip('api').destroy(300);
            } else {
                setTimeout(function () {
                    addTip(playerFigure, playerName + ': ' + message, 1000000);
                }, 400)
            }
        }

        function addTip(element, message, hideDelay) {
            return element.qtip({
                content: {
                    text: message
                },
                show: {
                    ready: true,
                    solo: false // hides all others qtips when shown
                },
                hide: {
                    event: false,
                    delay: hideDelay
                },
                // we want to position my qtip {my} corner at the {at} of my target
                position: {
                    my: 'top center',
                    at: 'bottom center'
                },
                style: {
                    classes: 'qtip-bootstrap',
                    tip: {
                        width: 16,
                        height: 8
                    }
                }
            });
        }


        return {
            drawField: drawField,
            setStartNodes: setStartNodes,
            addPlayerFigure: addPlayerFigure,
            movePlayerFigure: movePlayerFigure,
            showTip: showTip
        }

    });
