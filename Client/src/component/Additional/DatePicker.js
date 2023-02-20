

export default function DatePicker(){
    

    return(
        <>
        <div class="flex items-center justify-center">
  <div
    class="relative mb-3 xl:w-96"
    data-te-datepicker-init
    data-te-input-wrapper-init>
    <input
      type="text"
      class="peer block min-h-[auto] w-full rounded border-0 bg-transparent py-[0.32rem] px-3 leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-gray-200 dark:placeholder:text-gray-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
      placeholder="Select a date" />
    <label
      for="floatingInput"
      class="pointer-events-none absolute top-0 left-3 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-gray-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-blue-600 peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-gray-200"
      >Select a date</label
    >
  </div>
</div>
        </>
    )
}