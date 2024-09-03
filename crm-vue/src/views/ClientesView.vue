<script setup>
    import { onMounted, ref, computed } from 'vue';
    import ClienteService from '@/services/ClienteService';
    import RouterLink from '@/components/UI/RouterLink.vue';
    import Heading from '@/components/UI/Heading.vue';
    import Clientes from '@/components/UI/Clientes.vue';

    const clientes = ref([]);

    onMounted(() => {
        ClienteService.getAll()
            .then(({ data }) => {
                clientes.value = data;
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            })
    })

    const existenClientes = computed(() => {
        return clientes.value.length > 0
    })

    const actualizarEstado = ({id, estado}) => {
        ClienteService.changeStatus(id, {estado: !estado})
            .then(() => {
                const i = clientes.value.findIndex(cliente => cliente.id === id);
                clientes.value[i].estado = !estado
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const eliminarCliente = (id) => {
        ClienteService.deleteClient(id)
            .then(() => {
                clientes.value = clientes.value.filter(cliente => cliente.id !== id);
            })
            .catch((error) => {
                console.log(error);
            })
    }
</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="agregar-cliente">Agregar nuevo cliente</RouterLink>
        </div>

        <Heading>Lista de Clientes</Heading>

        <div v-if="existenClientes" class="flow-root mx-auto  mt-10 p-5 bg-white shadow">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                        <tr>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Nombre</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Empresa</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Estado</th>
                            <th scope="col" class="p-2 text-left text-sm font-extrabold text-gray-600">Acciones</th>
                        </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            <Clientes v-for="cliente in clientes" 
                            :key="cliente.id" :cliente="cliente" 
                            @actualizar-estado="actualizarEstado"
                            @eliminar-cliente="eliminarCliente"
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div v-else class="text-center mt-10">
            <p>No hay clientes</p>
        </div>
    </div>
</template>