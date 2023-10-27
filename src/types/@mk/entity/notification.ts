
import { User } from "./user";
import { BaseEntity } from "../common/baseEntity";
import { NotificationType } from "../enum/notificationType";

export interface Notification extends BaseEntity {
    content: string;
    title: string;
    notificationType: NotificationType;
    sentTime: string;
    receiverId: string;
    receiver: User;
}