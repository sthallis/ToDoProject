import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Login, Register, ToDoTasks, DoneTasks, Task } from '../screens/Screens';
import { Platform } from 'react-native';

const taskListTabNavigator = createBottomTabNavigator({
    pageToDoTasks: { screen: ToDoTasks, title: 'To Do' },
    pageDoneTasks: { screen: DoneTasks, title: 'Done' }
});

export default Routes = createAppContainer(createStackNavigator(
    {
        pageLogin: {screen: Login},
        pageRegister: {screen: Register },
        pageTaskList: {
            screen: taskListTabNavigator,
            navigationOptions: {
                ...Platform.select({
                    ios: {
                        title: 'Tasks List'
                    },
                    android: { 
                        header: null
                    }
                })
            }
        },
        pageTask: {screen: Task}
    },
    {
        headerMode: 'screen'
    }
));