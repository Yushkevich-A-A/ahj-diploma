/* eslint-disable prefer-destructuring */
/* eslint-disable no-useless-escape */

import moment from 'moment';
import 'moment/locale/ru';

moment().locale('ru');

export default class WidgetController {
  constructor(
    url,
    widget,
    contentList,
    upload,
    location,
    audio,
    video,
    notifications,
    emoji,
    helper,
  ) {
    this.url = url;
    this.widget = widget;
    this.contentList = contentList;
    this.upload = upload;
    this.location = location;
    this.audio = audio;
    this.video = video;
    this.notifications = notifications;
    this.emoji = emoji;
    this.helper = helper;

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
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.link')) {
        event.preventDefault();
      }

      if (event.target.closest('.download-file__link')) {
        this.emoji.closeBlockEmodji();
        this.widget.closeAddFunctions();
        const mainElement = event.target.closest('.item-content');
        const nameElement = mainElement.dataset.filename;
        this.reqForDownloadImg(nameElement);
      }

      if (event.target.closest('.button-paperclip')) {
        this.helper.hideHelperAPI();
        this.emoji.closeBlockEmodji();
        this.widget.closeAddFunctions();
        this.widget.formInputFiles.dispatchEvent(new MouseEvent('click'));
      }

      if (event.target.closest('.preview-files-item-delete-icon')) {
        this.emoji.closeBlockEmodji();
        this.widget.closeAddFunctions();
        this.resetUplodFile();
      }

      if (event.target.closest('.button-send-message')) {
        this.helper.hideHelperAPI();
        this.emoji.closeBlockEmodji();
        this.widget.closeAddFunctions();
        this.dataText = this.widget.validityInput();
        this.checkInputValue();
        if (this.dataText === null && this.typeInput === null) {
          return;
        }
        this.sentDataToServer();
      }

      // Дополнительные кнопки

      if (event.target.closest('.additional-send-menu__button')) {
        this.helper.hideHelperAPI();
        this.widget.triggerAddFunctions();
        this.emoji.closeBlockEmodji();
      }

      // геопозиция

      if (event.target.closest('.item-location')) {
        this.location.getLocation((data) => {
          this.widget.closeAddFunctions();
          this.typeInput = 'location';
          this.dataText = { latitude: data.coords.latitude, longitude: data.coords.longitude };
          this.sentDataToServer();
        });
      }

      // аудио

      if (event.target.closest('.item-audio')) {
        this.audio.recordAudio((data) => {
          this.widget.closeAddFunctions();
          this.typeInput = 'audio';
          this.dataMedia = data;
          this.sentDataToServer();
        });
      }

      // кнопки audio

      if (event.target.closest('.track-submit-audio')) {
        this.audio.stopRecord();
      }

      if (event.target.closest('.track-cancel-audio')) {
        this.audio.cancelRecord();
      }

      // видео

      if (event.target.closest('.item-video')) {
        this.video.recordVideo((data) => {
          this.widget.closeAddFunctions();
          this.typeInput = 'video';
          this.dataMedia = data;
          this.sentDataToServer();
        });
      }

      // кнопки video

      if (event.target.closest('.track-submit-video')) {
        this.video.stopRecord();
      }

      if (event.target.closest('.track-cancel-video')) {
        this.video.cancelRecord();
      }

      // emoji

      if (event.target.closest('.button-emoji')) {
        this.helper.hideHelperAPI();
        this.widget.closeAddFunctions();
        this.emoji.triggerBlockEmodji();
      }

      if (event.target.closest('.emoji')) {
        this.widget.formInputContent.value += event.target.textContent;
      }

      // подсказка доступных команд

      if (event.target.closest('.item-helper')) {
        this.widget.closeAddFunctions();
        this.helper.showHelperAPI();
      }
    });

    this.widget.formInputContent.addEventListener('focus', () => {
      this.emoji.closeBlockEmodji();
      this.widget.closeAddFunctions();
    });

    this.widget.formInputFiles.addEventListener('input', (event) => {
      this.resetUplodFile();
      this.uploadFile(event);
    });

    document.addEventListener('dragover', (event) => {
      event.preventDefault();
      this.helper.hideHelperAPI();
      this.emoji.closeBlockEmodji();
      this.widget.closeAddFunctions();

      if (event.target.closest('.body')) {
        this.widget.visiableBlockFiles();
      }

      if (event.target.closest('.send-message-input_files')) {
        this.widget.activeDropField();
      } else {
        this.widget.disactiveDropField();
      }
    });

    document.addEventListener('dragleave', (event) => {
      event.preventDefault();
      if (event.relatedTarget === null) {
        this.widget.disableBlockFiles();
      }
    });

    document.addEventListener('drop', (event) => {
      event.preventDefault();
      this.widget.disableBlockFiles();
      if (event.target.closest('.send-message-input_files')) {
        this.resetUplodFile();
        this.uploadFile({ target: event.dataTransfer });
      }
    });

    this.widget.contentList.addEventListener('scroll', (event) => {
      if (event.target.scrollTop > 50) {
        return;
      }

      if (this.permissionForNewPosts) {
        this.sendRequestForPreviousPosts();
        this.permissionForNewPosts = false;
      }
    });
  }

  connectionToServer() {
    const eventSourse = new EventSource(`${this.url}/sse`);
    eventSourse.addEventListener('message', (event) => {
      const item = JSON.parse(event.data);
      if (item.status === 'init' && !this.alreadyInit) {
        this.alreadyInit = true;
        const reverseData = item.data.reverse();
        const postIndexArr = reverseData.map((i) => +i.data.id);
        this.previouseIndexPost = Math.min(...postIndexArr);
        this.contentList.drawContentWidget(reverseData, true);
        this.permissionForNewPosts = true;
        this.notifications.createArrayNotifications(item.notifications);
        return;
      } if (item.status === 'init') {
        return;
      }

      this.contentList.drawContent(item, true);
      this.contentList.scrollToBottom();
      eventSourse.addEventListener('open', () => {
        console.log('соединение установлено');
      });
      eventSourse.addEventListener('error', () => {
        console.log('ошибка соединения');
      });
    });
  }

  sentDataToServer() {
    const obj = {
      type: this.typeInput,
      data: {
        content: {},
        date: Date.now(),
      },
    };

    if (this.typeInput === 'chaos') {
      obj.data.type = this.dataText[1];
      fetch(`${this.url}/text`, { method: 'POST', body: JSON.stringify(obj) });
    }

    if (this.typeInput === 'location') {
      obj.data.content.text = this.dataText;
      fetch(`${this.url}/text`, { method: 'POST', body: JSON.stringify(obj) });
    }

    if (this.typeInput === 'text' || this.typeInput === 'link') {
      obj.data.content.text = this.dataText.split('\n');
      fetch(`${this.url}/text`, { method: 'POST', body: JSON.stringify(obj) });
    }

    if (this.typeInput === 'notification') {
      obj.data.content.title = this.dataText.title;
      obj.data.content.body = this.dataText.body;
      obj.data.date = this.dataText.date;
      fetch(`${this.url}/text`, { method: 'POST', body: JSON.stringify(obj) });
    }

    if (this.typeInput === 'image' || this.typeInput === 'video' || this.typeInput === 'audio') {
      const newForm = new FormData();
      newForm.append('textData', JSON.stringify(obj));
      newForm.append('file', this.dataMedia);

      fetch(`${this.url}/media`, {
        method: 'POST',
        body: newForm,
      });
    }
    this.resetUplodFile();
  }

  checkInputValue() {
    if (this.typeInput !== null) {
      return;
    }

    if (this.dataText === null) {
      return;
    }

    if (this.dataText.includes('chaos')) {
      this.typeInput = 'chaos';
      this.dataText = this.dataText.split(' ');
      return;
    }

    if (this.dataText.includes('http://') || this.dataText.includes('https://')) {
      this.typeInput = 'link';
      return;
    }

    if (this.dataText.includes('@schedule:')) {
      this.typeInput = 'notification';
      const obj = {};
      const data = this.dataText.split('\@schedule:').join('').split('"').map((item) => item.trim());
      obj.body = data[1];
      obj.date = moment(data[0], 'HH:mm DD.MM.YYYY').valueOf();
      if (Date.now() > obj.date) {
        this.typeInput = null;
        this.dataText = null;
        return;
      }
      this.dataText = obj;
      return;
    }

    this.typeInput = 'text';
  }

  uploadFile(value) {
    const { target } = value;

    const file = target.files && target.files[0];
    this.widget.formInputFiles.value = '';
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
      return;
    }
    this.dataMedia = file;
    this.upload.visiableWidget();
    this.upload.drawNewFile(this.dataMedia.name);
  }

  resetUplodFile() {
    this.upload.deleteLoadFile();
    this.dataMedia = null;
    this.typeInput = null;
    this.dataText = null;
  }

  // deleteUploadFile() {
  //     resetUplodFile()
  //     this.widget.formInputFiles.value = '';
  // }

  async sendRequestForPreviousPosts() {
    const request = await fetch(`${this.url}/previousposts/${this.previouseIndexPost}`);
    const response = await request.json();
    console.log(response.status);
    if (!response.status) {
      return;
    }
    const reverseData = response.data.reverse();
    const postIndexArr = reverseData.map((item) => +item.data.id);
    this.previouseIndexPost = Math.min(...postIndexArr);
    this.contentList.drawContentWidget(reverseData);
    this.permissionForNewPosts = true;
  }

  async reqForDownloadImg(filename) {
    const response = await fetch(`${this.url}/download/${filename}`);
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
