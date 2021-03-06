<template>
  <div class="favorites-navigator d-flex flex-column">
    <v-toolbar flat dense class="flex-grow-0">
      <span class="subtitle-2 text-uppercase user-select-none flex-grow-0">
        Favorites
      </span>
    </v-toolbar>
    <div class="d-flex overflow-y-auto scrollbar">
      <v-list v-if="favorites.length" dense class="py-0" style="width: 100%;">
        <v-list-item
          v-for="favorite of favorites"
          :key="favorite.path"
          :title="favorite.path"
          @click="() => handleClickItem(favorite)"
          @contextmenu.stop="() => handleContextMenu(favorite)"
        >
          <v-list-item-icon class="mr-3">
            <v-icon color="blue lighten-3">mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-truncate" v-text="favorite.name" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div v-else class="d-flex flex-grow-1 justify-center caption py-5">
        <div>No favorites</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { clipboard } from 'electron'
import {
  defineComponent,
  computed,
  SetupContext,
} from '@nuxtjs/composition-api'
import { Favorite } from '~/models'
import { favoriteStore } from '~/store'

export default defineComponent({
  setup(_props: unknown, context: SetupContext) {
    const favorites = computed(() => favoriteStore.favoritesAll)

    const handleClickItem = (favorite: Favorite) => {
      context.root.$eventBus.$emit('change-location', favorite.path)
    }

    const handleContextMenu = (favorite: Favorite) => {
      context.root.$contextMenu.open([
        {
          label: 'Delete',
          click: () => favoriteStore.delete({ filePath: favorite.path }),
        },
        { type: 'separator' },
        {
          label: 'Copy Path',
          click: () => clipboard.writeText(favorite.path),
        },
      ])
    }

    return {
      favorites,
      handleClickItem,
      handleContextMenu,
    }
  },
})
</script>
