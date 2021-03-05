<template>
  <Modal
    :show="show"
    describedby="portion-modal-header"
  >
    <Loader v-if="$fetchState.pending" />
    <div v-else-if="$fetchState.error">
      <p class="bg-white rounded shadow p-4 text-center">
        Perdão, houve um erro na comunicação com o servidor.
        <font-awesome-icon icon="frown" class="text-blue-600" size="lg" />
      </p>
    </div>
    <form
      v-else
      class="bg-white w-full max-w-md opacity-100 rounded-lg overflow-hidden flex flex-col shadow-2xl"
      novalidate
      @submit.prevent
    >
      <header id="portion-modal-header" class="bg-blue-100 text-blue-800 p-4 font-display">
        Adicionando uma porção de:
      </header>
      <div v-if="selected == null" class="m-4 mb-6">
        <input
          v-model.trim="search"
          :disabled="typeof show != 'boolean'"
          type="text"
          class="w-full"
          placeholder="O que você comeu nesta refeição?"
          autocomplete="off"
        />
        <ul class="bg-blue-100 px-3 flex flex-col">
          <li v-for="suggestion in searchSuggestions" :key="suggestion.identifier">
            <button class="py-3" type="button" @click.prevent="selected = suggestion">
              {{ suggestion.query }}
            </button>
          </li>
        </ul>
      </div>
      <div v-else class="m-4">
        <p class="text-center mb-6">
          {{ selected.label }}
        </p>
        <label class="flex justify-between items-baseline mb-6">
          <span class="w-32">
            Medida
          </span>
          <select v-model="measureType" class="w-56">
            <option v-for="(m, name) in selected.measures" :key="name" :value="name">{{ m.description }}</option>
          </select>
        </label>
        <label class="flex justify-between items-baseline mb-6">
          <span class="w-32">
            Quantidade
          </span>
          <input v-model.number="measureQuantity" class="w-56" type="number" min="1" />
        </label>
      </div>
      <Divider />
      <div class="px-4 py-2 flex justify-around">
        <button type="reset" class="btn btn-tertiary" @click="$emit('close')">
          Cancelar
        </button>
        <button v-show="selected" type="submit" class="btn btn-primary submit" @click="submit">
          Confirmar
        </button>
      </div>
    </form>
  </Modal>
</template>

<style lang="postcss" scoped>
.submit {
  @apply px-8 font-display font-semibold rounded-lg;
}
</style>

<script lang="ts">
import Vue from 'vue'
import type { TBCA } from '~/types/tbca'
import type { Portion } from '~/types/meal'
import type { API } from '~/types/api'

export default Vue.extend({
  fetchDelay: 1000,
  props: {
    show: {
      type: [Boolean, Object],
      required: true
    }
  },
  data: () => ({
    tbca: null as TBCA.Food[] | null,
    search: '',
    selected: null as null | TBCA.Food,
    measureType: '',
    measureQuantity: 1
  }),
  async fetch () {
    const response = await this.$axios.$get<API.Routes.TBCA>('/tbca')
    this.tbca = response.tbca
  },
  computed: {
    searchSuggestions (): TBCA.Food[] {
      if (!this.search) { return [] }

      const query = this.search.toLowerCase()
      const includes: TBCA.Food[] = this.tbca?.filter(item => item.label.toLocaleLowerCase().includes(query)) || []
      return includes
        .sort((a, b) => +(a.popularity > b.popularity) || +(a.popularity === b.popularity) - 1)
        .splice(0, 4)
    }
  },
  watch: {
    show (newVal: boolean | Portion) {
      if (typeof newVal === 'boolean') { return }

      this.selected = newVal.food
      this.measureType = newVal.measure
      this.measureQuantity = newVal.quantity
    }
  },
  methods: {
    submit () {
      this.$emit(typeof this.show === 'boolean' ? 'submit' : 'edit', {
        food: this.selected,
        measure: this.measureType,
        quantity: this.measureQuantity
      })
      this.search = ''
      this.selected = null
      this.measureType = ''
      this.measureQuantity = 1
    }
  }
})
</script>
