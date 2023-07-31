const Button = ({ type, text }) => {
  return (
    <button
      type={type}
      className="text-xl font-semibold tracking-wider bg-blue-800 text-white px-2 py-1 rounded-lg mx-auto block ">
      {text}
    </button>
  )
}
export default Button
