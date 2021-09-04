export default class WidgetController {
    constructor(url, widget, contentList, upload, location) {
        this.url = url;
        this.widget = widget;
        this.contentList = contentList;
        this.upload = upload;
        this.location = location;
        this.alreadyInit = false;
        this.permissionForNewPosts = false;
        this.typeInput = null;
        this.dataText = null;
        this.dataMedia = null;
        this.previouseIndexPost = null;
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

            // if (event.target.closest('.logo-menu')) {
            //     this.widget.openAddMenu();
            // }

             if (event.target.closest('.additional-send-menu__button')) {
                this.widget.openAddFunctions();
            }

            if (event.target.closest('.download-file__link')) {
                const mainElement = event.target.closest('.item-content');
                const nameElement = mainElement.dataset.filename;
                this.reqForDownloadImg(nameElement);
            }

            if (event.target.closest('.button-paperclip')) {
                this.widget.formInputFiles.dispatchEvent(new MouseEvent('click'));
            }

            if (event.target.closest('.preview-files-item-delete-icon')) {
                this.upload.deleteLoadFile(event.target);
                this.widget.formInputFiles.value = '';
                this.dataMedia = null;
                this.typeInput = null;
            }

            if (event.target.closest('.button-send-message')) {
                this.dataText = this.widget.validityInput();
                this.checkInputValue();
                if (this.dataText === null && this.typeInput === null) {
                    return;
                }
                this.upload.deleteAllLoadFiles();
                this.sentDataToServer();
            }

            // Дополнительные кнопки

            if (event.target.closest('.item-location')) {
                this.location.getLocation(data => console.log(data));
            }
        })

        this.widget.formInputFiles.addEventListener('input', event => {
            this.uploadFile(event);
        })

        // document.addEventListener('dragenter', event => {
        //     console.log(event.target)
        //     // if (event.target.closest('.body')) {
        //     //     this.widget.disableBlockFiles();
        //     //     return;
        //     // }

        // })

        document.addEventListener('dragover', event => {
            event.preventDefault();

            if (event.target.closest('.body')) {
                this.widget.visiableBlockFiles();
            }

            if (event.target.closest('.send-message-input_files')) {
                this.widget.activeDropField();
            } else {
                this.widget.disactiveDropField();
            }
        })

        document.addEventListener('drop', event => {
            event.preventDefault();
            this.widget.disableBlockFiles();
            if (event.target.closest('.send-message-input_files')) {
                this.uploadFile({ target: event.dataTransfer });
            }
        });

        this.widget.blockDisplayContent.addEventListener('scroll', event => {
            if (event.target.scrollTop > 100) {
                return;
            } 

            if (this.permissionForNewPosts) {
                this.sendRequestForPreviousPosts();
                this.permissionForNewPosts = false;
            }
        })
    }

    connectionToServer() {
        const eventSourse = new EventSource(`${this.url}/sse`);
        eventSourse.addEventListener('message', (event) => {
            const item = JSON.parse(event.data);
            console.log(item);
            if (item.status === 'init' && !this.alreadyInit) {
                this.alreadyInit = true;
                const reverseData = item.data.reverse();
                const postIndexArr = reverseData.map(item => +item.data.id)
                this.previouseIndexPost = Math.min(...postIndexArr);
                this.contentList.drawContentWidget(reverseData, true);
                this.permissionForNewPosts = true;
                return;
            } if (item.status === 'init') {
                return;
            }

            this.contentList.drawContent(item, true);
            this.contentList.scrollToBottom();
            eventSourse.addEventListener('open', (event) => {
            console.log(event);
            });
            eventSourse.addEventListener('error', (event) => {
            console.log(event);
            });
        });
    }

    sentDataToServer() {
        const obj = {
            type: this.typeInput,
            data: {
                date: Date.now(),
            }
        };

        if (this.typeInput === 'text' || this.typeInput === 'link') {
            obj.data.content.text = this.dataText;

            fetch('http://localhost:7070/text', {method: 'POST', body: JSON.stringify(obj)})
        }

         if (this.typeInput === 'image' || this.typeInput === 'video' || this.typeInput === 'audio') {  
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

        if (this.dataText === null) {
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
        } else if (file.type.includes('audio')) {
            this.typeInput = 'audio';
        } else if (file.type.includes('video')) {
            this.typeInput = 'video';
        } else {
            this.widget.formInputFiles.value = '';
            return;
        }
        this.dataMedia = file;
        this.upload.visiableWidget();
        this.upload.drawNewFile(this.dataMedia.name, 0);
    }

    async sendRequestForPreviousPosts() {
        const request = await fetch(`http://localhost:7070/previousposts/${this.previouseIndexPost}`);
        const response = await request.json();
        console.log(response.status)
        if (!response.status) {
            return;
        }
        const reverseData = response.data.reverse();
        const postIndexArr = reverseData.map(item => +item.data.id)
        this.previouseIndexPost = Math.min(...postIndexArr);
        this.contentList.drawContentWidget(reverseData);
        this.permissionForNewPosts = true;
    }

    async reqForDownloadImg(filename) {
        const response = await fetch(`http://localhost:7070/download/${filename}`);
        const blob = await response.blob();
        console.log(blob);
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
}

// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай
// Дальше шлачный код на всякий случай