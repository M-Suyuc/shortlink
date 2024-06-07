'use client'

import { Options, helpHttp } from '@/lib/helpHttp'
import { useParams } from 'next/navigation'

function FormLinks() {
  const params = useParams()
  const api = helpHttp()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const dataObject = Object.fromEntries(
      new FormData(event.target as HTMLFormElement)
    )
    console.log(dataObject)
    console.log(params)
    // try {
    //   let options: Options = {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: dataObject
    //   }
    //   // setLoading(true)
    //   // if (initialData) {
    //   //   await axios.patch(
    //   //     `/api/${params.storeId}/categories/${params.categoryId}`,
    //   //     data
    //   //   )
    //   // } else {
    //   // await axios.post(`/api/${params.storeId}/categories`, data)}
    //   await api.post(`/api/${params.storeId}/sizes`, options)

    //   // }
    //   // router.refresh()
    //   // router.push(`/${params.storeId}/categories`)
    //   // toast.success(toastMessage)
    // } catch (error: any) {
    //   // toast.error('Something went wrong.')
    // } finally {
    //   // setLoading(false)
    // }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input type='text' name='url' placeholder='Enter your url' />
          <input
            type='text'
            name='short-url'
            placeholder='Enter your short-url'
          />
        </div>
        <button className='boder py-3 px-6 '>Send</button>
      </form>
    </>
  )
}
export default FormLinks
