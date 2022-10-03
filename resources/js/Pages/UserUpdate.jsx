import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { Head, Link, useForm } from '@inertiajs/inertia-react';

export default function UserUpdate(props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: props.auth.user.name,
    });
    console.log('auth', props.auth)
    const canSave = [data.name].every(Boolean)

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();

        post(route('info.user.update'));
    };
    console.log(canSave)
    return (
        <AuthenticatedLayout auth={props.auth} >
            <Head title="Update User Info" />
            <div className="py-12">
                <div className="max-w-xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex flex-col bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form onSubmit={submit} className="m-5">
                            <div>
                                <InputLabel forInput="name" value="Name" />

                                <TextInput
                                    type="text"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full"
                                    autoComplete="name"
                                    isFocused={true}
                                    handleChange={onHandleChange}
                                    
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

                            <div className="mt-4">
                                <InputLabel forInput="email" value="Email" />

                                <TextInput
                                    type="email"
                                    name="email"
                                    value={props.auth.user.email}
                                    className="mt-1 block w-full"
                                    readonly
                                    
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end mt-4">

                                <PrimaryButton className="ml-4" processing={!canSave}>
                                    Update
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
