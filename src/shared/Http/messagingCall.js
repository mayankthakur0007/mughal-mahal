import { API } from "../../constants/global-constants";

export const messaging = {
  findAll() {
    return global.APIService.get(API.messagingEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.messagingEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.messagingEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.messagingEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.messagingEndpoint, id);
  },
};