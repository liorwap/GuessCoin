import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
import SignupComponenet from '../components/auth/SignupComponent'
const Signup = () => {
    return (
        <Layout>
            <h2>Signup page</h2>
            <SignupComponenet />
        </Layout>
    )
};
export default Signup;