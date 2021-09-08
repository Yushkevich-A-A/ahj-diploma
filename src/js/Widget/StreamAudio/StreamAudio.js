import { v4 as uuidv4 } from 'uuid';

export default class StreamAudio {
  constructor(widget, recordHandler, error) {
    this.widget = widget;
    this.recordHandler = recordHandler;
    this.error = error;
    this.fieldComponent = widget.additionalSendList;
    this.availbleAudio = false;
    this.cancelationRecord = false;
    this.init();
  }

  init() {
    this.checkAPI();
    this.drawAudioSign();
  }

  drawAudioSign() {
    this.audioSign = document.createElement('li');
    this.audioSign.classList.add('button', 'additional-send-item', 'item-audio');
    this.fieldComponent.appendChild(this.audioSign);
  }

  async recordAudio(handler) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });

      this.recorder = new MediaRecorder(stream);
      const chunks = [];

      this.recorder.addEventListener('start', (event) => {
        this.recordHandler.activateHandlerBlock('audio');
      });

      this.recorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      this.recorder.addEventListener('stop', (event) => {
        stream.getTracks().forEach((track) => track.stop());
        if (this.cancelationRecord) {
          this.cancelationRecord = false;
          this.recorder = null;
          return;
        }
        const fileName = `${uuidv4()}.mp3`;
        const blob = new File(chunks, fileName, {});
        console.log(blob);
        handler(blob);
        this.recorder = null;
      });
      this.recorder.start();
    } catch (err) {
      this.error.showErrorAPI(
        'К сожалению, использование микрофона запрещено, пожалуйста, дайте разрешение на использование микрофона или используйте другой браузер',
      );
    }
  }

  checkAPI() {
    if (navigator.mediaDevices) {
      this.availbleAudio = true;
    }
  }

  cancelRecord() {
    this.cancelationRecord = true;
    this.stopRecord();
  }

  stopRecord() {
    this.recorder.stop();
    this.recordHandler.deactivateHandlerBlock();
  }
}
