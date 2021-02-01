import Layout from "../components/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link'
import SignupComponenet from '../components/auth/SignupComponent'
const Signup = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pd-4">Signup page</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SignupComponenet />
                </div>
            </div>
        </Layout>
    )
};
export default Signup;
