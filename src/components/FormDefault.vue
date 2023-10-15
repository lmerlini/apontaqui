<template>
    <v-container grid-list-xs>

        <v-card :title="title" :variant="variant" :prepend-icon="icon">
            <v-card-title>
                <slot name="header"></slot>
            </v-card-title>


            <v-card-item>
                <slot name="content"></slot>
            </v-card-item>
            <v-card-actions>
                <slot name="footer"></slot>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
export default {
    name: 'FormDefault',
    props: {
        title: {
            type: String,
            required: true
        },
        variant: {
            type: String,
            required: false,
            default: 'tonal'
        },
        icon: {
            type: String
        }
    }
}
</script>
