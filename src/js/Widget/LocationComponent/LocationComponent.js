export default class LocationComponent {
    constructor(widget) {
        this.widget = widget;
        this.fieldComponent = widget.additionalSendList;
        this.availableLocation = false;

        this.hideErrorCoord = this.hideErrorCoord.bind(this);
        this.showErrorCoord = this.showErrorCoord.bind(this);

        this.init()
    }

    init() {
        this.drawLocationSign();
        this.drawError();
        this.availableLocationAPI();
        // this.addListeners();
    }

    drawLocationSign() {
        this.locationSign = document.createElement('li');
        this.locationSign.classList.add('button', 'additional-send-item', 'item-location');
        this.fieldComponent.appendChild(this.locationSign);
    }

    availableLocationAPI() {
        this.availableLocation = !!navigator.geolocation;
    }

    drawError() {
        this.errorCoord = document.createElement('div');
        this.errorCoord.classList.add('error-location-wrapper', 'disable');
        this.errorCoord.innerHTML = `<div class="errorCoord-coord">
                            <div class="errorCoord-desc">
                              <p class="errorCoord-text">Что-то пошло не так</p>
                              <p class="errorCoord-text">К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации</p>
                            </div>
                              <div class="block-buttons">
                                <button class="button-form-errorCoord errorCoord-submit">Закрыть</button>
                              </div>
                            </form>
                          </div>`;
        document.body.appendChild(this.errorCoord);
        this.errorCoordCancel = this.errorCoord.querySelector('.errorCoord-submit');
        this.errorCoordCancel.onclick = this.hideErrorCoord;
    }

    getLocation(handler) {
        navigator.geolocation.getCurrentPosition(
            (pos) => handler(pos),
            () => this.showErrorCoord(),
          )
    }

    showErrorCoord() {
        this.errorCoord.classList.remove('disable');
    }

    hideErrorCoord() {
        this.errorCoord.classList.add('disable');
      }
}