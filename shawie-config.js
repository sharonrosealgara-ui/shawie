/* ============================================================================
   SHAWIE OS — Integration Config
   ----------------------------------------------------------------------------
   This is the ONLY file you edit to connect the live automation pipeline.
   Never put Airtable tokens or API keys here — those stay inside n8n.
   n8n is the secure middleware between this website and Airtable.
   ============================================================================ */
window.SHAWIE_CONFIG = {

  /* 1) Your n8n webhook URL for NEW inquiries.
     Paste the Test URL while building, swap to the Production URL when live.
     Example: 'https://YOUR-SUBDOMAIN.app.n8n.cloud/webhook/xxxxxxxx'         */
  n8nWebhookUrl: 'https://sharonalgara.app.n8n.cloud/webhook-test/shawie-Inquiry',

  /* 2) (Future phases) read/write endpoints — each is its own n8n webhook that
     talks to Airtable. Leave blank until you build them; modules that need a
     missing endpoint will fall back to their built-in demo data.             */
  endpoints: {
    inquiries: '',   // GET list of inquiries        (Admin console)
    bookings:  '',   // GET/POST bookings            (Booking management)
    payments:  '',   // GET/POST payment status      (Payments)
    clients:   '',   // GET a client's own record    (Client Portal)
    email:     ''    // POST to trigger an email send (Email automation)
  },

  /* 3) Business contact fallbacks (already used across the site).            */
  contact: {
    whatsapp: 'https://wa.me/639369037613',
    calendly: 'https://calendly.com/sharonrosealgara/30min',
    email:    'sharonrosealgara@gmail.com'
  }
};
