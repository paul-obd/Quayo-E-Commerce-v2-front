export class AppSettings {
  public static getApiUrl() {
    return "http://" + window.location.hostname + ":2714/";
    // return "http://34.73.54.34:1708/WebPortalBackEnd/";
  }

  public static getIsBetaVersion() {
    return true;
  }
}
