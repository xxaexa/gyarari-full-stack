import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
const SharedLayout = () => {
  return (
    <main className="bg-black bg-opacity-80 min-h-screen">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </main>
  )
}
export default SharedLayout
