import iconImage from "../../../assets/images/icon/icon.png";
import type { TDisplayIconProps } from "./icon.types";

export function DisplayIcon({ IconClassName }: TDisplayIconProps) {
  return <img src={iconImage} alt="Su4u Icon" className={IconClassName} />;
}
