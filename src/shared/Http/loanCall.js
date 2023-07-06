import { API } from "../../constants/global-constants";
import Service from "./Http";

const services = new Service();

export const loan = {
  findAll() {
    return services.get(API.loanEndpoint);
  },
  findOne(id) {
    return services.get(API.loanEndpoint, id);
  },
  create(data) {
    return services.post(API.loanEndpoint, data);
  },
  update(id, data) {
    return services.put(API.loanEndpoint, id, data);
  },
  delete(id) {
    return services.delete(API.loanEndpoint, id);
  },
};
