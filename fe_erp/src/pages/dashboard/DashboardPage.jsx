import React from 'react'
import Header from '../../components/layouts/Header'
import SideBar from '../../components/layouts/SideBar'
import Footer from '../../components/layouts/Footer'
import Content from '../../components/layouts/Content'
const DashboardPage = () => {
  return (
    <>
    <Header />
    <SideBar />
    <Content>
      <h1>example content</h1>
    </Content>
    <Footer />
    </>
  )
}

export default DashboardPage;
