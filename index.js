/**
 * @format
 */

/*
 * concept by https://cheesecakelabs.com/blog/atomic-design-react/
 *
 * */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src';

AppRegistry.registerComponent(appName, () => App);
