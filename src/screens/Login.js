import React, { Component } from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, Image, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';
import { signInOnFirebaseAsync } from '../services/FirebaseApi';
import { StackActions, NavigationActions } from 'react-navigation';

const img = require('../assets/TodoList.png');

export default class Login extends Component {

    static navigationOptions = {
        header: null
    };

    state = {
        email: this.props.email,
        password: ''
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAvoidingView style={styles.container} behavior='padding'>
                    <View style={styles.topView}>
                        <Image style={styles.img} source={img}/>
                    </View>
                    <View style={styles.bottomView}> 
                        <TextInput style={styles.input} 
                        value={this.state.email}
                        placeholder='Email' 
                        keyboardType={'email-address'} 
                        autoCapitalize='none'
                        onChangeText={(email) => this.setState({email})} />
                        <TextInput style={styles.input} 
                        placeholder='Password' 
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({password})} />
                        <Button title='Sign In'
                        onPress={() => this._signInAsync()} />
                        <View style={styles.textConteiner}>
                            <Text>Not a member? Let's </Text>
                            <Text style={styles.textRegister}
                            onPress={() => {
                                const { navigate } = this.props.navigation;
                                navigate('pageRegister');
                            }}>Register</Text>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }

    async _signInAsync() {
        try {
            const user = await signInOnFirebaseAsync(this.state.email, this.state.password);
            // Alert.alert("User Authenticated", `User ${user.email} has succesfuly been authenticated!`);
            const resetNavigation = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({
                    routeName: 'pageTaskList'
                })]
            });

            this.props.navigation.dispatch(resetNavigation);

        } catch (error) {
            Alert.alert("Login Failed", error.message);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20
    },
    input: {
        marginBottom: 20
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    }
});