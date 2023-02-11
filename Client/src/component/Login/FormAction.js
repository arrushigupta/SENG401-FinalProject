export default function FormAction({
    handleSubmit,
    action='submit',
    text
}){
    return(
        <div>
            <button
                type={action}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 mt-10"
                onSubmit={handleSubmit}>
                {text}
            </button>
        </div>
    )
}