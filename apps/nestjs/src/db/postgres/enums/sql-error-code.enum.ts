export enum SqlErrorCode {
  // Integrity Constraint Violation
  UNIQUE_VIOLATION = '23505',
  FOREIGN_KEY_VIOLATION = '23503',
  NOT_NULL_VIOLATION = '23502',
  CHECK_VIOLATION = '23514',
  EXCLUSION_VIOLATION = '23P01',

  //Class 42 — Syntax Error or Access Rule Violation
  SYNTAX_ERROR = '42601',
  INSUFFICIENT_PRIVILEGE = '42501',
  CANNOT_DROP = '2BP01',
}
