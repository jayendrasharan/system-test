import cn from "classnames";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './nav-tabs.scss';


//Renders the Navbar with the given items
export default class NavTabs extends Component {
    render() {
        const { tabs } = this.props;

        return (
            <ul id="sticky-nav" className="nav">
                {tabs &&
                    tabs.map((item) => {
                        const className = cn("tab", {
                            "selectedTab": item.selected,
                            "unselectedTab": !item.selected,
                        });

                        return (
                            <li key={item.url} className={className}>
                                <Link
                                    to={item.url}
                                >
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })}
            </ul>
        );
    }
}

NavTabs.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.object)
};

NavTabs.defaultProps = {
    tabs: null
};