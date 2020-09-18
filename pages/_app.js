import 'bulma/css/bulma.css'
import 'react-dates/lib/css/_datepicker.css';
import 'react-dates/initialize';
import {
  RecoilRoot,
} from 'recoil';

export default function MyApp({ Component, pageProps }) {
  return <RecoilRoot><Component {...pageProps} /></RecoilRoot>
}