export interface Game {
    id:                     number;
    title:                  string;
    thumbnail:              string;
    short_description:      string;
    game_url:               string;
    platform:               Platform;
    publisher:              string;
    developer:              string;
    release_date:           string;
    freetogame_profile_url: string;
  }
  
  export enum Platform {
    PCWindows = "PC (Windows)",
    PCWindowsWebBrowser = "PC (Windows), Web Browser",
    WebBrowser = "Web Browser",
}
  