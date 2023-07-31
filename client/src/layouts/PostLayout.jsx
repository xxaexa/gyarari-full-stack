import Post from '../components/Post'
import UploadLayout from './UploadLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '../features/post/postSlice'
import { useEffect } from 'react'
import Loading from '../components/Loading'

const PostLayout = () => {
  const dispatch = useDispatch()
  const { isLoading, post } = useSelector((state) => state.post)
  useEffect(() => {
    dispatch(getPost())
  }, [dispatch])

  return (
    <div>
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
      <UploadLayout />
    </div>
  )
}
export default PostLayout
