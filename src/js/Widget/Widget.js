import DrawWidget from "./DrawWidget/DrawWidget";
import WidgetController from "./WidgetController/WidgetController";

const widget = new DrawWidget(document.body);
const controller = new WidgetController(widget);