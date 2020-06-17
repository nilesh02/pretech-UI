import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../core/theme';
import * as firebase from 'firebase';


export default class SideDrawer extends Component {
    
    logout() {
        firebase.auth().signOut()
            .then(() => this.props.navigation.navigate('LoginScreen'))
    }

    render() {
        return (
            <View style={styles.sideMenu}>
                <View style={{ paddingHorizontal: 30 }}>
                    {this._renderHeader()}
                    <TouchableOpacity style={styles.menu} onPress={()=>this.props.navigation.navigate('HomeScreen')}>
                        <Icon name='home' size={24} color={theme.colors.primary} />
                        <Text style={styles.menuText}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu} onPress={()=>this.props.navigation.navigate('ProjectionScreen')}>
                        <Icon name='product-hunt' size={24} color={theme.colors.primary} />
                        <Text style={styles.menuText} >Projections</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu} onPress={()=>this.props.navigation.navigate('MaterialBalancePlantScreen')}>
                        <Icon name='microchip' size={24} color={theme.colors.primary} />
                        <Text style={styles.menuText} >Material Balance Plant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu} onPress={()=>this.props.navigation.navigate('MaterialBalanceEQPScreen')}>
                        <Icon name='modx' size={24} color={theme.colors.primary} />
                        <Text style={styles.menuText} >Material Balance EQP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu} onPress={()=>this.props.navigation.navigate('SettingsScreen')}>
                        <Icon name='cog' size={24} color={theme.colors.primary} />
                        <Text style={styles.menuText} >Settings</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menu} onPress={this.logout.bind(this)}>
                        <Icon name='sign-out' size={24} color={theme.colors.primary} />
                        <Text style={styles.menuText} >Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    _renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.userInfosHolder}>
                    <Image style={styles.avatar} source={require('../assets/logo.png')} resizeMode="contain" />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    sideMenu: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 300,
        backgroundColor: 'transparent'
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    menu: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal:15,
        paddingVertical: 10
    },
    menuText: {
        marginLeft: 20,
        color: theme.colors.primary
    },
    header: {
        marginTop: 20,
    },
    userInfosHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    avatar: {
        width:175,
        height:175,
    },
    userInfos: {
        justifyContent: 'flex-start',
    },
    username: {
        fontWeight: '700',
        color: theme.colors.primary,
        alignSelf: 'flex-start',
    }
})