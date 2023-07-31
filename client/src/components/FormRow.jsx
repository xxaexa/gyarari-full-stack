const FormRow = ({ text, name, type, value, onChange, error }) => {
  return (
    <div className="my-3 flex flex-col w-96 mx-auto">
      <label className="mb-1 text-xl font-semibold text-left">{text}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="px-2 tracking-wider text-lg border-2 border-black rounded-md text-black"
      />
      <p className="text-left text-red-500">{error}</p>
    </div>
  )
}
export default FormRow
