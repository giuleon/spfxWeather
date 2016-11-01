import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import * as strings from 'weatherStrings';
import Weather, { IWeatherProps } from './components/Weather';
import { IWeatherWebPartProps } from './IWeatherWebPartProps';

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {
  public constructor(context: IWebPartContext) {
    super(context);
  }
  public render(): void {
    const element: React.ReactElement<IWeatherProps> = React.createElement(Weather, {
      basicHttpClient: this.context.basicHttpClient,
      description: this.properties.description,
      location: this.properties.location
    });
    ReactDom.render(element, this.domElement);
  }
  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('location', {
                  label: strings.LocationFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
