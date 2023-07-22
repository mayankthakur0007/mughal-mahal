import { API } from "../../constants/global-constants";

export const media = {
  create(data) {
    return global.APIService.post(API.media, data);
  },
};