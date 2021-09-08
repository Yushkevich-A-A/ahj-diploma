export default class UploadFiles {
  constructor(widget) {
    this.widget = widget;
    this.blockUppload = this.widget.blockPreviewFiles;
    this.upploadList = this.blockUppload.querySelector('.preview-files-list');
    this.currentFile = null;
    this.previewVisiable = false;
  }

  visiableWidget() {
    if (!this.previewVisiable) {
      this.previewVisiable = true;
      this.blockUppload.classList.remove('disable');
    }
  }

  disableWidget() {
    this.previewVisiable = false;
    this.blockUppload.classList.add('disable');
  }

  drawNewFile(name) {
    this.currentFile = document.createElement('li');
    this.currentFile.classList.add('preview-files-item');
    this.currentFile.innerHTML = `<div class="preview-files-item-content">
                            <div class="preview-files-item-icon"></div>
                            <div class="preview-files-item-filename">Прикрепленный файл: <span class="files-item-filename">Здесь условное название файла<span></span></div>
                        </div>
                        <div class="preview-files-item-delete-icon"></div>`;
    const filesItemFilename = this.currentFile.querySelector('.files-item-filename');
    filesItemFilename.textContent = this.nameValidity(name);
    this.upploadList.appendChild(this.currentFile);
  }

  deleteLoadFile() {
    if (this.currentFile === null) {
      return;
    }
    this.currentFile.parentElement.removeChild(this.currentFile);
    this.currentFile = null;
    this.disableWidget();
  }

  nameValidity(data) {
    const value = data;
    if (value.length < 15) {
      return value;
    }

    return `${value.slice(0, 16)}...`;
  }
}
