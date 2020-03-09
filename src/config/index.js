export default {
    NODE_ENV: process.env.NODE_ENV,
    API_ROOT: process.env.NODE_ENV === 'production'? 'http://mall-server:8185':'http://localhost:9999'
}
