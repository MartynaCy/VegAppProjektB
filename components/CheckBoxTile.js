import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { FilContext } from '../data/FilContext';
import { ThemeContext } from '../components/Themes';


export default CheckBoxTile = props => {
    const [filData, setFilData] = useContext(FilContext);
    const { dark, theme, toggle } = useContext(ThemeContext);

    const [state, setState] = React.useState(
        () => {
            if (props.title == "Omnivor") {
                return filData.filter[0]
            }   
            else if (props.title == "Vegetarisch") {
                return filData.filter[1]
            }
            else if (props.title == "Vegan") {
                return filData.filter[2]
            }
            else {
                return false
            }
        });

        const pressHandler = () => {

            const setNewStates = (position) => {
                let newStates = filData.filter
                newStates[position] = !newStates[position]
                setFilData(filData => ({
                    filter: newStates
                }));
            }
    
            if (props.title == "Omnivor") {
                setNewStates(0)
                setState(filData.filter[0])
            }   
            else if (props.title == "Vegetarisch") {
                setNewStates(1)
                setState(filData.filter[1])
            }
            else if (props.title == "Vegan") {
                setNewStates(2)
                setState(filData.filter[2])
            }
            else {
                setState(false)
            }
        }
        
    
        return (
            <CheckBox
            title= {props.title}
            checkedIcon='check-circle'
            uncheckedIcon='circle'
            checkedColor= {theme.backgroundColor}
            checked={state}
            onPress={pressHandler}
            containerStyle={{backgroundColor: theme.color}}
            textStyle={{color: theme.textColor}}
        />
        );
    }