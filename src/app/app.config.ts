export class AppConfig {

  // Server connection
  public static get SERVER_URL(): string { return 'https://api.classpip.com'; } // PRO
  // public static get SERVER_URL(): string { return 'http://localhost:3000'; } // DEV

  public static get TEACHER_URL(): string { return this.SERVER_URL + '/api/teachers'; }
  public static get STUDENT_URL(): string { return this.SERVER_URL + '/api/students'; }
  public static get SCHOOLADMIN_URL(): string { return this.SERVER_URL + '/api/schooladministrators'; }
  public static get SCHOOL_URL(): string { return this.SERVER_URL + '/api/schools'; }
  public static get AVATARS_URL(): string { return this.SERVER_URL + '/api/avatars'; }
  public static get MATTERS_URL(): string { return this.SERVER_URL + '/api/matters'; }
  public static get GRADES_URL(): string { return this.SERVER_URL + '/api/grades'; }
  public static get GROUP_URL(): string { return this.SERVER_URL + '/api/groups'; }

  public static get LOGIN_URL(): string { return '/login'; }
  public static get LOGOUT_URL(): string { return '/logout'; }
  public static get MYSCHOOL_URL(): string { return '/school'; }
  public static get AVATAR_URL(): string { return '/avatar'; }
  public static get TEACHERS_URL(): string { return '/teachers'; }
  public static get STUDENTS_URL(): string { return '/students'; }
  public static get COUNT_URL(): string { return '/count'; }
  public static get GROUPS_URL(): string { return '/groups'; }

  public static get AUTH_HEADER(): string { return 'Authorization'; }

  // Errors
  public static get LOGIN_FAILED(): string { return 'LOGIN_FAILED'; }
  public static get LOGIN_FAILED_EMAIL_NOT_VERIFIED(): string { return 'LOGIN_FAILED_EMAIL_NOT_VERIFIED'; }

  // i18n configuration
  public static get LANG(): string { return 'es'; }
  public static get LANG_PATH(): string { return 'assets/i18n'; }
  public static get LANG_EXT(): string { return '.json'; }

  // HockeyApp configuration
  public static get HA_ANDROID(): string { return '28e430f7c3ff43a09612241131067b87'; }
  public static get HA_IOS(): string { return '48f58abaa6f5465593b8dc2db7e924c2'; }

}
