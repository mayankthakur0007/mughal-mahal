import axios from "axios";
import { apiURL } from "../../constants/global-constants";

class Service {
  constructor() {
    this.service = axios.create({
      baseURL: apiURL,
    });
  }

  joinURL(endpoint, id = "") {
    if (id === "") {
      return `${apiURL}${endpoint}`;
    } else {
      return `${apiURL}${endpoint}/${id}`;
    }
  }

  async get(endpoint, id) {
    let url = this.joinURL(endpoint, id);
    return await this.service.get(`${url}`).then((res) => res);
  }

  async getUserInfo(endpoint, token) {
    let url = this.joinURL(endpoint);
    return await this.service.get(`${url}`, { headers: {"Authorization" : `Bearer ${token}`} }).then((res) => res);
  }

  async post(endpoint, data) {
    let url = this.joinURL(endpoint);
    return await this.service.post(`${url}`, data).then((res) => res);
  }

  async put(endpoint, id, data) {
    let url = this.joinURL(endpoint, id);
    return await this.service.put(`${url}`, data).then((res) => res);
  }

  async patch(endpoint, id, data) {
    let url = this.joinURL(endpoint, id);
    return await this.service.put(`${url}`, data).then((res) => res);
  }

  async delete(endpoint, id) {
    let url = this.joinURL(endpoint, id);
    return await this.service.delete(`${url}`).then((res) => res);
  }
}

export default Service;
