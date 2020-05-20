import React from 'react'
import create_UUID from '../utils/generateUUID'
import DatePicker from 'react-date-picker'
import styled from 'styled-components'

const Button = styled.button`
  width: 90px;
  height: 35px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #ffffff;
  background-color: #0080FF;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  &:disabled {
    background-color: rgb(51, 153, 255);
    color: #fff;
    cursor: not-allowed;
  }
  &:hover {
    background-color: rgb(51, 153, 255);
    box-shadow: 0px 15px 20px rgb(255, 255, 255);
    color: #fff;
    transform: translateY(-3px);
  }`

const DButton = styled.button`
  width: 90px;
  height: 35px;
  font-family: 'Roboto', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #ffffff;
  background-color: #ff3300;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  margin-right: 12px;

  &:hover {
  background-color: #ff8566;
  box-shadow: 0px 15px 20px rgb(255, 255, 255);
  color: #fff;
  transform: translateY(-3px);
  }`

const ModalDiv = styled.div`
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 10px;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,0.5);
    animation-duration: 400ms;
    animation-fill-mode: both;
    z-index: 1000;
    will-change: opacity;`

const ModalBody = styled.div`
    padding: 12px;
    padding-top: 16px;
    width: 50%;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: stretch;
    background-color: #fff;
    background-repeat: 15px;
    box-shadow: 0 2px 15px 0 rgb(0,0,0,0.1);
    transition: box-shadow 400ms;
    justify-content: flex-start;
    flex-direction: column;`

const SummaryDiv = styled.div`
    height: 36px;
    width: 90%;
    padding: 4px 16px;
    margin-top: 30px;
    color: #4a4a4a;
    caret-color: #0080ff;
    align-items: center;
    display: flex;
    border-radius: 5px;
    transition: box-shadow 400ms;
    font-size: 20px;
    background-color: #F6F6F6;`

const SummaryInput = styled.input`
    font-weight: 400;
    font-size: 14px;
    margin: 8px 16px;
    width: 100%;
    width: 100%;
    padding: 0;
    flex: 1 1;
    background: none;
    border: none;
    color: inherit;
    &:focus {
        outline: none;
    }`

const DescInput = styled.input`
    font-weight: 400;
    font-size: 14px;
    margin: 8px 16px;
    width: 100%;
    height: 100%;
    padding: 0;
    background: none;
    border: none;
    color: inherit;
    &:focus {
        outline: none;
    }`

const DescDiv = styled.div`
    height: 160px;
    width: 90%;
    padding: 4px 16px;
    margin-top: 30px;
    color: #4a4a4a;
    caret-color: #0080ff;
    align-items: center;
    display: flex;
    border-radius: 5px;
    transition: box-shadow 400ms;
    font-size: 20px;
    background-color: #F6F6F6;`

const TitleDiv = styled.div`
    font-family: inherit;
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: inherit;
    background-color: transparent;
    color: inherit;
    border: none;
    margin: 0;
    padding: 0 5px 5px 5px;
    border-bottom: 2px solid #4a4a4a;
    color: #4a4a4a;
    width: fit-content;`

const TitleTab = styled.div`
    width: 100%;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 10px 0px;
    height: 36px;
    padding-top: 12px;
    padding-left: 12px;`

const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 96%;
    margin-top: 18px;`

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      mode: '',
      overlayActive: false
    };
    this.editRefCopy = {}
  }

  hydrateComponent = nextProps => {
    if (nextProps.editToDoId) {
        this.setState({
            mode: "edit"
        });
        const todo = this.props.todos.filter(e => e.id === nextProps.editToDoId);
        this.editRefCopy = todo[0];
        if (todo && todo.length > 0) {
            this.setState({
                title: todo[0].title,
                description: todo[0].description,
                priority: todo[0].priority,
                dueDate: todo[0].dueDate,
                id: todo[0].id,
                overlayActive: false
            })
        }
      } else {
          this.setState({
              mode: "create"
          })
      }
  }

  componentWillReceiveProps(nextProps, prevSate) {
    if (nextProps.overlayActive && !this.props.overlayActive ) {
        this.hydrateComponent(nextProps);
    }
  }

  handleTitleChange = (e) => {
    this.setState({
      title: e.target.value
    })
  }

  handleDescChange = (e) => {
    this.setState({
      description: e.target.value
    })
  }

  handleDueDateChange = (e) => {
    // 
    this.setState({
      dueDate: new Date(e).getTime()
    })
  }

  handlePriorityChange = (e) => {
    this.setState({
      priority: e.target.value
    })
  }

  handleSave = (e) => {
    const todo = {
      "title": this.state.title,
      "description": this.state.description,
      "priority": this.state.priority,
      "createdAt": new Date().getTime(),
      "dueDate": this.state.dueDate,
      id: this.state.mode === "create" ? create_UUID() : this.state.id,
      completed: false
    }
    this.props.addTodo(todo);
    this.unMountOverlay();
    // this.props.toggleOverlay();
  }

  unMountOverlay = () => {
    this.setState({
      title: '',
      description: '',
      priority: '',
      dueDate: '',
      mode: '',
      overlayActive: false
    }, () => {
        this.editRefCopy = {};
        this.props.toggleOverlay();
    });
  }

  shouldDisableSave = () => {
      if (this.state.mode === "create") {
        return !this.state.title || !this.state.description || !this.state.dueDate
      } else {
          return (this.state.title === this.editRefCopy.title && this.state.description === this.editRefCopy.description && this.state.dueDate === this.editRefCopy.dueDate && this.state.priority === this.editRefCopy.priority)
      }
  }

  render() {
    console.log(this.props)
    return (
      this.props.overlayActive && <div>
        <ModalDiv>
          <ModalBody>
            <TitleTab>
              <TitleDiv>
                {this.state.mode === "create" ? "Add ToDo" : "Edit ToDO"}
              </TitleDiv>
            </TitleTab>
            <SummaryDiv>
              <SummaryInput tabindex="2" type="text" placeholder="TODO Title..." value={this.state.title} onChange={this.handleTitleChange} /><span className="AppHeaderSearch__iconPlaceholder"></span>
            </SummaryDiv>
            <DescDiv>
              <DescInput tabindex="2" type="text" placeholder="Description.." value={this.state.description} onChange={this.handleDescChange}  /><span className="AppHeaderSearch__iconPlaceholder"></span>
            </DescDiv>
            <div style={{width: "94%", padding: "10px", marginTop:"20px", display:"flex", justifyContent:"space-between"}}>
              <label>
              Priority <span style={{marginLeft: "12px"}}></span>
              <select value={this.state.priority} onChange={this.handlePriorityChange}>
                <option value="">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
          <div>
            <span>Due Date  </span>
          <DatePicker
            onChange={this.handleDueDateChange}
            value={this.state.dueDate? new Date(this.state.dueDate) : "" }
          />
          </div>
          </div>
          <ButtonGroup>
            <DButton onClick={this.unMountOverlay}>Cancel</DButton>
            <Button disabled={this.shouldDisableSave()} onClick={this.handleSave}>Save</Button>
          </ButtonGroup>
          </ModalBody>
        </ModalDiv>
      </div>
    )
  }
}

export default (AddTodo)
