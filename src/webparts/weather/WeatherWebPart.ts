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
import * as $ from 'jquery';

export default class WeatherWebPart extends BaseClientSideWebPart<IWeatherWebPartProps> {
  private container: JQuery;
  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    const element: React.ReactElement<IWeatherProps> = React.createElement(Weather, {
      description: this.properties.description
    });
    this.renderContents(element);
    //ReactDom.render(element, this.domElement);
  }
  public renderContents(element): void {
    $.when(this.getWeatherCondition())
    .done(function (data) {
      console.log(data);
    })
    .fail(function (err) {
      console.log(err.statusText);
    })

    ReactDom.render(element, this.domElement);
  }
  public getWeatherCondition()
  {
    var d = $.Deferred();
    // Send the request and return the response.
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2251fe39598c8fa472ec4378cf1ef193",
        type: "GET",
        headers: { "accept": "application/json;odata=verbose" },
        success: function (data) {
            d.resolve(data);
        },
        error: function (data) {
            d.reject(data);
        }
    });

    return d.promise();
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
