<template>
    <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
            <v-card class="elevation-12">
                <v-toolbar dark color="primary">
                    <v-toolbar-title>Sign in</v-toolbar-title>
                </v-toolbar>
                <v-form v-model="isFormValid" lazy-validation ref="form" @submit.prevent="handleSignIn">
                    <v-card-text>
                        <v-text-field v-model="email" :rules="emailRules" prepend-icon="person" name="email" label="Email" type="email"></v-text-field>
                        <v-text-field v-model="password" :rules="passwordRules" prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <h4 class="mt-3 mb-3">Don't have an account?
                            <router-link to="/sign_up">Sign up</router-link>
                        </h4>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="loading" :disabled="!isFormValid || loading" color="primary" type="submit">
                            Sign in
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
    name: 'signIn',
    data() {
        return {
            isFormValid: true,
            email: '',
            password: '',
            emailRules: [
                // check if email in input
                email => !!email || 'email is required',
                email => /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email) || 'email must be valid'
            ],
            passwordRules: [
                // check if password in input
                password => !!password || 'password is required'
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
        handleSignIn(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('signIn', { 
                    email: this.email,
                    password: this.password
                });
            }
        }
    }
}
</script>