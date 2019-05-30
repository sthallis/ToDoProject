import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { readTasksFromFirebaseAsync } from '../services/FirebaseApi';
import { TaskListView } from '../components/Components';

const imgCheckList = require('../assets/checklist.png');
const imgPlus = require('../assets/baseline_add_circle_black_18dp.png');

export default class ToDoTasks extends Component {
    static navigationOptions = {
        tabBarLabel: 'To Do',
        tabBarIcon: ({ tintColor }) => (
            <Image source={imgCheckList} style={[styles.icon, { tintColor }]} />
        )
    }

    state = {
        tasks: []
    }

    render() {
        return(
            <View style={ styles.container }>
                <TaskListView tasks={this.state.tasks} navigation={this.props.navigation}/>
                <TouchableOpacity style={styles.floatButton}
                    onPress={() => this._gotToTask()}>
                <Image source={imgPlus} style={styles.img}/>
                </TouchableOpacity>
            </View>
        );
    }

    componentDidMount(){
        readTasksFromFirebaseAsync(this._fetchTasks.bind(this));
    }

    _fetchTasks(tasks){
        const tasksToDo = tasks.filter(t => !t.isDone);
        this.setState({tasks: tasksToDo});
    }

    _gotToTask() {
        this.props.navigation.navigate('pageTask');
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10
    },
    icon: {
        width: 26,
        height: 26 },
    img: {
        width: 50,
        height: 50
    },
    floatButton: {
        position: 'absolute',
        right: 20,
        bottom: 20
    }
})