<script setup>
    import { computed } from 'vue'
    import { RouterLink } from 'vue-router';

    const props = defineProps({
        cliente: {
            type: Object,
        }
    })

    const nombreCliente = computed(() => {
        return props.cliente.nombre + ' ' + props.cliente.apellido;
    })

    const obtenerEstado = computed(() => {
        return props.cliente.estado;
    })

    defineEmits(['actualizar-estado', 'eliminar-cliente']);

</script>

<template>
    <tr>
        <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-0">
            <p class="font-medium text-gray-900">{{ nombreCliente }}</p>
            <p class="text-gray-500">{{ cliente.email }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
            <p class="text-gray-900 font-bold"> {{ cliente.empresa }}</p>
            <p class="text-gray-600"> {{ cliente.cargo }}</p>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm">
            <button 
                class="inline-flex items-center px-2.5 leading-5 rounded-full text-xs font-semibold"
                :class=" [obtenerEstado ? 'bg-green-200 text-green-900' : 'bg-red-100 text-red-800']"
                @click="$emit('actualizar-estado', { id: cliente.id, estado: cliente.estado })"
            >
                {{ obtenerEstado ? 'Activo' : 'Inactivo' }}
            </button>
        </td>
        <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 ">
            <RouterLink 
                :to="{ name: 'editar-cliente', params: { id: cliente.id } }" 
                class="text-indigo-600 hover:text-indigo-900 font-bold"
                >
                Editar
            </RouterLink>

            <button class="text-red-600 hover:text-red-900 ml-3 font-bold" @click="$emit('eliminar-cliente', cliente.id)">
                Eliminar
            </button>
        </td>
    </tr>
</template>