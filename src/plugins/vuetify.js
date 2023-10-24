import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


import 'vuetify/styles'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.min.css'
import { VDataTable, VDatePicker } from 'vuetify/lib/labs/components.mjs'


const lightTheme = {
    dark: false,
    colors: {
        primary: '#6200EE',
        'primary-darken-1': '#3700B3',
        secondary: '#4CAF50',
        'secondary-darken-1': '#018786',
        error: '#B00020',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FB8C00',
        background: '#FFFFFF',
        surface: '#F5F5F5',
    },
}

const themeDark = {
    dark: true,
    colors: {
        primary: '#BB86FC',             
        'primary-darken-1': '#6200EE',  
        secondary: '#03DAC5',           
        'secondary-darken-1': '#018786',
        accent: '#FFC107',              
        error: '#CF6679',               
        info: '#64B5F6',                
        success: '#81C784',             
        warning: '#FFAB40',             
        background: '#121212',          
        surface: '#1E1E1E',             
    }
}


const vuetify = createVuetify({
    components: {
        ...components,
        VDatePicker,
        VDataTable
    },
    directives,

    theme: {
        defaultTheme: localStorage.getItem('app-theme') || 'dark',
        themes: {
            light: lightTheme,
            dark: themeDark
        }
    }
})

export default vuetify