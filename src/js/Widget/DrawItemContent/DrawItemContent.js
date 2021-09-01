import download from './image/download.png';

import moment from 'moment';
import 'moment/locale/ru';

moment().locale('ru');

export default class DrawItemContent {
    constructor(url, contentList) {
        this.url = url;
        this.contentList = contentList;
    }

    drawContentWidget(data) {
        for(let i of data) {
            this.drawContent(i);
        }
    }

    drawContent(item, newMessage = false) {
        let content;
        switch (item.type) {
            case 'text':
                content = this.newText(item.data);
                break;
            case 'link':
                content = this.newLink(item.data);
                break;
            case 'audio':
                content = this.newAudio(item.data);
                break;
            case 'video':
                content = this.newVideo(item.data);
                break;
            case 'image':
                debugger;
                content = this.newImage(item.data);
                break;
        }

        if (newMessage) {
            this.contentList.appendChild(content);
        } else {
            this.contentList.insertAdjacentElement("beforeend", content); 
        }
    }

    newText(data) {
        const li = document.createElement('li');
        li.classList.add('item-content');
        li.innerHTML = `<div class="content-message">
                            <div class="message-date"></div>
                            <div class="message"></div>
                        </div>`;
        li.dataset.idPost = data.id;

        const messageDate = li.querySelector('.message-date');
        messageDate.textContent = moment(data.date).format('DD.MM.YYYY HH:mm');
        const contentMessage = li.querySelector('.message');
        contentMessage.textContent = data.content;

        return li;
    }

    newLink(data) {
        const li = document.createElement('li');
        li.classList.add('item-content');
        li.innerHTML = `<div class="content-message">
                            <div class="message-date">${moment(data.date).format('DD.MM.YYYY HH:mm')}</div>
                            <a class="link"></a>
                        </div>`;
        li.dataset.idPost = data.id;
        
        const contentMessage = li.querySelector('.link');
        contentMessage.href = data.content;
        contentMessage.target = '_blank'
        contentMessage.textContent = data.content;

        return li;
    }

    newVideo(data) {
        const li = document.createElement('li');
        li.classList.add('item-content', 'item__video');
        li.innerHTML = `<div class="content-message">
                            <div class="block-date-download">
                                <div class="message-date">
                                ${moment(data.date).format('DD.MM.YYYY HH:mm')}
                                </div>
                                <div class="download-file">
                                    <a class="download-file__link" download>
                                        <img class="download-file__img" src="${download}" alt="скачать">
                                    </a>
                                </div>
                            </div>
                            <div class="block-content">
                                <video class="message__video" controls></video>
                            </div>
                        </div>`;
        li.dataset.idPost = data.id;
        
        const downloadLink = li.querySelector('.download-file__link');
        downloadLink.href = this.url + data.content.sourse;

        if (data.content.text) {
            const contentBlock = li.querySelector('.block-content');
            const message = document.createElement('div');
            message.classList.add('message');
            contentBlock.insertAdjacentElement("beforeend", message); 
        }
        const messageVideo = li.querySelector('.message__video');
        messageVideo.src = this.url + data.content.content.sourse;
        return li;
    }

    newAudio(data) {
        const li = document.createElement('li');
        li.classList.add('item-content', 'item__audio');
        li.innerHTML = `<div class="content-message">
                            <div class="block-date-download">
                                <div class="message-date">
                                ${moment(data.date).format('DD.MM.YYYY HH:mm')}
                                </div>
                                <div class="download-file">
                                    <a class="download-file__link" download>
                                        <img class="download-file__img" src="${download}" alt="скачать">
                                    </a>
                                </div>
                            </div>
                            <div class="block-content">
                                <audio class="message__audio" controls></audio>
                            </div>
                        </div>`;
        li.dataset.idPost = data.id;
        
        const downloadLink = li.querySelector('.download-file__link');
        downloadLink.href = data.content.sourse;

        if (data.content.text) {
            const contentBlock = li.querySelector('.block-content');
            const message = document.createElement('div');
            message.classList.add('message');
            contentBlock.insertAdjacentElement("beforeend", message); 
        }
        const messageAudio = li.querySelector('.message__audio');
        messageAudio.src = data.content.sourse;
        return li;
    }

    newImage(data) {
        const li = document.createElement('li');
        li.classList.add('item-content', 'item__img');
        li.innerHTML = `<div class="content-message">
                            <div class="block-date-download">
                                <div class="message-date">
                                ${moment(data.date).format('DD.MM.YYYY HH:mm')}
                                </div>
                                <div class="download-file">
                                    <a class="download-file__link" download>
                                        <img class="download-file__img" src="${download}" alt="скачать">
                                    </a>
                                </div>
                            </div>
                            <div class="block-content">
                                <img class="message__img" src=""></img>
                            </div>
                        </div>`;
        li.dataset.idPost = data.id;
        
        const downloadLink = li.querySelector('.download-file__link');
        downloadLink.href = this.url + data.content.link;

        if (data.content.text) {
            const contentBlock = li.querySelector('.block-content');
            const message = document.createElement('div');
            message.classList.add('message');
            contentBlock.insertAdjacentElement("beforeend", message); 
        }
        const messageImg = li.querySelector('.message__img');
        messageImg.src = this.url + data.content.link;
        return li;
    }
}