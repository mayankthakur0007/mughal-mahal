import { API } from "../../constants/global-constants";

export const mom = {
  findAll() {
    return global.APIService.get(API.momEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.momEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.momEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.momEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.momEndpoint, id);
  },
};