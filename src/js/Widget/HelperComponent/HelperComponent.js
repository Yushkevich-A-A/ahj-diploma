export default class HelperComponent {
    constructor(widget) {
        this.widget = widget;
        this.blockDisplayContent = this.widget.blockDisplayContent;
        this.fieldComponent = this.widget.additionalSendList;
        this.hideHelperAPI = this.hideHelperAPI.bind(this);
        this.init()
    }

    init() {
        this.drawHelperSign();
        this.drawHelper();

    }

    drawHelperSign() {
        this.helperSign = document.createElement('li');
        this.helperSign.classList.add('button', 'additional-send-item', 'item-helper');
        this.fieldComponent.appendChild(this.helperSign);
    }

    drawHelper() {
        this.helperAPI = document.createElement('div');
        this.helperAPI.classList.add('helper-api-wrapper', 'disable');
        this.helperAPI.innerHTML = `<div class="helper-api">
                            <div class="helper-api-desc">
                              <h2 class="helper-api-title">Список доступных команд:</h2>
                              <p class="helper-api-text text-helper"><span class="helper-comand">@schedule:</span> час:минута день.месяц.год "Название уведомления" <span class="helper-description">- установка уведомления (дата уведомления должна быть не раньше текущего времени).</span></p>
                              <p class="helper-api-text text-helper"><span class="helper-description">Пример: @schedule: 18:04 31.08.2019 "Последний день лета"</span></p>
                              <p class="helper-api-text text-helper"><span class="helper-comand">@chaos:</span> погода <span class="helper-description">- запрос погоды</span></p>
                              <p class="helper-api-text text-helper"><span class="helper-comand">@chaos:</span> курс <span class="helper-description">- запрос курса валют</span></p>
                              <p class="helper-api-text text-helper"><span class="helper-comand">@chaos:</span> экстренно <span class="helper-description">- запрос номера телефонов экстренных служб</span></p>
                              <p class="helper-api-text text-helper"><span class="helper-comand">@chaos:</span> цитата <span class="helper-description">- получить рандомную цитату</span></p>
                              <p class="helper-api-text text-helper"><span class="helper-comand">@chaos:</span> такси <span class="helper-description">- получить номера телефонов такси</span></p>
                            </div>
                              <div class="block-buttons-helper-api">
                                <button class="button-form-helper-api helper-api-submit">Закрыть</button>
                              </div>
                            </form>
                          </div>`;
        this.blockDisplayContent.appendChild(this.helperAPI);
        this.helperAPItext = this.helperAPI.querySelector('.text-helper');
        this.helperAPICancel = this.helperAPI.querySelector('.helper-api-submit');
        this.helperAPICancel.onclick = this.hideHelperAPI;
    }

    showHelperAPI() {
      this.helperAPI.classList.remove('disable');
    }

    hideHelperAPI() {
      this.helperAPI.classList.add('disable');
    }
}