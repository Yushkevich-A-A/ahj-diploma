export default class WidgetController {
    constructor(url, widget, contentList) {
        this.url = url;
        this.widget = widget;
        this.contentList = contentList;
        this.alreadyInit = false;
        this.typeInput = null;
        this.dataText = null;
        this.dataMedia = null;
        this.init();
    }

    init() {
        this.listeners();
        this.connectionToServer();
    }

    listeners() {
        document.addEventListener('click', event => {
            if (!event.target.closest('.link') && !event.target.closest('.download-file__link') ) {
                event.preventDefault();
            }

            // if (event.target.closest('.logo-menu')) {
            //     this.widget.openAddMenu();
            // }

            if (event.target.closest('.button-paperclip')) {
                this.widget.formInputFiles.dispatchEvent(new MouseEvent('click'));
            }

            if (event.target.closest('.button-send-message')) {
                this.dataText = this.widget.validityInput();
                this.checkInputValue();
                console.log(this.typeInput);
                console.log(this.dataText);

                console.log('Отправка на сервер');

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
        const eventSourse = new EventSource(`${this.url}/sse`);
        eventSourse.addEventListener('message', (event) => {
            const item = JSON.parse(event.data);
            console.log(item);
            if (item.status === 'init' && !this.alreadyInit) {
                this.alreadyInit = true;
                this.contentList.drawContentWidget(item.data);
                this.widget.scrollToBottom();
                return;
            } if (item.status === 'init') {
                return;
            }

            this.contentList.drawContent(item, true);

            eventSourse.addEventListener('open', (event) => {
            console.log(event);
            });
            eventSourse.addEventListener('error', (event) => {
            console.log(event);
            });
        });
    }

    sentDataToServer() {
        if (this.typeInput === 'text' || this.typeInput === 'link') {
            const obj = {
                type: this.typeInput,
                data: {
                    content: this.dataText,
                    date: Date.now(),
                }
            };

            fetch('http://localhost:7070/text', {
                method: 'POST',
                body: JSON.stringify(obj)
            })
           
        }

         if (this.typeInput === 'image' || this.typeInput === 'video' || this.typeInput === 'audio') {  
            const obj = {
                type: 'image',
                data: {
                    content: {},
                    date: Date.now(),
                }
            };

            if (this.dataText) {
                obj.data.content.text = this.dataText;
            }

            const newForm = new FormData();
            newForm.append('textData', JSON.stringify(obj));
            newForm.append('file', this.dataMedia);

            fetch('http://localhost:7070/media', {
                method: 'POST',
                body: newForm,
            })
         }

        this.dataText = null;
        this.dataMedia = null;
        this.typeInput = null;
    }

    checkInputValue() {
        if (this.typeInput !== null) {
            return;
        }
        if (this.dataText.includes('http://') || this.dataText.includes('https://')) {
            this.typeInput = 'link';
            return;
        }
        this.typeInput = 'text';
    }

    uploadFile(value) {
        const { target } = value;
    
        const file = target.files && target.files[0];
    
        if (!file) {
          return;
        }

        if (file.type.includes('image')) {
            this.typeInput = 'image';
            console.log('image')
        } else if (file.type.includes('audio')) {
            this.typeInput = 'audio';
            console.log('audio')
        } else if (file.type.includes('video')) {
            this.typeInput = 'video';
            console.log('video')
        } else {
            this.widget.formInputFiles.value = '';
            return;
        }

        this.dataMedia = file;
      }
}

// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай






















        // console.log(file.type);

        // this.dataMedia = new Blob([this.dataMedia], {
        //     type: this.dataMedia.type,
        // });
        
        // let reader = new FileReader()
        // let buf = new ArrayBuffer()

        // reader.addEventListener('load', (e) => {
        //     buf = e.target.result
        //     console.log(buf)
        //     this.dataMedia = {
        //         sourse: e.target.result,
        //         fileName: file.name,
        //         filetype: file.type,
        //     }

        //     console.log()

        //     this.ws.send(e.target.result);

        // console.log('Перевод объекта в 64 завршен');

        // const url = 'data:image/png;base6....';

            // fetch(e.target.result)
            // .then(res => res.blob())
            // .then(blob => {
            //     const file = new File([blob], "File name",{ type: "image/png" });
            //     console.log("декодирование завершено")
            //     console.log(file);
            // })




            // rawData = e.target.result;

            // const obj = {
            //     type: 'image',
            //     data: {
            //         content: {
            //             sourse: rawData
            //         },
            //         date: Date.now(),
            //     }
            // };
            // // console.log(JSON.stringify(newData));
            // this.ws.send(JSON.stringify(obj));
            // console.log('отправили данные')

        //     }
        // )


        // reader.readAsArrayBuffer(file);




        // console.log(this.dataMedia);
        // const reader = new FileReader();
        // reader.addEventListener('load', (event) => {
        //   const content = event.target.result;
        // //   console.log(content);
        // //   new FieldImages(content, 'картинка');
        // this.widget.formInputFiles.value = '';
        // });
    
        // reader.readAsDataURL(file);