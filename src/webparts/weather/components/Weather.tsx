import * as React from 'react';
import { css } from 'office-ui-fabric-react';
import { BasicHttpClient } from '@microsoft/sp-client-base';

import styles from '../Weather.module.scss';
import { IWeatherWebPartProps } from '../IWeatherWebPartProps';

export interface IWeatherProps extends IWeatherWebPartProps {
  basicHttpClient: BasicHttpClient;
}

export interface IWeatherState {
  status: string;
  items: IListItem[];
  temp: string;
}

export interface IListItem {
  icon: string;
  description: string;
  main: string;
  weather: [
    {
      id: string,
      main: string,
      description: string,
      icon: string,
      temp: string
    }
  ],
}

export default class Weather extends React.Component<IWeatherProps, IWeatherState> {
  constructor(props: IWeatherProps, state: IWeatherState) {
    super(props);

    this.state = {
      status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
      items: [],
      temp: ""
    };
  }
  public componentWillReceiveProps(nextProps: IWeatherProps): void {
    console.log("componentWillReceiveProps!!!!!!!");
    this.getWeatherCondition(nextProps.location);
    //this.listItemEntityTypeName = undefined;
    // this.setState({
    //   status: this.listNotConfigured(nextProps) ? 'Please configure list in Web Part properties' : 'Ready',
    //   items: [],
    //   temp: ""
    // });
  }
  public render(): JSX.Element {
    const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {
      if(item.icon.indexOf("http://") === 0) {
        item.icon = item.icon;
        return (
          <div>
            <img src={item.icon}/>
            <span className='ms-fontSize-su ms-fontColor-white'>{this.state.temp}° - {item.main} - {item.description}</span>
          </div>
        );
      }
      else {
        item.icon = "http://openweathermap.org/img/w/" + item.icon + ".png";
        return (
          <div>
            <img src={item.icon}/>
            <span className='ms-fontSize-su ms-fontColor-white'>{this.state.temp}° - {item.main} - {item.description}</span>
          </div>
        );
      }
    });

    return (
      <div className={styles.weather}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row)}>
            <div className='ms-Grid-col ms-u-lg12 ms-u-xl12'>
              <span className='ms-font-xl ms-fontColor-white'>
                Welcome to SharePoint!
              </span>
              <p className='ms-font-l ms-fontColor-white'>
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.description}
              </p>
              <p className='ms-font-l ms-fontColor-white'>
                {this.props.location}
              </p>
              <a
                className={css('ms-Button', styles.button)}
                href='https://github.com/SharePoint/sp-dev-docs/wiki'
              >
                <span className='ms-Button-label'>Learn more</span>
              </a>
              <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row) }>
                <div className='ms-Grid-col ms-u-lg12 ms-u-xl12'>
                  {items}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  public componentDidMount() {
    console.log("componentDidMount!!");
    this.getWeatherCondition(this.props.location);
  }
  private getWeatherCondition(location: string): void {
    var loc = location;
    this.props.basicHttpClient.get(`http://api.openweathermap.org/data/2.5/weather?q='${loc}'&units=metric&APPID=2251fe39598c8fa472ec4378cf1ef193`, {
      headers: {
        'Accept': 'application/json;odata=nometadata'
      }
    })
      .then((response: Response): Promise<{ weather: IListItem[] }> => {
        return response.json();
      })
      .then((response: { weather: IListItem[], main: IWeatherState }): void => {
        this.setState({
          status: `Successfully loaded ${response} items`,
          items: response.weather,
          temp: response.main.temp
        });
      }, (error: any): void => {
        this.setState({
          status: 'Loading all items failed with error: ' + error,
          items: [],
          temp: ""
        });
      });
  }
  private listNotConfigured(props: IWeatherProps): boolean {
    return props.location === undefined ||
      props.location === null ||
      props.location.length === 0;
  }
}
