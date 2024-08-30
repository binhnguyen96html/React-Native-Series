import { useContext, useState } from 'react';
import AuthContent from '../components/Auth/AuthContent';
import { createUser } from '../utils/auth';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function SignupScreen() {
  const [isAuthenticating, setAuthenticating] = useState(false);

  const authCtx = useContext(AuthContext)

  async function signupHandler({ email, password }) {
    setAuthenticating(true);

    try {
     const token =  await createUser(email, password);
      authCtx.authenticate(token)
    } catch (error) {
      Alert.alert(
        'Authenticatin failed. Please check your input and try again later!'
      );
      setAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Create user ..." />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
