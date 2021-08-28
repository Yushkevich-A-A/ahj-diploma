export default class WidgetController {
    constructor(widget) {
        this.widget = widget;
        this.typeInput = 'text';
        this.init();
    }

    init() {
        this.listeners();
        this.connectionToServer();
    }

    listeners() {
        document.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.closest('.logo-menu')) {
                this.widget.openAddMenu();
            }

            if (event.target.closest('.button-send-message')) {
                this.sentDataToServer();
            }
        })
    }

    connectionToServer() {
        this.ws = new WebSocket('ws://localhost:7070/');

        this.ws.addEventListener('open', () => {
            console.log('соединение открыто');
        });

        this.ws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            if(data.status === 'init') {
                this.widget.drawContentWidget(data.data);
                this.widget.scrollToBottom()
            }

            if (data.status === 'message') {
                this.widget.drawContent(data.data, true);
            }
        });
    }

    sentDataToServer() {
        if (this.typeInput === 'text') {
            const data = this.widget.validityInput();
            if (!data) {
                return;
            }
            const obj = {
                type: 'text',
                data: {
                    content: data,
                    date: Date.now(),
                }
            };
            const string = JSON.stringify(obj);
            this.ws.send(string);
        }
    }
}