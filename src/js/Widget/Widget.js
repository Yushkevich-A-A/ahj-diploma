import DrawItemContent from './DrawItemContent/DrawItemContent';
import DrawWidget from './DrawWidget/DrawWidget';
import ErrorAPI from './ErrorAPI/ErrorAPI';
import LocationComponent from './LocationComponent/LocationComponent';
import StreamRecordHandler from './StreamRecordHandler/StreamRecordHandler';
import UploadFiles from './UploadFiles/UploadFiles';
import WidgetController from './WidgetController/WidgetController';
import StreamAudio from './StreamAudio/StreamAudio';
import StreamVideo from './StreamVideo/StreamVideo';
import NotificationComponent from './NotificationComponent/NotificationComponent';
import EmojiComponent from './EmojiComponent/EmojiComponent';
import HelperComponent from './HelperComponent/HelperComponent';

const url = 'https://yushkevich-ahj-diploma-server.herokuapp.com';

const widget = new DrawWidget(document.body);
const streamRecordComponent = new StreamRecordHandler(widget);
const errorAPI = new ErrorAPI(widget);

const locationComponent = new LocationComponent(widget, errorAPI);
const audioComponent = new StreamAudio(widget, streamRecordComponent, errorAPI);
const videoComponent = new StreamVideo(widget, streamRecordComponent, errorAPI);
const notificationComponent = new NotificationComponent(errorAPI);
const upload = new UploadFiles(widget);
const emoji = new EmojiComponent(url, widget);
const helper = new HelperComponent(widget);

const drawContentList = new DrawItemContent(url, widget.contentList, notificationComponent);
const controller = new WidgetController(url,
  widget,
  drawContentList,
  upload,
  locationComponent,
  audioComponent,
  videoComponent,
  notificationComponent,
  emoji,
  helper);
