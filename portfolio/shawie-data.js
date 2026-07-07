/* ============================================================================
   SHAWIE OS — Data Service Layer  (window.ShawieData)
   ----------------------------------------------------------------------------
   ONE reusable client for every back-office module (Admin, Portal, Dashboard).
   - Reads endpoint URLs from window.SHAWIE_CONFIG.endpoints (shawie-config.js).
   - Talks ONLY to n8n webhooks. No Airtable tokens ever touch the browser.
   - Every method resolves to normalised data OR null. `null` means "no endpoint
     configured / request failed" — callers then fall back to their built-in
     demo data, so the UI never breaks while the backend is still being built.
   - Timeouts + try/catch on every call. No throwing into the UI.
   ============================================================================ */
(function () {
  'use strict';

  var DEFAULT_TIMEOUT = 9000;

  function cfg() {
    return (window.SHAWIE_CONFIG && window.SHAWIE_CONFIG.endpoints) || {};
  }

  /* Low-level GET with timeout. Returns parsed JSON, or null on any failure. */
  function getJSON(url) {
    if (!url) return Promise.resolve(null);
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, DEFAULT_TIMEOUT);
    return fetch(url, { method: 'GET', signal: controller.signal })
      .then(function (r) { return r.ok ? r.json() : null; })
      .catch(function () { return null; })
      .then(function (data) { clearTimeout(timer); return data; });
  }

  /* Low-level POST (JSON). Returns {ok, status} — never throws. */
  function postJSON(url, payload) {
    if (!url) return Promise.resolve({ ok: false, status: 0, error: 'no-url' });
    var controller = new AbortController();
    var timer = setTimeout(function () { controller.abort(); }, DEFAULT_TIMEOUT);
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload || {})
    })
      .then(function (r) { return { ok: r.ok, status: r.status }; })
      .catch(function (e) { return { ok: false, status: 0, error: String(e) }; })
      .then(function (res) { clearTimeout(timer); return res; });
  }

  /* Airtable/n8n responses vary in shape. Accept the common ones and return a
     plain array of record objects. */
  function toRecords(data) {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.records)) return data.records.map(function (r) { return r.fields || r; });
    if (Array.isArray(data.data)) return data.data;
    if (Array.isArray(data.items)) return data.items;
    return [];
  }

  /* Read a field by any of several likely names (Airtable columns vary). */
  function pick(obj, names, fallback) {
    for (var i = 0; i < names.length; i++) {
      if (obj[names[i]] != null && obj[names[i]] !== '') return obj[names[i]];
    }
    return fallback !== undefined ? fallback : '';
  }

  /* "₱80,000" / "80000" / 80000 -> 80000 (number). */
  function toNumber(v) {
    if (typeof v === 'number') return v;
    var n = parseInt(String(v || '').replace(/[^0-9]/g, ''), 10);
    return isNaN(n) ? 0 : n;
  }

  var ShawieData = {

    /* --- Phase 3: Inquiries → CRM leads -------------------------------------
       Returns an array of normalised lead objects, or null (use demo data).
       Lead shape matches the Admin CRM: {id,name,event,when,value,stage}.     */
    getInquiries: function () {
      return getJSON(cfg().inquiries).then(function (data) {
        if (!data) return null;
        var recs = toRecords(data);
        if (!recs.length) return null;
        return recs.map(function (r, i) {
          return {
            id:    pick(r, ['id', 'Id', 'recordId'], i + 1),
            name:  pick(r, ['Client Name', 'Name', 'client_name'], 'New Inquiry'),
            event: pick(r, ['Event Type', 'event_type', 'Event'], 'Event'),
            when:  pick(r, ['Event Date', 'event_date', 'Date'], ''),
            value: toNumber(pick(r, ['Budget', 'budget', 'Value'], 0)),
            stage: 0 /* new inquiries always enter as "New Lead" */
          };
        });
      });
    },

    /* --- Future phases (same pattern; wired when endpoints are set) --------- */
    getBookings: function () { return getJSON(cfg().bookings).then(function (d) { return d ? toRecords(d) : null; }); },
    getPayments: function () { return getJSON(cfg().payments).then(function (d) { return d ? toRecords(d) : null; }); },
    getClient:   function () { return getJSON(cfg().clients).then(function (d) { return d ? toRecords(d) : null; }); },

    /* Reusable inquiry POST (the public form can adopt this too). */
    submitInquiry: function (payload) {
      var url = (window.SHAWIE_CONFIG && window.SHAWIE_CONFIG.n8nWebhookUrl) || '';
      return postJSON(url, payload);
    },

    /* expose helpers for callers that want them */
    _util: { toRecords: toRecords, toNumber: toNumber, pick: pick }
  };

  window.ShawieData = ShawieData;
})();
