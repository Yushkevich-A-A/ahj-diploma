export default class EmojiComponent {
  constructor(url, widget) {
    this.widget = widget;
    this.url = url;
    this.emojiWidget = this.widget.emojiWidget;
    this.emojiList = this.widget.emojiList;
    this.downloadEmoji();
  }

  async downloadEmoji() {
    const response = await fetch(`${this.url}/emoji`);
    const data = await response.json();

    this.drawArrayEmoji(data.data);
  }

  drawArrayEmoji(data) {
    for (const i of data) {
      this.drawEmojiItem(i);
    }
  }

  drawEmojiItem(emoji) {
    const li = document.createElement('li');
    li.classList.add('emoji-item');
    li.innerHTML = '<span class="emoji"></span>';
    const spanEmoji = li.querySelector('.emoji');
    spanEmoji.textContent = emoji;
    this.emojiList.appendChild(li);
  }

  triggerBlockEmodji() {
    if (this.widget.emojiWidget.classList.contains('disable')) {
      this.widget.emojiWidget.classList.remove('disable');
      this.positionBlockEmoji();
      return;
    }
    this.closeBlockEmodji();
  }

  closeBlockEmodji() {
    this.widget.emojiWidget.classList.add('disable');
  }

  positionBlockEmoji() {
    this.emojiWidget.style.top = `${-this.emojiWidget.offsetHeight - 10}px`;
  }
}
