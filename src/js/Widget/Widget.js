import DrawItemContent from "./DrawItemContent/DrawItemContent";
import DrawWidget from "./DrawWidget/DrawWidget";
import WidgetController from "./WidgetController/WidgetController";

const widget = new DrawWidget(document.body);
const drawContentList = new DrawItemContent('http://localhost:7070/', widget.contentList)
const controller = new WidgetController('http://localhost:7070', widget, drawContentList);