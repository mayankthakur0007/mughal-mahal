import { API } from "../../constants/global-constants";

export const staff = {
  findAll() {
    return global.APIService.get(API.staffEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.staffEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.staffEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.staffEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.staffEndpoint, id);
  },
};
