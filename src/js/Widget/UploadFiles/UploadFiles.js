export default class UploadFiles {
    constructor(widget) {
        this.widget = widget
        this.blockUppload = this.widget.blockPreviewFiles;
        this.upploadList = this.blockUppload.querySelector('.preview-files-list');
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

    drawNewFile(name, index) {
        const li = document.createElement('li');
        li.classList.add('preview-files-item');
        li.innerHTML = `<div class="preview-files-item-content">
                            <div class="preview-files-item-icon"></div>
                            <div class="preview-files-item-filename">Прикрепленный файл: <span class="files-item-filename">Здесь условное название файла<span></span></div>
                        </div>
                        <div class="preview-files-item-delete-icon"></div>`;
        const filesItemFilename = li.querySelector('.files-item-filename');
        filesItemFilename.textContent = this.nameValidity(name);
        li.dataset.indexUploadFile = index;
        this.upploadList.insertAdjacentElement('afterbegin', li);

        this.getPositionBlock();
    }

    deleteLoadFile(element) {
        const deleteElement = element.closest('.preview-files-item')
        const deleteIndex = +deleteElement.dataset.indexUploadFile;
        deleteElement.parentElement.removeChild(deleteElement);
        debugger;
        this.checkEmptyElement();
        return deleteIndex;
    }

    deleteAllLoadFiles() {
        this.upploadList.innerHTML = '';
        this.checkEmptyElement();
    }

    checkEmptyElement() {
        const arrayElement = this.upploadList.querySelectorAll('.preview-files-item');
        if(arrayElement.length === 0) {
            this.disableWidget();
        }
        return;
    }
    
    nameValidity(data) {
        const value = data;
        if (value.length < 15) {
            return value;
        }

        return value.slice(0, 16) + "...";
    }
    
    getPositionBlock() {
        this.blockUppload.style.top = -this.blockUppload.offsetHeight - 10 + 'px';
    }
}