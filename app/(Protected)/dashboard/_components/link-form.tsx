'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useParams, useRouter } from 'next/navigation'

import Modal from '@/components/modal-link'
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
import axios, { AxiosError } from 'axios'

const formSchema = z.object({
  url: z
    .string()
    .min(4)
    .startsWith('https://', { message: 'Must provide secure URL' })
    .url({ message: 'Invalid url' }),
  shortLink: z
    .string()
    .min(4, { message: 'Must be at least 4 characters long' })
})
type LinkFormValues = z.infer<typeof formSchema>

interface LinkFormProps {
  initialData?: Link | null
}

const LinkForm: React.FC<LinkFormProps> = ({ initialData }) => {
  const [loading, setloading] = useState(false)
  const { isOpenModal, hideModal } = useModalContext()

  const router = useRouter()
  const { toast } = useToast()
  const params = useParams()

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
        await axios.put(`/api/shortUrl/${params.id}`, data)
      } else {
        const response = await axios.post(`/api/shortUrl`, data)
        if (response.statusText === 'OK') {
          hideModal()
          toast({
            title: (response.data.message = 'Link created successfully')
          })
        }
      }
      router.refresh()
      form.reset()
    } catch (error: any) {
      toast({
        title: error.response.data.message || 'An error occurred',
        variant: 'destructive'
      })
    } finally {
      setloading(false)
    }
  }

  return (
    <div>
      <Modal
        title='Create a new shortLink'
        isOpen={isOpenModal}
        onClose={() => hideModal()}
      >
        <div className='space-y-4 py-2 pb-6'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                      <Input disabled={loading} placeholder='url' {...field} />
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
                        placeholder='short url'
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
                  onClick={() => hideModal()}
                >
                  Cancel
                </Button>
                <Button disabled={loading} type='submit'>
                  Create
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Modal>
    </div>
  )
}
export default LinkForm
