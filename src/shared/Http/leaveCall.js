import { API } from "../../constants/global-constants";

export const leaves = {
  findAll() {
    const filterEndpoint = `leaves?filter={"include":[{"relation":"appliedById"}]}`;
    return global.APIService.get(filterEndpoint);
  },
  findOne(id) {
    let filterEndpoint = `leaves?filter={"where":{"appliedBy":"${id}"}}`;
    return global.APIService.get(filterEndpoint);
  },
  create(data) {
    return global.APIService.post(API.leaveEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.leaveEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.leaveEndpoint, id);
  },
};
