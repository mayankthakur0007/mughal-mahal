import { API } from "../../constants/global-constants";

export const lmsCategories = {
  findAll() {
    return global.APIService.get(API.lmsCategories);
  },
  findOne(id) {
    return global.APIService.get(API.lmsCategories, id);
  },
  create(data) {
    return global.APIService.post(API.lmsCategories, data);
  },
  update(id, data) {
    return global.APIService.patch(API.lmsCategories, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.lmsCategories, id);
  },
};