import ring from './image/ring.png';

export default class NotificationComponent {
  constructor(error) {
    this.error = error;
    if (localStorage.getItem('anavailbleNotification')) {
      this.anavailbleNotification = JSON.parse(localStorage.getItem('anavailbleNotification'));
    } else {
      this.anavailbleNotification = false;
    }

    if (localStorage.getItem('notificationAboutDisable')) {
      this.notificationAboutDisable = JSON.parse(localStorage.getItem('notificationAboutDisable'));
    } else {
      this.notificationAboutDisable = false;
    }
  }

  createArrayNotifications(data) {
    for (const i of data) {
      this.createNotification(i.data);
    }
  }

  async createNotification(data) {
    console.log(data);
    if (!window.Notification) {
      if (!this.anavailbleNotification) {
        localStorage.setItem('anavailbleNotification', JSON.stringify(true));
        this.error.showErrorAPI('Ваш браузер не поддерживает уведомления');
      }
      return;
    }

    if (Notification.permission === 'denied') {
      if (!this.notificationAboutDisable) {
        localStorage.setItem('notificationAboutDisable', JSON.stringify(true));
        this.error.showErrorAPI('уведомления отключены пользователем');
      }
      return;
    }

    if (Notification.permission === 'default') {
      const permission = await Notification.requestPermission();
    }

    if (Notification.permission === 'granted') {
      localStorage.setItem('anavailbleNotification', JSON.stringify(false));
      localStorage.setItem('notificationAboutDisable', JSON.stringify(false));

      if (Date.now() > data.date) {
        return;
      }
      const dalay = data.date - Date.now();
      setTimeout(() => {
        const notification = new Notification(data.content.title, {
          body: data.content.message,
          icon: ring,
          requireInteraction: true,
        });
      }, dalay);
    }
  }
}
