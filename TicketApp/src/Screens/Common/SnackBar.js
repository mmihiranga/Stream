import React,{useEffect,useState} from 'react';
import {StyleSheet, Text, View,Pressable,Animated} from 'react-native';

const SnackBar = () => {

    const fadeIn = new Animated.Value(0);

    useEffect(() => {
     componentDidMount()
    }, [])

    const componentDidMount=()=>{
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start();
  }
    return(
        <Animated.View style={{ opacity: fadeIn }}>
            <Pressable style={styles.snackContainer} >
            <Text style={styles.snackText}>Please use your card first</Text>
            </Pressable>
        </Animated.View>
    )
}

export default SnackBar;

const styles = StyleSheet.create({
    snackContainer:{
        backgroundColor:"#fa2d37",
        borderRadius:20,
        elevation:15,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"center",
        paddingRight:15,
        paddingLeft:15,
        paddingBottom:8,
        paddingTop:8,
        borderColor:"#d12a32",
        borderLeftWidth:0.5,
     

    },
    snackText:{
        color:"white",
        fontFamily:"Roboto-Regular",
        fontSize:13
    }

})
