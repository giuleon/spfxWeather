declare interface IWeatherStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'weatherStrings' {
  const strings: IWeatherStrings;
  export = strings;
}
