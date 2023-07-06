import { API } from "../../constants/global-constants";

export const user = {
    create(data) {
      return global.APIService.post(API.loginEndpoint, data);
    },
    findOne(token) {
      return global.APIService.getUserInfo(API.userInfoEndpoint, token);
    },
  };
  