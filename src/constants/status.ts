import {
  checkmarkCircleOutline,
  checkmarkDoneCircleOutline,
  banOutline,
  hourglassOutline,
  timeOutline,
} from "ionicons/icons";

const possibleStatus = ["waiting", "preparing", "ready", "collected"];
export const possibleStatusWithIcons = {
  preparing: hourglassOutline,
  waiting: timeOutline,
  ready: checkmarkCircleOutline,
  collected: checkmarkDoneCircleOutline,
  cancelled: banOutline,
};

export default possibleStatus;
