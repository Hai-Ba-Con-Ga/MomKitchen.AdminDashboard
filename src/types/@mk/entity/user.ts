import { Role } from "./role";
import { Notification } from "./notification";
import { Customer } from "./customer";
import { Kitchen } from "./kitchen";
import { BaseEntity } from "../common/baseEntity";

export interface User extends BaseEntity {
  email: string;
  password?: string;
  credential?: string;
  phone: string;
  birthday: string | null;
  avatarUrl: string | null;
  fullName: string;
  roleId: string;
  role?: Role | null;
  notifications?: Notification[];
  customer?: Customer | null;
  kitchen?: Kitchen | null;
}
