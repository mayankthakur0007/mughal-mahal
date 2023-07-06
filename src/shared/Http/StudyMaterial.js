import { API } from "../../constants/global-constants";

export const studyMaterial = {
  findAll() {
    return global.APIService.get(API.studyMaterailEndpoint);
  },
  findOne(id) {
    return global.APIService.get(API.studyMaterailEndpoint, id);
  },
  create(data) {
    return global.APIService.post(API.studyMaterailEndpoint, data);
  },
  update(id, data) {
    return global.APIService.patch(API.studyMaterailEndpoint, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.studyMaterailEndpoint, id);
  },
};