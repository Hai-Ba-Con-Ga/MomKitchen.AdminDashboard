export interface BaseEntity {
    id: string;
    createdDate: string;
    updatedDate: string;
    createdBy: string | null;
    updatedBy: string | null;
    isDeleted: boolean;
}