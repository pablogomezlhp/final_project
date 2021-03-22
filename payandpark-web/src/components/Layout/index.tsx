import React from 'react';
import { useAuth } from '../../hooks/Auth';
import LeftSideBar from '../LeftSideBar';
import ContentContainer from '../ContentContainer';

interface headerProps {
  header:string,
}


const Layout:React.FC<headerProps> = ({header, children }) => {

  return (
    <div className="flex flex-row justify-between lg:mx-32">
        <LeftSideBar />
        <ContentContainer header={header}>
            {children}
        </ContentContainer>
    </div>
  )
}

export default Layout;