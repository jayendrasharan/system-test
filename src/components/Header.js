import React, { Component } from 'react'
import styled from 'styled-components'

const SearchDiv = styled.div`
    height: 36px;
    width: 600px;
    padding: 4px 0;
    color: #4a4a4a;
    caret-color: #0080ff;
    align-items: center;
    display: flex;
    border-radius: 5px;
    transition: box-shadow 400ms;
    font-size: 20px;
    background-color: #F6F6F6;`

const SearchInput = styled.input`
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

const HeaderDiv = styled.div`
    left: 0;
    right: 0;
    top: 0;
    height: 64px;
    padding: 4px 30px;
    display: flex;
    position: static;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    box-shadow: 0 0 20px 0 rgba(0,0,0,.1);
    z-index: 4;`

const SettingsButton = styled.button`
    color: #898989;
    height: 36px;
    padding: 0;
    vertical-align: middle;
    background: none;
    border: none;
    border-radius: 50%;
    margin-left: 30px;
    transition: box-shadow 400ms,color 400ms;
    font-size: inherit;
    font-weight: inherit;
    text-align: left;
    line-height: 1;`

const AddButton = styled.button`
    width: 140px;
    height: 45px;
    font-family: 'Roboto', sans-serif;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2.5px;
    font-weight: 500;
    color: #ffffff;
    background-color: #0080FF;
    border: none;
    border-radius: 45px;
    margin: 0 30px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
    cursor: pointer;
    outline: none;

    &:hover {
    background-color: rgb(51, 153, 255);
    box-shadow: 0px 15px 20px rgb(255, 255, 255);
    color: #fff;
    transform: translateY(-3px);
    }`

const LeftSection = styled.div`
    flex: 1 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;`

const RightSection = styled.div`
    flex: 1 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;`

const HeaderIcon = styled.svg`
    padding-right: 12px;
    display: inline-block;
    box-sizing: content-box;`

export class Header extends Component {
    handleAddToDo = () => {
        this.props.triggerAddNew()
        console.log(this.props)
    }
    render() {
        return (
            <HeaderDiv>
                <LeftSection>
                    <SettingsButton>
                        <svg width="36" height="36" viewBox="0 0 36 36"><title>Toggle menu</title><g transform="translate(0 -1)" fill="none" fillRule="evenodd" data-darkreader-inline-fill=""><path d="M0 0h36v36H0z"></path><rect fill="#898989" x="6" y="8" width="24" height="3" rx=".893" data-darkreader-inline-fill="" style={{ fill: "#898989" }}></rect><rect fill="#898989" x="6" y="17" width="24" height="3" rx=".893" data-darkreader-inline-fill="" style={{ fill: "#898989" }}></rect><rect fill="#898989" x="6" y="26" width="24" height="3" rx=".893" data-darkreader-inline-fill="" style={{ fill: "#898989" }}></rect></g></svg>
                    </SettingsButton>
                    <AddButton onClick={this.handleAddToDo} type="submit">
                        <HeaderIcon width="12" height="12" viewBox="0 0 12 12"><g stroke="currentColor" strokeWidth="2" data-darkreader-inline-stroke="" style={{ stroke: "#fff" }}><line x1="6" y1="0" x2="6" y2="12"></line><line x1="0" y1="6" x2="12" y2="6"></line></g></HeaderIcon> <span>NEW</span>
                    </AddButton>
                </LeftSection>
                <RightSection>
                    <SearchDiv>
                        <SearchInput tabindex="2" type="text" placeholder="Search for tasks, lists, etc’" value="" /><span className="AppHeaderSearch__iconPlaceholder"></span>
                    </SearchDiv>
                    <SettingsButton type="button" aria-label="Settings"><svg width="36" height="36" viewBox="0 0 36 36"><title>Settings</title><g fill="none" fillRule="evenodd" data-darkreader-inline-fill="" style={{ fill: "none" }}><path d="M0 0h36v36H0z"></path><path d="M29 17.313c.001-.38-.228-.655-.688-.688l-1.718-.344c-.157-.034-.37-.229-.344-.343-.286-.85-.567-1.528-1.031-2.063-.036-.33-.024-.618 0-.688l1.031-1.718c.317-.15.287-.508 0-.688L25.219 9.75c-.207-.293-.565-.324-.688 0l-1.718 1.031c-.096.017-.385.03-.688 0-.561-.47-1.24-.752-2.063-1.031-.14.02-.335-.194-.343-.344l-.344-1.719c-.046-.465-.32-.69-.688-.687h-1.375c-.38-.001-.656.228-.687.688l-.344 1.718c-.035.143-.23.357-.343.344-.851.272-1.53.553-2.063 1.031-.33.023-.62.01-.688 0L11.47 9.75c-.15-.33-.509-.3-.688 0L9.75 10.781c-.294.183-.324.542 0 .688l1.031 1.719c.017.072.029.36 0 .687-.47.538-.752 1.216-1.031 2.063.017.119-.2.312-.344.343l-1.719.344c-.466.034-.691.31-.687.688v1.375c-.002.37.222.643.688.687l1.718.344c.143.023.356.218.344.343.272.84.553 1.518 1.031 2.063.022.32.01.608 0 .688L9.75 24.53c-.321.138-.288.488 0 .688l1.031 1.031c.18.268.537.298.688 0l1.719-1.031c.068-.041.356-.054.687 0 .534.446 1.212.728 2.063 1.031.12-.04.315.182.343.344l.344 1.718c.028.46.303.69.688.688h1.375c.368.003.645-.227.687-.688l.344-1.718c.022-.154.216-.367.343-.344.837-.283 1.515-.564 2.063-1.031.317-.033.606-.02.688 0l1.718 1.031c.136.31.485.278.688 0l1.031-1.031c.28-.204.31-.562 0-.688l-1.031-1.718c-.03-.094-.043-.382 0-.688.457-.559.739-1.237 1.031-2.063-.033-.139.18-.333.344-.343l1.718-.344c.456-.04.686-.315.688-.688v-1.375z" stroke="currentColor" strokeWidth="2" data-darkreader-inline-stroke="" style={{ stroke: "#898989" }}></path><circle stroke="currentColor" strokeWidth="2" cx="17.875" cy="18.125" r="2.875" data-darkreader-inline-stroke="" style={{ stroke: "#898989" }}></circle></g></svg></SettingsButton>
                    <SettingsButton type="button" aria-label="Sync menu" title="Last sync: 11:07PM" ><span><span ><svg width="36" height="36" viewBox="0 0 36 36"><g fill="currentColor" fillRule="evenodd" stroke="currentColor" strokeWidth=".5" data-darkreader-inline-fill="" data-darkreader-inline-stroke="" style={{ fill: "#898989", stroke: "#898989" }}><path d="M25.015 13.12a8.494 8.494 0 0 1 1.785 5.213c0 4.756-3.908 8.628-8.708 8.628a7.63 7.63 0 0 1-1.846-.213l1.292-1.25a.586.586 0 0 0 0-.854.599.599 0 0 0-.861 0l-2.862 2.774 2.831 3.08a.599.599 0 0 0 .862.03.586.586 0 0 0 .03-.854l-1.569-1.737a9.573 9.573 0 0 0 2.093.244c5.476 0 9.938-4.421 9.938-9.848a9.66 9.66 0 0 0-2.03-5.945c-.216-.274-.585-.305-.862-.122-.246.213-.277.58-.093.854zM18.554 6.626c0 .152.061.305.154.396l1.569 1.707a10.426 10.426 0 0 0-2.185-.244c-5.477 0-9.938 4.421-9.938 9.848 0 2.226.738 4.33 2.123 6.067.215.274.585.305.861.092.277-.214.308-.58.093-.854a8.56 8.56 0 0 1-1.846-5.305c0-4.756 3.907-8.628 8.707-8.628.646 0 1.323.091 1.939.213l-1.293 1.28a.586.586 0 0 0 0 .855.599.599 0 0 0 .862 0l2.862-2.775-2.831-3.08a.599.599 0 0 0-.862-.03.547.547 0 0 0-.215.458z"></path></g></svg></span><span></span></span></SettingsButton>
                </RightSection>
            </HeaderDiv>
        )
    }
}

export default Header
