import React from 'react';
import { connect } from 'react-redux';
import { tabs } from '../../config';
import { updateActiveTab } from '../../store/Action';
import { TabsBars, TabsBar } from './TabsBar';
import { selectorsActiveTabs } from './../../store/Selector';

const Tabs = props => {
  const { setActiveTab, activeTab } = props;
  return (
    <nav className='py-2'>
      <TabsBars>
        {tabs.map(tab=>{
          return (
            <TabsBar className={(activeTab===tab.key)?'active':''} key={tab.key}>
              <input type='button' value={tab.label} className='btn btn-link' onClick={()=>setActiveTab(tab.key)}/>
            </TabsBar>
          )
        })
        }
      </TabsBars>
    </nav>
  );
}

const mapStateToPorps = state => ({
  activeTab: selectorsActiveTabs(state)
});

const mapDispatchToProps = dispatch =>({
  setActiveTab : data => dispatch(updateActiveTab(data)) 
});

export default connect(mapStateToPorps, mapDispatchToProps)(Tabs);


