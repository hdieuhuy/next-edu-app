enum EUserStatus {
  ACTIVE = "ACTIVE",
  UNACTIVE = "UNACTIVE",
  BANNED = "BANNED",
  PENDING = "PENDING",
}
enum EUserRole {
  USER = "USER",
  ADMIN = "ADMIN",
  EXPERT = "EXPERT",
}
enum ECourseStatus {
  APPROVED = "APPROVED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}
enum ECourseLevel {
  BEGINNER = "BEGINNER",
  INTERMEDIATE = "INTERMEDIATE",
  ADVANCED = "ADVANCED",
}
enum ELessonType {
  VIDEO = "VIDEO",
  TEXT = "TEXT",
}

export { EUserStatus, EUserRole, ECourseStatus, ECourseLevel, ELessonType };
