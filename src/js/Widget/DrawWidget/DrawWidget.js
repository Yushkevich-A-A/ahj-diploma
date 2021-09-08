// images
import logo from './images/logo.png';
import emoji from './images/buttons/emoji.png';
import paperclip from './images/buttons/paperclip.png';
import send from './images/buttons/send.png';

export default class DrawWidget {
  constructor(element = null) {
    this.element = element;
    this.inputData = null;
    this.init();
  }

  init() {
    this.drawWidget();
  }

  drawWidget() {
    this.widget = document.createElement('div');
    this.widget.classList.add('widget-wrapper');
    this.widget.innerHTML = `
        <div class="widget">
            <div class="widget-block widget-header">
                <div class="header-main">
                    <div class="logo">
                        <img src="${logo}" alt="" class="logo__img">
                    </div>
                    <div class="title-widget">
                        <h1 class="title-widget__h1">
                            Chaos organazer
                        </h1>
                    </div>
                </div>
                <div class="header-menu">
                    <div class="logo-menu additional-menu__button">
                        <div class="logo-menu__div-point"></div>    
                    </div>
                    <div class="additional-menu disable">
                        <ul class="additional-menu__list">
                        </ul>
                    </div>
                </div>
            </div>
            <div class="widget-body">
                <div class="block-display-content">
                    <ul class="list-content">
                    </ul>
                </div>
                <div class="block-form-input-content">
                    <div class="block-additional">
                        <div class="additional-send disable">
                            <ul class="additional-send-list">
                            </ul>
                        </div>
                        <div class="emoji-widget disable">
                            <ul class="emoji-list">
                        </ul>
                    </div>
                    </div>
                    <form class="form-input-content">
                        <div class="basil-function">
                            <div class="add-emoji-files">
                                <div class="logo-menu additional-send-menu__button">
                                    <div class="logo-menu__div-point"></div>    
                                </div>
                                <div class="button add-emoji-files-button button-paperclip ">
                                    <img class="button-paperclip__img" src="${paperclip}" alt="">
                                </div>
                                <div class="button add-emoji-files-button button-emoji">
                                    <img class="button-emoji__img"  src="${emoji}" alt="">
                                </div>
                            </div>
                            <div class="send-message">
                                <div class="send-message-input">
                                    <div class="send-message-input_text">
                                        <textarea class="input form-input-content__input" placeholder="Type your message here"></textarea>
                                    </div>
                                    <div class="send-message-input_files disable">
                                        <input type='file' class="form-input-files">
                                        <div class="form-input-files_wrapper">
                                            <div class="form-input-files-drop-field">
                                                <p class="form-input-files-drop-field_text">Drop your file here</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="block-preview-files disable">
                                        <ul class="preview-files-list">
                                    </ul>
                                </div>
                                </div>
                                <div class="button button-send-message">
                                    <img class="button-send-message__img" src="${send}" alt="">
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>`;
    this.element.appendChild(this.widget);

    // Блоки виджета
    this.additionalMenu = this.widget.querySelector('.additional-menu');
    this.contentList = this.widget.querySelector('.list-content');
    this.formInput = this.widget.querySelector('.form-input-content');

    // блоки ввода текстовых сообщений
    this.sendMessageInputText = this.widget.querySelector('.send-message-input_text');
    this.formInputContent = this.widget.querySelector('.form-input-content__input');

    // блоки подготовки файлов к отправке и отображение прикрепленных файлов
    this.sendMessageInputFiles = this.widget.querySelector('.send-message-input_files');
    this.formInputFiles = this.widget.querySelector('.form-input-files');
    this.dropField = this.sendMessageInputFiles.querySelector('.form-input-files-drop-field');
    this.blockDisplayContent = this.widget.querySelector('.block-display-content');
    this.blockPreviewFiles = this.widget.querySelector('.block-preview-files');

    // блоки дополнительных функций
    this.additionalSend = this.widget.querySelector('.additional-send');
    this.additionalSendList = this.widget.querySelector('.additional-send-list');
    this.emojiWidget = this.widget.querySelector('.emoji-widget');
    this.emojiList = this.widget.querySelector('.emoji-list');
  }

  openAddMenu() {
    if (this.additionalMenu.classList.contains('disable')) {
      this.additionalMenu.classList.remove('disable');
      return;
    }
    this.additionalMenu.classList.add('disable');
  }

  triggerAddFunctions() {
    if (this.additionalSend.classList.contains('disable')) {
      this.additionalSend.classList.remove('disable');
      this.getPositionAddFunctions();
      return;
    }
    this.closeAddFunctions();
  }

  closeAddFunctions() {
    this.additionalSend.classList.add('disable');
  }

  getPositionAddFunctions() {
    this.additionalSend.style.top = `${-this.additionalSend.offsetHeight}px`;
  }

  validityInput() {
    this.inputData = null;
    if (this.formInputContent.value.trim() === '') {
      this.formInput.reset();
      return null;
    }

    this.inputData = this.formInputContent.value.trim();
    this.formInput.reset();
    return this.inputData;
  }

  scrollToBottom() {
    this.contentList.scrollTop = this.contentList.scrollHeight;
  }

  visiableBlockFiles() {
    this.sendMessageInputText.classList.add('disable');
    this.sendMessageInputFiles.classList.remove('disable');
  }

  disableBlockFiles() {
    this.sendMessageInputText.classList.remove('disable');
    this.sendMessageInputFiles.classList.add('disable');
  }

  activeDropField() {
    this.dropField.classList.add('form-input-files_active');
  }

  disactiveDropField() {
    this.dropField.classList.remove('form-input-files_active');
  }
}
