import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../features/post/postSlice'
import { useEffect } from 'react'
import { Post, Loading, Navbar, Upload } from '../components'

const Posts = () => {
  const dispatch = useDispatch()
  const { isLoading, post } = useSelector((state) => state.post)
  const { modal } = useSelector((state) => state.modal)
  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <div className="bg-over">
      <Navbar />
      <section>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-6 place-content-center place-items-center p-12">
            {post.map(({ _id, description, image, likes, uploadBy }) => {
              return (
                <Post
                  key={_id}
                  description={description}
                  image={image}
                  likes={likes}
                  uploadBy={uploadBy}
                />
              )
            })}
          </div>
        )}
      </section>
      {modal && <Upload />}
    </div>
  )
}
export default Posts
