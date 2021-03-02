import React, { Component } from "react";

import MenuButton from "./MenuButton";
import Menu from "./menu/Menu";

class MenuContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            visible: false,
        };

        this.toggleMenu = this.toggleMenu.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
    }

    toggleMenu() {
        console.log("HI", this.state.visible);
        this.setState({
            visible: !this.state.visible,
        });
    }

    handleMouseDown(e) {
        this.toggleMenu();

        console.log("clicked");
        e.stopPropagation();
    }

    render() {
        return (
            <div style={{ position: "relative" }}>
                <MenuButton handleMouseDown={this.handleMouseDown} />
                <Menu
                    handleMouseDown={this.handleMouseDown}
                    menuVisibility={this.state.visible}
                />
            </div>
        );
    }
}

export default MenuContainer;
