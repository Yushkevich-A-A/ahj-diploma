import DrawItemContent from "./DrawItemContent/DrawItemContent";
import DrawWidget from "./DrawWidget/DrawWidget";
import ErrorAPI from ".//ErrorAPI/ErrorAPI";
import LocationComponent from "./LocationComponent/LocationComponent";
import StreamRecordHandler from "./StreamRecordHandler/StreamRecordHandler";
import UploadFiles from "./UploadFiles/UploadFiles";
import WidgetController from "./WidgetController/WidgetController";
import StreamAudio from "./StreamAudio/StreamAudio";
import StreamVideo from "./StreamVideo/StreamVideo";

const widget = new DrawWidget(document.body);
const streamRecordComponent = new StreamRecordHandler(widget);
const errorAPI = new ErrorAPI(widget);

const locationComponent = new LocationComponent(widget, errorAPI);
const audioComponent = new StreamAudio(widget, streamRecordComponent, errorAPI);
const videoComponent = new StreamVideo(widget, streamRecordComponent, errorAPI);
const upload = new UploadFiles(widget);

const drawContentList = new DrawItemContent('http://localhost:7070/', widget.contentList)
const controller = new WidgetController('http://localhost:7070', widget, drawContentList, upload, locationComponent, audioComponent, videoComponent);