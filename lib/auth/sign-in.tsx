import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomButton from './components/CustomButton';
import { Link, router } from 'expo-router';
import FormField from './components/FormField';
import { login } from './authService';
import { useGlobalContext } from './context/GlobalProvider';

const SignIn = () => {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { setIsLoggedIn, setUser } = useGlobalContext();
  const submit = async () => {
    if (!form.username || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const user = await login(form.username, form.password);
      setIsLoggedIn(true);
      setUser(user);
      Alert.alert('Success', 'Login successful!');
      router.push('/');
    } catch (error: any) {
     
      Alert.alert(
        'Error',
        error.message || 'Failed to login',
        [
          { text: 'Try Again', style: 'cancel' },
          {
            text: 'Reset Password',
            onPress: () => {
              router.push('/reset-password');
            },
          },
        ],
        { cancelable: true }
      );
    }  finally {
      setIsSubmitting(false);
    }
  };

//   const { setIsLoggedIn, setUser } = useGlobalContext();
//   const submit= async ()=>{
//     if(!form.email || !form.password){
//       Alert.alert('Error', 'Please fill in all the fields');
//       return;
//     }
//     setIsSubmitting(true);
//       try {
//        await signIn(form.email, form.password);
//        const user = await getCurrentUser();
//        setIsLoggedIn(true);
//        setUser(user);
//        router.push('/');
//       } catch (error) {
//         Alert.alert('Error', error.message);
//       } finally{
//         setIsSubmitting(false);
//       }
    
//   }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="h-full bg-customWhite">
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View className="w-full px-4 my-6 flex-1 items-center">
           
            <Text className="text-5xl text-center text-black font-sfregular mb-2">Power Up Your Journey. Join Us Today!</Text>
            <FormField
              placeholder="Username"
              value={form.username}
              handleChangeText={(e) => setForm({ ...form, username: e })}
              otherStyles="mt-7 w-11/12"
              formStyles="border-2 border-gray-600 rounded-xl"
              keyboardType="email-address"
            />
            <FormField
             title="Password"
              placeholder="Password"
              value={form.password}
              otherStyles={"w-11/12 mb-2"}
               formStyles="border-2 border-gray-600 rounded-xl"
              handleChangeText={(e) => setForm({ ...form, password: e })}
             
            />
            <CustomButton
              title="Login"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
            <View className="justify-between flex-row">
            <Link href="/reset-password" className="text-center text-lg text-gray-600 mt-1">
                Forgot a password?
            </Link>
            <Link href="sign-up"className="text-center text-lg text-blue-500 mt-1 underline">
                  /Create an Account
            </Link>
            </View>
            
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default SignIn