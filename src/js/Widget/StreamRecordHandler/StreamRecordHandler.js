import moment from 'moment';
import 'moment/locale/ru';

moment().locale('ru');

export default class StreamRecordHandler {
  constructor(widget) {
    this.widget = widget;
    this.sendMessageInput = this.widget.widget.querySelector('.send-message-input');
    this.timer = null;
    this.init();
  }

  init() {
    this.drawHandlerField();
    this.drawStreamVideoBlock();
  }

  drawHandlerField() {
    this.blockTrackAudioVideo = document.createElement('div');
    this.blockTrackAudioVideo.classList.add('block-track-audio-video', 'disable');
    this.blockTrackAudioVideo.innerHTML = `
        <div class="button-icon block-track-submit"></div>
        <div class="block-track-timer"></div>
        <div class="button-icon block-track-cancel"></div>`;
    this.sendMessageInput.appendChild(this.blockTrackAudioVideo);

    this.trackTimer = this.blockTrackAudioVideo.querySelector('.block-track-timer');
    this.blockTrackSubmit = this.blockTrackAudioVideo.querySelector('.block-track-submit');
    this.blockTrackCancel = this.blockTrackAudioVideo.querySelector('.block-track-cancel');
  }

  activateHandlerBlock(mode) {
    this.mode = mode;
    this.blockTrackAudioVideo.classList.remove('disable');
    this.blockTrackSubmit.classList.add(`track-submit-${this.mode}`);
    this.blockTrackCancel.classList.add(`track-cancel-${this.mode}`);
    this.timerStart();
  }

  deactivateHandlerBlock() {
    this.timerStop();
    this.blockTrackSubmit.classList.remove(`track-submit-${this.mode}`);
    this.blockTrackCancel.classList.remove(`track-cancel-${this.mode}`);
    this.mode = null;
    this.blockTrackAudioVideo.classList.add('disable');
  }

  drawStreamVideoBlock() {
    this.streamBlock = document.createElement('div');
    this.streamBlock.classList.add('stream-block', 'disable');
    this.streamBlock.innerHTML = '<video control class="video-stream" muted></video>';
    this.widget.blockDisplayContent.appendChild(this.streamBlock);
    this.videoStream = this.streamBlock.querySelector('.video-stream');
  }

  timerStart() {
    let ms = 0;
    this.trackTimer.textContent = moment(ms).format('mm:ss');
    this.timer = setInterval(() => {
      ms += 1000;
      this.trackTimer.textContent = moment(ms).format('mm:ss');
    }, 1000);
  }

  timerStop() {
    clearInterval(this.timer);
    this.timer = null;
  }

  activateStreamVideoBlock() {
    this.streamBlock.classList.remove('disable');
  }

  deactivateStreamVideoBlock() {
    this.streamBlock.classList.add('disable');
  }
}
