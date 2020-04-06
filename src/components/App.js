import React from 'react'
import ShowTaskTabs from '../containers/showAllTasks'
import Popup from "reactjs-popup";
import AddtaskModal from './AddtaskModal'
const App = () => (
  <div>
    <ShowTaskTabs />
    <Popup modal trigger={<button className="myStyle" />}>
          {close => <AddtaskModal close={close} />}
        </Popup>
  </div>
)

export default App

