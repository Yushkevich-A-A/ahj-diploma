export default class EmojiComponent {
    constructor(url, widget) {
        this.widget = widget;
        this.url = url;
        this.emojiList = this.widget.emojiList;
        this.downloadEmoji();
    }

    async downloadEmoji() {
        const response = await fetch(`${this.url}/emoji`);
        const data = await response.json();

    }

    drawArrayEmoji(data) {
        for (let i of data) {
            this.drawEmojiItem(i);
        }
    }

    drawEmojiItem(emoji) {
        const li = document.createElement('li');
        li.classList.add('emoji-item');
        li.innerHTML = `<span class="emoji"></span>`;
        const spanEmoji = li.querySelector('.emoji');
        spanEmoji.textContent = emoji;
        this.emojiList.appendChild(li);
    }
}