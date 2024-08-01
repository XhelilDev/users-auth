import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { AuthContext } from '../store/auth-context';
import { createUser } from '../util/auth';

function SignupScreen() {
  const [isAuthenticating,setIsAuthanticating]=useState(false);
  
  const authCtx=useContext(AuthContext);
  
  async function signUpHandler({email,password}){
  
    setIsAuthanticating(true);
    try{
      const token=await createUser(email,password);
      authCtx.authenticate(token);
    }

    catch(error){
      Alert.alert('Authenticating failed',
      'Could not create the user,please check your input and try again later!');
      setIsAuthanticating(false);
    }
    
   
  }

  if(isAuthenticating){
    return <LoadingOverlay message='Creating user ...'/>
  }

  return <AuthContent onAuthenticate={signUpHandler}/>;
}

export default SignupScreen;
