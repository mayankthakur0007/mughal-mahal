import { API } from "../../constants/global-constants";

export const internalComms = {
  findAll() {
    return global.APIService.get(API.internalCommsEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.internalCommsEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.internalCommsEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.internalCommsEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.internalCommsEndpoint, id);
  },
};