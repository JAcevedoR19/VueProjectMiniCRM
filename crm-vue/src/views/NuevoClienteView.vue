<script setup>
    import { reactive } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from '../lib/axios';
    import { FormKit } from '@formkit/vue'
    import RouterLink from '@/components/UI/RouterLink.vue';
    import Heading from '@/components/UI/Heading.vue';

    const router = useRouter();

    const handleSubmit = (data) => {
        axios.post('/clientes', data)
            .then(respuesta => {
                router.push({ name: 'home' })
            })
            .catch(error => console.log(error))
    }
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="home">Volver</RouterLink>
        </div>
        
        <Heading>Agregar Nuevo Cliente</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">            
                <FormKit type="form" submit-label="Agregar Cliente" incomplete-message="Completa todos los campos" @submit="handleSubmit">
                    <FormKit type="text" name="nombre" label="Nombre" placeholder="Nombre del Cliente" 
                        validation="required" :validation-messages="{ required: 'El nombre es obligatorio' }"/>

                        <FormKit type="text" name="apellido" label="Apellido" placeholder="Apellido del Cliente" 
                        validation="required" :validation-messages="{ required: 'El apellido es obligatorio' }"/>

                        <FormKit type="email" name="email" label="Email" placeholder="Email del Cliente" 
                        validation="required|email" :validation-messages="{ required: 'El email es obligatorio', email: 'Coloca un email válido' }"/>

                        <FormKit type="text" name="telefono" label="Teléfono" placeholder="Teléfono: XXX-XXX-XXXX" 
                        validation="required|*matches:^[0-9]{3}-[0-9]{3}-[0-9]{4}$/" :validation-messages="{ required: 'El email es obligatorio', email: 'Coloca un email válido' }"/>

                        <FormKit type="text" name="empresa" label="Empresa" placeholder="Empresa donde trabaja"/>

                        <FormKit type="text" name="cargo" label="Cargo" placeholder="Cargo que ocupa"/>
                </FormKit>
            </div>
        </div>
    </div>
</template>

<style>
    .formkit-wrapper {
        max-width: 100%;
    }
</style>