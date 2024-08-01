import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { AuthContext } from '../store/auth-context';
import { login } from '../util/auth';

function LoginScreen() {

  const [isAuthenticating,setIsAuthanticating]=useState(false);
  const authCtx=useContext(AuthContext);
  
  async function loginHandler({email,password}){
  
    setIsAuthanticating(true);
    try{
      const token=await login(email,password);
      authCtx.authenticate(token);
    }

    catch(error){
      Alert.alert('Authentication failed','Could not log you in.Please check your credentials ');
      setIsAuthanticating(false);
    }

    
   
  }

  if(isAuthenticating){
    return <LoadingOverlay message='Loggin you in...'/>
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
