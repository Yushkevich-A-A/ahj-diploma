export default class WidgetController {
    constructor(widget) {
        this.widget = widget;
        this.init();
    }

    init() {
        this.listeners();
    }

    listeners() {
        document.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.closest('.logo-menu')) {
                this.widget.openAddMenu();
            }
        })
    }
}