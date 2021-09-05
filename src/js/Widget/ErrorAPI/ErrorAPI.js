export default class ErrorAPI {
    constructor(widget) {
    this.widget = widget;

    this.hideErrorAPI = this.hideErrorAPI.bind(this);
    this.showErrorAPI = this.showErrorAPI.bind(this);

    this.drawError()
    }

    drawError() {
        this.errorAPI = document.createElement('div');
        this.errorAPI.classList.add('error-api-wrapper', 'disable');
        this.errorAPI.innerHTML = `<div class="error-api">
                            <div class="error-api-desc">
                              <p class="error-api-text">Что-то пошло не так</p>
                              <p class="error-api-text text-error"></p>
                            </div>
                              <div class="block-buttons-error-api">
                                <button class="button-form-error-api error-api-submit">Закрыть</button>
                              </div>
                            </form>
                          </div>`;
        document.body.appendChild(this.errorAPI);
        this.errorAPItext = this.errorAPI.querySelector('.text-error');
        this.errorAPICancel = this.errorAPI.querySelector('.error-api-submit');
        this.errorAPICancel.onclick = this.hideErrorAPI;
    }

    showErrorAPI(dataError) {
      console.log(dataError);
      this.errorAPItext.textContent = dataError;
      this.errorAPI.classList.remove('disable');
    }

    hideErrorAPI() {
      this.errorAPItext.textContent = '';
      this.errorAPI.classList.add('disable');
    }
}
