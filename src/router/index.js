import React, {Suspense, lazy} from 'react'
import {BrowserRouter as BR, Route, Switch} from 'react-router-dom'
import '../App.css'

//components
import Project from "../components/demopage"
const Home = lazy(() => import("../components/home"))

export default function Entry() {
    return (
        <BR>
            <Switch>
              <Route path="/:project">
                <Project />
              </Route>           
              <Route path='/'>
                <Suspense fallback={<HomeLoading />}>                 
                  <Home />
                </Suspense>
              </Route>
            </Switch>
        </BR>
    )
}

//加载指示UI
function HomeLoading() {
  return (
    <div 
      style={{height:360,width:360,position:'relative',top:'50%',transform:'translateY(-50%)',margin:'0 auto',border:'1px solid black',transition:'all 1s ease'}}
    ></div>
  )
}

//----------------------------------------------------------
export const themes = {
  light:{
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};

export const ThemeContext = React.createContext(
  themes.dark // 默认值
);

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background,padding: 24}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: themes.light,
    }

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemedButton />
        </section>
      </div>
    );
  }
}
