import { v4 as uuidv4 } from 'uuid';

export default class StreamVideo {
  constructor(widget, recordHandler, error) {
    this.widget = widget;
    this.recordHandler = recordHandler;
    this.error = error;
    this.fieldComponent = widget.additionalSendList;
    this.availbleVideo = false;
    this.cancelationRecord = false;
    this.init();
  }

  init() {
    this.checkAPI();
    this.drawVideoSign();
  }

  drawVideoSign() {
    this.videoSign = document.createElement('li');
    this.videoSign.classList.add('button', 'additional-send-item', 'item-video');
    this.fieldComponent.appendChild(this.videoSign);
  }

  async recordVideo(handler) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });

      this.recorder = new MediaRecorder(stream);
      const chunks = [];

      this.recorder.addEventListener('start', (event) => {
        this.recordHandler.activateHandlerBlock('video');
        this.recordHandler.activateStreamVideoBlock();
        this.recordHandler.videoStream.srcObject = stream;
        this.recordHandler.videoStream.play();
      });

      this.recorder.addEventListener('dataavailable', (event) => {
        chunks.push(event.data);
      });

      this.recorder.addEventListener('stop', (event) => {
        this.recordHandler.deactivateStreamVideoBlock();
        stream.getTracks().forEach((track) => track.stop());
        if (this.cancelationRecord) {
          this.cancelationRecord = false;
          this.recorder = null;
          return;
        }
        const fileName = `${uuidv4()}.mp4`;
        const blob = new File(chunks, fileName);
        handler(blob);
        this.recorder = null;
      });
      this.recorder.start();
    } catch (err) {
      this.error.showErrorAPI('К сожалению, использование микрофона или камеры запрещено, пожалуйста, дайте разрешение на использование микрофона и камеры или используйте другой браузер');
    }
  }

  checkAPI() {
    if (navigator.mediaDevices) {
      this.availbleVideo = true;
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
