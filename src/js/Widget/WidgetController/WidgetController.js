export default class WidgetController {
    constructor(widget) {
        this.widget = widget;
        this.typeInput = null;
        this.data = null;
        this.init();
    }

    init() {
        this.listeners();
        this.connectionToServer();
    }

    listeners() {
        document.addEventListener('click', event => {
            if (!event.target.closest('.link')) {
                event.preventDefault();
            }

            if (event.target.closest('.logo-menu')) {
                this.widget.openAddMenu();
            }

            if (event.target.closest('.button-paperclip')) {
                this.widget.formInputFiles.dispatchEvent(new MouseEvent('click'));
            }

            if (event.target.closest('.button-send-message')) {
                this.data = this.widget.validityInput();
                console.log(this.data);
                if (this.data === null) {
                    return;
                }
                this.checkInputValue();
                this.sentDataToServer();
            }
        })

        this.widget.formInputFiles.addEventListener('input', event => {
            this.uploadFile(event);
        })

        document.addEventListener('dragover', event => {
            event.preventDefault();
            this.widget.visiableBlockFiles();
        })
        document.addEventListener('drop', event => {
            event.preventDefault();
            this.widget.disableBlockFiles();
        })
    }

    connectionToServer() {
        this.ws = new WebSocket('ws://localhost:7070/');

        this.ws.addEventListener('open', () => {
            console.log('соединение открыто');
        });

        this.ws.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
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
            const obj = {
                type: 'text',
                data: {
                    content: this.data,
                    date: Date.now(),
                }
            };
            this.ws.send(JSON.stringify(obj));
        }

         if (this.typeInput === 'link') {
            const obj = {
                type: 'link',
                data: {
                    content: this.data,
                    date: Date.now(),
                }
            };
            this.ws.send(JSON.stringify(obj));
         }

        this.data = null;
        this.typeInput = null;
    }

    checkInputValue() {
        if (this.data.includes('http://') || this.data.includes('https://')) {
            this.typeInput = 'link';
            return;
        }
        this.typeInput === 'text';
    }

    uploadFile(value) {
        const { target } = value;
    
        const file = target.files && target.files[0];
    
        if (!file) {
          return;
        }

        if (file.type.includes('image')) {
            console.log('image')
        } else if (file.type.includes('audio')) {
            console.log('audio')
        } else if (file.type.includes('video')) {
            console.log('video')
        } else {
            this.widget.formInputFiles.value = '';
            return;
        }

        console.log(file.type);
        
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
          const content = event.target.result;
          console.log(content);
        //   new FieldImages(content, 'картинка');
          this.input.value = '';
        });
    
        reader.readAsDataURL(file);
      }
}