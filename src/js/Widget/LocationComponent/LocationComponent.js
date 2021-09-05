export default class LocationComponent {
    constructor(widget, error) {
        this.widget = widget;
        this.error = error;
        this.fieldComponent = widget.additionalSendList;
        this.availableLocation = false;//???????????????
        this.init()
    }

    init() {
        this.drawLocationSign();
        this.availableLocationAPI();
    }

    drawLocationSign() {
        this.locationSign = document.createElement('li');
        this.locationSign.classList.add('button', 'additional-send-item', 'item-location');
        this.fieldComponent.appendChild(this.locationSign);
    }

    availableLocationAPI() {
        this.availableLocation = !!navigator.geolocation;
    }

    getLocation(handler) {
        navigator.geolocation.getCurrentPosition(
            (pos) => handler(pos),
            () => this.error.showErrorAPI('К сожалению, нам не удалось определить ваше местоположение, пожалуйста, дайте разрешение на использование геолокации'),
          )
    }
}