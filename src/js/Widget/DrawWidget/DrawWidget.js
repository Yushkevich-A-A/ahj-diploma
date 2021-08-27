// images

import logo from './images/logo.png';
import emoji from './images/buttons/emoji.png';
import paperclip from './images/buttons/paperclip.png';
import send from './images/buttons/send.png';

export default class DrawWidget {
    constructor(element = null) {
        this.element = element;
        this.init();
    }

    init() {
        this.drawWidget();
    }

    drawWidget() {
        this.widget = document.createElement('div');
        this.widget.classList.add('widget-wrapper');
        this.widget.innerHTML = `<div class="widget">
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
                <div class="logo-menu">
                    <div class="logo-menu__div-point"></div>    
                </div>
                <div class="additional-menu disable">
                    <ul class="additional-menu__list">
                        <li>new function</li>
                        <li>new function</li>
                        <li>new function</li>
                        <li>new function</li>
                        <li>new function</li>
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
                <form class="form-input-content">
                <div class="basil-function">
                    <div class="button button-paperclip">
                    <img    class="button-paperclip__img" src="${emoji}" alt="">
                    </div>
                    <div class="button button-emoji">
                      <img class="button-emoji__img" src="${paperclip}" alt="">
                    </div>
                    <input class="input form-input-content__input" type="text" value="Type your message here">
                        <div class="button button-send-message">
                            <img class="button-send-message__img" src="${send}" alt="">
                        </div>
                </div>
                <div class="additional-function">
                </div>
                </form>
            </div>
            </div>
        </div>`;
        this.element.appendChild(this.widget);
        this.contentList = this.widget.querySelector('.list-content');
        this.additionalMenu = this.widget.querySelector('.additional-menu');

    }

    drawContentWidget(data) {
        for(let i of data) {
            this.drawTextContent(i);
        }
    }

    drawContent(data) {
        const li = document.createElement('li');
        li.classList.add('item-content');
        li.innerHTML = `<div class="message-date"></div>`;
        this.contentList.insertAdjacentElement("beforeend", li);
        const messageDate = li.querySelector('.message-date');
        messageDate.textContent = moment(data.content.date).format('DD.MM.YYYY HH:mm');

        let content;
        switch (data.type) {
            case 'text':
                content = this.newText(data.content.text);
                break;
        }

        this.contentList.appendChild(content);
    }

    newText(data) {
        const textMessage = document.createElement('div');
        textMessage.classList.add('message');
        textMessage.textContent = data;
        return textMessage;
    }

    openAddMenu() {
        if (this.additionalMenu.classList.contains('disable')) {
            this.additionalMenu.classList.remove('disable');
            return;
        }
        this.additionalMenu.classList.add('disable');
    }
}