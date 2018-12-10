// связь приложения с сетью
const APP_ID = 22101985;
const DEFAULT_NAME = `ff`;
const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`Ошибка при загрузке статистики. Статус: ${response.status} ${response.statusText}`);
};

const toJSON = (res) => res.json();

export default class StatsLoader {
  static loadStats() {
    return window.fetch(`https://es.dump.academy/pixel-hunter/stats/${APP_ID}-${DEFAULT_NAME}`)
      .then(checkStatus)
      .then(toJSON);
  }
  static saveStats(data) {
    const requestSettings = {
      body: JSON.stringify({
        results: data,
        gamerName: window.userName
      }),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return window.fetch(`https://es.dump.academy/pixel-hunter/stats/${APP_ID}-${DEFAULT_NAME}`, requestSettings)
      .then(checkStatus);
  }
}
