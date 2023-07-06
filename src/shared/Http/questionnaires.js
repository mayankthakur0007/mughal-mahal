import { API } from "../../constants/global-constants";

export const questionnaires = {
  findAll() {
    return global.APIService.get(API.lmsQuestionnaires);
  },
  findOne(id) {
    return global.APIService.get(API.lmsQuestionnaires, id);
  },
  create(data) {
    return global.APIService.post(API.lmsQuestionnaires, data);
  },
  update(id, data) {
    return global.APIService.patch(API.lmsQuestionnaires, id, data);
  },
  delete(id) {
    return global.APIService.delete(API.lmsQuestionnaires, id);
  },
};