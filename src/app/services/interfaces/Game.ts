export interface Game {
    title:                  string;
    thumbnail:              string;
    short_description:      string;
    platform:               Platform;
    developer:              string;
  }
  
  export enum Platform {
    PCWindows = "PC (Windows)",
    PCWindowsWebBrowser = "PC (Windows), Web Browser",
    WebBrowser = "Web Browser",
}
  