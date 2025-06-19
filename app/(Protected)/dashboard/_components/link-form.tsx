'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { useParams, useRouter } from 'next/navigation'

import Modal from '@/components/modals/modal-link'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link } from '@prisma/client'
import { useModalContext } from '@/context/modal'
import axios from 'axios'
import { toast } from 'ms-ui-toast'

const formSchema = z.object({
  url: z
    .string()
    .min(4, { message: 'Must be at least 4 characters long' })
    .startsWith('https://', { message: 'Must provide secure URL' })
    .url({ message: 'Invalid url' }),
  shortLink: z
    .string()
    .min(4, { message: 'Must be at least 4 characters long' })
    .refine((val) => !/\s/.test(val), {
      message: 'Value should not contain spaces'
    })
})

type LinkFormValues = z.infer<typeof formSchema>

interface LinkFormProps {
  initialData?: Link | null
}

const LinkForm: React.FC<LinkFormProps> = ({ initialData }) => {
  const [loading, setloading] = useState(false)
  const { isOpenModal, hideModal } = useModalContext()

  const router = useRouter()
  const params = useParams()

  const title = initialData ? 'Edit shortLink' : 'Create a new shortLink'
  const toastMessage = initialData ? 'ShortLink updated.' : 'ShortLink created.'
  const action = initialData ? 'Save' : 'Create'

  const form = useForm<LinkFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      url: '',
      shortLink: ''
    }
  })
  const onSubmit = async (data: LinkFormValues) => {
    try {
      setloading(true)
      if (initialData) {
        await axios.put(`/api/shortUrl/${params.linkId}`, data)
      } else {
        await axios.post(`/api/shortUrl`, data)
      }

      hideModal()
      router.push(`/dashboard`)
      router.refresh()
      toast.success({ title: toastMessage })
    } catch (error: any) {
      toast.error(error.response.data.message || 'An error occurred')
    } finally {
      setloading(false)
    }
  }

  return (
    <Modal title={title} isOpen={isOpenModal} onClose={() => router.back()}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='url'
            render={({ field }) => (
              <FormItem className='mb-4'>
                <FormLabel>Url</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='https://mi-sitie.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='shortLink'
            render={({ field }) => (
              <FormItem>
                <FormLabel>shortLink</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder='shortUrl'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='pt-6 space-x-2 flex items-center justify-end w-full'>
            <Button
              disabled={loading}
              variant='outline'
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button disabled={loading} type='submit'>
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  )
}
export default LinkForm
