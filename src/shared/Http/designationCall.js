import { API } from "../../constants/global-constants";

export const designation = {
  findAll() {
    return global.APIService.get(API.designationEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.designationEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.designationEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.designationEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.designationEndpoint, id);
  },
};
