import DrawItemContent from "./DrawItemContent/DrawItemContent";
import DrawWidget from "./DrawWidget/DrawWidget";
import LocationComponent from "./LocationComponent/LocationComponent";
import UploadFiles from "./UploadFiles/UploadFiles";
import WidgetController from "./WidgetController/WidgetController";

const widget = new DrawWidget(document.body);
const locationComponent = new LocationComponent(widget);
const upload = new UploadFiles(widget);
const drawContentList = new DrawItemContent('http://localhost:7070/', widget.contentList)
const controller = new WidgetController('http://localhost:7070', widget, drawContentList, upload, locationComponent);