const BASE_API = '/api/admin';
const HOME_BASE = `${BASE_API}/home`;

const API_ROUTES = {
    schemaTable: (schema, table) => `${BASE_API}/${schema}/${table}`,
    home: {
        base: HOME_BASE,
        home_page: `${HOME_BASE}/home_page`,
        highlight_stats_about_us: {
            getAll: `${HOME_BASE}/highlight_stats_about_us`,
            getOne: (id) => `${HOME_BASE}/highlight_stats_about_us/${id}`,
        },
    },
}
export default API_ROUTES