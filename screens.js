import { Navigation } from 'react-native-navigation';
import home from './Screens/home';
import chooseCategory from './Screens/chooseCategory';
import railEnquiry from './Screens/railEnquiry';
import liveStatus from './Screens/liveStatus';
import route from './Screens/route';
import trainBetweenStations from './Screens/trainBetweenStations';
import arrivals from './Screens/arrivals';

export function registerScreens() {
	Navigation.registerComponent('home', () => home);
	Navigation.registerComponent('chooseCategory', () => chooseCategory);
	Navigation.registerComponent('railEnquiry', () => railEnquiry);
	Navigation.registerComponent('liveStatus', () => liveStatus);
	Navigation.registerComponent('route', () => route);
	Navigation.registerComponent('trainBetweenStations', () => trainBetweenStations);
	Navigation.registerComponent('arrivals', () => arrivals);
}
