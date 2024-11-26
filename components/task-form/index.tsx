"use client"
import React from 'react'
import { Form as FormComp, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import formSchema from './schema'
import { Input } from '../ui/input'
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from '../ui/select'

export default function Form() {
    const form = useForm({
        resolver: zodResolver(formSchema)
    })
    return (
        <FormComp {...form}>
            <form className="space-y-2">
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
                                <Select>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Статус"/>
                                        </SelectTrigger>
                                    </FormControl>
                                        <SelectContent >
                                            <SelectItem value="Ожидание">
                                                <span>Ожидание</span>
                                            </SelectItem>
                                            <SelectItem value="В работе">
                                                <span>В работе</span>
                                            </SelectItem>
                                            <SelectItem value="Выполнено">
                                                <span>Выполнено</span>
                                            </SelectItem>
                                            </SelectContent>

                                </Select>
                            </FormItem>
                        )}
                    />
                </div>

            </form>

        </FormComp>
    )
}

