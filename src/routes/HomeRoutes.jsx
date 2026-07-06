import React from 'react'
import Header from '../components/header/Header'
import { Outlet } from 'react-router'
import Footer from '../components/footer/Footer'
import AnnouncementTicker from '../components/announcementTicker/AnnouncementTicker'

const HomeRoutes = () => {
  return (
    <>
    <Header />
    <Outlet />
    <Footer/>
    </>
  )
}

export default HomeRoutes