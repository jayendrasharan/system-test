import React, { Fragment } from 'react'
import { TableHead } from '../DashBoard/TableHead';
import {Tablebody} from '../DashBoard/Tablebody';
import {Table} from '../DashBoard/Tableview';
import "./style.css"
export const Options = ({groupByOptions}) => (
        groupByOptions.map((opt,ind) => (
                <option key= {ind} value={opt}>{opt}</option>
            )
        )
    );

export const Dropdown = ({onGroupby,onGrpBtn}) =>  {
    return (
    <div>
        <h2>Group By <span className="myGrpBtn" onClick={onGrpBtn}>&times;</span></h2>
        <label htmlFor="groupBy">Choose the attribute:   </label>
        <select id="groupBy"
          onChange={onGroupby}
        >
            <Options
                groupByOptions={["None","myPriority","status","myDate"]}
             />
        </select>
    </div>
    )
}

export const Groupby = ({onGroupby,attributes,attriLen,groupByObj,onGrpBtn,rowData}) => {
    const isSelectNone = Object.keys(groupByObj).some(val => val !=="undefined");
    return(
        <Fragment>
            <Dropdown
                onGroupby={onGroupby}
                onGrpBtn={onGrpBtn}
            />
            {attriLen > 0 && isSelectNone && attributes.map((attr,ind) => {
                return (
                    <div>
                        <h3>{attr}</h3>
                        <Table>
                        <TableHead data={Object.keys(groupByObj[attr][0])} 
                                    disableButtons={true}
                                    isGroupBy={true}
                        />
                         <Tablebody rowData={groupByObj[attr]}    
                                    disableButtons={true}
                                    isGroupBy={true}
                        />
                        </Table>
                    </div>
                )
            })}
            <hr/>
        </Fragment>
    )
}
