import React from 'react'
import './style.css';
import { TableHead } from '../DashBoard/TableHead'
import {Tablebody} from '../DashBoard/Tablebody'
import {Table} from '../DashBoard/Tableview'

const Searchbar = ({onSearch,searchResult,headerData,disableButtons,rowData,onSrchBtn}) => {
    console.log(searchResult,"searchResult");
    return (
        <div className="mySearchBox">
           <h2> Search your tasks <span className="mySrchBtn" onClick={onSrchBtn}>&times;</span></h2>

            <input type="text" 
                    id="mySearchInput"
                    className="mySearch"
                    onChange={e => onSearch(e.target.value)}
                    placeholder={"Search your Tasks with Title name (case sensitive)"}
            />
             
            {(searchResult.some(task => task)  && searchResult.length < rowData.length) && 
                (<Table>
                    <TableHead data={headerData} 
                               disableButtons={true}
                               isSearch={true}
                    />
                    <Tablebody  rowData={searchResult}
                                disableButtons={true}
                                isSearch={true}
                    />
                </Table>)}
                <hr/>
        </div>
    )
}

export default Searchbar;