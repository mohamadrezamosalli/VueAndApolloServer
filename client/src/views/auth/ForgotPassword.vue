<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Forgot password</v-toolbar-title>
                </v-toolbar>
                <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleForgotPassword">
                    <v-card-text>
                        <v-text-field v-model="email" :rules="emailRules" prepend-icon="person" name="email" label="Email" type="email"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="loading" :disabled="!isFormValid || loading" color="primary" type="submit">
                            send mail
                            <span slot="loader">Loading...</span>
                        </v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    name: 'forgotPassword',
    data() {
        return {
            isFormValid: true,
            email: '',
            emailRules: [
                // check if email in input
                email => !!email || 'email is required',
                email => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) || 'email must be valid'
            ]
        }
    },
    computed: {
        ...mapGetters(['loading','error','user'])
    },
    watch: {
        user(value){
            if(value)
                this.$router.push('/');
        }
    },
    methods: {
        handleForgotPassword(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('forgotPassword', { 
                    email: this.email
                });
            }
        }
    }
}
</script>