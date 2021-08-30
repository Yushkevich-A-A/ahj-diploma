export default class DrawItemContent {
    constructor(contentList) {
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
        li.classList.add('item-content');
        li.innerHTML = `<div class="content-message">
                            <div class="block-date-download">
                                <div class="message-date">
                                    08.12.2545 19:52
                                </div>
                                <div class="download-file">
                                    <img class="download-file__img" src="./image/download.png" alt="">
                                </div>
                            </div>
                            <div class="block-content">
                                <div class="message">Привет мир</div>
                                <video class="message__video" controls src='./testContent/videoplayback.mp4'></video>
                            </div>
                        </div>`;
        li.dataset.idPost = data.id;
        
        const contentMessage = li.querySelector('.link');
        contentMessage.href = data.content;
        contentMessage.target = '_blank'
        contentMessage.textContent = data.content;

        return li;



        const linkMessage = document.createElement('a');
        linkMessage.classList.add('link');
        linkMessage.href = data;
        linkMessage.target = '_blank'
        linkMessage.textContent = data;
        return linkMessage;
    }

    newAudio(data) {

    }

    newImage(data) {

    }
}