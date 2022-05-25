export interface Game {
    id:                     number;
    title:                  string;
    thumbnail:              string;
    short_description:      string;
    platform:               Platform;
    developer:              string;
    genre:                  string;
    favourite?:             boolean;
    inCart?:                boolean;
  }
  
  export enum Platform {
    PCWindows = "PC (Windows)",
    PCWindowsWebBrowser = "PC (Windows), Web Browser",
    WebBrowser = "Web Browser",
}
  