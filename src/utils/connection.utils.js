import axios from "axios";

const local_cloud_url = axios.create({ baseURL: "http://100.117.82.121:4000" });

// const local_cloud_url = axios.create({ baseURL: "http://localhost:4000" });

const local_url = axios.create({ baseURL: "http://localhost:4000" });

export { local_cloud_url, local_url };
