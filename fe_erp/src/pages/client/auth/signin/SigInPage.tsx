import { useDispatch } from 'react-redux';
import './styles/SigInPage.scss'
import { login } from '../../../../features/authSlice';
import FormSigin from './components/FormSignIn';
// import { useCookies } from 'react-cookie';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../../../store';

const SigInPage = () => {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  
    const handleSubmit = async (payload: any) => {
      try {
        const result = await dispatch(login(payload) as any);
        // Handle the result here if needed
        console.log(result)
      } catch (err) {
        console.log(err);
      }
    };
    return (
            <FormSigin onSubmit = {handleSubmit}/>
    )
}


export default SigInPage;
