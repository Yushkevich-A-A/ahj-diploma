import DrawItemContent from "./drawItemContent/drawItemContent";
import DrawWidget from "./DrawWidget/DrawWidget";
import WidgetController from "./WidgetController/WidgetController";

const widget = new DrawWidget(document.body);
const drawContentList = new DrawItemContent(widget.contentList)
const controller = new WidgetController(widget);