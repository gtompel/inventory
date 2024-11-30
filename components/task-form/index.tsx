"use client"
import React from 'react'
import { VscLoading } from 'react-icons/vsc'
import { Form as FormComp, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import formSchema, { FormSchema } from './schema'
import { Input } from '../ui/input'
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from '../ui/select'
import StatusBullet from '../StatusBullet'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import {IoAddOutline} from 'react-icons/io5'
import { createTask } from '@/service/task'
import { useToast } from '@/hooks/use-toast'


export default function Form() {
    const form = useForm({
        resolver: zodResolver(formSchema)
    });
    const {toast}=useToast()
    const [isLoading, setIsLoading] = React.useState(false);
    const onSubmit = async (data:FormSchema) => {
        setIsLoading(true)
        await createTask(data)
        setIsLoading(false)
        toast({
            title:"Задача создана",
            description:"Вы можете найти ее в списке задач"
        })

    }
    return (
        <FormComp {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                <div className="flex items-center gap-3">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="grow">
                                <FormMessage />
                                <FormControl>
                                    <Input placeholder="Заголовок" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem className="grow">
                                <FormMessage />
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Статус"/>
                                        </SelectTrigger>
                                    </FormControl>
                                        <SelectContent >
                                            <SelectItem value="Ожидание">
                                                <StatusBullet status="Ожидание"/>
                                            </SelectItem>
                                            <SelectItem value="В работе">
                                                <StatusBullet status="В работе"/>
                                            </SelectItem>
                                            <SelectItem value="Выполнено">
                                                <StatusBullet status="Выполнено"/>
                                            </SelectItem>
                                            </SelectContent>

                                </Select>
                            </FormItem>
                        )}
                    />
                    <Button
                    type="submit"
                    icon={isLoading ? <VscLoading className='animate-spin'/> : <IoAddOutline />}
                    >
                        Создать
                    </Button>
                </div>
                <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormMessage />
                                <FormControl>
                                    <Textarea placeholder="Описание" {...field} />

                                </FormControl>
                            </FormItem>
                        )}
                    />

            </form>

        </FormComp>
    )
}

