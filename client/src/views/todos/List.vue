<template>
  <div>
    <h1 class="font-weight-medium text-capitalize">todoes</h1>
    <v-layout row wrap class="mb-3">
        <v-tooltip bottom>
            <v-btn router to="/todoes/add" slot="activator" flat color="grey">
                <v-icon small left>create_new_folder</v-icon>
                <span class="caption text-capitalize">new todo</span>
            </v-btn>
            <span>Create a new todo</span>
        </v-tooltip>

        <v-tooltip bottom>
          <!-- total todos -->
          <v-btn slot="activator" flat color="grey" disabled>
            <span class="caption text-capitalize">total ({{ todos.length }})</span>
          </v-btn>

          <!-- tooltip -->
          <span>Total number of todos</span>
        </v-tooltip>
    </v-layout>
    <v-card v-for="(todo, index) in todos" :key="index" class="mb-3">
        <v-layout row wrap :class="`pa-3 project ${todo.status === true ? 'complete' : 'uncomplete'}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Content</div>
            <div>{{todo.text}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{todo.createdAt}}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div>
              <v-chip small :class="`${todo.status === true ? 'complete' : 'uncomplete'} white--text caption`">{{todo.status === true ? 'complete' : 'uncomplete'}}</v-chip>
            </div>
          </v-flex>
          <v-flex xs12 sm4 md2>
            <div class="text-xs-center">
                <v-btn v-if="!todo.status" fab dark small color="success">
                    <v-icon dark>done</v-icon>
                </v-btn>
                <v-btn router to="/todoes/edit" fab dark small color="primary">
                    <v-icon dark>edit</v-icon>
                </v-btn>
                <v-btn fab dark small color="red">
                    <v-icon dark>delete</v-icon>
                </v-btn>
            </div>
          </v-flex>
        </v-layout>
    </v-card>
  </div>
</template>

<style>
  .project.complete{
    border-left: 4px solid #2ecc71;
  }
  .project.uncomplete{
    border-left: 4px solid #e74c3c;
  }

  .v-chip.complete{
    background-color: #2ecc71;
  }
  .v-chip.uncomplete{
    background-color: #e74c3c;
  }
</style>

<script>
import { mapGetters } from 'vuex';

export default {
    created() {
        this.handleGetTodos();
    },
    computed: {
        ...mapGetters(['todos'])
    },
    methods: {
        handleGetTodos() {
            this.$store.dispatch('getTodos');
        }
    },
}
</script>