// notify.js — shared transaction notifier for Sharon Rose Studio sites.
// Real delivery: POSTs to Netlify Forms when deployed (emails you + logs in dashboard),
// falls back to a pre-filled mailto so nothing is ever lost before deploy.
(function () {
  var OWNER_EMAIL = 'sharonrosealgara@gmail.com';

  function isHosted() {
    try {
      return location.protocol.indexOf('http') === 0 &&
             location.hostname &&
             location.hostname !== 'localhost' &&
             location.hostname !== '127.0.0.1';
    } catch (e) { return false; }
  }

  function encodeForm(obj) {
    return Object.keys(obj).map(function (k) {
      return encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]);
    }).join('&');
  }

  function mailtoFallback(subject, data) {
    var lines = Object.keys(data).map(function (k) { return k + ': ' + data[k]; });
    var body = 'A new ' + (data['form-name'] || 'submission') +
      ' came in from your website:\n\n' + lines.join('\n') +
      '\n\n— Sent automatically from your site';
    try {
      window.location.href = 'mailto:' + OWNER_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);
    } catch (e) {}
  }

  // notifyStudio(formName, subject, dataObj) → returns a Promise-ish (best effort).
  window.notifyStudio = function (formName, subject, data) {
    var payload = Object.assign({ 'form-name': formName, _subject: subject, _time: new Date().toLocaleString() }, data || {});
    if (isHosted()) {
      try {
        return fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: encodeForm(payload)
        }).catch(function () { mailtoFallback(subject, payload); });
      } catch (e) { mailtoFallback(subject, payload); }
    } else {
      mailtoFallback(subject, payload);
    }
  };

  window.STUDIO_OWNER_EMAIL = OWNER_EMAIL;
})();
