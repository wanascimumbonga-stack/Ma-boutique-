/* Réglages de la vitrine. Laisse SUPABASE_URL et SUPABASE_KEY vides pour le mode démonstration.
   SUPABASE_KEY : la clé PUBLIQUE (« anon » ou « publishable »). Jamais la clé « service_role » ou « secret ». */
window.MB_CONFIG = Object.assign({
  SUPABASE_URL: "",
  SUPABASE_KEY: "",
  NUVALK_URL: "",
  ADMIN_WHATSAPP: ""
}, window.MB_CONFIG || {});
