import { API } from "../../constants/global-constants";

export const branch = {
  findAll() {
    return global.APIService.get(API.branchEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.branchEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.branchEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.branchEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.branchEndpoint, id);
  },
};