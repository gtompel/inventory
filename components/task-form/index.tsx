'use client'
import React from 'react'
import { VscLoading } from 'react-icons/vsc'
import { Form as FormComp, FormField, FormControl, FormItem, FormMessage } from '../ui/form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import formSchema, { FormSchema, TaskStatus } from './schema'
import { Input } from '../ui/input'
import { SelectTrigger, SelectValue, Select, SelectContent, SelectItem } from '../ui/select'
import StatusBullet from '../StatusBullet'
import { Textarea } from '../ui/textarea'
import { Button } from '../ui/button'
import { IoAddOutline } from 'react-icons/io5'
import { createTask, deleteTask, updateTask } from '@/service/task'
import { useToast } from '@/hooks/use-toast'
import { Task } from '@prisma/client'
import { authClient } from '@/lib/auth-client'


type Props = {
    task?: Task
    onSubmitOrDelete?: () => void
    defaultDate?: Date

}


export default function Form(props: Props) {
    const { task, onSubmitOrDelete, defaultDate } = props
    const isEditing = !!task;
    const { data: session, isPending } = authClient.useSession()

    const form = useForm<FormSchema>({
        resolver: zodResolver(formSchema),
        defaultValues: isEditing ? {
            title: task.title,
            description: task.description,
            status: task.status as TaskStatus

        } : {
            title: "",
            description: "",
            status: "Ожидание"

        },
    });

    const { toast } = useToast()
    const [isLoading, setIsLoading] = React.useState(false);
    const onSubmit: SubmitHandler<FormSchema> = async (data) => {
        setIsLoading(true);
        const ownerId = session?.user?.id
        if (!isEditing && ownerId !== undefined) {
            await createTask({
                ...data,
                 ownerId,
                 description: data?.description || "",
                 createdAt: defaultDate
                })
        } else if (isEditing) {
            const newTask = {
                id: task.id,
                createdAt: task.createdAt,
                description: data.description || "",
                title: data.title,
                status: data.status
            } as Task
            await updateTask(newTask)
        }
        setIsLoading(false)
        form.reset();
        toast({
            title: isEditing ? "Задача обновлена" : "Задача создана",
            description: "Вы можете найти ее в списке задач"
        })
        onSubmitOrDelete?.()
    }
    const onDelete = async () => {
        if (!task?.id) return
        await deleteTask(task.id)
        onSubmitOrDelete?.()
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
                                    <Input placeholder="Наименование" {...field} />
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
                                            <SelectValue placeholder="Статус" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent >
                                        <SelectItem value="Ожидание">
                                            <StatusBullet status="Ожидание" />
                                        </SelectItem>
                                        <SelectItem value="В работе">
                                            <StatusBullet status="В работе" />
                                        </SelectItem>
                                        <SelectItem value="Выполнено">
                                            <StatusBullet status="Выполнено" />
                                        </SelectItem>
                                    </SelectContent>

                                </Select>
                            </FormItem>
                        )}
                    />
                    {isEditing ? null : (
                        <Button
                            type="submit"
                            icon={isLoading ? <VscLoading className='animate-spin' /> : <IoAddOutline />}
                            disabled={isPending || isLoading || !session?.user?.id}
                        >
                            Создать
                        </Button>
                    )}
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
                {isEditing ? (
                    <div className='flex items-center gap-2'>
                        <Button type='submit' className='w-full'
                            disabled={isPending || isLoading}>Сохранить</Button>
                        <Button variant="destructive" onClick={onDelete} className='w-full' disabled={isPending || isLoading} >Удалить</Button>
                    </div>
                ) : null}
            </form>
        </FormComp>
    )
}

