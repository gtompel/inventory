"use client"
import React from 'react'
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

export default function Form() {
    const form = useForm({
        resolver: zodResolver(formSchema)
    })
    const onSubmit = async (data:FormSchema) => {

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
                    icon={<IoAddOutline />}
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

