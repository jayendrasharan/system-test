import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Tab from './Tab';
import TabPanel from './TabPanel';
import List from '../List';
import { ARROW_RIGHT, ARROW_LEFT } from './constants';

const propTypes = {
  className: PropTypes.string,
  tabsId: PropTypes.string,
  inheritedStyles: PropTypes.string,
  initialSelectedIndex: PropTypes.number,
  isVerticalView: PropTypes.bool,
  tabWrapClassName: PropTypes.string,
  panelWrapClassName: PropTypes.string,
  onTabChange: PropTypes.func,
  tabsContent: PropTypes.array,
  isIndexChangedFromProps: PropTypes.bool,
  tabIndexing: PropTypes.bool,
  showFindFlightText: PropTypes.bool,
  showEditFlightText: PropTypes.bool,
  tabHeadingClassName: PropTypes.string,
  tabClassName: PropTypes.string,
};

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.initialSelectedIndex = 0;
    this.state = {
      selectedIndex: this.setDefaultActiveTab(),
    };
    this.tabClick = this.tabClick.bind(this);
  }

  setDefaultActiveTab() {
    const { initialSelectedIndex } = this.props;
    return initialSelectedIndex || 0;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.isIndexChangedFromProps) {
      if (props.initialSelectedIndex !== state.selectedIndex) {
        return {
          selectedIndex: props.initialSelectedIndex,
        };
      }
    }
    return null;
  }

  updateTabChange(index) {
    const { onTabChange } = this.props;
    this.setState({
      selectedIndex: index,
    });
    if (onTabChange) {
      onTabChange(index);
    }
  }

  tabClick(e, index) {
    e.preventDefault();
    const { selectedIndex } = this.state;

    if (selectedIndex === index) {
      return;
    }
    this.updateTabChange(index);
  }

  tabKeyDown(e) {
    if (e.key === ARROW_LEFT || e.key === ARROW_RIGHT) {
      e.preventDefault();
    } else {
      return;
    }

    const { selectedIndex } = this.state;
    const { tabsContent } = this.props;

    let targetIndex;

    if (e.key === ARROW_LEFT && selectedIndex > 0) {
      targetIndex = selectedIndex - 1;
    } else if (
      e.key === ARROW_RIGHT &&
      selectedIndex < tabsContent.length - 1
    ) {
      targetIndex = selectedIndex + 1;
    } else {
      return;
    }

    this.updateTabChange(targetIndex);
  }

  render() {
    const {
      className,
      tabsContent,
      tabsId,
      isVerticalView,
      tabWrapClassName,
      panelWrapClassName,
      onTabChange,
      tabIndexing,
      tabHeadingClassName,
      tabClassName,
      ...others
    } = this.props;
    const { selectedIndex } = this.state;
    const listOptions = {
      noDefaultView: true,
      inline: !isVerticalView,
      noMargin: true,
      className: `tabs-wrapper ${tabClassName}`,
    };
    return (
      <div
        id={tabsId}
        className={classNames({ row: isVerticalView }, className)}
        {...others}
      >
        <div className={classNames('tabs-wrap', tabWrapClassName)}>
          <List role="tablist" {...listOptions}>
            {tabsContent &&
              tabsContent.map((item, index) => (
                <Tab
                  className={item.tabClassName || ''}
                  index={index}
                  isSelected={index === selectedIndex}
                  onClick={this.tabClick}
                  onKeyDown={this.tabKeyDown}
                  tabId={`tab-list-item-${index}_${tabsId}`}
                  key={`tab-${index.toString()}`}
                  tabIndexing={tabIndexing}
                  tabAriaLabel={item.ariaLabel || ''}
                >
                  {item.tabTitle}
                </Tab>
              ))}
          </List>
        </div>
        <div className={classNames('panels-wrap', panelWrapClassName)}>
          {tabsContent &&
            tabsContent.map((item, index) => (
              <TabPanel
                className={item.panelClassName || ''}
                isSelected={index === selectedIndex}
                tabId={`tab-list-item-${index}_${tabsId}`}
                index={index}
                key={`tab-panel-${index.toString()}`}
              >
                {item.panelContent}
              </TabPanel>
            ))}
        </div>
      </div>
    );
  }
}

Tabs.propTypes = propTypes;
Tabs.defaultProps = {
  className: '',
  tabsId: '',
  inheritedStyles: '',
  initialSelectedIndex: 0,
  isVerticalView: false,
  tabWrapClassName: '',
  panelWrapClassName: '',
  onTabChange: () => {
    return true;
  },
  tabsContent: [],
  isIndexChangedFromProps: false,
  tabIndexing: true,
  tabHeadingClassName: '',
  tabClassName: '',
};

export default Tabs;
