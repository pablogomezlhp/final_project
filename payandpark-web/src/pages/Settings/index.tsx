import React from 'react';
import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout';

const Settings:React.FC = () => {
    const header = "My Settings";

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

export default Settings;