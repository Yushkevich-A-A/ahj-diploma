import { v4 as uuidv4 } from 'uuid';

export default class StreamVideo {
    constructor(widget, recordHandler, error) {
        this.widget = widget;
        this.recordHandler = recordHandler;
        this.error = error;
        this.fieldComponent = widget.additionalSendList;
        this.availbleVideo = false;
        this.cancelationRecord = false;
        this.init()
    }

    init() {
        this.checkAPI();
        this.drawVideoSign()
    }

    drawVideoSign() {
        this.videoSign = document.createElement('li');
        this.videoSign.classList.add('button', 'additional-send-item', 'item-video');
        this.fieldComponent.appendChild(this.videoSign);
    }

    async recordVideo(handler) {
        try {
        this.widget.openAddFunctions();
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
          });
    
          this.recorder = new MediaRecorder(stream);
          const chunks = [];
    
          this.recorder.addEventListener('start', (event) => {
            this.recordHandler.activateHandlerBlock('video');
          });
    
          this.recorder.addEventListener('dataavailable', (event) => {
            chunks.push(event.data);
          });
    
          this.recorder.addEventListener('stop', (event) => {
            stream.getTracks().forEach((track) => track.stop());
            if (this.cancelationRecord) {
                console.log('запись отменена');
                this.cancelationRecord = false;
                this.recorder = null;
                return;
            }
            console.log('запись готова к отправке')
            const fileName = uuidv4() + '.mp3';
            const blob = new File(chunks, fileName, {});
            console.log(blob)
            handler(blob);
            this.recorder = null;
          });
          this.recorder.start();
        } catch (err) {
            this.error.showErrorAPI('К сожалению, использование микрофона запрещено, пожалуйста, дайте разрешение на использование микрофона или используйте другой браузер')
        }
      }

    checkAPI() {
        if (!!navigator.mediaDevices) {
            this.availbleVideo = true
        }
    }

    cancelRecord() {
        debugger;
        console.log('запись остановили с отменой')
        this.cancelationRecord = true;
        this.stopRecord();
    }

    stopRecord() {
        console.log('запись остановили')
        this.recorder.stop()
        this.recordHandler.deactivateHandlerBlock();
    }
}