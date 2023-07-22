import { API } from "../../constants/global-constants";

export const messageFromManagement = {
  findAll() {
    return global.APIService.get(API.messageFromManagementEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.messageFromManagementEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.messageFromManagementEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.messageFromManagementEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.messageFromManagementEndpoint, id);
  },
};