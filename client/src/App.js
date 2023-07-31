import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PostLayout, SettingLayout } from './layouts'
import { Error, Login, ProtectedRoute, SharedLayout } from './page'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="post"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }>
          <Route path="" element={<PostLayout />} />
          <Route path="setting" element={<SettingLayout />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
// <ProtectedRoute></ProtectedRoute>
