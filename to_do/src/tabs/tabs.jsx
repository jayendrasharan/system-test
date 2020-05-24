import React from "react"
import "./tabs.scss"

function Tabs(props) {
  const { activeTab, tabs, setActiveTab } = props

  const tabsElement = tabs.map((tab, index) => (
    <button
      key={index}
      onClick={() => setActiveTab(tab)}
      className={activeTab === tab ? "active" : ""}
    >
      {tab}
    </button>
  ))
  return <div className="tabs-container">{tabsElement}</div>
}

export default Tabs
