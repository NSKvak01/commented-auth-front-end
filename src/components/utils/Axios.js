import axios from "axios"
// we bring axios to set development mode when using localhost 8080
const Axios = axios.create({
    baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:8080"
    :"DEPLOY CLOUD ADDRESS",
    timeout:50000
})
// export axios
export default Axios