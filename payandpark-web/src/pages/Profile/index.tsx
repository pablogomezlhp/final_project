import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';

const Profile:React.FC = () => {
  const header = "My Profile";
  return(
    <>
    <NavBar />
        <Layout header={header}>
            <p>Content Container</p>
        </Layout>
    <Footer />
    </>
  )
}

export default Profile;