import { Component } from 'react';
import Notifications from '../Notifications/Notifications';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import CourseList from '../CourseList/CourseList';
import { getLatestNotification } from '../utils/utils';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import newContext from '../Context/context';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
];

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayDrawer: false,
      context: {
        user: {
          email: '',
          password: '',
          isLoggedIn: false,
        },
        logOut: this.logOut,
      },
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = (e) => {
    if (e.ctrlKey && e.key === 'h') {
      alert('Logging you out');
      if (this.state.context && this.state.context.logOut) {
        this.state.context.logOut();
      }
    }
  };

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  logIn = (email, password) => {
    this.setState((prev) => ({
      context: {
        ...prev.context,
        user: {
          email,
          password,
          isLoggedIn: true,
        },
        logOut: prev.context.logOut || this.logOut,
      },
    }));
  };

  logOut = () => {
    this.setState((prev) => ({
      context: {
        ...prev.context,
        user: {
          email: '',
          password: '',
          isLoggedIn: false,
        },
        logOut: prev.context.logOut || this.logOut,
      },
    }));
  };

  render() {
    const { displayDrawer, context } = this.state;
    const isLoggedIn = context.user.isLoggedIn;

    return (
      <newContext.Provider value={context}>
        <div className="relative px-3 min-h-screen flex flex-col">
          <div className="absolute top-0 right-0 z-10">
            <Notifications
              notifications={[]}
              displayDrawer={displayDrawer}
              handleDisplayDrawer={this.handleDisplayDrawer}
              handleHideDrawer={this.handleHideDrawer}
            />
          </div>
          <div className="flex-1">
            <Header />
            {!isLoggedIn ? (
              <BodySectionWithMarginBottom title="Log in to continue">
                {/* transmettre logIn et les valeurs d'email/password actuelles */}
                <Login
                  logIn={this.logIn}
                  email={context.user.email}
                  password={context.user.password}
                />
              </BodySectionWithMarginBottom>
            ) : (
              <BodySectionWithMarginBottom title="Course list">
                <CourseList courses={coursesList} />
              </BodySectionWithMarginBottom>
            )}
            <BodySection title="News from the School">
              <p>Holberton School news goes here</p>
            </BodySection>
          </div>
          <Footer />
        </div>
      </newContext.Provider>
    );
  }
}
