<script setup>
    import { onMounted, reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import ClienteService from '@/services/ClienteService';
    import { FormKit } from '@formkit/vue'
    import RouterLink from '@/components/UI/RouterLink.vue';
    import Heading from '@/components/UI/Heading.vue';

    const router = useRouter();
    const route = useRoute();

    const { id } = route.params;

    const formData = reactive({});

    onMounted(() => {
        ClienteService.getClient(id)
            .then(({ data }) => {
                Object.assign(formData, data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    const handleSubmit = (data) => {
        ClienteService.updateClient(id, data)
            .then(() => {
                router.push({ name: 'home' });
            })
            .catch((error) => {
                console.log(error);
            })
    }
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="home">Volver</RouterLink>
        </div>
        
        <Heading>Editar Cliente</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">            
                <FormKit type="form" submit-label="Guardar Cambios" incomplete-message="Completa todos los campos" @submit="handleSubmit" :value="formData">
                    <FormKit type="text" name="nombre" label="Nombre" placeholder="Nombre del Cliente" 
                        validation="required" :validation-messages="{ required: 'El nombre es obligatorio' }" v-model="formData.nombre"/>

                    <FormKit type="text" name="apellido" label="Apellido" placeholder="Apellido del Cliente" 
                        validation="required" :validation-messages="{ required: 'El apellido es obligatorio' }" v-model="formData.apellido"/>

                    <FormKit type="email" name="email" label="Email" placeholder="Email del Cliente" 
                        validation="required|email" :validation-messages="{ required: 'El email es obligatorio', email: 'Coloca un email válido' }" v-model="formData.email"/>

                    <FormKit type="text" name="telefono" label="Teléfono" placeholder="Teléfono: XXX-XXX-XXXX" 
                        validation="required*matches:^[0-9]{3}-[0-9]{3}-[0-9]{4}$/" :validation-messages="{ required: 'El teléfono es obligatorio' }" v-model="formData.telefono"/>

                    <FormKit type="text" name="empresa" label="Empresa" placeholder="Empresa donde trabaja" v-model="formData.empresa"/>

                    <FormKit type="text" name="cargo" label="Cargo" placeholder="Cargo que ocupa" v-model="formData.cargo"/>
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