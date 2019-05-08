import Splash from './Splash';
import OnBoardingOne from './OnBoardingOne';
import OnBoardingTwo from './OnBoardingTwo';
import OnBoardingThree from './OnBoardingThree';
import Home from './Home';
import Details from './Details';

import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
    Splash: Splash,
    OnBoardingOne: OnBoardingOne,
    OnBoardingTwo: OnBoardingTwo,
    OnBoardingThree: OnBoardingThree,
    Home: Home,
    Details: Details,
});

export default createAppContainer(AppNavigator);
