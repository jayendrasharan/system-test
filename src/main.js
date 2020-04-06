import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
export default class Main extends React.Component {
  constructor(props) {
    super(props);
    window.scroll(0, 0);
    this.contentRef = React.createRef();
  }

  render() {
    console.log("%%%%%%%%% inside main",this.props);

    return (
            <Switch>
                {this.props.routemap.map((route, i) =>
                (<Route key={i} path={route.path} component={route.component} exact={route.exact} />))}
            </Switch>
    );
  }
}

Main.propTypes = {
  routemap: PropTypes.array
};
